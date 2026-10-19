# ZeroIndex · Academic & Intellectual Platform

> **"A place to begin, and many directions to go."**  
> An independent academic publication and foundational computing platform.

- **Author**: J. Siddartha Varma, Assistant Professor, Department of CSE (Data Science)
- **Institution**: Vignan's Institute of Information Technology (Autonomous), Visakhapatnam
- **Live Deployment**: [https://zeroindex-sigma.vercel.app/](https://zeroindex-sigma.vercel.app/)
- **Repository**: [https://github.com/siddartha1905/zeroindex](https://github.com/siddartha1905/zeroindex)

---

## 1. Technology Stack

- **Core UI**: React 18 (`react`, `react-dom` v18.3.1)
- **Bundler & Build Tool**: Vite 6 (`vite` v6.4.4, `@vitejs/plugin-react` v4.3.4)
- **Styling**: Vanilla Tailwind CSS v3.4.17 with PostCSS and Ant Design v5 tokens
- **Typography**: `DM Sans` (General UI), `Source Serif 4` (Editorial Headings), `IBM Plex Mono` (Technical Code & Formulas)
- **Icons**: Lucide React v1.16.0
- **Hosting / CDN**: Vercel Global Edge Network with automatic HTTPS and PWA caching

---

## 2. Information Architecture (Five Content Pillars)

ZeroIndex is structured around five primary destinations accessible from the homepage:

1. **`01 The Workbench`** (`#workbench`):
   - Academic learning and engineering curricula.
   - Active Subject: **Digital Logic Design (1005261102)** with 5 Units, visual solvers, and syllabus notes.
   - Future Tracks: C Programming & Systems, Data Structures & Algorithms, Machine Learning Foundations, Deep Learning & AI.
2. **`02 The Atlas`** (`#atlas`):
   - Structured learning pathways and progression roadmaps.
   - Routes: Computer Systems & Architecture, Data Science & Applied ML, Core Software Engineering & Algorithms.
3. **`03 The Bridge`** (`#bridge`):
   - Training, placements, and professional interview readiness.
   - Domains: Quantitative & Analytical Reasoning, Core CS Fundamentals, Coding Pattern Mastery, Technical Resume Architecture.
4. **`04 The Readout`** (`#readout`):
   - Technology and scientific publications with first-principles dispatches.
   - Dispatches: Hardware architecture from relays to systolic tensor arrays, zero-based memory offsets, geometry of attention mechanisms.
5. **`05 The Folio`** (`#folio`):
   - Personal essays and intellectual reflections by the faculty author.
   - Essays: On teaching from index zero, classroom engineering craft, deep reading vs summary feeds.

---

## 3. Digital Logic Design (DLD) Course Suite

The DLD course (`#dld` and `#workspace/:tab`) is completely self-contained and functions in-browser:

- **Inside Workspace Tabs**:
  1. **Course Units (1-5)** (`#workspace/units`): Step-by-step master lecture notes, derivations, worked models, and cheat sheets (`src/data/dldUnit1Master.js`).
  2. **Interactive Solvers** (`#workspace/solvers`): 5 visual interactive engines (`src/components/InteractiveSolvers.jsx`):
     - Engine 1: Universal Base Converter (Radix 2 to 16 with step-by-step upward remainder collector).
     - Engine 2: Binary Arithmetic Grid (Addition & subtraction with borrow/carry bit strips).
     - Engine 3: Complements & Subtractor (r's and (r-1)'s complement derivations and re-complementation).
     - Engine 4: Signed 8-Bit Overflow (Signed magnitude, 1's and 2's complement with overflow $V = C_{in} \oplus C_{out}$).
     - Engine 5: 7-Gate Logic Explorer with inline IEEE SVG circuit schematics and continuous 8-cycle oscilloscope waveform trace.
  3. **Practice Questions** (`#workspace/practice`): 110+ syllabus-weighted questions in `src/components/PracticeArena.jsx` featuring a 3-stage state machine (Lobby / Active / Evaluation & Explanations).
  4. **Subject Resources** (`#workspace/syllabus`): Full course overview, LTPC credits (3-0-0-3), curriculum breakdown, and study material resource status.

---

## 4. Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (output to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 5. Verification & Test Suite

The repository includes a comprehensive mathematical and circuit verification suite:

```bash
# Verify Unit 1 number conversions, additions, and complement math
node scripts/verifyUnit1Math.mjs

# Verify Section 1.5 complement models and subtraction proofs
node scripts/verifySection15Math.mjs

# Verify Section 1.7 logic gate models, truth tables, and waveform intervals
node scripts/verifySection17.mjs

# Verify all 5 Interactive Solver engines and arithmetic algorithms
node scripts/verifyInteractiveSolvers.mjs
```
