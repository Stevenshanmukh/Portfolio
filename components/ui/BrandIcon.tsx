import type { SimpleIcon } from "simple-icons";

/** A single-colour brand mark from simple-icons, drawn in currentColor. */
export function BrandIcon({ icon, className = "" }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={icon.path} />
    </svg>
  );
}
