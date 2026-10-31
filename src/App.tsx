import React, { useState, useEffect, useMemo } from 'react';
import { Job, Applicant, UserPersona, JobFilterState, ApplicationStage, QATestCase, AuthUser } from './types';
import { INITIAL_JOBS, INITIAL_APPLICANTS } from './data/seedData';
import { INITIAL_TEST_SUITES } from './services/testRunner';
import { DEMO_USERS } from './data/authSeed';
import { Navbar } from './components/Navbar';
import { JobSearchFilter } from './components/JobSearchFilter';
import { JobCard } from './components/JobCard';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplicationModal } from './components/ApplicationModal';
import { MyApplicationsView } from './components/MyApplicationsView';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { CandidateDetailModal } from './components/CandidateDetailModal';
import { JobPostingModal } from './components/JobPostingModal';
import { QATestSuiteModal } from './components/QATestSuiteModal';
import { StudentShowcaseGuide } from './components/StudentShowcaseGuide';
import { InterviewPrepModal } from './components/InterviewPrepModal';
import { OfferLetterModal } from './components/OfferLetterModal';
import { RecruitmentAnalyticsView } from './components/RecruitmentAnalyticsView';
import { AuthModal } from './components/AuthModal';
import { RBACGuard } from './components/RBACGuard';
import { Briefcase, Users, CheckCircle2, ShieldCheck, Sparkles, Building2, TrendingUp, Search, BookOpen, GraduationCap, Lock } from 'lucide-react';

const STORAGE_KEYS = {
  JOBS: 'hirehub_jobs_v1',
  APPLICANTS: 'hirehub_applicants_v1',
  SAVED_JOBS: 'hirehub_saved_jobs_v1',
  THEME: 'hirehub_theme_v1',
  AUTH: 'hirehub_auth_user_v1'
};

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [darkMode]);

  // Auth User Session State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Default to candidate demo account for immediate usability
    return DEMO_USERS.seeker;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }, [currentUser]);

  // Data state
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_JOBS;
  });

  const [applicants, setApplicants] = useState<Applicant[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICANTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_APPLICANTS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return ['job-101'];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  // App navigation state
  const [currentTab, setCurrentTab] = useState<'jobs' | 'ats' | 'my-applications'>('jobs');
  const persona: UserPersona = currentUser ? currentUser.role : 'seeker';

  const handleTogglePersona = () => {
    if (currentUser?.role === 'seeker') {
      setCurrentUser(DEMO_USERS.recruiter);
      setCurrentTab('ats');
    } else {
      setCurrentUser(DEMO_USERS.seeker);
      setCurrentTab('jobs');
    }
  };

  // Filter state for Job Search
  const [filters, setFilters] = useState<JobFilterState>({
    search: '',
    department: '',
    workMode: '',
    experienceLevel: '',
    minSalary: 0,
    selectedTag: ''
  });

  // Modals state
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isQAModalOpen, setIsQAModalOpen] = useState(false);

  // Student & Recruiter Modals
  const [isStudentGuideOpen, setIsStudentGuideOpen] = useState(false);
  const [selectedJobForPrep, setSelectedJobForPrep] = useState<Job | null>(null);
  const [selectedApplicantForOfferDoc, setSelectedApplicantForOfferDoc] = useState<Applicant | null>(null);
  const [isRecruiterAnalyticsOpen, setIsRecruiterAnalyticsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Recruiter specific selection
  const [recruiterJobFilter, setRecruiterJobFilter] = useState<string>('all');

  // QA Test Cases State
  const [testCases, setTestCases] = useState<QATestCase[]>(INITIAL_TEST_SUITES);

  // Available unique tags
  const availableTags = useMemo(() => {
    const all = jobs.flatMap(j => j.tags);
    return Array.from(new Set(all));
  }, [jobs]);

  // Filtered jobs list
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (job.status !== 'active') return false;

      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        const matchesTags = job.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesDesc && !matchesTags) return false;
      }

      if (filters.department && job.department !== filters.department) {
        return false;
      }

      if (filters.workMode && job.workMode !== filters.workMode) {
        return false;
      }

      if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
        return false;
      }

      if (filters.minSalary > 0 && job.salaryMax < filters.minSalary) {
        return false;
      }

      if (filters.selectedTag && !job.tags.includes(filters.selectedTag)) {
        return false;
      }

      return true;
    });
  }, [jobs, filters]);

  // User's submitted applications
  const myApplications = useMemo(() => {
    return applicants;
  }, [applicants]);

  // Handlers
  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApplyNow = (job: Job) => {
    setSelectedJobForApply(job);
  };

  const handleApplicationSubmit = (newApplicant: Applicant) => {
    setApplicants(prev => [newApplicant, ...prev]);
    setJobs(prevJobs =>
      prevJobs.map(j =>
        j.id === newApplicant.jobId
          ? { ...j, applicantsCount: j.applicantsCount + 1 }
          : j
      )
    );
  };

  const handleWithdrawApplication = (applicantId: string) => {
    setApplicants(prev => prev.filter(a => a.id !== applicantId));
  };

  const handleMoveStage = (applicantId: string, newStage: ApplicationStage) => {
    setApplicants(prev =>
      prev.map(a => (a.id === applicantId ? { ...a, stage: newStage } : a))
    );
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant(prev => (prev ? { ...prev, stage: newStage } : null));
    }
  };

  const handleUpdateRating = (applicantId: string, rating: number) => {
    setApplicants(prev =>
      prev.map(a => (a.id === applicantId ? { ...a, rating } : a))
    );
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant(prev => (prev ? { ...prev, rating } : null));
    }
  };

  const handleAddNote = (applicantId: string, noteText: string) => {
    const authorName = currentUser?.name || 'Sarah Jenkins (Recruiter)';
    const newNote = {
      id: `note-${Date.now()}`,
      author: authorName,
      text: noteText,
      createdAt: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setApplicants(prev =>
      prev.map(a =>
        a.id === applicantId ? { ...a, notes: [newNote, ...a.notes] } : a
      )
    );
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant(prev =>
        prev ? { ...prev, notes: [newNote, ...prev.notes] } : null
      );
    }
  };

  const handleScheduleInterview = (applicantId: string, dateStr: string) => {
    setApplicants(prev =>
      prev.map(a =>
        a.id === applicantId
          ? { ...a, interviewDate: dateStr, stage: 'interview' }
          : a
      )
    );
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant(prev =>
        prev ? { ...prev, interviewDate: dateStr, stage: 'interview' } : null
      );
    }
  };

  const handleSelectTab = (tab: 'jobs' | 'ats' | 'my-applications') => {
    if (tab === 'ats') {
      if (currentUser?.role !== 'recruiter') {
        setCurrentUser(DEMO_USERS.recruiter);
      }
    } else if (tab === 'my-applications') {
      if (currentUser?.role !== 'seeker') {
        setCurrentUser(DEMO_USERS.seeker);
      }
    }
    setCurrentTab(tab);
  };

  const handlePostJob = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
    setCurrentTab('jobs');
  };

  const handleUpdateTestCase = (updated: QATestCase) => {
    setTestCases(prev => prev.map(tc => (tc.id === updated.id ? updated : tc)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        persona={persona}
        onTogglePersona={handleTogglePersona}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenPostJob={() => {
          if (currentUser?.role === 'recruiter') {
            setIsPostJobModalOpen(true);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        onOpenQATestSuite={() => setIsQAModalOpen(true)}
        onOpenStudentGuide={() => setIsStudentGuideOpen(true)}
        savedJobsCount={savedJobIds.length}
        activeApplicationsCount={myApplications.length}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: JOB DISCOVERY & SEARCH */}
        {currentTab === 'jobs' && (
          <div className="space-y-8">
            
            {/* Hero Section */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xs overflow-hidden transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      HIRE-HUB Talent Ecosystem
                    </span>
                    <button
                      onClick={() => setIsStudentGuideOpen(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Viva & Architecture Guide</span>
                    </button>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-[1.15]">
                    Discover high-impact roles built for exceptional teams.
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                    Streamlined job discovery, validated application submission, and transparent recruiter pipelines with role-based access control and automated skills matching.
                  </p>

                  {/* Inline Stats Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                    <div>
                      <span className="block text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                        {jobs.length}
                      </span>
                      <span>Active Requisitions</span>
                    </div>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                    <div>
                      <span className="block text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                        $168,000
                      </span>
                      <span>Average Compensation</span>
                    </div>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
                    <div>
                      <span className="block text-xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                        100%
                      </span>
                      <span>Verified User Flows</span>
                    </div>
                  </div>
                </div>

                {/* Hero Visual Asset */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                    <img
                      src="/src/assets/images/hero_recruitment_workspace_1793442334947.jpg"
                      alt="Modern recruitment collaborative environment"
                      referrerPolicy="no-referrer"
                      className="w-full h-64 sm:h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                      <div className="text-white">
                        <div className="text-xs font-semibold">Apex Cloud & Nexus Labs Hiring Sprint</div>
                        <div className="text-[11px] text-slate-300 mt-0.5">Engineering · Design · QA Automation</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Multifaceted Filters */}
            <JobSearchFilter
              filters={filters}
              onChange={updated => setFilters({ ...filters, ...updated })}
              onReset={() =>
                setFilters({
                  search: '',
                  department: '',
                  workMode: '',
                  experienceLevel: '',
                  minSalary: 0,
                  selectedTag: ''
                })
              }
              totalCount={filteredJobs.length}
              availableTags={availableTags}
            />

            {/* Catalog Grid Header */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                Showing <strong className="font-mono tabular-nums text-slate-900 dark:text-white">{filteredJobs.length}</strong> available {filteredJobs.length === 1 ? 'position' : 'positions'}
              </span>

              {savedJobIds.length > 0 && (
                <span className="text-slate-500 font-mono">
                  {savedJobIds.length} bookmarked
                </span>
              )}
            </div>

            {/* Jobs Catalog Grid */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-6">
                <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  No positions match your search criteria
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                  Try adjusting keywords, clearing salary thresholds, or switching the work arrangement filter.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      search: '',
                      department: '',
                      workMode: '',
                      experienceLevel: '',
                      minSalary: 0,
                      selectedTag: ''
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={handleToggleSaveJob}
                    onViewDetails={setSelectedJobForDetail}
                    onApplyNow={handleApplyNow}
                    hasApplied={applicants.some(a => a.jobId === job.id)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: RECRUITER ATS KANBAN BOARD OR RBAC GUARD */}
        {currentTab === 'ats' && (
          currentUser?.role !== 'recruiter' ? (
            <RBACGuard
              currentUser={currentUser}
              requiredRole="recruiter"
              onSwitchToDemoRecruiter={() => {
                setCurrentUser(DEMO_USERS.recruiter);
                setCurrentTab('ats');
              }}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onBackToJobs={() => setCurrentTab('jobs')}
            />
          ) : isRecruiterAnalyticsOpen ? (
            <RecruitmentAnalyticsView
              jobs={jobs}
              applicants={applicants}
              onBackToKanban={() => setIsRecruiterAnalyticsOpen(false)}
            />
          ) : (
            <RecruiterDashboard
              jobs={jobs}
              applicants={applicants}
              selectedJobId={recruiterJobFilter}
              onSelectJobId={setRecruiterJobFilter}
              onOpenPostJob={() => setIsPostJobModalOpen(true)}
              onSelectApplicant={setSelectedApplicant}
              onMoveStage={handleMoveStage}
              onOpenOfferLetter={app => setSelectedApplicantForOfferDoc(app)}
              onOpenAnalytics={() => setIsRecruiterAnalyticsOpen(true)}
            />
          )
        )}

        {/* VIEW 3: MY APPLICATIONS */}
        {currentTab === 'my-applications' && (
          <MyApplicationsView
            applications={myApplications}
            onWithdraw={handleWithdrawApplication}
            onExploreJobs={() => setCurrentTab('jobs')}
            onOpenInterviewPrep={jobId => {
              const target = jobs.find(j => j.id === jobId);
              if (target) setSelectedJobForPrep(target);
            }}
          />
        )}

      </main>

      {/* Floating Demo / Viva Guide Quick Button */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsStudentGuideOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all text-xs font-semibold border border-slate-700/60 group"
          title="Open Architecture & Viva Guide for Interviewers"
        >
          <GraduationCap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Viva & Architecture Guide</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white font-display">HIRE-HUB</span>
            <span>—</span>
            <span>Job Recruitment & Talent Management Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsStudentGuideOpen(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Viva Guide</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setIsQAModalOpen(true)}
              className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Flow QA Suite</span>
            </button>
            <span>·</span>
            <span className="font-mono">RBAC Enforced</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      
      {/* 1. Job Requisition Detail Modal */}
      <JobDetailModal
        job={selectedJobForDetail}
        onClose={() => setSelectedJobForDetail(null)}
        onApply={handleApplyNow}
        isSaved={selectedJobForDetail ? savedJobIds.includes(selectedJobForDetail.id) : false}
        onToggleSave={handleToggleSaveJob}
        hasApplied={selectedJobForDetail ? applicants.some(a => a.jobId === selectedJobForDetail.id) : false}
        onOpenInterviewPrep={job => setSelectedJobForPrep(job)}
      />

      {/* 2. Application Submission Wizard Modal */}
      <ApplicationModal
        job={selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
        onSubmitApplication={handleApplicationSubmit}
        onViewMyApplications={() => {
          setSelectedJobForApply(null);
          setCurrentTab('my-applications');
        }}
      />

      {/* 3. Recruiter Candidate Detail & Evaluation Modal */}
      <CandidateDetailModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        onMoveStage={handleMoveStage}
        onUpdateRating={handleUpdateRating}
        onAddNote={handleAddNote}
        onScheduleInterview={handleScheduleInterview}
        onOpenOfferDoc={app => setSelectedApplicantForOfferDoc(app)}
      />

      {/* 4. Post New Job Requisition Modal */}
      {isPostJobModalOpen && (
        <JobPostingModal
          onClose={() => setIsPostJobModalOpen(false)}
          onPostJob={handlePostJob}
        />
      )}

      {/* 5. QA & Flow Verification Test Suite Modal */}
      <QATestSuiteModal
        isOpen={isQAModalOpen}
        onClose={() => setIsQAModalOpen(false)}
        testCases={testCases}
        onUpdateTestCase={handleUpdateTestCase}
        jobs={jobs}
        applicants={applicants}
      />

      {/* 6. Student Presentation & Technical Viva Guide Modal */}
      <StudentShowcaseGuide
        isOpen={isStudentGuideOpen}
        onClose={() => setIsStudentGuideOpen(false)}
        onNavigateToTab={tab => setCurrentTab(tab)}
        onOpenQATestSuite={() => setIsQAModalOpen(true)}
      />

      {/* 7. AI Interview Preparation & Practice Modal */}
      <InterviewPrepModal
        job={selectedJobForPrep}
        onClose={() => setSelectedJobForPrep(null)}
      />

      {/* 8. Recruiter Offer Letter & Formal Communications Generator */}
      <OfferLetterModal
        applicant={selectedApplicantForOfferDoc}
        job={jobs.find(j => j.id === selectedApplicantForOfferDoc?.jobId) || jobs[0]}
        onClose={() => setSelectedApplicantForOfferDoc(null)}
      />

      {/* 9. Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={user => {
          setCurrentUser(user);
          if (user.role === 'recruiter') setCurrentTab('ats');
        }}
      />

    </div>
  );
}
