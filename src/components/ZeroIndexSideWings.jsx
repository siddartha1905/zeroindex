import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  RotateCw, 
  Layers, 
  BookOpen, 
  Download, 
  Smartphone, 
  HelpCircle, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Share2,
  Cpu,
  Terminal,
  Network,
  Database,
  BrainCircuit,
  Calculator,
  Compass
import { dldResourceConfig } from '../data/dldResourceConfig';
import { dldSyllabus } from '../data/dldSyllabus';

// Curated DLD & Computer Science Engineering Trivia Snippets
export const TRIVIA_SNIPPETS = [
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

// ============================================================================
// 1. DLD COURSE LEFT SIDE WING ("Course Journey & Digital Pulse")
// ============================================================================
export const LeftCourseJourneyWing = ({ onUnitClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const currentSnippet = TRIVIA_SNIPPETS[factIndex];

  return (
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
              Course Journey &amp; Digital Pulse
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
              Live Chrono-Widget
            </span>
            <span className="text-[10px] text-[#15803D] font-bold">UTC+05:30</span>
          </div>

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

        {/* 2. Syllabus Flow (Units 1 to 5) Interactive Connected Timeline */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2.5 font-mono">
          <div className="flex items-center justify-between pb-1 border-b border-[#F2F7F4]">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#2E6F40]" />
              <span className="text-xs font-bold text-[#0F172A]">Syllabus Flow (Units 1 to 5)</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#DCFCE7] text-[#15803D] font-bold">
              VR23
            </span>
          </div>

          <div className="space-y-2 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#DCE7E1] before:border-l before:border-dashed before:border-[#2E6F40]/50">
            {/* Unit 1: Active */}
            <div 
              onClick={() => onUnitClick && onUnitClick(1)}
              className="relative group cursor-pointer"
            >
              <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#15803D] border-2 border-white shadow-xs" />
              <div className="p-2 rounded-lg bg-[#F2F7F4] hover:bg-[#EAF2ED] border border-[#86EFAC] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#15803D]">Unit 1: Binary Arithmetic</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#15803D] text-white">Active</span>
                </div>
                <div className="text-[10px] text-[#475569] truncate">Number Systems, Conversions &amp; Complements</div>
              </div>
            </div>

            {/* Unit 2 */}
            <div className="relative group">
              <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#CBD5E1] border-2 border-white" />
              <div className="p-2 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#DCE7E1] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#1E293B]">Unit 2: Minimization</span>
                  <span className="text-[9px] text-[#D97706] font-bold">Preview</span>
                </div>
                <div className="text-[10px] text-[#64748B] truncate">Boolean Algebra &amp; 4-Var K-Maps</div>
              </div>
            </div>

            {/* Unit 3 */}
            <div className="relative group">
              <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#CBD5E1] border-2 border-white" />
              <div className="p-2 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#DCE7E1] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#1E293B]">Unit 3: Combinational</span>
                  <span className="text-[9px] text-[#64748B]">Preview</span>
                </div>
                <div className="text-[10px] text-[#64748B] truncate">Adders, Decoders, Encoders, MUX</div>
              </div>
            </div>

            {/* Unit 4 */}
            <div className="relative group">
              <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#CBD5E1] border-2 border-white" />
              <div className="p-2 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#DCE7E1] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#1E293B]">Unit 4: Sequential</span>
                  <span className="text-[9px] text-[#64748B]">Preview</span>
                </div>
                <div className="text-[10px] text-[#64748B] truncate">Latches, Flip-Flops &amp; Tables</div>
              </div>
            </div>

            {/* Unit 5 */}
            <div className="relative group">
              <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#CBD5E1] border-2 border-white" />
              <div className="p-2 rounded-lg bg-white hover:bg-[#FAF8F5] border border-[#DCE7E1] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#1E293B]">Unit 5: Registers</span>
                  <span className="text-[9px] text-[#64748B]">Preview</span>
                </div>
                <div className="text-[10px] text-[#64748B] truncate">Shift Registers &amp; Counters</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Daily Index 0 Bit */}
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
              onClick={() => setFactIndex((prev) => (prev + 1) % TRIVIA_SNIPPETS.length)}
              title="Next Trivia Bit"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2E6F40] hover:text-[#1F4A2B] px-1.5 py-0.5 rounded bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#2E6F40]/40 transition-all cursor-pointer"
            >
              <RotateCw className="w-2.5 h-2.5" />
              <span>Next</span>
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#D97706] tracking-wider block">
              {currentSnippet.tag}
            </span>
            <h4 className="text-xs font-bold text-[#0F172A] leading-snug">
              {currentSnippet.title}: <span className="text-[#475569] font-normal">{currentSnippet.subtitle}</span>
            </h4>
            <p className="text-[11px] text-[#334155] leading-relaxed pt-1 border-t border-[#F2F7F4]">
              {currentSnippet.fact}
            </p>
          </div>

          <div className="text-[9px] text-[#64748B] flex items-center justify-between pt-1 border-t border-[#F2F7F4]">
            <span>Snippet #{factIndex + 1} of {TRIVIA_SNIPPETS.length}</span>
            <span className="text-[#2E6F40] font-semibold">CS Fundamentals</span>
          </div>
        </div>

      </div>
    </aside>
  );
};

// ============================================================================
// 2. DLD COURSE RIGHT SIDE WING ("Exam Blueprint & Mobile App PWA Guide")
// ============================================================================
export const RightExamBlueprintWing = ({ 
  onOpenInstallModal, 
  onNavigateSyllabus, 
  onNavigateRoadmaps 
}) => {
  return (
    <aside className="hidden lg:flex flex-col gap-4 lg:col-span-3">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F3EFE6]/85 border border-[#DCE7E1] shadow-soft backdrop-blur-xs space-y-4 relative overflow-hidden">
        
        {/* Wing Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
          <span className="font-handwritten text-xl font-bold text-[#4F46E5]">
            Exam Blueprint &amp; Mobile App
          </span>
          <span className="text-[10px] font-mono text-[#4F46E5] uppercase bg-[#EEF2FF] border border-[#C7D2FE] px-2 py-0.5 rounded font-bold">
            CO1 - CO5
          </span>
        </div>

        {/* 1. Course Outcomes (CO1 to CO5) Summary Box */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2 font-mono">
          <div className="flex items-center justify-between pb-1 border-b border-[#F2F7F4]">
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#4F46E5]" />
              Course Outcomes (CO1-CO5)
            </span>
            <span className="text-[9px] text-[#64748B]">VR23 Official</span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] flex items-start gap-1.5">
              <span className="px-1 py-0.2 rounded bg-[#EEF2FF] text-[#4F46E5] font-bold">CO1</span>
              <span className="text-[#334155] leading-snug">Number systems, conversions &amp; complement arithmetic.</span>
            </div>
            <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] flex items-start gap-1.5">
              <span className="px-1 py-0.2 rounded bg-[#EEF2FF] text-[#4F46E5] font-bold">CO2</span>
              <span className="text-[#334155] leading-snug">Minimize functions using K-Maps &amp; Tabular method.</span>
            </div>
            <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] flex items-start gap-1.5">
              <span className="px-1 py-0.2 rounded bg-[#EEF2FF] text-[#4F46E5] font-bold">CO3</span>
              <span className="text-[#334155] leading-snug">Design combinational adders, MUX, decoders.</span>
            </div>
            <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] flex items-start gap-1.5">
              <span className="px-1 py-0.2 rounded bg-[#EEF2FF] text-[#4F46E5] font-bold">CO4</span>
              <span className="text-[#334155] leading-snug">Synthesize sequential flip-flops &amp; counters.</span>
            </div>
            <div className="p-1.5 rounded bg-[#FAF8F5] border border-[#DCE7E1] flex items-start gap-1.5">
              <span className="px-1 py-0.2 rounded bg-[#EEF2FF] text-[#4F46E5] font-bold">CO5</span>
              <span className="text-[#334155] leading-snug">Design registers, shift registers &amp; counters.</span>
            </div>
          </div>
        </div>

        {/* 2. Direct Quick-Jump Badges for Unit Notes PDFs, Morris Mano, Roth */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2 font-mono">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
            Google Drive Study Materials:
          </span>
          <div className="flex flex-col gap-1.5">
            {dldResourceConfig.units[1]?.driveUrl ? (
              <a
                href={dldResourceConfig.units[1].driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#86EFAC] text-xs font-bold text-[#15803D] flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Unit 1 Notes PDF</span>
                </div>
                <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">Download ↗</span>
              </a>
            ) : (
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] text-[#64748B] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-semibold text-[#1E293B]">Unit 1 Notes</span>
                </div>
                <span className="text-[10px] text-amber-600 font-medium">Link soon</span>
              </div>
            )}

            {dldResourceConfig.textbooks[0]?.driveUrl ? (
              <a
                href={dldResourceConfig.textbooks[0].driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-xs font-semibold text-[#1E293B] flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>M. Morris Mano</span>
                </div>
                <span className="text-[10px] text-[#64748B] group-hover:text-[#4F46E5]">5th Ed PEA ↗</span>
              </a>
            ) : (
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] text-[#64748B] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#4F46E5]" />
                  <span>M. Morris Mano</span>
                </div>
                <span className="text-[10px] text-amber-600 font-medium">Link soon</span>
              </div>
            )}

            {dldResourceConfig.textbooks[1]?.driveUrl ? (
              <a
                href={dldResourceConfig.textbooks[1].driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] text-xs font-semibold text-[#1E293B] flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>C.H. Roth</span>
                </div>
                <span className="text-[10px] text-[#64748B] group-hover:text-[#D97706]">5th Ed Cengage ↗</span>
              </a>
            ) : (
              <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] text-[#64748B] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>C.H. Roth</span>
                </div>
                <span className="text-[10px] text-amber-600 font-medium">Link soon</span>
              </div>
            )}
          </div>
        </div>

        {/* 3. [?] Install as Mobile App (PWA Guide Card & Button) */}
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
            Pin ZeroIndex directly to your Android or iPhone home screen for fast, full-screen offline access in classrooms.
          </p>

          <button
            onClick={onOpenInstallModal}
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

        {/* 4. Portal Metadata */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs text-center font-mono space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] block">
            Official Course Metadata
          </span>
          <div className="text-xs font-bold text-[#0F172A]">
            Course Code: 1005261102 · J. Siddartha Varma · VIIT(A)
          </div>
          <div className="text-[10px] text-[#64748B]">
            Assistant Professor, Dept of CSE-DS · VIIT(A)
          </div>
        </div>

      </div>
    </aside>
  );
};

// ============================================================================
// 3. GENERALIZED MAIN PORTAL LEFT SIDE WING ("Portal Pulse & Subject Directory")
// ============================================================================
export const LeftPortalDirectoryWing = ({ onSelectDld }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const currentSnippet = TRIVIA_SNIPPETS[factIndex];

  const subjects = [
    {
      id: 'dld',
      name: 'Digital Logic Design',
      level: 'I Year CSE-DS',
      status: 'Active Live',
      isActive: true,
      desc: 'Binary arithmetic, logic gates, K-maps & solvers',
      icon: Cpu,
      action: onSelectDld
    },
    {
      id: 'c-prog',
      name: 'C Programming & Systems',
      level: 'I Year B.Tech',
      status: 'Coming Soon',
      isActive: false,
      desc: 'Pointers, memory architecture & algorithms',
      icon: Terminal
    },
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      level: 'II Year B.Tech',
      status: 'Coming Soon',
      isActive: false,
      desc: 'Trees, graphs, dynamic programming & complexity',
      icon: Network
    },
    {
      id: 'ml',
      name: 'Machine Learning Foundations',
      level: 'II Year CSE-DS',
      status: 'Coming Soon',
      isActive: false,
      desc: 'Loss surfaces, gradient descent & linear algebra',
      icon: Database
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence & Neural Nets',
      level: 'III Year CSE-DS',
      status: 'Coming Soon',
      isActive: false,
      desc: 'Deep networks, backpropagation & PyTorch tensors',
      icon: BrainCircuit
    }
  ];

  return (
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
              Portal Pulse &amp; Directory
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
              Live Chrono-Widget
            </span>
            <span className="text-[10px] text-[#15803D] font-bold">UTC+05:30</span>
          </div>

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

        {/* 2. ZeroIndex Subject Directory */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2.5 font-mono">
          <div className="flex items-center justify-between pb-1 border-b border-[#F2F7F4]">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#2E6F40]" />
              <span className="text-xs font-bold text-[#0F172A]">ZeroIndex Subject Directory</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#EEF2FF] text-[#4F46E5] font-bold">
              CSE-DS
            </span>
          </div>

          <div className="space-y-1.5">
            {subjects.map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.id}
                  onClick={sub.isActive ? sub.action : undefined}
                  className={`p-2 rounded-lg border transition-all ${
                    sub.isActive
                      ? 'bg-[#F2F7F4] hover:bg-[#EAF2ED] border-[#86EFAC] cursor-pointer group shadow-2xs'
                      : 'bg-white border-[#DCE7E1] opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${sub.isActive ? 'text-[#15803D]' : 'text-[#64748B]'}`} />
                      <span className={`text-[11px] font-bold ${sub.isActive ? 'text-[#15803D] group-hover:underline' : 'text-[#1E293B]'}`}>
                        {sub.name}
                      </span>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      sub.isActive ? 'bg-[#15803D] text-white' : 'bg-[#FEF3C7] text-[#92400E]'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#64748B] pl-5 truncate">
                    {sub.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Daily Index 0 Bit */}
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
              onClick={() => setFactIndex((prev) => (prev + 1) % TRIVIA_SNIPPETS.length)}
              title="Next Trivia Bit"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2E6F40] hover:text-[#1F4A2B] px-1.5 py-0.5 rounded bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#2E6F40]/40 transition-all cursor-pointer"
            >
              <RotateCw className="w-2.5 h-2.5" />
              <span>Next</span>
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#D97706] tracking-wider block">
              {currentSnippet.tag}
            </span>
            <h4 className="text-xs font-bold text-[#0F172A] leading-snug">
              {currentSnippet.title}: <span className="text-[#475569] font-normal">{currentSnippet.subtitle}</span>
            </h4>
            <p className="text-[11px] text-[#334155] leading-relaxed pt-1 border-t border-[#F2F7F4]">
              {currentSnippet.fact}
            </p>
          </div>

          <div className="text-[9px] text-[#64748B] flex items-center justify-between pt-1 border-t border-[#F2F7F4]">
            <span>Snippet #{factIndex + 1} of {TRIVIA_SNIPPETS.length}</span>
            <span className="text-[#2E6F40] font-semibold">CS Fundamentals</span>
          </div>
        </div>

      </div>
    </aside>
  );
};

// ============================================================================
// 4. GENERALIZED MAIN PORTAL RIGHT SIDE WING ("Portal Tools & Mobile App")
// ============================================================================
export const RightPortalToolsWing = ({ 
  onOpenInstallModal, 
  onSelectDld, 
  onSelectRoadmaps 
}) => {
  return (
    <aside className="hidden lg:flex flex-col gap-4 lg:col-span-3">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F3EFE6]/85 border border-[#DCE7E1] shadow-soft backdrop-blur-xs space-y-4 relative overflow-hidden">
        
        {/* Wing Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
          <span className="font-handwritten text-xl font-bold text-[#4F46E5]">
            Portal Tools &amp; Mobile App
          </span>
          <span className="text-[10px] font-mono text-[#4F46E5] uppercase bg-[#EEF2FF] border border-[#C7D2FE] px-2 py-0.5 rounded font-bold">
            PWA Ready
          </span>
        </div>

        {/* 1. Global Portal Navigation */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs space-y-2 font-mono">
          <div className="flex items-center justify-between pb-1 border-b border-[#F2F7F4]">
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#4F46E5]" />
              Global Portal Navigation
            </span>
            <span className="text-[9px] text-[#64748B]">Platform Hub</span>
          </div>

          <div className="space-y-1.5">
            {/* Interactive Solvers Hub */}
            <div 
              onClick={onSelectDld}
              className="p-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#2E6F40] transition-all cursor-pointer group flex items-start gap-2 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center text-[#2E6F40] flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <Calculator className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-[#1E293B] group-hover:text-[#2E6F40] flex items-center justify-between">
                  <span>Interactive Solvers Hub</span>
                  <ArrowRight className="w-3 h-3 text-[#64748B] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[10px] text-[#64748B] leading-tight">
                  Radix base converter, 2's complement visualizer &amp; logic gates
                </div>
              </div>
            </div>

            {/* All Subject Portals */}
            <div 
              onClick={onSelectRoadmaps}
              className="p-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EEF2FF] border border-[#DCE7E1] hover:border-[#4F46E5] transition-all cursor-pointer group flex items-start gap-2 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center text-[#4F46E5] flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-[#1E293B] group-hover:text-[#4F46E5] flex items-center justify-between">
                  <span>All Subject Portals</span>
                  <ArrowRight className="w-3 h-3 text-[#64748B] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[10px] text-[#64748B] leading-tight">
                  B.Tech CSE-DS curriculum map &amp; semester pathways
                </div>
              </div>
            </div>

            {/* Faculty Research Index */}
            <div 
              onClick={onSelectRoadmaps}
              className="p-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#FFFBEB] border border-[#DCE7E1] hover:border-[#D97706] transition-all cursor-pointer group flex items-start gap-2 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-[#DCE7E1] flex items-center justify-center text-[#D97706] flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-[#1E293B] group-hover:text-[#D97706] flex items-center justify-between">
                  <span>Faculty Research Index</span>
                  <ArrowRight className="w-3 h-3 text-[#64748B] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[10px] text-[#64748B] leading-tight">
                  Data science labs, publications &amp; project mentorship
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. [?] Install as Mobile App (PWA Pinned Shortcut Guide) */}
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
            Pin ZeroIndex directly to your Android or iPhone home screen for fast, full-screen offline access in classrooms.
          </p>

          <button
            onClick={onOpenInstallModal}
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

        {/* 3. Portal Metadata */}
        <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] shadow-2xs text-center font-mono space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] block">
            Official Platform Metadata
          </span>
          <div className="text-xs font-bold text-[#0F172A]">
            ZeroIndex Platform v2.0 · Maintained by J. Siddartha Varma · Dept of CSE-DS, VIIT(A)
          </div>
          <div className="text-[10px] text-[#64748B]">
            Autonomous Institution · Visakhapatnam
          </div>
        </div>

      </div>
    </aside>
  );
};

// ============================================================================
// 5. STEP-BY-STEP MOBILE APP INSTALLATION MODAL
// ============================================================================
export const MobileAppInstallModal = ({ isOpen, onClose }) => {
  const [installPlatform, setInstallPlatform] = useState('android');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
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
            onClick={onClose}
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
            ZeroIndex Platform v2.0 · Dept of CSE-DS · VIIT(A)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2E6F40] hover:bg-[#235833] text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Got It, Close
          </button>
        </div>

      </div>
    </div>
  );
};

// ============================================================================
// 6. MOBILE/TABLET QUICK ACTION STRIP (visible on < lg viewports)
// ============================================================================
export const MobileQuickActionBadge = ({ 
  onOpenInstallModal, 
  metadataText = "ZeroIndex Platform v2.0 · Maintained by J. Siddartha Varma · Dept of CSE-DS, VIIT(A)" 
}) => {
  return (
    <div className="lg:hidden w-full max-w-md pt-6 mt-4 border-t border-[#E2DDD5] space-y-3 font-mono">
      <button
        onClick={onOpenInstallModal}
        className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#DCE7E1] hover:bg-[#F2F7F4] text-[#2E6F40] font-bold text-xs shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
      >
        <HelpCircle className="w-4 h-4 text-[#2E6F40]" />
        <span>[?] Install as Mobile App (PWA Guide)</span>
      </button>
      <div className="text-[10px] text-[#64748B] text-center">
        {metadataText}
      </div>
    </div>
  );
};
