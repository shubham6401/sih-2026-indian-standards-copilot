import React from 'react';
import { SearchX, FileQuestion } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = FileQuestion,
  title = 'No records found',
  description = 'There are no items matching your criteria or query.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="text-center py-12 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-300 max-w-lg mx-auto my-6">
      <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-base font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
