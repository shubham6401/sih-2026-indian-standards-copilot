import React, { useState, useEffect } from 'react';
import { FileText, Copy, Check, Edit3, Download, Sparkles, Printer } from 'lucide-react';
import { Button } from '../common/Button';
import { useAnalysis } from '../../context/AnalysisContext';
import { formatSpecificationText } from '../../utils/formatSpecification';

export const GeneratedSpecificationCard = ({ specification = '', productName = 'Procurement Item' }) => {
  const { showToast } = useAnalysis();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(() => formatSpecificationText(specification));

  useEffect(() => {
    setContent(formatSpecificationText(specification));
  }, [specification]);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(content || ''));
    setCopied(true);
    showToast('Specification text copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gov-100 text-gov-800 px-2 py-0.5 rounded border border-gov-200">
              Tender Drafting Copilot
            </span>
            <span className="text-xs text-slate-500 font-medium">Ready for Tender Notice / GeM Indent</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 font-outfit mt-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>AI-Generated Procurement Specification Schedule</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured 8-section technical requirement schedule with incorporated Indian Standards, testing scopes, and compliance clauses
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            size="xs"
            variant="secondary"
            icon={isEditing ? Check : Edit3}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Done Editing' : 'Edit Specification'}
          </Button>
          <Button
            size="xs"
            variant="primary"
            icon={copied ? Check : Copy}
            onClick={handleCopy}
          >
            {copied ? 'Copied' : 'Copy Text'}
          </Button>
        </div>
      </div>

      {/* Editor / Viewer Container */}
      <div className="relative">
        {isEditing ? (
          <textarea
            rows={16}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-xl border border-gov-400 font-mono text-xs text-slate-900 leading-relaxed bg-slate-50/50 focus:ring-2 focus:ring-gov-500 focus:outline-none"
          />
        ) : (
          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px] overflow-y-auto selection:bg-amber-400 selection:text-slate-950">
            {content}
          </pre>
        )}
      </div>

      <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
        <span>
          <strong>Draft Advisory: </strong> Indenting officers should review all quantitative values before issuing the NIT.
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-bold text-gov-700 hover:text-gov-900 underline shrink-0 ml-2"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};
