import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-gov-50 text-gov-800 border-gov-200 font-semibold',
    secondary: 'bg-slate-100 text-slate-600 border-slate-200',
    neutral: 'bg-slate-50 text-slate-600 border-slate-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    danger: 'bg-rose-50 text-rose-800 border-rose-200 font-semibold',
    info: 'bg-sky-50 text-sky-800 border-sky-200 font-semibold',
    gold: 'bg-amber-100/70 text-amber-900 border-amber-300 font-semibold',
    mandate: 'bg-indigo-50 text-indigo-800 border-indigo-200 font-bold',
    qco: 'bg-indigo-900 text-indigo-100 border-indigo-800 font-bold',
    current: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
    superseded: 'bg-rose-50 text-rose-800 border-rose-300 font-bold',
    revision: 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px] tracking-wide',
    sm: 'px-2 py-0.5 text-[11px] tracking-wide',
    md: 'px-2.5 py-1 text-xs tracking-wide'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded border uppercase font-sans ${variants[variant] || variants.default} ${sizes[size] || sizes.sm} ${className}`}>
      {children}
    </span>
  );
};

