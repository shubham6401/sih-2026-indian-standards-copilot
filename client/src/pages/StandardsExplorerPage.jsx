import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Compass,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  Calendar,
  Building,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { StandardDetailModal } from '../components/standards/StandardDetailModal';
import { useAnalysis } from '../context/AnalysisContext';
import { api } from '../services/api';

// Cache filter facets in memory so navigating back/forward doesn't refetch
let cachedFilterFacets = null;

export const StandardsExplorerPage = () => {
  const { savedStandardNumbers, toggleSaveStandard } = useAnalysis();
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
      console.warn('Failed to load standards:', e.message);
    } finally {
      setLoading(false);
    }
  }, [urlQ, urlCategory, urlIndustry, urlStatus, urlYear, urlCert]);

  useEffect(() => {
    fetchStandardsForUrl();
  }, [fetchStandardsForUrl]);

  // Debounced URL updates when typing or selecting filters (300ms)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const nextParams = new URLSearchParams();
      if (searchQuery.trim()) nextParams.set('q', searchQuery.trim());
      if (filters.category && filters.category !== 'All') nextParams.set('category', filters.category);
      if (filters.industry && filters.industry !== 'All') nextParams.set('industry', filters.industry);
      if (filters.status && filters.status !== 'All') nextParams.set('status', filters.status);
      if (filters.year && filters.year !== 'All') nextParams.set('year', filters.year);
      if (filters.certification && filters.certification !== 'All') nextParams.set('certification', filters.certification);

      // Only update if searchParams actually differ to avoid infinite re-renders
      if (nextParams.toString() !== searchParams.toString()) {
        setSearchParams(nextParams, { replace: true });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, filters, searchParams, setSearchParams]);

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

  const handleOpenStandard = (std) => {
    const stdId = std.standardNumber || std._id || std.id;
    if (openingId) return;
    setOpeningId(stdId);
    setSelectedStandard(std);
    setIsModalOpen(true);
    setTimeout(() => setOpeningId(null), 250);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Standards Corpus
            </span>
            <span className="text-xs text-slate-500 font-medium">Bureau of Indian Standards Repository</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            Indian Standards Explorer
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Browse, search, and verify national standard specifications (IS), mandatory Quality Control Orders (QCOs), testing protocols, and certification schemes.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto shrink-0">
          {totalCount} Standards Indexed
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search input (Clean SPA form, no full page reload) */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            placeholder="Search by IS number, title, keyword (e.g. IS 10322, LED street light, 53 grade cement, TMT, IP65, PPE)..."
            className="w-full pl-10 pr-16 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500 focus:outline-none transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5 py-0.5 rounded hover:bg-slate-100 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Facets Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
            >
              <option value="All">All Categories</option>
              {filterFacets.categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Sector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Industry</label>
            <select
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
            >
              <option value="All">All Industries</option>
              {filterFacets.industries.map((ind, i) => (
                <option key={i} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
            >
              <option value="All">All Statuses</option>
              {filterFacets.statuses.map((st, i) => (
                <option key={i} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Certification Scheme */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Certification</label>
            <select
              value={filters.certification}
              onChange={(e) => setFilters({ ...filters, certification: e.target.value })}
              className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
            >
              <option value="All">All Conformity</option>
              <option value="Mandatory">Mandatory QCO</option>
              <option value="CRS">Compulsory Registration (CRS)</option>
              <option value="ISI">ISI Mark (Scheme I)</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-gov-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">Filtering Indian Standards Database...</p>
        </div>
      ) : standards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {standards.map((std, idx) => {
            const isSaved = savedStandardNumbers.has(std.standardNumber);
            return (
              <div
                key={std.standardNumber || idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="primary" size="xs">
                        {std.category}
                      </Badge>
                      <Badge variant={std.status === 'Current' ? 'success' : 'warning'} size="xs">
                        {std.status}
                      </Badge>
                      {std.certification?.isMandatory && (
                        <Badge variant="mandate" size="xs">
                          Mandatory QCO
                        </Badge>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSaveStandard(std)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSaved
                          ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save standard to library'}
                      aria-label={isSaved ? 'Remove standard from library' : 'Save standard to library'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-outfit leading-snug">
                    {std.standardNumber}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-700 mt-1 leading-snug">
                    {std.title}
                  </h4>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {std.scope}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500">
                    Year: <span className="font-semibold text-slate-700">{std.publicationYear}</span> • Edition: <span className="font-semibold text-slate-700">{std.edition || 'Current'}</span>
                  </div>
                  <Button
                    size="xs"
                    variant="ghost"
                    className="text-gov-700 font-bold"
                    disabled={openingId === (std.standardNumber || std._id || std.id)}
                    icon={openingId === (std.standardNumber || std._id || std.id) ? undefined : ChevronRight}
                    onClick={() => handleOpenStandard(std)}
                  >
                    {openingId === (std.standardNumber || std._id || std.id) ? 'Opening...' : 'View Details'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-3 p-6">
          <Compass className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Matching Indian Standards Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No standards matched the query "{urlQ || 'filters'}". Try clearing selected filter criteria or searching alternative keywords.
          </p>
          <Button size="sm" variant="secondary" onClick={handleResetFilters}>
            Clear All Filters
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
