import React from 'react';
import { Shield, ExternalLink, Award, FileCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-2 font-outfit">
              <Shield className="w-5 h-5 text-amber-400" />
              <span>BIS Standards AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Intelligent recommendation engine aligning public procurement specifications with Bureau of Indian Standards (BIS) and statutory Quality Control Orders.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Official Indian Standards Portals
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.bis.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  Bureau of Indian Standards (BIS) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  e-BIS (Manakonline Portal) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://gem.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  Government e-Marketplace (GeM) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://dpiit.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  DPIIT Quality Control Orders <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Procurement Sectors
            </h5>
            <ul className="space-y-2 text-xs">
              <li>Electrical & LED Lighting</li>
              <li>Civil Engineering & Cement</li>
              <li>TMT Steel & Structural Steel</li>
              <li>Personal Protective Equipment (PPE)</li>
              <li>Solar Photovoltaics & Energy</li>
              <li>Pressurized Water Pipelines</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Responsible AI Statement
            </h5>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 text-[11px] leading-relaxed text-slate-300">
              <p>
                Decision-support software. Standard applicability, active revisions, and mandatory certification status must be independently validated prior to tender publication.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} AI-Powered Indian Standards Recommendation Engine. For Government & Enterprise Procurement.</p>
          <div className="flex items-center gap-4">
            <span>Built for Public Procurement Officers</span>
            <span>•</span>
            <span className="text-amber-400">Make in India Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
