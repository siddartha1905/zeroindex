/**
 * ZeroIndex - DLD Unit 1 Comprehensive Modernization & Academic Audit Suite
 * Strict formatting: ZERO em-dashes and ZERO en-dashes
 */

import fs from 'fs';
import path from 'path';
import { dldUnit1Master } from '../src/data/dldUnit1Master.js';
import { section14Data } from '../src/data/dldSection14Data.js';
import { section15Data } from '../src/data/dldSection15Data.js';
import { section16Data } from '../src/data/dldSection16Data.js';
import { section17Data } from '../src/data/dldSection17Data.js';
import { practiceSets13A, practiceSets13B, practiceSets13C, practiceSets13D, mixedExamPractice20, cheatSheetData13 } from '../src/data/dldSection13PracticeData.js';
import { unit1QuizBank, quizTracks } from '../src/data/unit1QuizBank.js';
import { dldSubjectResourcesData } from '../src/data/dldSubjectResourcesData.js';

console.log("=================================================================");
console.log("      ZEROINDEX DLD UNIT 1: MODERNIZATION AUDIT SUITE             ");
console.log("=================================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`[PASS] ${message}`);
  } else {
    failed++;
    console.error(`[FAIL] ${message}`);
  }
}

// ---------------------------------------------------------------------------
// 1. DASH AUDIT ACROSS ALL UNIT 1 FILES
// ---------------------------------------------------------------------------
console.log("\n--- 1. Testing Zero-Dash Compliance across Unit 1 Files ---");
const filesToAudit = [
  'src/components/UnitWorkspace.jsx',
  'src/components/InteractiveSolvers.jsx',
  'src/components/Section15View.jsx',
  'src/components/Section15Components.jsx',
  'src/components/Section16View.jsx',
  'src/components/Section16Components.jsx',
  'src/components/Section17View.jsx',
  'src/components/Section17Components.jsx',
  'src/data/dldUnit1Master.js',
  'src/data/dldSection13PracticeData.js',
  'src/data/dldSection14Data.js',
  'src/data/dldSection15Data.js',
  'src/data/dldSection16Data.js',
  'src/data/dldSection17Data.js',
  'src/data/unit1QuizBank.js',
  'src/data/dldSubjectResourcesData.js'
];

for (const relPath of filesToAudit) {
  const content = fs.readFileSync(path.resolve(relPath), 'utf8');
  const emMatches = (content.match(/\u2014/g) || []).length;
  const enMatches = (content.match(/\u2013/g) || []).length;
  assert(emMatches === 0, `${relPath} contains 0 em-dashes (\\u2014)`);
  assert(enMatches === 0, `${relPath} contains 0 en-dashes (\\u2013)`);
}

// ---------------------------------------------------------------------------
// 2. TERMINOLOGY & DEFINITION CHECKS
// ---------------------------------------------------------------------------
console.log("\n--- 2. Testing Academic Terminology & Precision ---");

// Check 0 occurrences of '3-bit nibble' or '4-bit octet' across all data
for (const relPath of filesToAudit) {
  const content = fs.readFileSync(path.resolve(relPath), 'utf8');
  const hasBadNibble = /3-bit\s+nibble/i.test(content);
  const hasBadOctet = /4-bit\s+octet/i.test(content);
  assert(!hasBadNibble, `${relPath} contains 0 occurrences of '3-bit nibble'`);
  assert(!hasBadOctet, `${relPath} contains 0 occurrences of '4-bit octet'`);
}

// Check standard 5V TTL input threshold phrasing in resources
const s11Sheet = dldSubjectResourcesData.formulaSheets.unit1.find(s => s.sectionId === '1.1');
assert(s11Sheet, 'Section 1.1 formula sheet exists');
const ttlBullet = s11Sheet.bullets.find(b => b.includes('TTL'));
assert(ttlBullet && ttlBullet.includes('V_IL max = 0.8V') && ttlBullet.includes('V_IH min = 2.0V'), 'Section 1.1 formula sheet correctly specifies standard 5V TTL input thresholds (V_IL max = 0.8V, V_IH min = 2.0V)');

// ---------------------------------------------------------------------------
// 3. SECTION 1.6 MATHEMATICAL RANGES & OVERFLOW CONDITION
// ---------------------------------------------------------------------------
console.log("\n--- 3. Testing Section 1.6 Signed Ranges & Overflow ---");
const s16Sheet = dldSubjectResourcesData.formulaSheets.unit1.find(s => s.sectionId === '1.6');
assert(s16Sheet, 'Section 1.6 formula sheet exists');

const twosCompBullet = s16Sheet.bullets.find(b => b.includes("2's Complement:"));
assert(twosCompBullet && twosCompBullet.includes("-2^{n-1} to +(2^{n-1} - 1)"), "2's complement range formula is -2^{n-1} to +(2^{n-1} - 1)");
assert(twosCompBullet && twosCompBullet.includes("Unique zero"), "2's complement explicitly states unique zero representation");

const onesCompBullet = s16Sheet.bullets.find(b => b.includes("1's Complement:"));
assert(onesCompBullet && onesCompBullet.includes("-(2^{n-1} - 1) to +(2^{n-1} - 1)"), "1's complement range formula is -(2^{n-1} - 1) to +(2^{n-1} - 1)");
assert(onesCompBullet && onesCompBullet.includes("Dual zero"), "1's complement explicitly states dual zero representation (+0 and -0)");

const signMagBullet = s16Sheet.bullets.find(b => b.includes("Signed Magnitude:"));
assert(signMagBullet && signMagBullet.includes("-(2^{n-1} - 1) to +(2^{n-1} - 1)"), "Signed magnitude range formula is -(2^{n-1} - 1) to +(2^{n-1} - 1)");

const overflowRule = s16Sheet.keyRules.find(r => r.rule.includes("Overflow"));
assert(overflowRule && overflowRule.detail.includes("C_{in} \u2295 C_{out}"), "Overflow rule formula is V = Cin ⊕ Cout at sign bit");

// ---------------------------------------------------------------------------
// 4. UNIT 1 PRACTICE ARENA VALIDATION (110 QUESTIONS)
// ---------------------------------------------------------------------------
console.log("\n--- 4. Testing Unit 1 Practice Arena (110 Questions) ---");
assert(Array.isArray(unit1QuizBank) && unit1QuizBank.length === 110, `Unit 1 question bank has exactly 110 questions (found ${unit1QuizBank.length})`);
assert(Array.isArray(quizTracks) && quizTracks.length === 5, `Unit 1 has 5 quiz tracks (all, conversions, arithmetic, complements, signed)`);

let schemaErrors = 0;
let answerErrors = 0;
const trackCounts = { conversions: 0, arithmetic: 0, complements: 0, signed: 0 };

unit1QuizBank.forEach((q, i) => {
  if (!q.id || !q.question || !q.difficulty || !q.trackId) schemaErrors++;
  if (!Array.isArray(q.options) || q.options.length !== 4) schemaErrors++;
  const correctOptions = q.options.filter(o => o.isCorrect);
  if (correctOptions.length !== 1) answerErrors++;
  if (trackCounts[q.trackId] !== undefined) trackCounts[q.trackId]++;
});

assert(schemaErrors === 0, `All 110 questions conform strictly to the 4-option schema with zero schema errors`);
assert(answerErrors === 0, `All 110 questions have exactly one verified correct answer`);
assert(trackCounts.conversions === 35, `Track 'conversions' has exactly 35 questions (found ${trackCounts.conversions})`);
assert(trackCounts.arithmetic === 25, `Track 'arithmetic' has exactly 25 questions (found ${trackCounts.arithmetic})`);
assert(trackCounts.complements === 30, `Track 'complements' has exactly 30 questions (found ${trackCounts.complements})`);
assert(trackCounts.signed === 20, `Track 'signed' has exactly 20 questions (found ${trackCounts.signed})`);

// ---------------------------------------------------------------------------
// 5. CONTEXTUAL LEARNING LOOP ROUTING INTEGRITY
// ---------------------------------------------------------------------------
console.log("\n--- 5. Testing Contextual Learning Routing for Unit 1 ---");
const map1 = dldSubjectResourcesData.contextualLearningMap;
const unit1Sections = ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7'];

unit1Sections.forEach(secId => {
  const item = map1[secId];
  assert(item, `Contextual map entry exists for section ${secId}`);
  assert(item.unit === 1, `Section ${secId} is configured for unit 1`);
  assert(item.solverTarget && item.solverTarget.solverTab, `Section ${secId} routes to valid solverTab: ${item.solverTarget?.solverTab}`);
  assert(item.practiceTarget && item.practiceTarget.trackId, `Section ${secId} routes to valid practice trackId: ${item.practiceTarget?.trackId}`);
  assert(item.resourceTarget && item.resourceTarget.sheetId, `Section ${secId} routes to valid revision sheetId: ${item.resourceTarget?.sheetId}`);
});

console.log("\n=================================================================");
console.log(`UNIT 1 MODERNIZATION AUDIT: ${passed} passed, ${failed} failed`);
console.log("=================================================================");

if (failed > 0) process.exit(1);
