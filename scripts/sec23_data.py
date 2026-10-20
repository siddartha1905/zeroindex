# Section 2.3 Question Bank Data (u2-q046 to u2-q065) - 20 Questions
# Strictly zero em-dashes and zero en-dashes.
# Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).

sec23_questions = [
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
        "acceptedAnswers": ["AB'C", "A*B'*C", "m5", "m_5"],
        "options": [
            ["AB'C", True, None],
            ["A'BC'", False, "Complemented 1s and uncomplemented 0s (this is binary 010)."],
            ["A + B' + C", False, "This is a maxterm sum, not a minterm product."],
            ["ABC'", False, "Binary 110, which corresponds to minterm m6."]
        ],
        "hint1": "Decimal 5 in 3-bit binary is 101.",
        "hint2": "Bit 1 -> A, Bit 0 -> B', Bit 1 -> C. The product is AB'C.",
        "finalAnswer": "AB'C",
        "steps": [
            {"title": "Binary Conversion", "type": "calculation", "content": "5 in binary = 101_2."},
            {"title": "Literal Mapping", "type": "axiom", "content": "A=1 -> A, B=0 -> B', C=1 -> C. Minterm m5 = AB'C."}
        ],
        "fastShortcut": "101 -> AB'C.",
        "verification": "m5 evaluates to 1 strictly for (A,B,C) = (1,0,1)."
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
        "acceptedAnswers": ["A + B' + C'", "A+B'+C'", "M3", "M_3"],
        "options": [
            ["A + B' + C'", True, None],
            ["A' + B + C", False, "Inverted maxterm polarity convention."],
            ["A'BC", False, "This is minterm m3, not maxterm M3."],
            ["A + B + C'", False, "Binary 001, which corresponds to maxterm M1."]
        ],
        "hint1": "Decimal 3 in 3-bit binary is 011.",
        "hint2": "For maxterms, 0 -> uncomplemented (A), 1 -> complemented (B', C'). The sum is A + B' + C'.",
        "finalAnswer": "A + B' + C'",
        "steps": [
            {"title": "Binary Representation", "type": "calculation", "content": "3 in binary = 011_2."},
            {"title": "Maxterm Literal Mapping", "type": "axiom", "content": "A=0 -> A, B=1 -> B', C=1 -> C'. Maxterm M3 = A + B' + C'."}
        ],
        "fastShortcut": "011 -> A + B' + C'.",
        "verification": "M3 evaluates to 0 strictly for (A,B,C) = (0,1,1)."
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
            ["A minterm must evaluate to 1 on its row, whereas a maxterm must evaluate to 0 on its row", True, None],
            ["Minterms represent OR operations while maxterms represent AND operations", False, "Minterms are AND products; maxterms are OR sums."],
            ["Maxterms only apply to positive numbers in arithmetic", False, "Maxterms are switching algebra constructs, not numerical signs."],
            ["It is an arbitrary notation with no mathematical consequence", False, "The definition ensures canonical orthogonality."]
        ],
        "hint1": "When x = 0, what literal evaluates to 1? (0' = 1).",
        "hint2": "When x = 0, what literal evaluates to 0? (0 = 0).",
        "finalAnswer": "A minterm must evaluate to 1 on its row, whereas a maxterm must evaluate to 0 on its row",
        "steps": [
            {"title": "Minterm Condition", "type": "axiom", "content": "A minterm product must equal 1 strictly for its row. If variable xi = 0, it must be complemented (xi' = 1) so that the product evaluates to 1."},
            {"title": "Maxterm Condition", "type": "axiom", "content": "A maxterm sum must equal 0 strictly for its row. If variable xi = 0, it must remain uncomplemented (xi = 0) so that the sum evaluates to 0."}
        ],
        "fastShortcut": "Minterm produces 1 (prime the 0s); Maxterm produces 0 (prime the 1s).",
        "verification": "Axiomatic definitions of mi and Mi."
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
        "acceptedAnswers": ["2^n", "2^N", "2 pow n"],
        "options": [
            ["2^n", True, None],
            ["2^(2^n)", False, "2^(2^n) is the total number of distinct functions, not minterms."],
            ["n^2", False, "Incorrect exponentiation base."],
            ["2n", False, "This is the number of literal forms (complemented and uncomplemented)."]
        ],
        "hint1": "Each of the n variables can take 2 binary states (0 or 1).",
        "hint2": "By the fundamental counting principle, there are 2 * 2 * ... * 2 (n times) = 2^n unique input combinations.",
        "finalAnswer": "2^n",
        "steps": [
            {"title": "Counting Proof", "type": "axiom", "content": "Each minterm corresponds to exactly one row in the truth table. An n-variable truth table contains exactly 2^n distinct rows. Therefore exactly 2^n minterms exist."}
        ],
        "fastShortcut": "Minterms = 2^n; Maxterms = 2^n; Total functions = 2^(2^n).",
        "verification": "Switching space theorem."
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
        "acceptedAnswers": ["256", "2^8"],
        "options": [
            ["256", True, None],
            ["8", False, "8 is the number of truth table rows (2^3), not distinct functions."],
            ["64", False, "Incorrect power calculation."],
            ["512", False, "Calculated 2^9 instead of 2^8."]
        ],
        "hint1": "For n = 3 variables, there are 2^3 = 8 truth table rows.",
        "hint2": "Each row can be assigned output 0 or 1 independently. Total functions = 2^8 = 256.",
        "finalAnswer": "256",
        "steps": [
            {"title": "Truth Table Rows", "type": "calculation", "content": "Rows = 2^3 = 8."},
            {"title": "Output Combinations", "type": "calculation", "content": "Functions = 2^(rows) = 2^8 = 256."}
        ],
        "fastShortcut": "Functions of 3 variables: 2^(2^3) = 2^8 = 256.",
        "verification": "Combinatorial switching theory."
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
            ["m11 = AB'CD, M11 = A' + B + C' + D'", True, None],
            ["m11 = A'BCD, M11 = A + B' + C' + D'", False, "Binary 0111 is 7, not 11."],
            ["m11 = AB'C'D, M11 = A' + B + C + D'", False, "Binary 1001 is 9, not 11."],
            ["m11 = ABCD', M11 = A' + B' + C' + D", False, "Binary 1110 is 14, not 11."]
        ],
        "hint1": "11 in 4-bit binary is 1011 (8 + 2 + 1).",
        "hint2": "Minterm: 1011 -> AB'CD. Maxterm: 1011 -> A' + B + C' + D'.",
        "finalAnswer": "m11 = AB'CD, M11 = A' + B + C' + D'",
        "steps": [
            {"title": "Binary Conversion", "type": "calculation", "content": "11_10 = 1011_2 (A=1, B=0, C=1, D=1)."},
            {"title": "Minterm Formation", "type": "axiom", "content": "m11 = A * B' * C * D = AB'CD."},
            {"title": "Maxterm Formation", "type": "axiom", "content": "M11 = A' + B + C' + D'."}
        ],
        "fastShortcut": "1011: minterm primes 0s (AB'CD); maxterm primes 1s (A' + B + C' + D').",
        "verification": "Truth table row 11 evaluation."
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
        "inputFormatHint": "Enter expression, e.g. \u03A3 m() or empty set",
        "correctAnswer": "\u03A3 m()",
        "acceptedAnswers": ["\u03A3 m()", "Sigma m()", "empty sum", "0", "\u03A3m()"],
        "options": [
            ["\u03A3 m()", True, None],
            ["\u03A3 m(0)", False, "m0 is minterm A'B'C' (which equals 1 on row 0, not 0 everywhere)."],
            ["\u03A3 m(0, 1, 2, 3, 4, 5, 6, 7)", False, "This is the tautology function F = 1."],
            ["\u03A0 M(0)", False, "Incorrect maxterm specification."]
        ],
        "hint1": "Canonical SOP is the logical sum of all minterms where the function evaluates to 1.",
        "hint2": "Since F = 0 evaluates to 1 on zero rows, its minterm set contains zero minterms: \u03A3 m().",
        "finalAnswer": "\u03A3 m()",
        "steps": [
            {"title": "Canonical Definition", "type": "axiom", "content": "F = \u03A3 m(S) where S is the set of indices where F=1. For F=0, S is the empty set \u2205. The empty Boolean sum equals 0."}
        ],
        "fastShortcut": "Constant 0 in SOP is the empty minterm sum \u03A3 m().",
        "verification": "Axiom of empty logical sum = 0."
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
        "inputFormatHint": "Enter expression, e.g. \u03A0 M() or empty product",
        "correctAnswer": "\u03A0 M()",
        "acceptedAnswers": ["\u03A0 M()", "Pi M()", "empty product", "1", "\u03A0M()"],
        "options": [
            ["\u03A0 M()", True, None],
            ["\u03A0 M(0)", False, "M0 is maxterm A + B + C (which equals 0 on row 0, not 1 everywhere)."],
            ["\u03A0 M(0, 1, 2, 3, 4, 5, 6, 7)", False, "This is the contradiction function F = 0."],
            ["\u03A3 m()", False, "This is SOP contradiction."]
        ],
        "hint1": "Canonical POS is the logical product of all maxterms where the function evaluates to 0.",
        "hint2": "Since F = 1 evaluates to 0 on zero rows, its maxterm set contains zero maxterms: \u03A0 M().",
        "finalAnswer": "\u03A0 M()",
        "steps": [
            {"title": "Canonical POS Definition", "type": "axiom", "content": "F = \u03A0 M(S) where S is the set of indices where F=0. For F=1, S is the empty set \u2205. The empty Boolean product equals 1."}
        ],
        "fastShortcut": "Constant 1 in POS is the empty maxterm product \u03A0 M().",
        "verification": "Axiom of empty logical product = 1."
    },
    {
        "id": "u2-q054",
        "trackId": "sec23",
        "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
        "topicBadge": "2.3: Function Complementation in SOP",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "free_response",
        "question": "Given the 3-variable function F(A, B, C) = \u03A3 m(1, 3, 5, 7), write the canonical SOP expression for its complement F'(A, B, C).",
        "promptDetail": "The complement function F' takes output 1 on exactly the rows where F takes output 0.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(0, 2, 4, 6)",
        "correctAnswer": "\u03A3 m(0, 2, 4, 6)",
        "acceptedAnswers": [
            "\u03A3 m(0, 2, 4, 6)",
            "\u03A3m(0, 2, 4, 6)",
            "\u03A3m(0,2,4,6)",
            "Sigma m(0, 2, 4, 6)",
            "0, 2, 4, 6"
        ],
        "options": [
            ["\u03A3 m(0, 2, 4, 6)", True, None],
            ["\u03A3 m(1, 3, 5, 7)", False, "This is the original function F, not its complement."],
            ["\u03A0 M(0, 2, 4, 6)", False, "This is F in POS form, not F' in SOP form."],
            ["\u03A3 m(0, 1, 2, 3)", False, "Arbitrary minterm selection."]
        ],
        "hint1": "Universal index set for 3 variables: U = {0, 1, 2, 3, 4, 5, 6, 7}.",
        "hint2": "F' minterms are the set complement: U \\ {1, 3, 5, 7} = {0, 2, 4, 6}.",
        "finalAnswer": "\u03A3 m(0, 2, 4, 6)",
        "steps": [
            {"title": "Set Complementation", "type": "calculation", "content": "U = {0, 1, 2, 3, 4, 5, 6, 7}. If F = \u03A3 m(S), then F' = \u03A3 m(U \\ S)."},
            {"title": "Complement Index Set", "type": "calculation", "content": "U \\ {1, 3, 5, 7} = {0, 2, 4, 6}. Therefore F' = \u03A3 m(0, 2, 4, 6)."}
        ],
        "fastShortcut": "F' in SOP contains the missing minterm indices: \u03A3 m(0, 2, 4, 6).",
        "verification": "Truth table inversion."
    },
    {
        "id": "u2-q055",
        "trackId": "sec23",
        "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
        "topicBadge": "2.3: Canonical SOP to Canonical POS",
        "difficulty": "Medium",
        "set": "setB",
        "questionType": "free_response",
        "question": "Given F(A, B, C) = \u03A3 m(0, 2, 4, 6), express F(A, B, C) in canonical POS maxterm notation.",
        "promptDetail": "Identify the maxterms where F evaluates to 0.",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(1, 3, 5, 7)",
        "correctAnswer": "\u03A0 M(1, 3, 5, 7)",
        "acceptedAnswers": [
            "\u03A0 M(1, 3, 5, 7)",
            "\u03A0M(1, 3, 5, 7)",
            "\u03A0M(1,3,5,7)",
            "Pi M(1, 3, 5, 7)",
            "1, 3, 5, 7"
        ],
        "options": [
            ["\u03A0 M(1, 3, 5, 7)", True, None],
            ["\u03A0 M(0, 2, 4, 6)", False, "This is the complement function F' in POS form."],
            ["\u03A3 m(1, 3, 5, 7)", False, "This is F' in SOP form, not F in POS form."],
            ["\u03A0 M(0, 1, 2, 3)", False, "Incorrect index set."]
        ],
        "hint1": "F takes value 0 on rows {1, 3, 5, 7}.",
        "hint2": "In canonical POS, F is the product of all maxterms where F = 0: \u03A0 M(1, 3, 5, 7).",
        "finalAnswer": "\u03A0 M(1, 3, 5, 7)",
        "steps": [
            {"title": "Zero Rows Identification", "type": "calculation", "content": "F = 1 on {0, 2, 4, 6}. Therefore F = 0 on {1, 3, 5, 7}."},
            {"title": "Canonical POS Formation", "type": "axiom", "content": "F = \u03A0 M(1, 3, 5, 7)."}
        ],
        "fastShortcut": "\u03A3 m(S) = \u03A0 M(U \\ S). Here U \\ {0, 2, 4, 6} = {1, 3, 5, 7}.",
        "verification": "Truth table equivalence: both forms describe F = C'."
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
        "acceptedAnswers": ["0", "zero"],
        "options": [
            ["0", True, None],
            ["1", False, "Only identical minterms combined with + give 1 when summed across all 2^n terms."],
            ["mj + mk", False, "Confused product with sum."],
            ["Undefined", False, "Boolean operations are fully defined on all elements."]
        ],
        "hint1": "Two distinct minterms differ in at least one bit position.",
        "hint2": "That bit position means one minterm contains literal xi while the other contains xi'. Their product contains xi * xi' = 0.",
        "finalAnswer": "0",
        "steps": [
            {"title": "Orthogonality Proof", "type": "axiom", "content": "Since j != k, their binary codes differ in at least one variable bit position r. One minterm contains xr and the other contains xr'. Their product contains xr * xr' = 0. By domination, mj * mk = 0."}
        ],
        "fastShortcut": "Orthogonality: Distinct minterms are mutually exclusive; their product is always 0.",
        "verification": "Minterm orthogonality theorem."
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
        "acceptedAnswers": ["1", "one"],
        "options": [
            ["1", True, None],
            ["0", False, "0 is the product of distinct minterms, not the sum of distinct maxterms."],
            ["Mj * Mk", False, "Confused sum with product."],
            ["Depends on variables", False, "Result is always constant 1 for all distinct pairs."]
        ],
        "hint1": "Dual of the minterm orthogonality identity mj * mk = 0.",
        "hint2": "Replace product * with sum +, replace constant 0 with constant 1: Mj + Mk = 1.",
        "finalAnswer": "1",
        "steps": [
            {"title": "Duality Application", "type": "axiom", "content": "Minterm orthogonality states mj * mk = 0 for j != k. Taking the dual of this identity replaces * with + and 0 with 1, yielding Mj + Mk = 1."}
        ],
        "fastShortcut": "Distinct maxterms always sum to 1.",
        "verification": "Dual orthogonality theorem."
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
        "acceptedAnswers": ["10", "M10", "M_10"],
        "options": [
            ["10", True, None],
            ["5", False, "Inverted polarity to minterm convention (0101 is 5)."],
            ["11", False, "Arithmetic miscalculation."],
            ["12", False, "Binary 1100 is 12."]
        ],
        "hint1": "In maxterms: complemented literal = 1, uncomplemented literal = 0.",
        "hint2": "W' -> 1, X -> 0, Y' -> 1, Z -> 0. Binary word: 1010. Convert 1010 to decimal: 8 + 2 = 10.",
        "finalAnswer": "10",
        "steps": [
            {"title": "Bit Decoding", "type": "axiom", "content": "Maxterm rule: unprimed = 0, primed = 1. W' = 1, X = 0, Y' = 1, Z = 0."},
            {"title": "Decimal Conversion", "type": "calculation", "content": "1010_2 = (1 * 8) + (0 * 4) + (1 * 2) + (0 * 1) = 10. Maxterm is M10."}
        ],
        "fastShortcut": "W' X Y' Z -> 1 0 1 0 -> 10.",
        "verification": "M10 evaluates to 0 when (W,X,Y,Z) = (1,0,1,0)."
    },
    {
        "id": "u2-q059",
        "trackId": "sec23",
        "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
        "topicBadge": "2.3: 4-Variable POS Complementation",
        "difficulty": "Hard",
        "set": "setA",
        "questionType": "fill_blank",
        "question": "Given F(A, B, C, D) = \u03A0 M(0, 2, 5, 7, 8, 10, 13, 15), what is the canonical maxterm list for its complement F'?",
        "promptDetail": "Determine the maxterms where the complement function F' evaluates to 0.",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(1, 3, 4, 6, 9, 11, 12, 14)",
        "correctAnswer": "\u03A0 M(1, 3, 4, 6, 9, 11, 12, 14)",
        "acceptedAnswers": [
            "\u03A0 M(1, 3, 4, 6, 9, 11, 12, 14)",
            "\u03A0M(1, 3, 4, 6, 9, 11, 12, 14)",
            "1, 3, 4, 6, 9, 11, 12, 14"
        ],
        "options": [
            ["\u03A0 M(1, 3, 4, 6, 9, 11, 12, 14)", True, None],
            ["\u03A0 M(0, 2, 5, 7, 8, 10, 13, 15)", False, "This is the original function F in POS form."],
            ["\u03A3 m(1, 3, 4, 6, 9, 11, 12, 14)", False, "This is F in SOP form, not F' in POS form."],
            ["\u03A0 M(0, 1, 2, 3, 4, 5, 6, 7)", False, "Incorrect index selection."]
        ],
        "hint1": "F = 0 on rows {0, 2, 5, 7, 8, 10, 13, 15}. Therefore F = 1 on rows {1, 3, 4, 6, 9, 11, 12, 14}.",
        "hint2": "F' = 0 wherever F = 1. Therefore F' in POS form is the product of maxterms on rows {1, 3, 4, 6, 9, 11, 12, 14}.",
        "finalAnswer": "\u03A0 M(1, 3, 4, 6, 9, 11, 12, 14)",
        "steps": [
            {"title": "Truth Value Inversion", "type": "calculation", "content": "F evaluates to 1 on U \\ {0, 2, 5, 7, 8, 10, 13, 15} = {1, 3, 4, 6, 9, 11, 12, 14}."},
            {"title": "Complement POS", "type": "calculation", "content": "F' takes value 0 on those exact rows: F' = \u03A0 M(1, 3, 4, 6, 9, 11, 12, 14)."}
        ],
        "fastShortcut": "F' in POS has the set-complement index list: U \\ S.",
        "verification": "Truth table complement verification."
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
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(0, 3, 5, 6)",
        "correctAnswer": "\u03A3 m(0, 3, 5, 6)",
        "acceptedAnswers": [
            "\u03A3 m(0, 3, 5, 6)",
            "\u03A3m(0, 3, 5, 6)",
            "\u03A3m(0,3,5,6)",
            "0, 3, 5, 6"
        ],
        "options": [
            ["\u03A3 m(0, 3, 5, 6)", True, None],
            ["\u03A3 m(1, 2, 4, 7)", False, "This is the odd parity function (1 or 3 ones)."],
            ["\u03A3 m(0, 2, 4, 6)", False, "These are the even decimal numbers, not even Hamming weights."],
            ["\u03A3 m(3, 5, 6)", False, "Omitted m0 (0 ones is an even count)."]
        ],
        "hint1": "0 ones: 000 (decimal 0).",
        "hint2": "2 ones: 011 (decimal 3), 101 (decimal 5), 110 (decimal 6). Union: {0, 3, 5, 6}.",
        "finalAnswer": "\u03A3 m(0, 3, 5, 6)",
        "steps": [
            {"title": "Weight 0 Rows", "type": "calculation", "content": "000 -> m0."},
            {"title": "Weight 2 Rows", "type": "calculation", "content": "011 -> m3, 101 -> m5, 110 -> m6."},
            {"title": "Canonical SOP", "type": "calculation", "content": "F = \u03A3 m(0, 3, 5, 6) (3-variable XNOR function)."}
        ],
        "fastShortcut": "Even Hamming weights in 3 variables: m0, m3, m5, m6.",
        "verification": "Truth table check for even parity."
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
        "acceptedAnswers": ["Mi(A, B, C)", "Mi", "M_i", "maxterm Mi"],
        "options": [
            ["Mi(A, B, C)", True, None],
            ["mi'(A, B, C)", False, "This is alternative notation, not the maxterm identity."],
            ["M_(2^n - 1 - i)", False, "Confused index complementation with De Morgan duality."],
            ["1 - mi", False, "Arithmetic expression, not Boolean maxterm."]
        ],
        "hint1": "Consider m5 = AB'C. Its complement is (AB'C)' = A' + B + C'.",
        "hint2": "Now look at M5: 5 is 101 -> A' + B + C'. Notice (m5)' = M5! In general, [mi]' = Mi.",
        "finalAnswer": "Mi(A, B, C)",
        "steps": [
            {"title": "De Morgan Derivation", "type": "axiom", "content": "Let mi = x1 * x2 * ... * xn where each xj is a literal. By De Morgan's Law, (mi)' = x1' + x2' + ... + xn'. Each literal xj is complemented, exactly converting minterm polarity to maxterm polarity for the identical index i. Therefore [mi]' = Mi."}
        ],
        "fastShortcut": "[mi]' = Mi.",
        "verification": "De Morgan's theorem applied to canonical terms."
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
        "acceptedAnswers": ["12870", "C(16,8)", "16C8"],
        "options": [
            ["12870", True, None],
            ["65536", False, "65536 is the total number of all 4-variable functions (2^16)."],
            ["8192", False, "Incorrect combinatorial calculation."],
            ["256", False, "Confused with 3-variable function count."]
        ],
        "hint1": "A balanced function selects exactly 8 rows out of 16 to take output 1.",
        "hint2": "Number of ways = 16! / (8! * 8!) = 12,870.",
        "finalAnswer": "12870",
        "steps": [
            {"title": "Combinatorial Formula", "type": "calculation", "content": "C(n_rows, k) = C(16, 8) = 16! / (8! * 8!)."},
            {"title": "Numerical Evaluation", "type": "calculation", "content": "(16 * 15 * 14 * 13 * 12 * 11 * 10 * 9) / (8 * 7 * 6 * 5 * 4 * 3 * 2 * 1) = 12,870."}
        ],
        "fastShortcut": "C(16, 8) = 12,870 balanced switching functions.",
        "verification": "Binomial coefficient evaluation."
    },
    {
        "id": "u2-q063",
        "trackId": "sec23",
        "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
        "topicBadge": "2.3: Canonical SOP Intersection",
        "difficulty": "Challenge",
        "set": "setA",
        "questionType": "free_response",
        "question": "If F(A, B, C) = \u03A3 m(0, 3, 5, 6) and G(A, B, C) = \u03A3 m(1, 3, 5, 7), find the canonical SOP expression of the product function H = F * G.",
        "promptDetail": "Determine the intersection of the two minterm sets.",
        "inputFormatHint": "Enter canonical SOP, e.g. \u03A3 m(3, 5)",
        "correctAnswer": "\u03A3 m(3, 5)",
        "acceptedAnswers": ["\u03A3 m(3, 5)", "\u03A3m(3, 5)", "\u03A3m(3,5)", "3, 5"],
        "options": [
            ["\u03A3 m(3, 5)", True, None],
            ["\u03A3 m(0, 1, 3, 5, 6, 7)", False, "This is the logical sum F + G (union), not the product F * G."],
            ["\u03A3 m(0, 6)", False, "These are the minterms unique to F."],
            ["0", False, "Minterms m3 and m5 are common to both functions."]
        ],
        "hint1": "Logical AND of two SOP expressions corresponds to set intersection of their minterm sets.",
        "hint2": "{0, 3, 5, 6} \u2229 {1, 3, 5, 7} = {3, 5}.",
        "finalAnswer": "\u03A3 m(3, 5)",
        "steps": [
            {"title": "Minterm Orthogonality", "type": "axiom", "content": "mi * mj = 0 for i != j, and mi * mi = mi. When multiplying two SOP expansions, only identical minterms survive."},
            {"title": "Set Intersection", "type": "calculation", "content": "{0, 3, 5, 6} \u2229 {1, 3, 5, 7} = {3, 5}. H = \u03A3 m(3, 5)."}
        ],
        "fastShortcut": "Product of SOPs is the intersection of minterms: \u03A3 m(3, 5).",
        "verification": "Truth table multiplication."
    },
    {
        "id": "u2-q064",
        "trackId": "sec23",
        "trackTitle": "Section 2.3: Minterms, Maxterms & Canonical Forms",
        "topicBadge": "2.3: Canonical POS Intersection",
        "difficulty": "Challenge",
        "set": "setB",
        "questionType": "fill_blank",
        "question": "If F(A, B, C) = \u03A0 M(1, 2, 4) and G(A, B, C) = \u03A0 M(2, 4, 7), find the canonical POS expression of the sum function H = F + G.",
        "promptDetail": "Determine the maxterms where both F = 0 and G = 0 simultaneously.",
        "inputFormatHint": "Enter canonical POS, e.g. \u03A0 M(2, 4)",
        "correctAnswer": "\u03A0 M(2, 4)",
        "acceptedAnswers": ["\u03A0 M(2, 4)", "\u03A0M(2, 4)", "\u03A0M(2,4)", "2, 4"],
        "options": [
            ["\u03A0 M(2, 4)", True, None],
            ["\u03A0 M(1, 2, 4, 7)", False, "This is the product F * G, not the sum F + G."],
            ["\u03A0 M(1, 7)", False, "Incorrect maxterm difference."],
            ["1", False, "Maxterms M2 and M4 are common to both functions."]
        ],
        "hint1": "H = F + G evaluates to 0 only when both F = 0 and G = 0.",
        "hint2": "F = 0 on {1, 2, 4}. G = 0 on {2, 4, 7}. Both are 0 on {1, 2, 4} \u2229 {2, 4, 7} = {2, 4}.",
        "finalAnswer": "\u03A0 M(2, 4)",
        "steps": [
            {"title": "Zero Evaluation Condition", "type": "axiom", "content": "A logical sum F + G equals 0 strictly when F=0 AND G=0."},
            {"title": "Maxterm Set Intersection", "type": "calculation", "content": "{1, 2, 4} \u2229 {2, 4, 7} = {2, 4}. Therefore H = \u03A0 M(2, 4)."}
        ],
        "fastShortcut": "Sum of POS expressions is the intersection of maxterms: \u03A0 M(2, 4).",
        "verification": "Truth table addition."
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
        "acceptedAnswers": ["16", "2^4"],
        "options": [
            ["16", True, None],
            ["256", False, "256 is the total number of all 3-variable functions."],
            ["8", False, "8 is the number of truth table rows."],
            ["64", False, "Incorrect power calculation."]
        ],
        "hint1": "In an n-variable truth table, rows pair up as complementary indices: (i, 2^n - 1 - i).",
        "hint2": "For each pair, selecting the value of one row fixes the value of the other row. Total pairs = 2^(n-1) = 2^2 = 4 pairs. Total self-dual functions = 2^4 = 16.",
        "finalAnswer": "16",
        "steps": [
            {"title": "Complementary Pair Count", "type": "axiom", "content": "Rows pair up as (m_i, m_{7-i}): (0,7), (1,6), (2,5), (3,4). There are 2^(n-1) = 2^2 = 4 independent pairs."},
            {"title": "Binary Choices", "type": "calculation", "content": "For each pair, we have 2 choices. Total self-dual functions = 2^4 = 16."}
        ],
        "fastShortcut": "Self-dual functions of n variables: 2^(2^(n-1)). For n=3: 2^4 = 16.",
        "verification": "Self-dual function space theorem."
    }
]

print(f"Loaded {len(sec23_questions)} Section 2.3 questions.")
