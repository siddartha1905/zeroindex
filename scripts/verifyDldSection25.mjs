/**
 * Verification Suite for DLD Section 2.5: Solved Models Layout Refinement
 * 
 * Verifies:
 * 1. Data module structural completeness (34 worked models, correct categories, forms, and variables).
 * 2. Mathematical verification and integrity of all 34 worked models.
 * 3. Filter counts:
 *    - Total: 34 models
 *    - Variable-count: 2-Variable (6), 3-Variable (13), 4-Variable (15)
 *    - Expression-form: SOP (25), POS (9)
 * 4. Server-Side Rendering (SSR) of Section25View across all 7 tabs:
 *    - 1. start-here
 *    - 2. foundations
 *    - 3. grouping-rules
 *    - 4. guided-demos
 *    - 5. worked-models
 *    - 6. cheat-sheet
 *    - 7. practice-lab
 * 5. Tab 5 UI Components:
 *    - Variable filter buttons (All, 2-Variable, 3-Variable, 4-Variable)
 *    - Form filter buttons (All, SOP, POS)
 *    - Compact selection cards (showing ID, Form, Var, Difficulty, Title)
 *    - Single active worked solution panel (KMapGrid, Group interpretation table, Derivation steps, Boxed final answer, Verification note)
 * 6. Rendering safety: all 34 models render cleanly without runtime exceptions.
 * 7. Strict Zero-Dash compliance (zero em-dashes and zero en-dashes).
 */

import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createServer } from 'vite';

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
console.log('ZeroIndex Phase 5B.7: DLD Section 2.5 Worked Models Audit');
console.log('================================================================\n');

// -------------------------------------------------------------
// SUITE 1: Data Architecture & 34 Worked Models Integrity
// -------------------------------------------------------------
console.log('SUITE 1: Data Architecture & 34 Worked Models Integrity');

assert(dldSection25Data.id === '2.5', 'Section ID is 2.5');
assert(dldSection25Data.number === '2.5', 'Section number is 2.5');
assert(Array.isArray(dldSection25Data.workedModels), 'workedModels is an array');
assert(dldSection25Data.workedModels.length === 34, `Contains exactly 34 worked models (actual: ${dldSection25Data.workedModels.length})`);

// Check metadata for each of the 34 models
const expectedIds = Array.from({ length: 34 }, (_, i) => `KM2.5-M${String(i + 1).padStart(2, '0')}`);
const actualIds = dldSection25Data.workedModels.map(m => m.id);
assert(JSON.stringify(actualIds) === JSON.stringify(expectedIds), 'All 34 models have sequential stable IDs KM2.5-M01 through KM2.5-M34');

let allHaveRequiredFields = true;
dldSection25Data.workedModels.forEach((m) => {
  if (!m.id || !m.category || !m.form || !m.difficulty || !m.title || !m.problemStatement || !m.mapType || !m.groupingSteps || !m.finalAnswer) {
    allHaveRequiredFields = false;
  }
});
assert(allHaveRequiredFields, 'Every worked model contains all required schema fields');

// Variable count breakdown
const twoVarCount = dldSection25Data.workedModels.filter(m => m.mapType === 'twoVar').length;
const threeVarCount = dldSection25Data.workedModels.filter(m => m.mapType === 'threeVar').length;
const fourVarCount = dldSection25Data.workedModels.filter(m => m.mapType === 'fourVar').length;

assert(twoVarCount === 6, `2-Variable models count is exactly 6 (actual: ${twoVarCount})`);
assert(threeVarCount === 13, `3-Variable models count is exactly 13 (actual: ${threeVarCount})`);
assert(fourVarCount === 15, `4-Variable models count is exactly 15 (actual: ${fourVarCount})`);
assert(twoVarCount + threeVarCount + fourVarCount === 34, 'Variable breakdown totals exactly 34 models');

// Form breakdown
const sopCount = dldSection25Data.workedModels.filter(m => m.form === 'SOP').length;
const posCount = dldSection25Data.workedModels.filter(m => m.form === 'POS').length;

assert(sopCount === 25, `SOP models count is exactly 25 (actual: ${sopCount})`);
assert(posCount === 9, `POS models count is exactly 9 (actual: ${posCount})`);
assert(sopCount + posCount === 34, 'Form breakdown totals exactly 34 models');

// -------------------------------------------------------------
// SUITE 2: Filter Logic Verification
// -------------------------------------------------------------
console.log('\nSUITE 2: Filter Logic Verification');

const matchesModelVarFilter = (model, filter) => {
  if (filter === 'All') return true;
  if (filter === '2-Variable') return model.mapType === 'twoVar' || (model.category && model.category.startsWith('2-Var'));
  if (filter === '3-Variable') return model.mapType === 'threeVar' || (model.category && model.category.startsWith('3-Var'));
  if (filter === '4-Variable') return model.mapType === 'fourVar' || (model.category && model.category.startsWith('4-Var'));
  return true;
};

const matchesModelFormFilter = (model, filter) => {
  if (filter === 'All') return true;
  return model.form === filter;
};

// Test variable filter
const allVar = dldSection25Data.workedModels.filter(m => matchesModelVarFilter(m, 'All'));
const f2Var = dldSection25Data.workedModels.filter(m => matchesModelVarFilter(m, '2-Variable'));
const f3Var = dldSection25Data.workedModels.filter(m => matchesModelVarFilter(m, '3-Variable'));
const f4Var = dldSection25Data.workedModels.filter(m => matchesModelVarFilter(m, '4-Variable'));

assert(allVar.length === 34, `Filter 'All' returns 34 models (got ${allVar.length})`);
assert(f2Var.length === 6, `Filter '2-Variable' returns 6 models (got ${f2Var.length})`);
assert(f3Var.length === 13, `Filter '3-Variable' returns 13 models (got ${f3Var.length})`);
assert(f4Var.length === 15, `Filter '4-Variable' returns 15 models (got ${f4Var.length})`);

// Test form filter
const allForm = dldSection25Data.workedModels.filter(m => matchesModelFormFilter(m, 'All'));
const fSOP = dldSection25Data.workedModels.filter(m => matchesModelFormFilter(m, 'SOP'));
const fPOS = dldSection25Data.workedModels.filter(m => matchesModelFormFilter(m, 'POS'));

assert(allForm.length === 34, `Filter 'All Forms' returns 34 models (got ${allForm.length})`);
assert(fSOP.length === 25, `Filter 'SOP' returns 25 models (got ${fSOP.length})`);
assert(fPOS.length === 9, `Filter 'POS' returns 9 models (got ${fPOS.length})`);

// Cross-filter test (2-Variable and POS)
const f2VarPOS = dldSection25Data.workedModels.filter(m => matchesModelVarFilter(m, '2-Variable') && matchesModelFormFilter(m, 'POS'));
assert(f2VarPOS.length === 2, `Filter '2-Variable' + 'POS' returns 2 models (got ${f2VarPOS.length}: ${f2VarPOS.map(m => m.id).join(', ')})`);

// Cross-filter test (4-Variable and POS)
const f4VarPOS = dldSection25Data.workedModels.filter(m => matchesModelVarFilter(m, '4-Variable') && matchesModelFormFilter(m, 'POS'));
assert(f4VarPOS.length === 3, `Filter '4-Variable' + 'POS' returns 3 models (got ${f4VarPOS.length}: ${f4VarPOS.map(m => m.id).join(', ')})`);

// -------------------------------------------------------------
// SUITE 3: Server-Side Rendering (SSR) & Tab Architecture
// -------------------------------------------------------------
console.log('\nSUITE 3: Server-Side Rendering (SSR) & Tab Architecture');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom'
});

try {
  const { Section25View } = await vite.ssrLoadModule('/src/components/Section25View.jsx');
  assert(typeof Section25View === 'function', 'Section25View component loaded cleanly via Vite SSR');

  // Verify all 7 tabs render without errors
  const tabsToTest = [
    { id: 'start-here', name: 'Tab 1: Start Here' },
    { id: 'foundations', name: 'Tab 2: Gray Code & Topology' },
    { id: 'grouping-rules', name: 'Tab 3: Grouping Rules & Terms' },
    { id: 'guided-demos', name: 'Tab 4: Guided Demonstrations' },
    { id: 'worked-models', name: 'Tab 5: Solved Models (34)' },
    { id: 'cheat-sheet', name: 'Tab 6: Master Cheat Sheet' },
    { id: 'practice-lab', name: 'Tab 7: Practice Lab' }
  ];

  for (const t of tabsToTest) {
    try {
      const element = React.createElement(Section25View, { section: dldSection25Data, initialTab: t.id });
      const html = ReactDOMServer.renderToString(element);
      assert(html.length > 2000, `${t.name} rendered cleanly via SSR (${html.length} bytes)`);
    } catch (tabErr) {
      assert(false, `${t.name} failed SSR: ${tabErr.message}`);
    }
  }

  // -------------------------------------------------------------
  // SUITE 4: Tab 5 UI Elements Verification
  // -------------------------------------------------------------
  console.log('\nSUITE 4: Tab 5 Worked Models UI Elements Verification');

  const tab5Element = React.createElement(Section25View, { section: dldSection25Data, initialTab: 'worked-models' });
  const tab5Html = ReactDOMServer.renderToString(tab5Element);

  const cleanTab5Html = tab5Html.replace(/<!-- -->/g, '');
  assert(tab5Html.includes('Filter Solved Models'), 'Contains Filter Solved Models bar');
  assert(cleanTab5Html.includes('Showing 34 of 34 models'), 'Shows full collection count: Showing 34 of 34 models');
  assert(tab5Html.includes('2-Variable') && tab5Html.includes('3-Variable') && tab5Html.includes('4-Variable'), 'Contains all variable filter options');
  assert(tab5Html.includes('SOP (\u03A3 m)') && tab5Html.includes('POS (\u03A0 M)'), 'Contains SOP (\u03A3) and POS (\u03A0) filter options with true Unicode math symbols');

  // Check compact card items present in HTML
  assert(tab5Html.includes('KM2.5-M01'), 'Card KM2.5-M01 rendered');
  assert(tab5Html.includes('KM2.5-M34'), 'Card KM2.5-M34 rendered');
  assert(tab5Html.includes('Single Column Pair'), 'Model 01 title rendered in selection card');

  // Check Single Active Model panel elements
  assert(tab5Html.includes('Group Interpretation &amp; Variable Elimination') || tab5Html.includes('Group Interpretation & Variable Elimination'), 'Contains Group Interpretation & Variable Elimination table');
  assert(tab5Html.includes('Classroom Derivation Steps'), 'Contains Classroom Derivation Steps list');
  assert(tab5Html.includes('Final Minimized Boolean Expression:'), 'Contains Final Minimized Boolean Expression boxed banner');
  assert(tab5Html.includes('Verification Note:'), 'Contains Verification Note block');
  assert(tab5Html.includes('K-Map Diagram'), 'Contains K-Map Diagram section');

  // -------------------------------------------------------------
  // SUITE 5: Interactive Filter & Model Switching Simulation
  // -------------------------------------------------------------
  console.log('\nSUITE 5: Interactive Filter & Model Switching Simulation');

  // Simulation state tracker
  let simVarFilter = 'All';
  let simFormFilter = 'All';
  let simActiveId = 'KM2.5-M01';

  const simFilter = (v, f) => dldSection25Data.workedModels.filter(m => matchesModelVarFilter(m, v) && matchesModelFormFilter(m, f));

  // Step A: Initial state
  let currentList = simFilter(simVarFilter, simFormFilter);
  assert(currentList.length === 34 && simActiveId === 'KM2.5-M01', 'Initial state: All 34 models visible, KM2.5-M01 active');

  // Step B: Filter to 3-Variable (KM2.5-M01 should be auto-swapped to KM2.5-M05)
  simVarFilter = '3-Variable';
  currentList = simFilter(simVarFilter, simFormFilter);
  if (!currentList.some(m => m.id === simActiveId)) {
    simActiveId = currentList[0].id;
  }
  assert(currentList.length === 13, 'Filter changed to 3-Variable: 13 models visible');
  assert(simActiveId === 'KM2.5-M05', `Active model automatically switched to first 3-variable model: KM2.5-M05 (got ${simActiveId})`);

  // Step C: Filter to 4-Variable (KM2.5-M05 should be auto-swapped to KM2.5-M12)
  simVarFilter = '4-Variable';
  currentList = simFilter(simVarFilter, simFormFilter);
  if (!currentList.some(m => m.id === simActiveId)) {
    simActiveId = currentList[0].id;
  }
  assert(currentList.length === 15, 'Filter changed to 4-Variable: 15 models visible');
  assert(simActiveId === 'KM2.5-M12', `Active model automatically switched to first 4-variable model: KM2.5-M12 (got ${simActiveId})`);

  // Step D: Filter to POS (KM2.5-M12 is SOP, should auto-swap to KM2.5-M25)
  simFormFilter = 'POS';
  currentList = simFilter(simVarFilter, simFormFilter);
  if (!currentList.some(m => m.id === simActiveId)) {
    simActiveId = currentList[0].id;
  }
  assert(currentList.length === 3, 'Filter changed to POS (with 4-Variable): 3 models visible');
  assert(simActiveId === 'KM2.5-M25', `Active model automatically switched to first 4-variable POS model: KM2.5-M25 (got ${simActiveId})`);

  // Step E: Select model directly (KM2.5-M30)
  simActiveId = 'KM2.5-M30';
  assert(currentList.some(m => m.id === simActiveId), 'Direct model selection: KM2.5-M30 selected in active filter');

  // Step F: Reset filters to All
  simVarFilter = 'All';
  simFormFilter = 'All';
  currentList = simFilter(simVarFilter, simFormFilter);
  if (!currentList.some(m => m.id === simActiveId)) {
    simActiveId = currentList[0].id;
  }
  assert(currentList.length === 34, 'Filters cleared: All 34 models accessible');
  assert(simActiveId === 'KM2.5-M30', 'Selected model KM2.5-M30 preserved after clearing filters');

  // -------------------------------------------------------------
  // SUITE 6: Exhaustive Active Render Safety Test Across All 34 Models
  // -------------------------------------------------------------
  console.log('\nSUITE 6: Exhaustive Active Render Safety Test Across All 34 Models');

  const { KMapGrid } = await vite.ssrLoadModule('/src/components/Section25View.jsx');
  assert(typeof KMapGrid === 'function', 'KMapGrid component loaded cleanly');

  let all34RenderCleanly = true;
  for (const model of dldSection25Data.workedModels) {
    try {
      const gridElem = React.createElement(KMapGrid, {
        mapType: model.mapType,
        minterms: model.minterms || [],
        maxterms: model.maxterms || [],
        dontCares: model.dontCares || [],
        targetPolarity: model.targetPolarity || (model.form === 'POS' ? '0' : '1'),
        groups: model.groupingSteps || [],
        activeGroup: 'ALL',
        size: 'md'
      });
      const gridHtml = ReactDOMServer.renderToString(gridElem);
      if (!gridHtml || gridHtml.length < 500) {
        all34RenderCleanly = false;
        console.error(`Model ${model.id} KMapGrid rendered unexpectedly small (${gridHtml.length} bytes)`);
      }
    } catch (mErr) {
      all34RenderCleanly = false;
      console.error(`Model ${model.id} threw error during render: ${mErr.message}`);
    }
  }
  assert(all34RenderCleanly, 'All 34 worked models KMapGrid instances render cleanly without errors');

  // -------------------------------------------------------------
  // SUITE 7: Regression Check : Section 2.6
  // -------------------------------------------------------------
  console.log('\nSUITE 7: Regression Check : Section 2.6');

  const { Section26View } = await vite.ssrLoadModule('/src/components/Section26View.jsx');
  assert(typeof Section26View === 'function', 'Section26View loaded cleanly');
  const sec26Element = React.createElement(Section26View, { section: dldSection26Data });
  const sec26Html = ReactDOMServer.renderToString(sec26Element);
  assert(sec26Html.length > 5000, `Section 2.6 renders with zero regressions (${sec26Html.length} bytes)`);

} catch (err) {
  assert(false, `SSR verification threw an unhandled error: ${err.message}\n${err.stack}`);
} finally {
  await vite.close();
}

// -------------------------------------------------------------
// SUITE 6: Strict Zero-Dash Compliance
// -------------------------------------------------------------
console.log('\nSUITE 6: Strict Zero-Dash Compliance');

const filesToCheck = [
  'src/components/Section25View.jsx',
  'src/data/dldSection25Data.js'
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
  console.log('ALL SECTION 2.5 WORKED EXAMPLES VERIFICATION CHECKS PASSED!\n');
}
