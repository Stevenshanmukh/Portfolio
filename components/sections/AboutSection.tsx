"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Download, Linkedin, Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, education, socialLinks } from "@/data/portfolio";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-sm font-semibold text-blue-500 uppercase tracking-wide mb-2">
            01. About Me
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Steven Lagadapati
          </h2>
          <p className="text-lg sm:text-xl text-blue-500 font-semibold">
            {personalInfo.tagline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image and Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Image */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700">
                {/* Placeholder */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-white">SL</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Profile Photo
                      </p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500">
                        Add to: /public/images/profile.jpg
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{personalInfo.availability}</span>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
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

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Bridging the gap between raw data and actionable insights.
              </h3>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
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
            </div>

            {/* Education Card */}
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="p-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-xl font-bold">{edu.institution}</h4>
                        <p className="text-blue-500 font-medium">{edu.degree}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full">
                        {edu.status}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                      {edu.period}
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Technical Proficiency Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-blue-500 rounded-full" />
                <h4 className="text-lg font-semibold">Technical Proficiency</h4>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                A comprehensive toolkit for Data Science, Machine Learning, and
                Software Engineering.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

