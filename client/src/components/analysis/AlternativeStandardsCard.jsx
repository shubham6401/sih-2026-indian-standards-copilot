import React, { useState } from 'react';
import { Layers, ChevronRight, Loader2 } from 'lucide-react';
import { ScoreIndicator } from '../common/ScoreIndicator';

export const AlternativeStandardsCard = ({
  primaryStandards = [],
  alternativeStandards = [],
  alternatives = [],
  onViewDetails,
  onSelectStandard
}) => {
  const [openingStd, setOpeningStd] = useState(null);
  const altsList = alternativeStandards.length > 0 ? alternativeStandards : alternatives;
  const handler = onViewDetails || onSelectStandard;

  const handleOpen = async (alt) => {
    if (!handler || openingStd) return;
    setOpeningStd(alt.standardNumber);
    try {
      await handler(alt);
    } finally {
      setTimeout(() => setOpeningStd(null), 300);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-2xs my-6 space-y-5">
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-gov-50 text-gov-800 px-2 py-0.5 rounded border border-gov-200">
            Ambiguity & Boundary Reasoning
          </span>
          <span className="text-xs text-slate-500 font-medium">Multi-Standard Disambiguation</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 font-outfit mt-1 flex items-center gap-2">
          <Layers className="w-5 h-5 text-gov-600" />
          <span>Primary vs. Alternative Standard Comparison</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Explainable AI reasoning on why candidate standards were ranked as primary vs. specialized alternatives
        </p>
      </div>

      <div className="space-y-4">
        {/* Primary Standards */}
        {primaryStandards.slice(0, 1).map((prim, idx) => (
          <div key={idx} className="p-4 rounded-md bg-gov-50/60 border border-gov-300 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase bg-gov-700 text-white px-2 py-0.5 rounded">
                  PRIMARY RECOMMENDATION
                </span>
                <span className="font-bold text-sm text-gov-950 font-mono">{prim.standardNumber}</span>
              </div>
              <ScoreIndicator score={prim.relevanceScore || 94} label="Primary Match" size="sm" />
            </div>
            <p className="text-xs font-semibold text-slate-800">{prim.title}</p>
            <p className="text-xs text-slate-600">
              <strong>Core Fit: </strong> {prim.whyRecommended}
            </p>
          </div>
        ))}

        {/* Alternative Standards */}
        {altsList.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Evaluated Alternatives & Specialized Standards:
            </h4>

            {altsList.map((alt, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md bg-slate-50 border border-slate-200 text-xs space-y-2 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      ALTERNATIVE MATCH
                    </span>
                    <span className="font-bold text-slate-900 font-mono">{alt.standardNumber}</span>
                  </div>
                  <ScoreIndicator score={alt.relevanceScore || 78} label="Alternative" size="sm" />
                </div>
                <p className="text-xs font-medium text-slate-700">{alt.title}</p>

                {/* Explicit Reason why NOT primary */}
                <div className="p-2.5 bg-amber-50/80 rounded-lg border border-amber-100 text-[11px] text-amber-950">
                  <span className="font-bold block text-amber-900">
                    Why is this not the primary recommendation?
                  </span>
                  <p className="mt-0.5">{alt.whyAlternative}</p>
                </div>

                {handler && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      disabled={openingStd === alt.standardNumber}
                      onClick={() => handleOpen(alt)}
                      className="text-[11px] font-bold text-gov-600 hover:text-gov-800 underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-60"
                      aria-label={`Inspect alternative standard ${alt.standardNumber}`}
                    >
                      {openingStd === alt.standardNumber ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Opening...</span>
                        </>
                      ) : (
                        <>
                          <span>Inspect Alternative Standard</span>
                          <ChevronRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
