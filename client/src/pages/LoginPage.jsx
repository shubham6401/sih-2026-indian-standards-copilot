import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { DEMO_PERSONAS } from '../config/roleConfig';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Try demo credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemoAccount = async (persona) => {
    setEmail(persona.email);
    setPassword(persona.password);
    setError('');
    setLoading(true);

    try {
      await login(persona.email, persona.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Demo authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-gov-700 text-white flex items-center justify-center mx-auto shadow-md">
          <Shield className="w-6 h-6 text-amber-400" />
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight font-outfit">
          Sign In to Procurement Engine
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Official Decision Support Portal for Indian Standards & BIS Compliance
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-slate-200 sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gov-500"
                  placeholder="officer@department.gov.in"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-gov-600 hover:text-gov-800"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gov-500"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Official SIH 2026 Demo Accounts Section */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gov-800 bg-gov-100 px-2 py-0.5 rounded border border-gov-200">
                  SIH 2026 Evaluation
                </span>
                <h3 className="text-xs font-black text-slate-900 mt-1 uppercase tracking-wider font-outfit">
                  Role-Based Demo Accounts
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Pass: Demo@12345</span>
            </div>

            <div className="space-y-2.5">
              {DEMO_PERSONAS.map((persona) => (
                <div
                  key={persona.email}
                  className="p-3 rounded-xl bg-slate-50/90 hover:bg-slate-100/80 border border-slate-200/90 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{persona.name}</span>
                      <Badge variant={persona.badgeVariant} size="xs">
                        {persona.role}
                      </Badge>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {persona.organization}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {persona.email}
                    </div>
                  </div>

                  <Button
                    size="xs"
                    variant="secondary"
                    className="shrink-0 font-bold self-start sm:self-auto"
                    loading={loading && email === persona.email}
                    onClick={() => handleUseDemoAccount(persona)}
                  >
                    Use Demo Account
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-gov-600 hover:text-gov-800 underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
