import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Section title, optional intro, and an optional "view all" style link on the right. */
export function SectionHeading({
  id,
  title,
  intro,
  action,
  as: Tag = "h2",
}: {
  id: string;
  title: string;
  intro?: string;
  action?: { href: string; label: string };
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <div>
        <Tag
          id={id}
          className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
        >
          {title}
        </Tag>
        {intro && <p className="mt-3 max-w-[58ch] leading-relaxed text-neutral-300">{intro}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex min-h-9 shrink-0 items-center gap-1.5 text-sm font-medium text-neutral-200 transition-colors hover:text-white"
        >
          {action.label}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
