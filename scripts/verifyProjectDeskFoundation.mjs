/**
 * ZeroIndex Automated Verification Suite: Project Desk Phase 1 Secure Foundation
 * File: scripts/verifyProjectDeskFoundation.mjs
 * 
 * Verifies:
 * 1. Migration SQL structure, constraints, RLS policies, and AAL2 protections.
 * 2. Curated initial inventory (active vs superseded decisions, required fields).
 * 3. Project Desk service layer CRUD execution and sanitized snapshot generation.
 * 4. Strict zero em-dash and zero en-dash compliance across all touched files.
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
console.log('ZeroIndex Project Desk Phase 1: Secure Foundation Verification');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: DATABASE MIGRATION SCRIPT AUDIT
// -----------------------------------------------------------------------------
console.log('SUITE 1: Database Migration SQL Audit');
const migrationPath = path.join(root, 'supabase', 'migrations', '20261028000001_project_desk_foundation.sql');
assert(fs.existsSync(migrationPath), 'Migration file exists: 20261028000001_project_desk_foundation.sql');

if (fs.existsSync(migrationPath)) {
  const sql = fs.readFileSync(migrationPath, 'utf8');

  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.project_desk_items'), 'Creates project_desk_items table');
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.project_desk_meta'), 'Creates project_desk_meta table');
  assert(sql.includes("CHECK (item_type IN ('idea', 'plan', 'decision', 'requirement'))"), 'Valid item_type constraint configured');
  assert(sql.includes("CHECK (category IN ('workbench', 'atlas', 'journal', 'teaching_note', 'general'))"), 'Valid category constraint with teaching_note configured');
  assert(sql.includes("CHECK (pillar IN ('workbench', 'atlas', 'journal', 'general'))"), 'Valid three-pillar and general constraint configured');
  assert(sql.includes('ALTER TABLE public.project_desk_items ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on project_desk_items');
  assert(sql.includes('ALTER TABLE public.project_desk_meta ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on project_desk_meta');
  assert(sql.includes('REVOKE ALL ON public.project_desk_items FROM anon, public;'), 'Revokes all permissions on project_desk_items from anon and public');
  assert(sql.includes('REVOKE ALL ON public.project_desk_meta FROM anon, public;'), 'Revokes all permissions on project_desk_meta from anon and public');
  assert(sql.includes('USING (public.is_admin())'), 'SELECT policy requires verified admin');
  assert(sql.includes('WITH CHECK (public.is_admin_aal2())'), 'INSERT policy requires verified admin with AAL2');
  assert(sql.includes('USING (public.is_admin_aal2())') && sql.includes('WITH CHECK (public.is_admin_aal2())'), 'UPDATE policy requires AAL2 MFA');
  assert(sql.includes('CREATE TRIGGER trg_project_desk_items_updated_at'), 'Trigger for automatic updated_at timestamp configured');
}

// -----------------------------------------------------------------------------
// SUITE 2: CURATED INITIAL INVENTORY AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 2: Curated Initial Decisions and Requirements Inventory Audit');
const seedPath = path.join(root, 'src', 'data', 'projectDeskSeedData.js');
assert(fs.existsSync(seedPath), 'Seed data file exists: src/data/projectDeskSeedData.js');

const { initialProjectDeskItems, initialProjectDeskMeta } = await import(`file://${seedPath}`);

assert(Array.isArray(initialProjectDeskItems) && initialProjectDeskItems.length >= 8, `Seed items loaded (${initialProjectDeskItems.length} items)`);
assert(Boolean(initialProjectDeskMeta && initialProjectDeskMeta.continue_where_left_off), 'initialProjectDeskMeta contains continue_where_left_off');

// Validate D-040 Three-Pillar Decision
const dec3Pillar = initialProjectDeskItems.find(i => i.decision_ref === 'D-040');
assert(Boolean(dec3Pillar), 'Decision D-040 (Three-Pillar Consolidation) is present');
assert(dec3Pillar?.status === 'active', 'Decision D-040 is marked active');

// Validate D-001 Five-Pillar Decision (Superseded)
const dec5Pillar = initialProjectDeskItems.find(i => i.decision_ref === 'D-001');
assert(Boolean(dec5Pillar), 'Decision D-001 (Five-Pillar Architecture) is present');
assert(dec5Pillar?.status === 'superseded', 'Decision D-001 is correctly marked superseded');

// Validate D-039 Faculty-First Academic Content Rule
const decFacultyFirst = initialProjectDeskItems.find(i => i.decision_ref === 'D-039');
assert(Boolean(decFacultyFirst), 'Decision D-039 (Faculty-First Academic Content) is present');
assert(decFacultyFirst?.status === 'active', 'Decision D-039 is marked active');

// Validate D-041 Roadmap Progression
const decRoadmap = initialProjectDeskItems.find(i => i.decision_ref === 'D-041');
assert(Boolean(decRoadmap), 'Decision D-041 (Start -> Try -> Next Roadmap) is present');
assert(decRoadmap?.status === 'active', 'Decision D-041 is marked active');

// Validate D-042 Flexible Schedule
const decSchedule = initialProjectDeskItems.find(i => i.decision_ref === 'D-042');
assert(Boolean(decSchedule), 'Decision D-042 (Flexible Content Cadence) is present');
assert(decSchedule?.status === 'active', 'Decision D-042 is marked active');

// Validate Teaching Notes Entry
const teachingNote = initialProjectDeskItems.find(i => i.category === 'teaching_note');
assert(Boolean(teachingNote), 'Teaching note entry present in initial inventory');
assert(teachingNote?.item_type === 'idea', 'Teaching note uses item_type idea with category teaching_note');

// Validate required item fields
let allFieldsValid = true;
for (const item of initialProjectDeskItems) {
  if (!item.id || !item.item_type || !item.category || !item.pillar || !item.title || !item.content || !item.status) {
    allFieldsValid = false;
    break;
  }
}
assert(allFieldsValid, 'All initial seed items contain required schema fields');

// -----------------------------------------------------------------------------
// SUITE 3: PROJECT DESK SERVICE OPERATIONS AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 3: Project Desk Service Layer CRUD Operations Audit');
const servicePath = path.join(root, 'src', 'services', 'projectDeskService.js');
assert(fs.existsSync(servicePath), 'Service file exists: src/services/projectDeskService.js');

const deskService = await import(`file://${servicePath}`);

// Test fetchProjectDeskItems
const fetchRes = await deskService.fetchProjectDeskItems();
assert(fetchRes.success === true, 'fetchProjectDeskItems executes successfully');
assert(fetchRes.items.length >= 8, `fetchProjectDeskItems returns initial items (${fetchRes.items.length})`);

// Test filtering by itemType
const filterPlanRes = await deskService.fetchProjectDeskItems({ itemType: 'plan' });
assert(filterPlanRes.success === true && filterPlanRes.items.every(i => i.item_type === 'plan'), 'Filtering by itemType plan works correctly');

// Test search query
const searchRes = await deskService.fetchProjectDeskItems({ searchQuery: 'Three-Pillar' });
assert(searchRes.success === true && searchRes.items.some(i => i.title.includes('Three-Pillar')), 'Search query filter works correctly');

// Test createProjectDeskItem authorization
const unauthCreate = await deskService.createProjectDeskItem({ title: 'Unauthorized Test' }, null);
assert(unauthCreate.success === false && unauthCreate.error.includes('Unauthorized'), 'Unauthenticated create is rejected');

// Test authorized create in memory
const mockOwnerSession = { isOwner: true, email: 'owner@zeroindex.org' };
const createRes = await deskService.createProjectDeskItem({
  title: 'Test Verification Task',
  content: 'Automated test content',
  item_type: 'plan',
  category: 'general',
  status: 'now'
}, mockOwnerSession);
assert(createRes.success === true && createRes.item?.id, 'Authorized create succeeds in memory');

// Test updateProjectDeskItem
const updateRes = await deskService.updateProjectDeskItem(createRes.item.id, {
  status: 'completed',
  title: 'Test Verification Task (Updated)'
}, mockOwnerSession);
assert(updateRes.success === true && updateRes.item?.status === 'completed', 'Authorized update succeeds in memory');

// Test deleteProjectDeskItem
const deleteRes = await deskService.deleteProjectDeskItem(createRes.item.id, mockOwnerSession);
assert(deleteRes.success === true, 'Authorized delete succeeds in memory');

// Test fetchProjectDeskMeta & saveProjectDeskMeta
const metaRes = await deskService.fetchProjectDeskMeta('continue_where_left_off');
assert(metaRes.success === true && Boolean(metaRes.payload?.note), 'fetchProjectDeskMeta retrieves continue note');

const saveMetaRes = await deskService.saveProjectDeskMeta('continue_where_left_off', {
  ...metaRes.payload,
  note: 'Updated by automated verification test'
}, mockOwnerSession);
assert(saveMetaRes.success === true, 'saveProjectDeskMeta updates metadata');

// Test sanitized snapshot generator
const snapshot = deskService.generateSanitizedProjectSnapshot({
  items: fetchRes.items,
  meta: { continue_where_left_off: metaRes.payload },
  version: '2.0.0'
});

assert(snapshot.system === 'ZeroIndex Project Desk', 'Snapshot has correct system title');
assert(snapshot.exportFormatVersion === '1.0.0', 'Snapshot has format version');
assert(snapshot.statistics.totalItems > 0, 'Snapshot computes item statistics');
assert(!JSON.stringify(snapshot).includes('service_role'), 'Snapshot does not contain service_role strings');
assert(!JSON.stringify(snapshot).includes('secret_key'), 'Snapshot does not contain secret_key strings');
assert(!JSON.stringify(snapshot).includes('access_token'), 'Snapshot does not contain access_token strings');
assert(!JSON.stringify(snapshot).includes('refresh_token'), 'Snapshot does not contain refresh_token strings');
assert(!JSON.stringify(snapshot).includes('password_hash'), 'Snapshot does not contain password_hash strings');

// -----------------------------------------------------------------------------
// SUITE 4: ZERO EM-DASH AND ZERO EN-DASH AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 4: Zero Em-Dash and Zero En-Dash Audit');

const filesToAudit = [
  migrationPath,
  seedPath,
  servicePath,
  path.join(root, 'scripts', 'verifyProjectDeskFoundation.mjs'),
  path.join(root, 'project-memory', 'DECISIONS.md'),
  path.join(root, 'project-memory', 'CURRENT_STATE.md'),
  path.join(root, 'project-memory', 'ROADMAP.md')
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
assert(totalDashViolations === 0, 'Zero em-dashes and zero en-dashes verified across all Phase 1 files');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`Verification Complete: ${passedChecks}/${totalChecks} assertions passed (${failedChecks} failures).`);
console.log('================================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
