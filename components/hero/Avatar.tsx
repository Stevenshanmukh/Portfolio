import Image from "next/image";

const SIZES = {
  sm: { box: "size-20", px: 80 },
  lg: { box: "size-52", px: 208 },
} as const;

/**
 * The portrait in a circle, with a fine ring and a slow dashed orbit around it,
 * and an optional status pill (large size only; small callers place their own).
 * The orbit is a `loop`, paused off-screen.
 */
export function Avatar({
  src,
  name,
  status,
  size = "lg",
}: {
  src: string;
  name: string;
  status?: string;
  size?: keyof typeof SIZES;
}) {
  const { box, px } = SIZES[size];
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-block">
      <span
        aria-hidden="true"
        className="orbit loop pointer-events-none absolute -inset-4 rounded-full border border-dashed border-white/15"
      />
      <div className={`relative overflow-hidden rounded-full border border-white/20 p-1 ${box}`}>
        {src ? (
          <Image
            src={src}
            alt={name}
            width={px}
            height={px}
            priority
            sizes={`${px}px`}
            className="size-full rounded-full object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center rounded-full bg-white/[0.04] font-serif text-3xl text-neutral-300">
            {initials}
          </span>
        )}
      </div>
      {status && (
        <p className="absolute -bottom-3 -left-10 z-30 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-panel/95 px-3 py-1.5 text-xs text-neutral-200">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-white" />
          {status}
        </p>
      )}
    </div>
  );
}
