export interface Artifact {
  url: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Shown when a project is expanded; falls back to `description`. */
  longDescription?: string;
  categories: string[];
  tags: string[];
  /** Absolute image URL for structured data, or "" when none is set. */
  image: string;
  github: string | null;
  demo: string | null;
  caseStudy: boolean;
  caseStudyPoints: string[];
  artifact: Artifact | null;
}

export interface SkillCategory {
  id: string;
  name: string;
  /** lucide-react icon name; see `iconMap` in SkillsSection. */
  icon: string;
  description: string;
  items: string[];
}

export interface ExperienceSystem {
  name: string;
  actsOn: string;
  guardrail: string;
  result: string;
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
  /** Ledger rows; when present they replace `highlights`. */
  systems: ExperienceSystem[];
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

export type RunStepKind = "read" | "check" | "plan" | "approve" | "write";

export interface RunStep {
  kind: RunStepKind;
  text: string;
}

export interface Guardrail {
  label: string;
  title: string;
  body: string;
  seenIn: string;
}

export interface ProofPoint {
  value: string;
  label: string;
}

export interface PortfolioPageData {
  personalInfo: {
    name: string;
    role: string;
    tagline: string;
    headline: string;
    description: string;
    aboutDescription: string;
    email: string;
    location: string;
    availability: string;
    /** Absolute image URL, or "" when none is set. */
    image: string;
    /** Absolute PDF URL, or "" when none is uploaded. */
    resume: string;
    proofPoints: ProofPoint[];
    runTraceTitle: string;
    runTrace: RunStep[];
    guardrails: Guardrail[];
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
  /** Category order from Studio; only categories that have projects. */
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
