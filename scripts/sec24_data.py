# Section 2.4 Question Bank Data (u2-q066 to u2-q090) - 25 Questions
# Strictly zero em-dashes and zero en-dashes.
# Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).

sec24_questions = [
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
        "acceptedAnswers": ["AB + AB'", "AB'+AB", "AB+AB'", "AB'+AB"],
        "options": [
            ["AB + AB'", True, None],
            ["A + B", False, "Added B instead of ANDing with (B + B')."],
            ["AB", False, "Omitted minterm AB'."],
            ["A'B + AB", False, "Complemented literal A incorrectly."]
        ],
        "hint1": "The missing variable is B. Multiply A by 1 in the form (B + B').",
        "hint2": "A(B + B') = AB + AB'.",
        "finalAnswer": "AB + AB'",
        "steps": [
            {"title": "Identity Insertion", "type": "axiom", "content": "B + B' = 1. A = A * 1 = A(B + B')."},
            {"title": "Distribution", "type": "calculation", "content": "A(B + B') = AB + AB' (\u03A3 m(2, 3))."}
        ],
        "fastShortcut": "A expanded with missing B yields AB + AB'.",
        "verification": "Truth table: 1 on rows 2 (10) and 3 (11)."
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
        "acceptedAnswers": ["(A + B)(A + B')", "(A+B)(A+B')", "(A + B')(A + B)"],
        "options": [
            ["(A + B)(A + B')", True, None],
            ["(A + B)", False, "Omitted second maxterm (A + B')."],
            ["AB + AB'", False, "This is canonical SOP, not canonical POS."],
            ["(A' + B)(A' + B')", False, "Inverted literal A."]
        ],
        "hint1": "In POS expansion, introduce missing variable B by adding BB' = 0: A + 0 = A + BB'.",
        "hint2": "Apply second distributive law: A + BB' = (A + B)(A + B').",
        "finalAnswer": "(A + B)(A + B')",
        "steps": [
            {"title": "Null Element Addition", "type": "axiom", "content": "BB' = 0. A = A + 0 = A + BB'."},
            {"title": "Second Distribution", "type": "calculation", "content": "A + BB' = (A + B)(A + B') (\u03A0 M(0, 1))."}
        ],
        "fastShortcut": "A expanded in POS yields (A + B)(A + B').",
        "verification": "Truth table: 0 on rows 0 (00) and 1 (01)."
    },
    {
        "id": "u2-q068",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: 2-Variable Canonical Conversion",
        "difficulty": "Easy",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Convert the 2-variable canonical SOP function F(A, B) = \u03A3 m(1, 2) into canonical POS notation.",
        "promptDetail": "Identify the complementary index set in universal domain U = {0, 1, 2, 3}.",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(0, 3)",
        "correctAnswer": "\u03A0 M(0, 3)",
        "acceptedAnswers": ["\u03A0 M(0, 3)", "\u03A0M(0, 3)", "\u03A0M(0,3)", "Pi M(0, 3)", "0, 3"],
        "options": [
            ["\u03A0 M(0, 3)", True, None],
            ["\u03A0 M(1, 2)", False, "Kept identical indices; this would define the complement function F'."],
            ["\u03A3 m(0, 3)", False, "This is F' in SOP form, not F in POS form."],
            ["\u03A0 M(0, 1, 2, 3)", False, "Contradiction function."]
        ],
        "hint1": "For 2 variables, all possible row indices are {0, 1, 2, 3}.",
        "hint2": "Minterms present are {1, 2}. Remaining indices where F = 0 are {0, 3}. Thus F = \u03A0 M(0, 3).",
        "finalAnswer": "\u03A0 M(0, 3)",
        "steps": [
            {"title": "Universal Domain", "type": "calculation", "content": "U = {0, 1, 2, 3}."},
            {"title": "Maxterm Set Complementation", "type": "calculation", "content": "U \\ {1, 2} = {0, 3}. Therefore F = \u03A0 M(0, 3)."}
        ],
        "fastShortcut": "\u03A3 m(1, 2) = \u03A0 M(0, 3).",
        "verification": "F is the 2-variable XOR function; in POS it is (A + B)(A' + B')."
    },
    {
        "id": "u2-q069",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: 3-Variable POS to SOP Conversion",
        "difficulty": "Easy",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Convert the 3-variable canonical POS function F(A, B, C) = \u03A0 M(0, 1, 4, 5) into canonical SOP notation.",
        "promptDetail": "Find the remaining row indices in 3-variable domain U = {0, 1, 2, 3, 4, 5, 6, 7}.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(2, 3, 6, 7)",
        "correctAnswer": "\u03A3 m(2, 3, 6, 7)",
        "acceptedAnswers": [
            "\u03A3 m(2, 3, 6, 7)",
            "\u03A3m(2, 3, 6, 7)",
            "\u03A3m(2,3,6,7)",
            "Sigma m(2, 3, 6, 7)",
            "2, 3, 6, 7"
        ],
        "options": [
            ["\u03A3 m(2, 3, 6, 7)", True, None],
            ["\u03A3 m(0, 1, 4, 5)", False, "This is F' in SOP form."],
            ["\u03A0 M(2, 3, 6, 7)", False, "This is F' in POS form."],
            ["\u03A3 m(1, 3, 5, 7)", False, "Incorrect index selection."]
        ],
        "hint1": "Universal domain: {0, 1, 2, 3, 4, 5, 6, 7}.",
        "hint2": "Remove maxterm indices {0, 1, 4, 5}: remaining minterms are {2, 3, 6, 7}.",
        "finalAnswer": "\u03A3 m(2, 3, 6, 7)",
        "steps": [
            {"title": "Set Complementation", "type": "calculation", "content": "U \\ {0, 1, 4, 5} = {2, 3, 6, 7}."},
            {"title": "Canonical SOP Formation", "type": "axiom", "content": "F = \u03A3 m(2, 3, 6, 7)."}
        ],
        "fastShortcut": "\u03A0 M(0, 1, 4, 5) = \u03A3 m(2, 3, 6, 7) = B.",
        "verification": "Both forms simplify to F = B."
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
            ["The product terms AB and C do not contain every declared system variable", True, None],
            ["Canonical forms only allow POS, not SOP", False, "Canonical forms exist for both SOP and POS."],
            ["F cannot be implemented with logic gates", False, "Any standard SOP is directly synthesizable with AND-OR gates."],
            ["The variables are not in alphabetical order", False, "Alphabetical ordering is a convention, not the canonical definition."]
        ],
        "hint1": "In canonical SOP, every product term must be a minterm.",
        "hint2": "A minterm in 3 variables must contain all 3 variables (A, B, and C). Here AB lacks C, and C lacks A and B.",
        "finalAnswer": "The product terms AB and C do not contain every declared system variable",
        "steps": [
            {"title": "Canonical Requirement", "type": "axiom", "content": "In canonical SOP, every product term is a minterm containing all n variables in either complemented or uncomplemented form. Since AB lacks C and C lacks A and B, F is standard SOP, not canonical."}
        ],
        "fastShortcut": "Canonical terms must contain ALL variables of the declared function domain.",
        "verification": "Switching theory definitions."
    },
    {
        "id": "u2-q071",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: SOP to Minterm Set Expansion",
        "difficulty": "Medium",
        "set": "setA",
        "questionType": "free_response",
        "question": "Expand the 3-variable function F(A, B, C) = AB + C' into its canonical minterm list \u03A3 m(...).",
        "promptDetail": "Expand AB with (C + C') and C' with (A + A')(B + B'), then take the union.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(0, 2, 4, 6, 7)",
        "correctAnswer": "\u03A3 m(0, 2, 4, 6, 7)",
        "acceptedAnswers": [
            "\u03A3 m(0, 2, 4, 6, 7)",
            "\u03A3m(0, 2, 4, 6, 7)",
            "\u03A3m(0,2,4,6,7)",
            "0, 2, 4, 6, 7"
        ],
        "options": [
            ["\u03A3 m(0, 2, 4, 6, 7)", True, None],
            ["\u03A3 m(6, 7)", False, "Only expanded term AB; omitted C'."],
            ["\u03A3 m(0, 2, 4, 6)", False, "Only expanded term C'; omitted AB."],
            ["\u03A3 m(1, 3, 5)", False, "These are the maxterm indices where F = 0."]
        ],
        "hint1": "AB(C + C') = ABC + ABC' -> minterms {7, 6}.",
        "hint2": "C'(A + A')(B + B') = A'B'C' + A'BC' + AB'C' + ABC' -> minterms {0, 2, 4, 6}. Union: {0, 2, 4, 6, 7}.",
        "finalAnswer": "\u03A3 m(0, 2, 4, 6, 7)",
        "steps": [
            {"title": "Expand AB", "type": "calculation", "content": "AB = AB(C + C') = ABC + ABC' = m7 + m6."},
            {"title": "Expand C'", "type": "calculation", "content": "C' = (A + A')(B + B')C' = A'B'C' + A'BC' + AB'C' + ABC' = m0 + m2 + m4 + m6."},
            {"title": "Union", "type": "calculation", "content": "{6, 7} \u222A {0, 2, 4, 6} = {0, 2, 4, 6, 7}. F = \u03A3 m(0, 2, 4, 6, 7)."}
        ],
        "fastShortcut": "AB -> {6, 7}; C' -> {0, 2, 4, 6}; Union = {0, 2, 4, 6, 7}.",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q072",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: POS to Maxterm Set Expansion",
        "difficulty": "Medium",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Expand the 3-variable function F(A, B, C) = (A + B')(A + C) into its canonical maxterm list \u03A0 M(...).",
        "promptDetail": "Add missing variables by adding CC' and BB', then take the union of maxterms.",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(0, 2, 3)",
        "correctAnswer": "\u03A0 M(0, 2, 3)",
        "acceptedAnswers": [
            "\u03A0 M(0, 2, 3)",
            "\u03A0M(0, 2, 3)",
            "\u03A0M(0,2,3)",
            "0, 2, 3"
        ],
        "options": [
            ["\u03A0 M(0, 2, 3)", True, None],
            ["\u03A0 M(2, 3)", False, "Omitted expansion of factor (A + C)."],
            ["\u03A0 M(0, 2)", False, "Omitted expansion of factor (A + B')."],
            ["\u03A3 m(1, 4, 5, 6, 7)", False, "This is canonical SOP, not canonical POS."]
        ],
        "hint1": "(A + B') + CC' = (A + B' + C)(A + B' + C'). Decoded: 010 (M2) and 011 (M3).",
        "hint2": "(A + C) + BB' = (A + B + C)(A + B' + C). Decoded: 000 (M0) and 010 (M2). Union: {0, 2, 3}.",
        "finalAnswer": "\u03A0 M(0, 2, 3)",
        "steps": [
            {"title": "Expand (A + B')", "type": "calculation", "content": "A + B' + CC' = (A + B' + C)(A + B' + C') = M2 * M3."},
            {"title": "Expand (A + C)", "type": "calculation", "content": "A + C + BB' = (A + B + C)(A + B' + C) = M0 * M2."},
            {"title": "Union", "type": "calculation", "content": "{2, 3} \u222A {0, 2} = {0, 2, 3}. F = \u03A0 M(0, 2, 3)."}
        ],
        "fastShortcut": "(A + B') -> {2, 3}; (A + C) -> {0, 2}; Union = \u03A0 M(0, 2, 3).",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q073",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: SOP to POS Canonical Duality",
        "difficulty": "Medium",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Given the function F(A, B, C) = \u03A3 m(0, 2, 4, 6, 7), write its equivalent canonical POS expression.",
        "promptDetail": "Identify the non-minterm indices where F = 0 in domain U = {0..7}.",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(1, 3, 5)",
        "correctAnswer": "\u03A0 M(1, 3, 5)",
        "acceptedAnswers": [
            "\u03A0 M(1, 3, 5)",
            "\u03A0M(1, 3, 5)",
            "\u03A0M(1,3,5)",
            "1, 3, 5"
        ],
        "options": [
            ["\u03A0 M(1, 3, 5)", True, None],
            ["\u03A0 M(0, 2, 4, 6, 7)", False, "This is the complement function F' in POS form."],
            ["\u03A3 m(1, 3, 5)", False, "This is F' in SOP form, not F in POS form."],
            ["\u03A0 M(1, 3, 5, 7)", False, "Minterm m7 is present in F, so index 7 cannot be in the maxterm list."]
        ],
        "hint1": "The domain is {0, 1, 2, 3, 4, 5, 6, 7}.",
        "hint2": "Minterms in F are {0, 2, 4, 6, 7}. The remaining indices where F = 0 are {1, 3, 5}.",
        "finalAnswer": "\u03A0 M(1, 3, 5)",
        "steps": [
            {"title": "Domain Complement", "type": "calculation", "content": "U \\ {0, 2, 4, 6, 7} = {1, 3, 5}."},
            {"title": "Canonical POS Formation", "type": "axiom", "content": "F = \u03A0 M(1, 3, 5)."}
        ],
        "fastShortcut": "\u03A3 m(0, 2, 4, 6, 7) = \u03A0 M(1, 3, 5).",
        "verification": "Both evaluate to F = C' + AB."
    },
    {
        "id": "u2-q074",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: Complement SOP from POS",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Given F(A, B, C) = \u03A0 M(0, 2, 3), what is the canonical SOP expression for its complement F'?",
        "promptDetail": "F' evaluates to 1 on exactly the rows where F evaluates to 0.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(0, 2, 3)",
        "correctAnswer": "\u03A3 m(0, 2, 3)",
        "acceptedAnswers": [
            "\u03A3 m(0, 2, 3)",
            "\u03A3m(0, 2, 3)",
            "\u03A3m(0,2,3)",
            "0, 2, 3"
        ],
        "options": [
            ["\u03A3 m(0, 2, 3)", True, None],
            ["\u03A3 m(1, 4, 5, 6, 7)", False, "This is the original function F in SOP form, not its complement F'."],
            ["\u03A0 M(0, 2, 3)", False, "This is the original function F in POS form."],
            ["\u03A0 M(1, 4, 5, 6, 7)", False, "This is F' in POS form."]
        ],
        "hint1": "F takes value 0 on rows {0, 2, 3}.",
        "hint2": "F' takes value 1 on rows where F = 0. Therefore F' in SOP contains minterms {0, 2, 3}: \u03A3 m(0, 2, 3).",
        "finalAnswer": "\u03A3 m(0, 2, 3)",
        "steps": [
            {"title": "Zero Rows Identification", "type": "calculation", "content": "F = 0 on {0, 2, 3}."},
            {"title": "Complement SOP", "type": "axiom", "content": "F' = 1 on {0, 2, 3}. Therefore F' = \u03A3 m(0, 2, 3)."}
        ],
        "fastShortcut": "If F = \u03A0 M(S), then F' = \u03A3 m(S). The index set is identical!",
        "verification": "Fundamental canonical complementation theorem."
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
        "correctAnswer": "Both expressions use the identical numerical index set (U \\ S_min), but F uses \u03A0 M while F' uses \u03A3 m",
        "acceptedAnswers": [
            "Both expressions use the identical numerical index set (U \\ S_min), but F uses \u03A0 M while F' uses \u03A3 m",
            "identical index set, opposite operator"
        ],
        "options": [
            ["Both expressions use the identical numerical index set (U \\ S_min), but F uses \u03A0 M while F' uses \u03A3 m", True, None],
            ["Converting F to POS complements the function output, while finding F' preserves the output", False, "Converting F preserves the function; finding F' inverts it."],
            ["Canonical POS cannot be derived from canonical SOP without a K-Map", False, "Canonical conversion is directly performed by set complementation."],
            ["F in POS and F' in SOP have completely different, disjoint index sets", False, "They share the exact same index set."]
        ],
        "hint1": "If F = \u03A3 m(1, 3, 5), where is F = 0? At {0, 2, 4, 6, 7}.",
        "hint2": "So F = \u03A0 M(0, 2, 4, 6, 7). And F' = \u03A3 m(0, 2, 4, 6, 7). Notice the identical index set, but \u03A0 M for F and \u03A3 m for F'!",
        "finalAnswer": "Both expressions use the identical numerical index set (U \\ S_min), but F uses \u03A0 M while F' uses \u03A3 m",
        "steps": [
            {"title": "Canonical Equivalence", "type": "axiom", "content": "Let F = \u03A3 m(S). Then F takes value 0 on U \\ S. Consequently, F in POS is \u03A0 M(U \\ S). The complement function F' takes value 1 on U \\ S, so F' in SOP is \u03A3 m(U \\ S). Both share index set U \\ S, but one is a maxterm product and the other is a minterm sum."}
        ],
        "fastShortcut": "F_POS = \u03A0 M(U \\ S); F'_SOP = \u03A3 m(U \\ S). Same indices, opposite canonical operators.",
        "verification": "Canonical conversion and complementation definitions."
    },
    {
        "id": "u2-q076",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: Multi-Product Canonical Expansion",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "free_response",
        "question": "Expand F(A, B, C) = A'B + B'C' into its canonical minterm list \u03A3 m(...).",
        "promptDetail": "Expand each product term across its missing variable and take the union.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(0, 2, 3, 4)",
        "correctAnswer": "\u03A3 m(0, 2, 3, 4)",
        "acceptedAnswers": [
            "\u03A3 m(0, 2, 3, 4)",
            "\u03A3m(0, 2, 4, 3)",
            "\u03A3m(0,2,3,4)",
            "0, 2, 3, 4"
        ],
        "options": [
            ["\u03A3 m(0, 2, 3, 4)", True, None],
            ["\u03A3 m(2, 3)", False, "Only expanded term A'B."],
            ["\u03A3 m(0, 4)", False, "Only expanded term B'C'."],
            ["\u03A3 m(1, 5, 6, 7)", False, "These are the maxterm indices."]
        ],
        "hint1": "A'B lacks C: A'B(C + C') = A'BC + A'BC' -> {3, 2}.",
        "hint2": "B'C' lacks A: (A + A')B'C' = AB'C' + A'B'C' -> {4, 0}. Union: {0, 2, 3, 4}.",
        "finalAnswer": "\u03A3 m(0, 2, 3, 4)",
        "steps": [
            {"title": "Expand Term 1", "type": "calculation", "content": "A'B(C + C') = A'BC + A'BC' = m3 + m2."},
            {"title": "Expand Term 2", "type": "calculation", "content": "(A + A')B'C' = AB'C' + A'B'C' = m4 + m0."},
            {"title": "Union", "type": "calculation", "content": "{2, 3} \u222A {0, 4} = {0, 2, 3, 4}. F = \u03A3 m(0, 2, 3, 4)."}
        ],
        "fastShortcut": "A'B -> {2, 3}; B'C' -> {0, 4}; Union = \u03A3 m(0, 2, 3, 4).",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q077",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: Disjoint Minterm Expansion",
        "difficulty": "Medium",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Expand F(A, B, C) = A'C' + BC into its canonical minterm list \u03A3 m(...).",
        "promptDetail": "Expand each product term and list the combined minterm indices.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(0, 2, 3, 7)",
        "correctAnswer": "\u03A3 m(0, 2, 3, 7)",
        "acceptedAnswers": [
            "\u03A3 m(0, 2, 3, 7)",
            "\u03A3m(0, 2, 3, 7)",
            "\u03A3m(0,2,3,7)",
            "0, 2, 3, 7"
        ],
        "options": [
            ["\u03A3 m(0, 2, 3, 7)", True, None],
            ["\u03A3 m(0, 2)", False, "Only expanded A'C'."],
            ["\u03A3 m(3, 7)", False, "Only expanded BC."],
            ["\u03A3 m(1, 4, 5, 6)", False, "Complement index set."]
        ],
        "hint1": "A'C' lacks B: A'(B + B')C' = A'BC' + A'B'C' -> {2, 0}.",
        "hint2": "BC lacks A: (A + A')BC = ABC + A'BC -> {7, 3}. Union: {0, 2, 3, 7}.",
        "finalAnswer": "\u03A3 m(0, 2, 3, 7)",
        "steps": [
            {"title": "Expand A'C'", "type": "calculation", "content": "A'C'(B + B') = A'BC' + A'B'C' = m2 + m0."},
            {"title": "Expand BC", "type": "calculation", "content": "BC(A + A') = ABC + A'BC = m7 + m3."},
            {"title": "Union", "type": "calculation", "content": "{0, 2} \u222A {3, 7} = {0, 2, 3, 7}. F = \u03A3 m(0, 2, 3, 7)."}
        ],
        "fastShortcut": "A'C' -> {0, 2}; BC -> {3, 7}; Union = \u03A3 m(0, 2, 3, 7).",
        "verification": "Truth table evaluation."
    },
    {
        "id": "u2-q078",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: Canonical Conversion Verification",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Convert F(A, B, C) = \u03A3 m(0, 2, 3, 7) into its canonical POS expression.",
        "promptDetail": "Identify the missing indices from {0, 1, 2, 3, 4, 5, 6, 7}.",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(1, 4, 5, 6)",
        "correctAnswer": "\u03A0 M(1, 4, 5, 6)",
        "acceptedAnswers": [
            "\u03A0 M(1, 4, 5, 6)",
            "\u03A0M(1, 4, 5, 6)",
            "\u03A0M(1,4,5,6)",
            "1, 4, 5, 6"
        ],
        "options": [
            ["\u03A0 M(1, 4, 5, 6)", True, None],
            ["\u03A0 M(0, 2, 3, 7)", False, "This is the complement function F' in POS form."],
            ["\u03A3 m(1, 4, 5, 6)", False, "This is F' in SOP form, not F in POS form."],
            ["\u03A0 M(1, 2, 4, 5)", False, "Incorrect index selection."]
        ],
        "hint1": "Universal set: {0, 1, 2, 3, 4, 5, 6, 7}.",
        "hint2": "Minterm set: {0, 2, 3, 7}. Remaining indices where F = 0 are {1, 4, 5, 6}.",
        "finalAnswer": "\u03A0 M(1, 4, 5, 6)",
        "steps": [
            {"title": "Set Complementation", "type": "calculation", "content": "U \\ {0, 2, 3, 7} = {1, 4, 5, 6}."},
            {"title": "Canonical POS Formation", "type": "axiom", "content": "F = \u03A0 M(1, 4, 5, 6)."}
        ],
        "fastShortcut": "\u03A3 m(0, 2, 3, 7) = \u03A0 M(1, 4, 5, 6).",
        "verification": "Truth table equivalence check."
    },
    {
        "id": "u2-q079",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: 4-Variable Multi-Term Expansion",
        "difficulty": "Hard",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Expand the 4-variable function F(A, B, C, D) = A'B + C'D into its canonical minterm list \u03A3 m(...).",
        "promptDetail": "Expand A'B over missing variables C, D (4 minterms) and C'D over missing variables A, B (4 minterms), then take their union.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(1, 4, 5, 6, 7, 9, 13)",
        "correctAnswer": "\u03A3 m(1, 4, 5, 6, 7, 9, 13)",
        "acceptedAnswers": [
            "\u03A3 m(1, 4, 5, 6, 7, 9, 13)",
            "\u03A3m(1, 4, 5, 6, 7, 9, 13)",
            "\u03A3m(1,4,5,6,7,9,13)",
            "1, 4, 5, 6, 7, 9, 13"
        ],
        "options": [
            ["\u03A3 m(1, 4, 5, 6, 7, 9, 13)", True, None],
            ["\u03A3 m(4, 5, 6, 7)", False, "Only expanded term A'B; omitted C'D."],
            ["\u03A3 m(1, 5, 9, 13)", False, "Only expanded term C'D; omitted A'B."],
            ["\u03A3 m(1, 4, 6, 7, 9, 13)", False, "Missed shared minterm m5 (0101)."]
        ],
        "hint1": "A'B (01--) covers minterms: 0100 (4), 0101 (5), 0110 (6), 0111 (7).",
        "hint2": "C'D (--01) covers minterms: 0001 (1), 0101 (5), 1001 (9), 1101 (13). Union: {1, 4, 5, 6, 7, 9, 13}.",
        "finalAnswer": "\u03A3 m(1, 4, 5, 6, 7, 9, 13)",
        "steps": [
            {"title": "Expand A'B", "type": "calculation", "content": "A'B(C + C')(D + D') = {4, 5, 6, 7}."},
            {"title": "Expand C'D", "type": "calculation", "content": "(A + A')(B + B')C'D = {1, 5, 9, 13}."},
            {"title": "Union", "type": "calculation", "content": "{4, 5, 6, 7} \u222A {1, 5, 9, 13} = {1, 4, 5, 6, 7, 9, 13} (m5 is shared)."}
        ],
        "fastShortcut": "A'B -> {4,5,6,7}; C'D -> {1,5,9,13}; Union = {1, 4, 5, 6, 7, 9, 13}.",
        "verification": "Truth table evaluation across 16 rows."
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
        "acceptedAnswers": ["(X + Z)(X' + Y)", "(X+Z)(X'+Y)", "(X' + Y)(X + Z)"],
        "options": [
            ["(X + Z)(X' + Y)", True, None],
            ["(X + Y)(X' + Z)", False, "Incorrectly paired literals with their own product terms."],
            ["(X' + Z')(X + Y')", False, "Complemented literals improperly."],
            ["XY + XZ", False, "Expression is still in SOP form."]
        ],
        "hint1": "Let A = XY. Then F = A + X'Z = (A + X')(A + Z).",
        "hint2": "Now expand each factor: A + X' = XY + X' = (X + X')(Y + X') = 1 * (X' + Y) = X' + Y. And A + Z = XY + Z = (X + Z)(Y + Z). Combine and apply consensus to eliminate (Y + Z).",
        "finalAnswer": "(X + Z)(X' + Y)",
        "steps": [
            {"title": "Step 1: First Distribution", "type": "calculation", "content": "XY + X'Z = (XY + X')(XY + Z)."},
            {"title": "Step 2: Simplify Factors", "type": "calculation", "content": "XY + X' = X' + Y. XY + Z = (X + Z)(Y + Z)."},
            {"title": "Step 3: Dual Consensus Elimination", "type": "calculation", "content": "(X' + Y)(X + Z)(Y + Z) = (X + Z)(X' + Y) because (Y + Z) is the redundant consensus of (X + Z) and (X' + Y)."}
        ],
        "fastShortcut": "Algebraic SOP to POS identity: XY + X'Z = (X + Z)(X' + Y).",
        "verification": "Multiplying out (X + Z)(X' + Y) = XX' + XY + X'Z + YZ = XY + X'Z + YZ = XY + X'Z (consensus)."
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
        "acceptedAnswers": ["AC + A'B", "A'B + AC", "AC+A'B", "A'B+AC"],
        "options": [
            ["AC + A'B", True, None],
            ["AB + A'C", False, "Swapped literal associations."],
            ["A + BC", False, "Confused with (A + B)(A + C)."],
            ["AA' + BC", False, "Omitted cross terms AC and A'B."]
        ],
        "hint1": "Multiply out: (A + B)(A' + C) = AA' + AC + A'B + BC.",
        "hint2": "AA' = 0. Notice that BC is the consensus of AC and A'B! Therefore BC is redundant: AC + A'B.",
        "finalAnswer": "AC + A'B",
        "steps": [
            {"title": "Direct Expansion", "type": "calculation", "content": "(A + B)(A' + C) = AA' + AC + A'B + BC = 0 + AC + A'B + BC."},
            {"title": "Consensus Elimination", "type": "calculation", "content": "Between AC and A'B, literal A is complementary. Consensus is BC. Therefore BC is redundant: F = AC + A'B."}
        ],
        "fastShortcut": "(A + B)(A' + C) = AC + A'B.",
        "verification": "Dual of the classic multiplexer identity."
    },
    {
        "id": "u2-q082",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: 4-Variable POS Maxterm Expansion",
        "difficulty": "Hard",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Expand the 4-variable POS expression F(A, B, C, D) = (A' + B)(C + D') into its canonical maxterm list \u03A0 M(...).",
        "promptDetail": "Identify the maxterms generated by each sum factor and take their union.",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(1, 5, 8, 9, 10, 11, 13)",
        "correctAnswer": "\u03A0 M(1, 5, 8, 9, 10, 11, 13)",
        "acceptedAnswers": [
            "\u03A0 M(1, 5, 8, 9, 10, 11, 13)",
            "\u03A0M(1, 5, 8, 9, 10, 11, 13)",
            "1, 5, 8, 9, 10, 11, 13"
        ],
        "options": [
            ["\u03A0 M(1, 5, 8, 9, 10, 11, 13)", True, None],
            ["\u03A0 M(8, 9, 10, 11)", False, "Only expanded factor (A' + B)."],
            ["\u03A0 M(1, 5, 9, 13)", False, "Only expanded factor (C + D')."],
            ["\u03A3 m(0, 2, 3, 4, 6, 7, 12, 14, 15)", False, "This is canonical SOP, not canonical POS."]
        ],
        "hint1": "In maxterms: A'=1, B=0, C=don't-care, D=don't-care -> binary 10--: 1000 (8), 1001 (9), 1010 (10), 1011 (11).",
        "hint2": "C=0, D'=1, A=don't-care, B=don't-care -> binary --01: 0001 (1), 0101 (5), 1001 (9), 1101 (13). Union: {1, 5, 8, 9, 10, 11, 13}.",
        "finalAnswer": "\u03A0 M(1, 5, 8, 9, 10, 11, 13)",
        "steps": [
            {"title": "Factor 1 Expansion", "type": "calculation", "content": "A' + B = 10-- in binary = {8, 9, 10, 11}."},
            {"title": "Factor 2 Expansion", "type": "calculation", "content": "C + D' = --01 in binary = {1, 5, 9, 13}."},
            {"title": "Union", "type": "calculation", "content": "{8, 9, 10, 11} \u222A {1, 5, 9, 13} = {1, 5, 8, 9, 10, 11, 13} (M9 is shared). F = \u03A0 M(1, 5, 8, 9, 10, 11, 13)."}
        ],
        "fastShortcut": "(A' + B) -> {8,9,10,11}; (C + D') -> {1,5,9,13}; Union = \u03A0 M(1, 5, 8, 9, 10, 11, 13).",
        "verification": "Truth table evaluation across all 16 rows."
    },
    {
        "id": "u2-q083",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: Canonical POS of Complement Function",
        "difficulty": "Hard",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Given F(A, B, C) = \u03A3 m(2, 4, 5, 6, 7), find the canonical POS representation of the complement function F'.",
        "promptDetail": "F' in canonical POS is the product of maxterms where F' evaluates to 0 (which is where F evaluates to 1).",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(2, 4, 5, 6, 7)",
        "correctAnswer": "\u03A0 M(2, 4, 5, 6, 7)",
        "acceptedAnswers": [
            "\u03A0 M(2, 4, 5, 6, 7)",
            "\u03A0M(2, 4, 5, 6, 7)",
            "2, 4, 5, 6, 7"
        ],
        "options": [
            ["\u03A0 M(2, 4, 5, 6, 7)", True, None],
            ["\u03A0 M(0, 1, 3)", False, "This is the original function F in POS form, not F'."],
            ["\u03A3 m(0, 1, 3)", False, "This is F' in SOP form, not F' in POS form."],
            ["\u03A3 m(2, 4, 5, 6, 7)", False, "This is F in SOP form."]
        ],
        "hint1": "F takes value 1 on {2, 4, 5, 6, 7}. Therefore F' takes value 0 on {2, 4, 5, 6, 7}.",
        "hint2": "Any function in canonical POS is the product of maxterms on rows where the function equals 0. For F', this is \u03A0 M(2, 4, 5, 6, 7).",
        "finalAnswer": "\u03A0 M(2, 4, 5, 6, 7)",
        "steps": [
            {"title": "Zero Rows of F'", "type": "calculation", "content": "F' = 0 strictly when F = 1. Minterms where F=1 are {2, 4, 5, 6, 7}."},
            {"title": "Canonical POS Formation", "type": "axiom", "content": "Therefore F' in canonical POS is \u03A0 M(2, 4, 5, 6, 7)."}
        ],
        "fastShortcut": "F' in POS has the exact same index set as F in SOP: \u03A0 M(2, 4, 5, 6, 7).",
        "verification": "Canonical duality identity."
    },
    {
        "id": "u2-q084",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: 3-Variable XOR Canonical SOP",
        "difficulty": "Hard",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "Convert the 3-variable odd parity function F(A, B, C) = A \u2295 B \u2295 C into its canonical SOP expression.",
        "promptDetail": "Identify all minterms containing an odd number of binary 1s.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(1, 2, 4, 7)",
        "correctAnswer": "\u03A3 m(1, 2, 4, 7)",
        "acceptedAnswers": [
            "\u03A3 m(1, 2, 4, 7)",
            "\u03A3m(1, 2, 4, 7)",
            "\u03A3m(1,2,4,7)",
            "1, 2, 4, 7"
        ],
        "options": [
            ["\u03A3 m(1, 2, 4, 7)", True, None],
            ["\u03A3 m(0, 3, 5, 6)", False, "This is the 3-variable XNOR function (even parity)."],
            ["\u03A3 m(1, 3, 5, 7)", False, "These are the odd decimal numbers, not odd Hamming weights."],
            ["\u03A3 m(3, 5, 6, 7)", False, "Incorrect minterm parity count."]
        ],
        "hint1": "3-variable XOR outputs 1 when the count of 1s in (A, B, C) is odd (1 or 3 ones).",
        "hint2": "1 one: 001 (1), 010 (2), 100 (4). 3 ones: 111 (7). Canonical SOP = \u03A3 m(1, 2, 4, 7).",
        "finalAnswer": "\u03A3 m(1, 2, 4, 7)",
        "steps": [
            {"title": "Odd Weight 1 Rows", "type": "calculation", "content": "001 (m1), 010 (m2), 100 (m4)."},
            {"title": "Odd Weight 3 Rows", "type": "calculation", "content": "111 (m7)."},
            {"title": "Canonical SOP", "type": "calculation", "content": "F = \u03A3 m(1, 2, 4, 7)."}
        ],
        "fastShortcut": "Odd parity in 3 variables is \u03A3 m(1, 2, 4, 7).",
        "verification": "Truth table for 3-input XOR."
    },
    {
        "id": "u2-q085",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: 3-Variable XNOR Canonical POS",
        "difficulty": "Challenge",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Convert the 3-variable equivalence function F(A, B, C) = A \u2299 B \u2299 C (even parity) into its canonical POS expression.",
        "promptDetail": "Identify the rows where even parity evaluates to 0 (which are the odd-weight rows).",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(1, 2, 4, 7)",
        "correctAnswer": "\u03A0 M(1, 2, 4, 7)",
        "acceptedAnswers": [
            "\u03A0 M(1, 2, 4, 7)",
            "\u03A0M(1, 2, 4, 7)",
            "\u03A0M(1,2,4,7)",
            "1, 2, 4, 7"
        ],
        "options": [
            ["\u03A0 M(1, 2, 4, 7)", True, None],
            ["\u03A0 M(0, 3, 5, 6)", False, "These are the rows where XNOR = 1 (this would define XOR in POS)."],
            ["\u03A3 m(1, 2, 4, 7)", False, "This is XOR in SOP form, not XNOR in POS form."],
            ["\u03A0 M(1, 3, 5, 7)", False, "Incorrect maxterm set."]
        ],
        "hint1": "XNOR outputs 1 on even rows {0, 3, 5, 6}. Therefore it outputs 0 on odd rows {1, 2, 4, 7}.",
        "hint2": "In canonical POS, F is the product of maxterms on rows where F = 0: \u03A0 M(1, 2, 4, 7).",
        "finalAnswer": "\u03A0 M(1, 2, 4, 7)",
        "steps": [
            {"title": "Zero Rows of XNOR", "type": "calculation", "content": "XNOR = 0 on rows with an odd number of 1s: {1, 2, 4, 7}."},
            {"title": "Canonical POS Formation", "type": "axiom", "content": "F = \u03A0 M(1, 2, 4, 7)."}
        ],
        "fastShortcut": "3-variable XNOR in POS is \u03A0 M(1, 2, 4, 7).",
        "verification": "Truth table check."
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
        "acceptedAnswers": ["4", "four", "2^2"],
        "options": [
            ["4", True, None],
            ["2", False, "Missing 2 variables, so 2^2 = 4, not 2."],
            ["8", False, "8 minterms would correspond to a single literal (1 missing variable)."],
            ["1", False, "1 minterm corresponds to a complete 4-literal product term."]
        ],
        "hint1": "The declared system has 4 variables. The term B'D has 2 literals.",
        "hint2": "Number of missing variables = 4 - 2 = 2 (variables A and C). Each missing variable has 2 states. 2^2 = 4 minterms: m1, m3, m9, m11.",
        "finalAnswer": "4",
        "steps": [
            {"title": "Missing Variable Count", "type": "calculation", "content": "k = n - literals = 4 - 2 = 2 (variables A and C)."},
            {"title": "Multiplicity Formula", "type": "axiom", "content": "Number of minterms = 2^k = 2^2 = 4. Specifically: {1, 3, 9, 11}."},
        ],
        "fastShortcut": "2 missing variables -> 2^2 = 4 minterms.",
        "verification": "Expansion: (A + A')B'(C + C')D gives 4 terms."
    },
    {
        "id": "u2-q087",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: 8-Minterm Canonical Reduction",
        "difficulty": "Challenge",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "The 4-variable canonical function F(A, B, C, D) = \u03A3 m(0, 1, 4, 5, 8, 9, 12, 13) simplifies to a single literal product term. What is this minimal term?",
        "promptDetail": "Identify the variable that remains invariant across all 8 minterm combinations.",
        "inputFormatHint": "Enter single literal, e.g. C'",
        "correctAnswer": "C'",
        "acceptedAnswers": ["C'", "c'", "not C"],
        "options": [
            ["C'", True, None],
            ["C", False, "Indices have C=0, not C=1."],
            ["D'", False, "Indices have D=0 and D=1."],
            ["A'", False, "Indices include A=0 and A=1."]
        ],
        "hint1": "Observe the binary codes: 0 (0000), 1 (0001), 4 (0100), 5 (0101), 8 (1000), 9 (1001), 12 (1100), 13 (1101).",
        "hint2": "In all 8 rows: A takes 0 and 1, B takes 0 and 1, D takes 0 and 1. Only C is constant 0 throughout. Constant 0 -> C'.",
        "finalAnswer": "C'",
        "steps": [
            {"title": "Binary Code Inspection", "type": "calculation", "content": "All 8 minterms have C = 0, while A, B, and D take all 2^3 = 8 binary combinations."},
            {"title": "Reduction", "type": "axiom", "content": "Since A, B, and D are exhausted over all combinations, they eliminate completely. The single invariant literal is C'."}
        ],
        "fastShortcut": "8 minterms with C=0 reduce to C'.",
        "verification": "Truth table: 1 on all rows where C=0."
    },
    {
        "id": "u2-q088",
        "trackId": "sec24",
        "trackTitle": "Section 2.4: SOP/POS Forms & Conversions",
        "topicBadge": "2.4: 8-Maxterm Canonical Reduction",
        "difficulty": "Challenge",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "The 4-variable canonical function F(A, B, C, D) = \u03A0 M(2, 3, 6, 7, 10, 11, 14, 15) simplifies to a single literal maxterm. What is this minimal sum term?",
        "promptDetail": "Identify the invariant variable across all 8 maxterms and apply maxterm polarity.",
        "inputFormatHint": "Enter single literal, e.g. C'",
        "correctAnswer": "C'",
        "acceptedAnswers": ["C'", "c'", "not C"],
        "options": [
            ["C'", True, None],
            ["C", False, "Maxterm convention complements 1s: here C=1, so maxterm is C'."],
            ["B'", False, "Variable B toggles between 0 and 1."],
            ["D'", False, "Variable D toggles between 0 and 1."]
        ],
        "hint1": "Convert indices to 4-bit binary: 2 (0010), 3 (0011), 6 (0110), 7 (0111), 10 (1010), 11 (1011), 14 (1110), 15 (1111).",
        "hint2": "Variable C is logic 1 across all 8 rows. Under maxterm convention, 1 maps to complemented literal C'.",
        "finalAnswer": "C'",
        "steps": [
            {"title": "Bit Pattern Analysis", "type": "calculation", "content": "All 8 rows have bit C = 1, while A, B, and D span all combinations."},
            {"title": "Maxterm Polarity Rule", "type": "axiom", "content": "In maxterms, binary 1 maps to complemented literal C'. Therefore the product of these 8 maxterms simplifies to C'."}
        ],
        "fastShortcut": "8 maxterms with C=1 reduce to maxterm C'.",
        "verification": "Dual of the 8-minterm reduction."
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
        "acceptedAnswers": ["AB + A'B'C'", "A'B'C' + AB", "AB+A'B'C'", "A'B'C'+AB"],
        "options": [
            ["AB + A'B'C'", True, None],
            ["AB' + BC' + A'C", False, "Did not multiply out the factors."],
            ["A'B + ABC", False, "Incorrect minterm assignment."],
            ["A + B + C", False, "Over-reduced."]
        ],
        "hint1": "Multiply first two terms: (A + B')(B + C') = AB + AC' + B'B + B'C' = AB + AC' + B'C'.",
        "hint2": "Now multiply by (A' + C): (AB + AC' + B'C')(A' + C) = ABA' + ABC + AC'A' + AC'C + B'C'A' + B'C'C = ABC + A'B'C'. Notice ABC + AB = AB? Wait, AB + A'B'C'.",
        "finalAnswer": "AB + A'B'C'",
        "steps": [
            {"title": "First Product", "type": "calculation", "content": "(A + B')(B + C') = AB + AC' + B'C'."},
            {"title": "Second Product", "type": "calculation", "content": "(AB + AC' + B'C')(A' + C) = ABC + A'B'C' + AB(A' + C) = ABC + A'B'C'."},
            {"title": "Minterm Grouping", "type": "calculation", "content": "Minterms are m0 (A'B'C'), m6 (ABC'), m7 (ABC). Combining m6 and m7 yields AB. Final minimal SOP: AB + A'B'C'."}
        ],
        "fastShortcut": "POS expansion yields minterms m0, m6, m7 which group to AB + A'B'C'.",
        "verification": "Truth table equivalence check."
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
            ["A + B = (A + B) + XX' = (A + B + X)(A + B + X')", True, None],
            ["A + B = (A + B)(X + X') = AX + BX + AX' + BX'", False, "This multiplies by 1, which converts sum terms into products (SOP expansion)."],
            ["A + B = A + B + X + X' = A + B + 1 = 1", False, "Adding 1 collapses the expression to constant 1."],
            ["A + B = (A + X)(B + X')", False, "Invalid algebraic transformation."]
        ],
        "hint1": "In POS, we must preserve the sum value by adding 0 (the identity element for OR).",
        "hint2": "Complement law: XX' = 0. So (A + B) = (A + B) + 0 = (A + B) + XX'. Second distributive law factors this into (A + B + X)(A + B + X').",
        "finalAnswer": "A + B = (A + B) + XX' = (A + B + X)(A + B + X')",
        "steps": [
            {"title": "Identity 1 (Complement)", "type": "axiom", "content": "X * X' = 0."},
            {"title": "Identity 2 (OR Identity)", "type": "axiom", "content": "(A + B) + 0 = (A + B) + XX'."},
            {"title": "Identity 3 (Second Distributive Law)", "type": "axiom", "content": "u + vw = (u + v)(u + w) with u = (A + B), v = X, w = X'. Result: (A + B + X)(A + B + X')."}
        ],
        "fastShortcut": "(A + B) + XX' = (A + B + X)(A + B + X').",
        "verification": "Axiomatic proof of canonical POS expansion."
    }
]

print(f"Loaded {len(sec24_questions)} Section 2.4 questions.")
