import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, FileText, Database, FileSearch, ShieldCheck, Scale } from 'lucide-react';

const STEPS = [
  { label: 'Parsing technical procurement parameters...', icon: FileText },
  { label: 'Querying indexed Indian Standards knowledge base...', icon: Database },
  { label: 'Mapping normative references and standard cross-links...', icon: FileSearch },
  { label: 'Checking gazette amendments and active revisions...', icon: Scale },
  { label: 'Auditing statutory QCO mandates (ISI/CRS schemes)...', icon: ShieldCheck },
  { label: 'Synthesizing verified procurement compliance dossier...', icon: CheckCircle2 }
];

export const LoadingState = ({ message = 'Analyzing procurement specifications...' }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-2xs max-w-lg mx-auto my-10 text-center">
      <div className="w-12 h-12 bg-gov-50 text-gov-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gov-200">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>

      <h3 className="text-base font-bold text-slate-900 mb-1">
        Synthesizing Standards Compliance Assessment
      </h3>
      <p className="text-xs text-slate-500 mb-5">
        {message}
      </p>

      {/* Progress sequence */}
      <div className="space-y-2 text-left max-w-md mx-auto bg-slate-50 p-3.5 rounded-md border border-slate-200">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 text-xs transition-colors ${
                isCurrent
                  ? 'text-gov-800 font-bold'
                  : isDone
                  ? 'text-emerald-800 font-medium'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-3.5 h-3.5 text-gov-700 animate-spin shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
              )}
              <span className="flex-1 text-[11px] leading-tight">{step.label}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-400 mt-4 font-mono">
        Corpus Query: BIS Indian Standards • DPIIT Gazette QCO Mandates
      </p>
    </div>
  );
};
