import React from 'react';
import { ShieldCheck, AlertCircle, Award, CheckCircle2, HelpCircle, ExternalLink, Scale } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CertificationSection = ({ certifications = [], standards = [] }) => {
  // If certifications is empty, extract statutory mandates from standards or create canonical assessment
  let displayCerts = Array.isArray(certifications) && certifications.length > 0 ? certifications : [];

  if (displayCerts.length === 0 && Array.isArray(standards) && standards.length > 0) {
    displayCerts = standards
      .filter(s => s && typeof s === 'object' && s.certification && s.certification.isMandatory)
      .map(s => ({
        type: s.certification.scheme?.includes('CRS') ? 'Compulsory Registration Scheme (CRS)' : 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: s.standardNumber || 'Applicable Standard',
        authority: s.certification.notifyingMinistry || 'Bureau of Indian Standards (BIS) / DPIIT',
        mandateReason: `Covered under mandatory Quality Control Order: ${s.certification.orderName || 'BIS QCO'}. Bidders must hold active BIS License (CML / R-Number).`,
        verificationNote: 'Verify valid BIS License / CRS registration on official e-BIS portal (manakonline.in).'
      }));
  }

  // If still empty, provide canonical statutory baseline for procurement
  if (displayCerts.length === 0) {
    displayCerts = [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'Applicable Indian Standard Baseline',
        authority: 'Ministry of Heavy Industries / DPIIT',
        mandateReason: 'Covered under mandatory Gazette Quality Control Orders (QCO). Procuring officers must mandate active BIS License.',
        verificationNote: 'Verify 7-digit CML number on e-BIS Manakonline portal.'
      },
      {
        type: 'BEE Star Labeling Energy Efficiency Program',
        status: 'Applicable',
        standardNumber: 'Energy Conservation Act, 2001',
        authority: 'Bureau of Energy Efficiency (BEE)',
        mandateReason: 'Mandatory energy efficiency star rating label on electrical and pumping equipment.',
        verificationNote: 'Check active BEE star certificate in the BEE online portal.'
      }
    ];
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applicable':
        return <Badge variant="success">Mandatory / Applicable</Badge>;
      case 'Possibly Applicable':
        return <Badge variant="warning">Possibly Applicable (Verify)</Badge>;
      case 'Verify':
        return <Badge variant="info">Verify with Ministry Order</Badge>;
      default:
        return <Badge variant="default">{status || 'Mandatory'}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-2xs my-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
              Statutory Compliance
            </span>
            <span className="text-xs text-slate-500 font-medium">Quality Control Orders (QCO) & BIS Licensing</span>
          </div>
          <h4 className="text-base font-bold text-slate-900 font-outfit mt-1 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span>Statutory Certification & BIS Compliance Assessment</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Mandatory conformity schemes, Quality Control Orders (QCOs), and pre-tender qualifying conditions
          </p>
        </div>
        <a
          href="https://www.bis.gov.in"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-gov-700 hover:text-gov-900 font-bold inline-flex items-center gap-1.5 shrink-0 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md transition-colors"
        >
          <span>Verify License on BIS Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Table of Certifications */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4 rounded-l-lg">Conformity Scheme</th>
              <th className="py-3 px-4">Governing Standard & Ministry</th>
              <th className="py-3 px-4">Compliance Status</th>
              <th className="py-3 px-4">Statutory Rationale & Procurement Mandate</th>
              <th className="py-3 px-4 rounded-r-lg">Mandatory Indenting Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayCerts.map((cert, index) => (
              <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 align-top">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{cert.type}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="font-semibold text-slate-900">{cert.standardNumber}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cert.authority}</p>
                </td>
                <td className="py-3.5 px-4 align-top">
                  {getStatusBadge(cert.status)}
                </td>
                <td className="py-3.5 px-4 text-slate-700 leading-relaxed align-top max-w-xs">
                  {cert.mandateReason}
                </td>
                <td className="py-3.5 px-4 text-slate-600 align-top max-w-xs">
                  <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-950 font-medium">
                    {cert.verificationNote}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-slate-400" />
          <span>Under Rule 144 of GFR 2017 & DPIIT Quality Control Orders, goods covered under mandatory BIS certification must carry standard ISI/CRS marks and active license.</span>
        </div>
      </div>
    </div>
  );
};
