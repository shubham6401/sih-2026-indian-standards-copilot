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
import { useLanguage } from '../context/LanguageContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, register, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organizationName: '',
    accountType: 'procurement_officer',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accountTypes = [
    {
      value: 'procurement_officer',
      role: 'Procurement Officer',
      label: 'Procurement Officer',
      labelKey: 'procurementOfficerRole',
      desc: 'Analyze tenders and identify applicable Indian Standards.',
      descKey: 'Analyze tenders and identify applicable Indian Standards.',
      orgLabel: 'Organization / Department',
      orgPlaceholder: 'e.g. Central Public Works Department (CPWD)'
    },
    {
      value: 'government_department',
      role: 'Government Department',
      label: 'Government Department',
      labelKey: 'govtDeptRole',
      desc: 'Manage department-level procurement intelligence and QCO mandates.',
      descKey: 'Manage department-level procurement intelligence and QCO mandates.',
      orgLabel: 'Department Name',
      orgPlaceholder: 'e.g. Ministry of Railways'
    },
    {
      value: 'psu',
      role: 'PSU',
      label: 'Public Sector Undertaking (PSU)',
      labelKey: 'psuRole',
      desc: 'Analyze and monitor PSU technical procurement compliance.',
      descKey: 'Analyze and monitor PSU technical procurement compliance.',
      orgLabel: 'PSU Name',
      orgPlaceholder: 'e.g. Bharat Heavy Electricals Limited (BHEL)'
    },
    {
      value: 'organization_admin',
      role: 'Organization/Admin',
      label: 'Organization / Admin',
      labelKey: 'adminRole',
      desc: 'Manage organization users, standards compliance, and system activity.',
      descKey: 'Manage organization users, standards compliance, and system activity.',
      orgLabel: 'Organization Name',
      orgPlaceholder: 'e.g. ABC Infrastructure Pvt. Ltd.'
    }
  ];

  const currentAccountType = accountTypes.find(t => t.value === formData.accountType) || accountTypes[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleAccountTypeSelect = (typeValue) => {
    setFormData(prev => ({ ...prev, accountType: typeValue }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedOrg = formData.organizationName.trim();
    const selectedAccountType = formData.accountType;

    if (!trimmedName) {
      setError(t('errNameRequired', 'Full Name cannot be empty.'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setError(t('errValidEmailRequired', 'Please provide a valid official email address.'));
      return;
    }

    if (!trimmedOrg) {
      setError(t('errOrgRequired', `Please provide your organization or department name.`));
      return;
    }

    if (!selectedAccountType) {
      setError(t('errAccountTypeRequired', 'Please select an Account Type.'));
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError(t('errPasswordLength', 'Password must be at least 6 characters long.'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('errPasswordMismatch', 'Passwords do not match. Please verify.'));
      return;
    }

    setLoading(true);

    try {
      await register({
        name: trimmedName,
        email: trimmedEmail,
        organizationName: trimmedOrg,
        organization: trimmedOrg,
        accountType: selectedAccountType,
        role: currentAccountType.role,
        password: formData.password
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || t('Registration failed. Please check your details.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
          <div className="w-10 h-10 rounded-lg bg-gov-700 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform border border-gov-800">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight font-outfit">
            Anveshak
          </span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight font-outfit">
          {t('registerHeader', 'Register Procurement Account')}
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
          {t('registerSubheader', 'Create an enterprise profile for automated Indian Standards compliance, tender gap detection, and statutory QCO verification.')}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-7 px-5 sm:px-8 shadow-2xs rounded-lg border border-slate-200">
          {isAuthenticated && user && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-900 text-xs rounded-md flex items-center justify-between gap-2">
              <div>
                <span>{t('Signed in as')} <strong>{user.name}</strong> ({t(user.role)})</span>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  {t('Submitting this form will create and switch to your new profile.')}
                </p>
              </div>
              <Link
                to="/dashboard"
                className="px-2.5 py-1 bg-white border border-blue-300 hover:bg-blue-100 rounded font-bold text-[11px] text-blue-900 shadow-2xs shrink-0"
              >
                {t('Dashboard')} →
              </Link>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-md flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('fullNameLabel', 'Full Name *')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                  placeholder="e.g. Sh. Rajesh Kumar"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Official Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('officialEmailLabelReq', 'Official Email Address *')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                  placeholder="officer@cpwd.gov.in"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Dynamic Organization / Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t(currentAccountType.orgLabel)} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                  placeholder={currentAccountType.orgPlaceholder}
                />
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Account Type with Selection Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t('accountTypeLabel', 'Account Type *')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {accountTypes.map((tItem) => {
                  const isSelected = formData.accountType === tItem.value;
                  return (
                    <div
                      key={tItem.value}
                      id={`account-type-${tItem.value}`}
                      data-account-type={tItem.value}
                      onClick={() => handleAccountTypeSelect(tItem.value)}
                      className={`p-3 rounded-md border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gov-50/70 border-gov-600 ring-1 ring-gov-600/30 shadow-2xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="font-bold text-xs text-slate-900 leading-snug">
                          {t(tItem.labelKey || tItem.label)}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-gov-600 shrink-0 mt-0.5" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {t(tItem.descKey || tItem.desc)}
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
                  {t('passwordLabelReq', 'Password *')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-md border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('confirmPasswordLabel', 'Confirm Password *')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-9 pr-9 py-2 text-xs rounded-md border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label={showConfirmPassword ? t('form.hidePassword', 'Hide password') : t('form.showPassword', 'Show password')}
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
                className="w-full py-2.5 px-4 bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('creatingAccount', 'Creating Account...')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('createAccountButton', 'Complete Registration')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-5 text-center text-xs text-slate-500">
            {t('alreadyHaveAccount', 'Already have an active account?')}{' '}
            <Link to="/login" className="font-bold text-gov-600 hover:text-gov-800 underline">
              {t('signInHere', 'Sign in here')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
