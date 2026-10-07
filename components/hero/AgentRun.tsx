"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Bot, Check, RotateCcw } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { RunStep } from "@/lib/types";
import { HOLD_MS, RUN_ICONS, STEP_MS, schedule } from "./runSteps";
import { SourceNetwork } from "./SourceNetwork";

/**
 * The hero's illustrative agent run: each step lands in turn, the approve step
 * waits for sign-off, then the write goes through. Below it, the systems the
 * agent reads from and writes to, with pulses timed to the same steps.
 *
 * Step timing is CSS (globals.css, "Run trace") whose resting styles are the
 * final state, so it reads correctly with reduced motion or without JS.
 */
export function AgentRun({ title, steps }: { title: string; steps: RunStep[] }) {
  const [run, setRun] = useState(0);
  const [live, setLive] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Start when visible: right away on desktop, on scroll on phones. Below the
  // fold the CSS timeline is held paused until then, so steps and pulses stay in sync.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top >= window.innerHeight * 0.9) el.setAttribute("data-waiting", "");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.removeAttribute("data-waiting");
          setLive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const timed = schedule(steps);
  const first = timed[0]?.start ?? 0;
  const end = (timed[timed.length - 1]?.start ?? 0) + STEP_MS;
  const readAt = timed.find((t) => t.step.kind === "read")?.start;
  const writeAt = timed.find((t) => t.step.kind === "write")?.start;

  return (
    <div ref={ref} className="agent-run">
      <figure className="rounded-2xl border border-white/15 bg-panel/95 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
        <figcaption className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <span className="flex items-center gap-2 text-sm font-medium text-white">
            <Bot aria-hidden="true" className="size-4 text-neutral-300" />
            {title || "Agent run"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-xs text-neutral-300">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-white" />
            Illustrative run
          </span>
        </figcaption>

        <div key={run} className="relative px-5 py-4">
          {/* Rail with a fill that tracks progress through the steps. */}
          <span aria-hidden="true" className="absolute bottom-7 left-[1.6rem] top-7 w-px bg-white/10">
            <span
              className="run-rail-fill absolute inset-0 bg-white/60"
              style={{ "--from": `${first}ms`, "--span": `${end - first}ms` } as CSSProperties}
            />
          </span>

          <ol className="space-y-2">
            {timed.map(({ step, start }, i) => {
              const Icon = RUN_ICONS[step.kind];
              const isApprove = step.kind === "approve";
              return (
                <li
                  key={i}
                  className="run-step relative grid grid-cols-[2.25rem_minmax(0,1fr)_1.75rem] items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] py-2 pl-7 pr-2.5"
                  style={{ "--at": `${start}ms`, "--hold": `${HOLD_MS}ms` } as CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[0.15rem] top-1/2 size-2 -translate-y-1/2 rounded-full bg-neutral-300 ring-4 ring-panel"
                  />
                  <span
                    aria-hidden="true"
                    className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neutral-200"
                  >
                    <Icon className="size-4" strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-mono text-xs ${isApprove ? "run-approve-label text-white" : "text-neutral-400"}`}
                    >
                      {step.kind}
                    </span>
                    {isApprove ? (
                      <span className="grid text-sm">
                        <span aria-hidden="true" className="run-awaiting col-start-1 row-start-1 text-neutral-300">
                          Waiting for sign-off
                          <span className="run-caret ml-1 inline-block h-[1em] w-[0.45em] translate-y-[0.15em] bg-neutral-300" />
                        </span>
                        <span className="run-approved col-start-1 row-start-1 font-medium text-white">{step.text}</span>
                      </span>
                    ) : (
                      <span className="block text-sm text-neutral-100">{step.text}</span>
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex size-7 items-center justify-center rounded-full border ${
                      isApprove
                        ? "run-badge-approve border-white bg-white text-neutral-950"
                        : "run-done border-white/15 text-neutral-200"
                    }`}
                  >
                    <Check className="size-3.5" strokeWidth={2.4} />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex justify-end border-t border-white/10 px-3 py-2">
          <button
            type="button"
            onClick={() => setRun((n) => n + 1)}
            aria-label="Replay the agent run"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-xs text-neutral-300 transition-colors hover:text-white"
          >
            <RotateCcw aria-hidden="true" className="size-3.5" />
            Replay run
          </button>
        </div>
      </figure>

      <div className="px-2 pt-1">
        {/* Remounting restarts the SVG's own animation clock in step with the CSS one. */}
        <SourceNetwork key={`${run}-${live}`} animate={live && !reduce} readAt={readAt} writeAt={writeAt} />
      </div>
    </div>
  );
}
