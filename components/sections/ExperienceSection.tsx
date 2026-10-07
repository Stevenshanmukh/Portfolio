"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePortfolio } from "@/lib/portfolio-context";
import type { Experience } from "@/lib/types";
import { Credentials } from "./Credentials";

/** What a role card lists: shipped systems with their results, else highlights. */
function bulletsFor(job: Experience) {
  if (job.systems.length > 0) {
    return job.systems.map((s) => (s.result ? `${s.name}: ${s.result}` : s.name));
  }
  return job.highlights;
}

function TimelineItem({ job }: { job: Experience }) {
  const ref = useRef<HTMLLIElement>(null);

  // Light the dot once the card reaches the middle of the screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-reached", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -45% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bullets = bulletsFor(job);

  return (
    <li
      ref={ref}
      className="timeline-item grid gap-3 md:grid-cols-[7rem_1.25rem_minmax(0,1fr)] md:gap-x-5"
    >
      <p className="font-mono text-[13px] leading-relaxed tabular-nums text-neutral-400 md:pt-6 md:text-right">
        {/* "May 2026 – Present" reads as two lines: start, then end. */}
        {job.period.split(/\s+[–-]\s+/).map((part, i, parts) => (
          <span key={i} className="md:block">
            {part}
            {i < parts.length - 1 && " – "}
          </span>
        ))}
      </p>
      <span aria-hidden="true" className="relative hidden justify-center md:flex">
        <span className="timeline-dot mt-7 size-3 rounded-full border border-white/40 bg-ink" />
      </span>
      <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white">{job.role}</h3>
            <p className="mt-0.5 text-neutral-200">
              {job.companyUrl ? (
                <Link
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline decoration-white/25 hover:decoration-white"
                >
                  {job.company}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              ) : (
                job.company
              )}
              {job.location && <span className="text-neutral-400"> · {job.location}</span>}
            </p>
          </div>
          {job.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 sm:max-w-[45%] sm:justify-end" aria-label="Tools used">
              {job.skills.slice(0, 4).map((skill) => (
                <li key={skill} className="rounded-md border border-white/10 px-2 py-1 text-xs text-neutral-300">
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
        {bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {bullets.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-neutral-300">
                <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}

export function ExperienceSection() {
  const { experience } = usePortfolio();
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });

  if (experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-title" className="px-6 py-20 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="experience-title"
          title="Experience"
          intro="I build AI agents and reporting automation for a marketing agency. Before that: internships in AI engineering and derivatives analytics."
        />

        <ol ref={listRef} className="relative mt-12 space-y-5">
          {/* The rail behind the dots draws itself as you scroll through the roles. */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[calc(7rem+1.25rem+0.625rem)] top-8 hidden w-px bg-white/10 md:block"
          >
            <motion.span
              className="absolute inset-0 origin-top bg-white/55"
              style={{ scaleY: reduce ? 1 : scrollYProgress }}
            />
          </span>
          {experience.map((job) => (
            <TimelineItem key={job.id} job={job} />
          ))}
        </ol>

        <Credentials />
      </div>
    </section>
  );
}
