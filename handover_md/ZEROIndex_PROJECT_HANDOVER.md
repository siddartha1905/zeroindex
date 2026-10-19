# ZeroIndex: Complete Project Handover & Architecture Document

> **"A place to begin, and many directions to go."**  
> An independent academic publication and foundational computing platform.

- **Author & Curator**: J. Siddartha Varma, Assistant Professor, Department of CSE (Data Science)
- **Institution**: Vignan's Institute of Information Technology (Autonomous), Visakhapatnam
- **Live Production URL**: [https://zeroindex-sigma.vercel.app/](https://zeroindex-sigma.vercel.app/)
- **GitHub Repository**: [https://github.com/siddartha1905/zeroindex](https://github.com/siddartha1905/zeroindex)
- **Current Version**: 2.0.0 (Release Tag: `v2.0-editorial-master`)
- **Document Date**: October 2026

---

## 1. Executive Summary & Brand Identity

ZeroIndex is an independent academic and intellectual platform created by a faculty member primarily for engineering undergraduates, yet accessible to anyone curious about computational systems.

The name **ZeroIndex** embodies the fundamental computing principle that arrays and memory addresses begin at index zero (`[0]`). Pedagogically, it represents the philosophy that every complex system in computing (from a discrete silicon logic gate to a deep transformer tensor) should be taught from first principles with clarity and patience, without skipping prerequisites.

### Design Language: Editorial Academic Studio & Contemporary Learning Journal
- **Aesthetic Tone**: Warm, paper-like surfaces inspired by independent academic presses (Brilliant.org, Stripe Press, Linear).
- **Core Palette**:
  - Main Paper Background: `#F7F5EF`
  - Primary Surface: `#FFFFFF`
  - Secondary Surface: `#F0F1EB`
  - Primary Ink: `#25352D`
  - Secondary Text: `#5F6C64`
  - Subtle Muted Text: `#69766D`
  - Primary Brand Green: `#245B4B`
  - Interactive Green: `#28755E`
  - Border: `#DDE2DA`
  - Warm Copper Accent: `#B77B59`
  - Soft Divider: `#E6E8E1`
- **Typography**:
  - Primary UI & Body: `DM Sans` (with `Inter` system fallback)
  - Editorial Titles & Reflective Headings: `Source Serif 4`
  - Technical Labels, Equations & Code: `IBM Plex Mono` (with `JetBrains Mono` fallback)
- **Strict Visual Rules**: Zero dark-terminal grids on public pages, zero glowing neon borders, zero generic stock imagery, zero cartoon characters, zero AI-generated buzzwords.

---

## 2. Technical Stack & Architecture

- **Frontend Framework**: React 18 (`react`, `react-dom` v18.3.1)
- **Build Tooling**: Vite 6 (`vite` v6.4.4, `@vitejs/plugin-react` v4.3.4)
- **Styling**: Tailwind CSS v3.4.17 with PostCSS and localized Ant Design v5 tokens (`antd` v5.24.1)
- **Icons**: Lucide React v1.16.0
- **Routing**: Single Page Application (SPA) with hash routing (`#workbench`, `#atlas`, `#bridge`, `#readout`, `#folio`, `#dld`, `#workspace/:tab`)
- **Deployment & Hosting**: Vercel Global Edge Network with `vercel.json` SPA rewrite rules and automatic SSL
- **Progressive Web App (PWA)**: Standalone manifest (`manifest.json`), service worker (`sw.js`), and home-screen install instructions for Chrome (Android) and Safari (iOS)

---

## 3. The Five Content Pillars

ZeroIndex is organized into exactly five primary content pillars:

### 01. The Workbench (`#workbench`)
- **Purpose**: Core engineering curricula and classroom subjects.
- **Accent**: Dark `#346C53`, Soft `#E0EBDF`.
- **Active Subject**: **Digital Logic Design (Course Code: 1005261102)**.
- **Future Tracks (In Development)**:
  - C Programming & Systems (Pointers, Memory, Structs)
  - Data Structures & Algorithms (Trees, Graphs, Asymptotics)
  - Machine Learning Foundations (Linear Algebra, Gradients)
  - Deep Learning & Neural Networks (Backpropagation, Attention)
- **Signature Visual**: *From Zero to Possibility* hand-drawn diagram illustrating mathematics, circuits, logic, memory, and neural systems emerging from zero.

### 02. The Atlas (`#atlas`)
- **Purpose**: Structured learning roadmaps and technical skill progression.
- **Accent**: Dark `#496D91`, Soft `#E1EAF2`.
- **Visual Metaphor**: Cartographic routes, waypoints, and folded map geometry.
- **Curated Pathways**:
  - Computer Systems & Architecture Pathway (Gates -> C -> Architecture -> Operating Systems)
  - Data Science & Machine Learning Foundations (Calculus -> Statistical Models -> Deep Learning)
  - Core Software Engineering & Algorithms (Linear Collections -> Trees & Hashing -> Dynamic Programming)

### 03. The Bridge (`#bridge`)
- **Purpose**: Training, placements, and professional engineering readiness.
- **Accent**: Dark `#956A43`, Soft `#F1E5D9`.
- **Visual Metaphor**: Structural truss bridge and engineering connection.
- **Preparation Domains**:
  - Quantitative & Analytical Reasoning
  - Core CS Interview Foundations (OS, DBMS, Networks)
  - Systematic Coding Pattern Mastery
  - Technical Resume & Whiteboard Communication Architecture

### 04. The Readout (`#readout`)
- **Purpose**: Curated technology and scientific dispatches examined with first-principles curiosity.
- **Accent**: Dark `#765C90`, Soft `#EBE5F0`.
- **Visual Metaphor**: Oscilloscope harmonic trace and measurement instruments.
- **Published Dispatches**:
  - *From Relays to Tensors: The Long Arc of Computing Hardware*
  - *Why Zero-Based Indexing Matters in Memory Architecture*
  - *The Geometry of Attention Mechanisms: A First-Principles Intuition*

### 05. The Folio (`#folio`)
- **Purpose**: Personal writing, essays, and intellectual reflections by the faculty author.
- **Accent**: Dark `#935F5D`, Soft `#F2E5E1`.
- **Visual Metaphor**: Typeset literary sheet and ink annotation pen mark.
- **Published Essays**:
  - *On Teaching from Index Zero: Why Every Concept Deserves a Clean Starting Point*
  - *The Quiet Craft of Classroom Engineering*
  - *On Reading Deeply in an Era of Summary Feeds*

---

## 4. Digital Logic Design (DLD) Course Architecture

The DLD course (`#dld` and `#workspace/:tab`) is the active flagship academic course. It is completely client-side and functions without any backend server.

### 4.1 Subject Home (`src/components/DldSubjectHome.jsx`)
- Centered lecture lobby.
- Interactive logic circuit schematic: $Y = (A \cdot B) + (B \oplus C)$ with live toggleable inputs $A, B, C$.
- 4 gateway cards leading directly into the inside workspace tabs.

### 4.2 Inside Workspace (`src/components/DldWorkspace.jsx`)
- Tab 1: **Course Units (1-5)** (`src/components/UnitWorkspace.jsx`)
  - Full modular lecture notes for Unit 1 (`src/data/dldUnit1Master.js`).
  - Covers Sections 1.1 to 1.7 with worked models, derivations, and tables.
- Tab 2: **Interactive Solvers** (`src/components/InteractiveSolvers.jsx`)
  - Partitioned across Units 1 to 5 with 5 fully functional Unit 1 engines.
- Tab 3: **Practice Questions** (`src/components/PracticeArena.jsx`)
  - 110+ syllabus-weighted questions with 3-stage state machine (Lobby / Active / Evaluation with detailed step-by-step explanations).
- Tab 4: **Subject Resources** (`src/components/SyllabusView.jsx`)
  - Syllabus overview, credits (3-0-0-3), and external Overleaf reference notes.

---

## 5. Local Setup & Production Build

```bash
# 1. Clone repository
git clone https://github.com/siddartha1905/zeroindex.git
cd zeroindex

# 2. Install dependencies
npm install

# 3. Start local development server (runs on port 3000/3002)
npm run dev

# 4. Run automated mathematical verification suite
node scripts/verifyUnit1Math.mjs
node scripts/verifySection15Math.mjs
node scripts/verifySection17.mjs
node scripts/verifyInteractiveSolvers.mjs

# 5. Build production bundle (outputs to dist/)
npm run build

# 6. Preview production build locally
npm run preview
```

---

## 6. Version Tags & Recovery Checkpoints

| Tag | Branch | Description |
| :--- | :--- | :--- |
| **`v1.0-dld-master`** | `backup/v1.0-dld-master` | Complete gold-master snapshot of Unit 1 DLD content with 4 workspace tabs, solvers, and 110+ quiz questions. |
| **`v2.0-editorial-master`** | `backup/v2.0-editorial-master` | Complete editorial redesign with 5 content pillars, Knowledge Tree schematic, and warm paper aesthetic. |
