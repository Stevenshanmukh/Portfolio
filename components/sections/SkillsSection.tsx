"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Brain,
  Database,
  BarChart3,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Technical Proficiency
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A comprehensive toolkit for Data Science, Machine Learning, and
            Software Engineering.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map(([category, data], index) => {
            const IconComponent = iconMap[data.icon] || Code;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl"
              >
                {/* Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{category}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {data.description}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {data.items.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                      className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Always learning and expanding my technical arsenal
          </p>
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium">
            <span>Continuously Growing</span>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
