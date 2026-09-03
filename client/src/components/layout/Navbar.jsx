import React, { useState, useEffect, useRef } from 'react';
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
import { normalizeRole, ROLE_CONFIG } from '../../config/roleConfig';

export const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout, switchRole } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showKbModal, setShowKbModal] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const userRoleKey = normalizeRole(user?.role);
  const currentRoleConfig = ROLE_CONFIG[userRoleKey] || ROLE_CONFIG.procurement_officer;
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'DPIIT Quality Control Order Update',
      desc: 'Mandatory certification updated for Electrical Appliances & Footwear.',
      time: 'Just now',
      unread: true,
      category: 'QCO Mandate',
      route: '/explorer?certification=Mandatory'
    },
    {
      id: 'notif-2',
      title: 'LED Street Lighting Norms Reaffirmed',
      desc: 'IS 10322 (Part 5/Sec 3) benchmark guidelines updated.',
      time: '1h ago',
      unread: true,
      category: 'Standards',
      route: '/standards/IS%2010322'
    },
    {
      id: 'notif-3',
      title: 'Cement Gazette Quality Mandate',
      desc: 'Mandatory BIS Scheme I license verification for IS 269:2015 active.',
      time: '3h ago',
      unread: false,
      category: 'Compliance',
      route: '/standards/IS%20269'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (notif) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    setShowNotifications(false);
    if (notif.route) {
      navigate(notif.route);
    }
  };

  const handleDismissNotification = (e, notifId) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  };

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-2xs">
        {/* Top Government Micro-Banner */}
        <div className="bg-gov-900 text-white text-[11px] px-3 sm:px-4 py-1 border-b border-gov-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <span className="font-semibold text-amber-400 shrink-0">National Procurement Copilot</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline text-slate-300 truncate">Bureau of Indian Standards (BIS) Aligned</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-[10px]">
              <button
                type="button"
                onClick={() => setShowKbModal(true)}
                className="hidden sm:inline-flex text-amber-300 hover:text-white items-center gap-1 font-bold transition-colors cursor-pointer"
                title="View Knowledge Base Details"
              >
                <Database className="w-2.5 h-2.5" />
                <span>Knowledge Base</span>
              </button>
              <a
                href="https://manakonline.in"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex text-slate-300 hover:text-white items-center gap-1 transition-colors"
              >
                e-BIS <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Main Application Header */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Universal 3-line Hamburger Menu Button + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="p-2 -ml-1 text-slate-700 hover:text-gov-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gov-500"
              aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
              title={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/dashboard" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gov-600 to-gov-800 flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base lg:text-lg tracking-tight font-outfit truncate">
                    BIS Copilot
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gov-50 text-gov-700 border border-gov-200 px-1.5 py-0.5 rounded shrink-0 hidden xs:inline-block">
                    SIH 2026
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium -mt-1 hidden md:block truncate">
                  AI Procurement Intelligence & Gap Analysis Engine
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Interactive Search Field (Desktop Only, hidden on mobile) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const term = navSearch.trim();
              if (term) {
                navigate(`/explorer?q=${encodeURIComponent(term)}`);
              } else {
                navigate('/explorer');
              }
            }}
            className="hidden md:flex items-center flex-1 max-w-md mx-4 relative"
          >
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search Indian Standards (IS 10322, Cement, Pumps)..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100/90 focus:bg-white border border-slate-200 focus:border-gov-500 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-500/20 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <kbd className="hidden lg:inline-block absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded shadow-2xs text-slate-500 pointer-events-none">
              ↵
            </kbd>
          </form>

          {/* Right: Actions, Notifications & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              to="/analysis/new"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gov-600 hover:bg-gov-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>New Analysis</span>
            </Link>

            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(prev => !prev);
                  setShowProfileMenu(false);
                }}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative cursor-pointer"
                title="Procurement notifications"
                aria-label="Procurement notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">Procurement Alerts</h4>
                      {unreadCount > 0 ? (
                        <span className="text-[10px] bg-gov-100 text-gov-800 px-2 py-0.5 rounded-full font-bold">
                          {unreadCount} New
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                          All caught up
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllRead}
                        className="text-[11px] font-semibold text-gov-700 hover:text-gov-900 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-xs">
                        No active procurement alerts
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2 group ${
                            n.unread
                              ? 'bg-gov-50/50 hover:bg-gov-50 border-gov-200/80 shadow-2xs'
                              : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-100'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-gov-600 shrink-0" />}
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gov-700 bg-white border border-gov-200 px-1.5 py-0.2 rounded">
                                {n.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium ml-auto">
                                {n.time}
                              </span>
                            </div>
                            <p className="font-bold text-slate-900 text-xs leading-snug group-hover:text-gov-800 transition-colors">
                              {n.title}
                            </p>
                            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                              {n.desc}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleDismissNotification(e, n.id)}
                            className="p-1 text-slate-300 hover:text-slate-600 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer shrink-0 mt-0.5"
                            title="Dismiss alert"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Menu */}
            <div className="relative" ref={profileRef}>
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(prev => !prev);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 sm:pl-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="User profile menu"
                  aria-label="User profile menu"
                >
                  <div className="w-7 h-7 rounded-lg bg-gov-100 text-gov-800 flex items-center justify-center font-bold text-xs shrink-0">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:block text-left pr-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[110px]">{user.name}</p>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded bg-gov-100 text-gov-800 shrink-0">
                        {currentRoleConfig.badgeTitle}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate max-w-[130px]">{user.organization || currentRoleConfig.displayName}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                >
                  Sign In
                </Link>
              )}

              {showProfileMenu && user && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-fade-in divide-y divide-slate-100">
                  <div className="px-4 py-2.5">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-gov-50 text-gov-700 border border-gov-200 shrink-0">
                        {currentRoleConfig.displayName}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{user.organization}</p>
                  </div>

                  {/* One-Click Demo Role Switcher */}
                  <div className="p-2 bg-slate-50/70">
                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                      Switch Demo Stakeholder Persona
                    </p>
                    <div className="space-y-1 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          switchRole('Procurement Officer');
                          setShowProfileMenu(false);
                          navigate('/dashboard');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          userRoleKey === 'procurement_officer'
                            ? 'bg-gov-100 text-gov-900 font-bold'
                            : 'hover:bg-slate-200/60 text-slate-700'
                        }`}
                      >
                        <span>Rajesh Kumar (CPWD)</span>
                        {userRoleKey === 'procurement_officer' && <span className="text-[10px] text-gov-700 font-extrabold">Active</span>}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          switchRole('Government Department');
                          setShowProfileMenu(false);
                          navigate('/dashboard');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          userRoleKey === 'government_department'
                            ? 'bg-gov-100 text-gov-900 font-bold'
                            : 'hover:bg-slate-200/60 text-slate-700'
                        }`}
                      >
                        <span>Priya Sharma (Public Works)</span>
                        {userRoleKey === 'government_department' && <span className="text-[10px] text-gov-700 font-extrabold">Active</span>}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          switchRole('PSU');
                          setShowProfileMenu(false);
                          navigate('/dashboard');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          userRoleKey === 'psu'
                            ? 'bg-gov-100 text-gov-900 font-bold'
                            : 'hover:bg-slate-200/60 text-slate-700'
                        }`}
                      >
                        <span>Amit Verma (Energy PSU)</span>
                        {userRoleKey === 'psu' && <span className="text-[10px] text-gov-700 font-extrabold">Active</span>}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          switchRole('Organization/Admin');
                          setShowProfileMenu(false);
                          navigate('/dashboard');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          userRoleKey === 'admin'
                            ? 'bg-gov-100 text-gov-900 font-bold'
                            : 'hover:bg-slate-200/60 text-slate-700'
                        }`}
                      >
                        <span>Anveshak Admin (Platform)</span>
                        {userRoleKey === 'admin' && <span className="text-[10px] text-gov-700 font-extrabold">Active</span>}
                      </button>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      Dashboard Overview
                    </Link>
                    {userRoleKey === 'admin' && (
                      <Link
                        to="/admin/users"
                        onClick={() => setShowProfileMenu(false)}
                        className="block px-4 py-2 text-xs text-gov-700 hover:bg-gov-50 font-bold"
                      >
                        User Directory (Admin)
                      </Link>
                    )}
                    <Link
                      to="/history"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      Analysis History
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      Settings
                    </Link>
                  </div>

                  <div className="p-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
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
