# 📝 How to Update Your Portfolio

This guide will help you customize and maintain your portfolio website.

## 🎯 Common Tasks

### 1. Adding a New Project

Open `data/portfolio.ts` and add to the `projects` array:

```typescript
{
  id: 7, // Increment from last project
  title: "Your Project Name",
  description: "Brief description for the card (keep under 150 chars)",
  longDescription: "Detailed description with more context about the project",
  category: "Machine Learning", // Options: "Machine Learning", "Data Science", "Web Dev", "Research"
  tags: ["Python", "TensorFlow", "Keras"], // Add relevant tech stack
  image: "/images/projects/your-project.jpg", // Add image first
  github: "https://github.com/username/repo", // Or null if private
  demo: "https://your-demo-url.com", // Or null if no demo
  featured: true, // Set to true to show "Featured" badge
}
```

**Steps:**
1. Add project image to `public/images/projects/`
2. Add project data to `data/portfolio.ts`
3. Save and refresh - it will appear automatically!

### 2. Updating Skills

Edit the `skills` object in `data/portfolio.ts`:

```typescript
export const skills = {
  "Your Category": {
    icon: "Code", // Options: Code, Brain, Database, BarChart3
    description: "Brief description of this category",
    items: ["Skill 1", "Skill 2", "Skill 3"],
  },
};
```

### 3. Changing Your Email

Update in `data/portfolio.ts`:

```typescript
export const personalInfo = {
  email: "new.email@example.com",
  // ... other fields
};

export const socialLinks = {
  email: "new.email@example.com", // Update here too
  // ... other links
};
```

### 4. Adding Your Profile Photo

1. Save your photo as: `public/images/profile.jpg`
2. Recommended size: 800x1000px (portrait)
3. Format: JPG or PNG
4. The website will automatically use it!

### 5. Updating Social Links

Edit `data/portfolio.ts`:

```typescript
export const socialLinks = {
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  email: "your.email@example.com",
};
```

### 6. Adding Your Resume

1. Save your PDF as: `public/resume.pdf`
2. Update in `data/portfolio.ts`:

```typescript
export const personalInfo = {
  resume: "/resume.pdf",
  // ... other fields
};
```

## 🎨 Design Customization

### Changing Colors

Edit `app/globals.css`:

```css
:root {
  --primary: 199 89% 48%; /* Change this HSL value */
}
```

Use [HSL Color Picker](https://hslpicker.com/) to find colors.

### Changing Fonts

Edit `app/layout.tsx`:

```typescript
import { Roboto } from "next/font/google"; // Change font name

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
```

Browse fonts at [Google Fonts](https://fonts.google.com/).

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update all personal information in `data/portfolio.ts`
- [ ] Add your profile photo to `public/images/profile.jpg`
- [ ] Add project images to `public/images/projects/`
- [ ] Add your resume to `public/resume.pdf`
- [ ] Update social links (LinkedIn, GitHub)
- [ ] Test dark mode toggle
- [ ] Test on mobile device
- [ ] Run `npm run build` to check for errors
- [ ] Deploy to Vercel!

## 🔄 Keeping Content Fresh

### Monthly Updates
- Add new projects as you complete them
- Update skills as you learn new technologies
- Refresh your resume

### Quarterly Updates
- Review and update project descriptions
- Add new blog posts or case studies (if applicable)
- Update your profile photo

## 🆘 Quick Fixes

### "Page not loading properly"
```bash
rm -rf .next
npm run dev
```

### "Styles not updating"
- Hard refresh: `Ctrl/Cmd + Shift + R`
- Clear browser cache

### "Build failing"
```bash
npm run lint
```
Fix any errors shown.

## 📞 Need Help?

1. Check the main README.md
2. Review the code comments
3. Google the error message
4. Ask in the project issues

---

**Remember:** After making changes, always test locally with `npm run dev` before deploying!


