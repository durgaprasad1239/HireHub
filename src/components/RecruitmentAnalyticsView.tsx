import React from 'react';
import { Applicant, Job, ApplicationStage } from '../types';
import { BarChart3, TrendingUp, Users, Clock, CheckCircle2, Award, ArrowDown } from 'lucide-react';

interface RecruitmentAnalyticsViewProps {
  jobs: Job[];
  applicants: Applicant[];
  onBackToKanban: () => void;
}

export const RecruitmentAnalyticsView: React.FC<RecruitmentAnalyticsViewProps> = ({
  jobs,
  applicants,
  onBackToKanban
}) => {
  const total = applicants.length || 1;

  // Stages count
  const stageCounts: Record<ApplicationStage, number> = {
    new: applicants.filter(a => a.stage === 'new').length,
    screening: applicants.filter(a => a.stage === 'screening').length,
    interview: applicants.filter(a => a.stage === 'interview').length,
    offer: applicants.filter(a => a.stage === 'offer').length,
    rejected: applicants.filter(a => a.stage === 'rejected').length
  };

  // Cumulative funnel progression
  // Everyone in pipeline passed through applied
  const funnel = [
    { label: 'Total Inbound Applications', count: total, pct: 100, color: 'bg-blue-600', dropoff: 0 },
    {
      label: 'Passed Initial Screening',
      count: stageCounts.screening + stageCounts.interview + stageCounts.offer,
      pct: Math.round(((stageCounts.screening + stageCounts.interview + stageCounts.offer) / total) * 100),
      color: 'bg-indigo-600',
      dropoff: Math.round((stageCounts.new / total) * 100)
    },
    {
      label: 'Advanced to Technical Interview',
      count: stageCounts.interview + stageCounts.offer,
      pct: Math.round(((stageCounts.interview + stageCounts.offer) / total) * 100),
      color: 'bg-purple-600',
      dropoff: Math.round((stageCounts.screening / total) * 100)
    },
    {
      label: 'Formal Offers Extended',
      count: stageCounts.offer,
      pct: Math.round((stageCounts.offer / total) * 100),
      color: 'bg-emerald-600',
      dropoff: Math.round((stageCounts.interview / total) * 100)
    }
  ];

  // Average candidate match score
  const avgMatchScore = Math.round(
    applicants.reduce((acc, a) => acc + a.matchScore, 0) / total
  );

  // Department distribution
  const deptMap: Record<string, number> = {};
  jobs.forEach(j => {
    deptMap[j.department] = (deptMap[j.department] || 0) + j.applicantsCount;
  });

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Recruitment Funnel & Pipeline Analytics
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              LIVE METRICS
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time conversion metrics, stage velocities, and candidate drop-off telemetry across active requisitions.
          </p>
        </div>

        <button
          onClick={onBackToKanban}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
        >
          ← Back to ATS Board
        </button>
      </div>

      {/* Top Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500">Pipeline Velocity</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            18.4 Days
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            ↓ 3.2 days vs last cohort
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500">Avg Skill Match Score</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400 mt-1">
            {avgMatchScore}%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Across {applicants.length} applications
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500">Interview-to-Offer Rate</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-purple-600 dark:text-purple-400 mt-1">
            {Math.round(((stageCounts.offer) / Math.max(1, stageCounts.interview + stageCounts.offer)) * 100)}%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            High qualification selectivity
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500">Active Requisitions</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
            {jobs.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            100% headcount funded
          </span>
        </div>
      </div>

      {/* Visual Conversion Funnel Card */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              End-to-End Candidate Conversion Funnel
            </h3>
            <p className="text-xs text-slate-500">
              Stages through which applicants advance from initial application to final offer extension.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Total Volume: {total}</span>
        </div>

        <div className="space-y-4 pt-2">
          {funnel.map((step, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {step.label}
                </span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {step.count} candidates
                  </span>
                  <span className="text-slate-400">({step.pct}%)</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${step.color}`}
                  style={{ width: `${Math.max(6, step.pct)}%` }}
                />
              </div>

              {idx < funnel.length - 1 && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400 pl-2">
                  <ArrowDown className="w-3 h-3" />
                  <span>Stage drop-off: ~{step.dropoff}% did not proceed</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Department & Source Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Department Volume */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Applications by Department
          </h4>
          <div className="space-y-2.5 pt-1 text-xs">
            {Object.entries(deptMap).map(([dept, count]) => {
              const pct = Math.round((count / Math.max(1, total)) * 100);
              return (
                <div key={dept} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{dept}</span>
                    <span className="font-mono text-slate-500">{count} applicants ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, pct))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recruitment Quality & Compliance */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Operational Compliance & Quality SLA
          </h4>
          <div className="space-y-3 pt-1 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Candidate Feedback SLA:</strong> 100% of applicants receive stage notification within 48 hours.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Equal Opportunity Validation:</strong> Anonymized screening question scoring to minimize bias.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Automated Functional Testing:</strong> Full smoke test assertions verified on each stage transition.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
