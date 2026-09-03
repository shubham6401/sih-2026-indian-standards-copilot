import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ExternalLink, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DisclaimerBanner = ({ compact = false }) => {
  const { lang, t } = useLanguage();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('is_disclaimer_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('is_disclaimer_dismissed', 'true');
    } catch {
      // Ignore
    }
  };

  if (dismissed) return null;

  if (compact) {
    return (
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl py-2 px-3 sm:px-4 flex items-center justify-between text-xs text-amber-950 shadow-2xs mb-4">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div className="text-[11px] sm:text-xs leading-snug">
            <span className="font-extrabold uppercase tracking-wider text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded mr-1.5 shrink-0 inline-block">
              {lang === 'hi' ? 'निर्णय-सहायता' : 'Decision Support'}
            </span>
            <span className="text-amber-900 font-medium">
              {t('responsibleAiNotice')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://www.bis.gov.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-gov-700 hover:text-gov-900 hover:underline text-[11px] shrink-0"
          >
            BIS Portal <ExternalLink className="w-3 h-3" />
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss disclaimer"
            title="Dismiss disclaimer"
            className="p-1 text-amber-700 hover:text-amber-950 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-amber-50/70 to-blue-50 border-l-4 border-amber-500 rounded-2xl p-4 shadow-2xs my-4 relative">
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss disclaimer"
        title="Dismiss disclaimer"
        className="absolute right-3 top-3 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className="p-2 bg-amber-100/80 rounded-xl text-amber-700 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              {lang === 'hi' ? 'महत्वपूर्ण उत्तरदायी एआई घोषणा' : 'Responsible AI & Statutory Guidance'}
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                Non-Binding
              </span>
            </h4>
            <a
              href="https://manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-gov-700 hover:text-gov-900 inline-flex items-center gap-1"
            >
              Verify on Manakonline BIS <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {lang === 'hi'
              ? 'यह प्रणाली खरीद अधिकारियों की सहायता के लिए कृत्रिम बुद्धिमत्ता (AI) और प्रकाशित बीआईएस मानकों के आधार पर अनुशंसाएं तैयार करती है। निविदा में समावेशन से पहले आधिकारिक बीआईएस पोर्टल और संबंधित मंत्रालयों के गुणवत्ता नियंत्रण आदेशों (QCOs) से नवीनतम संस्करण और संशोधनों की पुष्टि अनिवार्य है।'
              : 'This platform analyzes technical specifications and matches them against the Bureau of Indian Standards (BIS) knowledge base. AI recommendations do not constitute statutory certification or legal advice. Procurement officers must independently verify the active edition, latest amendments, and manufacturer BIS licensing status on official portals prior to tender finalization.'}
          </p>
        </div>
      </div>
    </div>
  );
};
