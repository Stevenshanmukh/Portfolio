"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/lib/portfolio-context";

export function ExperienceSection() {
  const { experience } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 md:py-32 px-6 lg:px-8" ref={ref}>
      <div className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section header */}
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
            Career
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
            Experience
          </h2>
          <p className="text-neutral-400 max-w-xl mb-12">
            I build AI agents and reporting automation for a marketing agency.
            Before that: internships in AI engineering and derivatives analytics.
          </p>

          <div className="space-y-8">
            {experience.map((job) => (
              <article
                key={job.id}
                className="p-6 sm:p-8 border border-neutral-700/50 rounded-2xl hover:border-neutral-600 transition-colors bg-white/[0.02]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6 mb-4">
                  <div>
                    <h3 className="font-serif text-xl font-semibold tracking-tight mb-1 text-white">
                      {job.role}
                    </h3>
                    {job.companyUrl ? (
                      <Link
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
                      >
                        {job.company}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <p className="text-neutral-300">{job.company}</p>
                    )}
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-sm text-neutral-300">{job.period}</p>
                    {job.location && (
                      <p className="text-sm text-neutral-500">{job.location}</p>
                    )}
                  </div>
                </div>

                {job.summary && (
                  <p className="text-sm text-neutral-500 mb-5">{job.summary}</p>
                )}

                {job.highlights.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {job.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-neutral-400 leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] w-1 h-1 rounded-full bg-neutral-500 shrink-0"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 border border-neutral-700 rounded-lg text-xs font-medium text-neutral-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
