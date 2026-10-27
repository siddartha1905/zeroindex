-- =========================================================================
-- ZEROINDEX: PRIVATE PROJECT DESK SECURE FOUNDATION
-- Migration: 20261028000001_project_desk_foundation.sql
-- Description: Creates private owner-only tables for ideas, development
--              tasks, decisions, requirements, and operational metadata.
-- Security: Revokes public/anonymous access.
--           Read access requires verified admin status (public.is_admin()).
--           Write access requires AAL2 MFA assurance (public.is_admin_aal2()).
-- Standard: Strictly zero em-dashes and zero en-dashes across all lines.
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SCHEMA AND PERMISSIONS
GRANT USAGE ON SCHEMA public TO authenticated, service_role;

-- 3. PROJECT DESK ITEMS TABLE
-- Stores private development items: ideas, plan tasks, decisions, requirements,
-- and teaching notes.
CREATE TABLE IF NOT EXISTS public.project_desk_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type TEXT NOT NULL CHECK (item_type IN ('idea', 'plan', 'decision', 'requirement')),
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('workbench', 'atlas', 'journal', 'teaching_note', 'general')),
  pillar TEXT NOT NULL DEFAULT 'general' CHECK (pillar IN ('workbench', 'atlas', 'journal', 'general')),
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (
    status IN (
      -- Ideas & Teaching Notes statuses
      'new', 'under_review', 'approved', 'parked', 'discarded',
      -- Development Plan statuses (Now / Next / Later)
      'now', 'next', 'later', 'completed',
      -- Decisions & Requirements statuses
      'active', 'superseded'
    )
  ),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  decision_ref TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid()
);

-- 4. PROJECT DESK METADATA TABLE
-- Stores operational metadata such as "Continue Where I Left Off" note,
-- workspace filter preferences, and snapshot checkpoints.
CREATE TABLE IF NOT EXISTS public.project_desk_meta (
  key TEXT PRIMARY KEY,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid()
);

-- 5. INDEXES FOR PERFORMANCE AND FILTERING
CREATE INDEX IF NOT EXISTS idx_desk_items_type_status ON public.project_desk_items(item_type, status);
CREATE INDEX IF NOT EXISTS idx_desk_items_pillar ON public.project_desk_items(pillar);
CREATE INDEX IF NOT EXISTS idx_desk_items_category ON public.project_desk_items(category);
CREATE INDEX IF NOT EXISTS idx_desk_items_updated_at ON public.project_desk_items(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_desk_items_created_at ON public.project_desk_items(created_at DESC);

-- 6. ROW LEVEL SECURITY (RLS) ACTIVATION
ALTER TABLE public.project_desk_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_desk_meta ENABLE ROW LEVEL SECURITY;

-- Revoke all permissions from anonymous visitors and general public
REVOKE ALL ON public.project_desk_items FROM anon, public;
REVOKE ALL ON public.project_desk_meta FROM anon, public;

-- Explicitly grant table permissions only to authenticated users and service role
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_desk_items TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_desk_meta TO authenticated, service_role;

-- 7. RLS POLICIES FOR PROJECT DESK ITEMS

-- Only verified owner administrators can read project desk items
DROP POLICY IF EXISTS "Admins can view project_desk_items" ON public.project_desk_items;
CREATE POLICY "Admins can view project_desk_items"
  ON public.project_desk_items
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only verified owner administrators with real AAL2 MFA can insert project desk items
DROP POLICY IF EXISTS "Admins with AAL2 can insert project_desk_items" ON public.project_desk_items;
CREATE POLICY "Admins with AAL2 can insert project_desk_items"
  ON public.project_desk_items
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_aal2());

-- Only verified owner administrators with real AAL2 MFA can update project desk items
DROP POLICY IF EXISTS "Admins with AAL2 can update project_desk_items" ON public.project_desk_items;
CREATE POLICY "Admins with AAL2 can update project_desk_items"
  ON public.project_desk_items
  FOR UPDATE
  TO authenticated
  USING (public.is_admin_aal2())
  WITH CHECK (public.is_admin_aal2());

-- Only verified owner administrators with real AAL2 MFA can delete project desk items
DROP POLICY IF EXISTS "Admins with AAL2 can delete project_desk_items" ON public.project_desk_items;
CREATE POLICY "Admins with AAL2 can delete project_desk_items"
  ON public.project_desk_items
  FOR DELETE
  TO authenticated
  USING (public.is_admin_aal2());

-- 8. RLS POLICIES FOR PROJECT DESK METADATA

-- Only verified owner administrators can read project desk metadata
DROP POLICY IF EXISTS "Admins can view project_desk_meta" ON public.project_desk_meta;
CREATE POLICY "Admins can view project_desk_meta"
  ON public.project_desk_meta
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only verified owner administrators with real AAL2 MFA can insert metadata
DROP POLICY IF EXISTS "Admins with AAL2 can insert project_desk_meta" ON public.project_desk_meta;
CREATE POLICY "Admins with AAL2 can insert project_desk_meta"
  ON public.project_desk_meta
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_aal2());

-- Only verified owner administrators with real AAL2 MFA can update metadata
DROP POLICY IF EXISTS "Admins with AAL2 can update project_desk_meta" ON public.project_desk_meta;
CREATE POLICY "Admins with AAL2 can update project_desk_meta"
  ON public.project_desk_meta
  FOR UPDATE
  TO authenticated
  USING (public.is_admin_aal2())
  WITH CHECK (public.is_admin_aal2());

-- Only verified owner administrators with real AAL2 MFA can delete metadata
DROP POLICY IF EXISTS "Admins with AAL2 can delete project_desk_meta" ON public.project_desk_meta;
CREATE POLICY "Admins with AAL2 can delete project_desk_meta"
  ON public.project_desk_meta
  FOR DELETE
  TO authenticated
  USING (public.is_admin_aal2());

-- 9. AUTOMATED UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_project_desk_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_project_desk_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_project_desk_updated_at() FROM anon;
GRANT EXECUTE ON FUNCTION public.handle_project_desk_updated_at() TO authenticated, service_role;

DROP TRIGGER IF EXISTS trg_project_desk_items_updated_at ON public.project_desk_items;
CREATE TRIGGER trg_project_desk_items_updated_at
  BEFORE UPDATE ON public.project_desk_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_project_desk_updated_at();

DROP TRIGGER IF EXISTS trg_project_desk_meta_updated_at ON public.project_desk_meta;
CREATE TRIGGER trg_project_desk_meta_updated_at
  BEFORE UPDATE ON public.project_desk_meta
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_project_desk_updated_at();
