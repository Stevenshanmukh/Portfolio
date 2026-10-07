import { Database, FileText, PenLine, Search, UserCheck, type LucideIcon } from "lucide-react";
import type { RunStep, RunStepKind } from "@/lib/types";

// Must match RUN_KINDS in studio/schemaTypes/profile.ts.
export const RUN_ICONS: Record<RunStepKind, LucideIcon> = {
  read: Database,
  check: Search,
  plan: FileText,
  approve: UserCheck,
  write: PenLine,
};

export const START_MS = 450;
export const STEP_MS = 520;
/** How long the approve step waits for sign-off. */
export const HOLD_MS = 1300;

/** Start time of each step; the approve step adds its sign-off hold. */
export function schedule(steps: RunStep[]) {
  return steps.reduce<{ step: RunStep; start: number }[]>((acc, step) => {
    const prev = acc[acc.length - 1];
    const start = prev ? prev.start + STEP_MS + (prev.step.kind === "approve" ? HOLD_MS : 0) : START_MS;
    return [...acc, { step, start }];
  }, []);
}
