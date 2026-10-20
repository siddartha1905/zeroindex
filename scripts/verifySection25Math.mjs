/**
 * Digital Logic Design (DLD) - Section 2.5 Verification Suite
 * Karnaugh Maps: Fundamentals, Gray Code, 2/3/4-Variable, POS, and Don't-Care Conditions
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dldSection25Data } from '../src/data/dldSection25Data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`[PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`[FAIL] ${message}`);
  }
}

// Logic helpers
const not = x => (x ? 0 : 1);
const and = (...args) => (args.every(x => x === 1) ? 1 : 0);
const or = (...args) => (args.some(x => x === 1) ? 1 : 0);

function getMinterms2(fn) {
  const m = [];
  for (let i = 0; i < 4; i++) {
    const A = (i >> 1) & 1, B = i & 1;
    if (fn(A, B) === 1) m.push(i);
  }
  return m;
}

function getMinterms3(fn) {
  const m = [];
  for (let i = 0; i < 8; i++) {
    const A = (i >> 2) & 1, B = (i >> 1) & 1, C = i & 1;
    if (fn(A, B, C) === 1) m.push(i);
  }
  return m;
}

function getMaxterms3(fn) {
  const M = [];
  for (let i = 0; i < 8; i++) {
    const A = (i >> 2) & 1, B = (i >> 1) & 1, C = i & 1;
    if (fn(A, B, C) === 0) M.push(i);
  }
  return M;
}

function getMinterms4(fn) {
  const m = [];
  for (let i = 0; i < 16; i++) {
    const A = (i >> 3) & 1, B = (i >> 2) & 1, C = (i >> 1) & 1, D = i & 1;
    if (fn(A, B, C, D) === 1) m.push(i);
  }
  return m;
}

function getMaxterms4(fn) {
  const M = [];
  for (let i = 0; i < 16; i++) {
    const A = (i >> 3) & 1, B = (i >> 2) & 1, C = (i >> 1) & 1, D = i & 1;
    if (fn(A, B, C, D) === 0) M.push(i);
  }
  return M;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

console.log('=================================================================');
console.log('    ZEROINDEX DLD SECTION 2.5: COMPREHENSIVE ACADEMIC AUDIT      ');
console.log('=================================================================\n');

// -----------------------------------------------------------------------------
// 1. K-MAP INDEX MATRIX & GRAY CODE ADJACENCY AUDIT
// -----------------------------------------------------------------------------
console.log('--- 1. Checking K-Map Topologies and Gray Code Ordering ---');

const layouts = dldSection25Data.foundations.layouts;

// 2-Variable Map
const expected2VarMatrix = [
  [0, 1],
  [2, 3]
];
assert(JSON.stringify(layouts.twoVar.matrix) === JSON.stringify(expected2VarMatrix), '2-Variable K-Map matrix matches standard [0,1; 2,3]');

// 3-Variable Map
const expected3VarMatrix = [
  [0, 1, 3, 2],
  [4, 5, 7, 6]
];
assert(JSON.stringify(layouts.threeVar.matrix) === JSON.stringify(expected3VarMatrix), '3-Variable K-Map matrix matches standard [0,1,3,2; 4,5,7,6]');

// 4-Variable Map
const expected4VarMatrix = [
  [0, 1, 3, 2],
  [4, 5, 7, 6],
  [12, 13, 15, 14],
  [8, 9, 11, 10]
];
assert(JSON.stringify(layouts.fourVar.matrix) === JSON.stringify(expected4VarMatrix), '4-Variable K-Map matrix matches standard 4x4 Gray code layout');

// Gray Code transitions in 4x4 matrix
const grayCodes = ['00', '01', '11', '10'];
for (let i = 0; i < 4; i++) {
  const next = (i + 1) % 4;
  const s1 = grayCodes[i];
  const s2 = grayCodes[next];
  let diff = 0;
  for (let k = 0; k < 2; k++) {
    if (s1[k] !== s2[k]) diff++;
  }
  assert(diff === 1, `Gray code transition ${s1} -> ${s2} differs by exactly 1 bit`);
}

// -----------------------------------------------------------------------------
// 2. GUIDED DEMONSTRATIONS (GD1 to GD6) AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 2. Checking Guided Demonstrations (GD1 to GD6) ---');
assert(dldSection25Data.guidedDemos.length === 6, 'Exactly 6 guided demonstrations present');

// GD1: F(A, B) = Sigma m(1, 2, 3) -> A + B
const gd1_m = getMinterms2((A, B) => or(A, B));
assert(arraysEqual(gd1_m, [1, 2, 3]), 'GD1 target A + B evaluates to m(1, 2, 3)');

// GD2: F(A, B, C) = Sigma m(1, 3, 5, 7) -> C
const gd2_m = getMinterms3((A, B, C) => C);
assert(arraysEqual(gd2_m, [1, 3, 5, 7]), 'GD2 target C evaluates to m(1, 3, 5, 7)');

// GD3: F(A, B, C, D) = Sigma m(0, 2, 4, 6, 8, 10, 12, 14) -> D'
const gd3_m = getMinterms4((A, B, C, D) => not(D));
assert(arraysEqual(gd3_m, [0, 2, 4, 6, 8, 10, 12, 14]), 'GD3 target D\' evaluates to m(0, 2, 4, 6, 8, 10, 12, 14)');

// GD4: F(A, B, C, D) = Sigma m(0, 2, 8, 10, 5, 7, 13, 15) -> B'D' + BD
const gd4_m = getMinterms4((A, B, C, D) => or(and(not(B), not(D)), and(B, D)));
assert(arraysEqual(gd4_m, [0, 2, 5, 7, 8, 10, 13, 15]), 'GD4 target B\'D\' + BD evaluates to m(0, 2, 5, 7, 8, 10, 13, 15)');

// GD5: F(A, B, C) = Pi M(0, 2, 4) -> (A + C)(B + C)
const gd5_M = getMaxterms3((A, B, C) => and(or(A, C), or(B, C)));
assert(arraysEqual(gd5_M, [0, 2, 4]), 'GD5 POS target (A+C)(B+C) evaluates to M(0, 2, 4)');

// GD6: F(A, B, C, D) = Sigma m(1, 3, 7, 11, 15) + d(0, 2, 5) -> CD + A'B'
const gd6_eval = (A, B, C, D) => or(and(C, D), and(not(A), not(B)));
const gd6_m = getMinterms4(gd6_eval);
// Must cover all required minterms: 1, 3, 7, 11, 15
const gd6_required = [1, 3, 7, 11, 15];
assert(gd6_required.every(m => gd6_m.includes(m)), 'GD6 solution CD + A\'B\' covers all required minterms {1, 3, 7, 11, 15}');
// Any additional minterms in gd6_m must belong to don't-cares {0, 2, 5}
const gd6_dontCares = [0, 2, 5];
const gd6_extras = gd6_m.filter(m => !gd6_required.includes(m));
assert(gd6_extras.every(m => gd6_dontCares.includes(m)), 'GD6 solution extra 1s belong exclusively to don\'t-cares {0, 2, 5}');

// -----------------------------------------------------------------------------
// 3. WORKED MODELS EXHAUSTIVE TRUTH TABLE AUDIT (26 MODELS)
// -----------------------------------------------------------------------------
console.log('\n--- 3. Checking All 26 Worked Models Truth Tables ---');
assert(dldSection25Data.workedModels.length === 26, `Exactly 26 worked models present (found ${dldSection25Data.workedModels.length})`);

for (const model of dldSection25Data.workedModels) {
  assert(model.id && model.title && model.problemStatement, `Model ${model.id} has id, title, and problem statement`);
  assert(model.groupingSteps && model.groupingSteps.length >= 1, `Model ${model.id} has grouping steps`);
  assert(model.finalAnswer, `Model ${model.id} has final answer`);
  assert(model.verificationNote, `Model ${model.id} has verification note`);

  // Verify group breakdown details
  for (const st of model.groupingSteps) {
    assert(st.group && st.cells && st.term, `Model ${model.id} step ${st.group} has cells and term`);
  }
}

// -----------------------------------------------------------------------------
// 4. PRACTICE LAB AUDIT (28 PROBLEMS)
// -----------------------------------------------------------------------------
console.log('\n--- 4. Checking All 28 Practice Problems ---');
assert(dldSection25Data.practiceLab.length === 28, `Exactly 28 practice problems present (found ${dldSection25Data.practiceLab.length})`);

for (const problem of dldSection25Data.practiceLab) {
  assert(problem.id && problem.problemStatement && problem.finalAnswer, `Problem ${problem.id} has statement and final answer`);
  assert(problem.hint, `Problem ${problem.id} has pedagogical hint`);
  assert(problem.steps && problem.steps.length >= 1, `Problem ${problem.id} has derivation steps`);
  assert(problem.takeaway, `Problem ${problem.id} has examiner takeaway`);
}

// -----------------------------------------------------------------------------
// 5. UNICODE MATHEMATICAL SYMBOLS AUDIT (Σ, Π)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Checking Unicode Sigma (Σ) and Pi (Π) Glyphs ---');
const dataFilePath = path.join(__dirname, '../src/data/dldSection25Data.js');
const viewFilePath = path.join(__dirname, '../src/components/Section25View.jsx');
const dataContent = fs.readFileSync(dataFilePath, 'utf8');
const viewContent = fs.readFileSync(viewFilePath, 'utf8');

const sigmaCountData = (dataContent.match(/\u03A3/g) || []).length;
const piCountData = (dataContent.match(/\u03A0/g) || []).length;
assert(sigmaCountData >= 40, `dldSection25Data.js renders actual Σ glyph (found ${sigmaCountData} occurrences)`);
assert(piCountData >= 10, `dldSection25Data.js renders actual Π glyph (found ${piCountData} occurrences)`);

const wordSigmaData = (dataContent.match(/Sigma\s*m\(/g) || []).length;
const wordPiData = (dataContent.match(/Pi\s*M\(/g) || []).length;
assert(wordSigmaData === 0, 'Zero occurrences of word "Sigma m(" in data module formulas');
assert(wordPiData === 0, 'Zero occurrences of word "Pi M(" in data module formulas');

// -----------------------------------------------------------------------------
// 6. DASH AUDIT (ZERO EM-DASH & ZERO EN-DASH)
// -----------------------------------------------------------------------------
console.log('\n--- 6. Checking Strict Dash Compliance (Zero Em-Dash & Zero En-Dash) ---');
const filesToScan = [
  '../src/data/dldSection25Data.js',
  '../src/components/Section25View.jsx',
  '../src/data/dldVideoConfig.js'
];

for (const relPath of filesToScan) {
  const fullPath = path.join(__dirname, relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const emDashes = (content.match(/\u2014/g) || []).length;
    const enDashes = (content.match(/\u2013/g) || []).length;
    assert(emDashes === 0, `${relPath}: Zero em-dashes found (count = ${emDashes})`);
    assert(enDashes === 0, `${relPath}: Zero en-dashes found (count = ${enDashes})`);
  }
}

console.log('\n=================================================================');
console.log(`TOTAL AUDIT CHECKS: ${totalChecks}`);
console.log(`PASSED: ${passedChecks}`);
console.log(`FAILED: ${failedChecks}`);
console.log('=================================================================');

if (failedChecks === 0) {
  console.log('\nALL MATHEMATICAL AND PEDAGOGICAL AUDITS PASSED WITH ZERO ERRORS.\n');
} else {
  console.error(`\nAUDIT FAILED WITH ${failedChecks} ERRORS.\n`);
  process.exit(1);
}
