"use client";

import Link from "next/link";
import { usePortfolio } from "@/lib/portfolio-context";
import { NAV_ITEMS } from "@/lib/nav";

export function Footer() {
  const { personalInfo } = usePortfolio();

  return (
    <footer className="border-t border-white/10 px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold text-white">{personalInfo.name}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-neutral-400">
          Built with Next.js · &copy; {new Date().getFullYear()} {personalInfo.name}
        </p>
      </div>
    </footer>
  );
}
