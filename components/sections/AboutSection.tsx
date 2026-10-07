"use client";

import { IconTile } from "@/components/ui/IconTile";
import { iconFor } from "@/lib/icons";
import { usePortfolio } from "@/lib/portfolio-context";

export function AboutSection() {
  const { personalInfo } = usePortfolio();
  const bio = personalInfo.aboutDescription || personalInfo.description;

  return (
    <section id="about" aria-labelledby="about-title" className="px-6 py-20 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="about-title"
            className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
          >
            How I build agents
          </h2>
          {bio && <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-neutral-300">{bio}</p>}
        </div>

        {personalInfo.guardrails.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {personalInfo.guardrails.map((rule) => (
              <li
                key={rule.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:block sm:p-6"
              >
                <IconTile icon={iconFor(rule.icon)} className="rounded-full" />
                <div className="min-w-0 sm:mt-5">
                  <h3 className="font-semibold text-white">{rule.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-neutral-300">{rule.body}</p>
                  {rule.seenIn && <p className="mt-3 text-sm text-neutral-400">Seen in: {rule.seenIn}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
