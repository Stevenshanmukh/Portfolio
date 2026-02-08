"use client";

import React, { createContext, useContext } from "react";
import {
  personalInfo as defaultPersonalInfo,
  education as defaultEducation,
  skills as defaultSkills,
  projects as defaultProjects,
  socialLinks as defaultSocialLinks,
  siteMetadata as defaultSiteMetadata,
} from "@/data/portfolio";
import type { SkillCategory, Project } from "@/lib/types";

interface PortfolioContextValue {
  personalInfo: typeof defaultPersonalInfo;
  education: typeof defaultEducation;
  skills: Record<string, SkillCategory>;
  projects: Project[];
  socialLinks: typeof defaultSocialLinks;
  siteMetadata: typeof defaultSiteMetadata;
}

const defaults: PortfolioContextValue = {
  personalInfo: defaultPersonalInfo,
  education: defaultEducation,
  skills: defaultSkills,
  projects: defaultProjects,
  socialLinks: defaultSocialLinks,
  siteMetadata: defaultSiteMetadata,
};

const PortfolioContext = createContext<PortfolioContextValue>(defaults);

/**
 * Provides portfolio data to all sections.
 * Accepts `serverData` from the server component (fetched from Supabase).
 * Falls back to static data/portfolio.ts defaults.
 */
export function PortfolioProvider({
  children,
  serverData,
}: {
  children: React.ReactNode;
  serverData?: Partial<PortfolioContextValue>;
}) {
  const value: PortfolioContextValue = {
    personalInfo: serverData?.personalInfo ?? defaults.personalInfo,
    education: serverData?.education ?? defaults.education,
    skills: serverData?.skills ?? defaults.skills,
    projects: serverData?.projects ?? defaults.projects,
    socialLinks: serverData?.socialLinks ?? defaults.socialLinks,
    siteMetadata: serverData?.siteMetadata ?? defaults.siteMetadata,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
