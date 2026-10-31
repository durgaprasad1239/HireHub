import React, { useState } from 'react';
import { Applicant, ApplicationStage } from '../types';
import { X, Star, Calendar, MessageSquare, Send, CheckCircle2, AlertCircle, ExternalLink, Mail, Phone, MapPin, User } from 'lucide-react';

interface CandidateDetailModalProps {
  applicant: Applicant | null;
  onClose: () => void;
  onMoveStage: (applicantId: string, newStage: ApplicationStage) => void;
  onUpdateRating: (applicantId: string, rating: number) => void;
  onAddNote: (applicantId: string, noteText: string) => void;
  onScheduleInterview: (applicantId: string, dateStr: string) => void;
  onOpenOfferDoc?: (applicant: Applicant) => void;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  applicant,
  onClose,
  onMoveStage,
  onUpdateRating,
  onAddNote,
  onScheduleInterview,
  onOpenOfferDoc
}) => {
  if (!applicant) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'screening' | 'evaluation'>('profile');
  const [newNoteText, setNewNoteText] = useState('');
  const [interviewDateInput, setInterviewDateInput] = useState(applicant.interviewDate || '2026-11-04 14:00 PST');
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(applicant.id, newNoteText.trim());
    setNewNoteText('');
  };

  const handleSaveInterview = () => {
    if (interviewDateInput.trim()) {
      onScheduleInterview(applicant.id, interviewDateInput.trim());
      setShowScheduleForm(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden transition-colors"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src="/src/assets/images/avatar_candidate_alex_1793442334452.jpg"
              alt={applicant.fullName}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {applicant.fullName}
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                  {applicant.matchScore}% Fit
                </span>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>{applicant.currentRole}</span>
                <span className="mx-2">·</span>
                <span>Applied for: <strong>{applicant.jobTitle}</strong></span>
              </div>

              {/* Contact Strip */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
                <a href={`mailto:${applicant.email}`} className="hover:text-blue-600 transition-colors flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{applicant.email}</span>
                </a>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{applicant.phone}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{applicant.location}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close candidate modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Resume & Skill Match
          </button>

          <button
            onClick={() => setActiveTab('screening')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'screening'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Screening Answers
          </button>

          <button
            onClick={() => setActiveTab('evaluation')}
            className={`py-3 transition-colors border-b-2 ${
              activeTab === 'evaluation'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Recruiter Notes & Scorecard ({applicant.notes.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto text-xs text-slate-700 dark:text-slate-300">
          
          {/* TAB 1: Profile & Skills Breakdown */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              
              {/* ATS Skills Match Breakdown Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Skills Fit Analysis
                  </h4>
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {applicant.matchScore}%
                  </span>
                </div>

                <p className="leading-relaxed">
                  {applicant.matchDetails.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block mb-1.5">
                      Matching Qualifications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {applicant.matchDetails.matchingSkills.map(sk => (
                        <span key={sk} className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-[11px]">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {applicant.matchDetails.missingSkills.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block mb-1.5">
                        Potential Skill Gaps:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {applicant.matchDetails.missingSkills.map(sk => (
                          <span key={sk} className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono text-[11px]">
                            • {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Note */}
              {applicant.coverNote && (
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                    Candidate Note
                  </h4>
                  <p className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 leading-relaxed italic">
                    "{applicant.coverNote}"
                  </p>
                </div>
              )}

              {/* Full Parsed Resume Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Attached Resume ({applicant.resumeFileName})
                  </h4>
                  <span className="text-slate-400 font-mono">
                    {applicant.resumeFileSize || '240 KB'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {applicant.resumeText}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Screening Answers */}
          {activeTab === 'screening' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                Answers to Job Screening Questions
              </h4>

              {Object.keys(applicant.screeningAnswers).length === 0 ? (
                <p className="text-slate-400 italic">No screening questionnaire recorded for this submission.</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(applicant.screeningAnswers).map(([qid, answer], idx) => (
                    <div key={qid} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">
                        Question Ref {idx + 1}
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {answer}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Recruiter Evaluation & Scorecard */}
          {activeTab === 'evaluation' && (
            <div className="space-y-6">
              
              {/* Rating Control */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Candidate Overall Rating
                  </h4>
                  <p className="text-xs text-slate-500">
                    Consolidated score across technical rigor and communication fit
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => onUpdateRating(applicant.id, star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (applicant.rating || 0) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono ml-2 font-bold text-slate-700 dark:text-slate-300">
                    {applicant.rating ? `${applicant.rating}/5` : 'Unrated'}
                  </span>
                </div>
              </div>

              {/* Interview Scheduling Box */}
              <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Technical Interview Status
                    </span>
                  </div>

                  <button
                    onClick={() => setShowScheduleForm(!showScheduleForm)}
                    className="text-xs text-purple-700 dark:text-purple-300 font-medium underline underline-offset-2"
                  >
                    {applicant.interviewDate ? 'Reschedule' : 'Schedule Interview'}
                  </button>
                </div>

                {applicant.interviewDate && !showScheduleForm && (
                  <p className="text-xs text-purple-900 dark:text-purple-200 font-mono">
                    Confirmed slot: {applicant.interviewDate}
                  </p>
                )}

                {showScheduleForm && (
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      value={interviewDateInput}
                      onChange={e => setInterviewDateInput(e.target.value)}
                      placeholder="e.g. 2026-11-04 14:00 PST"
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white font-mono"
                    />
                    <button
                      onClick={handleSaveInterview}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Save Slot
                    </button>
                  </div>
                )}
              </div>

              {/* Recruiter Notes Thread */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">
                  Interviewer Notes Thread ({applicant.notes.length})
                </h4>

                <div className="space-y-2.5 mb-4">
                  {applicant.notes.length === 0 ? (
                    <p className="text-slate-400 italic">No notes logged yet. Add your initial impression below.</p>
                  ) : (
                    applicant.notes.map(note => (
                      <div key={note.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{note.author}</span>
                          <span className="font-mono">{note.createdAt}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {note.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={e => setNewNoteText(e.target.value)}
                    placeholder="Log evaluation notes (e.g. Strong system design, clear explanation of React hooks)..."
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Log Note</span>
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer: Stage Promotion Controls */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900">
          <div className="text-xs text-slate-500">
            <span>Current Stage: </span>
            <strong className="capitalize text-slate-900 dark:text-white font-mono">{applicant.stage}</strong>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenOfferDoc && (
              <button
                onClick={() => onOpenOfferDoc(applicant)}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Draft Offer / Invite
              </button>
            )}

            {applicant.stage !== 'screening' && (
              <button
                onClick={() => onMoveStage(applicant.id, 'screening')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                Move to Screening
              </button>
            )}

            {applicant.stage !== 'interview' && (
              <button
                onClick={() => onMoveStage(applicant.id, 'interview')}
                className="px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 transition-colors"
              >
                Move to Interview
              </button>
            )}

            {applicant.stage !== 'offer' && (
              <button
                onClick={() => onMoveStage(applicant.id, 'offer')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-2xs"
              >
                Extend Offer
              </button>
            )}

            {applicant.stage !== 'rejected' && (
              <button
                onClick={() => onMoveStage(applicant.id, 'rejected')}
                className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
              >
                Archive
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
