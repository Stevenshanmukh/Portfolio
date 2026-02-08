export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  availability: string;
  image: string;
  resume: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  status: string;
  description: string;
  skills: string[];
}

export interface SkillCategory {
  icon: string;
  description: string;
  items: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  image: string;
  github: string | null;
  demo: string | null;
  featured: boolean;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  email: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  image: string;
  keywords: string[];
}
