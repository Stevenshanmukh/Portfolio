-- =========================================================
-- Portfolio Database Schema + Seed Data + RLS + Storage
-- Run this ENTIRE script in Supabase SQL Editor (one go)
-- Dashboard → SQL Editor → New Query → Paste → Run
-- =========================================================

-- ─── 1. TABLES ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS personal_info (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  about_description TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  availability TEXT NOT NULL,
  image_url TEXT,
  resume_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT personal_info_single_row CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  period TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skill_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Code',
  description TEXT NOT NULL,
  items TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT NOT NULL DEFAULT 'Machine Learning',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS social_links (
  id INT PRIMARY KEY DEFAULT 1,
  linkedin TEXT,
  github TEXT,
  email TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT social_links_single_row CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS site_metadata (
  id INT PRIMARY KEY DEFAULT 1,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  image TEXT,
  keywords TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT site_metadata_single_row CHECK (id = 1)
);

-- ─── 2. ROW LEVEL SECURITY ──────────────────────────────

ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_metadata ENABLE ROW LEVEL SECURITY;

-- Public read for all tables (visitors can see the portfolio)
CREATE POLICY "public_read_personal_info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "public_read_education" ON education FOR SELECT USING (true);
CREATE POLICY "public_read_skill_categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "public_read_projects" ON projects FOR SELECT USING (true);
CREATE POLICY "public_read_social_links" ON social_links FOR SELECT USING (true);
CREATE POLICY "public_read_site_metadata" ON site_metadata FOR SELECT USING (true);

-- Authenticated write for all tables (admin can edit)
CREATE POLICY "auth_insert_personal_info" ON personal_info FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_personal_info" ON personal_info FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_personal_info" ON personal_info FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_insert_education" ON education FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_education" ON education FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_education" ON education FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_insert_skill_categories" ON skill_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_skill_categories" ON skill_categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_skill_categories" ON skill_categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_insert_projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_insert_social_links" ON social_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_social_links" ON social_links FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_social_links" ON social_links FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_insert_site_metadata" ON site_metadata FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_site_metadata" ON site_metadata FOR UPDATE TO authenticated USING (true);
CREATE POLICY "auth_delete_site_metadata" ON site_metadata FOR DELETE TO authenticated USING (true);

-- ─── 3. STORAGE BUCKET ──────────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Public read for portfolio bucket
CREATE POLICY "public_read_portfolio_storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

-- Authenticated upload/update/delete
CREATE POLICY "auth_insert_portfolio_storage" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "auth_update_portfolio_storage" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');

CREATE POLICY "auth_delete_portfolio_storage" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'portfolio');

-- ─── 4. SEED DATA ───────────────────────────────────────

INSERT INTO personal_info (name, role, tagline, description, about_description, email, location, availability)
VALUES (
  'Steven Lagadapati',
  'Data Science Master',
  'Data Scientist in Training',
  'I transform complex datasets into actionable insights. Specializing in machine learning, predictive modeling, and advanced data visualization to drive decision-making.',
  'I am a passionate Data Scientist with a strong foundation in machine learning and statistical analysis. My journey involves...',
  'stevenlagadapati1012@gmail.com',
  'Florida, USA',
  'Open to new opportunities'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO education (institution, degree, period, status, description, skills, sort_order)
VALUES (
  'Florida Atlantic University',
  'Master of Science in Data Science',
  '2022 - 2024',
  'Graduating Soon',
  'Specializing in Machine Learning, Statistical Analysis, and Big Data Technologies.',
  ARRAY['Machine Learning', 'Statistical Analysis', 'Deep Learning', 'Big Data'],
  0
);

INSERT INTO skill_categories (name, icon, description, items, sort_order) VALUES
  ('Core Languages', 'Code', 'Foundational languages for robust software engineering and statistical analysis.', ARRAY['Python', 'R', 'SQL', 'C++'], 0),
  ('Machine Learning & AI', 'Brain', 'Building and deploying predictive models and deep learning architectures.', ARRAY['TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'OpenCV'], 1),
  ('Data Engineering & Tools', 'Database', 'Infrastructure and utilities for efficient data pipelines and development.', ARRAY['Pandas', 'NumPy', 'Apache Spark', 'Docker', 'Git/GitHub', 'AWS'], 2),
  ('Visualization', 'BarChart3', 'Communicating insights effectively through interactive dashboards and plots.', ARRAY['Tableau', 'Matplotlib', 'Seaborn', 'PowerBI', 'Plotly'], 3);

INSERT INTO projects (title, description, long_description, category, tags, github_url, demo_url, featured, sort_order) VALUES
  ('Sentiment Analysis on Twitter',
   'Analyzed 50k tweets to determine public sentiment during the 2024 elections using NLP and machine learning techniques.',
   'Built a comprehensive sentiment analysis pipeline using NLTK and transformers. The model achieved 87% accuracy in classifying positive, negative, and neutral sentiments. Implemented data cleaning, feature extraction, and model training workflows.',
   'Machine Learning', ARRAY['Python', 'NLTK', 'Scikit-learn', 'Pandas'],
   'https://github.com/yourusername/sentiment-analysis', NULL, true, 0),

  ('Real-time Object Detection',
   'Built a real-time object detection system capable of identifying 80 distinct classes of objects in live video feeds.',
   'Implemented YOLOv8 for real-time object detection with OpenCV. The system processes video streams at 30 FPS and can detect common objects with high accuracy. Includes custom training on specific object classes.',
   'Machine Learning', ARRAY['OpenCV', 'YOLO', 'PyTorch', 'Computer Vision'],
   'https://github.com/yourusername/object-detection', NULL, true, 1),

  ('Global Climate Dashboard',
   'An interactive dashboard visualizing global temperature anomalies over the last century. Features drill-down capabilities by region.',
   'Created an interactive Tableau dashboard that visualizes climate data from NASA and NOAA. Users can explore temperature trends, precipitation patterns, and CO2 levels across different time periods and geographic regions.',
   'Data Science', ARRAY['Tableau', 'SQL', 'R', 'Data Visualization'],
   NULL, 'https://public.tableau.com/profile', true, 2),

  ('Housing Price Prediction',
   'Developed a predictive model for housing prices in metropolitan areas. Utilized XGBoost regressor and feature engineering.',
   'Built a machine learning pipeline for predicting house prices based on features like location, size, age, and amenities. Implemented extensive feature engineering and hyperparameter tuning to achieve R² score of 0.91.',
   'Machine Learning', ARRAY['Python', 'XGBoost', 'Pandas', 'Feature Engineering'],
   'https://github.com/yourusername/housing-prediction', NULL, false, 3),

  ('Personal Portfolio V1',
   'Designed and developed a responsive portfolio website to showcase data science projects. Implemented a clean, modern UI.',
   'Built using React, Tailwind CSS, and Node.js. Features project filtering, responsive design, and smooth animations. Deployed on Vercel with continuous integration.',
   'Web Dev', ARRAY['React', 'Tailwind', 'Node.js', 'Vercel'],
   'https://github.com/yourusername/portfolio-v1', 'https://yourportfolio.vercel.app', false, 4),

  ('Neural Network Pruning',
   'Master''s thesis research on optimizing deep neural networks for mobile deployment. Investigated magnitude-based pruning.',
   'Researched and implemented various neural network pruning techniques to reduce model size while maintaining accuracy. Achieved 60% reduction in model size with only 2% accuracy loss on ImageNet dataset.',
   'Research', ARRAY['TensorFlow', 'Research', 'Deep Learning', 'Optimization'],
   NULL, NULL, true, 5);

INSERT INTO social_links (linkedin, github, email)
VALUES (
  'https://linkedin.com/in/yourprofile',
  'https://github.com/yourusername',
  'stevenlagadapati1012@gmail.com'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO site_metadata (title, description, url, keywords)
VALUES (
  'Steven Lagadapati | Data Science Master''s Student',
  'Portfolio of Steven Lagadapati, a Data Science graduate student at Florida Atlantic University specializing in Machine Learning, Statistical Analysis, and Data Visualization.',
  'https://yourportfolio.vercel.app',
  ARRAY['Data Science', 'Machine Learning', 'Python', 'Portfolio', 'Steven Lagadapati', 'FAU', 'Data Scientist']
) ON CONFLICT (id) DO NOTHING;
