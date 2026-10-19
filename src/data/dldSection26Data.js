/**
 * Digital Logic Design (DLD) - Section 2.6 Data Module
 * Gate-Level Minimization and NAND/NOR Implementation
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const dldSection26Data = {
  id: "2.6",
  number: "2.6",
  title: "Gate-Level Minimization and NAND/NOR Implementation",
  badge: "Universal Hardware Synthesis",
  status: "Available",
  estimatedReadTime: "18 min read",
  dataScienceConnection: "In edge AI hardware accelerators and neuromorphic computing, silicon area and energy efficiency are dictated by the underlying transistor implementation. CMOS technology implements inverting gates (NAND and NOR) natively with fewer transistors, faster propagation delays, and lower capacitance than non-inverting AND/OR gates. Universal NAND/NOR mapping is the essential bridge between abstract algorithmic logic and physical silicon layouts.",

  overview: "Gate-level minimization bridges abstract Boolean algebra and physical digital electronics. While AND, OR, and NOT gates are conceptually straightforward, practical CMOS semiconductor fabrication relies overwhelmingly on NAND and NOR gates. NAND and NOR gates are universal gates capable of synthesizing any arbitrary switching function without requiring any other gate type. Furthermore, CMOS inverting gates require fewer transistors (4 transistors for a 2-input CMOS NAND versus 6 transistors for a 2-input CMOS AND which requires an internal inverter). This section establishes hardware cost metrics (literal count, gate count, fan-in, logic levels), demonstrates universal gate constructions, and details systematic rules for synthesizing 2-level NAND-NAND and NOR-NOR networks using De Morgan transformations and bubble pushing.",

  learningOutcomes: [
    "Define hardware minimization metrics: literal count, gate count, gate fan-in, and logic levels (propagation delay).",
    "Prove the functional completeness of NAND and NOR gates by synthesizing NOT, AND, and OR operations.",
    "Convert any 2-level Sum of Products (SOP) expression into an equivalent 2-level NAND-NAND network.",
    "Convert any 2-level Product of Sums (POS) expression into an equivalent 2-level NOR-NOR network.",
    "Apply bubble pushing and graphical De Morgan transformations to trace signal polarity through multi-level networks."
  ],

  costMetrics: [
    {
      metric: "Literal Count",
      definition: "Total number of primed and unprimed variable instances in the expression.",
      impact: "Directly determines the total number of wiring connections and input terminals in the circuit."
    },
    {
      metric: "Gate Count",
      definition: "Total number of physical logic gate packages required on the board or silicon die.",
      impact: "Affects PCB area, packaging cost, and component procurement."
    },
    {
      metric: "Gate Fan-in",
      definition: "The number of inputs connected to a single gate.",
      impact: "Gates with high fan-in (e.g. 8-input NAND) suffer from degraded noise margins and slower switching times. Real-world libraries often limit fan-in to 4."
    },
    {
      metric: "Logic Levels (Propagation Delay)",
      definition: "The maximum number of gates in series from any primary input to the final primary output.",
      impact: "Dictates the critical path delay and the maximum operating clock frequency of the digital system. A 2-level network has a latency of 2 gate delays."
    }
  ],

  universalGateConstructions: {
    nandUniversal: [
      {
        targetGate: "NOT Gate (Inverter)",
        inputs: "A",
        construction: "Tie both inputs of a 2-input NAND gate together: NAND(A, A) = (A · A)' = A'. Alternatively, connect the second input to constant Logic 1: NAND(A, 1) = (A · 1)' = A'.",
        gatesUsed: 1,
        truthTable: [
          { A: 0, out: 1 },
          { A: 1, out: 0 }
        ]
      },
      {
        targetGate: "AND Gate",
        inputs: "A, B",
        construction: "A 2-input NAND followed by a NAND inverter: Gate 1 = NAND(A, B) = (AB)'. Gate 2 = NAND(Gate 1, Gate 1) = ((AB)')' = AB.",
        gatesUsed: 2,
        truthTable: [
          { A: 0, B: 0, out: 0 },
          { A: 0, B: 1, out: 0 },
          { A: 1, B: 0, out: 0 },
          { A: 1, B: 1, out: 1 }
        ]
      },
      {
        targetGate: "OR Gate",
        inputs: "A, B",
        construction: "Invert both inputs using NAND inverters, then pass to a third NAND: Gate 1 = NAND(A, A) = A'. Gate 2 = NAND(B, B) = B'. Gate 3 = NAND(Gate 1, Gate 2) = (A' · B')' = (A')' + (B')' = A + B by De Morgan's theorem.",
        gatesUsed: 3,
        truthTable: [
          { A: 0, B: 0, out: 0 },
          { A: 0, B: 1, out: 1 },
          { A: 1, B: 0, out: 1 },
          { A: 1, B: 1, out: 1 }
        ]
      }
    ],
    norUniversal: [
      {
        targetGate: "NOT Gate (Inverter)",
        inputs: "A",
        construction: "Tie both inputs of a 2-input NOR gate together: NOR(A, A) = (A + A)' = A'. Alternatively, connect the second input to constant Logic 0: NOR(A, 0) = (A + 0)' = A'.",
        gatesUsed: 1,
        truthTable: [
          { A: 0, out: 1 },
          { A: 1, out: 0 }
        ]
      },
      {
        targetGate: "OR Gate",
        inputs: "A, B",
        construction: "A 2-input NOR followed by a NOR inverter: Gate 1 = NOR(A, B) = (A + B)'. Gate 2 = NOR(Gate 1, Gate 1) = ((A + B)')' = A + B.",
        gatesUsed: 2,
        truthTable: [
          { A: 0, B: 0, out: 0 },
          { A: 0, B: 1, out: 1 },
          { A: 1, B: 0, out: 1 },
          { A: 1, B: 1, out: 1 }
        ]
      },
      {
        targetGate: "AND Gate",
        inputs: "A, B",
        construction: "Invert both inputs using NOR inverters, then pass to a third NOR: Gate 1 = NOR(A, A) = A'. Gate 2 = NOR(B, B) = B'. Gate 3 = NOR(Gate 1, Gate 2) = (A' + B')' = (A')' · (B')' = A · B by De Morgan's theorem.",
        gatesUsed: 3,
        truthTable: [
          { A: 0, B: 0, out: 0 },
          { A: 0, B: 1, out: 0 },
          { A: 1, B: 0, out: 0 },
          { A: 1, B: 1, out: 1 }
        ]
      }
    ]
  },

  bubblePushingRules: [
    {
      name: "NAND Equivalent Symbol",
      description: "An AND gate with an inversion bubble on its output is functionally identical to an OR gate with inversion bubbles on its inputs (Invert-OR). Mathematical basis: (AB)' = A' + B'."
    },
    {
      name: "NOR Equivalent Symbol",
      description: "An OR gate with an inversion bubble on its output is functionally identical to an AND gate with inversion bubbles on its inputs (Invert-AND). Mathematical basis: (A + B)' = A'B'."
    },
    {
      name: "Bubble Cancellation",
      description: "Two inversion bubbles directly connected on the same signal line cancel each other out by the Involution Law: (x')' = x."
    }
  ],

  workedModels: [
    {
      id: "WM2.6-01",
      difficulty: "Basic",
      target: "Syllabus Required Example: Implement F = AB + CD using NAND gates only",
      solutionSteps: [
        { step: 1, expr: "Original expression is in 2-level AND-OR form: F = AB + CD", rule: "SOP form", reason: "Product terms AB and CD combined with OR." },
        { step: 2, expr: "Apply double complement (Involution): F = (F)'' = (AB + CD)''", rule: "Involution Law", reason: "Double negation leaves logic value unchanged." },
        { step: 3, expr: "Apply De Morgan's theorem to the inner complement: F = [(AB)' · (CD)']'", rule: "De Morgan's Theorem", reason: "(x + y)' = x' · y' where x = AB, y = CD." },
        { step: 4, expr: "Identify physical NAND gates:\nLevel 1 Gate 1: N1 = NAND(A, B) = (AB)'\nLevel 1 Gate 2: N2 = NAND(C, D) = (CD)'\nLevel 2 Gate 3: F = NAND(N1, N2) = [N1 · N2]' = [(AB)' · (CD)']'", rule: "NAND mapping", reason: "Level 1 NANDs generate complemented product terms; Level 2 NAND inverts the product of complements back into sum of products." }
      ],
      finalResult: "N1 = NAND(A, B), N2 = NAND(C, D), F = NAND(N1, N2) (3 NAND gates total)",
      verificationNote: "Gate count is 3 gates, identical to the 2 AND + 1 OR count. Propagation delay is 2 gate delays."
    },
    {
      id: "WM2.6-02",
      difficulty: "Basic",
      target: "Syllabus Required Example: Implement F = (A + B)(C + D) using NOR gates only",
      solutionSteps: [
        { step: 1, expr: "Original expression is in 2-level OR-AND form: F = (A + B)(C + D)", rule: "POS form", reason: "Sum terms (A + B) and (C + D) combined with AND." },
        { step: 2, expr: "Apply double complement: F = [(A + B)(C + D)]''", rule: "Involution Law", reason: "Preserves exact Boolean function." },
        { step: 3, expr: "Apply De Morgan's theorem to the inner complement: F = [(A + B)' + (C + D)']'", rule: "De Morgan's Theorem", reason: "(x · y)' = x' + y' where x = (A + B), y = (C + D)." },
        { step: 4, expr: "Identify physical NOR gates:\nLevel 1 Gate 1: R1 = NOR(A, B) = (A + B)'\nLevel 1 Gate 2: R2 = NOR(C, D) = (C + D)'\nLevel 2 Gate 3: F = NOR(R1, R2) = [R1 + R2]' = [(A + B)' + (C + D)']'", rule: "NOR mapping", reason: "Level 1 NORs generate complemented sum terms; Level 2 NOR inverts the sum of complements back into product of sums." }
      ],
      finalResult: "R1 = NOR(A, B), R2 = NOR(C, D), F = NOR(R1, R2) (3 NOR gates total)",
      verificationNote: "Gate count is 3 gates. A direct dual of the 2-level NAND implementation."
    },
    {
      id: "WM2.6-03",
      difficulty: "Intermediate",
      target: "Implement F(A, B, C) = A + BC' using NAND gates only (assuming complemented inputs are NOT directly available)",
      solutionSteps: [
        { step: 1, expr: "Since C' is not directly available, synthesize C' using a NAND inverter: N_inv = NAND(C, C) = C'", rule: "Inverter synthesis", reason: "1 NAND gate used as inverter." },
        { step: 2, expr: "Level 1: Gate N1 = NAND(B, N_inv) = (B · C')'", rule: "NAND product", reason: "Computes complement of BC'." },
        { step: 3, expr: "Single literal A feeds directly to Level 2. But Level 2 expects complemented input from Level 1! So pass A through a NAND inverter or invert at Level 2: Invert A: N_A = NAND(A, A) = A'", rule: "Literal balancing", reason: "To maintain correct polarity in 2-level NAND synthesis, single literals must be inverted before entering the output NAND." },
        { step: 4, expr: "Level 2: F = NAND(N_A, N1) = [A' · (BC')']' = (A')' + ((BC')')' = A + BC'", rule: "Output combination", reason: "By De Morgan's theorem, output is exactly A + BC'." }
      ],
      finalResult: "Total: 4 NAND gates (2 inverters, 1 product NAND, 1 output NAND)",
      verificationNote: "If complemented inputs are available as primary inputs, only 2 NAND gates are required: N1 = NAND(B, C') and F = NAND(A', N1) with A' inverted."
    },
    {
      id: "WM2.6-04",
      difficulty: "Intermediate",
      target: "Implement F(A, B, C) = (A + B')(B + C) using NOR gates only (assuming complemented inputs NOT available)",
      solutionSteps: [
        { step: 1, expr: "Synthesize B' using a NOR inverter: R_inv = NOR(B, B) = B'", rule: "NOR inverter", reason: "1 NOR gate to generate complement." },
        { step: 2, expr: "Level 1: Gate R1 = NOR(A, R_inv) = (A + B')'", rule: "NOR sum term", reason: "First sum factor complemented." },
        { step: 3, expr: "Level 1: Gate R2 = NOR(B, C) = (B + C)'", rule: "NOR sum term", reason: "Second sum factor complemented." },
        { step: 4, expr: "Level 2: F = NOR(R1, R2) = [R1 + R2]' = [(A + B')' + (B + C)']' = (A + B')(B + C)", rule: "Output combination", reason: "Inverts sum of complements to product of sums by De Morgan." }
      ],
      finalResult: "Total: 4 NOR gates (1 inverter, 2 Level-1 NORs, 1 Level-2 output NOR)",
      verificationNote: "Complements handled systematically with no stray inversions."
    },
    {
      id: "WM2.6-05",
      difficulty: "Intermediate",
      target: "Prove that a 2-level AND-OR circuit is functionally identical to a 2-level NAND-NAND circuit using bubble pushing",
      solutionSteps: [
        { step: 1, expr: "Start with 2-level AND-OR: AND gates in Level 1 feeding an OR gate in Level 2.", rule: "Initial schematic", reason: "Standard SOP circuit." },
        { step: 2, expr: "Add an inversion bubble to the output of each Level 1 AND gate (turning them into NAND gates).", rule: "Bubble insertion", reason: "Inverts the intermediate signals." },
        { step: 3, expr: "To compensate, add inversion bubbles to each input of the Level 2 OR gate.", rule: "Bubble compensation", reason: "Two bubbles on the same wire cancel: (x')' = x." },
        { step: 4, expr: "By De Morgan's graphical equivalence, an OR gate with inversion bubbles on its inputs is identically a NAND gate: (x' + y') = (xy)'.", rule: "De Morgan graphic rule", reason: "The bubble-input OR gate becomes an ordinary NAND gate." },
        { step: 5, expr: "Conclusion: Both levels now consist entirely of NAND gates.", rule: "Equivalence established", reason: "Q.E.D. AND-OR is identical to NAND-NAND." }
      ],
      finalResult: "AND-OR = NAND-NAND (proved by bubble pushing)",
      verificationNote: "Similarly, OR-AND is identically equivalent to NOR-NOR."
    },
    {
      id: "WM2.6-06",
      difficulty: "Advanced",
      target: "Synthesize the 3-variable majority function F(A, B, C) = AB + BC + AC using minimum number of 2-input NAND gates (complements available)",
      solutionSteps: [
        { step: 1, expr: "Expression has 3 product terms: AB, BC, AC", rule: "SOP form", reason: "Majority logic outputs 1 when 2 or 3 inputs are 1." },
        { step: 2, expr: "Standard 2-level NAND: N1 = NAND(A, B), N2 = NAND(B, C), N3 = NAND(A, C)", rule: "Level 1 NANDs", reason: "3 two-input NAND gates." },
        { step: 3, expr: "Output requires a 3-input NAND: F = NAND(N1, N2, N3). If only 2-input NAND gates are permitted, synthesize 3-input NAND using two 2-input NANDs and one inverter:\nGate 4 = NAND(N1, N2)\nGate 5 = NAND(Gate 4, Gate 4) [Inverter -> AND]\nGate 6 = NAND(Gate 5, N3) = F", rule: "Gate library constraint", reason: "Standard library mapping." }
      ],
      finalResult: "With 3-input NAND: 4 NAND gates. With 2-input NANDs only: 6 NAND gates.",
      verificationNote: "Demonstrates fan-in constraint handling in real ASIC cell libraries."
    },
    {
      id: "WM2.6-07",
      difficulty: "Advanced",
      target: "Synthesize F = A'B + AB' (XOR) using 2-level NAND gates and calculate gate count",
      solutionSteps: [
        { step: 1, expr: "Term 1: N1 = NAND(A', B) = (A'B)'", rule: "Level 1 NAND", reason: "First product term." },
        { step: 2, expr: "Term 2: N2 = NAND(A, B') = (AB')'", rule: "Level 1 NAND", reason: "Second product term." },
        { step: 3, expr: "Output: F = NAND(N1, N2) = [(A'B)' · (AB')']' = A'B + AB'", rule: "Level 2 NAND", reason: "Combines products into sum." },
        { step: 4, expr: "If inverters for A' and B' are counted: 2 inverters + 3 NAND gates = 5 gates total.", rule: "Hardware count", reason: "Requires 5 gates if implemented via brute-force 2-level SOP." }
      ],
      finalResult: "5 gates in standard 2-level synthesis (Section 2.7 introduces a clever 4-NAND realization)",
      verificationNote: "Highlights the transition to Section 2.7 specialized XOR synthesis."
    },
    {
      id: "WM2.6-08",
      difficulty: "Advanced",
      target: "Multi-level NAND mapping: Convert F = A(BC + D) + E into a multi-level NAND circuit",
      solutionSteps: [
        { step: 1, expr: "Construct gate tree from inside out:\nG1 = AND(B, C) -> NAND(B, C) with bubble\nG2 = OR(G1, D) -> Invert-OR with bubble\nG3 = AND(A, G2)\nG4 = OR(G3, E) = F", rule: "Logic decomposition", reason: "4-level mixed structure." },
        { step: 2, expr: "Bubble pushing algorithm:\n1. Replace every AND with NAND (bubble on output).\n2. Replace every OR with Invert-OR (bubbles on inputs).\n3. Cancel adjacent bubbles on connecting wires.\n4. For any wire with an unmatched bubble, insert an inverter.", rule: "Systematic transformation", reason: "Guarantees exact phase preservation." },
        { step: 3, expr: "Resulting NAND network:\nN1 = NAND(B, C)\nN2 = NAND(N1', D') [or equivalent OR mapping]\nN3 = NAND(A, N2)\nF = NAND(N3', E')", rule: "Final netlist", reason: "Multi-level logic depth is 4 gate delays." }
      ],
      finalResult: "Multi-level NAND circuit with balanced polarities",
      verificationNote: "Demonstrates advanced bubble pushing on non-2-level expressions."
    }
  ],

  examTraps: [
    {
      trap: "Forgetting to invert single literals entering a Level-2 NAND gate",
      explanation: "In F = A + BC, passing A directly to Level 2 yields (A · (BC)')' = A' + BC, which is INCORRECT! Literal A must be inverted to A' before feeding the output NAND, so that (A' · (BC)')' = A + BC."
    },
    {
      trap: "Confusing NAND-NAND with NOR-NOR",
      explanation: "NAND-NAND directly implements Sum of Products (AND-OR). NOR-NOR directly implements Product of Sums (OR-AND). Attempting to implement SOP with NOR-NOR requires additional inverters at every input and output."
    },
    {
      trap: "Assuming universal gates require more silicon than AND/OR gates",
      explanation: "In CMOS fabrication, NAND and NOR gates are smaller, faster, and consume less power than AND and OR gates because CMOS naturally inverts signals."
    }
  ],

  practiceExercises: [
    {
      id: "PE2.6-01",
      question: "How many 2-input NAND gates are required to construct an OR gate?",
      answer: "3 NAND gates",
      steps: "2 NAND inverters for A' and B', plus 1 NAND gate to combine them: (A'B')' = A + B."
    },
    {
      id: "PE2.6-02",
      question: "How many 2-input NOR gates are required to construct an AND gate?",
      answer: "3 NOR gates",
      steps: "2 NOR inverters for A' and B', plus 1 NOR gate to combine them: (A' + B')' = AB."
    },
    {
      id: "PE2.6-03",
      question: "In a 2-level NAND network implementing F = XY + ZW, what is the expression at the output of the first-level NAND gate for term XY?",
      answer: "(XY)' = X' + Y'",
      steps: "A NAND gate computes the complement of the AND product."
    }
  ]
};

export default dldSection26Data;
