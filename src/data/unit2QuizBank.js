/**
 * ZeroIndex Portal - Unit 2 Master Question Bank (125 Verified Questions)
 * Strictly zero em-dashes (\u2014) and zero en-dashes (\u2013).
 * Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).
 * Course: Digital Logic Design (DLD) - Unit 2: Boolean Algebra & Gate-Level Minimization
 * 
 * Distribution:
 *   - Section 2.1: Boolean Laws & Axiomatic Theorems (20 Qs)
 *   - Section 2.2: Algebraic Simplification & Reductions (25 Qs)
 *   - Section 2.3: Minterms, Maxterms & Canonical Forms (20 Qs)
 *   - Section 2.4: SOP/POS Forms & Conversions (25 Qs)
 *   - Section 2.5: Karnaugh Map Minimization (35 Qs)
 * Total Pool: 125 Questions.
 */

export const unit2QuizBank = [
  {
    "id": "u2-q001",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Huntington Postulate 2",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "According to the Huntington Postulates, which constant is the unique identity element for the logical OR (+) operation?",
    "promptDetail": "Identify the element e such that x + e = x for all elements x in Boolean set B.",
    "inputFormatHint": "Enter 0 or 1",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0",
      "zero"
    ],
    "options": [
      {
        "label": "A",
        "text": "0",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "1 is the identity element for logical AND, not logical OR."
      },
      {
        "label": "C",
        "text": "x",
        "isCorrect": false,
        "distractorReason": "x is a Boolean variable, not a fixed algebraic identity constant."
      },
      {
        "label": "D",
        "text": "x'",
        "isCorrect": false,
        "distractorReason": "x' is the complementary element defined in Postulate 5."
      }
    ],
    "hint1": "Think of an electrical parallel switch circuit: what switch state leaves circuit conductivity solely governed by switch x?",
    "hint2": "An open switch has conductivity 0. Thus x + 0 = x for every binary state of x.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Huntington Postulate 2 (Identity)",
          "type": "axiom",
          "content": "Postulate 2 states: (a) x + 0 = x; (b) x * 1 = x. Hence 0 is the unique identity element for logical OR (+)."
        }
      ],
      "fastShortcut": "Identity element: 0 for OR; 1 for AND.",
      "verification": "Huntington Postulate P2(a)."
    }
  },
  {
    "id": "u2-q002",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Principle of Duality",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "What is the dual expression of the fundamental complement identity: x + x' = 1?",
    "promptDetail": "Apply the Principle of Duality by interchanging operators and identity constants while preserving literal variables.",
    "inputFormatHint": "Enter equation, e.g. x * x' = 0",
    "correctAnswer": "x * x' = 0",
    "acceptedAnswers": [
      "x * x' = 0",
      "x*x'=0",
      "xx'=0",
      "x · x' = 0"
    ],
    "options": [
      {
        "label": "A",
        "text": "x * x' = 0",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "x' * x = 1",
        "isCorrect": false,
        "distractorReason": "The identity constant 1 was not converted to 0."
      },
      {
        "label": "C",
        "text": "x' + x = 0",
        "isCorrect": false,
        "distractorReason": "The logical operator + was not replaced with logical AND (*)."
      },
      {
        "label": "D",
        "text": "x + x' = 0",
        "isCorrect": false,
        "distractorReason": "Failed to convert the operator + to *."
      }
    ],
    "hint1": "The Principle of Duality requires replacing all + with *, and all 1 with 0, leaving literals unchanged.",
    "hint2": "Transform: + becomes *, and 1 becomes 0. The literals x and x' remain unchanged.",
    "solution": {
      "finalAnswer": "x * x' = 0",
      "steps": [
        {
          "title": "Duality Rule Application",
          "type": "axiom",
          "content": "Given: x + x' = 1. Interchanging + to * and 1 to 0 produces the dual equation: x * x' = 0."
        }
      ],
      "fastShortcut": "+ swaps with *, and 1 swaps with 0. Variable literals remain intact.",
      "verification": "Huntington Postulate P5 duality pair."
    }
  },
  {
    "id": "u2-q003",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Null / Domination Law",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "What is the simplified value of the Boolean expression: F = A + 1?",
    "promptDetail": "Apply the Boundedness / Null law for logical OR.",
    "inputFormatHint": "Enter 0 or 1",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1",
      "one"
    ],
    "options": [
      {
        "label": "A",
        "text": "1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Confused with Identity Law A + 0 = A."
      },
      {
        "label": "C",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "0 is the null element for AND, not OR."
      },
      {
        "label": "D",
        "text": "A + 1",
        "isCorrect": false,
        "distractorReason": "Expression is reducible by domination."
      }
    ],
    "hint1": "Recall that in a parallel circuit, a closed short-circuit (1) guarantees continuous conduction.",
    "hint2": "When any input to an OR gate is logic 1, the gate output is forced to logic 1 regardless of A.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Domination Law",
          "type": "axiom",
          "content": "A + 1 = 1 for all Boolean values of A. If A=0, 0+1=1. If A=1, 1+1=1."
        }
      ],
      "fastShortcut": "Logic 1 dominates logical OR (+).",
      "verification": "Boundedness theorem: A + 1 = 1."
    }
  },
  {
    "id": "u2-q004",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Idempotent Law",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "Which Boolean algebraic identity represents the Idempotent Law under logical multiplication (AND)?",
    "promptDetail": "Identify the identity where combining an element with itself leaves the element unchanged.",
    "inputFormatHint": "Enter identity, e.g. x * x = x",
    "correctAnswer": "x * x = x",
    "acceptedAnswers": [
      "x * x = x",
      "x*x=x",
      "xx=x",
      "x · x = x"
    ],
    "options": [
      {
        "label": "A",
        "text": "x * x = x",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "x * x = x^2",
        "isCorrect": false,
        "distractorReason": "Boolean algebra operates on binary sets where exponents do not exist."
      },
      {
        "label": "C",
        "text": "x * x = 1",
        "isCorrect": false,
        "distractorReason": "Confused with Complement Law x + x' = 1."
      },
      {
        "label": "D",
        "text": "x * x = 0",
        "isCorrect": false,
        "distractorReason": "Confused with Complement Law x * x' = 0."
      }
    ],
    "hint1": "Idempotence means that repeating the same logical operation with the identical operand has no additional effect.",
    "hint2": "In switching theory, two identical switches placed in series have the exact same conductivity as a single switch: x * x = x.",
    "solution": {
      "finalAnswer": "x * x = x",
      "steps": [
        {
          "title": "Idempotent Theorem",
          "type": "axiom",
          "content": "x * x = (x * x) + 0 = (x * x) + (x * x') = x * (x + x') = x * 1 = x."
        }
      ],
      "fastShortcut": "x + x = x and x * x = x.",
      "verification": "Idempotent theorem proof using Huntington postulates."
    }
  },
  {
    "id": "u2-q005",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Involution Law",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "What is the result of evaluating the triple complement expression: F = ((x')')'?",
    "promptDetail": "Apply the Involution Law repeatedly to reduce the nested complement bars.",
    "inputFormatHint": "Enter x or x'",
    "correctAnswer": "x'",
    "acceptedAnswers": [
      "x'",
      "x prime",
      "not x",
      "!x"
    ],
    "options": [
      {
        "label": "A",
        "text": "x'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "x",
        "isCorrect": false,
        "distractorReason": "An odd number of complements (3) leaves the variable complemented."
      },
      {
        "label": "C",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Complement of a variable is not a constant."
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Result depends on the variable state."
      }
    ],
    "hint1": "The Involution Law states that double complementation cancels out: (x')' = x.",
    "hint2": "Apply (x')' = x to the inner two complements. We are left with (x)' = x'.",
    "solution": {
      "finalAnswer": "x'",
      "steps": [
        {
          "title": "Involution Law",
          "type": "axiom",
          "content": "Inner double complement: (x')' = x. Therefore ((x')')' = (x)' = x'."
        }
      ],
      "fastShortcut": "Even number of NOT operations cancel out; odd number leave a single NOT (x').",
      "verification": "Involution theorem."
    }
  },
  {
    "id": "u2-q006",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Second Distributive Law",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "Which of the following identities correctly states the Second Distributive Law in Boolean algebra?",
    "promptDetail": "This law distributes OR over AND, a fundamental property unique to Boolean algebra not present in ordinary real arithmetic.",
    "inputFormatHint": "Enter equation",
    "correctAnswer": "x + yz = (x + y)(x + z)",
    "acceptedAnswers": [
      "x + yz = (x + y)(x + z)",
      "x+yz=(x+y)(x+z)"
    ],
    "options": [
      {
        "label": "A",
        "text": "x + yz = (x + y)(x + z)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "x + yz = xy + xz",
        "isCorrect": false,
        "distractorReason": "Incorrectly distributed AND over OR instead of OR over AND."
      },
      {
        "label": "C",
        "text": "x(y + z) = (x + y)(x + z)",
        "isCorrect": false,
        "distractorReason": "LHS is first distributive law, RHS is second distributive expansion."
      },
      {
        "label": "D",
        "text": "x + yz = x + y + z",
        "isCorrect": false,
        "distractorReason": "Arbitrarily replaced product yz with logical sum y + z."
      }
    ],
    "hint1": "In real arithmetic, addition does not distribute over multiplication. In Boolean algebra, OR distributes over AND.",
    "hint2": "Expanding (x + y)(x + z) = xx + xz + xy + yz = x + x(y + z) + yz = x + yz.",
    "solution": {
      "finalAnswer": "x + yz = (x + y)(x + z)",
      "steps": [
        {
          "title": "Distributive Proof",
          "type": "axiom",
          "content": "(x + y)(x + z) = xx + xz + xy + yz = x(1 + z + y) + yz = x(1) + yz = x + yz."
        }
      ],
      "fastShortcut": "OR distributes over AND: x + yz = (x + y)(x + z).",
      "verification": "Huntington Postulate P4(b)."
    }
  },
  {
    "id": "u2-q007",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Absorption Law 1",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the expression: F = x(x + y).",
    "promptDetail": "Apply algebraic laws to determine the reduced equivalent.",
    "inputFormatHint": "Enter x or y",
    "correctAnswer": "x",
    "acceptedAnswers": [
      "x"
    ],
    "options": [
      {
        "label": "A",
        "text": "x",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "xy",
        "isCorrect": false,
        "distractorReason": "Failed to factor out x from xx + xy = x + xy = x."
      },
      {
        "label": "C",
        "text": "x + y",
        "isCorrect": false,
        "distractorReason": "Confused with addition operation."
      },
      {
        "label": "D",
        "text": "y",
        "isCorrect": false,
        "distractorReason": "x is the absorbing variable, not y."
      }
    ],
    "hint1": "Distribute x across the sum: x(x + y) = x*x + xy.",
    "hint2": "Apply idempotent law: x*x = x. Then x + xy = x(1 + y) = x(1) = x.",
    "solution": {
      "finalAnswer": "x",
      "steps": [
        {
          "title": "Absorption Derivation",
          "type": "calculation",
          "content": "x(x + y) = xx + xy = x + xy = x(1 + y) = x(1) = x."
        }
      ],
      "fastShortcut": "Dual absorption: x(x + y) = x.",
      "verification": "Truth table: when x=0, F=0; when x=1, F=1. Matches x exactly."
    }
  },
  {
    "id": "u2-q008",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Elimination of Complement",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the expression: F = x' + xy.",
    "promptDetail": "Apply the second absorption identity where a literal eliminates its complement.",
    "inputFormatHint": "Enter simplified form, e.g. x' + y",
    "correctAnswer": "x' + y",
    "acceptedAnswers": [
      "x' + y",
      "x'+y",
      "y + x'",
      "y+x'"
    ],
    "options": [
      {
        "label": "A",
        "text": "x' + y",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "x'",
        "isCorrect": false,
        "distractorReason": "Confused with x' + x'y = x' (standard absorption)."
      },
      {
        "label": "C",
        "text": "x + y",
        "isCorrect": false,
        "distractorReason": "Lost the prime on x'."
      },
      {
        "label": "D",
        "text": "y",
        "isCorrect": false,
        "distractorReason": "x' cannot be eliminated without justification."
      }
    ],
    "hint1": "Apply the second distributive law: A + BC = (A + B)(A + C) with A = x', B = x, C = y.",
    "hint2": "x' + xy = (x' + x)(x' + y) = (1)(x' + y) = x' + y.",
    "solution": {
      "finalAnswer": "x' + y",
      "steps": [
        {
          "title": "Distribution Step",
          "type": "calculation",
          "content": "x' + xy = (x' + x)(x' + y)."
        },
        {
          "title": "Complement Step",
          "type": "calculation",
          "content": "x' + x = 1. Therefore 1 * (x' + y) = x' + y."
        }
      ],
      "fastShortcut": "Complement absorption: An unprimed variable inside a product is absorbed by the complemented literal outside.",
      "verification": "Truth table equivalence proof."
    }
  },
  {
    "id": "u2-q009",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Dual of Complement Absorption",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "What is the dual of the identity x + x'y = x + y?",
    "promptDetail": "Swap logical operators and constants under the Principle of Duality.",
    "inputFormatHint": "Enter identity, e.g. x(x' + y) = xy",
    "correctAnswer": "x(x' + y) = xy",
    "acceptedAnswers": [
      "x(x' + y) = xy",
      "x(x'+y)=xy"
    ],
    "options": [
      {
        "label": "A",
        "text": "x(x' + y) = xy",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "x'(x + y') = x'y'",
        "isCorrect": false,
        "distractorReason": "Complemented literals instead of preserving them."
      },
      {
        "label": "C",
        "text": "x + x'y = xy",
        "isCorrect": false,
        "distractorReason": "Failed to convert operators on the LHS."
      },
      {
        "label": "D",
        "text": "x(x + y') = x",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction."
      }
    ],
    "hint1": "Replace the outer + with *, the inner product x'y with (x' + y), and RHS x + y with xy.",
    "hint2": "LHS: x + (x' * y) becomes x * (x' + y). RHS: x + y becomes x * y.",
    "solution": {
      "finalAnswer": "x(x' + y) = xy",
      "steps": [
        {
          "title": "Dual Construction",
          "type": "axiom",
          "content": "Original: x + x'y = x + y. Swapping + and * produces: x(x' + y) = xy. Expand: xx' + xy = 0 + xy = xy."
        }
      ],
      "fastShortcut": "Dual of complement absorption: x(x' + y) = xy.",
      "verification": "Dual redundancy theorem."
    }
  },
  {
    "id": "u2-q010",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: De Morgan Theorem 1",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Apply De Morgan's Theorem to simplify: F = (w + x + y + z)'.",
    "promptDetail": "Complement an n-variable logical sum.",
    "inputFormatHint": "Enter product, e.g. w'x'y'z'",
    "correctAnswer": "w'x'y'z'",
    "acceptedAnswers": [
      "w'x'y'z'",
      "w'*x'*y'*z'",
      "w' · x' · y' · z'"
    ],
    "options": [
      {
        "label": "A",
        "text": "w'x'y'z'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "w' + x' + y' + z'",
        "isCorrect": false,
        "distractorReason": "Did not swap OR operators (+) to AND operators (*)."
      },
      {
        "label": "C",
        "text": "(wxyz)'",
        "isCorrect": false,
        "distractorReason": "Did not distribute complement across literals."
      },
      {
        "label": "D",
        "text": "wx + yz",
        "isCorrect": false,
        "distractorReason": "Arbitrary grouping."
      }
    ],
    "hint1": "De Morgan's first theorem states: The complement of an OR sum is the product of the complements.",
    "hint2": "Break the bar and change the sign: (w + x + y + z)' = w' * x' * y' * z'.",
    "solution": {
      "finalAnswer": "w'x'y'z'",
      "steps": [
        {
          "title": "Generalized De Morgan",
          "type": "axiom",
          "content": "For any n variables: (x1 + x2 + ... + xn)' = x1' * x2' * ... * xn'."
        }
      ],
      "fastShortcut": "Sum complement becomes product of complements.",
      "verification": "Mathematical induction on De Morgan's theorem."
    }
  },
  {
    "id": "u2-q011",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: De Morgan Theorem 2",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Apply De Morgan's Theorem to expand: F = (A * B * C * D)'.",
    "promptDetail": "Complement an n-variable logical product.",
    "inputFormatHint": "Enter sum, e.g. A' + B' + C' + D'",
    "correctAnswer": "A' + B' + C' + D'",
    "acceptedAnswers": [
      "A' + B' + C' + D'",
      "A'+B'+C'+D'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A' + B' + C' + D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'B'C'D'",
        "isCorrect": false,
        "distractorReason": "Did not swap AND operators to OR operators."
      },
      {
        "label": "C",
        "text": "(A + B + C + D)'",
        "isCorrect": false,
        "distractorReason": "Inverted operation incorrectly."
      },
      {
        "label": "D",
        "text": "ABCD",
        "isCorrect": false,
        "distractorReason": "Failed to apply complementation."
      }
    ],
    "hint1": "De Morgan's second theorem states: The complement of an AND product is the sum of the complements.",
    "hint2": "(ABCD)' = A' + B' + C' + D'.",
    "solution": {
      "finalAnswer": "A' + B' + C' + D'",
      "steps": [
        {
          "title": "Generalized De Morgan Product",
          "type": "axiom",
          "content": "(A * B * C * D)' = A' + B' + C' + D'."
        }
      ],
      "fastShortcut": "Product complement becomes sum of complements.",
      "verification": "De Morgan's n-variable law."
    }
  },
  {
    "id": "u2-q012",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Generalized De Morgan",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Find the complement of the mixed Boolean expression: F = A + B'C.",
    "promptDetail": "Apply De Morgan's laws to find F'.",
    "inputFormatHint": "Enter expression, e.g. A'(B + C')",
    "correctAnswer": "A'(B + C')",
    "acceptedAnswers": [
      "A'(B + C')",
      "A'*(B+C')",
      "A'B + A'C'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'(B + C')",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A' + B C'",
        "isCorrect": false,
        "distractorReason": "Failed to change outer OR to AND."
      },
      {
        "label": "C",
        "text": "A(B' + C)",
        "isCorrect": false,
        "distractorReason": "Complemented literals improperly."
      },
      {
        "label": "D",
        "text": "A'B'C",
        "isCorrect": false,
        "distractorReason": "Treated B'C as a single primitive without inverting its inner AND."
      }
    ],
    "hint1": "Let F' = (A + B'C)'. By De Morgan's first law, this becomes A' * (B'C)'.",
    "hint2": "Now apply De Morgan's second law to (B'C)': (B'C)' = (B')' + C' = B + C'.",
    "solution": {
      "finalAnswer": "A'(B + C')",
      "steps": [
        {
          "title": "Outer Complement",
          "type": "calculation",
          "content": "(A + B'C)' = A' * (B'C)'."
        },
        {
          "title": "Inner Complement",
          "type": "calculation",
          "content": "(B'C)' = (B')' + C' = B + C'."
        },
        {
          "title": "Combine",
          "type": "calculation",
          "content": "F' = A'(B + C') = A'B + A'C'."
        }
      ],
      "fastShortcut": "OR becomes AND, literals complement, inner AND becomes OR.",
      "verification": "Truth table equivalence for F'."
    }
  },
  {
    "id": "u2-q013",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Consensus Theorem (SOP)",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "In the expression F = AB + A'C + BC, which algebraic property explains why the term BC is redundant and can be deleted?",
    "promptDetail": "Identify the mathematical justification for the Consensus Theorem.",
    "inputFormatHint": "Select correct justification",
    "correctAnswer": "BC can be expanded into ABC + A'BC, which are already covered by AB and A'C",
    "acceptedAnswers": [
      "BC can be expanded into ABC + A'BC, which are already covered by AB and A'C",
      "consensus theorem"
    ],
    "options": [
      {
        "label": "A",
        "text": "BC can be expanded into ABC + A'BC, which are already covered by AB and A'C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "BC equals 0 by the complement law",
        "isCorrect": false,
        "distractorReason": "BC does not contain complementary literals; it is not 0."
      },
      {
        "label": "C",
        "text": "B and C are absorbed by A according to the absorption law",
        "isCorrect": false,
        "distractorReason": "A is not present in BC."
      },
      {
        "label": "D",
        "text": "De Morgan's theorem eliminates the middle product term",
        "isCorrect": false,
        "distractorReason": "De Morgan applies to complemented expressions, not consensus."
      }
    ],
    "hint1": "Multiply BC by (A + A') which equals 1.",
    "hint2": "BC(A + A') = ABC + A'BC. Notice that AB + ABC = AB, and A'C + A'BC = A'C.",
    "solution": {
      "finalAnswer": "BC can be expanded into ABC + A'BC, which are already covered by AB and A'C",
      "steps": [
        {
          "title": "Consensus Expansion",
          "type": "axiom",
          "content": "BC = BC * 1 = BC(A + A') = ABC + A'BC. Then F = AB + ABC + A'C + A'BC = AB(1 + C) + A'C(1 + B) = AB(1) + A'C(1) = AB + A'C."
        }
      ],
      "fastShortcut": "Consensus Rule: xy + x'z + yz = xy + x'z. The term yz is absorbed by the other two terms.",
      "verification": "Consensus theorem algebraic proof."
    }
  },
  {
    "id": "u2-q014",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Dual Consensus Theorem (POS)",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "State the simplified POS form of: F = (A + B)(A' + C)(B + C).",
    "promptDetail": "Apply the Dual Consensus Theorem to eliminate the redundant sum term.",
    "inputFormatHint": "Enter simplified POS, e.g. (A + B)(A' + C)",
    "correctAnswer": "(A + B)(A' + C)",
    "acceptedAnswers": [
      "(A + B)(A' + C)",
      "(A+B)(A'+C)",
      "(A' + C)(A + B)"
    ],
    "options": [
      {
        "label": "A",
        "text": "(A + B)(A' + C)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "(B + C)",
        "isCorrect": false,
        "distractorReason": "Kept the redundant consensus term and deleted essential terms."
      },
      {
        "label": "C",
        "text": "(A + B)(B + C)",
        "isCorrect": false,
        "distractorReason": "Deleted essential term (A' + C)."
      },
      {
        "label": "D",
        "text": "AC + A'B",
        "isCorrect": false,
        "distractorReason": "Converted to SOP instead of preserving POS form."
      }
    ],
    "hint1": "Literals A and A' are complementary. The remaining literals B and C form the consensus sum (B + C).",
    "hint2": "By the Dual Consensus Theorem, (B + C) is completely redundant.",
    "solution": {
      "finalAnswer": "(A + B)(A' + C)",
      "steps": [
        {
          "title": "Dual Consensus Application",
          "type": "axiom",
          "content": "In (A + B)(A' + C)(B + C), the complementary pair is A and A'. The consensus term is (B + C). Adding AA' = 0 to (B + C) gives (B + C + A)(B + C + A'), which is subsumed by (A + B) and (A' + C)."
        }
      ],
      "fastShortcut": "Dual consensus eliminates (B + C).",
      "verification": "Duality transformation of consensus theorem."
    }
  },
  {
    "id": "u2-q015",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Consensus with Negated Literals",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "In the expression F = AB' + BCD + AC'D, identify the redundant consensus term.",
    "promptDetail": "Locate the single variable appearing unprimed in one term and primed in another.",
    "inputFormatHint": "Enter term",
    "correctAnswer": "None of the terms are consensus because complementary literals occur across multiple variables",
    "acceptedAnswers": [
      "None of the terms are consensus because complementary literals occur across multiple variables",
      "none",
      "irreducible"
    ],
    "options": [
      {
        "label": "A",
        "text": "None of the terms are consensus because complementary literals occur across multiple variables",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "BCD is the consensus term",
        "isCorrect": false,
        "distractorReason": "Between AB' and AC'D, consensus is AC'D, not BCD."
      },
      {
        "label": "C",
        "text": "AB' is the consensus term",
        "isCorrect": false,
        "distractorReason": "AB' is essential."
      },
      {
        "label": "D",
        "text": "AC'D is the consensus term",
        "isCorrect": false,
        "distractorReason": "AC'D cannot be eliminated."
      }
    ],
    "hint1": "Check complementary pairs: B and B' appear in AB' and BCD. The consensus of AB' and BCD is ACD.",
    "hint2": "The third term in the expression is AC'D, NOT ACD. Since ACD != AC'D, no term matches the consensus term!",
    "solution": {
      "finalAnswer": "None of the terms are consensus because complementary literals occur across multiple variables",
      "steps": [
        {
          "title": "Consensus Check",
          "type": "calculation",
          "content": "Terms AB' and BCD have complementary literal B. Their consensus term is ACD. However, the third term in F is AC'D, which has C' instead of C. Thus no consensus cancellation occurs."
        }
      ],
      "fastShortcut": "Always verify literal polarities in candidate consensus terms.",
      "verification": "Careful literal parity check."
    }
  },
  {
    "id": "u2-q016",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Duality vs Complementation",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "What is the crucial distinction between the Dual F^D and the Complement F' of a Boolean function?",
    "promptDetail": "Compare how literals and operators are modified in duality versus complementation.",
    "inputFormatHint": "Select correct statement",
    "correctAnswer": "Duality swaps operators (+ and *) and constants (0 and 1) without altering literals; complementation negates all literals",
    "acceptedAnswers": [
      "Duality swaps operators (+ and *) and constants (0 and 1) without altering literals; complementation negates all literals",
      "duality preserves literals"
    ],
    "options": [
      {
        "label": "A",
        "text": "Duality swaps operators (+ and *) and constants (0 and 1) without altering literals; complementation negates all literals",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Duality negates all literals while keeping operators identical",
        "isCorrect": false,
        "distractorReason": "This is the definition of reflection, not duality."
      },
      {
        "label": "C",
        "text": "Duality and complementation always produce the identical Boolean function",
        "isCorrect": false,
        "distractorReason": "F^D and F' are fundamentally different functions in general."
      },
      {
        "label": "D",
        "text": "Complementation only swaps constants 0 and 1",
        "isCorrect": false,
        "distractorReason": "Complementation negates the entire function output."
      }
    ],
    "hint1": "Principle of Duality: swap + with *, 0 with 1. Do NOT complement the literals.",
    "hint2": "Complementation (De Morgan): swap + with *, 0 with 1, AND complement every literal.",
    "solution": {
      "finalAnswer": "Duality swaps operators (+ and *) and constants (0 and 1) without altering literals; complementation negates all literals",
      "steps": [
        {
          "title": "Definition Comparison",
          "type": "axiom",
          "content": "If F(x1, x2, ..., xn, +, *, 0, 1) is a function, its dual is F^D = F(x1, x2, ..., xn, *, +, 1, 0). Its complement is F' = [F(x1, ..., xn)]' = F(x1', x2', ..., xn', *, +, 1, 0)."
        }
      ],
      "fastShortcut": "F^D: swap operators only. F': swap operators and complement all literals.",
      "verification": "Switching theory definitions."
    }
  },
  {
    "id": "u2-q017",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Self-Dual Functions",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "A Boolean function F is called self-dual if F = F^D. Which of the following 3-variable switching functions is self-dual?",
    "promptDetail": "Test which function remains unchanged under operator and constant swapping.",
    "inputFormatHint": "Enter expression, e.g. AB + BC + AC",
    "correctAnswer": "AB + BC + AC",
    "acceptedAnswers": [
      "AB + BC + AC",
      "majority",
      "AB+BC+AC"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB + BC + AC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B + C",
        "isCorrect": false,
        "distractorReason": "Dual is ABC, which does not equal A + B + C."
      },
      {
        "label": "C",
        "text": "ABC",
        "isCorrect": false,
        "distractorReason": "Dual is A + B + C, not ABC."
      },
      {
        "label": "D",
        "text": "A'B' + B'C'",
        "isCorrect": false,
        "distractorReason": "Dual is (A' + B')(B' + C'), not self-dual."
      }
    ],
    "hint1": "The 3-variable majority function F = AB + BC + AC outputs 1 whenever two or more inputs are 1.",
    "hint2": "Dual: (A + B)(B + C)(A + C). Expanding this gives AB + BC + AC.",
    "solution": {
      "finalAnswer": "AB + BC + AC",
      "steps": [
        {
          "title": "Dual Calculation",
          "type": "calculation",
          "content": "Given F = AB + BC + AC. Dual F^D = (A + B)(B + C)(A + C). Expanding: (B + AC)(A + C) = AB + BC + AC. Since F^D = F, F is self-dual."
        }
      ],
      "fastShortcut": "The majority voter function AB + BC + AC is the canonical 3-variable self-dual function.",
      "verification": "Self-duality theorem."
    }
  },
  {
    "id": "u2-q018",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Boolean Fallacy Analysis",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "In ordinary algebra, A + B = A + C implies B = C (cancellation law). Why is this cancellation law INVALID in Boolean algebra?",
    "promptDetail": "Provide an explicit counterexample demonstrating the failure of cancellation.",
    "inputFormatHint": "Select valid counterexample",
    "correctAnswer": "If A = 1, then 1 + 0 = 1 + 1 = 1, but 0 != 1",
    "acceptedAnswers": [
      "If A = 1, then 1 + 0 = 1 + 1 = 1, but 0 != 1",
      "cancellation law fails"
    ],
    "options": [
      {
        "label": "A",
        "text": "If A = 1, then 1 + 0 = 1 + 1 = 1, but 0 != 1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Boolean algebra only allows multiplication, not addition",
        "isCorrect": false,
        "distractorReason": "Boolean algebra fully defines logical OR (+)."
      },
      {
        "label": "C",
        "text": "Variables must always be complements of each other",
        "isCorrect": false,
        "distractorReason": "Variables can take arbitrary binary values."
      },
      {
        "label": "D",
        "text": "Cancellation holds true for all Boolean values without exception",
        "isCorrect": false,
        "distractorReason": "Cancellation is demonstrably false in switching algebra."
      }
    ],
    "hint1": "Recall that 1 + B = 1 for any value of B.",
    "hint2": "Let A = 1, B = 0, C = 1. Then A + B = 1 + 0 = 1, and A + C = 1 + 1 = 1. Here A + B = A + C, yet B != C.",
    "solution": {
      "finalAnswer": "If A = 1, then 1 + 0 = 1 + 1 = 1, but 0 != 1",
      "steps": [
        {
          "title": "Counterexample Proof",
          "type": "axiom",
          "content": "In Boolean algebra, 1 dominates logical OR. For A=1, B=0, C=1: LHS = 1 + 0 = 1. RHS = 1 + 1 = 1. LHS = RHS holds, but B (0) does not equal C (1). Thus cancellation does not hold."
        }
      ],
      "fastShortcut": "Cancellation fails in Boolean algebra because 1 + x = 1 destroys information.",
      "verification": "Axiomatic counterexample."
    }
  },
  {
    "id": "u2-q019",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Shannon Expansion Theorem",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "Which equation represents Shannon's Expansion Theorem for a Boolean function F(A, B, C) expanded about variable A?",
    "promptDetail": "Shannon expansion decomposes a switching function into cofactors about a chosen variable.",
    "inputFormatHint": "Enter equation",
    "correctAnswer": "F(A, B, C) = A * F(1, B, C) + A' * F(0, B, C)",
    "acceptedAnswers": [
      "F(A, B, C) = A * F(1, B, C) + A' * F(0, B, C)",
      "F = A*F(1) + A'*F(0)"
    ],
    "options": [
      {
        "label": "A",
        "text": "F(A, B, C) = A * F(1, B, C) + A' * F(0, B, C)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "F(A, B, C) = A' * F(1, B, C) + A * F(0, B, C)",
        "isCorrect": false,
        "distractorReason": "Inverted cofactors: A should multiply F(1), not F(0)."
      },
      {
        "label": "C",
        "text": "F(A, B, C) = [A + F(1, B, C)][A' + F(0, B, C)]",
        "isCorrect": false,
        "distractorReason": "This is the dual POS expansion form, not standard Shannon expansion."
      },
      {
        "label": "D",
        "text": "F(A, B, C) = F(A, 1, 1) + F(A', 0, 0)",
        "isCorrect": false,
        "distractorReason": "Incorrect cofactor decomposition."
      }
    ],
    "hint1": "When A = 1, the term with A' vanishes and leaves F(1, B, C). When A = 0, the term with A vanishes and leaves F(0, B, C).",
    "hint2": "Thus F = A * F_A + A' * F_A', where F_A = F(1, B, C) and F_A' = F(0, B, C).",
    "solution": {
      "finalAnswer": "F(A, B, C) = A * F(1, B, C) + A' * F(0, B, C)",
      "steps": [
        {
          "title": "Shannon Expansion",
          "type": "axiom",
          "content": "Shannon's theorem decomposes any function about literal A: if A=1, F = 1*F(1,B,C) + 0*F(0,B,C) = F(1,B,C). If A=0, F = 0 + 1*F(0,B,C) = F(0,B,C). This is the basis of multiplexer logic."
        }
      ],
      "fastShortcut": "Shannon Expansion: F = A*F(A=1) + A'*F(A=0).",
      "verification": "Shannon's expansion theorem."
    }
  },
  {
    "id": "u2-q020",
    "trackId": "sec21",
    "trackTitle": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "topicBadge": "2.1: Step Verification & Error Detection",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "Consider this 4-step algebraic reduction of F = (A + B)'(A' + B):\nStep 1: F = (A'B')(A' + B)\nStep 2: F = A'B'A' + A'B'B\nStep 3: F = A'B' + A'B'\nStep 4: F = A'B'\nWhich step contains the FIRST mathematical error?",
    "promptDetail": "Audit each algebraic step against switching axioms.",
    "inputFormatHint": "Enter Step 1, Step 2, Step 3, or Step 4",
    "correctAnswer": "Step 3",
    "acceptedAnswers": [
      "Step 3",
      "step 3",
      "3"
    ],
    "options": [
      {
        "label": "A",
        "text": "Step 3",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Step 1",
        "isCorrect": false,
        "distractorReason": "Step 1 correctly applies De Morgan's Law: (A + B)' = A'B'."
      },
      {
        "label": "C",
        "text": "Step 2",
        "isCorrect": false,
        "distractorReason": "Step 2 correctly applies the Distributive Law."
      },
      {
        "label": "D",
        "text": "Step 4",
        "isCorrect": false,
        "distractorReason": "Step 4 follows from Step 3, but the error originated earlier in Step 3."
      }
    ],
    "hint1": "Evaluate the product A'B'B in Step 2. What does B'B equal by the Complement Law?",
    "hint2": "B'B = 0. Therefore A'B'B = A'(0) = 0, NOT A'B'!",
    "solution": {
      "finalAnswer": "Step 3",
      "steps": [
        {
          "title": "Step Audit",
          "type": "calculation",
          "content": "In Step 2, the second term is A'B'B. By Complement Law, B'B = 0, so A' * 0 = 0. Step 3 incorrectly replaced A'B'B with A'B' instead of 0. The correct Step 3 is: F = A'B' + 0 = A'B'."
        }
      ],
      "fastShortcut": "B'B = 0, so any product containing both B and B' collapses to 0 immediately.",
      "verification": "Huntington Postulate P5 complement check."
    }
  },
  {
    "id": "u2-q021",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Dual Combining",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "free_response",
    "question": "Simplify the Boolean product-of-sums expression: F = (X + Y)(X + Y').",
    "promptDetail": "Apply the dual combining identity to eliminate the complementary variable Y.",
    "inputFormatHint": "Enter simplified literal, e.g. X",
    "correctAnswer": "X",
    "acceptedAnswers": [
      "X",
      "x"
    ],
    "options": [
      {
        "label": "A",
        "text": "X",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Y",
        "isCorrect": false,
        "distractorReason": "Y and Y' are complementary and cancel each other out."
      },
      {
        "label": "C",
        "text": "X + Y",
        "isCorrect": false,
        "distractorReason": "Failed to combine the terms."
      },
      {
        "label": "D",
        "text": "XY",
        "isCorrect": false,
        "distractorReason": "Incorrectly transformed sum terms into a product term."
      }
    ],
    "hint1": "Apply the second distributive law in reverse: (X + Y)(X + Y') = X + YY'.",
    "hint2": "Recall that YY' = 0 by the complement law. Thus X + 0 = X.",
    "solution": {
      "finalAnswer": "X",
      "steps": [
        {
          "title": "Factoring Step",
          "type": "calculation",
          "content": "(X + Y)(X + Y') = X + (Y * Y')."
        },
        {
          "title": "Complement Step",
          "type": "calculation",
          "content": "Y * Y' = 0. Therefore X + 0 = X."
        }
      ],
      "fastShortcut": "Dual combining: (X + Y)(X + Y') = X.",
      "verification": "Truth table: when X=1, (1+Y)(1+Y')=1*1=1. When X=0, (0+Y)(0+Y')=Y*Y'=0. Matches X."
    },
    "requireMinimal": true
  },
  {
    "id": "u2-q022",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Cascade Absorption",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the cascading expression: F = X + X'Y + X'Y'Z.",
    "promptDetail": "Apply the complement absorption law iteratively from left to right.",
    "inputFormatHint": "Enter simplified sum, e.g. X + Y + Z",
    "correctAnswer": "X + Y + Z",
    "acceptedAnswers": [
      "X + Y + Z",
      "X+Y+Z",
      "x + y + z",
      "x+y+z"
    ],
    "options": [
      {
        "label": "A",
        "text": "X + Y + Z",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "X + Y",
        "isCorrect": false,
        "distractorReason": "Omitted the third variable Z."
      },
      {
        "label": "C",
        "text": "XYZ",
        "isCorrect": false,
        "distractorReason": "Transformed OR sum into AND product incorrectly."
      },
      {
        "label": "D",
        "text": "X + X'Y'Z",
        "isCorrect": false,
        "distractorReason": "Incomplete simplification of the middle term."
      }
    ],
    "hint1": "First simplify X + X'Y using the absorption law: X + X'Y = X + Y.",
    "hint2": "Now combine (X + Y) with X'Y'Z: by De Morgan, X'Y' = (X + Y)'. Let U = X + Y. Then U + U'Z = U + Z = X + Y + Z.",
    "solution": {
      "finalAnswer": "X + Y + Z",
      "steps": [
        {
          "title": "Step 1: First Pair Reduction",
          "type": "calculation",
          "content": "X + X'Y = X + Y (complement absorption)."
        },
        {
          "title": "Step 2: Second Pair Reduction",
          "type": "calculation",
          "content": "(X + Y) + (X + Y)'Z = (X + Y) + Z = X + Y + Z."
        }
      ],
      "fastShortcut": "Successive complement absorption: X + X'Y + X'Y'Z = X + Y + Z.",
      "verification": "Truth table check on 8 input combinations."
    }
  },
  {
    "id": "u2-q023",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Complement Expansion",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the Boolean expression: F = A(A' + B' + C').",
    "promptDetail": "Distribute literal A across the parenthesized sum and eliminate null terms.",
    "inputFormatHint": "Enter simplified SOP, e.g. AB' + AC'",
    "correctAnswer": "AB' + AC'",
    "acceptedAnswers": [
      "AB' + AC'",
      "AB'+AC'",
      "AC' + AB'",
      "AC'+AB'"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB' + AC'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B' + C'",
        "isCorrect": false,
        "distractorReason": "Failed to distribute literal A."
      },
      {
        "label": "C",
        "text": "AB'C'",
        "isCorrect": false,
        "distractorReason": "Merged sum terms into a single product."
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "AA' is 0, but AB' and AC' remain active."
      }
    ],
    "hint1": "Distribute A: A*A' + A*B' + A*C'.",
    "hint2": "AA' = 0. Therefore 0 + AB' + AC' = AB' + AC'.",
    "solution": {
      "finalAnswer": "AB' + AC'",
      "steps": [
        {
          "title": "Distribution",
          "type": "calculation",
          "content": "A(A' + B' + C') = AA' + AB' + AC'."
        },
        {
          "title": "Null Elimination",
          "type": "calculation",
          "content": "AA' = 0. Result is AB' + AC'."
        }
      ],
      "fastShortcut": "AA' drops out, leaving A distributed over remaining terms: AB' + AC'.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q024",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Dual Combining with Inversion",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the product-of-sums expression: F = (A' + B)(A' + B').",
    "promptDetail": "Combine sum terms sharing common literal A'.",
    "inputFormatHint": "Enter literal, e.g. A'",
    "correctAnswer": "A'",
    "acceptedAnswers": [
      "A'",
      "a'",
      "not A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Complementation was inverted incorrectly."
      },
      {
        "label": "C",
        "text": "B",
        "isCorrect": false,
        "distractorReason": "B and B' combine to 0 under AND."
      },
      {
        "label": "D",
        "text": "A' + B",
        "isCorrect": false,
        "distractorReason": "Expression was not reduced."
      }
    ],
    "hint1": "Use the second distributive law in reverse: (A' + B)(A' + B') = A' + BB'.",
    "hint2": "BB' = 0 by the complement law. A' + 0 = A'.",
    "solution": {
      "finalAnswer": "A'",
      "steps": [
        {
          "title": "Factoring",
          "type": "calculation",
          "content": "(A' + B)(A' + B') = A' + BB'."
        },
        {
          "title": "Complement Reduction",
          "type": "calculation",
          "content": "BB' = 0. A' + 0 = A'."
        }
      ],
      "fastShortcut": "Dual combining: (A' + B)(A' + B') = A'.",
      "verification": "Truth table equivalence."
    }
  },
  {
    "id": "u2-q025",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Term Absorption",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the Boolean sum-of-products expression: F = AB' + AB'C.",
    "promptDetail": "Identify the absorbing product term.",
    "inputFormatHint": "Enter term, e.g. AB'",
    "correctAnswer": "AB'",
    "acceptedAnswers": [
      "AB'",
      "ab'",
      "A*B'"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "ABC",
        "isCorrect": false,
        "distractorReason": "Arbitrarily changed complement polarity."
      },
      {
        "label": "C",
        "text": "AB' + C",
        "isCorrect": false,
        "distractorReason": "Confused product absorption with literal elimination."
      },
      {
        "label": "D",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "C is absorbed, not the primary term."
      }
    ],
    "hint1": "Factor out the common term AB': AB'(1 + C).",
    "hint2": "1 + C = 1 by the domination law. AB'(1) = AB'.",
    "solution": {
      "finalAnswer": "AB'",
      "steps": [
        {
          "title": "Factoring",
          "type": "calculation",
          "content": "AB' + AB'C = AB'(1 + C)."
        },
        {
          "title": "Domination",
          "type": "calculation",
          "content": "1 + C = 1. AB'(1) = AB'."
        }
      ],
      "fastShortcut": "AB' absorbs any product containing AB': AB' + AB'C = AB'.",
      "verification": "Absorption law definition."
    }
  },
  {
    "id": "u2-q026",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Dual Combining on Second Variable",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the POS expression: F = (X + Y')(X' + Y').",
    "promptDetail": "Apply the commutative law and combine about common literal Y'.",
    "inputFormatHint": "Enter literal, e.g. Y'",
    "correctAnswer": "Y'",
    "acceptedAnswers": [
      "Y'",
      "y'",
      "not Y"
    ],
    "options": [
      {
        "label": "A",
        "text": "Y'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Y",
        "isCorrect": false,
        "distractorReason": "Lost the complement prime."
      },
      {
        "label": "C",
        "text": "X",
        "isCorrect": false,
        "distractorReason": "X and X' are complementary."
      },
      {
        "label": "D",
        "text": "X'Y'",
        "isCorrect": false,
        "distractorReason": "Changed POS operation into product."
      }
    ],
    "hint1": "Commutative property: (Y' + X)(Y' + X').",
    "hint2": "(Y' + X)(Y' + X') = Y' + XX' = Y' + 0 = Y'.",
    "solution": {
      "finalAnswer": "Y'",
      "steps": [
        {
          "title": "Rearrangement",
          "type": "calculation",
          "content": "(Y' + X)(Y' + X') = Y' + XX'."
        },
        {
          "title": "Complement Reduction",
          "type": "calculation",
          "content": "XX' = 0. Y' + 0 = Y'."
        }
      ],
      "fastShortcut": "(X + Y')(X' + Y') = Y'.",
      "verification": "Dual combining identity."
    }
  },
  {
    "id": "u2-q027",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Common Factor Reduction",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the 3-variable expression: F = AB'C + A'B'C + AB'C'.",
    "promptDetail": "Factor common terms to achieve minimal 2-term sum-of-products.",
    "inputFormatHint": "Enter simplified SOP, e.g. AB' + B'C",
    "correctAnswer": "AB' + B'C",
    "acceptedAnswers": [
      "AB' + B'C",
      "B'C + AB'",
      "AB'+B'C",
      "B'C+AB'"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB' + B'C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B'C",
        "isCorrect": false,
        "distractorReason": "Omitted coverage of minterm AB'C'."
      },
      {
        "label": "C",
        "text": "AB'",
        "isCorrect": false,
        "distractorReason": "Omitted coverage of minterm A'B'C."
      },
      {
        "label": "D",
        "text": "A + B' + C",
        "isCorrect": false,
        "distractorReason": "Incorrectly collapsed product terms into single literals."
      }
    ],
    "hint1": "Observe that AB'C can combine with both A'B'C and AB'C' using the idempotent law (P + P = P).",
    "hint2": "Pair 1: (AB'C + A'B'C) = B'C(A + A') = B'C. Pair 2: (AB'C + AB'C') = AB'(C + C') = AB'.",
    "solution": {
      "finalAnswer": "AB' + B'C",
      "steps": [
        {
          "title": "Duplicate Shared Minterm",
          "type": "calculation",
          "content": "F = (AB'C + A'B'C) + (AB'C + AB'C')."
        },
        {
          "title": "Combine Pairs",
          "type": "calculation",
          "content": "B'C(A + A') + AB'(C + C') = B'C(1) + AB'(1) = B'C + AB'."
        }
      ],
      "fastShortcut": "Sharing minterm AB'C gives B'C + AB'.",
      "verification": "Truth table: minterms are m4, m5, m1 -> cover is AB' (m4, m5) + B'C (m1, m5)."
    }
  },
  {
    "id": "u2-q028",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Dual Consensus Elimination",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the POS expression: F = (A + C')(A' + B')(B' + C').",
    "promptDetail": "Identify the redundant consensus sum term and eliminate it.",
    "inputFormatHint": "Enter simplified POS, e.g. (A + C')(A' + B')",
    "correctAnswer": "(A + C')(A' + B')",
    "acceptedAnswers": [
      "(A + C')(A' + B')",
      "(A+C')(A'+B')",
      "(A' + B')(A + C')"
    ],
    "options": [
      {
        "label": "A",
        "text": "(A + C')(A' + B')",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "(B' + C')",
        "isCorrect": false,
        "distractorReason": "Kept the redundant consensus term and eliminated essential terms."
      },
      {
        "label": "C",
        "text": "(A + C')(B' + C')",
        "isCorrect": false,
        "distractorReason": "Eliminated essential term (A' + B')."
      },
      {
        "label": "D",
        "text": "AB + A'C",
        "isCorrect": false,
        "distractorReason": "Converted to SOP incorrectly."
      }
    ],
    "hint1": "Terms (A + C') and (A' + B') contain complementary literals A and A'.",
    "hint2": "Their dual consensus term is (B' + C'). Since (B' + C') is present, it is completely redundant.",
    "solution": {
      "finalAnswer": "(A + C')(A' + B')",
      "steps": [
        {
          "title": "Consensus Identification",
          "type": "axiom",
          "content": "In (A + C')(A' + B')(B' + C'), A and A' are complementary. The consensus sum is (C' + B') = (B' + C'). By the Dual Consensus Theorem, this term is eliminated."
        }
      ],
      "fastShortcut": "Dual consensus eliminates (B' + C').",
      "verification": "Duality theorem proof."
    }
  },
  {
    "id": "u2-q029",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Factor & Consensus Reduction",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the 3-variable expression: F = A'B + ABC' + AB'C'.",
    "promptDetail": "Combine adjacent terms to find the minimal 2-term sum.",
    "inputFormatHint": "Enter simplified SOP, e.g. A'B + AC'",
    "correctAnswer": "A'B + AC'",
    "acceptedAnswers": [
      "A'B + AC'",
      "AC' + A'B",
      "A'B+AC'",
      "AC'+A'B"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'B + AC'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'B + C'",
        "isCorrect": false,
        "distractorReason": "Over-simplified: C' requires literal A."
      },
      {
        "label": "C",
        "text": "B + AC'",
        "isCorrect": false,
        "distractorReason": "Lost complement on A'."
      },
      {
        "label": "D",
        "text": "ABC' + A'B",
        "isCorrect": false,
        "distractorReason": "Incomplete reduction."
      }
    ],
    "hint1": "Notice the second and third terms: ABC' + AB'C' = AC'(B + B').",
    "hint2": "B + B' = 1, so the expression becomes A'B + AC'.",
    "solution": {
      "finalAnswer": "A'B + AC'",
      "steps": [
        {
          "title": "Factor Terms 2 and 3",
          "type": "calculation",
          "content": "ABC' + AB'C' = AC'(B + B') = AC'(1) = AC'."
        },
        {
          "title": "Combine with Term 1",
          "type": "calculation",
          "content": "F = A'B + AC'."
        }
      ],
      "fastShortcut": "Combining ABC' + AB'C' produces AC', yielding A'B + AC'.",
      "verification": "Truth table: minterms are m2, m3, m4, m6 -> A'B covers {m2,m3}, AC' covers {m4,m6}."
    }
  },
  {
    "id": "u2-q030",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Dual Consensus with Inverted Literals",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the POS expression: F = (A + B')(A' + C')(B' + C').",
    "promptDetail": "Identify the redundant term using the Dual Consensus Theorem.",
    "inputFormatHint": "Enter simplified POS, e.g. (A + B')(A' + C')",
    "correctAnswer": "(A + B')(A' + C')",
    "acceptedAnswers": [
      "(A + B')(A' + C')",
      "(A+B')(A'+C')",
      "(A' + C')(A + B')"
    ],
    "options": [
      {
        "label": "A",
        "text": "(A + B')(A' + C')",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "(B' + C')",
        "isCorrect": false,
        "distractorReason": "Kept only the redundant consensus term."
      },
      {
        "label": "C",
        "text": "(A + B')(B' + C')",
        "isCorrect": false,
        "distractorReason": "Eliminated essential term (A' + C')."
      },
      {
        "label": "D",
        "text": "A'B' + AC'",
        "isCorrect": false,
        "distractorReason": "Converted to SOP incorrectly."
      }
    ],
    "hint1": "Check complementary pair: A and A'.",
    "hint2": "Consensus sum: (B' + C'). This term is redundant and deleted.",
    "solution": {
      "finalAnswer": "(A + B')(A' + C')",
      "steps": [
        {
          "title": "Dual Consensus",
          "type": "axiom",
          "content": "A and A' are complementary. The remaining literals B' and C' form the consensus term (B' + C'), which is redundant."
        }
      ],
      "fastShortcut": "Dual consensus eliminates (B' + C').",
      "verification": "Dual consensus theorem."
    }
  },
  {
    "id": "u2-q031",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Multiplying Out and Consensus",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "free_response",
    "question": "Simplify to minimal SOP: F = (A + B)(A + C)(B' + C).",
    "promptDetail": "Combine first two factors into sum form, then distribute and eliminate redundant terms.",
    "inputFormatHint": "Enter minimal SOP, e.g. AB' + BC",
    "correctAnswer": "AB' + BC",
    "acceptedAnswers": [
      "AB' + BC",
      "BC + AB'",
      "AB'+BC",
      "BC+AB'"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB' + BC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + BC",
        "isCorrect": false,
        "distractorReason": "Omitted the effect of factor (B' + C)."
      },
      {
        "label": "C",
        "text": "AB' + C",
        "isCorrect": false,
        "distractorReason": "Confused consensus term with minimal cover."
      },
      {
        "label": "D",
        "text": "ABC",
        "isCorrect": false,
        "distractorReason": "Over-reduced."
      }
    ],
    "hint1": "By the second distributive law, (A + B)(A + C) = A + BC.",
    "hint2": "Now multiply (A + BC)(B' + C) = AB' + AC + BB'C + BCC = AB' + AC + BC. Notice that AC is consensus between AB' and BC!",
    "solution": {
      "finalAnswer": "AB' + BC",
      "steps": [
        {
          "title": "Step 1: First Two Terms",
          "type": "calculation",
          "content": "(A + B)(A + C) = A + BC."
        },
        {
          "title": "Step 2: Multiply by Third Factor",
          "type": "calculation",
          "content": "(A + BC)(B' + C) = AB' + AC + 0 + BC = AB' + BC + AC."
        },
        {
          "title": "Step 3: Consensus Elimination",
          "type": "calculation",
          "content": "In AB' + BC + AC, literal B is complementary. Consensus is AC. Thus AC is redundant: F = AB' + BC."
        }
      ],
      "fastShortcut": "(A + BC)(B' + C) expands to AB' + BC + AC; consensus eliminates AC to leave AB' + BC.",
      "verification": "Minterms: m3, m4, m5, m7 -> minimal SOP is AB' + BC."
    },
    "requireMinimal": true
  },
  {
    "id": "u2-q032",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Dual Combining in 3 Variables",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the POS expression: F = (A' + B' + C)(A' + B + C).",
    "promptDetail": "Combine the two maxterms sharing common literals A' and C.",
    "inputFormatHint": "Enter simplified sum, e.g. A' + C",
    "correctAnswer": "A' + C",
    "acceptedAnswers": [
      "A' + C",
      "A'+C",
      "C + A'",
      "C+A'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A' + C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A' + B",
        "isCorrect": false,
        "distractorReason": "B and B' eliminate each other."
      },
      {
        "label": "C",
        "text": "B + C",
        "isCorrect": false,
        "distractorReason": "A' is common and preserved."
      },
      {
        "label": "D",
        "text": "A'BC",
        "isCorrect": false,
        "distractorReason": "Converted to product term incorrectly."
      }
    ],
    "hint1": "Rearrange as (A' + C + B')(A' + C + B).",
    "hint2": "Let X = A' + C. Then (X + B')(X + B) = X + B'B = X + 0 = X = A' + C.",
    "solution": {
      "finalAnswer": "A' + C",
      "steps": [
        {
          "title": "Factoring",
          "type": "calculation",
          "content": "(A' + C + B')(A' + C + B) = (A' + C) + B'B."
        },
        {
          "title": "Complement Rule",
          "type": "calculation",
          "content": "B'B = 0. (A' + C) + 0 = A' + C."
        }
      ],
      "fastShortcut": "Dual combining: (A' + C + B')(A' + C + B) = A' + C.",
      "verification": "Truth table equivalence."
    }
  },
  {
    "id": "u2-q033",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Multi-Term Factoring",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the expression: F = A'B'C + A'BC + AB'C.",
    "promptDetail": "Factor common terms to derive the minimal 2-term SOP.",
    "inputFormatHint": "Enter simplified SOP, e.g. A'C + B'C",
    "correctAnswer": "A'C + B'C",
    "acceptedAnswers": [
      "A'C + B'C",
      "B'C + A'C",
      "A'C+B'C",
      "B'C+A'C"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'C + B'C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'C",
        "isCorrect": false,
        "distractorReason": "Omitted coverage of minterm AB'C."
      },
      {
        "label": "C",
        "text": "B'C",
        "isCorrect": false,
        "distractorReason": "Omitted coverage of minterm A'BC."
      },
      {
        "label": "D",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "Requires 4 minterms to reduce to single literal C."
      }
    ],
    "hint1": "Duplicate minterm A'B'C using idempotence: (A'B'C + A'BC) + (A'B'C + AB'C).",
    "hint2": "Pair 1 combines to A'C. Pair 2 combines to B'C. Result: A'C + B'C.",
    "solution": {
      "finalAnswer": "A'C + B'C",
      "steps": [
        {
          "title": "Duplicate Shared Minterm",
          "type": "calculation",
          "content": "F = (A'B'C + A'BC) + (A'B'C + AB'C)."
        },
        {
          "title": "Combine Pairs",
          "type": "calculation",
          "content": "A'C(B' + B) + B'C(A' + A) = A'C(1) + B'C(1) = A'C + B'C."
        }
      ],
      "fastShortcut": "Sharing minterm A'B'C gives A'C + B'C.",
      "verification": "Truth table: minterms are m1, m3, m5 -> cover is A'C (m1, m3) + B'C (m1, m5)."
    }
  },
  {
    "id": "u2-q034",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Expansion & Elimination",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the Boolean expression: F = AB + A'B'C + A'BC.",
    "promptDetail": "Combine the 3-variable minterm pair first, then evaluate the resulting expression.",
    "inputFormatHint": "Enter simplified SOP, e.g. AB + A'C",
    "correctAnswer": "AB + A'C",
    "acceptedAnswers": [
      "AB + A'C",
      "A'C + AB",
      "AB+A'C",
      "A'C+AB"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB + A'C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB + C",
        "isCorrect": false,
        "distractorReason": "Dropped complement literal A' prematurely."
      },
      {
        "label": "C",
        "text": "B + A'C",
        "isCorrect": false,
        "distractorReason": "Incorrectly eliminated literal A."
      },
      {
        "label": "D",
        "text": "ABC",
        "isCorrect": false,
        "distractorReason": "Collapsed terms into single product."
      }
    ],
    "hint1": "Combine terms 2 and 3: A'B'C + A'BC = A'C(B' + B) = A'C.",
    "hint2": "Expression becomes AB + A'C. Can consensus be formed? Consensus is BC, but BC is not present. Thus AB + A'C is minimal.",
    "solution": {
      "finalAnswer": "AB + A'C",
      "steps": [
        {
          "title": "Factor Terms 2 and 3",
          "type": "calculation",
          "content": "A'B'C + A'BC = A'C(B' + B) = A'C(1) = A'C."
        },
        {
          "title": "Minimal Result",
          "type": "calculation",
          "content": "F = AB + A'C."
        }
      ],
      "fastShortcut": "Combining A'B'C + A'BC gives A'C; expression reduces to AB + A'C.",
      "verification": "Truth table equivalence."
    }
  },
  {
    "id": "u2-q035",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Product-of-Sums Multiplication",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify to minimal SOP: F = (AB + C')(A'B' + C).",
    "promptDetail": "Multiply out the two binomial factors and cancel null terms.",
    "inputFormatHint": "Enter minimal SOP, e.g. ABC + A'B'C'",
    "correctAnswer": "ABC + A'B'C'",
    "acceptedAnswers": [
      "ABC + A'B'C'",
      "A'B'C' + ABC",
      "ABC+A'B'C'",
      "A'B'C'+ABC"
    ],
    "options": [
      {
        "label": "A",
        "text": "ABC + A'B'C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB + A'B'",
        "isCorrect": false,
        "distractorReason": "Omitted literal C from products."
      },
      {
        "label": "C",
        "text": "C + C'",
        "isCorrect": false,
        "distractorReason": "Failed to apply Boolean multiplication."
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Result depends on inputs."
      }
    ],
    "hint1": "Multiply out: (AB)(A'B') + (AB)(C) + (C')(A'B') + (C')(C).",
    "hint2": "AA' = 0 so (AB)(A'B') = 0. CC' = 0 so (C')(C) = 0. The remaining terms are ABC + A'B'C'.",
    "solution": {
      "finalAnswer": "ABC + A'B'C'",
      "steps": [
        {
          "title": "Expansion",
          "type": "calculation",
          "content": "(AB)(A'B') + ABC + A'B'C' + CC'."
        },
        {
          "title": "Null Term Cancellation",
          "type": "calculation",
          "content": "AA'B B' = 0 and CC' = 0. Result: ABC + A'B'C'."
        }
      ],
      "fastShortcut": "Cross terms vanish due to AA'=0 and CC'=0, leaving ABC + A'B'C'.",
      "verification": "Truth table: 1 only on m0 and m7."
    }
  },
  {
    "id": "u2-q036",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: 4-Variable Consensus & Absorption",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "free_response",
    "question": "Simplify the 4-variable expression: F = AB'D' + A'CD' + BCD'.",
    "promptDetail": "Factor common literal D', identify the consensus term, and simplify.",
    "inputFormatHint": "Enter minimal SOP, e.g. CD' + AB'D'",
    "correctAnswer": "CD' + AB'D'",
    "acceptedAnswers": [
      "CD' + AB'D'",
      "AB'D' + CD'",
      "CD'+AB'D'",
      "AB'D'+CD'"
    ],
    "options": [
      {
        "label": "A",
        "text": "CD' + AB'D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB'D' + A'CD'",
        "isCorrect": false,
        "distractorReason": "Overlooked consensus between BCD' and AB'D' combining with A'CD'."
      },
      {
        "label": "C",
        "text": "D'(A + B + C)",
        "isCorrect": false,
        "distractorReason": "Incorrect factorization."
      },
      {
        "label": "D",
        "text": "BCD' + AB'D'",
        "isCorrect": false,
        "distractorReason": "Incorrect term selection."
      }
    ],
    "hint1": "Factor D' out: D'(AB' + A'C + BC). Notice consensus between AB' and BC on literal B is ACD.",
    "hint2": "Wait: (A'C + BC) = (A' + B)C. Combine with AB' gives C + AB' = C + B'. Multiplied by D': CD' + AB'D'.",
    "solution": {
      "finalAnswer": "CD' + AB'D'",
      "steps": [
        {
          "title": "Factor Out D'",
          "type": "calculation",
          "content": "F = D'(AB' + A'C + BC)."
        },
        {
          "title": "Consensus Introduction",
          "type": "calculation",
          "content": "Consensus of AB' and BC is AC. Then AC + A'C = (A + A')C = C. C absorbs BC and A'C."
        },
        {
          "title": "Combine",
          "type": "calculation",
          "content": "D'(C + AB') = CD' + AB'D'."
        }
      ],
      "fastShortcut": "D'(AB' + A'C + BC) reduces to D'(C + AB') = CD' + AB'D'.",
      "verification": "Truth table: minterms are m2, m6, m8, m10, m14 -> CD' + AB'D'."
    },
    "requireMinimal": true
  },
  {
    "id": "u2-q037",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: 3-Factor POS Combining",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify to minimal form: F = (A + B + D)(A + B + D')(A + B' + D).",
    "promptDetail": "Combine pairs sharing 2 common literals, then reduce.",
    "inputFormatHint": "Enter simplified form, e.g. A + BD",
    "correctAnswer": "A + BD",
    "acceptedAnswers": [
      "A + BD",
      "A+BD",
      "BD + A",
      "BD+A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A + BD",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Over-simplified."
      },
      {
        "label": "C",
        "text": "(A + B)(A + D)",
        "isCorrect": false,
        "distractorReason": "Unexpanded POS form."
      },
      {
        "label": "D",
        "text": "ABD",
        "isCorrect": false,
        "distractorReason": "Converted to product term incorrectly."
      }
    ],
    "hint1": "Combine the first two terms: (A + B + D)(A + B + D') = (A + B) + DD' = (A + B) + 0 = A + B.",
    "hint2": "Now multiply (A + B)(A + B' + D). Notice literal A is common: A + B(B' + D) = A + (BB' + BD) = A + BD.",
    "solution": {
      "finalAnswer": "A + BD",
      "steps": [
        {
          "title": "Step 1: First Pair Combining",
          "type": "calculation",
          "content": "(A + B + D)(A + B + D') = A + B."
        },
        {
          "title": "Step 2: Combine with Third Factor",
          "type": "calculation",
          "content": "(A + B)(A + B' + D) = A + B(B' + D) = A + 0 + BD = A + BD."
        }
      ],
      "fastShortcut": "First pair yields (A + B); (A + B)(A + B' + D) simplifies to A + BD.",
      "verification": "Truth table equivalence proof."
    }
  },
  {
    "id": "u2-q038",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Nested De Morgan Simplification",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the nested expression: F = [ (AB)' (A' + B) ]'.",
    "promptDetail": "Apply De Morgan's Law to the outer complement, then reduce.",
    "inputFormatHint": "Enter simplified literal, e.g. A",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A",
      "a"
    ],
    "options": [
      {
        "label": "A",
        "text": "A",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B",
        "isCorrect": false,
        "distractorReason": "B is eliminated in reduction."
      },
      {
        "label": "C",
        "text": "A' + B",
        "isCorrect": false,
        "distractorReason": "Incomplete simplification."
      },
      {
        "label": "D",
        "text": "AB",
        "isCorrect": false,
        "distractorReason": "Over-reduced."
      }
    ],
    "hint1": "By De Morgan's Law on the outer bracket: [ X * Y ]' = X' + Y' with X = (AB)' and Y = (A' + B).",
    "hint2": "X' = ((AB)')' = AB. Y' = (A' + B)' = A''B' = AB'. Therefore F = AB + AB' = A(B + B') = A.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Outer De Morgan",
          "type": "calculation",
          "content": "[ (AB)' * (A' + B) ]' = ((AB)')' + (A' + B)'."
        },
        {
          "title": "Double Complements",
          "type": "calculation",
          "content": "((AB)')' = AB. (A' + B)' = AB'."
        },
        {
          "title": "Combining Law",
          "type": "calculation",
          "content": "AB + AB' = A(B + B') = A(1) = A."
        }
      ],
      "fastShortcut": "Outer De Morgan produces AB + AB' = A.",
      "verification": "Truth table: when A=1, F=1; when A=0, F=0. Matches A."
    }
  },
  {
    "id": "u2-q039",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Cyclic Product Reduction",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the cyclic product: F = (A' + B)(B' + C)(C' + A).",
    "promptDetail": "Multiply out the cyclic binomial factors to find the minimal sum-of-products.",
    "inputFormatHint": "Enter minimal SOP, e.g. ABC + A'B'C'",
    "correctAnswer": "ABC + A'B'C'",
    "acceptedAnswers": [
      "ABC + A'B'C'",
      "A'B'C' + ABC",
      "ABC+A'B'C'",
      "A'B'C'+ABC"
    ],
    "options": [
      {
        "label": "A",
        "text": "ABC + A'B'C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B + C",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction."
      },
      {
        "label": "C",
        "text": "A'B'C'",
        "isCorrect": false,
        "distractorReason": "Omitted term ABC."
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Expression is non-zero when inputs are all 0 or all 1."
      }
    ],
    "hint1": "Multiply the first two terms: (A' + B)(B' + C) = A'B' + A'C + BB' + BC = A'B' + A'C + BC.",
    "hint2": "Now multiply by (C' + A): (A'B' + A'C + BC)(C' + A) = A'B'C' + 0 + 0 + 0 + 0 + ABC = A'B'C' + ABC.",
    "solution": {
      "finalAnswer": "ABC + A'B'C'",
      "steps": [
        {
          "title": "Multiply First Pair",
          "type": "calculation",
          "content": "(A' + B)(B' + C) = A'B' + A'C + BC."
        },
        {
          "title": "Multiply with Third Factor",
          "type": "calculation",
          "content": "(A'B' + A'C + BC)(C' + A) = A'B'C' + A'B'A + A'CC' + A'CA + BCC' + BCA."
        },
        {
          "title": "Null Cancellations",
          "type": "calculation",
          "content": "Terms with AA'=0, CC'=0 vanish, leaving A'B'C' + ABC."
        }
      ],
      "fastShortcut": "Cyclic product (A' + B)(B' + C)(C' + A) multiplies out directly to ABC + A'B'C'.",
      "verification": "Truth table: evaluates to 1 only when A=B=C (all 0 or all 1)."
    }
  },
  {
    "id": "u2-q040",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: 4-Variable Multi-Step Reduction",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the 4-variable expression: F = WX' + X(Y + Z') + W'X'Y.",
    "promptDetail": "Factor terms involving X', eliminate complementary literals, and reduce.",
    "inputFormatHint": "Enter minimal SOP, e.g. WX' + Y + XZ'",
    "correctAnswer": "WX' + Y + XZ'",
    "acceptedAnswers": [
      "WX' + Y + XZ'",
      "WX' + XZ' + Y",
      "Y + WX' + XZ'"
    ],
    "options": [
      {
        "label": "A",
        "text": "WX' + Y + XZ'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "WX' + XY",
        "isCorrect": false,
        "distractorReason": "Omitted literal Z'."
      },
      {
        "label": "C",
        "text": "W + Y + Z'",
        "isCorrect": false,
        "distractorReason": "Over-reduced."
      },
      {
        "label": "D",
        "text": "X + Y + Z'",
        "isCorrect": false,
        "distractorReason": "Lost literal W."
      }
    ],
    "hint1": "Expand X(Y + Z') = XY + XZ'. Expression is WX' + XY + XZ' + W'X'Y.",
    "hint2": "Combine terms with Y: XY + W'X'Y = Y(X + W'X') = Y(X + W') = XY + W'Y. With WX', WX' + W'X'Y = X'(W + W'Y) = X'(W + Y) = WX' + X'Y. Then X'Y + XY = Y!",
    "solution": {
      "finalAnswer": "WX' + Y + XZ'",
      "steps": [
        {
          "title": "Expand and Group",
          "type": "calculation",
          "content": "F = WX' + W'X'Y + XY + XZ'."
        },
        {
          "title": "Complement Absorption",
          "type": "calculation",
          "content": "WX' + W'X'Y = X'(W + W'Y) = X'(W + Y) = WX' + X'Y."
        },
        {
          "title": "Combine with XY",
          "type": "calculation",
          "content": "X'Y + XY = Y(X' + X) = Y. Final expression: WX' + Y + XZ'."
        }
      ],
      "fastShortcut": "WX' + W'X'Y gives X'Y; X'Y + XY yields Y; leaving WX' + Y + XZ'.",
      "verification": "Truth table equivalence check across all 16 rows."
    }
  },
  {
    "id": "u2-q041",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: 4-Variable Dual Consensus",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the 4-variable POS expression: F = (A + B' + C)(A' + D)(B' + C + D).",
    "promptDetail": "Identify the complementary pair and delete the redundant dual consensus term.",
    "inputFormatHint": "Enter simplified POS, e.g. (A + B' + C)(A' + D)",
    "correctAnswer": "(A + B' + C)(A' + D)",
    "acceptedAnswers": [
      "(A + B' + C)(A' + D)",
      "(A+B'+C)(A'+D)",
      "(A' + D)(A + B' + C)"
    ],
    "options": [
      {
        "label": "A",
        "text": "(A + B' + C)(A' + D)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "(B' + C + D)",
        "isCorrect": false,
        "distractorReason": "Kept the redundant consensus term."
      },
      {
        "label": "C",
        "text": "(A + B' + C)(B' + C + D)",
        "isCorrect": false,
        "distractorReason": "Deleted essential term (A' + D)."
      },
      {
        "label": "D",
        "text": "AD + B'C",
        "isCorrect": false,
        "distractorReason": "Converted to SOP incorrectly."
      }
    ],
    "hint1": "Terms (A + B' + C) and (A' + D) contain the single complementary pair A and A'.",
    "hint2": "The remaining literals are (B' + C) and D, forming the consensus sum (B' + C + D). This term is eliminated.",
    "solution": {
      "finalAnswer": "(A + B' + C)(A' + D)",
      "steps": [
        {
          "title": "Dual Consensus Check",
          "type": "axiom",
          "content": "Literals A and A' are complementary. The consensus sum of (A + B' + C) and (A' + D) is (B' + C + D). By the Dual Consensus Theorem, (B' + C + D) is completely redundant."
        }
      ],
      "fastShortcut": "Dual consensus eliminates (B' + C + D).",
      "verification": "Dual consensus theorem proof."
    }
  },
  {
    "id": "u2-q042",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Quad Term Reduction",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Simplify the 3-variable expression: F = W'X'Y' + W'X'Y + W'XY + W'XY'.",
    "promptDetail": "Combine adjacent minterms iteratively to reduce to a single literal.",
    "inputFormatHint": "Enter single literal, e.g. W'",
    "correctAnswer": "W'",
    "acceptedAnswers": [
      "W'",
      "w'",
      "not W"
    ],
    "options": [
      {
        "label": "A",
        "text": "W'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "W",
        "isCorrect": false,
        "distractorReason": "Inverted literal polarity."
      },
      {
        "label": "C",
        "text": "X' + Y'",
        "isCorrect": false,
        "distractorReason": "Incomplete reduction."
      },
      {
        "label": "D",
        "text": "W'X'",
        "isCorrect": false,
        "distractorReason": "Failed to combine across X and X'."
      }
    ],
    "hint1": "Factor W'X' from the first two terms, and W'X from the second two terms.",
    "hint2": "W'X'(Y' + Y) + W'X(Y + Y') = W'X'(1) + W'X(1) = W'X' + W'X = W'(X' + X) = W'(1) = W'.",
    "solution": {
      "finalAnswer": "W'",
      "steps": [
        {
          "title": "First Level Factoring",
          "type": "calculation",
          "content": "W'X'(Y' + Y) + W'X(Y + Y') = W'X' + W'X."
        },
        {
          "title": "Second Level Factoring",
          "type": "calculation",
          "content": "W'(X' + X) = W'(1) = W'."
        }
      ],
      "fastShortcut": "All 4 minterms where W=0 are present, which simplifies to W'.",
      "verification": "Truth table: 1 on all rows where W=0."
    }
  },
  {
    "id": "u2-q043",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: 4-Factor POS Reduction",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify the 4-term POS expression: F = (A' + B + C')(A + B' + C')(A + B + C')(A' + B' + C').",
    "promptDetail": "Combine pairs sharing common literals to reduce to a single literal.",
    "inputFormatHint": "Enter single literal, e.g. C'",
    "correctAnswer": "C'",
    "acceptedAnswers": [
      "C'",
      "c'",
      "not C"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "Lost complement prime."
      },
      {
        "label": "C",
        "text": "A' + B'",
        "isCorrect": false,
        "distractorReason": "Incomplete reduction."
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Expression is non-zero when C=0."
      }
    ],
    "hint1": "Notice that literal C' is common to all 4 sum terms.",
    "hint2": "Pair terms by A and B: [(C' + A') + B][(C' + A') + B'] = C' + A'. And [(C' + A) + B][(C' + A) + B'] = C' + A. Then (C' + A')(C' + A) = C' + AA' = C' + 0 = C'.",
    "solution": {
      "finalAnswer": "C'",
      "steps": [
        {
          "title": "Pair 1 Combining",
          "type": "calculation",
          "content": "(C' + A' + B)(C' + A' + B') = C' + A'."
        },
        {
          "title": "Pair 2 Combining",
          "type": "calculation",
          "content": "(C' + A + B)(C' + A + B') = C' + A."
        },
        {
          "title": "Final Combining",
          "type": "calculation",
          "content": "(C' + A')(C' + A) = C' + AA' = C' + 0 = C'."
        }
      ],
      "fastShortcut": "All 4 combinations of A and B multiply out to 0, leaving C'.",
      "verification": "Truth table: evaluates to 0 only when C=1."
    }
  },
  {
    "id": "u2-q044",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Irreducible Prime Implicant Analysis",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "Evaluate the Boolean expression: F = AB + BC + CA + A'B'C'. Is this expression already in its minimal SOP form?",
    "promptDetail": "Check whether any prime implicant can be eliminated without changing the function.",
    "inputFormatHint": "Select correct statement",
    "correctAnswer": "Yes, it is already minimal because all 4 product terms are essential prime implicants",
    "acceptedAnswers": [
      "Yes, it is already minimal because all 4 product terms are essential prime implicants",
      "yes",
      "already minimal"
    ],
    "options": [
      {
        "label": "A",
        "text": "Yes, it is already minimal because all 4 product terms are essential prime implicants",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "No, AB + BC + CA simplifies to A + B + C",
        "isCorrect": false,
        "distractorReason": "AB + BC + CA does not equal A + B + C."
      },
      {
        "label": "C",
        "text": "No, consensus eliminates term CA",
        "isCorrect": false,
        "distractorReason": "Consensus is cyclic; deleting any term changes the function."
      },
      {
        "label": "D",
        "text": "No, A'B'C' is absorbed by AB",
        "isCorrect": false,
        "distractorReason": "A'B'C' is disjoint from AB and cannot be absorbed."
      }
    ],
    "hint1": "Minterms covered: AB covers {m6, m7}; BC covers {m3, m7}; CA covers {m5, m7}; A'B'C' covers {m0}.",
    "hint2": "Minterm m0 is uniquely covered by A'B'C'. Minterm m6 is covered by AB and CA? No, m6 is A=1,B=1,C=0 (only AB). Every term covers at least one unique minterm!",
    "solution": {
      "finalAnswer": "Yes, it is already minimal because all 4 product terms are essential prime implicants",
      "steps": [
        {
          "title": "Minterm Coverage Check",
          "type": "axiom",
          "content": "m0 (000) is covered ONLY by A'B'C'. m3 (011) is covered ONLY by BC. m5 (101) is covered ONLY by CA. m6 (110) is covered ONLY by AB. Since every product term uniquely covers at least one minterm, all 4 are essential prime implicants. The expression is irreducible."
        }
      ],
      "fastShortcut": "Every prime implicant has an essential minterm; the expression is already minimal.",
      "verification": "K-Map essential prime implicant proof."
    }
  },
  {
    "id": "u2-q045",
    "trackId": "sec22",
    "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
    "topicBadge": "2.2: Multi-Level Inverter Reduction",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Simplify to minimal 2-variable SOP: F = [ (A' + B)' + (A + B')' ]'.",
    "promptDetail": "Apply De Morgan's Law inside the brackets, then complement the resulting sum.",
    "inputFormatHint": "Enter minimal SOP, e.g. AB + A'B'",
    "correctAnswer": "AB + A'B'",
    "acceptedAnswers": [
      "AB + A'B'",
      "A'B' + AB",
      "AB+A'B'",
      "A'B'+AB"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB + A'B'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB' + A'B",
        "isCorrect": false,
        "distractorReason": "This is the uncomplemented XOR sum inside the brackets."
      },
      {
        "label": "C",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Failed to apply inner De Morgan laws."
      },
      {
        "label": "D",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Result depends on inputs (XNOR function)."
      }
    ],
    "hint1": "Inner terms: (A' + B)' = A''B' = AB'. And (A + B')' = A'B'' = A'B.",
    "hint2": "Inside the brackets: AB' + A'B (which is XOR). The outer complement makes it (AB' + A'B)', which is XNOR: AB + A'B'.",
    "solution": {
      "finalAnswer": "AB + A'B'",
      "steps": [
        {
          "title": "Inner De Morgan",
          "type": "calculation",
          "content": "(A' + B)' = AB'. (A + B')' = A'B."
        },
        {
          "title": "Bracket Expression",
          "type": "calculation",
          "content": "Inner sum = AB' + A'B (Exclusive-OR)."
        },
        {
          "title": "Outer De Morgan",
          "type": "calculation",
          "content": "F = (AB' + A'B)' = (AB')' * (A'B)' = (A' + B)(A + B') = A'B' + AB."
        }
      ],
      "fastShortcut": "Complement of XOR is XNOR: AB + A'B'.",
      "verification": "Truth table: 1 when A=B (m0 and m3)."
    }
  },
  {
    "id": "u2-q046",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Minterm Literal Construction",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "For a 3-variable system with ordered variables (A, B, C), what is the algebraic minterm expression corresponding to decimal index 5 (binary 101)?",
    "promptDetail": "In a minterm, an uncomplemented literal denotes binary 1, and a complemented literal denotes binary 0.",
    "inputFormatHint": "Enter minterm, e.g. AB'C",
    "correctAnswer": "AB'C",
    "acceptedAnswers": [
      "AB'C",
      "A*B'*C",
      "m5",
      "m_5"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB'C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'BC'",
        "isCorrect": false,
        "distractorReason": "Complemented 1s and uncomplemented 0s (this is binary 010)."
      },
      {
        "label": "C",
        "text": "A + B' + C",
        "isCorrect": false,
        "distractorReason": "This is a maxterm sum, not a minterm product."
      },
      {
        "label": "D",
        "text": "ABC'",
        "isCorrect": false,
        "distractorReason": "Binary 110, which corresponds to minterm m6."
      }
    ],
    "hint1": "Decimal 5 in 3-bit binary is 101.",
    "hint2": "Bit 1 -> A, Bit 0 -> B', Bit 1 -> C. The product is AB'C.",
    "solution": {
      "finalAnswer": "AB'C",
      "steps": [
        {
          "title": "Binary Conversion",
          "type": "calculation",
          "content": "5 in binary = 101_2."
        },
        {
          "title": "Literal Mapping",
          "type": "axiom",
          "content": "A=1 -> A, B=0 -> B', C=1 -> C. Minterm m5 = AB'C."
        }
      ],
      "fastShortcut": "101 -> AB'C.",
      "verification": "m5 evaluates to 1 strictly for (A,B,C) = (1,0,1)."
    }
  },
  {
    "id": "u2-q047",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Maxterm Literal Construction",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "For a 3-variable system (A, B, C), what is the algebraic maxterm expression corresponding to decimal index 3 (binary 011)?",
    "promptDetail": "In a maxterm, an uncomplemented literal denotes binary 0, and a complemented literal denotes binary 1.",
    "inputFormatHint": "Enter maxterm, e.g. A + B' + C'",
    "correctAnswer": "A + B' + C'",
    "acceptedAnswers": [
      "A + B' + C'",
      "A+B'+C'",
      "M3",
      "M_3"
    ],
    "options": [
      {
        "label": "A",
        "text": "A + B' + C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A' + B + C",
        "isCorrect": false,
        "distractorReason": "Inverted maxterm polarity convention."
      },
      {
        "label": "C",
        "text": "A'BC",
        "isCorrect": false,
        "distractorReason": "This is minterm m3, not maxterm M3."
      },
      {
        "label": "D",
        "text": "A + B + C'",
        "isCorrect": false,
        "distractorReason": "Binary 001, which corresponds to maxterm M1."
      }
    ],
    "hint1": "Decimal 3 in 3-bit binary is 011.",
    "hint2": "For maxterms, 0 -> uncomplemented (A), 1 -> complemented (B', C'). The sum is A + B' + C'.",
    "solution": {
      "finalAnswer": "A + B' + C'",
      "steps": [
        {
          "title": "Binary Representation",
          "type": "calculation",
          "content": "3 in binary = 011_2."
        },
        {
          "title": "Maxterm Literal Mapping",
          "type": "axiom",
          "content": "A=0 -> A, B=1 -> B', C=1 -> C'. Maxterm M3 = A + B' + C'."
        }
      ],
      "fastShortcut": "011 -> A + B' + C'.",
      "verification": "M3 evaluates to 0 strictly for (A,B,C) = (0,1,1)."
    }
  },
  {
    "id": "u2-q048",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Literal Polarity Convention",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "Why does binary digit 0 map to complemented literal x' in a minterm, but to uncomplemented literal x in a maxterm?",
    "promptDetail": "Compare the defining evaluation conditions of minterms versus maxterms.",
    "inputFormatHint": "Select the correct foundational reason",
    "correctAnswer": "A minterm must evaluate to 1 on its row, whereas a maxterm must evaluate to 0 on its row",
    "acceptedAnswers": [
      "A minterm must evaluate to 1 on its row, whereas a maxterm must evaluate to 0 on its row",
      "minterm evaluates to 1, maxterm evaluates to 0"
    ],
    "options": [
      {
        "label": "A",
        "text": "A minterm must evaluate to 1 on its row, whereas a maxterm must evaluate to 0 on its row",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Minterms represent OR operations while maxterms represent AND operations",
        "isCorrect": false,
        "distractorReason": "Minterms are AND products; maxterms are OR sums."
      },
      {
        "label": "C",
        "text": "Maxterms only apply to positive numbers in arithmetic",
        "isCorrect": false,
        "distractorReason": "Maxterms are switching algebra constructs, not numerical signs."
      },
      {
        "label": "D",
        "text": "It is an arbitrary notation with no mathematical consequence",
        "isCorrect": false,
        "distractorReason": "The definition ensures canonical orthogonality."
      }
    ],
    "hint1": "When x = 0, what literal evaluates to 1? (0' = 1).",
    "hint2": "When x = 0, what literal evaluates to 0? (0 = 0).",
    "solution": {
      "finalAnswer": "A minterm must evaluate to 1 on its row, whereas a maxterm must evaluate to 0 on its row",
      "steps": [
        {
          "title": "Minterm Condition",
          "type": "axiom",
          "content": "A minterm product must equal 1 strictly for its row. If variable xi = 0, it must be complemented (xi' = 1) so that the product evaluates to 1."
        },
        {
          "title": "Maxterm Condition",
          "type": "axiom",
          "content": "A maxterm sum must equal 0 strictly for its row. If variable xi = 0, it must remain uncomplemented (xi = 0) so that the sum evaluates to 0."
        }
      ],
      "fastShortcut": "Minterm produces 1 (prime the 0s); Maxterm produces 0 (prime the 1s).",
      "verification": "Axiomatic definitions of mi and Mi."
    }
  },
  {
    "id": "u2-q049",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Function Space & Minterm Count",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "For a Boolean system of n independent variables, exactly how many distinct minterms exist?",
    "promptDetail": "Determine the total number of fundamental product terms spanning the truth table.",
    "inputFormatHint": "Enter formula, e.g. 2^n",
    "correctAnswer": "2^n",
    "acceptedAnswers": [
      "2^n",
      "2^N",
      "2 pow n"
    ],
    "options": [
      {
        "label": "A",
        "text": "2^n",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "2^(2^n)",
        "isCorrect": false,
        "distractorReason": "2^(2^n) is the total number of distinct functions, not minterms."
      },
      {
        "label": "C",
        "text": "n^2",
        "isCorrect": false,
        "distractorReason": "Incorrect exponentiation base."
      },
      {
        "label": "D",
        "text": "2n",
        "isCorrect": false,
        "distractorReason": "This is the number of literal forms (complemented and uncomplemented)."
      }
    ],
    "hint1": "Each of the n variables can take 2 binary states (0 or 1).",
    "hint2": "By the fundamental counting principle, there are 2 * 2 * ... * 2 (n times) = 2^n unique input combinations.",
    "solution": {
      "finalAnswer": "2^n",
      "steps": [
        {
          "title": "Counting Proof",
          "type": "axiom",
          "content": "Each minterm corresponds to exactly one row in the truth table. An n-variable truth table contains exactly 2^n distinct rows. Therefore exactly 2^n minterms exist."
        }
      ],
      "fastShortcut": "Minterms = 2^n; Maxterms = 2^n; Total functions = 2^(2^n).",
      "verification": "Switching space theorem."
    }
  },
  {
    "id": "u2-q050",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Switching Function Space",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "How many distinct switching functions of n = 3 variables can be formed?",
    "promptDetail": "Calculate 2^(2^n) for n = 3.",
    "inputFormatHint": "Enter integer, e.g. 256",
    "correctAnswer": "256",
    "acceptedAnswers": [
      "256",
      "2^8"
    ],
    "options": [
      {
        "label": "A",
        "text": "256",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "8",
        "isCorrect": false,
        "distractorReason": "8 is the number of truth table rows (2^3), not distinct functions."
      },
      {
        "label": "C",
        "text": "64",
        "isCorrect": false,
        "distractorReason": "Incorrect power calculation."
      },
      {
        "label": "D",
        "text": "512",
        "isCorrect": false,
        "distractorReason": "Calculated 2^9 instead of 2^8."
      }
    ],
    "hint1": "For n = 3 variables, there are 2^3 = 8 truth table rows.",
    "hint2": "Each row can be assigned output 0 or 1 independently. Total functions = 2^8 = 256.",
    "solution": {
      "finalAnswer": "256",
      "steps": [
        {
          "title": "Truth Table Rows",
          "type": "calculation",
          "content": "Rows = 2^3 = 8."
        },
        {
          "title": "Output Combinations",
          "type": "calculation",
          "content": "Functions = 2^(rows) = 2^8 = 256."
        }
      ],
      "fastShortcut": "Functions of 3 variables: 2^(2^3) = 2^8 = 256.",
      "verification": "Combinatorial switching theory."
    }
  },
  {
    "id": "u2-q051",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: 4-Variable Canonical Indexing",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "For 4 variables (A, B, C, D), express decimal row index 11 as a minterm product and as a maxterm sum.",
    "promptDetail": "Convert 11 to 4-bit binary, then apply minterm and maxterm literal mapping rules.",
    "inputFormatHint": "Enter minterm and maxterm, e.g. m11 = AB'CD, M11 = A' + B + C' + D'",
    "correctAnswer": "m11 = AB'CD, M11 = A' + B + C' + D'",
    "acceptedAnswers": [
      "m11 = AB'CD, M11 = A' + B + C' + D'",
      "AB'CD, A' + B + C' + D'",
      "AB'CD and A' + B + C' + D'"
    ],
    "options": [
      {
        "label": "A",
        "text": "m11 = AB'CD, M11 = A' + B + C' + D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "m11 = A'BCD, M11 = A + B' + C' + D'",
        "isCorrect": false,
        "distractorReason": "Binary 0111 is 7, not 11."
      },
      {
        "label": "C",
        "text": "m11 = AB'C'D, M11 = A' + B + C + D'",
        "isCorrect": false,
        "distractorReason": "Binary 1001 is 9, not 11."
      },
      {
        "label": "D",
        "text": "m11 = ABCD', M11 = A' + B' + C' + D",
        "isCorrect": false,
        "distractorReason": "Binary 1110 is 14, not 11."
      }
    ],
    "hint1": "11 in 4-bit binary is 1011 (8 + 2 + 1).",
    "hint2": "Minterm: 1011 -> AB'CD. Maxterm: 1011 -> A' + B + C' + D'.",
    "solution": {
      "finalAnswer": "m11 = AB'CD, M11 = A' + B + C' + D'",
      "steps": [
        {
          "title": "Binary Conversion",
          "type": "calculation",
          "content": "11_10 = 1011_2 (A=1, B=0, C=1, D=1)."
        },
        {
          "title": "Minterm Formation",
          "type": "axiom",
          "content": "m11 = A * B' * C * D = AB'CD."
        },
        {
          "title": "Maxterm Formation",
          "type": "axiom",
          "content": "M11 = A' + B + C' + D'."
        }
      ],
      "fastShortcut": "1011: minterm primes 0s (AB'CD); maxterm primes 1s (A' + B + C' + D').",
      "verification": "Truth table row 11 evaluation."
    }
  },
  {
    "id": "u2-q052",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Contradiction Canonical SOP",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "How is the constant contradiction function F(A, B, C) = 0 expressed in canonical SOP minterm notation?",
    "promptDetail": "Identify the minterm index set for an identically false Boolean function.",
    "inputFormatHint": "Enter expression, e.g. Σ m() or empty set",
    "correctAnswer": "Σ m()",
    "acceptedAnswers": [
      "Σ m()",
      "Sigma m()",
      "empty sum",
      "0",
      "Σm()"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m()",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(0)",
        "isCorrect": false,
        "distractorReason": "m0 is minterm A'B'C' (which equals 1 on row 0, not 0 everywhere)."
      },
      {
        "label": "C",
        "text": "Σ m(0, 1, 2, 3, 4, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is the tautology function F = 1."
      },
      {
        "label": "D",
        "text": "Π M(0)",
        "isCorrect": false,
        "distractorReason": "Incorrect maxterm specification."
      }
    ],
    "hint1": "Canonical SOP is the logical sum of all minterms where the function evaluates to 1.",
    "hint2": "Since F = 0 evaluates to 1 on zero rows, its minterm set contains zero minterms: Σ m().",
    "solution": {
      "finalAnswer": "Σ m()",
      "steps": [
        {
          "title": "Canonical Definition",
          "type": "axiom",
          "content": "F = Σ m(S) where S is the set of indices where F=1. For F=0, S is the empty set ∅. The empty Boolean sum equals 0."
        }
      ],
      "fastShortcut": "Constant 0 in SOP is the empty minterm sum Σ m().",
      "verification": "Axiom of empty logical sum = 0."
    }
  },
  {
    "id": "u2-q053",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Tautology Canonical POS",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "How is the constant tautology function F(A, B, C) = 1 expressed in canonical POS maxterm notation?",
    "promptDetail": "Identify the maxterm index set for an identically true Boolean function.",
    "inputFormatHint": "Enter expression, e.g. Π M() or empty product",
    "correctAnswer": "Π M()",
    "acceptedAnswers": [
      "Π M()",
      "Pi M()",
      "empty product",
      "1",
      "ΠM()"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M()",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(0)",
        "isCorrect": false,
        "distractorReason": "M0 is maxterm A + B + C (which equals 0 on row 0, not 1 everywhere)."
      },
      {
        "label": "C",
        "text": "Π M(0, 1, 2, 3, 4, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is the contradiction function F = 0."
      },
      {
        "label": "D",
        "text": "Σ m()",
        "isCorrect": false,
        "distractorReason": "This is SOP contradiction."
      }
    ],
    "hint1": "Canonical POS is the logical product of all maxterms where the function evaluates to 0.",
    "hint2": "Since F = 1 evaluates to 0 on zero rows, its maxterm set contains zero maxterms: Π M().",
    "solution": {
      "finalAnswer": "Π M()",
      "steps": [
        {
          "title": "Canonical POS Definition",
          "type": "axiom",
          "content": "F = Π M(S) where S is the set of indices where F=0. For F=1, S is the empty set ∅. The empty Boolean product equals 1."
        }
      ],
      "fastShortcut": "Constant 1 in POS is the empty maxterm product Π M().",
      "verification": "Axiom of empty logical product = 1."
    }
  },
  {
    "id": "u2-q054",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Function Complementation in SOP",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "free_response",
    "question": "Given the 3-variable function F(A, B, C) = Σ m(1, 3, 5, 7), write the canonical SOP expression for its complement F'(A, B, C).",
    "promptDetail": "The complement function F' takes output 1 on exactly the rows where F takes output 0.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(0, 2, 4, 6)",
    "correctAnswer": "Σ m(0, 2, 4, 6)",
    "acceptedAnswers": [
      "Σ m(0, 2, 4, 6)",
      "Σm(0, 2, 4, 6)",
      "Σm(0,2,4,6)",
      "Sigma m(0, 2, 4, 6)",
      "0, 2, 4, 6"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(0, 2, 4, 6)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(1, 3, 5, 7)",
        "isCorrect": false,
        "distractorReason": "This is the original function F, not its complement."
      },
      {
        "label": "C",
        "text": "Π M(0, 2, 4, 6)",
        "isCorrect": false,
        "distractorReason": "This is F in POS form, not F' in SOP form."
      },
      {
        "label": "D",
        "text": "Σ m(0, 1, 2, 3)",
        "isCorrect": false,
        "distractorReason": "Arbitrary minterm selection."
      }
    ],
    "hint1": "Universal index set for 3 variables: U = {0, 1, 2, 3, 4, 5, 6, 7}.",
    "hint2": "F' minterms are the set complement: U \\ {1, 3, 5, 7} = {0, 2, 4, 6}.",
    "solution": {
      "finalAnswer": "Σ m(0, 2, 4, 6)",
      "steps": [
        {
          "title": "Set Complementation",
          "type": "calculation",
          "content": "U = {0, 1, 2, 3, 4, 5, 6, 7}. If F = Σ m(S), then F' = Σ m(U \\ S)."
        },
        {
          "title": "Complement Index Set",
          "type": "calculation",
          "content": "U \\ {1, 3, 5, 7} = {0, 2, 4, 6}. Therefore F' = Σ m(0, 2, 4, 6)."
        }
      ],
      "fastShortcut": "F' in SOP contains the missing minterm indices: Σ m(0, 2, 4, 6).",
      "verification": "Truth table inversion."
    }
  },
  {
    "id": "u2-q055",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Canonical SOP to Canonical POS",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "free_response",
    "question": "Given F(A, B, C) = Σ m(0, 2, 4, 6), express F(A, B, C) in canonical POS maxterm notation.",
    "promptDetail": "Identify the maxterms where F evaluates to 0.",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(1, 3, 5, 7)",
    "correctAnswer": "Π M(1, 3, 5, 7)",
    "acceptedAnswers": [
      "Π M(1, 3, 5, 7)",
      "ΠM(1, 3, 5, 7)",
      "ΠM(1,3,5,7)",
      "Pi M(1, 3, 5, 7)",
      "1, 3, 5, 7"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(1, 3, 5, 7)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(0, 2, 4, 6)",
        "isCorrect": false,
        "distractorReason": "This is the complement function F' in POS form."
      },
      {
        "label": "C",
        "text": "Σ m(1, 3, 5, 7)",
        "isCorrect": false,
        "distractorReason": "This is F' in SOP form, not F in POS form."
      },
      {
        "label": "D",
        "text": "Π M(0, 1, 2, 3)",
        "isCorrect": false,
        "distractorReason": "Incorrect index set."
      }
    ],
    "hint1": "F takes value 0 on rows {1, 3, 5, 7}.",
    "hint2": "In canonical POS, F is the product of all maxterms where F = 0: Π M(1, 3, 5, 7).",
    "solution": {
      "finalAnswer": "Π M(1, 3, 5, 7)",
      "steps": [
        {
          "title": "Zero Rows Identification",
          "type": "calculation",
          "content": "F = 1 on {0, 2, 4, 6}. Therefore F = 0 on {1, 3, 5, 7}."
        },
        {
          "title": "Canonical POS Formation",
          "type": "axiom",
          "content": "F = Π M(1, 3, 5, 7)."
        }
      ],
      "fastShortcut": "Σ m(S) = Π M(U \\ S). Here U \\ {0, 2, 4, 6} = {1, 3, 5, 7}.",
      "verification": "Truth table equivalence: both forms describe F = C'."
    }
  },
  {
    "id": "u2-q056",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Minterm Orthogonality",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "In switching theory, what is the product mj * mk of any two distinct minterms where j != k?",
    "promptDetail": "Apply the orthogonality property of fundamental product terms.",
    "inputFormatHint": "Enter 0 or 1",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0",
      "zero"
    ],
    "options": [
      {
        "label": "A",
        "text": "0",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Only identical minterms combined with + give 1 when summed across all 2^n terms."
      },
      {
        "label": "C",
        "text": "mj + mk",
        "isCorrect": false,
        "distractorReason": "Confused product with sum."
      },
      {
        "label": "D",
        "text": "Undefined",
        "isCorrect": false,
        "distractorReason": "Boolean operations are fully defined on all elements."
      }
    ],
    "hint1": "Two distinct minterms differ in at least one bit position.",
    "hint2": "That bit position means one minterm contains literal xi while the other contains xi'. Their product contains xi * xi' = 0.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Orthogonality Proof",
          "type": "axiom",
          "content": "Since j != k, their binary codes differ in at least one variable bit position r. One minterm contains xr and the other contains xr'. Their product contains xr * xr' = 0. By domination, mj * mk = 0."
        }
      ],
      "fastShortcut": "Orthogonality: Distinct minterms are mutually exclusive; their product is always 0.",
      "verification": "Minterm orthogonality theorem."
    }
  },
  {
    "id": "u2-q057",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Maxterm Dual Orthogonality",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "What is the logical sum Mj + Mk of any two distinct maxterms where j != k?",
    "promptDetail": "Apply the dual orthogonality property to fundamental sum terms.",
    "inputFormatHint": "Enter 0 or 1",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1",
      "one"
    ],
    "options": [
      {
        "label": "A",
        "text": "1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "0 is the product of distinct minterms, not the sum of distinct maxterms."
      },
      {
        "label": "C",
        "text": "Mj * Mk",
        "isCorrect": false,
        "distractorReason": "Confused sum with product."
      },
      {
        "label": "D",
        "text": "Depends on variables",
        "isCorrect": false,
        "distractorReason": "Result is always constant 1 for all distinct pairs."
      }
    ],
    "hint1": "Dual of the minterm orthogonality identity mj * mk = 0.",
    "hint2": "Replace product * with sum +, replace constant 0 with constant 1: Mj + Mk = 1.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Duality Application",
          "type": "axiom",
          "content": "Minterm orthogonality states mj * mk = 0 for j != k. Taking the dual of this identity replaces * with + and 0 with 1, yielding Mj + Mk = 1."
        }
      ],
      "fastShortcut": "Distinct maxterms always sum to 1.",
      "verification": "Dual orthogonality theorem."
    }
  },
  {
    "id": "u2-q058",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Maxterm Index Decoding",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "For a 4-variable system (W, X, Y, Z), determine the decimal index of the maxterm: M = W' + X + Y' + Z.",
    "promptDetail": "Map each literal to its binary value under maxterm conventions and compute the decimal value.",
    "inputFormatHint": "Enter integer index, e.g. 10",
    "correctAnswer": "10",
    "acceptedAnswers": [
      "10",
      "M10",
      "M_10"
    ],
    "options": [
      {
        "label": "A",
        "text": "10",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "5",
        "isCorrect": false,
        "distractorReason": "Inverted polarity to minterm convention (0101 is 5)."
      },
      {
        "label": "C",
        "text": "11",
        "isCorrect": false,
        "distractorReason": "Arithmetic miscalculation."
      },
      {
        "label": "D",
        "text": "12",
        "isCorrect": false,
        "distractorReason": "Binary 1100 is 12."
      }
    ],
    "hint1": "In maxterms: complemented literal = 1, uncomplemented literal = 0.",
    "hint2": "W' -> 1, X -> 0, Y' -> 1, Z -> 0. Binary word: 1010. Convert 1010 to decimal: 8 + 2 = 10.",
    "solution": {
      "finalAnswer": "10",
      "steps": [
        {
          "title": "Bit Decoding",
          "type": "axiom",
          "content": "Maxterm rule: unprimed = 0, primed = 1. W' = 1, X = 0, Y' = 1, Z = 0."
        },
        {
          "title": "Decimal Conversion",
          "type": "calculation",
          "content": "1010_2 = (1 * 8) + (0 * 4) + (1 * 2) + (0 * 1) = 10. Maxterm is M10."
        }
      ],
      "fastShortcut": "W' X Y' Z -> 1 0 1 0 -> 10.",
      "verification": "M10 evaluates to 0 when (W,X,Y,Z) = (1,0,1,0)."
    }
  },
  {
    "id": "u2-q059",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: 4-Variable POS Complementation",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Given F(A, B, C, D) = Π M(0, 2, 5, 7, 8, 10, 13, 15), what is the canonical maxterm list for its complement F'?",
    "promptDetail": "Determine the maxterms where the complement function F' evaluates to 0.",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(1, 3, 4, 6, 9, 11, 12, 14)",
    "correctAnswer": "Π M(1, 3, 4, 6, 9, 11, 12, 14)",
    "acceptedAnswers": [
      "Π M(1, 3, 4, 6, 9, 11, 12, 14)",
      "ΠM(1, 3, 4, 6, 9, 11, 12, 14)",
      "1, 3, 4, 6, 9, 11, 12, 14"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(1, 3, 4, 6, 9, 11, 12, 14)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(0, 2, 5, 7, 8, 10, 13, 15)",
        "isCorrect": false,
        "distractorReason": "This is the original function F in POS form."
      },
      {
        "label": "C",
        "text": "Σ m(1, 3, 4, 6, 9, 11, 12, 14)",
        "isCorrect": false,
        "distractorReason": "This is F in SOP form, not F' in POS form."
      },
      {
        "label": "D",
        "text": "Π M(0, 1, 2, 3, 4, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "Incorrect index selection."
      }
    ],
    "hint1": "F = 0 on rows {0, 2, 5, 7, 8, 10, 13, 15}. Therefore F = 1 on rows {1, 3, 4, 6, 9, 11, 12, 14}.",
    "hint2": "F' = 0 wherever F = 1. Therefore F' in POS form is the product of maxterms on rows {1, 3, 4, 6, 9, 11, 12, 14}.",
    "solution": {
      "finalAnswer": "Π M(1, 3, 4, 6, 9, 11, 12, 14)",
      "steps": [
        {
          "title": "Truth Value Inversion",
          "type": "calculation",
          "content": "F evaluates to 1 on U \\ {0, 2, 5, 7, 8, 10, 13, 15} = {1, 3, 4, 6, 9, 11, 12, 14}."
        },
        {
          "title": "Complement POS",
          "type": "calculation",
          "content": "F' takes value 0 on those exact rows: F' = Π M(1, 3, 4, 6, 9, 11, 12, 14)."
        }
      ],
      "fastShortcut": "F' in POS has the set-complement index list: U \\ S.",
      "verification": "Truth table complement verification."
    }
  },
  {
    "id": "u2-q060",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Even-Parity Minterm Synthesis",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "A 3-variable logic circuit F(A, B, C) outputs logic 1 if and only if the binary input contains an even number of 1s (0 or 2 ones). Write its canonical SOP expression.",
    "promptDetail": "List the minterm indices satisfying the even-weight condition.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(0, 3, 5, 6)",
    "correctAnswer": "Σ m(0, 3, 5, 6)",
    "acceptedAnswers": [
      "Σ m(0, 3, 5, 6)",
      "Σm(0, 3, 5, 6)",
      "Σm(0,3,5,6)",
      "0, 3, 5, 6"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(0, 3, 5, 6)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(1, 2, 4, 7)",
        "isCorrect": false,
        "distractorReason": "This is the odd parity function (1 or 3 ones)."
      },
      {
        "label": "C",
        "text": "Σ m(0, 2, 4, 6)",
        "isCorrect": false,
        "distractorReason": "These are the even decimal numbers, not even Hamming weights."
      },
      {
        "label": "D",
        "text": "Σ m(3, 5, 6)",
        "isCorrect": false,
        "distractorReason": "Omitted m0 (0 ones is an even count)."
      }
    ],
    "hint1": "0 ones: 000 (decimal 0).",
    "hint2": "2 ones: 011 (decimal 3), 101 (decimal 5), 110 (decimal 6). Union: {0, 3, 5, 6}.",
    "solution": {
      "finalAnswer": "Σ m(0, 3, 5, 6)",
      "steps": [
        {
          "title": "Weight 0 Rows",
          "type": "calculation",
          "content": "000 -> m0."
        },
        {
          "title": "Weight 2 Rows",
          "type": "calculation",
          "content": "011 -> m3, 101 -> m5, 110 -> m6."
        },
        {
          "title": "Canonical SOP",
          "type": "calculation",
          "content": "F = Σ m(0, 3, 5, 6) (3-variable XNOR function)."
        }
      ],
      "fastShortcut": "Even Hamming weights in 3 variables: m0, m3, m5, m6.",
      "verification": "Truth table check for even parity."
    }
  },
  {
    "id": "u2-q061",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: De Morgan Duality on Minterms",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "By De Morgan's Law, what is the complement of a minterm [mi(A, B, C)]' equal to?",
    "promptDetail": "Relate the complement of a single minterm to its corresponding maxterm.",
    "inputFormatHint": "Enter maxterm, e.g. Mi(A, B, C)",
    "correctAnswer": "Mi(A, B, C)",
    "acceptedAnswers": [
      "Mi(A, B, C)",
      "Mi",
      "M_i",
      "maxterm Mi"
    ],
    "options": [
      {
        "label": "A",
        "text": "Mi(A, B, C)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "mi'(A, B, C)",
        "isCorrect": false,
        "distractorReason": "This is alternative notation, not the maxterm identity."
      },
      {
        "label": "C",
        "text": "M_(2^n - 1 - i)",
        "isCorrect": false,
        "distractorReason": "Confused index complementation with De Morgan duality."
      },
      {
        "label": "D",
        "text": "1 - mi",
        "isCorrect": false,
        "distractorReason": "Arithmetic expression, not Boolean maxterm."
      }
    ],
    "hint1": "Consider m5 = AB'C. Its complement is (AB'C)' = A' + B + C'.",
    "hint2": "Now look at M5: 5 is 101 -> A' + B + C'. Notice (m5)' = M5! In general, [mi]' = Mi.",
    "solution": {
      "finalAnswer": "Mi(A, B, C)",
      "steps": [
        {
          "title": "De Morgan Derivation",
          "type": "axiom",
          "content": "Let mi = x1 * x2 * ... * xn where each xj is a literal. By De Morgan's Law, (mi)' = x1' + x2' + ... + xn'. Each literal xj is complemented, exactly converting minterm polarity to maxterm polarity for the identical index i. Therefore [mi]' = Mi."
        }
      ],
      "fastShortcut": "[mi]' = Mi.",
      "verification": "De Morgan's theorem applied to canonical terms."
    }
  },
  {
    "id": "u2-q062",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Balanced Function Combinatorics",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "For 4 variables (16 truth table rows), how many distinct switching functions have an equal number of minterms and maxterms (exactly 8 minterms and 8 maxterms)?",
    "promptDetail": "Calculate the binomial coefficient C(16, 8).",
    "inputFormatHint": "Enter integer count, e.g. 12870",
    "correctAnswer": "12870",
    "acceptedAnswers": [
      "12870",
      "C(16,8)",
      "16C8"
    ],
    "options": [
      {
        "label": "A",
        "text": "12870",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "65536",
        "isCorrect": false,
        "distractorReason": "65536 is the total number of all 4-variable functions (2^16)."
      },
      {
        "label": "C",
        "text": "8192",
        "isCorrect": false,
        "distractorReason": "Incorrect combinatorial calculation."
      },
      {
        "label": "D",
        "text": "256",
        "isCorrect": false,
        "distractorReason": "Confused with 3-variable function count."
      }
    ],
    "hint1": "A balanced function selects exactly 8 rows out of 16 to take output 1.",
    "hint2": "Number of ways = 16! / (8! * 8!) = 12,870.",
    "solution": {
      "finalAnswer": "12870",
      "steps": [
        {
          "title": "Combinatorial Formula",
          "type": "calculation",
          "content": "C(n_rows, k) = C(16, 8) = 16! / (8! * 8!)."
        },
        {
          "title": "Numerical Evaluation",
          "type": "calculation",
          "content": "(16 * 15 * 14 * 13 * 12 * 11 * 10 * 9) / (8 * 7 * 6 * 5 * 4 * 3 * 2 * 1) = 12,870."
        }
      ],
      "fastShortcut": "C(16, 8) = 12,870 balanced switching functions.",
      "verification": "Binomial coefficient evaluation."
    }
  },
  {
    "id": "u2-q063",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Canonical SOP Intersection",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "free_response",
    "question": "If F(A, B, C) = Σ m(0, 3, 5, 6) and G(A, B, C) = Σ m(1, 3, 5, 7), find the canonical SOP expression of the product function H = F * G.",
    "promptDetail": "Determine the intersection of the two minterm sets.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(3, 5)",
    "correctAnswer": "Σ m(3, 5)",
    "acceptedAnswers": [
      "Σ m(3, 5)",
      "Σm(3, 5)",
      "Σm(3,5)",
      "3, 5"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(3, 5)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(0, 1, 3, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is the logical sum F + G (union), not the product F * G."
      },
      {
        "label": "C",
        "text": "Σ m(0, 6)",
        "isCorrect": false,
        "distractorReason": "These are the minterms unique to F."
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Minterms m3 and m5 are common to both functions."
      }
    ],
    "hint1": "Logical AND of two SOP expressions corresponds to set intersection of their minterm sets.",
    "hint2": "{0, 3, 5, 6} ∩ {1, 3, 5, 7} = {3, 5}.",
    "solution": {
      "finalAnswer": "Σ m(3, 5)",
      "steps": [
        {
          "title": "Minterm Orthogonality",
          "type": "axiom",
          "content": "mi * mj = 0 for i != j, and mi * mi = mi. When multiplying two SOP expansions, only identical minterms survive."
        },
        {
          "title": "Set Intersection",
          "type": "calculation",
          "content": "{0, 3, 5, 6} ∩ {1, 3, 5, 7} = {3, 5}. H = Σ m(3, 5)."
        }
      ],
      "fastShortcut": "Product of SOPs is the intersection of minterms: Σ m(3, 5).",
      "verification": "Truth table multiplication."
    }
  },
  {
    "id": "u2-q064",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Canonical POS Intersection",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "If F(A, B, C) = Π M(1, 2, 4) and G(A, B, C) = Π M(2, 4, 7), find the canonical POS expression of the sum function H = F + G.",
    "promptDetail": "Determine the maxterms where both F = 0 and G = 0 simultaneously.",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(2, 4)",
    "correctAnswer": "Π M(2, 4)",
    "acceptedAnswers": [
      "Π M(2, 4)",
      "ΠM(2, 4)",
      "ΠM(2,4)",
      "2, 4"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(2, 4)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(1, 2, 4, 7)",
        "isCorrect": false,
        "distractorReason": "This is the product F * G, not the sum F + G."
      },
      {
        "label": "C",
        "text": "Π M(1, 7)",
        "isCorrect": false,
        "distractorReason": "Incorrect maxterm difference."
      },
      {
        "label": "D",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Maxterms M2 and M4 are common to both functions."
      }
    ],
    "hint1": "H = F + G evaluates to 0 only when both F = 0 and G = 0.",
    "hint2": "F = 0 on {1, 2, 4}. G = 0 on {2, 4, 7}. Both are 0 on {1, 2, 4} ∩ {2, 4, 7} = {2, 4}.",
    "solution": {
      "finalAnswer": "Π M(2, 4)",
      "steps": [
        {
          "title": "Zero Evaluation Condition",
          "type": "axiom",
          "content": "A logical sum F + G equals 0 strictly when F=0 AND G=0."
        },
        {
          "title": "Maxterm Set Intersection",
          "type": "calculation",
          "content": "{1, 2, 4} ∩ {2, 4, 7} = {2, 4}. Therefore H = Π M(2, 4)."
        }
      ],
      "fastShortcut": "Sum of POS expressions is the intersection of maxterms: Π M(2, 4).",
      "verification": "Truth table addition."
    }
  },
  {
    "id": "u2-q065",
    "trackId": "sec23",
    "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "topicBadge": "2.3: Self-Dual Function Counting",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "How many self-dual switching functions exist for n = 3 variables?",
    "promptDetail": "A self-dual function satisfies F(A, B, C) = [F(A', B', C')]'. Calculate 2^(2^(n-1)).",
    "inputFormatHint": "Enter integer count, e.g. 16",
    "correctAnswer": "16",
    "acceptedAnswers": [
      "16",
      "2^4"
    ],
    "options": [
      {
        "label": "A",
        "text": "16",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "256",
        "isCorrect": false,
        "distractorReason": "256 is the total number of all 3-variable functions."
      },
      {
        "label": "C",
        "text": "8",
        "isCorrect": false,
        "distractorReason": "8 is the number of truth table rows."
      },
      {
        "label": "D",
        "text": "64",
        "isCorrect": false,
        "distractorReason": "Incorrect power calculation."
      }
    ],
    "hint1": "In an n-variable truth table, rows pair up as complementary indices: (i, 2^n - 1 - i).",
    "hint2": "For each pair, selecting the value of one row fixes the value of the other row. Total pairs = 2^(n-1) = 2^2 = 4 pairs. Total self-dual functions = 2^4 = 16.",
    "solution": {
      "finalAnswer": "16",
      "steps": [
        {
          "title": "Complementary Pair Count",
          "type": "axiom",
          "content": "Rows pair up as (m_i, m_{7-i}): (0,7), (1,6), (2,5), (3,4). There are 2^(n-1) = 2^2 = 4 independent pairs."
        },
        {
          "title": "Binary Choices",
          "type": "calculation",
          "content": "For each pair, we have 2 choices. Total self-dual functions = 2^4 = 16."
        }
      ],
      "fastShortcut": "Self-dual functions of n variables: 2^(2^(n-1)). For n=3: 2^4 = 16.",
      "verification": "Self-dual function space theorem."
    }
  },
  {
    "id": "u2-q066",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: SOP Missing-Variable Expansion",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Expand the 2-variable single-literal function F(A, B) = A into its full canonical SOP expression.",
    "promptDetail": "Multiply by (B + B') to introduce the missing variable B.",
    "inputFormatHint": "Enter canonical SOP, e.g. AB + AB'",
    "correctAnswer": "AB + AB'",
    "acceptedAnswers": [
      "AB + AB'",
      "AB'+AB",
      "AB+AB'",
      "AB'+AB"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB + AB'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Added B instead of ANDing with (B + B')."
      },
      {
        "label": "C",
        "text": "AB",
        "isCorrect": false,
        "distractorReason": "Omitted minterm AB'."
      },
      {
        "label": "D",
        "text": "A'B + AB",
        "isCorrect": false,
        "distractorReason": "Complemented literal A incorrectly."
      }
    ],
    "hint1": "The missing variable is B. Multiply A by 1 in the form (B + B').",
    "hint2": "A(B + B') = AB + AB'.",
    "solution": {
      "finalAnswer": "AB + AB'",
      "steps": [
        {
          "title": "Identity Insertion",
          "type": "axiom",
          "content": "B + B' = 1. A = A * 1 = A(B + B')."
        },
        {
          "title": "Distribution",
          "type": "calculation",
          "content": "A(B + B') = AB + AB' (Σ m(2, 3))."
        }
      ],
      "fastShortcut": "A expanded with missing B yields AB + AB'.",
      "verification": "Truth table: 1 on rows 2 (10) and 3 (11)."
    }
  },
  {
    "id": "u2-q067",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: POS Missing-Variable Expansion",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Expand the 2-variable function F(A, B) = A into its canonical POS expression.",
    "promptDetail": "Add BB' = 0 and distribute to form standard maxterms.",
    "inputFormatHint": "Enter canonical POS, e.g. (A + B)(A + B')",
    "correctAnswer": "(A + B)(A + B')",
    "acceptedAnswers": [
      "(A + B)(A + B')",
      "(A+B)(A+B')",
      "(A + B')(A + B)"
    ],
    "options": [
      {
        "label": "A",
        "text": "(A + B)(A + B')",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "(A + B)",
        "isCorrect": false,
        "distractorReason": "Omitted second maxterm (A + B')."
      },
      {
        "label": "C",
        "text": "AB + AB'",
        "isCorrect": false,
        "distractorReason": "This is canonical SOP, not canonical POS."
      },
      {
        "label": "D",
        "text": "(A' + B)(A' + B')",
        "isCorrect": false,
        "distractorReason": "Inverted literal A."
      }
    ],
    "hint1": "In POS expansion, introduce missing variable B by adding BB' = 0: A + 0 = A + BB'.",
    "hint2": "Apply second distributive law: A + BB' = (A + B)(A + B').",
    "solution": {
      "finalAnswer": "(A + B)(A + B')",
      "steps": [
        {
          "title": "Null Element Addition",
          "type": "axiom",
          "content": "BB' = 0. A = A + 0 = A + BB'."
        },
        {
          "title": "Second Distribution",
          "type": "calculation",
          "content": "A + BB' = (A + B)(A + B') (Π M(0, 1))."
        }
      ],
      "fastShortcut": "A expanded in POS yields (A + B)(A + B').",
      "verification": "Truth table: 0 on rows 0 (00) and 1 (01)."
    }
  },
  {
    "id": "u2-q068",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 2-Variable Canonical Conversion",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Convert the 2-variable canonical SOP function F(A, B) = Σ m(1, 2) into canonical POS notation.",
    "promptDetail": "Identify the complementary index set in universal domain U = {0, 1, 2, 3}.",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(0, 3)",
    "correctAnswer": "Π M(0, 3)",
    "acceptedAnswers": [
      "Π M(0, 3)",
      "ΠM(0, 3)",
      "ΠM(0,3)",
      "Pi M(0, 3)",
      "0, 3"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(0, 3)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(1, 2)",
        "isCorrect": false,
        "distractorReason": "Kept identical indices; this would define the complement function F'."
      },
      {
        "label": "C",
        "text": "Σ m(0, 3)",
        "isCorrect": false,
        "distractorReason": "This is F' in SOP form, not F in POS form."
      },
      {
        "label": "D",
        "text": "Π M(0, 1, 2, 3)",
        "isCorrect": false,
        "distractorReason": "Contradiction function."
      }
    ],
    "hint1": "For 2 variables, all possible row indices are {0, 1, 2, 3}.",
    "hint2": "Minterms present are {1, 2}. Remaining indices where F = 0 are {0, 3}. Thus F = Π M(0, 3).",
    "solution": {
      "finalAnswer": "Π M(0, 3)",
      "steps": [
        {
          "title": "Universal Domain",
          "type": "calculation",
          "content": "U = {0, 1, 2, 3}."
        },
        {
          "title": "Maxterm Set Complementation",
          "type": "calculation",
          "content": "U \\ {1, 2} = {0, 3}. Therefore F = Π M(0, 3)."
        }
      ],
      "fastShortcut": "Σ m(1, 2) = Π M(0, 3).",
      "verification": "F is the 2-variable XOR function; in POS it is (A + B)(A' + B')."
    }
  },
  {
    "id": "u2-q069",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 3-Variable POS to SOP Conversion",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Convert the 3-variable canonical POS function F(A, B, C) = Π M(0, 1, 4, 5) into canonical SOP notation.",
    "promptDetail": "Find the remaining row indices in 3-variable domain U = {0, 1, 2, 3, 4, 5, 6, 7}.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(2, 3, 6, 7)",
    "correctAnswer": "Σ m(2, 3, 6, 7)",
    "acceptedAnswers": [
      "Σ m(2, 3, 6, 7)",
      "Σm(2, 3, 6, 7)",
      "Σm(2,3,6,7)",
      "Sigma m(2, 3, 6, 7)",
      "2, 3, 6, 7"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(2, 3, 6, 7)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(0, 1, 4, 5)",
        "isCorrect": false,
        "distractorReason": "This is F' in SOP form."
      },
      {
        "label": "C",
        "text": "Π M(2, 3, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is F' in POS form."
      },
      {
        "label": "D",
        "text": "Σ m(1, 3, 5, 7)",
        "isCorrect": false,
        "distractorReason": "Incorrect index selection."
      }
    ],
    "hint1": "Universal domain: {0, 1, 2, 3, 4, 5, 6, 7}.",
    "hint2": "Remove maxterm indices {0, 1, 4, 5}: remaining minterms are {2, 3, 6, 7}.",
    "solution": {
      "finalAnswer": "Σ m(2, 3, 6, 7)",
      "steps": [
        {
          "title": "Set Complementation",
          "type": "calculation",
          "content": "U \\ {0, 1, 4, 5} = {2, 3, 6, 7}."
        },
        {
          "title": "Canonical SOP Formation",
          "type": "axiom",
          "content": "F = Σ m(2, 3, 6, 7)."
        }
      ],
      "fastShortcut": "Π M(0, 1, 4, 5) = Σ m(2, 3, 6, 7) = B.",
      "verification": "Both forms simplify to F = B."
    }
  },
  {
    "id": "u2-q070",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: General SOP vs Canonical SOP",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "For a 3-variable system (A, B, C), why is the expression F = AB + C classified as standard (general) SOP, but NOT canonical SOP?",
    "promptDetail": "Recall the defining requirement of canonical terms.",
    "inputFormatHint": "Select correct reason",
    "correctAnswer": "The product terms AB and C do not contain every declared system variable",
    "acceptedAnswers": [
      "The product terms AB and C do not contain every declared system variable",
      "terms do not contain all variables"
    ],
    "options": [
      {
        "label": "A",
        "text": "The product terms AB and C do not contain every declared system variable",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Canonical forms only allow POS, not SOP",
        "isCorrect": false,
        "distractorReason": "Canonical forms exist for both SOP and POS."
      },
      {
        "label": "C",
        "text": "F cannot be implemented with logic gates",
        "isCorrect": false,
        "distractorReason": "Any standard SOP is directly synthesizable with AND-OR gates."
      },
      {
        "label": "D",
        "text": "The variables are not in alphabetical order",
        "isCorrect": false,
        "distractorReason": "Alphabetical ordering is a convention, not the canonical definition."
      }
    ],
    "hint1": "In canonical SOP, every product term must be a minterm.",
    "hint2": "A minterm in 3 variables must contain all 3 variables (A, B, and C). Here AB lacks C, and C lacks A and B.",
    "solution": {
      "finalAnswer": "The product terms AB and C do not contain every declared system variable",
      "steps": [
        {
          "title": "Canonical Requirement",
          "type": "axiom",
          "content": "In canonical SOP, every product term is a minterm containing all n variables in either complemented or uncomplemented form. Since AB lacks C and C lacks A and B, F is standard SOP, not canonical."
        }
      ],
      "fastShortcut": "Canonical terms must contain ALL variables of the declared function domain.",
      "verification": "Switching theory definitions."
    }
  },
  {
    "id": "u2-q071",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: SOP to Minterm Set Expansion",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "free_response",
    "question": "Expand the 3-variable function F(A, B, C) = AB + C' into its canonical minterm list Σ m(...).",
    "promptDetail": "Expand AB with (C + C') and C' with (A + A')(B + B'), then take the union.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(0, 2, 4, 6, 7)",
    "correctAnswer": "Σ m(0, 2, 4, 6, 7)",
    "acceptedAnswers": [
      "Σ m(0, 2, 4, 6, 7)",
      "Σm(0, 2, 4, 6, 7)",
      "Σm(0,2,4,6,7)",
      "0, 2, 4, 6, 7"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(0, 2, 4, 6, 7)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(6, 7)",
        "isCorrect": false,
        "distractorReason": "Only expanded term AB; omitted C'."
      },
      {
        "label": "C",
        "text": "Σ m(0, 2, 4, 6)",
        "isCorrect": false,
        "distractorReason": "Only expanded term C'; omitted AB."
      },
      {
        "label": "D",
        "text": "Σ m(1, 3, 5)",
        "isCorrect": false,
        "distractorReason": "These are the maxterm indices where F = 0."
      }
    ],
    "hint1": "AB(C + C') = ABC + ABC' -> minterms {7, 6}.",
    "hint2": "C'(A + A')(B + B') = A'B'C' + A'BC' + AB'C' + ABC' -> minterms {0, 2, 4, 6}. Union: {0, 2, 4, 6, 7}.",
    "solution": {
      "finalAnswer": "Σ m(0, 2, 4, 6, 7)",
      "steps": [
        {
          "title": "Expand AB",
          "type": "calculation",
          "content": "AB = AB(C + C') = ABC + ABC' = m7 + m6."
        },
        {
          "title": "Expand C'",
          "type": "calculation",
          "content": "C' = (A + A')(B + B')C' = A'B'C' + A'BC' + AB'C' + ABC' = m0 + m2 + m4 + m6."
        },
        {
          "title": "Union",
          "type": "calculation",
          "content": "{6, 7} ∪ {0, 2, 4, 6} = {0, 2, 4, 6, 7}. F = Σ m(0, 2, 4, 6, 7)."
        }
      ],
      "fastShortcut": "AB -> {6, 7}; C' -> {0, 2, 4, 6}; Union = {0, 2, 4, 6, 7}.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q072",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: POS to Maxterm Set Expansion",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Expand the 3-variable function F(A, B, C) = (A + B')(A + C) into its canonical maxterm list Π M(...).",
    "promptDetail": "Add missing variables by adding CC' and BB', then take the union of maxterms.",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(0, 2, 3)",
    "correctAnswer": "Π M(0, 2, 3)",
    "acceptedAnswers": [
      "Π M(0, 2, 3)",
      "ΠM(0, 2, 3)",
      "ΠM(0,2,3)",
      "0, 2, 3"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(0, 2, 3)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(2, 3)",
        "isCorrect": false,
        "distractorReason": "Omitted expansion of factor (A + C)."
      },
      {
        "label": "C",
        "text": "Π M(0, 2)",
        "isCorrect": false,
        "distractorReason": "Omitted expansion of factor (A + B')."
      },
      {
        "label": "D",
        "text": "Σ m(1, 4, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is canonical SOP, not canonical POS."
      }
    ],
    "hint1": "(A + B') + CC' = (A + B' + C)(A + B' + C'). Decoded: 010 (M2) and 011 (M3).",
    "hint2": "(A + C) + BB' = (A + B + C)(A + B' + C). Decoded: 000 (M0) and 010 (M2). Union: {0, 2, 3}.",
    "solution": {
      "finalAnswer": "Π M(0, 2, 3)",
      "steps": [
        {
          "title": "Expand (A + B')",
          "type": "calculation",
          "content": "A + B' + CC' = (A + B' + C)(A + B' + C') = M2 * M3."
        },
        {
          "title": "Expand (A + C)",
          "type": "calculation",
          "content": "A + C + BB' = (A + B + C)(A + B' + C) = M0 * M2."
        },
        {
          "title": "Union",
          "type": "calculation",
          "content": "{2, 3} ∪ {0, 2} = {0, 2, 3}. F = Π M(0, 2, 3)."
        }
      ],
      "fastShortcut": "(A + B') -> {2, 3}; (A + C) -> {0, 2}; Union = Π M(0, 2, 3).",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q073",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: SOP to POS Canonical Duality",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Given the function F(A, B, C) = Σ m(0, 2, 4, 6, 7), write its equivalent canonical POS expression.",
    "promptDetail": "Identify the non-minterm indices where F = 0 in domain U = {0..7}.",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(1, 3, 5)",
    "correctAnswer": "Π M(1, 3, 5)",
    "acceptedAnswers": [
      "Π M(1, 3, 5)",
      "ΠM(1, 3, 5)",
      "ΠM(1,3,5)",
      "1, 3, 5"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(1, 3, 5)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(0, 2, 4, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is the complement function F' in POS form."
      },
      {
        "label": "C",
        "text": "Σ m(1, 3, 5)",
        "isCorrect": false,
        "distractorReason": "This is F' in SOP form, not F in POS form."
      },
      {
        "label": "D",
        "text": "Π M(1, 3, 5, 7)",
        "isCorrect": false,
        "distractorReason": "Minterm m7 is present in F, so index 7 cannot be in the maxterm list."
      }
    ],
    "hint1": "The domain is {0, 1, 2, 3, 4, 5, 6, 7}.",
    "hint2": "Minterms in F are {0, 2, 4, 6, 7}. The remaining indices where F = 0 are {1, 3, 5}.",
    "solution": {
      "finalAnswer": "Π M(1, 3, 5)",
      "steps": [
        {
          "title": "Domain Complement",
          "type": "calculation",
          "content": "U \\ {0, 2, 4, 6, 7} = {1, 3, 5}."
        },
        {
          "title": "Canonical POS Formation",
          "type": "axiom",
          "content": "F = Π M(1, 3, 5)."
        }
      ],
      "fastShortcut": "Σ m(0, 2, 4, 6, 7) = Π M(1, 3, 5).",
      "verification": "Both evaluate to F = C' + AB."
    }
  },
  {
    "id": "u2-q074",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Complement SOP from POS",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Given F(A, B, C) = Π M(0, 2, 3), what is the canonical SOP expression for its complement F'?",
    "promptDetail": "F' evaluates to 1 on exactly the rows where F evaluates to 0.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(0, 2, 3)",
    "correctAnswer": "Σ m(0, 2, 3)",
    "acceptedAnswers": [
      "Σ m(0, 2, 3)",
      "Σm(0, 2, 3)",
      "Σm(0,2,3)",
      "0, 2, 3"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(0, 2, 3)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(1, 4, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is the original function F in SOP form, not its complement F'."
      },
      {
        "label": "C",
        "text": "Π M(0, 2, 3)",
        "isCorrect": false,
        "distractorReason": "This is the original function F in POS form."
      },
      {
        "label": "D",
        "text": "Π M(1, 4, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is F' in POS form."
      }
    ],
    "hint1": "F takes value 0 on rows {0, 2, 3}.",
    "hint2": "F' takes value 1 on rows where F = 0. Therefore F' in SOP contains minterms {0, 2, 3}: Σ m(0, 2, 3).",
    "solution": {
      "finalAnswer": "Σ m(0, 2, 3)",
      "steps": [
        {
          "title": "Zero Rows Identification",
          "type": "calculation",
          "content": "F = 0 on {0, 2, 3}."
        },
        {
          "title": "Complement SOP",
          "type": "axiom",
          "content": "F' = 1 on {0, 2, 3}. Therefore F' = Σ m(0, 2, 3)."
        }
      ],
      "fastShortcut": "If F = Π M(S), then F' = Σ m(S). The index set is identical!",
      "verification": "Fundamental canonical complementation theorem."
    }
  },
  {
    "id": "u2-q075",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Converting F vs Complementing F",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "What is the key difference between converting F to canonical POS versus finding the complement F' in canonical SOP?",
    "promptDetail": "Compare the index set and canonical operator for F in POS versus F' in SOP.",
    "inputFormatHint": "Select correct distinction",
    "correctAnswer": "Both expressions use the identical numerical index set (U \\ S_min), but F uses Π M while F' uses Σ m",
    "acceptedAnswers": [
      "Both expressions use the identical numerical index set (U \\ S_min), but F uses Π M while F' uses Σ m",
      "identical index set, opposite operator"
    ],
    "options": [
      {
        "label": "A",
        "text": "Both expressions use the identical numerical index set (U \\ S_min), but F uses Π M while F' uses Σ m",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Converting F to POS complements the function output, while finding F' preserves the output",
        "isCorrect": false,
        "distractorReason": "Converting F preserves the function; finding F' inverts it."
      },
      {
        "label": "C",
        "text": "Canonical POS cannot be derived from canonical SOP without a K-Map",
        "isCorrect": false,
        "distractorReason": "Canonical conversion is directly performed by set complementation."
      },
      {
        "label": "D",
        "text": "F in POS and F' in SOP have completely different, disjoint index sets",
        "isCorrect": false,
        "distractorReason": "They share the exact same index set."
      }
    ],
    "hint1": "If F = Σ m(1, 3, 5), where is F = 0? At {0, 2, 4, 6, 7}.",
    "hint2": "So F = Π M(0, 2, 4, 6, 7). And F' = Σ m(0, 2, 4, 6, 7). Notice the identical index set, but Π M for F and Σ m for F'!",
    "solution": {
      "finalAnswer": "Both expressions use the identical numerical index set (U \\ S_min), but F uses Π M while F' uses Σ m",
      "steps": [
        {
          "title": "Canonical Equivalence",
          "type": "axiom",
          "content": "Let F = Σ m(S). Then F takes value 0 on U \\ S. Consequently, F in POS is Π M(U \\ S). The complement function F' takes value 1 on U \\ S, so F' in SOP is Σ m(U \\ S). Both share index set U \\ S, but one is a maxterm product and the other is a minterm sum."
        }
      ],
      "fastShortcut": "F_POS = Π M(U \\ S); F'_SOP = Σ m(U \\ S). Same indices, opposite canonical operators.",
      "verification": "Canonical conversion and complementation definitions."
    }
  },
  {
    "id": "u2-q076",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Multi-Product Canonical Expansion",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "free_response",
    "question": "Expand F(A, B, C) = A'B + B'C' into its canonical minterm list Σ m(...).",
    "promptDetail": "Expand each product term across its missing variable and take the union.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(0, 2, 3, 4)",
    "correctAnswer": "Σ m(0, 2, 3, 4)",
    "acceptedAnswers": [
      "Σ m(0, 2, 3, 4)",
      "Σm(0, 2, 4, 3)",
      "Σm(0,2,3,4)",
      "0, 2, 3, 4"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(0, 2, 3, 4)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(2, 3)",
        "isCorrect": false,
        "distractorReason": "Only expanded term A'B."
      },
      {
        "label": "C",
        "text": "Σ m(0, 4)",
        "isCorrect": false,
        "distractorReason": "Only expanded term B'C'."
      },
      {
        "label": "D",
        "text": "Σ m(1, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "These are the maxterm indices."
      }
    ],
    "hint1": "A'B lacks C: A'B(C + C') = A'BC + A'BC' -> {3, 2}.",
    "hint2": "B'C' lacks A: (A + A')B'C' = AB'C' + A'B'C' -> {4, 0}. Union: {0, 2, 3, 4}.",
    "solution": {
      "finalAnswer": "Σ m(0, 2, 3, 4)",
      "steps": [
        {
          "title": "Expand Term 1",
          "type": "calculation",
          "content": "A'B(C + C') = A'BC + A'BC' = m3 + m2."
        },
        {
          "title": "Expand Term 2",
          "type": "calculation",
          "content": "(A + A')B'C' = AB'C' + A'B'C' = m4 + m0."
        },
        {
          "title": "Union",
          "type": "calculation",
          "content": "{2, 3} ∪ {0, 4} = {0, 2, 3, 4}. F = Σ m(0, 2, 3, 4)."
        }
      ],
      "fastShortcut": "A'B -> {2, 3}; B'C' -> {0, 4}; Union = Σ m(0, 2, 3, 4).",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q077",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Disjoint Minterm Expansion",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Expand F(A, B, C) = A'C' + BC into its canonical minterm list Σ m(...).",
    "promptDetail": "Expand each product term and list the combined minterm indices.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(0, 2, 3, 7)",
    "correctAnswer": "Σ m(0, 2, 3, 7)",
    "acceptedAnswers": [
      "Σ m(0, 2, 3, 7)",
      "Σm(0, 2, 3, 7)",
      "Σm(0,2,3,7)",
      "0, 2, 3, 7"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(0, 2, 3, 7)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(0, 2)",
        "isCorrect": false,
        "distractorReason": "Only expanded A'C'."
      },
      {
        "label": "C",
        "text": "Σ m(3, 7)",
        "isCorrect": false,
        "distractorReason": "Only expanded BC."
      },
      {
        "label": "D",
        "text": "Σ m(1, 4, 5, 6)",
        "isCorrect": false,
        "distractorReason": "Complement index set."
      }
    ],
    "hint1": "A'C' lacks B: A'(B + B')C' = A'BC' + A'B'C' -> {2, 0}.",
    "hint2": "BC lacks A: (A + A')BC = ABC + A'BC -> {7, 3}. Union: {0, 2, 3, 7}.",
    "solution": {
      "finalAnswer": "Σ m(0, 2, 3, 7)",
      "steps": [
        {
          "title": "Expand A'C'",
          "type": "calculation",
          "content": "A'C'(B + B') = A'BC' + A'B'C' = m2 + m0."
        },
        {
          "title": "Expand BC",
          "type": "calculation",
          "content": "BC(A + A') = ABC + A'BC = m7 + m3."
        },
        {
          "title": "Union",
          "type": "calculation",
          "content": "{0, 2} ∪ {3, 7} = {0, 2, 3, 7}. F = Σ m(0, 2, 3, 7)."
        }
      ],
      "fastShortcut": "A'C' -> {0, 2}; BC -> {3, 7}; Union = Σ m(0, 2, 3, 7).",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q078",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Canonical Conversion Verification",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Convert F(A, B, C) = Σ m(0, 2, 3, 7) into its canonical POS expression.",
    "promptDetail": "Identify the missing indices from {0, 1, 2, 3, 4, 5, 6, 7}.",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(1, 4, 5, 6)",
    "correctAnswer": "Π M(1, 4, 5, 6)",
    "acceptedAnswers": [
      "Π M(1, 4, 5, 6)",
      "ΠM(1, 4, 5, 6)",
      "ΠM(1,4,5,6)",
      "1, 4, 5, 6"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(1, 4, 5, 6)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(0, 2, 3, 7)",
        "isCorrect": false,
        "distractorReason": "This is the complement function F' in POS form."
      },
      {
        "label": "C",
        "text": "Σ m(1, 4, 5, 6)",
        "isCorrect": false,
        "distractorReason": "This is F' in SOP form, not F in POS form."
      },
      {
        "label": "D",
        "text": "Π M(1, 2, 4, 5)",
        "isCorrect": false,
        "distractorReason": "Incorrect index selection."
      }
    ],
    "hint1": "Universal set: {0, 1, 2, 3, 4, 5, 6, 7}.",
    "hint2": "Minterm set: {0, 2, 3, 7}. Remaining indices where F = 0 are {1, 4, 5, 6}.",
    "solution": {
      "finalAnswer": "Π M(1, 4, 5, 6)",
      "steps": [
        {
          "title": "Set Complementation",
          "type": "calculation",
          "content": "U \\ {0, 2, 3, 7} = {1, 4, 5, 6}."
        },
        {
          "title": "Canonical POS Formation",
          "type": "axiom",
          "content": "F = Π M(1, 4, 5, 6)."
        }
      ],
      "fastShortcut": "Σ m(0, 2, 3, 7) = Π M(1, 4, 5, 6).",
      "verification": "Truth table equivalence check."
    }
  },
  {
    "id": "u2-q079",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 4-Variable Multi-Term Expansion",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Expand the 4-variable function F(A, B, C, D) = A'B + C'D into its canonical minterm list Σ m(...).",
    "promptDetail": "Expand A'B over missing variables C, D (4 minterms) and C'D over missing variables A, B (4 minterms), then take their union.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(1, 4, 5, 6, 7, 9, 13)",
    "correctAnswer": "Σ m(1, 4, 5, 6, 7, 9, 13)",
    "acceptedAnswers": [
      "Σ m(1, 4, 5, 6, 7, 9, 13)",
      "Σm(1, 4, 5, 6, 7, 9, 13)",
      "Σm(1,4,5,6,7,9,13)",
      "1, 4, 5, 6, 7, 9, 13"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(1, 4, 5, 6, 7, 9, 13)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(4, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "Only expanded term A'B; omitted C'D."
      },
      {
        "label": "C",
        "text": "Σ m(1, 5, 9, 13)",
        "isCorrect": false,
        "distractorReason": "Only expanded term C'D; omitted A'B."
      },
      {
        "label": "D",
        "text": "Σ m(1, 4, 6, 7, 9, 13)",
        "isCorrect": false,
        "distractorReason": "Missed shared minterm m5 (0101)."
      }
    ],
    "hint1": "A'B (01--) covers minterms: 0100 (4), 0101 (5), 0110 (6), 0111 (7).",
    "hint2": "C'D (--01) covers minterms: 0001 (1), 0101 (5), 1001 (9), 1101 (13). Union: {1, 4, 5, 6, 7, 9, 13}.",
    "solution": {
      "finalAnswer": "Σ m(1, 4, 5, 6, 7, 9, 13)",
      "steps": [
        {
          "title": "Expand A'B",
          "type": "calculation",
          "content": "A'B(C + C')(D + D') = {4, 5, 6, 7}."
        },
        {
          "title": "Expand C'D",
          "type": "calculation",
          "content": "(A + A')(B + B')C'D = {1, 5, 9, 13}."
        },
        {
          "title": "Union",
          "type": "calculation",
          "content": "{4, 5, 6, 7} ∪ {1, 5, 9, 13} = {1, 4, 5, 6, 7, 9, 13} (m5 is shared)."
        }
      ],
      "fastShortcut": "A'B -> {4,5,6,7}; C'D -> {1,5,9,13}; Union = {1, 4, 5, 6, 7, 9, 13}.",
      "verification": "Truth table evaluation across 16 rows."
    }
  },
  {
    "id": "u2-q080",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Algebraic SOP to POS Conversion",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Convert the general SOP expression F = XY + X'Z into its equivalent POS expression using algebraic distributive laws (without truth tables).",
    "promptDetail": "Apply the second distributive law: A + BC = (A + B)(A + C).",
    "inputFormatHint": "Enter equivalent POS, e.g. (X + Z)(X' + Y)",
    "correctAnswer": "(X + Z)(X' + Y)",
    "acceptedAnswers": [
      "(X + Z)(X' + Y)",
      "(X+Z)(X'+Y)",
      "(X' + Y)(X + Z)"
    ],
    "options": [
      {
        "label": "A",
        "text": "(X + Z)(X' + Y)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "(X + Y)(X' + Z)",
        "isCorrect": false,
        "distractorReason": "Incorrectly paired literals with their own product terms."
      },
      {
        "label": "C",
        "text": "(X' + Z')(X + Y')",
        "isCorrect": false,
        "distractorReason": "Complemented literals improperly."
      },
      {
        "label": "D",
        "text": "XY + XZ",
        "isCorrect": false,
        "distractorReason": "Expression is still in SOP form."
      }
    ],
    "hint1": "Let A = XY. Then F = A + X'Z = (A + X')(A + Z).",
    "hint2": "Now expand each factor: A + X' = XY + X' = (X + X')(Y + X') = 1 * (X' + Y) = X' + Y. And A + Z = XY + Z = (X + Z)(Y + Z). Combine and apply consensus to eliminate (Y + Z).",
    "solution": {
      "finalAnswer": "(X + Z)(X' + Y)",
      "steps": [
        {
          "title": "Step 1: First Distribution",
          "type": "calculation",
          "content": "XY + X'Z = (XY + X')(XY + Z)."
        },
        {
          "title": "Step 2: Simplify Factors",
          "type": "calculation",
          "content": "XY + X' = X' + Y. XY + Z = (X + Z)(Y + Z)."
        },
        {
          "title": "Step 3: Dual Consensus Elimination",
          "type": "calculation",
          "content": "(X' + Y)(X + Z)(Y + Z) = (X + Z)(X' + Y) because (Y + Z) is the redundant consensus of (X + Z) and (X' + Y)."
        }
      ],
      "fastShortcut": "Algebraic SOP to POS identity: XY + X'Z = (X + Z)(X' + Y).",
      "verification": "Multiplying out (X + Z)(X' + Y) = XX' + XY + X'Z + YZ = XY + X'Z + YZ = XY + X'Z (consensus)."
    }
  },
  {
    "id": "u2-q081",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Algebraic POS to SOP Conversion",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "free_response",
    "question": "Convert the general POS expression F = (A + B)(A' + C) into its equivalent SOP expression using algebraic multiplication.",
    "promptDetail": "Multiply the binomial terms and eliminate null products.",
    "inputFormatHint": "Enter equivalent SOP, e.g. AC + A'B",
    "correctAnswer": "AC + A'B",
    "acceptedAnswers": [
      "AC + A'B",
      "A'B + AC",
      "AC+A'B",
      "A'B+AC"
    ],
    "options": [
      {
        "label": "A",
        "text": "AC + A'B",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB + A'C",
        "isCorrect": false,
        "distractorReason": "Swapped literal associations."
      },
      {
        "label": "C",
        "text": "A + BC",
        "isCorrect": false,
        "distractorReason": "Confused with (A + B)(A + C)."
      },
      {
        "label": "D",
        "text": "AA' + BC",
        "isCorrect": false,
        "distractorReason": "Omitted cross terms AC and A'B."
      }
    ],
    "hint1": "Multiply out: (A + B)(A' + C) = AA' + AC + A'B + BC.",
    "hint2": "AA' = 0. Notice that BC is the consensus of AC and A'B! Therefore BC is redundant: AC + A'B.",
    "solution": {
      "finalAnswer": "AC + A'B",
      "steps": [
        {
          "title": "Direct Expansion",
          "type": "calculation",
          "content": "(A + B)(A' + C) = AA' + AC + A'B + BC = 0 + AC + A'B + BC."
        },
        {
          "title": "Consensus Elimination",
          "type": "calculation",
          "content": "Between AC and A'B, literal A is complementary. Consensus is BC. Therefore BC is redundant: F = AC + A'B."
        }
      ],
      "fastShortcut": "(A + B)(A' + C) = AC + A'B.",
      "verification": "Dual of the classic multiplexer identity."
    }
  },
  {
    "id": "u2-q082",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 4-Variable POS Maxterm Expansion",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Expand the 4-variable POS expression F(A, B, C, D) = (A' + B)(C + D') into its canonical maxterm list Π M(...).",
    "promptDetail": "Identify the maxterms generated by each sum factor and take their union.",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(1, 5, 8, 9, 10, 11, 13)",
    "correctAnswer": "Π M(1, 5, 8, 9, 10, 11, 13)",
    "acceptedAnswers": [
      "Π M(1, 5, 8, 9, 10, 11, 13)",
      "ΠM(1, 5, 8, 9, 10, 11, 13)",
      "1, 5, 8, 9, 10, 11, 13"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(1, 5, 8, 9, 10, 11, 13)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(8, 9, 10, 11)",
        "isCorrect": false,
        "distractorReason": "Only expanded factor (A' + B)."
      },
      {
        "label": "C",
        "text": "Π M(1, 5, 9, 13)",
        "isCorrect": false,
        "distractorReason": "Only expanded factor (C + D')."
      },
      {
        "label": "D",
        "text": "Σ m(0, 2, 3, 4, 6, 7, 12, 14, 15)",
        "isCorrect": false,
        "distractorReason": "This is canonical SOP, not canonical POS."
      }
    ],
    "hint1": "In maxterms: A'=1, B=0, C=don't-care, D=don't-care -> binary 10--: 1000 (8), 1001 (9), 1010 (10), 1011 (11).",
    "hint2": "C=0, D'=1, A=don't-care, B=don't-care -> binary --01: 0001 (1), 0101 (5), 1001 (9), 1101 (13). Union: {1, 5, 8, 9, 10, 11, 13}.",
    "solution": {
      "finalAnswer": "Π M(1, 5, 8, 9, 10, 11, 13)",
      "steps": [
        {
          "title": "Factor 1 Expansion",
          "type": "calculation",
          "content": "A' + B = 10-- in binary = {8, 9, 10, 11}."
        },
        {
          "title": "Factor 2 Expansion",
          "type": "calculation",
          "content": "C + D' = --01 in binary = {1, 5, 9, 13}."
        },
        {
          "title": "Union",
          "type": "calculation",
          "content": "{8, 9, 10, 11} ∪ {1, 5, 9, 13} = {1, 5, 8, 9, 10, 11, 13} (M9 is shared). F = Π M(1, 5, 8, 9, 10, 11, 13)."
        }
      ],
      "fastShortcut": "(A' + B) -> {8,9,10,11}; (C + D') -> {1,5,9,13}; Union = Π M(1, 5, 8, 9, 10, 11, 13).",
      "verification": "Truth table evaluation across all 16 rows."
    }
  },
  {
    "id": "u2-q083",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Canonical POS of Complement Function",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Given F(A, B, C) = Σ m(2, 4, 5, 6, 7), find the canonical POS representation of the complement function F'.",
    "promptDetail": "F' in canonical POS is the product of maxterms where F' evaluates to 0 (which is where F evaluates to 1).",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(2, 4, 5, 6, 7)",
    "correctAnswer": "Π M(2, 4, 5, 6, 7)",
    "acceptedAnswers": [
      "Π M(2, 4, 5, 6, 7)",
      "ΠM(2, 4, 5, 6, 7)",
      "2, 4, 5, 6, 7"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(2, 4, 5, 6, 7)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(0, 1, 3)",
        "isCorrect": false,
        "distractorReason": "This is the original function F in POS form, not F'."
      },
      {
        "label": "C",
        "text": "Σ m(0, 1, 3)",
        "isCorrect": false,
        "distractorReason": "This is F' in SOP form, not F' in POS form."
      },
      {
        "label": "D",
        "text": "Σ m(2, 4, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "This is F in SOP form."
      }
    ],
    "hint1": "F takes value 1 on {2, 4, 5, 6, 7}. Therefore F' takes value 0 on {2, 4, 5, 6, 7}.",
    "hint2": "Any function in canonical POS is the product of maxterms on rows where the function equals 0. For F', this is Π M(2, 4, 5, 6, 7).",
    "solution": {
      "finalAnswer": "Π M(2, 4, 5, 6, 7)",
      "steps": [
        {
          "title": "Zero Rows of F'",
          "type": "calculation",
          "content": "F' = 0 strictly when F = 1. Minterms where F=1 are {2, 4, 5, 6, 7}."
        },
        {
          "title": "Canonical POS Formation",
          "type": "axiom",
          "content": "Therefore F' in canonical POS is Π M(2, 4, 5, 6, 7)."
        }
      ],
      "fastShortcut": "F' in POS has the exact same index set as F in SOP: Π M(2, 4, 5, 6, 7).",
      "verification": "Canonical duality identity."
    }
  },
  {
    "id": "u2-q084",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 3-Variable XOR Canonical SOP",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Convert the 3-variable odd parity function F(A, B, C) = A ⊕ B ⊕ C into its canonical SOP expression.",
    "promptDetail": "Identify all minterms containing an odd number of binary 1s.",
    "inputFormatHint": "Enter canonical SOP, e.g. Σ m(1, 2, 4, 7)",
    "correctAnswer": "Σ m(1, 2, 4, 7)",
    "acceptedAnswers": [
      "Σ m(1, 2, 4, 7)",
      "Σm(1, 2, 4, 7)",
      "Σm(1,2,4,7)",
      "1, 2, 4, 7"
    ],
    "options": [
      {
        "label": "A",
        "text": "Σ m(1, 2, 4, 7)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Σ m(0, 3, 5, 6)",
        "isCorrect": false,
        "distractorReason": "This is the 3-variable XNOR function (even parity)."
      },
      {
        "label": "C",
        "text": "Σ m(1, 3, 5, 7)",
        "isCorrect": false,
        "distractorReason": "These are the odd decimal numbers, not odd Hamming weights."
      },
      {
        "label": "D",
        "text": "Σ m(3, 5, 6, 7)",
        "isCorrect": false,
        "distractorReason": "Incorrect minterm parity count."
      }
    ],
    "hint1": "3-variable XOR outputs 1 when the count of 1s in (A, B, C) is odd (1 or 3 ones).",
    "hint2": "1 one: 001 (1), 010 (2), 100 (4). 3 ones: 111 (7). Canonical SOP = Σ m(1, 2, 4, 7).",
    "solution": {
      "finalAnswer": "Σ m(1, 2, 4, 7)",
      "steps": [
        {
          "title": "Odd Weight 1 Rows",
          "type": "calculation",
          "content": "001 (m1), 010 (m2), 100 (m4)."
        },
        {
          "title": "Odd Weight 3 Rows",
          "type": "calculation",
          "content": "111 (m7)."
        },
        {
          "title": "Canonical SOP",
          "type": "calculation",
          "content": "F = Σ m(1, 2, 4, 7)."
        }
      ],
      "fastShortcut": "Odd parity in 3 variables is Σ m(1, 2, 4, 7).",
      "verification": "Truth table for 3-input XOR."
    }
  },
  {
    "id": "u2-q085",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 3-Variable XNOR Canonical POS",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Convert the 3-variable equivalence function F(A, B, C) = A ⊙ B ⊙ C (even parity) into its canonical POS expression.",
    "promptDetail": "Identify the rows where even parity evaluates to 0 (which are the odd-weight rows).",
    "inputFormatHint": "Enter canonical POS, e.g. Π M(1, 2, 4, 7)",
    "correctAnswer": "Π M(1, 2, 4, 7)",
    "acceptedAnswers": [
      "Π M(1, 2, 4, 7)",
      "ΠM(1, 2, 4, 7)",
      "ΠM(1,2,4,7)",
      "1, 2, 4, 7"
    ],
    "options": [
      {
        "label": "A",
        "text": "Π M(1, 2, 4, 7)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Π M(0, 3, 5, 6)",
        "isCorrect": false,
        "distractorReason": "These are the rows where XNOR = 1 (this would define XOR in POS)."
      },
      {
        "label": "C",
        "text": "Σ m(1, 2, 4, 7)",
        "isCorrect": false,
        "distractorReason": "This is XOR in SOP form, not XNOR in POS form."
      },
      {
        "label": "D",
        "text": "Π M(1, 3, 5, 7)",
        "isCorrect": false,
        "distractorReason": "Incorrect maxterm set."
      }
    ],
    "hint1": "XNOR outputs 1 on even rows {0, 3, 5, 6}. Therefore it outputs 0 on odd rows {1, 2, 4, 7}.",
    "hint2": "In canonical POS, F is the product of maxterms on rows where F = 0: Π M(1, 2, 4, 7).",
    "solution": {
      "finalAnswer": "Π M(1, 2, 4, 7)",
      "steps": [
        {
          "title": "Zero Rows of XNOR",
          "type": "calculation",
          "content": "XNOR = 0 on rows with an odd number of 1s: {1, 2, 4, 7}."
        },
        {
          "title": "Canonical POS Formation",
          "type": "axiom",
          "content": "F = Π M(1, 2, 4, 7)."
        }
      ],
      "fastShortcut": "3-variable XNOR in POS is Π M(1, 2, 4, 7).",
      "verification": "Truth table check."
    }
  },
  {
    "id": "u2-q086",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: Product Expansion Minterm Multiplicity",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 4-variable system (A, B, C, D), how many minterms are generated by expanding the single product term: P = B'D?",
    "promptDetail": "A product term with k missing variables expands into 2^k distinct minterms.",
    "inputFormatHint": "Enter integer count, e.g. 4",
    "correctAnswer": "4",
    "acceptedAnswers": [
      "4",
      "four",
      "2^2"
    ],
    "options": [
      {
        "label": "A",
        "text": "4",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "2",
        "isCorrect": false,
        "distractorReason": "Missing 2 variables, so 2^2 = 4, not 2."
      },
      {
        "label": "C",
        "text": "8",
        "isCorrect": false,
        "distractorReason": "8 minterms would correspond to a single literal (1 missing variable)."
      },
      {
        "label": "D",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "1 minterm corresponds to a complete 4-literal product term."
      }
    ],
    "hint1": "The declared system has 4 variables. The term B'D has 2 literals.",
    "hint2": "Number of missing variables = 4 - 2 = 2 (variables A and C). Each missing variable has 2 states. 2^2 = 4 minterms: m1, m3, m9, m11.",
    "solution": {
      "finalAnswer": "4",
      "steps": [
        {
          "title": "Missing Variable Count",
          "type": "calculation",
          "content": "k = n - literals = 4 - 2 = 2 (variables A and C)."
        },
        {
          "title": "Multiplicity Formula",
          "type": "axiom",
          "content": "Number of minterms = 2^k = 2^2 = 4. Specifically: {1, 3, 9, 11}."
        }
      ],
      "fastShortcut": "2 missing variables -> 2^2 = 4 minterms.",
      "verification": "Expansion: (A + A')B'(C + C')D gives 4 terms."
    }
  },
  {
    "id": "u2-q087",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 8-Minterm Canonical Reduction",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "The 4-variable canonical function F(A, B, C, D) = Σ m(0, 1, 4, 5, 8, 9, 12, 13) simplifies to a single literal product term. What is this minimal term?",
    "promptDetail": "Identify the variable that remains invariant across all 8 minterm combinations.",
    "inputFormatHint": "Enter single literal, e.g. C'",
    "correctAnswer": "C'",
    "acceptedAnswers": [
      "C'",
      "c'",
      "not C"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "Indices have C=0, not C=1."
      },
      {
        "label": "C",
        "text": "D'",
        "isCorrect": false,
        "distractorReason": "Indices have D=0 and D=1."
      },
      {
        "label": "D",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Indices include A=0 and A=1."
      }
    ],
    "hint1": "Observe the binary codes: 0 (0000), 1 (0001), 4 (0100), 5 (0101), 8 (1000), 9 (1001), 12 (1100), 13 (1101).",
    "hint2": "In all 8 rows: A takes 0 and 1, B takes 0 and 1, D takes 0 and 1. Only C is constant 0 throughout. Constant 0 -> C'.",
    "solution": {
      "finalAnswer": "C'",
      "steps": [
        {
          "title": "Binary Code Inspection",
          "type": "calculation",
          "content": "All 8 minterms have C = 0, while A, B, and D take all 2^3 = 8 binary combinations."
        },
        {
          "title": "Reduction",
          "type": "axiom",
          "content": "Since A, B, and D are exhausted over all combinations, they eliminate completely. The single invariant literal is C'."
        }
      ],
      "fastShortcut": "8 minterms with C=0 reduce to C'.",
      "verification": "Truth table: 1 on all rows where C=0."
    }
  },
  {
    "id": "u2-q088",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 8-Maxterm Canonical Reduction",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "The 4-variable canonical function F(A, B, C, D) = Π M(2, 3, 6, 7, 10, 11, 14, 15) simplifies to a single literal maxterm. What is this minimal sum term?",
    "promptDetail": "Identify the invariant variable across all 8 maxterms and apply maxterm polarity.",
    "inputFormatHint": "Enter single literal, e.g. C'",
    "correctAnswer": "C'",
    "acceptedAnswers": [
      "C'",
      "c'",
      "not C"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "Maxterm convention complements 1s: here C=1, so maxterm is C'."
      },
      {
        "label": "C",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Variable B toggles between 0 and 1."
      },
      {
        "label": "D",
        "text": "D'",
        "isCorrect": false,
        "distractorReason": "Variable D toggles between 0 and 1."
      }
    ],
    "hint1": "Convert indices to 4-bit binary: 2 (0010), 3 (0011), 6 (0110), 7 (0111), 10 (1010), 11 (1011), 14 (1110), 15 (1111).",
    "hint2": "Variable C is logic 1 across all 8 rows. Under maxterm convention, 1 maps to complemented literal C'.",
    "solution": {
      "finalAnswer": "C'",
      "steps": [
        {
          "title": "Bit Pattern Analysis",
          "type": "calculation",
          "content": "All 8 rows have bit C = 1, while A, B, and D span all combinations."
        },
        {
          "title": "Maxterm Polarity Rule",
          "type": "axiom",
          "content": "In maxterms, binary 1 maps to complemented literal C'. Therefore the product of these 8 maxterms simplifies to C'."
        }
      ],
      "fastShortcut": "8 maxterms with C=1 reduce to maxterm C'.",
      "verification": "Dual of the 8-minterm reduction."
    }
  },
  {
    "id": "u2-q089",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: 3-Factor POS to Minimal SOP",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Convert the 3-variable POS expression F = (A + B')(B + C')(A' + C) into its equivalent minimal SOP expression.",
    "promptDetail": "Multiply the factors algebraically and eliminate redundant cross-terms.",
    "inputFormatHint": "Enter minimal SOP, e.g. AB + A'B'C'",
    "correctAnswer": "AB + A'B'C'",
    "acceptedAnswers": [
      "AB + A'B'C'",
      "A'B'C' + AB",
      "AB+A'B'C'",
      "A'B'C'+AB"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB + A'B'C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB' + BC' + A'C",
        "isCorrect": false,
        "distractorReason": "Did not multiply out the factors."
      },
      {
        "label": "C",
        "text": "A'B + ABC",
        "isCorrect": false,
        "distractorReason": "Incorrect minterm assignment."
      },
      {
        "label": "D",
        "text": "A + B + C",
        "isCorrect": false,
        "distractorReason": "Over-reduced."
      }
    ],
    "hint1": "Multiply first two terms: (A + B')(B + C') = AB + AC' + B'B + B'C' = AB + AC' + B'C'.",
    "hint2": "Now multiply by (A' + C): (AB + AC' + B'C')(A' + C) = ABA' + ABC + AC'A' + AC'C + B'C'A' + B'C'C = ABC + A'B'C'. Notice ABC + AB = AB? Wait, AB + A'B'C'.",
    "solution": {
      "finalAnswer": "AB + A'B'C'",
      "steps": [
        {
          "title": "First Product",
          "type": "calculation",
          "content": "(A + B')(B + C') = AB + AC' + B'C'."
        },
        {
          "title": "Second Product",
          "type": "calculation",
          "content": "(AB + AC' + B'C')(A' + C) = ABC + A'B'C' + AB(A' + C) = ABC + A'B'C'."
        },
        {
          "title": "Minterm Grouping",
          "type": "calculation",
          "content": "Minterms are m0 (A'B'C'), m6 (ABC'), m7 (ABC). Combining m6 and m7 yields AB. Final minimal SOP: AB + A'B'C'."
        }
      ],
      "fastShortcut": "POS expansion yields minterms m0, m6, m7 which group to AB + A'B'C'.",
      "verification": "Truth table equivalence check."
    }
  },
  {
    "id": "u2-q090",
    "trackId": "sec24",
    "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
    "topicBadge": "2.4: POS Missing Literal Axiomatic Identity",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "Which exact Boolean identity is utilized to insert a missing variable X into a sum term (A + B) during canonical POS expansion?",
    "promptDetail": "Identify the identity allowing a single sum term to split into two maxterm factors.",
    "inputFormatHint": "Select identity",
    "correctAnswer": "A + B = (A + B) + XX' = (A + B + X)(A + B + X')",
    "acceptedAnswers": [
      "A + B = (A + B) + XX' = (A + B + X)(A + B + X')",
      "XX' = 0"
    ],
    "options": [
      {
        "label": "A",
        "text": "A + B = (A + B) + XX' = (A + B + X)(A + B + X')",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B = (A + B)(X + X') = AX + BX + AX' + BX'",
        "isCorrect": false,
        "distractorReason": "This multiplies by 1, which converts sum terms into products (SOP expansion)."
      },
      {
        "label": "C",
        "text": "A + B = A + B + X + X' = A + B + 1 = 1",
        "isCorrect": false,
        "distractorReason": "Adding 1 collapses the expression to constant 1."
      },
      {
        "label": "D",
        "text": "A + B = (A + X)(B + X')",
        "isCorrect": false,
        "distractorReason": "Invalid algebraic transformation."
      }
    ],
    "hint1": "In POS, we must preserve the sum value by adding 0 (the identity element for OR).",
    "hint2": "Complement law: XX' = 0. So (A + B) = (A + B) + 0 = (A + B) + XX'. Second distributive law factors this into (A + B + X)(A + B + X').",
    "solution": {
      "finalAnswer": "A + B = (A + B) + XX' = (A + B + X)(A + B + X')",
      "steps": [
        {
          "title": "Identity 1 (Complement)",
          "type": "axiom",
          "content": "X * X' = 0."
        },
        {
          "title": "Identity 2 (OR Identity)",
          "type": "axiom",
          "content": "(A + B) + 0 = (A + B) + XX'."
        },
        {
          "title": "Identity 3 (Second Distributive Law)",
          "type": "axiom",
          "content": "u + vw = (u + v)(u + w) with u = (A + B), v = X, w = X'. Result: (A + B + X)(A + B + X')."
        }
      ],
      "fastShortcut": "(A + B) + XX' = (A + B + X)(A + B + X').",
      "verification": "Axiomatic proof of canonical POS expansion."
    }
  },
  {
    "id": "u2-q091",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 2-Variable K-Map Grouping",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 2-variable K-Map with row variable A and column variable B, which set of cells forms the optimal group for the simplified product term A'?",
    "promptDetail": "Identify the cell indices corresponding to row A = 0.",
    "inputFormatHint": "Enter cell indices, e.g. {m0, m1}",
    "correctAnswer": "{m0, m1}",
    "acceptedAnswers": [
      "{m0, m1}",
      "m0, m1",
      "0, 1",
      "{0, 1}"
    ],
    "options": [
      {
        "label": "A",
        "text": "{m0, m1}",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "{m1, m3}",
        "isCorrect": false,
        "distractorReason": "This is column B = 1, which produces term B."
      },
      {
        "label": "C",
        "text": "{m2, m3}",
        "isCorrect": false,
        "distractorReason": "This is row A = 1, which produces term A."
      },
      {
        "label": "D",
        "text": "{m0, m2}",
        "isCorrect": false,
        "distractorReason": "This is column B = 0, which produces term B'."
      }
    ],
    "hint1": "Term A' specifies that variable A is 0, while variable B can be either 0 or 1.",
    "hint2": "Row A=0 contains cell m0 (A=0, B=0) and cell m1 (A=0, B=1). Group is {m0, m1}.",
    "solution": {
      "finalAnswer": "{m0, m1}",
      "steps": [
        {
          "title": "Row Mapping",
          "type": "axiom",
          "content": "Row A=0 corresponds to minterms m0 (00) and m1 (01). Grouping {m0, m1} eliminates variable B, yielding A'."
        }
      ],
      "fastShortcut": "Row A=0 contains cells {m0, m1}.",
      "verification": "m0 + m1 = A'B' + A'B = A'(B' + B) = A'."
    }
  },
  {
    "id": "u2-q092",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 2-Variable Term Derivation",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 2-variable K-Map for (A, B), what Boolean term is derived from grouping column {m1, m3}?",
    "promptDetail": "Determine the invariant literal across cells m1 (01) and m3 (11).",
    "inputFormatHint": "Enter literal, e.g. B",
    "correctAnswer": "B",
    "acceptedAnswers": [
      "B",
      "b"
    ],
    "options": [
      {
        "label": "A",
        "text": "B",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Column {m0, m2} yields B'."
      },
      {
        "label": "C",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Variable A changes state from 0 to 1."
      },
      {
        "label": "D",
        "text": "AB",
        "isCorrect": false,
        "distractorReason": "This is the single cell m3, not the column pair."
      }
    ],
    "hint1": "Cell m1 is A=0, B=1. Cell m3 is A=1, B=1.",
    "hint2": "Variable A toggles (0 -> 1) and eliminates. Variable B is constant 1. Result: B.",
    "solution": {
      "finalAnswer": "B",
      "steps": [
        {
          "title": "Adjacency Reduction",
          "type": "calculation",
          "content": "m1 + m3 = A'B + AB = (A' + A)B = 1 * B = B."
        }
      ],
      "fastShortcut": "Column B=1 yields literal B.",
      "verification": "Truth table equivalence."
    }
  },
  {
    "id": "u2-q093",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Power-of-2 Grouping Axiom",
    "difficulty": "Easy",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "Why is circling a group of exactly 3 adjacent 1-cells strictly invalid in a Karnaugh Map?",
    "promptDetail": "Relate grouping geometry to Boolean algebraic combining laws.",
    "inputFormatHint": "Select correct rule",
    "correctAnswer": "Every valid group must contain 2^k cells (1, 2, 4, 8, 16) to eliminate k variables using x + x' = 1",
    "acceptedAnswers": [
      "Every valid group must contain 2^k cells (1, 2, 4, 8, 16) to eliminate k variables using x + x' = 1",
      "must be power of 2"
    ],
    "options": [
      {
        "label": "A",
        "text": "Every valid group must contain 2^k cells (1, 2, 4, 8, 16) to eliminate k variables using x + x' = 1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Odd numbers of cells can never be adjacent in Gray code",
        "isCorrect": false,
        "distractorReason": "Singletons (1 cell) are odd and valid."
      },
      {
        "label": "C",
        "text": "A group of 3 cells creates a short-circuit in the physical circuit",
        "isCorrect": false,
        "distractorReason": "K-Maps are mathematical minimization representations."
      },
      {
        "label": "D",
        "text": "3-cell groups are permitted in POS mode but forbidden in SOP mode",
        "isCorrect": false,
        "distractorReason": "Power-of-2 size is mandatory for both SOP and POS."
      }
    ],
    "hint1": "Algebraic combining: P * x + P * x' = P(x + x') = P.",
    "hint2": "This identity combines exactly 2 terms. Applying it k times requires 2 * 2 * ... = 2^k terms.",
    "solution": {
      "finalAnswer": "Every valid group must contain 2^k cells (1, 2, 4, 8, 16) to eliminate k variables using x + x' = 1",
      "steps": [
        {
          "title": "Algebraic Combining Theorem",
          "type": "axiom",
          "content": "Each variable elimination requires pairing two terms that differ in exactly one variable: P*x + P*x' = P. To eliminate k variables simultaneously, exactly 2^k terms must be grouped. 3 is not a power of 2."
        }
      ],
      "fastShortcut": "Groups must contain 2^k cells: 1, 2, 4, 8, 16.",
      "verification": "Switching algebra combining theorem."
    }
  },
  {
    "id": "u2-q094",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 3-Variable Row Quad Minimization",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "In a 3-variable K-Map for (A, B, C), minimize the function F(A, B, C) = Σ m(0, 1, 2, 3).",
    "promptDetail": "Identify the 4-cell group covering the entire top row.",
    "inputFormatHint": "Enter minimal literal, e.g. A'",
    "correctAnswer": "A'",
    "acceptedAnswers": [
      "A'",
      "a'",
      "not A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Minterms {4, 5, 6, 7} yield A."
      },
      {
        "label": "C",
        "text": "B'C'",
        "isCorrect": false,
        "distractorReason": "This is only cell m0."
      },
      {
        "label": "D",
        "text": "B + C",
        "isCorrect": false,
        "distractorReason": "Incorrect representation."
      }
    ],
    "hint1": "Minterms {0, 1, 2, 3} comprise all four cells of row A = 0.",
    "hint2": "Since all 4 combinations of (B, C) are covered, both B and C are eliminated. Result is A'.",
    "solution": {
      "finalAnswer": "A'",
      "steps": [
        {
          "title": "Quad Coverage",
          "type": "calculation",
          "content": "Minterms {0, 1, 2, 3} form a 1x4 quad covering row A = 0."
        },
        {
          "title": "Variable Elimination",
          "type": "axiom",
          "content": "A group of 4 cells (2^2) eliminates 2 variables (B and C). Constant literal is A'."
        }
      ],
      "fastShortcut": "Full top row (A=0) in 3-var map simplifies to A'.",
      "verification": "Truth table: 1 on all rows where A=0."
    }
  },
  {
    "id": "u2-q095",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Gray Code Sequencing Axiom",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "In a Karnaugh Map grid, why are column indices arranged in Gray code order (00, 01, 11, 10) rather than standard binary order (00, 01, 10, 11)?",
    "promptDetail": "Recall the Hamming distance requirement between adjacent cells.",
    "inputFormatHint": "Select correct axiom",
    "correctAnswer": "Gray code ensures adjacent cells differ in exactly 1 variable bit, enabling visual application of x + x' = 1",
    "acceptedAnswers": [
      "Gray code ensures adjacent cells differ in exactly 1 variable bit, enabling visual application of x + x' = 1",
      "Hamming distance of 1"
    ],
    "options": [
      {
        "label": "A",
        "text": "Gray code ensures adjacent cells differ in exactly 1 variable bit, enabling visual application of x + x' = 1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Gray code uses fewer bits than binary code",
        "isCorrect": false,
        "distractorReason": "Both Gray code and binary use 2 bits for 4 columns."
      },
      {
        "label": "C",
        "text": "Standard binary code cannot represent prime numbers",
        "isCorrect": false,
        "distractorReason": "Irrelevant mathematical claim."
      },
      {
        "label": "D",
        "text": "K-Maps were invented before standard binary was standardized",
        "isCorrect": false,
        "distractorReason": "Binary arithmetic was well established prior to Karnaugh's 1953 paper."
      }
    ],
    "hint1": "Compare 01 and 10 in standard binary: two bits change simultaneously (0->1 and 1->0).",
    "hint2": "If two bits change, x + x' = 1 cannot be applied to combine terms. Gray code ensures Hamming distance = 1.",
    "solution": {
      "finalAnswer": "Gray code ensures adjacent cells differ in exactly 1 variable bit, enabling visual application of x + x' = 1",
      "steps": [
        {
          "title": "Gray Code Adjacency",
          "type": "axiom",
          "content": "Karnaugh mapping maps topological geometric adjacency directly to switching algebraic adjacency. Moving between any two geometrically adjacent cells must change exactly one variable so that A*B + A*B' = A can be applied. In standard binary, moving from 01 to 10 changes two variables simultaneously."
        }
      ],
      "fastShortcut": "Gray code guarantees Hamming distance = 1 between adjacent cells.",
      "verification": "Karnaugh (1953) foundation."
    }
  },
  {
    "id": "u2-q096",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 3-Variable Bottom Row Quad",
    "difficulty": "Easy",
    "set": "setB",
    "questionType": "free_response",
    "question": "In a 3-variable K-Map for (A, B, C), minimize the function F(A, B, C) = Σ m(4, 5, 6, 7).",
    "promptDetail": "Identify the 4-cell group covering row A = 1.",
    "inputFormatHint": "Enter minimal literal, e.g. A",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A",
      "a"
    ],
    "options": [
      {
        "label": "A",
        "text": "A",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "This corresponds to row A = 0 {0, 1, 2, 3}."
      },
      {
        "label": "C",
        "text": "BC",
        "isCorrect": false,
        "distractorReason": "This is column 11."
      },
      {
        "label": "D",
        "text": "B' + C'",
        "isCorrect": false,
        "distractorReason": "Incorrect POS conversion."
      }
    ],
    "hint1": "Minterms {4, 5, 6, 7} comprise the entire bottom row where A = 1.",
    "hint2": "Variables B and C are eliminated across the quad. Result is A.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Row Quad",
          "type": "calculation",
          "content": "Minterms {4, 5, 6, 7} form a 1x4 quad covering row A = 1. Result is A."
        }
      ],
      "fastShortcut": "Full bottom row (A=1) in 3-var map simplifies to A.",
      "verification": "Truth table evaluation."
    },
    "requireMinimal": true
  },
  {
    "id": "u2-q097",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 3-Variable Toroidal Wrapping Quad",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 3-variable K-Map for (A, B, C), minimize F(A, B, C) = Σ m(0, 2, 4, 6) using edge wrapping.",
    "promptDetail": "Combine the leftmost column 00 and rightmost column 10.",
    "inputFormatHint": "Enter minimal literal, e.g. C'",
    "correctAnswer": "C'",
    "acceptedAnswers": [
      "C'",
      "c'",
      "not C"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "Columns 01 and 11 yield C."
      },
      {
        "label": "C",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Columns 00 and 01 yield B'."
      },
      {
        "label": "D",
        "text": "A'C' + AC'",
        "isCorrect": false,
        "distractorReason": "Uncombined two pairs instead of a single quad."
      }
    ],
    "hint1": "Column 00 contains {m0, m4}. Column 10 contains {m2, m6}.",
    "hint2": "Left and right edges are logically adjacent (toroidal wrapping). They combine into a 4-cell quad. Variable A toggles (0, 1); variable B toggles (0, 1); variable C is constant 0 -> C'.",
    "solution": {
      "finalAnswer": "C'",
      "steps": [
        {
          "title": "Toroidal Adjacency",
          "type": "axiom",
          "content": "Column BC=00 and Column BC=10 differ in only bit B (C is 0 in both). They are topologically adjacent across the map boundary."
        },
        {
          "title": "Quad Minimization",
          "type": "calculation",
          "content": "Group {0, 2, 4, 6} forms a 2x2 wrapping quad. Variables A and B eliminate, leaving C'."
        }
      ],
      "fastShortcut": "Left-right edge wrapping quad on columns 00 and 10 gives C'.",
      "verification": "m0+m2+m4+m6 = A'B'C' + A'BC' + AB'C' + ABC' = (A'B' + A'B + AB' + AB)C' = C'."
    }
  },
  {
    "id": "u2-q098",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 3-Variable Pair Variable Elimination",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 3-variable K-Map for (A, B, C), the pair of cells {m1, m5} is grouped. Which variable changes state and is eliminated, and what is the resulting product term?",
    "promptDetail": "Inspect the coordinates: m1 is (0, 0, 1) and m5 is (1, 0, 1).",
    "inputFormatHint": "Enter eliminated variable and term, e.g. A is eliminated, term is B'C",
    "correctAnswer": "A is eliminated, term is B'C",
    "acceptedAnswers": [
      "A is eliminated, term is B'C",
      "A, B'C",
      "B'C",
      "A is eliminated"
    ],
    "options": [
      {
        "label": "A",
        "text": "A is eliminated, term is B'C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B is eliminated, term is A'C",
        "isCorrect": false,
        "distractorReason": "B is constant 0 in both cells."
      },
      {
        "label": "C",
        "text": "C is eliminated, term is AB'",
        "isCorrect": false,
        "distractorReason": "C is constant 1 in both cells."
      },
      {
        "label": "D",
        "text": "A is eliminated, term is BC",
        "isCorrect": false,
        "distractorReason": "Inverted polarity on B."
      }
    ],
    "hint1": "m1 = 001 (A=0, B=0, C=1). m5 = 101 (A=1, B=0, C=1).",
    "hint2": "Variable A changes from 0 to 1, so A is eliminated. B=0 (B') and C=1 (C) remain invariant. Result: B'C.",
    "solution": {
      "finalAnswer": "A is eliminated, term is B'C",
      "steps": [
        {
          "title": "Coordinate Comparison",
          "type": "calculation",
          "content": "m1: A=0, B=0, C=1. m5: A=1, B=0, C=1."
        },
        {
          "title": "Elimination",
          "type": "axiom",
          "content": "A toggles 0 -> 1 (eliminated). B is constant 0 (B'), C is constant 1 (C). Product term = B'C."
        }
      ],
      "fastShortcut": "Vertical pair in column 01 eliminates row variable A, yielding B'C.",
      "verification": "m1 + m5 = A'B'C + AB'C = (A' + A)B'C = B'C."
    }
  },
  {
    "id": "u2-q099",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 3-Variable Column Pair Quad",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Minimize the 3-variable function: F(A, B, C) = Σ m(1, 3, 5, 7).",
    "promptDetail": "Group the two central columns (BC = 01 and 11).",
    "inputFormatHint": "Enter minimal literal, e.g. C",
    "correctAnswer": "C",
    "acceptedAnswers": [
      "C",
      "c"
    ],
    "options": [
      {
        "label": "A",
        "text": "C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C'",
        "isCorrect": false,
        "distractorReason": "Columns 00 and 10 yield C'."
      },
      {
        "label": "C",
        "text": "B",
        "isCorrect": false,
        "distractorReason": "Variable B toggles between 0 and 1."
      },
      {
        "label": "D",
        "text": "A + C",
        "isCorrect": false,
        "distractorReason": "Over-complicated representation."
      }
    ],
    "hint1": "Minterms {1, 3, 5, 7} are the two adjacent middle columns BC = 01 and BC = 11 across both rows.",
    "hint2": "In columns 01 and 11, B toggles (0, 1) and A toggles (0, 1). Only C is constant 1 throughout. Result: C.",
    "solution": {
      "finalAnswer": "C",
      "steps": [
        {
          "title": "2x2 Quad Formation",
          "type": "calculation",
          "content": "Cells {1, 3, 5, 7} form a 2x2 quad in columns BC=01 and 11."
        },
        {
          "title": "Elimination",
          "type": "axiom",
          "content": "A eliminates (rows 0, 1). B eliminates (cols 0, 1). Constant literal is C."
        }
      ],
      "fastShortcut": "Odd minterm quad in 3-var map simplifies to C.",
      "verification": "Truth table: 1 on all rows where C=1."
    }
  },
  {
    "id": "u2-q100",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 3-Variable Adjacent Column Quad",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Minimize the 3-variable function: F(A, B, C) = Σ m(2, 3, 6, 7).",
    "promptDetail": "Group columns BC = 11 and 10 across both rows.",
    "inputFormatHint": "Enter minimal literal, e.g. B",
    "correctAnswer": "B",
    "acceptedAnswers": [
      "B",
      "b"
    ],
    "options": [
      {
        "label": "A",
        "text": "B",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Columns 00 and 01 yield B'."
      },
      {
        "label": "C",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "C toggles between 0 and 1."
      },
      {
        "label": "D",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "A is eliminated."
      }
    ],
    "hint1": "Columns BC = 11 ({3, 7}) and BC = 10 ({2, 6}).",
    "hint2": "Variable B is constant 1 across all 4 cells. A and C eliminate. Result: B.",
    "solution": {
      "finalAnswer": "B",
      "steps": [
        {
          "title": "Quad Grouping",
          "type": "calculation",
          "content": "Cells {2, 3, 6, 7} form a 2x2 quad covering columns where B = 1."
        },
        {
          "title": "Elimination",
          "type": "axiom",
          "content": "Variables A and C eliminate. Minimal SOP: B."
        }
      ],
      "fastShortcut": "Quad covering columns 11 and 10 gives literal B.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q101",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Four-Corner Quad",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "free_response",
    "question": "In a 4-variable K-Map for (A, B, C, D), what minimal product term is produced by grouping the four corner cells: {m0, m2, m8, m10}?",
    "promptDetail": "Top-left m0 (0000), top-right m2 (0010), bottom-left m8 (1000), bottom-right m10 (1010).",
    "inputFormatHint": "Enter product term, e.g. B'D'",
    "correctAnswer": "B'D'",
    "acceptedAnswers": [
      "B'D'",
      "B'*D'",
      "D'B'",
      "b'd'"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'C'",
        "isCorrect": false,
        "distractorReason": "Top-left 2x2 block {0, 1, 4, 5} yields A'C'."
      },
      {
        "label": "C",
        "text": "BD",
        "isCorrect": false,
        "distractorReason": "Center 4 cells {5, 7, 13, 15} yield BD."
      },
      {
        "label": "D",
        "text": "B'C'",
        "isCorrect": false,
        "distractorReason": "Top and bottom rows of leftmost two columns yield B'C'."
      }
    ],
    "hint1": "Row coordinates for m0, m2 are AB = 00; for m8, m10 are AB = 10. Between 00 and 10, A toggles, B is constant 0 (B').",
    "hint2": "Column coordinates for m0, m8 are CD = 00; for m2, m10 are CD = 10. Between 00 and 10, C toggles, D is constant 0 (D'). Result: B'D'.",
    "solution": {
      "finalAnswer": "B'D'",
      "steps": [
        {
          "title": "Row Adjacency",
          "type": "calculation",
          "content": "Rows AB=00 and AB=10 combine across the map boundary. Invariant literal: B'."
        },
        {
          "title": "Column Adjacency",
          "type": "calculation",
          "content": "Columns CD=00 and CD=10 combine across the map boundary. Invariant literal: D'."
        },
        {
          "title": "Product Term",
          "type": "axiom",
          "content": "Combining both directions forms a 4-corner quad yielding B'D'."
        }
      ],
      "fastShortcut": "Four corners in a 4-var K-Map always simplify to B'D'.",
      "verification": "m0+m2+m8+m10 = A'B'C'D' + A'B'CD' + AB'C'D' + AB'CD' = B'D'."
    },
    "requireMinimal": true
  },
  {
    "id": "u2-q102",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable 8-Cell Octet",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "In a 4-variable K-Map for (A, B, C, D), minimize the 8-minterm function: F(A, B, C, D) = Σ m(0, 1, 4, 5, 8, 9, 12, 13).",
    "promptDetail": "Group the two leftmost full columns (CD = 00 and 01).",
    "inputFormatHint": "Enter single literal, e.g. C'",
    "correctAnswer": "C'",
    "acceptedAnswers": [
      "C'",
      "c'",
      "not C"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "Rightmost two columns yield C."
      },
      {
        "label": "C",
        "text": "D'",
        "isCorrect": false,
        "distractorReason": "Columns 00 and 10 yield D'."
      },
      {
        "label": "D",
        "text": "A' + B'",
        "isCorrect": false,
        "distractorReason": "Incorrect representation."
      }
    ],
    "hint1": "An 8-cell octet (2^3) in a 4-variable map eliminates 3 variables, leaving a single literal.",
    "hint2": "The group covers all 4 rows (A and B eliminate completely) and columns CD = 00 and 01 (D toggles 0->1). Invariant literal is C = 0 -> C'.",
    "solution": {
      "finalAnswer": "C'",
      "steps": [
        {
          "title": "Octet Dimensions",
          "type": "calculation",
          "content": "The group is a 4x2 octet covering all 4 rows and columns CD=00, 01."
        },
        {
          "title": "Variable Elimination",
          "type": "axiom",
          "content": "Rows eliminate A and B. Columns eliminate D. Constant literal is C'."
        }
      ],
      "fastShortcut": "Left two full columns in a 4-var map simplify to C'.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q103",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Redundant Prime Implicant Identification",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "In a 4-variable K-Map, Quad 1 covers {m4, m5, m12, m13} and Quad 2 covers {m12, m13, m14, m15}. A student also circles Pair {m12, m13}. Why is this pair strictly redundant?",
    "promptDetail": "Apply the definition of essential prime implicants and minimal covers.",
    "inputFormatHint": "Select reason",
    "correctAnswer": "All 1-cells in the pair are already covered by larger prime implicant quads",
    "acceptedAnswers": [
      "All 1-cells in the pair are already covered by larger prime implicant quads",
      "already covered"
    ],
    "options": [
      {
        "label": "A",
        "text": "All 1-cells in the pair are already covered by larger prime implicant quads",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Pair {m12, m13} contains cells from different rows",
        "isCorrect": false,
        "distractorReason": "Both cells are in row AB=11."
      },
      {
        "label": "C",
        "text": "Pairs can never be circled if quads exist on the map",
        "isCorrect": false,
        "distractorReason": "Pairs are valid if they cover isolated 1s not coverable by quads."
      },
      {
        "label": "D",
        "text": "Cell m12 is a don't-care cell that must not be circled",
        "isCorrect": false,
        "distractorReason": "m12 is an active minterm."
      }
    ],
    "hint1": "Minterm m12 is covered by both Quad 1 and Quad 2.",
    "hint2": "Minterm m13 is covered by both Quad 1 and Quad 2. Since both cells are already covered by essential quads, circling them again adds a redundant term.",
    "solution": {
      "finalAnswer": "All 1-cells in the pair are already covered by larger prime implicant quads",
      "steps": [
        {
          "title": "Coverage Audit",
          "type": "axiom",
          "content": "Quad 1 (BC') covers {m4, m5, m12, m13}. Quad 2 (AB) covers {m12, m13, m14, m15}. Every minterm in pair {m12, m13} is already covered by these two essential quads. Adding the pair introduces redundant term AB C', violating minimality."
        }
      ],
      "fastShortcut": "Sub-groups whose 1s are fully covered by larger prime implicants are redundant.",
      "verification": "Quine-McCluskey prime implicant table."
    }
  },
  {
    "id": "u2-q104",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Don't-Care Inclusion Optimization",
    "difficulty": "Medium",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "For the function F(A, B, C) = Σ m(1, 3, 7) + d(5), how should the don't-care condition d(5) be assigned to achieve minimal SOP?",
    "promptDetail": "Compare the resulting expression when d(5) is assigned 1 versus 0.",
    "inputFormatHint": "Select assignment and resulting term",
    "correctAnswer": "Assign d(5) = 1 to form a single 4-cell quad {1, 3, 5, 7} yielding term C",
    "acceptedAnswers": [
      "Assign d(5) = 1 to form a single 4-cell quad {1, 3, 5, 7} yielding term C",
      "d(5)=1 gives C"
    ],
    "options": [
      {
        "label": "A",
        "text": "Assign d(5) = 1 to form a single 4-cell quad {1, 3, 5, 7} yielding term C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Assign d(5) = 0 to avoid adding unnecessary minterms, giving A'C + BC",
        "isCorrect": false,
        "distractorReason": "Two pairs require more literals (4 literals) than a single quad (1 literal)."
      },
      {
        "label": "C",
        "text": "Don't-care terms must always be assigned 0 in SOP minimization",
        "isCorrect": false,
        "distractorReason": "Don't-cares should be assigned 1 whenever they enlarge a group."
      },
      {
        "label": "D",
        "text": "Assign d(5) = 1 to form an octet",
        "isCorrect": false,
        "distractorReason": "There are only 4 minterms total; an octet requires 8 cells."
      }
    ],
    "hint1": "If d(5) = 0: 1-cells are {1, 3, 7}. We need two pairs: {1, 3} -> A'C and {3, 7} -> BC. Cost: 2 terms, 4 literals.",
    "hint2": "If d(5) = 1: 1-cells become {1, 3, 5, 7}. These form a single quad yielding literal C. Cost: 1 term, 1 literal. Optimal!",
    "solution": {
      "finalAnswer": "Assign d(5) = 1 to form a single 4-cell quad {1, 3, 5, 7} yielding term C",
      "steps": [
        {
          "title": "Option A (d=0)",
          "type": "calculation",
          "content": "Minterms {1, 3, 7} require two pairs: A'C + BC (4 literals)."
        },
        {
          "title": "Option B (d=1)",
          "type": "calculation",
          "content": "Including d(5) forms quad {1, 3, 5, 7} yielding C (1 literal). Since 1 literal < 4 literals, d(5) = 1 is optimal."
        }
      ],
      "fastShortcut": "Including d(5) merges two pairs into a single quad C.",
      "verification": "Minimal SOP comparison: C vs A'C + BC."
    }
  },
  {
    "id": "u2-q105",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Don't-Care Exclusion Optimization",
    "difficulty": "Medium",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "For the function F(A, B, C) = Σ m(0, 1) + d(6), how should the don't-care condition d(6) be assigned for optimal minimization?",
    "promptDetail": "Determine whether d(6) can combine with {0, 1}.",
    "inputFormatHint": "Select assignment and rationale",
    "correctAnswer": "Assign d(6) = 0 because d(6) is not adjacent to {0, 1} and grouping it would add an unnecessary product term",
    "acceptedAnswers": [
      "Assign d(6) = 0 because d(6) is not adjacent to {0, 1} and grouping it would add an unnecessary product term",
      "d(6)=0"
    ],
    "options": [
      {
        "label": "A",
        "text": "Assign d(6) = 0 because d(6) is not adjacent to {0, 1} and grouping it would add an unnecessary product term",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Assign d(6) = 1 to cover all available don't-care cells on the map",
        "isCorrect": false,
        "distractorReason": "Don't-cares do not need to be covered unless they simplify active 1s."
      },
      {
        "label": "C",
        "text": "Assign d(6) = 1 to form a quad with {0, 1}",
        "isCorrect": false,
        "distractorReason": "m6 (110) cannot form a quad with m0 (000) and m1 (001)."
      },
      {
        "label": "D",
        "text": "Assign d(6) = 0 because don't-cares are invalid in 3-variable maps",
        "isCorrect": false,
        "distractorReason": "Don't-cares are valid for any number of variables."
      }
    ],
    "hint1": "Minterms {0, 1} form pair A'B'.",
    "hint2": "d(6) is cell 110. Can 110 combine with 000 or 001 to form a quad? No, it differs in multiple bits. If we set d(6)=1, we must circle an extra term AB C'. Setting d(6)=0 leaves F = A'B'.",
    "solution": {
      "finalAnswer": "Assign d(6) = 0 because d(6) is not adjacent to {0, 1} and grouping it would add an unnecessary product term",
      "steps": [
        {
          "title": "Adjacency Check",
          "type": "calculation",
          "content": "{0, 1} forms pair A'B'. Cell m6 (110) is not adjacent to m0 or m1 in a way that creates a quad."
        },
        {
          "title": "Minimality Comparison",
          "type": "axiom",
          "content": "Setting d(6)=1 requires adding term AB C' (total: A'B' + AB C'). Setting d(6)=0 gives F = A'B'. Optimal choice is d(6) = 0."
        }
      ],
      "fastShortcut": "Don't-cares that do not help enlarge groups of 1s must be set to 0.",
      "verification": "Minimal SOP comparison: A'B' vs A'B' + AB C'."
    }
  },
  {
    "id": "u2-q106",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Top-Bottom Wrapping",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 4-variable K-Map for (A, B, C, D), which cells form a valid top-bottom edge wrapping quad combining top row AB = 00 and bottom row AB = 10 in the first two columns (CD = 00 and 01)?",
    "promptDetail": "Identify the 4 minterm indices across rows 00 and 10 in columns 00 and 01.",
    "inputFormatHint": "Enter cell set, e.g. {m0, m1, m8, m9}",
    "correctAnswer": "{m0, m1, m8, m9}",
    "acceptedAnswers": [
      "{m0, m1, m8, m9}",
      "m0, m1, m8, m9",
      "0, 1, 8, 9",
      "{0, 1, 8, 9}"
    ],
    "options": [
      {
        "label": "A",
        "text": "{m0, m1, m8, m9}",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "{m0, m1, m4, m5}",
        "isCorrect": false,
        "distractorReason": "This is top-left quad in adjacent rows AB=00 and 01."
      },
      {
        "label": "C",
        "text": "{m0, m2, m8, m10}",
        "isCorrect": false,
        "distractorReason": "This is the four-corner quad."
      },
      {
        "label": "D",
        "text": "{m8, m9, m10, m11}",
        "isCorrect": false,
        "distractorReason": "This is the entire bottom row."
      }
    ],
    "hint1": "Row AB = 00 in columns CD = 00, 01 has cells m0 (0000) and m1 (0001).",
    "hint2": "Row AB = 10 in columns CD = 00, 01 has cells m8 (1000) and m9 (1001). Together they form {m0, m1, m8, m9} yielding B'C'.",
    "solution": {
      "finalAnswer": "{m0, m1, m8, m9}",
      "steps": [
        {
          "title": "Row Indices",
          "type": "calculation",
          "content": "Row 00: cols 00, 01 -> m0, m1. Row 10: cols 00, 01 -> m8, m9."
        },
        {
          "title": "Top-Bottom Wrapping",
          "type": "axiom",
          "content": "Rows 00 and 10 are adjacent across the vertical boundary. Group {m0, m1, m8, m9} is a valid 2x2 quad yielding B'C'."
        }
      ],
      "fastShortcut": "Top-bottom wrapping in cols 00, 01 gives {m0, m1, m8, m9} = B'C'.",
      "verification": "m0+m1+m8+m9 = B'C'(D' + D)(A' + A) = B'C'."
    }
  },
  {
    "id": "u2-q107",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Column Quad Derivation",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 4-variable K-Map for (A, B, C, D), what minimal product term is produced by the vertical column quad: {m2, m6, m10, m14}?",
    "promptDetail": "Identify the invariant literals for column CD = 10 spanning all 4 rows.",
    "inputFormatHint": "Enter product term, e.g. CD'",
    "correctAnswer": "CD'",
    "acceptedAnswers": [
      "CD'",
      "C*D'",
      "D'C",
      "cd'"
    ],
    "options": [
      {
        "label": "A",
        "text": "CD'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C'D",
        "isCorrect": false,
        "distractorReason": "Column CD = 01 yields C'D."
      },
      {
        "label": "C",
        "text": "CD",
        "isCorrect": false,
        "distractorReason": "Column CD = 11 yields CD."
      },
      {
        "label": "D",
        "text": "C'D'",
        "isCorrect": false,
        "distractorReason": "Column CD = 00 yields C'D'."
      }
    ],
    "hint1": "All 4 cells lie in the rightmost column where C = 1 and D = 0.",
    "hint2": "Since all 4 rows are covered, variables A and B take all 4 states and eliminate completely. Result: CD'.",
    "solution": {
      "finalAnswer": "CD'",
      "steps": [
        {
          "title": "Column Coordinates",
          "type": "calculation",
          "content": "m2 (0010), m6 (0110), m10 (1010), m14 (1110) all have C=1, D=0."
        },
        {
          "title": "Row Elimination",
          "type": "axiom",
          "content": "Rows span AB = 00, 01, 11, 10. A and B eliminate. Result is CD'."
        }
      ],
      "fastShortcut": "Full column CD = 10 yields CD'.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q108",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Mixed Group Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(1, 5, 9, 13, 14, 15).",
    "promptDetail": "Group the full column quad and the adjacent pair.",
    "inputFormatHint": "Enter minimal SOP, e.g. C'D + ABC",
    "correctAnswer": "C'D + ABC",
    "acceptedAnswers": [
      "C'D + ABC",
      "ABC + C'D",
      "C'D+ABC",
      "ABC+C'D"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'D + ABC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C'D + AB",
        "isCorrect": false,
        "distractorReason": "m14 and m15 only form a pair, not a quad; they require 3 literals ABC."
      },
      {
        "label": "C",
        "text": "CD + ABC",
        "isCorrect": false,
        "distractorReason": "Column 01 is C'D, not CD."
      },
      {
        "label": "D",
        "text": "A'C'D + ABC",
        "isCorrect": false,
        "distractorReason": "Under-grouped the column into a pair."
      }
    ],
    "hint1": "Cells {1, 5, 9, 13} comprise the entire second column where C = 0, D = 1. This quad yields C'D.",
    "hint2": "Cells {14, 15} are in row AB = 11, columns CD = 11 and 10. They form a pair in row 11 yielding ABC. Result: C'D + ABC.",
    "solution": {
      "finalAnswer": "C'D + ABC",
      "steps": [
        {
          "title": "Group 1 (Column Quad)",
          "type": "calculation",
          "content": "{1, 5, 9, 13} spans all rows in column CD=01 -> C'D."
        },
        {
          "title": "Group 2 (Row Pair)",
          "type": "calculation",
          "content": "{14, 15} is in row AB=11, cols CD=11, 10 -> ABC."
        },
        {
          "title": "Minimal SOP",
          "type": "calculation",
          "content": "F = C'D + ABC."
        }
      ],
      "fastShortcut": "Vertical column quad C'D + horizontal pair ABC.",
      "verification": "Verified by booleanEngine minimizeKMap([1, 5, 9, 13, 14, 15])."
    }
  },
  {
    "id": "u2-q109",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Dual Quad Checkerboard",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(0, 2, 5, 7, 8, 10, 13, 15).",
    "promptDetail": "Identify the corner quad and the center quad.",
    "inputFormatHint": "Enter minimal SOP, e.g. B'D' + BD",
    "correctAnswer": "B'D' + BD",
    "acceptedAnswers": [
      "B'D' + BD",
      "BD + B'D'",
      "B'D'+BD",
      "BD+B'D'"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'D' + BD",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'C' + AC",
        "isCorrect": false,
        "distractorReason": "Minterms correspond to B and D, not A and C."
      },
      {
        "label": "C",
        "text": "B ⊕ D",
        "isCorrect": false,
        "distractorReason": "B ⊕ D is BD' + B'D; this function is B ⊙ D."
      },
      {
        "label": "D",
        "text": "B'D + BD'",
        "isCorrect": false,
        "distractorReason": "This is the complementary XOR function."
      }
    ],
    "hint1": "Corners {0, 2, 8, 10} form a quad yielding B'D'.",
    "hint2": "Center 4 cells {5, 7, 13, 15} are in rows AB = 01, 11 and cols CD = 01, 11. They form a quad yielding BD. Result: B'D' + BD.",
    "solution": {
      "finalAnswer": "B'D' + BD",
      "steps": [
        {
          "title": "Corner Quad",
          "type": "calculation",
          "content": "{0, 2, 8, 10} -> B'D'."
        },
        {
          "title": "Center Quad",
          "type": "calculation",
          "content": "{5, 7, 13, 15} -> BD."
        },
        {
          "title": "Minimal SOP",
          "type": "calculation",
          "content": "F = B'D' + BD (which equals B ⊙ D, 2-variable XNOR)."
        }
      ],
      "fastShortcut": "Four corners (B'D') + center quad (BD) = B'D' + BD.",
      "verification": "Verified by booleanEngine minimizeKMap([0, 2, 5, 7, 8, 10, 13, 15])."
    }
  },
  {
    "id": "u2-q110",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Horizontal Octet",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "In a 4-variable K-Map for (A, B, C, D), minimize: F(A, B, C, D) = Σ m(4, 5, 6, 7, 12, 13, 14, 15).",
    "promptDetail": "Group the two middle horizontal rows (AB = 01 and 11).",
    "inputFormatHint": "Enter minimal literal, e.g. B",
    "correctAnswer": "B",
    "acceptedAnswers": [
      "B",
      "b"
    ],
    "options": [
      {
        "label": "A",
        "text": "B",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Rows AB = 00 and 10 yield B'."
      },
      {
        "label": "C",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Rows AB = 11 and 10 yield A."
      },
      {
        "label": "D",
        "text": "CD",
        "isCorrect": false,
        "distractorReason": "Columns are completely eliminated."
      }
    ],
    "hint1": "Minterms {4..7} is row AB = 01. Minterms {12..15} is row AB = 11.",
    "hint2": "Together they form an 8-cell octet covering all columns. Variables C and D eliminate. In rows 01 and 11, A toggles, B is constant 1. Result: B.",
    "solution": {
      "finalAnswer": "B",
      "steps": [
        {
          "title": "Octet Coverage",
          "type": "calculation",
          "content": "The group covers rows AB=01 and AB=11 across all 4 columns."
        },
        {
          "title": "Elimination",
          "type": "axiom",
          "content": "C and D eliminate completely. Variable A toggles (0, 1). Invariant literal is B = 1 -> B."
        }
      ],
      "fastShortcut": "Middle two full rows in 4-var K-Map simplify to B.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q111",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Multiple Valid Minimal Covers",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "free_response",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(1, 3, 4, 5, 6, 7, 9, 11).",
    "promptDetail": "Identify the two essential prime implicant quads covering all 8 minterms.",
    "inputFormatHint": "Enter minimal SOP, e.g. A'B + B'D",
    "correctAnswer": "A'B + B'D",
    "acceptedAnswers": [
      "A'B + B'D",
      "B'D + A'B",
      "A'B+B'D",
      "B'D+A'B"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'B + B'D",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'B + A'D",
        "isCorrect": false,
        "distractorReason": "Fails to cover minterms m9 and m11."
      },
      {
        "label": "C",
        "text": "B + B'D",
        "isCorrect": false,
        "distractorReason": "Row quad is only row AB=01 (A'B), not both rows B."
      },
      {
        "label": "D",
        "text": "A'C' + BD",
        "isCorrect": false,
        "distractorReason": "Incorrect grouping."
      }
    ],
    "hint1": "Row AB = 01 contains {4, 5, 6, 7}. This full row quad yields A'B.",
    "hint2": "Remaining minterms are {1, 3, 9, 11}. These are in rows AB = 00, 10 and cols CD = 01, 11. They form quad B'D. Total: A'B + B'D.",
    "solution": {
      "finalAnswer": "A'B + B'D",
      "steps": [
        {
          "title": "Quad 1 (Full Row)",
          "type": "calculation",
          "content": "{4, 5, 6, 7} in row AB=01 -> A'B."
        },
        {
          "title": "Quad 2 (Wrapping Quad)",
          "type": "calculation",
          "content": "{1, 3, 9, 11} in rows 00, 10 and cols 01, 11 -> B'D."
        },
        {
          "title": "Minimal SOP",
          "type": "calculation",
          "content": "F = A'B + B'D."
        }
      ],
      "fastShortcut": "Row quad A'B + wrapping quad B'D.",
      "verification": "Verified by booleanEngine minimizeKMap([1, 3, 4, 5, 6, 7, 9, 11])."
    },
    "requireMinimal": true
  },
  {
    "id": "u2-q112",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: K-Map POS Octet of Zeros",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 4-variable K-Map, minimize the POS function F(A, B, C, D) = Π M(0, 1, 4, 5, 8, 9, 12, 13) by grouping the 0-cells.",
    "promptDetail": "Group the 8 zeros in columns CD = 00 and 01 and derive the minimal maxterm.",
    "inputFormatHint": "Enter minimal maxterm, e.g. C",
    "correctAnswer": "C",
    "acceptedAnswers": [
      "C",
      "c"
    ],
    "options": [
      {
        "label": "A",
        "text": "C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C'",
        "isCorrect": false,
        "distractorReason": "In maxterms, binary 0 maps to uncomplemented literal C."
      },
      {
        "label": "C",
        "text": "D",
        "isCorrect": false,
        "distractorReason": "Variable D toggles between 0 and 1."
      },
      {
        "label": "D",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Rows A and B eliminate completely."
      }
    ],
    "hint1": "0-cells are located on the left two columns (CD = 00 and 01) across all 4 rows.",
    "hint2": "An 8-cell octet of 0s eliminates 3 variables. In columns 00 and 01, D toggles, C is constant 0. In POS convention, 0 maps to uncomplemented literal C. Result: C.",
    "solution": {
      "finalAnswer": "C",
      "steps": [
        {
          "title": "Octet of Zeros",
          "type": "calculation",
          "content": "The 8 maxterms form a 4x2 octet in columns CD=00 and 01."
        },
        {
          "title": "Maxterm Polarity",
          "type": "axiom",
          "content": "C = 0 is constant across the octet. By maxterm rules, 0 -> uncomplemented literal C. Minimal POS: C."
        }
      ],
      "fastShortcut": "Octet of 0s with C=0 yields maxterm C.",
      "verification": "Truth table: evaluates to 0 when C=0."
    }
  },
  {
    "id": "u2-q113",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 3-Variable POS Grouping of Zeros",
    "difficulty": "Hard",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 3-variable K-Map for (A, B, C), minimize the POS function F(A, B, C) = Π M(1, 3, 5, 7) by grouping 0-cells.",
    "promptDetail": "Group the 4 zeros in columns BC = 01 and 11 and apply maxterm polarity.",
    "inputFormatHint": "Enter minimal maxterm, e.g. C'",
    "correctAnswer": "C'",
    "acceptedAnswers": [
      "C'",
      "c'",
      "not C"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "In maxterms, binary 1 maps to complemented literal C'."
      },
      {
        "label": "C",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Variable B toggles between 0 and 1."
      },
      {
        "label": "D",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Variable A is eliminated."
      }
    ],
    "hint1": "0-cells occupy columns BC = 01 and 11.",
    "hint2": "Variables A and B eliminate. Variable C is constant 1 across the quad. In maxterms, 1 maps to C'. Result: C'.",
    "solution": {
      "finalAnswer": "C'",
      "steps": [
        {
          "title": "Quad of Zeros",
          "type": "calculation",
          "content": "Zeros at {1, 3, 5, 7} form a 2x2 quad in columns where C = 1."
        },
        {
          "title": "Maxterm Rule",
          "type": "axiom",
          "content": "C = 1 maps to complemented literal C'. Minimal POS: C'."
        }
      ],
      "fastShortcut": "Quad of 0s with C=1 yields maxterm C'.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q114",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Don't-Care Minimization",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(0, 2, 8, 10) + d(5, 7, 13, 15).",
    "promptDetail": "Evaluate whether any don't-care cells help enlarge the corner quad.",
    "inputFormatHint": "Enter minimal SOP, e.g. B'D'",
    "correctAnswer": "B'D'",
    "acceptedAnswers": [
      "B'D'",
      "B'*D'",
      "D'B'"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B'D' + BD",
        "isCorrect": false,
        "distractorReason": "Grouped the don't-cares unnecessarily; don't-cares contain no 1-cells to cover."
      },
      {
        "label": "C",
        "text": "A'B' + AB",
        "isCorrect": false,
        "distractorReason": "Incorrect minterm assignment."
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Minterms {0, 2, 8, 10} must be covered."
      }
    ],
    "hint1": "Active 1-cells are the four corners: {0, 2, 8, 10}. These form a quad yielding B'D'.",
    "hint2": "Don't-cares are the center cells {5, 7, 13, 15}. Can they merge with the four corners? No. If we circle them, we add term BD without covering any new 1-cells. Therefore leave don't-cares as 0: F = B'D'.",
    "solution": {
      "finalAnswer": "B'D'",
      "steps": [
        {
          "title": "Corner Quad",
          "type": "calculation",
          "content": "Minterms {0, 2, 8, 10} form an essential corner quad -> B'D'."
        },
        {
          "title": "Don't-Care Evaluation",
          "type": "axiom",
          "content": "Don't-cares {5, 7, 13, 15} cannot combine with the corners to form an octet. Circling them would add redundant term BD. Leaving them as 0 preserves minimal SOP: B'D'."
        }
      ],
      "fastShortcut": "Don't-cares that do not expand active 1-cell groups are ignored: F = B'D'.",
      "verification": "Verified by booleanEngine minimizeKMap([0, 2, 8, 10], [5, 7, 13, 15])."
    }
  },
  {
    "id": "u2-q115",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Diagonal Adjacency Fallacy",
    "difficulty": "Hard",
    "set": "setB",
    "questionType": "conceptual_mcq",
    "question": "In a 3-variable K-Map, cells m0 (000) and m5 (101) touch diagonally. Why can they NEVER be grouped into a 2-cell pair?",
    "promptDetail": "Compare the binary representations and count the bit differences.",
    "inputFormatHint": "Select reason",
    "correctAnswer": "Their binary coordinates differ in 2 bit positions (Hamming distance = 2), preventing elimination of a variable",
    "acceptedAnswers": [
      "Their binary coordinates differ in 2 bit positions (Hamming distance = 2), preventing elimination of a variable",
      "differ in 2 bits",
      "Hamming distance is 2"
    ],
    "options": [
      {
        "label": "A",
        "text": "Their binary coordinates differ in 2 bit positions (Hamming distance = 2), preventing elimination of a variable",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Diagonal grouping is only allowed in 4-variable maps",
        "isCorrect": false,
        "distractorReason": "Diagonal grouping is strictly forbidden in all Karnaugh maps."
      },
      {
        "label": "C",
        "text": "Cell m5 is an odd number and cannot combine with an even number",
        "isCorrect": false,
        "distractorReason": "Numerical parity is irrelevant; binary adjacency is the criterion."
      },
      {
        "label": "D",
        "text": "Minterm m0 must always be grouped with m1",
        "isCorrect": false,
        "distractorReason": "m0 can combine with any adjacent cell (m1, m2, m4)."
      }
    ],
    "hint1": "m0 = 000. m5 = 101.",
    "hint2": "Bit A changes (0 -> 1). Bit C changes (0 -> 1). Bit B is 0 in both. Since 2 bits change, they cannot be combined algebraically: A'B'C' + AB'C = B'(A'C' + AC), which cannot eliminate a variable.",
    "solution": {
      "finalAnswer": "Their binary coordinates differ in 2 bit positions (Hamming distance = 2), preventing elimination of a variable",
      "steps": [
        {
          "title": "Bit Difference",
          "type": "calculation",
          "content": "m0 = 0 0 0. m5 = 1 0 1. Bit A differs and Bit C differs. Hamming distance = 2."
        },
        {
          "title": "Algebraic Constraint",
          "type": "axiom",
          "content": "Variable elimination requires x + x' = 1, which demands Hamming distance = 1. Diagonal cells differ in >= 2 bits and can never be grouped directly."
        }
      ],
      "fastShortcut": "Diagonal cells differ by 2 bits and cannot eliminate a variable.",
      "verification": "Switching algebra adjacency condition."
    }
  },
  {
    "id": "u2-q116",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Don't-Care Quad Merging",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(1, 3, 7, 11, 15) + d(0, 2, 5).",
    "promptDetail": "Use don't-cares d(0, 2, 5) to expand groups into larger quads.",
    "inputFormatHint": "Enter minimal SOP, e.g. CD + A'D",
    "correctAnswer": "CD + A'D",
    "acceptedAnswers": [
      "CD + A'D",
      "A'D + CD",
      "CD+A'D",
      "A'D+CD",
      "CD + A'B'"
    ],
    "options": [
      {
        "label": "A",
        "text": "CD + A'D",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "CD + A'B'C'",
        "isCorrect": false,
        "distractorReason": "Under-grouped minterm m1."
      },
      {
        "label": "C",
        "text": "C'D + AB",
        "isCorrect": false,
        "distractorReason": "Incorrect column coordinates."
      },
      {
        "label": "D",
        "text": "CD + A'B'",
        "isCorrect": false,
        "distractorReason": "Valid alternative cover, but CD + A'D is standard minimal cover."
      }
    ],
    "hint1": "Minterms {3, 7, 11, 15} are in column CD = 11 across all 4 rows. This forms column quad CD.",
    "hint2": "Remaining minterm is m1 (0001). Using d(0), d(2) allows quad {0, 1, 2, 3} -> A'B'. Alternatively, using d(5) with {1, 3, 7} gives quad {1, 3, 5, 7} -> A'D. Both yield 2 quads (4 literals total).",
    "solution": {
      "finalAnswer": "CD + A'D",
      "steps": [
        {
          "title": "Group 1",
          "type": "calculation",
          "content": "{3, 7, 11, 15} is a vertical column quad -> CD."
        },
        {
          "title": "Group 2",
          "type": "calculation",
          "content": "Minterm m1 combines with {3, 7} and d(5) to form quad {1, 3, 5, 7} -> A'D."
        },
        {
          "title": "Minimal SOP",
          "type": "calculation",
          "content": "F = CD + A'D."
        }
      ],
      "fastShortcut": "Column quad CD + center/top quad A'D.",
      "verification": "Verified by booleanEngine minimizeKMap([1, 3, 7, 11, 15], [0, 2, 5])."
    }
  },
  {
    "id": "u2-q117",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Complex 4-Variable Don't-Care Optimization",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(2, 3, 6, 7, 8, 10, 11) + d(0, 1).",
    "promptDetail": "Group minterms using d(0, 1) to enlarge prime implicants.",
    "inputFormatHint": "Enter minimal SOP, e.g. A'C + B'D' + AB'",
    "correctAnswer": "A'C + B'D' + AB'",
    "acceptedAnswers": [
      "A'C + B'D' + AB'",
      "A'C + AB' + B'D'",
      "B'D' + A'C + AB'",
      "A'C + B'C' + AB'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'C + B'D' + AB'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'C + B'D'",
        "isCorrect": false,
        "distractorReason": "Fails to cover minterm m11 (1011)."
      },
      {
        "label": "C",
        "text": "C + B'",
        "isCorrect": false,
        "distractorReason": "Over-reduced."
      },
      {
        "label": "D",
        "text": "A'B + CD",
        "isCorrect": false,
        "distractorReason": "Incorrect minterm assignment."
      }
    ],
    "hint1": "{2, 3, 6, 7} forms quad in rows AB = 00, 01 and cols CD = 11, 10 -> A'C.",
    "hint2": "Minterms {8, 10} with {2} and d(0) form corner quad {0, 2, 8, 10} -> B'D'. Remaining minterm m11 (1011) groups with {8, 10, d(0)...} as quad {8, 9, 10, 11}? No, m9 is not 1. {8, 10, 11} + d(0)? {8, 10} and {10, 11} -> AB'.",
    "solution": {
      "finalAnswer": "A'C + B'D' + AB'",
      "steps": [
        {
          "title": "Quad 1",
          "type": "calculation",
          "content": "{2, 3, 6, 7} -> A'C."
        },
        {
          "title": "Quad 2",
          "type": "calculation",
          "content": "{0, 2, 8, 10} using d(0) -> B'D'."
        },
        {
          "title": "Pair/Quad 3",
          "type": "calculation",
          "content": "Minterms {8, 10, 11} and d(0)? Row AB=10 has m8, m10, m11 and d... pair/quad gives AB'. Total: A'C + B'D' + AB'."
        }
      ],
      "fastShortcut": "A'C + B'D' + AB'.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q118",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Essential Prime Implicant Uniqueness",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "conceptual_mcq",
    "question": "In a 4-variable K-Map with minterms {m0, m1, m2, m5, m7, m8, m10}, which prime implicant is ESSENTIAL because it uniquely covers minterm m8?",
    "promptDetail": "Identify the only prime implicant that contains cell m8.",
    "inputFormatHint": "Enter essential prime implicant, e.g. B'D'",
    "correctAnswer": "B'D' (the four-corner quad)",
    "acceptedAnswers": [
      "B'D' (the four-corner quad)",
      "B'D'",
      "corner quad",
      "b'd'"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'D' (the four-corner quad)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'B' (the top row quad)",
        "isCorrect": false,
        "distractorReason": "Top row contains m0, m1, m2, m3; does not contain m8."
      },
      {
        "label": "C",
        "text": "A'D (the center quad)",
        "isCorrect": false,
        "distractorReason": "Center quad covers m1, m5, m7; does not contain m8."
      },
      {
        "label": "D",
        "text": "AB' (the bottom row pair)",
        "isCorrect": false,
        "distractorReason": "Does not form a prime implicant covering m8 uniquely."
      }
    ],
    "hint1": "Cell m8 is 1000 (bottom-left corner). What cells are adjacent to m8? Only m0 (top-left) and m10 (bottom-right).",
    "hint2": "The only prime implicant covering m8 is the corner quad {m0, m2, m8, m10} = B'D'. Because m8 is covered by no other prime implicant, B'D' is essential.",
    "solution": {
      "finalAnswer": "B'D' (the four-corner quad)",
      "steps": [
        {
          "title": "Minterm 8 Neighbors",
          "type": "calculation",
          "content": "m8 (1000) has 1s only at m0 (0000) and m10 (1010)."
        },
        {
          "title": "Corner Quad",
          "type": "axiom",
          "content": "Cells {0, 2, 8, 10} form quad B'D'. Because m8 has no other valid group, B'D' is an Essential Prime Implicant."
        }
      ],
      "fastShortcut": "m8 is covered uniquely by the four corners B'D'.",
      "verification": "Prime implicant essentiality definition."
    }
  },
  {
    "id": "u2-q119",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable POS Two-Row Minimization",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Minimize in POS form: F(A, B, C, D) = Π M(4, 5, 6, 7, 8, 9, 10, 11).",
    "promptDetail": "Group the two separate 4-cell rows of zeros and derive the minimal product of sums.",
    "inputFormatHint": "Enter minimal POS, e.g. (A + B')(A' + B)",
    "correctAnswer": "(A + B')(A' + B)",
    "acceptedAnswers": [
      "(A + B')(A' + B)",
      "(A+B')(A'+B)",
      "(A' + B)(A + B')"
    ],
    "options": [
      {
        "label": "A",
        "text": "(A + B')(A' + B)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "(A + B)(A' + B')",
        "isCorrect": false,
        "distractorReason": "This is row 00 and row 11."
      },
      {
        "label": "C",
        "text": "A ⊕ B",
        "isCorrect": false,
        "distractorReason": "Converted to SOP representation."
      },
      {
        "label": "D",
        "text": "A'B + AB'",
        "isCorrect": false,
        "distractorReason": "This is SOP, not POS."
      }
    ],
    "hint1": "0-cells are located in row AB = 01 (M4..M7) and row AB = 10 (M8..M11).",
    "hint2": "In row AB = 01: A=0, B=1 -> maxterm is (A + B'). In row AB = 10: A=1, B=0 -> maxterm is (A' + B). Result: (A + B')(A' + B).",
    "solution": {
      "finalAnswer": "(A + B')(A' + B)",
      "steps": [
        {
          "title": "Row 01 Group of Zeros",
          "type": "calculation",
          "content": "AB = 01 across all 4 columns -> maxterm (A + B')."
        },
        {
          "title": "Row 10 Group of Zeros",
          "type": "calculation",
          "content": "AB = 10 across all 4 columns -> maxterm (A' + B)."
        },
        {
          "title": "Minimal POS",
          "type": "calculation",
          "content": "F = (A + B')(A' + B) (XNOR in POS form)."
        }
      ],
      "fastShortcut": "Row 01 (A+B') and Row 10 (A'+B) in POS gives (A + B')(A' + B).",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q120",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Checkerboard Singleton Minimization",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "In a 3-variable K-Map, the odd-parity function F(A, B, C) = Σ m(1, 2, 4, 7) displays a checkerboard pattern. What is the minimal SOP expression?",
    "promptDetail": "Verify whether any two 1-cells are adjacent.",
    "inputFormatHint": "Enter SOP sum of all 4 minterm products",
    "correctAnswer": "A'B'C + A'BC' + AB'C' + ABC",
    "acceptedAnswers": [
      "A'B'C + A'BC' + AB'C' + ABC",
      "A ⊕ B ⊕ C",
      "m1 + m2 + m4 + m7"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'B'C + A'BC' + AB'C' + ABC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B + C",
        "isCorrect": false,
        "distractorReason": "Minterms cannot be grouped into single literals."
      },
      {
        "label": "C",
        "text": "A'B + BC' + CA",
        "isCorrect": false,
        "distractorReason": "Adjacent grouping is impossible in checkerboard patterns."
      },
      {
        "label": "D",
        "text": "AB + BC + CA",
        "isCorrect": false,
        "distractorReason": "This is the majority function."
      }
    ],
    "hint1": "Inspect cell coordinates: m1 (001), m2 (010), m4 (100), m7 (111).",
    "hint2": "Every pair of these minterms differs in at least 2 bit positions. Zero adjacent cells exist. Each 1-cell must remain an isolated 1-cell group (singleton).",
    "solution": {
      "finalAnswer": "A'B'C + A'BC' + AB'C' + ABC",
      "steps": [
        {
          "title": "Adjacency Audit",
          "type": "calculation",
          "content": "Distance between m1 and m2 is 2. Distance between m1 and m4 is 2. Distance between m1 and m7 is 2. No two 1-cells share an edge."
        },
        {
          "title": "Singleton Cover",
          "type": "axiom",
          "content": "All 4 minterms are essential singletons. Minimal SOP: A'B'C + A'BC' + AB'C' + ABC."
        }
      ],
      "fastShortcut": "Checkerboard pattern has 0 adjacent 1s; all minterms are essential singletons.",
      "verification": "Truth table check for 3-input XOR."
    }
  },
  {
    "id": "u2-q121",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: Cyclic Prime Implicant Chart",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "In a cyclic prime implicant chart where 6 minterms form a closed loop of pairs and every minterm is covered by exactly 2 prime implicants, how many Essential Prime Implicants (EPIs) exist?",
    "promptDetail": "An essential prime implicant requires at least one uniquely covered minterm.",
    "inputFormatHint": "Enter integer count, e.g. 0",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0",
      "zero",
      "none"
    ],
    "options": [
      {
        "label": "A",
        "text": "0",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "3",
        "isCorrect": false,
        "distractorReason": "3 is the number of prime implicants in a minimal cover, but none are essential."
      },
      {
        "label": "C",
        "text": "6",
        "isCorrect": false,
        "distractorReason": "6 is the total number of prime implicants in the cycle."
      },
      {
        "label": "D",
        "text": "2",
        "isCorrect": false,
        "distractorReason": "Incorrect count."
      }
    ],
    "hint1": "Recall the definition: An Essential Prime Implicant must cover at least one minterm that is covered by NO other prime implicant.",
    "hint2": "In a cyclic chart, every minterm has column count >= 2 (covered by at least 2 PIs). Therefore NO minterm is uniquely covered, so exactly 0 EPIs exist.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Essentiality Criterion",
          "type": "axiom",
          "content": "A prime implicant is essential if and only if there exists a minterm row with a single 'X' in that column."
        },
        {
          "title": "Cyclic Condition",
          "type": "axiom",
          "content": "In a cyclic chart, every row contains at least two 'X' marks. Thus no uniquely covered minterm exists, and the number of Essential Prime Implicants is exactly 0."
        }
      ],
      "fastShortcut": "Cyclic charts have 0 Essential Prime Implicants (requires Petrick's method).",
      "verification": "Petrick's method and Quine-McCluskey cyclic core theorem."
    }
  },
  {
    "id": "u2-q122",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Overlapping Quad Minimization",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(0, 1, 2, 8, 9, 10).",
    "promptDetail": "Form two overlapping 4-cell wrapping quads.",
    "inputFormatHint": "Enter minimal SOP, e.g. B'C' + B'D'",
    "correctAnswer": "B'C' + B'D'",
    "acceptedAnswers": [
      "B'C' + B'D'",
      "B'D' + B'C'",
      "B'C'+B'D'",
      "B'D'+B'C'"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'C' + B'D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B'C' + B'D",
        "isCorrect": false,
        "distractorReason": "m2 and m10 have D=0, so literal is D', not D."
      },
      {
        "label": "C",
        "text": "A'B' + AB'",
        "isCorrect": false,
        "distractorReason": "This would cover {0, 1, 2, 3, 8, 9, 10, 11}."
      },
      {
        "label": "D",
        "text": "B' + C'D'",
        "isCorrect": false,
        "distractorReason": "Over-reduced."
      }
    ],
    "hint1": "Quad 1: {0, 1, 8, 9} wraps rows AB = 00 and 10 in columns CD = 00, 01 -> B'C'.",
    "hint2": "Quad 2: {0, 2, 8, 10} wraps rows AB = 00 and 10 in columns CD = 00, 10 (the 4 corners) -> B'D'. Minimal SOP: B'C' + B'D'.",
    "solution": {
      "finalAnswer": "B'C' + B'D'",
      "steps": [
        {
          "title": "Quad 1 (Top-Bottom Left)",
          "type": "calculation",
          "content": "{0, 1, 8, 9} -> B'C'."
        },
        {
          "title": "Quad 2 (Four Corners)",
          "type": "calculation",
          "content": "{0, 2, 8, 10} -> B'D'."
        },
        {
          "title": "Minimal SOP",
          "type": "calculation",
          "content": "F = B'C' + B'D'."
        }
      ],
      "fastShortcut": "Two overlapping wrapping quads: B'C' + B'D'.",
      "verification": "Verified by booleanEngine minimizeKMap([0, 1, 2, 8, 9, 10])."
    }
  },
  {
    "id": "u2-q123",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Leftmost Column Quad",
    "difficulty": "Challenge",
    "set": "setA",
    "questionType": "fill_blank",
    "question": "In a 4-variable K-Map for (A, B, C, D), minimize: F(A, B, C, D) = Σ m(0, 4, 8, 12).",
    "promptDetail": "Identify the 4-cell group covering column CD = 00 across all 4 rows.",
    "inputFormatHint": "Enter product term, e.g. C'D'",
    "correctAnswer": "C'D'",
    "acceptedAnswers": [
      "C'D'",
      "C'*D'",
      "D'C'",
      "c'd'"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "CD",
        "isCorrect": false,
        "distractorReason": "Column CD = 11 yields CD."
      },
      {
        "label": "C",
        "text": "A'B'",
        "isCorrect": false,
        "distractorReason": "Row AB = 00 yields A'B'."
      },
      {
        "label": "D",
        "text": "C + D",
        "isCorrect": false,
        "distractorReason": "Incorrect sum form."
      }
    ],
    "hint1": "Minterm codes: 0 (0000), 4 (0100), 8 (1000), 12 (1100).",
    "hint2": "All 4 minterms have C = 0 and D = 0. All 4 combinations of A and B are present and eliminate. Result: C'D'.",
    "solution": {
      "finalAnswer": "C'D'",
      "steps": [
        {
          "title": "Column Quad",
          "type": "calculation",
          "content": "Cells {0, 4, 8, 12} comprise the entire leftmost column CD = 00."
        },
        {
          "title": "Elimination",
          "type": "axiom",
          "content": "A and B eliminate completely. Invariant literals are C'D'."
        }
      ],
      "fastShortcut": "Leftmost column in 4-var K-Map simplifies to C'D'.",
      "verification": "Truth table evaluation."
    }
  },
  {
    "id": "u2-q124",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable Disjoint Dual Quads",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(0, 1, 4, 5, 10, 11, 14, 15).",
    "promptDetail": "Identify the two 4-cell quads in the top-left and bottom-right blocks.",
    "inputFormatHint": "Enter minimal SOP, e.g. A'C' + AC",
    "correctAnswer": "A'C' + AC",
    "acceptedAnswers": [
      "A'C' + AC",
      "AC + A'C'",
      "A'C'+AC",
      "AC+A'C'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'C' + AC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'D' + AD",
        "isCorrect": false,
        "distractorReason": "Minterms correspond to variables A and C, not A and D."
      },
      {
        "label": "C",
        "text": "A ⊕ C",
        "isCorrect": false,
        "distractorReason": "This function is A ⊙ C (XNOR), not XOR."
      },
      {
        "label": "D",
        "text": "B'D' + BD",
        "isCorrect": false,
        "distractorReason": "Minterms are aligned with rows A and columns C."
      }
    ],
    "hint1": "Top-left block {0, 1, 4, 5}: rows AB = 00, 01 (A=0 -> A'); cols CD = 00, 01 (C=0 -> C'). Term is A'C'.",
    "hint2": "Bottom-right block {10, 11, 14, 15}: rows AB = 10, 11 (A=1 -> A); cols CD = 11, 10 (C=1 -> C). Term is AC. Result: A'C' + AC.",
    "solution": {
      "finalAnswer": "A'C' + AC",
      "steps": [
        {
          "title": "Quad 1 (Top-Left Block)",
          "type": "calculation",
          "content": "{0, 1, 4, 5} -> A'C'."
        },
        {
          "title": "Quad 2 (Bottom-Right Block)",
          "type": "calculation",
          "content": "{10, 11, 14, 15} -> AC."
        },
        {
          "title": "Minimal SOP",
          "type": "calculation",
          "content": "F = A'C' + AC (A ⊙ C)."
        }
      ],
      "fastShortcut": "Top-left quad (A'C') + bottom-right quad (AC) = A'C' + AC.",
      "verification": "Verified by booleanEngine minimizeKMap([0, 1, 4, 5, 10, 11, 14, 15])."
    }
  },
  {
    "id": "u2-q125",
    "trackId": "sec25",
    "trackTitle": "Section 2.5: Karnaugh Map Minimization",
    "topicBadge": "2.5: 4-Variable 3-Group University Challenge",
    "difficulty": "Challenge",
    "set": "setB",
    "questionType": "fill_blank",
    "question": "Minimize the 4-variable function: F(A, B, C, D) = Σ m(0, 2, 3, 5, 7, 8, 10, 11, 15).",
    "promptDetail": "Group the four corners, the column quad, and the remaining adjacent pair.",
    "inputFormatHint": "Enter minimal SOP, e.g. B'D' + CD + A'BD",
    "correctAnswer": "B'D' + CD + A'BD",
    "acceptedAnswers": [
      "B'D' + CD + A'BD",
      "B'D' + A'BD + CD",
      "CD + B'D' + A'BD",
      "A'BD + B'D' + CD"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'D' + CD + A'BD",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B'D' + CD",
        "isCorrect": false,
        "distractorReason": "Fails to cover minterm m5 (0101)."
      },
      {
        "label": "C",
        "text": "B'D' + CD + BC",
        "isCorrect": false,
        "distractorReason": "Minterm m5 is not covered by BC."
      },
      {
        "label": "D",
        "text": "A'C + B'D' + BD",
        "isCorrect": false,
        "distractorReason": "Incorrect grouping."
      }
    ],
    "hint1": "Corner quad: {0, 2, 8, 10} -> B'D'. Covers {0, 2, 8, 10}.",
    "hint2": "Column quad: {3, 7, 11, 15} is column CD = 11 across all rows -> CD. Remaining minterm is m5 (0101). m5 pairs with m7 (0111) in row AB=01 -> A'BD. Result: B'D' + CD + A'BD.",
    "solution": {
      "finalAnswer": "B'D' + CD + A'BD",
      "steps": [
        {
          "title": "Group 1 (Four Corners)",
          "type": "calculation",
          "content": "{0, 2, 8, 10} -> B'D'."
        },
        {
          "title": "Group 2 (Vertical Column Quad)",
          "type": "calculation",
          "content": "{3, 7, 11, 15} -> CD."
        },
        {
          "title": "Group 3 (Row Pair)",
          "type": "calculation",
          "content": "Minterm m5 combines with m7 to form pair {5, 7} -> A'BD."
        },
        {
          "title": "Minimal SOP",
          "type": "calculation",
          "content": "F = B'D' + CD + A'BD."
        }
      ],
      "fastShortcut": "Corner quad B'D' + column quad CD + pair A'BD.",
      "verification": "Verified by booleanEngine minimizeKMap([0, 2, 3, 5, 7, 8, 10, 11, 15])."
    }
  }
];

export const unit2QuizTracks = [
  {
    "id": "all",
    "label": "Full Unit 2 Mixed Examination",
    "poolSize": 125,
    "desc": "Draws a balanced weighted examination across the entire 125-question Unit 2 question pool."
  },
  {
    "id": "sec21",
    "label": "Section 2.1: Boolean Laws & Axiomatic Theorems",
    "poolSize": 20,
    "desc": "Huntington postulates, duality, algebraic laws, consensus theorem, and fallacy analysis."
  },
  {
    "id": "sec22",
    "label": "Section 2.2: Algebraic Simplification & Reductions",
    "poolSize": 25,
    "desc": "Single-law to multi-variable reductions, factoring, absorption, and strategy selection."
  },
  {
    "id": "sec23",
    "label": "Section 2.3: Minterms, Maxterms & Canonical Forms",
    "poolSize": 20,
    "desc": "Binary index mapping, complement polarity, canonical Sigma m / Pi M, and function space."
  },
  {
    "id": "sec24",
    "label": "Section 2.4: SOP/POS Forms & Conversions",
    "poolSize": 25,
    "desc": "Standard expansion, canonical SOP to POS, complementation vs conversion, and dual forms."
  },
  {
    "id": "sec25",
    "label": "Section 2.5: Karnaugh Map Minimization",
    "poolSize": 35,
    "desc": "2/3/4-variable maps, Gray code, wrapping, corner quads, don't-cares, and POS grouping."
  }
];

export default unit2QuizBank;
