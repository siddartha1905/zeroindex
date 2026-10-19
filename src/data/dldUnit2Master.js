/**
 * Digital Logic Design (DLD) - Unit 2: Boolean Algebra & Gate-Level Minimization
 * Comprehensive Master Engineering Preparation Guide
 * Course Code: 1005261102 | VR23 Autonomous Regulations
 * Faculty: J. Siddartha Varma, Assistant Professor, Department of CSE-DS
 * Vignan's Institute of Information Technology (Autonomous), Visakhapatnam
 * Strict formatting: Zero em-dashes and zero en-dashes
 */

export const dldUnit2Master = {
  unitId: 2,
  unitRoman: "UNIT-II",
  title: "Boolean Algebra and Gate-Level Minimization",
  courseOutcome: "CO2",
  estimatedTime: "9 Lectures / 3 Weeks",
  publicationStatus: "In Development",
  isLive: false,
  summary: "Axiomatic foundations of switching algebra, Huntington postulates, algebraic theorems, canonical and standard forms, two-, three-, and four-variable Karnaugh Map minimization, prime implicant determination, don't-care conditions, and universal NAND/NOR logic synthesis.",

  officialSyllabusTopics: [
    "Concept of Boolean algebra",
    "Basic Theorems and Properties of Boolean algebra",
    "Boolean Functions",
    "Canonical and Standard Forms",
    "Minterms and Maxterms",
    "Products of Sum Simplification",
    "Sum of Products Simplification",
    "Gate level Minimization Map Method",
    "Three-Variable K-Map",
    "Four Variable K-Maps",
    "Don't-Care Conditions",
    "NAND and NOR Implementation",
    "Exclusive-OR Function implementation using NAND and NOR gates"
  ],

  sections: [
    {
      id: "2.1",
      number: "2.1",
      title: "Concept of Boolean Algebra, Huntington Postulates & Axiomatic Foundations",
      badge: "Axiomatic Foundation",
      status: "Available",
      estimatedReadTime: "12 min read",
      dataScienceConnection: "In Data Science and Machine Learning, Boolean algebra is the mathematical engine behind binary masking in NumPy/Pandas (such as df[(df['age'] > 25) & (df['income'] < 50000)]), decision trees, rule-based inference engines, and binary neural networks. Rigorous mastery of operator precedence and duality guarantees that complex multi-condition data filtering logic executes with mathematical precision.",
      
      overview: "Boolean algebra is the mathematics of digital computing. Formulated by George Boole in 1854 and adapted to switching circuits by Claude Shannon in 1938, it provides the formal framework for designing, simplifying, and optimizing digital hardware. This section establishes the axiomatic foundation of Boolean algebra through the Huntington Postulates, analyzes the crucial differences between ordinary algebra and Boolean switching algebra, introduces the principle of duality, and explores physical electrical switch analogies.",

      definitions: [
        {
          term: "Boolean Algebra",
          formal: "An algebraic structure (B, +, ·, ', 0, 1) defined on a set B containing at least two distinct elements {0, 1}, equipped with two binary operations + (logical OR) and · (logical AND), and a unary operation ' (logical NOT/complement), that satisfies the Huntington Postulates.",
          examTip: "In university examinations, always state the set B, both binary operators, the unary complement operator, and the two identity elements 0 and 1."
        },
        {
          term: "Switching Algebra (Two-Valued Boolean Algebra)",
          formal: "A specific Boolean algebra where the underlying set B contains exactly two discrete elements B = {0, 1}. The elements represent discrete voltage states: Logic 0 (LOW / ground) and Logic 1 (HIGH / supply voltage).",
          examTip: "Switching algebra is the physical realization of Boolean algebra in electronic hardware."
        },
        {
          term: "Principle of Duality",
          formal: "Any true Boolean algebraic identity or theorem remains valid if the binary operators + and · are interchanged, and the identity elements 0 and 1 are interchanged, while leaving variable literals unchanged.",
          examTip: "Crucial exam distinction: Duality modifies operators and identity constants. It never inverts or complements variable literals."
        }
      ],

      ordinaryVsBoolean: [
        {
          feature: "Underlying Domain",
          ordinaryAlgebra: "Real or complex numbers (infinite continuous spectrum).",
          booleanAlgebra: "Two discrete elements B = {0, 1} (binary states)."
        },
        {
          feature: "Arithmetic Operations",
          ordinaryAlgebra: "Addition, subtraction, multiplication, and division.",
          booleanAlgebra: "Logical OR (+), logical AND (·), and logical NOT ('). No subtraction or division exists."
        },
        {
          feature: "Distributive Laws",
          ordinaryAlgebra: "Only multiplication distributes over addition: x·(y+z) = xy + xz. Addition DOES NOT distribute over multiplication: x + (y·z) != (x+y)·(x+z).",
          booleanAlgebra: "Both operations distribute over each other: x·(y+z) = xy + xz AND x + (y·z) = (x+y)·(x+z)."
        },
        {
          feature: "Idempotent Property",
          ordinaryAlgebra: "x + x = 2x, and x · x = x^2 (distinct from x).",
          booleanAlgebra: "x + x = x, and x · x = x (combining an element with itself yields itself)."
        },
        {
          feature: "Complement Element",
          ordinaryAlgebra: "Additive inverse (-x) such that x + (-x) = 0.",
          booleanAlgebra: "Logical complement (x') such that x + x' = 1 and x · x' = 0."
        }
      ],

      huntingtonPostulates: [
        {
          id: "P1",
          name: "Closure",
          partA: {
            law: "Closure with respect to OR (+)",
            formula: "For every x, y in B: x + y in B",
            meaning: "ORing any two binary elements always produces another valid binary element."
          },
          partB: {
            law: "Closure with respect to AND (·)",
            formula: "For every x, y in B: x · y in B",
            meaning: "ANDing any two binary elements always produces another valid binary element."
          },
          switchAnalogy: "Connecting two switches in parallel or in series always creates a circuit that is either conducting (1) or non-conducting (0)."
        },
        {
          id: "P2",
          name: "Identity Elements",
          partA: {
            law: "Identity element with respect to OR (+)",
            formula: "x + 0 = x (for all x in B)",
            meaning: "The element 0 is the identity for OR. 0 + 0 = 0 and 1 + 0 = 1."
          },
          partB: {
            law: "Identity element with respect to AND (·)",
            formula: "x · 1 = x (for all x in B)",
            meaning: "The element 1 is the identity for AND. 0 · 1 = 0 and 1 · 1 = 1."
          },
          switchAnalogy: "A switch in parallel with an open switch (0) behaves exactly as the switch itself. A switch in series with a permanently closed switch (1) behaves exactly as the switch itself."
        },
        {
          id: "P3",
          name: "Commutative Laws",
          partA: {
            law: "Commutativity of OR (+)",
            formula: "x + y = y + x",
            meaning: "The sequence in which two inputs are ORed does not change the logical result."
          },
          partB: {
            law: "Commutativity of AND (·)",
            formula: "x · y = y · x",
            meaning: "The sequence in which two inputs are ANDed does not change the logical result."
          },
          switchAnalogy: "Swapping the positions of two parallel branches or two series switches does not alter current transmission."
        },
        {
          id: "P4",
          name: "Distributive Laws",
          partA: {
            law: "Distributivity of AND over OR",
            formula: "x · (y + z) = (x · y) + (x · z)",
            meaning: "ANDing x with a sum equals the sum of x ANDed with each term individually."
          },
          partB: {
            law: "Distributivity of OR over AND (Unique to Boolean Algebra)",
            formula: "x + (y · z) = (x + y) · (x + z)",
            meaning: "ORing x with a product equals the product of x ORed with each term individually."
          },
          switchAnalogy: "A single switch x in parallel with a series pair (y·z) provides identical electrical continuity to two parallel pairs (x+y) and (x+z) connected in series."
        },
        {
          id: "P5",
          name: "Complement Element",
          partA: {
            law: "Complementarity with respect to OR (+)",
            formula: "x + x' = 1 (for all x in B)",
            meaning: "Any variable ORed with its exact complement is always true (Logic 1)."
          },
          partB: {
            law: "Complementarity with respect to AND (·)",
            formula: "x · x' = 0 (for all x in B)",
            meaning: "Any variable ANDed with its exact complement is always false (Logic 0)."
          },
          switchAnalogy: "A normally open switch and a normally closed switch in parallel always conduct current (1). In series, they can never conduct current simultaneously (0)."
        },
        {
          id: "P6",
          name: "Distinct Elements",
          partA: {
            law: "Non-Triviality",
            formula: "There exist at least two elements x, y in B such that x != y (namely 0 != 1)",
            meaning: "The system is non-trivial; logic high is distinct from logic low."
          },
          partB: {
            law: "Bistable Foundation",
            formula: "B contains at least two distinct binary states",
            meaning: "Guarantees that digital logic can store and distinguish binary information."
          },
          switchAnalogy: "An electrical contact has two physically distinguishable mechanical states: closed (short circuit) and open (break)."
        }
      ],

      operatorPrecedence: [
        {
          level: 1,
          name: "Parentheses",
          symbol: "( )",
          description: "Sub-expressions enclosed within parentheses are always evaluated first, from innermost to outermost."
        },
        {
          level: 2,
          name: "NOT (Complement)",
          symbol: "' or ~",
          description: "Logical inversion applies immediately to the adjacent literal or parenthesized group."
        },
        {
          level: 3,
          name: "AND (Logical Conjunction)",
          symbol: "·",
          description: "Logical multiplication binds more tightly than OR. In written expressions, the dot is often omitted (e.g. AB means A · B)."
        },
        {
          level: 4,
          name: "OR (Logical Disjunction)",
          symbol: "+",
          description: "Logical addition has the lowest precedence among the primary binary operators."
        }
      ],

      workedModels: [
        {
          id: "model-1",
          title: "Model 1: Formulating Dual Expressions",
          level: "Fundamental / Level 1",
          problemStatement: "Determine the dual expression for each of the following Boolean functions:\n(a) F1 = A · B + A' · B\n(b) F2 = (A + B')(C + D)\n(c) F3 = A · B + C'(A + D)\n(d) F4 = (A + B + 0)(A'B + 1)",
          methodology: "Apply the Principle of Duality systematically: replace every + with ·, replace every · with +, replace 0 with 1, and replace 1 with 0. Keep all variable literals exactly as they are without inversion. Use parentheses to maintain original operator groupings.",
          steps: [
            {
              stepNumber: 1,
              subpart: "(a) F1 = A · B + A' · B",
              derivation: "Original expression is a sum of two products. Swap the central + with ·, and swap the internal · with +.\nDual(F1) = (A + B) · (A' + B)",
              caution: "Notice that A' remains A'. Duality does not complement literals."
            },
            {
              stepNumber: 2,
              subpart: "(b) F2 = (A + B')(C + D)",
              derivation: "Original expression is a product of two sums. Swap the outer multiplication with addition, and swap internal additions with multiplications.\nDual(F2) = (A · B') + (C · D) = AB' + CD",
              caution: "Parentheses around the original sum terms become product terms."
            },
            {
              stepNumber: 3,
              subpart: "(c) F3 = AB + C'(A + D)",
              derivation: "Break down into terms: term 1 is (A·B), term 2 is C'·(A+D). The terms are joined by +.\nIn the dual: (A+B) is multiplied by the dual of the second term.\nThe dual of C'·(A+D) is C' + (A·D).\nDual(F3) = (A + B) · [C' + (A · D)] = (A + B)(C' + AD)",
              caution: "Be careful to preserve the grouping around C' + AD."
            },
            {
              stepNumber: 4,
              subpart: "(d) F4 = (A + B + 0)(A'B + 1)",
              derivation: "Replace + with ·, · with +, 0 with 1, and 1 with 0.\nDual of (A + B + 0) becomes (A · B · 1) = AB · 1.\nDual of (A'B + 1) becomes (A' + B) · 0.\nThe outer product becomes a sum.\nDual(F4) = (A · B · 1) + [(A' + B) · 0]",
              caution: "Constants 0 and 1 must be swapped with 1 and 0 respectively."
            }
          ]
        },
        {
          id: "model-2",
          title: "Model 2: Proof of Postulate 4(b) by Perfect Induction",
          level: "Standard / Level 2",
          problemStatement: "Prove Huntington Postulate 4(b) (Distributivity of OR over AND): x + yz = (x + y)(x + z) using the method of perfect induction (truth table verification).",
          methodology: "Since the variables are binary, they can only take values from {0, 1}. For three variables x, y, and z, exactly 2^3 = 8 possible valuations exist. Construct a truth table evaluating the left-hand side and right-hand side across all 8 rows. If both columns match identically for every row, the identity is proven universally.",
          truthTable: {
            columns: ["x", "y", "z", "yz", "LHS: x + yz", "x + y", "x + z", "RHS: (x+y)(x+z)"],
            rows: [
              [0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 1, 0, 0, 0, 1, 0],
              [0, 1, 0, 0, 0, 1, 0, 0],
              [0, 1, 1, 1, 1, 1, 1, 1],
              [1, 0, 0, 0, 1, 1, 1, 1],
              [1, 0, 1, 0, 1, 1, 1, 1],
              [1, 1, 0, 0, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1, 1, 1]
            ]
          },
          conclusion: "By comparing column 5 (x + yz) and column 8 ((x + y)(x + z)), every entry is identical: 0, 0, 0, 1, 1, 1, 1, 1. Therefore, x + yz = (x + y)(x + z) is valid for all possible valuations. Q.E.D."
        },
        {
          id: "model-3",
          title: "Model 3: Electrical Switch Analogies for Postulates",
          level: "Physical Intuition / Level 1",
          problemStatement: "Explain the physical circuit behavior of the two Huntington Distributive Laws using electrical switch arrangements.",
          methodology: "Represent logic variables as mechanical switches: conducting = 1, open = 0. Logical AND represents series connection (both must conduct). Logical OR represents parallel connection (either branch conducts).",
          explanations: [
            {
              circuit: "Distributive Law 1: x · (y + z) = (x · y) + (x · z)",
              lhs: "LHS: A master series switch x connected to a parallel pair of switches y and z. Current flows if x is closed AND (either y OR z is closed).",
              rhs: "RHS: Two parallel paths: one path contains series switches (x and y); the second path contains series switches (x and z). If x is closed and y is closed, path 1 conducts. If x is closed and z is closed, path 2 conducts.",
              equivalence: "Both circuits provide identical terminal conductivity under all four switch state combinations."
            },
            {
              circuit: "Distributive Law 2: x + (y · z) = (x + y) · (x + z)",
              lhs: "LHS: A single bypass switch x connected in parallel with a series pair of switches (y and z). Current flows if switch x is closed OR (both switches y and z are closed).",
              rhs: "RHS: Two parallel blocks connected in series: block 1 is (x parallel with y), block 2 is (x parallel with z). If switch x is closed, both blocks conduct immediately, allowing current through. If x is open, current can only pass if both y and z are closed.",
              equivalence: "The electrical continuity is mathematically and physically identical in both arrangements."
            }
          ]
        },
        {
          id: "model-4",
          title: "Model 4: Step-by-Step Expression Evaluation with Precedence",
          level: "Evaluation / Level 2",
          problemStatement: "Given the Boolean function F(A, B, C) = A + B' · C, evaluate the value of F for the input valuation A = 0, B = 1, C = 1, explicitly showing the order of operations.",
          methodology: "Apply the standard operator hierarchy: (1) Parentheses, (2) NOT complement, (3) AND multiplication, (4) OR addition.",
          steps: [
            {
              stepNumber: 1,
              action: "Substitute given binary valuations",
              expression: "F = 0 + (1)' · 1"
            },
            {
              stepNumber: 2,
              action: "Evaluate NOT (Complement) operation first",
              expression: "(1)' = 0, so the expression becomes: F = 0 + (0 · 1)"
            },
            {
              stepNumber: 3,
              action: "Evaluate AND (Conjunction) operation next",
              expression: "0 · 1 = 0, so the expression becomes: F = 0 + 0"
            },
            {
              stepNumber: 4,
              action: "Evaluate OR (Disjunction) operation last",
              expression: "0 + 0 = 0. Therefore, F(0, 1, 1) = 0."
            }
          ],
          pitfallNote: "If a student incorrectly evaluated OR before AND: (0 + 1') · 1 = (0 + 0) · 1 = 0 · 1 = 0. While the answer coincided in this specific case, for A = 1, B = 1, C = 0: correct evaluation yields 1 + (0 · 0) = 1, whereas evaluating OR first yields (1 + 0) · 0 = 0 (completely incorrect)."
        }
      ],

      commonMistakes: [
        {
          id: "mistake-1",
          title: "Inverting variable literals when determining the dual",
          wrongSnippet: "Dual of (A + B'C) written as (A' · (B + C'))",
          correctSnippet: "Dual of (A + B'C) is A · (B' + C)",
          explanation: "Students frequently confuse the Dual of an expression with its De Morgan Complement. The Principle of Duality states that only operators (+ and ·) and constants (0 and 1) are interchanged. Variable literals must never be complemented when finding the dual."
        },
        {
          id: "mistake-2",
          title: "Rejecting the second distributive law as invalid",
          wrongSnippet: "Assuming x + yz = (x+y)(x+z) is an algebraic typo",
          correctSnippet: "Recognizing that + distributes over · in Boolean algebra",
          explanation: "In high school ordinary algebra, x + yz != (x+y)(x+z). In Boolean algebra, this identity is completely valid and follows directly from Huntington Postulate 4(b). It is one of the most frequently tested properties in engineering exams."
        },
        {
          id: "mistake-3",
          title: "Omitting parentheses when writing dual product terms",
          wrongSnippet: "Dual of (AB + CD) written as A + B · C + D",
          correctSnippet: "Dual of (AB + CD) written as (A + B) · (C + D)",
          explanation: "In the original expression AB + CD, the products bind more tightly than the sum. In the dual, the addition terms must bind more tightly than the multiplication, requiring explicit parentheses: (A + B)(C + D). Without parentheses, A + B · C + D means A + (B · C) + D by operator precedence."
        },
        {
          id: "mistake-4",
          title: "Confusing Boolean addition with binary arithmetic addition",
          wrongSnippet: "Thinking 1 + 1 = 10 (binary 2)",
          correctSnippet: "In Boolean algebra, 1 + 1 = 1",
          explanation: "In binary arithmetic (Unit 1), + denotes numerical addition with carry (1 + 1 = 10_2). In Boolean algebra (Unit 2), + denotes logical disjunction (OR). If input A is HIGH and input B is HIGH, the OR gate output is HIGH (1 + 1 = 1)."
        },
        {
          id: "mistake-5",
          title: "Evaluating OR operations before AND operations",
          wrongSnippet: "Evaluating A + B · C as (A + B) · C",
          correctSnippet: "Evaluating A + B · C as A + (B · C)",
          explanation: "Unless forced by parentheses, the logical AND operation has higher precedence than logical OR. Never add before multiplying."
        }
      ],

      examRevisionSummary: {
        title: "Huntington Postulates Quick Revision Matrix",
        headers: ["Postulate", "Part (a): OR (+)", "Part (b): AND (·)", "Dual Relationship"],
        postulatesTable: [
          ["Closure (P1)", "x + y in B", "x · y in B", "Closed under both operations"],
          ["Identity (P2)", "x + 0 = x", "x · 1 = x", "0 is OR identity, 1 is AND identity"],
          ["Commutative (P3)", "x + y = y + x", "x · y = y · x", "Symmetric under input swap"],
          ["Distributive (P4)", "x + yz = (x+y)(x+z)", "x(y+z) = xy + xz", "Mutual distributivity"],
          ["Complement (P5)", "x + x' = 1", "x · x' = 0", "Sums to 1, products to 0"],
          ["Distinct (P6)", "x != y", "0 != 1", "Non-trivial binary system"]
        ],
        dualityChecklist: [
          "Step 1: Replace every + with ·",
          "Step 2: Replace every · with +",
          "Step 3: Replace every constant 0 with 1, and 1 with 0",
          "Step 4: Keep all variable literals (x, y', etc.) exactly as they appear",
          "Step 5: Enclose transformed sum groups in parentheses so multiplication does not steal precedence"
        ]
      },

      practiceQuestions: [
        {
          id: "q1",
          questionNumber: 1,
          type: "Short Answer",
          difficulty: "Foundation",
          question: "State the Huntington Postulates of Boolean Algebra and identify the specific postulate that distinguishes Boolean algebra from ordinary elementary algebra.",
          solution: "The Huntington Postulates define a Boolean algebra (B, +, ·, ', 0, 1): (1) Closure under + and ·; (2) Identity elements 0 for + and 1 for ·; (3) Commutative laws for + and ·; (4) Distributive laws: x(y+z) = xy + xz and x + yz = (x+y)(x+z); (5) Complement elements: x + x' = 1 and x · x' = 0; (6) Distinct elements: at least two distinct elements (0 != 1). The specific postulate distinguishing Boolean algebra from ordinary algebra is Postulate 4(b): Distributivity of addition over multiplication, x + yz = (x+y)(x+z), which is universally false in ordinary arithmetic."
        },
        {
          id: "q2",
          questionNumber: 2,
          type: "Problem Solving",
          difficulty: "Standard",
          question: "Determine the dual of the Boolean expression: F = (A' + B)(C + D') + E · 0.",
          solution: "To find the dual, swap + with ·, · with +, and 0 with 1 while keeping variable literals unchanged:\n1. Term 1: (A' + B) becomes (A' · B) = A'B\n2. Term 2: (C + D') becomes (C · D') = CD'\n3. Outer product between Term 1 and Term 2 becomes addition: A'B + CD'\n4. Outer addition with the third term becomes multiplication: (A'B + CD') · [Dual of (E · 0)]\n5. Term 3: (E · 0) becomes (E + 1)\nCombining these with proper grouping: Dual(F) = (A'B + CD')(E + 1)."
        },
        {
          id: "q3",
          questionNumber: 3,
          type: "Conceptual Distinction",
          difficulty: "Standard",
          question: "Distinguish between the Dual of a Boolean function and the Complement of a Boolean function. Illustrate with F = x + y'z.",
          solution: "Dual vs. Complement:\n(1) The Dual of a function is formed by swapping + with ·, and 0 with 1, while leaving all variable literals unchanged. For F = x + y'z, the dual is Dual(F) = x · (y' + z) = x(y' + z).\n(2) The Complement of a function is formed by inverting the entire function using De Morgan's Laws: F' = (x + y'z)' = x' · (y'z)' = x'(y'' + z') = x'(y + z'). Notice that the variables themselves become inverted in the complement, whereas in the dual, y' remains y'."
        },
        {
          id: "q4",
          questionNumber: 4,
          type: "Proof by Perfect Induction",
          difficulty: "Analytical",
          question: "Prove by perfect induction (truth table) that x · (x + y) = x (The Absorption Law 1 Dual).",
          solution: "Construct the truth table for two variables x and y (2^2 = 4 rows):\nRow 1: x=0, y=0 -> x+y = 0 -> x·(x+y) = 0·0 = 0 (Matches x=0)\nRow 2: x=0, y=1 -> x+y = 1 -> x·(x+y) = 0·1 = 0 (Matches x=0)\nRow 3: x=1, y=0 -> x+y = 1 -> x·(x+y) = 1·1 = 1 (Matches x=1)\nRow 4: x=1, y=1 -> x+y = 1 -> x·(x+y) = 1·1 = 1 (Matches x=1)\nSince column x·(x+y) is [0, 0, 1, 1], which matches column x identically across all four valuations, the theorem is proved universally."
        },
        {
          id: "q5",
          questionNumber: 5,
          type: "Expression Evaluation",
          difficulty: "Standard",
          question: "Given F(A, B, C) = (A + B')(B + C') + A'C, evaluate the exact value of F for A = 1, B = 0, C = 1.",
          solution: "Given A = 1, B = 0, C = 1:\n1. Compute complements: A' = 0, B' = 1, C' = 0.\n2. Evaluate first sum term: (A + B') = (1 + 1) = 1.\n3. Evaluate second sum term: (B + C') = (0 + 0) = 0.\n4. Evaluate their product: (A + B')(B + C') = 1 · 0 = 0.\n5. Evaluate third term: A'C = 0 · 1 = 0.\n6. Evaluate final outer OR sum: F = 0 + 0 = 0.\nFinal Result: F(1, 0, 1) = 0."
        },
        {
          id: "q6",
          questionNumber: 6,
          type: "Error Diagnosis",
          difficulty: "Exam Trap",
          question: "A student writes the dual of x + yz as x'(y' + z'). Identify the conceptual errors committed and state the correct dual expression.",
          solution: "Errors committed by the student:\n1. Literal Inversion Error: The student complemented variable x into x', y into y', and z into z'. The Principle of Duality strictly forbids complementing variable literals.\n2. Confusing Dual with Complement: The student took the complement of the dual or misapplied De Morgan's theorem.\nCorrect Dual Formulation: Swap the outer + with ·, and the inner product yz with sum (y + z). Keep all literals unchanged: Correct Dual = x · (y + z) = x(y + z)."
        }
      ]
    },

    {
      id: "2.2",
      number: "2.2",
      title: "Basic Theorems, Properties & Algebraic Simplification",
      badge: "Core Algebraic Tool",
      status: "Planned",
      estimatedReadTime: "15 min read",
      summary: "Idempotency, dominance, involution, absorption theorems, consensus theorem, De Morgan laws for n-variables, and systematic step-by-step algebraic reduction of complex Boolean expressions."
    },
    {
      id: "2.3",
      number: "2.3",
      title: "Boolean Functions, Truth Tables & Gate-Level Realization",
      badge: "Schematic Synthesis",
      status: "Planned",
      estimatedReadTime: "12 min read",
      summary: "Representation of switching functions, multi-output networks, standard gate symbols, logic circuit schematic synthesis, and timing evaluation."
    },
    {
      id: "2.4",
      number: "2.4",
      title: "Canonical & Standard Forms (Minterms, Maxterms, SOP, POS)",
      badge: "Mathematical Standard",
      status: "Planned",
      estimatedReadTime: "15 min read",
      summary: "Minterm (m_i) and Maxterm (M_i) algebra, canonical sum of minterms (Sigma m), canonical product of maxterms (Pi M), conversion algorithms, and standard vs non-standard forms."
    },
    {
      id: "2.5",
      number: "2.5",
      title: "The Map Method: Two- and Three-Variable K-Maps",
      badge: "Visual Minimization",
      status: "Planned",
      estimatedReadTime: "15 min read",
      summary: "Karnaugh Map geometric topography, Gray code adjacency, cell grouping rules (singletons, pairs, quads, octets), 3-variable grid mapping, and minimal SOP/POS extraction."
    },
    {
      id: "2.6",
      number: "2.6",
      title: "Four-Variable K-Maps, Don't-Care Conditions & Prime Implicants",
      badge: "Optimization Core",
      status: "Planned",
      estimatedReadTime: "18 min read",
      summary: "16-cell 4-variable K-Maps, corner quads, prime implicants (PI), essential prime implicants (EPI), incompletely specified functions with don't-care conditions (d), and static hazard awareness."
    },
    {
      id: "2.7",
      number: "2.7",
      title: "Universal Gate Realization (NAND/NOR) & Exclusive-OR Logic",
      badge: "Hardware Synthesis",
      status: "Planned",
      estimatedReadTime: "15 min read",
      summary: "Two-level NAND-NAND and NOR-NOR network synthesis, bubble pushing methodologies, XOR/XNOR realizations with minimal gate counts, and parity generation networks."
    }
  ]
};

export default dldUnit2Master;
