import React, { useState } from 'react';
import { isItemPubliclyAccessible } from '../data/centralContentRegistry';

export const KnowledgeTreeIllustration = ({ 
  activeBranch = null, 
  onSelectBranch,
  contentOverrides = {}
}) => {
  const [hoveredBranch, setHoveredBranch] = useState(null);

  const isBranchAccessible = (branchId) => {
    if (branchId === 'workbench') {
      return isItemPubliclyAccessible('pillar-workbench', contentOverrides);
    }
    if (branchId === 'atlas') {
      return isItemPubliclyAccessible('pillar-atlas', contentOverrides) || isItemPubliclyAccessible('pillar-bridge', contentOverrides);
    }
    if (branchId === 'journal') {
      return isItemPubliclyAccessible('pillar-readout', contentOverrides) || isItemPubliclyAccessible('pillar-folio', contentOverrides);
    }
    return false;
  };

  const branches = [
    {
      id: 'workbench',
      name: 'The Workbench',
      number: '01',
      color: '#285C49',
      softColor: '#DDEADD',
      label: 'Learn and Understand',
    },
    {
      id: 'atlas',
      name: 'The Atlas',
      number: '02',
      color: '#496D91',
      softColor: '#E1EAF2',
      label: 'Direction and Skills',
    },
    {
      id: 'journal',
      name: 'The Journal',
      number: '03',
      color: '#765C90',
      softColor: '#EBE5F0',
      label: 'Ideas, Insights and Reflections',
    },
  ];

  const currentHover = hoveredBranch || activeBranch;

  const handleKeyDown = (e, branchId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onSelectBranch) onSelectBranch(branchId);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-[#DDE2DA] shadow-soft select-none">
      
      {/* Schematic Header Label */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E8E1] mb-2 font-technical text-[11px] text-[#5F6C64]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#285C49]" />
          <span className="font-bold text-[#293B32] uppercase tracking-wider">Fig 1.0 · The Knowledge Tree</span>
        </div>
        <span className="text-[10px] text-[#69766D]">Origin [0]</span>
      </div>

      {/* SVG Canvas */}
      <svg 
        viewBox="0 0 540 400" 
        className="w-full h-auto"
        role="img"
        aria-label="Schematic technical diagram showing three learning pathways originating from index zero"
      >
        <defs>
          {/* Subtle Grid Pattern for drawing canvas */}
          <pattern id="schematicGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="0" stroke="#F5F3EC" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="#F5F3EC" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="540" height="400" fill="url(#schematicGrid)" opacity="0.7" />

        {/* Ambient Origin Concentric Rings */}
        <circle cx="270" cy="340" r="42" fill="none" stroke="#E6E8E1" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="270" cy="340" r="28" fill="none" stroke="#DDE2DA" strokeWidth="1.2" />

        {/* -------------------------------------------------------------
            BRANCH 1: THE WORKBENCH (Left branch toward x:95, y:125)
        ------------------------------------------------------------- */}
        <g 
          tabIndex={0}
          role="button"
          aria-label="The Workbench: Learn and Understand"
          className="cursor-pointer transition-all duration-150 focus:outline-none"
          onMouseEnter={() => setHoveredBranch('workbench')}
          onMouseLeave={() => setHoveredBranch(null)}
          onFocus={() => setHoveredBranch('workbench')}
          onBlur={() => setHoveredBranch(null)}
          onKeyDown={(e) => handleKeyDown(e, 'workbench')}
          onClick={() => onSelectBranch && onSelectBranch('workbench')}
        >
          {/* Branch Path */}
          <path 
            d="M 260 325 C 220 280, 150 210, 95 125" 
            fill="none" 
            stroke={currentHover === 'workbench' ? '#285C49' : '#69766D'} 
            strokeWidth={currentHover === 'workbench' ? '2.8' : '1.6'}
            strokeLinecap="round"
          />
          {/* Sub-twigs */}
          <path d="M 175 245 C 145 230, 120 215, 110 185" fill="none" stroke="#DDE2DA" strokeWidth="1" strokeLinecap="round" />
          
          {/* Terminal Motif: Open schematic notebook and logic gate */}
          <g transform="translate(60, 60)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'workbench' ? '#DDEADD' : '#FFFFFF'} 
              stroke={currentHover === 'workbench' ? '#285C49' : '#DDE2DA'} 
              strokeWidth={currentHover === 'workbench' ? '2' : '1.5'}
            />
            {/* Logic gate schematic icon */}
            <path d="M 18 20 L 32 20 C 42 20, 42 36, 32 36 L 18 36 Z" fill="none" stroke="#285C49" strokeWidth="1.4" />
            <line x1="12" y1="24" x2="18" y2="24" stroke="#285C49" strokeWidth="1.2" />
            <line x1="12" y1="32" x2="18" y2="32" stroke="#285C49" strokeWidth="1.2" />
            <line x1="42" y1="28" x2="52" y2="28" stroke="#285C49" strokeWidth="1.2" />
            {/* Badge label */}
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#293B32">01 WORKBENCH</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 2: THE ATLAS (Center branch toward x:270, y:75)
        ------------------------------------------------------------- */}
        <g 
          tabIndex={0}
          role="button"
          aria-label="The Atlas: Find Your Direction and Build Skills"
          className="cursor-pointer transition-all duration-150 focus:outline-none"
          onMouseEnter={() => setHoveredBranch('atlas')}
          onMouseLeave={() => setHoveredBranch(null)}
          onFocus={() => setHoveredBranch('atlas')}
          onBlur={() => setHoveredBranch(null)}
          onKeyDown={(e) => handleKeyDown(e, 'atlas')}
          onClick={() => onSelectBranch && onSelectBranch('atlas')}
        >
          {/* Main Trunk and Branch Path */}
          <path 
            d="M 270 320 L 270 75" 
            fill="none" 
            stroke={currentHover === 'atlas' ? '#496D91' : '#69766D'} 
            strokeWidth={currentHover === 'atlas' ? '3' : '1.8'}
            strokeLinecap="round"
          />
          {/* Sub-twig Left: Learning Paths (START -> TRY -> NEXT) */}
          <path d="M 270 230 C 240 210, 210 190, 195 160" fill="none" stroke="#DDE2DA" strokeWidth="1" strokeLinecap="round" />
          <circle cx="225" cy="195" r="2.5" fill="#496D91" />
          <circle cx="195" cy="160" r="2.5" fill="#496D91" />

          {/* Sub-twig Right: Career Preparation (Bridge) */}
          <path d="M 270 210 C 300 195, 330 180, 345 155" fill="none" stroke="#DDE2DA" strokeWidth="1" strokeLinecap="round" />
          <line x1="285" y1="202" x2="315" y2="185" stroke="#496D91" strokeWidth="0.9" strokeDasharray="2 2" />

          {/* Terminal Motif: Directional Waypoint with Bridge Truss */}
          <g transform="translate(235, 15)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'atlas' ? '#E1EAF2' : '#FFFFFF'} 
              stroke={currentHover === 'atlas' ? '#496D91' : '#DDE2DA'} 
              strokeWidth={currentHover === 'atlas' ? '2' : '1.5'}
            />
            {/* Structural bridge arch and waypoints */}
            <line x1="14" y1="34" x2="56" y2="34" stroke="#496D91" strokeWidth="1.4" />
            <path d="M 18 34 L 28 20 L 42 20 L 52 34" fill="none" stroke="#496D91" strokeWidth="1.3" />
            <circle cx="28" cy="20" r="2.2" fill="#496D91" />
            <circle cx="42" cy="20" r="2.2" fill="#496D91" />
            <line x1="35" y1="20" x2="35" y2="34" stroke="#496D91" strokeWidth="1" strokeDasharray="2 1" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#293B32">02 ATLAS</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 3: THE JOURNAL (Right branch toward x:445, y:125)
        ------------------------------------------------------------- */}
        <g 
          tabIndex={0}
          role="button"
          aria-label="The Journal: Ideas, Insights and Reflections"
          className="cursor-pointer transition-all duration-150 focus:outline-none"
          onMouseEnter={() => setHoveredBranch('journal')}
          onMouseLeave={() => setHoveredBranch(null)}
          onFocus={() => setHoveredBranch('journal')}
          onBlur={() => setHoveredBranch(null)}
          onKeyDown={(e) => handleKeyDown(e, 'journal')}
          onClick={() => onSelectBranch && onSelectBranch('journal')}
        >
          {/* Branch Path */}
          <path 
            d="M 280 325 C 320 280, 390 210, 445 125" 
            fill="none" 
            stroke={currentHover === 'journal' ? '#765C90' : '#69766D'} 
            strokeWidth={currentHover === 'journal' ? '2.8' : '1.6'}
            strokeLinecap="round"
          />
          {/* Sub-twigs: Insights (waveform) and Reflections (editorial) */}
          <path d="M 365 245 C 395 230, 420 215, 430 185" fill="none" stroke="#DDE2DA" strokeWidth="1" strokeLinecap="round" />
          <path d="M 390 225 Q 400 215, 410 225 T 425 220" fill="none" stroke="#765C90" strokeWidth="0.9" />

          {/* Terminal Motif: Editorial script and technical waveform */}
          <g transform="translate(410, 60)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'journal' ? '#EBE5F0' : '#FFFFFF'} 
              stroke={currentHover === 'journal' ? '#765C90' : '#DDE2DA'} 
              strokeWidth={currentHover === 'journal' ? '2' : '1.5'}
            />
            {/* Waveform and typeset lines */}
            <path d="M 14 20 Q 22 13, 28 20 T 40 20" fill="none" stroke="#765C90" strokeWidth="1.2" />
            <line x1="16" y1="28" x2="54" y2="28" stroke="#765C90" strokeWidth="1.1" />
            <line x1="16" y1="34" x2="46" y2="34" stroke="#765C90" strokeWidth="1.1" />
            <path d="M 50 32 L 54 36 L 51 38 Z" fill="#765C90" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#293B32">03 JOURNAL</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            CENTRAL ORIGIN NODE [0] (Base Root)
        ------------------------------------------------------------- */}
        <g transform="translate(270, 340)">
          {/* Outer compass ring */}
          <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke="#285C49" strokeWidth="2" />
          <circle cx="0" cy="0" r="16" fill="#F0F1EB" stroke="#285C49" strokeWidth="1" strokeDasharray="2 2" />
          {/* Centered zero glyph */}
          <text x="0" y="5" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="16" fontWeight="bold" fill="#285C49">0</text>
          {/* Origin caption */}
          <text x="0" y="32" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#5F6C64" letterSpacing="0.05em">ORIGIN NODE</text>
        </g>

      </svg>

      {/* Live Pillar Inspector Footer */}
      <div className="mt-2 pt-3 border-t border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
        <div>
          <span className="font-technical text-[10px] text-[#69766D] uppercase tracking-wider block">
            {currentHover ? `Selected Branch · ${branches.find(b => b.id === currentHover)?.number}` : 'Interactive Diagram'}
          </span>
          <span className="text-xs font-bold text-[#293B32]">
            {currentHover 
              ? `${branches.find(b => b.id === currentHover)?.name} (${branches.find(b => b.id === currentHover)?.label})` 
              : 'Select a branch to preview its destination.'}
          </span>
        </div>

        {currentHover && isBranchAccessible(currentHover) && (
          <button
            onClick={() => onSelectBranch && onSelectBranch(currentHover)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
            style={{ 
              backgroundColor: branches.find(b => b.id === currentHover)?.softColor,
              color: branches.find(b => b.id === currentHover)?.color
            }}
          >
            <span>Enter {branches.find(b => b.id === currentHover)?.name}</span>
            <span>→</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default KnowledgeTreeIllustration;
