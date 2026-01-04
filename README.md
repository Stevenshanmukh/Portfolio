# 🎓 Steven Lagadapati - Data Science Portfolio

A modern, production-ready portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 **Modern & Professional Design** - Clean, minimal aesthetic inspired by top-tier tech portfolios
- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Smooth Animations** - Tasteful animations using Framer Motion
- 🎯 **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- ♿ **Accessible** - ARIA best practices and keyboard navigation
- 📝 **Easy Content Management** - Centralized data configuration
- 🚀 **Production Ready** - Optimized for deployment on Vercel

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme Management:** [next-themes](https://github.com/pacocoursey/next-themes)

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with SEO metadata
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles & Tailwind config
├── components/
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx          # Navigation bar with mobile menu
│   │   └── Footer.tsx          # Footer with social links
│   ├── sections/               # Page sections
│   │   ├── HeroSection.tsx     # Hero/landing section
│   │   ├── AboutSection.tsx    # About me & education
│   │   ├── SkillsSection.tsx   # Technical skills
│   │   ├── ProjectsSection.tsx # Featured projects with filtering
│   │   └── ContactSection.tsx  # Contact form & social links
│   ├── providers/              # Context providers
│   │   └── ThemeProvider.tsx   # Dark mode provider
│   └── ui/                     # Reusable UI components
│       ├── ThemeToggle.tsx     # Dark/light mode toggle
│       ├── PageTransition.tsx  # Page loading animation
│       └── ScrollReveal.tsx    # Scroll-triggered animations
├── data/
│   └── portfolio.ts            # ⭐ Centralized content configuration
├── lib/
│   └── types.ts                # TypeScript type definitions
└── public/
    └── images/                 # Static images (add your photos here)
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customizing Content

All content is managed through a single file: **`data/portfolio.ts`**

### Update Personal Information

```typescript
export const personalInfo = {
  name: "Your Name",
  role: "Your Role",
  tagline: "Your Tagline",
  description: "Your description...",
  email: "your.email@example.com",
  // ... update all fields
};
```

### Add/Edit Projects

```typescript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Short description...",
    longDescription: "Detailed description...",
    category: "Machine Learning", // or "Data Science", "Web Dev", "Research"
    tags: ["Python", "TensorFlow", "..."],
    image: "/images/projects/project.jpg",
    github: "https://github.com/username/repo",
    demo: "https://demo-url.com",
    featured: true, // Shows badge on card
  },
  // Add more projects...
];
```

### Update Skills

```typescript
export const skills = {
  "Category Name": {
    icon: "IconName", // Code, Brain, Database, BarChart3
    description: "Category description...",
    items: ["Skill 1", "Skill 2", "..."],
  },
  // Add more categories...
};
```

### Update Education

```typescript
export const education = [
  {
    institution: "University Name",
    degree: "Degree Name",
    period: "2022 - 2024",
    status: "Graduating Soon",
    description: "Description...",
    skills: ["Skill 1", "Skill 2"],
  },
];
```

### Update Social Links

```typescript
export const socialLinks = {
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  email: "your.email@example.com",
};
```

## 🖼️ Adding Images

### Profile Photo

1. Add your photo to: `public/images/profile.jpg`
2. The components will automatically use it

### Project Images

1. Add project images to: `public/images/projects/`
2. Update the `image` field in `data/portfolio.ts`:

```typescript
image: "/images/projects/your-project.jpg"
```

### Resume PDF

1. Add your resume to: `public/resume.pdf`
2. Update in `data/portfolio.ts`:

```typescript
resume: "/resume.pdf"
```

## 🎨 Customizing Design

### Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --primary: 199 89% 48%; /* Blue color (HSL) */
  /* ... other colors */
}
```

### Fonts

Edit `app/layout.tsx` to change fonts:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  subsets: ["latin"],
  variable: "--font-your-font",
});
```

### Animations

Adjust animation settings in component files using Framer Motion properties:

```typescript
transition={{ duration: 0.6, delay: 0.2 }}
```

## 🌐 Deployment on Vercel

### Method 1: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables (Optional)

If you add any API integrations, set environment variables:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add your variables
4. Redeploy

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm run start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 SEO Configuration

Update SEO metadata in `data/portfolio.ts`:

```typescript
export const siteMetadata = {
  title: "Your Name | Portfolio",
  description: "Your description...",
  url: "https://your-domain.com",
  image: "/images/og-image.jpg", // Add a 1200x630 image
  keywords: ["keyword1", "keyword2", "..."],
};
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
npm run dev -- -p 3001
```

### Type Errors

```bash
# Regenerate types
npm run build
```

### Styling Issues

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Vercel Deployment](https://vercel.com/docs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Support

If you have questions or need help:

1. Check the documentation above
2. Review the code comments
3. Open an issue on GitHub

---

**Built with ❤️ by Steven Lagadapati**

*Powered by React, Next.js, and Tailwind CSS*
