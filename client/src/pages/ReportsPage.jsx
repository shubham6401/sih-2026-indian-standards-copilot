import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FileSpreadsheet,
  Download,
  Eye,
  Sparkles,
  Trash2,
  AlertTriangle,
  Search
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { Modal } from '../components/common/Modal';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';
import { generateProcurementReportPdf } from '../utils/generatePdfReport';
import { DemoPersonaBar } from '../components/common/DemoPersonaBar';

export const ReportsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { history, loadHistory, deleteAnalysisRecord, setCurrentAnalysis } = useAnalysis();
  const { t, lang } = useLanguage();

  const urlSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(urlSearch);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [reportToDelete, setReportToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openingId, setOpeningId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      const next = new URLSearchParams();
      if (search.trim()) next.set('search', search.trim());
      if (next.toString() !== searchParams.toString()) {
        setSearchParams(next, { replace: true });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [search, searchParams, setSearchParams]);

  const handleOpenReport = (rep) => {
    const id = rep._id || rep.id;
    if (!id) return;
    setOpeningId(id);
    setCurrentAnalysis(rep);
    navigate(`/reports/${id}`);
  };

  const openDeleteModal = (rep, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setReportToDelete(rep);
  };

  const handleConfirmDelete = async () => {
    if (!reportToDelete) return;
    setIsDeleting(true);

    try {
      await deleteAnalysisRecord(reportToDelete._id || reportToDelete.id);
      setReportToDelete(null);
    } catch (err) {
      // Handled in context toast
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredReports = useMemo(() => {
    let result = history;

    if (statusFilter !== 'ALL') {
      result = result.filter(rep => (rep.status || 'Completed').toLowerCase() === statusFilter.toLowerCase());
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((rep) => {
        return (
          (rep.productName || '').toLowerCase().includes(query) ||
          (rep.productCategory || '').toLowerCase().includes(query) ||
          (rep.rawInput || '').toLowerCase().includes(query) ||
          (rep.reportType || '').toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [history, search, statusFilter]);

  const statusOptions = ['ALL', 'Completed', 'Under Review', 'Needs Attention', 'Compliance Risk', 'Draft'];

  const getStatusBadgeVariant = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'completed': return 'success';
      case 'under review': return 'secondary';
      case 'needs attention': return 'warning';
      case 'compliance risk': return 'danger';
      case 'draft': return 'neutral';
      default: return 'primary';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              {t('procurementDocumentation', 'Procurement Documentation')}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {t('complianceDossiers', 'Standards Compliance Dossiers')}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            {t('reportsRepoTitle', 'Procurement Reports Repository')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('reportsRepoSubtitle', 'Export, download, and manage formal compliance assessment dossiers ready for inclusion in official tender files.')}
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={Sparkles}
          onClick={() => navigate('/analysis/new')}
        >
          {t('generateNewReport', 'Generate New Report')}
        </Button>
      </div>

      {/* Demo Stakeholder Account Quick Switcher (Direct 1-Click Role Isolation) */}
      <DemoPersonaBar title={t('switchDemoAccount', 'Switch Demo Account • 32 Pre-Seeded Reports Per Role')} />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {statusOptions.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-gov-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {t(st)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchReportsPlaceholder', 'Search reports by keyword, product, or standard...')}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
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
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">
                          {reportId}
                        </span>
                        <Badge variant={getStatusBadgeVariant(rep.status)} size="xs">
                          {t(rep.status || 'Completed')}
                        </Badge>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-gov-800 transition-colors">
                        {rep.productName || 'Procurement Dossier'}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {rep.productCategory || 'Engineering Works'}
                      </p>
                    </div>

                    <ScoreIndicator
                      score={rep.confidenceScore || 90}
                      label={rep.confidenceLabel || 'Relevant'}
                      size="sm"
                    />
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {rep.rawInput || 'Procurement technical specification analyzed against Bureau of Indian Standards (BIS) repository.'}
                  </p>

                  <div className="mt-3 flex items-center gap-3 text-[11px]">
                    <span className="text-slate-600">
                      <strong>{t('standards', 'Standards')}: </strong>
                      {(rep.primaryStandards?.length || 0) + (rep.relatedStandards?.length || 0)}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">
                      <strong>{lang === 'hi' ? 'पहचानी गई कमियां:' : 'Gaps Flagged:'} </strong> {rep.tenderGaps?.length || 0}
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
                      title={t('deleteReport', 'Delete Report')}
                      aria-label={t('deleteReport', 'Delete Report')}
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
                      disabled={openingId === (rep._id || rep.id)}
                      onClick={() => handleOpenReport(rep)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      {openingId === (rep._id || rep.id) ? t('openingReport', 'Opening...') : t('viewFullDossier', 'View Full Dossier')}
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
          <h3 className="text-base font-bold text-slate-900">{t('noReportsFound', 'No Reports Found')}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {lang === 'hi'
              ? 'अनुपालन रिपोर्ट डोजियर उत्पन्न करने के लिए किसी तकनीकी विनिर्देश या निविदा पीडीएफ पर विश्लेषण चलाएं।'
              : 'Run an analysis on a technical specification or tender PDF to generate a compliance report dossier.'}
          </p>
          <Button size="sm" variant="primary" onClick={() => navigate('/analysis/new')}>
            {t('startAnalysisBtn', 'Start New Analysis')}
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(reportToDelete)}
        onClose={() => !isDeleting && setReportToDelete(null)}
        title={t('deleteReport', 'Delete this report?')}
        size="sm"
      >
        <div className="space-y-4 pt-1">
          <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{t('confirmDeleteReport', 'Are you sure you want to permanently delete this procurement report?')}</p>
              <p className="text-[11px] text-rose-700 mt-0.5">
                "{reportToDelete?.productName}" {t('actionCannotBeUndone', 'will be permanently removed from your reports repository and audit log. This action cannot be undone.')}
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
              {t('cancel', 'Cancel')}
            </Button>
            <Button
              size="sm"
              variant="danger"
              loading={isDeleting}
              icon={Trash2}
              onClick={handleConfirmDelete}
            >
              {t('deleteReport', 'Delete Report')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
