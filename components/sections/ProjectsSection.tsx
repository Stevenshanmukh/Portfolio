"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Github, ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePortfolio } from "@/lib/portfolio-context";
import type { Project } from "@/lib/types";

const categories = [
  "All",
  "Machine Learning",
  "Data Science",
  "Web Dev",
  "Research",
];

function ProjectThumbnail({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const hasImage = src && src.startsWith("http") && !failed;
  const initials = title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (hasImage) {
    return (
      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-neutral-700 shrink-0">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover"
          sizes="40px"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-lg border border-neutral-700 bg-white/[0.03] flex items-center justify-center shrink-0">
      <span className="text-xs font-medium text-neutral-500">
        {initials}
      </span>
    </div>
  );
}

export function ProjectsSection() {
  const { projects } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 lg:px-8" ref={ref}>
      <div className="max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Section header */}
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
            Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
            Selected Projects
          </h2>
          <p className="text-neutral-400 max-w-xl mb-12">
            A collection of academic research and personal experiments in Data
            Science, Machine Learning, and Web Development.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === category
                    ? "bg-white text-neutral-950"
                    : "text-neutral-500 hover:text-neutral-50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const hasLongDescription = project.longDescription && project.longDescription.trim().length > 0;

  return (
    <div className="p-6 border border-neutral-700/50 rounded-2xl hover:border-neutral-600 transition-colors space-y-4 bg-white/[0.02]">
      {/* Header */}
      <div className="flex items-start gap-3">
        <ProjectThumbnail src={project.image} title={project.title} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-white">{project.title}</h3>
            {project.featured && (
              <span className="px-2 py-0.5 border border-neutral-700 rounded text-[10px] uppercase tracking-widest font-medium text-neutral-500 shrink-0">
                Featured
              </span>
            )}
          </div>
          <p className="text-xs uppercase tracking-widest text-neutral-500 mt-0.5">
            {project.category}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-400 leading-relaxed">
        {project.description}
      </p>

      {/* Long Description (expandable) */}
      {hasLongDescription && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
            <span>{expanded ? "Show less" : "Read more"}</span>
          </button>
          {expanded && (
            <p className="text-sm text-neutral-400 leading-relaxed mt-3">
              {project.longDescription}
            </p>
          )}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 border border-neutral-700 rounded-lg text-sm text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Source</span>
          </Link>
        )}
        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-50 transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Demo</span>
          </Link>
        )}
        {!project.github && !project.demo && (
          <span className="text-sm text-neutral-500">Details coming soon</span>
        )}
      </div>
    </div>
  );
}
