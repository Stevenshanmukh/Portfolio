# Steven Lagadapati Portfolio

A modern, fully-editable portfolio website built with Next.js 16, Tailwind CSS 4, and Supabase. Features a complete admin panel to manage all content without touching code.

## Features

- **Modern Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (Framer Motion)
- **Full CMS**: Admin panel at `/admin` to edit everything on the site
- **Database**: Supabase for data storage and authentication
- **File Uploads**: Profile pictures, project screenshots, and resume PDFs via Supabase Storage
- **SEO Optimized**: Dynamic metadata, JSON-LD structured data, Open Graph tags
- **ISR**: Incremental Static Regeneration - site updates within 60 seconds of admin changes
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth page transitions and scroll animations

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** → **New Query**
4. Copy the entire contents of `supabase-schema.sql` and run it
5. This creates all tables, security policies, storage bucket, and seed data

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Revalidation secret (optional - for on-demand ISR)
NEXT_PUBLIC_REVALIDATION_SECRET=any-random-string
REVALIDATION_SECRET=same-random-string
```

**Where to find Supabase keys:**
- Go to your Supabase project → Settings → API
- Copy the **Project URL** and **anon/public** key

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## Admin Panel Guide

### Accessing Admin

1. Go to `/admin`
2. First time: Click "Create an account" and sign up with email/password
3. Supabase will send a confirmation email - click the link
4. Log in with your credentials

### What You Can Edit

| Section | What It Controls |
|---------|-----------------|
| **Personal Info** | Name, role, tagline, bio, email, location, availability, profile picture, resume PDF |
| **Social Links** | LinkedIn URL, GitHub URL, email address |
| **Education** | Add/remove education entries with institution, degree, period, status, description, skills |
| **Skills** | Add/remove skill categories with icon, description, and individual skills |
| **Projects** | Add/remove projects with title, descriptions, category, tags, image, GitHub/demo links, featured flag |
| **Site SEO** | Page title, meta description, site URL, OG image, SEO keywords |

### How Content Flows

```
Admin Panel → Supabase Database → Website (ISR every 60s)
                    ↓
              On "Save & Publish" → Instant revalidation
```

### Saving Changes

1. Make your edits in any tab
2. Click "Save & Publish" in the top right
3. Changes are saved to Supabase immediately
4. The live site updates within a few seconds (ISR revalidation)

---

## Project Structure

```
portfolio/
├── app/
│   ├── admin/page.tsx      # Admin panel (client component)
│   ├── api/revalidate/     # ISR revalidation endpoint
│   ├── page.tsx            # Home page (server component)
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── Footer.tsx      # Footer
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero/intro section
│   │   ├── AboutSection.tsx    # About + education
│   │   ├── SkillsSection.tsx   # Skills grid
│   │   ├── ProjectsSection.tsx # Projects with filters
│   │   └── ContactSection.tsx  # Contact info
│   └── ui/
│       ├── PageTransition.tsx  # Page animations
│       ├── stars.tsx           # Background stars
│       └── box-loader.tsx      # Loading animation
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser Supabase client
│   │   ├── server.ts       # Server Supabase client
│   │   ├── queries.ts      # Data fetching functions
│   │   └── types.ts        # Database types
│   ├── portfolio-context.tsx # React context for data
│   ├── structured-data.ts    # JSON-LD generators
│   └── types.ts              # TypeScript types
├── data/
│   └── portfolio.ts        # Fallback data (used if DB unavailable)
├── supabase-schema.sql     # Database setup script
└── .env.local              # Environment variables (create this)
```

---

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `personal_info` | Single row with personal details |
| `education` | Education entries (multiple rows) |
| `skill_categories` | Skill categories with items array |
| `projects` | Project entries with all metadata |
| `social_links` | Single row with social URLs |
| `site_metadata` | Single row with SEO settings |

### Storage

- Bucket: `portfolio`
- Used for: Profile images, project screenshots, resume PDFs
- Public read access, authenticated write

### Security (RLS)

- **Read**: Public (anyone can view the portfolio)
- **Write**: Authenticated users only (admin must be logged in)

---

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `REVALIDATION_SECRET`
   - `NEXT_PUBLIC_REVALIDATION_SECRET`
5. Click "Deploy"

### 3. Update Site URL

After deployment:
1. Copy your Vercel URL (e.g., `https://yourname.vercel.app`)
2. Go to Admin → Site SEO
3. Update the "Site URL" field
4. Save & Publish

### 4. Update Next.js Config (if needed)

If using a custom Supabase project, update `next.config.ts` to allow images from your Supabase storage:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "your-project.supabase.co",
      pathname: "/storage/v1/object/public/**",
    },
  ],
},
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `REVALIDATION_SECRET` | No | Secret for on-demand ISR (server-side) |
| `NEXT_PUBLIC_REVALIDATION_SECRET` | No | Same secret (client-side) |

---

## Customization

### Adding New Skill Icons

Edit `app/admin/page.tsx` and add to `ICON_OPTIONS`:

```typescript
const ICON_OPTIONS = ["Code", "Brain", "Database", "BarChart3", "Wrench", "NewIcon"];
```

Then add the icon import to `components/sections/SkillsSection.tsx`:

```typescript
import { Code, Brain, Database, BarChart3, Wrench, NewIcon } from "lucide-react";
const iconMap = { Code, Brain, Database, BarChart3, Wrench, NewIcon };
```

### Adding New Project Categories

Edit `app/admin/page.tsx`:

```typescript
const CATEGORY_OPTIONS = ["Machine Learning", "Data Science", "Web Dev", "Research", "New Category"];
```

And `components/sections/ProjectsSection.tsx`:

```typescript
const categories = ["All", "Machine Learning", "Data Science", "Web Dev", "Research", "New Category"];
```

### Changing Colors/Theme

Edit `app/globals.css` to modify the dark theme colors. The site uses Tailwind's neutral color palette.

---

## Troubleshooting

### "Failed to load data" in Admin

- Check that Supabase URL and keys are correct in `.env.local`
- Verify you ran the `supabase-schema.sql` script
- Check browser console for specific errors

### Images Not Loading

- Ensure the image URL is from an allowed domain in `next.config.ts`
- For Supabase storage, URLs should start with your project URL

### Changes Not Appearing

- Wait 60 seconds (ISR interval)
- Or check that `REVALIDATION_SECRET` is set correctly
- Hard refresh the page (Ctrl/Cmd + Shift + R)

### Auth Issues

- Confirm email when signing up
- Check Supabase Auth settings in dashboard
- Ensure RLS policies were created (check `supabase-schema.sql`)

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **UI**: React 19, Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Vercel

---

## License

MIT License - feel free to use this as a template for your own portfolio.
