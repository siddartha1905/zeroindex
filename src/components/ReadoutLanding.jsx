import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Radio, 
  Clock, 
  Tag, 
  BookOpen, 
  Share2, 
  Bookmark,
  ExternalLink
} from 'lucide-react';

export const ReadoutLanding = ({ onNavigateHome }) => {
  const [selectedTag, setSelectedTag] = useState('all');
  const [readingArticle, setReadingArticle] = useState(null);

  const articles = [
    {
      id: 'relays-to-tensors',
      title: 'From Relays to Tensors: The Long Arc of Computing Hardware',
      date: '12 Oct 2026',
      readTime: '7 min read',
      tag: 'Hardware Architecture',
      abstract: 'How physical voltage differentials and mechanical relay logic evolved through discrete semiconductors into today’s massively parallel systolic tensor arrays.',
      content: `The fundamental question of computer hardware has remained invariant for nearly a century: how can we represent symbolic truth states using physical phenomena?

In Claude Shannon’s 1937 master’s thesis, the breakthrough was demonstrating that electrical switches arranged in series and parallel were isomorphic to the Boolean algebraic operations of AND and OR. A physical circuit was no longer merely a conduit for electrical power; it was an apparatus capable of formal logical deduction.

When we examine modern tensor processing units (TPUs) and systolic arrays, the underlying premise has not changed. An 8-bit multiplier-accumulator cell is fundamentally composed of full adders and Boolean gates, exactly as studied in introductory Digital Logic Design. What has transformed is the scale, topology, and memory hierarchy. Understanding computing from index zero ensures that modern hardware abstractions remain transparent rather than magical.`
    },
    {
      id: 'zero-based-indexing',
      title: 'Why Zero-Based Indexing Matters in Memory Architecture',
      date: '28 Sep 2026',
      readTime: '5 min read',
      tag: 'Systems & C',
      abstract: 'An architectural examination of pointer arithmetic: why indexing at zero minimizes CPU machine instruction cycles and directly matches contiguous memory offsets.',
      content: `Students frequently ask why programming languages like C, C++, and Python count array elements starting at index zero instead of one. While it may appear counterintuitive at first glance, the rationale is deeply rooted in hardware efficiency.

In C, an array identifier acts as a constant pointer to the memory location of its initial element. When a program accesses arr[i], the hardware evaluates the address calculation: Address = Base + i * sizeof(Type).

If indexing were one-based, the CPU would be required to execute a subtraction instruction on every single array dereference: Base + (i - 1) * sizeof(Type). By defining the initial element at offset zero, the offset becomes precisely zero, saving millions of CPU arithmetic cycles in nested loops. Index zero is not an arbitrary linguistic choice; it is an architectural optimization.`
    },
    {
      id: 'attention-geometry',
      title: 'The Geometry of Attention Mechanisms: A First-Principles Intuition',
      date: '14 Sep 2026',
      readTime: '9 min read',
      tag: 'Machine Learning',
      abstract: 'Deconstructing dot-product attention as an angle-based similarity lookup in high-dimensional vector spaces, stripped of hype and marketing vocabulary.',
      content: `At the heart of the modern transformer architecture lies a mathematically elegant concept known as scaled dot-product attention: Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V.

Despite the anthropomorphic language often used in popular media, attention is fundamentally an exercise in linear algebra and high-dimensional geometry. When two normalized vectors have a small angle between them, their dot product approaches unity. When they are orthogonal, their dot product is zero.

By computing pairwise dot products between query and key projections, the model constructs a dynamic, data-dependent weighting matrix. Understanding this mechanism through the lens of vector projections transforms deep learning from an opaque black box into an approachable continuation of undergraduate linear algebra.`
    }
  ];

  const tags = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'Hardware Architecture', label: 'Hardware Architecture' },
    { id: 'Systems & C', label: 'Systems & C' },
    { id: 'Machine Learning', label: 'Machine Learning' }
  ];

  const filteredArticles = selectedTag === 'all' 
    ? articles 
    : articles.filter(a => a.tag === selectedTag);

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
            <span className="text-[#765C90] font-bold">04 The Readout</span>
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Technology, Engineering &amp; Scientific Developments
          </span>
        </div>

        {/* Section Header */}
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

        {/* Topic Filtering Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-technical text-left">
          {tags.map((t) => (
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

        {/* Reading Article Modal or Inline View */}
        {readingArticle ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-6 text-left animate-in fade-in duration-150">
            <button
              onClick={() => setReadingArticle(null)}
              className="inline-flex items-center gap-1.5 text-xs font-technical text-[#765C90] font-bold hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all dispatches</span>
            </button>

            <div className="space-y-2 border-b border-[#E6E8E1] pb-6">
              <span className="font-technical text-xs font-bold text-[#765C90] uppercase tracking-wider">
                {readingArticle.tag}
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#25352D]">
                {readingArticle.title}
              </h2>
              <div className="flex items-center gap-3 font-technical text-xs text-[#5F6C64]">
                <span>{readingArticle.date}</span>
                <span>·</span>
                <span>{readingArticle.readTime}</span>
                <span>·</span>
                <span>By J. Siddartha Varma</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none font-sans text-sm sm:text-base text-[#25352D] leading-relaxed space-y-4">
              {readingArticle.content.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E6E8E1] flex justify-end">
              <button
                onClick={() => setReadingArticle(null)}
                className="px-4 py-2 rounded-xl bg-[#F0F1EB] hover:bg-[#EBE5F0] text-xs font-technical font-bold text-[#765C90] transition-colors cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        ) : (
          /* Chronological Article Catalog */
          <div className="space-y-4 text-left">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => setReadingArticle(art)}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DDE2DA] hover:border-[#765C90] shadow-2xs hover:shadow-soft transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-technical text-xs font-bold text-[#765C90] bg-[#EBE5F0] px-2.5 py-0.5 rounded-full">
                    {art.tag}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-technical text-[#69766D]">
                    <span>{art.date}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D] group-hover:text-[#765C90] transition-colors">
                  {art.title}
                </h3>

                <p className="text-sm text-[#5F6C64] leading-relaxed">
                  {art.abstract}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-technical font-semibold text-[#765C90] group-hover:translate-x-1 transition-transform">
                  <span>Read Full Dispatch</span>
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

export default ReadoutLanding;
