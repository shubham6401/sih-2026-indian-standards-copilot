import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  User,
  Mail,
  Lock,
  Building,
  ArrowRight,
  Loader2,
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, register, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: 'Procurement Officer',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    {
      value: 'Procurement Officer',
      label: 'Procurement Officer',
      desc: 'Analyze tenders and identify applicable Indian Standards.'
    },
    {
      value: 'Government Department',
      label: 'Government Department',
      desc: 'Manage department-level procurement intelligence & QCO mandates.'
    },
    {
      value: 'PSU',
      label: 'Public Sector Undertaking (PSU)',
      desc: 'Analyze and monitor PSU technical procurement compliance.'
    },
    {
      value: 'Organization/Admin',
      label: 'Organization / Admin',
      desc: 'Manage platform users, standards dataset, and system activity.'
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRoleSelect = (roleValue) => {
    setFormData({ ...formData, role: roleValue });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedOrg = formData.organization.trim();

    if (!trimmedName || !trimmedEmail || !trimmedOrg) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: trimmedName,
        email: trimmedEmail,
        organization: trimmedOrg,
        role: formData.role,
        password: formData.password
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
          <div className="w-10 h-10 rounded-xl bg-gov-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight font-outfit">
            Anveshak
          </span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight font-outfit">
          Register Procurement Account
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
          Create an enterprise profile for automated Indian Standards compliance, tender gap detection, and statutory QCO verification.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-7 px-5 sm:px-8 shadow-md rounded-2xl border border-slate-200">
          {isAuthenticated && user && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-900 text-xs rounded-xl flex items-center justify-between gap-2">
              <div>
                <span>Signed in as <strong>{user.name}</strong> ({user.role})</span>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  Submitting this form will create and switch to your new profile.
                </p>
              </div>
              <Link
                to="/dashboard"
                className="px-2.5 py-1 bg-white border border-blue-300 hover:bg-blue-100 rounded-lg font-bold text-[11px] text-blue-900 shadow-2xs shrink-0"
              >
                Dashboard →
              </Link>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                  placeholder="e.g. Sh. Rajesh Kumar"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Official Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                  placeholder="officer@cpwd.gov.in"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Organization / Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Organization / Department <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                  placeholder="e.g. Central Public Works Department (CPWD)"
                />
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Designated Role with Rich Descriptions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Designated Stakeholder Role <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roles.map((r) => {
                  const isSelected = formData.role === r.value;
                  return (
                    <div
                      key={r.value}
                      onClick={() => handleRoleSelect(r.value)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gov-50/70 border-gov-600 ring-2 ring-gov-600/20 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="font-bold text-xs text-slate-900 leading-snug">
                          {r.label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-gov-600 shrink-0 mt-0.5" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-5 text-center text-xs text-slate-500">
            Already have an active account?{' '}
            <Link to="/login" className="font-bold text-gov-600 hover:text-gov-800 underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
