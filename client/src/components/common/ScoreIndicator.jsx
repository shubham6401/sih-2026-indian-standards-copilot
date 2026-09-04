import React from 'react';
import { HelpCircle } from 'lucide-react';

export const ScoreIndicator = ({ score = 85, label = 'Highly Relevant', size = 'md' }) => {
  let colorClasses = {
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    ring: 'text-emerald-600',
    dot: 'bg-emerald-600',
    bar: 'bg-emerald-600'
  };

  if (score < 75) {
    colorClasses = {
      bg: 'bg-amber-50 text-amber-900 border-amber-300',
      ring: 'text-amber-600',
      dot: 'bg-amber-600',
      bar: 'bg-amber-600'
    };
  } else if (score < 88) {
    colorClasses = {
      bg: 'bg-blue-50 text-gov-800 border-blue-300',
      ring: 'text-gov-600',
      dot: 'bg-gov-600',
      bar: 'bg-gov-600'
    };
  }

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-semibold font-mono ${colorClasses.bg}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${colorClasses.dot}`} />
        <span>{score}%</span>
        <span className="text-[10px] font-sans font-medium opacity-80 uppercase tracking-tight">({label})</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs flex items-center gap-4">
        <div className="relative flex items-center justify-center shrink-0">
          <div className="w-14 h-14 rounded-full border-4 border-slate-100 flex items-center justify-center font-bold font-mono text-lg text-slate-900">
            {score}%
          </div>
          <svg className="absolute top-0 left-0 w-14 h-14 -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={150.8}
              strokeDashoffset={150.8 - (150.8 * score) / 100}
              className={colorClasses.ring}
            />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded border text-xs font-bold uppercase tracking-wider ${colorClasses.bg}`}>
              {label}
            </span>
            <div className="group relative cursor-pointer">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
              <div className="hidden group-hover:block absolute z-30 bottom-full mb-1 left-1/2 -translate-x-1/2 w-56 p-2 bg-slate-900 text-white text-[11px] rounded shadow-lg">
                Automated relevance score based on standard scope match and technical parameter overlap.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Relevance confidence computed against BIS scopes & parameter overlap
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-semibold ${colorClasses.bg}`}>
      <span className={`w-2 h-2 rounded-full ${colorClasses.dot}`} />
      <span className="font-bold font-mono">{score}%</span>
      <span className="text-[11px] opacity-90 font-medium">| {label}</span>
    </div>
  );
};

