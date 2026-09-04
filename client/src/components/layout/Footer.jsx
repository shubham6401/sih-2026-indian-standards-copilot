import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Institutional Identity */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-2">
              <div className="w-6 h-6 rounded bg-gov-700 flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="uppercase tracking-wider font-extrabold">ANVESHAK</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t('heroSubtitle', 'National procurement compliance platform aligning tender specifications with Bureau of Indian Standards (BIS) norms and statutory Quality Control Orders.')}
            </p>
          </div>

          {/* Col 2: Official Portals */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {t('Official Indian Standards Portals')}
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://www.bis.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  {t('Bureau of Indian Standards (BIS)')} <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.services.bis.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  {t('e-BIS (Official BIS Portal)')} <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://gem.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  {t('Government e-Marketplace (GeM)')} <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://dpiit.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  {t('DPIIT Quality Control Orders')} <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Benchmark Sectors */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {t('Procurement Sectors')}
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>{t('Electrical & LED Lighting')}</li>
              <li>{t('Civil Engineering & Cement')}</li>
              <li>{t('TMT Steel & Structural Steel')}</li>
              <li>{t('Personal Protective Equipment (PPE)')}</li>
              <li>{t('Solar Photovoltaics & Energy')}</li>
              <li>{t('Pressurized Water Pipelines')}</li>
            </ul>
          </div>

          {/* Col 4: Institutional Disclaimer */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {t('Institutional Verification')}
            </h5>
            <div className="bg-slate-800/90 p-3 rounded border border-slate-700/80 text-[11px] leading-relaxed text-slate-300">
              <p>
                {t('responsibleAiNotice', 'Decision-support software. Standard applicability, active revisions, and mandatory certification status must be independently validated prior to tender publication.')}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} ANVESHAK • Indian Standards & Procurement Compliance Platform. {t('For Government & Enterprise Procurement.')}</p>
          <div className="flex items-center gap-3">
            <span>{t('Built for Public Procurement Officers')}</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">{t('Make in India Compliant')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
