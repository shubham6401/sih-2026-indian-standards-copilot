import React from 'react';
import { HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export const ScoreIndicator = ({ score = 85, label = 'Highly Relevant', size = 'md' }) => {
  let colorClasses = {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    ring: 'text-emerald-600',
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500'
  };

  if (score < 75) {
    colorClasses = {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      ring: 'text-amber-600',
      dot: 'bg-amber-500',
      bar: 'bg-amber-500'
    };
  } else if (score < 88) {
    colorClasses = {
      bg: 'bg-blue-50 text-gov-600 border-blue-200',
      ring: 'text-gov-500',
      dot: 'bg-gov-500',
      bar: 'bg-gov-500'
    };
  }

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-semibold ${colorClasses.bg}`}>
        <span className={`w-2 h-2 rounded-full ${colorClasses.dot}`} />
        <span>{score}%</span>
        <span className="text-[10px] font-medium text-slate-500">({label})</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center font-bold text-xl text-slate-900">
            {score}%
          </div>
          <svg className="absolute top-0 left-0 w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={175.9}
              strokeDashoffset={175.9 - (175.9 * score) / 100}
              className={colorClasses.ring}
            />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClasses.bg}`}>
              {label}
            </span>
            <div className="group relative cursor-pointer">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
              <div className="hidden group-hover:block absolute z-30 bottom-full mb-1 left-1/2 -translate-x-1/2 w-56 p-2 bg-slate-900 text-white text-[11px] rounded shadow-lg">
                AI-generated relevance score based on scope matching and clause analysis. Does not imply statutory verification.
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
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${colorClasses.bg}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${colorClasses.dot}`} />
      <span className="font-bold">{score}%</span>
      <span className="text-xs opacity-90 font-medium">| {label}</span>
    </div>
  );
};
