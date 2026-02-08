"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePortfolio } from "@/lib/portfolio-context";
import type { Project } from "@/lib/types";

const categories = ["All", "Machine Learning", "Data Science", "Web Dev", "Research"];

/** Shows the project screenshot if a valid URL exists, otherwise a gradient placeholder */
function ProjectImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const hasImage = src && src.startsWith("http") && !failed;

  if (hasImage) {
    return (
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center space-y-2 p-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Github className="w-8 h-8 text-white" />
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {title}
        </p>
      </div>
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
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A collection of academic research and personal experiments in Data
            Science, Machine Learning, and Web Development.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="#contact"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:scale-105 transition-all"
          >
            <span className="font-medium">View All Projects</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-2xl"
    >
      {/* Featured Badge with Animation */}
      {project.featured && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
          className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full flex items-center space-x-1 shadow-lg"
        >
          <Sparkles className="w-3 h-3" />
          <span>Featured</span>
        </motion.div>
      )}

      {/* Image with Zoom Effect */}
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <ProjectImage src={project.image} title={project.title} />
        </motion.div>
        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title with Underline Animation */}
        <div className="relative">
          <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors">
            {project.title}
          </h3>
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {project.description}
        </p>

        {/* Tags with Stagger Animation */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded-md font-medium cursor-default"
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 3 && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.15 }}
              className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-xs rounded-md font-medium"
            >
              +{project.tags.length - 3}
            </motion.span>
          )}
        </div>

        {/* Links with Icon Animation */}
        <div className="flex items-center space-x-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              className="group/link flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <Github className="w-4 h-4" />
              </motion.div>
              <span>GitHub</span>
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              className="group/link flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <motion.div
                whileHover={{ x: 3, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
              <span>Demo</span>
            </Link>
          )}
          {!project.github && !project.demo && (
            <span className="text-xs text-neutral-400">Details coming soon</span>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
