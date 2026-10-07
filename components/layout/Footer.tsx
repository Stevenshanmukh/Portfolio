"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";
import { NAV_ITEMS } from "@/lib/nav";

const linkClass = "inline-flex min-h-9 items-center text-sm text-neutral-400 transition-colors hover:text-white";

export function Footer() {
  const { personalInfo, socialLinks } = usePortfolio();

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-white/10 px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <p className="text-sm font-medium text-neutral-100">{personalInfo.name}</p>
          {personalInfo.tagline && (
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{personalInfo.tagline}</p>
          )}
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-12 gap-y-6">
          <ul className="grid gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="grid content-start gap-1">
            {socialLinks.github && (
              <li>
                <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </Link>
              </li>
            )}
            {socialLinks.linkedin && (
              <li>
                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </Link>
              </li>
            )}
            {personalInfo.email && (
              <li>
                <Link href={`mailto:${personalInfo.email}`} className={linkClass}>
                  Email
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-white/10 py-6">
        <p className="text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex size-11 items-center justify-center text-neutral-400 transition-colors hover:text-white"
        >
          <ArrowUp aria-hidden="true" className="size-4" />
        </button>
      </div>
    </footer>
  );
}
