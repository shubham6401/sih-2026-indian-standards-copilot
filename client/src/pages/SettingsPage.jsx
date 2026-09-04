import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Key,
  Shield,
  Save,
  CheckCircle2,
  AlertTriangle,
  Languages,
  Database,
  Building
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useAnalysis } from '../context/AnalysisContext';

export const SettingsPage = () => {
  const { user } = useAuth();
  const { lang, setLang } = useLanguage();
  const { showToast } = useAnalysis();

  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem('is_custom_gemini_key') || '');
  const [modelMode, setModelMode] = useState('hybrid');
  const [organization, setOrganization] = useState(user?.organizationName || user?.organization || 'Central Public Works Department (CPWD)');
  const [role, setRole] = useState(user?.role || 'Procurement Officer');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (geminiApiKey) {
      localStorage.setItem('is_custom_gemini_key', geminiApiKey);
    } else {
      localStorage.removeItem('is_custom_gemini_key');
    }
    showToast('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
            System Configuration
          </span>
          <span className="text-xs text-slate-500 font-medium">Officer Preferences & AI Integration</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
          Portal Settings & AI Configuration
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure external LLM providers, department credentials, language defaults, and decision-support parameters.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: User & Organization Profile */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-4 h-4 text-gov-600" />
            <h3 className="text-sm font-bold text-slate-900">Procurement Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Officer Name</label>
              <input
                type="text"
                disabled
                value={user?.name || 'Rajesh Kumar'}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                disabled
                value={user?.email || 'officer@cpwd.gov.in'}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Department / Organization</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Designated Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500"
              >
                <option value="Procurement Officer">Procurement Officer</option>
                <option value="Government Department">Government Department</option>
                <option value="PSU">Public Sector Undertaking (PSU)</option>
                <option value="Organization/Admin">Organization / Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: AI / LLM Engine Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">AI Model & LLM Provider Integration</h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
              Active & Connected
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Recommendation Engine Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="p-3 rounded-xl border border-gov-500 bg-gov-50/50 flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="modelMode"
                    value="hybrid"
                    checked={modelMode === 'hybrid'}
                    onChange={() => setModelMode('hybrid')}
                    className="mt-0.5 text-gov-600"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">Hybrid RAG + Local BIS Corpus (Default)</span>
                    <span className="text-[11px] text-slate-500">
                      High-accuracy deterministic Indian Standards database cross-referenced with statutory QCO orders.
                    </span>
                  </div>
                </label>

                <label className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="modelMode"
                    value="llm"
                    checked={modelMode === 'llm'}
                    onChange={() => setModelMode('llm')}
                    className="mt-0.5 text-gov-600"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">LLM Augmented Reasoning</span>
                    <span className="text-[11px] text-slate-500">
                      Enriches clause explainability and complex tender synthesis using Gemini 1.5 Flash / Pro.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-800">
                  Google Gemini / AI Provider API Key (BYOK Optional)
                </label>
                <span className="text-[11px] text-slate-400">Environment variable or Custom Key</span>
              </div>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="AIzaSy... (Leave empty to use default local semantic RAG engine)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500 font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                API keys are stored securely in local browser environment or server environment variables and are never transmitted to unauthorized services.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Language & Localization */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Languages className="w-4 h-4 text-gov-600" />
            <h3 className="text-sm font-bold text-slate-900">Language & Regional Defaults</h3>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-800">Default Interface Language</p>
              <p className="text-slate-500 text-[11px]">Select preferred language for dashboards and reports</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-gov-600 text-white border-gov-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  lang === 'hi'
                    ? 'bg-gov-600 text-white border-gov-600'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>
        </div>

        {/* Save Action */}
        <div className="flex justify-end">
          <Button type="submit" size="md" variant="primary" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
