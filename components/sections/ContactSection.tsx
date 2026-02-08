"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Linkedin, Github, Copy, Check, Send, ArrowUpRight } from "lucide-react";
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
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900/50"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Ready to collaborate?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            I&apos;m currently looking for Data Science opportunities. Let&apos;s build
            something intelligent together.
          </p>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-8 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 border border-blue-500/20 rounded-2xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          </div>

          <div className="relative space-y-6">
            {/* Email Section */}
            <div className="text-center space-y-4">
              <p className="text-sm uppercase tracking-wide text-blue-500 font-semibold">
                Get in Touch
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold">
                {personalInfo.email}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Response time: Within 24 hours
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`mailto:${personalInfo.email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Send Email</span>
              </Link>
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-lg transition-all hover:scale-105"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Copied!</span>
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
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* LinkedIn Card */}
          <Link
            href={socialLinks.linkedin}
            target="_blank"
            className="group p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <Linkedin className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold">LinkedIn</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Professional Profile
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </Link>

          {/* GitHub Card */}
          <Link
            href={socialLinks.github}
            target="_blank"
            className="group p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <Github className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold">GitHub</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Code & Projects
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-2">
            <span className="font-semibold">Location:</span> {personalInfo.location}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            Available for full-time opportunities, internships, and collaborations
          </p>
        </motion.div>
      </div>
    </section>
  );
}
