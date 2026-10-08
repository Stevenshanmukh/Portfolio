# Steven Lagadapati Portfolio

A portfolio website built with Next.js 16 and Tailwind CSS 4. All content is managed in [Sanity](https://www.sanity.io) (headless CMS); the website itself has no backend, database, or login.

## Features

- **Modern Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (Framer Motion)
- **Headless CMS**: Sanity Studio to edit everything on the site, including images and the resume PDF
- **SEO Optimized**: Dynamic metadata, JSON-LD structured data, Open Graph tags
- **ISR**: Incremental Static Regeneration - published edits appear within ~60 seconds
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth page transitions and scroll animations

---

## How it fits together

```
Sanity Studio (studio/, hosted on *.sanity.studio)
        │  publish
        ▼
Sanity Content Lake  (project pnwv3t0x, public dataset "production")
        │  one GROQ query, no token (lib/sanity/)
        ▼
Next.js site on Vercel  (page regenerates at most every 60s)
```

- The Sanity project runs on the **Free plan**. Only free features are used: a public dataset, no webhooks, no paid Studio features.
- Only published content is shown. Drafts never reach the site.
- Editing requires being a member of the Sanity project. Sanity handles login.

---

## Quick Start

### 1. Website

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are needed: the Sanity project ID and dataset are built in (see `.env.example` to override them).

### 2. Studio (content editor)

```bash
cd studio
npm install
npx sanity login     # once, opens the browser
npm run dev
```

Open http://localhost:3333. If Studio says the origin isn't allowed, add `http://localhost:3333` (with credentials) under **API → CORS origins** at [sanity.io/manage](https://www.sanity.io/manage/project/pnwv3t0x).

From the project root, `npm run studio` does the same as `npm run dev` inside `studio/`.

---

## Editing content

Studio sidebar:

| Item | What it controls |
|------|------------------|
| **Profile** | Hero tab: name, role, headline, intro, availability, proof numbers, the run-trace steps. About tab: tagline, bio, the four guardrails (with icons), photo, certifications. Contact tab: email, location, resume PDF, GitHub and LinkedIn |
| **Site settings** | Page title, meta description, site URL, social share image, SEO keywords |
| **Experience** | Jobs: role, company (and link), period, location, systems built (shown as bullets) or highlights, tags |
| **Projects** | Title, page URL, icon, description, long description, categories, tags, GitHub/demo links. Tick **Case study** to feature it on the home page with a screenshot or an Acts on / Guardrail / Result summary |
| **Project categories** | How the /projects page groups projects, in this order |
| **Skills** | Skill groups with an icon and their skills |
| **Education** | Institution, degree, period, status, description |

Every project gets its own page at `/projects/<page URL>`, and `/projects` lists them all.

- **Order:** drag items in Experience, Projects, Project categories, Skills and Education; the site uses the same order.
- **Publishing:** click **Publish**. The live site picks the change up within about a minute (the first visit after that triggers the refresh).
- **Images:** set the hotspot on photos so the crop keeps the important part.
- **Resume:** the Resume buttons only appear once a PDF is uploaded.
- **Link previews:** the share cards (LinkedIn, Slack, X…) are generated from your content: the home card uses the headline and photo, each project card its title, description, tags and screenshot. They refresh within an hour of publishing. To use your own home card instead, upload a 1200×630 image under Site settings → Social share image.

### Backups

The Free plan keeps only 3 days of document history. Export the dataset now and then:

```bash
cd studio
npx sanity dataset export production backup.tar.gz
```

### Seeding a fresh dataset

`studio/seed/` holds the original content. In `studio/`:

- `npm run seed` creates any missing documents and never overwrites existing ones.
- `npm run seed -- -- --replace` overwrites them.
- `npm run seed -- -- --resume=C:\path\to\resume.pdf` also uploads a resume, and `--photo=<path>` a profile photo. Files are passed by path so they never land in this public repo.
- `npm run seed -- -- --assets=<folder>` uploads the case-study screenshots named in `seed/data.ts`.

---

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Home page: sections, metadata, JSON-LD
│   ├── projects/             # /projects and /projects/[slug]
│   ├── sitemap.ts            # Generated from Sanity
│   ├── opengraph-image.tsx   # Share cards (also twitter-image, and per project), drawn by lib/og.tsx
│   ├── icon.png, apple-icon.png, favicon.ico
│   ├── layout.tsx            # Root layout, fonts
│   └── globals.css           # Tokens and the motion (run trace, timeline, orbit)
├── components/
│   ├── hero/                 # Avatar, AgentRun (run trace + data network), NeuralField canvas
│   ├── layout/               # SiteShell, Navbar, Footer
│   ├── projects/             # Featured card, project tile, visuals, links
│   ├── sections/             # Hero, About, Experience, Projects, Skills, Contact
│   └── ui/                   # IconTile, BrandIcon, SectionHeading
├── lib/
│   ├── sanity/
│   │   ├── client.ts         # Sanity client + image URL helper
│   │   ├── queries.ts        # The GROQ query
│   │   ├── portfolio.ts      # Fetch + map to PortfolioPageData
│   │   └── sanity.types.ts   # Generated by `npm run typegen`
│   ├── og.tsx                # Share card layouts (fonts in assets/fonts)
│   ├── icons.ts              # Icon names content can use (match studio/schemaTypes/icons.ts)
│   ├── platforms.ts          # Brand logos under the run trace
│   ├── portfolio-context.tsx # React context for section components
│   ├── structured-data.ts    # JSON-LD generators
│   └── types.ts              # Content types used by the site
└── studio/                   # Sanity Studio (separate app, own package.json)
    ├── schemaTypes/          # Content model
    ├── structure.ts          # Studio sidebar
    ├── seed/                 # Initial content + seed script
    ├── sanity.config.ts
    └── sanity.cli.ts         # Project ID, deployment, TypeGen settings
```

---

## Changing the content model

1. Edit the schema in `studio/schemaTypes/`.
2. Update the query in `lib/sanity/queries.ts` and the mapping in `lib/sanity/portfolio.ts`.
3. Regenerate the types: `npm run typegen` (from the root). Commit `lib/sanity/sanity.types.ts`.
4. Redeploy the Studio: `cd studio && npm run deploy`.

### Adding a skill icon

Icons are [lucide-react](https://lucide.dev/icons) names, listed in two places:

- `studio/schemaTypes/skillCategory.ts` (`ICONS`, the Studio dropdown)
- `components/sections/SkillsSection.tsx` (`iconMap`, the import)

---

## Deployment

- **Website:** Vercel deploys `main` automatically. It needs no environment variables, and Node 22 or newer.
- **Studio:** `cd studio && npm run deploy` publishes it to `https://<hostname>.sanity.studio` (free).

The build fetches content from Sanity. If Sanity is unreachable, or the **Profile** and **Site settings** documents aren't published, the build fails instead of shipping an empty site. On the live site, a failed refresh keeps serving the last good page.

---

## Troubleshooting

- **Build fails with "publish the 'Profile' and 'Site settings' documents":** open both in Studio and click Publish.
- **Changes not appearing:** wait about a minute, then reload twice. Check that the change was published, not just saved as a draft.
- **An image doesn't show:** only images uploaded to Sanity are allowed (`next.config.ts` permits `cdn.sanity.io` for this project only).
- **A skill has no icon:** the icon name must be in both lists above.

---

## Scripts

```bash
npm run dev       # Website dev server (localhost:3000)
npm run build     # Production build
npm run start     # Serve the production build
npm run lint      # ESLint
npm run studio    # Studio dev server (localhost:3333)
npm run typegen   # Regenerate lib/sanity/sanity.types.ts from the schema + query
```

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **UI**: React 19, Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **CMS**: Sanity (Studio v6, `@sanity/client`, GROQ)
- **Deployment**: Vercel (website), sanity.studio (Studio)

---

## License

MIT License - feel free to use this as a template for your own portfolio.
