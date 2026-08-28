import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Bell,
  User as UserIcon,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Database,
  Workflow
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../common/LanguageToggle';
import { KnowledgeBaseTransparencyModal } from '../analysis/KnowledgeBaseTransparencyModal';

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showKbModal, setShowKbModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-sm">
        {/* Top Government Banner */}
        <div className="bg-gov-900 text-white text-[11px] px-4 py-1 flex items-center justify-between border-b border-gov-800">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-400">Government of India / National Procurement Copilot</span>
              <span className="hidden md:inline text-slate-400">|</span>
              <span className="hidden md:inline text-slate-300">Bureau of Indian Standards (BIS) Aligned</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowKbModal(true)}
                className="text-amber-300 hover:text-white inline-flex items-center gap-1 text-[10px] font-bold"
              >
                <Database className="w-2.5 h-2.5" />
                <span>Knowledge Base Info</span>
              </button>
              <a
                href="https://manakonline.in"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-white inline-flex items-center gap-1 text-[10px]"
              >
                e-BIS Manakonline <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gov-600 to-gov-800 flex items-center justify-center text-white shadow-md shadow-gov-900/10 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight font-outfit">
                    BIS Standards Copilot
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gov-50 text-gov-700 border border-gov-200 px-1.5 py-0.2 rounded">
                    SIH 2026
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                  AI Procurement Intelligence & Gap Analysis Engine
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Quick search button */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <button
              onClick={() => navigate('/explorer')}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 rounded-xl text-xs text-slate-500 transition-colors text-left"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search Indian Standards (e.g. IS 10322, Cement, Pumps)...</span>
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded shadow-sm">
                /
              </kbd>
            </button>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/architecture"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              <Workflow className="w-3.5 h-3.5 text-gov-600" />
              <span>Architecture</span>
            </Link>

            <Link
              to="/analysis/new"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gov-600 hover:bg-gov-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>New Analysis</span>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gov-600 rounded-full ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900">Procurement Alerts</h4>
                    <span className="text-[10px] bg-gov-50 text-gov-700 px-1.5 py-0.5 rounded font-semibold">2 New</span>
                  </div>
                  <div className="py-2 space-y-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="font-semibold text-slate-800 text-[11px]">DPIIT Quality Control Order Update</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Mandatory certification updated for Electrical Appliances & Footwear.</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="font-semibold text-slate-800 text-[11px]">LED Street Lighting Norms Reaffirmed</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">IS 10322 (Part 5/Sec 3) benchmark guidelines updated.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User profile menu */}
            <div className="relative">
              {user ? (
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gov-100 text-gov-800 flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div className="hidden md:block text-left pr-1">
                    <p className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[120px]">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[120px]">{user.organization || user.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                >
                  Sign In
                </Link>
              )}

              {showProfileMenu && user && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-gov-50 text-gov-700 px-2 py-0.5 rounded">
                      {user.role}
                    </span>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/architecture"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    System Architecture
                  </Link>
                  <Link
                    to="/history"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Analysis History
                  </Link>
                  <Link
                    to="/saved"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Saved Standards
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Knowledge Base Modal */}
      <KnowledgeBaseTransparencyModal
        isOpen={showKbModal}
        onClose={() => setShowKbModal(false)}
      />
    </>
  );
};
