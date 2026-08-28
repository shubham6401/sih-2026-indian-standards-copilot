import React from 'react';
import { ShieldCheck, AlertCircle, Award, CheckCircle2, HelpCircle, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CertificationSection = ({ certifications = [] }) => {
  if (!certifications || certifications.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
        <p className="text-xs text-slate-500">
          No mandatory BIS Quality Control Orders or statutory certification schemes were conclusively identified for this specific item. Verify applicability in tender terms.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applicable':
        return <Badge variant="success">Applicable / Mandatory</Badge>;
      case 'Possibly Applicable':
        return <Badge variant="warning">Possibly Applicable (Verify)</Badge>;
      case 'Verify':
        return <Badge variant="info">Verify with Ministry Order</Badge>;
      default:
        return <Badge variant="default">{status || 'Verify'}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span>Statutory Certification & BIS Compliance Assessment</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Mandatory conformity schemes, Quality Control Orders (QCOs), and procurement pre-requisites
          </p>
        </div>
        <a
          href="https://manakonline.in/MANAK/ApplicationSubmission"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-gov-600 hover:text-gov-700 font-semibold inline-flex items-center gap-1 shrink-0"
        >
          Check License Database <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Table / Cards */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4 rounded-l-lg">Conformity Scheme</th>
              <th className="py-3 px-4">Standard & Authority</th>
              <th className="py-3 px-4">Compliance Status</th>
              <th className="py-3 px-4">Mandate Rationale & Procurement Rule</th>
              <th className="py-3 px-4 rounded-r-lg">Verification Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {certifications.map((cert, index) => (
              <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 align-top">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{cert.type}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 align-top">
                  <span className="font-semibold text-slate-800">{cert.standardNumber}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cert.authority}</p>
                </td>
                <td className="py-3.5 px-4 align-top">
                  {getStatusBadge(cert.status)}
                </td>
                <td className="py-3.5 px-4 text-slate-700 leading-relaxed align-top max-w-xs">
                  {cert.mandateReason}
                </td>
                <td className="py-3.5 px-4 text-slate-600 align-top max-w-xs">
                  <div className="p-2 bg-amber-50/80 rounded-lg border border-amber-100 text-[11px] text-amber-950 font-medium">
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
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Under the Public Procurement Order (Make in India), domestic BIS certification is a mandatory qualifying condition for public tenders.</span>
        </div>
      </div>
    </div>
  );
};
