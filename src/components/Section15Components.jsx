import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Cpu, 
  ArrowRight 
} from 'lucide-react';

/**
 * Section 1.5 Graphical Hardware & Complement Components
 * Strict formatting: ZERO em-dashes and ZERO en-dashes.
 */

// Visual Silicon ALU Hardware Comparison (Dual Subtractor vs Unified Parallel Adder)
export const HardwareLogicDiagram = () => (
  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-2">
        <Cpu className="w-4 h-4 text-[#2E6F40]" />
        Silicon Architecture Comparison: Without vs. With Complements
      </span>
      <span className="text-[11px] font-mono text-[#64748B]">Modern CPU ALU Logic Realization</span>
    </div>

    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 760 280" className="w-full min-w-[700px] max-w-[760px] mx-auto" style={{ fontFamily: 'monospace' }}>
        <defs>
          <marker id="hwArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#64748B" />
          </marker>
          <marker id="hwArrGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#16A34A" />
          </marker>
        </defs>

        {/* LEFT PANEL: WITHOUT COMPLEMENTS */}
        <rect x="10" y="10" width="355" height="255" rx="12" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.5" />
        <rect x="25" y="22" width="230" height="24" rx="6" fill="#FEE2E2" />
        <text x="35" y="38" fontSize="10" fontWeight="bold" fill="#DC2626">WITHOUT COMPLEMENTS (DUAL CIRCUITS)</text>

        {/* Inputs A and B */}
        <text x="35" y="70" fontSize="11" fontWeight="bold" fill="#1E293B">Inputs A, B</text>
        <line x1="110" y1="66" x2="150" y2="66" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#hwArr)" />
        <line x1="110" y1="66" x2="130" y2="66" stroke="#64748B" strokeWidth="1.5" />
        <line x1="130" y1="66" x2="130" y2="155" stroke="#64748B" strokeWidth="1.5" />
        <line x1="130" y1="155" x2="150" y2="155" stroke="#64748B" strokeWidth="1.5" markerEnd="url(#hwArr)" />

        {/* Circuit 1: Dedicated Adder */}
        <rect x="150" y="50" width="180" height="42" rx="8" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.5" />
        <text x="240" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E293B">Dedicated Adder</text>
        <text x="240" y="82" textAnchor="middle" fontSize="9" fill="#DC2626">Outputs: Sum A + B</text>

        {/* Circuit 2: Dedicated Subtractor */}
        <rect x="150" y="135" width="180" height="50" rx="8" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.5" />
        <text x="240" y="155" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E293B">Dedicated Subtractor</text>
        <text x="240" y="169" textAnchor="middle" fontSize="9" fill="#DC2626">Multi-Stage Borrow Circuit</text>
        <text x="240" y="180" textAnchor="middle" fontSize="9" fill="#DC2626">Outputs: Diff A - B</text>

        {/* Drawbacks badge */}
        <rect x="25" y="205" width="325" height="48" rx="6" fill="#FFFFFF" stroke="#F87171" strokeWidth="1" strokeDasharray="3 3" />
        <text x="35" y="222" fontSize="9" fontWeight="bold" fill="#DC2626">2x Transistor Count • Double Silicon Die Area</text>
        <text x="35" y="238" fontSize="8.5" fill="#7F1D1D">Borrow rippling is electrically slower than carry propagation</text>

        {/* RIGHT PANEL: WITH COMPLEMENTS */}
        <rect x="390" y="10" width="360" height="255" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
        <rect x="405" y="22" width="250" height="24" rx="6" fill="#DCFCE7" />
        <text x="415" y="38" fontSize="10" fontWeight="bold" fill="#15803D">WITH COMPLEMENTS (UNIFIED ALU ADDER)</text>

        {/* Inputs */}
        <text x="405" y="75" fontSize="11" fontWeight="bold" fill="#1E293B">Input A</text>
        <line x1="460" y1="72" x2="560" y2="72" stroke="#16A34A" strokeWidth="1.5" markerEnd="url(#hwArrGreen)" />

        <text x="405" y="125" fontSize="11" fontWeight="bold" fill="#1E293B">Input B</text>
        <line x1="460" y1="122" x2="480" y2="122" stroke="#16A34A" strokeWidth="1.5" markerEnd="url(#hwArrGreen)" />

        {/* Inverter / XOR Block */}
        <rect x="480" y="105" width="55" height="34" rx="6" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="1.5" />
        <text x="507" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4F46E5">XOR</text>
        <text x="507" y="133" textAnchor="middle" fontSize="7.5" fill="#6366F1">(Inverter)</text>
        <line x1="535" y1="122" x2="560" y2="122" stroke="#16A34A" strokeWidth="1.5" markerEnd="url(#hwArrGreen)" />

        {/* Mode line M */}
        <text x="507" y="80" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#64748B">Sub Mode (M=1)</text>
        <line x1="507" y1="84" x2="507" y2="105" stroke="#4F46E5" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="507" y1="84" x2="620" y2="84" stroke="#4F46E5" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="620" y1="84" x2="620" y2="60" stroke="#4F46E5" strokeWidth="1.2" markerEnd="url(#hwArr)" />
        <text x="620" y="55" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#4F46E5">Cin = 1</text>

        {/* Single Parallel Adder */}
        <rect x="560" y="60" width="160" height="95" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2" />
        <text x="640" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E293B">Single Parallel</text>
        <text x="640" y="106" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E293B">Binary Adder</text>
        <text x="640" y="124" textAnchor="middle" fontSize="9" fill="#15803D">A + (B XOR M) + Cin</text>
        <text x="640" y="140" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803D">= A + B' + 1 = A - B</text>

        {/* Advantages badge */}
        <rect x="405" y="205" width="330" height="48" rx="6" fill="#FFFFFF" stroke="#4ADE80" strokeWidth="1" strokeDasharray="3 3" />
        <text x="415" y="222" fontSize="9" fontWeight="bold" fill="#15803D">100% Unified Hardware • Zero Dedicated Subtractors</text>
        <text x="415" y="238" fontSize="8.5" fill="#166534">Modern Intel, ARM, AMD &amp; Apple Silicon ALUs use this exact architecture</text>
      </svg>
    </div>
  </div>
);

// Dedicated Component for Full-Width Graphical Complement Bit-Alignment Grid
export const ComplementBitGrid = ({
  modelType = "1s",
  conceptTag,
  minuend,
  subtrahend,
  bitWidth,
  paddedM,
  paddedN,
  paddingNote,
  compN,
  columns = [],
  carriesIn = [],
  mBits = [],
  compNBits = [],
  rawSumBits = [],
  cout,
  endAroundCarry,
  discardCarryAction,
  negativeHandling,
  verification
}) => {
  return (
    <div className="space-y-4">
      {/* Equalization and Transformation Strip */}
      <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
          <span className="text-xs font-mono font-bold text-[#1E293B] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
            Step 1 &amp; 2: Bit-Width Equalization &amp; Complement Transformation
          </span>
          {conceptTag && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]">
              {conceptTag}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Minuend M:</span>
              <span className="text-xs text-[#1E293B] font-bold">({minuend})₂</span>
            </div>
            <div className="flex items-center justify-between text-[#1E293B]">
              <span>Padded M ({bitWidth} bits):</span>
              <span className="font-bold text-[#2E6F40]">{paddedM}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Subtrahend N:</span>
              <span className="text-xs text-[#1E293B] font-bold">({subtrahend})₂</span>
            </div>
            <div className="flex items-center justify-between text-[#1E293B]">
              <span>Padded N ({bitWidth} bits):</span>
              <span className="font-bold text-[#D97706]">{paddedN}</span>
            </div>
          </div>
        </div>

        {paddingNote && (
          <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs font-mono text-[#92400E] flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#D97706]" />
            <span>{paddingNote}</span>
          </div>
        )}

        <div className="p-3 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-[#3730A3] font-bold">
            {modelType === "1s" ? "1's Complement" : "2's Complement"} of N:
          </span>
          <span className="px-2 py-0.5 rounded bg-white text-[#4338CA] font-bold border border-[#C7D2FE]">
            {compN}
          </span>
        </div>
      </div>

      {/* Bit-by-Bit Addition Grid */}
      <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
            Step 3: Bit-by-Bit Parallel Addition [ M + Comp(N) ]
          </span>
          <span className="text-[11px] font-mono text-[#64748B]">
            {modelType === "1s" ? "End-Around Carry Logic" : "Discard Carry Logic"}
          </span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="inline-flex flex-col min-w-full">
            {/* Header: Column labels */}
            <div className="flex items-center gap-1.5 pb-1 border-b border-[#DCE7E1]">
              <div className="w-16 sm:w-20 flex-shrink-0 text-right pr-2 text-[10px] font-mono text-[#64748B] font-semibold">Row</div>
              <div className="w-9 sm:w-11 flex-shrink-0 text-center font-mono text-[10px] font-bold text-[#D97706]">C_out</div>
              {columns.map((col, idx) => (
                <div key={idx} className="w-9 sm:w-11 flex-shrink-0 text-center font-mono text-[11px] font-bold text-[#64748B]">
                  {col}
                </div>
              ))}
            </div>

            {/* Carry-In Row */}
            <div className="flex items-center gap-1.5 py-1">
              <div className="w-16 sm:w-20 flex-shrink-0 text-right pr-2 text-[10px] font-mono font-bold text-[#D97706]">Carry-In</div>
              <div className="w-9 sm:w-11 flex-shrink-0 text-center">
                <span className={`inline-flex items-center justify-center w-7 h-6 rounded-md font-mono text-[10px] font-bold ${
                  cout === "1" ? "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]" : "text-[#94A3B8]"
                }`}>
                  {cout}
                </span>
              </div>
              {carriesIn.map((carry, idx) => (
                <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                  {carry === "." ? (
                    <span className="font-mono font-bold text-gray-400">.</span>
                  ) : carry === "1" ? (
                    <span className="inline-flex items-center justify-center w-7 h-6 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] font-mono text-[11px] font-bold">
                      1
                    </span>
                  ) : (
                    <span className="font-mono text-[11px] text-[#94A3B8]">0</span>
                  )}
                </div>
              ))}
            </div>

            {/* Minuend M */}
            <div className="flex items-center gap-1.5 py-1">
              <div className="w-16 sm:w-20 flex-shrink-0 text-right pr-2 text-[10px] font-mono font-semibold text-[#1E293B]">M</div>
              <div className="w-9 sm:w-11 flex-shrink-0" />
              {mBits.map((b, idx) => (
                <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                  {b === "." ? (
                    <span className="font-mono font-black text-sm text-[#1E293B]">.</span>
                  ) : (
                    <div className="w-9 sm:w-11 h-9 sm:h-10 flex items-center justify-center font-mono font-bold text-sm bg-white text-[#1E293B] border border-[#DCE7E1] rounded-xl shadow-2xs">
                      {b}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Complement(N) */}
            <div className="flex items-center gap-1.5 py-1">
              <div className="w-16 sm:w-20 flex-shrink-0 text-right pr-2 text-[10px] font-mono font-semibold text-[#4F46E5]">+ Comp(N)</div>
              <div className="w-9 sm:w-11 flex-shrink-0 text-center font-mono font-black text-[#4F46E5] text-xs">+</div>
              {compNBits.map((b, idx) => (
                <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                  {b === "." ? (
                    <span className="font-mono font-black text-sm text-[#4F46E5]">.</span>
                  ) : (
                    <div className="w-9 sm:w-11 h-9 sm:h-10 flex items-center justify-center font-mono font-bold text-sm bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE] rounded-xl shadow-2xs">
                      {b}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-1 border-b-2 border-[#1E293B] ml-16 max-w-fit" />

            {/* Raw Sum */}
            <div className="flex items-center gap-1.5 py-1">
              <div className="w-16 sm:w-20 flex-shrink-0 text-right pr-2 text-[10px] font-mono font-bold text-[#2E6F40]">Raw Sum S</div>
              <div className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                {cout === "1" ? (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#DCFCE7] text-[#15803D] font-mono font-bold text-xs border border-[#86EFAC]">
                    1
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#F1F5F9] text-[#64748B] font-mono text-xs">
                    0
                  </span>
                )}
              </div>
              {rawSumBits.map((b, idx) => (
                <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                  {b === "." ? (
                    <span className="font-mono font-black text-sm text-[#2E6F40]">.</span>
                  ) : (
                    <div className="w-9 sm:w-11 h-9 sm:h-10 flex items-center justify-center font-mono font-bold text-sm bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC] rounded-xl shadow-2xs">
                      {b}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 1's Complement End-Around Carry Row */}
            {modelType === "1s" && cout === "1" && endAroundCarry && (
              <div className="space-y-1 pt-2 mt-1 border-t border-dashed border-[#DCE7E1]">
                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-16 sm:w-20 flex-shrink-0 text-right pr-2 text-[10px] font-mono font-bold text-[#16A34A]">EAC (+1)</div>
                  <div className="w-9 sm:w-11 flex-shrink-0 text-center">
                    <span className="text-[10px] text-[#64748B] font-mono line-through">1</span>
                  </div>
                  {columns.map((col, idx) => {
                    const isLast = idx === columns.length - 1;
                    return (
                      <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                        {isLast ? (
                          <div className="w-9 sm:w-11 h-8 flex items-center justify-center font-mono font-bold text-xs bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] rounded-lg">
                            +1
                          </div>
                        ) : col === "." ? (
                          <span className="font-mono text-gray-300">.</span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-16 sm:w-20 flex-shrink-0 text-right pr-2 text-[10px] font-mono font-bold text-[#15803D]">Final (+):</div>
                  <div className="w-9 sm:w-11 flex-shrink-0" />
                  {endAroundCarry.eacBits.map((b, idx) => (
                    <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                      {b === "." ? (
                        <span className="font-mono font-black text-sm text-[#15803D]">.</span>
                      ) : (
                        <div className="w-9 sm:w-11 h-9 sm:h-10 flex items-center justify-center font-mono font-black text-sm bg-[#16A34A] text-white rounded-xl shadow-xs">
                          {b}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pl-3 font-mono font-bold text-sm text-[#15803D]">
                    = {endAroundCarry.finalBinary}
                  </div>
                </div>
              </div>
            )}

            {/* 2's Complement Discard Carry Row */}
            {modelType === "2s" && cout === "1" && discardCarryAction && (
              <div className="pt-2 mt-1 border-t border-dashed border-[#DCE7E1]">
                <div className="flex items-center gap-1.5 py-1">
                  <div className="w-16 sm:w-20 flex-shrink-0 text-right pr-2 text-[10px] font-mono font-bold text-[#15803D]">Final (+):</div>
                  <div className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold line-through bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5]">
                      Drop 1
                    </span>
                  </div>
                  {rawSumBits.map((b, idx) => (
                    <div key={idx} className="w-9 sm:w-11 flex-shrink-0 flex items-center justify-center">
                      {b === "." ? (
                        <span className="font-mono font-black text-sm text-[#15803D]">.</span>
                      ) : (
                        <div className="w-9 sm:w-11 h-9 sm:h-10 flex items-center justify-center font-mono font-black text-sm bg-[#16A34A] text-white rounded-xl shadow-xs">
                          {b}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pl-3 font-mono font-bold text-sm text-[#15803D]">
                    = {discardCarryAction.finalBinary}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Negative Handling Card (when cout === "0") */}
        {cout === "0" && negativeHandling && (
          <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] space-y-2 font-mono text-xs text-[#991B1B]">
            <div className="flex items-center gap-2 font-bold text-sm text-[#DC2626]">
              <AlertCircle className="w-4 h-4" />
              <span>{negativeHandling.action}</span>
            </div>
            <p className="text-xs text-[#7F1D1D]">{negativeHandling.step}</p>
            <div className="p-2.5 rounded-lg bg-white border border-[#FECACA] flex items-center justify-between">
              <span className="font-semibold text-[#1E293B]">{negativeHandling.compResult}</span>
              <span className="font-bold text-sm text-[#DC2626]">{negativeHandling.finalBinary}</span>
            </div>
          </div>
        )}
      </div>

      {/* 5-Second Base-10 Verification Bar */}
      {verification && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex flex-wrap items-center justify-between gap-2 shadow-2xs font-mono text-xs text-[#166534]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
            <span className="font-bold">5-Second Base-10 Verification:</span>
            <span>
              {verification.base10Minuend} - {verification.base10Subtrahend} = {verification.base10Diff}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-white text-[#15803D] font-bold border border-[#86EFAC]">
            Exact Binary Value: {verification.binaryValue}
          </span>
        </div>
      )}
    </div>
  );
};

// Dedicated Component for Graphical Decimal (9's & 10's) Subtraction
export const ComplementDecimalGrid = ({
  modelType = "9s",
  conceptTag,
  minuend,
  subtrahend,
  paddedM,
  paddedN,
  paddingNote,
  ninesCompN,
  tensCompN,
  additionGrid,
  eacAddition,
  carryAction,
  negativeHandling,
  verification
}) => {
  return (
    <div className="space-y-4">
      {/* Equalization and Transformation Strip */}
      <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
          <span className="text-xs font-mono font-bold text-[#1E293B] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            Step 1 &amp; 2: Digit Equalization &amp; Decimal Complement of Subtrahend N
          </span>
          {conceptTag && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
              {conceptTag}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Minuend M:</span>
              <span className="font-bold text-[#1E293B]">{minuend}</span>
            </div>
            <div className="flex items-center justify-between text-[#1E293B]">
              <span>Padded M:</span>
              <span className="font-bold text-[#2E6F40]">{paddedM}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Subtrahend N:</span>
              <span className="font-bold text-[#1E293B]">{subtrahend}</span>
            </div>
            <div className="flex items-center justify-between text-[#1E293B]">
              <span>Padded N:</span>
              <span className="font-bold text-[#D97706]">{paddedN}</span>
            </div>
          </div>
        </div>

        {paddingNote && (
          <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-xs font-mono text-[#92400E] flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#D97706]" />
            <span>{paddingNote}</span>
          </div>
        )}

        <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-[#1E293B] font-bold">
            {modelType === "9s" ? "9's Complement" : "10's Complement"} of N ({paddedN}):
          </span>
          <span className="px-2.5 py-1 rounded bg-[#EEF2FF] text-[#4338CA] font-bold border border-[#C7D2FE]">
            {modelType === "9s" ? ninesCompN : tensCompN}
          </span>
        </div>
      </div>

      {/* Addition Grid */}
      {additionGrid && (
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E6F40]" />
              Step 3: Decimal Addition [ M + Comp(N) ]
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">
              {modelType === "9s" ? "End-Around Carry (+1)" : "Discard End Carry"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] max-w-md font-mono text-sm space-y-1.5">
            <div className="flex justify-between items-center text-xs text-[#D97706]">
              <span>Carry row:</span>
              <span>{additionGrid.carries.join(" ")}</span>
            </div>
            <div className="flex justify-between items-center text-[#1E293B] font-bold">
              <span>M:</span>
              <span>{additionGrid.topNumber}</span>
            </div>
            <div className="flex justify-between items-center text-[#4F46E5] font-bold pb-1 border-b-2 border-[#1E293B]">
              <span>+ Comp(N):</span>
              <span>+ {additionGrid.bottomNumber}</span>
            </div>
            <div className="flex justify-between items-center text-[#2E6F40] font-black text-base pt-1">
              <span>Raw Sum:</span>
              <span>{additionGrid.rawSum}</span>
            </div>
          </div>

          {/* End Carry Handling */}
          {modelType === "9s" && additionGrid.endCarry === "1" && eacAddition && (
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] space-y-2 font-mono text-xs text-[#166534]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#15803D]">
                <CheckCircle2 className="w-4 h-4" />
                <span>End-Around Carry = 1 &rarr; Result is POSITIVE (+)</span>
              </div>
              <p>Remove the carry from the MSB and add +1 to the LSB:</p>
              <div className="p-2.5 rounded-lg bg-white border border-[#BBF7D0] flex items-center justify-between text-sm">
                <span>{eacAddition.sum} {eacAddition.addCarry} =</span>
                <span className="font-black text-[#15803D] text-base">{eacAddition.finalResult}</span>
              </div>
            </div>
          )}

          {modelType === "10s" && additionGrid.endCarry === "1" && carryAction && (
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] space-y-2 font-mono text-xs text-[#166534]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#15803D]">
                <CheckCircle2 className="w-4 h-4" />
                <span>{carryAction.rule}</span>
              </div>
              <p>{carryAction.note}</p>
              <div className="p-2.5 rounded-lg bg-white border border-[#BBF7D0] flex items-center justify-between text-sm">
                <span>Final Positive Result:</span>
                <span className="font-black text-[#15803D] text-base">{carryAction.finalResult}</span>
              </div>
            </div>
          )}

          {additionGrid.endCarry === "0" && negativeHandling && (
            <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] space-y-2 font-mono text-xs text-[#991B1B]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#DC2626]">
                <AlertCircle className="w-4 h-4" />
                <span>{negativeHandling.rule}</span>
              </div>
              <p>{negativeHandling.action}</p>
              <div className="p-2.5 rounded-lg bg-white border border-[#FECACA] flex items-center justify-between text-sm">
                <span>{negativeHandling.compStep} &rarr;</span>
                <span className="font-black text-[#DC2626] text-base">{negativeHandling.finalResult}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5-Second Base-10 Verification Bar */}
      {verification && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2.5 shadow-2xs font-mono text-xs text-[#166534]">
          <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0" />
          <div>
            <span className="font-bold mr-1.5">5-Second Base-10 Verification:</span>
            <span>{verification.base10Calculation} (Exact Match)</span>
          </div>
        </div>
      )}
    </div>
  );
};
