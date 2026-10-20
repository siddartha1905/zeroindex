# Section 2.2 Question Bank Data (u2-q021 to u2-q045) - 25 Questions
# Strictly zero em-dashes and zero en-dashes.

sec22_questions = [
    {
        "id": "u2-q021",
        "trackId": "sec22",
        "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
        "topicBadge": "2.2: Dual Combining",
        "difficulty": "Easy",
        "set": "setA",
        "questionType": "free_response",
        "requireMinimal": True,
        "question": "Simplify the Boolean product-of-sums expression: F = (X + Y)(X + Y').",
        "promptDetail": "Apply the dual combining identity to eliminate the complementary variable Y.",
        "inputFormatHint": "Enter simplified literal, e.g. X",
        "correctAnswer": "X",
        "acceptedAnswers": ["X", "x"],
        "options": [
            ["X", True, None],
            ["Y", False, "Y and Y' are complementary and cancel each other out."],
            ["X + Y", False, "Failed to combine the terms."],
            ["XY", False, "Incorrectly transformed sum terms into a product term."]
        ],
        "hint1": "Apply the second distributive law in reverse: (X + Y)(X + Y') = X + YY'.",
        "hint2": "Recall that YY' = 0 by the complement law. Thus X + 0 = X.",
        "finalAnswer": "X",
        "steps": [
            {"title": "Factoring Step", "type": "calculation", "content": "(X + Y)(X + Y') = X + (Y * Y')."},
            {"title": "Complement Step", "type": "calculation", "content": "Y * Y' = 0. Therefore X + 0 = X."}
        ],
        "fastShortcut": "Dual combining: (X + Y)(X + Y') = X.",
        "verification": "Truth table: when X=1, (1+Y)(1+Y')=1*1=1. When X=0, (0+Y)(0+Y')=Y*Y'=0. Matches X."
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
        "acceptedAnswers": ["X + Y + Z", "X+Y+Z", "x + y + z", "x+y+z"],
        "options": [
            ["X + Y + Z", True, None],
            ["X + Y", False, "Omitted the third variable Z."],
            ["XYZ", False, "Transformed OR sum into AND product incorrectly."],
            ["X + X'Y'Z", False, "Incomplete simplification of the middle term."]
        ],
        "hint1": "First simplify X + X'Y using the absorption law: X + X'Y = X + Y.",
        "hint2": "Now combine (X + Y) with X'Y'Z: by De Morgan, X'Y' = (X + Y)'. Let U = X + Y. Then U + U'Z = U + Z = X + Y + Z.",
        "finalAnswer": "X + Y + Z",
        "steps": [
            {"title": "Step 1: First Pair Reduction", "type": "calculation", "content": "X + X'Y = X + Y (complement absorption)."},
            {"title": "Step 2: Second Pair Reduction", "type": "calculation", "content": "(X + Y) + (X + Y)'Z = (X + Y) + Z = X + Y + Z."}
        ],
        "fastShortcut": "Successive complement absorption: X + X'Y + X'Y'Z = X + Y + Z.",
        "verification": "Truth table check on 8 input combinations."
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
        "acceptedAnswers": ["AB' + AC'", "AB'+AC'", "AC' + AB'", "AC'+AB'"],
        "options": [
            ["AB' + AC'", True, None],
            ["A + B' + C'", False, "Failed to distribute literal A."],
            ["AB'C'", False, "Merged sum terms into a single product."],
            ["0", False, "AA' is 0, but AB' and AC' remain active."]
        ],
        "hint1": "Distribute A: A*A' + A*B' + A*C'.",
        "hint2": "AA' = 0. Therefore 0 + AB' + AC' = AB' + AC'.",
        "finalAnswer": "AB' + AC'",
        "steps": [
            {"title": "Distribution", "type": "calculation", "content": "A(A' + B' + C') = AA' + AB' + AC'."},
            {"title": "Null Elimination", "type": "calculation", "content": "AA' = 0. Result is AB' + AC'."}
        ],
        "fastShortcut": "AA' drops out, leaving A distributed over remaining terms: AB' + AC'.",
        "verification": "Truth table evaluation."
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
        "acceptedAnswers": ["A'", "a'", "not A"],
        "options": [
            ["A'", True, None],
            ["A", False, "Complementation was inverted incorrectly."],
            ["B", False, "B and B' combine to 0 under AND."],
            ["A' + B", False, "Expression was not reduced."]
        ],
        "hint1": "Use the second distributive law in reverse: (A' + B)(A' + B') = A' + BB'.",
        "hint2": "BB' = 0 by the complement law. A' + 0 = A'.",
        "finalAnswer": "A'",
        "steps": [
            {"title": "Factoring", "type": "calculation", "content": "(A' + B)(A' + B') = A' + BB'."},
            {"title": "Complement Reduction", "type": "calculation", "content": "BB' = 0. A' + 0 = A'."}
        ],
        "fastShortcut": "Dual combining: (A' + B)(A' + B') = A'.",
        "verification": "Truth table equivalence."
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
        "acceptedAnswers": ["AB'", "ab'", "A*B'"],
        "options": [
            ["AB'", True, None],
            ["ABC", False, "Arbitrarily changed complement polarity."],
            ["AB' + C", False, "Confused product absorption with literal elimination."],
            ["C", False, "C is absorbed, not the primary term."]
        ],
        "hint1": "Factor out the common term AB': AB'(1 + C).",
        "hint2": "1 + C = 1 by the domination law. AB'(1) = AB'.",
        "finalAnswer": "AB'",
        "steps": [
            {"title": "Factoring", "type": "calculation", "content": "AB' + AB'C = AB'(1 + C)."},
            {"title": "Domination", "type": "calculation", "content": "1 + C = 1. AB'(1) = AB'."}
        ],
        "fastShortcut": "AB' absorbs any product containing AB': AB' + AB'C = AB'.",
        "verification": "Absorption law definition."
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
        "acceptedAnswers": ["Y'", "y'", "not Y"],
        "options": [
            ["Y'", True, None],
            ["Y", False, "Lost the complement prime."],
            ["X", False, "X and X' are complementary."],
            ["X'Y'", False, "Changed POS operation into product."]
        ],
        "hint1": "Commutative property: (Y' + X)(Y' + X').",
        "hint2": "(Y' + X)(Y' + X') = Y' + XX' = Y' + 0 = Y'.",
        "finalAnswer": "Y'",
        "steps": [
            {"title": "Rearrangement", "type": "calculation", "content": "(Y' + X)(Y' + X') = Y' + XX'."},
            {"title": "Complement Reduction", "type": "calculation", "content": "XX' = 0. Y' + 0 = Y'."}
        ],
        "fastShortcut": "(X + Y')(X' + Y') = Y'.",
        "verification": "Dual combining identity."
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
        "acceptedAnswers": ["AB' + B'C", "B'C + AB'", "AB'+B'C", "B'C+AB'"],
        "options": [
            ["AB' + B'C", True, None],
            ["B'C", False, "Omitted coverage of minterm AB'C'."],
            ["AB'", False, "Omitted coverage of minterm A'B'C."],
            ["A + B' + C", False, "Incorrectly collapsed product terms into single literals."]
        ],
        "hint1": "Observe that AB'C can combine with both A'B'C and AB'C' using the idempotent law (P + P = P).",
        "hint2": "Pair 1: (AB'C + A'B'C) = B'C(A + A') = B'C. Pair 2: (AB'C + AB'C') = AB'(C + C') = AB'.",
        "finalAnswer": "AB' + B'C",
        "steps": [
            {"title": "Duplicate Shared Minterm", "type": "calculation", "content": "F = (AB'C + A'B'C) + (AB'C + AB'C')."},
            {"title": "Combine Pairs", "type": "calculation", "content": "B'C(A + A') + AB'(C + C') = B'C(1) + AB'(1) = B'C + AB'."}
        ],
        "fastShortcut": "Sharing minterm AB'C gives B'C + AB'.",
        "verification": "Truth table: minterms are m4, m5, m1 -> cover is AB' (m4, m5) + B'C (m1, m5)."
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
        "acceptedAnswers": ["(A + C')(A' + B')", "(A+C')(A'+B')", "(A' + B')(A + C')"],
        "options": [
            ["(A + C')(A' + B')", True, None],
            ["(B' + C')", False, "Kept the redundant consensus term and eliminated essential terms."],
            ["(A + C')(B' + C')", False, "Eliminated essential term (A' + B')."],
            ["AB + A'C", False, "Converted to SOP incorrectly."]
        ],
        "hint1": "Terms (A + C') and (A' + B') contain complementary literals A and A'.",
        "hint2": "Their dual consensus term is (B' + C'). Since (B' + C') is present, it is completely redundant.",
        "finalAnswer": "(A + C')(A' + B')",
        "steps": [
            {"title": "Consensus Identification", "type": "axiom", "content": "In (A + C')(A' + B')(B' + C'), A and A' are complementary. The consensus sum is (C' + B') = (B' + C'). By the Dual Consensus Theorem, this term is eliminated."}
        ],
        "fastShortcut": "Dual consensus eliminates (B' + C').",
        "verification": "Duality theorem proof."
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
        "acceptedAnswers": ["A'B + AC'", "AC' + A'B", "A'B+AC'", "AC'+A'B"],
        "options": [
            ["A'B + AC'", True, None],
            ["A'B + C'", False, "Over-simplified: C' requires literal A."],
            ["B + AC'", False, "Lost complement on A'."],
            ["ABC' + A'B", False, "Incomplete reduction."]
        ],
        "hint1": "Notice the second and third terms: ABC' + AB'C' = AC'(B + B').",
        "hint2": "B + B' = 1, so the expression becomes A'B + AC'.",
        "finalAnswer": "A'B + AC'",
        "steps": [
            {"title": "Factor Terms 2 and 3", "type": "calculation", "content": "ABC' + AB'C' = AC'(B + B') = AC'(1) = AC'."},
            {"title": "Combine with Term 1", "type": "calculation", "content": "F = A'B + AC'."}
        ],
        "fastShortcut": "Combining ABC' + AB'C' produces AC', yielding A'B + AC'.",
        "verification": "Truth table: minterms are m2, m3, m4, m6 -> A'B covers {m2,m3}, AC' covers {m4,m6}."
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
        "acceptedAnswers": ["(A + B')(A' + C')", "(A+B')(A'+C')", "(A' + C')(A + B')"],
        "options": [
            ["(A + B')(A' + C')", True, None],
            ["(B' + C')", False, "Kept only the redundant consensus term."],
            ["(A + B')(B' + C')", False, "Eliminated essential term (A' + C')."],
            ["A'B' + AC'", False, "Converted to SOP incorrectly."]
        ],
        "hint1": "Check complementary pair: A and A'.",
        "hint2": "Consensus sum: (B' + C'). This term is redundant and deleted.",
        "finalAnswer": "(A + B')(A' + C')",
        "steps": [
            {"title": "Dual Consensus", "type": "axiom", "content": "A and A' are complementary. The remaining literals B' and C' form the consensus term (B' + C'), which is redundant."}
        ],
        "fastShortcut": "Dual consensus eliminates (B' + C').",
        "verification": "Dual consensus theorem."
    },
    {
        "id": "u2-q031",
        "trackId": "sec22",
        "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
        "topicBadge": "2.2: Multiplying Out and Consensus",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "free_response",
        "requireMinimal": True,
        "question": "Simplify to minimal SOP: F = (A + B)(A + C)(B' + C).",
        "promptDetail": "Combine first two factors into sum form, then distribute and eliminate redundant terms.",
        "inputFormatHint": "Enter minimal SOP, e.g. AB' + BC",
        "correctAnswer": "AB' + BC",
        "acceptedAnswers": ["AB' + BC", "BC + AB'", "AB'+BC", "BC+AB'"],
        "options": [
            ["AB' + BC", True, None],
            ["A + BC", False, "Omitted the effect of factor (B' + C)."],
            ["AB' + C", False, "Confused consensus term with minimal cover."],
            ["ABC", False, "Over-reduced."]
        ],
        "hint1": "By the second distributive law, (A + B)(A + C) = A + BC.",
        "hint2": "Now multiply (A + BC)(B' + C) = AB' + AC + BB'C + BCC = AB' + AC + BC. Notice that AC is consensus between AB' and BC!",
        "finalAnswer": "AB' + BC",
        "steps": [
            {"title": "Step 1: First Two Terms", "type": "calculation", "content": "(A + B)(A + C) = A + BC."},
            {"title": "Step 2: Multiply by Third Factor", "type": "calculation", "content": "(A + BC)(B' + C) = AB' + AC + 0 + BC = AB' + BC + AC."},
            {"title": "Step 3: Consensus Elimination", "type": "calculation", "content": "In AB' + BC + AC, literal B is complementary. Consensus is AC. Thus AC is redundant: F = AB' + BC."}
        ],
        "fastShortcut": "(A + BC)(B' + C) expands to AB' + BC + AC; consensus eliminates AC to leave AB' + BC.",
        "verification": "Minterms: m3, m4, m5, m7 -> minimal SOP is AB' + BC."
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
        "acceptedAnswers": ["A' + C", "A'+C", "C + A'", "C+A'"],
        "options": [
            ["A' + C", True, None],
            ["A' + B", False, "B and B' eliminate each other."],
            ["B + C", False, "A' is common and preserved."],
            ["A'BC", False, "Converted to product term incorrectly."]
        ],
        "hint1": "Rearrange as (A' + C + B')(A' + C + B).",
        "hint2": "Let X = A' + C. Then (X + B')(X + B) = X + B'B = X + 0 = X = A' + C.",
        "finalAnswer": "A' + C",
        "steps": [
            {"title": "Factoring", "type": "calculation", "content": "(A' + C + B')(A' + C + B) = (A' + C) + B'B."},
            {"title": "Complement Rule", "type": "calculation", "content": "B'B = 0. (A' + C) + 0 = A' + C."}
        ],
        "fastShortcut": "Dual combining: (A' + C + B')(A' + C + B) = A' + C.",
        "verification": "Truth table equivalence."
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
        "acceptedAnswers": ["A'C + B'C", "B'C + A'C", "A'C+B'C", "B'C+A'C"],
        "options": [
            ["A'C + B'C", True, None],
            ["A'C", False, "Omitted coverage of minterm AB'C."],
            ["B'C", False, "Omitted coverage of minterm A'BC."],
            ["C", False, "Requires 4 minterms to reduce to single literal C."]
        ],
        "hint1": "Duplicate minterm A'B'C using idempotence: (A'B'C + A'BC) + (A'B'C + AB'C).",
        "hint2": "Pair 1 combines to A'C. Pair 2 combines to B'C. Result: A'C + B'C.",
        "finalAnswer": "A'C + B'C",
        "steps": [
            {"title": "Duplicate Shared Minterm", "type": "calculation", "content": "F = (A'B'C + A'BC) + (A'B'C + AB'C)."},
            {"title": "Combine Pairs", "type": "calculation", "content": "A'C(B' + B) + B'C(A' + A) = A'C(1) + B'C(1) = A'C + B'C."}
        ],
        "fastShortcut": "Sharing minterm A'B'C gives A'C + B'C.",
        "verification": "Truth table: minterms are m1, m3, m5 -> cover is A'C (m1, m3) + B'C (m1, m5)."
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
        "acceptedAnswers": ["AB + A'C", "A'C + AB", "AB+A'C", "A'C+AB"],
        "options": [
            ["AB + A'C", True, None],
            ["AB + C", False, "Dropped complement literal A' prematurely."],
            ["B + A'C", False, "Incorrectly eliminated literal A."],
            ["ABC", False, "Collapsed terms into single product."]
        ],
        "hint1": "Combine terms 2 and 3: A'B'C + A'BC = A'C(B' + B) = A'C.",
        "hint2": "Expression becomes AB + A'C. Can consensus be formed? Consensus is BC, but BC is not present. Thus AB + A'C is minimal.",
        "finalAnswer": "AB + A'C",
        "steps": [
            {"title": "Factor Terms 2 and 3", "type": "calculation", "content": "A'B'C + A'BC = A'C(B' + B) = A'C(1) = A'C."},
            {"title": "Minimal Result", "type": "calculation", "content": "F = AB + A'C."}
        ],
        "fastShortcut": "Combining A'B'C + A'BC gives A'C; expression reduces to AB + A'C.",
        "verification": "Truth table equivalence."
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
        "acceptedAnswers": ["ABC + A'B'C'", "A'B'C' + ABC", "ABC+A'B'C'", "A'B'C'+ABC"],
        "options": [
            ["ABC + A'B'C'", True, None],
            ["AB + A'B'", False, "Omitted literal C from products."],
            ["C + C'", False, "Failed to apply Boolean multiplication."],
            ["0", False, "Result depends on inputs."]
        ],
        "hint1": "Multiply out: (AB)(A'B') + (AB)(C) + (C')(A'B') + (C')(C).",
        "hint2": "AA' = 0 so (AB)(A'B') = 0. CC' = 0 so (C')(C) = 0. The remaining terms are ABC + A'B'C'.",
        "finalAnswer": "ABC + A'B'C'",
        "steps": [
            {"title": "Expansion", "type": "calculation", "content": "(AB)(A'B') + ABC + A'B'C' + CC'."},
            {"title": "Null Term Cancellation", "type": "calculation", "content": "AA'B B' = 0 and CC' = 0. Result: ABC + A'B'C'."}
        ],
        "fastShortcut": "Cross terms vanish due to AA'=0 and CC'=0, leaving ABC + A'B'C'.",
        "verification": "Truth table: 1 only on m0 and m7."
    },
    {
        "id": "u2-q036",
        "trackId": "sec22",
        "trackTitle": "Section 2.2: Algebraic Simplification & Reductions",
        "topicBadge": "2.2: 4-Variable Consensus & Absorption",
        "difficulty": "Hard",
        "set": "setA",
        "questionType": "free_response",
        "requireMinimal": True,
        "question": "Simplify the 4-variable expression: F = AB'D' + A'CD' + BCD'.",
        "promptDetail": "Factor common literal D', identify the consensus term, and simplify.",
        "inputFormatHint": "Enter minimal SOP, e.g. CD' + AB'D'",
        "correctAnswer": "CD' + AB'D'",
        "acceptedAnswers": ["CD' + AB'D'", "AB'D' + CD'", "CD'+AB'D'", "AB'D'+CD'"],
        "options": [
            ["CD' + AB'D'", True, None],
            ["AB'D' + A'CD'", False, "Overlooked consensus between BCD' and AB'D' combining with A'CD'."],
            ["D'(A + B + C)", False, "Incorrect factorization."],
            ["BCD' + AB'D'", False, "Incorrect term selection."]
        ],
        "hint1": "Factor D' out: D'(AB' + A'C + BC). Notice consensus between AB' and BC on literal B is ACD.",
        "hint2": "Wait: (A'C + BC) = (A' + B)C. Combine with AB' gives C + AB' = C + B'. Multiplied by D': CD' + AB'D'.",
        "finalAnswer": "CD' + AB'D'",
        "steps": [
            {"title": "Factor Out D'", "type": "calculation", "content": "F = D'(AB' + A'C + BC)."},
            {"title": "Consensus Introduction", "type": "calculation", "content": "Consensus of AB' and BC is AC. Then AC + A'C = (A + A')C = C. C absorbs BC and A'C."},
            {"title": "Combine", "type": "calculation", "content": "D'(C + AB') = CD' + AB'D'."}
        ],
        "fastShortcut": "D'(AB' + A'C + BC) reduces to D'(C + AB') = CD' + AB'D'.",
        "verification": "Truth table: minterms are m2, m6, m8, m10, m14 -> CD' + AB'D'."
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
        "acceptedAnswers": ["A + BD", "A+BD", "BD + A", "BD+A"],
        "options": [
            ["A + BD", True, None],
            ["A + B", False, "Over-simplified."],
            ["(A + B)(A + D)", False, "Unexpanded POS form."],
            ["ABD", False, "Converted to product term incorrectly."]
        ],
        "hint1": "Combine the first two terms: (A + B + D)(A + B + D') = (A + B) + DD' = (A + B) + 0 = A + B.",
        "hint2": "Now multiply (A + B)(A + B' + D). Notice literal A is common: A + B(B' + D) = A + (BB' + BD) = A + BD.",
        "finalAnswer": "A + BD",
        "steps": [
            {"title": "Step 1: First Pair Combining", "type": "calculation", "content": "(A + B + D)(A + B + D') = A + B."},
            {"title": "Step 2: Combine with Third Factor", "type": "calculation", "content": "(A + B)(A + B' + D) = A + B(B' + D) = A + 0 + BD = A + BD."}
        ],
        "fastShortcut": "First pair yields (A + B); (A + B)(A + B' + D) simplifies to A + BD.",
        "verification": "Truth table equivalence proof."
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
        "acceptedAnswers": ["A", "a"],
        "options": [
            ["A", True, None],
            ["B", False, "B is eliminated in reduction."],
            ["A' + B", False, "Incomplete simplification."],
            ["AB", False, "Over-reduced."]
        ],
        "hint1": "By De Morgan's Law on the outer bracket: [ X * Y ]' = X' + Y' with X = (AB)' and Y = (A' + B).",
        "hint2": "X' = ((AB)')' = AB. Y' = (A' + B)' = A''B' = AB'. Therefore F = AB + AB' = A(B + B') = A.",
        "finalAnswer": "A",
        "steps": [
            {"title": "Outer De Morgan", "type": "calculation", "content": "[ (AB)' * (A' + B) ]' = ((AB)')' + (A' + B)'."},
            {"title": "Double Complements", "type": "calculation", "content": "((AB)')' = AB. (A' + B)' = AB'."},
            {"title": "Combining Law", "type": "calculation", "content": "AB + AB' = A(B + B') = A(1) = A."}
        ],
        "fastShortcut": "Outer De Morgan produces AB + AB' = A.",
        "verification": "Truth table: when A=1, F=1; when A=0, F=0. Matches A."
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
        "acceptedAnswers": ["ABC + A'B'C'", "A'B'C' + ABC", "ABC+A'B'C'", "A'B'C'+ABC"],
        "options": [
            ["ABC + A'B'C'", True, None],
            ["A + B + C", False, "Incorrect algebraic reduction."],
            ["A'B'C'", False, "Omitted term ABC."],
            ["0", False, "Expression is non-zero when inputs are all 0 or all 1."]
        ],
        "hint1": "Multiply the first two terms: (A' + B)(B' + C) = A'B' + A'C + BB' + BC = A'B' + A'C + BC.",
        "hint2": "Now multiply by (C' + A): (A'B' + A'C + BC)(C' + A) = A'B'C' + 0 + 0 + 0 + 0 + ABC = A'B'C' + ABC.",
        "finalAnswer": "ABC + A'B'C'",
        "steps": [
            {"title": "Multiply First Pair", "type": "calculation", "content": "(A' + B)(B' + C) = A'B' + A'C + BC."},
            {"title": "Multiply with Third Factor", "type": "calculation", "content": "(A'B' + A'C + BC)(C' + A) = A'B'C' + A'B'A + A'CC' + A'CA + BCC' + BCA."},
            {"title": "Null Cancellations", "type": "calculation", "content": "Terms with AA'=0, CC'=0 vanish, leaving A'B'C' + ABC."}
        ],
        "fastShortcut": "Cyclic product (A' + B)(B' + C)(C' + A) multiplies out directly to ABC + A'B'C'.",
        "verification": "Truth table: evaluates to 1 only when A=B=C (all 0 or all 1)."
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
        "acceptedAnswers": ["WX' + Y + XZ'", "WX' + XZ' + Y", "Y + WX' + XZ'"],
        "options": [
            ["WX' + Y + XZ'", True, None],
            ["WX' + XY", False, "Omitted literal Z'."],
            ["W + Y + Z'", False, "Over-reduced."],
            ["X + Y + Z'", False, "Lost literal W."]
        ],
        "hint1": "Expand X(Y + Z') = XY + XZ'. Expression is WX' + XY + XZ' + W'X'Y.",
        "hint2": "Combine terms with Y: XY + W'X'Y = Y(X + W'X') = Y(X + W') = XY + W'Y. With WX', WX' + W'X'Y = X'(W + W'Y) = X'(W + Y) = WX' + X'Y. Then X'Y + XY = Y!",
        "finalAnswer": "WX' + Y + XZ'",
        "steps": [
            {"title": "Expand and Group", "type": "calculation", "content": "F = WX' + W'X'Y + XY + XZ'."},
            {"title": "Complement Absorption", "type": "calculation", "content": "WX' + W'X'Y = X'(W + W'Y) = X'(W + Y) = WX' + X'Y."},
            {"title": "Combine with XY", "type": "calculation", "content": "X'Y + XY = Y(X' + X) = Y. Final expression: WX' + Y + XZ'."}
        ],
        "fastShortcut": "WX' + W'X'Y gives X'Y; X'Y + XY yields Y; leaving WX' + Y + XZ'.",
        "verification": "Truth table equivalence check across all 16 rows."
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
        "acceptedAnswers": ["(A + B' + C)(A' + D)", "(A+B'+C)(A'+D)", "(A' + D)(A + B' + C)"],
        "options": [
            ["(A + B' + C)(A' + D)", True, None],
            ["(B' + C + D)", False, "Kept the redundant consensus term."],
            ["(A + B' + C)(B' + C + D)", False, "Deleted essential term (A' + D)."],
            ["AD + B'C", False, "Converted to SOP incorrectly."]
        ],
        "hint1": "Terms (A + B' + C) and (A' + D) contain the single complementary pair A and A'.",
        "hint2": "The remaining literals are (B' + C) and D, forming the consensus sum (B' + C + D). This term is eliminated.",
        "finalAnswer": "(A + B' + C)(A' + D)",
        "steps": [
            {"title": "Dual Consensus Check", "type": "axiom", "content": "Literals A and A' are complementary. The consensus sum of (A + B' + C) and (A' + D) is (B' + C + D). By the Dual Consensus Theorem, (B' + C + D) is completely redundant."}
        ],
        "fastShortcut": "Dual consensus eliminates (B' + C + D).",
        "verification": "Dual consensus theorem proof."
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
        "acceptedAnswers": ["W'", "w'", "not W"],
        "options": [
            ["W'", True, None],
            ["W", False, "Inverted literal polarity."],
            ["X' + Y'", False, "Incomplete reduction."],
            ["W'X'", False, "Failed to combine across X and X'."]
        ],
        "hint1": "Factor W'X' from the first two terms, and W'X from the second two terms.",
        "hint2": "W'X'(Y' + Y) + W'X(Y + Y') = W'X'(1) + W'X(1) = W'X' + W'X = W'(X' + X) = W'(1) = W'.",
        "finalAnswer": "W'",
        "steps": [
            {"title": "First Level Factoring", "type": "calculation", "content": "W'X'(Y' + Y) + W'X(Y + Y') = W'X' + W'X."},
            {"title": "Second Level Factoring", "type": "calculation", "content": "W'(X' + X) = W'(1) = W'."}
        ],
        "fastShortcut": "All 4 minterms where W=0 are present, which simplifies to W'.",
        "verification": "Truth table: 1 on all rows where W=0."
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
        "acceptedAnswers": ["C'", "c'", "not C"],
        "options": [
            ["C'", True, None],
            ["C", False, "Lost complement prime."],
            ["A' + B'", False, "Incomplete reduction."],
            ["0", False, "Expression is non-zero when C=0."]
        ],
        "hint1": "Notice that literal C' is common to all 4 sum terms.",
        "hint2": "Pair terms by A and B: [(C' + A') + B][(C' + A') + B'] = C' + A'. And [(C' + A) + B][(C' + A) + B'] = C' + A. Then (C' + A')(C' + A) = C' + AA' = C' + 0 = C'.",
        "finalAnswer": "C'",
        "steps": [
            {"title": "Pair 1 Combining", "type": "calculation", "content": "(C' + A' + B)(C' + A' + B') = C' + A'."},
            {"title": "Pair 2 Combining", "type": "calculation", "content": "(C' + A + B)(C' + A + B') = C' + A."},
            {"title": "Final Combining", "type": "calculation", "content": "(C' + A')(C' + A) = C' + AA' = C' + 0 = C'."}
        ],
        "fastShortcut": "All 4 combinations of A and B multiply out to 0, leaving C'.",
        "verification": "Truth table: evaluates to 0 only when C=1."
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
            ["Yes, it is already minimal because all 4 product terms are essential prime implicants", True, None],
            ["No, AB + BC + CA simplifies to A + B + C", False, "AB + BC + CA does not equal A + B + C."],
            ["No, consensus eliminates term CA", False, "Consensus is cyclic; deleting any term changes the function."],
            ["No, A'B'C' is absorbed by AB", False, "A'B'C' is disjoint from AB and cannot be absorbed."]
        ],
        "hint1": "Minterms covered: AB covers {m6, m7}; BC covers {m3, m7}; CA covers {m5, m7}; A'B'C' covers {m0}.",
        "hint2": "Minterm m0 is uniquely covered by A'B'C'. Minterm m6 is covered by AB and CA? No, m6 is A=1,B=1,C=0 (only AB). Every term covers at least one unique minterm!",
        "finalAnswer": "Yes, it is already minimal because all 4 product terms are essential prime implicants",
        "steps": [
            {"title": "Minterm Coverage Check", "type": "axiom", "content": "m0 (000) is covered ONLY by A'B'C'. m3 (011) is covered ONLY by BC. m5 (101) is covered ONLY by CA. m6 (110) is covered ONLY by AB. Since every product term uniquely covers at least one minterm, all 4 are essential prime implicants. The expression is irreducible."}
        ],
        "fastShortcut": "Every prime implicant has an essential minterm; the expression is already minimal.",
        "verification": "K-Map essential prime implicant proof."
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
        "acceptedAnswers": ["AB + A'B'", "A'B' + AB", "AB+A'B'", "A'B'+AB"],
        "options": [
            ["AB + A'B'", True, None],
            ["AB' + A'B", False, "This is the uncomplemented XOR sum inside the brackets."],
            ["A + B", False, "Failed to apply inner De Morgan laws."],
            ["1", False, "Result depends on inputs (XNOR function)."]
        ],
        "hint1": "Inner terms: (A' + B)' = A''B' = AB'. And (A + B')' = A'B'' = A'B.",
        "hint2": "Inside the brackets: AB' + A'B (which is XOR). The outer complement makes it (AB' + A'B)', which is XNOR: AB + A'B'.",
        "finalAnswer": "AB + A'B'",
        "steps": [
            {"title": "Inner De Morgan", "type": "calculation", "content": "(A' + B)' = AB'. (A + B')' = A'B."},
            {"title": "Bracket Expression", "type": "calculation", "content": "Inner sum = AB' + A'B (Exclusive-OR)."},
            {"title": "Outer De Morgan", "type": "calculation", "content": "F = (AB' + A'B)' = (AB')' * (A'B)' = (A' + B)(A + B') = A'B' + AB."}
        ],
        "fastShortcut": "Complement of XOR is XNOR: AB + A'B'.",
        "verification": "Truth table: 1 when A=B (m0 and m3)."
    }
]

print(f"Loaded {len(sec22_questions)} Section 2.2 questions.")
