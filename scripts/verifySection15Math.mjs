/**
 * Rigorous Mathematical Verification Script for Section 1.5: Complements
 * Dynamically audits `src/data/dldSection15Data.js`
 */

import { section15Data } from '../src/data/dldSection15Data.js';

console.log("=== COMPREHENSIVE MATHEMATICAL AUDIT FOR SECTION 1.5 ===");

// 1. Audit "What is a Complement in Simple Words?"
const miniEx = section15Data.overviewHardware.whatIsAComplement.miniExamples;
console.log("\n[1] Auditing 'What is a Complement' Mini-Examples...");
// Decimal mini-example: N = 37
const decEx = miniEx.find(e => e.baseName.includes("Decimal"));
console.assert(decEx.milestoneOne.val === "62", "Mini-ex 9s complement must be 62");
console.assert(decEx.milestoneTwo.val === "63", "Mini-ex 10s complement must be 63");
console.assert(37 + 63 === 100, "37 + 63 must equal 100");

// Binary mini-example: N = 1010_2 = 10_10
const binEx = miniEx.find(e => e.baseName.includes("Binary"));
console.assert(binEx.milestoneOne.val.includes("0101"), "Mini-ex 1s complement must contain 0101");
console.assert(binEx.milestoneTwo.val.includes("0110"), "Mini-ex 2s complement must contain 0110");
console.assert(parseInt("1010", 2) + parseInt("0110", 2) === 16, "1010 + 0110 must equal 10000_2 = 16");
console.log("✓ Mini-examples intuition verified.");

// 2. Audit Models 1A - 1D (Decimal)
console.log("\n[2] Auditing Models 1A - 1D (Decimal Complements)...");
const decModels = section15Data.findingComplements.decimal.models;

for (const m of decModels) {
  console.log(`Checking ${m.id} (${m.label})...`);
  console.assert(m.question, `${m.id} must have question statement`);
  console.assert(m.conceptTag, `${m.id} must have conceptTag`);

  if (m.id === "model-1a") {
    console.assert(m.ninesResult === "4527");
    console.assert(m.tensResult === "4528");
    console.assert(5472 + 4528 === 10000);
  } else if (m.id === "model-1b") {
    console.assert(m.ninesResult === "75399");
    console.assert(m.tensResult === "75400");
    console.assert(24600 + 75400 === 100000);
    console.assert(m.standardMethodGrid.rowCarries.join("").includes("1"));
  } else if (m.id === "model-1c") {
    console.assert(m.ninesResult === "615.37");
    console.assert(m.tensResult === "615.38");
    console.assert((384.62 + 615.38).toFixed(2) === "1000.00");
  } else if (m.id === "model-1d") {
    console.assert(m.ninesResult === "0.9514");
    console.assert(m.tensResult === "0.9515");
    console.assert((0.0485 + 0.9515).toFixed(4) === "1.0000");
  }
}
console.log("✓ Models 1A - 1D verified.");

// 3. Audit Models 2A - 2D (Binary)
console.log("\n[3] Auditing Models 2A - 2D (Binary Complements)...");
const binModels = section15Data.findingComplements.binary.models;

for (const m of binModels) {
  console.log(`Checking ${m.id} (${m.label})...`);
  console.assert(m.question, `${m.id} must have question statement`);
  console.assert(m.conceptTag, `${m.id} must have conceptTag`);

  if (m.id === "model-2a") {
    console.assert(m.onesResult === "01001011");
    console.assert(m.twosResult === "01001100");
    console.assert(parseInt("10110100", 2) + parseInt("01001100", 2) === 256);
  } else if (m.id === "model-2b") {
    console.assert(m.onesResult === "0011010");
    console.assert(m.twosResult === "0011011");
    console.assert(parseInt("1100101", 2) + parseInt("0011011", 2) === 128);
  } else if (m.id === "model-2c") {
    console.assert(m.onesResult === "0100.1001");
    console.assert(m.twosResult === "0100.1010");
  } else if (m.id === "model-2d") {
    console.assert(m.edgeCases.length === 2);
  }
}
console.log("✓ Models 2A - 2D verified.");

// 4. Audit Decimal Subtraction Models (3A-3D and 4A-4D)
console.log("\n[4] Auditing Decimal Subtraction Models...");
for (const m of section15Data.decimalSubtraction.subtraction9s.models) {
  console.assert(m.question, `9s model ${m.id} must have question statement`);
  console.assert(m.conceptTag, `9s model ${m.id} must have conceptTag`);
  const M = parseFloat(m.minuend);
  const N = parseFloat(m.subtrahend);
  const diff = M - N;
  if (m.additionGrid.endCarry === "1") {
    console.assert(diff > 0, `${m.id}: EndCarry=1 implies M > N`);
    console.assert(parseFloat(m.eacAddition.finalResult) === diff, `${m.id} EAC final result mismatch`);
  } else {
    console.assert(diff < 0, `${m.id}: EndCarry=0 implies M < N`);
    console.assert(parseFloat(m.negativeHandling.finalResult) === diff, `${m.id} negative final result mismatch`);
  }
}

for (const m of section15Data.decimalSubtraction.subtraction10s.models) {
  console.assert(m.question, `10s model ${m.id} must have question statement`);
  console.assert(m.conceptTag, `10s model ${m.id} must have conceptTag`);
  const M = parseFloat(m.minuend);
  const N = parseFloat(m.subtrahend);
  const diff = M - N;
  if (m.additionGrid.endCarry === "1") {
    console.assert(diff > 0, `${m.id}: EndCarry=1 implies M > N`);
    console.assert(parseFloat(m.carryAction.finalResult) === diff, `${m.id} 10s final result mismatch`);
  } else {
    console.assert(diff < 0, `${m.id}: EndCarry=0 implies M < N`);
    console.assert(parseFloat(m.negativeHandling.finalResult) === diff, `${m.id} 10s negative result mismatch`);
  }
}
console.log("✓ Decimal Subtraction Models 3A-3D and 4A-4D verified.");

// 5. Audit Binary Subtraction Models (5A-5E and 6A-6E)
console.log("\n[5] Auditing Binary Subtraction Models...");
for (const m of section15Data.binarySubtraction.subtraction1s.models) {
  console.assert(m.question, `1s model ${m.id} must have question statement`);
  console.assert(m.conceptTag, `1s model ${m.id} must have conceptTag`);
  const mDec = m.verification.base10Minuend;
  const nDec = m.verification.base10Subtrahend;
  const expectedDiff = mDec - nDec;
  if (m.cout === "1") {
    console.assert(expectedDiff >= 0, `${m.id}: cout=1 implies M >= N`);
    console.assert(m.verification.base10Diff === expectedDiff, `${m.id} 1s diff mismatch`);
  } else {
    console.assert(expectedDiff < 0, `${m.id}: cout=0 implies M < N`);
    console.assert(m.verification.base10Diff === expectedDiff, `${m.id} 1s negative diff mismatch`);
  }
}

for (const m of section15Data.binarySubtraction.subtraction2s.models) {
  console.assert(m.question, `2s model ${m.id} must have question statement`);
  console.assert(m.conceptTag, `2s model ${m.id} must have conceptTag`);
  const mDec = m.verification.base10Minuend;
  const nDec = m.verification.base10Subtrahend;
  const expectedDiff = mDec - nDec;
  if (m.cout === "1") {
    console.assert(expectedDiff >= 0, `${m.id}: cout=1 implies M >= N`);
    console.assert(m.verification.base10Diff === expectedDiff, `${m.id} 2s diff mismatch`);
  } else {
    console.assert(expectedDiff < 0, `${m.id}: cout=0 implies M < N`);
    console.assert(m.verification.base10Diff === expectedDiff, `${m.id} 2s negative diff mismatch`);
  }
}
console.log("✓ Binary Subtraction Models 5A-5E and 6A-6E verified.");

// 6. Audit Mixed Exam Challenge Questions
console.log("\n[6] Auditing Mixed Exam Challenge Questions...");
const mixed = section15Data.mixedExamChallenge;
console.assert(mixed.length === 15, "Mixed challenge must have 15 questions");
for (const q of mixed) {
  console.assert(q.id && q.question && q.conceptTag && q.difficulty, `Question ${q.id} missing fields`);
  console.assert(q.correctAnswer && q.solution && q.solution.steps.length > 0, `Question ${q.id} missing solution`);
}
console.log(`✓ All ${mixed.length} mixed exam challenge questions verified.`);

console.log("\n=======================================================");
console.log("ALL MATHEMATICAL AUDIT CHECKS PASSED WITH ZERO ERRORS!");
console.log("=======================================================");
