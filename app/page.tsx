import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { pageMetadata } from "@/lib/metadata";
import { getPortfolioData } from "@/lib/sanity/portfolio";
import {
  getBreadcrumbJsonLd,
  getPersonJsonLd,
  getProjectsJsonLd,
  getWebSiteJsonLd,
} from "@/lib/structured-data";

// ISR: content published in Sanity Studio shows up within ~60 seconds.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getPortfolioData(), { path: "/" });
}

export default async function Home() {
  const data = await getPortfolioData();
  const jsonLd = [
    getPersonJsonLd(data),
    getWebSiteJsonLd(data),
    getProjectsJsonLd(data),
    getBreadcrumbJsonLd(data),
  ];

  return (
    <SiteShell>
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </SiteShell>
  );
}
