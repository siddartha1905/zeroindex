import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
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
  BrainCircuit
} from 'lucide-react';
import { atlasRoadmaps } from '../data/atlasRoadmapsConfig';
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
  initialMapId = null
}) => {
  const isMapAccessible = (map) => {
    if (isAdminPreview) return true;
    const regId = ATLAS_ROADMAP_REGISTRY_MAP[map.id];
    if (!regId) return false;
    return isItemPubliclyAccessible(regId, contentOverrides);
  };

  const accessibleRoadmaps = atlasRoadmaps.filter(isMapAccessible);

  const [selectedMapId, setSelectedMapId] = useState(() => {
    if (initialMapId) {
      const match = atlasRoadmaps.find(m => m.id === initialMapId);
      if (match && isMapAccessible(match)) return initialMapId;
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

  // Fallback when active roadmap becomes hidden or initialMapId changes
  useEffect(() => {
    if (initialMapId) {
      const match = atlasRoadmaps.find(m => m.id === initialMapId);
      if (match && isMapAccessible(match)) {
        setSelectedMapId(initialMapId);
        return;
      }
    }
    const current = atlasRoadmaps.find(m => m.id === selectedMapId);
    if (!current || !isMapAccessible(current)) {
      if (accessibleRoadmaps.length > 0) {
        setSelectedMapId(accessibleRoadmaps[0].id);
      }
    }
  }, [initialMapId, accessibleRoadmaps, contentOverrides, isAdminPreview]);

  const currentMap = accessibleRoadmaps.find(m => m.id === selectedMapId) || accessibleRoadmaps[0] || atlasRoadmaps[0];

  const toggleStage = (stageNum) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageNum]: !prev[stageNum]
    }));
  };

  const expandAll = () => {
    const all = {};
    currentMap.stages.forEach(s => { all[s.stageNumber] = true; });
    setExpandedStages(all);
  };

  const collapseAll = () => {
    const none = {};
    currentMap.stages.forEach(s => { none[s.stageNumber] = false; });
    setExpandedStages(none);
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
            <span className="text-[#496D91] font-bold">02 The Atlas</span>
            <span className="text-[#DDE2DA]">/</span>
            <span className="text-[#5F6C64] truncate max-w-[220px]">
              {currentMap.title}
            </span>
          </nav>

          <span className="font-technical text-[11px] text-[#5F6C64]">
            Structured Learning Routes &amp; Progression Maps
          </span>
        </div>

        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] border border-[#496D91]/30 text-xs font-technical font-bold text-[#496D91]">
            <span>PILLAR 02</span>
            <span>·</span>
            <span>STRUCTURED PATHWAYS</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#25352D]">
            The Atlas
          </h1>
          <p className="font-editorial italic text-lg sm:text-xl text-[#5F6C64] max-w-2xl leading-relaxed">
            "Learning routes that help you decide what to study next."
          </p>
        </div>

        {/* Cartographic Roadmaps View or Clean Empty State */}
        {accessibleRoadmaps.length === 0 && !isAdminPreview ? (
          <div className="p-10 rounded-3xl bg-white border border-[#DDE2DA] shadow-soft text-center space-y-4 max-w-2xl mx-auto my-12">
            <div className="w-12 h-12 rounded-2xl bg-[#E1EAF2] text-[#496D91] flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="font-editorial text-2xl font-bold text-[#25352D]">
                Curriculum Roadmaps Under Editorial Review
              </h2>
              <p className="text-xs text-[#5F6C64] leading-relaxed max-w-md mx-auto">
                The structured learning routes for The Atlas are being updated and verified against university syllabi. Please explore active course materials in The Workbench.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onNavigateWorkbench}
                className="px-5 py-2.5 rounded-xl bg-[#245B4B] hover:bg-[#28755E] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Go to The Workbench
              </button>
            </div>
          </div>
        ) : (
          <>
            {isAdminPreview && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase tracking-wider font-technical">Admin Preview</span>
                  <span>Inspecting all Atlas roadmap blueprints regardless of publication status.</span>
                </div>
              </div>
            )}

            {/* Cartographic Roadmap Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {accessibleRoadmaps.map((map, idx) => {
                const isSelected = selectedMapId === map.id;
                const regId = ATLAS_ROADMAP_REGISTRY_MAP[map.id];
                const isPublic = isItemPubliclyAccessible(regId, contentOverrides);

                return (
                  <button
                    key={map.id}
                    onClick={() => {
                      setSelectedMapId(map.id);
                      const initialExp = {};
                      map.stages.forEach((s, sIdx) => {
                        initialExp[s.stageNumber] = sIdx < 2;
                      });
                      setExpandedStages(initialExp);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#496D91] shadow-soft ring-1 ring-[#496D91]'
                        : 'bg-white/70 hover:bg-white border-[#DDE2DA] text-[#5F6C64]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-technical text-xs font-bold" style={{ color: map.accent }}>
                          Route 0{idx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          {isAdminPreview && (
                            <span className={`text-[10px] font-technical px-2 py-0.5 rounded-full font-bold ${
                              isPublic ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isPublic ? 'Public' : 'Hidden'}
                            </span>
                          )}
                          <span className="text-[10px] font-technical px-2 py-0.5 rounded-full bg-[#F0F1EB] text-[#5F6C64]">
                            {map.stages.length} Stages
                          </span>
                        </div>
                      </div>

                      <h3 className="font-editorial text-base font-bold text-[#25352D] mb-1">
                        {map.title}
                      </h3>

                      <p className="text-xs text-[#5F6C64] leading-relaxed line-clamp-2">
                        {map.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E6E8E1] flex items-center justify-between text-xs">
                      <span className="font-technical text-[10px] text-[#69766D]">{map.status}</span>
                      <span className="font-semibold text-xs" style={{ color: map.accent }}>
                        {isSelected ? 'Active Route ●' : 'Inspect Route →'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

        {/* Selected Roadmap Route Sheet */}
        <div className="bg-white rounded-3xl border border-[#DDE2DA] shadow-soft p-6 sm:p-10 space-y-8 text-left">
          
          {/* Route Metadata Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E6E8E1]">
            <div className="space-y-2 max-w-3xl">
              <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block">
                {currentMap.isPrimary ? 'Core Flagship Pathway' : 'Specialized Engineering Route'}
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#25352D]">
                {currentMap.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5F6C64] leading-relaxed">
                {currentMap.overview}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] font-technical text-xs space-y-2 lg:text-right shrink-0">
              <div>
                <strong className="text-[#25352D] block sm:inline mr-1">Target Audience:</strong>
                <span className="text-[#5F6C64]">{currentMap.target}</span>
              </div>
              <div className="pt-1 border-t border-[#E6E8E1]">
                <strong className="text-[#25352D] block sm:inline mr-1">Prerequisites:</strong>
                <span className="text-[#5F6C64]">{currentMap.prerequisites}</span>
              </div>
            </div>
          </div>

          {/* Sequential Stages Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <h3 className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                Sequential Route Milestones ({currentMap.stages.length} Stages)
              </h3>
              <p className="text-xs text-[#5F6C64] mt-0.5">
                Click any milestone to inspect learning objectives, concepts, and recommended practical exercises.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-technical">
              <button
                onClick={expandAll}
                className="px-3 py-1 rounded-lg border border-[#DDE2DA] hover:bg-[#F0F1EB] text-[#5F6C64] cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1 rounded-lg border border-[#DDE2DA] hover:bg-[#F0F1EB] text-[#5F6C64] cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Sequential Timeline Progress Line */}
          <div className="relative border-l-2 border-[#DDE2DA] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {currentMap.stages.map((stg) => {
              const isExpanded = expandedStages[stg.stageNumber] ?? false;
              const hasLink = stg.zeroIndexLink && stg.zeroIndexLink.available;

              return (
                <div key={stg.stageNumber} className="relative group">
                  
                  {/* Waypoint Marker on Line */}
                  <button
                    onClick={() => toggleStage(stg.stageNumber)}
                    className={`absolute -left-[35px] sm:-left-[43px] top-4 w-7 h-7 rounded-full border-2 flex items-center justify-center font-technical text-[11px] font-bold shadow-2xs transition-all cursor-pointer ${
                      isExpanded
                        ? 'bg-[#496D91] text-white border-[#496D91]'
                        : 'bg-white text-[#496D91] border-[#496D91] hover:bg-[#E1EAF2]'
                    }`}
                    aria-label={`Toggle stage ${stg.stageNumber}`}
                  >
                    {stg.stageNumber}
                  </button>

                  {/* Stage Card */}
                  <div className="rounded-2xl border border-[#DDE2DA] bg-[#F7F5EF] hover:border-[#496D91]/60 transition-all shadow-2xs overflow-hidden">
                    
                    {/* Collapsible Card Header */}
                    <div 
                      onClick={() => toggleStage(stg.stageNumber)}
                      className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-technical text-xs font-bold text-[#496D91]">
                            Stage {stg.stageNumber}
                          </span>
                          {stg.estimatedTime && (
                            <span className="text-[11px] font-technical text-[#69766D]">
                              · {stg.estimatedTime}
                            </span>
                          )}
                        </div>
                        <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[#25352D]">
                          {stg.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5F6C64]">
                          {stg.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                        <span className={`text-[10px] font-technical font-bold px-2.5 py-1 rounded-full uppercase border ${
                          stg.statusType === 'available'
                            ? 'bg-[#E0EBDF] text-[#245B4B] border-[#245B4B]/30'
                            : stg.statusType === 'framework' || stg.statusType === 'synthesis'
                            ? 'bg-[#E1EAF2] text-[#496D91] border-[#496D91]/30'
                            : 'bg-[#FAF8F5] text-[#D97706] border-[#D97706]/30'
                        }`}>
                          {stg.status}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-[#5F6C64]" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-[#5F6C64]" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Stage Details */}
                    {isExpanded && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-[#E6E8E1] space-y-6 text-xs sm:text-sm">
                        
                        {/* Prerequisites callout */}
                        {stg.prerequisites && (
                          <div className="p-3 rounded-xl bg-white border border-[#DDE2DA] flex items-center gap-2 text-xs font-technical text-[#5F6C64]">
                            <Target className="w-4 h-4 text-[#496D91] shrink-0" />
                            <span><strong>Prerequisite Knowledge:</strong> {stg.prerequisites}</span>
                          </div>
                        )}

                        {/* Learning Objectives */}
                        {stg.learningObjectives && stg.learningObjectives.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                              Key Learning Objectives
                            </h5>
                            <ul className="space-y-1.5 text-[#5F6C64]">
                              {stg.learningObjectives.map((obj, oIdx) => (
                                <li key={oIdx} className="flex items-start gap-2">
                                  <span className="text-[#496D91] font-bold">✓</span>
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Core Technical Concepts Chips */}
                        {stg.coreConcepts && stg.coreConcepts.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-technical text-xs font-bold uppercase tracking-wider text-[#5F6C64]">
                              Core Concepts &amp; Vocabulary
                            </h5>
                            <div className="flex flex-wrap gap-1.5 font-technical text-xs">
                              {stg.coreConcepts.map((c, cIdx) => (
                                <span 
                                  key={cIdx}
                                  className="px-2.5 py-1 rounded-md bg-white border border-[#DDE2DA] text-[#25352D]"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Practical Milestones / Projects */}
                        {stg.practicalMilestones && stg.practicalMilestones.length > 0 && (
                          <div className="p-4 rounded-xl bg-white border border-[#DDE2DA] space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-technical font-bold text-[#245B4B]">
                              <Terminal className="w-3.5 h-3.5" />
                              <span>Recommended Practical Exercises &amp; Milestones</span>
                            </div>
                            <ul className="space-y-1.5 text-xs text-[#5F6C64]">
                              {stg.practicalMilestones.map((m, mIdx) => (
                                <li key={mIdx} className="flex items-start gap-2">
                                  <span className="text-[#245B4B] font-mono">[{mIdx + 1}]</span>
                                  <span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Specialized Branches (Stage 6) */}
                        {stg.branches && stg.branches.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <h5 className="font-technical text-xs font-bold uppercase tracking-wider text-[#496D91]">
                              Four Specialization Directions
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {stg.branches.map((br, bIdx) => (
                                <div key={bIdx} className="p-4 rounded-xl bg-white border border-[#DDE2DA] space-y-2">
                                  <h6 className="font-editorial text-sm font-bold text-[#25352D]">
                                    {br.branchTitle}
                                  </h6>
                                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                                    {br.target}
                                  </p>
                                  <div className="flex flex-wrap gap-1 pt-1 font-technical text-[10px]">
                                    {br.keyTopics.map((top, tIdx) => (
                                      <span key={tIdx} className="px-2 py-0.5 rounded bg-[#F0F1EB] text-[#5F6C64]">
                                        {top}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ZeroIndex Resource Link Area */}
                        {stg.zeroIndexLink && (
                          <div className="pt-3 border-t border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-technical text-xs">
                            <div className="text-[#5F6C64]">
                              <span>ZeroIndex Resource: </span>
                              <strong className={hasLink ? 'text-[#245B4B]' : 'text-[#64748B]'}>
                                {stg.zeroIndexLink.label}
                              </strong>
                            </div>

                            {hasLink ? (
                              <button
                                onClick={() => handleWorkbenchLink(stg.zeroIndexLink.sectionRoute)}
                                className="px-3.5 py-1.5 rounded-lg bg-[#245B4B] hover:bg-[#28755E] text-white font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-2xs"
                              >
                                <span>Open Resource</span>
                                <span>→</span>
                              </button>
                            ) : (
                              <span className="text-[11px] text-[#64748B] italic">
                                Content planned in future milestone
                              </span>
                            )}
                          </div>
                        )}

                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>

        </div>
        </>
        )}

      </div>
    </div>
  );
};

export default AtlasLanding;
