/**
 * Digital Logic Design (DLD) - Section 2.4 Data Module
 * SOP and POS Forms, Conversions and Simplification
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const dldSection24Data = {
  id: "2.4",
  number: "2.4",
  title: "SOP and POS Forms, Conversions and Simplification",
  badge: "Form Transformation",
  status: "Available",
  estimatedReadTime: "17 min read",
  dataScienceConnection: "In boolean satisfiability (SAT) solvers and automated reasoning engines (such as Z3 used for software verification and data pipeline integrity), logical formulas must be transformed into Conjunctive Normal Form (CNF, identical to POS) or Disjunctive Normal Form (DNF, identical to SOP). Algorithms like DPLL rely on POS clause structures to perform unit propagation and backtrack pruning at lightning speed.",

  overview: "Any switching function can be realized in two dual standard architectures: Sum of Products (SOP), where product terms are ORed together in a 2-level AND-OR network, and Product of Sums (POS), where sum terms are ANDed together in a 2-level OR-AND network. While canonical forms explicitly list every minterm or maxterm, practical engineering requires simplified standard forms that minimize hardware gate count. This section details algebraic conversion techniques between SOP and POS, expansions of missing literals, and cost comparisons proving why one form often produces a cheaper circuit than the other.",

  learningOutcomes: [
    "Differentiate between Canonical SOP, Standard SOP, Canonical POS, and Standard POS.",
    "Convert non-standard expressions into canonical forms by introducing missing literals algebraically.",
    "Transform directly between Canonical SOP (Sigma m) and Canonical POS (Pi M) via index complementation.",
    "Perform systematic algebraic reduction on both SOP and POS expressions.",
    "Evaluate and compare hardware gate count and literal costs between minimal SOP and minimal POS realizations."
  ],

  fundamentalConcepts: [
    {
      title: "Sum of Products (SOP) Architecture",
      description: "In SOP form, literals are ANDed into product terms, and the resulting product terms are ORed together. A standard SOP expression corresponds to a 2-level AND-OR gate network. Example: F = AB' + CD + A'BC. If an inverted input is needed, an inverter provides the literal at level 0."
    },
    {
      title: "Product of Sums (POS) Architecture",
      description: "In POS form, literals are ORed into sum terms, and the resulting sum terms are ANDed together. A standard POS expression corresponds to a 2-level OR-AND gate network. Example: F = (A + B')(C + D)(A' + B + C). This is the exact dual of the SOP structure."
    },
    {
      title: "Expanding Missing Literals in SOP",
      description: "To convert a standard SOP term lacking variable x into canonical form, multiply the term by (x + x') since (x + x') = 1 by the Complement Law. Then apply the Distributive Law: AB = AB(C + C') = ABC + ABC'."
    },
    {
      title: "Expanding Missing Literals in POS",
      description: "To convert a standard POS term lacking variable x into canonical form, add xx' to the term since xx' = 0 by the Complement Law. Then apply the second Distributive Law (x + yz = (x+y)(x+z)): (A + B) = (A + B) + CC' = (A + B + C)(A + B + C')."
    },
    {
      title: "Hardware Cost Comparison: SOP vs POS",
      description: "A minimal SOP and a minimal POS for the exact same function do not necessarily have the same hardware cost. For example, F = AB + CD requires 2 AND gates (2 inputs each) and 1 OR gate (2 inputs) = 3 gates, 4 literals. Its equivalent POS form is F = (A + C)(A + D)(B + C)(B + D), which requires 4 OR gates and 1 AND gate = 5 gates, 8 literals. Selecting between SOP and POS can significantly reduce circuit area."
    }
  ],

  conversionFlowchart: [
    {
      source: "Truth Table",
      target: "Canonical SOP",
      procedure: "Identify every row where output F = 1. Write the corresponding minterm m_i (1 -> x, 0 -> x'). Combine all minterms with OR (+)."
    },
    {
      source: "Truth Table",
      target: "Canonical POS",
      procedure: "Identify every row where output F = 0. Write the corresponding maxterm M_i (0 -> x, 1 -> x'). Combine all maxterms with AND (·)."
    },
    {
      source: "Canonical SOP (Sigma m)",
      target: "Canonical POS (Pi M)",
      procedure: "List the complementary index set: M_set = {0, 1, ..., 2^n - 1} \\ m_set. Write Pi M(omitted indices)."
    },
    {
      source: "Standard SOP",
      target: "Canonical SOP",
      procedure: "For each product term missing variable x, multiply by (x + x'). Distribute and eliminate duplicate terms using Idempotent Law."
    },
    {
      source: "Standard POS",
      target: "Canonical POS",
      procedure: "For each sum term missing variable x, add xx'. Distribute using (A + BC) = (A + B)(A + C) and eliminate duplicates."
    }
  ],

  workedModels: [
    {
      id: "WM2.4-01",
      difficulty: "Basic",
      target: "Convert the standard SOP expression F(A, B, C) = A'B + AC into canonical SOP (Sigma m)",
      solutionSteps: [
        { step: 1, expr: "Function variables: {A, B, C}. Full minterms require 3 literals.", rule: "Analysis", reason: "Term A'B is missing C. Term AC is missing B." },
        { step: 2, expr: "A'B = A'B(C + C') = A'BC + A'BC'", rule: "Missing literal expansion", reason: "Multiply by 1 = (C + C')." },
        { step: 3, expr: "AC = AC(B + B') = ABC + AB'C", rule: "Missing literal expansion", reason: "Multiply by 1 = (B + B')." },
        { step: 4, expr: "F = A'BC + A'BC' + ABC + AB'C", rule: "Combination", reason: "Disjunction of all expanded terms. No duplicate terms exist." },
        { step: 5, expr: "Binary mapping:\nA'BC = 011 -> m3\nA'BC' = 010 -> m2\nABC = 111 -> m7\nAB'C = 101 -> m5", rule: "Minterm index evaluation", reason: "Sort indices in ascending order: {2, 3, 5, 7}." }
      ],
      finalResult: "F(A, B, C) = Sigma m(2, 3, 5, 7) = A'BC' + A'BC + AB'C + ABC",
      verificationNote: "Truth table evaluation confirms output is 1 precisely at rows 2, 3, 5, 7."
    },
    {
      id: "WM2.4-02",
      difficulty: "Basic",
      target: "Convert the standard POS expression F(A, B, C) = (A + B)(B' + C) into canonical POS (Pi M)",
      solutionSteps: [
        { step: 1, expr: "Variables: {A, B, C}. Term (A + B) lacks C. Term (B' + C) lacks A.", rule: "Analysis", reason: "Standard sum factors require 3 literals each." },
        { step: 2, expr: "(A + B) = (A + B) + CC' = (A + B + C)(A + B + C')", rule: "Distributive Law (OR over AND)", reason: "Add 0 = CC' and distribute." },
        { step: 3, expr: "(B' + C) = (B' + C) + AA' = (A + B' + C)(A' + B' + C)", rule: "Distributive Law", reason: "Add 0 = AA' and distribute." },
        { step: 4, expr: "F = (A + B + C)(A + B + C')(A + B' + C)(A' + B' + C)", rule: "Combination", reason: "Conjunction of all 4 canonical maxterms." },
        { step: 5, expr: "Binary mapping (0 -> unprimed, 1 -> primed):\n(A + B + C) = 000 -> M0\n(A + B + C') = 001 -> M1\n(A + B' + C) = 010 -> M2\n(A' + B' + C) = 110 -> M6", rule: "Maxterm index mapping", reason: "Sort indices ascending: {0, 1, 2, 6}." }
      ],
      finalResult: "F(A, B, C) = Pi M(0, 1, 2, 6)",
      verificationNote: "Equivalent minterm set is Sigma m(3, 4, 5, 7)."
    },
    {
      id: "WM2.4-03",
      difficulty: "Intermediate",
      target: "Convert Canonical SOP F = Sigma m(1, 4, 5, 6, 7) directly to Canonical POS and verify equivalence",
      solutionSteps: [
        { step: 1, expr: "Universe of 3-variable minterm indices: U = {0, 1, 2, 3, 4, 5, 6, 7}", rule: "Domain definition", reason: "n = 3 variables gives 2^3 = 8 combinations." },
        { step: 2, expr: "Given minterm set: m_set = {1, 4, 5, 6, 7}", rule: "Given data", reason: "These are rows where F = 1." },
        { step: 3, expr: "Complementary maxterm set: M_set = U \\ m_set = {0, 2, 3}", rule: "Index complementation", reason: "Rows where F = 0 must be maxterms of F." },
        { step: 4, expr: "Write canonical maxterms:\nM0 = (A + B + C) [000]\nM2 = (A + B' + C) [010]\nM3 = (A + B' + C') [011]", rule: "Maxterm construction", reason: "Combine with AND: F = (A+B+C)(A+B'+C)(A+B'+C')." },
        { step: 5, expr: "Verify equivalence by simplifying both:\nSOP: m4+m5+m6+m7 = A(B'C' + B'C + BC' + BC) = A(1) = A. Together with m1 (A'B'C), F = A + A'B'C = A + B'C.\nPOS: (A + B' + C)(A + B' + C') = (A + B') + CC' = (A + B'). Then (A + B + C)(A + B') = A + B'(B + C) = A + B'C.", rule: "Algebraic equivalence check", reason: "Both forms reduce to the identical minimal expression: F = A + B'C." }
      ],
      finalResult: "F = Pi M(0, 2, 3) = (A + B + C)(A + B' + C)(A + B' + C')",
      verificationNote: "Shows that converting between Sigma m and Pi M takes a single subtraction step: U \\ m."
    },
    {
      id: "WM2.4-04",
      difficulty: "Intermediate",
      target: "Convert the single literal function F(A, B, C) = A into both canonical SOP and canonical POS",
      solutionSteps: [
        { step: 1, expr: "Expand A for SOP: A = A(B + B')(C + C') = A(BC + BC' + B'C + B'C')", rule: "Distributive expansion", reason: "Multiply by missing variables B and C." },
        { step: 2, expr: "F_SOP = ABC + ABC' + AB'C + AB'C' = m7 + m6 + m5 + m4", rule: "Minterm mapping", reason: "Indices {4, 5, 6, 7}." },
        { step: 3, expr: "Expand A for POS: A + 0 = A + BB' + CC' is complicated algebraically. Instead, take complementary indices!", rule: "Shortcut strategy", reason: "M_set = {0, 1, 2, 3, 4, 5, 6, 7} \\ {4, 5, 6, 7} = {0, 1, 2, 3}." },
        { step: 4, expr: "F_POS = Pi M(0, 1, 2, 3) = (A+B+C)(A+B+C')(A+B'+C)(A+B'+C')", rule: "Maxterm construction", reason: "Maxterms for indices 0, 1, 2, 3." }
      ],
      finalResult: "F = Sigma m(4, 5, 6, 7) = Pi M(0, 1, 2, 3)",
      verificationNote: "In a 3-variable truth table, A is 1 for the bottom four rows (4, 5, 6, 7) and 0 for the top four rows (0, 1, 2, 3)."
    },
    {
      id: "WM2.4-05",
      difficulty: "Intermediate",
      target: "Hardware gate cost comparison: Compare minimal SOP and minimal POS for F(A, B, C, D) = Sigma m(0, 1, 2, 3, 4, 5, 8, 9, 12, 13)",
      solutionSteps: [
        { step: 1, expr: "Analyze minterms: Notice A and B take all values, but C is always 0 for rows {0,1,2,3,4,5,8,9,12,13}? Let us check:\nm0=0000, m1=0001, m2=0010, m3=0011, m4=0100, m5=0101, m8=1000, m9=1001, m12=1100, m13=1101.", rule: "Grouping", reason: "Rows {0,1,4,5,8,9,12,13} form an octet where C=0, D can be 0 or 1, and A,B take all values -> C'. Rows {0,1,2,3} form a quad where A=0, B=0 -> A'B'." },
        { step: 2, expr: "Minimal SOP = C' + A'B'", rule: "SOP minimization", reason: "Hardware: 1 AND gate (for A'B'), 1 OR gate (to sum C' + A'B'). Total: 2 gates, 3 literals." },
        { step: 3, expr: "Maxterm set (F = 0 rows): {6, 7, 10, 11, 14, 15}", rule: "POS derivation", reason: "These rows all have C = 1 and at least one of A or B = 1. Minimal POS = (A' + C')(B' + C')." },
        { step: 4, expr: "Minimal POS: 2 OR gates, 1 AND gate. Total: 3 gates, 4 literals.", rule: "POS hardware evaluation", reason: "SOP requires 3 literals; POS requires 4 literals." }
      ],
      finalResult: "Minimal SOP = C' + A'B' (3 literals, 2 gates) | Minimal POS = (A' + C')(B' + C') (4 literals, 3 gates)",
      verificationNote: "SOP is more economical by 1 literal and simpler wiring."
    },
    {
      id: "WM2.4-06",
      difficulty: "Advanced",
      target: "Derive minimal SOP and minimal POS for the Exclusive-OR function F(A, B) = A ⊕ B and compare gate counts",
      solutionSteps: [
        { step: 1, expr: "Truth table: F(0,0)=0, F(0,1)=1, F(1,0)=1, F(1,1)=0", rule: "XOR definition", reason: "Outputs 1 when inputs differ." },
        { step: 2, expr: "Minterm set: Sigma m(1, 2) -> Minimal SOP = A'B + AB'", rule: "SOP form", reason: "2 AND gates (2 inputs each) + 1 OR gate (2 inputs) + 2 inverters = 3 logic gates (excluding inverters), 4 literals." },
        { step: 3, expr: "Maxterm set: Pi M(0, 3) -> M0 = (A + B), M3 = (A' + B')", rule: "POS form", reason: "Minimal POS = (A + B)(A' + B'). 2 OR gates + 1 AND gate + 2 inverters = 3 logic gates, 4 literals." },
        { step: 4, expr: "Cost comparison: Both 2-level realizations require exactly 3 gates and 4 literals.", rule: "Symmetry analysis", reason: "Because the 0s and 1s in the XOR truth table are completely symmetric, SOP and POS have identical gate costs." }
      ],
      finalResult: "SOP: A'B + AB' | POS: (A + B)(A' + B') | Cost: Identical (3 gates, 4 literals)",
      verificationNote: "XOR demonstrates perfect duality between SOP and POS structures."
    },
    {
      id: "WM2.4-07",
      difficulty: "Advanced",
      target: "Convert the non-standard mixed expression F = (A' + B)(B + C') + A'B' into standard SOP form",
      solutionSteps: [
        { step: 1, expr: "Expand the product of sum terms: (A' + B)(B + C') = A'B + A'C' + BB + BC'", rule: "Distributive Law", reason: "Multiply out all literals." },
        { step: 2, expr: "= A'B + A'C' + B + BC'", rule: "Idempotent Law", reason: "BB = B." },
        { step: 3, expr: "= B(1 + A' + C') + A'C'", rule: "Distributive Law", reason: "Factor out B from A'B, B, and BC'." },
        { step: 4, expr: "= B(1) + A'C' = B + A'C'", rule: "Null & Identity Laws", reason: "1 + anything = 1." },
        { step: 5, expr: "Add the remaining term A'B': F = B + A'C' + A'B'", rule: "Substitution", reason: "Re-insert + A'B'." },
        { step: 6, expr: "F = (B + A'B') + A'C' = (B + A') + A'C' = B + A' + A'C'", rule: "Redundancy Law (x + x'y = x + y)", reason: "B absorbs B' from A'B'." },
        { step: 7, expr: "F = B + A'(1 + C') = B + A'(1) = A' + B", rule: "Absorption / Null Law", reason: "A' absorbs A'C'." }
      ],
      finalResult: "F = A' + B",
      verificationNote: "Demonstrates extensive algebraic reduction across mixed SOP/POS notation."
    },
    {
      id: "WM2.4-08",
      difficulty: "Advanced",
      target: "Prove why F = AB + CD has 3 gates in SOP, but requires 5 gates in POS",
      solutionSteps: [
        { step: 1, expr: "SOP realization: F = AB + CD", rule: "Given SOP", reason: "Gate 1 = AND(A,B), Gate 2 = AND(C,D), Gate 3 = OR(Gate 1, Gate 2). Total: 3 gates, 4 literals." },
        { step: 2, expr: "Convert F = AB + CD to POS using second Distributive Law: (x + yz) = (x + y)(x + z)", rule: "Distributive Law", reason: "Let x = AB, y = C, z = D -> F = (AB + C)(AB + D)." },
        { step: 3, expr: "Apply distributive law again to each factor:\n(AB + C) = (A + C)(B + C)\n(AB + D) = (A + D)(B + D)", rule: "Distributive Law", reason: "Distribute C and D respectively across AB." },
        { step: 4, expr: "POS expression: F = (A + C)(B + C)(A + D)(B + D)", rule: "Conjunction", reason: "Requires 4 two-input OR gates (one for each sum factor) and 1 four-input AND gate to combine them = 5 gates, 8 literals." }
      ],
      finalResult: "SOP: 3 gates, 4 literals | POS: 5 gates, 8 literals",
      verificationNote: "This fundamental asymmetry occurs because AND terms do not distribute cleanly into sum terms without literal multiplication."
    }
  ],

  examTraps: [
    {
      trap: "Expanding missing literals in POS using addition instead of multiplication",
      explanation: "To expand (A + B) for variable C in POS, you must ADD CC' (which is 0), NOT multiply by (C + C')! Remember (A + B) + CC' = (A + B + C)(A + B + C')."
    },
    {
      trap: "Omitting duplicate terms in canonical expansion",
      explanation: "When expanding multiple terms, identical minterms frequently appear (e.g. ABC from both AB and BC). Always apply x + x = x to avoid duplicate indices."
    },
    {
      trap: "Assuming SOP is always cheaper than POS",
      explanation: "While SOP is more familiar, functions with few 0s in the truth table produce much smaller POS expressions than SOP expressions."
    }
  ],

  practiceExercises: [
    {
      id: "PE2.4-01",
      question: "Convert the standard SOP expression F(X, Y, Z) = XY + X'Z to canonical SOP form.",
      answer: "F = Sigma m(2, 3, 6, 7)",
      steps: "XY(Z + Z') = XYZ + XYZ' (m7, m6). X'Z(Y + Y') = X'YZ + X'Y'Z (m3, m2). Combine -> {2, 3, 6, 7}."
    },
    {
      id: "PE2.4-02",
      question: "If a 4-variable function has canonical POS form Pi M(0, 3, 7, 12, 15), how many minterms are in its canonical SOP form?",
      answer: "11 minterms",
      steps: "Total 4-variable combinations = 16. Minterm count = 16 - 5 maxterms = 11."
    },
    {
      id: "PE2.4-03",
      question: "Express the NOR gate output F = (A + B)' in standard SOP form.",
      answer: "F = A'B'",
      steps: "By De Morgan's theorem, (A + B)' = A'B'."
    }
  ]
};

export default dldSection24Data;
