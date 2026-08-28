import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Tag } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AIExplanationCard = ({ explanation, extractedRequirements = [] }) => {
  if (!explanation) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-gov-50 text-gov-700">
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 font-outfit">
            AI Explainability & Requirement Mapping Rationale
          </h4>
          <p className="text-xs text-slate-500">
            Intelligent synthesis of how input specifications map to technical standard parameters
          </p>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-5 text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-900 mb-1">Recommendation Basis:</p>
        <p>{explanation.summary}</p>
      </div>

      {/* Matched Requirements Chips */}
      <div className="mb-5">
        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-gov-600" />
          <span>Extracted Technical Requirements & Matched Clauses</span>
        </h5>
        <div className="flex flex-wrap gap-2">
          {extractedRequirements.map((req, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gov-50/80 border border-gov-200 text-xs text-gov-900"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-gov-600 shrink-0" />
              <span className="font-semibold">{req.tag || req}</span>
              {req.importance && (
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                  {req.importance}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory considerations */}
      {explanation.regulatoryConsiderations && (
        <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-700 leading-relaxed mb-3">
          <span className="font-bold text-gov-900 block mb-0.5">Procurement Policy & Statutory Context:</span>
          {explanation.regulatoryConsiderations}
        </div>
      )}

      {/* Non-binding Caution Note */}
      <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
        <span>{explanation.riskCautionNote}</span>
      </div>
    </div>
  );
};
