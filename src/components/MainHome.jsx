import React, { useState, useEffect } from 'react';
import { 
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
  Network,
  Compass,
  Briefcase,
  Radio,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ViitCrest } from './ViitCrest';
import { AcademicsHub } from './AcademicsHub';

export const MainHome = ({ 
  onSelectDld, 
  onSelectRoadmaps, 
  onOpenWorkspaceTab,
  initialView = 'flagship'
}) => {
  // Navigation State: 'flagship' (Level 0) vs 'academics' (Level 1)
  const [currentView, setCurrentView] = useState(initialView);

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

  // 3. Ecosystem Compass Node State
  const [selectedNodeId, setSelectedNodeId] = useState(1); // Default to Node 1: Academics

  const ecosystemNodes = [
    {
      id: 1,
      index: "[01]",
      name: "Academics & Core Subjects",
      shortTitle: "Academics & Core Curricula",
      status: "ACTIVE PORTAL",
      isActive: true,
      icon: BookOpen,
      color: "#10b981",
      preview: "Interactive digital textbooks, visual hardware solvers, and self-assessment quiz arenas starting at Digital Logic Design (1005261102).",
      cta: "Open Academics Hub"
    },
    {
      id: 2,
      index: "[02]",
      name: "Skill Roadmaps",
      shortTitle: "Skill & Domain Roadmaps",
      status: "ARCHITECTING",
      isActive: false,
      icon: Compass,
      color: "#f59e0b",
      preview: "From-first-principles roadmaps across Systems, Full-Stack, Machine Learning, and Cloud Engineering.",
      cta: "View Roadmap Spec"
    },
    {
      id: 3,
      index: "[03]",
      name: "Placement & Career Prep",
      shortTitle: "Placement & Career Awareness",
      status: "ARCHITECTING",
      isActive: false,
      icon: Briefcase,
      color: "#6366f1",
      preview: "Systematic DSA patterns, core CS interview frameworks, and engineering aptitude mastery.",
      cta: "Career Spec"
    },
    {
      id: 4,
      index: "[04]",
      name: "Tech Pulse & Current Affairs",
      shortTitle: "Tech Pulse & Current Affairs",
      status: "ARCHITECTING",
      isActive: false,
      icon: Radio,
      color: "#a855f7",
      preview: "Weekly deep dives into modern systems architecture, AI developments, and high-impact computing breakthroughs.",
      cta: "Pulse Spec"
    },
    {
      id: 5,
      index: "[05]",
      name: "Student Progress & Systems",
      shortTitle: "Progress & Mindset Frameworks",
      status: "ARCHITECTING",
      isActive: false,
      icon: Sparkles,
      color: "#06b6d4",
      preview: "Spaced repetition workflows, deliberate practice logs, and analytical academic tracking.",
      cta: "Framework Spec"
    }
  ];

  const activeNodeData = ecosystemNodes.find(n => n.id === selectedNodeId) || ecosystemNodes[0];

  const handleOpenAcademics = () => {
    setCurrentView('academics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFlagship = () => {
    setCurrentView('flagship');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If student navigated into Academics Hub (View B), render dedicated AcademicsHub component
  if (currentView === 'academics') {
    return (
      <AcademicsHub
        onBackToFlagship={handleBackToFlagship}
        onSelectDld={onSelectDld}
        onSelectRoadmaps={onSelectRoadmaps}
        onOpenWorkspaceTab={onOpenWorkspaceTab}
      />
    );
  }

  // =========================================================================
  // VIEW A: DRAMATIC DEEP ARCHITECTURAL OBSIDIAN (#0B0F17) ZEROINDEX FLAGSHIP
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-400 relative overflow-hidden">
      
      {/* Background Architectural Grid Lines & Subtle Ambient Radial Lights (Strictly no neon) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-slate-800/30 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* =========================================================================
          ZONE 1: FLOATING DARK-GLASS TOP HEADER BAR
      ========================================================================= */}
      <header className="sticky top-0 z-30 bg-[#0B0F17]/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: [0] ZeroIndex Brand Mark */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-1 rounded-lg shadow-2xs">
                [0]
              </span>
              <span className="font-black text-lg tracking-tight text-white">
                ZeroIndex
              </span>
            </div>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full hidden sm:inline-flex border border-slate-800">
              BASE LAYER ECOSYSTEM
            </span>
          </div>

          {/* Center-Right Utilities: Live Chrono-Pill & Install App Button */}
          <div className="flex items-center gap-2.5">
            
            {/* Compact Live Chrono-Pill */}
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{formattedTime} IST · {formattedDate}</span>
            </div>

            {/* Install as Mobile App Modal Trigger */}
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Install as App</span>
              <span className="sm:hidden">App</span>
            </button>

            {/* Institutional Badge: VIIT(A) */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="flex flex-col text-right hidden lg:flex leading-tight">
                <span className="font-bold text-xs text-slate-200">
                  Vignan's Institute of Information Technology (A)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
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
          Left: Foundational Layer Story & Primary Launch
          Right: Interactive "Index [0] Ecosystem Compass" Artwork
      ========================================================================= */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-14 sm:pb-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT COLUMN: Editorial Typography & Primary Launch (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Origin Badge: THE FOUNDATIONAL LAYER (NO mention of CSE-DS) */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-300 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ORIGIN NODE [0] · THE FOUNDATIONAL LAYER
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                <span className="text-[#10B981]">Zero</span>
                <span className="text-[#F8FAFC]">Index.</span>
              </h1>
              <p className="font-serif italic text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">
                "Every complex system, from a single logic gate to a career trajectory, starts at index zero."
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-normal">
                A unified foundational platform for core engineering academics, skill roadmaps, career &amp; placement readiness, and technical awareness.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                onClick={handleOpenAcademics}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-base font-black shadow-xl shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Enter Academics Portal</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Overview Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Core Academics (Active)
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Roadmaps (Blueprint)
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Placement Prep (Blueprint)
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive "Index [0] Ecosystem Compass" Artwork (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/70 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden text-left flex flex-col justify-between">
              
              {/* Header inside the Compass card */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                    Index [0] Ecosystem Compass
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  5 Core Pillars
                </span>
              </div>

              {/* Interactive SVG Compass Canvas */}
              <div className="relative py-2 flex items-center justify-center">
                <svg viewBox="0 0 460 260" className="w-full h-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Concentric Orbital Radar Rings */}
                  <circle cx="230" cy="130" r="110" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="230" cy="130" r="70" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Radiating Bus Lines to 5 Nodes */}
                  {[
                    { id: 1, x: 230, y: 30, color: "#10b981" },
                    { id: 2, x: 345, y: 85, color: "#f59e0b" },
                    { id: 3, x: 310, y: 210, color: "#6366f1" },
                    { id: 4, x: 150, y: 210, color: "#a855f7" },
                    { id: 5, x: 115, y: 85, color: "#06b6d4" },
                  ].map((target) => {
                    const isSelected = selectedNodeId === target.id;
                    return (
                      <g key={target.id}>
                        <line
                          x1="230"
                          y1="130"
                          x2={target.x}
                          y2={target.y}
                          stroke={isSelected ? target.color : "#334155"}
                          strokeWidth={isSelected ? "2.5" : "1.2"}
                          strokeDasharray={isSelected ? "none" : "3 3"}
                          className="transition-all duration-300"
                        />
                        {isSelected && (
                          <circle cx={(230 + target.x) / 2} cy={(130 + target.y) / 2} r="3" fill={target.color} />
                        )}
                      </g>
                    );
                  })}

                  {/* Central Origin Node [0] */}
                  <g transform="translate(230, 130)">
                    <circle cx="0" cy="0" r="28" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                    <circle cx="0" cy="0" r="34" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
                    <text x="0" y="-3" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="900" fill="#a7f3d0">[0]</text>
                    <text x="0" y="10" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fontWeight="bold" fill="#6ee7b7">ORIGIN</text>
                  </g>
                </svg>

                {/* Overlaid Interactive Node Buttons (accessible on mobile & touch) */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-2">
                  {/* Top Node [01] */}
                  <div className="flex justify-center pointer-events-auto">
                    <button
                      onClick={() => { setSelectedNodeId(1); handleOpenAcademics(); }}
                      onMouseEnter={() => setSelectedNodeId(1)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 ${
                        selectedNodeId === 1
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 ring-2 ring-emerald-500/30'
                          : 'bg-slate-900/90 text-emerald-400 border-emerald-500/40 hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>[01] Academics (Active)</span>
                    </button>
                  </div>

                  {/* Middle Row Nodes [05] and [02] */}
                  <div className="flex justify-between items-center px-1 pointer-events-auto">
                    <button
                      onClick={() => setSelectedNodeId(5)}
                      onMouseEnter={() => setSelectedNodeId(5)}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                        selectedNodeId === 5
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      [05] Progress
                    </button>

                    <button
                      onClick={() => setSelectedNodeId(2)}
                      onMouseEnter={() => setSelectedNodeId(2)}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                        selectedNodeId === 2
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      [02] Roadmaps
                    </button>
                  </div>

                  {/* Bottom Row Nodes [04] and [03] */}
                  <div className="flex justify-around items-center px-6 pointer-events-auto">
                    <button
                      onClick={() => setSelectedNodeId(4)}
                      onMouseEnter={() => setSelectedNodeId(4)}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                        selectedNodeId === 4
                          ? 'bg-purple-500 text-slate-950 border-purple-400 font-bold'
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      [04] Tech Pulse
                    </button>

                    <button
                      onClick={() => setSelectedNodeId(3)}
                      onMouseEnter={() => setSelectedNodeId(3)}
                      className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                        selectedNodeId === 3
                          ? 'bg-indigo-500 text-white border-indigo-400 font-bold'
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      [03] Career Prep
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Live Inspector Panel at bottom of compass card */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-bold"
                      style={{ 
                        backgroundColor: activeNodeData.isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                        color: activeNodeData.color
                      }}
                    >
                      {activeNodeData.index} {activeNodeData.status}
                    </span>
                    <span className="font-bold text-slate-200">{activeNodeData.name}</span>
                  </div>

                  {activeNodeData.isActive && (
                    <button
                      onClick={handleOpenAcademics}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                    >
                      <span>Launch Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {activeNodeData.preview}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          ZONE 3: BELOW THE FOLD: "THE ZEROINDEX ECOSYSTEM"
          1 Active Gateway Card + Reserved Blueprint Space for Future Pillars
      ========================================================================= */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Ecosystem Architecture · Building From Index [0]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Foundational Pillars
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            A cohesive student roadmap from first principles
          </span>
        </div>

        {/* 1. Primary Active Gateway Card: [01] Academics & Engineering Foundations */}
        <div 
          onClick={handleOpenAcademics}
          className="group p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/60 shadow-xl hover:shadow-emerald-500/10 transition-all cursor-pointer relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-2xl text-left">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                ● ACTIVE PORTAL
              </span>
              <span className="text-xs font-mono text-slate-400">[01] Pillar One</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">
              Academics &amp; Core Curricula
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Interactive digital textbooks, visual hardware solvers, and self-assessment quiz arenas engineered from first principles.
            </p>

            {/* Subject Chips */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 font-bold">
                Digital Logic Design (Active)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">
                C Systems
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">
                DSA
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">
                Machine Learning
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">
                Deep Learning
              </span>
            </div>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <div className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 group-hover:bg-emerald-400 text-slate-950 text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
              <span>Open Academics Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* 2. Creative "Unfolding Horizon" Strip for Upcoming Pillars [02] to [05] */}
        <div className="bg-slate-900/40 border border-dashed border-slate-800/80 rounded-2xl p-5 sm:p-6 text-left">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              Reserved Blueprint Space · Upcoming Ecosystem Pillars
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              In Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* [02] Skill Roadmaps */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-400">[02]</span>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                  Upcoming
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">
                Skill &amp; Domain Roadmaps
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Curated technical pathways from zero to systems proficiency and software mastery.
              </p>
            </div>

            {/* [03] Placement & Career Awareness */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-400">[03]</span>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                  Upcoming
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">
                Placement &amp; Career Awareness
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Company recruitment patterns, problem-solving blueprints, and core engineering aptitude.
              </p>
            </div>

            {/* [04] Tech Pulse & Current Affairs */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-400">[04]</span>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                  Upcoming
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">
                Tech Pulse &amp; Current Affairs
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Curated digests on AI architectures, systems evolution, and industry technical shifts.
              </p>
            </div>

            {/* [05] Progress & Mindset Frameworks */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-400">[05]</span>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                  Upcoming
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">
                Progress &amp; Mindset Frameworks
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Self-regulated deliberate practice, cognitive memory systems, and student engineering habits.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          ZONE 4: BOTTOM FOOTER ATTRIBUTION (MOVED OUT OF HERO)
      ========================================================================= */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-8 text-center space-y-2">
        <p className="text-xs font-mono text-slate-400 font-medium">
          Curated &amp; Engineered by J. Siddartha Varma · Assistant Professor, Department of CSE-DS · Vignan's Institute of Information Technology (A)
        </p>
        <p className="text-[11px] font-mono text-slate-500">
          ZeroIndex Academic Platform · Autonomous, Visakhapatnam
        </p>
      </footer>

      {/* =========================================================================
          MODAL: INSTALL AS MOBILE APP PWA INSTRUCTIONS
      ========================================================================= */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-800 relative animate-in fade-in zoom-in-95 duration-150 text-left">
            
            {/* Close Button */}
            <button
              onClick={() => setIsInstallModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Install ZeroIndex on Phone</h3>
                  <p className="text-xs text-slate-400">Instant one-tap launch with full offline capabilities</p>
                </div>
              </div>

              {/* OS Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl font-mono text-xs font-bold border border-slate-800">
                <button
                  onClick={() => setActiveInstallTab('android')}
                  className={`py-2 rounded-lg transition-all ${
                    activeInstallTab === 'android'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Android (Chrome)
                </button>
                <button
                  onClick={() => setActiveInstallTab('ios')}
                  className={`py-2 rounded-lg transition-all ${
                    activeInstallTab === 'ios'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  iPhone (Safari)
                </button>
              </div>

              {/* Step by step instructions */}
              {activeInstallTab === 'android' ? (
                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <p>Open <strong>Chrome</strong> on your Android phone and navigate to <strong>zeroindex.edu</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <p>Tap the <strong>three vertical dots (⋮)</strong> in the top-right corner.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <p>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <p>Open <strong>Safari</strong> on your iPhone or iPad and navigate to <strong>zeroindex.edu</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <p>Tap the <strong>Share button (box with upward arrow ⎋)</strong> at the bottom toolbar.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <p>Scroll down and tap <strong>"Add to Home Screen" (+)</strong>.</p>
                  </div>
                </div>
              )}

              <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-medium">
                Tip: Once installed, ZeroIndex runs full-screen without browser URL bars and launches directly from your mobile home screen.
              </div>

              <button
                onClick={() => setIsInstallModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
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

export default MainHome;
