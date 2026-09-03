import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ExternalLink, ShieldAlert, CheckCircle2, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { ScoreIndicator } from '../common/ScoreIndicator';
import { useAnalysis } from '../../context/AnalysisContext';

export const StandardCard = ({
  standard,
  onViewDetails,
  onClick,
  isPrimary = false,
  relationshipType
}) => {
  const navigate = useNavigate();
  const { savedStandardNumbers, toggleSaveStandard } = useAnalysis();
  const [isOpening, setIsOpening] = useState(false);

  if (!standard) return null;

  const safeStd = typeof standard === 'string' ? { standardNumber: standard, title: standard } : standard;
  const stdNumber = safeStd.standardNumber || 'IS Standard';
  const isSaved = savedStandardNumbers.has(stdNumber);

  const handleAction = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (isOpening) return;

    setIsOpening(true);

    const handler = onViewDetails || onClick;
    if (handler) {
      try {
        await handler(safeStd);
      } finally {
        setTimeout(() => setIsOpening(false), 300);
      }
    } else {
      const targetId = safeStd.standardNumber || safeStd._id || safeStd.id;
      navigate(`/standards/${encodeURIComponent(targetId)}`);
      setTimeout(() => setIsOpening(false), 300);
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 p-5 relative bg-white flex flex-col justify-between ${
        isPrimary
          ? 'border-gov-200/90 shadow-md hover:shadow-lg ring-1 ring-gov-500/10'
          : 'border-slate-200 shadow-xs hover:shadow-md'
      }`}
    >
      <div>
        {/* Top Badges & Save Button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {isPrimary && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gov-600 text-white flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-300" /> Primary Standard
              </span>
            )}
            {relationshipType && (
              <Badge variant="mandate" size="xs">
                {relationshipType}
              </Badge>
            )}
            <Badge variant="primary" size="xs">
              {safeStd.category || 'General'}
            </Badge>
            <Badge variant={safeStd.status === 'Current' ? 'success' : 'warning'} size="xs">
              {safeStd.status || 'Current'}
            </Badge>
            {safeStd.edition && (
              <span className="text-[11px] text-slate-500 font-medium">
                Edition: {safeStd.edition}
              </span>
            )}
          </div>

          {/* Bookmark / Save Action */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveStandard(safeStd);
              }}
              title={isSaved ? 'Remove from saved standards' : 'Save standard to repository'}
              aria-label={isSaved ? `Remove standard ${stdNumber}` : `Save standard ${stdNumber}`}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isSaved
                  ? 'bg-amber-50 text-amber-600 border-amber-300 font-bold'
                  : 'bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main IS Standard Number & Title */}
        <div className="mb-3">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-outfit">
              {stdNumber}
            </h4>
            <ScoreIndicator
              score={safeStd.relevanceScore || 90}
              label={safeStd.confidenceLabel || 'Relevant'}
              size="sm"
            />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1 line-clamp-2">
            {safeStd.title || stdNumber}
          </p>
        </div>

        {/* Why Recommended Explanation */}
        {safeStd.whyRecommended && (
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4 text-xs">
            <div className="flex items-center gap-1 font-bold text-slate-800 mb-1 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-gov-600" />
              <span>Why Recommended?</span>
            </div>
            <p className="text-slate-600 leading-relaxed italic">
              "{safeStd.whyRecommended}"
            </p>
          </div>
        )}

        {/* Scope snippet */}
        {safeStd.scope && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-4">
            <strong className="text-slate-700 font-medium">Scope: </strong>
            {safeStd.scope}
          </p>
        )}
      </div>

      {/* Footer Info & View Details Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="text-[11px] text-slate-400">
          Source: <span className="font-medium text-slate-600">BIS Manak</span>
        </div>
        <button
          type="button"
          disabled={isOpening}
          onClick={handleAction}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-gov-700 hover:text-gov-900 hover:bg-gov-50 transition-colors cursor-pointer disabled:opacity-60"
          aria-label={`View details for ${stdNumber}`}
        >
          {isOpening ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Opening...</span>
            </>
          ) : (
            <>
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
