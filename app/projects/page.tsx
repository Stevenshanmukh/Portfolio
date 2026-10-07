import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/metadata";
import { getPortfolioData } from "@/lib/sanity/portfolio";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return pageMetadata(data, {
    title: `Projects | ${data.personalInfo.name}`,
    description: `Every project by ${data.personalInfo.name}: AI agents and automation, full-stack apps, machine learning and analytics.`,
    path: "/projects",
  });
}

export default async function ProjectsPage() {
  const data = await getPortfolioData();

  // Group by each project's first category, in Studio order.
  const groups = [...data.projectCategories, "Other"]
    .map((category) => ({
      category,
      items: data.projects.filter((p) => (p.categories[0] ?? "Other") === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <SiteShell>
      <section aria-labelledby="projects-page-title" className="px-6 pb-20 pt-28 md:pt-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#projects"
            className="mb-8 inline-flex min-h-9 items-center gap-1.5 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>
          <SectionHeading
            as="h1"
            id="projects-page-title"
            title="All projects"
            intro="Client work and open-source projects, grouped by what they do. Open one for the full write-up and links."
          />

          <div className="mt-12 space-y-14">
            {groups.map((group) => (
              <div key={group.category}>
                <h2 className="text-sm font-medium text-neutral-400">{group.category}</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((project) => (
                    <li key={project.id}>
                      <ProjectTile project={project} clamp={false} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
