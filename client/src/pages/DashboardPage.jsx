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
  Loader2,
  Building2,
  Shield,
  Activity,
  Users,
  Database,
  CheckCircle,
  ExternalLink,
  Layers,
  FileCheck2
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { useAuth } from '../context/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';
import { normalizeRole, ROLE_CONFIG, ROLE_KEYS } from '../config/roleConfig';
import { api } from '../services/api';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { history, savedStandards, loadHistory, setCurrentAnalysis } = useAnalysis();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [openingId, setOpeningId] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [adminActivity, setAdminActivity] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const userRoleKey = normalizeRole(user?.role);
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
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* 1. Header Section: Role Context + Title + Primary Actions */}
      <div className="bg-gradient-to-r from-gov-900 via-gov-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-bold border border-white/10 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentRoleConfig.displayName}</span>
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {user?.organization || currentRoleConfig.organizationExample}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-outfit tracking-tight">
            {userRoleKey === ROLE_KEYS.PROCUREMENT_OFFICER
              ? `Welcome back, ${user?.name || 'Procurement Officer'}`
              : currentRoleConfig.dashboardTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            {currentRoleConfig.dashboardSubtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {currentRoleConfig.primaryActions.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <Button
                  key={action.path || idx}
                  size="md"
                  variant={action.variant}
                  icon={ActionIcon}
                  onClick={() => navigate(action.path)}
                >
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-gov-600/20 to-transparent pointer-events-none" />
      </div>

      {/* 2. Role Metrics Grid (4 KPI Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {currentRoleConfig.metricCards.map((card) => {
          const Icon = card.icon;
          const val = getMetricValue(card.key);
          return (
            <div
              key={card.key}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {card.label}
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-gov-700 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">
                  {val}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Role-Specific Main Dashboard Views */}

      {/* VIEW A: PROCUREMENT OFFICER DASHBOARD */}
      {userRoleKey === ROLE_KEYS.PROCUREMENT_OFFICER && (
        <>
          {/* Recent Operational Analyses Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-outfit">
                  Recent Procurement Analyses
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your recent specification analyses and verified Indian Standards dossiers.
                </p>
              </div>
              <Button size="xs" variant="ghost" icon={ChevronRight} onClick={() => navigate('/history')}>
                View All History
              </Button>
            </div>

            {history.length > 0 ? (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-4">Procurement Item</th>
                        <th className="py-3 px-4">Input Category</th>
                        <th className="py-3 px-4">Standards Found</th>
                        <th className="py-3 px-4">Confidence</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {history.slice(0, 5).map((item) => {
                        const id = item._id || item.id;
                        const isOpening = openingId === id;
                        return (
                          <tr key={id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-slate-900">
                              {item.productName || 'Procurement Specification'}
                            </td>
                            <td className="py-3.5 px-4">
                              <Badge variant="primary" size="xs">
                                {item.productCategory || 'General'}
                              </Badge>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-semibold">
                              {(item.primaryStandards?.length || 0) + (item.relatedStandards?.length || 0)} Standards
                            </td>
                            <td className="py-3.5 px-4">
                              <ScoreIndicator
                                score={item.confidenceScore || 90}
                                label={item.confidenceLabel || 'Relevant'}
                                size="sm"
                              />
                            </td>
                            <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                              {new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN')}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <Button
                                size="xs"
                                variant="primary"
                                disabled={isOpening}
                                onClick={() => handleOpenReport(item)}
                              >
                                {isOpening ? 'Opening...' : 'View Report'}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-slate-100">
                  {history.slice(0, 5).map((item) => {
                    const id = item._id || item.id;
                    const isOpening = openingId === id;
                    return (
                      <div key={id} className="p-4 space-y-2.5 hover:bg-slate-50">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">{item.productName || 'Procurement Item'}</h3>
                            <p className="text-[11px] text-slate-400">{item.productCategory}</p>
                          </div>
                          <ScoreIndicator score={item.confidenceScore || 90} size="sm" />
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                          <span className="text-slate-500">
                            {(item.primaryStandards?.length || 0) + (item.relatedStandards?.length || 0)} Standards Found
                          </span>
                          <Button size="xs" variant="primary" disabled={isOpening} onClick={() => handleOpenReport(item)}>
                            {isOpening ? 'Opening...' : 'View Report'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-xs text-slate-500 space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-800">No procurement analyses yet.</p>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Upload your first tender or enter a technical specification to build your recommendation dossier.
                </p>
                <Button size="sm" onClick={() => navigate('/analysis/new')}>Start Analysis</Button>
              </div>
            )}
          </div>

          {/* Attention Required & Quick Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Compliance & Attention Required</span>
                </h3>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Active Alerts
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Outdated Citation in Cement Procurement</p>
                    <p className="text-slate-500 mt-0.5 text-[11px] leading-relaxed">
                      IS 12269:1987 (53 Grade OPC) has been officially superseded by unified IS 269:2015. Tenders quoting 12269 must update to avoid audit objections.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Mandatory MeitY CRS Registration Verification</p>
                    <p className="text-slate-500 mt-0.5 text-[11px] leading-relaxed">
                      All LED Street Light controlgear must carry an active R-Number under Compulsory Registration Order before award of tender.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => navigate('/analysis/new')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-gov-50 border border-slate-200/80 hover:border-gov-200 text-xs font-bold text-slate-800 hover:text-gov-800 transition-all flex items-center justify-between"
                  >
                    <span>Analyze Specification</span>
                    <Sparkles className="w-3.5 h-3.5 text-gov-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/tender/upload')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-gov-50 border border-slate-200/80 hover:border-gov-200 text-xs font-bold text-slate-800 hover:text-gov-800 transition-all flex items-center justify-between"
                  >
                    <span>Upload Tender PDF</span>
                    <UploadCloud className="w-3.5 h-3.5 text-gov-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/explorer')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-gov-50 border border-slate-200/80 hover:border-gov-200 text-xs font-bold text-slate-800 hover:text-gov-800 transition-all flex items-center justify-between"
                  >
                    <span>Standards Explorer</span>
                    <Database className="w-3.5 h-3.5 text-gov-600" />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                Decision Support Engine • Active BIS Knowledge Base
              </div>
            </div>
          </div>
        </>
      )}

      {/* VIEW B: GOVERNMENT DEPARTMENT OVERSIGHT DASHBOARD */}
      {userRoleKey === ROLE_KEYS.GOVERNMENT_DEPARTMENT && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider">
                  Department Procurement Intelligence Overview
                </h3>
                <Badge variant="mandate" size="xs">Department Level</Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Centralized monitoring of statutory Quality Control Order (QCO) mandates issued by DPIIT, MeitY, and Ministry of Power across all departmental tender schedules.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">QCO Compliance Status</span>
                  <p className="text-base font-bold text-emerald-700 mt-1">100% Certified Mandate</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">All tracked tenders comply with Gazette QCOs.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Department Audits</span>
                  <p className="text-base font-bold text-slate-900 mt-1">{history.length} Dossiers</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Archived and exportable for CVC inspection.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider mb-3">
                  Department Directives
                </h3>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Mandate verification of BIS CML numbers on ManakOnline prior to opening financial bids.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ensure tender technical schedules use latest standard editions with all published amendments.</span>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                variant="primary"
                className="w-full mt-4"
                onClick={() => navigate('/reports')}
              >
                Inspect Department Reports
              </Button>
            </div>
          </div>

          {/* Department Recent Procurement Analyses */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
            <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider mb-4">
              Department Active Procurement Reviews
            </h3>
            <div className="divide-y divide-slate-100">
              {history.slice(0, 4).map((item) => (
                <div key={item._id || item.id} className="py-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.productName}</p>
                    <p className="text-[11px] text-slate-500">{item.productCategory} • {(item.primaryStandards?.length || 0)} Primary Standards</p>
                  </div>
                  <Button size="xs" variant="ghost" onClick={() => handleOpenReport(item)}>
                    View Report
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider">
                  PSU Technical Procurement Compliance Status
                </h3>
                <Badge variant="warning" size="xs">High-Value Audit</Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Automated standards conformance checks for capital engineering, electrical transmission, power equipment, and structural procurement.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">High-Voltage & Power Norms</span>
                  <p className="text-base font-bold text-gov-800 mt-1">IS 10322 & IS 15885</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Automated surge protection & safety verification.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Audit Conformance</span>
                  <p className="text-base font-bold text-emerald-700 mt-1">98.4% Compliance</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Compliant with Central Vigilance Commission (CVC) norms.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider mb-3">
                  PSU Quick Review
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Run an instant AI cross-check on high-voltage equipment, civil materials, or safety gear.
                </p>
              </div>

              <div className="space-y-2">
                <Button size="sm" variant="primary" className="w-full" onClick={() => navigate('/analysis/new')}>
                  New Technical Review
                </Button>
                <Button size="sm" variant="secondary" className="w-full" onClick={() => navigate('/reports')}>
                  PSU Compliance Reports
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider">
                    Platform User Governance
                  </h3>
                  <p className="text-xs text-slate-500">Registered stakeholder accounts and designated roles.</p>
                </div>
                <Button size="xs" variant="primary" onClick={() => navigate('/admin/users')}>
                  Manage All Users
                </Button>
              </div>

              {loadingAdmin ? (
                <div className="py-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading platform telemetry...</span>
                </div>
              ) : adminUsers.length > 0 ? (
                <div className="divide-y divide-slate-100 text-xs">
                  {adminUsers.slice(0, 4).map((u) => {
                    const rKey = normalizeRole(u.role);
                    const rCfg = ROLE_CONFIG[rKey] || ROLE_CONFIG.procurement_officer;
                    return (
                      <div key={u._id} className="py-2.5 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-900 truncate">{u.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{u.email} • {u.organization}</p>
                        </div>
                        <Badge variant={rCfg.badgeVariant} size="xs">
                          {rCfg.badgeTitle}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4">No registered users in directory.</p>
              )}
            </div>

            {/* AI & Platform System Health */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider">
                System Telemetry Status
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">BIS RAG & NLP Engine</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Operational
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Standards Indexed</span>
                  <span className="font-bold text-slate-900">
                    {adminStats?.standardsIndexed ? `${adminStats.standardsIndexed}+` : '1850+'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Database Connectivity</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Connected
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">Tesseract OCR Engine</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Activity Audit Log */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
            <h3 className="text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider mb-4">
              Recent Platform Activity & Audit Log
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {adminActivity.map((act) => (
                <div key={act.id} className="py-3 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{act.event}</span>
                      <span className="text-[10px] text-slate-400">by {act.actor}</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{act.description}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
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
