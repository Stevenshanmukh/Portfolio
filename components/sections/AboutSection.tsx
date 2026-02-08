"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Download, Linkedin, Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePortfolio } from "@/lib/portfolio-context";

/** Renders the profile photo if a valid URL exists, otherwise shows initials */
function ProfileImage({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const hasImage = src && src.startsWith("http") && !failed;

  if (hasImage) {
    return (
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 208px, (max-width: 1024px) 240px, 256px"
        onError={() => setFailed(true)}
        priority
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
      <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
        {initials}
      </span>
    </div>
  );
}

export function AboutSection() {
  const { personalInfo, education, socialLinks } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Profile Block: Avatar + Bio side by side */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          {/* Left: Avatar — shrink-0 so it takes only the space it needs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0"
          >
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border-2 border-neutral-200 dark:border-neutral-700/50 shadow-2xl">
                <ProfileImage
                  src={personalInfo.image}
                  name={personalInfo.name}
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-1.5 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium whitespace-nowrap">{personalInfo.availability}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content — flex-1 fills remaining space naturally */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 text-center lg:text-left space-y-5"
          >
            {/* Name & Tagline */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {personalInfo.name}
              </h2>
              <p className="text-lg sm:text-xl text-blue-500 font-semibold">
                {personalInfo.tagline}
              </p>
            </div>

            {/* Pull-quote headline */}
            <h3 className="text-xl sm:text-2xl font-semibold text-neutral-700 dark:text-neutral-200 leading-snug">
              Bridging the gap between raw data and actionable insights.
            </h3>

            {/* Bio */}
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed text-base sm:text-lg">
              <p>
                I am currently pursuing my Master&apos;s in Data Science at{" "}
                <span className="text-blue-500 font-semibold">
                  Florida Atlantic University
                </span>
                . My journey is defined by a curiosity for patterns and a drive
                to solve complex problems through machine learning and
                statistical analysis.
              </p>
              <p>
                I thrive on turning complex datasets into clear, impactful
                stories that drive decision-making. When I&apos;m not coding, I&apos;m
                exploring the latest advancements in AI.
              </p>
            </div>

            {/* CTA Buttons — naturally grouped with the bio text */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
              <Link
                href={personalInfo.resume}
                target="_blank"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-500 hover:text-white rounded-lg transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href={socialLinks.github}
                target="_blank"
                className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-500 hover:text-white rounded-lg transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href={`mailto:${socialLinks.email}`}
                className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-500 hover:text-white rounded-lg transition-all hover:scale-105"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Education Card — Full-width below the profile block */}
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 lg:mt-20 p-6 sm:p-8 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-2xl"
          >
            <div className="flex items-start space-x-4 sm:space-x-6">
              <div className="p-3 sm:p-4 bg-blue-500 rounded-xl shrink-0">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold">{edu.institution}</h4>
                    <p className="text-blue-500 font-medium text-base sm:text-lg">{edu.degree}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full whitespace-nowrap self-start">
                    {edu.status}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  {edu.period}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">
                  {edu.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
