"use client";

import { usePortfolio } from "@/lib/portfolio-context";

export function AboutSection() {
  const { personalInfo } = usePortfolio();
  const bio = personalInfo.aboutDescription || personalInfo.description;

  return (
    <section id="about" aria-labelledby="about-title" className="px-6 py-20 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="about-title"
            className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl"
          >
            How I build agents
          </h2>
          {bio && <p className="mt-6 max-w-[62ch] leading-relaxed text-neutral-300">{bio}</p>}
        </div>

        {personalInfo.guardrails.length > 0 && (
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {personalInfo.guardrails.map((rule) => (
              <li key={rule.title} className="grid gap-2 py-6 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-6">
                <span className="pt-1 font-mono text-xs text-neutral-400">{rule.label}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{rule.title}</h3>
                  <p className="mt-1.5 max-w-[62ch] leading-relaxed text-neutral-300">{rule.body}</p>
                  {rule.seenIn && <p className="mt-2 text-sm text-neutral-400">Seen in: {rule.seenIn}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
