import React, { useRef } from 'react';
import { 
  ArrowRight, 
  ArrowDown, 
  BookOpen, 
  Compass, 
  Briefcase, 
  Radio, 
  FileText, 
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { KnowledgeTreeIllustration } from './KnowledgeTreeIllustration';
import { ViitCrest } from './ViitCrest';

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
      accent: '#346C53',
      softAccent: '#E0EBDF',
      tag: 'Digital Logic Design & Systems',
      description: 'Subjects, notes and practical tools for working through the fundamentals.',
      actionLabel: 'Enter The Workbench',
      icon: BookOpen,
    },
    {
      id: 'atlas',
      number: '02',
      name: 'The Atlas',
      category: 'Structured Pathways',
      accent: '#496D91',
      softAccent: '#E1EAF2',
      tag: 'Engineering Roadmaps',
      description: 'Learning routes that help you decide what to study next.',
      actionLabel: 'Explore The Atlas',
      icon: Compass,
    },
    {
      id: 'bridge',
      number: '03',
      name: 'The Bridge',
      category: 'Professional Readiness',
      accent: '#956A43',
      softAccent: '#F1E5D9',
      tag: 'Interview & Aptitude Practice',
      description: 'Practice and preparation for the move into professional work.',
      actionLabel: 'Cross The Bridge',
      icon: Briefcase,
    },
    {
      id: 'readout',
      number: '04',
      name: 'The Readout',
      category: 'Technical Publication',
      accent: '#765C90',
      softAccent: '#EBE5F0',
      tag: 'Computing & Science Notes',
      description: 'Developments in technology and science, examined with curiosity.',
      actionLabel: 'Open The Readout',
      icon: Radio,
    },
    {
      id: 'folio',
      number: '05',
      name: 'The Folio',
      category: 'Personal Essays',
      accent: '#935F5D',
      softAccent: '#F2E5E1',
      tag: 'Writing & Reflection',
      description: 'Essays, observations and ideas I want to put into words.',
      actionLabel: 'Read The Folio',
      icon: FileText,
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0EBDF] border border-[#346C53]/30 font-technical text-xs font-bold text-[#346C53] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#245B4B]" />
                Independent Academic Publication
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#25352D] leading-[1.08]">
                A place to begin, and many directions to go.
              </h1>
              
              <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] leading-relaxed max-w-xl">
                "ZeroIndex is where I bring together the things I teach, study and write about. There are five sections to explore, each with its own purpose."
              </p>

              <p className="text-sm sm:text-base text-[#5F6C64] leading-relaxed max-w-xl font-normal">
                From undergraduate classroom notes in Digital Logic Design to structured computer systems roadmaps, interview preparation, and technical field notes.
              </p>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToPillars}
                className="px-7 py-3.5 rounded-xl bg-[#245B4B] hover:bg-[#28755E] text-white text-sm font-bold shadow-soft transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore ZeroIndex</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenAboutModal}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#F0F1EB] text-[#25352D] text-sm font-semibold border border-[#DDE2DA] shadow-2xs transition-colors cursor-pointer"
              >
                About this project
              </button>
            </div>

            {/* Restrained Origin Subtitle */}
            <div className="pt-2 text-xs font-technical text-[#69766D] flex items-center gap-2">
              <span className="font-bold text-[#25352D]">[0]</span>
              <span>Every meaningful learning journey in computing begins from index zero.</span>
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
            <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#245B4B]">
              The Core Architecture
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#25352D] mt-1">
              Inside ZeroIndex
            </h2>
            <p className="font-editorial italic text-base text-[#5F6C64] mt-1">
              "Five sections, each built around a different kind of work."
            </p>
          </div>
          <span className="font-technical text-xs text-[#69766D]">
            Select any section to enter its dedicated workspace
          </span>
        </div>

        {/* 5 Pillar Cards: Row 1 has 3 cards, Row 2 has 2 wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* Card 01: The Workbench */}
          <div
            onClick={() => onNavigate('workbench')}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#346C53] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E0EBDF] text-[#346C53]">
                  01
                </span>
                <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                  {pillars[0].category}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#25352D] group-hover:text-[#346C53] transition-colors">
                  {pillars[0].name}
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal">
                  {pillars[0].description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold text-[#346C53]">
              <span>{pillars[0].actionLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 02: The Atlas */}
          <div
            onClick={() => onNavigate('atlas')}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#496D91] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
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
                <h3 className="font-editorial text-2xl font-bold text-[#25352D] group-hover:text-[#496D91] transition-colors">
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
            onClick={() => onNavigate('bridge')}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#956A43] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F1E5D9] text-[#956A43]">
                  03
                </span>
                <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                  {pillars[2].category}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#25352D] group-hover:text-[#956A43] transition-colors">
                  {pillars[2].name}
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal">
                  {pillars[2].description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold text-[#956A43]">
              <span>{pillars[2].actionLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 04: The Readout (Balanced Row 2) */}
          <div
            onClick={() => onNavigate('readout')}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#765C90] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group md:col-span-1 lg:col-span-1"
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
                <h3 className="font-editorial text-2xl font-bold text-[#25352D] group-hover:text-[#765C90] transition-colors">
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

          {/* Card 05: The Folio (Balanced Row 2 - spans 2 cols on lg) */}
          <div
            onClick={() => onNavigate('folio')}
            className="p-7 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#935F5D] shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group md:col-span-1 lg:col-span-2"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F2E5E1] text-[#935F5D]">
                  05
                </span>
                <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                  {pillars[4].category}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#25352D] group-hover:text-[#935F5D] transition-colors">
                  {pillars[4].name}
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal max-w-xl">
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
          SECTION 3: SHORT AUTHOR & PROJECT NOTE
      ========================================================================= */}
      <section className="max-w-4xl mx-auto p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-5">
        <div className="flex items-start gap-4">
          <ViitCrest className="w-10 h-10 flex-shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="font-editorial text-xl font-bold text-[#25352D]">
              A Note on ZeroIndex
            </h4>
            <p className="font-technical text-xs text-[#5F6C64]">
              Curated by J. Siddartha Varma · Assistant Professor, Dept. of CSE (Data Science)
            </p>
          </div>
        </div>

        <div className="text-sm text-[#5F6C64] leading-relaxed space-y-3 font-normal">
          <p>
            I began building ZeroIndex as a response to a recurring pattern I witnessed in undergraduate technical education: students often feel lost not because engineering is impossibly hard, but because the prerequisites were left unstated.
          </p>
          <p>
            Whether you are working through Boolean minimization in The Workbench, navigating structured study routes in The Atlas, preparing for your first technical interview in The Bridge, or reading through reflections in The Folio, my goal is to give every learner a quiet, clear, and dignified space to master ideas from index zero.
          </p>
        </div>

        <div className="pt-3 border-t border-[#E6E8E1] flex flex-wrap items-center justify-between gap-3 text-xs font-technical text-[#69766D]">
          <span>Vignan's Institute of Information Technology (Autonomous), Visakhapatnam</span>
          <button
            onClick={onOpenAboutModal}
            className="text-[#245B4B] font-semibold hover:underline cursor-pointer"
          >
            Learn more about the platform →
          </button>
        </div>
      </section>

    </div>
  );
};

export default MainHome;
