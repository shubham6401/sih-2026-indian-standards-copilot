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
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { useAnalysis } from '../context/AnalysisContext';
import { api } from '../services/api';

export const AnalysisHistoryPage = () => {
  const navigate = useNavigate();
  const { history, loadHistory, showToast } = useAnalysis();
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this procurement analysis record?')) return;

    try {
      setDeletingId(id);
      try {
        await api.deleteAnalysis(id);
      } catch (err) {}
      setHistory(prev => {
        const next = prev.filter(item => String(item._id) !== String(id));
        try {
          localStorage.setItem('is_analysis_history', JSON.stringify(next));
        } catch (e) {}
        return next;
      });
      showToast('Analysis removed from history.', 'info');
    } catch (err) {
      showToast('Failed to delete analysis: ' + err.message, 'error');
    } finally {
      setDeletingId(null);
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
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
                {filteredHistory.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => navigate(`/analysis/result/${item._id}`)}
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
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
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
                          onClick={() => navigate(`/analysis/result/${item._id}`)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" /> View
                        </Button>
                        <button
                          type="button"
                          disabled={deletingId === item._id}
                          onClick={(e) => handleDelete(item._id, e)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    </div>
  );
};
