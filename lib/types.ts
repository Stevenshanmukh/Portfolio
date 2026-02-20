export interface SkillCategory {
  icon: string;
  description: string;
  items: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  /** @deprecated unused */
  longDescription?: string;
  categories: string[];
  /** @deprecated use categories */
  category?: string;
  tags: string[];
  image: string;
  github: string | null;
  demo: string | null;
  featured: boolean;
}
