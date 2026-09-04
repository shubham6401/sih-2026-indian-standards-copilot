import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { ScrollToTop } from '../common/ScrollToTop';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { useAnalysis } from '../../context/AnalysisContext';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toastMessage } = useAnalysis();
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-2.5">
          <div className="w-8 h-8 border-3 border-gov-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-600 font-semibold">Verifying institutional credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <ScrollToTop />
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex w-full">
        {/* Dual-Mode Sidebar: Persistent Dock on Desktop, Drawer on Mobile */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Workstation Workspace */}
        <main className="flex-1 min-w-0 w-full p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-5">
            {/* Regulatory Disclaimer Banner */}
            <DisclaimerBanner compact />

            {/* Toast Feedback */}
            {toastMessage && (
              <div
                role="status"
                aria-live="polite"
                className="fixed top-18 right-4 sm:right-6 z-50 max-w-sm shadow-lg"
              >
                <div
                  className={`px-3.5 py-2.5 rounded-md border text-xs font-semibold text-white flex items-center gap-2 ${
                    toastMessage.type === 'error'
                      ? 'bg-rose-700 border-rose-800'
                      : toastMessage.type === 'info'
                      ? 'bg-gov-800 border-gov-900'
                      : 'bg-emerald-700 border-emerald-800'
                  }`}
                >
                  <span className="leading-snug">{toastMessage.msg}</span>
                </div>
              </div>
            )}

            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
