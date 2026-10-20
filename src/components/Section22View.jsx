import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Zap, 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Sparkles, 
  FileText, 
  Compass, 
  Check, 
  Filter, 
  RotateCcw, 
  Info, 
  X
} from 'lucide-react';
import { dldSection22Data } from '../data/dldSection22Data';
import { CuratedVideoCard } from './CuratedVideoCard';
import BooleanLawsCheatSheet from './BooleanLawsCheatSheet';

/**
 * Section 2.2 View: Simplification of Boolean Expressions Using Algebraic Laws
 * Strictly zero em-dashes and zero en-dashes throughout.
 * Follows permanent ZeroIndex WHY-FIRST philosophy: WHY -> WHERE -> WHAT -> HOW -> TRY -> CONNECT
 */

export const Section22View = ({ section }) => {
  const [activeTab, setActiveTab] = useState('start-here');
  const [modelFilter, setModelFilter] = useState('All');
  const [practiceFilter, setPracticeFilter] = useState('All');
  const [expandedModels, setExpandedModels] = useState({ 'b01': true, 'b02': true, 'adv05': true });
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedPracticeSolutions, setRevealedPracticeSolutions] = useState({});
  const [showMasterCheatModal, setShowMasterCheatModal] = useState(false);
  const [checkedChecklist, setCheckedChecklist] = useState({});

  const data = dldSection22Data;

  const toggleModel = (id) => {
    setExpandedModels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleHint = (problemId, hintNumber) => {
    const key = `${problemId}_hint${hintNumber}`;
    setRevealedHints(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePracticeSolution = (id) => {
    setRevealedPracticeSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleChecklistItem = (index) => {
    setCheckedChecklist(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Filter worked models using level
  const filteredModels = modelFilter === 'All'
    ? data.workedModels
    : data.workedModels.filter(m => m.level === modelFilter);

  // Filter practice problems using difficulty
  const filteredPractice = practiceFilter === 'All'
    ? data.practiceLab
    : data.practiceLab.filter(p => p.difficulty === practiceFilter);

  return (
    <div className="space-y-8 text-left">
      
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
              Section {data.number}
            </span>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
              {data.badge}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#5F6C64]">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.estimatedReadTime}</span>
          </div>
        </div>

        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#293B32] leading-tight">
            {data.title}
          </h1>
          <p className="text-sm text-[#5F6C64] mt-2 leading-relaxed font-normal">
            {data.description}
          </p>
        </div>

        {/* Section 2.1 Context Link */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#5F6C64] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#285C49] flex-shrink-0" />
            <span>
              <strong className="text-[#293B32]">Prerequisite Context: </strong>
              {data.startHere.whySimplify.section21Ref}
            </span>
          </div>
          <button
            onClick={() => setShowMasterCheatModal(true)}
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-white border border-[#DCE7E1] text-[#285C49] hover:bg-[#EBF3ED] text-[11px] font-mono font-bold transition-colors cursor-pointer"
          >
            Review Laws Cheat Sheet
          </button>
        </div>

        {/* Five Responsive Navigation Tabs */}
        <div className="pt-2 border-t border-[#DCE7E1]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {[
              { id: 'start-here', label: '1. Start Here', icon: Compass },
              { id: 'techniques', label: '2. Simplification Techniques', icon: Layers },
              { id: 'worked-models', label: '3. Worked Models', icon: CheckCircle2 },
              { id: 'cheat-sheet', label: '4. Cheat Sheet & Shortcuts', icon: FileText },
              { id: 'practice-lab', label: '5. Practice Lab', icon: Zap }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-150 cursor-pointer text-center ${
                    isActive
                      ? 'bg-[#285C49] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5F6C64] hover:text-[#293B32] hover:bg-[#F0EEEA] border border-[#DCE7E1]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: START HERE                                                         */}
      {/* ========================================================================= */}
      {activeTab === 'start-here' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* TEACHING MESSAGE BANNER */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
              <Sparkles className="w-5 h-5 text-[#285C49]" />
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32]">
                {data.startHere.whySimplify.headline}
              </h2>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#F4F7F4] border-l-4 border-[#285C49] space-y-2">
              <p className="font-editorial text-base sm:text-lg text-[#293B32] leading-relaxed italic">
                "{data.startHere.whySimplify.quote}"
              </p>
              <span className="text-xs font-mono font-bold text-[#285C49] block">
                ZeroIndex Academic Rationale: VR23 Digital Logic Design
              </span>
            </div>

            {/* 4 Physical Benefits */}
            <div className="pt-2 space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
                Tangible Engineering and Hardware Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.startHere.whySimplify.benefits.map((item, idx) => {
                  const icons = [Layers, Cpu, Zap, Clock];
                  const IconComp = icons[idx] || Layers;
                  return (
                    <div key={item.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-[#EBF3ED] text-[#285C49] flex items-center justify-center">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h4 className="font-mono text-xs font-bold text-[#293B32]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#5F6C64] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Engineering Caveat Callout */}
            <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#285C49]/20 text-xs text-[#285C49] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#285C49]" />
              <p className="leading-relaxed">
                <span className="font-bold">Physical Circuit Caveat: </span>
                {data.startHere.whySimplify.engineeringNote}
              </p>
            </div>
          </div>

          {/* OBJECTIVE DEMONSTRATION: F = A + AB -> F = A */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Concrete Demonstration
                </span>
                <span className="font-mono text-xs font-bold text-[#285C49]">
                  {data.startHere.objectiveDemo.lawApplied}
                </span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32] mt-1">
                {data.startHere.objectiveDemo.title}
              </h3>
            </div>

            {/* Before vs After Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Before Card */}
              <div className="p-5 rounded-2xl bg-[#FFF8F5] border border-[#FCD9BD] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FBE5D8] text-[#C05621]">
                    BEFORE SIMPLIFICATION
                  </span>
                  <span className="font-mono text-xs text-[#C05621] font-bold">
                    {data.startHere.objectiveDemo.comparison.before.gateCount}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#FCD9BD] text-center font-mono text-lg font-bold text-[#293B32] whitespace-nowrap overflow-x-auto">
                  {data.startHere.objectiveDemo.comparison.before.expression}
                </div>

                <div className="space-y-1.5 text-xs text-[#5F6C64]">
                  <p><strong className="text-[#293B32]">Literal Count: </strong>{data.startHere.objectiveDemo.comparison.before.literalCount}</p>
                  <p><strong className="text-[#293B32]">Routing: </strong>{data.startHere.objectiveDemo.comparison.before.routing}</p>
                </div>
              </div>

              {/* After Card */}
              <div className="p-5 rounded-2xl bg-[#F0FAF4] border border-[#BDE8CA] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#DCF4E3] text-[#285C49]">
                    AFTER SIMPLIFICATION
                  </span>
                  <span className="font-mono text-xs text-[#285C49] font-bold">
                    {data.startHere.objectiveDemo.comparison.after.gateCount}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#BDE8CA] text-center font-mono text-lg font-bold text-[#285C49] whitespace-nowrap overflow-x-auto">
                  {data.startHere.objectiveDemo.comparison.after.expression}
                </div>

                <div className="space-y-1.5 text-xs text-[#5F6C64]">
                  <p><strong className="text-[#293B32]">Literal Count: </strong>{data.startHere.objectiveDemo.comparison.after.literalCount}</p>
                  <p><strong className="text-[#293B32]">Routing: </strong>{data.startHere.objectiveDemo.comparison.after.routing}</p>
                </div>
              </div>
            </div>

            {/* Why AB adds nothing */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
              <h4 className="font-mono text-xs font-bold text-[#285C49] uppercase tracking-wider">
                Logical Explanation of the Absorption Law
              </h4>
              <p className="text-xs sm:text-sm text-[#293B32] leading-relaxed">
                {data.startHere.objectiveDemo.explanation}
              </p>
            </div>

            {/* Truth Table Comparison */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold text-[#5F6C64] uppercase tracking-wider">
                Exhaustive Truth Table Verification
              </h4>
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-center">
                  <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                    <tr>
                      <th className="p-2.5">A</th>
                      <th className="p-2.5">B</th>
                      <th className="p-2.5">AB</th>
                      <th className="p-2.5 text-[#C05621] font-bold whitespace-nowrap">F = A + AB</th>
                      <th className="p-2.5 text-[#285C49] font-bold whitespace-nowrap">F = A</th>
                      <th className="p-2.5 text-[#285C49] whitespace-nowrap">Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7E1] bg-white text-[#293B32]">
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-2">0</td>
                      <td className="p-2">0</td>
                      <td className="p-2">0</td>
                      <td className="p-2 font-bold text-[#C05621]">0</td>
                      <td className="p-2 font-bold text-[#285C49]">0</td>
                      <td className="p-2 text-[#285C49] font-bold">YES</td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-2">0</td>
                      <td className="p-2">1</td>
                      <td className="p-2">0</td>
                      <td className="p-2 font-bold text-[#C05621]">0</td>
                      <td className="p-2 font-bold text-[#285C49]">0</td>
                      <td className="p-2 text-[#285C49] font-bold">YES</td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-2">1</td>
                      <td className="p-2">0</td>
                      <td className="p-2">0</td>
                      <td className="p-2 font-bold text-[#C05621]">1</td>
                      <td className="p-2 font-bold text-[#285C49]">1</td>
                      <td className="p-2 text-[#285C49] font-bold">YES</td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-2">1</td>
                      <td className="p-2">1</td>
                      <td className="p-2">1</td>
                      <td className="p-2 font-bold text-[#C05621]">1</td>
                      <td className="p-2 font-bold text-[#285C49]">1</td>
                      <td className="p-2 text-[#285C49] font-bold">YES</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* THE SIX-STEP BOOLEAN SIMPLIFICATION METHOD */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Algorithmic Framework
                </span>
                <span className="font-mono text-xs font-bold text-[#285C49]">
                  {data.startHere.sixSteps.subtitle}
                </span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32] mt-1">
                {data.startHere.sixSteps.title}
              </h3>
            </div>

            {/* 6 Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.startHere.sixSteps.steps.map((st) => (
                <div key={st.step} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#285C49]">
                        Step {st.step}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#293B32]">
                        {st.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Loop Note Callout */}
            <div className="p-3.5 rounded-xl bg-[#EBF3ED] border border-[#285C49]/20 text-xs text-[#285C49] flex items-start gap-2.5">
              <RotateCcw className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#285C49]" />
              <p className="leading-relaxed">
                <span className="font-bold">Iterative Process Note: </span>
                {data.startHere.sixSteps.loopNote}
              </p>
            </div>
          </div>

          {/* EQUIVALENT VERSUS MINIMAL EXPRESSIONS */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Critical Theoretical Distinction
                </span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32] mt-1">
                {data.startHere.equivVsMinimal.title}
              </h3>
            </div>

            {/* 3 Categories Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.startHere.equivVsMinimal.definitions.map((def, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#EBF3ED] text-[#285C49] font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <h4 className="font-mono text-xs font-bold text-[#293B32]">
                      {def.term}
                    </h4>
                  </div>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    {def.meaning}
                  </p>
                </div>
              ))}
            </div>

            {/* Caution Note Callout */}
            <div className="p-3.5 rounded-xl bg-[#FFF8F5] border border-[#FCD9BD] text-xs text-[#C05621] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#C05621]" />
              <p className="leading-relaxed">
                <span className="font-bold">Academic Caution: </span>
                {data.startHere.equivVsMinimal.cautionNote}
              </p>
            </div>
          </div>

          {/* Curated Video Card */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F6C64]">
              Supplementary Verified Video Lecture
            </h3>
            <CuratedVideoCard videoKey="boolean-examples" />
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SIMPLIFICATION TECHNIQUES                                          */}
      {/* ========================================================================= */}
      {activeTab === 'techniques' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Introduction */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div>
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                Foundational Laws and Patterns
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#293B32] mt-2">
                Simplification Techniques and Pattern Recognition
              </h2>
              <p className="text-sm text-[#5F6C64] mt-1 leading-relaxed">
                Simplification is the systematic process of spotting Boolean structural patterns. Master the eight fundamental OR and AND laws below before moving to factoring, absorption, and consensus.
              </p>
            </div>
          </div>

          {/* FOUR FUNDAMENTAL OR AND AND LAWS - SIDE BY SIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Four Fundamental OR Laws */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#285C49]" />
                  <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                    Four Fundamental OR Laws
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#285C49] font-bold">
                  OR (+ Disjunction)
                </span>
              </div>

              <div className="space-y-3">
                {data.techniques.fourOrLaws.map((l) => (
                  <div key={l.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#285C49]">
                        {l.name}
                      </span>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white border border-[#DCE7E1] text-[#293B32] whitespace-nowrap shadow-2xs">
                        {l.formula}
                      </span>
                    </div>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {l.explanation}
                    </p>
                    <div className="pt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono border-t border-[#DCE7E1]/50 text-[#5F6C64]">
                      <span>Example: <strong className="text-[#293B32] whitespace-nowrap">{l.example}</strong></span>
                      <span className="text-[#285C49]">Tip: {l.recognitionTip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Four Fundamental AND Laws */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#285C49]" />
                  <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                    Four Fundamental AND Laws
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#285C49] font-bold">
                  AND (· Conjunction)
                </span>
              </div>

              <div className="space-y-3">
                {data.techniques.fourAndLaws.map((l) => (
                  <div key={l.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#285C49]">
                        {l.name}
                      </span>
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white border border-[#DCE7E1] text-[#293B32] whitespace-nowrap shadow-2xs">
                        {l.formula}
                      </span>
                    </div>
                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      {l.explanation}
                    </p>
                    <div className="pt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono border-t border-[#DCE7E1]/50 text-[#5F6C64]">
                      <span>Example: <strong className="text-[#293B32] whitespace-nowrap">{l.example}</strong></span>
                      <span className="text-[#285C49]">Tip: {l.recognitionTip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* DUALITY COMPARISON STRIP */}
          <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DCE7E1] space-y-2">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#285C49]">
              {data.techniques.dualitySummary.headline}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono text-[#293B32]">
              <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                <span className="text-[#5F6C64] block text-[10px] uppercase font-bold tracking-wider">OR Identity</span>
                <div className="font-bold text-[#285C49] whitespace-nowrap bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DCE7E1] text-center">
                  A + 0 = A
                </div>
                <span className="text-[11px] text-[#5F6C64] block">0 preserves OR</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                <span className="text-[#5F6C64] block text-[10px] uppercase font-bold tracking-wider">AND Identity</span>
                <div className="font-bold text-[#285C49] whitespace-nowrap bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DCE7E1] text-center">
                  A · 1 = A
                </div>
                <span className="text-[11px] text-[#5F6C64] block">1 preserves AND</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                <span className="text-[#5F6C64] block text-[10px] uppercase font-bold tracking-wider">OR Domination</span>
                <div className="font-bold text-[#285C49] whitespace-nowrap bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DCE7E1] text-center">
                  A + 1 = 1
                </div>
                <span className="text-[11px] text-[#5F6C64] block">1 dominates OR</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] space-y-1">
                <span className="text-[#5F6C64] block text-[10px] uppercase font-bold tracking-wider">AND Domination</span>
                <div className="font-bold text-[#285C49] whitespace-nowrap bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DCE7E1] text-center">
                  A · 0 = 0
                </div>
                <span className="text-[11px] text-[#5F6C64] block">0 dominates AND</span>
              </div>
            </div>
            <p className="text-xs text-[#5F6C64] italic pt-1">
              {data.techniques.dualitySummary.takeaway}
            </p>
          </div>

          {/* TEN CORE PATTERN RECOGNITION TECHNIQUES */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Core Pattern Recognition
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32] mt-1">
                  10 Algebraic Simplification Techniques
                </h3>
              </div>
              <span className="font-mono text-xs text-[#5F6C64]">
                10 Recognized Patterns
              </span>
            </div>

            {/* Technique Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.techniques.tenTechniques.map((tech) => (
                <div key={tech.number} className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#1E4537] text-white shadow-2xs tracking-wide">
                        Technique {tech.number}
                      </span>
                      <span className="font-mono text-xs text-[#5F6C64]">
                        Pattern: <code className="text-[#285C49] font-bold">{tech.pattern}</code>
                      </span>
                    </div>

                    <h4 className="font-mono text-sm font-bold text-[#293B32]">
                      {tech.name}
                    </h4>

                    <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-center font-mono text-xs font-bold text-[#285C49] whitespace-nowrap overflow-x-auto">
                      {tech.formula}
                    </div>

                    <p className="text-xs text-[#5F6C64] leading-relaxed">
                      <strong className="text-[#293B32]">Why It Works: </strong>
                      {tech.whyItWorks}
                    </p>

                    <div className="p-2.5 rounded-lg bg-white/70 border border-[#DCE7E1]/60 text-xs font-mono text-[#293B32] space-y-1">
                      <span className="text-[10px] text-[#5F6C64] uppercase tracking-wider block">Worked Application:</span>
                      <div className="overflow-x-auto whitespace-nowrap">{tech.example}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DCE7E1] space-y-2 text-[11px]">
                    <div className="text-[#285C49]">
                      <strong>When to Apply: </strong>{tech.whenToApply}
                    </div>
                    {tech.mistake && (
                      <div className="p-2.5 rounded-lg bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#9B2C2C] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#C53030]">
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>Watch Out (Strict Prohibition):</span>
                        </div>
                        <p className="leading-relaxed text-[11px] text-[#742A2A]">
                          {tech.mistake.replace(/^Watch Out:\s*/i, '')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMMON MISTAKES PANEL */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DCE7E1]">
              <AlertTriangle className="w-5 h-5 text-[#C05621]" />
              <h3 className="font-editorial text-xl font-bold text-[#293B32]">
                10 Common Simplification Mistakes to Avoid
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5F6C64]">
              These frequent errors cost marks and produce invalid circuit logic. Always apply the verified method.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {data.commonMistakes.map((m) => (
                <div key={m.id} className="p-4 rounded-xl bg-[#FFF8F5] border border-[#FCD9BD] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C05621]">
                      {m.id.toUpperCase()}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FBE5D8] text-[#C05621]">
                      MISTAKE
                    </span>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#FCD9BD] text-xs font-mono text-[#C05621]">
                    ✗ {m.mistake}
                  </div>
                  <div className="p-2 rounded bg-[#F0FAF4] border border-[#BDE8CA] text-xs font-mono text-[#285C49]">
                    ✓ {m.correctMethod}
                  </div>
                  <p className="text-[11px] text-[#5F6C64] leading-relaxed">
                    <strong>Why: </strong>{m.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: WORKED MODELS                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'worked-models' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header & Difficulty Filter */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Comprehensive Model Library
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#293B32] mt-2">
                  Progressive Worked Solutions (23 Core + 1 Challenge)
                </h2>
                <p className="text-sm text-[#5F6C64] mt-1 leading-relaxed">
                  Every solution reveals the exact law applied and answers the crucial question: <em>"WHY was this law chosen at this specific step?"</em>
                </p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="pt-2 border-t border-[#DCE7E1] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#5F6C64] flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {['All', 'Basic', 'Intermediate', 'Advanced', 'Challenge'].map((lvl) => {
                const count = lvl === 'All' 
                  ? data.workedModels.length 
                  : data.workedModels.filter(m => m.level === lvl).length;
                const isSelected = modelFilter === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setModelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#285C49] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#5F6C64] hover:text-[#293B32] hover:bg-[#F0EEEA] border border-[#DCE7E1]'
                    }`}
                  >
                    {lvl} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Cards List */}
          <div className="space-y-6">
            {filteredModels.map((model) => {
              const isExpanded = !!expandedModels[model.id];
              const diffColors = {
                'Basic': 'bg-[#EBF3ED] text-[#285C49] border-[#285C49]/20',
                'Intermediate': 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
                'Advanced': 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]',
                'Challenge': 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
              };

              return (
                <div 
                  key={model.id}
                  id={model.id}
                  className="rounded-2xl bg-white border border-[#DCE7E1] shadow-soft overflow-hidden transition-all duration-200"
                >
                  {/* Card Header Bar */}
                  <div className="p-5 sm:p-6 bg-[#FAF8F5] border-b border-[#DCE7E1] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-[#DCE7E1] text-[#293B32]">
                          {model.number}
                        </span>
                        <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full border ${diffColors[model.level] || ''}`}>
                          {model.level}
                        </span>
                        <span className="font-mono text-xs text-[#5F6C64]">
                          {model.variables}
                        </span>
                      </div>
                      
                      {/* Techniques Tags */}
                      <div className="flex flex-wrap gap-1">
                        {model.techniques.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#5F6C64] border border-[#DCE7E1]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#293B32]">
                        {model.title}
                      </h3>
                    </div>

                    {/* Original Expression & Target Result Banner */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#DCE7E1] flex flex-wrap items-center justify-between gap-3 font-mono">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#5F6C64] block">
                          Original Expression:
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#293B32] whitespace-nowrap overflow-x-auto">
                          {model.originalExpression}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="space-y-0.5 text-right">
                          <span className="text-[10px] uppercase tracking-wider text-[#5F6C64] block">
                            Target Result:
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[#285C49] whitespace-nowrap">
                            {model.finalAnswer}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleModel(model.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#285C49] hover:bg-[#1E4537] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Steps</span>
                              <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Show Steps ({model.steps.length})</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Step-by-Step Derivation */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-6">
                      
                      {/* Derivation Steps Table / Cards */}
                      <div className="space-y-3">
                        <span className="text-xs font-mono font-bold text-[#285C49] uppercase tracking-wider block">
                          Step-by-Step Algebraic Transformations
                        </span>

                        <div className="space-y-3">
                          {model.steps.map((st) => (
                            <div 
                              key={st.step} 
                              className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-2 text-left"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-[#DCE7E1] text-[#285C49]">
                                  Step {st.step}
                                </span>
                                <span className="font-mono text-xs font-bold text-[#285C49] px-2 py-0.5 rounded bg-[#EBF3ED]">
                                  {st.law}
                                </span>
                              </div>

                              <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] font-mono text-sm sm:text-base font-bold text-[#293B32] overflow-x-auto whitespace-nowrap">
                                {st.expr}
                              </div>

                              <div className="text-xs text-[#5F6C64] leading-relaxed pt-1">
                                <strong className="text-[#293B32]">WHY this law: </strong>
                                {st.reason}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Verified Final Result Box */}
                      <div className="p-4 rounded-xl bg-[#F0FAF4] border border-[#BDE8CA] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-[#285C49] flex-shrink-0" />
                          <div>
                            <span className="font-mono text-xs text-[#285C49] font-bold block">
                              Final Verified Equivalent Expression
                            </span>
                            <span className="font-mono text-base font-bold text-[#285C49] whitespace-nowrap">
                              {model.finalAnswer}
                            </span>
                          </div>
                        </div>
                        <div className="text-right text-xs font-mono text-[#5F6C64]">
                          {model.verification}
                        </div>
                      </div>

                      {/* Observation / Common Mistake / Pitfall */}
                      {model.pitfall && (
                        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#5F6C64] flex items-start gap-2">
                          <Info className="w-4 h-4 text-[#285C49] flex-shrink-0 mt-0.5" />
                          <p className="leading-relaxed">
                            <strong className="text-[#293B32]">Key Takeaway: </strong>
                            {model.pitfall}
                          </p>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CHEAT SHEET & SHORTCUTS                                            */}
      {/* ========================================================================= */}
      {activeTab === 'cheat-sheet' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Decision Strategy Guide
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#293B32] mt-2">
                  {data.cheatSheet.title}
                </h2>
                <p className="text-sm text-[#5F6C64] mt-1 leading-relaxed">
                  {data.cheatSheet.description}
                </p>
              </div>
              <button
                onClick={() => setShowMasterCheatModal(true)}
                className="px-3 py-2 rounded-xl bg-[#285C49] hover:bg-[#1E4537] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Full Laws Cheat Sheet</span>
              </button>
            </div>
          </div>

          {/* LAW-SELECTION DECISION GUIDE FLOWCHART */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Visual Decision Pipeline
                </span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#293B32] mt-1">
                Law-Selection Decision Pipeline
              </h3>
            </div>

            {/* Step Pipeline Cards */}
            <div className="space-y-3">
              {data.cheatSheet.decisionGuide.map((dg, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#285C49] text-white font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-[#293B32] block">
                        {dg.step}: <em className="text-[#285C49]">{dg.condition}</em>
                      </span>
                      <p className="text-xs text-[#5F6C64]">
                        Action: {dg.action}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOUR OR AND AND LAWS TABLES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* OR Laws Table */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                Four Fundamental OR Identities
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                    <tr>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Formula</th>
                      <th className="p-2.5">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7E1] bg-white">
                    {data.cheatSheet.orLawsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]">
                        <td className="p-2.5 font-bold text-[#285C49] whitespace-nowrap">{row.name}</td>
                        <td className="p-2.5 font-bold text-[#293B32] whitespace-nowrap">{row.formula}</td>
                        <td className="p-2.5 text-[#5F6C64] font-sans text-[11px]">{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AND Laws Table */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                Four Fundamental AND Identities
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                    <tr>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Formula</th>
                      <th className="p-2.5">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE7E1] bg-white">
                    {data.cheatSheet.andLawsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]">
                        <td className="p-2.5 font-bold text-[#285C49] whitespace-nowrap">{row.name}</td>
                        <td className="p-2.5 font-bold text-[#293B32] whitespace-nowrap">{row.formula}</td>
                        <td className="p-2.5 text-[#5F6C64] font-sans text-[11px]">{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* PATTERN RECOGNITION GUIDE TABLE */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#293B32]">
              Pattern Recognition Quick Reference
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6C64]">
              Match what your eyes see in an expression with the target identity and mental shortcut.
            </p>

            <div className="overflow-x-auto rounded-xl border border-[#DCE7E1]">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-[#FAF8F5] border-b border-[#DCE7E1] text-[#293B32]">
                  <tr>
                    <th className="p-3">What You See (Pattern)</th>
                    <th className="p-3">Governing Law</th>
                    <th className="p-3">Transformed Form</th>
                    <th className="p-3">Mental Shortcut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE7E1] bg-white text-[#293B32]">
                  {data.cheatSheet.patternRecognition.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5]">
                      <td className="p-3 font-bold text-[#C05621] whitespace-nowrap">{pt.trigger}</td>
                      <td className="p-3 text-[#285C49] font-bold whitespace-nowrap">{pt.law}</td>
                      <td className="p-3 font-bold whitespace-nowrap">{pt.result}</td>
                      <td className="p-3 text-[#5F6C64] font-sans">{pt.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* OPERATOR PRECEDENCE & FACTORING SHORTCUTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Operator Precedence */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                Operator Precedence Hierarchy
              </h3>
              <div className="space-y-2">
                {data.cheatSheet.precedenceHierarchy.map((lvl) => (
                  <div key={lvl.rank} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#1E4537] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 shadow-2xs">
                        {lvl.rank}
                      </span>
                      <span className="font-bold text-[#293B32] whitespace-nowrap">{lvl.operator}</span>
                    </div>
                    <span className="text-[#5F6C64] text-[11px] sm:text-right">{lvl.rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Factoring Shortcuts */}
            <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
              <h3 className="font-editorial text-lg font-bold text-[#293B32]">
                Core Factoring and Expansion Shortcuts
              </h3>
              <div className="space-y-2.5">
                {data.cheatSheet.factoringShortcuts.map((sc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-1">
                    <span className="font-mono text-xs font-bold text-[#285C49] block">
                      {sc.name}
                    </span>
                    <div className="p-2 rounded bg-white border border-[#DCE7E1] font-mono text-xs font-bold text-[#293B32] whitespace-nowrap overflow-x-auto">
                      {sc.form}
                    </div>
                    <p className="text-[11px] text-[#5F6C64]">
                      {sc.tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SIMPLIFICATION CHECKLIST */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#293B32]">
              Seven-Point Algebraic Simplification Checklist
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6C64]">
              Before declaring a solution finalized, run through these seven quality validation criteria.
            </p>

            <div className="space-y-2 pt-2">
              {data.cheatSheet.simplificationChecklist.map((item, idx) => {
                const isChecked = !!checkedChecklist[idx];
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleChecklistItem(idx)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-[#F0FAF4] border-[#BDE8CA] text-[#285C49]'
                        : 'bg-[#FAF8F5] border-[#DCE7E1] text-[#293B32] hover:bg-[#F0EEEA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isChecked 
                          ? 'bg-[#285C49] border-[#285C49] text-white' 
                          : 'bg-white border-[#DCE7E1]'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs sm:text-sm font-normal">
                        {item}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#5F6C64]">
                      {isChecked ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PRACTICE LAB                                                       */}
      {/* ========================================================================= */}
      {activeTab === 'practice-lab' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header & Filter */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF3ED] text-[#285C49] border border-[#285C49]/20">
                  Self-Directed Practice Arena
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#293B32] mt-2">
                  24 Validated Algebraic Simplification Exercises
                </h2>
                <p className="text-sm text-[#5F6C64] mt-1 leading-relaxed">
                  Solve each expression algebraically on paper, leverage progressive hints if you get stuck, and reveal the rigorous multi-step solution to verify your derivation.
                </p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="pt-2 border-t border-[#DCE7E1] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#5F6C64] flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {['All', 'Basic', 'Intermediate', 'Advanced'].map((lvl) => {
                const count = lvl === 'All' 
                  ? data.practiceLab.length 
                  : data.practiceLab.filter(p => p.difficulty === lvl).length;
                const isSelected = practiceFilter === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => setPracticeFilter(lvl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#285C49] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#5F6C64] hover:text-[#293B32] hover:bg-[#F0EEEA] border border-[#DCE7E1]'
                    }`}
                  >
                    {lvl} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Practice Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPractice.map((prob) => {
              const isSolutionRevealed = !!revealedPracticeSolutions[prob.id];
              const isHint1Revealed = !!revealedHints[`${prob.id}_hint1`];
              const isHint2Revealed = !!revealedHints[`${prob.id}_hint2`];

              const diffColors = {
                'Basic': 'bg-[#EBF3ED] text-[#285C49] border-[#285C49]/20',
                'Intermediate': 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
                'Advanced': 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]'
              };

              return (
                <div 
                  key={prob.id}
                  id={prob.id}
                  className="rounded-2xl bg-white border border-[#DCE7E1] shadow-soft p-5 space-y-4 flex flex-col justify-between text-left"
                >
                  <div className="space-y-3">
                    
                    {/* Header line */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-white border border-[#DCE7E1] text-[#293B32]">
                          {prob.number}
                        </span>
                        <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full border ${diffColors[prob.difficulty] || ''}`}>
                          {prob.difficulty}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#5F6C64]">
                        {prob.variables}
                      </span>
                    </div>

                    {/* Problem Statement & Expression */}
                    <div className="p-2.5 rounded-lg bg-white border border-[#DCE7E1] font-mono text-sm font-bold text-[#293B32] overflow-x-auto whitespace-nowrap">
                      {prob.problem}
                    </div>

                    {/* Techniques */}
                    <div className="flex flex-wrap gap-1">
                      {prob.techniques.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[#5F6C64] border border-[#DCE7E1]">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Two-Tier Hints */}
                    <div className="space-y-2 pt-1">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleHint(prob.id, 1)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                            isHint1Revealed
                              ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-bold'
                              : 'bg-[#FAF8F5] text-[#5F6C64] hover:bg-[#F0EEEA] border border-[#DCE7E1]'
                          }`}
                        >
                          {isHint1Revealed ? 'Hide Hint 1' : 'Show Hint 1'}
                        </button>
                        {prob.hint2 && (
                          <button
                            onClick={() => toggleHint(prob.id, 2)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                              isHint2Revealed
                                ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-bold'
                                : 'bg-[#FAF8F5] text-[#5F6C64] hover:bg-[#F0EEEA] border border-[#DCE7E1]'
                            }`}
                          >
                            {isHint2Revealed ? 'Hide Hint 2' : 'Show Hint 2'}
                          </button>
                        )}
                      </div>

                      {isHint1Revealed && (
                        <div className="p-2.5 rounded-lg bg-[#FEF3C7]/40 border border-[#FDE68A] text-xs text-[#92400E]">
                          <strong>Hint 1: </strong>{prob.hint1}
                        </div>
                      )}

                      {isHint2Revealed && prob.hint2 && (
                        <div className="p-2.5 rounded-lg bg-[#FEF3C7]/60 border border-[#FDE68A] text-xs text-[#92400E]">
                          <strong>Hint 2: </strong>{prob.hint2}
                        </div>
                      )}
                    </div>

                    {/* Revealed Solution Box */}
                    {isSolutionRevealed && (
                      <div className="pt-3 border-t border-[#DCE7E1] space-y-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#285C49] block">
                          Verified Step-by-Step Derivation:
                        </span>

                        <div className="space-y-2">
                          {prob.solutionSteps.map((st) => (
                            <div key={st.step} className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] space-y-1 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold text-[#5F6C64]">
                                  Step {st.step}
                                </span>
                                <span className="font-mono text-[10px] font-bold text-[#285C49] px-1.5 py-0.5 rounded bg-white border border-[#DCE7E1]">
                                  {st.law}
                                </span>
                              </div>
                              <div className="font-mono text-xs font-bold text-[#293B32] p-2 rounded bg-white border border-[#DCE7E1] overflow-x-auto whitespace-nowrap">
                                {st.expr}
                              </div>
                              <p className="text-[11px] text-[#5F6C64]">
                                {st.reason}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Verified Final Answer Box */}
                        <div className="p-3 rounded-xl bg-[#F0FAF4] border border-[#BDE8CA] flex items-center justify-between gap-2 font-mono">
                          <span className="text-xs font-bold text-[#285C49]">
                            Answer:
                          </span>
                          <span className="text-sm font-bold text-[#285C49] whitespace-nowrap">
                            {prob.finalAnswer}
                          </span>
                        </div>

                        {/* Key Takeaway */}
                        {prob.keyTakeaway && (
                          <p className="text-[11px] text-[#5F6C64] italic">
                            <strong>Note: </strong>{prob.keyTakeaway}
                          </p>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Toggle Solution Button */}
                  <div className="pt-3 border-t border-[#DCE7E1]">
                    <button
                      onClick={() => togglePracticeSolution(prob.id)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        isSolutionRevealed
                          ? 'bg-[#FAF8F5] text-[#293B32] hover:bg-[#F0EEEA] border border-[#DCE7E1]'
                          : 'bg-[#285C49] text-white hover:bg-[#1E4537]'
                      }`}
                    >
                      {isSolutionRevealed ? (
                        <>
                          <span>Hide Solution</span>
                          <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Reveal Step-by-Step Solution</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MASTER BOOLEAN LAWS CHEAT SHEET                                    */}
      {/* ========================================================================= */}
      {showMasterCheatModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#DCE7E1] shadow-2xl p-6 sm:p-8 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#285C49]" />
                <h3 className="font-editorial text-xl font-bold text-[#293B32]">
                  Section 2.1 Master Boolean Laws Reference
                </h3>
              </div>
              <button
                onClick={() => setShowMasterCheatModal(false)}
                className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F0EEEA] text-[#5F6C64] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#5F6C64]">
              Huntington postulates, complementary theorems, De Morgan identities, and redundancy rules from Section 2.1.
            </p>

            <BooleanLawsCheatSheet />

            <div className="pt-3 border-t border-[#DCE7E1] flex justify-end">
              <button
                onClick={() => setShowMasterCheatModal(false)}
                className="px-4 py-2 rounded-xl bg-[#285C49] text-white text-xs font-mono font-bold hover:bg-[#1E4537] cursor-pointer"
              >
                Close Cheat Sheet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Section22View;
