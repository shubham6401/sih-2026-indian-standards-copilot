import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  Award,
  Layers,
  FileText
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useAnalysis } from '../../context/AnalysisContext';
import { useLanguage } from '../../context/LanguageContext';

export const StandardDetailModal = ({ standard, isOpen, onClose }) => {
  const { savedStandardNumbers, toggleSaveStandard } = useAnalysis();
  const { t, lang } = useLanguage();

  if (!standard) return null;

  const stdNumber = standard.standardNumber || 'IS Standard';
  const isSaved = savedStandardNumbers.has(stdNumber);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${t('standardSpecsModalTitle', 'Standard Specifications')}: ${stdNumber}`}
      size="xl"
    >
      <div className="space-y-4">
        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-3 border-amber-600 p-2.5 rounded-r text-xs text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
          <span className="leading-snug">
            {t('officialVerificationNotice', 'Official Verification Notice: Always verify the current official edition, latest published amendments, and statutory applicability on the BIS portal (manakonline.in) before citing this standard in binding tender contracts.')}
          </span>
        </div>

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <Badge variant="primary">{standard.category || 'Standards'}</Badge>
              <Badge variant={standard.status === 'Current' ? 'current' : 'warning'}>
                {standard.status || 'Current'}
              </Badge>
              <span className="text-xs text-slate-500 font-mono">
                {t('yearLabel', 'Published')}: {standard.publicationYear || 'N/A'} • {lang === 'hi' ? 'संस्करण:' : 'Edition:'} {standard.edition || (lang === 'hi' ? 'वर्तमान' : 'Current')}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-mono text-gov-950">
              {standard.standardNumber}
            </h3>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              {standard.title}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="xs"
              variant={isSaved ? 'secondary' : 'primary'}
              onClick={() => toggleSaveStandard(standard)}
              icon={isSaved ? BookmarkCheck : Bookmark}
            >
              {isSaved ? t('savedInRepo', 'Saved in Repo') : t('saveStandard', 'Save Standard')}
            </Button>
            <a
              href="https://www.bis.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {t('bisPortal', 'BIS Portal')} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Scope */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-gov-700" />
            <span>{t('scopeOfStandard', 'Scope of Standard')}</span>
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-200">
            {standard.scope || (lang === 'hi' ? 'विस्तृत कार्यक्षेत्र आधिकारिक भारतीय मानक ब्यूरो पोर्टल पर उपलब्ध है।' : 'Detailed scope available on the official Bureau of Indian Standards portal.')}
          </p>
        </div>

        {/* Key Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('industrySector', 'Industry Sector')}</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{standard.industry || 'General Engineering'}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('supersedes', 'Supersedes')}</span>
            <span className="font-semibold text-slate-900 font-mono mt-0.5 block">{standard.supersedes || (lang === 'hi' ? 'कोई नहीं' : 'None')}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">{t('lastVerifiedDate', 'Last Verified Date')}</span>
            <span className="font-semibold text-slate-900 font-mono mt-0.5 block">{standard.lastVerified || '2026-06-15'}</span>
          </div>
        </div>

        {/* Certification Mandate */}
        {standard.certification && (
          <div className="p-3 rounded-md bg-gov-50/70 border border-gov-200 text-xs">
            <h4 className="font-bold text-gov-900 mb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('conformityScheme', 'Conformity & Certification Scheme')}</span>
            </h4>
            <p className="text-slate-800">
              <strong>{lang === 'hi' ? 'योजना:' : 'Scheme:'}</strong> {standard.certification.scheme}
            </p>
            <p className="text-slate-800 mt-0.5">
              <strong>{lang === 'hi' ? 'अधिसूचना प्राधिकरण:' : 'Notifying Authority:'}</strong> {standard.certification.notifyingMinistry || 'BIS'}
            </p>
            <p className="text-slate-800 mt-0.5">
              <strong>{lang === 'hi' ? 'वैधानिक आदेश:' : 'Statutory Order:'}</strong> {standard.certification.orderName || 'Quality Control Order'}
            </p>
          </div>
        )}

        {/* Testing & Normative References */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Normative References */}
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <h5 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-gov-700" />
              <span>{t('normativeReferences', 'Normative References')}</span>
            </h5>
            {standard.normativeReferences && standard.normativeReferences.length > 0 ? (
              <ul className="space-y-1 font-mono text-[11px]">
                {standard.normativeReferences.map((ref, i) => (
                  <li key={i} className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gov-600 shrink-0" />
                    <span>{typeof ref === 'object' ? ref.standardNumber || JSON.stringify(ref) : ref}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-[11px]">{lang === 'hi' ? 'कोई प्रासंगिक मानक सूचीबद्ध नहीं' : 'No cross-references listed'}</p>
            )}
          </div>

          {/* Key Clauses & Parameters */}
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <h5 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1.5 flex items-center gap-1">
              <FileText className="w-3 h-3 text-gov-700" />
              <span>{lang === 'hi' ? 'मुख्य तकनीकी खंड' : 'Key Technical Clauses'}</span>
            </h5>
            {standard.clauses && standard.clauses.length > 0 ? (
              <ul className="space-y-1 text-[11px]">
                {standard.clauses.map((cl, i) => (
                  <li key={i} className="text-slate-700 flex items-start gap-1.5">
                    <span className="font-bold font-mono text-gov-800 shrink-0">{cl.clauseNumber || `§${i + 1}`}</span>
                    <span className="text-slate-600">{cl.title || cl.description || JSON.stringify(cl)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-[11px]">{lang === 'hi' ? 'पूर्ण खंड पाठ बीआईएस पोर्टल पर उपलब्ध है' : 'Full clause text indexed in BIS corpus'}</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
