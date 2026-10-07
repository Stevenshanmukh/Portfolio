"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { PLATFORMS } from "@/lib/platforms";

const LINE_HEIGHT = 56;
const PULSE_S = 0.7;

type Layout = { width: number; centers: number[] };

/** Cubic curve from the card's bottom centre down to one tile. */
function wire(width: number, x: number) {
  const mid = width / 2;
  return `M${mid} 0 C${mid} ${LINE_HEIGHT * 0.55}, ${x} ${LINE_HEIGHT * 0.4}, ${x} ${LINE_HEIGHT}`;
}

/**
 * The live systems an agent works on, wired to the run trace above. When
 * `animate` is set, data pulses travel up from every source during the read
 * step (`readAt`, ms) and one pulse travels down to the write target during the
 * write step (`writeAt`, ms). Uses SVG SMIL so each mount replays from zero.
 */
export function SourceNetwork({
  animate,
  readAt,
  writeAt,
}: {
  animate: boolean;
  readAt?: number;
  writeAt?: number;
}) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => {
      const box = row.getBoundingClientRect();
      const centers = [...row.children].map((tile) => {
        const r = tile.getBoundingClientRect();
        return r.left - box.left + r.width / 2;
      });
      setLayout({ width: box.width, centers });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  const writeIndex = PLATFORMS.findIndex((p) => p.writeTarget);

  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        className="block w-full overflow-visible"
        height={LINE_HEIGHT}
        viewBox={layout ? `0 0 ${layout.width} ${LINE_HEIGHT}` : undefined}
      >
        {layout && (
          <>
            <circle cx={layout.width / 2} cy={1} r={3} fill="#fafafa" />
            {layout.centers.map((x, i) => (
              <path
                key={i}
                d={wire(layout.width, x)}
                fill="none"
                stroke="rgba(250,250,250,0.22)"
                strokeDasharray="2 4"
                strokeWidth={1}
              />
            ))}
            {animate &&
              readAt !== undefined &&
              layout.centers.slice(0, PLATFORMS.length).map((x, i) => (
                <circle key={`in-${i}`} r={2.4} fill="#fafafa" opacity={0}>
                  <animateMotion
                    begin={`${(readAt + i * 70) / 1000}s`}
                    dur={`${PULSE_S}s`}
                    fill="freeze"
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="linear"
                    path={wire(layout.width, x)}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    begin={`${(readAt + i * 70) / 1000}s`}
                    dur={`${PULSE_S}s`}
                    fill="freeze"
                  />
                </circle>
              ))}
            {animate && writeAt !== undefined && writeIndex >= 0 && (
              <circle r={2.8} fill="#fafafa" opacity={0}>
                <animateMotion
                  begin={`${writeAt / 1000}s`}
                  dur={`${PULSE_S}s`}
                  fill="freeze"
                  path={wire(layout.width, layout.centers[writeIndex])}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  begin={`${writeAt / 1000}s`}
                  dur={`${PULSE_S}s`}
                  fill="freeze"
                />
              </circle>
            )}
          </>
        )}
      </svg>

      <ul ref={rowRef} className="grid grid-cols-6 gap-2" aria-label="Systems the agents work with">
        {PLATFORMS.map((platform, i) => (
          <li
            key={platform.name}
            title={platform.name}
            className="relative flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-panel text-neutral-200"
          >
            <BrandIcon icon={platform.icon} className="size-5" />
            <span className="sr-only">{platform.name}</span>
            {animate && i === writeIndex && writeAt !== undefined && (
              <span
                aria-hidden="true"
                className="net-hit pointer-events-none absolute inset-0 rounded-xl border border-white/80"
                style={{ animationDelay: `${writeAt + PULSE_S * 1000 - 80}ms` }}
              />
            )}
          </li>
        ))}
        <li
          title="And more"
          className="flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-panel text-neutral-400"
        >
          <Ellipsis aria-hidden="true" className="size-5" />
          <span className="sr-only">and more</span>
        </li>
      </ul>
    </div>
  );
}
