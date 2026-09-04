import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Compass,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { StandardDetailModal } from '../components/standards/StandardDetailModal';
import { VoiceInput } from '../components/common/VoiceInput';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

// Cache filter facets in memory so navigating back/forward doesn't refetch
let cachedFilterFacets = null;

export const StandardsExplorerPage = () => {
  const { savedStandardNumbers, toggleSaveStandard } = useAnalysis();
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Synchronize state directly with URL parameters
  const urlQ = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'All';
  const urlIndustry = searchParams.get('industry') || 'All';
  const urlStatus = searchParams.get('status') || 'All';
  const urlYear = searchParams.get('year') || 'All';
  const urlCert = searchParams.get('certification') || 'All';

  const [standards, setStandards] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Local input state for immediate typing responsiveness
  const [searchQuery, setSearchQuery] = useState(urlQ);
  const [filters, setFilters] = useState({
    category: urlCategory,
    industry: urlIndustry,
    status: urlStatus,
    year: urlYear,
    certification: urlCert
  });

  const [filterFacets, setFilterFacets] = useState(
    cachedFilterFacets || {
      categories: [],
      industries: [],
      years: [],
      statuses: ['Current', 'Under Revision', 'Superseded', 'Withdrawn'],
      certifications: ['All', 'Mandatory', 'CRS', 'ISI']
    }
  );

  const [selectedStandard, setSelectedStandard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openingId, setOpeningId] = useState(null);

  // Sync local state when URL params change (e.g. Browser Back/Forward navigation)
  useEffect(() => {
    setSearchQuery(urlQ);
    setFilters({
      category: urlCategory,
      industry: urlIndustry,
      status: urlStatus,
      year: urlYear,
      certification: urlCert
    });
  }, [urlQ, urlCategory, urlIndustry, urlStatus, urlYear, urlCert]);

  // Load filter facets once
  useEffect(() => {
    if (cachedFilterFacets) return;
    let isMounted = true;
    const fetchFacets = async () => {
      try {
        const facets = await api.getFilterFacets();
        if (isMounted) {
          cachedFilterFacets = facets;
          setFilterFacets(facets);
        }
      } catch (e) {
        console.warn('Failed to load filter facets');
      }
    };
    fetchFacets();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch standards whenever URL parameters change
  const fetchStandardsForUrl = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.searchStandards({
        q: urlQ,
        category: urlCategory,
        industry: urlIndustry,
        status: urlStatus,
        year: urlYear,
        certification: urlCert
      });
      setStandards(data.standards || []);
      setTotalCount(data.total || 0);
    } catch (e) {
      console.warn('Search standards fallback check');
    } finally {
      setLoading(false);
    }
  }, [urlQ, urlCategory, urlIndustry, urlStatus, urlYear, urlCert]);

  useEffect(() => {
    fetchStandardsForUrl();
  }, [fetchStandardsForUrl]);

  // Push debounced search query to URL params
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery !== urlQ) {
        const next = new URLSearchParams(searchParams);
        if (searchQuery.trim()) {
          next.set('q', searchQuery.trim());
        } else {
          next.delete('q');
        }
        setSearchParams(next, { replace: true });
      }
    }, 280);

    return () => clearTimeout(handler);
  }, [searchQuery, urlQ, searchParams, setSearchParams]);

  // Push dropdown filter changes directly to URL
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    let changed = false;

    Object.entries(filters).forEach(([key, val]) => {
      const currentVal = searchParams.get(key) || 'All';
      if (val && val !== 'All') {
        if (currentVal !== val) {
          next.set(key, val);
          changed = true;
        }
      } else {
        if (searchParams.has(key)) {
          next.delete(key);
          changed = true;
        }
      }
    });

    if (changed) {
      setSearchParams(next, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'All',
      industry: 'All',
      status: 'All',
      year: 'All',
      certification: 'All'
    });
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handleOpenStandard = async (std) => {
    const targetId = std.standardNumber || std._id || std.id;
    setOpeningId(targetId);
    try {
      const fullStd = await api.getStandardDetails(targetId);
      setSelectedStandard(fullStd || std);
    } catch {
      setSelectedStandard(std);
    } finally {
      setOpeningId(null);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gov-800 bg-gov-50 px-2 py-0.2 rounded border border-gov-200">
              {t('standardsRepository', 'Standards Catalog')}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {totalCount > 0 ? `${totalCount} ${t('indexedStandards', 'Indexed Indian Standards')}` : t('bisGazetteCorpus', 'BIS Gazette Corpus')}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {t('standardsExplorer', 'Indian Standards Explorer')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('standardsExplorerSubtitle', 'Search and inspect verified BIS standards, Quality Control Orders (QCO), normative references, and amendments.')}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs space-y-3">
        {/* Main Search Input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              placeholder={t('searchStandardsPlaceholder', 'Search by IS number, title, keyword (e.g. IS 10322, LED street light, 53 grade cement, TMT, IP65, PPE)...')}
              className="w-full pl-8 pr-14 py-2 text-xs rounded-md border border-slate-300 focus:ring-1 focus:ring-gov-700 focus:border-gov-700 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.2 rounded hover:bg-slate-100 cursor-pointer"
              >
                {t('clear', 'Clear')}
              </button>
            )}
          </div>
          <VoiceInput
            onTranscript={(text) => setSearchQuery(text)}
            className="shrink-0"
          />
        </div>

        {/* Filter Facets Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">{t('categoryLabel', 'Category')}</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full p-1.5 text-xs rounded-md border border-slate-300 bg-white focus:ring-1 focus:ring-gov-700"
            >
              <option value="All">{t('allCategories', 'All Categories')}</option>
              {filterFacets.categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Sector */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">{t('industryLabel', 'Industry')}</label>
            <select
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              className="w-full p-1.5 text-xs rounded-md border border-slate-300 bg-white focus:ring-1 focus:ring-gov-700"
            >
              <option value="All">{t('allIndustries', 'All Industries')}</option>
              {filterFacets.industries.map((ind, i) => (
                <option key={i} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">{t('statusLabel', 'Status')}</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full p-1.5 text-xs rounded-md border border-slate-300 bg-white focus:ring-1 focus:ring-gov-700"
            >
              <option value="All">{t('allStatuses', 'All Statuses')}</option>
              {filterFacets.statuses.map((st, i) => (
                <option key={i} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Certification Scheme */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">{t('certLabel', 'Certification')}</label>
            <select
              value={filters.certification}
              onChange={(e) => setFilters({ ...filters, certification: e.target.value })}
              className="w-full p-1.5 text-xs rounded-md border border-slate-300 bg-white focus:ring-1 focus:ring-gov-700"
            >
              <option value="All">{t('allCertifications', 'All Mandates')}</option>
              <option value="Mandatory">{lang === 'hi' ? 'अनिवार्य QCO' : 'Mandatory QCO'}</option>
              <option value="CRS">{lang === 'hi' ? 'अनिवार्य पंजीकरण (CRS)' : 'Compulsory Registration (CRS)'}</option>
              <option value="ISI">{lang === 'hi' ? 'ISI मार्क (स्कीम I)' : 'ISI Mark (Scheme I)'}</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full p-1.5 text-xs rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> {t('resetFilters', 'Reset All')}
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="py-16 text-center space-y-2.5">
          <div className="w-8 h-8 border-3 border-gov-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">
            {lang === 'hi' ? 'भारतीय मानक डेटाबेस फ़िल्टर किया जा रहा है...' : 'Filtering Indian Standards Database...'}
          </p>
        </div>
      ) : standards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {standards.map((std, idx) => {
            const isSaved = savedStandardNumbers.has(std.standardNumber);
            return (
              <div
                key={std.standardNumber || idx}
                className="bg-white rounded-md border border-slate-200 p-4 shadow-2xs hover:border-gov-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="primary" size="xs">
                        {std.category}
                      </Badge>
                      <Badge variant={std.status === 'Current' ? 'current' : 'warning'} size="xs">
                        {std.status}
                      </Badge>
                      {std.certification?.isMandatory && (
                        <Badge variant="mandate" size="xs">
                          {lang === 'hi' ? 'अनिवार्य QCO' : 'Mandatory QCO'}
                        </Badge>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSaveStandard(std)}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        isSaved
                          ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title={isSaved ? t('saved', 'Saved') : t('saveStandard', 'Save standard to library')}
                      aria-label={isSaved ? t('saved', 'Saved') : t('saveStandard', 'Save standard to library')}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-xs font-bold font-mono text-gov-900 leading-snug">
                    {std.standardNumber}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-800 mt-1 leading-snug">
                    {std.title}
                  </h4>

                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                    {std.scope}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500 font-mono">
                    {t('yearLabel', 'Year')}: <span className="font-semibold text-slate-700">{std.publicationYear}</span> • {lang === 'hi' ? 'संस्करण:' : 'Edition:'} <span className="font-semibold text-slate-700">{std.edition || (lang === 'hi' ? 'वर्तमान' : 'Current')}</span>
                  </div>
                  <Button
                    size="xs"
                    variant="ghost"
                    className="text-gov-800 font-bold"
                    disabled={openingId === (std.standardNumber || std._id || std.id)}
                    icon={openingId === (std.standardNumber || std._id || std.id) ? undefined : ChevronRight}
                    onClick={() => handleOpenStandard(std)}
                  >
                    {openingId === (std.standardNumber || std._id || std.id) ? t('openingReport', 'Opening...') : t('viewDetails', 'View Details')}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-lg border border-slate-200 space-y-2.5 p-6">
          <Compass className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{t('noStandardsMatch', 'No Matching Indian Standards Found')}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t('tryRefiningFilters', 'Try clearing some filters or searching with a broader product keyword.')}
          </p>
          <Button size="sm" variant="secondary" onClick={handleResetFilters}>
            {t('resetFilters', 'Clear All Filters')}
          </Button>
        </div>
      )}

      {/* Standard Detail Modal */}
      <StandardDetailModal
        standard={selectedStandard}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
