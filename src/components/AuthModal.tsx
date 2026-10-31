import React, { useState } from 'react';
import { AuthUser, UserPersona } from '../types';
import { DEMO_USERS } from '../data/authSeed';
import { X, Lock, Mail, User, Building2, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
  initialMode?: 'signin' | 'signup';
  suggestedRole?: UserPersona;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  initialMode = 'signin',
  suggestedRole
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserPersona>(suggestedRole || 'seeker');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (mode === 'signup' && !name.trim()) errs.name = 'Full name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (mode === 'signup' && role === 'recruiter' && !company.trim()) {
      errs.company = 'Company name is required for recruiter accounts.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const loggedInUser: AuthUser = {
      id: `user-${Date.now().toString().slice(-6)}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      role: role,
      title: title.trim() || (role === 'recruiter' ? 'Talent Acquisition Partner' : 'Software Professional'),
      company: role === 'recruiter' ? (company.trim() || 'Tech Enterprise') : undefined
    };

    onLogin(loggedInUser);
    onClose();
  };

  const handleQuickDemo = (demoRole: 'recruiter' | 'seeker') => {
    onLogin(DEMO_USERS[demoRole]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden transition-colors"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              H
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {mode === 'signin' ? 'Sign In to HIRE-HUB' : 'Create an Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Secure role-based recruitment ecosystem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Fast Demo Accounts Section */}
        <div className="p-4 px-6 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Instant Demo Logins (No Registration Required)
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemo('recruiter')}
              className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-xl text-left transition-all group"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/src/assets/images/avatar_recruiter_sarah_1793442334418.jpg"
                  alt="Sarah"
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="font-bold text-slate-900 dark:text-white truncate">Recruiter Demo</div>
                  <div className="text-[10px] text-slate-400 truncate">Sarah Jenkins</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleQuickDemo('seeker')}
              className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-xl text-left transition-all group"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/src/assets/images/avatar_candidate_alex_1793442334452.jpg"
                  alt="Alex"
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="font-bold text-slate-900 dark:text-white truncate">Candidate Demo</div>
                  <div className="text-[10px] text-slate-400 truncate">Alex Vance</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Standard Email/Password Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Mode Switcher */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-1.5 font-medium rounded-md transition-colors ${
                mode === 'signin' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-500'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 font-medium rounded-md transition-colors ${
                mode === 'signup' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' : 'text-slate-500'
              }`}
            >
              New Account
            </button>
          </div>

          {/* Role selector for registration */}
          {mode === 'signup' && (
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                Account Type / Persona *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('seeker')}
                  className={`p-2.5 text-center rounded-lg border font-medium transition-all ${
                    role === 'seeker'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`p-2.5 text-center rounded-lg border font-medium transition-all ${
                    role === 'recruiter'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Recruiter / HR
                </button>
              </div>
            </div>
          )}

          {/* Name Field (Sign Up only) */}
          {mode === 'signup' && (
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Jordan Taylor"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Company field (Recruiter only) */}
          {mode === 'signup' && role === 'recruiter' && (
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Company / Organization Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Apex Cloud Systems"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              {errors.company && <p className="text-red-500 mt-1">{errors.company}</p>}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
};
