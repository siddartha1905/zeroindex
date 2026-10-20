/**
 * Digital Logic Design (DLD) - Section 2.3 Data Module
 * Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 * All formulas use actual mathematical symbols: Σ (\u03A3) and Π (\u03A0).
 */

export const dldSection23Data = {
  id: "2.3",
  number: "2.3",
  title: "Boolean Functions, Minterms, Maxterms, Canonical and Standard Forms",
  badge: "Canonical Standards",
  status: "Available",
  estimatedReadTime: "18 min read",
  description: "Understand how truth tables are transformed into Boolean expressions, how minterms and maxterms are constructed, and how canonical forms represent complete logical functions.",

  // Tab 1: Start Here Content
  startHere: {
    whyMintermsMaxterms: {
      title: "Why Do We Need Minterms and Maxterms?",
      bullets: [
        {
          bold: "Digital circuits work with binary inputs and outputs.",
          text: "Every input combination determines the required circuit output."
        },
        {
          bold: "Truth tables describe all possible input combinations.",
          text: "A complete truth table tells us exactly when the output should be 0 or 1."
        },
        {
          bold: "We need a systematic mathematical representation.",
          text: "Writing Boolean expressions directly from many input combinations can otherwise become difficult and error-prone."
        },
        {
          bold: "Minterms represent individual input combinations where their term is 1.",
          text: "They help construct canonical SOP expressions from the truth-table rows where F = 1."
        },
        {
          bold: "Maxterms represent individual input combinations where their term is 0.",
          text: "They help construct canonical POS expressions from the truth-table rows where F = 0."
        },
        {
          bold: "Canonical forms give us a complete representation of a function.",
          text: "They provide a foundation for the more detailed conversion and minimization methods studied later."
        }
      ],
      questionCallout: "How do we turn a truth table into a Boolean expression?"
    },

    symbolFirstUse: {
      title: "First-Use Mathematical Notation Guide: Σ and Π",
      sigma: {
        symbol: "Σ",
        name: "Capital Sigma (Sum)",
        meaning: "Represents the logical OR (sum) of selected minterms.",
        termType: "Lowercase m denotes a minterm (product term): m_i.",
        example: "F = Σm(1, 2, 3) = m1 + m2 + m3"
      },
      pi: {
        symbol: "Π",
        name: "Capital Pi (Product)",
        meaning: "Represents the logical AND (product) of selected maxterms.",
        termType: "Uppercase M denotes a maxterm (sum term): M_i.",
        example: "F = ΠM(0) = M0"
      },
      indicesRule: "Indices inside parentheses indicate the exact truth-table row numbers where the function condition holds."
    },

    alarmDemo: {
      title: "First Learning Demonstration: Two-Input Alarm System",
      scenario: "Consider a practical digital security alarm with two binary sensors: A = Door Open sensor (1 = open, 0 = closed), B = Motion Detected sensor (1 = motion, 0 = no motion). The alarm siren F must sound (F = 1) whenever the door is opened OR motion is detected inside.",
      functionExpr: "F = A + B",
      truthTable: [
        { index: 0, A: 0, B: 0, F: 0, rowType: "zero", minterm: "m0 = A'B'", maxterm: "M0 = (A + B)", note: "Safe: Door closed, no motion -> Alarm quiet" },
        { index: 1, A: 0, B: 1, F: 1, rowType: "one", minterm: "m1 = A'B", maxterm: "M1 = (A + B')", note: "Breach: Motion detected while door closed -> Alarm sounds" },
        { index: 2, A: 1, B: 0, F: 1, rowType: "one", minterm: "m2 = AB'", maxterm: "M2 = (A' + B)", note: "Breach: Door forced open without motion -> Alarm sounds" },
        { index: 3, A: 1, B: 1, F: 1, rowType: "one", minterm: "m3 = AB", maxterm: "M3 = (A' + B')", note: "Breach: Door open and motion detected -> Alarm sounds" }
      ],
      sopDerivation: {
        title: "Canonical Sum of Products (SOP) via Minterms",
        explanation: "To guarantee F = 1 for rows 1, 2, and 3, we take the logical OR (sum) of the minterms corresponding to each 1-output row:",
        expandedExpr: "F = A'B + AB' + AB",
        compactNotation: "F(A, B) = Σm(1, 2, 3)"
      },
      posDerivation: {
        title: "Canonical Product of Sums (POS) via Maxterms",
        explanation: "Alternatively, we can describe the exact conditions where the alarm stays quiet (F = 0). Row 0 is the only zero-output condition. Taking the logical AND (product) of the zero-row maxterms:",
        expandedExpr: "F = (A + B)",
        compactNotation: "F(A, B) = ΠM(0)"
      },
      takeaway: "Both canonical representations describe the identical physical circuit behavior. Algebraic simplification confirms that A'B + AB' + AB simplifies to A + B, perfectly matching ΠM(0) = (A + B). Minterms and maxterms are two complementary lenses for specifying the exact same truth table."
    },

    learningFlow: {
      title: "The Systematic Canonical Transformation Pipeline",
      subtitle: "From Binary Input Conditions to Canonical Specifications",
      steps: [
        {
          step: 1,
          name: "Binary Inputs",
          desc: "Declare named binary input variables in strict significant order: MSB on the left to LSB on the right (e.g. A, B, C)."
        },
        {
          step: 2,
          name: "Truth Table",
          desc: "Enumerate all 2^n unique binary input combinations and assign the required functional output (1 or 0) for each row."
        },
        {
          step: 3,
          name: "Select Output Rows",
          desc: "For Canonical SOP, highlight all rows where F = 1. For Canonical POS, highlight all rows where F = 0."
        },
        {
          step: 4,
          name: "Construct Terms",
          desc: "Apply the polarity rules: form product minterms (0 -> complemented, 1 -> uncomplemented) or sum maxterms (0 -> uncomplemented, 1 -> complemented)."
        },
        {
          step: 5,
          name: "Canonical Expression",
          desc: "Combine terms: OR the minterms to yield Σm(...) or AND the maxterms to yield ΠM(...)."
        }
      ]
    },

    coreFundamentals: [
      {
        term: "Boolean Function",
        definition: "A mathematical rule that maps n binary input variables to a single binary output bit (0 or 1).",
        plainExplanation: "A digital logic specification describing how an electronic circuit responds to every possible input signal.",
        smallExample: "F(A, B) = A + B",
        truthTableMeaning: "Represented by the complete output column F across all rows of the truth table."
      },
      {
        term: "Binary Input Variables",
        definition: "Independent binary variables that can assume values exclusively from the set {0, 1}.",
        plainExplanation: "The physical input wires feeding into a logic gate network or switching circuit.",
        smallExample: "Inputs A, B, C for a 3-input voting circuit.",
        truthTableMeaning: "Form the n input columns on the left side of the truth table."
      },
      {
        term: "Function Output",
        definition: "The dependent binary value determined by evaluating the Boolean function for a given combination of input values.",
        plainExplanation: "The electrical voltage level produced at the output wire (High = 1, Low = 0).",
        smallExample: "F = 1 when A = 0, B = 1 in an OR gate.",
        truthTableMeaning: "The single binary entry in the F column for a specific row."
      },
      {
        term: "Truth-Table Rows",
        definition: "A complete list of all 2^n possible permutations of n binary variables, ordered systematically by binary count.",
        plainExplanation: "A comprehensive grid listing every scenario that could ever happen to the circuit.",
        smallExample: "Row 5 in a 3-variable table corresponds to input bits 101.",
        truthTableMeaning: "Each individual horizontal line in the truth table representing one unique state."
      },
      {
        term: "Variable Ordering",
        definition: "The strict sequence in which binary variables are assigned significant positional weight (MSB to LSB).",
        plainExplanation: "The alphabetical or declared order ensuring that binary 100 always means index 4, not index 1.",
        smallExample: "For variables (A, B, C), A has weight 4, B has weight 2, and C has weight 1.",
        truthTableMeaning: "Determines the exact column order from left to right across the table."
      },
      {
        term: "Decimal Row Index",
        definition: "The decimal integer value obtained by converting the binary input string of that row into base-10.",
        plainExplanation: "The unique integer tag (0 to 2^n - 1) identifying each row in the truth table.",
        smallExample: "Binary 1010 has decimal row index 8(1) + 4(0) + 2(1) + 1(0) = 10.",
        truthTableMeaning: "Shown as the index column; serves as the subscript for minterms (m_i) and maxterms (M_i)."
      },
      {
        term: "Literal",
        definition: "A single binary variable in either its uncomplemented (A) or complemented (A') form.",
        plainExplanation: "The basic algebraic building block. A function with 3 variables has 6 possible literals: {A, A', B, B', C, C'}.",
        smallExample: "In the term AB'C, there are 3 literals: A, B', and C.",
        truthTableMeaning: "Corresponds to checking whether a specific input column is 1 (A) or 0 (A')."
      },
      {
        term: "Complemented Literal",
        definition: "A variable inverted by the logical NOT operation, denoted by a prime (A') or overbar.",
        plainExplanation: "The negated version of a variable: A' evaluates to 1 when A is 0, and to 0 when A is 1.",
        smallExample: "A' is true only when A is logic 0.",
        truthTableMeaning: "Selects rows where that specific input variable holds a value of 0."
      },
      {
        term: "Product Term",
        definition: "One or more literals combined exclusively using the logical AND (conjunction) operator.",
        plainExplanation: "A group of variables multiplied together. A single standalone literal also counts as a product term.",
        smallExample: "AB, A'BC, and X are all valid product terms.",
        truthTableMeaning: "Evaluates to 1 only when every single literal in the term is simultaneously 1."
      },
      {
        term: "Sum Term",
        definition: "One or more literals combined exclusively using the logical OR (disjunction) operator.",
        plainExplanation: "A group of variables added together with OR (+). A single standalone literal also counts as a sum term.",
        smallExample: "(A + B), (A' + B + C'), and Y are all valid sum terms.",
        truthTableMeaning: "Evaluates to 0 only when every single literal in the term is simultaneously 0."
      },
      {
        term: "Functional Equivalence",
        definition: "The property where two distinct Boolean expressions produce identical outputs for every possible input combination.",
        plainExplanation: "Two formulas that look different on paper but describe the exact same digital behavior.",
        smallExample: "F = A'B + AB' + AB is functionally equivalent to F = A + B.",
        truthTableMeaning: "Their truth-table output columns match row-for-row with 100% agreement."
      }
    ],

    functionDomainTheory: {
      inputCombinationsFormula: "Total input combinations for n variables = 2^n",
      possibleFunctionsFormula: "Total distinct single-output Boolean functions = 2^(2^n)",
      explanation: "A truth table for n binary inputs contains exactly 2^n unique input combinations (rows). Because the output value for each row can independently be specified as either 0 or 1, there are 2 * 2 * ... (2^n times) = 2^(2^n) distinct truth-table output columns possible.",
      derivation: "To see why 2^(2^n) grows so rapidly: for 2 variables, there are 4 rows. Each row can be 0 or 1, giving 2^4 = 16 functions. For 3 variables, there are 8 rows, giving 2^8 = 256 functions. For 4 variables, there are 16 rows, giving 2^16 = 65,536 distinct logic functions! This combinatorial explosion explains why automated synthesis tools and standard canonical forms are essential.",
      table: [
        { variables: 1, inputRows: 2, possibleFunctions: 4, functionFormula: "2^(2^1) = 2^2 = 4", examples: "Constant 0, Identity (A), Inverter (A'), Constant 1" },
        { variables: 2, inputRows: 4, possibleFunctions: 16, functionFormula: "2^(2^2) = 2^4 = 16", examples: "AND, OR, NAND, NOR, XOR, XNOR, Implication, Constants, etc." },
        { variables: 3, inputRows: 8, possibleFunctions: 256, functionFormula: "2^(2^3) = 2^8 = 256", examples: "All 3-variable logic functions (multiplexers, full adders, decoders)" },
        { variables: 4, inputRows: 16, possibleFunctions: 65536, functionFormula: "2^(2^4) = 2^16 = 65,536", examples: "All 4-variable functions (the mathematical capacity of 4-input LUTs in modern FPGAs)" }
      ]
    }
  },

  // Tab 2: Minterms and Maxterms Content
  mintermsAndMaxterms: {
    terminologyApostropheNote: "Notation Convention: A' means A complement. It may also be read as A prime. In this lesson, we use the formal academic term complemented variable.",

    mintermDefinition: {
      simpleDefinition: "A minterm is an AND term containing every variable exactly once. It becomes 1 for only one particular input combination.",
      formalDefinition: "A minterm is a product (AND) term containing every variable of an n-variable Boolean function exactly once, either complemented or uncomplemented. A minterm evaluates to 1 for exactly one input combination and evaluates to 0 for all other 2^n - 1 input combinations.",
      howToConstruct: "Binary 0 -> Complemented variable (e.g. A') | Binary 1 -> Uncomplemented variable (e.g. A).",
      exampleCalculation: {
        inputs: "ABC = 101",
        index: 5,
        calculation: "A = 1 -> A (uncomplemented), B = 0 -> B' (complemented), C = 1 -> C (uncomplemented)",
        resultSymbol: "m5",
        resultTerm: "AB'C",
        proof: "When A=1, B=0, C=1: m5 = (1) · (0)' · (1) = 1 · 1 · 1 = 1. For any other input row, at least one literal becomes 0, forcing the product to 0."
      },
      importantProperty: "A minterm evaluates to 1 for exactly its own indexed row, and 0 everywhere else."
    },

    maxtermDefinition: {
      simpleDefinition: "A maxterm is an OR term containing every variable exactly once. It becomes 0 for only one particular input combination.",
      formalDefinition: "A maxterm is a sum (OR) term containing every variable of an n-variable Boolean function exactly once, either complemented or uncomplemented. A maxterm evaluates to 0 for exactly one input combination and evaluates to 1 for all other 2^n - 1 input combinations.",
      howToConstruct: "Binary 0 -> Uncomplemented variable (e.g. A) | Binary 1 -> Complemented variable (e.g. A'). This is the exact opposite of the minterm rule!",
      exampleCalculation: {
        inputs: "ABC = 101",
        index: 5,
        calculation: "A = 1 -> A' (complemented), B = 0 -> B (uncomplemented), C = 1 -> C' (complemented)",
        resultSymbol: "M5",
        resultTerm: "A' + B + C'",
        proof: "When A=1, B=0, C=1: M5 = (1)' + (0) + (1)' = 0 + 0 + 0 = 0. For any other input row, at least one literal becomes 1, forcing the sum to 1."
      },
      importantProperty: "A maxterm evaluates to 0 for exactly its own indexed row, and 1 everywhere else."
    },

    mVsMCallout: {
      title: "Crucial Notation Distinction: Lowercase m vs Uppercase M",
      mintermLabel: "Lowercase m = Minterm (Product / AND Term)",
      mintermExample: "m0, m1, m2, ..., m_(2^n - 1)",
      maxtermLabel: "Uppercase M = Maxterm (Sum / OR Term)",
      maxtermExample: "M0, M1, M2, ..., M_(2^n - 1)",
      connectionSummary: [
        { term: "Individual Minterm", symbol: "m_i", type: "Single product term", eval: "1 only at row i" },
        { term: "Individual Maxterm", symbol: "M_i", type: "Single sum term", eval: "0 only at row i" },
        { term: "Canonical SOP", symbol: "Σm(...)", type: "OR (sum) of selected minterms", eval: "F = 1 rows" },
        { term: "Canonical POS", symbol: "ΠM(...)", type: "AND (product) of selected maxterms", eval: "F = 0 rows" }
      ]
    },

    sideBySideComparison: {
      title: "Side-by-Side Comparison for Row ABC = 101 (Index 5)",
      inputRow: "A = 1, B = 0, C = 1 (Binary 101, Decimal 5)",
      minterm: {
        symbol: "m5",
        term: "AB'C",
        operation: "Logical AND (Conjunction)",
        targetValue: "Evaluates to 1 ONLY at row 5",
        colorRole: "Forest Green (Sum of Products)"
      },
      maxterm: {
        symbol: "M5",
        term: "A' + B + C'",
        operation: "Logical OR (Disjunction)",
        targetValue: "Evaluates to 0 ONLY at row 5",
        colorRole: "Muted Blue (Product of Sums)"
      },
      complementRelationship: {
        formula: "(m5)' = M5  and  (M5)' = m5",
        derivation: "(m5)' = (AB'C)' = A' + (B')' + C' = A' + B + C' = M5",
        note: "Crucial Academic Note: The relationship between a minterm and a maxterm of the same index is a true Boolean Complement (inversion via De Morgan's Law). Do not confuse this with algebraic duality: in duality, literals are NOT complemented."
      }
    },

    variableOrderingConvention: {
      title: "Variable Ordering and Positional Weighting",
      rule: "Standard engineering convention declares variables in alphabetical order from most significant bit (MSB) to least significant bit (LSB):",
      twoVar: { vars: "A, B", formula: "Index = 2A + B", msb: "A (weight 2)", lsb: "B (weight 1)" },
      threeVar: { vars: "A, B, C", formula: "Index = 4A + 2B + C", msb: "A (weight 4)", lsb: "C (weight 1)" },
      fourVar: { vars: "A, B, C, D", formula: "Index = 8A + 4B + 2C + D", msb: "A (weight 8)", lsb: "D (weight 1)" },
      caution: "Always maintain the declared variable order throughout an entire problem. Swapping variable order (e.g. interpreting CBA instead of ABC) inverts indices and produces completely incorrect canonical expressions."
    },

    // 2-Variable Complete Table (4 rows)
    twoVariableTable: [
      { index: 0, bin: "00", A: 0, B: 0, mintermSymbol: "m0", mintermTerm: "A'B'", maxtermSymbol: "M0", maxtermTerm: "A + B" },
      { index: 1, bin: "01", A: 0, B: 1, mintermSymbol: "m1", mintermTerm: "A'B", maxtermSymbol: "M1", maxtermTerm: "A + B'" },
      { index: 2, bin: "10", A: 1, B: 0, mintermSymbol: "m2", mintermTerm: "AB'", maxtermSymbol: "M2", maxtermTerm: "A' + B" },
      { index: 3, bin: "11", A: 1, B: 1, mintermSymbol: "m3", mintermTerm: "AB", maxtermSymbol: "M3", maxtermTerm: "A' + B'" }
    ],

    // 3-Variable Complete Table (8 rows)
    threeVariableTable: [
      { index: 0, bin: "000", A: 0, B: 0, C: 0, mintermSymbol: "m0", mintermTerm: "A'B'C'", maxtermSymbol: "M0", maxtermTerm: "A + B + C" },
      { index: 1, bin: "001", A: 0, B: 0, C: 1, mintermSymbol: "m1", mintermTerm: "A'B'C", maxtermSymbol: "M1", maxtermTerm: "A + B + C'" },
      { index: 2, bin: "010", A: 0, B: 1, C: 0, mintermSymbol: "m2", mintermTerm: "A'BC'", maxtermSymbol: "M2", maxtermTerm: "A + B' + C" },
      { index: 3, bin: "011", A: 0, B: 1, C: 1, mintermSymbol: "m3", mintermTerm: "A'BC", maxtermSymbol: "M3", maxtermTerm: "A + B' + C'" },
      { index: 4, bin: "100", A: 1, B: 0, C: 0, mintermSymbol: "m4", mintermTerm: "AB'C'", maxtermSymbol: "M4", maxtermTerm: "A' + B + C" },
      { index: 5, bin: "101", A: 1, B: 0, C: 1, mintermSymbol: "m5", mintermTerm: "AB'C", maxtermSymbol: "M5", maxtermTerm: "A' + B + C'" },
      { index: 6, bin: "110", A: 1, B: 1, C: 0, mintermSymbol: "m6", mintermTerm: "ABC'", maxtermSymbol: "M6", maxtermTerm: "A' + B' + C" },
      { index: 7, bin: "111", A: 1, B: 1, C: 1, mintermSymbol: "m7", mintermTerm: "ABC", maxtermSymbol: "M7", maxtermTerm: "A' + B' + C'" }
    ],

    // 4-Variable Complete Table (16 rows)
    fourVariableTable: [
      { index: 0, bin: "0000", A: 0, B: 0, C: 0, D: 0, mintermSymbol: "m0", mintermTerm: "A'B'C'D'", maxtermSymbol: "M0", maxtermTerm: "A + B + C + D" },
      { index: 1, bin: "0001", A: 0, B: 0, C: 0, D: 1, mintermSymbol: "m1", mintermTerm: "A'B'C'D", maxtermSymbol: "M1", maxtermTerm: "A + B + C + D'" },
      { index: 2, bin: "0010", A: 0, B: 0, C: 1, D: 0, mintermSymbol: "m2", mintermTerm: "A'B'CD'", maxtermSymbol: "M2", maxtermTerm: "A + B + C' + D" },
      { index: 3, bin: "0011", A: 0, B: 0, C: 1, D: 1, mintermSymbol: "m3", mintermTerm: "A'B'CD", maxtermSymbol: "M3", maxtermTerm: "A + B + C' + D'" },
      { index: 4, bin: "0100", A: 0, B: 1, C: 0, D: 0, mintermSymbol: "m4", mintermTerm: "A'BC'D'", maxtermSymbol: "M4", maxtermTerm: "A + B' + C + D" },
      { index: 5, bin: "0101", A: 0, B: 1, C: 0, D: 1, mintermSymbol: "m5", mintermTerm: "A'BC'D", maxtermSymbol: "M5", maxtermTerm: "A + B' + C + D'" },
      { index: 6, bin: "0110", A: 0, B: 1, C: 1, D: 0, mintermSymbol: "m6", mintermTerm: "A'BCD'", maxtermSymbol: "M6", maxtermTerm: "A + B' + C' + D" },
      { index: 7, bin: "0111", A: 0, B: 1, C: 1, D: 1, mintermSymbol: "m7", mintermTerm: "A'BCD", maxtermSymbol: "M7", maxtermTerm: "A + B' + C' + D'" },
      { index: 8, bin: "1000", A: 1, B: 0, C: 0, D: 0, mintermSymbol: "m8", mintermTerm: "AB'C'D'", maxtermSymbol: "M8", maxtermTerm: "A' + B + C + D" },
      { index: 9, bin: "1001", A: 1, B: 0, C: 0, D: 1, mintermSymbol: "m9", mintermTerm: "AB'C'D", maxtermSymbol: "M9", maxtermTerm: "A' + B + C + D'" },
      { index: 10, bin: "1010", A: 1, B: 0, C: 1, D: 0, mintermSymbol: "m10", mintermTerm: "AB'CD'", maxtermSymbol: "M10", maxtermTerm: "A' + B + C' + D" },
      { index: 11, bin: "1011", A: 1, B: 0, C: 1, D: 1, mintermSymbol: "m11", mintermTerm: "AB'CD", maxtermSymbol: "M11", maxtermTerm: "A' + B + C' + D'" },
      { index: 12, bin: "1100", A: 1, B: 1, C: 0, D: 0, mintermSymbol: "m12", mintermTerm: "ABC'D'", maxtermSymbol: "M12", maxtermTerm: "A' + B' + C + D" },
      { index: 13, bin: "1101", A: 1, B: 1, C: 0, D: 1, mintermSymbol: "m13", mintermTerm: "ABC'D", maxtermSymbol: "M13", maxtermTerm: "A' + B' + C + D'" },
      { index: 14, bin: "1110", A: 1, B: 1, C: 1, D: 0, mintermSymbol: "m14", mintermTerm: "ABCD'", maxtermSymbol: "M14", maxtermTerm: "A' + B' + C' + D" },
      { index: 15, bin: "1111", A: 1, B: 1, C: 1, D: 1, mintermSymbol: "m15", mintermTerm: "ABCD", maxtermSymbol: "M15", maxtermTerm: "A' + B' + C' + D'" }
    ]
  },

  // Tab 3: Canonical and Standard Forms Content
  canonicalForms: {
    distinctionIntro: {
      title: "How Are Standard and Canonical Forms Different?",
      points: [
        {
          name: "General SOP (Sum of Products)",
          desc: "A Boolean expression formed by ORing product terms together. The terms do NOT necessarily contain all declared variables (e.g. F = AB + C)."
        },
        {
          name: "Canonical SOP (Sum of Minterms)",
          desc: "An SOP expression in which EVERY product term is a full minterm containing all declared variables exactly once (e.g. F = Σm(1, 3, 5, 6, 7))."
        },
        {
          name: "General POS (Product of Sums)",
          desc: "A Boolean expression formed by ANDing sum terms together. The terms do NOT necessarily contain all declared variables (e.g. F = (A + C)(B + C))."
        },
        {
          name: "Canonical POS (Product of Maxterms)",
          desc: "A POS expression in which EVERY sum term is a full maxterm containing all declared variables exactly once (e.g. F = ΠM(0, 2, 4))."
        }
      ]
    },

    terminologyDefinitions: [
      {
        term: "Sum of Products (SOP)",
        definition: "A Boolean expression consisting of multiple product terms combined by the logical OR operator.",
        example: "F = AB + C",
        standardStatus: "General Standard Form: Does NOT require every variable to appear in every product term."
      },
      {
        term: "Product of Sums (POS)",
        definition: "A Boolean expression consisting of multiple sum terms combined by the logical AND operator.",
        example: "F = (A + B)C",
        standardStatus: "General Standard Form: Does NOT require every variable to appear in every sum term."
      },
      {
        term: "Canonical SOP (Sum of Minterms)",
        definition: "An SOP expression in which EVERY product term is a true minterm containing all n declared variables exactly once.",
        example: "F(A, B, C) = ABC + ABC' + AB'C",
        standardStatus: "Canonical Form: Full variable presence required in every term. Denoted by Σm(...)."
      },
      {
        term: "Canonical POS (Product of Maxterms)",
        definition: "A POS expression in which EVERY sum term is a true maxterm containing all n declared variables exactly once.",
        example: "F(A, B, C) = (A + B + C)(A + B' + C)(A' + B + C)",
        standardStatus: "Canonical Form: Full variable presence required in every term. Denoted by ΠM(...)."
      }
    ],

    textbookNote: "Terminology Convention Notice: In some academic syllabi and textbooks (e.g. Morris Mano), the term 'Standard Form' refers to any SOP or POS expression where terms may contain any subset of variables, whereas 'Canonical Form' strictly demands that every term contain all n variables. Other textbooks use 'standard minterm form' synonymously with canonical form. In ZeroIndex, we adhere to the standard distinction: standard forms permit varying term lengths, while canonical forms require complete variable presence.",

    // One Function Demonstrated in All Four Forms: F(A, B, C) = AB + C
    sameFunctionFourForms: {
      title: "One Function Demonstrated in All Four Boolean Forms: F(A, B, C) = AB + C",
      subtitle: "Observe how four algebraically distinct representations express the EXACT SAME truth table.",
      forms: [
        {
          name: "General SOP",
          expr: "F = AB + C",
          classification: "General Standard Form",
          comment: "Contains product term AB (missing C) and product term C (missing A and B)."
        },
        {
          name: "General POS",
          expr: "F = (A + C)(B + C)",
          classification: "General Standard Form",
          comment: "Obtained via the second distributive law A + BC = (A + B)(A + C). Terms omit variables."
        },
        {
          name: "Canonical SOP",
          expr: "F = Σm(1, 3, 5, 6, 7)",
          expanded: "F = A'B'C + A'BC + AB'C + ABC' + ABC",
          classification: "Canonical Form (Sum of Minterms)",
          comment: "OR-sum of all rows where F = 1. Every product term contains all 3 variables {A, B, C}."
        },
        {
          name: "Canonical POS",
          expr: "F = ΠM(0, 2, 4)",
          expanded: "F = (A + B + C)(A + B' + C)(A' + B + C)",
          classification: "Canonical Form (Product of Maxterms)",
          comment: "AND-product of all rows where F = 0. Every sum term contains all 3 variables {A, B, C}."
        }
      ],
      truthTableVerification: [
        { index: 0, bin: "000", A: 0, B: 0, C: 0, genSOP: 0, genPOS: 0, canSOP: 0, canPOS: 0, matches: true },
        { index: 1, bin: "001", A: 0, B: 0, C: 1, genSOP: 1, genPOS: 1, canSOP: 1, canPOS: 1, matches: true },
        { index: 2, bin: "010", A: 0, B: 1, C: 0, genSOP: 0, genPOS: 0, canSOP: 0, canPOS: 0, matches: true },
        { index: 3, bin: "011", A: 0, B: 1, C: 1, genSOP: 1, genPOS: 1, canSOP: 1, canPOS: 1, matches: true },
        { index: 4, bin: "100", A: 1, B: 0, C: 0, genSOP: 0, genPOS: 0, canSOP: 0, canPOS: 0, matches: true },
        { index: 5, bin: "101", A: 1, B: 0, C: 1, genSOP: 1, genPOS: 1, canSOP: 1, canPOS: 1, matches: true },
        { index: 6, bin: "110", A: 1, B: 1, C: 0, genSOP: 1, genPOS: 1, canSOP: 1, canPOS: 1, matches: true },
        { index: 7, bin: "111", A: 1, B: 1, C: 1, genSOP: 1, genPOS: 1, canSOP: 1, canPOS: 1, matches: true }
      ],
      takeaway: "All four forms evaluate to identical output column [0, 1, 0, 1, 0, 1, 1, 1]. They are completely equivalent mathematical specifications of the exact same digital logic switching function."
    },

    // Master Comparison Table: Boolean Forms at a Glance
    booleanFormsAtAGlance: {
      title: "Boolean Forms at a Glance",
      subtitle: "A complete classification reference for all structural building blocks and representations.",
      headers: ["Name", "Meaning", "Mathematical Structure", "Example", "Key Identifying Feature"],
      rows: [
        {
          name: "Literal",
          meaning: "A single variable in either normal or complemented form.",
          structure: "x or x'",
          example: "A, B', C",
          feature: "Smallest atomic building block; represents one physical signal or wire."
        },
        {
          name: "Product Term",
          meaning: "One or more literals combined exclusively by logical AND.",
          structure: "L1 · L2 ··· Lk",
          example: "AB, A'BC, X",
          feature: "Evaluates to 1 only when every literal is 1; does not need all variables."
        },
        {
          name: "Sum Term",
          meaning: "One or more literals combined exclusively by logical OR.",
          structure: "L1 + L2 + ··· + Lk",
          example: "(A + B), (A' + C), Y",
          feature: "Evaluates to 0 only when every literal is 0; does not need all variables."
        },
        {
          name: "Minterm",
          meaning: "An AND product term containing EVERY declared variable exactly once.",
          structure: "Product of n literals (m_i)",
          example: "m5 = AB'C (for n=3)",
          feature: "Evaluates to 1 for exactly ONE input row (0 -> complemented, 1 -> uncomplemented)."
        },
        {
          name: "Maxterm",
          meaning: "An OR sum term containing EVERY declared variable exactly once.",
          structure: "Sum of n literals (M_i)",
          example: "M5 = (A' + B + C') (for n=3)",
          feature: "Evaluates to 0 for exactly ONE input row (0 -> uncomplemented, 1 -> complemented)."
        },
        {
          name: "General SOP",
          meaning: "An expression formed by ORing general product terms together.",
          structure: "P1 + P2 + ··· + Pk",
          example: "F = AB + C",
          feature: "Product terms may omit variables; provides two-level AND-OR realization."
        },
        {
          name: "General POS",
          meaning: "An expression formed by ANDing general sum terms together.",
          structure: "S1 · S2 ··· Sk",
          example: "F = (A + C)(B + C)",
          feature: "Sum terms may omit variables; provides two-level OR-AND realization."
        },
        {
          name: "Canonical SOP",
          meaning: "An SOP expression in which EVERY product term is a true minterm.",
          structure: "Σm(i1, i2, ...)",
          example: "F = Σm(1, 3, 5, 6, 7)",
          feature: "Every term contains all n variables; selected from all rows where F = 1."
        },
        {
          name: "Canonical POS",
          meaning: "An POS expression in which EVERY sum term is a true maxterm.",
          structure: "ΠM(i1, i2, ...)",
          example: "F = ΠM(0, 2, 4)",
          feature: "Every term contains all n variables; selected from all rows where F = 0."
        }
      ]
    },

    procedures: {
      sopProcedure: [
        { step: 1, title: "Establish Variable Order", action: "Determine the exact input variable sequence (e.g. A as MSB, B, C as LSB)." },
        { step: 2, title: "Construct Truth Table", action: "Write out the 2^n binary input permutations and compute the functional output for each row." },
        { step: 3, title: "Identify F = 1 Rows", action: "Scan the output column and select only those rows where the function evaluates to logic 1." },
        { step: 4, title: "Formulate Minterms", action: "For each selected row, write its minterm: variable is 0 -> complemented (A'), variable is 1 -> uncomplemented (A)." },
        { step: 5, title: "Logical OR (Sum)", action: "Connect all formulated minterms together using the logical OR (+) operator." },
        { step: 6, title: "Express Compact Notation", action: "Write the result in compact summation form: F = Σm(index1, index2, ...)." },
        { step: 7, title: "Verify Completeness", action: "Confirm that every 1-row is represented and no 0-rows are mistakenly included." }
      ],
      posProcedure: [
        { step: 1, title: "Establish Variable Order", action: "Determine the exact input variable sequence (e.g. A as MSB, B, C as LSB)." },
        { step: 2, title: "Construct Truth Table", action: "Write out the 2^n binary input permutations and compute the functional output for each row." },
        { step: 3, title: "Identify F = 0 Rows", action: "Scan the output column and select only those rows where the function evaluates to logic 0." },
        { step: 4, title: "Formulate Maxterms", action: "For each selected row, write its maxterm: variable is 0 -> uncomplemented (A), variable is 1 -> complemented (A')." },
        { step: 5, title: "Logical AND (Product)", action: "Connect all formulated maxterms together using the logical AND (·) operator or parentheses." },
        { step: 6, title: "Express Compact Notation", action: "Write the result in compact product form: F = ΠM(index1, index2, ...)." },
        { step: 7, title: "Verify Completeness", action: "Confirm that every 0-row is represented and no 1-rows are mistakenly included." }
      ]
    },

    synchronizedTableDemo: {
      title: "Synchronized Truth Table Demonstration: F(A, B, C) = C",
      subtitle: "Observe how F = 1 rows generate Canonical SOP while F = 0 rows generate Canonical POS for the exact same function.",
      twoRules: [
        { rule: "Canonical SOP Selection", desc: "Select all rows where F = 1 and connect their minterms using logical OR (+)." },
        { rule: "Canonical POS Selection", desc: "Select all rows where F = 0 and connect their maxterms using logical AND (·)." }
      ],
      rows: [
        { index: 0, bin: "000", A: 0, B: 0, C: 0, F: 0, selectedFor: "POS (M0)", term: "M0 = (A + B + C)", role: "F = 0 Row" },
        { index: 1, bin: "001", A: 0, B: 0, C: 1, F: 1, selectedFor: "SOP (m1)", term: "m1 = A'B'C", role: "F = 1 Row" },
        { index: 2, bin: "010", A: 0, B: 1, C: 0, F: 0, selectedFor: "POS (M2)", term: "M2 = (A + B' + C)", role: "F = 0 Row" },
        { index: 3, bin: "011", A: 0, B: 1, C: 1, F: 1, selectedFor: "SOP (m3)", term: "m3 = A'BC", role: "F = 1 Row" },
        { index: 4, bin: "100", A: 1, B: 0, C: 0, F: 0, selectedFor: "POS (M4)", term: "M4 = (A' + B + C)", role: "F = 0 Row" },
        { index: 5, bin: "101", A: 1, B: 0, C: 1, F: 1, selectedFor: "SOP (m5)", term: "m5 = AB'C", role: "F = 1 Row" },
        { index: 6, bin: "110", A: 1, B: 1, C: 0, F: 0, selectedFor: "POS (M6)", term: "M6 = (A' + B' + C)", role: "F = 0 Row" },
        { index: 7, bin: "111", A: 1, B: 1, C: 1, F: 1, selectedFor: "SOP (m7)", term: "m7 = ABC", role: "F = 1 Row" }
      ],
      canonicalSOPResult: "F(A, B, C) = Σm(1, 3, 5, 7) = A'B'C + A'BC + AB'C + ABC",
      canonicalPOSResult: "F(A, B, C) = ΠM(0, 2, 4, 6) = (A + B + C)(A + B' + C)(A' + B + C)(A' + B' + C)",
      simplificationProof: "Both canonical representations reduce to F = C. For SOP: (A'B' + A'B + AB' + AB)C = [1]C = C. For POS: (A + C)(A' + C) = AA' + C = C. Perfect functional equivalence is verified."
    },

    complementaryIndexSets: {
      title: "Complementary Index Sets and Function Complementation",
      universeFormula: "Universe of indices U = {0, 1, 2, ..., 2^n - 1}",
      partitionRule: "For any Boolean function F of n variables, the minterm set S and the maxterm set S_c partition the index universe U into two mutually exclusive and exhaustive subsets:",
      dualFormulas: [
        { name: "Canonical POS of Same Function F", formula: "F = Σm(S)  <=>  F = ΠM(U \\ S)", meaning: "To convert a function from SOP to POS, simply list all the missing indices from the universe." },
        { name: "Complement Function F' in SOP", formula: "[F]' = [Σm(S)]' = Σm(U \\ S)", meaning: "The complement function F' produces 1 wherever F produces 0." },
        { name: "Complement Function F' in POS", formula: "[F]' = [ΠM(U \\ S)]' = ΠM(S)", meaning: "The complement function in POS uses the original 1-row indices of F." }
      ],
      distinctionWarning: "Crucial Academic Distinction: Converting F to canonical POS (F = ΠM(U \\ S)) leaves the function output unchanged! In contrast, complementing the function ([F]' = Σm(U \\ S) = ΠM(S)) inverts the physical circuit output."
    },

    constantFunctions: {
      title: "Constant Functions and Empty Index Conventions",
      constantZero: {
        function: "F = 0 (Contradiction / Ground)",
        mintermSet: "Σm(empty set) = 0",
        maxtermSet: "ΠM(0, 1, ..., 2^n - 1)",
        explanation: "F is never 1 on any row. Therefore its minterm set is empty (empty sum = 0), and its maxterm set contains all 2^n rows."
      },
      constantOne: {
        function: "F = 1 (Tautology / VCC)",
        mintermSet: "Σm(0, 1, ..., 2^n - 1)",
        maxtermSet: "ΠM(empty set) = 1",
        explanation: "F is 1 on every row. Therefore its minterm set contains all 2^n rows, and its maxterm set is empty (empty product = 1)."
      },
      formalConventions: "Mathematical Identity Conventions: By standard algebraic convention, an empty sum (Σ of 0 terms) is defined as the additive identity 0, and an empty product (Π of 0 terms) is defined as the multiplicative identity 1."
    },

    featureComparisonTable: [
      { feature: "Primary Building Block", canonicalSOP: "Minterm (Standard Product)", canonicalPOS: "Maxterm (Standard Sum)" },
      { feature: "Inner Operator (within term)", canonicalSOP: "AND (Conjunction, ·)", canonicalPOS: "OR (Disjunction, +)" },
      { feature: "Outer Operator (between terms)", canonicalSOP: "OR (Disjunction, +)", canonicalPOS: "AND (Conjunction, ·)" },
      { feature: "Row Selection Criterion", canonicalSOP: "Rows where F = 1", canonicalPOS: "Rows where F = 0" },
      { feature: "Standard Notation", canonicalSOP: "Σm(i_1, i_2, ...)", canonicalPOS: "ΠM(i_1, i_2, ...)" },
      { feature: "Variable Completeness", canonicalSOP: "Every term MUST contain all n variables", canonicalPOS: "Every term MUST contain all n variables" },
      { feature: "Literal Polarity for Binary 0", canonicalSOP: "Complemented (A')", canonicalPOS: "Uncomplemented (A)" },
      { feature: "Literal Polarity for Binary 1", canonicalSOP: "Uncomplemented (A)", canonicalPOS: "Complemented (A')" }
    ]
  },

  // Tab 4: Worked Models Content (14 Core + 1 Challenge = 15 Total)
  workedModelsIntro: {
    title: "From Truth Tables to Boolean Terms: Guided Worked Examples",
    whyHeading: "Why are we solving these examples?",
    whyPoints: [
      "To read binary input combinations correctly.",
      "To construct minterms and maxterms without polarity mistakes.",
      "To identify the correct truth-table indices.",
      "To understand how canonical expressions are formed from selected rows.",
      "To prepare for more advanced SOP/POS conversions in Section 2.4."
    ]
  },

  workedModels: [
    // Level 1: Basic Models (B01 - B04)
    {
      id: "WM2.3-B01",
      number: 1,
      level: "Basic",
      title: "Two-Variable Minterm and Maxterm Derivation",
      variables: "A, B (2 variables)",
      problem: "Given the two-variable binary input combination AB = 10, determine its decimal row index, its corresponding minterm, and its corresponding maxterm.",
      solutionSteps: [
        { step: 1, expr: "Binary input string: A = 1, B = 0", rule: "Binary Input Definition", reason: "Positional weight: A is MSB (weight 2), B is LSB (weight 1)." },
        { step: 2, expr: "Index = 2(A) + 1(B) = 2(1) + 1(0) = 2", rule: "Binary to Decimal Conversion", reason: "Decimal index tag is 2." },
        { step: 3, expr: "m2 = A · B' = AB'", rule: "Minterm Polarity Rule", reason: "Binary 1 -> uncomplemented (A); Binary 0 -> complemented (B')." },
        { step: 4, expr: "M2 = (A' + B)", rule: "Maxterm Polarity Rule", reason: "Binary 1 -> complemented (A'); Binary 0 -> uncomplemented (B)." },
        { step: 5, expr: "(m2)' = (AB')' = A' + (B')' = A' + B = M2", rule: "De Morgan Inversion Check", reason: "Verifies the fundamental complement identity (m_i)' = M_i via De Morgan's Law." }
      ],
      finalAnswer: "Index = 2 | m2 = AB' | M2 = (A' + B)",
      verification: "At AB = 10: m2 = (1)(0)' = 1 · 1 = 1. M2 = (1)' + 0 = 0 + 0 = 0. Exactly matches formal definitions.",
      pitfall: "Do not reverse polarity: writing m2 = A'B or M2 = AB' is completely wrong."
    },
    {
      id: "WM2.3-B02",
      number: 2,
      level: "Basic",
      title: "Three-Variable Decimal Index Term Construction",
      variables: "A, B, C (3 variables)",
      problem: "Construct the minterm and maxterm for decimal index 5 with declared variable sequence (A, B, C).",
      solutionSteps: [
        { step: 1, expr: "5 in 3-bit binary = 101", rule: "Decimal to Binary Encoding", reason: "4(1) + 2(0) + 1(1) = 5. Hence A = 1, B = 0, C = 1." },
        { step: 2, expr: "m5 = A · B' · C = AB'C", rule: "Minterm Construction", reason: "A=1 -> A (uncomplemented), B=0 -> B' (complemented), C=1 -> C (uncomplemented). Combined with AND." },
        { step: 3, expr: "M5 = (A' + B + C')", rule: "Maxterm Construction", reason: "A=1 -> A' (complemented), B=0 -> B (uncomplemented), C=1 -> C' (complemented). Combined with OR." },
        { step: 4, expr: "(m5)' = (AB'C)' = A' + B + C' = M5", rule: "Complement Equivalence", reason: "De Morgan's theorem confirms exact Boolean complementation." }
      ],
      finalAnswer: "m5 = AB'C | M5 = (A' + B + C')",
      verification: "At ABC = 101: m5 = (1)(1)(1) = 1. M5 = (0) + (0) + (0) = 0. All other 7 combinations produce m5 = 0 and M5 = 1.",
      pitfall: "Do not confuse lowercase m5 (minterm) with uppercase M5 (maxterm)."
    },
    {
      id: "WM2.3-B03",
      number: 3,
      level: "Basic",
      title: "Four-Variable Minterm and Maxterm Formulation",
      variables: "A, B, C, D (4 variables)",
      problem: "Determine the minterm and maxterm for index 10 in a four-variable system (A, B, C, D).",
      solutionSteps: [
        { step: 1, expr: "10 in 4-bit binary = 1010", rule: "Decimal to 4-bit Binary", reason: "8(1) + 4(0) + 2(1) + 1(0) = 10. Thus A = 1, B = 0, C = 1, D = 0." },
        { step: 2, expr: "m10 = A · B' · C · D' = AB'CD'", rule: "Minterm Polarity", reason: "1 -> uncomplemented (A, C); 0 -> complemented (B', D'). Product term." },
        { step: 3, expr: "M10 = (A' + B + C' + D)", rule: "Maxterm Polarity", reason: "1 -> complemented (A', C'); 0 -> uncomplemented (B, D). Sum term." },
        { step: 4, expr: "(m10)' = (AB'CD')' = A' + B + C' + D = M10", rule: "De Morgan Verification", reason: "Complement identity holds for any number of variables." }
      ],
      finalAnswer: "m10 = AB'CD' | M10 = (A' + B + C' + D)",
      verification: "At ABCD = 1010: m10 = (1)(1)(1)(1) = 1; M10 = 0 + 0 + 0 + 0 = 0. Verified.",
      pitfall: "Ensure 4-bit width: writing 10 as 1010 (not 101) is essential for 4-variable functions."
    },
    {
      id: "WM2.3-B04",
      number: 4,
      level: "Basic",
      title: "Two-Variable Canonical Function Construction",
      variables: "A, B (2 variables)",
      problem: "Construct the complete truth table, canonical SOP, and canonical POS for a two-variable function F that outputs logic 1 at indices 1, 2, and 3.",
      solutionSteps: [
        { step: 1, expr: "Index space: {0, 1, 2, 3}. 1-rows: {1, 2, 3}. 0-rows: {0}.", rule: "Truth Table Index Partition", reason: "Outputs are F(0)=0, F(1)=1, F(2)=1, F(3)=1." },
        { step: 2, expr: "m1 = A'B, m2 = AB', m3 = AB", rule: "Minterm Formulation", reason: "Construct product terms for rows where F = 1." },
        { step: 3, expr: "F_SOP = A'B + AB' + AB = Σm(1, 2, 3)", rule: "Canonical SOP Formulation", reason: "Sum of Products notation." },
        { step: 4, expr: "M0 = (A + B)", rule: "Maxterm Formulation", reason: "Construct sum term for the single row where F = 0." },
        { step: 5, expr: "F_POS = (A + B) = ΠM(0)", rule: "Canonical POS Formulation", reason: "Product of Maxterms notation." }
      ],
      finalAnswer: "Canonical SOP = Σm(1, 2, 3) | Canonical POS = ΠM(0) | Reduced: F = A + B",
      verification: "Evaluated at all 4 rows, both Σm(1, 2, 3) and ΠM(0) produce outputs [0, 1, 1, 1].",
      pitfall: "Do not forget row 0: if F(0) = 0, ΠM must contain index 0."
    },

    // Level 2: Intermediate Models (I01 - I05)
    {
      id: "WM2.3-I01",
      number: 5,
      level: "Intermediate",
      title: "Three-Variable Canonical Conversion and Verification",
      variables: "A, B, C (3 variables)",
      problem: "For the function F(A, B, C) = Σm(1, 3, 5, 7), construct its expanded canonical SOP, determine its canonical POS, and prove algebraically that both equal F = C.",
      solutionSteps: [
        { step: 1, expr: "F = Σm(1, 3, 5, 7) = A'B'C + A'BC + AB'C + ABC", rule: "Canonical SOP Expansion", reason: "Sum of minterms at indices 1, 3, 5, 7." },
        { step: 2, expr: "Index Universe U = {0, 1, 2, 3, 4, 5, 6, 7}", rule: "3-Variable Universe", reason: "2^3 = 8 possible rows." },
        { step: 3, expr: "0-rows: U \\ {1, 3, 5, 7} = {0, 2, 4, 6}", rule: "Complementary Index Set", reason: "Indices where F evaluates to 0." },
        { step: 4, expr: "F_POS = ΠM(0, 2, 4, 6) = (A + B + C)(A + B' + C)(A' + B + C)(A' + B' + C)", rule: "Canonical POS Formulation", reason: "Product of maxterms." },
        { step: 5, expr: "SOP Reduction: C(A'B' + A'B + AB' + AB) = C(A'(B'+B) + A(B'+B)) = C(A' + A) = C(1) = C", rule: "Algebraic SOP Reduction", reason: "Factoring out literal C." },
        { step: 6, expr: "POS Reduction: [(A+C) + BB'] · [(A'+C) + BB'] = (A + C)(A' + C) = AA' + C = C", rule: "Algebraic POS Reduction", reason: "Using combining law on maxterms." }
      ],
      finalAnswer: "F_SOP = Σm(1, 3, 5, 7) | F_POS = ΠM(0, 2, 4, 6) | Reduced Form: F = C",
      verification: "At all 8 binary states, F is 1 whenever C = 1, and 0 whenever C = 0. Equivalence verified.",
      pitfall: "Do not miss any 0-indices: the complement of {1, 3, 5, 7} in universe {0..7} must contain all even numbers."
    },
    {
      id: "WM2.3-I02",
      number: 6,
      level: "Intermediate",
      title: "Mandatory Benchmark Walkthrough: F(A, B, C) = AB + C'",
      variables: "A, B, C (3 variables)",
      problem: "Convert F(A, B, C) = AB + C' into canonical SOP (Σm) and canonical POS (ΠM), demonstrating full row selection and non-duplicate indexing.",
      solutionSteps: [
        { step: 1, expr: "Declared variable order: (A, B, C) where A is MSB and C is LSB.", rule: "Variable Declaration", reason: "Positional values: A=4, B=2, C=1." },
        { step: 2, expr: "Identify where C' = 1: C must be 0. Occurs at binary rows * * 0 -> {000, 010, 100, 110} -> indices {0, 2, 4, 6}.", rule: "Subterm 1 Evaluation", reason: "Term C' covers 4 rows." },
        { step: 3, expr: "Identify where AB = 1: A=1 and B=1. Occurs at binary rows 1 1 * -> {110, 111} -> indices {6, 7}.", rule: "Subterm 2 Evaluation", reason: "Term AB covers 2 rows." },
        { step: 4, expr: "Union of 1-rows: {0, 2, 4, 6} U {6, 7} = {0, 2, 4, 6, 7}. Notice index 6 is shared; by idempotence (x + x = x), count it once.", rule: "Set Union without Duplication", reason: "A row cannot be counted twice." },
        { step: 5, expr: "F_SOP = Σm(0, 2, 4, 6, 7) = A'B'C' + A'BC' + AB'C' + ABC' + ABC", rule: "Canonical SOP Formulation", reason: "Write out the 5 expanded minterms." },
        { step: 6, expr: "Index Universe U = {0, 1, 2, 3, 4, 5, 6, 7}. 0-rows: U \\ {0, 2, 4, 6, 7} = {1, 3, 5}.", rule: "Zero-Row Identification", reason: "Complementary index set." },
        { step: 7, expr: "F_POS = ΠM(1, 3, 5) = (A + B + C')(A + B' + C')(A' + B + C')", rule: "Canonical POS Formulation", reason: "Product of maxterms at 0-rows." },
        { step: 8, expr: "Truth-table verification: Evaluate AB + C', Σm, and ΠM across all 8 rows. Outputs: [1, 0, 1, 0, 1, 0, 1, 1]. All match.", rule: "Exhaustive Equivalence Check", reason: "8-row verification confirmed." }
      ],
      finalAnswer: "F_SOP = Σm(0, 2, 4, 6, 7) | F_POS = ΠM(1, 3, 5)",
      verification: "Original AB + C' evaluates to 1 at rows 0, 2, 4, 6, 7 and 0 at rows 1, 3, 5. Matches canonical expressions exactly.",
      pitfall: "Avoid duplicate counting: index 6 satisfies both AB and C'; it must appear only once in Σm."
    },
    {
      id: "WM2.3-I03",
      number: 7,
      level: "Intermediate",
      title: "Canonical Expansion of F(A, B, C) = A'B + BC",
      variables: "A, B, C (3 variables)",
      problem: "Determine the canonical SOP and canonical POS for F(A, B, C) = A'B + BC.",
      solutionSteps: [
        { step: 1, expr: "Universe U = {0, 1, 2, 3, 4, 5, 6, 7} with weights A=4, B=2, C=1.", rule: "Coordinate System", reason: "3-variable truth table." },
        { step: 2, expr: "A'B = 1 when A=0, B=1, C=* -> rows {010, 011} -> indices {2, 3}.", rule: "Minterm expansion of A'B", reason: "A'B(C + C') = A'BC + A'BC' = m3 + m2." },
        { step: 3, expr: "BC = 1 when A=*, B=1, C=1 -> rows {011, 111} -> indices {3, 7}.", rule: "Minterm expansion of BC", reason: "(A + A')BC = ABC + A'BC = m7 + m3." },
        { step: 4, expr: "1-rows: {2, 3} U {3, 7} = {2, 3, 7}.", rule: "Union of minterm indices", reason: "Collapse duplicate m3." },
        { step: 5, expr: "F_SOP = Σm(2, 3, 7)", rule: "Canonical SOP", reason: "Sum of minterms." },
        { step: 6, expr: "0-rows: U \\ {2, 3, 7} = {0, 1, 4, 5, 6} -> F_POS = ΠM(0, 1, 4, 5, 6)", rule: "Canonical POS", reason: "Product of maxterms at missing indices." }
      ],
      finalAnswer: "F_SOP = Σm(2, 3, 7) | F_POS = ΠM(0, 1, 4, 5, 6)",
      verification: "Rows 2, 3, 7 yield F = 1; rows 0, 1, 4, 5, 6 yield F = 0. Total rows: 3 + 5 = 8. Verified.",
      pitfall: "Do not write Σm(2, 3, 3, 7): duplicate indices are algebraically invalid in set notation."
    },
    {
      id: "WM2.3-I04",
      number: 8,
      level: "Intermediate",
      title: "Single Literal Function: F(A, B, C) = C'",
      variables: "A, B, C (3 variables)",
      problem: "Construct the full canonical SOP and POS representations for the single literal function F(A, B, C) = C'.",
      solutionSteps: [
        { step: 1, expr: "Declared variables: (A, B, C). Function depends only on C'.", rule: "Variable Declaration", reason: "Variables A and B are absent in the expression." },
        { step: 2, expr: "C' = 1 whenever C = 0. In an 8-row table, C=0 at indices {0, 2, 4, 6}.", rule: "Row Identification", reason: "Even decimal numbers have binary LSB = 0." },
        { step: 3, expr: "C' = 0 whenever C = 1. In an 8-row table, C=1 at indices {1, 3, 5, 7}.", rule: "Complementary Row Identification", reason: "Odd decimal numbers have binary LSB = 1." },
        { step: 4, expr: "F_SOP = Σm(0, 2, 4, 6) = A'B'C' + A'BC' + AB'C' + ABC'", rule: "Canonical SOP", reason: "4 minterms." },
        { step: 5, expr: "F_POS = ΠM(1, 3, 5, 7) = (A + B + C')(A + B' + C')(A' + B + C')(A' + B' + C')", rule: "Canonical POS", reason: "4 maxterms." }
      ],
      finalAnswer: "F_SOP = Σm(0, 2, 4, 6) | F_POS = ΠM(1, 3, 5, 7)",
      verification: "Algebraic expansion: (A'B' + A'B + AB' + AB)C' = [1]C' = C'. Verified.",
      pitfall: "A single literal in 3 variables expands to 4 minterms (2^(3-1) = 4)."
    },
    {
      id: "WM2.3-I05",
      number: 9,
      level: "Intermediate",
      title: "Product of Sums to Canonical Expansion: F = (A + B)(A' + C)",
      variables: "A, B, C (3 variables)",
      problem: "Determine the canonical SOP and POS for F(A, B, C) = (A + B)(A' + C).",
      solutionSteps: [
        { step: 1, expr: "F evaluates to 0 when (A + B) = 0 OR (A' + C) = 0.", rule: "Zero Condition Analysis", reason: "An AND product is 0 if any factor is 0." },
        { step: 2, expr: "(A + B) = 0 when A=0 and B=0 -> rows 00* -> {000, 001} -> indices {0, 1}.", rule: "Factor 1 Zero-rows", reason: "Maxterms M0 and M1." },
        { step: 3, expr: "(A' + C) = 0 when A=1 and C=0 -> rows 1*0 -> {100, 110} -> indices {4, 6}.", rule: "Factor 2 Zero-rows", reason: "Maxterms M4 and M6." },
        { step: 4, expr: "0-row set: {0, 1} U {4, 6} = {0, 1, 4, 6}.", rule: "Union of Zero-rows", reason: "No overlap between these factors." },
        { step: 5, expr: "F_POS = ΠM(0, 1, 4, 6)", rule: "Canonical POS Formulation", reason: "Product of maxterms at 0-rows." },
        { step: 6, expr: "1-row set: U \\ {0, 1, 4, 6} = {2, 3, 5, 7}.", rule: "Complementary SOP Rows", reason: "Remaining indices where F evaluates to 1." },
        { step: 7, expr: "F_SOP = Σm(2, 3, 5, 7) = A'BC' + A'BC + AB'C + ABC", rule: "Canonical SOP", reason: "Sum of minterms." }
      ],
      finalAnswer: "F_POS = ΠM(0, 1, 4, 6) | F_SOP = Σm(2, 3, 5, 7)",
      verification: "Multiplying out: (A+B)(A'+C) = AA' + AC + A'B + BC = A'B + AC. Evaluates to 1 at rows 2, 3, 5, 7. Verified.",
      pitfall: "Remember maxterm polarity: (A + B) = 0 requires A = 0 and B = 0, which corresponds to binary 00, not 11."
    },

    // Level 3: Advanced Models (A01 - A05)
    {
      id: "WM2.3-A01",
      number: 10,
      level: "Advanced",
      title: "Four-Variable Canonical Expansion: F = AB + CD",
      variables: "A, B, C, D (4 variables)",
      problem: "Construct the complete canonical SOP and canonical POS for F(A, B, C, D) = AB + CD.",
      solutionSteps: [
        { step: 1, expr: "Variables: (A, B, C, D) with weights A=8, B=4, C=2, D=1. Total rows = 16 (0 to 15).", rule: "4-Variable Coordinate Setup", reason: "2^4 = 16 rows." },
        { step: 2, expr: "AB = 1 when A=1, B=1, C=*, D=* -> rows 1100, 1101, 1110, 1111 -> indices {12, 13, 14, 15}.", rule: "Subterm 1 Minterms", reason: "Covers 4 rows." },
        { step: 3, expr: "CD = 1 when A=*, B=*, C=1, D=1 -> rows 0011, 0111, 1011, 1111 -> indices {3, 7, 11, 15}.", rule: "Subterm 2 Minterms", reason: "Covers 4 rows." },
        { step: 4, expr: "1-rows: {12, 13, 14, 15} U {3, 7, 11, 15} = {3, 7, 11, 12, 13, 14, 15}.", rule: "Set Union", reason: "Index 15 (ABCD) is shared; count once." },
        { step: 5, expr: "F_SOP = Σm(3, 7, 11, 12, 13, 14, 15) [7 minterms]", rule: "Canonical SOP", reason: "Sum of all 7 minterms." },
        { step: 6, expr: "0-rows: {0..15} \\ {3, 7, 11, 12, 13, 14, 15} = {0, 1, 2, 4, 5, 6, 8, 9, 10} [9 maxterms].", rule: "Complementary Set", reason: "Remaining rows." },
        { step: 7, expr: "F_POS = ΠM(0, 1, 2, 4, 5, 6, 8, 9, 10)", rule: "Canonical POS", reason: "Product of 9 maxterms." }
      ],
      finalAnswer: "F_SOP = Σm(3, 7, 11, 12, 13, 14, 15) | F_POS = ΠM(0, 1, 2, 4, 5, 6, 8, 9, 10)",
      verification: "7 minterms + 9 maxterms = 16 total rows. Exhaustive truth-table check on all 16 rows confirms 100% agreement.",
      pitfall: "Index 15 appears in both AB and CD. Ensure it is not counted twice."
    },
    {
      id: "WM2.3-A02",
      number: 11,
      level: "Advanced",
      title: "Four-Variable Factored POS Expansion: F = (A + B)(C + D)",
      variables: "A, B, C, D (4 variables)",
      problem: "Determine the canonical SOP and POS for the four-variable expression F(A, B, C, D) = (A + B)(C + D).",
      solutionSteps: [
        { step: 1, expr: "F evaluates to 0 when (A + B) = 0 OR (C + D) = 0.", rule: "Zero Product Property", reason: "AND operator produces 0 if either sum term is 0." },
        { step: 2, expr: "(A + B) = 0 when A=0, B=0, C=*, D=* -> rows 0000, 0001, 0010, 0011 -> indices {0, 1, 2, 3}.", rule: "Factor 1 Zero Rows", reason: "4 rows." },
        { step: 3, expr: "(C + D) = 0 when A=*, B=*, C=0, D=0 -> rows 0000, 0100, 1000, 1100 -> indices {0, 4, 8, 12}.", rule: "Factor 2 Zero Rows", reason: "4 rows." },
        { step: 4, expr: "0-rows: {0, 1, 2, 3} U {0, 4, 8, 12} = {0, 1, 2, 3, 4, 8, 12} [7 maxterms].", rule: "Union of Zero Rows", reason: "Index 0 is shared." },
        { step: 5, expr: "F_POS = ΠM(0, 1, 2, 3, 4, 8, 12)", rule: "Canonical POS Formulation", reason: "7 maxterms." },
        { step: 6, expr: "1-rows: U \\ {0, 1, 2, 3, 4, 8, 12} = {5, 6, 7, 9, 10, 11, 13, 14, 15} [9 minterms].", rule: "Complementary Set", reason: "16 - 7 = 9 minterms." },
        { step: 7, expr: "F_SOP = Σm(5, 6, 7, 9, 10, 11, 13, 14, 15)", rule: "Canonical SOP", reason: "Sum of 9 minterms." }
      ],
      finalAnswer: "F_POS = ΠM(0, 1, 2, 3, 4, 8, 12) | F_SOP = Σm(5, 6, 7, 9, 10, 11, 13, 14, 15)",
      verification: "7 maxterm indices + 9 minterm indices = 16 rows. All 16 combinations verified.",
      pitfall: "Index 0 (0000) makes both factors zero simultaneously; ensure it is not duplicated in set notation."
    },
    {
      id: "WM2.3-A03",
      number: 12,
      level: "Advanced",
      title: "Four-Variable SOP Expansion: F = A'C + BD",
      variables: "A, B, C, D (4 variables)",
      problem: "Construct the canonical SOP and POS for F(A, B, C, D) = A'C + BD.",
      solutionSteps: [
        { step: 1, expr: "Universe U = {0..15} with weights A=8, B=4, C=2, D=1.", rule: "Coordinate Weights", reason: "4 variables." },
        { step: 2, expr: "A'C = 1 when A=0, B=*, C=1, D=* -> binary 0010, 0011, 0110, 0111 -> indices {2, 3, 6, 7}.", rule: "Term 1 Minterms", reason: "4 rows." },
        { step: 3, expr: "BD = 1 when A=*, B=1, C=*, D=1 -> binary 0101, 0111, 1101, 1111 -> indices {5, 7, 13, 15}.", rule: "Term 2 Minterms", reason: "4 rows." },
        { step: 4, expr: "1-rows: {2, 3, 6, 7} U {5, 7, 13, 15} = {2, 3, 5, 6, 7, 13, 15} [7 minterms].", rule: "Union of Minterm Rows", reason: "Index 7 (A'BCD) is shared." },
        { step: 5, expr: "F_SOP = Σm(2, 3, 5, 6, 7, 13, 15)", rule: "Canonical SOP", reason: "Sum of 7 minterms." },
        { step: 6, expr: "0-rows: {0..15} \\ {2, 3, 5, 6, 7, 13, 15} = {0, 1, 4, 8, 9, 10, 11, 12, 14} [9 maxterms].", rule: "Complementary Set", reason: "Remaining 9 rows." },
        { step: 7, expr: "F_POS = ΠM(0, 1, 4, 8, 9, 10, 11, 12, 14)", rule: "Canonical POS", reason: "Product of 9 maxterms." }
      ],
      finalAnswer: "F_SOP = Σm(2, 3, 5, 6, 7, 13, 15) | F_POS = ΠM(0, 1, 4, 8, 9, 10, 11, 12, 14)",
      verification: "Exhaustive evaluation of A'C + BD across all 16 states matches Σm and ΠM with zero discrepancies.",
      pitfall: "Index 7 belongs to both subterms (0111 has A=0, C=1 AND B=1, D=1). Do not count it twice."
    },
    {
      id: "WM2.3-A04",
      number: 13,
      level: "Advanced",
      title: "Canonical POS and Equivalence Verification: F = Σm(0, 2, 5, 7, 8, 10, 13, 15)",
      variables: "A, B, C, D (4 variables)",
      problem: "Given F(A, B, C, D) = Σm(0, 2, 5, 7, 8, 10, 13, 15), determine its canonical POS representation and verify that it simplifies to F = B'D' + BD.",
      solutionSteps: [
        { step: 1, expr: "Universe U = {0, 1, ..., 15}. Minterm index set S = {0, 2, 5, 7, 8, 10, 13, 15} (8 minterms).", rule: "Given Specification", reason: "Half of the 16 rows produce F = 1." },
        { step: 2, expr: "Maxterm index set S_c = U \\ S = {1, 3, 4, 6, 9, 11, 12, 14} (8 maxterms).", rule: "Complementary Set Deduction", reason: "Indices where F evaluates to logic 0." },
        { step: 3, expr: "F_POS = ΠM(1, 3, 4, 6, 9, 11, 12, 14)", rule: "Canonical POS Formulation", reason: "Product of all 8 complementary maxterms." },
        { step: 4, expr: "Group 1-rows: {0, 2, 8, 10} have B=0, D=0 -> B'D'. {5, 7, 13, 15} have B=1, D=1 -> BD.", rule: "Equivalence Grouping", reason: "Notice variables A and C take all combinations {00, 01, 10, 11} within each group." },
        { step: 5, expr: "B'D'(A'C' + A'C + AC' + AC) + BD(A'C' + A'C + AC' + AC) = B'D'(1) + BD(1) = B'D' + BD", rule: "Algebraic Equivalence Proof", reason: "Variables A and C are completely redundant." }
      ],
      finalAnswer: "F_POS = ΠM(1, 3, 4, 6, 9, 11, 12, 14) | Reduced Equivalence: F = B'D' + BD (XNOR function)",
      verification: "B'D' + BD evaluates to 1 when B=D (both 0 or both 1). Truth table confirms 1 at {0, 2, 5, 7, 8, 10, 13, 15}. Verified.",
      pitfall: "Do not attempt complete K-Map grouping here: algebraic verification confirms equivalence as an introductory check."
    },
    {
      id: "WM2.3-A05",
      number: 14,
      level: "Advanced",
      title: "Complete 16-Row Truth Table Analysis: F(A, B, C, D) = A'B + CD'",
      variables: "A, B, C, D (4 variables)",
      problem: "Construct the complete 16-row truth table for F(A, B, C, D) = A'B + CD', and extract both canonical forms.",
      solutionSteps: [
        { step: 1, expr: "16-row truth table input permutations: ABCD from 0000 to 1111.", rule: "Complete State Space", reason: "Binary count order 0 to 15." },
        { step: 2, expr: "A'B = 1 at indices {4, 5, 6, 7} (binary 0100, 0101, 0110, 0111).", rule: "Term 1 Row Evaluation", reason: "4 rows." },
        { step: 3, expr: "CD' = 1 at indices {2, 6, 10, 14} (binary 0010, 0110, 1010, 1110).", rule: "Term 2 Row Evaluation", reason: "4 rows." },
        { step: 4, expr: "1-rows: {4, 5, 6, 7} U {2, 6, 10, 14} = {2, 4, 5, 6, 7, 10, 14} -> Canonical SOP = Σm(2, 4, 5, 6, 7, 10, 14)", rule: "Canonical SOP Extraction", reason: "7 minterms." },
        { step: 5, expr: "0-rows: {0..15} \\ {2, 4, 5, 6, 7, 10, 14} = {0, 1, 3, 8, 9, 11, 12, 13, 15} -> Canonical POS = ΠM(0, 1, 3, 8, 9, 11, 12, 13, 15)", rule: "Canonical POS Extraction", reason: "9 maxterms." }
      ],
      finalAnswer: "F_SOP = Σm(2, 4, 5, 6, 7, 10, 14) | F_POS = ΠM(0, 1, 3, 8, 9, 11, 12, 13, 15)",
      verification: "Index 6 (0110) has A'B=1 and CD'=1; counted once. Total rows: 7 minterms + 9 maxterms = 16 rows. Verified.",
      pitfall: "Index 2 (0010) has A=0, B=0, C=1, D=0: A'B is 0, but CD' is 1 · 1 = 1. Do not miss it!"
    },

    // Enrichment Model (Optional Combinatorial Counting)
    {
      id: "WM2.3-CH01",
      number: 15,
      level: "Challenge",
      title: "Combinatorial Enrichment: Counting Functions with Odd Number of Ones",
      variables: "A, B, C, D (4 variables)",
      problem: "A four-variable Boolean function has 16 possible truth-table rows. How many distinct single-output Boolean functions have an odd number of 1-output rows?",
      solutionSteps: [
        { step: 1, expr: "Total rows n_rows = 2^4 = 16.", rule: "Truth Table Row Count", reason: "Each row can be assigned output 0 or 1." },
        { step: 2, expr: "Total possible Boolean functions = 2^(n_rows) = 2^16 = 65,536.", rule: "Function Space Theorem", reason: "Each truth table is a 16-bit binary string." },
        { step: 3, expr: "The number of functions with exactly k ones is given by the binomial coefficient C(16, k).", rule: "Binomial Counting", reason: "Selecting k rows out of 16 to be 1." },
        { step: 4, expr: "Total functions with odd number of ones = C(16, 1) + C(16, 3) + C(16, 5) + ··· + C(16, 15).", rule: "Odd Parity Sum", reason: "Sum of odd binomial coefficients." },
        { step: 5, expr: "By the binomial parity identity: Sum_{k odd} C(N, k) = 2^(N-1). For N = 16: 2^(16 - 1) = 2^15 = 32,768.", rule: "Combinatorial Identity", reason: "Exactly half of all possible functions have an odd number of ones." }
      ],
      finalAnswer: "Total Functions with Odd Number of Ones = 32,768 (which is exactly half of the 65,536 total functions)",
      verification: "C(16,1)=16, C(16,3)=560, C(16,5)=4368, C(16,7)=11440, C(16,9)=11440, C(16,11)=4368, C(16,13)=560, C(16,15)=16. Sum = 32,768. Matches 2^15.",
      pitfall: "Distinguish between input combinations (16 rows) and function space (65,536 functions)."
    }
  ],

  // Tab 5: Complete Cheat Sheet Content
  cheatSheet: {
    oneGlanceRules: [
      {
        concept: "Minterm Polarity Rule",
        rule: "Binary 0 -> Complemented (A')  |  Binary 1 -> Uncomplemented (A)",
        tip: "Formulate product terms (AND). Evaluates to 1 ONLY at that indexed row."
      },
      {
        concept: "Maxterm Polarity Rule",
        rule: "Binary 0 -> Uncomplemented (A)  |  Binary 1 -> Complemented (A')",
        tip: "Formulate sum terms (OR). Evaluates to 0 ONLY at that indexed row."
      },
      {
        concept: "Lowercase m vs Uppercase M",
        rule: "m_i = Minterm (Product)  |  M_i = Maxterm (Sum)",
        tip: "Lowercase m represents product term; uppercase M represents sum term."
      },
      {
        concept: "Canonical SOP Selection",
        rule: "Select all rows where F = 1",
        tip: "F = Σm(1-rows). Connect minterms with logical OR (+)."
      },
      {
        concept: "Canonical POS Selection",
        rule: "Select all rows where F = 0",
        tip: "F = ΠM(0-rows). Connect maxterms with logical AND (·)."
      },
      {
        concept: "De Morgan Complement",
        rule: "(m_i)' = M_i  and  (M_i)' = m_i",
        tip: "The complement of a minterm is its corresponding maxterm with identical index."
      },
      {
        concept: "Index Conversion Shortcut",
        rule: "F = Σm(S)  <=>  F = ΠM(U \\ S)",
        tip: "The maxterm index list is simply the missing indices from universe U = {0, 1, ..., 2^n - 1}."
      }
    ],

    checklist: [
      "Have I established a strict variable order (e.g. A as MSB, B, C as LSB)?",
      "Are all 2^n binary permutations written in correct ascending count order?",
      "For Canonical SOP: have I selected ONLY the rows where F = 1?",
      "For Canonical POS: have I selected ONLY the rows where F = 0?",
      "Have I verified minterm polarity: 0 -> complemented, 1 -> uncomplemented?",
      "Have I verified maxterm polarity: 0 -> uncomplemented, 1 -> complemented?",
      "Does every term in my canonical expression contain ALL n declared variables?",
      "Have duplicate indices been eliminated from the Σm or ΠM list?",
      "Do minterm count + maxterm count equal exactly 2^n?"
    ],

    commonExamMistakes: [
      {
        id: "err1",
        title: "Reversing Polarity Rules",
        incorrect: "Writing m2 = A'B for row 10, or M2 = AB' for row 10.",
        correct: "m2 = AB' (1 -> A, 0 -> B') and M2 = A' + B (1 -> A', 0 -> B).",
        why: "Minterms are products that must equal 1 at that row; Maxterms are sums that must equal 0 at that row."
      },
      {
        id: "err2",
        title: "Confusing Binary Value with Index",
        incorrect: "Assuming row ABC = 011 has index 6.",
        correct: "Row 011 in base-10 is 0*4 + 1*2 + 1*1 = 3 (index 3).",
        why: "Row indices are strictly the base-10 numerical values of the binary string."
      },
      {
        id: "err3",
        title: "Changing Variable Ordering",
        incorrect: "Declaring variables (A, B, C) but evaluating C as the MSB (CBA).",
        correct: "Always evaluate the leftmost variable as MSB and rightmost as LSB: 4A + 2B + C.",
        why: "Flipping variable order completely scrambles all decimal row indices."
      },
      {
        id: "err4",
        title: "Assuming Every Product Term is a Minterm",
        incorrect: "Calling AB a minterm in a 3-variable function F(A, B, C).",
        correct: "AB is a general product term, NOT a minterm. A minterm for 3 variables MUST contain all 3 variables (ABC or ABC').",
        why: "By definition, a minterm contains every declared variable of the function exactly once."
      },
      {
        id: "err5",
        title: "Assuming Every Sum Term is a Maxterm",
        incorrect: "Calling (A + B) a maxterm in a 3-variable function F(A, B, C).",
        correct: "(A + B) is a general sum term, NOT a maxterm. A maxterm must contain all 3 variables: (A + B + C) or (A + B + C').",
        why: "A maxterm must contain every declared variable of the function exactly once."
      },
      {
        id: "err6",
        title: "Confusing SOP with Canonical SOP",
        incorrect: "Writing F = AB + C and calling it canonical SOP.",
        correct: "F = AB + C is standard SOP. Canonical SOP requires expansion to Σm: ABC + ABC' + AB'C + A'BC + A'B'C.",
        why: "Canonical form is an exhaustive expansion where every term has identical full length."
      },
      {
        id: "err7",
        title: "Selecting F = 0 Rows for Canonical SOP",
        incorrect: "Writing F_SOP = Σm(zero-rows).",
        correct: "Canonical SOP sums minterms where F = 1. Canonical POS products maxterms where F = 0.",
        why: "Minterms are ORed together; if you include a 0-row minterm, F would incorrectly become 1 at that row."
      },
      {
        id: "err8",
        title: "Selecting F = 1 Rows for Canonical POS",
        incorrect: "Writing F_POS = ΠM(one-rows).",
        correct: "Canonical POS products maxterms where F = 0.",
        why: "Maxterms are ANDed together; if you include a 1-row maxterm, F would incorrectly become 0 at that row."
      },
      {
        id: "err9",
        title: "Confusing POS Conversion with Function Complementation",
        incorrect: "Thinking that converting F = Σm(1, 2) to F = ΠM(0, 3) creates the inverted function F'.",
        correct: "F = Σm(1, 2) and F = ΠM(0, 3) are the EXACT SAME function F. The complement is F' = Σm(0, 3) = ΠM(1, 2).",
        why: "Rewriting in POS changes the algebraic perspective, NOT the truth values of the function."
      },
      {
        id: "err10",
        title: "Duplicate Index Counting in SOP Union",
        incorrect: "Writing F = Σm(2, 3, 3, 7) because term 1 and term 2 both generated index 3.",
        correct: "F = Σm(2, 3, 7). By Boolean idempotence (x + x = x), duplicate terms collapse.",
        why: "A truth-table row cannot be selected more than once."
      }
    ]
  },

  // Tab 6: Practice Lab Content (24 Validated Exercises: 6 Basic, 6 Intermediate, 8 Advanced, 4 Challenge)
  practiceLab: [
    // Basic (P01 - P06)
    {
      id: "P01",
      number: 1,
      difficulty: "Basic",
      variables: "A, B",
      problem: "For the two-variable binary combination AB = 10, determine its decimal index, minterm, and maxterm.",
      hint1: "Calculate decimal index: 2(A) + 1(B). What does binary 10 equal?",
      hint2: "For minterm: 1 -> A, 0 -> B'. For maxterm: 1 -> A', 0 -> B.",
      solutionSteps: [
        { step: 1, expr: "Index: 2(1) + 1(0) = 2", law: "Binary Conversion", reason: "Binary 10 is decimal 2." },
        { step: 2, expr: "m2 = AB'", law: "Minterm Polarity", reason: "1 -> A, 0 -> B' (product term)." },
        { step: 3, expr: "M2 = (A' + B)", law: "Maxterm Polarity", reason: "1 -> A', 0 -> B (sum term)." }
      ],
      finalAnswer: "m2 = AB' | M2 = (A' + B)",
      keyTakeaway: "Index 2 corresponds to minterm AB' and maxterm (A' + B)."
    },
    {
      id: "P02",
      number: 2,
      difficulty: "Basic",
      variables: "A, B",
      problem: "For the two-variable combination AB = 11, identify its minterm and maxterm.",
      hint1: "Both variables are logic 1. What index is binary 11?",
      hint2: "In minterms, 1 stays uncomplemented. In maxterms, 1 becomes complemented.",
      solutionSteps: [
        { step: 1, expr: "Index: 2(1) + 1(1) = 3", law: "Binary Conversion", reason: "Binary 11 is decimal 3." },
        { step: 2, expr: "m3 = AB", law: "Minterm Polarity", reason: "Both variables uncomplemented." },
        { step: 3, expr: "M3 = (A' + B')", law: "Maxterm Polarity", reason: "Both variables complemented." }
      ],
      finalAnswer: "m3 = AB | M3 = (A' + B')",
      keyTakeaway: "m3 = AB and M3 = (A' + B')."
    },
    {
      id: "P03",
      number: 3,
      difficulty: "Basic",
      variables: "A, B, C",
      problem: "For the three-variable input combination ABC = 011, identify its decimal index, minterm, and maxterm.",
      hint1: "Binary 011: calculate 4(0) + 2(1) + 1(1).",
      hint2: "Minterm: A is 0 (complemented), B and C are 1 (uncomplemented).",
      solutionSteps: [
        { step: 1, expr: "Index: 4(0) + 2(1) + 1(1) = 3", law: "Binary Conversion", reason: "Binary 011 is decimal 3." },
        { step: 2, expr: "m3 = A'BC", law: "Minterm Polarity", reason: "0 -> A', 1 -> B, 1 -> C." },
        { step: 3, expr: "M3 = (A + B' + C')", law: "Maxterm Polarity", reason: "0 -> A, 1 -> B', 1 -> C'." }
      ],
      finalAnswer: "m3 = A'BC | M3 = (A + B' + C')",
      keyTakeaway: "Row 3 corresponds to minterm A'BC and maxterm (A + B' + C')."
    },
    {
      id: "P04",
      number: 4,
      difficulty: "Basic",
      variables: "A, B, C",
      problem: "For decimal index 6 with variables (A, B, C), identify the binary input pattern, minterm, and maxterm.",
      hint1: "Convert decimal 6 into a 3-bit binary string.",
      hint2: "6 = 4 + 2 + 0 -> binary 110.",
      solutionSteps: [
        { step: 1, expr: "6 in binary = 110 (A=1, B=1, C=0)", law: "Decimal to Binary", reason: "4(1) + 2(1) + 1(0) = 6." },
        { step: 2, expr: "m6 = ABC'", law: "Minterm Polarity", reason: "1 -> A, 1 -> B, 0 -> C'." },
        { step: 3, expr: "M6 = (A' + B' + C)", law: "Maxterm Polarity", reason: "1 -> A', 1 -> B', 0 -> C." }
      ],
      finalAnswer: "Binary: 110 | m6 = ABC' | M6 = (A' + B' + C)",
      keyTakeaway: "Index 6 produces minterm ABC' and maxterm (A' + B' + C)."
    },
    {
      id: "P05",
      number: 5,
      difficulty: "Basic",
      variables: "A, B, C, D",
      problem: "For the four-variable input combination ABCD = 1001, identify its decimal index, minterm, and maxterm.",
      hint1: "Binary 1001: calculate 8(1) + 4(0) + 2(0) + 1(1).",
      hint2: "Variables with 1 are uncomplemented; variables with 0 are complemented in minterms.",
      solutionSteps: [
        { step: 1, expr: "Index: 8(1) + 4(0) + 2(0) + 1(1) = 9", law: "Binary to Decimal", reason: "Binary 1001 is decimal 9." },
        { step: 2, expr: "m9 = AB'C'D", law: "Minterm Polarity", reason: "A=1, B=0, C=0, D=1." },
        { step: 3, expr: "M9 = (A' + B + C + D')", law: "Maxterm Polarity", reason: "A=1 -> A', B=0 -> B, C=0 -> C, D=1 -> D'." }
      ],
      finalAnswer: "m9 = AB'C'D | M9 = (A' + B + C + D')",
      keyTakeaway: "Row 9 corresponds to minterm AB'C'D and maxterm (A' + B + C + D')."
    },
    {
      id: "P06",
      number: 6,
      difficulty: "Basic",
      variables: "A, B, C, D",
      problem: "For the four-variable combination ABCD = 1110, determine its minterm and maxterm.",
      hint1: "Binary 1110: 8 + 4 + 2 = 14.",
      hint2: "In maxterm: 1 becomes complemented, 0 becomes uncomplemented.",
      solutionSteps: [
        { step: 1, expr: "Index: 8(1) + 4(1) + 2(1) + 1(0) = 14", law: "Binary to Decimal", reason: "Binary 1110 is decimal 14." },
        { step: 2, expr: "m14 = ABCD'", law: "Minterm Polarity", reason: "A, B, C are 1; D is 0." },
        { step: 3, expr: "M14 = (A' + B' + C' + D)", law: "Maxterm Polarity", reason: "A, B, C become primed; D stays unprimed." }
      ],
      finalAnswer: "m14 = ABCD' | M14 = (A' + B' + C' + D)",
      keyTakeaway: "Row 14 gives m14 = ABCD' and M14 = (A' + B' + C' + D)."
    },

    // Intermediate (P07 - P12)
    {
      id: "P07",
      number: 7,
      difficulty: "Intermediate",
      variables: "A, B",
      problem: "A two-variable function evaluates to logic 1 at input combinations 01 and 10, and evaluates to 0 elsewhere. Express F in compact Σm and ΠM notation.",
      hint1: "Row 01 is index 1; row 10 is index 2.",
      hint2: "Universe for 2 variables is {0, 1, 2, 3}. 0-rows are the missing indices.",
      solutionSteps: [
        { step: 1, expr: "1-rows: index 1 (01) and index 2 (10) -> Σm(1, 2)", law: "Canonical SOP", reason: "Rows where F = 1." },
        { step: 2, expr: "0-rows: index 0 (00) and index 3 (11) -> ΠM(0, 3)", law: "Canonical POS", reason: "Rows where F = 0." }
      ],
      finalAnswer: "F = Σm(1, 2) = ΠM(0, 3)",
      keyTakeaway: "This is the standard Exclusive-OR (XOR) function: F = A'B + AB'."
    },
    {
      id: "P08",
      number: 8,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "For the three-variable function F(A, B, C) = Σm(1, 3, 5, 7), determine its canonical POS representation.",
      hint1: "The 3-variable universe has indices {0, 1, 2, 3, 4, 5, 6, 7}.",
      hint2: "Canonical POS collects all indices NOT present in the minterm set.",
      solutionSteps: [
        { step: 1, expr: "Minterm index set S = {1, 3, 5, 7}", law: "Given SOP", reason: "4 minterms." },
        { step: 2, expr: "Maxterm index set = {0..7} \\ {1, 3, 5, 7} = {0, 2, 4, 6}", law: "Complementary Set", reason: "Missing indices." },
        { step: 3, expr: "F = ΠM(0, 2, 4, 6)", law: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F = ΠM(0, 2, 4, 6)",
      keyTakeaway: "The canonical POS of F = Σm(1, 3, 5, 7) is ΠM(0, 2, 4, 6). Both equal F = C."
    },
    {
      id: "P09",
      number: 9,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "Given F(A, B, C) = ΠM(1, 2, 6), determine its canonical SOP expression in Σm notation.",
      hint1: "Universe has 8 indices: 0 through 7.",
      hint2: "Minterm indices are the universe elements minus {1, 2, 6}.",
      solutionSteps: [
        { step: 1, expr: "Maxterm index set S_c = {1, 2, 6}", law: "Given POS", reason: "Rows where F = 0." },
        { step: 2, expr: "Minterm index set = {0..7} \\ {1, 2, 6} = {0, 3, 4, 5, 7}", law: "Complementary Set", reason: "Rows where F = 1." },
        { step: 3, expr: "F = Σm(0, 3, 4, 5, 7)", law: "Canonical SOP", reason: "Sum of minterms." }
      ],
      finalAnswer: "F = Σm(0, 3, 4, 5, 7)",
      keyTakeaway: "F = ΠM(1, 2, 6) converts directly to F = Σm(0, 3, 4, 5, 7)."
    },
    {
      id: "P10",
      number: 10,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "Convert F(A, B, C) = AB + C' into both compact canonical forms Σm and ΠM.",
      hint1: "AB covers rows {6, 7}; C' covers even rows {0, 2, 4, 6}.",
      hint2: "Take the union of indices without repeating index 6.",
      solutionSteps: [
        { step: 1, expr: "AB = 1 at {6, 7}; C' = 1 at {0, 2, 4, 6}", law: "Term Evaluation", reason: "Map to row indices." },
        { step: 2, expr: "Union: {0, 2, 4, 6} U {6, 7} = {0, 2, 4, 6, 7} -> F = Σm(0, 2, 4, 6, 7)", law: "Canonical SOP", reason: "Minterm set." },
        { step: 3, expr: "Missing indices from {0..7}: {1, 3, 5} -> F = ΠM(1, 3, 5)", law: "Canonical POS", reason: "Maxterm set." }
      ],
      finalAnswer: "F = Σm(0, 2, 4, 6, 7) = ΠM(1, 3, 5)",
      keyTakeaway: "Union eliminates duplicate index 6: Σm(0, 2, 4, 6, 7) and ΠM(1, 3, 5)."
    },
    {
      id: "P11",
      number: 11,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "For F(A, B, C) = A'B + BC, determine its complete canonical index sets.",
      hint1: "A'B covers binary 01* -> rows 2, 3.",
      hint2: "BC covers binary *11 -> rows 3, 7.",
      solutionSteps: [
        { step: 1, expr: "A'B covers indices {2, 3}; BC covers indices {3, 7}", law: "Subterm Evaluation", reason: "Find 1-rows." },
        { step: 2, expr: "1-rows: {2, 3} U {3, 7} = {2, 3, 7} -> F = Σm(2, 3, 7)", law: "Canonical SOP", reason: "Sum of minterms." },
        { step: 3, expr: "0-rows: {0..7} \\ {2, 3, 7} = {0, 1, 4, 5, 6} -> F = ΠM(0, 1, 4, 5, 6)", law: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "Σm(2, 3, 7) | ΠM(0, 1, 4, 5, 6)",
      keyTakeaway: "Index 3 is shared; canonical sets are Σm(2, 3, 7) and ΠM(0, 1, 4, 5, 6)."
    },
    {
      id: "P12",
      number: 12,
      difficulty: "Intermediate",
      variables: "A, B, C",
      problem: "Construct both canonical representations for the function F(A, B, C) = C'.",
      hint1: "C' is 1 whenever C = 0.",
      hint2: "C = 0 at all even indices: {0, 2, 4, 6}.",
      solutionSteps: [
        { step: 1, expr: "C = 0 at rows {0, 2, 4, 6} -> F = Σm(0, 2, 4, 6)", law: "Canonical SOP", reason: "Even rows where C=0." },
        { step: 2, expr: "C = 1 at rows {1, 3, 5, 7} -> F = ΠM(1, 3, 5, 7)", law: "Canonical POS", reason: "Odd rows where C=1." }
      ],
      finalAnswer: "F = Σm(0, 2, 4, 6) = ΠM(1, 3, 5, 7)",
      keyTakeaway: "Single literal C' expands to 4 minterms Σm(0, 2, 4, 6) and 4 maxterms ΠM(1, 3, 5, 7)."
    },

    // Advanced (P13 - P20)
    {
      id: "P13",
      number: 13,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For the four-variable function F(A, B, C, D) = AB + CD, determine both canonical index sets.",
      hint1: "AB covers rows 11** -> {12, 13, 14, 15}.",
      hint2: "CD covers rows **11 -> {3, 7, 11, 15}.",
      solutionSteps: [
        { step: 1, expr: "AB 1-rows: {12, 13, 14, 15}; CD 1-rows: {3, 7, 11, 15}", law: "4-Var Subterms", reason: "Find active rows." },
        { step: 2, expr: "Union: {3, 7, 11, 12, 13, 14, 15} -> F = Σm(3, 7, 11, 12, 13, 14, 15)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 3, expr: "Missing from {0..15}: {0, 1, 2, 4, 5, 6, 8, 9, 10} -> F = ΠM(0, 1, 2, 4, 5, 6, 8, 9, 10)", law: "Canonical POS", reason: "9 maxterms." }
      ],
      finalAnswer: "Σm(3, 7, 11, 12, 13, 14, 15) | ΠM(0, 1, 2, 4, 5, 6, 8, 9, 10)",
      keyTakeaway: "F = AB + CD yields 7 minterms and 9 maxterms."
    },
    {
      id: "P14",
      number: 14,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = (A + B)(C + D), determine both canonical representations.",
      hint1: "Find zero-rows: (A+B)=0 at {0, 1, 2, 3}; (C+D)=0 at {0, 4, 8, 12}.",
      hint2: "Union of zero-rows gives ΠM; remaining indices give Σm.",
      solutionSteps: [
        { step: 1, expr: "0-rows: {0, 1, 2, 3} U {0, 4, 8, 12} = {0, 1, 2, 3, 4, 8, 12}", law: "Zero Row Identification", reason: "7 maxterms." },
        { step: 2, expr: "F = ΠM(0, 1, 2, 3, 4, 8, 12)", law: "Canonical POS", reason: "Product of maxterms." },
        { step: 3, expr: "1-rows: {0..15} \\ {0, 1, 2, 3, 4, 8, 12} = {5, 6, 7, 9, 10, 11, 13, 14, 15} -> F = Σm(5, 6, 7, 9, 10, 11, 13, 14, 15)", law: "Canonical SOP", reason: "9 minterms." }
      ],
      finalAnswer: "Σm(5, 6, 7, 9, 10, 11, 13, 14, 15) | ΠM(0, 1, 2, 3, 4, 8, 12)",
      keyTakeaway: "F = (A+B)(C+D) has 7 maxterms and 9 minterms."
    },
    {
      id: "P15",
      number: 15,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = A'C + BD, determine both canonical index sets.",
      hint1: "A'C covers {2, 3, 6, 7}; BD covers {5, 7, 13, 15}.",
      hint2: "Notice index 7 is common to both subterms.",
      solutionSteps: [
        { step: 1, expr: "A'C = 1 at {2, 3, 6, 7}; BD = 1 at {5, 7, 13, 15}", law: "4-Var Evaluation", reason: "Binary patterns 0*1* and *1*1." },
        { step: 2, expr: "Union: {2, 3, 5, 6, 7, 13, 15} -> F = Σm(2, 3, 5, 6, 7, 13, 15)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 3, expr: "0-rows: {0, 1, 4, 8, 9, 10, 11, 12, 14} -> F = ΠM(0, 1, 4, 8, 9, 10, 11, 12, 14)", law: "Canonical POS", reason: "9 maxterms." }
      ],
      finalAnswer: "Σm(2, 3, 5, 6, 7, 13, 15) | ΠM(0, 1, 4, 8, 9, 10, 11, 12, 14)",
      keyTakeaway: "Index 7 is counted once: Σm(2, 3, 5, 6, 7, 13, 15) and ΠM(0, 1, 4, 8, 9, 10, 11, 12, 14)."
    },
    {
      id: "P16",
      number: 16,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = A'B + CD', determine both canonical index sets.",
      hint1: "A'B covers {4, 5, 6, 7}; CD' covers {2, 6, 10, 14}.",
      hint2: "Index 6 is shared; compute union and complement.",
      solutionSteps: [
        { step: 1, expr: "A'B: {4, 5, 6, 7}; CD': {2, 6, 10, 14}", law: "Minterm Rows", reason: "Active rows." },
        { step: 2, expr: "1-rows: {2, 4, 5, 6, 7, 10, 14} -> F = Σm(2, 4, 5, 6, 7, 10, 14)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 3, expr: "0-rows: {0, 1, 3, 8, 9, 11, 12, 13, 15} -> F = ΠM(0, 1, 3, 8, 9, 11, 12, 13, 15)", law: "Canonical POS", reason: "9 maxterms." }
      ],
      finalAnswer: "Σm(2, 4, 5, 6, 7, 10, 14) | ΠM(0, 1, 3, 8, 9, 11, 12, 13, 15)",
      keyTakeaway: "Canonical forms: Σm(2, 4, 5, 6, 7, 10, 14) and ΠM(0, 1, 3, 8, 9, 11, 12, 13, 15)."
    },
    {
      id: "P17",
      number: 17,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "Convert F(A, B, C, D) = Σm(0, 2, 5, 7, 8, 10, 13, 15) into canonical POS.",
      hint1: "Identify all missing indices from the 16-element universe {0..15}.",
      hint2: "There are 8 missing indices.",
      solutionSteps: [
        { step: 1, expr: "Universe U = {0, 1, ..., 15}", law: "4-Var Universe", reason: "16 rows total." },
        { step: 2, expr: "Missing indices: {1, 3, 4, 6, 9, 11, 12, 14}", law: "Complementary Set", reason: "Rows where F = 0." },
        { step: 3, expr: "F = ΠM(1, 3, 4, 6, 9, 11, 12, 14)", law: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F = ΠM(1, 3, 4, 6, 9, 11, 12, 14)",
      keyTakeaway: "Canonical POS is directly obtained by listing missing indices: ΠM(1, 3, 4, 6, 9, 11, 12, 14)."
    },
    {
      id: "P18",
      number: 18,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For a four-variable function, F = 1 exactly when D = 1. Determine its canonical index sets.",
      hint1: "D = 1 at all odd indices: {1, 3, 5, 7, 9, 11, 13, 15}.",
      hint2: "D = 0 at all even indices: {0, 2, 4, 6, 8, 10, 12, 14}.",
      solutionSteps: [
        { step: 1, expr: "D = 1 at all 8 odd rows: {1, 3, 5, 7, 9, 11, 13, 15} -> F = Σm(1, 3, 5, 7, 9, 11, 13, 15)", law: "Canonical SOP", reason: "8 minterms." },
        { step: 2, expr: "D = 0 at all 8 even rows: {0, 2, 4, 6, 8, 10, 12, 14} -> F = ΠM(0, 2, 4, 6, 8, 10, 12, 14)", law: "Canonical POS", reason: "8 maxterms." }
      ],
      finalAnswer: "Σm(1, 3, 5, 7, 9, 11, 13, 15) | ΠM(0, 2, 4, 6, 8, 10, 12, 14)",
      keyTakeaway: "A single literal in 4 variables expands to 8 minterms (odd rows) and 8 maxterms (even rows)."
    },
    {
      id: "P19",
      number: 19,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = (A + B')(C + D), construct both canonical index sets.",
      hint1: "(A + B') = 0 when A=0, B=1, C=*, D=* -> rows {4, 5, 6, 7}.",
      hint2: "(C + D) = 0 when A=*, B=*, C=0, D=0 -> rows {0, 4, 8, 12}.",
      solutionSteps: [
        { step: 1, expr: "(A + B') = 0 at {4, 5, 6, 7}; (C + D) = 0 at {0, 4, 8, 12}", law: "Zero Row Identification", reason: "Factor zeroes." },
        { step: 2, expr: "0-rows: {4, 5, 6, 7} U {0, 4, 8, 12} = {0, 4, 5, 6, 7, 8, 12} -> F = ΠM(0, 4, 5, 6, 7, 8, 12)", law: "Canonical POS", reason: "7 maxterms." },
        { step: 3, expr: "1-rows: {0..15} \\ {0, 4, 5, 6, 7, 8, 12} = {1, 2, 3, 9, 10, 11, 13, 14, 15} -> F = Σm(1, 2, 3, 9, 10, 11, 13, 14, 15)", law: "Canonical SOP", reason: "9 minterms." }
      ],
      finalAnswer: "Σm(1, 2, 3, 9, 10, 11, 13, 14, 15) | ΠM(0, 4, 5, 6, 7, 8, 12)",
      keyTakeaway: "Index 4 is shared; canonical sets are Σm(1, 2, 3, 9, 10, 11, 13, 14, 15) and ΠM(0, 4, 5, 6, 7, 8, 12)."
    },
    {
      id: "P20",
      number: 20,
      difficulty: "Advanced",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = AB' + C'D, determine its canonical representations.",
      hint1: "AB' covers 10** -> {8, 9, 10, 11}.",
      hint2: "C'D covers **01 -> {1, 5, 9, 13}.",
      solutionSteps: [
        { step: 1, expr: "AB' = 1 at {8, 9, 10, 11}; C'D = 1 at {1, 5, 9, 13}", law: "Minterm Rows", reason: "Find active rows." },
        { step: 2, expr: "1-rows: {1, 5, 8, 9, 10, 11, 13} -> F = Σm(1, 5, 8, 9, 10, 11, 13)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 3, expr: "0-rows: {0, 2, 3, 4, 6, 7, 12, 14, 15} -> F = ΠM(0, 2, 3, 4, 6, 7, 12, 14, 15)", law: "Canonical POS", reason: "9 maxterms." }
      ],
      finalAnswer: "Σm(1, 5, 8, 9, 10, 11, 13) | ΠM(0, 2, 3, 4, 6, 7, 12, 14, 15)",
      keyTakeaway: "Index 9 is shared; canonical sets are Σm(1, 5, 8, 9, 10, 11, 13) and ΠM(0, 2, 3, 4, 6, 7, 12, 14, 15)."
    },

    // Challenge (P21 - P24)
    {
      id: "P21",
      number: 21,
      difficulty: "Challenge",
      variables: "A, B, C, D",
      problem: "For F(A, B, C, D) = A'B' + CD, determine the full canonical index sets.",
      hint1: "A'B' covers 00** -> {0, 1, 2, 3}.",
      hint2: "CD covers **11 -> {3, 7, 11, 15}.",
      solutionSteps: [
        { step: 1, expr: "A'B' 1-rows: {0, 1, 2, 3}; CD 1-rows: {3, 7, 11, 15}", law: "4-Var Subterms", reason: "Binary expansion." },
        { step: 2, expr: "Union: {0, 1, 2, 3, 7, 11, 15} -> F = Σm(0, 1, 2, 3, 7, 11, 15)", law: "Canonical SOP", reason: "7 minterms." },
        { step: 3, expr: "0-rows: {0..15} \\ {0, 1, 2, 3, 7, 11, 15} = {4, 5, 6, 8, 9, 10, 12, 13, 14} -> F = ΠM(4, 5, 6, 8, 9, 10, 12, 13, 14)", law: "Canonical POS", reason: "9 maxterms." }
      ],
      finalAnswer: "Σm(0, 1, 2, 3, 7, 11, 15) | ΠM(4, 5, 6, 8, 9, 10, 12, 13, 14)",
      keyTakeaway: "Index 3 is shared; canonical sets are Σm(0, 1, 2, 3, 7, 11, 15) and ΠM(4, 5, 6, 8, 9, 10, 12, 13, 14)."
    },
    {
      id: "P22",
      number: 22,
      difficulty: "Challenge",
      variables: "A, B, C",
      problem: "Given F(A, B, C) = Σm(1, 2, 4, 7), write the equivalent canonical POS index notation.",
      hint1: "Universe has 8 rows: {0, 1, 2, 3, 4, 5, 6, 7}.",
      hint2: "List all indices from {0..7} not present in {1, 2, 4, 7}.",
      solutionSteps: [
        { step: 1, expr: "Minterm set S = {1, 2, 4, 7}", law: "Odd Parity 3-Var Function", reason: "4 minterms." },
        { step: 2, expr: "Missing indices: {0..7} \\ {1, 2, 4, 7} = {0, 3, 5, 6}", law: "Complementary Set", reason: "4 maxterms." },
        { step: 3, expr: "F = ΠM(0, 3, 5, 6)", law: "Canonical POS", reason: "Product of maxterms." }
      ],
      finalAnswer: "F = ΠM(0, 3, 5, 6)",
      keyTakeaway: "F = Σm(1, 2, 4, 7) (3-input XOR) is identically F = ΠM(0, 3, 5, 6)."
    },
    {
      id: "P23",
      number: 23,
      difficulty: "Challenge",
      variables: "A, B, C, D",
      problem: "A four-variable Boolean function has 16 possible input rows. How many different output columns contain an odd number of ones?",
      hint1: "Total possible 4-variable functions is 2^16 = 65,536.",
      hint2: "Use the binomial identity: the sum of odd binomial coefficients equals 2^(N-1).",
      solutionSteps: [
        { step: 1, expr: "Total truth-table rows N = 2^4 = 16.", law: "Row Count", reason: "16 rows." },
        { step: 2, expr: "Total possible functions = 2^16 = 65,536.", law: "Function Space", reason: "2^16 output columns." },
        { step: 3, expr: "Functions with k ones = C(16, k). Odd ones = C(16,1) + C(16,3) + ··· + C(16,15).", law: "Binomial Sum", reason: "Odd parity selection." },
        { step: 4, expr: "Identity: Sum_{k odd} C(N, k) = 2^(N-1) = 2^(16-1) = 2^15 = 32,768.", law: "Combinatorial Half-Space", reason: "Exactly half of all functions." }
      ],
      finalAnswer: "32,768 functions",
      keyTakeaway: "Exactly half of all 4-variable functions (32,768 out of 65,536) have an odd number of ones."
    },
    {
      id: "P24",
      number: 24,
      difficulty: "Challenge",
      variables: "A, B, C",
      problem: "For three variables A, B, C, construct the canonical index-set representations for the constant functions F = 0 and F = 1.",
      hint1: "For F = 0, F is never 1 on any row. What is its minterm set?",
      hint2: "For F = 1, F is 1 on all rows. What is its maxterm set?",
      solutionSteps: [
        { step: 1, expr: "For F = 0: 1-rows: empty set -> Σm(empty set) = 0. 0-rows: all rows -> ΠM(0, 1, 2, 3, 4, 5, 6, 7).", law: "Constant Zero Representation", reason: "Empty sum equals additive identity 0." },
        { step: 2, expr: "For F = 1: 1-rows: all rows -> Σm(0, 1, 2, 3, 4, 5, 6, 7). 0-rows: empty set -> ΠM(empty set) = 1.", law: "Constant One Representation", reason: "Empty product equals multiplicative identity 1." }
      ],
      finalAnswer: "F=0: Σm(empty set), ΠM(0, 1, 2, 3, 4, 5, 6, 7) | F=1: Σm(0, 1, 2, 3, 4, 5, 6, 7), ΠM(empty set)",
      keyTakeaway: "Empty sum = 0 and empty product = 1 represent the edge-case constant functions."
    }
  ]
};

export default dldSection23Data;
