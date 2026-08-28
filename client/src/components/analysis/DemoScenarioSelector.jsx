import React from 'react';
import { Sparkles, HelpCircle, Building2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

export const DemoScenarioSelector = ({ onSelectScenario, activeScenario = null }) => {
  const scenarios = [
    {
      id: 'scenario1',
      badge: 'Scenario 1 • Full Pipeline',
      title: '100W LED Street Light',
      desc: 'Complete workflow: Requirements extraction → Standards matching (IS 10322/15885) → Relationship Graph → MeitY CRS & BEE Star → Gap Analysis → Improved Specification.',
      spec: 'We need 100W outdoor LED street lights for municipal roads. The lights should be waterproof (IP66), energy efficient (min 120 lm/W), electrically safe with surge protection up to 10kV, and compliant with Indian grid fluctuations.',
      category: 'LED Lighting',
      productName: '100W Outdoor LED Street Light'
    },
    {
      id: 'scenario2',
      badge: 'Scenario 2 • Outdated Reference & QCO',
      title: '53 Grade Structural Cement',
      desc: 'Demonstrates Outdated Citation Detection (IS 8112:1989 & IS 12269:1987 updated to unified IS 269:2015), compressive testing (IS 4031), and DPIIT Cement QCO.',
      spec: 'We require 53 Grade Ordinary Portland Cement (OPC) as per IS 12269:1987 for construction of reinforced concrete bridges and high-load civil structures. High early compressive strength required.',
      category: 'Cement & Building Materials',
      productName: 'Ordinary Portland Cement (53 Grade)'
    },
    {
      id: 'scenario3',
      badge: 'Scenario 3 • Ambiguity Handling',
      title: 'Ambiguous Query: "Water Pump"',
      desc: 'Demonstrates Zero Hallucination: AI detects insufficient parameters and launches the Interactive Clarification Dialog (Centrifugal vs Submersible vs Monoset).',
      spec: 'We need a water pump.',
      category: 'General',
      productName: 'Water Pump'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gov-900 via-gov-800 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-md my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gov-700/80 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded shadow-xs">
              SIH 2026 Evaluator Quick-Demo
            </span>
            <span className="text-xs text-slate-300 font-medium">3 Curated Benchmark Scenarios</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white font-outfit mt-1">
            One-Click Procurement Test Scenarios
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            onClick={() => onSelectScenario(sc)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
              activeScenario === sc.id
                ? 'bg-gov-700/90 border-amber-400 ring-2 ring-amber-400/50 shadow-md'
                : 'bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold text-amber-300 block mb-1">
                {sc.badge}
              </span>
              <h4 className="text-sm font-bold text-white font-outfit flex items-center justify-between">
                <span>{sc.title}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity" />
              </h4>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                {sc.desc}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-400 font-semibold">
              <span>Click to load scenario</span>
              <span className="text-amber-300 font-bold group-hover:underline">Load & Test →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
