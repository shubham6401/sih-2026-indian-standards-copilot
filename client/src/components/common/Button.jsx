import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary: 'bg-gov-700 hover:bg-gov-800 active:bg-gov-900 text-white font-semibold shadow-xs focus:ring-gov-600',
    secondary: 'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs focus:ring-slate-400 font-semibold',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs focus:ring-slate-700',
    success: 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs focus:ring-emerald-600',
    outline: 'bg-transparent border border-gov-700 text-gov-700 hover:bg-gov-50 focus:ring-gov-600 font-semibold',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-300',
    danger: 'bg-rose-700 hover:bg-rose-800 text-white shadow-xs focus:ring-rose-600'
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1 gap-1',
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
};

