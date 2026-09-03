import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  ShieldAlert,
  Search,
  Copy,
  Trash2,
  Network,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { Modal } from '../components/common/Modal';
import { StandardCard } from '../components/analysis/StandardCard';
import { StandardRelationshipGraph } from '../components/analysis/StandardRelationshipGraph';
import { CertificationSection } from '../components/analysis/CertificationSection';
import { VersionAmendmentCard } from '../components/analysis/VersionAmendmentCard';
import { StandardDetailModal } from '../components/standards/StandardDetailModal';
import { TenderGapAnalysisCard } from '../components/analysis/TenderGapAnalysisCard';
import { ProcurementReadinessScore } from '../components/analysis/ProcurementReadinessScore';
import { AlternativeStandardsCard } from '../components/analysis/AlternativeStandardsCard';
import { BeforeAfterComparisonView } from '../components/analysis/BeforeAfterComparisonView';
import { GeneratedSpecificationCard } from '../components/analysis/GeneratedSpecificationCard';
import { KnowledgeBaseTransparencyModal } from '../components/analysis/KnowledgeBaseTransparencyModal';
import { ExecutivePdfReport } from '../components/reports/ExecutivePdfReport';
import { generateProcurementReportPdf } from '../utils/generatePdfReport';
import { useAnalysis, INITIAL_DEMO_HISTORY } from '../context/AnalysisContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export const RecommendationResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'overview';
  const { currentAnalysis, setCurrentAnalysis, history, deleteAnalysisRecord, showToast } = useAnalysis();

  // Helper to synchronously find item from any available memory layer
  const resolveInitialAnalysis = useCallback(() => {
    if (currentAnalysis && (String(currentAnalysis._id) === String(id) || String(currentAnalysis.id) === String(id))) {
      return currentAnalysis;
    }
    if (history && history.length > 0) {
      const found = history.find(item => String(item._id) === String(id) || String(item.id) === String(id));
      if (found) return found;
    }
    try {
      const localStored = localStorage.getItem('is_analysis_history');
      if (localStored) {
        const list = JSON.parse(localStored);
        const found = list.find(item => String(item._id) === String(id) || String(item.id) === String(id));
        if (found) return found;
      }
    } catch {}
    if (INITIAL_DEMO_HISTORY) {
      const demo = INITIAL_DEMO_HISTORY.find(item => String(item._id) === String(id) || String(item.id) === String(id));
      if (demo) return demo;
    }
    return null;
  }, [id, currentAnalysis, history]);

  const [analysis, setAnalysis] = useState(() => resolveInitialAnalysis());
  const [loading, setLoading] = useState(!analysis);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(tabParam);
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKbModalOpen, setIsKbModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [standardsFilter, setStandardsFilter] = useState('');

  // Synchronize activeTab when URL tab parameter changes (e.g. Browser Back/Forward navigation)
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  // Immediate synchronous hydration + async fallback for direct URL access
  useEffect(() => {
    const syncItem = resolveInitialAnalysis();
    if (syncItem) {
      setAnalysis(syncItem);
      setCurrentAnalysis(syncItem);
      setLoading(false);
      setError('');
      return;
    }

    const fetchAnalysis = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError('');
        let data = null;

        // Layer 1: API getAnalysisById
        try {
          data = await api.getAnalysisById(id);
        } catch (apiErr) {
          console.warn('API getAnalysisById fallback:', apiErr.message);
        }

        // Layer 2: API getReportData
        if (!data) {
          try {
            const reportData = await api.getReportData(id);
            if (reportData) {
              data = {
                _id: id,
                productName: reportData.procurementRequirement?.productName || 'Procurement Dossier',
                productCategory: reportData.procurementRequirement?.category || 'General',
                rawInput: reportData.procurementRequirement?.rawSpecification || '',
                confidenceScore: reportData.confidenceScores?.overallScore || 90,
                confidenceLabel: reportData.confidenceScores?.confidenceLabel || 'Highly Relevant',
                primaryStandards: reportData.primaryRecommendedStandards || [],
                relatedStandards: reportData.relatedStandards || [],
                certifications: reportData.certificationRequirements || [],
                procurementReadiness: { totalScore: 85, statusLabel: 'Evaluated' },
                ...reportData
              };
            }
          } catch (_e) {
            // Continue to local storage
          }
        }

        // Layer 3: localStorage history
        if (!data) {
          const localStored = localStorage.getItem('is_analysis_history');
          if (localStored) {
            try {
              const list = JSON.parse(localStored);
              data = list.find(item => String(item._id) === String(id) || String(item.id) === String(id));
            } catch (_e) {}
          }
        }

        // Layer 4: In-memory demo baseline
        if (!data && INITIAL_DEMO_HISTORY) {
          data = INITIAL_DEMO_HISTORY.find(item => String(item._id) === String(id) || String(item.id) === String(id));
        }

        if (data) {
          setAnalysis(data);
          setCurrentAnalysis(data);
        } else {
          setError(`Report not found for ID: ${id}`);
        }
      } catch (err) {
        setError(err.message || 'Report not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id, resolveInitialAnalysis, setCurrentAnalysis]);

  const handleOpenStandard = (std) => {
    setSelectedStandard(std);
    setIsModalOpen(true);
  };

  const handleDownloadPdf = () => {
    if (!analysis) return;
    setDownloadingPdf(true);
    showToast('Synthesizing executive A4 procurement report...', 'info');

    try {
      generateProcurementReportPdf(analysis);
      confetti({ particleCount: 40, spread: 50 });
      showToast('Official procurement dossier downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF export error:', err);
      showToast('Failed to generate PDF report: ' + err.message, 'error');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleCopySpec = () => {
    if (!analysis?.improvedSpecification) return;
    const specText = typeof analysis.improvedSpecification === 'string'
      ? analysis.improvedSpecification
      : JSON.stringify(analysis.improvedSpecification, null, 2);
    navigator.clipboard.writeText(specText);
    setCopiedSpec(true);
    showToast('Tender specification copied to clipboard!');
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  const handleDeleteReport = async () => {
    try {
      await deleteAnalysisRecord(id);
      setIsDeleteModalOpen(false);
      navigate('/reports');
    } catch (e) {
      showToast('Failed to delete report: ' + e.message, 'error');
    }
  };

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="py-20 text-center space-y-4 animate-pulse">
        <div className="w-12 h-12 border-4 border-gov-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">Loading Procurement Standards Dossier...</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Retrieving verified Indian Standards, gazette QCOs, and compliance parameters for {id}.
        </p>
      </div>
    );
  }

  // Error / Report Not Found State
  if (error || !analysis) {
    return (
      <div className="p-8 sm:p-10 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Report Not Found</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          {error || 'Unable to locate this procurement assessment report in the database.'}
        </p>
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button size="sm" variant="secondary" onClick={() => navigate('/reports')}>
            View Reports Repository
          </Button>
          <Button size="sm" variant="primary" onClick={() => navigate('/analysis/new')}>
            Start New Analysis
          </Button>
        </div>
      </div>
    );
  }

  const analysisDate = useMemo(() => {
    if (!analysis?.createdAt) return 'Current';
    return new Date(analysis.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }, [analysis?.createdAt]);

  const primaryList = analysis.primaryStandards || [];
  const relatedList = analysis.relatedStandards || [];
  const gapsList = analysis.tenderGaps || [];
  const certificationsList = analysis.certifications || analysis.certificationRequirements || [];
  const allStandards = [...primaryList, ...relatedList];

  // Gaps counts by severity
  const highGaps = gapsList.filter(g => (g.severity || '').toUpperCase() === 'HIGH');
  const medGaps = gapsList.filter(g => (g.severity || '').toUpperCase() === 'MEDIUM');
  const lowGaps = gapsList.filter(g => (g.severity || '').toUpperCase() === 'LOW');

  // 7 Clean Tabs per Requirements 22-29
  const tabItems = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'standards', label: 'Standards', icon: Layers, count: primaryList.length },
    { id: 'relationships', label: 'Relationships', icon: Network },
    { id: 'gaps', label: 'Gap Analysis', icon: ShieldAlert, count: gapsList.length },
    { id: 'compliance', label: 'Compliance', icon: Award, count: certificationsList.length },
    { id: 'specification', label: 'Improved Specification', icon: FileText },
    { id: 'report', label: 'Report Dossier', icon: Printer }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-16">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Link to="/dashboard" className="hover:text-slate-800">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/reports" className="hover:text-slate-800">Reports</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{analysis.productName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="secondary"
            icon={Download}
            loading={downloadingPdf}
            onClick={handleDownloadPdf}
          >
            Download PDF
          </Button>
          <Button
            size="xs"
            variant="primary"
            icon={Sparkles}
            onClick={() => navigate('/analysis/new')}
          >
            New Analysis
          </Button>
        </div>
      </div>

      {/* Clean Dossier Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gov-50 text-gov-700 border border-gov-200 px-2 py-0.5 rounded">
                BIS Recommendation Dossier
              </span>
              <Badge variant={analysis.inputType === 'tender_pdf' ? 'mandate' : 'primary'} size="xs">
                {analysis.inputType === 'tender_pdf' ? 'Tender PDF' : 'Specification Input'}
              </Badge>
              <span className="text-xs text-slate-500">
                Date: {analysisDate}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit tracking-tight">
              {analysis.productName}
            </h1>

            <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3 pt-0.5">
              <span><strong>Category:</strong> {analysis.productCategory}</span>
              {analysis.quantity && <span>• <strong>Quantity:</strong> {analysis.quantity}</span>}
              <button
                type="button"
                onClick={() => setIsKbModalOpen(true)}
                className="text-gov-700 hover:text-gov-900 font-semibold underline cursor-pointer"
              >
                Inspect Provenance & Methodology
              </button>
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-1.5">
            <ScoreIndicator
              score={analysis.confidenceScore || 92}
              label={analysis.confidenceLabel || 'Highly Relevant'}
              size="md"
            />
          </div>
        </div>
      </div>

      {/* 7 Clean Navigation Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
        {tabItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gov-700 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-gov-900 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* Procurement Readiness Gauge */}
          <ProcurementReadinessScore
            readiness={analysis.procurementReadiness}
            gaps={gapsList}
          />

          {/* Primary Recommendation Banner */}
          <div className="p-5 rounded-2xl bg-gov-50/70 border border-gov-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-gov-900 text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Primary Recommendation Summary</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {analysis.explanation || 'Analyzed against Bureau of Indian Standards database with high confidence alignment.'}
            </p>
          </div>

          {/* Top Risks Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-outfit flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Top Identified Compliance Risks & Gaps</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {gapsList.length} Total Gaps
              </span>
            </div>

            {gapsList.length > 0 ? (
              <div className="space-y-2.5">
                {gapsList.slice(0, 3).map((gap, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{gap.title || gap.category}</span>
                      <Badge variant={gap.severity === 'HIGH' ? 'mandate' : 'warning'} size="xs">
                        {gap.severity}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-[11px]">{gap.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                No major procurement gaps detected in this requirement.
              </p>
            )}
          </div>

          {/* Primary Standards Quick List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-outfit flex items-center gap-2">
                <Layers className="w-4 h-4 text-gov-600" />
                <span>Primary Applicable Indian Standards</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('standards')}
                className="text-xs font-bold text-gov-600 hover:text-gov-800"
              >
                View All Standards →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {primaryList.map((std) => (
                <StandardCard
                  key={std.standardNumber || std._id || std.id}
                  standard={std}
                  isPrimary={true}
                  onViewDetails={handleOpenStandard}
                />
              ))}
            </div>
          </div>

          {/* Quick Next Actions Bar */}
          <div className="p-4 bg-slate-100 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 font-medium">
              Ready to incorporate into your tender documents?
            </span>
            <div className="flex items-center gap-2">
              <Button size="xs" variant="secondary" onClick={() => setActiveTab('specification')}>
                Inspect Improved Specification
              </Button>
              <Button size="xs" variant="primary" onClick={handleDownloadPdf}>
                Generate A4 PDF Dossier
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STANDARDS */}
      {activeTab === 'standards' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search / Filter for Standards */}
          <div className="relative">
            <input
              type="text"
              value={standardsFilter}
              onChange={(e) => setStandardsFilter(e.target.value)}
              placeholder="Filter standards by IS number, title, or category..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* Primary Standards Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-outfit">
              Primary Indian Standards ({primaryList.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {primaryList
                .filter(s => !standardsFilter || (s.standardNumber || '').toLowerCase().includes(standardsFilter.toLowerCase()))
                .map((std) => (
                  <StandardCard
                    key={std.standardNumber || std._id || std.id}
                    standard={std}
                    isPrimary={true}
                    onViewDetails={handleOpenStandard}
                  />
                ))}
            </div>
          </div>

          {/* Alternative Standards Card */}
          <AlternativeStandardsCard
            primaryStandards={primaryList}
            alternativeStandards={analysis.alternativeStandards || []}
            onViewDetails={handleOpenStandard}
          />

          {/* Companion & Allied Standards */}
          {relatedList.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-outfit">
                Allied & Testing Standards ({relatedList.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedList
                  .filter(s => !standardsFilter || (s.standardNumber || '').toLowerCase().includes(standardsFilter.toLowerCase()))
                  .map((std) => (
                    <StandardCard
                      key={std.standardNumber || std._id || std.id}
                      standard={std}
                      isPrimary={false}
                      relationshipType={std.relationshipType || 'Allied Standard'}
                      onViewDetails={handleOpenStandard}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RELATIONSHIPS */}
      {activeTab === 'relationships' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-outfit">
                Standards Dependency & Hierarchy Graph
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore how the primary specification links to testing methodologies, safety requirements, and normative references.
              </p>
            </div>

            {/* Full-width Responsive Standards Relationship Graph */}
            <StandardRelationshipGraph
              primaryStandards={primaryList}
              relatedStandards={relatedList}
              onSelectStandard={handleOpenStandard}
            />
          </div>
        </div>
      )}

      {/* TAB 4: GAP ANALYSIS */}
      {activeTab === 'gaps' && (
        <div className="space-y-6 animate-fade-in">
          {/* Risk Summary Counters */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-2xl font-black text-rose-700 block">{highGaps.length}</span>
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">High Risk</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-2xl font-black text-amber-700 block">{medGaps.length}</span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Medium Risk</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center">
              <span className="text-2xl font-black text-slate-700 block">{lowGaps.length}</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Low Risk</span>
            </div>
          </div>

          {/* Gap Cards List */}
          <TenderGapAnalysisCard gaps={gapsList} />
        </div>
      )}

      {/* TAB 5: COMPLIANCE */}
      {activeTab === 'compliance' && (
        <div className="space-y-6 animate-fade-in">
          {/* Mandatory Certifications Section */}
          <CertificationSection
            certifications={certificationsList}
            standards={allStandards}
          />

          {/* Editions & Amendments Tracker */}
          <VersionAmendmentCard standards={allStandards} />
        </div>
      )}

      {/* TAB 6: IMPROVED SPECIFICATION */}
      {activeTab === 'specification' && (
        <div className="space-y-6 animate-fade-in">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900">AI Improved Specification Schedule</h3>
              <p className="text-xs text-slate-500">GFR-compliant clause schedule with integrated BIS norms</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="xs"
                variant="secondary"
                icon={copiedSpec ? Check : Copy}
                onClick={handleCopySpec}
              >
                {copiedSpec ? 'Copied' : 'Copy Schedule'}
              </Button>
              <Button
                size="xs"
                variant="primary"
                icon={Download}
                loading={downloadingPdf}
                onClick={handleDownloadPdf}
              >
                Generate PDF
              </Button>
            </div>
          </div>

          {/* Generated Specification Card */}
          <GeneratedSpecificationCard
            specification={analysis.improvedSpecification}
            productName={analysis.productName}
          />

          {/* Before vs After Comparison */}
          <BeforeAfterComparisonView
            rawInput={analysis.rawInput}
            improvedSpecification={analysis.improvedSpecification}
            outdated={analysis.outdatedReferences || []}
            gaps={gapsList}
          />
        </div>
      )}

      {/* TAB 7: REPORT */}
      {activeTab === 'report' && (
        <div className="space-y-6 animate-fade-in">
          {/* Report Summary Card with Direct Action Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  REP-BIS-{String(id).slice(-8).toUpperCase()}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Procurement Compliance Dossier
                </h3>
                <p className="text-xs text-slate-500">
                  Synthesized for {analysis.productName} ({analysis.productCategory})
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  icon={Download}
                  loading={downloadingPdf}
                  onClick={handleDownloadPdf}
                >
                  Download PDF Report
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.print()}
                >
                  Print Dossier
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  icon={Trash2}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete Report
                </Button>
              </div>
            </div>

            {/* Embedded Multi-Page PDF Preview */}
            <ExecutivePdfReport analysis={analysis} />
          </div>
        </div>
      )}

      {/* Standard Detail Modal */}
      <StandardDetailModal
        standard={selectedStandard}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Knowledge Base Transparency Modal */}
      <KnowledgeBaseTransparencyModal
        isOpen={isKbModalOpen}
        onClose={() => setIsKbModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete this analysis report?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Are you sure you want to delete this procurement assessment record? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button size="xs" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button size="xs" variant="danger" onClick={handleDeleteReport}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
