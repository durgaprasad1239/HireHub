import React from 'react';
import { Applicant } from '../types';
import { Clock, Calendar, CheckCircle, AlertCircle, FileText, Trash2, ArrowRight, Sparkles } from 'lucide-react';

interface MyApplicationsViewProps {
  applications: Applicant[];
  onWithdraw: (applicantId: string) => void;
  onExploreJobs: () => void;
  onOpenInterviewPrep?: (jobId: string) => void;
}

export const MyApplicationsView: React.FC<MyApplicationsViewProps> = ({
  applications,
  onWithdraw,
  onExploreJobs,
  onOpenInterviewPrep
}) => {
  const getStageBadge = (stage: Applicant['stage']) => {
    switch (stage) {
      case 'new':
        return { label: 'Application Submitted', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200' };
      case 'screening':
        return { label: 'In Recruiter Screening', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200' };
      case 'interview':
        return { label: 'Technical Interviewing', color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200' };
      case 'offer':
        return { label: 'Offer Extended', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200' };
      case 'rejected':
        return { label: 'Archived / Not Selected', color: 'text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200' };
    }
  };

  const stages = [
    { key: 'new', label: 'Submitted' },
    { key: 'screening', label: 'Screening' },
    { key: 'interview', label: 'Interview' },
    { key: 'offer', label: 'Offer' }
  ];

  const getStageIndex = (stage: Applicant['stage']) => {
    if (stage === 'rejected') return -1;
    return stages.findIndex(s => s.key === stage);
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
            My Applications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track real-time hiring progress, interview invitations, and status across your applied positions.
          </p>
        </div>

        <button
          onClick={onExploreJobs}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <span>Explore More Jobs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400">Total Applied</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {applications.length}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400">Active Pipeline</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400 mt-1">
            {applications.filter(a => a.stage !== 'rejected').length}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400">In Interview</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-purple-600 dark:text-purple-400 mt-1">
            {applications.filter(a => a.stage === 'interview').length}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400">Offers</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
            {applications.filter(a => a.stage === 'offer').length}
          </div>
        </div>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-6">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            No active applications yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            Search our curated jobs database and submit your first application with automatic skill-fit calculation.
          </p>
          <button
            onClick={onExploreJobs}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Browse Available Positions
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => {
            const currentIdx = getStageIndex(app.stage);
            const badge = getStageBadge(app.stage);

            return (
              <div
                key={app.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {app.companyName}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {app.jobTitle}
                    </h3>
                    
                    {/* Clean unboxed metadata with separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                      <span>Applied on <strong className="font-mono tabular-nums font-normal text-slate-700 dark:text-slate-300">{app.appliedAt}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Ref: <strong className="font-mono font-normal text-slate-700 dark:text-slate-300">{app.id}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Resume: <strong className="font-normal text-slate-700 dark:text-slate-300">{app.resumeFileName}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-600 dark:text-blue-400 font-mono font-semibold">{app.matchScore}% Skill Fit</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {onOpenInterviewPrep && (
                      <button
                        onClick={() => onOpenInterviewPrep(app.jobId)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-md hover:bg-purple-100 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Prep Interview</span>
                      </button>
                    )}

                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>

                    <button
                      onClick={() => onWithdraw(app.id)}
                      title="Withdraw application"
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ATS Pipeline Stepper (Visual Flow Tracker) */}
                {app.stage !== 'rejected' && (
                  <div className="pt-3 pb-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {stages.map((st, idx) => {
                        const isCompleted = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div key={st.key} className="space-y-1.5">
                            <div className="flex items-center justify-center">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                                  isCurrent
                                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/40'
                                    : isCompleted
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                }`}
                              >
                                {idx + 1}
                              </div>
                            </div>
                            <div
                              className={`text-[11px] font-medium ${
                                isCurrent
                                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                                  : isCompleted
                                  ? 'text-slate-800 dark:text-slate-200'
                                  : 'text-slate-400'
                              }`}
                            >
                              {st.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Interview Notice or Recruiter Activity */}
                {app.interviewDate && (
                  <div className="mt-3 p-3 bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 rounded-lg flex items-center gap-2.5 text-xs text-purple-900 dark:text-purple-300">
                    <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <strong>Technical Interview Scheduled:</strong> {app.interviewDate} via Google Meet. Calendar invite sent to {app.email}.
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
