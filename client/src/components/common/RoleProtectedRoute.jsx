import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { normalizeRole, ROLE_CONFIG } from '../../config/roleConfig';
import { Button } from './Button';

export const RoleProtectedRoute = ({ allowedRoles = [], children }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRoleKey = normalizeRole(user.role);
  const normalizedAllowed = allowedRoles.map(r => normalizeRole(r));

  if (!normalizedAllowed.includes(userRoleKey)) {
    const config = ROLE_CONFIG[userRoleKey];
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 animate-fade-in text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            HTTP 403 • Access Denied
          </span>
          <h1 className="text-2xl font-black text-slate-900 font-outfit">
            Unauthorized Portal Area
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Your current account role <strong className="text-slate-900">({config?.displayName || user.role})</strong> does not have permission to access this administrative portal.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-600">
          <div className="font-bold text-slate-800">Authorized Role(s):</div>
          <ul className="list-disc list-inside space-y-0.5 text-slate-500">
            {allowedRoles.map(r => (
              <li key={r} className="font-medium text-slate-700">{r}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Home}
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return children;
};
