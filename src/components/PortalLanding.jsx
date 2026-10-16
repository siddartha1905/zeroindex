import React, { useState } from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Sparkles, 
  Terminal, 
  Network, 
  Database, 
  BrainCircuit, 
  Compass 
} from 'lucide-react';
import { ViitCrest } from './ViitCrest';
import {
  LeftCourseJourneyWing,
  RightExamBlueprintWing,
  MobileAppInstallModal,
  MobileQuickActionBadge
} from './ZeroIndexSideWings';

export const PortalLanding = ({ onSelectDld, onSelectRoadmaps }) => {
  // Mobile App Shortcut Modal State
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ================================================================= */}
          {/* COMBINED LEFT SIDE WING ("Course Journey & Digital Pulse")         */}
          {/* ================================================================= */}
          <LeftCourseJourneyWing onUnitClick={() => onSelectDld()} />

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
                      I Year B.Tech (Data Science) · Units, Solvers &amp; Practice
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
                  Upcoming Subjects &amp; Tracks
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

            {/* Mobile Viewport Quick Action & Metadata */}
            <MobileQuickActionBadge onOpenInstallModal={() => setIsInstallModalOpen(true)} />

          </main>

          {/* ================================================================= */}
          {/* COMBINED RIGHT SIDE WING ("Exam Blueprint & Mobile App PWA Guide")*/}
          {/* ================================================================= */}
          <RightExamBlueprintWing 
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onNavigateSyllabus={onSelectDld}
            onNavigateRoadmaps={onSelectRoadmaps}
          />

        </div>
      </div>

      {/* Clean bottom padding */}
      <div className="h-2"></div>

      {/* Mobile App Shortcut Modal */}
      <MobileAppInstallModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />

    </div>
  );
};

export default PortalLanding;
