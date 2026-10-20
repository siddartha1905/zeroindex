/**
 * Digital Logic Design (DLD) - Section 2.7 Data Module
 * Exclusive-OR Functions and Implementation Using NAND/NOR Gates
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const dldSection27Data = {
  id: "2.7",
  number: "2.7",
  title: "Exclusive-OR Functions and Implementation Using NAND/NOR Gates",
  badge: "Specialized Arithmetic Logic",
  status: "Planned / In Development",
  estimatedReadTime: "18 min read",
  dataScienceConnection: "The Exclusive-OR operation is the mathematical backbone of error-detecting cyclic redundancy checks (CRC), Hamming error-correcting codes, and cryptographic hashing algorithms (such as SHA-256 and AES). In distributed data streaming (such as Apache Kafka), parity bits generated via multi-variable XOR networks detect corrupted data frames during network transit with zero software overhead.",

  overview: "The Exclusive-OR (XOR) and Exclusive-NOR (XNOR) functions are specialized logic operations with unique algebraic properties that make them indispensable for binary addition, parity generation, and cryptographic hashing. Unlike the inclusive OR gate which outputs 1 when either or both inputs are 1, the XOR gate outputs 1 strictly when an odd number of inputs are 1 (hence its role as an odd-parity detector). While standard 2-level synthesis requires 5 gates, clever multi-level topological sharing enables XOR to be synthesized using exactly 4 two-input NAND gates, or 5 two-input NOR gates. This section details XOR/XNOR mathematical foundations, fundamental algebraic identities, complete gate derivations, and intermediate signal tracing across all input states.",

  learningOutcomes: [
    "Differentiate the Exclusive-OR (XOR) operation from inclusive OR and formalize the Exclusive-NOR (XNOR) equivalence function.",
    "Prove and apply core XOR algebraic properties: identity with 0, complementation with 1, self-annihilation (A ⊕ A = 0), and associativity.",
    "Trace and derive the optimal 4-NAND implementation of XOR with complete intermediate signal verification.",
    "Trace and derive the 5-NOR implementation of XOR and explain the intermediate XNOR node.",
    "Analyze multi-variable XOR networks as generalized odd-parity generators and even-parity checkers."
  ],

  truthTables: {
    xorTable: [
      { A: 0, B: 0, out: 0, explanation: "Even number of 1s (0 ones) -> Output 0" },
      { A: 0, B: 1, out: 1, explanation: "Odd number of 1s (1 one) -> Output 1" },
      { A: 1, B: 0, out: 1, explanation: "Odd number of 1s (1 one) -> Output 1" },
      { A: 1, B: 1, out: 0, explanation: "Even number of 1s (2 ones) -> Output 0" }
    ],
    xnorTable: [
      { A: 0, B: 0, out: 1, explanation: "Inputs are identical (0 = 0) -> Equivalence Output 1" },
      { A: 0, B: 1, out: 0, explanation: "Inputs differ (0 != 1) -> Equivalence Output 0" },
      { A: 1, B: 0, out: 0, explanation: "Inputs differ (1 != 0) -> Equivalence Output 0" },
      { A: 1, B: 1, out: 1, explanation: "Inputs are identical (1 = 1) -> Equivalence Output 1" }
    ]
  },

  fundamentalEquations: [
    { name: "XOR Canonical SOP", formula: "A ⊕ B = A'B + AB'", meaning: "True when exactly one input is 1." },
    { name: "XOR Canonical POS", formula: "A ⊕ B = (A + B)(A' + B')", meaning: "True when at least one input is 1 AND at least one input is 0." },
    { name: "XNOR Canonical SOP", formula: "(A ⊕ B)' = AB + A'B'", meaning: "True when both inputs are 1 OR both inputs are 0." },
    { name: "XNOR Canonical POS", formula: "(A ⊕ B)' = (A + B')(A' + B)", meaning: "Dual POS formulation of equivalence." }
  ],

  algebraicProperties: [
    { prop: "Identity with 0", formula: "x ⊕ 0 = x", proof: "x' · 0 + x · 0' = 0 + x · 1 = x" },
    { prop: "Inversion with 1", formula: "x ⊕ 1 = x'", proof: "x' · 1 + x · 1' = x' · 1 + x · 0 = x'" },
    { prop: "Self-Annihilation", formula: "x ⊕ x = 0", proof: "x' · x + x · x' = 0 + 0 = 0" },
    { prop: "Complement Pair", formula: "x ⊕ x' = 1", proof: "x' · (x')' + x · x' = x' · x + x · x' = 1 by complement law" },
    { prop: "Commutative", formula: "x ⊕ y = y ⊕ x", proof: "x'y + xy' = yx' + y'x" },
    { prop: "Associative", formula: "(x ⊕ y) ⊕ z = x ⊕ (y ⊕ z)", proof: "Evaluates to 1 when an odd number of variables among {x, y, z} are 1" },
    { prop: "Complement Distribution", formula: "(x ⊕ y)' = x' ⊕ y = x ⊕ y' = xy + x'y'", proof: "Complementing one input inverts the entire XOR output" },
    { prop: "Double Complementation", formula: "x' ⊕ y' = x ⊕ y", proof: "Complementing both inputs cancels the inversion" }
  ],

  fourNandDerivation: {
    title: "Minimal 4-NAND Implementation of XOR",
    description: "Standard 2-level SOP (A'B + AB') requires 5 gates (2 inverters, 2 AND gates, 1 OR gate). By strategically reusing the intermediate NAND product (AB)', XOR is synthesized using exactly 4 two-input NAND gates with no external inverters.",
    equations: [
      {
        gate: "Gate 1 (Central Product)",
        symbol: "N1",
        formula: "N1 = NAND(A, B) = (AB)' = A' + B'",
        explanation: "Computes the NAND of both primary inputs."
      },
      {
        gate: "Gate 2 (Upper Leg)",
        symbol: "N2",
        formula: "N2 = NAND(A, N1) = [A · (AB)']' = [A · (A' + B')]' = [AA' + AB']' = [0 + AB']' = (AB')' = A' + B",
        explanation: "Inverts literal B conditionally when A is 1."
      },
      {
        gate: "Gate 3 (Lower Leg)",
        symbol: "N3",
        formula: "N3 = NAND(B, N1) = [B · (AB)']' = [B · (A' + B')]' = [A'B + BB']' = [A'B + 0]' = (A'B)' = A + B'",
        explanation: "Inverts literal A conditionally when B is 1."
      },
      {
        gate: "Gate 4 (Output Stage)",
        symbol: "N4 (XOR)",
        formula: "N4 = NAND(N2, N3) = [N2 · N3]' = [(A' + B) · (A + B')]' = [A'A + A'B' + BA + BB']' = [0 + A'B' + AB + 0]' = [A'B' + AB]' = A'B + AB' = A ⊕ B",
        explanation: "Combines the legs into the final XOR output."
      }
    ],
    stateTracingTable: [
      { A: 0, B: 0, N1: 1, N2: 1, N3: 1, out: 0, check: "NAND(1, 1) = 0 (Matches 0 ⊕ 0 = 0)" },
      { A: 0, B: 1, N1: 1, N2: 1, N3: 0, out: 1, check: "NAND(1, 0) = 1 (Matches 0 ⊕ 1 = 1)" },
      { A: 1, B: 0, N1: 1, N2: 0, N3: 1, out: 1, check: "NAND(0, 1) = 1 (Matches 1 ⊕ 0 = 1)" },
      { A: 1, B: 1, N1: 0, N2: 1, N3: 1, out: 0, check: "NAND(1, 1) = 0 (Matches 1 ⊕ 1 = 0)" }
    ]
  },

  fiveNorDerivation: {
    title: "5-NOR Implementation of XOR",
    description: "Synthesizing XOR using NOR gates requires 5 two-input NOR gates. The first 4 NOR gates naturally synthesize the XNOR equivalence function, and the fifth NOR gate inverts XNOR to produce XOR.",
    equations: [
      {
        gate: "Gate 1 (Central Sum)",
        symbol: "R1",
        formula: "R1 = NOR(A, B) = (A + B)' = A'B'",
        explanation: "Computes NOR of primary inputs."
      },
      {
        gate: "Gate 2 (Upper Leg)",
        symbol: "R2",
        formula: "R2 = NOR(A, R1) = [A + (A + B)']' = [A + A'B']' = [(A + A')(A + B')]' = [1 · (A + B')]' = (A + B')' = A'B",
        explanation: "Computes the product term A'B."
      },
      {
        gate: "Gate 3 (Lower Leg)",
        symbol: "R3",
        formula: "R3 = NOR(B, R1) = [B + (A + B)']' = [B + A'B']' = [(B + B')(B + A')]' = [1 · (A' + B)]' = (A' + B)' = AB'",
        explanation: "Computes the product term AB'."
      },
      {
        gate: "Gate 4 (XNOR Stage)",
        symbol: "R4",
        formula: "R4 = NOR(R2, R3) = [A'B + AB']' = (A ⊕ B)' = XNOR",
        explanation: "Combines legs into the XNOR equivalence function."
      },
      {
        gate: "Gate 5 (Inverter Stage)",
        symbol: "R5 (XOR)",
        formula: "R5 = NOR(R4, R4) = (R4)' = ((A ⊕ B)')' = A ⊕ B",
        explanation: "Inverts XNOR to produce the final XOR function."
      }
    ],
    stateTracingTable: [
      { A: 0, B: 0, R1: 1, R2: 0, R3: 0, R4: 1, out: 0, check: "NOR(1, 1) = 0 (Matches 0 ⊕ 0 = 0)" },
      { A: 0, B: 1, R1: 0, R2: 1, R3: 0, R4: 0, out: 1, check: "NOR(0, 0) = 1 (Matches 0 ⊕ 1 = 1)" },
      { A: 1, B: 0, R1: 0, R2: 0, R3: 1, R4: 0, out: 1, check: "NOR(0, 0) = 1 (Matches 1 ⊕ 0 = 1)" },
      { A: 1, B: 1, R1: 0, R2: 0, R3: 0, R4: 1, out: 0, check: "NOR(1, 1) = 0 (Matches 1 ⊕ 1 = 0)" }
    ]
  },

  workedModels: [
    {
      id: "WM2.7-01",
      difficulty: "Basic",
      target: "Prove algebraically that A ⊕ 1 = A' and A ⊕ 0 = A",
      solutionSteps: [
        { step: 1, expr: "A ⊕ B = A'B + AB'", rule: "XOR Definition", reason: "Standard canonical SOP formula." },
        { step: 2, expr: "For B = 0: A ⊕ 0 = A'(0) + A(0') = 0 + A(1) = A", rule: "Null & Identity Laws", reason: "0 is the identity element for XOR. An XOR gate with one input tied to 0 acts as a non-inverting buffer." },
        { step: 3, expr: "For B = 1: A ⊕ 1 = A'(1) + A(1') = A'(1) + A(0) = A' + 0 = A'", rule: "Identity & Null Laws", reason: "1 is the inverting element for XOR. An XOR gate with one input tied to 1 acts as a programmable inverter." }
      ],
      finalResult: "A ⊕ 0 = A | A ⊕ 1 = A' (Q.E.D.)",
      verificationNote: "Demonstrates how XOR gates are used as programmable inverters in ALU subtraction circuits."
    },
    {
      id: "WM2.7-02",
      difficulty: "Basic",
      target: "Prove that x ⊕ y = (x + y)(x' + y') [POS formulation]",
      solutionSteps: [
        { step: 1, expr: "Expand the POS product: (x + y)(x' + y') = xx' + xy' + x'y + yy'", rule: "Distributive Law", reason: "Multiply out all terms." },
        { step: 2, expr: "= 0 + xy' + x'y + 0", rule: "Complement Law", reason: "xx' = 0 and yy' = 0." },
        { step: 3, expr: "= x'y + xy'", rule: "Identity Law", reason: "0 is identity for OR." },
        { step: 4, expr: "= x ⊕ y", rule: "Definition of XOR", reason: "Q.E.D. Matches standard canonical SOP." }
      ],
      finalResult: "x ⊕ y = (x + y)(x' + y')",
      verificationNote: "Provides the 2-level OR-AND realization of XOR."
    },
    {
      id: "WM2.7-03",
      difficulty: "Intermediate",
      target: "Simplify the multi-variable XOR expression: F = A ⊕ B ⊕ A ⊕ B ⊕ C",
      solutionSteps: [
        { step: 1, expr: "Apply Commutative Law to group identical variables: F = (A ⊕ A) ⊕ (B ⊕ B) ⊕ C", rule: "Commutative & Associative", reason: "XOR terms can be reordered freely." },
        { step: 2, expr: "Apply Self-Annihilation Law (x ⊕ x = 0): A ⊕ A = 0, and B ⊕ B = 0", rule: "Self-Annihilation", reason: "Any variable XORed with itself is 0." },
        { step: 3, expr: "Substitute: F = 0 ⊕ 0 ⊕ C", rule: "Substitution", reason: "Replaces identical pairs with 0." },
        { step: 4, expr: "Apply Identity Law (0 ⊕ C = C): F = C", rule: "Identity Law", reason: "Final result simplifies to C." }
      ],
      finalResult: "F = C",
      verificationNote: "In any XOR chain, variables appearing an even number of times cancel out completely; variables appearing an odd number of times remain once."
    },
    {
      id: "WM2.7-04",
      difficulty: "Intermediate",
      target: "Derive the intermediate node expressions for the 4-NAND XOR circuit and verify when A=1, B=0",
      solutionSteps: [
        { step: 1, expr: "Node N1 = NAND(1, 0) = (1 · 0)' = (0)' = 1", rule: "Gate 1", reason: "Output of central NAND is 1." },
        { step: 2, expr: "Node N2 = NAND(A, N1) = NAND(1, 1) = (1 · 1)' = 0", rule: "Gate 2", reason: "Upper leg evaluates to 0." },
        { step: 3, expr: "Node N3 = NAND(B, N1) = NAND(0, 1) = (0 · 1)' = 1", rule: "Gate 3", reason: "Lower leg evaluates to 1." },
        { step: 4, expr: "Output N4 = NAND(N2, N3) = NAND(0, 1) = (0 · 1)' = 1", rule: "Gate 4", reason: "Final output is 1." },
        { step: 5, expr: "Check against truth table: 1 ⊕ 0 = 1", rule: "Truth table match", reason: "Matches exactly." }
      ],
      finalResult: "N1 = 1, N2 = 0, N3 = 1, N4 = 1",
      verificationNote: "Confirms complete signal integrity across all four gates."
    },
    {
      id: "WM2.7-05",
      difficulty: "Advanced",
      target: "Derive the 3-variable XOR truth table F(A, B, C) = A ⊕ B ⊕ C and identify its canonical minterms",
      solutionSteps: [
        { step: 1, expr: "Compute for all 8 input combinations:\n000: 0 ⊕ 0 ⊕ 0 = 0\n001: 0 ⊕ 0 ⊕ 1 = 1 (m1)\n010: 0 ⊕ 1 ⊕ 0 = 1 (m2)\n011: 0 ⊕ 1 ⊕ 1 = 0\n100: 1 ⊕ 0 ⊕ 0 = 1 (m4)\n101: 1 ⊕ 0 ⊕ 1 = 0\n110: 1 ⊕ 1 ⊕ 0 = 0\n111: 1 ⊕ 1 ⊕ 1 = 1 (m7)", rule: "Evaluation", reason: "Outputs 1 when the count of 1s in the input vector is odd (1 or 3)." },
        { step: 2, expr: "Canonical minterm set: Sigma m(1, 2, 4, 7)", rule: "Minterm list", reason: "The four odd-parity indices." },
        { step: 3, expr: "Canonical SOP = A'B'C + A'BC' + AB'C' + ABC", rule: "Sum of minterms", reason: "This is the classic odd-parity generation function." }
      ],
      finalResult: "A ⊕ B ⊕ C = Sigma m(1, 2, 4, 7)",
      verificationNote: "In a 3-variable K-Map, the 1s at {1, 2, 4, 7} form a complete checkerboard where no two 1s are adjacent. It is completely irreducible in standard 2-level AND-OR logic."
    },
    {
      id: "WM2.7-06",
      difficulty: "Advanced",
      target: "Prove why an n-variable XOR function cannot be minimized on a Karnaugh map",
      solutionSteps: [
        { step: 1, expr: "An n-variable XOR function evaluates to 1 if and only if the Hamming weight (number of 1-bits) of the input combination is odd.", rule: "Definition", reason: "Parity definition." },
        { step: 2, expr: "Two cells in a K-Map are adjacent if and only if their binary indices differ by exactly 1 bit.", rule: "Adjacency principle", reason: "Hamming distance = 1." },
        { step: 3, expr: "Changing exactly 1 bit in any binary word toggles its parity from odd to even, or from even to odd.", rule: "Parity transition theorem", reason: "Adding or subtracting 1 bit changes odd count to even count." },
        { step: 4, expr: "Therefore, every cell adjacent to an odd-parity cell (1) must be an even-parity cell (0).", rule: "Non-adjacency proof", reason: "No two cells where F = 1 are ever adjacent in the K-Map." },
        { step: 5, expr: "Since no 1-cells are adjacent, no groups of size 2 or larger can ever be formed. All groups remain singletons of size 1.", rule: "Minimization conclusion", reason: "Q.E.D. XOR produces an irreducible checkerboard pattern." }
      ],
      finalResult: "XOR is structurally irreducible in 2-level AND-OR logic (checkerboard property)",
      verificationNote: "Explains why XOR must be realized using specialized dedicated XOR hardware rather than AND-OR arrays."
    }
  ],

  examTraps: [
    {
      trap: "Confusing XOR with ordinary OR when both inputs are 1",
      explanation: "For inputs (1, 1): Ordinary OR gives 1 + 1 = 1. But Exclusive-OR gives 1 ⊕ 1 = 0! Confusing these results in immediate exam errors."
    },
    {
      trap: "Assuming XOR distributes over AND",
      explanation: "A ⊕ (BC) is NOT equal to (A ⊕ B)(A ⊕ C). Unlike standard Boolean operations, XOR does NOT distribute over AND."
    },
    {
      trap: "Writing the 4-NAND XOR circuit with 5 gates",
      explanation: "A common exam question asks for the minimum number of NAND gates for XOR. Answering 5 gates loses marks. The correct optimal answer is 4 NAND gates."
    }
  ],

  practiceExercises: [
    {
      id: "PE2.7-01",
      question: "Simplify: F = X ⊕ X ⊕ Y ⊕ Y ⊕ Z",
      answer: "F = Z",
      steps: "(X ⊕ X) = 0, (Y ⊕ Y) = 0. Then 0 ⊕ 0 ⊕ Z = Z."
    },
    {
      id: "PE2.7-02",
      question: "How many 2-input NOR gates are required to implement the Exclusive-OR function?",
      answer: "5 NOR gates",
      steps: "4 NOR gates synthesize XNOR, and a 5th NOR gate inverts XNOR to XOR."
    },
    {
      id: "PE2.7-03",
      question: "If A ⊕ B = 0, what can be deduced about inputs A and B?",
      answer: "A and B are identical (A = B)",
      steps: "XOR is 0 when both inputs are identical (0 ⊕ 0 = 0 and 1 ⊕ 1 = 0)."
    }
  ]
};

export default dldSection27Data;
