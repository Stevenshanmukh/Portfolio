"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, RotateCcw } from "lucide-react";
import type { RunStep } from "@/lib/types";

// Must match RUN_KINDS in studio/schemaTypes/profile.ts.
export const RUN_KINDS = ["read", "check", "plan", "approve", "write"] as const;

const START_MS = 450;
const STEP_MS = 520;
/** How long the approve step waits for sign-off before turning green. */
const HOLD_MS = 1300;

/** Start time of each step; the approve step adds its sign-off hold. */
function schedule(steps: RunStep[]) {
  return steps.reduce<{ step: RunStep; start: number }[]>((acc, step) => {
    const prev = acc[acc.length - 1];
    const start = prev ? prev.start + STEP_MS + (prev.step.kind === "approve" ? HOLD_MS : 0) : START_MS;
    return [...acc, { step, start }];
  }, []);
}

/**
 * An illustrative agent run that plays once: each step lands in turn, the
 * approve step waits for sign-off, then the write goes through. Timing lives in
 * CSS (globals.css, "Run trace"), so the final state is what shows with
 * reduced motion or without JavaScript.
 */
export function RunTrace({ title, steps }: { title: string; steps: RunStep[] }) {
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // Below the fold (phones), hold the sequence until the panel is visible.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;
    el.setAttribute("data-waiting", "");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.removeAttribute("data-waiting");
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const timed = schedule(steps);

  return (
    <figure
      ref={ref}
      className="run-trace rounded-2xl border border-white/10 bg-white/[0.025]"
    >
      <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
        <span className="font-mono text-xs text-neutral-200">{title || "Agent run"}</span>
        <span className="text-xs text-neutral-400">Illustrative run</span>
      </figcaption>

      <ol key={run} className="space-y-3.5 px-5 py-5 font-mono text-[13px] leading-snug">
        {timed.map(({ step, start }, i) => {
          const isApprove = step.kind === "approve";
          return (
            <li
              key={i}
              className="run-step grid grid-cols-[4.25rem_minmax(0,1fr)_1rem] items-baseline gap-3"
              style={{ "--at": `${start}ms`, "--hold": `${HOLD_MS}ms` } as CSSProperties}
            >
              <span className={isApprove ? "run-approve-label text-approved" : "text-neutral-400"}>
                {step.kind}
              </span>
              {isApprove ? (
                <span className="grid">
                  <span
                    aria-hidden="true"
                    className="run-awaiting col-start-1 row-start-1 text-neutral-300"
                  >
                    Waiting for sign-off
                    <span className="run-caret ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-neutral-300" />
                  </span>
                  <span className="run-approved col-start-1 row-start-1 text-approved">{step.text}</span>
                </span>
              ) : (
                <span className="text-neutral-200">{step.text}</span>
              )}
              <Check
                aria-hidden="true"
                className={`run-done size-3.5 self-center ${
                  isApprove ? "run-done-approve text-approved" : "text-neutral-400"
                }`}
              />
            </li>
          );
        })}
      </ol>

      <div className="flex justify-end px-3 pb-3">
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-xs text-neutral-400 transition-colors hover:text-white"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Replay
        </button>
      </div>
    </figure>
  );
}
