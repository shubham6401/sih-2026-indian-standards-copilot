import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  FileCheck,
  X,
  Sparkles,
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAnalysis } from '../context/AnalysisContext';
import { api } from '../services/api';

export const TenderUploadPage = () => {
  const navigate = useNavigate();
  const { setCurrentAnalysis, showToast } = useAnalysis();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [tenderTitle, setTenderTitle] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState('');

  const stages = [
    { label: 'Document uploaded', detail: 'PDF file size and structure verified' },
    { label: 'Text & clauses extracted', detail: 'Technical specification sections parsed' },
    { label: 'Requirements identified', detail: 'Extracting technology, voltage, grades, parameters' },
    { label: 'Standards matching & ranking', detail: 'Querying BIS Indian Standards knowledge base' },
    { label: 'Report generation', detail: 'Compiling QCO mandates and compliance report' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (selectedFile) => {
    setError('');
    if (!selectedFile.name.toLowerCase().endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      setError('Only PDF documents are supported for tender specification analysis.');
      return;
    }
    if (selectedFile.size > 20 * 1024 * 1024) {
      setError('File exceeds 20 MB limit. Please select a smaller PDF tender file.');
      return;
    }

    setFile(selectedFile);
    if (!tenderTitle) {
      setTenderTitle(selectedFile.name.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' '));
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) {
      setError('Please select a PDF tender document first.');
      return;
    }

    setUploading(true);
    setError('');
    setCurrentStage(1);

    // Progressive stage simulation while uploading & server processes
    const stageTimer = setInterval(() => {
      setCurrentStage((prev) => (prev < 4 ? prev + 1 : prev));
    }, 700);

    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('tenderTitle', tenderTitle);

      const result = await api.uploadTenderPdf(formData);
      clearInterval(stageTimer);
      setCurrentStage(5);

      if (!result.success) {
        setError(result.message || 'Could not map sufficient standards from this document.');
        setUploading(false);
        return;
      }

      setCurrentAnalysis(result.analysis);
      showToast('Tender document analyzed and standards mapped successfully!');
      setTimeout(() => {
        navigate(`/analysis/result/${result.analysis._id}`);
      }, 500);
    } catch (err) {
      clearInterval(stageTimer);
      setError(err.message || 'Tender upload failed. Please ensure the PDF is text-readable.');
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
            Document Ingestion Pipeline
          </span>
          <span className="text-xs text-slate-500 font-medium">PDF Specification OCR & Clause Extractor</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
          Upload Tender / Specification PDF
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Upload a formal government or PSU tender document to automatically extract technical schedules, scope items, and find mandatory Indian Standards.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-xl flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Document Notice:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Main Upload Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {!file ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
              dragActive
                ? 'border-gov-500 bg-gov-50/60 scale-[1.01]'
                : 'border-slate-300 hover:border-gov-400 hover:bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="w-16 h-16 rounded-2xl bg-gov-50 text-gov-700 flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-8 h-8 text-gov-600" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit">
              Drag & Drop Tender PDF
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              or <span className="text-gov-600 font-bold underline">Browse files</span> from your computer
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
              <span>PDF format up to 20 MB</span>
              <span>•</span>
              <span>Text-searchable documents</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected File Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{file.name}</h4>
                  <p className="text-[11px] text-slate-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI extraction
                  </p>
                </div>
              </div>

              {!uploading && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Optional Tender Name Title */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Tender Title / Procurement Item Name (Optional)
              </label>
              <input
                type="text"
                disabled={uploading}
                value={tenderTitle}
                onChange={(e) => setTenderTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 focus:outline-none"
                placeholder="e.g. Municipal Street Lighting Tender 2026"
              />
            </div>

            {/* Progress Pipeline Visualization */}
            {uploading && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-gov-600 animate-spin" />
                    <span>Document Analysis in Progress</span>
                  </h4>
                  <span className="text-[11px] font-bold text-gov-700">
                    Step {currentStage} of {stages.length}
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {stages.map((stage, idx) => {
                    const stepNum = idx + 1;
                    const isDone = currentStage > stepNum;
                    const isCurrent = currentStage === stepNum;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 text-xs ${
                          isDone
                            ? 'text-emerald-700 font-semibold'
                            : isCurrent
                            ? 'text-gov-700 font-bold'
                            : 'text-slate-400 opacity-60'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-gov-600 animate-spin shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0 text-center text-[10px] leading-3.5 font-bold">
                            {stepNum}
                          </div>
                        )}
                        <div>
                          <span>{stage.label}</span>
                          <span className="text-[10px] text-slate-500 ml-2 font-normal hidden sm:inline">
                            — {stage.detail}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA Button */}
            {!uploading && (
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="secondary" size="md" onClick={() => setFile(null)}>
                  Choose Different File
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon={Sparkles}
                  onClick={handleUploadAndAnalyze}
                >
                  Analyze Tender Document
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info notice */}
      <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <h5 className="font-bold text-slate-800 mb-1">Supported Document Formats & Privacy Notice</h5>
        <p>
          The engine processes standard text-based PDF tender notices, NIT (Notice Inviting Tender), BOQ schedules, and technical requirement attachments. Uploaded documents are parsed locally in-memory to extract technical parameters and are not shared with unauthorized third parties.
        </p>
      </div>
    </div>
  );
};
