import React from 'react';
import { ArrowRight, ArrowDown, Shield, CheckCircle2, Wrench, FileCode, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';

export const StandardRelationshipGraph = ({
  primaryStandard,
  primaryStandards,
  relatedStandards = [],
  onSelectStandard
}) => {
  const primary = Array.isArray(primaryStandards) && primaryStandards.length > 0
    ? primaryStandards[0]
    : (primaryStandard || (primaryStandards && typeof primaryStandards === 'object' ? primaryStandards : null));

  if (!primary) return null;

  const testing = relatedStandards.filter(s => s.relationshipType?.toLowerCase().includes('test'));
  const safety = relatedStandards.filter(s => s.relationshipType?.toLowerCase().includes('safety'));
  const otherAllied = relatedStandards.filter(
    s => !s.relationshipType?.toLowerCase().includes('test') && !s.relationshipType?.toLowerCase().includes('safety')
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-gov-600" />
            <span>Standards Relationship Hierarchy & Normative Flow</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Inter-dependent standards required to construct a comprehensive tender compliance specification
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 justify-center">
        {/* Node 1: Primary Standard */}
        <div className="w-full lg:w-72 bg-white border-2 border-gov-600 rounded-2xl p-4 shadow-md text-center relative shrink-0">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gov-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
            Primary Specification
          </div>
          <p className="text-sm font-black text-gov-800 mt-1 font-outfit truncate">
            {primary.standardNumber}
          </p>
          <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-2">
            {primary.title}
          </p>
          <div className="mt-3 flex justify-center">
            <Badge variant="primary" size="xs">
              {primary.relevanceScore || 94}% Relevance
            </Badge>
          </div>
          {onSelectStandard && (
            <button
              type="button"
              onClick={() => onSelectStandard(primary)}
              className="mt-3 text-[11px] font-bold text-gov-600 hover:text-gov-800 underline cursor-pointer"
            >
              View Scope Details
            </button>
          )}
        </div>

        {/* Arrow connector */}
        <div className="hidden lg:flex items-center text-gov-400">
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </div>
        <div className="lg:hidden text-gov-400">
          <ArrowDown className="w-6 h-6 stroke-[3]" />
        </div>

        {/* Group of Child Branches */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Branch 1: Testing & Verification */}
          <div className="bg-white border border-emerald-200 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Testing & Verification Standards</span>
            </div>
            {testing.length > 0 ? (
              <div className="space-y-2">
                {testing.slice(0, 2).map((std, i) => (
                  <div
                    key={i}
                    onClick={() => onSelectStandard && onSelectStandard(std)}
                    className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100/60 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">{std.standardNumber}</span>
                      <span className="text-[10px] font-semibold text-emerald-700">
                        {std.relevanceScore || 85}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">{std.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">Reference testing standard included in primary standard clauses.</p>
            )}
          </div>

          {/* Branch 2: Safety & Environmental Norms */}
          <div className="bg-white border border-amber-200 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>Safety & Protection Norms</span>
            </div>
            {safety.length > 0 ? (
              <div className="space-y-2">
                {safety.slice(0, 2).map((std, i) => (
                  <div
                    key={i}
                    onClick={() => onSelectStandard && onSelectStandard(std)}
                    className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 hover:bg-amber-100/60 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">{std.standardNumber}</span>
                      <span className="text-[10px] font-semibold text-amber-700">
                        {std.relevanceScore || 88}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">{std.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">Insulation and environmental safety defined in baseline spec.</p>
            )}
          </div>

          {/* Branch 3: Normative References & Materials */}
          {otherAllied.length > 0 && (
            <div className="sm:col-span-2 bg-white border border-indigo-200 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-2">
                <FileCode className="w-4 h-4 text-indigo-600" />
                <span>Normative & Sub-Assembly References</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {otherAllied.slice(0, 2).map((std, i) => (
                  <div
                    key={i}
                    onClick={() => onSelectStandard && onSelectStandard(std)}
                    className="p-2 rounded-lg bg-indigo-50/60 border border-indigo-100 hover:bg-indigo-100/60 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">{std.standardNumber}</span>
                      <span className="text-[10px] font-semibold text-indigo-700">
                        {std.relevanceScore || 82}%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">{std.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
