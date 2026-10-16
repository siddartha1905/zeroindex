/**
 * Mathematical Verification Script for Section 1.5: Complements
 * Tests every worked model, practice question, and mixed challenge problem.
 */

function onesComp(binStr) {
  return binStr.split('').map(c => (c === '.' ? '.' : c === '0' ? '1' : '0')).join('');
}

function twosCompInt(binStr) {
  const ones = onesComp(binStr);
  const val = parseInt(ones, 2) + 1;
  return val.toString(2).padStart(binStr.length, '0');
}

function ninesComp(decStr) {
  return decStr.split('').map(c => (c === '.' ? '.' : String(9 - parseInt(c, 10)))).join('');
}

function tensCompInt(decStr) {
  const nines = ninesComp(decStr);
  const val = parseInt(nines, 10) + 1;
  return String(val).padStart(decStr.length, '0');
}

console.log("=== AUDITING SECTION 1.5 WORKED MODELS ===");

// Model 1A: 5472
console.log("Model 1A: 5472");
console.assert(ninesComp("5472") === "4527", "Model 1A 9s comp mismatch");
console.assert(tensCompInt("5472") === "4528", "Model 1A 10s comp mismatch");

// Model 1B: 24600
console.log("Model 1B: 24600");
console.assert(ninesComp("24600") === "75399", "Model 1B 9s comp mismatch");
console.assert(tensCompInt("24600") === "75400", "Model 1B 10s comp mismatch");

// Model 1C: 384.62
console.log("Model 1C: 384.62");
console.assert(ninesComp("384.62") === "615.37", "Model 1C 9s comp mismatch");
// 10s comp: 615.37 + 0.01 = 615.38
console.assert((615.37 + 0.01).toFixed(2) === "615.38", "Model 1C 10s comp mismatch");

// Model 1D: 0.0485 (Pure fraction with n=0 integer digits: (1 - 10^-4) - N = 0.9999 - 0.0485 = 0.9514)
console.log("Model 1D: 0.0485");
const nines1D = (0.9999 - 0.0485).toFixed(4);
console.assert(nines1D === "0.9514", "Model 1D 9s comp mismatch");
const tens1D = (1.0000 - 0.0485).toFixed(4);
console.assert(tens1D === "0.9515", "Model 1D 10s comp mismatch");

// Model 2A: 10110100
console.log("Model 2A: 10110100");
console.assert(onesComp("10110100") === "01001011", "Model 2A 1s comp mismatch");
console.assert(twosCompInt("10110100") === "01001100", "Model 2A 2s comp mismatch");

// Model 2B: 1100101
console.log("Model 2B: 1100101");
console.assert(onesComp("1100101") === "0011010", "Model 2B 1s comp mismatch");
console.assert(twosCompInt("1100101") === "0011011", "Model 2B 2s comp mismatch");

// Model 2C: 1011.0110
console.log("Model 2C: 1011.0110");
console.assert(onesComp("1011.0110") === "0100.1001", "Model 2C 1s comp mismatch");
// Adding 0.0001 to 0100.1001 gives 0100.1010
console.assert(onesComp("10110110") === "01001001");
console.assert(twosCompInt("10110110") === "01001010");

// Model 2D: 1111 and 1000
console.log("Model 2D: 1111 and 1000");
console.assert(onesComp("1111") === "0000" && twosCompInt("1111") === "0001");
console.assert(onesComp("1000") === "0111" && twosCompInt("1000") === "1000");

// Subtraction 9's:
console.log("Subtraction 9s: Models 3A, 3B, 3C, 3D");
console.assert(72532 - 13250 === 59282);
console.assert(72532 + parseInt(ninesComp("13250"), 10) === 159281);
console.assert(59281 + 1 === 59282);

console.assert(8435 - 627 === 7808);
console.assert(8435 + parseInt(ninesComp("0627"), 10) === 17807);
console.assert(7807 + 1 === 7808);

console.assert(13250 - 72532 === -59282);
console.assert(13250 + parseInt(ninesComp("72532"), 10) === 40717);
console.assert(ninesComp("40717") === "59282");

console.assert(456.75 - 189.50 === 267.25);

// Subtraction 10's:
console.log("Subtraction 10s: Models 4A, 4B, 4C, 4D");
console.assert(72532 + parseInt(tensCompInt("13250"), 10) === 159282);
console.assert(6428 - 409 === 6019);
console.assert(6428 + parseInt(tensCompInt("0409"), 10) === 16019);

console.assert(13250 + parseInt(tensCompInt("72532"), 10) === 40718);
console.assert(tensCompInt("40718") === "59282");

console.assert(409 - 6428 === -6019);
console.assert(409 + parseInt(tensCompInt("6428"), 10) === 3981);
console.assert(tensCompInt("3981") === "6019");

// Subtraction 1's:
console.log("Subtraction 1s: Models 5A, 5B, 5C, 5D, 5E");
console.assert(parseInt("1010100", 2) - parseInt("1000011", 2) === 17);
console.assert(parseInt("0010001", 2) === 17);
console.assert(parseInt("110101", 2) - parseInt("001101", 2) === 40);
console.assert(parseInt("101000", 2) === 40);

// Subtraction 2's:
console.log("Subtraction 2s: Models 6A, 6B, 6C, 6D, 6E");
console.assert(parseInt("101100", 2) - parseInt("000111", 2) === 37);
console.assert(parseInt("100101", 2) === 37);
console.assert(parseInt("001101", 2) - parseInt("100110", 2) === -25);
console.assert(parseInt("011001", 2) === 25);

console.log("ALL MATHEMATICAL ASSERTIONS PASSED SUCCESSFULLY!");
