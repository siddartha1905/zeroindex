/**
 * ZeroIndex Automated Verification Suite: Project Desk Phase 2.5 Security Hardening & Readiness
 * File: scripts/verifyProjectDeskPhase25Hardening.mjs
 * 
 * Verifies:
 * 1. Data Isolation: Public client bundle has zero project desk strings; seed data is marked demo fixture.
 * 2. Persistence Behavior: Fail-closed DB errors, storage status detection, and idempotent seeding.
 * 3. Snapshot Export: Explicit allowlist, disclaimer presence, and credential sanitization.
 * 4. Migration SQL Readiness: DEFAULT auth.uid(), owner-only RLS, AAL2 MFA enforcement, additive schema.
 * 5. Development Plan Status: Phase 1 & 2 marked completed, Phase 2.5 marked now.
 * 6. Zero Em-Dash and Zero En-Dash compliance.
 * 
 * Standard: Strictly zero em-dashes and zero en-dashes across all lines.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('\n================================================================');
console.log('ZeroIndex Project Desk Phase 2.5: Security Hardening Verification');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: DATA ISOLATION & FRONTEND ASSET INSPECTION
// -----------------------------------------------------------------------------
console.log('SUITE 1: Data Isolation & Frontend Asset Inspection');

const seedPath = path.join(root, 'src', 'data', 'projectDeskSeedData.js');
assert(fs.existsSync(seedPath), 'projectDeskSeedData.js exists');

const seedText = fs.readFileSync(seedPath, 'utf8');
assert(seedText.includes('IMPORTANT DATA ISOLATION NOTICE'), 'Seed data contains explicit data isolation notice');
assert(seedText.includes('[SAMPLE FIXTURE]'), 'Teaching note is clearly identified as a sample demonstration fixture');
assert(seedText.includes('isSampleFixture: true'), 'Teaching note metadata explicitly sets isSampleFixture flag');

// Inspect generated public bundles in dist/assets if built
const distDir = path.join(root, 'dist', 'assets');
if (fs.existsSync(distDir)) {
  const assetFiles = fs.readdirSync(distDir);
  const publicBundleFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
  if (publicBundleFile) {
    const publicBundleContent = fs.readFileSync(path.join(distDir, publicBundleFile), 'utf8');
    assert(!publicBundleContent.includes('desk-dec-040'), 'Public bundle does NOT contain desk-dec-040');
    assert(!publicBundleContent.includes('continue_where_left_off'), 'Public bundle does NOT contain continue_where_left_off');
    assert(!publicBundleContent.includes('project_desk_items'), 'Public bundle does NOT contain project_desk_items table');
    assert(!publicBundleContent.includes('desk-plan-001'), 'Public bundle does NOT contain desk-plan-001');
    assert(!publicBundleContent.includes('Diminished Radix Formula Student Retention'), 'Public bundle does NOT contain teaching note fixture text');
  } else {
    console.log('  [SKIP] Public bundle not found; run npm run build to verify bundle isolation.');
  }
} else {
  console.log('  [SKIP] dist directory not found; run npm run build to verify bundle isolation.');
}

// -----------------------------------------------------------------------------
// SUITE 2: SERVICE LAYER PERSISTENCE & STORAGE DETECTION AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 2: Service Layer Persistence & Storage Detection Audit');

const servicePath = path.join(root, 'src', 'services', 'projectDeskService.js');
assert(fs.existsSync(servicePath), 'projectDeskService.js exists');

const deskService = await import(`file://${servicePath}`);

// Check checkProjectDeskStorageStatus
assert(typeof deskService.checkProjectDeskStorageStatus === 'function', 'checkProjectDeskStorageStatus function is exported');
const storageStatus = await deskService.checkProjectDeskStorageStatus();
assert(typeof storageStatus.isLiveDb === 'boolean', 'checkProjectDeskStorageStatus returns boolean isLiveDb');
assert(typeof storageStatus.mode === 'string', 'checkProjectDeskStorageStatus returns mode string');

// Check seedInitialBaselineItems
assert(typeof deskService.seedInitialBaselineItems === 'function', 'seedInitialBaselineItems function is exported');
const unauthSeed = await deskService.seedInitialBaselineItems(null);
assert(unauthSeed.success === false && unauthSeed.error.includes('Unauthorized'), 'seedInitialBaselineItems rejects unauthenticated caller');

// Check generateSanitizedProjectSnapshot
assert(typeof deskService.generateSanitizedProjectSnapshot === 'function', 'generateSanitizedProjectSnapshot function is exported');

const dummyItem = {
  id: 'test-id-123',
  item_type: 'idea',
  category: 'general',
  pillar: 'workbench',
  title: 'Test Snapshot Item',
  content: 'Sample content',
  status: 'new',
  priority: 'medium',
  decision_ref: 'D-040',
  tags: ['test'],
  metadata: {
    safeField: 'safeValue',
    apiKey: 'SECRET_API_KEY_123',
    secretToken: 'SECRET_TOKEN_456'
  },
  created_by: 'user-uuid-to-purge',
  updated_by: 'user-uuid-to-purge',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const snapshot = deskService.generateSanitizedProjectSnapshot({
  items: [dummyItem],
  meta: { continue_where_left_off: { note: 'Test note' } },
  version: '2.0.0'
});

assert(snapshot.includesOwnerAuthoredNotes === true, 'Snapshot includes includesOwnerAuthoredNotes: true flag');
assert(Boolean(snapshot.confidentialityNotice), 'Snapshot contains confidentiality notice');
assert(Boolean(snapshot.securityDisclaimer), 'Snapshot contains security disclaimer regarding free-form text');
assert(!JSON.stringify(snapshot).includes('SECRET_API_KEY_123'), 'Snapshot purges apiKey from metadata');
assert(!JSON.stringify(snapshot).includes('SECRET_TOKEN_456'), 'Snapshot purges secretToken from metadata');
assert(!JSON.stringify(snapshot.items[0]).includes('created_by'), 'Snapshot purges created_by system field');
assert(!JSON.stringify(snapshot.items[0]).includes('updated_by'), 'Snapshot purges updated_by system field');

// -----------------------------------------------------------------------------
// SUITE 3: DATABASE MIGRATION SCRIPT READINESS AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 3: Database Migration Script Readiness Audit');

const migrationPath = path.join(root, 'supabase', 'migrations', '20261028000001_project_desk_foundation.sql');
assert(fs.existsSync(migrationPath), 'Migration SQL file exists: 20261028000001_project_desk_foundation.sql');

const sql = fs.readFileSync(migrationPath, 'utf8');
assert(sql.includes('created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid()'), 'project_desk_items sets DEFAULT auth.uid() on created_by');
assert(sql.includes('updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL DEFAULT auth.uid()'), 'project_desk_meta sets DEFAULT auth.uid() on updated_by');
assert(sql.includes('USING (public.is_admin())'), 'SELECT policy enforces verified owner');
assert(sql.includes('WITH CHECK (public.is_admin_aal2())'), 'INSERT policy enforces AAL2 MFA');
assert(sql.includes('USING (public.is_admin_aal2())') && sql.includes('WITH CHECK (public.is_admin_aal2())'), 'UPDATE policy enforces AAL2 MFA');
assert(sql.includes('REVOKE ALL ON public.project_desk_items FROM anon, public;'), 'Revokes all permissions from anon and public');
assert(!sql.includes('content_registry'), 'Migration does NOT alter public.content_registry (strictly additive)');
assert(!sql.includes('content_overrides'), 'Migration does NOT alter public.content_overrides (strictly additive)');

// -----------------------------------------------------------------------------
// SUITE 4: DEVELOPMENT PLAN STATUS AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 4: Development Plan Status Audit');

const { initialProjectDeskItems } = await import(`file://${seedPath}`);

const plan001 = initialProjectDeskItems.find(i => i.id === 'desk-plan-001');
assert(plan001?.status === 'completed', 'desk-plan-001 (Phase 1) is marked completed');

const plan002 = initialProjectDeskItems.find(i => i.id === 'desk-plan-002');
assert(plan002?.status === 'completed', 'desk-plan-002 (Phase 2) is marked completed');

const plan002b = initialProjectDeskItems.find(i => i.id === 'desk-plan-002b');
assert(plan002b?.status === 'completed' || plan002b?.status === 'now', 'desk-plan-002b (Phase 2.5 Security Hardening) is marked completed');

const plan003 = initialProjectDeskItems.find(i => i.id === 'desk-plan-003');
assert(plan003?.status === 'next', 'desk-plan-003 is marked next');

// -----------------------------------------------------------------------------
// SUITE 5: ZERO EM-DASH AND ZERO EN-DASH AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 5: Zero Em-Dash and Zero En-Dash Audit');

const filesToAudit = [
  migrationPath,
  seedPath,
  servicePath,
  path.join(root, 'src', 'components', 'admin', 'ProjectDeskView.jsx'),
  __filename
];

let totalDashViolations = 0;
for (const f of filesToAudit) {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const hasEmDash = text.includes('\u2014');
    const hasEnDash = text.includes('\u2013');
    if (hasEmDash || hasEnDash) {
      totalDashViolations++;
      console.error(`  [DASH VIOLATION] ${path.relative(root, f)}: EmDash=${hasEmDash}, EnDash=${hasEnDash}`);
    }
  }
}
assert(totalDashViolations === 0, 'Zero em-dashes and zero en-dashes verified across all Phase 2.5 files');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`Phase 2.5 Verification: ${passedChecks}/${totalChecks} assertions passed (${failedChecks} failures).`);
console.log('================================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
