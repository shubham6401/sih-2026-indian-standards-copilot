import React from 'react';
import { Columns, CheckCircle2, ArrowRight, Sparkles, PlusCircle, RefreshCw, FileText } from 'lucide-react';
import { Badge } from '../common/Badge';

export const BeforeAfterComparisonView = ({
  rawInput = '',
  improvedSpecification = '',
  outdated = [],
  gaps = []
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gov-100 text-gov-800 px-2 py-0.5 rounded border border-gov-200">
              Procurement Transformation View
            </span>
            <span className="text-xs text-slate-500 font-medium">Before vs. After Specification Analysis</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 font-outfit mt-1 flex items-center gap-2">
            <Columns className="w-5 h-5 text-gov-600" />
            <span>Tender Specification Upgrade Comparison</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side comparison showing how missing testing clauses, outdated references, and certification mandates were resolved
          </p>
        </div>
      </div>

      {/* Changes Highlight Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center gap-2.5">
          <PlusCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Added Standards: </strong> Core & testing norms linked
          </span>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-gov-900 flex items-center gap-2.5">
          <RefreshCw className="w-4 h-4 text-gov-600 shrink-0" />
          <span>
            <strong>Version Updated: </strong> {outdated.length > 0 ? `${outdated.length} citations modernized` : 'Latest editions verified'}
          </span>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Gaps Resolved: </strong> {gaps.length} technical clauses added
          </span>
        </div>
      </div>

      {/* Split Comparison Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Original Tender */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Original Tender Input</span>
              </span>
              <Badge variant="default" size="xs">
                As Entered by Indenter
              </Badge>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap min-h-[220px]">
              {rawInput || 'No raw specification text.'}
            </div>

            {/* Identified Flaws Summary */}
            <div className="mt-4 p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-1">
              <span className="font-bold block text-[11px] uppercase tracking-wider text-rose-800">
                Identified Weaknesses in Original:
              </span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                <li>Lacked explicit laboratory testing standard citations</li>
                <li>Missing mandatory BIS License / CRS qualifying clause</li>
                <li>Vulnerable to contractor disputes over ambiguous ratings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: AI-Improved Specification */}
        <div className="bg-gradient-to-br from-gov-50/70 to-blue-50/40 rounded-2xl border-2 border-gov-500/80 p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gov-200 mb-3">
              <span className="text-xs font-bold text-gov-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI-Improved Specification Schedule</span>
              </span>
              <Badge variant="success" size="xs">
                Tender Ready & GFR Aligned
              </Badge>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gov-200 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-wrap min-h-[220px] max-h-[380px] overflow-y-auto">
              {improvedSpecification || 'Specification schedule generated.'}
            </div>

            {/* Improvements Added */}
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold block text-[11px] uppercase tracking-wider text-emerald-800">
                Upgrades Incorporated:
              </span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                <li>Complete standard citation with latest active edition & amendments</li>
                <li>Mandatory type test certificates & routine batch testing requirements</li>
                <li>Enforceable BIS / CRS compliance clause protecting against invalid bids</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
