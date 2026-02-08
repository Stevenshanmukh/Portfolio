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
