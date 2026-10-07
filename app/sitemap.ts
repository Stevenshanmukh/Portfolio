import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/lib/sanity/portfolio";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getPortfolioData();
  const base = data.siteMetadata.url || "http://localhost:3000";

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.8 },
    ...data.projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: project.caseStudy ? 0.7 : 0.5,
    })),
  ];
}
