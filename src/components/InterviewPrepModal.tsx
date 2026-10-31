import React, { useState } from 'react';
import { Job, InterviewQuestion } from '../types';
import { generateRoleInterviewQuestions } from '../utils/interviewQuestions';
import { X, Sparkles, CheckCircle2, Copy, Check, Lightbulb, BookOpen, Send, Download } from 'lucide-react';

interface InterviewPrepModalProps {
  job: Job | null;
  onClose: () => void;
}

export const InterviewPrepModal: React.FC<InterviewPrepModalProps> = ({
  job,
  onClose
}) => {
  if (!job) return null;

  const questions = generateRoleInterviewQuestions(job);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [candidateNotes, setCandidateNotes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const activeQuestion = questions[selectedIdx] || questions[0];

  const handleCopyQuestions = () => {
    const text = questions
      .map(
        (q, idx) =>
          `Q${idx + 1} (${q.category.toUpperCase()}): ${q.question}\nKey Concepts: ${q.keyConcepts.join(
            ', '
          )}\nModel Answer: ${q.suggestedAnswer}\nSTAR Tip: ${q.starTip}\n\n`
      )
      .join('');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden transition-colors"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                AI Interview Preparation Copilot
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {job.title} at {job.company}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close interview prep"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Selector Tabs */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium mr-1">Questions:</span>
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedIdx === idx
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              Q{idx + 1}: {q.category}
            </button>
          ))}

          <button
            onClick={handleCopyQuestions}
            className="ml-auto inline-flex items-center gap-1 text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-medium shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied All!' : 'Copy Cheat Sheet'}</span>
          </button>
        </div>

        {/* Question Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Question Box */}
          <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wide">
                Category: {activeQuestion.category}
              </span>
              <span className="text-slate-400 text-[11px]">Question {selectedIdx + 1} of {questions.length}</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              "{activeQuestion.question}"
            </h4>
          </div>

          {/* Key Concepts */}
          <div>
            <span className="font-semibold text-slate-900 dark:text-white block mb-1.5">
              Key Evaluation Criteria (What Interviewers Expect):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeQuestion.keyConcepts.map(c => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
                >
                  ✓ {c}
                </span>
              ))}
            </div>
          </div>

          {/* Suggested Model Answer */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Suggested Model Response:
            </span>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              {activeQuestion.suggestedAnswer}
            </p>
          </div>

          {/* STAR Coaching Tip */}
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30">
            <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">
              STAR Method Strategy Tip:
            </span>
            <p className="text-blue-800 dark:text-blue-300/90 leading-relaxed">
              {activeQuestion.starTip}
            </p>
          </div>

          {/* Candidate Practice Note */}
          <div>
            <label className="block font-semibold text-slate-900 dark:text-white mb-1.5">
              Practice Your Answer (Notes auto-saved locally):
            </label>
            <textarea
              rows={3}
              value={candidateNotes[activeQuestion.id] || ''}
              onChange={e =>
                setCandidateNotes({
                  ...candidateNotes,
                  [activeQuestion.id]: e.target.value
                })
              }
              placeholder="Draft your key talking points using Situation, Task, Action, Result..."
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div className="text-xs text-slate-500">
            <span>Prepared for </span>
            <strong className="text-slate-900 dark:text-white">{job.company}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (selectedIdx > 0) setSelectedIdx(selectedIdx - 1);
              }}
              disabled={selectedIdx === 0}
              className="px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (selectedIdx < questions.length - 1) setSelectedIdx(selectedIdx + 1);
              }}
              disabled={selectedIdx === questions.length - 1}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-40"
            >
              Next Question
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
