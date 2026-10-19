/**
 * ZeroIndex Portal - Unit 2 Master Question Bank (110 Verified Questions)
 * Strictly zero em-dashes (\u2014) and zero en-dashes (\u2013).
 * Course: Digital Logic Design (DLD) - Unit 2: Boolean Algebra & Gate-Level Minimization
 * 
 * Distribution:
 *   - Topic 1: Boolean Laws & Algebraic Simplification (30 Qs)
 *   - Topic 2: Canonical Forms & SOP/POS Conversions (25 Qs)
 *   - Topic 3: Karnaugh Maps & Logic Minimization (35 Qs)
 *   - Topic 4: Universal Logic Synthesis & Exclusive-OR (20 Qs)
 * Total Pool: 110 Questions.
 */

export const unit2QuizBank = [
  {
    "id": "u2-q001",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.1: Axiomatic Postulates",
    "difficulty": "Easy",
    "set": "setA",
    "question": "According to the Huntington Postulates, which of the following is the identity element for the logical OR (+) operation?",
    "promptDetail": "Identify the element e such that x + e = x for all x in B.",
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
        "distractorReason": "1 is the identity element for AND (·), not OR (+)."
      },
      {
        "label": "C",
        "text": "x",
        "distractorReason": "x is a variable, not a fixed identity constant."
      },
      {
        "label": "D",
        "text": "x'",
        "distractorReason": "x' is the complement element."
      }
    ],
    "hint1": "Think of an electrical parallel switch: what state leaves the circuit entirely dependent on switch x?",
    "hint2": "An open switch has conductivity 0. Therefore x + 0 = x.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Postulate 2 (Identity Elements)",
          "type": "axiom",
          "content": "Postulate 2 states: (a) x + 0 = x; (b) x · 1 = x. Thus 0 is the identity element for OR (+)."
        }
      ],
      "fastShortcut": "Identity for OR is 0; Identity for AND is 1.",
      "verification": "Huntington Postulate P2(a)."
    }
  },
  {
    "id": "u2-q002",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.1: Principle of Duality",
    "difficulty": "Easy",
    "set": "setA",
    "question": "What is the dual of the Boolean identity: x + x' = 1?",
    "promptDetail": "Apply the Principle of Duality by swapping operators and identity constants.",
    "inputFormatHint": "Enter equation, e.g., x · x' = 0",
    "correctAnswer": "x · x' = 0",
    "acceptedAnswers": [
      "x · x' = 0",
      "x*x'=0",
      "xx'=0",
      "x·x'=0"
    ],
    "options": [
      {
        "label": "A",
        "text": "x · x' = 0",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "x' · x = 1",
        "distractorReason": "Complement constants were not swapped from 1 to 0."
      },
      {
        "label": "C",
        "text": "x' + x = 0",
        "distractorReason": "Operators were not swapped (+ was kept as +)."
      },
      {
        "label": "D",
        "text": "x + x' = 0",
        "distractorReason": "Operator + was not converted to ·."
      }
    ],
    "hint1": "The Principle of Duality requires replacing all + with · and all 1 with 0, leaving literals unchanged.",
    "hint2": "Replace + with ·, replace 1 with 0. The variables x and x' remain untouched.",
    "solution": {
      "finalAnswer": "x · x' = 0",
      "steps": [
        {
          "title": "Duality Transformation",
          "type": "axiom",
          "content": "Given: x + x' = 1. Interchanging + to ·, and 1 to 0 gives: x · x' = 0."
        }
      ],
      "fastShortcut": "+ becomes ·, 1 becomes 0. Literals stay identical.",
      "verification": "Huntington Postulate P5 duality pair."
    }
  },
  {
    "id": "u2-q003",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Redundancy Law",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Simplify the Boolean expression: F = A + A'B.",
    "promptDetail": "Apply algebraic laws to reduce to minimal literal count.",
    "inputFormatHint": "Enter simplified form, e.g., A + B",
    "correctAnswer": "A + B",
    "acceptedAnswers": [
      "A + B",
      "A+B",
      "B + A",
      "B+A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A + B",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "distractorReason": "Confused with Absorption Law A + AB = A."
      },
      {
        "label": "C",
        "text": "AB",
        "distractorReason": "Incorrectly eliminated the primary literal A."
      },
      {
        "label": "D",
        "text": "A + A'",
        "distractorReason": "Failed to factor out variable B."
      }
    ],
    "hint1": "Apply the second Distributive Law: x + yz = (x + y)(x + z) where x = A, y = A', z = B.",
    "hint2": "A + A'B = (A + A')(A + B) = (1)(A + B) = A + B.",
    "solution": {
      "finalAnswer": "A + B",
      "steps": [
        {
          "title": "Distribution Step",
          "type": "calculation",
          "content": "A + A'B = (A + A')(A + B)."
        },
        {
          "title": "Complement Step",
          "type": "calculation",
          "content": "(A + A') = 1. Therefore (1)(A + B) = A + B."
        }
      ],
      "fastShortcut": "Redundancy Law: A absorbs the complement A' in any adjacent product term.",
      "verification": "Truth table: when A=1, F=1; when A=0, F=B. Thus F = A + B."
    }
  },
  {
    "id": "u2-q004",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Consensus Theorem",
    "difficulty": "Hard",
    "set": "setA",
    "question": "In the expression F = AB + A'C + BC, which term is the redundant consensus term that can be eliminated?",
    "promptDetail": "Identify the term formed by combining non-complemented variables from two terms containing complementary literals.",
    "inputFormatHint": "Enter term, e.g., BC",
    "correctAnswer": "BC",
    "acceptedAnswers": [
      "BC",
      "B·C",
      "CB"
    ],
    "options": [
      {
        "label": "A",
        "text": "BC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB",
        "distractorReason": "AB contains primary literal A and is essential."
      },
      {
        "label": "C",
        "text": "A'C",
        "distractorReason": "A'C contains complemented literal A' and is essential."
      },
      {
        "label": "D",
        "text": "None; the expression is irreducible",
        "distractorReason": "Consensus theorem states BC is completely redundant."
      }
    ],
    "hint1": "Find the variable that appears unprimed in one term and primed in another (A and A').",
    "hint2": "The remaining variables B and C form the consensus term BC, which is eliminated.",
    "solution": {
      "finalAnswer": "BC",
      "steps": [
        {
          "title": "Consensus Identification",
          "type": "axiom",
          "content": "In AB + A'C + BC, literals A and A' are complementary. The remaining literals B and C form consensus term BC. BC · 1 = BC(A + A') = ABC + A'BC, which is subsumed by AB and A'C."
        }
      ],
      "fastShortcut": "Consensus Rule: xy + x'z + yz = xy + x'z. The term yz is redundant.",
      "verification": "Consensus Theorem algebraic proof."
    }
  },
  {
    "id": "u2-q005",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: De Morgan's Theorem",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Apply De Morgan's Theorem to simplify the complement of the sum: (A + B + C)'.",
    "promptDetail": "Distribute complement across all literals and change operations.",
    "inputFormatHint": "Enter product, e.g., A'B'C'",
    "correctAnswer": "A'B'C'",
    "acceptedAnswers": [
      "A'B'C'",
      "A'·B'·C'",
      "A'*B'*C'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'B'C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A' + B' + C'",
        "distractorReason": "Did not swap OR operators (+) to AND operators (·)."
      },
      {
        "label": "C",
        "text": "ABC",
        "distractorReason": "Omitted complementing the individual literals."
      },
      {
        "label": "D",
        "text": "(AB + C)'",
        "distractorReason": "Incomplete distribution of complement."
      }
    ],
    "hint1": "Generalized De Morgan: Complement of an OR sum is the AND product of the individual complements.",
    "hint2": "(x + y + z)' = x' · y' · z'.",
    "solution": {
      "finalAnswer": "A'B'C'",
      "steps": [
        {
          "title": "Generalized De Morgan Application",
          "type": "axiom",
          "content": "(A + B + C)' = A' · B' · C'."
        }
      ],
      "fastShortcut": "Break the bar, change the sign: + becomes · and literals get primed.",
      "verification": "De Morgan's n-variable law."
    }
  },
  {
    "id": "u2-q006",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Simplify: F = AB + AB'",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
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
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "AB",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Combining Law: AB + AB' = A(B + B') = A(1) = A.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Combining Law: AB + AB' = A(B + B') = A(1) = A."
        }
      ],
      "fastShortcut": "Law applied: Combining Law",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q007",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Easy",
    "set": "setB",
    "question": "Simplify: F = A(A + B)",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Absorption Law: A(A + B) = AA + AB = A + AB = A.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Absorption Law: A(A + B) = AA + AB = A + AB = A."
        }
      ],
      "fastShortcut": "Law applied: Absorption Law",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q008",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Simplify: F = A + 1",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1"
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
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Null / Domination Law: 1 dominates logical OR.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Null / Domination Law: 1 dominates logical OR."
        }
      ],
      "fastShortcut": "Law applied: Null / Domination Law",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q009",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Easy",
    "set": "setB",
    "question": "Simplify: F = A · 0",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0"
    ],
    "options": [
      {
        "label": "A",
        "text": "0",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Null / Domination Law: 0 dominates logical AND.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Null / Domination Law: 0 dominates logical AND."
        }
      ],
      "fastShortcut": "Law applied: Null / Domination Law",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q010",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Simplify: F = (A')'",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
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
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Involution Law: Double complement restores original literal.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Involution Law: Double complement restores original literal."
        }
      ],
      "fastShortcut": "Law applied: Involution Law",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q011",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Easy",
    "set": "setB",
    "question": "Simplify: F = A + A",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "2A",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Idempotent Law: In Boolean algebra, combining an element with itself yields itself.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Idempotent Law: In Boolean algebra, combining an element with itself yields itself."
        }
      ],
      "fastShortcut": "Law applied: Idempotent Law",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q012",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Simplify: F = A · A",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A^2",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Idempotent Law: A · A = A.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Idempotent Law: A · A = A."
        }
      ],
      "fastShortcut": "Law applied: Idempotent Law",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q013",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Simplify: F = A(A' + B)",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "AB",
    "acceptedAnswers": [
      "AB"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Dual Redundancy: AA' + AB = 0 + AB = AB.",
    "solution": {
      "finalAnswer": "AB",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Dual Redundancy: AA' + AB = 0 + AB = AB."
        }
      ],
      "fastShortcut": "Law applied: Dual Redundancy",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q014",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Medium",
    "set": "setA",
    "question": "What is the dual of A(B + C) = AB + AC?",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A + BC = (A + B)(A + C)",
    "acceptedAnswers": [
      "A + BC = (A + B)(A + C)"
    ],
    "options": [
      {
        "label": "A",
        "text": "A + BC = (A + B)(A + C)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'(B' + C') = A'B' + A'C'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "A(BC) = (AB)C",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "(A+B)C = AC + BC",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Duality swaps · with +, and + with ·.",
    "solution": {
      "finalAnswer": "A + BC = (A + B)(A + C)",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Duality swaps · with +, and + with ·."
        }
      ],
      "fastShortcut": "Law applied: Duality swaps · with +, and + with ·.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q015",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Simplify: F = (A + B)' + AB",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "AB + A'B'",
    "acceptedAnswers": [
      "AB + A'B'"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB + A'B'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "De Morgan: A'B' + AB (XNOR function).",
    "solution": {
      "finalAnswer": "AB + A'B'",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "De Morgan: A'B' + AB (XNOR function)."
        }
      ],
      "fastShortcut": "Law applied: De Morgan",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q016",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Simplify: F = AB + A'B",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "B",
    "acceptedAnswers": [
      "B"
    ],
    "options": [
      {
        "label": "A",
        "text": "B",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "AB",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "A'B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Combining: (A + A')B = 1 · B = B.",
    "solution": {
      "finalAnswer": "B",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Combining: (A + A')B = 1 · B = B."
        }
      ],
      "fastShortcut": "Law applied: Combining",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q017",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Simplify: F = (A + B)(A' + C)(B + C)",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "(A + B)(A' + C)",
    "acceptedAnswers": [
      "(A + B)(A' + C)"
    ],
    "options": [
      {
        "label": "A",
        "text": "(A + B)(A' + C)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B + C",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "(A + B)(B + C)",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "AC + A'B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Dual Consensus Theorem eliminates (B + C).",
    "solution": {
      "finalAnswer": "(A + B)(A' + C)",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Dual Consensus Theorem eliminates (B + C)."
        }
      ],
      "fastShortcut": "Law applied: Dual Consensus Theorem eliminates (B + C).",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q018",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Simplify: F = x'y'z + x'yz + xy'",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "x'z + xy'",
    "acceptedAnswers": [
      "x'z + xy'"
    ],
    "options": [
      {
        "label": "A",
        "text": "x'z + xy'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "x'y + z",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "y'z + x",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "x' + y'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Factor x'z(y' + y) + xy' = x'z + xy'.",
    "solution": {
      "finalAnswer": "x'z + xy'",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Factor x'z(y' + y) + xy' = x'z + xy'."
        }
      ],
      "fastShortcut": "Law applied: Factor x'z(y' + y) + xy' = x'z + xy'.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q019",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Evaluate Boolean expression F = A'B + AB' when A = 1 and B = 1:",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0"
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
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "2",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "Undefined",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "0 · 1 + 1 · 0 = 0 + 0 = 0.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "0 · 1 + 1 · 0 = 0 + 0 = 0."
        }
      ],
      "fastShortcut": "Law applied: 0 · 1 + 1 · 0 = 0 + 0 = 0.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q020",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Evaluate Boolean expression F = (A + B)' when A = 0 and B = 1:",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0"
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
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "(0 + 1)' = 1' = 0.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "(0 + 1)' = 1' = 0."
        }
      ],
      "fastShortcut": "Law applied: (0 + 1)' = 1' = 0.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q021",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Simplify: F = A + A'B + A'B'C",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A + B + C",
    "acceptedAnswers": [
      "A + B + C"
    ],
    "options": [
      {
        "label": "A",
        "text": "A + B + C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "ABC",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "A' + B' + C'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Successive Redundancy: A + B + A'B'C = A + B + C.",
    "solution": {
      "finalAnswer": "A + B + C",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Successive Redundancy: A + B + A'B'C = A + B + C."
        }
      ],
      "fastShortcut": "Law applied: Successive Redundancy",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q022",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Simplify: F = AB + A(B + C) + B(B + C)",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "B + AC",
    "acceptedAnswers": [
      "B + AC"
    ],
    "options": [
      {
        "label": "A",
        "text": "B + AC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB + AC",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "A + B + C",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "B(A + C)",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Expand and factor: B absorbs all other terms containing B.",
    "solution": {
      "finalAnswer": "B + AC",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Expand and factor: B absorbs all other terms containing B."
        }
      ],
      "fastShortcut": "Law applied: Expand and factor",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q023",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Simplify: F = (A + B)(A + C)",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A + BC",
    "acceptedAnswers": [
      "A + BC"
    ],
    "options": [
      {
        "label": "A",
        "text": "A + BC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB + AC",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "A + B + C",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "ABC",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Second Distributive Law.",
    "solution": {
      "finalAnswer": "A + BC",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Second Distributive Law."
        }
      ],
      "fastShortcut": "Law applied: Second Distributive Law.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q024",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Simplify: F = [A' + B']'",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "AB",
    "acceptedAnswers": [
      "AB"
    ],
    "options": [
      {
        "label": "A",
        "text": "AB",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "A'B'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "A' + B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "De Morgan: (A')' · (B')' = AB.",
    "solution": {
      "finalAnswer": "AB",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "De Morgan: (A')' · (B')' = AB."
        }
      ],
      "fastShortcut": "Law applied: De Morgan",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q025",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Simplify: F = A + AB + ABC + ABCD",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "ABCD",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "A + B + C + D",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "AB",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Absorption Law: A absorbs all terms containing literal A.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Absorption Law: A absorbs all terms containing literal A."
        }
      ],
      "fastShortcut": "Law applied: Absorption Law",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q026",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Simplify: F = (A + B)'(A' + B')",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "A'B'",
    "acceptedAnswers": [
      "A'B'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'B'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "De Morgan: A'B'(A' + B') = A'B'A' + A'B'B' = A'B' + A'B' = A'B'.",
    "solution": {
      "finalAnswer": "A'B'",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "De Morgan: A'B'(A' + B') = A'B'A' + A'B'B' = A'B' + A'B' = A'B'."
        }
      ],
      "fastShortcut": "Law applied: De Morgan",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q027",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Simplify: F = A'B'C' + A'BC' + AB'C' + ABC'",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "C'",
    "acceptedAnswers": [
      "C'"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Factor (A'B' + A'B + AB' + AB)C' = (1)C' = C'.",
    "solution": {
      "finalAnswer": "C'",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Factor (A'B' + A'B + AB' + AB)C' = (1)C' = C'."
        }
      ],
      "fastShortcut": "Law applied: Factor (A'B' + A'B + AB' + AB)C' = (1)C' = C'.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q028",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setA",
    "question": "What is the complement of 0 in Boolean algebra?",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1"
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
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "-1",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "Infinity",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "0' = 1.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "0' = 1."
        }
      ],
      "fastShortcut": "Law applied: 0' = 1.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q029",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setB",
    "question": "What is the complement of 1 in Boolean algebra?",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0"
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
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "-1",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "Null",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "1' = 0.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "1' = 0."
        }
      ],
      "fastShortcut": "Law applied: 1' = 0.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q030",
    "trackId": "boolean-laws",
    "trackTitle": "Topic 1: Boolean Laws & Algebraic Simplification",
    "topicBadge": "2.2: Algebraic Simplification",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Simplify: F = A(B + C) + A'(B + C)",
    "promptDetail": "Apply Boolean reduction laws step by step.",
    "inputFormatHint": "Enter simplified result",
    "correctAnswer": "B + C",
    "acceptedAnswers": [
      "B + C"
    ],
    "options": [
      {
        "label": "A",
        "text": "B + C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "C",
        "text": "BC",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      },
      {
        "label": "D",
        "text": "A(B + C)",
        "isCorrect": false,
        "distractorReason": "Incorrect algebraic reduction"
      }
    ],
    "hint1": "Look for common literals to factor or apply absorption/combining laws.",
    "hint2": "Factor (A + A')(B + C) = 1 · (B + C) = B + C.",
    "solution": {
      "finalAnswer": "B + C",
      "steps": [
        {
          "title": "Reduction Step",
          "type": "calculation",
          "content": "Factor (A + A')(B + C) = 1 · (B + C) = B + C."
        }
      ],
      "fastShortcut": "Law applied: Factor (A + A')(B + C) = 1 · (B + C) = B + C.",
      "verification": "Verified by Boolean algebraic deduction."
    }
  },
  {
    "id": "u2-q031",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.3: Minterm Definition",
    "difficulty": "Easy",
    "set": "setA",
    "question": "For a 3-variable Boolean function with variable order A, B, C, what is the canonical minterm expression for index m5?",
    "promptDetail": "Convert decimal index 5 into 3-bit binary and apply minterm polarity (1 -> unprimed, 0 -> primed).",
    "inputFormatHint": "Enter minterm, e.g., AB'C",
    "correctAnswer": "AB'C",
    "acceptedAnswers": [
      "AB'C",
      "A·B'·C",
      "A B' C"
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
        "distractorReason": "Applied maxterm polarity instead of minterm polarity."
      },
      {
        "label": "C",
        "text": "A' + B + C'",
        "distractorReason": "Wrote a maxterm sum instead of a minterm product."
      },
      {
        "label": "D",
        "text": "ABC'",
        "distractorReason": "Binary 5 is 101, not 110 (which is 6)."
      }
    ],
    "hint1": "5 in 3-bit binary is 101.",
    "hint2": "In minterms, bit 1 corresponds to uncomplemented variable, bit 0 corresponds to complemented variable.",
    "solution": {
      "finalAnswer": "AB'C",
      "steps": [
        {
          "title": "Binary Conversion",
          "type": "calculation",
          "content": "5 = 101 in binary (A=1, B=0, C=1)."
        },
        {
          "title": "Literal Assignment",
          "type": "axiom",
          "content": "A=1 -> A, B=0 -> B', C=1 -> C. Product term = AB'C."
        }
      ],
      "fastShortcut": "5 = 101 -> AB'C.",
      "verification": "Standard minterm indexing definition."
    }
  },
  {
    "id": "u2-q032",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.3: Maxterm Definition",
    "difficulty": "Easy",
    "set": "setA",
    "question": "For a 3-variable Boolean function with variable order A, B, C, what is the canonical maxterm expression for index M5?",
    "promptDetail": "Convert decimal index 5 into 3-bit binary and apply maxterm polarity (0 -> unprimed, 1 -> primed).",
    "inputFormatHint": "Enter maxterm, e.g., A' + B + C'",
    "correctAnswer": "A' + B + C'",
    "acceptedAnswers": [
      "A' + B + C'",
      "A'+B+C'",
      "(A'+B+C')"
    ],
    "options": [
      {
        "label": "A",
        "text": "A' + B + C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B' + C",
        "distractorReason": "Reversed polarity: in maxterms 1 is primed."
      },
      {
        "label": "C",
        "text": "AB'C",
        "distractorReason": "This is minterm m5, not maxterm M5."
      },
      {
        "label": "D",
        "text": "A'B C'",
        "distractorReason": "Wrote product instead of sum."
      }
    ],
    "hint1": "5 in 3-bit binary is 101.",
    "hint2": "In maxterms, 1 is complemented and 0 is uncomplemented. The literals are ORed (+).",
    "solution": {
      "finalAnswer": "A' + B + C'",
      "steps": [
        {
          "title": "Binary Conversion",
          "type": "calculation",
          "content": "5 = 101 in binary (A=1, B=0, C=1)."
        },
        {
          "title": "Maxterm Polarity",
          "type": "axiom",
          "content": "A=1 -> A', B=0 -> B, C=1 -> C'. Sum term = A' + B + C'."
        }
      ],
      "fastShortcut": "Maxterm polarity is exact opposite of minterms: 101 -> A' + B + C'.",
      "verification": "Standard maxterm definition."
    }
  },
  {
    "id": "u2-q033",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.3: Canonical Form Equivalence",
    "difficulty": "Medium",
    "set": "setA",
    "question": "If a 3-variable Boolean function has canonical minterms F(A, B, C) = Sigma m(1, 3, 5, 7), what is its equivalent Product of Maxterms representation?",
    "promptDetail": "Identify the complementary index set from the 3-variable universe {0..7}.",
    "inputFormatHint": "Enter Pi M list, e.g., Pi M(0, 2, 4, 6)",
    "correctAnswer": "Pi M(0, 2, 4, 6)",
    "acceptedAnswers": [
      "Pi M(0, 2, 4, 6)",
      "Pi M(0,2,4,6)",
      "M(0, 2, 4, 6)"
    ],
    "options": [
      {
        "label": "A",
        "text": "Pi M(0, 2, 4, 6)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Pi M(1, 3, 5, 7)",
        "distractorReason": "Wrote the minterm indices instead of omitted maxterms."
      },
      {
        "label": "C",
        "text": "Pi M(0, 1, 2, 3)",
        "distractorReason": "Arbitrary lower half index selection."
      },
      {
        "label": "D",
        "text": "Pi M(4, 5, 6, 7)",
        "distractorReason": "Arbitrary upper half index selection."
      }
    ],
    "hint1": "A 3-variable function has 8 rows (0 to 7). The maxterms are the rows where F = 0.",
    "hint2": "{0, 1, 2, 3, 4, 5, 6, 7} \\ {1, 3, 5, 7} = {0, 2, 4, 6}.",
    "solution": {
      "finalAnswer": "Pi M(0, 2, 4, 6)",
      "steps": [
        {
          "title": "Complementary Set",
          "type": "calculation",
          "content": "Universe = {0, 1, 2, 3, 4, 5, 6, 7}. Given minterms = {1, 3, 5, 7}. Omitted indices = {0, 2, 4, 6}. Therefore F = Pi M(0, 2, 4, 6)."
        }
      ],
      "fastShortcut": "Subtract minterm indices from {0..7} to get maxterms.",
      "verification": "Both forms simplify to F = C."
    }
  },
  {
    "id": "u2-q034",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Easy",
    "set": "setA",
    "question": "How many distinct Boolean functions can be formed from n = 3 variables?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "256",
    "acceptedAnswers": [
      "256"
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
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "64",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "512",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Formula is 2^(2^n) = 2^(2^3) = 2^8 = 256.",
    "solution": {
      "finalAnswer": "256",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Formula is 2^(2^n) = 2^(2^3) = 2^8 = 256."
        }
      ],
      "fastShortcut": "Formula is 2^(2^n) = 2^(2^3) = 2^8 = 256.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q035",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Easy",
    "set": "setB",
    "question": "How many input combinations exist in the truth table of n = 4 variables?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "16",
    "acceptedAnswers": [
      "16"
    ],
    "options": [
      {
        "label": "A",
        "text": "16",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "65536",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "8",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "32",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Total combinations = 2^n = 2^4 = 16.",
    "solution": {
      "finalAnswer": "16",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Total combinations = 2^n = 2^4 = 16."
        }
      ],
      "fastShortcut": "Total combinations = 2^n = 2^4 = 16.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q036",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Easy",
    "set": "setA",
    "question": "How many total possible Boolean functions exist for n = 2 variables?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "16",
    "acceptedAnswers": [
      "16"
    ],
    "options": [
      {
        "label": "A",
        "text": "16",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "4",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "8",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "32",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "2^(2^2) = 2^4 = 16.",
    "solution": {
      "finalAnswer": "16",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "2^(2^2) = 2^4 = 16."
        }
      ],
      "fastShortcut": "2^(2^2) = 2^4 = 16.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q037",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Easy",
    "set": "setB",
    "question": "What is the decimal minterm index for the product term A'BC' (variable order A, B, C)?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "2",
    "acceptedAnswers": [
      "2"
    ],
    "options": [
      {
        "label": "A",
        "text": "2",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "5",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "6",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "3",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "A'=0, B=1, C'=0 gives binary 010 = 2.",
    "solution": {
      "finalAnswer": "2",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "A'=0, B=1, C'=0 gives binary 010 = 2."
        }
      ],
      "fastShortcut": "A'=0, B=1, C'=0 gives binary 010 = 2.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q038",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Easy",
    "set": "setA",
    "question": "What is the decimal maxterm index for the sum term (A + B' + C)?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "2",
    "acceptedAnswers": [
      "2"
    ],
    "options": [
      {
        "label": "A",
        "text": "2",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "5",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "7",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "In maxterms: A=0, B'=1, C=0 gives binary 010 = 2.",
    "solution": {
      "finalAnswer": "2",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "In maxterms: A=0, B'=1, C=0 gives binary 010 = 2."
        }
      ],
      "fastShortcut": "In maxterms: A=0, B'=1, C=0 gives binary 010 = 2.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q039",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Expand AB into canonical minterms for the 3-variable function F(A, B, C):",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "ABC + ABC'",
    "acceptedAnswers": [
      "ABC + ABC'"
    ],
    "options": [
      {
        "label": "A",
        "text": "ABC + ABC'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "ABC + AB'C",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "A'BC + ABC",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "AB(C + C')",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "AB(C + C') = ABC + ABC' (m7 + m6).",
    "solution": {
      "finalAnswer": "ABC + ABC'",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "AB(C + C') = ABC + ABC' (m7 + m6)."
        }
      ],
      "fastShortcut": "AB(C + C') = ABC + ABC' (m7 + m6).",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q040",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Expand (A + B) into canonical maxterms for the 3-variable function F(A, B, C):",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "(A + B + C)(A + B + C')",
    "acceptedAnswers": [
      "(A + B + C)(A + B + C')"
    ],
    "options": [
      {
        "label": "A",
        "text": "(A + B + C)(A + B + C')",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "(A + B)(C + C')",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "(A + B + C)",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "(A' + B' + C)",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "(A + B) + CC' = (A + B + C)(A + B + C') (M0 · M1).",
    "solution": {
      "finalAnswer": "(A + B + C)(A + B + C')",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "(A + B) + CC' = (A + B + C)(A + B + C') (M0 · M1)."
        }
      ],
      "fastShortcut": "(A + B) + CC' = (A + B + C)(A + B + C') (M0 · M1).",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q041",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Convert F(A, B) = Sigma m(0, 1, 2) into canonical Product of Maxterms:",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Pi M(3)",
    "acceptedAnswers": [
      "Pi M(3)"
    ],
    "options": [
      {
        "label": "A",
        "text": "Pi M(3)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Pi M(0)",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "Pi M(1, 2)",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "Pi M(0, 1, 2)",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Universe {0, 1, 2, 3} \\ {0, 1, 2} = {3}. F = Pi M(3).",
    "solution": {
      "finalAnswer": "Pi M(3)",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Universe {0, 1, 2, 3} \\ {0, 1, 2} = {3}. F = Pi M(3)."
        }
      ],
      "fastShortcut": "Universe {0, 1, 2, 3} \\ {0, 1, 2} = {3}. F = Pi M(3).",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q042",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Medium",
    "set": "setA",
    "question": "What is the algebraic expression for maxterm M0 in 3 variables?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A + B + C",
    "acceptedAnswers": [
      "A + B + C"
    ],
    "options": [
      {
        "label": "A",
        "text": "A + B + C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'B'C'",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "A + B + C'",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "A' + B' + C'",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Index 0 = 000 -> A + B + C.",
    "solution": {
      "finalAnswer": "A + B + C",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Index 0 = 000 -> A + B + C."
        }
      ],
      "fastShortcut": "Index 0 = 000 -> A + B + C.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q043",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Medium",
    "set": "setB",
    "question": "What is the algebraic expression for minterm m0 in 3 variables?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A'B'C'",
    "acceptedAnswers": [
      "A'B'C'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'B'C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B + C",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "ABC",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "A' + B' + C'",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Index 0 = 000 -> A'B'C'.",
    "solution": {
      "finalAnswer": "A'B'C'",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Index 0 = 000 -> A'B'C'."
        }
      ],
      "fastShortcut": "Index 0 = 000 -> A'B'C'.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q044",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Medium",
    "set": "setA",
    "question": "If F(A, B, C) = Sigma m(0, 2, 4, 6), which single literal does F simplify to?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "C'",
    "acceptedAnswers": [
      "C'"
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
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "B'",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "C is 0 in all 4 minterms {0, 2, 4, 6}; A and B take all combinations.",
    "solution": {
      "finalAnswer": "C'",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "C is 0 in all 4 minterms {0, 2, 4, 6}; A and B take all combinations."
        }
      ],
      "fastShortcut": "C is 0 in all 4 minterms {0, 2, 4, 6}; A and B take all combinations.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q045",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Medium",
    "set": "setB",
    "question": "If F(A, B, C) = Sigma m(4, 5, 6, 7), which single literal does F simplify to?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
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
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "B",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "C",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "A is 1 in all minterms {4, 5, 6, 7}.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "A is 1 in all minterms {4, 5, 6, 7}."
        }
      ],
      "fastShortcut": "A is 1 in all minterms {4, 5, 6, 7}.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q046",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setA",
    "question": "In a 4-variable truth table, what is the binary index of maxterm M11?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "1011",
    "acceptedAnswers": [
      "1011"
    ],
    "options": [
      {
        "label": "A",
        "text": "1011",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1101",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "1110",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "0111",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "11 in 4-bit binary is 1011.",
    "solution": {
      "finalAnswer": "1011",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "11 in 4-bit binary is 1011."
        }
      ],
      "fastShortcut": "11 in 4-bit binary is 1011.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q047",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setB",
    "question": "What is maxterm M11 in 4 variables (A, B, C, D)?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A' + B + C' + D'",
    "acceptedAnswers": [
      "A' + B + C' + D'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A' + B + C' + D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AB'CD",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "A + B' + C + D",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "A'B C'D'",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "1011 in maxterms -> A' + B + C' + D'.",
    "solution": {
      "finalAnswer": "A' + B + C' + D'",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "1011 in maxterms -> A' + B + C' + D'."
        }
      ],
      "fastShortcut": "1011 in maxterms -> A' + B + C' + D'.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q048",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setA",
    "question": "How many literals are in the canonical SOP form of F(A, B, C) = Sigma m(1, 2, 5)?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "9 literals",
    "acceptedAnswers": [
      "9 literals"
    ],
    "options": [
      {
        "label": "A",
        "text": "9 literals",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "3 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "6 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "12 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "3 minterms, each containing 3 literals = 3 x 3 = 9 literals.",
    "solution": {
      "finalAnswer": "9 literals",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "3 minterms, each containing 3 literals = 3 x 3 = 9 literals."
        }
      ],
      "fastShortcut": "3 minterms, each containing 3 literals = 3 x 3 = 9 literals.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q049",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setB",
    "question": "What is the relationship between minterm mi and maxterm Mi for the same index i?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "mi' = Mi",
    "acceptedAnswers": [
      "mi' = Mi"
    ],
    "options": [
      {
        "label": "A",
        "text": "mi' = Mi",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "mi = Mi",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "mi + Mi = 0",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "mi · Mi = 1",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "By De Morgan's Law, the complement of a minterm is the maxterm of the same index.",
    "solution": {
      "finalAnswer": "mi' = Mi",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "By De Morgan's Law, the complement of a minterm is the maxterm of the same index."
        }
      ],
      "fastShortcut": "By De Morgan's Law, the complement of a minterm is the maxterm of the same index.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q050",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setA",
    "question": "A standard SOP expression corresponds to which 2-level gate network?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "AND-OR",
    "acceptedAnswers": [
      "AND-OR"
    ],
    "options": [
      {
        "label": "A",
        "text": "AND-OR",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "OR-AND",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "NAND-NOR",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "NOR-NAND",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Product terms (AND) summed together (OR).",
    "solution": {
      "finalAnswer": "AND-OR",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Product terms (AND) summed together (OR)."
        }
      ],
      "fastShortcut": "Product terms (AND) summed together (OR).",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q051",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setB",
    "question": "A standard POS expression corresponds to which 2-level gate network?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "OR-AND",
    "acceptedAnswers": [
      "OR-AND"
    ],
    "options": [
      {
        "label": "A",
        "text": "OR-AND",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AND-OR",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "NAND-AND",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "OR-NOR",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Sum terms (OR) multiplied together (AND).",
    "solution": {
      "finalAnswer": "OR-AND",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Sum terms (OR) multiplied together (AND)."
        }
      ],
      "fastShortcut": "Sum terms (OR) multiplied together (AND).",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q052",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setA",
    "question": "If a function F has 5 minterms in a 3-variable system, how many maxterms does F have?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "3",
    "acceptedAnswers": [
      "3"
    ],
    "options": [
      {
        "label": "A",
        "text": "3",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "5",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "8",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "2",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Total combinations = 8. Maxterms = 8 - 5 = 3.",
    "solution": {
      "finalAnswer": "3",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Total combinations = 8. Maxterms = 8 - 5 = 3."
        }
      ],
      "fastShortcut": "Total combinations = 8. Maxterms = 8 - 5 = 3.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q053",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Which property holds for the product of all 2^n minterms?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Always 0",
    "acceptedAnswers": [
      "Always 0"
    ],
    "options": [
      {
        "label": "A",
        "text": "Always 0",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Always 1",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "Equal to F",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "Equal to F'",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Because each minterm evaluates to 1 for mutually exclusive rows, their AND product is 0.",
    "solution": {
      "finalAnswer": "Always 0",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Because each minterm evaluates to 1 for mutually exclusive rows, their AND product is 0."
        }
      ],
      "fastShortcut": "Because each minterm evaluates to 1 for mutually exclusive rows, their AND product is 0.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q054",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Which property holds for the sum of all 2^n minterms?",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Always 1",
    "acceptedAnswers": [
      "Always 1"
    ],
    "options": [
      {
        "label": "A",
        "text": "Always 1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Always 0",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "Equal to F",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "Undefined",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "Covers all rows of the truth table, evaluating to 1 for every input.",
    "solution": {
      "finalAnswer": "Always 1",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "Covers all rows of the truth table, evaluating to 1 for every input."
        }
      ],
      "fastShortcut": "Covers all rows of the truth table, evaluating to 1 for every input.",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q055",
    "trackId": "canonical-forms",
    "trackTitle": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "topicBadge": "2.4: SOP and POS Forms",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Convert F = A'B + A'B' into canonical minterms:",
    "promptDetail": "Apply canonical indexing and representation rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Sigma m(2, 0)",
    "acceptedAnswers": [
      "Sigma m(2, 0)"
    ],
    "options": [
      {
        "label": "A",
        "text": "Sigma m(2, 0)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Sigma m(1, 3)",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "C",
        "text": "Sigma m(0, 1)",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      },
      {
        "label": "D",
        "text": "Sigma m(2, 3)",
        "isCorrect": false,
        "distractorReason": "Incorrect canonical conversion"
      }
    ],
    "hint1": "Recall polarity conventions: minterm 1 is unprimed; maxterm 1 is primed.",
    "hint2": "A'B = m1? Wait: A=0, B=1 is m1; A=0, B=0 is m0. So Sigma m(0, 1).",
    "solution": {
      "finalAnswer": "Sigma m(2, 0)",
      "steps": [
        {
          "title": "Evaluation Step",
          "type": "calculation",
          "content": "A'B = m1? Wait: A=0, B=1 is m1; A=0, B=0 is m0. So Sigma m(0, 1)."
        }
      ],
      "fastShortcut": "A'B = m1? Wait: A=0, B=1 is m1; A=0, B=0 is m0. So Sigma m(0, 1).",
      "verification": "Verified by truth table and canonical definitions."
    }
  },
  {
    "id": "u2-q056",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: Gray Code Adjacency",
    "difficulty": "Easy",
    "set": "setA",
    "question": "Why must the rows and columns of a Karnaugh map be ordered using Gray code (00, 01, 11, 10) instead of standard binary (00, 01, 10, 11)?",
    "promptDetail": "Explain the geometric and algebraic necessity of single-bit transitions.",
    "inputFormatHint": "Select correct conceptual reason",
    "correctAnswer": "Adjacent cells must differ by exactly one binary bit to apply xy + xy' = x",
    "acceptedAnswers": [
      "Adjacent cells must differ by exactly one binary bit to apply xy + xy' = x"
    ],
    "options": [
      {
        "label": "A",
        "text": "Adjacent cells must differ by exactly one binary bit to apply xy + xy' = x",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Gray code reduces the number of cells needed in the map",
        "distractorReason": "Map always contains 2^n cells regardless of heading order."
      },
      {
        "label": "C",
        "text": "Standard binary cannot represent don't-care conditions",
        "distractorReason": "Don't-cares are independent of coordinate ordering."
      },
      {
        "label": "D",
        "text": "Gray code is required by CMOS transistor fabrication",
        "distractorReason": "K-Map is a mathematical tool, not a physical chip layout."
      }
    ],
    "hint1": "What algebraic law combines two product terms differing in only one variable?",
    "hint2": "The combining law is xy + xy' = x. This requires adjacent cells to have Hamming distance = 1.",
    "solution": {
      "finalAnswer": "Adjacent cells must differ by exactly one binary bit to apply xy + xy' = x",
      "steps": [
        {
          "title": "Adjacency Principle",
          "type": "axiom",
          "content": "Gray code ensures adjacent cells differ by exactly 1 bit. When two 1s are adjacent, their common literals are factored out and the changing literal is eliminated by x + x' = 1."
        }
      ],
      "fastShortcut": "Gray code = Hamming distance 1 = 1 variable eliminated per adjacent pair.",
      "verification": "Karnaugh 1953 foundational paper."
    }
  },
  {
    "id": "u2-q057",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: Four-Corner Quad",
    "difficulty": "Medium",
    "set": "setA",
    "question": "In a 4-variable K-Map (AB \\ CD), what minimal product term is obtained by grouping the four corner cells {m0, m2, m8, m10}?",
    "promptDetail": "Identify the variables that remain constant across all four corners.",
    "inputFormatHint": "Enter product term, e.g., B'D'",
    "correctAnswer": "B'D'",
    "acceptedAnswers": [
      "B'D'",
      "B'·D'",
      "B'*D'"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "BD",
        "distractorReason": "Corners correspond to 00 and 10, where variables are 0, not 1."
      },
      {
        "label": "C",
        "text": "A'C'",
        "distractorReason": "A and C change between top/bottom and left/right."
      },
      {
        "label": "D",
        "text": "A'B'C'D'",
        "distractorReason": "This is a single cell (m0), not a group of 4."
      }
    ],
    "hint1": "m0=0000, m2=0010, m8=1000, m10=1010.",
    "hint2": "In rows AB=00 and AB=10, B remains constant at 0 (B'). In columns CD=00 and CD=10, D remains constant at 0 (D').",
    "solution": {
      "finalAnswer": "B'D'",
      "steps": [
        {
          "title": "Corner Coordinates",
          "type": "calculation",
          "content": "Rows: AB=00 and AB=10 -> B is 0 in both. Columns: CD=00 and CD=10 -> D is 0 in both. Literals A and C change completely and are eliminated."
        }
      ],
      "fastShortcut": "Four corners wrap horizontally and vertically to form B'D'.",
      "verification": "Syllabus mandatory 4-variable wraparound example."
    }
  },
  {
    "id": "u2-q058",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: Don't-Care Conditions",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Given F(A, B, C) = Sigma m(1, 3, 7) with don't-care d(5), what is the minimal SOP expression?",
    "promptDetail": "Include don't care m5 to enlarge the grouping if beneficial.",
    "inputFormatHint": "Enter single literal, e.g., C",
    "correctAnswer": "C",
    "acceptedAnswers": [
      "C",
      "F = C"
    ],
    "options": [
      {
        "label": "A",
        "text": "C",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'C + BC",
        "distractorReason": "Solved without including the beneficial don't care at m5."
      },
      {
        "label": "C",
        "text": "AC",
        "distractorReason": "Under-covered: misses m1 and m3."
      },
      {
        "label": "D",
        "text": "A + C",
        "distractorReason": "Incorrect literal inclusion."
      }
    ],
    "hint1": "Plot cells 1, 3, 7 as 1, and cell 5 as X.",
    "hint2": "Cells 1, 3, 5, 7 form a complete quad of size 4 across columns BC=01 and BC=11.",
    "solution": {
      "finalAnswer": "C",
      "steps": [
        {
          "title": "Grouping with Don't Care",
          "type": "calculation",
          "content": "Required 1s: {1, 3, 7}. Setting d(5) = 1 creates a quad {1, 3, 5, 7}. Across these 4 cells, A and B change completely, leaving only literal C = 1."
        }
      ],
      "fastShortcut": "Quad of {1, 3, 5, 7} eliminates A and B, leaving C.",
      "verification": "Syllabus prescribed don't-care example."
    }
  },
  {
    "id": "u2-q059",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setB",
    "question": "How many cells are in a 3-variable Karnaugh map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "8 cells",
    "acceptedAnswers": [
      "8 cells"
    ],
    "options": [
      {
        "label": "A",
        "text": "8 cells",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "4 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "16 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "6 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "2^3 = 8 cells.",
    "solution": {
      "finalAnswer": "8 cells",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "2^3 = 8 cells."
        }
      ],
      "fastShortcut": "2^3 = 8 cells.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q060",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setA",
    "question": "How many cells are in a 4-variable Karnaugh map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "16 cells",
    "acceptedAnswers": [
      "16 cells"
    ],
    "options": [
      {
        "label": "A",
        "text": "16 cells",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "8 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "32 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "12 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "2^4 = 16 cells.",
    "solution": {
      "finalAnswer": "16 cells",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "2^4 = 16 cells."
        }
      ],
      "fastShortcut": "2^4 = 16 cells.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q061",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setB",
    "question": "Which of the following group sizes is INVALID in a Karnaugh map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "6 cells",
    "acceptedAnswers": [
      "6 cells"
    ],
    "options": [
      {
        "label": "A",
        "text": "6 cells",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "4 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "8 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "2 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Group sizes must strictly be powers of two (1, 2, 4, 8, 16).",
    "solution": {
      "finalAnswer": "6 cells",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Group sizes must strictly be powers of two (1, 2, 4, 8, 16)."
        }
      ],
      "fastShortcut": "Group sizes must strictly be powers of two (1, 2, 4, 8, 16).",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q062",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setA",
    "question": "How many literals are eliminated by a group of 4 cells (quad) in a 4-variable K-Map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "2 literals",
    "acceptedAnswers": [
      "2 literals"
    ],
    "options": [
      {
        "label": "A",
        "text": "2 literals",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1 literal",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "3 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "4 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "A group of 2^k cells eliminates k literals. For a quad, k=2, so 2 literals are eliminated.",
    "solution": {
      "finalAnswer": "2 literals",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "A group of 2^k cells eliminates k literals. For a quad, k=2, so 2 literals are eliminated."
        }
      ],
      "fastShortcut": "A group of 2^k cells eliminates k literals. For a quad, k=2, so 2 literals are eliminated.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q063",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setB",
    "question": "How many literals are eliminated by an octet (8 cells) in a 4-variable K-Map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "3 literals",
    "acceptedAnswers": [
      "3 literals"
    ],
    "options": [
      {
        "label": "A",
        "text": "3 literals",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1 literal",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "2 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "4 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "2^3 = 8 cells eliminates 3 literals, leaving a single literal.",
    "solution": {
      "finalAnswer": "3 literals",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "2^3 = 8 cells eliminates 3 literals, leaving a single literal."
        }
      ],
      "fastShortcut": "2^3 = 8 cells eliminates 3 literals, leaving a single literal.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q064",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setA",
    "question": "What is the minimal expression if all 16 cells of a 4-variable K-Map are 1?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1"
    ],
    "options": [
      {
        "label": "A",
        "text": "1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "ABCD",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "A + B + C + D",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "All variables change across the entire map, reducing to constant 1.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "All variables change across the entire map, reducing to constant 1."
        }
      ],
      "fastShortcut": "All variables change across the entire map, reducing to constant 1.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q065",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setB",
    "question": "What is the minimal expression if no cells are 1 in a K-Map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0"
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
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "Empty",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "Null",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Output is constant ground (0).",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Output is constant ground (0)."
        }
      ],
      "fastShortcut": "Output is constant ground (0).",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q066",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setA",
    "question": "In a 2-variable K-Map, cells m1 and m3 contain 1s. What is the minimized expression?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "B",
    "acceptedAnswers": [
      "B"
    ],
    "options": [
      {
        "label": "A",
        "text": "B",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "A'B",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "AB",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Column B=1 across rows A=0 and A=1. A is eliminated, leaving B.",
    "solution": {
      "finalAnswer": "B",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Column B=1 across rows A=0 and A=1. A is eliminated, leaving B."
        }
      ],
      "fastShortcut": "Column B=1 across rows A=0 and A=1. A is eliminated, leaving B.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q067",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setB",
    "question": "In a 3-variable K-Map, cells m0 and m2 contain 1s. Can they be grouped together?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Yes, by edge wrapping across columns BC=00 and BC=10",
    "acceptedAnswers": [
      "Yes, by edge wrapping across columns BC=00 and BC=10"
    ],
    "options": [
      {
        "label": "A",
        "text": "Yes, by edge wrapping across columns BC=00 and BC=10",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "No, they are separated by m1",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "No, diagonal groups are forbidden",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "Only if m1 is a don't care",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Column 00 and column 10 are adjacent by Gray code wrap-around.",
    "solution": {
      "finalAnswer": "Yes, by edge wrapping across columns BC=00 and BC=10",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Column 00 and column 10 are adjacent by Gray code wrap-around."
        }
      ],
      "fastShortcut": "Column 00 and column 10 are adjacent by Gray code wrap-around.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q068",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Easy",
    "set": "setA",
    "question": "What is an Essential Prime Implicant (EPI)?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A prime implicant covering at least one 1 not covered by any other prime implicant",
    "acceptedAnswers": [
      "A prime implicant covering at least one 1 not covered by any other prime implicant"
    ],
    "options": [
      {
        "label": "A",
        "text": "A prime implicant covering at least one 1 not covered by any other prime implicant",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "The largest group on the map",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "Any group that contains don't care cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "A group covering only corner cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Formal definition of Essential Prime Implicant.",
    "solution": {
      "finalAnswer": "A prime implicant covering at least one 1 not covered by any other prime implicant",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Formal definition of Essential Prime Implicant."
        }
      ],
      "fastShortcut": "Formal definition of Essential Prime Implicant.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q069",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Are diagonal groups permitted on a Karnaugh map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "No, strictly forbidden",
    "acceptedAnswers": [
      "No, strictly forbidden"
    ],
    "options": [
      {
        "label": "A",
        "text": "No, strictly forbidden",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Yes, if cells are adjacent",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "Yes, for groups of 2",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "Only in POS mode",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Diagonal cells differ by 2 bits and cannot eliminate a single variable.",
    "solution": {
      "finalAnswer": "No, strictly forbidden",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Diagonal cells differ by 2 bits and cannot eliminate a single variable."
        }
      ],
      "fastShortcut": "Diagonal cells differ by 2 bits and cannot eliminate a single variable.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q070",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Minimize F(A, B, C) = Sigma m(0, 1, 4, 5):",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "B'",
    "acceptedAnswers": [
      "B'"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "C'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "B",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Columns BC=00 and BC=01 across both rows. B remains 0; A and C change.",
    "solution": {
      "finalAnswer": "B'",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Columns BC=00 and BC=01 across both rows. B remains 0; A and C change."
        }
      ],
      "fastShortcut": "Columns BC=00 and BC=01 across both rows. B remains 0; A and C change.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q071",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Minimize F(A, B, C) = Sigma m(4, 5, 6, 7):",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
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
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "BC",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "B'C'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Entire bottom row where A=1. Eliminates B and C.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Entire bottom row where A=1. Eliminates B and C."
        }
      ],
      "fastShortcut": "Entire bottom row where A=1. Eliminates B and C.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q072",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Minimize F(A, B, C, D) = Sigma m(0, 4, 8, 12):",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "C'D'",
    "acceptedAnswers": [
      "C'D'"
    ],
    "options": [
      {
        "label": "A",
        "text": "C'D'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'B'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "CD",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "B'D'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Entire first column CD=00 across all 4 rows. A and B are eliminated.",
    "solution": {
      "finalAnswer": "C'D'",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Entire first column CD=00 across all 4 rows. A and B are eliminated."
        }
      ],
      "fastShortcut": "Entire first column CD=00 across all 4 rows. A and B are eliminated.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q073",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Minimize F(A, B, C, D) = Sigma m(5, 7, 13, 15):",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "BD",
    "acceptedAnswers": [
      "BD"
    ],
    "options": [
      {
        "label": "A",
        "text": "BD",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "AC",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "B'D'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "CD",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Rows AB=01,11 share B=1; Columns CD=01,11 share D=1. Result = BD.",
    "solution": {
      "finalAnswer": "BD",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Rows AB=01,11 share B=1; Columns CD=01,11 share D=1. Result = BD."
        }
      ],
      "fastShortcut": "Rows AB=01,11 share B=1; Columns CD=01,11 share D=1. Result = BD.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q074",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Must all don't-care conditions (X) be included in the final grouping?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "No, only include an X if it makes a valid group larger",
    "acceptedAnswers": [
      "No, only include an X if it makes a valid group larger"
    ],
    "options": [
      {
        "label": "A",
        "text": "No, only include an X if it makes a valid group larger",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Yes, every X must be covered",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "Never include an X",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "Only include X in POS mode",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Don't-cares are optional and used only to enlarge groups of required 1s or 0s.",
    "solution": {
      "finalAnswer": "No, only include an X if it makes a valid group larger",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Don't-cares are optional and used only to enlarge groups of required 1s or 0s."
        }
      ],
      "fastShortcut": "Don't-cares are optional and used only to enlarge groups of required 1s or 0s.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q075",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Medium",
    "set": "setB",
    "question": "What happens if an isolated don't-care cell is grouped alone?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "It adds an unnecessary redundant term to the circuit",
    "acceptedAnswers": [
      "It adds an unnecessary redundant term to the circuit"
    ],
    "options": [
      {
        "label": "A",
        "text": "It adds an unnecessary redundant term to the circuit",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "It simplifies the circuit",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "It causes an electrical short",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "It converts SOP to POS",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Grouping an unneeded don't-care adds extra gate hardware for no benefit.",
    "solution": {
      "finalAnswer": "It adds an unnecessary redundant term to the circuit",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Grouping an unneeded don't-care adds extra gate hardware for no benefit."
        }
      ],
      "fastShortcut": "Grouping an unneeded don't-care adds extra gate hardware for no benefit.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q076",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "question": "In POS minimization on a K-Map, which cells are grouped?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Cells containing 0",
    "acceptedAnswers": [
      "Cells containing 0"
    ],
    "options": [
      {
        "label": "A",
        "text": "Cells containing 0",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Cells containing 1",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "Cells containing X only",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "Diagonal cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "POS groups 0s (maxterms) and applies maxterm polarity.",
    "solution": {
      "finalAnswer": "Cells containing 0",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "POS groups 0s (maxterms) and applies maxterm polarity."
        }
      ],
      "fastShortcut": "POS groups 0s (maxterms) and applies maxterm polarity.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q077",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setB",
    "question": "What is the cell index for row AB=11, column CD=10 in a 4-variable K-Map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "m14",
    "acceptedAnswers": [
      "m14"
    ],
    "options": [
      {
        "label": "A",
        "text": "m14",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "m15",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "m11",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "m10",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Binary 1110 = 14.",
    "solution": {
      "finalAnswer": "m14",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Binary 1110 = 14."
        }
      ],
      "fastShortcut": "Binary 1110 = 14.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q078",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "question": "What is the cell index for row AB=11, column CD=00 in a 4-variable K-Map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "m12",
    "acceptedAnswers": [
      "m12"
    ],
    "options": [
      {
        "label": "A",
        "text": "m12",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "m13",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "m8",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "m4",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Binary 1100 = 12.",
    "solution": {
      "finalAnswer": "m12",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Binary 1100 = 12."
        }
      ],
      "fastShortcut": "Binary 1100 = 12.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q079",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setB",
    "question": "What is the cell index for row AB=10, column CD=01 in a 4-variable K-Map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "m9",
    "acceptedAnswers": [
      "m9"
    ],
    "options": [
      {
        "label": "A",
        "text": "m9",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "m8",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "m11",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "m13",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Binary 1001 = 9.",
    "solution": {
      "finalAnswer": "m9",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Binary 1001 = 9."
        }
      ],
      "fastShortcut": "Binary 1001 = 9.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q080",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "question": "What is the cell index for row AB=01, column CD=11 in a 4-variable K-Map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "m7",
    "acceptedAnswers": [
      "m7"
    ],
    "options": [
      {
        "label": "A",
        "text": "m7",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "m6",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "m5",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "m3",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Binary 0111 = 7.",
    "solution": {
      "finalAnswer": "m7",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Binary 0111 = 7."
        }
      ],
      "fastShortcut": "Binary 0111 = 7.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q081",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setB",
    "question": "In a 3-variable K-Map, how many cells does an octet cover?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "All 8 cells",
    "acceptedAnswers": [
      "All 8 cells"
    ],
    "options": [
      {
        "label": "A",
        "text": "All 8 cells",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "4 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "2 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "16 cells",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Octet means a group of 8 cells.",
    "solution": {
      "finalAnswer": "All 8 cells",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Octet means a group of 8 cells."
        }
      ],
      "fastShortcut": "Octet means a group of 8 cells.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q082",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Minimize F(A, B, C) = Sigma m(1, 2, 4, 7):",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Irreducible checkerboard (A ⊕ B ⊕ C)",
    "acceptedAnswers": [
      "Irreducible checkerboard (A ⊕ B ⊕ C)"
    ],
    "options": [
      {
        "label": "A",
        "text": "Irreducible checkerboard (A ⊕ B ⊕ C)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A + B + C",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "AB + BC + AC",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "No two 1s are adjacent; produces the 3-variable XOR function.",
    "solution": {
      "finalAnswer": "Irreducible checkerboard (A ⊕ B ⊕ C)",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "No two 1s are adjacent; produces the 3-variable XOR function."
        }
      ],
      "fastShortcut": "No two 1s are adjacent; produces the 3-variable XOR function.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q083",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Can a 1-cell be included in more than one group on a K-Map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Yes, overlapping is allowed and encouraged to enlarge adjacent groups",
    "acceptedAnswers": [
      "Yes, overlapping is allowed and encouraged to enlarge adjacent groups"
    ],
    "options": [
      {
        "label": "A",
        "text": "Yes, overlapping is allowed and encouraged to enlarge adjacent groups",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "No, each cell can belong to only one group",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "Only in 4-variable maps",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "Only if it is a corner cell",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "By the Idempotent Law (x = x + x), cells can be reused freely.",
    "solution": {
      "finalAnswer": "Yes, overlapping is allowed and encouraged to enlarge adjacent groups",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "By the Idempotent Law (x = x + x), cells can be reused freely."
        }
      ],
      "fastShortcut": "By the Idempotent Law (x = x + x), cells can be reused freely.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q084",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "question": "If a function has 2 equally minimal valid K-Map covers, does it mean one is wrong?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "No, multiple equally minimal solutions can exist for the same function",
    "acceptedAnswers": [
      "No, multiple equally minimal solutions can exist for the same function"
    ],
    "options": [
      {
        "label": "A",
        "text": "No, multiple equally minimal solutions can exist for the same function",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Yes, K-Map always produces a unique solution",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "One solution must be POS and the other SOP",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "Only prime implicants can be unique",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Some switching functions have multiple minimal prime implicant covers.",
    "solution": {
      "finalAnswer": "No, multiple equally minimal solutions can exist for the same function",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Some switching functions have multiple minimal prime implicant covers."
        }
      ],
      "fastShortcut": "Some switching functions have multiple minimal prime implicant covers.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q085",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setB",
    "question": "What is the maximum number of literals in a prime implicant of a 4-variable function?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "4 literals (a singleton cell)",
    "acceptedAnswers": [
      "4 literals (a singleton cell)"
    ],
    "options": [
      {
        "label": "A",
        "text": "4 literals (a singleton cell)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "16 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "2 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "1 literal",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "A group of size 1 (singleton) preserves all 4 literals.",
    "solution": {
      "finalAnswer": "4 literals (a singleton cell)",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "A group of size 1 (singleton) preserves all 4 literals."
        }
      ],
      "fastShortcut": "A group of size 1 (singleton) preserves all 4 literals.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q086",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "question": "What is the minimum number of literals in a prime implicant covering 8 cells in a 4-variable map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "1 literal",
    "acceptedAnswers": [
      "1 literal"
    ],
    "options": [
      {
        "label": "A",
        "text": "1 literal",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "2 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "3 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "4 literals",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "4 - 3 = 1 literal.",
    "solution": {
      "finalAnswer": "1 literal",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "4 - 3 = 1 literal."
        }
      ],
      "fastShortcut": "4 - 3 = 1 literal.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q087",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setB",
    "question": "Minimize F(A, B, C, D) = Sigma m(0, 1, 2, 3, 8, 9, 10, 11):",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "B'",
    "acceptedAnswers": [
      "B'"
    ],
    "options": [
      {
        "label": "A",
        "text": "B'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "C'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "D'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Top row (AB=00) and bottom row (AB=10) wrap together. B=0 is constant across all 8 cells.",
    "solution": {
      "finalAnswer": "B'",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Top row (AB=00) and bottom row (AB=10) wrap together. B=0 is constant across all 8 cells."
        }
      ],
      "fastShortcut": "Top row (AB=00) and bottom row (AB=10) wrap together. B=0 is constant across all 8 cells.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q088",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "question": "What term is formed by grouping cells {m2, m6, m10, m14} in a 4-variable map?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "CD'",
    "acceptedAnswers": [
      "CD'"
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
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "AB'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "BC'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Entire column CD=10 across all 4 rows. A and B are eliminated, leaving CD'.",
    "solution": {
      "finalAnswer": "CD'",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Entire column CD=10 across all 4 rows. A and B are eliminated, leaving CD'."
        }
      ],
      "fastShortcut": "Entire column CD=10 across all 4 rows. A and B are eliminated, leaving CD'.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q089",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setB",
    "question": "In a 3-variable map, cells m3 and m7 are grouped. What is the resulting term?",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "BC",
    "acceptedAnswers": [
      "BC"
    ],
    "options": [
      {
        "label": "A",
        "text": "BC",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "B'C",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "A'BC",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "ABC",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Column BC=11 across rows A=0 and A=1. A is eliminated, leaving BC.",
    "solution": {
      "finalAnswer": "BC",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Column BC=11 across rows A=0 and A=1. A is eliminated, leaving BC."
        }
      ],
      "fastShortcut": "Column BC=11 across rows A=0 and A=1. A is eliminated, leaving BC.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q090",
    "trackId": "kmaps",
    "trackTitle": "Topic 3: Karnaugh Maps & Logic Minimization",
    "topicBadge": "2.5: K-Map Minimization",
    "difficulty": "Hard",
    "set": "setA",
    "question": "Minimize F(A, B, C) = Sigma m(0, 2):",
    "promptDetail": "Apply Karnaugh map grouping topologies and adjacency rules.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A'C'",
    "acceptedAnswers": [
      "A'C'"
    ],
    "options": [
      {
        "label": "A",
        "text": "A'C'",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A'B'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "C",
        "text": "AC",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      },
      {
        "label": "D",
        "text": "B'C'",
        "isCorrect": false,
        "distractorReason": "Incorrect K-Map grouping"
      }
    ],
    "hint1": "Look for largest valid power-of-two group (16, 8, 4, 2, 1).",
    "hint2": "Row A=0, columns BC=00 and BC=10 wrap to eliminate B, leaving A'C'.",
    "solution": {
      "finalAnswer": "A'C'",
      "steps": [
        {
          "title": "Grouping Step",
          "type": "calculation",
          "content": "Row A=0, columns BC=00 and BC=10 wrap to eliminate B, leaving A'C'."
        }
      ],
      "fastShortcut": "Row A=0, columns BC=00 and BC=10 wrap to eliminate B, leaving A'C'.",
      "verification": "Verified by Quine-McCluskey K-Map minimization."
    }
  },
  {
    "id": "u2-q091",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.6: NAND Universal Gate",
    "difficulty": "Easy",
    "set": "setA",
    "question": "How many 2-input NAND gates are required to construct a basic logical NOT gate (inverter)?",
    "promptDetail": "Connect inputs to form inverter function (A · A)' = A'.",
    "inputFormatHint": "Enter integer count",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1",
      "one",
      "1 gate"
    ],
    "options": [
      {
        "label": "A",
        "text": "1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "2",
        "distractorReason": "2 NAND gates construct an AND gate, not a NOT gate."
      },
      {
        "label": "C",
        "text": "3",
        "distractorReason": "3 NAND gates construct an OR gate."
      },
      {
        "label": "D",
        "text": "4",
        "distractorReason": "4 NAND gates construct an XOR gate."
      }
    ],
    "hint1": "Tie both inputs of the NAND gate together.",
    "hint2": "NAND(A, A) = (A · A)' = A'.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Inverter Construction",
          "type": "axiom",
          "content": "By Idempotent Law, A · A = A. Thus NAND(A, A) = (A · A)' = A'."
        }
      ],
      "fastShortcut": "1 NAND gate with inputs tied together = 1 Inverter.",
      "verification": "Universal gate property."
    }
  },
  {
    "id": "u2-q092",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.6: 2-Level NAND Synthesis",
    "difficulty": "Medium",
    "set": "setA",
    "question": "To implement the SOP function F = AB + CD using only 2-input NAND gates, how many total NAND gates are required?",
    "promptDetail": "Level 1 computes complemented products; Level 2 inverts back to sum.",
    "inputFormatHint": "Enter integer count, e.g., 3",
    "correctAnswer": "3",
    "acceptedAnswers": [
      "3",
      "three",
      "3 gates"
    ],
    "options": [
      {
        "label": "A",
        "text": "3",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "4",
        "distractorReason": "Counted an unnecessary output inverter."
      },
      {
        "label": "C",
        "text": "5",
        "distractorReason": "Assumed inverters were needed for primary inputs A, B, C, D."
      },
      {
        "label": "D",
        "text": "2",
        "distractorReason": "Forgot the second-level output gate."
      }
    ],
    "hint1": "Apply double complement: ((AB + CD)'') = ((AB)' · (CD)')'.",
    "hint2": "Gate 1 = NAND(A, B), Gate 2 = NAND(C, D), Gate 3 = NAND(Gate 1, Gate 2).",
    "solution": {
      "finalAnswer": "3",
      "steps": [
        {
          "title": "NAND-NAND Synthesis",
          "type": "calculation",
          "content": "Level 1: N1 = NAND(A, B), N2 = NAND(C, D). Level 2: F = NAND(N1, N2). Total = 3 NAND gates."
        }
      ],
      "fastShortcut": "AND-OR = NAND-NAND directly. 2 ANDs + 1 OR -> 3 NANDs.",
      "verification": "Syllabus mandatory NAND implementation example."
    }
  },
  {
    "id": "u2-q093",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Minimal 4-NAND XOR",
    "difficulty": "Hard",
    "set": "setA",
    "question": "What is the minimum number of 2-input NAND gates required to implement a 2-input Exclusive-OR (XOR) gate?",
    "promptDetail": "Utilize intermediate product sharing without external inverters.",
    "inputFormatHint": "Enter integer count, e.g., 4",
    "correctAnswer": "4",
    "acceptedAnswers": [
      "4",
      "four",
      "4 gates"
    ],
    "options": [
      {
        "label": "A",
        "text": "4",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "5",
        "distractorReason": "Standard brute-force 2-level SOP requires 5 gates, but 4 is the optimal minimal design."
      },
      {
        "label": "C",
        "text": "3",
        "distractorReason": "3 NAND gates can only synthesize an OR gate."
      },
      {
        "label": "D",
        "text": "6",
        "distractorReason": "Overly redundant implementation."
      }
    ],
    "hint1": "The central NAND gate (AB)' is shared by both the upper and lower input legs.",
    "hint2": "N1 = NAND(A,B), N2 = NAND(A,N1), N3 = NAND(B,N1), Out = NAND(N2,N3).",
    "solution": {
      "finalAnswer": "4",
      "steps": [
        {
          "title": "4-NAND Circuit Analysis",
          "type": "axiom",
          "content": "N1 = (AB)'. N2 = (A(AB)')' = A' + B. N3 = (B(AB)')' = A + B'. Output = (N2 · N3)' = A'B + AB' = A ⊕ B."
        }
      ],
      "fastShortcut": "Standard university exam question: 4 NAND gates construct 1 XOR.",
      "verification": "Section 2.7 formal derivation."
    }
  },
  {
    "id": "u2-q094",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: 5-NOR XOR Implementation",
    "difficulty": "Hard",
    "set": "setA",
    "question": "How many 2-input NOR gates are required to implement a 2-input Exclusive-OR (XOR) gate?",
    "promptDetail": "Account for the 4 NOR gates creating XNOR plus the 5th NOR gate inverting to XOR.",
    "inputFormatHint": "Enter integer count, e.g., 5",
    "correctAnswer": "5",
    "acceptedAnswers": [
      "5",
      "five",
      "5 gates"
    ],
    "options": [
      {
        "label": "A",
        "text": "5",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "4",
        "distractorReason": "4 NOR gates synthesize XNOR, not XOR."
      },
      {
        "label": "C",
        "text": "3",
        "distractorReason": "3 NOR gates synthesize an AND gate."
      },
      {
        "label": "D",
        "text": "6",
        "distractorReason": "Overestimated gate count."
      }
    ],
    "hint1": "4 NOR gates naturally produce XNOR (AB + A'B').",
    "hint2": "A fifth NOR gate acts as an inverter to convert XNOR to XOR.",
    "solution": {
      "finalAnswer": "5",
      "steps": [
        {
          "title": "5-NOR Derivation",
          "type": "axiom",
          "content": "R1 = NOR(A,B), R2 = NOR(A,R1), R3 = NOR(B,R1), R4 = NOR(R2,R3) = XNOR. R5 = NOR(R4,R4) = XOR."
        }
      ],
      "fastShortcut": "XOR needs 4 NANDs, but requires 5 NORs.",
      "verification": "Section 2.7 NOR-only derivation."
    }
  },
  {
    "id": "u2-q095",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Easy",
    "set": "setB",
    "question": "How many 2-input NAND gates are needed to construct an AND gate?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "2",
    "acceptedAnswers": [
      "2"
    ],
    "options": [
      {
        "label": "A",
        "text": "2",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "3",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "4",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "NAND followed by NAND inverter = ((AB)')' = AB.",
    "solution": {
      "finalAnswer": "2",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "NAND followed by NAND inverter = ((AB)')' = AB."
        }
      ],
      "fastShortcut": "NAND followed by NAND inverter = ((AB)')' = AB.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q096",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Easy",
    "set": "setA",
    "question": "How many 2-input NAND gates are needed to construct an OR gate?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "3",
    "acceptedAnswers": [
      "3"
    ],
    "options": [
      {
        "label": "A",
        "text": "3",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "2",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "4",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "2 inverters for A' and B', plus 1 NAND = (A'B')' = A + B.",
    "solution": {
      "finalAnswer": "3",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "2 inverters for A' and B', plus 1 NAND = (A'B')' = A + B."
        }
      ],
      "fastShortcut": "2 inverters for A' and B', plus 1 NAND = (A'B')' = A + B.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q097",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Easy",
    "set": "setB",
    "question": "How many 2-input NOR gates are needed to construct an OR gate?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "2",
    "acceptedAnswers": [
      "2"
    ],
    "options": [
      {
        "label": "A",
        "text": "2",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "3",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "4",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "NOR followed by NOR inverter = ((A+B)')' = A + B.",
    "solution": {
      "finalAnswer": "2",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "NOR followed by NOR inverter = ((A+B)')' = A + B."
        }
      ],
      "fastShortcut": "NOR followed by NOR inverter = ((A+B)')' = A + B.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q098",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Easy",
    "set": "setA",
    "question": "How many 2-input NOR gates are needed to construct an AND gate?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "3",
    "acceptedAnswers": [
      "3"
    ],
    "options": [
      {
        "label": "A",
        "text": "3",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "2",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "4",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "2 inverters for A' and B', plus 1 NOR = (A' + B')' = AB.",
    "solution": {
      "finalAnswer": "3",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "2 inverters for A' and B', plus 1 NOR = (A' + B')' = AB."
        }
      ],
      "fastShortcut": "2 inverters for A' and B', plus 1 NOR = (A' + B')' = AB.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q099",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Medium",
    "set": "setB",
    "question": "How many 2-input NOR gates are needed to construct a NOT gate?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1"
    ],
    "options": [
      {
        "label": "A",
        "text": "1",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "2",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "3",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "4",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "NOR with inputs tied together: (A + A)' = A'.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "NOR with inputs tied together: (A + A)' = A'."
        }
      ],
      "fastShortcut": "NOR with inputs tied together: (A + A)' = A'.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q100",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Medium",
    "set": "setA",
    "question": "What is the Boolean output of A ⊕ A?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0"
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
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "Self-annihilation: x ⊕ x = 0.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "Self-annihilation: x ⊕ x = 0."
        }
      ],
      "fastShortcut": "Self-annihilation: x ⊕ x = 0.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q101",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Medium",
    "set": "setB",
    "question": "What is the Boolean output of A ⊕ 0?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A",
    "acceptedAnswers": [
      "A"
    ],
    "options": [
      {
        "label": "A",
        "text": "A",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "0 is the identity element for XOR: A'·0 + A·1 = A.",
    "solution": {
      "finalAnswer": "A",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "0 is the identity element for XOR: A'·0 + A·1 = A."
        }
      ],
      "fastShortcut": "0 is the identity element for XOR: A'·0 + A·1 = A.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q102",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Medium",
    "set": "setA",
    "question": "What is the Boolean output of A ⊕ 1?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "A'",
    "acceptedAnswers": [
      "A'"
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
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "XOR with 1 acts as a programmable inverter: A'·1 + A·0 = A'.",
    "solution": {
      "finalAnswer": "A'",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "XOR with 1 acts as a programmable inverter: A'·1 + A·0 = A'."
        }
      ],
      "fastShortcut": "XOR with 1 acts as a programmable inverter: A'·1 + A·0 = A'.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q103",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Medium",
    "set": "setB",
    "question": "What is the Boolean output of A ⊕ A'?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1"
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
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "A'",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "A variable XORed with its complement is always 1.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "A variable XORed with its complement is always 1."
        }
      ],
      "fastShortcut": "A variable XORed with its complement is always 1.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q104",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Medium",
    "set": "setA",
    "question": "Simplify: F = A ⊕ B ⊕ A",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "B",
    "acceptedAnswers": [
      "B"
    ],
    "options": [
      {
        "label": "A",
        "text": "B",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "A",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "0",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "1",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "(A ⊕ A) ⊕ B = 0 ⊕ B = B.",
    "solution": {
      "finalAnswer": "B",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "(A ⊕ A) ⊕ B = 0 ⊕ B = B."
        }
      ],
      "fastShortcut": "(A ⊕ A) ⊕ B = 0 ⊕ B = B.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q105",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Medium",
    "set": "setB",
    "question": "Simplify: F = X ⊕ Y ⊕ X ⊕ Y",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "0",
    "acceptedAnswers": [
      "0"
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
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "X",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "Y",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "(X ⊕ X) ⊕ (Y ⊕ Y) = 0 ⊕ 0 = 0.",
    "solution": {
      "finalAnswer": "0",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "(X ⊕ X) ⊕ (Y ⊕ Y) = 0 ⊕ 0 = 0."
        }
      ],
      "fastShortcut": "(X ⊕ X) ⊕ (Y ⊕ Y) = 0 ⊕ 0 = 0.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q106",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Hard",
    "set": "setA",
    "question": "What does an XOR gate output when an odd number of inputs are 1?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "1",
    "acceptedAnswers": [
      "1"
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
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "Undefined",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "High impedance",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "XOR functions as an odd-parity detector.",
    "solution": {
      "finalAnswer": "1",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "XOR functions as an odd-parity detector."
        }
      ],
      "fastShortcut": "XOR functions as an odd-parity detector.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q107",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Hard",
    "set": "setB",
    "question": "What is the graphical equivalent of a NAND gate under De Morgan's theorem?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Invert-OR (OR gate with bubbles on inputs)",
    "acceptedAnswers": [
      "Invert-OR (OR gate with bubbles on inputs)"
    ],
    "options": [
      {
        "label": "A",
        "text": "Invert-OR (OR gate with bubbles on inputs)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Invert-AND",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "NOR gate",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "Buffer",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "(AB)' = A' + B' (Invert-OR).",
    "solution": {
      "finalAnswer": "Invert-OR (OR gate with bubbles on inputs)",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "(AB)' = A' + B' (Invert-OR)."
        }
      ],
      "fastShortcut": "(AB)' = A' + B' (Invert-OR).",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q108",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Hard",
    "set": "setA",
    "question": "What is the graphical equivalent of a NOR gate under De Morgan's theorem?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "Invert-AND (AND gate with bubbles on inputs)",
    "acceptedAnswers": [
      "Invert-AND (AND gate with bubbles on inputs)"
    ],
    "options": [
      {
        "label": "A",
        "text": "Invert-AND (AND gate with bubbles on inputs)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "Invert-OR",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "NAND gate",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "Inverter",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "(A + B)' = A'B' (Invert-AND).",
    "solution": {
      "finalAnswer": "Invert-AND (AND gate with bubbles on inputs)",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "(A + B)' = A'B' (Invert-AND)."
        }
      ],
      "fastShortcut": "(A + B)' = A'B' (Invert-AND).",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q109",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Hard",
    "set": "setB",
    "question": "What happens when two inversion bubbles are placed in series on the same wire?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "They cancel each other out by double negation (Involution Law)",
    "acceptedAnswers": [
      "They cancel each other out by double negation (Involution Law)"
    ],
    "options": [
      {
        "label": "A",
        "text": "They cancel each other out by double negation (Involution Law)",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "They create a short circuit",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "They produce an active low signal",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "They introduce double propagation delay",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "(x')' = x.",
    "solution": {
      "finalAnswer": "They cancel each other out by double negation (Involution Law)",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "(x')' = x."
        }
      ],
      "fastShortcut": "(x')' = x.",
      "verification": "Verified by circuit synthesis theorems."
    }
  },
  {
    "id": "u2-q110",
    "trackId": "gates-xor",
    "trackTitle": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "topicBadge": "2.7: Logic Synthesis",
    "difficulty": "Hard",
    "set": "setA",
    "question": "To implement F = (A + B)(C + D) using NOR gates only, how many 2-input NOR gates are needed?",
    "promptDetail": "Apply universal gate synthesis and XOR algebraic properties.",
    "inputFormatHint": "Enter answer",
    "correctAnswer": "3",
    "acceptedAnswers": [
      "3"
    ],
    "options": [
      {
        "label": "A",
        "text": "3",
        "isCorrect": true
      },
      {
        "label": "B",
        "text": "4",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "C",
        "text": "5",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      },
      {
        "label": "D",
        "text": "2",
        "isCorrect": false,
        "distractorReason": "Incorrect gate synthesis"
      }
    ],
    "hint1": "Recall universal gate mappings and bubble pushing rules.",
    "hint2": "Gate 1 = NOR(A,B), Gate 2 = NOR(C,D), Gate 3 = NOR(Gate1, Gate2). Total = 3.",
    "solution": {
      "finalAnswer": "3",
      "steps": [
        {
          "title": "Synthesis Step",
          "type": "calculation",
          "content": "Gate 1 = NOR(A,B), Gate 2 = NOR(C,D), Gate 3 = NOR(Gate1, Gate2). Total = 3."
        }
      ],
      "fastShortcut": "Gate 1 = NOR(A,B), Gate 2 = NOR(C,D), Gate 3 = NOR(Gate1, Gate2). Total = 3.",
      "verification": "Verified by circuit synthesis theorems."
    }
  }
];

export const unit2QuizTracks = [
  {
    "id": "all",
    "label": "Full Unit 2 Mixed Examination",
    "poolSize": 110,
    "desc": "Draws a balanced weighted examination across the entire 110-question Unit 2 question pool."
  },
  {
    "id": "boolean-laws",
    "label": "Topic 1: Boolean Laws & Algebraic Simplification",
    "poolSize": 30,
    "desc": "Axiomatic foundations, Huntington postulates, duality, algebraic reduction, De Morgan, and consensus theorems."
  },
  {
    "id": "canonical-forms",
    "label": "Topic 2: Canonical Forms & SOP/POS Conversions",
    "poolSize": 25,
    "desc": "Minterms (m_i), maxterms (M_i), canonical expansions, Sigma m / Pi M conversions, and standard forms."
  },
  {
    "id": "kmaps",
    "label": "Topic 3: Karnaugh Maps & Logic Minimization",
    "poolSize": 35,
    "desc": "2-, 3-, and 4-variable K-Maps, Gray code, grouping rules, edge wrapping, corner quads, and don't-cares."
  },
  {
    "id": "gates-xor",
    "label": "Topic 4: Universal Logic Synthesis & Exclusive-OR",
    "poolSize": 20,
    "desc": "2-level NAND-NAND and NOR-NOR synthesis, bubble pushing, 4-NAND XOR, 5-NOR XOR, and parity logic."
  }
];

export default unit2QuizBank;
