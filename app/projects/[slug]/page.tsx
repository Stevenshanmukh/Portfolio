import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { IconTile } from "@/components/ui/IconTile";
import { iconFor } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { getPortfolioData } from "@/lib/sanity/portfolio";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioData();
  const project = data.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata(data, {
    title: `${project.title} | ${data.personalInfo.name}`,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.artifact?.url,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPortfolioData();
  const index = data.projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = data.projects[index];
  const next = data.projects[(index + 1) % data.projects.length];
  const runTrace = { title: data.personalInfo.runTraceTitle, steps: data.personalInfo.runTrace };
  const summary = [
    { label: "Acts on", value: project.summary.actsOn },
    { label: "Guardrail", value: project.summary.guardrail },
    { label: "Result", value: project.summary.result },
  ].filter((row) => row.value);
  const hasVisual =
    Boolean(project.artifact) || (runTrace.title === project.title && runTrace.steps.length > 0);

  return (
    <SiteShell>
      <article aria-labelledby="project-title" className="px-6 pb-20 pt-28 md:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="mb-8 inline-flex min-h-9 items-center gap-1.5 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All projects
          </Link>

          <header className="flex items-start gap-5">
            <IconTile icon={iconFor(project.icon)} size="lg" />
            <div className="min-w-0">
              <h1
                id="project-title"
                className="font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
              >
                {project.title}
              </h1>
              {project.categories.length > 0 && (
                <p className="mt-2 text-sm text-neutral-400">{project.categories.join(" · ")}</p>
              )}
              {project.context && <p className="mt-1 text-sm text-neutral-400">{project.context}</p>}
            </div>
          </header>

          <p className="mt-8 max-w-[62ch] text-xl leading-relaxed text-neutral-100">{project.description}</p>

          {hasVisual && (
            <figure className="mt-10">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <ProjectVisual
                  project={project}
                  runTrace={runTrace}
                  sizes="(min-width: 896px) 896px, 100vw"
                  priority
                  large
                />
              </div>
              {project.artifact?.caption && (
                <figcaption className="mt-3 text-sm text-neutral-400">{project.artifact.caption}</figcaption>
              )}
            </figure>
          )}

          {summary.length > 0 && (
            <dl className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-panel/85">
              {summary.map((row) => (
                <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-sm text-neutral-400">{row.label}</dt>
                  <dd className="text-neutral-100">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.longDescription && project.longDescription !== project.description && (
            <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-neutral-300">{project.longDescription}</p>
          )}

          {project.caseStudyPoints.length > 0 && (
            <ul className="mt-8 max-w-[62ch] space-y-2.5">
              {project.caseStudyPoints.map((point) => (
                <li key={point} className="flex gap-3 leading-relaxed text-neutral-300">
                  <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-neutral-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {project.tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tools used">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-md border border-white/10 px-2.5 py-1 text-sm text-neutral-300">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {(project.github || project.demo) && (
            <div className="mt-10 flex flex-wrap gap-3">
              <ProjectLinks project={project} variant="outline" />
            </div>
          )}

          {next && next.id !== project.id && (
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-16 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-panel/85 p-5 transition-colors hover:border-white/25"
            >
              <span>
                <span className="block text-sm text-neutral-400">Next project</span>
                <span className="mt-0.5 block font-semibold text-white">{next.title}</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-5 text-neutral-300 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </article>
    </SiteShell>
  );
}
