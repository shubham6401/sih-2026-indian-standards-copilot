import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    primary: 'bg-gov-50 text-gov-700 border-gov-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
    gold: 'bg-amber-100 text-amber-900 border-amber-300',
    mandate: 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold'
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border font-medium ${variants[variant] || variants.default} ${sizes[size] || sizes.sm} ${className}`}>
      {children}
    </span>
  );
};
