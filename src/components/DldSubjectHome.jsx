import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  Calculator, 
  CheckCircle2, 
  BookOpen, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { dldSyllabus } from '../data/dldSyllabus';

export const DldSubjectHome = ({ onBackToPortal, onOpenWorkspaceTab }) => {
  // Interactive Logic Schematic Circuit Inputs: A, B, C
  const [circuitInputs, setCircuitInputs] = useState({ a: 1, b: 0, c: 1 });
  const [isCoExpanded, setIsCoExpanded] = useState(false);

  // Dynamic Logic Evaluation:
  // P = A AND B
  // Q = B XOR C
  // Y = P OR Q = (A AND B) OR (B XOR C)
  const pVal = circuitInputs.a & circuitInputs.b;
  const qVal = circuitInputs.b ^ circuitInputs.c;
  const yVal = pVal | qVal;

  const toggleInput = (key) => {
    setCircuitInputs(prev => ({
      ...prev,
      [key]: prev[key] === 1 ? 0 : 1
    }));
  };

  const resetInputs = () => {
    setCircuitInputs({ a: 1, b: 0, c: 1 });
  };

  const cards = [
    {
      id: 'units',
      title: 'Course Units (1-5)',
      description: 'Step-by-step classroom notes, derivations, worked models, and cheat sheets across all 5 units.',
      icon: Layers,
      badge: 'Unit 1 Live',
      badgeColor: 'bg-[#2E6F40]/10 text-[#2E6F40] border border-[#2E6F40]/20',
      iconColor: '#2E6F40',
      action: () => onOpenWorkspaceTab('units')
    },
    {
      id: 'solvers',
      title: 'Interactive Visual Solvers',
      description: 'Visual step-by-step base converters, bit-aligned arithmetic grids, and complement subtractors organized by unit.',
      icon: Calculator,
      badge: 'Unit 1-5 Engines',
      badgeColor: 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20',
      iconColor: '#4F46E5',
      action: () => onOpenWorkspaceTab('solvers')
    },
    {
      id: 'practice',
      title: 'Practice Questions & Quizzes',
      description: 'Interactive topic-wise and full-unit mock quizzes with hints, instant grading, and graphical solutions.',
      icon: CheckCircle2,
      badge: 'Unit-Wise Quizzes',
      badgeColor: 'bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20',
      iconColor: '#D97706',
      action: () => onOpenWorkspaceTab('practice')
    },
    {
      id: 'syllabus',
      title: 'Subject Resources',
      description: 'Downloadable Unit Notes PDFs, official VR23 syllabus, Course Outcomes (CO1-CO5), and standard textbooks.',
      icon: BookOpen,
      badge: 'Notes, Syllabus & Books',
      badgeColor: 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20',
      iconColor: '#059669',
      action: () => onOpenWorkspaceTab('syllabus')
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex flex-col justify-between py-6 px-4 sm:px-8 select-none">
      
      {/* 1. Top Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between pb-4 border-b border-[#DCE7E1]">
        {/* Left: Back Button */}
        <button
          onClick={onBackToPortal}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#DCE7E1] bg-white hover:bg-[#F2F7F4] text-xs font-semibold text-[#1E293B] transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#2E6F40]" />
          <span>ZeroIndex Portal</span>
        </button>

        {/* Right: Course Code & Semester Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCE7E1] text-[11px] font-mono text-[#64748B] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
          <span>Course Code: 1005261102 · I Year, I Semester (CSE-DS)</span>
        </div>
      </header>

      {/* 2. Main Centered Content */}
      <main className="max-w-4xl w-full mx-auto my-auto py-8 sm:py-10 flex flex-col items-center text-center space-y-8">
        
        {/* Fixed Interactive Digital Logic Schematic SVG */}
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#DCE7E1] shadow-soft p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F2F7F4] px-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2E6F40] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E6F40] animate-pulse" />
              Interactive Logic Circuit Schematic: Y = (A · B) + (B ⊕ C)
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">
              Click wire terminals or toggle buttons below to test live gate synthesis
            </span>
          </div>

          <div className="relative w-full overflow-hidden flex justify-center">
            <svg 
              viewBox="0 0 720 200" 
              className="w-full h-auto select-none" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="dld-grid-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="#DCE7E1" />
                </pattern>
                <filter id="emerald-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Grid */}
              <rect x="4" y="4" width="712" height="192" rx="12" fill="#FAF8F5" stroke="#DCE7E1" strokeWidth="1" />
              <rect x="4" y="4" width="712" height="192" rx="12" fill="url(#dld-grid-dots)" />

              {/* ================= INPUT WIRES (A, B, C) ================= */}
              
              {/* Wire A */}
              <g 
                onClick={() => toggleInput('a')} 
                className="cursor-pointer group"
                aria-label="Toggle Input A"
              >
                <rect x="18" y="28" width="68" height="28" rx="6" fill={circuitInputs.a === 1 ? "#ECFDF5" : "#F1F5F9"} stroke={circuitInputs.a === 1 ? "#10B981" : "#CBD5E1"} strokeWidth="1.5" />
                <text x="52" y="46" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="bold" fill={circuitInputs.a === 1 ? "#065F46" : "#475569"}>
                  A = {circuitInputs.a}
                </text>
                <circle cx="86" cy="42" r="3.5" fill={circuitInputs.a === 1 ? "#10B981" : "#94A3B8"} />
              </g>
              <path 
                d="M 86 42 L 180 42" 
                stroke={circuitInputs.a === 1 ? "#10B981" : "#94A3B8"} 
                strokeWidth={circuitInputs.a === 1 ? "2.5" : "1.8"} 
                strokeLinecap="round" 
              />

              {/* Wire B */}
              <g 
                onClick={() => toggleInput('b')} 
                className="cursor-pointer group"
                aria-label="Toggle Input B"
              >
                <rect x="18" y="86" width="68" height="28" rx="6" fill={circuitInputs.b === 1 ? "#ECFDF5" : "#F1F5F9"} stroke={circuitInputs.b === 1 ? "#10B981" : "#CBD5E1"} strokeWidth="1.5" />
                <text x="52" y="104" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="bold" fill={circuitInputs.b === 1 ? "#065F46" : "#475569"}>
                  B = {circuitInputs.b}
                </text>
                <circle cx="86" cy="100" r="3.5" fill={circuitInputs.b === 1 ? "#10B981" : "#94A3B8"} />
              </g>
              {/* Wire B branch to AND and XOR */}
              <path 
                d="M 86 100 L 130 100" 
                stroke={circuitInputs.b === 1 ? "#10B981" : "#94A3B8"} 
                strokeWidth={circuitInputs.b === 1 ? "2.5" : "1.8"} 
                strokeLinecap="round" 
              />
              <circle cx="130" cy="100" r="3.5" fill={circuitInputs.b === 1 ? "#10B981" : "#475569"} />
              {/* Branch to AND input 2 */}
              <path 
                d="M 130 100 L 130 62 L 180 62" 
                stroke={circuitInputs.b === 1 ? "#10B981" : "#94A3B8"} 
                strokeWidth={circuitInputs.b === 1 ? "2.5" : "1.8"} 
                strokeLinecap="round" 
              />
              {/* Branch to XOR input 1 */}
              <path 
                d="M 130 100 L 130 138 L 180 138" 
                stroke={circuitInputs.b === 1 ? "#10B981" : "#94A3B8"} 
                strokeWidth={circuitInputs.b === 1 ? "2.5" : "1.8"} 
                strokeLinecap="round" 
              />

              {/* Wire C */}
              <g 
                onClick={() => toggleInput('c')} 
                className="cursor-pointer group"
                aria-label="Toggle Input C"
              >
                <rect x="18" y="144" width="68" height="28" rx="6" fill={circuitInputs.c === 1 ? "#ECFDF5" : "#F1F5F9"} stroke={circuitInputs.c === 1 ? "#10B981" : "#CBD5E1"} strokeWidth="1.5" />
                <text x="52" y="162" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="bold" fill={circuitInputs.c === 1 ? "#065F46" : "#475569"}>
                  C = {circuitInputs.c}
                </text>
                <circle cx="86" cy="158" r="3.5" fill={circuitInputs.c === 1 ? "#10B981" : "#94A3B8"} />
              </g>
              <path 
                d="M 86 158 L 180 158" 
                stroke={circuitInputs.c === 1 ? "#10B981" : "#94A3B8"} 
                strokeWidth={circuitInputs.c === 1 ? "2.5" : "1.8"} 
                strokeLinecap="round" 
              />

              {/* ================= GATE 1: AND GATE ================= */}
              <g transform="translate(180, 30)">
                <path d="M 0 0 L 26 0 C 44 0, 44 44, 26 44 L 0 44 Z" stroke="#1E293B" strokeWidth="2.2" fill="#FFFFFF" strokeLinejoin="round" />
                <text x="14" y="27" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#1E293B" fontWeight="bold">AND</text>
              </g>

              {/* Wire P out of AND Gate: P = A · B */}
              <path 
                d="M 226 52 L 350 52 C 375 52, 375 84, 400 84" 
                stroke={pVal === 1 ? "#10B981" : "#94A3B8"} 
                strokeWidth={pVal === 1 ? "2.5" : "1.8"} 
                strokeLinecap="round" 
              />
              {/* Badge for Wire P */}
              <g transform="translate(242, 38)">
                <rect x="0" y="0" width="102" height="20" rx="5" fill="#FFFFFF" stroke="#DCE7E1" strokeWidth="1" />
                <text x="51" y="14" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={pVal === 1 ? "#065F46" : "#64748B"}>
                  P = A · B = {pVal}
                </text>
              </g>

              {/* ================= GATE 2: XOR GATE ================= */}
              <g transform="translate(180, 126)">
                {/* Curved input line */}
                <path d="M -6 0 C 4 14, 4 30, -6 44" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* XOR body */}
                <path d="M 0 0 C 10 14, 10 30, 0 44 C 22 42, 40 34, 48 22 C 40 10, 22 2, 0 0 Z" stroke="#1E293B" strokeWidth="2.2" fill="#FFFFFF" />
                <text x="13" y="27" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#1E293B" fontWeight="bold">XOR</text>
              </g>

              {/* Wire Q out of XOR Gate: Q = B ⊕ C */}
              <path 
                d="M 230 148 L 350 148 C 375 148, 375 116, 400 116" 
                stroke={qVal === 1 ? "#10B981" : "#94A3B8"} 
                strokeWidth={qVal === 1 ? "2.5" : "1.8"} 
                strokeLinecap="round" 
              />
              {/* Badge for Wire Q */}
              <g transform="translate(242, 142)">
                <rect x="0" y="0" width="102" height="20" rx="5" fill="#FFFFFF" stroke="#DCE7E1" strokeWidth="1" />
                <text x="51" y="14" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={qVal === 1 ? "#065F46" : "#64748B"}>
                  Q = B ⊕ C = {qVal}
                </text>
              </g>

              {/* ================= GATE 3: OR GATE ================= */}
              <g transform="translate(400, 75)">
                <path d="M 0 0 C 10 16, 10 34, 0 50 C 22 48, 42 40, 52 25 C 42 10, 22 2, 0 0 Z" stroke="#1E293B" strokeWidth="2.2" fill="#FFFFFF" />
                <text x="16" y="30" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="#1E293B" fontWeight="bold">OR</text>
              </g>

              {/* Wire Y out of OR Gate to LED */}
              <path 
                d="M 452 100 L 490 100" 
                stroke={yVal === 1 ? "#10B981" : "#94A3B8"} 
                strokeWidth={yVal === 1 ? "3" : "2"} 
                strokeLinecap="round" 
              />

              {/* ================= GLOWING EMERALD LED INDICATOR BOX ================= */}
              <g transform="translate(490, 68)">
                {/* Container Box */}
                <rect 
                  x="0" 
                  y="0" 
                  width="216" 
                  height="64" 
                  rx="10" 
                  fill={yVal === 1 ? "#ECFDF5" : "#F8FAFC"} 
                  stroke={yVal === 1 ? "#10B981" : "#CBD5E1"} 
                  strokeWidth="2" 
                  filter={yVal === 1 ? "url(#emerald-glow)" : "none"}
                />

                {/* Glowing Circular LED Bulb */}
                <circle 
                  cx="26" 
                  cy="32" 
                  r="14" 
                  fill={yVal === 1 ? "#10B981" : "#94A3B8"} 
                  stroke={yVal === 1 ? "#047857" : "#64748B"} 
                  strokeWidth="2" 
                />
                <circle 
                  cx="26" 
                  cy="32" 
                  r="7" 
                  fill={yVal === 1 ? "#A7F3D0" : "#CBD5E1"} 
                />

                {/* Non-overlapping Text Labels */}
                <text 
                  x="48" 
                  y="26" 
                  fontFamily="'JetBrains Mono', monospace" 
                  fontSize="9.5" 
                  fontWeight="bold" 
                  fill={yVal === 1 ? "#065F46" : "#475569"}
                >
                  OUTPUT Y = P + Q
                </text>
                
                <text 
                  x="48" 
                  y="42" 
                  fontFamily="'JetBrains Mono', monospace" 
                  fontSize="9" 
                  fontWeight="600" 
                  fill={yVal === 1 ? "#047857" : "#64748B"}
                >
                  Y = (A·B) + (B⊕C)
                </text>

                <text 
                  x="48" 
                  y="55" 
                  fontFamily="'JetBrains Mono', monospace" 
                  fontSize="10" 
                  fontWeight="bold" 
                  fill={yVal === 1 ? "#065F46" : "#334155"}
                >
                  = {yVal} {yVal === 1 ? "(HIGH)" : "(LOW)"}
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Toggle Control Bar Below Schematic */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F2F7F4] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#64748B] text-[11px] font-semibold hidden sm:inline">Toggle Inputs:</span>
              <button
                onClick={() => toggleInput('a')}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all ${
                  circuitInputs.a === 1 
                    ? "bg-[#2E6F40] text-white border-[#2E6F40]" 
                    : "bg-white text-[#64748B] border-[#DCE7E1] hover:border-[#2E6F40]"
                }`}
              >
                A: {circuitInputs.a}
              </button>
              <button
                onClick={() => toggleInput('b')}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all ${
                  circuitInputs.b === 1 
                    ? "bg-[#2E6F40] text-white border-[#2E6F40]" 
                    : "bg-white text-[#64748B] border-[#DCE7E1] hover:border-[#2E6F40]"
                }`}
              >
                B: {circuitInputs.b}
              </button>
              <button
                onClick={() => toggleInput('c')}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all ${
                  circuitInputs.c === 1 
                    ? "bg-[#2E6F40] text-white border-[#2E6F40]" 
                    : "bg-white text-[#64748B] border-[#DCE7E1] hover:border-[#2E6F40]"
                }`}
              >
                C: {circuitInputs.c}
              </button>
            </div>

            <button
              onClick={resetInputs}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#DCE7E1] bg-white text-[#64748B] hover:text-[#1E293B] text-[11px] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Schematic</span>
            </button>
          </div>
        </div>

        {/* Hero Subject Title & Quote */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">
            Digital Logic Design
          </h1>
          <p className="font-handwritten text-xl sm:text-2xl text-[#334155] leading-relaxed">
            "Everything in Data Science, from a single integer in memory to an AI model, begins with a 0 and a 1."
          </p>
        </div>

        {/* The 4 Core DLD Portal Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl text-left">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={c.action}
                className="group p-5 rounded-2xl bg-white border border-[#DCE7E1] hover:border-[#2E6F40] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-center group-hover:scale-105 transition-transform" 
                      style={{ color: c.iconColor }}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#1E293B] group-hover:text-[#2E6F40] transition-colors mb-1.5">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#F2F7F4] flex items-center justify-between text-xs font-semibold text-[#2E6F40]">
                  <span>Open Section</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Course Outcomes (CO1 to CO5) Horizontal Reference Card */}
        <div className="w-full max-w-3xl bg-white rounded-2xl border border-[#DCE7E1] shadow-2xs p-4 sm:p-5 text-left space-y-3">
          <div 
            onClick={() => setIsCoExpanded(!isCoExpanded)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2E6F40]" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E293B]">
                Prescribed Course Outcomes (CO1 - CO5)
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-mono">
              <span className="hidden sm:inline">{isCoExpanded ? "Collapse" : "Expand All"}</span>
              {isCoExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>

          {/* Quick horizontal preview strip when collapsed */}
          {!isCoExpanded && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-[11px]">
              {dldSyllabus.outcomes.map((co) => (
                <div key={co.code} className="p-2 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1]">
                  <span className="font-bold text-[#2E6F40] block">{co.code}</span>
                  <span className="text-[10px] text-[#64748B] truncate block">{co.targetUnit}</span>
                </div>
              ))}
            </div>
          )}

          {/* Expanded full details */}
          {isCoExpanded && (
            <div className="pt-2 border-t border-[#F2F7F4] space-y-2">
              {dldSyllabus.outcomes.map((co) => (
                <div key={co.code} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex items-start gap-3">
                  <span className="font-mono font-bold text-xs text-[#2E6F40] bg-white px-2 py-0.5 rounded border border-[#DCE7E1] shrink-0 mt-0.5">
                    {co.code}
                  </span>
                  <div className="flex-1 text-xs text-[#334155] leading-relaxed">
                    <span className="font-medium">{co.description}</span>
                    <span className="font-mono text-[10px] text-[#64748B] block mt-0.5">Target: {co.targetUnit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* 3. Clean Faculty Attribution Footer */}
      <footer className="max-w-5xl w-full mx-auto pt-6 pb-2 border-t border-[#DCE7E1] text-center">
        <p className="text-xs font-mono text-[#64748B]">
          Designed &amp; Curated by J. Siddartha Varma · Assistant Professor, Department of CSE (Data Science), VIIT(A)
        </p>
      </footer>

    </div>
  );
};

export default DldSubjectHome;
