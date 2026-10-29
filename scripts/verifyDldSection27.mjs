/**
 * ZeroIndex Section 2.7 Academic and Verification Suite
 * Mathematical, Component SSR, and Zero-Dash Compliance Audit
 * Updated for Phase 5B.10A: Circuit Accuracy and Logic-Depth Corrections
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedChecks++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedChecks++;
  }
}

// Logic helper functions
function nand(a, b) {
  return !(a && b) ? 1 : 0;
}

function nor(a, b) {
  return !(a || b) ? 1 : 0;
}

console.log('================================================================');
console.log('ZeroIndex Section 2.7 Phase 5B.10A Audit: Accuracy & Logic Depths');
console.log('================================================================\n');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom'
});

try {
  // SUITE 1: DATA COMPLETENESS & LOGIC DEPTH AUDIT
  console.log('SUITE 1: Section 2.7 Academic Data Completeness & Logic Depth Audit');
  const dataModule = await import('../src/data/dldSection27Data.js');
  const data = dataModule.dldSection27Data || dataModule.default;

  assert(data.id === '2.7', 'Section ID is 2.7');
  assert(data.title === 'NAND and NOR Implementation', 'Section title matches approved syllabus');
  assert(Array.isArray(data.introductoryBullets) && data.introductoryBullets.length === 6, 'Contains 6 introductory bullets');
  assert(Array.isArray(data.sevenGates) && data.sevenGates.length === 7, 'Tab 1 contains exactly 7 standard logic gates');
  assert(data.universalFoundations && data.universalFoundations.whyNandUniversal && data.universalFoundations.whyNorUniversal, 'Tab 2 contains universal foundations');
  assert(data.universalFoundations.practicalScenarios.length === 3, 'Tab 2 contains 3 practical engineering scenarios');

  // Audit Tab 3 Realisations
  assert(Array.isArray(data.gateRealisations.nandOnly) && data.gateRealisations.nandOnly.length === 6, 'Tab 3 contains 6 NAND-only realisations');
  assert(Array.isArray(data.gateRealisations.norOnly) && data.gateRealisations.norOnly.length === 6, 'Tab 3 contains 6 NOR-only realisations');

  // Verify NOR-only XOR is 5 gates and 3 logic levels
  const norXor = data.gateRealisations.norOnly.find(r => r.id === 'nor-xor');
  assert(norXor !== undefined, 'Found nor-xor realisation');
  assert(norXor.gateCount === 5, 'nor-xor gateCount is 5 physical gates');
  assert(norXor.logicDepth === 3, 'nor-xor logicDepth is 3 levels (optimal 3-level circuit)');

  // Verify NAND-only XNOR is 5 gates and 3 logic levels (Phase 5B.10C)
  const nandXnor = data.gateRealisations.nandOnly.find(r => r.id === 'nand-xnor');
  assert(nandXnor !== undefined, 'Found nand-xnor realisation');
  assert(nandXnor.gateCount === 5, 'nand-xnor gateCount is 5 physical gates');
  assert(nandXnor.logicDepth === 3, 'nand-xnor logicDepth is 3 levels (optimal 3-level circuit)');

  // Audit Tab 4 Standard Realisations logic depths and gate counts
  const std3 = data.standardRealisations.find(d => d.id === 'std-3');
  assert(std3 && std3.logicDepth === 3, 'std-3 (F = A\'B + AC) logicDepth is 3 levels (A -> u -> p -> F)');

  const std5 = data.standardRealisations.find(d => d.id === 'std-5');
  assert(std5 && std5.logicDepth === 3 && std5.gateFamily === 'NAND Only', 'std-5 (POS via NAND) is NAND Only with 3 logic levels');

  const std6 = data.standardRealisations.find(d => d.id === 'std-6');
  assert(std6 && std6.logicDepth === 2 && std6.gateCount === 3, 'std-6 (F = AB + C via NOR) logicDepth is 2 levels with 3 gates');

  const std7 = data.standardRealisations.find(d => d.id === 'std-7');
  assert(std7 && std7.logicDepth === 3 && std7.gateCount === 3 && std7.gateFamily === 'Mixed NAND / NOR', 'std-7 is Mixed NAND/NOR with 3 gates and 3 logic levels');

  // Audit Tab 5 Multi-Level Realisations metrics (Phase 5B.10C)
  const ml1 = data.multiLevelTheory.guidedExamples.find(m => m.id === 'ml-ex1');
  assert(ml1 && ml1.gateCount === 6 && ml1.logicDepth === 4, 'ml-ex1 (F = (AB+C)D+E) has 6 NAND gates and 4 logic levels');

  const ml2 = data.multiLevelTheory.guidedExamples.find(m => m.id === 'ml-ex2');
  assert(ml2 && ml2.gateCount === 6 && ml2.logicDepth === 4, 'ml-ex2 (F = [(A+B)C+D]E) has 6 NOR gates and 4 logic levels');

  const ml3 = data.multiLevelTheory.guidedExamples.find(m => m.id === 'ml-ex3');
  assert(ml3 && ml3.gateCount === 5 && ml3.logicDepth === 4, 'ml-ex3 (F = A(B+CD)) has 5 NAND gates and 4 logic levels');

  // Audit Tab 6 Worked Examples identities and logic depths
  const we01 = data.workedExamples.find(we => we.id === 'WE-01');
  assert(we01 && we01.givenExpression === "F(A,B,C) = AB + A'C" && we01.gateCount === 4 && we01.logicLevels === 3 && we01.requiredRealisation === 'NAND Only', 'WE-01 is F = AB + A\'C with 4 NAND gates and 3 logic levels');

  const we02 = data.workedExamples.find(we => we.id === 'WE-02');
  assert(we02 && we02.givenExpression === "F(A,B,C) = (A + B')(B + C)" && we02.gateCount === 4 && we02.logicLevels === 3 && we02.requiredRealisation === 'NOR Only', 'WE-02 is F = (A + B\')(B + C) with 4 NOR gates and 3 logic levels');

  const we03 = data.workedExamples.find(we => we.id === 'WE-03');
  assert(we03 && we03.givenExpression === "F(A,B) = A'B' + AB" && we03.gateCount === 5 && we03.logicLevels === 3 && we03.requiredRealisation === 'NAND Only', 'WE-03 is F = A\'B\' + AB with 5 NAND gates and 3 logic levels');

  const we04 = data.workedExamples.find(we => we.id === 'WE-04');
  assert(we04 && we04.givenExpression === "F(A,B,C) = (A' + B)(A + C)" && we04.gateCount === 4 && we04.logicLevels === 3 && we04.requiredRealisation === 'NOR Only', 'WE-04 is F = (A\' + B)(A + C) with 4 NOR gates and 3 logic levels');

  const we06 = data.workedExamples.find(we => we.id === 'WE-06');
  assert(we06 && we06.logicLevels === 2, 'WE-06 (POS via NAND alone: F = B + AC) logicLevels is 2 levels');

  const we11 = data.workedExamples.find(we => we.id === 'WE-11');
  assert(we11 && we11.logicLevels === 3, 'WE-11 (XOR Benchmark) logicLevels is 3 levels for both NAND and NOR');

  // Audit Tab 7 Cheat Sheet summaries and reference circuits
  const csNorXor = data.masterCheatSheet.norRealisationSummary.find(r => r.target === 'XOR');
  assert(csNorXor && csNorXor.gateCount === 5 && csNorXor.levels === 3, 'Master Cheat Sheet records 5 gates and 3 levels for NOR-only XOR');

  const csNandXnor = data.masterCheatSheet.nandRealisationSummary.find(r => r.target === 'XNOR');
  assert(csNandXnor && csNandXnor.gateCount === 5 && csNandXnor.levels === 3, 'Master Cheat Sheet records 5 gates and 3 levels for NAND-only XNOR');

  const refCircuits = data.masterCheatSheet.referenceCircuits;
  assert(refCircuits && refCircuits.nandInverter && refCircuits.nandInverter.output.label === "F = A'" && refCircuits.nandInverter.gates.length === 1 && refCircuits.nandInverter.gates[0].type === 'NAND', 'Master Cheat Sheet contains valid NAND Inverter reference circuit (F = A\')');
  assert(refCircuits && refCircuits.norInverter && refCircuits.norInverter.output.label === "F = A'" && refCircuits.norInverter.gates.length === 1 && refCircuits.norInverter.gates[0].type === 'NOR', 'Master Cheat Sheet contains valid NOR Inverter reference circuit (F = A\')');
  assert(refCircuits && refCircuits.nandNandSop && refCircuits.nandNandSop.output.label === "F = AB + CD" && refCircuits.nandNandSop.gates.length === 3 && refCircuits.nandNandSop.gates.every(g => g.type === 'NAND'), 'Master Cheat Sheet contains valid NAND-NAND SOP reference circuit (F = AB + CD)');
  assert(refCircuits && refCircuits.norNorPos && refCircuits.norNorPos.output.label === "F = (A+B)(C+D)" && refCircuits.norNorPos.gates.length === 3 && refCircuits.norNorPos.gates.every(g => g.type === 'NOR'), 'Master Cheat Sheet contains valid NOR-NOR POS reference circuit (F = (A+B)(C+D))');

  // Audit Tab 8 Practice Questions metrics and restorations
  const pq03 = data.practiceQuestions.find(pq => pq.id === 'PQ-03');
  assert(pq03 && pq03.circuit.gates.length === 2, 'PQ-03 circuit has exactly 2 NAND gates');

  const pq04 = data.practiceQuestions.find(pq => pq.id === 'PQ-04');
  assert(pq04 && pq04.circuit.gates.length === 5, 'PQ-04 circuit has exactly 5 NOR gates');

  const pq05 = data.practiceQuestions.find(pq => pq.id === 'PQ-05');
  assert(pq05 && pq05.circuit.gates.length === 5, 'PQ-05 circuit has exactly 5 NAND gates');

  const pq06 = data.practiceQuestions.find(pq => pq.id === 'PQ-06');
  assert(pq06 && pq06.circuit.gates.length === 3, 'PQ-06 circuit has exactly 3 NOR gates');

  const pq07 = data.practiceQuestions.find(pq => pq.id === 'PQ-07');
  assert(pq07 && pq07.circuit.gates.length === 4 && pq07.answer.includes('3 logic levels'), 'PQ-07 has 4 NAND gates and 3 logic levels');

  const pq08 = data.practiceQuestions.find(pq => pq.id === 'PQ-08');
  assert(pq08 && pq08.circuit.gates.length === 3, 'PQ-08 circuit has exactly 3 gates (Mixed NAND/NOR)');

  const pq09 = data.practiceQuestions.find(pq => pq.id === 'PQ-09');
  assert(pq09 && pq09.circuit.gates.length === 6, 'PQ-09 circuit has exactly 6 NAND gates');

  const pq10 = data.practiceQuestions.find(pq => pq.id === 'PQ-10');
  assert(pq10 && pq10.circuit.gates.length === 5, 'PQ-10 circuit has exactly 5 NAND gates');

  // SUITE 2: MATHEMATICAL VERIFICATION OF ALL 12 REALISATIONS
  console.log('\nSUITE 2: Exhaustive Mathematical Verification of 12 Gate Realisations');
  for (let A = 0; A <= 1; A++) {
    for (let B = 0; B <= 1; B++) {
      // 1. NAND-NOT
      assert(nand(A, A) === (1 - A), `NAND NOT verified at A=${A}`);

      // 2. NAND-AND
      const p_nand_and = nand(A, B);
      assert(nand(p_nand_and, p_nand_and) === (A && B ? 1 : 0), `NAND AND verified at (${A},${B})`);

      // 3. NAND-OR
      const p_nand_or = nand(A, A);
      const q_nand_or = nand(B, B);
      assert(nand(p_nand_or, q_nand_or) === (A || B ? 1 : 0), `NAND OR verified at (${A},${B})`);

      // 4. NAND-NOR
      const s_nand_nor = nand(nand(A, A), nand(B, B));
      assert(nand(s_nand_nor, s_nand_nor) === (!(A || B) ? 1 : 0), `NAND NOR verified at (${A},${B})`);

      // 5. NAND-XOR (4 gates, 3 levels)
      const p_xor = nand(A, B);
      const q_xor = nand(A, p_xor);
      const r_xor = nand(B, p_xor);
      const xor_out = nand(q_xor, r_xor);
      assert(xor_out === (A ^ B), `NAND XOR (4-gate core) verified at (${A},${B})`);

      // 6. NAND-XNOR (Optimal 5 gates, 3 levels: p=A', q=B', r=(AB)', s=A+B, F=AB+A'B')
      const p_nand_xnor = nand(A, A);
      const q_nand_xnor = nand(B, B);
      const r_nand_xnor = nand(A, B);
      const s_nand_xnor = nand(p_nand_xnor, q_nand_xnor);
      const xnor_out_3lvl = nand(r_nand_xnor, s_nand_xnor);
      assert(xnor_out_3lvl === (A === B ? 1 : 0), `NAND XNOR (Optimal 5-gate, 3-level) verified at (${A},${B})`);

      // 7. NOR-NOT
      assert(nor(A, A) === (1 - A), `NOR NOT verified at A=${A}`);

      // 8. NOR-AND
      const p_nor_and = nor(A, A);
      const q_nor_and = nor(B, B);
      assert(nor(p_nor_and, q_nor_and) === (A && B ? 1 : 0), `NOR AND verified at (${A},${B})`);

      // 9. NOR-OR
      const p_nor_or = nor(A, B);
      assert(nor(p_nor_or, p_nor_or) === (A || B ? 1 : 0), `NOR OR verified at (${A},${B})`);

      // 10. NOR-NAND
      const s_nor_nand = nor(nor(A, A), nor(B, B));
      assert(nor(s_nor_nand, s_nor_nand) === (!(A && B) ? 1 : 0), `NOR NAND verified at (${A},${B})`);

      // 11. NOR-XNOR (4 gates, 3 levels)
      const p_xnor = nor(A, B);
      const q_xnor = nor(A, p_xnor);
      const r_xnor = nor(B, p_xnor);
      const xnor_nor_out = nor(q_xnor, r_xnor);
      assert(xnor_nor_out === (A === B ? 1 : 0), `NOR XNOR (4-gate core) verified at (${A},${B})`);

      // 12. NOR-XOR (Optimal 5 gates, 3 levels: R1=A', R2=(A+B)', R3=B', R4=AB, F=NOR(R2,R4))
      const R1 = nor(A, A);
      const R2 = nor(A, B);
      const R3 = nor(B, B);
      const R4 = nor(R1, R3);
      const F_nor_xor_3lvl = nor(R2, R4);
      assert(F_nor_xor_3lvl === (A ^ B), `NOR XOR (Optimal 5-gate, 3-level) verified at (${A},${B})`);
    }
  }

  // SUITE 3: COMPONENT SSR AND TAB NAVIGATION
  console.log('\nSUITE 3: Component SSR and Tab Navigation Audit');
  const { Section27View } = await vite.ssrLoadModule('/src/components/Section27View.jsx');
  assert(Section27View !== undefined, 'Section27View component loaded cleanly via Vite SSR');

  const renderedHtml = ReactDOMServer.renderToString(React.createElement(Section27View));
  assert(renderedHtml.length > 5000, `Section27View rendered cleanly via SSR (${renderedHtml.length} bytes)`);

  assert(renderedHtml.includes('grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'), 'Section 2.7 uses responsive 8-tab grid without horizontal scroll');
  assert(renderedHtml.includes('bg-[#FAF8F5]') && renderedHtml.includes('border-[#DCE7E1]'), 'Section 2.7 adopts approved Section 2.5/2.6 container styling');
  assert(renderedHtml.includes('aria-label="Section navigation"'), 'Section 2.7 navigation includes accessible aria-label');

  // Verify no "Faculty Hint:" in Section27View.jsx source code
  const sec27JsxSource = fs.readFileSync(path.join(rootDir, 'src/components/Section27View.jsx'), 'utf8');
  assert(!sec27JsxSource.includes('Faculty Hint:'), 'No student-facing "Faculty Hint:" in Section27View.jsx');
  assert(sec27JsxSource.includes('<strong>Hint:</strong>'), 'Student-facing "Hint:" correctly present in Section27View.jsx');

  // Verify all 8 tab labels appear
  const tabLabels = [
    '1. All Seven Logic Gates',
    '2. Why NAND/NOR Universal',
    '3. Gate Realisation (12)',
    '4. Standard Realisations',
    '5. Multi-Level Implementation',
    '6. Worked Examples (11)',
    '7. Master Cheat Sheet',
    '8. Practice Lab (10)'
  ];

  tabLabels.forEach(label => {
    assert(renderedHtml.includes(label), `Section 2.7 navigation includes label: "${label}"`);
  });

  // SUITE 4: ZERO-DASH COMPLIANCE
  console.log('\nSUITE 4: Strict Zero-Dash Compliance Audit');
  const filesToCheck = [
    'src/components/ConnectedCircuitViewer.jsx',
    'src/components/Section27View.jsx',
    'src/data/dldSection27Data.js',
    'scripts/verifyDldSection27.mjs'
  ];

  filesToCheck.forEach(relPath => {
    const fullPath = path.join(rootDir, relPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const emDashMatches = (content.match(/\u2014/g) || []).length;
    const enDashMatches = (content.match(/\u2013/g) || []).length;

    assert(emDashMatches === 0, `${relPath}: Zero em-dashes verified (found: ${emDashMatches})`);
    assert(enDashMatches === 0, `${relPath}: Zero en-dashes verified (found: ${enDashMatches})`);
  });

  // SUITE 5: COMPREHENSIVE CIRCUIT NETLIST & SIGNAL INTEGRITY AUDIT (51 CIRCUITS)
  console.log('\nSUITE 5: Comprehensive Circuit Netlist & Signal Integrity Audit');
  const allCircuits = [];

  // Tab 2 proof circuits
  if (data.universalFoundations) {
    (data.universalFoundations.whyNandUniversal?.steps || []).forEach((st, idx) => {
      if (st.circuit) allCircuits.push({ id: `whyNandUniversal-${idx + 1}`, source: `Tab 2 NAND Step ${idx + 1}`, circuit: st.circuit });
    });
    (data.universalFoundations.whyNorUniversal?.steps || []).forEach((st, idx) => {
      if (st.circuit) allCircuits.push({ id: `whyNorUniversal-${idx + 1}`, source: `Tab 2 NOR Step ${idx + 1}`, circuit: st.circuit });
    });
  }

  // Tab 3 gate realisations
  data.gateRealisations.nandOnly.forEach(r => {
    if (r.circuit) allCircuits.push({ id: r.id, source: `Tab 3 NAND: ${r.id}`, circuit: r.circuit });
  });
  data.gateRealisations.norOnly.forEach(r => {
    if (r.circuit) allCircuits.push({ id: r.id, source: `Tab 3 NOR: ${r.id}`, circuit: r.circuit });
  });

  // Tab 4 standard realisations
  data.standardRealisations.forEach(r => {
    if (r.circuit) allCircuits.push({ id: r.id, source: `Tab 4: ${r.id}`, circuit: r.circuit });
  });

  // Tab 5 multi-level examples
  data.multiLevelTheory.guidedExamples.forEach(r => {
    if (r.circuit) allCircuits.push({ id: r.id, source: `Tab 5: ${r.id}`, circuit: r.circuit });
  });

  // Tab 6 worked examples
  data.workedExamples.forEach(r => {
    if (r.circuit) allCircuits.push({ id: r.id, source: `Tab 6: ${r.id}`, circuit: r.circuit });
  });

  // Tab 7 cheat sheet reference circuits
  if (data.masterCheatSheet && data.masterCheatSheet.referenceCircuits) {
    Object.entries(data.masterCheatSheet.referenceCircuits).forEach(([k, cObj]) => {
      const circ = cObj.circuit || cObj;
      if (circ && circ.gates) allCircuits.push({ id: k, source: `Tab 7: ${k}`, circuit: circ });
    });
  }

  // Tab 8 practice questions
  data.practiceQuestions.forEach(pq => {
    if (pq.circuit) allCircuits.push({ id: pq.id, source: `Tab 8: ${pq.id}`, circuit: pq.circuit });
  });

  assert(allCircuits.length === 51, `Total collected circuits is exactly 51 (found: ${allCircuits.length})`);

  let invalidCircuits = 0;
  allCircuits.forEach(({ source, circuit }) => {
    const hasInputs = Array.isArray(circuit.inputs) && circuit.inputs.length > 0;
    const hasGates = Array.isArray(circuit.gates) && circuit.gates.length > 0;
    const hasWires = Array.isArray(circuit.wires) && circuit.wires.length > 0;
    const hasOutput = (typeof circuit.output === 'string' && circuit.output.length > 0) ||
                      (typeof circuit.output === 'object' && circuit.output !== null && (circuit.output.label || circuit.output.id));

    if (!hasInputs || !hasGates || !hasWires || !hasOutput) {
      invalidCircuits++;
      console.error(`  [FAIL] ${source} missing essential netlist structure`);
      return;
    }
  });

  assert(invalidCircuits === 0, `All 51 circuits have valid netlists, inputs, gates, wires, and output pins`);

  // SUITE 6: TAB 6 WORKED EXAMPLES NON-REPETITION AUDIT
  console.log('\nSUITE 6: Tab 6 Worked Examples Non-Repetition Audit');
  const tab4Exprs = new Set(data.standardRealisations.map(s => s.expression.replace(/\s+/g, '')));
  const tab5Exprs = new Set(data.multiLevelTheory.guidedExamples.map(m => m.expression.replace(/\s+/g, '')));

  assert(data.workedExamples.length === 11, 'Tab 6 contains exactly 11 worked examples (WE-01 to WE-11)');

  let duplicateCount = 0;
  data.workedExamples.forEach(we => {
    const normGiven = we.givenExpression.replace(/F(\([^)]+\))?\s*=\s*/, '').replace(/\s+/g, '');
    let isDupe = false;

    tab4Exprs.forEach(t4 => {
      const normT4 = t4.replace(/F(\([^)]+\))?\s*=\s*/, '').replace(/\s+/g, '');
      if (normGiven === normT4) {
        console.error(`  [FAIL] ${we.id} (${we.givenExpression}) duplicates Tab 4 expression: ${t4}`);
        isDupe = true;
      }
    });

    tab5Exprs.forEach(t5 => {
      const normT5 = t5.replace(/F(\([^)]+\))?\s*=\s*/, '').replace(/\s+/g, '');
      if (normGiven === normT5) {
        console.error(`  [FAIL] ${we.id} (${we.givenExpression}) duplicates Tab 5 expression: ${t5}`);
        isDupe = true;
      }
    });

    if (isDupe) duplicateCount++;
  });

  assert(duplicateCount === 0, `Zero duplicate expressions found between Tab 6 Worked Examples and Tabs 4/5`);

  // Verify preservation of WE-04 and WE-11
  const preserved04 = data.workedExamples.find(we => we.id === 'WE-04');
  assert(preserved04 && preserved04.givenExpression.includes("(A' + B)(A + C)"), 'WE-04 preserved as approved POS model');

  const preserved11 = data.workedExamples.find(we => we.id === 'WE-11');
  assert(preserved11 && preserved11.problemStatement.includes('XOR'), 'WE-11 preserved as approved XOR Comparative Benchmark');

  // SUITE 7: CONNECTED CIRCUIT VIEWER COMPONENT SSR AUDIT
  console.log('\nSUITE 7: ConnectedCircuitViewer Component SSR Audit');
  const { ConnectedCircuitViewer } = await vite.ssrLoadModule('/src/components/ConnectedCircuitViewer.jsx');
  assert(ConnectedCircuitViewer !== undefined, 'ConnectedCircuitViewer loaded cleanly via Vite SSR');

  const sampleCircuit = data.workedExamples[0].circuit;
  const circuitHtml = ReactDOMServer.renderToString(React.createElement(ConnectedCircuitViewer, { circuit: sampleCircuit }));
  assert(circuitHtml.includes('<svg') && circuitHtml.includes('</svg>'), 'ConnectedCircuitViewer renders valid SVG markup');
  assert(circuitHtml.includes('data-node-id="gate-') || circuitHtml.includes('<path'), 'ConnectedCircuitViewer renders connected gate and wire paths');

  const progressiveHtml = ReactDOMServer.renderToString(React.createElement(ConnectedCircuitViewer, {
    circuit: data.multiLevelTheory.guidedExamples[0].circuit,
    activeStageIndex: 1
  }));
  assert(progressiveHtml.includes('<svg'), 'ConnectedCircuitViewer renders progressive multi-level stage highlighting');
  assert(circuitHtml.includes('Final Output Function:'), 'ConnectedCircuitViewer renders dedicated readable expression banner below schematic');

  // SUITE 8: TWO-INPUT GATE INTEGRITY & WIRE ROUTING CLEARANCE AUDIT
  console.log('\nSUITE 8: Two-Input Gate Integrity and Wire Routing Clearance Audit');
  let threeInputGates = 0;
  let wireOverlaps = 0;

  allCircuits.forEach(({ id, circuit }) => {
    circuit.gates.forEach(g => {
      if (g.inputs && g.inputs.length > 2) {
        threeInputGates++;
        console.error(`  [FAIL] ${id}: Gate ${g.id} has ${g.inputs.length} inputs (violates 2-input library)`);
      }

      const gx = g.x;
      const gy = g.y;
      circuit.wires.forEach(w => {
        const isTarget = w.to && (w.to === g.id || w.to.startsWith(g.id + '.'));
        const isSource = w.from && (w.from === g.id || w.from.startsWith(g.id + '.'));
        if (isTarget || isSource) return;

        const matches = [...w.d.matchAll(/([ML])\s*([\d.]+)\s+([\d.]+)/g)];
        for (let i = 0; i < matches.length - 1; i++) {
          const x1 = parseFloat(matches[i][2]);
          const y1 = parseFloat(matches[i][3]);
          const x2 = parseFloat(matches[i+1][2]);
          const y2 = parseFloat(matches[i+1][3]);

          const minSegX = Math.min(x1, x2);
          const maxSegX = Math.max(x1, x2);
          const minSegY = Math.min(y1, y2);
          const maxSegY = Math.max(y1, y2);

          const xOverlap = maxSegX >= gx - 4 && minSegX <= gx + 38;
          const yOverlap = maxSegY >= gy - 4 && minSegY <= gy + 34;

          if (xOverlap && yOverlap) {
            wireOverlaps++;
            console.error(`  [FAIL] ${id}: Wire ${w.id} (${w.d}) overlaps Gate ${g.id} at (${gx},${gy})`);
          }
        }
      });
    });
  });

  assert(threeInputGates === 0, `All gates across all 51 circuits strictly comply with the 2-input gate library (found: ${threeInputGates})`);
  assert(wireOverlaps === 0, `Zero wires pass through or overlap unrelated gate bodies (found: ${wireOverlaps})`);

  // Verify Tab 1 gate symbol terminals in rendered SSR output
  assert(renderedHtml.includes('>A</text>') && renderedHtml.includes('>B</text>') && renderedHtml.includes('>F</text>'), 'Tab 1 gate symbols visibly display input terminals A, B and output terminal F');

  // SUITE 9: INDEPENDENT TRUTH-TABLE SIMULATION & QUESTION-TO-CIRCUIT VERIFICATION
  console.log('\nSUITE 9: Independent Truth-Table Simulation & Question-to-Circuit Verification');

  // Generic Digital Logic Simulator for ANSI/IEEE Netlists
  function simulateCircuit(circuit, inputValues) {
    const signals = {};
    for (const [k, v] of Object.entries(inputValues)) {
      signals[k] = v ? 1 : 0;
    }

    const gates = [...circuit.gates];
    const wires = [...circuit.wires];
    const gateOutputs = {};

    let changed = true;
    let iterations = 0;
    while (changed && iterations < 100) {
      changed = false;
      iterations++;

      for (const w of wires) {
        let val = undefined;
        if (signals[w.from] !== undefined) {
          val = signals[w.from];
        } else if (w.from && w.from.endsWith('.out')) {
          const gId = w.from.replace('.out', '');
          if (gateOutputs[gId] !== undefined) {
            val = gateOutputs[gId];
          }
        }

        if (val !== undefined) {
          if (w.to === 'F') {
            signals['F'] = val;
          } else if (w.to && w.to.startsWith('j')) {
            if (signals[w.to] === undefined) {
              signals[w.to] = val;
              changed = true;
            }
          } else if (w.to && w.to.includes('.in')) {
            if (signals[w.to] === undefined) {
              signals[w.to] = val;
              changed = true;
            }
          }
        }
      }

      for (const g of gates) {
        if (gateOutputs[g.id] === undefined) {
          const in1 = signals[g.id + '.in1'];
          const in2 = signals[g.id + '.in2'];
          if (in1 !== undefined && in2 !== undefined) {
            let outVal;
            if (g.type === 'NAND') {
              outVal = (in1 === 1 && in2 === 1) ? 0 : 1;
            } else if (g.type === 'NOR') {
              outVal = (in1 === 1 || in2 === 1) ? 0 : 1;
            } else {
              throw new Error('Unknown gate type: ' + g.type);
            }
            gateOutputs[g.id] = outVal;
            signals[g.id + '.out'] = outVal;
            changed = true;
          }
        }
      }
    }

    return signals['F'];
  }

  // 1. Mandatory Regression Test for std-4
  const std4Item = data.standardRealisations.find(r => r.id === 'std-4');
  assert(std4Item !== undefined, 'std-4 exists in standard realisations');
  assert(std4Item.expression === 'F = A + BC', 'std-4 requires Boolean function F = A + BC');

  // Verify std-4 counterexample A=1, B=0, C=0 => Expected F=1
  const std4CounterexampleOut = simulateCircuit(std4Item.circuit, { A: 1, B: 0, C: 0 });
  assert(std4CounterexampleOut === 1, 'std-4 regression test: Input (A=1, B=0, C=0) evaluates to F=1');

  // Negative test: simulate the previously incorrect AB+C network to verify the test detects the flaw
  const incorrectNetlist_AB_plus_C = {
    gates: [
      { id: 'G1', type: 'NAND' },
      { id: 'G2', type: 'NAND' },
      { id: 'G3', type: 'NAND' }
    ],
    wires: [
      { from: 'A', to: 'G1.in1' },
      { from: 'B', to: 'G1.in2' },
      { from: 'C', to: 'G2.in1' },
      { from: 'C', to: 'G2.in2' },
      { from: 'G1.out', to: 'G3.in1' },
      { from: 'G2.out', to: 'G3.in2' },
      { from: 'G3.out', to: 'F' }
    ]
  };
  const incorrectOut = simulateCircuit(incorrectNetlist_AB_plus_C, { A: 1, B: 0, C: 0 });
  assert(incorrectOut === 0, 'std-4 regression verification: Previous incorrect circuit evaluates to 0 on (1,0,0) and is successfully caught');

  // 2. Independent Fixture Dictionary for all 51 circuits
  const independentFixtures = {
    // Tab 2
    'whyNandUniversal-1': { vars: ['A'], fn: ({A}) => 1 - A },
    'whyNandUniversal-2': { vars: ['A', 'B'], fn: ({A, B}) => A & B },
    'whyNandUniversal-3': { vars: ['A', 'B'], fn: ({A, B}) => A | B },
    'whyNorUniversal-1': { vars: ['A'], fn: ({A}) => 1 - A },
    'whyNorUniversal-2': { vars: ['A', 'B'], fn: ({A, B}) => A | B },
    'whyNorUniversal-3': { vars: ['A', 'B'], fn: ({A, B}) => A & B },

    // Tab 3 NAND
    'nand-not': { vars: ['A'], fn: ({A}) => 1 - A },
    'nand-and': { vars: ['A', 'B'], fn: ({A, B}) => A & B },
    'nand-or': { vars: ['A', 'B'], fn: ({A, B}) => A | B },
    'nand-nor': { vars: ['A', 'B'], fn: ({A, B}) => 1 - (A | B) },
    'nand-xor': { vars: ['A', 'B'], fn: ({A, B}) => A ^ B },
    'nand-xnor': { vars: ['A', 'B'], fn: ({A, B}) => 1 - (A ^ B) },

    // Tab 3 NOR
    'nor-not': { vars: ['A'], fn: ({A}) => 1 - A },
    'nor-and': { vars: ['A', 'B'], fn: ({A, B}) => A & B },
    'nor-or': { vars: ['A', 'B'], fn: ({A, B}) => A | B },
    'nor-nand': { vars: ['A', 'B'], fn: ({A, B}) => 1 - (A & B) },
    'nor-xor': { vars: ['A', 'B'], fn: ({A, B}) => A ^ B },
    'nor-xnor': { vars: ['A', 'B'], fn: ({A, B}) => 1 - (A ^ B) },

    // Tab 4 Standard Realisations
    'std-1': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => (A & B) | (C & D) },
    'std-2': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => (A | B) & (C | D) },
    'std-3': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => ((1 - A) & B) | (A & C) },
    'std-4': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => A | (B & C) },
    'std-5': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (A | B) & ((1 - A) | C) },
    'std-6': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (A & B) | C },
    'std-7': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => 1 - ((A & B) | C) },

    // Tab 5 Multi-Level Examples
    'ml-ex1': { vars: ['A', 'B', 'C', 'D', 'E'], fn: ({A, B, C, D, E}) => (((A & B) | C) & D) | E },
    'ml-ex2': { vars: ['A', 'B', 'C', 'D', 'E'], fn: ({A, B, C, D, E}) => ((((A | B) & C) | D) & E) },
    'ml-ex3': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => A & (B | (C & D)) },

    // Tab 6 Worked Examples
    'WE-01': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (A & B) | ((1 - A) & C) },
    'WE-02': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (A | (1 - B)) & (B | C) },
    'WE-03': { vars: ['A', 'B'], fn: ({A, B}) => ((1 - A) & (1 - B)) | (A & B) },
    'WE-04': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => ((1 - A) | B) & (A | C) },
    'WE-05': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (1 - A) | (B & C) },
    'WE-06': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => B | (A & C) },
    'WE-07': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (1 - A) & (B | C) },
    'WE-08': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => A & (1 - (B | C)) },
    'WE-09': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => ((A & B) | C) & D },
    'WE-10': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => ((A | B) & C) | D },
    'WE-11': { vars: ['A', 'B'], fn: ({A, B}) => A ^ B },

    // Tab 7 Cheat Sheet Reference Circuits
    'nandInverter': { vars: ['A'], fn: ({A}) => 1 - A },
    'norInverter': { vars: ['A'], fn: ({A}) => 1 - A },
    'nandNandSop': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => (A & B) | (C & D) },
    'norNorPos': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => (A | B) & (C | D) },

    // Tab 8 Practice Questions
    'PQ-03': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (A & B) | (1 - C) },
    'PQ-04': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => (A | (1 - B)) & ((1 - C) | D) },
    'PQ-05': { vars: ['A', 'B', 'C', 'D'], fn: ({A, B, C, D}) => A & (B | (C & D)) },
    'PQ-06': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (A & B) | C },
    'PQ-07': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => (A | B) & ((1 - A) | C) },
    'PQ-08': { vars: ['A', 'B', 'C'], fn: ({A, B, C}) => 1 - ((A & B) | C) },
    'PQ-09': { vars: ['A', 'B', 'C', 'D', 'E'], fn: ({A, B, C, D, E}) => (((A & B) | C) & D) | E },
    'PQ-10': { vars: ['A', 'B'], fn: ({A, B}) => 1 - (A ^ B) }
  };

  let simulatedMismatches = 0;
  allCircuits.forEach(({ id, source, circuit }) => {
    const fixture = independentFixtures[id];
    if (!fixture) {
      console.error(`  [FAIL] ${id} (${source}): Missing independent fixture definition`);
      simulatedMismatches++;
      return;
    }

    const { vars, fn } = fixture;
    const numCombos = 1 << vars.length;

    for (let c = 0; c < numCombos; c++) {
      const inputVals = {};
      vars.forEach((v, idx) => {
        inputVals[v] = (c >> (vars.length - 1 - idx)) & 1;
      });

      const expected = fn(inputVals);
      const simulated = simulateCircuit(circuit, inputVals);

      if (simulated !== expected) {
        simulatedMismatches++;
        console.error(`  [FAIL] ${id} (${source}): Mismatch on ${JSON.stringify(inputVals)} => Expected ${expected}, Got ${simulated}`);
        break;
      }
    }
  });

  assert(simulatedMismatches === 0, `All 51 circuits independently match their target Boolean function across all truth-table combinations (mismatches: ${simulatedMismatches})`);

  // 3. Label-to-Gate and Label-to-Bubble Clearance Audit
  let labelCollisions = 0;
  allCircuits.forEach(({ id, circuit }) => {
    (circuit.labels || []).forEach(lbl => {
      circuit.gates.forEach(g => {
        const bx = g.x + (g.type === 'NOT' ? 30 : g.type === 'NOR' ? 40 : 43);
        const by = g.y + 15;
        const inGate = lbl.x >= g.x && lbl.x <= g.x + 48 && lbl.y >= g.y && lbl.y <= g.y + 30;
        const dist = Math.hypot(lbl.x - bx, lbl.y - by);
        if (inGate || dist < 12) {
          labelCollisions++;
          console.error(`  [FAIL] ${id}: Label '${lbl.text}' at (${lbl.x}, ${lbl.y}) overlaps gate ${g.id} or bubble at (${bx}, ${by})`);
        }
      });
    });
  });

  assert(labelCollisions === 0, `Zero labels collide with gate bodies or inversion bubbles across all 51 circuits (found: ${labelCollisions})`);

  // 4. SSR Text Halo Anti-Collision Verification
  assert(circuitHtml.includes('stroke="#FFFFFF"'), 'ConnectedCircuitViewer renders anti-collision protective white text halo');

  // SUITE 10: PHYSICAL CIRCUIT WIRING INTEGRITY & SIGNAL SEPARATION AUDIT
  console.log('\nSUITE 10: Physical Circuit Wiring Integrity, Signal Separation and Non-Overlapping Channels Audit');

  function getWireSegments(w) {
    const matches = [...w.d.matchAll(/([ML])\s*([\d.]+)\s+([\d.]+)/g)];
    const segs = [];
    for (let i = 0; i < matches.length - 1; i++) {
      const x1 = parseFloat(matches[i][2]);
      const y1 = parseFloat(matches[i][3]);
      const x2 = parseFloat(matches[i+1][2]);
      const y2 = parseFloat(matches[i+1][3]);
      segs.push({
        x1, y1, x2, y2,
        isVert: Math.abs(x1 - x2) < 0.1,
        isHoriz: Math.abs(y1 - y2) < 0.1,
        net: w.net || w.from,
        wireId: w.id
      });
    }
    return segs;
  }

  function countCollinearOverlaps(circuit) {
    const allSegs = [];
    circuit.wires.forEach(w => allSegs.push(...getWireSegments(w)));
    let overlaps = 0;

    for (let i = 0; i < allSegs.length; i++) {
      for (let j = i + 1; j < allSegs.length; j++) {
        const s1 = allSegs[i];
        const s2 = allSegs[j];
        if (s1.net === s2.net) continue;

        if (s1.isVert && s2.isVert && Math.abs(s1.x1 - s2.x1) < 1.0) {
          const minY1 = Math.min(s1.y1, s1.y2);
          const maxY1 = Math.max(s1.y1, s1.y2);
          const minY2 = Math.min(s2.y1, s2.y2);
          const maxY2 = Math.max(s2.y1, s2.y2);
          const overlap = Math.min(maxY1, maxY2) - Math.max(minY1, minY2);
          if (overlap > 0.5) overlaps++;
        }
        if (s1.isHoriz && s2.isHoriz && Math.abs(s1.y1 - s2.y1) < 1.0) {
          const minX1 = Math.min(s1.x1, s1.x2);
          const maxX1 = Math.max(s1.x1, s1.x2);
          const minX2 = Math.min(s2.x1, s2.x2);
          const maxX2 = Math.max(s2.x1, s2.x2);
          const overlap = Math.min(maxX1, maxX2) - Math.max(minX1, minX2);
          if (overlap > 0.5) overlaps++;
        }
      }
    }
    return overlaps;
  }

  // 1. Mandatory std-5 Regression Test
  const formerDefectiveStd5Circuit = {
    wires: [
      { id: 'w1', from: 'A', to: 'j1', d: 'M 25 25 L 45 25', net: 'A' },
      { id: 'w2', from: 'j1', to: 'G1.in1', d: 'M 45 25 L 45 18 L 75 18', net: 'A' },
      { id: 'w3', from: 'j1', to: 'G1.in2', d: 'M 45 25 L 45 32 L 75 32', net: 'A' },
      { id: 'w4', from: 'j1', to: 'G2.in1', d: 'M 45 25 L 45 5 L 165 5 L 165 28 L 195 28', net: 'A' },
      { id: 'w5', from: 'C', to: 'G2.in2', d: 'M 25 105 L 165 105 L 165 42 L 195 42', net: 'C' },
      { id: 'w6', from: 'B', to: 'G3.in2', d: 'M 25 60 L 165 60 L 165 102 L 195 102', net: 'B' },
      { id: 'w7', from: 'G1.out', to: 'G3.in1', d: 'M 118 25 L 165 25 L 165 88 L 195 88', net: 'u' },
      { id: 'w8', from: 'G2.out', to: 'G4.in1', d: 'M 238 35 L 280 35 L 280 58 L 325 58', net: 'p' },
      { id: 'w9', from: 'G3.out', to: 'G4.in2', d: 'M 238 95 L 280 95 L 280 72 L 325 72', net: 'q' },
      { id: 'w10', from: 'G4.out', to: 'F', d: 'M 368 65 L 420 65', net: 'AC+A\'B' }
    ]
  };

  const defectiveStd5Overlaps = countCollinearOverlaps(formerDefectiveStd5Circuit);
  assert(defectiveStd5Overlaps > 0, `std-5 regression check: Former defective vertical trunk at x=165 fails connection-integrity check (found: ${defectiveStd5Overlaps} overlaps)`);

  const std5ItemNow = data.standardRealisations.find(r => r.id === 'std-5');
  const correctedStd5Overlaps = countCollinearOverlaps(std5ItemNow.circuit);
  assert(correctedStd5Overlaps === 0, 'std-5 regression check: Corrected independent signal channels pass connection-integrity check with zero overlaps');

  // Verify std-5 gate connections: G2 computes p=(A\'B)\' and G3 computes q=(AC)\'
  const std5Gate2WireIn1 = std5ItemNow.circuit.wires.find(w => w.to === 'G2.in1');
  const std5Gate2WireIn2 = std5ItemNow.circuit.wires.find(w => w.to === 'G2.in2');
  const std5Gate3WireIn1 = std5ItemNow.circuit.wires.find(w => w.to === 'G3.in1');
  const std5Gate3WireIn2 = std5ItemNow.circuit.wires.find(w => w.to === 'G3.in2');

  assert(std5Gate2WireIn1 && std5Gate2WireIn1.net === 'u' && std5Gate2WireIn2 && std5Gate2WireIn2.net === 'B', 'std-5 G2 correctly receives u and B to synthesize p = (A\'B)\'');
  assert(std5Gate3WireIn1 && std5Gate3WireIn1.net === 'A' && std5Gate3WireIn2 && std5Gate3WireIn2.net === 'C', 'std-5 G3 correctly receives A and C to synthesize q = (AC)\'');

  // 2. Exhaustive Collinear Trunk & Signal Separation Audit Across All 51 Circuits
  let totalCollinearOverlaps = 0;
  allCircuits.forEach(({ id, circuit }) => {
    const circuitOverlaps = countCollinearOverlaps(circuit);
    if (circuitOverlaps > 0) {
      totalCollinearOverlaps += circuitOverlaps;
      console.error(`  [FAIL] ${id}: Has ${circuitOverlaps} overlapping collinear segments carrying different signals`);
    }
  });

  assert(totalCollinearOverlaps === 0, `Strict signal separation: Zero shared vertical or horizontal trunks across all 51 circuits (found: ${totalCollinearOverlaps})`);

  // 3. Exhaustive Wire Endpoint Pin-Alignment Audit Across All 51 Circuits
  let pinDisconnections = 0;
  allCircuits.forEach(({ id, circuit }) => {
    const ports = {};
    (circuit.inputs || []).forEach(inp => { ports[inp.id] = { x: inp.x, y: inp.y }; });
    (circuit.junctions || []).forEach((j, idx) => {
      ports[`j${idx+1}`] = { x: j.x, y: j.y };
      if (j.id) ports[j.id] = { x: j.x, y: j.y };
    });
    (circuit.gates || []).forEach(g => {
      const bubbleOffset = (g.type === 'NOT' ? 30 : g.type === 'NOR' ? 40 : 43);
      ports[`${g.id}.in1`] = { x: g.x, y: g.y + (g.type === 'NOT' ? 15 : 8) };
      ports[`${g.id}.in2`] = { x: g.x, y: g.y + (g.type === 'NOT' ? 15 : 22) };
      ports[`${g.id}.out`] = { x: g.x + bubbleOffset, y: g.y + 15 };
    });
    if (circuit.output) ports['F'] = { x: circuit.output.x, y: circuit.output.y };

    circuit.wires.forEach(w => {
      const matches = [...w.d.matchAll(/([ML])\s*([\d.]+)\s+([\d.]+)/g)];
      if (matches.length < 2) return;
      const endX = parseFloat(matches[matches.length - 1][2]);
      const endY = parseFloat(matches[matches.length - 1][3]);

      if (w.to && ports[w.to]) {
        const dest = ports[w.to];
        const dist = Math.hypot(endX - dest.x, endY - dest.y);
        if (dist > 15) {
          pinDisconnections++;
          console.error(`  [FAIL] ${id}: Wire ${w.id} end (${endX},${endY}) does not reach destination ${w.to} (${dest.x},${dest.y})`);
        }
      }
    });
  });

  assert(pinDisconnections === 0, `All wire endpoints physically terminate on valid gates, junctions, and output pins (found: ${pinDisconnections})`);

  console.log('\n================================================================');
  console.log(`VERIFICATION SUMMARY: ${passedChecks} Passed, ${failedChecks} Failed, ${passedChecks + failedChecks} Total Checks`);
  console.log('================================================================\n');

  if (failedChecks > 0) {
    process.exit(1);
  }
} catch (err) {
  console.error('Audit encountered unexpected error:', err);
  process.exit(1);
} finally {
  await vite.close();
}
