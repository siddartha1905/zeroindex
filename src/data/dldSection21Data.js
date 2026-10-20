/**
 * Digital Logic Design (DLD) - Section 2.1 Academic Data Module
 * Boolean Algebra: Fundamentals, Laws and Theorems
 * 
 * ZeroIndex Engineering Platform
 * Teaching Principle: WHY -> WHERE -> WHAT -> HOW -> TRY -> CONNECT
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const dldSection21Data = {
  id: "2.1",
  number: "2.1",
  title: "Boolean Algebra: Fundamentals, Laws and Theorems",
  badge: "Foundations & Laws",
  status: "Available",
  estimatedReadTime: "14 min read",
  description: "Understand why Boolean Algebra matters, learn the important laws, see how they work, and prepare to simplify logical expressions confidently.",

  // Tab 1: Start Here Content
  startHere: {
    whyLearn: {
      headline: "Why Do We Learn Boolean Algebra?",
      paragraphs: [
        "Think about a smartphone, smartwatch, smart TV or computer. Inside these devices are digital circuits that process information and make logical decisions using binary states, represented by 0 and 1.",
        "When several logical conditions are combined, the circuits needed to implement them may become increasingly complex.",
        "What if we could produce exactly the same output using a simpler circuit?",
        "This is one of the main reasons we study Boolean Algebra. Boolean Algebra provides mathematical laws that allow us to describe logical conditions, identify unnecessary operations and simplify expressions without changing the required output.",
        "A simpler Boolean expression can often help us implement a function using fewer gates, fewer interconnections and less hardware. Depending on the actual circuit technology and implementation, simplification may also help reduce power consumption, area, delay and cost.",
        "Our goal is therefore not simply to manipulate mathematical symbols. We want to understand digital logic and learn how to design equivalent, potentially more efficient circuits.",
        "Note: A shorter expression does not automatically guarantee the best physical circuit in every situation, but it is the foundational starting point for all digital hardware optimization."
      ]
    },

    // Task 1: Compact, attractive visual summary
    whySimplify: {
      heading: "Why Do We Simplify Boolean Expressions?",
      subheading: "The objective is to preserve the same logical behavior while finding a potentially more efficient circuit implementation.",
      points: [
        {
          id: "p1",
          title: "SIMPLER CIRCUITS",
          desc: "Remove unnecessary logical operations and reduce circuit complexity."
        },
        {
          id: "p2",
          title: "SMALLER HARDWARE",
          desc: "A simpler realization can sometimes reduce gate count, connections and chip area."
        },
        {
          id: "p3",
          title: "LOWER POWER CONSUMPTION",
          desc: "Reduced hardware and switching activity may improve energy efficiency."
        },
        {
          id: "p4",
          title: "POTENTIALLY FASTER OPERATION",
          desc: "Fewer logic stages may help reduce propagation delay in suitable implementations."
        }
      ],
      visualFlow: [
        { label: "Complex Boolean Expression", note: "Original multi-gate specification" },
        { label: "Apply Boolean Laws", note: "Systematic algebraic reduction" },
        { label: "Equivalent Simplified Expression", note: "Identical truth table guaranteed" },
        { label: "Potentially More Efficient Circuit", note: "Reduced gate and connection footprint" }
      ],
      engineeringNote: "Guaranteed mathematical equivalence means the circuit produces identical output for all input combinations. Physical advantages (area, delay, power) depend on target silicon technology and library cell availability."
    },

    visualDemonstration: {
      title: "Why Simplification Matters: Before and After",
      subtitle: "Same logical output. Simpler expression.",
      expression: "F = AB + AB'",
      before: {
        circuitDescription: "Requires 2 AND gates, 1 NOT gate (inverter for B'), and 1 OR gate (4 logic gates total with multiple wiring interconnections).",
        inputs: ["A", "B"],
        gateCount: 4,
        literalCount: 4,
        equation: "F = AB + AB'"
      },
      derivationSteps: [
        {
          step: 1,
          expression: "F = AB + AB'",
          rule: "Original Specification",
          reason: "Function requires output 1 when A and B are active, or when A and NOT B are active."
        },
        {
          step: 2,
          expression: "F = A(B + B')",
          rule: "Distributive Law: x(y + z) = xy + xz",
          reason: "Factor out the common input literal A from both product terms."
        },
        {
          step: 3,
          expression: "F = A(1)",
          rule: "Complement Law: B + B' = 1",
          reason: "A variable ORed with its exact complement is always Logic 1."
        },
        {
          step: 4,
          expression: "F = A",
          rule: "Identity Law: A · 1 = A",
          reason: "ANDing any variable with 1 yields the variable itself."
        }
      ],
      after: {
        circuitDescription: "Input A connects directly to output F. Exactly 0 logic gates and 0 inverters needed!",
        inputs: ["A"],
        gateCount: 0,
        literalCount: 1,
        equation: "F = A"
      },
      truthTable: {
        headers: ["A", "B", "B'", "AB", "AB'", "F (Original: AB + AB')", "F (Simplified: A)", "Match?"],
        rows: [
          [0, 0, 1, 0, 0, 0, 0, "Exact Match"],
          [0, 1, 0, 0, 0, 0, 0, "Exact Match"],
          [1, 0, 1, 0, 1, 1, 1, "Exact Match"],
          [1, 1, 0, 1, 0, 1, 1, "Exact Match"]
        ]
      }
    },

    journeySteps: [
      {
        step: 1,
        title: "Boolean Laws",
        desc: "Learn fundamental identities and theorems that govern two-valued binary systems."
      },
      {
        step: 2,
        title: "Algebraic Simplification",
        desc: "Transform multi-variable expressions step by step to eliminate redundant terms."
      },
      {
        step: 3,
        title: "Boolean Functions",
        desc: "Map truth table combinations into minterms, maxterms, and functional representations."
      },
      {
        step: 4,
        title: "SOP and POS Forms",
        desc: "Construct canonical and standard two-level sum-of-products and product-of-sums."
      },
      {
        step: 5,
        title: "Karnaugh Maps",
        desc: "Use visual Gray code grids to systematically identify prime implicants without algebraic guesswork."
      },
      {
        step: 6,
        title: "NAND and NOR Realization",
        desc: "Convert simplified expressions into universal hardware-efficient gate networks."
      },
      {
        step: 7,
        title: "Exclusive-OR Implementation",
        desc: "Derive minimal XOR and XNOR networks using NAND and NOR building blocks."
      }
    ],

    fundamentals: [
      {
        term: "Boolean Algebra",
        definition: "A mathematical system formulated by George Boole (1854) and adapted to switching circuits by Claude Shannon (1938), operating on a two-element set {0, 1} with logical operations.",
        plainEnglish: "It is the algebra of logical decisions where variables can only be TRUE (1) or FALSE (0)."
      },
      {
        term: "Binary Variables & Constants",
        definition: "Variables (A, B, C, x, y) represent binary physical signals. Constants 0 and 1 represent low and high voltage levels.",
        plainEnglish: "A variable can hold only two possible values: 0 (LOW / False) or 1 (HIGH / True)."
      },
      {
        term: "The Three Basic Operators",
        definition: "AND (·), OR (+), and NOT (') form a functionally complete set of operations for any Boolean function.",
        plainEnglish: "AND means both must be 1. OR means at least one must be 1. NOT means flip the bit."
      },
      {
        term: "Literals, Terms and Expressions",
        definition: "A literal is a primed or unprimed variable (A or A'). A term is a combination of literals formed by AND (product term) or OR (sum term). An expression is one or more terms joined by operators.",
        plainEnglish: "In AB + C', A, B, and C' are literals; AB and C' are terms; the entire statement is an expression."
      },
      {
        term: "Boolean Equivalence",
        definition: "Two Boolean expressions are functionally equivalent if and only if they produce identical binary outputs for all possible 2^n input combinations.",
        plainEnglish: "If the truth tables match row for row, the two circuits will perform identically in physical hardware."
      },
      {
        term: "Why Mathematical Laws Are Needed",
        definition: "Laws provide guaranteed valid transformation rules. They allow engineers to manipulate logic equations without creating errors or changing the intended circuit function.",
        plainEnglish: "Instead of testing all input combinations every time, laws let us rewrite and shrink formulas with absolute certainty."
      }
    ],

    basicOperators: [
      {
        name: "AND Operation",
        symbol: "A · B or AB",
        meaning: "Output is 1 only when BOTH inputs are 1; otherwise 0.",
        table: [
          { a: 0, b: 0, out: 0 },
          { a: 0, b: 1, out: 0 },
          { a: 1, b: 0, out: 0 },
          { a: 1, b: 1, out: 1 }
        ]
      },
      {
        name: "OR Operation",
        symbol: "A + B",
        meaning: "Output is 1 when AT LEAST ONE input is 1; 0 only when both are 0.",
        table: [
          { a: 0, b: 0, out: 0 },
          { a: 0, b: 1, out: 1 },
          { a: 1, b: 0, out: 1 },
          { a: 1, b: 1, out: 1 }
        ]
      },
      {
        name: "NOT Operation",
        symbol: "A' or ~A",
        meaning: "Output is the exact logical inversion of the input.",
        table: [
          { a: 0, out: 1 },
          { a: 1, out: 0 }
        ]
      }
    ],

    arithmeticVsBoolean: [
      {
        property: "Domain of Values",
        arithmetic: "Infinite set of numbers (..., -2, -1, 0, 1, 2, ...)",
        boolean: "Only two discrete binary values: {0, 1}"
      },
      {
        property: "Meaning of 1 + 1",
        arithmetic: "1 + 1 = 2 (Sum of quantities)",
        boolean: "1 + 1 = 1 (Logical OR: True OR True is True)"
      },
      {
        property: "Available Operations",
        arithmetic: "Addition, Subtraction, Multiplication, Division",
        boolean: "Logical OR (+), Logical AND (·), Logical NOT ('). No subtraction or division."
      },
      {
        property: "Distributive Laws",
        arithmetic: "Only multiplication distributes over addition: a(b+c) = ab + ac",
        boolean: "Both distribute over each other: A(B+C) = AB + AC AND A + BC = (A+B)(A+C)"
      },
      {
        property: "Idempotent Property",
        arithmetic: "x + x = 2x, and x · x = x^2 (creates new values)",
        boolean: "x + x = x, and x · x = x (combining a condition with itself adds nothing new)"
      }
    ],

    operatorPrecedence: {
      title: "Operator Precedence Hierarchy",
      rule: "Operations with higher precedence are evaluated first, unless overridden by parentheses.",
      levels: [
        { rank: 1, name: "Parentheses ( )", description: "Innermost brackets are evaluated first. Always removes ambiguity." },
        { rank: 2, name: "NOT / Complement ( ' )", description: "Binds immediately to the adjacent variable or parenthesized term." },
        { rank: 3, name: "AND / Product ( · )", description: "Binds more tightly than OR. Evaluated before logical addition." },
        { rank: 4, name: "OR / Sum ( + )", description: "Lowest priority among the basic Boolean operators." }
      ],
      workedExample: {
        expression: "F = A + BC",
        explanation: "Because AND has higher precedence than OR, BC is computed first, and the product is then ORed with A.",
        evaluation: "If A = 0, B = 1, C = 1: First compute BC = 1 · 1 = 1. Then compute A + 1 = 0 + 1 = 1. (Never evaluate as (A + B) · C)."
      }
    }
  },

  // Tab 2: All Boolean Laws Content
  allLaws: {
    intro: {
      headline: "Why Do We Need Boolean Laws?",
      points: [
        "Transform logical expressions into equivalent forms while preserving their exact truth table output.",
        "Recognize and eliminate redundant hardware terms.",
        "Combine multiple logic gates into single, compact functional units.",
        "Systematically simplify expressions before physical circuit fabrication.",
        "Provide the mathematical justification for automated logic synthesis and K-Map grouping."
      ]
    },

    categories: [
      { id: "all", name: "All 13 Laws" },
      { id: "basic", name: "Basic Laws (1 to 5)" },
      { id: "structural", name: "Structural Laws (6 to 8)" },
      { id: "simplification", name: "Simplification Laws (9 to 11)" },
      { id: "theorems", name: "Important Theorems (12 to 13)" },
      { id: "duality", name: "Principle of Duality" }
    ],

    lawsList: [
      // Group 1: Basic Laws
      {
        id: "law-1",
        number: 1,
        name: "Identity Law",
        category: "basic",
        orForm: "A + 0 = A",
        andForm: "A · 1 = A",
        whatItMeans: "ORing any variable with 0 leaves it unchanged. ANDing any variable with 1 leaves it unchanged.",
        whyTrue: "In OR, 0 cannot force the output to 1; the output depends entirely on A. In AND, 1 satisfies the condition, leaving the result dependent only on A.",
        quickExample: "(X + 0) · 1 = X · 1 = X",
        rememberThis: "0 is the identity element for OR (+). 1 is the identity element for AND (·)."
      },
      {
        id: "law-2",
        number: 2,
        name: "Null / Domination Law",
        category: "basic",
        orForm: "A + 1 = 1",
        andForm: "A · 0 = 0",
        whatItMeans: "ORing any variable with 1 always forces the output to 1. ANDing any variable with 0 always forces the output to 0.",
        whyTrue: "An OR gate output is 1 whenever any input is 1. An AND gate output is 0 whenever any input is 0. The value of A has zero effect.",
        quickExample: "AB'C + 1 = 1, and (A + B + C) · 0 = 0",
        rememberThis: "1 dominates in OR. 0 dominates in AND. Use this to instantly wipe out complex terms."
      },
      {
        id: "law-3",
        number: 3,
        name: "Idempotent Law",
        category: "basic",
        orForm: "A + A = A",
        andForm: "A · A = A",
        whatItMeans: "Combining a logical condition with itself adds no new information.",
        whyTrue: "If A = 0, 0 + 0 = 0 and 0 · 0 = 0. If A = 1, 1 + 1 = 1 and 1 · 1 = 1. In both cases, the result is identical to A.",
        quickExample: "(A + B) + (A + B) = A + B",
        rememberThis: "Duplicate terms or repeated variables can always be collapsed into a single instance."
      },
      {
        id: "law-4",
        number: 4,
        name: "Complement Law",
        category: "basic",
        orForm: "A + A' = 1",
        andForm: "A · A' = 0",
        whatItMeans: "A variable and its complement always span all possibilities: one is guaranteed to be 1, and one is guaranteed to be 0.",
        whyTrue: "Since A and A' have opposite binary values, one is always 1 (satisfying OR) and one is always 0 (forcing AND to 0).",
        quickExample: "X + Y + X' = (X + X') + Y = 1 + Y = 1",
        rememberThis: "Look for complementary pairs (A and A') to eliminate variables and generate constants."
      },
      {
        id: "law-5",
        number: 5,
        name: "Double Complement / Involution Law",
        category: "basic",
        orForm: "(A')' = A",
        andForm: "-",
        specialProperty: "Complement Properties: 0' = 1 and 1' = 0",
        whatItMeans: "Inverting a logical value twice restores its original value.",
        whyTrue: "Flipping 0 gives 1; flipping 1 gives 0. Two successive inversions cancel each other out completely.",
        quickExample: "((A + B)')' = A + B",
        rememberThis: "Even numbers of complement bars cancel out; an odd number of complements simplifies to a single NOT."
      },

      // Group 2: Structural Laws
      {
        id: "law-6",
        number: 6,
        name: "Commutative Law",
        category: "structural",
        orForm: "A + B = B + A",
        andForm: "A · B = B · A",
        whatItMeans: "The order of inputs in an OR or AND operation does not affect the output.",
        whyTrue: "Logic gates do not care which physical wire is connected to which input pin; the logical function is symmetric.",
        quickExample: "C' + A = A + C'",
        rememberThis: "You can rearrange variables in whatever sequence makes common factoring easiest to spot."
      },
      {
        id: "law-7",
        number: 7,
        name: "Associative Law",
        category: "structural",
        orForm: "(A + B) + C = A + (B + C)",
        andForm: "(AB)C = A(BC)",
        whatItMeans: "When chaining identical operations (all OR or all AND), the grouping of inputs does not matter.",
        whyTrue: "A 3-input gate produces the exact same output whether built as two cascaded 2-input gates in either order.",
        quickExample: "(A + B) + C can be written simply as A + B + C",
        rememberThis: "Parentheses can be added or removed freely as long as all operators in the group are identical."
      },
      {
        id: "law-8",
        number: 8,
        name: "Distributive Law (Both Forms)",
        category: "structural",
        orForm: "A(B + C) = AB + AC (AND distributes over OR)",
        andForm: "A + BC = (A + B)(A + C) (OR distributes over AND)",
        whatItMeans: "Each operation distributes over the other. The second identity is unique to Boolean algebra and does not exist in ordinary arithmetic.",
        whyTrue: "In A + BC: if A = 1, both sides are 1. If A = 0, LHS is BC and RHS is (B)(C) = BC. The outputs are identical for all combinations.",
        quickExample: "X + Y'Z = (X + Y')(X + Z)",
        rememberThis: "Master A + BC = (A + B)(A + C). It is the single most tested distributive shortcut in exams."
      },

      // Group 3: Simplification Laws
      {
        id: "law-9",
        number: 9,
        name: "Absorption Law",
        category: "simplification",
        orForm: "A + AB = A",
        andForm: "A(A + B) = A",
        whatItMeans: "A single literal absorbs any larger term that contains it.",
        whyTrue: "A + AB = A(1 + B) = A(1) = A. If A is 1, the output is 1 anyway. If A is 0, both terms are 0. The second term AB is completely redundant.",
        quickExample: "X' + X'Y = X', and A(A + B + C) = A",
        rememberThis: "When a shorter term appears inside a longer term joined by the opposite operator, the longer term vanishes."
      },
      {
        id: "law-10",
        number: 10,
        name: "Combining / Reduction Law",
        category: "simplification",
        orForm: "AB + AB' = A",
        andForm: "(A + B)(A + B') = A",
        whatItMeans: "Two terms that are identical except for one variable that appears primed in one and unprimed in the other combine into one.",
        whyTrue: "AB + AB' = A(B + B') = A(1) = A. The variable B has no effect because whether B is 0 or 1, one of the terms is active.",
        quickExample: "XYZ + XYZ' = XY(Z + Z') = XY(1) = XY",
        rememberThis: "This law is the exact mathematical foundation of Karnaugh Map cell grouping."
      },
      {
        id: "law-11",
        number: 11,
        name: "Redundancy Law",
        category: "simplification",
        orForm: "A + A'B = A + B",
        andForm: "A(A' + B) = AB",
        whatItMeans: "If a variable appears standalone, its complemented form can be dropped from an adjacent product term.",
        whyTrue: "By distributive law: A + A'B = (A + A')(A + B) = 1 · (A + B) = A + B.",
        quickExample: "X' + XY = X' + Y, and A + AB' = A (via absorption)",
        rememberThis: "Watch for A + A'B: the prime on the second term simply disappears!"
      },

      // Group 4: Important Theorems
      {
        id: "law-12",
        number: 12,
        name: "De Morgan's Theorems",
        category: "theorems",
        orForm: "(AB)' = A' + B' (NAND equals bubbled OR)",
        andForm: "(A + B)' = A'B' (NOR equals bubbled AND)",
        whatItMeans: "The complement of a product is the sum of complements. The complement of a sum is the product of complements.",
        whyTrue: "For (AB)' to be 0, both A and B must be 1. For A' + B' to be 0, both A' and B' must be 0 (meaning A=1 and B=1). Their truth tables match identically.",
        quickExample: "Generalized to 3 variables: (A + B + C)' = A'B'C', and (ABC)' = A' + B' + C'",
        rememberThis: "Break the bar, change the sign! Swap + with · and complement each individual piece."
      },
      {
        id: "law-13",
        number: 13,
        name: "Consensus Theorem",
        category: "theorems",
        orForm: "AB + A'C + BC = AB + A'C",
        andForm: "(A + B)(A' + C)(B + C) = (A + B)(A' + C)",
        whatItMeans: "In a 3-term expression with a variable (A) and its complement (A') in two terms, the third term (BC) formed from the remaining variables is redundant.",
        whyTrue: "BC = BC(1) = BC(A + A') = ABC + A'BC. Then AB + ABC = AB, and A'C + A'BC = A'C. The BC term is completely absorbed.",
        quickExample: "XY + X'Z + YZ = XY + X'Z (YZ is the consensus term)",
        rememberThis: "Look for three variables: one appears unprimed and primed (A and A'); the other two form the third term (BC)."
      },

      // Duality Principle
      {
        id: "duality-principle",
        number: 14,
        name: "Principle of Duality",
        category: "duality",
        orForm: "Interchange OR (+) and AND (·)",
        andForm: "Interchange constants 0 and 1",
        whatItMeans: "If a Boolean identity is mathematically true, its dual identity formed by swapping operators and constants is also mathematically true.",
        whyTrue: "Huntington's postulates always occur in dual pairs (a) and (b). Every algebraic proof can be mirrored by swapping + and ·.",
        quickExample: "Dual of A + A'B = A + B is A · (A' + B) = AB. (Notice A' remains A'!).",
        rememberThis: "Duality modifies ONLY operators (+ <-> ·) and constants (0 <-> 1). It NEVER inverts variable literals."
      }
    ]
  },

  // Tab 3: See & Prove Content (Truth Tables & Algebraic Proofs)
  seeAndProve: [
    {
      id: "proof-1",
      title: "Proof 1: Identity Laws (A + 0 = A and A · 1 = A)",
      theorem: "0 is identity for OR; 1 is identity for AND",
      truthTable: {
        headers: ["A", "A + 0", "A · 1", "Matches A?"],
        rows: [
          [0, 0, 0, "Identical (0)"],
          [1, 1, 1, "Identical (1)"]
        ]
      },
      conclusion: "The two expressions are equivalent because their outputs match for every possible input combination."
    },
    {
      id: "proof-2",
      title: "Proof 2: Complement Laws (A + A' = 1 and A · A' = 0)",
      theorem: "Complementarity of opposite states",
      truthTable: {
        headers: ["A", "A'", "A + A'", "A · A'", "Expected Constants"],
        rows: [
          [0, 1, 1, 0, "OR = 1, AND = 0"],
          [1, 0, 1, 0, "OR = 1, AND = 0"]
        ]
      },
      conclusion: "Since A and A' are always opposites, their OR combination is universally 1 and their AND combination is universally 0."
    },
    {
      id: "proof-3",
      title: "Proof 3: Idempotent Laws (A + A = A and A · A = A)",
      theorem: "Logical idempotency",
      truthTable: {
        headers: ["A", "A + A", "A · A", "Matches A?"],
        rows: [
          [0, 0, 0, "Identical (0)"],
          [1, 1, 1, "Identical (1)"]
        ]
      },
      conclusion: "The outputs match A in every row. Repeatedly asserting a truth adds no new information."
    },
    {
      id: "proof-4",
      title: "Proof 4: Absorption Law (A + AB = A)",
      theorem: "Shorter literal absorbs longer product",
      truthTable: {
        headers: ["A", "B", "AB", "LHS: A + AB", "RHS: A", "Match?"],
        rows: [
          [0, 0, 0, 0, 0, "Yes (0 = 0)"],
          [0, 1, 0, 0, 0, "Yes (0 = 0)"],
          [1, 0, 0, 1, 1, "Yes (1 = 1)"],
          [1, 1, 1, 1, 1, "Yes (1 = 1)"]
        ]
      },
      conclusion: "Column 4 (A + AB) is identical to Column 5 (A) across all 4 valuations. The term AB is mathematically absorbed.",
      algebraicProof: {
        title: "Algebraic Proof of Absorption Law",
        statement: "Prove algebraically that A + AB = A without assuming absorption.",
        steps: [
          { step: 1, expr: "A + AB = A · 1 + AB", law: "Identity Law: A = A · 1", reason: "Introduce identity element 1 to allow common literal factoring." },
          { step: 2, expr: "= A(1 + B)", law: "Distributive Law: ax + ay = a(x + y)", reason: "Factor out the common literal A." },
          { step: 3, expr: "= A(1)", law: "Null / Domination Law: 1 + B = 1", reason: "1 ORed with any condition is Logic 1." },
          { step: 4, expr: "= A", law: "Identity Law: A · 1 = A", reason: "ANDing A with 1 returns A." }
        ],
        conclusion: "Therefore, A + AB = A is established algebraically. Q.E.D."
      }
    },
    {
      id: "proof-5",
      title: "Proof 5: Second Distributive Law: A + BC = (A + B)(A + C)",
      theorem: "OR distributes over AND (Unique to Boolean Algebra)",
      truthTable: {
        headers: ["A", "B", "C", "BC", "LHS: A + BC", "A + B", "A + C", "RHS: (A+B)(A+C)", "Match?"],
        rows: [
          [0, 0, 0, 0, 0, 0, 0, 0, "Match"],
          [0, 0, 1, 0, 0, 0, 1, 0, "Match"],
          [0, 1, 0, 0, 0, 1, 0, 0, "Match"],
          [0, 1, 1, 1, 1, 1, 1, 1, "Match"],
          [1, 0, 0, 0, 1, 1, 1, 1, 1, "Match"],
          [1, 0, 1, 0, 1, 1, 1, 1, "Match"],
          [1, 1, 0, 0, 1, 1, 1, 1, "Match"],
          [1, 1, 1, 1, 1, 1, 1, 1, "Match"]
        ]
      },
      conclusion: "Column 5 (A + BC) and Column 8 ((A+B)(A+C)) evaluate to 0, 0, 0, 1, 1, 1, 1, 1 identically for all 8 rows. Q.E.D.",
      algebraicProof: {
        title: "Algebraic Proof of Second Distributive Law",
        statement: "Prove algebraically that (A + B)(A + C) = A + BC.",
        steps: [
          { step: 1, expr: "(A + B)(A + C) = A(A + C) + B(A + C)", law: "First Distributive Law", reason: "Distribute the term (A + B) across (A + C)." },
          { step: 2, expr: "= AA + AC + BA + BC", law: "First Distributive Law", reason: "Multiply each individual literal across the sums." },
          { step: 3, expr: "= A + AC + AB + BC", law: "Idempotent & Commutative Laws", reason: "AA = A (Idempotent) and BA = AB (Commutative)." },
          { step: 4, expr: "= A(1 + C + B) + BC", law: "Distributive Law (Factoring)", reason: "Factor out the common literal A from the first three terms." },
          { step: 5, expr: "= A(1) + BC", law: "Null / Domination Law", reason: "1 + C + B = 1 (1 dominates any OR sum)." },
          { step: 6, expr: "= A + BC", law: "Identity Law: A · 1 = A", reason: "A · 1 equals A." }
        ],
        conclusion: "Since (A + B)(A + C) reduces algebraically to A + BC, the identity A + BC = (A + B)(A + C) is proven. Q.E.D."
      }
    },
    {
      id: "proof-6",
      title: "Proof 6: De Morgan's Theorems ((AB)' = A' + B' and (A + B)' = A'B')",
      theorem: "Duality between NAND/NOR and bubbled logic",
      truthTable: {
        headers: ["A", "B", "AB", "(AB)'", "A'", "B'", "A' + B'", "A + B", "(A + B)'", "A'B'"],
        rows: [
          [0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
          [0, 1, 0, 1, 1, 0, 1, 1, 0, 0],
          [1, 0, 0, 1, 0, 1, 1, 1, 0, 0],
          [1, 1, 1, 0, 0, 0, 0, 1, 0, 0]
        ]
      },
      conclusion: "Column 4 ((AB)') matches Column 7 (A' + B') identically (1, 1, 1, 0). Column 9 ((A+B)') matches Column 10 (A'B') identically (1, 0, 0, 0).",
      videoKey: "demorgan-theorems",
      algebraicProof: {
        title: "Algebraic Proof of De Morgan's Theorems via Uniqueness of Complements",
        statement: "In Boolean algebra, the complement of an element X is the UNIQUE element Y satisfying both XY = 0 and X + Y = 1.",
        partA: {
          identity: "Theorem 1: (AB)' = A' + B'",
          explanation: "Let X = AB and let candidate complement Y = A' + B'. We must demonstrate that XY = 0 and X + Y = 1.",
          productProof: [
            { step: 1, expr: "XY = (AB)(A' + B')", law: "Substitution", reason: "Multiply X by the candidate complement Y." },
            { step: 2, expr: "= (AB)A' + (AB)B'", law: "Distributive Law", reason: "Distribute (AB) across the sum (A' + B')." },
            { step: 3, expr: "= (AA')B + A(BB')", law: "Associative & Commutative", reason: "Rearrange to group complementary literal pairs." },
            { step: 4, expr: "= (0)B + A(0)", law: "Complement Law: x · x' = 0", reason: "AA' = 0 and BB' = 0." },
            { step: 5, expr: "= 0 + 0 = 0", law: "Null and Identity Laws", reason: "0 · B = 0 and A · 0 = 0." }
          ],
          sumProof: [
            { step: 1, expr: "X + Y = AB + A' + B'", law: "Substitution", reason: "Form the logical sum of X and candidate complement Y." },
            { step: 2, expr: "= (A' + AB) + B'", law: "Commutative & Associative", reason: "Group A' together with AB." },
            { step: 3, expr: "= [(A' + A)(A' + B)] + B'", law: "Second Distributive Law: x + yz = (x+y)(x+z)", reason: "Apply distributivity without assuming De Morgan's theorem." },
            { step: 4, expr: "= [(1)(A' + B)] + B'", law: "Complement Law: A' + A = 1", reason: "A' + A evaluates to 1." },
            { step: 5, expr: "= (A' + B) + B'", law: "Identity Law: 1 · X = X", reason: "Multiplying by 1 leaves (A' + B) unchanged." },
            { step: 6, expr: "= A' + (B + B')", law: "Associative Law", reason: "Regroup B with its complement B'." },
            { step: 7, expr: "= A' + 1 = 1", law: "Complement & Null Laws", reason: "B + B' = 1, and A' + 1 = 1." }
          ],
          conclusion: "Since (AB)(A' + B') = 0 and (AB) + (A' + B') = 1, by uniqueness of complements: (AB)' = A' + B'. Q.E.D."
        },
        partB: {
          identity: "Theorem 2: (A + B)' = A'B'",
          explanation: "Let X = A + B and let candidate complement Y = A'B'. We must demonstrate that XY = 0 and X + Y = 1.",
          productProof: [
            { step: 1, expr: "XY = (A + B)(A'B')", law: "Substitution", reason: "Multiply X by the candidate complement Y." },
            { step: 2, expr: "= A(A'B') + B(A'B')", law: "Distributive Law", reason: "Distribute across the sum (A + B)." },
            { step: 3, expr: "= (AA')B' + A'(BB')", law: "Associative & Commutative", reason: "Group complementary literal pairs." },
            { step: 4, expr: "= (0)B' + A'(0) = 0 + 0 = 0", law: "Complement & Null", reason: "AA' = 0 and BB' = 0." }
          ],
          sumProof: [
            { step: 1, expr: "X + Y = (A + B) + A'B'", law: "Substitution", reason: "Form the logical sum of X and candidate complement Y." },
            { step: 2, expr: "= [(A + B) + A'] · [(A + B) + B']", law: "Second Distributive Law", reason: "Treat (A + B) as single term x in x + yz = (x+y)(x+z)." },
            { step: 3, expr: "= [(A + A') + B] · [A + (B + B')]", law: "Associative & Commutative", reason: "Regroup complementary literals." },
            { step: 4, expr: "= [1 + B] · [A + 1]", law: "Complement Law: x + x' = 1", reason: "A + A' = 1 and B + B' = 1." },
            { step: 5, expr: "= 1 · 1 = 1", law: "Null & Identity Laws", reason: "1 + B = 1 and A + 1 = 1." }
          ],
          conclusion: "Since (A + B)(A'B') = 0 and (A + B) + (A'B') = 1, by uniqueness of complements: (A + B)' = A'B'. Q.E.D."
        }
      }
    },
    {
      id: "proof-7",
      title: "Proof 7: Consensus Theorem: AB + A'C + BC = AB + A'C",
      theorem: "Elimination of redundant consensus term BC",
      truthTable: {
        headers: ["A", "B", "C", "A'", "AB", "A'C", "BC", "LHS (with BC)", "RHS (without BC)", "Match?"],
        rows: [
          [0, 0, 0, 1, 0, 0, 0, 0, 0, "Match"],
          [0, 0, 1, 1, 0, 1, 0, 1, 1, "Match"],
          [0, 1, 0, 1, 0, 0, 0, 0, 0, "Match"],
          [0, 1, 1, 1, 0, 1, 1, 1, 1, "Match"],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, "Match"],
          [1, 0, 1, 0, 0, 0, 0, 0, 0, "Match"],
          [1, 1, 0, 0, 1, 0, 0, 1, 1, "Match"],
          [1, 1, 1, 0, 1, 0, 1, 1, 1, "Match"]
        ]
      },
      conclusion: "Column 8 and Column 9 produce identical outputs (0, 1, 0, 1, 0, 0, 1, 1) across all 8 rows. The third term BC is provably redundant.",
      videoKey: "redundancy-theorem",
      algebraicProof: {
        title: "Mandatory Algebraic Proof of Consensus Theorem",
        statement: "Prove algebraically that AB + A'C + BC = AB + A'C.",
        steps: [
          { step: 1, expr: "AB + A'C + BC = AB + A'C + BC(1)", law: "Identity Law: BC = BC · 1", reason: "Introduce the identity element 1 to the third term." },
          { step: 2, expr: "= AB + A'C + BC(A + A')", law: "Complement Law: A + A' = 1", reason: "Substitute 1 with (A + A'), introducing variable A from the other terms." },
          { step: 3, expr: "= AB + A'C + ABC + A'BC", law: "Distributive Law: BC(A + A') = ABC + A'BC", reason: "Multiply BC across the complementary sum." },
          { step: 4, expr: "= (AB + ABC) + (A'C + A'BC)", law: "Commutative & Associative Laws", reason: "Rearrange and group terms with common factors AB and A'C." },
          { step: 5, expr: "= AB(1 + C) + A'C(1 + B)", law: "Distributive Law (Factoring)", reason: "Factor out AB from the first group and A'C from the second group." },
          { step: 6, expr: "= AB(1) + A'C(1)", law: "Null / Domination Law: 1 + X = 1", reason: "1 + C = 1 and 1 + B = 1." },
          { step: 7, expr: "= AB + A'C", law: "Identity Law: X · 1 = X", reason: "AB · 1 = AB and A'C · 1 = A'C. The consensus term BC is completely absorbed." }
        ],
        conclusion: "Therefore, AB + A'C + BC = AB + A'C is proven algebraically without assuming the theorem. Q.E.D."
      }
    },
    {
      id: "proof-8",
      title: "Proof 8: Principle of Duality vs Logical Complementation",
      theorem: "Duality is an algebraic symmetry, NOT complementation or functional equivalence",
      truthTable: {
        headers: ["A", "B", "F = A + B", "Dual(F) = AB", "Complement(F) = (A+B)'", "Are Dual & F Equal?"],
        rows: [
          [0, 0, 0, 0, 1, "Equal (0 = 0)"],
          [0, 1, 1, 0, 0, "DIFFERENT (1 != 0)"],
          [1, 0, 1, 0, 0, "DIFFERENT (1 != 0)"],
          [1, 1, 1, 1, 0, "Equal (1 = 1)"]
        ]
      },
      conclusion: "Notice that F and its Dual differ on rows 2 and 3! An expression is NOT generally equal to its dual. Duality states that if an EQUATION (LHS = RHS) is universally true, then the DUAL EQUATION (Dual LHS = Dual RHS) is also universally true."
    }
  ],

  // Tab 4: Worked Examples Content (10 Required Introductory Examples)
  workedExamples: [
    {
      id: "ex-1",
      number: 1,
      title: "Evaluating a Boolean Expression with Precedence",
      concept: "Operator Precedence Hierarchy: ( ) -> NOT -> AND -> OR",
      initialExpression: "F(A, B, C) = A + BC",
      problemStatement: "Given the Boolean function F = A + BC, evaluate the output when A = 0, B = 1, and C = 1. Clearly justify the order of operations.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = 0 + (1 · 1)",
          law: "Substitution",
          reason: "Substitute input values into the algebraic function."
        },
        {
          stepNumber: 2,
          expression: "F = 0 + 1",
          law: "AND Operation: 1 · 1 = 1",
          reason: "AND has higher precedence than OR, so evaluate BC before adding A."
        },
        {
          stepNumber: 3,
          expression: "F = 1",
          law: "OR Operation: 0 + 1 = 1",
          reason: "Evaluate the outer OR operation."
        }
      ],
      finalAnswer: "F(0, 1, 1) = 1",
      verificationNote: "If OR were evaluated before AND, one would incorrectly compute (0 + 1) · 1 = 1 · 1 = 1. While the answer coincidentally matches here, for inputs A = 1, B = 1, C = 0: correct precedence yields 1 + (1·0) = 1 + 0 = 1, whereas wrong precedence yields (1 + 1) · 0 = 1 · 0 = 0 (an error).",
      commonMistake: "Never compute (A + B) · C when an expression is written as A + BC without parentheses."
    },
    {
      id: "ex-2",
      number: 2,
      title: "Simplification Using Identity Laws",
      concept: "Identity Elements: x + 0 = x and x · 1 = x",
      initialExpression: "F = (A + 0) · 1",
      problemStatement: "Simplify the expression F = (A + 0) · 1 by applying the identity laws.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = A · 1",
          law: "Identity Law: A + 0 = A",
          reason: "0 is the identity element for OR; ORing A with 0 yields A."
        },
        {
          stepNumber: 2,
          expression: "F = A",
          law: "Identity Law: A · 1 = A",
          reason: "1 is the identity element for AND; ANDing A with 1 yields A."
        }
      ],
      finalAnswer: "F = A",
      verificationNote: "Evaluates to 0 when A=0, and 1 when A=1. The logic gates are completely eliminated.",
      commonMistake: "Do not confuse identity with null laws: A + 1 is 1, but A + 0 is A."
    },
    {
      id: "ex-3",
      number: 3,
      title: "Combining Complement and Identity Laws",
      concept: "Complement Law: B + B' = 1 followed by Identity",
      initialExpression: "F = A(B + B')",
      problemStatement: "Simplify F = A(B + B') to its minimal hardware realization.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = A(1)",
          law: "Complement Law: B + B' = 1",
          reason: "A variable ORed with its exact complement is always true (Logic 1)."
        },
        {
          stepNumber: 2,
          expression: "F = A",
          law: "Identity Law: A · 1 = A",
          reason: "ANDing any variable with constant 1 yields the variable itself."
        }
      ],
      finalAnswer: "F = A",
      verificationNote: "Input B has zero influence on the circuit output. Only input A is needed.",
      commonMistake: "Do not expand this into AB + AB' unless your goal is to find canonical minterms. For simplification, substitute B + B' = 1 immediately."
    },
    {
      id: "ex-4",
      number: 4,
      title: "Reduction via Idempotent Law",
      concept: "Idempotent Property: A + A = A",
      initialExpression: "F = (A + A)B",
      problemStatement: "Simplify the expression F = (A + A)B using Boolean laws.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = AB",
          law: "Idempotent Law: A + A = A",
          reason: "ORing a variable with itself produces the variable itself."
        }
      ],
      finalAnswer: "F = AB",
      verificationNote: "Reduces a 2-gate expression to a single 2-input AND gate.",
      commonMistake: "In ordinary arithmetic A + A = 2A. In Boolean logic, 2 does not exist; A + A = A."
    },
    {
      id: "ex-5",
      number: 5,
      title: "Applying the Absorption Law",
      concept: "Absorption: A + AB = A",
      initialExpression: "F = A + AB",
      problemStatement: "Show step-by-step why F = A + AB simplifies to A.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = A · 1 + AB",
          law: "Identity Law: A = A · 1",
          reason: "Express A with its identity factor to enable factoring."
        },
        {
          stepNumber: 2,
          expression: "F = A(1 + B)",
          law: "Distributive Law: AB + AC = A(B + C)",
          reason: "Factor out the common literal A."
        },
        {
          stepNumber: 3,
          expression: "F = A(1)",
          law: "Null / Domination Law: 1 + B = 1",
          reason: "1 ORed with any variable is 1."
        },
        {
          stepNumber: 4,
          expression: "F = A",
          law: "Identity Law: A · 1 = A",
          reason: "ANDing A with 1 yields A."
        }
      ],
      finalAnswer: "F = A",
      verificationNote: "Once mastered, engineers apply A + AB = A in a single direct step.",
      commonMistake: "Do not confuse A + AB = A with A + A'B = A + B (Redundancy Law)."
    },
    {
      id: "ex-6",
      number: 6,
      title: "Applying the Combining / Reduction Law",
      concept: "Combining: AB + AB' = A",
      initialExpression: "F = AB + AB'",
      problemStatement: "Simplify F = AB + AB' algebraically.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = A(B + B')",
          law: "Distributive Law: Factor out common literal A",
          reason: "Both product terms share literal A."
        },
        {
          stepNumber: 2,
          expression: "F = A(1)",
          law: "Complement Law: B + B' = 1",
          reason: "B ORed with B' always evaluates to 1."
        },
        {
          stepNumber: 3,
          expression: "F = A",
          law: "Identity Law: A · 1 = A",
          reason: "A multiplied by 1 is A."
        }
      ],
      finalAnswer: "F = A",
      verificationNote: "This combining principle is the core operation automated by K-Map grouping.",
      commonMistake: "Failing to recognize that B and B' cancel out when multiplied by identical common factors."
    },
    {
      id: "ex-7",
      number: 7,
      title: "De Morgan's Theorem and Double Complement",
      concept: "De Morgan's Law: (X + Y)' = X'Y' with Involution (B')' = B",
      initialExpression: "F = (A + B')'",
      problemStatement: "Simplify F = (A + B')' by applying De Morgan's theorem.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = A' · (B')'",
          law: "De Morgan's Theorem: (X + Y)' = X' · Y'",
          reason: "Break the overbar and change the OR operator (+) to AND (·)."
        },
        {
          stepNumber: 2,
          expression: "F = A'B",
          law: "Double Complement Law: (B')' = B",
          reason: "The double complement on B cancels out."
        }
      ],
      finalAnswer: "F = A'B",
      verificationNote: "A NOR gate with an inverted input is functionally equivalent to an AND gate with input A inverted.",
      commonMistake: "Forgetting to change the operator: writing A' + B is an extremely common error."
    },
    {
      id: "ex-8",
      number: 8,
      title: "Simplifying with the Redundancy Law",
      concept: "Redundancy Law: A + A'B = A + B",
      initialExpression: "F = A + A'B",
      problemStatement: "Prove algebraically that F = A + A'B simplifies to A + B.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = (A + A')(A + B)",
          law: "Second Distributive Law: x + yz = (x + y)(x + z)",
          reason: "Distribute OR over the product A'B where x = A, y = A', z = B."
        },
        {
          stepNumber: 2,
          expression: "F = (1)(A + B)",
          law: "Complement Law: A + A' = 1",
          reason: "A + A' equals 1."
        },
        {
          stepNumber: 3,
          expression: "F = A + B",
          law: "Identity Law: 1 · X = X",
          reason: "Multiplying by 1 leaves A + B unchanged."
        }
      ],
      finalAnswer: "F = A + B",
      verificationNote: "Eliminates the NOT gate on A' and reduces gate input count.",
      commonMistake: "Thinking A'B cannot be simplified because A and A' are different literals."
    },
    {
      id: "ex-9",
      number: 9,
      title: "Formulating a Dual Expression",
      concept: "Principle of Duality: Swap (+ <-> ·) and (0 <-> 1), keep literals",
      initialExpression: "F = A + B'C",
      problemStatement: "Determine the dual expression of F = A + B'C. Explain why B' remains complemented.",
      steps: [
        {
          stepNumber: 1,
          expression: "Identify operations: The expression is A OR (B' AND C)",
          law: "Analysis of Structure",
          reason: "Outer operation is +, inner operation is implicit ·."
        },
        {
          stepNumber: 2,
          expression: "Dual = A · (B' + C)",
          law: "Principle of Duality",
          reason: "Swap the outer + with ·. Swap the inner · with +. Keep A, B', and C unchanged."
        }
      ],
      finalAnswer: "Dual(F) = A(B' + C)",
      verificationNote: "Parentheses around (B' + C) are mandatory to ensure OR is computed before AND in the dual.",
      commonMistake: "Never complement literals when finding a dual: writing A'(B + C') is finding the complement, NOT the dual."
    },
    {
      id: "ex-10",
      number: 10,
      title: "Eliminating Redundancy with Consensus Theorem",
      concept: "Consensus Theorem: AB + A'C + BC = AB + A'C",
      initialExpression: "F = AB + A'C + BC",
      problemStatement: "Identify the consensus term and simplify F = AB + A'C + BC.",
      steps: [
        {
          stepNumber: 1,
          expression: "F = AB + A'C + BC(1)",
          law: "Identity Law: BC = BC · 1",
          reason: "Prepare the third term for expansion."
        },
        {
          stepNumber: 2,
          expression: "F = AB + A'C + BC(A + A')",
          law: "Complement Law: A + A' = 1",
          reason: "Substitute 1 with the complementary pair (A + A') from the other two terms."
        },
        {
          stepNumber: 3,
          expression: "F = AB + A'C + ABC + A'BC",
          law: "Distributive Law: Expand BC(A + A')",
          reason: "Multiply BC across A and A'."
        },
        {
          stepNumber: 4,
          expression: "F = (AB + ABC) + (A'C + A'BC)",
          law: "Commutative and Associative Laws",
          reason: "Regroup terms containing common factors."
        },
        {
          stepNumber: 5,
          expression: "F = AB(1 + C) + A'C(1 + B)",
          law: "Distributive Law: Factor common terms",
          reason: "Factor out AB from first group and A'C from second group."
        },
        {
          stepNumber: 6,
          expression: "F = AB(1) + A'C(1) = AB + A'C",
          law: "Null and Identity Laws: 1 + X = 1 and Y · 1 = Y",
          reason: "The consensus term BC is completely absorbed."
        }
      ],
      finalAnswer: "F = AB + A'C",
      verificationNote: "Saves an entire 2-input AND gate and an OR gate input.",
      commonMistake: "Missing the consensus term because the variables appear in permuted order."
    }
  ],

  // Common Mistakes & Misconceptions
  commonMistakes: [
    {
      id: "cm-1",
      mistake: "Confusing Boolean OR with arithmetic addition",
      correctMethod: "Remember that in Boolean logic, 1 + 1 = 1 (TRUE OR TRUE is TRUE).",
      why: "Boolean OR represents logical disjunction, not numeric accumulation. 2 does not exist in switching algebra."
    },
    {
      id: "cm-2",
      mistake: "Assuming A' always equals 1",
      correctMethod: "A' is the opposite of A. If A = 1, then A' = 0. If A = 0, then A' = 1.",
      why: "A' is a variable complement, not a constant."
    },
    {
      id: "cm-3",
      mistake: "Inverting variable literals when determining the dual",
      correctMethod: "The dual of A + B'C is A(B' + C). Literals (including B') stay exactly as they are.",
      why: "Duality only swaps operators (+ <-> ·) and constants (0 <-> 1). Inverting literals produces the complement, not the dual."
    },
    {
      id: "cm-4",
      mistake: "Applying De Morgan's theorem without changing the operator",
      correctMethod: "(AB)' = A' + B' (the AND becomes an OR). (A + B)' = A'B' (the OR becomes an AND).",
      why: "Writing (AB)' = A'B' is completely false. You must break the bar AND change the operator."
    },
    {
      id: "cm-5",
      mistake: "Ignoring operator precedence in expressions like A + BC",
      correctMethod: "Always compute AND before OR: A + BC means A + (BC).",
      why: "Evaluating A + BC as (A + B)C alters the logical truth table and produces incorrect hardware."
    },
    {
      id: "cm-6",
      mistake: "Rejecting the second distributive law A + BC = (A + B)(A + C) as invalid",
      correctMethod: "Recognize that in Boolean algebra, OR distributes over AND just as AND distributes over OR.",
      why: "Ordinary algebra does not allow this, but in two-valued Boolean algebra it is fully valid and proven by perfect induction."
    },
    {
      id: "cm-7",
      mistake: "Misapplying absorption without an exact matching literal",
      correctMethod: "A + AB = A requires that the literal A appears identically in both terms.",
      why: "A + A'B does NOT equal A. By the redundancy law, A + A'B = A + B."
    }
  ],

  // Tab 5: Cheat Sheet Master Data
  // Task 4: Explicit Complement Properties category without misleading OR/AND dual columns
  cheatSheet: {
    title: "Boolean Laws Master Cheat Sheet",
    description: "Compact, examination-ready reference of all 13 Boolean laws, Huntington postulates, duality, and precedence rules.",
    groups: [
      {
        name: "Basic Axiomatic Laws",
        type: "dual-pair",
        laws: [
          { name: "Identity", orForm: "A + 0 = A", andForm: "A · 1 = A", tip: "0 drops out of OR; 1 drops out of AND" },
          { name: "Null / Domination", orForm: "A + 1 = 1", andForm: "A · 0 = 0", tip: "1 forces OR to 1; 0 forces AND to 0" },
          { name: "Idempotent", orForm: "A + A = A", andForm: "A · A = A", tip: "Eliminate duplicate variables and terms" },
          { name: "Complement", orForm: "A + A' = 1", andForm: "A · A' = 0", tip: "Opposite pairs generate constants" }
        ]
      },
      {
        name: "Complement Properties",
        type: "single-property",
        laws: [
          { name: "Double Complement (Involution)", property: "(A')' = A", tip: "Two successive inversions cancel completely (even count cancels)" },
          { name: "Complements of Constants", property: "0' = 1 and 1' = 0", tip: "Ground complements to supply; supply complements to ground" }
        ]
      },
      {
        name: "Structural Laws",
        type: "dual-pair",
        laws: [
          { name: "Commutative", orForm: "A + B = B + A", andForm: "AB = BA", tip: "Order of variables can be freely rearranged" },
          { name: "Associative", orForm: "(A + B) + C = A + (B + C)", andForm: "(AB)C = A(BC)", tip: "Parentheses can be shifted among identical operators" },
          { name: "Distributive 1", orForm: "A(B + C) = AB + AC", andForm: "AND distributes over OR", tip: "Factor out common terms or expand" },
          { name: "Distributive 2", orForm: "A + BC = (A + B)(A + C)", andForm: "OR distributes over AND", tip: "Break down sum with products; unique to Boolean" }
        ]
      },
      {
        name: "Simplification Laws",
        type: "dual-pair",
        laws: [
          { name: "Absorption", orForm: "A + AB = A", andForm: "A(A + B) = A", tip: "Shorter term absorbs longer term" },
          { name: "Combining", orForm: "AB + AB' = A", andForm: "(A + B)(A + B') = A", tip: "Foundation of Karnaugh Map pairing" },
          { name: "Redundancy", orForm: "A + A'B = A + B", andForm: "A(A' + B) = AB", tip: "Complemented literal in product disappears" }
        ]
      },
      {
        name: "Important Theorems",
        type: "dual-pair",
        laws: [
          { name: "De Morgan 1", orForm: "(AB)' = A' + B'", andForm: "NAND = bubbled OR", tip: "Break the bar and change AND to OR" },
          { name: "De Morgan 2", orForm: "(A + B)' = A'B'", andForm: "NOR = bubbled AND", tip: "Break the bar and change OR to AND" },
          { name: "Generalized De Morgan", orForm: "(A + B + C + ...)' = A'B'C'...", andForm: "(ABC...)' = A' + B' + C'...", tip: "Applies across any number of inputs" },
          { name: "Consensus", orForm: "AB + A'C + BC = AB + A'C", andForm: "(A+B)(A'+C)(B+C) = (A+B)(A'+C)", tip: "Eliminate third term formed by non-inverted variables" }
        ]
      },
      {
        name: "Principle of Duality & Precedence",
        type: "reference-rules",
        laws: [
          { name: "Duality Rule", orForm: "Swap + with ·", andForm: "Swap 0 with 1", tip: "Keep literals unchanged; preserve grouping with ( )" },
          { name: "Operator Precedence", orForm: "1. Parentheses ( )", andForm: "2. NOT -> 3. AND -> 4. OR", tip: "AND binds more tightly than OR" }
        ]
      }
    ]
  }
};
