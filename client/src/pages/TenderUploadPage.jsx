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
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAnalysis } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export const TenderUploadPage = () => {
  const navigate = useNavigate();
  const { setCurrentAnalysis, showToast } = useAnalysis();
  const { t, lang } = useLanguage();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [tenderTitle, setTenderTitle] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState('');

  const SAMPLE_TENDERS = [
    {
      id: 'led-street-lighting',
      title: 'CPWD Smart City LED Street Lighting Tender NIT-2026',
      fileName: 'CPWD_Smart_City_LED_Street_Lighting_Tender_NIT_2026.pdf',
      url: '/sample_tenders/sample_led_street_light_tender.pdf',
      category: 'LED Lighting',
      scope: '100W energy efficient LED Street Lights with IP66 waterproof housing, surge protection, and IS 10322 compliance.',
      standardsTarget: 'IS 10322 (Part 5/Sec 3), IS 15885, IS 16107'
    },
    {
      id: 'substation-power-transformer',
      title: 'NTPC 11kV Power Distribution Transformer Tender NIT-2026',
      fileName: 'NTPC_11kV_Power_Distribution_Transformer_NIT_2026.pdf',
      url: '/sample_tenders/sample_power_transformer_tender.pdf',
      category: 'Electrical Equipment',
      scope: 'Outdoor oil-immersed distribution transformers complying with BIS Scheme I mandate and BEE 5-Star efficiency.',
      standardsTarget: 'IS 1180 (Part 1): 2014, IS 2026, CEA Guidelines'
    }
  ];

  const stages = [
    { label: lang === 'hi' ? 'दस्तावेज़ अपलोड किया गया' : 'Document uploaded', detail: lang === 'hi' ? 'पीडीएफ फ़ाइल आकार और संरचना सत्यापित' : 'PDF file size and structure verified' },
    { label: lang === 'hi' ? 'पाठ और धाराएं निकाली गईं' : 'Text & clauses extracted', detail: lang === 'hi' ? 'तकनीकी विनिर्देश अनुभागों का पार्सिंग' : 'Technical specification sections parsed' },
    { label: lang === 'hi' ? 'आवश्यकताओं की पहचान की गई' : 'Requirements identified', detail: lang === 'hi' ? 'प्रौद्योगिकी, वोल्टेज, ग्रेड, पैरामीटर का निष्कर्षण' : 'Extracting technology, voltage, grades, parameters' },
    { label: lang === 'hi' ? 'मानक मिलान और रैंकिंग' : 'Standards matching & ranking', detail: lang === 'hi' ? 'बीआईएस भारतीय मानक ज्ञानकोश से मिलान' : 'Querying BIS Indian Standards knowledge base' },
    { label: lang === 'hi' ? 'रिपोर्ट तैयार की गई' : 'Report generation', detail: lang === 'hi' ? 'QCO अनिवार्यताएं और अनुपालन रिपोर्ट संकलित' : 'Compiling QCO mandates and compliance report' }
  ];

  const handleLoadSampleTender = async (sample, autoAnalyze = false) => {
    setError('');
    try {
      const response = await fetch(sample.url);
      if (!response.ok) throw new Error('Could not load sample file');
      const blob = await response.blob();
      const sampleFile = new File([blob], sample.fileName, { type: 'application/pdf' });
      setFile(sampleFile);
      setTenderTitle(sample.title);
      showToast(`Loaded preset: ${sample.title}`);

      if (autoAnalyze) {
        setUploading(true);
        setCurrentStage(1);
        const stageTimer = setInterval(() => {
          setCurrentStage((prev) => (prev < 4 ? prev + 1 : prev));
        }, 700);

        const formData = new FormData();
        formData.append('document', sampleFile);
        formData.append('tenderTitle', sample.title);

        const result = await api.uploadTenderPdf(formData);
        clearInterval(stageTimer);
        setCurrentStage(5);

        if (!result.success) {
          setError(result.message || (lang === 'hi' ? 'इस दस्तावेज़ से पर्याप्त मानकों का मिलान नहीं हो सका।' : 'Could not map sufficient standards from this document.'));
          setUploading(false);
          return;
        }

        setCurrentAnalysis(result.analysis);
        showToast(lang === 'hi' ? 'निविदा दस्तावेज़ का विश्लेषण और मानकों का मिलान सफलतापूर्वक संपन्न!' : 'Tender document analyzed and standards mapped successfully!');
        setTimeout(() => {
          navigate(`/reports/${result.analysis._id}`);
        }, 500);
      }
    } catch (err) {
      setError(lang === 'hi' ? 'नमूना निविदा पीडीएफ लोड करने में विफल: ' + err.message : 'Failed to load sample tender PDF: ' + err.message);
      setUploading(false);
    }
  };

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
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setError(lang === 'hi' ? 'कृपया एक वैध पीडीएफ (.pdf) निविदा दस्तावेज़ अपलोड करें।' : 'Please upload a valid PDF (.pdf) tender document.');
      return;
    }
    if (selectedFile.size > 25 * 1024 * 1024) {
      setError(lang === 'hi' ? 'फ़ाइल का आकार 25MB सीमा से अधिक है। कृपया एक छोटा पीडीएफ अपलोड करें।' : 'File size exceeds 25MB limit. Please upload a smaller PDF.');
      return;
    }

    setFile(selectedFile);
    if (!tenderTitle) {
      setTenderTitle(selectedFile.name.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' '));
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) {
      setError(lang === 'hi' ? 'कृपया पहले एक पीडीएफ निविदा दस्तावेज़ चुनें।' : 'Please select a PDF tender document first.');
      return;
    }

    setUploading(true);
    setError('');
    setCurrentStage(1);

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
        setError(result.message || (lang === 'hi' ? 'इस दस्तावेज़ से पर्याप्त मानकों का मिलान नहीं हो सका।' : 'Could not map sufficient standards from this document.'));
        setUploading(false);
        return;
      }

      setCurrentAnalysis(result.analysis);
      showToast(lang === 'hi' ? 'निविदा दस्तावेज़ का विश्लेषण और मानकों का मिलान सफलतापूर्वक संपन्न!' : 'Tender document analyzed and standards mapped successfully!');
      setTimeout(() => {
        navigate(`/reports/${result.analysis._id}`);
      }, 500);
    } catch (err) {
      clearInterval(stageTimer);
      setError(err.message || (lang === 'hi' ? 'निविदा अपलोड विफल रहा। कृपया सुनिश्चित करें कि पीडीएफ पाठ-पठनीय है।' : 'Tender upload failed. Please ensure the PDF is text-readable.'));
      setUploading(false);
    }
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gov-800 bg-gov-50 px-2 py-0.2 rounded border border-gov-200">
            {lang === 'hi' ? 'दस्तावेज़ अंतर्ग्रहण पाइपलाइन' : 'Document Ingestion Pipeline'}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {lang === 'hi' ? 'पीडीएफ विनिर्देश ओसीआर और खंड निष्कर्षण' : 'PDF Specification OCR & Clause Extractor'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {t('uploadTenderHeaderTitle', 'Upload Tender / Specification PDF')}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {t('uploadTenderHeaderSubtitle', 'Upload a formal government or PSU tender document to automatically extract technical schedules, scope items, and find mandatory Indian Standards.')}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-md flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">{lang === 'hi' ? 'दस्तावेज़ सूचना:' : 'Document Notice:'}</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Main Upload Box */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-2xs">
        {!file ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 sm:p-12 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-gov-600 bg-gov-50/70'
                : 'border-slate-300 hover:border-gov-600 hover:bg-slate-50/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="w-12 h-12 rounded bg-gov-50 text-gov-800 flex items-center justify-center mx-auto mb-3 border border-gov-200">
              <UploadCloud className="w-6 h-6 text-gov-700" />
            </div>

            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {lang === 'hi' ? 'निविदा पीडीएफ यहां खींचें और छोड़ें' : 'Drag & Drop Tender PDF'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-3">
              {lang === 'hi' ? 'या अपने कंप्यूटर से' : 'or'} <span className="text-gov-700 font-bold underline">{lang === 'hi' ? 'फ़ाइलें ब्राउज़ करें' : 'Browse files'}</span> {lang === 'hi' ? '' : 'from your computer'}
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-slate-200 bg-slate-100 text-slate-600 text-[10px] font-semibold">
              <span>{lang === 'hi' ? '25 MB तक का पीडीएफ प्रारूप' : 'PDF format up to 25 MB'}</span>
              <span>•</span>
              <span>{lang === 'hi' ? 'पाठ-खोजने योग्य दस्तावेज़' : 'Text-searchable documents'}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected File Row */}
            <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{file.name}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • {lang === 'hi' ? 'विश्लेषण के लिए तैयार' : 'Ready for standards extraction'}
                  </p>
                </div>
              </div>

              {!uploading && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                  title={t('clear', 'Clear')}
                  aria-label={t('clear', 'Clear')}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Optional Tender Name Title */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {lang === 'hi' ? 'निविदा शीर्षक / खरीद मद का नाम (वैकल्पिक)' : 'Tender Title / Procurement Item Name (Optional)'}
              </label>
              <input
                type="text"
                disabled={uploading}
                value={tenderTitle}
                onChange={(e) => setTenderTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 focus:ring-1 focus:ring-gov-700 focus:border-gov-700 focus:outline-none"
                placeholder={lang === 'hi' ? 'उदा. नगर निगम स्ट्रीट लाइटिंग निविदा 2026' : 'e.g. Municipal Street Lighting Tender 2026'}
              />
            </div>

            {/* Progress Pipeline Visualization */}
            {uploading && (
              <div className="p-4 rounded-md bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 text-gov-700 animate-spin" />
                    <span>{lang === 'hi' ? 'दस्तावेज़ विश्लेषण प्रगति पर है' : 'Document Analysis in Progress'}</span>
                  </h4>
                  <span className="text-[11px] font-bold font-mono text-gov-800">
                    {lang === 'hi' ? `चरण ${currentStage} / ${stages.length}` : `Step ${currentStage} of ${stages.length}`}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {stages.map((stage, idx) => {
                    const stepNum = idx + 1;
                    const isDone = currentStage > stepNum;
                    const isCurrent = currentStage === stepNum;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 text-xs ${
                          isDone
                            ? 'text-emerald-800 font-semibold'
                            : isCurrent
                            ? 'text-gov-800 font-bold'
                            : 'text-slate-400 opacity-60'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : isCurrent ? (
                          <Loader2 className="w-3.5 h-3.5 text-gov-700 animate-spin shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 text-center text-[9px] leading-3 font-bold">
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

            {/* CTA Buttons */}
            {!uploading && (
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <Button variant="secondary" size="md" onClick={() => setFile(null)}>
                  {lang === 'hi' ? 'अलग फ़ाइल चुनें' : 'Choose Different File'}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  onClick={handleUploadAndAnalyze}
                >
                  {t('analyzeTenderBtn', 'Analyze Tender Document')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 1-Click Preloaded Sample Tenders for Testing */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-gov-700" />
              <span>{lang === 'hi' ? 'त्वरित मूल्यांकन के लिए प्रीलोडेड नमूना निविदाएं' : 'Preloaded Benchmark Tenders for Evaluation'}</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {lang === 'hi' ? 'बाहरी फ़ाइलों को अपलोड किए बिना प्रामाणिक सरकारी निविदा दस्तावेजों का परीक्षण करें।' : 'Test authentic public procurement tender documents without uploading external files.'}
            </p>
          </div>
          <Badge variant="primary" size="xs">
            {lang === 'hi' ? '1-क्लिक प्रीलोड' : '1-Click Preload'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SAMPLE_TENDERS.map((sample) => (
            <div
              key={sample.id}
              className="p-3.5 rounded-md border border-slate-200 bg-slate-50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <Badge variant="neutral" size="xs">
                    {sample.category}
                  </Badge>
                  <span className="text-[10px] text-slate-500 font-mono">PDF Notice</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                  {sample.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                  {sample.scope}
                </p>
                <div className="p-2 bg-white rounded border border-slate-200 text-[10px] text-slate-600 mb-3 font-mono">
                  Target: <span className="font-bold text-gov-900">{sample.standardsTarget}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <Button
                  size="xs"
                  variant="secondary"
                  className="flex-1"
                  disabled={uploading}
                  onClick={() => handleLoadSampleTender(sample, false)}
                >
                  {lang === 'hi' ? 'ड्रॉपज़ोन में लोड करें' : 'Load to Dropzone'}
                </Button>
                <Button
                  size="xs"
                  variant="primary"
                  className="flex-1 font-bold"
                  disabled={uploading}
                  data-testid={`analyze-sample-${sample.id}`}
                  onClick={() => handleLoadSampleTender(sample, true)}
                >
                  {lang === 'hi' ? 'विश्लेषण करें' : 'Audit Tender'} <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Notice */}
      <div className="p-3.5 bg-slate-100 rounded-md border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
        <h5 className="font-bold text-slate-800 mb-0.5">
          {lang === 'hi' ? 'समर्थित दस्तावेज़ प्रारूप और गोपनीयता सूचना' : 'Supported Document Formats & Privacy Notice'}
        </h5>
        <p>
          {lang === 'hi'
            ? 'इंजन मानक पाठ-आधारित पीडीएफ निविदा नोटिस, एनआईटी (निविदा आमंत्रण सूचना), बीओक्यू अनुसूचियों और तकनीकी आवश्यकता अनुलग्नकों को संसाधित करता है।'
            : 'Engine processes standard text-based PDF tender notices, NIT (Notice Inviting Tender), BOQ schedules, and technical requirement schedules. Uploaded documents are parsed locally in-memory and validated against official BIS Gazette notifications.'}
        </p>
      </div>
    </div>
  );
};
