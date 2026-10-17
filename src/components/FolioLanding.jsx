import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Clock, 
  BookOpen, 
  Feather,
  Sparkles
} from 'lucide-react';

export const FolioLanding = ({ onNavigateHome }) => {
  const [readingEssay, setReadingEssay] = useState(null);

  const essays = [
    {
      id: 'teaching-from-index-zero',
      title: 'On Teaching from Index Zero: Why Every Concept Deserves a Clean Starting Point',
      date: '04 Oct 2026',
      readTime: '6 min read',
      topic: 'Pedagogy & Foundations',
      summary: 'Why cognitive overload happens when textbooks skip foundational assumptions, and how deliberate first-principles instruction rebuilds academic confidence.',
      body: `One of the most persistent observations in my classroom over the years is how frequently student anxiety originates not from intrinsic mathematical difficulty, but from unstated prerequisites.

In traditional curricula, textbooks routinely present high-level algorithms or circuit syntheses as self-evident facts. When a student struggles to minimize a 4-variable K-Map, the friction is rarely with gray code ordering; it almost always stems from an incomplete physical intuition of why adjacent minterms represent single-bit differences.

This is the foundational thesis of ZeroIndex. In computer science, index zero signifies the memory location where an array actually begins. In academic instruction, index zero means refusing to leave gaps in the foundation. When we take the time to trace an idea from basic voltage levels to Boolean gates before introducing complex sequential systems, students do not merely memorize formulas; they develop intellectual sovereignty over the subject.`
    },
    {
      id: 'quiet-craft-engineering',
      title: 'The Quiet Craft of Classroom Engineering',
      date: '18 Sep 2026',
      readTime: '5 min read',
      topic: 'Faculty Reflections',
      summary: 'Observations on preparing lecture models, drawing circuit schematics by hand on the blackboard, and resisting the rush toward superficial automation.',
      body: `There is a distinct, understated craftsmanship in drawing an electrical logic diagram on a physical blackboard. As the chalk moves across the slate, establishing wire runs and gate bodies, the pacing naturally synchronizes with human cognition. Students have time to observe how the carry propagates from the half adder before the next symbol appears.

In our collective haste to introduce multimedia slides and automated assessment platforms, we sometimes inadvertently destroy the very cognitive pauses that make understanding possible. 

ZeroIndex is an attempt to synthesize the best of both worlds: digital tools that preserve the contemplative, paced dignity of a chalkboard derivation, paired with interactive visual solvers that let students verify their derivations on their own time.`
    },
    {
      id: 'deep-reading-summaries',
      title: 'On Reading Deeply in an Era of Summary Feeds',
      date: '22 Aug 2026',
      readTime: '7 min read',
      topic: 'Books & Mindset',
      summary: 'Why engineering students must cultivate the endurance to read primary textbooks and papers rather than relying exclusively on cheat sheets and video snippets.',
      body: `In technical education today, there is a dangerous temptation to substitute concise summaries for foundational reading. When preparing for mid-semester exams, students naturally gravitate toward two-minute video explanations or bulleted formula lists.

While summaries are valuable for rapid pre-exam recall, they cannot build architectural intuition. When an engineer encounters an unprecedented production bug or designs a novel distributed protocol, there is no prefabricated summary available. The only faculty that serves them is the endurance to read complex specifications, trace state transitions line by line, and reason through edge cases.

Reading technical prose deeply is a muscle that must be exercised deliberately. It begins by sitting quietly with a challenging derivation until the underlying structure clicks into focus.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
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
            <span className="text-[#935F5D] font-bold">05 The Folio</span>
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Personal Essays, Reflections &amp; Intellectual Notes
          </span>
        </div>

        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E5E1] border border-[#935F5D]/30 text-xs font-technical font-bold text-[#935F5D]">
            <span>PILLAR 05</span>
            <span>·</span>
            <span>PERSONAL ESSAYS</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
            The Folio
          </h1>
          <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
            "Essays, observations and ideas I want to put into words."
          </p>
        </div>

        {/* Reading Essay Detail View or Essay List */}
        {readingEssay ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-8 text-left animate-in fade-in duration-150">
            <button
              onClick={() => setReadingEssay(null)}
              className="inline-flex items-center gap-1.5 text-xs font-technical text-[#935F5D] font-bold hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all essays</span>
            </button>

            <div className="space-y-3 border-b border-[#E6E8E1] pb-6">
              <span className="font-technical text-xs font-bold text-[#935F5D] uppercase tracking-wider">
                {readingEssay.topic}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#25352D] leading-tight">
                {readingEssay.title}
              </h2>
              <div className="flex items-center gap-3 font-technical text-xs text-[#5F6C64]">
                <span>{readingEssay.date}</span>
                <span>·</span>
                <span>{readingEssay.readTime}</span>
                <span>·</span>
                <span>By J. Siddartha Varma</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none font-serif text-base sm:text-lg text-[#25352D] leading-relaxed space-y-6">
              {readingEssay.body.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E6E8E1] flex justify-between items-center text-xs text-[#69766D]">
              <span className="font-editorial italic">Published in The Folio · ZeroIndex</span>
              <button
                onClick={() => setReadingEssay(null)}
                className="px-4 py-2 rounded-xl bg-[#F0F1EB] hover:bg-[#F2E5E1] font-technical font-bold text-[#935F5D] transition-colors cursor-pointer"
              >
                Close Essay
              </button>
            </div>
          </div>
        ) : (
          /* Essay Collection List */
          <div className="space-y-4 text-left">
            {essays.map((ess) => (
              <article
                key={ess.id}
                onClick={() => setReadingEssay(ess)}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DDE2DA] hover:border-[#935F5D] shadow-2xs hover:shadow-soft transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-technical text-xs font-bold text-[#935F5D] bg-[#F2E5E1] px-2.5 py-0.5 rounded-full">
                    {ess.topic}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-technical text-[#69766D]">
                    <span>{ess.date}</span>
                    <span>·</span>
                    <span>{ess.readTime}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-2xl font-bold text-[#25352D] group-hover:text-[#935F5D] transition-colors leading-snug">
                  {ess.title}
                </h3>

                <p className="text-sm sm:text-base text-[#5F6C64] leading-relaxed font-serif italic">
                  {ess.summary}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-technical font-semibold text-[#935F5D] group-hover:translate-x-1 transition-transform">
                  <span>Read Essay</span>
                  <span>→</span>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default FolioLanding;
