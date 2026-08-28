import React from 'react';
import { TrendingUp, Clock, ShieldCheck, CheckCircle2, Award, Zap, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const ImpactDashboard = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gov-100 text-gov-800 px-2 py-0.5 rounded border border-gov-200">
              Procurement Copilot Impact
            </span>
            <span className="text-xs text-slate-500 font-medium">SIH 2026 Evaluation Metrics</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 font-outfit mt-1 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gov-600" />
            <span>Operational Impact & Productivity Multiplier</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrating time reduction, gap elimination, and statutory compliance acceleration across public procurement indents
          </p>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg self-start sm:self-auto">
          Demo Benchmark Metrics
        </span>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gov-50/80 border border-gov-200 space-y-1">
          <div className="flex items-center justify-between text-xs text-gov-700 font-bold">
            <span>Manual Research</span>
            <Clock className="w-4 h-4 text-gov-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-outfit">~45 Mins</p>
          <p className="text-[11px] text-slate-500">Per specification drafting</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold">
            <span>AI Copilot Workflow</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-800 font-outfit">~5 Mins</p>
          <p className="text-[11px] text-emerald-700 font-semibold">89% Time Reduction</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
          <div className="flex items-center justify-between text-xs text-amber-800 font-bold">
            <span>Tender Gap Prevention</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-outfit">100%</p>
          <p className="text-[11px] text-slate-500">Missing test/QCO clauses flagged</p>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-1">
          <div className="flex items-center justify-between text-xs text-indigo-700 font-bold">
            <span>Superseded Citations</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-outfit">0% Risk</p>
          <p className="text-[11px] text-slate-500">Auto-detected revision warnings</p>
        </div>
      </div>

      {/* Value Proposition Breakdown */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
        <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
          Why This Outperforms Traditional Keyword Search:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Bilingual Natural Language: </strong> Officers can enter raw requirements in Hindi or Hinglish without memorizing BIS nomenclature.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Normative Cross-Referencing: </strong> Automatically maps companion testing and safety standards required for enforceable contracts.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Statutory QCO Checking: </strong> Prevents procurement teams from issuing tenders with invalid non-certified products.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Specification Generation: </strong> Automatically drafts the final 8-section technical schedule for the tender document.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
