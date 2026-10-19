import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  MapPin, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Layers, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const AtlasLanding = ({ onNavigateHome, onNavigateWorkbench }) => {
  const [selectedRoadmap, setSelectedRoadmap] = useState(0);

  const roadmaps = [
    {
      id: 'systems',
      title: 'Computer Systems & Architecture Pathway',
      subtitle: 'From Silicon & Gates to Modern Operating Systems',
      accent: '#496D91',
      softAccent: '#E1EAF2',
      status: 'Roadmap Outline',
      target: 'Foundational CS & Systems Engineers',
      prerequisites: 'Basic algebra and logical reasoning',
      stages: [
        {
          stageNumber: '01',
          name: 'Boolean Logic & Digital Hardware',
          topics: ['Number Systems', 'Combinational Circuits', 'K-Maps', 'Sequential Flip-Flops'],
          workbenchLink: 'Digital Logic Design (Unit 1 Active)',
          status: 'Unit 1 Active'
        },
        {
          stageNumber: '02',
          name: 'Low-Level Execution & Memory in C',
          topics: ['Pointers & Addresses', 'Stack vs Heap Frames', 'Bitwise Manipulation', 'Struct Alignment'],
          workbenchLink: 'C Programming & Systems',
          status: 'Planned Outline'
        },
        {
          stageNumber: '03',
          name: 'Computer Organization & Assembly',
          topics: ['ALU Design', 'Register Files', 'Instruction Set Architectures (RISC-V)', 'Control Unit'],
          workbenchLink: 'Computer Architecture',
          status: 'In Blueprint'
        },
        {
          stageNumber: '04',
          name: 'Operating System Internals',
          topics: ['Processes & Threads', 'Virtual Memory & Paging', 'File Systems', 'Concurrency & Locks'],
          workbenchLink: 'Operating Systems',
          status: 'In Blueprint'
        }
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science & Machine Learning Foundations',
      subtitle: 'Mathematical Principles to Deep Neural Representations',
      accent: '#245B4B',
      softAccent: '#E0EBDF',
      status: 'Planned Pathway',
      target: 'Data Science & Applied AI Undergraduates',
      prerequisites: 'High-school calculus and Python fundamentals',
      stages: [
        {
          stageNumber: '01',
          name: 'Applied Linear Algebra & Calculus',
          topics: ['Matrix Decompositions (SVD, PCA)', 'Vector Spaces', 'Partial Derivatives & Gradients'],
          workbenchLink: 'ML Foundations',
          status: 'Planned Outline'
        },
        {
          stageNumber: '02',
          name: 'Statistical Modeling & Classical ML',
          topics: ['Linear Regression', 'Logistic Classification', 'Decision Trees', 'Loss Optimization'],
          workbenchLink: 'Statistical Learning',
          status: 'In Blueprint'
        },
        {
          stageNumber: '03',
          name: 'Deep Neural Networks & Representation',
          topics: ['Backpropagation Proofs', 'CNNs & Spatial Filters', 'Sequence Modeling', 'Transformers'],
          workbenchLink: 'Deep Learning',
          status: 'In Blueprint'
        }
      ]
    },
    {
      id: 'algorithms',
      title: 'Core Software Engineering & Algorithms',
      subtitle: 'Data Structures, Graph Theory & Complexity Bounds',
      accent: '#956A43',
      softAccent: '#F1E5D9',
      status: 'Planned Pathway',
      target: 'Software Engineers & Algorithm Enthusiasts',
      prerequisites: 'C or Python basics',
      stages: [
        {
          stageNumber: '01',
          name: 'Linear Data Collections & Recursion',
          topics: ['Dynamic Arrays', 'Linked Lists', 'Stacks & Queues', 'Divide and Conquer'],
          workbenchLink: 'Data Structures',
          status: 'Planned Outline'
        },
        {
          stageNumber: '02',
          name: 'Non-Linear Trees, Heaps & Hashing',
          topics: ['Binary Search Trees', 'AVL Balancing', 'Priority Queues', 'Hash Tables & Collisions'],
          workbenchLink: 'Data Structures',
          status: 'In Blueprint'
        },
        {
          stageNumber: '03',
          name: 'Graph Traversal & Dynamic Programming',
          topics: ['BFS & DFS', 'Shortest Paths (Dijkstra)', 'Memoization & Tabulation', 'Topological Sort'],
          workbenchLink: 'Algorithms Lab',
          status: 'In Blueprint'
        }
      ]
    }
  ];

  const currentMap = roadmaps[selectedRoadmap];

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

        {/* Cartographic Roadmap Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {roadmaps.map((map, idx) => {
            const isSelected = selectedRoadmap === idx;
            return (
              <button
                key={map.id}
                onClick={() => setSelectedRoadmap(idx)}
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
                    <span className="text-[10px] font-technical px-2 py-0.5 rounded-full bg-[#F0F1EB] text-[#5F6C64]">
                      {map.stages.length} Stages
                    </span>
                  </div>
                  <h3 className="font-editorial text-base font-bold text-[#25352D] mb-1">
                    {map.title}
                  </h3>
                  <p className="text-xs text-[#5F6C64] leading-relaxed">
                    {map.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#E6E8E1] flex items-center justify-between text-xs">
                  <span className="font-technical text-[10px] text-[#69766D]">{map.status}</span>
                  <span className="font-semibold" style={{ color: map.accent }}>Inspect Route →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Roadmap Route Sheet */}
        <div className="bg-white rounded-3xl border border-[#DDE2DA] shadow-soft p-6 sm:p-8 space-y-8 text-left">
          
          {/* Route Metadata Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6E8E1]">
            <div>
              <span className="font-technical text-xs font-bold text-[#496D91] uppercase tracking-wider block mb-1">
                Active Roadmap Inspection
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#25352D]">
                {currentMap.title}
              </h2>
              <p className="text-sm text-[#5F6C64] mt-1">
                {currentMap.subtitle}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F0F1EB] border border-[#DDE2DA] font-technical text-xs space-y-1 sm:text-right">
              <div><strong className="text-[#25352D]">Audience:</strong> {currentMap.target}</div>
              <div><strong className="text-[#25352D]">Prerequisites:</strong> {currentMap.prerequisites}</div>
            </div>
          </div>

          {/* Sequential Stages Progress Line */}
          <div className="space-y-6">
            <h3 className="font-technical text-xs font-bold uppercase tracking-wider text-[#5F6C64]">
              Sequential Route Milestones
            </h3>

            <div className="relative border-l-2 border-[#DDE2DA] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
              {currentMap.stages.map((stg, sIdx) => (
                <div key={sIdx} className="relative group">
                  {/* Waypoint Marker on line */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-6 h-6 rounded-full bg-white border-2 border-[#496D91] flex items-center justify-center font-technical text-[10px] font-bold text-[#496D91] shadow-2xs">
                    {stg.stageNumber}
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#DDE2DA] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-editorial text-lg font-bold text-[#25352D]">
                        {stg.name}
                      </h4>
                      <span className="font-technical text-xs text-[#496D91] font-semibold">
                        {stg.status}
                      </span>
                    </div>

                    {/* Topic Badges */}
                    <div className="flex flex-wrap gap-2 text-xs font-technical">
                      {stg.topics.map((tpc, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#DDE2DA] text-[#5F6C64]"
                        >
                          {tpc}
                        </span>
                      ))}
                    </div>

                    {/* Workbench Cross-link */}
                    <div className="pt-2 text-xs font-technical flex items-center justify-between border-t border-[#E6E8E1] text-[#5F6C64]">
                      <span>Workbench Material: <strong className="text-[#25352D]">{stg.workbenchLink}</strong></span>
                      <button
                        onClick={onNavigateWorkbench}
                        className="text-[#245B4B] hover:underline font-semibold cursor-pointer"
                      >
                        Go to Workbench →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AtlasLanding;
