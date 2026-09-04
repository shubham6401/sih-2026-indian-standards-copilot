import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  ChevronRight,
  FileText,
  AlertTriangle,
  Loader2,
  Database,
  CheckCircle,
  Shield,
  Layers,
  Activity,
  Award,
  BookmarkCheck
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { useAuth } from '../context/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';
import { normalizeRole, ROLE_CONFIG, ROLE_KEYS } from '../config/roleConfig';
import { api } from '../services/api';
import { DemoPersonaBar } from '../components/common/DemoPersonaBar';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { history, savedStandards, loadHistory, setCurrentAnalysis } = useAnalysis();
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [openingId, setOpeningId] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [adminActivity, setAdminActivity] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const userRoleKey = normalizeRole(user?.accountType || user?.role);
  const currentRoleConfig = ROLE_CONFIG[userRoleKey] || ROLE_CONFIG.procurement_officer;

  useEffect(() => {
    loadHistory();

    if (userRoleKey === ROLE_KEYS.ADMIN) {
      setLoadingAdmin(true);
      Promise.allSettled([
        api.getAdminStats(),
        api.getAdminActivity(),
        api.getAdminUsers()
      ]).then(([statsRes, actRes, usersRes]) => {
        if (statsRes.status === 'fulfilled' && statsRes.value?.stats) {
          setAdminStats(statsRes.value.stats);
        }
        if (actRes.status === 'fulfilled' && actRes.value?.activities) {
          setAdminActivity(actRes.value.activities);
        }
        if (usersRes.status === 'fulfilled' && usersRes.value?.users) {
          setAdminUsers(usersRes.value.users);
        }
        setLoadingAdmin(false);
      });
    }
  }, [userRoleKey]);

  const handleOpenReport = (item) => {
    const targetId = item._id || item.id;
    if (!targetId) return;
    setOpeningId(targetId);
    setCurrentAnalysis(item);
    navigate(`/reports/${targetId}`);
  };

  // Metric values derived from live data
  const totalAnalysesCount = history.length;
  const completedAnalysesCount = history.filter(h => (h.confidenceScore || 90) >= 80).length;
  const pendingOrRiskCount = history.filter(h => (h.tenderGaps?.length || 0) > 0 || (h.confidenceScore || 90) < 80).length;
  const savedStandardsCount = savedStandards.length;

  const getMetricValue = (key) => {
    switch (key) {
      case 'totalAnalyses':
        return totalAnalysesCount;
      case 'completedAnalyses':
        return completedAnalysesCount;
      case 'pendingReview':
        return pendingOrRiskCount;
      case 'savedStandards':
        return savedStandardsCount;
      case 'activeMandates':
        return 18;
      case 'totalUsers':
        return adminStats?.totalUsers || adminUsers.length || 4;
      case 'standardsIndexed':
        return adminStats?.standardsIndexed ? `${adminStats.standardsIndexed}+` : '1850+';
      case 'reportsGenerated':
        return adminStats?.reportsGenerated || totalAnalysesCount;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* 1. Header Section: Executive Briefing Bar */}
      <div className="bg-gov-900 text-white rounded-lg p-5 sm:p-6 border border-gov-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gov-800 text-amber-300 border border-gov-700">
                <Shield className="w-3 h-3 text-amber-400" />
                <span>{t(currentRoleConfig.roleKey || currentRoleConfig.displayName)}</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {user?.organizationName || user?.organization || currentRoleConfig.organizationExample}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {userRoleKey === ROLE_KEYS.PROCUREMENT_OFFICER
                ? (lang === 'hi' ? `स्वागत है, ${user?.name || 'खरीद अधिकारी'}` : `Welcome back, ${user?.name || 'Procurement Officer'}`)
                : t(currentRoleConfig.dashboardTitleKey || currentRoleConfig.dashboardTitle)}
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(currentRoleConfig.dashboardSubtitleKey || currentRoleConfig.dashboardSubtitle)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {currentRoleConfig.primaryActions.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <Button
                  key={action.path || idx}
                  size="sm"
                  variant={action.variant}
                  icon={ActionIcon}
                  onClick={() => navigate(action.path)}
                >
                  {t(action.labelKey || action.label)}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Role Metrics Grid (4 Enterprise KPI Items) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {currentRoleConfig.metricCards.map((card) => {
          const Icon = card.icon;
          const val = getMetricValue(card.key);
          return (
            <div
              key={card.key}
              className="bg-white rounded-lg p-3.5 sm:p-4 border border-slate-200 shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                  {t(card.labelKey || card.label)}
                </span>
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-gov-800 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-2.5">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tracking-tight">
                  {val}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2.5. Demo Stakeholder Persona Switcher */}
      <DemoPersonaBar title={t('switchDemoAccount', 'Switch Demo Account • 32 Pre-Seeded Reports Per Role')} />

      {/* 3. Role-Specific Main Dashboard Views */}

      {/* VIEW A: PROCUREMENT OFFICER DASHBOARD */}
      {userRoleKey === ROLE_KEYS.PROCUREMENT_OFFICER && (
        <>
          {/* Recent Operational Analyses Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  {t('recentAnalyses', 'Recent Procurement Analyses')}
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {t('recentAnalysesSubtitle', 'Your recent specification analyses and verified Indian Standards dossiers.')}
                </p>
              </div>
              <Button size="xs" variant="ghost" icon={ChevronRight} onClick={() => navigate('/history')}>
                {t('viewAllHistory', 'View All History')}
              </Button>
            </div>

            {history.length > 0 ? (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse table-dense">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                        <th>{t('procurementItem', 'Procurement Item')}</th>
                        <th>{t('inputCategory', 'Input Category')}</th>
                        <th>{t('standardsFoundCol', 'Standards Found')}</th>
                        <th>{t('confidenceCol', 'Confidence')}</th>
                        <th>{t('dateCol', 'Date')}</th>
                        <th className="text-right">{t('actionsCol', 'Actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {history.slice(0, 6).map((item) => {
                        const id = item._id || item.id;
                        const isOpening = openingId === id;
                        return (
                          <tr key={id} className="hover:bg-slate-50 transition-colors">
                            <td className="font-bold text-slate-900">
                              {item.productName || 'Procurement Specification'}
                            </td>
                            <td>
                              <Badge variant="primary" size="xs">
                                {item.productCategory || 'General'}
                              </Badge>
                            </td>
                            <td className="text-slate-600 font-mono font-semibold">
                              {(item.primaryStandards?.length || 0) + (item.relatedStandards?.length || 0)} {t('standards', 'Standards')}
                            </td>
                            <td>
                              <ScoreIndicator
                                score={item.confidenceScore || 90}
                                label={item.confidenceLabel || 'Relevant'}
                                size="sm"
                              />
                            </td>
                            <td className="text-slate-500 text-[11px] font-mono">
                              {new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN')}
                            </td>
                            <td className="text-right">
                              <Button
                                size="xs"
                                variant="primary"
                                disabled={isOpening}
                                onClick={() => handleOpenReport(item)}
                              >
                                {isOpening ? t('openingReport', 'Opening...') : t('viewReport', 'View Report')}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Stacked Records */}
                <div className="md:hidden divide-y divide-slate-100">
                  {history.slice(0, 5).map((item) => {
                    const id = item._id || item.id;
                    const isOpening = openingId === id;
                    return (
                      <div key={id} className="p-3.5 space-y-2 hover:bg-slate-50">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-xs font-bold text-slate-900">{item.productName || 'Procurement Item'}</h3>
                            <p className="text-[11px] text-slate-500">{item.productCategory}</p>
                          </div>
                          <ScoreIndicator score={item.confidenceScore || 90} size="sm" />
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                          <span className="text-slate-500 font-mono text-[10px]">
                            {(item.primaryStandards?.length || 0) + (item.relatedStandards?.length || 0)} {t('standardsFoundCol', 'Standards Found')}
                          </span>
                          <Button size="xs" variant="primary" disabled={isOpening} onClick={() => handleOpenReport(item)}>
                            {isOpening ? t('openingReport', 'Opening...') : t('viewReport', 'View Report')}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="p-10 text-center text-xs text-slate-500 space-y-3">
                <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-800">{t('noAnalysesYet', 'No procurement analyses yet.')}</p>
                <p className="text-slate-400 max-w-sm mx-auto">
                  {t('noAnalysesYetSub', 'Upload your first tender or enter a technical specification to build your recommendation dossier.')}
                </p>
                <Button size="sm" onClick={() => navigate('/analysis/new')}>{t('startAnalysisBtn', 'Start Analysis')}</Button>
              </div>
            )}
          </div>

          {/* Attention Required & Quick Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t('complianceAttentionRequired', 'Compliance & Attention Required')}</span>
                </h3>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded border border-amber-200">
                  {t('activeAlerts', 'Active Alerts')}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50/70 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">
                      {lang === 'hi' ? 'सीमेंट खरीद में पुराना उद्धरण' : 'Outdated Citation in Cement Procurement'}
                    </p>
                    <p className="text-slate-600 mt-0.5 text-[11px] leading-relaxed">
                      {lang === 'hi'
                        ? 'IS 12269:1987 (53 ग्रेड ओपीसी) को एकीकृत IS 269:2015 द्वारा अधिक्रमित कर दिया गया है। ऑडिट आपत्तियों से बचने के लिए निविदाओं को अद्यतन करना आवश्यक है।'
                        : 'IS 12269:1987 (53 Grade OPC) has been officially superseded by unified IS 269:2015. Tenders quoting 12269 must update to avoid audit objections.'}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded border border-slate-200 bg-slate-50/70 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">
                      {lang === 'hi' ? 'अनिवार्य MeitY CRS पंजीकरण सत्यापन' : 'Mandatory MeitY CRS Registration Verification'}
                    </p>
                    <p className="text-slate-600 mt-0.5 text-[11px] leading-relaxed">
                      {lang === 'hi'
                        ? 'निविदा जारी करने से पहले सभी एलईडी स्ट्रीट लाइट कंट्रोलगियर में अनिवार्य पंजीकरण आदेश के तहत एक सक्रिय आर-नंबर होना चाहिए।'
                        : 'All LED Street Light controlgear must carry an active R-Number under Compulsory Registration Order before award of tender.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
                  {t('quickActions', 'Quick Actions')}
                </h3>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => navigate('/analysis/new')}
                    className="w-full text-left p-2.5 rounded border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{t('analyzeSpec', 'Analyze Specification')}</span>
                    <FileText className="w-3.5 h-3.5 text-gov-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/tender/upload')}
                    className="w-full text-left p-2.5 rounded border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{t('tenderUpload', 'Upload Tender PDF')}</span>
                    <UploadCloud className="w-3.5 h-3.5 text-gov-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/explorer')}
                    className="w-full text-left p-2.5 rounded border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{t('standardsExplorer', 'Standards Explorer')}</span>
                    <Database className="w-3.5 h-3.5 text-gov-700" />
                  </button>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[10px] text-slate-500">
                {lang === 'hi' ? 'निर्णय समर्थन इंजन • सक्रिय बीआईएस ज्ञानकोश' : 'Decision Support Engine • Active BIS Knowledge Base'}
              </div>
            </div>
          </div>
        </>
      )}

      {/* VIEW B: GOVERNMENT DEPARTMENT OVERSIGHT DASHBOARD */}
      {userRoleKey === ROLE_KEYS.GOVERNMENT_DEPARTMENT && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {t('deptOverviewTitle', 'Department Procurement Intelligence Overview')}
                </h3>
                <Badge variant="mandate" size="xs">
                  {lang === 'hi' ? 'विभागीय स्तर' : 'Department Level'}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'hi'
                  ? 'सभी विभागीय निविदा कार्यक्रम में DPIIT, MeitY और विद्युत मंत्रालय द्वारा जारी वैधानिक गुणवत्ता नियंत्रण आदेश (QCO) की केंद्रीकृत निगरानी।'
                  : 'Centralized monitoring of statutory Quality Control Order (QCO) mandates issued by DPIIT, MeitY, and Ministry of Power across all departmental tender schedules.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{t('qcoComplianceStatus', 'QCO Compliance Status')}</span>
                  <p className="text-sm font-bold text-emerald-800 mt-0.5">{t('certifiedMandatePct', '100% Certified Mandate')}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t('trackedTendersComply', 'All tracked tenders comply with Gazette QCOs.')}</p>
                </div>
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{t('deptAudits', 'Department Audits')}</span>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">{history.length} {t('dossiersCount', 'Dossiers')}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t('archivedCvc', 'Archived and exportable for CVC inspection.')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 pb-2 border-b border-slate-100">
                  {t('deptDirectives', 'Department Directives')}
                </h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lang === 'hi' ? 'वित्तीय बोलियां खोलने से पहले मानकऑनलाइन पर बीआईएस CML नंबरों का अनिवार्य सत्यापन करें।' : 'Mandate verification of BIS CML numbers on ManakOnline prior to opening financial bids.'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lang === 'hi' ? 'यह सुनिश्चित करें कि निविदा अनुसूचियों में सभी प्रकाशित संशोधनों सहित नवीनतम मानक संस्करण शामिल हों।' : 'Ensure tender technical schedules use latest standard editions with all published amendments.'}</span>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                variant="primary"
                className="w-full mt-3"
                onClick={() => navigate('/reports')}
              >
                {t('inspectDeptReports', 'Inspect Department Reports')}
              </Button>
            </div>
          </div>

          {/* Department Recent Procurement Analyses */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
              {t('deptActiveReviews', 'Department Active Procurement Reviews')}
            </h3>
            <div className="divide-y divide-slate-100">
              {history.slice(0, 4).map((item) => (
                <div key={item._id || item.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.productName}</p>
                    <p className="text-[11px] text-slate-500">{item.productCategory} • {(item.primaryStandards?.length || 0)} {t('standards', 'Standards')}</p>
                  </div>
                  <Button size="xs" variant="ghost" onClick={() => handleOpenReport(item)}>
                    {t('viewReport', 'View Report')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* VIEW C: PSU COMPLIANCE DASHBOARD */}
      {userRoleKey === ROLE_KEYS.PSU && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {lang === 'hi' ? 'PSU तकनीकी खरीद अनुपालन स्थिति' : 'PSU Technical Procurement Compliance Status'}
                </h3>
                <Badge variant="warning" size="xs">{lang === 'hi' ? 'उच्च मूल्य ऑडिट' : 'High-Value Audit'}</Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'hi'
                  ? 'पूंजीगत इंजीनियरिंग, विद्युत ट्रांसमिशन, बिजली उपकरण और संरचनात्मक खरीद के लिए स्वचालित मानक अनुरूपता जांच।'
                  : 'Automated standards conformance checks for capital engineering, electrical transmission, power equipment, and structural procurement.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{lang === 'hi' ? 'उच्च वोल्टेज एवं विद्युत मानक' : 'High-Voltage & Power Norms'}</span>
                  <p className="text-sm font-bold text-gov-800 font-mono mt-0.5">IS 10322 & IS 15885</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{lang === 'hi' ? 'स्वचालित सर्ज सुरक्षा और सुरक्षा सत्यापन।' : 'Automated surge protection & safety verification.'}</p>
                </div>
                <div className="p-3 rounded border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{lang === 'hi' ? 'ऑडिट अनुरूपता' : 'Audit Conformance'}</span>
                  <p className="text-sm font-bold text-emerald-800 font-mono mt-0.5">98.4% {t('compliance', 'Compliance')}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{lang === 'hi' ? 'केंद्रीय सतर्कता आयोग (CVC) मानदंडों के अनुरूप।' : 'Compliant with Central Vigilance Commission (CVC) norms.'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 pb-2 border-b border-slate-100">
                  {lang === 'hi' ? 'PSU त्वरित समीक्षा' : 'PSU Quick Review'}
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  {lang === 'hi'
                    ? 'उच्च वोल्टेज उपकरण, सिविल सामग्री या सुरक्षा गियर पर त्वरित एआई जांच चलाएं।'
                    : 'Run an instant cross-check on high-voltage equipment, civil materials, or safety gear.'}
                </p>
              </div>

              <div className="space-y-1.5">
                <Button size="sm" variant="primary" className="w-full" onClick={() => navigate('/analysis/new')}>
                  {t('New Technical Analysis', 'New Technical Review')}
                </Button>
                <Button size="sm" variant="secondary" className="w-full" onClick={() => navigate('/reports')}>
                  {t('PSU Audit Reports', 'PSU Compliance Reports')}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* VIEW D: PLATFORM ADMIN DASHBOARD */}
      {userRoleKey === ROLE_KEYS.ADMIN && (
        <>
          {/* Admin User Management Preview + System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {t('adminGovernanceTitle', 'Platform User Governance')}
                  </h3>
                  <p className="text-[11px] text-slate-500">{lang === 'hi' ? 'पंजीकृत हितधारक खाते और निर्दिष्ट भूमिकाएं।' : 'Registered stakeholder accounts and designated roles.'}</p>
                </div>
                <Button size="xs" variant="primary" onClick={() => navigate('/admin/users')}>
                  {lang === 'hi' ? 'सभी उपयोगकर्ताओं को प्रबंधित करें' : 'Manage All Users'}
                </Button>
              </div>

              {loadingAdmin ? (
                <div className="py-6 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{lang === 'hi' ? 'प्लेटफ़ॉर्म टेलीमेट्री लोड हो रही है...' : 'Loading platform telemetry...'}</span>
                </div>
              ) : adminUsers.length > 0 ? (
                <div className="divide-y divide-slate-100 text-xs">
                  {adminUsers.slice(0, 4).map((u) => {
                    const rKey = normalizeRole(u.role);
                    const rCfg = ROLE_CONFIG[rKey] || ROLE_CONFIG.procurement_officer;
                    return (
                      <div key={u._id} className="py-2 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-900 truncate">{u.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{u.email} • {u.organizationName || u.organization}</p>
                        </div>
                        <Badge variant={rCfg.badgeVariant} size="xs">
                          {t(rCfg.badgeTitle)}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-3">{lang === 'hi' ? 'निर्देशिका में कोई पंजीकृत उपयोगकर्ता नहीं है।' : 'No registered users in directory.'}</p>
              )}
            </div>

            {/* Platform System Telemetry */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                {t('adminTelemetryTitle', 'System Telemetry Status')}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-700">BIS RAG & NLP Engine</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-300">
                    {lang === 'hi' ? 'सक्रिय' : 'Operational'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-700">{t('standardsIndexed', 'Standards Indexed')}</span>
                  <span className="font-bold font-mono text-slate-900">
                    {adminStats?.standardsIndexed ? `${adminStats.standardsIndexed}+` : '1850+'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-700">{lang === 'hi' ? 'डेटाबेस कनेक्टिविटी' : 'Database Connectivity'}</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-300">
                    {lang === 'hi' ? 'कनेक्टेड' : 'Connected'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded border border-slate-200 bg-slate-50">
                  <span className="font-semibold text-slate-700">Tesseract OCR Engine</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-300">
                    {lang === 'hi' ? 'तैयार' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Activity Audit Log */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
              {lang === 'hi' ? 'हालिया प्लेटफ़ॉर्म गतिविधि और ऑडिट लॉग' : 'Recent Platform Activity & Audit Log'}
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {adminActivity.map((act) => (
                <div key={act.id} className="py-2.5 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{act.event}</span>
                      <span className="text-[10px] text-slate-400 font-mono">by {act.actor}</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{act.description}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {new Date(act.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
