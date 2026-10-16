import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Cpu, 
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Layers,
  Binary,
  Hash,
  CornerDownRight
} from 'lucide-react';

/**
 * Section 1.6 Graphical Hardware & Pedagogical Signed Number Components
 * Strict formatting: ZERO em-dashes (\u2014) and ZERO en-dashes (\u2013).
 */

// 1. 8-Bit Graphical Register Strip Component
export const Register8BitStrip = ({ 
  bits = ["0", "0", "0", "0", "0", "0", "0", "0"], 
  mode = "twos", // "twos", "ones", "signmag", "unsigned"
  label = "8-Bit Register",
  sublabel = "",
  highlightSign = true,
  decodedValue = ""
}) => {
  // Ensure array has at least 8 elements, pad or slice
  const bitArr = [...bits];
  while (bitArr.length < 8) bitArr.unshift("0");
  const displayBits = bitArr.slice(-8);

  const getWeight = (idx) => {
    // idx 0 is MSB (b7), idx 7 is LSB (b0)
    const bitPos = 7 - idx;
    if (bitPos === 7) {
      if (mode === "twos") return "-128";
      if (mode === "ones") return "-(127)";
      if (mode === "signmag") return "Sign";
      return "+128";
    }
    return `+${Math.pow(2, bitPos)}`;
  };

  return (
    <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
          <span className="text-xs font-bold text-[#1E293B]">{label}</span>
          {sublabel && <span className="text-[11px] text-[#64748B]">({sublabel})</span>}
        </div>
        {decodedValue && (
          <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-[#DCE7E1] text-xs font-bold text-[#2E6F40]">
            Value = {decodedValue}
          </span>
        )}
      </div>

      {/* Bit Strip */}
      <div className="grid grid-cols-8 gap-1 sm:gap-2">
        {displayBits.map((b, idx) => {
          const bitPos = 7 - idx;
          const isSignBit = bitPos === 7 && highlightSign;
          return (
            <div key={idx} className="flex flex-col items-center">
              {/* Bit Index */}
              <span className="text-[10px] text-[#64748B] font-semibold mb-1">
                b{bitPos}
              </span>

              {/* Bit Cell Box */}
              <div
                className={`w-full aspect-square max-w-[50px] flex items-center justify-center rounded-lg border-2 text-base font-black shadow-xs transition-transform ${
                  isSignBit
                    ? "bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]"
                    : b === "1"
                    ? "bg-[#DCFCE7] border-[#22C55E] text-[#15803D]"
                    : "bg-[#F8FAFC] border-[#CBD5E1] text-[#64748B]"
                }`}
              >
                {b}
              </div>

              {/* Positional Weight */}
              <span 
                className={`text-[10px] mt-1 font-bold ${
                  isSignBit ? "text-[#D97706]" : "text-[#475569]"
                }`}
              >
                {getWeight(idx)}
              </span>

              {/* Role tag */}
              <span className="text-[9px] text-[#94A3B8] uppercase">
                {isSignBit ? "SIGN" : `2^${bitPos}`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Register Strip Legend */}
      <div className="flex flex-wrap items-center justify-between text-[11px] pt-1 text-[#64748B] border-t border-[#F1F5F9]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#FEF3C7] border border-[#F59E0B]" />
            Amber = Sign Bit (b7: 0 = Positive, 1 = Negative)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#DCFCE7] border border-[#22C55E]" />
            Green = Magnitude 1
          </span>
        </div>
        <span className="text-[10px] uppercase font-bold text-[#475569]">
          Total: 8 Bits
        </span>
      </div>
    </div>
  );
};

// 2. Full-Width Bit-Aligned Signed 2's Complement Addition Grid
export const BitAlignedSignedAdditionGrid = ({
  model = {
    aDec: "+35",
    aBin: "00100011",
    bDec: "+42",
    bBin: "00101010",
    carryRow: ["0", "0", "0", "0", "0", "0", "0", "0"],
    carryOut: "0",
    sumBin: "01001101",
    sumDec: "+77",
    signBit: "0",
    overflow: false,
    discardCarry: "Carry out C8 = 0. No carry discarded.",
    verification: "+35 + +42 = +77."
  }
}) => {
  const aBits = model.aBin.split("");
  const bBits = model.bBin.split("");
  const sumBits = model.sumBin.split("");
  const carryBits = model.carryRow || ["0", "0", "0", "0", "0", "0", "0", "0"];

  // Carry into b7 is carryBits[0] (or index 0 from left)
  const cinToSign = carryBits[0] || "0";
  const coutFromSign = model.carryOut || "0";
  const xorFlag = model.overflow ? "1" : "0";

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[#4F46E5]">
            <Binary className="w-4 h-4" />
          </span>
          <div>
            <span className="text-xs font-bold text-[#1E293B]">
              8-Bit Signed 2's Complement Hardware Adder Grid
            </span>
            <span className="text-[11px] text-[#64748B] block">
              Operands: ({model.aDec}) + ({model.bDec})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {model.overflow ? (
            <span className="px-2.5 py-1 rounded-lg bg-[#FEE2E2] border border-[#FCA5A5] text-[11px] font-bold text-[#DC2626] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              OVERFLOW (V = 1)
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-[#DCFCE7] border border-[#86EFAC] text-[11px] font-bold text-[#166534] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              VALID SUM (V = 0)
            </span>
          )}
        </div>
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="text-[11px] text-[#64748B] border-b border-[#E2E8F0]">
              <th className="py-1 px-2 text-left font-normal text-[#94A3B8]">Row</th>
              <th className="py-1 px-2 text-center text-[#DC2626] font-bold">C8 (Out)</th>
              <th className="py-1 px-2 text-center bg-[#FEF3C7] text-[#92400E] font-bold rounded-t-lg">b7 (Sign)</th>
              <th className="py-1 px-2 text-center font-semibold">b6</th>
              <th className="py-1 px-2 text-center font-semibold">b5</th>
              <th className="py-1 px-2 text-center font-semibold">b4</th>
              <th className="py-1 px-2 text-center font-semibold">b3</th>
              <th className="py-1 px-2 text-center font-semibold">b2</th>
              <th className="py-1 px-2 text-center font-semibold">b1</th>
              <th className="py-1 px-2 text-center font-semibold">b0</th>
              <th className="py-1 px-3 text-right font-semibold text-[#1E293B]">Decimal Base 10</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* Carry In Row */}
            <tr className="text-xs text-[#D97706] bg-[#FFFBEB]">
              <td className="py-1.5 px-2 text-left text-[11px] font-bold text-[#B45309]">Carry In (C)</td>
              <td className="py-1.5 px-2 font-bold text-[#DC2626]">
                {coutFromSign === "1" ? (
                  <span className="px-1.5 py-0.5 rounded bg-[#FEE2E2] border border-[#FCA5A5] text-[#DC2626]">
                    1
                  </span>
                ) : (
                  <span className="text-[#94A3B8]">0</span>
                )}
              </td>
              {carryBits.map((cb, idx) => (
                <td key={idx} className={`py-1.5 px-2 font-bold ${idx === 0 ? "bg-[#FEF3C7] text-[#B45309]" : ""}`}>
                  {cb === "1" ? (
                    <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E]">
                      1
                    </span>
                  ) : (
                    <span className="text-[#CBD5E1]">0</span>
                  )}
                </td>
              ))}
              <td className="py-1.5 px-3 text-right text-[11px] text-[#94A3B8]">Cin row</td>
            </tr>

            {/* Augend A */}
            <tr className="hover:bg-[#FAF8F5]">
              <td className="py-2 px-2 text-left text-xs font-semibold text-[#475569]">Augend (A)</td>
              <td className="py-2 px-2 text-slate-300"> </td>
              {aBits.map((b, idx) => (
                <td key={idx} className={`py-2 px-2 font-black ${idx === 0 ? "bg-[#FEF3C7] text-[#92400E]" : "text-[#1E293B]"}`}>
                  {b}
                </td>
              ))}
              <td className="py-2 px-3 text-right font-bold text-[#1E293B]">{model.aDec}</td>
            </tr>

            {/* Addend B */}
            <tr className="hover:bg-[#FAF8F5] border-b-2 border-[#1E293B]">
              <td className="py-2 px-2 text-left text-xs font-semibold text-[#475569]">Addend (B)</td>
              <td className="py-2 px-2 text-slate-300">+</td>
              {bBits.map((b, idx) => (
                <td key={idx} className={`py-2 px-2 font-black ${idx === 0 ? "bg-[#FEF3C7] text-[#92400E]" : "text-[#1E293B]"}`}>
                  {b}
                </td>
              ))}
              <td className="py-2 px-3 text-right font-bold text-[#1E293B]">{model.bDec}</td>
            </tr>

            {/* Sum Row */}
            <tr className="bg-[#FAF8F5] font-black text-base">
              <td className="py-2.5 px-2 text-left text-xs font-bold text-[#2E6F40]">Sum Result</td>
              <td className="py-2.5 px-2 text-xs">
                {coutFromSign === "1" ? (
                  <span className="px-1.5 py-0.5 rounded bg-[#FEE2E2] text-[#DC2626] font-bold line-through border border-[#FCA5A5]" title="Discarded Carry C8">
                    1
                  </span>
                ) : (
                  <span className="text-[#94A3B8]">0</span>
                )}
              </td>
              {sumBits.map((b, idx) => (
                <td key={idx} className={`py-2.5 px-2 ${idx === 0 ? "bg-[#FEF3C7] text-[#92400E]" : "text-[#1E293B]"}`}>
                  <span className={`inline-block w-7 h-7 leading-7 rounded-md ${
                    idx === 0 
                      ? "bg-[#FDE68A] text-[#92400E] border border-[#F59E0B]" 
                      : b === "1" 
                      ? "bg-[#DCFCE7] text-[#15803D]" 
                      : "bg-white text-[#64748B] border border-[#E2E8F0]"
                  }`}>
                    {b}
                  </span>
                </td>
              ))}
              <td className="py-2.5 px-3 text-right font-black text-[#2E6F40] text-base">
                {model.sumDec}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Discarded Carry & Hardware Flags Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {/* Discarded Carry Explanation */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1 text-xs">
          <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#2E6F40]" />
            Carry-Out C8 Behavior:
          </span>
          <p className="text-[#475569] leading-relaxed">
            {model.discardCarry}
          </p>
        </div>

        {/* Hardware Flag Registers */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1.5 text-xs">
          <span className="font-bold text-[#1E293B] block">
            Hardware Status Flags:
          </span>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-1.5 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[#64748B] block text-[10px]">Cin to b7</span>
              <span className="font-bold text-[#1E293B]">C7 = {cinToSign}</span>
            </div>
            <div className="p-1.5 rounded-lg bg-white border border-[#DCE7E1]">
              <span className="text-[#64748B] block text-[10px]">Cout of b7</span>
              <span className="font-bold text-[#1E293B]">C8 = {coutFromSign}</span>
            </div>
            <div className={`p-1.5 rounded-lg border ${
              model.overflow ? "bg-[#FEE2E2] border-[#FCA5A5] text-[#DC2626]" : "bg-[#DCFCE7] border-[#86EFAC] text-[#15803D]"
            }`}>
              <span className="block text-[10px]">V = C7 ⊕ C8</span>
              <span className="font-bold">V = {xorFlag}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Second Base-10 Verification Bar */}
      {model.verification && (
        <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 text-xs text-[#166534]">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
          <div>
            <strong className="font-bold">5-Second Base-10 Verification: </strong>
            <span>{model.verification}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Hardware Overflow Detector Diagram (SVG XOR Schematic)
export const OverflowDetectorDiagram = () => {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#FEF3C7] border border-[#FCD34D] flex items-center justify-center text-[#D97706]">
            <Cpu className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
              Silicon Overflow Hardware Detector: V = Cin ⊕ Cout
            </h3>
            <span className="text-[11px] text-[#64748B]">
              MSB Stage (Bit 7 Full Adder) Connected to 2-Input XOR Gate
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[10px] font-bold text-[#2E6F40]">
          CPU Hardware Architecture
        </span>
      </div>

      {/* SVG Diagram */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex justify-center">
        <svg viewBox="0 0 620 220" className="w-full max-w-[620px] h-auto select-none">
          {/* Definitions */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
            </marker>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
            </marker>
          </defs>

          {/* Full Adder Stage Box (b7) */}
          <rect x="180" y="40" width="160" height="130" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <text x="260" y="70" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="bold">MSB Full Adder</text>
          <text x="260" y="88" textAnchor="middle" fill="#D97706" fontSize="11" fontWeight="bold">Bit 7 Stage (Sign Bit)</text>

          {/* Inputs A7 and B7 */}
          <line x1="220" y1="5" x2="220" y2="40" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="220" y="0" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="bold">A7</text>

          <line x1="290" y1="5" x2="290" y2="40" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="290" y="0" textAnchor="middle" fill="#1E293B" fontSize="11" fontWeight="bold">B7</text>

          {/* Carry-In from b6 stage: C7 (Cin) */}
          <line x1="390" y1="110" x2="340" y2="110" stroke="#2563EB" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="400" y="105" textAnchor="start" fill="#2563EB" fontSize="11" fontWeight="bold">Cin (C7)</text>
          <text x="400" y="122" textAnchor="start" fill="#64748B" fontSize="9">from Bit 6</text>

          {/* Sum S7 Output downwards */}
          <line x1="260" y1="170" x2="260" y2="205" stroke="#16A34A" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="260" y="218" textAnchor="middle" fill="#16A34A" fontSize="11" fontWeight="bold">Sum Bit S7 (Sign)</text>

          {/* Carry-Out to the left: C8 (Cout) */}
          <line x1="180" y1="110" x2="90" y2="110" stroke="#DC2626" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
          <text x="75" y="105" textAnchor="end" fill="#DC2626" fontSize="11" fontWeight="bold">Cout (C8)</text>
          <text x="75" y="122" textAnchor="end" fill="#94A3B8" fontSize="9">Discarded Carry</text>

          {/* Branch from Cin (C7) into XOR Gate */}
          {/* Point 1 on Cin line: (370, 110) -> down to y=150 -> down to y=160 -> x=460 -> y=125 */}
          <circle cx="365" cy="110" r="3.5" fill="#2563EB" />
          <path d="M 365 110 L 365 160 L 460 160 L 460 125" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="3,3" />

          {/* Branch from Cout (C8) into XOR Gate */}
          <circle cx="130" cy="110" r="3.5" fill="#DC2626" />
          <path d="M 130 110 L 130 180 L 480 180 L 480 95" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="3,3" />

          {/* XOR Gate Symbol */}
          {/* Position XOR at x=470..540, y=85..135 */}
          <g transform="translate(480, 85)">
            {/* Input arc */}
            <path d="M 0 5 Q 12 25 0 45" fill="none" stroke="#4F46E5" strokeWidth="2" />
            <path d="M 5 5 Q 17 25 5 45 Q 35 45 45 25 Q 35 5 5 5 Z" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2" />
            <text x="22" y="29" textAnchor="middle" fill="#4F46E5" fontSize="10" fontWeight="black">XOR</text>
            {/* Output line */}
            <line x1="45" y1="25" x2="80" y2="25" stroke="#7C3AED" strokeWidth="2.5" markerEnd="url(#arrow)" />
          </g>

          {/* V Output Flag */}
          <rect x="565" y="95" width="50" height="30" rx="6" fill="#FDF4FF" stroke="#A855F7" strokeWidth="1.5" />
          <text x="590" y="115" textAnchor="middle" fill="#7E22CE" fontSize="12" fontWeight="black">V Flag</text>
        </svg>
      </div>

      {/* Truth Table for V = Cin ⊕ Cout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1E293B]">Cin = 0, Cout = 0</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">V = 0</span>
          </div>
          <p className="text-[11px] text-[#475569]">No carry in, no carry out. Result is valid.</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#991B1B]">Cin = 1, Cout = 0</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FEE2E2] text-[#DC2626]">V = 1</span>
          </div>
          <p className="text-[11px] text-[#7F1D1D]">Positive Overflow! Two positives sum into sign bit.</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#991B1B]">Cin = 0, Cout = 1</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FEE2E2] text-[#DC2626]">V = 1</span>
          </div>
          <p className="text-[11px] text-[#7F1D1D]">Negative Overflow! Sum drops below -128.</p>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1E293B]">Cin = 1, Cout = 1</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">V = 0</span>
          </div>
          <p className="text-[11px] text-[#475569]">Valid negative sum. Cout = 1 is safely discarded.</p>
        </div>
      </div>
    </div>
  );
};

// 4. Sign-Bit Extension Visualizer (Replicating MSB)
export const SignExtensionVisualizer = ({
  originalBits = "1011",
  originalVal = "-5",
  extendedBits = "11111011",
  extendedVal = "-5"
}) => {
  const origArr = originalBits.split("");
  const extArr = extendedBits.split("");
  const newPositionsCount = extArr.length - origArr.length;

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#4F46E5]" />
          Sign-Bit Extension Architecture ({origArr.length}-Bit to {extArr.length}-Bit)
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
          Replicate the MSB
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original k-Bit Register */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#1E293B]">Original {origArr.length}-Bit Register</span>
            <span className="font-bold text-[#D97706]">Value: {originalVal}</span>
          </div>
          <div className="flex gap-1.5 justify-center py-2">
            {origArr.map((b, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm border-2 ${
                  i === 0
                    ? "bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]"
                    : "bg-white border-[#CBD5E1] text-[#1E293B]"
                }`}
              >
                {b}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-[#64748B] text-center block">
            MSB Sign Bit = {origArr[0]} ({origArr[0] === "1" ? "Negative" : "Positive"})
          </span>
        </div>

        {/* Extended n-Bit Register */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#1E293B]">Extended {extArr.length}-Bit Register</span>
            <span className="font-bold text-[#15803D]">Value: {extendedVal} (Preserved!)</span>
          </div>
          <div className="flex gap-1.5 justify-center py-2 flex-wrap">
            {extArr.map((b, i) => {
              const isPadded = i < newPositionsCount;
              return (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm border-2 ${
                    isPadded
                      ? "bg-[#EEF2FF] border-[#6366F1] text-[#4338CA] animate-pulse"
                      : i === newPositionsCount
                      ? "bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]"
                      : "bg-white border-[#CBD5E1] text-[#1E293B]"
                  }`}
                  title={isPadded ? "Padded Sign Replica" : "Original Bit"}
                >
                  {b}
                </div>
              );
            })}
          </div>
          <span className="text-[11px] text-[#4338CA] text-center block font-semibold">
            Left {newPositionsCount} bits copied from original MSB ({origArr[0]})
          </span>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] space-y-1">
        <strong className="block">Why Sign Extension Preserves Value Mathematically:</strong>
        <p className="leading-relaxed">
          For negative numbers, padding three 1s adds weights -128 + 64 + 32 + 16 = -16, which exactly matches and offsets the former 4-bit MSB weight (-16). The total value remains strictly identical!
        </p>
      </div>
    </div>
  );
};

// 5. Master 4-Bit Comparison Table (+7 to -8)
export const FourBitMasterTable = ({ tableData = [] }) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#15803D]">
            <Hash className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
              Master 4-Bit Signed Comparison Matrix (+7 down to -8)
            </h3>
            <span className="text-[11px] text-[#64748B]">
              Side-by-side analysis of all 16 binary patterns across all three forms
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF8F5] text-[#2E6F40] border border-[#DCE7E1]">
          4-Bit Nibble Standard
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAF8F5] text-[#475569] border-b border-[#CBD5E1]">
              <th className="py-2.5 px-3 text-left font-bold">Decimal</th>
              <th className="py-2.5 px-3 font-bold">Binary Pattern</th>
              <th className="py-2.5 px-3 font-bold">Sign-Magnitude</th>
              <th className="py-2.5 px-3 font-bold">Signed 1's Comp</th>
              <th className="py-2.5 px-3 font-bold bg-[#FEF3C7] text-[#92400E]">Signed 2's Comp (CPU)</th>
              <th className="py-2.5 px-3 text-left font-bold">Silicon Architectural Insight</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => {
              const isPositive = !row.decimal.startsWith("-");
              const isZero = row.decimal.includes("0");
              const isAsymmetricMin = row.decimal.includes("-8");

              return (
                <tr 
                  key={idx}
                  className={`border-b border-[#F1F5F9] hover:bg-[#FAF8F5] transition-colors ${
                    isZero ? "bg-[#FEFCE8]" : isAsymmetricMin ? "bg-[#EFF6FF]" : ""
                  }`}
                >
                  <td className="py-2 px-3 text-left font-black text-[#1E293B]">
                    {row.decimal}
                  </td>
                  <td className="py-2 px-3 font-mono font-bold text-[#475569]">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#CBD5E1]">
                      {row.pattern}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-semibold text-[#334155]">
                    {row.signMag}
                  </td>
                  <td className="py-2 px-3 font-semibold text-[#334155]">
                    {row.onesComp}
                  </td>
                  <td className="py-2 px-3 font-bold bg-[#FEF3C7] text-[#92400E]">
                    {row.twosComp}
                  </td>
                  <td className="py-2 px-3 text-left text-[11px] text-[#64748B]">
                    {row.note}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-wrap items-center justify-between gap-3 text-xs text-[#475569]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-[#FEFCE8] border border-[#FDE047]" />
          <span>Yellow: Dual-Zero representations in Sign-Mag and 1's Comp</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-[#EFF6FF] border border-[#93C5FD]" />
          <span>Blue: Unique -8 gained by 2's Complement</span>
        </div>
      </div>
    </div>
  );
};

// 6. Classroom Flowchart 3-Steps for Signed Representation
export const ClassroomFlowchart3StepsSigned = ({ 
  stageData = {
    title: "Stage 2: The Standard Classroom Method",
    steps: []
  }
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[#4F46E5]">
            <BookOpen className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
              {stageData.title || "The Standard Classroom Method"}
            </h3>
            <span className="text-[11px] text-[#64748B]">
              Sequential 3-step conversion algorithm taught in computer engineering lectures
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF8F5] text-[#2E6F40] border border-[#DCE7E1]">
          Classroom Standard
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stageData.steps && stageData.steps.map((st, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-lg bg-[#2E6F40] text-white flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <span className="text-[10px] font-bold uppercase text-[#64748B]">
                {st.step}
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#1E293B] pt-1">{st.title}</h4>
            <p className="text-[11px] text-[#475569] leading-relaxed">{st.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
