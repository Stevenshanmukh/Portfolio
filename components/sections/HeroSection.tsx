"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";
import { RunTrace } from "./RunTrace";

/** Splits "First sentence. The rest." so the second part can sit dimmer. */
function splitHeadline(headline: string): [string, string] {
  const match = headline.match(/^(.+?[.!?])\s+(.+)$/);
  return match ? [match[1], match[2]] : [headline, ""];
}

export function HeroSection() {
  const { personalInfo, socialLinks } = usePortfolio();
  const [lead, rest] = splitHeadline(personalInfo.headline || personalInfo.role);

  return (
    <section aria-labelledby="hero-title" className="px-6 pb-12 pt-28 md:pb-16 md:pt-36 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <div className="mb-8 flex items-center gap-3">
            {personalInfo.image && (
              <Image
                src={personalInfo.image}
                alt=""
                width={40}
                height={40}
                priority
                className="size-10 rounded-full border border-white/10 object-cover"
              />
            )}
            <p className="text-sm text-neutral-300">
              <span className="font-medium text-white">{personalInfo.name}</span>
              <span aria-hidden="true" className="mx-2 text-neutral-500">
                /
              </span>
              {personalInfo.role}
            </p>
          </div>

          <h1
            id="hero-title"
            className="max-w-[22ch] text-balance font-serif text-[clamp(2.25rem,4.4vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-white"
          >
            {lead}
            {rest && <span className="text-neutral-400"> {rest}</span>}
          </h1>

          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-neutral-300">
            {personalInfo.description}
          </p>

          {personalInfo.proofPoints.length > 0 && (
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-4">
              {personalInfo.proofPoints.map((point) => (
                <li key={point.label} className="min-w-0">
                  <span className="block font-mono text-base tabular-nums text-white">{point.value}</span>
                  <span className="mt-1 block text-sm leading-snug text-neutral-400">{point.label}</span>
                </li>
              ))}
            </ul>
          )}

          {personalInfo.availability && (
            <p className="mt-10 inline-flex items-center gap-2 text-sm text-neutral-300">
              <span aria-hidden="true" className="size-2 rounded-full bg-approved" />
              {personalInfo.availability}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {personalInfo.resume && (
              <Link
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-lg bg-white px-5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-85"
              >
                Resume
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </Link>
            )}
            <Link
              href="#contact"
              className="inline-flex min-h-11 items-center rounded-lg border border-white/20 px-5 text-sm font-medium text-neutral-100 transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Get in touch
            </Link>
            <span className="flex items-center gap-1">
              {socialLinks.github && (
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (opens in a new tab)"
                  className="inline-flex size-11 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Github aria-hidden="true" className="size-5" />
                </Link>
              )}
              {socialLinks.linkedin && (
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (opens in a new tab)"
                  className="inline-flex size-11 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Linkedin aria-hidden="true" className="size-5" />
                </Link>
              )}
            </span>
          </div>
        </div>

        {personalInfo.runTrace.length > 0 && (
          <RunTrace title={personalInfo.runTraceTitle} steps={personalInfo.runTrace} />
        )}
      </div>
    </section>
  );
}
