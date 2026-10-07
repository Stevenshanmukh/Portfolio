import { cache } from "react";
import type { PortfolioPageData } from "@/lib/types";
import { client, imageUrl } from "./client";
import { PORTFOLIO_QUERY } from "./queries";
import type { PORTFOLIO_QUERY_RESULT } from "./sanity.types";

/**
 * Fetches all published portfolio content from Sanity.
 *
 * Throws when Sanity is unreachable or the Profile / Site settings documents
 * aren't published: a failed build is better than a blank site, and during ISR
 * Next.js keeps serving the last good page. Wrapped in `cache` so the page and
 * its metadata share one request.
 */
export const getPortfolioData = cache(async (): Promise<PortfolioPageData> => {
  const data = await client.fetch<PORTFOLIO_QUERY_RESULT>(PORTFOLIO_QUERY);
  const { profile, settings } = data;

  if (!profile || !settings) {
    throw new Error(
      "Sanity: publish the 'Profile' and 'Site settings' documents in Studio."
    );
  }

  // Validation isn't enforced on documents written by scripts, so every
  // field still gets a default.
  const projects = data.projects.map((p) => ({
    id: p._id,
    title: p.title ?? "",
    description: p.description ?? "",
    longDescription: p.longDescription ?? undefined,
    categories: (p.categories ?? []).filter(Boolean),
    tags: p.tags ?? [],
    image: imageUrl(p.image, 128, 128),
    github: p.githubUrl ?? null,
    demo: p.demoUrl ?? null,
    featured: p.featured ?? false,
  }));

  const usedCategories = new Set(projects.flatMap((p) => p.categories));

  return {
    personalInfo: {
      name: profile.name ?? "",
      role: profile.role ?? "",
      tagline: profile.tagline ?? "",
      description: profile.heroDescription ?? "",
      aboutDescription: profile.aboutDescription ?? "",
      email: profile.email ?? "",
      location: profile.location ?? "",
      availability: profile.availability ?? "",
      image: imageUrl(profile.photo, 640, 640),
      resume: profile.resumeUrl ?? "",
    },
    socialLinks: {
      linkedin: profile.linkedinUrl ?? "",
      github: profile.githubUrl ?? "",
    },
    experience: data.experience.map((x) => ({
      id: x._id,
      role: x.role ?? "",
      company: x.company ?? "",
      companyUrl: x.companyUrl ?? "",
      period: x.period ?? "",
      location: x.location ?? "",
      summary: x.summary ?? "",
      highlights: x.highlights ?? [],
      skills: x.skills ?? [],
    })),
    certifications: profile.certifications ?? [],
    education: data.education.map((e) => ({
      id: e._id,
      institution: e.institution ?? "",
      degree: e.degree ?? "",
      period: e.period ?? "",
      status: e.status ?? "",
      description: e.description ?? "",
      skills: e.skills ?? [],
    })),
    skills: data.skills.map((s) => ({
      id: s._id,
      name: s.name ?? "",
      icon: s.icon ?? "",
      description: s.description ?? "",
      items: s.items ?? [],
    })),
    projects,
    projectCategories: data.categories
      .map((c) => c.title)
      .filter((title) => title && usedCategories.has(title)),
    siteMetadata: {
      title: settings.title ?? "",
      description: settings.description ?? "",
      url: (settings.url ?? "").replace(/\/+$/, ""),
      image: imageUrl(settings.ogImage, 1200, 630),
      keywords: settings.keywords ?? [],
    },
  };
});
