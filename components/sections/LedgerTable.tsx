"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Check } from "lucide-react";
import type { ExperienceSystem } from "@/lib/types";

const COLUMNS = ["System", "Acts on", "Guardrail", "Result"] as const;

/**
 * The systems shipped in one role, as a table on wide screens and stacked rows
 * on phones. Guardrail checks land row by row once it scrolls into view
 * (CSS in globals.css, "Experience ledger").
 */
export function LedgerTable({ systems, caption }: { systems: ExperienceSystem[]; caption: string }) {
  const ref = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    el.setAttribute("data-armed", "");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-played", "");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <table ref={ref} className="ledger block w-full text-left md:table">
      <caption className="sr-only">{caption}</caption>
      <thead className="hidden md:table-header-group">
        <tr className="border-b border-white/10">
          {COLUMNS.map((col) => (
            <th key={col} scope="col" className="py-3 pr-6 text-sm font-medium text-neutral-400 last:pr-0">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {systems.map((system, i) => (
          <tr
            key={system.name}
            style={{ "--row": i } as CSSProperties}
            className="grid gap-1.5 border-b border-white/10 py-5 md:table-row md:py-0"
          >
            <th scope="row" className="font-medium text-white md:py-4 md:pr-6 md:align-top">
              {system.name}
            </th>
            <td className="text-neutral-300 md:py-4 md:pr-6 md:align-top">
              <span className="text-sm text-neutral-400 md:hidden">Acts on: </span>
              {system.actsOn}
            </td>
            <td className="text-neutral-300 md:py-4 md:pr-6 md:align-top">
              {system.guardrail ? (
                <span className="flex gap-2">
                  <Check aria-hidden="true" className="ledger-check mt-1 size-3.5 shrink-0 text-approved" />
                  <span>{system.guardrail}</span>
                </span>
              ) : (
                <span className="text-neutral-400">
                  <span aria-hidden="true">–</span>
                  <span className="sr-only">None listed</span>
                </span>
              )}
            </td>
            <td className="font-mono text-[13px] leading-relaxed text-neutral-200 md:py-4 md:align-top">
              {system.result}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
