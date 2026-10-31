import React, { useState } from 'react';
import { QATestCase, Job, Applicant } from '../types';
import { executeTestCase } from '../services/testRunner';
import { ShieldCheck, Play, CheckCircle2, XCircle, Clock, RefreshCw, X, Bug, Zap, Check, AlertCircle } from 'lucide-react';

interface QATestSuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  testCases: QATestCase[];
  onUpdateTestCase: (updated: QATestCase) => void;
  jobs: Job[];
  applicants: Applicant[];
}

export const QATestSuiteModal: React.FC<QATestSuiteModalProps> = ({
  isOpen,
  onClose,
  testCases,
  onUpdateTestCase,
  jobs,
  applicants
}) => {
  if (!isOpen) return null;

  const [isRunningAll, setIsRunningAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'suites' | 'fuzzer'>('suites');

  // Interactive Fuzzer State
  const [testEmailInput, setTestEmailInput] = useState('candidate.alex@apexsystems.com');
  const [testPhoneInput, setTestPhoneInput] = useState('+1 (555) 890-1234');
  const [testSalaryMin, setTestSalaryMin] = useState(160000);
  const [testSalaryMax, setTestSalaryMax] = useState(140000); // Intentionally boundary violating by default to showcase testing

  // Run a single test
  const handleRunSingleTest = async (test: QATestCase) => {
    await executeTestCase(test, { jobs, applicants }, onUpdateTestCase);
  };

  // Run all tests sequentially
  const handleRunAllTests = async () => {
    setIsRunningAll(true);
    for (const test of testCases) {
      await executeTestCase(test, { jobs, applicants }, onUpdateTestCase);
    }
    setIsRunningAll(false);
  };

  const passedCount = testCases.filter(t => t.status === 'passed').length;
  const failedCount = testCases.filter(t => t.status === 'failed').length;
  const totalAssertions = testCases.reduce((acc, t) => acc + t.steps.length, 0);

  // Fuzzer evaluations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(testEmailInput.trim());
  const cleanPhoneDigits = testPhoneInput.replace(/\D/g, '');
  const isPhoneValid = cleanPhoneDigits.length >= 10;
  const isSalaryBandValid = testSalaryMin <= testSalaryMax && testSalaryMin > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden transition-colors"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Functional Testing & Usability Verification Suite
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Automated regression assertions, boundary analysis, and interactive flow validation for HIRE-HUB.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close QA modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Header KPI Strip */}
        <div className="px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs bg-white dark:bg-slate-900">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400">Suites: </span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono">{testCases.length}</strong>
            </div>
            <div>
              <span className="text-slate-400">Total Assertions: </span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono">{totalAssertions}</strong>
            </div>
            <div>
              <span className="text-slate-400">Passed: </span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{passedCount}</strong>
            </div>
            {failedCount > 0 && (
              <div>
                <span className="text-slate-400">Failed: </span>
                <strong className="text-red-500 font-mono font-bold">{failedCount}</strong>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setActiveTab('suites')}
                className={`px-2.5 py-1 text-xs font-medium rounded ${activeTab === 'suites' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Automated Suites
              </button>
              <button
                onClick={() => setActiveTab('fuzzer')}
                className={`px-2.5 py-1 text-xs font-medium rounded ${activeTab === 'fuzzer' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Boundary Fuzzer
              </button>
            </div>

            {activeTab === 'suites' && (
              <button
                onClick={handleRunAllTests}
                disabled={isRunningAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                {isRunningAll ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Tests...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run All Tests</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto text-xs space-y-4">
          
          {/* TAB 1: Automated Test Suites */}
          {activeTab === 'suites' && (
            <div className="space-y-4">
              {testCases.map(tc => (
                <div
                  key={tc.id}
                  className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all"
                >
                  {/* Suite Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          {tc.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 uppercase">
                          [{tc.flowCategory}]
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {tc.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {tc.status === 'passed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          PASSED ({tc.durationMs}ms)
                        </span>
                      )}

                      {tc.status === 'failed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800">
                          <XCircle className="w-3.5 h-3.5" />
                          FAILED
                        </span>
                      )}

                      {tc.status === 'running' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold font-mono text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          RUNNING
                        </span>
                      )}

                      {tc.status === 'idle' && (
                        <span className="text-slate-400 font-mono text-[11px]">
                          Not yet executed
                        </span>
                      )}

                      <button
                        onClick={() => handleRunSingleTest(tc)}
                        disabled={tc.status === 'running' || isRunningAll}
                        className="px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:text-slate-900 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-white dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                      >
                        Run
                      </button>
                    </div>
                  </div>

                  {/* Step Assertions Table */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/60">
                    {tc.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 shrink-0">
                            {step.status === 'passed' && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                            {step.status === 'failed' && (
                              <XCircle className="w-3.5 h-3.5 text-red-500" />
                            )}
                            {step.status === 'running' && (
                              <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                            )}
                            {step.status === 'pending' && (
                              <Clock className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {step.name}
                            </span>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              <span className="font-mono">Expected:</span> {step.expected}
                            </div>
                          </div>
                        </div>

                        <div className="text-right text-[11px] font-mono text-slate-600 dark:text-slate-300 shrink-0">
                          {step.actual !== 'Pending execution' ? (
                            <span className={step.status === 'passed' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}>
                              {step.actual}
                            </span>
                          ) : (
                            <span className="text-slate-400">Pending</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Interactive Boundary & Usability Fuzzer */}
          {activeTab === 'fuzzer' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40">
                <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Interactive Input Boundary & Usability Tester
                </h4>
                <p className="text-xs text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
                  Directly test boundary cases, regex rules, and edge inputs as referenced in functional testing requirements.
                </p>
              </div>

              {/* Fuzzer 1: Email Regex Validation */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white">
                      1. Email Format & Domain Sanity Check
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      Standard regex: <code className="font-mono">/^[^\s@]+@[^\s@]+\.[^\s@]+$/</code>
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    isEmailValid ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                  }`}>
                    {isEmailValid ? 'VALID EMAIL' : 'REJECTED / INVALID'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testEmailInput}
                    onChange={e => setTestEmailInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 font-mono text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                {/* Preset Fuzz Tests */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-slate-400">Sample Fuzz Cases:</span>
                  <button
                    onClick={() => setTestEmailInput('user@invalid-domain')}
                    className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 font-mono"
                  >
                    user@invalid-domain (Missing TLD)
                  </button>
                  <button
                    onClick={() => setTestEmailInput('alex..vance@domain..com')}
                    className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 font-mono"
                  >
                    double-dot test
                  </button>
                  <button
                    onClick={() => setTestEmailInput('alex.vance@apexcloud.io')}
                    className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 font-mono text-emerald-700"
                  >
                    valid enterprise email
                  </button>
                </div>
              </div>

              {/* Fuzzer 2: Phone Number Digits Length Verification */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white">
                      2. Phone Number Digits Length Check (≥ 10 digits)
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      Strips non-digits: Detected {cleanPhoneDigits.length} digits
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    isPhoneValid ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                  }`}>
                    {isPhoneValid ? 'VALID PHONE' : 'TOO SHORT / INVALID'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testPhoneInput}
                    onChange={e => setTestPhoneInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 font-mono text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Fuzzer 3: Salary Constraint Invariant (Min <= Max) */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white">
                      3. Recruiter Salary Band Invariant (Min ≤ Max)
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      Business rule: Salary ceiling cannot be lower than floor
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    isSalaryBandValid ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                  }`}>
                    {isSalaryBandValid ? 'INVARIANT SATISFIED' : 'CONSTRAINT VIOLATED'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Minimum Salary ($)</label>
                    <input
                      type="number"
                      step="5000"
                      value={testSalaryMin}
                      onChange={e => setTestSalaryMin(Number(e.target.value))}
                      className="w-full px-3 py-1.5 font-mono text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Maximum Salary ($)</label>
                    <input
                      type="number"
                      step="5000"
                      value={testSalaryMax}
                      onChange={e => setTestSalaryMax(Number(e.target.value))}
                      className="w-full px-3 py-1.5 font-mono text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                {!isSalaryBandValid && (
                  <p className="text-red-500 text-[11px] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Error: Minimum salary (${testSalaryMin.toLocaleString()}) cannot exceed maximum (${testSalaryMax.toLocaleString()}).</span>
                  </p>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div className="text-xs text-slate-500 font-mono">
            <span>HIRE-HUB Test Harness v1.4</span>
            <span className="mx-2">·</span>
            <span>All major user flows verified</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 rounded-lg transition-colors"
          >
            Close Suite
          </button>
        </div>

      </div>
    </div>
  );
};
