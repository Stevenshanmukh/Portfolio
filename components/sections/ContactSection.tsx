"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/lib/portfolio-context";

type CopyStatus = "idle" | "copied" | "failed";

export function ContactSection() {
  const { personalInfo, socialLinks } = usePortfolio();
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [local, domain] = personalInfo.email.split("@");

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-6 py-20 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 border-t border-white/10 pt-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2
            id="contact-title"
            className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl"
          >
            Hiring for AI or automation work?
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-neutral-300">
            I&apos;m open to AI &amp; Automation Engineer roles. Email is the fastest way to reach me.
          </p>
          {personalInfo.location && (
            <p className="mt-6 text-sm text-neutral-400">Based in {personalInfo.location}</p>
          )}
        </div>

        {personalInfo.email && (
          <div className="lg:pt-2">
            <p className="text-xl font-medium tracking-[-0.01em] text-white sm:text-2xl">
              {domain ? (
                <>
                  {local}
                  <wbr />@{domain}
                </>
              ) : (
                personalInfo.email
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`mailto:${personalInfo.email}`}
                className="inline-flex min-h-11 items-center rounded-lg bg-white px-5 text-sm font-medium text-neutral-950 transition-opacity hover:opacity-85"
              >
                Email me
              </Link>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-5 text-sm font-medium text-neutral-100 transition-colors hover:border-white/40 hover:bg-white/5"
              >
                {status === "copied" ? (
                  <Check aria-hidden="true" className="size-4 text-approved" />
                ) : (
                  <Copy aria-hidden="true" className="size-4" />
                )}
                {status === "copied" ? "Copied" : status === "failed" ? "Couldn't copy" : "Copy email"}
              </button>
              <span aria-live="polite" className="sr-only">
                {status === "copied"
                  ? "Email address copied."
                  : status === "failed"
                    ? "Couldn't copy. Select the address above instead."
                    : ""}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {socialLinks.linkedin && (
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1 text-neutral-300 underline decoration-white/25 hover:text-white hover:decoration-white"
                >
                  LinkedIn
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              )}
              {socialLinks.github && (
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1 text-neutral-300 underline decoration-white/25 hover:text-white hover:decoration-white"
                >
                  GitHub
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
