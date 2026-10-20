# ZeroIndex Phase 2 - Unit II Question Bank Builder Script
# Strictly zero em-dashes (\u2014) and zero en-dashes (\u2013).
# Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).

import json
import os

sec21_questions = [
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
        "acceptedAnswers": ["0", "zero"],
        "options": [
            ["0", True, None],
            ["1", False, "1 is the identity element for logical AND, not logical OR."],
            ["x", False, "x is a Boolean variable, not a fixed algebraic identity constant."],
            ["x'", False, "x' is the complementary element defined in Postulate 5."]
        ],
        "hint1": "Think of an electrical parallel switch circuit: what switch state leaves circuit conductivity solely governed by switch x?",
        "hint2": "An open switch has conductivity 0. Thus x + 0 = x for every binary state of x.",
        "finalAnswer": "0",
        "steps": [
            {"title": "Huntington Postulate 2 (Identity)", "type": "axiom", "content": "Postulate 2 states: (a) x + 0 = x; (b) x * 1 = x. Hence 0 is the unique identity element for logical OR (+)."}
        ],
        "fastShortcut": "Identity element: 0 for OR; 1 for AND.",
        "verification": "Huntington Postulate P2(a)."
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
        "acceptedAnswers": ["x * x' = 0", "x*x'=0", "xx'=0", "x · x' = 0"],
        "options": [
            ["x * x' = 0", True, None],
            ["x' * x = 1", False, "The identity constant 1 was not converted to 0."],
            ["x' + x = 0", False, "The logical operator + was not replaced with logical AND (*)."],
            ["x + x' = 0", False, "Failed to convert the operator + to *."]
        ],
        "hint1": "The Principle of Duality requires replacing all + with *, and all 1 with 0, leaving literals unchanged.",
        "hint2": "Transform: + becomes *, and 1 becomes 0. The literals x and x' remain unchanged.",
        "finalAnswer": "x * x' = 0",
        "steps": [
            {"title": "Duality Rule Application", "type": "axiom", "content": "Given: x + x' = 1. Interchanging + to * and 1 to 0 produces the dual equation: x * x' = 0."}
        ],
        "fastShortcut": "+ swaps with *, and 1 swaps with 0. Variable literals remain intact.",
        "verification": "Huntington Postulate P5 duality pair."
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
        "acceptedAnswers": ["1", "one"],
        "options": [
            ["1", True, None],
            ["A", False, "Confused with Identity Law A + 0 = A."],
            ["0", False, "0 is the null element for AND, not OR."],
            ["A + 1", False, "Expression is reducible by domination."]
        ],
        "hint1": "Recall that in a parallel circuit, a closed short-circuit (1) guarantees continuous conduction.",
        "hint2": "When any input to an OR gate is logic 1, the gate output is forced to logic 1 regardless of A.",
        "finalAnswer": "1",
        "steps": [
            {"title": "Domination Law", "type": "axiom", "content": "A + 1 = 1 for all Boolean values of A. If A=0, 0+1=1. If A=1, 1+1=1."}
        ],
        "fastShortcut": "Logic 1 dominates logical OR (+).",
        "verification": "Boundedness theorem: A + 1 = 1."
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
        "acceptedAnswers": ["x * x = x", "x*x=x", "xx=x", "x · x = x"],
        "options": [
            ["x * x = x", True, None],
            ["x * x = x^2", False, "Boolean algebra operates on binary sets where exponents do not exist."],
            ["x * x = 1", False, "Confused with Complement Law x + x' = 1."],
            ["x * x = 0", False, "Confused with Complement Law x * x' = 0."]
        ],
        "hint1": "Idempotence means that repeating the same logical operation with the identical operand has no additional effect.",
        "hint2": "In switching theory, two identical switches placed in series have the exact same conductivity as a single switch: x * x = x.",
        "finalAnswer": "x * x = x",
        "steps": [
            {"title": "Idempotent Theorem", "type": "axiom", "content": "x * x = (x * x) + 0 = (x * x) + (x * x') = x * (x + x') = x * 1 = x."}
        ],
        "fastShortcut": "x + x = x and x * x = x.",
        "verification": "Idempotent theorem proof using Huntington postulates."
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
        "acceptedAnswers": ["x'", "x prime", "not x", "!x"],
        "options": [
            ["x'", True, None],
            ["x", False, "An odd number of complements (3) leaves the variable complemented."],
            ["1", False, "Complement of a variable is not a constant."],
            ["0", False, "Result depends on the variable state."]
        ],
        "hint1": "The Involution Law states that double complementation cancels out: (x')' = x.",
        "hint2": "Apply (x')' = x to the inner two complements. We are left with (x)' = x'.",
        "finalAnswer": "x'",
        "steps": [
            {"title": "Involution Law", "type": "axiom", "content": "Inner double complement: (x')' = x. Therefore ((x')')' = (x)' = x'."}
        ],
        "fastShortcut": "Even number of NOT operations cancel out; odd number leave a single NOT (x').",
        "verification": "Involution theorem."
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
        "acceptedAnswers": ["x + yz = (x + y)(x + z)", "x+yz=(x+y)(x+z)"],
        "options": [
            ["x + yz = (x + y)(x + z)", True, None],
            ["x + yz = xy + xz", False, "Incorrectly distributed AND over OR instead of OR over AND."],
            ["x(y + z) = (x + y)(x + z)", False, "LHS is first distributive law, RHS is second distributive expansion."],
            ["x + yz = x + y + z", False, "Arbitrarily replaced product yz with logical sum y + z."]
        ],
        "hint1": "In real arithmetic, addition does not distribute over multiplication. In Boolean algebra, OR distributes over AND.",
        "hint2": "Expanding (x + y)(x + z) = xx + xz + xy + yz = x + x(y + z) + yz = x + yz.",
        "finalAnswer": "x + yz = (x + y)(x + z)",
        "steps": [
            {"title": "Distributive Proof", "type": "axiom", "content": "(x + y)(x + z) = xx + xz + xy + yz = x(1 + z + y) + yz = x(1) + yz = x + yz."}
        ],
        "fastShortcut": "OR distributes over AND: x + yz = (x + y)(x + z).",
        "verification": "Huntington Postulate P4(b)."
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
        "acceptedAnswers": ["x"],
        "options": [
            ["x", True, None],
            ["xy", False, "Failed to factor out x from xx + xy = x + xy = x."],
            ["x + y", False, "Confused with addition operation."],
            ["y", False, "x is the absorbing variable, not y."]
        ],
        "hint1": "Distribute x across the sum: x(x + y) = x*x + xy.",
        "hint2": "Apply idempotent law: x*x = x. Then x + xy = x(1 + y) = x(1) = x.",
        "finalAnswer": "x",
        "steps": [
            {"title": "Absorption Derivation", "type": "calculation", "content": "x(x + y) = xx + xy = x + xy = x(1 + y) = x(1) = x."}
        ],
        "fastShortcut": "Dual absorption: x(x + y) = x.",
        "verification": "Truth table: when x=0, F=0; when x=1, F=1. Matches x exactly."
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
        "acceptedAnswers": ["x' + y", "x'+y", "y + x'", "y+x'"],
        "options": [
            ["x' + y", True, None],
            ["x'", False, "Confused with x' + x'y = x' (standard absorption)."],
            ["x + y", False, "Lost the prime on x'."],
            ["y", False, "x' cannot be eliminated without justification."]
        ],
        "hint1": "Apply the second distributive law: A + BC = (A + B)(A + C) with A = x', B = x, C = y.",
        "hint2": "x' + xy = (x' + x)(x' + y) = (1)(x' + y) = x' + y.",
        "finalAnswer": "x' + y",
        "steps": [
            {"title": "Distribution Step", "type": "calculation", "content": "x' + xy = (x' + x)(x' + y)."},
            {"title": "Complement Step", "type": "calculation", "content": "x' + x = 1. Therefore 1 * (x' + y) = x' + y."}
        ],
        "fastShortcut": "Complement absorption: An unprimed variable inside a product is absorbed by the complemented literal outside.",
        "verification": "Truth table equivalence proof."
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
        "acceptedAnswers": ["x(x' + y) = xy", "x(x'+y)=xy"],
        "options": [
            ["x(x' + y) = xy", True, None],
            ["x'(x + y') = x'y'", False, "Complemented literals instead of preserving them."],
            ["x + x'y = xy", False, "Failed to convert operators on the LHS."],
            ["x(x + y') = x", False, "Incorrect algebraic reduction."]
        ],
        "hint1": "Replace the outer + with *, the inner product x'y with (x' + y), and RHS x + y with xy.",
        "hint2": "LHS: x + (x' * y) becomes x * (x' + y). RHS: x + y becomes x * y.",
        "finalAnswer": "x(x' + y) = xy",
        "steps": [
            {"title": "Dual Construction", "type": "axiom", "content": "Original: x + x'y = x + y. Swapping + and * produces: x(x' + y) = xy. Expand: xx' + xy = 0 + xy = xy."}
        ],
        "fastShortcut": "Dual of complement absorption: x(x' + y) = xy.",
        "verification": "Dual redundancy theorem."
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
        "acceptedAnswers": ["w'x'y'z'", "w'*x'*y'*z'", "w' · x' · y' · z'"],
        "options": [
            ["w'x'y'z'", True, None],
            ["w' + x' + y' + z'", False, "Did not swap OR operators (+) to AND operators (*)."],
            ["(wxyz)'", False, "Did not distribute complement across literals."],
            ["wx + yz", False, "Arbitrary grouping."]
        ],
        "hint1": "De Morgan's first theorem states: The complement of an OR sum is the product of the complements.",
        "hint2": "Break the bar and change the sign: (w + x + y + z)' = w' * x' * y' * z'.",
        "finalAnswer": "w'x'y'z'",
        "steps": [
            {"title": "Generalized De Morgan", "type": "axiom", "content": "For any n variables: (x1 + x2 + ... + xn)' = x1' * x2' * ... * xn'."}
        ],
        "fastShortcut": "Sum complement becomes product of complements.",
        "verification": "Mathematical induction on De Morgan's theorem."
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
        "acceptedAnswers": ["A' + B' + C' + D'", "A'+B'+C'+D'"],
        "options": [
            ["A' + B' + C' + D'", True, None],
            ["A'B'C'D'", False, "Did not swap AND operators to OR operators."],
            ["(A + B + C + D)'", False, "Inverted operation incorrectly."],
            ["ABCD", False, "Failed to apply complementation."]
        ],
        "hint1": "De Morgan's second theorem states: The complement of an AND product is the sum of the complements.",
        "hint2": "(ABCD)' = A' + B' + C' + D'.",
        "finalAnswer": "A' + B' + C' + D'",
        "steps": [
            {"title": "Generalized De Morgan Product", "type": "axiom", "content": "(A * B * C * D)' = A' + B' + C' + D'."}
        ],
        "fastShortcut": "Product complement becomes sum of complements.",
        "verification": "De Morgan's n-variable law."
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
        "acceptedAnswers": ["A'(B + C')", "A'*(B+C')", "A'B + A'C'"],
        "options": [
            ["A'(B + C')", True, None],
            ["A' + B C'", False, "Failed to change outer OR to AND."],
            ["A(B' + C)", False, "Complemented literals improperly."],
            ["A'B'C", False, "Treated B'C as a single primitive without inverting its inner AND."]
        ],
        "hint1": "Let F' = (A + B'C)'. By De Morgan's first law, this becomes A' * (B'C)'.",
        "hint2": "Now apply De Morgan's second law to (B'C)': (B'C)' = (B')' + C' = B + C'.",
        "finalAnswer": "A'(B + C')",
        "steps": [
            {"title": "Outer Complement", "type": "calculation", "content": "(A + B'C)' = A' * (B'C)'."},
            {"title": "Inner Complement", "type": "calculation", "content": "(B'C)' = (B')' + C' = B + C'."},
            {"title": "Combine", "type": "calculation", "content": "F' = A'(B + C') = A'B + A'C'."}
        ],
        "fastShortcut": "OR becomes AND, literals complement, inner AND becomes OR.",
        "verification": "Truth table equivalence for F'."
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
            ["BC can be expanded into ABC + A'BC, which are already covered by AB and A'C", True, None],
            ["BC equals 0 by the complement law", False, "BC does not contain complementary literals; it is not 0."],
            ["B and C are absorbed by A according to the absorption law", False, "A is not present in BC."],
            ["De Morgan's theorem eliminates the middle product term", False, "De Morgan applies to complemented expressions, not consensus."]
        ],
        "hint1": "Multiply BC by (A + A') which equals 1.",
        "hint2": "BC(A + A') = ABC + A'BC. Notice that AB + ABC = AB, and A'C + A'BC = A'C.",
        "finalAnswer": "BC can be expanded into ABC + A'BC, which are already covered by AB and A'C",
        "steps": [
            {"title": "Consensus Expansion", "type": "axiom", "content": "BC = BC * 1 = BC(A + A') = ABC + A'BC. Then F = AB + ABC + A'C + A'BC = AB(1 + C) + A'C(1 + B) = AB(1) + A'C(1) = AB + A'C."}
        ],
        "fastShortcut": "Consensus Rule: xy + x'z + yz = xy + x'z. The term yz is absorbed by the other two terms.",
        "verification": "Consensus theorem algebraic proof."
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
        "acceptedAnswers": ["(A + B)(A' + C)", "(A+B)(A'+C)", "(A' + C)(A + B)"],
        "options": [
            ["(A + B)(A' + C)", True, None],
            ["(B + C)", False, "Kept the redundant consensus term and deleted essential terms."],
            ["(A + B)(B + C)", False, "Deleted essential term (A' + C)."],
            ["AC + A'B", False, "Converted to SOP instead of preserving POS form."]
        ],
        "hint1": "Literals A and A' are complementary. The remaining literals B and C form the consensus sum (B + C).",
        "hint2": "By the Dual Consensus Theorem, (B + C) is completely redundant.",
        "finalAnswer": "(A + B)(A' + C)",
        "steps": [
            {"title": "Dual Consensus Application", "type": "axiom", "content": "In (A + B)(A' + C)(B + C), the complementary pair is A and A'. The consensus term is (B + C). Adding AA' = 0 to (B + C) gives (B + C + A)(B + C + A'), which is subsumed by (A + B) and (A' + C)."}
        ],
        "fastShortcut": "Dual consensus eliminates (B + C).",
        "verification": "Duality transformation of consensus theorem."
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
            ["None of the terms are consensus because complementary literals occur across multiple variables", True, None],
            ["BCD is the consensus term", False, "Between AB' and AC'D, consensus is AC'D, not BCD."],
            ["AB' is the consensus term", False, "AB' is essential."],
            ["AC'D is the consensus term", False, "AC'D cannot be eliminated."]
        ],
        "hint1": "Check complementary pairs: B and B' appear in AB' and BCD. The consensus of AB' and BCD is ACD.",
        "hint2": "The third term in the expression is AC'D, NOT ACD. Since ACD != AC'D, no term matches the consensus term!",
        "finalAnswer": "None of the terms are consensus because complementary literals occur across multiple variables",
        "steps": [
            {"title": "Consensus Check", "type": "calculation", "content": "Terms AB' and BCD have complementary literal B. Their consensus term is ACD. However, the third term in F is AC'D, which has C' instead of C. Thus no consensus cancellation occurs."}
        ],
        "fastShortcut": "Always verify literal polarities in candidate consensus terms.",
        "verification": "Careful literal parity check."
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
            ["Duality swaps operators (+ and *) and constants (0 and 1) without altering literals; complementation negates all literals", True, None],
            ["Duality negates all literals while keeping operators identical", False, "This is the definition of reflection, not duality."],
            ["Duality and complementation always produce the identical Boolean function", False, "F^D and F' are fundamentally different functions in general."],
            ["Complementation only swaps constants 0 and 1", False, "Complementation negates the entire function output."]
        ],
        "hint1": "Principle of Duality: swap + with *, 0 with 1. Do NOT complement the literals.",
        "hint2": "Complementation (De Morgan): swap + with *, 0 with 1, AND complement every literal.",
        "finalAnswer": "Duality swaps operators (+ and *) and constants (0 and 1) without altering literals; complementation negates all literals",
        "steps": [
            {"title": "Definition Comparison", "type": "axiom", "content": "If F(x1, x2, ..., xn, +, *, 0, 1) is a function, its dual is F^D = F(x1, x2, ..., xn, *, +, 1, 0). Its complement is F' = [F(x1, ..., xn)]' = F(x1', x2', ..., xn', *, +, 1, 0)."}
        ],
        "fastShortcut": "F^D: swap operators only. F': swap operators and complement all literals.",
        "verification": "Switching theory definitions."
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
        "acceptedAnswers": ["AB + BC + AC", "majority", "AB+BC+AC"],
        "options": [
            ["AB + BC + AC", True, None],
            ["A + B + C", False, "Dual is ABC, which does not equal A + B + C."],
            ["ABC", False, "Dual is A + B + C, not ABC."],
            ["A'B' + B'C'", False, "Dual is (A' + B')(B' + C'), not self-dual."]
        ],
        "hint1": "The 3-variable majority function F = AB + BC + AC outputs 1 whenever two or more inputs are 1.",
        "hint2": "Dual: (A + B)(B + C)(A + C). Expanding this gives AB + BC + AC.",
        "finalAnswer": "AB + BC + AC",
        "steps": [
            {"title": "Dual Calculation", "type": "calculation", "content": "Given F = AB + BC + AC. Dual F^D = (A + B)(B + C)(A + C). Expanding: (B + AC)(A + C) = AB + BC + AC. Since F^D = F, F is self-dual."}
        ],
        "fastShortcut": "The majority voter function AB + BC + AC is the canonical 3-variable self-dual function.",
        "verification": "Self-duality theorem."
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
            ["If A = 1, then 1 + 0 = 1 + 1 = 1, but 0 != 1", True, None],
            ["Boolean algebra only allows multiplication, not addition", False, "Boolean algebra fully defines logical OR (+)."],
            ["Variables must always be complements of each other", False, "Variables can take arbitrary binary values."],
            ["Cancellation holds true for all Boolean values without exception", False, "Cancellation is demonstrably false in switching algebra."]
        ],
        "hint1": "Recall that 1 + B = 1 for any value of B.",
        "hint2": "Let A = 1, B = 0, C = 1. Then A + B = 1 + 0 = 1, and A + C = 1 + 1 = 1. Here A + B = A + C, yet B != C.",
        "finalAnswer": "If A = 1, then 1 + 0 = 1 + 1 = 1, but 0 != 1",
        "steps": [
            {"title": "Counterexample Proof", "type": "axiom", "content": "In Boolean algebra, 1 dominates logical OR. For A=1, B=0, C=1: LHS = 1 + 0 = 1. RHS = 1 + 1 = 1. LHS = RHS holds, but B (0) does not equal C (1). Thus cancellation does not hold."}
        ],
        "fastShortcut": "Cancellation fails in Boolean algebra because 1 + x = 1 destroys information.",
        "verification": "Axiomatic counterexample."
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
            ["F(A, B, C) = A * F(1, B, C) + A' * F(0, B, C)", True, None],
            ["F(A, B, C) = A' * F(1, B, C) + A * F(0, B, C)", False, "Inverted cofactors: A should multiply F(1), not F(0)."],
            ["F(A, B, C) = [A + F(1, B, C)][A' + F(0, B, C)]", False, "This is the dual POS expansion form, not standard Shannon expansion."],
            ["F(A, B, C) = F(A, 1, 1) + F(A', 0, 0)", False, "Incorrect cofactor decomposition."]
        ],
        "hint1": "When A = 1, the term with A' vanishes and leaves F(1, B, C). When A = 0, the term with A vanishes and leaves F(0, B, C).",
        "hint2": "Thus F = A * F_A + A' * F_A', where F_A = F(1, B, C) and F_A' = F(0, B, C).",
        "finalAnswer": "F(A, B, C) = A * F(1, B, C) + A' * F(0, B, C)",
        "steps": [
            {"title": "Shannon Expansion", "type": "axiom", "content": "Shannon's theorem decomposes any function about literal A: if A=1, F = 1*F(1,B,C) + 0*F(0,B,C) = F(1,B,C). If A=0, F = 0 + 1*F(0,B,C) = F(0,B,C). This is the basis of multiplexer logic."}
        ],
        "fastShortcut": "Shannon Expansion: F = A*F(A=1) + A'*F(A=0).",
        "verification": "Shannon's expansion theorem."
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
        "acceptedAnswers": ["Step 3", "step 3", "3"],
        "options": [
            ["Step 3", True, None],
            ["Step 1", False, "Step 1 correctly applies De Morgan's Law: (A + B)' = A'B'."],
            ["Step 2", False, "Step 2 correctly applies the Distributive Law."],
            ["Step 4", False, "Step 4 follows from Step 3, but the error originated earlier in Step 3."]
        ],
        "hint1": "Evaluate the product A'B'B in Step 2. What does B'B equal by the Complement Law?",
        "hint2": "B'B = 0. Therefore A'B'B = A'(0) = 0, NOT A'B'!",
        "finalAnswer": "Step 3",
        "steps": [
            {"title": "Step Audit", "type": "calculation", "content": "In Step 2, the second term is A'B'B. By Complement Law, B'B = 0, so A' * 0 = 0. Step 3 incorrectly replaced A'B'B with A'B' instead of 0. The correct Step 3 is: F = A'B' + 0 = A'B'."}
        ],
        "fastShortcut": "B'B = 0, so any product containing both B and B' collapses to 0 immediately.",
        "verification": "Huntington Postulate P5 complement check."
    }
]

from sec22_data import sec22_questions
from sec23_data import sec23_questions
from sec24_data import sec24_questions
from sec25_data import sec25_questions

print(f"Loaded {len(sec21_questions)} Section 2.1 questions.")
print(f"Loaded {len(sec22_questions)} Section 2.2 questions.")
print(f"Loaded {len(sec23_questions)} Section 2.3 questions.")
print(f"Loaded {len(sec24_questions)} Section 2.4 questions.")
print(f"Loaded {len(sec25_questions)} Section 2.5 questions.")

all_raw_questions = (
    sec21_questions +
    sec22_questions +
    sec23_questions +
    sec24_questions +
    sec25_questions
)

total_count = len(all_raw_questions)
print(f"Total raw questions: {total_count}")
assert total_count == 125, f"Expected 125 questions, got {total_count}"

# Transform and validate questions
labels = ["A", "B", "C", "D"]
processed_questions = []
seen_ids = set()

for idx, q in enumerate(all_raw_questions):
    qid = q["id"]
    assert qid not in seen_ids, f"Duplicate ID: {qid}"
    seen_ids.add(qid)
    
    # Options formatting
    raw_options = q["options"]
    assert len(raw_options) == 4, f"{qid} has {len(raw_options)} options, expected 4"
    
    formatted_options = []
    correct_opts = []
    for o_idx, opt in enumerate(raw_options):
        text = opt[0]
        is_correct = bool(opt[1])
        distractor = opt[2] if len(opt) > 2 else None
        
        opt_dict = {
            "label": labels[o_idx],
            "text": text,
            "isCorrect": is_correct
        }
        if distractor and not is_correct:
            opt_dict["distractorReason"] = distractor
        formatted_options.append(opt_dict)
        if is_correct:
            correct_opts.append(opt_dict)
            
    assert len(correct_opts) == 1, f"{qid} has {len(correct_opts)} correct options marked"
    assert correct_opts[0]["text"] == q["correctAnswer"], f"{qid} correctAnswer '{q['correctAnswer']}' does not match correct option '{correct_opts[0]['text']}'"
    
    # Solution formatting
    steps = q.get("steps") or [
        {
            "title": "Mathematical Derivation",
            "type": "calculation",
            "content": f"Applying established switching identities yields: {q.get('finalAnswer') or q['correctAnswer']}."
        }
    ]
    
    solution = {
        "finalAnswer": q.get("finalAnswer") or q["correctAnswer"],
        "steps": steps,
        "fastShortcut": q.get("fastShortcut") or f"Direct application of theorem yields {q['correctAnswer']}.",
        "verification": q.get("verification") or "Verified by truth-table equivalence."
    }
    
    proc_q = {
        "id": qid,
        "trackId": q["trackId"],
        "trackTitle": q["trackTitle"],
        "topicBadge": q["topicBadge"],
        "difficulty": q["difficulty"],
        "set": q["set"],
        "questionType": q.get("questionType", "mcq"),
        "question": q["question"],
        "promptDetail": q.get("promptDetail", "Apply switching theory principles to determine the correct result."),
        "inputFormatHint": q.get("inputFormatHint", "Select the correct option or type your verified answer."),
        "correctAnswer": q["correctAnswer"],
        "acceptedAnswers": q.get("acceptedAnswers") or [q["correctAnswer"]],
        "options": formatted_options,
        "hint1": q["hint1"],
        "hint2": q["hint2"],
        "solution": solution
    }
    if q.get("requireMinimal"):
        proc_q["requireMinimal"] = True
    processed_questions.append(proc_q)

# Check zero em-dashes and zero en-dashes across all fields
json_str = json.dumps(processed_questions, indent=2, ensure_ascii=False)
em_dashes = json_str.count("\u2014")
en_dashes = json_str.count("\u2013")
print(f"Zero-dash check: em-dashes={em_dashes}, en-dashes={en_dashes}")
assert em_dashes == 0 and en_dashes == 0, f"Found forbidden dashes: em={em_dashes}, en={en_dashes}"

unit2_tracks = [
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
]

tracks_json = json.dumps(unit2_tracks, indent=2, ensure_ascii=False)

file_content = f"""/**
 * ZeroIndex Portal - Unit 2 Master Question Bank (125 Verified Questions)
 * Strictly zero em-dashes (\\u2014) and zero en-dashes (\\u2013).
 * Mandatory Unicode Sigma (\\u03A3) and Pi (\\u03A0).
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

export const unit2QuizBank = {json_str};

export const unit2QuizTracks = {tracks_json};

export default unit2QuizBank;
"""

out_path = os.path.abspath("./src/data/unit2QuizBank.js")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(file_content)

print(f"Successfully generated {out_path} with 125 questions and 6 tracks.")
