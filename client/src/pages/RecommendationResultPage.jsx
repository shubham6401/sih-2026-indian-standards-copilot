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
import { useAnalysis } from '../context/AnalysisContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const RecommendationResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentAnalysis, setCurrentAnalysis, showToast } = useAnalysis();

  const [analysis, setAnalysis] = useState(currentAnalysis);
  const [loading, setLoading] = useState(!currentAnalysis || currentAnalysis._id !== id);
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
          console.warn('API getAnalysisById failed, falling back to local history store:', apiErr.message);
        }

        if (!data) {
          // Fallback to history in localStorage or initial demo list
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
          setError('Could not locate this recommendation report in the local or remote database.');
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
    showToast('Generating official procurement PDF report...', 'info');

    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const element = document.getElementById('printable-report');

      if (element) {
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save(`BIS-Procurement-Report-${analysis?.productName?.substring(0, 15) || 'Analysis'}.pdf`);
        confetti({ particleCount: 50, spread: 60 });
        showToast('PDF downloaded successfully!');
      }
    } catch (err) {
      window.print();
    } finally {
      setDownloadingPdf(false);
    }
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

  const allStandardsCombined = [
    ...(analysis.primaryStandards || []),
    ...(analysis.relatedStandards || []),
    ...(analysis.testingStandards || []),
    ...(analysis.alternativeStandards || [])
  ];

  const totalGapsCount = (analysis.tenderGaps?.length || 0) + (analysis.outdatedReferences?.length || 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsKbModalOpen(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Database className="w-3.5 h-3.5 text-gov-600" />
            <span>KB Transparency</span>
          </button>
          <Button
            size="sm"
            variant="secondary"
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
          { id: 'overview', label: 'Full Report Overview', icon: Sparkles },
          { id: 'standards', label: 'Standards & Relationship Graph', icon: Layers },
          { id: 'gaps', label: `Tender Gap Analysis (${totalGapsCount})`, icon: ShieldAlert, highlight: totalGapsCount > 0 },
          { id: 'spec', label: 'AI Improved Specification & Diff', icon: FileText },
          { id: 'certification', label: 'Certifications & Provenance', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-gov-700 text-white shadow-xs font-bold'
                  : tab.highlight
                  ? 'text-amber-900 bg-amber-200/60 hover:bg-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Printable Report Wrapper */}
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

          {/* Specification Excerpt Box */}
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">Evaluated Procurement Specification:</span>
            <p className="italic text-slate-600">"{analysis.rawInput}"</p>
            {analysis.additionalRequirements && (
              <p className="mt-2 text-slate-600">
                <strong>Additional Criteria: </strong> {analysis.additionalRequirements}
              </p>
            )}
          </div>
        </div>

        {/* TAB 1: OVERVIEW / ALL */}
        {(activeTab === 'overview' || activeTab === 'standards') && (
          <>
            {/* Extracted Structured Requirements */}
            <ExtractedRequirementsCard
              structuredRequirements={analysis.structuredRequirements || []}
              detectedLanguage={analysis.detectedLanguage}
            />

            {/* Primary Recommended Standards */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-outfit flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Primary Applicable Indian Standards</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Core product standards establishing mandatory physical, electrical, and dimensional criteria
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {analysis.primaryStandards?.length || 0} Standards Identified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(analysis.primaryStandards || []).map((std, idx) => (
                  <StandardCard
                    key={idx}
                    standard={std}
                    isPrimary={true}
                    onViewDetails={handleOpenStandard}
                  />
                ))}
              </div>
            </section>

            {/* Standards Relationship Hierarchy Graph */}
            {analysis.primaryStandards?.[0] && (
              <StandardRelationshipGraph
                primaryStandard={analysis.primaryStandards[0]}
                relatedStandards={analysis.relatedStandards || []}
                onSelectStandard={handleOpenStandard}
              />
            )}

            {/* Alternative Standards Analysis */}
            <AlternativeStandardsCard
              primaryStandards={analysis.primaryStandards || []}
              alternativeStandards={analysis.alternativeStandards || []}
              onViewDetails={handleOpenStandard}
            />
          </>
        )}

        {/* TAB 3: TENDER GAPS & READINESS SCORE */}
        {(activeTab === 'overview' || activeTab === 'gaps') && (
          <>
            {/* Procurement Readiness Score */}
            <ProcurementReadinessScore readiness={analysis.procurementReadiness || {}} />

            {/* Tender Gap Analysis Card */}
            <TenderGapAnalysisCard
              gaps={analysis.tenderGaps || []}
              outdated={analysis.outdatedReferences || []}
            />
          </>
        )}

        {/* TAB 4: SPECIFICATION & BEFORE/AFTER DIFF */}
        {(activeTab === 'overview' || activeTab === 'spec') && (
          <>
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
          </>
        )}

        {/* TAB 5: CERTIFICATIONS, VERSIONS & EXPLANATION */}
        {(activeTab === 'overview' || activeTab === 'certification') && (
          <>
            {/* Certification & Compliance Assessment */}
            <CertificationSection certifications={analysis.certifications || []} />

            {/* AI Explanation & Matched Requirements */}
            <AIExplanationCard
              explanation={analysis.aiExplanation}
              extractedRequirements={analysis.extractedRequirements || []}
            />

            {/* Standard Editions & Amendments Tracker */}
            <VersionAmendmentCard standards={allStandardsCombined} />
          </>
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
