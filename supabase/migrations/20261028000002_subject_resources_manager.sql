-- =========================================================================
-- ZEROINDEX: SUBJECT RESOURCES MANAGER SECURE FOUNDATION
-- Migration: 20261028000002_subject_resources_manager.sql
-- Description: Creates persistent subject_resources table for managing
--              course syllabus, textbooks, unit-wise PDF/PPT materials,
--              and external learning resources.
-- Security: 
--   - Public / anonymous: SELECT only published items with valid URLs.
--   - Admin: SELECT, INSERT, UPDATE, DELETE for verified owner admins (public.is_admin()).
-- Standard: Strictly zero em-dashes and zero en-dashes across all lines.
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SCHEMA AND PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- 3. SUBJECT RESOURCES TABLE
-- Single source of truth for dynamically managed subject documents and links.
CREATE TABLE IF NOT EXISTS public.subject_resources (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL DEFAULT 'dld',
  category TEXT NOT NULL CHECK (
    category IN (
      'syllabus',
      'textbooks',
      'reference_books',
      'pdf_materials',
      'ppt_materials',
      'educational_channels',
      'reference_websites',
      'online_calculators'
    )
  ),
  unit_number INTEGER CHECK (unit_number BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  resource_type TEXT NOT NULL DEFAULT 'PDF' CHECK (
    resource_type IN ('PDF', 'PPT', 'Book', 'Channel', 'Website', 'Calculator', 'Other')
  ),
  url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 4. INDEXES FOR PERFORMANCE AND FILTERING
CREATE INDEX IF NOT EXISTS idx_subject_resources_course_cat ON public.subject_resources(course_id, category);
CREATE INDEX IF NOT EXISTS idx_subject_resources_unit ON public.subject_resources(course_id, unit_number);
CREATE INDEX IF NOT EXISTS idx_subject_resources_pub ON public.subject_resources(is_published);
CREATE INDEX IF NOT EXISTS idx_subject_resources_order ON public.subject_resources(display_order, created_at);

-- 5. ROW LEVEL SECURITY (RLS) ACTIVATION
ALTER TABLE public.subject_resources ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES FOR SUBJECT RESOURCES

-- Public / Student Read Policy:
-- Expose ONLY rows that are explicitly published AND have a non-empty URL.
-- Disabled / unpublished resource URLs are strictly blocked at database level.
DROP POLICY IF EXISTS "Public can view published subject resources" ON public.subject_resources;
CREATE POLICY "Public can view published subject resources"
  ON public.subject_resources
  FOR SELECT
  TO anon, authenticated
  USING (
    is_published = true 
    AND url IS NOT NULL 
    AND length(trim(url)) > 0
  );

-- Admin Read Policy:
-- Verified owner administrators can view ALL resources (including drafts and disabled links).
DROP POLICY IF EXISTS "Admins can view all subject resources" ON public.subject_resources;
CREATE POLICY "Admins can view all subject resources"
  ON public.subject_resources
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admin Insert Policy:
-- Only verified administrators can create resources.
DROP POLICY IF EXISTS "Admins can insert subject resources" ON public.subject_resources;
CREATE POLICY "Admins can insert subject resources"
  ON public.subject_resources
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Admin Update Policy:
-- Only verified administrators can update resources, URLs, or publication toggles.
DROP POLICY IF EXISTS "Admins can update subject resources" ON public.subject_resources;
CREATE POLICY "Admins can update subject resources"
  ON public.subject_resources
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admin Delete Policy:
-- Only verified administrators can delete resources.
DROP POLICY IF EXISTS "Admins can delete subject resources" ON public.subject_resources;
CREATE POLICY "Admins can delete subject resources"
  ON public.subject_resources
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Explicit Grants
GRANT SELECT ON public.subject_resources TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.subject_resources TO authenticated;
GRANT ALL ON public.subject_resources TO service_role;
