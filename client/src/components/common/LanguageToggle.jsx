import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageToggle = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold ${className}`}>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
          lang === 'en' ? 'bg-white text-gov-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLang('hi')}
        className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
          lang === 'hi' ? 'bg-gov-600 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};
