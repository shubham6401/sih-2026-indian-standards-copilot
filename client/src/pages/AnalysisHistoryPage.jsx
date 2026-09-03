import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  FileText,
  Trash2,
  Download,
  Eye,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { Modal } from '../components/common/Modal';
import { useAnalysis } from '../context/AnalysisContext';
import { api } from '../services/api';

export const AnalysisHistoryPage = () => {
  const navigate = useNavigate();
  const { history, loadHistory, deleteAnalysisRecord } = useAnalysis();
  const [search, setSearch] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openingId, setOpeningId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const handleOpenItem = (item, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const id = item._id || item.id;
    if (!id || openingId) return;
    setOpeningId(id);
    setTimeout(() => {
      navigate(`/reports/${id}`);
    }, 150);
  };

  const openDeleteModal = (item, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setItemToDelete(item);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);

    try {
      await deleteAnalysisRecord(itemToDelete._id);
      setItemToDelete(null);
    } catch (err) {
      // Handled in context toast
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredHistory = history.filter((item) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      item.productName?.toLowerCase().includes(query) ||
      item.productCategory?.toLowerCase().includes(query) ||
      item.rawInput?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Procurement Audit Log
            </span>
            <span className="text-xs text-slate-500 font-medium">Historical Evaluations & Compliance Records</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            Analysis History & Audit Archive
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review previous technical specification evaluations, generated compliance reports, and mapped standards.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={Sparkles}
          onClick={() => navigate('/analysis/new')}
        >
          New Analysis
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter history by product name, category, or specification text..."
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500 focus:outline-none"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
      </div>

      {/* Table (Desktop) & Cards (Mobile) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {filteredHistory.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3.5 px-4">Procurement Item</th>
                    <th className="py-3.5 px-4">Input Type</th>
                    <th className="py-3.5 px-4">Standards Found</th>
                    <th className="py-3.5 px-4">Confidence</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredHistory.map((item) => {
                      const id = item._id || item.id;
                      const isOpeningThis = openingId === id;
                      return (
                        <tr
                          key={id}
                          onClick={(e) => handleOpenItem(item, e)}
                          className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gov-600 shrink-0" />
                              <div>
                                <span className="text-slate-900 hover:underline">{item.productName}</span>
                                <span className="text-[10px] text-slate-400 font-normal block">
                                  {item.productCategory}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge variant={item.inputType === 'tender_pdf' ? 'mandate' : 'default'} size="xs">
                              {item.inputType === 'tender_pdf' ? 'Tender PDF' : 'Specification'}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-700">
                            {(item.primaryStandards?.length || 0) + (item.relatedStandards?.length || 0)} Standards
                          </td>
                          <td className="py-3.5 px-4">
                            <ScoreIndicator
                              score={item.confidenceScore || 90}
                              label={item.confidenceLabel || 'Highly Relevant'}
                              size="sm"
                            />
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                            {new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <Button
                                size="xs"
                                variant="ghost"
                                disabled={isOpeningThis}
                                onClick={(e) => handleOpenItem(item, e)}
                              >
                                <Eye className="w-3.5 h-3.5 mr-1" />
                                {isOpeningThis ? 'Opening...' : 'View'}
                              </Button>
                              <button
                                type="button"
                                onClick={(e) => openDeleteModal(item, e)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete record"
                                aria-label="Delete analysis record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View (Phones) */}
              <div className="md:hidden divide-y divide-slate-100">
                {filteredHistory.map((item) => {
                  const id = item._id || item.id;
                  const isOpeningThis = openingId === id;
                  return (
                    <div
                      key={id}
                      onClick={(e) => handleOpenItem(item, e)}
                      className="p-4 space-y-3 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{item.productName}</h3>
                          <p className="text-[11px] text-slate-400">{item.productCategory}</p>
                        </div>
                        <ScoreIndicator
                          score={item.confidenceScore || 90}
                          label={item.confidenceLabel || 'Highly Relevant'}
                          size="sm"
                        />
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 italic">
                        "{item.rawInput}"
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                        <span>
                          {(item.primaryStandards?.length || 0) + (item.relatedStandards?.length || 0)} Standards Mapped
                        </span>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={(e) => openDeleteModal(item, e)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete record"
                            aria-label="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <Button
                            size="xs"
                            variant="primary"
                            disabled={isOpeningThis}
                            onClick={(e) => handleOpenItem(item, e)}
                          >
                            {isOpeningThis ? 'Opening...' : 'View Report'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
          </>
        ) : (
          <div className="py-14 text-center text-xs text-slate-500 space-y-3">
            <History className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No History Records Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Run your first procurement specification analysis to populate this audit log.
            </p>
            <Button size="sm" onClick={() => navigate('/analysis/new')}>
              Start Specification Analysis
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(itemToDelete)}
        onClose={() => !isDeleting && setItemToDelete(null)}
        title="Delete this analysis record?"
        size="sm"
      >
        <div className="space-y-4 pt-1">
          <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Are you sure you want to delete this analysis?</p>
              <p className="text-[11px] text-rose-700 mt-0.5">
                "{itemToDelete?.productName}" will be removed from your audit history.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              size="sm"
              variant="secondary"
              disabled={isDeleting}
              onClick={() => setItemToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="danger"
              loading={isDeleting}
              icon={Trash2}
              onClick={handleConfirmDelete}
            >
              Delete Record
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
