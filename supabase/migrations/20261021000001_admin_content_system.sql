-- =========================================================================
-- ZEROINDEX: MINIMAL SUPABASE-BACKED ADMIN AND PUBLISHING SYSTEM
-- Migration: 20261021000001_admin_content_system.sql
-- Description: Sets up admin_users, content_registry, audit_logs, drafts,
--              and Row Level Security policies.
-- Standard: Zero em-dashes and zero en-dashes across all comments and code.
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ADMIN USERS TABLE
-- Stores authorized owner administrators. Public registration cannot insert rows here.
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Security Definer Function to safely check if the current user is an owner
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid() AND role = 'owner'
  );
END;
$$;

-- Only verified administrators can view admin_users
DROP POLICY IF EXISTS "Admins can view admin_users" ON public.admin_users;
CREATE POLICY "Admins can view admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- 3. CONTENT REGISTRY TABLE
-- Single source of truth for visibility and editorial status across all 5 pillars
CREATE TABLE IF NOT EXISTS public.content_registry (
  id TEXT PRIMARY KEY,
  parent_id TEXT REFERENCES public.content_registry(id) ON DELETE CASCADE,
  pillar TEXT NOT NULL CHECK (pillar IN ('workbench', 'atlas', 'bridge', 'readout', 'folio')),
  content_type TEXT NOT NULL CHECK (content_type IN ('pillar', 'subject', 'unit', 'section', 'tool', 'division', 'roadmap', 'domain', 'article', 'essay')),
  title TEXT NOT NULL,
  route TEXT NOT NULL,
  editorial_status TEXT NOT NULL CHECK (editorial_status IN ('published', 'in_review', 'draft', 'planned')),
  is_public BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.content_registry ENABLE ROW LEVEL SECURITY;

-- Public (anonymous and authenticated) can only SELECT items that are published and public,
-- or verified administrators can SELECT all items.
DROP POLICY IF EXISTS "Public read published visible content" ON public.content_registry;
CREATE POLICY "Public read published visible content"
  ON public.content_registry
  FOR SELECT
  TO anon, authenticated
  USING (
    (editorial_status = 'published' AND is_public = true)
    OR public.is_admin()
  );

-- Only verified administrators can UPDATE content_registry rows
DROP POLICY IF EXISTS "Admins can update content_registry" ON public.content_registry;
CREATE POLICY "Admins can update content_registry"
  ON public.content_registry
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only verified administrators can INSERT content_registry rows
DROP POLICY IF EXISTS "Admins can insert content_registry" ON public.content_registry;
CREATE POLICY "Admins can insert content_registry"
  ON public.content_registry
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Only verified administrators can DELETE content_registry rows
DROP POLICY IF EXISTS "Admins can delete content_registry" ON public.content_registry;
CREATE POLICY "Admins can delete content_registry"
  ON public.content_registry
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- 4. ADMIN AUDIT LOGS TABLE
-- Records every publishing change made by the owner
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL CHECK (action IN ('PUBLISH', 'HIDE', 'STATUS_CHANGE', 'SCHEMA_UPDATE')),
  target_id TEXT NOT NULL,
  previous_state JSONB,
  new_state JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view and create audit logs" ON public.admin_audit_logs;
CREATE POLICY "Admins can view and create audit logs"
  ON public.admin_audit_logs
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. UNPUBLISHED DRAFTS TABLE (CONFIDENTIAL ARCHIVE)
-- Secure storage for unapproved monographs, essays, and notes. Never accessible to public.
CREATE TABLE IF NOT EXISTS public.unpublished_drafts (
  id TEXT PRIMARY KEY REFERENCES public.content_registry(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  pillar TEXT NOT NULL,
  content_body TEXT NOT NULL,
  draft_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

ALTER TABLE public.unpublished_drafts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only verified admin can access unpublished drafts" ON public.unpublished_drafts;
CREATE POLICY "Only verified admin can access unpublished drafts"
  ON public.unpublished_drafts
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- =========================================================================
-- INITIAL SEED DATA FOR CONTENT REGISTRY
-- Inserts the 5 ZeroIndex pillars and initial content items
-- =========================================================================

INSERT INTO public.content_registry (id, parent_id, pillar, content_type, title, route, editorial_status, is_public)
VALUES
  -- Pillars
  ('pillar-workbench', NULL, 'workbench', 'pillar', 'The Workbench', 'workbench', 'published', true),
  ('pillar-atlas', NULL, 'atlas', 'pillar', 'The Atlas', 'atlas', 'published', true),
  ('pillar-bridge', NULL, 'bridge', 'pillar', 'The Bridge', 'bridge', 'published', true),
  ('pillar-readout', NULL, 'readout', 'pillar', 'The Readout', 'readout', 'published', true),
  ('pillar-folio', NULL, 'folio', 'pillar', 'The Folio', 'folio', 'published', true),

  -- Workbench Subject and Units
  ('workbench-subject-dld', 'pillar-workbench', 'workbench', 'subject', 'Digital Logic Design', 'dld', 'published', true),
  ('dld-unit-1', 'workbench-subject-dld', 'workbench', 'unit', 'Unit I: Number Systems and Boolean Logic', 'workspace/units/1.1', 'published', true),
  ('dld-sec-1.1', 'dld-unit-1', 'workbench', 'section', 'Section 1.1: Introduction to Digital Systems', 'workspace/units/1.1', 'published', true),
  ('dld-sec-1.2', 'dld-unit-1', 'workbench', 'section', 'Section 1.2: Positional Number Systems', 'workspace/units/1.2', 'published', true),
  ('dld-sec-1.3', 'dld-unit-1', 'workbench', 'section', 'Section 1.3: Radix Base Conversion Algorithms', 'workspace/units/1.3', 'published', true),
  ('dld-sec-1.4', 'dld-unit-1', 'workbench', 'section', 'Section 1.4: Binary Arithmetic and Diminished Complements', 'workspace/units/1.4', 'published', true),
  ('dld-sec-1.5', 'dld-unit-1', 'workbench', 'section', 'Section 1.5: Signed Number Representations', 'workspace/units/1.5', 'published', true),
  ('dld-sec-1.6', 'dld-unit-1', 'workbench', 'section', 'Section 1.6: Binary Codes: BCD, Excess-3, Gray and ASCII', 'workspace/units/1.6', 'published', true),
  ('dld-sec-1.7', 'dld-unit-1', 'workbench', 'section', 'Section 1.7: Boolean Logic and Universal Gate Primitives', 'workspace/units/1.7', 'published', true),
  ('dld-unit-2', 'workbench-subject-dld', 'workbench', 'unit', 'Unit II: Gate-Level Minimization and Combinational Logic', 'workspace/units/2.1', 'published', true),
  ('dld-sec-2.1', 'dld-unit-2', 'workbench', 'section', 'Section 2.1: Boolean Axioms, Duals and Algebraic Laws', 'workspace/units/2.1', 'published', true),
  ('dld-sec-2.2', 'dld-unit-2', 'workbench', 'section', 'Section 2.2: Algebraic Simplification Mechanics', 'workspace/units/2.2', 'published', true),
  ('dld-sec-2.3', 'dld-unit-2', 'workbench', 'section', 'Section 2.3: Minterms, Maxterms and Canonical Expansions', 'workspace/units/2.3', 'published', true),
  ('dld-sec-2.4', 'dld-unit-2', 'workbench', 'section', 'Section 2.4: SOP and POS Standard Implementations', 'workspace/units/2.4', 'published', true),
  ('dld-sec-2.5', 'dld-unit-2', 'workbench', 'section', 'Section 2.5: Karnaugh Map Minimization (2 to 4 Variables)', 'workspace/units/2.5', 'published', true),
  ('dld-sec-2.6', 'dld-unit-2', 'workbench', 'section', 'Section 2.6: Don''t-Care Conditions and 5-Variable K-Maps', 'workspace/units/2.6', 'planned', false),
  ('dld-sec-2.7', 'dld-unit-2', 'workbench', 'section', 'Section 2.7: NAND and NOR Multi-Level Synthesis', 'workspace/units/2.7', 'planned', false),
  ('dld-unit-3', 'workbench-subject-dld', 'workbench', 'unit', 'Unit III: Combinational Logic Design and Standard MSI Functions', 'workspace/units/3.1', 'planned', false),
  ('dld-unit-4', 'workbench-subject-dld', 'workbench', 'unit', 'Unit IV: Synchronous Sequential Logic and State Machines', 'workspace/units/4.1', 'planned', false),
  ('dld-unit-5', 'workbench-subject-dld', 'workbench', 'unit', 'Unit V: Registers, Counters and Memory Systems', 'workspace/units/5.1', 'planned', false),
  ('workbench-tools-group', 'workbench-subject-dld', 'workbench', 'tool', 'Interactive Solvers and Academic Practice', 'workspace/solvers', 'published', true),
  ('workbench-tool-solvers', 'workbench-tools-group', 'workbench', 'tool', 'Visual Solvers Suite (10 Solvers)', 'workspace/solvers', 'published', true),
  ('workbench-tool-practice', 'workbench-tools-group', 'workbench', 'tool', 'Practice Arena (250 Questions)', 'workspace/practice', 'published', true),
  ('workbench-tool-resources', 'workbench-tools-group', 'workbench', 'tool', 'Subject Resources and Textbooks', 'workspace/syllabus', 'published', true),

  -- Atlas Divisions and Roadmaps
  ('atlas-div-foundations', 'pillar-atlas', 'atlas', 'division', 'Division 1: Universal Foundations', 'atlas', 'published', true),
  ('atlas-programming-foundations', 'atlas-div-foundations', 'atlas', 'roadmap', 'Core Computer Science and Programming Foundations', 'atlas/programming-foundations', 'published', true),
  ('atlas-english-communication', 'atlas-div-foundations', 'atlas', 'roadmap', 'English Communication Development', 'atlas/english-communication', 'in_review', false),
  ('atlas-soft-skills', 'atlas-div-foundations', 'atlas', 'roadmap', 'Professional Soft Skills and Team Dynamics', 'atlas/soft-skills', 'planned', false),
  ('atlas-quantitative-aptitude', 'atlas-div-foundations', 'atlas', 'roadmap', 'Quantitative Aptitude for Engineers', 'atlas/quantitative-aptitude', 'planned', false),
  ('atlas-logical-reasoning', 'atlas-div-foundations', 'atlas', 'roadmap', 'Logical Reasoning and Analytical Thinking', 'atlas/logical-reasoning', 'planned', false),
  ('atlas-verbal-ability', 'atlas-div-foundations', 'atlas', 'roadmap', 'Verbal Ability and Reading Comprehension', 'atlas/verbal-ability', 'planned', false),
  ('atlas-c-programming', 'atlas-div-foundations', 'atlas', 'roadmap', 'C Programming and Low-Level Memory', 'atlas/c-programming', 'planned', false),
  ('atlas-python-programming', 'atlas-div-foundations', 'atlas', 'roadmap', 'Python Programming for Engineering and Data', 'atlas/python-programming', 'planned', false),
  ('atlas-entry-it-foundations', 'atlas-div-foundations', 'atlas', 'roadmap', 'IT Services and Entry-Level Competencies', 'atlas/entry-it-foundations', 'planned', false),
  ('atlas-div-hardware', 'pillar-atlas', 'atlas', 'division', 'Division 2: Electrical, Electronics and Embedded Systems', 'atlas', 'published', true),
  ('atlas-systems-architecture', 'atlas-div-hardware', 'atlas', 'roadmap', 'Computer Systems and Architecture Pathway', 'atlas/systems-architecture', 'published', true),
  ('atlas-embedded-systems', 'atlas-div-hardware', 'atlas', 'roadmap', 'Embedded Systems and Firmware Engineering', 'atlas/embedded-systems', 'planned', false),
  ('atlas-vlsi-rtl-design', 'atlas-div-hardware', 'atlas', 'roadmap', 'VLSI Digital Design and RTL Synthesis', 'atlas/vlsi-rtl-design', 'planned', false),
  ('atlas-vlsi-verification', 'atlas-div-hardware', 'atlas', 'roadmap', 'VLSI Verification and UVM Frameworks', 'atlas/vlsi-verification', 'planned', false),
  ('atlas-vlsi-physical-design', 'atlas-div-hardware', 'atlas', 'roadmap', 'VLSI Physical Design and Signoff', 'atlas/vlsi-physical-design', 'planned', false),
  ('atlas-analog-ic-design', 'atlas-div-hardware', 'atlas', 'roadmap', 'Analog and Mixed-Signal IC Design', 'atlas/analog-ic-design', 'planned', false),
  ('atlas-fpga-design', 'atlas-div-hardware', 'atlas', 'roadmap', 'FPGA Architecture and Hardware Acceleration', 'atlas/fpga-design', 'planned', false),
  ('atlas-pcb-hardware-design', 'atlas-div-hardware', 'atlas', 'roadmap', 'PCB and High-Speed Hardware Design', 'atlas/pcb-hardware-design', 'planned', false),
  ('atlas-rf-communication-systems', 'atlas-div-hardware', 'atlas', 'roadmap', 'RF and Wireless Communication Engineering', 'atlas/rf-communication-systems', 'planned', false),
  ('atlas-div-software', 'pillar-atlas', 'atlas', 'division', 'Division 3: Computing Systems and Software Engineering', 'atlas', 'published', true),
  ('atlas-data-science', 'atlas-div-software', 'atlas', 'roadmap', 'Data Science and Machine Learning Foundations', 'atlas/data-science', 'published', true),
  ('atlas-backend-development', 'atlas-div-software', 'atlas', 'roadmap', 'Backend Systems and Distributed Platforms', 'atlas/backend-development', 'planned', false),
  ('atlas-fullstack-development', 'atlas-div-software', 'atlas', 'roadmap', 'Modern Full-Stack Web Architecture', 'atlas/fullstack-development', 'planned', false),
  ('atlas-machine-learning-engineering', 'atlas-div-software', 'atlas', 'roadmap', 'Production Machine Learning Engineering (MLOps)', 'atlas/machine-learning-engineering', 'planned', false),
  ('atlas-data-engineering', 'atlas-div-software', 'atlas', 'roadmap', 'Data Engineering and Big Data Infrastructure', 'atlas/data-engineering', 'planned', false),
  ('atlas-cloud-devops', 'atlas-div-software', 'atlas', 'roadmap', 'Cloud Infrastructure and DevOps Automation', 'atlas/cloud-devops', 'planned', false),
  ('atlas-cybersecurity-engineering', 'atlas-div-software', 'atlas', 'roadmap', 'Cybersecurity and Systems Defense', 'atlas/cybersecurity-engineering', 'planned', false),

  -- Bridge Domains
  ('bridge-domain-quant', 'pillar-bridge', 'bridge', 'domain', 'Quantitative Aptitude and Numerical Reasoning', 'bridge', 'published', true),
  ('bridge-domain-logical', 'pillar-bridge', 'bridge', 'domain', 'Logical Reasoning and Analytical Ability', 'bridge', 'published', true),
  ('bridge-domain-verbal', 'pillar-bridge', 'bridge', 'domain', 'Verbal Ability and Reading Comprehension', 'bridge', 'published', true),
  ('bridge-domain-cs-core', 'pillar-bridge', 'bridge', 'domain', 'Core Computer Science Fundamentals', 'bridge', 'published', true),
  ('bridge-domain-coding', 'pillar-bridge', 'bridge', 'domain', 'Coding Competency and Data Structures', 'bridge', 'published', true),
  ('bridge-domain-systems', 'pillar-bridge', 'bridge', 'domain', 'Systems Development and Project Architecture', 'bridge', 'published', true),
  ('bridge-domain-interview', 'pillar-bridge', 'bridge', 'domain', 'Technical and HR Interview Readiness', 'bridge', 'published', true),

  -- Readout Drafts (Drafts: strictly false)
  ('readout-article-relays-to-tensors', 'pillar-readout', 'readout', 'article', 'From Relays to Tensors: The Long Arc of Computing Hardware', 'readout/relays-to-tensors', 'draft', false),
  ('readout-article-zero-based-indexing', 'pillar-readout', 'readout', 'article', 'Why Zero-Based Indexing Matters in Memory Architecture', 'readout/zero-based-indexing', 'draft', false),
  ('readout-article-attention-geometry', 'pillar-readout', 'readout', 'article', 'The Geometry of Attention Mechanisms: A First-Principles Intuition', 'readout/attention-geometry', 'draft', false),

  -- Folio Drafts (Drafts: strictly false)
  ('folio-essay-teaching-from-index-zero', 'pillar-folio', 'folio', 'essay', 'On Teaching from Index Zero: Why Every Concept Deserves a Clean Starting Point', 'folio/teaching-from-index-zero', 'draft', false),
  ('folio-essay-quiet-craft-engineering', 'pillar-folio', 'folio', 'essay', 'The Quiet Craft of Classroom Engineering', 'folio/quiet-craft-engineering', 'draft', false),
  ('folio-essay-deep-reading-summaries', 'pillar-folio', 'folio', 'essay', 'On Reading Deeply in an Era of Summary Feeds', 'folio/deep-reading-summaries', 'draft', false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  editorial_status = EXCLUDED.editorial_status,
  is_public = EXCLUDED.is_public;
