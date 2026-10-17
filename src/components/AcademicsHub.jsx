import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  ArrowRight, 
  Cpu, 
  Layers, 
  Calculator, 
  CheckCircle2, 
  BookOpen, 
  Smartphone, 
  Clock, 
  Sparkles, 
  Binary, 
  Check, 
  X, 
  Zap,
  Terminal,
  BrainCircuit,
  Network
} from 'lucide-react';
import { ViitCrest } from './ViitCrest';

export const AcademicsHub = ({ 
  onBackToFlagship, 
  onSelectDld, 
  onSelectRoadmaps, 
  onOpenWorkspaceTab 
}) => {
  // 1. Live Chrono-Pill State
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
  });

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  });

  // 2. Mobile App Install Modal State
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [activeInstallTab, setActiveInstallTab] = useState('android'); // 'android' | 'ios'

  // 3. Right Kinetic CS Artwork: 4-Stage Computing Stack Visualizer
  const [activeLayer, setActiveLayer] = useState(0); // 0: Logic, 1: Systems, 2: DS, 3: Neural
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Auto-cycle through the 4 stages every 5 seconds unless student is interacting
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  // Layer 0: Silicon Gate switches
  const [siliconA, setSiliconA] = useState(1);
  const [siliconB, setSiliconB] = useState(0);
  const andOut = siliconA & siliconB;
  const xorOut = siliconA ^ siliconB;

  // Layer 1: Memory Address Index
  const [memoryIndex, setMemoryIndex] = useState(0);

  // Layer 2: Tree Traversal
  const [traversalStep, setTraversalStep] = useState(0);

  // Layer 3: Neural Forward Pass Pulse
  const [isFiringNeural, setIsFiringNeural] = useState(false);

  const triggerNeuralPulse = () => {
    setIsFiringNeural(true);
    setTimeout(() => setIsFiringNeural(false), 1200);
  };

  const handleLayerClick = (idx) => {
    setActiveLayer(idx);
    setIsAutoCycling(false); // Student took manual control
  };

  const handleLaunchDld = () => {
    if (onSelectDld) onSelectDld();
  };

  const handleOpenTab = (tab) => {
    if (onOpenWorkspaceTab) {
      onOpenWorkspaceTab(tab);
    } else if (onSelectDld) {
      onSelectDld();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex flex-col justify-between selection:bg-[#2E6F40]/20 selection:text-[#2E6F40]">
      
      {/* =========================================================================
          ZONE 1: SLEEK FLOATING GLASS HEADER BAR (WITH BACK BUTTON)
      ========================================================================= */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Back to ZeroIndex Home + Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToFlagship}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
              <span>ZeroIndex Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <span className="font-mono text-xs font-black text-[#2E6F40] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-lg">
                [01]
              </span>
              <span className="font-extrabold text-sm tracking-tight text-[#0F172A]">
                Academics Hub
              </span>
            </div>
          </div>

          {/* Center-Right Utilities: Live Chrono-Pill & Install App Button */}
          <div className="flex items-center gap-2.5">
            
            {/* Compact Live Chrono-Pill */}
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-700 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#2E6F40]" />
              <span>{formattedTime} IST · {formattedDate}</span>
            </div>

            {/* Install as Mobile App Modal Trigger */}
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Install as App</span>
              <span className="sm:hidden">App</span>
            </button>

            {/* Institutional Badge: VIIT(A) */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="flex flex-col text-right hidden lg:flex leading-tight">
                <span className="font-bold text-xs text-[#0F172A]">
                  Vignan's Institute of Information Technology (A)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Autonomous · Visakhapatnam
                </span>
              </div>
              <ViitCrest className="w-8 h-8 flex-shrink-0" />
            </div>

          </div>

        </div>
      </header>

      {/* =========================================================================
          ZONE 2: ASYMMETRIC SPLIT-SCREEN HERO
          Left: High-Contrast Editorial Story & Primary Launch
          Right: Interactive Dark-Mode Kinetic Artwork ("Computing Stack from [0] to AI")
      ========================================================================= */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: Editorial Typography & Primary Launch (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Origin Node Pill */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-200 text-[11px] font-mono font-bold text-emerald-800 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                ORIGIN NODE [0] · DEPT. OF CSE (DATA SCIENCE)
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
                <span className="text-[#059669]">Zero</span>
                <span className="text-[#0F172A]">Index.</span>
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                "Every complex system in computing, from a single logic gate to a neural network, starts at index zero."
              </p>
            </div>

            {/* Single Clean Curator Attribution */}
            <div className="pt-1">
              <p className="text-xs font-mono text-slate-500 font-semibold tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Curated &amp; Engineered by J. Siddartha Varma · Assistant Professor, Dept. of CSE-DS
              </p>
            </div>

            {/* Primary Launch & Quick Action Controls */}
            <div className="space-y-3.5 pt-2">
              <div>
                <button
                  onClick={handleLaunchDld}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-950 hover:bg-[#255A34] text-white text-base font-bold shadow-xl shadow-slate-950/15 hover:shadow-[#2E6F40]/30 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span>Launch Digital Logic Design (1005261102)</span>
                  <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Direct 1-Click Quick Jump Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                <span className="text-slate-400 font-semibold text-[11px]">Direct Jump:</span>
                <button
                  onClick={() => handleOpenTab('solvers')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Interactive Solvers</span>
                </button>
                <button
                  onClick={() => handleOpenTab('practice')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Practice Quiz Arena (110 Qs)</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Dark-Mode Kinetic CS Artwork (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-800 relative overflow-hidden text-left flex flex-col justify-between">
              
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* 4 Interactive Layer Tabs */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400">
                      The Computing Stack: [0] to AI
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500">
                    {isAutoCycling ? "Auto-Cycling (5s)" : "Manual View"}
                  </span>
                </div>

                {/* Layer Selector Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-5 font-mono text-xs">
                  {[
                    { id: 0, label: "[0] Silicon & Logic" },
                    { id: 1, label: "[1] Systems & C" },
                    { id: 2, label: "[2] Data Structures" },
                    { id: 3, label: "[3] Neural & AI" },
                  ].map((layer) => {
                    const isActive = activeLayer === layer.id;
                    return (
                      <button
                        key={layer.id}
                        onClick={() => handleLayerClick(layer.id)}
                        className={`px-2.5 py-1.5 rounded-lg font-bold text-[11px] transition-all text-center cursor-pointer ${
                          isActive
                            ? "bg-emerald-500 text-slate-950 shadow-md font-black"
                            : "bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                        }`}
                      >
                        {layer.label}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Artwork Canvas Display based on active layer */}
                <div className="min-h-[220px] bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-800/80 flex flex-col justify-between relative">
                  
                  {/* LAYER 0: SILICON & LOGIC GATES */}
                  {activeLayer === 0 && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <Cpu className="w-4 h-4" />
                          Layer 0 · Fundamental Gate Switching
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="text-slate-400">Inputs:</span>
                          <button
                            onClick={() => { setSiliconA(siliconA === 1 ? 0 : 1); setIsAutoCycling(false); }}
                            className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${siliconA === 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                          >
                            A={siliconA}
                          </button>
                          <button
                            onClick={() => { setSiliconB(siliconB === 1 ? 0 : 1); setIsAutoCycling(false); }}
                            className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${siliconB === 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                          >
                            B={siliconB}
                          </button>
                        </div>
                      </div>

                      {/* Interactive Gate Schematic SVG */}
                      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex justify-center">
                        <svg viewBox="0 0 460 76" className="w-full h-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Input A */}
                          <text x="10" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={siliconA === 1 ? "#10b981" : "#64748b"}>A={siliconA}</text>
                          <line x1="42" y1="20" x2="110" y2="20" stroke={siliconA === 1 ? "#10b981" : "#475569"} strokeWidth="2" />
                          <circle cx="70" cy="20" r="3" fill={siliconA === 1 ? "#10b981" : "#475569"} />
                          <line x1="70" y1="20" x2="70" y2="52" stroke={siliconA === 1 ? "#10b981" : "#475569"} strokeWidth="2" />
                          <line x1="70" y1="52" x2="110" y2="52" stroke={siliconA === 1 ? "#10b981" : "#475569"} strokeWidth="2" />

                          {/* Input B */}
                          <text x="10" y="60" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={siliconB === 1 ? "#10b981" : "#64748b"}>B={siliconB}</text>
                          <line x1="42" y1="56" x2="70" y2="56" stroke={siliconB === 1 ? "#10b981" : "#475569"} strokeWidth="2" />
                          <line x1="70" y1="56" x2="90" y2="56" stroke={siliconB === 1 ? "#10b981" : "#475569"} strokeWidth="2" />
                          <circle cx="90" cy="56" r="3" fill={siliconB === 1 ? "#10b981" : "#475569"} />
                          <line x1="90" y1="56" x2="90" y2="32" stroke={siliconB === 1 ? "#10b981" : "#475569"} strokeWidth="2" />
                          <line x1="90" y1="32" x2="110" y2="32" stroke={siliconB === 1 ? "#10b981" : "#475569"} strokeWidth="2" />
                          <line x1="90" y1="56" x2="110" y2="64" stroke={siliconB === 1 ? "#10b981" : "#475569"} strokeWidth="2" />

                          {/* AND Gate */}
                          <g transform="translate(110, 12)">
                            <path d="M 0 0 L 18 0 C 32 0, 32 30, 18 30 L 0 30 Z" stroke="#e2e8f0" strokeWidth="1.8" fill="#0f172a" />
                            <text x="9" y="19" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#94a3b8" fontWeight="bold">AND</text>
                          </g>
                          <line x1="140" y1="26" x2="200" y2="26" stroke={andOut === 1 ? "#10b981" : "#475569"} strokeWidth="2" />
                          <text x="210" y="30" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={andOut === 1 ? "#10b981" : "#64748b"}>AND={andOut}</text>

                          {/* XOR Gate */}
                          <g transform="translate(110, 46)">
                            <path d="M -5 0 C 2 8, 2 18, -5 26" stroke="#e2e8f0" strokeWidth="1.6" fill="none" />
                            <path d="M 0 0 C 8 8, 8 18, 0 26 C 18 24, 28 18, 34 13 C 28 8, 18 2, 0 0 Z" stroke="#e2e8f0" strokeWidth="1.8" fill="#0f172a" />
                            <text x="9" y="17" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#94a3b8" fontWeight="bold">XOR</text>
                          </g>
                          <line x1="144" y1="59" x2="200" y2="59" stroke={xorOut === 1 ? "#10b981" : "#475569"} strokeWidth="2" />
                          <text x="210" y="63" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={xorOut === 1 ? "#10b981" : "#64748b"}>XOR={xorOut}</text>

                          {/* 8-Bit Register Strip */}
                          <g transform="translate(300, 18)">
                            <rect x="0" y="0" width="144" height="42" rx="6" fill="#020617" stroke="#334155" strokeWidth="1.5" />
                            <text x="72" y="14" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#64748b" fontWeight="bold">8-BIT REGISTER</text>
                            {/* Register bits */}
                            {[1, 1, 0, 1, 0, 0, andOut, xorOut].map((b, bi) => (
                              <g key={bi} transform={`translate(${8 + bi * 16}, 20)`}>
                                <rect x="0" y="0" width="14" height="16" rx="3" fill={b === 1 ? "#065f46" : "#1e293b"} stroke={b === 1 ? "#10b981" : "#334155"} strokeWidth="1" />
                                <text x="7" y="12" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="bold" fill={b === 1 ? "#a7f3d0" : "#64748b"}>{b}</text>
                              </g>
                            ))}
                          </g>
                        </svg>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                        Silicon &amp; Gate Switching: Voltage differentials form the binary register states that underpin machine words.
                      </p>
                    </div>
                  )}

                  {/* LAYER 1: SYSTEMS & C */}
                  {activeLayer === 1 && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                          <Terminal className="w-4 h-4" />
                          Layer 1 · Zero-Based Pointer Offsets in C
                        </span>
                        <div className="flex items-center gap-1 text-[10px]">
                          <span className="text-slate-400">Inspect Index:</span>
                          {[0, 1, 2, 3].map((idx) => (
                            <button
                              key={idx}
                              onClick={() => { setMemoryIndex(idx); setIsAutoCycling(false); }}
                              className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${memoryIndex === idx ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                            >
                              i={idx}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Memory Layout Grid */}
                      <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-xs space-y-2">
                        <div className="grid grid-cols-4 gap-2 text-center">
                          {[
                            { idx: 0, addr: '0x7FF0', val: '0x0042', label: 'arr[0]' },
                            { idx: 1, addr: '0x7FF4', val: '0x0084', label: 'arr[1]' },
                            { idx: 2, addr: '0x7FF8', val: '0x00C6', label: 'arr[2]' },
                            { idx: 3, addr: '0x7FFC', val: '0x0108', label: 'arr[3]' },
                          ].map((cell) => {
                            const isSelected = memoryIndex === cell.idx;
                            return (
                              <div
                                key={cell.idx}
                                onClick={() => { setMemoryIndex(cell.idx); setIsAutoCycling(false); }}
                                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500 text-white'
                                    : 'bg-slate-900 border-slate-800 text-slate-400'
                                }`}
                              >
                                <span className="text-[10px] text-slate-500 block">{cell.label}</span>
                                <span className="text-xs font-bold block text-emerald-400">{cell.val}</span>
                                <span className="text-[9px] font-mono text-slate-500 block mt-1">{cell.addr}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Pointer Derivation Formula */}
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                          <span>Address(arr[{memoryIndex}]) = Base + {memoryIndex} × sizeof(int)</span>
                          <span className="font-bold text-indigo-400">
                            = 0x7FF0 + {memoryIndex * 4} = 0x{(0x7FF0 + memoryIndex * 4).toString(16).toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                        At index [0], offset is zero: direct dereference with zero CPU addition cycles.
                      </p>
                    </div>
                  )}

                  {/* LAYER 2: DATA STRUCTURES */}
                  {activeLayer === 2 && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-teal-400 font-bold flex items-center gap-1.5">
                          <Network className="w-4 h-4" />
                          Layer 2 · Hierarchical Node Traversals
                        </span>
                        <div className="flex items-center gap-1 text-[10px]">
                          <button
                            onClick={() => { setTraversalStep((traversalStep + 1) % 5); setIsAutoCycling(false); }}
                            className="px-2.5 py-0.5 rounded bg-teal-500 text-slate-950 font-bold cursor-pointer"
                          >
                            Step Beam ({traversalStep + 1}/5)
                          </button>
                        </div>
                      </div>

                      {/* Tree Graph SVG */}
                      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex justify-center">
                        <svg viewBox="0 0 380 90" className="w-full h-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Edges */}
                          <line x1="190" y1="22" x2="110" y2="60" stroke={traversalStep >= 1 ? "#14b8a6" : "#334155"} strokeWidth="2" />
                          <line x1="190" y1="22" x2="270" y2="60" stroke={traversalStep >= 3 ? "#14b8a6" : "#334155"} strokeWidth="2" />
                          <line x1="110" y1="60" x2="70" y2="82" stroke={traversalStep >= 2 ? "#14b8a6" : "#334155"} strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="270" y1="60" x2="310" y2="82" stroke={traversalStep >= 4 ? "#14b8a6" : "#334155"} strokeWidth="1.5" strokeDasharray="3 3" />

                          {/* Node 0 (Root) */}
                          <circle cx="190" cy="22" r="16" fill={traversalStep === 0 ? "#14b8a6" : "#0f172a"} stroke="#14b8a6" strokeWidth="2" />
                          <text x="190" y="26" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="bold" fill={traversalStep === 0 ? "#022c22" : "#5eead4"}>[0]</text>

                          {/* Node 1 (Left) */}
                          <circle cx="110" cy="60" r="14" fill={traversalStep === 1 ? "#14b8a6" : "#0f172a"} stroke={traversalStep >= 1 ? "#14b8a6" : "#475569"} strokeWidth="1.8" />
                          <text x="110" y="64" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={traversalStep === 1 ? "#022c22" : "#94a3b8"}>[1]</text>

                          {/* Node 2 (Right) */}
                          <circle cx="270" cy="60" r="14" fill={traversalStep === 3 ? "#14b8a6" : "#0f172a"} stroke={traversalStep >= 3 ? "#14b8a6" : "#475569"} strokeWidth="1.8" />
                          <text x="270" y="64" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={traversalStep === 3 ? "#022c22" : "#94a3b8"}>[2]</text>
                        </svg>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                        From linear memory to non-linear recursive relations: BSTs and graphs indexed from Root [0].
                      </p>
                    </div>
                  )}

                  {/* LAYER 3: NEURAL & AI */}
                  {activeLayer === 3 && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-400 font-bold flex items-center gap-1.5">
                          <BrainCircuit className="w-4 h-4" />
                          Layer 3 · Neural Tensor Feedforward
                        </span>
                        <button
                          onClick={() => { triggerNeuralPulse(); setIsAutoCycling(false); }}
                          className="px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors cursor-pointer text-[10px]"
                        >
                          {isFiringNeural ? "Firing..." : "Trigger Forward Pass ⚡"}
                        </button>
                      </div>

                      {/* Neural Graph SVG */}
                      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex justify-center">
                        <svg viewBox="0 0 380 90" className="w-full h-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Synaptic Weights Lines */}
                          {[20, 45, 70].map((yIn, i) =>
                            [25, 65].map((yMid, j) => (
                              <line
                                key={`${i}-${j}`}
                                x1="50"
                                y1={yIn}
                                x2="190"
                                y2={yMid}
                                stroke={isFiringNeural ? "#f59e0b" : "#334155"}
                                strokeWidth={isFiringNeural ? "2" : "1"}
                                strokeOpacity={isFiringNeural ? "0.9" : "0.5"}
                              />
                            ))
                          )}
                          {[25, 65].map((yMid, j) => (
                            <line
                              key={`out-${j}`}
                              x1="190"
                              y1={yMid}
                              x2="330"
                              y2="45"
                              stroke={isFiringNeural ? "#f59e0b" : "#334155"}
                              strokeWidth={isFiringNeural ? "2.5" : "1"}
                            />
                          ))}

                          {/* Inputs */}
                          <circle cx="50" cy="20" r="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                          <circle cx="50" cy="45" r="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                          <circle cx="50" cy="70" r="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                          <text x="32" y="23" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#94a3b8">x₀</text>
                          <text x="32" y="48" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#94a3b8">x₁</text>
                          <text x="32" y="73" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#94a3b8">x₂</text>

                          {/* Hidden Layer Neurons */}
                          <circle cx="190" cy="25" r="12" fill="#1e293b" stroke={isFiringNeural ? "#f59e0b" : "#475569"} strokeWidth="2" />
                          <circle cx="190" cy="65" r="12" fill="#1e293b" stroke={isFiringNeural ? "#f59e0b" : "#475569"} strokeWidth="2" />
                          <text x="190" y="29" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#f8fafc">h₀</text>
                          <text x="190" y="69" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#f8fafc">h₁</text>

                          {/* Output Neuron */}
                          <circle cx="330" cy="45" r="14" fill={isFiringNeural ? "#f59e0b" : "#1e293b"} stroke="#f59e0b" strokeWidth="2" />
                          <text x="330" y="49" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="bold" fill={isFiringNeural ? "#451a03" : "#fcd34d"}>y</text>
                        </svg>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                        <span>Equation: y = sigma(W · x + b)</span>
                        <span className="text-amber-400 font-bold">Tensor Dot Product</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Status Bar at the bottom of the artwork canvas */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>INTERACTIVE ARCHITECTURE PREVIEW</span>
                <span className="text-emerald-400 font-bold">CLICK ANY LAYER OR TOGGLE BITS</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          ZONE 3: SPACIOUS NUMBERED BENTO GRID FOR CURRICULUM TRACKS
      ========================================================================= */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#059669]">
              Curriculum Portals · B.Tech CSE (Data Science)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1">
              Academic Tracks &amp; Foundations
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Engineered for undergraduate rigorous foundational mastery
          </span>
        </div>

        {/* Bento Grid: 1 Featured Wide Card [00] + 4 Track Cards [01] to [04] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD [00]: FEATURED ACTIVE COURSE (2 Columns Wide) */}
          <div 
            onClick={handleLaunchDld}
            className="md:col-span-2 group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#059669] shadow-sm hover:shadow-xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            {/* Subtle Watermark in background */}
            <span className="text-8xl sm:text-9xl font-mono font-black text-slate-100 select-none pointer-events-none absolute right-4 -bottom-4 group-hover:text-emerald-50/80 transition-colors">
              [00]
            </span>

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                    ACTIVE COURSE · 1005261102
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono text-slate-600 bg-slate-100">
                    I Year, I Semester
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Platform
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-[#059669] transition-colors">
                  Digital Logic Design
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2 max-w-xl">
                  Number systems, base conversions, complement arithmetic, Boolean algebra, K-Map minimization, combinational circuits, and clocked sequential machines.
                </p>
              </div>

              {/* 4 Feature Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5 Modular Units</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Visual Solvers</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>110+ Quiz Bank</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Notes &amp; Syllabus</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">Autonomous Curriculum VR23</span>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2E6F40] group-hover:bg-[#255A34] text-white text-xs font-bold transition-all shadow-sm">
                <span>Enter Course Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* CARD [01]: C PROGRAMMING & SYSTEMS */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-extrabold text-slate-400">[01]</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  In Development
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                C Programming &amp; Systems
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Memory layout, pointer arithmetic, structs, stack/heap frames, and low-level system execution.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100">Pointers</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Memory</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Bitwise</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
              Module Roadmap Q1
            </div>
          </div>

          {/* CARD [02]: DATA STRUCTURES & ALGORITHMS */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-extrabold text-slate-400">[02]</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  In Development
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Data Structures &amp; Algorithms
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Linear lists, balanced binary trees, graph traversals, hashing, and asymptotic Big-O complexity.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100">Trees</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Graphs</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Dynamic Prog</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
              Module Roadmap Q2
            </div>
          </div>

          {/* CARD [03]: MACHINE LEARNING FOUNDATIONS */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-extrabold text-slate-400">[03]</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  In Development
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Machine Learning Foundations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Multivariable calculus, matrix decompositions, gradient descent, linear models, and statistical classification.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100">SVD &amp; PCA</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Gradients</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Loss Functions</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
              Module Roadmap Q3
            </div>
          </div>

          {/* CARD [04]: DEEP LEARNING & NEURAL NETWORKS */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-extrabold text-slate-400">[04]</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  In Development
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Deep Learning &amp; AI
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Computational graphs, backpropagation calculus, convolutional filters, attention mechanisms, and transformers.
              </p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-500">
                <span className="px-2 py-0.5 rounded bg-slate-100">Tensors</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Backprop</span>
                <span className="px-2 py-0.5 rounded bg-slate-100">Transformers</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
              Module Roadmap Q4
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          ZONE 4: CLEAN MINIMAL FOOTER
      ========================================================================= */}
      <footer className="w-full border-t border-slate-200/80 bg-white/60 py-6 px-4 sm:px-8 text-center">
        <p className="text-xs font-mono text-slate-500">
          ZeroIndex Academic Platform · Vignan's Institute of Information Technology (Autonomous), Visakhapatnam
        </p>
      </footer>

      {/* =========================================================================
          MODAL: INSTALL AS MOBILE APP PWA INSTRUCTIONS
      ========================================================================= */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            
            {/* Close Button */}
            <button
              onClick={() => setIsInstallModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Install ZeroIndex on Phone</h3>
                  <p className="text-xs text-slate-500">Instant one-tap launch with full offline capabilities</p>
                </div>
              </div>

              {/* OS Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl font-mono text-xs font-bold">
                <button
                  onClick={() => setActiveInstallTab('android')}
                  className={`py-2 rounded-lg transition-all ${
                    activeInstallTab === 'android'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Android (Chrome)
                </button>
                <button
                  onClick={() => setActiveInstallTab('ios')}
                  className={`py-2 rounded-lg transition-all ${
                    activeInstallTab === 'ios'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  iPhone (Safari)
                </button>
              </div>

              {/* Step by step instructions */}
              {activeInstallTab === 'android' ? (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <p>Open <strong>Chrome</strong> on your Android phone and navigate to <strong>zeroindex.edu</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <p>Tap the <strong>three vertical dots (⋮)</strong> in the top-right corner.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <p>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <p>Open <strong>Safari</strong> on your iPhone or iPad and navigate to <strong>zeroindex.edu</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <p>Tap the <strong>Share button (box with upward arrow ⎋)</strong> at the bottom toolbar.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <p>Scroll down and tap <strong>"Add to Home Screen" (+)</strong>.</p>
                  </div>
                </div>
              )}

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                Tip: Once installed, ZeroIndex runs full-screen without URL bars and launches instantly from your phone's home screen.
              </div>

              <button
                onClick={() => setIsInstallModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AcademicsHub;
