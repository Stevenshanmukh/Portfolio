import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { Project, RunStep } from "@/lib/types";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectVisual } from "./ProjectVisual";

/** A case study card: visual on top, then title, summary, tags and actions. */
export function FeaturedProjectCard({
  project,
  runTrace,
}: {
  project: Project;
  runTrace?: { title: string; steps: RunStep[] };
}) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-white/20">
      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
        <ProjectVisual
          project={project}
          runTrace={runTrace}
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3 className="text-lg font-semibold text-white">
          <Link href={href} className="hover:underline hover:decoration-white/40">
            {project.title}
          </Link>
        </h3>
        {project.context && <p className="mt-1 text-sm text-neutral-400">{project.context}</p>}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-300">{project.description}</p>
        {project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools used">
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag} className="rounded-md border border-white/10 px-2 py-1 text-xs text-neutral-300">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <Link
            href={href}
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-neutral-950 transition-opacity hover:opacity-90"
          >
            <FileText aria-hidden="true" className="size-4" />
            View details
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            <span className="sr-only"> about {project.title}</span>
          </Link>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
