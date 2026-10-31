import React, { useState } from 'react';
import { Job, Applicant, ApplicationStage } from '../types';
import { Users, Briefcase, Plus, Filter, Search, ArrowRight, Star, Clock, Check, ChevronRight, BarChart3, FileCheck, Sparkles, Layers } from 'lucide-react';

interface RecruiterDashboardProps {
  jobs: Job[];
  applicants: Applicant[];
  selectedJobId: string;
  onSelectJobId: (id: string) => void;
  onOpenPostJob: () => void;
  onSelectApplicant: (applicant: Applicant) => void;
  onMoveStage: (applicantId: string, newStage: ApplicationStage) => void;
  onOpenOfferLetter: (applicant: Applicant) => void;
  onOpenAnalytics: () => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  jobs,
  applicants,
  selectedJobId,
  onSelectJobId,
  onOpenPostJob,
  onSelectApplicant,
  onMoveStage,
  onOpenOfferLetter,
  onOpenAnalytics
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedApplicantId, setDraggedApplicantId] = useState<string | null>(null);
  const [activeDropColumn, setActiveDropColumn] = useState<ApplicationStage | null>(null);

  // Filter candidates by selected job and search term
  const filteredApplicants = applicants.filter(app => {
    const matchesJob = selectedJobId === 'all' || app.jobId === selectedJobId;
    const matchesSearch =
      searchTerm === '' ||
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesSearch;
  });

  const columns: { stage: ApplicationStage; title: string; desc: string; badgeColor: string }[] = [
    { stage: 'new', title: 'New Applicants', desc: 'Unreviewed submissions', badgeColor: 'border-blue-300' },
    { stage: 'screening', title: 'Screening', desc: 'Recruiter phone & fit screen', badgeColor: 'border-amber-300' },
    { stage: 'interview', title: 'Technical Interview', desc: 'Coding & system design', badgeColor: 'border-purple-300' },
    { stage: 'offer', title: 'Offer Extended', desc: 'Package negotiations', badgeColor: 'border-emerald-300' },
    { stage: 'rejected', title: 'Archived', desc: 'Not selected or withdrawn', badgeColor: 'border-slate-300' }
  ];

  // Recruiter KPIs
  const totalApplicantsCount = applicants.length;
  const inInterviewCount = applicants.filter(a => a.stage === 'interview').length;
  const offersCount = applicants.filter(a => a.stage === 'offer').length;

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, applicantId: string) => {
    e.dataTransfer.setData('text/plain', applicantId);
    setDraggedApplicantId(applicantId);
  };

  const handleDragOver = (e: React.DragEvent, stage: ApplicationStage) => {
    e.preventDefault();
    if (activeDropColumn !== stage) {
      setActiveDropColumn(stage);
    }
  };

  const handleDragLeave = () => {
    setActiveDropColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetStage: ApplicationStage) => {
    e.preventDefault();
    const applicantId = e.dataTransfer.getData('text/plain') || draggedApplicantId;
    if (applicantId) {
      onMoveStage(applicantId, targetStage);
    }
    setDraggedApplicantId(null);
    setActiveDropColumn(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Recruiter Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-colors">
        
        {/* Recruiter Profile Lockup */}
        <div className="flex items-center gap-4">
          <img
            src="/src/assets/images/avatar_recruiter_sarah_1793442334418.jpg"
            alt="Sarah Jenkins - Senior Talent Acquisition Lead"
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-600/30 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Recruitment ATS Console & Kanban Board
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sarah Jenkins · Talent Acquisition Partner · Drag & drop candidate cards across stages
            </p>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={onOpenAnalytics}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Funnel Analytics</span>
          </button>

          <button
            onClick={onOpenPostJob}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Vacancy</span>
          </button>
        </div>

      </div>

      {/* Recruiter KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400">Active Roles</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {jobs.filter(j => j.status === 'active').length}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400">Total in Pipeline</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {totalApplicantsCount}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400">In Interview</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-purple-600 dark:text-purple-400 mt-1">
            {inInterviewCount}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs text-slate-500 dark:text-slate-400">Offers Extended</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
            {offersCount}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl col-span-2 sm:col-span-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Avg Time-to-Hire</span>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200 mt-1">
            18.4d
          </div>
        </div>
      </div>

      {/* Filter Toolbar: Job Requisition Selector + Candidate Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
        
        <div className="flex items-center gap-2 flex-1">
          <label htmlFor="ats-role-select" className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Filter Role:</label>
          <select
            id="ats-role-select"
            value={selectedJobId}
            onChange={e => onSelectJobId(e.target.value)}
            className="w-full sm:max-w-md px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden"
          >
            <option value="all">All Vacancies ({jobs.length})</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>
                {j.title} ({j.company})
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search candidate name or role..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
          />
        </div>

      </div>

      {/* ATS Kanban Board with Drag & Drop */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map(col => {
          const colApplicants = filteredApplicants.filter(a => a.stage === col.stage);
          const isDropActive = activeDropColumn === col.stage;

          return (
            <div
              key={col.stage}
              onDragOver={e => handleDragOver(e, col.stage)}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, col.stage)}
              className={`bg-slate-100/70 dark:bg-slate-900/60 border rounded-xl p-3 flex flex-col min-w-[240px] transition-all ${
                isDropActive
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                  : 'border-slate-200/90 dark:border-slate-800/80'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-semibold text-xs text-slate-900 dark:text-white">
                    {col.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 truncate block">
                    {col.desc}
                  </span>
                </div>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
                  {colApplicants.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-2.5 flex-1 min-h-[320px]">
                {colApplicants.length === 0 ? (
                  <div className="h-28 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-400 italic">
                    Drop candidates here
                  </div>
                ) : (
                  colApplicants.map(applicant => (
                    <div
                      key={applicant.id}
                      draggable
                      onDragStart={e => handleDragStart(e, applicant.id)}
                      onClick={() => onSelectApplicant(applicant)}
                      className={`group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 rounded-lg p-3 cursor-grab active:cursor-grabbing shadow-2xs hover:shadow-xs transition-all text-xs ${
                        draggedApplicantId === applicant.id ? 'opacity-40 scale-95' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {applicant.fullName}
                        </h4>
                        <span className="font-mono font-semibold text-blue-600 dark:text-blue-400 text-[11px]">
                          {applicant.matchScore}%
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mb-2">
                        {applicant.jobTitle}
                      </div>

                      {/* Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mb-2.5">
                        <span>{applicant.experienceYears}y exp</span>
                        <span>·</span>
                        <span>{applicant.location}</span>
                      </div>

                      {/* Scorecard rating if available */}
                      {applicant.rating && (
                        <div className="flex items-center gap-0.5 mb-2 text-amber-500">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3 h-3 ${idx < applicant.rating! ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Stage Progression Quick Action */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onOpenOfferLetter(applicant);
                          }}
                          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                          title="Generate Formal Offer / Communications"
                        >
                          <FileCheck className="w-3 h-3" />
                          <span>Docs</span>
                        </button>

                        <div
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1"
                        >
                          <select
                            value={applicant.stage}
                            onChange={e => onMoveStage(applicant.id, e.target.value as ApplicationStage)}
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-1.5 py-0.5 text-[11px] text-slate-700 dark:text-slate-300 focus:outline-hidden"
                          >
                            <option value="new">New</option>
                            <option value="screening">Screening</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Archived</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
