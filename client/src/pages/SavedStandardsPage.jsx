import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookmarkCheck,
  Search,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Tag,
  Compass,
  FileText
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { StandardDetailModal } from '../components/standards/StandardDetailModal';
import { useAnalysis } from '../context/AnalysisContext';
import { api } from '../services/api';

export const SavedStandardsPage = () => {
  const navigate = useNavigate();
  const { savedStandards, loadSaved, toggleSaveStandard, showToast } = useAnalysis();
  const [search, setSearch] = useState('');
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadSaved();
  }, []);

  const [openingId, setOpeningId] = useState(null);

  const handleOpenStandard = (std) => {
    const stdId = std.standardNumber || std._id || std.id;
    if (openingId) return;
    setOpeningId(stdId);
    setSelectedStandard(std.standardDetails || std);
    setIsModalOpen(true);
    setTimeout(() => setOpeningId(null), 250);
  };

  const filtered = useMemo(() => {
    if (!search) return savedStandards;
    const q = search.toLowerCase();
    return savedStandards.filter((s) => {
      return (
        s.standardNumber?.toLowerCase().includes(q) ||
        s.title?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.notes?.toLowerCase().includes(q)
      );
    });
  }, [savedStandards, search]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Department Repository
            </span>
            <span className="text-xs text-slate-500 font-medium">Bookmarked BIS Baselines</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            Saved Standards Library
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage bookmarked Indian Standards, customized procurement notes, and standard specifications for upcoming tenders.
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          icon={Compass}
          onClick={() => navigate('/explorer')}
        >
          Explore Standards DB
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter saved standards by number, title, or procurement notes..."
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500 focus:outline-none"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
      </div>

      {/* Grid of Saved Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((std, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="primary" size="xs">
                      {std.category || 'General'}
                    </Badge>
                    <Badge variant={std.status === 'Current' ? 'success' : 'warning'} size="xs">
                      {std.status || 'Current'}
                    </Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSaveStandard(std)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-outfit">
                  {std.standardNumber}
                </h3>
                <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-2">
                  {std.title}
                </p>

                {std.notes && (
                  <div className="mt-3 p-2.5 bg-amber-50/60 rounded-xl border border-amber-100 text-xs text-amber-950">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-800">
                      Procurement Indent Note:
                    </span>
                    <p className="text-[11px] mt-0.5">{std.notes}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Bookmarked: {new Date(std.createdAt || Date.now()).toLocaleDateString('en-IN')}
                </span>
                <Button
                  size="xs"
                  variant="ghost"
                  className="text-gov-700 font-bold"
                  disabled={openingId === (std.standardNumber || std._id || std.id)}
                  icon={openingId === (std.standardNumber || std._id || std.id) ? undefined : ChevronRight}
                  onClick={() => handleOpenStandard(std)}
                >
                  {openingId === (std.standardNumber || std._id || std.id) ? 'Opening...' : 'Inspect Standard'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <BookmarkCheck className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Saved Standards in Library</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You can bookmark applicable standards from any recommendation report or directly from the Standards Explorer.
          </p>
          <Button size="sm" onClick={() => navigate('/explorer')}>
            Browse Standards Explorer
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
