import React from 'react';
import { Job } from '../types';
import { Bookmark, BookmarkCheck, ArrowRight, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onViewDetails: (job: Job) => void;
  onApplyNow: (job: Job) => void;
  hasApplied: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onViewDetails,
  onApplyNow,
  hasApplied
}) => {
  const formattedSalary = `$${(job.salaryMin / 1000).toFixed(0)}k – $${(job.salaryMax / 1000).toFixed(0)}k`;

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl p-5 transition-all shadow-xs hover:shadow-md flex flex-col justify-between">
      
      <div>
        {/* Header: Company & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {job.company}
            </span>
            <h3
              onClick={() => onViewDetails(job)}
              className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer transition-colors mt-0.5 leading-snug"
            >
              {job.title}
            </h3>
          </div>

          <button
            onClick={() => onToggleSave(job.id)}
            aria-label={isSaved ? 'Remove from saved' : 'Save job'}
            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-blue-600/20" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Clean unboxed metadata with typographic separators (NO PILLS) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 my-2.5">
          <span className="capitalize">{job.department}</span>
          <span aria-hidden="true">·</span>
          <span>{job.location}</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize font-medium text-slate-700 dark:text-slate-300">{job.workMode}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums font-semibold text-slate-800 dark:text-slate-200">{formattedSalary}</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{job.experienceLevel}</span>
        </div>

        {/* Description Snippet */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>

        {/* Key Tech Tags - Quiet inline text with subtle dividers */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {job.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 rounded"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 4 && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              +{job.tags.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Metadata and Action Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
        <span className="text-slate-400 dark:text-slate-500 font-mono tabular-nums">
          {job.applicantsCount} {job.applicantsCount === 1 ? 'applicant' : 'applicants'}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onViewDetails(job)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            Details
          </button>

          {hasApplied ? (
            <span className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg whitespace-nowrap">
              Applied
            </span>
          ) : (
            <button
              onClick={() => onApplyNow(job)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

    </article>
  );
};
