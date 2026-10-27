/**
 * ZeroIndex Automated Verification Suite: Project Desk Idea Inbox Bug Fix Verification
 * File: scripts/verifyIdeaInboxFix.mjs
 * 
 * Verifies the bug fix for Idea Inbox saving and database-field compatibility:
 * 1. Confirms normalizeDeskItem correctly maps UI classifications (content_idea, improvement, tech_task, teaching_note)
 *    to valid database category and pillar check constraints (SQLSTATE 23514 prevention).
 * 2. Confirms metadata.classification preserves original classification for rich UI rendering and badge display.
 * 3. Confirms AAL1 sessions receive descriptive MFA requirement error instead of generic failure.
 * 4. Confirms non-owner requests are rejected cleanly.
 * 5. Tests SSR rendering of ProjectDeskView with the new form state and error displays.
 * 6. Confirms zero em-dash and zero en-dash compliance.
 * 
 * Standard: Strictly zero em-dashes and zero en-dashes across all code and text.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

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
console.log('ZeroIndex Idea Inbox Bug Fix: Automated Verification Suite');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: SCHEMA COMPATIBILITY & FIELD NORMALIZATION AUDIT
// -----------------------------------------------------------------------------
console.log('SUITE 1: Schema Compatibility & Field Normalization Audit');

const deskService = await import(`file://${path.join(root, 'src', 'services', 'projectDeskService.js')}`);
const validDbCategories = ['workbench', 'atlas', 'journal', 'teaching_note', 'general'];
const validDbPillars = ['workbench', 'atlas', 'journal', 'general'];
const validDbItemTypes = ['idea', 'plan', 'decision', 'requirement'];
const validDbStatuses = [
  'new', 'under_review', 'approved', 'parked', 'discarded',
  'now', 'next', 'later', 'completed',
  'active', 'superseded'
];

assert(typeof deskService.normalizeDeskItem === 'function', 'normalizeDeskItem function is exported');

// Test Case 1: content_idea with workbench pillar
const item1 = deskService.normalizeDeskItem({
  title: 'Boolean Minimization Quiz Bank Expansion',
  content: 'Add 20 new worked models for POS simplifications.',
  item_type: 'idea',
  category: 'content_idea',
  pillar: 'workbench'
});
assert(validDbCategories.includes(item1.category), `content_idea category mapped to valid DB category: "${item1.category}"`);
assert(validDbPillars.includes(item1.pillar), `pillar is valid DB pillar: "${item1.pillar}"`);
assert(validDbItemTypes.includes(item1.item_type), `item_type is valid DB item_type: "${item1.item_type}"`);
assert(item1.metadata?.classification === 'content_idea', 'metadata.classification preserves "content_idea"');
assert(Array.isArray(item1.tags) && item1.tags.includes('content_idea'), 'tags includes "content_idea"');

// Test Case 2: teaching_note with workbench pillar
const item2 = deskService.normalizeDeskItem({
  title: 'Classroom Formula Retention Observation',
  content: 'Students solve diminished radix complements faster with r^n - N - 1.',
  item_type: 'idea',
  category: 'teaching_note',
  pillar: 'workbench'
});
assert(item2.category === 'teaching_note', `teaching_note category preserved: "${item2.category}"`);
assert(item2.metadata?.classification === 'teaching_note', 'metadata.classification preserves "teaching_note"');

// Test Case 3: improvement with general pillar
const item3 = deskService.normalizeDeskItem({
  title: 'Responsive Grid Alignment on Mobile Safari',
  content: 'Fix padding on small viewport cards.',
  item_type: 'idea',
  category: 'improvement',
  pillar: 'general'
});
assert(validDbCategories.includes(item3.category), `improvement category mapped to valid DB category: "${item3.category}"`);
assert(item3.metadata?.classification === 'improvement', 'metadata.classification preserves "improvement"');

// Test Case 4: tech_task with atlas pillar
const item4 = deskService.normalizeDeskItem({
  title: 'PostgREST Schema Cache Handling',
  content: 'Add PGRST205 error code matching.',
  item_type: 'idea',
  category: 'tech_task',
  pillar: 'atlas'
});
assert(validDbCategories.includes(item4.category), `tech_task category mapped to valid DB category: "${item4.category}"`);
assert(item4.metadata?.classification === 'tech_task', 'metadata.classification preserves "tech_task"');

// -----------------------------------------------------------------------------
// SUITE 2: AUTHORIZATION & AAL2 MFA GUARDS
// -----------------------------------------------------------------------------
console.log('\nSUITE 2: Authorization & AAL2 MFA Guards');

// 1. Unauthenticated / Non-Owner Create
const unauthRes = await deskService.createProjectDeskItem({
  title: 'Unauthenticated Idea'
}, { isOwner: false });
assert(unauthRes.success === false, 'createProjectDeskItem rejects non-owner session');
assert(unauthRes.error.toLowerCase().includes('unauthorized'), 'Returns unauthorized error message');

// 2. AAL1 Session Write Protection (when live Supabase configured)
const aal1Session = {
  isOwner: true,
  email: 'jampana13411@gmail.com',
  assuranceLevel: 'aal1'
};
const aal1Res = await deskService.createProjectDeskItem({
  title: 'AAL1 Blocked Idea',
  category: 'content_idea',
  pillar: 'workbench'
}, aal1Session);

if (deskService.checkProjectDeskStorageStatus) {
  assert(aal1Res.success === false, 'createProjectDeskItem blocks AAL1 session');
  assert(aal1Res.requiresAal2 === true, 'Sets requiresAal2 flag to true');
  assert(aal1Res.error.includes('MFA') || aal1Res.error.includes('AAL2'), 'Returns clear MFA requirement error');
}

// 3. AAL1 Session Update Protection
const aal1Update = await deskService.updateProjectDeskItem('some-id', {
  title: 'AAL1 Update'
}, aal1Session);
assert(aal1Update.success === false, 'updateProjectDeskItem blocks AAL1 session');
assert(aal1Update.requiresAal2 === true, 'updateProjectDeskItem sets requiresAal2 flag');

// 4. AAL1 Session Delete Protection
const aal1Delete = await deskService.deleteProjectDeskItem('some-id', aal1Session);
assert(aal1Delete.success === false, 'deleteProjectDeskItem blocks AAL1 session');
assert(aal1Delete.requiresAal2 === true, 'deleteProjectDeskItem sets requiresAal2 flag');

// 5. AAL1 Session Meta Save Protection
const aal1Meta = await deskService.saveProjectDeskMeta('continue_where_left_off', {
  note: 'AAL1 note'
}, aal1Session);
assert(aal1Meta.success === false, 'saveProjectDeskMeta blocks AAL1 session');
assert(aal1Meta.requiresAal2 === true, 'saveProjectDeskMeta sets requiresAal2 flag');

// -----------------------------------------------------------------------------
// SUITE 3: COMPONENT SSR SMOKE TEST
// -----------------------------------------------------------------------------
console.log('\nSUITE 3: Component SSR Smoke Test');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  ssr: {
    external: ['react', 'react-dom', 'lucide-react', 'antd']
  }
});

try {
  const { ProjectDeskView } = await vite.ssrLoadModule('/src/components/admin/ProjectDeskView.jsx');
  const { AdminLogin } = await vite.ssrLoadModule('/src/components/admin/AdminLogin.jsx');

  const deskHtml = renderToString(React.createElement(ProjectDeskView, {
    initialTab: 'inbox',
    adminSession: {
      isAuthenticated: true,
      isOwner: true,
      email: 'jampana13411@gmail.com',
      assuranceLevel: 'aal2',
      hasMfaEnrolled: true,
      isSimulated: false
    }
  }));
  assert(deskHtml.length > 0, `ProjectDeskView SSR rendered successfully (${deskHtml.length} bytes)`);
  assert(deskHtml.includes('Idea Inbox'), 'SSR output contains Idea Inbox tab');
  assert(deskHtml.includes('Quick Add Idea'), 'SSR output contains Quick Add Idea trigger');

  const loginHtml = renderToString(React.createElement(AdminLogin, {
    onLoginSuccess: () => {},
    onNavigateHome: () => {}
  }));
  assert(loginHtml.length > 0, `AdminLogin SSR rendered successfully (${loginHtml.length} bytes)`);
  assert(loginHtml.includes('Owner Portal'), 'AdminLogin SSR output contains Owner Portal heading');
} catch (err) {
  assert(false, `SSR failed: ${err.message}`);
} finally {
  await vite.close();
}

// -----------------------------------------------------------------------------
// SUITE 4: ZERO EM-DASH AND ZERO EN-DASH AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 4: Zero Em-Dash and Zero En-Dash Audit');

const filesToAudit = [
  path.join(root, 'src', 'services', 'projectDeskService.js'),
  path.join(root, 'src', 'components', 'admin', 'ProjectDeskView.jsx'),
  path.join(root, 'src', 'components', 'admin', 'AdminLogin.jsx'),
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
assert(totalDashViolations === 0, 'Zero em-dashes and zero en-dashes verified across modified files');

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
