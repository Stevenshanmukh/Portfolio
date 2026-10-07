"use client";

import { Code, Brain, Database, BarChart3, Wrench, Cloud, Cpu, Layers, Plug, type LucideIcon } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";

// Must match the icon list in studio/schemaTypes/skillCategory.ts.
const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Database,
  BarChart3,
  Wrench,
  Cloud,
  Cpu,
  Layers,
  Plug,
};

export function SkillsSection() {
  const { skills } = usePortfolio();
  if (skills.length === 0) return null;

  return (
    <section id="skills" aria-labelledby="skills-title" className="px-6 py-20 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2
          id="skills-title"
          className="font-serif text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl"
        >
          Tools
        </h2>
        <p className="mt-4 max-w-[60ch] text-neutral-300">
          The tools behind the agents, the data pipelines and the apps around them.
        </p>

        <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {skills.map((group) => {
            const Icon = iconMap[group.icon];
            return (
              <div key={group.id} className="grid gap-3 py-6 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-10">
                <dt className="flex items-start gap-3">
                  {Icon && <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-neutral-400" />}
                  <span>
                    <span className="block font-medium text-white">{group.name}</span>
                    {group.description && (
                      <span className="mt-1 block text-sm leading-snug text-neutral-400">{group.description}</span>
                    )}
                  </span>
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-1 gap-y-1.5 leading-relaxed text-neutral-200">
                    {group.items.map((item, i) => (
                      <li key={item}>
                        {item}
                        {i < group.items.length - 1 && (
                          <span aria-hidden="true" className="ml-1 text-neutral-500">
                            ·
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
