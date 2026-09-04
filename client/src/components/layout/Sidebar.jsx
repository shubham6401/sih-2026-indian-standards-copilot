import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  ChevronRight,
  Shield,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { normalizeRole, ROLE_CONFIG } from '../../config/roleConfig';
import { LanguageToggle } from '../common/LanguageToggle';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  // Close mobile drawer on ESC key press
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

  const userRoleKey = normalizeRole(user?.accountType || user?.role);
  const currentRoleConfig = ROLE_CONFIG[userRoleKey] || ROLE_CONFIG.procurement_officer;
  const navSections = currentRoleConfig.navSections || [];

  const renderNavContent = (isMobile = false) => (
    <div className="flex-1 overflow-y-auto p-3 space-y-4">
      {navSections.map((section, sIdx) => (
        <div key={section.title || sIdx} className="space-y-0.5">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {t(section.titleKey || section.title)}
          </div>

          {section.items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2.5 py-2 rounded-md text-xs transition-colors group ${
                    isActive
                      ? 'bg-gov-100/70 text-gov-900 font-bold border-l-3 border-gov-700'
                      : item.highlight
                      ? 'text-gov-900 bg-amber-50 hover:bg-amber-100/80 font-semibold border border-amber-200/80'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      item.highlight ? 'text-amber-700' : 'text-slate-500 group-hover:text-gov-800'
                    }`}
                  />
                  <span className="truncate">{t(item.labelKey || item.label)}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </NavLink>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderFooter = (isMobile = false) => (
    <div className="p-3 border-t border-slate-200 bg-slate-50 shrink-0">
      {user ? (
        <>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.organizationName || user.organization || 'Government of India'}</p>
            </div>
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-gov-100 text-gov-800 border border-gov-200 shrink-0">
              {t(currentRoleConfig.badgeTitle)}
            </span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout', 'Sign Out')}</span>
          </button>
        </>
      ) : (
        <div className="space-y-1.5">
          <Link
            to="/login"
            onClick={isMobile ? onClose : undefined}
            className="w-full flex items-center justify-center py-1.5 px-3 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            {t('signInToAccount', 'Sign In to Account')}
          </Link>
          <Link
            to="/register"
            onClick={isMobile ? onClose : undefined}
            className="w-full flex items-center justify-center py-1.5 px-3 rounded-md bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold transition-colors shadow-xs"
          >
            {t('registerNewProfile', 'Register New Profile')}
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 1. Desktop Persistent Enterprise Sidebar (Fixed Dock on lg: screens) */}
      <aside
        id="app-navigation-desktop-dock"
        aria-label="Desktop primary navigation"
        className="hidden lg:flex lg:flex-col w-60 shrink-0 border-r border-slate-200 bg-white min-h-[calc(100vh-3.75rem)]"
      >
        {/* Subtle Role Section Title */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span className="text-[11px] font-bold text-gov-900 uppercase tracking-wider truncate">
              {t(currentRoleConfig.roleKey || currentRoleConfig.displayName)}
            </span>
          </div>
        </div>

        {renderNavContent(false)}
        {renderFooter(false)}
      </aside>

      {/* 2. Mobile / Tablet Off-Canvas Drawer (Active when isOpen on <lg screens) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id="app-navigation-mobile-drawer"
        aria-label="Mobile navigation drawer"
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] max-w-[85vw] bg-white shadow-2xl border-r border-slate-200 flex flex-col transition-transform duration-200 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header with Title and Close X Button */}
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gov-800 flex items-center justify-center text-white shrink-0">
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-slate-950 text-sm tracking-tight block uppercase">
                ANVESHAK
              </span>
              <span className="text-[10px] text-gov-700 font-bold block -mt-0.5">
                {t(currentRoleConfig.roleKey || currentRoleConfig.displayName)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <LanguageToggle />
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Close navigation"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {renderNavContent(true)}
        {renderFooter(true)}
      </aside>
    </>
  );
};
