import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChevronRight,
  Shield,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { normalizeRole, ROLE_CONFIG } from '../../config/roleConfig';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  // Close drawer on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const userRoleKey = normalizeRole(user?.role);
  const currentRoleConfig = ROLE_CONFIG[userRoleKey] || ROLE_CONFIG.procurement_officer;
  const navSections = currentRoleConfig.navSections || [];

  return (
    <>
      {/* Dark Translucent Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Left Navigation Drawer (280px width) */}
      <aside
        id="app-navigation-drawer"
        aria-label="Navigation drawer"
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] max-w-[85vw] bg-white shadow-2xl border-r border-slate-200 flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header with Title and Close X Button */}
        <div className="h-16 px-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gov-600 to-gov-800 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight font-outfit block">
                BIS Copilot
              </span>
              <span className="text-[10px] text-gov-600 font-semibold block -mt-0.5">
                {currentRoleConfig.displayName}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Close navigation"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Role-Based Navigation List */}
        <div className="p-3 flex-1 overflow-y-auto space-y-4">
          {navSections.map((section, sIdx) => (
            <div key={section.title || sIdx} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {section.title}
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all group ${
                        isActive
                          ? 'bg-gov-50 text-gov-800 font-bold border-l-4 border-gov-600 shadow-2xs'
                          : item.highlight
                          ? 'text-gov-800 bg-amber-50/80 hover:bg-amber-100 font-semibold border border-amber-200/80'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors shrink-0 ${
                          item.highlight ? 'text-amber-600' : 'text-slate-500 group-hover:text-gov-600'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity" />
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Drawer Footer with Role Badge and Profile */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/80 shrink-0">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Authorized Officer'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.organization || 'Government of India'}</p>
            </div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-gov-100 text-gov-800 shrink-0">
              {currentRoleConfig.badgeTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
