"use client";

import { Award } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-context";

/** Education and certifications, shown after the work history. */
export function Credentials() {
  const { education, certifications } = usePortfolio();
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <div className="mt-20 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2">
      {education.length > 0 && (
        <div>
          <h3 className="mb-5 text-sm font-medium text-neutral-400">Education</h3>
          <ul className="space-y-6">
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
                {edu.skills.length > 0 && (
                  <p className="mt-2 text-sm text-neutral-400">{edu.skills.join(", ")}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h3 className="mb-5 text-sm font-medium text-neutral-400">Certifications &amp; awards</h3>
          <ul className="space-y-3">
            {certifications.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-neutral-300">
                <Award aria-hidden="true" className="mt-1 size-4 shrink-0 text-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
