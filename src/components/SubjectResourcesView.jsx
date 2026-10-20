import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  Download, 
  Calculator, 
  Video, 
  Globe, 
  FileText, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Printer, 
  Sparkles, 
  Search, 
  Filter, 
  X, 
  ChevronRight,
  ShieldCheck,
  Info
} from 'lucide-react';
import { dldSyllabus } from '../data/dldSyllabus';
import { dldSubjectResourcesData } from '../data/dldSubjectResourcesData';
import { ViitCrest } from './ViitCrest';
import { BooleanLawsCheatSheet } from './BooleanLawsCheatSheet';
import { KMapCheatSheet } from './KMapCheatSheet';

/**
 * SubjectResourcesView
 * ZeroIndex Engineering Platform - Digital Logic Design (DLD)
 * Phase 3 Academic Reference Center for Unit I & Unit II
 * Strictly zero em-dashes and zero en-dashes throughout.
 * Mandatory Unicode Sigma (\u03A3) and Pi (\u03A0).
 */
export const SubjectResourcesView = ({ onNavigate, initialUnit = 1 }) => {
  const [selectedUnit, setSelectedUnit] = useState(initialUnit === 2 ? 2 : 1);
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'textbooks' | 'formulas' | 'channels' | 'websites' | 'calculators' | 'syllabus'
  const [calculatorCategory, setCalculatorCategory] = useState('all'); // 'all' | 'boolean' | 'kmap' | 'number'
  const [activeModalSheet, setActiveModalSheet] = useState(null); // null | 'boolean-laws' | 'kmap'

  useEffect(() => {
    if (initialUnit) {
      setSelectedUnit(initialUnit === 2 ? 2 : 1);
    }
  }, [initialUnit]);

  const { studyMaterials, formulaSheets, educationalChannels, referenceWebsites, onlineCalculators, unitsMetadata } = dldSubjectResourcesData;
  const currentUnitMeta = unitsMetadata.find(u => u.unitNumber === selectedUnit) || unitsMetadata[0];
  const activeFormulaSheets = selectedUnit === 2 ? formulaSheets.unit2 : formulaSheets.unit1;

  const handleContextAction = (target) => {
    if (onNavigate && target) {
      onNavigate(target);
    }
  };

  const filteredCalculators = calculatorCategory === 'all'
    ? onlineCalculators
    : onlineCalculators.filter(c => c.categoryKey === calculatorCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-150">
      
      {/* 1. SUBJECT HEADER BANNER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <ViitCrest className="w-6 h-6" />
            <span className="text-xs font-bold text-[#285C49]">Vignan's Institute of Information Technology (A)</span>
            <span className="text-xs text-[#64748B]">Autonomous Curriculum</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#F2F7F4] text-[#285C49] border border-[#DCE7E1]">
              Course Code: {dldSyllabus.courseCode}
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#FAF8F5] text-[#1E293B] border border-[#DCE7E1]">
              {dldSyllabus.ltpc}
            </span>
            
            {/* Google Drive Study Materials Placeholder */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF8F5] text-[#64748B] border border-[#DCE7E1] text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="font-semibold text-[#1E293B]">{studyMaterials.driveConfig.resourceName}:</span>
              <span>{studyMaterials.driveConfig.statusText}</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
              Academic Reference Center
            </span>
            <span className="text-xs text-[#64748B]">Curated References, Textbooks &amp; Quick Revision</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            {dldSyllabus.courseTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-mono">
            {dldSyllabus.yearSem} · {dldSyllabus.branch} · {dldSyllabus.credits} Credits
          </p>
          <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49] block mb-1">
              Course Overview
            </span>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {dldSyllabus.overview}
            </p>
          </div>
        </div>
      </div>

      {/* 2. UNIT SELECTOR & CATEGORY FILTER BAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
        
        {/* Unit Selector Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#F2F7F4]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#285C49]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Active Course Unit:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Unit 1 Button */}
            <button
              onClick={() => setSelectedUnit(1)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                selectedUnit === 1
                  ? 'bg-[#285C49] text-white shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#DCE7E1] text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <span>Unit I: Number Systems &amp; Digital Fundamentals</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                selectedUnit === 1 ? 'bg-white/20 text-white' : 'bg-[#EBF3ED] text-[#285C49]'
              }`}>
                Sec 1.1 to 1.7
              </span>
            </button>

            {/* Unit 2 Button */}
            <button
              onClick={() => setSelectedUnit(2)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                selectedUnit === 2
                  ? 'bg-[#285C49] text-white shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#DCE7E1] text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <span>Unit II: Boolean Algebra &amp; Karnaugh Maps</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                selectedUnit === 2 ? 'bg-white/20 text-white' : 'bg-[#EBF3ED] text-[#285C49]'
              }`}>
                Sec 2.1 to 2.5
              </span>
            </button>

            {/* Units 3 to 5 Future Notice */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-[11px] font-mono text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>Units III to V: In Curriculum Blueprint</span>
            </div>
          </div>
        </div>

        {/* Resource Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Resources', icon: BookOpen },
            { id: 'textbooks', label: 'Textbooks & Materials', icon: GraduationCap },
            { id: 'formulas', label: 'Formula Sheets & Revision', icon: FileText },
            { id: 'channels', label: 'Educational Channels', icon: Video },
            { id: 'websites', label: 'Reference Websites', icon: Globe },
            { id: 'calculators', label: 'Online Calculators', icon: Calculator },
            { id: 'syllabus', label: 'Curriculum Syllabus', icon: Award }
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#285C49] text-white shadow-2xs'
                    : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. SECTION B: FORMULA SHEETS AND QUICK REVISION (When 'all' or 'formulas') */}
      {(activeCategory === 'all' || activeCategory === 'formulas') && (
        <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                  {currentUnitMeta.roman} Revision Center
                </span>
                <span className="text-xs text-[#64748B]">{currentUnitMeta.shortTitle}</span>
              </div>
              <h2 className="text-xl font-bold text-[#1E293B] mt-1">
                Formula Sheets &amp; Section-by-Section Quick Revision
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Key principles, operational laws, fast shortcuts, and connected links to interactive solvers and practice.
              </p>
            </div>

            {/* Quick Interactive Cheat Sheet Triggers for Unit 2 */}
            {selectedUnit === 2 && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveModalSheet('boolean-laws')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#285C49] text-xs font-bold text-[#285C49] transition-all shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#285C49]" />
                  <span>Boolean Laws Cheat Sheet</span>
                </button>
                <button
                  onClick={() => setActiveModalSheet('kmap')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] hover:border-[#285C49] text-xs font-bold text-[#285C49] transition-all shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#285C49]" />
                  <span>K-Map Topography Sheet</span>
                </button>
              </div>
            )}
          </div>

          {/* Revision Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeFormulaSheets.map((sheet) => {
              const linkConfig = dldSubjectResourcesData.contextualLearningMap[sheet.sectionId];
              return (
                <div 
                  key={sheet.id}
                  className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between space-y-4 hover:border-[#285C49]/40 transition-all shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#DCE7E1]/80">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#285C49] uppercase tracking-wider block">
                          {sheet.sectionId} Revision Guide
                        </span>
                        <h3 className="text-sm font-bold text-[#1E293B] mt-0.5">{sheet.title}</h3>
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B] bg-white px-2 py-0.5 rounded border border-[#DCE7E1]">
                        {sheet.topic}
                      </span>
                    </div>

                    {/* Structured Key Takeaways */}
                    <ul className="space-y-1.5">
                      {sheet.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#475569] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#285C49] mt-1.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Key Rules / Formulas Panel */}
                    <div className="p-3 rounded-lg bg-white border border-[#DCE7E1] space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                        Essential Rules &amp; Identities
                      </span>
                      {sheet.keyRules.map((kr, idx) => (
                        <div key={idx} className="text-xs flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1 border-b border-[#F2F7F4] last:border-0 last:pb-0 font-mono">
                          <span className="font-bold text-[#1E293B]">{kr.rule}:</span>
                          <span className="text-[#285C49] text-[11px] sm:text-right">{kr.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connected Actions Footer: Learn -> Experiment -> Practise */}
                  {linkConfig && (
                    <div className="pt-3 border-t border-[#DCE7E1] flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => handleContextAction({ tab: 'units', unit: selectedUnit, subId: sheet.sectionId })}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#285C49] hover:underline"
                      >
                        <span>Open Lesson {sheet.sectionId}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <div className="flex items-center gap-2">
                        {linkConfig.solverTarget && (
                          <button
                            onClick={() => handleContextAction(linkConfig.solverTarget)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#DCE7E1] hover:border-[#285C49] text-[11px] font-semibold text-[#1E293B] transition-colors"
                            title={linkConfig.solverTarget.label}
                          >
                            <Calculator className="w-3 h-3 text-[#285C49]" />
                            <span>Solver</span>
                          </button>
                        )}
                        {linkConfig.practiceTarget && (
                          <button
                            onClick={() => handleContextAction(linkConfig.practiceTarget)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#DCE7E1] hover:border-[#285C49] text-[11px] font-semibold text-[#1E293B] transition-colors"
                            title={linkConfig.practiceTarget.label}
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#285C49]" />
                            <span>Practise</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SECTION A: TEXTBOOKS AND STUDY MATERIALS (When 'all' or 'textbooks') */}
      {(activeCategory === 'all' || activeCategory === 'textbooks') && (
        <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F2F7F4] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                  Literature &amp; Textbooks
                </span>
                <span className="text-xs text-[#64748B]">Prescribed VIIT Curriculum</span>
              </div>
              <h2 className="text-xl font-bold text-[#1E293B] mt-1">Prescribed Text Books and Reference Books</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Authentic academic references conforming to the official university syllabus. No pirated or unverified files.
              </p>
            </div>
          </div>

          {/* Prescribed Textbooks */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#285C49]">
              Prescribed Text Books
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {studyMaterials.textbooks.map((book) => (
                <div key={book.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between space-y-3 shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-[#285C49]">Textbook {book.number}</span>
                      <span className="text-[10px] text-[#64748B] font-mono">{book.publisher}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1E293B]">
                      {book.title}, {book.edition}
                    </h4>
                    <p className="text-xs text-[#475569] mt-0.5 font-medium">{book.authors}</p>
                    <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{book.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#DCE7E1] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>Library Call: {book.libraryCallNumber}</span>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-[#DCE7E1] text-[10px] font-medium text-[#64748B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{book.statusText}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Books */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
              Supplementary Reference Books
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {studyMaterials.referenceBooks.map((ref) => (
                <div key={ref.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between shadow-2xs">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#285C49] block mb-1">
                      Reference {ref.number} · {ref.edition}
                    </span>
                    <h4 className="text-xs font-bold text-[#1E293B] mb-1">{ref.title}</h4>
                    <p className="text-[11px] text-[#475569]">{ref.authors}, {ref.publisher}.</p>
                    <p className="text-[11px] text-[#64748B] mt-1.5 leading-relaxed">{ref.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#DCE7E1]/60 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                    <span>Units: {ref.unitsCovered.map(u => `Unit ${u}`).join(', ')}</span>
                    <span className="text-[#285C49] font-semibold">Academic Reference</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. SECTION C: RECOMMENDED EDUCATIONAL CHANNELS (When 'all' or 'channels') */}
      {(activeCategory === 'all' || activeCategory === 'channels') && (
        <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F2F7F4] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                  Video Reference
                </span>
                <span className="text-xs text-[#64748B]">Selective Educational Educators</span>
              </div>
              <h2 className="text-xl font-bold text-[#1E293B] mt-1">Recommended Educational Channels</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Curated educational educators on YouTube known for pedagogy, clarity, and rigorous problem derivations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationalChannels.map((channel) => (
              <div 
                key={channel.id} 
                className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#285C49]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1E293B]">{channel.name}</h4>
                        <span className="text-[10px] font-mono text-[#285C49] font-bold">Recommended Learning Resource</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {channel.relevantUnits.map((u, i) => (
                        <span key={i} className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white border border-[#DCE7E1] text-[#64748B]">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-medium text-[#1E293B] mb-1.5">
                    {channel.specialty}
                  </p>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {channel.reason}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#DCE7E1]/60">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#64748B] block mb-1">
                      Notable Topics:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {channel.topicsCovered.map((topic, tIdx) => (
                        <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#DCE7E1] text-[#475569]">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(channel.searchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#285C49] hover:text-[#1E293B] transition-colors"
                  >
                    <span>Search on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#64748B] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#285C49] flex-shrink-0 mt-0.5" />
            <span>
              ZeroIndex is designed as the student's primary self-contained learning environment. External YouTube channels are listed for supplementary revision and different teaching styles. No video feeds or third-party cookies are embedded in Subject Resources.
            </span>
          </div>
        </div>
      )}

      {/* 6. SECTION D: TRUSTED ACADEMIC REFERENCE WEBSITES (When 'all' or 'websites') */}
      {(activeCategory === 'all' || activeCategory === 'websites') && (
        <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F2F7F4] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                  Web References
                </span>
                <span className="text-xs text-[#64748B]">Peer Institutions &amp; Online Textbooks</span>
              </div>
              <h2 className="text-xl font-bold text-[#1E293B] mt-1">Trusted Academic Reference Websites</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Curated open educational resources covering switching theory, logic families, and computation structures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {referenceWebsites.map((site) => (
              <div 
                key={site.id} 
                className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#285C49]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#285C49] font-bold">
                      {site.accessType}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      {site.relevantUnits.join(', ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1E293B] leading-snug">
                    {site.name}
                  </h4>
                  <p className="text-xs text-[#64748B] font-mono mt-0.5">
                    {site.displayUrl}
                  </p>
                  <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                    {site.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCE7E1] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#64748B]">{site.topics.split(',')[0]}</span>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DCE7E1] hover:border-[#285C49] text-xs font-semibold text-[#285C49] transition-colors shadow-2xs"
                  >
                    <span>Visit Reference</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SECTION E: EXTERNAL ONLINE CALCULATORS (When 'all' or 'calculators') */}
      {(activeCategory === 'all' || activeCategory === 'calculators') && (
        <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                  External Tools
                </span>
                <span className="text-xs text-[#64748B]">Supplementary Verification Engines</span>
              </div>
              <h2 className="text-xl font-bold text-[#1E293B] mt-1">Curated External Online Calculators</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Specialized third-party solvers for double-checking homework calculations and exploring alternative representations.
              </p>
            </div>

            {/* Category Filter for Calculators */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Tools' },
                { id: 'number', label: 'Number Converters' },
                { id: 'boolean', label: 'Boolean Algebra' },
                { id: 'kmap', label: 'Karnaugh Maps' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCalculatorCategory(c.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    calculatorCategory === c.id
                      ? 'bg-[#285C49] text-white shadow-2xs'
                      : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mandatory External Link Disclaimer Notice */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Important Tool Notation &amp; Verification Notice:</span>
              <p className="leading-relaxed text-amber-800">
                External tools are provided for additional exploration. Their notation, operator precedence, and simplification criteria may differ from ZeroIndex standard course conventions. Always verify your derivations using the course lessons and the built-in ZeroIndex Interactive Solvers.
              </p>
            </div>
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCalculators.map((calc) => (
              <div 
                key={calc.id} 
                className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#285C49]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#285C49] font-bold uppercase tracking-wider">
                      {calc.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      {calc.relevantUnits.join(', ')}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#1E293B]">
                    {calc.name}
                  </h4>
                  <p className="text-xs text-[#64748B] font-mono mt-0.5">
                    {calc.displayUrl}
                  </p>
                  
                  <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                    {calc.purpose}
                  </p>

                  <div className="mt-3 p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-[11px] text-[#64748B] space-y-0.5">
                    <span className="font-bold text-[#1E293B] block">Syntax Note:</span>
                    <p>{calc.syntaxNote}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE7E1] flex items-center justify-between">
                  <span className="text-[10px] text-[#64748B] font-mono">External Tool</span>
                  <a
                    href={calc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#285C49] hover:bg-[#204a3a] text-white text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <span>Launch Calculator</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 8. CURRICULUM SYLLABUS, OBJECTIVES & OUTCOMES (When 'all' or 'syllabus') */}
      {(activeCategory === 'all' || activeCategory === 'syllabus') && (
        <div className="space-y-6">
          
          {/* Objectives & Outcomes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Objectives */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#285C49]">
                <GraduationCap className="w-4 h-4" />
                <span>Course Objectives</span>
              </div>
              <div className="space-y-3">
                {dldSyllabus.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1]">
                    <span className="w-5 h-5 rounded-full bg-[#285C49] text-white flex items-center justify-center font-mono text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-[#1E293B] leading-relaxed font-medium">{obj}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Outcomes CO1 to CO5 */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#285C49]">
                <Award className="w-4 h-4" />
                <span>Course Outcomes (CO1 to CO5)</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#DCE7E1] font-mono text-[#64748B] uppercase">
                      <th className="py-2.5 px-3 w-16">CO</th>
                      <th className="py-2.5 px-3">Course Outcome Statement</th>
                      <th className="py-2.5 px-3 w-24 text-right">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2F7F4]">
                    {dldSyllabus.outcomes.map((co) => (
                      <tr key={co.code} className="hover:bg-[#F2F7F4]/50">
                        <td className="py-3 px-3 font-mono font-bold text-[#285C49]">{co.code}</td>
                        <td className="py-3 px-3 text-[#1E293B] leading-relaxed">{co.description}</td>
                        <td className="py-3 px-3 font-mono text-[#64748B] whitespace-nowrap text-right">{co.targetUnit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Prescribed Syllabus Breakdown */}
          <div className="p-6 rounded-2xl bg-white border border-[#DCE7E1] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2F7F4] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2 py-0.5 rounded">
                    Official Curriculum
                  </span>
                  <span className="text-xs text-[#64748B]">Units I through V</span>
                </div>
                <h2 className="text-xl font-bold text-[#1E293B] mt-1">Prescribed 5-Unit Syllabus Breakdown</h2>
              </div>

              {/* Unit Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {dldSyllabus.units.map((unit) => (
                  <button
                    key={unit.unitNumber}
                    onClick={() => setSelectedUnit(unit.unitNumber)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                      selectedUnit === unit.unitNumber
                        ? 'bg-[#285C49] text-white shadow-2xs'
                        : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#DCE7E1]'
                    }`}
                  >
                    {unit.roman}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Unit Details */}
            {(() => {
              const unit = dldSyllabus.units.find(u => u.unitNumber === selectedUnit);
              if (!unit) return null;
              return (
                <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#DCE7E1] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#DCE7E1]">
                    <div>
                      <span className="text-xs font-mono text-[#64748B]">{unit.roman} · {unit.hours}</span>
                      <h3 className="text-lg font-bold text-[#1E293B]">{unit.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EBF3ED] text-[#285C49] border border-[#DCE7E1]">
                        Outcome: {unit.courseOutcome}
                      </span>
                      {unit.unitNumber === 1 ? (
                        <button
                          onClick={() => handleContextAction({ tab: 'units', unit: 1, subId: '1.1' })}
                          className="px-3 py-1 rounded-lg bg-[#285C49] text-white text-xs font-semibold hover:bg-[#204a3a] transition-colors"
                        >
                          Open Live Notes
                        </button>
                      ) : unit.unitNumber === 2 ? (
                        <button
                          onClick={() => handleContextAction({ tab: 'units', unit: 2, subId: '2.1' })}
                          className="px-3 py-1 rounded-lg bg-[#285C49] text-white text-xs font-semibold hover:bg-[#204a3a] transition-colors"
                        >
                          Open Live Notes
                        </button>
                      ) : (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706]">
                          Notes In Preparation
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Word-for-Word Prescribed Text */}
                  <div className="p-3.5 rounded-lg bg-white border border-[#DCE7E1]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                      Official Prescribed Text (Word-for-Word)
                    </span>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {unit.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
                      Prescribed Topic Breakdown
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {unit.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#DCE7E1] text-xs text-[#1E293B]">
                          <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#DCE7E1] flex items-center justify-center font-mono text-[10px] text-[#285C49] flex-shrink-0">
                            {i + 1}
                          </span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      )}

      {/* MODAL VIEW: Full Interactive Cheat Sheet (Boolean Laws / K-Map) */}
      {activeModalSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-100">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-[#DCE7E1] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE7E1]">
              <span className="text-xs font-mono font-bold uppercase text-[#285C49] bg-[#EBF3ED] px-2.5 py-1 rounded">
                Interactive Reference Sheet
              </span>
              <button
                onClick={() => setActiveModalSheet(null)}
                className="w-8 h-8 rounded-lg bg-[#FAF8F5] hover:bg-[#F2F7F4] border border-[#DCE7E1] flex items-center justify-center text-[#64748B] hover:text-[#1E293B] transition-colors"
                title="Close Sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeModalSheet === 'boolean-laws' ? (
              <BooleanLawsCheatSheet onClose={() => setActiveModalSheet(null)} />
            ) : (
              <KMapCheatSheet onClose={() => setActiveModalSheet(null)} />
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default SubjectResourcesView;
