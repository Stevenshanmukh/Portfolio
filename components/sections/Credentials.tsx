"use client";

import { Award, GraduationCap } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { usePortfolio } from "@/lib/portfolio-context";

/** Education and certifications, shown after the work history. */
export function Credentials() {
  const { education, certifications } = usePortfolio();
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {education.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-panel/85 p-6">
          <div className="flex items-center gap-3">
            <IconTile icon={GraduationCap} size="sm" />
            <h3 className="font-semibold text-white">Education</h3>
          </div>
          <ul className="mt-5 space-y-5">
            {education.map((edu) => (
              <li key={edu.id}>
                <p className="font-medium text-white">{edu.institution}</p>
                <p className="text-neutral-300">{edu.degree}</p>
                {(edu.period || edu.status) && (
                  <p className="mt-1 font-mono text-[13px] tabular-nums text-neutral-400">
                    {[edu.period, edu.status].filter(Boolean).join(" · ")}
                  </p>
                )}
                {edu.description && (
                  <p className="mt-2 max-w-[62ch] leading-relaxed text-neutral-300">{edu.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-panel/85 p-6">
          <div className="flex items-center gap-3">
            <IconTile icon={Award} size="sm" />
            <h3 className="font-semibold text-white">Certifications &amp; awards</h3>
          </div>
          <ul className="mt-5 space-y-3">
            {certifications.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-neutral-300">
                <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
