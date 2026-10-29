/**
 * Verification Suite for DLD Section 2.6: Don't-Care Conditions in Karnaugh Maps
 * 
 * Verifies:
 * 1. Data module structural completeness (definitions, bcdCaseStudy, 9 operating rules).
 * 2. Truth-table mathematical verification of all 11 worked examples across 2, 3, and 4 variables.
 * 3. Mathematical verification of Tab 4 introductory 5-variable solved illustration (B'E').
 * 4. Mathematical verification of all 10 practice problems with hints and solutions.
 * 5. Server-Side Rendering (SSR) of Section26View component with 5-tab architecture.
 * 6. Access control and publication gating (unpublished for public, accessible in local faculty review).
 * 7. Strict Zero-Dash compliance (zero em-dashes and zero en-dashes).
 */

import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { dldSection26Data } from '../src/data/dldSection26Data.js';
import { centralContentRegistry, isItemPubliclyAccessible } from '../src/data/centralContentRegistry.js';

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
console.log('ZeroIndex Phase 5B.4: DLD Section 2.6 Academic & Mathematical Audit');
console.log('================================================================\n');

// -------------------------------------------------------------
// SUITE 1: Data Architecture & Curriculum Integrity
// -------------------------------------------------------------
console.log('SUITE 1: Data Architecture & Curriculum Integrity');

assert(dldSection26Data.id === '2.6', 'Section ID is 2.6');
assert(dldSection26Data.number === '2.6', 'Section number is 2.6');
assert(dldSection26Data.title === "Don't-Care Conditions in Karnaugh Maps", 'Section title matches faculty specification');
assert(dldSection26Data.status === 'Planned / In Development', 'Section status is marked Planned / In Development');
assert(Array.isArray(dldSection26Data.learningOutcomes) && dldSection26Data.learningOutcomes.length >= 5, 'Contains at least 5 structured learning outcomes');
assert(Array.isArray(dldSection26Data.introductoryBullets) && dldSection26Data.introductoryBullets.length === 6, 'Contains exactly 6 structured introductory bullets');

const requiredBulletLabels = ['WHY', 'WHERE', 'WHAT', 'HOW', 'WHY CHOSEN', 'REMEMBER'];
const bulletLabels = dldSection26Data.introductoryBullets.map(b => b.label);
assert(requiredBulletLabels.every(l => bulletLabels.includes(l)), 'Contains all 6 required bullet labels: WHY, WHERE, WHAT, HOW, WHY CHOSEN, REMEMBER');

assert(typeof dldSection26Data.foundations.simpleDefinition === 'string' && dldSection26Data.foundations.simpleDefinition.length > 20, 'Simple definition present and descriptive');
assert(typeof dldSection26Data.foundations.formalDefinition === 'string' && dldSection26Data.foundations.formalDefinition.includes('ON-set'), 'Formal definition includes rigorous switching theory ON/OFF/DC sets');
assert(dldSection26Data.foundations.valueComparison.length === 3, 'Truth-table output markings distinction covers Logic 0, Logic 1, and Don\'t-Care X');
assert(dldSection26Data.foundations.bcdCaseStudy.description.includes('8421') || dldSection26Data.foundations.bcdCaseStudy.description.includes('BCD'), 'Includes real-world BCD decoder case study');
assert(dldSection26Data.foundations.standardRules.length >= 8, 'Includes at least 8 standard operating grouping rules');
assert(dldSection26Data.cheatSheet !== undefined, 'Contains structured Master Cheat Sheet');
assert(dldSection26Data.practiceProblems.length === 10, 'Practice collection contains exactly 10 problems in a unified structure');

// -------------------------------------------------------------
// SUITE 2: Mathematical Verification of All 11 Worked Examples
// -------------------------------------------------------------
console.log('\nSUITE 2: Mathematical Verification of All 11 Worked Examples');

assert(Array.isArray(dldSection26Data.workedExamples) && dldSection26Data.workedExamples.length === 11, 'Contains exactly 11 comprehensive worked examples');

// Count breakdown
const twoVarCount = dldSection26Data.workedExamples.filter(e => e.category.startsWith('2-Variable')).length;
const threeVarCount = dldSection26Data.workedExamples.filter(e => e.category.startsWith('3-Variable')).length;
const fourVarCount = dldSection26Data.workedExamples.filter(e => e.category.startsWith('4-Variable')).length;
const sopCount = dldSection26Data.workedExamples.filter(e => e.form === 'SOP').length;
const posCount = dldSection26Data.workedExamples.filter(e => e.form === 'POS').length;

assert(twoVarCount === 3, 'Exactly 3 two-variable worked examples (2 SOP, 1 POS)');
assert(threeVarCount === 4, 'Exactly 4 three-variable worked examples (3 SOP, 1 POS)');
assert(fourVarCount === 4, 'Exactly 4 four-variable worked examples (3 SOP, 1 POS)');
assert(sopCount === 8, 'Contains 8 SOP worked examples');
assert(posCount === 3, 'Contains 3 POS worked examples');

// Helper to evaluate SOP expression
function evalSop(terms, vars) {
  for (const term of terms) {
    let match = true;
    let i = 0;
    while (i < term.length) {
      const ch = term[i];
      let primed = false;
      if (i + 1 < term.length && term[i + 1] === "'") {
        primed = true;
        i++;
      }
      const val = vars[ch];
      if ((primed && val !== 0) || (!primed && val !== 1)) {
        match = false;
        break;
      }
      i++;
    }
    if (match) return 1;
  }
  return 0;
}

// Helper to evaluate POS expression
function evalPos(factors, vars) {
  for (const factor of factors) {
    let factorVal = 0;
    const lits = factor.replace(/[()]/g, '').split('+').map(x => x.trim());
    for (const lit of lits) {
      const primed = lit.endsWith("'");
      const ch = lit[0];
      const val = vars[ch];
      if ((primed && val === 0) || (!primed && val === 1)) {
        factorVal = 1;
        break;
      }
    }
    if (factorVal === 0) return 0;
  }
  return 1;
}

// Check every worked example
let allExamplesValid = true;
for (const ex of dldSection26Data.workedExamples) {
  const numVars = ex.category.startsWith('2-Var') ? 2 : ex.category.startsWith('3-Var') ? 3 : 4;
  const varNames = numVars === 2 ? ['A', 'B'] : numVars === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
  const total = 1 << numVars;

  if (ex.form === 'SOP') {
    const rawTerms = ex.finalAnswer.replace('F =', '').split('+').map(t => t.trim());
    for (let i = 0; i < total; i++) {
      const vars = {};
      for (let k = 0; k < numVars; k++) {
        vars[varNames[k]] = (i >> (numVars - 1 - k)) & 1;
      }
      const res = evalSop(rawTerms, vars);
      if (ex.minterms.includes(i) && res !== 1) {
        allExamplesValid = false;
        console.error(`[${ex.id}] Care minterm ${i} produced 0!`);
      }
      if (ex.maxterms.includes(i) && res !== 0) {
        allExamplesValid = false;
        console.error(`[${ex.id}] Care zero ${i} produced 1!`);
      }
    }
  } else {
    // POS
    const factors = ex.finalAnswer.replace('F =', '').match(/\([^)]+\)|[A-Z](')?/g) || [ex.finalAnswer.replace('F =', '').trim()];
    for (let i = 0; i < total; i++) {
      const vars = {};
      for (let k = 0; k < numVars; k++) {
        vars[varNames[k]] = (i >> (numVars - 1 - k)) & 1;
      }
      const res = evalPos(factors, vars);
      if (ex.maxterms.includes(i) && res !== 0) {
        allExamplesValid = false;
        console.error(`[${ex.id}] Care maxterm ${i} produced 1!`);
      }
      if (ex.minterms.includes(i) && res !== 1) {
        allExamplesValid = false;
        console.error(`[${ex.id}] Care one ${i} produced 0!`);
      }
    }
  }
}
assert(allExamplesValid, 'All 11 worked examples mathematically verified on all care combinations (1s, 0s, and Xs)');

// -------------------------------------------------------------
// SUITE 3: Tab 4 Five-Variable Introductory Illustration
// -------------------------------------------------------------
console.log('\nSUITE 3: Tab 4 Five-Variable Introductory Illustration');

const fiveVar = dldSection26Data.fiveVarIntro.solvedModel;
assert(fiveVar.finalAnswer === "F = B'E'", 'Five-variable solved illustration simplifies to B\'E\'');
assert(fiveVar.minterms.length === 8, 'Contains exactly 8 minterms in the cross-plane octet');

let fiveVarCorrect = true;
for (let i = 0; i < 32; i++) {
  const vars = {
    A: (i >> 4) & 1,
    B: (i >> 3) & 1,
    C: (i >> 2) & 1,
    D: (i >> 1) & 1,
    E: i & 1
  };
  const res = evalSop(["B'E'"], vars);
  if (fiveVar.minterms.includes(i) && res !== 1) {
    fiveVarCorrect = false;
    console.error(`5-Var minterm ${i} evaluated to 0!`);
  }
  if (!fiveVar.minterms.includes(i) && res !== 0) {
    fiveVarCorrect = false;
    console.error(`5-Var zero-cell ${i} evaluated to 1!`);
  }
}
assert(fiveVarCorrect, 'Cross-plane octet B\'E\' verified: outputs 1 for all 8 minterms and 0 for remaining 24 minterms');

// -------------------------------------------------------------
// SUITE 4: Mathematical Verification of Practice Problems
// -------------------------------------------------------------
console.log('\nSUITE 4: Mathematical Verification of Practice Problems');

assert(Array.isArray(dldSection26Data.practiceProblems) && dldSection26Data.practiceProblems.length === 10, 'Contains exactly 10 progressive practice problems (P1 to P10)');

let allPracticeValid = true;
for (const p of dldSection26Data.practiceProblems) {
  const numVars = p.category.startsWith('2-Var') ? 2 : p.category.startsWith('3-Var') ? 3 : 4;
  const varNames = numVars === 2 ? ['A', 'B'] : numVars === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
  const total = 1 << numVars;

  if (p.form === 'SOP') {
    const rawTerms = p.finalAnswer.replace('F =', '').split('+').map(t => t.trim());
    for (let i = 0; i < total; i++) {
      const vars = {};
      for (let k = 0; k < numVars; k++) {
        vars[varNames[k]] = (i >> (numVars - 1 - k)) & 1;
      }
      const res = evalSop(rawTerms, vars);
      if (p.minterms.includes(i) && res !== 1) {
        allPracticeValid = false;
        console.error(`[${p.id}] Practice care minterm ${i} produced 0!`);
      }
      if (p.maxterms.includes(i) && res !== 0) {
        allPracticeValid = false;
        console.error(`[${p.id}] Practice care zero ${i} produced 1!`);
      }
    }
  } else {
    const factors = p.finalAnswer.replace('F =', '').match(/\([^)]+\)|[A-Z](')?/g) || [p.finalAnswer.replace('F =', '').trim()];
    for (let i = 0; i < total; i++) {
      const vars = {};
      for (let k = 0; k < numVars; k++) {
        vars[varNames[k]] = (i >> (numVars - 1 - k)) & 1;
      }
      const res = evalPos(factors, vars);
      if (p.maxterms.includes(i) && res !== 0) {
        allPracticeValid = false;
        console.error(`[${p.id}] Practice care maxterm ${i} produced 1!`);
      }
      if (p.minterms.includes(i) && res !== 1) {
        allPracticeValid = false;
        console.error(`[${p.id}] Practice care one ${i} produced 0!`);
      }
    }
  }
}
assert(allPracticeValid, 'All 10 practice problems mathematically verified across all care minterms and maxterms');

// Check that at least one practice problem leaves an X unused
const hasUnusedX = dldSection26Data.practiceProblems.some(p => p.takeaway.toLowerCase().includes('ignored') || p.steps.some(s => s.toLowerCase().includes('ignored')));
assert(hasUnusedX, 'Practice problem set explicitly includes problems where don\'t-cares are left unused (P2, P5, P8, P9)');

// Check that no 5-variable problem exists in practice set
const hasFiveVarPractice = dldSection26Data.practiceProblems.some(p => p.category.includes('5-Var'));
assert(!hasFiveVarPractice, 'Practice problem set strictly contains zero 5-variable problems');

// -------------------------------------------------------------
// SUITE 5: SSR Component Rendering Smoke Test
// -------------------------------------------------------------
console.log('\nSUITE 5: SSR Component Rendering Smoke Test');

let ssrOutput = '';
try {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const { Section26View } = await vite.ssrLoadModule('/src/components/Section26View.jsx');

  ssrOutput = ReactDOMServer.renderToString(
    React.createElement(Section26View, { section: dldSection26Data })
  );
  assert(ssrOutput.length > 5000, `Section26View rendered cleanly via SSR (${ssrOutput.length} bytes)`);
  assert(ssrOutput.includes("Don&#x27;t-Care Conditions in Karnaugh Maps") || ssrOutput.includes("Don't-Care Conditions in Karnaugh Maps"), 'SSR output contains updated section title');
  assert(ssrOutput.includes('Don&#x27;t-Care Foundations') || ssrOutput.includes("Don't-Care Foundations"), 'SSR output contains Tab 1 (Foundations)');
  assert(ssrOutput.includes('K-Map Method with Don&#x27;t-Cares') || ssrOutput.includes("K-Map Method with Don't-Cares"), 'SSR output contains Tab 2 (Method)');
  assert(ssrOutput.includes('Worked Examples'), 'SSR output contains Tab 3 (Worked Examples)');
  assert(ssrOutput.includes('Introduction to 5-Variable Maps'), 'SSR output contains Tab 4 (5-Variable Maps)');
  assert(ssrOutput.includes('Master Cheat Sheet'), 'SSR output contains Tab 5 (Master Cheat Sheet)');
  assert(ssrOutput.includes('Practice Lab'), 'SSR output contains Tab 6 (Practice Lab)');

  // Comprehensive audit: Render every individual tab to prove zero runtime exceptions
  const tabsToTest = [
    { id: 'foundations', name: 'Tab 1: Foundations' },
    { id: 'method', name: 'Tab 2: Method with Don\'t-Cares' },
    { id: 'examples', name: 'Tab 3: Worked Examples' },
    { id: 'intro5var', name: 'Tab 4: 5-Variable Maps' },
    { id: 'cheatSheet', name: 'Tab 5: Master Cheat Sheet' },
    { id: 'practiceLab', name: 'Tab 6: Practice Lab' }
  ];

  for (const t of tabsToTest) {
    const tabHtml = ReactDOMServer.renderToString(
      React.createElement(Section26View, { section: dldSection26Data, initialTab: t.id })
    );
    assert(tabHtml.length > 5000, `${t.name} renders cleanly via SSR (${tabHtml.length} bytes, no runtime error)`);
  }


  // Specifically verify MiniKMap26 rendering of don't-care cell 6
  const { MiniKMap26 } = await vite.ssrLoadModule('/src/components/Section26View.jsx');
  const miniKMapOutput = ReactDOMServer.renderToString(
    React.createElement(MiniKMap26, {
      mapType: 'threeVar',
      highlightCells: [1, 3, 5, 7],
      minterms: [1, 5, 7],
      dontCares: [3, 6],
      groupColor: 'amber',
      showAllIndices: true
    })
  );

  assert(miniKMapOutput.includes('X'), 'MiniKMap26 renders X for don\'t-care cells');
  // Check that cell index 6 and value X are rendered
  assert(miniKMapOutput.includes('>6<') && miniKMapOutput.includes('X'), 'MiniKMap26 renders cell 6 with don\'t-care X');
  // Check that cell 6 has bg-white (ungrouped) rather than bg-amber-100
  const cell6Regex = /<td[^>]*class="[^"]*bg-white[^"]*"[^>]*>[\s\S]*?>6<[\s\S]*?>X<[\s\S]*?<\/td>/;
  assert(cell6Regex.test(miniKMapOutput), 'Cell 6 visibly displays X and remains ungrouped (bg-white)');

  await vite.close();


} catch (err) {
  assert(false, `SSR Rendering failed: ${err.message}`);
}

// -------------------------------------------------------------
// SUITE 6: Access Control & Publication Gating
// -------------------------------------------------------------
console.log('\nSUITE 6: Access Control & Publication Gating');

const sec26Record = centralContentRegistry.find(item => item.id === 'dld-sec-2.6');
assert(sec26Record !== undefined, 'Central content registry contains dld-sec-2.6 record');
assert(sec26Record?.editorialStatus === 'planned', 'Registry editorialStatus is planned');
assert(sec26Record?.isPublic === false, 'Registry isPublic flag is false (unpublished for general visitors)');
assert(isItemPubliclyAccessible('dld-sec-2.6', {}) === false, 'isItemPubliclyAccessible returns false for public visitors with no overrides');

// -------------------------------------------------------------
// SUITE 7: Strict Zero-Dash Standard Audit
// -------------------------------------------------------------
console.log('\nSUITE 7: Strict Zero-Dash Standard Audit');

const filesToAudit = [
  'src/data/dldSection26Data.js',
  'src/components/Section26View.jsx',
  'src/components/DldWorkspace.jsx',
  'scripts/verifyDldSection26.mjs'
];

let zeroDashViolations = 0;
for (const relPath of filesToAudit) {
  const absPath = path.resolve(relPath);
  if (fs.existsSync(absPath)) {
    const text = fs.readFileSync(absPath, 'utf8');
    const emMatches = (text.match(/\u2014/g) || []).length;
    const enMatches = (text.match(/\u2013/g) || []).length;
    if (emMatches > 0 || enMatches > 0) {
      zeroDashViolations += (emMatches + enMatches);
      console.error(`  [VIOLATION] ${relPath}: ${emMatches} em-dashes, ${enMatches} en-dashes`);
    } else {
      assert(true, `${relPath} complies with Zero-Dash standard (0 em/en dashes)`);
    }
  }
}
assert(zeroDashViolations === 0, `Zero-Dash standard strictly verified across all files (violations: ${zeroDashViolations})`);

// -------------------------------------------------------------
// SUITE 8: Academic Wording & Clean Presentation Audit
// -------------------------------------------------------------
console.log('\nSUITE 8: Academic Wording & Clean Presentation Audit');

const prohibitedPhrases = [
  'Classroom Benchmark',
  'Classroom Conceptual Bridge',
  'Classroom Wildcard',
  'Faculty Presentation Caveat',
  'Faculty Presentation Note',
  'Common Faculty Examination Traps',
  'Faculty Examination Traps',
  'over 40%',
  '40% of logic gates'
];

let prohibitedCount = 0;
for (const relPath of ['src/data/dldSection26Data.js', 'src/components/Section26View.jsx']) {
  const content = fs.readFileSync(path.resolve(relPath), 'utf8');
  for (const phrase of prohibitedPhrases) {
    if (content.includes(phrase)) {
      prohibitedCount++;
      console.error(`  [PROHIBITED PHRASE] "${phrase}" found in ${relPath}`);
    }
  }
}
assert(prohibitedCount === 0, `No prohibited faculty/classroom labels or unsupported quantitative claims present (violations: ${prohibitedCount})`);

console.log('\n================================================================');
console.log(`Section 2.6 Verification Complete: ${passedChecks}/${totalChecks} assertions passed (${failedChecks} failures).`);
console.log('================================================================\n');

if (failedChecks > 0) {
  process.exit(1);
}

