"use client";

import { motion } from "motion/react";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/lib/portfolio-context";

export function HeroSection() {
  const { personalInfo, socialLinks } = usePortfolio();

  return (
    <section className="relative py-24 md:py-32 flex items-center justify-center px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto w-full text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="space-y-8">
          {/* Name */}
          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-white"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {personalInfo.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            className="text-xl sm:text-2xl text-neutral-400 font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {personalInfo.role}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {personalInfo.description}
          </motion.p>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-neutral-700 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-50" />
              <span className="text-xs text-neutral-400">
                {personalInfo.availability}
              </span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="#projects"
              className="px-6 py-3 bg-white text-neutral-950 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            >
              View Projects
            </Link>
            <Link
              href={personalInfo.resume}
              target="_blank"
              className="px-6 py-3 border border-neutral-600 rounded-lg text-sm font-medium text-neutral-200 hover:bg-white/5 transition-colors"
            >
              Resume
            </Link>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex items-center justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link
              href={socialLinks.github}
              target="_blank"
              className="text-neutral-500 hover:text-neutral-50 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              className="text-neutral-500 hover:text-neutral-50 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-neutral-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
