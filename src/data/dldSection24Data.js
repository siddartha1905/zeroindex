/**
 * Digital Logic Design (DLD) - Section 2.4 Data Module
 * SOP and POS Forms, Conversions and Simplification
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 * All canonical expressions use actual Unicode symbols: \u03A3 (Sigma) and \u03A0 (Pi).
 */

export const dldSection24Data = {
  id: "2.4",
  number: "2.4",
  title: "SOP and POS Forms, Conversions and Simplification",
  badge: "Form Transformation",
  status: "Available",
  estimatedReadTime: "24 min read",
  dataScienceConnection: "In Boolean satisfiability (SAT) solvers and automated verification engines such as Z3, formulas must be converted into Conjunctive Normal Form (CNF, identical to POS) or Disjunctive Normal Form (DNF, identical to SOP). Modern DPLL algorithms leverage the clause structure of POS expressions to execute unit propagation, conflict-driven clause learning, and search tree pruning at microsecond scale.",

  overview: "Any switching function can be realized in two dual standard architectures: Sum of Products (SOP), where product terms are ORed together in a 2-level AND-OR network, and Product of Sums (POS), where sum terms are ANDed together in a 2-level OR-AND network. While canonical forms explicitly list every minterm or maxterm, engineering practice often requires converting expressions between forms to simplify gate structures, match physical gate libraries, or prepare for Karnaugh Map minimization. This lesson teaches systematic algebraic conversion, missing-variable expansion, index complementation, and rigorous equivalence verification.",

  learningOutcomes: [
    "Differentiate clearly between general SOP, canonical SOP, general POS, and canonical POS.",
    "Expand general SOP and POS expressions into canonical forms by introducing missing variables algebraically.",
    "Convert directly between Canonical SOP (Σm) and Canonical POS (ΠM) using complementary index sets.",
    "Transform general SOP into general POS using factoring and distributive laws, and vice versa.",
    "Distinguish between converting an expression to an alternate form of F and complementing F to obtain F'.",
    "Evaluate gate costs, literal counts, and structural trade-offs under explicit hardware assumptions.",
    "Apply the 6-stage problem-solving roadmap to solve complex multi-variable exam problems independently."
  ],

  // --------------------------------------------------------------------------
  // TAB 1: START HERE DATA
  // --------------------------------------------------------------------------
  startHere: {
    title: "WHY Do We Convert Between SOP and POS Forms?",
    centralQuestion: "If the output is the same, why do we represent the function in different forms?",
    
    whyReasons: [
      {
        keyword: "Equivalent behavioral descriptions",
        detail: "SOP and POS provide two mathematically equivalent perspectives on the same truth table: SOP aggregates the 1-output conditions, while POS specifies the boundary constraints that exclude the 0-output conditions."
      },
      {
        keyword: "Application and question compliance",
        detail: "Examination specifications, programmable logic array (PLA/PAL) architectures, and automated logic synthesis tools often prescribe an exact input format such as CNF or DNF."
      },
      {
        keyword: "Matching physical gate libraries",
        detail: "Standard ASIC cells or FPGA lookup tables may favor NAND-NAND (naturally derived from SOP) or NOR-NOR (naturally derived from POS) implementations depending on semiconductor technology."
      },
      {
        keyword: "Unlocking algebraic simplification",
        detail: "Some Boolean functions resist easy simplification in SOP form, but become trivial to minimize once converted into POS form using distributive factoring."
      },
      {
        keyword: "Hardware trade-off comparison",
        detail: "Comparing minimal SOP and minimal POS allows digital engineers to select the implementation with fewer gates, lower literal counts, or simpler wiring."
      },
      {
        keyword: "Foundation for K-Maps and tabular synthesis",
        detail: "Systematic minimization algorithms (such as Karnaugh Maps in Section 2.5 and Quine-McCluskey) require expressions to be mapped to exact minterm or maxterm indices."
      }
    ],

    hardwareQualification: {
      title: "Crucial Engineering Qualification on Gate Optimization",
      points: [
        "Converting an expression into canonical form does NOT minimize hardware. Canonical forms explicitly expand terms to full length, often increasing gate count.",
        "An expression with fewer written characters or terms does NOT automatically guarantee lower silicon area, power consumption, or propagation delay.",
        "A valid hardware comparison must explicitly define the gate library, permitted gate fan-in, whether inverted inputs are freely available, and whether multi-input gates are counted as single units."
      ]
    },

    primaryDemonstration: {
      title: "One Boolean Function in Dual Forms",
      functionSOP: "F(A, B, C) = AB + C",
      functionPOS: "F(A, B, C) = (A + C)(B + C)",
      algebraicProof: [
        { step: 1, expr: "(A + C)(B + C)", note: "Given POS expression" },
        { step: 2, expr: "= AB + AC + BC + CC", note: "Distribute each literal across parentheses" },
        { step: 3, expr: "= AB + AC + BC + C", note: "Idempotent Law: CC = C" },
        { step: 4, expr: "= AB + (A + B + 1)C", note: "Factor out C from AC + BC + C" },
        { step: 5, expr: "= AB + (1)C = AB + C", note: "Null Law (1 + X = 1) and Identity Law (1 · C = C). Q.E.D." }
      ],
      truthTable: [
        { row: 0, A: 0, B: 0, C: 0, AB: 0, F_SOP: 0, AC: 0, BC: 0, F_POS: 0, match: true },
        { row: 1, A: 0, B: 0, C: 1, AB: 0, F_SOP: 1, AC: 1, BC: 1, F_POS: 1, match: true },
        { row: 2, A: 0, B: 1, C: 0, AB: 0, F_SOP: 0, AC: 0, BC: 1, F_POS: 0, match: true },
        { row: 3, A: 0, B: 1, C: 1, AB: 0, F_SOP: 1, AC: 1, BC: 1, F_POS: 1, match: true },
        { row: 4, A: 1, B: 0, C: 0, AB: 0, F_SOP: 0, AC: 1, BC: 0, F_POS: 0, match: true },
        { row: 5, A: 1, B: 0, C: 1, AB: 0, F_SOP: 1, AC: 1, BC: 1, F_POS: 1, match: true },
        { row: 6, A: 1, B: 1, C: 0, AB: 1, F_SOP: 1, AC: 1, BC: 1, F_POS: 1, match: true },
        { row: 7, A: 1, B: 1, C: 1, AB: 1, F_SOP: 1, AC: 1, BC: 1, F_POS: 1, match: true }
      ],
      canonicalSOP: "F(A, B, C) = Σm(1, 3, 5, 6, 7)",
      canonicalPOS: "F(A, B, C) = ΠM(0, 2, 4)"
    },

    twoLevelTopologies: {
      sop: {
        title: "Sum of Products (SOP) Architecture",
        structure: "Inputs -> AND gates (First Level) -> OR gate (Second Level) -> Output F",
        example: "F = AB + CD",
        description: "Literals are combined by AND operations to create product terms. The outputs of these AND gates form the inputs to a single OR gate. In classic 2-level logic, inverted inputs are assumed to be supplied directly or inverted at level 0.",
        gateLevel: "AND-OR Network (Transforms directly to NAND-NAND logic)"
      },
      pos: {
        title: "Product of Sums (POS) Architecture",
        structure: "Inputs -> OR gates (First Level) -> AND gate (Second Level) -> Output F",
        example: "F = (A + B)(C + D)",
        description: "Literals are combined by OR operations to create sum terms. The outputs of these OR gates form the inputs to a single AND gate. This is the dual topology of the SOP network.",
        gateLevel: "OR-AND Network (Transforms directly to NOR-NOR logic)"
      }
    },

    problemSolvingRoadmap: [
      {
        stage: "READ",
        action: "Identify the given function, all declared input variables, and the requested output format.",
        detail: "Check whether variables are 2, 3, or 4 variables (e.g. F(A, B, C) vs F(A, B, C, D))."
      },
      {
        stage: "RECOGNIZE",
        action: "Classify the starting expression as general SOP, canonical SOP, general POS, or canonical POS.",
        detail: "Determine whether all product terms or sum terms contain every declared variable."
      },
      {
        stage: "CHOOSE",
        action: "Select the most direct conversion technique from the 8 approved methods.",
        detail: "Decide whether algebraic expansion, factoring, or index complementation is easiest."
      },
      {
        stage: "TRANSFORM",
        action: "Apply valid Boolean laws step by step, documenting each theorem applied.",
        detail: "Eliminate duplicates using Idempotent Law (X + X = X or X · X = X)."
      },
      {
        stage: "VERIFY",
        action: "Confirm equivalence across truth-table evaluations or algebraic back-substitution.",
        detail: "Ensure that rows where F=1 in SOP match rows where F=1 in the converted POS."
      },
      {
        stage: "CONCLUDE",
        action: "Write the final simplified or canonical expression in clean mathematical notation.",
        detail: "Use proper Σm(...) or ΠM(...) syntax with ascending index order."
      }
    ],

    curatedVideo: {
      key: "canonical-conversion",
      title: "Minimal to Canonical Form Conversion (Part 2)",
      publisher: "Neso Academy",
      duration: "10 min",
      note: "Highly recommended lecture demonstrating POS missing-literal expansion and canonical conversions."
    }
  },

  // --------------------------------------------------------------------------
  // TAB 2: CONVERSION METHODS DATA
  // --------------------------------------------------------------------------
  conversionMethods: [
    {
      id: "M01",
      name: "General SOP to Canonical SOP",
      whenRequired: "When a sum of product terms lacks one or more variables in its terms.",
      startForm: "General SOP (e.g., AB + C)",
      targetForm: "Canonical SOP (Σm notation)",
      mainRule: "T = T · 1 = T(X + X') [Complement & Identity Laws]",
      procedure: [
        "Identify all declared variables in the function domain.",
        "For each product term, identify which variables are missing.",
        "Multiply the product term by (X + X') for each missing variable X.",
        "Expand using the Distributive Law: T(X + X') = TX + TX'.",
        "If multiple variables are missing, repeat the expansion systematically.",
        "Remove all duplicate minterms using the Idempotent Law: m + m = m.",
        "Map each minterm to its binary code (1 for uncomplemented, 0 for complemented) and index.",
        "Write the expression in Σm(...) notation."
      ],
      example: {
        title: "Expand F(A, B, C) = AB + C to Canonical SOP",
        steps: [
          "AB lacks C: AB(C + C') = ABC + ABC'",
          "C lacks A and B: C(A + A')(B + B') = C(AB + AB' + A'B + A'B') = ABC + AB'C + A'BC + A'B'C",
          "Combine all terms: F = ABC + ABC' + ABC + AB'C + A'BC + A'B'C",
          "Deduplicate ABC: F = ABC + ABC' + AB'C + A'BC + A'B'C",
          "Binary mapping: 111(m7) + 110(m6) + 101(m5) + 011(m3) + 001(m1)",
          "Final form: F(A, B, C) = Σm(1, 3, 5, 6, 7)"
        ],
        result: "F(A, B, C) = Σm(1, 3, 5, 6, 7)"
      },
      commonMistake: "Adding (X + X') instead of multiplying by (X + X'). Remember product terms require multiplication by 1.",
      shortcut: "Count missing variables: k missing variables produce 2^k minterms."
    },
    {
      id: "M02",
      name: "General POS to Canonical POS",
      whenRequired: "When a product of sum terms lacks one or more variables in its factors.",
      startForm: "General POS (e.g., (A + B)(B' + C))",
      targetForm: "Canonical POS (ΠM notation)",
      mainRule: "T = T + 0 = T + XX' = (T + X)(T + X') [Distributive Law: T + YZ = (T+Y)(T+Z)]",
      procedure: [
        "Identify all declared variables in the function domain.",
        "For each sum term, identify which variables are missing.",
        "Add XX' to the sum term, where X is the missing variable.",
        "Apply the second Distributive Law: T + XX' = (T + X)(T + X').",
        "If multiple variables are missing, repeat for each missing variable.",
        "Remove duplicate maxterms using the Idempotent Law: M · M = M.",
        "Map each maxterm to its binary code (0 for uncomplemented, 1 for complemented) and index.",
        "Write the expression in ΠM(...) notation."
      ],
      example: {
        title: "Expand F(A, B, C) = (A + B)(B' + C) to Canonical POS",
        steps: [
          "(A + B) lacks C: (A + B) + CC' = (A + B + C)(A + B + C')",
          "(B' + C) lacks A: (B' + C) + AA' = (A + B' + C)(A' + B' + C)",
          "Combine: F = (A + B + C)(A + B + C')(A + B' + C)(A' + B' + C)",
          "No duplicates exist in this product.",
          "Binary mapping: 000(M0), 001(M1), 010(M2), 110(M6)",
          "Final form: F(A, B, C) = ΠM(0, 1, 2, 6)"
        ],
        result: "F(A, B, C) = ΠM(0, 1, 2, 6)"
      },
      commonMistake: "Multiplying sum terms by (X + X') instead of adding XX'. Sum terms require adding 0.",
      shortcut: "k missing variables in a sum term produce 2^k canonical maxterms."
    },
    {
      id: "M03",
      name: "Canonical SOP to Canonical POS",
      whenRequired: "When a function is given as a list of minterms and its maxterm representation is needed.",
      startForm: "Canonical SOP: F = Σm(S)",
      targetForm: "Canonical POS: F = ΠM(U \\ S)",
      mainRule: "F = ΠM(U \\ S) where U = {0, 1, ..., 2^n - 1}",
      procedure: [
        "Determine the universe of indices U based on the number of variables n: U = {0, 1, ..., 2^n - 1}.",
        "Identify the set of minterm indices S present in the SOP expression.",
        "Subtract S from U: the missing indices are U \\ S.",
        "Write the same function F directly using product-of-maxterms notation: F = ΠM(U \\ S)."
      ],
      example: {
        title: "Convert F(A, B, C) = Σm(1, 4, 5, 6, 7) to Canonical POS",
        steps: [
          "Variable domain: n = 3 variables -> U = {0, 1, 2, 3, 4, 5, 6, 7}",
          "Given minterm index set: S = {1, 4, 5, 6, 7}",
          "Complementary indices (where F = 0): U \\ S = {0, 2, 3}",
          "Write canonical POS directly: F(A, B, C) = ΠM(0, 2, 3)"
        ],
        result: "F(A, B, C) = ΠM(0, 2, 3)"
      },
      commonMistake: "Keeping the same index numbers when changing Σ to Π (writing ΠM(1, 4, 5, 6, 7) instead of ΠM(0, 2, 3)). ΠM of the same set is F', not F!",
      shortcut: "Total minterms + Total maxterms = 2^n. For 3 variables, 5 minterms means exactly 3 maxterms."
    },
    {
      id: "M04",
      name: "Canonical POS to Canonical SOP",
      whenRequired: "When a function is given as a list of maxterms and its minterm representation is needed.",
      startForm: "Canonical POS: F = ΠM(S)",
      targetForm: "Canonical SOP: F = Σm(U \\ S)",
      mainRule: "F = Σm(U \\ S) where U = {0, 1, ..., 2^n - 1}",
      procedure: [
        "Determine the universe of indices U = {0, 1, ..., 2^n - 1}.",
        "Identify the maxterm indices S present in the POS expression.",
        "Subtract S from U to find the rows where F = 1: U \\ S.",
        "Write the canonical SOP directly: F = Σm(U \\ S)."
      ],
      example: {
        title: "Convert F(A, B, C) = ΠM(0, 2, 4, 6) to Canonical SOP",
        steps: [
          "Variable domain: n = 3 -> U = {0, 1, 2, 3, 4, 5, 6, 7}",
          "Given maxterm index set: S = {0, 2, 4, 6}",
          "Complementary indices (where F = 1): U \\ S = {1, 3, 5, 7}",
          "Write canonical SOP: F(A, B, C) = Σm(1, 3, 5, 7)"
        ],
        result: "F(A, B, C) = Σm(1, 3, 5, 7) (Notice this function simplifies to F = C)"
      },
      commonMistake: "Forgetting that maxterm indices represent 0-rows, so the missing numbers are the 1-rows.",
      shortcut: "Even numbers in U are {0, 2, 4, 6}; odd numbers in U are {1, 3, 5, 7}."
    },
    {
      id: "M05",
      name: "General SOP to General POS",
      whenRequired: "When an algebraic expression in SOP form must be converted to POS without expanding to full canonical form.",
      startForm: "General SOP (e.g., AB + C)",
      targetForm: "General POS (e.g., (A + C)(B + C))",
      mainRule: "X + YZ = (X + Y)(X + Z) [Second Distributive Law]",
      procedure: [
        "Identify product terms added to single terms or other product terms.",
        "Apply the second Distributive Law: treat one term as X and the product as YZ.",
        "For complex expressions like AB + CD, distribute in two stages: (AB + C)(AB + D) then distribute each factor: (A + C)(B + C)(A + D)(B + D).",
        "Simplify intermediate terms using Absorption Law (X + XY = X) and Redundancy Law (X + X'Y = X + Y)."
      ],
      example: {
        title: "Convert F(A, B, C, D) = AB + CD into General POS",
        steps: [
          "Treat AB as X, C as Y, D as Z: AB + CD = (AB + C)(AB + D)",
          "Distribute C across AB: AB + C = (A + C)(B + C)",
          "Distribute D across AB: AB + D = (A + D)(B + D)",
          "Combine all factors: F = (A + C)(B + C)(A + D)(B + D)"
        ],
        result: "F(A, B, C, D) = (A + C)(B + C)(A + D)(B + D)"
      },
      commonMistake: "Failing to distribute terms fully, leaving mixed sub-terms like (AB + C).",
      shortcut: "A sum of two 2-literal product terms (AB + CD) always factors into four 2-literal sum terms."
    },
    {
      id: "M06",
      name: "General POS to General SOP",
      whenRequired: "When a product of sum terms must be converted into sum of products.",
      startForm: "General POS (e.g., (A + B)(C + D))",
      targetForm: "General SOP (e.g., AC + AD + BC + BD)",
      mainRule: "X(Y + Z) = XY + XZ [First Distributive Law]",
      procedure: [
        "Multiply out the sum factors using the standard Distributive Law.",
        "Apply the Idempotent Law: XX = X.",
        "Apply the Complement Law: XX' = 0.",
        "Eliminate null terms (0) using the Identity Law: X + 0 = X.",
        "Apply Absorption (X + XY = X) and Redundancy (X + X'Y = X + Y) to simplify.",
        "Combine like terms to obtain the minimal or standard SOP expression."
      ],
      example: {
        title: "Convert F(A, B, C) = (A + B)(A' + C) to General SOP",
        steps: [
          "Multiply out: (A + B)(A' + C) = AA' + AC + A'B + BC",
          "Apply Complement Law: AA' = 0",
          "Remove 0: F = AC + A'B + BC",
          "Apply Consensus Theorem on AC + A'B + BC: BC is the redundant consensus term!",
          "Final simplified SOP: F = A'B + AC"
        ],
        result: "F(A, B, C) = A'B + AC"
      },
      commonMistake: "Forgetting that AA' = 0, leaving AA' terms in the expanded product.",
      shortcut: "When multiplying (A + X)(A' + Y), the result is always AY + A'X (Consensus eliminates XY)."
    },
    {
      id: "M07",
      name: "Truth Table to Canonical SOP and POS",
      whenRequired: "When the logical specification is provided as a complete truth table.",
      startForm: "Truth Table (2^n rows)",
      targetForm: "Canonical SOP (Σm) and Canonical POS (ΠM)",
      mainRule: "Rows with F = 1 define minterms; rows with F = 0 define maxterms.",
      procedure: [
        "Inspect every row of the truth table from 0 to 2^n - 1.",
        "Record every row index where output F = 1. These indices form the set S_m.",
        "Write Canonical SOP: F = Σm(S_m).",
        "Record every row index where output F = 0. These indices form the set S_M.",
        "Write Canonical POS: F = ΠM(S_M).",
        "Confirm that S_m union S_M = U and S_m intersect S_M = empty set."
      ],
      example: {
        title: "Extract Canonical Forms for a 3-Input Majority Function",
        steps: [
          "Majority function: F = 1 when two or more inputs are 1.",
          "Truth table rows with two or more 1s: rows 3 (011), 5 (101), 6 (110), 7 (111).",
          "S_m = {3, 5, 6, 7} -> F = Σm(3, 5, 6, 7)",
          "Truth table rows with fewer than two 1s: rows 0 (000), 1 (001), 2 (010), 4 (100).",
          "S_M = {0, 1, 2, 4} -> F = ΠM(0, 1, 2, 4)"
        ],
        result: "F = Σm(3, 5, 6, 7) = ΠM(0, 1, 2, 4)"
      },
      commonMistake: "Confusing 0 and 1 polarity: 1-rows are minterms, 0-rows are maxterms.",
      shortcut: "Extract whichever list is shorter first, then take the complement set for the other."
    },
    {
      id: "M08",
      name: "Mixed Conversion Strategy",
      whenRequired: "When given an arbitrary compound expression without explicit starting canonical form.",
      startForm: "Arbitrary compound expression (e.g. [(A + B)(C' + D')]')",
      targetForm: "Specified target form (SOP, POS, Σm, or ΠM)",
      mainRule: "Systematic simplification using De Morgan's laws followed by method selection.",
      procedure: [
        "Step 1: Push all complement bars inward using De Morgan's theorems until only single literals are complemented.",
        "Step 2: Remove double negations: (X')' = X.",
        "Step 3: Determine whether algebraic expansion or truth table evaluation is faster.",
        "Step 4: If algebraic: expand to standard SOP/POS, then introduce missing variables if canonical form is requested.",
        "Step 5: If truth table: evaluate F for all 2^n input valuations, then read off Σm and ΠM directly.",
        "Step 6: Verify the final expression against the original specification."
      ],
      example: {
        title: "Convert F(A, B, C, D) = [(A + B)(C' + D')]' to Canonical SOP and POS",
        steps: [
          "Apply De Morgan: [(A + B)(C' + D')]' = (A + B)' + (C' + D')'",
          "Apply De Morgan again: (A + B)' = A'B'; (C' + D')' = (C')'(D')' = CD",
          "Resulting general SOP: F = A'B' + CD",
          "A'B' is 1 when A=0, B=0 (rows 0, 1, 2, 3)",
          "CD is 1 when C=1, D=1 (rows 3, 7, 11, 15)",
          "Union of 1-rows: {0, 1, 2, 3, 7, 11, 15}",
          "Canonical SOP: F = Σm(0, 1, 2, 3, 7, 11, 15)",
          "Complementary 0-rows: {4, 5, 6, 8, 9, 10, 12, 13, 14}",
          "Canonical POS: F = ΠM(4, 5, 6, 8, 9, 10, 12, 13, 14)"
        ],
        result: "SOP: A'B' + CD | Σm(0, 1, 2, 3, 7, 11, 15) | ΠM(4, 5, 6, 8, 9, 10, 12, 13, 14)"
      },
      commonMistake: "Failing to apply De Morgan to both sum terms and their enclosing product.",
      shortcut: "Evaluating directly on truth-table rows can be 3x faster than expanding 4-variable terms algebraically."
    }
  ],

  // --------------------------------------------------------------------------
  // CRITICAL DISTINCTION CARD: CONVERSION VS COMPLEMENTATION
  // --------------------------------------------------------------------------
  conversionVsComplementation: {
    title: "Critical Distinction: Converting F vs Complementing F",
    warning: "Confusing these two operations is the single most common cause of lost marks in university examinations.",
    principles: [
      {
        concept: "Converting the representation of the SAME function F",
        operation: "F = Σm(S) <=> F = ΠM(U \\ S)",
        meaning: "The logical function F does not change. Its output truth values are identical. You are merely switching from describing the 1-rows to describing the 0-rows of the same truth table."
      },
      {
        concept: "Complementing the function to obtain F'",
        operation: "F' = Σm(U \\ S) = ΠM(S)",
        meaning: "The logical function is inverted. Every 1 becomes a 0, and every 0 becomes a 1. F' has the minterms of F's maxterms, and the maxterms of F's minterms."
      }
    ],
    concreteExample: {
      domain: "3 variables {A, B, C}, where U = {0, 1, 2, 3, 4, 5, 6, 7}",
      originalFunction: "F(A, B, C) = Σm(1, 3, 5, 7) = C",
      sameFunctionPOS: "F(A, B, C) = ΠM(0, 2, 4, 6) = C",
      complementSOP: "F'(A, B, C) = Σm(0, 2, 4, 6) = C'",
      complementPOS: "F'(A, B, C) = ΠM(1, 3, 5, 7) = C'",
      takeaway: "Notice that F = ΠM(0, 2, 4, 6) equals C, while F' = Σm(0, 2, 4, 6) equals C'. Swapping the symbol without understanding whether you want F or F' inverts your circuit!"
    }
  },

  // --------------------------------------------------------------------------
  // TAB 3: GUIDED DEMONSTRATIONS DATA
  // --------------------------------------------------------------------------
  guidedDemos: [
    {
      id: "GD1",
      title: "Guided Demo 1: SOP Missing-Variable Expansion",
      target: "Expand F(A, B, C) = A'B + AC into Canonical SOP and determine its minterm indices",
      objective: "Learn how multiplying by 1 = (X + X') introduces missing variables without altering function truth values.",
      steps: [
        {
          phase: "Step 1: Domain Analysis",
          expression: "Declared variables: {A, B, C}. Full minterms must contain exactly 3 literals.",
          explanation: "Term 1 (A'B) is missing C. Term 2 (AC) is missing B."
        },
        {
          phase: "Step 2: Expand Term 1 (A'B)",
          expression: "A'B = A'B · 1 = A'B(C + C') = A'BC + A'BC'",
          explanation: "Multiply by (C + C') = 1 using Complement Law, then distribute."
        },
        {
          phase: "Step 3: Expand Term 2 (AC)",
          expression: "AC = AC · 1 = AC(B + B') = ABC + AB'C",
          explanation: "Multiply by (B + B') = 1 using Complement Law, then distribute."
        },
        {
          phase: "Step 4: Combine and Deduplicate",
          expression: "F = A'BC + A'BC' + ABC + AB'C",
          explanation: "Collect all product terms. Inspect for duplicates: all 4 minterms are distinct."
        },
        {
          phase: "Step 5: Map to Binary and Numerical Indices",
          expression: "A'BC' = 010 -> m2\nA'BC = 011 -> m3\nAB'C = 101 -> m5\nABC = 111 -> m7",
          explanation: "Uncomplemented literal = 1; Complemented literal = 0. Sort indices ascending: {2, 3, 5, 7}."
        }
      ],
      finalForm: "F(A, B, C) = Σm(2, 3, 5, 7) = A'BC' + A'BC + AB'C + ABC",
      verification: "Equivalent canonical POS: F = ΠM(0, 1, 4, 6). Truth table evaluates to 1 exactly on rows 2, 3, 5, 7."
    },
    {
      id: "GD2",
      title: "Guided Demo 2: POS Missing-Variable Expansion",
      target: "Expand F(A, B, C) = (A + B)(B' + C) into Canonical POS using the XX' = 0 technique",
      objective: "Master the dual expansion method where adding 0 = XX' allows sum terms to be factored into canonical maxterms.",
      steps: [
        {
          phase: "Step 1: Domain Analysis",
          expression: "Declared variables: {A, B, C}. Full maxterms must contain exactly 3 literals.",
          explanation: "Factor 1 (A + B) lacks C. Factor 2 (B' + C) lacks A."
        },
        {
          phase: "Step 2: Expand Factor 1 (A + B)",
          expression: "(A + B) = (A + B) + 0 = (A + B) + CC' = (A + B + C)(A + B + C')",
          explanation: "Apply the second Distributive Law: X + YZ = (X + Y)(X + Z), with X = (A + B), Y = C, Z = C'."
        },
        {
          phase: "Step 3: Expand Factor 2 (B' + C)",
          expression: "(B' + C) = (B' + C) + 0 = (B' + C) + AA' = (A + B' + C)(A' + B' + C)",
          explanation: "Add AA' = 0 and distribute. Arrange literals in standard variable order (A, B, C)."
        },
        {
          phase: "Step 4: Combine and Deduplicate",
          expression: "F = (A + B + C)(A + B + C')(A + B' + C)(A' + B' + C)",
          explanation: "Conjunction of all 4 factors. All 4 maxterm expressions are unique."
        },
        {
          phase: "Step 5: Map to Binary and Maxterm Indices",
          expression: "(A + B + C) = 000 -> M0\n(A + B + C') = 001 -> M1\n(A + B' + C) = 010 -> M2\n(A' + B' + C) = 110 -> M6",
          explanation: "Remember maxterm polarity: Uncomplemented literal = 0; Complemented literal = 1."
        }
      ],
      finalForm: "F(A, B, C) = ΠM(0, 1, 2, 6) = (A + B + C)(A + B + C')(A + B' + C)(A' + B' + C)",
      verification: "Equivalent canonical SOP is F = Σm(3, 4, 5, 7)."
    },
    {
      id: "GD3",
      title: "Guided Demo 3: Index-Set Conversion via Colored Universe Tiles",
      target: "Convert F(A, B, C) = Σm(1, 4, 5, 6, 7) directly to Canonical POS",
      objective: "Visualize the index universe U = {0, 1, ..., 7} as a partitioned set where every row is either a minterm or a maxterm.",
      steps: [
        {
          phase: "Step 1: Define the Index Universe",
          expression: "For n = 3 variables, U = {0, 1, 2, 3, 4, 5, 6, 7}",
          explanation: "The truth table has exactly 2^3 = 8 possible rows."
        },
        {
          phase: "Step 2: Partition the Universe",
          expression: "1-Rows (Minterms S): {1, 4, 5, 6, 7} [Green Tiles]\n0-Rows (Maxterms U \\ S): {0, 2, 3} [Blue Tiles]",
          explanation: "Because F is single-output, every row must evaluate to either 1 or 0."
        },
        {
          phase: "Step 3: Write Canonical POS",
          expression: "F(A, B, C) = ΠM(0, 2, 3)",
          explanation: "The missing minterm indices become the included maxterm indices for the SAME function F."
        },
        {
          phase: "Step 4: Algebraic Reduction Proof",
          expression: "SOP: m4 + m5 + m6 + m7 = A; together with m1 (A'B'C), F = A + A'B'C = A + B'C\nPOS: M2 · M3 = (A + B' + C)(A + B' + C') = A + B'; then (A + B + C)(A + B') = A + B'C",
          explanation: "Both representations simplify to the identical minimal expression: F = A + B'C. Q.E.D."
        }
      ],
      finalForm: "F(A, B, C) = ΠM(0, 2, 3) = (A + B + C)(A + B' + C)(A + B' + C')",
      verification: "SOP and POS reduce to the exact same minimal expression: F = A + B'C."
    },
    {
      id: "GD4",
      title: "Guided Demo 4: General SOP to General POS Transformation",
      target: "Convert F(A, B, C) = AB + C into General POS without expanding into canonical form",
      objective: "Learn direct algebraic factoring using the second Distributive Law X + YZ = (X + Y)(X + Z).",
      steps: [
        {
          phase: "Step 1: Identify the Distributive Pattern",
          expression: "F = C + AB",
          explanation: "Commutative Law: rewrite AB + C as C + AB to match the pattern X + YZ."
        },
        {
          phase: "Step 2: Apply Second Distributive Law",
          expression: "Let X = C, Y = A, Z = B:\nC + AB = (C + A)(C + B)",
          explanation: "Theorem: X + YZ = (X + Y)(X + Z)."
        },
        {
          phase: "Step 3: Arrange Literals in Standard Order",
          expression: "(C + A)(C + B) = (A + C)(B + C)",
          explanation: "Commutative Law for addition inside each sum factor."
        },
        {
          phase: "Step 4: Hardware Architecture Comparison",
          expression: "SOP (AB + C): 1 two-input AND gate + 1 two-input OR gate = 2 gates, 3 literals\nPOS ((A + C)(B + C)): 2 two-input OR gates + 1 two-input AND gate = 3 gates, 4 literals",
          explanation: "In this case, general SOP is more economical than general POS by 1 gate and 1 literal."
        }
      ],
      finalForm: "F(A, B, C) = (A + C)(B + C)",
      verification: "Multiplying back: (A + C)(B + C) = AB + AC + BC + C = AB + C(1 + A + B) = AB + C."
    }
  ],

  // --------------------------------------------------------------------------
  // TAB 4: WORKED MODELS DATA (18 MODELS)
  // --------------------------------------------------------------------------
  workedModels: [
    // --- BASIC (5) ---
    {
      id: "WM2.4-B01",
      difficulty: "Basic",
      title: "SOP to Canonical SOP via Missing-Literal Expansion",
      problemStatement: "Convert the standard SOP expression F(A, B, C) = A'B + AC into canonical SOP (Σm) notation.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 1: Missing-variable multiplication by 1 = (X + X')",
      methodRationale: "Product terms lack variables C and B respectively. Multiplying by 1 introduces the missing literals without changing truth values.",
      solutionSteps: [
        { step: 1, expr: "Declared domain: {A, B, C}. Full minterms must have 3 literals.", law: "Domain inspection", reason: "Term A'B is missing C; term AC is missing B." },
        { step: 2, expr: "A'B = A'B(C + C') = A'BC + A'BC'", law: "Complement & Distributive", reason: "Multiply by (C + C') = 1 and distribute." },
        { step: 3, expr: "AC = AC(B + B') = ABC + AB'C", law: "Complement & Distributive", reason: "Multiply by (B + B') = 1 and distribute." },
        { step: 4, expr: "F = A'BC + A'BC' + ABC + AB'C", law: "Combination", reason: "Sum all expanded product terms. No duplicate terms exist." },
        { step: 5, expr: "A'BC' = 010 -> m2\nA'BC = 011 -> m3\nAB'C = 101 -> m5\nABC = 111 -> m7", law: "Minterm mapping", reason: "Uncomplemented = 1, complemented = 0. Sort indices ascending: {2, 3, 5, 7}." }
      ],
      finalAnswer: "F(A, B, C) = Σm(2, 3, 5, 7) = A'BC' + A'BC + AB'C + ABC",
      verificationNote: "Equivalent Canonical POS is F = ΠM(0, 1, 4, 6). Truth table evaluates to 1 at rows 2, 3, 5, 7.",
      examTip: "Always list indices in ascending numerical order to avoid marking penalties."
    },
    {
      id: "WM2.4-B02",
      difficulty: "Basic",
      title: "POS to Canonical POS via Missing-Literal Addition",
      problemStatement: "Convert the standard POS expression F(A, B, C) = (A + B)(B' + C) into canonical POS (ΠM) notation.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 2: Missing-variable addition of 0 = XX'",
      methodRationale: "Sum terms lack C and A respectively. Adding 0 allows application of the second distributive law T + YZ = (T+Y)(T+Z).",
      solutionSteps: [
        { step: 1, expr: "Declared domain: {A, B, C}. Full maxterms require 3 literals.", law: "Domain inspection", reason: "Term (A + B) lacks C; term (B' + C) lacks A." },
        { step: 2, expr: "(A + B) = (A + B) + CC' = (A + B + C)(A + B + C')", law: "Distributive Law", reason: "Add CC' = 0 and distribute: (T + C)(T + C')." },
        { step: 3, expr: "(B' + C) = (B' + C) + AA' = (A + B' + C)(A' + B' + C)", law: "Distributive Law", reason: "Add AA' = 0 and distribute in standard variable order." },
        { step: 4, expr: "F = (A + B + C)(A + B + C')(A + B' + C)(A' + B' + C)", law: "Combination", reason: "Conjunction of all 4 factors. All 4 maxterms are unique." },
        { step: 5, expr: "(A + B + C) = 000 -> M0\n(A + B + C') = 001 -> M1\n(A + B' + C) = 010 -> M2\n(A' + B' + C) = 110 -> M6", law: "Maxterm mapping", reason: "Uncomplemented = 0, complemented = 1. Sort ascending: {0, 1, 2, 6}." }
      ],
      finalAnswer: "F(A, B, C) = ΠM(0, 1, 2, 6)",
      verificationNote: "Equivalent Canonical SOP is F = Σm(3, 4, 5, 7). Rows {0, 1, 2, 6} evaluate to 0.",
      examTip: "Do not forget maxterm polarity is reversed from minterms: 0 is uncomplemented, 1 is complemented."
    },
    {
      id: "WM2.4-B03",
      difficulty: "Basic",
      title: "Direct Canonical SOP to Canonical POS Conversion",
      problemStatement: "Given F(A, B, C) = Σm(1, 4, 5, 6, 7), obtain the canonical POS expression directly.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 3: Complementary index set subtraction",
      methodRationale: "For n = 3 variables, the universe of rows is U = {0..7}. Rows where F = 0 are precisely the maxterms of F.",
      solutionSteps: [
        { step: 1, expr: "Universe of indices: U = {0, 1, 2, 3, 4, 5, 6, 7}", law: "Domain definition", reason: "n = 3 variables produces 2^3 = 8 truth-table rows." },
        { step: 2, expr: "Given minterms: S_m = {1, 4, 5, 6, 7}", law: "Given data", reason: "These are the rows where F evaluates to 1." },
        { step: 3, expr: "Complementary index set: S_M = U \\ S_m = {0, 2, 3}", law: "Set complementation", reason: "These are the rows where F evaluates to 0." },
        { step: 4, expr: "Write maxterm expansion:\nM0 = (A + B + C) [000]\nM2 = (A + B' + C) [010]\nM3 = (A + B' + C') [011]", law: "Maxterm construction", reason: "Each index maps to its unique 3-literal sum term." }
      ],
      finalAnswer: "F(A, B, C) = ΠM(0, 2, 3) = (A + B + C)(A + B' + C)(A + B' + C')",
      verificationNote: "Both forms simplify to F = A + B'C. Minterm count (5) + Maxterm count (3) = 8.",
      examTip: "This conversion requires only a set subtraction: U \\ S. No long algebraic steps are needed."
    },
    {
      id: "WM2.4-B04",
      difficulty: "Basic",
      title: "Direct Canonical POS to Canonical SOP Conversion",
      problemStatement: "Given F(A, B, C) = ΠM(0, 2, 4, 6), obtain the canonical SOP expression and simplify the function.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 4: Complementary index set subtraction",
      methodRationale: "Maxterms represent 0-rows; minterms represent 1-rows. Subtracting maxterm indices from U yields minterm indices.",
      solutionSteps: [
        { step: 1, expr: "Universe: U = {0, 1, 2, 3, 4, 5, 6, 7}", law: "Domain definition", reason: "n = 3 variables." },
        { step: 2, expr: "Given maxterm set: S_M = {0, 2, 4, 6}", law: "Given data", reason: "These are all the even rows where F = 0." },
        { step: 3, expr: "Minterm set: S_m = U \\ S_M = {1, 3, 5, 7}", law: "Set complementation", reason: "These are all the odd rows where F = 1." },
        { step: 4, expr: "F = A'B'C + A'BC + AB'C + ABC", law: "Minterm expansion", reason: "Construct product terms for indices 1, 3, 5, 7." },
        { step: 5, expr: "F = A'C(B' + B) + AC(B' + B) = A'C(1) + AC(1) = (A' + A)C = C", law: "Algebraic reduction", reason: "Factor C out of all terms; notice F is 1 whenever C is 1." }
      ],
      finalAnswer: "F(A, B, C) = Σm(1, 3, 5, 7) = C",
      verificationNote: "In any 3-variable truth table, rows {1, 3, 5, 7} are precisely the rows where C = 1.",
      examTip: "Recognizing patterns like all even or all odd indices allows instant simplification checks."
    },
    {
      id: "WM2.4-B05",
      difficulty: "Basic",
      title: "General SOP to General POS Transformation",
      problemStatement: "Convert the standard SOP expression F(A, B, C) = AB + C into general POS form, and verify its canonical forms.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 5: Second Distributive Law X + YZ = (X + Y)(X + Z)",
      methodRationale: "Rewriting AB + C as C + AB allows direct factoring into two sum terms without intermediate truth table generation.",
      solutionSteps: [
        { step: 1, expr: "F = C + AB", law: "Commutative Law", reason: "Rearrange to match X + YZ pattern with X = C, Y = A, Z = B." },
        { step: 2, expr: "C + AB = (C + A)(C + B)", law: "Second Distributive Law", reason: "X + YZ = (X + Y)(X + Z)." },
        { step: 3, expr: "F = (A + C)(B + C)", law: "Commutative Law", reason: "Write variables in standard alphabetical order." },
        { step: 4, expr: "Canonical verification:\nF = Σm(1, 3, 5, 6, 7)\nComplementary POS: F = ΠM(0, 2, 4)", law: "Truth table inspection", reason: "Rows 1, 3, 5, 6, 7 produce 1; rows 0, 2, 4 produce 0." }
      ],
      finalAnswer: "General POS: F = (A + C)(B + C) | Canonical SOP: Σm(1, 3, 5, 6, 7) | Canonical POS: ΠM(0, 2, 4)",
      verificationNote: "Expanding (A + C)(B + C) gives AB + AC + BC + C = AB + C(1 + A + B) = AB + C.",
      examTip: "The second distributive law is the primary algebraic tool for factoring SOP into POS."
    },

    // --- INTERMEDIATE (5) ---
    {
      id: "WM2.4-I01",
      difficulty: "Intermediate",
      title: "General POS to General SOP via Expansion",
      problemStatement: "Convert the general POS expression F(A, B, C) = (A + B)C into general SOP, canonical SOP, and canonical POS.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 6: Distributive expansion X(Y + Z) = XY + XZ",
      methodRationale: "Multiplying C across the sum factor (A + B) directly yields sum of products.",
      solutionSteps: [
        { step: 1, expr: "F = (A + B)C = AC + BC", law: "First Distributive Law", reason: "Multiply literal C into each term of the sum." },
        { step: 2, expr: "AC lacks B: AC(B + B') = ABC + AB'C (m7, m5)", law: "Missing literal expansion", reason: "Expand AC to 3 literals." },
        { step: 3, expr: "BC lacks A: BC(A + A') = ABC + A'BC (m7, m3)", law: "Missing literal expansion", reason: "Expand BC to 3 literals." },
        { step: 4, expr: "Combine & deduplicate: F = ABC + AB'C + A'BC = Σm(3, 5, 7)", law: "Idempotent Law", reason: "ABC appears in both expansions; ABC + ABC = ABC." },
        { step: 5, expr: "Canonical POS: U \\ {3, 5, 7} = {0, 1, 2, 4, 6}", law: "Complementary index set", reason: "Remaining rows where F = 0." }
      ],
      finalAnswer: "General SOP: F = AC + BC | Canonical SOP: Σm(3, 5, 7) | Canonical POS: ΠM(0, 1, 2, 4, 6)",
      verificationNote: "At A=0, B=0, F=0 (rows 0, 1); at C=0, F=0 (rows 0, 2, 4, 6). Matches exactly.",
      examTip: "Always eliminate duplicate minterms immediately to keep index sets strictly sorted."
    },
    {
      id: "WM2.4-I02",
      difficulty: "Intermediate",
      title: "Factoring SOP into POS via Common Sub-Terms",
      problemStatement: "Convert the SOP expression F(A, B, C) = A'B + BC into general POS form, and determine its canonical indices.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 5: Common literal factoring",
      methodRationale: "Literal B appears in both product terms, allowing direct factoring into a single product-of-sums term.",
      solutionSteps: [
        { step: 1, expr: "F = A'B + BC = B(A' + C)", law: "First Distributive Law", reason: "Factor out the common literal B." },
        { step: 2, expr: "B(A' + C) is a valid POS expression (two factors: B and (A' + C)).", law: "POS definition", reason: "A single literal B is technically a 1-literal sum term (B)." },
        { step: 3, expr: "Minterm evaluation:\nA'B = A'BC + A'BC' (m3, m2)\nBC = ABC + A'BC (m7, m3)", law: "Canonical SOP expansion", reason: "Expand terms to 3 literals." },
        { step: 4, expr: "Canonical SOP: F = Σm(2, 3, 7)", law: "Deduplication", reason: "Union of {2, 3} and {3, 7} is {2, 3, 7}." },
        { step: 5, expr: "Canonical POS: U \\ {2, 3, 7} = {0, 1, 4, 5, 6}", law: "Index complementation", reason: "Remaining 5 rows of 3-variable universe." }
      ],
      finalAnswer: "General POS: F = B(A' + C) | Canonical SOP: Σm(2, 3, 7) | Canonical POS: ΠM(0, 1, 4, 5, 6)",
      verificationNote: "B must be 1 (rows 2, 3, 6, 7). When B=1, (A'+C) requires A=0 or C=1, selecting rows 2, 3, 7.",
      examTip: "A single literal like B is both a degenerate product term and a degenerate sum term."
    },
    {
      id: "WM2.4-I03",
      difficulty: "Intermediate",
      title: "POS Expansion, Consensus Identification, and Absorption",
      problemStatement: "Convert F(A, B, C) = (A + B)(A' + C) into equivalent general SOP and canonical forms.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 6: Algebraic expansion and consensus reduction",
      methodRationale: "Expanding (A + B)(A' + C) produces AA' = 0 and an apparent consensus term BC that can be simplified.",
      solutionSteps: [
        { step: 1, expr: "(A + B)(A' + C) = AA' + AC + A'B + BC", law: "First Distributive Law", reason: "Multiply out all four literal combinations." },
        { step: 2, expr: "= 0 + AC + A'B + BC = A'B + AC + BC", law: "Complement & Identity", reason: "AA' = 0 by Complement Law; X + 0 = X." },
        { step: 3, expr: "Notice BC is the consensus term of A'B and AC:\nA'B + AC + BC = A'B + AC", law: "Consensus Theorem", reason: "Variables A and A' are complementary; BC is redundant." },
        { step: 4, expr: "Expand A'B: A'B(C + C') = A'BC + A'BC' (m3, m2)\nExpand AC: AC(B + B') = ABC + AB'C (m7, m5)", law: "Missing variable expansion", reason: "Convert minimal SOP to canonical SOP." },
        { step: 5, expr: "Canonical SOP: F = Σm(2, 3, 5, 7)\nCanonical POS: F = ΠM(0, 1, 4, 6)", law: "Index mapping", reason: "Canonical index sets for {2, 3, 5, 7} and {0, 1, 4, 6}." }
      ],
      finalAnswer: "General SOP: F = A'B + AC | Canonical SOP: Σm(2, 3, 5, 7) | Canonical POS: ΠM(0, 1, 4, 6)",
      verificationNote: "Notice that F is the exact dual problem of WM2.4-B01, producing the exact same canonical forms.",
      examTip: "Always watch for AA' = 0 and redundant consensus terms when multiplying sum factors."
    },
    {
      id: "WM2.4-I04",
      difficulty: "Intermediate",
      title: "Four-Variable Mixed POS to Canonical Forms",
      problemStatement: "Given the 4-variable POS expression F(A, B, C, D) = (A + B')(C + D), determine its canonical SOP and POS representations.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 2 & Method 3: 4-variable index evaluation",
      methodRationale: "A 4-variable POS term with 2 literals evaluates to 0 on 2^(4-2) = 4 truth table rows.",
      solutionSteps: [
        { step: 1, expr: "Domain: n = 4 variables -> U = {0, 1, ..., 15}. Total rows = 16.", law: "Domain definition", reason: "Each row corresponds to a 4-bit binary tuple ABCD." },
        { step: 2, expr: "(A + B') evaluates to 0 when A = 0 and B' = 0 (so B = 1).\nVariables C and D can be anything: ABCD = 0100(4), 0101(5), 0110(6), 0111(7).", law: "Maxterm row analysis", reason: "Term (A + B') is 0 on rows {4, 5, 6, 7}." },
        { step: 3, expr: "(C + D) evaluates to 0 when C = 0 and D = 0.\nVariables A and B can be anything: ABCD = 0000(0), 0100(4), 1000(8), 1100(12).", law: "Maxterm row analysis", reason: "Term (C + D) is 0 on rows {0, 4, 8, 12}." },
        { step: 4, expr: "Union of 0-rows: S_M = {4, 5, 6, 7} union {0, 4, 8, 12} = {0, 4, 5, 6, 7, 8, 12}", law: "Maxterm index aggregation", reason: "Deduplicate row 4: exactly 7 maxterm rows." },
        { step: 5, expr: "Canonical POS: F = ΠM(0, 4, 5, 6, 7, 8, 12)\nCanonical SOP: F = Σm(U \\ S_M) = Σm(1, 2, 3, 9, 10, 11, 13, 14, 15)", law: "Index complementation", reason: "Remaining 16 - 7 = 9 rows where F = 1." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(0, 4, 5, 6, 7, 8, 12) | Canonical SOP: F = Σm(1, 2, 3, 9, 10, 11, 13, 14, 15)",
      verificationNote: "7 maxterms + 9 minterms = 16. Total universe is completely accounted for.",
      examTip: "In 4-variable expressions, evaluating where sum terms equal 0 is much faster than multiplying 16 terms algebraically."
    },
    {
      id: "WM2.4-I05",
      difficulty: "Intermediate",
      title: "Four-Variable SOP to POS Transformation and Indexing",
      problemStatement: "Convert F(A, B, C, D) = AB + CD into general POS and determine its canonical index sets.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 5: Double distributive factoring",
      methodRationale: "AB + CD is a classic benchmark function that demonstrates how 2 AND terms expand into 4 OR terms in POS.",
      solutionSteps: [
        { step: 1, expr: "Treat AB as X: AB + CD = (AB + C)(AB + D)", law: "Second Distributive Law", reason: "X + YZ = (X + Y)(X + Z)." },
        { step: 2, expr: "(AB + C) = (A + C)(B + C)\n(AB + D) = (A + D)(B + D)", law: "Second Distributive Law", reason: "Distribute C and D respectively across AB." },
        { step: 3, expr: "General POS: F = (A + C)(A + D)(B + C)(B + D)", law: "Conjunction", reason: "4 two-literal sum terms combined by AND." },
        { step: 4, expr: "Minterm analysis:\nAB = 1 on rows where A=1, B=1: {12, 13, 14, 15}\nCD = 1 on rows where C=1, D=1: {3, 7, 11, 15}", law: "SOP row evaluation", reason: "Identify truth table rows directly." },
        { step: 5, expr: "Canonical SOP: S_m = {12, 13, 14, 15} union {3, 7, 11, 15} = {3, 7, 11, 12, 13, 14, 15}\nCanonical POS: S_M = U \\ S_m = {0, 1, 2, 4, 5, 6, 8, 9, 10}", law: "Index complementation", reason: "7 minterm rows; 9 maxterm rows." }
      ],
      finalAnswer: "General POS: F = (A + C)(A + D)(B + C)(B + D) | Canonical SOP: Σm(3, 7, 11, 12, 13, 14, 15) | Canonical POS: ΠM(0, 1, 2, 4, 5, 6, 8, 9, 10)",
      verificationNote: "7 minterms + 9 maxterms = 16 rows. Deduplication of row 15 (ABCD = 1111) is essential.",
      examTip: "SOP uses 3 gates (2 AND, 1 OR); POS uses 5 gates (4 OR, 1 AND). SOP is cheaper here."
    },

    // --- ADVANCED (8) ---
    {
      id: "WM2.4-A01",
      difficulty: "Advanced",
      title: "Four-Variable POS Expansion to SOP and Canonical Forms",
      problemStatement: "Convert the 4-variable POS expression F(A, B, C, D) = (A + B)(C + D) into general SOP, canonical SOP, and canonical POS.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 6: Distributive expansion and 4-variable indexing",
      methodRationale: "Dual structure of WM2.4-I05: multiplying two 2-literal sum terms yields four 2-literal product terms.",
      solutionSteps: [
        { step: 1, expr: "(A + B)(C + D) = AC + AD + BC + BD", law: "First Distributive Law", reason: "Multiply each literal in (A + B) by each literal in (C + D)." },
        { step: 2, expr: "General SOP: F = AC + AD + BC + BD", law: "SOP formulation", reason: "Four 2-literal product terms combined by OR." },
        { step: 3, expr: "Maxterm evaluation for F:\n(A + B) = 0 when A=0, B=0: {0, 1, 2, 3}\n(C + D) = 0 when C=0, D=0: {0, 4, 8, 12}", law: "POS row evaluation", reason: "F = 0 if either factor is 0." },
        { step: 4, expr: "Canonical POS: S_M = {0, 1, 2, 3} union {0, 4, 8, 12} = {0, 1, 2, 3, 4, 8, 12}", law: "Deduplication", reason: "Row 0 appears in both sets. Exactly 7 maxterm rows." },
        { step: 5, expr: "Canonical SOP: S_m = U \\ S_M = {5, 6, 7, 9, 10, 11, 13, 14, 15}", law: "Index complementation", reason: "Remaining 16 - 7 = 9 rows." }
      ],
      finalAnswer: "General SOP: F = AC + AD + BC + BD | Canonical POS: F = ΠM(0, 1, 2, 3, 4, 8, 12) | Canonical SOP: F = Σm(5, 6, 7, 9, 10, 11, 13, 14, 15)",
      verificationNote: "POS uses 3 gates (2 OR, 1 AND); SOP uses 5 gates (4 AND, 1 OR). POS is cheaper here.",
      examTip: "Comparing WM2.4-I05 and WM2.4-A01 illustrates the exact duality between SOP and POS hardware costs."
    },
    {
      id: "WM2.4-A02",
      difficulty: "Advanced",
      title: "Mixed Four-Variable Expression with Overlap Removal",
      problemStatement: "Given F(A, B, C, D) = A'C + BD, determine its canonical SOP and canonical POS representations, accounting for overlapping minterms.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 1 & Set Theory: Row expansion with overlap elimination",
      methodRationale: "Term A'C specifies A=0, C=1 (4 rows); term BD specifies B=1, D=1 (4 rows). Their intersection must be deduplicated.",
      solutionSteps: [
        { step: 1, expr: "Expand A'C: A=0, C=1, B and D take all combinations:\n0010 (m2), 0011 (m3), 0110 (m6), 0111 (m7)", law: "Minterm expansion", reason: "4 rows where A'C = 1." },
        { step: 2, expr: "Expand BD: B=1, D=1, A and C take all combinations:\n0101 (m5), 0111 (m7), 1101 (m13), 1111 (m15)", law: "Minterm expansion", reason: "4 rows where BD = 1." },
        { step: 3, expr: "Identify overlapping row:\nm7 = 0111 appears in BOTH sets (A=0, B=1, C=1, D=1).", law: "Intersection check", reason: "A'CBD = 0111 satisfies both A'C and BD." },
        { step: 4, expr: "S_m = {2, 3, 6, 7} union {5, 7, 13, 15} = {2, 3, 5, 6, 7, 13, 15}", law: "Idempotent Law", reason: "Deduplicate m7. Total 7 distinct minterm rows." },
        { step: 5, expr: "Canonical POS: S_M = U \\ S_m = {0, 1, 4, 8, 9, 10, 11, 12, 14}", law: "Index complementation", reason: "16 - 7 = 9 maxterm rows." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(2, 3, 5, 6, 7, 13, 15) | Canonical POS: F = ΠM(0, 1, 4, 8, 9, 10, 11, 12, 14)",
      verificationNote: "7 minterms + 9 maxterms = 16 rows. Overlap deduplication prevented counting row 7 twice.",
      examTip: "Whenever two product terms do not contain complementary literals, always check for intersecting minterm rows."
    },
    {
      id: "WM2.4-A03",
      difficulty: "Advanced",
      title: "POS to SOP Conversion with Complemented Literals",
      problemStatement: "Convert F(A, B, C, D) = (A' + C)(B + D') into general SOP and canonical forms.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 6: Algebraic expansion and 4-variable indexing",
      methodRationale: "Multiplying out (A' + C)(B + D') produces product terms with mixed uncomplemented and complemented literals.",
      solutionSteps: [
        { step: 1, expr: "(A' + C)(B + D') = A'B + A'D' + BC + CD'", law: "First Distributive Law", reason: "Multiply each literal in first factor by each literal in second." },
        { step: 2, expr: "General SOP: F = A'B + A'D' + BC + CD'", law: "SOP formulation", reason: "Four 2-literal product terms." },
        { step: 3, expr: "Maxterm evaluation:\n(A' + C) = 0 when A=1, C=0: {8, 9, 12, 13}\n(B + D') = 0 when B=0, D=1: {1, 3, 9, 11}", law: "POS row analysis", reason: "Identify rows where each factor evaluates to 0." },
        { step: 4, expr: "Canonical POS: S_M = {8, 9, 12, 13} union {1, 3, 9, 11} = {1, 3, 8, 9, 11, 12, 13}", law: "Deduplication", reason: "Row 9 (1001) is common to both factors. Total 7 maxterms." },
        { step: 5, expr: "Canonical SOP: S_m = U \\ S_M = {0, 2, 4, 5, 6, 7, 10, 14, 15}", law: "Index complementation", reason: "16 - 7 = 9 minterm rows." }
      ],
      finalAnswer: "General SOP: F = A'B + A'D' + BC + CD' | Canonical POS: F = ΠM(1, 3, 8, 9, 11, 12, 13) | Canonical SOP: F = Σm(0, 2, 4, 5, 6, 7, 10, 14, 15)",
      verificationNote: "Row 9 (ABCD=1001) makes A'=0, C=0, so (A'+C)=0; and B=0, D'=0, so (B+D')=0. F=0 confirmed.",
      examTip: "Evaluating maxterm rows directly from the original POS is much less error-prone than expanding all 4 SOP terms."
    },
    {
      id: "WM2.4-A04",
      difficulty: "Advanced",
      title: "Compound Product-of-Sums Identity Reduction",
      problemStatement: "Simplify F(A, B, C, D) = (AB + C)(AB + D) into minimal SOP using Boolean identities, then derive canonical forms.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 5: Identity pattern recognition (X + Y)(X + Z) = X + YZ",
      methodRationale: "Recognizing that both factors share the common sub-expression X = AB allows instantaneous factoring without lengthy expansion.",
      solutionSteps: [
        { step: 1, expr: "Identify the pattern: let X = AB, Y = C, Z = D.\nExpression becomes (X + Y)(X + Z).", law: "Pattern recognition", reason: "Direct match for the second Distributive Law." },
        { step: 2, expr: "(X + Y)(X + Z) = X + YZ = AB + CD", law: "Second Distributive Law", reason: "Algebraic reduction in a single step." },
        { step: 3, expr: "Full expansion proof (to verify):\n(AB + C)(AB + D) = ABAB + ABD + ABC + CD\n= AB + ABD + ABC + CD\n= AB(1 + D + C) + CD = AB(1) + CD = AB + CD", law: "Absorption Law", reason: "Full expansion confirms the identity; AB absorbs ABD and ABC." },
        { step: 4, expr: "Minterms of AB + CD:\nAB = 1 on {12, 13, 14, 15}\nCD = 1 on {3, 7, 11, 15}\nCanonical SOP: F = Σm(3, 7, 11, 12, 13, 14, 15)", law: "SOP row evaluation", reason: "Deduplicate row 15." },
        { step: 5, expr: "Canonical POS: F = ΠM(0, 1, 2, 4, 5, 6, 8, 9, 10)", law: "Index complementation", reason: "Remaining 9 rows where F = 0." }
      ],
      finalAnswer: "Minimal SOP: F = AB + CD | Canonical SOP: Σm(3, 7, 11, 12, 13, 14, 15) | Canonical POS: ΠM(0, 1, 2, 4, 5, 6, 8, 9, 10)",
      verificationNote: "Demonstrates how recognizing algebraic patterns saves minutes of tedious exam calculation.",
      examTip: "Always look for common compound sub-terms before multiplying out brackets."
    },
    {
      id: "WM2.4-A05",
      difficulty: "Advanced",
      title: "Multi-Term Four-Variable Expansion and Deduplication",
      problemStatement: "Convert F(A, B, C, D) = A'BC + AB'D + C'D into canonical SOP and canonical POS representations.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 1: Systematic missing-variable expansion and binary indexing",
      methodRationale: "Expression contains 3-literal terms and a 2-literal term. Each must be expanded to 4 literals and deduplicated.",
      solutionSteps: [
        { step: 1, expr: "A'BC lacks D: A'BC(D + D') = A'BCD + A'BCD'\nBinary: 0111 (m7) + 0110 (m6)", law: "Missing literal expansion", reason: "Expand to 4 literals (2 minterms)." },
        { step: 2, expr: "AB'D lacks C: AB'D(C + C') = AB'CD + AB'C'D\nBinary: 1011 (m11) + 1001 (m9)", law: "Missing literal expansion", reason: "Expand to 4 literals (2 minterms)." },
        { step: 3, expr: "C'D lacks A and B: C'D(A + A')(B + B') = C'D(AB + AB' + A'B + A'B')\n= ABC'D + AB'C'D + A'BC'D + A'B'C'D\nBinary: 1101 (m13) + 1001 (m9) + 0101 (m5) + 0001 (m1)", law: "Missing literal expansion", reason: "Expand to 4 literals (4 minterms)." },
        { step: 4, expr: "Collect all minterms: {7, 6} union {11, 9} union {13, 9, 5, 1}\nDeduplicate m9 (appears in both term 2 and term 3):\nS_m = {1, 5, 6, 7, 9, 11, 13}", law: "Idempotent Law", reason: "Total 7 distinct minterm rows." },
        { step: 5, expr: "Canonical POS: S_M = U \\ S_m = {0, 2, 3, 4, 8, 10, 12, 14, 15}", law: "Index complementation", reason: "16 - 7 = 9 maxterm rows." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(1, 5, 6, 7, 9, 11, 13) | Canonical POS: F = ΠM(0, 2, 3, 4, 8, 10, 12, 14, 15)",
      verificationNote: "7 minterms + 9 maxterms = 16 rows. m9 deduplication is verified.",
      examTip: "When expanding 2-literal terms in 4-variable domains, expect 4 minterms."
    },
    {
      id: "WM2.4-A06",
      difficulty: "Advanced",
      title: "SOP/POS and Conditional Gate-Cost Comparison",
      problemStatement: "Given F(A, B, C) = C' + A'B', derive equivalent general POS, canonical SOP, canonical POS, and compare gate costs under explicitly stated hardware assumptions.",
      declaredVariables: "A, B, C",
      variableOrder: "A (MSB), B, C (LSB)",
      methodSelected: "Method 5 & Hardware Modeling: Distributive factoring and gate metrics",
      methodRationale: "Demonstrates that minimal SOP and minimal POS may have different gate counts for the same Boolean function.",
      solutionSteps: [
        { step: 1, expr: "Convert SOP to POS: C' + A'B' = (C' + A')(C' + B') = (A' + C')(B' + C')", law: "Second Distributive Law", reason: "Factor C' across A'B'." },
        { step: 2, expr: "Canonical SOP: C' has 4 rows {0, 2, 4, 6}; A'B' has 2 rows {0, 1}.\nUnion: S_m = {0, 1, 2, 4, 6}\nCanonical SOP: F = Σm(0, 1, 2, 4, 6)", law: "Minterm evaluation", reason: "Deduplicate row 0 (000)." },
        { step: 3, expr: "Canonical POS: S_M = U \\ S_m = {3, 5, 7}\nCanonical POS: F = ΠM(3, 5, 7)", law: "Index complementation", reason: "Rows where F = 0." },
        { step: 4, expr: "Hardware Model Assumptions:\n1. Two-level logic network (level 1 gates feed level 2 gate).\n2. Complemented inputs (A', B', C') are freely available from input registers.\n3. Gate count metric = total logic gates; Literal cost = total wire inputs.", law: "Hardware model definition", reason: "Fair engineering comparison requires fixed assumptions." },
        { step: 5, expr: "SOP (C' + A'B'): 1 two-input AND gate + 1 two-input OR gate = 2 gates, 3 literals.\nPOS ((A' + C')(B' + C')): 2 two-input OR gates + 1 two-input AND gate = 3 gates, 4 literals.", law: "Gate cost evaluation", reason: "SOP saves 1 gate and 1 literal compared to POS." }
      ],
      finalAnswer: "General POS: F = (A' + C')(B' + C') | Canonical SOP: Σm(0, 1, 2, 4, 6) | Canonical POS: ΠM(3, 5, 7) | Cost: SOP (2 gates, 3 literals) vs POS (3 gates, 4 literals)",
      verificationNote: "SOP is more economical under these specific assumptions. Under different fan-in or cell libraries, POS might be preferred.",
      examTip: "Always state your hardware assumptions when comparing gate costs in academic exams."
    },
    {
      id: "WM2.4-A07",
      difficulty: "Advanced",
      title: "Complementing a Compound Function vs Canonical Conversion",
      problemStatement: "Given the compound function F(A, B, C, D) = (A'B + CD')', find equivalent POS for F, and determine canonical forms for both F and F'.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 8: De Morgan inversion and index set complementation",
      methodRationale: "The outer prime indicates an inverted function. Applying De Morgan produces POS directly.",
      solutionSteps: [
        { step: 1, expr: "Apply De Morgan: (A'B + CD')' = (A'B)' · (CD')'", law: "De Morgan's Theorem", reason: "(X + Y)' = X' · Y'." },
        { step: 2, expr: "(A'B)' = A + B'; (CD')' = C' + (D')' = C' + D\nF = (A + B')(C' + D)", law: "De Morgan & Involution", reason: "Push negations down to single literals. Result is general POS." },
        { step: 3, expr: "Find where F = 0:\n(A + B') = 0 when A=0, B=1: {4, 5, 6, 7}\n(C' + D) = 0 when C=1, D=0: {2, 6, 10, 14}\nUnion: S_M(F) = {2, 4, 5, 6, 7, 10, 14}", law: "POS row analysis", reason: "Deduplicate row 6 (0110). Exactly 7 maxterm rows for F." },
        { step: 4, expr: "Canonical POS of F: F = ΠM(2, 4, 5, 6, 7, 10, 14)\nCanonical SOP of F: F = Σm(0, 1, 3, 8, 9, 11, 12, 13, 15)", law: "Index complementation", reason: "16 - 7 = 9 minterm rows for F." },
        { step: 5, expr: "Forms for F' (the complement function):\nCanonical SOP of F': F' = Σm(2, 4, 5, 6, 7, 10, 14)\nCanonical POS of F': F' = ΠM(0, 1, 3, 8, 9, 11, 12, 13, 15)", law: "Function complementation", reason: "F' inverts the truth values: minterms of F' are maxterms of F." }
      ],
      finalAnswer: "General POS of F: (A + B')(C' + D) | F = Σm(0, 1, 3, 8, 9, 11, 12, 13, 15) = ΠM(2, 4, 5, 6, 7, 10, 14) | F' = Σm(2, 4, 5, 6, 7, 10, 14) = ΠM(0, 1, 3, 8, 9, 11, 12, 13, 15)",
      verificationNote: "Observe: S_m(F') equals S_M(F). This confirms the fundamental relation (m_i)' = M_i.",
      examTip: "When asked for F', simply swap the index sets between minterm and maxterm notations of F."
    },
    {
      id: "WM2.4-A08",
      difficulty: "Advanced",
      title: "Mixed Four-Variable Challenge: Expansion, Simplification and Verification",
      problemStatement: "Given F(A, B, C, D) = (A + B')(C' + D) + A'CD, reduce F to minimal SOP, find its canonical forms, and verify all 16 rows.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      methodSelected: "Method 8: Compound expansion, Boolean reduction, and exhaustive truth table verification",
      methodRationale: "Requires expanding the POS factor, combining with A'CD, applying Boolean simplification laws, and confirming the 16-row truth table.",
      solutionSteps: [
        { step: 1, expr: "Expand the POS term: (A + B')(C' + D) = AC' + AD + B'C' + B'D", law: "First Distributive Law", reason: "Multiply out all four literal combinations." },
        { step: 2, expr: "Re-insert + A'CD: F = AC' + AD + B'C' + B'D + A'CD", law: "Substitution", reason: "Full expanded SOP expression." },
        { step: 3, expr: "Combine AD + A'CD:\nAD + A'CD = D(A + A'C) = D(A + C) = AD + CD", law: "Redundancy Law (X + X'Y = X + Y)", reason: "A absorbs A' in the product with D." },
        { step: 4, expr: "Expression becomes: F = AC' + AD + CD + B'C' + B'D\nNotice AD + B'D + B'C': B'D is redundant by Consensus between CD and B'C' or AD and B'C'.\nReduced minimal SOP: F = CD + AC' + B'C'", law: "Consensus & Absorption", reason: "Eliminate redundant terms." },
        { step: 5, expr: "Row evaluation of F = CD + AC' + B'C':\nCD = 1 on {3, 7, 11, 15}\nAC' = 1 on {8, 9, 12, 13}\nB'C' = 1 on {0, 1, 8, 9}\nUnion of 1-rows: S_m = {0, 1, 3, 7, 8, 9, 11, 12, 13, 15}", law: "Minterm row evaluation", reason: "Total 10 minterm rows." },
        { step: 6, expr: "Canonical POS: S_M = U \\ S_m = {2, 4, 5, 6, 10, 14}", law: "Index complementation", reason: "Remaining 16 - 10 = 6 maxterm rows." }
      ],
      finalAnswer: "Minimal SOP: F = CD + AC' + B'C' | Canonical SOP: F = Σm(0, 1, 3, 7, 8, 9, 11, 12, 13, 15) | Canonical POS: F = ΠM(2, 4, 5, 6, 10, 14)",
      verificationNote: "Exhaustive evaluation confirms: rows {2, 4, 5, 6, 10, 14} evaluate to 0 in both original F and simplified SOP.",
      examTip: "Factoring terms with a common literal (e.g. D(A + A'C)) is the fastest way to trigger Redundancy Law."
    }
  ],

  // --------------------------------------------------------------------------
  // TAB 5: CHEAT SHEET DATA
  // --------------------------------------------------------------------------
  cheatSheet: {
    title: "SOP and POS Conversions: Master Reference Sheet",
    formulaPanel: [
      { name: "SOP Missing-Variable Expansion", formula: "T = T · 1 = T(X + X')", note: "Multiply product term T by (X + X') for each missing variable X." },
      { name: "POS Missing-Variable Expansion", formula: "T = T + 0 = T + XX' = (T + X)(T + X')", note: "Add XX' to sum term T and distribute: (T + X)(T + X')." },
      { name: "General SOP to POS Factoring", formula: "X + YZ = (X + Y)(X + Z)", note: "Second Distributive Law: factor product added to another term." },
      { name: "General POS to SOP Expansion", formula: "X(Y + Z) = XY + XZ", note: "First Distributive Law: multiply out sum terms." },
      { name: "Index Set Complementation (Same F)", formula: "F = Σm(S) <=> F = ΠM(U \\ S)", note: "U = {0, 1, ..., 2^n - 1}. Same function, complementary index set." },
      { name: "Function Complementation (Inverted F)", formula: "F' = Σm(U \\ S) = ΠM(S)", note: "Inverting the function swaps the minterm and maxterm index lists." }
    ],

    decisionTable: [
      { given: "General SOP", required: "Canonical SOP", method: "Multiply each term lacking variable X by (X + X'); distribute and deduplicate." },
      { given: "General POS", required: "Canonical POS", method: "Add XX' = 0 to each sum term lacking X; distribute as (T + X)(T + X') and deduplicate." },
      { given: "Canonical SOP (Σm)", required: "Canonical POS (ΠM)", method: "Subtract minterm index set from universe: F = ΠM(U \\ S_m)." },
      { given: "Canonical POS (ΠM)", required: "Canonical SOP (Σm)", method: "Subtract maxterm index set from universe: F = Σm(U \\ S_M)." },
      { given: "General SOP", required: "General POS", method: "Apply second distributive law X + YZ = (X + Y)(X + Z) or factor common literals." },
      { given: "General POS", required: "General SOP", method: "Multiply out factors using first distributive law, apply AA'=0 and absorption." },
      { given: "Arbitrary Expression", required: "Canonical Forms", method: "Evaluate truth table for all 2^n rows; 1-rows are Σm, 0-rows are ΠM." }
    ],

    coreIdentities: [
      { name: "Second Distributive Law", formula: "X + YZ = (X + Y)(X + Z)", use: "Core engine for SOP-to-POS factoring." },
      { name: "Absorption Laws", formula: "X + XY = X and X(X + Y) = X", use: "Eliminating redundant sub-terms." },
      { name: "Redundancy Theorem", formula: "X + X'Y = X + Y and X(X' + Y) = XY", use: "Removing negated literals from adjacent terms." },
      { name: "Consensus Theorem", formula: "XY + X'Z + YZ = XY + X'Z", use: "Eliminating the redundant third term YZ." },
      { name: "De Morgan's Theorems", formula: "(X + Y)' = X'Y' and (XY)' = X' + Y'", use: "Inverting sums and products." },
      { name: "Involution Law", formula: "(X')' = X", use: "Double negation cancellation." }
    ],

    commonMistakes: [
      {
        mistake: "Using (X + X') to expand POS sum terms",
        correct: "Add XX' = 0: (A + B) + CC' = (A + B + C)(A + B + C')",
        why: "Multiplying (A + B) by (C + C') turns it into an SOP term AC + AC' + BC + BC', completely destroying the POS structure!"
      },
      {
        mistake: "Keeping identical indices when converting Σm to ΠM for F",
        correct: "Use complementary indices: F = Σm(1, 2) <=> F = ΠM(0, 3) for 2 variables",
        why: "Writing ΠM(1, 2) defines F' (the complement), NOT the original function F!"
      },
      {
        mistake: "Forgetting to deduplicate minterms after expansion",
        correct: "Apply X + X = X to remove duplicate terms before listing indices",
        why: "Writing F = Σm(3, 3, 7) violates set notation and leads to incorrect K-Map entries."
      },
      {
        mistake: "Reversing minterm and maxterm polarity",
        correct: "Minterm: 1 -> uncomplemented, 0 -> complemented | Maxterm: 0 -> uncomplemented, 1 -> complemented",
        why: "Confusing polarity turns minterm m5 (101 -> AB'C) into maxterm M5 (101 -> A'+B+C')."
      },
      {
        mistake: "Assuming canonical form minimizes hardware",
        correct: "Canonical forms maximize term length; simplification is required for minimal hardware",
        why: "F = A has 1 literal; its canonical SOP in 3 variables has 12 literals across 4 gates."
      },
      {
        mistake: "Dropping parentheses when multiplying sum terms",
        correct: "Write (A + B)(C + D) with brackets strictly preserved",
        why: "Writing A + B · C + D evaluates as A + BC + D by operator precedence, altering the logic."
      },
      {
        mistake: "Ignoring declared variable order",
        correct: "Always arrange literals in declared order (e.g., A, B, C, D)",
        why: "Reading binary weights from scrambled literals (e.g. B'AC instead of AB'C) produces completely wrong numerical indices."
      },
      {
        mistake: "Treating AA' as 1 instead of 0 in POS expansion",
        correct: "AA' = 0 by Complement Law (A AND NOT A is always FALSE)",
        why: "A + A' = 1, but A · A' = 0. Confusing AND and OR complements corrupts algebraic reductions."
      },
      {
        mistake: "Assuming fewer written terms always means lower delay or power",
        correct: "Evaluate real gate fan-in, circuit depth, and semiconductor load capacitance",
        why: "A single 8-input gate may have higher delay and capacitance than a 2-level tree of 2-input gates."
      },
      {
        mistake: "Confusing converting F with complementing F",
        correct: "Converting F: same output, complementary indices | Complementing F: inverted output, swapped notation",
        why: "F = ΠM(U \\ S) preserves the function; F' = Σm(U \\ S) inverts the function."
      },
      {
        mistake: "Substituting written words 'Sigma' and 'Pi' in formulas",
        correct: "Always write actual mathematical symbols: Σm(...) and ΠM(...)",
        why: "Academic presentation standards require official mathematical notation for exams and formal publications."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // TAB 6: PRACTICE LAB DATA (28 QUESTIONS)
  // --------------------------------------------------------------------------
  practiceLab: [
    // --- BASIC (6) ---
    {
      id: "PE2.4-B01",
      difficulty: "Basic",
      problemStatement: "Given the Boolean function F(A, B, C) = A'B + C, obtain both its canonical SOP (Σm) and canonical POS (ΠM) representations.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP and Canonical POS",
      hint: "Expand A'B for variable C, and expand C for variables A and B. Then identify the complementary 0-rows.",
      steps: [
        { step: 1, expr: "A'B lacks C: A'B(C + C') = A'BC + A'BC' (m3, m2)", law: "Missing literal expansion", reason: "Multiply by 1 = (C + C')." },
        { step: 2, expr: "C lacks A and B: C(A + A')(B + B') = ABC + AB'C + A'BC + A'B'C (m7, m5, m3, m1)", law: "Missing literal expansion", reason: "Multiply by (A + A')(B + B')." },
        { step: 3, expr: "Combine & deduplicate: {3, 2} union {7, 5, 3, 1} = {1, 2, 3, 5, 7}", law: "Idempotent Law", reason: "m3 appears in both terms; deduplicate." },
        { step: 4, expr: "Canonical SOP: F(A, B, C) = Σm(1, 2, 3, 5, 7)", law: "SOP formulation", reason: "List in ascending order." },
        { step: 5, expr: "Canonical POS: U \\ {1, 2, 3, 5, 7} = {0, 4, 6}\nF(A, B, C) = ΠM(0, 4, 6)", law: "Index complementation", reason: "Complementary rows of 3-variable universe." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(1, 2, 3, 5, 7) | Canonical POS: F = ΠM(0, 4, 6)",
      takeaway: "5 minterms + 3 maxterms = 8 total combinations."
    },
    {
      id: "PE2.4-B02",
      difficulty: "Basic",
      problemStatement: "Given F(A, B, C) = (A + C)(B + C'), obtain its canonical SOP and canonical POS representations.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP and Canonical POS",
      hint: "Expand each sum term by adding missing variables (BB' and AA') or multiply out into general SOP first.",
      steps: [
        { step: 1, expr: "(A + C) = (A + C) + BB' = (A + B + C)(A + B' + C) -> M0 (000), M2 (010)", law: "Distributive Law", reason: "Add BB' = 0 and distribute." },
        { step: 2, expr: "(B + C') = (B + C') + AA' = (A + B + C')(A' + B + C') -> M1 (001), M5 (101)", law: "Distributive Law", reason: "Add AA' = 0 and distribute." },
        { step: 3, expr: "Canonical POS: F(A, B, C) = ΠM(0, 1, 2, 5)", law: "POS formulation", reason: "Combine all 4 unique maxterms." },
        { step: 4, expr: "Canonical SOP: U \\ {0, 1, 2, 5} = {3, 4, 6, 7}\nF(A, B, C) = Σm(3, 4, 6, 7)", law: "Index complementation", reason: "Remaining rows where F = 1." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(0, 1, 2, 5) | Canonical SOP: F = Σm(3, 4, 6, 7)",
      takeaway: "Direct maxterm expansion is clean and avoids polynomial multiplication errors."
    },
    {
      id: "PE2.4-B03",
      difficulty: "Basic",
      problemStatement: "Given the canonical SOP expression F(A, B, C) = Σm(0, 2, 6), convert it to canonical POS notation.",
      declaredVariables: "A, B, C",
      target: "Canonical POS (ΠM)",
      hint: "Subtract the given minterm indices from the 3-variable universe U = {0, 1, ..., 7}.",
      steps: [
        { step: 1, expr: "U = {0, 1, 2, 3, 4, 5, 6, 7}", law: "Domain definition", reason: "n = 3 variables gives 8 rows." },
        { step: 2, expr: "Given minterms: S_m = {0, 2, 6}", law: "Given data", reason: "Rows where F = 1." },
        { step: 3, expr: "Maxterm indices: S_M = U \\ S_m = {1, 3, 4, 5, 7}", law: "Set complementation", reason: "Rows where F = 0." }
      ],
      finalAnswer: "F(A, B, C) = ΠM(1, 3, 4, 5, 7)",
      takeaway: "Direct conversion between canonical forms of the same function is purely a set-complement operation."
    },
    {
      id: "PE2.4-B04",
      difficulty: "Basic",
      problemStatement: "Given F(A, B, C) = ΠM(1, 4, 7), convert it to canonical SOP notation.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP (Σm)",
      hint: "Identify the 1-rows by subtracting maxterm indices {1, 4, 7} from {0..7}.",
      steps: [
        { step: 1, expr: "Universe: U = {0, 1, 2, 3, 4, 5, 6, 7}", law: "Domain definition", reason: "3 variables." },
        { step: 2, expr: "Given maxterms: S_M = {1, 4, 7}", law: "Given data", reason: "Rows where F = 0." },
        { step: 3, expr: "Minterm indices: S_m = U \\ S_M = {0, 2, 3, 5, 6}", law: "Set complementation", reason: "Rows where F = 1." }
      ],
      finalAnswer: "F(A, B, C) = Σm(0, 2, 3, 5, 6)",
      takeaway: "8 - 3 = 5 minterms."
    },
    {
      id: "PE2.4-B05",
      difficulty: "Basic",
      problemStatement: "Given F(A, B, C) = A + B'C, obtain its canonical representations.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP and Canonical POS",
      hint: "A is 1 on rows 4, 5, 6, 7; B'C is 1 on rows 1, 5.",
      steps: [
        { step: 1, expr: "A covers rows: 100(4), 101(5), 110(6), 111(7)", law: "Minterm expansion", reason: "A is 1 for bottom 4 rows." },
        { step: 2, expr: "B'C covers rows: 001(1), 101(5)", law: "Minterm expansion", reason: "B=0, C=1." },
        { step: 3, expr: "S_m = {4, 5, 6, 7} union {1, 5} = {1, 4, 5, 6, 7}", law: "Idempotent Law", reason: "Deduplicate row 5." },
        { step: 4, expr: "Canonical SOP: F = Σm(1, 4, 5, 6, 7)\nCanonical POS: F = ΠM(0, 2, 3)", law: "Index complementation", reason: "Remaining rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(1, 4, 5, 6, 7) | Canonical POS: F = ΠM(0, 2, 3)",
      takeaway: "Notice that F = A + B'C is the minimal form of the function studied in Guided Demo 3."
    },
    {
      id: "PE2.4-B06",
      difficulty: "Basic",
      problemStatement: "Given F(A, B, C) = (A' + B)(A + C), obtain canonical representations.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP and Canonical POS",
      hint: "Multiply out into SOP: A'C + AB + BC = A'C + AB.",
      steps: [
        { step: 1, expr: "(A' + B)(A + C) = A'A + A'C + AB + BC = A'C + AB + BC", law: "First Distributive Law", reason: "A'A = 0." },
        { step: 2, expr: "A'C + AB + BC = A'C + AB", law: "Consensus Theorem", reason: "BC is redundant consensus term." },
        { step: 3, expr: "A'C = 001(m1), 011(m3)\nAB = 110(m6), 111(m7)", law: "Minterm mapping", reason: "Expand to 3 literals." },
        { step: 4, expr: "Canonical SOP: F = Σm(1, 3, 6, 7)\nCanonical POS: F = ΠM(0, 2, 4, 5)", law: "Index complementation", reason: "Remaining rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(1, 3, 6, 7) | Canonical POS: F = ΠM(0, 2, 4, 5)",
      takeaway: "Consensus theorem simplifies the intermediate SOP before minterm mapping."
    },

    // --- INTERMEDIATE (8) ---
    {
      id: "PE2.4-I01",
      difficulty: "Intermediate",
      problemStatement: "Given F(A, B, C) = A'B + AC', obtain its canonical SOP and canonical POS representations.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP and Canonical POS",
      hint: "Expand A'B with (C + C') and AC' with (B + B').",
      steps: [
        { step: 1, expr: "A'B(C + C') = A'BC + A'BC' (m3, m2)", law: "Missing literal expansion", reason: "Expand term 1." },
        { step: 2, expr: "AC'(B + B') = ABC' + AB'C' (m6, m4)", law: "Missing literal expansion", reason: "Expand term 2." },
        { step: 3, expr: "Canonical SOP: F = Σm(2, 3, 4, 6)", law: "Combination", reason: "No duplicates exist. Sort ascending." },
        { step: 4, expr: "Canonical POS: F = ΠM(0, 1, 5, 7)", law: "Index complementation", reason: "Complementary rows in U={0..7}." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(2, 3, 4, 6) | Canonical POS: F = ΠM(0, 1, 5, 7)",
      takeaway: "Notice this is an even-parity / dual-combining symmetric pattern."
    },
    {
      id: "PE2.4-I02",
      difficulty: "Intermediate",
      problemStatement: "Given F(A, B, C) = (A + B')(B + C), obtain canonical representations.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP and Canonical POS",
      hint: "Find 0-rows: (A + B')=0 at rows {2, 3}; (B + C)=0 at rows {0, 4}.",
      steps: [
        { step: 1, expr: "(A + B') = 0 when A=0, B=1: rows 010(2), 011(3)", law: "Maxterm evaluation", reason: "Term 1 equals 0." },
        { step: 2, expr: "(B + C) = 0 when B=0, C=0: rows 000(0), 100(4)", law: "Maxterm evaluation", reason: "Term 2 equals 0." },
        { step: 3, expr: "Canonical POS: S_M = {0, 2, 3, 4} -> F = ΠM(0, 2, 3, 4)", law: "Combination", reason: "No overlap between these row sets." },
        { step: 4, expr: "Canonical SOP: S_m = U \\ S_M = {1, 5, 6, 7}\nF = Σm(1, 5, 6, 7)", law: "Index complementation", reason: "Remaining rows where F = 1." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(0, 2, 3, 4) | Canonical SOP: F = Σm(1, 5, 6, 7)",
      takeaway: "Evaluating rows directly from POS is much faster than multiplying."
    },
    {
      id: "PE2.4-I03",
      difficulty: "Intermediate",
      problemStatement: "Given F(A, B, C) = (A + C)(A' + B), obtain canonical representations.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP and Canonical POS",
      hint: "Multiply out or find 0-rows: (A+C)=0 at {0, 2}; (A'+B)=0 at {4, 5}.",
      steps: [
        { step: 1, expr: "(A + C) = 0 when A=0, C=0: {0, 2}", law: "Maxterm row analysis", reason: "B can be 0 or 1." },
        { step: 2, expr: "(A' + B) = 0 when A=1, B=0: {4, 5}", law: "Maxterm row analysis", reason: "C can be 0 or 1." },
        { step: 3, expr: "Canonical POS: F = ΠM(0, 2, 4, 5)", law: "Combination", reason: "4 unique maxterm rows." },
        { step: 4, expr: "Canonical SOP: F = Σm(1, 3, 6, 7)", law: "Index complementation", reason: "Remaining 1-rows: U \\ {0, 2, 4, 5}." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(0, 2, 4, 5) | Canonical SOP: F = Σm(1, 3, 6, 7)",
      takeaway: "Identical function to PE2.4-B06 expressed in dual form."
    },
    {
      id: "PE2.4-I04",
      difficulty: "Intermediate",
      problemStatement: "Given F(A, B, C) = AB' + B'C, obtain canonical representations.",
      declaredVariables: "A, B, C",
      target: "Canonical SOP and Canonical POS",
      hint: "Factor out B': F = B'(A + C). AB' covers {4, 5}; B'C covers {1, 5}.",
      steps: [
        { step: 1, expr: "AB' covers A=1, B=0: rows 100(4), 101(5)", law: "Minterm mapping", reason: "C can be 0 or 1." },
        { step: 2, expr: "B'C covers B=0, C=1: rows 001(1), 101(5)", law: "Minterm mapping", reason: "A can be 0 or 1." },
        { step: 3, expr: "S_m = {4, 5} union {1, 5} = {1, 4, 5}", law: "Idempotent Law", reason: "Deduplicate row 5." },
        { step: 4, expr: "Canonical SOP: F = Σm(1, 4, 5)\nCanonical POS: F = ΠM(0, 2, 3, 6, 7)", law: "Index complementation", reason: "Remaining 5 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(1, 4, 5) | Canonical POS: F = ΠM(0, 2, 3, 6, 7)",
      takeaway: "3 minterms + 5 maxterms = 8 total rows."
    },
    {
      id: "PE2.4-I05",
      difficulty: "Intermediate",
      problemStatement: "Given the 4-variable expression F(A, B, C, D) = ABC + D, obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      variableOrder: "A (MSB), B, C, D (LSB)",
      target: "Canonical SOP and Canonical POS",
      hint: "D is 1 on all 8 odd rows; ABC is 1 on rows 14 and 15.",
      steps: [
        { step: 1, expr: "D = 1 on all 8 odd rows: {1, 3, 5, 7, 9, 11, 13, 15}", law: "Minterm mapping", reason: "D covers 8 rows." },
        { step: 2, expr: "ABC = 1 when A=1, B=1, C=1: rows 1110(14), 1111(15)", law: "Minterm mapping", reason: "ABC covers 2 rows." },
        { step: 3, expr: "S_m = {1, 3, 5, 7, 9, 11, 13, 15} union {14, 15} = {1, 3, 5, 7, 9, 11, 13, 14, 15}", law: "Idempotent Law", reason: "Row 15 deduplicated. Total 9 minterm rows." },
        { step: 4, expr: "Canonical SOP: F = Σm(1, 3, 5, 7, 9, 11, 13, 14, 15)\nCanonical POS: F = ΠM(0, 2, 4, 6, 8, 10, 12)", law: "Index complementation", reason: "Remaining 7 even rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(1, 3, 5, 7, 9, 11, 13, 14, 15) | Canonical POS: F = ΠM(0, 2, 4, 6, 8, 10, 12)",
      takeaway: "A single literal in 4 variables covers 8 rows."
    },
    {
      id: "PE2.4-I06",
      difficulty: "Intermediate",
      problemStatement: "Given the 4-variable expression F(A, B, C, D) = (A + B)(C' + D), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and Canonical POS",
      hint: "Find 0-rows: (A + B) = 0 on {0, 1, 2, 3}; (C' + D) = 0 on {2, 6, 10, 14}.",
      steps: [
        { step: 1, expr: "(A + B) = 0 when A=0, B=0: {0, 1, 2, 3}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 2, expr: "(C' + D) = 0 when C=1, D=0: {2, 6, 10, 14}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 3, expr: "S_M = {0, 1, 2, 3} union {2, 6, 10, 14} = {0, 1, 2, 3, 6, 10, 14}", law: "Idempotent Law", reason: "Deduplicate row 2. Total 7 maxterms." },
        { step: 4, expr: "Canonical POS: F = ΠM(0, 1, 2, 3, 6, 10, 14)\nCanonical SOP: F = Σm(4, 5, 7, 8, 9, 11, 12, 13, 15)", law: "Index complementation", reason: "Remaining 16 - 7 = 9 minterm rows." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(0, 1, 2, 3, 6, 10, 14) | Canonical SOP: F = Σm(4, 5, 7, 8, 9, 11, 12, 13, 15)",
      takeaway: "Deduplicating row 2 (0010) is critical."
    },
    {
      id: "PE2.4-I07",
      difficulty: "Intermediate",
      problemStatement: "Given F(A, B, C, D) = Σm(0, 2, 3, 7, 8, 10, 11, 15), convert to ΠM notation.",
      declaredVariables: "A, B, C, D",
      target: "Canonical POS (ΠM)",
      hint: "Subtract the 8 given indices from U = {0, 1, ..., 15}.",
      steps: [
        { step: 1, expr: "U = {0, 1, ..., 15}", law: "Domain definition", reason: "4 variables gives 16 rows." },
        { step: 2, expr: "S_m = {0, 2, 3, 7, 8, 10, 11, 15}", law: "Given data", reason: "8 minterms." },
        { step: 3, expr: "S_M = U \\ S_m = {1, 4, 5, 6, 9, 12, 13, 14}", law: "Set complementation", reason: "Remaining 8 rows." }
      ],
      finalAnswer: "F(A, B, C, D) = ΠM(1, 4, 5, 6, 9, 12, 13, 14)",
      takeaway: "Exact 50/50 balanced function (8 minterms, 8 maxterms)."
    },
    {
      id: "PE2.4-I08",
      difficulty: "Intermediate",
      problemStatement: "Given F(A, B, C, D) = ΠM(0, 1, 4, 6, 9, 12, 14), convert to Σm notation.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP (Σm)",
      hint: "Subtract the 7 given maxterm indices from {0..15}.",
      steps: [
        { step: 1, expr: "U = {0, 1, ..., 15}", law: "Domain definition", reason: "16 rows total." },
        { step: 2, expr: "S_M = {0, 1, 4, 6, 9, 12, 14}", law: "Given data", reason: "7 maxterms." },
        { step: 3, expr: "S_m = U \\ S_M = {2, 3, 5, 7, 8, 10, 11, 13, 15}", law: "Set complementation", reason: "16 - 7 = 9 minterm rows." }
      ],
      finalAnswer: "F(A, B, C, D) = Σm(2, 3, 5, 7, 8, 10, 11, 13, 15)",
      takeaway: "9 minterms + 7 maxterms = 16 rows."
    },

    // --- ADVANCED (10) ---
    {
      id: "PE2.4-A01",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = (AB + C')(A' + D), obtain canonical SOP and POS representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Multiply out: ABA' + ABD + A'C' + C'D = ABD + A'C' + C'D.",
      steps: [
        { step: 1, expr: "(AB + C')(A' + D) = ABA' + ABD + A'C' + C'D = ABD + A'C' + C'D", law: "First Distributive Law", reason: "ABA' = 0." },
        { step: 2, expr: "ABD covers A=1, B=1, D=1: rows 1101(13), 1111(15)", law: "Minterm mapping", reason: "C can be 0 or 1." },
        { step: 3, expr: "A'C' covers A=0, C=0: rows 0000(0), 0001(1), 0100(4), 0101(5)", law: "Minterm mapping", reason: "B and D can be anything." },
        { step: 4, expr: "C'D covers C=0, D=1: rows 0001(1), 0101(5), 1001(9), 1101(13)", law: "Minterm mapping", reason: "A and B can be anything." },
        { step: 5, expr: "S_m = {13, 15} union {0, 1, 4, 5} union {1, 5, 9, 13} = {0, 1, 4, 5, 9, 13, 15}", law: "Idempotent Law", reason: "Deduplicate rows 1, 5, 13. Total 7 minterms." },
        { step: 6, expr: "Canonical SOP: F = Σm(0, 1, 4, 5, 9, 13, 15)\nCanonical POS: F = ΠM(2, 3, 6, 7, 8, 10, 11, 12, 14)", law: "Index complementation", reason: "Remaining 9 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(0, 1, 4, 5, 9, 13, 15) | Canonical POS: F = ΠM(2, 3, 6, 7, 8, 10, 11, 12, 14)",
      takeaway: "7 minterms + 9 maxterms = 16 rows."
    },
    {
      id: "PE2.4-A02",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = A'BC + AB'D + CD', obtain canonical SOP and POS representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Expand terms: A'BC has rows {6, 7}; AB'D has rows {9, 11}; CD' has rows {2, 6, 10, 14}.",
      steps: [
        { step: 1, expr: "A'BC covers 0110(6), 0111(7)", law: "Minterm mapping", reason: "D can be 0 or 1." },
        { step: 2, expr: "AB'D covers 1001(9), 1011(11)", law: "Minterm mapping", reason: "C can be 0 or 1." },
        { step: 3, expr: "CD' covers 0010(2), 0110(6), 1010(10), 1110(14)", law: "Minterm mapping", reason: "A and B can be anything." },
        { step: 4, expr: "S_m = {6, 7} union {9, 11} union {2, 6, 10, 14} = {2, 6, 7, 9, 10, 11, 14}", law: "Idempotent Law", reason: "Deduplicate row 6. Total 7 minterms." },
        { step: 5, expr: "Canonical SOP: F = Σm(2, 6, 7, 9, 10, 11, 14)\nCanonical POS: F = ΠM(0, 1, 3, 4, 5, 8, 12, 13, 15)", law: "Index complementation", reason: "Remaining 9 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(2, 6, 7, 9, 10, 11, 14) | Canonical POS: F = ΠM(0, 1, 3, 4, 5, 8, 12, 13, 15)",
      takeaway: "Notice row 6 (0110) appears in both A'BC and CD'."
    },
    {
      id: "PE2.4-A03",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = (A' + B)(B' + C)(C' + D), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and Canonical POS",
      hint: "Notice this is an implication chain: A -> B -> C -> D. When is it 1?",
      steps: [
        { step: 1, expr: "(A' + B) = 0 on A=1, B=0: {8, 9, 10, 11}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 2, expr: "(B' + C) = 0 on B=1, C=0: {4, 5, 12, 13}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 3, expr: "(C' + D) = 0 on C=1, D=0: {2, 6, 10, 14}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 4, expr: "S_M = {8, 9, 10, 11} union {4, 5, 12, 13} union {2, 6, 10, 14} = {2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14}", law: "Idempotent Law", reason: "Deduplicate row 10. Total 11 maxterm rows." },
        { step: 5, expr: "Canonical POS: F = ΠM(2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14)\nCanonical SOP: F = Σm(0, 1, 3, 7, 15)", law: "Index complementation", reason: "Remaining 5 rows where F = 1." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14) | Canonical SOP: F = Σm(0, 1, 3, 7, 15)",
      takeaway: "The 1-rows are exactly 0000, 0001, 0011, 0111, 1111: the valid monotonic binary prefixes."
    },
    {
      id: "PE2.4-A04",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = (A + B'C)(A' + D), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Multiply out: AA' + AD + A'B'C + B'CD = AD + A'B'C + B'CD.",
      steps: [
        { step: 1, expr: "(A + B'C)(A' + D) = AA' + AD + A'B'C + B'CD = AD + A'B'C + B'CD", law: "First Distributive Law", reason: "AA' = 0." },
        { step: 2, expr: "AD = 1 on A=1, D=1: {9, 11, 13, 15}", law: "Minterm mapping", reason: "B and C take all values." },
        { step: 3, expr: "A'B'C = 1 on A=0, B=0, C=1: rows 0010(2), 0011(3)", law: "Minterm mapping", reason: "D can be 0 or 1." },
        { step: 4, expr: "B'CD = 1 on B=0, C=1, D=1: rows 0011(3), 1011(11)", law: "Minterm mapping", reason: "A can be 0 or 1." },
        { step: 5, expr: "S_m = {9, 11, 13, 15} union {2, 3} union {3, 11} = {2, 3, 9, 11, 13, 15}", law: "Idempotent Law", reason: "Deduplicate rows 3 and 11. Total 6 minterms." },
        { step: 6, expr: "Canonical SOP: F = Σm(2, 3, 9, 11, 13, 15)\nCanonical POS: F = ΠM(0, 1, 4, 5, 6, 7, 8, 10, 12, 14)", law: "Index complementation", reason: "Remaining 10 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(2, 3, 9, 11, 13, 15) | Canonical POS: F = ΠM(0, 1, 4, 5, 6, 7, 8, 10, 12, 14)",
      takeaway: "6 minterms + 10 maxterms = 16 rows."
    },
    {
      id: "PE2.4-A05",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = (A + B)(A' + C)(B' + D), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Find 0-rows: (A+B)=0 on {0..3}; (A'+C)=0 on {4..7 with C=0: 4,5}; (B'+D)=0 on B=1,D=0.",
      steps: [
        { step: 1, expr: "(A + B) = 0 on A=0, B=0: {0, 1, 2, 3}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 2, expr: "(A' + C) = 0 on A=1, C=0: {8, 9, 12, 13}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 3, expr: "(B' + D) = 0 on B=1, D=0: {2, 6, 10, 14}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 4, expr: "S_M = {0, 1, 2, 3} union {8, 9, 12, 13} union {2, 6, 10, 14} = {0, 1, 2, 3, 4? wait: check (A'+C)=0 is A=1, C=0 -> 8,9,12,13. And {0,1,2,3,4,6,8,9,12,13,14}} -> wait, check row 4: A=0, B=1, C=0, D=0: (A+B)=1, (A'+C)=1, (B'+D)=0. Row 4 is 0!", law: "Row evaluation", reason: "Row 4 (0100): B=1, D=0 -> (B'+D)=0! So row 4 is in S_M." },
        { step: 5, expr: "S_M = {0, 1, 2, 3, 4, 6, 8, 9, 12, 13, 14} (total 11 maxterm rows)", law: "Deduplication", reason: "Rows where at least one factor is 0." },
        { step: 6, expr: "Canonical POS: F = ΠM(0, 1, 2, 3, 4, 6, 8, 9, 12, 13, 14)\nCanonical SOP: F = Σm(5, 7, 10, 11, 15)", law: "Index complementation", reason: "Remaining 5 rows: {5, 7, 10, 11, 15}." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(0, 1, 2, 3, 4, 6, 8, 9, 12, 13, 14) | Canonical SOP: F = Σm(5, 7, 10, 11, 15)",
      takeaway: "5 minterms + 11 maxterms = 16 rows."
    },
    {
      id: "PE2.4-A06",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = (A' + BC)(B + C'D), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Multiply out: A'B + A'C'D + BC + BCC'D = A'B + A'C'D + BC.",
      steps: [
        { step: 1, expr: "(A' + BC)(B + C'D) = A'B + A'C'D + BCB + BCC'D", law: "First Distributive Law", reason: "Multiply out factors." },
        { step: 2, expr: "= A'B + A'C'D + BC + 0 = A'B + BC + A'C'D", law: "Idempotent & Complement", reason: "BCB = BC; CC' = 0." },
        { step: 3, expr: "A'B covers A=0, B=1: rows {4, 5, 6, 7}", law: "Minterm mapping", reason: "4 rows." },
        { step: 4, expr: "BC covers B=1, C=1: rows {6, 7, 14, 15}", law: "Minterm mapping", reason: "4 rows." },
        { step: 5, expr: "A'C'D covers A=0, C=0, D=1: rows 0001(1), 0101(5)", law: "Minterm mapping", reason: "2 rows." },
        { step: 6, expr: "S_m = {4, 5, 6, 7} union {6, 7, 14, 15} union {1, 5} = {1, 4, 5, 6, 7, 14, 15}", law: "Idempotent Law", reason: "Deduplicate rows 5, 6, 7. Total 7 minterms." },
        { step: 7, expr: "Canonical SOP: F = Σm(1, 4, 5, 6, 7, 14, 15)\nCanonical POS: F = ΠM(0, 2, 3, 8, 9, 10, 11, 12, 13)", law: "Index complementation", reason: "Remaining 9 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(1, 4, 5, 6, 7, 14, 15) | Canonical POS: F = ΠM(0, 2, 3, 8, 9, 10, 11, 12, 13)",
      takeaway: "7 minterms + 9 maxterms = 16 rows."
    },
    {
      id: "PE2.4-A07",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = (AB + C)(A' + B'), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Notice (A' + B') = (AB)' by De Morgan! So F = (AB + C)(AB)' = AB(AB)' + C(AB)' = C(A' + B').",
      steps: [
        { step: 1, expr: "Notice (A' + B') = (AB)'", law: "De Morgan's Theorem", reason: "Express as complement of AB." },
        { step: 2, expr: "(AB + C)(AB)' = AB(AB)' + C(AB)' = 0 + C(A' + B') = A'C + B'C", law: "Complement Law", reason: "X · X' = 0 with X = AB." },
        { step: 3, expr: "A'C covers A=0, C=1: rows {2, 3, 6, 7}", law: "Minterm mapping", reason: "4 rows." },
        { step: 4, expr: "B'C covers B=0, C=1: rows {2, 3, 10, 11}", law: "Minterm mapping", reason: "4 rows." },
        { step: 5, expr: "S_m = {2, 3, 6, 7} union {2, 3, 10, 11} = {2, 3, 6, 7, 10, 11}", law: "Idempotent Law", reason: "Deduplicate rows 2, 3. Total 6 minterms." },
        { step: 6, expr: "Canonical SOP: F = Σm(2, 3, 6, 7, 10, 11)\nCanonical POS: F = ΠM(0, 1, 4, 5, 8, 9, 12, 13, 14, 15)", law: "Index complementation", reason: "Remaining 10 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(2, 3, 6, 7, 10, 11) | Canonical POS: F = ΠM(0, 1, 4, 5, 8, 9, 12, 13, 14, 15)",
      takeaway: "Spotting (AB)' saves extensive polynomial multiplication."
    },
    {
      id: "PE2.4-A08",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = (A + C)(B + D)(A' + D'), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Find 0-rows: (A+C)=0 on {0,1,4,5}; (B+D)=0 on {0,2,8,10}; (A'+D')=0 on {9,11,13,15}.",
      steps: [
        { step: 1, expr: "(A + C) = 0 on A=0, C=0: {0, 1, 4, 5}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 2, expr: "(B + D) = 0 on B=0, D=0: {0, 2, 8, 10}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 3, expr: "(A' + D') = 0 on A=1, D=1: {9, 11, 13, 15}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 4, expr: "S_M = {0, 1, 4, 5} union {0, 2, 8, 10} union {9, 11, 13, 15} = {0, 1, 2, 4, 5, 8, 9, 10, 11, 13, 15}", law: "Idempotent Law", reason: "Deduplicate row 0. Total 11 maxterm rows." },
        { step: 5, expr: "Canonical POS: F = ΠM(0, 1, 2, 4, 5, 8, 9, 10, 11, 13, 15)\nCanonical SOP: F = Σm(3, 6, 7, 12, 14)", law: "Index complementation", reason: "Remaining 5 rows where F = 1." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(0, 1, 2, 4, 5, 8, 9, 10, 11, 13, 15) | Canonical SOP: F = Σm(3, 6, 7, 12, 14)",
      takeaway: "11 maxterms + 5 minterms = 16 rows."
    },
    {
      id: "PE2.4-A09",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = (A' + B'C)(B + D'), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Multiply out: A'B + A'D' + B'CB + B'CD' = A'B + A'D' + B'CD'.",
      steps: [
        { step: 1, expr: "(A' + B'C)(B + D') = A'B + A'D' + B'BC + B'CD' = A'B + A'D' + B'CD'", law: "First Distributive Law", reason: "B'B = 0." },
        { step: 2, expr: "A'B covers A=0, B=1: rows {4, 5, 6, 7}", law: "Minterm mapping", reason: "4 rows." },
        { step: 3, expr: "A'D' covers A=0, D=0: rows {0, 2, 4, 6}", law: "Minterm mapping", reason: "4 rows." },
        { step: 4, expr: "B'CD' covers B=0, C=1, D=0: rows 0010(2), 1010(10)", law: "Minterm mapping", reason: "2 rows." },
        { step: 5, expr: "S_m = {4, 5, 6, 7} union {0, 2, 4, 6} union {2, 10} = {0, 2, 4, 5, 6, 7, 10}", law: "Idempotent Law", reason: "Deduplicate rows 2, 4, 6. Total 7 minterm rows." },
        { step: 6, expr: "Canonical SOP: F = Σm(0, 2, 4, 5, 6, 7, 10)\nCanonical POS: F = ΠM(1, 3, 8, 9, 11, 12, 13, 14, 15)", law: "Index complementation", reason: "Remaining 9 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(0, 2, 4, 5, 6, 7, 10) | Canonical POS: F = ΠM(1, 3, 8, 9, 11, 12, 13, 14, 15)",
      takeaway: "7 minterms + 9 maxterms = 16 rows."
    },
    {
      id: "PE2.4-A10",
      difficulty: "Advanced",
      problemStatement: "Given F(A, B, C, D) = [A'B + C(D + A)]', simplify into POS and obtain canonical forms.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Apply De Morgan: (A'B)' · [C(D+A)]' = (A + B')(C' + A'D').",
      steps: [
        { step: 1, expr: "[A'B + C(D + A)]' = (A'B)' · [C(D + A)]'", law: "De Morgan's Theorem", reason: "(X + Y)' = X' · Y'." },
        { step: 2, expr: "(A'B)' = A + B'; [C(D + A)]' = C' + (D + A)' = C' + A'D'", law: "De Morgan's Theorem", reason: "Invert both sub-expressions." },
        { step: 3, expr: "F = (A + B')(C' + A'D')", law: "General POS", reason: "Combined POS form." },
        { step: 4, expr: "Find where original interior G = A'B + CD + AC is 1:\nA'B = {4, 5, 6, 7}\nCD = {3, 7, 11, 15}\nAC = {10, 11, 14, 15}\nS_m(G) = {3, 4, 5, 6, 7, 10, 11, 14, 15} (9 rows)", law: "Interior evaluation", reason: "G = 1 on 9 rows." },
        { step: 5, expr: "Because F = G', F is 1 on U \\ S_m(G) = {0, 1, 2, 8, 9, 12, 13}\nCanonical SOP: F = Σm(0, 1, 2, 8, 9, 12, 13)", law: "Function complementation", reason: "7 rows where F = 1." },
        { step: 6, expr: "Canonical POS: F = ΠM(3, 4, 5, 6, 7, 10, 11, 14, 15)", law: "Index complementation", reason: "9 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(0, 1, 2, 8, 9, 12, 13) | Canonical POS: F = ΠM(3, 4, 5, 6, 7, 10, 11, 14, 15)",
      takeaway: "Evaluating the uncomplemented interior G and inverting the index set is much simpler than full algebraic multiplication."
    },

    // --- CHALLENGE (4) ---
    {
      id: "PE2.4-C01",
      difficulty: "Challenge",
      problemStatement: "Given F(A, B, C, D) = A'B + AB' + CD, find equivalent canonical SOP and POS representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Notice A'B + AB' is A ⊕ B (1 on 8 rows). CD adds rows where C=1, D=1.",
      steps: [
        { step: 1, expr: "A'B covers rows with A=0, B=1: {4, 5, 6, 7}", law: "Minterm mapping", reason: "4 rows." },
        { step: 2, expr: "AB' covers rows with A=1, B=0: {8, 9, 10, 11}", law: "Minterm mapping", reason: "4 rows." },
        { step: 3, expr: "CD covers rows with C=1, D=1: {3, 7, 11, 15}", law: "Minterm mapping", reason: "4 rows." },
        { step: 4, expr: "S_m = {4, 5, 6, 7} union {8, 9, 10, 11} union {3, 7, 11, 15} = {3, 4, 5, 6, 7, 8, 9, 10, 11, 15}", law: "Idempotent Law", reason: "Rows 7 and 11 deduplicated. Total 10 minterms." },
        { step: 5, expr: "Canonical SOP: F = Σm(3, 4, 5, 6, 7, 8, 9, 10, 11, 15)\nCanonical POS: F = ΠM(0, 1, 2, 12, 13, 14)", law: "Index complementation", reason: "Remaining 6 rows where F = 0." }
      ],
      finalAnswer: "Canonical SOP: F = Σm(3, 4, 5, 6, 7, 8, 9, 10, 11, 15) | Canonical POS: F = ΠM(0, 1, 2, 12, 13, 14)",
      takeaway: "10 minterms + 6 maxterms = 16 rows. Canonical POS is more compact here."
    },
    {
      id: "PE2.4-C02",
      difficulty: "Challenge",
      problemStatement: "Given F(A, B, C, D) = (A + B')(C + D')(A' + C), obtain canonical representations.",
      declaredVariables: "A, B, C, D",
      target: "Canonical SOP and POS",
      hint: "Find 0-rows for each of the 3 sum terms: (A+B')=0 at {4..7}; (C+D')=0 at {1,5,9,13}; (A'+C)=0 at {8,9,12,13}.",
      steps: [
        { step: 1, expr: "(A + B') = 0 when A=0, B=1: {4, 5, 6, 7}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 2, expr: "(C + D') = 0 when C=0, D=1: {1, 5, 9, 13}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 3, expr: "(A' + C) = 0 when A=1, C=0: {8, 9, 12, 13}", law: "Maxterm row analysis", reason: "4 rows." },
        { step: 4, expr: "S_M = {4, 5, 6, 7} union {1, 5, 9, 13} union {8, 9, 12, 13} = {1, 4, 5, 6, 7, 8, 9, 12, 13}", law: "Idempotent Law", reason: "Deduplicate rows 5, 9, 13. Total 9 maxterm rows." },
        { step: 5, expr: "Canonical POS: F = ΠM(1, 4, 5, 6, 7, 8, 9, 12, 13)\nCanonical SOP: F = Σm(0, 2, 3, 10, 11, 14, 15)", law: "Index complementation", reason: "Remaining 7 rows where F = 1." }
      ],
      finalAnswer: "Canonical POS: F = ΠM(1, 4, 5, 6, 7, 8, 9, 12, 13) | Canonical SOP: F = Σm(0, 2, 3, 10, 11, 14, 15)",
      takeaway: "9 maxterms + 7 minterms = 16 rows."
    },
    {
      id: "PE2.4-C03",
      difficulty: "Challenge",
      problemStatement: "Given F(A, B, C, D) = Σm(0, 3, 5, 6, 8, 11, 13, 14), convert it to canonical POS, and write the canonical SOP and POS for F'.",
      declaredVariables: "A, B, C, D",
      target: "F in ΠM, F' in Σm, F' in ΠM",
      hint: "Use complementary indices for F in POS. For F', remember minterms of F' are maxterms of F.",
      steps: [
        { step: 1, expr: "Domain: U = {0, 1, ..., 15}. Given S_m(F) = {0, 3, 5, 6, 8, 11, 13, 14} (8 rows).", law: "Domain definition", reason: "Even-parity 4-variable XOR-like function." },
        { step: 2, expr: "S_M(F) = U \\ S_m(F) = {1, 2, 4, 7, 9, 10, 12, 15} (8 rows)\nCanonical POS of F: F = ΠM(1, 2, 4, 7, 9, 10, 12, 15)", law: "Same function conversion", reason: "Rows where F = 0." },
        { step: 3, expr: "Complement of F (F'):\nRows where F' = 1 are rows where F = 0: S_m(F') = {1, 2, 4, 7, 9, 10, 12, 15}\nCanonical SOP of F': F' = Σm(1, 2, 4, 7, 9, 10, 12, 15)", law: "Function complementation", reason: "Minterms of F' equal maxterms of F." },
        { step: 4, expr: "Rows where F' = 0 are rows where F = 1: S_M(F') = {0, 3, 5, 6, 8, 11, 13, 14}\nCanonical POS of F': F' = ΠM(0, 3, 5, 6, 8, 11, 13, 14)", law: "Function complementation", reason: "Maxterms of F' equal minterms of F." }
      ],
      finalAnswer: "F = ΠM(1, 2, 4, 7, 9, 10, 12, 15) | F' = Σm(1, 2, 4, 7, 9, 10, 12, 15) | F' = ΠM(0, 3, 5, 6, 8, 11, 13, 14)",
      takeaway: "Mastering this distinction guarantees 100% accuracy on function inversion questions."
    },
    {
      id: "PE2.4-C04",
      difficulty: "Challenge",
      problemStatement: "Given F(A, B, C, D) = [(A + B)(C' + D')]', find equivalent general SOP, general POS, canonical SOP, and canonical POS.",
      declaredVariables: "A, B, C, D",
      target: "All 4 representations: General SOP, General POS, Canonical SOP, Canonical POS",
      hint: "De Morgan gives F = (A+B)' + (C'+D')' = A'B' + CD. Then factor A'B' + CD for POS.",
      steps: [
        { step: 1, expr: "Apply De Morgan: [(A + B)(C' + D')]' = (A + B)' + (C' + D')'", law: "De Morgan's Theorem", reason: "Invert product." },
        { step: 2, expr: "(A + B)' = A'B'; (C' + D')' = CD\nGeneral SOP: F = A'B' + CD", law: "De Morgan & Involution", reason: "Simplified general SOP." },
        { step: 3, expr: "General POS: A'B' + CD = (A'B' + C)(A'B' + D) = (C + A')(C + B')(D + A')(D + B')", law: "Second Distributive Law", reason: "Factor into 4 sum terms." },
        { step: 4, expr: "Minterms of A'B' + CD:\nA'B' = rows where A=0, B=0: {0, 1, 2, 3}\nCD = rows where C=1, D=1: {3, 7, 11, 15}\nCanonical SOP: F = Σm(0, 1, 2, 3, 7, 11, 15)", law: "Minterm mapping", reason: "Deduplicate row 3. Total 7 minterms." },
        { step: 5, expr: "Canonical POS: F = ΠM(U \\ {0, 1, 2, 3, 7, 11, 15})\n= ΠM(4, 5, 6, 8, 9, 10, 12, 13, 14)", law: "Index complementation", reason: "Remaining 9 maxterm rows." }
      ],
      finalAnswer: "General SOP: F = A'B' + CD | General POS: F = (C + A')(C + B')(D + A')(D + B') | Canonical SOP: F = Σm(0, 1, 2, 3, 7, 11, 15) | Canonical POS: F = ΠM(4, 5, 6, 8, 9, 10, 12, 13, 14)",
      takeaway: "Complete 4-form synthesis of a compound expression."
    }
  ]
};

export default dldSection24Data;
