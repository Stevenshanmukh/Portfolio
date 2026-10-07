import { Check } from "lucide-react";
import type { RunStep } from "@/lib/types";
import { RUN_ICONS } from "./runSteps";

const SIZES = {
  // Card thumbnail.
  sm: { pad: "p-3.5", text: "text-xs", gap: "space-y-1.5", icon: "size-3", badge: "size-4", check: "size-2.5", kind: "w-12" },
  // Project page.
  lg: { pad: "p-6 sm:p-8", text: "text-sm", gap: "space-y-3", icon: "size-4", badge: "size-6", check: "size-3.5", kind: "w-16" },
} as const;

/** A still copy of the run trace in its finished state, used as a project visual. */
export function MiniRunTrace({
  title,
  steps,
  size = "sm",
}: {
  title: string;
  steps: RunStep[];
  size?: keyof typeof SIZES;
}) {
  const s = SIZES[size];
  return (
    <div aria-hidden="true" className={`flex h-full flex-col bg-panel ${s.pad}`}>
      <p className={`mb-3 flex items-center justify-between ${s.text}`}>
        <span className="font-medium text-white">{title}</span>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-neutral-300">
          Illustrative run
        </span>
      </p>
      <ol className={`relative flex-1 border-l border-white/15 pl-3 ${s.gap}`}>
        {steps.map((step, i) => {
          const Icon = RUN_ICONS[step.kind];
          const isApprove = step.kind === "approve";
          return (
            <li key={i} className={`relative flex items-center gap-2 leading-tight ${s.text}`}>
              <span className="absolute -left-[0.95rem] size-1.5 rounded-full bg-neutral-300" />
              <Icon className={`${s.icon} shrink-0 text-neutral-400`} />
              <span className={`${s.kind} shrink-0 font-mono text-neutral-400`}>{step.kind}</span>
              <span className={`min-w-0 flex-1 truncate ${isApprove ? "font-medium text-white" : "text-neutral-200"}`}>
                {step.text}
              </span>
              <span
                className={`flex ${s.badge} shrink-0 items-center justify-center rounded-full border ${
                  isApprove ? "border-white bg-white text-neutral-950" : "border-white/20 text-neutral-200"
                }`}
              >
                <Check className={s.check} strokeWidth={3} />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
