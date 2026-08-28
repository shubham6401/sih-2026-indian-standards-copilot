import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { useAnalysis } from '../../context/AnalysisContext';

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toastMessage } = useAnalysis();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 lg:pl-64 min-w-0 transition-all duration-200">
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Disclaimer Callout at top of workspace */}
            <DisclaimerBanner compact />

            {/* Toast Feedback */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 animate-bounce">
                <div
                  className={`px-4 py-3 rounded-xl shadow-xl border text-xs font-bold text-white flex items-center gap-2 ${
                    toastMessage.type === 'error'
                      ? 'bg-rose-600 border-rose-700'
                      : toastMessage.type === 'info'
                      ? 'bg-sky-700 border-sky-800'
                      : 'bg-emerald-600 border-emerald-700'
                  }`}
                >
                  <span>{toastMessage.msg}</span>
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
