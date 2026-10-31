import React from 'react';
import { Search, SlidersHorizontal, X, MapPin } from 'lucide-react';
import { JobFilterState } from '../types';

interface JobSearchFilterProps {
  filters: JobFilterState;
  onChange: (updated: Partial<JobFilterState>) => void;
  onReset: () => void;
  totalCount: number;
  availableTags: string[];
}

export const JobSearchFilter: React.FC<JobSearchFilterProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
  availableTags
}) => {
  const hasActiveFilters =
    Boolean(filters.search) ||
    Boolean(filters.department) ||
    Boolean(filters.workMode) ||
    Boolean(filters.experienceLevel) ||
    filters.minSalary > 0 ||
    Boolean(filters.selectedTag);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
      
      {/* Primary Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
        <div className="relative md:col-span-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={e => onChange({ search: e.target.value })}
            placeholder="Search by job title, tech stack (e.g. React, TypeScript), or keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ search: '' })}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="md:col-span-4 flex items-center gap-2">
          <select
            value={filters.department}
            onChange={e => onChange({ department: e.target.value })}
            aria-label="Filter by department"
            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
      </div>

      {/* Filter Row: Work Mode Segmented Control + Experience + Salary */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        
        {/* Work Arrangement Segmented Control */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">Work Mode:</span>
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700/60">
            {(['', 'remote', 'hybrid', 'onsite'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => onChange({ workMode: mode })}
                className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap shrink-0 ${
                  filters.workMode === mode
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {mode === '' ? 'All' : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Experience:</span>
          <select
            value={filters.experienceLevel}
            onChange={e => onChange({ experienceLevel: e.target.value })}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-hidden"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead / Staff</option>
          </select>
        </div>

        {/* Minimum Salary Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Min Salary:</span>
          <select
            value={filters.minSalary}
            onChange={e => onChange({ minSalary: Number(e.target.value) })}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden"
          >
            <option value={0}>Any</option>
            <option value={120000}>$120,000+</option>
            <option value={140000}>$140,000+</option>
            <option value={160000}>$160,000+</option>
            <option value={180000}>$180,000+</option>
          </select>
        </div>

        {/* Reset button if active */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-2 transition-colors ml-auto"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Popular Tag Filters */}
      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
        <span className="text-slate-400 dark:text-slate-500">Popular Tech:</span>
        {availableTags.slice(0, 7).map(tag => {
          const isSelected = filters.selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onChange({ selectedTag: isSelected ? '' : tag })}
              className={`px-2 py-0.5 rounded text-xs transition-colors whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

    </div>
  );
};
