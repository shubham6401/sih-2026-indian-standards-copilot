import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { ScrollToTop } from '../common/ScrollToTop';
import { useAnalysis } from '../../context/AnalysisContext';

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toastMessage } = useAnalysis();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <ScrollToTop />
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex w-full">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area - Full width with clean responsive padding */}
        <main className="flex-1 min-w-0 w-full transition-all duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {/* Disclaimer Callout at top of workspace */}
            <DisclaimerBanner compact />

            {/* Toast Feedback - Top-right on desktop, centered on mobile */}
            {toastMessage && (
              <div
                role="status"
                aria-live="polite"
                className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm animate-fade-in shadow-2xl"
              >
                <div
                  className={`px-4 py-3 rounded-xl border text-xs font-bold text-white flex items-center gap-2.5 shadow-lg ${
                    toastMessage.type === 'error'
                      ? 'bg-rose-600 border-rose-700'
                      : toastMessage.type === 'info'
                      ? 'bg-sky-700 border-sky-800'
                      : 'bg-emerald-600 border-emerald-700'
                  }`}
                >
                  <span className="leading-snug">{toastMessage.msg}</span>
                </div>
              </div>
            )}

            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
