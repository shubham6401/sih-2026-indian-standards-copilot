import React, { useState } from 'react';
import { HelpCircle, AlertCircle, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const ClarificationDialog = ({ ambiguityDetails, onContinue, onCancel }) => {
  if (!ambiguityDetails) return null;

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelectOption = (questionId, value) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleConfirm = () => {
    const combinedAdditions = Object.values(selectedAnswers).join('. ');
    onContinue(combinedAdditions);
  };

  const isAllAnswered = ambiguityDetails.clarificationQuestions?.every(q => selectedAnswers[q.id]);

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-xl p-6 sm:p-8 my-6 animate-fade-in">
      <div className="flex items-start gap-3.5 pb-4 border-b border-amber-100">
        <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
          <HelpCircle className="w-6 h-6 text-amber-700" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
              Intelligent Clarification Active
            </span>
            <span className="text-xs text-slate-500 font-medium">Zero Hallucination Guarantee</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-outfit mt-1">
            {ambiguityDetails.title || 'Technical Parameters Insufficient'}
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {ambiguityDetails.reason}
          </p>
        </div>
      </div>

      {/* Clarification Questions */}
      <div className="py-5 space-y-5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Please clarify the following to map the authoritative Indian Standard:
        </p>

        {ambiguityDetails.clarificationQuestions?.map((q, qIdx) => (
          <div key={q.id || qIdx} className="space-y-2">
            <label className="block text-xs font-bold text-slate-900">
              {qIdx + 1}. {q.question}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {q.options?.map((opt, optIdx) => {
                const isSelected = selectedAnswers[q.id] === opt.value;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(q.id, opt.value)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-gov-600 bg-gov-50/80 text-gov-900 font-bold ring-2 ring-gov-400'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80 text-slate-700 font-medium'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.targetIS && (
                      <span className="text-[10px] text-gov-600 font-semibold mt-1">
                        Maps to: {opt.targetIS}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>The Copilot prevents incorrect standards mapping by verifying technical scopes</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onCancel && (
            <Button size="sm" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            size="md"
            variant="primary"
            disabled={!isAllAnswered}
            icon={Sparkles}
            onClick={handleConfirm}
          >
            Refine & Run Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};
