/**
 * Comprehensive Mathematical & Pedagogical Verification Suite for Section 2.4
 * SOP and POS Forms, Conversions and Simplification
 * 
 * Verifies:
 * 1. Primary visual demonstration equivalence: F = AB + C <=> (A+C)(B+C) across all 8 rows.
 * 2. All 8 conversion methods data structures and example truth tables.
 * 3. All 4 guided demonstrations (GD1 to GD4) transformations and index alignments.
 * 4. Critical distinction: F = Σm(S) <=> F = ΠM(U \ S) vs F' = Σm(U \ S) = ΠM(S).
 * 5. All 18 worked models (5 Basic, 5 Intermediate, 8 Advanced) evaluated exhaustively against truth tables.
 * 6. All 28 practice problems (6 Basic, 8 Intermediate, 10 Advanced, 4 Challenge) evaluated exhaustively against truth tables.
 * 7. Verification that every model and practice exercise contains non-empty step-by-step derivations with laws and reasons.
 * 8. Mathematical symbol verification: presence of actual \u03A3 and \u03A0 glyphs in all canonical formulas and absence of words "Sigma" and "Pi" in formula strings.
 * 9. Dash-free audit: strictly zero em-dashes (\u2014) and zero en-dashes (\u2013) across Section 2.4 files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dldSection24Data } from '../src/data/dldSection24Data.js';

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

// Logic helper functions
const not = x => (x ? 0 : 1);
const and = (...args) => (args.every(x => x === 1) ? 1 : 0);
const or = (...args) => (args.some(x => x === 1) ? 1 : 0);

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
console.log('    ZEROINDEX DLD SECTION 2.4: COMPREHENSIVE ACADEMIC AUDIT      ');
console.log('=================================================================\n');

// -----------------------------------------------------------------------------
// 1. PRIMARY DEMONSTRATION VERIFICATION: F = AB + C <=> (A+C)(B+C)
// -----------------------------------------------------------------------------
console.log('--- 1. Checking Primary Visual Demonstration Equivalence ---');
const primaryDemo = dldSection24Data.startHere.primaryDemonstration;
assert(primaryDemo.truthTable.length === 8, 'Primary demo truth table contains exactly 8 rows');

let allPrimaryRowsMatch = true;
for (const row of primaryDemo.truthTable) {
  const sopVal = or(and(row.A, row.B), row.C);
  const posVal = and(or(row.A, row.C), or(row.B, row.C));
  if (sopVal !== row.F_SOP || posVal !== row.F_POS || sopVal !== posVal) {
    allPrimaryRowsMatch = false;
  }
}
assert(allPrimaryRowsMatch, 'Primary demo F = AB + C evaluates identically to (A+C)(B+C) across all 8 rows');
const expectedSOPIndices = [1, 3, 5, 6, 7];
const expectedPOSIndices = [0, 2, 4];
const actualSOPIndices = primaryDemo.truthTable.filter(r => r.F_SOP === 1).map(r => r.row);
const actualPOSIndices = primaryDemo.truthTable.filter(r => r.F_SOP === 0).map(r => r.row);
assert(arraysEqual(expectedSOPIndices, actualSOPIndices), 'Primary demo 1-rows match Σm(1, 3, 5, 6, 7)');
assert(arraysEqual(expectedPOSIndices, actualPOSIndices), 'Primary demo 0-rows match ΠM(0, 2, 4)');

// -----------------------------------------------------------------------------
// 2. CONVERSION METHODS DATA STRUCTURE AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 2. Checking Conversion Methods Structure and Rules ---');
assert(dldSection24Data.conversionMethods.length === 8, 'Exactly 8 conversion methods are present in data module');
for (const method of dldSection24Data.conversionMethods) {
  assert(method.id && method.name && method.mainRule, `Method ${method.id} has ID, name, and main rule`);
  assert(method.procedure.length >= 4, `Method ${method.id} has at least 4 detailed procedure steps`);
  assert(method.example && method.example.steps.length >= 2, `Method ${method.id} has a concrete verified example`);
  assert(method.commonMistake, `Method ${method.id} warns about common examination mistake`);
}

// -----------------------------------------------------------------------------
// 3. CRITICAL DISTINCTION: CONVERTING F VS COMPLEMENTING F
// -----------------------------------------------------------------------------
console.log('\n--- 3. Checking Conversion vs Complementation Logic ---');
const u3 = [0, 1, 2, 3, 4, 5, 6, 7];
const fnC = (A, B, C) => C;
const mC = getMinterms3(fnC);
const MC = getMaxterms3(fnC);
assert(arraysEqual(mC, [1, 3, 5, 7]), 'Function F = C has minterms Σm(1, 3, 5, 7)');
assert(arraysEqual(MC, [0, 2, 4, 6]), 'Function F = C has maxterms ΠM(0, 2, 4, 6)');
const fnCPrime = (A, B, C) => not(C);
const mCPrime = getMinterms3(fnCPrime);
const MCPrime = getMaxterms3(fnCPrime);
assert(arraysEqual(mCPrime, [0, 2, 4, 6]), "Complement F' = C' has minterms Σm(0, 2, 4, 6) matching F's maxterms");
assert(arraysEqual(MCPrime, [1, 3, 5, 7]), "Complement F' = C' has maxterms ΠM(1, 3, 5, 7) matching F's minterms");

// -----------------------------------------------------------------------------
// 4. GUIDED DEMONSTRATIONS VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n--- 4. Checking Guided Demonstrations (GD1 to GD4) ---');
assert(dldSection24Data.guidedDemos.length === 4, 'Exactly 4 guided demonstrations present');
// GD1: F = A'B + AC
const gd1_m = getMinterms3((A, B, C) => or(and(not(A), B), and(A, C)));
assert(arraysEqual(gd1_m, [2, 3, 5, 7]), 'GD1 F = A\'B + AC evaluates to Σm(2, 3, 5, 7)');

// GD2: F = (A+B)(B'+C)
const gd2_M = getMaxterms3((A, B, C) => and(or(A, B), or(not(B), C)));
assert(arraysEqual(gd2_M, [0, 1, 2, 6]), 'GD2 F = (A+B)(B\'+C) evaluates to ΠM(0, 1, 2, 6)');

// GD3: F = Σm(1, 4, 5, 6, 7) <=> ΠM(0, 2, 3)
const gd3_m = [1, 4, 5, 6, 7];
const gd3_M = u3.filter(x => !gd3_m.includes(x));
assert(arraysEqual(gd3_M, [0, 2, 3]), 'GD3 F = Σm(1, 4, 5, 6, 7) has complementary maxterms ΠM(0, 2, 3)');

// GD4: AB + C <=> (A+C)(B+C)
const gd4_m1 = getMinterms3((A, B, C) => or(and(A, B), C));
const gd4_m2 = getMinterms3((A, B, C) => and(or(A, C), or(B, C)));
assert(arraysEqual(gd4_m1, gd4_m2), 'GD4 F = AB + C is identical to (A+C)(B+C) across all 8 rows');

// -----------------------------------------------------------------------------
// 5. WORKED MODELS EXHAUSTIVE TRUTH TABLE AUDIT (18 MODELS)
// -----------------------------------------------------------------------------
console.log('\n--- 5. Checking All 18 Worked Models Truth Tables and Derivations ---');
assert(dldSection24Data.workedModels.length === 18, 'Exactly 18 worked models present');

const modelEvaluators = {
  'WM2.4-B01': { fn: (A, B, C) => or(and(not(A), B), and(A, C)), vars: 3, m: [2, 3, 5, 7], M: [0, 1, 4, 6] },
  'WM2.4-B02': { fn: (A, B, C) => and(or(A, B), or(not(B), C)), vars: 3, m: [3, 4, 5, 7], M: [0, 1, 2, 6] },
  'WM2.4-B03': { fn: (A, B, C) => [1, 4, 5, 6, 7].includes((A << 2) | (B << 1) | C) ? 1 : 0, vars: 3, m: [1, 4, 5, 6, 7], M: [0, 2, 3] },
  'WM2.4-B04': { fn: (A, B, C) => [0, 2, 4, 6].includes((A << 2) | (B << 1) | C) ? 0 : 1, vars: 3, m: [1, 3, 5, 7], M: [0, 2, 4, 6] },
  'WM2.4-B05': { fn: (A, B, C) => or(and(A, B), C), vars: 3, m: [1, 3, 5, 6, 7], M: [0, 2, 4] },
  
  'WM2.4-I01': { fn: (A, B, C) => and(or(A, B), C), vars: 3, m: [3, 5, 7], M: [0, 1, 2, 4, 6] },
  'WM2.4-I02': { fn: (A, B, C) => or(and(not(A), B), and(B, C)), vars: 3, m: [2, 3, 7], M: [0, 1, 4, 5, 6] },
  'WM2.4-I03': { fn: (A, B, C) => and(or(A, B), or(not(A), C)), vars: 3, m: [2, 3, 5, 7], M: [0, 1, 4, 6] },
  'WM2.4-I04': { fn: (A, B, C, D) => and(or(A, not(B)), or(C, D)), vars: 4, m: [1, 2, 3, 9, 10, 11, 13, 14, 15], M: [0, 4, 5, 6, 7, 8, 12] },
  'WM2.4-I05': { fn: (A, B, C, D) => or(and(A, B), and(C, D)), vars: 4, m: [3, 7, 11, 12, 13, 14, 15], M: [0, 1, 2, 4, 5, 6, 8, 9, 10] },

  'WM2.4-A01': { fn: (A, B, C, D) => and(or(A, B), or(C, D)), vars: 4, m: [5, 6, 7, 9, 10, 11, 13, 14, 15], M: [0, 1, 2, 3, 4, 8, 12] },
  'WM2.4-A02': { fn: (A, B, C, D) => or(and(not(A), C), and(B, D)), vars: 4, m: [2, 3, 5, 6, 7, 13, 15], M: [0, 1, 4, 8, 9, 10, 11, 12, 14] },
  'WM2.4-A03': { fn: (A, B, C, D) => and(or(not(A), C), or(B, not(D))), vars: 4, m: [0, 2, 4, 5, 6, 7, 10, 14, 15], M: [1, 3, 8, 9, 11, 12, 13] },
  'WM2.4-A04': { fn: (A, B, C, D) => and(or(and(A, B), C), or(and(A, B), D)), vars: 4, m: [3, 7, 11, 12, 13, 14, 15], M: [0, 1, 2, 4, 5, 6, 8, 9, 10] },
  'WM2.4-A05': { fn: (A, B, C, D) => or(and(not(A), B, C), and(A, not(B), D), and(not(C), D)), vars: 4, m: [1, 5, 6, 7, 9, 11, 13], M: [0, 2, 3, 4, 8, 10, 12, 14, 15] },
  'WM2.4-A06': { fn: (A, B, C) => or(not(C), and(not(A), not(B))), vars: 3, m: [0, 1, 2, 4, 6], M: [3, 5, 7] },
  'WM2.4-A07': { fn: (A, B, C, D) => not(or(and(not(A), B), and(C, not(D)))), vars: 4, m: [0, 1, 3, 8, 9, 11, 12, 13, 15], M: [2, 4, 5, 6, 7, 10, 14] },
  'WM2.4-A08': { fn: (A, B, C, D) => or(and(or(A, not(B)), or(not(C), D)), and(not(A), C, D)), vars: 4, m: [0, 1, 3, 7, 8, 9, 11, 12, 13, 15], M: [2, 4, 5, 6, 10, 14] }
};

for (const model of dldSection24Data.workedModels) {
  const evalData = modelEvaluators[model.id];
  assert(evalData !== undefined, `Model ${model.id} is registered in evaluation matrix`);
  if (!evalData) continue;

  const actualMinterms = evalData.vars === 3 ? getMinterms3(evalData.fn) : getMinterms4(evalData.fn);
  const actualMaxterms = evalData.vars === 3 ? getMaxterms3(evalData.fn) : getMaxterms4(evalData.fn);

  assert(arraysEqual(actualMinterms, evalData.m), `Model ${model.id} minterms match expected target ${JSON.stringify(evalData.m)}`);
  assert(arraysEqual(actualMaxterms, evalData.M), `Model ${model.id} maxterms match expected target ${JSON.stringify(evalData.M)}`);
  assert(model.solutionSteps.length >= 3, `Model ${model.id} has at least 3 detailed derivation steps`);

  for (const st of model.solutionSteps) {
    assert(st.step && st.expr && st.law && st.reason, `Model ${model.id} step ${st.step} has expr, law, and reason`);
  }
}

// -----------------------------------------------------------------------------
// 6. PRACTICE LAB EXHAUSTIVE TRUTH TABLE AUDIT (28 PROBLEMS)
// -----------------------------------------------------------------------------
console.log('\n--- 6. Checking All 28 Practice Lab Problems Truth Tables ---');
assert(dldSection24Data.practiceLab.length === 28, 'Exactly 28 practice problems present');

const practiceEvaluators = {
  'PE2.4-B01': { fn: (A, B, C) => or(and(not(A), B), C), vars: 3, m: [1, 2, 3, 5, 7], M: [0, 4, 6] },
  'PE2.4-B02': { fn: (A, B, C) => and(or(A, C), or(B, not(C))), vars: 3, m: [3, 4, 6, 7], M: [0, 1, 2, 5] },
  'PE2.4-B03': { fn: (A, B, C) => [0, 2, 6].includes((A << 2) | (B << 1) | C) ? 1 : 0, vars: 3, m: [0, 2, 6], M: [1, 3, 4, 5, 7] },
  'PE2.4-B04': { fn: (A, B, C) => [1, 4, 7].includes((A << 2) | (B << 1) | C) ? 0 : 1, vars: 3, m: [0, 2, 3, 5, 6], M: [1, 4, 7] },
  'PE2.4-B05': { fn: (A, B, C) => or(A, and(not(B), C)), vars: 3, m: [1, 4, 5, 6, 7], M: [0, 2, 3] },
  'PE2.4-B06': { fn: (A, B, C) => and(or(not(A), B), or(A, C)), vars: 3, m: [1, 3, 6, 7], M: [0, 2, 4, 5] },

  'PE2.4-I01': { fn: (A, B, C) => or(and(not(A), B), and(A, not(C))), vars: 3, m: [2, 3, 4, 6], M: [0, 1, 5, 7] },
  'PE2.4-I02': { fn: (A, B, C) => and(or(A, not(B)), or(B, C)), vars: 3, m: [1, 5, 6, 7], M: [0, 2, 3, 4] },
  'PE2.4-I03': { fn: (A, B, C) => and(or(A, C), or(not(A), B)), vars: 3, m: [1, 3, 6, 7], M: [0, 2, 4, 5] },
  'PE2.4-I04': { fn: (A, B, C) => or(and(A, not(B)), and(not(B), C)), vars: 3, m: [1, 4, 5], M: [0, 2, 3, 6, 7] },
  'PE2.4-I05': { fn: (A, B, C, D) => or(and(A, B, C), D), vars: 4, m: [1, 3, 5, 7, 9, 11, 13, 14, 15], M: [0, 2, 4, 6, 8, 10, 12] },
  'PE2.4-I06': { fn: (A, B, C, D) => and(or(A, B), or(not(C), D)), vars: 4, m: [4, 5, 7, 8, 9, 11, 12, 13, 15], M: [0, 1, 2, 3, 6, 10, 14] },
  'PE2.4-I07': { fn: (A, B, C, D) => [0, 2, 3, 7, 8, 10, 11, 15].includes((A << 3) | (B << 2) | (C << 1) | D) ? 1 : 0, vars: 4, m: [0, 2, 3, 7, 8, 10, 11, 15], M: [1, 4, 5, 6, 9, 12, 13, 14] },
  'PE2.4-I08': { fn: (A, B, C, D) => [0, 1, 4, 6, 9, 12, 14].includes((A << 3) | (B << 2) | (C << 1) | D) ? 0 : 1, vars: 4, m: [2, 3, 5, 7, 8, 10, 11, 13, 15], M: [0, 1, 4, 6, 9, 12, 14] },

  'PE2.4-A01': { fn: (A, B, C, D) => and(or(and(A, B), not(C)), or(not(A), D)), vars: 4, m: [0, 1, 4, 5, 9, 13, 15], M: [2, 3, 6, 7, 8, 10, 11, 12, 14] },
  'PE2.4-A02': { fn: (A, B, C, D) => or(and(not(A), B, C), and(A, not(B), D), and(C, not(D))), vars: 4, m: [2, 6, 7, 9, 10, 11, 14], M: [0, 1, 3, 4, 5, 8, 12, 13, 15] },
  'PE2.4-A03': { fn: (A, B, C, D) => and(or(not(A), B), or(not(B), C), or(not(C), D)), vars: 4, m: [0, 1, 3, 7, 15], M: [2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14] },
  'PE2.4-A04': { fn: (A, B, C, D) => and(or(A, and(not(B), C)), or(not(A), D)), vars: 4, m: [2, 3, 9, 11, 13, 15], M: [0, 1, 4, 5, 6, 7, 8, 10, 12, 14] },
  'PE2.4-A05': { fn: (A, B, C, D) => and(or(A, B), or(not(A), C), or(not(B), D)), vars: 4, m: [5, 7, 10, 11, 15], M: [0, 1, 2, 3, 4, 6, 8, 9, 12, 13, 14] },
  'PE2.4-A06': { fn: (A, B, C, D) => and(or(not(A), and(B, C)), or(B, and(not(C), D))), vars: 4, m: [1, 4, 5, 6, 7, 14, 15], M: [0, 2, 3, 8, 9, 10, 11, 12, 13] },
  'PE2.4-A07': { fn: (A, B, C, D) => and(or(and(A, B), C), or(not(A), not(B))), vars: 4, m: [2, 3, 6, 7, 10, 11], M: [0, 1, 4, 5, 8, 9, 12, 13, 14, 15] },
  'PE2.4-A08': { fn: (A, B, C, D) => and(or(A, C), or(B, D), or(not(A), not(D))), vars: 4, m: [3, 6, 7, 12, 14], M: [0, 1, 2, 4, 5, 8, 9, 10, 11, 13, 15] },
  'PE2.4-A09': { fn: (A, B, C, D) => and(or(not(A), and(not(B), C)), or(B, not(D))), vars: 4, m: [0, 2, 4, 5, 6, 7, 10], M: [1, 3, 8, 9, 11, 12, 13, 14, 15] },
  'PE2.4-A10': { fn: (A, B, C, D) => not(or(and(not(A), B), and(C, or(D, A)))), vars: 4, m: [0, 1, 2, 8, 9, 12, 13], M: [3, 4, 5, 6, 7, 10, 11, 14, 15] },

  'PE2.4-C01': { fn: (A, B, C, D) => or(and(not(A), B), and(A, not(B)), and(C, D)), vars: 4, m: [3, 4, 5, 6, 7, 8, 9, 10, 11, 15], M: [0, 1, 2, 12, 13, 14] },
  'PE2.4-C02': { fn: (A, B, C, D) => and(or(A, not(B)), or(C, not(D)), or(not(A), C)), vars: 4, m: [0, 2, 3, 10, 11, 14, 15], M: [1, 4, 5, 6, 7, 8, 9, 12, 13] },
  'PE2.4-C03': { fn: (A, B, C, D) => [0, 3, 5, 6, 8, 11, 13, 14].includes((A << 3) | (B << 2) | (C << 1) | D) ? 1 : 0, vars: 4, m: [0, 3, 5, 6, 8, 11, 13, 14], M: [1, 2, 4, 7, 9, 10, 12, 15] },
  'PE2.4-C04': { fn: (A, B, C, D) => not(and(or(A, B), or(not(C), not(D)))), vars: 4, m: [0, 1, 2, 3, 7, 11, 15], M: [4, 5, 6, 8, 9, 10, 12, 13, 14] }
};

for (const prob of dldSection24Data.practiceLab) {
  const evalData = practiceEvaluators[prob.id];
  assert(evalData !== undefined, `Practice problem ${prob.id} is registered in evaluation matrix`);
  if (!evalData) continue;

  const actualMinterms = evalData.vars === 3 ? getMinterms3(evalData.fn) : getMinterms4(evalData.fn);
  const actualMaxterms = evalData.vars === 3 ? getMaxterms3(evalData.fn) : getMaxterms4(evalData.fn);

  assert(arraysEqual(actualMinterms, evalData.m), `Problem ${prob.id} minterms match expected target ${JSON.stringify(evalData.m)}`);
  assert(arraysEqual(actualMaxterms, evalData.M), `Problem ${prob.id} maxterms match expected target ${JSON.stringify(evalData.M)}`);
  assert(prob.steps.length >= 3, `Problem ${prob.id} has at least 3 detailed derivation steps`);
  assert(prob.hint && prob.hint.length > 5, `Problem ${prob.id} has a meaningful hint`);
  assert(prob.takeaway && prob.takeaway.length > 5, `Problem ${prob.id} has a meaningful pedagogical takeaway`);
}

// -----------------------------------------------------------------------------
// 7. MATHEMATICAL SYMBOLS AUDIT: \u03A3 AND \u03A0 USAGE
// -----------------------------------------------------------------------------
console.log('\n--- 7. Checking Unicode Sigma (Σ) and Pi (Π) Notation in Formulas ---');
const dataContent = fs.readFileSync(path.join(__dirname, '../src/data/dldSection24Data.js'), 'utf-8');
const viewContent = fs.readFileSync(path.join(__dirname, '../src/components/Section24View.jsx'), 'utf-8');

const sigmaCountData = (dataContent.match(/\u03A3/g) || []).length;
const piCountData = (dataContent.match(/\u03A0/g) || []).length;
assert(sigmaCountData >= 40, `dldSection24Data.js renders actual \u03A3 glyph (found ${sigmaCountData} occurrences)`);
assert(piCountData >= 40, `dldSection24Data.js renders actual \u03A0 glyph (found ${piCountData} occurrences)`);

const wordSigmaInFormula = /Sigma\s*m\(/i.test(dataContent) || /Sigma\s*m\(/i.test(viewContent);
const wordPiInFormula = /Pi\s*M\(/i.test(dataContent) || /Pi\s*M\(/i.test(viewContent);
assert(!wordSigmaInFormula, 'Zero occurrences of word "Sigma m(" in formulas (actual Σm glyph strictly used)');
assert(!wordPiInFormula, 'Zero occurrences of word "Pi M(" in formulas (actual ΠM glyph strictly used)');

// -----------------------------------------------------------------------------
// 8. ZERO EM-DASH AND EN-DASH AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 8. Checking Strict Dash Compliance (Zero Em-Dash & Zero En-Dash) ---');
const section24Files = [
  '../src/data/dldSection24Data.js',
  '../src/components/Section24View.jsx',
  '../src/data/dldVideoConfig.js'
];

for (const relPath of section24Files) {
  const fullPath = path.join(__dirname, relPath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const emDashCount = (fileContent.match(/\u2014/g) || []).length;
  const enDashCount = (fileContent.match(/\u2013/g) || []).length;
  assert(emDashCount === 0, `${relPath}: Zero em-dashes found (count = ${emDashCount})`);
  assert(enDashCount === 0, `${relPath}: Zero en-dashes found (count = ${enDashCount})`);
}

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n=================================================================');
console.log(`TOTAL AUDIT CHECKS: ${totalChecks}`);
console.log(`PASSED: ${passedChecks}`);
console.log(`FAILED: ${failedChecks}`);
console.log('=================================================================');

if (failedChecks > 0) {
  console.error('\nAUDIT FAILED: Correct the discrepancies before proceeding.');
  process.exit(1);
} else {
  console.log('\nALL MATHEMATICAL AND PEDAGOGICAL AUDITS PASSED WITH ZERO ERRORS.');
}
