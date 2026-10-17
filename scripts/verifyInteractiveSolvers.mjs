import fs from 'fs';
import path from 'path';

console.log("=================================================================");
console.log("      UNIT 1 INTERACTIVE SOLVERS SUITE RIGOROUS AUDIT            ");
console.log("=================================================================");

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

// 1. Audit for forbidden characters (zero em-dashes and zero en-dashes)
const filePath = path.resolve("src/components/InteractiveSolvers.jsx");
const content = fs.readFileSync(filePath, "utf-8");

const lines = content.split("\n");
let foundEm = 0;
let foundEn = 0;
lines.forEach((line, i) => {
  // Ignore header comment mentioning the rule
  if (i < 10 && line.includes("Strictly zero em-dashes")) return;
  if (line.includes("\u2014") || line.includes("—")) foundEm++;
  if (line.includes("\u2013") || line.includes("–")) foundEn++;
});

assert(foundEm === 0, `InteractiveSolvers.jsx: Zero em-dashes found (count = ${foundEm})`);
assert(foundEn === 0, `InteractiveSolvers.jsx: Zero en-dashes found (count = ${foundEn})`);

// 2. Engine 1: Universal Base & Fraction Conversion Logic
const DIGITS = "0123456789ABCDEF";
function parseToDecimalParts(str, base) {
  const clean = str.trim().toUpperCase();
  const parts = clean.split('.');
  const intPart = parts[0] || "0";
  const fracPart = parts[1] || "";
  let intDec = 0;
  for (let i = 0; i < intPart.length; i++) {
    intDec = intDec * base + DIGITS.indexOf(intPart[i]);
  }
  let fracDec = 0;
  for (let i = 0; i < fracPart.length; i++) {
    fracDec += DIGITS.indexOf(fracPart[i]) / Math.pow(base, i + 1);
  }
  return { intDec, fracDec, totalDec: intDec + fracDec };
}

const test10110_101 = parseToDecimalParts("10110.101", 2);
assert(test10110_101.totalDec === 22.625, "Engine 1: Binary (10110.101)₂ converted to 22.625₁₀");

const testB6A_C8 = parseToDecimalParts("B6A.C8", 16);
assert(testB6A_C8.intDec === 2922, "Engine 1: Hex (B6A)₁₆ converted to 2922₁₀");
assert(Math.abs(testB6A_C8.fracDec - 0.78125) < 0.0001, "Engine 1: Hex (.C8)₁₆ converted to 0.78125₁₀");

const test181_625 = parseToDecimalParts("181.625", 10);
assert(test181_625.totalDec === 181.625, "Engine 1: Decimal parsed accurately (181.625)");

// 3. Engine 2: Binary Arithmetic
function binaryAdd(aStr, bStr) {
  const [intA, fracA = ""] = aStr.split('.');
  const [intB, fracB = ""] = bStr.split('.');
  const maxInt = Math.max(intA.length, intB.length);
  const maxFrac = Math.max(fracA.length, fracB.length);
  const pIntA = intA.padStart(maxInt, '0');
  const pIntB = intB.padStart(maxInt, '0');
  const pFracA = fracA.padEnd(maxFrac, '0');
  const pFracB = fracB.padEnd(maxFrac, '0');

  const fullA = pIntA + pFracA;
  const fullB = pIntB + pFracB;

  let carry = 0;
  const sumBits = [];
  for (let i = fullA.length - 1; i >= 0; i--) {
    const s = parseInt(fullA[i], 10) + parseInt(fullB[i], 10) + carry;
    sumBits.unshift(s % 2);
    carry = Math.floor(s / 2);
  }
  if (carry > 0) sumBits.unshift(carry);

  const rawSum = sumBits.join('');
  if (maxFrac > 0) {
    return rawSum.slice(0, rawSum.length - maxFrac) + "." + rawSum.slice(rawSum.length - maxFrac);
  }
  return rawSum;
}

const addCheck = binaryAdd("1101.011", "1011.110");
assert(addCheck === "11001.001", `Engine 2: Binary addition 1101.011 + 1011.110 = 11001.001 (got ${addCheck})`);

// 4. Engine 3: Complements Subtractor Decision Diamond
function compSubtract(mStr, nStr, type) {
  const maxLen = Math.max(mStr.length, nStr.length);
  const padM = mStr.padStart(maxLen, '0');
  const padN = nStr.padStart(maxLen, '0');

  let compN = "";
  if (type === "twos") {
    const ones = padN.split('').map(b => b === '0' ? '1' : '0').join('');
    compN = (parseInt(ones, 2) + 1).toString(2).padStart(maxLen, '0');
  } else if (type === "ones") {
    compN = padN.split('').map(b => b === '0' ? '1' : '0').join('');
  }

  const sumVal = parseInt(padM, 2) + parseInt(compN, 2);
  const sumStr = sumVal.toString(2).padStart(maxLen, '0');
  const hasCarry = sumStr.length > maxLen;
  const remaining = hasCarry ? sumStr.slice(1) : sumStr;

  let result = "";
  if (hasCarry) {
    if (type === "twos") result = `+${remaining}`;
    else result = `+${(parseInt(remaining, 2) + 1).toString(2).padStart(maxLen, '0')}`;
  } else {
    if (type === "twos") {
      const ones = remaining.split('').map(b => b === '0' ? '1' : '0').join('');
      result = `-${(parseInt(ones, 2) + 1).toString(2).padStart(maxLen, '0')}`;
    } else {
      const ones = remaining.split('').map(b => b === '0' ? '1' : '0').join('');
      result = `-${ones}`;
    }
  }
  return { hasCarry, result };
}

const subPositive = compSubtract("11010", "01101", "twos");
assert(subPositive.hasCarry === true && subPositive.result === "+01101", "Engine 3: 26 - 13 with 2's comp yields Carry=1, result = +01101 (+13)");

const subNegative = compSubtract("01100", "10101", "twos");
assert(subNegative.hasCarry === false && subNegative.result === "-01001", "Engine 3: 12 - 21 with 2's comp yields Carry=0, result = -01001 (-9)");

// 5. Engine 4: 8-Bit Signed 2's Complement Overflow
function eval8BitOverflow(a, b) {
  const toSigned8Bit = (n) => n >= 0 ? (n & 0xFF).toString(2).padStart(8, '0') : (256 + n).toString(2).padStart(8, '0');
  const binA = toSigned8Bit(a);
  const binB = toSigned8Bit(b);

  let carry = 0;
  const carryArr = [];
  const sumBits = [];
  for (let i = 7; i >= 0; i--) {
    const s = parseInt(binA[i], 10) + parseInt(binB[i], 10) + carry;
    sumBits.unshift(s % 2);
    carryArr.unshift(carry);
    carry = Math.floor(s / 2);
  }
  const cout = carry;
  const cin = carryArr[0];
  const v = cin ^ cout;
  return { cin, cout, v };
}

const ovPositive = eval8BitOverflow(85, 65);
assert(ovPositive.v === 1, "Engine 4: (+85) + (+65) causes arithmetic overflow (V = 1)");

const ovNegative = eval8BitOverflow(-80, -60);
assert(ovNegative.v === 1, "Engine 4: (-80) + (-60) causes arithmetic overflow (V = 1)");

const safeMixed = eval8BitOverflow(45, -27);
assert(safeMixed.v === 0, "Engine 4: (+45) + (-27) is safe (V = 0)");

// 6. Engine 5: Logic Gates
function evalGate(gate, a, b) {
  if (gate === "AND") return a === 1 && b === 1 ? 1 : 0;
  if (gate === "OR") return a === 1 || b === 1 ? 1 : 0;
  if (gate === "NAND") return !(a === 1 && b === 1) ? 1 : 0;
  if (gate === "NOR") return a === 0 && b === 0 ? 1 : 0;
  if (gate === "XOR") return a !== b ? 1 : 0;
  if (gate === "XNOR") return a === b ? 1 : 0;
  return 0;
}

assert(evalGate("AND", 1, 1) === 1 && evalGate("AND", 1, 0) === 0, "Engine 5: AND gate verified");
assert(evalGate("OR", 0, 0) === 0 && evalGate("OR", 0, 1) === 1, "Engine 5: OR gate verified");
assert(evalGate("NAND", 1, 1) === 0 && evalGate("NAND", 0, 1) === 1, "Engine 5: NAND gate verified");
assert(evalGate("NOR", 0, 0) === 1 && evalGate("NOR", 1, 0) === 0, "Engine 5: NOR gate verified");
assert(evalGate("XOR", 1, 0) === 1 && evalGate("XOR", 1, 1) === 0, "Engine 5: XOR gate verified");
assert(evalGate("XNOR", 1, 1) === 1 && evalGate("XNOR", 1, 0) === 0, "Engine 5: XNOR gate verified");

console.log("=================================================================");
console.log(`TOTAL AUDIT CHECKS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log("=================================================================");

if (failCount > 0) {
  process.exit(1);
}
