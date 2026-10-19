/**
 * Digital Logic Design (DLD) - Section 2.3 Data Module
 * Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const dldSection23Data = {
  id: "2.3",
  number: "2.3",
  title: "Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms",
  badge: "Canonical Standards",
  status: "Available",
  estimatedReadTime: "16 min read",
  dataScienceConnection: "In digital classification models and decision trees, each decision path from the root node to a leaf corresponds mathematically to a minterm (a conjunction of feature tests). The overall classification boundary is a canonical Sum of Minterms (disjunction of winning paths). Understanding minterm/maxterm completeness allows machine learning engineers to prove whether a rule set is logically exhaustive or contains uncovered feature space.",

  overview: "A Boolean function is a mathematical mapping from binary inputs to a single binary output. Because each Boolean variable can assume only two values (0 or 1), a function of n variables has exactly 2^n distinct input combinations, and there are 2^(2^n) distinct Boolean functions possible. To establish unambiguous mathematical specifications across engineers and automated synthesis tools, Boolean functions are expressed in canonical forms: the canonical Sum of Minterms (Sigma m) and the canonical Product of Maxterms (Pi M). This section formalizes literals, product terms, sum terms, minterms, maxterms, indexing conventions, and bidirectional conversions.",

  learningOutcomes: [
    "Distinguish between the 2^n input combinations of n variables and the 2^(2^n) total possible Boolean functions.",
    "Define and differentiate literals, product terms, sum terms, minterms, and maxterms.",
    "Construct complete 2-variable and 3-variable minterm (m_i) and maxterm (M_i) truth tables.",
    "Formulate canonical Sum of Products (Sigma m) and canonical Product of Sums (Pi M) expressions.",
    "Convert seamlessly between canonical minterm lists, maxterm lists, truth tables, and algebraic forms."
  ],

  functionDomainTheory: {
    inputCombinationsFormula: "Total input combinations for n variables = 2^n",
    possibleFunctionsFormula: "Total possible distinct Boolean functions = 2^(2^n)",
    explanation: "With n binary inputs, the truth table has 2^n rows. Because the output column for each row can independently be chosen as 0 or 1, there are 2 * 2 * ... (2^n times) = 2^(2^n) distinct truth tables possible.",
    tableExamples: [
      { n: 1, combinations: 2, totalFunctions: 4, names: "Constant 0, Identity (A), Inverter (A'), Constant 1" },
      { n: 2, combinations: 4, totalFunctions: 16, names: "AND, OR, NAND, NOR, XOR, XNOR, Implication, Constants, etc." },
      { n: 3, combinations: 8, totalFunctions: 256, names: "All 3-variable logic functions" },
      { n: 4, combinations: 16, totalFunctions: 65536, names: "All 4-variable logic functions (basis of 4-input LUTs in FPGAs)" }
    ]
  },

  definitions: [
    {
      term: "Literal",
      formal: "A single primed (complemented) or unprimed (uncomplemented) variable. For example, in the expression F = AB' + C, there are 3 distinct variables (A, B, C) and 3 literals (A, B', C).",
      examTip: "Exam trap: The expression A + A' has 1 variable (A) but 2 literals (A and A')."
    },
    {
      term: "Product Term",
      formal: "An algebraic term consisting of one or more literals combined exclusively by the logical AND (·) operation. Examples: A, AB, A'BC.",
      examTip: "A single literal alone is also considered a valid product term."
    },
    {
      term: "Sum Term",
      formal: "An algebraic term consisting of one or more literals combined exclusively by the logical OR (+) operation. Examples: A, A + B, A' + B + C'.",
      examTip: "A single literal alone is also considered a valid sum term."
    },
    {
      term: "Minterm (Standard Product)",
      formal: "A product term of n variables in which each of the n variables appears exactly once, either unprimed or primed. A minterm evaluates to 1 for exactly one of the 2^n input combinations and 0 for all others.",
      examTip: "Polarity rule for minterms: Variable = 1 -> uncomplemented (x), Variable = 0 -> complemented (x')."
    },
    {
      term: "Maxterm (Standard Sum)",
      formal: "A sum term of n variables in which each of the n variables appears exactly once, either unprimed or primed. A maxterm evaluates to 0 for exactly one of the 2^n input combinations and 1 for all others.",
      examTip: "Polarity rule for maxterms: Variable = 0 -> uncomplemented (x), Variable = 1 -> complemented (x'). This is the exact opposite of minterm polarity!"
    },
    {
      term: "Canonical Form",
      formal: "A Boolean expression where every single term contains all n variables of the function. Canonical SOP is a sum of minterms; Canonical POS is a product of maxterms.",
      examTip: "Standard form (e.g. AB + C) does NOT require every term to contain all variables. Canonical form (e.g. ABC + ABC' + AB'C) requires full variable presence."
    }
  ],

  twoVariableTables: [
    { index: 0, bin: "00", A: 0, B: 0, mintermSymbol: "m0", mintermTerm: "A'B'", maxtermSymbol: "M0", maxtermTerm: "A + B" },
    { index: 1, bin: "01", A: 0, B: 1, mintermSymbol: "m1", mintermTerm: "A'B", maxtermSymbol: "M1", maxtermTerm: "A + B'" },
    { index: 2, bin: "10", A: 1, B: 0, mintermSymbol: "m2", mintermTerm: "AB'", maxtermSymbol: "M2", maxtermTerm: "A' + B" },
    { index: 3, bin: "11", A: 1, B: 1, mintermSymbol: "m3", mintermTerm: "AB", maxtermSymbol: "M3", maxtermTerm: "A' + B'" }
  ],

  threeVariableTables: [
    { index: 0, bin: "000", A: 0, B: 0, C: 0, mintermSymbol: "m0", mintermTerm: "A'B'C'", maxtermSymbol: "M0", maxtermTerm: "A + B + C" },
    { index: 1, bin: "001", A: 0, B: 0, C: 1, mintermSymbol: "m1", mintermTerm: "A'B'C", maxtermSymbol: "M1", maxtermTerm: "A + B + C'" },
    { index: 2, bin: "010", A: 0, B: 1, C: 0, mintermSymbol: "m2", mintermTerm: "A'BC'", maxtermSymbol: "M2", maxtermTerm: "A + B' + C" },
    { index: 3, bin: "011", A: 0, B: 1, C: 1, mintermSymbol: "m3", mintermTerm: "A'BC", maxtermSymbol: "M3", maxtermTerm: "A + B' + C'" },
    { index: 4, bin: "100", A: 1, B: 0, C: 0, mintermSymbol: "m4", mintermTerm: "AB'C'", maxtermSymbol: "M4", maxtermTerm: "A' + B + C" },
    { index: 5, bin: "101", A: 1, B: 0, C: 1, mintermSymbol: "m5", mintermTerm: "AB'C", maxtermSymbol: "M5", maxtermTerm: "A' + B + C'" },
    { index: 6, bin: "110", A: 1, B: 1, C: 0, mintermSymbol: "m6", mintermTerm: "ABC'", maxtermSymbol: "M6", maxtermTerm: "A' + B' + C" },
    { index: 7, bin: "111", A: 1, B: 1, C: 1, mintermSymbol: "m7", mintermTerm: "ABC", maxtermSymbol: "M7", maxtermTerm: "A' + B' + C'" }
  ],

  polarityComparison: [
    { property: "Binary 0 representation", minterm: "Complemented literal (A')", maxterm: "Uncomplemented literal (A)" },
    { property: "Binary 1 representation", minterm: "Uncomplemented literal (A)", maxterm: "Complemented literal (A')" },
    { property: "Evaluation at indexed row", minterm: "Equals 1 (all literals are 1)", maxterm: "Equals 0 (all literals are 0)" },
    { property: "Role in function construction", minterm: "Summed (ORed) for rows where F = 1", maxterm: "Multiplied (ANDed) for rows where F = 0" },
    { property: "De Morgan duality", minterm: "mi' = Mi (complement of minterm is maxterm)", maxterm: "Mi' = mi (complement of maxterm is minterm)" }
  ],

  workedModels: [
    {
      id: "WM2.3-01",
      difficulty: "Basic",
      target: "Derive canonical SOP and POS for F(A, B, C) = Sigma m(1, 3, 5, 7)",
      solutionSteps: [
        { step: 1, expr: "Minterm set: m1, m3, m5, m7", rule: "Binary index conversion", reason: "1=001 (A'B'C), 3=011 (A'BC), 5=101 (AB'C), 7=111 (ABC)." },
        { step: 2, expr: "F_SOP = A'B'C + A'BC + AB'C + ABC", rule: "Canonical Sum of Minterms", reason: "Combine minterms with logical OR (+)." },
        { step: 3, expr: "Complementary index set: {0, 1, 2, 3, 4, 5, 6, 7} \\ {1, 3, 5, 7} = {0, 2, 4, 6}", rule: "Complementary Maxterm Set", reason: "All rows where F = 0 become the maxterm indices." },
        { step: 4, expr: "Maxterms: 0=000 (A+B+C), 2=010 (A+B'+C), 4=100 (A'+B+C), 6=110 (A'+B'+C)", rule: "Maxterm polarity convention", reason: "0 -> uncomplemented, 1 -> complemented." },
        { step: 5, expr: "F_POS = Pi M(0, 2, 4, 6) = (A+B+C)(A+B'+C)(A'+B+C)(A'+B'+C)", rule: "Canonical Product of Maxterms", reason: "Combine maxterms with logical AND (·)." }
      ],
      finalResult: "Canonical SOP = Sigma m(1, 3, 5, 7) | Canonical POS = Pi M(0, 2, 4, 6)",
      verificationNote: "Simplifying F_SOP: (A'B' + A'B + AB' + AB)C = [(A'+A)(B'+B)]C = [1 · 1]C = C. Both forms simplify strictly to F = C."
    },
    {
      id: "WM2.3-02",
      difficulty: "Basic",
      target: "Convert decimal index to 3-variable minterm and maxterm for index i = 6",
      solutionSteps: [
        { step: 1, expr: "Index 6 in 3-bit binary = 110 (A=1, B=1, C=0)", rule: "Decimal to Binary", reason: "6 = 4 + 2 + 0." },
        { step: 2, expr: "Minterm m6: A=1 -> A, B=1 -> B, C=0 -> C'", rule: "Minterm Polarity", reason: "Product term = ABC'." },
        { step: 3, expr: "Maxterm M6: A=1 -> A', B=1 -> B', C=0 -> C", rule: "Maxterm Polarity", reason: "Sum term = (A' + B' + C)." },
        { step: 4, expr: "Check De Morgan: (m6)' = (ABC')' = A' + B' + (C')' = A' + B' + C = M6", rule: "Complement Relationship", reason: "mi' = Mi is verified." }
      ],
      finalResult: "m6 = ABC', M6 = (A' + B' + C)",
      verificationNote: "m6 evaluates to 1 only when A=1, B=1, C=0. M6 evaluates to 0 only when A=1, B=1, C=0."
    },
    {
      id: "WM2.3-03",
      difficulty: "Intermediate",
      target: "Express F(A, B, C) = AB + C' in canonical Sum of Minterms form",
      solutionSteps: [
        { step: 1, expr: "Identify missing variables: Term AB is missing C; Term C' is missing A and B", rule: "Variable Completeness Check", reason: "Function depends on 3 variables {A, B, C}." },
        { step: 2, expr: "Expand AB: AB = AB(C + C') = ABC + ABC'", rule: "Identity & Complement (x · 1 = x, 1 = C + C')", reason: "Multiply by missing variable sum." },
        { step: 3, expr: "Expand C': C' = (A + A')(B + B')C' = (AB + AB' + A'B + A'B')C' = ABC' + AB'C' + A'BC' + A'B'C'", rule: "Identity & Distributive", reason: "Multiply by both missing variables." },
        { step: 4, expr: "Combine all product terms: F = ABC + ABC' + ABC' + AB'C' + A'BC' + A'B'C'", rule: "Disjunction", reason: "Union of all expanded terms." },
        { step: 5, expr: "Eliminate duplicates: F = ABC + ABC' + AB'C' + A'BC' + A'B'C'", rule: "Idempotent Law (x + x = x)", reason: "ABC' appeared twice, remove duplicate." },
        { step: 6, expr: "Map to minterm indices: ABC (111 = 7), ABC' (110 = 6), AB'C' (100 = 4), A'BC' (010 = 2), A'B'C' (000 = 0)", rule: "Minterm Index Mapping", reason: "Order indices ascending: {0, 2, 4, 6, 7}." }
      ],
      finalResult: "F(A, B, C) = Sigma m(0, 2, 4, 6, 7)",
      verificationNote: "Equivalent maxterm list is Pi M(1, 3, 5)."
    },
    {
      id: "WM2.3-04",
      difficulty: "Intermediate",
      target: "Express F(x, y, z) = (x + y)(y' + z) in canonical Product of Maxterms form",
      solutionSteps: [
        { step: 1, expr: "Identify missing variables: Term (x + y) lacks z; Term (y' + z) lacks x", rule: "Completeness Check", reason: "Function has 3 variables {x, y, z}." },
        { step: 2, expr: "Expand (x + y): (x + y) + 0 = (x + y) + zz' = (x + y + z)(x + y + z')", rule: "Distributive Law (OR over AND)", reason: "Add zz' = 0 and distribute." },
        { step: 3, expr: "Expand (y' + z): (y' + z) + 0 = (y' + z) + xx' = (x + y' + z)(x' + y' + z)", rule: "Distributive Law", reason: "Add xx' = 0 and distribute." },
        { step: 4, expr: "Combine terms: F = (x + y + z)(x + y + z')(x + y' + z)(x' + y' + z)", rule: "Conjunction", reason: "Combine all standard sum factors." },
        { step: 5, expr: "Map to maxterm indices:\n(x+y+z) = 000 -> M0\n(x+y+z') = 001 -> M1\n(x+y'+z) = 010 -> M2\n(x'+y'+z) = 110 -> M6", rule: "Maxterm Polarity", reason: "Remember 0 -> uncomplemented, 1 -> complemented." }
      ],
      finalResult: "F(x, y, z) = Pi M(0, 1, 2, 6)",
      verificationNote: "Complementary minterm list is Sigma m(3, 4, 5, 7)."
    },
    {
      id: "WM2.3-05",
      difficulty: "Intermediate",
      target: "Given truth table with outputs [F(0)=1, F(1)=0, F(2)=1, F(3)=1], write both canonical forms",
      solutionSteps: [
        { step: 1, expr: "2 variables {A, B}. Rows where F = 1 are indices: {0, 2, 3}", rule: "Truth table inspection", reason: "Rows 0, 2, 3 have output 1." },
        { step: 2, expr: "Rows where F = 0 is index: {1}", rule: "Truth table inspection", reason: "Row 1 has output 0." },
        { step: 3, expr: "Canonical SOP = Sigma m(0, 2, 3) = A'B' + AB' + AB", rule: "Sum of minterms", reason: "0=A'B', 2=AB', 3=AB." },
        { step: 4, expr: "Canonical POS = Pi M(1) = (A + B')", rule: "Product of maxterms", reason: "1=01 -> A + B'." }
      ],
      finalResult: "F = Sigma m(0, 2, 3) = Pi M(1)",
      verificationNote: "Notice that Pi M(1) has only 1 factor (A + B'). Notice that simplifying Sigma m(0, 2, 3): A'B' + AB' + AB = B'(A' + A) + AB = B' + AB = B' + A = A + B'."
    },
    {
      id: "WM2.3-06",
      difficulty: "Advanced",
      target: "Prove algebraically that [Sigma m(1, 2, 3)]' = Pi M(1, 2, 3) = Sigma m(0)",
      solutionSteps: [
        { step: 1, expr: "F = Sigma m(1, 2, 3) = A'B + AB' + AB", rule: "Definition of minterms", reason: "2-variable canonical SOP." },
        { step: 2, expr: "F' = (A'B + AB' + AB)'", rule: "Complementation", reason: "Apply NOT to entire function." },
        { step: 3, expr: "F' = (A'B)' · (AB')' · (AB)'", rule: "De Morgan's Theorem", reason: "Complement of sum is product of complements." },
        { step: 4, expr: "F' = (A + B')(A' + B)(A' + B')", rule: "De Morgan's Theorem", reason: "(A'B)' = A + B', (AB')' = A' + B, (AB)' = A' + B'." },
        { step: 5, expr: "Recall maxterm definitions: M1 = (A + B'), M2 = (A' + B), M3 = (A' + B')", rule: "Maxterm matching", reason: "F' = M1 · M2 · M3 = Pi M(1, 2, 3)." },
        { step: 6, expr: "From 2-variable universe {0, 1, 2, 3}, the remaining minterm is m0", rule: "Truth table complement", reason: "When F is 0 at index 0, F' must be 1 at index 0. Thus F' = Sigma m(0) = A'B'." }
      ],
      finalResult: "[Sigma m(1, 2, 3)]' = Pi M(1, 2, 3) = Sigma m(0) = A'B'",
      verificationNote: "Demonstrates the universal bridge theorem: The complement of a Sum of Minterms is the Product of Maxterms with identical indices, which equals the Sum of Minterms of the omitted indices."
    },
    {
      id: "WM2.3-07",
      difficulty: "Advanced",
      target: "Determine the total number of distinct Boolean functions of 4 variables that evaluate to 1 for an odd number of minterms",
      solutionSteps: [
        { step: 1, expr: "For n = 4 variables, total input combinations = 2^4 = 16 minterms", rule: "Domain formula", reason: "Indices range from 0 to 15." },
        { step: 2, expr: "A function has an odd number of minterms if its minterm set size k is in {1, 3, 5, 7, 9, 11, 13, 15}", rule: "Problem condition", reason: "k must be odd." },
        { step: 3, expr: "Total functions = C(16, 1) + C(16, 3) + C(16, 5) + ... + C(16, 15)", rule: "Binomial coefficient sum", reason: "Sum of odd binomial coefficients." },
        { step: 4, expr: "Identity: Sum of odd coefficients for (1 + 1)^N is 2^(N-1)", rule: "Combinatorial identity", reason: "Here N = 16, so 2^(16 - 1) = 2^15 = 32,768." }
      ],
      finalResult: "32,768 functions",
      verificationNote: "Exactly half of the 65,536 four-variable functions have an odd number of minterms, and half have an even number."
    },
    {
      id: "WM2.3-08",
      difficulty: "Advanced",
      target: "Convert the 4-variable canonical maxterm function F(A, B, C, D) = Pi M(0, 1, 4, 5, 8, 9, 12, 13) into simplified SOP",
      solutionSteps: [
        { step: 1, expr: "Total combinations for 4 variables = 16 (0 to 15)", rule: "Domain size", reason: "n = 4." },
        { step: 2, expr: "Maxterm indices: {0, 1, 4, 5, 8, 9, 12, 13}", rule: "Given Pi M set", reason: "These are rows where F = 0." },
        { step: 3, expr: "Complementary minterm set: {2, 3, 6, 7, 10, 11, 14, 15}", rule: "Complementary set", reason: "These are rows where F = 1. F = Sigma m(2, 3, 6, 7, 10, 11, 14, 15)." },
        { step: 4, expr: "Inspect binary representations of minterms:\n2: 0010, 3: 0011\n6: 0110, 7: 0111\n10: 1010, 11: 1011\n14: 1110, 15: 1111", rule: "Binary analysis", reason: "Notice that in every single minterm, bit C = 1 (third bit). Bits A, B, and D take all possible 8 combinations {0, 1}^3." },
        { step: 5, expr: "Factoring all other variables leaves C(1) = C", rule: "Algebraic reduction", reason: "All 8 minterms combine into a single literal C." }
      ],
      finalResult: "F = C",
      verificationNote: "Demonstrates how an 8-maxterm expression simplifies to a single literal C."
    }
  ],

  examTraps: [
    {
      trap: "Inverting polarity between minterms and maxterms",
      explanation: "For index 5 (binary 101): Minterm m5 is AB'C (1 -> unprimed, 0 -> primed). Maxterm M5 is (A' + B + C') (1 -> primed, 0 -> unprimed). Confusing these is the most common mistake in DLD exams."
    },
    {
      trap: "Confusing total input combinations with total possible functions",
      explanation: "For n variables, there are 2^n input combinations (rows in truth table). But there are 2^(2^n) total possible functions! For n=3, combinations = 8, functions = 256."
    },
    {
      trap: "Calling standard form 'canonical'",
      explanation: "F = AB + C is in standard SOP form, but it is NOT canonical because term AB lacks C, and term C lacks A and B."
    }
  ],

  practiceExercises: [
    {
      id: "PE2.3-01",
      question: "For n = 3 variables, write the binary representation and maxterm expression for M3.",
      answer: "Binary: 011 | M3 = (A + B' + C')",
      steps: "Decimal 3 is 011. In maxterms, 0 is unprimed and 1 is primed. Hence A + B' + C'."
    },
    {
      id: "PE2.3-02",
      question: "If F(A, B, C) = Sigma m(0, 2, 4, 6), what is the canonical maxterm representation Pi M?",
      answer: "Pi M(1, 3, 5, 7)",
      steps: "Subtract the minterm set {0, 2, 4, 6} from the 3-variable universe {0, 1, 2, 3, 4, 5, 6, 7} to get {1, 3, 5, 7}."
    },
    {
      id: "PE2.3-03",
      question: "How many literals are in the non-canonical expression F = A'B(C + D') + AB'C?",
      answer: "6 literals",
      steps: "A', B, C, D', A, B', C gives 7 literal instances in expanded form A'BC + A'BD' + AB'C, or 6 literal occurrences in factored form."
    }
  ]
};

export default dldSection23Data;
