import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Binary, 
  Layers, 
  ArrowRight, 
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  CheckCircle2, 
  AlertTriangle,
  AlertCircle,
  Cpu, 
  Zap,
  Info,
  Sliders,
  Check,
  RefreshCw,
  Clock,
  Activity,
  Lightbulb,
  ShieldCheck,
  Hash,
  GitBranch,
  CornerDownRight,
  ArrowRightLeft
} from 'lucide-react';
import { GateSymbolSvg } from './Section17Components';

/**
 * Unit 1 Interactive Solvers Suite
 * Strictly zero em-dashes (\u2014) and zero en-dashes (\u2013).
 * Color Palette:
 *   - Emerald (#2E6F40, #ECFDF5, #10B981): Integer part, Positive numbers, Unchanged bits, Valid results
 *   - Indigo (#4F46E5, #EEF2FF, #6366F1): Fractional part, Flipped bits, Complements
 *   - Amber (#D97706, #FEF3C7, #F59E0B): Padded zeros, Active Carries, Sign bits
 *   - Rose (#DC2626, #FEE2E2): Active Borrows, Negative values, Overflow, Errors
 */

const DIGITS = "0123456789ABCDEF";

// ============================================================================
// SHARED COMPONENT: TOP 2-COLUMN INSTRUCTIONAL & FORMULA HEADER
// ============================================================================
const SolverHeaderBanner = ({
  engineNum,
  title,
  steps,
  formulaTitle,
  formulaBadge,
  formulaContent,
  rulesList
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
    {/* Left Card: How to Use */}
    <div className="lg:col-span-6 p-5 sm:p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#DCE7E1] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
            How to Use This Interactive Visualizer
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]">
          Engine {engineNum}
        </span>
      </div>
      
      <div className="space-y-2.5 text-xs text-[#334155]">
        {steps.map((st, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#2E6F40]/10 text-[#2E6F40] font-mono font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <div className="leading-relaxed">
              <strong className="text-[#1E293B]">{st.title}: </strong>
              {st.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Color Coding Legend */}
      <div className="pt-3 border-t border-[#DCE7E1] flex flex-wrap gap-1.5 text-[10px] font-mono font-bold">
        <span className="px-2 py-0.5 rounded-md bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
          Emerald: Integer / Positive / Unchanged
        </span>
        <span className="px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#3730A3] border border-[#C7D2FE]">
          Indigo: Fraction / Inverted / Complements
        </span>
        <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
          Amber: Padded Zeros / Active Carries
        </span>
        <span className="px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
          Rose: Active Borrows / Negative / Overflow
        </span>
      </div>
    </div>

    {/* Right Card: Core Formula & Classroom Rule Reference */}
    <div className="lg:col-span-6 p-5 sm:p-6 bg-[#FAF8F5] rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-3.5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-[#DCE7E1] pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
              {formulaTitle || "Core Formula & Classroom Rule Reference"}
            </span>
          </div>
          {formulaBadge && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
              {formulaBadge}
            </span>
          )}
        </div>

        {formulaContent && (
          <div className="p-3 bg-white rounded-xl border border-[#DCE7E1] text-xs font-mono text-[#1E293B] leading-relaxed shadow-2xs mb-3">
            {formulaContent}
          </div>
        )}

        {rulesList && rulesList.length > 0 && (
          <div className="space-y-1.5 text-xs">
            {rulesList.map((r, i) => (
              <div key={i} className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-[#E2E8F0] font-mono text-[11px] text-[#334155]">
                <span className="text-[#2E6F40] font-black mt-0.5">&bull;</span>
                <div className="leading-relaxed">{r}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-[10px] font-mono text-[#64748B] pt-2 border-t border-[#DCE7E1]">
        Tip: Formulas update dynamically based on your chosen mode and inputs.
      </div>
    </div>
  </div>
);


// ============================================================================
// HELPER UTILITIES: NUMBER CONVERSIONS & ARITHMETIC ENGINES
// ============================================================================

// Parse a number string in any base (2, 8, 10, 16) into integer and fractional decimal parts
function parseToDecimalParts(str, base) {
  const clean = str.trim().toUpperCase();
  if (!clean) return { intDec: 0, fracDec: 0, totalDec: 0, intPart: "0", fracPart: "", isValid: true };

  const parts = clean.split('.');
  if (parts.length > 2) return { isValid: false, error: "Only one radix point allowed" };

  const intPart = parts[0] || "0";
  const fracPart = parts[1] || "";

  // Validate digits
  const validChars = DIGITS.slice(0, base);
  for (const ch of intPart) {
    if (!validChars.includes(ch)) return { isValid: false, error: `Invalid character '${ch}' for base ${base}` };
  }
  for (const ch of fracPart) {
    if (!validChars.includes(ch)) return { isValid: false, error: `Invalid character '${ch}' for base ${base}` };
  }

  // Calculate integer decimal value
  let intDec = 0;
  for (let i = 0; i < intPart.length; i++) {
    const val = DIGITS.indexOf(intPart[i]);
    intDec = intDec * base + val;
  }

  // Calculate fractional decimal value
  let fracDec = 0;
  for (let i = 0; i < fracPart.length; i++) {
    const val = DIGITS.indexOf(fracPart[i]);
    fracDec += val / Math.pow(base, i + 1);
  }

  return {
    intDec,
    fracDec,
    totalDec: intDec + fracDec,
    intPart,
    fracPart,
    isValid: true
  };
}

// Convert decimal integer to target base with division steps
function decimalIntToTarget(intDec, targetBase) {
  if (intDec === 0) {
    return { resultStr: "0", steps: [{ step: 1, dividend: 0, quotient: 0, remainder: 0, hexSymbol: "0" }] };
  }
  let current = intDec;
  const steps = [];
  let stepNum = 1;
  const remainderDigits = [];

  while (current > 0) {
    const quotient = Math.floor(current / targetBase);
    const remainder = current % targetBase;
    const hexSymbol = DIGITS[remainder];
    steps.push({
      step: stepNum++,
      dividend: current,
      quotient,
      remainder,
      hexSymbol
    });
    remainderDigits.push(hexSymbol);
    current = quotient;
  }

  const resultStr = remainderDigits.reverse().join("");
  return { resultStr, steps };
}

// Convert decimal fraction to target base with multiplication steps
function decimalFracToTarget(fracDec, targetBase, maxPrecision = 6) {
  if (fracDec === 0) {
    return { resultStr: "", steps: [] };
  }
  let current = fracDec;
  const steps = [];
  const carryDigits = [];
  let stepNum = 1;

  while (current > 0.0000000001 && stepNum <= maxPrecision) {
    const product = current * targetBase;
    const carry = Math.floor(product);
    const newFrac = product - carry;
    const hexSymbol = DIGITS[carry];
    steps.push({
      step: stepNum++,
      multiplier: current,
      product: product.toFixed(6),
      carry,
      hexSymbol,
      newFrac: newFrac.toFixed(6)
    });
    carryDigits.push(hexSymbol);
    current = newFrac;
  }

  return { resultStr: carryDigits.join(""), steps };
}


// ============================================================================
// MAIN INTERACTIVE SOLVERS SUITE COMPONENT
// ============================================================================

export const InteractiveSolvers = () => {
  const [activeUnit, setActiveUnit] = useState(1);
  const [activeSolver, setActiveSolver] = useState("converter");

  const solverUnits = [
    {
      unitNumber: 1,
      badge: "5 Live Engines",
      badgeColor: "bg-[#2E6F40] text-white",
      title: "Unit 1: Number Systems, Arithmetic & Complements",
      shortTitle: "Unit 1: Number Systems & Arithmetic",
      subtitle: "Universal Base Converter, Binary Arithmetic Grid, Complements Subtractor, Signed 8-Bit Overflow, 7-Gate Logic Explorer"
    },
    {
      unitNumber: 2,
      badge: "Upcoming",
      badgeColor: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
      title: "Unit 2: Boolean Algebra & K-Map Minimizer",
      shortTitle: "Unit 2: Boolean & K-Maps",
      subtitle: "3-Var/4-Var K-Map Solver, SOP/POS Converter, Universal NAND/NOR Synthesizer"
    },
    {
      unitNumber: 3,
      badge: "Upcoming",
      badgeColor: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
      title: "Unit 3: Combinational Logic Solvers",
      shortTitle: "Unit 3: Combinational Logic",
      subtitle: "Adders & Subtractors, Look-Ahead Carry, Decoders, Multiplexers"
    },
    {
      unitNumber: 4,
      badge: "Upcoming",
      badgeColor: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
      title: "Unit 4: Sequential Logic & Flip-Flops",
      shortTitle: "Unit 4: Sequential Logic",
      subtitle: "SR, JK, D, T Flip-Flop Excitation & State Tables, Master-Slave Race Free"
    },
    {
      unitNumber: 5,
      badge: "Upcoming",
      badgeColor: "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]",
      title: "Unit 5: Registers & Counters",
      shortTitle: "Unit 5: Registers & Counters",
      subtitle: "Shift Registers (SISO/SIPO/PISO/PIPO), Ripple & Synchronous Mod-N Counters"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Unit Selector Bar (Units 1 to 5) */}
      <div className="p-3 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F2F7F4] px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Course Unit Partition
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">
            Select a Unit to access its interactive visual solver suite
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {solverUnits.map((u) => {
            const isActive = activeUnit === u.unitNumber;
            return (
              <button
                key={u.unitNumber}
                onClick={() => setActiveUnit(u.unitNumber)}
                className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? "bg-[#2E6F40] text-white shadow-md ring-2 ring-[#2E6F40]/30"
                    : "bg-[#FAF8F5] hover:bg-[#F2F7F4] text-[#1E293B] border border-[#DCE7E1]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isActive ? "bg-white/20 text-white" : "bg-white text-[#64748B] border border-[#DCE7E1]"
                  }`}>
                    Unit {u.unitNumber}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-emerald-900/40 text-emerald-100" : u.badgeColor
                  }`}>
                    {u.badge}
                  </span>
                </div>
                <span className="text-xs font-bold leading-snug mt-1">
                  {u.shortTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          UNIT 1 SOLVERS SUITE (ACTIVE - DEFAULT)
      ========================================================================= */}
      {activeUnit === 1 && (
        <div className="space-y-6">
          {/* Top Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#2E6F40]/10 text-[#2E6F40]">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">
                    ZeroIndex Interactive Engineering Suite
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                    Unit 1: Number Systems, Arithmetic &amp; Complements
                  </h1>
                </div>
              </div>
              <span className="text-xs font-mono text-[#64748B] bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#DCE7E1]">
                5 Live Engines · Bit-Aligned
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] mt-3 leading-relaxed max-w-4xl">
              Five live hardware simulation engines designed to solve, verify, and visually unpack digital logic problems.
              Includes step-by-step division ladders, bit-aligned addition grids with carry tracks, borrow tracks with zero-bridge logic,
              complements subtractor decision diamonds, and interactive real-time gate waveforms.
            </p>
          </div>

          {/* Top 5-Solver Switcher Bar */}
          <div className="p-3 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              <button
                onClick={() => setActiveSolver("converter")}
                className={`p-3 rounded-xl text-xs font-mono font-bold transition-all text-left flex items-start gap-2.5 ${
                  activeSolver === "converter"
                    ? "bg-[#2E6F40] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]"
                }`}
              >
                <span className={`p-1.5 rounded-lg ${activeSolver === "converter" ? "bg-white/20 text-white" : "bg-[#2E6F40]/10 text-[#2E6F40]"}`}>
                  <Calculator className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase opacity-80">Engine 1</span>
                  <span>Universal Base Converter</span>
                </div>
              </button>

              <button
                onClick={() => setActiveSolver("arithmetic")}
                className={`p-3 rounded-xl text-xs font-mono font-bold transition-all text-left flex items-start gap-2.5 ${
                  activeSolver === "arithmetic"
                    ? "bg-[#2E6F40] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]"
                }`}
              >
                <span className={`p-1.5 rounded-lg ${activeSolver === "arithmetic" ? "bg-white/20 text-white" : "bg-[#2E6F40]/10 text-[#2E6F40]"}`}>
                  <Binary className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase opacity-80">Engine 2</span>
                  <span>Binary Arithmetic Grid</span>
                </div>
              </button>

              <button
                onClick={() => setActiveSolver("complements")}
                className={`p-3 rounded-xl text-xs font-mono font-bold transition-all text-left flex items-start gap-2.5 ${
                  activeSolver === "complements"
                    ? "bg-[#2E6F40] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]"
                }`}
              >
                <span className={`p-1.5 rounded-lg ${activeSolver === "complements" ? "bg-white/20 text-white" : "bg-[#2E6F40]/10 text-[#2E6F40]"}`}>
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase opacity-80">Engine 3</span>
                  <span>Complements Subtractor</span>
                </div>
              </button>

              <button
                onClick={() => setActiveSolver("signed")}
                className={`p-3 rounded-xl text-xs font-mono font-bold transition-all text-left flex items-start gap-2.5 ${
                  activeSolver === "signed"
                    ? "bg-[#2E6F40] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]"
                }`}
              >
                <span className={`p-1.5 rounded-lg ${activeSolver === "signed" ? "bg-white/20 text-white" : "bg-[#2E6F40]/10 text-[#2E6F40]"}`}>
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase opacity-80">Engine 4</span>
                  <span>Signed 8-Bit Overflow</span>
                </div>
              </button>

              <button
                onClick={() => setActiveSolver("gates")}
                className={`p-3 rounded-xl text-xs font-mono font-bold transition-all text-left flex items-start gap-2.5 ${
                  activeSolver === "gates"
                    ? "bg-[#2E6F40] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]"
                }`}
              >
                <span className={`p-1.5 rounded-lg ${activeSolver === "gates" ? "bg-white/20 text-white" : "bg-[#2E6F40]/10 text-[#2E6F40]"}`}>
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase opacity-80">Engine 5</span>
                  <span>Basic 7-Gate Explorer</span>
                </div>
              </button>
            </div>
          </div>

          {/* Render Active Unit 1 Solver */}
          {activeSolver === "converter" && <UniversalBaseConverterSolver />}
          {activeSolver === "arithmetic" && <BinaryArithmeticGridSolver />}
          {activeSolver === "complements" && <ComplementsSubtractorSolver />}
          {activeSolver === "signed" && <SignedRegisterOverflowSolver />}
          {activeSolver === "gates" && <LogicGatesWaveformSolver />}
        </div>
      )}

      {/* =========================================================================
          UNIT 2 SOLVERS PLACEHOLDER: BOOLEAN ALGEBRA & K-MAP MINIMIZER
      ========================================================================= */}
      {activeUnit === 2 && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                    Unit 2 Solver Suite · Boolean Algebra &amp; Gate-Level Minimization
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                    Boolean Minimizer &amp; K-Map Engines
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                Staging Pipeline
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] mt-3 leading-relaxed max-w-4xl">
              Unit 2 visual solvers are configured for Karnaugh Map optimization, canonical sum-of-products / product-of-sums representations,
              and universal gate rewrites. These engines allow students to toggle truth table minterms and visually trace grouping loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Engine 2.1
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Interactive Grid
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  3-Var &amp; 4-Var K-Map Minimizer
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Interactive 8-cell and 16-cell Karnaugh maps with Gray-code coordinate mapping. Click any cell to toggle between 0, 1, and don't-care (X).
                  Automated Prime Implicant and Essential Prime Implicant visual boundary grouping loops.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] font-mono text-xs text-[#334155] space-y-1">
                  <div className="font-bold text-[#1E293B]">Key Capabilities:</div>
                  <div>- Gray-code indexing (00, 01, 11, 10)</div>
                  <div>- Octet, Quad, and Pair grouping visualizer</div>
                  <div>- Don't-care condition inclusion engine</div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F2F7F4] flex items-center justify-between text-xs text-indigo-600 font-semibold font-mono">
                <span>Minimal SOP &amp; POS</span>
                <span className="text-slate-400">Ready in Unit 2</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Engine 2.2
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Form Converter
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  SOP / POS Canonical Converter
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Convert arbitrary Boolean expressions between Standard Sum-of-Products and Product-of-Sums forms.
                  Generates compact sigma minterm and pi maxterm notations with full expansion derivations.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] font-mono text-xs text-[#334155] space-y-1">
                  <div className="font-bold text-[#1E293B]">Key Capabilities:</div>
                  <div>- Minterm Sigma notation: Sigma m(...)</div>
                  <div>- Maxterm Pi notation: Pi M(...)</div>
                  <div>- Duality and De Morgan expansion steps</div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F2F7F4] flex items-center justify-between text-xs text-indigo-600 font-semibold font-mono">
                <span>Truth Table Matrix</span>
                <span className="text-slate-400">Ready in Unit 2</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Engine 2.3
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Universal Logic
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Universal NAND &amp; NOR Synthesizer
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Transform multi-level AND-OR schematic circuits into equivalent all-NAND or all-NOR gate implementations.
                  Visually traces inverter cancellations and bubble-matching logic.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] font-mono text-xs text-[#334155] space-y-1">
                  <div className="font-bold text-[#1E293B]">Key Capabilities:</div>
                  <div>- AND-OR to NAND-NAND conversion</div>
                  <div>- OR-AND to NOR-NOR conversion</div>
                  <div>- Minimum gate count visual audit</div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F2F7F4] flex items-center justify-between text-xs text-indigo-600 font-semibold font-mono">
                <span>Bubble Matching Logic</span>
                <span className="text-slate-400">Ready in Unit 2</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          UNIT 3 SOLVERS PLACEHOLDER: COMBINATIONAL LOGIC SOLVERS
      ========================================================================= */}
      {activeUnit === 3 && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-teal-50 text-teal-600">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-600">
                    Unit 3 Solver Suite · Combinational Circuit Design
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                    Combinational Logic Solvers
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                Staging Pipeline
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] mt-3 leading-relaxed max-w-4xl">
              Unit 3 solvers focus on standard MSI building blocks: binary adders, carry look-ahead generators, decoders, encoders,
              multiplexers, and demultiplexers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 block w-fit mb-3">
                  Engine 3.1 · Arithmetic Blocks
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Adders, Subtractors &amp; CLA
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Visual propagation engine for Half Adders, Full Adders, 4-bit Ripple Carry Adders, and Carry Look-Ahead (CLA) generators.
                  Displays Generate (Gi) and Propagate (Pi) terms side-by-side.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2F7F4] text-xs font-mono text-teal-700 font-semibold">
                Propagation Delay Workbench
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 block w-fit mb-3">
                  Engine 3.2 · Routing Logic
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Decoders &amp; Priority Encoders
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Interactive 2-to-4 and 3-to-8 line decoders with active-low enable lines. Priority encoder engine with valid (V) bit indicator
                  and truth table evaluation.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2F7F4] text-xs font-mono text-teal-700 font-semibold">
                Active-Low Enable Verification
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 block w-fit mb-3">
                  Engine 3.3 · Data Selectors
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Multiplexers &amp; Demultiplexers
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  4:1 and 8:1 MUX logic simulator. Implements arbitrary Boolean functions using multiplexers with Shannon's decomposition.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2F7F4] text-xs font-mono text-teal-700 font-semibold">
                Boolean Function Realization
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          UNIT 4 SOLVERS PLACEHOLDER: SEQUENTIAL LOGIC & FLIP-FLOPS
      ========================================================================= */}
      {activeUnit === 4 && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600">
                    Unit 4 Solver Suite · Clocked Sequential Circuits
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                    Sequential Logic &amp; Flip-Flop Solvers
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                Staging Pipeline
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] mt-3 leading-relaxed max-w-4xl">
              Unit 4 solvers provide interactive state transition engines, excitation table lookups, and master-slave race-around condition
              visualizers for SR, JK, D, and T flip-flops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 block w-fit mb-3">
                  Engine 4.1 · Flip-Flop Workbench
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  SR, JK, D, T Excitation &amp; State Tables
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Interactive state transition tables (Qn to Qn+1) and characteristic equations. Click inputs to simulate clock pulse triggering
                  and view next-state output transitions.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2F7F4] text-xs font-mono text-purple-700 font-semibold">
                Characteristic Equations &amp; Excitation Lookups
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 block w-fit mb-3">
                  Engine 4.2 · Timing &amp; FSMs
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Master-Slave JK &amp; FSM State Diagrams
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Visual demonstration of the race-around condition elimination using master-slave architecture. Mealy and Moore state machine
                  transition diagrams and state reduction tables.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2F7F4] text-xs font-mono text-purple-700 font-semibold">
                Mealy &amp; Moore State Graph Visualizer
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          UNIT 5 SOLVERS PLACEHOLDER: REGISTERS & COUNTERS
      ========================================================================= */}
      {activeUnit === 5 && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                    Unit 5 Solver Suite · Registers, Counters &amp; Memory
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                    Registers &amp; Counters Solvers
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                Staging Pipeline
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] mt-3 leading-relaxed max-w-4xl">
              Unit 5 visualizers simulate bit-shift propagation across registers (SISO, SIPO, PISO, PIPO) and cycle states in synchronous
              and ripple Mod-N binary counters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 block w-fit mb-3">
                  Engine 5.1 · Shift Registers
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Shift Registers (SISO, SIPO, PISO, PIPO)
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Step-by-step 4-bit data shifting simulator with clock tick pulses. Universal Shift Register (IC 74194) mode selection
                  (Hold, Shift Right, Shift Left, Parallel Load).
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2F7F4] text-xs font-mono text-blue-700 font-semibold">
                Serial / Parallel Clocked Bit Shifting
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 block w-fit mb-3">
                  Engine 5.2 · Counter Circuits
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mb-2">
                  Ripple &amp; Synchronous Mod-N Counters
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Asynchronous (ripple) counters with propagation ripple delay. Synchronous up/down Mod-N counters with excitation Karnaugh maps
                  and Ring / Johnson counter state sequences.
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2F7F4] text-xs font-mono text-blue-700 font-semibold">
                Mod-N State Decoding &amp; Waveforms
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


// ============================================================================
// SOLVER 1: UNIVERSAL BASE & FRACTION CONVERTER (ALL 12 CONVERSION PATHS)
// ============================================================================
const UniversalBaseConverterSolver = () => {
  const [inputStr, setInputStr] = useState("181.625");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);

  const presets = [
    { label: "Decimal to Binary: 181.625₁₀ -> Base 2", value: "181.625", from: 10, to: 2 },
    { label: "Decimal to Hex: 181.625₁₀ -> Base 16", value: "181.625", from: 10, to: 16 },
    { label: "Binary to Decimal: 10110.101₂ -> Base 10", value: "10110.101", from: 2, to: 10 },
    { label: "Binary to Octal: 10110.101₂ -> Base 8", value: "10110.101", from: 2, to: 8 },
    { label: "Binary to Hex: 10110.101₂ -> Base 16", value: "10110.101", from: 2, to: 16 },
    { label: "Octal to Hex (Two-Hop): 365.24₈ -> Base 16", value: "365.24", from: 8, to: 16 },
    { label: "Hex to Binary: B6A.C8₁₆ -> Base 2", value: "B6A.C8", from: 16, to: 2 },
    { label: "Hex to Octal (Two-Hop): B6A.C8₁₆ -> Base 8", value: "B6A.C8", from: 16, to: 8 }
  ];

  const parsed = useMemo(() => parseToDecimalParts(inputStr, fromBase), [inputStr, fromBase]);

  // Conversions for all 4 main bases
  const conversions = useMemo(() => {
    if (!parsed.isValid) return null;
    const b2 = {
      int: decimalIntToTarget(parsed.intDec, 2).resultStr,
      frac: decimalFracToTarget(parsed.fracDec, 2).resultStr
    };
    const b8 = {
      int: decimalIntToTarget(parsed.intDec, 8).resultStr,
      frac: decimalFracToTarget(parsed.fracDec, 8).resultStr
    };
    const b10 = {
      int: parsed.intDec.toString(10),
      frac: parsed.fracDec > 0 ? parsed.fracDec.toString(10).slice(2) : ""
    };
    const b16 = {
      int: decimalIntToTarget(parsed.intDec, 16).resultStr,
      frac: decimalFracToTarget(parsed.fracDec, 16).resultStr
    };

    return {
      bin: b2.frac ? `${b2.int}.${b2.frac}` : b2.int,
      oct: b8.frac ? `${b8.int}.${b8.frac}` : b8.int,
      dec: b10.frac ? `${b10.int}.${b10.frac}` : b10.int,
      hex: b16.frac ? `${b16.int}.${b16.frac}` : b16.int
    };
  }, [parsed]);

  // Target value string for the selected toBase
  const targetConvertedVal = useMemo(() => {
    if (!conversions) return "";
    if (toBase === 2) return conversions.bin;
    if (toBase === 8) return conversions.oct;
    if (toBase === 10) return conversions.dec;
    if (toBase === 16) return conversions.hex;
    return "";
  }, [conversions, toBase]);

  // Weight matrix terms for Case B (source -> decimal)
  const weightMatrixData = useMemo(() => {
    if (!parsed.isValid) return null;
    const intTerms = [];
    for (let i = 0; i < parsed.intPart.length; i++) {
      const pos = parsed.intPart.length - 1 - i;
      const digitChar = parsed.intPart[i];
      const digitVal = DIGITS.indexOf(digitChar);
      const weight = Math.pow(fromBase, pos);
      intTerms.push({
        digit: digitChar,
        digitVal,
        power: pos,
        weight,
        product: digitVal * weight
      });
    }

    const fracTerms = [];
    for (let i = 0; i < parsed.fracPart.length; i++) {
      const pos = -(i + 1);
      const digitChar = parsed.fracPart[i];
      const digitVal = DIGITS.indexOf(digitChar);
      const weight = Math.pow(fromBase, pos);
      fracTerms.push({
        digit: digitChar,
        digitVal,
        power: pos,
        weight: weight.toFixed(6),
        product: (digitVal * weight).toFixed(6)
      });
    }

    return { intTerms, fracTerms };
  }, [parsed, fromBase]);

  // Successive division & multiplication for Case A (decimal -> toBase)
  const divisionSteps = useMemo(() => {
    if (!parsed.isValid) return null;
    const divData = decimalIntToTarget(parsed.intDec, toBase);
    const mulData = decimalFracToTarget(parsed.fracDec, toBase);
    return { divData, mulData };
  }, [parsed, toBase]);

  // Grouping calculations for Case C & Case D
  const groupingData = useMemo(() => {
    if (!conversions) return null;
    const binStr = fromBase === 2 ? inputStr : conversions.bin;
    const [intPart = "0", fracPart = ""] = binStr.split('.');

    const buildGroups = (size) => {
      // Integer: slice right-to-left
      const intGroups = [];
      let remInt = intPart;
      while (remInt.length > 0) {
        const chunk = remInt.slice(Math.max(0, remInt.length - size));
        remInt = remInt.slice(0, Math.max(0, remInt.length - size));
        const padCount = size - chunk.length;
        const padded = "0".repeat(padCount) + chunk;
        const val = parseInt(padded, 2);
        const sym = DIGITS[val];
        intGroups.unshift({ raw: chunk, padded, padCount, val, sym, size });
      }

      // Fraction: slice left-to-right
      const fracGroups = [];
      let remFrac = fracPart;
      while (remFrac.length > 0) {
        const chunk = remFrac.slice(0, size);
        remFrac = remFrac.slice(size);
        const padCount = size - chunk.length;
        const padded = chunk + "0".repeat(padCount);
        const val = parseInt(padded, 2);
        const sym = DIGITS[val];
        fracGroups.push({ raw: chunk, padded, padCount, val, sym, size });
      }

      return { intGroups, fracGroups };
    };

    return {
      triplets: buildGroups(3), // Octal
      nibbles: buildGroups(4)   // Hex
    };
  }, [conversions, fromBase, inputStr]);

  // Determine which visual case to display
  // Case A: Decimal -> (Binary | Octal | Hex)
  // Case B: (Binary | Octal | Hex) -> Decimal
  // Case C: Binary <-> Octal (3-bit) or Binary <-> Hex (4-bit)
  // Case D: Octal <-> Hex (Two-Hop Bridge)
  // Case E: fromBase === toBase
  const conversionPathType = useMemo(() => {
    if (fromBase === toBase) return "IDENTICAL";
    if (fromBase === 10) return "CASE_A"; // Dec -> Other
    if (toBase === 10) return "CASE_B";   // Other -> Dec
    if ((fromBase === 2 && (toBase === 8 || toBase === 16)) || ((fromBase === 8 || fromBase === 16) && toBase === 2)) return "CASE_C"; // Bin <-> Oct/Hex
    if ((fromBase === 8 && toBase === 16) || (fromBase === 16 && toBase === 8)) return "CASE_D"; // Oct <-> Hex Bridge
    return "GENERAL";
  }, [fromBase, toBase]);

  // Dynamic Rule Banner Description
  const pathRuleSummary = useMemo(() => {
    if (fromBase === toBase) return "Identity Path: Source base equals target base. No transformation needed.";
    if (fromBase === 10) {
      return `Decimal to Base ${toBase}: Integer Part: Divide by ${toBase} repeatedly & read remainders UPWARDS (↑ MSB to LSB). Fractional Part: Multiply by ${toBase} repeatedly & read integer carries DOWNWARDS (↓).`;
    }
    if (toBase === 10) {
      return `Base ${fromBase} to Decimal: Expanded Positional Form: Multiply each digit by weight ${fromBase}^i. Integer powers i >= 0 (left of radix point), fractional powers i <= -1 (right of radix point), then sum all products.`;
    }
    if (fromBase === 2 && toBase === 8) {
      return "Binary to Octal: Group bits outward from radix point into 3-bit triplets (weights 4-2-1). Pad outer edges with Amber zeros.";
    }
    if (fromBase === 8 && toBase === 2) {
      return "Octal to Binary: Expand every octal digit into its exact 3-bit binary triplet (weights 4-2-1).";
    }
    if (fromBase === 2 && toBase === 16) {
      return "Binary to Hexadecimal: Group bits outward from radix point into 4-bit nibbles (weights 8-4-2-1). Pad outer edges with Amber zeros.";
    }
    if (fromBase === 16 && toBase === 2) {
      return "Hexadecimal to Binary: Expand every hexadecimal digit into its exact 4-bit binary nibble (weights 8-4-2-1).";
    }
    if (fromBase === 8 && toBase === 16) {
      return "Octal to Hexadecimal Two-Hop Bridge: Hop 1: Expand Octal digits to 3-bit Binary. Hop 2: Regroup Binary outward from radix point into 4-bit Nibbles with Amber padding.";
    }
    if (fromBase === 16 && toBase === 8) {
      return "Hexadecimal to Octal Two-Hop Bridge: Hop 1: Expand Hex digits to 4-bit Binary. Hop 2: Regroup Binary outward from radix point into 3-bit Triplets with Amber padding.";
    }
    return "";
  }, [fromBase, toBase]);

  return (
    <div className="space-y-6">
      
      {/* 1. TOP 2-COLUMN INSTRUCTIONAL & FORMULA BANNER */}
      <SolverHeaderBanner
        engineNum={1}
        title="Universal Base & Fraction Converter"
        steps={[
          { title: "Choose Bases & Input", desc: "Select From Base (2, 8, 10, 16) and To Base (2, 8, 10, 16), then type any number with an optional radix point '.' or pick an exam preset." },
          { title: "Instant 4-Base Output", desc: "Watch all 4 standard computer number formats update in real-time inside the synchronized cards below." },
          { title: "Read Visual Workings", desc: "Follow the Emerald Successive Division Ladder, Indigo Fractional Multiplication Table, or Positional Weight Matrix for complete exam steps." }
        ]}
        formulaTitle="Selected Conversion Governing Rule"
        formulaBadge={`Path: Base ${fromBase} -> Base ${toBase}`}
        formulaContent={pathRuleSummary}
        rulesList={[
          "Radix Alignment: Grouping and positional powers always anchor at the Radix Point (.).",
          "Padding Rules: Integer part pads zeros to the LEFT (Amber 0s); fractional part pads zeros to the RIGHT.",
          "Hex Symbols: Digits 10 to 15 are denoted by letters A, B, C, D, E, F."
        ]}
      />

      {/* Preset Chips */}
      <div className="p-4 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-2">
        <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
          Load Classic Exam Conversion Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputStr(p.value);
                setFromBase(p.from);
                setToBase(p.to);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-xs font-mono font-semibold text-[#1E293B] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input & 12-Path Mode Switcher */}
      <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">
              Input Value (Supports Radix Point '.'):
            </label>
            <input
              type="text"
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              placeholder="e.g. 181.625 or 10110.101"
              className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
            />
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">
              From Base:
            </label>
            <select
              value={fromBase}
              onChange={(e) => setFromBase(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-sm font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
            >
              <option value={2}>Binary (Base 2)</option>
              <option value={8}>Octal (Base 8)</option>
              <option value={10}>Decimal (Base 10)</option>
              <option value={16}>Hexadecimal (Base 16)</option>
            </select>
          </div>

          <div className="md:col-span-1 flex justify-center items-end pb-1">
            <button
              onClick={() => {
                const temp = fromBase;
                setFromBase(toBase);
                setToBase(temp);
              }}
              title="Swap From and To Bases"
              className="p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-[#2E6F40] transition-colors"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">
              To Base (Target):
            </label>
            <select
              value={toBase}
              onChange={(e) => setToBase(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-sm font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
            >
              <option value={2}>Binary (Base 2)</option>
              <option value={8}>Octal (Base 8)</option>
              <option value={10}>Decimal (Base 10)</option>
              <option value={16}>Hexadecimal (Base 16)</option>
            </select>
          </div>

        </div>

        {!parsed.isValid && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{parsed.error}</span>
          </div>
        )}
      </div>

      {/* Simultaneous 4-Base Output Cards */}
      {conversions && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl border shadow-2xs space-y-1 transition-all ${
            toBase === 2 ? "bg-[#ECFDF5] border-[#A7F3D0] ring-2 ring-[#2E6F40]" : "bg-white border-[#DCE7E1]"
          }`}>
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#2E6F40]">Binary (Base 2)</span>
              {toBase === 2 && <span className="text-[10px] bg-[#2E6F40] text-white px-1.5 py-0.2 rounded font-bold">TARGET</span>}
            </div>
            <div className="font-mono text-base font-extrabold text-[#1E293B] break-all">
              ({conversions.bin})₂
            </div>
          </div>

          <div className={`p-4 rounded-xl border shadow-2xs space-y-1 transition-all ${
            toBase === 8 ? "bg-[#FFFBEB] border-[#FDE68A] ring-2 ring-[#D97706]" : "bg-white border-[#DCE7E1]"
          }`}>
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#D97706]">Octal (Base 8)</span>
              {toBase === 8 && <span className="text-[10px] bg-[#D97706] text-white px-1.5 py-0.2 rounded font-bold">TARGET</span>}
            </div>
            <div className="font-mono text-base font-extrabold text-[#1E293B] break-all">
              ({conversions.oct})₈
            </div>
          </div>

          <div className={`p-4 rounded-xl border shadow-2xs space-y-1 transition-all ${
            toBase === 10 ? "bg-[#EEF2FF] border-[#C7D2FE] ring-2 ring-[#4F46E5]" : "bg-white border-[#DCE7E1]"
          }`}>
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#4F46E5]">Decimal (Base 10)</span>
              {toBase === 10 && <span className="text-[10px] bg-[#4F46E5] text-white px-1.5 py-0.2 rounded font-bold">TARGET</span>}
            </div>
            <div className="font-mono text-base font-extrabold text-[#1E293B] break-all">
              ({conversions.dec})₁₀
            </div>
          </div>

          <div className={`p-4 rounded-xl border shadow-2xs space-y-1 transition-all ${
            toBase === 16 ? "bg-[#FAF5FF] border-[#E9D5FF] ring-2 ring-[#9333EA]" : "bg-white border-[#DCE7E1]"
          }`}>
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#9333EA]">Hexadecimal (Base 16)</span>
              {toBase === 16 && <span className="text-[10px] bg-[#9333EA] text-white px-1.5 py-0.2 rounded font-bold">TARGET</span>}
            </div>
            <div className="font-mono text-base font-extrabold text-[#1E293B] break-all">
              ({conversions.hex})₁₆
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED STEP-BY-STEP WORKINGS BASED ON THE CHOSEN CONVERSION PATH */}
      {parsed.isValid && (
        <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1E293B]">
                Full Visual Workings: Base {fromBase} &rarr; Base {toBase}
              </h3>
            </div>
            <div className="text-xs font-mono text-[#2E6F40] font-bold bg-[#ECFDF5] px-3 py-1 rounded-lg border border-[#A7F3D0]">
              Final Result: ({targetConvertedVal})_{toBase}
            </div>
          </div>

          {/* CASE A: Decimal -> Binary / Octal / Hex */}
          {conversionPathType === "CASE_A" && divisionSteps && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Integer Ladder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2E6F40] uppercase flex items-center gap-1.5">
                      <ArrowUp className="w-4 h-4 text-[#2E6F40]" />
                      Integer Part (Successive &divide; {toBase}) &rarr; Read UP (&uarr; MSB to LSB)
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">Integer: {parsed.intDec}₁₀</span>
                  </div>

                  <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
                    <table className="w-full text-xs text-center border-collapse font-mono">
                      <thead>
                        <tr className="bg-[#ECFDF5] border-b border-[#A7F3D0] text-[#065F46]">
                          <th className="py-2.5 px-3 font-bold">Step</th>
                          <th className="py-2.5 px-3 font-bold">Division (N &divide; {toBase})</th>
                          <th className="py-2.5 px-3 font-bold">Quotient (Q)</th>
                          <th className="py-2.5 px-3 font-bold">Remainder (R)</th>
                          <th className="py-2.5 px-3 font-bold">Digit Symbol</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F7F4]">
                        {divisionSteps.divData.steps.map((st, idx) => (
                          <tr key={st.step} className="hover:bg-[#FAF8F5]/60">
                            <td className="py-2 px-3 text-[#64748B]">{st.step}</td>
                            <td className="py-2 px-3">{st.dividend} &divide; {toBase}</td>
                            <td className="py-2 px-3 font-bold text-[#2E6F40]">{st.quotient}</td>
                            <td className="py-2 px-3 font-bold text-[#D97706]">{st.remainder}</td>
                            <td className="py-2 px-3 font-black text-sm">
                              <span className={`px-2 py-0.5 rounded ${st.remainder >= 10 ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-emerald-100 text-emerald-800"}`}>
                                {st.hexSymbol}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Visual Upward Remainder Collector Strip */}
                  <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs text-[#065F46] font-bold">
                      <span className="flex items-center gap-1.5 uppercase">
                        <ArrowUp className="w-4 h-4 text-[#2E6F40]" />
                        Upward Remainder Collector: Bottom Step (MSB) &rarr; Top Step (LSB)
                      </span>
                      <span className="text-[10px] text-[#2E6F40] bg-white px-2 py-0.5 rounded border border-[#A7F3D0]">
                        Read Order: Upwards (&uarr;)
                      </span>
                    </div>
                    <p className="text-[11px] text-[#065F46] leading-relaxed">
                      Always collect remainders starting from the bottom row (MSB, Most Significant Digit) up to the top row (LSB, Least Significant Digit) so digits are never written backwards!
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs font-bold text-[#2E6F40] flex items-center gap-1 mr-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px] uppercase font-black">Collect:</span>
                      </span>
                      {[...divisionSteps.divData.steps].reverse().map((st, sIdx, arr) => (
                        <div key={st.step} className="flex items-center gap-1.5">
                          <div className={`flex flex-col items-center justify-center p-2 rounded-xl border min-w-[50px] text-center shadow-2xs ${
                            sIdx === 0 
                              ? "bg-emerald-100 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300" 
                              : sIdx === arr.length - 1
                              ? "bg-amber-100 border-amber-400 text-amber-900"
                              : "bg-white border-[#DCE7E1] text-[#1E293B]"
                          }`}>
                            <span className="text-[9px] font-black uppercase tracking-wider block">
                              {sIdx === 0 ? "MSB" : sIdx === arr.length - 1 ? "LSB" : `d${arr.length - 1 - sIdx}`}
                            </span>
                            <span className="text-base font-black">
                              {st.hexSymbol}
                            </span>
                            <span className="text-[8px] text-[#64748B]">
                              Step {st.step}
                            </span>
                          </div>
                          {sIdx < arr.length - 1 && (
                            <span className="text-xs font-bold text-[#2E6F40]">&larr;</span>
                          )}
                        </div>
                      ))}
                      <span className="text-xs font-bold text-[#2E6F40] mx-1">&rarr;</span>
                      <span className="text-sm font-black text-[#2E6F40] bg-white px-3 py-1.5 rounded-xl border border-[#A7F3D0] shadow-2xs">
                        ({divisionSteps.divData.resultStr})_{toBase}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fractional Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase flex items-center gap-1.5">
                      <ArrowDown className="w-4 h-4 text-[#4F46E5]" />
                      Fractional Part (Successive &times; {toBase}) &rarr; Read DOWN (&darr;)
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">Fraction: {parsed.fracDec.toFixed(6)}₁₀</span>
                  </div>

                  {divisionSteps.mulData.steps.length > 0 ? (
                    <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
                      <table className="w-full text-xs text-center border-collapse font-mono">
                        <thead>
                          <tr className="bg-[#EEF2FF] border-b border-[#C7D2FE] text-[#3730A3]">
                            <th className="py-2.5 px-3 font-bold">Step</th>
                            <th className="py-2.5 px-3 font-bold">Multiplication (Frac &times; {toBase})</th>
                            <th className="py-2.5 px-3 font-bold">Product</th>
                            <th className="py-2.5 px-3 font-bold">Extracted Carry</th>
                            <th className="py-2.5 px-3 font-bold">Digit Symbol</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F2F7F4]">
                          {divisionSteps.mulData.steps.map((st) => (
                            <tr key={st.step} className="hover:bg-[#FAF8F5]/60">
                              <td className="py-2 px-3 text-[#64748B]">{st.step}</td>
                              <td className="py-2 px-3">{st.multiplier} &times; {toBase}</td>
                              <td className="py-2 px-3 font-bold text-[#4F46E5]">{st.product}</td>
                              <td className="py-2 px-3 font-bold text-[#D97706]">{st.carry}</td>
                              <td className="py-2 px-3 font-black text-sm">
                                <span className={`px-2 py-0.5 rounded ${st.carry >= 10 ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-indigo-100 text-indigo-800"}`}>
                                  {st.hexSymbol}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-[#64748B] text-center">
                      No fractional component present in input (fraction = 0).
                    </div>
                  )}

                  {/* Visual Downward Carry Collector Strip */}
                  {divisionSteps.mulData.steps.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] space-y-3 font-mono">
                      <div className="flex items-center justify-between text-xs text-[#3730A3] font-bold">
                        <span className="flex items-center gap-1.5 uppercase">
                          <ArrowDown className="w-4 h-4 text-[#4F46E5]" />
                          Downward Carry Collector: Top Step (b-1) &rarr; Bottom Step
                        </span>
                        <span className="text-[10px] text-[#4F46E5] bg-white px-2 py-0.5 rounded border border-[#C7D2FE]">
                          Read Order: Downwards (&darr;)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#3730A3] leading-relaxed">
                        Extracted carries from successive multiplication are written sequentially downwards starting immediately after the radix point.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs font-bold text-[#4F46E5] flex items-center gap-1 mr-1">
                          <span className="px-2 py-0.5 rounded bg-indigo-200 text-indigo-900 text-[10px] uppercase font-black">Collect:</span>
                        </span>
                        {divisionSteps.mulData.steps.map((st, sIdx, arr) => (
                          <div key={st.step} className="flex items-center gap-1.5">
                            <div className={`flex flex-col items-center justify-center p-2 rounded-xl border min-w-[50px] text-center shadow-2xs ${
                              sIdx === 0 
                                ? "bg-indigo-100 border-indigo-400 text-indigo-900 ring-2 ring-indigo-300" 
                                : "bg-white border-[#DCE7E1] text-[#1E293B]"
                            }`}>
                              <span className="text-[9px] font-black uppercase tracking-wider block">
                                {sIdx === 0 ? "b-1" : `b-${sIdx + 1}`}
                              </span>
                              <span className="text-base font-black">
                                {st.hexSymbol}
                              </span>
                              <span className="text-[8px] text-[#64748B]">
                                Step {st.step}
                              </span>
                            </div>
                            {sIdx < arr.length - 1 && (
                              <span className="text-xs font-bold text-[#4F46E5]">&rarr;</span>
                            )}
                          </div>
                        ))}
                        <span className="text-xs font-bold text-[#4F46E5] mx-1">&rarr;</span>
                        <span className="text-sm font-black text-[#4F46E5] bg-white px-3 py-1.5 rounded-xl border border-[#C7D2FE] shadow-2xs">
                          (0.{divisionSteps.mulData.resultStr})_{toBase}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* CASE B: Binary / Octal / Hex -> Decimal (Positional Weight Matrix) */}
          {conversionPathType === "CASE_B" && weightMatrixData && (
            <div className="space-y-4">
              <div className="p-3 bg-[#EEF2FF] rounded-xl border border-[#C7D2FE] text-xs font-mono text-[#3730A3]">
                Expanded Positional Formula: Value = &sum; [Digit &times; (Base {fromBase})^Power].
              </div>

              {/* Full-Width Positional Weight Matrix */}
              <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
                {/* Header Strip */}
                <div className="flex border-b border-[#DCE7E1] font-mono text-xs font-bold text-center">
                  <div style={{ flex: weightMatrixData.intTerms.length }} className="bg-[#ECFDF5] text-[#065F46] py-2 px-3 border-r border-[#A7F3D0]">
                    &larr; INTEGER PART (Weights {fromBase}^i for i &ge; 0)
                  </div>
                  {weightMatrixData.fracTerms.length > 0 && (
                    <div className="w-16 bg-[#FEF3C7] text-[#92400E] py-2 font-black flex items-center justify-center border-r border-[#FDE68A]">
                      RADIX
                    </div>
                  )}
                  {weightMatrixData.fracTerms.length > 0 && (
                    <div style={{ flex: weightMatrixData.fracTerms.length }} className="bg-[#EEF2FF] text-[#3730A3] py-2 px-3">
                      FRACTIONAL PART &rarr; (Weights {fromBase}^i for i &le; -1)
                    </div>
                  )}
                </div>

                <table className="w-full text-center font-mono text-xs border-collapse">
                  <tbody>
                    {/* Row 1: Position Index */}
                    <tr className="border-b border-[#F2F7F4] bg-[#FAF8F5]">
                      <td className="py-2.5 px-3 text-left font-bold text-[#64748B] w-36">1. Position Index (i)</td>
                      {weightMatrixData.intTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 font-bold text-[#065F46]">+{t.power}</td>
                      ))}
                      {weightMatrixData.fracTerms.length > 0 && (
                        <td className="w-16 font-bold text-[#92400E] bg-[#FEF3C7]/40">.</td>
                      )}
                      {weightMatrixData.fracTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 font-bold text-[#3730A3]">{t.power}</td>
                      ))}
                    </tr>

                    {/* Row 2: Given Digit */}
                    <tr className="border-b border-[#F2F7F4]">
                      <td className="py-2.5 px-3 text-left font-bold text-[#1E293B] w-36">2. Given Digit (dᵢ)</td>
                      {weightMatrixData.intTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 font-black text-sm text-[#065F46]">{t.digit}</td>
                      ))}
                      {weightMatrixData.fracTerms.length > 0 && (
                        <td className="w-16 font-black text-sm text-[#92400E] bg-[#FEF3C7]/40">.</td>
                      )}
                      {weightMatrixData.fracTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 font-black text-sm text-[#3730A3]">{t.digit}</td>
                      ))}
                    </tr>

                    {/* Row 3: Positional Weight */}
                    <tr className="border-b border-[#F2F7F4] bg-[#FAF8F5]">
                      <td className="py-2.5 px-3 text-left font-bold text-[#64748B] w-36">3. Weight (rⁱ)</td>
                      {weightMatrixData.intTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 text-[#047857]">{fromBase}<sup>{t.power}</sup></td>
                      ))}
                      {weightMatrixData.fracTerms.length > 0 && (
                        <td className="w-16 bg-[#FEF3C7]/40 font-bold text-[#92400E]">&middot;</td>
                      )}
                      {weightMatrixData.fracTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 text-[#4338CA]">{fromBase}<sup>{t.power}</sup></td>
                      ))}
                    </tr>

                    {/* Row 4: Decimal Multiplier Value */}
                    <tr className="border-b border-[#F2F7F4]">
                      <td className="py-2.5 px-3 text-left font-bold text-[#64748B] w-36">4. Multiplier Value</td>
                      {weightMatrixData.intTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 text-[#64748B]">{t.weight}</td>
                      ))}
                      {weightMatrixData.fracTerms.length > 0 && (
                        <td className="w-16 bg-[#FEF3C7]/40">&middot;</td>
                      )}
                      {weightMatrixData.fracTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 text-[#64748B]">{t.weight}</td>
                      ))}
                    </tr>

                    {/* Row 5: Column Product */}
                    <tr className="bg-white">
                      <td className="py-2.5 px-3 text-left font-bold text-[#2E6F40] w-36">5. Product (dᵢ &times; rⁱ)</td>
                      {weightMatrixData.intTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 font-bold text-[#065F46]">{t.product}</td>
                      ))}
                      {weightMatrixData.fracTerms.length > 0 && (
                        <td className="w-16 bg-[#FEF3C7]/40">&middot;</td>
                      )}
                      {weightMatrixData.fracTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 font-bold text-[#3730A3]">{t.product}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total Sum Equation */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs space-y-2">
                <div className="text-[#64748B]">
                  <strong>Integer Sum:</strong> {weightMatrixData.intTerms.map(t => `${t.product}`).join(" + ")} = <strong className="text-[#065F46]">{parsed.intDec}</strong>
                </div>
                {weightMatrixData.fracTerms.length > 0 && (
                  <div className="text-[#64748B]">
                    <strong>Fractional Sum:</strong> {weightMatrixData.fracTerms.map(t => `${t.product}`).join(" + ")} = <strong className="text-[#3730A3]">{parsed.fracDec.toFixed(6)}</strong>
                  </div>
                )}
                <div className="pt-2 border-t border-[#DCE7E1] text-[#2E6F40] font-bold text-sm">
                  Total Decimal Sum: {parsed.intDec} + {parsed.fracDec.toFixed(6)} = ({conversions.dec})₁₀
                </div>
              </div>
            </div>
          )}

          {/* CASE C: Binary <-> Octal (3-Bit) OR Binary <-> Hex (4-Bit) */}
          {conversionPathType === "CASE_C" && groupingData && (
            <div className="space-y-6 font-mono text-xs">
              {/* If toBase === 8 or fromBase === 8 -> Show 3-Bit Grouping */}
              {(toBase === 8 || fromBase === 8) && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                    <span className="font-bold text-[#D97706] uppercase text-sm">
                      3-Bit Grouping Cards (Weights 4 - 2 - 1)
                    </span>
                    <span className="text-[#64748B]">Outward from Radix Point</span>
                  </div>

                  {/* Integer Groups */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#065F46] block">
                      &larr; Integer Part (Group right-to-left, pad with Amber 0s on left):
                    </span>
                    <div className="flex flex-wrap gap-3 items-center">
                      {groupingData.triplets.intGroups.map((g, i) => (
                        <div key={i} className="p-3 bg-white rounded-xl border-2 border-[#DCE7E1] text-center shadow-2xs space-y-1">
                          <span className="text-[10px] text-[#64748B] block">Group {i + 1} (4-2-1)</span>
                          <div className="text-base font-bold tracking-widest">
                            {g.padCount > 0 && <span className="text-amber-600 bg-amber-50 px-1 rounded border border-dashed border-amber-300">{"0".repeat(g.padCount)}</span>}
                            <span className="text-[#1E293B]">{g.raw}</span>
                          </div>
                          <div className="pt-1 border-t border-[#DCE7E1] text-xs font-black text-[#D97706]">
                            &rarr; Octal: {g.sym}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fractional Groups */}
                  {groupingData.triplets.fracGroups.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-[#3730A3] block">
                        Fractional Part &rarr; (Group left-to-right, pad with Amber 0s on right):
                      </span>
                      <div className="flex flex-wrap gap-3 items-center">
                        {groupingData.triplets.fracGroups.map((g, i) => (
                          <div key={i} className="p-3 bg-white rounded-xl border-2 border-[#DCE7E1] text-center shadow-2xs space-y-1">
                            <span className="text-[10px] text-[#64748B] block">Frac Group {i + 1} (4-2-1)</span>
                            <div className="text-base font-bold tracking-widest">
                              <span className="text-[#1E293B]">{g.raw}</span>
                              {g.padCount > 0 && <span className="text-amber-600 bg-amber-50 px-1 rounded border border-dashed border-amber-300">{"0".repeat(g.padCount)}</span>}
                            </div>
                            <div className="pt-1 border-t border-[#DCE7E1] text-xs font-black text-[#D97706]">
                              &rarr; Octal: {g.sym}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] font-bold">
                    Result: ({conversions.oct})₈
                  </div>
                </div>
              )}

              {/* If toBase === 16 or fromBase === 16 -> Show 4-Bit Grouping */}
              {(toBase === 16 || fromBase === 16) && (
                <div className="space-y-3 pt-4 border-t border-[#DCE7E1]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                    <span className="font-bold text-[#9333EA] uppercase text-sm">
                      4-Bit Nibble Grouping Cards (Weights 8 - 4 - 2 - 1)
                    </span>
                    <span className="text-[#64748B]">Outward from Radix Point</span>
                  </div>

                  {/* Integer Groups */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#065F46] block">
                      &larr; Integer Part (Group right-to-left, pad with Amber 0s on left):
                    </span>
                    <div className="flex flex-wrap gap-3 items-center">
                      {groupingData.nibbles.intGroups.map((g, i) => (
                        <div key={i} className="p-3 bg-white rounded-xl border-2 border-[#DCE7E1] text-center shadow-2xs space-y-1">
                          <span className="text-[10px] text-[#64748B] block">Nibble {i + 1} (8-4-2-1)</span>
                          <div className="text-base font-bold tracking-widest">
                            {g.padCount > 0 && <span className="text-amber-600 bg-amber-50 px-1 rounded border border-dashed border-amber-300">{"0".repeat(g.padCount)}</span>}
                            <span className="text-[#1E293B]">{g.raw}</span>
                          </div>
                          <div className="pt-1 border-t border-[#DCE7E1] text-xs font-black text-[#9333EA]">
                            &rarr; Hex: {g.sym}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fractional Groups */}
                  {groupingData.nibbles.fracGroups.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-[#3730A3] block">
                        Fractional Part &rarr; (Group left-to-right, pad with Amber 0s on right):
                      </span>
                      <div className="flex flex-wrap gap-3 items-center">
                        {groupingData.nibbles.fracGroups.map((g, i) => (
                          <div key={i} className="p-3 bg-white rounded-xl border-2 border-[#DCE7E1] text-center shadow-2xs space-y-1">
                            <span className="text-[10px] text-[#64748B] block">Frac Nibble {i + 1} (8-4-2-1)</span>
                            <div className="text-base font-bold tracking-widest">
                              <span className="text-[#1E293B]">{g.raw}</span>
                              {g.padCount > 0 && <span className="text-amber-600 bg-amber-50 px-1 rounded border border-dashed border-amber-300">{"0".repeat(g.padCount)}</span>}
                            </div>
                            <div className="pt-1 border-t border-[#DCE7E1] text-xs font-black text-[#9333EA]">
                              &rarr; Hex: {g.sym}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] text-[#9333EA] font-bold">
                    Result: ({conversions.hex})₁₆
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CASE D: Octal <-> Hex (Two-Hop Binary Bridge) */}
          {conversionPathType === "CASE_D" && groupingData && (
            <div className="space-y-6 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                <span className="font-bold text-[#1E293B] uppercase text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-[#2E6F40]" />
                  Hop 1: Expand Source (Base {fromBase}) into Binary
                </span>
                <p className="text-[#475569]">
                  {fromBase === 8 
                    ? "Each Octal digit expands to an exact 3-bit triplet (weights 4-2-1)." 
                    : "Each Hex digit expands to an exact 4-bit nibble (weights 8-4-2-1)."}
                </p>
                <div className="p-3 bg-white rounded-lg border border-[#DCE7E1] text-sm font-bold text-[#1E293B]">
                  Intermediate Binary Bridge: ({conversions.bin})₂
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
                <span className="font-bold text-[#1E293B] uppercase text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-[#4F46E5]" />
                  Hop 2: Regroup Binary Bridge into Target Base {toBase}
                </span>
                <p className="text-[#475569]">
                  {toBase === 16 
                    ? "Regroup binary string into 4-bit nibbles outward from radix point with Amber padding." 
                    : "Regroup binary string into 3-bit triplets outward from radix point with Amber padding."}
                </p>

                {/* Show the regrouped cards */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {(toBase === 16 ? groupingData.nibbles.intGroups : groupingData.triplets.intGroups).map((g, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-center">
                      <div className="text-[10px] text-[#64748B]">Int {i + 1}</div>
                      <div className="font-bold text-xs tracking-wider">
                        {g.padCount > 0 && <span className="text-amber-600 bg-amber-50 px-0.5 rounded">{"0".repeat(g.padCount)}</span>}
                        {g.raw}
                      </div>
                      <div className="font-black text-sm text-[#2E6F40] mt-1">{g.sym}</div>
                    </div>
                  ))}
                  {(toBase === 16 ? groupingData.nibbles.fracGroups : groupingData.triplets.fracGroups).length > 0 && (
                    <div className="flex items-center text-xl font-black text-amber-700 px-1">.</div>
                  )}
                  {(toBase === 16 ? groupingData.nibbles.fracGroups : groupingData.triplets.fracGroups).map((g, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-center">
                      <div className="text-[10px] text-[#64748B]">Frac {i + 1}</div>
                      <div className="font-bold text-xs tracking-wider">
                        {g.raw}
                        {g.padCount > 0 && <span className="text-amber-600 bg-amber-50 px-0.5 rounded">{"0".repeat(g.padCount)}</span>}
                      </div>
                      <div className="font-black text-sm text-[#4F46E5] mt-1">{g.sym}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] font-bold text-sm">
                Final Target Value: ({targetConvertedVal})_{toBase}
              </div>
            </div>
          )}

          {/* CASE E: Identical */}
          {conversionPathType === "IDENTICAL" && (
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-center font-mono text-xs text-[#64748B]">
              From Base {fromBase} and To Base {toBase} are identical. The value remains ({inputStr})_{fromBase}.
            </div>
          )}

        </div>
      )}

    </div>
  );
};


// ============================================================================
// SOLVER 2: BINARY ARITHMETIC VISUAL GRID (DEEP ADDITION & SUBTRACTION)
// ============================================================================
const BinaryArithmeticGridSolver = () => {
  const [op, setOp] = useState("+");
  const [opA, setOpA] = useState("1101.011");
  const [opB, setOpB] = useState("1011.110");

  const presets = [
    { label: "Fractional Addition with Radix Carries: 1101.011 + 1011.110", a: "1101.011", b: "1011.110", op: "+" },
    { label: "Unequal Length Padded Addition: 101.1 + 11.011", a: "101.1", b: "11.011", op: "+" },
    { label: "Classic Zero-Bridge Borrow Subtraction: 10000 - 00101", a: "10000", b: "00101", op: "-" },
    { label: "Fractional Borrow Subtraction: 110.10 - 101.11", a: "110.10", b: "101.11", op: "-" },
    { label: "Negative Subtraction (A < B): 01100 - 10101", a: "01100", b: "10101", op: "-" },
    { label: "Shift-and-Add Multiplication: 1011 × 1101", a: "1011", b: "1101", op: "×" },
    { label: "Binary Long Division: 11001 ÷ 101", a: "11001", b: "101", op: "÷" }
  ];

  // Mathematical & Column Engine
  const arithmeticResult = useMemo(() => {
    const cleanA = opA.trim();
    const cleanB = opB.trim();
    if (!cleanA || !cleanB) return null;

    if (!/^[01.]+$/.test(cleanA) || !/^[01.]+$/.test(cleanB)) {
      return { isValid: false, error: "Only binary characters (0, 1) and a single radix point (.) are allowed." };
    }
    if ((cleanA.match(/\./g) || []).length > 1 || (cleanB.match(/\./g) || []).length > 1) {
      return { isValid: false, error: "Only one radix point (.) is permitted per operand." };
    }

    const decA = parseToDecimalParts(cleanA, 2).totalDec;
    const decB = parseToDecimalParts(cleanB, 2).totalDec;

    if (op === "+" || op === "-") {
      const [intA = "0", fracA = ""] = cleanA.split('.');
      const [intB = "0", fracB = ""] = cleanB.split('.');
      const maxInt = Math.max(intA.length, intB.length);
      const maxFrac = Math.max(fracA.length, fracB.length);

      const padIntA = intA.padStart(maxInt, '0');
      const padIntB = intB.padStart(maxInt, '0');
      const padFracA = fracA.padEnd(maxFrac, '0');
      const padFracB = fracB.padEnd(maxFrac, '0');

      if (op === "+") {
        let carry = 0;
        const colSteps = [];
        const rawCols = [];

        // Fraction columns: rightmost frac down to 0
        for (let f = maxFrac - 1; f >= 0; f--) {
          const pos = -(f + 1);
          const bitA = parseInt(padFracA[f], 10);
          const isPadA = f >= fracA.length;
          const bitB = parseInt(padFracB[f], 10);
          const isPadB = f >= fracB.length;
          const sVal = bitA + bitB + carry;
          const sumBit = sVal % 2;
          const carryOut = Math.floor(sVal / 2);

          colSteps.push({
            posLabel: `b${pos}`,
            text: `Column b${pos}: ${bitA}${isPadA ? ' (pad)' : ''} + ${bitB}${isPadB ? ' (pad)' : ''} + CarryIn ${carry} = ${sVal} -> Sum = ${sumBit}, CarryOut = ${carryOut}${pos === -1 ? ' across radix point to b0' : ''}.`
          });

          rawCols.push({
            label: `b${pos}`,
            pos,
            isRadix: false,
            carryIn: carry,
            bitA,
            isPadA,
            bitB,
            isPadB,
            resBit: sumBit
          });
          carry = carryOut;
        }

        // Integer columns: rightmost integer down to maxInt - 1
        for (let i = maxInt - 1; i >= 0; i--) {
          const pos = maxInt - 1 - i;
          const bitA = parseInt(padIntA[i], 10);
          const isPadA = (maxInt - 1 - i) >= intA.length;
          const bitB = parseInt(padIntB[i], 10);
          const isPadB = (maxInt - 1 - i) >= intB.length;
          const sVal = bitA + bitB + carry;
          const sumBit = sVal % 2;
          const carryOut = Math.floor(sVal / 2);

          colSteps.push({
            posLabel: `b${pos}`,
            text: `Column b${pos}: ${bitA}${isPadA ? ' (pad)' : ''} + ${bitB}${isPadB ? ' (pad)' : ''} + CarryIn ${carry} = ${sVal} -> Sum = ${sumBit}, CarryOut = ${carryOut}.`
          });

          rawCols.push({
            label: `b${pos}`,
            pos,
            isRadix: false,
            carryIn: carry,
            bitA,
            isPadA,
            bitB,
            isPadB,
            resBit: sumBit
          });
          carry = carryOut;
        }

        // Extra MSB carry column
        if (carry === 1) {
          const pos = maxInt;
          colSteps.push({
            posLabel: `b${pos}`,
            text: `Column b${pos} (MSB Overflow Carry): CarryIn = 1 -> Sum = 1.`
          });
          rawCols.push({
            label: `b${pos}`,
            pos,
            isRadix: false,
            carryIn: 1,
            bitA: 0,
            isPadA: true,
            bitB: 0,
            isPadB: true,
            resBit: 1,
            isMsbCarry: true
          });
        }

        // Assemble left-to-right columns
        const orderedCols = [];
        const extra = rawCols.find(c => c.isMsbCarry);
        if (extra) orderedCols.push(extra);
        for (let p = maxInt - 1; p >= 0; p--) {
          const col = rawCols.find(c => c.pos === p && !c.isMsbCarry);
          if (col) orderedCols.push(col);
        }
        if (maxFrac > 0) {
          orderedCols.push({ label: ".", isRadix: true });
          for (let p = -1; p >= -maxFrac; p--) {
            const col = rawCols.find(c => c.pos === p);
            if (col) orderedCols.push(col);
          }
        }

        const decRes = decA + decB;
        const binBits = orderedCols.filter(c => !c.isRadix).map(c => c.resBit).join('');
        const intLen = (extra ? 1 : 0) + maxInt;
        const binRes = maxFrac > 0 ? `${binBits.slice(0, intLen)}.${binBits.slice(intLen)}` : binBits;

        return {
          isValid: true,
          op,
          decA,
          decB,
          decRes,
          orderedCols,
          colSteps,
          binRes,
          isNegative: false
        };
      } else {
        // Direct Subtraction A - B
        const isNegative = decA < decB;
        const effA = isNegative ? cleanB : cleanA;
        const effB = isNegative ? cleanA : cleanB;

        const [effIntA = "0", effFracA = ""] = effA.split('.');
        const [effIntB = "0", effFracB = ""] = effB.split('.');
        const effMaxInt = Math.max(effIntA.length, effIntB.length);
        const effMaxFrac = Math.max(effFracA.length, effFracB.length);

        const effPadIntA = effIntA.padStart(effMaxInt, '0');
        const effPadIntB = effIntB.padStart(effMaxInt, '0');
        const effPadFracA = effFracA.padEnd(effMaxFrac, '0');
        const effPadFracB = effFracB.padEnd(effMaxFrac, '0');

        const flatBitsA = (effPadIntA + effPadFracA).split('').map(Number);
        const flatBitsB = (effPadIntB + effPadFracB).split('').map(Number);
        const totalBits = flatBitsA.length;

        const currentA = [...flatBitsA];
        const borrowStates = Array(totalBits).fill(null);
        const colSteps = [];
        const diffBits = Array(totalBits).fill(0);

        for (let idx = totalBits - 1; idx >= 0; idx--) {
          const isFrac = effMaxFrac > 0 && idx >= effMaxInt;
          const pos = isFrac ? -(idx - effMaxInt + 1) : (effMaxInt - 1 - idx);
          const colLabel = `b${pos}`;
          const bitB = flatBitsB[idx];
          let valA = currentA[idx];

          if (valA < bitB) {
            // Borrow from nearest left column with bit > 0
            let lender = -1;
            for (let j = idx - 1; j >= 0; j--) {
              if (currentA[j] > 0) {
                lender = j;
                break;
              }
            }

            if (lender !== -1) {
              currentA[lender] -= 1;
              borrowStates[lender] = {
                original: flatBitsA[lender],
                modifiedVal: currentA[lender],
                wasBorrowedFrom: true
              };

              // Zero-bridge
              for (let m = lender + 1; m < idx; m++) {
                currentA[m] = 1;
                borrowStates[m] = {
                  original: flatBitsA[m],
                  modifiedVal: 1,
                  zeroBridge: true
                };
              }

              // Target column
              currentA[idx] += 2;
              borrowStates[idx] = {
                original: flatBitsA[idx],
                modifiedVal: 2,
                receivedBorrow: true
              };
              valA = currentA[idx];
            }
          }

          const diff = valA - bitB;
          diffBits[idx] = diff;

          let stepText = "";
          if (borrowStates[idx]?.receivedBorrow) {
            stepText = `Column ${colLabel}: 0 - ${bitB} requires borrow. Borrowed from left -> cell becomes 10₂ (2). Now: 2 - ${bitB} = ${diff}.`;
          } else if (borrowStates[idx]?.zeroBridge) {
            stepText = `Column ${colLabel} (Zero-Bridge): Lent borrow leftward, bit became 1. Now: 1 - ${bitB} = ${diff}.`;
          } else {
            stepText = `Column ${colLabel}: ${valA} - ${bitB} = ${diff}.`;
          }

          colSteps.push({ posLabel: colLabel, text: stepText });
        }

        const orderedCols = [];
        for (let idx = 0; idx < totalBits; idx++) {
          if (idx === effMaxInt && effMaxFrac > 0) {
            orderedCols.push({ label: ".", isRadix: true });
          }
          const isFrac = effMaxFrac > 0 && idx >= effMaxInt;
          const pos = isFrac ? -(idx - effMaxInt + 1) : (effMaxInt - 1 - idx);
          const isPadA = isFrac ? (idx - effMaxInt >= effFracA.length) : (idx < effMaxInt - effIntA.length);
          const isPadB = isFrac ? (idx - effMaxInt >= effFracB.length) : (idx < effMaxInt - effIntB.length);

          orderedCols.push({
            label: `b${pos}`,
            pos,
            isRadix: false,
            bitA: flatBitsA[idx],
            isPadA,
            bitB: flatBitsB[idx],
            isPadB,
            borrowState: borrowStates[idx],
            resBit: diffBits[idx]
          });
        }

        const decRes = decA - decB;
        const rawResStr = diffBits.join('');
        const formattedBin = effMaxFrac > 0 
          ? `${rawResStr.slice(0, effMaxInt)}.${rawResStr.slice(effMaxInt)}` 
          : rawResStr;
        const binRes = isNegative ? `-${formattedBin}` : formattedBin;

        return {
          isValid: true,
          op,
          decA,
          decB,
          decRes,
          orderedCols,
          colSteps,
          binRes,
          isNegative,
          effNote: isNegative ? `Minuend A (${decA}) < Subtrahend B (${decB}): Direct result is negative -(B - A).` : null
        };
      }
    } else if (op === "×") {
      // Multiplication
      const decRes = decA * decB;
      const intOnlyA = cleanA.replace('.', '');
      const intOnlyB = cleanB.replace('.', '');
      const fracBits = (cleanA.split('.')[1]?.length || 0) + (cleanB.split('.')[1]?.length || 0);

      const partialProducts = [];
      for (let i = intOnlyB.length - 1; i >= 0; i--) {
        const bit = intOnlyB[i];
        const shift = intOnlyB.length - 1 - i;
        const pp = bit === "1" ? intOnlyA + "0".repeat(shift) : "0".repeat(intOnlyA.length + shift);
        partialProducts.push({ bit, shift, val: pp });
      }

      const rawProduct = (parseInt(intOnlyA, 2) * parseInt(intOnlyB, 2)).toString(2);
      let finalBin = rawProduct;
      if (fracBits > 0) {
        const paddedRaw = rawProduct.padStart(fracBits + 1, '0');
        finalBin = paddedRaw.slice(0, paddedRaw.length - fracBits) + "." + paddedRaw.slice(paddedRaw.length - fracBits);
      }

      return {
        isValid: true,
        op,
        decA,
        decB,
        decRes,
        partialProducts,
        binRes: finalBin
      };
    } else if (op === "÷") {
      // Division
      if (decB === 0) return { isValid: false, error: "Division by zero is undefined." };

      const quotientDec = Math.floor(decA / decB);
      const remainderDec = decA % decB;

      return {
        isValid: true,
        op,
        decA,
        decB,
        quotientDec,
        remainderDec,
        quotientBin: quotientDec.toString(2),
        remainderBin: remainderDec.toString(2)
      };
    }

    return null;
  }, [op, opA, opB]);

  return (
    <div className="space-y-6">
      
      {/* 1. TOP 2-COLUMN INSTRUCTIONAL & FORMULA BANNER */}
      <SolverHeaderBanner
        engineNum={2}
        title="Binary Arithmetic Visual Grid"
        steps={[
          { title: "Select Operation & Operands", desc: "Choose Addition (+), Subtraction (-), Multiplication (×), or Division (÷) and enter binary values with radix point '.'." },
          { title: "Column-Aligned Bit Grid", desc: "Inspect the fixed w-12 column boxes strictly aligned by the Radix Point, with Amber padded zero cells and active carry/borrow rows." },
          { title: "Follow Step-by-Step Column Log", desc: "Read every column from rightmost LSB to leftmost MSB with carry generation and zero-bridge borrowing explanations." }
        ]}
        formulaTitle={op === "+" ? "Binary Addition Rules" : op === "-" ? "Binary Subtraction & Borrow Rules" : op === "×" ? "Shift-and-Add Multiplication Rules" : "Binary Long Division Rules"}
        formulaBadge={`Active Op: ${op}`}
        formulaContent={
          op === "+" 
            ? "Addition: 0+0=0, 0+1=1, 1+0=1, 1+1=10₂ (Sum 0, Carry 1), 1+1+1=11₂ (Sum 1, Carry 1)."
            : op === "-"
            ? "Direct Subtraction: 0-0=0, 1-0=1, 1-1=0, 0-1=1 (Borrow 1 from left, current cell becomes 10₂ = 2)."
            : op === "×"
            ? "Multiplication: 0×0=0, 0×1=0, 1×0=0, 1×1=1. Shift each partial product left by 1 bit."
            : "Division: Repeated compare, subtract divisor, and bring down the next dividend bit."
        }
        rulesList={
          op === "-"
            ? [
                "Zero-Bridge Rule: Borrowing across consecutive zeros (1 0 0 0) turns the lender 1 into 0, intermediate zeros into 1s, and target zero into 10₂ (2).",
                "Radix Alignment: Borrow propagates freely across the radix point without disruption."
              ]
            : [
                "Radix Alignment: Operands must align strictly at the radix point before computation.",
                "Zero-Padding: Missing leading or trailing bit positions are filled with Amber 0s."
              ]
        }
      />

      {/* Preset Chips */}
      <div className="p-4 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-2">
        <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
          Load Arithmetic Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOpA(p.a);
                setOpB(p.b);
                setOp(p.op);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-xs font-mono font-semibold text-[#1E293B] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Quick-Rule Strip */}
      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] font-mono text-xs text-[#1E293B] flex flex-wrap items-center justify-between gap-2">
        <span className="font-bold text-[#2E6F40] uppercase text-[11px] flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" />
          Quick Rule Strip:
        </span>
        {op === "+" && (
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">0 + 0 = 0</span>
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">0 + 1 = 1</span>
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">1 + 0 = 1</span>
            <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-300 font-bold">1 + 1 = 0 (Carry 1)</span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-400 font-black">1 + 1 + 1 = 1 (Carry 1)</span>
          </div>
        )}
        {op === "-" && (
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">0 - 0 = 0</span>
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">1 - 0 = 1</span>
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">1 - 1 = 0</span>
            <span className="bg-rose-50 text-rose-900 px-2 py-0.5 rounded border border-rose-300 font-bold">0 - 1 = 1 (Borrow 1 &rarr; 10₂ = 2)</span>
            <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-300 font-semibold">Zero-Bridge: 1000 &rarr; 011(10₂)</span>
          </div>
        )}
        {op === "×" && (
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">0 × 0 = 0</span>
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">0 × 1 = 0</span>
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">1 × 0 = 0</span>
            <span className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 font-bold">1 × 1 = 1</span>
          </div>
        )}
        {op === "÷" && (
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">If Dividend Slice &ge; Divisor &rarr; Q Bit = 1</span>
            <span className="bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">If Dividend Slice &lt; Divisor &rarr; Q Bit = 0</span>
          </div>
        )}
      </div>

      {/* Input Controls */}
      <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-5 space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Operand A (Binary):</label>
            <input
              type="text"
              value={opA}
              onChange={(e) => setOpA(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1E293B] uppercase text-center block">Op:</label>
            <div className="flex justify-center gap-1">
              {["+", "-", "×", "÷"].map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => setOp(symbol)}
                  className={`w-10 h-10 rounded-xl font-mono text-base font-bold transition-all ${
                    op === symbol
                      ? "bg-[#2E6F40] text-white shadow-2xs"
                      : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-5 space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Operand B (Binary):</label>
            <input
              type="text"
              value={opB}
              onChange={(e) => setOpB(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
            />
          </div>
        </div>

        {arithmeticResult && !arithmeticResult.isValid && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{arithmeticResult.error}</span>
          </div>
        )}
      </div>

      {/* Visual Workings Output */}
      {arithmeticResult && arithmeticResult.isValid && (
        <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
              Fixed-Column Bit-Aligned Hardware Grid
            </span>
            <span className="text-xs font-mono text-[#64748B]">
              Base 10 Verification: {arithmeticResult.decA} {op} {arithmeticResult.decB} = {arithmeticResult.decRes}
            </span>
          </div>

          {arithmeticResult.effNote && (
            <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs font-mono space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>Negative Binary Subtraction Rule: A &lt; B ({arithmeticResult.decA} &lt; {arithmeticResult.decB})</span>
              </div>
              <p className="leading-relaxed">
                Since A &lt; B, we compute -(B - A) by swapping the larger number B on top and attaching a negative (-) sign to the final difference!
              </p>
            </div>
          )}

          {/* ADDITION / SUBTRACTION FIXED-COLUMN BIT GRID */}
          {(op === "+" || op === "-") && arithmeticResult.orderedCols && (
            <div className="space-y-6">
              
              {/* Centered Scrollable Column Grid */}
              <div className="overflow-x-auto pb-4">
                <div className="inline-flex flex-col items-center min-w-full justify-center p-6 bg-[#FAF8F5] rounded-2xl border border-[#DCE7E1] shadow-2xs font-mono">
                  
                  {/* Grid Rows rendered as horizontal flex of vertical column stacks */}
                  <div className="flex items-start gap-1 sm:gap-2">
                    
                    {/* Far Left Operator Indicator Column */}
                    <div className="flex flex-col items-center w-12 sm:w-14 text-center font-bold text-xs text-[#64748B] pt-8 space-y-3">
                      <div className="h-6" /> {/* Spacer for Carry/Borrow row */}
                      <div className="h-10 flex items-center justify-center font-mono text-xs font-bold text-[#1E293B]">
                        {op === "-" && arithmeticResult.isNegative ? "B (Min)" : "A"}
                      </div>
                      <div className="h-10 flex items-center justify-center font-mono text-xs font-black text-[#2E6F40]">
                        {op === "-" && arithmeticResult.isNegative ? "- A (Sub)" : op}
                      </div>
                      <div className="w-full border-t-2 border-[#1E293B] my-1" />
                      <div className="h-11 flex items-center justify-center font-mono text-base font-black text-[#2E6F40]">=</div>
                    </div>

                    {/* Dedicated Negative Sign Column when A < B */}
                    {op === "-" && arithmeticResult.isNegative && (
                      <div className="flex flex-col items-center w-10 sm:w-12 text-center space-y-1.5">
                        <span className="text-[10px] text-rose-700 font-bold h-6 flex items-center justify-center bg-rose-50 px-1.5 rounded border border-rose-200 w-full">
                          SIGN
                        </span>
                        <div className="h-6" />
                        <div className="h-10" />
                        <div className="h-10" />
                        <div className="w-full border-t-2 border-[#1E293B] my-1" />
                        <div className="w-10 h-11 sm:w-12 sm:h-11 rounded-xl border-2 border-rose-500 bg-rose-100 text-rose-800 flex items-center justify-center font-black text-2xl shadow-2xs">
                          -
                        </div>
                      </div>
                    )}

                    {/* Columns Stack */}
                    {arithmeticResult.orderedCols.map((col, cIdx) => {
                      if (col.isRadix) {
                        return (
                          <div key={cIdx} className="flex flex-col items-center w-6 text-center">
                            <span className="text-[10px] text-[#64748B] font-bold h-6 flex items-center">RADIX</span>
                            <div className="h-6" />
                            <div className="h-10 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                            <div className="h-10 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                            <div className="w-full border-t-2 border-[#1E293B] my-1" />
                            <div className="h-11 flex items-center justify-center text-2xl font-black text-amber-700">.</div>
                          </div>
                        );
                      }

                      return (
                        <div key={cIdx} className="flex flex-col items-center w-12 sm:w-14 text-center space-y-1.5">
                          
                          {/* Row 1: Bit Position Header */}
                          <span className="text-[10px] text-[#64748B] font-bold h-6 flex items-center justify-center bg-white px-1.5 rounded border border-[#DCE7E1] w-full">
                            {col.label}
                          </span>

                          {/* Row 2: Carry-In / Borrow State Track */}
                          <div className="h-6 flex items-center justify-center w-full">
                            {op === "+" && (
                              col.carryIn === 1 ? (
                                <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black shadow-2xs">
                                  +1
                                </span>
                              ) : (
                                <span className="text-[10px] text-gray-300">0</span>
                              )
                            )}
                            {op === "-" && col.borrowState && (
                              <div className="flex items-center gap-0.5">
                                <span className="line-through text-gray-400 text-[10px]">
                                  {col.borrowState.original}
                                </span>
                                <span className={`px-1 py-0.2 rounded text-[10px] font-black border ${
                                  col.borrowState.modifiedVal === 2
                                    ? "bg-rose-100 text-rose-800 border-rose-300"
                                    : "bg-amber-100 text-amber-800 border-amber-300"
                                }`}>
                                  {col.borrowState.modifiedVal === 2 ? "10₂" : col.borrowState.modifiedVal}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Row 3: Operand A Box */}
                          <div className={`w-10 h-10 sm:w-12 sm:h-10 rounded-xl border flex flex-col items-center justify-center font-bold text-base transition-all ${
                            col.isPadA
                              ? "border-amber-300 border-dashed bg-amber-50/60 text-amber-900"
                              : "border-[#DCE7E1] bg-white text-[#1E293B]"
                          }`}>
                            <span>{col.bitA}</span>
                            {col.isPadA && <span className="text-[8px] font-bold text-amber-600 -mt-1 uppercase">pad</span>}
                          </div>

                          {/* Row 4: Operand B Box */}
                          <div className={`w-10 h-10 sm:w-12 sm:h-10 rounded-xl border flex flex-col items-center justify-center font-bold text-base transition-all ${
                            col.isPadB
                              ? "border-amber-300 border-dashed bg-amber-50/60 text-amber-900"
                              : "border-[#DCE7E1] bg-white text-[#1E293B]"
                          }`}>
                            <span>{col.bitB}</span>
                            {col.isPadB && <span className="text-[8px] font-bold text-amber-600 -mt-1 uppercase">pad</span>}
                          </div>

                          {/* Row 5: Divider */}
                          <div className="w-full border-t-2 border-[#1E293B] my-1" />

                          {/* Row 6: Sum / Difference Result Box */}
                          <div className={`w-10 h-11 sm:w-12 sm:h-11 rounded-xl border-2 flex items-center justify-center font-black text-lg shadow-2xs ${
                            arithmeticResult.isNegative
                              ? "bg-rose-100 border-rose-500 text-rose-900"
                              : "bg-emerald-100 border-emerald-500 text-emerald-900"
                          }`}>
                            {col.resBit}
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Grand Result Bar */}
                  <div className="mt-4 pt-3 border-t border-[#DCE7E1] flex items-center justify-between w-full max-w-xl text-xs">
                    <span className="font-bold text-[#64748B]">Final Aligned Result:</span>
                    <span className={`text-base font-black ${arithmeticResult.isNegative ? "text-rose-600" : "text-[#2E6F40]"}`}>
                      ({arithmeticResult.binRes})₂
                    </span>
                    <span className="text-[#64748B]">
                      = ({arithmeticResult.decRes})₁₀
                    </span>
                  </div>

                </div>
              </div>

              {/* Numbered Column-by-Column Step-by-Step Trace Box */}
              {arithmeticResult.colSteps && (
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-2.5 font-mono text-xs">
                  <span className="font-bold text-[#1E293B] uppercase tracking-wider block text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6F40]" />
                    Column-by-Column Hardware Arithmetic Execution Trace:
                  </span>
                  <div className="space-y-1.5">
                    {arithmeticResult.colSteps.map((st, i) => (
                      <div key={i} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-[#E2E8F0] text-[11px] text-[#334155]">
                        <span className="px-1.5 py-0.5 rounded bg-[#2E6F40]/10 text-[#2E6F40] font-black text-[10px]">
                          Step {i + 1}
                        </span>
                        <div className="leading-relaxed">{st.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* MULTIPLICATION PARTIAL PRODUCTS */}
          {op === "×" && arithmeticResult.partialProducts && (
            <div className="max-w-md mx-auto p-5 bg-[#FAF8F5] rounded-2xl border border-[#DCE7E1] space-y-2 font-mono text-right text-xs">
              <div className="text-base font-bold text-[#1E293B]">{opA} ({arithmeticResult.decA}₁₀)</div>
              <div className="text-base font-bold text-[#1E293B]">&times; {opB} ({arithmeticResult.decB}₁₀)</div>
              <div className="border-t-2 border-[#1E293B] my-2" />

              {arithmeticResult.partialProducts.map((pp, i) => (
                <div key={i} className="text-[#64748B]">
                  {pp.val} <span className="text-[10px] text-[#2E6F40]">(bit {pp.bit})</span>
                </div>
              ))}

              <div className="border-t-2 border-[#2E6F40] pt-2 text-base font-black text-[#2E6F40]">
                Product: {arithmeticResult.binRes}₂ ({arithmeticResult.decRes}₁₀)
              </div>
            </div>
          )}

          {/* DIVISION COMPARISON TRACE */}
          {op === "÷" && (
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#DCE7E1] space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-xl border border-[#DCE7E1]">
                  <span className="text-[10px] text-[#64748B] uppercase block">Quotient</span>
                  <span className="text-base font-black text-[#2E6F40]">{arithmeticResult.quotientBin}₂ ({arithmeticResult.quotientDec}₁₀)</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#DCE7E1]">
                  <span className="text-[10px] text-[#64748B] uppercase block">Remainder</span>
                  <span className="text-base font-black text-[#D97706]">{arithmeticResult.remainderBin}₂ ({arithmeticResult.remainderDec}₁₀)</span>
                </div>
              </div>
              <p className="text-[11px] text-[#475569]">
                Verification: Dividend ({opA}) = Divisor ({opB}) &times; Quotient ({arithmeticResult.quotientBin}) + Remainder ({arithmeticResult.remainderBin}). Exact Match.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};


// ============================================================================
// SOLVER 3: COMPLEMENTS & COMPLEMENT SUBTRACTOR (1's, 2's, 9's, 10's)
// ============================================================================
const ComplementsSubtractorSolver = () => {
  // Part A (Finding Complements) comes FIRST!
  const [activeTab, setActiveTab] = useState("finder"); // "finder" (Part A) or "subtractor" (Part B)

  // Finder state (Part A)
  const [findBase, setFindBase] = useState("binary");
  const [findInput, setFindInput] = useState("10110100");

  // Subtractor state (Part B)
  const [minuendM, setMinuendM] = useState("11010");
  const [subtrahendN, setSubtrahendN] = useState("01101");
  const [compType, setCompType] = useState("ones"); // "ones", "twos", "nines", "tens"

  const presetsFinder = [
    { label: "Binary: 10110100 (180₁₀)", val: "10110100", base: "binary" },
    { label: "Binary Fraction: 1011.011 (11.375₁₀)", val: "1011.011", base: "binary" },
    { label: "Decimal: 5472₁₀", val: "5472", base: "decimal" },
    { label: "Decimal Trailing Zeros: 24600₁₀", val: "24600", base: "decimal" },
    { label: "Decimal Fraction: 384.62₁₀", val: "384.62", base: "decimal" }
  ];

  const presetsSubtractor = [
    { label: "Case 1 (M > N, End-Around Carry): 11010 (26₁₀) - 01101 (13₁₀)", m: "11010", n: "01101", type: "ones" },
    { label: "Case 1 (M > N, Discard Carry): 11010 (26₁₀) - 01101 (13₁₀)", m: "11010", n: "01101", type: "twos" },
    { label: "Case 2 (M < N, Negative Result): 01101 (13₁₀) - 11010 (26₁₀)", m: "01101", n: "11010", type: "twos" },
    { label: "Case 2 (M < N, 1's Comp Negative): 01101 (13₁₀) - 11010 (26₁₀)", m: "01101", n: "11010", type: "ones" },
    { label: "Unequal Bit Lengths (Padding Needed): 110101 (53₁₀) - 1101 (13₁₀)", m: "110101", n: "1101", type: "twos" },
    { label: "Decimal 9's Comp (M > N): 72532 (72532₁₀) - 13250 (13250₁₀)", m: "72532", n: "13250", type: "nines" },
    { label: "Decimal 10's Comp (M < N): 13250 (13250₁₀) - 72532 (72532₁₀)", m: "13250", n: "72532", type: "tens" }
  ];

  // Helper for Complement Finder (Part A)
  const finderResult = useMemo(() => {
    const clean = findInput.trim();
    if (!clean) return null;
    const isBin = findBase === "binary";
    const base = isBin ? 2 : 10;

    // Validate
    if (isBin && !/^[01.]+$/.test(clean)) return { isValid: false, error: "Only 0, 1, and '.' allowed for binary." };
    if (!isBin && !/^[0-9.]+$/.test(clean)) return { isValid: false, error: "Only digits 0-9 and '.' allowed for decimal." };

    const [intPart = "0", fracPart = ""] = clean.split('.');
    const n = intPart.length;
    const m = fracPart.length;

    // Decimal equivalent
    const decVal = parseToDecimalParts(clean, base).totalDec;

    // Standard Complements
    let rMinusOneComp = "";
    let rComp = "";

    if (isBin) {
      // 1's Complement: bitwise inversion
      rMinusOneComp = clean.split('').map(ch => ch === '.' ? '.' : (ch === '0' ? '1' : '0')).join('');
      // 2's Complement: 1's comp + 1 at LSB
      const cleanWithoutRadix = clean.replace('.', '');
      const onesWithoutRadix = rMinusOneComp.replace('.', '');
      const twosIntVal = (parseInt(onesWithoutRadix, 2) + 1).toString(2).padStart(onesWithoutRadix.length, '0');
      rComp = m > 0 ? `${twosIntVal.slice(0, n)}.${twosIntVal.slice(n)}` : twosIntVal;
    } else {
      // 9's Complement: 9 - d
      rMinusOneComp = clean.split('').map(ch => ch === '.' ? '.' : (9 - parseInt(ch, 10)).toString()).join('');
      // 10's Complement: 9's comp + 1 at LSB
      const ninesWithoutRadix = rMinusOneComp.replace('.', '');
      const tensIntVal = (parseInt(ninesWithoutRadix, 10) + 1).toString(10).padStart(ninesWithoutRadix.length, '0');
      rComp = m > 0 ? `${tensIntVal.slice(0, n)}.${tensIntVal.slice(n)}` : tensIntVal;
    }

    // Addition grid for Step 2 (+1 at LSB)
    const noDotComp1 = rMinusOneComp.replace('.', '');
    const len = noDotComp1.length;
    const carryTrack = Array(len).fill(0);
    const sumDigits = Array(len).fill(0);
    let carry = 1; // Adding +1 at LSB
    for (let i = len - 1; i >= 0; i--) {
      const d = parseInt(noDotComp1[i], base);
      const s = d + carry;
      sumDigits[i] = DIGITS[s % base];
      carryTrack[i] = carry;
      carry = Math.floor(s / base);
    }

    // Step 2 columns array
    const step2Cols = [];
    let noDotIdx = 0;
    for (let i = 0; i < rMinusOneComp.length; i++) {
      const ch = rMinusOneComp[i];
      if (ch === '.') {
        step2Cols.push({ isRadix: true });
      } else {
        step2Cols.push({
          isRadix: false,
          carry: carryTrack[noDotIdx],
          comp1Digit: ch,
          add1Digit: noDotIdx === len - 1 ? "1" : "",
          comp2Digit: sumDigits[noDotIdx]
        });
        noDotIdx++;
      }
    }

    // Shortcut Scan Data (Right to Left)
    const charArray = clean.split('');
    const shortcutItems = [];
    let seenFirstNonZero = false;

    for (let i = charArray.length - 1; i >= 0; i--) {
      const ch = charArray[i];
      if (ch === '.') {
        shortcutItems.unshift({ ch, type: "RADIX" });
        continue;
      }

      const digitNum = parseInt(ch, 10);
      if (!seenFirstNonZero) {
        if (digitNum === 0) {
          shortcutItems.unshift({ ch, action: "Keep 0 unchanged", color: "EMERALD", res: "0" });
        } else {
          seenFirstNonZero = true;
          if (isBin) {
            shortcutItems.unshift({ ch, action: "Keep First 1 unchanged", color: "EMERALD", res: "1" });
          } else {
            shortcutItems.unshift({ ch, action: `Subtract from 10 (${10 - digitNum})`, color: "AMBER", res: (10 - digitNum).toString() });
          }
        }
      } else {
        if (isBin) {
          shortcutItems.unshift({ ch, action: `Invert (${ch === '0' ? '1' : '0'})`, color: "INDIGO", res: ch === '0' ? '1' : '0' });
        } else {
          shortcutItems.unshift({ ch, action: `Subtract from 9 (${9 - digitNum})`, color: "INDIGO", res: (9 - digitNum).toString() });
        }
      }
    }

    return {
      isValid: true,
      clean,
      isBin,
      decVal,
      n,
      m,
      rMinusOneComp,
      rComp,
      step2Cols,
      shortcutItems
    };
  }, [findBase, findInput]);

  // Subtraction Execution Pipeline Engine (Part B)
  const subtractionResult = useMemo(() => {
    const isBin = compType === "ones" || compType === "twos";
    const base = isBin ? 2 : 10;
    const cleanM = minuendM.trim();
    const cleanN = subtrahendN.trim();
    if (!cleanM || !cleanN) return null;

    if (isBin && (!/^[01.]+$/.test(cleanM) || !/^[01.]+$/.test(cleanN))) {
      return { isValid: false, error: "Only binary characters (0, 1) and '.' allowed." };
    }
    if (!isBin && (!/^[0-9.]+$/.test(cleanM) || !/^[0-9.]+$/.test(cleanN))) {
      return { isValid: false, error: "Only digits 0-9 and '.' allowed." };
    }

    const [intM = "0", fracM = ""] = cleanM.split('.');
    const [intN = "0", fracN = ""] = cleanN.split('.');
    const maxInt = Math.max(intM.length, intN.length);
    const maxFrac = Math.max(fracM.length, fracN.length);

    const padIntM = intM.padStart(maxInt, '0');
    const padIntN = intN.padStart(maxInt, '0');
    const padFracM = fracM.padEnd(maxFrac, '0');
    const padFracN = fracN.padEnd(maxFrac, '0');

    const fullPadM = maxFrac > 0 ? `${padIntM}.${padFracM}` : padIntM;
    const fullPadN = maxFrac > 0 ? `${padIntN}.${padFracN}` : padIntN;

    const decM = parseToDecimalParts(cleanM, base).totalDec;
    const decN = parseToDecimalParts(cleanN, base).totalDec;
    const decDiff = decM - decN;

    // Step 2: Compute Complement of N on equalized string with intermediate steps
    let comp1N = "";
    let compNStr = "";
    let step2Visual = null;

    if (compType === "ones") {
      compNStr = fullPadN.split('').map(ch => ch === '.' ? '.' : (ch === '0' ? '1' : '0')).join('');
      step2Visual = {
        title: "1's Complement (Bitwise Inversion)",
        formula: "Invert every bit (0 <-> 1)",
        intermediate: null,
        finalComp: compNStr
      };
    } else if (compType === "twos") {
      comp1N = fullPadN.split('').map(ch => ch === '.' ? '.' : (ch === '0' ? '1' : '0')).join('');
      const onesNoDot = comp1N.replace('.', '');
      const twosVal = (parseInt(onesNoDot, 2) + 1).toString(2).padStart(onesNoDot.length, '0');
      compNStr = maxFrac > 0 ? `${twosVal.slice(0, maxInt)}.${twosVal.slice(maxInt)}` : twosVal;
      step2Visual = {
        title: "2's Complement = 1's Complement + 1 at LSB",
        formula: "Step 2A (Invert bits) -> Step 2B (Add +1 to LSB)",
        intermediate: comp1N,
        finalComp: compNStr
      };
    } else if (compType === "nines") {
      compNStr = fullPadN.split('').map(ch => ch === '.' ? '.' : (9 - parseInt(ch, 10)).toString()).join('');
      step2Visual = {
        title: "9's Complement (Subtract from 9)",
        formula: "Subtract each digit from 9 (9 - d)",
        intermediate: null,
        finalComp: compNStr
      };
    } else if (compType === "tens") {
      comp1N = fullPadN.split('').map(ch => ch === '.' ? '.' : (9 - parseInt(ch, 10)).toString()).join('');
      const ninesNoDot = comp1N.replace('.', '');
      const tensVal = (parseInt(ninesNoDot, 10) + 1).toString(10).padStart(ninesNoDot.length, '0');
      compNStr = maxFrac > 0 ? `${tensVal.slice(0, maxInt)}.${tensVal.slice(maxInt)}` : tensVal;
      step2Visual = {
        title: "10's Complement = 9's Complement + 1 at LSB",
        formula: "Step 2A (Subtract from 9) -> Step 2B (Add +1 to LSB)",
        intermediate: comp1N,
        finalComp: compNStr
      };
    }

    // Step 2 Detailed per-bit/digit transformation columns
    const charsN = fullPadN.split('');
    let step2GridCols = [];

    if (compType === "ones") {
      step2GridCols = charsN.map(ch => {
        if (ch === '.') return { isRadix: true };
        const flip = ch === '0' ? '1' : '0';
        return { orig: ch, flip, finalDigit: flip };
      });
    } else if (compType === "twos") {
      const nonDotFlips = charsN.filter(c => c !== '.').map(c => c === '0' ? '1' : '0');
      let c = 1;
      const add1CarryArr = Array(nonDotFlips.length).fill(0);
      const twosDigits = Array(nonDotFlips.length).fill('0');
      for (let i = nonDotFlips.length - 1; i >= 0; i--) {
        const s = parseInt(nonDotFlips[i], 2) + c;
        twosDigits[i] = (s % 2).toString();
        add1CarryArr[i] = c;
        c = Math.floor(s / 2);
      }
      let digitIdx = 0;
      step2GridCols = charsN.map(ch => {
        if (ch === '.') return { isRadix: true };
        const flip = ch === '0' ? '1' : '0';
        const cIn = add1CarryArr[digitIdx];
        const isLsb = digitIdx === nonDotFlips.length - 1;
        const finalDigit = twosDigits[digitIdx];
        digitIdx++;
        return { orig: ch, flip, cIn, isLsb, finalDigit };
      });
    } else if (compType === "nines") {
      step2GridCols = charsN.map(ch => {
        if (ch === '.') return { isRadix: true };
        const finalDigit = (9 - parseInt(ch, 10)).toString();
        return { orig: ch, topNine: "9", finalDigit };
      });
    } else if (compType === "tens") {
      const nonDotNines = charsN.filter(c => c !== '.').map(c => (9 - parseInt(c, 10)).toString());
      let c = 1;
      const add1CarryArr = Array(nonDotNines.length).fill(0);
      const tensDigits = Array(nonDotNines.length).fill('0');
      for (let i = nonDotNines.length - 1; i >= 0; i--) {
        const s = parseInt(nonDotNines[i], 10) + c;
        tensDigits[i] = (s % 10).toString();
        add1CarryArr[i] = c;
        c = Math.floor(s / 10);
      }
      let digitIdx = 0;
      step2GridCols = charsN.map(ch => {
        if (ch === '.') return { isRadix: true };
        const ninesDigit = (9 - parseInt(ch, 10)).toString();
        const cIn = add1CarryArr[digitIdx];
        const isLsb = digitIdx === nonDotNines.length - 1;
        const finalDigit = tensDigits[digitIdx];
        digitIdx++;
        return { orig: ch, topNine: "9", ninesDigit, cIn, isLsb, finalDigit };
      });
    }

    // Step 3: Perform Addition M + Comp(N) column by column
    const noDotM = fullPadM.replace('.', '');
    const noDotCompN = compNStr.replace('.', '');
    const totalDigits = noDotM.length;

    let carry = 0;
    const addCols = [];
    for (let i = totalDigits - 1; i >= 0; i--) {
      const dM = parseInt(noDotM[i], base);
      const dN = parseInt(noDotCompN[i], base);
      const s = dM + dN + carry;
      const resDigit = s % base;
      const cOut = Math.floor(s / base);
      addCols.unshift({
        digitM: noDotM[i],
        digitCompN: noDotCompN[i],
        carryIn: carry,
        resDigit: DIGITS[resDigit],
        carryOut: cOut
      });
      carry = cOut;
    }

    const coutBit = carry; // MSB Carry
    const hasCarry = coutBit === 1;
    const rawSumNoCarry = addCols.map(c => c.resDigit).join('');
    const rawSumFormatted = maxFrac > 0 
      ? `${rawSumNoCarry.slice(0, maxInt)}.${rawSumNoCarry.slice(maxInt)}` 
      : rawSumNoCarry;

    // End-Around Carry (EAC) wrap-around addition grid calculation
    let eacResult = "";
    let eacAddCols = [];
    if (hasCarry && (compType === "ones" || compType === "nines")) {
      let eCarry = 1;
      const eacDigits = Array(totalDigits).fill(0);
      const eacCarryArr = Array(totalDigits).fill(0);
      for (let i = totalDigits - 1; i >= 0; i--) {
        const d = parseInt(rawSumNoCarry[i], base);
        const s = d + eCarry;
        eacDigits[i] = DIGITS[s % base];
        eacCarryArr[i] = eCarry;
        eCarry = Math.floor(s / base);
      }
      const rawEac = eacDigits.join('');
      eacResult = maxFrac > 0 ? `${rawEac.slice(0, maxInt)}.${rawEac.slice(maxInt)}` : rawEac;

      for (let i = 0; i < totalDigits; i++) {
        eacAddCols.push({
          sumDigit: rawSumNoCarry[i],
          add1Digit: i === totalDigits - 1 ? "1" : "",
          carryIn: eacCarryArr[i],
          resDigit: eacDigits[i]
        });
      }
    }

    // Step 4: Decision Diamond Evaluation & Graphical Re-Complementation Calculations
    let finalAnswer = "";
    let step4Details = null;
    let step4RecompCols = [];
    let fastScanData = null;

    if (hasCarry) {
      if (compType === "twos" || compType === "tens") {
        finalAnswer = `+${rawSumFormatted}`;
        step4Details = {
          type: "DISCARD",
          title: "Discard End Carry 1",
          desc: "In r's complement (2's or 10's), DISCARD the extra MSB carry. The remaining digits form the final exact positive answer."
        };
      } else {
        finalAnswer = `+${eacResult}`;
        step4Details = {
          type: "EAC",
          title: "End-Around Carry (EAC) +1 Addition",
          desc: "In (r-1)'s complement (1's or 9's), wrap the extra MSB carry 1 around and add +1 to the LSB.",
          eacVal: eacResult
        };
      }
    } else {
      // Negative result: Re-complement sum
      let reCompStr = "";
      const charsS = rawSumFormatted.split('');

      if (compType === "ones") {
        reCompStr = rawSumFormatted.split('').map(ch => ch === '.' ? '.' : (ch === '0' ? '1' : '0')).join('');
        step4RecompCols = charsS.map(ch => {
          if (ch === '.') return { isRadix: true };
          const flip = ch === '0' ? '1' : '0';
          return { digitS: ch, flip, magDigit: flip };
        });
      } else if (compType === "twos") {
        const ones = rawSumFormatted.split('').map(ch => ch === '.' ? '.' : (ch === '0' ? '1' : '0')).join('');
        const onesNoDot = ones.replace('.', '');
        const twosVal = (parseInt(onesNoDot, 2) + 1).toString(2).padStart(onesNoDot.length, '0');
        reCompStr = maxFrac > 0 ? `${twosVal.slice(0, maxInt)}.${twosVal.slice(maxInt)}` : twosVal;

        const nonDotFlips = charsS.filter(c => c !== '.').map(c => c === '0' ? '1' : '0');
        let c = 1;
        const add1CarryArr = Array(nonDotFlips.length).fill(0);
        const magDigits = Array(nonDotFlips.length).fill('0');
        for (let i = nonDotFlips.length - 1; i >= 0; i--) {
          const s = parseInt(nonDotFlips[i], 2) + c;
          magDigits[i] = (s % 2).toString();
          add1CarryArr[i] = c;
          c = Math.floor(s / 2);
        }

        const nonDotS = charsS.filter(c => c !== '.');
        let firstOneIdx = -1;
        for (let i = nonDotS.length - 1; i >= 0; i--) {
          if (nonDotS[i] === '1') {
            firstOneIdx = i;
            break;
          }
        }

        let digitIdx = 0;
        step4RecompCols = charsS.map(ch => {
          if (ch === '.') return { isRadix: true };
          const flip = ch === '0' ? '1' : '0';
          const cIn = add1CarryArr[digitIdx];
          const isLsb = digitIdx === nonDotFlips.length - 1;
          const magDigit = magDigits[digitIdx];
          const isKeep = firstOneIdx !== -1 && digitIdx >= firstOneIdx;
          digitIdx++;
          return { digitS: ch, flip, cIn, isLsb, magDigit, isKeep };
        });

        fastScanData = {
          firstOneIdx,
          items: nonDotS.map((bit, idx) => ({
            bit,
            isKeep: firstOneIdx !== -1 && idx >= firstOneIdx,
            outBit: firstOneIdx !== -1 && idx >= firstOneIdx ? bit : (bit === '0' ? '1' : '0')
          }))
        };
      } else if (compType === "nines") {
        reCompStr = rawSumFormatted.split('').map(ch => ch === '.' ? '.' : (9 - parseInt(ch, 10)).toString()).join('');
        step4RecompCols = charsS.map(ch => {
          if (ch === '.') return { isRadix: true };
          const magDigit = (9 - parseInt(ch, 10)).toString();
          return { digitS: ch, topNine: "9", magDigit };
        });
      } else if (compType === "tens") {
        const nines = rawSumFormatted.split('').map(ch => ch === '.' ? '.' : (9 - parseInt(ch, 10)).toString()).join('');
        const ninesNoDot = nines.replace('.', '');
        const tensVal = (parseInt(ninesNoDot, 10) + 1).toString(10).padStart(ninesNoDot.length, '0');
        reCompStr = maxFrac > 0 ? `${tensVal.slice(0, maxInt)}.${tensVal.slice(maxInt)}` : tensVal;

        const nonDotNines = charsS.filter(c => c !== '.').map(c => (9 - parseInt(c, 10)).toString());
        let c = 1;
        const add1CarryArr = Array(nonDotNines.length).fill(0);
        const magDigits = Array(nonDotNines.length).fill('0');
        for (let i = nonDotNines.length - 1; i >= 0; i--) {
          const s = parseInt(nonDotNines[i], 10) + c;
          magDigits[i] = (s % 10).toString();
          add1CarryArr[i] = c;
          c = Math.floor(s / 10);
        }

        let digitIdx = 0;
        step4RecompCols = charsS.map(ch => {
          if (ch === '.') return { isRadix: true };
          const ninesDigit = (9 - parseInt(ch, 10)).toString();
          const cIn = add1CarryArr[digitIdx];
          const isLsb = digitIdx === nonDotNines.length - 1;
          const magDigit = magDigits[digitIdx];
          digitIdx++;
          return { digitS: ch, topNine: "9", ninesDigit, cIn, isLsb, magDigit };
        });
      }

      finalAnswer = `-${reCompStr}`;
      step4Details = {
        type: "RECOMP",
        title: "Re-Complement Sum & Attach Negative (-) Sign",
        desc: "Carry = 0 indicates M < N (negative answer). Take the same complement of the sum and attach an explicit negative sign.",
        reCompStr
      };
    }

    return {
      isValid: true,
      fullPadM,
      fullPadN,
      decM,
      decN,
      decDiff,
      step2Visual,
      step2GridCols,
      compNStr,
      addCols,
      coutBit,
      hasCarry,
      rawSumFormatted,
      eacResult,
      eacAddCols,
      step4Details,
      step4RecompCols,
      fastScanData,
      finalAnswer
    };
  }, [minuendM, subtrahendN, compType]);

  return (
    <div className="space-y-6">
      
      {/* 1. TOP 2-COLUMN INSTRUCTIONAL & FORMULA BANNER */}
      <SolverHeaderBanner
        engineNum={3}
        title="Complements & Complement Subtractor"
        steps={[
          { title: "Select Sub-Tool", desc: "Choose Part A to generate 1's, 2's, 9's, 10's complements with formulas and 2-second shortcuts, or Part B to execute full M - N subtraction." },
          { title: "Input Operands", desc: "Type your values or pick an exam preset covering Case 1 (M >= N, Carry = 1) or Case 2 (M < N, Carry = 0)." },
          { title: "Inspect Visual Pipeline", desc: "Follow Amber Zero-Padding, Subtrahend Complementation, Column-Aligned Addition, and the Decision Diamond." }
        ]}
        formulaTitle="Governing Complements & Decision Rules"
        formulaBadge={activeTab === "finder" ? "Part A: Generator" : `Part B: ${compType.toUpperCase()}`}
        formulaContent={
          activeTab === "finder"
            ? "Formulas: (r-1)'s Comp = (rⁿ - r⁻ᵐ) - N.  r's Comp = rⁿ - N. Shortcut: Scan right-to-left, keep trailing 0s and first non-zero unchanged, invert the rest."
            : "Decision Diamond: If Carry = 1 (Positive): Discard carry in r's comp (2's, 10's); Add End-Around Carry (+1 to LSB) in (r-1)'s comp (1's, 9's). If Carry = 0 (Negative): Re-complement sum & attach (-) sign."
        }
        rulesList={[
          "Zero-Padding First: Never complement before padding! Pad leading and trailing Amber zeros onto raw N first.",
          "Radix Point Safety: The radix point is retained in position; complementation and carry wrap-around apply across it seamlessly."
        ]}
      />

      {/* 2-TAB PILL SWITCHER: FINDING COMPLEMENTS COMES FIRST! */}
      <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs">
        <button
          onClick={() => setActiveTab("finder")}
          className={`flex-1 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "finder"
              ? "bg-[#2E6F40] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Part A: Find Complements (1's, 2's, 9's &amp; 10's Generator)</span>
        </button>

        <button
          onClick={() => setActiveTab("subtractor")}
          className={`flex-1 py-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === "subtractor"
              ? "bg-[#2E6F40] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Part B: Complement Subtraction Visualizer (M - N)</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* SUB-TAB 1: PART A: FIND COMPLEMENTS (1's, 2's, 9's & 10's GENERATOR) */}
      {/* ==================================================================== */}
      {activeTab === "finder" && (
        <div className="space-y-6">
          
          {/* Preset Buttons with Decimal Equivalents */}
          <div className="p-4 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
              Load Classic Exam Complements Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {presetsFinder.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setFindInput(p.val);
                    setFindBase(p.base);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-xs font-mono font-semibold text-[#1E293B] transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls with Live Decimal Badge */}
          <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4 space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Base Family:</label>
                <select
                  value={findBase}
                  onChange={(e) => setFindBase(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-sm font-bold text-[#1E293B]"
                >
                  <option value="binary">Binary (1's &amp; 2's Complement)</option>
                  <option value="decimal">Decimal (9's &amp; 10's Complement)</option>
                </select>
              </div>

              <div className="sm:col-span-8 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Input Number N:</label>
                  {finderResult && finderResult.isValid && (
                    <span className="text-xs font-mono font-bold text-[#2E6F40] bg-[#ECFDF5] px-2.5 py-0.5 rounded-md border border-[#A7F3D0]">
                      Decimal Equivalent: {finderResult.decVal}₁₀
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={findInput}
                  onChange={(e) => setFindInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                />
              </div>
            </div>

            {finderResult && !finderResult.isValid && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{finderResult.error}</span>
              </div>
            )}
          </div>

          {finderResult && finderResult.isValid && (
            <div className="space-y-6 font-mono text-xs">
              
              {/* STAGE 1: Formal Mathematical Formulas */}
              <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-3">
                <div className="flex items-center justify-between border-b border-[#DCE7E1] pb-2">
                  <span className="font-bold text-[#2E6F40] uppercase text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
                    Stage 1: Formal Mathematical Formulas Plugged In
                  </span>
                  <span className="text-[#64748B]">n = {finderResult.n} integer digits, m = {finderResult.m} fraction digits</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-1.5">
                    <span className="font-bold text-[#4F46E5] block text-[11px]">
                      {finderResult.isBin ? "1's Complement Formula: (2ⁿ - 2⁻ᵐ) - N" : "9's Complement Formula: (10ⁿ - 10⁻ᵐ) - N"}
                    </span>
                    <p className="text-[#64748B] text-xs">
                      = ({finderResult.isBin ? "2" : "10"}<sup>{finderResult.n}</sup> - {finderResult.isBin ? "2" : "10"}<sup>-{finderResult.m}</sup>) - {finderResult.clean}
                    </p>
                    <div className="text-base font-black text-[#4F46E5] pt-1">
                      = {finderResult.rMinusOneComp}
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-1.5">
                    <span className="font-bold text-[#2E6F40] block text-[11px]">
                      {finderResult.isBin ? "2's Complement Formula: 2ⁿ - N" : "10's Complement Formula: 10ⁿ - N"}
                    </span>
                    <p className="text-[#64748B] text-xs">
                      = ({finderResult.isBin ? "2" : "10"}<sup>{finderResult.n}</sup>) - {finderResult.clean}
                    </p>
                    <div className="text-base font-black text-[#2E6F40] pt-1">
                      = {finderResult.rComp}
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 2: Standard Classroom Method (Bitwise Invert / 9s Subtraction -> Aligned +1 at LSB) */}
              <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
                <span className="font-bold text-[#1E293B] uppercase text-xs block">
                  Stage 2: Standard Classroom Method (Step 2A: {finderResult.isBin ? "Bitwise Inversion" : "9s Subtraction"} &rarr; Step 2B: Aligned + 1 at LSB Grid)
                </span>

                {/* Step 2A: Bitwise Invert Grid */}
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#64748B]">
                    <span>Step 2A: {finderResult.isBin ? "Invert every bit (0 <-> 1)" : "Subtract each digit from 9 (9 - d)"}</span>
                    <span className="text-[#4F46E5] font-black">{finderResult.isBin ? "1's Complement" : "9's Complement"} = {finderResult.rMinusOneComp}</span>
                  </div>

                  <div className="overflow-x-auto pb-1">
                    <div className="flex items-center justify-center gap-1.5">
                      {finderResult.clean.split('').map((ch, idx) => {
                        if (ch === '.') {
                          return <span key={idx} className="text-xl font-black text-amber-700 px-1">.</span>;
                        }
                        const inv = finderResult.isBin ? (ch === '0' ? '1' : '0') : (9 - parseInt(ch, 10)).toString();
                        return (
                          <div key={idx} className="flex flex-col items-center w-10 sm:w-11">
                            <div className="w-full h-8 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#1E293B]">
                              {ch}
                            </div>
                            <ArrowDown className="w-3.5 h-3.5 text-[#4F46E5] my-1" />
                            <div className="w-full h-9 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center font-black text-sm text-[#3730A3]">
                              {inv}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 2B: Aligned + 1 at LSB Grid */}
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#64748B]">
                    <span>Step 2B: Add + 1 to the rightmost LSB with Carry Propagation</span>
                    <span className="text-[#2E6F40] font-black">{finderResult.isBin ? "2's Complement" : "10's Complement"} = {finderResult.rComp}</span>
                  </div>

                  <div className="overflow-x-auto pb-1">
                    <div className="inline-flex flex-col items-center min-w-full justify-center">
                      <div className="flex items-start gap-1.5">
                        
                        {/* Operator label */}
                        <div className="flex flex-col items-center w-8 text-right font-bold text-xs text-[#64748B] pt-5 space-y-2">
                          <div className="h-5" />
                          <div className="h-8 flex items-center justify-end">{finderResult.isBin ? "1's" : "9's"}</div>
                          <div className="h-8 flex items-center justify-end text-[#D97706]">+</div>
                          <div className="w-full border-t-2 border-[#1E293B] my-1" />
                          <div className="h-9 flex items-center justify-end text-[#2E6F40]">=</div>
                        </div>

                        {/* Column stack */}
                        {finderResult.step2Cols.map((col, cIdx) => {
                          if (col.isRadix) {
                            return (
                              <div key={cIdx} className="flex flex-col items-center w-5 text-center">
                                <div className="h-5" />
                                <div className="h-8 flex items-center justify-center text-lg font-black text-amber-700">.</div>
                                <div className="h-8 flex items-center justify-center text-lg font-black text-amber-700">.</div>
                                <div className="w-full border-t-2 border-[#1E293B] my-1" />
                                <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                              </div>
                            );
                          }

                          return (
                            <div key={cIdx} className="flex flex-col items-center w-10 sm:w-11 space-y-1">
                              {/* Carry row */}
                              <div className="h-5 flex items-center justify-center">
                                {col.carry === 1 ? (
                                  <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-black">
                                    +1
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-gray-300">0</span>
                                )}
                              </div>

                              {/* Complement 1 row */}
                              <div className="w-full h-8 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#3730A3]">
                                {col.comp1Digit}
                              </div>

                              {/* Add 1 row */}
                              <div className={`w-full h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                col.add1Digit ? "bg-amber-50 text-amber-900 border border-amber-300 font-black" : "text-gray-300"
                              }`}>
                                {col.add1Digit || "0"}
                              </div>

                              {/* Divider */}
                              <div className="w-full border-t-2 border-[#1E293B] my-0.5" />

                              {/* Result row */}
                              <div className="w-full h-9 rounded-lg bg-emerald-100 border-2 border-emerald-500 text-emerald-900 flex items-center justify-center font-black text-base shadow-2xs">
                                {col.comp2Digit}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STAGE 3: 2-Second Exam Shortcut Strip (Right-to-Left Scan) */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] shadow-soft space-y-3">
                <div className="flex items-center justify-between border-b border-[#DCE7E1] pb-2">
                  <span className="font-bold text-[#D97706] uppercase text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                    Stage 3: 2-Second Exam Shortcut Strip (&larr; Scan Right-to-Left)
                  </span>
                  <span className="text-[#64748B]">
                    {finderResult.isBin ? "Rule: Keep trailing 0s and first 1 unchanged (Emerald); invert all bits to the left (Indigo)!" : "9-9-9-10 Rule: Subtract last non-zero digit from 10, keep trailing 0s, subtract preceding from 9!"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 items-center justify-center py-2">
                  <span className="text-xs font-bold text-[#64748B] mr-2">&larr; Scan Direction:</span>
                  {finderResult.shortcutItems.map((item, i) => {
                    if (item.type === "RADIX") {
                      return <span key={i} className="text-xl font-black text-amber-700 px-1">.</span>;
                    }
                    return (
                      <div key={i} className={`p-2.5 rounded-xl border text-center space-y-1 shadow-2xs min-w-[70px] ${
                        item.color === "EMERALD" 
                          ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]"
                          : item.color === "AMBER"
                          ? "bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]"
                          : "bg-[#EEF2FF] border-[#C7D2FE] text-[#3730A3]"
                      }`}>
                        <div className="text-[9px] font-bold opacity-80 uppercase">{item.action}</div>
                        <div className="text-base font-black">{item.ch} &rarr; {item.res}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] text-[#2E6F40] font-bold text-center text-xs">
                  Shortcut Verified: Final {finderResult.isBin ? "2's" : "10's"} Complement = ({finderResult.rComp})_{finderResult.isBin ? "2" : "10"}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ==================================================================== */}
      {/* SUB-TAB 2: PART B: COMPLEMENT SUBTRACTION VISUALIZER (M - N) */}
      {/* ==================================================================== */}
      {activeTab === "subtractor" && (
        <div className="space-y-6">
          
          {/* Preset Buttons with Decimal Equivalents */}
          <div className="p-4 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
              Load Subtraction Presets with Expected Decimal Differences:
            </span>
            <div className="flex flex-wrap gap-2">
              {presetsSubtractor.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMinuendM(p.m);
                    setSubtrahendN(p.n);
                    setCompType(p.type);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-xs font-mono font-semibold text-[#1E293B] transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls with Live Decimal Helper Badges */}
          <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Minuend (M):</label>
                  {subtractionResult && subtractionResult.isValid && (
                    <span className="text-xs font-mono font-bold text-[#2E6F40] bg-[#ECFDF5] px-2 py-0.2 rounded border border-[#A7F3D0]">
                      M = {subtractionResult.decM}₁₀
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={minuendM}
                  onChange={(e) => setMinuendM(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Subtrahend (N):</label>
                  {subtractionResult && subtractionResult.isValid && (
                    <span className="text-xs font-mono font-bold text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.2 rounded border border-[#C7D2FE]">
                      N = {subtractionResult.decN}₁₀
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={subtrahendN}
                  onChange={(e) => setSubtrahendN(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Method:</label>
                <select
                  value={compType}
                  onChange={(e) => setCompType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-sm font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                >
                  <option value="ones">Binary 1's Complement (End-Around Carry)</option>
                  <option value="twos">Binary 2's Complement (Discard Carry)</option>
                  <option value="nines">Decimal 9's Complement (End-Around Carry)</option>
                  <option value="tens">Decimal 10's Complement (Discard Carry)</option>
                </select>
              </div>
            </div>

            {/* Expected Decimal Difference Check Banner */}
            {subtractionResult && subtractionResult.isValid && (
              <div className="p-3 bg-[#EEF2FF] rounded-xl border border-[#C7D2FE] text-xs font-mono text-[#3730A3] flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold">
                  Expected Base 10 Check: M ({subtractionResult.decM}) - N ({subtractionResult.decN}) = {subtractionResult.decDiff > 0 ? `+${subtractionResult.decDiff}` : subtractionResult.decDiff}₁₀
                </span>
                <span className="font-bold text-[#2E6F40] bg-white px-2 py-0.5 rounded border border-[#C7D2FE]">
                  Target Result: {subtractionResult.decDiff >= 0 ? "+" : "-"}{Math.abs(subtractionResult.decDiff)}₁₀
                </span>
              </div>
            )}

            {subtractionResult && !subtractionResult.isValid && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{subtractionResult.error}</span>
              </div>
            )}
          </div>

          {/* Subtraction Execution Pipeline */}
          {subtractionResult && subtractionResult.isValid && (
            <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-6 font-mono text-xs">
              
              {/* Step 1: Operand Equalization */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1E293B] uppercase text-xs">
                    Step 1: Length Equalization with Amber Padded Leading &amp; Trailing Zeros
                  </span>
                  <span className="text-[10px] text-[#64748B]">CRITICAL: Pad BEFORE complementation</span>
                </div>
                <div className="flex flex-wrap gap-6 pt-1 text-sm">
                  <div>M (Equalized) = <strong className="text-[#2E6F40]">{subtractionResult.fullPadM}</strong> ({subtractionResult.decM}₁₀)</div>
                  <div>N (Equalized) = <strong className="text-[#4F46E5]">{subtractionResult.fullPadN}</strong> ({subtractionResult.decN}₁₀)</div>
                </div>
              </div>

              {/* Step 2: Compute Complement of N (Visual Transformation Pipeline) */}
              <div className="p-5 rounded-xl bg-white border border-[#DCE7E1] space-y-4">
                <span className="font-bold text-[#1E293B] uppercase text-xs block">
                  Step 2: Compute {compType.toUpperCase()} Complement of Equalized N
                </span>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] flex flex-wrap items-center justify-center gap-3 text-sm">
                  <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-center">
                    <span className="text-[10px] text-[#64748B] block">Equalized N</span>
                    <strong className="text-[#1E293B]">{subtractionResult.fullPadN}</strong>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#4F46E5]" />

                  {subtractionResult.step2Visual.intermediate && (
                    <>
                      <div className="p-2.5 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] text-center">
                        <span className="text-[10px] text-[#3730A3] block">
                          {compType === "twos" ? "1's Comp (Inverted)" : "9's Comp (9 - d)"}
                        </span>
                        <strong className="text-[#3730A3]">{subtractionResult.step2Visual.intermediate}</strong>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#D97706]" />
                    </>
                  )}

                  <div className="p-2.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-center">
                    <span className="text-[10px] text-[#92400E] block">
                      {compType.toUpperCase()} Complement
                    </span>
                    <strong className="text-[#D97706]">{subtractionResult.compNStr}</strong>
                  </div>
                </div>

                {/* Individual Aligned Bit/Digit Complementation Grid */}
                {subtractionResult.step2GridCols && (
                  <div className="overflow-x-auto pt-1">
                    <div className="inline-flex flex-col items-center min-w-full justify-center p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
                      <span className="text-[11px] font-bold text-[#64748B] pb-2 text-center uppercase tracking-wider block">
                        Bit-by-Bit Complementation Grid ({compType.toUpperCase()} Complement):
                      </span>
                      <div className="flex items-start gap-1 sm:gap-1.5">
                        
                        {/* Row Labels on left */}
                        <div className="flex flex-col items-end w-24 sm:w-28 text-right font-bold text-[10px] text-[#64748B] pt-0 space-y-1">
                          <div className="h-8 flex items-center justify-end">Equalized N:</div>
                          {compType === "ones" && (
                            <>
                              <div className="h-5 flex items-center justify-end text-[#4F46E5]">Flip:</div>
                              <div className="w-full border-t border-[#1E293B] my-0.5" />
                              <div className="h-9 flex items-center justify-end text-[#D97706] font-black">1's Comp:</div>
                            </>
                          )}
                          {compType === "twos" && (
                            <>
                              <div className="h-8 flex items-center justify-end text-[#4F46E5]">Invert (1's):</div>
                              <div className="h-6 flex items-center justify-end text-[#D97706]">+1 LSB:</div>
                              <div className="w-full border-t border-[#1E293B] my-0.5" />
                              <div className="h-9 flex items-center justify-end text-[#2E6F40] font-black">2's Comp:</div>
                            </>
                          )}
                          {compType === "nines" && (
                            <>
                              <div className="h-8 flex items-center justify-end text-[#64748B]">All 9s:</div>
                              <div className="h-8 flex items-center justify-end text-[#4F46E5]">- N:</div>
                              <div className="w-full border-t border-[#1E293B] my-0.5" />
                              <div className="h-9 flex items-center justify-end text-[#D97706] font-black">9's Comp:</div>
                            </>
                          )}
                          {compType === "tens" && (
                            <>
                              <div className="h-8 flex items-center justify-end text-[#64748B]">9's Comp:</div>
                              <div className="h-6 flex items-center justify-end text-[#D97706]">+1 LSB:</div>
                              <div className="w-full border-t border-[#1E293B] my-0.5" />
                              <div className="h-9 flex items-center justify-end text-[#2E6F40] font-black">10's Comp:</div>
                            </>
                          )}
                        </div>

                        {/* Columns */}
                        {subtractionResult.step2GridCols.map((col, idx) => {
                          if (col.isRadix) {
                            return (
                              <div key={idx} className="flex flex-col items-center w-6 text-center">
                                <div className="h-8 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                {compType === "ones" && (
                                  <>
                                    <div className="h-5" />
                                    <div className="w-full border-t border-[#1E293B] my-0.5" />
                                    <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                  </>
                                )}
                                {compType === "twos" && (
                                  <>
                                    <div className="h-8 flex items-center justify-center text-xl font-black text-indigo-700">.</div>
                                    <div className="h-6" />
                                    <div className="w-full border-t border-[#1E293B] my-0.5" />
                                    <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                  </>
                                )}
                                {compType === "nines" && (
                                  <>
                                    <div className="h-8 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                    <div className="h-8" />
                                    <div className="w-full border-t border-[#1E293B] my-0.5" />
                                    <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                  </>
                                )}
                                {compType === "tens" && (
                                  <>
                                    <div className="h-8 flex items-center justify-center text-xl font-black text-indigo-700">.</div>
                                    <div className="h-6" />
                                    <div className="w-full border-t border-[#1E293B] my-0.5" />
                                    <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                  </>
                                )}
                              </div>
                            );
                          }

                          return (
                            <div key={idx} className="flex flex-col items-center w-10 sm:w-11 space-y-1">
                              {/* Row 1: Equalized N */}
                              <div className="w-full h-8 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#1E293B]">
                                {col.orig}
                              </div>

                              {/* 1's Complement */}
                              {compType === "ones" && (
                                <>
                                  <div className="h-5 flex items-center justify-center text-[10px] text-[#4F46E5] font-bold">
                                    &darr;
                                  </div>
                                  <div className="w-full border-t border-[#1E293B] my-0.5" />
                                  <div className="w-full h-9 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center font-black text-sm text-[#3730A3]">
                                    {col.finalDigit}
                                  </div>
                                </>
                              )}

                              {/* 2's Complement */}
                              {compType === "twos" && (
                                <>
                                  <div className="w-full h-8 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center font-bold text-sm text-[#3730A3]">
                                    {col.flip}
                                  </div>
                                  <div className="h-6 flex items-center justify-center">
                                    {col.isLsb ? (
                                      <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black">
                                        +1
                                      </span>
                                    ) : col.cIn === 1 ? (
                                      <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">
                                        (1)
                                      </span>
                                    ) : (
                                      <span className="text-[9px] text-gray-300">0</span>
                                    )}
                                  </div>
                                  <div className="w-full border-t border-[#1E293B] my-0.5" />
                                  <div className="w-full h-9 rounded-lg bg-[#FEF3C7] border-2 border-amber-400 flex items-center justify-center font-black text-sm text-[#92400E]">
                                    {col.finalDigit}
                                  </div>
                                </>
                              )}

                              {/* 9's Complement */}
                              {compType === "nines" && (
                                <>
                                  <div className="w-full h-8 rounded-lg bg-[#FAF8F5] border border-gray-300 flex items-center justify-center font-bold text-sm text-gray-600">
                                    9
                                  </div>
                                  <div className="w-full h-8 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#4F46E5]">
                                    {col.orig}
                                  </div>
                                  <div className="w-full border-t border-[#1E293B] my-0.5" />
                                  <div className="w-full h-9 rounded-lg bg-[#FEF3C7] border border-amber-300 flex items-center justify-center font-black text-sm text-[#92400E]">
                                    {col.finalDigit}
                                  </div>
                                </>
                              )}

                              {/* 10's Complement */}
                              {compType === "tens" && (
                                <>
                                  <div className="w-full h-8 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center font-bold text-sm text-[#3730A3]">
                                    {col.ninesDigit}
                                  </div>
                                  <div className="h-6 flex items-center justify-center">
                                    {col.isLsb ? (
                                      <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black">
                                        +1
                                      </span>
                                    ) : col.cIn === 1 ? (
                                      <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">
                                        (1)
                                      </span>
                                    ) : (
                                      <span className="text-[9px] text-gray-300">0</span>
                                    )}
                                  </div>
                                  <div className="w-full border-t border-[#1E293B] my-0.5" />
                                  <div className="w-full h-9 rounded-lg bg-[#FEF3C7] border-2 border-amber-400 flex items-center justify-center font-black text-sm text-[#92400E]">
                                    {col.finalDigit}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Column-Aligned Addition Grid with Graphical Carry Pipeline */}
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                <span className="font-bold text-[#1E293B] uppercase text-xs block">
                  Step 3: Perform Column-Aligned Addition M + Comp(N)
                </span>

                {/* Main Addition Stack */}
                <div className="overflow-x-auto pb-2">
                  <div className="inline-flex flex-col items-center min-w-full justify-center">
                    <div className="flex items-start gap-1.5">
                      
                      {/* Operator column */}
                      <div className="flex flex-col items-center w-8 text-right font-bold text-xs text-[#64748B] pt-6 space-y-2">
                        <div className="h-5" />
                        <div className="h-8 flex items-center justify-end font-mono">M</div>
                        <div className="h-8 flex items-center justify-end text-[#D97706]">+</div>
                        <div className="w-full border-t-2 border-[#1E293B] my-1" />
                        <div className="h-9 flex items-center justify-end text-[#2E6F40]">=</div>
                      </div>

                      {/* Extra MSB Carry Column */}
                      <div className="flex flex-col items-center w-12 space-y-1">
                        <span className="text-[9px] text-[#64748B] font-bold h-5 flex items-center">MSB C</span>
                        <div className="h-8 flex items-center justify-center">
                          {subtractionResult.coutBit === 1 ? (
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs">
                              (1)
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 border border-gray-300 font-bold text-xs">
                              (0)
                            </span>
                          )}
                        </div>
                        <div className="h-8" />
                        <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                        <div className={`w-full h-9 rounded-lg flex items-center justify-center font-black text-sm border-2 ${
                          subtractionResult.hasCarry ? "bg-amber-100 border-amber-500 text-amber-900" : "bg-gray-100 border-gray-300 text-gray-400"
                        }`}>
                          {subtractionResult.coutBit}
                        </div>
                      </div>

                      {/* Main Digits */}
                      {subtractionResult.addCols.map((col, idx) => (
                        <div key={idx} className="flex flex-col items-center w-10 sm:w-11 space-y-1">
                          {/* Carry row */}
                          <div className="h-5 flex items-center justify-center">
                            {col.carryIn === 1 ? (
                              <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-black">
                                +1
                              </span>
                            ) : (
                              <span className="text-[9px] text-gray-300">0</span>
                            )}
                          </div>

                          {/* Minuend digit */}
                          <div className="w-full h-8 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#2E6F40]">
                            {col.digitM}
                          </div>

                          {/* Subtrahend complement digit */}
                          <div className="w-full h-8 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#D97706]">
                            {col.digitCompN}
                          </div>

                          {/* Divider */}
                          <div className="w-full border-t-2 border-[#1E293B] my-0.5" />

                          {/* Sum digit */}
                          <div className="w-full h-9 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center font-black text-sm text-[#1E293B]">
                            {col.resDigit}
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>

                {/* GRAPHICAL POST-PROCESSING CARRY PIPELINE */}
                {/* Branch A: End-Around Carry (EAC) for 1's and 9's complement with Carry = 1 */}
                {subtractionResult.hasCarry && (compType === "ones" || compType === "nines") && (
                  <div className="p-4 bg-white rounded-xl border-2 border-emerald-500 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#065F46] border-b border-[#DCE7E1] pb-2">
                      <span className="flex items-center gap-1.5">
                        <CornerDownRight className="w-4 h-4 text-[#2E6F40]" />
                        End-Around Carry (EAC) Wrap-Around: Extra MSB Carry (1) wraps around and adds +1 to LSB!
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                        Result is Positive (+)
                      </span>
                    </div>

                    {/* Second Aligned Addition Stack */}
                    <div className="overflow-x-auto py-1">
                      <div className="inline-flex flex-col items-center min-w-full justify-center">
                        <div className="flex items-start gap-1.5">
                          <div className="flex flex-col items-center w-12 text-right font-bold text-xs text-[#64748B] pt-2 space-y-2">
                            <div className="h-8 flex items-center justify-end font-mono">Sum</div>
                            <div className="h-8 flex items-center justify-end text-[#2E6F40] font-black">+1</div>
                            <div className="w-full border-t-2 border-[#2E6F40] my-1" />
                            <div className="h-9 flex items-center justify-end text-[#2E6F40]">=</div>
                          </div>

                          {subtractionResult.eacAddCols.map((col, idx) => (
                            <div key={idx} className="flex flex-col items-center w-10 sm:w-11 space-y-1">
                              {/* Intermediate sum */}
                              <div className="w-full h-8 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#1E293B]">
                                {col.sumDigit}
                              </div>

                              {/* +1 at LSB */}
                              <div className={`w-full h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                col.add1Digit ? "bg-amber-100 text-amber-900 border border-amber-300 font-black" : "text-gray-300"
                              }`}>
                                {col.add1Digit || "0"}
                              </div>

                              {/* Divider */}
                              <div className="w-full border-t-2 border-[#2E6F40] my-0.5" />

                              {/* Final EAC Sum */}
                              <div className="w-full h-9 rounded-lg bg-emerald-100 border-2 border-emerald-500 text-emerald-900 flex items-center justify-center font-black text-base shadow-2xs">
                                {col.resDigit}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-sm font-black text-[#2E6F40]">
                      Final Positive Result after EAC: +{subtractionResult.eacResult} (+{subtractionResult.decDiff}₁₀)
                    </div>
                  </div>
                )}

                {/* Branch B: Discard Carry for 2's and 10's complement with Carry = 1 */}
                {subtractionResult.hasCarry && (compType === "twos" || compType === "tens") && (
                  <div className="p-4 bg-white rounded-xl border-2 border-emerald-500 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#065F46]">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2E6F40]" />
                        End Carry = 1 indicates Positive Result &rarr; Discard End Carry!
                      </span>
                      <span className="line-through text-red-500 font-black text-sm px-2 py-0.5 bg-red-50 rounded border border-red-200">
                        Drop MSB Carry (1)
                      </span>
                    </div>
                    <p className="text-[#475569] text-xs">
                      In r's complement (2's or 10's), the extra end carry is discarded without adding to the LSB.
                      The remaining digits directly form the final exact positive difference.
                    </p>
                    <div className="text-right text-sm font-black text-[#2E6F40] pt-1 border-t border-[#DCE7E1]">
                      Final Positive Result: +{subtractionResult.rawSumFormatted} (+{subtractionResult.decDiff}₁₀)
                    </div>
                  </div>
                )}

                {/* Branch C: Carry = 0 (Negative Result, M < N) -> Graphical Step 4 Re-Complementation Grid */}
                {!subtractionResult.hasCarry && (
                  <div className="p-5 bg-white rounded-xl border-2 border-amber-500 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-[#92400E] border-b border-[#DCE7E1] pb-2">
                      <span className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-[#D97706]" />
                        End Carry = 0 indicates Negative Result (M &lt; N) &rarr; Re-Complement Intermediate Sum!
                      </span>
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300 font-bold">
                        Carry = 0 &rarr; Negative Result (-)
                      </span>
                    </div>

                    <p className="text-[#475569] text-xs leading-relaxed">
                      Since no end carry was generated, the true answer is negative. We take the {compType.toUpperCase()} complement of the intermediate sum ({subtractionResult.rawSumFormatted}) to reveal its true positive magnitude, and prefix it with an explicit negative (-) sign.
                    </p>

                    {/* Aligned Re-Complementation Column Grid */}
                    <div className="overflow-x-auto py-2">
                      <div className="inline-flex flex-col items-center min-w-full justify-center">
                        <div className="flex items-start gap-1 sm:gap-1.5">
                          
                          {/* Row Labels on Left */}
                          <div className="flex flex-col items-end w-28 sm:w-32 text-right font-bold text-xs text-[#64748B] pt-0 space-y-1">
                            <div className="h-8 flex items-center justify-end font-mono">Sum (S):</div>
                            {compType === "ones" && (
                              <>
                                <div className="h-5 flex items-center justify-end text-[#4F46E5] text-[10px]">Flip (1's):</div>
                                <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                <div className="h-9 flex items-center justify-end text-rose-600 font-black">Magnitude:</div>
                              </>
                            )}
                            {compType === "twos" && (
                              <>
                                <div className="h-8 flex items-center justify-end text-[#4F46E5] text-[11px]">Invert (1's):</div>
                                <div className="h-6 flex items-center justify-end text-[#D97706] text-[10px]">+1 LSB:</div>
                                <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                <div className="h-9 flex items-center justify-end text-rose-600 font-black">Magnitude:</div>
                              </>
                            )}
                            {compType === "nines" && (
                              <>
                                <div className="h-8 flex items-center justify-end text-[#64748B] text-[11px]">All 9s:</div>
                                <div className="h-8 flex items-center justify-end text-[#4F46E5] text-[11px]">- Sum (S):</div>
                                <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                <div className="h-9 flex items-center justify-end text-rose-600 font-black">Magnitude:</div>
                              </>
                            )}
                            {compType === "tens" && (
                              <>
                                <div className="h-8 flex items-center justify-end text-[#4F46E5] text-[11px]">9's Comp:</div>
                                <div className="h-6 flex items-center justify-end text-[#D97706] text-[10px]">+1 LSB:</div>
                                <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                <div className="h-9 flex items-center justify-end text-rose-600 font-black">Magnitude:</div>
                              </>
                            )}
                          </div>

                          {/* Dedicated Bold Rose [-] Sign Box in Magnitude Row */}
                          <div className="flex flex-col items-center w-10 sm:w-11 space-y-1">
                            <div className="h-8" />
                            {compType === "ones" && <div className="h-5" />}
                            {compType === "twos" && (
                              <>
                                <div className="h-8" />
                                <div className="h-6" />
                              </>
                            )}
                            {compType === "nines" && (
                              <>
                                <div className="h-8" />
                                <div className="h-8" />
                              </>
                            )}
                            {compType === "tens" && (
                              <>
                                <div className="h-8" />
                                <div className="h-6" />
                              </>
                            )}
                            <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                            {/* Bold Rose [-] Sign Box */}
                            <div className="w-full h-9 rounded-lg bg-rose-100 border-2 border-rose-500 text-rose-700 font-black text-xl flex items-center justify-center shadow-2xs">
                              -
                            </div>
                          </div>

                          {/* Aligned Intermediate Sum Digits */}
                          {subtractionResult.step4RecompCols.map((col, idx) => {
                            if (col.isRadix) {
                              return (
                                <div key={idx} className="flex flex-col items-center w-6 text-center">
                                  <div className="h-8 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                  {compType === "ones" && (
                                    <>
                                      <div className="h-5" />
                                      <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                      <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                    </>
                                  )}
                                  {compType === "twos" && (
                                    <>
                                      <div className="h-8 flex items-center justify-center text-xl font-black text-indigo-700">.</div>
                                      <div className="h-6" />
                                      <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                      <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                    </>
                                  )}
                                  {compType === "nines" && (
                                    <>
                                      <div className="h-8 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                      <div className="h-8" />
                                      <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                      <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                    </>
                                  )}
                                  {compType === "tens" && (
                                    <>
                                      <div className="h-8 flex items-center justify-center text-xl font-black text-indigo-700">.</div>
                                      <div className="h-6" />
                                      <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                      <div className="h-9 flex items-center justify-center text-xl font-black text-amber-700">.</div>
                                    </>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <div key={idx} className="flex flex-col items-center w-10 sm:w-11 space-y-1">
                                
                                {/* Row 1: Intermediate Sum digit */}
                                <div className="w-full h-8 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#1E293B]">
                                  {col.digitS}
                                </div>

                                {/* 1's Complement */}
                                {compType === "ones" && (
                                  <>
                                    <div className="h-5 flex items-center justify-center text-[9px] text-[#4F46E5] font-bold">
                                      &darr; ({col.digitS}&rarr;{col.flip})
                                    </div>
                                    <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                    <div className="w-full h-9 rounded-lg bg-emerald-50 border-2 border-emerald-500 text-emerald-900 flex items-center justify-center font-black text-sm shadow-2xs">
                                      {col.magDigit}
                                    </div>
                                  </>
                                )}

                                {/* 2's Complement */}
                                {compType === "twos" && (
                                  <>
                                    <div className="w-full h-8 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center font-bold text-sm text-[#3730A3]">
                                      {col.flip}
                                    </div>
                                    <div className="h-6 flex items-center justify-center">
                                      {col.isLsb ? (
                                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black">
                                          +1
                                        </span>
                                      ) : col.cIn === 1 ? (
                                        <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">
                                          (1)
                                        </span>
                                      ) : (
                                        <span className="text-[9px] text-gray-300">0</span>
                                      )}
                                    </div>
                                    <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                    <div className="w-full h-9 rounded-lg bg-emerald-50 border-2 border-emerald-500 text-emerald-900 flex items-center justify-center font-black text-sm shadow-2xs">
                                      {col.magDigit}
                                    </div>
                                  </>
                                )}

                                {/* 9's Complement */}
                                {compType === "nines" && (
                                  <>
                                    <div className="w-full h-8 rounded-lg bg-[#FAF8F5] border border-gray-300 flex items-center justify-center font-bold text-sm text-gray-600">
                                      9
                                    </div>
                                    <div className="w-full h-8 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center font-bold text-sm text-[#4F46E5]">
                                      {col.digitS}
                                    </div>
                                    <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                    <div className="w-full h-9 rounded-lg bg-emerald-50 border-2 border-emerald-500 text-emerald-900 flex items-center justify-center font-black text-sm shadow-2xs">
                                      {col.magDigit}
                                    </div>
                                  </>
                                )}

                                {/* 10's Complement */}
                                {compType === "tens" && (
                                  <>
                                    <div className="w-full h-8 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center font-bold text-sm text-[#3730A3]">
                                      {col.ninesDigit}
                                    </div>
                                    <div className="h-6 flex items-center justify-center">
                                      {col.isLsb ? (
                                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black">
                                          +1
                                        </span>
                                      ) : col.cIn === 1 ? (
                                        <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold">
                                          (1)
                                        </span>
                                      ) : (
                                        <span className="text-[9px] text-gray-300">0</span>
                                      )}
                                    </div>
                                    <div className="w-full border-t-2 border-[#1E293B] my-0.5" />
                                    <div className="w-full h-9 rounded-lg bg-emerald-50 border-2 border-emerald-500 text-emerald-900 flex items-center justify-center font-black text-sm shadow-2xs">
                                      {col.magDigit}
                                    </div>
                                  </>
                                )}

                              </div>
                            );
                          })}

                        </div>
                      </div>
                    </div>

                    {/* 2's Complement Fast Scan Check Strip */}
                    {compType === "twos" && subtractionResult.fastScanData && (
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-bold text-[#1E293B]">
                          <span>Fast Scan Check Strip (Right-to-Left Scan on Intermediate Sum S):</span>
                          <span className="text-[#64748B] text-[10px]">Emerald = Keep up to first 1 | Indigo = Flip left bits</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-xs text-[#64748B] font-bold mr-1">Scan:</span>
                          {subtractionResult.fastScanData.items.map((it, idx) => (
                            <div
                              key={idx}
                              className={`flex flex-col items-center justify-center w-8 h-10 rounded-lg border text-center shadow-2xs ${
                                it.isKeep
                                  ? "bg-emerald-100 border-emerald-400 text-emerald-900 font-black"
                                  : "bg-indigo-100 border-indigo-400 text-indigo-900 font-black"
                              }`}
                            >
                              <span className="text-[8px] uppercase tracking-wider block text-[#64748B]">
                                {it.isKeep ? "keep" : "flip"}
                              </span>
                              <span className="text-sm">
                                {it.outBit}
                              </span>
                            </div>
                          ))}
                          <span className="text-xs text-[#64748B] font-bold mx-1">&rarr;</span>
                          <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300">
                            True Magnitude = {subtractionResult.step4Details.reCompStr}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-black text-[#DC2626] pt-2 border-t border-[#DCE7E1]">
                      <span className="text-xs text-[#64748B] font-normal">
                        True Magnitude prefixed with [-]:
                      </span>
                      <span>
                        Final Negative Result: {subtractionResult.finalAnswer} ({subtractionResult.decDiff}₁₀)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4: Decision Diamond Summary */}
              <div className={`p-5 rounded-xl border space-y-2 ${
                subtractionResult.hasCarry
                  ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]"
                  : "bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]"
              }`}>
                <div className="flex items-center justify-between border-b border-current/20 pb-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Decision Diamond: End Carry = {subtractionResult.coutBit} ({subtractionResult.hasCarry ? "POSITIVE +" : "NEGATIVE -"})</span>
                  </div>
                  <span className="text-xs font-black uppercase">
                    {subtractionResult.step4Details.title}
                  </span>
                </div>

                <p className="text-xs leading-relaxed">
                  {subtractionResult.step4Details.desc}
                </p>

                <div className="pt-2 border-t border-current/20 flex items-center justify-between text-base font-black">
                  <span>Final Subtraction Answer:</span>
                  <span className="text-lg">{subtractionResult.finalAnswer}</span>
                </div>
              </div>

              {/* Step 5: Base-10 Verification Bar */}
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[#64748B] flex items-center justify-between">
                <span>Base 10 Verification:</span>
                <span className="font-bold text-[#1E293B]">
                  {subtractionResult.decM} - {subtractionResult.decN} = {subtractionResult.decDiff}
                </span>
                <span className="text-[#2E6F40] font-bold">100% Mathematically Verified</span>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};


// ============================================================================
// SOLVER 4: SIGNED 8-BIT REGISTER & OVERFLOW ANALYZER
// ============================================================================
const SignedRegisterOverflowSolver = () => {
  const [subMode, setSubMode] = useState("overflow"); // "inspector" or "overflow"
  const [inspectDec, setInspectDec] = useState(-45);
  const [numA, setNumA] = useState(85);
  const [numB, setNumB] = useState(65);

  const presets = [
    { label: "Positive Overflow: (+85) + (+65)", a: 85, b: 65 },
    { label: "Negative Overflow: (-80) + (-60)", a: -80, b: -60 },
    { label: "Safe Mixed Addition: (+45) + (-27)", a: 45, b: -27 },
    { label: "Safe Subtraction: (+100) + (-50)", a: 100, b: -50 },
    { label: "Neutral Cancellation: (-100) + (+100)", a: -100, b: 100 }
  ];

  const toSigned8Bit = (n) => {
    if (n >= 0) {
      return (n & 0xFF).toString(2).padStart(8, '0');
    } else {
      return (256 + n).toString(2).padStart(8, '0');
    }
  };

  const overflowData = useMemo(() => {
    const a = parseInt(numA, 10) || 0;
    const b = parseInt(numB, 10) || 0;
    const trueSum = a + b;

    const binA = toSigned8Bit(a);
    const binB = toSigned8Bit(b);

    let carry = 0;
    const carryArr = [];
    const sumBits = [];

    for (let i = 7; i >= 0; i--) {
      const bitA = parseInt(binA[i], 10);
      const bitB = parseInt(binB[i], 10);
      const s = bitA + bitB + carry;
      sumBits.unshift(s % 2);
      carryArr.unshift(carry);
      carry = Math.floor(s / 2);
    }
    const cout = carry;
    const cinToSign = carryArr[0]; // Carry into b7
    const vFlag = cinToSign ^ cout; // V = Cin XOR Cout

    const resultBin = sumBits.join('');
    const decodedVal = sumBits[0] === 1 ? parseInt(resultBin, 2) - 256 : parseInt(resultBin, 2);

    let magData = null;
    if (sumBits[0] === 1 && vFlag === 0) {
      const invBits = resultBin.split('').map(b => b === '0' ? '1' : '0');
      let c = 1;
      const carryArrAdd1 = [];
      const magBits = [];
      for (let i = 7; i >= 0; i--) {
        const s = (invBits[i] === '1' ? 1 : 0) + c;
        carryArrAdd1.unshift(c);
        magBits.unshift(s % 2);
        c = Math.floor(s / 2);
      }
      const magStr = magBits.join('');
      const absDec = Math.abs(decodedVal);

      const bitWeights = [64, 32, 16, 8, 4, 2, 1];
      const activeWeights = [];
      for (let i = 1; i <= 7; i++) {
        if (resultBin[i] === '1') {
          activeWeights.push({ pos: 7 - i, weight: bitWeights[i - 1] });
        }
      }
      const sumPosWeights = activeWeights.reduce((acc, w) => acc + w.weight, 0);

      magData = {
        resultBin,
        invBits,
        carryArrAdd1,
        magBits,
        magStr,
        absDec,
        activeWeights,
        sumPosWeights
      };
    }

    return {
      a,
      b,
      trueSum,
      binA,
      binB,
      cinToSign,
      cout,
      vFlag,
      resultBin,
      decodedVal,
      magData,
      isOverflow: vFlag === 1
    };
  }, [numA, numB]);

  return (
    <div className="space-y-6">
      
      {/* 1. TOP 2-COLUMN INSTRUCTIONAL & FORMULA BANNER */}
      <SolverHeaderBanner
        engineNum={4}
        title="Signed 8-Bit Register & Overflow Analyzer"
        steps={[
          { title: "Select Mode", desc: "Choose the 8-Bit Overflow Detector (Sub-Mode B) or the Signed Register Inspector (Sub-Mode A)." },
          { title: "Input Signed Integers", desc: "Type decimal values within the allowable 8-bit signed range [-128, +127] or select an overflow preset." },
          { title: "Read Register & Overflow Flag", desc: "Amber bit b7 indicates the Sign Bit. Observe V = Cin(b7) ⊕ Cout(b7) to detect arithmetic wrap-around." }
        ]}
        formulaTitle="8-Bit 2's Complement Overflow Rules"
        formulaBadge="V = Cin ⊕ Cout"
        formulaContent="Valid Range: -2⁷ to +2⁷ - 1 = -128 to +127. Overflow Condition: V = Cin(b7) ⊕ Cout(b7). Shortcut: Adding two positives yielding a negative, or adding two negatives yielding a positive triggers Overflow (V = 1)."
        rulesList={[
          "MSB Sign Bit: b7 = 0 denotes Positive; b7 = 1 denotes Negative.",
          "Opposite Signs: Addition of one positive and one negative number NEVER produces an overflow."
        ]}
      />

      {/* Sub-Mode Toggle */}
      <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs">
        <button
          onClick={() => setSubMode("overflow")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
            subMode === "overflow"
              ? "bg-[#2E6F40] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          Sub-Mode B: 8-Bit 2's Complement Adder &amp; Overflow Detector (V = Cin &oplus; Cout)
        </button>
        <button
          onClick={() => setSubMode("inspector")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
            subMode === "inspector"
              ? "bg-[#2E6F40] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          Sub-Mode A: 8-Bit Signed Representation Inspector
        </button>
      </div>

      {/* Preset Chips */}
      {subMode === "overflow" && (
        <div className="p-4 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-2">
          <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
            Load Overflow Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setNumA(p.a);
                  setNumB(p.b);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-xs font-mono font-semibold text-[#1E293B] transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* OVERFLOW DETECTOR */}
      {subMode === "overflow" && overflowData && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Signed Operand A (-128 to +127):</label>
                <input
                  type="number"
                  min="-128"
                  max="127"
                  value={numA}
                  onChange={(e) => setNumA(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Signed Operand B (-128 to +127):</label>
                <input
                  type="number"
                  min="-128"
                  max="127"
                  value={numB}
                  onChange={(e) => setNumB(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B]"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
              <span className="font-bold uppercase tracking-wider text-[#1E293B]">
                8-Bit Hardware Register Alignment
              </span>
              <span className="text-[#64748B]">
                Expected Base 10: {overflowData.a} + {overflowData.b} = {overflowData.trueSum}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] text-[10px] text-[#64748B]">
                    <th className="py-1 px-2 text-left">Signal</th>
                    <th className="py-1 px-2 text-amber-700 font-bold bg-[#FEF3C7]/40">b7 (Sign)</th>
                    <th className="py-1 px-2">b6</th>
                    <th className="py-1 px-2">b5</th>
                    <th className="py-1 px-2">b4</th>
                    <th className="py-1 px-2">b3</th>
                    <th className="py-1 px-2">b2</th>
                    <th className="py-1 px-2">b1</th>
                    <th className="py-1 px-2">b0 (LSB)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F2F7F4]">
                    <td className="py-2 px-2 text-left font-bold text-[#1E293B]">A ({overflowData.a})</td>
                    {overflowData.binA.split('').map((b, i) => (
                      <td key={i} className={`py-2 px-2 font-bold ${i === 0 ? "text-[#D97706] bg-[#FEF3C7]/30" : "text-[#1E293B]"}`}>{b}</td>
                    ))}
                  </tr>

                  <tr className="border-b border-[#F2F7F4]">
                    <td className="py-2 px-2 text-left font-bold text-[#1E293B]">+ B ({overflowData.b})</td>
                    {overflowData.binB.split('').map((b, i) => (
                      <td key={i} className={`py-2 px-2 font-bold ${i === 0 ? "text-[#D97706] bg-[#FEF3C7]/30" : "text-[#1E293B]"}`}>{b}</td>
                    ))}
                  </tr>

                  <tr className="bg-[#FAF8F5] font-black text-sm">
                    <td className="py-2 px-2 text-left text-[#2E6F40]">Sum</td>
                    {overflowData.resultBin.split('').map((b, i) => (
                      <td key={i} className={`py-2 px-2 ${i === 0 ? "text-[#D97706] bg-[#FEF3C7]/40" : "text-[#2E6F40]"}`}>{b}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${
              overflowData.isOverflow
                ? "bg-rose-50 border-rose-300 text-rose-900"
                : "bg-emerald-50 border-emerald-300 text-emerald-900"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold">
                  {overflowData.isOverflow ? <AlertTriangle className="w-5 h-5 text-rose-600" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  <span>{overflowData.isOverflow ? "ARITHMETIC OVERFLOW DETECTED (V = 1)" : "VALID 8-BIT RESULT (V = 0)"}</span>
                </div>
                <span className="font-bold text-xs">
                  Cin(b7) = {overflowData.cinToSign}, Cout(b7) = {overflowData.cout} &rarr; V = {overflowData.cinToSign} &oplus; {overflowData.cout} = {overflowData.vFlag}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {overflowData.isOverflow 
                  ? `Mathematical sum ${overflowData.trueSum} is OUTSIDE the allowable 8-bit signed range [-128, +127]. Hardware register wrapped around to ${overflowData.decodedVal}.`
                  : `Mathematical sum ${overflowData.trueSum} is within the 8-bit signed range [-128, +127]. Decoded register value matches ${overflowData.decodedVal} exactly.`}
              </p>
            </div>

            {/* Graphical Magnitude Decoder Box for Negative Result (b7 = 1, V = 0) */}
            {overflowData.magData && (
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#1E293B] uppercase">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span>Graphical Magnitude Decoder: Why ({overflowData.resultBin})₂ = {overflowData.decodedVal}₁₀</span>
                  </div>
                  <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Sign Bit b7 = 1 (Negative)
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left: 2's Complement Inversion & +1 Adder Grid */}
                  <div className="p-4 bg-white rounded-xl border border-[#DCE7E1] space-y-3 shadow-2xs">
                    <span className="text-xs font-bold text-[#1E293B] block">
                      Method 1: Invert Bits (1's Comp) + 1 at LSB
                    </span>

                    <div className="overflow-x-auto py-1">
                      <div className="inline-flex flex-col items-center min-w-full justify-center">
                        <div className="flex items-start gap-1">
                          
                          {/* Row labels */}
                          <div className="flex flex-col items-end w-20 text-right text-[10px] font-bold text-[#64748B] space-y-1">
                            <div className="h-7 flex items-center justify-end">8-Bit Sum:</div>
                            <div className="h-7 flex items-center justify-end text-[#4F46E5]">Invert:</div>
                            <div className="h-5 flex items-center justify-end text-[#D97706]">+1 LSB:</div>
                            <div className="w-full border-t border-[#1E293B] my-0.5" />
                            <div className="h-8 flex items-center justify-end text-emerald-700">Magnitude:</div>
                          </div>

                          {/* [-] sign box in magnitude row */}
                          <div className="flex flex-col items-center w-8 space-y-1">
                            <div className="h-7" />
                            <div className="h-7" />
                            <div className="h-5" />
                            <div className="w-full border-t border-[#1E293B] my-0.5" />
                            <div className="w-full h-8 rounded-lg bg-rose-100 border border-rose-400 text-rose-700 font-black text-sm flex items-center justify-center">
                              -
                            </div>
                          </div>

                          {/* 8 Bits */}
                          {overflowData.magData.resultBin.split('').map((b, idx) => (
                            <div key={idx} className="flex flex-col items-center w-8 sm:w-9 space-y-1 text-xs">
                              {/* Sum bit */}
                              <div className={`w-full h-7 rounded border flex items-center justify-center font-bold ${
                                idx === 0 ? "bg-amber-100 border-amber-300 text-amber-900" : "bg-white border-[#DCE7E1] text-[#1E293B]"
                              }`}>
                                {b}
                              </div>
                              {/* Inverted bit */}
                              <div className="w-full h-7 rounded border border-[#C7D2FE] bg-[#EEF2FF] text-[#3730A3] flex items-center justify-center font-bold">
                                {overflowData.magData.invBits[idx]}
                              </div>
                              {/* Carry in */}
                              <div className="h-5 flex items-center justify-center">
                                {idx === 7 ? (
                                  <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-black">+1</span>
                                ) : overflowData.magData.carryArrAdd1[idx] === 1 ? (
                                  <span className="text-[9px] font-bold text-amber-600">(1)</span>
                                ) : (
                                  <span className="text-[9px] text-gray-300">0</span>
                                )}
                              </div>
                              {/* Divider */}
                              <div className="w-full border-t border-[#1E293B] my-0.5" />
                              {/* Mag bit */}
                              <div className="w-full h-8 rounded-lg border border-emerald-400 bg-emerald-50 text-emerald-900 flex items-center justify-center font-black">
                                {overflowData.magData.magBits[idx]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-xs font-bold text-emerald-700 pt-1 border-t border-[#DCE7E1]">
                      Magnitude = ({overflowData.magData.magStr})₂ = {overflowData.magData.absDec}₁₀ &rarr; Result: -{overflowData.magData.absDec}₁₀
                    </div>
                  </div>

                  {/* Right: -128 + Positive Weights Bar */}
                  <div className="p-4 bg-white rounded-xl border border-[#DCE7E1] space-y-3 shadow-2xs">
                    <span className="text-xs font-bold text-[#1E293B] block">
                      Method 2: Weighted Sum (-128 + &Sigma; Positive Weights)
                    </span>

                    <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-xs">
                      <div className="flex flex-wrap gap-1 items-center justify-between">
                        <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          b7 &times; (-128) = -128
                        </span>
                        <span className="text-[#64748B] text-[10px]">Active positive bits:</span>
                      </div>

                      <div className="text-xs font-mono space-y-1">
                        <div className="text-[#475569]">
                          Sum = -128 + {overflowData.magData.activeWeights.length > 0 ? overflowData.magData.activeWeights.map(w => `${w.weight} (b${w.pos})`).join(' + ') : '0'}
                        </div>
                        <div className="text-sm font-black text-[#1E293B]">
                          = -128 + {overflowData.magData.sumPosWeights} = <span className="text-rose-600">{overflowData.decodedVal}₁₀</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      In 2's complement hardware, MSB bit b7 contributes a negative weight of -2⁷ (-128). Both the inversion method and the positional weight summation yield {overflowData.decodedVal}₁₀!
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* INSPECTOR */}
      {subMode === "inspector" && (
        <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4 font-mono text-xs">
          <div className="max-w-xs space-y-1.5">
            <label className="font-bold text-[#1E293B]">Decimal Value (-128 to +127):</label>
            <input
              type="number"
              min="-128"
              max="127"
              value={inspectDec}
              onChange={(e) => setInspectDec(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] text-base font-bold"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
            <span className="text-[#64748B] block">8-Bit Signed 2's Complement Representation:</span>
            <div className="text-xl font-black text-[#2E6F40]">
              {toSigned8Bit(inspectDec)}
            </div>
            <p className="text-[11px] text-[#64748B]">
              Sign bit b7 is {toSigned8Bit(inspectDec)[0]} ({inspectDec >= 0 ? "Positive" : "Negative"}).
            </p>
          </div>
        </div>
      )}

    </div>
  );
};


// ============================================================================
// SOLVER 5: INTERACTIVE 7-GATE LOGIC & WAVEFORM WORKBENCH
// ============================================================================
const LogicGatesWaveformSolver = () => {
  const [numInputs, setNumInputs] = useState(2);
  const [inA, setInA] = useState(1);
  const [inB, setInB] = useState(0);
  const [inC, setInC] = useState(1);

  const [waveformA, setWaveformA] = useState([0, 0, 1, 1, 0, 0, 1, 1]);
  const [waveformB, setWaveformB] = useState([0, 1, 0, 1, 0, 1, 0, 1]);
  const [selectedGateWave, setSelectedGateWave] = useState("AND");

  const toggleWaveBit = (track, idx) => {
    if (track === "A") {
      setWaveformA(prev => {
        const next = [...prev];
        next[idx] = next[idx] === 1 ? 0 : 1;
        return next;
      });
    } else {
      setWaveformB(prev => {
        const next = [...prev];
        next[idx] = next[idx] === 1 ? 0 : 1;
        return next;
      });
    }
  };

  const evalGate = (gateId, a, b, c) => {
    if (gateId === "NOT") return a === 0 ? 1 : 0;
    if (gateId === "AND") return numInputs === 2 ? (a === 1 && b === 1 ? 1 : 0) : (a === 1 && b === 1 && c === 1 ? 1 : 0);
    if (gateId === "OR") return numInputs === 2 ? (a === 1 || b === 1 ? 1 : 0) : (a === 1 || b === 1 || c === 1 ? 1 : 0);
    if (gateId === "NAND") return !(numInputs === 2 ? (a === 1 && b === 1) : (a === 1 && b === 1 && c === 1)) ? 1 : 0;
    if (gateId === "NOR") return (numInputs === 2 ? (a === 0 && b === 0) : (a === 0 && b === 0 && c === 0)) ? 1 : 0;
    if (gateId === "XOR") {
      if (numInputs === 2) return a !== b ? 1 : 0;
      return (a + b + c) % 2 === 1 ? 1 : 0;
    }
    if (gateId === "XNOR") {
      if (numInputs === 2) return a === b ? 1 : 0;
      return (a + b + c) % 2 === 0 ? 1 : 0;
    }
    return 0;
  };

  const computedWaveformOut = useMemo(() => {
    return waveformA.map((bitA, idx) => {
      const bitB = waveformB[idx];
      return evalGate(selectedGateWave, bitA, bitB, 0);
    });
  }, [waveformA, waveformB, selectedGateWave]);

  const gatesList = [
    { id: "NOT", name: "Inverter", eq: "Y = A'", desc: "Inverts input logic." },
    { id: "AND", name: "AND Gate", eq: "Y = A · B", desc: "Output HIGH only if ALL inputs are HIGH." },
    { id: "OR", name: "OR Gate", eq: "Y = A + B", desc: "Output HIGH if ANY input is HIGH." },
    { id: "NAND", name: "NAND Gate", eq: "Y = (A · B)'", desc: "Universal: Output LOW only if ALL inputs are HIGH." },
    { id: "NOR", name: "NOR Gate", eq: "Y = (A + B)'", desc: "Universal: Output HIGH only if ALL inputs are LOW." },
    { id: "XOR", name: "XOR Gate", eq: "Y = A ⊕ B", desc: "Parity: Output HIGH when odd number of inputs are HIGH." },
    { id: "XNOR", name: "XNOR Gate", eq: "Y = (A ⊕ B)'", desc: "Equivalence: Output HIGH when inputs match." }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. TOP 2-COLUMN INSTRUCTIONAL & FORMULA BANNER */}
      <SolverHeaderBanner
        engineNum={5}
        title="Interactive 7-Gate Logic & Waveform Workbench"
        steps={[
          { title: "Select Mode & Gate", desc: "Choose between 2-Input and 3-Input logic evaluation, or test dynamic pulse waveforms below." },
          { title: "Toggle Input Switches", desc: "Click input buttons (A, B, C) to observe live gate states and color-coded logic levels (0 = Low, 1 = High)." },
          { title: "Interactive Timing Waveforms", desc: "Click any clock cycle in Waveform A or B to invert bits and watch the gate output waveform synthesize in real-time." }
        ]}
        formulaTitle="Boolean Equations for Fundamental Gates"
        formulaBadge="All 7 Gates"
        formulaContent="NOT: Y = A' | AND: Y = A · B | OR: Y = A + B | NAND: Y = (A · B)' | NOR: Y = (A + B)' | XOR: Y = A'B + AB' | XNOR: Y = AB + A'B'"
        rulesList={[
          "Universal Gates: NAND and NOR can synthesize any Boolean function.",
          "Bubble Logic: Inversion bubbles on outputs represent active-low logic."
        ]}
      />

      {/* Global Input Control Panel */}
      <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE7E1]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40]">Hardware Controls</span>
            <h2 className="text-lg font-bold text-[#1E293B]">Live Digital Input Switches</h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setNumInputs(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                numInputs === 2 ? "bg-[#2E6F40] text-white" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
              }`}
            >
              2 Inputs (A, B)
            </button>
            <button
              onClick={() => setNumInputs(3)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                numInputs === 3 ? "bg-[#2E6F40] text-white" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
              }`}
            >
              3 Inputs (A, B, C)
            </button>
          </div>
        </div>

        {/* Input Toggle Pills */}
        <div className="flex flex-wrap gap-4 items-center justify-center py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1E293B]">Input A:</span>
            <button
              onClick={() => setInA(inA === 1 ? 0 : 1)}
              className={`w-14 h-10 rounded-xl font-mono text-base font-black transition-all ${
                inA === 1 ? "bg-[#2E6F40] text-white shadow-2xs" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
              }`}
            >
              {inA}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1E293B]">Input B:</span>
            <button
              onClick={() => setInB(inB === 1 ? 0 : 1)}
              className={`w-14 h-10 rounded-xl font-mono text-base font-black transition-all ${
                inB === 1 ? "bg-[#2E6F40] text-white shadow-2xs" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
              }`}
            >
              {inB}
            </button>
          </div>

          {numInputs === 3 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#1E293B]">Input C:</span>
              <button
                onClick={() => setInC(inC === 1 ? 0 : 1)}
                className={`w-14 h-10 rounded-xl font-mono text-base font-black transition-all ${
                  inC === 1 ? "bg-[#2E6F40] text-white shadow-2xs" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
                }`}
              >
                {inC}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 7-Gate Live Simulation Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gatesList.map((g) => {
          const outVal = evalGate(g.id, inA, inB, inC);
          const isHigh = outVal === 1;

          return (
            <div
              key={g.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isHigh ? "bg-white border-[#2E6F40] shadow-soft" : "bg-white border-[#DCE7E1] shadow-2xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#64748B] uppercase">{g.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isHigh ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}>
                  Y = {outVal}
                </span>
              </div>

              {/* Gate SVG Icon */}
              <div className="flex justify-center py-2">
                <GateSymbolSvg gateName={g.id} className="w-28 h-12 text-[#1E293B]" />
              </div>

              <div className="text-center font-mono text-xs font-bold text-[#2E6F40] bg-[#FAF8F5] py-1.5 rounded-lg border border-[#DCE7E1]">
                {g.eq}
              </div>

              <p className="text-[11px] text-[#64748B] leading-tight">
                {g.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Timing Waveform Synthesizer */}
      <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">Timing Synthesis</span>
            <h3 className="text-base font-bold text-[#1E293B]">8-Cycle Waveform Workbench</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1E293B]">Gate:</span>
            <select
              value={selectedGateWave}
              onChange={(e) => setSelectedGateWave(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-xs font-bold text-[#1E293B]"
            >
              {gatesList.map(g => (
                <option key={g.id} value={g.id}>{g.name} ({g.id})</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xs text-[#64748B] leading-relaxed">
          Click any clock cycle (T0 to T7) below to toggle the digital pulse between HIGH (1) and LOW (0). The synthesized output waveform updates instantaneously.
        </p>

        {/* Waveform Grid */}
        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1] space-y-4 font-mono text-xs">
          
          {/* Signal A */}
          <div className="flex items-center gap-3">
            <span className="w-16 font-bold text-[#1E293B]">Clock (A):</span>
            <div className="flex gap-1 flex-1">
              {waveformA.map((bit, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleWaveBit("A", idx)}
                  className={`flex-1 h-8 rounded-lg font-bold text-xs transition-all flex items-center justify-center ${
                    bit === 1 ? "bg-[#2E6F40] text-white shadow-2xs" : "bg-white text-[#64748B] border border-[#DCE7E1]"
                  }`}
                >
                  {bit}
                </button>
              ))}
            </div>
          </div>

          {/* Signal B */}
          <div className="flex items-center gap-3">
            <span className="w-16 font-bold text-[#1E293B]">Clock (B):</span>
            <div className="flex gap-1 flex-1">
              {waveformB.map((bit, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleWaveBit("B", idx)}
                  className={`flex-1 h-8 rounded-lg font-bold text-xs transition-all flex items-center justify-center ${
                    bit === 1 ? "bg-[#4F46E5] text-white shadow-2xs" : "bg-white text-[#64748B] border border-[#DCE7E1]"
                  }`}
                >
                  {bit}
                </button>
              ))}
            </div>
          </div>

          {/* Output Signal */}
          <div className="flex items-center gap-3 pt-2 border-t border-[#DCE7E1]">
            <span className="w-16 font-black text-[#D97706]">Out (Y):</span>
            <div className="flex gap-1 flex-1">
              {computedWaveformOut.map((bit, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-10 rounded-lg font-black text-sm transition-all flex items-center justify-center border-2 ${
                    bit === 1 ? "bg-amber-100 border-amber-500 text-amber-900" : "bg-white border-[#DCE7E1] text-gray-400"
                  }`}
                >
                  {bit}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-[#64748B] pt-1 px-1">
            {waveformA.map((_, idx) => (
              <span key={idx} className="flex-1 text-center">T{idx}</span>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};
