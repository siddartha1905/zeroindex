import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Layers, 
  ChevronRight,
  ChevronDown, 
  Target, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Cpu, 
  BrainCircuit,
  Calculator,
  FileText,
  HelpCircle,
  CheckSquare,
  Square,
  GraduationCap
} from 'lucide-react';
import { atlasRoadmaps } from '../data/atlasRoadmapsConfig';
import { 
  bridgePlacementDomains, 
  BRIDGE_DOMAIN_REGISTRY_MAP, 
  BRIDGE_SUBPATH_TO_DOMAIN_ID 
} from '../data/bridgePlacementConfig';
import { 
  isItemPubliclyAccessible, 
  ATLAS_ROADMAP_REGISTRY_MAP 
} from '../data/centralContentRegistry';

export const AtlasLanding = ({ 
  onNavigateHome, 
  onNavigateWorkbench, 
  onNavigateSection, 
  contentOverrides = {}, 
  isAdminPreview = false, 
  initialTab = 'learning-paths',
  initialSubId = null,
  initialMapId = null,
  initialDomainId = null
}) => {
  const isAtlasAccessible = isAdminPreview || isItemPubliclyAccessible('pillar-atlas', contentOverrides);
  const isBridgeAccessible = isAdminPreview || isItemPubliclyAccessible('pillar-bridge', contentOverrides);

  // Determine initial active primary tab: 'learning-paths' | 'career-prep'
  const [activeTab, setActiveTab] = useState(() => {
    if (!isAtlasAccessible && isBridgeAccessible) {
      return 'career-prep';
    }
    if (initialTab === 'career-prep' || initialDomainId || initialSubId === 'career-prep') {
      return 'career-prep';
    }
    return 'learning-paths';
  });

  // ---------------------------------------------------------------------------
  // TAB 1: LEARNING PATHS (ROADMAPS) STATE & LOGIC
  // ---------------------------------------------------------------------------
  const isMapAccessible = (map) => {
    if (isAdminPreview) return true;
    const regId = ATLAS_ROADMAP_REGISTRY_MAP[map.id];
    if (!regId) return false;
    return isItemPubliclyAccessible(regId, contentOverrides);
  };

  const accessibleRoadmaps = atlasRoadmaps.filter(isMapAccessible);

  const [selectedMapId, setSelectedMapId] = useState(() => {
    const targetMap = initialMapId || (activeTab === 'learning-paths' ? initialSubId : null);
    if (targetMap) {
      const match = atlasRoadmaps.find(m => m.id === targetMap);
      if (match && isMapAccessible(match)) return targetMap;
    }
    return accessibleRoadmaps[0]?.id || 'programming-foundations';
  });

  const [expandedStages, setExpandedStages] = useState({
    '01': true,
    '02': true,
    '03': false,
    '04': false,
    '05': false,
    '06': false
  });
  const [searchQuery, setSearchQuery] = useState('');

  // ---------------------------------------------------------------------------
  // TAB 2: CAREER PREPARATION (BRIDGE) STATE & LOGIC
  // ---------------------------------------------------------------------------
  const isDomainAccessible = (dom) => {
    if (isAdminPreview) return true;
    const regId = dom.registryId || BRIDGE_DOMAIN_REGISTRY_MAP[dom.id];
    return isItemPubliclyAccessible(regId, contentOverrides);
  };

  const resolveDomainId = (rawId) => {
    if (!rawId) return null;
    const clean = rawId.toLowerCase().trim();
    if (bridgePlacementDomains.some(d => d.id === clean)) return clean;
    if (BRIDGE_SUBPATH_TO_DOMAIN_ID[clean]) return BRIDGE_SUBPATH_TO_DOMAIN_ID[clean];
    return null;
  };

  const accessibleDomains = bridgePlacementDomains.filter(dom => isDomainAccessible(dom));

  const [activeDomainId, setActiveDomainId] = useState(() => {
    const rawTarget = initialDomainId || (activeTab === 'career-prep' ? initialSubId : null);
    const resolved = resolveDomainId(rawTarget);
    if (resolved) {
      const dom = bridgePlacementDomains.find(d => d.id === resolved);
      if (dom && isDomainAccessible(dom)) {
        return resolved;
      }
    }
    return accessibleDomains[0]?.id || null;
  });

  const [completedItems, setCompletedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('zeroindex_bridge_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync state if props change
  useEffect(() => {
    if (initialTab === 'career-prep' || initialDomainId) {
      setActiveTab('career-prep');
    } else if (initialTab === 'learning-paths' || initialMapId) {
      setActiveTab('learning-paths');
    }
    if (initialDomainId) {
      const resolved = resolveDomainId(initialDomainId);
      if (resolved) setActiveDomainId(resolved);
    }
    if (initialMapId) {
      setSelectedMapId(initialMapId);
    }
  }, [initialTab, initialDomainId, initialMapId]);

  const toggleStage = (stageNum) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageNum]: !prev[stageNum]
    }));
  };

  const expandAll = () => {
    const all = {};
    const curr = accessibleRoadmaps.find(m => m.id === selectedMapId) || atlasRoadmaps[0];
    curr.stages.forEach(s => { all[s.stageNumber] = true; });
    setExpandedStages(all);
  };

  const collapseAll = () => {
    const none = {};
    const curr = accessibleRoadmaps.find(m => m.id === selectedMapId) || atlasRoadmaps[0];
    curr.stages.forEach(s => { none[s.stageNumber] = false; });
    setExpandedStages(none);
  };

  const toggleChecklistItem = (domainId, itemIndex) => {
    setCompletedItems(prev => {
      const domainKey = domainId;
      const currentList = prev[domainKey] || [];
      const updatedList = currentList.includes(itemIndex)
        ? currentList.filter(i => i !== itemIndex)
        : [...currentList, itemIndex];
      
      const newState = { ...prev, [domainKey]: updatedList };
      try {
        localStorage.setItem('zeroindex_bridge_checklist', JSON.stringify(newState));
      } catch {}
      return newState;
    });
  };

  const handleSelectDomain = (domainId) => {
    const dom = bridgePlacementDomains.find(d => d.id === domainId);
    if (dom && isDomainAccessible(dom)) {
      setActiveDomainId(domainId);
      window.location.hash = `atlas/career-prep/${domainId}`;
    }
  };

  const handleWorkbenchLink = (route) => {
    if (route && onNavigateWorkbench) {
      if (route.startsWith('workspace') && onNavigateSection) {
        onNavigateSection(route);
      } else {
        onNavigateWorkbench();
      }
    }
  };

  const currentMap = accessibleRoadmaps.find(m => m.id === selectedMapId) || accessibleRoadmaps[0] || atlasRoadmaps[0];
  const currentDomain = accessibleDomains.find(d => d.id === activeDomainId) || accessibleDomains[0] || null;

  const domainCompletedIndices = currentDomain ? (completedItems[currentDomain.id] || []) : [];
  const completedCount = domainCompletedIndices.length;
  const totalCount = currentDomain ? currentDomain.checklist.length : 0;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

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
            <button 
              onClick={() => {
                setActiveTab('learning-paths');
                window.location.hash = 'atlas';
              }}
              className="text-[#496D91] font-bold hover:underline cursor-pointer"
            >
              02 The Atlas
            </button>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#5F6C64] font-medium">
              {activeTab === 'learning-paths' ? 'Learning Paths' : 'Career Preparation'}
            </span>
            {activeTab === 'learning-paths' && currentMap && (
              <>
                <span className="text-[#DDE2DA]">/</span>
                <span className="text-[#25352D] font-bold truncate max-w-[200px]">
                  {currentMap.title}
                </span>
              </>
            )}
            {activeTab === 'career-prep' && currentDomain && (
              <>
                <span className="text-[#DDE2DA]">/</span>
                <span className="text-[#25352D] font-bold truncate max-w-[200px]">
                  {currentDomain.shortTitle}
                </span>
              </>
            )}
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Learning Roadmaps and Career Preparation
          </span>
        </div>

        {/* Section Header */}
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] border border-[#496D91]/30 text-xs font-technical font-bold text-[#496D91]">
            <span>PILLAR 02</span>
            <span>·</span>
            <span>DIRECTION AND SKILLS</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
            The Atlas
          </h1>
          <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
            "Find your direction, master foundational concepts, and build professional engineering readiness."
          </p>

          {/* Primary Two Entry Points Segmented Control */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {isAtlasAccessible && (
              <button
                onClick={() => {
                  setActiveTab('learning-paths');
                  window.location.hash = 'atlas/learning-paths';
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-technical font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'learning-paths'
                    ? 'bg-[#496D91] text-white shadow-soft'
                    : 'bg-white text-[#5F6C64] hover:text-[#25352D] border border-[#DDE2DA]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Learning Paths</span>
              </button>
            )}

            {isBridgeAccessible && (
              <button
                onClick={() => {
                  setActiveTab('career-prep');
                  window.location.hash = 'atlas/career-prep';
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-technical font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'career-prep'
                    ? 'bg-[#496D91] text-white shadow-soft'
                    : 'bg-white text-[#5F6C64] hover:text-[#25352D] border border-[#DDE2DA]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Career Preparation</span>
              </button>
            )}
          </div>
        </div>

        {/* =====================================================================
            ENTRY POINT A: LEARNING PATHS (ROADMAPS)
        ===================================================================== */}
        {activeTab === 'learning-paths' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* Approved Learning Path Principle Card: START -> TRY -> NEXT */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-left space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E6E8E1]">
                <Target className="w-4 h-4 text-[#496D91]" />
                <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                  Learning Path Principle · START → TRY → NEXT
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed max-w-3xl">
                Every technical topic on ZeroIndex is structured through three progressive learning movements to prevent premature abstractions and build genuine intuition:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E6E8E1] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">01</span>
                    <h3 className="font-editorial text-base font-bold text-[#25352D]">START</h3>
                  </div>
                  <p className="font-technical text-[11px] text-[#496D91] font-semibold">Prerequisites and Substrate</p>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    Begin with physical and numeric representations: bits, radix conversion, logic gates, and execution models before memorizing syntax.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E6E8E1] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-full bg-[#DDEADD] text-[#285C49]">02</span>
                    <h3 className="font-editorial text-base font-bold text-[#25352D]">TRY</h3>
                  </div>
                  <p className="font-technical text-[11px] text-[#285C49] font-semibold">Hands-on Verification</p>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    Verify understanding through interactive solvers, trace tables, truth tables, and self-assessment quizzes on The Workbench.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E6E8E1] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-full bg-[#F5EBE1] text-[#956A43]">03</span>
                    <h3 className="font-editorial text-base font-bold text-[#25352D]">NEXT</h3>
                  </div>
                  <p className="font-technical text-[11px] text-[#956A43] font-semibold">Systems Architecture</p>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    Advance into systems programming, algorithmic complexity, distributed systems, and industry-ready career preparation.
                  </p>
                </div>
              </div>
            </div>

            {/* Roadmaps Catalog or Editorial Review Notice */}
            {accessibleRoadmaps.length > 0 ? (
              <div className="space-y-6 text-left">
                {/* Roadmap Content Viewer */}
                <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-6">
                  <div className="space-y-2 border-b border-[#E6E8E1] pb-6">
                    <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                      {currentMap.status}
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#25352D]">
                      {currentMap.title}
                    </h2>
                    <p className="text-sm text-[#5F6C64] leading-relaxed max-w-3xl">
                      {currentMap.overview}
                    </p>
                  </div>

                  {/* Stage Accordion */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between text-xs font-technical text-[#5F6C64]">
                      <span className="font-bold uppercase tracking-wider text-[#25352D]">Curriculum Stages</span>
                      <div className="flex items-center gap-3">
                        <button onClick={expandAll} className="hover:text-[#496D91] cursor-pointer">Expand All</button>
                        <span>·</span>
                        <button onClick={collapseAll} className="hover:text-[#496D91] cursor-pointer">Collapse All</button>
                      </div>
                    </div>

                    {currentMap.stages.map((stage) => {
                      const isExpanded = Boolean(expandedStages[stage.stageNumber]);
                      return (
                        <div key={stage.stageNumber} className="rounded-2xl border border-[#DDE2DA] bg-[#FBF8F2] overflow-hidden">
                          <button
                            onClick={() => toggleStage(stage.stageNumber)}
                            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/80 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-technical text-xs font-bold px-2 py-0.5 rounded-full bg-[#E1EAF2] text-[#496D91]">
                                Stage {stage.stageNumber}
                              </span>
                              <div>
                                <h3 className="font-editorial text-base sm:text-lg font-bold text-[#25352D]">
                                  {stage.title}
                                </h3>
                                <p className="text-xs text-[#5F6C64]">{stage.subtitle}</p>
                              </div>
                            </div>
                            {isExpanded ? <ChevronDown className="w-4 h-4 text-[#5F6C64]" /> : <ChevronRight className="w-4 h-4 text-[#5F6C64]" />}
                          </button>

                          {isExpanded && (
                            <div className="p-5 bg-white border-t border-[#E6E8E1] space-y-4 text-xs text-[#5F6C64]">
                              <div>
                                <h4 className="font-technical font-bold text-[#25352D] uppercase tracking-wider mb-2">
                                  Core Concepts
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-disc pl-4 text-[#293B32]">
                                  {stage.coreConcepts.map((concept, i) => (
                                    <li key={i}>{concept}</li>
                                  ))}
                                </ul>
                              </div>

                              {stage.zeroIndexLink && stage.zeroIndexLink.available && (
                                <div className="pt-2 border-t border-[#E6E8E1] flex items-center justify-between">
                                  <span className="font-technical text-[#285C49] font-medium">
                                    {stage.zeroIndexLink.label}
                                  </span>
                                  <button
                                    onClick={() => handleWorkbenchLink(stage.zeroIndexLink.sectionRoute)}
                                    className="px-3 py-1.5 rounded-lg bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                                  >
                                    <span>Open on Workbench</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Tasteful Editorial Review Notice when roadmaps are unmerged/offline */
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-center space-y-5 max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-[#E1EAF2] text-[#496D91] flex items-center justify-center mx-auto">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                    Learning Paths Under Editorial Review
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5F6C64] leading-relaxed max-w-md mx-auto">
                    Engineering learning roadmaps built on the START → TRY → NEXT framework are currently undergoing faculty review. Explore foundational subject units on The Workbench or placement preparation tracks below.
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
                    onClick={() => {
                      setActiveTab('career-prep');
                      window.location.hash = 'atlas/career-prep';
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#E1EAF2] border border-[#DDE2DA] text-[#496D91] text-xs font-bold transition-all cursor-pointer"
                  >
                    Switch to Career Preparation
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =====================================================================
            ENTRY POINT B: CAREER PREPARATION (THE BRIDGE INTEGRATION)
        ===================================================================== */}
        {activeTab === 'career-prep' && (
          <div className="space-y-8 animate-in fade-in duration-150 text-left">
            
            {/* Admin Notice for Preview */}
            {isAdminPreview && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-technical flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  <span>
                    <strong>Admin Preview Mode:</strong> Viewing all {bridgePlacementDomains.length} domains including hidden tracks. Public visitors see only the {accessibleDomains.length} published domains.
                  </span>
                </div>
                <span className="text-[11px] text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md shrink-0 self-start sm:self-auto">
                  AAL2 Verified Session
                </span>
              </div>
            )}

            {/* Placement Preparation Guide Header */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#956A43]" />
                <span className="font-technical text-xs font-bold uppercase tracking-wider text-[#956A43]">
                  Campus Placement Preparation Guide
                </span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#25352D]">
                Professional Career Preparation
              </h2>
              <p className="text-sm text-[#5F6C64] leading-relaxed max-w-3xl">
                Systematic checklists, formulas, competency frameworks, and practice materials for engineering placement rounds, campus interviews, and career readiness.
              </p>
            </div>

            {/* Preparation Domains Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {accessibleDomains.map((dom, idx) => {
                const isSelected = activeDomainId === dom.id;
                const domainDone = (completedItems[dom.id] || []).length;
                const domainTotal = dom.checklist.length;
                const isDomainPublic = isItemPubliclyAccessible(dom.registryId, contentOverrides);

                return (
                  <button
                    key={dom.id}
                    onClick={() => handleSelectDomain(dom.id)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#956A43] shadow-soft ring-1 ring-[#956A43]'
                        : 'bg-white/70 hover:bg-white border-[#DDE2DA] text-[#5F6C64]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-technical text-[10px] font-bold uppercase tracking-wider text-[#956A43]">
                          Domain 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isAdminPreview && (
                            <span className={`text-[9px] font-technical px-1.5 py-0.5 rounded ${
                              isDomainPublic ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 font-semibold'
                            }`}>
                              {isDomainPublic ? 'Public' : 'Hidden'}
                            </span>
                          )}
                          <span className="text-[10px] font-technical px-2 py-0.5 rounded-full bg-[#F0F1EB] text-[#5F6C64]">
                            {domainDone}/{domainTotal} done
                          </span>
                        </div>
                      </div>

                      <h3 className="font-editorial text-sm sm:text-base font-bold text-[#25352D] mb-1 line-clamp-1">
                        {dom.shortTitle}
                      </h3>

                      <p className="text-[11px] text-[#5F6C64] line-clamp-2 leading-relaxed">
                        {dom.summary}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E6E8E1] text-xs font-semibold text-[#956A43] flex items-center justify-between">
                      <span className="text-[11px] font-technical">{dom.badge}</span>
                      <span className="text-[11px] font-bold">
                        {isSelected ? 'Active ●' : 'Select →'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Domain Workspace */}
            {currentDomain ? (
              <div className="bg-white rounded-3xl border border-[#DDE2DA] shadow-soft p-6 sm:p-10 space-y-8">
                
                {/* Domain Header & Overview */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E6E8E1]">
                  <div className="space-y-2 max-w-3xl">
                    <span className="font-technical text-xs font-bold text-[#956A43] uppercase tracking-wider block">
                      Placement Preparation Guide · {currentDomain.category}
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#25352D]">
                      {currentDomain.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#5F6C64] leading-relaxed">
                      {currentDomain.overview}
                    </p>
                  </div>

                  {/* Checklist Progress Indicator */}
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] font-technical text-xs space-y-2 lg:text-right shrink-0 min-w-[200px]">
                    <div className="flex items-center justify-between lg:justify-end gap-2">
                      <span className="text-[#5F6C64]">Checklist Progress:</span>
                      <strong className="text-[#956A43]">{completedCount} of {totalCount}</strong>
                    </div>
                    <div className="w-full bg-[#E6E8E1] h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#956A43] h-full transition-all duration-300" 
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-[#69766D] block">
                      {progressPercent}% Complete
                    </span>
                  </div>
                </div>

                {/* Section 1: Preparation Checklist */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-xl font-bold text-[#25352D]">
                      Preparation Checklist
                    </h3>
                    <span className="font-technical text-xs text-[#5F6C64]">
                      Click checkbox to track your progress
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentDomain.checklist.map((item, idx) => {
                      const isDone = domainCompletedIndices.includes(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleChecklistItem(currentDomain.id, idx)}
                          className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3 select-none ${
                            isDone
                              ? 'bg-[#F0F5F2] border-[#C2D8CB] text-[#245B4B]'
                              : 'bg-[#FAF8F5] hover:bg-white border-[#E6E8E1] text-[#293B32]'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-[#285C49]" />
                            ) : (
                              <Square className="w-4 h-4 text-[#69766D]" />
                            )}
                          </div>
                          <span className={`leading-relaxed ${isDone ? 'line-through opacity-80' : ''}`}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Core Competency Tracks */}
                <div className="space-y-4 pt-4 border-t border-[#E6E8E1]">
                  <h3 className="font-editorial text-xl font-bold text-[#25352D]">
                    Core Competency Framework
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentDomain.competencyTracks.map((track, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#E6E8E1] space-y-1.5">
                        <span className="font-technical text-[10px] font-bold text-[#956A43] uppercase tracking-wider block">
                          Track 0{idx + 1}
                        </span>
                        <h4 className="font-editorial text-base font-bold text-[#25352D]">
                          {track.trackName}
                        </h4>
                        <p className="text-xs text-[#5F6C64] leading-relaxed">
                          {track.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: High-Yield Formulas & Rules (if present) */}
                {Array.isArray(currentDomain.formulasAndRules) && currentDomain.formulasAndRules.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-[#E6E8E1]">
                    <h3 className="font-editorial text-xl font-bold text-[#25352D]">
                      High-Yield Formulas and Reference Rules
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {currentDomain.formulasAndRules.map((rule, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white border border-[#DDE2DA] space-y-1">
                          <p className="font-technical text-xs font-bold text-[#25352D]">{rule.ruleTitle}</p>
                          <p className="font-mono text-xs text-[#956A43] bg-[#F7F5EF] p-2 rounded-lg">{rule.ruleFormula}</p>
                          {rule.ruleNote && <p className="text-[11px] text-[#5F6C64]">{rule.ruleNote}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: Practice Milestones & Questions (if present) */}
                {Array.isArray(currentDomain.practiceQuestions) && currentDomain.practiceQuestions.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-[#E6E8E1]">
                    <h3 className="font-editorial text-xl font-bold text-[#25352D]">
                      Standard Practice Milestones
                    </h3>
                    <div className="space-y-3">
                      {currentDomain.practiceQuestions.map((q, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E8E1] space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-technical text-[10px] font-bold text-[#956A43] uppercase tracking-wider">
                              Practice Problem 0{idx + 1}
                            </span>
                            <span className="font-technical text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#DDE2DA] text-[#5F6C64]">
                              {q.difficulty}
                            </span>
                          </div>
                          <p className="font-medium text-[#25352D]">{q.question}</p>
                          <p className="text-[#5F6C64]"><strong className="text-[#25352D]">Key Insight:</strong> {q.solutionStrategy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 5: Workbench Interconnection */}
                {currentDomain.workbenchConnection && (
                  <div className="p-5 rounded-2xl bg-[#F0F5F2] border border-[#C2D8CB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-technical text-[10px] font-bold uppercase tracking-wider text-[#285C49] block">
                        Academic Prerequisite
                      </span>
                      <h4 className="font-editorial text-base font-bold text-[#25352D]">
                        {currentDomain.workbenchConnection.title}
                      </h4>
                      <p className="text-xs text-[#5F6C64]">
                        {currentDomain.workbenchConnection.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleWorkbenchLink(currentDomain.workbenchConnection.route)}
                      className="px-4 py-2 rounded-xl bg-[#285C49] hover:bg-[#1E4738] text-white text-xs font-bold transition-all shrink-0 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open on Workbench</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white border border-[#DDE2DA] text-center space-y-4">
                <Briefcase className="w-8 h-8 text-[#956A43] mx-auto" />
                <h3 className="font-editorial text-xl font-bold text-[#25352D]">
                  No Placement Tracks Currently Visible
                </h3>
                <p className="text-xs text-[#5F6C64] max-w-md mx-auto">
                  Career readiness modules are being reviewed by faculty. Please check back soon or explore our foundational course units on The Workbench.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AtlasLanding;
