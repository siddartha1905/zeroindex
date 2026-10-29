/**
 * Verification Suite: ZeroIndex Simplified Admin Control System
 * 
 * Verifies:
 * 1. Central Content Registry schema integrity and unique identifiers
 * 2. Hierarchical inheritance (hiding a parent hides all descendants)
 * 3. Draft safeguard (drafts and in-review items are NEVER public)
 * 4. Administrator authorization and MFA assurance rules
 * 5. Secure draft preview isolation
 * 6. Honest Supabase configuration detection (no false success)
 * 7. Zero-Dash compliance across all administrative files
 * 
 * Run with: node scripts/verifyAdminControlSystem.mjs
 * Standard: Zero em-dashes and zero en-dashes across all code and comments.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests += 1;
  if (condition) {
    passedTests += 1;
    console.log(`[PASS] ${message}`);
  } else {
    failedTests += 1;
    console.error(`[FAIL] ${message}`);
  }
}

async function runSuite() {
  console.log('=================================================================');
  console.log('ZEROINDEX: ADMIN CONTROL SYSTEM VERIFICATION SUITE');
  console.log('=================================================================\n');

  // -------------------------------------------------------------------------
  // 1. Central Content Registry Integrity
  // -------------------------------------------------------------------------
  console.log('--- 1. Testing Central Content Registry Integrity ---');
  const registryModule = await import('../src/data/centralContentRegistry.js');
  const registry = registryModule.centralContentRegistry;

  assert(Array.isArray(registry) && registry.length >= 40, `Registry contains comprehensive item inventory (found: ${registry.length})`);

  const ids = new Set();
  let duplicateCount = 0;
  registry.forEach(item => {
    if (ids.has(item.id)) duplicateCount += 1;
    ids.add(item.id);
  });
  assert(duplicateCount === 0, 'Every registered item has a unique stable identifier');

  // Verify all 5 root pillars exist
  const pillars = ['pillar-workbench', 'pillar-atlas', 'pillar-bridge', 'pillar-readout', 'pillar-folio'];
  pillars.forEach(pId => {
    const p = registry.find(item => item.id === pId);
    assert(Boolean(p && p.parentId === null && p.contentType === 'pillar'), `Root pillar exists: "${pId}"`);
  });

  // Verify parent references are valid
  const allIds = new Set(registry.map(i => i.id));
  const invalidParents = registry.filter(i => i.parentId !== null && !allIds.has(i.parentId));
  assert(invalidParents.length === 0, 'All parentId references resolve to existing registered items');

  // -------------------------------------------------------------------------
  // 2. Publishing Rules & Hierarchical Inheritance
  // -------------------------------------------------------------------------
  console.log('\n--- 2. Testing Publishing Rules and Hierarchical Inheritance ---');
  const { isItemPubliclyAccessible, isRoutePubliclyAccessible } = registryModule;

  // Published items are publicly accessible by default
  assert(isItemPubliclyAccessible('pillar-workbench') === true, 'Pillar Workbench is publicly accessible by default');
  assert(isItemPubliclyAccessible('dld-unit-1') === true, 'DLD Unit I is publicly accessible by default');
  assert(isItemPubliclyAccessible('dld-sec-1.1') === true, 'DLD Section 1.1 is publicly accessible by default');

  // Published items are publicly accessible by default
  assert(isItemPubliclyAccessible('atlas-english-communication') === true, 'Published English Communication roadmap is publicly accessible');
  assert(isItemPubliclyAccessible('dld-sec-2.6') === true, 'Published DLD Section 2.6 is publicly accessible');
  assert(isItemPubliclyAccessible('dld-sec-2.7') === true, 'Published DLD Section 2.7 is publicly accessible');

  // Draft and planned items are NEVER publicly accessible even if isPublic is forced
  assert(isItemPubliclyAccessible('readout-article-relays-to-tensors') === false, 'Readout draft is strictly inaccessible to public');
  assert(isItemPubliclyAccessible('folio-essay-teaching-from-index-zero') === false, 'Folio draft is strictly inaccessible to public');
  assert(isItemPubliclyAccessible('atlas-soft-skills') === false, 'Planned Atlas roadmap is strictly inaccessible to public');
  assert(isItemPubliclyAccessible('dld-unit-3') === false, 'Planned DLD Unit III is strictly inaccessible to public');

  // Test forcing isPublic on draft via overrides: must still return false
  const forcedDraftOverrides = { 'readout-article-relays-to-tensors': true, 'atlas-soft-skills': true };
  assert(isItemPubliclyAccessible('readout-article-relays-to-tensors', forcedDraftOverrides) === false, 'Draft remains strictly hidden even if override isPublic = true');
  assert(isItemPubliclyAccessible('atlas-soft-skills', forcedDraftOverrides) === false, 'Unpublished roadmap remains strictly hidden even if override isPublic = true');

  // Hierarchical Inheritance: Hiding a pillar hides all descendants
  const hideWorkbenchOverrides = { 'pillar-workbench': false };
  assert(isItemPubliclyAccessible('pillar-workbench', hideWorkbenchOverrides) === false, 'Workbench is hidden when override is false');
  assert(isItemPubliclyAccessible('dld-unit-1', hideWorkbenchOverrides) === false, 'Hiding Workbench automatically hides Unit I');
  assert(isItemPubliclyAccessible('dld-sec-1.1', hideWorkbenchOverrides) === false, 'Hiding Workbench automatically hides Section 1.1');
  assert(isItemPubliclyAccessible('workbench-tool-solvers', hideWorkbenchOverrides) === false, 'Hiding Workbench automatically hides Solvers Suite');
  assert(isItemPubliclyAccessible('pillar-atlas', hideWorkbenchOverrides) === true, 'Other pillars remain unaffected when Workbench is hidden');

  // Hierarchical Inheritance: Hiding a unit hides its sections, leaving sibling units visible
  const hideUnit1Overrides = { 'dld-unit-1': false };
  assert(isItemPubliclyAccessible('dld-sec-1.1', hideUnit1Overrides) === false, 'Hiding Unit I hides Section 1.1');
  assert(isItemPubliclyAccessible('dld-sec-1.7', hideUnit1Overrides) === false, 'Hiding Unit I hides Section 1.7');
  assert(isItemPubliclyAccessible('dld-unit-2', hideUnit1Overrides) === true, 'Unit II remains publicly accessible when Unit I is hidden');
  assert(isItemPubliclyAccessible('dld-sec-2.1', hideUnit1Overrides) === true, 'Section 2.1 remains publicly accessible when Unit I is hidden');

  // Route Accessibility
  assert(isRoutePubliclyAccessible('home') === true, 'Route #home is accessible');
  assert(isRoutePubliclyAccessible('workbench') === true, 'Route #workbench is accessible by default');
  assert(isRoutePubliclyAccessible('workbench', hideWorkbenchOverrides) === false, 'Route #workbench is blocked when pillar is hidden');

  // -------------------------------------------------------------------------
  // 3. Authorization and Safeguards Enforcement
  // -------------------------------------------------------------------------
  console.log('\n--- 3. Testing Authorization and Admin Safeguards ---');
  const contentRegistryService = await import('../src/services/contentRegistryService.js');
  const { updateItemVisibility, fetchUnpublishedDraft } = contentRegistryService;

  // Unauthenticated user attempting to modify visibility
  const unauthRes = await updateItemVisibility({
    itemId: 'dld-unit-1',
    isPublic: false,
    adminSession: { isAuthenticated: false, isOwner: false }
  });
  assert(unauthRes.success === false, 'Unauthenticated user cannot change content visibility');

  // Authenticated non-owner attempting to modify visibility
  const nonOwnerRes = await updateItemVisibility({
    itemId: 'dld-unit-1',
    isPublic: false,
    adminSession: { isAuthenticated: true, isOwner: false, email: 'student@example.com' }
  });
  assert(nonOwnerRes.success === false, 'Non-owner account cannot change content visibility');

  // Attempting to publish an unapproved draft item
  const validOwnerSession = {
    isAuthenticated: true,
    isOwner: true,
    email: 'jampana13411@gmail.com',
    userId: 'test-owner-uuid',
    assuranceLevel: 'aal2',
    hasMfaEnrolled: true,
    isSimulated: true
  };

  const publishDraftRes = await updateItemVisibility({
    itemId: 'readout-article-relays-to-tensors',
    isPublic: true,
    adminSession: validOwnerSession
  });
  assert(publishDraftRes.success === false, 'Attempt to publish an unapproved draft is rejected with explicit safeguard error');

  // Legitimate update on published item
  const validUpdateRes = await updateItemVisibility({
    itemId: 'dld-unit-1',
    isPublic: false,
    adminSession: validOwnerSession
  });
  assert(validUpdateRes.success === true, 'Verified owner can successfully toggle visibility of approved published items');

  // Draft inspection access check
  const unauthDraftRes = await fetchUnpublishedDraft('readout-article-relays-to-tensors', { isAuthenticated: false });
  assert(unauthDraftRes.success === false, 'Unauthenticated visitor cannot fetch unpublished draft content');

  const authDraftRes = await fetchUnpublishedDraft('readout-article-relays-to-tensors', validOwnerSession);
  assert(authDraftRes.success === true && Boolean(authDraftRes.draft?.content), 'Verified owner can securely inspect unpublished draft content');

  // -------------------------------------------------------------------------
  // 4. Supabase Diagnostics and Honest Detection
  // -------------------------------------------------------------------------
  console.log('\n--- 4. Testing Supabase Configuration and Environment Diagnostics ---');
  const supabaseClientModule = await import('../src/services/supabaseClient.js');
  const { isSupabaseConfigured, getSupabaseConfigStatus } = supabaseClientModule;

  const status = getSupabaseConfigStatus();
  assert(typeof status.isConfigured === 'boolean', 'Configuration status returns boolean isConfigured');
  assert(typeof status.maskedUrl === 'string', 'Configuration status provides masked project URL');
  assert(isSupabaseConfigured() === false, 'Honest detection reports unconfigured when live credentials are not set');

  // -------------------------------------------------------------------------
  // 5. Schema and Migration Artifacts Verification
  // -------------------------------------------------------------------------
  console.log('\n--- 5. Testing Schema and Migration Artifacts ---');
  const sqlPath = path.join(rootDir, 'supabase', 'migrations', '20261021000001_admin_content_system.sql');
  assert(fs.existsSync(sqlPath), 'SQL migration file exists: 20261021000001_admin_content_system.sql');

  const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS public.admin_users'), 'Migration defines admin_users table');
  assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS public.content_registry'), 'Migration defines content_registry table');
  assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS public.admin_audit_logs'), 'Migration defines admin_audit_logs table');
  assert(sqlContent.includes('CREATE TABLE IF NOT EXISTS public.unpublished_drafts'), 'Migration defines unpublished_drafts table');
  assert(sqlContent.includes('ENABLE ROW LEVEL SECURITY'), 'Migration enables Row Level Security on tables');
  assert(sqlContent.includes('public.is_admin()'), 'Migration provides security definer is_admin() function');

  const guidePath = path.join(rootDir, 'supabase', 'SETUP_GUIDE.md');
  assert(fs.existsSync(guidePath), 'Supabase setup guide exists: SETUP_GUIDE.md');
  const guideContent = fs.readFileSync(guidePath, 'utf8');
  assert(guideContent.includes('Disable Public Signups'), 'Setup guide includes mandatory step to disable public registration');
  assert(guideContent.includes('jampana13411@gmail.com'), 'Setup guide references owner email');

  const auditPath = path.join(rootDir, 'project-memory', 'CONTENT_CONFIDENTIALITY_AUDIT.md');
  assert(fs.existsSync(auditPath), 'Content confidentiality audit document exists');

  // -------------------------------------------------------------------------
  // 6. Zero-Dash Standard Compliance
  // -------------------------------------------------------------------------
  console.log('\n--- 6. Testing Zero-Dash Standard across Admin System Files ---');
  const filesToAudit = [
    'src/data/centralContentRegistry.js',
    'src/services/supabaseClient.js',
    'src/services/authService.js',
    'src/services/contentRegistryService.js',
    'src/components/AboutModal.jsx',
    'src/components/admin/AdminLogin.jsx',
    'src/components/admin/AdminDashboard.jsx',
    'src/components/admin/MfaEnrollModal.jsx',
    'src/components/admin/AuditLogModal.jsx',
    'src/components/admin/SecureDraftPreviewModal.jsx',
    'src/components/admin/SupabaseSetupModal.jsx',
    'src/App.jsx',
    'supabase/migrations/20261021000001_admin_content_system.sql',
    'supabase/SETUP_GUIDE.md',
    'project-memory/CONTENT_CONFIDENTIALITY_AUDIT.md'
  ];

  filesToAudit.forEach(relPath => {
    const fullPath = path.join(rootDir, relPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const hasEmDash = content.includes('\u2014');
      const hasEnDash = content.includes('\u2013');
      assert(!hasEmDash && !hasEnDash, `${relPath} complies with Zero-Dash standard (0 em/en-dashes)`);
    } else {
      assert(false, `Expected file exists: ${relPath}`);
    }
  });

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log('\n=================================================================');
  console.log(`ADMIN SYSTEM AUDIT SUMMARY: ${passedTests} passed, ${failedTests} failed (out of ${totalTests} checks)`);
  console.log('=================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runSuite().catch(err => {
  console.error('Fatal error during test suite execution:', err);
  process.exit(1);
});
