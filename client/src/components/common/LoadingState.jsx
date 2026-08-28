import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Sparkles, Database, FileSearch, ShieldCheck, Scale } from 'lucide-react';

const STEPS = [
  { label: 'Understanding requirements...', icon: Sparkles },
  { label: 'Searching Indian Standards knowledge base...', icon: Database },
  { label: 'Analyzing related and normative standards...', icon: FileSearch },
  { label: 'Checking revisions and latest amendments...', icon: Scale },
  { label: 'Evaluating mandatory certification (CRS/ISI)...', icon: ShieldCheck },
  { label: 'Preparing explainable recommendations...', icon: CheckCircle2 }
];

export const LoadingState = ({ message = 'Analyzing procurement specifications...' }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg max-w-xl mx-auto my-12 text-center">
      <div className="w-16 h-16 bg-gov-50 text-gov-600 rounded-full flex items-center justify-center mx-auto mb-5 relative">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        AI Indian Standards Engine at Work
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        {message}
      </p>

      {/* Progress sequence */}
      <div className="space-y-3 text-left max-w-md mx-auto bg-slate-50 p-4 rounded-xl border border-slate-100">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const StepIcon = step.icon;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                isCurrent
                  ? 'text-gov-700 font-bold scale-[1.02]'
                  : isDone
                  ? 'text-emerald-700 font-medium opacity-90'
                  : 'text-slate-400 opacity-50'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-gov-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
              )}
              <span className="flex-1">{step.label}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400 mt-5">
        Querying indexed BIS corpus • Cross-referencing Quality Control Orders
      </p>
    </div>
  );
};
