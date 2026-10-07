import type { LucideIcon } from "lucide-react";

const SIZES = {
  sm: "size-10 rounded-lg [&>svg]:size-[18px]",
  md: "size-12 rounded-xl [&>svg]:size-5",
  lg: "size-14 rounded-2xl [&>svg]:size-6",
} as const;

/** A square tile holding one icon. Used by project tiles, skills and principles. */
export function IconTile({
  icon: Icon,
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center border border-white/10 bg-white/[0.04] text-neutral-100 ${SIZES[size]} ${className}`}
    >
      <Icon strokeWidth={1.6} />
    </span>
  );
}
