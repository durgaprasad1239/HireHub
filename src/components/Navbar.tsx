import React, { useState } from 'react';
import { UserPersona, AuthUser } from '../types';
import { Briefcase, CheckCircle2, Moon, Sun, ShieldCheck, UserCheck, Plus, BookOpen, LogIn, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentTab: 'jobs' | 'ats' | 'my-applications';
  onSelectTab: (tab: 'jobs' | 'ats' | 'my-applications') => void;
  persona: UserPersona;
  onTogglePersona: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenPostJob: () => void;
  onOpenQATestSuite: () => void;
  onOpenStudentGuide: () => void;
  savedJobsCount: number;
  activeApplicationsCount: number;
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  persona,
  onTogglePersona,
  darkMode,
  onToggleDarkMode,
  onOpenPostJob,
  onOpenQATestSuite,
  onOpenStudentGuide,
  activeApplicationsCount,
  currentUser,
  onOpenAuthModal,
  onLogout
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('jobs')}
          className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-xl tracking-tight whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
            H
          </div>
          <span className="font-display">HIRE-HUB</span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('jobs')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'jobs'
                ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Find Jobs
          </button>

          <button
            onClick={() => onSelectTab('ats')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'ats'
                ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Recruiter ATS
          </button>

          <button
            onClick={() => onSelectTab('my-applications')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              currentTab === 'my-applications'
                ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Applications
            {activeApplicationsCount > 0 && (
              <span className="ml-1.5 text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                ({activeApplicationsCount})
              </span>
            )}
          </button>

          <button
            onClick={onOpenQATestSuite}
            className="whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
            title="Functional Flow Verification & Usability Test Suite"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Flow QA Suite</span>
          </button>

          <button
            onClick={onOpenStudentGuide}
            className="whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            title="Student Presentation Architecture & Viva Guide"
          >
            <BookOpen className="w-4 h-4" />
            <span>Demo & Viva Guide</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action & User Session */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* User Profile & Auth Trigger */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs text-left"
              >
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div className="hidden sm:block truncate max-w-[120px]">
                  <div className="font-bold text-slate-900 dark:text-white truncate leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-400 capitalize">
                    {currentUser.role === 'recruiter' ? 'Recruiter' : 'Candidate'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-50 text-xs space-y-1"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white">{currentUser.name}</div>
                    <div className="text-slate-400 truncate text-[11px] font-mono">{currentUser.email}</div>
                    {currentUser.company && (
                      <div className="text-blue-600 dark:text-blue-400 text-[11px] mt-0.5">{currentUser.company}</div>
                    )}
                  </div>

                  <button
                    onClick={onTogglePersona}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between"
                  >
                    <span>Switch Role</span>
                    <span className="font-mono text-[10px] font-bold text-blue-600 uppercase">
                      {currentUser.role === 'recruiter' ? 'To Seeker' : 'To Recruiter'}
                    </span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="w-full text-left p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle visual theme"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          {persona === 'recruiter' ? (
            <button
              onClick={onOpenPostJob}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Vacancy</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('jobs')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Explore Roles</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
