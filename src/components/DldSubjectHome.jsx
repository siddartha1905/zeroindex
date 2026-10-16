import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  Calculator, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  Download,
  BookOpen,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { dldUnit1 } from '../data/dldUnit1';
import {
  LeftCourseJourneyWing,
  RightExamBlueprintWing,
  MobileAppInstallModal,
  MobileQuickActionBadge
} from './ZeroIndexSideWings';

export const DldSubjectHome = ({ onBackToPortal, onOpenWorkspaceTab }) => {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  const cards = [
    {
      id: 'units',
      title: 'Course Units (1-5)',
      description: 'Step-by-step topic notes, formulas, and Data Science context. Unit 1 is live with 6 modular sections, Units 2-5 preview.',
      icon: Layers,
      badge: 'Unit 1 Live',
      badgeColor: 'bg-[#2E6F40]/10 text-[#2E6F40]',
      iconColor: '#2E6F40',
      action: () => onOpenWorkspaceTab('units')
    },
    {
      id: 'solvers',
      title: 'Interactive Visual Solvers',
      description: 'Animated Radix Base Converter (Dec/Bin/Oct/Hex), 2\'s Complement Visualizer, and logic gate simulators.',
      icon: Calculator,
      badge: 'Live Animators',
      badgeColor: 'bg-[#4F46E5]/10 text-[#4F46E5]',
      iconColor: '#4F46E5',
      action: () => onOpenWorkspaceTab('solvers')
    },
    {
      id: 'practice',
      title: 'Practice Questions & Solutions',
      description: 'Model-wise university exam problems, 2\'s complement arithmetic, and click-to-reveal marking schemes.',
      icon: CheckCircle2,
      badge: 'Mid & Sem Prep',
      badgeColor: 'bg-[#D97706]/10 text-[#D97706]',
      iconColor: '#D97706',
      action: () => onOpenWorkspaceTab('practice')
    },
    {
      id: 'syllabus',
      title: 'Exam Notes (PDFs) & Syllabus',
      description: 'Standalone Overleaf Unit 1 PDF notes, prescribed VR23 syllabus with CO1-CO5 outcomes, and Google Drive textbooks.',
      icon: FileText,
      badge: 'PDFs & Books',
      badgeColor: 'bg-[#059669]/10 text-[#059669]',
      iconColor: '#059669',
      action: () => onOpenWorkspaceTab('syllabus')
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col justify-between py-6 px-4 sm:px-8 select-none">
      
      {/* 1. Minimal Top Breadcrumb Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between pb-4 border-b border-[#E2DDD5]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
          <button 
            onClick={onBackToPortal}
            className="hover:text-[#1A1A1A] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="text-[#2E6F40] font-bold">[0]</span> ZeroIndex
          </button>
          <span>/</span>
          <span className="text-[#64748B]">Subjects</span>
          <span>/</span>
          <span className="text-[#1A1A1A] font-semibold">Digital Logic Design</span>
        </div>

        <button
          onClick={onBackToPortal}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#DCE7E1] bg-white hover:bg-[#F2F7F4] text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to ZeroIndex</span>
        </button>
      </div>

      {/* 2. Main 3-Column Spread (Left Wing + Centerpiece Hero + Right Wing) */}
      <div className="max-w-7xl w-full mx-auto my-auto py-4 sm:py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ================================================================= */}
          {/* COMBINED LEFT SIDE WING ("Course Journey & Digital Pulse")         */}
          {/* ================================================================= */}
          <LeftCourseJourneyWing onUnitClick={() => onOpenWorkspaceTab('units')} />

          {/* ================================================================= */}
          {/* CENTERPIECE: DLD Subject Hero with Logic Gates Pen-and-Ink Sketch */}
          {/* ================================================================= */}
          <main className="lg:col-span-6 flex flex-col items-center text-center">
            
            {/* Hand-Drawn Logic Gates (AND/OR/XOR) Black & White Sketch SVG */}
            <div className="w-full max-w-lg mb-4 flex justify-center">
              <div className="relative p-1 w-full">
                <svg 
                  viewBox="0 0 520 220" 
                  className="w-full h-auto drop-shadow-sm" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="dld-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E5DFD5" strokeWidth="0.5" strokeOpacity="0.4" />
                    </pattern>
                  </defs>
                  <rect x="8" y="8" width="504" height="204" rx="4" fill="url(#dld-grid)" stroke="#E5DFD5" strokeWidth="0.8" strokeDasharray="3 3"/>

                  {/* Wire Input 1 */}
                  <text x="24" y="56" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="#1A1A1A" fontWeight="600">IN₁: [1]</text>
                  <path d="M 78 52 L 140 52" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Wire Input 2 */}
                  <text x="24" y="98" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="#1A1A1A" fontWeight="600">IN₂: [0]</text>
                  <path d="M 78 94 L 140 94" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="106" cy="94" r="2.5" fill="#1A1A1A" />
                  <path d="M 106 94 L 106 142 L 140 142" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" />

                  {/* Wire Input 3 */}
                  <text x="24" y="178" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="#1A1A1A" fontWeight="600">IN₃: [1]</text>
                  <path d="M 78 174 L 260 174" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Gate 1: AND Gate */}
                  <g transform="translate(140, 38)">
                    <path d="M 0 0 L 26 0 C 44 0, 44 46, 26 46 L 0 46 Z" stroke="#1A1A1A" strokeWidth="2.2" fill="#FAF8F5" strokeLinejoin="round" />
                    <path d="M 1 1 L 25 1 C 42 1, 42 45, 25 45 L 1 45" stroke="#1A1A1A" strokeWidth="0.7" strokeOpacity="0.35" />
                    <path d="M 6 6 L 14 14 M 10 6 L 18 14" stroke="#1A1A1A" strokeWidth="0.7" strokeOpacity="0.4" />
                    <text x="12" y="28" fontFamily="'Caveat', cursive" fontSize="18" fill="#1A1A1A" fontWeight="bold">AND</text>
                  </g>

                  {/* Gate 2: XOR Gate */}
                  <g transform="translate(140, 120)">
                    <path d="M -8 0 C 2 15, 2 31, -8 46" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M 0 0 C 10 15, 10 31, 0 46 C 22 44, 40 36, 48 23 C 40 10, 22 2, 0 0 Z" stroke="#1A1A1A" strokeWidth="2.2" fill="#FAF8F5" />
                    <text x="11" y="28" fontFamily="'Caveat', cursive" fontSize="17" fill="#1A1A1A" fontWeight="bold">XOR</text>
                  </g>

                  {/* Wires to OR Gate */}
                  <path d="M 184 61 C 225 61, 225 102, 260 102" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 188 143 C 225 143, 225 116, 260 116" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Gate 3: OR Gate */}
                  <g transform="translate(260, 88)">
                    <path d="M 0 0 C 10 14, 10 34, 0 48 C 22 46, 40 38, 50 24 C 40 10, 22 2, 0 0 Z" stroke="#1A1A1A" strokeWidth="2.2" fill="#FAF8F5" />
                    <text x="14" y="29" fontFamily="'Caveat', cursive" fontSize="18" fill="#1A1A1A" fontWeight="bold">OR</text>
                  </g>

                  {/* Output Wire & Indicator Bulb */}
                  <path d="M 310 112 L 380 112" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <g transform="translate(382, 90)">
                    <circle cx="22" cy="22" r="21" stroke="#1A1A1A" strokeWidth="2.2" fill="#FAF8F5" />
                    <circle cx="22" cy="22" r="17" stroke="#1A1A1A" strokeWidth="0.8" strokeDasharray="3 2" />
                    <path d="M 14 27 L 19 16 L 25 16 L 30 27" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="22" y="38" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#1A1A1A" fontWeight="bold">OUTPUT</text>
                    <path d="M 22 -3 L 22 0 M 43 5 L 40 8 M 47 22 L 44 22 M 43 39 L 40 36 M 1 -3 L 4 0" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                  </g>

                  <text x="440" y="108" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#1A1A1A" fontWeight="bold">Y = 1</text>
                  <text x="350" y="152" fontFamily="'Caveat', cursive" fontSize="17" fill="#2E6F40">
                    Y = (A·B) + (B ⊕ C)
                  </text>
                </svg>
              </div>
            </div>

            {/* Course Code Badge */}
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F2F7F4] text-[#2E6F40] border border-[#DCE7E1]">
                Course Code: 1005261102 · I Year, I Semester (Data Science) · L-T-P-C: 3-0-0-3
              </span>
            </div>

            {/* Subject Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-2">
              Digital Logic Design
            </h1>

            {/* DLD Handwritten Quote */}
            <p className="font-handwritten text-xl sm:text-2xl text-[#1A1A1A] max-w-lg leading-relaxed mb-6">
              “Everything in Data Science, from a simple integer in memory to an AI model, begins with a 0 and a 1.”
            </p>

            {/* 3. Grid of 4 Clean Entry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl text-left">
              {cards.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.id}
                    onClick={c.action}
                    className="group p-4 rounded-2xl bg-white border border-[#DCE7E1] hover:border-[#2E6F40] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-center group-hover:scale-105 transition-transform" style={{ color: c.iconColor }}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                          {c.badge}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#2E6F40] transition-colors mb-1">
                        {c.title}
                      </h3>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    <div className="pt-2.5 mt-2.5 border-t border-[#F2F7F4] flex items-center justify-between text-xs font-semibold text-[#2E6F40]">
                      <span>Open Section</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Viewport Quick Action & Metadata */}
            <MobileQuickActionBadge onOpenInstallModal={() => setIsInstallModalOpen(true)} />

          </main>

          {/* ================================================================= */}
          {/* COMBINED RIGHT SIDE WING ("Exam Blueprint & Mobile App PWA Guide")*/}
          {/* ================================================================= */}
          <RightExamBlueprintWing 
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onNavigateSyllabus={() => onOpenWorkspaceTab('syllabus')}
          />

        </div>
      </div>

      <div className="h-2"></div>

      {/* Mobile App Shortcut Modal */}
      <MobileAppInstallModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />

    </div>
  );
};

export default DldSubjectHome;
