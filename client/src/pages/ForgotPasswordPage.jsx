import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-gov-700 text-white flex items-center justify-center mx-auto shadow-md">
          <Shield className="w-6 h-6 text-amber-400" />
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight font-outfit">
          Reset Portal Password
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Enter your official government email to receive password reset instructions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-slate-200 sm:px-10">
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Reset Link Dispatched</h4>
              <p className="text-xs text-slate-600">
                If an official account exists for <strong>{email}</strong>, a secure password reset token has been transmitted.
              </p>
              <Link to="/login" className="inline-block mt-4 text-xs font-bold text-gov-600 hover:text-gov-800">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registered Official Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-gov-500"
                    placeholder="officer@cpwd.gov.in"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Send Reset Instructions
              </Button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs text-slate-500 hover:text-slate-700 inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
