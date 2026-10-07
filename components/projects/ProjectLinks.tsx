import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/types";

const STYLES = {
  outline:
    "min-h-11 rounded-xl border border-white/20 px-4 text-white hover:border-white/40 hover:bg-white/5",
  quiet: "min-h-11 rounded-lg px-3 text-neutral-200 hover:bg-white/5 hover:text-white",
} as const;

/** "Source" and "Live demo" links, when a project has them. */
export function ProjectLinks({ project, variant = "quiet" }: { project: Project; variant?: keyof typeof STYLES }) {
  return (
    <>
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${STYLES[variant]}`}
        >
          <Github aria-hidden="true" className="size-4" />
          Source
          <span className="sr-only"> code for {project.title} (opens in a new tab)</span>
        </Link>
      )}
      {project.demo && (
        <Link
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${STYLES[variant]}`}
        >
          <ArrowUpRight aria-hidden="true" className="size-4" />
          Live demo
          <span className="sr-only"> of {project.title} (opens in a new tab)</span>
        </Link>
      )}
    </>
  );
}
