export type WorkMode = 'remote' | 'hybrid' | 'onsite';
export type JobType = 'full-time' | 'part-time' | 'contract';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead';
export type JobStatus = 'active' | 'paused' | 'closed';

export interface ScreeningQuestion {
  id: string;
  question: string;
  type: 'text' | 'number' | 'boolean' | 'choice';
  options?: string[];
  required: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  department: string;
  location: string;
  workMode: WorkMode;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
  benefits: string[];
  postedDate: string;
  status: JobStatus;
  applicantsCount: number;
  screeningQuestions: ScreeningQuestion[];
}

export type ApplicationStage = 'new' | 'screening' | 'interview' | 'offer' | 'rejected';

export interface ApplicantNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Applicant {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  experienceYears: number;
  currentRole: string;
  resumeFileName: string;
  resumeFileSize?: string;
  resumeText: string;
  screeningAnswers: Record<string, string>;
  coverNote?: string;
  appliedAt: string;
  stage: ApplicationStage;
  matchScore: number;
  matchDetails: {
    matchingSkills: string[];
    missingSkills: string[];
    summary: string;
  };
  rating?: number; // 1 to 5
  notes: ApplicantNote[];
  interviewDate?: string;
}

export type UserPersona = 'seeker' | 'recruiter';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserPersona;
  title: string;
  company?: string;
  avatarUrl?: string;
}

export interface JobFilterState {
  search: string;
  department: string;
  workMode: string;
  experienceLevel: string;
  minSalary: number;
  selectedTag: string;
}

export interface QATestStep {
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  expected: string;
  actual: string;
  durationMs?: number;
}

export interface QATestCase {
  id: string;
  flowCategory: 'search' | 'application' | 'ats_pipeline' | 'validation' | 'recruiter_post';
  title: string;
  description: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  durationMs: number;
  steps: QATestStep[];
  error?: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'technical' | 'behavioral' | 'system_design';
  question: string;
  keyConcepts: string[];
  suggestedAnswer: string;
  starTip: string;
}

export interface FunnelStageMetric {
  stage: ApplicationStage;
  label: string;
  count: number;
  percentage: number;
  dropoffRate: number;
  avgTimeDays: number;
}

