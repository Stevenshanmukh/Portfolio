import { createServerSupabase } from "./server";
import type {
  DbPersonalInfo,
  DbEducation,
  DbSkillCategory,
  DbProject,
  DbSocialLinks,
  DbSiteMetadata,
} from "./types";

// Fallback data used when Supabase is unreachable or tables are empty
import {
  personalInfo as fallbackPersonalInfo,
  education as fallbackEducation,
  skills as fallbackSkills,
  projects as fallbackProjects,
  socialLinks as fallbackSocialLinks,
  siteMetadata as fallbackSiteMetadata,
} from "@/data/portfolio";

// ─── Types matching the frontend context shape ──────────────────

export interface PortfolioPageData {
  personalInfo: {
    name: string;
    role: string;
    tagline: string;
    description: string;
    email: string;
    location: string;
    availability: string;
    image: string;
    resume: string;
  };
  education: {
    institution: string;
    degree: string;
    period: string;
    status: string;
    description: string;
    skills: string[];
  }[];
  skills: Record<string, { icon: string; description: string; items: string[] }>;
  projects: {
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
  }[];
  socialLinks: {
    linkedin: string;
    github: string;
    email: string;
  };
  siteMetadata: {
    title: string;
    description: string;
    url: string;
    image: string;
    keywords: string[];
  };
}

// ─── Mappers (DB rows → frontend shape) ──────────────────────────

function mapPersonalInfo(row: DbPersonalInfo) {
  return {
    name: row.name,
    role: row.role,
    tagline: row.tagline,
    description: row.description,
    email: row.email,
    location: row.location,
    availability: row.availability,
    image: row.image_url || "/images/profile.jpg",
    resume: row.resume_url || "/resume.pdf",
  };
}

function mapEducation(rows: DbEducation[]) {
  return rows.map((row) => ({
    institution: row.institution,
    degree: row.degree,
    period: row.period,
    status: row.status,
    description: row.description,
    skills: row.skills || [],
  }));
}

function mapSkills(rows: DbSkillCategory[]) {
  const result: Record<string, { icon: string; description: string; items: string[] }> = {};
  for (const row of rows) {
    result[row.name] = {
      icon: row.icon,
      description: row.description,
      items: row.items || [],
    };
  }
  return result;
}

function mapProjects(rows: DbProject[]) {
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description || "",
    category: row.category,
    tags: row.tags || [],
    image: row.image_url || "/images/projects/placeholder.jpg",
    github: row.github_url,
    demo: row.demo_url,
    featured: row.featured,
  }));
}

function mapSocialLinks(row: DbSocialLinks) {
  return {
    linkedin: row.linkedin || "",
    github: row.github || "",
    email: row.email || "",
  };
}

function mapSiteMetadata(row: DbSiteMetadata) {
  return {
    title: row.title,
    description: row.description,
    url: row.url,
    image: row.image || "/images/og-image.jpg",
    keywords: row.keywords || [],
  };
}

// ─── Main query: fetch everything ────────────────────────────────

export async function fetchAllPortfolioData(): Promise<PortfolioPageData> {
  try {
    const supabase = createServerSupabase();

    const [
      { data: personalInfoRow },
      { data: educationRows },
      { data: skillRows },
      { data: projectRows },
      { data: socialLinksRow },
      { data: siteMetadataRow },
    ] = await Promise.all([
      supabase.from("personal_info").select("*").single(),
      supabase.from("education").select("*").order("sort_order"),
      supabase.from("skill_categories").select("*").order("sort_order"),
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("social_links").select("*").single(),
      supabase.from("site_metadata").select("*").single(),
    ]);

    return {
      personalInfo: personalInfoRow
        ? mapPersonalInfo(personalInfoRow)
        : fallbackPersonalInfo,
      education: educationRows?.length
        ? mapEducation(educationRows)
        : fallbackEducation,
      skills: skillRows?.length ? mapSkills(skillRows) : fallbackSkills,
      projects: projectRows?.length ? mapProjects(projectRows) : fallbackProjects,
      socialLinks: socialLinksRow
        ? mapSocialLinks(socialLinksRow)
        : fallbackSocialLinks,
      siteMetadata: siteMetadataRow
        ? mapSiteMetadata(siteMetadataRow)
        : fallbackSiteMetadata,
    };
  } catch (error) {
    console.error("Failed to fetch from Supabase, using fallback data:", error);
    return {
      personalInfo: fallbackPersonalInfo,
      education: fallbackEducation,
      skills: fallbackSkills,
      projects: fallbackProjects,
      socialLinks: fallbackSocialLinks,
      siteMetadata: fallbackSiteMetadata,
    };
  }
}
