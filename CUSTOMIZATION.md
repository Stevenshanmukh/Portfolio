# 🎨 Customization Guide

A comprehensive guide to customize every aspect of your portfolio.

## 🎨 Design Customization

### Colors

The portfolio uses a blue-cyan color scheme. To customize:

#### Method 1: Using Built-in Colors

Open any component and change Tailwind classes:

```tsx
// Change from blue to purple
className="bg-blue-500" → className="bg-purple-500"
className="text-blue-600" → className="text-purple-600"

// Available colors:
// slate, gray, zinc, neutral, stone, red, orange, amber, yellow,
// lime, green, emerald, teal, cyan, sky, blue, indigo, violet,
// purple, fuchsia, pink, rose
```

#### Method 2: Global Search & Replace

Use your editor's find-and-replace to change all instances:
- Find: `blue-500` → Replace: `purple-500`
- Find: `cyan-500` → Replace: `pink-500`

### Fonts

Current font: **Inter**

To change:

1. Browse [Google Fonts](https://fonts.google.com/)
2. Edit `app/layout.tsx`:

```typescript
// Replace this:
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// With your font:
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
```

### Animations

Adjust animation settings in any component:

```tsx
// Slower animation
transition={{ duration: 1.2, delay: 0.3 }}

// Faster animation
transition={{ duration: 0.3, delay: 0.1 }}

// No delay
transition={{ duration: 0.6 }}

// Different easing
transition={{ duration: 0.6, ease: "easeInOut" }}
```

Common easing options: `"linear"`, `"easeIn"`, `"easeOut"`, `"easeInOut"`

### Dark Mode Default

Edit `app/layout.tsx`:

```tsx
// Default to dark mode
<ThemeProvider defaultTheme="dark" ... >

// Default to light mode
<ThemeProvider defaultTheme="light" ... >

// Follow system preference (current)
<ThemeProvider defaultTheme="system" ... >
```

## 📝 Content Customization

### Hero Section

Edit `data/portfolio.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  role: "Your Role", // Shows in gradient text
  tagline: "Your Tagline",
  description: "Your elevator pitch (2-3 sentences)",
  availability: "Your status", // e.g., "Available for Hire"
};
```

To modify the hero layout, edit `components/sections/HeroSection.tsx`.

### About Section

```typescript
export const education = [
  {
    institution: "Your University",
    degree: "Your Degree",
    period: "Start - End",
    status: "Current Status", // e.g., "Graduating Soon", "Completed"
    description: "Description of your program",
    skills: ["Key", "Skills", "Learned"],
  },
];
```

### Skills Section

Add or modify skill categories:

```typescript
export const skills = {
  "Your Category Name": {
    icon: "Code", // Options: Code, Brain, Database, BarChart3, Wrench
    description: "Brief description",
    items: ["Skill 1", "Skill 2", "Skill 3", ...],
  },
  "Another Category": {
    icon: "Brain",
    description: "Another description",
    items: ["Tool A", "Tool B", "Tool C"],
  },
};
```

### Projects Section

#### Adding a Project

```typescript
{
  id: 7, // Always increment from last
  title: "Project Title",
  description: "Card description (keep concise)",
  longDescription: "Full description for future modal/detail page",
  category: "Machine Learning", // Must be one of: "Machine Learning", "Data Science", "Web Dev", "Research"
  tags: ["Tech", "Stack", "Here"],
  image: "/images/projects/project.jpg",
  github: "https://github.com/user/repo", // or null
  demo: "https://demo.com", // or null
  featured: true, // Shows "Featured" badge
}
```

#### Project Categories

The filter buttons use these exact strings:
- `"Machine Learning"`
- `"Data Science"`
- `"Web Dev"`
- `"Research"`

To add a new category, edit:
1. `lib/types.ts` - Add to the Project type
2. `components/sections/ProjectsSection.tsx` - Add to categories array

### Contact Section

Update in `data/portfolio.ts`:

```typescript
export const personalInfo = {
  email: "your.email@example.com",
  location: "Your City, Country",
};

export const socialLinks = {
  linkedin: "https://linkedin.com/in/profile",
  github: "https://github.com/username",
  email: "your.email@example.com",
};
```

## 🖼️ Images

### Profile Photo

- Path: `public/images/profile.jpg`
- Recommended: 800x1000px (4:5 ratio)
- Format: JPG or PNG
- Size: Under 300KB

**Optimization tip:** Use [TinyPNG](https://tinypng.com/) to compress.

### Project Images

- Path: `public/images/projects/your-project.jpg`
- Recommended: 1200x800px (3:2 ratio)
- Format: JPG or PNG
- Size: Under 500KB each

**Placeholder:** If you don't have project images yet, the site shows nice placeholders.

### Open Graph Image (for social sharing)

- Path: `public/images/og-image.jpg`
- Size: 1200x630px
- This appears when sharing your site on social media

### Resume

- Path: `public/resume.pdf`
- Keep file size under 2MB
- Ensure it's your latest version

## 🎯 SEO Customization

Edit `data/portfolio.ts`:

```typescript
export const siteMetadata = {
  title: "Your Name | Title",
  description: "Your SEO-friendly description (150-160 chars)",
  url: "https://your-domain.com", // Update after deployment
  image: "/images/og-image.jpg",
  keywords: [
    "Data Science",
    "Your Name",
    "Machine Learning",
    "Your University",
    // Add more relevant keywords
  ],
};
```

## 🔧 Layout Customization

### Navbar

Edit `components/layout/Navbar.tsx`:

```tsx
// Add/remove navigation items
const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "#blog" }, // Add new item
];
```

### Footer

Edit `components/layout/Footer.tsx`:

```tsx
// Modify footer text
<span>© {new Date().getFullYear()} Your Name. All rights reserved.</span>
```

## 🎬 Animation Customization

### Disable Animations

If you prefer a simpler look without animations:

1. **Hero Section:** Edit `components/sections/HeroSection.tsx`
   - Remove `motion.div` and replace with `div`
   - Remove all `initial`, `animate`, `transition` props

2. **Global:** Or keep animations but reduce them:
   ```tsx
   transition={{ duration: 0.3 }} // Make all animations faster
   ```

### Add More Animations

Use Framer Motion variants:

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Hover me!
</motion.div>
```

## 🌐 Adding New Sections

1. Create component in `components/sections/NewSection.tsx`
2. Import and add to `app/page.tsx`:

```tsx
import { NewSection } from "@/components/sections/NewSection";

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <NewSection /> {/* Your new section */}
        <SkillsSection />
        ...
      </main>
      <Footer />
    </PageTransition>
  );
}
```

3. Add to navbar if needed

## 🎨 Advanced: Custom Components

### Creating Reusable Components

Create in `components/ui/`:

```tsx
// components/ui/Button.tsx
export function Button({ children, ...props }) {
  return (
    <button
      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg"
      {...props}
    >
      {children}
    </button>
  );
}
```

Use anywhere:

```tsx
import { Button } from "@/components/ui/Button";

<Button onClick={handleClick}>Click me</Button>
```

## 💡 Tips

1. **Keep it Simple:** Don't overcomplicate the design
2. **Mobile First:** Always test on mobile devices
3. **Consistency:** Use the same colors and fonts throughout
4. **Performance:** Optimize images before uploading
5. **Accessibility:** Keep good color contrast

## 🔍 Finding Colors That Work

Great color palette generators:
- [Coolors.co](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)

## 📱 Testing

Always test your changes:
```bash
npm run dev
```

Then check:
- Desktop view
- Tablet view (use browser dev tools)
- Mobile view
- Dark mode
- All links work
- All buttons work

---

**Questions?** Check the [README.md](./README.md) or [UPDATING.md](./UPDATING.md) for more details!


