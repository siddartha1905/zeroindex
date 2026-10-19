/**
 * Comprehensive Academic & Mathematical Verification Suite
 * Digital Logic Design (DLD) - Unit 2: Boolean Algebra & Gate-Level Minimization
 * ZeroIndex Engineering Platform
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes.
 */

import fs from 'fs';
import path from 'path';
import { 
  parseBooleanExpression, 
  evaluateAst, 
  extractVariables, 
  generateTruthTable, 
  minimizeKMap, 
  areExpressionsEquivalent, 
  traceAlgebraicSimplification,
  buildNandSynthesis,
  buildNorSynthesis
} from '../src/utils/booleanEngine.js';
import { dldSection22Data } from '../src/data/dldSection22Data.js';
import { dldSection23Data } from '../src/data/dldSection23Data.js';
import { dldSection24Data } from '../src/data/dldSection24Data.js';
import { dldSection25Data } from '../src/data/dldSection25Data.js';
import { dldSection26Data } from '../src/data/dldSection26Data.js';
import { dldSection27Data } from '../src/data/dldSection27Data.js';
import { unit2QuizBank, unit2QuizTracks } from '../src/data/unit2QuizBank.js';

let passedChecks = 0;
let totalChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    process.exit(1);
  }
  passedChecks++;
}

console.log("=== ZEROINDEX DLD UNIT 2: COMPREHENSIVE VERIFICATION SUITE ===");

// ----------------------------------------------------------------------------
// 1. BOOLEAN THEOREMS & IDENTITIES PROOF
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 1] Huntington Postulates & Boolean Algebraic Theorems");

assert(areExpressionsEquivalent("A + A'B", "A + B", ["A", "B"]), "Redundancy Law: A + A'B = A + B");
assert(areExpressionsEquivalent("A(A' + B)", "AB", ["A", "B"]), "Dual Redundancy: A(A' + B) = AB");
assert(areExpressionsEquivalent("AB + AB'", "A", ["A", "B"]), "Combining Law: AB + AB' = A");
assert(areExpressionsEquivalent("(A + B)(A + B')", "A", ["A", "B"]), "Dual Combining: (A+B)(A+B') = A");
assert(areExpressionsEquivalent("A + AB", "A", ["A", "B"]), "Absorption 1: A + AB = A");
assert(areExpressionsEquivalent("A(A + B)", "A", ["A", "B"]), "Dual Absorption: A(A+B) = A");
assert(areExpressionsEquivalent("(A + B)'", "A'B'", ["A", "B"]), "De Morgan OR: (A + B)' = A'B'");
assert(areExpressionsEquivalent("(AB)'", "A' + B'", ["A", "B"]), "De Morgan AND: (AB)' = A' + B'");
assert(areExpressionsEquivalent("A + BC", "(A + B)(A + C)", ["A", "B", "C"]), "Second Distributive Law: A + BC = (A+B)(A+C)");
assert(areExpressionsEquivalent("AB + A'C + BC", "AB + A'C", ["A", "B", "C"]), "Consensus Theorem: AB + A'C + BC = AB + A'C");
assert(areExpressionsEquivalent("(A + B)(A' + C)(B + C)", "(A + B)(A' + C)", ["A", "B", "C"]), "Dual Consensus Theorem: (A+B)(A'+C)(B+C) = (A+B)(A'+C)");

// ----------------------------------------------------------------------------
// 2. SECTION 2.2 WORKED MODELS VERIFICATION
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 2] Section 2.2 Progressive Worked Models Equivalence");

assert(areExpressionsEquivalent("A + AB", "A", ["A", "B"]), "WM2.2-01: A + AB = A");
assert(areExpressionsEquivalent("AB + AB'", "A", ["A", "B"]), "WM2.2-02: AB + AB' = A");
assert(areExpressionsEquivalent("(A + B)(A + B')", "A", ["A", "B"]), "WM2.2-03: (A+B)(A+B') = A");
assert(areExpressionsEquivalent("A(A + B)", "A", ["A", "B"]), "WM2.2-04: A(A+B) = A");
assert(areExpressionsEquivalent("A + A'B", "A + B", ["A", "B"]), "WM2.2-05: A + A'B = A + B");
assert(areExpressionsEquivalent("A(A' + B)", "AB", ["A", "B"]), "WM2.2-06: A(A'+B) = AB");
assert(areExpressionsEquivalent("A'B + AB + AB'", "A + B", ["A", "B"]), "WM2.2-07: A'B + AB + AB' = A + B");
assert(areExpressionsEquivalent("(A + B)' + AB", "AB + A'B'", ["A", "B"]), "WM2.2-08: (A+B)' + AB = AB + A'B'");
assert(areExpressionsEquivalent("AB + A'(B + C) + B'(B + D)", "B + D + A'C", ["A", "B", "C", "D"]), "WM2.2-09: Complex multi-term simplification");
assert(areExpressionsEquivalent("(A + B)(A' + C)", "AC + A'B", ["A", "B", "C"]), "WM2.2-10: (A+B)(A'+C) = AC + A'B");
assert(areExpressionsEquivalent("AB + A'C + BC", "AB + A'C", ["A", "B", "C"]), "WM2.2-11: Consensus proof equivalence");
assert(areExpressionsEquivalent("(A + B)(A' + C)(B + C)", "(A + B)(A' + C)", ["A", "B", "C"]), "WM2.2-12: Dual consensus proof equivalence");
assert(areExpressionsEquivalent("A'B'C' + A'BC' + AB'C' + ABC'", "C'", ["A", "B", "C"]), "WM2.2-13: 4 minterms reduce to C'");
assert(areExpressionsEquivalent("[(AB)' + A']' + A(B + C')'", "A(B + C)", ["A", "B", "C"]), "WM2.2-14: Multi-level De Morgan reduction");
assert(areExpressionsEquivalent("(A + B + C)(A + B + C')(A + B' + C)", "A + BC", ["A", "B", "C"]), "WM2.2-15: POS algebraic combining to A + BC");

// ----------------------------------------------------------------------------
// 3. SECTION 2.3 & 2.4 CANONICAL CONVERSIONS & INDEX SETS
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 3] Section 2.3 & 2.4 Canonical SOP/POS & Index Equivalence");

// F(A, B, C) = Sigma m(1, 3, 5, 7) = C = Pi M(0, 2, 4, 6)
const tt_c = generateTruthTable("C", ["A", "B", "C"]);
assert(JSON.stringify(tt_c.minterms) === JSON.stringify([1, 3, 5, 7]), "WM2.3-01: Minterms for C are {1, 3, 5, 7}");
assert(JSON.stringify(tt_c.maxterms) === JSON.stringify([0, 2, 4, 6]), "WM2.3-01: Maxterms for C are {0, 2, 4, 6}");

// F(A, B, C) = AB + C' -> Sigma m(0, 2, 4, 6, 7)
const tt_ab_cp = generateTruthTable("AB + C'", ["A", "B", "C"]);
assert(JSON.stringify(tt_ab_cp.minterms) === JSON.stringify([0, 2, 4, 6, 7]), "WM2.3-03: Minterms for AB + C' are {0, 2, 4, 6, 7}");

// F(x, y, z) = (x + y)(y' + z) -> Pi M(0, 1, 2, 6)
const tt_pos_0126 = generateTruthTable("(A + B)(B' + C)", ["A", "B", "C"]);
assert(JSON.stringify(tt_pos_0126.maxterms) === JSON.stringify([0, 1, 2, 6]), "WM2.3-04: Maxterms for (A+B)(B'+C) are {0, 1, 2, 6}");

// ----------------------------------------------------------------------------
// 4. SECTION 2.5 KARNAUGH MAP ALGORITHMS & SPECIAL CASES
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 4] Section 2.5 Karnaugh Map Minimization Engine");

// 2-Var: Sigma m(1, 3) -> B
const km_2v = minimizeKMap([1, 3], [], ["A", "B"], "SOP");
assert(km_2v.minimalExpression === "B", "KM2.5-01: 2-var m(1, 3) minimizes to B");

// 3-Var: Sigma m(1, 3, 5, 7) -> C
const km_3v = minimizeKMap([1, 3, 5, 7], [], ["A", "B", "C"], "SOP");
assert(km_3v.minimalExpression === "C", "KM2.5-04: 3-var m(1, 3, 5, 7) minimizes to C");

// 3-Var Wrapping: Sigma m(0, 2, 4, 6) -> C'
const km_3v_wrap = minimizeKMap([0, 2, 4, 6], [], ["A", "B", "C"], "SOP");
assert(km_3v_wrap.minimalExpression === "C'", "KM2.5-05: 3-var edge wrapping m(0, 2, 4, 6) minimizes to C'");

// 4-Var Four Corners: Sigma m(0, 2, 8, 10) -> B'D'
const km_corners = minimizeKMap([0, 2, 8, 10], [], ["A", "B", "C", "D"], "SOP");
assert(km_corners.minimalExpression === "B'D'", "KM2.5-10: 4-corner quad m(0, 2, 8, 10) minimizes to B'D'");

// 4-Var Octet: Sigma m(0, 1, 2, 3, 8, 9, 10, 11) -> B'
const km_octet = minimizeKMap([0, 1, 2, 3, 8, 9, 10, 11], [], ["A", "B", "C", "D"], "SOP");
assert(km_octet.minimalExpression === "B'", "KM2.5-11: 4-var octet minimizes to B'");

// Don't-Care Condition: Sigma m(1, 3, 7) + d(5) -> C
const km_dc = minimizeKMap([1, 3, 7], [5], ["A", "B", "C"], "SOP");
assert(km_dc.minimalExpression === "C", "KM2.5-16: Don't-care d(5) simplifies {1, 3, 7} to C");

// Trivial Full Map: all 1s -> 1
const km_full = minimizeKMap([0, 1, 2, 3], [], ["A", "B"], "SOP");
assert(km_full.minimalExpression === "1", "KM2.5-20: Full map evaluates to 1");

// ----------------------------------------------------------------------------
// 5. SECTION 2.6 & 2.7 UNIVERSAL GATES & XOR DERIVATIONS
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 5] Universal Logic Synthesis & XOR Network Verification");

// NAND-NAND realization of AB + CD
const nandSynth = buildNandSynthesis("AB + CD");
assert(nandSynth.gates.length === 3, "WM2.6-01: F = AB + CD requires exactly 3 NAND gates");
assert(nandSynth.gates[0].inputs.includes("A") && nandSynth.gates[0].inputs.includes("B"), "NAND Gate 1 inputs A, B");
assert(nandSynth.gates[1].inputs.includes("C") && nandSynth.gates[1].inputs.includes("D"), "NAND Gate 2 inputs C, D");

// NOR-NOR realization of (A+B)(C+D)
const norSynth = buildNorSynthesis("(A + B)(C + D)");
assert(norSynth.gates.length === 3, "WM2.6-02: F = (A+B)(C+D) requires exactly 3 NOR gates");

// 4-NAND XOR Signal Tracing Proof across all 4 combinations
const xorStates = [
  { A: 0, B: 0, expected: 0 },
  { A: 0, B: 1, expected: 1 },
  { A: 1, B: 0, expected: 1 },
  { A: 1, B: 1, expected: 0 }
];

xorStates.forEach(st => {
  const { A, B, expected } = st;
  const N1 = (A && B) ? 0 : 1;
  const N2 = (A && N1) ? 0 : 1;
  const N3 = (B && N1) ? 0 : 1;
  const N4 = (N2 && N3) ? 0 : 1;
  assert(N4 === expected, `4-NAND XOR state [A=${A}, B=${B}]: N4=${N4} matches ${expected}`);
});

// 5-NOR XOR Signal Tracing Proof across all 4 combinations
xorStates.forEach(st => {
  const { A, B, expected } = st;
  const R1 = (!A && !B) ? 1 : 0;
  const R2 = (!A && !R1) ? 1 : 0;
  const R3 = (!B && !R1) ? 1 : 0;
  const R4_xnor = (!R2 && !R3) ? 1 : 0;
  const R5_xor = (!R4_xnor && !R4_xnor) ? 1 : 0;
  assert(R5_xor === expected, `5-NOR XOR state [A=${A}, B=${B}]: R5=${R5_xor} matches ${expected}`);
});

// ----------------------------------------------------------------------------
// 6. UNIT 2 PRACTICE QUESTION BANK VALIDATION (110 QUESTIONS)
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 6] Unit 2 Practice Arena 110-Question Bank Validation");

assert(unit2QuizBank.length === 110, `Quiz bank contains exactly 110 questions (actual: ${unit2QuizBank.length})`);
assert(unit2QuizTracks.length === 5, "Quiz bank has 5 comprehensive tracks (All, Laws, Canonical, K-Maps, Gates/XOR)");

unit2QuizBank.forEach((q, idx) => {
  assert(q.id && q.id.startsWith("u2-q"), `Q${idx + 1} has valid ID prefix: ${q.id}`);
  assert(q.question && q.question.length > 10, `Q${idx + 1} has complete question text`);
  assert(q.correctAnswer && q.correctAnswer.length > 0, `Q${idx + 1} has non-empty correctAnswer`);
  assert(Array.isArray(q.options) && q.options.length === 4, `Q${idx + 1} has exactly 4 options`);
  
  const correctOpts = q.options.filter(o => o.isCorrect);
  assert(correctOpts.length === 1, `Q${idx + 1} has exactly one correct option marked`);
  assert(correctOpts[0].text === q.correctAnswer, `Q${idx + 1} marked correct option matches correctAnswer field`);
  assert(q.solution && q.solution.finalAnswer, `Q${idx + 1} has complete verified solution`);
});

// ----------------------------------------------------------------------------
// 7. ZERO EM-DASH & ZERO EN-DASH AUDIT
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 7] Zero Em-Dash (\\u2014) and Zero En-Dash (\\u2013) Audit");

const filesToAudit = [
  './src/utils/booleanEngine.js',
  './src/data/dldSection22Data.js',
  './src/data/dldSection23Data.js',
  './src/data/dldSection24Data.js',
  './src/data/dldSection25Data.js',
  './src/data/dldSection26Data.js',
  './src/data/dldSection27Data.js',
  './src/data/dldUnit2Master.js',
  './src/data/unit2QuizBank.js',
  './src/components/BooleanLawsCheatSheet.jsx',
  './src/components/KMapCheatSheet.jsx',
  './src/components/Section22View.jsx',
  './src/components/Section23View.jsx',
  './src/components/Section24View.jsx',
  './src/components/Section25View.jsx',
  './src/components/Section26View.jsx',
  './src/components/Section27View.jsx',
  './src/components/Unit2Solvers.jsx',
  './src/components/PracticeArena.jsx',
  './src/components/DldWorkspace.jsx',
  './src/data/dldAvailabilityConfig.js'
];

filesToAudit.forEach(filePath => {
  const absPath = path.resolve(filePath);
  const content = fs.readFileSync(absPath, 'utf8');
  const emMatches = (content.match(/\u2014/g) || []).length;
  const enMatches = (content.match(/\u2013/g) || []).length;
  assert(emMatches === 0 && enMatches === 0, `File ${filePath} strictly has 0 em-dashes and 0 en-dashes (found: em=${emMatches}, en=${enMatches})`);
});

console.log(`\n===============================================================`);
console.log(`ALL TESTS PASSED! (${passedChecks}/${totalChecks} checks successful)`);
console.log(`===============================================================\n`);
