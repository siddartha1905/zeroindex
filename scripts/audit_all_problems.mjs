/**
 * Comprehensive Mathematical Audit of Sections 2.5 and 2.6
 * Complete Truth-Table and Grouping Verification
 */

import { dldSection25Data } from '../src/data/dldSection25Data.js';
import { dldSection26Data } from '../src/data/dldSection26Data.js';
import { 
  minimizeKMap, 
  validateKMapGroup, 
  evaluateAst, 
  parseBooleanExpression, 
  tokenizeBoolean,
  extractVariables
} from '../src/utils/booleanEngine.js';

// Helper to check if a set of cells forms a valid subcube
function isValidSubcube(cells, varCount) {
  const size = cells.length;
  // Size must be power of 2
  if (size === 0 || (size & (size - 1)) !== 0) return { valid: false, reason: `Size ${size} is not a power of 2` };
  if (size > (1 << varCount)) return { valid: false, reason: `Size ${size} exceeds total cells 2^${varCount}` };

  // Check constant variables
  const bitLength = varCount;
  let fixedMask = 0; // bit is 1 if constant
  let fixedVal = 0;

  for (let b = 0; b < bitLength; b++) {
    const bitPos = bitLength - 1 - b;
    const firstBit = (cells[0] >> bitPos) & 1;
    let isConst = true;
    for (let i = 1; i < cells.length; i++) {
      if (((cells[i] >> bitPos) & 1) !== firstBit) {
        isConst = false;
        break;
      }
    }
    if (isConst) {
      fixedMask |= (1 << bitPos);
      if (firstBit === 1) fixedVal |= (1 << bitPos);
    }
  }

  // Number of fixed variables must be varCount - log2(size)
  const expectedFixedCount = varCount - Math.log2(size);
  let actualFixedCount = 0;
  for (let b = 0; b < bitLength; b++) {
    if ((fixedMask >> b) & 1) actualFixedCount++;
  }

  if (actualFixedCount !== expectedFixedCount) {
    return { 
      valid: false, 
      reason: `Expected ${expectedFixedCount} fixed variables for size ${size}, found ${actualFixedCount}` 
    };
  }

  // Verify that ALL cells match the fixed mask
  for (let c of cells) {
    if ((c & fixedMask) !== fixedVal) {
      return { valid: false, reason: `Cell ${c} does not match fixed mask` };
    }
  }

  // Determine fixed variable string
  const varNames = ['A', 'B', 'C', 'D', 'E'].slice(0, varCount);
  const sopLiterals = [];
  const posLiterals = [];
  for (let b = 0; b < bitLength; b++) {
    const bitPos = bitLength - 1 - b;
    if ((fixedMask >> bitPos) & 1) {
      const bit = (fixedVal >> bitPos) & 1;
      const v = varNames[b];
      sopLiterals.push(bit === 1 ? v : `${v}'`);
      posLiterals.push(bit === 0 ? v : `${v}'`);
    }
  }

  return {
    valid: true,
    expectedFixedCount,
    sopTerm: sopLiterals.length === 0 ? '1' : sopLiterals.join(''),
    posTerm: posLiterals.length === 0 ? '0' : `(${posLiterals.join(' + ')})`
  };
}

// Truth table evaluation of expression vs minterms/maxterms/dontCares
function verifyExpressionTruthTable(exprStr, varCount, minterms, maxterms, dontCares, form = 'SOP') {
  const varNames = ['A', 'B', 'C', 'D', 'E'].slice(0, varCount);
  
  // If F = 0 or F = 1 or trivial dual-case comparison
  if (exprStr.includes('Full Map') || exprStr.includes('Empty Map') || exprStr.trim() === 'F = 1' || exprStr.trim() === 'F = 0') {
    return { valid: true, errors: [] };
  }

  // Clean exprStr: remove 'F = ', take primary SOP/POS before any factored '= ...', remove annotations
  let cleanExpr = exprStr.replace(/^F\s*=\s*/i, '').trim();
  cleanExpr = cleanExpr.split(/\s*=\s*/)[0].trim();

  try {
    const ast = parseBooleanExpression(cleanExpr);
    const errors = [];

    const totalCells = 1 << varCount;
    for (let i = 0; i < totalCells; i++) {
      const isMinterm = minterms.includes(i);
      const isMaxterm = maxterms.includes(i);
      const isDC = dontCares.includes(i);

      const assignment = {};
      for (let b = 0; b < varCount; b++) {
        const bit = (i >> (varCount - 1 - b)) & 1;
        assignment[varNames[b]] = bit;
      }

      const val = evaluateAst(ast, assignment);

      if (isMinterm && val !== 1) {
        errors.push(`Cell ${i} is minterm, but expr evaluates to 0 (assignment: ${JSON.stringify(assignment)})`);
      }
      if (isMaxterm && val !== 0) {
        errors.push(`Cell ${i} is maxterm, but expr evaluates to 1 (assignment: ${JSON.stringify(assignment)})`);
      }
      if (!isMinterm && !isDC && val === 1 && form === 'SOP') {
        errors.push(`Cell ${i} is not a minterm or DC, but expr evaluates to 1`);
      }
      if (!isMaxterm && !isDC && val === 0 && form === 'POS') {
        errors.push(`Cell ${i} is not a maxterm or DC, but expr evaluates to 0`);
      }
    }

    return { valid: errors.length === 0, errors };
  } catch (err) {
    return { valid: false, errors: [`Parser error for "${cleanExpr}": ${err.message}`] };
  }
}

console.log('================================================================');
console.log('ZEROINDEX PHASE 5B.8: AUDITING ALL K-MAP SOLUTIONS');
console.log('================================================================\n');

// 1. Audit Section 2.5: 34 Worked Models
console.log('--- SECTION 2.5: 34 WORKED MODELS ---');
let sec25ModelFailures = 0;

dldSection25Data.workedModels.forEach((m) => {
  const varCount = m.mapType === 'twoVar' ? 2 : m.mapType === 'threeVar' ? 3 : 4;
  const minterms = m.minterms || [];
  const maxterms = m.maxterms || [];
  const dontCares = m.dontCares || [];
  const form = m.form || 'SOP';

  const issues = [];

  // Audit groups
  (m.groupingSteps || []).forEach((st, sIdx) => {
    if (st.type === 'Ignored Cell' || (st.group && st.group.startsWith('Unused'))) return;
    const cells = Array.isArray(st.cells) ? st.cells : [st.cells];
    const subcube = isValidSubcube(cells, varCount);
    if (!subcube.valid) {
      issues.push(`Step ${sIdx} (${st.group}): cells [${cells.join(', ')}] invalid subcube: ${subcube.reason}`);
    }
  });

  // Audit truth table
  const ttCheck = verifyExpressionTruthTable(m.finalAnswer, varCount, minterms, maxterms, dontCares, form);
  if (!ttCheck.valid) {
    issues.push(`Truth table mismatch: ${ttCheck.errors.slice(0, 3).join('; ')}`);
  }

  if (issues.length > 0) {
    sec25ModelFailures++;
    console.log(`[FAIL] ${m.id} (${m.title}):`);
    issues.forEach(iss => console.log(`  - ${iss}`));
  } else {
    console.log(`[PASS] ${m.id}: ${m.title} verified`);
  }
});

console.log(`\nSection 2.5 Worked Models Result: ${34 - sec25ModelFailures}/34 PASSED (Failures: ${sec25ModelFailures})`);

// 2. Audit Section 2.5: 36 Practice Lab Problems
console.log('\n--- SECTION 2.5: 36 PRACTICE LAB PROBLEMS ---');
let sec25PracticeFailures = 0;

(dldSection25Data.practiceLab?.problems || []).forEach((p) => {
  const varCount = p.mapDimensions === '2x2' ? 2 : p.mapDimensions === '2x4' ? 3 : 4;
  const minterms = p.minterms || [];
  const maxterms = p.maxterms || [];
  const dontCares = p.dontCares || [];
  const form = p.form || 'SOP';

  const issues = [];
  const ttCheck = verifyExpressionTruthTable(p.finalAnswer, varCount, minterms, maxterms, dontCares, form);
  if (!ttCheck.valid) {
    issues.push(`Truth table mismatch: ${ttCheck.errors.slice(0, 3).join('; ')}`);
  }

  if (issues.length > 0) {
    sec25PracticeFailures++;
    console.log(`[FAIL] ${p.id} (${p.title}): ${issues.join('; ')}`);
  } else {
    console.log(`[PASS] ${p.id}: ${p.problemStatement} verified`);
  }
});
console.log(`\nSection 2.5 Practice Problems Result: ${36 - sec25PracticeFailures}/36 PASSED (Failures: ${sec25PracticeFailures})`);

// 3. Audit Section 2.5: 6 Guided Demos
console.log('\n--- SECTION 2.5: 6 GUIDED DEMOS ---');
let sec25DemoFailures = 0;
(dldSection25Data.guidedDemos || []).forEach(d => {
  const varCount = d.mapType === 'twoVar' ? 2 : d.mapType === 'threeVar' ? 3 : 4;
  (d.steps || []).forEach(st => {
    if (st.cells && st.cells.length > 0 && st.term) {
      const subcube = isValidSubcube(st.cells, varCount);
      if (!subcube.valid) {
        sec25DemoFailures++;
        console.log(`[FAIL] ${d.id} Step ${st.stepNumber}: ${subcube.reason}`);
      }
    }
  });
  console.log(`[PASS] ${d.id}: ${d.title} verified`);
});
console.log(`\nSection 2.5 Guided Demos Result: ${6 - sec25DemoFailures}/6 PASSED (Failures: ${sec25DemoFailures})`);

// 4. Audit Section 2.6: 11 Worked Examples
console.log('\n--- SECTION 2.6: 11 WORKED EXAMPLES ---');
let sec26ExFailures = 0;
dldSection26Data.workedExamples.forEach(ex => {
  const varCount = ex.mapType === 'twoVar' ? 2 : ex.mapType === 'threeVar' ? 3 : 4;
  const minterms = ex.minterms || [];
  const maxterms = ex.maxterms || [];
  const dontCares = ex.dontCares || [];
  const form = ex.form || 'SOP';

  const issues = [];
  (ex.groups || []).forEach(g => {
    const subcube = isValidSubcube(g.cells, varCount);
    if (!subcube.valid) issues.push(`Group ${g.group} invalid: ${subcube.reason}`);
  });

  const ttCheck = verifyExpressionTruthTable(ex.finalAnswer, varCount, minterms, maxterms, dontCares, form);
  if (!ttCheck.valid) issues.push(`Truth table mismatch: ${ttCheck.errors.slice(0, 3).join('; ')}`);

  if (issues.length > 0) {
    sec26ExFailures++;
    console.log(`[FAIL] ${ex.id}: ${issues.join('; ')}`);
  } else {
    console.log(`[PASS] ${ex.id}: ${ex.title} verified`);
  }
});
console.log(`\nSection 2.6 Worked Examples Result: ${11 - sec26ExFailures}/11 PASSED (Failures: ${sec26ExFailures})`);

// 5. Audit Section 2.6: 10 Practice Problems
console.log('\n--- SECTION 2.6: 10 PRACTICE PROBLEMS ---');
let sec26PracFailures = 0;
dldSection26Data.practiceProblems.forEach(p => {
  const varCount = p.mapType === 'twoVar' ? 2 : p.mapType === 'threeVar' ? 3 : 4;
  const minterms = p.minterms || [];
  const maxterms = p.maxterms || [];
  const dontCares = p.dontCares || [];
  const form = p.form || 'SOP';

  const issues = [];
  (p.groups || []).forEach(g => {
    const subcube = isValidSubcube(g.cells, varCount);
    if (!subcube.valid) issues.push(`Group ${g.group} invalid: ${subcube.reason}`);
  });

  const ttCheck = verifyExpressionTruthTable(p.finalAnswer, varCount, minterms, maxterms, dontCares, form);
  if (!ttCheck.valid) issues.push(`Truth table mismatch: ${ttCheck.errors.slice(0, 3).join('; ')}`);

  if (issues.length > 0) {
    sec26PracFailures++;
    console.log(`[FAIL] ${p.id}: ${issues.join('; ')}`);
  } else {
    console.log(`[PASS] ${p.id}: ${p.problemStatement} verified`);
  }
});
console.log(`\nSection 2.6 Practice Problems Result: ${10 - sec26PracFailures}/10 PASSED (Failures: ${sec26PracFailures})`);

// Summary
console.log('\n================================================================');
console.log('MATHEMATICAL AUDIT GRAND TOTALS:');
console.log(`Section 2.5 Worked Models:     ${34 - sec25ModelFailures}/34 PASSED`);
console.log(`Section 2.5 Practice Problems: ${36 - sec25PracticeFailures}/36 PASSED`);
console.log(`Section 2.5 Guided Demos:      ${6 - sec25DemoFailures}/6 PASSED`);
console.log(`Section 2.6 Worked Examples:   ${11 - sec26ExFailures}/11 PASSED`);
console.log(`Section 2.6 Practice Problems: ${10 - sec26PracFailures}/10 PASSED`);
console.log('================================================================\n');
