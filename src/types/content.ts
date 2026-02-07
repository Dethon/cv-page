// TypeScript interfaces for CV content

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Role {
  title: string;
  startDate: string;
  endDate: string | 'Present';
  location: string;
  achievements: string[];
}

export interface ExperienceEntry {
  company: string;
  roles: Role[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
}

/**
 * Formats an ISO YYYY-MM date string or 'Present' to a human-readable format.
 * @param date - ISO date string (e.g., "2023-04") or 'Present'
 * @returns Formatted date (e.g., "April 2023") or 'Present'
 */
export function formatDate(date: string | 'Present'): string {
  if (date === 'Present') {
    return 'Present';
  }

  const [year, month] = date.split('-');
  const dateObj = new Date(parseInt(year), parseInt(month) - 1);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  }).format(dateObj);
}
