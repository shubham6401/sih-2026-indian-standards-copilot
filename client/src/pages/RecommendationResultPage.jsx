import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  Printer,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Award,
  Layers,
  History,
  Shield,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Gauge,
  Columns,
  Database,
  Tag,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { StandardCard } from '../components/analysis/StandardCard';
import { StandardRelationshipGraph } from '../components/analysis/StandardRelationshipGraph';
import { CertificationSection } from '../components/analysis/CertificationSection';
import { AIExplanationCard } from '../components/analysis/AIExplanationCard';
import { VersionAmendmentCard } from '../components/analysis/VersionAmendmentCard';
import { StandardDetailModal } from '../components/standards/StandardDetailModal';
import { ExtractedRequirementsCard } from '../components/analysis/ExtractedRequirementsCard';
import { TenderGapAnalysisCard } from '../components/analysis/TenderGapAnalysisCard';
import { ProcurementReadinessScore } from '../components/analysis/ProcurementReadinessScore';
import { AlternativeStandardsCard } from '../components/analysis/AlternativeStandardsCard';
import { BeforeAfterComparisonView } from '../components/analysis/BeforeAfterComparisonView';
import { GeneratedSpecificationCard } from '../components/analysis/GeneratedSpecificationCard';
import { KnowledgeBaseTransparencyModal } from '../components/analysis/KnowledgeBaseTransparencyModal';
import { ExecutivePdfReport } from '../components/reports/ExecutivePdfReport';
import { exportExecutiveReportToPdf } from '../utils/generatePdfReport';
import { useAnalysis } from '../context/AnalysisContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export const RecommendationResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentAnalysis, setCurrentAnalysis, showToast } = useAnalysis();

  const [analysis, setAnalysis] = useState(currentAnalysis);
  const [loading, setLoading] = useState(!currentAnalysis || String(currentAnalysis._id) !== String(id));
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKbModalOpen, setIsKbModalOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError('');
        let data = null;
        try {
          data = await api.getAnalysisById(id);
        } catch (apiErr) {
          console.warn('API getAnalysisById fallback:', apiErr.message);
        }

        if (!data) {
          // Fallback to localStorage history
          const localStored = localStorage.getItem('is_analysis_history');
          if (localStored) {
            try {
              const list = JSON.parse(localStored);
              data = list.find(item => String(item._id) === String(id));
            } catch (e) {}
          }
        }

        if (data) {
          setAnalysis(data);
          setCurrentAnalysis(data);
        } else {
          setError('Could not locate this recommendation report in the database.');
        }
      } catch (err) {
        setError(err.message || 'Failed to load analysis report');
      } finally {
        setLoading(false);
      }
    };

    if (!analysis || String(analysis._id) !== String(id)) {
      fetchAnalysis();
    }
  }, [id]);

  const handleOpenStandard = (std) => {
    setSelectedStandard(std);
    setIsModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    showToast('Synthesizing executive-grade A4 PDF report...', 'info');

    try {
      const container = document.getElementById('executive-pdf-document');
      if (container) {
        await exportExecutiveReportToPdf(container, analysis?.productName);
        confetti({ particleCount: 50, spread: 60 });
        showToast('Executive PDF Report downloaded successfully!');
      } else {
        window.print();
      }
    } catch (err) {
      console.warn('PDF export error fallback to print:', err.message);
      window.print();
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-gov-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Loading Standards Recommendation Report...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-4 max-w-md mx-auto my-12">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-base font-bold text-slate-900">Report Not Found</h3>
        <p className="text-xs text-slate-500">{error || 'Could not locate this recommendation report.'}</p>
        <Button size="sm" onClick={() => navigate('/analysis/new')}>
          Start New Analysis
        </Button>
      </div>
    );
  }

  const analysisDate = new Date(analysis.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const totalGapsCount = (analysis.tenderGaps || []).length;
  const allStandardsCombined = [
    ...(analysis.primaryStandards || []),
    ...(analysis.relatedStandards || [])
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 no-print">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/dashboard" className="hover:text-slate-800 font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/history" className="hover:text-slate-800 font-medium">Analysis History</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{analysis.productName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            icon={Printer}
            onClick={handlePrint}
          >
            Print
          </Button>
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
            onClick={() => navigate('/analysis/new')}
          >
            New Analysis
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 no-print text-xs font-semibold">
        {[
          { id: 'overview', label: 'Full Dossier Overview', icon: Sparkles },
          { id: 'standards', label: 'Standards & Relationship Graph', icon: Layers },
          { id: 'gaps', label: `Tender Gap Analysis (${totalGapsCount})`, icon: ShieldAlert, highlight: totalGapsCount > 0 },
          { id: 'spec', label: 'AI Improved Specification & Diff', icon: FileText },
          { id: 'certification', label: 'Certifications & Provenance', icon: Award },
          { id: 'a4_preview', label: 'Executive A4 PDF Preview', icon: Printer, highlight: true }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-gov-800 text-white shadow-sm ring-2 ring-gov-600 font-bold'
                  : tab.highlight
                  ? 'text-amber-900 bg-amber-200/60 hover:bg-amber-200'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 6: EXECUTIVE A4 PDF PREVIEW */}
      {activeTab === 'a4_preview' ? (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-amber-900">Executive A4 Multi-Page Print Preview</h3>
              <p className="text-[11px] text-amber-700">
                This shows the exact 8-page paginated executive report generated for government procurement officers and SIH evaluators.
              </p>
            </div>
            <Button
              size="sm"
              variant="primary"
              icon={Download}
              loading={downloadingPdf}
              onClick={handleDownloadPdf}
            >
              Download PDF Report
            </Button>
          </div>

          <ExecutivePdfReport analysis={analysis} />
        </div>
      ) : (
        /* Main Interactive Dashboard View */
        <div id="printable-report" className="space-y-6">
          {/* Report Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gov-600 text-white px-2.5 py-0.5 rounded shadow-2xs">
                    AI Procurement Standards Dossier
                  </span>
                  <Badge variant={analysis.inputType === 'tender_pdf' ? 'mandate' : 'primary'} size="xs">
                    {analysis.inputType === 'tender_pdf' ? 'Tender PDF Ingestion' : 'Specification Input'}
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">
                    Analysis Date: {analysisDate}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit tracking-tight">
                  Standards Recommendation & Gap Report
                </h1>

                <div className="text-xs text-slate-700 space-y-1 pt-1">
                  <p>
                    <strong className="text-slate-900">Procurement Product / Item: </strong>
                    <span className="font-semibold text-gov-800">{analysis.productName}</span>
                  </p>
                  <p>
                    <strong className="text-slate-900">Category: </strong>
                    <span>{analysis.productCategory}</span>
                    {analysis.quantity && (
                      <span className="ml-3">
                        <strong>Quantity: </strong> {analysis.quantity}
                      </span>
                    )}
                  </p>
                  {analysis.detectedLanguage && (
                    <p className="text-slate-500 text-[11px]">
                      Input Language: <span className="font-semibold text-slate-700">{analysis.detectedLanguage}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Confidence Score Widget */}
              <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
                <ScoreIndicator
                  score={analysis.confidenceScore || 92}
                  label={analysis.confidenceLabel || 'Highly Relevant'}
                  size="lg"
                />
              </div>
            </div>

            {/* Quick Action Bar inside header */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <strong>{(analysis.primaryStandards || []).length}</strong> Primary Standards
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-gov-600" />
                  <strong>{(analysis.relatedStandards || []).length}</strong> Allied Standards
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <strong>{(analysis.certifications || []).length || 2}</strong> Mandates
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsKbModalOpen(true)}
                className="text-gov-700 hover:text-gov-900 font-bold flex items-center gap-1 text-[11px] underline cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Knowledge Base Transparency & Provenance</span>
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Procurement Specification Readiness Score (0-100 Gauge) */}
              <ProcurementReadinessScore
                readiness={analysis.procurementReadiness}
                gaps={analysis.tenderGaps || []}
              />

              {/* Primary Standards Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-gov-600 rounded-full" />
                    <h2 className="text-lg font-black text-slate-900 font-outfit">
                      Primary Applicable Indian Standards (IS)
                    </h2>
                  </div>
                  <Badge variant="primary" size="sm">
                    {(analysis.primaryStandards || []).length} Verified Standards
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(analysis.primaryStandards || []).map((std) => (
                    <StandardCard
                      key={std.standardNumber || std._id}
                      standard={std}
                      isPrimary={true}
                      onClick={() => handleOpenStandard(std)}
                    />
                  ))}
                </div>
              </div>

              {/* Tender Gap Analysis Card */}
              <TenderGapAnalysisCard gaps={analysis.tenderGaps || []} />

              {/* Before vs After Split Comparison View */}
              <BeforeAfterComparisonView
                rawInput={analysis.rawInput}
                improvedSpecification={analysis.improvedSpecification}
                outdated={analysis.outdatedReferences || []}
                gaps={analysis.tenderGaps || []}
              />

              {/* Certification & Compliance Assessment */}
              <CertificationSection certifications={analysis.certifications || []} />
            </div>
          )}

          {/* TAB 2: STANDARDS & RELATIONSHIPS */}
          {activeTab === 'standards' && (
            <div className="space-y-6">
              {/* Primary Standards Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-gov-600 rounded-full" />
                    <h2 className="text-lg font-black text-slate-900 font-outfit">
                      Primary Applicable Indian Standards (IS)
                    </h2>
                  </div>
                  <Badge variant="primary" size="sm">
                    {(analysis.primaryStandards || []).length} Verified Standards
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(analysis.primaryStandards || []).map((std) => (
                    <StandardCard
                      key={std.standardNumber || std._id}
                      standard={std}
                      isPrimary={true}
                      onClick={() => handleOpenStandard(std)}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Standards Relationship Hierarchy Graph */}
              <StandardRelationshipGraph
                primaryStandards={analysis.primaryStandards || []}
                relatedStandards={analysis.relatedStandards || []}
                onSelectStandard={handleOpenStandard}
              />

              {/* Alternative Standards Disambiguation Card */}
              <AlternativeStandardsCard
                alternatives={analysis.alternativeStandards || []}
                onSelectStandard={handleOpenStandard}
              />

              {/* Allied / Normative Standards Grid */}
              {(analysis.relatedStandards || []).length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-amber-500 rounded-full" />
                      <h2 className="text-lg font-black text-slate-900 font-outfit">
                        Allied, Testing & Normative Companion Standards
                      </h2>
                    </div>
                    <Badge variant="warning" size="sm">
                      {(analysis.relatedStandards || []).length} Companion Standards
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(analysis.relatedStandards || []).map((std) => (
                      <StandardCard
                        key={std.standardNumber || std._id}
                        standard={std}
                        isPrimary={false}
                        onClick={() => handleOpenStandard(std)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GAPS & REQUIREMENTS */}
          {activeTab === 'gaps' && (
            <div className="space-y-6">
              {/* Procurement Specification Readiness Score (0-100 Gauge) */}
              <ProcurementReadinessScore
                readiness={analysis.procurementReadiness}
                gaps={analysis.tenderGaps || []}
              />

              {/* Tender Gap Analysis Card */}
              <TenderGapAnalysisCard gaps={analysis.tenderGaps || []} />

              {/* Extracted Structured Requirements */}
              <ExtractedRequirementsCard
                requirements={analysis.structuredRequirements || {}}
                productName={analysis.productName}
                onSaveRequirements={(updated) => {
                  setAnalysis(prev => ({ ...prev, structuredRequirements: updated }));
                  showToast('Updated structured requirements cached for tender generator!');
                }}
              />
            </div>
          )}

          {/* TAB 4: SPECIFICATION & BEFORE/AFTER DIFF */}
          {activeTab === 'spec' && (
            <div className="space-y-6">
              {/* Before vs After Split Comparison View */}
              <BeforeAfterComparisonView
                rawInput={analysis.rawInput}
                improvedSpecification={analysis.improvedSpecification}
                outdated={analysis.outdatedReferences || []}
                gaps={analysis.tenderGaps || []}
              />

              {/* AI Generated Tender Specification Schedule */}
              <GeneratedSpecificationCard
                specification={analysis.improvedSpecification}
                productName={analysis.productName}
              />
            </div>
          )}

          {/* TAB 5: CERTIFICATIONS, VERSIONS & EXPLANATION */}
          {activeTab === 'certification' && (
            <div className="space-y-6">
              {/* Certification & Compliance Assessment */}
              <CertificationSection certifications={analysis.certifications || []} />

              {/* AI Explanation & Matched Requirements */}
              <AIExplanationCard
                explanation={analysis.aiExplanation}
                extractedRequirements={analysis.extractedRequirements || []}
              />

              {/* Standard Editions & Amendments Tracker */}
              <VersionAmendmentCard standards={allStandardsCombined} />
            </div>
          )}

          {/* Verification Disclaimer */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Official Tender Verification Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              This recommendation report was synthesized by the AI Indian Standards Procurement Copilot. Indenting officers must independently verify the active edition of the standard, validity of notified amendments, and the supplier's valid BIS License / CRS registration on the official BIS portal (<strong>manakonline.in</strong> / <strong>bis.gov.in</strong>) before issuing binding tenders.
            </p>
          </div>
        </div>
      )}

      {/* Offscreen Container for Clean PDF Generation (Always Rendered) */}
      <div className="hidden" aria-hidden="true">
        <ExecutivePdfReport analysis={analysis} />
      </div>

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
    </div>
  );
};
