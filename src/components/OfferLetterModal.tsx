import React, { useState } from 'react';
import { Applicant, Job } from '../types';
import { X, FileCheck, Copy, Check, Printer, Mail, DollarSign, Calendar } from 'lucide-react';

interface OfferLetterModalProps {
  applicant: Applicant | null;
  job: Job | null;
  onClose: () => void;
}

export const OfferLetterModal: React.FC<OfferLetterModalProps> = ({
  applicant,
  job,
  onClose
}) => {
  if (!applicant || !job) return null;

  const [mode, setMode] = useState<'offer' | 'invite'>('offer');
  const [baseSalary, setBaseSalary] = useState(job.salaryMax || 185000);
  const [startDate, setStartDate] = useState('2026-12-01');
  const [bonus, setBonus] = useState('$15,000 Sign-on Bonus');
  const [equity, setEquity] = useState('0.15% Stock Options (4-year vest, 1-year cliff)');
  const [copied, setCopied] = useState(false);

  const offerLetterText = `OFFICIAL OFFER OF EMPLOYMENT
Company: ${job.company}
Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

Dear ${applicant.fullName},

On behalf of ${job.company}, we are thrilled to extend an offer for the position of ${job.title}.

SUMMARY OF OFFER:
• Position Title: ${job.title}
• Department: ${job.department}
• Workplace Arrangement: ${job.workMode.toUpperCase()} (${job.location})
• Base Compensation: $${baseSalary.toLocaleString()} USD per annum (paid semi-monthly)
• Sign-On Incentive: ${bonus}
• Equity Grant: ${equity}
• Target Start Date: ${startDate}
• Comprehensive Health, Dental & Vision Coverage: 100% employer-sponsored
• Flexible Time Off: Unlimited PTO policy

This offer is contingent upon standard credential verification. Please review, sign, and return this agreement by 5:00 PM PST within five business days.

We are deeply excited about the prospect of you joining our engineering team!

Sincerely,
Sarah Jenkins
Head of Talent Acquisition, ${job.company}
`;

  const inviteEmailText = `SUBJECT: Invitation to Technical Architecture Interview – ${job.company}

Dear ${applicant.fullName},

Thank you for your application for the ${job.title} role at ${job.company}. Following our review of your portfolio and background, we would love to invite you to a 45-minute technical architecture interview.

INTERVIEW DETAILS:
• Role: ${job.title}
• Format: Live video call via Google Meet
• Duration: 45 minutes
• Agenda: System architecture review, React/TypeScript deep dive, and open Q&A with our engineering leads.
• Date & Time: ${applicant.interviewDate || 'To be scheduled'}

Please reply with 2-3 time windows that work best for your schedule, or confirm the slot listed above.

Best regards,
Sarah Jenkins
Talent Acquisition Lead, ${job.company}
`;

  const currentContent = mode === 'offer' ? offerLetterText : inviteEmailText;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden transition-colors"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Recruiter Document Generator
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Formal Letter & Communications: {applicant.fullName}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close generator"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('offer')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                mode === 'offer'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Formal Offer Package
            </button>
            <button
              onClick={() => setMode('invite')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                mode === 'invite'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Technical Interview Invitation
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-lg font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
          </button>
        </div>

        {/* Customization Controls (Offer Mode) */}
        {mode === 'offer' && (
          <div className="p-4 px-6 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 mb-1">Base Salary ($)</label>
              <input
                type="number"
                step="1000"
                value={baseSalary}
                onChange={e => setBaseSalary(Number(e.target.value))}
                className="w-full px-2.5 py-1 font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Target Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-2.5 py-1 font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Sign-On Incentive</label>
              <input
                type="text"
                value={bonus}
                onChange={e => setBonus(e.target.value)}
                className="w-full px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Letter Preview Display */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200">
            {currentContent}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <span className="text-xs text-slate-400 font-mono">
            Candidate ID: {applicant.id} · Ready to dispatch
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
