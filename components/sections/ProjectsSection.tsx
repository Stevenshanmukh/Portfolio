"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { Github, ArrowUpRight, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePortfolio } from "@/lib/portfolio-context";
import type { Project } from "@/lib/types";

/** Number of projects to show per batch. Change this to adjust pagination size. */
const BATCH_SIZE = 6;

const FALLBACK_CATEGORIES = [
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
  const { projects, siteMetadata } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  // Use dynamic categories from metadata if available, otherwise fallback
  const categories = ["All", ...(siteMetadata?.projectCategories || [])];
  if (categories.length === 1) {
    const fallback = ["Machine Learning", "Data Science", "Web Dev", "Research"];
    categories.push(...fallback);
  }

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setVisibleCount(BATCH_SIZE);
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => {
        if (project.categories && project.categories.length > 0) {
          return project.categories.includes(activeCategory);
        }
        return project.category === activeCategory;
      });

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const remaining = filteredProjects.length - visibleCount;

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
                onClick={() => handleCategoryChange(category)}
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
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  className="h-full"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: (index % BATCH_SIZE) * 0.06,
                  }}
                >
                  <ProjectCard project={project} onExpand={setExpandedProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Explore More button */}
          <AnimatePresence>
            {hasMore && (
              <motion.div
                className="flex justify-center mt-14"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setVisibleCount((prev) => prev + BATCH_SIZE)}
                  className="group flex items-center gap-3 px-8 py-3.5 rounded-xl border border-neutral-700/60 bg-white/[0.03] text-sm font-medium text-neutral-300 hover:text-white hover:border-neutral-500 hover:bg-white/[0.06] transition-all duration-300"
                >
                  Explore More
                  <span className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    {remaining} remaining
                  </span>
                  <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 group-hover:translate-y-0.5 transition-all duration-300" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded project modal */}
          <ProjectModal
            project={expandedProject}
            onClose={() => setExpandedProject(null)}
          />
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: (project: Project) => void;
}) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const [tagsOverflow, setTagsOverflow] = useState(false);

  useEffect(() => {
    const descEl = descRef.current;
    if (descEl) {
      setIsClamped(descEl.scrollHeight > descEl.clientHeight);
    }
    const tagsEl = tagsRef.current;
    if (tagsEl) {
      setTagsOverflow(tagsEl.scrollHeight > tagsEl.clientHeight);
    }
  }, [project]);

  const needsShowMore = isClamped || tagsOverflow;

  return (
    <div className="p-6 border border-neutral-700/50 rounded-2xl hover:border-neutral-600 transition-colors flex flex-col gap-4 h-full bg-white/[0.02]">
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
          <div className="flex flex-wrap gap-1 mt-1">
            {(project.categories || [project.category]).map((cat, i) => (
              <span key={i} className="text-xs uppercase tracking-widest text-neutral-500">
                {cat}{i < (project.categories?.length || 1) - 1 ? " • " : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description — clamped to 5 lines */}
      <div className="flex-grow">
        <p
          ref={descRef}
          className="text-sm text-neutral-400 leading-relaxed line-clamp-5"
        >
          {project.description}
        </p>
        {needsShowMore && (
          <button
            onClick={() => onExpand(project)}
            className="text-sm text-neutral-500 hover:text-white transition-colors mt-1"
          >
            …show more
          </button>
        )}
      </div>

      {/* Tags — single row, overflow hidden */}
      <div
        ref={tagsRef}
        className="flex flex-wrap gap-2 overflow-hidden"
        style={{ maxHeight: "38px" }}
      >
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
      <div className="flex items-center gap-4 mt-auto">
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

/** Full-screen modal showing expanded project details */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-neutral-700/50 bg-neutral-950 p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <ProjectThumbnail src={project.image} title={project.title} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 border border-neutral-700 rounded text-[10px] uppercase tracking-widest font-medium text-neutral-500 shrink-0">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(project.categories || [project.category]).map((cat, i) => (
                    <span
                      key={i}
                      className="text-xs uppercase tracking-widest text-neutral-500"
                    >
                      {cat}
                      {i < (project.categories?.length || 1) - 1 ? " • " : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Full description */}
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {project.longDescription || project.description}
            </p>

            {/* All tags */}
            <div className="flex flex-wrap gap-2 mb-6">
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
                  className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Source</span>
                </Link>
              )}
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Demo</span>
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
