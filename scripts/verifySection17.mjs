import { section17Data } from "../src/data/dldSection17Data.js";
import fs from "fs";
import path from "path";

console.log("=================================================================");
console.log("      DIGITAL LOGIC DESIGN - SECTION 1.7 RIGOROUS AUDIT        ");
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

// 1. Audit files for forbidden characters: em-dashes and en-dashes
const filesToAudit = [
  "src/data/dldSection17Data.js",
  "src/components/Section17Components.jsx",
  "src/components/Section17View.jsx"
];

for (const relPath of filesToAudit) {
  const fullPath = path.resolve(relPath);
  const content = fs.readFileSync(fullPath, "utf-8");
  
  const lines = content.split("\n");
  let foundEm = 0;
  let foundEn = 0;
  lines.forEach((line, i) => {
    // Ignore top documentation comment line mentioning the rule
    if (i < 8 && line.includes("Strictly zero em-dashes")) return;
    if (line.includes("\u2014") || line.includes("—")) foundEm++;
    if (line.includes("\u2013") || line.includes("–")) foundEn++;
  });

  assert(foundEm === 0, `${relPath}: Zero em-dashes found (count = ${foundEm})`);
  assert(foundEn === 0, `${relPath}: Zero en-dashes found (count = ${foundEn})`);
}

// 2. Audit for University Names and Exam Years in dldSection17Data.js
const uniRegex = /(JNTU|Anna Univ|VTU|Gate \d{4}|20\d\d|19\d\d|Exam \d{4})/i;
const s17Content = fs.readFileSync(path.resolve("src/data/dldSection17Data.js"), "utf-8");
// Exclude legitimate component IC numbers like 7400, 7404, 7408, 7432, 7486, 74266, 1969 AI paper reference and unicode escape strings
const sanitizedContent = s17Content
  .replace(/74\d{2,3}/g, "")
  .replace(/\\u2014/g, "")
  .replace(/\\u2013/g, "")
  .replace(/1969/g, ""); // 1969 Minsky-Papert XOR paper reference is historical AI concept
const uniMatches = sanitizedContent.match(uniRegex);
assert(!uniMatches, `dldSection17Data.js: Zero university names or exam years found (${uniMatches ? uniMatches[0] : "None"})`);

// 3. Tab 1: Overview & Live Gate Simulator
const overview = section17Data.overviewGates;
assert(overview && overview.allSevenGates && overview.allSevenGates.length === 7, "Tab 1: All 7 gates present in live simulator");
assert(overview.families && overview.families.length === 3, "Tab 1: 3 clean gate families present");

// Test Live Gate Explorer evaluation functions
for (const gate of overview.allSevenGates) {
  const inputs = gate.inputs;
  if (inputs === 1) {
    const y0 = gate.evalFn(0, 0);
    const y1 = gate.evalFn(1, 0);
    assert(y0 === 1 && y1 === 0, `Simulator NOT logic correct: 0->${y0}, 1->${y1}`);
  } else {
    const y00 = gate.evalFn(0, 0);
    const y01 = gate.evalFn(0, 1);
    const y10 = gate.evalFn(1, 0);
    const y11 = gate.evalFn(1, 1);
    
    if (gate.id === "AND") {
      assert(y00 === 0 && y01 === 0 && y10 === 0 && y11 === 1, "Simulator AND logic correct (0,0,0,1)");
    } else if (gate.id === "OR") {
      assert(y00 === 0 && y01 === 1 && y10 === 1 && y11 === 1, "Simulator OR logic correct (0,1,1,1)");
    } else if (gate.id === "NAND") {
      assert(y00 === 1 && y01 === 1 && y10 === 1 && y11 === 0, "Simulator NAND logic correct (1,1,1,0)");
    } else if (gate.id === "NOR") {
      assert(y00 === 1 && y01 === 0 && y10 === 0 && y11 === 0, "Simulator NOR logic correct (1,0,0,0)");
    } else if (gate.id === "XOR") {
      assert(y00 === 0 && y01 === 1 && y10 === 1 && y11 === 0, "Simulator XOR logic correct (0,1,1,0)");
    } else if (gate.id === "XNOR") {
      assert(y00 === 1 && y01 === 0 && y10 === 0 && y11 === 1, "Simulator XNOR logic correct (1,0,0,1)");
    }
  }
}

// 4. Tab 2: 1.7A Basic Gates (NOT, AND, OR)
const basic = section17Data.basicGatesData;
const basicKeys = ["notGate", "andGate", "orGate"];
for (const bk of basicKeys) {
  const g = basic[bk];
  assert(g, `1.7A: ${bk} data present`);
  assert(g.workedModels && g.workedModels.length === 4, `1.7A ${bk}: Exactly 4 worked models (found ${g.workedModels.length})`);
  assert(g.practiceProblems && g.practiceProblems.length === 6, `1.7A ${bk}: Exactly 6 practice problems (found ${g.practiceProblems.length})`);
  assert(g.switchCircuit, `1.7A ${bk}: Electrical switch circuit analogy present`);
  assert(g.truthTable2 && g.truthTable2.length === (bk === "notGate" ? 2 : 4), `1.7A ${bk}: Truth table rows valid`);
}

// 5. Tab 3: 1.7B Universal & Special Gates (NAND, NOR, XOR, XNOR)
const universalSpecial = section17Data.universalSpecialGatesData;
const unspecKeys = ["nandGate", "norGate", "xorGate", "xnorGate"];
for (const uk of unspecKeys) {
  const g = universalSpecial[uk];
  assert(g, `1.7B: ${uk} data present`);
  assert(g.workedModels && g.workedModels.length === 4, `1.7B ${uk}: Exactly 4 worked models (found ${g.workedModels.length})`);
  assert(g.practiceProblems && g.practiceProblems.length === 6, `1.7B ${uk}: Exactly 6 practice problems (found ${g.practiceProblems.length})`);
  assert(g.controlledInverter || g.controlledEquivalence, `1.7B ${uk}: Controlled inverter property defined`);
}

// 6. Tab 4: Cheat Sheet & Timing Waveforms
const cs = section17Data.cheatSheetTimingData;
assert(cs.masterMatrix && cs.masterMatrix.length === 7, "Tab 4: Master matrix contains all 7 logic gates");
assert(cs.waveformGuide && cs.waveformGuide.timeIntervals.length === 4, "Tab 4: Waveform timing guide contains 4 intervals");
assert(cs.top5ExamMistakes && cs.top5ExamMistakes.length === 5, "Tab 4: Exactly 5 top exam mistakes documented");

console.log("=================================================================");
console.log(`TOTAL AUDIT CHECKS: ${passCount + failCount}`);
console.log(`PASSED: ${passCount}`);
console.log(`FAILED: ${failCount}`);
console.log("=================================================================");

if (failCount > 0) {
  process.exit(1);
}
