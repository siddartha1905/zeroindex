import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Binary, 
  Layers, 
  ArrowRight, 
  ArrowDown,
  ArrowUp,
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
  Hash
} from 'lucide-react';
import { GateSymbolSvg } from './Section17Components';

/**
 * Unit 1 Interactive Solvers Suite
 * Strict formatting: ZERO em-dashes (\u2014) and ZERO en-dashes (\u2013).
 * Color Palette:
 *   - Emerald (#2E6F40, #ECFDF5, #10B981): Integer part, Positive numbers, Valid results
 *   - Indigo (#4F46E5, #EEF2FF, #6366F1): Fractional part, Flipped bits, Complements
 *   - Amber (#D97706, #FEF3C7, #F59E0B): Padded zeros, Carries, Borrows, Sign bits
 *   - Rose (#DC2626, #FEE2E2): Negative values, Overflow, Errors
 */

// ============================================================================
// HELPER UTILITIES: NUMBER CONVERSIONS & ARITHMETIC ENGINES
// ============================================================================

const DIGITS = "0123456789ABCDEF";

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
  const [activeSolver, setActiveSolver] = useState("converter");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
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
                Unit 1 Interactive Hardware Solvers
              </h1>
            </div>
          </div>
          <span className="text-xs font-mono text-[#64748B] bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#DCE7E1]">
            Bit-Aligned &amp; Pedagogical
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#475569] mt-3 leading-relaxed max-w-4xl">
          Five live hardware simulation engines designed to solve, verify, and visually unpack digital logic problems.
          Includes step-by-step division ladders, staircase shift-and-add partial product grids, 8-bit sign-bit transformers,
          and interactive real-time gate waveforms.
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
              <span>7-Gate Logic &amp; Waveforms</span>
            </div>
          </button>
        </div>
      </div>

      {/* Render Active Solver */}
      {activeSolver === "converter" && <UniversalBaseConverterSolver />}
      {activeSolver === "arithmetic" && <BinaryArithmeticGridSolver />}
      {activeSolver === "complements" && <ComplementsSubtractorSolver />}
      {activeSolver === "signed" && <SignedRegisterOverflowSolver />}
      {activeSolver === "gates" && <LogicGatesWaveformSolver />}

    </div>
  );
};


// ============================================================================
// SOLVER 1: UNIVERSAL BASE & FRACTION CONVERTER
// ============================================================================
const UniversalBaseConverterSolver = () => {
  const [inputStr, setInputStr] = useState("181.625");
  const [sourceBase, setSourceBase] = useState(10);
  const [activeStepTab, setActiveStepTab] = useState("weightMatrix");
  const [targetDivisionBase, setTargetDivisionBase] = useState(2);

  const presets = [
    { label: "Decimal Fraction: 181.625₁₀", value: "181.625", base: 10 },
    { label: "Binary Mixed: 10110.101₂", value: "10110.101", base: 2 },
    { label: "Hex Fractional: B6A.C8₁₆", value: "B6A.C8", base: 16 },
    { label: "Octal Mixed: 365.24₈", value: "365.24", base: 8 },
    { label: "Decimal Decimal: 42.6875₁₀", value: "42.6875", base: 10 },
    { label: "Tricky Fraction: 0.4375₁₀", value: "0.4375", base: 10 }
  ];

  const parsed = useMemo(() => parseToDecimalParts(inputStr, sourceBase), [inputStr, sourceBase]);

  // Conversions from decimal
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

  // Weight matrix terms for source -> decimal
  const weightMatrixData = useMemo(() => {
    if (!parsed.isValid) return null;
    const intTerms = [];
    for (let i = 0; i < parsed.intPart.length; i++) {
      const pos = parsed.intPart.length - 1 - i;
      const digitChar = parsed.intPart[i];
      const digitVal = DIGITS.indexOf(digitChar);
      const weight = Math.pow(sourceBase, pos);
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
      const weight = Math.pow(sourceBase, pos);
      fracTerms.push({
        digit: digitChar,
        digitVal,
        power: pos,
        weight: weight.toFixed(6),
        product: (digitVal * weight).toFixed(6)
      });
    }

    return { intTerms, fracTerms };
  }, [parsed, sourceBase]);

  // Successive division & multiplication data for decimal -> targetDivisionBase
  const divisionSteps = useMemo(() => {
    if (!parsed.isValid) return null;
    const divData = decimalIntToTarget(parsed.intDec, targetDivisionBase);
    const mulData = decimalFracToTarget(parsed.fracDec, targetDivisionBase);
    return { divData, mulData };
  }, [parsed, targetDivisionBase]);

  return (
    <div className="space-y-6">
      
      {/* Preset Chips */}
      <div className="p-4 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-2">
        <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
          Load Classic Exam Example Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputStr(p.value);
                setSourceBase(p.base);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-xs font-mono font-semibold text-[#1E293B] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">
              Enter Value (Supports Radix Point '.'):
            </label>
            <input
              type="text"
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              placeholder="e.g. 181.625 or 10110.101"
              className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
            />
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">
              Source Base:
            </label>
            <select
              value={sourceBase}
              onChange={(e) => setSourceBase(Number(e.target.value))}
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

      {/* 4 Live Output Cards */}
      {conversions && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Binary */}
          <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#2E6F40]">Binary (Base 2)</span>
              <span>radix 2</span>
            </div>
            <div className="font-mono text-base font-extrabold text-[#1E293B] break-all">
              ({conversions.bin})₂
            </div>
          </div>

          {/* Octal */}
          <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#D97706]">Octal (Base 8)</span>
              <span>radix 8</span>
            </div>
            <div className="font-mono text-base font-extrabold text-[#1E293B] break-all">
              ({conversions.oct})₈
            </div>
          </div>

          {/* Decimal */}
          <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#4F46E5]">Decimal (Base 10)</span>
              <span>radix 10</span>
            </div>
            <div className="font-mono text-base font-extrabold text-[#1E293B] break-all">
              ({conversions.dec})₁₀
            </div>
          </div>

          {/* Hexadecimal */}
          <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="font-bold text-[#9333EA]">Hexadecimal (Base 16)</span>
              <span>radix 16</span>
            </div>
            <div className="font-mono text-base font-extrabold text-[#1E293B] break-all">
              ({conversions.hex})₁₆
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Pedagogical Workings Container */}
      {parsed.isValid && (
        <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1E293B]">
              Step-by-Step Mathematical &amp; Hardware Workings
            </h3>
            
            {/* Inner Step Tabs */}
            <div className="flex flex-wrap gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DCE7E1]">
              <button
                onClick={() => setActiveStepTab("weightMatrix")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeStepTab === "weightMatrix"
                    ? "bg-[#2E6F40] text-white shadow-2xs"
                    : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                Tab A: Source &rarr; Decimal (Weight Matrix)
              </button>
              <button
                onClick={() => setActiveStepTab("divisionLadders")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeStepTab === "divisionLadders"
                    ? "bg-[#2E6F40] text-white shadow-2xs"
                    : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                Tab B: Decimal &rarr; Target Base (&divide; / &times; Steps)
              </button>
              <button
                onClick={() => setActiveStepTab("groupingStrips")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeStepTab === "groupingStrips"
                    ? "bg-[#2E6F40] text-white shadow-2xs"
                    : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                Tab C: 3-Bit / 4-Bit Grouping Strip
              </button>
            </div>
          </div>

          {/* TAB A: Positional Weight Matrix */}
          {activeStepTab === "weightMatrix" && weightMatrixData && (
            <div className="space-y-4">
              <div className="p-3 bg-[#EEF2FF] rounded-xl border border-[#C7D2FE] text-xs font-mono text-[#3730A3]">
                Formula: Value = &sum; (digit &times; base^power). Left of radix point powers are &ge; 0; Right of radix point powers are &le; -1.
              </div>

              {/* Full-width horizontal weight table */}
              <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
                {/* Header Strip */}
                <div className="flex border-b border-[#DCE7E1] font-mono text-xs font-bold text-center">
                  <div style={{ flex: weightMatrixData.intTerms.length }} className="bg-[#ECFDF5] text-[#065F46] py-2 px-3 border-r border-[#A7F3D0]">
                    &larr; INTEGER PART (Base {sourceBase})
                  </div>
                  {weightMatrixData.fracTerms.length > 0 && (
                    <div className="w-16 bg-[#FEF3C7] text-[#92400E] py-2 font-black flex items-center justify-center border-r border-[#FDE68A]">
                      RADIX
                    </div>
                  )}
                  {weightMatrixData.fracTerms.length > 0 && (
                    <div style={{ flex: weightMatrixData.fracTerms.length }} className="bg-[#EEF2FF] text-[#3730A3] py-2 px-3">
                      FRACTIONAL PART &rarr; (Base {sourceBase})
                    </div>
                  )}
                </div>

                {/* Grid Rows */}
                <table className="w-full text-center font-mono text-xs border-collapse">
                  <tbody>
                    {/* Digits Row */}
                    <tr className="border-b border-[#F2F7F4] bg-[#FAF8F5]">
                      <td className="py-2.5 px-3 text-left font-bold text-[#64748B] w-28">Digit (d)</td>
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

                    {/* Powers Row */}
                    <tr className="border-b border-[#F2F7F4]">
                      <td className="py-2.5 px-3 text-left font-bold text-[#64748B] w-28">Power (rⁱ)</td>
                      {weightMatrixData.intTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 text-[#047857]">{sourceBase}<sup>{t.power}</sup></td>
                      ))}
                      {weightMatrixData.fracTerms.length > 0 && (
                        <td className="w-16 bg-[#FEF3C7]/40 font-bold text-[#92400E]">&middot;</td>
                      )}
                      {weightMatrixData.fracTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 text-[#4338CA]">{sourceBase}<sup>{t.power}</sup></td>
                      ))}
                    </tr>

                    {/* Exact Weights Row */}
                    <tr className="border-b border-[#F2F7F4] bg-[#FAF8F5]">
                      <td className="py-2.5 px-3 text-left font-bold text-[#64748B] w-28">Weight</td>
                      {weightMatrixData.intTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 text-[#64748B] font-semibold">{t.weight}</td>
                      ))}
                      {weightMatrixData.fracTerms.length > 0 && (
                        <td className="w-16 bg-[#FEF3C7]/40">&middot;</td>
                      )}
                      {weightMatrixData.fracTerms.map((t, i) => (
                        <td key={i} className="py-2.5 px-2 text-[#64748B] font-semibold">{t.weight}</td>
                      ))}
                    </tr>

                    {/* Products Row */}
                    <tr className="bg-white">
                      <td className="py-2.5 px-3 text-left font-bold text-[#2E6F40] w-28">Product (d&times;w)</td>
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

              {/* Summation calculation breakdown */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] font-mono text-xs space-y-1.5">
                <div className="text-[#64748B]">
                  <strong>Integer Sum:</strong> {weightMatrixData.intTerms.map(t => `${t.product}`).join(" + ")} = <strong className="text-[#065F46]">{parsed.intDec}</strong>
                </div>
                {weightMatrixData.fracTerms.length > 0 && (
                  <div className="text-[#64748B]">
                    <strong>Fraction Sum:</strong> {weightMatrixData.fracTerms.map(t => `${t.product}`).join(" + ")} = <strong className="text-[#3730A3]">{parsed.fracDec.toFixed(6)}</strong>
                  </div>
                )}
                <div className="pt-1.5 border-t border-[#DCE7E1] text-[#2E6F40] font-bold text-sm">
                  Total Decimal Value = ({conversions.dec})₁₀
                </div>
              </div>
            </div>
          )}

          {/* TAB B: Successive Division & Multiplication Ladders */}
          {activeStepTab === "divisionLadders" && divisionSteps && (
            <div className="space-y-6">
              {/* Target Base Selector for Division */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#1E293B]">Convert Decimal ({conversions.dec})₁₀ to Target Base:</span>
                <div className="flex gap-1.5 font-mono text-xs">
                  {[2, 8, 16].map(b => (
                    <button
                      key={b}
                      onClick={() => setTargetDivisionBase(b)}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        targetDivisionBase === b
                          ? "bg-[#2E6F40] text-white"
                          : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
                      }`}
                    >
                      Base {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Integer Successive Division Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2E6F40] uppercase flex items-center gap-1.5">
                      <ArrowUp className="w-3.5 h-3.5" />
                      Integer Part (&divide; {targetDivisionBase}) &rarr; Read UP (&uarr;)
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">Integer: {parsed.intDec}</span>
                  </div>

                  <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
                    <table className="w-full text-xs text-center border-collapse font-mono">
                      <thead>
                        <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1]">
                          <th className="py-2 px-3 font-bold text-[#1E293B]">Step</th>
                          <th className="py-2 px-3 font-bold text-[#1E293B]">Operation</th>
                          <th className="py-2 px-3 font-bold text-[#2E6F40]">Quotient</th>
                          <th className="py-2 px-3 font-bold text-[#D97706]">Remainder</th>
                          <th className="py-2 px-3 font-bold text-[#1E293B]">Symbol</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2F7F4]">
                        {divisionSteps.divData.steps.map((st) => (
                          <tr key={st.step} className="hover:bg-[#FAF8F5]/60">
                            <td className="py-2 px-3 text-[#64748B]">{st.step}</td>
                            <td className="py-2 px-3">{st.dividend} &divide; {targetDivisionBase}</td>
                            <td className="py-2 px-3 font-bold text-[#2E6F40]">{st.quotient}</td>
                            <td className="py-2 px-3 font-bold text-[#D97706]">{st.remainder}</td>
                            <td className="py-2 px-3 font-black text-[#1E293B]">{st.hexSymbol}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-mono text-[#065F46] font-bold">
                    Integer Result (Read bottom-to-top): ({divisionSteps.divData.resultStr})_{targetDivisionBase}
                  </div>
                </div>

                {/* Fractional Successive Multiplication Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase flex items-center gap-1.5">
                      <ArrowDown className="w-3.5 h-3.5" />
                      Fractional Part (&times; {targetDivisionBase}) &rarr; Read DOWN (&darr;)
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">Fraction: {parsed.fracDec.toFixed(6)}</span>
                  </div>

                  {divisionSteps.mulData.steps.length > 0 ? (
                    <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
                      <table className="w-full text-xs text-center border-collapse font-mono">
                        <thead>
                          <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1]">
                            <th className="py-2 px-3 font-bold text-[#1E293B]">Step</th>
                            <th className="py-2 px-3 font-bold text-[#1E293B]">Operation</th>
                            <th className="py-2 px-3 font-bold text-[#4F46E5]">Product</th>
                            <th className="py-2 px-3 font-bold text-[#D97706]">Carry Extracted</th>
                            <th className="py-2 px-3 font-bold text-[#1E293B]">Symbol</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F2F7F4]">
                          {divisionSteps.mulData.steps.map((st) => (
                            <tr key={st.step} className="hover:bg-[#FAF8F5]/60">
                              <td className="py-2 px-3 text-[#64748B]">{st.step}</td>
                              <td className="py-2 px-3">{st.multiplier} &times; {targetDivisionBase}</td>
                              <td className="py-2 px-3 font-bold text-[#4F46E5]">{st.product}</td>
                              <td className="py-2 px-3 font-bold text-[#D97706]">{st.carry}</td>
                              <td className="py-2 px-3 font-black text-[#1E293B]">{st.hexSymbol}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-mono text-[#64748B] text-center">
                      No fractional component present (fraction = 0).
                    </div>
                  )}

                  {divisionSteps.mulData.steps.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-mono text-[#3730A3] font-bold">
                      Fraction Result (Read top-to-bottom): (0.{divisionSteps.mulData.resultStr})_{targetDivisionBase}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB C: 3-Bit / 4-Bit Grouping Strip */}
          {activeStepTab === "groupingStrips" && (
            <div className="space-y-6">
              <div className="p-3 bg-[#FEF3C7] rounded-xl border border-[#FDE68A] text-xs font-mono text-[#92400E]">
                Rule: Group outward from the Radix Point. For Octal, group in 3s (4-2-1). For Hexadecimal, group in 4s (8-4-2-1). Padded zeros shown in Amber.
              </div>

              {/* Octal (3-Bit) Grouping Breakdown */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                <span className="text-xs font-mono font-bold text-[#D97706] uppercase block">
                  1. Binary &harr; Octal Grouping (Triplets: 3 Bits)
                </span>
                <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-sm flex items-center gap-3 overflow-x-auto">
                  <span className="text-[#64748B] text-xs">Binary:</span>
                  <span className="font-bold text-[#1E293B]">{conversions.bin}</span>
                  <span className="text-[#64748B] text-xs">&rarr;</span>
                  <span className="font-bold text-[#D97706]">Octal: ({conversions.oct})₈</span>
                </div>
              </div>

              {/* Hexadecimal (4-Bit) Grouping Breakdown */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                <span className="text-xs font-mono font-bold text-[#9333EA] uppercase block">
                  2. Binary &harr; Hexadecimal Grouping (Nibbles: 4 Bits)
                </span>
                <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] font-mono text-sm flex items-center gap-3 overflow-x-auto">
                  <span className="text-[#64748B] text-xs">Binary:</span>
                  <span className="font-bold text-[#1E293B]">{conversions.bin}</span>
                  <span className="text-[#64748B] text-xs">&rarr;</span>
                  <span className="font-bold text-[#9333EA]">Hex: ({conversions.hex})₁₆</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};


// ============================================================================
// SOLVER 2: BINARY ARITHMETIC VISUAL GRID (ADD / SUB / MUL / DIV)
// ============================================================================
const BinaryArithmeticGridSolver = () => {
  const [op, setOp] = useState("+");
  const [opA, setOpA] = useState("1101.011");
  const [opB, setOpB] = useState("1011.110");

  const presets = [
    { label: "Addition with Fractional Carries: 1101.011 + 1011.110", a: "1101.011", b: "1011.110", op: "+" },
    { label: "Zero-Bridge Borrow Subtraction: 10000 - 00101", a: "10000", b: "00101", op: "-" },
    { label: "Partial Product Multiplication: 1011 × 1101", a: "1011", b: "1101", op: "×" },
    { label: "Fractional Multiplication: 10.11 × 1.01", a: "10.11", b: "1.01", op: "×" },
    { label: "Binary Long Division: 11001 ÷ 101", a: "11001", b: "101", op: "÷" }
  ];

  // Helper for binary addition / subtraction grid
  const arithmeticResult = useMemo(() => {
    const cleanA = opA.trim();
    const cleanB = opB.trim();
    if (!cleanA || !cleanB) return null;

    // Validate characters
    if (!/^[01.]+$/.test(cleanA) || !/^[01.]+$/.test(cleanB)) return { isValid: false, error: "Only 0, 1, and '.' are allowed" };

    if (op === "+" || op === "-") {
      // Split parts
      const [intA, fracA = ""] = cleanA.split('.');
      const [intB, fracB = ""] = cleanB.split('.');

      // Equalize integer length (left pad with 0) and fraction length (right pad with 0)
      const maxInt = Math.max(intA.length, intB.length);
      const maxFrac = Math.max(fracA.length, fracB.length);

      const paddedIntA = intA.padStart(maxInt, '0');
      const paddedIntB = intB.padStart(maxInt, '0');
      const paddedFracA = fracA.padEnd(maxFrac, '0');
      const paddedFracB = fracB.padEnd(maxFrac, '0');

      const fullA = maxFrac > 0 ? `${paddedIntA}.${paddedFracA}` : paddedIntA;
      const fullB = maxFrac > 0 ? `${paddedIntB}.${paddedFracB}` : paddedIntB;

      // Base 10 equivalents
      const decA = parseToDecimalParts(cleanA, 2).totalDec;
      const decB = parseToDecimalParts(cleanB, 2).totalDec;
      const decRes = op === "+" ? decA + decB : decA - decB;

      return {
        isValid: true,
        fullA,
        fullB,
        decA,
        decB,
        decRes,
        binRes: decimalIntToTarget(Math.floor(Math.abs(decRes)), 2).resultStr + (decRes % 1 !== 0 ? "." + decimalFracToTarget(Math.abs(decRes) % 1, 2).resultStr : "")
      };
    } else if (op === "×") {
      // Multiplication
      const decA = parseToDecimalParts(cleanA, 2).totalDec;
      const decB = parseToDecimalParts(cleanB, 2).totalDec;
      const decRes = decA * decB;

      const intOnlyA = cleanA.replace('.', '');
      const intOnlyB = cleanB.replace('.', '');
      const fracBits = (cleanA.split('.')[1]?.length || 0) + (cleanB.split('.')[1]?.length || 0);

      // Generate partial products
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
        decA,
        decB,
        decRes,
        partialProducts,
        binRes: finalBin
      };
    } else if (op === "÷") {
      // Division
      const decA = parseToDecimalParts(cleanA, 2).totalDec;
      const decB = parseToDecimalParts(cleanB, 2).totalDec;
      if (decB === 0) return { isValid: false, error: "Division by zero is undefined" };

      const quotientDec = Math.floor(decA / decB);
      const remainderDec = decA % decB;

      return {
        isValid: true,
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
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E6F40] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
              Bit-Aligned Visual Arithmetic Working
            </span>
            <span className="text-xs font-mono text-[#64748B]">
              Base 10 Verification: {arithmeticResult.decA} {op} {arithmeticResult.decB} = {arithmeticResult.decRes}
            </span>
          </div>

          {/* ADDITION / SUBTRACTION VISUAL STACK */}
          {(op === "+" || op === "-") && (
            <div className="max-w-md mx-auto p-5 bg-[#FAF8F5] rounded-2xl border border-[#DCE7E1] space-y-3 font-mono text-center">
              <div className="text-right text-xs text-[#64748B] font-bold pr-2">
                Aligned Bit Vector
              </div>

              {/* Operand A */}
              <div className="flex justify-end items-center gap-2 text-base font-extrabold text-[#1E293B]">
                <span className="text-xs text-[#64748B] font-mono">A:</span>
                <span className="tracking-widest">{arithmeticResult.fullA}</span>
                <span className="text-xs text-[#64748B]">({arithmeticResult.decA}₁₀)</span>
              </div>

              {/* Operand B */}
              <div className="flex justify-end items-center gap-2 text-base font-extrabold text-[#1E293B]">
                <span className="text-sm font-bold text-[#2E6F40]">{op}</span>
                <span className="tracking-widest">{arithmeticResult.fullB}</span>
                <span className="text-xs text-[#64748B]">({arithmeticResult.decB}₁₀)</span>
              </div>

              <div className="border-t-2 border-[#1E293B] pt-2" />

              {/* Result Row */}
              <div className="flex justify-end items-center gap-2 text-lg font-black text-[#2E6F40]">
                <span className="text-xs text-[#64748B] font-mono">=</span>
                <span className="tracking-widest">{arithmeticResult.binRes}</span>
                <span className="text-xs text-[#2E6F40] font-bold">({arithmeticResult.decRes}₁₀)</span>
              </div>
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
  const [mode, setMode] = useState("subtractor"); // "finder" or "subtractor"
  
  // Finder state
  const [findBase, setFindBase] = useState("binary");
  const [findInput, setFindInput] = useState("101100");

  // Subtractor state
  const [minuendM, setMinuendM] = useState("11010");
  const [subtrahendN, setSubtrahendN] = useState("01101");
  const [compType, setCompType] = useState("twos"); // "ones", "twos", "nines", "tens"

  const presets = [
    { label: "Binary 2's Comp (M > N): 11010 - 01101 (26 - 13)", m: "11010", n: "01101", type: "twos" },
    { label: "Binary 2's Comp (M < N): 01100 - 10101 (12 - 21)", m: "01100", n: "10101", type: "twos" },
    { label: "Binary 1's Comp End-Around: 10110 - 01001", m: "10110", n: "01001", type: "ones" },
    { label: "Decimal 10's Comp: 72532 - 03250", m: "72532", n: "03250", type: "tens" },
    { label: "Decimal 9's Comp End-Around: 450 - 230", m: "450", n: "230", type: "nines" }
  ];

  // Complement Subtraction Engine
  const subtractionResult = useMemo(() => {
    const isBinary = compType === "ones" || compType === "twos";
    const base = isBinary ? 2 : 10;
    const cleanM = minuendM.trim();
    const cleanN = subtrahendN.trim();
    if (!cleanM || !cleanN) return null;

    // Equalize length with leading zeros
    const maxLen = Math.max(cleanM.length, cleanN.length);
    const padM = cleanM.padStart(maxLen, '0');
    const padN = cleanN.padStart(maxLen, '0');

    const decM = parseInt(cleanM, base);
    const decN = parseInt(cleanN, base);
    const decDiff = decM - decN;

    // Calculate complement of N
    let compNStr = "";
    if (compType === "ones") {
      compNStr = padN.split('').map(b => b === '0' ? '1' : '0').join('');
    } else if (compType === "twos") {
      const ones = padN.split('').map(b => b === '0' ? '1' : '0').join('');
      const twosVal = (parseInt(ones, 2) + 1);
      compNStr = twosVal.toString(2).padStart(maxLen, '0');
    } else if (compType === "nines") {
      compNStr = padN.split('').map(d => (9 - parseInt(d, 10)).toString()).join('');
    } else if (compType === "tens") {
      const nines = padN.split('').map(d => (9 - parseInt(d, 10)).toString()).join('');
      compNStr = (parseInt(nines, 10) + 1).toString().padStart(maxLen, '0');
    }

    // Add M + Comp(N)
    const sumVal = parseInt(padM, base) + parseInt(compNStr, base);
    const sumStr = sumVal.toString(base).padStart(maxLen, '0');
    const hasCarry = sumStr.length > maxLen;
    const carryBit = hasCarry ? sumStr[0] : "0";
    const remainingSum = hasCarry ? sumStr.slice(1) : sumStr;

    // Final answer evaluation
    let finalAnswer = "";
    let explanation = "";

    if (hasCarry) {
      if (compType === "twos" || compType === "tens") {
        finalAnswer = `+${remainingSum}`;
        explanation = "Carry = 1 indicates POSITIVE result. In r's complement (2's or 10's), DISCARD the end carry. Remaining bits form the exact positive difference.";
      } else {
        // 1's or 9's: Add end-around carry (+1)
        const endAroundVal = (parseInt(remainingSum, base) + 1).toString(base).padStart(maxLen, '0');
        finalAnswer = `+${endAroundVal}`;
        explanation = "Carry = 1 indicates POSITIVE result. In (r-1)'s complement (1's or 9's), ADD the End-Around Carry (+1) to the LSB.";
      }
    } else {
      // No carry: Negative result
      if (compType === "twos") {
        const ones = remainingSum.split('').map(b => b === '0' ? '1' : '0').join('');
        const reComp = (parseInt(ones, 2) + 1).toString(2).padStart(maxLen, '0');
        finalAnswer = `-${reComp}`;
      } else if (compType === "ones") {
        const ones = remainingSum.split('').map(b => b === '0' ? '1' : '0').join('');
        finalAnswer = `-${ones}`;
      } else if (compType === "tens") {
        const nines = remainingSum.split('').map(d => (9 - parseInt(d, 10)).toString()).join('');
        const reComp = (parseInt(nines, 10) + 1).toString().padStart(maxLen, '0');
        finalAnswer = `-${reComp}`;
      } else {
        const nines = remainingSum.split('').map(d => (9 - parseInt(d, 10)).toString()).join('');
        finalAnswer = `-${nines}`;
      }
      explanation = "Carry = 0 indicates NEGATIVE result. Re-complement the sum and attach an explicit negative (-) sign.";
    }

    return {
      padM,
      padN,
      decM,
      decN,
      decDiff,
      compNStr,
      sumStr,
      hasCarry,
      carryBit,
      remainingSum,
      finalAnswer,
      explanation
    };
  }, [minuendM, subtrahendN, compType]);

  return (
    <div className="space-y-6">
      
      {/* Sub-Mode Toggle */}
      <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs">
        <button
          onClick={() => setMode("subtractor")}
          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            mode === "subtractor"
              ? "bg-[#2E6F40] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          Sub-Mode B: Full Complement Subtraction Engine (M - N)
        </button>
        <button
          onClick={() => setMode("finder")}
          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            mode === "finder"
              ? "bg-[#2E6F40] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          Sub-Mode A: 3-Stage Complement Generator
        </button>
      </div>

      {/* Preset Chips */}
      {mode === "subtractor" && (
        <div className="p-4 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs space-y-2">
          <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
            Load Subtraction Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
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
      )}

      {/* SUBTRACTOR WORKINGS */}
      {mode === "subtractor" && subtractionResult && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Minuend (M):</label>
                <input
                  type="text"
                  value={minuendM}
                  onChange={(e) => setMinuendM(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Subtrahend (N):</label>
                <input
                  type="text"
                  value={subtrahendN}
                  onChange={(e) => setSubtrahendN(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-base font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[#1E293B] uppercase">Complement Type:</label>
                <select
                  value={compType}
                  onChange={(e) => setCompType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-sm font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2E6F40]"
                >
                  <option value="twos">Binary 2's Complement</option>
                  <option value="ones">Binary 1's Complement</option>
                  <option value="tens">Decimal 10's Complement</option>
                  <option value="nines">Decimal 9's Complement</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subtraction Execution Pipeline */}
          <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-6 font-mono text-xs">
            
            {/* Step 1: Operand Equalization */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
              <span className="font-bold text-[#1E293B] uppercase block">
                Step 1: Length Equalization with Amber Padded Leading Zeros
              </span>
              <div className="flex gap-4">
                <span>M = <strong className="text-[#2E6F40]">{subtractionResult.padM}</strong> ({subtractionResult.decM}₁₀)</span>
                <span>N = <strong className="text-[#4F46E5]">{subtractionResult.padN}</strong> ({subtractionResult.decN}₁₀)</span>
              </div>
            </div>

            {/* Step 2: Complement of N */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
              <span className="font-bold text-[#1E293B] uppercase block">
                Step 2: Compute {compType.toUpperCase()} Complement of N
              </span>
              <div className="text-sm">
                Comp(N) = <strong className="text-[#D97706]">{subtractionResult.compNStr}</strong>
              </div>
            </div>

            {/* Step 3: Addition Grid */}
            <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3 max-w-sm mx-auto text-right">
              <span className="font-bold text-[#1E293B] uppercase block text-left text-[11px]">
                Step 3: Perform Addition M + Comp(N)
              </span>
              <div className="text-sm font-bold">{subtractionResult.padM}</div>
              <div className="text-sm font-bold text-[#D97706]">+ {subtractionResult.compNStr}</div>
              <div className="border-t-2 border-[#1E293B] pt-1" />
              <div className="text-base font-black">
                {subtractionResult.hasCarry && <span className="text-[#D97706] bg-[#FEF3C7] px-1 rounded mr-1">({subtractionResult.carryBit})</span>}
                <span>{subtractionResult.remainingSum}</span>
              </div>
            </div>

            {/* Step 4: Decision Diamond Card */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              subtractionResult.hasCarry 
                ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]" 
                : "bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]"
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Decision Diamond: Carry = {subtractionResult.hasCarry ? "1 (YES)" : "0 (NO)"}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {subtractionResult.explanation}
              </p>
              <div className="pt-2 border-t border-current/20 text-base font-black">
                Final Result: {subtractionResult.finalAnswer}
              </div>
            </div>

            {/* Base 10 Check */}
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[#64748B]">
              Base 10 Verification: {subtractionResult.decM} - {subtractionResult.decN} = {subtractionResult.decDiff}. Verified.
            </div>

          </div>
        </div>
      )}

      {/* COMPLEMENT FINDER WORKINGS */}
      {mode === "finder" && (
        <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B]">Select Base:</label>
              <select
                value={findBase}
                onChange={(e) => setFindBase(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5]"
              >
                <option value="binary">Binary (1's &amp; 2's Complement)</option>
                <option value="decimal">Decimal (9's &amp; 10's Complement)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B]">Input Number:</label>
              <input
                type="text"
                value={findInput}
                onChange={(e) => setFindInput(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#DCE7E1] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
            <span className="font-bold text-[#2E6F40] block">Stage 1: Formal Formula</span>
            <p className="text-[11px] text-[#64748B]">
              {findBase === "binary" ? "1's Comp = (2ⁿ - 1) - N.  2's Comp = 2ⁿ - N." : "9's Comp = (10ⁿ - 1) - N. 10's Comp = 10ⁿ - N."}
            </p>
            <span className="font-bold text-[#4F46E5] block">Stage 2: Bit Inversion + 1 at LSB</span>
            <p className="text-[11px] text-[#64748B]">
              {findBase === "binary" ? "Flip each bit (0 &harr; 1), then add +1 to the LSB." : "Subtract each digit from 9, then add +1 to the LSB."}
            </p>
            <span className="font-bold text-[#D97706] block">Stage 3: Right-to-Left Scan Shortcut</span>
            <p className="text-[11px] text-[#64748B]">
              Scan from right to left: leave trailing zeros and the first non-zero digit unchanged, then flip all digits to the left!
            </p>
          </div>
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
  
  // Inspector state
  const [inspectDec, setInspectDec] = useState(-45);

  // Overflow adder state
  const [numA, setNumA] = useState(85);
  const [numB, setNumB] = useState(65);

  const presets = [
    { label: "Positive Overflow: (+85) + (+65)", a: 85, b: 65 },
    { label: "Negative Overflow: (-80) + (-60)", a: -80, b: -60 },
    { label: "Safe Mixed Addition: (+45) + (-27)", a: 45, b: -27 },
    { label: "Safe Subtraction: (+100) + (-50)", a: 100, b: -50 },
    { label: "Neutral Cancellation: (-100) + (+100)", a: -100, b: 100 }
  ];

  // Helper: Convert signed decimal to 8-bit 2's complement string
  const toSigned8Bit = (n) => {
    if (n >= 0) {
      return (n & 0xFF).toString(2).padStart(8, '0');
    } else {
      return (256 + n).toString(2).padStart(8, '0');
    }
  };

  // Compute overflow simulation
  const overflowData = useMemo(() => {
    const a = parseInt(numA, 10) || 0;
    const b = parseInt(numB, 10) || 0;
    const trueSum = a + b;

    const binA = toSigned8Bit(a);
    const binB = toSigned8Bit(b);

    // Perform 8-bit addition with carries
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
    // Decoded 2's complement value of resultBin
    const decodedVal = sumBits[0] === 1 ? parseInt(resultBin, 2) - 256 : parseInt(resultBin, 2);

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
      isOverflow: vFlag === 1
    };
  }, [numA, numB]);

  return (
    <div className="space-y-6">
      
      {/* Sub-Mode Toggle */}
      <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs">
        <button
          onClick={() => setSubMode("overflow")}
          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            subMode === "overflow"
              ? "bg-[#2E6F40] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#1E293B]"
          }`}
        >
          Sub-Mode B: 8-Bit 2's Complement Adder &amp; Overflow Detector (V = Cin &oplus; Cout)
        </button>
        <button
          onClick={() => setSubMode("inspector")}
          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
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
          {/* Inputs */}
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

          {/* Graphical Bit-Aligned 8-Bit Addition Grid */}
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
                  {/* Operand A */}
                  <tr className="border-b border-[#F2F7F4]">
                    <td className="py-2 px-2 text-left font-bold text-[#1E293B]">A ({overflowData.a})</td>
                    {overflowData.binA.split('').map((b, i) => (
                      <td key={i} className={`py-2 px-2 font-bold ${i === 0 ? "text-[#D97706] bg-[#FEF3C7]/30" : "text-[#1E293B]"}`}>{b}</td>
                    ))}
                  </tr>

                  {/* Operand B */}
                  <tr className="border-b border-[#F2F7F4]">
                    <td className="py-2 px-2 text-left font-bold text-[#1E293B]">+ B ({overflowData.b})</td>
                    {overflowData.binB.split('').map((b, i) => (
                      <td key={i} className={`py-2 px-2 font-bold ${i === 0 ? "text-[#D97706] bg-[#FEF3C7]/30" : "text-[#1E293B]"}`}>{b}</td>
                    ))}
                  </tr>

                  {/* Sum Row */}
                  <tr className="bg-[#FAF8F5] font-black text-sm">
                    <td className="py-2 px-2 text-left text-[#2E6F40]">Sum</td>
                    {overflowData.resultBin.split('').map((b, i) => (
                      <td key={i} className={`py-2 px-2 ${i === 0 ? "text-[#D97706] bg-[#FEF3C7]/40" : "text-[#2E6F40]"}`}>{b}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Hardware Diagnostic Banner */}
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

  // 8-step pulse waveform state
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

  // Evaluate single gate logic
  const evalGate = (gateId, a, b, c) => {
    if (gateId === "NOT") return a === 0 ? 1 : 0;
    if (gateId === "AND") return numInputs === 2 ? (a === 1 && b === 1 ? 1 : 0) : (a === 1 && b === 1 && c === 1 ? 1 : 0);
    if (gateId === "OR") return numInputs === 2 ? (a === 1 || b === 1 ? 1 : 0) : (a === 1 || b === 1 || c === 1 ? 1 : 0);
    if (gateId === "NAND") return !(numInputs === 2 ? (a === 1 && b === 1) : (a === 1 && b === 1 && c === 1)) ? 1 : 0;
    if (gateId === "NOR") return (numInputs === 2 ? (a === 0 && b === 0) : (a === 0 && b === 0 && c === 0)) ? 1 : 0;
    if (gateId === "XOR") {
      if (numInputs === 2) return a !== b ? 1 : 0;
      // Odd 1s detector
      const ones = a + b + c;
      return ones % 2 === 1 ? 1 : 0;
    }
    if (gateId === "XNOR") {
      if (numInputs === 2) return a === b ? 1 : 0;
      const ones = a + b + c;
      return ones % 2 === 0 ? 1 : 0;
    }
    return 0;
  };

  const allGates = [
    { id: "NOT", name: "NOT Gate", ic: "7404", exp: "Y = A'" },
    { id: "AND", name: "AND Gate", ic: "7408", exp: "Y = A . B" },
    { id: "OR", name: "OR Gate", ic: "7432", exp: "Y = A + B" },
    { id: "NAND", name: "NAND Gate", ic: "7400", exp: "Y = (A . B)'" },
    { id: "NOR", name: "NOR Gate", ic: "7402", exp: "Y = (A + B)'" },
    { id: "XOR", name: "XOR Gate", ic: "7486", exp: "Y = A (+) B" },
    { id: "XNOR", name: "XNOR Gate", ic: "74266", exp: "Y = (A (+) B)'" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Live Input Controller */}
      <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#DCE7E1]">
          <div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1E293B]">
              Logic Gate Real-Time Signal Controller
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">Toggle inputs A, B (and C) to test all 7 logic gates instantaneously.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#64748B]">Inputs:</span>
            <button
              onClick={() => setNumInputs(2)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                numInputs === 2 ? "bg-[#2E6F40] text-white" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
              }`}
            >
              2 Inputs (A, B)
            </button>
            <button
              onClick={() => setNumInputs(3)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                numInputs === 3 ? "bg-[#2E6F40] text-white" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
              }`}
            >
              3 Inputs (A, B, C)
            </button>
          </div>
        </div>

        {/* Input Toggle Pills */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Input A */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1E293B]">Input A:</span>
            <div className="inline-flex rounded-lg bg-[#FAF8F5] p-1 border border-[#DCE7E1]">
              <button
                onClick={() => setInA(0)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${inA === 0 ? "bg-[#64748B] text-white" : "text-[#64748B]"}`}
              >
                0
              </button>
              <button
                onClick={() => setInA(1)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${inA === 1 ? "bg-[#10B981] text-white shadow-2xs" : "text-[#64748B]"}`}
              >
                1
              </button>
            </div>
          </div>

          {/* Input B */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#1E293B]">Input B:</span>
            <div className="inline-flex rounded-lg bg-[#FAF8F5] p-1 border border-[#DCE7E1]">
              <button
                onClick={() => setInB(0)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${inB === 0 ? "bg-[#64748B] text-white" : "text-[#64748B]"}`}
              >
                0
              </button>
              <button
                onClick={() => setInB(1)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold ${inB === 1 ? "bg-[#10B981] text-white shadow-2xs" : "text-[#64748B]"}`}
              >
                1
              </button>
            </div>
          </div>

          {/* Input C (if 3 inputs) */}
          {numInputs === 3 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#1E293B]">Input C:</span>
              <div className="inline-flex rounded-lg bg-[#FAF8F5] p-1 border border-[#DCE7E1]">
                <button
                  onClick={() => setInC(0)}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold ${inC === 0 ? "bg-[#64748B] text-white" : "text-[#64748B]"}`}
                >
                  0
                </button>
                <button
                  onClick={() => setInC(1)}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold ${inC === 1 ? "bg-[#10B981] text-white shadow-2xs" : "text-[#64748B]"}`}
                >
                  1
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 7 Logic Gates Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allGates.map((gate) => {
          const out = evalGate(gate.id, inA, inB, inC);
          const isHigh = out === 1;

          return (
            <div key={gate.id} className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-[#DCE7E1]">
                  <span className="font-bold text-xs text-[#1E293B]">{gate.name}</span>
                  <span className="font-mono text-[10px] text-[#64748B]">{gate.ic}</span>
                </div>
                <div className="py-2 flex justify-center">
                  <GateSymbolSvg gateId={gate.id} inputA={inA} inputB={inB} outputY={out} width={130} height={70} />
                </div>
                <div className="text-[11px] font-mono font-bold text-center text-[#64748B]">
                  {gate.exp}
                </div>
              </div>

              <div className={`p-2 rounded-lg text-center font-mono text-xs font-bold ${
                isHigh ? "bg-[#10B981] text-white shadow-2xs" : "bg-[#E2E8F0] text-[#64748B]"
              }`}>
                Output Y = {out} {isHigh ? "(HIGH / +5V)" : "(LOW / 0V)"}
              </div>
            </div>
          );
        })}
      </div>

      {/* 8-Step Interactive Pulse Waveform Generator */}
      <div className="p-6 bg-white rounded-2xl border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE7E1]">
          <div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#4F46E5]" />
              8-Step Interactive Pulse Waveform Generator
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">Click any time step (t0 to t7) to flip clock input A or B. Output Y redraws live.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#64748B]">Selected Gate:</span>
            <select
              value={selectedGateWave}
              onChange={(e) => setSelectedGateWave(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-xs font-bold text-[#1E293B]"
            >
              {allGates.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clickable 8-Step Bit Control Strip */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 font-mono text-xs overflow-x-auto">
          {/* Time Steps */}
          <div className="flex items-center gap-2">
            <span className="w-20 font-bold text-[#64748B]">Time Slot:</span>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="w-12 text-center text-[10px] text-[#64748B]">t{i}</span>
            ))}
          </div>

          {/* Clock A */}
          <div className="flex items-center gap-2">
            <span className="w-20 font-bold text-[#2E6F40]">Clock A:</span>
            {waveformA.map((bit, i) => (
              <button
                key={i}
                onClick={() => toggleWaveBit("A", i)}
                className={`w-12 py-1 rounded text-xs font-bold transition-all ${
                  bit === 1 ? "bg-[#10B981] text-white" : "bg-white text-[#64748B] border border-[#DCE7E1]"
                }`}
              >
                {bit}
              </button>
            ))}
          </div>

          {/* Clock B */}
          <div className="flex items-center gap-2">
            <span className="w-20 font-bold text-[#0284C7]">Clock B:</span>
            {waveformB.map((bit, i) => (
              <button
                key={i}
                onClick={() => toggleWaveBit("B", i)}
                className={`w-12 py-1 rounded text-xs font-bold transition-all ${
                  bit === 1 ? "bg-[#0284C7] text-white" : "bg-white text-[#64748B] border border-[#DCE7E1]"
                }`}
              >
                {bit}
              </button>
            ))}
          </div>

          {/* Result Output Y for Selected Gate */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#DCE7E1]">
            <span className="w-20 font-black text-[#4F46E5]">{selectedGateWave} Out:</span>
            {Array.from({ length: 8 }).map((_, i) => {
              const yBit = evalGate(selectedGateWave, waveformA[i], waveformB[i], 0);
              return (
                <span
                  key={i}
                  className={`w-12 py-1 rounded text-center text-xs font-black ${
                    yBit === 1 ? "bg-[#4F46E5] text-white shadow-2xs" : "bg-[#E2E8F0] text-[#64748B]"
                  }`}
                >
                  {yBit}
                </span>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default InteractiveSolvers;
