"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { AgentRun } from "@/components/hero/AgentRun";
import { Avatar } from "@/components/hero/Avatar";
import { usePortfolio } from "@/lib/portfolio-context";

/** Splits "First sentence. The rest." so the second, distinctive part can lead visually. */
function splitHeadline(headline: string): [string, string] {
  const match = headline.match(/^(.+?[.!?])\s+(.+)$/);
  return match ? [match[1], match[2]] : [headline, ""];
}

export function HeroSection() {
  const { personalInfo } = usePortfolio();
  const [lead, rest] = splitHeadline(personalInfo.headline || personalInfo.role);
  const ref = useRef<HTMLElement>(null);

  // Pause the hero's looping motion (portrait orbit) while it's off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.removeAttribute("data-offscreen");
      else el.setAttribute("data-offscreen", "");
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-32 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <div className="mb-14 mt-6 flex justify-center lg:hidden">
              <Avatar src={personalInfo.image} name={personalInfo.name} status={personalInfo.availability} size="md" />
            </div>

            <h1
              id="hero-title"
              className="max-w-[22ch] text-balance text-[clamp(2.25rem,4.3vw,3.55rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
            >
              {rest ? (
                <>
                  {lead} <span className="text-neutral-400">{rest}</span>
                </>
              ) : (
                lead
              )}
            </h1>

            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-neutral-300">
              {personalInfo.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {personalInfo.resume && (
                <Link
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-white px-5 text-sm font-semibold text-neutral-950 transition-opacity hover:opacity-90"
                >
                  <FileText aria-hidden="true" className="size-4" />
                  Resume
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </Link>
              )}
              <Link
                href="#contact"
                className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                <Mail aria-hidden="true" className="size-4" />
                Get in touch
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {/* Portrait first, the run trace underneath: nothing covers the face. */}
            <div className="mb-14 mt-16 hidden lg:block">
              <Avatar src={personalInfo.image} name={personalInfo.name} status={personalInfo.availability} />
            </div>
            {personalInfo.runTrace.length > 0 && (
              <div className="w-full max-w-[32rem]">
                <AgentRun title={personalInfo.runTraceTitle} steps={personalInfo.runTrace} />
              </div>
            )}
          </div>
        </div>

        {personalInfo.proofPoints.length > 0 && (
          <ul className="mt-16 grid grid-cols-3 border-t border-white/10 pt-8">
            {personalInfo.proofPoints.map((point, i) => (
              <li
                key={point.label}
                className={`min-w-0 px-3 sm:px-6 ${i === 0 ? "pl-0 sm:pl-0" : "border-l border-white/10"}`}
              >
                <span className="block text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-none tracking-[-0.02em] tabular-nums text-white">
                  {point.value}
                </span>
                <span className="mt-2.5 block text-sm leading-snug text-neutral-400">{point.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
