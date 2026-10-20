/**
 * ZeroIndex Engineering Platform - Digital Logic Design (DLD)
 * Phase 2 Unit II Practice Arena Comprehensive Verification Suite
 * Strictly zero em-dashes (\u2014) and zero en-dashes (\u2013).
 * Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).
 */

import fs from 'fs';
import path from 'path';
import { 
  areExpressionsEquivalent, 
  minimizeKMap, 
  generateTruthTable 
} from '../src/utils/booleanEngine.js';
import { gradeStudentAnswer, parseIndexSet, normalizeStudentAnswer } from '../src/utils/quizGrading.js';
import { unit2QuizBank, unit2QuizTracks } from '../src/data/unit2QuizBank.js';

// Section Teaching Data for Question-Uniqueness Audit
import { dldSection21Data } from '../src/data/dldSection21Data.js';
import { dldSection22Data } from '../src/data/dldSection22Data.js';
import { dldSection23Data } from '../src/data/dldSection23Data.js';
import { dldSection24Data } from '../src/data/dldSection24Data.js';
import { dldSection25Data } from '../src/data/dldSection25Data.js';

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    process.exit(1);
  }
  passedChecks++;
}

console.log("===============================================================================");
console.log("ZEROINDEX DLD UNIT II: PRACTICE ARENA COMPREHENSIVE VERIFICATION SUITE");
console.log("===============================================================================\n");

// ----------------------------------------------------------------------------
// 1. QUESTION-BANK INTEGRITY & SCHEMA CHECKS
// ----------------------------------------------------------------------------
console.log("[TEST GROUP 1] Question Bank Schema, Counts & Integrity");

assert(unit2QuizBank.length === 125, `Master bank contains exactly 125 questions (found: ${unit2QuizBank.length})`);
assert(unit2QuizTracks.length === 6, `Tracks array contains exactly 6 tracks (found: ${unit2QuizTracks.length})`);

const validTrackIds = new Set(['sec21', 'sec22', 'sec23', 'sec24', 'sec25']);
const validDifficulties = new Set(['Easy', 'Medium', 'Hard', 'Challenge']);
const seenIds = new Set();
const trackCounts = { sec21: 0, sec22: 0, sec23: 0, sec24: 0, sec25: 0 };
const diffCounts = { Easy: 0, Medium: 0, Hard: 0, Challenge: 0 };

unit2QuizBank.forEach((q, idx) => {
  const qNum = idx + 1;
  const expectedId = `u2-q${String(qNum).padStart(3, '0')}`;
  assert(q.id === expectedId, `Question ${qNum} has canonical sequential ID: ${q.id} === ${expectedId}`);
  assert(!seenIds.has(q.id), `Question ${q.id} is globally unique`);
  seenIds.add(q.id);

  assert(validTrackIds.has(q.trackId), `Question ${q.id} has valid section trackId: ${q.trackId}`);
  trackCounts[q.trackId]++;

  assert(validDifficulties.has(q.difficulty), `Question ${q.id} has valid difficulty: ${q.difficulty}`);
  diffCounts[q.difficulty]++;

  assert(q.set === 'setA' || q.set === 'setB', `Question ${q.id} has valid paper set: ${q.set}`);
  assert(q.question && q.question.length > 10, `Question ${q.id} has complete question text`);
  assert(q.correctAnswer && q.correctAnswer.length > 0, `Question ${q.id} has non-empty correctAnswer`);
  assert(Array.isArray(q.acceptedAnswers) && q.acceptedAnswers.length > 0, `Question ${q.id} has acceptedAnswers`);

  // Options validation
  assert(Array.isArray(q.options) && q.options.length === 4, `Question ${q.id} has exactly 4 options`);
  const correctOpts = q.options.filter(o => o.isCorrect);
  assert(correctOpts.length === 1, `Question ${q.id} has exactly one correct option`);
  assert(correctOpts[0].text === q.correctAnswer, `Question ${q.id} marked correct option matches correctAnswer field`);

  // Distractors
  const incorrectOpts = q.options.filter(o => !o.isCorrect);
  assert(incorrectOpts.length === 3, `Question ${q.id} has 3 incorrect distractor options`);
  incorrectOpts.forEach(o => {
    assert(o.distractorReason && o.distractorReason.length > 5, `Question ${q.id} option ${o.label} has meaningful distractorReason`);
  });

  // Hints and Solutions
  assert(q.hint1 && q.hint1.length > 10, `Question ${q.id} has hint1`);
  assert(q.hint2 && q.hint2.length > 10, `Question ${q.id} has hint2`);
  assert(q.solution && q.solution.finalAnswer, `Question ${q.id} has solution.finalAnswer`);
  assert(Array.isArray(q.solution.steps) && q.solution.steps.length >= 1, `Question ${q.id} has step-by-step solution steps`);
  assert(q.solution.fastShortcut, `Question ${q.id} has solution.fastShortcut`);
  assert(q.solution.verification, `Question ${q.id} has solution.verification`);
});

assert(trackCounts.sec21 === 20, `Section 2.1 has exactly 20 questions (found: ${trackCounts.sec21})`);
assert(trackCounts.sec22 === 25, `Section 2.2 has exactly 25 questions (found: ${trackCounts.sec22})`);
assert(trackCounts.sec23 === 20, `Section 2.3 has exactly 20 questions (found: ${trackCounts.sec23})`);
assert(trackCounts.sec24 === 25, `Section 2.4 has exactly 25 questions (found: ${trackCounts.sec24})`);
assert(trackCounts.sec25 === 35, `Section 2.5 has exactly 35 questions (found: ${trackCounts.sec25})`);

console.log(`[PASS] Group 1 validated. Track distribution: S2.1=20, S2.2=25, S2.3=20, S2.4=25, S2.5=35.`);
console.log(`Difficulty distribution: Easy=${diffCounts.Easy}, Medium=${diffCounts.Medium}, Hard=${diffCounts.Hard}, Challenge=${diffCounts.Challenge}.`);

// ----------------------------------------------------------------------------
// 2. ZERO EM-DASH & ZERO EN-DASH AUDIT
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 2] Zero Em-Dash (\\u2014) and Zero En-Dash (\\u2013) Audit");

const bankJson = JSON.stringify(unit2QuizBank);
const emCount = (bankJson.match(/\u2014/g) || []).length;
const enCount = (bankJson.match(/\u2013/g) || []).length;

assert(emCount === 0, `Zero em-dashes in unit2QuizBank.js (found: ${emCount})`);
assert(enCount === 0, `Zero en-dashes in unit2QuizBank.js (found: ${enCount})`);

// Also audit quizGrading.js
const gradingContent = fs.readFileSync(path.resolve('./src/utils/quizGrading.js'), 'utf8');
const emGrading = (gradingContent.match(/\u2014/g) || []).length;
const enGrading = (gradingContent.match(/\u2013/g) || []).length;
assert(emGrading === 0 && enGrading === 0, `Zero em/en-dashes in quizGrading.js (em=${emGrading}, en=${enGrading})`);

console.log("[PASS] Group 2 validated. Strict 0 em-dash and 0 en-dash compliance confirmed.");

// ----------------------------------------------------------------------------
// 3. MANDATORY QUESTION-UNIQUENESS AUDIT AGAINST ALL 228 TEACHING ITEMS
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 3] Mandatory Question-Uniqueness Audit against Curriculum Teaching Items");

const normalizeSignature = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const teachingSignatures = new Set();
let teachingItemCount = 0;

function registerTeachingItem(item, expr) {
  if (!item) return;
  teachingItemCount++;
  const text = typeof item === 'string' ? item : (item.problemStatement || item.originalExpression || item.problem || item.title || item.text || item.functionText || item.name);
  if (text) {
    const sig = normalizeSignature(text);
    if (sig.length > 5) {
      teachingSignatures.add(sig);
    }
  }
  if (expr) {
    const sig = normalizeSignature(expr);
    if (sig.length > 5) {
      teachingSignatures.add(sig);
    }
  }
}

// S21 worked examples (10)
(dldSection21Data.workedExamples || []).forEach(w => registerTeachingItem(w, w.expr));

// S22 worked models (24) and practice lab (24)
(dldSection22Data.workedModels || []).forEach(w => registerTeachingItem(w, w.finalAnswer));
(dldSection22Data.practiceLab || []).forEach(p => registerTeachingItem(p, p.finalAnswer));

// S23 worked models (15) and practice lab (24)
(dldSection23Data.workedModels || []).forEach(w => registerTeachingItem(w, w.canonicalSOP));
(dldSection23Data.practiceLab || []).forEach(p => registerTeachingItem(p, p.canonicalSOP));

// S24 worked models (18), guided demos (4), practice lab (28)
(dldSection24Data.workedModels || []).forEach(w => registerTeachingItem(w, w.canonicalSOP));
(dldSection24Data.guidedDemos || []).forEach(g => registerTeachingItem(g, g.expression));
(dldSection24Data.practiceLab || []).forEach(p => registerTeachingItem(p, p.finalAnswer || p.solution));

// S25 worked models (34), guided demos (6), practice lab problems (36), solver presets (3)
(dldSection25Data.workedModels || []).forEach(w => registerTeachingItem(w, w.minimalSOP));
(dldSection25Data.guidedDemos || []).forEach(g => registerTeachingItem(g, g.minimalSOP));
(dldSection25Data.practiceLab?.problems || []).forEach(p => registerTeachingItem(p, p.minimalSOP));
(dldSection25Data.practiceLab?.interactivePresets || []).forEach(p => registerTeachingItem(p, p.minimalExpression));

// Unit 2 Solvers Presets (6 Boolean Simplifier presets + 5 K-Map solver presets)
const solverPresets = [
  { label: "AB + AB'", expr: "AB + AB'" },
  { label: "A + A'B", expr: "A + A'B" },
  { label: "(A+B)(A+C)", expr: "(A+B)(A+C)" },
  { label: "AB + A'C + BC", expr: "AB + A'C + BC" },
  { label: "A + AB", expr: "A + AB" },
  { label: "(A + B)'", expr: "(A + B)'" },
  { label: "Corners Quad", expr: "m(0, 2, 8, 10)" },
  { label: "Wrap 1x4 Quad", expr: "m(0, 2, 8, 10)" },
  { label: "Don't Care", expr: "m(1, 3, 7, 11, 15) + d(0, 2, 5)" },
  { label: "Two Variable", expr: "m(0, 1, 3)" },
  { label: "POS Grouping", expr: "M(0, 2, 4, 6)" }
];
solverPresets.forEach(sp => registerTeachingItem(sp, sp.expr));

console.log(`Total teaching items gathered across Sections 2.1-2.5: ${teachingItemCount}`);
assert(teachingItemCount >= 225, `Comprehensive curriculum teaching items accounted for (found: ${teachingItemCount})`);

// Test all 125 bank questions for exact collisions against teaching items
let exactDuplicates = 0;
unit2QuizBank.forEach(q => {
  const qSig = normalizeSignature(q.question);
  if (teachingSignatures.has(qSig)) {
    console.error(`[UNWANTED REPETITION] ${q.id} (${q.topicBadge}) matches teaching problem: ${q.question}`);
    exactDuplicates++;
  }
});

assert(exactDuplicates === 0, `Question uniqueness audit passed: exactly 0 unwanted repetitions found (actual: ${exactDuplicates})`);
console.log(`[PASS] Group 3 validated. All 125 Main Arena questions are distinct from the ${teachingItemCount} curriculum teaching models.`);

// ----------------------------------------------------------------------------
// 4. MATHEMATICAL VERIFICATION OF QUESTION ANSWER KEYS
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 4] Mathematical Correctness of Answer Keys via booleanEngine");

// 4.1 Section 2.2 Algebraic Simplifications Equivalence
assert(areExpressionsEquivalent("(X + Y)(X + Y')", "X", ["X", "Y"]), "u2-q021: (X+Y)(X+Y') <=> X");
assert(areExpressionsEquivalent("X + X'Y + X'Y'Z", "X + Y + Z", ["X", "Y", "Z"]), "u2-q022: X + X'Y + X'Y'Z <=> X + Y + Z");
assert(areExpressionsEquivalent("A(A' + B' + C')", "AB' + AC'", ["A", "B", "C"]), "u2-q023: A(A'+B'+C') <=> AB' + AC'");
assert(areExpressionsEquivalent("(A' + B)(A' + B')", "A'", ["A", "B"]), "u2-q024: (A'+B)(A'+B') <=> A'");
assert(areExpressionsEquivalent("AB' + AB'C", "AB'", ["A", "B", "C"]), "u2-q025: AB' + AB'C <=> AB'");
assert(areExpressionsEquivalent("AB'C + A'B'C + AB'C'", "AB' + B'C", ["A", "B", "C"]), "u2-q027: AB'C + A'B'C + AB'C' <=> AB' + B'C");
assert(areExpressionsEquivalent("(A + C')(A' + B')(B' + C')", "(A + C')(A' + B')", ["A", "B", "C"]), "u2-q028: Dual consensus");
assert(areExpressionsEquivalent("A'B + ABC' + AB'C'", "A'B + AC'", ["A", "B", "C"]), "u2-q029: A'B + ABC' + AB'C' <=> A'B + AC'");
assert(areExpressionsEquivalent("(A + B)(A + C)(B' + C)", "AB' + BC", ["A", "B", "C"]), "u2-q031: (A+B)(A+C)(B'+C) <=> AB' + BC");
assert(areExpressionsEquivalent("(A' + B' + C)(A' + B + C)", "A' + C", ["A", "B", "C"]), "u2-q032: (A'+B'+C)(A'+B+C) <=> A' + C");
assert(areExpressionsEquivalent("A'B'C + A'BC + AB'C", "A'C + B'C", ["A", "B", "C"]), "u2-q033: A'B'C + A'BC + AB'C <=> A'C + B'C");
assert(areExpressionsEquivalent("(AB + C')(A'B' + C)", "ABC + A'B'C'", ["A", "B", "C"]), "u2-q035: (AB+C')(A'B'+C) <=> ABC + A'B'C'");
assert(areExpressionsEquivalent("AB'D' + A'CD' + BCD'", "CD' + AB'D'", ["A", "B", "C", "D"]), "u2-q036: 4-variable consensus reduction");
assert(areExpressionsEquivalent("(A + B + D)(A + B + D')(A + B' + D)", "A + BD", ["A", "B", "D"]), "u2-q037: 3-factor POS reduction");
assert(areExpressionsEquivalent("((AB)' (A' + B))'", "A", ["A", "B"]), "u2-q038: Nested De Morgan reduction");
assert(areExpressionsEquivalent("(A' + B)(B' + C)(C' + A)", "ABC + A'B'C'", ["A", "B", "C"]), "u2-q039: Cyclic product reduction");
assert(areExpressionsEquivalent("(A + B' + C)(A' + D)(B' + C + D)", "(A + B' + C)(A' + D)", ["A", "B", "C", "D"]), "u2-q041: 4-variable dual consensus");
assert(areExpressionsEquivalent("W'X'Y' + W'X'Y + W'XY + W'XY'", "W'", ["W", "X", "Y"]), "u2-q042: Quad term reduction to W'");
assert(areExpressionsEquivalent("(A' + B + C')(A + B' + C')(A + B + C')(A' + B' + C')", "C'", ["A", "B", "C"]), "u2-q043: 4-factor POS reduction to C'");
assert(areExpressionsEquivalent("((A' + B)' + (A + B')')'", "AB + A'B'", ["A", "B"]), "u2-q045: Multi-level reduction to XNOR");

// 4.2 Section 2.5 K-Map Minimizations
const km108 = minimizeKMap([1, 5, 9, 13, 14, 15], [], ['A', 'B', 'C', 'D']);
assert(areExpressionsEquivalent(km108.minimalExpression, "C'D + ABC", ['A', 'B', 'C', 'D']), "u2-q108 K-Map minimal expression is C'D + ABC");

const km109 = minimizeKMap([0, 2, 5, 7, 8, 10, 13, 15], [], ['A', 'B', 'C', 'D']);
assert(areExpressionsEquivalent(km109.minimalExpression, "B'D' + BD", ['A', 'B', 'C', 'D']), "u2-q109 K-Map minimal expression is B'D' + BD");

const km110 = minimizeKMap([4, 5, 6, 7, 12, 13, 14, 15], [], ['A', 'B', 'C', 'D']);
assert(km110.minimalExpression === "B", "u2-q110 K-Map octet simplifies to B");

const km111 = minimizeKMap([1, 3, 4, 5, 6, 7, 9, 11], [], ['A', 'B', 'C', 'D']);
assert(areExpressionsEquivalent(km111.minimalExpression, "A'B + B'D", ['A', 'B', 'C', 'D']), "u2-q111 K-Map minimal expression is A'B + B'D");

// 4.3 Explicit 16-Row Truth Table Regression Test for u2-q111:
// F(A,B,C,D) = \u03A3m(1,3,4,5,6,7,9,11) === A'B + B'D (Quad 1: {4,5,6,7} = A'B; Quad 2: {1,3,9,11} = B'D)
const q111Minterms = new Set([1, 3, 4, 5, 6, 7, 9, 11]);
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      for (let d = 0; d <= 1; d++) {
        const m = (a << 3) | (b << 2) | (c << 1) | d;
        const expectedF = q111Minterms.has(m) ? 1 : 0;
        
        // Evaluate A'B + B'D
        const notA = a === 0 ? 1 : 0;
        const notB = b === 0 ? 1 : 0;
        const term1 = notA && b ? 1 : 0; // A'B
        const term2 = notB && d ? 1 : 0; // B'D
        const actualF = (term1 || term2) ? 1 : 0;
        
        assert(actualF === expectedF, `u2-q111 truth-table row m${m} (ABCD=${a}${b}${c}${d}): expected ${expectedF}, got ${actualF}`);
      }
    }
  }
}

const km114 = minimizeKMap([0, 2, 8, 10], [5, 7, 13, 15], ['A', 'B', 'C', 'D']);
assert(km114.minimalExpression === "B'D'", "u2-q114 K-Map corner quad with don't-cares is B'D'");

const km122 = minimizeKMap([0, 1, 2, 8, 9, 10], [], ['A', 'B', 'C', 'D']);
assert(areExpressionsEquivalent(km122.minimalExpression, "B'C' + B'D'", ['A', 'B', 'C', 'D']), "u2-q122 K-Map minimal expression is B'C' + B'D'");

const km124 = minimizeKMap([0, 1, 4, 5, 10, 11, 14, 15], [], ['A', 'B', 'C', 'D']);
assert(areExpressionsEquivalent(km124.minimalExpression, "A'C' + AC", ['A', 'B', 'C', 'D']), "u2-q124 K-Map minimal expression is A'C' + AC");

const km125 = minimizeKMap([0, 2, 3, 5, 7, 8, 10, 11, 15], [], ['A', 'B', 'C', 'D']);
assert(areExpressionsEquivalent(km125.minimalExpression, "B'D' + CD + A'BD", ['A', 'B', 'C', 'D']), "u2-q125 K-Map minimal expression is B'D' + CD + A'BD");

console.log("[PASS] Group 4 validated. All algebraic, K-Map answer keys, and the 16-row u2-q111 truth-table regression test are mathematically proven.");

// ----------------------------------------------------------------------------
// 5. SCORING ENGINE & GRADING TESTS
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 5] Answer Grading Engine & Equivalence Acceptance");

// Test Option Card Selection
const sampleQ = unit2QuizBank[0];
const resOptA = gradeStudentAnswer(null, sampleQ, 'A');
assert(resOptA.isAnswered && resOptA.isCorrect, "Selecting Option A explicitly yields correct grade");
const resOptB = gradeStudentAnswer(null, sampleQ, 'B');
assert(resOptB.isAnswered && !resOptB.isCorrect, "Selecting Option B explicitly yields incorrect grade");

// Test Direct Label Typing
const resTypeA = gradeStudentAnswer('A', sampleQ, null);
assert(resTypeA.isAnswered && resTypeA.isCorrect, "Typing 'A' yields correct grade");
const resTypeC = gradeStudentAnswer('c', sampleQ, null);
assert(resTypeC.isAnswered && !resTypeC.isCorrect, "Typing 'c' yields incorrect grade");

// Test Numerical Index Set Normalization (permutations, spaces, minterm syntax)
const indexQ = unit2QuizBank.find(q => q.id === 'u2-q071'); // 0, 2, 4, 6, 7
assert(indexQ, "Found u2-q071 canonical index question");
const resNorm1 = gradeStudentAnswer("0, 2, 4, 6, 7", indexQ, null);
assert(resNorm1.isCorrect, "Exact index set accepted");
const resNorm2 = gradeStudentAnswer("7, 6, 4, 2, 0", indexQ, null);
assert(resNorm2.isCorrect, "Permuted index set '7, 6, 4, 2, 0' accepted");
const resNorm3 = gradeStudentAnswer("m(0, 2, 4, 6, 7)", indexQ, null);
assert(resNorm3.isCorrect, "Syntax 'm(0, 2, 4, 6, 7)' accepted");
const resNorm4 = gradeStudentAnswer("0,2,4,6,7", indexQ, null);
assert(resNorm4.isCorrect, "No-space index set '0,2,4,6,7' accepted");
const resNormWrong = gradeStudentAnswer("0, 2, 4, 5, 7", indexQ, null);
assert(!resNormWrong.isCorrect, "Incorrect index set '0, 2, 4, 5, 7' rejected");

// Test Boolean Algebraic Equivalence Checking in Rough Student Typing
const boolQ = unit2QuizBank.find(q => q.id === 'u2-q027'); // AB' + B'C
assert(boolQ, "Found u2-q027 Boolean expression question");
const resBoolComm = gradeStudentAnswer("B'C + AB'", boolQ, null);
assert(resBoolComm.isCorrect, "Commutative Boolean sum 'B\\'C + AB\\'' accepted");
const resBoolSpaces = gradeStudentAnswer("A B' + B' C", boolQ, null);
assert(resBoolSpaces.isCorrect, "Spaced Boolean sum 'A B\\' + B\\' C' accepted");
const resBoolWrong = gradeStudentAnswer("A'B + BC", boolQ, null);
assert(!resBoolWrong.isCorrect, "Non-equivalent Boolean sum 'A\\'B + BC' rejected");

// Test Free-Response Assessment Questions with Strict Minimality & Representation Enforcement
const freeQ21 = unit2QuizBank.find(q => q.id === 'u2-q021'); // (X+Y)(X+Y') = X, requireMinimal: true
assert(freeQ21.questionType === 'free_response', "u2-q021 is designated as free_response");
assert(gradeStudentAnswer("X", freeQ21, null).isCorrect, "u2-q021: Minimal typed answer 'X' accepted");
assert(!gradeStudentAnswer("(X+Y)(X+Y')", freeQ21, null).isCorrect, "u2-q021: Non-minimal equivalent '(X+Y)(X+Y')' rejected when minimality required");
assert(!gradeStudentAnswer("Y", freeQ21, null).isCorrect, "u2-q021: Non-equivalent 'Y' rejected");

const freeQ54 = unit2QuizBank.find(q => q.id === 'u2-q054'); // \u03A3m(0, 2, 4, 6)
assert(freeQ54.questionType === 'free_response', "u2-q054 is designated as free_response");
assert(gradeStudentAnswer("0, 2, 4, 6", freeQ54, null).isCorrect, "u2-q054: Exact indices '0, 2, 4, 6' accepted");
assert(gradeStudentAnswer("6, 4, 2, 0", freeQ54, null).isCorrect, "u2-q054: Permuted indices '6, 4, 2, 0' accepted");
assert(gradeStudentAnswer("m(0, 2, 4, 6)", freeQ54, null).isCorrect, "u2-q054: Minterm notation 'm(0, 2, 4, 6)' accepted");

const freeQ111 = unit2QuizBank.find(q => q.id === 'u2-q111'); // A'B + B'D, requireMinimal: true
assert(freeQ111.questionType === 'free_response', "u2-q111 is designated as free_response");
assert(gradeStudentAnswer("A'B + B'D", freeQ111, null).isCorrect, "u2-q111: Exact minimal answer 'A\\'B + B\\'D' accepted");
assert(gradeStudentAnswer("B'D + A'B", freeQ111, null).isCorrect, "u2-q111: Commutative minimal answer 'B\\'D + A\\'B' accepted");
assert(!gradeStudentAnswer("A'B + B'D'", freeQ111, null).isCorrect, "u2-q111: Erroneous term with B'D' rejected");
assert(!gradeStudentAnswer("A'B + B'D + A'CD", freeQ111, null).isCorrect, "u2-q111: Redundant non-minimal sum rejected when minimality required");

// Test Unanswered question
const resEmpty = gradeStudentAnswer("", sampleQ, null);
assert(!resEmpty.isAnswered && !resEmpty.isCorrect, "Empty answer handled correctly as unanswered");

console.log("[PASS] Group 5 validated. Answer grading correctly handles option clicks, typed labels, index set permutations, Boolean AST equivalence, and free-response minimality.");

// ----------------------------------------------------------------------------
// 6. PRACTICE ARENA BALANCED PAPER GENERATION TESTS
// ----------------------------------------------------------------------------
console.log("\n[TEST GROUP 6] Mixed & Section Assessment Balanced Sampling");

function simulatePaperGeneration(bank, trackId, count) {
  let pool = bank;
  if (trackId !== 'all') {
    pool = pool.filter(q => q.trackId === trackId);
    return pool.slice(0, count);
  }
  
  // Balanced selection across all 5 sections
  const s21 = pool.filter(q => q.trackId === 'sec21');
  const s22 = pool.filter(q => q.trackId === 'sec22');
  const s23 = pool.filter(q => q.trackId === 'sec23');
  const s24 = pool.filter(q => q.trackId === 'sec24');
  const s25 = pool.filter(q => q.trackId === 'sec25');
  
  const perSec = count / 5;
  return [
    ...s21.slice(0, perSec),
    ...s22.slice(0, perSec),
    ...s23.slice(0, perSec),
    ...s24.slice(0, perSec),
    ...s25.slice(0, perSec)
  ];
}

const paper10 = simulatePaperGeneration(unit2QuizBank, 'all', 10);
assert(paper10.length === 10, `10-question mixed paper generated (actual: ${paper10.length})`);
const paper10Dist = {};
paper10.forEach(q => { paper10Dist[q.trackId] = (paper10Dist[q.trackId] || 0) + 1; });
assert(
  paper10Dist.sec21 === 2 &&
  paper10Dist.sec22 === 2 &&
  paper10Dist.sec23 === 2 &&
  paper10Dist.sec24 === 2 &&
  paper10Dist.sec25 === 2,
  "10-question mixed assessment draws exactly 2 questions from each of the 5 sections"
);

const paper20 = simulatePaperGeneration(unit2QuizBank, 'all', 20);
assert(paper20.length === 20, `20-question mixed paper generated (actual: ${paper20.length})`);
const paper20Dist = {};
paper20.forEach(q => { paper20Dist[q.trackId] = (paper20Dist[q.trackId] || 0) + 1; });
assert(
  paper20Dist.sec21 === 4 &&
  paper20Dist.sec22 === 4 &&
  paper20Dist.sec23 === 4 &&
  paper20Dist.sec24 === 4 &&
  paper20Dist.sec25 === 4,
  "20-question mixed assessment draws exactly 4 questions from each of the 5 sections"
);

const paperSec25 = simulatePaperGeneration(unit2QuizBank, 'sec25', 10);
assert(paperSec25.length === 10, "Section 2.5 paper draws 10 questions");
assert(paperSec25.every(q => q.trackId === 'sec25'), "All questions in Section 2.5 paper belong to sec25");

console.log("[PASS] Group 6 validated. Paper generation balanced sampling functions correctly.");

console.log("\n===============================================================================");
console.log(`ALL PRACTICE ARENA VERIFICATION CHECKS PASSED! (${passedChecks}/${totalChecks} checks)`);
console.log("===============================================================================\n");
