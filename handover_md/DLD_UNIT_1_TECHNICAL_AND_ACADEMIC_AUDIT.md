# Digital Logic Design · Unit 1 Technical & Academic Audit

> **Course Code**: 1005261102  
> **Course Title**: Digital Logic Design (DLD)  
> **Regulation**: VR23 Autonomous Curriculum  
> **Target Department**: Department of CSE (Data Science), Vignan's Institute of Information Technology (A)  
> **Curated by**: J. Siddartha Varma, Assistant Professor, Dept. of CSE-DS  

---

## 1. Unit 1 Overview & Syllabus Mapping

Unit 1, titled **Number Systems & Binary Arithmetic**, forms the foundational prerequisite for all digital hardware, computer architecture, and binary machine representation.

### Detailed Section Breakdown

| Section ID | Sub-Module Title | Core Academic Competency |
| :--- | :--- | :--- |
| **1.1** | **Digital Systems & Signals** | Discrete vs continuous physical quantities, noise immunity margins, binary voltage thresholds ($V_{OH}, V_{OL}, V_{IH}, V_{IL}$). |
| **1.2** | **Positional Number Systems** | Radix-$r$ representation, weights $r^i$, Decimal ($r=10$), Binary ($r=2$), Octal ($r=8$), Hexadecimal ($r=16$). |
| **1.3** | **Number Base Conversions** | Successive division (integer) and multiplication (fraction), shortcut bit-grouping ($3\text{ bits} \leftrightarrow 8, 4\text{ bits} \leftrightarrow 16$). |
| **1.4** | **Binary Arithmetic** | Column-aligned addition with carry propagation, subtraction with borrow generation, multiplication, and non-restoring division. |
| **1.5** | **Complements & Subtraction** | Diminished radix complement $(r-1)$'s and radix complement $r$'s, 9's, 10's, 1's, and 2's complements, end-around carry and re-complementation proofs. |
| **1.6** | **Signed Binary & Overflow** | Signed magnitude, signed 1's, signed 2's complement, dynamic range $[-2^{n-1}, +2^{n-1}-1]$, arithmetic overflow rule $V = C_{in} \oplus C_{out}$. |
| **1.7** | **Logic Gate Primitives** | Fundamental IEEE gate primitives (NOT, AND, OR, NAND, NOR, XOR, XNOR), electrical switch analogies, pulse waveforms. |

---

## 2. Mathematical Rigor & Worked Models Audit

The Unit 1 teaching corpus (`src/data/dldUnit1Master.js` and associated section data files) contains fully worked models with bit-by-bit derivations:

### Section 1.5 Complement Subtraction Models
- **Models 1A - 1D (Decimal Complements)**:
  - Model 1A: Pure Integer 4-digit 9's and 10's complement.
  - Model 1B: Trailing zero edge cases (e.g. $4000_{10}$, where 9's complement is $5999$ and 10's complement is $6000$).
  - Model 1C: Combined integer and fractional decimal complements.
  - Model 1D: Pure fractional decimal numbers ($0.0345$).
- **Models 2A - 2D (Binary Complements)**:
  - Model 2A: 8-bit integer ending with multiple zeros.
  - Model 2B: Binary integer ending in 1.
  - Model 2C: Combined integer and fractional binary numbers.
  - Model 2D: Extreme edge cases ($11111111_2$ and power-of-2 single-1 words).
- **Models 3A - 6E (Subtractions $M - N$)**:
  - Case 1 ($M \ge N$): End carry generated ($Carry = 1$). Proves result is positive, discard carry (in $r$'s complement) or add end-around carry (in $(r-1)$'s complement).
  - Case 2 ($M < N$): No end carry generated ($Carry = 0$). Proves result is negative, magnitude obtained by re-complementing the sum and prefixing a minus sign.

---

## 3. Interactive Solver Engines Audit

The interactive solver suite (`src/components/InteractiveSolvers.jsx`) provides 5 in-browser mathematical engines:

### Engine 1: Universal Base Converter
- Supports arbitrary radix conversions from base $r_1$ to base $r_2$ (bases 2, 8, 10, 16).
- Renders a step-by-step **Upward Remainder Collector Strip** demonstrating successive integer division:
  $$\text{Dividend} = \text{Quotient} \times \text{Base} + \text{Remainder}$$
- Demonstrates fractional expansion through successive multiplication by target radix, collecting integer overflow downwards.

### Engine 2: Binary Arithmetic Grid
- Interactive column-aligned addition and subtraction grid.
- Visual **Borrow Grid** with dedicated negative sign banner when $A < B$, demonstrating the swapping rule:
  $$A - B = -(B - A)$$

### Engine 3: Complements & Complement Subtractor
- Evaluates both 1's and 2's complement subtraction for arbitrary 8-bit binary numbers.
- Features:
  - Step 2: Bit-by-bit complementation grid.
  - Step 3: Binary adder grid with carry indication.
  - Step 4: Graphical re-complementation grid and fast-scan check strip when $Carry = 0$.

### Engine 4: Signed 8-Bit & Arithmetic Overflow
- Decodes any 8-bit pattern across Signed Magnitude, 1's Complement, and 2's Complement.
- Implements two decoding algorithms:
  1. Inversion and $+1$ adder grid.
  2. Direct weighted sum formula:
     $$\text{Value} = -b_7 \cdot 2^7 + \sum_{i=0}^{6} b_i \cdot 2^i$$
- Evaluates arithmetic overflow condition $V = C_6 \oplus C_7$, visually alerting students when two numbers of like sign produce a sum of opposite sign.

### Engine 5: 7-Gate Logic Explorer & Continuous Waveforms
- Fully interactive gate explorer with live toggleable inputs ($A, B, C$).
- Renders standard **IEEE/ANSI Logic Gate SVGs** for all 7 gates:
  - NOT (`INVERTER`), AND, OR, NAND, NOR, XOR, XNOR.
  - Input wire stroke and badge dynamically illuminate in emerald green (`#10b981`) when $1$ and slate (`#94a3b8`) when $0$.
- Includes a **Continuous 8-Cycle Oscilloscope Waveform Display** tracking input pulses $A(t), B(t)$ and output $Y(t)$ across sequential clock cycles.

---

## 4. Practice Quiz Arena Audit

The quiz engine (`src/components/PracticeArena.jsx` and `src/data/unit1QuizBank.js`) houses **110+ syllabus-weighted questions**:

### Question Distribution by Sub-Module
- **Topic 1**: Digital Systems & Signal Margins (15 Questions)
- **Topic 2**: Number Base Systems & Positional Representations (25 Questions)
- **Topic 3**: Radix Conversions & Fractional Expansions (30 Questions)
- **Topic 4**: Complements & Complement Subtractions (25 Questions)
- **Topic 5**: Signed Representations & Arithmetic Overflow (20 Questions)
- **Grand Mock Test**: 25 timed, randomly selected questions weighted across all topics.

### 3-Stage State Machine
1. **Lobby State**: Mode selection (Practice by Topic or Grand Mock), question count preview, instructions.
2. **Active State**: Question prompt, option cards with keyboard accessibility, rough work recommendation, progress bar, timer.
3. **Evaluation State**: Score badge, percentage, pass/fail analysis, question-by-question review with full step-by-step mathematical explanations.

---

## 5. Automated Verification Test Suite

The test scripts in `scripts/` guarantee 100% academic correctness:

```
Test Script                            Checks Run    Passed    Failed
---------------------------------------------------------------------
verifyUnit1Math.mjs                    44            44        0
verifySection15Math.mjs                35            35        0
verifySection17.mjs                    50            50        0
verifyInteractiveSolvers.mjs           34            34        0
---------------------------------------------------------------------
TOTAL VERIFICATION AUDIT               163           163       0 (100%)
```

All algorithms, conversions, edge cases, and truth tables match textbook standards with zero errors.
