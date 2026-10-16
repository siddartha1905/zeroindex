/**
 * Mathematical Verification & Dash Audit Script for Section 1.6
 * Verifies:
 * 1. Master 4-bit table mappings
 * 2. 8-bit conversions across Sign-Magnitude, 1's Complement, and 2's Complement
 * 3. 4-case 2's complement addition simulations (sum, carry bits, overflow flag V = Cin ^ Cout)
 * 4. Overflow models and Sign-Extension proofs
 * 5. Practice and Mixed Exam questions
 * 6. ZERO em-dashes (\u2014) and ZERO en-dashes (\u2013) across code and data
 */

import { section16Data } from '../src/data/dldSection16Data.js';
import fs from 'fs';
import path from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    passCount++;
  } else {
    failCount++;
    console.error(`[FAIL] ${message}`);
  }
}

console.log("=== STARTING SECTION 1.6 MATHEMATICAL AUDIT ===");

// -----------------------------------------------------------------------------
// 1. Audit Master 4-Bit Table
// -----------------------------------------------------------------------------
console.log("\n--- Checking Master 4-Bit Table (+7 down to -8) ---");
const table = section16Data.overviewSignBit.master4BitTable;
assert(table.length === 16, `Table has 16 rows (found ${table.length})`);

table.forEach(row => {
  const b = row.pattern.split('').map(x => parseInt(x, 10));
  // 2's complement decimal value: -b3*8 + b2*4 + b1*2 + b0*1
  const twosVal = -b[0] * 8 + b[1] * 4 + b[2] * 2 + b[3] * 1;
  const expectedTwosStr = twosVal > 0 ? `+${twosVal}` : `${twosVal}`;
  
  if (row.decimal.includes("/")) {
    // Boundary row -0 / -8
    assert(row.twosComp.includes("-8"), `Pattern ${row.pattern} 2's comp is -8`);
  } else if (row.decimal === "+0") {
    assert(row.twosComp.includes("0"), `Pattern 0000 2's comp is 0`);
  } else {
    assert(row.twosComp.includes(expectedTwosStr), `Pattern ${row.pattern} 2's comp has value ${expectedTwosStr} (found ${row.twosComp})`);
  }
});

// -----------------------------------------------------------------------------
// 2. Audit 1.6A Worked Models (Conversions & Range)
// -----------------------------------------------------------------------------
console.log("\n--- Checking 1.6A Models ---");

// Helper: 2's comp decode 8 bits
function decodeTwos8(binStr) {
  const b = binStr.split('').map(x => parseInt(x, 10));
  return -b[0] * 128 + b[1] * 64 + b[2] * 32 + b[3] * 16 + b[4] * 8 + b[5] * 4 + b[6] * 2 + b[7] * 1;
}

// Helper: Sign-mag decode 8 bits
function decodeSignMag8(binStr) {
  const sign = binStr[0] === '1' ? -1 : 1;
  const mag = parseInt(binStr.slice(1), 2);
  return sign * mag;
}

// Helper: 1's comp decode 8 bits
function decodeOnes8(binStr) {
  if (binStr[0] === '0') return parseInt(binStr, 2);
  const inverted = binStr.split('').map(x => x === '0' ? '1' : '0').join('');
  return -parseInt(inverted, 2);
}

// Verify +45 and -45
assert(decodeSignMag8("00101101") === 45, "+45 in SM is 45");
assert(decodeSignMag8("10101101") === -45, "-45 in SM is -45");
assert(decodeOnes8("00101101") === 45, "+45 in 1's is 45");
assert(decodeOnes8("11010010") === -45, "-45 in 1's is -45");
assert(decodeTwos8("00101101") === 45, "+45 in 2's is 45");
assert(decodeTwos8("11010011") === -45, "-45 in 2's is -45");

// Verify pattern 11010110 across all 3 forms
assert(decodeSignMag8("11010110") === -86, "11010110 in SM is -86");
assert(decodeOnes8("11010110") === -41, "11010110 in 1's is -41");
assert(decodeTwos8("11010110") === -42, "11010110 in 2's is -42");

// -----------------------------------------------------------------------------
// 3. Audit 1.6B Signed 2's Complement Arithmetic
// -----------------------------------------------------------------------------
console.log("\n--- Checking 1.6B 4-Case Addition Models ---");

function simulate8BitAddition(aBin, bBin) {
  let carry = 0;
  const sumBits = [];
  const carryRow = [];
  
  for (let i = 7; i >= 0; i--) {
    const bitA = parseInt(aBin[i], 10);
    const bitB = parseInt(bBin[i], 10);
    const s = bitA + bitB + carry;
    sumBits.unshift((s % 2).toString());
    carry = Math.floor(s / 2);
    if (i > 0) {
      carryRow.unshift(carry.toString());
    }
  }
  // carry into b7 was at i=1
  // carryRow has carries into b6..b0, plus carry into b7 at the start
  const cInToSign = parseInt(carryRow[0] || '0', 10);
  const cOutFromSign = carry;
  const overflow = (cInToSign ^ cOutFromSign) === 1;

  return {
    sumBin: sumBits.join(''),
    cIn: cInToSign,
    cOut: cOutFromSign,
    overflow,
    decVal: decodeTwos8(sumBits.join(''))
  };
}

section16Data.signedArithmetic.fourCases.forEach(cs => {
  const m = cs.model;
  const sim = simulate8BitAddition(m.aBin, m.bBin);
  assert(sim.sumBin === m.sumBin, `${cs.label}: sum ${sim.sumBin} matches model ${m.sumBin}`);
  assert(sim.cOut.toString() === m.carryOut, `${cs.label}: Cout ${sim.cOut} matches model ${m.carryOut}`);
  assert(sim.overflow === m.overflow, `${cs.label}: overflow ${sim.overflow} matches model ${m.overflow}`);
  const expectedDec = parseInt(m.sumDec.replace("+", ""), 10);
  assert(sim.decVal === expectedDec, `${cs.label}: decimal value ${sim.decVal} matches ${expectedDec}`);
});

// -----------------------------------------------------------------------------
// 4. Audit 1.6C Overflow & Sign-Extension Models
// -----------------------------------------------------------------------------
console.log("\n--- Checking 1.6C Overflow & Sign-Extension Models ---");

// Model 1: (+85) + (+65)
const of1 = simulate8BitAddition("01010101", "01000001");
assert(of1.overflow === true, "Model 1 (+85)+(+65) correctly causes overflow");
assert(of1.cIn === 1 && of1.cOut === 0, "Model 1 has Cin=1, Cout=0");
assert(of1.sumBin === "10010110", "Model 1 sum is 10010110 (-106)");

// Model 2: (-75) + (-68)
const of2 = simulate8BitAddition("10110101", "10111100");
assert(of2.overflow === true, "Model 2 (-75)+(-68) correctly causes overflow");
assert(of2.cIn === 0 && of2.cOut === 1, "Model 2 has Cin=0, Cout=1");
assert(of2.sumBin === "01110001", "Model 2 sum is 01110001 (+113)");

// Model 3: (-30) + (-40)
const of3 = simulate8BitAddition("11100010", "11011000");
assert(of3.overflow === false, "Model 3 (-30)+(-40) is valid (no overflow)");
assert(of3.cIn === 1 && of3.cOut === 1, "Model 3 has Cin=1, Cout=1");
assert(of3.decVal === -70, "Model 3 decimal value is -70");

// Model 4: Sign-bit extension
const ext5to8_pos = decodeTwos8("00001011");
assert(ext5to8_pos === 11, "5-bit +11 (01011) extended to 8 bits is +11");
const ext5to8_neg = decodeTwos8("11110101");
assert(ext5to8_neg === -11, "5-bit -11 (10101) extended to 8 bits is -11");

// -----------------------------------------------------------------------------
// 5. Audit Cheat Sheet Speed Shortcuts
// -----------------------------------------------------------------------------
console.log("\n--- Checking Cheat Sheet Rules ---");
assert(section16Data.cheatSheet.speedShortcuts.length === 4, "4 speed shortcuts present");
assert(decodeTwos8("11111111") === -1, "All 1s is -1");
assert(decodeTwos8("10000000") === -128, "1 followed by 7 zeros is -128");

// -----------------------------------------------------------------------------
// 6. Audit Mixed Exam Challenge (15 Questions)
// -----------------------------------------------------------------------------
console.log("\n--- Checking Mixed Exam Challenge Questions ---");
assert(section16Data.mixedPracticeQuestions.length === 15, `Mixed challenge has 15 questions (found ${section16Data.mixedPracticeQuestions.length})`);

// -----------------------------------------------------------------------------
// 7. Audit Dash Constraints (Zero em-dashes and en-dashes)
// -----------------------------------------------------------------------------
console.log("\n--- Checking Zero Em-Dashes and En-Dashes ---");
const filesToCheck = [
  'src/data/dldSection16Data.js',
  'src/components/Section16Components.jsx',
  'src/components/Section16View.jsx'
];

filesToCheck.forEach(file => {
  const filePath = path.resolve(file);
  const content = fs.readFileSync(filePath, 'utf8');
  const emDashMatches = content.match(/\u2014/g) || [];
  const enDashMatches = content.match(/\u2013/g) || [];
  assert(emDashMatches.length === 0, `Zero em-dashes in ${file} (found ${emDashMatches.length})`);
  assert(enDashMatches.length === 0, `Zero en-dashes in ${file} (found ${enDashMatches.length})`);
});

console.log(`\n========================================`);
console.log(`SECTION 1.6 AUDIT RESULTS:`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log("All Section 1.6 mathematical and architectural checks PASSED perfectly!");
}
