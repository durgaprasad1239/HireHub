import React, { useState } from 'react';
import { Job, Applicant } from '../types';
import { analyzeResumeMatch, SAMPLE_RESUME_TEMPLATES } from '../utils/resumeMatcher';
import { X, CheckCircle2, AlertCircle, Upload, ArrowRight, ArrowLeft, FileText, Sparkles } from 'lucide-react';

interface ApplicationModalProps {
  job: Job | null;
  onClose: () => void;
  onSubmitApplication: (applicant: Applicant) => void;
  onViewMyApplications: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  job,
  onClose,
  onSubmitApplication,
  onViewMyApplications
}) => {
  if (!job) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form Fields
  const [fullName, setFullName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [location, setLocation] = useState('San Francisco, CA');
  const [experienceYears, setExperienceYears] = useState<number>(6);
  const [currentRole, setCurrentRole] = useState('Senior Frontend Developer');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/alex-vance-dev');
  const [portfolioUrl, setPortfolioUrl] = useState('https://alexvance.io');

  // Resume State
  const [resumeFileName, setResumeFileName] = useState('Alex_Vance_Staff_Frontend.pdf');
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME_TEMPLATES[0].text);
  const [resumeMode, setResumeMode] = useState<'upload' | 'paste' | 'preset'>('preset');

  // Screening Questions State
  const [screeningAnswers, setScreeningAnswers] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    job.screeningQuestions.forEach(q => {
      if (q.options && q.options.length > 0) {
        init[q.id] = q.options[0];
      } else if (q.type === 'number') {
        init[q.id] = '6';
      } else {
        init[q.id] = '';
      }
    });
    return init;
  });

  const [coverNote, setCoverNote] = useState(
    'I have built high-performance enterprise React & TypeScript applications for over 6 years. I am passionate about clean typography, robust validation, and design systems.'
  );

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedAppId, setSubmittedAppId] = useState<string>('');

  // Validate Step 1
  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide at least 10 digits for contact verification.';
    }
    if (!currentRole.trim()) errs.currentRole = 'Current or target role is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 2
  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!resumeText.trim()) {
      errs.resume = 'Please provide resume content via file upload, preset template, or text paste.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 3
  const validateStep3 = (): boolean => {
    const errs: Record<string, string> = {};
    job.screeningQuestions.forEach(q => {
      if (q.required && (!screeningAnswers[q.id] || !screeningAnswers[q.id].trim())) {
        errs[q.id] = 'This question requires an answer to proceed.';
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    }
  };

  const handleFinalSubmit = () => {
    const matchAnalysis = analyzeResumeMatch(resumeText, job);
    const newApplicantId = `app-${Date.now().toString().slice(-6)}`;

    const applicant: Applicant = {
      id: newApplicantId,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.company,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim() || 'Remote',
      linkedinUrl: linkedinUrl.trim(),
      portfolioUrl: portfolioUrl.trim(),
      experienceYears: Number(experienceYears) || 0,
      currentRole: currentRole.trim(),
      resumeFileName: resumeFileName || 'candidate_resume.pdf',
      resumeFileSize: '280 KB',
      resumeText,
      screeningAnswers,
      coverNote,
      appliedAt: new Date().toISOString().split('T')[0],
      stage: 'new',
      matchScore: matchAnalysis.score,
      matchDetails: {
        matchingSkills: matchAnalysis.matchingSkills,
        missingSkills: matchAnalysis.missingSkills,
        summary: matchAnalysis.summary
      },
      notes: []
    };

    onSubmitApplication(applicant);
    setSubmittedAppId(newApplicantId);
    setStep(5);
  };

  const matchPreview = analyzeResumeMatch(resumeText, job);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl my-8 overflow-hidden transition-colors"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Applying to {job.company}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {job.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close application form"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Tracker */}
        {step < 5 && (
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className={`font-medium ${step >= 1 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}`}>
              1. Contact Info
            </span>
            <span className="text-slate-300 dark:text-slate-600">→</span>
            <span className={`font-medium ${step >= 2 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}`}>
              2. Resume
            </span>
            <span className="text-slate-300 dark:text-slate-600">→</span>
            <span className={`font-medium ${step >= 3 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}`}>
              3. Screening
            </span>
            <span className="text-slate-300 dark:text-slate-600">→</span>
            <span className={`font-medium ${step >= 4 ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}`}>
              4. Review
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto text-sm">
          
          {/* STEP 1: Personal & Contact Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                Personal & Contact Details
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recruiters will use these details to contact you for screening and interview invitations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Alex Vance"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-hidden ${
                      errors.fullName ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="alex@domain.com"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-hidden ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-hidden ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="City, State / Country"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Current / Most Recent Role *
                  </label>
                  <input
                    type="text"
                    value={currentRole}
                    onChange={e => {
                      setCurrentRole(e.target.value);
                      if (errors.currentRole) setErrors({ ...errors, currentRole: '' });
                    }}
                    placeholder="e.g. Senior Frontend Engineer"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-sm text-slate-900 dark:text-white focus:outline-hidden ${
                      errors.currentRole ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.currentRole && <p className="text-xs text-red-500 mt-1">{errors.currentRole}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Years of Relevant Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={experienceYears}
                    onChange={e => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono text-slate-900 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={e => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Portfolio / GitHub URL
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={e => setPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Resume Submission & Match Preview */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                    Resume & Skills Verification
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Upload your CV or choose a pre-filled professional profile to test automated skills matching.
                  </p>
                </div>

                {/* Preset Switcher */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <button
                    onClick={() => setResumeMode('preset')}
                    className={`px-2 py-1 text-xs font-medium rounded ${resumeMode === 'preset' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    Quick Profiles
                  </button>
                  <button
                    onClick={() => setResumeMode('paste')}
                    className={`px-2 py-1 text-xs font-medium rounded ${resumeMode === 'paste' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    Paste Text
                  </button>
                </div>
              </div>

              {resumeMode === 'preset' && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Select a Pre-Built Verified Resume Template:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {SAMPLE_RESUME_TEMPLATES.map((tmpl, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setResumeText(tmpl.text);
                          setResumeFileName(tmpl.fileName);
                          setCurrentRole(tmpl.role);
                        }}
                        className={`p-3 text-left border rounded-xl transition-all ${
                          resumeFileName === tmpl.fileName
                            ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <FileText className="w-4 h-4 text-blue-600 mb-1" />
                        <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                          {tmpl.label}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
                          {tmpl.fileName}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resume Content (Parsed for ATS Keyword Matching) *
                </label>
                <textarea
                  rows={6}
                  value={resumeText}
                  onChange={e => {
                    setResumeText(e.target.value);
                    if (errors.resume) setErrors({ ...errors, resume: '' });
                  }}
                  className={`w-full p-3 font-mono text-xs bg-slate-50 dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:outline-hidden leading-relaxed ${
                    errors.resume ? 'border-red-500 ring-1 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'
                  }`}
                  placeholder="Paste resume text with skills, experience, and educational background..."
                />
                {errors.resume && <p className="text-xs text-red-500 mt-1">{errors.resume}</p>}
              </div>

              {/* Live Match Engine Analysis Card */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Live Fit Estimation
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {matchPreview.score}% Match
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {matchPreview.summary}
                </p>

                {matchPreview.matchingSkills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                    <span className="text-slate-400">Matching tags:</span>
                    {matchPreview.matchingSkills.slice(0, 5).map(skill => (
                      <span key={skill} className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded text-[11px] font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Job-Specific Screening Questions */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                  Role Screening Questions
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Please answer questions configured by {job.company} talent team to assist initial candidate review.
                </p>
              </div>

              {job.screeningQuestions.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4">
                  No additional screening questions required for this position. Proceed to review.
                </p>
              ) : (
                <div className="space-y-4">
                  {job.screeningQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                      <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-2">
                        <span className="text-slate-400 mr-1.5 font-mono">{idx + 1}.</span>
                        {q.question} {q.required && <span className="text-red-500">*</span>}
                      </label>

                      {q.options && q.options.length > 0 ? (
                        <div className="space-y-2">
                          {q.options.map(opt => (
                            <label key={opt} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={screeningAnswers[q.id] === opt}
                                onChange={e => {
                                  setScreeningAnswers({ ...screeningAnswers, [q.id]: e.target.value });
                                  if (errors[q.id]) setErrors({ ...errors, [q.id]: '' });
                                }}
                                className="text-blue-600 focus:ring-blue-500"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : q.type === 'number' ? (
                        <input
                          type="number"
                          value={screeningAnswers[q.id] || ''}
                          onChange={e => {
                            setScreeningAnswers({ ...screeningAnswers, [q.id]: e.target.value });
                            if (errors[q.id]) setErrors({ ...errors, [q.id]: '' });
                          }}
                          className={`w-40 px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:outline-hidden ${
                            errors[q.id] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                          }`}
                        />
                      ) : (
                        <textarea
                          rows={3}
                          value={screeningAnswers[q.id] || ''}
                          onChange={e => {
                            setScreeningAnswers({ ...screeningAnswers, [q.id]: e.target.value });
                            if (errors[q.id]) setErrors({ ...errors, [q.id]: '' });
                          }}
                          placeholder="Provide a concise response..."
                          className={`w-full p-2.5 text-xs bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:outline-hidden ${
                            errors[q.id] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                          }`}
                        />
                      )}

                      {errors[q.id] && (
                        <p className="text-xs text-red-500 mt-1.5">{errors[q.id]}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Review & Cover Note */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-base">
                  Application Review & Final Submission
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Please verify your submitted dossier before sending to {job.company}.
                </p>
              </div>

              {/* Dossier Summary */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Candidate: </span>
                    {fullName} ({email})
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Contact: </span>
                    {phone} · {location}
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Experience: </span>
                    {experienceYears} years ({currentRole})
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Resume: </span>
                    {resumeFileName}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Estimated Match Score:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{matchPreview.score}%</span>
                </div>
              </div>

              {/* Optional Cover Note */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Optional Note to Hiring Manager
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={e => setCoverNote(e.target.value)}
                  placeholder="Share any context or note for the hiring team..."
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden"
                />
              </div>

              <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
                <span>
                  By submitting, your dossier will be routed directly to {job.company}'s ATS queue. You will receive real-time status tracking in your "My Applications" dashboard.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: Success Confirmation */}
          {step === 5 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                Application Successfully Submitted!
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Your application for <strong className="text-slate-900 dark:text-white">{job.title}</strong> at {job.company} has been received and indexed into the recruiter pipeline.
              </p>

              <div className="inline-block p-3 px-5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono">
                <span className="text-slate-500">Tracking Reference: </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{submittedAppId}</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onViewMyApplications();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Track in My Applications
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Back to Job Search
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Steps 1-4) */}
        {step < 5 && (
          <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
              >
                <span>Submit Application</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
