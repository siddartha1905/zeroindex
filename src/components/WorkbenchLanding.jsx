import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Calculator, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Terminal, 
  Network, 
  BrainCircuit, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { FromZeroToPossibilityIllustration } from './FromZeroToPossibilityIllustration';

export const WorkbenchLanding = ({ 
  onNavigateHome, 
  onSelectDld, 
  onOpenWorkspaceTab 
}) => {
  const subjects = [
    {
      id: 'dld',
      code: '1005261102',
      title: 'Digital Logic Design',
      semester: 'I Year, I Semester (CSE-DS)',
      status: 'Active Subject',
      isLive: true,
      description: 'Number systems, base conversions, complement arithmetic, Boolean algebra, K-Map minimization, combinational logic, and sequential machines.',
      features: [
        { label: '5 Modular Units', icon: BookOpen },
        { label: '5 Interactive Solvers', icon: Calculator },
        { label: '110+ Quiz Bank', icon: CheckCircle2 },
        { label: 'VR23 Syllabus Notes', icon: Layers },
      ],
      action: onSelectDld,
      primaryActionLabel: 'Enter Course Portal',
    },
    {
      id: 'c-systems',
      code: 'Upcoming Track',
      title: 'C Programming & Systems',
      semester: 'Foundations',
      status: 'In Development',
      isLive: false,
      description: 'Memory layout, pointer arithmetic, structs, stack/heap execution frames, and low-level system engineering.',
      features: [
        { label: 'Pointer Models', icon: Terminal },
        { label: 'Memory Visualizer', icon: Cpu },
      ],
      notes: 'Course materials are being authored.',
    },
    {
      id: 'dsa',
      code: 'Upcoming Track',
      title: 'Data Structures & Algorithms',
      semester: 'Core CS',
      status: 'In Development',
      isLive: false,
      description: 'Linear lists, balanced binary trees, graph traversals, hashing, and asymptotic Big-O algorithmic analysis.',
      features: [
        { label: 'Tree Traversals', icon: Network },
        { label: 'Complexity Proofs', icon: Layers },
      ],
      notes: 'Curriculum structure in progress.',
    },
    {
      id: 'ml',
      code: 'Upcoming Track',
      title: 'Machine Learning Foundations',
      semester: 'Data Science Core',
      status: 'In Development',
      isLive: false,
      description: 'Multivariable calculus, matrix decompositions, gradient descent, linear models, and statistical classification.',
      features: [
        { label: 'Matrix Geometries', icon: Calculator },
        { label: 'Gradient Solvers', icon: Sparkles },
      ],
      notes: 'Mathematical notes being compiled.',
    },
    {
      id: 'dl',
      code: 'Upcoming Track',
      title: 'Deep Learning & Neural Networks',
      semester: 'Advanced AI',
      status: 'In Development',
      isLive: false,
      description: 'Computational graphs, backpropagation calculus, convolutional filters, attention mechanisms, and transformers.',
      features: [
        { label: 'Tensor Graphs', icon: BrainCircuit },
        { label: 'Attention Walkthrough', icon: Network },
      ],
      notes: 'Under active curriculum design.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation & Top Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE2DA]">
          <nav className="flex items-center gap-2 text-xs font-technical text-[#5F6C64]">
            <button 
              onClick={onNavigateHome}
              className="hover:text-[#245B4B] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ZeroIndex</span>
            </button>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#346C53] font-bold">01 The Workbench</span>
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Academic Learning &amp; Engineering Subjects
          </span>
        </div>

        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0EBDF] border border-[#346C53]/30 text-xs font-technical font-bold text-[#346C53]">
            <span>PILLAR 01</span>
            <span>·</span>
            <span>ACADEMIC CURRICULA</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
            The Workbench
          </h1>
          <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
            "Subjects, notes and practical tools for working through the fundamentals."
          </p>
        </div>

        {/* Signature Illustration: From Zero to Possibility */}
        <div className="w-full">
          <FromZeroToPossibilityIllustration />
        </div>

        {/* Academic Subject Catalog */}
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#DDE2DA]">
            <div>
              <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                Course Catalog &amp; Subject Modules
              </h2>
              <p className="text-xs text-[#5F6C64] mt-1">
                Authored for undergraduate foundational rigor at Vignan's Institute of Information Technology (A)
              </p>
            </div>
            <span className="font-technical text-xs text-[#346C53] font-semibold">
              1 Active Subject · 4 In Development
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Primary Active Subject Card: Digital Logic Design (Takes 2 Columns on desktop) */}
            <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-[#346C53]/40 shadow-soft relative overflow-hidden flex flex-col justify-between space-y-6">
              
              {/* Subtle top indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-technical font-bold bg-[#E0EBDF] text-[#346C53] border border-[#346C53]/30">
                    ACTIVE SUBJECT · 1005261102
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-technical text-[#5F6C64] bg-[#F0F1EB]">
                    I Year, I Semester
                  </span>
                </div>
                <span className="text-xs font-technical text-[#346C53] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#346C53] animate-pulse" />
                  Full Subject Available
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#25352D]">
                  Digital Logic Design
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed max-w-xl">
                  Number systems, base conversions, complement arithmetic, Boolean algebra, K-Map minimization, combinational circuits, and sequential machines.
                </p>
              </div>

              {/* 4 Feature Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {subjects[0].features.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-[#F7F5EF] border border-[#DDE2DA] text-xs font-semibold text-[#25352D] flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4 text-[#346C53] shrink-0" />
                      <span>{feat.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E6E8E1] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-technical">
                  <span className="text-[#5F6C64]">Quick Jump:</span>
                  <button
                    onClick={() => onOpenWorkspaceTab('solvers')}
                    className="px-2.5 py-1 rounded-md bg-[#F0F1EB] hover:bg-[#E0EBDF] text-[#346C53] font-semibold border border-[#DDE2DA] transition-colors cursor-pointer"
                  >
                    ⚡ Solvers
                  </button>
                  <button
                    onClick={() => onOpenWorkspaceTab('practice')}
                    className="px-2.5 py-1 rounded-md bg-[#F0F1EB] hover:bg-[#E0EBDF] text-[#346C53] font-semibold border border-[#DDE2DA] transition-colors cursor-pointer"
                  >
                    🎯 110+ Quiz
                  </button>
                </div>

                <button
                  onClick={onSelectDld}
                  className="px-6 py-3 rounded-xl bg-[#245B4B] hover:bg-[#28755E] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer group"
                >
                  <span>Enter Course Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Upcoming Track Cards (Honest status, no fabrication) */}
            {subjects.slice(1).map((subj) => (
              <div 
                key={subj.id}
                className="p-6 rounded-3xl bg-white border border-[#DDE2DA] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-technical text-xs text-[#5F6C64]">{subj.semester}</span>
                    <span className="text-[10px] font-technical font-bold px-2 py-0.5 rounded-full bg-[#F0F1EB] text-[#5F6C64] border border-[#DDE2DA]">
                      {subj.status}
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#25352D] mb-1.5">
                    {subj.title}
                  </h3>

                  <p className="text-xs text-[#5F6C64] leading-relaxed mb-3">
                    {subj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6E8E1] text-[11px] font-technical text-[#69766D] flex items-center justify-between">
                  <span>{subj.notes}</span>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkbenchLanding;
