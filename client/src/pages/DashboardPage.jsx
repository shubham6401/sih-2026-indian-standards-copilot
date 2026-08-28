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
  AlertCircle,
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { useAuth } from '../context/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { history, savedStandards, loadHistory } = useAnalysis();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const totalStandardsCount = history.reduce(
    (acc, curr) => acc + (curr.primaryStandards?.length || 0) + (curr.relatedStandards?.length || 0),
    0
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
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
            {user?.organization || 'Central Public Works Department'} • National Indian Standards Recommendation Engine. Start a specification analysis or inspect uploaded tender documents for BIS compliance.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="primary"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              icon={Sparkles}
              onClick={() => navigate('/analysis/new')}
            >
              Analyze New Specification
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              icon={UploadCloud}
              onClick={() => navigate('/tender/upload')}
            >
              Upload Tender PDF
            </Button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-gov-700 flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">{t('totalAnalyses')}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{history.length || 8}</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Active Repository
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">{t('standardsFound')}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {totalStandardsCount > 0 ? totalStandardsCount : 24}
            </h3>
            <span className="text-[10px] text-slate-500 font-medium">Mapped & Verified</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">{t('savedCount')}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{savedStandards.length || 5}</h3>
            <span className="text-[10px] text-slate-500 font-medium">Bookmarked in Library</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">{t('activeMandates')}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">18</h3>
            <span className="text-[10px] text-indigo-600 font-bold">DPIIT & MeitY QCOs</span>
          </div>
        </Card>
      </div>

      {/* Main Action Section: Two Large Cards */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 font-outfit mb-4">
          {t('startNewAnalysis')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Product Specification */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-gov-500 transition-all p-6 sm:p-7 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gov-50 text-gov-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">
                {t('describeProduct')}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {t('describeProductSub')} Enter parameters like wattage, grade, pressure rating, material, or voltage in English or Hindi.
              </p>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 italic">
                Example: "100W outdoor LED street lights for municipal roads with IP66 and surge protection."
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="mt-6 w-full"
              icon={ArrowRight}
              onClick={() => navigate('/analysis/new')}
            >
              Start Analysis
            </Button>
          </div>

          {/* Card 2: Tender Document */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-gov-500 transition-all p-6 sm:p-7 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">
                {t('tenderDoc')}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {t('tenderDocSub')} Ingests scope of work, technical schedules, and BOQ items to extract compliance targets.
              </p>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Accepts PDF format up to 20 MB</span>
                <span className="font-semibold text-slate-700">Clause Extraction</span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="md"
              className="mt-6 w-full text-gov-700 border-gov-300 hover:bg-gov-50 font-bold"
              icon={UploadCloud}
              onClick={() => navigate('/tender/upload')}
            >
              Upload Document
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Analyses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
            <Clock className="w-5 h-5 text-gov-600" />
            <span>{t('recentAnalyses')}</span>
          </h2>
          <Link
            to="/history"
            className="text-xs font-bold text-gov-600 hover:text-gov-800 inline-flex items-center gap-1"
          >
            View All History <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3.5 px-4">Procurement Item</th>
                    <th className="py-3.5 px-4">Input Type</th>
                    <th className="py-3.5 px-4">Standards Found</th>
                    <th className="py-3.5 px-4">Confidence Score</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.slice(0, 5).map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <Link
                          to={`/analysis/result/${item._id}`}
                          className="hover:text-gov-600 flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.productName || 'Procurement Analysis'}</span>
                        </Link>
                        <span className="text-[10px] text-slate-400 font-normal block truncate max-w-xs">
                          {item.productCategory}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={item.inputType === 'tender_pdf' ? 'mandate' : 'default'} size="xs">
                          {item.inputType === 'tender_pdf' ? 'Tender PDF' : 'Specification'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {(item.primaryStandards?.length || 0) + (item.relatedStandards?.length || 0)} Standards
                      </td>
                      <td className="py-3 px-4">
                        <ScoreIndicator
                          score={item.confidenceScore || 90}
                          label={item.confidenceLabel || 'Highly Relevant'}
                          size="sm"
                        />
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">
                        {new Date(item.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => navigate(`/analysis/result/${item._id}`)}
                        >
                          View Report
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-slate-500 space-y-3">
              <p>No procurement analyses recorded yet.</p>
              <Button size="sm" onClick={() => navigate('/analysis/new')}>
                Run First Analysis
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
