import React, { useState } from 'react';
import { Job, ScreeningQuestion, WorkMode, ExperienceLevel, JobType } from '../types';
import { X, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface JobPostingModalProps {
  onClose: () => void;
  onPostJob: (job: Job) => void;
}

export const JobPostingModal: React.FC<JobPostingModalProps> = ({
  onClose,
  onPostJob
}) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Apex Cloud Systems');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('San Francisco, CA');
  const [workMode, setWorkMode] = useState<WorkMode>('remote');
  const [type, setType] = useState<JobType>('full-time');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('senior');
  const [salaryMin, setSalaryMin] = useState<number>(140000);
  const [salaryMax, setSalaryMax] = useState<number>(180000);
  const [currency] = useState('USD');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    'Architect and build resilient web applications.\nCollaborate across engineering squads to maintain code quality.\nReview pull requests and mentor fellow engineers.'
  );
  const [requirementsText, setRequirementsText] = useState(
    '4+ years of relevant production experience.\nStrong proficiency in modern JavaScript/TypeScript.\nExperience with automated testing and continuous integration.'
  );
  const [tagsInput, setTagsInput] = useState('React, TypeScript, Testing, CI/CD');
  const [screeningQuestions, setScreeningQuestions] = useState<ScreeningQuestion[]>([
    {
      id: 'sq-custom-1',
      question: 'How many years of production experience do you have with modern TypeScript?',
      type: 'number',
      required: true
    }
  ]);

  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'text' | 'number' | 'choice'>('text');

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Job title is required.';
    if (!department.trim()) errs.department = 'Department is required.';
    if (!location.trim()) errs.location = 'Location is required.';
    if (!description.trim()) errs.description = 'Job overview description is required.';
    if (salaryMin <= 0) errs.salaryMin = 'Minimum salary must be greater than zero.';
    if (salaryMax <= 0) errs.salaryMax = 'Maximum salary must be greater than zero.';
    if (salaryMin > salaryMax) {
      errs.salaryMax = 'Maximum salary must be greater than or equal to minimum salary.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddQuestion = () => {
    if (!newQuestionText.trim()) return;
    const newQ: ScreeningQuestion = {
      id: `sq-${Date.now()}`,
      question: newQuestionText.trim(),
      type: newQuestionType,
      required: true,
      options: newQuestionType === 'choice' ? ['Yes', 'No'] : undefined
    };
    setScreeningQuestions([...screeningQuestions, newQ]);
    setNewQuestionText('');
  };

  const handleRemoveQuestion = (id: string) => {
    setScreeningQuestions(screeningQuestions.filter(q => q.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const responsibilities = responsibilitiesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newJob: Job = {
      id: `job-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      company: company.trim(),
      department,
      location: location.trim(),
      workMode,
      type,
      experienceLevel,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      currency,
      description: description.trim(),
      responsibilities,
      requirements,
      tags,
      benefits: [
        'Flexible schedule and remote workplace support',
        'Top-tier comprehensive medical, dental, and vision insurance',
        '401(k) matching and annual development stipend'
      ],
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      applicantsCount: 0,
      screeningQuestions
    };

    onPostJob(newJob);
    onClose();
  };

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
              Recruiter Requisition Engine
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Create New Vacancy
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close job creation modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-xs">
          
          {/* Title & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: '' });
                }}
                placeholder="e.g. Senior Backend Engineer"
                className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:outline-hidden ${
                  errors.title ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Department *
              </label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="DevOps">DevOps</option>
                <option value="Product">Product</option>
              </select>
            </div>
          </div>

          {/* Location & Work Mode & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Location *
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={e => setWorkMode(e.target.value as WorkMode)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden capitalize"
              >
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden capitalize"
              >
                <option value="entry">Entry</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead / Staff</option>
              </select>
            </div>
          </div>

          {/* Salary Bounds */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-slate-900 dark:text-white block mb-2">
              Annual Compensation Band (USD)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 mb-1">Minimum Annual Salary ($)</label>
                <input
                  type="number"
                  step="5000"
                  value={salaryMin}
                  onChange={e => {
                    setSalaryMin(Number(e.target.value));
                    if (errors.salaryMin || errors.salaryMax) setErrors({});
                  }}
                  className="w-full px-3 py-1.5 font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Maximum Annual Salary ($)</label>
                <input
                  type="number"
                  step="5000"
                  value={salaryMax}
                  onChange={e => {
                    setSalaryMax(Number(e.target.value));
                    if (errors.salaryMax) setErrors({});
                  }}
                  className={`w-full px-3 py-1.5 font-mono bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:outline-hidden ${
                    errors.salaryMax ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>
            </div>
            {errors.salaryMax && (
              <p className="text-red-500 mt-1.5">{errors.salaryMax}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Role Overview & Mission *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              placeholder="Describe the vacancy mission and what the team builds..."
              className={`w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white focus:outline-hidden ${
                errors.description ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.description && <p className="text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Key Responsibilities (One per line)
            </label>
            <textarea
              rows={3}
              value={responsibilitiesText}
              onChange={e => setResponsibilitiesText(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Requirements & Qualifications (One per line)
            </label>
            <textarea
              rows={3}
              value={requirementsText}
              onChange={e => setRequirementsText(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
              Skill & Domain Tags (Comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="e.g. React, TypeScript, GraphQL, Docker"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden font-mono"
            />
          </div>

          {/* Screening Questions Setup */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3">
            <span className="font-semibold text-slate-900 dark:text-white block">
              Application Screening Questionnaire ({screeningQuestions.length})
            </span>

            <div className="space-y-2">
              {screeningQuestions.map(q => (
                <div key={q.id} className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="truncate mr-2">
                    <span className="font-medium text-slate-900 dark:text-white">{q.question}</span>
                    <span className="text-[11px] text-slate-400 ml-2 font-mono uppercase">[{q.type}]</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(q.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add question inline */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newQuestionText}
                onChange={e => setNewQuestionText(e.target.value)}
                placeholder="Add screening question (e.g. Years of Node.js experience)..."
                className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
              <select
                value={newQuestionType}
                onChange={e => setNewQuestionType(e.target.value as 'text' | 'number' | 'choice')}
                className="px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="choice">Choice</option>
              </select>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              Publish Vacancy
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
