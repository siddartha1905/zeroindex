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

  // Unpublished development archive is preserved in unpublished-archive/folio-essays-archive.json
  // Essays will appear here only when explicitly reviewed and approved by the author.
  const essays = [];

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

        {/* Reading Essay Detail View or Essay List / Empty State */}
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
        ) : essays.length > 0 ? (
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
        ) : (
          /* Tasteful Empty State */
          <div className="p-10 sm:p-14 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F2E5E1] border border-[#935F5D]/30 flex items-center justify-center mx-auto text-[#935F5D]">
              <Feather className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="font-editorial text-2xl font-bold text-[#25352D]">
                Writing will appear here soon.
              </h3>
              <p className="text-sm text-[#5F6C64] leading-relaxed">
                Personal essays, pedagogical reflections, and intellectual notes will be published here upon author review.
              </p>
            </div>
            <p className="text-xs text-[#5F6C64] font-technical">
              Essays will be published here as they become available.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default FolioLanding;
