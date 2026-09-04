import React from 'react';
import { Calendar, History, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const VersionAmendmentCard = ({ standards = [] }) => {
  if (!standards || standards.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-2xs my-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-gov-600" />
            <span>Standard Editions, Active Amendments & Revision Tracking</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical evolution and latest notified amendments to prevent outdated standard references in tenders
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {standards.map((rawStd, idx) => {
          const std = typeof rawStd === 'string' ? { standardNumber: rawStd, status: 'Current' } : (rawStd || {});
          return (
          <div key={idx} className="p-4 rounded-md bg-slate-50 border border-slate-200/90">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-gov-950 font-mono">{std.standardNumber || 'IS Standard'}</span>
                <Badge variant={std.status === 'Current' ? 'success' : 'warning'} size="xs">
                  {std.status || 'Current'}
                </Badge>
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-3">
                {std.publicationYear && (
                  <span>
                    <strong>Publication Year:</strong> {std.publicationYear}
                  </span>
                )}
                {std.edition && (
                  <span>
                    <strong>Edition:</strong> {std.edition}
                  </span>
                )}
              </div>
            </div>

            {/* Supersedes notice */}
            {std.supersedes && std.supersedes !== 'None' && (
              <div className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/60 mb-2 inline-flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  <strong>Supersedes:</strong> {std.supersedes} (Ensure old tenders are updated)
                </span>
              </div>
            )}

            {/* Amendments List */}
            {Array.isArray(std.amendments) && std.amendments.length > 0 ? (
              <div className="mt-2 text-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Notified Amendments:
                </p>
                <div className="space-y-1.5">
                  {std.amendments.map((am, aIdx) => (
                    <div key={aIdx} className="bg-white p-2 rounded-lg border border-slate-200 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-gov-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">{am.amendmentNumber}</span>
                        {am.date && <span className="text-slate-400 text-[10px] ml-1.5">({am.date})</span>}
                        <p className="text-slate-600 text-[11px] mt-0.5">{am.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1 italic">
                No active separate amendments notified; incorporated in primary edition baseline.
              </p>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
};
