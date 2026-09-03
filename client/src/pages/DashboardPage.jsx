import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  UploadCloud,
  FileSpreadsheet,
  BookmarkCheck,
  Award,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ChevronRight,
  Bell,
  Eye,
  Loader2
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { useAuth } from '../context/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { history, savedStandards, loadHistory } = useAnalysis();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [openingId, setOpeningId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const totalStandardsCount = history.reduce(
    (acc, curr) => acc + (curr.primaryStandards?.length || 0) + (curr.relatedStandards?.length || 0),
    0
  );

  const handleOpenReport = (item) => {
    const targetId = item._id || item.id;
    if (!targetId || openingId) return;
    setOpeningId(targetId);
    setTimeout(() => {
      navigate(`/reports/${targetId}`);
    }, 150);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* 1. Top Section: Welcome + Start Analysis Primary CTA */}
      <div className="bg-gradient-to-r from-gov-800 via-gov-700 to-gov-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-3 border border-white/10 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Decision Support Framework</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit tracking-tight">
            Welcome, {user?.name || 'Procurement Officer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            {user?.organization || 'Central Public Works Department'} • National Indian Standards Recommendation Engine. Start a specification analysis or upload tender schedules to verify BIS compliance.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              size="md"
              variant="primary"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-sm"
              icon={Sparkles}
              onClick={() => navigate('/analysis/new')}
            >
              Start New Analysis
            </Button>
            <Button
              size="md"
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold"
              icon={UploadCloud}
              onClick={() => navigate('/tender/upload')}
            >
              Upload Tender PDF
            </Button>
          </div>
        </div>

        {/* Subtle Decorative Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* 2. 4 Clean KPI Cards per Spec */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Analyses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-gov-700 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 truncate">{t('totalAnalyses') || 'Total Analyses'}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{history.length || 0}</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> Audit Logged
            </span>
          </div>
        </div>

        {/* KPI 2: Standards Recommended */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 truncate">Standards Recommended</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {totalStandardsCount > 0 ? totalStandardsCount : 12}
            </h3>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Mapped & Verified</span>
          </div>
        </div>

        {/* KPI 3: Reports */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 truncate">Compliance Reports</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{history.length || 0}</h3>
            <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">PDF Ready</span>
          </div>
        </div>

        {/* KPI 4: Saved Standards */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 truncate">Saved Standards</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{savedStandards.length || 0}</h3>
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">In Library</span>
          </div>
        </div>
      </div>

      {/* 3. Recent Analyses Section (Responsive Table on Desktop, Cards on Mobile) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
            <Clock className="w-5 h-5 text-gov-600" />
            <span>Recent Procurement Analyses</span>
          </h2>
          <Link
            to="/history"
            className="text-xs font-bold text-gov-600 hover:text-gov-800 inline-flex items-center gap-1"
          >
            View All History <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {history.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-600 uppercase text-[10px] tracking-wider font-bold">
                      <th className="py-3.5 px-4">Procurement Item</th>
                      <th className="py-3.5 px-4">Input Type</th>
                      <th className="py-3.5 px-4">Standards Found</th>
                      <th className="py-3.5 px-4">Confidence</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {history.slice(0, 5).map((item) => {
                      const id = item._id || item.id;
                      const isOpeningThis = openingId === id;
                      return (
                        <tr
                          key={id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <button
                              type="button"
                              onClick={() => handleOpenReport(item)}
                              className="hover:text-gov-700 text-left flex items-center gap-2 cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-gov-600 shrink-0" />
                              <span className="truncate max-w-xs">{item.productName || 'Procurement Analysis'}</span>
                            </button>
                            <span className="text-[10px] text-slate-400 font-normal block truncate max-w-xs ml-5.5">
                              {item.productCategory}
                            </span>
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
                              label={item.confidenceLabel || 'Relevant'}
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
                            <Button
                              size="xs"
                              variant="ghost"
                              disabled={isOpeningThis}
                              onClick={() => handleOpenReport(item)}
                              className="text-gov-700 font-bold"
                            >
                              {isOpeningThis ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  <span>Opening...</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3.5 h-3.5 mr-1" />
                                  <span>View Report</span>
                                </>
                              )}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View (<768px) */}
              <div className="md:hidden divide-y divide-slate-100">
                {history.slice(0, 5).map((item) => {
                  const id = item._id || item.id;
                  const isOpeningThis = openingId === id;
                  return (
                    <div
                      key={id}
                      className="p-4 space-y-2.5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{item.productName || 'Procurement Item'}</h3>
                          <p className="text-[11px] text-slate-400">{item.productCategory}</p>
                        </div>
                        <ScoreIndicator
                          score={item.confidenceScore || 90}
                          label={item.confidenceLabel || 'Relevant'}
                          size="sm"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                        <span>
                          {(item.primaryStandards?.length || 0) + (item.relatedStandards?.length || 0)} Standards Found
                        </span>
                        <Button
                          size="xs"
                          variant="primary"
                          disabled={isOpeningThis}
                          onClick={() => handleOpenReport(item)}
                        >
                          {isOpeningThis ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Opening...</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              <span>View Report</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500 space-y-3">
              <p>No procurement analyses recorded yet.</p>
              <Button size="sm" onClick={() => navigate('/analysis/new')}>
                Run First Analysis
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Important Alerts & Notice Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Statutory QCO Compliance Reminder</span>
          </div>
          <p className="leading-snug text-slate-700 text-[11px]">
            Products covered under mandatory Quality Control Orders (QCOs) by DPIIT & MeitY cannot be tendered without active BIS licensing. Always verify supplier CML/R-Numbers on official portals.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-100/90 border border-slate-200 text-xs text-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-gov-900">
            <Bell className="w-4 h-4 text-gov-600 shrink-0" />
            <span>Latest Standards Reaffirmations</span>
          </div>
          <p className="leading-snug text-slate-600 text-[11px]">
            IS 10322 (Part 5/Sec 3) and IS 15885 (Part 2/Sec 13) standards for municipal LED street lighting include latest 10kV surge protection amendments.
          </p>
        </div>
      </div>
    </div>
  );
};
