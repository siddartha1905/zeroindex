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
import { dldUnit2Master } from '../data/dldUnit2Master';
import { UnitWorkspace } from './UnitWorkspace';
import { Section21View } from './Section21View';
import { Section22View } from './Section22View';
import { Section23View } from './Section23View';
import { Section24View } from './Section24View';
import { Section25View } from './Section25View';
import { Section26View } from './Section26View';
import { Section27View } from './Section27View';
import { Unit2Solvers } from './Unit2Solvers';
import { InteractiveSolvers } from './InteractiveSolvers';
import { PracticeArena } from './PracticeArena';
import { SyllabusView } from './SyllabusView';
import { 
  isItemPubliclyAccessible, 
  getUnitRegistryId, 
  getSectionRegistryId 
} from '../data/centralContentRegistry';

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
  initialSubModuleId = '1.1',
  contentOverrides = {},
  isAdminPreview = false,
  isLocalFacultyReview = false
}) => {
  const isLocalDev = Boolean(
    import.meta.env.DEV && (
      isLocalFacultyReview || (
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      )
    )
  );

  const isDevPreviewSection = (secId) => {
    return isLocalDev && (secId === '2.6' || secId === '2.7');
  };

  const isUnitAccessible = (unitNum) => {
    if (isAdminPreview) return true;
    if (unitNum === 2 && isLocalDev) return true;
    return isItemPubliclyAccessible(getUnitRegistryId(unitNum), contentOverrides);
  };

  const isSectionAccessible = (secId) => {
    if (isAdminPreview) return true;
    if (isDevPreviewSection(secId)) return true;
    const unitNum = (secId || '').split('.')[0];
    if (!isUnitAccessible(unitNum)) return false;
    return isItemPubliclyAccessible(getSectionRegistryId(secId), contentOverrides);
  };

  const [activeTab, setActiveTab] = useState(() => normalizeWorkspaceTab(initialTab));
  const [activeSubModuleId, setActiveSubModuleId] = useState(() => {
    if (initialSubModuleId && (isSectionAccessible(initialSubModuleId) || isDevPreviewSection(initialSubModuleId))) {
      return initialSubModuleId;
    }
    return '1.1';
  });
  const [activeUnit, setActiveUnit] = useState(() => {
    const unitNum = parseInt((activeSubModuleId || '1.1').split('.')[0], 10);
    return !isNaN(unitNum) && isUnitAccessible(unitNum) ? unitNum : 1;
  });
  const [solversUnit, setSolversUnit] = useState(1);
  const [initialSolverTab, setInitialSolverTab] = useState('simplifier');
  const [initialQuizTrack, setInitialQuizTrack] = useState('all');

  const allTabs = [
    { id: 'units', label: 'Units (1-5)', icon: Layers, registryId: 'workbench-subject-dld' },
    { id: 'solvers', label: 'Interactive Solvers', icon: Calculator, registryId: 'workbench-tool-solvers' },
    { id: 'practice', label: 'Practice Questions', icon: CheckCircle2, registryId: 'workbench-tool-practice' },
    { id: 'syllabus', label: 'Subject Resources', icon: BookOpen, registryId: 'workbench-tool-resources' },
  ];

  const tabs = isAdminPreview 
    ? allTabs 
    : allTabs.filter(tab => tab.id === 'units' || isItemPubliclyAccessible(tab.registryId, contentOverrides));

  // Fallback activeTab if current tab is hidden
  useEffect(() => {
    if (!tabs.some(t => t.id === activeTab)) {
      setActiveTab(tabs[0]?.id || 'units');
    }
  }, [tabs, activeTab]);

  // Synchronize state when props update via browser navigation or hashchange
  useEffect(() => {
    if (initialTab) {
      const normalized = normalizeWorkspaceTab(initialTab);
      setActiveTab(normalized);
    }
  }, [initialTab]);

  useEffect(() => {
    if (initialSubModuleId) {
      if (isSectionAccessible(initialSubModuleId)) {
        setActiveSubModuleId(initialSubModuleId);
        const unitNum = parseInt(initialSubModuleId.split('.')[0], 10);
        if (!isNaN(unitNum) && unitNum >= 1 && unitNum <= 5 && isUnitAccessible(unitNum)) {
          setActiveUnit(unitNum);
        }
      } else {
        // If requested section is hidden, gracefully fall back to 1.1
        setActiveUnit(1);
        setActiveSubModuleId('1.1');
      }
    }
  }, [initialSubModuleId, contentOverrides, isAdminPreview, isLocalFacultyReview]);

  // Fallback when activeUnit or activeSubModule becomes hidden
  useEffect(() => {
    if (!isUnitAccessible(activeUnit)) {
      setActiveUnit(1);
      setActiveSubModuleId('1.1');
    } else if (!isSectionAccessible(activeSubModuleId)) {
      setActiveSubModuleId(`${activeUnit}.1`);
    }
  }, [activeUnit, activeSubModuleId, contentOverrides, isAdminPreview, isLocalFacultyReview]);

  // Reset solversUnit to 1 if Unit 2 is inaccessible
  useEffect(() => {
    if (!isUnitAccessible(2) && solversUnit === 2) {
      setSolversUnit(1);
    }
  }, [contentOverrides, isAdminPreview, solversUnit]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const newHash = tabId === 'units' ? `workspace/units/${activeSubModuleId}` : `workspace/${tabId}`;
    if (window.location.hash !== `#${newHash}`) {
      window.history.pushState(null, '', `#${newHash}`);
    }
  };

  const handleSubModuleChange = (subId) => {
    if (!isSectionAccessible(subId)) return;
    setActiveSubModuleId(subId);
    const unitNum = parseInt(subId.split('.')[0], 10);
    if (!isNaN(unitNum) && unitNum >= 1 && unitNum <= 5 && isUnitAccessible(unitNum)) {
      setActiveUnit(unitNum);
    }
    const newHash = `workspace/units/${subId}`;
    if (window.location.hash !== `#${newHash}`) {
      window.history.pushState(null, '', `#${newHash}`);
    }
  };

  const handleContextNavigation = (target) => {
    if (typeof target === 'string') {
      handleTabChange(target);
      return;
    }
    const { tab, unit, subId, trackId, solverTab } = target || {};
    if (unit && isUnitAccessible(unit)) {
      setActiveUnit(unit);
      if (tab === 'solvers') {
        setSolversUnit(unit);
      }
    }
    if (solverTab) {
      setInitialSolverTab(solverTab);
    }
    if (trackId) {
      setInitialQuizTrack(trackId);
    }
    if (subId && isSectionAccessible(subId)) {
      handleSubModuleChange(subId);
    }
    if (tab) {
      handleTabChange(tab);
    }
  };

  const effectiveUnit = activeSubModuleId?.startsWith('2.') 
    ? 2 
    : (activeSubModuleId?.startsWith('1.') ? 1 : activeUnit);

  const currentUnitData = dldSyllabus.units.find(u => u.unitNumber === effectiveUnit) || dldSyllabus.units.find(u => u.unitNumber === activeUnit);

  // Retrieve rich master content if available, else fallback
  const masterSection = dldUnit1Master.sections.find(s => s.id === activeSubModuleId);
  const fallbackSubModule = dldUnit1.subModules.find(m => m.id === activeSubModuleId) || dldUnit1.subModules[0];

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
                    const isSelected = effectiveUnit === unit.unitNumber;
                    const isUnit1 = unit.unitNumber === 1;
                    const isUnitAvail = isUnitAccessible(unit.unitNumber);

                    return (
                      <div key={unit.unitNumber} className="space-y-1">
                        <button
                          disabled={!isUnitAvail}
                          onClick={() => {
                            if (!isUnitAvail) return;
                            setActiveUnit(unit.unitNumber);
                            if (unit.unitNumber === 1 && !activeSubModuleId.startsWith('1.')) {
                              handleSubModuleChange('1.1');
                            } else if (unit.unitNumber === 2 && !activeSubModuleId.startsWith('2.')) {
                              handleSubModuleChange('2.1');
                            }
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-all ${
                            !isUnitAvail
                              ? 'bg-slate-50/50 text-slate-400 opacity-60 cursor-not-allowed'
                              : isSelected 
                                ? 'bg-[#2E6F40] text-white font-semibold shadow-sm' 
                                : 'hover:bg-[#F2F7F4] text-[#1E293B]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={`font-mono text-[11px] ${isSelected && isUnitAvail ? 'text-white/80' : 'text-[#64748B]'}`}>
                              {unit.roman}
                            </span>
                            <span className="truncate">{unit.title}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ml-1 flex-shrink-0 ${
                            !isUnitAvail
                              ? 'bg-slate-200 text-slate-600'
                              : isUnit1
                                ? (isSelected ? 'bg-white/20 text-white' : 'bg-[#2E6F40]/10 text-[#2E6F40]')
                                : unit.unitNumber === 2
                                  ? (isSelected ? 'bg-white/20 text-white' : 'bg-[#2E6F40]/10 text-[#2E6F40]')
                                  : (isSelected ? 'bg-white/20 text-white' : 'bg-[#FEF3C7] text-[#D97706]')
                          }`}>
                            {!isUnitAvail ? 'Unavailable' : isUnit1 ? 'Available' : (unit.unitNumber === 2 ? 'Partially Available' : 'Planned')}
                          </span>
                        </button>

                        {/* Unit 1 Nested Sub-Modules */}
                        {isUnit1 && effectiveUnit === 1 && isUnitAvail && (
                          <div className="ml-3 pl-2.5 border-l-2 border-[#DCE7E1] space-y-1 py-1">
                            {dldUnit1.subModules
                              .filter(sub => isSectionAccessible(sub.id))
                              .map((sub) => {
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

                        {/* Unit 2 Nested Sub-Modules */}
                        {unit.unitNumber === 2 && effectiveUnit === 2 && isUnitAvail && (
                          <div className="ml-3 pl-2.5 border-l-2 border-[#DCE7E1] space-y-1 py-1">
                            {dldUnit2Master.sections
                              .filter(sub => isSectionAccessible(sub.id))
                              .map((sub) => {
                                const isSubActive = activeSubModuleId === sub.id;
                                const isPlanned = !isSectionAccessible(sub.id);
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
                                    <span className="truncate flex items-center gap-1.5">
                                      <span className="font-mono text-[10px] text-[#64748B] mr-1.5">{sub.number}</span>
                                      <span className="truncate">{sub.title}</span>
                                    </span>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      {isPlanned && (
                                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#FEF3C7] text-[#92400E]">
                                          Planned
                                        </span>
                                      )}
                                      {isSubActive && <ChevronRight className="w-3 h-3 text-[#2E6F40]" />}
                                    </div>
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
              {/* Development-Only Local Faculty Review Navigation */}
              {isLocalDev && (
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#DCE7E1] shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                      LOCAL DRAFT PREVIEW: NOT PUBLIC
                    </span>
                    <span className="font-semibold text-[#1E293B]">
                      DLD Unit II Faculty Preview:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveUnit(2);
                        handleSubModuleChange('2.6');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer ${
                        activeSubModuleId === '2.6'
                          ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-xs'
                          : 'bg-white text-[#475569] border-[#DCE7E1] hover:bg-slate-50'
                      }`}
                    >
                      Section 2.6
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveUnit(2);
                        handleSubModuleChange('2.7');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer ${
                        activeSubModuleId === '2.7'
                          ? 'bg-[#2E6F40] text-white border-[#2E6F40] shadow-xs'
                          : 'bg-white text-[#475569] border-[#DCE7E1] hover:bg-slate-50'
                      }`}
                    >
                      Section 2.7
                    </button>
                  </div>
                </div>
              )}

              {!isSectionAccessible(activeSubModuleId) ? (
                <div className="p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                      {effectiveUnit === 2 && !isUnitAccessible(2) ? 'Unit II · Offline for Review' : `Section ${activeSubModuleId} · Offline for Review`}
                    </span>
                    <span className="text-xs text-[#64748B] font-mono">Curriculum Notice</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#1E293B] mt-1">
                      {effectiveUnit === 2 && !isUnitAccessible(2) 
                        ? 'Unit II: Gate-Level Minimization and Combinational Logic' 
                        : `Section ${activeSubModuleId} is Under Editorial Review`}
                    </h2>
                    <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                      This curriculum unit or section has been taken offline by the administrator for review. Please proceed with available Unit I study modules.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveUnit(1);
                        handleSubModuleChange('1.1');
                      }}
                      className="px-4 py-2 rounded-lg bg-[#2E6F40] text-white text-xs font-semibold hover:bg-[#255A34] transition-colors cursor-pointer"
                    >
                      Return to Unit I (Available)
                    </button>
                  </div>
                </div>
              ) : effectiveUnit === 1 ? (
                masterSection ? (
                  /* Render deep master study guide for 1.1, 1.2, 1.3 */
                  <UnitWorkspace 
                    section={masterSection} 
                    onNavigate={handleContextNavigation}
                    contentOverrides={contentOverrides}
                    isAdminPreview={isAdminPreview}
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
                    onNavigate={handleContextNavigation}
                    contentOverrides={contentOverrides}
                    isAdminPreview={isAdminPreview}
                  />
                )
              ) : effectiveUnit === 2 ? (
                activeSubModuleId === '2.1' ? (
                  <Section21View section={dldUnit2Master.sections[0]} onNavigate={handleContextNavigation} />
                ) : activeSubModuleId === '2.2' ? (
                  <Section22View section={dldUnit2Master.sections[1]} onNavigate={handleContextNavigation} />
                ) : activeSubModuleId === '2.3' ? (
                  <Section23View section={dldUnit2Master.sections[2]} onNavigate={handleContextNavigation} />
                ) : activeSubModuleId === '2.4' ? (
                  <Section24View section={dldUnit2Master.sections[3]} onNavigate={handleContextNavigation} />
                ) : activeSubModuleId === '2.5' ? (
                  <Section25View section={dldUnit2Master.sections[4]} onNavigate={handleContextNavigation} />
                ) : activeSubModuleId === '2.6' ? (
                  isAdminPreview || isSectionAccessible('2.6') ? (
                    <Section26View section={dldUnit2Master.sections[5]} onNavigate={handleContextNavigation} />
                  ) : (
                    /* Section 2.6 Planned Notice for unauthenticated public */
                    <div className="p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                          Section 2.6 · Planned / In Development
                        </span>
                        <span className="text-xs text-[#64748B] font-mono">Unit II</span>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-[#1E293B] mt-1">
                          2.6 Don't-Care Conditions and 5-Variable K-Maps
                        </h2>
                        <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                          This section is currently in active curriculum development and is scheduled for a future release. 
                          Sections 2.1 through 2.5 of Unit II are fully available for study and practice.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1]">
                        <h4 className="text-xs font-bold text-[#2E6F40]">Available Unit II Topics</h4>
                        <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                          You can study Boolean Algebra Fundamentals (2.1), Simplification of Expressions (2.2), Minterms and Maxterms (2.3), SOP/POS Conversions (2.4), and Karnaugh Maps with Don't-Care Minimization (2.5).
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() => handleSubModuleChange('2.1')}
                            className="px-2.5 py-1 rounded-md bg-white border border-[#DCE7E1] hover:bg-[#FAF8F5] text-[11px] font-semibold text-[#1E293B]"
                          >
                            2.1 Fundamentals
                          </button>
                          <button
                            onClick={() => handleSubModuleChange('2.5')}
                            className="px-2.5 py-1 rounded-md bg-white border border-[#DCE7E1] hover:bg-[#FAF8F5] text-[11px] font-semibold text-[#1E293B]"
                          >
                            2.5 Karnaugh Maps
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ) : activeSubModuleId === '2.7' ? (
                  isAdminPreview || isSectionAccessible('2.7') ? (
                    <Section27View section={dldUnit2Master.sections[6]} onNavigate={handleContextNavigation} />
                  ) : (
                    /* Section 2.7 Planned Notice */
                    <div className="p-8 rounded-2xl bg-white border border-[#DCE7E1] shadow-soft space-y-6 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                          Section 2.7 · Planned / In Development
                        </span>
                        <span className="text-xs text-[#64748B] font-mono">Unit II</span>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-[#1E293B] mt-1">
                          2.7 NAND and NOR Multi-Level Synthesis
                        </h2>
                        <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                          This section is currently in active curriculum development and is scheduled for a future release. 
                          Sections 2.1 through 2.5 of Unit II are fully available for study and practice.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F2F7F4] border border-[#DCE7E1]">
                        <h4 className="text-xs font-bold text-[#2E6F40]">Available Unit II Topics</h4>
                        <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                          You can study Boolean Algebra Fundamentals (2.1), Simplification of Expressions (2.2), Minterms and Maxterms (2.3), SOP/POS Conversions (2.4), and Karnaugh Maps with Don't-Care Minimization (2.5).
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() => handleSubModuleChange('2.1')}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#2E6F40] text-white hover:bg-[#255A34] transition-colors"
                          >
                            Return to Section 2.1
                          </button>
                          <button
                            onClick={() => handleSubModuleChange('2.5')}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#DCE7E1] text-[#2E6F40] hover:bg-[#F2F7F4] transition-colors"
                          >
                            Go to Section 2.5 (K-Maps)
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <Section21View section={dldUnit2Master.sections[0]} onNavigate={handleContextNavigation} />
                )
              ) : (
                /* Units 3-5 Preview Card */
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
                    <h4 className="text-xs font-bold text-[#2E6F40]">Units I and II Available</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Unit I (Sections 1.1 to 1.7) and Unit II (Sections 2.1 to 2.5) are available for student use. Additional units ({currentUnitData?.roman}) are planned according to the curriculum blueprint.
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
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-[#DCE7E1] shadow-2xs">
              <span className="text-xs font-mono font-bold text-[#64748B]">Active Course Suite:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSolversUnit(1)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                    solversUnit === 1
                      ? 'bg-[#2E6F40] text-white shadow-xs'
                      : 'bg-[#FAF8F5] border border-[#DCE7E1] text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  Unit I Solvers (Number Systems & Gates)
                </button>
                <button
                  disabled={!isUnitAccessible(2)}
                  onClick={() => {
                    if (isUnitAccessible(2)) setSolversUnit(2);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                    !isUnitAccessible(2)
                      ? 'bg-[#FAF8F5] border border-[#DCE7E1] text-[#94A3B8] opacity-60 cursor-not-allowed'
                      : solversUnit === 2
                        ? 'bg-[#2E6F40] text-white shadow-xs'
                        : 'bg-[#FAF8F5] border border-[#DCE7E1] text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  {isUnitAccessible(2) ? 'Unit II Solvers (Boolean Algebra & K-Maps)' : 'Unit II Solvers (Under Review)'}
                </button>
              </div>
            </div>

            {solversUnit === 1 || !isUnitAccessible(2) ? (
              <InteractiveSolvers 
                initialSolverTab={initialSolverTab} 
                onNavigate={handleContextNavigation} 
              />
            ) : (
              <Unit2Solvers initialSolverTab={initialSolverTab} />
            )}
          </div>
        )}

        {/* TAB 3: Practice Arena */}
        {activeTab === 'practice' && (
          <PracticeArena 
            defaultUnit={activeUnit} 
            initialTrack={initialQuizTrack}
            onNavigate={handleContextNavigation} 
            isUnit2Accessible={isUnitAccessible(2)}
          />
        )}

        {/* TAB 4: Subject Resources */}
        {activeTab === 'syllabus' && (
          <SyllabusView 
            onNavigate={handleContextNavigation} 
            initialUnit={activeUnit} 
            isUnit2Accessible={isUnitAccessible(2)}
          />
        )}

      </main>

    </div>
  );
};

export default DldWorkspace;
