import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Clock, 
  BookOpen, 
  Feather,
  Sparkles,
  Share2,
  Check
} from 'lucide-react';
import { 
  folioEssays, 
  folioCategories, 
  getEssayBySlug 
} from '../data/folioEssaysConfig';

export const FolioLanding = ({ 
  onNavigateHome, 
  activeSlug = null, 
  onSelectEssay 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const activeEssay = activeSlug ? getEssayBySlug(activeSlug) : null;

  const filteredEssays = selectedCategory === 'all'
    ? folioEssays
    : folioEssays.filter(e => e.category === selectedCategory);

  const handleSelectEssay = (slug) => {
    if (onSelectEssay) {
      onSelectEssay(slug);
    }
  };

  const handleCloseEssay = () => {
    if (onSelectEssay) {
      onSelectEssay(null);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }).catch(() => {});
    }
  };

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
            <button 
              onClick={handleCloseEssay}
              className={`hover:text-[#935F5D] transition-colors cursor-pointer ${
                activeSlug ? 'text-[#5F6C64]' : 'text-[#935F5D] font-bold'
              }`}
            >
              05 The Folio
            </button>
            {activeSlug && (
              <>
                <span className="text-[#DDE2DA]">/</span>
                <span className="text-[#935F5D] font-bold truncate max-w-[200px]">
                  {activeEssay ? activeEssay.title : activeSlug}
                </span>
              </>
            )}
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Personal Essays, Reflections &amp; Intellectual Notes
          </span>
        </div>

        {/* Section Header (rendered on catalog view) */}
        {!activeSlug && (
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
        )}

        {/* =====================================================================
            VIEW 1: REUSABLE ESSAY DETAIL TEMPLATE
        ===================================================================== */}
        {activeSlug ? (
          activeEssay ? (
            <article className="p-6 sm:p-12 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-8 text-left animate-in fade-in duration-150">
              
              {/* Back to Catalog Top Link */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E8E1]">
                <button
                  onClick={handleCloseEssay}
                  className="inline-flex items-center gap-1.5 text-xs font-technical text-[#935F5D] font-bold hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to all essays</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2E5E1] border border-[#DDE2DA] text-xs font-technical text-[#935F5D] transition-colors cursor-pointer"
                  title="Copy permanent essay link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Essay</span>
                    </>
                  )}
                </button>
              </div>

              {/* Essay Headline & Author Details */}
              <div className="space-y-4">
                <span className="font-technical text-xs font-bold text-[#935F5D] uppercase tracking-wider bg-[#F2E5E1] px-2.5 py-0.5 rounded-full inline-block">
                  {activeEssay.category}
                </span>

                <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#25352D] leading-[1.12]">
                  {activeEssay.title}
                </h1>

                {activeEssay.summary && (
                  <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] leading-relaxed border-l-2 border-[#935F5D] pl-4">
                    "{activeEssay.summary}"
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs font-technical text-[#5F6C64] pt-2 border-t border-[#E6E8E1]">
                  <span>By <strong>{activeEssay.author}</strong></span>
                  {activeEssay.authorRole && (
                    <>
                      <span>·</span>
                      <span>{activeEssay.authorRole}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>{activeEssay.publishedAt}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#935F5D]" />
                    <span>{activeEssay.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Full Essay Prose Body with Refined Warm Typography */}
              <div className="prose prose-slate max-w-none font-serif text-lg sm:text-xl text-[#25352D] leading-[1.8] space-y-6 pt-4 border-t border-[#E6E8E1]">
                {activeEssay.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Author Sign-off & Return */}
              <div className="pt-8 border-t border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-editorial italic text-sm text-[#25352D] block">
                    J. Siddartha Varma
                  </span>
                  <span className="font-technical text-xs text-[#69766D] block">
                    Published in The Folio · ZeroIndex
                  </span>
                </div>

                <button
                  onClick={handleCloseEssay}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2E5E1] text-xs font-technical font-bold text-[#935F5D] transition-colors cursor-pointer self-start sm:self-auto"
                >
                  ← Return to all essays
                </button>
              </div>

            </article>
          ) : (
            /* Unrecognized or Unpublished Slug State */
            <div className="p-10 sm:p-14 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2E5E1] border border-[#935F5D]/30 flex items-center justify-center mx-auto text-[#935F5D]">
                <Feather className="w-6 h-6" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-editorial text-2xl font-bold text-[#25352D]">
                  Essay In Preparation
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed">
                  The requested essay identifier ({activeSlug}) is either in author drafting or has not yet been approved for public release.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleCloseEssay}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2E5E1] text-xs font-technical font-bold text-[#935F5D] transition-colors cursor-pointer"
                >
                  ← Return to The Folio
                </button>
              </div>
            </div>
          )
        ) : (
          /* =====================================================================
              VIEW 2: ESSAY DIRECTORY & TASTEFUL EMPTY STATE
          ===================================================================== */
          <div className="space-y-8">
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 text-xs font-technical text-left">
              {folioCategories.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedCategory(t.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === t.id
                      ? 'bg-white text-[#935F5D] border-[#935F5D] font-bold shadow-2xs'
                      : 'bg-white/60 text-[#5F6C64] border-[#DDE2DA] hover:bg-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {filteredEssays.length > 0 ? (
              /* Essay Collection List */
              <div className="space-y-4 text-left">
                {filteredEssays.map((ess) => (
                  <article
                    key={ess.slug}
                    onClick={() => handleSelectEssay(ess.slug)}
                    className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DDE2DA] hover:border-[#935F5D] shadow-2xs hover:shadow-soft transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-technical text-xs font-bold text-[#935F5D] bg-[#F2E5E1] px-2.5 py-0.5 rounded-full">
                        {ess.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-technical text-[#69766D]">
                        <span>{ess.publishedAt}</span>
                        <span>·</span>
                        <span>{ess.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-editorial text-2xl font-bold text-[#25352D] group-hover:text-[#935F5D] transition-colors leading-snug">
                      {ess.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#5F6C64] leading-relaxed font-serif italic">
                      "{ess.summary}"
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
        )}

      </div>
    </div>
  );
};

export default FolioLanding;
