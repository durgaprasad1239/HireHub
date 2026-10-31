import { Job, Applicant } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-101',
    title: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Apex Cloud Systems',
    department: 'Engineering',
    location: 'San Francisco, CA',
    workMode: 'remote',
    type: 'full-time',
    experienceLevel: 'senior',
    salaryMin: 155000,
    salaryMax: 195000,
    currency: 'USD',
    description: 'We are seeking a high-caliber Senior Frontend Engineer to architect resilient web applications, scale our design systems, and build high-throughput data visualizations.',
    responsibilities: [
      'Lead architecture and frontend development of enterprise cloud monitoring modules.',
      'Maintain rigorous component standards, performance budgets, and unit/integration test coverage.',
      'Partner closely with Product Managers and Designers to iterate on user workflows and rapid functional prototypes.',
      'Mentor mid-level engineers through structured code reviews and architectural RFCs.'
    ],
    requirements: [
      '5+ years of production experience with modern React, TypeScript, and state architectures.',
      'Demonstrated expertise in performance profiling, bundle optimization, and web accessibility (WCAG AA).',
      'Strong proficiency with modern CSS frameworks (Tailwind CSS) and responsive layout mathematics.',
      'Solid foundations in RESTful APIs, WebSockets, and asynchronous error boundaries.'
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GraphQL'],
    benefits: [
      'Flexible remote work & $1,500 home office stipend',
      'Comprehensive health, dental, and vision insurance with 100% premium coverage',
      '401(k) matching up to 5%',
      'Unlimited PTO with mandatory 3-week annual minimum'
    ],
    postedDate: '2026-10-24',
    status: 'active',
    applicantsCount: 6,
    screeningQuestions: [
      {
        id: 'sq-1',
        question: 'How many years of professional React & TypeScript experience do you have?',
        type: 'number',
        required: true
      },
      {
        id: 'sq-2',
        question: 'Do you require US immigration sponsorship now or in the future?',
        type: 'choice',
        options: ['No, authorized to work indefinitely', 'Yes, will need sponsorship'],
        required: true
      },
      {
        id: 'sq-3',
        question: 'Describe a complex state management challenge you solved in React.',
        type: 'text',
        required: true
      }
    ]
  },
  {
    id: 'job-102',
    title: 'Staff Full-Stack Platform Engineer',
    company: 'Nexus Data Labs',
    department: 'Engineering',
    location: 'New York, NY',
    workMode: 'hybrid',
    type: 'full-time',
    experienceLevel: 'lead',
    salaryMin: 185000,
    salaryMax: 235000,
    currency: 'USD',
    description: 'Join the core infrastructure platform team scaling distributed query engines, backend microservices in Node/Go, and modern React operational consoles.',
    responsibilities: [
      'Design fault-tolerant APIs and data streaming pipelines servicing over 40M daily requests.',
      'Standardize testing workflows, CI/CD pipelines, and zero-downtime database migrations.',
      'Collaborate with security teams to enforce role-based access control and tenant isolation.'
    ],
    requirements: [
      '7+ years in full-stack engineering with strong Node.js, TypeScript, PostgreSQL, and React experience.',
      'Proven track record designing scalable microservices or distributed event systems.',
      'Deep appreciation for automated testing (unit, functional integration, and contract tests).'
    ],
    tags: ['Node.js', 'PostgreSQL', 'React', 'Docker', 'AWS'],
    benefits: [
      'Quarterly performance bonuses & equity grants',
      'Hybrid commute allowance and commuter benefits',
      'Annual $3,000 learning & conference allowance'
    ],
    postedDate: '2026-10-26',
    status: 'active',
    applicantsCount: 4,
    screeningQuestions: [
      {
        id: 'sq-staff-1',
        question: 'Years of distributed systems / backend experience?',
        type: 'number',
        required: true
      },
      {
        id: 'sq-staff-2',
        question: 'Are you available to work 2 days per week onsite at our Manhattan office?',
        type: 'choice',
        options: ['Yes', 'No (Remote only)'],
        required: true
      }
    ]
  },
  {
    id: 'job-103',
    title: 'Lead Product Designer (Design Systems & ATS)',
    company: 'TalentForge',
    department: 'Design',
    location: 'Austin, TX',
    workMode: 'remote',
    type: 'full-time',
    experienceLevel: 'lead',
    salaryMin: 140000,
    salaryMax: 175000,
    currency: 'USD',
    description: 'Lead design for our next-generation hiring and talent engagement platform. You will build user-centered recruiter workflows, candidate discovery interfaces, and rigorous design tokens.',
    responsibilities: [
      'Drive end-to-end design from customer discovery interviews to pixel-perfect component specifications.',
      'Maintain and evolve our multi-brand design tokens and component library.',
      'Run qualitative usability tests and quantitative flow validations.'
    ],
    requirements: [
      '5+ years leading UX/UI design for complex SaaS or enterprise desktop applications.',
      'Exceptional portfolio demonstrating systems thinking, typographic craft, and micro-interactions.',
      'Strong grasp of frontend implementation constraints in React & CSS.'
    ],
    tags: ['Figma', 'Design Systems', 'UX Research', 'Prototyping', 'WCAG'],
    benefits: [
      'Top-tier medical & wellness coverage',
      'Annual company offsite in Europe or North America',
      'Flexible hours and asynchronous documentation culture'
    ],
    postedDate: '2026-10-27',
    status: 'active',
    applicantsCount: 3,
    screeningQuestions: [
      {
        id: 'sq-des-1',
        question: 'Please provide a direct URL to your design portfolio and case studies.',
        type: 'text',
        required: true
      },
      {
        id: 'sq-des-2',
        question: 'Have you built or maintained an enterprise design system?',
        type: 'choice',
        options: ['Yes, from scratch', 'Yes, maintained/extended', 'No, strictly product design'],
        required: true
      }
    ]
  },
  {
    id: 'job-104',
    title: 'Senior QA Automation & Test Engineer',
    company: 'Apex Cloud Systems',
    department: 'Quality Assurance',
    location: 'Seattle, WA',
    workMode: 'remote',
    type: 'full-time',
    experienceLevel: 'senior',
    salaryMin: 135000,
    salaryMax: 165000,
    currency: 'USD',
    description: 'Architect automated end-to-end testing pipelines, functional verification harnesses, and API regression suites across critical user journeys.',
    responsibilities: [
      'Build and execute end-to-end integration and smoke test suites for web platforms.',
      'Identify edge cases, input validation boundary flaws, and race conditions.',
      'Collaborate with developers to integrate automated testing gates into CI/CD.'
    ],
    requirements: [
      '4+ years in software quality assurance and automated test suite design.',
      'Strong knowledge of functional test methodologies, assertions, and test harness execution.',
      'Experience with TypeScript, Playwright/Cypress, Jest/Vitest, and REST API testing.'
    ],
    tags: ['QA Testing', 'TypeScript', 'Playwright', 'API Automation', 'CI/CD'],
    benefits: [
      'Full health benefits & annual wellness wellness bonus',
      'Home office hardware package',
      'Generous paid parental leave'
    ],
    postedDate: '2026-10-28',
    status: 'active',
    applicantsCount: 5,
    screeningQuestions: [
      {
        id: 'sq-qa-1',
        question: 'Primary automated test framework you have used recently?',
        type: 'text',
        required: true
      },
      {
        id: 'sq-qa-2',
        question: 'How do you design functional validation suites for complex form submission workflows?',
        type: 'text',
        required: true
      }
    ]
  },
  {
    id: 'job-105',
    title: 'AI Machine Learning Engineer (LLM Applications)',
    company: 'Vanguard Cognitive',
    department: 'Engineering',
    location: 'Boston, MA',
    workMode: 'hybrid',
    type: 'full-time',
    experienceLevel: 'mid',
    salaryMin: 145000,
    salaryMax: 180000,
    currency: 'USD',
    description: 'Develop intelligent talent-matching pipelines, resume embedding vector search, and structured extraction models to streamline recruitment workflows.',
    responsibilities: [
      'Implement real-time ranking and candidate matching algorithms.',
      'Evaluate model hallucinations, output guardrails, and latency optimization.',
      'Deploy inference microservices with monitored telemetry and feedback loops.'
    ],
    requirements: [
      '3+ years experience with Python, PyTorch/TensorFlow, and modern LLM orchestration.',
      'Experience with vector databases (Pinecone, pgvector) and embedding similarity search.',
      'Familiarity with TypeScript/React client integration.'
    ],
    tags: ['Python', 'LLMs', 'Vector Search', 'FastAPI', 'PyTorch'],
    benefits: [
      'Cutting-edge GPU compute access',
      'Competitive equity package with immediate vesting triggers',
      'Downtown Boston subsidized parking & transit pass'
    ],
    postedDate: '2026-10-29',
    status: 'active',
    applicantsCount: 2,
    screeningQuestions: [
      {
        id: 'sq-ai-1',
        question: 'What vector database have you deployed into production?',
        type: 'text',
        required: true
      }
    ]
  },
  {
    id: 'job-106',
    title: 'Site Reliability & DevOps Engineer',
    company: 'Nexus Data Labs',
    department: 'DevOps',
    location: 'Chicago, IL',
    workMode: 'remote',
    type: 'full-time',
    experienceLevel: 'senior',
    salaryMin: 150000,
    salaryMax: 190000,
    currency: 'USD',
    description: 'Ensure 99.99% availability of our core applicant tracking services, automated deployments, Kubernetes clusters, and observability infrastructure.',
    responsibilities: [
      'Manage multi-region Kubernetes clusters and Terraform infrastructure as code.',
      'Establish SLOs/SLIs, synthetic probing, and automated incident triage workflows.',
      'Optimize cloud spend and implement automated auto-scaling policies.'
    ],
    requirements: [
      '4+ years SRE or DevOps experience with Kubernetes, Terraform, and cloud environments.',
      'Hands-on expertise with Prometheus, Grafana, Datadog, or OpenTelemetry.',
      'Strong scripting skills in Python, Go, or Bash.'
    ],
    tags: ['Kubernetes', 'Terraform', 'Docker', 'AWS', 'Observability'],
    benefits: [
      'Comprehensive healthcare coverage',
      'Home office internet and equipment stipend',
      'Annual retention bonuses'
    ],
    postedDate: '2026-10-25',
    status: 'active',
    applicantsCount: 2,
    screeningQuestions: [
      {
        id: 'sq-devops-1',
        question: 'Years of Kubernetes in production?',
        type: 'number',
        required: true
      }
    ]
  }
];

export const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'app-001',
    jobId: 'job-101',
    jobTitle: 'Senior Frontend Engineer (React & TypeScript)',
    companyName: 'Apex Cloud Systems',
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Jose, CA',
    linkedinUrl: 'https://linkedin.com/in/alex-vance-dev',
    portfolioUrl: 'https://alexvance.io',
    experienceYears: 6,
    currentRole: 'Senior React Developer at CloudScale',
    resumeFileName: 'Alex_Vance_Staff_Frontend_Resume.pdf',
    resumeFileSize: '240 KB',
    resumeText: `Alex Vance — Senior Frontend Engineer
Experience:
- Senior Frontend Developer at CloudScale (2022-Present): Led frontend migration to React 19, TypeScript, and Vite. Cut bundle size by 42%. Built custom component design tokens.
- Frontend Engineer at DataMetrics (2019-2022): Developed high-throughput streaming dashboards with WebSockets, Tailwind CSS, and TanStack Table.
Skills: React, TypeScript, Tailwind CSS, Next.js, Redux Toolkit, WebSockets, WCAG AA, Jest, Vitest.
Education: B.S. in Computer Science, UC Berkeley.`,
    screeningAnswers: {
      'sq-1': '6',
      'sq-2': 'No, authorized to work indefinitely',
      'sq-3': 'Architected a normalized optimistic update cache using Zustand and web workers for 100k data points.'
    },
    coverNote: 'Excited about Apex Cloud Systems mission. I have spent the last 5 years honing high-performance UI engineering and would love to contribute to your core design system.',
    appliedAt: '2026-10-25',
    stage: 'interview',
    matchScore: 94,
    matchDetails: {
      matchingSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'State Architecture'],
      missingSkills: ['GraphQL (minor)'],
      summary: 'Exceptional alignment with frontend requirements and performance optimization standards.'
    },
    rating: 5,
    notes: [
      {
        id: 'note-1',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Strong communication during initial 30-min screen. Candidate has direct experience scaling React 19 and custom design tokens.',
        createdAt: '2026-10-26 14:30'
      },
      {
        id: 'note-2',
        author: 'Marcus Brody (Hiring Manager)',
        text: 'Technical architecture review scheduled for Friday. Portfolio and open source samples look clean.',
        createdAt: '2026-10-27 10:15'
      }
    ],
    interviewDate: '2026-11-04 14:00 PST'
  },
  {
    id: 'app-002',
    jobId: 'job-101',
    jobTitle: 'Senior Frontend Engineer (React & TypeScript)',
    companyName: 'Apex Cloud Systems',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@techmail.org',
    phone: '+1 (555) 456-7890',
    location: 'Denver, CO',
    linkedinUrl: 'https://linkedin.com/in/elena-rostova-tech',
    portfolioUrl: 'https://rostova-ui.dev',
    experienceYears: 5,
    currentRole: 'Lead UI Engineer at FinPulse',
    resumeFileName: 'Elena_Rostova_Resume.pdf',
    resumeFileSize: '185 KB',
    resumeText: `Elena Rostova — Lead UI Engineer
Experience:
- Lead UI Engineer at FinPulse (2021-Present): Designed accessible trading interfaces, managed design systems, and enforced strict WCAG AAA guidelines.
- Frontend Engineer at StreamLogic (2018-2021): Built React components and internal dashboard tools.
Skills: React, TypeScript, GraphQL, Tailwind CSS, Accessibility, Storybook, Cypress.`,
    screeningAnswers: {
      'sq-1': '5',
      'sq-2': 'No, authorized to work indefinitely',
      'sq-3': 'Built custom accessible keyboard navigation matrices for data-dense tables.'
    },
    coverNote: 'Hello team, your focus on usability and design standards aligns deeply with my passion for accessible, resilient web applications.',
    appliedAt: '2026-10-27',
    stage: 'screening',
    matchScore: 89,
    matchDetails: {
      matchingSkills: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Accessibility'],
      missingSkills: ['Cloud monitoring domains'],
      summary: 'Solid candidate with deep accessibility credentials and modern frontend toolkit.'
    },
    rating: 4,
    notes: [
      {
        id: 'note-3',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Resume cleared automated screening with high skill overlap. Phone screen scheduled.',
        createdAt: '2026-10-28 09:20'
      }
    ]
  },
  {
    id: 'app-003',
    jobId: 'job-101',
    jobTitle: 'Senior Frontend Engineer (React & TypeScript)',
    companyName: 'Apex Cloud Systems',
    fullName: 'Jordan Taylor',
    email: 'jordan.t@inbox.io',
    phone: '+1 (555) 876-5432',
    location: 'Austin, TX',
    experienceYears: 4,
    currentRole: 'Software Engineer at DevStream',
    resumeFileName: 'Jordan_Taylor_CV.pdf',
    resumeFileSize: '310 KB',
    resumeText: `Jordan Taylor — Software Engineer
Experience:
- Software Engineer at DevStream (2022-Present): Contributed to customer-facing web apps in Vue & React.
- Junior Developer at WebCraft (2020-2022): Built landing pages and promotional portals.
Skills: JavaScript, React, Vue, CSS, Node.js, HTML5.`,
    screeningAnswers: {
      'sq-1': '4',
      'sq-2': 'No, authorized to work indefinitely',
      'sq-3': 'Used Redux and Context API to pass state down parent-child trees.'
    },
    appliedAt: '2026-10-28',
    stage: 'new',
    matchScore: 72,
    matchDetails: {
      matchingSkills: ['React', 'JavaScript'],
      missingSkills: ['TypeScript (advanced)', 'Tailwind CSS', 'Performance profiling'],
      summary: 'Good baseline experience, but slightly below target senior requirements for TypeScript.'
    },
    notes: []
  },
  {
    id: 'app-004',
    jobId: 'job-104',
    jobTitle: 'Senior QA Automation & Test Engineer',
    companyName: 'Apex Cloud Systems',
    fullName: 'Marcus Brody',
    email: 'marcus.brody.qa@testops.net',
    phone: '+1 (555) 912-3456',
    location: 'Portland, OR',
    linkedinUrl: 'https://linkedin.com/in/marcus-brody-qa',
    experienceYears: 7,
    currentRole: 'Lead SDET at AutoVerify Inc',
    resumeFileName: 'Marcus_Brody_SDET.pdf',
    resumeFileSize: '215 KB',
    resumeText: `Marcus Brody — Principal QA Automation Engineer
Experience:
- Lead SDET at AutoVerify (2020-Present): Designed multi-tier automated test harness covering smoke, regression, and stress testing. Reduced regression cycle from 4 days to 45 minutes.
- Automation Engineer at CloudCheck (2017-2020): Playwright, Cypress, Jest, and CI/CD GitHub Actions test workflows.
Skills: QA Automation, Playwright, TypeScript, API Fuzzing, Boundary Analysis, CI/CD, Jest.`,
    screeningAnswers: {
      'sq-qa-1': 'Playwright and Vitest with parallel execution runners',
      'sq-qa-2': 'I formulate boundary equivalence partitions, verify edge states (empty strings, format regex, boundary lengths), and automate continuous smoke checks on critical user conversion funnels.'
    },
    appliedAt: '2026-10-26',
    stage: 'offer',
    matchScore: 97,
    matchDetails: {
      matchingSkills: ['QA Testing', 'TypeScript', 'Playwright', 'API Automation', 'CI/CD'],
      missingSkills: [],
      summary: 'Flawless interview scores across testing theory, automated harness design, and edge case discovery.'
    },
    rating: 5,
    notes: [
      {
        id: 'note-4',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Offer package extended: $160,000 base + equity. Awaiting candidate formal sign-off.',
        createdAt: '2026-10-30 16:45'
      }
    ]
  },
  {
    id: 'app-005',
    jobId: 'job-103',
    jobTitle: 'Lead Product Designer (Design Systems & ATS)',
    companyName: 'TalentForge',
    fullName: 'Maya Lin',
    email: 'maya.design@studiolin.com',
    phone: '+1 (555) 345-6789',
    location: 'San Francisco, CA',
    portfolioUrl: 'https://mayalin.design',
    experienceYears: 6,
    currentRole: 'Senior Product Designer at LinearCraft',
    resumeFileName: 'Maya_Lin_Portfolio_Resume.pdf',
    resumeFileSize: '420 KB',
    resumeText: `Maya Lin — Senior Product Designer & Design Systems Lead
Experience:
- Senior Designer at LinearCraft (2021-Present): Designed modular design systems adopted by 14 product squads. Authored WCAG accessibility documentation and micro-interaction specifications.
- Product Designer at MetricFlow (2018-2021): Revamped recruiter ATS workflows resulting in 30% speedup in applicant review.
Skills: Figma, Design Tokens, Design Systems, UX Research, HTML/CSS prototyping, WCAG AA.`,
    screeningAnswers: {
      'sq-des-1': 'https://mayalin.design/case-studies/ats-redesign',
      'sq-des-2': 'Yes, from scratch'
    },
    appliedAt: '2026-10-27',
    stage: 'interview',
    matchScore: 96,
    matchDetails: {
      matchingSkills: ['Figma', 'Design Systems', 'UX Research', 'Prototyping', 'WCAG'],
      missingSkills: [],
      summary: 'Ideal background with direct domain experience redesigning modern ATS and recruiter platforms.'
    },
    rating: 5,
    notes: [
      {
        id: 'note-5',
        author: 'Sarah Jenkins (Recruiter)',
        text: 'Design portfolio presentation blew the team away. Final culture alignment round scheduled.',
        createdAt: '2026-10-29 11:00'
      }
    ],
    interviewDate: '2026-11-03 11:30 PST'
  }
];
