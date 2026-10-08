"use client";

import { IconTile } from "@/components/ui/IconTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { iconFor } from "@/lib/icons";
import { usePortfolio } from "@/lib/portfolio-context";

export function SkillsSection() {
  const { skills } = usePortfolio();
  if (skills.length === 0) return null;

  return (
    <section id="skills" aria-labelledby="skills-title" className="px-6 py-20 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="skills-title"
          title="Skills & tools"
          intro="The tools behind the agents, the data pipelines and the apps around them."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <li key={group.id} className="flex gap-4 rounded-2xl border border-white/10 bg-panel/85 p-5">
              <IconTile icon={iconFor(group.icon)} />
              <div className="min-w-0">
                <h3 className="font-semibold text-white">{group.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">{group.items.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
