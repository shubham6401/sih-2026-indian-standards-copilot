import React from 'react';
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
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { label: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { label: 'New AI Analysis', path: '/analysis/new', icon: Sparkles, highlight: true },
    { label: t('tenderUpload'), path: '/tender/upload', icon: UploadCloud },
    { label: t('analysisHistory'), path: '/history', icon: History },
    { label: t('standardsExplorer'), path: '/explorer', icon: Compass },
    { label: t('savedStandards'), path: '/saved', icon: BookmarkCheck },
    { label: t('reports'), path: '/reports', icon: FileSpreadsheet },
    { label: 'Copilot Architecture', path: '/architecture', icon: Workflow },
    { label: 'Evaluator Questions & Defense', path: '/evaluator-faq', icon: HelpCircle },
    { label: t('settings'), path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-24 bottom-0 left-0 z-30 w-64 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Procurement Operations
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gov-50 text-gov-700 font-bold border border-gov-200/60 shadow-xs'
                      : item.highlight
                      ? 'text-gov-700 bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
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

        {/* User Card & Logout */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gov-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {user?.name?.charAt(0) || 'P'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Officer'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.role || 'CPWD Officer'}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
