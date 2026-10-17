import React, { useState } from 'react';

export const KnowledgeTreeIllustration = ({ 
  activeBranch = null, 
  onSelectBranch 
}) => {
  const [hoveredBranch, setHoveredBranch] = useState(null);

  const branches = [
    {
      id: 'workbench',
      name: 'The Workbench',
      number: '01',
      color: '#346C53',
      softColor: '#E0EBDF',
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
      color: '#956A43',
      softColor: '#F1E5D9',
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

  return (
    <div className="relative w-full max-w-xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-[#DDE2DA] shadow-soft select-none">
      
      {/* Schematic Header Label */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E8E1] mb-2 font-technical text-[11px] text-[#5F6C64]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#245B4B]" />
          <span className="font-bold text-[#25352D] uppercase tracking-wider">Fig 1.0 · The Knowledge Tree</span>
        </div>
        <span className="text-[10px] text-[#69766D]">Schematic Origin [0]</span>
      </div>

      {/* SVG Canvas */}
      <svg 
        viewBox="0 0 540 400" 
        className="w-full h-auto"
        role="img"
        aria-label="Hand-drawn technical diagram showing five learning branches growing from origin zero"
      >
        <defs>
          {/* Subtle Grid Pattern for drawing canvas */}
          <pattern id="schematicGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="0" stroke="#F0F1EB" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="#F0F1EB" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="540" height="400" fill="url(#schematicGrid)" opacity="0.6" />

        {/* Ambient Origin Rings */}
        <circle cx="270" cy="340" r="42" fill="none" stroke="#E6E8E1" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="270" cy="340" r="28" fill="none" stroke="#DDE2DA" strokeWidth="1.2" />

        {/* -------------------------------------------------------------
            BRANCH 1: THE WORKBENCH (Left-up to x:85, y:120)
        ------------------------------------------------------------- */}
        <g 
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={() => setHoveredBranch('workbench')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onSelectBranch && onSelectBranch('workbench')}
        >
          {/* Branch Path */}
          <path 
            d="M 260 325 C 220 280, 140 220, 85 130" 
            fill="none" 
            stroke={currentHover === 'workbench' ? '#346C53' : '#5F6C64'} 
            strokeWidth={currentHover === 'workbench' ? '2.5' : '1.5'}
            strokeLinecap="round"
          />
          {/* Sub-twigs */}
          <path d="M 175 250 C 145 235, 120 220, 110 190" fill="none" stroke="#DDE2DA" strokeWidth="1" strokeLinecap="round" />
          
          {/* Terminal Motif: Open schematic notebook & logic gate */}
          <g transform="translate(50, 65)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'workbench' ? '#E0EBDF' : '#FFFFFF'} 
              stroke={currentHover === 'workbench' ? '#346C53' : '#DDE2DA'} 
              strokeWidth="1.5"
            />
            {/* Logic gate schematic icon */}
            <path d="M 18 20 L 32 20 C 42 20, 42 36, 32 36 L 18 36 Z" fill="none" stroke="#346C53" strokeWidth="1.3" />
            <line x1="12" y1="24" x2="18" y2="24" stroke="#346C53" strokeWidth="1.2" />
            <line x1="12" y1="32" x2="18" y2="32" stroke="#346C53" strokeWidth="1.2" />
            <line x1="42" y1="28" x2="52" y2="28" stroke="#346C53" strokeWidth="1.2" />
            {/* Badge label */}
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#346C53">01 WORKBENCH</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 2: THE ATLAS (Mid-left up to x:175, y:65)
        ------------------------------------------------------------- */}
        <g 
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={() => setHoveredBranch('atlas')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onSelectBranch && onSelectBranch('atlas')}
        >
          {/* Branch Path */}
          <path 
            d="M 264 322 C 240 260, 200 170, 175 75" 
            fill="none" 
            stroke={currentHover === 'atlas' ? '#496D91' : '#5F6C64'} 
            strokeWidth={currentHover === 'atlas' ? '2.5' : '1.5'}
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
              strokeWidth="1.5"
            />
            {/* Route waypoints */}
            <path d="M 16 32 L 28 20 L 42 28 L 54 16" fill="none" stroke="#496D91" strokeWidth="1.4" strokeDasharray="3 2" />
            <circle cx="16" cy="32" r="2.5" fill="#496D91" />
            <circle cx="28" cy="20" r="2" fill="#496D91" />
            <circle cx="42" cy="28" r="2" fill="#496D91" />
            <circle cx="54" cy="16" r="3" fill="#496D91" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#496D91">02 ATLAS</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 3: THE BRIDGE (Center vertical up to x:270, y:55)
        ------------------------------------------------------------- */}
        <g 
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={() => setHoveredBranch('bridge')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onSelectBranch && onSelectBranch('bridge')}
        >
          {/* Main Trunk & Branch */}
          <path 
            d="M 270 320 L 270 65" 
            fill="none" 
            stroke={currentHover === 'bridge' ? '#956A43' : '#5F6C64'} 
            strokeWidth={currentHover === 'bridge' ? '2.5' : '1.8'}
            strokeLinecap="round"
          />

          {/* Terminal Motif: Structural truss bridge silhouette */}
          <g transform="translate(235, 8)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'bridge' ? '#F1E5D9' : '#FFFFFF'} 
              stroke={currentHover === 'bridge' ? '#956A43' : '#DDE2DA'} 
              strokeWidth="1.5"
            />
            {/* Truss bridge illustration */}
            <line x1="12" y1="34" x2="58" y2="34" stroke="#956A43" strokeWidth="1.5" />
            <path d="M 16 34 L 28 20 L 42 20 L 54 34" fill="none" stroke="#956A43" strokeWidth="1.3" />
            <line x1="28" y1="20" x2="28" y2="34" stroke="#956A43" strokeWidth="1" />
            <line x1="42" y1="20" x2="42" y2="34" stroke="#956A43" strokeWidth="1" />
            <line x1="28" y1="34" x2="42" y2="20" stroke="#956A43" strokeWidth="0.8" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#956A43">03 BRIDGE</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 4: THE READOUT (Mid-right up to x:365, y:65)
        ------------------------------------------------------------- */}
        <g 
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={() => setHoveredBranch('readout')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onSelectBranch && onSelectBranch('readout')}
        >
          {/* Branch Path */}
          <path 
            d="M 276 322 C 300 260, 340 170, 365 75" 
            fill="none" 
            stroke={currentHover === 'readout' ? '#765C90' : '#5F6C64'} 
            strokeWidth={currentHover === 'readout' ? '2.5' : '1.5'}
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
              strokeWidth="1.5"
            />
            {/* Oscilloscope sine wave */}
            <path d="M 12 26 Q 22 14, 30 26 T 48 26 T 58 26" fill="none" stroke="#765C90" strokeWidth="1.4" />
            <line x1="35" y1="16" x2="35" y2="36" stroke="#DDE2DA" strokeWidth="0.8" strokeDasharray="2 1" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#765C90">04 READOUT</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            BRANCH 5: THE FOLIO (Far-right up to x:455, y:120)
        ------------------------------------------------------------- */}
        <g 
          className="cursor-pointer transition-all duration-200"
          onMouseEnter={() => setHoveredBranch('folio')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onSelectBranch && onSelectBranch('folio')}
        >
          {/* Branch Path */}
          <path 
            d="M 280 325 C 320 280, 400 220, 455 130" 
            fill="none" 
            stroke={currentHover === 'folio' ? '#935F5D' : '#5F6C64'} 
            strokeWidth={currentHover === 'folio' ? '2.5' : '1.5'}
            strokeLinecap="round"
          />
          <path d="M 365 250 C 395 235, 420 220, 430 190" fill="none" stroke="#DDE2DA" strokeWidth="1" strokeLinecap="round" />

          {/* Terminal Motif: Open literary sheet & fountain pen annotation */}
          <g transform="translate(420, 65)">
            <rect 
              x="0" y="0" width="70" height="52" rx="6" 
              fill={currentHover === 'folio' ? '#F2E5E1' : '#FFFFFF'} 
              stroke={currentHover === 'folio' ? '#935F5D' : '#DDE2DA'} 
              strokeWidth="1.5"
            />
            {/* Typeset editorial lines */}
            <line x1="16" y1="18" x2="54" y2="18" stroke="#935F5D" strokeWidth="1.2" />
            <line x1="16" y1="24" x2="48" y2="24" stroke="#935F5D" strokeWidth="1.2" />
            <line x1="16" y1="30" x2="52" y2="30" stroke="#935F5D" strokeWidth="1.2" />
            {/* Pen tip angle */}
            <path d="M 52 28 L 56 32 L 53 34 Z" fill="#935F5D" />
            <text x="35" y="47" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#935F5D">05 FOLIO</text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            CENTRAL ORIGIN NODE [0] (Base Root)
        ------------------------------------------------------------- */}
        <g transform="translate(270, 340)">
          {/* Outer compass ring */}
          <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke="#245B4B" strokeWidth="2" />
          <circle cx="0" cy="0" r="16" fill="#F0F1EB" stroke="#245B4B" strokeWidth="1" strokeDasharray="2 2" />
          {/* Centered zero glyph */}
          <text x="0" y="5" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="16" fontWeight="bold" fill="#245B4B">0</text>
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
          <span className="text-xs font-bold text-[#25352D]">
            {currentHover 
              ? `${branches.find(b => b.id === currentHover)?.name} (${branches.find(b => b.id === currentHover)?.label})` 
              : 'Hover or tap any branch to inspect destination'}
          </span>
        </div>

        {currentHover && (
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
