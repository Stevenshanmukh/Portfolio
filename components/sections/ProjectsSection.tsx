"use client";

import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePortfolio } from "@/lib/portfolio-context";

const OTHER_LIMIT = 6;

/** Case studies as cards, then a short grid of other projects; all live on /projects. */
export function ProjectsSection() {
  const { projects, personalInfo } = usePortfolio();
  const featured = projects.filter((p) => p.caseStudy);
  const others = projects.filter((p) => !p.caseStudy);
  const runTrace = { title: personalInfo.runTraceTitle, steps: personalInfo.runTrace };
  const viewAll = { href: "/projects", label: "View all projects" };

  return (
    <>
      {featured.length > 0 && (
        <section id="projects" aria-labelledby="projects-title" className="px-6 py-20 md:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              id="projects-title"
              title="Featured projects"
              intro="A closer look at client work and open-source projects."
              action={viewAll}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <FeaturedProjectCard key={project.id} project={project} runTrace={runTrace} />
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section
          id={featured.length > 0 ? "more-projects" : "projects"}
          aria-labelledby="more-projects-title"
          className="px-6 py-20 md:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              id="more-projects-title"
              title="Other projects"
              intro="Smaller builds, experiments and open-source tools."
              action={others.length > OTHER_LIMIT ? viewAll : undefined}
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.slice(0, OTHER_LIMIT).map((project) => (
                <li key={project.id}>
                  <ProjectTile project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
