import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { PortfolioPageData, Project } from "@/lib/types";

/** Social share cards (Open Graph / Twitter), rendered from Sanity content. */

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#09090a";
const PANEL = "#111113";
const WHITE = "#fafafa";
const GREY = "#a3a3a3";
const DIM = "#737373";

async function fonts() {
  const dir = join(process.cwd(), "assets", "fonts");
  const [inter400, inter600, lora600] = await Promise.all([
    readFile(join(dir, "inter-latin-400.woff")),
    readFile(join(dir, "inter-latin-600.woff")),
    readFile(join(dir, "lora-latin-600.woff")),
  ]);
  return [
    { name: "Inter", data: inter400, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: inter600, weight: 600 as const, style: "normal" as const },
    { name: "Lora", data: lora600, weight: 600 as const, style: "normal" as const },
  ];
}

/** Sanity URLs ask for automatic formats; the card renderer needs a plain JPEG. */
const asJpeg = (url: string) => url.replace("auto=format", "fm=jpg");

const host = (url: string) => url.replace(/^https?:\/\//, "");

/** Shorten to whole words. */
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:]+$/, "")}…`;
}

/** Fixed points for the faint star network (same on every render). */
const NODES = [
  [700, 70], [800, 150], [930, 60], [1060, 120], [1150, 40], [1130, 230], [1010, 300],
  [1160, 390], [1050, 480], [1150, 590], [960, 560], [850, 600], [760, 520], [690, 420],
  [640, 250], [880, 300],
];
const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [5, 7], [7, 8], [8, 9], [8, 10],
  [10, 11], [11, 12], [12, 13], [13, 14], [14, 0], [1, 15], [15, 6], [6, 8], [13, 15],
];

function Network() {
  return (
    <svg
      width={OG_SIZE.width}
      height={OG_SIZE.height}
      viewBox={`0 0 ${OG_SIZE.width} ${OG_SIZE.height}`}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke="rgba(250,250,250,0.10)"
          strokeWidth={1}
        />
      ))}
      {NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.2} fill="rgba(250,250,250,0.45)" />
      ))}
    </svg>
  );
}

/** One span per word so a two-colour sentence still wraps word by word. */
function words(text: string, color: string, prefix: string) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => (
      <span key={`${prefix}${i}`} style={{ color, marginRight: 13 }}>
        {word}
      </span>
    ));
}

function Monogram({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 52,
        height: 52,
        borderRadius: 14,
        background: PANEL,
        border: "1px solid #2a2a2e",
        color: WHITE,
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: "-0.05em",
      }}
    >
      {initials}
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        background: INK,
        fontFamily: "Inter",
        color: WHITE,
      }}
    >
      <Network />
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 24,
          right: 24,
          bottom: 24,
          borderRadius: 28,
          border: "1px solid rgba(250,250,250,0.10)",
        }}
      />
      {children}
    </div>
  );
}

/** Card for the home page (and anything without its own card). */
export async function homeCard(data: PortfolioPageData) {
  const { personalInfo, siteMetadata } = data;

  // An image uploaded in Studio (Site settings > Social share image) wins.
  if (siteMetadata.image) {
    return new ImageResponse(
      (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asJpeg(siteMetadata.image)} width={1200} height={630} alt="" style={{ objectFit: "cover" }} />
      ),
      OG_SIZE
    );
  }

  const match = (personalInfo.headline || personalInfo.role).match(/^(.+?[.!?])\s+(.+)$/);
  const [lead, rest] = match ? [match[1], match[2]] : [personalInfo.headline || personalInfo.role, ""];

  return new ImageResponse(
    (
      <Frame>
        <div style={{ display: "flex", width: "100%", padding: "72px 80px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", width: 660, height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Monogram name={personalInfo.name} />
              <span style={{ marginLeft: 18, fontSize: 22, color: GREY }}>{host(siteMetadata.url)}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: 660,
                marginTop: 40,
                fontSize: 50,
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              {[...words(lead, WHITE, "l"), ...words(rest, GREY, "r")]}
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
              <span style={{ fontSize: 30, fontWeight: 600 }}>{personalInfo.name}</span>
              <span style={{ marginTop: 6, fontSize: 24, color: GREY }}>{personalInfo.role}</span>
            </div>
          </div>

          {personalInfo.image && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "auto",
                width: 360,
                height: 360,
                borderRadius: 999,
                border: "1px solid rgba(250,250,250,0.12)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 312,
                  height: 312,
                  borderRadius: 999,
                  border: `6px solid ${PANEL}`,
                  boxShadow: "0 0 0 1px rgba(250,250,250,0.3)",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asJpeg(personalInfo.image)} width={300} height={300} alt="" style={{ objectFit: "cover" }} />
              </div>
            </div>
          )}
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts: await fonts() }
  );
}

/** Card for one project page. */
export async function projectCard(data: PortfolioPageData, project: Project) {
  const { personalInfo, siteMetadata } = data;
  const description = clip(project.description, project.artifact ? 140 : 190);
  const meta = [project.categories[0], project.context ? "Client work" : ""].filter(Boolean).join(" · ");

  return new ImageResponse(
    (
      <Frame>
        <div style={{ display: "flex", width: "100%", padding: "72px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", width: project.artifact ? 600 : 960 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Monogram name={personalInfo.name} />
              <span style={{ marginLeft: 18, fontSize: 22, color: GREY }}>
                {personalInfo.name} · Projects
              </span>
            </div>
            <span
              style={{
                marginTop: 40,
                fontFamily: "Lora",
                fontSize: 62,
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </span>
            {meta && <span style={{ marginTop: 14, fontSize: 22, color: DIM }}>{meta}</span>}
            <span style={{ marginTop: 22, fontSize: 26, lineHeight: 1.45, color: "#d4d4d4" }}>{description}</span>
            <div style={{ display: "flex", marginTop: "auto", alignItems: "center" }}>
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    marginRight: 10,
                    padding: "6px 14px",
                    borderRadius: 10,
                    border: "1px solid rgba(250,250,250,0.15)",
                    fontSize: 19,
                    color: "#d4d4d4",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span style={{ marginTop: 18, fontSize: 19, color: DIM }}>
              {host(siteMetadata.url)}/projects/{project.slug}
            </span>
          </div>

          {project.artifact && (
            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                alignSelf: "center",
                width: 400,
                height: 300,
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(250,250,250,0.15)",
                background: WHITE,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asJpeg(project.artifact.url)}
                width={400}
                height={Math.round((400 * project.artifact.height) / project.artifact.width)}
                alt=""
                style={{ objectFit: "cover", objectPosition: "left top" }}
              />
            </div>
          )}
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts: await fonts() }
  );
}
