import React, { useState } from 'react';
import { Tag, Edit2, Check, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const ExtractedRequirementsCard = ({
  structuredRequirements = [],
  detectedLanguage = 'English',
  onUpdateRequirements
}) => {
  const [items, setItems] = useState(structuredRequirements);
  const [isEditing, setIsEditing] = useState(false);

  const handleValueChange = (idx, newValue) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], value: newValue };
    setItems(updated);
    if (onUpdateRequirements) onUpdateRequirements(updated);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gov-100 text-gov-800 px-2 py-0.5 rounded border border-gov-200">
              Tender Intelligence
            </span>
            <span className="text-xs text-slate-500 font-medium">NLP Requirement Normalization</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 font-outfit mt-1 flex items-center gap-2">
            <Tag className="w-5 h-5 text-gov-600" />
            <span>Extracted Structured Procurement Requirements</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Parsed from natural language input ({detectedLanguage}). Review or fine-tune extracted attributes below.
          </p>
        </div>

        <Button
          size="xs"
          variant="secondary"
          icon={isEditing ? Check : Edit2}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Confirm Edits' : 'Edit Requirements'}
        </Button>
      </div>

      {/* Structured Parameters Table / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {items.map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-700">{item.label}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                {item.category || 'Spec'}
              </span>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={item.value}
                onChange={(e) => handleValueChange(idx, e.target.value)}
                className="w-full px-2.5 py-1 text-xs rounded border border-gov-400 bg-white focus:ring-1 focus:ring-gov-500"
              />
            ) : (
              <p className="text-slate-900 font-semibold leading-snug">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
