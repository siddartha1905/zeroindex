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
  estimatedReadTime: "16 min read",
  dataScienceConnection: "In modern database query optimizers (such as Apache Spark SQL and PostgreSQL Catalyst), SQL WHERE predicates are parsed into Boolean expression trees. The optimizer applies algebraic laws (such as De Morgan's, Idempotency, and Distributivity) to eliminate redundant filter conditions, prune table scans, and convert complex nested filters into minimal hardware-efficient evaluation plans.",

  overview: "Boolean expression simplification is the systematic process of transforming an algebraic switching expression into an equivalent form containing the minimum number of literals and terms. In hardware, every literal represents a circuit connection or inverter, and every term represents a logic gate. Minimizing the Boolean expression directly reduces circuit board area, silicon cost, propagation delay, and power consumption. This section presents the formal algebraic simplification procedure, catalogs mandatory transformation rules, and walks through progressive worked examples from basic two-variable reductions to complex multi-step consensus proofs.",

  learningOutcomes: [
    "Differentiate between algebraic simplification (symbolic deduction) and truth-table verification (exhaustive proof).",
    "Identify algebraic factorization opportunities using the Distributive, Absorption, and Idempotent laws.",
    "Apply Generalized De Morgan's Theorems to complement and simplify multi-variable expressions.",
    "Formulate and prove the Consensus Theorem and its Dual to eliminate hidden redundant terms.",
    "Solve university-level simplification problems step by step with explicit law citations."
  ],

  fundamentalConcepts: [
    {
      title: "Objective of Boolean Simplification",
      description: "A Boolean function can be expressed in infinitely many algebraic forms. The simplified or minimal form is one that has the minimum number of terms (gates) and minimum number of literals per term (gate inputs). Reducing literal and term count minimizes circuit complexity, silicon area, and signal propagation delay."
    },
    {
      title: "Algebraic Reduction vs Truth Table Verification",
      description: "Truth tables provide an exhaustive proof of equivalence across all 2^n input combinations. However, truth tables grow exponentially and do not reveal how to build the smallest physical circuit. Algebraic reduction uses axiomatic deduction to step-by-step transform an expression into its most compact hardware realization."
    },
    {
      title: "Generalized De Morgan's Theorem (n Variables)",
      description: "For any finite number of variables n:\n1. (A1 + A2 + ... + An)' = A1' · A2' · ... · An'\n2. (A1 · A2 · ... · An)' = A1' + A2' + ... + An'\nComplementing an entire expression toggles all operators (+ <-> ·) and complements every individual variable literal."
    },
    {
      title: "The Consensus Theorem and Its Dual",
      description: "Standard Consensus: AB + A'C + BC = AB + A'C.\nThe term BC is the consensus of AB and A'C: it contains the non-complemented variables from two terms where the third variable appears uncomplemented in one and complemented in the other. Since BC is redundant, it can be deleted.\nDual Consensus: (A + B)(A' + C)(B + C) = (A + B)(A' + C)."
    }
  ],

  coreTheoremsList: [
    { name: "Idempotent Laws", lawA: "x + x = x", lawB: "x · x = x", note: "Combines identical parallel terms or inputs." },
    { name: "Null / Domination", lawA: "x + 1 = 1", lawB: "x · 0 = 0", note: "Forces output to constant state." },
    { name: "Involution", lawA: "(x')' = x", lawB: "-", note: "Double negation restores original literal." },
    { name: "Absorption 1", lawA: "x + xy = x", lawB: "x(x + y) = x", note: "Subsumes the longer term containing x." },
    { name: "Absorption 2 (Redundancy)", lawA: "x + x'y = x + y", lawB: "x(x' + y) = xy", note: "Eliminates the complement literal." },
    { name: "Combining / Adjacency", lawA: "xy + xy' = x", lawB: "(x + y)(x + y') = x", note: "Basis of Karnaugh map grouping." },
    { name: "De Morgan (2 Variables)", lawA: "(x + y)' = x'y'", lawB: "(xy)' = x' + y'", note: "Converts between AND/OR structures." },
    { name: "Consensus Theorem", lawA: "xy + x'z + yz = xy + x'z", lawB: "(x+y)(x'+z)(y+z) = (x+y)(x'+z)", note: "Eliminates redundant consensus term yz." }
  ],

  workedModels: [
    {
      id: "WM2.2-01",
      difficulty: "Basic",
      target: "Simplify: F = A + AB",
      solutionSteps: [
        { step: 1, expr: "F = A · 1 + AB", rule: "Identity Law", reason: "Express A as A · 1 to factor out common literal A." },
        { step: 2, expr: "F = A(1 + B)", rule: "Distributive Law", reason: "Factor out common literal A." },
        { step: 3, expr: "F = A(1)", rule: "Null / Domination Law", reason: "1 + B = 1 regardless of B." },
        { step: 4, expr: "F = A", rule: "Identity Law", reason: "A · 1 = A. This proves the first Absorption Law." }
      ],
      finalResult: "F = A",
      verificationNote: "When A=0: 0 + 0·B = 0. When A=1: 1 + 1·B = 1. Output equals A for all B."
    },
    {
      id: "WM2.2-02",
      difficulty: "Basic",
      target: "Simplify: F = AB + AB'",
      solutionSteps: [
        { step: 1, expr: "F = A(B + B')", rule: "Distributive Law", reason: "Factor out common product literal A." },
        { step: 2, expr: "F = A(1)", rule: "Complement Law", reason: "B + B' = 1 (a variable ORed with its complement is always 1)." },
        { step: 3, expr: "F = A", rule: "Identity Law", reason: "A · 1 = A. This is the fundamental Combining Law." }
      ],
      finalResult: "F = A",
      verificationNote: "Two adjacent terms differing by one complemented variable combine to eliminate that variable."
    },
    {
      id: "WM2.2-03",
      difficulty: "Basic",
      target: "Simplify: F = (A + B)(A + B')",
      solutionSteps: [
        { step: 1, expr: "F = A + BB'", rule: "Distributive Law (OR over AND)", reason: "Using x + yz = (x+y)(x+z) in reverse where x=A, y=B, z=B'." },
        { step: 2, expr: "F = A + 0", rule: "Complement Law", reason: "BB' = 0 (a variable ANDed with its complement is always 0)." },
        { step: 3, expr: "F = A", rule: "Identity Law", reason: "A + 0 = A." }
      ],
      finalResult: "F = A",
      verificationNote: "This is the dual of AB + AB' = A. By duality, (A+B)(A+B') = A."
    },
    {
      id: "WM2.2-04",
      difficulty: "Basic",
      target: "Simplify: F = A(A + B)",
      solutionSteps: [
        { step: 1, expr: "F = AA + AB", rule: "Distributive Law", reason: "Expand the product over the sum." },
        { step: 2, expr: "F = A + AB", rule: "Idempotent Law", reason: "AA = A." },
        { step: 3, expr: "F = A(1 + B)", rule: "Distributive Law", reason: "Factor out A." },
        { step: 4, expr: "F = A(1) = A", rule: "Null & Identity Laws", reason: "1 + B = 1, and A · 1 = A." }
      ],
      finalResult: "F = A",
      verificationNote: "Second Absorption Law: A absorbs the sum term (A+B)."
    },
    {
      id: "WM2.2-05",
      difficulty: "Intermediate",
      target: "Simplify: F = A + A'B",
      solutionSteps: [
        { step: 1, expr: "F = (A + A')(A + B)", rule: "Distributive Law (OR over AND)", reason: "Apply x + yz = (x+y)(x+z) where x=A, y=A', z=B." },
        { step: 2, expr: "F = (1)(A + B)", rule: "Complement Law", reason: "A + A' = 1." },
        { step: 3, expr: "F = A + B", rule: "Identity Law", reason: "1 · (A + B) = A + B." }
      ],
      finalResult: "F = A + B",
      verificationNote: "Redundancy Law: Whenever literal A is present as a standalone term, the complement A' in any other product term is completely redundant and can be dropped."
    },
    {
      id: "WM2.2-06",
      difficulty: "Intermediate",
      target: "Simplify: F = A(A' + B)",
      solutionSteps: [
        { step: 1, expr: "F = AA' + AB", rule: "Distributive Law", reason: "Expand multiplication across addition." },
        { step: 2, expr: "F = 0 + AB", rule: "Complement Law", reason: "AA' = 0." },
        { step: 3, expr: "F = AB", rule: "Identity Law", reason: "0 + AB = AB." }
      ],
      finalResult: "F = AB",
      verificationNote: "Dual of the Redundancy Law. The complement A' inside the sum factor is eliminated."
    },
    {
      id: "WM2.2-07",
      difficulty: "Intermediate",
      target: "Simplify: F = A'B + AB + AB'",
      solutionSteps: [
        { step: 1, expr: "F = A'B + AB + AB + AB'", rule: "Idempotent Law", reason: "Duplicate the middle term AB since x = x + x." },
        { step: 2, expr: "F = (A'B + AB) + (AB + AB')", rule: "Associative Law", reason: "Regroup into two independent pairs." },
        { step: 3, expr: "F = (A' + A)B + A(B + B')", rule: "Distributive Law", reason: "Factor B from first pair, A from second pair." },
        { step: 4, expr: "F = (1)B + A(1)", rule: "Complement Law", reason: "A' + A = 1 and B + B' = 1." },
        { step: 5, expr: "F = B + A = A + B", rule: "Identity & Commutative Laws", reason: "Final minimal sum of products." }
      ],
      finalResult: "F = A + B",
      verificationNote: "Duplicating a term using the Idempotent Law is an essential university exam trick."
    },
    {
      id: "WM2.2-08",
      difficulty: "Intermediate",
      target: "Simplify: F = (A + B)' + AB",
      solutionSteps: [
        { step: 1, expr: "F = A'B' + AB", rule: "De Morgan's Theorem", reason: "Apply (A + B)' = A'B'." },
        { step: 2, expr: "F = AB + A'B'", rule: "Commutative Law", reason: "This is the canonical definition of the Exclusive-NOR (XNOR) equivalence function." }
      ],
      finalResult: "F = AB + A'B' (or (A ⊕ B)')",
      verificationNote: "The expression is irreducible in standard 2-level AND-OR logic. Evaluates to 1 when A and B have identical values."
    },
    {
      id: "WM2.2-09",
      difficulty: "Intermediate",
      target: "Simplify: F = AB + A'(B + C) + B'(B + D)",
      solutionSteps: [
        { step: 1, expr: "F = AB + A'B + A'C + B'B + B'D", rule: "Distributive Law", reason: "Expand all parentheses." },
        { step: 2, expr: "F = AB + A'B + A'C + 0 + B'D", rule: "Complement Law", reason: "B'B = 0." },
        { step: 3, expr: "F = (AB + A'B) + A'C + B'D", rule: "Identity Law", reason: "Remove 0 and group first two terms." },
        { step: 4, expr: "F = (A + A')B + A'C + B'D", rule: "Distributive Law", reason: "Factor out B from first pair." },
        { step: 5, expr: "F = (1)B + A'C + B'D = B + A'C + B'D", rule: "Complement & Identity", reason: "A + A' = 1." },
        { step: 6, expr: "F = (B + B'D) + A'C", rule: "Commutative & Associative", reason: "Group B and B'D to apply Redundancy Law." },
        { step: 7, expr: "F = (B + D) + A'C = B + D + A'C", rule: "Redundancy Law (x + x'y = x + y)", reason: "B absorbs B' from B'D." }
      ],
      finalResult: "F = B + D + A'C",
      verificationNote: "Reduced from 11 literals across 3 complex terms down to 4 literals across 3 simple terms."
    },
    {
      id: "WM2.2-10",
      difficulty: "Intermediate",
      target: "Simplify: F = (A + B)(A' + C)",
      solutionSteps: [
        { step: 1, expr: "F = AA' + AC + A'B + BC", rule: "Distributive Law", reason: "Multiply out all terms." },
        { step: 2, expr: "F = 0 + AC + A'B + BC", rule: "Complement Law", reason: "AA' = 0." },
        { step: 3, expr: "F = AC + A'B + BC", rule: "Identity Law", reason: "Remove 0 term." },
        { step: 4, expr: "F = AC + A'B", rule: "Consensus Theorem", reason: "BC is the consensus of AC and A'B (contains unprimed B and C). Therefore BC is redundant and eliminated." }
      ],
      finalResult: "F = AC + A'B",
      verificationNote: "Demonstrates that (A + B)(A' + C) = AC + A'B, an identity frequently tested in entrance exams."
    },
    {
      id: "WM2.2-11",
      difficulty: "Advanced",
      target: "Formal Proof: Prove that AB + A'C + BC = AB + A'C (Consensus Theorem)",
      solutionSteps: [
        { step: 1, expr: "LHS = AB + A'C + BC · 1", rule: "Identity Law", reason: "Multiply the third term BC by identity element 1." },
        { step: 2, expr: "LHS = AB + A'C + BC(A + A')", rule: "Complement Law", reason: "Substitute 1 with (A + A')." },
        { step: 3, expr: "LHS = AB + A'C + ABC + A'BC", rule: "Distributive Law", reason: "Expand BC across (A + A')." },
        { step: 4, expr: "LHS = (AB + ABC) + (A'C + A'BC)", rule: "Commutative & Associative", reason: "Rearrange terms to pair terms sharing common literals." },
        { step: 5, expr: "LHS = AB(1 + C) + A'C(1 + B)", rule: "Distributive Law", reason: "Factor AB from first pair and A'C from second pair." },
        { step: 6, expr: "LHS = AB(1) + A'C(1)", rule: "Null / Domination Law", reason: "1 + C = 1 and 1 + B = 1." },
        { step: 7, expr: "LHS = AB + A'C = RHS", rule: "Identity Law", reason: "Q.E.D. The third term BC is completely subsumed by AB and A'C." }
      ],
      finalResult: "AB + A'C + BC = AB + A'C",
      verificationNote: "Consensus Identification Rule: Find two terms with one variable complemented in one and uncomplemented in the other (A and A'). If a third term consists of the remaining literals (B and C), that third term is redundant."
    },
    {
      id: "WM2.2-12",
      difficulty: "Advanced",
      target: "Formal Proof: Prove that (A + B)(A' + C)(B + C) = (A + B)(A' + C) (Dual Consensus)",
      solutionSteps: [
        { step: 1, expr: "LHS = (A + B)(A' + C)[(B + C) + 0]", rule: "Identity Law", reason: "Add 0 to third factor (B + C)." },
        { step: 2, expr: "LHS = (A + B)(A' + C)[(B + C) + AA']", rule: "Complement Law", reason: "Substitute 0 with AA'." },
        { step: 3, expr: "LHS = (A + B)(A' + C)[(B + C + A)(B + C + A')]", rule: "Distributive Law", reason: "Apply x + yz = (x+y)(x+z) where x = B+C, y = A, z = A'." },
        { step: 4, expr: "LHS = [(A + B)(A + B + C)] · [(A' + C)(A' + C + B)]", rule: "Commutative & Associative", reason: "Regroup terms." },
        { step: 5, expr: "LHS = (A + B) · (A' + C) = RHS", rule: "Absorption Law (x(x + y) = x)", reason: "(A+B) absorbs (A+B+C) and (A'+C) absorbs (A'+C+B). Q.E.D." }
      ],
      finalResult: "(A + B)(A' + C)(B + C) = (A + B)(A' + C)",
      verificationNote: "The dual consensus term (B + C) is completely redundant and removed."
    },
    {
      id: "WM2.2-13",
      difficulty: "Advanced",
      target: "Simplify: F = A'B'C' + A'BC' + AB'C' + ABC'",
      solutionSteps: [
        { step: 1, expr: "F = (A'B'C' + A'BC') + (AB'C' + ABC')", rule: "Associative Law", reason: "Group into pairs." },
        { step: 2, expr: "F = A'C'(B' + B) + AC'(B' + B)", rule: "Distributive Law", reason: "Factor A'C' from first pair and AC' from second pair." },
        { step: 3, expr: "F = A'C'(1) + AC'(1) = A'C' + AC'", rule: "Complement & Identity", reason: "B' + B = 1." },
        { step: 4, expr: "F = C'(A' + A)", rule: "Distributive Law", reason: "Factor out C'." },
        { step: 5, expr: "F = C'(1) = C'", rule: "Complement & Identity", reason: "A' + A = 1 and C' · 1 = C'." }
      ],
      finalResult: "F = C'",
      verificationNote: "Reduces 4 three-literal minterms (12 literals) to a single literal C'."
    },
    {
      id: "WM2.2-14",
      difficulty: "Advanced",
      target: "Simplify: F = [(AB)' + A']' + A(B + C')'",
      solutionSteps: [
        { step: 1, expr: "F = [(A' + B') + A']' + A(B + C')'", rule: "De Morgan's Theorem", reason: "(AB)' = A' + B'." },
        { step: 2, expr: "F = [A' + A' + B']' + A(B + C')'", rule: "Associative & Commutative", reason: "Regroup A' literals together." },
        { step: 3, expr: "F = [A' + B']' + A(B + C')'", rule: "Idempotent Law", reason: "A' + A' = A'." },
        { step: 4, expr: "F = (A')' · (B')' + A(B + C')'", rule: "De Morgan's Theorem", reason: "Complement of sum is product of complements." },
        { step: 5, expr: "F = AB + A(B' · (C')')", rule: "Involution & De Morgan", reason: "(A')' = A, (B')' = B, and (B + C')' = B' · (C')'." },
        { step: 6, expr: "F = AB + A(B'C)", rule: "Involution Law", reason: "(C')' = C." },
        { step: 7, expr: "F = A(B + B'C)", rule: "Distributive Law", reason: "Factor out common literal A." },
        { step: 8, expr: "F = A(B + C)", rule: "Redundancy Law (x + x'y = x + y)", reason: "B absorbs B' from B'C." },
        { step: 9, expr: "F = AB + AC", rule: "Distributive Law", reason: "Standard minimal SOP representation." }
      ],
      finalResult: "F = A(B + C) = AB + AC",
      verificationNote: "Demonstrates careful multi-level De Morgan transformation and involution handling."
    },
    {
      id: "WM2.2-15",
      difficulty: "Advanced",
      target: "Simplify: F = (A + B + C)(A + B + C')(A + B' + C)",
      solutionSteps: [
        { step: 1, expr: "F = [(A + B) + C][(A + B) + C'] · (A + B' + C)", rule: "Associative Law", reason: "Group (A + B) as a single variable X in the first two factors." },
        { step: 2, expr: "F = [(A + B) + CC'] · (A + B' + C)", rule: "Distributive Law (x + y)(x + z) = x + yz", reason: "Where x = (A + B), y = C, z = C'." },
        { step: 3, expr: "F = [(A + B) + 0] · (A + B' + C) = (A + B)(A + B' + C)", rule: "Complement & Identity", reason: "CC' = 0." },
        { step: 4, expr: "F = [A + B][A + (B' + C)]", rule: "Associative Law", reason: "Treat A as common term across both factors." },
        { step: 5, expr: "F = A + B(B' + C)", rule: "Distributive Law", reason: "(A + x)(A + y) = A + xy where x = B, y = B' + C." },
        { step: 6, expr: "F = A + (BB' + BC) = A + (0 + BC)", rule: "Distributive & Complement", reason: "BB' = 0." },
        { step: 7, expr: "F = A + BC", rule: "Identity Law", reason: "Final minimal expression." }
      ],
      finalResult: "F = A + BC",
      verificationNote: "Shows how Product-of-Sums expressions are simplified algebraically using the dual distributive law."
    }
  ],

  examTraps: [
    {
      trap: "Confusing Boolean OR (+) with ordinary arithmetic addition",
      explanation: "In Boolean algebra, 1 + 1 = 1 (Idempotent Law), NOT 2. Writing 1 + 1 = 2 or A + A = 2A is an immediate zero mark in examinations."
    },
    {
      trap: "Incorrect complementation of terms during De Morgan's application",
      explanation: "Students frequently write (AB)' = A'B' or (A + B)' = A' + B'. De Morgan's theorem requires swapping the operator: (AB)' = A' + B' and (A + B)' = A'B'."
    },
    {
      trap: "Missing hidden consensus terms",
      explanation: "In expressions like AB + A'C + BC, students often stop without recognizing that BC is redundant. Always check for pairs of terms with complementary literals."
    },
    {
      trap: "Forgetting to apply the dual distributive law",
      explanation: "Many students remember A(B + C) = AB + AC, but fail to utilize A + BC = (A + B)(A + C), which is essential for factoring POS expressions."
    }
  ],

  practiceExercises: [
    {
      id: "PE2.2-01",
      question: "Simplify the Boolean expression: F = X'Y'Z + X'YZ + XY'",
      answer: "F = X'Z + XY'",
      steps: "Factor X'Z: X'Z(Y' + Y) + XY' = X'Z(1) + XY' = X'Z + XY'."
    },
    {
      id: "PE2.2-02",
      question: "Simplify the Boolean expression: F = (A + B)'(A' + B')",
      answer: "F = A'B'",
      steps: "By De Morgan's: (A + B)' = A'B'. Then A'B'(A' + B') = A'B'A' + A'B'B' = A'B' + A'B' = A'B'."
    },
    {
      id: "PE2.2-03",
      question: "Simplify the expression using Consensus Theorem: F = AB' + BC + AC",
      answer: "F = AB' + BC",
      steps: "The terms are AB' and BC (variable B complemented in one, uncomplemented in other). Consensus term is AC. Therefore AC is redundant."
    },
    {
      id: "PE2.2-04",
      question: "Simplify: F = AB + A(B + C) + B(B + C)",
      answer: "F = B + AC",
      steps: "Expand: AB + AB + AC + BB + BC = AB + AC + B + BC = B(1 + A + C) + AC = B(1) + AC = B + AC."
    }
  ]
};

export default dldSection22Data;
