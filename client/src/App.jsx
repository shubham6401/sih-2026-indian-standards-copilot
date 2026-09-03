import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AnalysisProvider } from './context/AnalysisContext';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { NewAnalysisPage } from './pages/NewAnalysisPage';
import { TenderUploadPage } from './pages/TenderUploadPage';
import { RecommendationResultPage } from './pages/RecommendationResultPage';
import { StandardsExplorerPage } from './pages/StandardsExplorerPage';
import { StandardDetailsPage } from './pages/StandardDetailsPage';
import { AnalysisHistoryPage } from './pages/AnalysisHistoryPage';
import { SavedStandardsPage } from './pages/SavedStandardsPage';
import { ReportsPage } from './pages/ReportsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { EvaluatorQuestionsPage } from './pages/EvaluatorQuestionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminStandardsPage } from './pages/AdminStandardsPage';
import { AdminAuditLogsPage } from './pages/AdminAuditLogsPage';
import { AdminDemoManagementPage } from './pages/AdminDemoManagementPage';
import { RoleProtectedRoute } from './components/common/RoleProtectedRoute';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <AnalysisProvider>
            <Routes>
              {/* Public Landing & Auth Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Protected Dashboard & Operations Layout */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/analysis/new" element={<NewAnalysisPage />} />
                <Route path="/tender/upload" element={<TenderUploadPage />} />
                <Route path="/analysis/result/:id" element={<RecommendationResultPage />} />
                <Route path="/analysis/:id" element={<RecommendationResultPage />} />
                <Route path="/reports/:id" element={<RecommendationResultPage />} />
                <Route path="/explorer" element={<StandardsExplorerPage />} />
                <Route path="/standards/:id" element={<StandardDetailsPage />} />
                <Route path="/history" element={<AnalysisHistoryPage />} />
                <Route path="/saved" element={<SavedStandardsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/architecture" element={<ArchitecturePage />} />
                <Route path="/evaluator-faq" element={<EvaluatorQuestionsPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* Role-Protected Admin Routes */}
                <Route
                  path="/admin/users"
                  element={
                    <RoleProtectedRoute allowedRoles={['admin', 'Organization/Admin']}>
                      <AdminUsersPage />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/admin/standards"
                  element={
                    <RoleProtectedRoute allowedRoles={['admin', 'Organization/Admin']}>
                      <AdminStandardsPage />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/admin/audit-logs"
                  element={
                    <RoleProtectedRoute allowedRoles={['admin', 'Organization/Admin']}>
                      <AdminAuditLogsPage />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/admin/demo-data"
                  element={
                    <RoleProtectedRoute allowedRoles={['admin', 'Organization/Admin']}>
                      <AdminDemoManagementPage />
                    </RoleProtectedRoute>
                  }
                />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnalysisProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
