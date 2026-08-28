import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
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

export const StandardsExplorerPage = () => {
  const { savedStandardNumbers, toggleSaveStandard } = useAnalysis();

  const [standards, setStandards] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    industry: 'All',
    status: 'All',
    year: 'All',
    certification: 'All'
  });
  const [filterFacets, setFilterFacets] = useState({
    categories: [],
    industries: [],
    years: [],
    statuses: ['Current', 'Under Revision', 'Superseded', 'Withdrawn'],
    certifications: ['All', 'Mandatory', 'CRS', 'ISI']
  });

  const [selectedStandard, setSelectedStandard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFacets = async () => {
      try {
        const facets = await api.getFilterFacets();
        setFilterFacets(facets);
      } catch (e) {
        console.warn('Failed to load filter facets');
      }
    };
    fetchFacets();
  }, []);

  const fetchStandards = async () => {
    setLoading(true);
    try {
      const data = await api.searchStandards({
        q: searchQuery,
        category: filters.category,
        industry: filters.industry,
        status: filters.status,
        year: filters.year,
        certification: filters.certification
      });
      setStandards(data.standards || []);
      setTotalCount(data.total || 0);
    } catch (e) {
      console.warn('Failed to load standards:', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchStandards();
    }, 250);
    return () => clearTimeout(debounce);
  }, [searchQuery, filters]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'All',
      industry: 'All',
      status: 'All',
      year: 'All',
      certification: 'All'
    });
  };

  const handleOpenStandard = (std) => {
    setSelectedStandard(std);
    setIsModalOpen(true);
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
          <p className="text-xs text-slate-500 mt-0.5">
            Search, filter, and inspect authentic Indian Standards (IS), mandatory certification schemes, and testing scopes.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {totalCount} Standards Indexed
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by IS number, title, keyword (e.g. IS 10322, LED street light, 53 grade cement, TMT, IP65, PPE)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
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
              className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500"
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
              className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500"
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
              className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500"
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
              className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500"
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
              className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold flex items-center justify-center gap-1 transition-colors"
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
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
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
                        <Badge variant="gold" size="xs">
                          Mandatory QCO
                        </Badge>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSaveStandard(std)}
                      className={`p-1.5 rounded-lg border text-xs transition-all ${
                        isSaved
                          ? 'bg-amber-50 text-amber-600 border-amber-300 font-bold'
                          : 'bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-outfit">
                    {std.standardNumber}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-2">
                    {std.title}
                  </p>
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
                    icon={ChevronRight}
                    onClick={() => handleOpenStandard(std)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Compass className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Standards Matched Criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing selected filter criteria to view more standards.
          </p>
          <Button size="xs" variant="secondary" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Standard Details Modal */}
      <StandardDetailModal
        standard={selectedStandard}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
