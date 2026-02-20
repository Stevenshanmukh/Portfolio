import { createServerSupabase } from "./server";
import type {
  DbPersonalInfo,
  DbEducation,
  DbSkillCategory,
  DbProject,
  DbSocialLinks,
  DbSiteMetadata,
} from "./types";

import type { Project } from "@/lib/types";

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
    image: string;
    resume: string;
  };
  socialLinks: {
    linkedin: string;
    github: string;
    email: string;
  };
  education: {
    id: number;
    institution: string;
    degree: string;
    period: string;
    status: string;
    description: string;
    skills: string[];
  }[];
  skills: Record<
    string,
    {
      icon: string;
      description: string;
      items: string[];
    }
  >;
  projects: Project[];
  siteMetadata: {
    title: string;
    description: string;
    url: string;
    image: string;
    keywords: string[];
    projectCategories: string[];
  };
}

// ─── Mappers ─────────────────────────────────────────────────────────

function mapPersonalInfo(row: DbPersonalInfo) {
  return {
    name: row.name,
    role: row.role,
    tagline: row.tagline,
    description: row.description,
    aboutDescription: row.about_description,
    email: row.email,
    location: row.location,
    availability: row.availability,
    image: row.image_url || "/images/profile.jpg",
    resume: row.resume_url || "/resume.pdf",
  };
}

function mapEducation(rows: DbEducation[]) {
  return rows.map((row) => ({
    id: row.id,
    institution: row.institution,
    degree: row.degree,
    period: row.period,
    status: row.status,
    description: row.description,
    skills: row.skills || [],
  }));
}

function mapSkills(rows: DbSkillCategory[]) {
  const skills: PortfolioPageData["skills"] = {};
  rows.forEach((row) => {
    skills[row.name] = {
      icon: row.icon,
      description: row.description,
      items: row.items || [],
    };
  });
  return skills;
}

function mapProjects(rows: DbProject[]): Project[] {
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    // longDescription removed/deprecated
    category: row.category,
    categories: row.categories || (row.category ? [row.category] : []),
    tags: row.tags || [],
    image: row.image_url || "/images/projects/placeholder.jpg",
    github: row.github_url,
    demo: row.demo_url,
    featured: row.featured,
  }));
}

function mapSiteMetadata(row: DbSiteMetadata) {
  return {
    title: row.title,
    description: row.description,
    url: row.url,
    image: row.image || "/images/og-image.jpg",
    keywords: row.keywords || [],
    projectCategories: row.project_categories || [],
  };
}

// ─── Fetcher ─────────────────────────────────────────────────────────

export async function fetchAllPortfolioData(): Promise<PortfolioPageData> {
  try {
    const supabase = await createServerSupabase();

    const [pi, edu, skills, proj, social, meta] = await Promise.all([
      supabase.from("personal_info").select("*").single(),
      supabase.from("education").select("*").order("sort_order"),
      supabase.from("skill_categories").select("*").order("sort_order"),
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("social_links").select("*").single(),
      supabase.from("site_metadata").select("*").single(),
    ]);

    // Handle missing single-row data by returning defaults if necessary
    // In a real app, you might want to throw or handle initialization better.
    if (!pi.data || !social.data || !meta.data) {
      throw new Error("Missing critical portfolio data");
    }

    return {
      personalInfo: mapPersonalInfo(pi.data),
      socialLinks: {
        linkedin: social.data.linkedin || "",
        github: social.data.github || "",
        email: social.data.email || "",
      },
      education: mapEducation(edu.data || []),
      skills: mapSkills(skills.data || []),
      projects: mapProjects(proj.data || []),
      siteMetadata: mapSiteMetadata(meta.data),
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    // Return fallback data if DB fails
    return {
      personalInfo: {
        name: "Steven Lagadapati",
        role: "Data Science Master",
        tagline: "Data Scientist in Training",
        description: "Error loading data.",
        aboutDescription: "",
        email: "",
        location: "",
        availability: "",
        image: "",
        resume: "",
      },
      socialLinks: { linkedin: "", github: "", email: "" },
      education: [],
      skills: {},
      projects: [],
      siteMetadata: {
        title: "Portfolio",
        description: "",
        url: "",
        image: "",
        keywords: [],
        projectCategories: [],
      },
    };
  }
}
