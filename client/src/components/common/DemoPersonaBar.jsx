import React, { useState } from 'react';
import {
  Users,
  Shield,
  Building2,
  Zap,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAnalysis } from '../../context/AnalysisContext';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_PERSONAS, normalizeRole, ROLE_KEYS } from '../../config/roleConfig';

const PERSONA_ICONS = {
  [ROLE_KEYS.PROCUREMENT_OFFICER]: Shield,
  [ROLE_KEYS.GOVERNMENT_DEPARTMENT]: Building2,
  [ROLE_KEYS.PSU]: Zap,
  [ROLE_KEYS.ADMIN]: Sliders
};

export const DemoPersonaBar = ({ className = '', title, compact = false }) => {
  const { user, switchRole } = useAuth();
  const { loadHistory } = useAnalysis();
  const { t } = useLanguage();
  const [switchingEmail, setSwitchingEmail] = useState(null);

  const displayTitle = title || t('switchDemoPersona', 'Switch Demo Stakeholder Persona');
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
      className={`bg-white rounded-lg border border-slate-200 p-3.5 sm:p-4 shadow-2xs ${className}`}
      data-testid="demo-persona-bar"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gov-100 text-gov-800 flex items-center justify-center shrink-0">
            <Users className="w-3 h-3" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {displayTitle}
              </h3>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                {t('accountPerRole', '1 Account Per Role')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t('personaBarDesc', 'Click any demo account below to switch directly and view role-isolated procurement reports (32 pre-seeded analyses each).')}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-600 font-medium shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
          <span>{t('liveRoleIsolationActive', 'Live Role Isolation Active')}</span>
        </div>
      </div>

      {/* 4 Demo Account Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
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
              className={`text-left p-3 rounded-md border transition-colors relative flex flex-col justify-between group ${
                active
                  ? 'bg-gov-50/80 border-gov-600 ring-1 ring-gov-600/30'
                  : 'bg-slate-50/60 hover:bg-white border-slate-200 hover:border-gov-400 cursor-pointer'
              } ${isSwitchingThis ? 'opacity-70' : ''}`}
            >
              <div>
                {/* Top Role Badge + Reports Count */}
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                        active ? 'bg-gov-700 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-gov-100 group-hover:text-gov-800'
                      }`}
                    >
                      <RoleIcon className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800 truncate">
                      {t(persona.role)}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold font-mono px-1 py-0.2 rounded bg-white border border-slate-200 text-gov-800 shrink-0">
                    {persona.roleKey === ROLE_KEYS.ADMIN ? `128 ${t('reports', 'Reports')}` : `32 ${t('reports', 'Reports')}`}
                  </span>
                </div>

                {/* Persona Name */}
                <p className="text-xs font-bold text-slate-900 truncate leading-snug">
                  {persona.name}
                </p>

                {/* Organization */}
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {persona.organization}
                </p>
              </div>

              {/* Bottom State / Action Bar */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                {active ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{t('activeAccount', 'Active Account')}</span>
                  </span>
                ) : isSwitchingThis ? (
                  <span className="inline-flex items-center gap-1 font-bold text-gov-700">
                    <Loader2 className="w-3 h-3 animate-spin shrink-0" />
                    <span>{t('switching', 'Switching...')}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-500 group-hover:text-gov-700 transition-colors">
                    <span>{t('clickToSwitch', 'Click to switch')}</span>
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

