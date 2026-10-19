import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Briefcase, 
  Calculator, 
  CheckCircle2, 
  FileText, 
  Code2, 
  BrainCircuit, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const BridgeLanding = ({ onNavigateHome }) => {
  const [activeSection, setActiveSection] = useState('aptitude');

  const categories = [
    {
      id: 'aptitude',
      title: 'Quantitative & Analytical Reasoning',
      badge: 'Curriculum Outline',
      description: 'Systematic mathematical reasoning, probability, combinatorics, number theory, and logical deductions required for engineering assessments.',
      tracks: [
        { title: 'Number Systems & Base Divisibility', status: 'Planned Topic', level: 'Fundamental' },
        { title: 'Permutations, Combinations & Probability', status: 'Planned Topic', level: 'Intermediate' },
        { title: 'Logical Deduction & Truth Tables', status: 'Planned Topic', level: 'Fundamental' },
        { title: 'Time, Speed, Distance & Work Equations', status: 'Planned Topic', level: 'Intermediate' },
      ]
    },
    {
      id: 'technical',
      title: 'Core CS Interview Foundations',
      badge: 'Interview Outline',
      description: 'Rigorous first-principles conceptual question bank covering Operating Systems, DBMS, Computer Networks, and Computer Architecture.',
      tracks: [
        { title: 'Operating Systems: Concurrency & Virtual Memory', status: 'Planned Topic', level: 'Deep Dive' },
        { title: 'DBMS: Normalization, Indexing & ACID Guarantees', status: 'Planned Topic', level: 'Deep Dive' },
        { title: 'Computer Networks: OSI, TCP/IP & Handshakes', status: 'Planned Topic', level: 'Core' },
        { title: 'Object-Oriented Design & Clean Abstractions', status: 'Planned Topic', level: 'Core' },
      ]
    },
    {
      id: 'coding',
      title: 'Systematic Coding & Pattern Mastery',
      badge: 'Pattern Outline',
      description: 'Pattern-based problem classification rather than blind memorization: Two Pointers, Sliding Window, Tree Inversion, Dynamic Programming intervals.',
      tracks: [
        { title: 'Two-Pointer & Sliding Window Techniques', status: 'Planned Topic', level: 'Essential' },
        { title: 'Binary Search & Monotonic Predicates', status: 'Planned Topic', level: 'Essential' },
        { title: 'Graph Traversal & Topological Ordering', status: 'Planned Topic', level: 'Advanced' },
        { title: 'Intervals & State-Space Dynamic Programming', status: 'Planned Topic', level: 'Advanced' },
      ]
    },
    {
      id: 'resume',
      title: 'Technical Resume & Engineering Communication',
      badge: 'Career Framework',
      description: 'Guidelines for structuring engineering project descriptions, communicating technical tradeoffs in interviews, and portfolio architecture.',
      tracks: [
        { title: 'Project Impact Deconstructions (Action-Metric-Result)', status: 'Planned Guide', level: 'Guide' },
        { title: 'Whiteboard Communication & Thought Verbalization', status: 'Planned Checklist', level: 'Framework' },
        { title: 'Technical Portfolio & Clean Git Hygiene', status: 'Planned Standard', level: 'Guide' },
      ]
    }
  ];

  const currentCategory = categories.find(c => c.id === activeSection) || categories[0];

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#25352D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
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
            <span className="text-[#956A43] font-bold">03 The Bridge</span>
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Training, Placements &amp; Professional Readiness
          </span>
        </div>

        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E5D9] border border-[#956A43]/30 text-xs font-technical font-bold text-[#956A43]">
            <span>PILLAR 03</span>
            <span>·</span>
            <span>CAREER READINESS</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
            The Bridge
          </h1>
          <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
            "Practice and preparation for the move into professional work."
          </p>
        </div>

        {/* Structural Connection Category Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {categories.map((cat) => {
            const isSelected = activeSection === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveSection(cat.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#956A43] shadow-soft ring-1 ring-[#956A43]'
                    : 'bg-white/70 hover:bg-white border-[#DDE2DA] text-[#5F6C64]'
                }`}
              >
                <div>
                  <span className="text-[10px] font-technical px-2 py-0.5 rounded-full bg-[#F0F1EB] text-[#5F6C64] inline-block mb-2">
                    {cat.badge}
                  </span>
                  <h3 className="font-editorial text-base font-bold text-[#25352D] mb-1">
                    {cat.title}
                  </h3>
                </div>
                <div className="pt-3 border-t border-[#E6E8E1] text-xs font-semibold text-[#956A43] flex items-center justify-between">
                  <span>{cat.tracks.length} Tracks</span>
                  <span>Select →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Workspace */}
        <div className="bg-white rounded-3xl border border-[#DDE2DA] shadow-soft p-6 sm:p-8 space-y-6 text-left">
          <div className="pb-4 border-b border-[#E6E8E1] space-y-1">
            <span className="font-technical text-xs font-bold text-[#956A43] uppercase tracking-wider">
              Preparation Track · {currentCategory.title}
            </span>
            <p className="text-sm text-[#5F6C64]">
              {currentCategory.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCategory.tracks.map((trk, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-[#F7F5EF] border border-[#DDE2DA] flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#25352D]">
                    {trk.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-technical text-[#5F6C64]">
                    <span>{trk.status}</span>
                    <span>·</span>
                    <span className="text-[#956A43] font-medium">{trk.level}</span>
                  </div>
                </div>
                <span className="font-technical text-xs text-[#5F6C64] px-2 py-1 rounded bg-white border border-[#DDE2DA]">
                  Outline
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#F1E5D9]/50 border border-[#956A43]/20 font-technical text-xs text-[#5F6C64]">
            Note: The Bridge tracks are currently in the curriculum framework and design phase. Dedicated problem sets, exercises, and rubrics are in active development.
          </div>
        </div>

      </div>
    </div>
  );
};

export default BridgeLanding;
