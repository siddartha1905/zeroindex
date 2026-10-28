import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Radio, 
  FileText, 
  Clock, 
  Share2, 
  Check, 
  BookOpen, 
  Sparkles,
  Bookmark
} from 'lucide-react';
import { readoutArticles, getArticleBySlug } from '../data/readoutArticlesConfig';
import { folioEssays, getEssayBySlug } from '../data/folioEssaysConfig';
import { isItemPubliclyAccessible } from '../data/centralContentRegistry';

export const JournalLanding = ({ 
  onNavigateHome, 
  onNavigateWorkbench,
  contentOverrides = {},
  isAdminPreview = false,
  initialCategory = 'insights',
  initialSlug = null
}) => {
  const isReadoutAccessible = isAdminPreview || isItemPubliclyAccessible('pillar-readout', contentOverrides);
  const isFolioAccessible = isAdminPreview || isItemPubliclyAccessible('pillar-folio', contentOverrides);

  // Category tab: 'insights' | 'reflections'
  const [activeCategory, setActiveCategory] = useState(() => {
    if (!isReadoutAccessible && isFolioAccessible) {
      return 'reflections';
    }
    if (initialCategory === 'reflections' || initialCategory === 'folio') {
      return 'reflections';
    }
    return 'insights';
  });

  const [activeSlug, setActiveSlug] = useState(initialSlug);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (initialCategory === 'reflections' || initialCategory === 'folio') {
      setActiveCategory('reflections');
    } else if (initialCategory === 'insights' || initialCategory === 'readout') {
      setActiveCategory('insights');
    }
    if (initialSlug !== undefined) {
      setActiveSlug(initialSlug);
    }
  }, [initialCategory, initialSlug]);

  // Active item resolution
  const activeArticle = activeCategory === 'insights' && activeSlug ? getArticleBySlug(activeSlug) : null;
  const activeEssay = activeCategory === 'reflections' && activeSlug ? getEssayBySlug(activeSlug) : null;
  const activeItem = activeArticle || activeEssay;

  const handleSelectSlug = (category, slug) => {
    setActiveCategory(category);
    setActiveSlug(slug);
    if (slug) {
      window.location.hash = `journal/${category}/${slug}`;
    } else {
      window.location.hash = `journal/${category}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDetail = () => {
    setActiveSlug(null);
    window.location.hash = `journal/${activeCategory}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Determine available items for active category
  const currentItems = activeCategory === 'insights' ? readoutArticles : folioEssays;

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        
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
              onClick={handleCloseDetail}
              className={`hover:text-[#765C90] transition-colors cursor-pointer ${
                activeSlug ? 'text-[#5F6C64]' : 'text-[#765C90] font-bold'
              }`}
            >
              03 The Journal
            </button>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#765C90] font-semibold capitalize">
              {activeCategory}
            </span>
            {activeSlug && (
              <>
                <span className="text-[#DDE2DA]">/</span>
                <span className="text-[#25352D] font-bold truncate max-w-[200px]">
                  {activeItem ? activeItem.title : activeSlug}
                </span>
              </>
            )}
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Ideas, Insights and Reflections
          </span>
        </div>

        {/* Section Header (rendered on catalog view) */}
        {!activeSlug && (
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE5F0] border border-[#765C90]/30 text-xs font-technical font-bold text-[#765C90]">
              <span>PILLAR 03</span>
              <span>·</span>
              <span>IDEAS, INSIGHTS AND REFLECTIONS</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
              The Journal
            </h1>
            <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
              "A space for ideas worth exploring, lessons worth remembering, and thoughts worth sharing."
            </p>

            {/* Category Segmented Switcher */}
            <div className="pt-2 flex items-center gap-2">
              {isReadoutAccessible && (
                <button
                  onClick={() => {
                    setActiveCategory('insights');
                    window.location.hash = 'journal/insights';
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-technical font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeCategory === 'insights'
                      ? 'bg-[#765C90] text-white shadow-soft'
                      : 'bg-white text-[#5F6C64] hover:text-[#25352D] border border-[#DDE2DA]'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Insights</span>
                </button>
              )}

              {isFolioAccessible && (
                <button
                  onClick={() => {
                    setActiveCategory('reflections');
                    window.location.hash = 'journal/reflections';
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-technical font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeCategory === 'reflections'
                      ? 'bg-[#765C90] text-white shadow-soft'
                      : 'bg-white text-[#5F6C64] hover:text-[#25352D] border border-[#DDE2DA]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Reflections</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            VIEW 1: DETAILED READING VIEW (ARTICLE OR ESSAY)
        ===================================================================== */}
        {activeSlug ? (
          activeItem ? (
            <article className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-8 text-left animate-in fade-in duration-150">
              
              {/* Back to Catalog Top Link */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E8E1]">
                <button
                  onClick={handleCloseDetail}
                  className="inline-flex items-center gap-1.5 text-xs font-technical text-[#765C90] font-bold hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to all {activeCategory}</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBE5F0] border border-[#DDE2DA] text-xs font-technical text-[#765C90] transition-colors cursor-pointer"
                  title="Copy permanent link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              {/* Title & Metadata Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 font-technical text-xs text-[#5F6C64]">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-[#DDE2DA] text-[#765C90] font-bold">
                    {activeItem.category || (activeCategory === 'insights' ? 'Technical Dispatch' : 'Reflective Essay')}
                  </span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#5F6C64]" />
                    <span>{activeItem.readTime || '6 min read'}</span>
                  </div>
                  <span>·</span>
                  <span>{activeItem.publishedAt || 'October 2026'}</span>
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#25352D] leading-[1.15]">
                  {activeItem.title}
                </h1>

                {activeItem.summary && (
                  <p className="font-editorial italic text-base sm:text-lg text-[#5F6C64] leading-relaxed border-l-2 border-[#765C90] pl-4 py-0.5">
                    "{activeItem.summary}"
                  </p>
                )}
              </div>

              {/* Author Attribution Card */}
              <div className="p-4 rounded-2xl bg-[#FBF8F2] border border-[#E6E8E1] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-[#25352D]">{activeItem.author || 'J. Siddartha Varma'}</p>
                  <p className="text-[#5F6C64]">{activeItem.authorRole || 'Assistant Professor, Dept. of CSE (Data Science)'}</p>
                </div>
                <span className="font-technical text-[11px] text-[#69766D]">ZeroIndex Journal</span>
              </div>

              {/* Article / Essay Prose Body */}
              <div className="prose prose-neutral max-w-none text-[#293B32] text-sm sm:text-base leading-relaxed space-y-5 font-normal pt-2">
                {activeItem.content ? (
                  activeItem.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p className="text-[#5F6C64] italic">Content text is being finalized for publication.</p>
                )}
              </div>

              {/* Citations and References (if present) */}
              {Array.isArray(activeItem.sources) && activeItem.sources.length > 0 && (
                <div className="pt-6 border-t border-[#E6E8E1] space-y-3">
                  <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#25352D]">
                    Formal References and Readings
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5F6C64]">
                    {activeItem.sources.map((src, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-[10px] text-[#765C90]">[{i + 1}]</span>
                        <div>
                          <strong className="text-[#25352D]">{src.title}</strong>
                          {src.author && <span> · {src.author}</span>}
                          {src.publisher && <span> ({src.publisher}, {src.year})</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottom Back Action */}
              <div className="pt-6 border-t border-[#E6E8E1] flex items-center justify-between">
                <button
                  onClick={handleCloseDetail}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5F0] border border-[#DDE2DA] text-xs font-technical font-semibold text-[#765C90] transition-colors cursor-pointer"
                >
                  ← Return to all {activeCategory}
                </button>
              </div>

            </article>
          ) : (
            /* Selected slug is missing or unpublished */
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE5F0] text-[#765C90] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                Article or Essay Not Available
              </h2>
              <p className="text-xs text-[#5F6C64] max-w-md mx-auto leading-relaxed">
                The requested entry has not been published or has been placed offline by the faculty author for editorial review.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleCloseDetail}
                  className="px-5 py-2.5 rounded-xl bg-[#765C90] hover:bg-[#5E4775] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Return to The Journal
                </button>
              </div>
            </div>
          )
        ) : (
          /* ===================================================================
              VIEW 2: CATALOG OR TASTEFUL SHORT EDITORIAL-REVIEW STATE
          =================================================================== */
          currentItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 text-left">
              {currentItems.map((item) => (
                <div
                  key={item.slug}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectSlug(activeCategory, item.slug)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectSlug(activeCategory, item.slug);
                    }
                  }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] hover:border-[#765C90] shadow-soft hover:shadow-lift transition-all cursor-pointer space-y-4 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-technical text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#FAF8F5] text-[#765C90] border border-[#DDE2DA]">
                      {item.category || (activeCategory === 'insights' ? 'Technical Dispatch' : 'Reflective Essay')}
                    </span>
                    <span className="font-technical text-[11px] text-[#5F6C64]">
                      {item.readTime || '6 min read'} · {item.publishedAt || 'October 2026'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#293B32] group-hover:text-[#765C90] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5F6C64] leading-relaxed mt-2 font-normal line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6E8E1] flex items-center justify-between text-xs font-technical font-semibold text-[#765C90]">
                    <span>Read {activeCategory === 'insights' ? 'Dispatch' : 'Essay'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Tasteful, short, elegant empty state */
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-center space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE5F0] text-[#765C90] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="font-editorial text-2xl font-bold text-[#293B32]">
                  Nothing published here yet
                </h2>
                <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed max-w-md mx-auto">
                  New insights and reflections will appear whenever there is something meaningful to share.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onNavigateWorkbench || onNavigateHome}
                  className="px-5 py-2.5 rounded-xl bg-[#245B4B] hover:bg-[#28755E] text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Explore The Workbench</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onNavigateHome}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5F0] border border-[#DDE2DA] text-[#5F6C64] hover:text-[#25352D] text-xs font-bold transition-all cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default JournalLanding;
