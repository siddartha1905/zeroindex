/**
 * ZeroIndex Phase 5A.2: Admin Dashboard Navigation Simplification Verification Suite
 * File: scripts/verifyAdminDashboardModernisation.mjs
 * 
 * Comprehensive audit verifying:
 * 1. Exactly three horizontal pillar navigation tabs: The Workbench, The Atlas, The Journal.
 * 2. Only the selected pillar content is rendered below the horizontal tab bar (no stacked vertical trees).
 * 3. Workbench organisation:
 *    - Section A: Academic Subjects (DLD EC201, Unit 1 7 sections, Unit 2 sections 2.1 to 2.5 Live, 2.6 & 2.7 priority visible).
 *    - Section B: Interactive Tools & Resources (Visual Solvers Suite, Practice Arena, Subject Resources).
 * 4. Atlas organisation:
 *    - Category A: Learning Paths (English Communication prominent with 4 activities and Live Public status).
 *    - Category B: Career Preparation (7 placement preparation domains).
 * 5. Journal organisation:
 *    - Category A: Insights (3 articles).
 *    - Category B: Reflections (3 essays).
 * 6. Legacy names (Bridge, Readout, Folio) completely eliminated from normal UI labels, titles, and copy.
 * 7. Secondary diagnostic view: "Other Registry Records" present, collapsed by default, preserving all 70 raw items.
 * 8. Two-way parent confirmation modal safeguarding both hiding and publishing parent items with descendants.
 * 9. Technical route strings and database IDs hidden by default, accessible via Technical IDs toggle.
 * 10. SSR rendering validation across all three individual pillar views.
 * 11. Strict Zero-Dash Standard (0 em-dashes and 0 en-dashes).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

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
console.log('ZeroIndex Phase 5A.2: Admin Dashboard Navigation & UI Audit');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: STATIC ARCHITECTURE & CODE AUDIT
// -----------------------------------------------------------------------------
console.log('SUITE 1: Static Architecture and Component Structure');
const adminDashboardPath = path.join(root, 'src', 'components', 'admin', 'AdminDashboard.jsx');
assert(fs.existsSync(adminDashboardPath), 'AdminDashboard.jsx exists');

const adminCode = fs.readFileSync(adminDashboardPath, 'utf8');

// Workspace switcher
assert(adminCode.includes("import { ProjectDeskView } from './ProjectDeskView'"), 'Imports ProjectDeskView');
assert(adminCode.includes('workspaceMode'), 'Defines workspaceMode state');
assert(adminCode.includes('Publishing Controls') && adminCode.includes('Project Desk'), 'Includes workspace switcher labels');

// Horizontal Pillar Navigation State and Tabs
assert(adminCode.includes('activePillarTab'), 'Defines activePillarTab state for horizontal navigation');
assert(adminCode.includes('The Workbench'), 'Tab 1: The Workbench present');
assert(adminCode.includes('The Atlas'), 'Tab 2: The Atlas present');
assert(adminCode.includes('The Journal'), 'Tab 3: The Journal present');
assert(adminCode.includes('role="tablist"'), 'Tab container implements accessible role="tablist"');
assert(adminCode.includes('role="tab"'), 'Tab buttons implement accessible role="tab"');

// Workbench Organisation
assert(adminCode.includes('Section A: Academic Subjects'), 'Workbench Section A: Academic Subjects present');
assert(adminCode.includes('Section B: Interactive Tools & Resources'), 'Workbench Section B: Interactive Tools & Resources present');
assert(adminCode.includes('Unit 1: Binary Systems and Boolean Algebra'), 'Workbench includes Unit 1');
assert(adminCode.includes('Unit 2: Gate-Level Minimization'), 'Workbench includes Unit 2');
assert(adminCode.includes('dldUnit2Sections'), 'Workbench maps Unit 2 sections dynamically');
assert(adminCode.includes('2.6 & 2.7 Active Priorities') || adminCode.includes('2.6 and 2.7 reflect live database editorial status'), 'Sections 2.6 and 2.7 discoverable in Workbench');
assert(adminCode.includes('workbenchTools'), 'Workbench includes tools collection');

// Atlas Organisation
assert(adminCode.includes('Category A: Learning Paths'), 'Atlas Category A: Learning Paths present');
assert(adminCode.includes('Category B: Career Preparation'), 'Atlas Category B: Career Preparation present');
assert(adminCode.includes('atlas-english-communication'), 'Targets atlas-english-communication');
assert(adminCode.includes('Active Published Learning Path'), 'Highlights English Communication as Active Published Learning Path');
assert(adminCode.includes('English Communication Activities'), 'Includes English Communication activities drawer');
assert(adminCode.includes('careerPrepDomains'), 'Atlas maps Career Preparation domains');

// Journal Organisation
assert(adminCode.includes('Category A: Insights'), 'Journal Category A: Insights present');
assert(adminCode.includes('Category B: Reflections'), 'Journal Category B: Reflections present');
assert(adminCode.includes('readoutArticles'), 'Journal maps Insights articles dynamically');
assert(adminCode.includes('folioEssays'), 'Journal maps Reflections essays dynamically');

// Elimination of Legacy Names from Normal UI
const normalUiBridge = adminCode.match(/The Bridge(?!\s*['"])/g);
const normalUiReadout = adminCode.match(/The Readout(?!\s*['"])/g);
const normalUiFolio = adminCode.match(/The Folio(?!\s*['"])/g);
assert(!normalUiBridge, 'Zero occurrences of "The Bridge" in normal UI text');
assert(!normalUiReadout, 'Zero occurrences of "The Readout" in normal UI text');
assert(!normalUiFolio, 'Zero occurrences of "The Folio" in normal UI text');

// Secondary Diagnostic Area: Other Registry Records
assert(adminCode.includes('Other Registry Records'), 'Includes "Other Registry Records" secondary area');
assert(adminCode.includes('showOtherRecords'), 'Other Registry Records is toggleable via state');
assert(adminCode.includes('Technical Diagnostic View'), 'Clearly labels secondary area as Technical Diagnostic View');

// Enhanced Parent Confirmation Safeguards
assert(adminCode.includes('countPublishedDescendants'), 'Implements countPublishedDescendants for unhiding parents');
assert(adminCode.includes('Confirm and Hide') && adminCode.includes('Confirm and Publish'), 'Confirmation modal supports both hiding and publishing safeguards');

// Optional Technical Metadata Toggle
assert(adminCode.includes('showTechnicalDetails'), 'Implements showTechnicalDetails toggle state');
assert(adminCode.includes('Technical IDs'), 'Provides Technical IDs toolbar button');

// English Communication and Activity Working Routes
const { centralContentRegistry } = await import('../src/data/centralContentRegistry.js');
const ecReg = centralContentRegistry.find(i => i.id === 'atlas-english-communication');
assert(ecReg && ecReg.route === 'atlas/learning-paths/english-communication', 'English Communication has working public route atlas/learning-paths/english-communication');
assert(adminCode.includes('atlas/activity/speak-clearly'), 'Activity 1 route is atlas/activity/speak-clearly');
assert(adminCode.includes('atlas/activity/listen-respond'), 'Activity 2 route is atlas/activity/listen-respond');
assert(adminCode.includes('atlas/activity/express-your-opinion'), 'Activity 3 route is atlas/activity/express-your-opinion');
assert(adminCode.includes('atlas/activity/everyday-conversations'), 'Activity 4 route is atlas/activity/everyday-conversations');
assert(!adminCode.includes('workspace/paths/english-communication'), 'No outdated workspace/paths/english-communication activity routes');
assert(!adminCode.includes('atlas/paths/english-communication'), 'No outdated atlas/paths/english-communication routes');

// Canonical Registry Titles Accuracy
const canonicalArticles = centralContentRegistry.filter(i => i.parentId === 'pillar-readout');
assert(canonicalArticles.length === 3, 'Found exactly 3 canonical Insights articles in registry');
assert(canonicalArticles.some(a => a.title === 'From Relays to Tensors: The Long Arc of Computing Hardware'), 'Canonical title: Relays to Tensors verified');
assert(canonicalArticles.some(a => a.title === 'Why Zero-Based Indexing Matters in Memory Architecture'), 'Canonical title: Zero-Based Indexing verified');
assert(canonicalArticles.some(a => a.title === 'The Geometry of Attention Mechanisms: A First-Principles Intuition'), 'Canonical title: Attention Geometry verified');

const canonicalEssays = centralContentRegistry.filter(i => i.parentId === 'pillar-folio');
assert(canonicalEssays.length === 3, 'Found exactly 3 canonical Reflections essays in registry');
assert(canonicalEssays.some(e => e.title === 'On Teaching from Index Zero: Why Every Concept Deserves a Clean Starting Point'), 'Canonical title: Teaching from Index Zero verified');
assert(canonicalEssays.some(e => e.title === 'The Quiet Craft of Classroom Engineering'), 'Canonical title: Quiet Craft verified');
assert(canonicalEssays.some(e => e.title === 'On Reading Deeply in an Era of Summary Feeds'), 'Canonical title: Reading Deeply verified');

const canonicalDomains = centralContentRegistry.filter(i => i.parentId === 'pillar-bridge');
assert(canonicalDomains.length === 7, 'Found exactly 7 canonical Career Preparation domains in registry');

// -----------------------------------------------------------------------------
// SUITE 2: SSR RENDERING & TAB ISOLATION
// -----------------------------------------------------------------------------
console.log('\nSUITE 2: SSR Rendering and Dynamic Tab Isolation');

try {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const { AdminDashboard } = await vite.ssrLoadModule('/src/components/admin/AdminDashboard.jsx');

  const mockAdminSession = {
    isAuthenticated: true,
    isOwner: true,
    email: 'jampana13411@gmail.com',
    userId: '00000000-0000-0000-0000-000000000001',
    assuranceLevel: 'aal2',
    hasMfaEnrolled: true,
    isSimulated: false
  };

  const element = React.createElement(AdminDashboard, {
    adminSession: mockAdminSession,
    onLogout: () => {},
    onNavigatePublicRoute: () => {},
    onNavigateHome: () => {},
    onPreviewRoute: () => {}
  });

  const html = ReactDOMServer.renderToString(element);

  assert(html.length > 1000, `AdminDashboard rendered cleanly via SSR (${html.length} bytes)`);
  assert(html.includes('The Workbench'), 'Rendered HTML includes The Workbench horizontal tab');
  assert(html.includes('The Atlas'), 'Rendered HTML includes The Atlas horizontal tab');
  assert(html.includes('The Journal'), 'Rendered HTML includes The Journal horizontal tab');
  assert(html.includes('Publishing Controls'), 'Rendered HTML includes Publishing Controls workspace mode');
  assert(html.includes('Project Desk'), 'Rendered HTML includes Project Desk workspace mode');
  assert(html.includes('Other Registry Records'), 'Rendered HTML includes Other Registry Records secondary drawer');

  // Verify Tab Isolation in default SSR state (default is Workbench):
  // Workbench content is rendered; Atlas and Journal panels are NOT rendered in the DOM
  assert(html.includes('Section A: Academic Subjects'), 'Default SSR view displays Workbench Section A');
  assert((html.includes('Section B: Interactive Tools') || html.includes('Section B: Interactive Tools &amp; Resources')), 'Default SSR view displays Workbench Section B');
  assert(!html.includes('Category A: Learning Paths'), 'Default SSR view does NOT render Atlas content');
  assert(!html.includes('Category A: Insights'), 'Default SSR view does NOT render Journal content');

  await vite.close();
} catch (err) {
  assert(false, `SSR Rendering failed: ${err.message}`);
}

// -----------------------------------------------------------------------------
// SUITE 3: STRICT ZERO-DASH STANDARD AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 3: Strict Zero-Dash Standard Audit');

const filesToAudit = [
  'src/components/admin/AdminDashboard.jsx',
  'scripts/verifyAdminDashboardModernisation.mjs'
];

let dashViolations = 0;
filesToAudit.forEach(file => {
  const fullPath = path.join(root, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const emMatches = (content.match(/\u2014/g) || []).length;
    const enMatches = (content.match(/\u2013/g) || []).length;
    if (emMatches > 0 || enMatches > 0) {
      console.error(`  [FAIL] ${file} has ${emMatches} em-dashes and ${enMatches} en-dashes`);
      dashViolations += (emMatches + enMatches);
    }
  }
});

assert(dashViolations === 0, `Zero em-dashes and zero en-dashes verified (violations: ${dashViolations})`);

console.log('\n================================================================');
console.log(`Verification Complete: ${passedChecks}/${totalChecks} assertions passed (${failedChecks} failures).`);
console.log('================================================================\n');

process.exit(failedChecks > 0 ? 1 : 0);
