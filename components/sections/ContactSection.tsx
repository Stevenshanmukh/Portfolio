"use client";

import Link from "next/link";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";

const iconButton =
  "inline-flex size-12 items-center justify-center rounded-xl border border-white/20 text-white transition-colors hover:border-white/40 hover:bg-white/5";

export function ContactSection() {
  const { personalInfo, socialLinks } = usePortfolio();

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-6 py-20 md:py-24 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-2xl border border-white/10 bg-panel/85 p-7 md:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2
            id="contact-title"
            className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
          >
            Let&apos;s build something
          </h2>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-neutral-300">
            I&apos;m open to AI &amp; Automation Engineer roles, and always happy to talk about AI, data or
            automation.
          </p>
          {personalInfo.email && (
            <p className="mt-3 break-words text-sm text-neutral-400">
              {personalInfo.email}
              {personalInfo.location && <> · Based in {personalInfo.location}</>}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {personalInfo.email && (
            <Link
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-white px-5 text-sm font-semibold text-neutral-950 transition-opacity hover:opacity-90"
            >
              <Mail aria-hidden="true" className="size-4" />
              Get in touch
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
          {socialLinks.linkedin && (
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className={iconButton}
            >
              <Linkedin aria-hidden="true" className="size-5" />
            </Link>
          )}
          {socialLinks.github && (
            <Link
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className={iconButton}
            >
              <Github aria-hidden="true" className="size-5" />
            </Link>
          )}
          {personalInfo.resume && (
            <Link
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <FileText aria-hidden="true" className="size-4" />
              View resume
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
