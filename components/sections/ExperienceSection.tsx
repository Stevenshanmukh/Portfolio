"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/lib/portfolio-context";
import type { Experience } from "@/lib/types";
import { LedgerTable } from "./LedgerTable";

function CompanyName({ job }: { job: Experience }) {
  if (!job.companyUrl) return <span>{job.company}</span>;
  return (
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
  );
}

function Meta({ job }: { job: Experience }) {
  return (
    <p className="font-mono text-[13px] tabular-nums text-neutral-400">
      {[job.period, job.location].filter(Boolean).join(" · ")}
    </p>
  );
}

/** A role with shipped systems: header, then the ledger. */
function LedgerRole({ job }: { job: Experience }) {
  return (
    <article aria-labelledby={`${job.id}-title`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div>
          <h3 id={`${job.id}-title`} className="text-xl font-semibold text-white">
            {job.role}
          </h3>
          <p className="mt-1 text-neutral-200">
            <CompanyName job={job} />
          </p>
        </div>
        <Meta job={job} />
      </div>
      {job.summary && <p className="mt-3 max-w-[70ch] text-neutral-400">{job.summary}</p>}
      <div className="mt-8">
        <LedgerTable systems={job.systems} caption={`Systems built as ${job.role} at ${job.company}`} />
      </div>
      {job.skills.length > 0 && (
        <p className="mt-5 text-sm text-neutral-400">
          <span className="text-neutral-300">Stack:</span> {job.skills.join(" · ")}
        </p>
      )}
    </article>
  );
}

/** A role without a ledger: one compact row. */
function CompactRole({ job }: { job: Experience }) {
  return (
    <li className="grid gap-2 border-t border-white/10 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
      <div className="min-w-0">
        <h4 className="font-semibold text-white">
          {job.role}
          <span className="font-normal text-neutral-300">
            {" "}
            at <CompanyName job={job} />
          </span>
        </h4>
        {job.highlights.length > 0 && (
          <ul className="mt-2 max-w-[70ch] space-y-1.5 text-neutral-300">
            {job.highlights.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="md:text-right">
        <Meta job={job} />
      </div>
    </li>
  );
}

export function ExperienceSection() {
  const { experience } = usePortfolio();
  if (experience.length === 0) return null;

  const ledgerRoles = experience.filter((job) => job.systems.length > 0);
  const compactRoles = experience.filter((job) => job.systems.length === 0);

  return (
    <section id="experience" aria-labelledby="experience-title" className="px-6 py-20 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2
          id="experience-title"
          className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl"
        >
          Experience
        </h2>
        <p className="mt-4 max-w-[60ch] text-neutral-300">
          I build AI agents and reporting automation for a marketing agency. Before that: internships in
          AI engineering and derivatives analytics.
        </p>

        <div className="mt-14 space-y-16">
          {ledgerRoles.map((job) => (
            <LedgerRole key={job.id} job={job} />
          ))}
        </div>

        {compactRoles.length > 0 && (
          <div className={ledgerRoles.length > 0 ? "mt-16" : "mt-14"}>
            {ledgerRoles.length > 0 && (
              <h3 className="mb-2 text-sm font-medium text-neutral-400">Before that</h3>
            )}
            <ul className="border-b border-white/10">
              {compactRoles.map((job) => (
                <CompactRole key={job.id} job={job} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
