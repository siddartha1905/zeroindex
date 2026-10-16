import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Sparkles, 
  Terminal, 
  Network, 
  Database, 
  BrainCircuit, 
  Compass,
  Clock,
  Smartphone,
  HelpCircle,
  X,
  RotateCw,
  CheckCircle2,
  Share2,
  MoreVertical,
  Laptop
} from 'lucide-react';
import { ViitCrest } from './ViitCrest';

// Curated DLD & Computer Science Engineering Trivia Bits
const TRIVIA_BITS = [
  {
    tag: "Memory Architecture",
    title: "Zero-Based Indexing",
    subtitle: "Why array indices start at 0 instead of 1",
    fact: "In low-level hardware memory, an array index represents an address offset: Address = Base + (Index × ElementSize). At Index 0, the offset is 0, pointing directly to the base element without consuming an addition cycle in the ALU!"
  },
  {
    tag: "Arithmetic Logic",
    title: "2's Complement Asymmetry",
    subtitle: "Why an 8-bit integer ranges from -128 to +127",
    fact: "In 2's complement, zero (00000000₂) is categorized with positive sign bit 0. Because zero occupies one positive representation slot, negative numbers gain an extra value: exactly -2^(n-1) down to -128!"
  },
  {
    tag: "Bit Manipulation",
    title: "Single-Cycle Power of 2",
    subtitle: "Checking powers of 2 in 1 CPU cycle",
    fact: "The bitwise operation (n > 0) && ((n & (n - 1)) === 0) checks if n is an exact power of 2 in a single CPU instruction. Subtracting 1 flips all bits up to the lowest set bit, clearing the only '1' if n is 2^k."
  },
  {
    tag: "Computer Arithmetic",
    title: "The 0.1 + 0.2 Paradox",
    subtitle: "Why 0.1 + 0.2 ≠ 0.3 in IEEE 754",
    fact: "Computers store numbers in binary base 2. Just as 1/3 is an infinite repeating decimal (0.333...) in base 10, decimal 0.1 is an infinite repeating fraction (0.000110011...₂) in binary, leading to tiny rounding residues."
  },
  {
    tag: "Silicon CMOS Design",
    title: "De Morgan's Silicon Secret",
    subtitle: "Why NAND and NOR dominate hardware",
    fact: "In silicon CMOS fabrication, inverting gates (NAND and NOR) require only 4 transistors, whereas non-inverting AND and OR gates require 6 transistors. Hence, ALUs and memory cells are built from inverting logic!"
  }
];

export const PortalLanding = ({ onSelectDld, onSelectRoadmaps }) => {
  // Live Chrono-Widget State
  const [currentTime, setCurrentTime] = useState(new Date());

  // Daily Index 0 Bit State
  const [factIndex, setFactIndex] = useState(0);

  // Mobile App Shortcut Modal State
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [installPlatform, setInstallPlatform] = useState('android'); // 'android' | 'ios'

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsInstallModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format Time & Date strings (Monospace HH:MM:SS · DD MMM YYYY)
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;

  const day = String(currentTime.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[currentTime.getMonth()];
  const year = currentTime.getFullYear();
  const dateString = `${day} ${monthName} ${year}`;

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[currentTime.getDay()];

  const currentTrivia = TRIVIA_BITS[factIndex];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col justify-between py-6 px-4 sm:px-8 select-none relative overflow-hidden notebook-dots">
      
      {/* Background Architectural Blueprint Curves (Subtle, unified canvas) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.25]" 
        viewBox="0 0 1440 900" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="720" cy="450" r="500" stroke="#2E6F40" strokeWidth="0.8" strokeDasharray="6 6" />
        <circle cx="720" cy="450" r="680" stroke="#4F46E5" strokeWidth="0.6" strokeDasharray="4 8" />
        <path d="M 120 150 Q 720 0 1320 150" stroke="#1A1A1A" strokeWidth="0.6" strokeDasharray="3 3" />
        <path d="M 120 750 Q 720 900 1320 750" stroke="#1A1A1A" strokeWidth="0.6" strokeDasharray="3 3" />
      </svg>

      {/* 1. Minimal Top Institutional Header */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between pb-4 border-b border-[#E2DDD5] relative z-10">
        {/* Left: ZeroIndex Brand Mark */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-base font-extrabold text-[#2E6F40] bg-[#F2F7F4] border border-[#DCE7E1] px-2 py-0.5 rounded">
            [0]
          </span>
          <span className="font-extrabold text-base tracking-tight text-[#1A1A1A]">
            ZeroIndex
          </span>
        </div>

        {/* Right: Official College Logo + Full Name (No IT Dept text) */}
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="font-bold text-xs sm:text-sm text-[#1A1A1A] leading-tight">
              Vignan’s Institute of Information Technology (A)
            </span>
            <span className="text-[10px] text-[#64748B] font-mono leading-tight">
              Autonomous, Visakhapatnam
            </span>
          </div>
          <ViitCrest className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>
      </header>

      {/* 2. Main 3-Column Spread (Left Wing + Centerpiece Hero + Right Wing) */}
      <div className="max-w-7xl w-full mx-auto my-auto py-4 sm:py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* ================================================================= */}
          {/* LEFT SIDE WING: "The Digital Pulse" (Desktop lg/xl)                */}
          {/* ================================================================= */}
          <aside className="hidden lg:flex flex-col gap-4 lg:col-span-3">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EAF2ED]/85 border border-[#DCE7E1] shadow-soft backdrop-blur-xs space-y-4 relative overflow-hidden">
              
              {/* Wing Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#D5E3DA]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]"></span>
                  </span>
                  <span className="font-handwritten text-xl font-bold text-[#2E6F40]">
                    The Digital Pulse
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#15803D] uppercase bg-[#DCFCE7] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                  Live Sync
                </span>
              </div>

              {/* 1. Live Chrono-Widget */}
              <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2 font-mono">
                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="font-bold uppercase tracking-wider text-[#1E293B] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#2E6F40]" />
                    Chrono-Widget
                  </span>
                  <span className="text-[10px] text-[#15803D] font-bold">UTC+05:30</span>
                </div>

                {/* Clock Display Card */}
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-center space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-wider">
                    {timeString}
                  </div>
                  <div className="text-xs font-bold text-[#2E6F40]">
                    {dateString} · {dayOfWeek}
                  </div>
                </div>

                <div className="text-[10px] text-[#64748B] text-center pt-0.5">
                  Format: <span className="font-bold text-[#1E293B]">{timeString} · {dateString}</span>
                </div>
              </div>

              {/* 2. Daily Index 0 Bit */}
              <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2.5 font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#2E6F40]/10 text-[#2E6F40] border border-[#2E6F40]/20">
                      [0] Bit
                    </span>
                    <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                      Daily Index 0 Bit
                    </span>
                  </div>
                  <button
                    onClick={() => setFactIndex((prev) => (prev + 1) % TRIVIA_BITS.length)}
                    title="Rotate to next trivia fact"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2E6F40] hover:text-[#1F4A2B] px-1.5 py-0.5 rounded bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#2E6F40]/40 transition-all cursor-pointer"
                  >
                    <RotateCw className="w-2.5 h-2.5" />
                    <span>Next</span>
                  </button>
                </div>

                {/* Trivia Content */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#D97706] tracking-wider block">
                    {currentTrivia.tag}
                  </span>
                  <h4 className="text-xs font-bold text-[#0F172A] leading-snug">
                    {currentTrivia.title}: <span className="text-[#475569] font-normal">{currentTrivia.subtitle}</span>
                  </h4>
                  <p className="text-[11px] text-[#334155] leading-relaxed pt-1 border-t border-[#F2F7F4]">
                    {currentTrivia.fact}
                  </p>
                </div>

                <div className="text-[9px] text-[#64748B] flex items-center justify-between pt-1 border-t border-[#F2F7F4]">
                  <span>Fact #{factIndex + 1} of {TRIVIA_BITS.length}</span>
                  <span className="text-[#2E6F40] font-semibold">Zero-Based Indexing</span>
                </div>
              </div>

              {/* Department Context Pill */}
              <div className="p-2.5 rounded-xl bg-[#FAF8F5]/80 border border-[#DCE7E1] text-[10px] font-mono text-[#64748B] flex items-center justify-between">
                <span>Department of CSE-DS</span>
                <span className="font-bold text-[#2E6F40]">Semester 2</span>
              </div>
            </div>
          </aside>

          {/* ================================================================= */}
          {/* CENTERPIECE: ZeroIndex Hand-Drawn Ink Sketch & Hero Typography    */}
          {/* ================================================================= */}
          <main className="lg:col-span-6 flex flex-col items-center text-center">
            
            {/* Creative Pen-and-Ink SVG: Origin [0] branching into CS & AI branches */}
            <div className="w-full max-w-md sm:max-w-lg mb-4 flex justify-center">
              <div className="relative p-1 w-full">
                <svg 
                  viewBox="0 0 520 220" 
                  className="w-full h-auto drop-shadow-sm" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="portal-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E5DFD5" strokeWidth="0.5" strokeOpacity="0.4" />
                    </pattern>
                  </defs>
                  <rect x="8" y="8" width="504" height="204" rx="6" fill="url(#portal-grid)" stroke="#E5DFD5" strokeWidth="0.8" strokeDasharray="3 3"/>

                  {/* Central Origin Node: [0] */}
                  <g transform="translate(50, 110)">
                    <circle cx="0" cy="0" r="30" stroke="#1A1A1A" strokeWidth="2.2" fill="#FAF8F5" />
                    <circle cx="0" cy="0" r="26" stroke="#1A1A1A" strokeWidth="0.6" strokeDasharray="3 2" />
                    <path d="M -15 -15 L -8 -8 M -12 -5 L -5 2" stroke="#1A1A1A" strokeWidth="0.8" strokeOpacity="0.3" />
                    <text x="0" y="7" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="20" fontWeight="800" fill="#2E6F40">[0]</text>
                    <text x="0" y="44" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="15" fill="#1A1A1A">origin node</text>
                  </g>

                  {/* Branch 1: Digital Logic */}
                  <path d="M 80 100 C 140 70, 170 50, 230 50" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <g transform="translate(235, 36)">
                    <path d="M 0 14 L 15 14 L 15 0 L 30 0 L 30 14 L 45 14 L 45 0 L 60 0 L 60 14 L 75 14" stroke="#1A1A1A" strokeWidth="1.8" fill="none" />
                    <text x="85" y="12" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#2E6F40" fontWeight="bold">0101₂</text>
                    <text x="35" y="30" fontFamily="'Caveat', cursive" fontSize="14" fill="#1A1A1A">Digital Logic</text>
                  </g>

                  {/* Branch 2: C & Systems */}
                  <path d="M 80 110 C 150 110, 180 90, 240 90" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />
                  <g transform="translate(245, 78)">
                    <rect x="0" y="0" width="85" height="24" rx="4" stroke="#1A1A1A" strokeWidth="1.5" fill="#FAF8F5" />
                    <text x="42" y="16" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#1A1A1A" fontWeight="bold">printf("{ }");</text>
                    <text x="100" y="16" fontFamily="'Caveat', cursive" fontSize="14" fill="#1A1A1A">C & Systems</text>
                  </g>

                  {/* Branch 3: Data Structures */}
                  <path d="M 80 115 C 150 120, 180 145, 240 145" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />
                  <g transform="translate(245, 130)">
                    <circle cx="12" cy="15" r="7" stroke="#1A1A1A" strokeWidth="1.5" fill="#FAF8F5" />
                    <circle cx="36" cy="6" r="6" stroke="#1A1A1A" strokeWidth="1.5" fill="#FAF8F5" />
                    <circle cx="36" cy="24" r="6" stroke="#1A1A1A" strokeWidth="1.5" fill="#FAF8F5" />
                    <path d="M 18 12 L 30 8 M 18 18 L 30 22" stroke="#1A1A1A" strokeWidth="1.2" />
                    <text x="50" y="19" fontFamily="'Caveat', cursive" fontSize="14" fill="#1A1A1A">Data Structures</text>
                  </g>

                  {/* Branch 4: AI & Deep Learning */}
                  <path d="M 80 120 C 140 150, 170 180, 230 180" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <g transform="translate(235, 168)">
                    <circle cx="10" cy="12" r="5" fill="#1A1A1A" />
                    <circle cx="30" cy="4" r="4" fill="#1A1A1A" />
                    <circle cx="30" cy="20" r="4" fill="#1A1A1A" />
                    <circle cx="52" cy="12" r="5" stroke="#1A1A1A" strokeWidth="1.5" fill="#FAF8F5" />
                    <path d="M 10 12 L 30 4 M 10 12 L 30 20 M 30 4 L 52 12 M 30 20 L 52 12" stroke="#1A1A1A" strokeWidth="1" strokeDasharray="2 1" />
                    <text x="65" y="16" fontFamily="'Caveat', cursive" fontSize="15" fill="#2E6F40" fontWeight="bold">AI / Deep Learning</text>
                  </g>

                  {/* Output Destination */}
                  <path d="M 390 110 L 440 110" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="3 2" />
                  <polygon points="440,106 448,110 440,114" fill="#1A1A1A" />
                  <g transform="translate(454, 98)">
                    <text x="0" y="12" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="bold" fill="#1A1A1A">TENSOR</text>
                    <text x="0" y="24" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#64748B">f(x)=W·x+b</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Hero Title with Subtle Sage Highlight on "Zero" */}
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] mb-2">
              <span className="relative inline-block px-1 text-[#2E6F40]">
                Zero
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#2E6F40]/15 -z-10 rounded-sm"></span>
              </span>
              Index
            </h1>

            {/* Handwritten Motivational Quote (Strictly zero dashes) */}
            <p className="font-handwritten text-xl sm:text-2xl text-[#1A1A1A] max-w-xl leading-relaxed mb-3">
              “Every complex system in computing, from a single logic gate to a neural network, starts at index zero.”
            </p>

            {/* Faculty Attribution Line (Strictly Assistant Professor, Department of CSE-DS) */}
            <div className="text-xs sm:text-sm text-[#475569] mb-6">
              Curated by <strong className="text-[#1A1A1A] font-semibold">J. Siddartha Varma</strong> · <span className="font-medium text-[#2E6F40]">Assistant Professor, Department of CSE-DS</span>
            </div>

            {/* Focused Subjects Section */}
            <div className="w-full max-w-md space-y-3">
              
              {/* Primary Active Subject Card */}
              <div
                onClick={onSelectDld}
                className="group relative p-4 rounded-2xl bg-white border border-[#DCE7E1] hover:border-[#2E6F40] shadow-sm hover:shadow-md transition-all cursor-pointer text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1] flex items-center justify-center text-[#2E6F40] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#2E6F40]/10 text-[#2E6F40]">
                        Active Subject
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">1005261102</span>
                    </div>
                    <h2 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#2E6F40] transition-colors leading-snug">
                      Digital Logic Design
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      I Year B.Tech (Data Science) · Units, Solvers & Practice
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#2E6F40] pl-2 flex-shrink-0">
                  <span className="hidden sm:inline">Open Course</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Upcoming Subject Pills */}
              <div className="pt-1">
                <div className="text-[11px] font-mono font-medium text-[#64748B] mb-1.5 uppercase tracking-wider">
                  Upcoming Subjects & Tracks
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
                  {[
                    "C Programming",
                    "Data Structures",
                    "Machine Learning",
                    "Artificial Intelligence",
                    "Career Roadmaps"
                  ].map((subject, idx) => (
                    <span
                      key={idx}
                      onClick={subject === "Career Roadmaps" ? onSelectRoadmaps : undefined}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#E2DDD5] text-[#64748B] text-[11px] ${
                        subject === "Career Roadmaps" ? "hover:border-[#2E6F40] hover:text-[#1A1A1A] cursor-pointer" : ""
                      }`}
                    >
                      <span>{subject}</span>
                      <span className="text-[9px] font-bold text-[#D97706] bg-[#FEF3C7] px-1 rounded">Soon</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile Viewport Quick Action & Metadata (scales gracefully on mobile/tablet) */}
            <div className="lg:hidden w-full max-w-md pt-6 mt-4 border-t border-[#E2DDD5] space-y-3 font-mono">
              <button
                onClick={() => setIsInstallModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#DCE7E1] hover:bg-[#F2F7F4] text-[#2E6F40] font-bold text-xs shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#2E6F40]" />
                <span>[?] Install as Mobile App</span>
              </button>
              <div className="text-[10px] text-[#64748B] text-center">
                ZeroIndex v2.0 · Built for I Year CSE-DS · VIIT(A)
              </div>
            </div>

          </main>

          {/* ================================================================= */}
          {/* RIGHT SIDE WING: "Quick Help & Mobile App Guide" (Desktop lg/xl)  */}
          {/* ================================================================= */}
          <aside className="hidden lg:flex flex-col gap-4 lg:col-span-3">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F3EFE6]/85 border border-[#DCE7E1] shadow-soft backdrop-blur-xs space-y-4 relative overflow-hidden">
              
              {/* Wing Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
                <span className="font-handwritten text-xl font-bold text-[#4F46E5]">
                  Quick Help & Access
                </span>
                <span className="text-[10px] font-mono text-[#4F46E5] uppercase bg-[#EEF2FF] border border-[#C7D2FE] px-2 py-0.5 rounded font-bold">
                  PWA Ready
                </span>
              </div>

              {/* 1. Help & PWA App Guide Card */}
              <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-3 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F2F7F4] border border-[#DCE7E1] flex items-center justify-center text-[#2E6F40]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">ZeroIndex on Phone</h4>
                    <span className="text-[10px] text-[#64748B]">Instant Home Screen Pin</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#475569] leading-relaxed">
                  Pin ZeroIndex directly to your Android or iPhone home screen for fast, full-screen, offline-ready classroom revision.
                </p>

                {/* The requested prominent button */}
                <button
                  onClick={() => setIsInstallModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#2E6F40] hover:bg-[#235833] text-white font-mono text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-white/90" />
                  <span>[?] Install as Mobile App</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center justify-between text-[9px] text-[#64748B] pt-1 border-t border-[#F2F7F4]">
                  <span>Chrome (Android)</span>
                  <span>·</span>
                  <span>Safari (iOS)</span>
                  <span>·</span>
                  <span className="text-[#15803D] font-bold">Zero Store Delay</span>
                </div>
              </div>

              {/* 2. Portal Metadata Badge */}
              <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs text-center font-mono space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] block">
                  Official Portal Metadata
                </span>
                <div className="text-xs font-bold text-[#0F172A]">
                  ZeroIndex v2.0 · Built for I Year CSE-DS · VIIT(A)
                </div>
                <div className="text-[10px] text-[#64748B]">
                  Vignan’s Institute of Information Technology (Autonomous)
                </div>
              </div>

              {/* Career Roadmaps Shortcut */}
              <div 
                onClick={onSelectRoadmaps}
                className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] hover:border-[#4F46E5] text-xs font-mono transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#4F46E5] group-hover:rotate-45 transition-transform" />
                  <div>
                    <div className="text-[11px] font-bold text-[#1E293B] group-hover:text-[#4F46E5]">Career Roadmaps</div>
                    <div className="text-[9px] text-[#64748B]">CSE-DS Placement Tracks</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all" />
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* Clean bottom padding */}
      <div className="h-2"></div>

      {/* ===================================================================== */}
      {/* STEP-BY-STEP MOBILE APP INSTALLATION MODAL                            */}
      {/* ===================================================================== */}
      {isInstallModalOpen && (
        <div 
          onClick={() => setIsInstallModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-[#FAF8F5] border border-[#DCE7E1] rounded-2xl shadow-2xl overflow-hidden font-mono text-xs flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-4 bg-white border-b border-[#DCE7E1] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#15803D]">
                  <Smartphone className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Install ZeroIndex on Mobile
                  </h3>
                  <span className="text-[10px] text-[#64748B]">
                    Instant full-screen access without app store downloads
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsInstallModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Selector Tabs */}
            <div className="p-3 bg-[#FAF8F5] border-b border-[#DCE7E1]">
              <div className="grid grid-cols-2 gap-2 p-1 bg-white border border-[#DCE7E1] rounded-xl">
                <button
                  onClick={() => setInstallPlatform('android')}
                  className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    installPlatform === 'android'
                      ? 'bg-[#15803D] text-white shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Android (Chrome)</span>
                </button>
                <button
                  onClick={() => setInstallPlatform('ios')}
                  className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    installPlatform === 'ios'
                      ? 'bg-[#4F46E5] text-white shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>iPhone / iPad (Safari)</span>
                </button>
              </div>
            </div>

            {/* Modal Body / Steps */}
            <div className="p-5 overflow-y-auto space-y-4">
              
              {installPlatform === 'android' ? (
                /* ANDROID CHROME STEPS */
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center gap-2 text-[#15803D] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[11px]">1</span>
                      <span>Step 1: Open in Google Chrome</span>
                    </div>
                    <p className="text-[11px] text-[#475569] pl-7">
                      Launch Google Chrome on your Android smartphone and navigate to the ZeroIndex portal.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center gap-2 text-[#15803D] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[11px]">2</span>
                      <span>Step 2: Tap the Chrome Menu (⋮)</span>
                    </div>
                    <p className="text-[11px] text-[#475569] pl-7">
                      Tap the <strong>three vertical dots</strong> in the upper right corner of the Chrome browser window.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center gap-2 text-[#15803D] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[11px]">3</span>
                      <span>Step 3: Tap "Add to Home screen"</span>
                    </div>
                    <p className="text-[11px] text-[#475569] pl-7">
                      Look down the menu options and tap <strong>"Add to Home screen"</strong> (or <strong>"Install app"</strong>).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center gap-2 text-[#15803D] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[11px]">4</span>
                      <span>Step 4: Confirm Installation</span>
                    </div>
                    <p className="text-[11px] text-[#475569] pl-7">
                      Click <strong>"Add"</strong> or <strong>"Install"</strong> in the popup prompt. ZeroIndex is now pinned to your phone's app drawer and opens full-screen!
                    </p>
                  </div>
                </div>
              ) : (
                /* IPHONE / SAFARI STEPS */
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center gap-2 text-[#4F46E5] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[11px]">1</span>
                      <span>Step 1: Open in Apple Safari</span>
                    </div>
                    <p className="text-[11px] text-[#475569] pl-7">
                      Launch Apple Safari on your iPhone or iPad and open the ZeroIndex portal.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center gap-2 text-[#4F46E5] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[11px]">2</span>
                      <span>Step 2: Tap the Share Button (⎋)</span>
                    </div>
                    <p className="text-[11px] text-[#475569] pl-7">
                      Tap the <strong>Share icon</strong> (the square box with an arrow pointing upward) located on the bottom navigation bar of Safari.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center gap-2 text-[#4F46E5] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[11px]">3</span>
                      <span>Step 3: Tap "Add to Home Screen" (+)</span>
                    </div>
                    <p className="text-[11px] text-[#475569] pl-7">
                      Scroll down the iOS share sheet and tap <strong>"Add to Home Screen"</strong> with the plus (+) icon.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#DCE7E1] space-y-1">
                    <div className="flex items-center gap-2 text-[#4F46E5] font-bold">
                      <span className="w-5 h-5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center text-[11px]">4</span>
                      <span>Step 4: Tap "Add" in Top-Right</span>
                    </div>
                    <p className="text-[11px] text-[#475569] pl-7">
                      Tap <strong>"Add"</strong> in the top-right corner. The ZeroIndex app icon will appear on your iPhone home screen and open without any Safari URL bars!
                    </p>
                  </div>
                </div>
              )}

              {/* Offline & Performance Benefits Strip */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
                  Why Install as Mobile App:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                  <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-1.5 text-[#15803D]">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Offline Caching</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-1.5 text-[#2E6F40]">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Full-Screen UI</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-[#DCE7E1] flex items-center gap-1.5 text-[#4F46E5]">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Zero App Store Delay</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-[#DCE7E1] flex items-center justify-between">
              <span className="text-[10px] text-[#64748B]">
                ZeroIndex v2.0 · VIIT(A) CSE-DS
              </span>
              <button
                onClick={() => setIsInstallModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#2E6F40] hover:bg-[#235833] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Got It, Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PortalLanding;
