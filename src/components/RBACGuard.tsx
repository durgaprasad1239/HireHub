import React from 'react';
import { AuthUser } from '../types';
import { ShieldAlert, UserCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

interface RBACGuardProps {
  currentUser: AuthUser | null;
  requiredRole: 'recruiter' | 'seeker';
  onSwitchToDemoRecruiter: () => void;
  onOpenAuthModal: () => void;
  onBackToJobs: () => void;
}

export const RBACGuard: React.FC<RBACGuardProps> = ({
  currentUser,
  requiredRole,
  onSwitchToDemoRecruiter,
  onOpenAuthModal,
  onBackToJobs
}) => {
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-center space-y-5 transition-colors">
      
      <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
        <Lock className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
          RBAC Security Guard · Access Restricted
        </span>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
          Recruiter Authorization Required
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          You are currently signed in as <strong className="text-slate-800 dark:text-slate-200">{currentUser?.name || 'Guest'}</strong> ({currentUser?.role === 'seeker' ? 'Job Seeker' : 'Public Visitor'}).
        </p>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 text-left space-y-2">
        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>Why is this screen shown?</span>
        </div>
        <p className="leading-relaxed">
          In production recruiting platforms, candidate resumes, contact information, internal scorecard ratings, interview notes, and compensation offers are confidential and protected by <strong>Role-Based Access Control (RBAC)</strong>. Only verified Recruiters and Hiring Managers are permitted to view and transition candidate pipelines.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onSwitchToDemoRecruiter}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
        >
          <UserCheck className="w-4 h-4" />
          <span>Switch to Recruiter Demo (Sarah Jenkins)</span>
        </button>

        <button
          onClick={onOpenAuthModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span>Sign In / Register</span>
        </button>
      </div>

      <div className="pt-2">
        <button
          onClick={onBackToJobs}
          className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Job Discovery</span>
        </button>
      </div>

    </div>
  );
};
