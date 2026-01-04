# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

## ✅ Prerequisites

- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 First Steps - Customize Your Portfolio

### Step 1: Update Your Information (2 minutes)

Open `data/portfolio.ts` and update:

```typescript
export const personalInfo = {
  name: "Your Name",              // ← Change this
  email: "your.email@example.com", // ← Change this
  // ... update all other fields
};
```

### Step 2: Update Social Links (1 minute)

```typescript
export const socialLinks = {
  linkedin: "https://linkedin.com/in/yourprofile", // ← Your LinkedIn
  github: "https://github.com/yourusername",       // ← Your GitHub
  email: "your.email@example.com",                // ← Your email
};
```

### Step 3: Add Your Photos (Optional)

1. **Profile Photo:** Add to `public/images/profile.jpg`
2. **Project Images:** Add to `public/images/projects/`
3. **Resume:** Add to `public/resume.pdf`

### Step 4: Customize Projects (5 minutes)

In `data/portfolio.ts`, edit the `projects` array:

```typescript
export const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Brief description...",
    category: "Machine Learning", // or "Data Science", "Web Dev", "Research"
    tags: ["Python", "TensorFlow"],
    github: "https://github.com/username/repo",
    demo: "https://demo-url.com",
    featured: true,
  },
  // Add more projects...
];
```

## 🎨 Customization Tips

### Change Colors

Edit `app/globals.css` - search for color values and replace with your preferred colors.

### Change Fonts

Edit `app/layout.tsx` - import a different Google Font.

### Add New Sections

Create a new component in `components/sections/` and add it to `app/page.tsx`.

## 🚀 Deploy to Vercel (1-Click)

### Option 1: GitHub + Vercel (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy" ✅

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

## 📝 Next Steps

- [ ] Replace all placeholder text in `data/portfolio.ts`
- [ ] Add your profile photo
- [ ] Add project images
- [ ] Upload your resume PDF
- [ ] Test on mobile devices
- [ ] Deploy to Vercel
- [ ] Share your portfolio! 🎉

## 🆘 Need Help?

- **Build Errors:** Run `npm run build` to see detailed errors
- **Styling Issues:** Hard refresh with `Ctrl/Cmd + Shift + R`
- **Port Issues:** Change port with `npm run dev -- -p 3001`

## 📚 Documentation

- Full documentation: [README.md](./README.md)
- Update guide: [UPDATING.md](./UPDATING.md)

---

**You're ready to go! 🚀**

Start customizing in `data/portfolio.ts` and watch your changes live reload!

