import { Job, InterviewQuestion } from '../types';

export function generateRoleInterviewQuestions(job: Job): InterviewQuestion[] {
  const title = job.title.toLowerCase();

  if (title.includes('frontend') || title.includes('react')) {
    return [
      {
        id: 'fe-q1',
        category: 'technical',
        question: 'How do you optimize render performance and prevent wasteful re-renders in a large-scale React 19 application?',
        keyConcepts: ['React Compiler / useMemo', 'Virtual DOM Diffing', 'State Normalization', 'Fine-grained Reactivity'],
        suggestedAnswer: 'Identify bottlenecks with React DevTools Profiler. Minimize unnecessary re-renders by colocation of state, keeping state close to the consumer components, breaking large objects into primitive atoms, and utilizing useTransition / startTransition for non-blocking UI updates. In React 19, the compiler automates memoization, but architectural containment remains vital.',
        starTip: 'Structure response: State the profiling tool used (S), the render lag identified (T), the refactoring approach applied (A), and measurable FPS / TTI reduction (R).'
      },
      {
        id: 'fe-q2',
        category: 'system_design',
        question: 'How would you architect an enterprise Design System with WCAG AA compliance across multiple engineering squads?',
        keyConcepts: ['Design Tokens', 'Headless UI & ARIA', 'Semantic Colors', 'Keyboard Navigation Matrices'],
        suggestedAnswer: 'Establish a token layer (spacing, typography, semantic color pairings for light/dark) transformed to CSS variables. Decouple logic from presentation using headless primitives that satisfy WAI-ARIA authoring practices (roving tabindex, focus traps, aria-live). Build automated visual regression and axe-core accessibility checks into CI/CD.',
        starTip: 'Highlight how design tokens prevent hardcoded hex values and guarantee 4.5:1 contrast across high and low light environments.'
      },
      {
        id: 'fe-q3',
        category: 'behavioral',
        question: 'Describe a disagreement you had with a product manager or designer over technical feasibility or scope, and how you resolved it.',
        keyConcepts: ['Trade-off Communication', 'Data-driven Compromise', 'User Empathy', 'Phased Delivery'],
        suggestedAnswer: 'When a designer proposed custom nested modal workflows that violated accessibility guidelines and increased bundle weight, I created a rapid interactive prototype demonstrating the friction on mobile viewports. I proposed a phased drawer solution that preserved the user delight while cutting delivery time in half.',
        starTip: 'Focus on collaboration rather than winning the argument; show empathy for business priorities and end-user ergonomics.'
      }
    ];
  }

  if (title.includes('qa') || title.includes('test') || title.includes('automation')) {
    return [
      {
        id: 'qa-q1',
        category: 'technical',
        question: 'Explain Boundary Value Analysis (BVA) and Equivalence Partitioning with an example from an application form.',
        keyConcepts: ['BVA (Min - 1, Min, Max, Max + 1)', 'Equivalence Partitions', 'Defect Prevention', 'Test Case Optimization'],
        suggestedAnswer: 'Equivalence Partitioning divides input ranges into valid and invalid classes (e.g. phone numbers with 10 digits vs fewer or non-numeric). Boundary Value Analysis focuses on boundary limits: if salary min is $0 and max is $300k, we test -1, 0, 1, 299,999, 300,000, 300,001. Most defects cluster at input boundaries due to off-by-one errors or comparison operator errors (e.g. < instead of <=).',
        starTip: 'Mention how this technique was implemented in HIRE-HUB to validate salary bands and phone digit lengths.'
      },
      {
        id: 'qa-q2',
        category: 'system_design',
        question: 'How do you design a reliable End-to-End automated testing harness that prevents flakiness in CI pipelines?',
        keyConcepts: ['Playwright/Cypress', 'Hermetic Test Data', 'Page Object Model', 'Deterministic Selectors'],
        suggestedAnswer: 'Flakiness usually stems from dynamic timing, shared state, or fragile CSS selectors. Eliminate timing flakiness with auto-waiting assertions (Playwright expect.toBeVisible). Seed hermetic data per test run rather than relying on shared production state, and use accessible locator strategies (role, accessible name) rather than deep DOM paths.',
        starTip: 'Frame flakiness as a business risk: false positives lead to teams ignoring broken test runs.'
      },
      {
        id: 'qa-q3',
        category: 'behavioral',
        question: 'Tell me about a critical production defect that slipped through testing and how you prevented its recurrence.',
        keyConcepts: ['Blameless Postmortem', 'Root Cause Analysis (5 Whys)', 'Regression Prevention', 'Shift-Left Testing'],
        suggestedAnswer: 'During a release, a state transition bug occurred where candidates could skip screening questions if they refreshed the browser mid-wizard. We conducted a blameless postmortem, pinpointed the unpersisted wizard state, added persistent schema validation in localStorage, and introduced automated integration tests specifically covering mid-funnel page refreshes.',
        starTip: 'Emphasize systemic improvements and automated regression coverage over individual blame.'
      }
    ];
  }

  if (title.includes('designer') || title.includes('product') || title.includes('ux')) {
    return [
      {
        id: 'des-q1',
        category: 'system_design',
        question: 'Walk me through your methodology for establishing visual hierarchy without relying on heavy badges or pill enclosures.',
        keyConcepts: ['Typographic Scale', 'Whitespace Margins', 'Zero-Pill Discipline', '60-30-10 Color Allocation'],
        suggestedAnswer: 'I rely on typographic scale and spatial weight rather than candy badge enclosures. Primary titles lead with crisp display type, supported by unboxed metadata separated with quiet typographic dots (·). Color is allocated with discipline (60% canvas, 30% structural surfaces, 10% high-intent action points), ensuring immediate focal clarity.',
        starTip: 'Reference HIRE-HUB design constitution: clean unboxed text allows scanning 3x faster than high-saturation badge pills.'
      },
      {
        id: 'des-q2',
        category: 'technical',
        question: 'How do you conduct usability testing to discover unexpected user behaviors and input friction?',
        keyConcepts: ['Think-Aloud Protocol', 'Form Field Analytics', 'Task Success Rate', 'Error Recovery'],
        suggestedAnswer: 'I run task-based testing sessions where participants perform realistic workflows (e.g. searching with specific salary bounds, completing multi-step applications). I observe hesitation points, error recovery speed, and cognitive load. If users repeatedly struggle on a step, we simplify validation prompts and provide contextual hints.',
        starTip: 'Provide quantitative metrics alongside qualitative notes: time on task, completion rate, error recovery time.'
      }
    ];
  }

  // General engineering / infrastructure default
  return [
    {
      id: 'gen-q1',
      category: 'technical',
      question: `How do you architect scalable, fault-tolerant user workflows for ${job.title}?`,
      keyConcepts: ['Idempotency', 'State Machines', 'Input Sanitization', 'Error Boundaries'],
      suggestedAnswer: 'Model critical flows as formal state machines with explicit allowable transitions. Enforce strict input validation on both client and server boundaries, implement optimistic UI with rollback resilience on error, and ensure all mutation operations are idempotent.',
      starTip: 'Link theoretical concepts to concrete user outcomes: no duplicate submissions, zero dead clicks, resilient error states.'
    },
    {
      id: 'gen-q2',
      category: 'behavioral',
      question: 'How do you balance engineering perfectionism with rapid product delivery when launching new features?',
      keyConcepts: ['MVP Scoping', 'Technical Debt Tracking', 'Iterative Delivery', 'Quality Gates'],
      suggestedAnswer: 'I prioritize rock-solid foundations: strict input validation, correct data models, and automated test coverage on core conversion flows. Visual polish and auxiliary features are delivered iteratively, ensuring user feedback shapes subsequent sprints while maintaining zero regressions.',
      starTip: 'Explain how building functional test runners upfront accelerates subsequent iteration velocity.'
    }
  ];
}
