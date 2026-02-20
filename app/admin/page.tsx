"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Link2,
  GraduationCap,
  Wrench,
  FolderOpen,
  Globe,
  Save,
  Plus,
  Trash2,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  LogOut,
  Upload,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { TagInput } from "@/components/ui/TagInput";
import type {
  DbEducation,
  DbSkillCategory,
  DbProject,
} from "@/lib/supabase/types";

// ─── Constants ────────────────────────────────────────────────────

const TABS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "social", label: "Social Links", icon: Link2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "metadata", label: "Site SEO", icon: Globe },
] as const;

type TabId = (typeof TABS)[number]["id"];

const ICON_OPTIONS = ["Code", "Brain", "Database", "BarChart3", "Wrench", "Cloud", "Cpu"];
// CATEGORY_OPTIONS removed - now dynamic

// ─── Form State Types ─────────────────────────────────────────────

interface FormData {
  personalInfo: {
    name: string; role: string; tagline: string; description: string; aboutDescription: string;
    email: string; location: string; availability: string;
    image_url: string; resume_url: string;
  };
  socialLinks: { linkedin: string; github: string; email: string };
  education: {
    id?: number; institution: string; degree: string; period: string;
    status: string; description: string; skills: string[]; sort_order: number;
  }[];
  skillCategories: {
    id?: number; name: string; icon: string; description: string;
    items: string[]; sort_order: number;
  }[];
  projects: {
    id?: number; title: string; description: string;
    categories: string[]; tags: string[]; image_url: string;
    github_url: string; demo_url: string; featured: boolean; sort_order: number;
  }[];
  siteMetadata: {
    title: string; description: string; url: string; image: string; keywords: string[]; projectCategories: string[];
  };
}

// ─── Reusable UI Components ──────────────────────────────────────

function Input({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors" />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  rows?: number; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-1.5">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors resize-y" />
    </div>
  );
}

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-1.5">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors">
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

// function TagsInput removed - imported from components/ui/TagInput

function SectionCard({ title, description, children }: {
  title: string; description?: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5">
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {description && <p className="text-sm text-neutral-400 mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Toast({ message, type = "success" }: { message: string; type?: "success" | "info" | "error" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-sm font-medium ${type === "success" ? "bg-green-500/90 text-white" : type === "error" ? "bg-red-500/90 text-white" : "bg-neutral-700 text-white"
      }`}>
      {type === "success" ? <Check className="w-4 h-4" /> : type === "error" ? <AlertCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </div>
  );
}

// ─── Image Upload Component ──────────────────────────────────────

// File size limits (in bytes)
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const ALLOWED_PDF_TYPES = ["application/pdf"];

function FileUpload({ label, currentUrl, storagePath, onUploaded, accept = "image/*" }: {
  label: string; currentUrl: string; storagePath: string;
  onUploaded: (url: string) => void; accept?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const validateFile = (file: File): string | null => {
    const isPdf = accept.includes("pdf");
    const maxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;
    const allowedTypes = isPdf ? ALLOWED_PDF_TYPES : ALLOWED_IMAGE_TYPES;

    if (file.size > maxSize) {
      return `File too large. Maximum size is ${maxSize / 1024 / 1024}MB.`;
    }
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed: ${allowedTypes.join(", ")}`;
    }
    return null;
  };

  const upload = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      alert(error);
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const path = `${storagePath}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("portfolio").upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
      onUploaded(data.publicUrl);
    } catch (err: unknown) {
      alert("Upload failed: " + (err instanceof Error ? err.message : String(err)));
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-300 mb-1.5">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${dragOver ? "border-neutral-500 bg-white/5" : "border-neutral-700 hover:border-neutral-600"
          }`}
      >
        {currentUrl && accept.startsWith("image") ? (
          <div className="mb-3">
            <img src={currentUrl} alt="Preview" className="h-24 mx-auto rounded-lg object-cover" />
          </div>
        ) : currentUrl ? (
          <p className="text-xs text-green-400 mb-2 truncate">✓ {currentUrl.split("/").pop()}</p>
        ) : null}

        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-neutral-300">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 text-neutral-400 mb-2">
              {accept.startsWith("image") ? <ImageIcon className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
              <span className="text-sm">Drag & drop or click to upload</span>
            </div>
            <input
              type="file"
              accept={accept}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
}

// ─── Auth: Login / Signup Form ───────────────────────────────────

function AuthForm({ onAuth }: { onAuth: (session: Session) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);

    if (isSignUp) {
      const { data, error: err } = await supabase.auth.signUp({ email, password });
      if (err) { setError(err.message); }
      else if (data.session) { onAuth(data.session); }
      else { setMessage("Check your email for a confirmation link, then log in."); }
    } else {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); }
      else if (data.session) { onAuth(data.session); }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto bg-white/10 rounded-full flex items-center justify-center">
            <Lock className="w-7 h-7 text-neutral-300" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-neutral-400">{isSignUp ? "Create your admin account" : "Sign in to manage your portfolio"}</p>
        </div>

        <Input label="Email" value={email} onChange={setEmail} type="email" placeholder="you@email.com" />

        <div className="relative">
          <Input label="Password" value={password} onChange={setPassword} type={show ? "text" : "password"} placeholder="••••••••" />
          <button type="button" onClick={() => setShow(!show)}
            className="absolute right-3 top-9 text-neutral-400 hover:text-white transition-colors">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {message && <p className="text-green-400 text-sm text-center">{message}</p>}

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-white hover:bg-neutral-200 disabled:opacity-50 text-neutral-950 font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSignUp ? "Create Account" : "Sign In"}
        </button>

        <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError(""); setMessage(""); }}
          className="w-full text-sm text-neutral-400 hover:text-white transition-colors text-center">
          {isSignUp ? "Already have an account? Sign in" : "First time? Create an account"}
        </button>
      </form>
    </div>
  );
}

// ─── Section Editors ─────────────────────────────────────────────

function PersonalInfoEditor({ data, onChange }: {
  data: FormData["personalInfo"]; onChange: (d: FormData["personalInfo"]) => void;
}) {
  const set = (key: keyof typeof data, val: string) => onChange({ ...data, [key]: val });
  return (
    <SectionCard title="Personal Information" description="Your name, role, bio, and profile assets.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name" value={data.name} onChange={(v) => set("name", v)} />
        <Input label="Role / Title" value={data.role} onChange={(v) => set("role", v)} />
        <Input label="Tagline" value={data.tagline} onChange={(v) => set("tagline", v)} />
        <Input label="Email" value={data.email} onChange={(v) => set("email", v)} type="email" />
        <Input label="Location" value={data.location} onChange={(v) => set("location", v)} />
        <Input label="Availability" value={data.availability} onChange={(v) => set("availability", v)} />
      </div>
      <TextArea label="Landing Page Description" value={data.description} onChange={(v) => set("description", v)} rows={3} />
      <TextArea label="About / Profile Description" value={data.aboutDescription} onChange={(v) => set("aboutDescription", v)} rows={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUpload label="Profile Picture" currentUrl={data.image_url} storagePath="images/profile/avatar"
          onUploaded={(url) => set("image_url", url)} />
        <FileUpload label="Resume PDF" currentUrl={data.resume_url} storagePath="documents/resume"
          accept=".pdf,application/pdf" onUploaded={(url) => set("resume_url", url)} />
      </div>
    </SectionCard>
  );
}

function SocialLinksEditor({ data, onChange }: {
  data: FormData["socialLinks"]; onChange: (d: FormData["socialLinks"]) => void;
}) {
  const set = (key: keyof typeof data, val: string) => onChange({ ...data, [key]: val });
  return (
    <SectionCard title="Social Links" description="Used in Hero, About, Contact, and Footer sections.">
      <Input label="LinkedIn URL" value={data.linkedin} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/yourprofile" />
      <Input label="GitHub URL" value={data.github} onChange={(v) => set("github", v)} placeholder="https://github.com/yourusername" />
      <Input label="Email Address" value={data.email} onChange={(v) => set("email", v)} type="email" />
    </SectionCard>
  );
}

function EducationEditor({ data, onChange }: {
  data: FormData["education"]; onChange: (d: FormData["education"]) => void;
}) {
  const addEntry = () => onChange([...data, { institution: "", degree: "", period: "", status: "", description: "", skills: [], sort_order: data.length }]);
  const updateEntry = (index: number, field: string, value: any) => onChange(data.map((e, i) => i === index ? { ...e, [field]: value } : e));
  const removeEntry = (index: number) => onChange(data.filter((_, i) => i !== index));

  return (
    <SectionCard title="Education" description="Your academic background.">
      {data.map((edu, idx) => (
        <div key={idx} className="p-4 bg-neutral-800/50 border border-neutral-700 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-300">Entry #{idx + 1}</span>
            <button onClick={() => removeEntry(idx)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Institution" value={edu.institution} onChange={(v) => updateEntry(idx, "institution", v)} />
            <Input label="Degree" value={edu.degree} onChange={(v) => updateEntry(idx, "degree", v)} />
            <Input label="Period" value={edu.period} onChange={(v) => updateEntry(idx, "period", v)} placeholder="2022 - 2024" />
            <Input label="Status" value={edu.status} onChange={(v) => updateEntry(idx, "status", v)} placeholder="Graduated / In Progress" />
          </div>
          <TextArea label="Description" value={edu.description} onChange={(v) => updateEntry(idx, "description", v)} rows={2} />
          <TagInput label="Skills / Coursework" tags={edu.skills} onChange={(tags) => updateEntry(idx, "skills", tags)} placeholder="Add a skill" />
        </div>
      ))}
      <button onClick={addEntry} className="w-full py-3 border-2 border-dashed border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-neutral-200 rounded-lg flex items-center justify-center gap-2 transition-colors">
        <Plus className="w-4 h-4" /> Add Education Entry
      </button>
    </SectionCard>
  );
}

function SkillsEditor({ data, onChange }: {
  data: FormData["skillCategories"]; onChange: (d: FormData["skillCategories"]) => void;
}) {
  const [newCategory, setNewCategory] = useState("");
  const addCategory = () => {
    const name = newCategory.trim();
    if (name && !data.some((c) => c.name === name)) {
      onChange([...data, { name, icon: "Code", description: "", items: [], sort_order: data.length }]);
      setNewCategory("");
    }
  };
  const removeCategory = (idx: number) => onChange(data.filter((_, i) => i !== idx));
  const updateCategory = (idx: number, field: string, value: any) => onChange(data.map((c, i) => i === idx ? { ...c, [field]: value } : c));

  return (
    <SectionCard title="Skills" description="Technical skills grouped by category.">
      {data.map((cat, idx) => (
        <div key={idx} className="p-4 bg-neutral-800/50 border border-neutral-700 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-white">{cat.name}</span>
            <button onClick={() => removeCategory(idx)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Icon" value={cat.icon} onChange={(v) => updateCategory(idx, "icon", v)} options={ICON_OPTIONS} />
            <Input label="Description" value={cat.description} onChange={(v) => updateCategory(idx, "description", v)} />
          </div>
          <TagInput label="Skills" tags={cat.items} onChange={(items) => updateCategory(idx, "items", items)} placeholder="Add a skill" />
        </div>
      ))}
      <div className="flex gap-2">
        <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCategory(); } }}
          placeholder="New category name..."
          className="flex-1 px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors" />
        <button onClick={addCategory} className="px-4 py-2.5 bg-white/10 text-neutral-300 hover:bg-white/15 rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>
    </SectionCard>
  );
}

interface ProjectEditorProps {
  data: FormData["projects"];
  onChange: (d: FormData["projects"]) => void;
  suggestions: string[];
}

function ProjectEditor({ data, onChange, suggestions }: ProjectEditorProps) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const addProject = () => {
    const newProj = {
      title: "New Project", description: "",
      categories: [], tags: [], image_url: "", github_url: "", demo_url: "", featured: false, sort_order: data.length,
    };
    onChange([...data, newProj]);
    setEditingIdx(data.length);
  };
  const updateProject = (idx: number, field: string, value: any) => onChange(data.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  const removeProject = (idx: number) => {
    onChange(data.filter((_, i) => i !== idx));
    if (editingIdx === idx) setEditingIdx(null);
  };

  return (
    <SectionCard title="Projects" description="Click a project to edit it.">
      <div className="space-y-2">
        {data.map((project, idx) => (
          <div key={idx}>
            <div onClick={() => setEditingIdx(editingIdx === idx ? null : idx)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${editingIdx === idx ? "bg-white/5 border border-neutral-600" : "bg-neutral-800/50 border border-neutral-700 hover:border-neutral-600"
                }`}>
              <div className="flex items-center gap-3 min-w-0">
                <ChevronRight className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${editingIdx === idx ? "rotate-90" : ""}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{project.title}</p>
                  <p className="text-xs text-neutral-400">{project.categories?.join(", ") || "No Category"}{project.featured && " · ⭐ Featured"}</p>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeProject(idx); }}
                className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
            </div>

            {editingIdx === idx && (
              <div className="mt-2 p-4 bg-neutral-800/30 border border-neutral-700 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Title" value={project.title} onChange={(v) => updateProject(idx, "title", v)} />
                  <TagInput
                    label="Categories"
                    tags={project.categories || []}
                    onChange={(tags) => updateProject(idx, "categories", tags)}
                    placeholder="Add category"
                    suggestions={suggestions}
                  />
                </div>
                <TextArea label="Short Description" value={project.description} onChange={(v) => updateProject(idx, "description", v)} rows={2} />
                <TagInput label="Tech Stack / Tags" tags={project.tags} onChange={(tags) => updateProject(idx, "tags", tags)} placeholder="Add a tag" />
                <FileUpload label="Project Screenshot" currentUrl={project.image_url}
                  storagePath={`images/projects/project-${idx}`}
                  onUploaded={(url) => updateProject(idx, "image_url", url)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="GitHub URL" value={project.github_url} onChange={(v) => updateProject(idx, "github_url", v)} placeholder="https://github.com/..." />
                  <Input label="Demo URL" value={project.demo_url} onChange={(v) => updateProject(idx, "demo_url", v)} placeholder="https://your-demo.com" />
                </div>
                <label className="flex items-center gap-3 px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg cursor-pointer hover:border-neutral-600 transition-colors">
                  <input type="checkbox" checked={project.featured} onChange={(e) => updateProject(idx, "featured", e.target.checked)} className="w-4 h-4 accent-neutral-400" />
                  <span className="text-sm text-neutral-300">Featured Project ⭐</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={addProject} className="w-full py-3 border-2 border-dashed border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-neutral-200 rounded-lg flex items-center justify-center gap-2 transition-colors">
        <Plus className="w-4 h-4" /> Add New Project
      </button>
    </SectionCard>
  );
}

function MetadataEditor({ data, onChange }: {
  data: FormData["siteMetadata"]; onChange: (d: FormData["siteMetadata"]) => void;
}) {
  const set = (key: keyof typeof data, val: any) => onChange({ ...data, [key]: val });
  return (
    <SectionCard title="Site SEO & Metadata" description="Controls page title, description, and social sharing previews.">
      <Input label="Page Title" value={data.title} onChange={(v) => set("title", v)} />
      <TextArea label="Meta Description" value={data.description} onChange={(v) => set("description", v)} rows={2} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Site URL" value={data.url} onChange={(v) => set("url", v)} placeholder="https://yourportfolio.vercel.app" />
        <Input label="OG Image Path" value={data.image} onChange={(v) => set("image", v)} />
      </div>
      <TagInput label="Project Categories" tags={data.projectCategories} onChange={(cats) => set("projectCategories", cats)} placeholder="Add category (e.g. Machine Learning)" />
      <TagInput label="SEO Keywords" tags={data.keywords} onChange={(kw) => set("keywords", kw)} placeholder="Add a keyword" />
    </SectionCard>
  );
}

// ─── Main Admin Dashboard ────────────────────────────────────────

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [formData, setFormData] = useState<FormData | null>(null); // Renamed from 'data'
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = useCallback((message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ── Auth ─────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setCheckingAuth(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_ev, s) => {
      setSession(s);
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Load data when authenticated ─────────────────────────
  useEffect(() => {
    if (session) loadData();
  }, [session]);

  async function loadData() {
    setLoading(true);
    try {
      const [pi, edu, skills, proj, social, meta] = await Promise.all([
        supabase.from("personal_info").select("*").single(),
        supabase.from("education").select("*").order("sort_order"),
        supabase.from("skill_categories").select("*").order("sort_order"),
        supabase.from("projects").select("*").order("sort_order"),
        supabase.from("social_links").select("*").single(),
        supabase.from("site_metadata").select("*").single(),
      ]);

      setFormData({ // Renamed from 'setData'
        personalInfo: {
          name: pi.data?.name || "",
          role: pi.data?.role || "",
          tagline: pi.data?.tagline || "",
          description: pi.data?.description || "",
          aboutDescription: pi.data?.about_description || "",
          email: pi.data?.email || "",
          location: pi.data?.location || "",
          availability: pi.data?.availability || "",
          image_url: pi.data?.image_url || "",
          resume_url: pi.data?.resume_url || "",
        },
        socialLinks: {
          linkedin: social.data?.linkedin || "",
          github: social.data?.github || "",
          email: social.data?.email || "",
        },
        education: (edu.data || []).map((e: DbEducation) => ({
          id: e.id,
          institution: e.institution,
          degree: e.degree,
          period: e.period,
          status: e.status,
          description: e.description,
          skills: e.skills || [],
          sort_order: e.sort_order,
        })),
        skillCategories: (skills.data || []).map((s: DbSkillCategory) => ({
          id: s.id,
          name: s.name,
          icon: s.icon,
          description: s.description,
          items: s.items || [],
          sort_order: s.sort_order,
        })),
        projects: (proj.data || []).map((p: DbProject) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          long_description: p.long_description || "",
          categories: p.categories || [p.category].filter(Boolean) || [],
          tags: p.tags || [],
          image_url: p.image_url || "",
          github_url: p.github_url || "",
          demo_url: p.demo_url || "",
          featured: p.featured,
          sort_order: p.sort_order,
        })),
        siteMetadata: {
          title: meta.data?.title || "",
          description: meta.data?.description || "",
          url: meta.data?.url || "",
          image: meta.data?.image || "",
          keywords: meta.data?.keywords || [],
          projectCategories: meta.data?.project_categories || [],
        },
      });
    } catch {
      showToast("Failed to load data. Have you run the SQL schema?", "error");
    }
    setLoading(false);
  }

  // ── Save everything to Supabase ──────────────────────────
  async function saveData() {
    if (!formData) return; // Renamed from 'data'
    setSaving(true);

    try {
      // 1. Upsert single-row tables
      const { error: piErr } = await supabase.from("personal_info").upsert({
        id: 1,
        name: formData.personalInfo.name, // Renamed from 'data'
        role: formData.personalInfo.role, // Renamed from 'data'
        tagline: formData.personalInfo.tagline, // Renamed from 'data'
        description: formData.personalInfo.description, // Renamed from 'data'
        about_description: formData.personalInfo.aboutDescription, // Renamed from 'data'
        email: formData.personalInfo.email, // Renamed from 'data'
        location: formData.personalInfo.location, // Renamed from 'data'
        availability: formData.personalInfo.availability, // Renamed from 'data'
        image_url: formData.personalInfo.image_url || null, // Renamed from 'data'
        resume_url: formData.personalInfo.resume_url || null, // Renamed from 'data'
        updated_at: new Date().toISOString(),
      });
      if (piErr) throw piErr;

      const { error: slErr } = await supabase.from("social_links").upsert({
        id: 1,
        linkedin: formData.socialLinks.linkedin || null, // Renamed from 'data'
        github: formData.socialLinks.github || null, // Renamed from 'data'
        email: formData.socialLinks.email || null, // Renamed from 'data'
        updated_at: new Date().toISOString(),
      });
      if (slErr) throw slErr;

      const { error: smErr } = await supabase.from("site_metadata").upsert({
        id: 1,
        title: formData.siteMetadata.title, // Renamed from 'data'
        description: formData.siteMetadata.description, // Renamed from 'data'
        url: formData.siteMetadata.url, // Renamed from 'data'
        image: formData.siteMetadata.image || null, // Renamed from 'data'
        keywords: formData.siteMetadata.keywords, // Renamed from 'data'
        project_categories: formData.siteMetadata.projectCategories, // Renamed from 'data'
        updated_at: new Date().toISOString(),
      });
      if (smErr) throw smErr;

      // 2. Multi-row tables: delete all → re-insert
      await supabase.from("education").delete().gte("id", 0);
      if (formData.education.length > 0) { // Renamed from 'data'
        const { error: eduErr } = await supabase.from("education").insert(
          formData.education.map((e, i) => ({ // Renamed from 'data'
            institution: e.institution,
            degree: e.degree,
            period: e.period,
            status: e.status,
            description: e.description,
            skills: e.skills,
            sort_order: i,
            updated_at: new Date().toISOString(),
          }))
        );
        if (eduErr) throw eduErr;
      }

      await supabase.from("skill_categories").delete().gte("id", 0);
      if (formData.skillCategories.length > 0) { // Renamed from 'data'
        const { error: skErr } = await supabase.from("skill_categories").insert(
          formData.skillCategories.map((s, i) => ({ // Renamed from 'data'
            name: s.name,
            icon: s.icon,
            description: s.description,
            items: s.items,
            sort_order: i,
            updated_at: new Date().toISOString(),
          }))
        );
        if (skErr) throw skErr;
      }

      await supabase.from("projects").delete().gte("id", 0);
      if (formData.projects.length > 0) { // Renamed from 'data'
        const { error: prErr } = await supabase.from("projects").insert(
          formData.projects.map((p, i) => ({ // Renamed from 'data'
            title: p.title,
            description: p.description,
            // long_description removed/deprecated
            categories: p.categories,
            category: p.categories?.[0] || "Uncategorized", // Fallback for backward compatibility
            tags: p.tags,
            image_url: p.image_url || null,
            github_url: p.github_url || null,
            demo_url: p.demo_url || null,
            featured: p.featured,
            sort_order: i,
            updated_at: new Date().toISOString(),
          }))
        );
        if (prErr) throw prErr;
      }

      // 3. Trigger page revalidation
      try {
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET || "" }),
        });
      } catch {
        // revalidation is non-critical — data is saved regardless
      }

      showToast("Saved! Your site will update in a few seconds.");
    } catch (err: unknown) {
      showToast("Save failed: " + (err instanceof Error ? err.message : "Unknown error"), "error");
    }
    setSaving(false);
  }

  // ── Sign out ─────────────────────────────────────────────
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setFormData(null); // Renamed from 'setData'
  };

  // ── Render states ────────────────────────────────────────
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-neutral-400 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <AuthForm onAuth={(s) => setSession(s)} />;
  }

  if (loading || !formData) { // Renamed from 'data'
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-neutral-400 animate-spin" />
        <p className="text-neutral-400 text-sm">Loading portfolio data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-neutral-700 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">SL</span>
            </div>
            <span className="font-semibold text-sm">Admin Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:block text-xs text-neutral-500 mr-2">{session.user.email}</span>
          <button onClick={saveData} disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white text-neutral-950 hover:bg-neutral-200 disabled:opacity-50 rounded-lg transition-colors font-medium">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{saving ? "Saving..." : "Save & Publish"}</span>
            <span className="sm:hidden">{saving ? "..." : "Save"}</span>
          </button>
          <button onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-56 bg-neutral-900 border-r border-neutral-800 flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}>
          <nav className="flex-1 py-4 space-y-1 px-3">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="p-3 border-t border-neutral-800">
            <a href="/" target="_blank" className="flex items-center gap-2 px-3 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
              <Eye className="w-4 h-4" /> View Live Site
            </a>
          </div>
        </aside>

        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-20 bg-black/50 lg:hidden" />}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-3.5rem)] p-4 lg:p-8 max-w-4xl mx-auto w-full">
          {activeTab === "personal" && <PersonalInfoEditor data={formData.personalInfo} onChange={(d) => setFormData({ ...formData, personalInfo: d })} />}
          {activeTab === "social" && <SocialLinksEditor data={formData.socialLinks} onChange={(d) => setFormData({ ...formData, socialLinks: d })} />}
          {activeTab === "education" && <EducationEditor data={formData.education} onChange={(d) => setFormData({ ...formData, education: d })} />}
          {activeTab === "skills" && <SkillsEditor data={formData.skillCategories} onChange={(d) => setFormData({ ...formData, skillCategories: d })} />}
          {activeTab === "projects" && <ProjectEditor data={formData.projects} onChange={(d) => setFormData({ ...formData, projects: d })} suggestions={formData.siteMetadata.projectCategories} />}
          {activeTab === "metadata" && <MetadataEditor data={formData.siteMetadata} onChange={(d) => setFormData({ ...formData, siteMetadata: d })} />}
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
