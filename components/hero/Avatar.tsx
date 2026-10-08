"use client";

import { useId } from "react";
import Image from "next/image";

const SIZES = {
  md: { px: 168, font: 11.5 },
  lg: { px: 300, font: 13.5 },
} as const;

// The status arc runs over the top of the portrait, between these angles
// (degrees, SVG convention: 0 = right, 90 = down, 270 = up).
const ARC_FROM = 212;
const ARC_TO = 328;
const BAND = 26; // thickness of the arc badge

function point(c: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: c + r * Math.cos(rad), y: c + r * Math.sin(rad) };
}

/**
 * The portrait in a circle, framed by faint rings (the outer one slowly
 * orbits, paused off-screen). With `status`, the text runs along an arc badge
 * over the top of the photo. Nothing overlaps the face.
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
  const { px, font } = SIZES[size];
  const arcId = `arc-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // SVG canvas around the photo, with room for the arc badge.
  const pad = BAND + 18;
  const box = px + pad * 2;
  const c = box / 2;
  const r = px / 2 + BAND / 2 + 8;
  const start = point(c, r, ARC_FROM);
  const end = point(c, r, ARC_TO);
  const arc = `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
  const dot = point(c, r, ARC_FROM + 11);

  return (
    <div className="relative" style={{ width: px, height: px }}>
      {/* Rings */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-full border border-white/10" />
      <span
        aria-hidden="true"
        className="orbit loop pointer-events-none absolute -inset-10 rounded-full border border-dashed border-white/[0.08]"
      />

      {/* Photo */}
      <div className="relative size-full overflow-hidden rounded-full border-[5px] border-panel ring-1 ring-white/25">
        {src ? (
          <Image
            src={src}
            alt={name}
            width={px}
            height={px}
            priority
            sizes={`${px}px`}
            className="size-full object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center bg-white/[0.04] font-serif text-4xl text-neutral-300">
            {initials}
          </span>
        )}
      </div>

      {/* Status arc */}
      {status && (
        <>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute overflow-visible"
            style={{ left: -pad, top: -pad, width: box, height: box }}
            viewBox={`0 0 ${box} ${box}`}
          >
            <defs>
              <path id={arcId} d={arc} />
              <filter id={`${arcId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Band: a light outline with a dark fill, softly glowing. */}
            <use
              href={`#${arcId}`}
              fill="none"
              stroke="rgba(250,250,250,0.75)"
              strokeWidth={BAND + 2}
              strokeLinecap="round"
              filter={`url(#${arcId}-glow)`}
            />
            <use href={`#${arcId}`} fill="none" stroke="#111113" strokeWidth={BAND - 1} strokeLinecap="round" />
            {[ARC_FROM - 2, ARC_TO + 2].map((deg) => {
              const p = point(c, r - BAND / 2 - 2, deg);
              return <circle key={deg} cx={p.x} cy={p.y} r={3} fill="#fafafa" />;
            })}
            <circle cx={dot.x} cy={dot.y} r={4} fill="#fafafa" />
            <text
              fill="#fafafa"
              fontSize={font}
              fontWeight={500}
              letterSpacing="0.04em"
              dominantBaseline="central"
            >
              <textPath href={`#${arcId}`} startOffset="54%" textAnchor="middle">
                {status}
              </textPath>
            </text>
          </svg>
          <span className="sr-only">{status}</span>
        </>
      )}
    </div>
  );
}
