import React from 'react';
import { Job } from '../types';
import { X, Building2, MapPin, DollarSign, Calendar, CheckCircle2, Bookmark, BookmarkCheck, Sparkles } from 'lucide-react';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (job: Job) => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  hasApplied: boolean;
  onOpenInterviewPrep?: (job: Job) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
  isSaved,
  onToggleSave,
  hasApplied,
  onOpenInterviewPrep
}) => {
  if (!job) return null;

  const formattedSalary = `$${job.salaryMin.toLocaleString()} – $${job.salaryMax.toLocaleString()} ${job.currency}/year`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden transition-colors"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {job.company} · {job.department}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {job.title}
            </h2>
            
            {/* Clean unboxed metadata with separators */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              <span>{job.location}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{job.workMode}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-slate-800 dark:text-slate-200 font-semibold">
                {formattedSalary}
              </span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{job.experienceLevel} level</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{job.applicantsCount} applicants</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(job.id)}
              aria-label="Bookmark job"
              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-blue-600/20" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          
          {/* Company Campus & Overview Showcase */}
          <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <img
              src="/src/assets/images/company_tech_campus_1793442335256.jpg"
              alt="Engineering Campus"
              referrerPolicy="no-referrer"
              className="w-full sm:w-44 h-28 object-cover rounded-lg shrink-0"
            />
            <div className="flex flex-col justify-center">
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                About {job.company}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                A leading technology team focused on enterprise scalability, resilient architectures, and empowering modern talent with high-impact initiatives.
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <span>Headquarters: {job.location}</span>
                <span>·</span>
                <span className="font-mono tabular-nums">Posted on {job.postedDate}</span>
              </div>
            </div>
          </div>

          {/* Role Overview */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-2">
              Role Overview
            </h4>
            <p className="leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-2">
              Core Responsibilities
            </h4>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications & Requirements */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-2">
              Requirements & Qualifications
            </h4>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-2">
              Tech Stack & Domain Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.tags.map(t => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-2">
              Compensation & Benefits
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {job.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Screening Questions Preview */}
          {job.screeningQuestions.length > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h5 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                Application Screening Questions ({job.screeningQuestions.length})
              </h5>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {job.screeningQuestions.map((q, idx) => (
                  <p key={q.id}>
                    <span className="font-mono text-slate-500 mr-1.5">{idx + 1}.</span>
                    {q.question}
                  </p>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span>Reference ID: </span>
            <span className="font-mono text-slate-700 dark:text-slate-300">{job.id}</span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenInterviewPrep && (
              <button
                onClick={() => {
                  onClose();
                  onOpenInterviewPrep(job);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interview Prep</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Close
            </button>

            {hasApplied ? (
              <span className="px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg">
                Application Submitted
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onApply(job);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
              >
                Apply for this Position
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
