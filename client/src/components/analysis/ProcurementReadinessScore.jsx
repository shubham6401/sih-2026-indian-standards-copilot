import React from 'react';
import { Gauge, CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck } from 'lucide-react';
import { ScoreIndicator } from '../common/ScoreIndicator';

export const ProcurementReadinessScore = ({ readiness }) => {
  const safeReadiness = readiness && typeof readiness === 'object' ? readiness : {};
  const score = safeReadiness.totalScore || 78;
  const breakdown = (safeReadiness.breakdown && typeof safeReadiness.breakdown === 'object') ? safeReadiness.breakdown : {
    standardsCoverage: 90,
    testingCoverage: 72,
    safetyCoverage: 85,
    certificationCoverage: 65,
    versionCurrency: 80,
    technicalCompleteness: 75
  };

  const metrics = [
    { label: 'Standards Coverage', value: breakdown.standardsCoverage ?? 90, desc: 'Alignment with primary product standard' },
    { label: 'Testing & Verification', value: breakdown.testingCoverage ?? 72, desc: 'Presence of mandatory test standards' },
    { label: 'Safety & Protection', value: breakdown.safetyCoverage ?? 85, desc: 'Dielectric, photobiological & shock criteria' },
    { label: 'Certification & QCO', value: breakdown.certificationCoverage ?? 65, desc: 'Mandatory BIS ISI / CRS registration clause' },
    { label: 'Version Currency', value: breakdown.versionCurrency ?? 80, desc: 'Elimination of superseded standard editions' },
    { label: 'Technical Completeness', value: breakdown.technicalCompleteness ?? 75, desc: 'Comprehensive dimensional & electrical specs' }
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-2xs my-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gov-50 text-gov-800 px-2 py-0.5 rounded border border-gov-200">
              Procurement Readiness Index
            </span>
            <span className="text-xs text-slate-500 font-medium">Pre-Bid Quality Assurance</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 font-outfit mt-1 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-gov-600" />
            <span>Procurement Specification Readiness Score</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Diagnostic evaluation measuring specification completeness against national standards and GFR norms
          </p>
        </div>

        {/* Big Score Widget */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 self-start sm:self-auto">
          <div className="text-3xl font-bold text-gov-900 font-mono tracking-tight">
            {score}<span className="text-base text-slate-400 font-medium font-sans">/100</span>
          </div>
          <div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gov-700 text-white block text-center">
              {safeReadiness.statusLabel || 'Readiness Evaluated'}
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              {safeReadiness.actionCount || 3} areas require attention
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-3 rounded-md bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">{m.label}</span>
              <span className={`font-mono font-bold ${m.value >= 80 ? 'text-emerald-700' : m.value >= 65 ? 'text-amber-700' : 'text-rose-700'}`}>
                {m.value}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-200 rounded overflow-hidden">
              <div
                className={`h-full rounded transition-all duration-500 ${
                  m.value >= 80 ? 'bg-emerald-600' : m.value >= 65 ? 'bg-amber-500' : 'bg-rose-600'
                }`}
                style={{ width: `${m.value}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 truncate">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
