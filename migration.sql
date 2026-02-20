-- Run this in your Supabase SQL Editor
ALTER TABLE personal_info 
ADD COLUMN IF NOT EXISTS about_description TEXT NOT NULL DEFAULT '';
