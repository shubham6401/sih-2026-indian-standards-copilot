import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Eye,
  FileText,
  Sparkles,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreIndicator } from '../components/common/ScoreIndicator';
import { useAnalysis } from '../context/AnalysisContext';

export const ReportsPage = () => {
  const navigate = useNavigate();
  const { history, loadHistory } = useAnalysis();

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Procurement Documentation
            </span>
            <span className="text-xs text-slate-500 font-medium">12-Section Standards Compliance Reports</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            Procurement Reports Repository
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Export, print, and download formal compliance assessment dossiers ready for inclusion in official tender files.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={Sparkles}
          onClick={() => navigate('/analysis/new')}
        >
          Generate New Report
        </Button>
      </div>

      {/* Reports Grid */}
      {history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((rep, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      REP-BIS-{String(rep._id).substring(0, 8).toUpperCase()}
                    </span>
                    <Badge variant="primary" size="xs">
                      {rep.productCategory}
                    </Badge>
                  </div>
                  <ScoreIndicator
                    score={rep.confidenceScore || 90}
                    label={rep.confidenceLabel || 'Highly Relevant'}
                    size="sm"
                  />
                </div>

                <h3 className="text-base font-bold text-slate-900 font-outfit">
                  {rep.productName}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 italic">
                  "{rep.rawInput}"
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                  <span className="text-slate-500">
                    <strong>Primary: </strong> {rep.primaryStandards?.[0]?.standardNumber || 'IS Standard'}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">
                    <strong>Mandates: </strong> {rep.certifications?.length || 1} QCOs
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {new Date(rep.createdAt || Date.now()).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="xs"
                    variant="primary"
                    onClick={() => navigate(`/analysis/result/${rep._id}`)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> View Full Report
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Reports Available</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Analyze any procurement requirement or tender PDF to automatically generate formal recommendation reports.
          </p>
          <Button size="sm" onClick={() => navigate('/analysis/new')}>
            Start First Analysis
          </Button>
        </div>
      )}
    </div>
  );
};
