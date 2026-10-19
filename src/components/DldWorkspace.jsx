import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  Calculator, 
  CheckCircle2, 
  BookOpen, 
  ChevronRight, 
  GraduationCap
} from 'lucide-react';
import { dldSyllabus } from '../data/dldSyllabus';
import { dldAvailabilityConfig } from '../data/dldAvailabilityConfig';
import { dldUnit1 } from '../data/dldUnit1';
import { dldUnit1Master } from '../data/dldUnit1Master';
import { UnitWorkspace } from './UnitWorkspace';
import { InteractiveSolvers } from './InteractiveSolvers';
import { PracticeArena } from './PracticeArena';
import { SyllabusView } from './SyllabusView';

const normalizeWorkspaceTab = (tab) => {
  if (!tab) return 'units';
  const t = tab.toLowerCase();
  if (t === 'theory' || t === 'notes' || t === 'dld-u1' || t === 'dld' || t === 'unit' || t === '1') return 'units';
  if (t === 'solver' || t === 'solvers') return 'solvers';
  if (t === 'quiz' || t === 'arena' || t === 'practice') return 'practice';
  if (t === 'resources' || t === 'syllabus') return 'syllabus';
  if (['units', 'solvers', 'practice', 'syllabus'].includes(t)) return t;
  return 'units';
};

export const DldWorkspace = ({ 
  onBackToDldHome, 
  initialTab = 'units',
  initialSubModuleId = '1.1' 
}) => {
  const [activeTab, setActiveTab] = useState(() => normalizeWorkspaceTab(initialTab));
  const [activeUnit, setActiveUnit] = useState(1);
  const [activeSubModuleId, setActiveSubModuleId] = useState(initialSubModuleId || '1.1');

  // Synchronize state when props update via browser navigation or hashchange
  useEffect(() => {
    if (initialTab) {
      const normalized = normalizeWorkspaceTab(initialTab);
      setActiveTab(normalized);
    }
  }, [initialTab]);

  useEffect(() => {
    if (initialSubModuleId) {
      setActiveSubModuleId(initialSubModuleId);
      const unitNum = parseInt(initialSubModuleId.split('.')[0], 10);
      if (!isNaN(unitNum) && unitNum >= 1 && unitNum <= 5) {
        setActiveUnit(unitNum);
      }
    }
  }, [initialSubModuleId]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const newHash = tabId === 'units' ? `workspace/units/${activeSubModuleId}` : `workspace/${tabId}`;
    if (window.location.hash !== `#${newHash}`) {
      window.history.pushState(null, '', `#${newHash}`);
    }
  };

  const handleSubModuleChange = (subId) => {
    setActiveSubModuleId(subId);
    const newHash = `workspace/units/${subId}`;
    if (window.location.hash !== `#${newHash}`) {
      window.history.pushState(null, '', `#${newHash}`);
    }
  };

  const currentUnitData = dldSyllabus.units.find(u => u.unitNumber === activeUnit);

  // Retrieve rich master content if available, else fallback
  const masterSection = dldUnit1Master.sections.find(s => s.id === activeSubModuleId);
  const fallbackSubModule = dldUnit1.subModules.find(m => m.id === activeSubModuleId) || dldUnit1.subModules[0];

  const tabs = [
    { id: 'units', label: 'Units (1-5)', icon: Layers },
    { id: 'solvers', label: 'Interactive Solvers', icon: Calculator },
    { id: 'practice', label: 'Practice Questions', icon: CheckCircle2 },
    { id: 'syllabus', label: 'Subject Resources', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex flex-col">
      
      {/* LEVEL 3: Single Slim Top Navigation Bar (NO global PDF button here) */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#DCE7E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          
          {/* Left: ← DLD Home */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDldHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE7E1] bg-white hover:bg-[#F2F7F4] text-xs font-semibold text-[#1E293B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>DLD Home</span>
            </button>
            <span className="text-xs font-mono text-[#64748B] hidden sm:inline">
              1005261102 · Digital Logic Design
            </span>
          </div>

          {/* Center: Slim Tabs Switcher */}
          <nav className="flex items-center gap-1 bg-[#F2F7F4] p-1 rounded-xl border border-[#DCE7E1]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-[#2E6F40] shadow-sm'
                      : 'text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Calm Course Code Label (Global PDF button removed as requested) */}
          <div className="text-[11px] font-mono text-[#64748B] hidden sm:block">
            I Year, I Semester
          </div>

        </div>
      </header>

      {/* Main Workspace Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: Units 1-5 Topic Notes Workspace */}
        {activeTab === 'units' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Units & Submodules Selector (3 cols) */}
            <aside className="lg:col-span-3 space-y-4">
              <div className="p-4 rounded-xl bg-white border border-[#DCE7E1] shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2F7F4]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-mono">
                    Course Units
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F2F7F4] text-[#2E6F40]">
                    5 Units
                  </span>
                </div>

                <div className="space-y-1.5">
                  {dldSyllabus.units.map((unit) => {
                    const isSelected = activeUnit === unit.unitNumber;
                    const isUnit1 = unit.unitNumber === 1;

                    return (
                      <div key={unit.unitNumber} className="space-y-1">
                        <button
                          onClick={() => setActiveUnit(unit.unitNumber)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-all ${
                            isSelected 
                              ? 'bg-[#2E6F40] text-white font-semibold shadow-sm' 
                              : 'hover:bg-[#F2F7F4] text-[#1E293B]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={`font-mono text-[11px] ${isSelected ? 'text-white/80' : 'text-[#64748B]'}`}>
                              {unit.roman}
                            </span>
                            <span className="truncate">{unit.title}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ml-1 flex-shrink-0 ${
                            isUnit1
                              ? (isSelected ? 'bg-white/20 text-white' : 'bg-[#2E6F40]/10 text-[#2E6F40]')
                              : (isSelected ? 'bg-white/20 text-white' : 'bg-[#FEF3C7] text-[#D97706]')
                          }`}>
                            {isUnit1 ? 'Available' : 'Planned'}
                          </span>
                        </button>

                        {/* Unit 1 Nested Sub-Modules */}
                        {isUnit1 && activeUnit === 1 && (
                          <div className="ml-3 pl-2.5 border-l-2 border-[#DCE7E1] space-y-1 py-1">
                            {dldUnit1.subModules.map((sub) => {
                              const isSubActive = activeSubModuleId === sub.id;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => handleSubModuleChange(sub.id)}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                                    isSubActive
                                      ? 'bg-[#F2F7F4] text-[#2E6F40] font-bold border-l-2 border-[#2E6F40]'
                                      : 'text-[#475569] hover:text-[#1E293B] hover:bg-white'
                                  }`}
                                >
                                  <span className="truncate">
                                    <span className="font-mono text-[10px] text-[#64748B] mr-1.5">{sub.number}</span>
                                    {sub.title}
                                  </span>
                                  {isSubActive && <ChevronRight className="w-3 h-3 flex-shrink-0 text-[#2E6F40]" />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Course Outcome Reference */}
              <div className="p-3.5 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2E6F40] mb-1">
                  <span>Target Outcome: {currentUnitData?.courseOutcome}</span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  {dldSyllabus.outcomes.find(o => o.code === currentUnitData?.courseOutcome)?.description}
                </p>
              </div>
            </aside>

            {/* Center / Right Column: Comprehensive Topic Notes (9 cols) */}
            <section className="lg:col-span-9 space-y-6">
              {activeUnit === 1 ? (
                masterSection ? (
                  /* Render deep master study guide for 1.1, 1.2, 1.3 */
                  <UnitWorkspace 
                    section={masterSection} 
                  />
                ) : (
                  /* Modular study guide for remaining sections */
                  <UnitWorkspace 
                    section={{
                      ...fallbackSubModule,
                      overview: fallbackSubModule.summary,
                      theorySections: fallbackSubModule.keyPoints ? [
                        {
                          heading: "Core Concepts",
                          content: fallbackSubModule.keyPoints.map(k => `${k.heading}: ${k.desc}`)
                        }
                      ] : undefined
                    }} 
                  />
                )
              ) : (
                /* Units 2-5 Preview Card */
                <div className="p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                      Unit {currentUnitData?.unitNumber} · Planned
                    </span>
                    <span className="text-xs text-[#64748B] font-mono">{currentUnitData?.hours}</span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#64748B]">{currentUnitData?.roman}</span>
                    <h2 className="text-2xl font-bold text-[#1E293B] mt-1">{currentUnitData?.title}</h2>
                    <p className="text-xs text-[#475569] mt-2 leading-relaxed">{currentUnitData?.summary}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1]">
                    <h4 className="text-xs font-bold text-[#2E6F40]">Unit 1 Available</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Unit 1 is available (pending final academic review). Additional units ({currentUnitData?.roman}) are planned according to the curriculum blueprint.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-mono">
                      Prescribed Syllabus Topics
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {currentUnitData?.topics?.map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF8F5] border border-[#DCE7E1] text-xs text-[#1E293B]">
                          <span className="w-5 h-5 rounded-full bg-white border border-[#DCE7E1] flex items-center justify-center font-mono text-[10px] text-[#2E6F40] flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveUnit(1)}
                      className="px-4 py-2 rounded-lg bg-[#2E6F40] text-white text-xs font-semibold hover:bg-[#255A34] transition-colors"
                    >
                      ← Return to Active Unit 1
                    </button>
                  </div>
                </div>
              )}
            </section>

          </div>
        )}

        {/* TAB 2: Interactive Solvers Hub */}
        {activeTab === 'solvers' && (
          <InteractiveSolvers onNavigate={() => {}} />
        )}

        {/* TAB 3: Practice Arena */}
        {activeTab === 'practice' && (
          <PracticeArena onNavigate={() => {}} />
        )}

        {/* TAB 4: Subject Resources */}
        {activeTab === 'syllabus' && (
          <SyllabusView onNavigate={(tab) => setActiveTab(tab)} />
        )}

      </main>

    </div>
  );
};

export default DldWorkspace;
