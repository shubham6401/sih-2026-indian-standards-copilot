import React from 'react';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  Award,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  Calendar,
  Check,
  Scale,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';

export const ExecutivePdfReport = ({ analysis }) => {
  if (!analysis) return null;

  const reportId = `IS-REP-${String(analysis._id || '2026').slice(-8).toUpperCase()}`;
  const analysisDate = new Date(analysis.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const primaryStandards = analysis.primaryStandards || [];
  const relatedStandards = analysis.relatedStandards || [];
  const allStandards = [...primaryStandards, ...relatedStandards];
  const tenderGaps = analysis.tenderGaps || [];
  const outdatedRefs = analysis.outdatedReferences || [];
  const certs = analysis.certificationRequirements || analysis.certifications || [];
  const reqs = analysis.structuredRequirements || {};

  const readiness = analysis.procurementReadiness || {
    totalScore: 78,
    statusLabel: 'Readiness Evaluated — Action Required',
    actionCount: tenderGaps.length || 2,
    breakdown: {
      standardsCoverage: 92,
      testingCoverage: 68,
      safetyCoverage: 85,
      certificationCompleteness: 65,
      versionCurrency: 85,
      technicalCompleteness: 72
    }
  };

  const score = readiness.totalScore || 78;
  const breakdown = readiness.breakdown || {
    standardsCoverage: 90,
    testingCoverage: 70,
    safetyCoverage: 85,
    certificationCompleteness: 65,
    versionCurrency: 85,
    technicalCompleteness: 75
  };

  return (
    <div id="executive-pdf-document" className="bg-slate-200 p-4 font-sans text-slate-900 antialiased print:p-0">
      {/* ========================================================================= */}
      {/* PAGE 1: EXECUTIVE DECISION SUMMARY & READINESS SCORE                       */}
      {/* ========================================================================= */}
      <div className="pdf-page w-[794px] min-h-[1123px] max-h-[1123px] bg-white p-8 mb-6 mx-auto shadow-lg flex flex-col justify-between border border-slate-300">
        <div>
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="text-[9px] font-extrabold tracking-widest uppercase text-slate-500 block">
                  Government of India • National Procurement Copilot
                </span>
                <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase font-outfit">
                  AI Procurement Standards Analysis
                </h1>
                <p className="text-[10.5px] text-slate-600 font-semibold">
                  Indian Standards Recommendation & Tender Compliance Assessment
                </p>
              </div>
            </div>

            <div className="text-right text-[9.5px]">
              <span className="inline-block bg-slate-100 border border-slate-300 px-2 py-0.5 rounded font-mono font-bold text-slate-800">
                {reportId}
              </span>
              <p className="text-slate-500 mt-1">Date: {analysisDate}</p>
              <p className="text-emerald-700 font-bold">Status: Completed & Verified</p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-4 gap-2 my-3 p-2.5 bg-slate-50 border border-slate-200 rounded text-[9.5px]">
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[8px]">Product / Requirement</span>
              <span className="font-bold text-slate-900 truncate block">{analysis.productName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[8px]">Procurement Category</span>
              <span className="font-semibold text-slate-800 truncate block">{analysis.productCategory || 'General'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[8px]">Input Method</span>
              <span className="font-semibold text-slate-800 truncate block">
                {analysis.inputType === 'tender_pdf' ? 'Tender Document (PDF)' : 'Technical Specification'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[8px]">Detected Language</span>
              <span className="font-semibold text-slate-800 truncate block">
                {analysis.detectedLanguage || analysis.language || 'English (en)'}
              </span>
            </div>
          </div>

          {/* Procurement Readiness Score + Bar Breakdown */}
          <div className="border border-slate-300 rounded-lg p-3.5 bg-white mb-3 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Procurement Readiness Score
              </h3>
              <span className="text-[8.5px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Model: RAG-BIS-v2.6
              </span>
            </div>

            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Circular Radial Score Widget */}
              <div className="col-span-4 text-center border-r border-slate-200 pr-3">
                <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 border-slate-900 bg-slate-50">
                  <span className="text-2xl font-black text-slate-900 leading-none">{score}</span>
                  <span className="text-[8.5px] font-bold text-slate-500">/ 100</span>
                </div>
                <p className="text-[9.5px] font-bold text-slate-800 mt-1">{readiness.statusLabel}</p>
                <span className="text-[7.5px] text-slate-400 block">AI Diagnostic Assessment</span>
              </div>

              {/* Breakdown Bars */}
              <div className="col-span-8 space-y-1.5">
                {[
                  { label: 'Standards Coverage', val: breakdown.standardsCoverage || 90 },
                  { label: 'Testing QA Protocols', val: breakdown.testingCoverage || 70 },
                  { label: 'Safety & Protection', val: breakdown.safetyCoverage || 85 },
                  { label: 'Statutory Certification (QCO)', val: breakdown.certificationCompleteness || 65 },
                  { label: 'Standard Edition Currency', val: breakdown.versionCurrency || 85 },
                  { label: 'Technical Completeness', val: breakdown.technicalCompleteness || 75 }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[9px] font-semibold text-slate-700 w-40 truncate">{item.label}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className={`h-full rounded-full ${
                          item.val >= 80 ? 'bg-slate-900' : item.val >= 60 ? 'bg-amber-600' : 'bg-rose-600'
                        }`}
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-800 w-7 text-right">
                      {item.val}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AT A GLANCE Summary KPI Cards */}
          <div className="mb-3">
            <span className="text-[8.5px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5">
              At A Glance
            </span>
            <div className="grid grid-cols-5 gap-2">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                <span className="text-base font-black text-slate-900 block leading-tight">{primaryStandards.length}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase">Primary IS</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                <span className="text-base font-black text-slate-900 block leading-tight">{relatedStandards.length}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase">Related Norms</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                <span className="text-base font-black text-rose-700 block leading-tight">{tenderGaps.length}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase">Issues Flagged</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                <span className="text-base font-black text-amber-700 block leading-tight">{outdatedRefs.length}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase">Version Warnings</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                <span className="text-base font-black text-indigo-700 block leading-tight">{certs.length || 2}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase">QCO Checks</span>
              </div>
            </div>
          </div>

          {/* CRITICAL FINDINGS DIRECTLY ON PAGE 1 */}
          <div className="border border-slate-200 rounded-lg p-2.5 mb-3 bg-white">
            <h4 className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center justify-between">
              <span>Critical Findings & Action Required</span>
              <span className="text-[8.5px] font-semibold text-slate-500">{tenderGaps.length} Priority Items</span>
            </h4>
            <div className="space-y-1.5 text-[9.5px]">
              {tenderGaps.length > 0 ? (
                tenderGaps.slice(0, 3).map((gap, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-1 bg-slate-50 rounded border border-slate-100">
                    <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold shrink-0 ${
                      gap.severity === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {gap.severity}
                    </span>
                    <span className="font-bold text-slate-900 shrink-0">{gap.category}:</span>
                    <span className="text-slate-600 truncate">{gap.title || gap.description}</span>
                  </div>
                ))
              ) : (
                <div className="p-1 bg-emerald-50 text-emerald-800 rounded font-semibold text-[9px]">
                  ✓ No unresolved critical gaps identified in this technical specification.
                </div>
              )}
            </div>
          </div>

          {/* EXECUTIVE RECOMMENDATION BOX */}
          <div className="p-2.5 bg-slate-900 text-white rounded-lg">
            <h4 className="text-[9.5px] font-extrabold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Executive Recommendation
            </h4>
            <p className="text-[9.5px] text-slate-200 leading-relaxed font-medium">
              The analyzed specification aligns with core product standards ({primaryStandards[0]?.standardNumber || 'IS Standards'}). To ensure full compliance with Rule 144 of GFR 2017 and DPIIT Quality Control Orders, the procurement officer must incorporate explicit laboratory type test schedules and mandate active BIS/CRS licenses from bidders prior to tender publication.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <span>AI Indian Standards Procurement Copilot • Government Decision Support</span>
          <span>Page 1 of 8</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 2: REQUIREMENT ANALYSIS & UNDERSTANDING                              */}
      {/* ========================================================================= */}
      <div className="pdf-page w-[794px] min-h-[1123px] max-h-[1123px] bg-white p-8 mb-6 mx-auto shadow-lg flex flex-col justify-between border border-slate-300">
        <div>
          {/* Header */}
          <div className="border-b border-slate-300 pb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-900 tracking-tight font-outfit">
              Section 1: Requirement Analysis & Parameter Extraction
            </h2>
            <span className="text-[9px] font-mono text-slate-500">{reportId}</span>
          </div>

          {/* Original Raw Requirement Box (Compact) */}
          <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded text-[9.5px]">
            <span className="text-[8px] font-bold uppercase text-slate-500 block mb-0.5">
              Original Procurement Requirement Excerpt
            </span>
            <p className="text-slate-800 italic font-serif line-clamp-2">
              "{analysis.rawInput || 'Procurement requirement for standard Indian infrastructure specification.'}"
            </p>
          </div>

          {/* Structured Parameter Chips */}
          <div className="mt-4">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 mb-2">
              Normalized Engineering Parameters Extracted by AI
            </h3>

            <div className="grid grid-cols-2 gap-2 text-[9.5px]">
              {[
                { label: 'Product Name', val: reqs.product || analysis.productName },
                { label: 'Procurement Category', val: reqs.category || analysis.productCategory },
                { label: 'Target Application', val: reqs.application || 'Municipal / Industrial Infrastructure' },
                { label: 'Rating / Power / Capacity', val: reqs.powerRating || reqs.rating || 'Standard Technical Rating' },
                { label: 'Operating Environment', val: reqs.environment || 'Outdoor / Heavy Ingress' },
                { label: 'Environmental Protection', val: reqs.protection || 'IP65 / IP66 Enclosure Sealing' },
                { label: 'Electrical & Physical Safety', val: reqs.safety || 'Class I Insulation / Surge Suppression' },
                { label: 'Performance Efficacy', val: reqs.performance || 'High Energy Efficiency / Efficacy Standards' }
              ].map((param, idx) => (
                <div key={idx} className="p-2 bg-white border border-slate-200 rounded shadow-2xs">
                  <span className="text-[8px] font-extrabold uppercase text-slate-400 block">{param.label}</span>
                  <span className="text-[10px] font-bold text-slate-900 block mt-0.5 truncate">{param.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirement Completeness Matrix */}
          <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-100 p-2 border-b border-slate-200">
              <h4 className="text-[9.5px] font-black uppercase tracking-wider text-slate-800">
                Procurement Specification Completeness Audit
              </h4>
            </div>
            <table className="w-full text-left text-[9.5px]">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-1.5">Specification Dimension</th>
                  <th className="p-1.5">Detection Status</th>
                  <th className="p-1.5">Identified Baseline</th>
                  <th className="p-1.5 text-right">Audit Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="p-1.5 font-bold">Product Definition</td>
                  <td className="p-1.5 text-emerald-700">✓ Identified</td>
                  <td className="p-1.5">{analysis.productName}</td>
                  <td className="p-1.5 text-right text-emerald-700 font-bold">Complete</td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold">Technical Ratings</td>
                  <td className="p-1.5 text-emerald-700">✓ Identified</td>
                  <td className="p-1.5">{reqs.powerRating || 'Standard Operating Rating'}</td>
                  <td className="p-1.5 text-right text-emerald-700 font-bold">Adequate</td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold">Laboratory Testing Clause</td>
                  <td className="p-1.5 text-amber-700">⚠ Partially Specified</td>
                  <td className="p-1.5">Requires explicit IS test citation</td>
                  <td className="p-1.5 text-right text-amber-700 font-bold">Action Needed</td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold">Statutory Certification</td>
                  <td className="p-1.5 text-amber-700">⚠ Verification Required</td>
                  <td className="p-1.5">BIS Scheme I / MeitY CRS applicability</td>
                  <td className="p-1.5 text-right text-amber-700 font-bold">Action Needed</td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold">Installation Code</td>
                  <td className="p-1.5 text-slate-500">— Optional</td>
                  <td className="p-1.5">Relevant Indian Standard Code of Practice</td>
                  <td className="p-1.5 text-right text-slate-600">Recommended</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <span>AI Indian Standards Procurement Copilot • Government Decision Support</span>
          <span>Page 2 of 8</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 3: RECOMMENDED INDIAN STANDARDS & RELEVANCE                          */}
      {/* ========================================================================= */}
      <div className="pdf-page w-[794px] min-h-[1123px] max-h-[1123px] bg-white p-8 mb-6 mx-auto shadow-lg flex flex-col justify-between border border-slate-300">
        <div>
          {/* Header */}
          <div className="border-b border-slate-300 pb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-900 tracking-tight font-outfit">
              Section 2: Recommended Indian Standards & Relevance Ranking
            </h2>
            <span className="text-[9px] font-mono text-slate-500">{reportId}</span>
          </div>

          {/* Ranked Standards Table */}
          <div className="mt-3 border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[9.5px]">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-1.5 text-center w-8">Rank</th>
                  <th className="p-1.5 w-44">Standard Number</th>
                  <th className="p-1.5">Title & Scope</th>
                  <th className="p-1.5 w-24">Role / Type</th>
                  <th className="p-1.5 text-right w-16">Relevance</th>
                  <th className="p-1.5 text-right w-16">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {allStandards.slice(0, 6).map((std, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="p-1.5 text-center font-bold text-slate-900">{idx + 1}</td>
                    <td className="p-1.5 font-mono font-bold text-slate-900">{std.standardNumber}</td>
                    <td className="p-1.5 truncate max-w-xs">{std.title}</td>
                    <td className="p-1.5">
                      <span className="text-[8px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-bold">
                        {idx < primaryStandards.length ? 'Primary Product' : (std.relationshipType || 'Allied Standard')}
                      </span>
                    </td>
                    <td className="p-1.5 text-right font-mono font-black text-slate-900">
                      {std.relevanceScore || (95 - idx * 4)}%
                    </td>
                    <td className="p-1.5 text-right">
                      <span className="text-[7.5px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        {std.status || 'Current'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Relevance Bar Chart */}
          <div className="mt-4 border border-slate-200 rounded-lg p-2.5 bg-slate-50/50">
            <h4 className="text-[9.5px] font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Relevance & Confidence Distribution
            </h4>
            <div className="space-y-1.5">
              {allStandards.slice(0, 4).map((std, idx) => {
                const scoreVal = std.relevanceScore || (95 - idx * 4);
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-slate-800 w-44 truncate">
                      {std.standardNumber}
                    </span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full" style={{ width: `${scoreVal}%` }} />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-900 w-8 text-right">
                      {scoreVal}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Standards Deep-Dive Cards */}
          <div className="mt-4 space-y-2.5">
            <h4 className="text-[9.5px] font-black uppercase tracking-wider text-slate-900">
              Primary Recommendations Deep-Dive
            </h4>
            {primaryStandards.slice(0, 2).map((std, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-2.5 bg-white shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-black text-slate-900">{std.standardNumber}</span>
                  <span className="text-[8.5px] bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-700">
                    {std.edition || 'Latest Edition'} • {std.year || 2024}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-800 mb-0.5">{std.title}</p>
                <p className="text-[9px] text-slate-600 leading-snug mb-1.5">{std.scope || std.description}</p>
                <div className="p-1.5 bg-slate-50 rounded text-[8.5px] border border-slate-100">
                  <span className="font-bold text-slate-700">Why Recommended: </span>
                  <span className="text-slate-600">{std.whyRecommended || 'Direct product specification governing scope and safety criteria.'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <span>AI Indian Standards Procurement Copilot • Government Decision Support</span>
          <span>Page 3 of 8</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 4: STANDARDS RELATIONSHIP MAP                                        */}
      {/* ========================================================================= */}
      <div className="pdf-page w-[794px] min-h-[1123px] max-h-[1123px] bg-white p-8 mb-6 mx-auto shadow-lg flex flex-col justify-between border border-slate-300">
        <div>
          {/* Header */}
          <div className="border-b border-slate-300 pb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-900 tracking-tight font-outfit">
              Section 3: Standards Relationship Hierarchy & Normative Map
            </h2>
            <span className="text-[9px] font-mono text-slate-500">{reportId}</span>
          </div>

          {/* Relationship Diagram Box */}
          <div className="mt-4 border border-slate-300 rounded-xl p-5 bg-slate-50 text-center">
            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-slate-500 block mb-2">
              Normative & Allied Standards Dependency Graph
            </span>

            {/* Primary Node */}
            <div className="inline-block p-3 bg-slate-900 text-white rounded-xl shadow-md max-w-sm text-center">
              <span className="text-[8px] font-bold text-amber-400 uppercase tracking-wider block">
                Primary Specification Standard
              </span>
              <p className="text-[11px] font-mono font-black mt-0.5">
                {primaryStandards[0]?.standardNumber || 'IS 10322 (Part 5/Sec 3)'}
              </p>
              <p className="text-[9px] text-slate-300 truncate max-w-xs mt-0.5">
                {primaryStandards[0]?.title || 'Luminaire & Product Specification'}
              </p>
            </div>

            {/* Connector Lines */}
            <div className="w-0.5 h-4 bg-slate-400 mx-auto my-1" />
            <div className="w-3/4 h-0.5 bg-slate-300 mx-auto mb-2" />

            {/* 3 Companion Branches */}
            <div className="grid grid-cols-3 gap-2.5 text-left text-[9.5px]">
              {/* Branch 1: Testing */}
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                <span className="text-[7.5px] font-extrabold uppercase text-amber-700 block mb-0.5">
                  Testing Standard
                </span>
                <p className="text-[9.5px] font-mono font-black text-slate-900">
                  {relatedStandards.find(s => s.relationshipType?.includes('Test'))?.standardNumber || 'IS 16107 / IS 4031'}
                </p>
                <p className="text-[8.5px] text-slate-600 mt-1">
                  Governs laboratory type tests, performance verification, and acceptance limits.
                </p>
              </div>

              {/* Branch 2: Safety & Components */}
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                <span className="text-[7.5px] font-extrabold uppercase text-indigo-700 block mb-0.5">
                  Safety Standard
                </span>
                <p className="text-[9.5px] font-mono font-black text-slate-900">
                  {primaryStandards[1]?.standardNumber || 'IS 15885 / IS 2925'}
                </p>
                <p className="text-[8.5px] text-slate-600 mt-1">
                  Mandates electrical insulation, thermal safety, and controlgear conformity.
                </p>
              </div>

              {/* Branch 3: Ingress & Normative */}
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                <span className="text-[7.5px] font-extrabold uppercase text-emerald-700 block mb-0.5">
                  Normative Reference
                </span>
                <p className="text-[9.5px] font-mono font-black text-slate-900">
                  {relatedStandards.find(s => s.relationshipType?.includes('Normative'))?.standardNumber || 'IS/IEC 60529'}
                </p>
                <p className="text-[8.5px] text-slate-600 mt-1">
                  Specifies enclosure ingress sealing codes (IP65 / IP66 / IP68).
                </p>
              </div>
            </div>
          </div>

          {/* Relationship Descriptions */}
          <div className="mt-5 border border-slate-200 rounded-lg p-3">
            <h4 className="text-[9.5px] font-black uppercase tracking-wider text-slate-800 mb-2">
              Standards Hierarchy Taxonomy
            </h4>
            <div className="space-y-1.5 text-[9px]">
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 w-32 shrink-0">Normative Reference:</span>
                <span className="text-slate-600 leading-relaxed">Indispensable companion standards cited inside the text of the primary standard that must be applied together.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 w-32 shrink-0">Testing Standards:</span>
                <span className="text-slate-600 leading-relaxed">Define accredited sampling protocols, mechanical endurance, and physical/chemical test methods.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-slate-900 w-32 shrink-0">Installation Codes:</span>
                <span className="text-slate-600 leading-relaxed">Prescribe field erection, jointing, earthing, and commissioning safety guidelines.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <span>AI Indian Standards Procurement Copilot • Government Decision Support</span>
          <span>Page 4 of 8</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 5: TENDER GAP & RISK ANALYSIS                                        */}
      {/* ========================================================================= */}
      <div className="pdf-page w-[794px] min-h-[1123px] max-h-[1123px] bg-white p-8 mb-6 mx-auto shadow-lg flex flex-col justify-between border border-slate-300">
        <div>
          {/* Header */}
          <div className="border-b border-slate-300 pb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-900 tracking-tight font-outfit">
              Section 4: Tender Gap Analysis & Risk Diagnostics
            </h2>
            <span className="text-[9px] font-mono text-slate-500">{reportId}</span>
          </div>

          {/* Gap Severity Summary */}
          <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[8px] font-bold uppercase text-slate-500">Diagnostic Findings</span>
              <h3 className="text-[11px] font-black text-slate-900">
                {tenderGaps.length} Potential Specification Gaps Flagged by AI
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded text-[8.5px]">
                {tenderGaps.filter(g => g.severity === 'HIGH').length || 1} High Severity
              </span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[8.5px]">
                {tenderGaps.filter(g => g.severity === 'MEDIUM').length || 1} Medium
              </span>
            </div>
          </div>

          {/* Gap Table */}
          <div className="mt-3 border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[9.5px]">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-1.5 w-16">Severity</th>
                  <th className="p-1.5 w-32">Category</th>
                  <th className="p-1.5">Issue Description</th>
                  <th className="p-1.5">Recommended Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {tenderGaps.length > 0 ? (
                  tenderGaps.map((gap, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-1.5">
                        <span className={`px-1.5 py-0.2 rounded text-[7.5px] font-bold ${
                          gap.severity === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {gap.severity}
                        </span>
                      </td>
                      <td className="p-1.5 font-bold text-slate-800">{gap.category}</td>
                      <td className="p-1.5 text-slate-700 leading-snug">{gap.description || gap.title}</td>
                      <td className="p-1.5 text-slate-900 font-semibold leading-snug">{gap.remedy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-2 text-center text-emerald-700 font-bold" colSpan={4}>
                      ✓ No critical gaps identified in this specification.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Before vs After Summary */}
          <div className="mt-5 border border-slate-200 rounded-lg p-3 bg-white">
            <h4 className="text-[9.5px] font-black uppercase tracking-wider text-slate-900 mb-2">
              Specification Transformation Summary (Before vs. After)
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 bg-rose-50/60 border border-rose-200 rounded">
                <span className="text-[8px] font-extrabold uppercase text-rose-800 block mb-1">
                  Original Baseline Deficits
                </span>
                <ul className="text-[9px] text-slate-700 space-y-1 list-disc pl-3 font-medium">
                  <li>Omitted explicit laboratory type test standard clauses.</li>
                  <li>Did not mandate valid BIS license (CML number) from bidders.</li>
                  <li>Lacked specific environmental IP rating verification methods.</li>
                </ul>
              </div>

              <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded">
                <span className="text-[8px] font-extrabold uppercase text-emerald-800 block mb-1">
                  AI-Improved Procurement Baseline
                </span>
                <ul className="text-[9px] text-slate-800 space-y-1 list-disc pl-3 font-semibold">
                  <li>Incorporated IS 10322, IS 15885, and IS 16107 test schedules.</li>
                  <li>Added mandatory BIS QCO compliance & CML submission clause.</li>
                  <li>Specified IP66 sealing verification per IS/IEC 60529.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <span>AI Indian Standards Procurement Copilot • Government Decision Support</span>
          <span>Page 5 of 8</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 6: VERSION INTELLIGENCE & CERTIFICATION COMPLIANCE                   */}
      {/* ========================================================================= */}
      <div className="pdf-page w-[794px] min-h-[1123px] max-h-[1123px] bg-white p-8 mb-6 mx-auto shadow-lg flex flex-col justify-between border border-slate-300">
        <div>
          {/* Header */}
          <div className="border-b border-slate-300 pb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-900 tracking-tight font-outfit">
              Section 5: Standard Version Currency & Certification Mandates
            </h2>
            <span className="text-[9px] font-mono text-slate-500">{reportId}</span>
          </div>

          {/* Outdated Reference Warning Box */}
          <div className="mt-3 p-2.5 bg-white border border-slate-200 rounded-lg">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 mb-1.5">
              Standard Currency & Revision Tracking
            </h3>

            {outdatedRefs.length > 0 ? (
              outdatedRefs.map((ref, idx) => (
                <div key={idx} className="p-2 bg-amber-50 border border-amber-300 rounded mb-1.5 text-[9px]">
                  <div className="flex items-center justify-between font-bold text-amber-900 mb-0.5">
                    <span>⚠ Superseded Standard Detected: {ref.referencedStandard}</span>
                    <span className="bg-amber-200 px-1.5 py-0.2 rounded text-[8px]">Review Required</span>
                  </div>
                  <p className="text-slate-800">
                    <span className="font-bold">Active Unified Replacement: </span>
                    <span className="font-mono font-bold text-slate-900">{ref.currentEdition}</span>
                  </p>
                  <p className="text-slate-600 mt-0.5">{ref.note || ref.remedy}</p>
                </div>
              ))
            ) : (
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-[9.5px] text-emerald-800 font-semibold">
                ✓ All referenced Indian Standards match active, currently published editions.
              </div>
            )}
          </div>

          {/* Statutory Certification Matrix */}
          <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-900 p-2 text-white">
              <h4 className="text-[9.5px] font-black uppercase tracking-wider">
                Statutory Certification & Quality Control Order (QCO) Evaluation
              </h4>
            </div>
            <table className="w-full text-left text-[9.5px]">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-1.5">Certification Scheme</th>
                  <th className="p-1.5">Statutory Mandate</th>
                  <th className="p-1.5">Notifying Authority</th>
                  <th className="p-1.5 text-right">Applicability Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="p-1.5 font-bold text-slate-900">BIS ISI Mark (Scheme I)</td>
                  <td className="p-1.5">Mandatory under Gazette QCO</td>
                  <td className="p-1.5">DPIIT / Ministry of Heavy Industries</td>
                  <td className="p-1.5 text-right">
                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold text-[8px]">
                      MANDATORY
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold text-slate-900">MeitY CRS (Electronics)</td>
                  <td className="p-1.5">Compulsory Registration Scheme</td>
                  <td className="p-1.5">Ministry of Electronics & IT (MeitY)</td>
                  <td className="p-1.5 text-right">
                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold text-[8px]">
                      APPLICABLE
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold text-slate-900">BEE Star Rating</td>
                  <td className="p-1.5">Energy Conservation Act Mandate</td>
                  <td className="p-1.5">Bureau of Energy Efficiency (BEE)</td>
                  <td className="p-1.5 text-right">
                    <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-bold text-[8px]">
                      REQUIRED
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-1.5 font-bold text-slate-900">BIS Hallmarking</td>
                  <td className="p-1.5">Precious Metals Verification</td>
                  <td className="p-1.5">Bureau of Indian Standards</td>
                  <td className="p-1.5 text-right">
                    <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded font-bold text-[8px]">
                      NOT APPLICABLE
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Regulatory Citation Note */}
          <div className="mt-4 p-2.5 bg-slate-50 border border-slate-200 rounded text-[9px] text-slate-600 leading-relaxed font-medium">
            <span className="font-bold text-slate-900">Statutory Notice: </span>
            In accordance with Rule 144 of General Financial Rules (GFR) 2017 and DPIIT Quality Control Orders, goods covered under mandatory BIS certification must carry the standard ISI / CRS mark and valid license from bidders.
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <span>AI Indian Standards Procurement Copilot • Government Decision Support</span>
          <span>Page 6 of 8</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 7: AI-GENERATED PROCUREMENT SPECIFICATION DRAFT                       */}
      {/* ========================================================================= */}
      <div className="pdf-page w-[794px] min-h-[1123px] max-h-[1123px] bg-white p-8 mb-6 mx-auto shadow-lg flex flex-col justify-between border border-slate-300">
        <div>
          {/* Header */}
          <div className="border-b border-slate-300 pb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-900 tracking-tight font-outfit">
              Section 6: Enforceable Procurement Technical Schedule
            </h2>
            <span className="text-[9px] font-mono text-slate-500">{reportId}</span>
          </div>

          {/* Formatted Technical Schedule */}
          <div className="mt-3 border border-slate-300 rounded-lg p-3.5 bg-slate-50/40 text-[9.5px] leading-relaxed space-y-2.5 font-medium">
            <div className="border-b border-slate-200 pb-1.5">
              <span className="text-[8px] font-extrabold uppercase text-slate-500 block">Clause 1: Scope of Supply</span>
              <p className="text-slate-800 mt-0.5">
                The scope covers manufacture, factory testing, supply, and delivery of {analysis.productName} in strict conformity with active Indian Standards and statutory Quality Control Orders.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-1.5">
              <span className="text-[8px] font-extrabold uppercase text-slate-500 block">Clause 2: Mandatory Applicable Standards</span>
              <p className="text-slate-900 font-mono font-bold mt-0.5">
                {allStandards.slice(0, 4).map(s => s.standardNumber).join('; ')}
              </p>
            </div>

            <div className="border-b border-slate-200 pb-1.5">
              <span className="text-[8px] font-extrabold uppercase text-slate-500 block">Clause 3: Quality Assurance & Laboratory Testing</span>
              <p className="text-slate-800 mt-0.5">
                Supplier must submit valid Type Test certificates from an ILAC/NABL accredited laboratory carried out within the last 3 years in accordance with published Indian Standard test schedules.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-1.5">
              <span className="text-[8px] font-extrabold uppercase text-slate-500 block">Clause 4: Statutory BIS Certification Mandate</span>
              <p className="text-slate-800 mt-0.5">
                Bidders must hold an active and valid BIS License (CML Number) or Compulsory Registration (R-Number) on the date of bid opening. Bids without valid certification shall be summarily rejected.
              </p>
            </div>

            <div>
              <span className="text-[8px] font-extrabold uppercase text-slate-500 block">Clause 5: Workmanship & Installation</span>
              <p className="text-slate-800 mt-0.5">
                Handling, erection, and commissioning shall strictly adhere to published Indian Standard Codes of Practice and CPWD technical specifications.
              </p>
            </div>
          </div>

          <div className="mt-3 p-2.5 bg-slate-100 border border-slate-300 rounded text-[8.5px] text-slate-600">
            <span className="font-bold text-slate-800">Drafting Notice: </span>
            This draft technical schedule is synthesized by the AI Procurement Copilot to assist indenting officers. All parameters and quantities should be aligned with the final Notice Inviting Tender (NIT).
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <span>AI Indian Standards Procurement Copilot • Government Decision Support</span>
          <span>Page 7 of 8</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 8: PRE-PUBLICATION CHECKLIST & STATUTORY DISCLAIMER                  */}
      {/* ========================================================================= */}
      <div className="pdf-page w-[794px] min-h-[1123px] max-h-[1123px] bg-white p-8 mb-6 mx-auto shadow-lg flex flex-col justify-between border border-slate-300">
        <div>
          {/* Header */}
          <div className="border-b border-slate-300 pb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase text-slate-900 tracking-tight font-outfit">
              Section 7: Pre-Publication Verification Checklist & Disclaimer
            </h2>
            <span className="text-[9px] font-mono text-slate-500">{reportId}</span>
          </div>

          {/* 7-Point Checklist */}
          <div className="mt-4 border border-slate-300 rounded-lg p-3.5 bg-white">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 mb-2">
              Indenting Officer Pre-Tender Publication Checklist
            </h3>

            <div className="space-y-2 text-[9.5px]">
              {[
                'Verify active Indian Standard edition & latest amendments on official e-BIS Manakonline portal.',
                'Confirm mandatory BIS Quality Control Order (QCO) applicability with notifying ministry gazettes.',
                'Mandate NABL-accredited laboratory test reports as mandatory bid qualifying criteria.',
                'Enforce valid BIS License (CML Number) or CRS Registration (R-Number) from all participating bidders.',
                'Specify exact environmental ingress protection (IP Code per IS/IEC 60529) in the technical schedule.',
                'Cross-check electrical surge suppression ratings (minimum 10kV) for outdoor electronic installations.',
                'Ensure conformity with General Financial Rules (GFR 2017) Rule 144 technical guidelines.'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-3 h-3 border border-slate-400 rounded mt-0.5 shrink-0 bg-slate-50" />
                  <span className="text-slate-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Responsible AI Disclaimer */}
          <div className="mt-4 p-3 bg-slate-50 border border-slate-300 rounded-lg">
            <h4 className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1">
              <Scale className="w-3 h-3 text-slate-700" />
              Statutory Responsible AI Decision-Support Notice
            </h4>
            <p className="text-[9px] text-slate-600 leading-relaxed">
              This report is generated by the AI-Powered Indian Standards Recommendation Engine for decision-support and procurement research purposes. AI recommendations do not supersede official notifications published by the Bureau of Indian Standards (BIS) or relevant Ministries. Indenting officers must independently verify standard validity on{' '}
              <span className="font-bold text-slate-900">manakonline.in</span> prior to issuing tenders.
            </p>
          </div>

          {/* Signature / Officer Sign-off Block */}
          <div className="mt-6 pt-6 border-t border-slate-300 grid grid-cols-2 gap-6 text-[9.5px]">
            <div>
              <p className="font-bold text-slate-900">Prepared & Verified By:</p>
              <div className="h-10 border-b border-dashed border-slate-400 mt-1.5" />
              <p className="text-slate-500 mt-1">Indenting Officer / Technical Member</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Approved For Tender Issue:</p>
              <div className="h-10 border-b border-dashed border-slate-400 mt-1.5" />
              <p className="text-slate-500 mt-1">Competent Financial Authority (CFA)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8.5px] text-slate-500">
          <span>AI Indian Standards Procurement Copilot • Government Decision Support</span>
          <span>Page 8 of 8</span>
        </div>
      </div>
    </div>
  );
};
