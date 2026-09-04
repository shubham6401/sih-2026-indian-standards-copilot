import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { DEMO_PERSONAS } from '../config/roleConfig';

export const LoginPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState(() => location.state?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(() => location.state?.message || '');
  const { login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError(t('errEmailRequired', 'Please provide your official email address.'));
      return;
    }
    if (!password) {
      setError(t('errPasswordRequired', 'Please provide your password.'));
      return;
    }

    setLoading(true);

    try {
      await login(cleanEmail, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || t('errInvalidCredentials', 'Invalid official email or password.'));
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
      setError(err.message || t('errDemoAuthFailed', 'Demo authentication failed.'));
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
          {t('signInHeader', 'Sign In to Procurement Engine')}
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          {t('signInSubheader', 'Official Decision Support Portal for Indian Standards & BIS Compliance')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-slate-200 sm:px-10">
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('officialEmailLabel', 'Official Email Address')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
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
                  {t('passwordLabel', 'Password')}
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-gov-600 hover:text-gov-800"
                >
                  {t('forgotPasswordLink', 'Forgot password?')}
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gov-500"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? t('form.hidePassword', 'Hide password') : t('form.showPassword', 'Show password')}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
            >
              {t('signInButton', 'Sign In to Dashboard')}
            </Button>
          </form>

          {/* Official SIH 2026 Demo Accounts Section (1 Per Role) */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gov-800 bg-gov-100 px-2 py-0.5 rounded border border-gov-200">
                  {t('accountPerRole', 'SIH 2026 Evaluation • 1 Account Per Role')}
                </span>
                <h3 className="text-xs font-black text-slate-900 mt-1 uppercase tracking-wider font-outfit">
                  {t('demoAccountsTitle', `Role-Based Demo Accounts (${DEMO_PERSONAS.length} Roles)`)}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-gov-700 bg-gov-50 px-2 py-0.5 rounded border border-gov-200 font-bold">
                {t('passDemo', 'Pass: Demo@12345')}
              </span>
            </div>

            <div className="space-y-2.5">
              {DEMO_PERSONAS.map((persona) => (
                <div
                  key={persona.email}
                  className="p-3 rounded-xl bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/90 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-gov-300"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{persona.name}</span>
                      <Badge variant={persona.badgeVariant} size="xs">
                        {t(persona.role)}
                      </Badge>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                      {persona.organization}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {t(persona.description)}
                    </div>
                    <div className="text-[10px] font-mono text-gov-600 mt-0.5">
                      {persona.email}
                    </div>
                  </div>

                  <Button
                    id={`demo-btn-${persona.roleKey}`}
                    data-demo-email={persona.email}
                    size="xs"
                    variant="secondary"
                    className="shrink-0 font-bold self-start sm:self-auto hover:bg-gov-600 hover:text-white"
                    loading={loading && email === persona.email}
                    onClick={() => handleUseDemoAccount(persona)}
                  >
                    {t('useDemoAccountBtn', 'Use Demo Account')}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            {t('dontHaveAccount', "Don't have an account?")}{' '}
            <Link to="/register" className="font-bold text-gov-600 hover:text-gov-800 underline">
              {t('registerHere', 'Register here')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
