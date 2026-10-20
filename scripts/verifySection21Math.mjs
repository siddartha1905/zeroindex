/**
 * Mathematical Audit & Verification Suite for DLD Unit 2 - Section 2.1
 * Course: Digital Logic Design (VR23 Autonomous)
 * Section 2.1: Boolean Algebra: Fundamentals, Laws and Theorems
 * 
 * Strict Rule: Zero em-dashes and zero en-dashes throughout.
 */

import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

console.log("=================================================================");
console.log("   ZEROINDEX DLD SECTION 2.1: COMPREHENSIVE ACADEMIC AUDIT      ");
console.log("=================================================================");

// ----------------------------------------------------------------------------
// 1. BEFORE & AFTER SIMPLIFICATION VISUAL CIRCUIT
// ----------------------------------------------------------------------------
console.log("\n--- Checking Before-and-After Circuit Equivalence (F = AB + AB' <=> F = A) ---");
let visualCircuitMatches = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    const originalF = (a & b) | (a & notB);
    const simplifiedF = a;
    if (originalF !== simplifiedF) visualCircuitMatches = false;
  }
}
assert(visualCircuitMatches, "Before-and-after circuit: F = AB + AB' produces identical output to F = A for all 4 valuations");

// ----------------------------------------------------------------------------
// 2. GROUP 1: BASIC AXIOMATIC LAWS
// ----------------------------------------------------------------------------
console.log("\n--- Checking Group 1: Basic Axiomatic Laws ---");
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  // Law 1: Identity
  assert((a | 0) === a, `Law 1(a) Identity for OR: ${a} + 0 = ${a}`);
  assert((a & 1) === a, `Law 1(b) Identity for AND: ${a} · 1 = ${a}`);

  // Law 2: Null / Domination
  assert((a | 1) === 1, `Law 2(a) Null for OR: ${a} + 1 = 1`);
  assert((a & 0) === 0, `Law 2(b) Null for AND: ${a} · 0 = 0`);

  // Law 3: Idempotent
  assert((a | a) === a, `Law 3(a) Idempotent for OR: ${a} + ${a} = ${a}`);
  assert((a & a) === a, `Law 3(b) Idempotent for AND: ${a} · ${a} = ${a}`);

  // Law 4: Complement
  assert((a | notA) === 1, `Law 4(a) Complement for OR: ${a} + ${notA} = 1`);
  assert((a & notA) === 0, `Law 4(b) Complement for AND: ${a} · ${notA} = 0`);

  // Law 5: Double Complement (Involution)
  const doubleNotA = notA === 0 ? 1 : 0;
  assert(doubleNotA === a, `Law 5 Involution: ((${a}')') = ${a}`);
}
assert((0 === 0 ? 1 : 0) === 1, "Constant complement: 0' = 1");
assert((1 === 1 ? 0 : 1) === 0, "Constant complement: 1' = 0");

// ----------------------------------------------------------------------------
// 3. GROUP 2: STRUCTURAL LAWS
// ----------------------------------------------------------------------------
console.log("\n--- Checking Group 2: Structural Laws ---");
// Law 6: Commutative
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    assert((a | b) === (b | a), `Law 6(a) Commutative OR: ${a}+${b} = ${b}+${a}`);
    assert((a & b) === (b & a), `Law 6(b) Commutative AND: ${a}·${b} = ${b}·${a}`);
  }
}

// Law 7: Associative & Law 8: Distributive (8 valuations)
let assocOrMatches = true;
let assocAndMatches = true;
let dist1Matches = true;
let dist2Matches = true;

for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      // Associative
      if (((a | b) | c) !== (a | (b | c))) assocOrMatches = false;
      if (((a & b) & c) !== (a & (b & c))) assocAndMatches = false;

      // Distributive 1: A(B + C) = AB + AC
      const lhsDist1 = a & (b | c);
      const rhsDist1 = (a & b) | (a & c);
      if (lhsDist1 !== rhsDist1) dist1Matches = false;

      // Distributive 2: A + BC = (A + B)(A + C)
      const lhsDist2 = a | (b & c);
      const rhsDist2 = (a | b) & (a | c);
      if (lhsDist2 !== rhsDist2) dist2Matches = false;
    }
  }
}
assert(assocOrMatches, "Law 7(a) Associative OR holds for all 8 valuations");
assert(assocAndMatches, "Law 7(b) Associative AND holds for all 8 valuations");
assert(dist1Matches, "Law 8(a) Distributive A(B+C) = AB + AC holds for all 8 valuations");
assert(dist2Matches, "Law 8(b) Distributive A + BC = (A+B)(A+C) holds for all 8 valuations");

// ----------------------------------------------------------------------------
// 4. GROUP 3: SIMPLIFICATION LAWS
// ----------------------------------------------------------------------------
console.log("\n--- Checking Group 3: Simplification Laws ---");
let absorbOrMatches = true;
let absorbAndMatches = true;
let combineOrMatches = true;
let combineAndMatches = true;
let redunOrMatches = true;
let redunAndMatches = true;

for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;

    // Law 9: Absorption: A + AB = A and A(A + B) = A
    if ((a | (a & b)) !== a) absorbOrMatches = false;
    if ((a & (a | b)) !== a) absorbAndMatches = false;

    // Law 10: Combining: AB + AB' = A and (A + B)(A + B') = A
    if (((a & b) | (a & notB)) !== a) combineOrMatches = false;
    if (((a | b) & (a | notB)) !== a) combineAndMatches = false;

    // Law 11: Redundancy: A + A'B = A + B and A(A' + B) = AB
    if ((a | (notA & b)) !== (a | b)) redunOrMatches = false;
    if ((a & (notA | b)) !== (a & b)) redunAndMatches = false;
  }
}
assert(absorbOrMatches, "Law 9(a) Absorption: A + AB = A holds for all 4 valuations");
assert(absorbAndMatches, "Law 9(b) Absorption: A(A + B) = A holds for all 4 valuations");
assert(combineOrMatches, "Law 10(a) Combining: AB + AB' = A holds for all 4 valuations");
assert(combineAndMatches, "Law 10(b) Combining: (A+B)(A+B') = A holds for all 4 valuations");
assert(redunOrMatches, "Law 11(a) Redundancy: A + A'B = A + B holds for all 4 valuations");
assert(redunAndMatches, "Law 11(b) Redundancy: A(A' + B) = AB holds for all 4 valuations");

// ----------------------------------------------------------------------------
// 5. GROUP 4: IMPORTANT THEOREMS
// ----------------------------------------------------------------------------
console.log("\n--- Checking Group 4: De Morgan's & Consensus Theorems ---");
// De Morgan 2-variable
let dm1Matches = true;
let dm2Matches = true;
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    // (AB)' = A' + B'
    const lhsDm1 = (a & b) === 0 ? 1 : 0;
    const rhsDm1 = notA | notB;
    if (lhsDm1 !== rhsDm1) dm1Matches = false;

    // (A + B)' = A'B'
    const lhsDm2 = (a | b) === 0 ? 1 : 0;
    const rhsDm2 = notA & notB;
    if (lhsDm2 !== rhsDm2) dm2Matches = false;
  }
}
assert(dm1Matches, "Law 12(a) De Morgan: (AB)' = A' + B' holds for all 4 valuations");
assert(dm2Matches, "Law 12(b) De Morgan: (A + B)' = A'B' holds for all 4 valuations");

// Generalized De Morgan 3-variable
let genDm1Matches = true;
let genDm2Matches = true;
let consensusMatches = true;
let dualConsensusMatches = true;

for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const notC = c === 0 ? 1 : 0;

      // (A + B + C)' = A'B'C'
      const lhsGen1 = (a | b | c) === 0 ? 1 : 0;
      const rhsGen1 = notA & notB & notC;
      if (lhsGen1 !== rhsGen1) genDm1Matches = false;

      // (ABC)' = A' + B' + C'
      const lhsGen2 = (a & b & c) === 0 ? 1 : 0;
      const rhsGen2 = notA | notB | notC;
      if (lhsGen2 !== rhsGen2) genDm2Matches = false;

      // Consensus Theorem: AB + A'C + BC = AB + A'C
      const lhsCons = (a & b) | (notA & c) | (b & c);
      const rhsCons = (a & b) | (notA & c);
      if (lhsCons !== rhsCons) consensusMatches = false;

      // Dual Consensus Theorem: (A + B)(A' + C)(B + C) = (A + B)(A' + C)
      const lhsDualCons = (a | b) & (notA | c) & (b | c);
      const rhsDualCons = (a | b) & (notA | c);
      if (lhsDualCons !== rhsDualCons) dualConsensusMatches = false;
    }
  }
}
assert(genDm1Matches, "Generalized De Morgan: (A + B + C)' = A'B'C' holds for all 8 valuations");
assert(genDm2Matches, "Generalized De Morgan: (ABC)' = A' + B' + C' holds for all 8 valuations");
assert(consensusMatches, "Law 13(a) Consensus Theorem holds for all 8 valuations");
assert(dualConsensusMatches, "Law 13(b) Dual Consensus Theorem holds for all 8 valuations");

// ----------------------------------------------------------------------------
// 6. ALL 10 INTRODUCTORY WORKED EXAMPLES
// ----------------------------------------------------------------------------
console.log("\n--- Checking All 10 Introductory Worked Examples ---");

// Example 1: F = A + BC at (0, 1, 1)
function evalEx1(a, b, c) {
  return a | (b & c);
}
assert(evalEx1(0, 1, 1) === 1, "Example 1: F(0, 1, 1) evaluates to 1");
assert(evalEx1(1, 1, 0) === 1, "Example 1: Precedence check F(1, 1, 0) evaluates to 1");

// Example 2: F = (A + 0) · 1 = A
for (let a = 0; a <= 1; a++) {
  assert(((a | 0) & 1) === a, `Example 2: (A+0)·1 = ${a} matches A`);
}

// Example 3: F = A(B + B') = A
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    assert((a & (b | notB)) === a, `Example 3: A(B+B') at (${a},${b}) matches A`);
  }
}

// Example 4: F = (A + A)B = AB
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    assert(((a | a) & b) === (a & b), `Example 4: (A+A)B matches AB at (${a},${b})`);
  }
}

// Example 5: F = A + AB = A
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    assert((a | (a & b)) === a, `Example 5: A + AB matches A at (${a},${b})`);
  }
}

// Example 6: F = AB + AB' = A
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    assert(((a & b) | (a & notB)) === a, `Example 6: AB + AB' matches A at (${a},${b})`);
  }
}

// Example 7: F = (A + B')' = A'B
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    const orig = (a | notB) === 0 ? 1 : 0;
    const simp = notA & b;
    assert(orig === simp, `Example 7: (A + B')' matches A'B at (${a},${b})`);
  }
}

// Example 8: F = A + A'B = A + B
for (let a = 0; a <= 1; a++) {
  const notA = a === 0 ? 1 : 0;
  for (let b = 0; b <= 1; b++) {
    const orig = a | (notA & b);
    const simp = a | b;
    assert(orig === simp, `Example 8: A + A'B matches A + B at (${a},${b})`);
  }
}

// Example 9: Duality of A + B'C is A(B' + C)
// Note: Verification that Dual is not complement:
let ex9IsComplement = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notB = b === 0 ? 1 : 0;
    for (let c = 0; c <= 1; c++) {
      const origF = a | (notB & c);
      const compF = origF === 0 ? 1 : 0;
      const dualF = a & (notB | c);
      if (dualF !== compF) ex9IsComplement = false;
    }
  }
}
assert(!ex9IsComplement, "Example 9: Dual A(B'+C) is confirmed NOT identical to Complement (distinction preserved)");

// Example 10: Consensus Theorem: F = AB + A'C + BC = AB + A'C
assert(consensusMatches, "Example 10: Consensus Theorem reduces 3 terms to 2 terms correctly");

// ----------------------------------------------------------------------------
// 7. TASK 3 & 4 SYMBOLIC ALGEBRAIC PROOFS & CHEAT SHEET AUDIT
// ----------------------------------------------------------------------------
console.log("\n--- Checking Task 3 Algebraic Proofs and Equivalence ---");
// De Morgan Uniqueness of Complements Check
let demorganUniquenessPartA = true;
let demorganUniquenessPartB = true;

for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    const notA = a === 0 ? 1 : 0;
    const notB = b === 0 ? 1 : 0;

    // Part A: X = AB, candidate Y = A' + B'
    const xA = a & b;
    const yA = notA | notB;
    if ((xA & yA) !== 0) demorganUniquenessPartA = false;
    if ((xA | yA) !== 1) demorganUniquenessPartA = false;

    // Part B: X = A + B, candidate Y = A'B'
    const xB = a | b;
    const yB = notA & notB;
    if ((xB & yB) !== 0) demorganUniquenessPartB = false;
    if ((xB | yB) !== 1) demorganUniquenessPartB = false;
  }
}
assert(demorganUniquenessPartA, "Task 3 De Morgan Part A: (AB)(A'+B') = 0 and (AB)+(A'+B') = 1 holds for all inputs (Uniqueness Q.E.D.)");
assert(demorganUniquenessPartB, "Task 3 De Morgan Part B: (A+B)(A'B') = 0 and (A+B)+(A'B') = 1 holds for all inputs (Uniqueness Q.E.D.)");

// Consensus Theorem Step-by-Step Equivalence Check
let consensusStepsAllMatch = true;
for (let a = 0; a <= 1; a++) {
  for (let b = 0; b <= 1; b++) {
    for (let c = 0; c <= 1; c++) {
      const notA = a === 0 ? 1 : 0;
      const step0 = (a & b) | (notA & c) | (b & c);
      const step2 = (a & b) | (notA & c) | ((b & c) & (a | notA));
      const step3 = (a & b) | (notA & c) | (a & b & c) | (notA & b & c);
      const step4 = ((a & b) & (1 | c)) | ((notA & c) & (1 | b));
      const step5 = (a & b) | (notA & c);

      if (step0 !== step2 || step0 !== step3 || step0 !== step4 || step0 !== step5) {
        consensusStepsAllMatch = false;
      }
    }
  }
}
assert(consensusStepsAllMatch, "Task 3 Consensus Theorem: All 5 algebraic proof transformation steps yield identical truth values across all 8 rows");

// ----------------------------------------------------------------------------
// 8. TASK 5 CURATED VIDEO REGISTRY AUDIT
// ----------------------------------------------------------------------------
console.log("\n--- Checking Task 5 Curated Video Lessons Registry ---");
const videoConfigPath = path.resolve("src/data/dldVideoConfig.js");
assert(fs.existsSync(videoConfigPath), "src/data/dldVideoConfig.js exists");
const videoContent = fs.readFileSync(videoConfigPath, 'utf8');
assert(videoContent.includes("WW-NPtIzHwk"), "Video registry contains verified Neso Academy Boolean Intro URL (WW-NPtIzHwk)");
assert(videoContent.includes("RMe69AdlFdI"), "Video registry contains verified ALL ABOUT ELECTRONICS Boolean Laws URL (RMe69AdlFdI)");
assert(videoContent.includes("W7YTfLaPWRY"), "Video registry contains verified ALL ABOUT ELECTRONICS De Morgan URL (W7YTfLaPWRY)");
assert(videoContent.includes("3pbH9IhxwOg"), "Video registry contains verified Neso Academy Redundancy Theorem URL (3pbH9IhxwOg)");

// ----------------------------------------------------------------------------
// 9. ZERO EM-DASH AND ZERO EN-DASH AUDIT
// ----------------------------------------------------------------------------
console.log("\n--- Checking Zero Em-dash (\\u2014) and Zero En-dash (\\u2013) Compliance ---");
const filesToCheck = [
  "src/data/dldSection21Data.js",
  "src/components/Section21View.jsx",
  "src/data/dldVideoConfig.js",
  "src/components/CuratedVideoCard.jsx",
  "src/components/BooleanLawsCheatSheet.jsx",
  "src/data/dldUnit2Master.js"
];

for (const relPath of filesToCheck) {
  const absPath = path.resolve(relPath);
  if (fs.existsSync(absPath)) {
    const text = fs.readFileSync(absPath, 'utf8');
    const emCount = (text.match(/\u2014/g) || []).length;
    const enCount = (text.match(/\u2013/g) || []).length;
    assert(emCount === 0, `${relPath}: Zero em-dashes found (count = ${emCount})`);
    assert(enCount === 0, `${relPath}: Zero en-dashes found (count = ${enCount})`);
  }
}

console.log("=================================================================");
console.log(`TOTAL AUDIT CHECKS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log("=================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  console.log("ALL MATHEMATICAL CHECKS PASSED WITH 100% ACCURACY!");
}
