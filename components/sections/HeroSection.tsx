"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto w-full relative z-10"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge with Sparkle Animation */}
          <motion.div variants={itemVariants} className="inline-block">
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.4)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.7)",
                    "0 0 0 10px rgba(34, 197, 94, 0)",
                    "0 0 0 0 rgba(34, 197, 94, 0.7)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {personalInfo.availability}
              </span>
              <Sparkles className="w-4 h-4 text-blue-500" />
            </motion.div>
          </motion.div>

          {/* Main Heading with Letter Animation */}
          <div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight px-4"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Hi, I&apos;m{" "}
              </motion.span>
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ["0% center", "200% center", "0% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Steven.
              </motion.span>
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 px-4"
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ["0% center", "200% center", "0% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
              >
                {personalInfo.role}.
              </motion.span>
            </motion.h2>
          </div>

          {/* Description with Fade In */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4"
          >
            {personalInfo.description}
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4"
          >
            <MagneticButton>
              <Link
                href="#projects"
                className="group relative inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm sm:text-base whitespace-nowrap overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href={personalInfo.resume}
                target="_blank"
                className="group inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-lg transition-all text-sm sm:text-base whitespace-nowrap backdrop-blur-sm"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                <span>Resume</span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                className="group inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-lg transition-all text-sm sm:text-base whitespace-nowrap backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <span>LinkedIn</span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href={socialLinks.github}
                target="_blank"
                className="group inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-lg transition-all text-sm sm:text-base whitespace-nowrap backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <span>GitHub</span>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="pt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center space-y-2 text-neutral-400"
            >
              <span className="text-xs uppercase tracking-widest">Scroll Down</span>
              <motion.div
                className="w-6 h-10 border-2 border-neutral-300 dark:border-neutral-700 rounded-full p-1"
                whileHover={{ borderColor: "rgb(59, 130, 246)" }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}


