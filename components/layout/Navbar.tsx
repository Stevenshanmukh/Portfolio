"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePortfolio } from "@/lib/portfolio-context";
import { NAV_ITEMS, sectionId } from "@/lib/nav";

/** Tracks which home section is under the navbar, for aria-current and styling. */
function useActiveSection() {
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = NAV_ITEMS.map((item) => document.getElementById(sectionId(item.href))).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`/#${entry.target.id}`);
        }
      },
      // A thin band near the top of the viewport decides the active section.
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Project pages belong to "Projects".
  return pathname.startsWith("/projects") ? "/#projects" : active;
}

export function Navbar() {
  const { personalInfo } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || menuOpen ? "border-b border-white/10 bg-ink/95" : "bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group text-sm tracking-tight transition-opacity hover:opacity-80">
            <span className="font-semibold text-white">{personalInfo.name}</span>
            {personalInfo.role && (
              <span className="hidden text-neutral-400 md:inline"> · {personalInfo.role}</span>
            )}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`inline-flex min-h-9 items-center rounded-md px-3 text-sm underline-offset-[6px] transition-colors ${
                      isActive ? "text-white underline decoration-white/40" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "mobile-menu" : undefined}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-mr-2 flex size-11 items-center justify-center text-neutral-300 transition-colors hover:text-white md:hidden"
          >
            {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <ul className="px-6 py-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === item.href ? "true" : undefined}
                    className={`flex min-h-11 items-center text-base transition-colors ${
                      active === item.href ? "text-white" : "text-neutral-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
