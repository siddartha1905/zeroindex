-- ZeroIndex Incremental Migration: Fix Anonymous Content Registry Access
-- File: supabase/migrations/20261021000002_fix_anon_content_policy.sql
-- 
-- Purpose:
-- 1. Grants execute permission on public.is_admin() to anon, authenticated, and service_role.
--    This resolves the PostgreSQL 42501 permission denied error when anonymous queries execute.
-- 2. Separates the SELECT policies on public.content_registry into dedicated anon and authenticated policies:
--    - "Public read published visible content": Dedicated to anon. Directly checks published status
--      and visibility without invoking administrative functions.
--    - "Authenticated read content_registry": Dedicated to authenticated sessions. Allows verified
--      administrators with owner role to read all records for the Admin Dashboard.
-- 
-- Safety Guarantees:
-- - Non-destructive: No tables, columns, or triggers are dropped.
-- - Visibility preservation: Does not re-seed or overwrite existing is_public values in content_registry.
-- - Safe for repeated execution in the Supabase SQL Editor.
-- 
-- Zero-Dash Standard: Zero em-dashes and zero en-dashes across all lines.

-- Step 1: Ensure function execution permissions are correctly granted
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_content_item_accessible(TEXT) TO anon, authenticated, service_role;

-- Step 2: Drop previous unified SELECT policy on content_registry
DROP POLICY IF EXISTS "Public read published visible content" ON public.content_registry;
DROP POLICY IF EXISTS "Authenticated read content_registry" ON public.content_registry;

-- Step 3: Create dedicated SELECT policy for anonymous visitors (public website)
CREATE POLICY "Public read published visible content"
  ON public.content_registry
  FOR SELECT
  TO anon
  USING (
    editorial_status = 'published'
    AND is_public = true
    AND (
      parent_id IS NULL
      OR public.is_content_item_accessible(parent_id)
    )
  );

-- Step 4: Create dedicated SELECT policy for authenticated users (admin dashboard)
CREATE POLICY "Authenticated read content_registry"
  ON public.content_registry
  FOR SELECT
  TO authenticated
  USING (
    (auth.uid() IS NOT NULL AND public.is_admin())
    OR (
      editorial_status = 'published'
      AND is_public = true
      AND (
        parent_id IS NULL
        OR public.is_content_item_accessible(parent_id)
      )
    )
  );
