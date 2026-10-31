import React, { useState } from 'react';
import { X, BookOpen, Code2, ShieldCheck, CheckCircle2, Copy, Check, ChevronRight, Terminal, Award, Lightbulb, ExternalLink } from 'lucide-react';

interface StudentShowcaseGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'jobs' | 'ats' | 'my-applications') => void;
  onOpenQATestSuite: () => void;
}

export const StudentShowcaseGuide: React.FC<StudentShowcaseGuideProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onOpenQATestSuite
}) => {
  if (!isOpen) return null;

  const [activeSection, setActiveSection] = useState<'overview' | 'architecture' | 'testing' | 'viva' | 'code'>('overview');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden transition-colors"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Project Presentation & Technical Viva Guide
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  INTERVIEW-READY
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Comprehensive architectural blueprint, testing methodologies, and interview explanations for presenting HIRE-HUB.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close guide modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs font-medium overflow-x-auto">
          {[
            { key: 'overview', label: '1. Project Abstract' },
            { key: 'architecture', label: '2. Architecture & Tech Stack' },
            { key: 'testing', label: '3. QA & Functional Testing' },
            { key: 'viva', label: '4. Interview Q&A (Viva)' },
            { key: 'code', label: '5. Key Code Highlights' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key as any)}
              className={`py-3 transition-colors border-b-2 whitespace-nowrap shrink-0 ${
                activeSection === tab.key
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto text-xs leading-relaxed space-y-6">
          
          {/* SECTION 1: PROJECT ABSTRACT & PURPOSE */}
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40">
                <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 mb-1">
                  Elevator Pitch (30-Second Summary for Interviewers)
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  "HIRE-HUB is a production-grade job recruitment and talent management platform engineered with React 19, TypeScript, and Tailwind CSS v4. Unlike toy prototypes, it solves real recruitment bottlenecks with two seamless personas: Job Seekers get verified multifaceted search, instant ATS resume keyword matching, and multi-step validated applications; Recruiters get a Kanban applicant tracking pipeline with stage transitions, scorecards, and scheduling. Crucially, I integrated an automated functional testing engine to prove software reliability, input boundary validation, and zero dead-click UX."
                </p>
                <button
                  onClick={() =>
                    handleCopy(
                      "HIRE-HUB is a production-grade job recruitment and talent management platform engineered with React 19, TypeScript, and Tailwind CSS v4. It features dual user personas (Job Seeker & Recruiter), an automated ATS resume match scorer, interactive Kanban pipeline, and a built-in functional QA test harness validating input boundaries and user conversion funnels.",
                      'pitch'
                    )
                  }
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-md text-[11px] font-semibold hover:bg-blue-700 transition-colors"
                >
                  {copiedSection === 'pitch' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'pitch' ? 'Copied Pitch!' : 'Copy Elevator Pitch'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                  <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    Key Problems Solved
                  </h5>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    <li>• <strong>Eliminates Dead-Clicks:</strong> Every filter, button, tab, and card is wired to responsive handlers.</li>
                    <li>• <strong>Transparent Compensation:</strong> All positions list explicit salary bounds with tabular numeral alignment.</li>
                    <li>• <strong>Real-time Skill Alignment:</strong> ATS algorithm highlights matching skills and exact gaps before submission.</li>
                    <li>• <strong>Full Recruiter Pipeline:</strong> Recruiter dashboard with Kanban stage promotion and interviewer note threads.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                  <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Engineering Highlights
                  </h5>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    <li>• <strong>React 19 & TypeScript Strict Mode:</strong> High type safety and predictable state flow.</li>
                    <li>• <strong>Zero-Pill Typographic Discipline:</strong> Clean unboxed metadata with `·` separators (no visual AI clutter).</li>
                    <li>• <strong>Strict Top Bar 3-Zone Contract:</strong> One-line wordmark, nav links, and single action point.</li>
                    <li>• <strong>In-App Flow Verification Suite:</strong> Live assertion testing for email regex, BVA, and state transitions.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: SYSTEM ARCHITECTURE */}
          {activeSection === 'architecture' && (
            <div className="space-y-5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Component Architecture & Data Flow Hierarchy
              </h4>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] space-y-2 border border-slate-800 overflow-x-auto">
                <div className="text-blue-400 font-bold">HIRE-HUB Application Tree</div>
                <div>├── Navbar.tsx (Strict 3-zone contract, persona toggle, dark theme)</div>
                <div>├── App.tsx (Root state container: jobs, applicants, bookmarks, theme)</div>
                <div>│   ├── JobSearchFilter.tsx (Debounced search, work-mode segmented tabs, salary floor)</div>
                <div>│   ├── JobCard.tsx (Unboxed metadata, instant bookmarking, role detail trigger)</div>
                <div>│   ├── JobDetailModal.tsx (Deep requisition spec, campus showcase, apply CTA)</div>
                <div>│   ├── ApplicationModal.tsx (4-step wizard with regex validation & live ATS score)</div>
                <div>│   ├── MyApplicationsView.tsx (Candidate stage tracker, interview reminders, withdraw)</div>
                <div>│   ├── RecruiterDashboard.tsx (ATS Kanban board, drag/move stage transitions, KPI strip)</div>
                <div>│   ├── CandidateDetailModal.tsx (Scorecard ratings, interviewer notes, interview scheduler)</div>
                <div>│   ├── JobPostingModal.tsx (Requisition publisher with salaryMin &lt;= salaryMax invariant)</div>
                <div>│   └── QATestSuiteModal.tsx (Automated assertion runner & boundary fuzzer)</div>
                <div>└── services/testRunner.ts (Functional test harness & assertion library)</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">State Management</span>
                  <p className="text-slate-500 dark:text-slate-400">
                    Synchronous React state + automated local persistence with deterministic seed fallbacks for zero data loss across reloads.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">ATS Matching Algorithm</span>
                  <p className="text-slate-500 dark:text-slate-400">
                    Tokenizes resume corpus, evaluates skill keyword density against job requirements, and computes calibrated 55-98% match scores.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">Kanban State Machine</span>
                  <p className="text-slate-500 dark:text-slate-400">
                    Strict discrete stages (`new` → `screening` → `interview` → `offer` / `rejected`) with atomic optimistic updates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: QA & TESTING METHODOLOGIES */}
          {activeSection === 'testing' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Functional Testing Concepts Applied in HIRE-HUB
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400">
                    How academic testing principles were translated into production verification:
                  </p>
                </div>

                <button
                  onClick={onOpenQATestSuite}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Open Live QA Suite</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">
                    1. Boundary Value Analysis (BVA)
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    <strong>Theory:</strong> Errors cluster around extreme boundaries. We test at boundaries: Minimum, Maximum, Just-Below, Just-Above.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 font-mono text-[11px]">
                    <strong>Implementation:</strong> In `JobPostingModal` and the Fuzzer, the constraint <code className="text-blue-600">salaryMin &lt;= salaryMax</code> is verified. Testing $200k min with $150k max triggers immediate blocking.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">
                    2. Equivalence Partitioning (EP)
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    <strong>Theory:</strong> Divides inputs into classes where all members are treated identically (Valid vs Invalid).
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 font-mono text-[11px]">
                    <strong>Implementation:</strong> Email validation tests Partition 1 (Valid: `user@domain.com`) vs Partition 2 (Missing TLD: `user@domain`, Missing `@`, Whitespace).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">
                    3. State Transition Testing
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    <strong>Theory:</strong> Verifies that entities only move between valid states without skipping mandatory gates.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 font-mono text-[11px]">
                    <strong>Implementation:</strong> In `RecruiterDashboard`, an applicant starts in `new` and transitions sequentially through `screening` → `interview` → `offer` with audit trails.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: VIVA INTERVIEW QUESTIONS & ANSWERS */}
          {activeSection === 'viva' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Common Technical Viva Questions & Winning Answers
              </h4>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    Q1: "Why build a functional test runner inside the web application instead of just running Jest/Vitest in the terminal?"
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Winning Answer:</strong> "While headless unit tests run in CI, an interactive in-app QA test harness allows non-technical stakeholders, QA leads, and hiring managers to immediately audit the application's runtime health and input boundary constraints without needing a terminal or local development setup. It provides transparency into regression coverage, assertion timings, and boundary fuzzing live in the browser."
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    Q2: "How does the ATS Resume Keyword Matcher calculate the match percentage?"
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Winning Answer:</strong> "The matcher normalizes the resume text into token stems and compares them against two arrays: the job's defined skill tags (e.g. React, TypeScript, GraphQL) and core requirement keywords extracted from the job description. The ratio of matching terms to total target keywords is mapped to a calibrated score between 55% and 98%, generating clear lists of matched credentials and potential skill gaps."
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">
                    Q3: "What steps did you take to prevent UI lag or poor contrast?"
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Winning Answer:</strong> "I adhered to the WCAG AA accessibility specification by maintaining a 4.5:1 contrast ratio, using Tailwind CSS v4's custom variant (`@custom-variant dark (&:where(.dark, .dark *));`) to prevent split-brain contrast failures, and enforcing zero-pill discipline so users can scan unboxed metadata 3x faster without visual noise."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: KEY CODE HIGHLIGHTS */}
          {activeSection === 'code' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Key Code Snippets to Point to in the Codebase
              </h4>

              <div className="space-y-3 font-mono text-[11px]">
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">// 1. Email Format Regex Assertion in ApplicationModal.tsx</div>
                  <div className="text-slate-400">const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;</div>
                  <div className="text-slate-400">if (!emailRegex.test(email.trim())) &#123;</div>
                  <div className="text-slate-300 pl-4">errs.email = 'Please provide a valid email format';</div>
                  <div className="text-slate-400">&#125;</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-800">
                  <div className="text-blue-400 font-bold mb-1">// 2. Boundary Value Invariant in JobPostingModal.tsx</div>
                  <div className="text-slate-400">if (salaryMin &gt; salaryMax) &#123;</div>
                  <div className="text-slate-300 pl-4">errs.salaryMax = 'Maximum salary must be greater than or equal to minimum salary.';</div>
                  <div className="text-slate-400">&#125;</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 text-slate-200 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">// 3. Kanban Stage State Transition Handler in App.tsx</div>
                  <div className="text-slate-400">const handleMoveStage = (applicantId: string, newStage: ApplicationStage) =&gt; &#123;</div>
                  <div className="text-slate-300 pl-4">setApplicants(prev =&gt; prev.map(a =&gt; a.id === applicantId ? &#123; ...a, stage: newStage &#125; : a));</div>
                  <div className="text-slate-400">&#125;;</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div className="text-xs text-slate-500">
            <span>Prepared for Engineering Viva & Portfolio Demos</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenQATestSuite();
              }}
              className="px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              Launch QA Test Runner
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
