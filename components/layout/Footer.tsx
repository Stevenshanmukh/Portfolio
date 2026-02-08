"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const { personalInfo, socialLinks } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-3 max-w-xs">
            <p className="text-sm font-medium text-neutral-200">{personalInfo.name}</p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {personalInfo.tagline}
            </p>
          </div>

          <div className="flex gap-16">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Navigation
              </p>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Connect
              </p>
              <Link
                href={socialLinks.github}
                target="_blank"
                className="block text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
              >
                GitHub
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                className="block text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href={`mailto:${personalInfo.email}`}
                className="block text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
              >
                Email
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-16 pt-8 border-t border-neutral-800">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} {personalInfo.name}
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 text-neutral-500 hover:text-neutral-50 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
