"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Code, Brain, Database, BarChart3, Wrench, type LucideIcon } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Database,
  BarChart3,
  Wrench,
};

export function SkillsSection() {
  const { skills } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const skillCategories = Object.entries(skills);

  return (
    <section
      id="skills"
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
            Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
            Technical Proficiency
          </h2>
          <p className="text-neutral-400 max-w-xl mb-16">
            A comprehensive toolkit for Data Science, Machine Learning, and
            Software Engineering.
          </p>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillCategories.map(([category, data]) => (
              <div key={category} className="p-6 border border-neutral-700/50 rounded-2xl hover:border-neutral-600 transition-colors space-y-4 bg-white/[0.02]">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    {(() => {
                      const Icon = iconMap[data.icon];
                      return Icon ? <Icon className="w-5 h-5 text-neutral-400 shrink-0" /> : null;
                    })()}
                    <h3 className="text-lg font-medium text-white">{category}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {data.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.items.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 border border-neutral-700 rounded-lg text-sm text-neutral-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
