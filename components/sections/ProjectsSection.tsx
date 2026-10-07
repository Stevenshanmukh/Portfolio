"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/lib/portfolio-context";
import type { Project } from "@/lib/types";

function ExternalLink({
  href,
  children,
  variant = "quiet",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "quiet" | "outline";
}) {
  const styles =
    variant === "outline"
      ? "min-h-11 rounded-lg border border-white/20 px-4 text-neutral-100 hover:border-white/40 hover:bg-white/5"
      : "min-h-9 rounded-md px-2 text-neutral-300 hover:bg-white/5 hover:text-white";
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${styles}`}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </Link>
  );
}

function ProjectLinks({ project, variant }: { project: Project; variant?: "quiet" | "outline" }) {
  return (
    <>
      {project.github && (
        <ExternalLink href={project.github} variant={variant}>
          <Github aria-hidden="true" className="size-4" />
          Source
        </ExternalLink>
      )}
      {project.demo && (
        <ExternalLink href={project.demo} variant={variant}>
          <ArrowUpRight aria-hidden="true" className="size-4" />
          Live demo
        </ExternalLink>
      )}
    </>
  );
}

/** The visual column when a case study has no screenshot: its points as a list. */
function PointsPanel({ points }: { points: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025]">
      <p className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 text-xs text-neutral-400">
        <span>In the repo</span>
        <span className="font-mono tabular-nums">{points.length}</span>
      </p>
      <ul className="divide-y divide-white/[0.06] px-5">
        {points.map((point) => (
          <li key={point} className="py-3 text-neutral-200">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseStudy({ project, flip }: { project: Project; flip: boolean }) {
  const titleId = useId();
  const { artifact, caseStudyPoints: points } = project;

  return (
    <article
      aria-labelledby={titleId}
      className="grid items-start gap-10 border-t border-white/10 pt-12 lg:grid-cols-2 lg:gap-16"
    >
      <div className={flip ? "lg:order-2" : ""}>
        <h3 id={titleId} className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          {project.title}
        </h3>
        {project.categories.length > 0 && (
          <p className="mt-2 text-sm text-neutral-400">{project.categories.join(" · ")}</p>
        )}
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-neutral-200">{project.description}</p>
        {project.longDescription && (
          <p className="mt-4 max-w-[60ch] leading-relaxed text-neutral-300">{project.longDescription}</p>
        )}
        {artifact && points.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-neutral-300">
                <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-neutral-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
        {project.tags.length > 0 && (
          <p className="mt-6 text-sm text-neutral-400">{project.tags.join(" · ")}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <ProjectLinks project={project} variant="outline" />
        </div>
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        {artifact ? (
          <figure>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white">
              <Image
                src={artifact.url}
                alt={artifact.alt}
                width={artifact.width}
                height={artifact.height}
                sizes="(min-width: 1152px) 544px, (min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            {artifact.caption && (
              <figcaption className="mt-3 text-sm text-neutral-400">{artifact.caption}</figcaption>
            )}
          </figure>
        ) : (
          points.length > 0 && <PointsPanel points={points} />
        )}
      </div>
    </article>
  );
}

function IndexRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const hasDetails = Boolean(project.longDescription && project.longDescription !== project.description);

  return (
    <li className="grid gap-3 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
      <div className="min-w-0">
        <h5 className="font-medium text-white">{project.title}</h5>
        <p className="mt-1 max-w-[62ch] leading-relaxed text-neutral-300">{project.description}</p>
        {project.tags.length > 0 && (
          <p className="mt-2 text-sm text-neutral-400">{project.tags.slice(0, 5).join(" · ")}</p>
        )}
        <AnimatePresence initial={false}>
          {open && hasDetails && (
            <motion.div
              id={detailsId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-[62ch] pt-3 leading-relaxed text-neutral-300">{project.longDescription}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="-ml-2 flex flex-wrap items-start gap-1 md:ml-0 md:justify-end">
        {hasDetails && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={open ? detailsId : undefined}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            {open ? "Less" : "Details"}
            <ChevronDown
              aria-hidden="true"
              className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
            <span className="sr-only"> about {project.title}</span>
          </button>
        )}
        <ProjectLinks project={project} />
      </div>
    </li>
  );
}

export function ProjectsSection() {
  const { projects, projectCategories } = usePortfolio();
  const caseStudies = projects.filter((p) => p.caseStudy);
  const rest = projects.filter((p) => !p.caseStudy);

  // Group the index by each project's first category, in Studio order.
  const order = [...projectCategories, "Other"];
  const groups = order
    .map((category) => ({
      category,
      items: rest.filter((p) => (p.categories[0] ?? "Other") === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-6 py-20 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2
          id="projects-title"
          className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl"
        >
          Selected work
        </h2>
        <p className="mt-4 max-w-[60ch] text-neutral-300">
          Case studies first, then the rest of my open-source work on GitHub.
        </p>

        {caseStudies.length > 0 && (
          <div className="mt-14 space-y-20">
            {caseStudies.map((project, i) => (
              <CaseStudy key={project.id} project={project} flip={i % 2 === 1} />
            ))}
          </div>
        )}

        {groups.length > 0 && (
          <div className="mt-24">
            <h3 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-white">
              {caseStudies.length > 0 ? "More projects" : "Projects"}
            </h3>
            <div className="mt-8 grid gap-12">
              {groups.map((group) => (
                <div key={group.category}>
                  <h4 className="text-sm font-medium text-neutral-400">{group.category}</h4>
                  <ul className="mt-2 divide-y divide-white/10 border-y border-white/10">
                    {group.items.map((project) => (
                      <IndexRow key={project.id} project={project} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
