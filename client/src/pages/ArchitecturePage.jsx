import React from 'react';
import {
  Layers,
  Cpu,
  Database,
  FileCode,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowDown,
  Workflow,
  Scale,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const ArchitecturePage = () => {
  const pipelineSteps = [
    {
      layer: 'Layer 1: Multimodal Ingestion',
      title: 'Multilingual Input & Document OCR',
      desc: 'Ingests natural language specifications (English/Hindi/Hinglish), Voice speech-to-text, and raw multi-page Tender PDFs up to 20MB.',
      tech: 'React Web Speech API • Multer • pdf-parse • Bilingual Transliteration'
    },
    {
      layer: 'Layer 2: Structured Parameter Extraction',
      title: 'NLP Clause Parsing & Ambiguity Detection',
      desc: 'Extracts 12+ structured attributes (Application, Material, Rating, Testing, QCO). Detects insufficient parameters to prevent hallucinations.',
      tech: 'Regex Clause Segmenter • Zero-Hallucination Heuristic • Interactive Clarifier'
    },
    {
      layer: 'Layer 3: Hybrid Semantic Search',
      title: 'Knowledge Graph & Vector Traversal',
      desc: 'Matches parameters against indexed BIS Indian Standards corpus. Traverses normative cross-references to identify testing and safety standards.',
      tech: 'Semantic Matcher • Graph Relationship Engine • Normative Linker'
    },
    {
      layer: 'Layer 4: Procurement Intelligence',
      title: 'Version Intelligence & QCO Assessment',
      desc: 'Identifies superseded editions (e.g. IS 8112 -> IS 269), active amendments (10kV surge), and mandatory BIS ISI / MeitY CRS orders.',
      tech: 'Gazette Quality Control Orders Index • Amendment History Tracker'
    },
    {
      layer: 'Layer 5: Decision Support & Generation',
      title: 'Tender Gap Detection & Spec Generator',
      desc: 'Computes 0-100 Procurement Readiness Score, flags missing testing clauses, and synthesizes 8-section GFR-compliant tender schedules.',
      tech: 'Readiness Index Alg • AI Spec Draft Generator • jsPDF / html2canvas'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
            SIH 2026 Technical Innovation Blueprint
          </span>
          <span className="text-xs text-slate-500 font-medium">System Architecture & Pipeline</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
          AI Procurement Copilot Architecture
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          End-to-end multi-layer architecture integrating Bilingual NLP, Knowledge Graphs, Statutory Quality Control Orders, and Explainable AI.
        </p>
      </div>

      {/* Pipeline Diagram */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-outfit flex items-center gap-2">
            <Workflow className="w-5 h-5 text-gov-600" />
            <span>Multi-Stage Procurement Intelligence Pipeline</span>
          </h3>
          <Badge variant="primary" size="xs">
            5 Core Layers
          </Badge>
        </div>

        <div className="space-y-4">
          {pipelineSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 relative flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gov-700 bg-gov-100/80 px-2 py-0.5 rounded">
                  {step.layer}
                </span>
                <h4 className="text-sm font-bold text-slate-900 font-outfit mt-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-500 md:w-64 shrink-0 font-mono">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Stack / Components:</span>
                {step.tech}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Subsystems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-gov-700 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">AI / RAG Service Layer</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Modular architecture supporting deterministic local similarity ranking and plug-and-play LLM reasoning via Gemini 1.5 Flash API.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Resilient Data Persistence</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            MongoDB and Mongoose backend with automated embedded fallback store ensuring zero-dependency execution across local evaluators.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Statutory Knowledge Graph</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Corpus pre-seeded with authentic Indian Standards, edition history, testing clauses, and Gazette Quality Control Orders.
          </p>
        </div>
      </div>
    </div>
  );
};
