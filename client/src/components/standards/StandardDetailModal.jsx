import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Shield,
  Bookmark,
  BookmarkCheck,
  FileCheck,
  Calendar,
  AlertTriangle,
  Award,
  Layers,
  Building,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useAnalysis } from '../../context/AnalysisContext';

export const StandardDetailModal = ({ standard, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { savedStandardNumbers, toggleSaveStandard } = useAnalysis();

  if (!standard) return null;

  const stdNumber = standard.standardNumber || 'IS Standard';
  const isSaved = savedStandardNumbers.has(stdNumber);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Standard Specifications: ${stdNumber}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg text-xs text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Official Verification Notice:</strong> Always verify the current official edition, latest published amendments, and statutory applicability on the BIS portal (manakonline.in) before citing this standard in binding tender contracts.
          </span>
        </div>

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <Badge variant="primary">{standard.category || 'Standards'}</Badge>
              <Badge variant={standard.status === 'Current' ? 'success' : 'warning'}>
                {standard.status || 'Current'}
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                Published: {standard.publicationYear || 'N/A'} • Edition: {standard.edition || 'Current'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-outfit">
              {standard.standardNumber}
            </h3>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {standard.title}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant={isSaved ? 'secondary' : 'primary'}
              onClick={() => toggleSaveStandard(standard)}
              icon={isSaved ? BookmarkCheck : Bookmark}
            >
              {isSaved ? 'Saved in Repo' : 'Save Standard'}
            </Button>
            <a
              href="https://www.bis.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              BIS Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Scope */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-gov-600" />
            <span>Scope of Standard</span>
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            {standard.scope || 'Detailed scope available on the official Bureau of Indian Standards portal.'}
          </p>
        </div>

        {/* Key Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[11px]">Industry Sector</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{standard.industry || 'General Engineering'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[11px]">Supersedes</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{standard.supersedes || 'None'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block text-[11px]">Last Verified Date</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{standard.lastVerified || '2026-06-15'}</span>
          </div>
        </div>

        {/* Certification Mandate */}
        {standard.certification && (
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
            <h4 className="font-bold text-gov-900 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Conformity & Certification Scheme</span>
            </h4>
            <p className="text-slate-700">
              <strong>Scheme:</strong> {standard.certification.scheme}
            </p>
            <p className="text-slate-700 mt-0.5">
              <strong>Notifying Authority:</strong> {standard.certification.notifyingMinistry || 'BIS'}
            </p>
            <p className="text-slate-700 mt-0.5">
              <strong>Statutory Order:</strong> {standard.certification.orderName || 'Quality Control Order'}
            </p>
          </div>
        )}

        {/* Testing & Normative References Tabs / Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Normative references */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-gov-600" />
              <span>Normative References</span>
            </h5>
            {standard.normativeReferences && standard.normativeReferences.length > 0 ? (
              <ul className="space-y-1.5">
                {standard.normativeReferences.map((ref, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3 h-3 text-gov-600 shrink-0" />
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 italic text-[11px]">Self-contained specifications.</p>
            )}
          </div>

          {/* Testing standards */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mandatory Testing Standards</span>
            </h5>
            {standard.testingStandards && standard.testingStandards.length > 0 ? (
              <ul className="space-y-1.5">
                {standard.testingStandards.map((tStd, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{tStd}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 italic text-[11px]">Standard laboratory testing clauses.</p>
            )}
          </div>
        </div>

        {/* Amendments */}
        {standard.amendments && standard.amendments.length > 0 && (
          <div className="text-xs">
            <h5 className="font-bold text-slate-800 mb-2">Notified Amendments & History</h5>
            <div className="space-y-2">
              {standard.amendments.map((am, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex justify-between font-bold text-slate-900 text-xs">
                    <span>{am.amendmentNumber}</span>
                    <span className="text-slate-500 font-normal">{am.date}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-1">{am.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            className="text-gov-700 font-bold"
            icon={ExternalLink}
            onClick={() => {
              onClose();
              navigate(`/standards/${encodeURIComponent(stdNumber)}`);
            }}
          >
            Open Dedicated Page
          </Button>

          <Button size="sm" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
