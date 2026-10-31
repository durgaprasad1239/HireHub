import { AuthUser } from '../types';

export const DEMO_USERS: Record<string, AuthUser> = {
  recruiter: {
    id: 'user-recruiter-sarah',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@apexcloud.io',
    role: 'recruiter',
    title: 'Senior Talent Acquisition Partner',
    company: 'Apex Cloud Systems',
    avatarUrl: '/src/assets/images/avatar_recruiter_sarah_1793442334418.jpg'
  },
  seeker: {
    id: 'user-seeker-alex',
    name: 'Alex Vance',
    email: 'alex.vance@example.com',
    role: 'seeker',
    title: 'Senior Frontend Engineer',
    avatarUrl: '/src/assets/images/avatar_candidate_alex_1793442334452.jpg'
  }
};
