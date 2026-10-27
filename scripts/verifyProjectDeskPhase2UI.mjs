/**
 * ZeroIndex Automated Verification Suite: Project Desk Phase 2 Minimal Admin Interface
 * File: scripts/verifyProjectDeskPhase2UI.mjs
 * 
 * Verifies:
 * 1. ProjectDeskView and AdminDashboard components compile and render cleanly via SSR.
 * 2. Three core areas (Idea Inbox, Development Desk NOW/NEXT/LATER, Project Memory) exist.
 * 3. Continue Where I Left Off status bar is rendered.
 * 4. Workspace switcher between Publishing Controls and Project Desk is present.
 * 5. Strict zero em-dash and zero en-dash compliance across all Phase 2 files.
 * 
 * Standard: Strictly zero em-dashes and zero en-dashes across all lines.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

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
console.log('ZeroIndex Project Desk Phase 2: Minimal Admin Interface Verification');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: FILE EXISTENCE & SYNTAX AUDIT
// -----------------------------------------------------------------------------
console.log('SUITE 1: Component File Existence and Syntax Audit');
const projectDeskViewPath = path.join(root, 'src', 'components', 'admin', 'ProjectDeskView.jsx');
const adminDashboardPath = path.join(root, 'src', 'components', 'admin', 'AdminDashboard.jsx');

assert(fs.existsSync(projectDeskViewPath), 'ProjectDeskView.jsx exists');
assert(fs.existsSync(adminDashboardPath), 'AdminDashboard.jsx exists');

const deskCode = fs.readFileSync(projectDeskViewPath, 'utf8');
const adminCode = fs.readFileSync(adminDashboardPath, 'utf8');

assert(adminCode.includes("import { ProjectDeskView } from './ProjectDeskView'"), 'AdminDashboard imports ProjectDeskView');
assert(adminCode.includes('workspaceMode'), 'AdminDashboard defines workspaceMode state');
assert(adminCode.includes('Publishing Controls') && adminCode.includes('Project Desk'), 'AdminDashboard includes workspace switcher labels');

assert(deskCode.includes('Continue Where I Left Off'), 'ProjectDeskView renders Continue Where I Left Off bar');
assert(deskCode.includes('Development Desk'), 'ProjectDeskView renders Development Desk tab');
assert(deskCode.includes('Idea Inbox'), 'ProjectDeskView renders Idea Inbox tab');
assert(deskCode.includes('Project Memory'), 'ProjectDeskView renders Project Memory tab');
assert(deskCode.includes('NOW') && deskCode.includes('NEXT') && deskCode.includes('LATER'), 'ProjectDeskView renders NOW, NEXT, LATER columns');

// -----------------------------------------------------------------------------
// SUITE 2: SSR RENDERING SMOKE TEST
// -----------------------------------------------------------------------------
console.log('\nSUITE 2: SSR Component Rendering Smoke Test');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  ssr: {
    external: ['react', 'react-dom', 'lucide-react', 'antd']
  }
});

try {
  // Test 1: ProjectDeskView SSR
  const { ProjectDeskView } = await vite.ssrLoadModule('/src/components/admin/ProjectDeskView.jsx');
  const mockAdminSession = {
    isAuthenticated: true,
    isOwner: true,
    email: 'jampana13411@gmail.com',
    hasMfaEnrolled: true,
    assuranceLevel: 'aal2'
  };

  const htmlDesk = ReactDOMServer.renderToString(
    React.createElement(ProjectDeskView, { adminSession: mockAdminSession })
  );

  assert(htmlDesk.length > 500, `ProjectDeskView rendered successfully via SSR (${htmlDesk.length} bytes)`);
  assert(htmlDesk.includes('Continue Where I Left Off'), 'SSR output contains Continue Where I Left Off');
  assert(htmlDesk.includes('Development Desk'), 'SSR output contains Development Desk');
  assert(htmlDesk.includes('Idea Inbox'), 'SSR output contains Idea Inbox');
  assert(htmlDesk.includes('Project Memory'), 'SSR output contains Project Memory');
  assert(htmlDesk.includes('NOW') && htmlDesk.includes('NEXT') && htmlDesk.includes('LATER'), 'SSR output contains NOW/NEXT/LATER columns');
  assert(htmlDesk.includes('Export Clean Snapshot'), 'SSR output contains Export Clean Snapshot action');

  // Test 2: AdminDashboard SSR with Workspace Switcher
  const { AdminDashboard } = await vite.ssrLoadModule('/src/components/admin/AdminDashboard.jsx');
  const htmlAdmin = ReactDOMServer.renderToString(
    React.createElement(AdminDashboard, { adminSession: mockAdminSession })
  );

  assert(htmlAdmin.length > 1000, `AdminDashboard rendered successfully via SSR (${htmlAdmin.length} bytes)`);
  assert(htmlAdmin.includes('Publishing Controls'), 'SSR output contains Publishing Controls button');
  assert(htmlAdmin.includes('Project Desk'), 'SSR output contains Project Desk button');
} catch (err) {
  assert(false, `SSR Rendering failed with error: ${err.message}`);
  console.error(err);
} finally {
  await vite.close();
}

// -----------------------------------------------------------------------------
// SUITE 3: ZERO EM-DASH AND ZERO EN-DASH AUDIT
// -----------------------------------------------------------------------------
console.log('\nSUITE 3: Zero Em-Dash and Zero En-Dash Audit');

const filesToAudit = [
  projectDeskViewPath,
  adminDashboardPath,
  path.join(root, 'src', 'services', 'projectDeskService.js'),
  path.join(root, 'src', 'data', 'projectDeskSeedData.js'),
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
assert(totalDashViolations === 0, 'Zero em-dashes and zero en-dashes verified across all Phase 2 files');

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
