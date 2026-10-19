import React, { useRef } from 'react';
import { 
  ArrowRight, 
  ArrowDown, 
  BookOpen, 
  Compass, 
  Briefcase, 
  Radio, 
  FileText
} from 'lucide-react';
import { KnowledgeTreeIllustration } from './KnowledgeTreeIllustration';

export const MainHome = ({ 
  onNavigate, 
  onOpenAboutModal, 
  onOpenInstallModal 
}) => {
  const pillarsRef = useRef(null);

  const scrollToPillars = () => {
    pillarsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    {
      id: 'workbench',
      number: '01',
      name: 'The Workbench',
      category: 'Academic Learning',
      accent: '#285C49',
      softAccent: '#DDEADD',
      tag: 'Digital Logic Design & Systems',
      description: 'Subjects, structured notes and practical tools for learning through fundamentals.',
      actionLabel: 'Enter The Workbench',
      icon: BookOpen,
      borderColor: 'hover:border-[#285C49]',
    },
    {
      id: 'atlas',
      number: '02',
      name: 'The Atlas',
      category: 'Structured Pathways',
      accent: '#496D91',
      softAccent: '#E1EAF2',
      tag: 'Engineering Roadmaps',
      description: 'Learning roadmaps that help you understand what to study, in what order, and where to begin.',
      actionLabel: 'Explore The Atlas',
      icon: Compass,
      borderColor: 'hover:border-[#496D91]',
    },
    {
      id: 'bridge',
      number: '03',
      name: 'The Bridge',
      category: 'Professional Readiness',
      accent: '#C38A63',
      softAccent: '#F5EBE1',
      tag: 'Interview & Aptitude Practice',
      description: 'Preparation for placements, interviews and the move from study into professional work.',
      actionLabel: 'Cross The Bridge',
      icon: Briefcase,
      borderColor: 'hover:border-[#C38A63]',
    },
    {
      id: 'readout',
      number: '04',
      name: 'The Readout',
      category: 'Technical Publication',
      accent: '#765C90',
      softAccent: '#EBE5F0',
      tag: 'Computing & Science Notes',
      description: 'Developments in technology and science, explained with clarity and curiosity.',
      actionLabel: 'Open The Readout',
      icon: Radio,
      borderColor: 'hover:border-[#765C90]',
    },
    {
      id: 'folio',
      number: '05',
      name: 'The Folio',
      category: 'Personal Essays',
      accent: '#935F5D',
      softAccent: '#F3E6E3',
      tag: 'Writing & Reflection',
      description: 'Essays, reflections and personal observations I want to put into words.',
      actionLabel: 'Read The Folio',
      icon: FileText,
      borderColor: 'hover:border-[#935F5D]',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      {/* =========================================================================
          SECTION 1: TWO-COLUMN EDITORIAL HERO
      ========================================================================= */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Natural Editorial Story (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Restrained Label */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDEADD] border border-[#285C49]/25 font-technical text-xs font-semibold text-[#285C49] tracking-wide shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#285C49]" />
                Five sections. One framework.
              </span>
            </div>

            {/* Main Headline & Approved Descriptions */}
            <div className="space-y-4">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#293B32] leading-[1.1] max-w-xl text-balance">
                A place to begin, and many directions to go.
              </h1>
              
              <div className="space-y-3 pt-1">
                <p className="text-base sm:text-lg text-[#293B32] leading-relaxed max-w-xl font-normal">
                  ZeroIndex is where I bring together academic learning, structured roadmaps, career preparation, technology observations and personal writing.
                </p>

                <p className="text-sm sm:text-base text-[#5F6C64] leading-relaxed max-w-xl font-normal">
                  A calm, clear space for students and independent learners to begin with clarity, explore ideas and move forward with direction.
                </p>
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={scrollToPillars}
                className="px-6 py-3 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-sm font-semibold shadow-soft hover:shadow-lift transition-all flex items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49] focus-visible:ring-offset-2"
              >
                <span>Explore ZeroIndex</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenAboutModal}
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#F3F1EC] text-[#293B32] text-sm font-semibold border border-[#DDE2DA] shadow-2xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49] focus-visible:ring-offset-2"
              >
                About ZeroIndex
              </button>
            </div>

          </div>

          {/* Right Column: Signature Knowledge Tree Illustration (6 cols) */}
          <div className="lg:col-span-6">
            <KnowledgeTreeIllustration 
              onSelectBranch={(pillarId) => onNavigate(pillarId)}
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FIVE PILLARS INTRODUCTION ("Inside ZeroIndex")
      ========================================================================= */}
      <section ref={pillarsRef} id="pillars" className="max-w-7xl mx-auto space-y-8 scroll-mt-24">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#DDE2DA] text-left">
          <div>
            <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#285C49]">
              The Core Architecture
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#293B32] mt-1">
              Inside ZeroIndex
            </h2>
          </div>
          <span className="font-technical text-xs text-[#5F6C64]">
            Choose a section to enter its workspace.
          </span>
        </div>

        {/* 5 Pillar Cards: Desktop arrangement: 
            First row: Workbench, Atlas, Bridge (each lg:col-span-2)
            Second row: Readout, Folio (each lg:col-span-3, equal-width balanced cards)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 text-left">
          
          {/* Card 01: The Workbench */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate('workbench')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('workbench');
              }
            }}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#285C49] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group col-span-1 md:col-span-1 lg:col-span-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#DDEADD] text-[#285C49]">
                  01
                </span>
                <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                  {pillars[0].category}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#293B32] group-hover:text-[#285C49] transition-colors">
                  {pillars[0].name}
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal">
                  {pillars[0].description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold text-[#285C49]">
              <span>{pillars[0].actionLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 02: The Atlas */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate('atlas')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('atlas');
              }
            }}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#496D91] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group col-span-1 md:col-span-1 lg:col-span-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496D91]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">
                  02
                </span>
                <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                  {pillars[1].category}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#293B32] group-hover:text-[#496D91] transition-colors">
                  {pillars[1].name}
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal">
                  {pillars[1].description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold text-[#496D91]">
              <span>{pillars[1].actionLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 03: The Bridge */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate('bridge')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('bridge');
              }
            }}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#C38A63] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group col-span-1 md:col-span-2 lg:col-span-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C38A63]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F5EBE1] text-[#C38A63]">
                  03
                </span>
                <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                  {pillars[2].category}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#293B32] group-hover:text-[#C38A63] transition-colors">
                  {pillars[2].name}
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal">
                  {pillars[2].description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold text-[#C38A63]">
              <span>{pillars[2].actionLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 04: The Readout (Balanced Row 2 - spans 3 cols on lg) */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate('readout')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('readout');
              }
            }}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#765C90] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group col-span-1 md:col-span-1 lg:col-span-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#765C90]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EBE5F0] text-[#765C90]">
                  04
                </span>
                <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                  {pillars[3].category}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#293B32] group-hover:text-[#765C90] transition-colors">
                  {pillars[3].name}
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal">
                  {pillars[3].description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold text-[#765C90]">
              <span>{pillars[3].actionLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 05: The Folio (Balanced Row 2 - spans 3 cols on lg) */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onNavigate('folio')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('folio');
              }
            }}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#935F5D] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group col-span-1 md:col-span-1 lg:col-span-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#935F5D]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F3E6E3] text-[#935F5D]">
                  05
                </span>
                <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                  {pillars[4].category}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#293B32] group-hover:text-[#935F5D] transition-colors">
                  {pillars[4].name}
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal">
                  {pillars[4].description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold text-[#935F5D]">
              <span>{pillars[4].actionLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 3: WHY I BUILT ZEROINDEX
      ========================================================================= */}
      <section className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-6">
        <div className="space-y-1.5 border-b border-[#E5E8E1] pb-5">
          <span className="font-technical text-xs font-semibold uppercase tracking-wider text-[#285C49]">
            The Motivation
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#293B32]">
            Why I built ZeroIndex
          </h3>
          <p className="font-technical text-xs text-[#5F6C64]">
            Curated by J. Siddartha Varma
          </p>
        </div>

        <div className="text-base text-[#293B32]/90 leading-relaxed space-y-4 font-normal">
          <p>
            I began building ZeroIndex in response to something I repeatedly noticed in technical education: many students do not struggle only because the subjects are difficult, but because the starting points are unclear, the pathways are fragmented, and the bigger picture is often missing.
          </p>
          <p>
            ZeroIndex is my attempt to bring those pieces together. It is a space for academic foundations, structured learning paths, career preparation, technology writing and personal reflection, each in its own section, but all connected by a common intention: to help learners begin with clarity and move forward with direction.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-technical">
          <button
            onClick={onOpenAboutModal}
            className="text-[#285C49] font-semibold hover:text-[#1E4738] hover:underline cursor-pointer flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49] rounded-md"
          >
            <span>Learn more about the platform</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default MainHome;
