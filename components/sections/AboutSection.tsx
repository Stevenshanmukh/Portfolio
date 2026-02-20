"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Download, Linkedin, Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePortfolio } from "@/lib/portfolio-context";

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
        sizes="(max-width: 640px) 176px, 208px"
        onError={() => setFailed(true)}
        priority
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-800">
      <span className="text-4xl sm:text-5xl font-serif font-semibold text-neutral-600">
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
    <section id="about" className="pt-12 md:pt-16 pb-24 md:pb-32 px-6 lg:px-8" ref={ref}>
      <div className="max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Profile block */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border border-neutral-700">
                <ProfileImage
                  src={personalInfo.image}
                  name={personalInfo.name}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-2 text-white">
                  {personalInfo.name}
                </h3>
                <p className="text-lg text-neutral-400">
                  {personalInfo.tagline}
                </p>
              </div>

              <p className="text-neutral-400 leading-relaxed">
                {personalInfo.aboutDescription || personalInfo.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={personalInfo.resume}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-950 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </Link>
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  className="p-2.5 border border-neutral-700 rounded-lg text-neutral-400 hover:text-neutral-50 hover:border-neutral-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  className="p-2.5 border border-neutral-700 rounded-lg text-neutral-400 hover:text-neutral-50 hover:border-neutral-500 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </Link>
                <Link
                  href={`mailto:${socialLinks.email}`}
                  className="p-2.5 border border-neutral-700 rounded-lg text-neutral-400 hover:text-neutral-50 hover:border-neutral-500 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Education */}
          {education.map((edu, index) => (
            <div
              key={index}
              className="mt-16 p-8 border border-neutral-700/50 rounded-2xl bg-white/[0.02]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold tracking-tight mb-1 text-white">
                    {edu.institution}
                  </h3>
                  <p className="text-neutral-400">{edu.degree}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm text-neutral-500">{edu.period}</span>
                  <span className="px-2.5 py-1 border border-neutral-700 rounded-full text-xs font-medium text-neutral-300">
                    {edu.status}
                  </span>
                </div>
              </div>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                {edu.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 border border-neutral-700 rounded-lg text-xs font-medium text-neutral-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
