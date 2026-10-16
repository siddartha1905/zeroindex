import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Zap, 
  Layers, 
  Lightbulb, 
  Sliders, 
  Power, 
  Activity, 
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';

/**
 * Standard IEEE / ANSI Gate Symbols in pure scalable SVG
 * Supports live input wire colors and live output wire colors.
 */
export const GateSymbolSvg = ({ 
  gateId, 
  inputA = 0, 
  inputB = 0, 
  outputY = null, 
  width = 160, 
  height = 90, 
  showPinLabels = true,
  className = "" 
}) => {
  // If outputY is not provided, evaluate it based on standard truth rules
  let calculatedY = outputY;
  if (calculatedY === null || calculatedY === undefined) {
    if (gateId === "NOT") calculatedY = inputA === 0 ? 1 : 0;
    else if (gateId === "AND") calculatedY = (inputA === 1 && inputB === 1) ? 1 : 0;
    else if (gateId === "OR") calculatedY = (inputA === 1 || inputB === 1) ? 1 : 0;
    else if (gateId === "NAND") calculatedY = !(inputA === 1 && inputB === 1) ? 1 : 0;
    else if (gateId === "NOR") calculatedY = (inputA === 0 && inputB === 0) ? 1 : 0;
    else if (gateId === "XOR") calculatedY = (inputA !== inputB) ? 1 : 0;
    else if (gateId === "XNOR") calculatedY = (inputA === inputB) ? 1 : 0;
    else calculatedY = 0;
  }

  const wireAColor = inputA === 1 ? "#10B981" : "#64748B";
  const wireBColor = inputB === 1 ? "#10B981" : "#64748B";
  const wireYColor = calculatedY === 1 ? "#10B981" : "#64748B";
  const strokeWidth = 2.5;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 160 90" 
        style={{ width: `${width}px`, height: `${height}px` }}
        className="overflow-visible select-none"
      >
        <defs>
          <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ==================== NOT GATE ==================== */}
        {gateId === "NOT" && (
          <g>
            {/* Input wire A */}
            <line x1="15" y1="45" x2="45" y2="45" stroke={wireAColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="45" r="3" fill={wireAColor} />
            {showPinLabels && (
              <text x="8" y="42" fontSize="10" fill={wireAColor} fontWeight="bold" fontFamily="monospace">A={inputA}</text>
            )}

            {/* Triangle Body */}
            <polygon 
              points="45,20 105,45 45,70" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinejoin="round" 
            />

            {/* Inversion Bubble */}
            <circle 
              cx="112" 
              cy="45" 
              r="6.5" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
            />

            {/* Output wire Y */}
            <line x1="119" y1="45" x2="150" y2="45" stroke={wireYColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="150" cy="45" r="3" fill={wireYColor} />
            {showPinLabels && (
              <text x="132" y="38" fontSize="10" fill={wireYColor} fontWeight="bold" fontFamily="monospace">Y={calculatedY}</text>
            )}
          </g>
        )}

        {/* ==================== AND GATE ==================== */}
        {gateId === "AND" && (
          <g>
            {/* Input wires A and B */}
            <line x1="15" y1="30" x2="45" y2="30" stroke={wireAColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="30" r="3" fill={wireAColor} />
            {showPinLabels && (
              <text x="6" y="27" fontSize="10" fill={wireAColor} fontWeight="bold" fontFamily="monospace">A={inputA}</text>
            )}

            <line x1="15" y1="60" x2="45" y2="60" stroke={wireBColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="60" r="3" fill={wireBColor} />
            {showPinLabels && (
              <text x="6" y="72" fontSize="10" fill={wireBColor} fontWeight="bold" fontFamily="monospace">B={inputB}</text>
            )}

            {/* AND Shape: Flat back + Semicircular front */}
            <path 
              d="M 45 15 L 85 15 A 30 30 0 0 1 85 75 L 45 75 Z" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinejoin="round" 
            />

            {/* Output wire Y */}
            <line x1="115" y1="45" x2="150" y2="45" stroke={wireYColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="150" cy="45" r="3" fill={wireYColor} />
            {showPinLabels && (
              <text x="132" y="38" fontSize="10" fill={wireYColor} fontWeight="bold" fontFamily="monospace">Y={calculatedY}</text>
            )}
          </g>
        )}

        {/* ==================== OR GATE ==================== */}
        {gateId === "OR" && (
          <g>
            {/* Input wires A and B */}
            <line x1="15" y1="30" x2="48" y2="30" stroke={wireAColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="30" r="3" fill={wireAColor} />
            {showPinLabels && (
              <text x="6" y="27" fontSize="10" fill={wireAColor} fontWeight="bold" fontFamily="monospace">A={inputA}</text>
            )}

            <line x1="15" y1="60" x2="48" y2="60" stroke={wireBColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="60" r="3" fill={wireBColor} />
            {showPinLabels && (
              <text x="6" y="72" fontSize="10" fill={wireBColor} fontWeight="bold" fontFamily="monospace">B={inputB}</text>
            )}

            {/* OR Shape: Curved back and curved convergence to point */}
            <path 
              d="M 40 15 Q 60 45 40 75 Q 85 75 115 45 Q 85 15 40 15 Z" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinejoin="round" 
            />

            {/* Output wire Y */}
            <line x1="115" y1="45" x2="150" y2="45" stroke={wireYColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="150" cy="45" r="3" fill={wireYColor} />
            {showPinLabels && (
              <text x="132" y="38" fontSize="10" fill={wireYColor} fontWeight="bold" fontFamily="monospace">Y={calculatedY}</text>
            )}
          </g>
        )}

        {/* ==================== NAND GATE ==================== */}
        {gateId === "NAND" && (
          <g>
            {/* Input wires A and B */}
            <line x1="15" y1="30" x2="42" y2="30" stroke={wireAColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="30" r="3" fill={wireAColor} />
            {showPinLabels && (
              <text x="6" y="27" fontSize="10" fill={wireAColor} fontWeight="bold" fontFamily="monospace">A={inputA}</text>
            )}

            <line x1="15" y1="60" x2="42" y2="60" stroke={wireBColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="60" r="3" fill={wireBColor} />
            {showPinLabels && (
              <text x="6" y="72" fontSize="10" fill={wireBColor} fontWeight="bold" fontFamily="monospace">B={inputB}</text>
            )}

            {/* AND Body */}
            <path 
              d="M 42 15 L 78 15 A 30 30 0 0 1 78 75 L 42 75 Z" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinejoin="round" 
            />

            {/* Inversion Bubble */}
            <circle 
              cx="114" 
              cy="45" 
              r="6" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
            />

            {/* Output wire Y */}
            <line x1="120" y1="45" x2="150" y2="45" stroke={wireYColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="150" cy="45" r="3" fill={wireYColor} />
            {showPinLabels && (
              <text x="132" y="38" fontSize="10" fill={wireYColor} fontWeight="bold" fontFamily="monospace">Y={calculatedY}</text>
            )}
          </g>
        )}

        {/* ==================== NOR GATE ==================== */}
        {gateId === "NOR" && (
          <g>
            {/* Input wires A and B */}
            <line x1="15" y1="30" x2="44" y2="30" stroke={wireAColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="30" r="3" fill={wireAColor} />
            {showPinLabels && (
              <text x="6" y="27" fontSize="10" fill={wireAColor} fontWeight="bold" fontFamily="monospace">A={inputA}</text>
            )}

            <line x1="15" y1="60" x2="44" y2="60" stroke={wireBColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="60" r="3" fill={wireBColor} />
            {showPinLabels && (
              <text x="6" y="72" fontSize="10" fill={wireBColor} fontWeight="bold" fontFamily="monospace">B={inputB}</text>
            )}

            {/* OR Body */}
            <path 
              d="M 38 15 Q 58 45 38 75 Q 80 75 108 45 Q 80 15 38 15 Z" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinejoin="round" 
            />

            {/* Inversion Bubble */}
            <circle 
              cx="114" 
              cy="45" 
              r="6" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
            />

            {/* Output wire Y */}
            <line x1="120" y1="45" x2="150" y2="45" stroke={wireYColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="150" cy="45" r="3" fill={wireYColor} />
            {showPinLabels && (
              <text x="132" y="38" fontSize="10" fill={wireYColor} fontWeight="bold" fontFamily="monospace">Y={calculatedY}</text>
            )}
          </g>
        )}

        {/* ==================== XOR GATE ==================== */}
        {gateId === "XOR" && (
          <g>
            {/* Input wires A and B */}
            <line x1="15" y1="30" x2="35" y2="30" stroke={wireAColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="30" r="3" fill={wireAColor} />
            {showPinLabels && (
              <text x="6" y="27" fontSize="10" fill={wireAColor} fontWeight="bold" fontFamily="monospace">A={inputA}</text>
            )}

            <line x1="15" y1="60" x2="35" y2="60" stroke={wireBColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="60" r="3" fill={wireBColor} />
            {showPinLabels && (
              <text x="6" y="72" fontSize="10" fill={wireBColor} fontWeight="bold" fontFamily="monospace">B={inputB}</text>
            )}

            {/* Double Curved Back (Exclusive arc) */}
            <path 
              d="M 32 15 Q 52 45 32 75" 
              fill="none" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinecap="round" 
            />

            {/* Main OR Body */}
            <path 
              d="M 40 15 Q 60 45 40 75 Q 85 75 115 45 Q 85 15 40 15 Z" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinejoin="round" 
            />

            {/* Output wire Y */}
            <line x1="115" y1="45" x2="150" y2="45" stroke={wireYColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="150" cy="45" r="3" fill={wireYColor} />
            {showPinLabels && (
              <text x="132" y="38" fontSize="10" fill={wireYColor} fontWeight="bold" fontFamily="monospace">Y={calculatedY}</text>
            )}
          </g>
        )}

        {/* ==================== XNOR GATE ==================== */}
        {gateId === "XNOR" && (
          <g>
            {/* Input wires A and B */}
            <line x1="15" y1="30" x2="32" y2="30" stroke={wireAColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="30" r="3" fill={wireAColor} />
            {showPinLabels && (
              <text x="6" y="27" fontSize="10" fill={wireAColor} fontWeight="bold" fontFamily="monospace">A={inputA}</text>
            )}

            <line x1="15" y1="60" x2="32" y2="60" stroke={wireBColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="15" cy="60" r="3" fill={wireBColor} />
            {showPinLabels && (
              <text x="6" y="72" fontSize="10" fill={wireBColor} fontWeight="bold" fontFamily="monospace">B={inputB}</text>
            )}

            {/* Double Curved Back (Exclusive arc) */}
            <path 
              d="M 30 15 Q 50 45 30 75" 
              fill="none" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinecap="round" 
            />

            {/* Main OR Body */}
            <path 
              d="M 38 15 Q 58 45 38 75 Q 80 75 108 45 Q 80 15 38 15 Z" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
              strokeLinejoin="round" 
            />

            {/* Inversion Bubble */}
            <circle 
              cx="114" 
              cy="45" 
              r="6" 
              fill="#FAF8F5" 
              stroke="#1E293B" 
              strokeWidth={strokeWidth} 
            />

            {/* Output wire Y */}
            <line x1="120" y1="45" x2="150" y2="45" stroke={wireYColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <circle cx="150" cy="45" r="3" fill={wireYColor} />
            {showPinLabels && (
              <text x="132" y="38" fontSize="10" fill={wireYColor} fontWeight="bold" fontFamily="monospace">Y={calculatedY}</text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};


/**
 * Interactive Live 7-Gate Workbench Component (<LiveGateExplorer />)
 * Allows toggling Input A: [0/1] and Input B: [0/1] and renders all 7 logic gates with live outputs.
 */
export const LiveGateExplorer = ({ gates = [] }) => {
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(0);

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
      {/* Workbench Header & Interactive Toggles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DCE7E1]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#2E6F40]/10 text-[#2E6F40]">
              <Sliders className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-[#1E293B]">
              Interactive Live 7-Gate Silicon Workbench
            </h3>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Toggle Input A and Input B below. Observe how all 7 physical gate circuits respond instantaneously.
          </p>
        </div>

        {/* Global Input Toggle Switches */}
        <div className="flex items-center gap-4 bg-[#FAF8F5] p-3 rounded-xl border border-[#DCE7E1]">
          {/* Toggle A */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#1E293B]">Input A:</span>
            <div className="inline-flex rounded-lg bg-white p-1 border border-[#DCE7E1] shadow-2xs">
              <button
                onClick={() => setInputA(0)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                  inputA === 0 
                    ? "bg-[#64748B] text-white shadow-2xs" 
                    : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                0 (LOW)
              </button>
              <button
                onClick={() => setInputA(1)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                  inputA === 1 
                    ? "bg-[#10B981] text-white shadow-sm" 
                    : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                1 (HIGH)
              </button>
            </div>
          </div>

          <div className="w-[1px] h-6 bg-[#DCE7E1]" />

          {/* Toggle B */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#1E293B]">Input B:</span>
            <div className="inline-flex rounded-lg bg-white p-1 border border-[#DCE7E1] shadow-2xs">
              <button
                onClick={() => setInputB(0)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                  inputB === 0 
                    ? "bg-[#64748B] text-white shadow-2xs" 
                    : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                0 (LOW)
              </button>
              <button
                onClick={() => setInputB(1)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                  inputB === 1 
                    ? "bg-[#10B981] text-white shadow-sm" 
                    : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                1 (HIGH)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All 7 Logic Gates */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {gates.map((gate) => {
          const out = gate.evalFn(inputA, inputB);
          const isHigh = out === 1;
          const familyColor = 
            gate.family === "Basic" ? "#2E6F40" :
            gate.family === "Universal" ? "#4F46E5" : "#D97706";

          return (
            <div 
              key={gate.id} 
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isHigh 
                  ? "bg-[#FAFDFB] border-[#10B981]/50 shadow-sm ring-1 ring-[#10B981]/20" 
                  : "bg-[#FAF8F5] border-[#DCE7E1]"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: familyColor }} 
                    />
                    <h4 className="text-xs font-bold text-[#1E293B]">{gate.name}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] block mt-0.5">{gate.ic}</span>
                </div>
                <span 
                  className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded"
                  style={{ 
                    backgroundColor: `${familyColor}15`, 
                    color: familyColor 
                  }}
                >
                  {gate.family}
                </span>
              </div>

              {/* Scalable SVG Gate Symbol with Live Signals */}
              <div className="py-2 flex items-center justify-center">
                <GateSymbolSvg 
                  gateId={gate.id} 
                  inputA={inputA} 
                  inputB={inputB} 
                  outputY={out} 
                  width={140} 
                  height={80} 
                />
              </div>

              {/* Boolean Equation */}
              <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] text-center">
                <span className="text-[11px] font-mono font-bold text-[#1E293B]">
                  {gate.expression}
                </span>
              </div>

              {/* Glowing Output Badge */}
              <div className="mt-3 pt-3 border-t border-[#DCE7E1] space-y-2">
                <div className={`p-2.5 rounded-lg flex items-center justify-between font-mono text-xs font-bold transition-all ${
                  isHigh 
                    ? "bg-[#10B981] text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]" 
                    : "bg-[#E2E8F0] text-[#475569]"
                }`}>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isHigh ? "bg-white animate-pulse" : "bg-[#94A3B8]"}`} />
                    <span>Output Y</span>
                  </span>
                  <span className="text-sm">
                    {isHigh ? "= 1 (HIGH / +5V)" : "= 0 (LOW / 0V)"}
                  </span>
                </div>

                {/* Behavioral Explanation Snippet */}
                <p className="text-[10px] text-[#64748B] leading-relaxed italic">
                  {gate.reasonFn(inputA, inputB)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


/**
 * Electrical Switch & Lamp Equivalent Circuit Component (<SwitchEquivalentCircuit />)
 * Interactive inline SVG simulating the mechanical switch circuits for:
 * - AND: Series switches
 * - OR: Parallel switches
 * - NOT: Shunt switch across lamp
 */
export const SwitchEquivalentCircuit = ({ type = "series" }) => {
  const [swA, setSwA] = useState(type === "shunt" ? 0 : 1);
  const [swB, setSwB] = useState(1);

  // Compute lamp state
  let lampOn = false;
  if (type === "series") {
    // Both switches must be closed
    lampOn = swA === 1 && swB === 1;
  } else if (type === "parallel") {
    // Either switch closed
    lampOn = swA === 1 || swB === 1;
  } else if (type === "shunt") {
    // When switch is open (0), lamp is ON; when closed (1), shorts lamp OFF
    lampOn = swA === 0;
  }

  return (
    <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
      {/* Circuit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#DCE7E1]">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#D97706]" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B]">
            {type === "series" && "Series Switches Equivalent (AND Gate)"}
            {type === "parallel" && "Parallel Switches Equivalent (OR Gate)"}
            {type === "shunt" && "Shunt (Bypass) Switch Equivalent (NOT Gate)"}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#64748B]">Click switches to toggle:</span>
          <button
            onClick={() => setSwA(prev => prev === 1 ? 0 : 1)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
              swA === 1 ? "bg-[#2E6F40] text-white" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
            }`}
          >
            Switch A: {swA === 1 ? "CLOSED (1)" : "OPEN (0)"}
          </button>
          {type !== "shunt" && (
            <button
              onClick={() => setSwB(prev => prev === 1 ? 0 : 1)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                swB === 1 ? "bg-[#2E6F40] text-white" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
              }`}
            >
              Switch B: {swB === 1 ? "CLOSED (1)" : "OPEN (0)"}
            </button>
          )}
        </div>
      </div>

      {/* Inline Scalable SVG Circuit Diagram */}
      <div className="flex items-center justify-center p-2 bg-[#FAF8F5] rounded-xl border border-[#DCE7E1]">
        <svg viewBox="0 0 460 160" className="w-full max-w-lg h-40 overflow-visible select-none">
          <defs>
            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* DC Battery Symbol on the Left */}
          <g transform="translate(30, 80)">
            <line x1="0" y1="-35" x2="0" y2="35" stroke="#1E293B" strokeWidth="2.5" />
            {/* Battery Plates */}
            <line x1="-15" y1="-15" x2="15" y2="-15" stroke="#1E293B" strokeWidth="3" />
            <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#1E293B" strokeWidth="2" />
            <line x1="-15" y1="5" x2="15" y2="5" stroke="#1E293B" strokeWidth="3" />
            <line x1="-8" y1="15" x2="8" y2="15" stroke="#1E293B" strokeWidth="2" />
            <text x="-30" y="-12" fontSize="9" fontWeight="bold" fill="#2E6F40">+5V</text>
            <text x="-25" y="20" fontSize="9" fontWeight="bold" fill="#64748B">GND</text>
          </g>

          {/* Bottom Return Wire (Ground) */}
          <line x1="30" y1="115" x2="400" y2="115" stroke="#64748B" strokeWidth="2" />

          {/* Top Positive Wire from Battery */}
          <line x1="30" y1="45" x2="80" y2="45" stroke="#2E6F40" strokeWidth="2" />

          {/* ================= SERIES SWITCHES (AND) ================= */}
          {type === "series" && (
            <g>
              {/* Switch A Terminal Left */}
              <circle cx="80" cy="45" r="3.5" fill="#1E293B" />
              <text x="75" y="25" fontSize="10" fontWeight="bold" fill="#1E293B">Switch A</text>
              {/* Switch A Contact Blade */}
              {swA === 1 ? (
                <line x1="80" y1="45" x2="140" y2="45" stroke="#10B981" strokeWidth="2.5" />
              ) : (
                <line x1="80" y1="45" x2="135" y2="25" stroke="#EF4444" strokeWidth="2.5" />
              )}
              {/* Switch A Terminal Right */}
              <circle cx="140" cy="45" r="3.5" fill="#1E293B" />

              {/* Connecting wire between A and B */}
              <line x1="140" y1="45" x2="200" y2="45" stroke={swA === 1 ? "#10B981" : "#64748B"} strokeWidth="2" />

              {/* Switch B Terminal Left */}
              <circle cx="200" cy="45" r="3.5" fill="#1E293B" />
              <text x="195" y="25" fontSize="10" fontWeight="bold" fill="#1E293B">Switch B</text>
              {/* Switch B Contact Blade */}
              {swB === 1 ? (
                <line x1="200" y1="45" x2="260" y2="45" stroke={swA === 1 ? "#10B981" : "#64748B"} strokeWidth="2.5" />
              ) : (
                <line x1="200" y1="45" x2="255" y2="25" stroke="#EF4444" strokeWidth="2.5" />
              )}
              {/* Switch B Terminal Right */}
              <circle cx="260" cy="45" r="3.5" fill="#1E293B" />

              {/* Wire to Lamp */}
              <line x1="260" y1="45" x2="400" y2="45" stroke={lampOn ? "#10B981" : "#64748B"} strokeWidth="2" />
            </g>
          )}

          {/* ================= PARALLEL SWITCHES (OR) ================= */}
          {type === "parallel" && (
            <g>
              {/* Splitting node */}
              <line x1="80" y1="45" x2="110" y2="45" stroke="#2E6F40" strokeWidth="2" />
              <circle cx="110" cy="45" r="3.5" fill="#1E293B" />
              {/* Vertical Branch up and down */}
              <line x1="110" y1="25" x2="110" y2="65" stroke="#1E293B" strokeWidth="2" />

              {/* Top Branch: Switch A */}
              <line x1="110" y1="25" x2="140" y2="25" stroke="#1E293B" strokeWidth="2" />
              <circle cx="140" cy="25" r="3" fill="#1E293B" />
              <text x="145" y="12" fontSize="9" fontWeight="bold" fill="#1E293B">Switch A</text>
              {swA === 1 ? (
                <line x1="140" y1="25" x2="200" y2="25" stroke="#10B981" strokeWidth="2.5" />
              ) : (
                <line x1="140" y1="25" x2="195" y2="10" stroke="#EF4444" strokeWidth="2.5" />
              )}
              <circle cx="200" cy="25" r="3" fill="#1E293B" />
              <line x1="200" y1="25" x2="230" y2="25" stroke={swA === 1 ? "#10B981" : "#64748B"} strokeWidth="2" />

              {/* Bottom Branch: Switch B */}
              <line x1="110" y1="65" x2="140" y2="65" stroke="#1E293B" strokeWidth="2" />
              <circle cx="140" cy="65" r="3" fill="#1E293B" />
              <text x="145" y="82" fontSize="9" fontWeight="bold" fill="#1E293B">Switch B</text>
              {swB === 1 ? (
                <line x1="140" y1="65" x2="200" y2="65" stroke="#10B981" strokeWidth="2.5" />
              ) : (
                <line x1="140" y1="65" x2="195" y2="50" stroke="#EF4444" strokeWidth="2.5" />
              )}
              <circle cx="200" cy="65" r="3" fill="#1E293B" />
              <line x1="200" y1="65" x2="230" y2="65" stroke={swB === 1 ? "#10B981" : "#64748B"} strokeWidth="2" />

              {/* Recombining node */}
              <line x1="230" y1="25" x2="230" y2="65" stroke="#1E293B" strokeWidth="2" />
              <circle cx="230" cy="45" r="3.5" fill="#1E293B" />
              <line x1="230" y1="45" x2="400" y2="45" stroke={lampOn ? "#10B981" : "#64748B"} strokeWidth="2" />
            </g>
          )}

          {/* ================= SHUNT SWITCH (NOT) ================= */}
          {type === "shunt" && (
            <g>
              {/* Series Resistor R */}
              <line x1="80" y1="45" x2="120" y2="45" stroke="#2E6F40" strokeWidth="2" />
              {/* Resistor zig-zag */}
              <path d="M 120 45 L 125 35 L 135 55 L 145 35 L 155 55 L 165 35 L 170 45" fill="none" stroke="#1E293B" strokeWidth="2" />
              <text x="135" y="25" fontSize="9" fontWeight="bold" fill="#1E293B">R (330Ω)</text>
              <line x1="170" y1="45" x2="220" y2="45" stroke="#2E6F40" strokeWidth="2" />

              {/* Shunt node */}
              <circle cx="220" cy="45" r="3.5" fill="#1E293B" />

              {/* Vertical Shunt Branch to Ground with Switch A */}
              <line x1="220" y1="45" x2="220" y2="65" stroke="#1E293B" strokeWidth="2" />
              <circle cx="220" cy="65" r="3" fill="#1E293B" />
              <text x="235" y="80" fontSize="9" fontWeight="bold" fill="#1E293B">Shunt Sw A</text>
              {swA === 1 ? (
                <line x1="220" y1="65" x2="220" y2="105" stroke="#10B981" strokeWidth="2.5" />
              ) : (
                <line x1="220" y1="65" x2="240" y2="90" stroke="#EF4444" strokeWidth="2.5" />
              )}
              <circle cx="220" cy="105" r="3" fill="#1E293B" />
              <line x1="220" y1="105" x2="220" y2="115" stroke="#64748B" strokeWidth="2" />
              <circle cx="220" cy="115" r="3" fill="#64748B" />

              {/* Wire continuing to Lamp */}
              <line x1="220" y1="45" x2="400" y2="45" stroke={lampOn ? "#10B981" : "#64748B"} strokeWidth="2" />
            </g>
          )}

          {/* Lamp Symbol on the Right */}
          <g transform="translate(400, 80)">
            {/* Upper & Lower Terminal Wires */}
            <line x1="0" y1="-35" x2="0" y2="-18" stroke={lampOn ? "#10B981" : "#64748B"} strokeWidth="2" />
            <line x1="0" y1="18" x2="0" y2="35" stroke="#64748B" strokeWidth="2" />

            {/* Glowing Aura if Lamp is ON */}
            {lampOn && (
              <circle cx="0" cy="0" r="30" fill="url(#lampGlow)" className="animate-pulse" />
            )}

            {/* Bulb Glass Circle */}
            <circle 
              cx="0" 
              cy="0" 
              r="18" 
              fill={lampOn ? "#FEF3C7" : "#F1F5F9"} 
              stroke={lampOn ? "#F59E0B" : "#94A3B8"} 
              strokeWidth="2.5" 
            />

            {/* Filament Cross (X) */}
            <line x1="-10" y1="-10" x2="10" y2="10" stroke={lampOn ? "#D97706" : "#64748B"} strokeWidth="2" />
            <line x1="10" y1="-10" x2="-10" y2="10" stroke={lampOn ? "#D97706" : "#64748B"} strokeWidth="2" />

            <text x="25" y="4" fontSize="10" fontWeight="bold" fill={lampOn ? "#D97706" : "#64748B"}>
              {lampOn ? "LAMP ON (Y=1)" : "LAMP OFF (Y=0)"}
            </text>
          </g>
        </svg>
      </div>

      {/* Explanatory Banner */}
      <div className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2 ${
        lampOn ? "bg-[#F2F7F4] text-[#2E6F40] border border-[#2E6F40]/30" : "bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1]"
      }`}>
        <Lightbulb className={`w-4 h-4 flex-shrink-0 mt-0.5 ${lampOn ? "text-[#F59E0B]" : "text-[#94A3B8]"}`} />
        <div>
          <span className="font-bold">Circuit Condition: </span>
          {type === "series" && (
            lampOn 
              ? "Both switches A and B are CLOSED. Electrical current has an unbroken series path from +5V to the lamp. Lamp illuminates (Output Y = 1)." 
              : "At least one switch is OPEN. The series circuit is broken. Current cannot flow, so the lamp remains dark (Output Y = 0)."
          )}
          {type === "parallel" && (
            lampOn 
              ? "At least one switch is CLOSED. Current bypasses any open switch through the parallel branch to the lamp. Lamp illuminates (Output Y = 1)." 
              : "Both switches A and B are OPEN. There is no conductive path to the lamp. Lamp remains dark (Output Y = 0)."
          )}
          {type === "shunt" && (
            lampOn 
              ? "Switch A is OPEN. The bypass path is non-conductive, so all current flows through resistor R to the lamp. Lamp illuminates (Output Y = 1)." 
              : "Switch A is CLOSED. It provides a 0-ohm direct path to ground, bypassing and starving the lamp of current. Lamp turns OFF (Output Y = 0)."
          )}
        </div>
      </div>
    </div>
  );
};


/**
 * Truth Table Renderer Component (<GateTruthTable />)
 * Supports 2-input and 3-input truth tables with active row highlighting based on inputs.
 */
export const GateTruthTable = ({ 
  rows = [], 
  inputs = 2, 
  activeA = null, 
  activeB = null, 
  activeC = null,
  title = "Truth Table"
}) => {
  return (
    <div className="overflow-hidden border border-[#DCE7E1] rounded-xl bg-white shadow-2xs">
      <div className="p-3 bg-[#FAF8F5] border-b border-[#DCE7E1] flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B]">
          {title} ({inputs}-Input)
        </span>
        <span className="text-[10px] font-mono text-[#64748B]">
          Total Rows: {rows.length} (2^{inputs})
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-center border-collapse font-mono">
          <thead>
            <tr className="bg-[#F2F7F4] border-b border-[#DCE7E1]">
              <th className="py-2 px-3 font-bold text-[#1E293B]">A</th>
              {inputs >= 2 && <th className="py-2 px-3 font-bold text-[#1E293B]">B</th>}
              {inputs >= 3 && <th className="py-2 px-3 font-bold text-[#1E293B]">C</th>}
              <th className="py-2 px-4 font-bold text-[#2E6F40]">Output Y</th>
              <th className="py-2 px-3 font-bold text-[#64748B] text-left">Behavioral State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F7F4]">
            {rows.map((r, idx) => {
              const matchesActive = 
                (activeA === null || r.a === activeA) &&
                (inputs < 2 || activeB === null || r.b === activeB) &&
                (inputs < 3 || activeC === null || r.c === activeC);

              const isHigh = r.y === 1 || r.y === "1";

              return (
                <tr 
                  key={idx} 
                  className={`transition-colors ${
                    matchesActive && (activeA !== null || activeB !== null)
                      ? "bg-[#DCE7E1]/50 font-bold" 
                      : isHigh ? "bg-[#FAFDFB]" : "hover:bg-[#FAF8F5]/60"
                  }`}
                >
                  <td className="py-2 px-3 text-[#1E293B]">{r.a}</td>
                  {inputs >= 2 && <td className="py-2 px-3 text-[#1E293B]">{r.b}</td>}
                  {inputs >= 3 && <td className="py-2 px-3 text-[#1E293B]">{r.c}</td>}
                  <td className="py-2 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded font-bold ${
                      isHigh 
                        ? "bg-[#10B981] text-white shadow-2xs" 
                        : "bg-[#E2E8F0] text-[#475569]"
                    }`}>
                      {r.y}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-left text-[11px] text-[#64748B] font-sans">
                    {r.state || (isHigh ? "Output is HIGH (1)" : "Output is LOW (0)")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};


/**
 * Timing Waveform Viewer Component (<TimingWaveformViewer />)
 * Step-by-step graphical waveform guide with interactive gate selector.
 */
export const TimingWaveformViewer = ({ intervals = [] }) => {
  const [selectedGate, setSelectedGate] = useState("AND");

  const gateKeys = [
    { id: "AND", label: "AND Gate" },
    { id: "OR", label: "OR Gate" },
    { id: "NOT", label: "NOT Gate (A)" },
    { id: "NAND", label: "NAND Gate" },
    { id: "NOR", label: "NOR Gate" },
    { id: "XOR", label: "XOR Gate" },
    { id: "XNOR", label: "XNOR Gate" }
  ];

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
      {/* Header and Gate Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#DCE7E1]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5]">
              <Activity className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-[#1E293B]">
              Interactive Timing Pulse Waveform Analyzer
            </h3>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Compare synchronized digital clock waveforms across discrete time slices (t1 to t4).
          </p>
        </div>

        {/* Gate Selector Pills */}
        <div className="flex flex-wrap gap-1 bg-[#FAF8F5] p-1.5 rounded-xl border border-[#DCE7E1]">
          {gateKeys.map(gk => (
            <button
              key={gk.id}
              onClick={() => setSelectedGate(gk.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedGate === gk.id 
                  ? "bg-[#4F46E5] text-white shadow-xs" 
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              {gk.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Waveform Timing Diagram */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] overflow-x-auto">
        <svg viewBox="0 0 600 240" className="w-full min-w-[550px] h-60 overflow-visible select-none font-mono">
          {/* Vertical Time Slice Guidelines */}
          <line x1="120" y1="20" x2="120" y2="210" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="230" y1="20" x2="230" y2="210" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="340" y1="20" x2="340" y2="210" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="450" y1="20" x2="450" y2="210" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="560" y1="20" x2="560" y2="210" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />

          {/* Time Slot Labels */}
          <text x="175" y="15" fontSize="10" fontWeight="bold" fill="#64748B" textAnchor="middle">t1: (A=0, B=0)</text>
          <text x="285" y="15" fontSize="10" fontWeight="bold" fill="#64748B" textAnchor="middle">t2: (A=0, B=1)</text>
          <text x="395" y="15" fontSize="10" fontWeight="bold" fill="#64748B" textAnchor="middle">t3: (A=1, B=0)</text>
          <text x="505" y="15" fontSize="10" fontWeight="bold" fill="#64748B" textAnchor="middle">t4: (A=1, B=1)</text>

          {/* ================= TRACK 1: INPUT A ================= */}
          <g transform="translate(0, 40)">
            <text x="20" y="22" fontSize="11" fontWeight="bold" fill="#1E293B">Input A</text>
            <text x="80" y="12" fontSize="9" fill="#94A3B8">1 (+5V)</text>
            <text x="80" y="32" fontSize="9" fill="#94A3B8">0 (0V)</text>
            {/* Waveform: t1: 0, t2: 0, t3: 1, t4: 1 */}
            <path 
              d="M 120 30 L 230 30 L 340 30 L 340 10 L 450 10 L 560 10" 
              fill="none" 
              stroke="#2E6F40" 
              strokeWidth="2.5" 
            />
          </g>

          {/* ================= TRACK 2: INPUT B ================= */}
          <g transform="translate(0, 100)">
            <text x="20" y="22" fontSize="11" fontWeight="bold" fill="#1E293B">Input B</text>
            <text x="80" y="12" fontSize="9" fill="#94A3B8">1 (+5V)</text>
            <text x="80" y="32" fontSize="9" fill="#94A3B8">0 (0V)</text>
            {/* Waveform: t1: 0, t2: 1, t3: 0, t4: 1 */}
            <path 
              d="M 120 30 L 230 30 L 230 10 L 340 10 L 340 30 L 450 30 L 450 10 L 560 10" 
              fill="none" 
              stroke="#0284C7" 
              strokeWidth="2.5" 
            />
          </g>

          {/* ================= TRACK 3: SELECTED GATE OUTPUT Y ================= */}
          <g transform="translate(0, 160)">
            <rect x="15" y="-5" width="100" height="42" rx="6" fill="#EEF2FF" />
            <text x="22" y="15" fontSize="10" fontWeight="bold" fill="#4F46E5">Output Y</text>
            <text x="22" y="28" fontSize="9" fontWeight="bold" fill="#1E293B">({selectedGate})</text>
            <text x="80" y="12" fontSize="9" fill="#94A3B8">1 (+5V)</text>
            <text x="80" y="32" fontSize="9" fill="#94A3B8">0 (0V)</text>

            {/* Dynamic Waveform Path depending on selectedGate */}
            {selectedGate === "AND" && (
              // t1: 0, t2: 0, t3: 0, t4: 1
              <path d="M 120 30 L 230 30 L 340 30 L 450 30 L 450 10 L 560 10" fill="none" stroke="#4F46E5" strokeWidth="3" />
            )}
            {selectedGate === "OR" && (
              // t1: 0, t2: 1, t3: 1, t4: 1
              <path d="M 120 30 L 230 30 L 230 10 L 340 10 L 450 10 L 560 10" fill="none" stroke="#4F46E5" strokeWidth="3" />
            )}
            {selectedGate === "NOT" && (
              // t1: 1, t2: 1, t3: 0, t4: 0 (Invert A)
              <path d="M 120 10 L 230 10 L 340 10 L 340 30 L 450 30 L 560 30" fill="none" stroke="#4F46E5" strokeWidth="3" />
            )}
            {selectedGate === "NAND" && (
              // t1: 1, t2: 1, t3: 1, t4: 0
              <path d="M 120 10 L 230 10 L 340 10 L 450 10 L 450 30 L 560 30" fill="none" stroke="#4F46E5" strokeWidth="3" />
            )}
            {selectedGate === "NOR" && (
              // t1: 1, t2: 0, t3: 0, t4: 0
              <path d="M 120 10 L 230 10 L 230 30 L 340 30 L 450 30 L 560 30" fill="none" stroke="#4F46E5" strokeWidth="3" />
            )}
            {selectedGate === "XOR" && (
              // t1: 0, t2: 1, t3: 1, t4: 0
              <path d="M 120 30 L 230 30 L 230 10 L 340 10 L 450 10 L 450 30 L 560 30" fill="none" stroke="#4F46E5" strokeWidth="3" />
            )}
            {selectedGate === "XNOR" && (
              // t1: 1, t2: 0, t3: 0, t4: 1
              <path d="M 120 10 L 230 10 L 230 30 L 340 30 L 450 30 L 450 10 L 560 10" fill="none" stroke="#4F46E5" strokeWidth="3" />
            )}
          </g>
        </svg>
      </div>

      {/* Interval Values Table */}
      <div className="overflow-x-auto border border-[#DCE7E1] rounded-xl">
        <table className="w-full text-xs text-center border-collapse font-mono">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#DCE7E1]">
              <th className="py-2.5 px-3 font-bold text-[#1E293B]">Time Interval</th>
              <th className="py-2.5 px-3 font-bold text-[#2E6F40]">Input A</th>
              <th className="py-2.5 px-3 font-bold text-[#0284C7]">Input B</th>
              <th className="py-2.5 px-3 font-bold text-[#1E293B]">NOT(A)</th>
              <th className="py-2.5 px-3 font-bold text-[#1E293B]">AND</th>
              <th className="py-2.5 px-3 font-bold text-[#1E293B]">OR</th>
              <th className="py-2.5 px-3 font-bold text-[#4F46E5]">NAND</th>
              <th className="py-2.5 px-3 font-bold text-[#4F46E5]">NOR</th>
              <th className="py-2.5 px-3 font-bold text-[#D97706]">XOR</th>
              <th className="py-2.5 px-3 font-bold text-[#D97706]">XNOR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F7F4]">
            {intervals.map((it, idx) => (
              <tr key={idx} className="hover:bg-[#FAF8F5]/60">
                <td className="py-2 px-3 font-bold text-[#1E293B]">{it.slot} ({it.duration})</td>
                <td className="py-2 px-3 font-bold text-[#2E6F40]">{it.a}</td>
                <td className="py-2 px-3 font-bold text-[#0284C7]">{it.b}</td>
                <td className="py-2 px-3">{it.notA}</td>
                <td className={`py-2 px-3 font-bold ${it.and === 1 ? "text-[#10B981]" : "text-[#94A3B8]"}`}>{it.and}</td>
                <td className={`py-2 px-3 font-bold ${it.or === 1 ? "text-[#10B981]" : "text-[#94A3B8]"}`}>{it.or}</td>
                <td className={`py-2 px-3 font-bold ${it.nand === 1 ? "text-[#10B981]" : "text-[#94A3B8]"}`}>{it.nand}</td>
                <td className={`py-2 px-3 font-bold ${it.nor === 1 ? "text-[#10B981]" : "text-[#94A3B8]"}`}>{it.nor}</td>
                <td className={`py-2 px-3 font-bold ${it.xor === 1 ? "text-[#10B981]" : "text-[#94A3B8]"}`}>{it.xor}</td>
                <td className={`py-2 px-3 font-bold ${it.xnor === 1 ? "text-[#10B981]" : "text-[#94A3B8]"}`}>{it.xnor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
