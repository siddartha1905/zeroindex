import React, { useState } from 'react';
import { isItemPubliclyAccessible } from '../data/centralContentRegistry';

export const KnowledgeTreeIllustration = ({ 
  activeBranch = null, 
  onSelectBranch,
  contentOverrides = {}
}) => {
  const [hoveredBranch, setHoveredBranch] = useState(null);

  const isBranchAccessible = (branchId) => {
    return isItemPubliclyAccessible('pillar-' + branchId, contentOverrides);
  };
  const isBridgePublic = isBranchAccessible('bridge');

  const branches = [
    {
      id: 'workbench',
      name: 'The Workbench',
      number: '01',
      color: '#285C49',
      softColor: '#DDEADD',
      label: 'Core Academics',
    },
    {
      id: 'atlas',
      name: 'The Atlas',
      number: '02',
      color: '#496D91',
      softColor: '#E1EAF2',
      label: 'Skill Roadmaps',
    },
    {
      id: 'bridge',
      name: 'The Bridge',
      number: '03',
      color: '#C38A63',
      softColor: '#F5EBE1',
      label: 'Career Prep',
    },
    {
      id: 'readout',
      name: 'The Readout',
      number: '04',
      color: '#765C90',
      softColor: '#EBE5F0',
      label: 'Tech & Science',
    },
    {
      id: 'folio',
      name: 'The Folio',
      number: '05',
      color: '#935F5D',
      softColor: '#F2E5E1',
      label: 'Essays & Notes',
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
        aria-label="Schematic technical diagram showing five learning pathways originating from index zero"
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
            BRANCH 1: THE WORKBENCH (Left-up to x:85, y:120)
        ------------------------------------------------------------- */}
        <g 
          tabIndex={0}
          role="button"
          aria-label="The Workbench: Core Academics"
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
            d="M 260 325 C 220 280, 140 220, 85 130" 
            fill="none" 
            stroke={currentHover === 'workbench' ? '#285C49' : '#69766D'} 
            strokeWidth={currentHover === 'workbench' ? '2.8' : '1.6'}
            strokeLinecap="round"
          />
          {/* Sub-twigs */}
          <path d="M 175 250 C 145 235, 120 220, 110 190" fill="none" stroke="#DDE2DA" strokeWidth="1" strokeLinecap="round" />
          
          {/* Terminal Motif: Open schematic notebook & logic gate */}
          <g transform="translate(50, 65)">
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
            BRANCH 2: THE ATLAS (Mid-left up to x:175, y:65)
        ------------------------------------------------------------- */}
        <g 
          tabIndex={0}
          role="button"
          aria-label="The Atlas: Skill Roadmaps"
          className="cursor-pointer transition-all duration-150 focus:outline-none"
          onMouseEnter={() => setHoveredBranch('atlas')}
          onMouseLeave={() => setHoveredBranch(null)}
          onFocus={() => setHoveredBranch('atlas')}
          onBlur={() => setHoveredBranch(null)}
          onKeyDown={(e) => handleKeyDown(e, 'atlas')}
          onClick={() => onSelectBranch && onSelectBranch('atlas')}
        >
          {/* Branch Path */}
          <path 
            d="M 264 322 C 240 260, 200 170, 175 75" 
            fill="none" 
            stroke={currentHover === 'atlas' ? '#496D91' : '#69766D'} 
            strokeWidth={currentHover === 'atlas' ? '2.8' : '1.6'}
            strokeLinecap="round"
          />
          {/* Waypoint dots */}
          <circle cx="215" cy="190" r="2.5" fill="#496D91" />
          <circle cx="190" cy="120" r="2.5" fill="#496D91" />

          {/* Terminal Motif: Cartographic folded route & directional marker */}
          <g transform="translate(140, 15)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'atlas' ? '#E1EAF2' : '#FFFFFF'} 
              stroke={currentHover === 'atlas' ? '#496D91' : '#DDE2DA'} 
              strokeWidth={currentHover === 'atlas' ? '2' : '1.5'}
            />
            {/* Route waypoints */}
            <path d="M 16 32 L 28 20 L 42 28 L 54 16" fill="none" stroke="#496D91" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="16" cy="32" r="2.5" fill="#496D91" />
            <circle cx="28" cy="20" r="2" fill="#496D91" />
            <circle cx="42" cy="28" r="2" fill="#496D91" />
            <circle cx="54" cy="16" r="3" fill="#496D91" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#293B32">02 ATLAS</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 3: THE BRIDGE (Center vertical up to x:270, y:55)
        ------------------------------------------------------------- */}
        <g 
          tabIndex={isBridgePublic ? 0 : -1}
          role={isBridgePublic ? "button" : "presentation"}
          aria-label={isBridgePublic ? "The Bridge: Career Prep" : "The Bridge: Temporarily Offline"}
          aria-disabled={!isBridgePublic}
          className={isBridgePublic ? "cursor-pointer transition-all duration-150 focus:outline-none" : "opacity-25 cursor-not-allowed pointer-events-none"}
          onMouseEnter={() => isBridgePublic && setHoveredBranch('bridge')}
          onMouseLeave={() => setHoveredBranch(null)}
          onFocus={() => isBridgePublic && setHoveredBranch('bridge')}
          onBlur={() => setHoveredBranch(null)}
          onKeyDown={(e) => isBridgePublic && handleKeyDown(e, 'bridge')}
          onClick={() => isBridgePublic && onSelectBranch && onSelectBranch('bridge')}
        >
          {/* Main Trunk & Branch */}
          <path 
            d="M 270 320 L 270 65" 
            fill="none" 
            stroke={currentHover === 'bridge' ? '#C38A63' : '#69766D'} 
            strokeWidth={currentHover === 'bridge' ? '3' : '1.8'}
            strokeLinecap="round"
          />

          {/* Terminal Motif: Structural truss bridge silhouette */}
          <g transform="translate(235, 8)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'bridge' ? '#F5EBE1' : '#FFFFFF'} 
              stroke={currentHover === 'bridge' ? '#C38A63' : '#DDE2DA'} 
              strokeWidth={currentHover === 'bridge' ? '2' : '1.5'}
            />
            {/* Truss bridge illustration */}
            <line x1="12" y1="34" x2="58" y2="34" stroke="#C38A63" strokeWidth="1.5" />
            <path d="M 16 34 L 28 20 L 42 20 L 54 34" fill="none" stroke="#C38A63" strokeWidth="1.4" />
            <line x1="28" y1="20" x2="28" y2="34" stroke="#C38A63" strokeWidth="1" />
            <line x1="42" y1="20" x2="42" y2="34" stroke="#C38A63" strokeWidth="1" />
            <line x1="28" y1="34" x2="42" y2="20" stroke="#C38A63" strokeWidth="0.8" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#293B32">03 BRIDGE</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 4: THE READOUT (Mid-right up to x:365, y:65)
        ------------------------------------------------------------- */}
        <g 
          tabIndex={0}
          role="button"
          aria-label="The Readout: Tech & Science"
          className="cursor-pointer transition-all duration-150 focus:outline-none"
          onMouseEnter={() => setHoveredBranch('readout')}
          onMouseLeave={() => setHoveredBranch(null)}
          onFocus={() => setHoveredBranch('readout')}
          onBlur={() => setHoveredBranch(null)}
          onKeyDown={(e) => handleKeyDown(e, 'readout')}
          onClick={() => onSelectBranch && onSelectBranch('readout')}
        >
          {/* Branch Path */}
          <path 
            d="M 276 322 C 300 260, 340 170, 365 75" 
            fill="none" 
            stroke={currentHover === 'readout' ? '#765C90' : '#69766D'} 
            strokeWidth={currentHover === 'readout' ? '2.8' : '1.6'}
            strokeLinecap="round"
          />
          <circle cx="325" cy="190" r="2.5" fill="#765C90" />
          <circle cx="350" cy="120" r="2.5" fill="#765C90" />

          {/* Terminal Motif: Oscilloscope wave & measurement crosshair */}
          <g transform="translate(330, 15)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'readout' ? '#EBE5F0' : '#FFFFFF'} 
              stroke={currentHover === 'readout' ? '#765C90' : '#DDE2DA'} 
              strokeWidth={currentHover === 'readout' ? '2' : '1.5'}
            />
            {/* Oscilloscope sine wave */}
            <path d="M 12 26 Q 22 14, 30 26 T 48 26 T 58 26" fill="none" stroke="#765C90" strokeWidth="1.4" />
            <line x1="35" y1="16" x2="35" y2="36" stroke="#DDE2DA" strokeWidth="0.8" strokeDasharray="2 1" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#293B32">04 READOUT</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 5: THE FOLIO (Far-right up to x:455, y:120)
        ------------------------------------------------------------- */}
        <g 
          tabIndex={0}
          role="button"
          aria-label="The Folio: Essays & Notes"
          className="cursor-pointer transition-all duration-150 focus:outline-none"
          onMouseEnter={() => setHoveredBranch('folio')}
          onMouseLeave={() => setHoveredBranch(null)}
          onFocus={() => setHoveredBranch('folio')}
          onBlur={() => setHoveredBranch(null)}
          onKeyDown={(e) => handleKeyDown(e, 'folio')}
          onClick={() => onSelectBranch && onSelectBranch('folio')}
        >
          {/* Branch Path */}
          <path 
            d="M 280 325 C 320 280, 400 220, 455 130" 
            fill="none" 
            stroke={currentHover === 'folio' ? '#935F5D' : '#69766D'} 
            strokeWidth={currentHover === 'folio' ? '2.8' : '1.6'}
            strokeLinecap="round"
          />
          <path d="M 365 250 C 395 235, 420 220, 430 190" fill="none" stroke="#DDE2DA" strokeWidth="1" strokeLinecap="round" />

          {/* Terminal Motif: Open literary sheet & fountain pen annotation */}
          <g transform="translate(420, 65)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'folio' ? '#F2E5E1' : '#FFFFFF'} 
              stroke={currentHover === 'folio' ? '#935F5D' : '#DDE2DA'} 
              strokeWidth={currentHover === 'folio' ? '2' : '1.5'}
            />
            {/* Typeset editorial lines */}
            <line x1="16" y1="18" x2="54" y2="18" stroke="#935F5D" strokeWidth="1.2" />
            <line x1="16" y1="24" x2="48" y2="24" stroke="#935F5D" strokeWidth="1.2" />
            <line x1="16" y1="30" x2="52" y2="30" stroke="#935F5D" strokeWidth="1.2" />
            {/* Pen tip angle */}
            <path d="M 52 28 L 56 32 L 53 34 Z" fill="#935F5D" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#293B32">05 FOLIO</text>
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
