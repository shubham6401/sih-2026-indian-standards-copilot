import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Eye,
  FileText,
  Sparkles,
  Calendar,
  Layers,
  Award,
  Trash2,
  AlertTriangle,
  Search,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { Modal } from '../components/common/Modal';
import { useAnalysis } from '../context/AnalysisContext';
import { generateProcurementReportPdf } from '../utils/generatePdfReport';
import { api } from '../services/api';

export const ReportsPage = () => {
  const navigate = useNavigate();
  const { history, loadHistory, deleteAnalysisRecord } = useAnalysis();
  const [search, setSearch] = useState('');
  const [reportToDelete, setReportToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const openDeleteModal = (rep, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setReportToDelete(rep);
  };

  const handleConfirmDelete = async () => {
    if (!reportToDelete) return;
    setIsDeleting(true);

    try {
      await deleteAnalysisRecord(reportToDelete._id);
      setReportToDelete(null);
    } catch (err) {
      // Handled in context toast
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredReports = history.filter((rep) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      rep.productName?.toLowerCase().includes(query) ||
      rep.productCategory?.toLowerCase().includes(query) ||
      rep.rawInput?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Procurement Documentation
            </span>
            <span className="text-xs text-slate-500 font-medium">Standards Compliance Dossiers</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            Procurement Reports Repository
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Export, download, and manage formal compliance assessment dossiers ready for inclusion in official tender files.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={Sparkles}
          onClick={() => navigate('/analysis/new')}
        >
          Generate New Report
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter reports by product name, category, or requirement keywords..."
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500 focus:outline-none"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
      </div>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((rep) => {
            const reportId = `REP-BIS-${String(rep._id || '2026').slice(-8).toUpperCase()}`;
            return (
              <div
                key={rep._id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {reportId}
                      </span>
                      <Badge variant="primary" size="xs">
                        {rep.productCategory}
                      </Badge>
                    </div>
                    <ScoreIndicator
                      score={rep.confidenceScore || 90}
                      label={rep.confidenceLabel || 'Highly Relevant'}
                      size="sm"
                    />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-outfit">
                    {rep.productName}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 italic">
                    "{rep.rawInput}"
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                    <span className="text-slate-600">
                      <strong>Primary: </strong> {rep.primaryStandards?.[0]?.standardNumber || 'IS Standard'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">
                      <strong>Standards: </strong> {(rep.primaryStandards?.length || 0) + (rep.relatedStandards?.length || 0)}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">
                      <strong>Gaps Flagged: </strong> {rep.tenderGaps?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {new Date(rep.createdAt || Date.now()).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => openDeleteModal(rep, e)}
                      title="Delete Report"
                      aria-label="Delete Report"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Button
                      size="xs"
                      variant="ghost"
                      icon={Download}
                      onClick={() => {
                        generateProcurementReportPdf(rep);
                      }}
                    >
                      PDF
                    </Button>

                    <Button
                      size="xs"
                      variant="primary"
                      onClick={() => navigate(`/analysis/result/${rep._id}`)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> View Full Report
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gov-50 text-gov-600 flex items-center justify-center mx-auto">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Reports Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Run an analysis on a technical specification or tender PDF to generate a compliance report dossier.
          </p>
          <Button size="sm" variant="primary" onClick={() => navigate('/analysis/new')}>
            Start New Analysis
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(reportToDelete)}
        onClose={() => !isDeleting && setReportToDelete(null)}
        title="Delete this report?"
        size="sm"
      >
        <div className="space-y-4 pt-1">
          <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Are you sure you want to delete this report?</p>
              <p className="text-[11px] text-rose-700 mt-0.5">
                "{reportToDelete?.productName}" will be permanently removed from your reports repository and audit log. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              size="sm"
              variant="secondary"
              disabled={isDeleting}
              onClick={() => setReportToDelete(null)}
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
              Delete Report
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
