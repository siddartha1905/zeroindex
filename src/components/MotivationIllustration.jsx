import React from 'react';

/**
 * MotivationIllustration
 * An original, delicate hand-drawn style SVG illustration depicting the relationship
 * between academic learning and intellectual exploration.
 *
 * Visual Motifs:
 * - A foundational stack of hardcover books and open study notebook at origin.
 * - An organic seedling / flower budding beside the books.
 * - A winding path extending through rolling foothills toward distant mountain peaks.
 * - Snow-capped mountain peaks with ink hatched ridges.
 * - A soft copper morning sun.
 * - A tiny solitary traveler progressing along the trail.
 * - Delicate ink linework, muted watercolor washes, and warm paper tones.
 */
export const MotivationIllustration = ({ className = "w-full h-auto" }) => {
  return (
    <div className={`relative ${className} select-none`}>
      <svg 
        viewBox="0 0 380 290" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs"
        role="img"
        aria-label="Hand-drawn illustration: stack of books with a winding path leading to snow-capped mountains under a soft sun"
      >
        <defs>
          {/* Paper Texture Wash */}
          <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FBF8F2" />
          </linearGradient>

          {/* Soft Watercolor Sun Glow */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C38A63" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#E2C1A4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FBF8F2" stopOpacity="0" />
          </radialGradient>

          {/* Distant Mountains Wash */}
          <linearGradient id="distMtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E1EAF2" />
            <stop offset="100%" stopColor="#CAD7E2" />
          </linearGradient>

          {/* Main Peak Shadow Wash */}
          <linearGradient id="peakShadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E4E45" />
            <stop offset="100%" stopColor="#25352D" />
          </linearGradient>

          {/* Rolling Hills Wash */}
          <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8EEE6" />
            <stop offset="100%" stopColor="#D2DFCE" />
          </linearGradient>

          <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E0EBDF" />
            <stop offset="100%" stopColor="#C8DBC5" />
          </linearGradient>

          {/* Path Texture Strip */}
          <linearGradient id="pathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4EDE4" />
            <stop offset="100%" stopColor="#E5D9CB" />
          </linearGradient>

          {/* Book Spine Gradients */}
          <linearGradient id="bookGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E4738" />
            <stop offset="50%" stopColor="#285C49" />
            <stop offset="100%" stopColor="#1E4738" />
          </linearGradient>

          <linearGradient id="bookCopperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A86F49" />
            <stop offset="50%" stopColor="#C38A63" />
            <stop offset="100%" stopColor="#A86F49" />
          </linearGradient>
        </defs>

        {/* Outer Journal Plate Border */}
        <rect 
          x="3" 
          y="3" 
          width="374" 
          height="284" 
          rx="18" 
          fill="url(#paperGrad)" 
          stroke="#DDE2DA" 
          strokeWidth="1.2"
        />
        
        {/* Delicate inner drafting margin line */}
        <rect 
          x="12" 
          y="12" 
          width="356" 
          height="266" 
          rx="12" 
          fill="none" 
          stroke="#E6EBE2" 
          strokeWidth="0.8" 
          strokeDasharray="4 2"
        />

        {/* ==============================================================
            1. SKY & SUN
        ============================================================== */}
        {/* Soft Ambient Sun Glow Disc */}
        <circle cx="285" cy="65" r="46" fill="url(#sunGlow)" />
        
        {/* Delicate Ink Radiating Sun Rays */}
        <circle cx="285" cy="65" r="24" stroke="#C38A63" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="285" cy="65" r="16" fill="#FBF3EA" stroke="#C38A63" strokeWidth="1.2" />
        <circle cx="285" cy="65" r="8" fill="#C38A63" opacity="0.25" />

        {/* Delicate hand-drawn atmospheric clouds */}
        <path d="M 65 52 Q 85 46 110 50 Q 125 44 145 49" stroke="#BAC7D2" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
        <path d="M 185 42 Q 205 38 225 42" stroke="#BAC7D2" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

        {/* ==============================================================
            2. DISTANT BACKGROUND MOUNTAINS
        ============================================================== */}
        {/* Far atmospheric ridge */}
        <path 
          d="M 140 135 L 185 85 L 225 125 L 260 90 L 310 140 Z" 
          fill="url(#distMtnGrad)" 
          opacity="0.85"
        />
        <path 
          d="M 140 135 L 185 85 L 225 125 L 260 90 L 310 140" 
          stroke="#8EA8BD" 
          strokeWidth="0.8" 
          strokeLinecap="round"
        />

        {/* ==============================================================
            3. MIDGROUND SNOW-CAPPED JAGGED PEAKS
        ============================================================== */}
        {/* Left Shoulder Peak */}
        <path 
          d="M 105 160 L 150 95 L 195 160 Z" 
          fill="#D6E0DC" 
          stroke="#293B32" 
          strokeWidth="1.1" 
          strokeLinejoin="round"
        />
        {/* Left Peak Shadow Slope */}
        <path 
          d="M 150 95 L 158 135 L 195 160 L 150 160 Z" 
          fill="#788B81" 
          opacity="0.7"
        />
        {/* Left Peak Snow Crest */}
        <path 
          d="M 150 95 L 140 115 L 148 118 L 155 125 L 165 118 L 150 95 Z" 
          fill="#FFFFFF" 
          stroke="#293B32" 
          strokeWidth="0.9"
        />

        {/* Grand Central Mountain Peak */}
        <path 
          d="M 165 165 L 225 72 L 295 165 Z" 
          fill="#EEF3F0" 
          stroke="#293B32" 
          strokeWidth="1.3" 
          strokeLinejoin="round"
        />
        {/* Central Ridge Dividing Line */}
        <path 
          d="M 225 72 Q 228 110 238 165" 
          stroke="#293B32" 
          strokeWidth="1.2" 
          strokeLinecap="round"
        />
        {/* Central Peak Shaded Face (Graphite/Forest Slate) */}
        <path 
          d="M 225 72 Q 228 110 238 165 L 295 165 Z" 
          fill="url(#peakShadowGrad)" 
          opacity="0.88"
        />
        {/* Shading Hatching Lines on Central Peak */}
        <path d="M 235 105 L 260 118" stroke="#1E4738" strokeWidth="0.7" opacity="0.6" />
        <path d="M 238 120 L 272 135" stroke="#1E4738" strokeWidth="0.7" opacity="0.6" />
        <path d="M 240 135 L 285 152" stroke="#1E4738" strokeWidth="0.7" opacity="0.6" />
        <path d="M 242 148 L 290 160" stroke="#1E4738" strokeWidth="0.7" opacity="0.6" />

        {/* Central Peak Snow Cap */}
        <path 
          d="M 225 72 L 208 102 L 218 106 L 225 115 L 235 108 L 246 115 L 225 72 Z" 
          fill="#FFFFFF" 
          stroke="#293B32" 
          strokeWidth="1"
        />

        {/* Right Twin Peak */}
        <path 
          d="M 270 165 L 315 100 L 355 165 Z" 
          fill="#E6ECE9" 
          stroke="#293B32" 
          strokeWidth="1.1" 
          strokeLinejoin="round"
        />
        <path 
          d="M 315 100 Q 320 130 326 165 L 355 165 Z" 
          fill="#52645B" 
          opacity="0.8"
        />
        <path 
          d="M 315 100 L 305 118 L 314 122 L 322 118 L 315 100 Z" 
          fill="#FFFFFF" 
          stroke="#293B32" 
          strokeWidth="0.8"
        />

        {/* ==============================================================
            4. ROLLING FOOTHILLS & EVERGREEN WOODLAND
        ============================================================== */}
        {/* Upper Foothill Contour */}
        <path 
          d="M 35 195 Q 120 160 210 180 Q 300 165 365 190 L 365 245 L 35 245 Z" 
          fill="url(#hillGrad1)" 
        />
        <path 
          d="M 35 195 Q 120 160 210 180 Q 300 165 365 190" 
          stroke="#8EA89D" 
          strokeWidth="1" 
        />

        {/* Stippled Tree Grooves on Foothill Ridge */}
        <g stroke="#285C49" strokeWidth="1" strokeLinecap="round">
          {/* Group 1: Mid-left ridge trees */}
          <line x1="120" y1="172" x2="120" y2="165" />
          <line x1="124" y1="170" x2="124" y2="163" />
          <line x1="128" y1="173" x2="128" y2="166" />
          <circle cx="120" cy="164" r="2.2" fill="#285C49" />
          <circle cx="124" cy="162" r="2.5" fill="#285C49" />
          <circle cx="128" cy="165" r="2" fill="#285C49" />

          {/* Group 2: Pass entrance trees */}
          <line x1="280" y1="175" x2="280" y2="167" />
          <line x1="285" y1="174" x2="285" y2="165" />
          <line x1="290" y1="176" x2="290" y2="168" />
          <circle cx="280" cy="166" r="2" fill="#285C49" />
          <circle cx="285" cy="164" r="2.6" fill="#285C49" />
          <circle cx="290" cy="167" r="2.2" fill="#285C49" />
        </g>

        {/* Lower Terraced Foothill */}
        <path 
          d="M 25 225 Q 130 195 240 210 Q 315 200 365 220 L 365 265 L 25 265 Z" 
          fill="url(#hillGrad2)" 
        />
        <path 
          d="M 25 225 Q 130 195 240 210 Q 315 200 365 220" 
          stroke="#52645B" 
          strokeWidth="1" 
        />

        {/* ==============================================================
            5. THE WINDING PATHWAY
        ============================================================== */}
        {/* Soft Watercolor Path Ribbon */}
        <path 
          d="M 125 255 Q 155 240 185 242 Q 225 245 235 225 Q 248 195 272 185 Q 295 178 305 160" 
          fill="none" 
          stroke="url(#pathGrad)" 
          strokeWidth="8" 
          strokeLinecap="round"
        />

        {/* Ink Dashed Pathway Spine */}
        <path 
          d="M 125 255 Q 155 240 185 242 Q 225 245 235 225 Q 248 195 272 185 Q 295 178 305 160" 
          fill="none" 
          stroke="#C38A63" 
          strokeWidth="1.4" 
          strokeDasharray="4 3" 
          strokeLinecap="round"
        />
        {/* Sub-hatch stone steps along path */}
        <line x1="145" y1="245" x2="152" y2="249" stroke="#956A43" strokeWidth="1" strokeLinecap="round" />
        <line x1="172" y1="239" x2="178" y2="244" stroke="#956A43" strokeWidth="1" strokeLinecap="round" />
        <line x1="205" y1="239" x2="210" y2="245" stroke="#956A43" strokeWidth="1" strokeLinecap="round" />
        <line x1="242" y1="210" x2="248" y2="214" stroke="#956A43" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="278" y1="182" x2="284" y2="185" stroke="#956A43" strokeWidth="0.8" strokeLinecap="round" />

        {/* ==============================================================
            6. THE TINY SOLITARY TRAVELER
        ============================================================== */}
        <g transform="translate(252, 196)" opacity="0.9">
          {/* Walking Staff */}
          <line x1="11" y1="3" x2="15" y2="18" stroke="#293B32" strokeWidth="0.9" strokeLinecap="round" />
          {/* Rucksack */}
          <ellipse cx="4.5" cy="10" rx="2.5" ry="3.5" fill="#C38A63" stroke="#293B32" strokeWidth="0.7" />
          {/* Torso & Cloak */}
          <path d="M 5 7 L 9 7 L 10 16 L 4 16 Z" fill="#285C49" stroke="#293B32" strokeWidth="0.8" />
          {/* Head & Hat */}
          <circle cx="7" cy="4" r="2.2" fill="#FAF5ED" stroke="#293B32" strokeWidth="0.8" />
          <path d="M 4 4 Q 7 2.5 10 4" stroke="#293B32" strokeWidth="0.9" />
          {/* Stride Leg */}
          <line x1="8" y1="16" x2="10" y2="20" stroke="#293B32" strokeWidth="1" strokeLinecap="round" />
          <line x1="5" y1="16" x2="4" y2="20" stroke="#293B32" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* ==============================================================
            7. FOREGROUND: CAREFULLY ILLUSTRATED STACK OF BOOKS
        ============================================================== */}
        <g id="bookStack" transform="translate(42, 198)">
          
          {/* Ground drop shadow beneath books */}
          <ellipse cx="60" cy="62" rx="48" ry="6" fill="#25352D" opacity="0.15" />

          {/* ----- VOLUME 1 (BOTTOM): Large Scholarly Tome in Forest Green ----- */}
          {/* Bottom cover shadow & trim */}
          <rect x="12" y="47" width="94" height="15" rx="3" fill="url(#bookGreenGrad)" stroke="#1E4738" strokeWidth="1.2" />
          {/* Page block (Aged ivory paper edges) */}
          <rect x="22" y="49" width="82" height="11" fill="#F4EFE6" stroke="#DDE2DA" strokeWidth="0.7" />
          {/* Fine page edge rulings */}
          <line x1="24" y1="52" x2="102" y2="52" stroke="#D5CBBF" strokeWidth="0.5" />
          <line x1="24" y1="55" x2="102" y2="55" stroke="#D5CBBF" strokeWidth="0.5" />
          <line x1="24" y1="58" x2="102" y2="58" stroke="#D5CBBF" strokeWidth="0.5" />
          {/* Spine ribbed accents & gold tooling */}
          <rect x="12" y="47" width="10" height="15" rx="2" fill="#1E4738" stroke="#285C49" strokeWidth="0.8" />
          <line x1="14" y1="51" x2="20" y2="51" stroke="#C38A63" strokeWidth="0.9" />
          <line x1="14" y1="58" x2="20" y2="58" stroke="#C38A63" strokeWidth="0.9" />

          {/* ----- VOLUME 2 (MIDDLE): Slender Copper Binding ----- */}
          <g transform="translate(4, -13) rotate(-1.5 50 45)">
            <rect x="16" y="44" width="84" height="12" rx="2.5" fill="url(#bookCopperGrad)" stroke="#956A43" strokeWidth="1.1" />
            <rect x="26" y="46" width="72" height="8" fill="#FAF5EC" stroke="#DDE2DA" strokeWidth="0.6" />
            {/* Page ruling lines */}
            <line x1="28" y1="48.5" x2="96" y2="48.5" stroke="#D5CBBF" strokeWidth="0.5" />
            <line x1="28" y1="51.5" x2="96" y2="51.5" stroke="#D5CBBF" strokeWidth="0.5" />
            {/* Spine bands */}
            <rect x="16" y="44" width="10" height="12" rx="2" fill="#956A43" />
            <line x1="18" y1="47" x2="24" y2="47" stroke="#FAF5EC" strokeWidth="0.7" opacity="0.8" />
            <line x1="18" y1="53" x2="24" y2="53" stroke="#FAF5EC" strokeWidth="0.7" opacity="0.8" />
          </g>

          {/* ----- VOLUME 3 (TOP): Open Field Notebook / Journal ----- */}
          <g transform="translate(14, -26)">
            {/* Left page wing */}
            <path 
              d="M 12 40 C 25 36, 42 36, 50 39 L 49 52 C 40 49, 25 49, 12 53 Z" 
              fill="#FFFFFF" 
              stroke="#293B32" 
              strokeWidth="1.1"
            />
            {/* Left page text lines */}
            <line x1="18" y1="43" x2="44" y2="41" stroke="#8EA89D" strokeWidth="0.7" strokeDasharray="3 1.5" />
            <line x1="18" y1="46" x2="42" y2="44" stroke="#8EA89D" strokeWidth="0.7" strokeDasharray="3 1.5" />
            <line x1="18" y1="49" x2="40" y2="47" stroke="#8EA89D" strokeWidth="0.7" strokeDasharray="3 1.5" />

            {/* Center notebook gutter spine */}
            <line x1="50" y1="39" x2="49" y2="52" stroke="#C38A63" strokeWidth="1.5" />

            {/* Right page wing */}
            <path 
              d="M 50 39 C 58 36, 75 36, 88 40 L 88 53 C 75 49, 60 49, 49 52 Z" 
              fill="#FAF7F0" 
              stroke="#293B32" 
              strokeWidth="1.1"
            />
            {/* Right page text lines */}
            <line x1="56" y1="41" x2="82" y2="43" stroke="#8EA89D" strokeWidth="0.7" strokeDasharray="3 1.5" />
            <line x1="56" y1="44" x2="80" y2="46" stroke="#8EA89D" strokeWidth="0.7" strokeDasharray="3 1.5" />
            <line x1="56" y1="47" x2="78" y2="49" stroke="#8EA89D" strokeWidth="0.7" strokeDasharray="3 1.5" />

            {/* Trailing bookmark silk ribbon */}
            <path 
              d="M 50 52 Q 54 60 48 68 Q 44 74 46 78" 
              stroke="#C38A63" 
              strokeWidth="1.3" 
              strokeLinecap="round"
            />
          </g>

        </g>

        {/* ==============================================================
            8. THE GROWING PLANT / BOTANICAL FLOWER (Beside the Books)
        ============================================================== */}
        <g id="seedling" transform="translate(152, 218)">
          {/* Main botanical stem */}
          <path 
            d="M 0 35 Q 6 22 4 10 Q 3 2 8 -6" 
            stroke="#285C49" 
            strokeWidth="1.6" 
            strokeLinecap="round"
          />

          {/* Lower leaf (left) */}
          <path 
            d="M 4 22 C -4 20 -7 14 -5 10 C -1 12 2 17 4 22 Z" 
            fill="#DDEADD" 
            stroke="#285C49" 
            strokeWidth="1"
          />

          {/* Mid leaf (right) */}
          <path 
            d="M 4 14 C 11 12 15 6 13 2 C 9 4 6 9 4 14 Z" 
            fill="#8EA89D" 
            stroke="#285C49" 
            strokeWidth="1"
          />

          {/* Upper leaf (left) */}
          <path 
            d="M 5 4 C 0 1 -2 -5 0 -8 C 3 -6 5 -1 5 4 Z" 
            fill="#DDEADD" 
            stroke="#285C49" 
            strokeWidth="1"
          />

          {/* Budding botanical copper flower / blossom at apex */}
          <path 
            d="M 8 -6 C 6 -11 9 -16 12 -18 C 14 -15 15 -10 12 -6 Z" 
            fill="#C38A63" 
            stroke="#A86F49" 
            strokeWidth="1"
          />
          <circle cx="12" cy="-18" r="1.6" fill="#E8C99B" />
        </g>

        {/* ==============================================================
            9. DELICATE SUBTLE CAPTION INSIDE MARGIN
        ============================================================== */}
        <text 
          x="190" 
          y="272" 
          textAnchor="middle" 
          fontFamily="'Source Serif 4', Georgia, serif" 
          fontStyle="italic" 
          fontSize="11" 
          fill="#5F6C64" 
          letterSpacing="0.04em"
        >
          From index zero to what's next.
        </text>

      </svg>
    </div>
  );
};

export default MotivationIllustration;
