/**
 * Digital Logic Design (DLD) - Section 2.2 Data Module
 * Simplification of Boolean Expressions Using Algebraic Laws
 * 
 * Strict formatting: Zero em-dashes and zero en-dashes throughout.
 */

export const dldSection22Data = {
  id: "2.2",
  number: "2.2",
  title: "Simplification of Boolean Expressions Using Algebraic Laws",
  badge: "Algebraic Minimization",
  status: "Available",
  estimatedReadTime: "24 min read",
  description: "Learn how to systematically recognize algebraic patterns, select valid Boolean laws, execute step-by-step transformations, and reduce switching functions into simplified, hardware-efficient forms.",

  // Tab 1: Start Here Content
  startHere: {
    whySimplify: {
      headline: "Why Do We Simplify Boolean Expressions?",
      quote: "A Boolean expression describes the logical behavior of a digital circuit. Sometimes, different expressions produce exactly the same output, but one may require fewer logical operations than another. Boolean algebra helps us recognize these equivalent expressions and remove unnecessary terms. The goal is to preserve the function while identifying a simpler mathematical representation that may lead to a more efficient circuit implementation.",
      benefits: [
        {
          id: "b1",
          title: "Fewer Logical Operations",
          desc: "Removes unnecessary gate stages and eliminates redundant binary conditions."
        },
        {
          id: "b2",
          title: "Reduced Circuit Complexity",
          desc: "Simplifies printed circuit board routing and minimizes on-chip metal interconnects."
        },
        {
          id: "b3",
          title: "Potentially Smaller Hardware",
          desc: "A simpler realization can reduce discrete package count and silicon die footprint."
        },
        {
          id: "b4",
          title: "Power and Speed Advantages",
          desc: "Fewer active switching transistors lower dynamic power dissipation and can reduce propagation delay."
        }
      ],
      engineeringNote: "Physical advantages (such as reduced silicon area, decreased switching capacitance, and minimized gate delay) depend on target silicon technology and library cell availability. Guaranteed mathematical equivalence ensures logical correctness regardless of the physical realization.",
      section21Ref: "For foundational Huntington postulates and complete truth table proofs of the 13 Boolean laws, review Section 2.1."
    },

    objectiveDemo: {
      title: "The Objective of Boolean Simplification",
      expression: "F = A + AB",
      lawApplied: "Absorption Law: A + AB = A",
      result: "F = A",
      explanation: "The term AB does not add any new condition that can make the output 1 beyond what A already provides. When A is 1, the output is 1 regardless of B. When A is 0, both terms evaluate to 0. Therefore, the second product term AB is completely redundant and can be eliminated.",
      comparison: {
        before: {
          label: "Original Function",
          expression: "F = A + AB",
          gateCount: "2 Discrete Gates (1 AND, 1 OR)",
          literalCount: "3 Literals (A, A, B)",
          routing: "Input A connects to two separate gates in parallel with input B"
        },
        after: {
          label: "Simplified Function",
          expression: "F = A",
          gateCount: "0 Gates (Direct Conductor)",
          literalCount: "1 Literal (A)",
          routing: "Input A feeds output F directly; Input B is completely disconnected"
        }
      }
    },

    sixSteps: {
      title: "The Six-Step Boolean Simplification Method",
      subtitle: "A structured engineering framework for algebraic reduction",
      steps: [
        {
          step: 1,
          name: "READ",
          desc: "Identify variables, complements, parentheses, and operator precedence hierarchy."
        },
        {
          step: 2,
          name: "RECOGNIZE",
          desc: "Look for common factors, complementary literals, duplicate terms, and known Boolean patterns."
        },
        {
          step: 3,
          name: "CHOOSE",
          desc: "Identify a valid law or theorem that can transform the expression usefully."
        },
        {
          step: 4,
          name: "TRANSFORM",
          desc: "Apply the selected law correctly and show the resulting equivalent algebraic expression."
        },
        {
          step: 5,
          name: "CHECK",
          desc: "Verify the intermediate result algebraically or through truth table evaluation."
        },
        {
          step: 6,
          name: "CONCLUDE",
          desc: "Present the simplified equivalent expression and explain what has been eliminated."
        }
      ],
      loopNote: "This process often requires several iterative repetitions of Recognize -> Choose -> Transform until no further reduction is possible. Not every expression has one compulsory sequence of transformations; multiple valid algebraic paths often lead to the same simplified form."
    },

    equivVsMinimal: {
      title: "Equivalent Expressions vs Minimal Expressions",
      definitions: [
        {
          term: "Equivalent Expression",
          meaning: "Two Boolean expressions that produce identical outputs for every possible valuation of input variables across the complete truth table."
        },
        {
          term: "Simplified Expression",
          meaning: "An equivalent expression that contains fewer terms, fewer literals, or fewer logical operators than the original expression."
        },
        {
          term: "Minimal Expression",
          meaning: "An expression that achieves the absolute minimum cost under a formally defined metric (such as minimum literals, minimum discrete gate count, or minimum two-level delay)."
        }
      ],
      cautionNote: "The first shorter expression found during algebraic manipulation is not guaranteed to be globally minimal. In Section 2.2, we focus on effective algebraic simplification. Global minimality is proven using systematic tabular or graphical methods (such as Karnaugh Maps in Sections 2.5 and 2.6)."
    }
  },

  // Tab 2: Simplification Techniques Content
  techniques: {
    fourOrLaws: [
      {
        id: "or-1",
        name: "Identity Law",
        formula: "A + 0 = A",
        explanation: "ORing any variable with 0 preserves the variable literal without change.",
        example: "XY + 0 = XY",
        recognitionTip: "Look for + 0 in expressions; drop it immediately.",
        application: "Enables dropping inactive terms or inserting + 0 during dual transformations."
      },
      {
        id: "or-2",
        name: "Null / Domination Law",
        formula: "A + 1 = 1",
        explanation: "1 forces the OR output to 1 regardless of the value of A.",
        example: "(AB' + CD) + 1 = 1",
        recognitionTip: "Look for any term ORed with 1; the entire OR sum collapses to 1.",
        application: "Used after factoring: A(1 + B) collapses to A(1) = A."
      },
      {
        id: "or-3",
        name: "Idempotent Law",
        formula: "A + A = A",
        explanation: "Combining an element with itself yields itself. There are no coefficients in Boolean algebra.",
        example: "BC + BC = BC",
        recognitionTip: "Look for identical terms in a sum; keep only one instance.",
        application: "Allows introducing a duplicate term to facilitate pairwise grouping."
      },
      {
        id: "or-4",
        name: "Complement Law",
        formula: "A + A' = 1",
        explanation: "A variable combined with its exact complement spans all binary possibilities.",
        example: "XYZ + (XYZ)' = 1",
        recognitionTip: "Look for a variable and its prime joined by OR.",
        application: "Key step in factoring: AB + AB' = A(B + B') = A(1) = A."
      }
    ],

    fourAndLaws: [
      {
        id: "and-1",
        name: "Identity Law",
        formula: "A · 1 = A",
        explanation: "ANDing any variable with 1 preserves the variable literal without change.",
        example: "(X + Y) · 1 = X + Y",
        recognitionTip: "Look for · 1 in products; drop it immediately.",
        application: "Allows introducing · 1 to enable factoring: A + AB = A · 1 + AB = A(1 + B)."
      },
      {
        id: "and-2",
        name: "Null / Domination Law",
        formula: "A · 0 = 0",
        explanation: "0 forces the AND output to 0 regardless of the value of A.",
        example: "(A + B'C) · 0 = 0",
        recognitionTip: "Look for any product term multiplied by 0; the whole term vanishes.",
        application: "Used to eliminate contradictory product paths in circuits."
      },
      {
        id: "and-3",
        name: "Idempotent Law",
        formula: "A · A = A",
        explanation: "Multiplying a variable by itself yields the variable itself. There are no exponents.",
        example: "A · A · B = AB",
        recognitionTip: "Look for duplicate literals inside a product term; keep only one.",
        application: "Eliminates redundant literal inputs in multi-input AND gates."
      },
      {
        id: "and-4",
        name: "Complement Law",
        formula: "A · A' = 0",
        explanation: "A variable and its exact complement cannot both be 1 simultaneously.",
        example: "AB · A' = (AA')B = 0 · B = 0",
        recognitionTip: "Look for a variable and its complement inside the same product term.",
        application: "Instantly collapses contradictory product terms to logic 0."
      }
    ],

    dualitySummary: {
      headline: "Duality Relationship Between OR and AND Laws",
      orIdentity: "0 is the identity element for OR (A + 0 = A)",
      andIdentity: "1 is the identity element for AND (A · 1 = A)",
      orDominant: "1 dominates the OR operation (A + 1 = 1)",
      andDominant: "0 dominates the AND operation (A · 0 = 0)",
      takeaway: "By the Principle of Duality, every valid OR identity has an exact dual AND identity obtained by interchanging + with · and 0 with 1."
    },

    tenTechniques: [
      {
        number: 1,
        name: "Identity and Null Elimination",
        pattern: "Terms containing constants 0 or 1",
        formula: "A + 0 = A,  A · 1 = A,  A + 1 = 1,  A · 0 = 0",
        whyItWorks: "Constants provide fixed logic levels that either leave variables unaffected or force output states unconditionally.",
        example: "F = AB + 0 + C(1) + D(0) simplifies to F = AB + C",
        whenToApply: "First pass: immediately eliminate inactive constants and collapse dominated terms.",
        mistake: "Writing A + 1 = A (confusing OR with ordinary arithmetic) instead of 1."
      },
      {
        number: 2,
        name: "Idempotent Literal and Term Reduction",
        pattern: "Repeated literals inside products or repeated terms inside sums",
        formula: "A + A = A  and  A · A = A",
        whyItWorks: "Switching logic is binary and non-quantitative; repetition adds no new functional information.",
        example: "F = AAB + AB + AB simplifies to F = AB",
        whenToApply: "After expanding brackets or multiplying terms out.",
        mistake: "Writing A + A = 2A or A · A = A^2 (treating Boolean algebra as ordinary algebra)."
      },
      {
        number: 3,
        name: "Complement Elimination",
        pattern: "A variable and its exact prime in the same term or sum",
        formula: "A + A' = 1  and  A · A' = 0",
        whyItWorks: "At any instant, either A is 1 or A' is 1. The OR sum is always true; the AND product is always false.",
        example: "F = AB + C + C' simplifies to F = AB + 1 = 1",
        whenToApply: "Whenever complementary literal pairs are generated by expansion or factoring.",
        mistake: "Writing A + A' = 0 or A · A' = 1."
      },
      {
        number: 4,
        name: "Algebraic Factoring",
        pattern: "Two or more terms sharing one or more common literals",
        formula: "AB + AC = A(B + C)",
        whyItWorks: "First Distributive Law allows extracting common gating logic.",
        example: "F = ABC + ABD = AB(C + D)",
        whenToApply: "When common sub-expressions can isolate complementary pairs like (C + C') = 1.",
        mistake: "Over-factoring into nested brackets when a sum-of-products form is required."
      },
      {
        number: 5,
        name: "Absorption Law",
        pattern: "A shorter term appears inside a longer term joined by opposite operator",
        formula: "A + AB = A  and  A(A + B) = A",
        whyItWorks: "A + AB = A(1 + B) = A(1) = A. If A is 1, the output is 1 anyway. If A is 0, both terms are 0.",
        example: "F = X + XYZ = X",
        whenToApply: "Whenever a product term contains all the literals of an adjacent shorter term.",
        mistake: "Attempting to absorb when prime polarities differ (e.g. confusing A + A'B with A + AB)."
      },
      {
        number: 6,
        name: "Combining / Adjacency Law",
        pattern: "Two terms identical in all literals except one that appears primed in one and unprimed in the other",
        formula: "AB + AB' = A  and  (A + B)(A + B') = A",
        whyItWorks: "AB + AB' = A(B + B') = A(1) = A. The variable B has no physical effect on the output.",
        example: "F = WXYZ + WXYZ' = WXY(Z + Z') = WXY",
        whenToApply: "Primary basis of Karnaugh mapping; look for single-bit variations in minterms.",
        mistake: "Trying to combine terms that differ by more than one literal (e.g. AB + A'B' cannot combine to A)."
      },
      {
        number: 7,
        name: "Redundancy Law (Complementary Absorption)",
        pattern: "A standalone literal is ORed with a product term containing its complement",
        formula: "A + A'B = A + B  and  A(A' + B) = AB",
        whyItWorks: "By distributivity: A + A'B = (A + A')(A + B) = 1 · (A + B) = A + B.",
        example: "F = X' + XY = X' + Y",
        whenToApply: "Whenever a primed version of an outside literal appears inside an adjacent product term.",
        mistake: "Dropping the uncomplemented variable instead of the prime (writing A + A'B = A + A' instead of A + B)."
      },
      {
        number: 8,
        name: "De Morgan's Theorems",
        pattern: "A complement bar over an entire sum or product of terms",
        formula: "(A + B)' = A'B'  and  (AB)' = A' + B'",
        whyItWorks: "Duality between NAND/NOR logic: break the line, change the sign.",
        example: "F = [(A + B')' + C]' = (A'B + C)' = (A + B')C'",
        whenToApply: "At the start of multi-level expressions to clear inversion bars over parentheses.",
        mistake: "Distributing the prime without toggling operators (e.g. writing (A + B)' = A' + B')."
      },
      {
        number: 9,
        name: "Second Distributive Law (OR over AND)",
        pattern: "A literal added to a product of two terms",
        formula: "A + BC = (A + B)(A + C)",
        whyItWorks: "Unique to Boolean algebra; true because (A + B)(A + C) = AA + AC + BA + BC = A(1 + C + B) + BC = A + BC.",
        example: "F = X + Y'Z = (X + Y')(X + Z)",
        whenToApply: "Converting SOP into POS, or proving equivalence of factored expressions.",
        mistake: "Assuming ordinary arithmetic rules apply and failing to recognize this powerful identity."
      },
      {
        number: 10,
        name: "Consensus and Dual Consensus Theorems",
        pattern: "Three terms: AB + A'C + BC, where one variable appears primed in one term and unprimed in another",
        formula: "AB + A'C + BC = AB + A'C  and  (A + B)(A' + C)(B + C) = (A + B)(A' + C)",
        whyItWorks: "BC = BC(A + A') = ABC + A'BC. Term ABC is absorbed by AB; term A'BC is absorbed by A'C.",
        example: "F = XY + X'Z + YZ = XY + X'Z (YZ is the redundant consensus term)",
        whenToApply: "Eliminating hidden bridge terms that resist simple pairwise factoring.",
        mistake: "Dropping AB or A'C instead of the consensus term BC."
      }
    ]
  },

  // Tab 3: Worked Models Content (23 Core Models + 1 Challenge = 24 Total)
  workedModels: [
    // Level 1: Basic Models (B01 - B05)
    {
      id: "WM-B01",
      number: 1,
      level: "Basic",
      title: "Absorption Law 1",
      variables: ["A", "B"],
      techniques: ["Identity", "Distributive", "Domination"],
      originalExpression: "F = A + AB",
      steps: [
        { step: 1, expr: "F = A · 1 + AB", law: "Identity Law", reason: "Introduce identity element 1 to allow common literal factoring." },
        { step: 2, expr: "F = A(1 + B)", law: "Distributive Law", reason: "Factor out the common variable literal A." },
        { step: 3, expr: "F = A(1)", law: "Null / Domination Law", reason: "1 + B = 1 regardless of the binary state of B." },
        { step: 4, expr: "F = A", law: "Identity Law", reason: "A · 1 = A. The term AB is completely absorbed." }
      ],
      finalAnswer: "F = A",
      verification: "When A=0: 0 + 0·B = 0. When A=1: 1 + 1·B = 1. Matches A for all valuations.",
      pitfall: "Do not confuse A + AB with A + B. The literal A absorbs the entire product term AB."
    },
    {
      id: "WM-B02",
      number: 2,
      level: "Basic",
      title: "Combining / Adjacency Law",
      variables: ["A", "B"],
      techniques: ["Factoring", "Complement", "Identity"],
      originalExpression: "F = AB + AB'",
      steps: [
        { step: 1, expr: "F = A(B + B')", law: "Distributive Law (Factoring)", reason: "Factor out common literal A from both product terms." },
        { step: 2, expr: "F = A(1)", law: "Complement Law", reason: "B + B' = 1 (a variable ORed with its exact complement is logic 1)." },
        { step: 3, expr: "F = A", law: "Identity Law", reason: "A · 1 = A. Variable B has no physical effect on output F." }
      ],
      finalAnswer: "F = A",
      verification: "When A=0: 0 + 0 = 0. When A=1: B + B' = 1. Output equals A in all cases.",
      pitfall: "This is the mathematical basis of Karnaugh map cell pairing: two adjacent minterms eliminate the complemented literal."
    },
    {
      id: "WM-B03",
      number: 3,
      level: "Basic",
      title: "Dual Combining Law (POS Form)",
      variables: ["A", "B"],
      techniques: ["Second Distributive", "Complement", "Identity"],
      originalExpression: "F = (A + B)(A + B')",
      steps: [
        { step: 1, expr: "F = A + BB'", law: "Second Distributive Law (Reverse)", reason: "Apply x + yz = (x+y)(x+z) in reverse with x=A, y=B, z=B'." },
        { step: 2, expr: "F = A + 0", law: "Complement Law", reason: "BB' = 0 (a variable ANDed with its complement is logic 0)." },
        { step: 3, expr: "F = A", law: "Identity Law", reason: "A + 0 = A. Output reduces to the single literal A." }
      ],
      finalAnswer: "F = A",
      verification: "By Principle of Duality, since AB + AB' = A is true, its dual (A+B)(A+B') = A is universally true.",
      pitfall: "Expanding into 4 terms (AA + AB' + BA + BB') is valid but much slower than using the second distributive law."
    },
    {
      id: "WM-B04",
      number: 4,
      level: "Basic",
      title: "De Morgan's Complemented Sum",
      variables: ["A", "B"],
      techniques: ["De Morgan", "Involution"],
      originalExpression: "F = (A' + B')'",
      steps: [
        { step: 1, expr: "F = (A')' · (B')'", law: "De Morgan's Theorem", reason: "Break the complement bar: change OR (+) to AND (·) and invert literals." },
        { step: 2, expr: "F = A · B = AB", law: "Involution Law (Double Inversion)", reason: "(A')' = A and (B')' = B." }
      ],
      finalAnswer: "F = AB",
      verification: "Truth table: A=0,B=0 -> (1+1)'=0; A=0,B=1 -> (1+0)'=0; A=1,B=0 -> (0+1)'=0; A=1,B=1 -> (0+0)'=1. Exactly AB.",
      pitfall: "Do not write (A' + B')' = A + B (forgetting to change the operator from OR to AND)."
    },
    {
      id: "WM-B05",
      number: 5,
      level: "Basic",
      title: "Redundancy Law (Complementary Literal Elimination)",
      variables: ["A", "B"],
      techniques: ["Second Distributive", "Complement", "Identity"],
      originalExpression: "F = A + A'B",
      steps: [
        { step: 1, expr: "F = (A + A')(A + B)", law: "Second Distributive Law", reason: "Apply x + yz = (x+y)(x+z) where x=A, y=A', z=B." },
        { step: 2, expr: "F = (1)(A + B)", law: "Complement Law", reason: "A + A' = 1." },
        { step: 3, expr: "F = A + B", law: "Identity Law", reason: "1 · (A + B) = A + B. The complement prime on A' disappears." }
      ],
      finalAnswer: "F = A + B",
      verification: "Alternative method: A + A'B = A(1 + B) + A'B = A + AB + A'B = A + B(A + A') = A + B(1) = A + B.",
      pitfall: "Do not drop the unprimed A instead of the prime. The standalone variable A dominates; the prime vanishes."
    },

    // Level 2: Intermediate Models (I01 - I06)
    {
      id: "WM-I01",
      number: 6,
      level: "Intermediate",
      title: "Shared Literal Product Reduction",
      variables: ["A", "B"],
      techniques: ["Commutative", "Second Distributive", "Complement", "Identity"],
      originalExpression: "F = (A + B)(A' + B)",
      steps: [
        { step: 1, expr: "F = (B + A)(B + A')", law: "Commutative Law", reason: "Rearrange terms so the shared literal B appears first." },
        { step: 2, expr: "F = B + AA'", law: "Second Distributive Law (Reverse)", reason: "Factor using x + yz = (x+y)(x+z) with x=B, y=A, z=A'." },
        { step: 3, expr: "F = B + 0", law: "Complement Law", reason: "AA' = 0." },
        { step: 4, expr: "F = B", law: "Identity Law", reason: "B + 0 = B." }
      ],
      finalAnswer: "F = B",
      verification: "When B=0: (A+0)(A'+0) = AA' = 0. When B=1: (A+1)(A'+1) = (1)(1) = 1. Output equals B always.",
      pitfall: "Multiplying out into AA' + AB + A'B + BB = 0 + B(A+A') + B = B + B = B works, but factoring via distributivity is faster."
    },
    {
      id: "WM-I02",
      number: 7,
      level: "Intermediate",
      title: "Expansion Followed by Combining and Absorption",
      variables: ["A", "B", "C"],
      techniques: ["Distributive", "Commutative", "Combining", "Absorption"],
      originalExpression: "F = A(B + C) + AB'",
      steps: [
        { step: 1, expr: "F = AB + AC + AB'", law: "First Distributive Law", reason: "Expand the bracket A(B + C)." },
        { step: 2, expr: "F = (AB + AB') + AC", law: "Commutative & Associative", reason: "Regroup adjacent product terms containing B and B'." },
        { step: 3, expr: "F = A(B + B') + AC", law: "Distributive Law (Factoring)", reason: "Factor out common literal A." },
        { step: 4, expr: "F = A(1) + AC = A + AC", law: "Complement & Identity", reason: "B + B' = 1 and A · 1 = A." },
        { step: 5, expr: "F = A(1 + C)", law: "Distributive Law", reason: "Factor out literal A." },
        { step: 6, expr: "F = A(1) = A", law: "Null & Identity Laws", reason: "1 + C = 1 and A · 1 = A." }
      ],
      finalAnswer: "F = A",
      verification: "Rewrite as A(B + C + B') = A(1 + C) = A(1) = A. Direct one-line verification.",
      pitfall: "Do not stop at F = A + AC; literal A absorbs AC completely."
    },
    {
      id: "WM-I03",
      number: 8,
      level: "Intermediate",
      title: "Generalized De Morgan with Three Variables",
      variables: ["A", "B", "C"],
      techniques: ["Associative", "De Morgan"],
      originalExpression: "F = (A + B + C)'",
      steps: [
        { step: 1, expr: "F = [(A + B) + C]'", law: "Associative Law", reason: "Group the first two variables as a single composite term (A + B)." },
        { step: 2, expr: "F = (A + B)' · C'", law: "De Morgan's Theorem", reason: "Apply De Morgan to the outer sum: [X + C]' = X' · C'." },
        { step: 3, expr: "F = (A' · B') · C'", law: "De Morgan's Theorem", reason: "Apply De Morgan to the inner sum: (A + B)' = A'B'." },
        { step: 4, expr: "F = A'B'C'", law: "Associative Law", reason: "Remove parentheses for product of three literals." }
      ],
      finalAnswer: "F = A'B'C'",
      verification: "Truth table outputs 1 only when A=0, B=0, C=0. In all 7 other rows, output is 0. Identical to A'B'C'.",
      pitfall: "Never write (A + B + C)' = A' + B' + C'. Complementing an OR gate produces an AND gate with inverted inputs."
    },
    {
      id: "WM-I04",
      number: 9,
      level: "Intermediate",
      title: "De Morgan Expansion Yielding Equivalence (XNOR Pattern)",
      variables: ["A", "B"],
      techniques: ["De Morgan", "Commutative"],
      originalExpression: "F = (A + B)' + AB",
      steps: [
        { step: 1, expr: "F = A'B' + AB", law: "De Morgan's Theorem", reason: "Apply De Morgan to (A + B)' to obtain product term A'B'." },
        { step: 2, expr: "F = AB + A'B'", law: "Commutative Law", reason: "Standard canonical SOP ordering." }
      ],
      finalAnswer: "F = AB + A'B'",
      verification: "Outputs 1 when A=B=0 or A=B=1; outputs 0 when A!=B. This is the Equivalence / XNOR gate identity.",
      pitfall: "Do not attempt to factor A or B between AB and A'B'; they share no common literals."
    },
    {
      id: "WM-I05",
      number: 10,
      level: "Intermediate",
      title: "Consensus Theorem Derivation",
      variables: ["A", "B", "C"],
      techniques: ["Identity", "Complement", "Distributive", "Domination"],
      originalExpression: "F = AB + A'C + BC",
      steps: [
        { step: 1, expr: "F = AB + A'C + BC(1)", law: "Identity Law", reason: "Multiply the consensus term BC by logic 1." },
        { step: 2, expr: "F = AB + A'C + BC(A + A')", law: "Complement Law", reason: "Substitute 1 with (A + A') to introduce the missing variable A." },
        { step: 3, expr: "F = AB + A'C + ABC + A'BC", law: "Distributive Law", reason: "Multiply BC across the sum." },
        { step: 4, expr: "F = (AB + ABC) + (A'C + A'BC)", law: "Commutative & Associative", reason: "Rearrange to group terms with common factors." },
        { step: 5, expr: "F = AB(1 + C) + A'C(1 + B)", law: "Distributive Law (Factoring)", reason: "Factor out AB from first group and A'C from second group." },
        { step: 6, expr: "F = AB(1) + A'C(1)", law: "Null / Domination Law", reason: "1 + C = 1 and 1 + B = 1." },
        { step: 7, expr: "F = AB + A'C", law: "Identity Law", reason: "The third term BC is completely absorbed and redundant." }
      ],
      finalAnswer: "F = AB + A'C",
      verification: "Checked across all 8 truth table rows: column AB + A'C + BC matches column AB + A'C identically.",
      pitfall: "Do not discard AB or A'C; only the consensus term BC formed by the other two literals is redundant."
    },
    {
      id: "WM-I06",
      number: 11,
      level: "Intermediate",
      title: "Detailed Proof of Second Distributive Identity",
      variables: ["A", "B", "C"],
      techniques: ["Distributive", "Idempotent", "Commutative", "Factoring", "Domination"],
      originalExpression: "F = (A + B)(A + C)",
      steps: [
        { step: 1, expr: "F = A(A + C) + B(A + C)", law: "First Distributive Law", reason: "Distribute the term (A + B) across (A + C)." },
        { step: 2, expr: "F = AA + AC + BA + BC", law: "First Distributive Law", reason: "Multiply each individual literal across the sums." },
        { step: 3, expr: "F = A + AC + AB + BC", law: "Idempotent & Commutative", reason: "AA = A (Idempotent) and BA = AB (Commutative)." },
        { step: 4, expr: "F = A(1 + C + B) + BC", law: "Distributive Law (Factoring)", reason: "Factor out the common literal A from the first three terms." },
        { step: 5, expr: "F = A(1) + BC", law: "Null / Domination Law", reason: "1 + C + B = 1 (1 dominates any OR sum)." },
        { step: 6, expr: "F = A + BC", law: "Identity Law", reason: "A · 1 = A. This establishes that (A + B)(A + C) = A + BC." }
      ],
      finalAnswer: "F = A + BC",
      verification: "When A=1: (1+B)(1+C) = (1)(1) = 1; LHS: 1+BC = 1. When A=0: (0+B)(0+C) = BC; LHS: 0+BC = BC. Identical in all cases.",
      pitfall: "Students often forget this identity because it has no analog in ordinary algebra."
    },

    // Level 3: Advanced Models (ADV01 - ADV12)
    {
      id: "WM-ADV01",
      number: 12,
      level: "Advanced",
      title: "Long Three-Variable SOP Reduction",
      variables: ["A", "B", "C"],
      techniques: ["Grouping", "Combining", "Distributive", "Redundancy"],
      originalExpression: "F = A'B'C + A'BC + AB'C + ABC + AB'C' + ABC'",
      steps: [
        { step: 1, expr: "F = (A'B'C + A'BC + AB'C + ABC) + (AB'C' + ABC')", law: "Associative Law", reason: "Group the four terms ending in C and the two terms ending in C'." },
        { step: 2, expr: "F = C(A'B' + A'BC + AB' + AB) + AC'(B' + B)", law: "Distributive Law (Factoring)", reason: "Factor out common literal C from first group and AC' from second group." },
        { step: 3, expr: "F = C[A'(B' + B) + A(B' + B)] + AC'(1)", law: "Factoring & Complement", reason: "Group B + B' inside the brackets; B' + B = 1." },
        { step: 4, expr: "F = C[A'(1) + A(1)] + AC'", law: "Identity Law", reason: "Multiply by 1." },
        { step: 5, expr: "F = C(A' + A) + AC'", law: "Distributive Law", reason: "Factor out (B + B') = 1 leaving (A' + A)." },
        { step: 6, expr: "F = C(1) + AC' = C + AC'", law: "Complement & Identity", reason: "A' + A = 1 and C · 1 = C." },
        { step: 7, expr: "F = (C + A)(C + C')", law: "Second Distributive Law", reason: "Apply x + yz = (x+y)(x+z) with x=C, y=A, z=C'." },
        { step: 8, expr: "F = (C + A)(1)", law: "Complement Law", reason: "C + C' = 1." },
        { step: 9, expr: "F = A + C", law: "Identity & Commutative", reason: "Final simplified sum of single literals." }
      ],
      finalAnswer: "F = A + C",
      verification: "Evaluated across all 8 rows: F is 0 only on (0,0,0) and (0,1,0), which are exactly the rows where A=0 and C=0. F = A + C is exact.",
      pitfall: "Do not factor randomly; grouping minterms by shared 2-variable and 1-variable suffixes systematically exposes complements."
    },
    {
      id: "WM-ADV02",
      number: 13,
      level: "Advanced",
      title: "Product-of-Sums Reduction and Dual Consensus",
      variables: ["A", "B", "C"],
      techniques: ["Absorption (POS)", "Dual Consensus"],
      originalExpression: "F = (A + B)(A' + C)(B + C)(A + B + C)(A' + B + C)",
      steps: [
        { step: 1, expr: "F = [(A + B)(A + B + C)] · [(A' + C)(A' + B + C)] · (B + C)", law: "Associative & Commutative", reason: "Pair shorter sum terms with longer sum terms containing them." },
        { step: 2, expr: "(A + B)(A + B + C) = (A + B)", law: "Absorption Law (Dual Form)", reason: "Let X = (A + B); X(X + C) = X by dual absorption." },
        { step: 3, expr: "(A' + C)(A' + B + C) = (A' + C)", law: "Absorption Law (Dual Form)", reason: "Let Y = (A' + C); Y(Y + B) = Y by dual absorption." },
        { step: 4, expr: "F = (A + B)(A' + C)(B + C)", law: "Substitution", reason: "Substitute absorbed terms back into the master product." },
        { step: 5, expr: "F = (A + B)(A' + C)", law: "Dual Consensus Theorem", reason: "In (A + B)(A' + C)(B + C), variable A is complemented in one term and uncomplemented in another. The third term (B + C) is the redundant dual consensus." }
      ],
      finalAnswer: "F = (A + B)(A' + C)",
      verification: "Dual of AB + A'C + BC = AB + A'C. By duality, the consensus sum term (B + C) drops out cleanly.",
      pitfall: "Multiplying all 5 factors out into 32 terms is completely unmanageable. Recognize dual absorption and dual consensus directly."
    },
    {
      id: "WM-ADV03",
      number: 14,
      level: "Advanced",
      title: "Nested De Morgan and Redundancy Elimination",
      variables: ["A", "B", "C"],
      techniques: ["De Morgan", "Involution", "Distributive", "Consensus", "Redundancy"],
      originalExpression: "F = [(A + B')' + (A' + C')']' + AB + A'B",
      steps: [
        { step: 1, expr: "(A + B')' = A'(B')' = A'B", law: "De Morgan & Involution", reason: "Simplify first inner bracket." },
        { step: 2, expr: "(A' + C')' = (A')'(C')' = AC", law: "De Morgan & Involution", reason: "Simplify second inner bracket." },
        { step: 3, expr: "[(A + B')' + (A' + C')']' = [A'B + AC]'", law: "Substitution", reason: "Substitute simplified inner terms into outer bracket." },
        { step: 4, expr: "[A'B + AC]' = (A'B)' · (AC)'", law: "De Morgan's Theorem", reason: "Apply De Morgan to outer sum." },
        { step: 5, expr: "(A'B)' · (AC)' = (A + B')(A' + C')", law: "De Morgan & Involution", reason: "Invert each individual product term." },
        { step: 6, expr: "(A + B')(A' + C') = AA' + AC' + A'B' + B'C' = AC' + A'B' + B'C'", law: "Distributive & Complement", reason: "Multiply out; AA' = 0." },
        { step: 7, expr: "AC' + A'B' + B'C' = AC' + A'B'", law: "Consensus Theorem", reason: "Between AC' and A'B', the consensus term is B'C', which is redundant." },
        { step: 8, expr: "AB + A'B = B(A + A') = B(1) = B", law: "Factoring & Complement", reason: "Simplify trailing terms AB + A'B." },
        { step: 9, expr: "F = AC' + A'B' + B", law: "Substitution", reason: "Combine simplified bracket with trailing terms." },
        { step: 10, expr: "F = AC' + (B + A'B') = AC' + (B + A')", law: "Redundancy Law", reason: "B + A'B' reduces to B + A'." },
        { step: 11, expr: "F = (A' + AC') + B = (A' + C') + B", law: "Redundancy Law", reason: "A' + AC' reduces to A' + C'." },
        { step: 12, expr: "F = A' + B + C'", law: "Associative & Commutative", reason: "Standard canonical OR ordering." }
      ],
      finalAnswer: "F = A' + B + C'",
      verification: "Original expression evaluates to 1 in 7 out of 8 rows (all rows except A=1, B=0, C=1). In A' + B + C', output is 0 only when A=1, B=0, C=1. Exact match.",
      pitfall: "Follow a disciplined two-stage approach: resolve nested complements first, then reduce resulting sum terms."
    },
    {
      id: "WM-ADV04",
      number: 15,
      level: "Advanced",
      title: "Three-Variable Multilateral Reduction",
      variables: ["A", "B", "C"],
      techniques: ["Consensus", "Factoring", "Redundancy"],
      originalExpression: "F = AB + A'C + BC + A'B'C + AB'C + ABC'",
      steps: [
        { step: 1, expr: "F = (AB + A'C + BC) + A'B'C + AB'C + ABC'", law: "Associative Law", reason: "Isolate the first three terms as a classic consensus triplet." },
        { step: 2, expr: "F = AB + A'C + A'B'C + AB'C + ABC'", law: "Consensus Theorem", reason: "The term BC is redundant between AB and A'C." },
        { step: 3, expr: "F = AB + A'C(1 + B') + AB'C + ABC'", law: "Distributive Law", reason: "Group A'C and A'B'C." },
        { step: 4, expr: "F = AB + A'C(1) + AB'C + ABC' = AB + A'C + AB'C + ABC'", law: "Null & Identity", reason: "1 + B' = 1." },
        { step: 5, expr: "F = (AB + ABC') + A'C + AB'C", law: "Commutative & Associative", reason: "Group AB and ABC'." },
        { step: 6, expr: "F = AB(1 + C') + A'C + AB'C = AB + A'C + AB'C", law: "Null & Identity", reason: "1 + C' = 1." },
        { step: 7, expr: "F = AB + C(A' + AB')", law: "Distributive Law (Factoring)", reason: "Factor out literal C from A'C and AB'C." },
        { step: 8, expr: "F = AB + C(A' + B')", law: "Redundancy Law", reason: "A' + AB' reduces to A' + B'." },
        { step: 9, expr: "F = AB + C(AB)'", law: "De Morgan's Theorem", reason: "A' + B' = (AB)'." },
        { step: 10, expr: "F = AB + C", law: "Redundancy Law", reason: "Let X = AB; X + C · X' = X + C = AB + C." },
        { step: 11, expr: "F = C + AB", law: "Commutative Law", reason: "Standard simplified expression." }
      ],
      finalAnswer: "F = C + AB",
      verification: "Truth table shows output is 1 whenever C=1, or when A=1 and B=1. Exactly C + AB.",
      pitfall: "Do not miss the composite redundancy step: X + X'C = X + C where X is the product term AB."
    },
    {
      id: "WM-ADV05",
      number: 16,
      level: "Advanced",
      title: "Four-Variable Long SOP Reduction (Featured Model)",
      variables: ["A", "B", "C", "D"],
      techniques: ["Suffix Factoring", "Complement Elimination", "Prefix Grouping", "Redundancy"],
      originalExpression: "F = A'B'CD + A'BCD + AB'CD + ABCD + ABC'D + AB'C'D",
      steps: [
        { step: 1, expr: "F = (A'B'CD + A'BCD + AB'CD + ABCD) + (ABC'D + AB'C'D)", law: "Associative Law", reason: "Partition the six terms into four terms ending in CD and two terms ending in C'D." },
        { step: 2, expr: "F = CD(A'B' + A'B + AB' + AB) + AC'D(B + B')", law: "First Distributive Law", reason: "Factor out common product CD from the first group and AC'D from the second group." },
        { step: 3, expr: "F = CD[A'(B' + B) + A(B' + B)] + AC'D(1)", law: "Factoring & Complement", reason: "Factor out A' and A in the first group; B + B' = 1." },
        { step: 4, expr: "F = CD[A'(1) + A(1)] + AC'D", law: "Identity Law", reason: "Substitute B' + B = 1 into each subgroup." },
        { step: 5, expr: "F = CD(A' + A) + AC'D", law: "Distributive Law (Factoring)", reason: "Factor (B + B') = 1 leaving (A' + A)." },
        { step: 6, expr: "F = CD(1) + AC'D = CD + AC'D", law: "Complement & Identity", reason: "A' + A = 1 and CD · 1 = CD." },
        { step: 7, expr: "F = D(C + AC')", law: "First Distributive Law", reason: "Factor out common variable literal D." },
        { step: 8, expr: "F = D[(C + A)(C + C')]", law: "Second Distributive Law", reason: "Apply x + yz = (x+y)(x+z) with x=C, y=A, z=C'." },
        { step: 9, expr: "F = D[(C + A)(1)]", law: "Complement Law", reason: "C + C' = 1." },
        { step: 10, expr: "F = D(A + C)", law: "Identity & Commutative", reason: "Final simplified factored expression." }
      ],
      finalAnswer: "F = D(A + C)",
      verification: "Evaluated across all 16 rows: F produces logic 1 only when D=1 AND (A=1 or C=1). In all other valuations, F=0. Matches D(A + C) exactly.",
      pitfall: "Do not expand brackets unnecessarily. Suffix factoring immediately collapses 4 minterms into a single 2-literal term CD."
    },
    {
      id: "WM-ADV06",
      number: 17,
      level: "Advanced",
      title: "Four-Variable Reduction with Repeated Complementary Patterns",
      variables: ["A", "B", "C", "D"],
      techniques: ["Global Factoring", "Partitioning", "Combining", "Redundancy"],
      originalExpression: "F = A'BCD + ABCD + AB'CD + ABC'D + A'B'CD + A'BC'D",
      steps: [
        { step: 1, expr: "F = D[A'BC + ABC + AB'C + ABC' + A'B'C + A'BC']", law: "Distributive Law", reason: "Notice all six terms contain the literal D; factor it globally." },
        { step: 2, expr: "F = D[(A'BC + ABC + AB'C + A'B'C) + (ABC' + A'BC')]", law: "Associative & Commutative", reason: "Inside the bracket, partition into four terms with C and two terms with C'." },
        { step: 3, expr: "F = D[C(A'B + AB + AB' + A'B') + BC'(A + A')]", law: "Distributive Law (Factoring)", reason: "Factor C from the first subgroup and BC' from the second subgroup." },
        { step: 4, expr: "F = D[C((A'+A)B + (A'+A)B') + BC'(1)]", law: "Factoring & Complement", reason: "Factor out (A' + A) = 1 in both branches." },
        { step: 5, expr: "F = D[C(1 · B + 1 · B') + BC'] = D[C(B + B') + BC']", law: "Identity Law", reason: "Simplify inside brackets." },
        { step: 6, expr: "F = D[C(1) + BC'] = D[C + BC']", law: "Complement & Identity", reason: "B + B' = 1 and C · 1 = C." },
        { step: 7, expr: "F = D[(C + B)(C + C')]", law: "Second Distributive Law", reason: "Apply x + yz = (x+y)(x+z) to C + BC'." },
        { step: 8, expr: "F = D[(B + C)(1)]", law: "Complement & Commutative", reason: "C + C' = 1." },
        { step: 9, expr: "F = D(B + C)", law: "Identity Law", reason: "Final simplified factored expression." }
      ],
      finalAnswer: "F = D(B + C)",
      verification: "SOP expansion is BD + CD. Evaluated across 16 rows: exactly matches original expression.",
      pitfall: "Factoring the global variable D as step 1 reduces a 4-variable problem into a 3-variable sub-problem."
    },
    {
      id: "WM-ADV07",
      number: 18,
      level: "Advanced",
      title: "Four-Variable Mixed SOP/POS Algebra",
      variables: ["A", "B", "C", "D"],
      techniques: ["Dual Combining", "Absorption", "Redundancy"],
      originalExpression: "F = (A + B)(A + B')(C + D)(C + D') + A'BC + AB'D + ACD",
      steps: [
        { step: 1, expr: "(A + B)(A + B') = A + BB' = A + 0 = A", law: "Second Distributive & Complement", reason: "Simplify first pair of sum factors." },
        { step: 2, expr: "(C + D)(C + D') = C + DD' = C + 0 = C", law: "Second Distributive & Complement", reason: "Simplify second pair of sum factors." },
        { step: 3, expr: "F = AC + A'BC + AB'D + ACD", law: "Substitution", reason: "Product of the four factors reduces to AC." },
        { step: 4, expr: "F = (AC + ACD) + A'BC + AB'D", law: "Commutative & Associative", reason: "Regroup terms containing AC." },
        { step: 5, expr: "AC + ACD = AC(1 + D) = AC(1) = AC", law: "Absorption Law", reason: "The product AC absorbs ACD." },
        { step: 6, expr: "F = AC + A'BC + AB'D", law: "Substitution", reason: "Substitute absorbed term back." },
        { step: 7, expr: "F = C(A + A'B) + AB'D", law: "Distributive Law (Factoring)", reason: "Factor literal C from AC and A'BC." },
        { step: 8, expr: "F = C(A + B) + AB'D", law: "Redundancy Law", reason: "A + A'B simplifies to A + B." },
        { step: 9, expr: "F = AC + BC + AB'D", law: "First Distributive Law", reason: "Expand into standard simplified sum-of-products form." }
      ],
      finalAnswer: "F = AC + BC + AB'D",
      verification: "Evaluated across all 16 rows: the two expressions match identically. Total literal count drops from 17 to 7.",
      pitfall: "Do not expand (A+B)(A+B')(C+D)(C+D') by multiplying all four factors; recognize that (X+Y)(X+Y') = X immediately."
    },
    {
      id: "WM-ADV08",
      number: 19,
      level: "Advanced",
      title: "Four-Variable Nested Complement Reduction",
      variables: ["A", "B", "C", "D"],
      techniques: ["De Morgan", "Involution", "Redundancy"],
      originalExpression: "F = [(A + B')' + (C + D')']' + AB + C'D",
      steps: [
        { step: 1, expr: "(A + B')' = A'(B')' = A'B", law: "De Morgan & Involution", reason: "Simplify first inner term." },
        { step: 2, expr: "(C + D')' = C'(D')' = C'D", law: "De Morgan & Involution", reason: "Simplify second inner term." },
        { step: 3, expr: "[(A + B')' + (C + D')']' = [A'B + C'D]'", law: "Substitution", reason: "Substitute inner terms into outer bracket." },
        { step: 4, expr: "Let U = A'B and V = C'D; then F = (U + V)' + AB + V", law: "Algebraic Substitution", reason: "Observe that C'D is identical to V." },
        { step: 5, expr: "(U + V)' + V = (U'V') + V = V + U'V' = V + U'", law: "Redundancy Law", reason: "V + U'V' reduces directly to V + U'." },
        { step: 6, expr: "F = V + U' + AB = C'D + (A'B)' + AB", law: "Back-Substitution", reason: "Substitute U = A'B and V = C'D." },
        { step: 7, expr: "(A'B)' = A + B'", law: "De Morgan & Involution", reason: "(A'B)' = (A')' + B' = A + B'." },
        { step: 8, expr: "F = C'D + (A + B') + AB", law: "Substitution", reason: "Insert expanded U'." },
        { step: 9, expr: "A + B' + AB = (A + AB) + B' = A + B'", law: "Absorption Law", reason: "A absorbs AB." },
        { step: 10, expr: "F = A + B' + C'D", law: "Commutative Law", reason: "Standard simplified expression." }
      ],
      finalAnswer: "F = A + B' + C'D",
      verification: "Tested across all 16 valuations: exact equivalence confirmed.",
      pitfall: "Using algebraic substitution (letting U = A'B, V = C'D) prevents massive algebraic expansion errors."
    },
    {
      id: "WM-ADV09",
      number: 20,
      level: "Advanced",
      title: "Four-Variable Complemented-Factor with Consensus Traps",
      variables: ["A", "B", "C", "D"],
      techniques: ["De Morgan", "Distributive", "Absorption", "Consensus"],
      originalExpression: "F = [(A' + B)' + (C + D')']' + A'B'C + ABD",
      steps: [
        { step: 1, expr: "(A' + B)' = (A')'B' = AB'", law: "De Morgan & Involution", reason: "Simplify first inner term." },
        { step: 2, expr: "(C + D')' = C'(D')' = C'D", law: "De Morgan & Involution", reason: "Simplify second inner term." },
        { step: 3, expr: "[AB' + C'D]' = (AB')' · (C'D)'", law: "De Morgan's Theorem", reason: "Apply De Morgan to outer bracket." },
        { step: 4, expr: "(AB')'(C'D)' = (A' + B)(C + D')", law: "De Morgan & Involution", reason: "Expand inverted product factors." },
        { step: 5, expr: "(A' + B)(C + D') = A'C + A'D' + BC + BD'", law: "First Distributive Law", reason: "Multiply out factors." },
        { step: 6, expr: "F = A'C + A'D' + BC + BD' + A'B'C + ABD", law: "Substitution", reason: "Combine expanded bracket with trailing terms." },
        { step: 7, expr: "A'C + A'B'C = A'C(1 + B') = A'C(1) = A'C", law: "Absorption Law", reason: "A'C absorbs A'B'C." },
        { step: 8, expr: "BD' + ABD = D'(B + ABD) -> factor B: B(D' + AD) = B(D' + A) = BD' + AB", law: "Redundancy Law", reason: "B(D' + AD) reduces to B(D' + A) = BD' + AB." },
        { step: 9, expr: "F = A'C + A'D' + BC + BD' + AB", law: "Substitution", reason: "Expression after redundancy expansion." },
        { step: 10, expr: "Between AB and A'C, the consensus term is BC; therefore BC is redundant.", law: "Consensus Theorem", reason: "AB + A'C + BC = AB + A'C. Drop BC." },
        { step: 11, expr: "Between AB and A'D', the consensus term is BD'; therefore BD' is redundant.", law: "Consensus Theorem", reason: "AB + A'D' + BD' = AB + A'D'. Drop BD'." },
        { step: 12, expr: "F = AB + A'C + A'D'", law: "Commutative Law", reason: "Final simplified sum-of-products expression." }
      ],
      finalAnswer: "F = AB + A'C + A'D'",
      verification: "Evaluated across all 16 rows: matches original expression in every single row.",
      pitfall: "Notice the double consensus trap: both BC and BD' are consensus terms generated by AB and the primed terms A'C and A'D'."
    },
    {
      id: "WM-ADV10",
      number: 21,
      level: "Advanced",
      title: "Advanced Mixed-Form Simplification (Long Multi-Step Model)",
      variables: ["A", "B", "C", "D"],
      techniques: ["De Morgan", "Distributive", "Complement", "Combining", "Absorption"],
      originalExpression: "F = [(AB + C'D)' + (A + B')']' + ABC + A'C'D",
      steps: [
        { step: 1, expr: "(A + B')' = A'(B')' = A'B", law: "De Morgan & Involution", reason: "Simplify second inner term in bracket." },
        { step: 2, expr: "[(AB + C'D)' + A'B]'", law: "Substitution", reason: "Outer bracket is now in form [X' + Y]'." },
        { step: 3, expr: "[(AB + C'D)' + A'B]' = [(AB + C'D)']' · (A'B)'", law: "De Morgan's Theorem", reason: "Apply De Morgan to the outer sum: [X + Y]' = X' · Y'." },
        { step: 4, expr: "[(AB + C'D)']' = AB + C'D  and  (A'B)' = (A')' + B' = A + B'", law: "Involution & De Morgan", reason: "Double inversion restores (AB + C'D); invert A'B." },
        { step: 5, expr: "(AB + C'D)(A + B') = AB(A + B') + C'D(A + B')", law: "First Distributive Law", reason: "Distribute the product." },
        { step: 6, expr: "AB(A + B') = ABA + ABB' = AB + 0 = AB", law: "Idempotent & Complement", reason: "AA = A and BB' = 0." },
        { step: 7, expr: "C'D(A + B') = AC'D + B'C'D", law: "First Distributive Law", reason: "Expand second product." },
        { step: 8, expr: "Bracket = AB + AC'D + B'C'D", law: "Combining Results", reason: "Sum of terms from the bracket simplification." },
        { step: 9, expr: "F = (AB + AC'D + B'C'D) + ABC + A'C'D", law: "Substitution", reason: "Reintroduce trailing terms ABC and A'C'D." },
        { step: 10, expr: "AB + ABC = AB(1 + C) = AB(1) = AB", law: "Absorption Law", reason: "AB absorbs ABC." },
        { step: 11, expr: "AC'D + A'C'D = C'D(A + A') = C'D(1) = C'D", law: "Combining Law", reason: "AC'D and A'C'D combine to eliminate variable A." },
        { step: 12, expr: "F = AB + C'D + B'C'D", law: "Substitution", reason: "Remaining terms after combining and absorption." },
        { step: 13, expr: "C'D + B'C'D = C'D(1 + B') = C'D(1) = C'D", law: "Absorption Law", reason: "The term C'D absorbs B'C'D." },
        { step: 14, expr: "F = AB + C'D", law: "Final Reduction", reason: "Final minimal sum of two product terms." }
      ],
      finalAnswer: "F = AB + C'D",
      verification: "Tested across all 16 valuations: F = AB + C'D matches original function with 100% precision. Gate count drops from 8 gates to 3 gates.",
      pitfall: "Patience and systematic step numbering are essential: breaking the problem into bracket reduction followed by suffix combining avoids algebraic chaos."
    },
    {
      id: "WM-ADV11",
      number: 22,
      level: "Advanced",
      title: "Four-Variable Regrouping and Consensus Structure",
      variables: ["A", "B", "C", "D"],
      techniques: ["Distributive (Factoring)", "Complement", "Combining"],
      originalExpression: "F = A'B(C + D) + AB(C + D) + B'CD + BCD",
      steps: [
        { step: 1, expr: "F = [A'B(C + D) + AB(C + D)] + [B'CD + BCD]", law: "Associative Law", reason: "Partition into two natural pairs." },
        { step: 2, expr: "A'B(C + D) + AB(C + D) = B(C + D)(A' + A)", law: "Distributive Law (Factoring)", reason: "Factor common block B(C + D)." },
        { step: 3, expr: "B(C + D)(A' + A) = B(C + D)(1) = BC + BD", law: "Complement & Distributive", reason: "A' + A = 1; distribute B over (C + D)." },
        { step: 4, expr: "B'CD + BCD = CD(B' + B) = CD(1) = CD", law: "Factoring & Complement", reason: "Factor CD from second pair; B' + B = 1." },
        { step: 5, expr: "F = BC + BD + CD", law: "Combining Results", reason: "Final simplified three-term sum." }
      ],
      finalAnswer: "F = BC + BD + CD",
      verification: "Notice this is the 3-variable majority voting function of B, C, and D. Input A has zero physical effect.",
      pitfall: "Do not expand A'B(C+D) into A'BC + A'BD before noticing that the entire block B(C+D) is shared."
    },
    {
      id: "WM-ADV12",
      number: 23,
      level: "Advanced",
      title: "Four-Variable Complemented POS and Product-Term Reduction",
      variables: ["A", "B", "C", "D"],
      techniques: ["De Morgan", "Involution", "Redundancy"],
      originalExpression: "F = [(A + B)(C' + D)]' + AC'D + BC'D",
      steps: [
        { step: 1, expr: "AC'D + BC'D = (A + B)C'D", law: "Distributive Law (Factoring)", reason: "Factor out common product C'D from trailing terms." },
        { step: 2, expr: "Let U = (A + B) and V = (C' + D)", law: "Algebraic Substitution", reason: "Notice trailing factor is U · C'D." },
        { step: 3, expr: "[(A + B)(C' + D)]' = [U · V]' = U' + V'", law: "De Morgan's Theorem", reason: "Apply De Morgan to product term." },
        { step: 4, expr: "V' = (C' + D)' = (C')' · D' = CD'", law: "De Morgan & Involution", reason: "Invert factor V." },
        { step: 5, expr: "F = U' + CD' + U · C'D", law: "Substitution", reason: "Reassemble expression." },
        { step: 6, expr: "U' + U · C'D = U' + C'D", law: "Redundancy Law", reason: "Apply X' + XY = X' + Y with X = U and Y = C'D." },
        { step: 7, expr: "F = U' + CD' + C'D", law: "Substitution", reason: "Combine with remaining CD' term." },
        { step: 8, expr: "U' = (A + B)' = A'B'", law: "De Morgan's Theorem", reason: "Back-substitute U = A + B." },
        { step: 9, expr: "F = CD' + C'D + A'B'", law: "Commutative Law", reason: "Final simplified expression." }
      ],
      finalAnswer: "F = CD' + C'D + A'B'",
      verification: "Evaluated across all 16 input valuations: exact equivalence confirmed. Note that CD' + C'D is C XOR D.",
      pitfall: "Factor trailing terms before expanding the leading De Morgan bracket."
    },

    // Level 4: Optional Five-Variable Challenge (CH01)
    {
      id: "WM-CH01",
      number: 24,
      level: "Challenge",
      title: "Five-Variable Quad-Minterm Algebraic Collapse",
      variables: ["A", "B", "C", "D", "E"],
      techniques: ["Global Factoring", "Partitioning", "Complement Elimination"],
      originalExpression: "F = AB'CDE + ABCDE + AB'C'DE + ABC'DE",
      steps: [
        { step: 1, expr: "F = ADE(B'C + BC + B'C' + BC')", law: "First Distributive Law", reason: "Notice all four terms contain the product ADE; factor it globally." },
        { step: 2, expr: "F = ADE[(B'C + BC) + (B'C' + BC')]", law: "Associative Law", reason: "Group the four 2-variable terms inside the bracket into two pairs." },
        { step: 3, expr: "B'C + BC = C(B' + B) = C(1) = C", law: "Factoring & Complement", reason: "Factor C from the first pair; B' + B = 1." },
        { step: 4, expr: "B'C' + BC' = C'(B' + B) = C'(1) = C'", law: "Factoring & Complement", reason: "Factor C' from the second pair; B' + B = 1." },
        { step: 5, expr: "F = ADE[C + C']", law: "Substitution", reason: "Insert simplified pairs back into bracket." },
        { step: 6, expr: "F = ADE(1) = ADE", law: "Complement & Identity", reason: "C + C' = 1 and ADE · 1 = ADE." }
      ],
      finalAnswer: "F = ADE",
      verification: "Verified across all 32 input combinations (2^5 = 32): F is 1 if and only if A=1, D=1, and E=1 simultaneously. Variables B and C are completely redundant.",
      pitfall: "This is an enrichment model illustrating how complementary literal pairs span and eliminate entire 2-variable coordinate planes."
    }
  ],

  // Tab 4: Cheat Sheet & Shortcuts Content
  cheatSheet: {
    title: "Boolean Simplification Strategy Sheet",
    description: "Operational decision guide, pattern-recognition rules, factoring shortcuts, and pre-flight checklists for rapid exam and laboratory problem solving.",

    orLawsTable: [
      { name: "Identity", formula: "A + 0 = A", meaning: "0 adds no assertion; drop it" },
      { name: "Null / Domination", formula: "A + 1 = 1", meaning: "1 forces output to 1 unconditionally" },
      { name: "Idempotent", formula: "A + A = A", meaning: "Duplicate terms are redundant" },
      { name: "Complement", formula: "A + A' = 1", meaning: "Complementary literals span binary universe" }
    ],

    andLawsTable: [
      { name: "Identity", formula: "A · 1 = A", meaning: "1 preserves variable; drop it" },
      { name: "Null / Domination", formula: "A · 0 = 0", meaning: "0 forces output to 0 unconditionally" },
      { name: "Idempotent", formula: "A · A = A", meaning: "Duplicate factors are redundant" },
      { name: "Complement", formula: "A · A' = 0", meaning: "Contradictory factors collapse term to 0" }
    ],

    patternRecognition: [
      { trigger: "A + A'", law: "Complement Law", result: "1", note: "Look for variable ORed with its prime" },
      { trigger: "A · A'", law: "Complement Law", result: "0", note: "Look for variable ANDed with its prime" },
      { trigger: "A + AB", law: "Absorption Law", result: "A", note: "Shorter literal absorbs longer product" },
      { trigger: "A(A + B)", law: "Absorption Law (Dual)", result: "A", note: "Shorter literal absorbs longer sum" },
      { trigger: "AB + AB'", law: "Combining Law", result: "A", note: "Single primed literal difference eliminates that variable" },
      { trigger: "A + A'B", law: "Redundancy Law", result: "A + B", note: "Prime on second term drops away" },
      { trigger: "A(A' + B)", law: "Redundancy Law (Dual)", result: "AB", note: "Prime disappears, leaving AB" },
      { trigger: "(A + B)'", law: "De Morgan 1", result: "A'B'", note: "Break the bar, change + to ·" },
      { trigger: "(AB)'", law: "De Morgan 2", result: "A' + B'", note: "Break the bar, change · to +" },
      { trigger: "AB + A'C + BC", law: "Consensus Theorem", result: "AB + A'C", note: "Third term BC is redundant consensus" },
      { trigger: "(A+B)(A'+C)(B+C)", law: "Dual Consensus", result: "(A+B)(A'+C)", note: "Third sum factor (B+C) is redundant" }
    ],

    precedenceHierarchy: [
      { rank: 1, operator: "Parentheses ( )", rule: "Innermost brackets evaluated first" },
      { rank: 2, operator: "NOT ( Inversion ' )", rule: "Complements over variables or sub-expressions" },
      { rank: 3, operator: "AND ( · Product )", rule: "Implicit or explicit conjunction precedes OR" },
      { rank: 4, operator: "OR ( + Sum )", rule: "Evaluated last unless enclosed in parentheses" }
    ],

    factoringShortcuts: [
      { name: "Common Suffix/Prefix Factoring", form: "AX + AY = A(X + Y)", tip: "Isolate common variables to create complement opportunities like (X + X') = 1" },
      { name: "Adjacency Pairing", form: "WXY + WXY' = WX", tip: "Whenever two terms differ in only one literal's polarity, that literal drops" },
      { name: "Second Distributive Expansion", form: "X + YZ = (X + Y)(X + Z)", tip: "Extremely useful in reverse: (A + B)(A + C) = A + BC" },
      { name: "Consensus Drop", form: "Identify A, A', and their companions B, C", tip: "If BC appears alongside AB and A'C, immediately strike out BC" }
    ],

    decisionGuide: [
      { step: "Step 1", condition: "Are there complement bars over multi-literal expressions?", action: "Apply De Morgan's theorems to push inversions down to individual literals." },
      { step: "Step 2", condition: "Are there constants 0 or 1, or duplicate terms/literals?", action: "Apply Identity, Null, and Idempotent laws to clean up trivial operations." },
      { step: "Step 3", condition: "Do two terms share a common factor with complementary remaining literals?", action: "Apply the Combining Law: AB + AB' = A(B + B') = A." },
      { step: "Step 4", condition: "Does a standalone literal appear alongside its complement in a product?", action: "Apply the Redundancy Law: A + A'B = A + B." },
      { step: "Step 5", condition: "Are there three terms matching AB + A'C + BC?", action: "Apply the Consensus Theorem to eliminate the third term BC." },
      { step: "Step 6", condition: "Are there common factors across three or more terms?", action: "Factor out the greatest common literal block and test if remaining terms reduce." }
    ],

    simplificationChecklist: [
      "Have I preserved mathematical equivalence at every transformation step?",
      "Have I verified operator precedence before distributing or factoring?",
      "Have all complementary pairs (A + A' = 1 and AA' = 0) been resolved?",
      "Have all redundant terms (via Absorption, Redundancy, or Consensus) been identified?",
      "Have I tested whether the resulting expression can be factored further?",
      "Have I checked my final expression against the original truth table for at least 2 key input valuations?",
      "Is the final result in the requested form (SOP vs POS vs factored)?"
    ]
  },

  // Tab 5: Practice Lab Content (24 Validated Practice Problems)
  practiceLab: [
    // Basic (P01 - P04)
    {
      id: "P01",
      number: 1,
      difficulty: "Basic",
      variables: ["A", "B"],
      problem: "F = (A + A')B",
      techniques: ["Complement", "Identity"],
      hint1: "Look at the expression inside the parentheses: what does A + A' equal?",
      hint2: "Recall the Complement Law: A + A' = 1. What is 1 · B?",
      solutionSteps: [
        { step: 1, expr: "F = (1)B", law: "Complement Law", reason: "A + A' = 1 (a variable ORed with its complement is logic 1)." },
        { step: 2, expr: "F = B", law: "Identity Law", reason: "1 · B = B (ANDing with 1 preserves the variable)." }
      ],
      finalAnswer: "F = B",
      keyTakeaway: "Parentheses containing a variable and its complement collapse immediately to 1."
    },
    {
      id: "P02",
      number: 2,
      difficulty: "Basic",
      variables: ["A", "B"],
      problem: "F = AB + A'B",
      techniques: ["Factoring", "Complement", "Identity"],
      hint1: "Notice which variable literal appears in both product terms.",
      hint2: "Factor out literal B: B(A + A'). Then apply the complement law.",
      solutionSteps: [
        { step: 1, expr: "F = B(A + A')", law: "Distributive Law (Factoring)", reason: "Factor out common literal B." },
        { step: 2, expr: "F = B(1)", law: "Complement Law", reason: "A + A' = 1." },
        { step: 3, expr: "F = B", law: "Identity Law", reason: "B · 1 = B." }
      ],
      finalAnswer: "F = B",
      keyTakeaway: "When two terms are identical except for one variable that appears primed in one and unprimed in another, that variable drops out."
    },
    {
      id: "P03",
      number: 3,
      difficulty: "Basic",
      variables: ["A", "B"],
      problem: "F = (A + B)'",
      techniques: ["De Morgan"],
      hint1: "Recall the rule: 'Break the bar, change the sign.'",
      hint2: "Change OR (+) to AND (·) and invert each individual literal.",
      solutionSteps: [
        { step: 1, expr: "F = A' · B' = A'B'", law: "De Morgan's Theorem", reason: "The complement of an OR sum equals the product of the individual complements." }
      ],
      finalAnswer: "F = A'B'",
      keyTakeaway: "A NOR gate is logically equivalent to an AND gate with inverted inputs."
    },
    {
      id: "P04",
      number: 4,
      difficulty: "Basic",
      variables: ["A", "B"],
      problem: "F = AB' + AB",
      techniques: ["Factoring", "Complement", "Identity"],
      hint1: "Factor out common literal A.",
      hint2: "Apply the Complement Law B' + B = 1, then Identity Law.",
      solutionSteps: [
        { step: 1, expr: "F = A(B' + B)", law: "Distributive Law (Factoring)", reason: "Factor out literal A." },
        { step: 2, expr: "F = A(1)", law: "Complement Law", reason: "B' + B = 1." },
        { step: 3, expr: "F = A", law: "Identity Law", reason: "A · 1 = A." }
      ],
      finalAnswer: "F = A",
      keyTakeaway: "Combining adjacent minterms eliminates the varying variable B."
    },

    // Intermediate (P05 - P12)
    {
      id: "P05",
      number: 5,
      difficulty: "Intermediate",
      variables: ["A", "B", "C"],
      problem: "F = (A + B)(A + C)",
      techniques: ["Second Distributive"],
      hint1: "Look at the shared literal A in both sum factors.",
      hint2: "Apply the second distributive identity: (X + Y)(X + Z) = X + YZ.",
      solutionSteps: [
        { step: 1, expr: "F = AA + AC + BA + BC", law: "First Distributive Law", reason: "Expand the product of two sums." },
        { step: 2, expr: "F = A + AC + AB + BC", law: "Idempotent Law", reason: "AA = A." },
        { step: 3, expr: "F = A(1 + C + B) + BC", law: "Factoring", reason: "Factor out literal A from the first three terms." },
        { step: 4, expr: "F = A(1) + BC = A + BC", law: "Null & Identity", reason: "1 + C + B = 1 and A · 1 = A." }
      ],
      finalAnswer: "F = A + BC",
      keyTakeaway: "Memorize (A + B)(A + C) = A + BC. It is one of the most frequently used shortcuts in digital design."
    },
    {
      id: "P06",
      number: 6,
      difficulty: "Intermediate",
      variables: ["A", "B", "C"],
      problem: "F = A + A'BC",
      techniques: ["Redundancy"],
      hint1: "Treat the product BC as a single composite variable X.",
      hint2: "Apply the redundancy identity: A + A'X = A + X.",
      solutionSteps: [
        { step: 1, expr: "F = (A + A')(A + BC)", law: "Second Distributive Law", reason: "Apply x + yz = (x+y)(x+z) with x=A, y=A', z=BC." },
        { step: 2, expr: "F = (1)(A + BC)", law: "Complement Law", reason: "A + A' = 1." },
        { step: 3, expr: "F = A + BC", law: "Identity Law", reason: "1 · (A + BC) = A + BC." }
      ],
      finalAnswer: "F = A + BC",
      keyTakeaway: "Redundancy law applies equally when the companion term is a multi-literal product like BC."
    },
    {
      id: "P07",
      number: 7,
      difficulty: "Intermediate",
      variables: ["A", "B", "C"],
      problem: "F = (A + B + C)(A + B + C')",
      techniques: ["Dual Combining"],
      hint1: "Let X = (A + B). What is (X + C)(X + C')?",
      hint2: "Apply (X + C)(X + C') = X + CC' = X + 0 = X.",
      solutionSteps: [
        { step: 1, expr: "Let X = A + B; then F = (X + C)(X + C')", law: "Substitution", reason: "Treat (A + B) as a single composite term." },
        { step: 2, expr: "F = X + CC'", law: "Second Distributive Law", reason: "Apply (x+y)(x+z) = x + yz." },
        { step: 3, expr: "F = X + 0 = X", law: "Complement & Identity", reason: "CC' = 0 and X + 0 = X." },
        { step: 4, expr: "F = A + B", law: "Back-Substitution", reason: "Replace X with A + B." }
      ],
      finalAnswer: "F = A + B",
      keyTakeaway: "Dual combining collapses two 3-variable sum terms into a single 2-variable sum term."
    },
    {
      id: "P08",
      number: 8,
      difficulty: "Intermediate",
      variables: ["A", "B"],
      problem: "F = (A + B')(A' + B')",
      techniques: ["Commutative", "Second Distributive", "Complement"],
      hint1: "Notice the shared literal B' in both factors.",
      hint2: "Commute to (B' + A)(B' + A') and apply the second distributive law.",
      solutionSteps: [
        { step: 1, expr: "F = (B' + A)(B' + A')", law: "Commutative Law", reason: "Rearrange so shared literal B' is first." },
        { step: 2, expr: "F = B' + AA'", law: "Second Distributive Law", reason: "Apply (x+y)(x+z) = x + yz with x=B', y=A, z=A'." },
        { step: 3, expr: "F = B' + 0 = B'", law: "Complement & Identity", reason: "AA' = 0 and B' + 0 = B'." }
      ],
      finalAnswer: "F = B'",
      keyTakeaway: "When both factors contain the same literal B' alongside complementary literals A and A', output is B'."
    },
    {
      id: "P09",
      number: 9,
      difficulty: "Intermediate",
      variables: ["A", "B", "C", "D"],
      problem: "F = (AB + CD)'",
      techniques: ["De Morgan"],
      hint1: "Treat AB as X and CD as Y. Apply (X + Y)' = X'Y'.",
      hint2: "Apply De Morgan again to (AB)' and (CD)'.",
      solutionSteps: [
        { step: 1, expr: "F = (AB)' · (CD)'", law: "De Morgan's Theorem", reason: "Complement of sum equals product of complements." },
        { step: 2, expr: "F = (A' + B')(C' + D')", law: "De Morgan's Theorem", reason: "Invert each individual product term." }
      ],
      finalAnswer: "F = (A' + B')(C' + D')",
      keyTakeaway: "De Morgan converts an AND-OR-INVERT structure into a two-level OR-AND structure."
    },
    {
      id: "P10",
      number: 10,
      difficulty: "Intermediate",
      variables: ["A", "B", "C"],
      problem: "F = (A + A')(B + C)(B + C')",
      techniques: ["Complement", "Dual Combining"],
      hint1: "Evaluate (A + A') first.",
      hint2: "Then apply dual combining to (B + C)(B + C').",
      solutionSteps: [
        { step: 1, expr: "F = (1) · (B + C)(B + C')", law: "Complement Law", reason: "A + A' = 1." },
        { step: 2, expr: "F = (B + C)(B + C')", law: "Identity Law", reason: "1 · X = X." },
        { step: 3, expr: "F = B + CC' = B + 0 = B", law: "Second Distributive & Complement", reason: "CC' = 0 and B + 0 = B." }
      ],
      finalAnswer: "F = B",
      keyTakeaway: "Solve independent factor blocks separately before multiplying."
    },
    {
      id: "P11",
      number: 11,
      difficulty: "Intermediate",
      variables: ["A", "B", "C", "D"],
      problem: "F = A'B'C'D + A'BC'D + AB'C'D + ABC'D",
      techniques: ["Global Factoring", "Complement"],
      hint1: "Identify the product of two literals common to all four terms.",
      hint2: "Factor out C'D. What is left inside the bracket?",
      solutionSteps: [
        { step: 1, expr: "F = C'D(A'B' + A'B + AB' + AB)", law: "Distributive Law (Factoring)", reason: "Factor out common product C'D." },
        { step: 2, expr: "F = C'D[A'(B' + B) + A(B' + B)]", law: "Distributive Law", reason: "Factor A' and A inside the bracket." },
        { step: 3, expr: "F = C'D[A'(1) + A(1)] = C'D(A' + A)", law: "Complement & Identity", reason: "B' + B = 1." },
        { step: 4, expr: "F = C'D(1) = C'D", law: "Complement & Identity", reason: "A' + A = 1 and C'D · 1 = C'D." }
      ],
      finalAnswer: "F = C'D",
      keyTakeaway: "Four minterms that cover all combinations of two variables (A and B) collapse to leave only the shared literals."
    },
    {
      id: "P12",
      number: 12,
      difficulty: "Intermediate",
      variables: ["A", "B", "C"],
      problem: "F = AB'C + ABC + AB'C' + ABC'",
      techniques: ["Global Factoring", "Complement"],
      hint1: "Notice which variable literal appears in all four terms.",
      hint2: "Factor literal A globally. The remaining 4 terms cover all combinations of B and C.",
      solutionSteps: [
        { step: 1, expr: "F = A(B'C + BC + B'C' + BC')", law: "Distributive Law", reason: "Factor out common literal A." },
        { step: 2, expr: "F = A[C(B' + B) + C'(B' + B)]", law: "Factoring", reason: "Group by C and C'." },
        { step: 3, expr: "F = A[C(1) + C'(1)] = A(C + C')", law: "Complement & Identity", reason: "B' + B = 1." },
        { step: 4, expr: "F = A(1) = A", law: "Complement & Identity", reason: "C + C' = 1 and A · 1 = A." }
      ],
      finalAnswer: "F = A",
      keyTakeaway: "All four combinations of B and C sum to 1, leaving only literal A."
    },

    // Advanced (P13 - P24)
    {
      id: "P13",
      number: 13,
      difficulty: "Advanced",
      variables: ["A", "B", "C"],
      problem: "F = (A + B)(A' + C)(B + C)",
      techniques: ["Dual Consensus"],
      hint1: "Look at the pattern: (A + B) has A, (A' + C) has A'. What is the third term?",
      hint2: "The third term (B + C) consists of the non-complemented literals. Apply the Dual Consensus Theorem.",
      solutionSteps: [
        { step: 1, expr: "Identify variables: A appears uncomplemented in (A + B) and complemented in (A' + C).", law: "Pattern Recognition", reason: "Conditions for Dual Consensus are met." },
        { step: 2, expr: "The third factor (B + C) is the exact dual consensus of (A + B) and (A' + C).", law: "Dual Consensus Theorem", reason: "By dual consensus, (A + B)(A' + C)(B + C) = (A + B)(A' + C)." },
        { step: 3, expr: "F = (A + B)(A' + C)", law: "Elimination of Consensus Factor", reason: "The term (B + C) is provably redundant." }
      ],
      finalAnswer: "F = (A + B)(A' + C)",
      keyTakeaway: "Dual consensus allows dropping an entire sum factor without performing tedious algebraic expansions."
    },
    {
      id: "P14",
      number: 14,
      difficulty: "Advanced",
      variables: ["A", "B", "C"],
      problem: "F = ABC + ABC' + AB'C + A'BC",
      techniques: ["Idempotent Duplication", "Combining"],
      hint1: "Term ABC can combine with ABC', AB'C, and A'BC individually.",
      hint2: "Use the Idempotent Law to duplicate ABC: ABC = ABC + ABC + ABC.",
      solutionSteps: [
        { step: 1, expr: "F = (ABC + ABC') + (ABC + AB'C) + (ABC + A'BC)", law: "Idempotent Law", reason: "Duplicate ABC three times (ABC = ABC + ABC + ABC) and pair with adjacent terms." },
        { step: 2, expr: "ABC + ABC' = AB(C + C') = AB(1) = AB", law: "Combining Law", reason: "Pair 1 combines to AB." },
        { step: 3, expr: "ABC + AB'C = AC(B + B') = AC(1) = AC", law: "Combining Law", reason: "Pair 2 combines to AC." },
        { step: 4, expr: "ABC + A'BC = BC(A + A') = BC(1) = BC", law: "Combining Law", reason: "Pair 3 combines to BC." },
        { step: 5, expr: "F = AB + AC + BC", law: "Combining Results", reason: "Sum of the three combined pairs." }
      ],
      finalAnswer: "F = AB + AC + BC",
      keyTakeaway: "Duplicating a minterm using the Idempotent Law (X = X + X) is a powerful algebraic technique to combine multiple adjacent terms."
    },
    {
      id: "P15",
      number: 15,
      difficulty: "Advanced",
      variables: ["A", "B", "C", "D"],
      problem: "F = (A + B)(C + D) + (A + B)C'D",
      techniques: ["Factoring", "Redundancy"],
      hint1: "Factor out the common block (A + B).",
      hint2: "Inside the bracket, simplify (C + D) + C'D using the Redundancy Law.",
      solutionSteps: [
        { step: 1, expr: "F = (A + B)[(C + D) + C'D]", law: "Distributive Law (Factoring)", reason: "Factor out common factor (A + B)." },
        { step: 2, expr: "(C + D) + C'D = C + (D + C'D) = C + (D + C') = (C + C') + D = 1 + D = 1", law: "Alternative view: D + C'D = D (absorption)", reason: "Since D absorbs C'D: (C + D) + C'D = C + D." },
        { step: 3, expr: "F = (A + B)(C + D)", law: "Absorption Law", reason: "(C + D) absorbs (A + B)C'D directly because C'D is a subterm of C + D." }
      ],
      finalAnswer: "F = (A + B)(C + D)",
      keyTakeaway: "A sum term (C + D) completely absorbs any product term like C'D where one literal is contained in the sum."
    },
    {
      id: "P16",
      number: 16,
      difficulty: "Advanced",
      variables: ["A", "B", "C"],
      problem: "F = A'BC + ABC + A'BC' + ABC' + AB'C",
      techniques: ["Combining", "Redundancy"],
      hint1: "Group the first 4 terms: they all contain B.",
      hint2: "Show that the first 4 terms collapse to B. Then simplify B + AB'C.",
      solutionSteps: [
        { step: 1, expr: "F = B(A'C + AC + A'C' + AC') + AB'C", law: "Distributive Law", reason: "Factor B from the first four terms." },
        { step: 2, expr: "A'C + AC + A'C' + AC' = C(A' + A) + C'(A' + A) = C(1) + C'(1) = C + C' = 1", law: "Combining & Complement", reason: "The four terms cover all combinations of A and C." },
        { step: 3, expr: "F = B(1) + AB'C = B + AB'C", law: "Identity Law", reason: "B · 1 = B." },
        { step: 4, expr: "F = B + AC", law: "Redundancy Law", reason: "B + B'(AC) = B + AC by redundancy." }
      ],
      finalAnswer: "F = B + AC",
      keyTakeaway: "Collapsing a dominant group of terms first leaves a simple redundancy reduction."
    },
    {
      id: "P17",
      number: 17,
      difficulty: "Advanced",
      variables: ["A", "B", "C", "D"],
      problem: "F = A'B'CD + A'BCD + AB'CD + ABCD + ABC'D",
      techniques: ["Combining", "Redundancy"],
      hint1: "Look at the first 4 terms: what product do they share?",
      hint2: "The first 4 terms reduce to CD. Then simplify CD + ABC'D.",
      solutionSteps: [
        { step: 1, expr: "A'B'CD + A'BCD + AB'CD + ABCD = CD(A'B' + A'B + AB' + AB) = CD(1) = CD", law: "Combining Law", reason: "First four terms cover all A and B combinations with CD." },
        { step: 2, expr: "F = CD + ABC'D", law: "Substitution", reason: "Replace first four terms with CD." },
        { step: 3, expr: "F = D(C + ABC')", law: "Distributive Law (Factoring)", reason: "Factor out common literal D." },
        { step: 4, expr: "C + ABC' = C + AB", law: "Redundancy Law", reason: "Apply X + X'Y = X + Y with X=C, Y=AB." },
        { step: 5, expr: "F = D(C + AB) = CD + ABD", law: "First Distributive Law", reason: "Expand to standard SOP." }
      ],
      finalAnswer: "F = CD + ABD",
      keyTakeaway: "Factor out common literals before applying redundancy on internal sub-expressions."
    },
    {
      id: "P18",
      number: 18,
      difficulty: "Advanced",
      variables: ["A", "B", "C", "D"],
      problem: "F = [(A + B)(C + D')]' + ABD'",
      techniques: ["De Morgan", "Redundancy"],
      hint1: "Apply De Morgan to the product inside the bracket: [X · Y]' = X' + Y'.",
      hint2: "Find (A + B)' and (C + D')'. Then simplify with ABD'.",
      solutionSteps: [
        { step: 1, expr: "[(A + B)(C + D')]' = (A + B)' + (C + D')'", law: "De Morgan's Theorem", reason: "Invert the product into a sum of complements." },
        { step: 2, expr: "(A + B)' = A'B'  and  (C + D')' = C'(D')' = C'D", law: "De Morgan & Involution", reason: "Simplify individual sum complements." },
        { step: 3, expr: "F = A'B' + C'D + ABD'", law: "Substitution", reason: "Combine inverted bracket with trailing term." }
      ],
      finalAnswer: "F = A'B' + C'D + ABD'",
      keyTakeaway: "De Morgan cleanly converts a complemented product into sum-of-products terms."
    },
    {
      id: "P19",
      number: 19,
      difficulty: "Advanced",
      variables: ["A", "B", "C", "D"],
      problem: "F = (A + B + C)(A + B + C')(A' + D)(A + D)",
      techniques: ["Dual Combining"],
      hint1: "Pair the first two factors: (A + B + C)(A + B + C').",
      hint2: "Pair the last two factors: (A' + D)(A + D).",
      solutionSteps: [
        { step: 1, expr: "(A + B + C)(A + B + C') = (A + B) + CC' = (A + B) + 0 = A + B", law: "Dual Combining", reason: "The first two factors combine to (A + B)." },
        { step: 2, expr: "(A' + D)(A + D) = (D + A')(D + A) = D + A'A = D + 0 = D", law: "Dual Combining", reason: "The last two factors combine to D." },
        { step: 3, expr: "F = (A + B) · D = D(A + B)", law: "Substitution", reason: "Multiply simplified factor pairs." }
      ],
      finalAnswer: "F = D(A + B)",
      keyTakeaway: "Recognizing dual combining on factor pairs simplifies a 4-term POS expression in just two steps."
    },
    {
      id: "P20",
      number: 20,
      difficulty: "Advanced",
      variables: ["A", "B", "C", "D"],
      problem: "F = A'BCD + ABCD + A'BCD' + ABCD' + AB'CD",
      techniques: ["Combining", "Redundancy"],
      hint1: "Look at the first 4 terms: they all contain BC.",
      hint2: "The first 4 terms reduce to BC. Then simplify BC + AB'CD.",
      solutionSteps: [
        { step: 1, expr: "A'BCD + ABCD + A'BCD' + ABCD' = BC(A'D + AD + A'D' + AD') = BC(1) = BC", law: "Combining Law", reason: "First four terms cover all combinations of A and D with BC." },
        { step: 2, expr: "F = BC + AB'CD", law: "Substitution", reason: "Replace first four terms with BC." },
        { step: 3, expr: "F = C(B + AB'D)", law: "Distributive Law (Factoring)", reason: "Factor out common literal C." },
        { step: 4, expr: "B + AB'D = B + AD", law: "Redundancy Law", reason: "Apply X + X'Y = X + Y with X=B, Y=AD." },
        { step: 5, expr: "F = C(B + AD) = BC + ACD", law: "First Distributive Law", reason: "Expand to standard SOP." }
      ],
      finalAnswer: "F = BC + ACD",
      keyTakeaway: "Large minterm clusters collapse to short terms, which then absorb primes from remaining terms via redundancy."
    },
    {
      id: "P21",
      number: 21,
      difficulty: "Advanced",
      variables: ["A", "B", "C"],
      problem: "F = AB + A'C + BC + A'B'C",
      techniques: ["Consensus", "Absorption"],
      hint1: "First, look at the triplet AB + A'C + BC. Which term is redundant?",
      hint2: "Drop the consensus term BC. Then simplify A'C + A'B'C using absorption.",
      solutionSteps: [
        { step: 1, expr: "AB + A'C + BC = AB + A'C", law: "Consensus Theorem", reason: "BC is the consensus term of AB and A'C; drop it." },
        { step: 2, expr: "F = AB + A'C + A'B'C", law: "Substitution", reason: "Expression after consensus reduction." },
        { step: 3, expr: "A'C + A'B'C = A'C(1 + B') = A'C(1) = A'C", law: "Absorption Law", reason: "A'C absorbs A'B'C." },
        { step: 4, expr: "F = AB + A'C", law: "Final Reduction", reason: "Minimal two-term SOP." }
      ],
      finalAnswer: "F = AB + A'C",
      keyTakeaway: "Apply consensus first to eliminate bridging terms, then check if remaining terms absorb each other."
    },
    {
      id: "P22",
      number: 22,
      difficulty: "Advanced",
      variables: ["A", "B", "C", "D"],
      problem: "F = (AB' + A'C)' + ABD",
      techniques: ["De Morgan", "Consensus", "Absorption"],
      hint1: "Apply De Morgan to (AB' + A'C)': (AB')'(A'C)' = (A' + B)(A + C').",
      hint2: "Expand into SOP: A'C' + AB + BC'. Drop consensus term BC'. Then combine with ABD.",
      solutionSteps: [
        { step: 1, expr: "(AB' + A'C)' = (AB')' · (A'C)'", law: "De Morgan's Theorem", reason: "Invert sum of products." },
        { step: 2, expr: "(AB')' · (A'C)' = (A' + B)(A + C')", law: "De Morgan & Involution", reason: "Invert individual product terms." },
        { step: 3, expr: "(A' + B)(A + C') = A'A + A'C' + BA + BC' = 0 + A'C' + AB + BC' = A'C' + AB + BC'", law: "Distributive & Complement", reason: "Multiply out; A'A = 0." },
        { step: 4, expr: "A'C' + AB + BC' = A'C' + AB", law: "Consensus Theorem", reason: "BC' is the consensus term between AB and A'C'; drop it." },
        { step: 5, expr: "F = A'C' + AB + ABD", law: "Substitution", reason: "Reintroduce trailing term ABD." },
        { step: 6, expr: "AB + ABD = AB(1 + D) = AB(1) = AB", law: "Absorption Law", reason: "AB absorbs ABD." },
        { step: 7, expr: "F = AB + A'C'", law: "Commutative Law", reason: "Final simplified expression." }
      ],
      finalAnswer: "F = AB + A'C'",
      keyTakeaway: "De Morgan expansion followed by consensus elimination and absorption rapidly reduces complex bracketed expressions."
    },
    {
      id: "P23",
      number: 23,
      difficulty: "Advanced",
      variables: ["A", "B", "C", "D"],
      problem: "F = AB'CD + AB'C'D + ABCD + ABC'D",
      techniques: ["Global Factoring", "Combining"],
      hint1: "Identify the two literals common to all four terms.",
      hint2: "Factor out AD. The remaining 4 terms cover all combinations of B and C.",
      solutionSteps: [
        { step: 1, expr: "F = AD(B'C + B'C' + BC + BC')", law: "Distributive Law (Factoring)", reason: "Factor out common product AD." },
        { step: 2, expr: "F = AD[B'(C + C') + B(C + C')]", law: "Factoring", reason: "Group by B' and B." },
        { step: 3, expr: "F = AD[B'(1) + B(1)] = AD(B' + B)", law: "Complement & Identity", reason: "C + C' = 1." },
        { step: 4, expr: "F = AD(1) = AD", law: "Complement & Identity", reason: "B' + B = 1 and AD · 1 = AD." }
      ],
      finalAnswer: "F = AD",
      keyTakeaway: "When a set of terms spans all combinations of n variables, those n variables drop out completely."
    },
    {
      id: "P24",
      number: 24,
      difficulty: "Advanced",
      variables: ["A", "B", "C", "D"],
      problem: "F = (A + B)(A' + C)(B + C) + B'D",
      techniques: ["Dual Consensus", "Distributive"],
      hint1: "Recognize that the first three factors form a dual consensus triplet.",
      hint2: "Drop (B + C). Multiply out (A + B)(A' + C) to get AC + A'B. Then add B'D.",
      solutionSteps: [
        { step: 1, expr: "(A + B)(A' + C)(B + C) = (A + B)(A' + C)", law: "Dual Consensus Theorem", reason: "The factor (B + C) is the redundant dual consensus." },
        { step: 2, expr: "(A + B)(A' + C) = AA' + AC + BA' + BC = 0 + AC + A'B + BC = AC + A'B + BC", law: "First Distributive Law", reason: "Multiply out factors; AA' = 0." },
        { step: 3, expr: "AC + A'B + BC = AC + A'B", law: "Consensus Theorem", reason: "In SOP, BC is the consensus of AC and A'B; drop it." },
        { step: 4, expr: "F = AC + A'B + B'D", law: "Substitution", reason: "Add the remaining term B'D." }
      ],
      finalAnswer: "F = AC + A'B + B'D",
      keyTakeaway: "Applying dual consensus in POS and then standard consensus in SOP provides a clean, elegant reduction."
    }
  ],

  // Common Mistakes Panel
  commonMistakes: [
    {
      id: "m1",
      mistake: "Writing A + 1 = A (treating Boolean OR as ordinary addition).",
      correctMethod: "A + 1 = 1.",
      why: "In Boolean switching logic, 1 represents VCC / High. Any input ORed with 1 forces the output High regardless of A."
    },
    {
      id: "m2",
      mistake: "Writing (A + B)' = A' + B' (failing to toggle the operator).",
      correctMethod: "(A + B)' = A'B' and (AB)' = A' + B'.",
      why: "De Morgan's Theorem requires breaking the complement bar AND toggling the logical operation between OR and AND."
    },
    {
      id: "m3",
      mistake: "Writing A + A' = 0 or A · A' = 1 (inverting the complement rules).",
      correctMethod: "A + A' = 1 and A · A' = 0.",
      why: "At least one literal is always 1, making the sum 1; both can never be 1 simultaneously, making the product 0."
    },
    {
      id: "m4",
      mistake: "Dropping the unprimed literal in redundancy: A + A'B = A' + B.",
      correctMethod: "A + A'B = A + B.",
      why: "The standalone literal A is dominant. It absorbs the prime from A' via (A + A')(A + B) = 1(A + B) = A + B."
    },
    {
      id: "m5",
      mistake: "Discarding non-consensus terms: in AB + A'C + BC, deleting AB or A'C.",
      correctMethod: "Delete only the third term BC.",
      why: "The consensus term BC is formed by the companion variables of A and A'. The parent terms AB and A'C are essential."
    },
    {
      id: "m6",
      mistake: "Assuming the first shorter expression found is globally minimal.",
      correctMethod: "Test for further factoring, absorption, or consensus before concluding.",
      why: "Algebraic simplification depends on the order of laws applied. Systematic methods like K-Maps formally guarantee minimality."
    },
    {
      id: "m7",
      mistake: "Confusing the Dual of an expression with its Complement.",
      correctMethod: "Dual toggles operators and constants without complementing variables; Complement inverts variables as well.",
      why: "An expression is generally NOT equal to its dual. Duality is an algebraic symmetry, not functional equivalence."
    },
    {
      id: "m8",
      mistake: "Violating operator precedence: evaluating A + BC as (A + B)C.",
      correctMethod: "A + BC means A + (B · C). AND has higher precedence than OR.",
      why: "Just as multiplication precedes addition in arithmetic, conjunction (AND) binds tighter than disjunction (OR)."
    },
    {
      id: "m9",
      mistake: "Combining terms that differ by more than one literal (e.g. AB + A'B' = 1).",
      correctMethod: "AB + A'B' cannot combine; it is the irreducible XNOR function.",
      why: "The Combining Law requires exactly one literal to differ in polarity while all other literals remain identical."
    },
    {
      id: "m10",
      mistake: "Dropping terms without valid law justification during exams.",
      correctMethod: "Cite the specific Boolean law (e.g. 'By Absorption Law', 'By Consensus Theorem') at every step.",
      why: "Examiners award credit for mathematically valid deductive reasoning, not just the final expression."
    }
  ]
};

export default dldSection22Data;
