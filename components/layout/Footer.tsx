"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Linkedin, Github, Mail, Heart } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";

const navigation = {
  main: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-neutral-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SL</span>
              </div>
              <span className="font-bold text-lg">Steven Lagadapati</span>
            </div>
            <p className="text-neutral-400 text-sm max-w-xs">
              {personalInfo.tagline}
            </p>
            <p className="text-neutral-500 text-xs">
              {personalInfo.description.slice(0, 100)}...
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect</h3>
            <div className="space-y-3">
              <Link
                href={`mailto:${personalInfo.email}`}
                className="flex items-center space-x-2 text-neutral-400 hover:text-blue-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </Link>
              <div className="flex items-center space-x-3 pt-2">
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  className="p-2 bg-neutral-800 hover:bg-blue-500 rounded-lg transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  className="p-2 bg-neutral-800 hover:bg-blue-500 rounded-lg transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 bg-neutral-800 hover:bg-blue-500 rounded-lg transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-sm text-neutral-400">
            <span>© {new Date().getFullYear()} Steven Lagadapati. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-neutral-400">
            <span>Built with React & Tailwind</span>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-2 bg-neutral-800 hover:bg-blue-500 rounded-lg transition-all hover:scale-110 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>

        {/* Made with Love */}
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-500 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>by Steven Lagadapati</span>
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}

