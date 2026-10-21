# Development Milestone: Public Visibility Enforcement and Navigation Isolation

**Date:** October 21, 2026  
**Branch:** `admin-control-system`  
**Standard:** Zero em-dashes and zero en-dashes strictly observed.  

## Summary of Issue
When The Bridge (`pillar-bridge`) was changed from Public to Hidden in the Supabase Admin Dashboard, the Admin Dashboard correctly reflected the hidden status (The Bridge Hidden, 7 child domains Inherited Hidden, Published & Public count decreased from 34 to 26, Hidden by Admin count increased to 8). However, the public website still displayed The Bridge in the header, footer, homepage, and remained accessible via direct hash navigation (`#bridge`).

## Root Cause Analysis
1. **PostgreSQL RLS Policy Execution Denial for Anonymous Role**:
   - The PostgreSQL RLS policy `Public read published visible content` referenced `(auth.uid() IS NOT NULL AND public.is_admin())`.
   - In PostgreSQL, functions evaluated in RLS policies for a role must have `EXECUTE` privileges granted to that role.
   - Because `REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon` was previously executed, anonymous queries failed with SQL state `42501`: `permission denied for function is_admin`.
   - This failure prevented the frontend from receiving the database visibility state when unauthenticated.

2. **Inverted Fallback Logic in `contentRegistryService.js`**:
   - In `fetchContentRegistry()`, when mapping database records to `centralContentRegistry`, any item omitted from the query results (`dbRow === undefined`) fell back to `return item;`.
   - In the static registry, `pillar-bridge` had `isPublic: true`.
   - Because Supabase RLS correctly filtered out hidden records, the missing items fell back to returning `isPublic: true`, completely reversing the database security policy.

3. **Uninitialized Loading State in `App.jsx`**:
   - `contentOverrides` was initialized to `{}` and populated asynchronously.
   - During initial page load, `isItemPubliclyAccessible('pillar-bridge', {})` defaulted to static `item.isPublic` (`true`), exposing hidden pages during page load.

4. **Hardcoded Navigation Components**:
   - `SiteHeader.jsx`, `SiteFooter.jsx`, and `MainHome.jsx` statically rendered all 5 pillars without checking `isItemPubliclyAccessible` or receiving `contentOverrides`.
   - `KnowledgeTreeIllustration.jsx` rendered Branch 3 as an active interactive link regardless of publication status.

5. **Route Normalization & Aliases**:
   - Direct navigation to `#placements`, `#/bridge`, and `#bridge/quant` was not recognized by `isRoutePubliclyAccessible`.

## Corrective Actions
1. **Live Database Integration (`contentRegistryService.js`)**:
   - When Supabase is configured and queries succeed, any item omitted by RLS fails closed (`isPublic: false`).
   - If direct `SELECT` is restricted by role policies, an automatic fallback queries `is_content_item_accessible` via RPC.
   - If Supabase is completely unreachable, restricted content fails closed rather than exposing drafts.

2. **Route and Navigation Guarding (`App.jsx`)**:
   - Added `isRegistryLoaded` state to guard against flashes of hidden content during initial load.
   - Protected all direct hash variations (`bridge`, `placements`, `bridge/*`).
   - Passed `contentOverrides` and `isRegistryLoaded` to `SiteHeader`, `SiteFooter`, and `MainHome`.

3. **Authoritative Navigation Filtering**:
   - `SiteHeader.jsx`: Filters `navigationItems` with `isItemPubliclyAccessible`.
   - `SiteFooter.jsx`: Filters `pillars` under Explore with `isItemPubliclyAccessible`.
   - `MainHome.jsx`: Conditionally renders Card 03 (The Bridge) and adjusts the first row grid dynamically (3 cards at `lg:col-span-2` when visible; 2 cards at `lg:col-span-3` when hidden).
   - `KnowledgeTreeIllustration.jsx`: Mutes Branch 3 (`opacity-25 pointer-events-none`) and disables navigation when hidden.

4. **Authorized Admin Preview Isolation**:
   - When the owner selects "Admin Preview" inside the Admin Dashboard, the restricted page is rendered with a dedicated amber notice banner indicating preview mode.
   - When the owner selects "View Public Site", preview mode is cleared, displaying the genuine public site that strictly enforces public rules.

5. **Database Migration Update (`20261021000001_admin_content_system.sql`)**:
   - Partitioned the SELECT policy into dedicated `anon` and `authenticated` policies so `anon` queries never evaluate `is_admin()`.
   - Granted execute on `is_admin()` to `anon` to ensure zero permission errors.

## Verification Performed
- `node scripts/testBridgeVisibilityLifecycle.mjs`: 36/36 checks passed against live Supabase.
- `node scripts/verifyAdminControlSystem.mjs`: 64/64 checks passed.
- `npm run build`: Production build succeeded in 4.46s with zero errors.
- Strict Zero-Dash audit: 0 em-dashes and 0 en-dashes across all modified files.
