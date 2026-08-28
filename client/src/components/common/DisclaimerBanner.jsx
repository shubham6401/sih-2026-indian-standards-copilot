import React from 'react';
import { AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DisclaimerBanner = ({ compact = false }) => {
  const { lang, t } = useLanguage();

  if (compact) {
    return (
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-lg p-2.5 px-3 flex items-center justify-between text-xs text-amber-900 shadow-sm">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>{lang === 'hi' ? 'निर्णय-सहायता प्रणाली:' : 'Decision-Support System:'}</strong>{' '}
            {t('responsibleAiNotice')}
          </span>
        </div>
        <a
          href="https://www.bis.gov.in"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-amber-800 hover:text-amber-950 underline ml-2 shrink-0"
        >
          BIS Portal <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-amber-50/70 to-blue-50 border-l-4 border-amber-500 rounded-r-lg p-4 shadow-sm my-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100/80 rounded-full text-amber-700 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              {lang === 'hi' ? 'महत्वपूर्ण उत्तरदायी एआई घोषणा' : 'Important Responsible AI & Statutory Notice'}
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                Non-Binding Decision Support
              </span>
            </h4>
            <a
              href="https://manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-gov-600 hover:text-gov-700 inline-flex items-center gap-1"
            >
              Verify on Manakonline BIS <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-slate-700 mt-1 leading-relaxed">
            {lang === 'hi'
              ? 'यह प्रणाली खरीद अधिकारियों की सहायता के लिए कृत्रिम बुद्धिमत्ता (AI) और प्रकाशित बीआईएस मानकों के आधार पर अनुशंसाएं तैयार करती है। निविदा में समावेशन से पहले आधिकारिक बीआईएस पोर्टल और संबंधित मंत्रालयों के गुणवत्ता नियंत्रण आदेशों (QCOs) से नवीनतम संस्करण और संशोधनों की पुष्टि अनिवार्य है।'
              : 'This platform analyzes technical specifications and matches them against the Bureau of Indian Standards (BIS) knowledge base. AI recommendations do not constitute official statutory certification or legal advice. Procurement officers must independently verify the active edition, latest amendments, and manufacturer BIS licensing status on official portals prior to tender finalization.'}
          </p>
        </div>
      </div>
    </div>
  );
};
