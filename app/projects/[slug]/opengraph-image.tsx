import { notFound } from "next/navigation";
import { OG_SIZE, projectCard } from "@/lib/og";
import { getPortfolioData } from "@/lib/sanity/portfolio";

// Link-preview card for one project page.
export const alt = "Project preview card";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPortfolioData();
  const project = data.projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return projectCard(data, project);
}
