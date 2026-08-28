import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Scale,
  AlertTriangle,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Award,
  Lock,
  Workflow
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const EvaluatorQuestionsPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const questions = [
    {
      q: 'Where does your standards data and regulatory information come from?',
      icon: Database,
      tag: 'Data Provenance',
      a: `In this prototype, we have pre-indexed a curated corpus of authentic Indian Standards (IS) published by the Bureau of Indian Standards (BIS) along with notified Gazette Quality Control Orders (QCOs) from DPIIT, MeitY, Ministry of Steel, MoHUA, and the Ministry of Heavy Industries. In production, this architecture connects to the official e-BIS / Manakonline API and national standards repository.`
    },
    {
      q: 'Why is AI necessary instead of a simple keyword / SQL search engine?',
      icon: Cpu,
      tag: 'AI Value Proposition',
      a: `Traditional keyword search fails for procurement for three fundamental reasons:
1. Overlapping Scopes: A procurement officer searches for "100W street light" — keyword search misses that the fixture involves IS 10322 (luminaire), IS 15885 (driver safety), IS 16107 (luminous efficacy), and IS/IEC 60529 (IP66 sealing).
2. Normative Cross-References: Standards form complex dependency graphs where testing methods and material specs reside in companion standards.
3. Multilingual Intent: Indenters enter requirements in Hindi (e.g. 'सड़क के लिए 100W LED लाइट') or Hinglish which standard databases cannot index without semantic transliteration.`
    },
    {
      q: 'How does the system prevent AI hallucinations and fabricated standard numbers?',
      icon: ShieldCheck,
      tag: 'Hallucination Control',
      a: `We enforce four strict anti-hallucination architectural constraints:
1. Grounded RAG Retrieval: The AI only maps against verified, indexed Indian Standards.
2. Zero-Hallucination Ambiguity Dialog: If an input is underspecified (e.g. "We need a water pump"), the system refuses to guess and triggers an interactive clarification questionnaire.
3. Authoritative Provenance Badges: The UI strictly distinguishes AI inference scores from official standard metadata.
4. Non-Binding Statutory Disclaimers: Clear GFR 2017 decision-support banners instruct officers to verify active editions on manakonline.in prior to tender publication.`
    },
    {
      q: 'What happens if external AI APIs (like Gemini / OpenAI) or network connectivity fails?',
      icon: AlertTriangle,
      tag: 'Graceful Degradation',
      a: `The application features zero single-point-of-failure architecture:
• Local Semantic Matcher: A built-in deterministic RAG scoring engine runs on the Node backend and executes 100% offline without external API keys.
• Embedded Persistence Fallback: If MongoDB is offline, the backend seamlessly activates an in-memory data store with seeded standards.
• Full Feature Access: Officers can still search the Standards Explorer, browse relationship graphs, run gap analyses, and export PDF reports.`
    },
    {
      q: 'How does this architecture scale to thousands of standards and concurrent tenders?',
      icon: Workflow,
      tag: 'Scalability & Performance',
      a: `The pipeline is designed for enterprise scale:
• Document Chunking & Worker Queues: Large 50+ page tender PDFs are parsed into structured clause vectors.
• Vector Embeddings & Graph Caching: Pre-computed embeddings in Milvus/Qdrant combined with Neo4j graph relationships allow sub-100ms retrieval.
• Microservices Ready: The ingestion, NLP normalization, RAG ranking, and specification generator modules are decoupled REST services.`
    },
    {
      q: 'How does the Tender Gap Detection and Procurement Readiness Score work?',
      icon: Scale,
      tag: 'Procurement Intelligence',
      a: `The Gap Detection Engine cross-evaluates the tender against normative requirements:
• It verifies whether statutory laboratory testing clauses (e.g. IS 16107 for LED efficacy, IS 4031 for cement compressive strength) are included.
• It verifies whether mandatory BIS License (CML Number) or CRS Registration (R-Number) clauses are mandated to prevent unqualified bidders.
• It computes a 0–100 Procurement Readiness Score across 6 dimensions (Standards Coverage, Testing, Safety, Certification, Version Currency, and Technical Completeness).`
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
            SIH 2026 Evaluator Briefing
          </span>
          <span className="text-xs text-slate-500 font-medium">Technical Defense & Solution Overview</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
          Evaluator Questions & Architectural Defense
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed technical explanations addressing data provenance, hallucination prevention, AI necessity, offline resilience, and enterprise scalability.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {questions.map((item, idx) => {
          const isOpen = openIndex === idx;
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen ? 'bg-white border-gov-300 shadow-md ring-1 ring-gov-200' : 'bg-white/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isOpen ? 'bg-gov-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gov-700 block mb-0.5">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 font-outfit">
                      {item.q}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-gov-600" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-700 leading-relaxed border-t border-slate-100 space-y-2 whitespace-pre-line font-medium">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
