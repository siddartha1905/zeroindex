import { 
  parseBooleanExpression, 
  evaluateAst, 
  extractVariables, 
  generateTruthTable, 
  getMintermTerm, 
  getMaxtermTerm, 
  formatCanonicalSOP, 
  formatCanonicalPOS, 
  getKMapGridDescriptor,
  minimizeKMap, 
  areExpressionsEquivalent, 
  traceAlgebraicSimplification, 
  validateKMapGroup, 
  compareExpressions, 
  expandSOPTerm, 
  expandPOSTerm, 
  convertCanonicalSOPtoPOS, 
  convertCanonicalPOStoSOP,
  KMAP_GROUP_PALETTE,
  getGroupCellGeometry
} from '../src/utils/booleanEngine.js';
import fs from 'fs';
import path from 'path';

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

console.log('=================================================================');
console.log('ZEROINDEX UNIT II INTERACTIVE SOLVERS VERIFICATION SUITE');
console.log('=================================================================\n');

// ----------------------------------------------------------------------------
// 1. BOOLEAN PARSER & AST EVALUATION TESTS
// ----------------------------------------------------------------------------
console.log('--- 1. Testing Boolean Parser & AST Evaluation ---');

try {
  // Implicit AND
  const ast1 = parseBooleanExpression('AB');
  assert(ast1.type === 'AND', 'Parses implicit juxtaposition AB as AND');
  assert(evaluateAst(ast1, { A: 1, B: 1 }) === 1, 'AB evaluates to 1 when A=1, B=1');
  assert(evaluateAst(ast1, { A: 1, B: 0 }) === 0, 'AB evaluates to 0 when A=1, B=0');

  // Explicit operators and precedence
  const ast2 = parseBooleanExpression("A + B · C'");
  assert(evaluateAst(ast2, { A: 0, B: 1, C: 0 }) === 1, "A + B · C' evaluates to 1 when A=0, B=1, C=0");
  assert(evaluateAst(ast2, { A: 0, B: 1, C: 1 }) === 0, "A + B · C' evaluates to 0 when A=0, B=1, C=1");

  // Parentheses precedence
  const ast3 = parseBooleanExpression('(A + B)C');
  assert(evaluateAst(ast3, { A: 1, B: 0, C: 0 }) === 0, '(A + B)C evaluates to 0 when C=0');
  assert(evaluateAst(ast3, { A: 1, B: 0, C: 1 }) === 1, '(A + B)C evaluates to 1 when A=1, C=1');

  // Constants 0 and 1
  const ast4 = parseBooleanExpression('A + 0');
  assert(evaluateAst(ast4, { A: 1 }) === 1, 'A + 0 evaluates to 1 when A=1');
  assert(evaluateAst(ast4, { A: 0 }) === 0, 'A + 0 evaluates to 0 when A=0');

  const ast5 = parseBooleanExpression('A · 1');
  assert(evaluateAst(ast5, { A: 1 }) === 1, 'A · 1 evaluates to 1 when A=1');
  assert(evaluateAst(ast5, { A: 0 }) === 0, 'A · 1 evaluates to 0 when A=0');

  // Prefix NOT
  const ast6 = parseBooleanExpression('!A + ~B');
  assert(evaluateAst(ast6, { A: 0, B: 1 }) === 1, '!A + ~B evaluates to 1 when A=0');
  assert(evaluateAst(ast6, { A: 1, B: 1 }) === 0, '!A + ~B evaluates to 0 when A=1, B=1');

  // Invalid syntax rejection
  let caughtError = false;
  try {
    parseBooleanExpression('A + + B');
  } catch {
    caughtError = true;
  }
  assert(caughtError, 'Rejects invalid consecutive operators "A + + B"');

  let caughtParenError = false;
  try {
    parseBooleanExpression('(A + B');
  } catch {
    caughtParenError = true;
  }
  assert(caughtParenError, 'Rejects unclosed parentheses "(A + B"');
} catch (err) {
  assert(false, `Parser tests threw unexpected exception: ${err.message}`);
}

// ----------------------------------------------------------------------------
// 2. BOOLEAN SIMPLIFIER & STEP-BY-STEP REDUCTIONS (Solver 1)
// ----------------------------------------------------------------------------
console.log('\n--- 2. Testing Boolean Simplifier (Solver 1) ---');

// Example 1: AB + AB' = A
const resComb = traceAlgebraicSimplification("AB + AB'");
assert(resComb.success, "AB + AB' succeeds");
assert(resComb.simplified === 'A', "AB + AB' simplifies to A");
assert(resComb.steps.length >= 3, "AB + AB' provides detailed classroom steps");
assert(areExpressionsEquivalent("AB + AB'", resComb.simplified, ['A', 'B']), "AB + AB' is strictly equivalent to A");

// Example 2: A + A'B = A + B
const resRed = traceAlgebraicSimplification("A + A'B");
assert(resRed.success, "A + A'B succeeds");
assert(resRed.simplified === 'A + B', "A + A'B simplifies to A + B");
assert(resRed.steps.some(s => s.law.includes('Second Distributive') || s.law.includes('Redundancy')), "A + A'B cites Distributive/Redundancy law");
assert(areExpressionsEquivalent("A + A'B", resRed.simplified, ['A', 'B']), "A + A'B is strictly equivalent to A + B");

// Example 3: (A+B)(A+C) = A + BC
const resDist2 = traceAlgebraicSimplification('(A+B)(A+C)');
assert(resDist2.success, '(A+B)(A+C) succeeds');
assert(resDist2.simplified === 'A + BC', '(A+B)(A+C) simplifies to A + BC');
assert(areExpressionsEquivalent('(A+B)(A+C)', resDist2.simplified, ['A', 'B', 'C']), '(A+B)(A+C) is strictly equivalent to A + BC');

// Example 4: AB + A'C + BC = AB + A'C (Consensus)
const resConsensus = traceAlgebraicSimplification("AB + A'C + BC");
assert(resConsensus.success, "AB + A'C + BC succeeds");
assert(resConsensus.simplified === "AB + A'C", "AB + A'C + BC simplifies to AB + A'C");
assert(resConsensus.steps.some(s => s.law.includes('Consensus')), 'Consensus theorem is explicitly recognized and cited');
assert(areExpressionsEquivalent("AB + A'C + BC", resConsensus.simplified, ['A', 'B', 'C']), 'Consensus reduction is strictly equivalent');

// Absorption: A + AB = A
const resAbs = traceAlgebraicSimplification('A + AB');
assert(resAbs.success, 'A + AB succeeds');
assert(resAbs.simplified === 'A', 'A + AB simplifies to A');

// Multivariable Quine-McCluskey reduction
const resMulti = traceAlgebraicSimplification("A'B'C' + A'BC' + AB'C' + ABC'");
assert(resMulti.success, 'Multivariable expression succeeds');
assert(areExpressionsEquivalent("A'B'C' + A'BC' + AB'C' + ABC'", resMulti.simplified, ['A', 'B', 'C']), 'Multivariable simplification is truth-table equivalent');

// ----------------------------------------------------------------------------
// 3. TRUTH TABLE GENERATOR & EQUIVALENCE CHECKER (Solver 2)
// ----------------------------------------------------------------------------
console.log('\n--- 3. Testing Truth Table Generator & Equivalence Checker (Solver 2) ---');

// Retain all 3 declared variables even if only A is in expression
const ttDeclared = generateTruthTable('A', ['A', 'B', 'C']);
assert(ttDeclared.rows.length === 8, 'Retains all 8 rows when variables are declared as A, B, C for F = A');
assert(ttDeclared.variables.join(',') === 'A,B,C', 'Variables preserved in exact MSB-first order A, B, C');
assert(ttDeclared.minterms.length === 4, 'F = A has 4 minterms in 3-variable space (4, 5, 6, 7)');
assert(JSON.stringify(ttDeclared.minterms) === JSON.stringify([4, 5, 6, 7]), 'Minterms for F=A in 3 vars are exactly [4, 5, 6, 7]');

// Equivalence checker: True case
const compEq = compareExpressions('AB + C', '(A + C)(B + C)', ['A', 'B', 'C']);
assert(compEq.success, 'compareExpressions succeeds on valid inputs');
assert(compEq.isEquivalent, 'AB + C and (A+C)(B+C) are detected as strictly equivalent');
assert(compEq.differingRows.length === 0, 'No differing rows found for equivalent pair');

// Equivalence checker: False case with counterexample
const compDiff = compareExpressions('A + B', 'AB', ['A', 'B']);
assert(!compDiff.isEquivalent, 'A + B and AB are detected as non-equivalent');
assert(compDiff.differingRows.length > 0, 'Differing rows are identified');
assert(compDiff.counterExample !== null, 'Concrete counterexample is provided');
assert(compDiff.counterExample.index === 1 || compDiff.counterExample.index === 2, 'Counterexample identifies row 1 or 2 where OR is 1 and AND is 0');

// ----------------------------------------------------------------------------
// 4. MINTERM AND MAXTERM EXPLORER (Solver 3)
// ----------------------------------------------------------------------------
console.log('\n--- 4. Testing Minterm and Maxterm Explorer (Solver 3) ---');

// Polarity for 3 variables: m5 vs M5
const vars3 = ['A', 'B', 'C'];
assert(getMintermTerm(5, vars3) === "AB'C", "m5 = AB'C (binary 101: 1->A, 0->B', 1->C)");
assert(getMaxtermTerm(5, vars3) === "(A' + B + C')", "M5 = (A' + B + C') (binary 101: 1->A', 0->B, 1->C')");

// Polarity for 4 variables: m10 vs M10
const vars4 = ['A', 'B', 'C', 'D'];
assert(getMintermTerm(10, vars4) === "AB'CD'", "m10 = AB'CD' (binary 1010)");
assert(getMaxtermTerm(10, vars4) === "(A' + B + C' + D)", "M10 = (A' + B + C' + D) (binary 1010)");

// Canonical notation formats
const canSop = formatCanonicalSOP([1, 3, 5, 7], vars3);
assert(canSop.includes("A'B'C") && canSop.includes('ABC'), 'Canonical SOP string contains correct minterm product terms');

const canPos = formatCanonicalPOS([0, 2, 4, 6], vars3);
assert(canPos.includes('(A + B + C)') && canPos.includes("(A' + B' + C)"), 'Canonical POS string contains correct maxterm sum terms');

// ----------------------------------------------------------------------------
// 5. SOP/POS CONVERSION STUDIO (Solver 4)
// ----------------------------------------------------------------------------
console.log('\n--- 5. Testing SOP/POS Conversion Studio (Solver 4) ---');

// Missing variable expansion for SOP
const expAB = expandSOPTerm('AB', ['A', 'B', 'C']);
assert(expAB.missingVars.length === 1 && expAB.missingVars[0] === 'C', 'Identifies C as missing variable in term AB');
assert(expAB.finalMinterms.includes('ABC') && expAB.finalMinterms.includes("ABC'"), "Expands AB into ABC and ABC'");

// Missing variable expansion for POS
const expAplusB = expandPOSTerm('(A + B)', ['A', 'B', 'C']);
assert(expAplusB.missingVars.length === 1 && expAplusB.missingVars[0] === 'C', 'Identifies C as missing variable in sum term (A + B)');
assert(expAplusB.finalMaxterms.length === 2, 'Expands (A + B) into 2 maxterms');

// Set complementation conversion: F = \u03A3m(1,3,5,7) <=> F = \u03A0M(0,2,4,6)
const convCan = convertCanonicalSOPtoPOS([1, 3, 5, 7], 3, vars3);
assert(JSON.stringify(convCan.maxterms) === JSON.stringify([0, 2, 4, 6]), 'Canonical POS of \u03A3m(1,3,5,7) is \u03A0M(0,2,4,6) via U \\ S');
assert(convCan.universalSet.length === 8, 'Universal set U has 2^3 = 8 elements');

// Complement function: F' = \u03A3m(0,2,4,6) = \u03A0M(1,3,5,7)
assert(convCan.complementSOP.includes('A + B + C') || convCan.maxterms.length === 4, "Complement function F' is correctly defined");

// ----------------------------------------------------------------------------
// 6. INTERACTIVE KARNAUGH MAP SOLVER (Solver 5)
// ----------------------------------------------------------------------------
console.log('\n--- 6. Testing Interactive Karnaugh Map Solver (Solver 5) ---');

// Standard Gray code descriptor check
const desc4 = getKMapGridDescriptor(4, vars4);
assert(desc4.rowHeaders.join(',') === '00,01,11,10', '4-Var K-Map row Gray code is 00, 01, 11, 10');
assert(desc4.colHeaders.join(',') === '00,01,11,10', '4-Var K-Map col Gray code is 00, 01, 11, 10');
assert(desc4.grid[0].join(',') === '0,1,3,2', 'Row 0 indices are 0, 1, 3, 2');
assert(desc4.grid[1].join(',') === '4,5,7,6', 'Row 1 indices are 4, 5, 7, 6');
assert(desc4.grid[2].join(',') === '12,13,15,14', 'Row 2 indices are 12, 13, 15, 14');
assert(desc4.grid[3].join(',') === '8,9,11,10', 'Row 3 indices are 8, 9, 11, 10');

// Group validation: 4-Corner Quad [0, 2, 8, 10]
const grpCorners = validateKMapGroup([0, 2, 8, 10], 4, vars4, { 0: 1, 2: 1, 8: 1, 10: 1 }, 'SOP');
assert(grpCorners.isValid, '4-Corner Quad [0, 2, 8, 10] is recognized as valid');
assert(grpCorners.term === "B'D'", "4-Corner Quad extracts term B'D' in SOP");
assert(grpCorners.constantVars.length === 2 && grpCorners.eliminatedVars.length === 2, '2 variables constant (B, D) and 2 eliminated (A, C)');

// Group validation in POS mode: [0, 2, 8, 10]
const grpCornersPOS = validateKMapGroup([0, 2, 8, 10], 4, vars4, { 0: 0, 2: 0, 8: 0, 10: 0 }, 'POS');
assert(grpCornersPOS.isValid, '4-Corner Quad in POS mode is valid');
assert(grpCornersPOS.term === '(B + D)', '4-Corner Quad extracts sum term (B + D) in POS');

// Invalid group rejection: Non-power-of-two (3 cells)
const grp3 = validateKMapGroup([0, 1, 2], 4, vars4, { 0: 1, 1: 1, 2: 1 }, 'SOP');
assert(!grp3.isValid, '3-cell group is rejected');
assert(grp3.reason.includes('power of 2'), 'Rejection cites power of 2 requirement');

// Invalid group rejection: Diagonal (2 cells)
const grpDiag = validateKMapGroup([0, 5], 4, vars4, { 0: 1, 5: 1 }, 'SOP');
assert(!grpDiag.isValid, 'Diagonal [0, 5] is rejected');
assert(grpDiag.reason.includes('subcube'), 'Rejection cites subcube adjacency failure');

// Invalid group rejection: Wrong cell value (contains 0 in SOP)
const grpZero = validateKMapGroup([0, 1], 4, vars4, { 0: 1, 1: 0 }, 'SOP');
assert(!grpZero.isValid, 'Group containing cell with value 0 is rejected in SOP mode');

// Full Map (16 cells)
const all16 = Array.from({ length: 16 }, (_, i) => i);
const grp16 = validateKMapGroup(all16, 4, vars4, Object.fromEntries(all16.map(i => [i, 1])), 'SOP');
assert(grp16.isValid && grp16.term === '1', '16-cell group in SOP mode produces term 1');

// Quine-McCluskey minimization: 4-Corner Quad
const qmCorners = minimizeKMap([0, 2, 8, 10], [], vars4, 'SOP');
assert(qmCorners.minimalExpression === "B'D'", "QM minimizes [0, 2, 8, 10] to B'D'");
assert(qmCorners.selectedGroups.length === 1, 'QM finds exactly 1 minimal group');

// Quine-McCluskey with Don't-Care: \u03A3m(1,3,7) + d(5) in 3 vars
const qmDC = minimizeKMap([1, 3, 7], [5], vars3, 'SOP');
assert(qmDC.minimalExpression === 'C', 'QM uses don\'t-care 5 to combine [1, 3, 5, 7] to single literal C');

// POS Minimization: \u03A0M(0, 2) in 2 vars
const qmPOS = minimizeKMap([1, 3], [], ['A', 'B'], 'POS');
assert(qmPOS.mode === 'POS', 'POS minimization returns POS mode');
assert(qmPOS.minimalExpression === '(B)' || qmPOS.minimalExpression === 'B', 'POS minimization correctly produces minimal maxterm factor');

// Constant F = 0 in SOP
const qmZero = minimizeKMap([], [], vars3, 'SOP');
assert(qmZero.minimalExpression === '0', 'Empty minterm list in SOP mode produces constant 0');

// Constant F = 1 in POS
const qmOnePOS = minimizeKMap([0, 1, 2, 3], [], ['A', 'B'], 'POS');
assert(qmOnePOS.minimalExpression === '1', 'No maxterms (all 1s) in POS mode produces constant 1');

// ----------------------------------------------------------------------------
// 7. PRESET ACCURACY & INPUT AUDIT (Solver 5 Refinements)
// ----------------------------------------------------------------------------
console.log('\n--- 7. Testing K-Map Presets & Input Modes ---');

// 1. Four-Corner Quad: {0, 2, 8, 10} in 4 vars -> B'D'
const valCorners = validateKMapGroup([0, 2, 8, 10], 4, vars4, { 0: 1, 2: 1, 8: 1, 10: 1 }, 'SOP');
assert(valCorners.isValid && valCorners.term === "B'D'", "Preset 4-Corner Quad [0, 2, 8, 10] derives B'D'");

// 2. Vertically Wrapped Quad: {0, 1, 8, 9} in 4 vars -> B'C'
const valVertWrap = validateKMapGroup([0, 1, 8, 9], 4, vars4, { 0: 1, 1: 1, 8: 1, 9: 1 }, 'SOP');
assert(valVertWrap.isValid && valVertWrap.term === "B'C'", "Preset Vertically Wrapped Quad [0, 1, 8, 9] derives B'C'");
assert(valCorners.term !== valVertWrap.term, "4-Corner Quad (B'D') and Vertically Wrapped Quad (B'C') are mathematically distinct");

// 3. POS 3-Var Quad: Maxterms {2, 3, 6, 7} (Minterms {0, 1, 4, 5}) -> (B')
// In POS mode, cells 2, 3, 6, 7 are 0
const posGrid = { 2: 0, 3: 0, 6: 0, 7: 0 };
const valPosQuad = validateKMapGroup([2, 3, 6, 7], 3, vars3, posGrid, 'POS');
assert(valPosQuad.isValid, "Preset 3-Var POS Quad [2, 3, 6, 7] is valid in POS mode");
assert(valPosQuad.term.includes("B'"), "Preset 3-Var POS Quad derives (B')");

// 4. Don't-Care Optimization Preset: Minterms {1, 3, 7} + DC {5} -> single literal C
const qmDCPreset = minimizeKMap([1, 3, 7], [5], vars3, 'SOP');
assert(qmDCPreset.minimalExpression === 'C', "Preset Don't-Care Optimization [1, 3, 7] + d(5) reduces to C");
assert(qmDCPreset.selectedGroups.length === 1 && qmDCPreset.selectedGroups[0].cells.length === 4, "QM groups 4 cells including don't-care 5");

// 5. 2-Var Pair Preset: Minterms {1, 3} in 2 vars -> B
const qm2VarPair = minimizeKMap([1, 3], [], ['A', 'B'], 'SOP');
assert(qm2VarPair.minimalExpression === 'B', "Preset 2-Var Pair [1, 3] reduces to B");

// ----------------------------------------------------------------------------
// 8. SOP/POS CONVERSION STUDIO 6-ROUTE AUDIT
// ----------------------------------------------------------------------------
console.log('\n--- 8. Testing SOP/POS Conversion Studio 6 Pathways ---');

// Pathway 1: General SOP to Canonical SOP
const p1 = expandSOPTerm('AB', ['A', 'B', 'C']);
assert(p1.finalMinterms.includes('ABC') && p1.finalMinterms.includes("ABC'"), 'Pathway 1: General SOP AB expands to ABC + ABC\'');

// Pathway 2: General POS to Canonical POS
const p2 = expandPOSTerm('(A + B)', ['A', 'B', 'C']);
assert(p2.finalMaxterms.length === 2, 'Pathway 2: General POS (A + B) expands to 2 canonical maxterms');

// Pathway 3: Canonical SOP to Canonical POS via U \\ S
const p3 = convertCanonicalSOPtoPOS([1, 3, 5, 7], 3, vars3);
assert(JSON.stringify(p3.maxterms) === JSON.stringify([0, 2, 4, 6]), 'Pathway 3: Canonical SOP {1,3,5,7} converts to Canonical POS {0,2,4,6}');

// Pathway 4: Canonical POS to Canonical SOP via U \\ S
const p4 = convertCanonicalPOStoSOP([0, 2, 4, 6], 3, vars3);
assert(JSON.stringify(p4.minterms) === JSON.stringify([1, 3, 5, 7]), 'Pathway 4: Canonical POS {0,2,4,6} converts to Canonical SOP {1,3,5,7}');

// Pathway 5: General SOP to Equivalent General POS
const p5MinSOP = minimizeKMap([3, 5, 7], [], vars3, 'SOP');
const p5MinPOS = minimizeKMap([3, 5, 7], [], vars3, 'POS');
assert(areExpressionsEquivalent(p5MinSOP.minimalExpression, p5MinPOS.minimalExpression, vars3), 'Pathway 5 & 6: Minimal SOP and POS are strictly equivalent');

// Pathway 6: Truth Table to Canonical Forms
const ttConv = generateTruthTable("AB + C'", vars3);
assert(ttConv.minterms.length > 0 && ttConv.maxterms.length > 0, 'Pathway 7 & 8: Truth table produces both minterms and maxterms');
assert(ttConv.minterms.length + ttConv.maxterms.length === 8, 'Truth table minterms and maxterms partition 2^3 = 8 rows exactly');

// ----------------------------------------------------------------------------
// 9. NAVIGATION & WORKSPACE CLEANUP AUDIT
// ----------------------------------------------------------------------------
console.log('\n--- 9. Testing UI Navigation & Redundancy Removal ---');

const interactiveSolversSrc = fs.readFileSync(path.resolve('src/components/InteractiveSolvers.jsx'), 'utf8');
const dldWorkspaceSrc = fs.readFileSync(path.resolve('src/components/DldWorkspace.jsx'), 'utf8');
const unit2SolversSrc = fs.readFileSync(path.resolve('src/components/Unit2Solvers.jsx'), 'utf8');

// Ensure redundant Course Unit Partition is removed
assert(!interactiveSolversSrc.includes('Course Unit Partition'), 'InteractiveSolvers.jsx does not contain redundant Course Unit Partition');
assert(!interactiveSolversSrc.includes('solverUnits'), 'InteractiveSolvers.jsx does not contain solverUnits state');
assert(!interactiveSolversSrc.includes('Upcoming'), 'InteractiveSolvers.jsx does not flag Unit 2 as Upcoming');

// Ensure DldWorkspace has top-level toggle
assert(dldWorkspaceSrc.includes('Unit I Solvers'), 'DldWorkspace.jsx includes Unit I Solvers toggle');
assert(dldWorkspaceSrc.includes('Unit II Solvers'), 'DldWorkspace.jsx includes Unit II Solvers toggle');

// Ensure Unit2Solvers has all 4 input modes
assert(unit2SolversSrc.includes("id: 'minterms'"), 'Unit2Solvers.jsx includes Minterms input mode');
assert(unit2SolversSrc.includes("id: 'maxterms'"), 'Unit2Solvers.jsx includes Maxterms input mode');
assert(unit2SolversSrc.includes("id: 'expression'"), 'Unit2Solvers.jsx includes Boolean Expression input mode');
assert(unit2SolversSrc.includes("id: 'direct'"), 'Unit2Solvers.jsx includes Direct Map input mode');

// Ensure no escaped unicode arrow strings remain in Unit2Solvers.jsx
assert(!unit2SolversSrc.includes('\\u2192'), 'Unit2Solvers.jsx does not contain escaped \\u2192 string literal');
assert(unit2SolversSrc.includes('0 → 1 → X → 0'), 'Unit2Solvers.jsx contains clean literal Unicode arrow sequence');

// Ensure step-by-step solution derivation is integrated
assert(unit2SolversSrc.includes('Solution Walkthrough'), 'Unit2Solvers.jsx includes Solution Walkthrough');
assert(unit2SolversSrc.includes('Step 1 : Plot the K-Map'), 'Unit2Solvers.jsx includes Step 1 Plot the K-Map');
assert(unit2SolversSrc.includes('Combine Derived Terms'), 'Unit2Solvers.jsx includes Combine Derived Terms step');

// ----------------------------------------------------------------------------
// 10. UNICODE SYMBOL & STRICT ZERO-DASH AUDIT
// ----------------------------------------------------------------------------
console.log('\n--- 10. Unicode Symbol & Dash Compliance Audit ---');

const filesToAudit = [
  'src/utils/booleanEngine.js',
  'src/components/Unit2Solvers.jsx',
  'src/components/InteractiveSolvers.jsx',
  'src/components/DldWorkspace.jsx'
];

for (const relPath of filesToAudit) {
  const fullPath = path.resolve(relPath);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Strict Zero-Dash standard
  const emDashCount = (content.match(/[\u2014]/g) || []).length;
  const enDashCount = (content.match(/[\u2013]/g) || []).length;
  assert(emDashCount === 0, `${relPath}: Zero em-dashes found (count = ${emDashCount})`);
  assert(enDashCount === 0, `${relPath}: Zero en-dashes found (count = ${enDashCount})`);
}

// ----------------------------------------------------------------------------
// 11. PERSISTENT COLORED GROUP OVERLAYS & GEOMETRIC BOUNDARY AUDIT
// ----------------------------------------------------------------------------
console.log('\n--- 11. Testing Persistent Group Overlays, Palettes & Geometry ---');

// 1. Color Palette integrity
assert(Array.isArray(KMAP_GROUP_PALETTE) && KMAP_GROUP_PALETTE.length >= 7, 'KMAP_GROUP_PALETTE defines at least 7 distinguishable color schemes');
const paletteIds = KMAP_GROUP_PALETTE.map(p => p.id);
assert(paletteIds.includes('blue') && paletteIds.includes('emerald') && paletteIds.includes('amber') && paletteIds.includes('purple') && paletteIds.includes('rose'), 'Palette includes standard academic colors Blue, Emerald, Amber, Purple, Rose');

for (const pal of KMAP_GROUP_PALETTE) {
  assert(pal.border && pal.bg && pal.badgeBg && pal.badgeText && pal.badgeBorder, `Palette entry ${pal.id} defines all visual styling tokens`);
}

// 2. Geometry: Singleton Cell
const desc4Grid = getKMapGridDescriptor(4, ['A', 'B', 'C', 'D']).grid;
const geoSingle = getGroupCellGeometry([5], 1, 1, desc4Grid);
assert(geoSingle !== null, 'Singleton cell 5 returns valid geometry descriptor');
assert(geoSingle.borderTop && geoSingle.borderBottom && geoSingle.borderLeft && geoSingle.borderRight, 'Singleton has all 4 solid borders active');
assert(!geoSingle.isWrapTop && !geoSingle.isWrapBottom && !geoSingle.isWrapLeft && !geoSingle.isWrapRight, 'Singleton has no wraparound edges');
assert(geoSingle.borderRadius === '7px 7px 7px 7px', 'Singleton has fully rounded corners on all 4 corners');

// 3. Geometry: Contiguous Horizontal Pair {2, 3}
// In 4-var K-Map: Row 0 is [0, 1, 3, 2]. Cell 3 is at (0, 2), Cell 2 is at (0, 3)
const geoPair3 = getGroupCellGeometry([2, 3], 0, 2, desc4Grid);
const geoPair2 = getGroupCellGeometry([2, 3], 0, 3, desc4Grid);
assert(geoPair3.borderTop && geoPair3.borderBottom && geoPair3.borderLeft && !geoPair3.borderRight, 'Pair cell 3 has solid Left, Top, Bottom and NO Right border (shared interior boundary)');
assert(geoPair2.borderTop && geoPair2.borderBottom && !geoPair2.borderLeft && geoPair2.borderRight, 'Pair cell 2 has solid Right, Top, Bottom and NO Left border (shared interior boundary)');
assert(geoPair3.borderRadius === '7px 0px 0px 7px', 'Pair cell 3 rounds only outer left corners');
assert(geoPair2.borderRadius === '0px 7px 7px 0px', 'Pair cell 2 rounds only outer right corners');

// 4. Geometry: 2x2 Centered Quad {5, 7, 13, 15}
// In 4-var K-Map: Rows 1 & 2, Cols 1 & 2
const geoQuad5 = getGroupCellGeometry([5, 7, 13, 15], 1, 1, desc4Grid);
const geoQuad7 = getGroupCellGeometry([5, 7, 13, 15], 1, 2, desc4Grid);
const geoQuad13 = getGroupCellGeometry([5, 7, 13, 15], 2, 1, desc4Grid);
const geoQuad15 = getGroupCellGeometry([5, 7, 13, 15], 2, 2, desc4Grid);
assert(geoQuad5.borderTop && geoQuad5.borderLeft && !geoQuad5.borderBottom && !geoQuad5.borderRight, 'Quad cell 5 has exterior Top and Left borders, interior boundaries empty');
assert(geoQuad7.borderTop && geoQuad7.borderRight && !geoQuad7.borderBottom && !geoQuad7.borderLeft, 'Quad cell 7 has exterior Top and Right borders, interior boundaries empty');
assert(geoQuad13.borderBottom && geoQuad13.borderLeft && !geoQuad13.borderTop && !geoQuad13.borderRight, 'Quad cell 13 has exterior Bottom and Left borders, interior boundaries empty');
assert(geoQuad15.borderBottom && geoQuad15.borderRight && !geoQuad15.borderTop && !geoQuad15.borderLeft, 'Quad cell 15 has exterior Bottom and Right borders, interior boundaries empty');

// 5. Geometry: Four-Corner Toroidal Quad {0, 2, 8, 10}
const geoCorner0 = getGroupCellGeometry([0, 2, 8, 10], 0, 0, desc4Grid);
const geoCorner2 = getGroupCellGeometry([0, 2, 8, 10], 0, 3, desc4Grid);
const geoCorner8 = getGroupCellGeometry([0, 2, 8, 10], 3, 0, desc4Grid);
const geoCorner10 = getGroupCellGeometry([0, 2, 8, 10], 3, 3, desc4Grid);
assert(geoCorner0.isWrapTop && geoCorner0.isWrapLeft && geoCorner0.borderBottom && geoCorner0.borderRight, 'Corner 0 has dashed Top and Left wrap edges, solid interior Bottom and Right borders');
assert(geoCorner2.isWrapTop && geoCorner2.isWrapRight && geoCorner2.borderBottom && geoCorner2.borderLeft, 'Corner 2 has dashed Top and Right wrap edges, solid interior Bottom and Left borders');
assert(geoCorner8.isWrapBottom && geoCorner8.isWrapLeft && geoCorner8.borderTop && geoCorner8.borderRight, 'Corner 8 has dashed Bottom and Left wrap edges, solid interior Top and Right borders');
assert(geoCorner10.isWrapBottom && geoCorner10.isWrapRight && geoCorner10.borderTop && geoCorner10.borderLeft, 'Corner 10 has dashed Bottom and Right wrap edges, solid interior Top and Left borders');
assert(geoCorner0.borderRadius === '0px 0px 7px 0px', 'Corner 0 interior right-angle curves inward towards center');
assert(geoCorner2.borderRadius === '0px 0px 0px 7px', 'Corner 2 interior right-angle curves inward towards center');

// 6. Faculty Case A Verification: F(A,B,C) = Σm(0,2,3,5,7)
// G1: {2,3} -> A'B, G2: {5,7} -> AC, G3: {0,2} -> A'C'
const desc3Grid = getKMapGridDescriptor(3, ['A', 'B', 'C']).grid;
const valCaseAG1 = validateKMapGroup([2, 3], 3, ['A', 'B', 'C'], { 0: 1, 2: 1, 3: 1, 5: 1, 7: 1 }, 'SOP');
const valCaseAG2 = validateKMapGroup([5, 7], 3, ['A', 'B', 'C'], { 0: 1, 2: 1, 3: 1, 5: 1, 7: 1 }, 'SOP');
const valCaseAG3 = validateKMapGroup([0, 2], 3, ['A', 'B', 'C'], { 0: 1, 2: 1, 3: 1, 5: 1, 7: 1 }, 'SOP');
assert(valCaseAG1.isValid && valCaseAG1.term === "A'B", "Case A G1 {2,3} derives A'B");
assert(valCaseAG2.isValid && valCaseAG2.term === 'AC', 'Case A G2 {5,7} derives AC');
assert(valCaseAG3.isValid && valCaseAG3.term === "A'C'", "Case A G3 {0,2} derives A'C'");

// Overlapping cell m2 belongs to both G1 and G3
assert(valCaseAG1.cells.includes(2) && valCaseAG3.cells.includes(2), 'Cell m2 is simultaneously covered by G1 and G3');
const geoCaseAm2_G1 = getGroupCellGeometry([2, 3], 0, 3, desc3Grid);
const geoCaseAm2_G3 = getGroupCellGeometry([0, 2], 0, 3, desc3Grid);
assert(geoCaseAm2_G1 !== null && geoCaseAm2_G3 !== null, 'Cell m2 computes valid independent geometry for both G1 and G3');
assert(!geoCaseAm2_G1.isWrapRight && geoCaseAm2_G3.isWrapRight, 'Cell m2 has solid Right border in G1 pair, but dashed wraparound Right border in G3 horizontal wrap');

// 7. Faculty Case B Verification: 4-Variable Multi-Group Set
// G1: {3,7,11,15} -> CD, G2: {0,2} -> A'B'D', G3: {5,13} -> BC'D
const valCaseBG1 = validateKMapGroup([3, 7, 11, 15], 4, ['A', 'B', 'C', 'D'], { 3: 1, 7: 1, 11: 1, 15: 1, 0: 1, 2: 1, 5: 1, 13: 1 }, 'SOP');
const valCaseBG2 = validateKMapGroup([0, 2], 4, ['A', 'B', 'C', 'D'], { 3: 1, 7: 1, 11: 1, 15: 1, 0: 1, 2: 1, 5: 1, 13: 1 }, 'SOP');
const valCaseBG3 = validateKMapGroup([5, 13], 4, ['A', 'B', 'C', 'D'], { 3: 1, 7: 1, 11: 1, 15: 1, 0: 1, 2: 1, 5: 1, 13: 1 }, 'SOP');
assert(valCaseBG1.isValid && valCaseBG1.term === 'CD', 'Case B G1 {3,7,11,15} derives column CD');
assert(valCaseBG2.isValid && valCaseBG2.term === "A'B'D'", "Case B G2 {0,2} derives wrapped pair A'B'D'");
assert(valCaseBG3.isValid && valCaseBG3.term === "BC'D", "Case B G3 {5,13} derives vertical pair BC'D");

// 8. Educational Redundancy Detection
// In Case A, if student adds redundant G4 {3, 7} (BC)
const valCaseAG4 = validateKMapGroup([3, 7], 3, ['A', 'B', 'C'], { 0: 1, 2: 1, 3: 1, 5: 1, 7: 1 }, 'SOP');
assert(valCaseAG4.isValid && valCaseAG4.term === 'BC', 'G4 {3,7} is a valid prime implicant term BC');
const existingCaseAGroups = [
  { id: 'G1', cells: [2, 3] },
  { id: 'G2', cells: [5, 7] },
  { id: 'G3', cells: [0, 2] }
];
const otherCovered = new Set(existingCaseAGroups.flatMap(g => g.cells));
const g4Targets = [3, 7];
const isG4Redundant = g4Targets.every(c => otherCovered.has(c));
assert(isG4Redundant, 'Educational feedback accurately flags G4 {3,7} as redundant because cell 3 is in G1 and cell 7 is in G2');

console.log('\n=================================================================');
console.log(`TOTAL AUDIT CHECKS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('=================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\nALL UNIT II INTERACTIVE SOLVER AUDITS PASSED WITH ZERO ERRORS.\n');
}
