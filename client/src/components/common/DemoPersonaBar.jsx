import React, { useState } from 'react';
import {
  Users,
  Shield,
  Building2,
  Zap,
  CheckCircle2,
  Loader2,
  ArrowRight,
  FileSpreadsheet,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAnalysis } from '../../context/AnalysisContext';
import { DEMO_PERSONAS, normalizeRole, ROLE_KEYS } from '../../config/roleConfig';
import { Badge } from './Badge';

const PERSONA_ICONS = {
  [ROLE_KEYS.PROCUREMENT_OFFICER]: Shield,
  [ROLE_KEYS.GOVERNMENT_DEPARTMENT]: Building2,
  [ROLE_KEYS.PSU]: Zap,
  [ROLE_KEYS.ADMIN]: Sparkles
};

export const DemoPersonaBar = ({ className = '', title = "Switch Demo Stakeholder Persona", compact = false }) => {
  const { user, switchRole } = useAuth();
  const { loadHistory } = useAnalysis();
  const [switchingEmail, setSwitchingEmail] = useState(null);

  const currentUserRoleKey = normalizeRole(user?.accountType || user?.role);

  const isPersonaActive = (persona) => {
    if (user?.email && user.email.toLowerCase() === persona.email.toLowerCase()) {
      return true;
    }
    return currentUserRoleKey === persona.roleKey;
  };

  const handleSwitch = async (persona) => {
    if (isPersonaActive(persona) || switchingEmail) return;

    setSwitchingEmail(persona.email);
    try {
      await switchRole(persona);
      await loadHistory(true);
    } catch (err) {
      console.error('[DemoPersonaBar] Failed to switch demo persona:', err);
    } finally {
      setSwitchingEmail(null);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs transition-all ${className}`}
      data-testid="demo-persona-bar"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gov-100 text-gov-800 flex items-center justify-center shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-outfit uppercase tracking-wider">
                {title}
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                1 Account Per Role
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Click any demo account below to switch directly and view role-isolated procurement reports (32 pre-seeded analyses each).
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 font-medium shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Role Isolation Active</span>
        </div>
      </div>

      {/* 4 Demo Account Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DEMO_PERSONAS.map((persona) => {
          const active = isPersonaActive(persona);
          const isSwitchingThis = switchingEmail === persona.email;
          const RoleIcon = PERSONA_ICONS[persona.roleKey] || Shield;

          return (
            <button
              key={persona.email}
              type="button"
              disabled={isSwitchingThis || switchingEmail !== null}
              onClick={() => handleSwitch(persona)}
              data-testid={`quick-switch-${persona.roleKey}`}
              className={`text-left p-3 sm:p-3.5 rounded-xl border transition-all relative flex flex-col justify-between group ${
                active
                  ? 'bg-gov-50/70 border-gov-500 ring-2 ring-gov-500/20 shadow-xs'
                  : 'bg-slate-50/60 hover:bg-white border-slate-200 hover:border-gov-300 hover:shadow-xs cursor-pointer'
              } ${isSwitchingThis ? 'opacity-80' : ''}`}
            >
              <div>
                {/* Top Role Badge + Reports Count */}
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        active ? 'bg-gov-700 text-white' : 'bg-slate-200/80 text-slate-700 group-hover:bg-gov-100 group-hover:text-gov-800'
                      }`}
                    >
                      <RoleIcon className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 truncate">
                      {persona.role}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-gov-800 shrink-0">
                    {persona.roleKey === ROLE_KEYS.ADMIN ? '128 Reports' : '32 Reports'}
                  </span>
                </div>

                {/* Persona Name */}
                <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                  {persona.name}
                </p>

                {/* Organization */}
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {persona.organization}
                </p>
              </div>

              {/* Bottom State / Action Bar */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                {active ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Active Account</span>
                  </span>
                ) : isSwitchingThis ? (
                  <span className="inline-flex items-center gap-1 font-bold text-gov-700">
                    <Loader2 className="w-3 h-3 animate-spin shrink-0" />
                    <span>Switching...</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-500 group-hover:text-gov-700 transition-colors">
                    <span>Click to switch</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                )}

                <span className="font-mono text-slate-400 text-[9px] truncate max-w-[90px]">
                  {persona.email.split('@')[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
