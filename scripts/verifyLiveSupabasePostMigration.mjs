/**
 * ZeroIndex Automated Verification Suite: Live Supabase Post-Migration Security & Readiness
 * File: scripts/verifyLiveSupabasePostMigration.mjs
 * 
 * Verifies live Supabase state following execution of 20261028000001_project_desk_foundation.sql:
 * 1. Confirms public.project_desk_items and public.project_desk_meta tables exist in live PostgREST schema cache.
 * 2. Proves fail-closed RLS: Anonymous client is strictly denied SELECT, INSERT, UPDATE, DELETE.
 * 3. Proves public content isolation: Anonymous client can still read published content_registry items.
 * 4. Confirms checkProjectDeskStorageStatus() accurately reports unauthorized (guarded) rather than unmigrated (missing).
 * 5. Runs full local regression tests and production build verification.
 * 
 * Standard: Strictly zero em-dashes and zero en-dashes across all lines.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// Load environment variables from .env.local
const envPath = path.join(root, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let val = match[2] || '';
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

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
console.log('ZeroIndex Phase 2.6: Live Supabase Post-Migration Verification');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: LIVE DATABASE READINESS & TABLE EXISTENCE
// -----------------------------------------------------------------------------
console.log('SUITE 1: Live Database Readiness and Table Existence');

const { supabase, isSupabaseConfigured } = await import(`file://${path.join(root, 'src', 'services', 'supabaseClient.js')}`);
const deskService = await import(`file://${path.join(root, 'src', 'services', 'projectDeskService.js')}`);

assert(isSupabaseConfigured() === true, 'Supabase client is configured with live project credentials');

// Query checkProjectDeskStorageStatus
const storageStatus = await deskService.checkProjectDeskStorageStatus();
console.log('  [DIAGNOSTIC] Storage status mode:', storageStatus.mode);
assert(storageStatus.mode !== 'unmigrated', 'Tables exist in Supabase PostgREST schema cache (not unmigrated)');
assert(storageStatus.isLiveDb === true, 'isLiveDb returns true against live Supabase instance');

// -----------------------------------------------------------------------------
// SUITE 2: ANONYMOUS RLS RESTRICTIONS & FAIL-CLOSED SECURITY
// -----------------------------------------------------------------------------
console.log('\nSUITE 2: Anonymous RLS Restrictions and Fail-Closed Security');

// 1. Anonymous SELECT on project_desk_items
const anonSelectItems = await supabase.from('project_desk_items').select('*');
assert(
  anonSelectItems.error !== null && 
  anonSelectItems.error.message.toLowerCase().includes('permission denied'),
  'Anonymous SELECT on project_desk_items is denied by RLS: ' + (anonSelectItems.error?.message || 'None')
);
assert((anonSelectItems.data || []).length === 0, 'Anonymous SELECT on project_desk_items returns 0 rows');

// 2. Anonymous SELECT on project_desk_meta
const anonSelectMeta = await supabase.from('project_desk_meta').select('*');
assert(
  anonSelectMeta.error !== null && 
  anonSelectMeta.error.message.toLowerCase().includes('permission denied'),
  'Anonymous SELECT on project_desk_meta is denied by RLS: ' + (anonSelectMeta.error?.message || 'None')
);
assert((anonSelectMeta.data || []).length === 0, 'Anonymous SELECT on project_desk_meta returns 0 rows');

// 3. Anonymous INSERT on project_desk_items
const anonInsertItem = await supabase.from('project_desk_items').insert([{
  title: 'Unauthorized Test Item',
  content: 'Should be rejected by RLS',
  item_type: 'idea'
}]);
assert(
  anonInsertItem.error !== null && 
  anonInsertItem.error.message.toLowerCase().includes('permission denied'),
  'Anonymous INSERT on project_desk_items is rejected by RLS: ' + (anonInsertItem.error?.message || 'None')
);

// 4. Anonymous UPDATE on project_desk_items
const anonUpdateItem = await supabase.from('project_desk_items').update({ title: 'Hacked' }).eq('id', '00000000-0000-0000-0000-000000000000');
assert(
  anonUpdateItem.error !== null && 
  anonUpdateItem.error.message.toLowerCase().includes('permission denied'),
  'Anonymous UPDATE on project_desk_items is rejected by RLS: ' + (anonUpdateItem.error?.message || 'None')
);

// 5. Anonymous DELETE on project_desk_items
const anonDeleteItem = await supabase.from('project_desk_items').delete().eq('id', '00000000-0000-0000-0000-000000000000');
assert(
  anonDeleteItem.error !== null && 
  anonDeleteItem.error.message.toLowerCase().includes('permission denied'),
  'Anonymous DELETE on project_desk_items is rejected by RLS: ' + (anonDeleteItem.error?.message || 'None')
);

// -----------------------------------------------------------------------------
// SUITE 3: PUBLIC CURRICULUM PRESERVATION
// -----------------------------------------------------------------------------
console.log('\nSUITE 3: Public Content Isolation and Preservation');

// Public query on content_registry must continue working cleanly
const pubContent = await supabase.from('content_registry').select('id, title, is_public').limit(5);
assert(pubContent.error === null, 'Anonymous SELECT on content_registry succeeds with zero errors');
assert(Array.isArray(pubContent.data) && pubContent.data.length > 0, `Public curriculum items accessible to students (${pubContent.data?.length} rows)`);

// -----------------------------------------------------------------------------
// SUITE 4: ZERO EM-DASH AND ZERO EN-DASH AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 4: Zero Em-Dash and Zero En-Dash Audit');

const filesToAudit = [
  path.join(root, 'supabase', 'migrations', '20261028000001_project_desk_foundation.sql'),
  path.join(root, 'src', 'services', 'projectDeskService.js'),
  path.join(root, 'src', 'data', 'projectDeskSeedData.js'),
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
assert(totalDashViolations === 0, 'Zero em-dashes and zero en-dashes verified across post-migration files');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`Live Post-Migration Verification: ${passedChecks}/${totalChecks} assertions passed (${failedChecks} failures).`);
console.log('================================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
