import React from 'react';
import { AlertTriangle, AlertCircle, ShieldAlert, CheckCircle2, ArrowRight, Wrench, ShieldCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TenderGapAnalysisCard = ({ gaps, outdated }) => {
  const safeGaps = Array.isArray(gaps) ? gaps : [];
  const safeOutdated = Array.isArray(outdated) ? outdated : [];
  const allIssuesCount = safeGaps.length + safeOutdated.length;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-2xs my-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
              Tender Gap Analysis
            </span>
            <span className="text-xs text-slate-500 font-medium">Pre-Tender Vulnerability Inspection</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 font-outfit mt-1 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Identified Specification Gaps & Outdated Citations</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated detection of missing testing methods, absent statutory certification clauses, and obsolete standard references
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
            {allIssuesCount} Items Require Review
          </span>
        </div>
      </div>

      {/* Outdated Standards Alert Box */}
      {safeOutdated.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Critical: Outdated / Superseded Standard Citations</span>
          </h4>

          {safeOutdated.map((item, idx) => (
            <div key={idx} className="p-4 rounded-md bg-rose-50/70 border border-rose-200 text-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="line-through text-slate-500 font-bold font-mono">{item.oldNumber} ({item.citedYear})</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                  <span className="text-emerald-800 font-bold font-mono bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    {item.currentNumber} ({item.currentYear})
                  </span>
                </div>
                <Badge variant="danger" size="xs">
                  {item.severity} SEVERITY
                </Badge>
              </div>
              <p className="text-slate-700 leading-relaxed">{item.reason}</p>
              <div className="p-2.5 bg-white rounded-md border border-rose-200 font-medium text-slate-800 flex items-start gap-2">
                <Wrench className="w-3.5 h-3.5 text-gov-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Recommended Tender Action:</strong> {item.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tender Specification Gaps List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Missing Technical Clauses & Compliance Items</span>
        </h4>

        {safeGaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {safeGaps.map((gap, idx) => (
              <div key={idx} className="p-3.5 rounded-md bg-slate-50 border border-slate-200 text-xs space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-bold text-slate-900">{gap.title}</span>
                    <Badge variant={gap.severity === 'HIGH' ? 'danger' : gap.severity === 'MEDIUM' ? 'warning' : 'info'} size="xs">
                      {gap.severity}
                    </Badge>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {gap.description}
                  </p>
                </div>

                <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-950 text-[11px] mt-2">
                  <strong>Fix:</strong> {gap.remedy}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All essential testing, certification, and environmental clauses were identified in the tender.</span>
          </div>
        )}
      </div>
    </div>
  );
};
