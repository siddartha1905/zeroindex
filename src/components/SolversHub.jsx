import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  RefreshCw, 
  Binary, 
  Layers, 
  ArrowRight, 
  Check, 
  Cpu, 
  Zap,
  Info
} from 'lucide-react';

export const SolversHub = ({ onNavigate }) => {
  // Live Radix Converter state
  const [inputValue, setInputValue] = useState("42");
  const [inputBase, setInputBase] = useState(10);
  const [error, setError] = useState("");

  // Live 2's Complement state
  const [compInput, setCompInput] = useState(42);
  const [compBitWidth, setCompBitWidth] = useState(8);

  // Compute conversions safely
  let decimalVal = NaN;
  try {
    if (inputValue.trim() === "") {
      decimalVal = 0;
    } else {
      decimalVal = parseInt(inputValue.trim(), inputBase);
      if (isNaN(decimalVal)) {
        throw new Error("Invalid number for the chosen base");
      }
    }
  } catch (err) {
    decimalVal = NaN;
  }

  const binaryString = !isNaN(decimalVal) ? (decimalVal >= 0 ? decimalVal.toString(2) : "-" + Math.abs(decimalVal).toString(2)) : "-";
  const octalString = !isNaN(decimalVal) ? (decimalVal >= 0 ? decimalVal.toString(8) : "-" + Math.abs(decimalVal).toString(8)) : "-";
  const hexString = !isNaN(decimalVal) ? (decimalVal >= 0 ? decimalVal.toString(16).toUpperCase() : "-" + Math.abs(decimalVal).toString(16).toUpperCase()) : "-";
  const decString = !isNaN(decimalVal) ? decimalVal.toString(10) : "-";

  // Compute 2's complement for compInput
  const bitLength = compBitWidth;
  const num = parseInt(compInput, 10) || 0;
  const maxPositive = Math.pow(2, bitLength - 1) - 1;
  const minNegative = -Math.pow(2, bitLength - 1);
  const isOutOfRange = num > maxPositive || num < minNegative;

  // Mask to bitLength
  let twosCompBin = "";
  let onesCompBin = "";
  let absBin = "";

  if (!isOutOfRange) {
    const rawMask = (1 << bitLength) - 1;
    const unsignedVal = (num & rawMask);
    twosCompBin = unsignedVal.toString(2).padStart(bitLength, '0');
    
    // Absolute binary
    const absVal = Math.abs(num);
    absBin = absVal.toString(2).padStart(bitLength, '0');

    // Inverted (1's complement of magnitude)
    onesCompBin = absBin.split('').map(b => b === '0' ? '1' : '0').join('');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold uppercase text-[#4F46E5] bg-[#EEF2FF] px-2.5 py-1 rounded-full">
            Interactive Visual Solvers Hub
          </span>
          <span className="text-xs text-[#64748B]">Stage 2 Live Preview · Stage 3 Full Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
          Digital Number Systems & Arithmetic Visualizers
        </h1>
        <p className="text-sm text-[#475569] mt-2 max-w-3xl leading-relaxed">
          Step-by-step algorithmic solvers engineered to give students instant feedback, verify manual exam arithmetic, and build intuition for how semiconductor hardware operates.
        </p>
      </div>

      {/* Grid: 2 Live Working Interactive Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Tool 1: Live Radix Base Converter */}
        <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F2F7F4]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#2E6F40]">
                <Calculator className="w-4 h-4" />
                <span>Tool 1: Multi-Base Radix Converter</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F2F7F4] text-[#2E6F40]">
                Live Interactive
              </span>
            </div>

            <p className="text-xs text-[#64748B] mb-4">
              Enter any number in Decimal, Binary, Octal, or Hexadecimal to see instantaneous synchronous conversions across all computing radices.
            </p>

            {/* Input Controls */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Enter Input Value:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g. 42 or 101010"
                    className="flex-1 px-3 py-2 rounded-lg border border-[#DCE7E1] font-mono text-sm focus:outline-none focus:border-[#2E6F40]"
                  />
                  <select
                    value={inputBase}
                    onChange={(e) => setInputBase(Number(e.target.value))}
                    className="px-3 py-2 rounded-lg border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-xs font-semibold focus:outline-none focus:border-[#2E6F40]"
                  >
                    <option value={10}>Base 10 (Decimal)</option>
                    <option value={2}>Base 2 (Binary)</option>
                    <option value={8}>Base 8 (Octal)</option>
                    <option value={16}>Base 16 (Hex)</option>
                  </select>
                </div>
              </div>

              {/* Converted Outputs Grid (Slate Technical Card) */}
              <div className="p-4 rounded-xl bg-[#1E293B] text-white space-y-3 mt-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
                  Synchronous Radix Representations
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0F172A] border border-[#334155]">
                    <span className="text-[10px] text-[#94A3B8] block">Decimal (Base 10)</span>
                    <span className="text-sm font-bold text-[#F8FAFC]">{decString}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0F172A] border border-[#334155]">
                    <span className="text-[10px] text-[#94A3B8] block">Binary (Base 2)</span>
                    <span className="text-sm font-bold text-[#38BDF8] break-all">{binaryString}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0F172A] border border-[#334155]">
                    <span className="text-[10px] text-[#94A3B8] block">Octal (Base 8)</span>
                    <span className="text-sm font-bold text-[#FBBF24]">{octalString}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#0F172A] border border-[#334155]">
                    <span className="text-[10px] text-[#94A3B8] block">Hexadecimal (Base 16)</span>
                    <span className="text-sm font-bold text-[#4ADE80]">{hexString}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] text-[#64748B]">
            <span className="font-semibold text-[#1E293B]">Tip: </span>
            In Stage 3, this tool will animate the long-division remainder tree step-by-step for university test answers.
          </div>
        </div>

        {/* Tool 2: 2's Complement Step-by-Step Animator Shell */}
        <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F2F7F4]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#4F46E5]">
                <Binary className="w-4 h-4" />
                <span>Tool 2: Signed 2's Complement Calculator</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5]">
                Live Interactive
              </span>
            </div>

            <p className="text-xs text-[#64748B] mb-4">
              Explore how positive and negative signed integers are represented in hardware using standard 2's complement notation.
            </p>

            {/* Controls */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Signed Integer (-128 to +127):
                  </label>
                  <input
                    type="number"
                    value={compInput}
                    onChange={(e) => setCompInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE7E1] font-mono text-sm focus:outline-none focus:border-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Bit Width:
                  </label>
                  <select
                    value={compBitWidth}
                    onChange={(e) => setCompBitWidth(Number(e.target.value))}
                    className="px-3 py-2 rounded-lg border border-[#DCE7E1] bg-[#FAF8F5] font-mono text-xs font-semibold focus:outline-none"
                  >
                    <option value={8}>8-bit (int8)</option>
                    <option value={16}>16-bit (int16)</option>
                  </select>
                </div>
              </div>

              {/* Bit Breakdown Box */}
              {isOutOfRange ? (
                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs text-[#991B1B]">
                  Out of range for {bitLength}-bit representation! Allowed range: [{minNegative}, {maxPositive}].
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#64748B]">Sign: {num >= 0 ? "Positive (+)" : "Negative (-)"}</span>
                    <span className="text-[#2E6F40] font-bold">MSB: {twosCompBin[0]}</span>
                  </div>

                  {/* Visual Bit Tiles */}
                  <div className="flex items-center justify-center gap-1 overflow-x-auto py-2">
                    {twosCompBin.split('').map((bit, idx) => (
                      <div
                        key={idx}
                        className={`w-7 h-9 rounded flex flex-col items-center justify-center font-mono text-xs font-bold border transition-colors ${
                          idx === 0 
                            ? 'bg-[#4F46E5] text-white border-[#4338CA]' 
                            : 'bg-white text-[#1E293B] border-[#DCE7E1]'
                        }`}
                      >
                        <span>{bit}</span>
                        <span className="text-[7px] font-normal text-slate-400">b{bitLength - 1 - idx}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-[#DCE7E1] space-y-1">
                    <div>Hex Byte: <span className="text-[#1E293B] font-bold">0x{parseInt(twosCompBin, 2).toString(16).toUpperCase().padStart(bitLength/4, '0')}</span></div>
                    {num < 0 && (
                      <div>Steps: (1) Magnitude: {absBin} → (2) Invert: {onesCompBin} → (3) Add 1: <span className="text-[#4F46E5] font-bold">{twosCompBin}</span></div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] text-[#64748B]">
            <span className="font-semibold text-[#1E293B]">Hardware Fact: </span>
            The MSB carries a weight of -2^({bitLength - 1}) ({num < 0 ? `-${Math.pow(2, bitLength - 1)}` : '0'}), automatically handling negative numbers.
          </div>
        </div>

      </div>

      {/* Upcoming Stage 3 Solvers Road-Map Shell Cards */}
      <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1E293B]">Stage 3 Solvers in Development</h3>
            <p className="text-xs text-[#64748B]">These advanced modules are being connected to our mathematical solver engine in Stage 3.</p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#D97706]">
            Stage 3 Delivery
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
            <span className="text-xs font-bold text-[#2E6F40]">Logic Gate Sandbox</span>
            <p className="text-xs text-[#64748B]">Interactive drag-and-drop circuit simulator for AND, OR, NOT, NAND, NOR, and XOR with dynamic live truth tables.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
            <span className="text-xs font-bold text-[#4F46E5]">IEEE-754 Floating Point Animator</span>
            <p className="text-xs text-[#64748B]">Deconstruct 32-bit single precision into 1 Sign bit, 8 Exponent bits (biased by 127), and 23 Mantissa bits with GPU tensor links.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
            <span className="text-xs font-bold text-[#D97706]">Interactive 4-Variable K-Map Solver</span>
            <p className="text-xs text-[#64748B]">Click minterm cells to automatically form prime implicant loops, identify essential prime implicants, and output minimal SOP expressions.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SolversHub;
