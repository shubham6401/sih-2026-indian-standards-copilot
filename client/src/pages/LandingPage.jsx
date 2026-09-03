import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Sparkles,
  UploadCloud,
  FileCheck2,
  Layers,
  Award,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Compass,
  FileText,
  Zap,
  Cpu,
  Building2,
  Droplet,
  Sun,
  HardHat,
  Cable,
  Workflow
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { LanguageToggle } from '../components/common/LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const samplePresets = [
    {
      title: 'Outdoor LED Street Lighting',
      category: 'LED Lighting',
      query: '100W outdoor LED street lights for municipal roads with IP66 waterproof housing, energy efficacy above 120 lm/W and surge protection.',
      standards: 'IS 10322 (Part 5/Sec 3), IS 15885, IS 16107'
    },
    {
      title: 'Structural 53 Grade Cement',
      category: 'Cement & Building Materials',
      query: '53 Grade Ordinary Portland Cement for high-load bridge pier construction requiring 53 MPa 28-day compressive strength.',
      standards: 'IS 269: 2015, IS 456: 2000, IS 4031'
    },
    {
      title: 'Industrial Safety Helmet',
      category: 'Personal Protective Equipment',
      query: 'Industrial safety helmet (hard hat) for high-risk construction workers with impact resistance, electrical insulation proof test up to 2200V.',
      standards: 'IS 2925: 1984, DGMS Guidelines'
    }
  ];

  const coveredSectors = [
    {
      id: 'led',
      name: 'LED Lighting & Luminaires',
      standards: 'IS 10322 (Pt 5 Sec 3), IS 15885, IS 16107, IS 16102',
      icon: Zap,
      color: 'from-amber-500/10 to-amber-500/5 text-amber-700 border-amber-200',
      qco: 'Mandatory MeitY CRS & BEE Star',
      categoryQuery: 'LED Lighting'
    },
    {
      id: 'cement',
      name: 'Cement & Concrete Materials',
      standards: 'IS 269: 2015, IS 1489 (Pt 1), IS 456: 2000, IS 4031',
      icon: Building2,
      color: 'from-stone-500/10 to-stone-500/5 text-stone-700 border-stone-200',
      qco: 'Mandatory DPIIT Cement QCO (ISI Mark)',
      categoryQuery: 'Cement & Building Materials'
    },
    {
      id: 'steel',
      name: 'TMT Steel & Rebars',
      standards: 'IS 1786: 2008 (Fe 500D/550D), IS 2062, IS 1608',
      icon: Scale,
      color: 'from-slate-500/10 to-slate-500/5 text-slate-700 border-slate-200',
      qco: 'Mandatory Ministry of Steel QCO',
      categoryQuery: 'Steel & Construction Materials'
    },
    {
      id: 'ppe',
      name: 'Personal Protective Equipment',
      standards: 'IS 2925 (Helmets), IS 15298 (Footwear), IS 3521 (Harness)',
      icon: HardHat,
      color: 'from-orange-500/10 to-orange-500/5 text-orange-700 border-orange-200',
      qco: 'Mandatory DPIIT PPE QCO 2021',
      categoryQuery: 'Personal Protective Equipment'
    },
    {
      id: 'pumps',
      name: 'Water Pumps & Hydraulics',
      standards: 'IS 8472 (Centrifugal), IS 8034 (Submersible), IS 9079 (Monoset)',
      icon: Droplet,
      color: 'from-cyan-500/10 to-cyan-500/5 text-cyan-700 border-cyan-200',
      qco: 'Mandatory Pumps QCO & BEE 5-Star',
      categoryQuery: 'Pumps & Water Equipment'
    },
    {
      id: 'cables',
      name: 'Cables & Transformers',
      standards: 'IS 694 (PVC 1.1kV), IS 7098 (XLPE), IS 1180 (Transformers)',
      icon: Cable,
      color: 'from-purple-500/10 to-purple-500/5 text-purple-700 border-purple-200',
      qco: 'Mandatory Electrical Wires QCO',
      categoryQuery: 'Electrical Cables'
    },
    {
      id: 'solar',
      name: 'Solar PV & Inverters',
      standards: 'IS 14286 / IEC 61215, IS/IEC 61730 (Pt 1 & 2), IS 16221',
      icon: Sun,
      color: 'from-yellow-500/10 to-yellow-500/5 text-yellow-700 border-yellow-200',
      qco: 'Mandatory MNRE ALMM & BIS CRS',
      categoryQuery: 'Solar & Renewable Energy'
    },
    {
      id: 'pipes',
      name: 'HDPE & DI Pressure Pipes',
      standards: 'IS 4984 (HDPE PE-100), IS 8329 (Ductile Iron K7/K9)',
      icon: Compass,
      color: 'from-blue-500/10 to-blue-500/5 text-blue-700 border-blue-200',
      qco: 'Jal Jeevan Mission Mandatory Standard',
      categoryQuery: 'Pipes & Water Supply'
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Government Strip */}
      <div className="bg-gov-900 text-white text-[11px] px-4 py-1.5 border-b border-gov-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-400">Government of India / SIH 2026 Initiative</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">National Procurement Standards Copilot</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gov-700 flex items-center justify-center text-white shadow-md">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight font-outfit">
                BIS Standards Copilot
              </span>
              <p className="text-[10px] text-slate-500 font-semibold -mt-1">
                National Procurement Intelligence Engine
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-700">
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-gov-700 transition-colors"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('capabilities')}
              className="hover:text-gov-700 transition-colors"
            >
              Key Capabilities
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sectors')}
              className="hover:text-gov-700 transition-colors font-bold text-gov-700"
            >
              Covered Standards
            </button>
            <Link to="/architecture" className="hover:text-gov-700 transition-colors">
              Copilot Architecture
            </Link>
            <Link to="/explorer" className="hover:text-gov-700 transition-colors">
              Standards Explorer
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-3.5 py-1.5 rounded-lg bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold shadow-sm transition-all"
            >
              Register
            </Link>
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 rounded-lg bg-gov-100 hover:bg-gov-200 text-gov-900 border border-gov-300 text-xs font-bold transition-all hidden sm:inline-flex"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gov-50/40 to-slate-50 pt-12 pb-20 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gov-100/80 border border-gov-200 text-gov-800 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI-Driven Procurement Decision Support • GeM & GFR 2017 Aligned</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto font-outfit leading-tight">
            AI Procurement Standards Copilot
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Understand procurement requirements, map applicable <strong>Indian Standards (IS)</strong>, detect missing testing/safety clauses, catch outdated revisions, and generate enforceable technical tender specifications.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto font-bold"
              icon={Sparkles}
              onClick={() => navigate('/analysis/new')}
            >
              {t('analyzeSpec')}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto font-bold"
              icon={UploadCloud}
              onClick={() => navigate('/tender/upload')}
            >
              {t('uploadTender')}
            </Button>
          </div>

          {/* Demo Knowledge Base Banner */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3 text-xs text-blue-950 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-gov-600 shrink-0" />
                <span>
                  <strong>Knowledge Base:</strong> Pre-indexed with authentic Indian Standards across LED, Cement, Cables, PPE, Solar, Pumps & Piping.
                </span>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('sectors')}
                className="font-bold text-gov-700 hover:text-gov-900 underline shrink-0 cursor-pointer"
              >
                View Standards ↓
              </button>
            </div>
          </div>

          {/* Visual Workflow Diagram */}
          <div id="how-it-works" className="mt-14 max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm scroll-mt-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                How It Works: Automated Procurement Intelligence Pipeline
              </h3>
              <Badge variant="primary" size="xs">
                5-Stage Pipeline
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
              {[
                { title: '1. Specification', desc: 'Natural language (EN/HI), voice, or PDF tender', icon: FileText },
                { title: '2. Structured Extraction', desc: '12+ parameter NLP normalization & ambiguity check', icon: Sparkles },
                { title: '3. Standards Retrieval', desc: 'Hybrid semantic matching & primary ranking', icon: Database },
                { title: '4. Gap & Version Check', desc: 'Identifies missing test clauses & outdated IS years', icon: Layers },
                { title: '5. Tender Generation', desc: 'Readiness score & 8-section technical schedule', icon: FileCheck2 }
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-left relative">
                    <div className="w-8 h-8 rounded-lg bg-gov-600 text-white flex items-center justify-center text-xs font-bold mb-2">
                      <StepIcon className="w-4 h-4 text-amber-300" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COVERED STANDARDS & SECTORS SECTION (TARGET FOR "COVERED STANDARDS" BUTTON) */}
      <section id="sectors" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-3 py-1 rounded-full border border-gov-200">
              Corpus Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 font-outfit">
              Covered Indian Standards & Industry Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Pre-indexed authentic Indian Standards (IS), mandatory Quality Control Orders (QCOs), testing protocols, and companion safety standards. Click any sector to explore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coveredSectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sector.id}
                  onClick={() => navigate(`/explorer?category=${encodeURIComponent(sector.categoryQuery)}`)}
                  className={`p-5 rounded-2xl border bg-gradient-to-br transition-all cursor-pointer flex flex-col justify-between hover:shadow-md hover:scale-[1.02] ${sector.color}`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{sector.name}</h3>
                    <p className="text-xs font-mono font-semibold text-slate-700 leading-snug mb-2">
                      {sector.standards}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                    <span className="font-bold bg-white px-2 py-0.5 rounded shadow-2xs">
                      {sector.qco}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Button
              size="md"
              variant="secondary"
              icon={Compass}
              onClick={() => navigate('/explorer')}
            >
              Open Interactive Standards Explorer
            </Button>
          </div>
        </div>
      </section>

      {/* Why This Platform Section */}
      <section id="why" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-white px-3 py-1 rounded-full border border-gov-200">
              Procurement Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 font-outfit">
              Why Government Departments & PSUs Need This Copilot
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Ensuring statutory compliance under General Financial Rules (GFR 2017) and Quality Control Orders without manual ambiguity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-gov-100 text-gov-800 flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Prevent Obsolete & Superseded Citations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tender documents frequently cite outdated standards (e.g. older IS 12269 instead of unified IS 269:2015). The engine automatically detects revisions and active amendments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Mandatory BIS Certification Checks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identifies whether a product falls under mandatory BIS ISI Scheme I, MeitY CRS, or Ministry Quality Control Orders (QCOs), protecting procurement from invalid bids.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Complete Normative & Testing Linkages
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recommends not just the primary product standard, but also all mandated companion testing standards, electrical safety standards, and ingress protection codes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section id="capabilities" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
              Comprehensive Copilot Capabilities
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Engineered specifically for Indian public procurement workflows
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Bilingual & Voice Input',
                desc: 'Understands inputs in English, pure Hindi (सड़क लाइट), and Hinglish with speech recognition.',
                tag: 'NLP & Speech'
              },
              {
                title: 'Tender Gap Detection',
                desc: 'Identifies missing laboratory test standards, absent QCO clauses, and unrated environmental specs.',
                tag: 'Gap Analysis'
              },
              {
                title: 'Zero-Hallucination Dialog',
                desc: 'Refuses to guess ambiguous queries (e.g. water pump) and launches clarification questionnaires.',
                tag: 'Ambiguity Guard'
              },
              {
                title: 'Spec Schedule Generator',
                desc: 'Synthesizes structured 8-section procurement technical schedules ready for GeM indents.',
                tag: 'Tender Drafting'
              }
            ].map((cap, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <Badge variant="primary" size="xs" className="mb-3">
                  {cap.tag}
                </Badge>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{cap.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Use Cases */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">
              Example Procurement Benchmarks
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select any sample requirement to test the live analysis workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePresets.map((preset, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-gov-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate('/analysis/new', { state: { presetQuery: preset.query } })}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-slate-900">{preset.title}</h4>
                    <span className="text-[10px] font-bold text-gov-600 bg-gov-100 px-2 py-0.5 rounded">
                      Preset
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic mb-4">"{preset.query}"</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium mb-2">
                    Primary Targets: <span className="font-semibold text-slate-700">{preset.standards}</span>
                  </p>
                  <Button size="xs" variant="primary" className="w-full">
                    Test This Specification <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible AI Disclaimer Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DisclaimerBanner />
        </div>
      </section>
    </div>
  );
};
