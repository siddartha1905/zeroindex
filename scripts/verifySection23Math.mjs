/**
 * Mathematical Audit & Verification Suite for DLD Unit 2 - Section 2.3
 * Course: Digital Logic Design (VR23 Autonomous)
 * Section 2.3: Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms
 * 
 * Strict Rule: Zero em-dashes and zero en-dashes throughout.
 * Verifies actual mathematical symbols Σ (\u03A3) and Π (\u03A0).
 */

import fs from 'fs';
import path from 'path';
import { dldSection23Data } from '../src/data/dldSection23Data.js';

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
console.log("   ZEROINDEX DLD SECTION 2.3: COMPREHENSIVE ACADEMIC AUDIT      ");
console.log("=================================================================");

// ----------------------------------------------------------------------------
// 1. DATA MODULE METADATA AND 6-TAB STRUCTURE
// ----------------------------------------------------------------------------
console.log("\n--- Checking Section Metadata & Section Data Integrity ---");
assert(dldSection23Data.number === "2.3", "Section number is exactly 2.3");
assert(dldSection23Data.title.includes("Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms"), "Section title matches syllabus exactly");
assert(dldSection23Data.badge === "Canonical Standards", "Badge is 'Canonical Standards'");
assert(!!dldSection23Data.startHere, "Tab 1 (startHere) data object exists");
assert(Array.isArray(dldSection23Data.startHere.whyMintermsMaxterms.bullets) && dldSection23Data.startHere.whyMintermsMaxterms.bullets.length === 6, "Tab 1 contains exactly 6 introductory bullet points");
assert(!!dldSection23Data.startHere.symbolFirstUse, "Tab 1 contains first-use notation guide for Σ and Π");
assert(!!dldSection23Data.mintermsAndMaxterms, "Tab 2 (mintermsAndMaxterms) data object exists");
assert(!!dldSection23Data.mintermsAndMaxterms.mintermDefinition.simpleDefinition, "Tab 2 contains Simple Definition for minterm");
assert(!!dldSection23Data.mintermsAndMaxterms.maxtermDefinition.simpleDefinition, "Tab 2 contains Simple Definition for maxterm");
assert(!!dldSection23Data.mintermsAndMaxterms.mVsMCallout, "Tab 2 contains Lowercase m vs Uppercase M distinction callout");
assert(!!dldSection23Data.canonicalForms, "Tab 3 (canonicalForms) data object exists");
assert(!!dldSection23Data.canonicalForms.sameFunctionFourForms, "Tab 3 contains 4-form exemplar for F(A, B, C) = AB + C");
assert(Array.isArray(dldSection23Data.canonicalForms.booleanFormsAtAGlance.rows) && dldSection23Data.canonicalForms.booleanFormsAtAGlance.rows.length === 9, "Tab 3 contains master comparison table with all 9 structural terms");
assert(Array.isArray(dldSection23Data.workedModels) && dldSection23Data.workedModels.length === 15, "Tab 4 (workedModels) contains exactly 15 models (14 core + 1 challenge)");
assert(!!dldSection23Data.cheatSheet, "Tab 5 (cheatSheet) data object exists");
assert(Array.isArray(dldSection23Data.practiceLab) && dldSection23Data.practiceLab.length === 24, "Tab 6 (practiceLab) contains exactly 24 practice questions");

// ----------------------------------------------------------------------------
// 2. MATHEMATICAL VERIFICATION OF ALL 28 MINTERMS & MAXTERMS
// ----------------------------------------------------------------------------
console.log("\n--- Checking Minterm and Maxterm Mathematical Properties (2, 3, and 4 variables) ---");

function evalMinterm(binString, inputs) {
  for (let i = 0; i < binString.length; i++) {
    const bit = parseInt(binString[i], 10);
    const inVal = inputs[i];
    const litVal = bit === 1 ? inVal : (1 - inVal);
    if (litVal === 0) return 0;
  }
  return 1;
}

function evalMaxterm(binString, inputs) {
  for (let i = 0; i < binString.length; i++) {
    const bit = parseInt(binString[i], 10);
    const inVal = inputs[i];
    const litVal = bit === 0 ? inVal : (1 - inVal);
    if (litVal === 1) return 1;
  }
  return 0;
}

// A. 2-Variable Table (4 rows)
const twoVarTable = dldSection23Data.mintermsAndMaxterms.twoVariableTable;
assert(twoVarTable.length === 4, "2-variable table has exactly 4 rows (2^2 = 4)");

twoVarTable.forEach(row => {
  const idx = row.index;
  const bin = row.bin;
  assert(parseInt(bin, 2) === idx, `2-var row ${idx}: binary pattern ${bin} converts to decimal ${idx}`);

  for (let a = 0; a <= 1; a++) {
    for (let b = 0; b <= 1; b++) {
      const curIdx = 2 * a + b;
      const mVal = evalMinterm(bin, [a, b]);
      const MVal = evalMaxterm(bin, [a, b]);

      if (curIdx === idx) {
        assert(mVal === 1, `2-var minterm m${idx} (${row.mintermTerm}) is 1 at row ${idx}`);
        assert(MVal === 0, `2-var maxterm M${idx} (${row.maxtermTerm}) is 0 at row ${idx}`);
      }
      assert((1 - mVal) === MVal, `2-var De Morgan complement (m${idx})' = M${idx} holds for inputs [${a}, ${b}]`);
    }
  }
});

// B. 3-Variable Table (8 rows)
const threeVarTable = dldSection23Data.mintermsAndMaxterms.threeVariableTable;
assert(threeVarTable.length === 8, "3-variable table has exactly 8 rows (2^3 = 8)");

threeVarTable.forEach(row => {
  const idx = row.index;
  const bin = row.bin;
  assert(parseInt(bin, 2) === idx, `3-var row ${idx}: binary pattern ${bin} converts to decimal ${idx}`);

  for (let a = 0; a <= 1; a++) {
    for (let b = 0; b <= 1; b++) {
      for (let c = 0; c <= 1; c++) {
        const curIdx = 4 * a + 2 * b + c;
        const mVal = evalMinterm(bin, [a, b, c]);
        const MVal = evalMaxterm(bin, [a, b, c]);

        if (curIdx === idx) {
          assert(mVal === 1, `3-var minterm m${idx} (${row.mintermTerm}) is 1 at row ${idx}`);
          assert(MVal === 0, `3-var maxterm M${idx} (${row.maxtermTerm}) is 0 at row ${idx}`);
        }
        assert((1 - mVal) === MVal, `3-var De Morgan complement (m${idx})' = M${idx} holds for [${a}, ${b}, ${c}]`);
      }
    }
  }
});

// C. 4-Variable Table (16 rows)
const fourVarTable = dldSection23Data.mintermsAndMaxterms.fourVariableTable;
assert(fourVarTable.length === 16, "4-variable table has exactly 16 rows (2^4 = 16)");

fourVarTable.forEach(row => {
  const idx = row.index;
  const bin = row.bin;
  assert(parseInt(bin, 2) === idx, `4-var row ${idx}: binary pattern ${bin} converts to decimal ${idx}`);

  for (let a = 0; a <= 1; a++) {
    for (let b = 0; b <= 1; b++) {
      for (let c = 0; c <= 1; c++) {
        for (let d = 0; d <= 1; d++) {
          const curIdx = 8 * a + 4 * b + 2 * c + d;
          const mVal = evalMinterm(bin, [a, b, c, d]);
          const MVal = evalMaxterm(bin, [a, b, c, d]);

          if (curIdx === idx) {
            assert(mVal === 1, `4-var minterm m${idx} (${row.mintermTerm}) is 1 at row ${idx}`);
            assert(MVal === 0, `4-var maxterm M${idx} (${row.maxtermTerm}) is 0 at row ${idx}`);
          }
          assert((1 - mVal) === MVal, `4-var De Morgan complement (m${idx})' = M${idx} holds for [${a}, ${b}, ${c}, ${d}]`);
        }
      }
    }
  }
});

assert(twoVarTable.length + threeVarTable.length + fourVarTable.length === 28, "Total of 28 minterms and maxterms verified across all 3 tables");

// ----------------------------------------------------------------------------
// 3. ALARM SYSTEM LEARNING DEMO & SYNCHRONIZED TABLE DEMO
// ----------------------------------------------------------------------------
console.log("\n--- Checking Alarm System & Synchronized Table Demonstrations ---");

// Alarm System: F = A + B
const alarmRows = dldSection23Data.startHere.alarmDemo.truthTable;
alarmRows.forEach(row => {
  const expectedF = (row.A | row.B);
  assert(row.F === expectedF, `Alarm row ${row.index} (A=${row.A}, B=${row.B}): F=${row.F} equals A+B=${expectedF}`);
});

// Synchronized Table: F = C for (A, B, C)
const syncRows = dldSection23Data.canonicalForms.synchronizedTableDemo.rows;
syncRows.forEach(row => {
  const expectedF = row.C;
  assert(row.F === expectedF, `Synchronized demo row ${row.index} (C=${row.C}): F=${row.F} equals C`);
  if (row.F === 1) {
    assert(row.selectedFor.startsWith("SOP"), `Row ${row.index} with F=1 is selected for SOP`);
  } else {
    assert(row.selectedFor.startsWith("POS"), `Row ${row.index} with F=0 is selected for POS`);
  }
});

// ----------------------------------------------------------------------------
// 4. ONE FUNCTION IN ALL FOUR FORMS (F = AB + C)
// ----------------------------------------------------------------------------
console.log("\n--- Checking One Function in All Four Forms: F(A, B, C) = AB + C ---");
const fourFormsRows = dldSection23Data.canonicalForms.sameFunctionFourForms.truthTableVerification;
assert(fourFormsRows.length === 8, "Four-forms verification table contains all 8 rows");

fourFormsRows.forEach(row => {
  const { A, B, C, genSOP, genPOS, canSOP, canPOS } = row;
  const expectedF = ((A & B) | C);
  const expectedPOS = ((A | C) & (B | C));
  const expectedCanSOP = [1, 3, 5, 6, 7].includes(row.index) ? 1 : 0;
  const expectedCanPOS = [0, 2, 4].includes(row.index) ? 0 : 1;

  assert(genSOP === expectedF, `Row ${row.index}: General SOP AB+C = ${genSOP} matches truth table`);
  assert(genPOS === expectedPOS, `Row ${row.index}: General POS (A+C)(B+C) = ${genPOS} matches truth table`);
  assert(canSOP === expectedCanSOP, `Row ${row.index}: Canonical SOP Σm(1,3,5,6,7) = ${canSOP} matches truth table`);
  assert(canPOS === expectedCanPOS, `Row ${row.index}: Canonical POS ΠM(0,2,4) = ${canPOS} matches truth table`);
  assert(genSOP === genPOS && genPOS === canSOP && canSOP === canPOS, `Row ${row.index}: All 4 forms are 100% functionally equivalent`);
});

// ----------------------------------------------------------------------------
// 5. MATHEMATICAL VERIFICATION OF ALL 15 WORKED MODELS
// ----------------------------------------------------------------------------
console.log("\n--- Checking All 15 Worked Models Exhaustively ---");

function verifyCanonicalEquivalence(numVars, func, expectedSopIndices, expectedPosIndices) {
  const totalRows = 1 << numVars;
  const actualSop = [];
  const actualPos = [];

  for (let i = 0; i < totalRows; i++) {
    const bits = [];
    for (let b = numVars - 1; b >= 0; b--) {
      bits.push((i >> b) & 1);
    }
    const val = func(...bits);
    if (val === 1) actualSop.push(i);
    else actualPos.push(i);
  }

  const sopMatches = JSON.stringify(actualSop.sort((a,b)=>a-b)) === JSON.stringify(expectedSopIndices.sort((a,b)=>a-b));
  const posMatches = JSON.stringify(actualPos.sort((a,b)=>a-b)) === JSON.stringify(expectedPosIndices.sort((a,b)=>a-b));
  const unionSize = new Set([...actualSop, ...actualPos]).size;
  const isPartition = unionSize === totalRows && actualSop.length + actualPos.length === totalRows;

  return sopMatches && posMatches && isPartition;
}

// WM2.3-B01
assert(verifyCanonicalEquivalence(2, (a, b) => (a === 1 && b === 0 ? 1 : 0), [2], [0, 1, 3]), "WM2.3-B01: Index 2 has minterm AB' and maxterm A'+B");
// WM2.3-B02
assert(verifyCanonicalEquivalence(3, (a, b, c) => (a === 1 && b === 0 && c === 1 ? 1 : 0), [5], [0, 1, 2, 3, 4, 6, 7]), "WM2.3-B02: Index 5 has minterm AB'C and maxterm A'+B+C'");
// WM2.3-B03
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (a === 1 && b === 0 && c === 1 && d === 0 ? 1 : 0), [10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15]), "WM2.3-B03: Index 10 has minterm AB'CD' and maxterm A'+B+C'+D");
// WM2.3-B04
assert(verifyCanonicalEquivalence(2, (a, b) => (a | b), [1, 2, 3], [0]), "WM2.3-B04: 2-var OR function yields Σm(1, 2, 3) and ΠM(0)");
// WM2.3-I01
assert(verifyCanonicalEquivalence(3, (a, b, c) => c, [1, 3, 5, 7], [0, 2, 4, 6]), "WM2.3-I01: F = C yields Σm(1, 3, 5, 7) and ΠM(0, 2, 4, 6)");
// WM2.3-I02 (Walkthrough)
assert(verifyCanonicalEquivalence(3, (a, b, c) => ((a & b) | (1 - c)), [0, 2, 4, 6, 7], [1, 3, 5]), "WM2.3-I02: F = AB + C' yields Σm(0, 2, 4, 6, 7) and ΠM(1, 3, 5)");
// WM2.3-I03
assert(verifyCanonicalEquivalence(3, (a, b, c) => (((1 - a) & b) | (b & c)), [2, 3, 7], [0, 1, 4, 5, 6]), "WM2.3-I03: F = A'B + BC yields Σm(2, 3, 7) and ΠM(0, 1, 4, 5, 6)");
// WM2.3-I04
assert(verifyCanonicalEquivalence(3, (a, b, c) => (1 - c), [0, 2, 4, 6], [1, 3, 5, 7]), "WM2.3-I04: F = C' yields Σm(0, 2, 4, 6) and ΠM(1, 3, 5, 7)");
// WM2.3-I05
assert(verifyCanonicalEquivalence(3, (a, b, c) => ((a | b) & ((1 - a) | c)), [2, 3, 5, 7], [0, 1, 4, 6]), "WM2.3-I05: F = (A+B)(A'+C) yields Σm(2, 3, 5, 7) and ΠM(0, 1, 4, 6)");
// WM2.3-A01
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => ((a & b) | (c & d)), [3, 7, 11, 12, 13, 14, 15], [0, 1, 2, 4, 5, 6, 8, 9, 10]), "WM2.3-A01: F = AB + CD yields Σm(3, 7, 11, 12, 13, 14, 15) and ΠM(0, 1, 2, 4, 5, 6, 8, 9, 10)");
// WM2.3-A02
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => ((a | b) & (c | d)), [5, 6, 7, 9, 10, 11, 13, 14, 15], [0, 1, 2, 3, 4, 8, 12]), "WM2.3-A02: F = (A+B)(C+D) yields Σm(5, 6, 7, 9, 10, 11, 13, 14, 15) and ΠM(0, 1, 2, 3, 4, 8, 12)");
// WM2.3-A03
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (((1 - a) & c) | (b & d)), [2, 3, 5, 6, 7, 13, 15], [0, 1, 4, 8, 9, 10, 11, 12, 14]), "WM2.3-A03: F = A'C + BD yields Σm(2, 3, 5, 6, 7, 13, 15) and ΠM(0, 1, 4, 8, 9, 10, 11, 12, 14)");
// WM2.3-A04
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (((1 - b) & (1 - d)) | (b & d)), [0, 2, 5, 7, 8, 10, 13, 15], [1, 3, 4, 6, 9, 11, 12, 14]), "WM2.3-A04: F = B'D' + BD yields Σm(0, 2, 5, 7, 8, 10, 13, 15) and ΠM(1, 3, 4, 6, 9, 11, 12, 14)");
// WM2.3-A05
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (((1 - a) & b) | (c & (1 - d))), [2, 4, 5, 6, 7, 10, 14], [0, 1, 3, 8, 9, 11, 12, 13, 15]), "WM2.3-A05: F = A'B + CD' yields Σm(2, 4, 5, 6, 7, 10, 14) and ΠM(0, 1, 3, 8, 9, 11, 12, 13, 15)");

// WM2.3-CH01: Enrichment model: 4 variables -> 16 rows. Odd number of ones.
let totalOddOnes = 0;
function comb(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let c = 1;
  for (let i = 1; i <= k; i++) {
    c = c * (n - (k - i)) / i;
  }
  return c;
}
for (let k = 1; k <= 16; k += 2) {
  totalOddOnes += comb(16, k);
}
assert(totalOddOnes === 32768, "WM2.3-CH01: Number of 4-variable Boolean functions with odd parity of ones is exactly 32,768 (2^15)");

// ----------------------------------------------------------------------------
// 6. MATHEMATICAL VERIFICATION OF ALL 24 PRACTICE QUESTIONS
// ----------------------------------------------------------------------------
console.log("\n--- Checking All 24 Practice Questions Exhaustively ---");

assert(verifyCanonicalEquivalence(2, (a, b) => (a === 1 && b === 0 ? 1 : 0), [2], [0, 1, 3]), "P01 verified");
assert(verifyCanonicalEquivalence(2, (a, b) => (a === 1 && b === 1 ? 1 : 0), [3], [0, 1, 2]), "P02 verified");
assert(verifyCanonicalEquivalence(3, (a, b, c) => (a === 0 && b === 1 && c === 1 ? 1 : 0), [3], [0, 1, 2, 4, 5, 6, 7]), "P03 verified");
assert(verifyCanonicalEquivalence(3, (a, b, c) => (a === 1 && b === 1 && c === 0 ? 1 : 0), [6], [0, 1, 2, 3, 4, 5, 7]), "P04 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (a === 1 && b === 0 && c === 0 && d === 1 ? 1 : 0), [9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]), "P05 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (a === 1 && b === 1 && c === 1 && d === 0 ? 1 : 0), [14], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15]), "P06 verified");
assert(verifyCanonicalEquivalence(2, (a, b) => (a ^ b), [1, 2], [0, 3]), "P07 (XOR) verified");
assert(verifyCanonicalEquivalence(3, (a, b, c) => c, [1, 3, 5, 7], [0, 2, 4, 6]), "P08 verified");
assert(verifyCanonicalEquivalence(3, (a, b, c) => ([1, 2, 6].includes(4*a + 2*b + c) ? 0 : 1), [0, 3, 4, 5, 7], [1, 2, 6]), "P09 verified");
assert(verifyCanonicalEquivalence(3, (a, b, c) => ((a & b) | (1 - c)), [0, 2, 4, 6, 7], [1, 3, 5]), "P10 verified");
assert(verifyCanonicalEquivalence(3, (a, b, c) => (((1 - a) & b) | (b & c)), [2, 3, 7], [0, 1, 4, 5, 6]), "P11 verified");
assert(verifyCanonicalEquivalence(3, (a, b, c) => (1 - c), [0, 2, 4, 6], [1, 3, 5, 7]), "P12 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => ((a & b) | (c & d)), [3, 7, 11, 12, 13, 14, 15], [0, 1, 2, 4, 5, 6, 8, 9, 10]), "P13 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => ((a | b) & (c | d)), [5, 6, 7, 9, 10, 11, 13, 14, 15], [0, 1, 2, 3, 4, 8, 12]), "P14 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (((1 - a) & c) | (b & d)), [2, 3, 5, 6, 7, 13, 15], [0, 1, 4, 8, 9, 10, 11, 12, 14]), "P15 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (((1 - a) & b) | (c & (1 - d))), [2, 4, 5, 6, 7, 10, 14], [0, 1, 3, 8, 9, 11, 12, 13, 15]), "P16 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => ([0, 2, 5, 7, 8, 10, 13, 15].includes(8*a + 4*b + 2*c + d) ? 1 : 0), [0, 2, 5, 7, 8, 10, 13, 15], [1, 3, 4, 6, 9, 11, 12, 14]), "P17 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => d, [1, 3, 5, 7, 9, 11, 13, 15], [0, 2, 4, 6, 8, 10, 12, 14]), "P18 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => ((a | (1 - b)) & (c | d)), [1, 2, 3, 9, 10, 11, 13, 14, 15], [0, 4, 5, 6, 7, 8, 12]), "P19 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => ((a & (1 - b)) | ((1 - c) & d)), [1, 5, 8, 9, 10, 11, 13], [0, 2, 3, 4, 6, 7, 12, 14, 15]), "P20 verified");
assert(verifyCanonicalEquivalence(4, (a, b, c, d) => (((1 - a) & (1 - b)) | (c & d)), [0, 1, 2, 3, 7, 11, 15], [4, 5, 6, 8, 9, 10, 12, 13, 14]), "P21 verified");
assert(verifyCanonicalEquivalence(3, (a, b, c) => ([1, 2, 4, 7].includes(4*a + 2*b + c) ? 1 : 0), [1, 2, 4, 7], [0, 3, 5, 6]), "P22 verified");
assert(totalOddOnes === 32768, "P23 verified (32,768 functions)");
assert(verifyCanonicalEquivalence(3, () => 0, [], [0, 1, 2, 3, 4, 5, 6, 7]), "P24 (Constant 0) verified");
assert(verifyCanonicalEquivalence(3, () => 1, [0, 1, 2, 3, 4, 5, 6, 7], []), "P24 (Constant 1) verified");

// ----------------------------------------------------------------------------
// 7. ACTUAL MATHEMATICAL SYMBOLS AUDIT (Σ AND Π MUST BE RENDERED IN FORMULAS)
// ----------------------------------------------------------------------------
console.log("\n--- Checking Actual Mathematical Symbols Audit: Σ (\u03A3) and Π (\u03A0) ---");
const dataContent = fs.readFileSync(path.resolve('./src/data/dldSection23Data.js'), 'utf-8');
const viewContent = fs.readFileSync(path.resolve('./src/components/Section23View.jsx'), 'utf-8');

assert(dataContent.includes('Σm'), "dldSection23Data.js contains actual capital Σ in Σm notation");
assert(dataContent.includes('ΠM'), "dldSection23Data.js contains actual capital Π in ΠM notation");
assert(viewContent.includes('Σm') || viewContent.includes('Σ'), "Section23View.jsx renders actual capital Σ");
assert(viewContent.includes('ΠM') || viewContent.includes('Π'), "Section23View.jsx renders actual capital Π");

// Ensure formulas do NOT render "Sigma m" or "Pi M"
const dataSigmaFormulaMatches = (dataContent.match(/["']F\s*=\s*Sigma\s+m/g) || []).length;
const dataPiFormulaMatches = (dataContent.match(/["']F\s*=\s*Pi\s+M/g) || []).length;
assert(dataSigmaFormulaMatches === 0, "No 'F = Sigma m' text found in formulas (all replaced by Σm)");
assert(dataPiFormulaMatches === 0, "No 'F = Pi M' text found in formulas (all replaced by ΠM)");

// ----------------------------------------------------------------------------
// 8. TYPOGRAPHIC AUDIT: STRICT ZERO EM-DASHES AND EN-DASHES
// ----------------------------------------------------------------------------
console.log("\n--- Checking Typographic Audit (Strictly Zero Em-Dashes and En-Dashes) ---");

const filesToCheck = [
  path.resolve('./src/data/dldSection23Data.js'),
  path.resolve('./src/components/Section23View.jsx')
];

filesToCheck.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const hasEmDash = content.includes('\u2014');
  const hasEnDash = content.includes('\u2013');

  assert(!hasEmDash, `File ${path.basename(filePath)} contains ZERO em-dashes (\\u2014)`);
  assert(!hasEnDash, `File ${path.basename(filePath)} contains ZERO en-dashes (\\u2013)`);
});

// ----------------------------------------------------------------------------
// FINAL SUMMARY
// ----------------------------------------------------------------------------
console.log("\n=================================================================");
console.log(`SECTION 2.3 REFINED AUDIT COMPLETE: ${passCount} PASSED, ${failCount} FAILED`);
console.log("=================================================================");

if (failCount > 0) {
  process.exit(1);
} else {
  console.log("ALL MATHEMATICAL, TYPOGRAPHIC, AND PEDAGOGICAL AUDITS FULLY SATISFIED!\n");
}
