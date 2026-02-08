/** Database row types — match the Supabase table columns */

export interface DbPersonalInfo {
  id: number;
  name: string;
  role: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  availability: string;
  image_url: string | null;
  resume_url: string | null;
  updated_at: string;
}

export interface DbEducation {
  id: number;
  institution: string;
  degree: string;
  period: string;
  status: string;
  description: string;
  skills: string[];
  sort_order: number;
  updated_at: string;
}

export interface DbSkillCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  items: string[];
  sort_order: number;
  updated_at: string;
}

export interface DbProject {
  id: number;
  title: string;
  description: string;
  long_description: string | null;
  category: string;
  tags: string[];
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  featured: boolean;
  sort_order: number;
  updated_at: string;
}

export interface DbSocialLinks {
  id: number;
  linkedin: string | null;
  github: string | null;
  email: string | null;
  updated_at: string;
}

export interface DbSiteMetadata {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string | null;
  keywords: string[];
  updated_at: string;
}
