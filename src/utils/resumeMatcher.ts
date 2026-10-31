import { Job } from '../types';

export interface MatchResult {
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
  summary: string;
}

export function analyzeResumeMatch(resumeText: string, job: Job): MatchResult {
  if (!resumeText || resumeText.trim().length === 0) {
    return {
      score: 45,
      matchingSkills: [],
      missingSkills: job.tags,
      summary: 'No detailed resume text provided. Score calculated from basic application inputs.'
    };
  }

  const normalizedResume = resumeText.toLowerCase();
  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  // Check job tags and requirements keywords
  const targetKeywords = Array.from(
    new Set([
      ...job.tags,
      ...job.requirements.flatMap(r => {
        const words = r.split(/\s+/);
        return words.filter(w => w.length > 4 && !/^(with|experience|strong|solid|years|demonstrated|proficient)/i.test(w));
      }).slice(0, 8)
    ])
  );

  targetKeywords.forEach(keyword => {
    const clean = keyword.replace(/[^a-zA-Z0-9+#]/g, '').toLowerCase();
    if (clean.length > 2) {
      if (normalizedResume.includes(clean)) {
        matchingSkills.push(keyword);
      } else {
        missingSkills.push(keyword);
      }
    }
  });

  const total = matchingSkills.length + missingSkills.length;
  const ratio = total > 0 ? matchingSkills.length / total : 0.6;
  // Scale between 60% and 98% for realistic ATS scoring
  const calculatedScore = Math.min(98, Math.max(55, Math.round(55 + ratio * 43)));

  let summary = '';
  if (calculatedScore >= 85) {
    summary = `Strong match: Candidate demonstrates high proficiency in core requirements (${matchingSkills.slice(0, 3).join(', ')}).`;
  } else if (calculatedScore >= 70) {
    summary = `Moderate alignment: Good foundational background, but may require onboarding on ${missingSkills.slice(0, 2).join(', ') || 'specialized tools'}.`;
  } else {
    summary = `Developing profile: Candidate meets foundational criteria but exhibits gaps in ${missingSkills.slice(0, 3).join(', ')}.`;
  }

  return {
    score: calculatedScore,
    matchingSkills: Array.from(new Set(matchingSkills)),
    missingSkills: Array.from(new Set(missingSkills)),
    summary
  };
}

export const SAMPLE_RESUME_TEMPLATES = [
  {
    label: 'Senior Frontend Engineer Resume',
    role: 'Senior React & TypeScript Developer',
    fileName: 'Alex_Vance_Staff_Frontend.pdf',
    text: `Alex Vance — Senior Frontend Engineer
San Francisco, CA | alex.vance@example.com | (555) 234-5678

PROFESSIONAL SUMMARY
Senior Frontend Engineer with 6+ years of experience architecting resilient, accessible web applications in React, TypeScript, and Tailwind CSS. Proven track record optimizing bundle performance, scaling component libraries, and streamlining recruitment & workflow interfaces.

CORE COMPETENCIES
React, TypeScript, Tailwind CSS, Vite, GraphQL, Next.js, Redux Toolkit, WebSockets, WCAG AA, Jest, Vitest, CI/CD.

EXPERIENCE
Lead UI Architect | CloudScale Technologies (2022 - Present)
- Led frontend architecture for cloud observability dashboards servicing 120,000 active users.
- Migrated legacy SPA to React 19 and Vite, reducing cold build times by 64% and initial bundle size by 42%.
- Established WCAG AA accessibility standards across 85+ shared UI design system components.

Senior Frontend Developer | DataMetrics Inc (2019 - 2022)
- Built real-time streaming data tables with WebSockets and high-density tabular visualizations.
- Mentored 4 mid-level engineers and conducted weekly engineering architectural design reviews.

EDUCATION
B.S. in Computer Science — University of California, Berkeley (2019)`
  },
  {
    label: 'Lead Product Designer Resume',
    role: 'Lead UX/UI & Design Systems',
    fileName: 'Maya_Lin_Design_Lead.pdf',
    text: `Maya Lin — Lead Product Designer
Austin, TX | maya.design@studiolin.com | (555) 345-6789

PROFESSIONAL SUMMARY
Lead Product Designer with 6+ years specializing in enterprise SaaS, applicant tracking systems, design systems, and multi-brand token architecture. Passionate about zero-pill typographic clarity and friction-free user workflows.

SKILLS
Figma, Design Systems, UX Research, Design Tokens, Interactive Prototyping, Usability Testing, WCAG AA, Information Architecture.

EXPERIENCE
Lead Product Designer | LinearCraft (2021 - Present)
- Unified product design system across 4 distinct web applications, reducing design-to-code handover by 35%.
- Led iterative redesign of candidate hiring pipeline, increasing recruiter weekly review throughput by 40%.`
  },
  {
    label: 'Principal QA & Test Automation Resume',
    role: 'Lead SDET / QA Engineer',
    fileName: 'Marcus_Brody_SDET.pdf',
    text: `Marcus Brody — Principal QA Automation Engineer
Portland, OR | marcus.brody.qa@testops.net | (555) 912-3456

PROFESSIONAL SUMMARY
Principal Test Automation Engineer with 7+ years of experience designing robust automated test harnesses, end-to-end Playwright suites, API validation mocks, and boundary fuzzing across mission-critical web applications.

SKILLS
QA Testing, Playwright, TypeScript, API Automation, CI/CD, Jest, Vitest, Cypress, Boundary Analysis, Usability Verification.

EXPERIENCE
Lead SDET | AutoVerify Inc (2020 - Present)
- Architected parallelized Playwright test runner executing 3,200 assertions in under 4 minutes.
- Formulated testing strategies for input validation, edge cases, and cross-browser resilience.`
  }
];
