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

export const UNICODE_SIGMA = '\u03A3'; // Σ
export const UNICODE_PI = '\u03A0';    // Π

export function getMaxtermTerm(index, variables) {
  const n = variables.length;
  const bin = index.toString(2).padStart(n, '0');
  const sumParts = bin
    .split('')
    .map((bit, idx) => (bit === '0' ? variables[idx] : `${variables[idx]}'`));
  return `(${sumParts.join(' + ')})`;
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
      rowGrayCodes: GRAY_1_LABELS,
      colGrayCodes: GRAY_1_LABELS,
      rowCount: 2,
      colCount: 2,
      grid,
      matrix: grid
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
      rowGrayCodes: GRAY_1_LABELS,
      colGrayCodes: GRAY_2_LABELS,
      rowCount: 2,
      colCount: 4,
      grid,
      matrix: grid
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
    rowGrayCodes: GRAY_2_LABELS,
    colGrayCodes: GRAY_2_LABELS,
    rowCount: 4,
    colCount: 4,
    grid,
    matrix: grid
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
      minimalExpression: mode === 'SOP' ? '0' : '1',
      primeImplicants: [],
      essentialPrimeImplicants: [],
      selectedGroups: [],
      isTrivial: true
    };
  }

  if (targetMinterms.length + dontCares.length === totalCombinations) {
    return {
      mode,
      minimalExpression: mode === 'SOP' ? '1' : '0',
      primeImplicants: [],
      essentialPrimeImplicants: [],
      selectedGroups: [
        {
          term: mode === 'SOP' ? '1' : '0',
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
    const constantVars = [];
    const eliminatedVars = [];
    for (let i = 0; i < pi.mask.length; i++) {
      const bit = pi.mask[i];
      if (bit === '-') {
        eliminatedVars.push(variables[i]);
      } else {
        const val = parseInt(bit, 10);
        let literal = variables[i];
        if (mode === 'SOP') {
          literal = val === 1 ? variables[i] : `${variables[i]}'`;
        } else {
          literal = val === 0 ? variables[i] : `${variables[i]}'`;
        }
        constantVars.push({ variable: variables[i], value: val, literal });
      }
    }
    return {
      id: `group-${idx + 1}`,
      mask: pi.mask,
      term,
      cells: pi.minterms,
      size: pi.minterms.length,
      isEssential,
      color: groupColors[idx % groupColors.length],
      constantVars,
      eliminatedVars,
      explanation: describeGroupDerivation(pi.mask, variables, mode)
    };
  });

  const minimalExpression = formattedGroups.length === 0
    ? (mode === 'SOP' ? '0' : '1')
    : (mode === 'SOP'
        ? formattedGroups.map(g => g.term).join(' + ')
        : formattedGroups.map(g => g.term.startsWith('(') ? g.term : `(${g.term})`).join(' · '));

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
 * Detailed Classroom Step-by-Step Algebraic Simplifier
 */
export function traceAlgebraicSimplification(expression) {
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

  const steps = [];
  steps.push({
    stepNumber: 1,
    expression: initial,
    law: 'Given Expression',
    justification: 'Starting algebraic expression to simplify.'
  });

  const clean = initial.replace(/\s+/g, '');

  // Case 1: Combining Law: AB + AB' -> A(B + B') -> A(1) -> A
  const matchCombining = clean.match(/^([A-Za-z]+)([A-Za-z])\+([A-Za-z]+)\2'$/);
  if (matchCombining && matchCombining[1] === matchCombining[3]) {
    const common = matchCombining[1];
    const varied = matchCombining[2];
    steps.push({
      stepNumber: 2,
      expression: `${common}(${varied} + ${varied}')`,
      law: 'Distributive Law (Factoring)',
      justification: `Factor out common term ${common} from both product terms.`
    });
    steps.push({
      stepNumber: 3,
      expression: `${common}(1)`,
      law: "Complement Law (x + x' = 1)",
      justification: `The sum of variable ${varied} and its complement ${varied}' equals logic 1.`
    });
    steps.push({
      stepNumber: 4,
      expression: common,
      law: 'Identity Law (x · 1 = x)',
      justification: `ANDing ${common} with logic 1 leaves ${common} unchanged.`
    });

    return {
      success: true,
      original: initial,
      simplified: common,
      steps,
      variables: vars,
      minterms: tt.minterms,
      maxterms: tt.maxterms,
      isMinimal: true
    };
  }

  // Case 2: Redundancy / Absorption 2: A + A'B -> (A + A')(A + B) -> (1)(A + B) -> A + B
  const matchRedundancy = clean.match(/^([A-Za-z])\+\1'([A-Za-z])$/);
  if (matchRedundancy) {
    const x = matchRedundancy[1];
    const y = matchRedundancy[2];
    steps.push({
      stepNumber: 2,
      expression: `(${x} + ${x}')(${x} + ${y})`,
      law: 'Second Distributive Law (x + yz = (x + y)(x + z))',
      justification: `Distribute OR over AND with x = ${x}, y = ${x}', z = ${y}.`
    });
    steps.push({
      stepNumber: 3,
      expression: `(1)(${x} + ${y})`,
      law: "Complement Law (x + x' = 1)",
      justification: `The sum ${x} + ${x}' reduces identically to 1.`
    });
    steps.push({
      stepNumber: 4,
      expression: `${x} + ${y}`,
      law: 'Identity Law (1 · x = x)',
      justification: `ANDing the factor with logic 1 yields ${x} + ${y}.`
    });

    return {
      success: true,
      original: initial,
      simplified: `${x} + ${y}`,
      steps,
      variables: vars,
      minterms: tt.minterms,
      maxterms: tt.maxterms,
      isMinimal: true
    };
  }

  // Case 3: Distributive Law 2: (A + B)(A + C) -> A + BC
  const matchDist2 = clean.match(/^\(([A-Za-z])\+([A-Za-z])\)\(\1\+([A-Za-z])\)$/);
  if (matchDist2) {
    const x = matchDist2[1];
    const y = matchDist2[2];
    const z = matchDist2[3];
    steps.push({
      stepNumber: 2,
      expression: `${x} + ${y}${z}`,
      law: 'Second Distributive Law ((x + y)(x + z) = x + yz)',
      justification: `Common term ${x} factored across OR sums produces ${x} + ${y}${z}.`
    });

    return {
      success: true,
      original: initial,
      simplified: `${x} + ${y}${z}`,
      steps,
      variables: vars,
      minterms: tt.minterms,
      maxterms: tt.maxterms,
      isMinimal: true
    };
  }

  // Case 4: Consensus Theorem: AB + A'C + BC -> AB + A'C
  const matchConsensus = clean.match(/^([A-Za-z])([A-Za-z])\+\1'([A-Za-z])\+\2\3$/);
  if (matchConsensus) {
    const a = matchConsensus[1];
    const b = matchConsensus[2];
    const c = matchConsensus[3];
    steps.push({
      stepNumber: 2,
      expression: `${a}${b} + ${a}'${c} + ${b}${c}(${a} + ${a}')`,
      law: "Identity Law (Expansion by 1 = x + x')",
      justification: `Multiply redundant consensus term ${b}${c} by (${a} + ${a}').`
    });
    steps.push({
      stepNumber: 3,
      expression: `${a}${b} + ${a}'${c} + ${a}${b}${c} + ${a}'${b}${c}`,
      law: 'Distributive Law (Multiplication)',
      justification: 'Distribute product across parenthesized terms.'
    });
    steps.push({
      stepNumber: 4,
      expression: `${a}${b}(1 + ${c}) + ${a}'${c}(1 + ${b})`,
      law: 'Distributive Law (Factoring)',
      justification: `Group common terms ${a}${b} and ${a}'${c}.`
    });
    steps.push({
      stepNumber: 5,
      expression: `${a}${b}(1) + ${a}'${c}(1)`,
      law: 'Null Law (1 + x = 1)',
      justification: `1 + ${c} = 1 and 1 + ${b} = 1 by Null Law.`
    });
    steps.push({
      stepNumber: 6,
      expression: `${a}${b} + ${a}'${c}`,
      law: 'Consensus Theorem Final Form',
      justification: `Redundant third term ${b}${c} is completely absorbed.`
    });

    return {
      success: true,
      original: initial,
      simplified: `${a}${b} + ${a}'${c}`,
      steps,
      variables: vars,
      minterms: tt.minterms,
      maxterms: tt.maxterms,
      isMinimal: true
    };
  }

  // Case 5: Absorption Law: A + AB -> A
  const matchAbsorption = clean.match(/^([A-Za-z])\+\1([A-Za-z])$/);
  if (matchAbsorption) {
    const x = matchAbsorption[1];
    const y = matchAbsorption[2];
    steps.push({
      stepNumber: 2,
      expression: `${x}(1 + ${y})`,
      law: 'Distributive Law (Factoring)',
      justification: `Factor out common term ${x} to obtain ${x}(1 + ${y}).`
    });
    steps.push({
      stepNumber: 3,
      expression: `${x}(1)`,
      law: 'Null Law (1 + x = 1)',
      justification: `1 + ${y} equals logic 1 by the Null Law.`
    });
    steps.push({
      stepNumber: 4,
      expression: x,
      law: 'Identity Law (x · 1 = x)',
      justification: `ANDing ${x} with logic 1 leaves ${x} unchanged.`
    });

    return {
      success: true,
      original: initial,
      simplified: x,
      steps,
      variables: vars,
      minterms: tt.minterms,
      maxterms: tt.maxterms,
      isMinimal: true
    };
  }

  // General reduction using pattern transforms + QM
  let currentExpr = initial;
  const redundancyRegex = /([A-Za-z])\s*\+\s*\1'\s*([A-Za-z])/g;
  if (redundancyRegex.test(currentExpr)) {
    currentExpr = currentExpr.replace(redundancyRegex, '$1 + $2');
    steps.push({
      stepNumber: steps.length + 1,
      expression: currentExpr,
      law: "Redundancy Law (A + A'B = A + B)",
      justification: 'The complemented variable in the second product is eliminated by the first variable.'
    });
  }

  const combiningRegex = /([A-Za-z]+)([A-Za-z])\s*\+\s*\1\2'/g;
  if (combiningRegex.test(currentExpr)) {
    currentExpr = currentExpr.replace(combiningRegex, '$1');
    steps.push({
      stepNumber: steps.length + 1,
      expression: currentExpr,
      law: "Combining Law (xy + xy' = x)",
      justification: "Factoring out common terms yields x(y + y') = x(1) = x."
    });
  }

  // If K-Map found a cleaner minimal expression that matches truth table
  if (currentExpr !== kmapRes.minimalExpression && areExpressionsEquivalent(currentExpr, kmapRes.minimalExpression, vars)) {
    steps.push({
      stepNumber: steps.length + 1,
      expression: kmapRes.minimalExpression,
      law: 'Minimal Sum of Products (Quine-McCluskey Reduction)',
      justification: 'Systematic prime implicant optimization derives the minimal irreducible cover.'
    });
    currentExpr = kmapRes.minimalExpression;
  }

  if (steps.length === 1) {
    steps.push({
      stepNumber: 2,
      expression: kmapRes.minimalExpression,
      law: 'Irreducible Minimal Form',
      justification: 'Expression is already in irreducible minimal form.'
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

/**
 * Validate proposed K-Map group of cells.
 */
export function validateKMapGroup(selectedCells, varCount, variables, cellStates = {}, mode = 'SOP') {
  if (!Array.isArray(selectedCells) || selectedCells.length === 0) {
    return { isValid: false, reason: 'No cells selected.' };
  }

  const totalCells = Math.pow(2, varCount);
  const uniqueCells = Array.from(new Set(selectedCells)).sort((a, b) => a - b);
  const size = uniqueCells.length;

  // Check bounds
  for (const c of uniqueCells) {
    if (c < 0 || c >= totalCells) {
      return { isValid: false, reason: `Cell index ${c} is out of bounds (0 to ${totalCells - 1}).` };
    }
  }

  // Check power of two size
  const isPowerOfTwo = size > 0 && (size & (size - 1)) === 0 && size <= totalCells;
  if (!isPowerOfTwo) {
    return {
      isValid: false,
      reason: `Group size (${size}) must be a power of 2 (1, 2, 4, 8, or 16 cells).`
    };
  }

  // Check cell values against mode
  let targetCount = 0;
  let dontCareCount = 0;
  for (const c of uniqueCells) {
    const val = cellStates[c] !== undefined ? cellStates[c] : 0;
    if (mode === 'SOP') {
      if (val === 0) {
        return {
          isValid: false,
          reason: `Group contains cell m${c} with value 0. In SOP mode, groups can only include 1s and Xs.`
        };
      }
      if (val === 1) targetCount++;
      if (val === 'X') dontCareCount++;
    } else {
      if (val === 1) {
        return {
          isValid: false,
          reason: `Group contains cell m${c} with value 1. In POS mode, groups can only include 0s and Xs.`
        };
      }
      if (val === 0) targetCount++;
      if (val === 'X') dontCareCount++;
    }
  }

  if (targetCount === 0 && dontCareCount > 0) {
    return {
      isValid: false,
      reason: "Group contains exclusively don't-care cells (X). Groups must contain at least one required target cell."
    };
  }

  // Subcube geometry validation
  const binaryStrings = uniqueCells.map(c => c.toString(2).padStart(varCount, '0'));
  let mask = '';
  let dashCount = 0;
  const constantVars = [];
  const eliminatedVars = [];

  for (let bitIdx = 0; bitIdx < varCount; bitIdx++) {
    const firstBit = binaryStrings[0][bitIdx];
    let allSame = true;
    for (let i = 1; i < binaryStrings.length; i++) {
      if (binaryStrings[i][bitIdx] !== firstBit) {
        allSame = false;
        break;
      }
    }
    const varName = variables[bitIdx] || String.fromCharCode(65 + bitIdx);
    if (allSame) {
      mask += firstBit;
      constantVars.push({
        variable: varName,
        value: parseInt(firstBit, 10),
        literal: mode === 'SOP'
          ? (firstBit === '1' ? varName : `${varName}'`)
          : (firstBit === '0' ? varName : `${varName}'`)
      });
    } else {
      mask += '-';
      dashCount++;
      eliminatedVars.push(varName);
    }
  }

  // Subcube property: 2^dashCount MUST equal size
  if (Math.pow(2, dashCount) !== size) {
    return {
      isValid: false,
      reason: `Selected ${size} cells do not form an adjacent rectangular subcube in Gray code.`
    };
  }

  // Build resulting Boolean term
  let term = '';
  if (constantVars.length === 0) {
    term = mode === 'SOP' ? '1' : '0';
  } else {
    term = mode === 'SOP'
      ? constantVars.map(cv => cv.literal).join('')
      : `(${constantVars.map(cv => cv.literal).join(' + ')})`;
  }

  return {
    isValid: true,
    size,
    cells: uniqueCells,
    mask,
    term,
    constantVars,
    eliminatedVars,
    reason: null
  };
}

/**
 * Compare two Boolean expressions over all 2^n combinations.
 */
export function compareExpressions(expr1, expr2, explicitVars = null) {
  let ast1, ast2;
  try {
    ast1 = parseBooleanExpression(expr1);
  } catch (err) {
    return { success: false, error: `Expression 1 syntax error: ${err.message}` };
  }
  try {
    ast2 = parseBooleanExpression(expr2);
  } catch (err) {
    return { success: false, error: `Expression 2 syntax error: ${err.message}` };
  }

  let vars = explicitVars;
  if (!vars || vars.length === 0) {
    const v1 = extractVariables(ast1);
    const v2 = extractVariables(ast2);
    vars = Array.from(new Set([...v1, ...v2])).sort();
    if (vars.length === 0) vars = ['A'];
  }

  const n = vars.length;
  const totalRows = Math.pow(2, n);
  const rows = [];
  const differingRows = [];

  for (let i = 0; i < totalRows; i++) {
    const assignment = {};
    for (let vIdx = 0; vIdx < n; vIdx++) {
      const bitWeight = Math.pow(2, n - 1 - vIdx);
      assignment[vars[vIdx]] = (i & bitWeight) ? 1 : 0;
    }
    const val1 = evaluateAst(ast1, assignment);
    const val2 = evaluateAst(ast2, assignment);
    const match = val1 === val2;

    const rowObj = {
      index: i,
      assignment,
      val1,
      val2,
      match
    };
    rows.push(rowObj);
    if (!match) {
      differingRows.push(rowObj);
    }
  }

  return {
    success: true,
    isEquivalent: differingRows.length === 0,
    variables: vars,
    totalRows,
    matchingRowsCount: totalRows - differingRows.length,
    differingRows,
    counterExample: differingRows.length > 0 ? differingRows[0] : null,
    rows
  };
}

/**
 * Expand SOP product term by multiplying missing variables by (V + V').
 */
export function expandSOPTerm(term, allVars) {
  const literals = [];
  let i = 0;
  while (i < term.length) {
    const ch = term[i];
    if (/[A-Za-z]/.test(ch)) {
      const varName = ch.toUpperCase();
      let isComp = false;
      if (i + 1 < term.length && (term[i + 1] === "'" || term[i + 1] === '’')) {
        isComp = true;
        i += 2;
      } else {
        i++;
      }
      literals.push({ variable: varName, isComplement: isComp, str: isComp ? `${varName}'` : varName });
    } else {
      i++;
    }
  }

  const presentVars = new Set(literals.map(l => l.variable));
  const missing = allVars.filter(v => !presentVars.has(v));

  let currentTerms = [literals.map(l => l.str).join('')];
  const steps = [];

  for (const mVar of missing) {
    const nextTerms = [];
    const expansionDetails = [];
    for (const cur of currentTerms) {
      const t1 = cur + mVar;
      const t2 = cur + `${mVar}'`;
      nextTerms.push(t1, t2);
      expansionDetails.push(`${cur}(${mVar} + ${mVar}') = ${t1} + ${t2}`);
    }
    steps.push({
      missingVar: mVar,
      detail: expansionDetails.join(' ; '),
      resultingTerms: [...nextTerms]
    });
    currentTerms = nextTerms;
  }

  return {
    originalTerm: term,
    missingVars: missing,
    steps,
    finalMinterms: currentTerms
  };
}

/**
 * Expand POS sum term by adding missing variables as (V · V') and factoring.
 */
export function expandPOSTerm(term, allVars) {
  const clean = term.replace(/[()]/g, '');
  const parts = clean.split('+').map(p => p.trim()).filter(Boolean);
  const literals = [];
  for (const p of parts) {
    const ch = p[0];
    if (/[A-Za-z]/.test(ch)) {
      const varName = ch.toUpperCase();
      const isComp = p.includes("'") || p.includes('’');
      literals.push({ variable: varName, isComplement: isComp, str: isComp ? `${varName}'` : varName });
    }
  }

  const presentVars = new Set(literals.map(l => l.variable));
  const missing = allVars.filter(v => !presentVars.has(v));

  let currentTerms = [`(${literals.map(l => l.str).join(' + ')})`];
  const steps = [];

  for (const mVar of missing) {
    const nextTerms = [];
    const expansionDetails = [];
    for (const cur of currentTerms) {
      const baseInner = cur.replace(/[()]/g, '');
      const t1 = `(${baseInner} + ${mVar})`;
      const t2 = `(${baseInner} + ${mVar}')`;
      nextTerms.push(t1, t2);
      expansionDetails.push(`${cur} + ${mVar}${mVar}' = ${t1}${t2}`);
    }
    steps.push({
      missingVar: mVar,
      detail: expansionDetails.join(' ; '),
      resultingTerms: [...nextTerms]
    });
    currentTerms = nextTerms;
  }

  return {
    originalTerm: term,
    missingVars: missing,
    steps,
    finalMaxterms: currentTerms
  };
}

/**
 * Canonical SOP to Canonical POS conversion.
 */
export function convertCanonicalSOPtoPOS(minterms, varCount, variables) {
  const totalCells = Math.pow(2, varCount);
  const mintermSet = new Set(minterms);
  const maxterms = [];
  for (let i = 0; i < totalCells; i++) {
    if (!mintermSet.has(i)) {
      maxterms.push(i);
    }
  }
  return {
    minterms: [...mintermSet].sort((a, b) => a - b),
    maxterms,
    canonicalSOP: formatCanonicalSOP(minterms, variables),
    canonicalPOS: formatCanonicalPOS(maxterms, variables),
    complementSOP: formatCanonicalSOP(maxterms, variables),
    complementPOS: formatCanonicalPOS(minterms, variables),
    universalSet: Array.from({ length: totalCells }, (_, i) => i)
  };
}

/**
 * Canonical POS to Canonical SOP conversion.
 */
export function convertCanonicalPOStoSOP(maxterms, varCount, variables) {
  const totalCells = Math.pow(2, varCount);
  const maxtermSet = new Set(maxterms);
  const minterms = [];
  for (let i = 0; i < totalCells; i++) {
    if (!maxtermSet.has(i)) {
      minterms.push(i);
    }
  }
  return {
    maxterms: [...maxtermSet].sort((a, b) => a - b),
    minterms,
    canonicalSOP: formatCanonicalSOP(minterms, variables),
    canonicalPOS: formatCanonicalPOS(maxterms, variables),
    complementSOP: formatCanonicalSOP(minterms, variables),
    complementPOS: formatCanonicalPOS(maxterms, variables),
    universalSet: Array.from({ length: totalCells }, (_, i) => i)
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
