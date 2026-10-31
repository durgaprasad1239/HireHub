# HIRE-HUB – Job Recruitment Platform Web Application

> A modern, production-grade recruitment and talent management platform engineered with React 19, TypeScript, Tailwind CSS v4, and an integrated Functional Testing & Flow Verification Engine.

---

## 📌 Problem Statement

Traditional job boards and recruitment tools suffer from several critical industry challenges:

1. **Fragmented User Workflows**: Job seekers apply into "black hole" platforms with zero visibility into their application stages, while recruiters struggle with disconnected spreadsheets and clunky applicant tracking systems (ATS).
2. **Lack of Transparent Compensation & Role Criteria**: Postings often omit salary bands, experience tiers, and clear technology stacks, leading to high mismatch rates and wasted interview cycles.
3. **Weak Input Validation & Dead-Click UIs**: Many web applications suffer from fragile form submissions, poor boundary validation (e.g. invalid emails, corrupt salary inputs), and non-functional interactive controls.
4. **Absence of Verifiable Software Reliability**: Software evaluators, QA teams, and hiring managers rarely have an automated way to verify application constraints and conversion funnels live in the browser.

---

## 💡 Solution

**HIRE-HUB** solves these problems with a unified, dual-persona recruitment ecosystem:

* **For Job Seekers**: Multifaceted discovery with transparent salary bands, an instant ATS Resume Keyword Matcher (55%–98% fit score calculation with matching vs. missing skill breakdowns), a 4-step validated application wizard, real-time stage tracking, and an AI-assisted interview preparation copilot.
* **For Recruiters**: An interactive 5-stage drag-and-drop Kanban ATS pipeline (*New Applicants* $\rightarrow$ *Screening* $\rightarrow$ *Technical Interview* $\rightarrow$ *Offer Extended* $\rightarrow$ *Archived*), candidate evaluation scorecards, timestamped interviewer notes, interview scheduling, and automated formal offer letter generation.
* **For Evaluators & Technical Interviewers**: A built-in **Flow QA Suite** that runs automated functional assertions (Boundary Value Analysis, Equivalence Partitioning, State Transitions) and an interactive **Student Presentation & Viva Guide** to explain architecture, design decisions, and testing theory.

---

## 🛠 Technologies Used

| Layer | Technologies & Tools |
| :--- | :--- |
| **Frontend Framework** | **React 19** (Functional components, hooks, strict mode) |
| **Language & Typings** | **TypeScript 7** (Strict type safety, custom interfaces) |
| **Styling & Design System** | **Tailwind CSS v4** (`@import "tailwindcss"`, `@custom-variant dark`, Zero-Pill Typographic Discipline) |
| **Typography** | `Plus Jakarta Sans` (Display/Brand), `DM Sans` (Body prose), `JetBrains Mono` (Tabular figures) |
| **Icons & Animations** | **Lucide React**, **Motion** |
| **Build & Tooling** | **Vite 8**, **TSX** |
| **State & Persistence** | Synchronous React State + persistent `localStorage` synchronization with deterministic seed fallback |
| **Quality & Verification** | Built-in Functional Testing Harness, Boundary Value Fuzzer, `tsc --noEmit` linting |

---

## 🚀 Key Features

### 1. Job Discovery & Multifaceted Search (Job Seeker)
* **Real-time Keyword Filtering**: Instant search across titles, descriptions, and technology tags.
* **Segmented Work Mode Filters**: Filter positions by *Remote*, *Hybrid*, or *Onsite* arrangements.
* **Salary Floor Filtering**: Filter by minimum annual compensation using tabular numerals (`tabular-nums`) for vertical scanning.
* **Zero-Pill Typographic Design**: Clean, unboxed metadata separated by quiet typographic bullets (`·`) rather than heavy pill badge enclosures.
* **Requisition Detail Modal**: Deep dive into responsibilities, qualifications, tech stack, and company campus showcase.
* **Instant Bookmarking**: 1-click vacancy saving with persistent local storage.

### 2. Multi-Step Validated Application Wizard
* **Step 1: Contact & Personal Info**: Client-side validation enforcing full name, email regex format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), phone digit length ($\ge 10$), and current role.
* **Step 2: Resume Ingestion & Live ATS Fit Analysis**: Upload, paste, or select pre-verified professional profiles. The algorithm calculates matching qualifications, highlights missing skills, and predicts match percentage.
* **Step 3: Screening Questionnaire**: Dynamic questions configured by recruiters (text, numeric, or multi-choice) with required-field validation.
* **Step 4: Review & Confirmation**: Consolidated dossier verification before submission, generating an application tracking ID.

### 3. Candidate Application Hub ("My Applications")
* **Visual Stage Progression Stepper**: Real-time tracking through *Submitted* $\rightarrow$ *Screening* $\rightarrow$ *Technical Interview* $\rightarrow$ *Offer Extended*.
* **Scheduled Interview Alerts**: Calendar invitations and meeting slot displays.
* **Application Management**: Ability to inspect submission details or withdraw applications.

### 4. Recruiter ATS Console & Kanban Board
* **Interactive Drag-and-Drop Kanban**: Drag candidate cards directly between the 5 hiring columns with visual drop target styling.
* **Recruiter KPI Strip**: Summary metrics covering Active Roles, Pipeline Volume, Candidates in Interview, Offers Extended, and Average Time-to-Hire (18.4 days).
* **Candidate Evaluation Dossier**: Full parsed resume viewer, 1-to-5 star scorecard ratings, interview scheduling date picker, and timestamped interviewer notes log.
* **Requisition Creator**: Recruiter form with boundary validation (enforcing `salaryMin <= salaryMax`), custom screening question builder, and live catalog publishing.

---

## ⚡ Installation & Local Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/hire-hub.git
   cd hire-hub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *The application will launch on `http://localhost:3000` with hot reloading.*

4. **Verify Type Safety & Linting**
   ```bash
   npm run lint
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

> **Note**: No third-party API keys or external database configurations are required to run or test the project locally. Pre-seeded demo datasets and local storage synchronization allow the full app to run immediately upon cloning.

---

## 🌟 Additional Features

### 1. Student Presentation & Technical Viva Guide (`StudentShowcaseGuide.tsx`)
*Accessible from the top navigation bar, the hero banner, and the floating bottom-right badge.*
* **30-Second Elevator Pitch**: Pre-formulated project pitch designed for interviews with 1-click copy.
* **Architecture & Component Tree**: Visual hierarchy of layout wrappers, modals, state containers, and data flows.
* **Software Testing Theory**: Maps academic concepts directly to code:
  * **Boundary Value Analysis (BVA)**: Tested on salary bands (`salaryMin <= salaryMax`) and phone digit minimums.
  * **Equivalence Partitioning (EP)**: Valid vs. invalid classes on email regex format.
  * **State Transition Testing**: State machine validation for Kanban stage promotions.
* **Top 5 Viva Q&A**: Model answers to questions commonly asked by technical interviewers.
* **Key Code Snippets**: Quick references to point to in code reviews.

### 2. AI Interview Preparation Copilot (`InterviewPrepModal.tsx`)
*Available on every job requisition card and from "My Applications".*
* Generates role-specific questions across **Technical**, **System Design**, and **Behavioral** categories.
* Details key evaluation concepts interviewers look for, complete with high-scoring model responses.
* Provides **STAR Method Strategy Tips** (Situation, Task, Action, Result) and a candidate practice notepad.

### 3. Recruitment Funnel & Pipeline Analytics (`RecruitmentAnalyticsView.tsx`)
*Accessed via the "Funnel Analytics" button in the Recruiter Console.*
* **Visual Conversion Funnel**: Tracks candidate progression from Inbound ($100\%$) $\rightarrow$ Screening $\rightarrow$ Technical Interview $\rightarrow$ Formal Offer with stage drop-off percentages.
* **Velocity Metrics**: Visualizes average time-to-hire (18.4 days), average skill match scores, and interview-to-offer rates.
* **Departmental Volume Distribution**: Bar charts showing application volumes across Engineering, Design, QA, and DevOps.

### 4. Official Offer Letter & Communications Generator (`OfferLetterModal.tsx`)
*Accessed from any candidate dossier or Kanban card.*
* Generates formal employment offer letters with customizable base salary, equity grants, sign-on bonuses, and start dates.
* Generates technical interview invitations with agenda and Google Meet details.
* Includes 1-click **Copy to Clipboard** and **Print Dossier** functionality.

### 5. Role-Based Access Control (RBAC) & 1-Click Demo Accounts
* **Zero-Friction Demo Mode**: App opens immediately without blocking login barriers so evaluators can inspect features instantly.
* **1-Click Pre-configured Demo Accounts**:
  * **Sarah Jenkins**: Senior Talent Acquisition Partner @ Apex Cloud Systems (`recruiter`)
  * **Alex Vance**: Senior Frontend Engineer (`seeker`)
* **RBAC Security Guard Screen (`RBACGuard.tsx`)**: Demonstrates HTTP 403 Forbidden patterns if unauthorized roles attempt to access confidential pipeline data.

### 6. Flow QA Test Runner & Boundary Fuzzer (`QATestSuiteModal.tsx`)
* Runs 6 automated functional test suites with animated execution, millisecond durations, and pass/fail indicators.
* Features an **Interactive Boundary Fuzzer** allowing testers to live-test email regex edge cases (missing TLD, double dots), phone digit counts, and salary boundary invariant violations.

---

## 🔮 Future Enhancements

* [ ] **Calendar & Video Meeting Integration**: Direct Google Calendar and Zoom API integration for automated interview calendar invites.
* [ ] **Real-Time WebSockets Messaging**: Candidate-recruiter live direct messaging channel with read receipts and typing indicators.
* [ ] **Server-Side OCR Resume Parsing**: Support for binary `.pdf` and `.docx` parsing using server-side extraction microservices.
* [ ] **AI-Powered Asynchronous Video Screening**: Timed candidate video response recording with automated transcript analysis.
* [ ] **Multi-Tenant Enterprise Teams**: Departmental role permissions (Super Admin, Hiring Manager, Technical Interviewer, Department Lead).
* [ ] **Cloud Database Persistence**: Cloud SQL / PostgreSQL integration with Prisma ORM for multi-device cross-browser state synchronization.

---

## 📄 License & Attribution

This project is open-source under the Apache-2.0 License. Built for technical portfolio presentations, engineering interviews, and software testing demonstration.
