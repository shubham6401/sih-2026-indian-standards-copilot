import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  UploadCloud,
  History,
  Compass,
  BookmarkCheck,
  FileSpreadsheet,
  Settings,
  Workflow,
  HelpCircle,
  ChevronRight,
  Shield,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

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

  const navItems = [
    { label: t('dashboard') || 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'New AI Analysis', path: '/analysis/new', icon: Sparkles, highlight: true },
    { label: t('tenderUpload') || 'Upload Tender', path: '/tender/upload', icon: UploadCloud },
    { label: t('analysisHistory') || 'Analysis History', path: '/history', icon: History },
    { label: t('standardsExplorer') || 'Standards Explorer', path: '/explorer', icon: Compass },
    { label: t('savedStandards') || 'Saved Standards', path: '/saved', icon: BookmarkCheck },
    { label: t('reports') || 'Reports', path: '/reports', icon: FileSpreadsheet },
    { label: 'Copilot Architecture', path: '/architecture', icon: Workflow },
    { label: 'Evaluator Questions & Defense', path: '/evaluator-faq', icon: HelpCircle },
    { label: t('settings') || 'Settings', path: '/settings', icon: Settings },
  ];

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
                Indian Standards AI
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

        {/* Scrollable Navigation List */}
        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </div>

          {navItems.map((item) => {
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

        {/* Drawer Footer: User Profile & Logout */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70 shrink-0">
          <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gov-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {user?.name?.charAt(0) || 'P'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Procurement Officer'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.organization || 'CPWD / BIS Portal'}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Sign out of system"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout') || 'Sign Out'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
