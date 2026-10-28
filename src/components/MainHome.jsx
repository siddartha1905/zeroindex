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
import { isItemPubliclyAccessible } from '../data/centralContentRegistry';

export const MainHome = ({ 
  onNavigate, 
  onOpenAboutModal, 
  onOpenInstallModal,
  contentOverrides = {},
  isRegistryLoaded = true
}) => {
  const pillarsRef = useRef(null);

  const scrollToPillars = () => {
    pillarsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const allPillars = [
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
      isVisible: () => isItemPubliclyAccessible('pillar-workbench', contentOverrides)
    },
    {
      id: 'atlas',
      number: '02',
      name: 'The Atlas',
      category: 'Pathways & Preparation',
      accent: '#496D91',
      softAccent: '#E1EAF2',
      tag: 'Learning Paths & Career Prep',
      description: 'Learning roadmaps and career preparation to help you understand where to start, what to build, and how to prepare.',
      actionLabel: 'Explore The Atlas',
      icon: Compass,
      borderColor: 'hover:border-[#496D91]',
      isVisible: () => isItemPubliclyAccessible('pillar-atlas', contentOverrides) || isItemPubliclyAccessible('pillar-bridge', contentOverrides)
    },
    {
      id: 'journal',
      number: '03',
      name: 'The Journal',
      category: 'Ideas & Reflections',
      accent: '#765C90',
      softAccent: '#EBE5F0',
      tag: 'Ideas & Reflections',
      description: 'Ideas worth exploring, lessons worth remembering, and thoughts worth sharing across technology, books, and engineering craft.',
      actionLabel: 'Read The Journal',
      icon: Radio,
      borderColor: 'hover:border-[#765C90]',
      isVisible: () => isItemPubliclyAccessible('pillar-readout', contentOverrides) || isItemPubliclyAccessible('pillar-folio', contentOverrides)
    },
  ];

  const pillars = isRegistryLoaded
    ? allPillars.filter(p => p.isVisible())
    : [];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      {/* =========================================================================
          SECTION 1: TWO-COLUMN EDITORIAL HERO
      ========================================================================= */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Natural Editorial Story (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Main Headline & Approved Descriptions */}
            <div className="space-y-4 pt-1 sm:pt-2">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#293B32] leading-[1.1] max-w-xl text-balance">
                A place to begin, and many directions to go.
              </h1>
              
              <div className="space-y-3 pt-1">
                <p className="text-base sm:text-lg text-[#293B32] leading-relaxed max-w-xl font-normal">
                  ZeroIndex is where I bring together academic learning, structured pathways, career preparation, technical insights and personal reflection.
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
              contentOverrides={contentOverrides}
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THREE PILLARS INTRODUCTION ("Inside ZeroIndex")
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

        {/* 3 Balanced Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 text-left">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              role="button"
              tabIndex={0}
              onClick={() => onNavigate(pillar.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate(pillar.id);
                }
              }}
              className={`p-6 sm:p-7 rounded-3xl bg-white border border-[#DDE2DA] ${pillar.borderColor} shadow-soft hover:shadow-lift transition-all cursor-pointer flex flex-col justify-between space-y-6 group col-span-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#285C49]`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span 
                    className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: pillar.softAccent, color: pillar.accent }}
                  >
                    {pillar.number}
                  </span>
                  <span className="font-technical text-[10px] uppercase tracking-wider text-[#5F6C64]">
                    {pillar.category}
                  </span>
                </div>

                <div>
                  <h3 
                    className="font-editorial text-2xl font-bold text-[#293B32] transition-colors"
                    style={{ color: undefined }}
                  >
                    {pillar.name}
                  </h3>
                  <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div 
                className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold"
                style={{ color: pillar.accent }}
              >
                <span>{pillar.actionLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: WHY I BUILT ZEROINDEX
      ========================================================================= */}
      <section className="max-w-5xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Approved Motivation Narrative (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5 border-b border-[#E5E8E1] pb-4">
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
          </div>

          {/* Right Column: Final Motivation Artwork (5 cols on lg, below on mobile) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <img
              src="/zeroindex-motivation-journey.webp"
              alt="Hand-drawn watercolor painting of stacked books with a growing seedling beside a winding trail leading toward snow-capped mountain peaks and morning sun"
              width="2400"
              height="1792"
              className="w-full h-auto object-contain max-w-sm sm:max-w-md lg:max-w-none rounded-xl"
              loading="lazy"
            />
          </div>

        </div>
      </section>

    </div>
  );
};

export default MainHome;
