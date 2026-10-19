import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Radio, 
  Clock, 
  Tag, 
  BookOpen, 
  Share2, 
  Bookmark,
  ExternalLink,
  Check,
  FileText
} from 'lucide-react';
import { 
  readoutArticles, 
  readoutCategories, 
  getArticleBySlug 
} from '../data/readoutArticlesConfig';

export const ReadoutLanding = ({ 
  onNavigateHome, 
  activeSlug = null, 
  onSelectArticle 
}) => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Active article resolved from URL slug or state
  const activeArticle = activeSlug ? getArticleBySlug(activeSlug) : null;

  const filteredArticles = selectedTag === 'all' 
    ? readoutArticles 
    : readoutArticles.filter(a => a.category === selectedTag);

  const handleSelectArticle = (slug) => {
    if (onSelectArticle) {
      onSelectArticle(slug);
    }
  };

  const handleCloseArticle = () => {
    if (onSelectArticle) {
      onSelectArticle(null);
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
              onClick={handleCloseArticle}
              className={`hover:text-[#765C90] transition-colors cursor-pointer ${
                activeSlug ? 'text-[#5F6C64]' : 'text-[#765C90] font-bold'
              }`}
            >
              04 The Readout
            </button>
            {activeSlug && (
              <>
                <span className="text-[#DDE2DA]">/</span>
                <span className="text-[#765C90] font-bold truncate max-w-[200px]">
                  {activeArticle ? activeArticle.title : activeSlug}
                </span>
              </>
            )}
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Technology, Engineering &amp; Scientific Developments
          </span>
        </div>

        {/* Section Header (rendered on catalog view) */}
        {!activeSlug && (
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE5F0] border border-[#765C90]/30 text-xs font-technical font-bold text-[#765C90]">
              <span>PILLAR 04</span>
              <span>·</span>
              <span>TECHNICAL PUBLICATION</span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
              The Readout
            </h1>
            <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
              "Developments in technology and science, examined with curiosity."
            </p>
          </div>
        )}

        {/* =====================================================================
            VIEW 1: REUSABLE ARTICLE DETAIL TEMPLATE
        ===================================================================== */}
        {activeSlug ? (
          activeArticle ? (
            <article className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-8 text-left animate-in fade-in duration-150">
              
              {/* Back to Catalog Top Link */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E8E1]">
                <button
                  onClick={handleCloseArticle}
                  className="inline-flex items-center gap-1.5 text-xs font-technical text-[#765C90] font-bold hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to all dispatches</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBE5F0] border border-[#DDE2DA] text-xs font-technical text-[#765C90] transition-colors cursor-pointer"
                  title="Copy permanent article link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Article</span>
                    </>
                  )}
                </button>
              </div>

              {/* Article Headline & Metadata Block */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-technical text-xs font-bold text-[#765C90] uppercase tracking-wider bg-[#EBE5F0] px-2.5 py-0.5 rounded-full">
                    {activeArticle.category}
                  </span>
                  {activeArticle.status === 'draft' && (
                    <span className="font-technical text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Draft Preview
                    </span>
                  )}
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25352D] leading-[1.15]">
                  {activeArticle.title}
                </h1>

                {activeArticle.summary && (
                  <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] leading-relaxed border-l-2 border-[#765C90] pl-4">
                    {activeArticle.summary}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs font-technical text-[#5F6C64] pt-2 border-t border-[#E6E8E1]">
                  <span>By <strong>{activeArticle.author}</strong></span>
                  {activeArticle.authorRole && (
                    <>
                      <span>·</span>
                      <span>{activeArticle.authorRole}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>{activeArticle.publishedAt}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#765C90]" />
                    <span>{activeArticle.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Full Article Prose Content */}
              <div className="prose prose-slate max-w-none text-[#25352D] text-base sm:text-lg leading-relaxed space-y-6 pt-4 border-t border-[#E6E8E1]">
                {activeArticle.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D] pt-4">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={pIdx} className="font-editorial text-2xl sm:text-3xl font-bold text-[#25352D] pt-6">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  return (
                    <p key={pIdx} className="leading-relaxed text-[#25352D]">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Citations & Sources Section (if provided) */}
              {activeArticle.sources && activeArticle.sources.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#DDE2DA] space-y-3 mt-8">
                  <h4 className="font-technical text-xs font-bold uppercase tracking-wider text-[#765C90]">
                    References &amp; Source Literature
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5F6C64]">
                    {activeArticle.sources.map((src, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="font-technical text-[#765C90]">[{sIdx + 1}]</span>
                        <span>
                          {src.author ? `${src.author}, ` : ''}
                          <em>"{src.title}"</em>
                          {src.publisher ? `, ${src.publisher}` : ''}
                          {src.year ? ` (${src.year})` : ''}.
                          {src.url && (
                            <a 
                              href={src.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="ml-1 text-[#765C90] hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>Link</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Footer & Return Action */}
              <div className="pt-6 border-t border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-technical text-[#69766D]">
                  Published in The Readout · ZeroIndex
                </span>
                <button
                  onClick={handleCloseArticle}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5F0] text-xs font-technical font-bold text-[#765C90] transition-colors cursor-pointer self-start sm:self-auto"
                >
                  ← Return to all dispatches
                </button>
              </div>

            </article>
          ) : (
            /* Unrecognized or Unpublished Slug State */
            <div className="p-10 sm:p-14 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE5F0] border border-[#765C90]/30 flex items-center justify-center mx-auto text-[#765C90]">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-editorial text-2xl font-bold text-[#25352D]">
                  Dispatch In Editorial Review
                </h3>
                <p className="text-sm text-[#5F6C64] leading-relaxed">
                  The requested dispatch identifier ({activeSlug}) is either in draft preparation or has not yet been approved for public release.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleCloseArticle}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5F0] text-xs font-technical font-bold text-[#765C90] transition-colors cursor-pointer"
                >
                  ← Return to The Readout
                </button>
              </div>
            </div>
          )
        ) : (
          /* =====================================================================
              VIEW 2: DIRECTORY CATALOG & TASTEFUL EMPTY STATE
          ===================================================================== */
          <div className="space-y-8">
            
            {/* Topic Filtering Tabs */}
            <div className="flex flex-wrap gap-2 text-xs font-technical text-left">
              {readoutCategories.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTag(t.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedTag === t.id
                      ? 'bg-white text-[#765C90] border-[#765C90] font-bold shadow-2xs'
                      : 'bg-white/60 text-[#5F6C64] border-[#DDE2DA] hover:bg-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {filteredArticles.length > 0 ? (
              /* Chronological Article Catalog */
              <div className="space-y-4 text-left">
                {filteredArticles.map((art) => (
                  <article
                    key={art.slug}
                    onClick={() => handleSelectArticle(art.slug)}
                    className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDE2DA] hover:border-[#765C90] shadow-2xs hover:shadow-soft transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-technical text-xs font-bold text-[#765C90] bg-[#EBE5F0] px-2.5 py-0.5 rounded-full">
                        {art.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-technical text-[#69766D]">
                        <span>{art.publishedAt}</span>
                        <span>·</span>
                        <span>{art.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D] group-hover:text-[#765C90] transition-colors">
                      {art.title}
                    </h3>

                    <p className="text-sm text-[#5F6C64] leading-relaxed">
                      {art.summary}
                    </p>

                    <div className="pt-2 flex items-center gap-1 text-xs font-technical font-semibold text-[#765C90] group-hover:translate-x-1 transition-transform">
                      <span>Read Full Dispatch</span>
                      <span>→</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Tasteful Empty State */
              <div className="p-10 sm:p-14 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EBE5F0] border border-[#765C90]/30 flex items-center justify-center mx-auto text-[#765C90]">
                  <Radio className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="font-editorial text-2xl font-bold text-[#25352D]">
                    Articles are being prepared.
                  </h3>
                  <p className="text-sm text-[#5F6C64] leading-relaxed">
                    Technical publications, architectural monographs, and computing dispatches are currently in editorial preparation and review.
                  </p>
                </div>
                <p className="text-xs text-[#5F6C64] font-technical">
                  Articles will be published here as they become available.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default ReadoutLanding;
