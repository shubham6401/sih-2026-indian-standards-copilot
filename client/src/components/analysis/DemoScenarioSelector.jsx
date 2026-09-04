import React from 'react';
import { ArrowRight, Play, BookOpen } from 'lucide-react';

export const DemoScenarioSelector = ({ onSelectScenario, onRunScenario, activeScenario = null }) => {
  const scenarios = [
    {
      id: 'scenario1',
      badge: 'Benchmark 1 • Full Verification',
      title: '100W LED Street Light',
      desc: 'Requirements extraction → Standards matching (IS 10322/15885) → Relationship Graph → MeitY CRS & BEE Star → Gap Analysis → Improved Specification.',
      spec: 'We need 100W outdoor LED street lights for municipal roads. The lights should be waterproof (IP66), energy efficient (min 120 lm/W), electrically safe with surge protection up to 10kV, and compliant with Indian grid fluctuations.',
      category: 'LED Lighting',
      productName: '100W Outdoor LED Street Light'
    },
    {
      id: 'scenario2',
      badge: 'Benchmark 2 • Superseded Standard & QCO',
      title: '53 Grade Structural Cement',
      desc: 'Outdated Citation Detection (IS 8112:1989 & IS 12269:1987 updated to unified IS 269:2015), compressive testing (IS 4031), and DPIIT Cement QCO mandate.',
      spec: 'We require 53 Grade Ordinary Portland Cement (OPC) as per IS 12269:1987 for construction of reinforced concrete bridges and high-load civil structures. High early compressive strength required.',
      category: 'Cement & Building Materials',
      productName: 'Ordinary Portland Cement (53 Grade)'
    },
    {
      id: 'scenario3',
      badge: 'Benchmark 3 • Ambiguity Resolution',
      title: 'Ambiguous Input: "Water Pump"',
      desc: 'Parameter Completeness Check: Engine detects broad classification and triggers Interactive Clarification Dialog (Centrifugal vs Submersible vs Monoset).',
      spec: 'We need a water pump.',
      category: 'General',
      productName: 'Water Pump'
    }
  ];

  return (
    <div className="bg-gov-900 border border-gov-800 rounded-lg p-4 sm:p-5 text-white shadow-xs my-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-800 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">
              SIH 2026 Evaluation Scenarios
            </span>
            <span className="text-xs text-slate-300 font-medium">3 Curated Benchmark Datasets</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mt-1">
            One-Click Procurement Audit Scenarios
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            onClick={() => onSelectScenario(sc, false)}
            className={`p-3.5 rounded-md border transition-colors cursor-pointer flex flex-col justify-between group ${
              activeScenario === sc.id
                ? 'bg-gov-800 border-amber-400 ring-1 ring-amber-400'
                : 'bg-gov-800/60 hover:bg-gov-800 border-gov-700 hover:border-gov-600'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold text-amber-300 block mb-1 uppercase tracking-wide">
                {sc.badge}
              </span>
              <h4 className="text-xs font-bold text-white flex items-center justify-between">
                <span>{sc.title}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity" />
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {sc.desc}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-gov-700 flex justify-between items-center text-[10px] gap-2">
              <span className="text-slate-400 font-medium">Click to populate</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onRunScenario) onRunScenario(sc);
                  else onSelectScenario(sc, true);
                }}
                className="px-2 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                title={`Instantly test ${sc.title}`}
              >
                <Play className="w-2.5 h-2.5 fill-slate-950" />
                <span>Run Test</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
