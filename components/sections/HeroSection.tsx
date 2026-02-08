"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePortfolio } from "@/lib/portfolio-context";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StarButton } from "@/components/ui/star-button";

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

// Pre-compute particle positions so they are identical on server and client
// (avoids hydration mismatch from calling Math.random() during render)
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  left: seededRandom(i * 2) * 100,
  top: seededRandom(i * 2 + 1) * 100,
  duration: seededRandom(i * 3) * 3 + 2,
  delay: seededRandom(i * 4) * 2,
}));

export function HeroSection() {
  const { personalInfo, socialLinks } = usePortfolio();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const { theme } = useTheme();
  const [lightColor, setLightColor] = React.useState("#FAFAFA");

  React.useEffect(() => {
    setLightColor(theme === "dark" ? "#FAFAFA" : "#FF2056");
  }, [theme]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-8 overflow-hidden">
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
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
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
                {personalInfo.name.split(" ")[0]}.
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
              <Link href="#projects">
                <StarButton
                  lightColor={lightColor}
                  className="rounded-3xl px-6 py-3 h-auto text-sm sm:text-base cursor-pointer"
                >
                  View Projects
                </StarButton>
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

          {/* Scroll Indicator — minimalist line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.2 }}
            className="pt-6 flex justify-center"
          >
            <div className="relative h-10 w-px">
              <div className="absolute inset-0 bg-neutral-300/40 dark:bg-neutral-600/30 rounded-full" />
              <motion.div
                className="absolute top-0 left-0 w-full rounded-full bg-blue-500/80"
                animate={{ height: ["0%", "100%"], opacity: [1, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.4,
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
