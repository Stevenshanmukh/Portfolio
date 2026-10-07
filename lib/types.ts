export interface Project {
  id: string;
  title: string;
  description: string;
  /** Shown in the "show more" modal; falls back to `description`. */
  longDescription?: string;
  categories: string[];
  tags: string[];
  /** Absolute image URL, or "" when none is set. */
  image: string;
  github: string | null;
  demo: string | null;
  featured: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  /** lucide-react icon name; see `iconMap` in SkillsSection. */
  icon: string;
  description: string;
  items: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  /** "" when not set. */
  companyUrl: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status: string;
  description: string;
  skills: string[];
}

export interface PortfolioPageData {
  personalInfo: {
    name: string;
    role: string;
    tagline: string;
    description: string;
    aboutDescription: string;
    email: string;
    location: string;
    availability: string;
    /** Absolute image URL, or "" when none is set. */
    image: string;
    /** Absolute PDF URL, or "" when none is uploaded. */
    resume: string;
  };
  socialLinks: {
    linkedin: string;
    github: string;
  };
  experience: Experience[];
  education: Education[];
  certifications: string[];
  skills: SkillCategory[];
  projects: Project[];
  /** Filter tabs, in Studio order; only categories that have projects. */
  projectCategories: string[];
  siteMetadata: {
    title: string;
    description: string;
    url: string;
    /** Absolute image URL, or "" when none is set. */
    image: string;
    keywords: string[];
  };
}
