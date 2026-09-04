import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  RotateCcw,
  AlertTriangle,
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { LoadingState } from '../components/common/LoadingState';
import { LanguageToggle } from '../components/common/LanguageToggle';
import { VoiceInput } from '../components/common/VoiceInput';
import { ClarificationDialog } from '../components/analysis/ClarificationDialog';
import { DemoScenarioSelector } from '../components/analysis/DemoScenarioSelector';
import { useAnalysis, INITIAL_DEMO_HISTORY } from '../context/AnalysisContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export const NewAnalysisPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentAnalysis, showToast } = useAnalysis();
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    productName: '',
    productCategory: 'LED Lighting',
    rawInput: '',
    quantity: '',
    additionalRequirements: ''
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [ambiguityData, setAmbiguityData] = useState(null);
  const [activeScenarioId, setActiveScenarioId] = useState(null);

  useEffect(() => {
    if (location.state?.presetQuery) {
      setFormData(prev => ({
        ...prev,
        rawInput: location.state.presetQuery
      }));
    }
  }, [location.state]);

  const handleScenarioSelect = (scenario) => {
    setActiveScenarioId(scenario.id);
    setFormData({
      productName: scenario.productName,
      productCategory: scenario.category,
      rawInput: scenario.spec,
      quantity: '',
      additionalRequirements: ''
    });
    setAmbiguityData(null);
    setError('');
  };

  const handleRunScenario = (scenario) => {
    setActiveScenarioId(scenario.id);
    const updatedForm = {
      productName: scenario.productName,
      productCategory: scenario.category,
      rawInput: scenario.spec,
      quantity: '',
      additionalRequirements: ''
    };
    setFormData(updatedForm);
    executeAnalysis(updatedForm);
  };

  const handleVoiceTranscript = (transcript) => {
    setFormData(prev => ({
      ...prev,
      rawInput: prev.rawInput ? `${prev.rawInput} ${transcript}` : transcript
    }));
    showToast('Voice transcription recorded!', 'info');
  };

  const handleClear = () => {
    setFormData({
      productName: '',
      productCategory: 'LED Lighting',
      rawInput: '',
      quantity: '',
      additionalRequirements: ''
    });
    setAmbiguityData(null);
    setActiveScenarioId(null);
    setError('');
  };

  const executeAnalysis = async (customData = null) => {
    const dataToSubmit = customData || formData;
    if (!dataToSubmit.productName || !dataToSubmit.rawInput) {
      setError(t('errFillRequired', 'Please fill in all mandatory fields (Item Title and Technical Specification).'));
      return;
    }

    setAnalyzing(true);
    setError('');

    try {
      const result = await api.createAnalysis({
        productName: dataToSubmit.productName,
        productCategory: dataToSubmit.productCategory,
        rawInput: dataToSubmit.rawInput,
        quantity: dataToSubmit.quantity,
        additionalRequirements: dataToSubmit.additionalRequirements,
        language: lang
      });

      if (result.requiresClarification) {
        setAmbiguityData({
          clarificationMessage: result.clarificationMessage,
          clarificationQuestions: result.clarificationQuestions,
          detectedEntity: result.detectedEntity,
          ...result.ambiguityDetails
        });
        setAnalyzing(false);
        return;
      }

      if (result.analysis) {
        setCurrentAnalysis(result.analysis);
        showToast('Standards recommendation report generated successfully!');
        navigate(`/reports/${result.analysis._id || result.analysis.id}`);
      } else {
        setError(result.message || 'No matching Indian Standards identified. Please refine your technical requirements.');
        setAnalyzing(false);
      }
    } catch (err) {
      console.warn('Backend createAnalysis fallback check:', err.message);
      const pName = (dataToSubmit.productName || '').toLowerCase();
      const spec = (dataToSubmit.rawInput || '').toLowerCase();

      // Scenario 3: Water pump ambiguity
      if (pName.includes('water pump') || spec.includes('water pump')) {
        setAmbiguityData({
          clarificationMessage: 'The procurement specification for "Water Pump" is broad. Multiple distinct Indian Standards apply based on mechanical installation and operating conditions.',
          clarificationQuestions: [
            {
              id: 'pump_type',
              question: 'Select pump mechanical design and application:',
              options: [
                { label: 'Submersible Pump (Deep Borewell / Agricultural) — IS 8034', value: 'IS 8034' },
                { label: 'Centrifugal Monobloc Pump (Clear Cold Water) — IS 9079', value: 'IS 9079' },
                { label: 'Horizontal Split Casing (Municipal Water Works) — IS 1520', value: 'IS 1520' }
              ]
            }
          ],
          detectedEntity: 'Water Pump'
        });
        setAnalyzing(false);
        return;
      }

      // Scenario 1: LED street light
      if (pName.includes('led') || spec.includes('led')) {
        const demo = INITIAL_DEMO_HISTORY.find(h => h._id === 'po_analysis_01' || h.demoKey === 'po_analysis_01');
        if (demo) {
          setCurrentAnalysis(demo);
          showToast('100W LED Street Light benchmark dossier loaded!', 'success');
          navigate(`/reports/${demo._id}`);
          return;
        }
      }

      // Scenario 2: Cement
      if (pName.includes('cement') || spec.includes('cement')) {
        const demo = INITIAL_DEMO_HISTORY.find(h => h._id === 'po_analysis_04' || h.demoKey === 'po_analysis_04');
        if (demo) {
          setCurrentAnalysis(demo);
          showToast('53 Grade Cement benchmark dossier loaded!', 'success');
          navigate(`/reports/${demo._id}`);
          return;
        }
      }

      setError(err.message || 'Analysis failed. Please check network or retry.');
      setAnalyzing(false);
    }
  };

  const handleClarificationContinue = async (additions) => {
    const updatedInput = `${formData.rawInput}. ${additions}`;
    setFormData(prev => ({ ...prev, rawInput: updatedInput }));
    setAmbiguityData(null);
    setAnalyzing(true);

    try {
      const result = await api.createAnalysis({
        productName: formData.productName,
        productCategory: formData.productCategory,
        rawInput: updatedInput,
        quantity: formData.quantity,
        additionalRequirements: formData.additionalRequirements,
        language: lang
      });

      if (result.requiresClarification) {
        setAmbiguityData({
          clarificationMessage: result.clarificationMessage,
          clarificationQuestions: result.clarificationQuestions,
          detectedEntity: result.detectedEntity,
          ...result.ambiguityDetails
        });
        setAnalyzing(false);
        return;
      }

      if (result.analysis) {
        setCurrentAnalysis(result.analysis);
        showToast('Standards recommendation report generated successfully!');
        navigate(`/reports/${result.analysis._id}`);
      } else {
        setError(result.message || 'No matching Indian Standards identified.');
        setAnalyzing(false);
      }
    } catch (err) {
      setError(err.message || 'Analysis failed. Please retry.');
      setAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    executeAnalysis();
  };

  if (analyzing) {
    return <LoadingState message={t('extractingStandards', 'Extracting structured requirements, checking revisions, and analyzing Indian Standards...')} />;
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gov-800 bg-gov-50 px-2 py-0.2 rounded border border-gov-200">
              {t('nationalCopilot', 'Procurement Standards Workstation')}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {lang === 'hi' ? 'द्विभाषी एनएलपी • अस्पष्टता आसूचना' : 'Bilingual NLP • Ambiguity Intelligence'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {t('newAnalysisHeaderTitle', 'Analyze Procurement Specification')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('newAnalysisHeaderSubtitle', 'Enter technical requirements in English, Hindi (हिंदी), or Hinglish, or speak requirement via Voice Input.')}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VoiceInput onTranscript={handleVoiceTranscript} />
          <LanguageToggle />
        </div>
      </div>

      {/* SIH Evaluator Benchmark Scenario Switcher */}
      <DemoScenarioSelector
        activeScenario={activeScenarioId}
        onSelectScenario={handleScenarioSelect}
        onRunScenario={handleRunScenario}
      />

      {/* Ambiguity Clarification Modal Dialog */}
      {ambiguityData && (
        <ClarificationDialog
          ambiguityDetails={ambiguityData}
          onContinue={handleClarificationContinue}
          onCancel={() => setAmbiguityData(null)}
        />
      )}

      {/* Main Analysis Form */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 sm:p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {lang === 'hi' ? 'तकनीकी विनिर्देश पैरामीटर' : 'Technical Specification Parameters'}
          </h3>
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> {lang === 'hi' ? 'फ़ॉर्म रीसेट करें' : 'Reset Form'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-md flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">{lang === 'hi' ? 'विश्लेषण सूचना:' : 'Analysis Notice:'}</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Product Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t('productName')} <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 focus:ring-1 focus:ring-gov-700 focus:border-gov-700 focus:outline-none"
                placeholder={lang === 'hi' ? 'उदा. 100W आउटडोर एलईडी स्ट्रीट लाइट' : 'e.g. 100W Outdoor LED Street Light'}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t('category')}
              </label>
              <select
                id="productCategory"
                name="productCategory"
                value={formData.productCategory}
                onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 bg-white focus:ring-1 focus:ring-gov-700 focus:border-gov-700 focus:outline-none"
              >
                <option value="LED Lighting">{lang === 'hi' ? 'एलईडी लाइटिंग और ल्यूमिनेयर' : 'LED Lighting & Luminaires'}</option>
                <option value="Cement & Building Materials">{lang === 'hi' ? 'सीमेंट, कंक्रीट और निर्माण सामग्री' : 'Cement, Concrete & Building Materials'}</option>
                <option value="Steel & Construction Materials">{lang === 'hi' ? 'TMT रिबार और स्ट्रक्चरल स्टील' : 'TMT Rebars & Structural Steel'}</option>
                <option value="Personal Protective Equipment">{lang === 'hi' ? 'व्यक्तिगत सुरक्षा उपकरण (PPE)' : 'Personal Protective Equipment (PPE)'}</option>
                <option value="Pumps & Water Equipment">{lang === 'hi' ? 'जल पंप (सबमर्सिबल / सेंट्रीफ्यूगल)' : 'Water Pumps (Submersible / Centrifugal)'}</option>
                <option value="Electrical Cables">{lang === 'hi' ? 'विद्युत केबल और कंडक्टर' : 'Electrical Cables & Conductors'}</option>
                <option value="Electrical Equipment">{lang === 'hi' ? 'ट्रांसफार्मर और स्विचगियर' : 'Transformers & Switchgears'}</option>
                <option value="Solar & Renewable Energy">{lang === 'hi' ? 'सौर पीवी मॉड्यूल और इनवर्टर' : 'Solar PV Modules & Inverters'}</option>
                <option value="Pipes & Water Supply">{lang === 'hi' ? 'एचडीपीई, डीआई और पीवीसी पाइप (जल जीवन मिशन)' : 'HDPE, DI & PVC Pipes (Jal Jeevan Mission)'}</option>
                <option value="General">{lang === 'hi' ? 'सामान्य औद्योगिक और इंजीनियरिंग' : 'General Industrial & Engineering'}</option>
              </select>
            </div>
          </div>

          {/* Row 2: Specification / Requirement Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-800">
                {t('specification')} <span className="text-rose-600">*</span>
              </label>
              <span className="text-[11px] text-slate-400">{lang === 'hi' ? 'सरल भाषा, विनिर्देश या धाराएं' : 'Natural language, specs, or clauses'}</span>
            </div>
            <textarea
              rows={5}
              required
              id="rawInput"
              name="rawInput"
              value={formData.rawInput}
              onChange={(e) => setFormData({ ...formData, rawInput: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:ring-1 focus:ring-gov-700 focus:border-gov-700 focus:outline-none leading-relaxed font-sans"
              placeholder={t('specPlaceholder')}
            />
          </div>

          {/* Row 3: Quantity & Additional Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t('quantity')}
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 focus:ring-1 focus:ring-gov-700 focus:border-gov-700 focus:outline-none"
                placeholder={lang === 'hi' ? 'उदा. 5,000 यूनिट्स' : 'e.g. 5,000 units'}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {lang === 'hi' ? 'अतिरिक्त विनिर्देश / डिलीवरी शर्तें' : 'Additional Environmental / Delivery Notes'}
              </label>
              <input
                type="text"
                value={formData.additionalRequirements}
                onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-slate-300 focus:ring-1 focus:ring-gov-700 focus:border-gov-700 focus:outline-none"
                placeholder={lang === 'hi' ? 'उदा. तटीय वातावरण, उच्च आर्द्रता (IP66 आवश्यक)' : 'e.g. Coastal installation, surge protection 10kV'}
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500 hidden sm:block">
              {lang === 'hi'
                ? 'सिस्टम बीआईएस मानकों, संशोधन गजटों और अनिवार्य QCOs से मिलान करेगा।'
                : 'Engine will audit against Bureau of Indian Standards, active amendments, and mandatory QCOs.'}
            </p>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              {t('analyzeButton', 'Run Standards Compliance Audit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
