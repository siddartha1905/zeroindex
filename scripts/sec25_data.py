# Section 2.5 Question Bank Data (u2-q091 to u2-q125) - 35 Questions
# Strictly zero em-dashes and zero en-dashes.
# Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).

sec25_questions = [
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
        "acceptedAnswers": ["{m0, m1}", "m0, m1", "0, 1", "{0, 1}"],
        "options": [
            ["{m0, m1}", True, None],
            ["{m1, m3}", False, "This is column B = 1, which produces term B."],
            ["{m2, m3}", False, "This is row A = 1, which produces term A."],
            ["{m0, m2}", False, "This is column B = 0, which produces term B'."]
        ],
        "hint1": "Term A' specifies that variable A is 0, while variable B can be either 0 or 1.",
        "hint2": "Row A=0 contains cell m0 (A=0, B=0) and cell m1 (A=0, B=1). Group is {m0, m1}.",
        "finalAnswer": "{m0, m1}",
        "steps": [
            {"title": "Row Mapping", "type": "axiom", "content": "Row A=0 corresponds to minterms m0 (00) and m1 (01). Grouping {m0, m1} eliminates variable B, yielding A'."}
        ],
        "fastShortcut": "Row A=0 contains cells {m0, m1}.",
        "verification": "m0 + m1 = A'B' + A'B = A'(B' + B) = A'."
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
        "acceptedAnswers": ["B", "b"],
        "options": [
            ["B", True, None],
            ["B'", False, "Column {m0, m2} yields B'."],
            ["A", False, "Variable A changes state from 0 to 1."],
            ["AB", False, "This is the single cell m3, not the column pair."]
        ],
        "hint1": "Cell m1 is A=0, B=1. Cell m3 is A=1, B=1.",
        "hint2": "Variable A toggles (0 -> 1) and eliminates. Variable B is constant 1. Result: B.",
        "finalAnswer": "B",
        "steps": [
            {"title": "Adjacency Reduction", "type": "calculation", "content": "m1 + m3 = A'B + AB = (A' + A)B = 1 * B = B."}
        ],
        "fastShortcut": "Column B=1 yields literal B.",
        "verification": "Truth table equivalence."
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
            ["Every valid group must contain 2^k cells (1, 2, 4, 8, 16) to eliminate k variables using x + x' = 1", True, None],
            ["Odd numbers of cells can never be adjacent in Gray code", False, "Singletons (1 cell) are odd and valid."],
            ["A group of 3 cells creates a short-circuit in the physical circuit", False, "K-Maps are mathematical minimization representations."],
            ["3-cell groups are permitted in POS mode but forbidden in SOP mode", False, "Power-of-2 size is mandatory for both SOP and POS."]
        ],
        "hint1": "Algebraic combining: P * x + P * x' = P(x + x') = P.",
        "hint2": "This identity combines exactly 2 terms. Applying it k times requires 2 * 2 * ... = 2^k terms.",
        "finalAnswer": "Every valid group must contain 2^k cells (1, 2, 4, 8, 16) to eliminate k variables using x + x' = 1",
        "steps": [
            {"title": "Algebraic Combining Theorem", "type": "axiom", "content": "Each variable elimination requires pairing two terms that differ in exactly one variable: P*x + P*x' = P. To eliminate k variables simultaneously, exactly 2^k terms must be grouped. 3 is not a power of 2."}
        ],
        "fastShortcut": "Groups must contain 2^k cells: 1, 2, 4, 8, 16.",
        "verification": "Switching algebra combining theorem."
    },
    {
        "id": "u2-q094",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 3-Variable Row Quad Minimization",
        "difficulty": "Easy",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "In a 3-variable K-Map for (A, B, C), minimize the function F(A, B, C) = \u03A3 m(0, 1, 2, 3).",
        "promptDetail": "Identify the 4-cell group covering the entire top row.",
        "inputFormatHint": "Enter minimal literal, e.g. A'",
        "correctAnswer": "A'",
        "acceptedAnswers": ["A'", "a'", "not A"],
        "options": [
            ["A'", True, None],
            ["A", False, "Minterms {4, 5, 6, 7} yield A."],
            ["B'C'", False, "This is only cell m0."],
            ["B + C", False, "Incorrect representation."]
        ],
        "hint1": "Minterms {0, 1, 2, 3} comprise all four cells of row A = 0.",
        "hint2": "Since all 4 combinations of (B, C) are covered, both B and C are eliminated. Result is A'.",
        "finalAnswer": "A'",
        "steps": [
            {"title": "Quad Coverage", "type": "calculation", "content": "Minterms {0, 1, 2, 3} form a 1x4 quad covering row A = 0."},
            {"title": "Variable Elimination", "type": "axiom", "content": "A group of 4 cells (2^2) eliminates 2 variables (B and C). Constant literal is A'."}
        ],
        "fastShortcut": "Full top row (A=0) in 3-var map simplifies to A'.",
        "verification": "Truth table: 1 on all rows where A=0."
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
            ["Gray code ensures adjacent cells differ in exactly 1 variable bit, enabling visual application of x + x' = 1", True, None],
            ["Gray code uses fewer bits than binary code", False, "Both Gray code and binary use 2 bits for 4 columns."],
            ["Standard binary code cannot represent prime numbers", False, "Irrelevant mathematical claim."],
            ["K-Maps were invented before standard binary was standardized", False, "Binary arithmetic was well established prior to Karnaugh's 1953 paper."]
        ],
        "hint1": "Compare 01 and 10 in standard binary: two bits change simultaneously (0->1 and 1->0).",
        "hint2": "If two bits change, x + x' = 1 cannot be applied to combine terms. Gray code ensures Hamming distance = 1.",
        "finalAnswer": "Gray code ensures adjacent cells differ in exactly 1 variable bit, enabling visual application of x + x' = 1",
        "steps": [
            {"title": "Gray Code Adjacency", "type": "axiom", "content": "Karnaugh mapping maps topological geometric adjacency directly to switching algebraic adjacency. Moving between any two geometrically adjacent cells must change exactly one variable so that A*B + A*B' = A can be applied. In standard binary, moving from 01 to 10 changes two variables simultaneously."}
        ],
        "fastShortcut": "Gray code guarantees Hamming distance = 1 between adjacent cells.",
        "verification": "Karnaugh (1953) foundation."
    },
    {
        "id": "u2-q096",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 3-Variable Bottom Row Quad",
        "difficulty": "Easy",
        "set": "setB",
        "questionType": "free_response",
        "requireMinimal": True,
        "question": "In a 3-variable K-Map for (A, B, C), minimize the function F(A, B, C) = \u03A3 m(4, 5, 6, 7).",
        "promptDetail": "Identify the 4-cell group covering row A = 1.",
        "inputFormatHint": "Enter minimal literal, e.g. A",
        "correctAnswer": "A",
        "acceptedAnswers": ["A", "a"],
        "options": [
            ["A", True, None],
            ["A'", False, "This corresponds to row A = 0 {0, 1, 2, 3}."],
            ["BC", False, "This is column 11."],
            ["B' + C'", False, "Incorrect POS conversion."]
        ],
        "hint1": "Minterms {4, 5, 6, 7} comprise the entire bottom row where A = 1.",
        "hint2": "Variables B and C are eliminated across the quad. Result is A.",
        "finalAnswer": "A",
        "steps": [
            {"title": "Row Quad", "type": "calculation", "content": "Minterms {4, 5, 6, 7} form a 1x4 quad covering row A = 1. Result is A."}
        ],
        "fastShortcut": "Full bottom row (A=1) in 3-var map simplifies to A.",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q097",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 3-Variable Toroidal Wrapping Quad",
        "difficulty": "Medium",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "In a 3-variable K-Map for (A, B, C), minimize F(A, B, C) = \u03A3 m(0, 2, 4, 6) using edge wrapping.",
        "promptDetail": "Combine the leftmost column 00 and rightmost column 10.",
        "inputFormatHint": "Enter minimal literal, e.g. C'",
        "correctAnswer": "C'",
        "acceptedAnswers": ["C'", "c'", "not C"],
        "options": [
            ["C'", True, None],
            ["C", False, "Columns 01 and 11 yield C."],
            ["B'", False, "Columns 00 and 01 yield B'."],
            ["A'C' + AC'", False, "Uncombined two pairs instead of a single quad."]
        ],
        "hint1": "Column 00 contains {m0, m4}. Column 10 contains {m2, m6}.",
        "hint2": "Left and right edges are logically adjacent (toroidal wrapping). They combine into a 4-cell quad. Variable A toggles (0, 1); variable B toggles (0, 1); variable C is constant 0 -> C'.",
        "finalAnswer": "C'",
        "steps": [
            {"title": "Toroidal Adjacency", "type": "axiom", "content": "Column BC=00 and Column BC=10 differ in only bit B (C is 0 in both). They are topologically adjacent across the map boundary."},
            {"title": "Quad Minimization", "type": "calculation", "content": "Group {0, 2, 4, 6} forms a 2x2 wrapping quad. Variables A and B eliminate, leaving C'."}
        ],
        "fastShortcut": "Left-right edge wrapping quad on columns 00 and 10 gives C'.",
        "verification": "m0+m2+m4+m6 = A'B'C' + A'BC' + AB'C' + ABC' = (A'B' + A'B + AB' + AB)C' = C'."
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
            ["A is eliminated, term is B'C", True, None],
            ["B is eliminated, term is A'C", False, "B is constant 0 in both cells."],
            ["C is eliminated, term is AB'", False, "C is constant 1 in both cells."],
            ["A is eliminated, term is BC", False, "Inverted polarity on B."]
        ],
        "hint1": "m1 = 001 (A=0, B=0, C=1). m5 = 101 (A=1, B=0, C=1).",
        "hint2": "Variable A changes from 0 to 1, so A is eliminated. B=0 (B') and C=1 (C) remain invariant. Result: B'C.",
        "finalAnswer": "A is eliminated, term is B'C",
        "steps": [
            {"title": "Coordinate Comparison", "type": "calculation", "content": "m1: A=0, B=0, C=1. m5: A=1, B=0, C=1."},
            {"title": "Elimination", "type": "axiom", "content": "A toggles 0 -> 1 (eliminated). B is constant 0 (B'), C is constant 1 (C). Product term = B'C."}
        ],
        "fastShortcut": "Vertical pair in column 01 eliminates row variable A, yielding B'C.",
        "verification": "m1 + m5 = A'B'C + AB'C = (A' + A)B'C = B'C."
    },
    {
        "id": "u2-q099",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 3-Variable Column Pair Quad",
        "difficulty": "Medium",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Minimize the 3-variable function: F(A, B, C) = \u03A3 m(1, 3, 5, 7).",
        "promptDetail": "Group the two central columns (BC = 01 and 11).",
        "inputFormatHint": "Enter minimal literal, e.g. C",
        "correctAnswer": "C",
        "acceptedAnswers": ["C", "c"],
        "options": [
            ["C", True, None],
            ["C'", False, "Columns 00 and 10 yield C'."],
            ["B", False, "Variable B toggles between 0 and 1."],
            ["A + C", False, "Over-complicated representation."]
        ],
        "hint1": "Minterms {1, 3, 5, 7} are the two adjacent middle columns BC = 01 and BC = 11 across both rows.",
        "hint2": "In columns 01 and 11, B toggles (0, 1) and A toggles (0, 1). Only C is constant 1 throughout. Result: C.",
        "finalAnswer": "C",
        "steps": [
            {"title": "2x2 Quad Formation", "type": "calculation", "content": "Cells {1, 3, 5, 7} form a 2x2 quad in columns BC=01 and 11."},
            {"title": "Elimination", "type": "axiom", "content": "A eliminates (rows 0, 1). B eliminates (cols 0, 1). Constant literal is C."}
        ],
        "fastShortcut": "Odd minterm quad in 3-var map simplifies to C.",
        "verification": "Truth table: 1 on all rows where C=1."
    },
    {
        "id": "u2-q100",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 3-Variable Adjacent Column Quad",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Minimize the 3-variable function: F(A, B, C) = \u03A3 m(2, 3, 6, 7).",
        "promptDetail": "Group columns BC = 11 and 10 across both rows.",
        "inputFormatHint": "Enter minimal literal, e.g. B",
        "correctAnswer": "B",
        "acceptedAnswers": ["B", "b"],
        "options": [
            ["B", True, None],
            ["B'", False, "Columns 00 and 01 yield B'."],
            ["C", False, "C toggles between 0 and 1."],
            ["A + B", False, "A is eliminated."]
        ],
        "hint1": "Columns BC = 11 ({3, 7}) and BC = 10 ({2, 6}).",
        "hint2": "Variable B is constant 1 across all 4 cells. A and C eliminate. Result: B.",
        "finalAnswer": "B",
        "steps": [
            {"title": "Quad Grouping", "type": "calculation", "content": "Cells {2, 3, 6, 7} form a 2x2 quad covering columns where B = 1."},
            {"title": "Elimination", "type": "axiom", "content": "Variables A and C eliminate. Minimal SOP: B."}
        ],
        "fastShortcut": "Quad covering columns 11 and 10 gives literal B.",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q101",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Four-Corner Quad",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "free_response",
        "requireMinimal": True,
        "question": "In a 4-variable K-Map for (A, B, C, D), what minimal product term is produced by grouping the four corner cells: {m0, m2, m8, m10}?",
        "promptDetail": "Top-left m0 (0000), top-right m2 (0010), bottom-left m8 (1000), bottom-right m10 (1010).",
        "inputFormatHint": "Enter product term, e.g. B'D'",
        "correctAnswer": "B'D'",
        "acceptedAnswers": ["B'D'", "B'*D'", "D'B'", "b'd'"],
        "options": [
            ["B'D'", True, None],
            ["A'C'", False, "Top-left 2x2 block {0, 1, 4, 5} yields A'C'."],
            ["BD", False, "Center 4 cells {5, 7, 13, 15} yield BD."],
            ["B'C'", False, "Top and bottom rows of leftmost two columns yield B'C'."]
        ],
        "hint1": "Row coordinates for m0, m2 are AB = 00; for m8, m10 are AB = 10. Between 00 and 10, A toggles, B is constant 0 (B').",
        "hint2": "Column coordinates for m0, m8 are CD = 00; for m2, m10 are CD = 10. Between 00 and 10, C toggles, D is constant 0 (D'). Result: B'D'.",
        "finalAnswer": "B'D'",
        "steps": [
            {"title": "Row Adjacency", "type": "calculation", "content": "Rows AB=00 and AB=10 combine across the map boundary. Invariant literal: B'."},
            {"title": "Column Adjacency", "type": "calculation", "content": "Columns CD=00 and CD=10 combine across the map boundary. Invariant literal: D'."},
            {"title": "Product Term", "type": "axiom", "content": "Combining both directions forms a 4-corner quad yielding B'D'."}
        ],
        "fastShortcut": "Four corners in a 4-var K-Map always simplify to B'D'.",
        "verification": "m0+m2+m8+m10 = A'B'C'D' + A'B'CD' + AB'C'D' + AB'CD' = B'D'."
    },
    {
        "id": "u2-q102",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable 8-Cell Octet",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "In a 4-variable K-Map for (A, B, C, D), minimize the 8-minterm function: F(A, B, C, D) = \u03A3 m(0, 1, 4, 5, 8, 9, 12, 13).",
        "promptDetail": "Group the two leftmost full columns (CD = 00 and 01).",
        "inputFormatHint": "Enter single literal, e.g. C'",
        "correctAnswer": "C'",
        "acceptedAnswers": ["C'", "c'", "not C"],
        "options": [
            ["C'", True, None],
            ["C", False, "Rightmost two columns yield C."],
            ["D'", False, "Columns 00 and 10 yield D'."],
            ["A' + B'", False, "Incorrect representation."]
        ],
        "hint1": "An 8-cell octet (2^3) in a 4-variable map eliminates 3 variables, leaving a single literal.",
        "hint2": "The group covers all 4 rows (A and B eliminate completely) and columns CD = 00 and 01 (D toggles 0->1). Invariant literal is C = 0 -> C'.",
        "finalAnswer": "C'",
        "steps": [
            {"title": "Octet Dimensions", "type": "calculation", "content": "The group is a 4x2 octet covering all 4 rows and columns CD=00, 01."},
            {"title": "Variable Elimination", "type": "axiom", "content": "Rows eliminate A and B. Columns eliminate D. Constant literal is C'."}
        ],
        "fastShortcut": "Left two full columns in a 4-var map simplify to C'.",
        "verification": "Truth table evaluation."
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
            ["All 1-cells in the pair are already covered by larger prime implicant quads", True, None],
            ["Pair {m12, m13} contains cells from different rows", False, "Both cells are in row AB=11."],
            ["Pairs can never be circled if quads exist on the map", False, "Pairs are valid if they cover isolated 1s not coverable by quads."],
            ["Cell m12 is a don't-care cell that must not be circled", False, "m12 is an active minterm."]
        ],
        "hint1": "Minterm m12 is covered by both Quad 1 and Quad 2.",
        "hint2": "Minterm m13 is covered by both Quad 1 and Quad 2. Since both cells are already covered by essential quads, circling them again adds a redundant term.",
        "finalAnswer": "All 1-cells in the pair are already covered by larger prime implicant quads",
        "steps": [
            {"title": "Coverage Audit", "type": "axiom", "content": "Quad 1 (BC') covers {m4, m5, m12, m13}. Quad 2 (AB) covers {m12, m13, m14, m15}. Every minterm in pair {m12, m13} is already covered by these two essential quads. Adding the pair introduces redundant term AB C', violating minimality."}
        ],
        "fastShortcut": "Sub-groups whose 1s are fully covered by larger prime implicants are redundant.",
        "verification": "Quine-McCluskey prime implicant table."
    },
    {
        "id": "u2-q104",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: Don't-Care Inclusion Optimization",
        "difficulty": "Medium",
        "set": "setA",
        "questionType": "conceptual_mcq",
        "question": "For the function F(A, B, C) = \u03A3 m(1, 3, 7) + d(5), how should the don't-care condition d(5) be assigned to achieve minimal SOP?",
        "promptDetail": "Compare the resulting expression when d(5) is assigned 1 versus 0.",
        "inputFormatHint": "Select assignment and resulting term",
        "correctAnswer": "Assign d(5) = 1 to form a single 4-cell quad {1, 3, 5, 7} yielding term C",
        "acceptedAnswers": [
            "Assign d(5) = 1 to form a single 4-cell quad {1, 3, 5, 7} yielding term C",
            "d(5)=1 gives C"
        ],
        "options": [
            ["Assign d(5) = 1 to form a single 4-cell quad {1, 3, 5, 7} yielding term C", True, None],
            ["Assign d(5) = 0 to avoid adding unnecessary minterms, giving A'C + BC", False, "Two pairs require more literals (4 literals) than a single quad (1 literal)."],
            ["Don't-care terms must always be assigned 0 in SOP minimization", False, "Don't-cares should be assigned 1 whenever they enlarge a group."],
            ["Assign d(5) = 1 to form an octet", False, "There are only 4 minterms total; an octet requires 8 cells."]
        ],
        "hint1": "If d(5) = 0: 1-cells are {1, 3, 7}. We need two pairs: {1, 3} -> A'C and {3, 7} -> BC. Cost: 2 terms, 4 literals.",
        "hint2": "If d(5) = 1: 1-cells become {1, 3, 5, 7}. These form a single quad yielding literal C. Cost: 1 term, 1 literal. Optimal!",
        "finalAnswer": "Assign d(5) = 1 to form a single 4-cell quad {1, 3, 5, 7} yielding term C",
        "steps": [
            {"title": "Option A (d=0)", "type": "calculation", "content": "Minterms {1, 3, 7} require two pairs: A'C + BC (4 literals)."},
            {"title": "Option B (d=1)", "type": "calculation", "content": "Including d(5) forms quad {1, 3, 5, 7} yielding C (1 literal). Since 1 literal < 4 literals, d(5) = 1 is optimal."}
        ],
        "fastShortcut": "Including d(5) merges two pairs into a single quad C.",
        "verification": "Minimal SOP comparison: C vs A'C + BC."
    },
    {
        "id": "u2-q105",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: Don't-Care Exclusion Optimization",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "conceptual_mcq",
        "question": "For the function F(A, B, C) = \u03A3 m(0, 1) + d(6), how should the don't-care condition d(6) be assigned for optimal minimization?",
        "promptDetail": "Determine whether d(6) can combine with {0, 1}.",
        "inputFormatHint": "Select assignment and rationale",
        "correctAnswer": "Assign d(6) = 0 because d(6) is not adjacent to {0, 1} and grouping it would add an unnecessary product term",
        "acceptedAnswers": [
            "Assign d(6) = 0 because d(6) is not adjacent to {0, 1} and grouping it would add an unnecessary product term",
            "d(6)=0"
        ],
        "options": [
            ["Assign d(6) = 0 because d(6) is not adjacent to {0, 1} and grouping it would add an unnecessary product term", True, None],
            ["Assign d(6) = 1 to cover all available don't-care cells on the map", False, "Don't-cares do not need to be covered unless they simplify active 1s."],
            ["Assign d(6) = 1 to form a quad with {0, 1}", False, "m6 (110) cannot form a quad with m0 (000) and m1 (001)."],
            ["Assign d(6) = 0 because don't-cares are invalid in 3-variable maps", False, "Don't-cares are valid for any number of variables."]
        ],
        "hint1": "Minterms {0, 1} form pair A'B'.",
        "hint2": "d(6) is cell 110. Can 110 combine with 000 or 001 to form a quad? No, it differs in multiple bits. If we set d(6)=1, we must circle an extra term AB C'. Setting d(6)=0 leaves F = A'B'.",
        "finalAnswer": "Assign d(6) = 0 because d(6) is not adjacent to {0, 1} and grouping it would add an unnecessary product term",
        "steps": [
            {"title": "Adjacency Check", "type": "calculation", "content": "{0, 1} forms pair A'B'. Cell m6 (110) is not adjacent to m0 or m1 in a way that creates a quad."},
            {"title": "Minimality Comparison", "type": "axiom", "content": "Setting d(6)=1 requires adding term AB C' (total: A'B' + AB C'). Setting d(6)=0 gives F = A'B'. Optimal choice is d(6) = 0."}
        ],
        "fastShortcut": "Don't-cares that do not help enlarge groups of 1s must be set to 0.",
        "verification": "Minimal SOP comparison: A'B' vs A'B' + AB C'."
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
        "acceptedAnswers": ["{m0, m1, m8, m9}", "m0, m1, m8, m9", "0, 1, 8, 9", "{0, 1, 8, 9}"],
        "options": [
            ["{m0, m1, m8, m9}", True, None],
            ["{m0, m1, m4, m5}", False, "This is top-left quad in adjacent rows AB=00 and 01."],
            ["{m0, m2, m8, m10}", False, "This is the four-corner quad."],
            ["{m8, m9, m10, m11}", False, "This is the entire bottom row."]
        ],
        "hint1": "Row AB = 00 in columns CD = 00, 01 has cells m0 (0000) and m1 (0001).",
        "hint2": "Row AB = 10 in columns CD = 00, 01 has cells m8 (1000) and m9 (1001). Together they form {m0, m1, m8, m9} yielding B'C'.",
        "finalAnswer": "{m0, m1, m8, m9}",
        "steps": [
            {"title": "Row Indices", "type": "calculation", "content": "Row 00: cols 00, 01 -> m0, m1. Row 10: cols 00, 01 -> m8, m9."},
            {"title": "Top-Bottom Wrapping", "type": "axiom", "content": "Rows 00 and 10 are adjacent across the vertical boundary. Group {m0, m1, m8, m9} is a valid 2x2 quad yielding B'C'."}
        ],
        "fastShortcut": "Top-bottom wrapping in cols 00, 01 gives {m0, m1, m8, m9} = B'C'.",
        "verification": "m0+m1+m8+m9 = B'C'(D' + D)(A' + A) = B'C'."
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
        "acceptedAnswers": ["CD'", "C*D'", "D'C", "cd'"],
        "options": [
            ["CD'", True, None],
            ["C'D", False, "Column CD = 01 yields C'D."],
            ["CD", False, "Column CD = 11 yields CD."],
            ["C'D'", False, "Column CD = 00 yields C'D'."]
        ],
        "hint1": "All 4 cells lie in the rightmost column where C = 1 and D = 0.",
        "hint2": "Since all 4 rows are covered, variables A and B take all 4 states and eliminate completely. Result: CD'.",
        "finalAnswer": "CD'",
        "steps": [
            {"title": "Column Coordinates", "type": "calculation", "content": "m2 (0010), m6 (0110), m10 (1010), m14 (1110) all have C=1, D=0."},
            {"title": "Row Elimination", "type": "axiom", "content": "Rows span AB = 00, 01, 11, 10. A and B eliminate. Result is CD'."}
        ],
        "fastShortcut": "Full column CD = 10 yields CD'.",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q108",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Mixed Group Minimization",
        "difficulty": "Hard",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(1, 5, 9, 13, 14, 15).",
        "promptDetail": "Group the full column quad and the adjacent pair.",
        "inputFormatHint": "Enter minimal SOP, e.g. C'D + ABC",
        "correctAnswer": "C'D + ABC",
        "acceptedAnswers": ["C'D + ABC", "ABC + C'D", "C'D+ABC", "ABC+C'D"],
        "options": [
            ["C'D + ABC", True, None],
            ["C'D + AB", False, "m14 and m15 only form a pair, not a quad; they require 3 literals ABC."],
            ["CD + ABC", False, "Column 01 is C'D, not CD."],
            ["A'C'D + ABC", False, "Under-grouped the column into a pair."]
        ],
        "hint1": "Cells {1, 5, 9, 13} comprise the entire second column where C = 0, D = 1. This quad yields C'D.",
        "hint2": "Cells {14, 15} are in row AB = 11, columns CD = 11 and 10. They form a pair in row 11 yielding ABC. Result: C'D + ABC.",
        "finalAnswer": "C'D + ABC",
        "steps": [
            {"title": "Group 1 (Column Quad)", "type": "calculation", "content": "{1, 5, 9, 13} spans all rows in column CD=01 -> C'D."},
            {"title": "Group 2 (Row Pair)", "type": "calculation", "content": "{14, 15} is in row AB=11, cols CD=11, 10 -> ABC."},
            {"title": "Minimal SOP", "type": "calculation", "content": "F = C'D + ABC."}
        ],
        "fastShortcut": "Vertical column quad C'D + horizontal pair ABC.",
        "verification": "Verified by booleanEngine minimizeKMap([1, 5, 9, 13, 14, 15])."
    },
    {
        "id": "u2-q109",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Dual Quad Checkerboard",
        "difficulty": "Hard",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(0, 2, 5, 7, 8, 10, 13, 15).",
        "promptDetail": "Identify the corner quad and the center quad.",
        "inputFormatHint": "Enter minimal SOP, e.g. B'D' + BD",
        "correctAnswer": "B'D' + BD",
        "acceptedAnswers": ["B'D' + BD", "BD + B'D'", "B'D'+BD", "BD+B'D'"],
        "options": [
            ["B'D' + BD", True, None],
            ["A'C' + AC", False, "Minterms correspond to B and D, not A and C."],
            ["B \u2295 D", False, "B \u2295 D is BD' + B'D; this function is B \u2299 D."],
            ["B'D + BD'", False, "This is the complementary XOR function."]
        ],
        "hint1": "Corners {0, 2, 8, 10} form a quad yielding B'D'.",
        "hint2": "Center 4 cells {5, 7, 13, 15} are in rows AB = 01, 11 and cols CD = 01, 11. They form a quad yielding BD. Result: B'D' + BD.",
        "finalAnswer": "B'D' + BD",
        "steps": [
            {"title": "Corner Quad", "type": "calculation", "content": "{0, 2, 8, 10} -> B'D'."},
            {"title": "Center Quad", "type": "calculation", "content": "{5, 7, 13, 15} -> BD."},
            {"title": "Minimal SOP", "type": "calculation", "content": "F = B'D' + BD (which equals B \u2299 D, 2-variable XNOR)."}
        ],
        "fastShortcut": "Four corners (B'D') + center quad (BD) = B'D' + BD.",
        "verification": "Verified by booleanEngine minimizeKMap([0, 2, 5, 7, 8, 10, 13, 15])."
    },
    {
        "id": "u2-q110",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Horizontal Octet",
        "difficulty": "Hard",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "In a 4-variable K-Map for (A, B, C, D), minimize: F(A, B, C, D) = \u03A3 m(4, 5, 6, 7, 12, 13, 14, 15).",
        "promptDetail": "Group the two middle horizontal rows (AB = 01 and 11).",
        "inputFormatHint": "Enter minimal literal, e.g. B",
        "correctAnswer": "B",
        "acceptedAnswers": ["B", "b"],
        "options": [
            ["B", True, None],
            ["B'", False, "Rows AB = 00 and 10 yield B'."],
            ["A", False, "Rows AB = 11 and 10 yield A."],
            ["CD", False, "Columns are completely eliminated."]
        ],
        "hint1": "Minterms {4..7} is row AB = 01. Minterms {12..15} is row AB = 11.",
        "hint2": "Together they form an 8-cell octet covering all columns. Variables C and D eliminate. In rows 01 and 11, A toggles, B is constant 1. Result: B.",
        "finalAnswer": "B",
        "steps": [
            {"title": "Octet Coverage", "type": "calculation", "content": "The group covers rows AB=01 and AB=11 across all 4 columns."},
            {"title": "Elimination", "type": "axiom", "content": "C and D eliminate completely. Variable A toggles (0, 1). Invariant literal is B = 1 -> B."}
        ],
        "fastShortcut": "Middle two full rows in 4-var K-Map simplify to B.",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q111",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: Multiple Valid Minimal Covers",
        "difficulty": "Hard",
        "set": "setB",
        "questionType": "free_response",
        "requireMinimal": True,
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(1, 3, 4, 5, 6, 7, 9, 11).",
        "promptDetail": "Identify the two essential prime implicant quads covering all 8 minterms.",
        "inputFormatHint": "Enter minimal SOP, e.g. A'B + B'D",
        "correctAnswer": "A'B + B'D",
        "acceptedAnswers": ["A'B + B'D", "B'D + A'B", "A'B+B'D", "B'D+A'B"],
        "options": [
            ["A'B + B'D", True, None],
            ["A'B + A'D", False, "Fails to cover minterms m9 and m11."],
            ["B + B'D", False, "Row quad is only row AB=01 (A'B), not both rows B."],
            ["A'C' + BD", False, "Incorrect grouping."]
        ],
        "hint1": "Row AB = 01 contains {4, 5, 6, 7}. This full row quad yields A'B.",
        "hint2": "Remaining minterms are {1, 3, 9, 11}. These are in rows AB = 00, 10 and cols CD = 01, 11. They form quad B'D. Total: A'B + B'D.",
        "finalAnswer": "A'B + B'D",
        "steps": [
            {"title": "Quad 1 (Full Row)", "type": "calculation", "content": "{4, 5, 6, 7} in row AB=01 -> A'B."},
            {"title": "Quad 2 (Wrapping Quad)", "type": "calculation", "content": "{1, 3, 9, 11} in rows 00, 10 and cols 01, 11 -> B'D."},
            {"title": "Minimal SOP", "type": "calculation", "content": "F = A'B + B'D."}
        ],
        "fastShortcut": "Row quad A'B + wrapping quad B'D.",
        "verification": "Verified by booleanEngine minimizeKMap([1, 3, 4, 5, 6, 7, 9, 11])."
    },
    {
        "id": "u2-q112",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: K-Map POS Octet of Zeros",
        "difficulty": "Hard",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "In a 4-variable K-Map, minimize the POS function F(A, B, C, D) = \u03A0 M(0, 1, 4, 5, 8, 9, 12, 13) by grouping the 0-cells.",
        "promptDetail": "Group the 8 zeros in columns CD = 00 and 01 and derive the minimal maxterm.",
        "inputFormatHint": "Enter minimal maxterm, e.g. C",
        "correctAnswer": "C",
        "acceptedAnswers": ["C", "c"],
        "options": [
            ["C", True, None],
            ["C'", False, "In maxterms, binary 0 maps to uncomplemented literal C."],
            ["D", False, "Variable D toggles between 0 and 1."],
            ["A + B", False, "Rows A and B eliminate completely."]
        ],
        "hint1": "0-cells are located on the left two columns (CD = 00 and 01) across all 4 rows.",
        "hint2": "An 8-cell octet of 0s eliminates 3 variables. In columns 00 and 01, D toggles, C is constant 0. In POS convention, 0 maps to uncomplemented literal C. Result: C.",
        "finalAnswer": "C",
        "steps": [
            {"title": "Octet of Zeros", "type": "calculation", "content": "The 8 maxterms form a 4x2 octet in columns CD=00 and 01."},
            {"title": "Maxterm Polarity", "type": "axiom", "content": "C = 0 is constant across the octet. By maxterm rules, 0 -> uncomplemented literal C. Minimal POS: C."}
        ],
        "fastShortcut": "Octet of 0s with C=0 yields maxterm C.",
        "verification": "Truth table: evaluates to 0 when C=0."
    },
    {
        "id": "u2-q113",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 3-Variable POS Grouping of Zeros",
        "difficulty": "Hard",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "In a 3-variable K-Map for (A, B, C), minimize the POS function F(A, B, C) = \u03A0 M(1, 3, 5, 7) by grouping 0-cells.",
        "promptDetail": "Group the 4 zeros in columns BC = 01 and 11 and apply maxterm polarity.",
        "inputFormatHint": "Enter minimal maxterm, e.g. C'",
        "correctAnswer": "C'",
        "acceptedAnswers": ["C'", "c'", "not C"],
        "options": [
            ["C'", True, None],
            ["C", False, "In maxterms, binary 1 maps to complemented literal C'."],
            ["B'", False, "Variable B toggles between 0 and 1."],
            ["A'", False, "Variable A is eliminated."]
        ],
        "hint1": "0-cells occupy columns BC = 01 and 11.",
        "hint2": "Variables A and B eliminate. Variable C is constant 1 across the quad. In maxterms, 1 maps to C'. Result: C'.",
        "finalAnswer": "C'",
        "steps": [
            {"title": "Quad of Zeros", "type": "calculation", "content": "Zeros at {1, 3, 5, 7} form a 2x2 quad in columns where C = 1."},
            {"title": "Maxterm Rule", "type": "axiom", "content": "C = 1 maps to complemented literal C'. Minimal POS: C'."}
        ],
        "fastShortcut": "Quad of 0s with C=1 yields maxterm C'.",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q114",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Don't-Care Minimization",
        "difficulty": "Hard",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(0, 2, 8, 10) + d(5, 7, 13, 15).",
        "promptDetail": "Evaluate whether any don't-care cells help enlarge the corner quad.",
        "inputFormatHint": "Enter minimal SOP, e.g. B'D'",
        "correctAnswer": "B'D'",
        "acceptedAnswers": ["B'D'", "B'*D'", "D'B'"],
        "options": [
            ["B'D'", True, None],
            ["B'D' + BD", False, "Grouped the don't-cares unnecessarily; don't-cares contain no 1-cells to cover."],
            ["A'B' + AB", False, "Incorrect minterm assignment."],
            ["0", False, "Minterms {0, 2, 8, 10} must be covered."]
        ],
        "hint1": "Active 1-cells are the four corners: {0, 2, 8, 10}. These form a quad yielding B'D'.",
        "hint2": "Don't-cares are the center cells {5, 7, 13, 15}. Can they merge with the four corners? No. If we circle them, we add term BD without covering any new 1-cells. Therefore leave don't-cares as 0: F = B'D'.",
        "finalAnswer": "B'D'",
        "steps": [
            {"title": "Corner Quad", "type": "calculation", "content": "Minterms {0, 2, 8, 10} form an essential corner quad -> B'D'."},
            {"title": "Don't-Care Evaluation", "type": "axiom", "content": "Don't-cares {5, 7, 13, 15} cannot combine with the corners to form an octet. Circling them would add redundant term BD. Leaving them as 0 preserves minimal SOP: B'D'."}
        ],
        "fastShortcut": "Don't-cares that do not expand active 1-cell groups are ignored: F = B'D'.",
        "verification": "Verified by booleanEngine minimizeKMap([0, 2, 8, 10], [5, 7, 13, 15])."
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
            ["Their binary coordinates differ in 2 bit positions (Hamming distance = 2), preventing elimination of a variable", True, None],
            ["Diagonal grouping is only allowed in 4-variable maps", False, "Diagonal grouping is strictly forbidden in all Karnaugh maps."],
            ["Cell m5 is an odd number and cannot combine with an even number", False, "Numerical parity is irrelevant; binary adjacency is the criterion."],
            ["Minterm m0 must always be grouped with m1", False, "m0 can combine with any adjacent cell (m1, m2, m4)."]
        ],
        "hint1": "m0 = 000. m5 = 101.",
        "hint2": "Bit A changes (0 -> 1). Bit C changes (0 -> 1). Bit B is 0 in both. Since 2 bits change, they cannot be combined algebraically: A'B'C' + AB'C = B'(A'C' + AC), which cannot eliminate a variable.",
        "finalAnswer": "Their binary coordinates differ in 2 bit positions (Hamming distance = 2), preventing elimination of a variable",
        "steps": [
            {"title": "Bit Difference", "type": "calculation", "content": "m0 = 0 0 0. m5 = 1 0 1. Bit A differs and Bit C differs. Hamming distance = 2."},
            {"title": "Algebraic Constraint", "type": "axiom", "content": "Variable elimination requires x + x' = 1, which demands Hamming distance = 1. Diagonal cells differ in >= 2 bits and can never be grouped directly."}
        ],
        "fastShortcut": "Diagonal cells differ by 2 bits and cannot eliminate a variable.",
        "verification": "Switching algebra adjacency condition."
    },
    {
        "id": "u2-q116",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Don't-Care Quad Merging",
        "difficulty": "Challenge",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(1, 3, 7, 11, 15) + d(0, 2, 5).",
        "promptDetail": "Use don't-cares d(0, 2, 5) to expand groups into larger quads.",
        "inputFormatHint": "Enter minimal SOP, e.g. CD + A'D",
        "correctAnswer": "CD + A'D",
        "acceptedAnswers": ["CD + A'D", "A'D + CD", "CD+A'D", "A'D+CD", "CD + A'B'"],
        "options": [
            ["CD + A'D", True, None],
            ["CD + A'B'C'", False, "Under-grouped minterm m1."],
            ["C'D + AB", False, "Incorrect column coordinates."],
            ["CD + A'B'", False, "Valid alternative cover, but CD + A'D is standard minimal cover."]
        ],
        "hint1": "Minterms {3, 7, 11, 15} are in column CD = 11 across all 4 rows. This forms column quad CD.",
        "hint2": "Remaining minterm is m1 (0001). Using d(0), d(2) allows quad {0, 1, 2, 3} -> A'B'. Alternatively, using d(5) with {1, 3, 7} gives quad {1, 3, 5, 7} -> A'D. Both yield 2 quads (4 literals total).",
        "finalAnswer": "CD + A'D",
        "steps": [
            {"title": "Group 1", "type": "calculation", "content": "{3, 7, 11, 15} is a vertical column quad -> CD."},
            {"title": "Group 2", "type": "calculation", "content": "Minterm m1 combines with {3, 7} and d(5) to form quad {1, 3, 5, 7} -> A'D."},
            {"title": "Minimal SOP", "type": "calculation", "content": "F = CD + A'D."}
        ],
        "fastShortcut": "Column quad CD + center/top quad A'D.",
        "verification": "Verified by booleanEngine minimizeKMap([1, 3, 7, 11, 15], [0, 2, 5])."
    },
    {
        "id": "u2-q117",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: Complex 4-Variable Don't-Care Optimization",
        "difficulty": "Challenge",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(2, 3, 6, 7, 8, 10, 11) + d(0, 1).",
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
            ["A'C + B'D' + AB'", True, None],
            ["A'C + B'D'", False, "Fails to cover minterm m11 (1011)."],
            ["C + B'", False, "Over-reduced."],
            ["A'B + CD", False, "Incorrect minterm assignment."]
        ],
        "hint1": "{2, 3, 6, 7} forms quad in rows AB = 00, 01 and cols CD = 11, 10 -> A'C.",
        "hint2": "Minterms {8, 10} with {2} and d(0) form corner quad {0, 2, 8, 10} -> B'D'. Remaining minterm m11 (1011) groups with {8, 10, d(0)...} as quad {8, 9, 10, 11}? No, m9 is not 1. {8, 10, 11} + d(0)? {8, 10} and {10, 11} -> AB'.",
        "finalAnswer": "A'C + B'D' + AB'",
        "steps": [
            {"title": "Quad 1", "type": "calculation", "content": "{2, 3, 6, 7} -> A'C."},
            {"title": "Quad 2", "type": "calculation", "content": "{0, 2, 8, 10} using d(0) -> B'D'."},
            {"title": "Pair/Quad 3", "type": "calculation", "content": "Minterms {8, 10, 11} and d(0)? Row AB=10 has m8, m10, m11 and d... pair/quad gives AB'. Total: A'C + B'D' + AB'."}
        ],
        "fastShortcut": "A'C + B'D' + AB'.",
        "verification": "Truth table evaluation."
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
        "acceptedAnswers": ["B'D' (the four-corner quad)", "B'D'", "corner quad", "b'd'"],
        "options": [
            ["B'D' (the four-corner quad)", True, None],
            ["A'B' (the top row quad)", False, "Top row contains m0, m1, m2, m3; does not contain m8."],
            ["A'D (the center quad)", False, "Center quad covers m1, m5, m7; does not contain m8."],
            ["AB' (the bottom row pair)", False, "Does not form a prime implicant covering m8 uniquely."]
        ],
        "hint1": "Cell m8 is 1000 (bottom-left corner). What cells are adjacent to m8? Only m0 (top-left) and m10 (bottom-right).",
        "hint2": "The only prime implicant covering m8 is the corner quad {m0, m2, m8, m10} = B'D'. Because m8 is covered by no other prime implicant, B'D' is essential.",
        "finalAnswer": "B'D' (the four-corner quad)",
        "steps": [
            {"title": "Minterm 8 Neighbors", "type": "calculation", "content": "m8 (1000) has 1s only at m0 (0000) and m10 (1010)."},
            {"title": "Corner Quad", "type": "axiom", "content": "Cells {0, 2, 8, 10} form quad B'D'. Because m8 has no other valid group, B'D' is an Essential Prime Implicant."}
        ],
        "fastShortcut": "m8 is covered uniquely by the four corners B'D'.",
        "verification": "Prime implicant essentiality definition."
    },
    {
        "id": "u2-q119",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable POS Two-Row Minimization",
        "difficulty": "Challenge",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Minimize in POS form: F(A, B, C, D) = \u03A0 M(4, 5, 6, 7, 8, 9, 10, 11).",
        "promptDetail": "Group the two separate 4-cell rows of zeros and derive the minimal product of sums.",
        "inputFormatHint": "Enter minimal POS, e.g. (A + B')(A' + B)",
        "correctAnswer": "(A + B')(A' + B)",
        "acceptedAnswers": [
            "(A + B')(A' + B)",
            "(A+B')(A'+B)",
            "(A' + B)(A + B')"
        ],
        "options": [
            ["(A + B')(A' + B)", True, None],
            ["(A + B)(A' + B')", False, "This is row 00 and row 11."],
            ["A \u2295 B", False, "Converted to SOP representation."],
            ["A'B + AB'", False, "This is SOP, not POS."]
        ],
        "hint1": "0-cells are located in row AB = 01 (M4..M7) and row AB = 10 (M8..M11).",
        "hint2": "In row AB = 01: A=0, B=1 -> maxterm is (A + B'). In row AB = 10: A=1, B=0 -> maxterm is (A' + B). Result: (A + B')(A' + B).",
        "finalAnswer": "(A + B')(A' + B)",
        "steps": [
            {"title": "Row 01 Group of Zeros", "type": "calculation", "content": "AB = 01 across all 4 columns -> maxterm (A + B')."},
            {"title": "Row 10 Group of Zeros", "type": "calculation", "content": "AB = 10 across all 4 columns -> maxterm (A' + B)."},
            {"title": "Minimal POS", "type": "calculation", "content": "F = (A + B')(A' + B) (XNOR in POS form)."}
        ],
        "fastShortcut": "Row 01 (A+B') and Row 10 (A'+B) in POS gives (A + B')(A' + B).",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q120",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: Checkerboard Singleton Minimization",
        "difficulty": "Challenge",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "In a 3-variable K-Map, the odd-parity function F(A, B, C) = \u03A3 m(1, 2, 4, 7) displays a checkerboard pattern. What is the minimal SOP expression?",
        "promptDetail": "Verify whether any two 1-cells are adjacent.",
        "inputFormatHint": "Enter SOP sum of all 4 minterm products",
        "correctAnswer": "A'B'C + A'BC' + AB'C' + ABC",
        "acceptedAnswers": [
            "A'B'C + A'BC' + AB'C' + ABC",
            "A \u2295 B \u2295 C",
            "m1 + m2 + m4 + m7"
        ],
        "options": [
            ["A'B'C + A'BC' + AB'C' + ABC", True, None],
            ["A + B + C", False, "Minterms cannot be grouped into single literals."],
            ["A'B + BC' + CA", False, "Adjacent grouping is impossible in checkerboard patterns."],
            ["AB + BC + CA", False, "This is the majority function."]
        ],
        "hint1": "Inspect cell coordinates: m1 (001), m2 (010), m4 (100), m7 (111).",
        "hint2": "Every pair of these minterms differs in at least 2 bit positions. Zero adjacent cells exist. Each 1-cell must remain an isolated 1-cell group (singleton).",
        "finalAnswer": "A'B'C + A'BC' + AB'C' + ABC",
        "steps": [
            {"title": "Adjacency Audit", "type": "calculation", "content": "Distance between m1 and m2 is 2. Distance between m1 and m4 is 2. Distance between m1 and m7 is 2. No two 1-cells share an edge."},
            {"title": "Singleton Cover", "type": "axiom", "content": "All 4 minterms are essential singletons. Minimal SOP: A'B'C + A'BC' + AB'C' + ABC."}
        ],
        "fastShortcut": "Checkerboard pattern has 0 adjacent 1s; all minterms are essential singletons.",
        "verification": "Truth table check for 3-input XOR."
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
        "acceptedAnswers": ["0", "zero", "none"],
        "options": [
            ["0", True, None],
            ["3", False, "3 is the number of prime implicants in a minimal cover, but none are essential."],
            ["6", False, "6 is the total number of prime implicants in the cycle."],
            ["2", False, "Incorrect count."]
        ],
        "hint1": "Recall the definition: An Essential Prime Implicant must cover at least one minterm that is covered by NO other prime implicant.",
        "hint2": "In a cyclic chart, every minterm has column count >= 2 (covered by at least 2 PIs). Therefore NO minterm is uniquely covered, so exactly 0 EPIs exist.",
        "finalAnswer": "0",
        "steps": [
            {"title": "Essentiality Criterion", "type": "axiom", "content": "A prime implicant is essential if and only if there exists a minterm row with a single 'X' in that column."},
            {"title": "Cyclic Condition", "type": "axiom", "content": "In a cyclic chart, every row contains at least two 'X' marks. Thus no uniquely covered minterm exists, and the number of Essential Prime Implicants is exactly 0."}
        ],
        "fastShortcut": "Cyclic charts have 0 Essential Prime Implicants (requires Petrick's method).",
        "verification": "Petrick's method and Quine-McCluskey cyclic core theorem."
    },
    {
        "id": "u2-q122",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Overlapping Quad Minimization",
        "difficulty": "Challenge",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(0, 1, 2, 8, 9, 10).",
        "promptDetail": "Form two overlapping 4-cell wrapping quads.",
        "inputFormatHint": "Enter minimal SOP, e.g. B'C' + B'D'",
        "correctAnswer": "B'C' + B'D'",
        "acceptedAnswers": ["B'C' + B'D'", "B'D' + B'C'", "B'C'+B'D'", "B'D'+B'C'"],
        "options": [
            ["B'C' + B'D'", True, None],
            ["B'C' + B'D", False, "m2 and m10 have D=0, so literal is D', not D."],
            ["A'B' + AB'", False, "This would cover {0, 1, 2, 3, 8, 9, 10, 11}."],
            ["B' + C'D'", False, "Over-reduced."]
        ],
        "hint1": "Quad 1: {0, 1, 8, 9} wraps rows AB = 00 and 10 in columns CD = 00, 01 -> B'C'.",
        "hint2": "Quad 2: {0, 2, 8, 10} wraps rows AB = 00 and 10 in columns CD = 00, 10 (the 4 corners) -> B'D'. Minimal SOP: B'C' + B'D'.",
        "finalAnswer": "B'C' + B'D'",
        "steps": [
            {"title": "Quad 1 (Top-Bottom Left)", "type": "calculation", "content": "{0, 1, 8, 9} -> B'C'."},
            {"title": "Quad 2 (Four Corners)", "type": "calculation", "content": "{0, 2, 8, 10} -> B'D'."},
            {"title": "Minimal SOP", "type": "calculation", "content": "F = B'C' + B'D'."}
        ],
        "fastShortcut": "Two overlapping wrapping quads: B'C' + B'D'.",
        "verification": "Verified by booleanEngine minimizeKMap([0, 1, 2, 8, 9, 10])."
    },
    {
        "id": "u2-q123",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Leftmost Column Quad",
        "difficulty": "Challenge",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "In a 4-variable K-Map for (A, B, C, D), minimize: F(A, B, C, D) = \u03A3 m(0, 4, 8, 12).",
        "promptDetail": "Identify the 4-cell group covering column CD = 00 across all 4 rows.",
        "inputFormatHint": "Enter product term, e.g. C'D'",
        "correctAnswer": "C'D'",
        "acceptedAnswers": ["C'D'", "C'*D'", "D'C'", "c'd'"],
        "options": [
            ["C'D'", True, None],
            ["CD", False, "Column CD = 11 yields CD."],
            ["A'B'", False, "Row AB = 00 yields A'B'."],
            ["C + D", False, "Incorrect sum form."]
        ],
        "hint1": "Minterm codes: 0 (0000), 4 (0100), 8 (1000), 12 (1100).",
        "hint2": "All 4 minterms have C = 0 and D = 0. All 4 combinations of A and B are present and eliminate. Result: C'D'.",
        "finalAnswer": "C'D'",
        "steps": [
            {"title": "Column Quad", "type": "calculation", "content": "Cells {0, 4, 8, 12} comprise the entire leftmost column CD = 00."},
            {"title": "Elimination", "type": "axiom", "content": "A and B eliminate completely. Invariant literals are C'D'."}
        ],
        "fastShortcut": "Leftmost column in 4-var K-Map simplifies to C'D'.",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q124",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable Disjoint Dual Quads",
        "difficulty": "Challenge",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(0, 1, 4, 5, 10, 11, 14, 15).",
        "promptDetail": "Identify the two 4-cell quads in the top-left and bottom-right blocks.",
        "inputFormatHint": "Enter minimal SOP, e.g. A'C' + AC",
        "correctAnswer": "A'C' + AC",
        "acceptedAnswers": ["A'C' + AC", "AC + A'C'", "A'C'+AC", "AC+A'C'"],
        "options": [
            ["A'C' + AC", True, None],
            ["A'D' + AD", False, "Minterms correspond to variables A and C, not A and D."],
            ["A \u2295 C", False, "This function is A \u2299 C (XNOR), not XOR."],
            ["B'D' + BD", False, "Minterms are aligned with rows A and columns C."]
        ],
        "hint1": "Top-left block {0, 1, 4, 5}: rows AB = 00, 01 (A=0 -> A'); cols CD = 00, 01 (C=0 -> C'). Term is A'C'.",
        "hint2": "Bottom-right block {10, 11, 14, 15}: rows AB = 10, 11 (A=1 -> A); cols CD = 11, 10 (C=1 -> C). Term is AC. Result: A'C' + AC.",
        "finalAnswer": "A'C' + AC",
        "steps": [
            {"title": "Quad 1 (Top-Left Block)", "type": "calculation", "content": "{0, 1, 4, 5} -> A'C'."},
            {"title": "Quad 2 (Bottom-Right Block)", "type": "calculation", "content": "{10, 11, 14, 15} -> AC."},
            {"title": "Minimal SOP", "type": "calculation", "content": "F = A'C' + AC (A \u2299 C)."}
        ],
        "fastShortcut": "Top-left quad (A'C') + bottom-right quad (AC) = A'C' + AC.",
        "verification": "Verified by booleanEngine minimizeKMap([0, 1, 4, 5, 10, 11, 14, 15])."
    },
    {
        "id": "u2-q125",
        "trackId": "sec25",
        "trackTitle": "Section 2.5: Karnaugh Map Minimization",
        "topicBadge": "2.5: 4-Variable 3-Group University Challenge",
        "difficulty": "Challenge",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Minimize the 4-variable function: F(A, B, C, D) = \u03A3 m(0, 2, 3, 5, 7, 8, 10, 11, 15).",
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
            ["B'D' + CD + A'BD", True, None],
            ["B'D' + CD", False, "Fails to cover minterm m5 (0101)."],
            ["B'D' + CD + BC", False, "Minterm m5 is not covered by BC."],
            ["A'C + B'D' + BD", False, "Incorrect grouping."]
        ],
        "hint1": "Corner quad: {0, 2, 8, 10} -> B'D'. Covers {0, 2, 8, 10}.",
        "hint2": "Column quad: {3, 7, 11, 15} is column CD = 11 across all rows -> CD. Remaining minterm is m5 (0101). m5 pairs with m7 (0111) in row AB=01 -> A'BD. Result: B'D' + CD + A'BD.",
        "finalAnswer": "B'D' + CD + A'BD",
        "steps": [
            {"title": "Group 1 (Four Corners)", "type": "calculation", "content": "{0, 2, 8, 10} -> B'D'."},
            {"title": "Group 2 (Vertical Column Quad)", "type": "calculation", "content": "{3, 7, 11, 15} -> CD."},
            {"title": "Group 3 (Row Pair)", "type": "calculation", "content": "Minterm m5 combines with m7 to form pair {5, 7} -> A'BD."},
            {"title": "Minimal SOP", "type": "calculation", "content": "F = B'D' + CD + A'BD."}
        ],
        "fastShortcut": "Corner quad B'D' + column quad CD + pair A'BD.",
        "verification": "Verified by booleanEngine minimizeKMap([0, 2, 3, 5, 7, 8, 10, 11, 15])."
    }
]

print(f"Loaded {len(sec25_questions)} Section 2.5 questions.")
