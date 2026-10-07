import Image from "next/image";
import { Check } from "lucide-react";
import { MiniRunTrace } from "@/components/hero/MiniRunTrace";
import { IconTile } from "@/components/ui/IconTile";
import { iconFor } from "@/lib/icons";
import type { Project, RunStep } from "@/lib/types";

/**
 * The picture for a project, in order of preference: its screenshot; the run
 * trace when the hero's illustrative run depicts this project; its Acts on /
 * Guardrail / Result summary; or its icon.
 */
export function ProjectVisual({
  project,
  runTrace,
  sizes,
  priority = false,
  large = false,
}: {
  project: Project;
  runTrace?: { title: string; steps: RunStep[] };
  sizes: string;
  priority?: boolean;
  /** Project-page scale rather than card scale. */
  large?: boolean;
}) {
  if (project.artifact) {
    return (
      <Image
        src={project.artifact.url}
        alt={project.artifact.alt}
        width={project.artifact.width}
        height={project.artifact.height}
        sizes={sizes}
        priority={priority}
        className="size-full object-cover object-left-top"
      />
    );
  }

  if (runTrace && runTrace.title === project.title && runTrace.steps.length > 0) {
    return <MiniRunTrace title={runTrace.title} steps={runTrace.steps} size={large ? "lg" : "sm"} />;
  }

  const rows = [
    { label: "Acts on", value: project.summary.actsOn },
    { label: "Guardrail", value: project.summary.guardrail },
    { label: "Result", value: project.summary.result },
  ].filter((row) => row.value);

  if (rows.length > 0) {
    return (
      <dl className="flex h-full flex-col justify-center gap-3 bg-panel p-5 text-sm">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs text-neutral-400">{row.label}</dt>
            <dd className="mt-0.5 flex gap-2 text-neutral-100">
              {row.label === "Guardrail" && <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />}
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div className="flex h-full items-center justify-center bg-panel">
      <IconTile icon={iconFor(project.icon)} size="lg" />
    </div>
  );
}
