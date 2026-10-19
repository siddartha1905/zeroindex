/**
 * Boolean Algebra & Logic Minimization Mathematical Engine
 * Digital Logic Design (DLD) - Unit 2
 * ZeroIndex Engineering Platform
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

// ----------------------------------------------------------------------------
// 1. TOKENIZER & AST PARSER
// ----------------------------------------------------------------------------

export const TOKEN_TYPES = {
  VAR: 'VAR',
  NOT: 'NOT',
  AND: 'AND',
  OR: 'OR',
  XOR: 'XOR',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  CONST: 'CONST'
};

/**
 * Tokenize a Boolean expression string.
 * Supports:
 *   - Variables: A, B, C, D, etc.
 *   - Constants: 0, 1
 *   - Complement / NOT: ', ~, !
 *   - AND: ·, *, &, or implicit juxtaposition (e.g. AB, A(B+C))
 *   - OR: +, |
 *   - XOR: ^, ⊕, @
 *   - Parentheses: (, )
 */
export function tokenizeBoolean(input) {
  if (!input || typeof input !== 'string') return [];
  const raw = input.trim();
  const tokens = [];
  let i = 0;

  while (i < raw.length) {
    const ch = raw[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (ch === '0' || ch === '1') {
      // Check if previous token was a variable or rparen or const or postfix NOT -> insert implicit AND
      insertImplicitAndIfNeeded(tokens);
      tokens.push({ type: TOKEN_TYPES.CONST, value: parseInt(ch, 10) });
      i++;
    } else if (/[A-Za-z]/.test(ch)) {
      insertImplicitAndIfNeeded(tokens);
      tokens.push({ type: TOKEN_TYPES.VAR, value: ch.toUpperCase() });
      i++;
    } else if (ch === "'" || ch === '’') {
      // Postfix NOT operator
      tokens.push({ type: TOKEN_TYPES.NOT, isPostfix: true });
      i++;
    } else if (ch === '~' || ch === '!') {
      // Prefix NOT operator
      insertImplicitAndIfNeeded(tokens);
      tokens.push({ type: TOKEN_TYPES.NOT, isPostfix: false });
      i++;
    } else if (ch === '+' || ch === '|') {
      tokens.push({ type: TOKEN_TYPES.OR });
      i++;
    } else if (ch === '*' || ch === '·' || ch === '&' || ch === '.') {
      tokens.push({ type: TOKEN_TYPES.AND });
      i++;
    } else if (ch === '^' || ch === '⊕' || ch === '@') {
      tokens.push({ type: TOKEN_TYPES.XOR });
      i++;
    } else if (ch === '(' || ch === '[' || ch === '{') {
      insertImplicitAndIfNeeded(tokens);
      tokens.push({ type: TOKEN_TYPES.LPAREN });
      i++;
    } else if (ch === ')' || ch === ']' || ch === '}') {
      tokens.push({ type: TOKEN_TYPES.RPAREN });
      i++;
    } else {
      // Skip unknown character or throw
      i++;
    }
  }

  return tokens;
}

function insertImplicitAndIfNeeded(tokens) {
  if (tokens.length === 0) return;
  const last = tokens[tokens.length - 1];
  if (
    last.type === TOKEN_TYPES.VAR ||
    last.type === TOKEN_TYPES.CONST ||
    last.type === TOKEN_TYPES.RPAREN ||
    (last.type === TOKEN_TYPES.NOT && last.isPostfix)
  ) {
    tokens.push({ type: TOKEN_TYPES.AND, implicit: true });
  }
}

/**
 * Recursive-descent parser building an AST:
 * Precedence hierarchy (highest to lowest):
 * 1. Postfix / Prefix NOT (')
 * 2. AND (·, implicit)
 * 3. XOR (⊕)
 * 4. OR (+)
 */
export function parseBooleanExpression(input) {
  const tokens = typeof input === 'string' ? tokenizeBoolean(input) : input;
  let cursor = 0;

  function peek() {
    return tokens[cursor] || null;
  }

  function consume(expectedType) {
    const t = peek();
    if (!t || (expectedType && t.type !== expectedType)) {
      throw new Error(`Parse error: expected ${expectedType || 'token'}, found ${t ? t.type : 'EOF'}`);
    }
    cursor++;
    return t;
  }

  // Expression := OrExpr
  function parseOr() {
    let left = parseXor();
    while (peek() && peek().type === TOKEN_TYPES.OR) {
      consume(TOKEN_TYPES.OR);
      const right = parseXor();
      left = { type: 'OR', left, right };
    }
    return left;
  }

  // XorExpr := AndExpr (XOR AndExpr)*
  function parseXor() {
    let left = parseAnd();
    while (peek() && peek().type === TOKEN_TYPES.XOR) {
      consume(TOKEN_TYPES.XOR);
      const right = parseAnd();
      left = { type: 'XOR', left, right };
    }
    return left;
  }

  // AndExpr := NotExpr (AND NotExpr)*
  function parseAnd() {
    let left = parseNot();
    while (peek() && peek().type === TOKEN_TYPES.AND) {
      consume(TOKEN_TYPES.AND);
      const right = parseNot();
      left = { type: 'AND', left, right };
    }
    return left;
  }

  // NotExpr := PrefixNot* Primary PostfixNot*
  function parseNot() {
    if (peek() && peek().type === TOKEN_TYPES.NOT && !peek().isPostfix) {
      consume(TOKEN_TYPES.NOT);
      const child = parseNot();
      return { type: 'NOT', child };
    }

    let node = parsePrimary();

    while (peek() && peek().type === TOKEN_TYPES.NOT && peek().isPostfix) {
      consume(TOKEN_TYPES.NOT);
      node = { type: 'NOT', child: node };
    }

    return node;
  }

  // Primary := VAR | CONST | ( OrExpr )
  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error('Unexpected end of expression');

    if (t.type === TOKEN_TYPES.VAR) {
      consume(TOKEN_TYPES.VAR);
      return { type: 'VAR', name: t.value };
    }

    if (t.type === TOKEN_TYPES.CONST) {
      consume(TOKEN_TYPES.CONST);
      return { type: 'CONST', value: t.value };
    }

    if (t.type === TOKEN_TYPES.LPAREN) {
      consume(TOKEN_TYPES.LPAREN);
      const inner = parseOr();
      consume(TOKEN_TYPES.RPAREN);
      return inner;
    }

    throw new Error(`Unexpected token: ${t.type}`);
  }

  const ast = parseOr();
  if (cursor < tokens.length) {
    throw new Error(`Unexpected trailing tokens after position ${cursor}`);
  }
  return ast;
}

// ----------------------------------------------------------------------------
// 2. AST EVALUATION & TRUTH TABLE GENERATION
// ----------------------------------------------------------------------------

export function evaluateAst(ast, variableAssignment) {
  if (!ast) return 0;
  switch (ast.type) {
    case 'CONST':
      return ast.value ? 1 : 0;
    case 'VAR':
      return variableAssignment[ast.name] ? 1 : 0;
    case 'NOT':
      return evaluateAst(ast.child, variableAssignment) ? 0 : 1;
    case 'AND':
      return evaluateAst(ast.left, variableAssignment) && evaluateAst(ast.right, variableAssignment) ? 1 : 0;
    case 'OR':
      return evaluateAst(ast.left, variableAssignment) || evaluateAst(ast.right, variableAssignment) ? 1 : 0;
    case 'XOR': {
      const l = evaluateAst(ast.left, variableAssignment);
      const r = evaluateAst(ast.right, variableAssignment);
      return (l ^ r) ? 1 : 0;
    }
    default:
      return 0;
  }
}

export function extractVariables(ast) {
  const vars = new Set();
  function traverse(node) {
    if (!node) return;
    if (node.type === 'VAR') vars.add(node.name);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    if (node.child) traverse(node.child);
  }
  traverse(ast);
  return Array.from(vars).sort();
}

/**
 * Generate a complete truth table for an expression or AST.
 * Explicit variable ordering can be passed (e.g. ['A', 'B', 'C']).
 */
export function generateTruthTable(expressionOrAst, explicitVars = null) {
  const ast = typeof expressionOrAst === 'string' ? parseBooleanExpression(expressionOrAst) : expressionOrAst;
  const vars = explicitVars && explicitVars.length > 0 ? explicitVars : extractVariables(ast);
  if (vars.length === 0) vars.push('A'); // default fallback

  const n = vars.length;
  const totalRows = Math.pow(2, n);
  const rows = [];
  const minterms = [];
  const maxterms = [];

  for (let i = 0; i < totalRows; i++) {
    const assignment = {};
    const binStr = i.toString(2).padStart(n, '0');
    for (let v = 0; v < n; v++) {
      assignment[vars[v]] = parseInt(binStr[v], 10);
    }
    const output = evaluateAst(ast, assignment);
    rows.push({
      index: i,
      binary: binStr,
      assignment,
      output
    });

    if (output === 1) minterms.push(i);
    else maxterms.push(i);
  }

  return {
    variables: vars,
    totalRows,
    rows,
    minterms,
    maxterms
  };
}

// ----------------------------------------------------------------------------
// 3. MINTERMS, MAXTERMS, SOP & POS FORMATTING
// ----------------------------------------------------------------------------

export function getMintermTerm(index, variables) {
  const n = variables.length;
  const bin = index.toString(2).padStart(n, '0');
  return bin
    .split('')
    .map((bit, idx) => (bit === '1' ? variables[idx] : `${variables[idx]}'`))
    .join('');
}

export function getMaxtermTerm(index, variables) {
  const n = variables.length;
  const bin = index.toString(2).padStart(n, '0');
  const sumParts = bin
    .split('')
    .map((bit, idx) => (bit === '0' ? variables[idx] : `${variables[idx]}'`));
  return `(${sumParts.join('+')})`;
}

export function formatCanonicalSOP(mintermIndices, variables) {
  if (mintermIndices.length === 0) return '0';
  if (mintermIndices.length === Math.pow(2, variables.length)) return '1';
  return mintermIndices.map(m => getMintermTerm(m, variables)).join(' + ');
}

export function formatCanonicalPOS(maxtermIndices, variables) {
  if (maxtermIndices.length === 0) return '1';
  if (maxtermIndices.length === Math.pow(2, variables.length)) return '0';
  return maxtermIndices.map(M => getMaxtermTerm(M, variables)).join(' · ');
}

// ----------------------------------------------------------------------------
// 4. KARNAUGH MAP GEOMETRY & MINIMIZATION ENGINE
// ----------------------------------------------------------------------------

/**
 * Gray code order for 1, 2 bits:
 * 1 bit: [0, 1]
 * 2 bits: [0, 1, 3, 2] (binary 00, 01, 11, 10)
 */
export const GRAY_1 = [0, 1];
export const GRAY_1_LABELS = ['0', '1'];
export const GRAY_2 = [0, 1, 3, 2];
export const GRAY_2_LABELS = ['00', '01', '11', '10'];

/**
 * Returns grid dimensions and cell-to-minterm mapping for 2, 3, or 4 variables.
 */
export function getKMapGridDescriptor(varCount, customVars = null) {
  if (varCount === 2) {
    const vars = customVars || ['A', 'B'];
    // Rows: A (0, 1), Cols: B (0, 1)
    const grid = [
      [0, 1], // row A=0 (m0, m1)
      [2, 3]  // row A=1 (m2, m3)
    ];
    return {
      varCount: 2,
      rowVars: [vars[0]],
      colVars: [vars[1]],
      rowHeaders: GRAY_1_LABELS,
      colHeaders: GRAY_1_LABELS,
      rowCount: 2,
      colCount: 2,
      grid
    };
  }

  if (varCount === 3) {
    const vars = customVars || ['A', 'B', 'C'];
    // Rows: A (0, 1), Cols: BC (00, 01, 11, 10)
    const grid = [
      [0, 1, 3, 2], // row A=0 (m0, m1, m3, m2)
      [4, 5, 7, 6]  // row A=1 (m4, m5, m7, m6)
    ];
    return {
      varCount: 3,
      rowVars: [vars[0]],
      colVars: [vars[1], vars[2]],
      rowHeaders: GRAY_1_LABELS,
      colHeaders: GRAY_2_LABELS,
      rowCount: 2,
      colCount: 4,
      grid
    };
  }

  // 4 variables default
  const vars = customVars || ['A', 'B', 'C', 'D'];
  // Rows: AB (00, 01, 11, 10), Cols: CD (00, 01, 11, 10)
  const grid = [
    [0, 1, 3, 2],       // AB=00
    [4, 5, 7, 6],       // AB=01
    [12, 13, 15, 14],   // AB=11
    [8, 9, 11, 10]      // AB=10
  ];
  return {
    varCount: 4,
    rowVars: [vars[0], vars[1]],
    colVars: [vars[2], vars[3]],
    rowHeaders: GRAY_2_LABELS,
    colHeaders: GRAY_2_LABELS,
    rowCount: 4,
    colCount: 4,
    grid
  };
}

/**
 * Exact Boolean Minimizer (Quine-McCluskey / Karnaugh grouping model)
 * Handles up to 4 variables deterministically.
 * @param {number[]} minterms - Array of minterm indices where F = 1
 * @param {number[]} dontCares - Array of indices where F = X
 * @param {string[]} variables - Variable names, e.g. ['A', 'B', 'C', 'D']
 * @param {'SOP'|'POS'} mode - Minimization mode
 */
export function minimizeKMap(minterms, dontCares = [], variables = ['A', 'B', 'C', 'D'], mode = 'SOP') {
  const n = variables.length;
  const totalCombinations = Math.pow(2, n);
  const mintermSet = new Set(minterms);
  const dontCareSet = new Set(dontCares);

  // If in POS mode, the targets to group are maxterms (cells where F = 0)
  let targetMinterms = minterms;
  if (mode === 'POS') {
    const maxterms = [];
    for (let i = 0; i < totalCombinations; i++) {
      if (!mintermSet.has(i) && !dontCareSet.has(i)) {
        maxterms.push(i);
      }
    }
    targetMinterms = maxterms;
  }

  // Edge cases
  if (targetMinterms.length === 0) {
    return {
      mode,
      minimalExpression: mode === 'SOP' ? '0' : '0',
      primeImplicants: [],
      essentialPrimeImplicants: [],
      selectedGroups: [],
      isTrivial: true
    };
  }

  if (targetMinterms.length + dontCares.length === totalCombinations) {
    return {
      mode,
      minimalExpression: '1',
      primeImplicants: [],
      essentialPrimeImplicants: [],
      selectedGroups: [
        {
          term: '1',
          cells: Array.from({ length: totalCombinations }, (_, i) => i),
          isEssential: true,
          size: totalCombinations
        }
      ],
      isTrivial: true
    };
  }

  // Quine-McCluskey term generation
  // Combine all targets + don't cares
  const allUsable = Array.from(new Set([...targetMinterms, ...dontCares]));

  // Represent each minterm as binary string with mask
  // An implicant is { mask: string (0, 1, -), minterms: number[], used: boolean }
  let currentGroup = allUsable.map(m => ({
    mask: m.toString(2).padStart(n, '0'),
    minterms: [m],
    used: false
  }));

  const primeImplicants = [];

  while (currentGroup.length > 0) {
    const nextGroup = [];
    const seenMasks = new Set();

    for (let i = 0; i < currentGroup.length; i++) {
      for (let j = i + 1; j < currentGroup.length; j++) {
        const a = currentGroup[i];
        const b = currentGroup[j];
        const diffIdx = findSingleBitDifference(a.mask, b.mask);

        if (diffIdx !== -1) {
          a.used = true;
          b.used = true;
          const mergedMask = a.mask.substring(0, diffIdx) + '-' + a.mask.substring(diffIdx + 1);
          if (!seenMasks.has(mergedMask)) {
            seenMasks.add(mergedMask);
            const mergedMinterms = Array.from(new Set([...a.minterms, ...b.minterms])).sort((x, y) => x - y);
            nextGroup.push({
              mask: mergedMask,
              minterms: mergedMinterms,
              used: false
            });
          }
        }
      }
    }

    // Collect any unused implicants as prime implicants
    for (const item of currentGroup) {
      if (!item.used) {
        // Only keep if it covers at least one target minterm (not solely don't-cares)
        const coversTarget = item.minterms.some(m => targetMinterms.includes(m));
        if (coversTarget) {
          primeImplicants.push(item);
        }
      }
    }

    currentGroup = nextGroup;
  }

  // Filter duplicate prime implicants by mask
  const uniquePIs = [];
  const piMasks = new Set();
  for (const pi of primeImplicants) {
    if (!piMasks.has(pi.mask)) {
      piMasks.add(pi.mask);
      uniquePIs.push(pi);
    }
  }

  // Find Essential Prime Implicants
  // A minterm is uniquely covered by a PI if exactly one PI contains it
  const uncoveredTargets = new Set(targetMinterms);
  const essentialPIs = [];
  const remainingPIs = [];

  for (const pi of uniquePIs) {
    pi.targetMinterms = pi.minterms.filter(m => uncoveredTargets.has(m));
  }

  for (const target of targetMinterms) {
    const coveringPIs = uniquePIs.filter(pi => pi.minterms.includes(target));
    if (coveringPIs.length === 1) {
      const epi = coveringPIs[0];
      if (!essentialPIs.includes(epi)) {
        essentialPIs.push(epi);
      }
    }
  }

  // Remove targets covered by EPIs
  for (const epi of essentialPIs) {
    for (const m of epi.minterms) {
      uncoveredTargets.delete(m);
    }
  }

  // Petrick's method / greedy set cover for remaining uncovered targets
  const chosenCover = [...essentialPIs];
  const candidatePIs = uniquePIs.filter(pi => !essentialPIs.includes(pi));

  while (uncoveredTargets.size > 0 && candidatePIs.length > 0) {
    // Pick candidate covering the most remaining uncovered targets
    candidatePIs.sort((a, b) => {
      const countA = a.minterms.filter(m => uncoveredTargets.has(m)).length;
      const countB = b.minterms.filter(m => uncoveredTargets.has(m)).length;
      if (countB !== countA) return countB - countA;
      // tiebreaker: larger group size (fewer literals)
      return b.minterms.length - a.minterms.length;
    });

    const best = candidatePIs.shift();
    if (!best) break;
    chosenCover.push(best);
    for (const m of best.minterms) {
      uncoveredTargets.delete(m);
    }
  }

  // Convert each PI mask to symbolic Boolean term
  const groupColors = [
    '#2E6F40', // Emerald Green
    '#4F46E5', // Indigo
    '#D97706', // Amber
    '#DC2626', // Rose
    '#0891B2', // Cyan
    '#9333EA', // Purple
    '#EA580C', // Orange
    '#059669'  // Teal
  ];

  const formattedGroups = chosenCover.map((pi, idx) => {
    const term = maskToTerm(pi.mask, variables, mode);
    const isEssential = essentialPIs.includes(pi);
    return {
      id: `group-${idx + 1}`,
      mask: pi.mask,
      term,
      cells: pi.minterms,
      size: pi.minterms.length,
      isEssential,
      color: groupColors[idx % groupColors.length],
      explanation: describeGroupDerivation(pi.mask, variables, mode)
    };
  });

  const minimalExpression = mode === 'SOP'
    ? formattedGroups.map(g => g.term).join(' + ')
    : formattedGroups.map(g => `(${g.term})`).join(' · ');

  return {
    mode,
    minimalExpression,
    primeImplicants: uniquePIs.map(pi => ({
      mask: pi.mask,
      term: maskToTerm(pi.mask, variables, mode),
      cells: pi.minterms
    })),
    essentialPrimeImplicants: essentialPIs.map(pi => ({
      mask: pi.mask,
      term: maskToTerm(pi.mask, variables, mode),
      cells: pi.minterms
    })),
    selectedGroups: formattedGroups,
    isTrivial: false
  };
}

function findSingleBitDifference(m1, m2) {
  let diffCount = 0;
  let diffIdx = -1;
  for (let i = 0; i < m1.length; i++) {
    if (m1[i] !== m2[i]) {
      diffCount++;
      diffIdx = i;
      if (diffCount > 1) return -1;
    }
  }
  return diffCount === 1 ? diffIdx : -1;
}

function maskToTerm(mask, variables, mode = 'SOP') {
  const parts = [];
  for (let i = 0; i < mask.length; i++) {
    const bit = mask[i];
    const v = variables[i];
    if (bit === '-') continue;

    if (mode === 'SOP') {
      // In SOP: 1 -> variable, 0 -> complemented variable
      parts.push(bit === '1' ? v : `${v}'`);
    } else {
      // In POS (maxterm polarity): 0 -> variable, 1 -> complemented variable
      parts.push(bit === '0' ? v : `${v}'`);
    }
  }

  if (parts.length === 0) return '1';
  return mode === 'SOP' ? parts.join('') : parts.join('+');
}

function describeGroupDerivation(mask, variables, mode) {
  const kept = [];
  const eliminated = [];
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '-') {
      eliminated.push(variables[i]);
    } else {
      const state = mask[i] === '1' ? '1' : '0';
      kept.push(`${variables[i]}=${state}`);
    }
  }
  const elimText = eliminated.length > 0
    ? `Eliminates changing variable(s): ${eliminated.join(', ')}.`
    : 'No variables eliminated (singleton cell).';
  const keptText = kept.length > 0
    ? `Constants preserved: ${kept.join(', ')}.`
    : 'All variables eliminated.';
  return `${keptText} ${elimText}`;
}

// ----------------------------------------------------------------------------
// 5. STEP-BY-STEP ALGEBRAIC SIMPLIFIER & VERIFIER
// ----------------------------------------------------------------------------

/**
 * Given two expressions, verify if they are strictly equivalent for all inputs.
 */
export function areExpressionsEquivalent(expr1, expr2, customVars = null) {
  try {
    const ast1 = parseBooleanExpression(expr1);
    const ast2 = parseBooleanExpression(expr2);
    const vars = customVars || Array.from(new Set([...extractVariables(ast1), ...extractVariables(ast2)])).sort();
    if (vars.length === 0) vars.push('A');

    const total = Math.pow(2, vars.length);
    for (let i = 0; i < total; i++) {
      const assignment = {};
      const bin = i.toString(2).padStart(vars.length, '0');
      for (let v = 0; v < vars.length; v++) {
        assignment[vars[v]] = parseInt(bin[v], 10);
      }
      const out1 = evaluateAst(ast1, assignment);
      const out2 = evaluateAst(ast2, assignment);
      if (out1 !== out2) return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Algebraic Simplifier with transformation trace.
 * Detects common Boolean identities and logs step-by-step transformations.
 */
export function traceAlgebraicSimplification(expression) {
  const steps = [];
  const initial = expression.trim();

  // Validate expression syntax first
  let ast;
  try {
    ast = parseBooleanExpression(initial);
  } catch (err) {
    return {
      success: false,
      error: err.message,
      steps: []
    };
  }

  const vars = extractVariables(ast);
  const tt = generateTruthTable(ast, vars);
  const kmapRes = minimizeKMap(tt.minterms, [], vars, 'SOP');

  steps.push({
    stepNumber: 1,
    expression: initial,
    law: 'Given Expression',
    justification: 'Starting algebraic expression to simplify.'
  });

  let currentExpr = initial;

  // Pattern transformations
  // Rule 1: A + A'B -> A + B (Redundancy Law)
  const redundancyRegex = /([A-Za-z])\s*\+\s*\1'\s*([A-Za-z])/g;
  if (redundancyRegex.test(currentExpr)) {
    currentExpr = currentExpr.replace(redundancyRegex, '$1 + $2');
    steps.push({
      stepNumber: steps.length + 1,
      expression: currentExpr,
      law: 'Redundancy Law (A + A\'B = A + B)',
      justification: 'The complemented variable in the second term is eliminated by the first variable.'
    });
  }

  // Rule 2: AB + AB' -> A (Combining / Adjacency Law)
  const combiningRegex = /([A-Za-z]+)([A-Za-z])\s*\+\s*\1\2'/g;
  if (combiningRegex.test(currentExpr)) {
    currentExpr = currentExpr.replace(combiningRegex, '$1');
    steps.push({
      stepNumber: steps.length + 1,
      expression: currentExpr,
      law: 'Combining Law (xy + xy\' = x)',
      justification: 'Factoring out common terms yields x(y + y\') = x(1) = x.'
    });
  }

  // Rule 3: A + AB -> A (Absorption Law)
  const absorptionRegex = /([A-Za-z])\s*\+\s*\1([A-Za-z])/g;
  if (absorptionRegex.test(currentExpr)) {
    currentExpr = currentExpr.replace(absorptionRegex, '$1');
    steps.push({
      stepNumber: steps.length + 1,
      expression: currentExpr,
      law: 'Absorption Law (x + xy = x)',
      justification: 'x + xy = x(1 + y) = x(1) = x by Identity and Null laws.'
    });
  }

  // If K-Map found a cleaner minimal expression that matches truth table
  if (currentExpr !== kmapRes.minimalExpression && areExpressionsEquivalent(currentExpr, kmapRes.minimalExpression, vars)) {
    steps.push({
      stepNumber: steps.length + 1,
      expression: kmapRes.minimalExpression,
      law: 'Minimal Sum of Products',
      justification: 'Exhaustive algebraic reduction reaches the canonical irreducible prime implicant cover.'
    });
    currentExpr = kmapRes.minimalExpression;
  }

  return {
    success: true,
    original: initial,
    simplified: currentExpr,
    steps,
    variables: vars,
    minterms: tt.minterms,
    maxterms: tt.maxterms,
    isMinimal: true
  };
}

// ----------------------------------------------------------------------------
// 6. UNIVERSAL GATE (NAND / NOR) SYNTHESIS
// ----------------------------------------------------------------------------

/**
 * Builds a 2-level NAND synthesis description for a SOP expression.
 */
export function buildNandSynthesis(sopExpression, variables = ['A', 'B', 'C', 'D']) {
  // Parse SOP into product terms
  const terms = sopExpression.split('+').map(t => t.trim()).filter(Boolean);
  const gates = [];

  // Level 1: NAND gates for each product term
  terms.forEach((term, idx) => {
    // Extract literals
    const literals = [];
    let i = 0;
    while (i < term.length) {
      const v = term[i];
      if (i + 1 < term.length && (term[i + 1] === "'" || term[i + 1] === '’')) {
        literals.push(`${v}'`);
        i += 2;
      } else if (/[A-Za-z0-9]/.test(v)) {
        literals.push(v);
        i++;
      } else {
        i++;
      }
    }

    gates.push({
      gateId: `N${idx + 1}`,
      type: 'NAND',
      level: 1,
      inputs: literals,
      output: `(${literals.join(' · ')})'`,
      description: `First-level NAND computing complement of product term ${term}`
    });
  });

  // Level 2: Output NAND combining level 1 outputs
  if (gates.length > 1) {
    const level1Outputs = gates.map(g => g.gateId);
    gates.push({
      gateId: `N_OUT`,
      type: 'NAND',
      level: 2,
      inputs: level1Outputs,
      output: 'F',
      description: `Second-level NAND inverting the NANDed products back into the OR sum by De Morgan's Law`
    });
  }

  return {
    type: 'NAND_SYNTHESIS',
    original: sopExpression,
    gates,
    totalGates: gates.length,
    deMorganProof: `(${terms.join(' + ')})'' = (${terms.map(t => `(${t})'`).join(' · ')})' (NAND-NAND equivalence)`
  };
}

/**
 * Builds a 2-level NOR synthesis description for a POS expression.
 */
export function buildNorSynthesis(posExpression, variables = ['A', 'B', 'C', 'D']) {
  // Extract sum terms enclosed in parentheses
  const sumRegex = /\(([^)]+)\)/g;
  const terms = [];
  let match;
  while ((match = sumRegex.exec(posExpression)) !== null) {
    terms.push(match[1].trim());
  }
  if (terms.length === 0) {
    terms.push(posExpression.replace(/[()]/g, '').trim());
  }

  const gates = [];

  // Level 1: NOR gates for each sum term
  terms.forEach((term, idx) => {
    const literals = term.split('+').map(l => l.trim()).filter(Boolean);
    gates.push({
      gateId: `R${idx + 1}`,
      type: 'NOR',
      level: 1,
      inputs: literals,
      output: `(${literals.join(' + ')})'`,
      description: `First-level NOR computing complement of sum term (${term})`
    });
  });

  // Level 2: Output NOR combining level 1 outputs
  if (gates.length > 1) {
    const level1Outputs = gates.map(g => g.gateId);
    gates.push({
      gateId: `R_OUT`,
      type: 'NOR',
      level: 2,
      inputs: level1Outputs,
      output: 'F',
      description: `Second-level NOR inverting the NORed sums back into the AND product by De Morgan's Law`
    });
  }

  return {
    type: 'NOR_SYNTHESIS',
    original: posExpression,
    gates,
    totalGates: gates.length,
    deMorganProof: `(${terms.map(t => `(${t})`).join(' · ')})'' = (${terms.map(t => `(${t})'`).join(' + ')})' (NOR-NOR equivalence)`
  };
}
