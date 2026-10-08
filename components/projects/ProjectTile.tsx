import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { iconFor } from "@/lib/icons";
import type { Project } from "@/lib/types";

/** A compact, fully clickable project row linking to its page. */
export function ProjectTile({ project, clamp = true }: { project: Project; clamp?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-panel/85 p-5 transition-colors hover:border-white/25 hover:bg-panel"
    >
      <IconTile icon={iconFor(project.icon)} />
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="font-semibold text-white">{project.title}</span>
          <ArrowRight
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
          />
        </span>
        <span className={`mt-1 text-sm leading-relaxed text-neutral-400 ${clamp ? "line-clamp-2" : "block"}`}>
          {project.description}
        </span>
        {project.tags.length > 0 && (
          <span className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-neutral-300">
                {tag}
              </span>
            ))}
          </span>
        )}
      </span>
    </Link>
  );
}
