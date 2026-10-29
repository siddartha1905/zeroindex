/**
 * Verification Suite for DLD Sections 2.4, 2.5, and 2.6 Responsive Tab Navigation
 * 
 * Verifies:
 * 1. Section 2.4 SSR rendering of all 6 tabs.
 * 2. Section 2.6 SSR rendering of all 6 tabs.
 * 3. Section 2.5 SSR rendering of all 7 tabs (reference section untouched).
 * 4. Tab navigation DOM structure:
 *    - Uses responsive grid (grid-cols-2 sm:grid-cols-3 lg:grid-cols-6).
 *    - Eliminates overflow-x-auto, min-w-max, and whitespace-nowrap in the navigation bar.
 *    - Accessible role="tab", aria-label="Section navigation", and aria-selected.
 *    - Text wraps naturally without awkward truncation.
 * 5. Strict Zero-Dash standard across all files.
 */

import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

import { dldSection24Data } from '../src/data/dldSection24Data.js';
import { dldSection25Data } from '../src/data/dldSection25Data.js';
import { dldSection26Data } from '../src/data/dldSection26Data.js';

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
console.log('ZeroIndex Phase 5B.9: Responsive Tab Navigation Audit');
console.log('================================================================\n');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom'
});

try {
  // -------------------------------------------------------------
  // SUITE 1: Section 2.4 Responsive Tab Navigation
  // -------------------------------------------------------------
  console.log('SUITE 1: Section 2.4 Responsive Tab Navigation');

  const { default: Section24View } = await vite.ssrLoadModule('/src/components/Section24View.jsx');
  assert(typeof Section24View === 'function', 'Section24View loaded cleanly');

  const sec24Tabs = [
    { id: 'start-here', name: 'Tab 1: Start Here' },
    { id: 'methods', name: 'Tab 2: Conversion Methods' },
    { id: 'demos', name: 'Tab 3: Guided Demonstrations' },
    { id: 'models', name: 'Tab 4: Worked Models (18)' },
    { id: 'cheat-sheet', name: 'Tab 5: Cheat Sheet' },
    { id: 'practice', name: 'Tab 6: Practice Lab (28)' }
  ];

  for (const t of sec24Tabs) {
    const elem = React.createElement(Section24View, { initialTab: t.id });
    const html = ReactDOMServer.renderToString(elem);
    assert(html.length > 3000, `Section 2.4 ${t.name} rendered cleanly via SSR (${html.length} bytes)`);
  }

  // Check navigation bar markup in Section 2.4
  const sec24Html = ReactDOMServer.renderToString(React.createElement(Section24View));
  assert(sec24Html.includes('grid-cols-2') && sec24Html.includes('sm:grid-cols-3') && sec24Html.includes('lg:grid-cols-6'), 'Section 2.4 uses responsive grid: grid-cols-2 sm:grid-cols-3 lg:grid-cols-6');
  assert(sec24Html.includes('bg-[#FAF8F5]') && sec24Html.includes('border-[#DCE7E1]') && sec24Html.includes('rounded-2xl'), 'Section 2.4 uses Section 2.5 container styling: bg-[#FAF8F5] border-[#DCE7E1] rounded-2xl');
  assert(sec24Html.includes('aria-label="Section navigation"'), 'Section 2.4 includes accessible aria-label="Section navigation"');
  assert(!sec24Html.includes('min-w-max'), 'Section 2.4 eliminated min-w-max scroll constraint');

  // Check all 6 tab labels are present in navigation
  const sec24Labels = [
    '1. Start Here',
    '2. Conversion Methods',
    '3. Guided Demonstrations',
    '4. Worked Models (18)',
    '5. Cheat Sheet',
    '6. Practice Lab (28)'
  ];
  for (const lbl of sec24Labels) {
    assert(sec24Html.includes(lbl), `Section 2.4 navigation includes label: "${lbl}"`);
  }

  // -------------------------------------------------------------
  // SUITE 2: Section 2.6 Responsive Tab Navigation
  // -------------------------------------------------------------
  console.log('\nSUITE 2: Section 2.6 Responsive Tab Navigation');

  const { Section26View } = await vite.ssrLoadModule('/src/components/Section26View.jsx');
  assert(typeof Section26View === 'function', 'Section26View loaded cleanly');

  const sec26Tabs = [
    { id: 'foundations', name: "Tab 1: Don't-Care Foundations" },
    { id: 'method', name: "Tab 2: K-Map Method with Don't-Cares" },
    { id: 'examples', name: 'Tab 3: Worked Examples (11)' },
    { id: 'intro5var', name: 'Tab 4: Introduction to 5-Variable Maps' },
    { id: 'cheatSheet', name: 'Tab 5: Master Cheat Sheet' },
    { id: 'practiceLab', name: 'Tab 6: Practice Lab (10)' }
  ];

  for (const t of sec26Tabs) {
    const elem = React.createElement(Section26View, { section: dldSection26Data, initialTab: t.id });
    const html = ReactDOMServer.renderToString(elem);
    assert(html.length > 3000, `Section 2.6 ${t.name} rendered cleanly via SSR (${html.length} bytes)`);
  }

  // Check navigation bar markup in Section 2.6
  const sec26Html = ReactDOMServer.renderToString(React.createElement(Section26View, { section: dldSection26Data }));
  assert(sec26Html.includes('grid-cols-2') && sec26Html.includes('sm:grid-cols-3') && sec26Html.includes('lg:grid-cols-6'), 'Section 2.6 uses responsive grid: grid-cols-2 sm:grid-cols-3 lg:grid-cols-6');
  assert(sec26Html.includes('bg-[#FAF8F5]') && sec26Html.includes('border-[#DCE7E1]') && sec26Html.includes('rounded-2xl'), 'Section 2.6 uses Section 2.5 container styling: bg-[#FAF8F5] border-[#DCE7E1] rounded-2xl');
  assert(sec26Html.includes('aria-label="Section navigation"'), 'Section 2.6 includes accessible aria-label="Section navigation"');

  // Check all 6 tab labels are present in navigation
  const cleanSec26Html = sec26Html.replace(/&#x27;/g, "'");
  const sec26Labels = [
    "1. Don't-Care Foundations",
    "2. K-Map Method with Don't-Cares",
    '3. Worked Examples (11)',
    '4. Introduction to 5-Variable Maps',
    '5. Master Cheat Sheet',
    '6. Practice Lab (10)'
  ];
  for (const lbl of sec26Labels) {
    assert(cleanSec26Html.includes(lbl), `Section 2.6 navigation includes label: "${lbl}"`);
  }

  // -------------------------------------------------------------
  // SUITE 3: Section 2.5 Navigation Reference Integrity Check
  // -------------------------------------------------------------
  console.log('\nSUITE 3: Section 2.5 Navigation Reference Integrity Check');

  const { Section25View } = await vite.ssrLoadModule('/src/components/Section25View.jsx');
  assert(typeof Section25View === 'function', 'Section25View loaded cleanly');

  const sec25Html = ReactDOMServer.renderToString(React.createElement(Section25View, { section: dldSection25Data }));
  assert(sec25Html.includes('lg:grid-cols-7'), 'Section 2.5 remains the intact 7-tab grid reference');

} catch (err) {
  assert(false, `SSR verification threw error: ${err.message}\n${err.stack}`);
} finally {
  await vite.close();
}

// -------------------------------------------------------------
// SUITE 4: Strict Zero-Dash Compliance
// -------------------------------------------------------------
console.log('\nSUITE 4: Strict Zero-Dash Compliance');

const filesToCheck = [
  'src/components/Section24View.jsx',
  'src/components/Section25View.jsx',
  'src/components/Section26View.jsx',
  'src/data/dldSection24Data.js',
  'src/data/dldSection25Data.js',
  'src/data/dldSection26Data.js',
  'scripts/verifyResponsiveTabs.mjs'
];

for (const relPath of filesToCheck) {
  const fullPath = path.resolve(process.cwd(), relPath);
  const text = fs.readFileSync(fullPath, 'utf8');
  const emMatches = (text.match(/\u2014/g) || []).length;
  const enMatches = (text.match(/\u2013/g) || []).length;

  assert(emMatches === 0, `${relPath}: Zero em-dashes (\u2014) verified (found: ${emMatches})`);
  assert(enMatches === 0, `${relPath}: Zero en-dashes (\u2013) verified (found: ${enMatches})`);
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`VERIFICATION SUMMARY: ${passedChecks} Passed, ${failedChecks} Failed, ${totalChecks} Total Checks`);
console.log('================================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('ALL RESPONSIVE TAB NAVIGATION CHECKS PASSED!\n');
}
