"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/lib/portfolio-context";

export function ContactSection() {
  const { personalInfo, socialLinks } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 lg:px-8"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section header */}
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
            Contact
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
            Get in Touch
          </h2>
          <p className="text-neutral-400 max-w-lg mb-16">
            I&apos;m currently looking for Data Science opportunities.
            Let&apos;s connect.
          </p>

          {/* Email card */}
          <div className="p-8 border border-neutral-700/50 rounded-2xl text-center space-y-6 bg-white/[0.02]">
            <p className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
              {personalInfo.email}
            </p>
            <p className="text-sm text-neutral-500">
              Response time: Within 24 hours
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href={`mailto:${personalInfo.email}`}
                className="px-6 py-3 bg-white text-neutral-950 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Send Email
              </Link>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-600 rounded-lg text-sm font-medium text-neutral-200 hover:bg-white/5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-3 mt-12">
            <Link
              href={socialLinks.linkedin}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 border border-neutral-700 rounded-lg text-sm text-neutral-400 hover:text-neutral-50 hover:border-neutral-500 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={socialLinks.github}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 border border-neutral-700 rounded-lg text-sm text-neutral-400 hover:text-neutral-50 hover:border-neutral-500 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Location */}
          <p className="text-sm text-neutral-500 text-center mt-12">
            {personalInfo.location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
