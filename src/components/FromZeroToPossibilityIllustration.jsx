import React from 'react';

export const FromZeroToPossibilityIllustration = () => {
  return (
    <div className="relative w-full p-4 sm:p-6 bg-white rounded-3xl border border-[#DDE2DA] shadow-soft select-none overflow-hidden">
      
      {/* Header Label */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E8E1] mb-2 font-technical text-[11px] text-[#5F6C64]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#346C53]" />
          <span className="font-bold text-[#25352D] uppercase tracking-wider">Fig 2.0 · From Zero to Possibility</span>
        </div>
        <span className="text-[10px] text-[#69766D]">First Principles of Engineering</span>
      </div>

      {/* SVG Canvas */}
      <svg 
        viewBox="0 0 680 220" 
        className="w-full h-auto"
        role="img"
        aria-label="Hand-drawn diagram showing mathematical, circuit, logic, and computational concepts emerging from origin zero"
      >
        <defs>
          <pattern id="workbenchGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="0" stroke="#F0F1EB" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="#F0F1EB" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width="680" height="220" fill="url(#workbenchGrid)" opacity="0.6" />

        {/* 1. Origin Zero Container on Left */}
        <g transform="translate(60, 110)">
          {/* Circular coordinate guides */}
          <circle cx="0" cy="0" r="38" fill="#E0EBDF" fillOpacity="0.4" stroke="#346C53" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#DDE2DA" strokeWidth="1" strokeDasharray="3 3" />
          <text x="0" y="9" textAnchor="middle" fontFamily="'Source Serif 4', Georgia, serif" fontSize="28" fontWeight="bold" fill="#245B4B">0</text>
          
          {/* Origin crosshair ticks */}
          <line x1="-48" y1="0" x2="-38" y2="0" stroke="#346C53" strokeWidth="1.2" />
          <line x1="38" y1="0" x2="48" y2="0" stroke="#346C53" strokeWidth="1.2" />
          <line x1="0" y1="-48" x2="0" y2="-38" stroke="#346C53" strokeWidth="1.2" />
          <line x1="0" y1="38" x2="0" y2="48" stroke="#346C53" strokeWidth="1.2" />
          
          <text x="0" y="54" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#5F6C64">INDEX [0]</text>
        </g>

        {/* 2. Flowing Architectural Streamlines */}
        <path d="M 108 100 C 160 90, 190 50, 260 50 L 640 50" fill="none" stroke="#DDE2DA" strokeWidth="1.2" strokeDasharray="4 3" />
        <path d="M 108 110 C 180 110, 220 110, 320 110 L 640 110" fill="none" stroke="#346C53" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 108 120 C 160 130, 200 170, 280 170 L 640 170" fill="none" stroke="#DDE2DA" strokeWidth="1.2" strokeDasharray="4 3" />

        {/* 3. Stage 1: Mathematical Foundations (x: 180 to 260) */}
        <g transform="translate(190, 75)">
          <rect x="-10" y="-18" width="80" height="70" rx="6" fill="#FFFFFF" stroke="#DDE2DA" strokeWidth="1" />
          <text x="30" y="-4" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#5F6C64">MATHEMATICS</text>
          <text x="10" y="16" fontFamily="'Source Serif 4', Georgia, serif" fontSize="13" fontStyle="italic" fill="#25352D">∫ f(x) dx</text>
          <text x="10" y="38" fontFamily="'Source Serif 4', Georgia, serif" fontSize="12" fill="#346C53">Σ [xᵢ · 2ⁱ]</text>
        </g>

        {/* Connecting vector */}
        <line x1="260" y1="110" x2="310" y2="110" stroke="#346C53" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* 4. Stage 2: Logic Gates & Circuits (x: 310 to 410) */}
        <g transform="translate(320, 75)">
          <rect x="-10" y="-18" width="90" height="70" rx="6" fill="#FFFFFF" stroke="#DDE2DA" strokeWidth="1" />
          <text x="35" y="-4" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#346C53">LOGIC GATES</text>
          
          {/* AND Gate outline */}
          <path d="M 15 12 L 32 12 C 44 12, 44 32, 32 32 L 15 32 Z" fill="#E0EBDF" stroke="#346C53" strokeWidth="1.4" />
          <line x1="6" y1="18" x2="15" y2="18" stroke="#346C53" strokeWidth="1.2" />
          <line x1="6" y1="26" x2="15" y2="26" stroke="#346C53" strokeWidth="1.2" />
          <line x1="40" y1="22" x2="52" y2="22" stroke="#346C53" strokeWidth="1.2" />
          <text x="56" y="25" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fontWeight="bold" fill="#245B4B">Y=A·B</text>
        </g>

        {/* Connecting vector */}
        <line x1="400" y1="110" x2="450" y2="110" stroke="#346C53" strokeWidth="1.5" />

        {/* 5. Stage 3: Algorithms & Data Structures (x: 450 to 550) */}
        <g transform="translate(460, 75)">
          <rect x="-10" y="-18" width="95" height="70" rx="6" fill="#FFFFFF" stroke="#DDE2DA" strokeWidth="1" />
          <text x="38" y="-4" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#5F6C64">DATA &amp; MEMORY</text>
          
          {/* Array cells */}
          <g transform="translate(6, 12)">
            <rect x="0" y="0" width="18" height="18" fill="#F0F1EB" stroke="#5F6C64" strokeWidth="1" />
            <text x="9" y="13" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fontWeight="bold" fill="#25352D">0</text>
            
            <rect x="18" y="0" width="18" height="18" fill="#F0F1EB" stroke="#5F6C64" strokeWidth="1" />
            <text x="27" y="13" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#5F6C64">1</text>
            
            <rect x="36" y="0" width="18" height="18" fill="#F0F1EB" stroke="#5F6C64" strokeWidth="1" />
            <text x="45" y="13" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#5F6C64">2</text>
          </g>

          <text x="6" y="42" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#346C53">arr[0] · *ptr</text>
        </g>

        {/* 6. Stage 4: High-Level Intelligent Systems (x: 580 to 660) */}
        <g transform="translate(585, 75)">
          <rect x="-10" y="-18" width="85" height="70" rx="6" fill="#FFFFFF" stroke="#DDE2DA" strokeWidth="1" />
          <text x="32" y="-4" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fontWeight="bold" fill="#5F6C64">INTELLIGENCE</text>
          
          {/* Neural weights graph fragment */}
          <circle cx="10" cy="18" r="4" fill="#346C53" />
          <circle cx="10" cy="34" r="4" fill="#346C53" />
          <circle cx="45" cy="26" r="5" fill="#245B4B" />
          <line x1="14" y1="18" x2="40" y2="26" stroke="#346C53" strokeWidth="1" />
          <line x1="14" y1="34" x2="40" y2="26" stroke="#346C53" strokeWidth="1" />
          <text x="32" y="44" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fill="#25352D">W·x + b</text>
        </g>

      </svg>

      {/* Understated caption */}
      <div className="pt-2 text-left font-technical text-xs text-[#5F6C64]">
        <span>Progression: From binary state differential [0] to computational graphs and neural tensors.</span>
      </div>

    </div>
  );
};

export default FromZeroToPossibilityIllustration;
