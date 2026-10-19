import React from 'react';

/**
 * ZeroIndexMark: The official ZeroIndex brand emblem.
 * Concept: "One origin. Many directions. Continuous growth."
 * Symmetrical organic-botanical crest featuring:
 * - A central origin node [0] with warm copper seed catalyst
 * - Graceful upward growth stem
 * - Five balanced radiating branches/leaves
 * - Forest green (#285C49), supporting sage (#8EA89D), and warm copper (#C38A63)
 */
export const ZeroIndexMark = ({ className = "w-7 h-7", size = 28 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Refined editorial paper seal */}
      <rect 
        x="1.5" 
        y="1.5" 
        width="29" 
        height="29" 
        rx="7.5" 
        fill="#FFFFFF" 
        stroke="#DDE2DA" 
        strokeWidth="1.2"
      />

      {/* ==============================================================
          THE FIVE BRANCHING GROWTH PATHWAYS (Radiating from Origin)
      ============================================================== */}
      
      {/* Pathway 1: Far Left Branch & Leaf (The Workbench) */}
      <path 
        d="M 14.5 20.5 C 11.5 19 8.5 16 7.5 12.5" 
        stroke="#285C49" 
        strokeWidth="1.4" 
        strokeLinecap="round"
      />
      {/* Far-left leaf petal */}
      <path 
        d="M 7.5 12.5 C 6.5 10.5 7.5 8.5 9.5 9 C 9.5 11 8.5 12 7.5 12.5 Z" 
        fill="#DDEADD" 
        stroke="#285C49" 
        strokeWidth="1"
      />

      {/* Pathway 2: Mid-Left Upward Branch (The Atlas) */}
      <path 
        d="M 15 19 C 13.5 15.5 12 12 11.5 7.5" 
        stroke="#285C49" 
        strokeWidth="1.4" 
        strokeLinecap="round"
      />
      {/* Mid-left leaf petal */}
      <path 
        d="M 11.5 7.5 C 10 5.5 11.5 4 13 5 C 13 6.8 12.2 7.2 11.5 7.5 Z" 
        fill="#8EA89D" 
        stroke="#285C49" 
        strokeWidth="1"
      />

      {/* Pathway 3: Central Spire & Growth Crown (The Bridge) */}
      {/* Main central upward growth stem */}
      <path 
        d="M 16 19.5 L 16 6" 
        stroke="#285C49" 
        strokeWidth="1.6" 
        strokeLinecap="round"
      />
      {/* Central apex leaf crown */}
      <path 
        d="M 16 4.5 C 14.8 6.5 15.5 8 16 8.5 C 16.5 8 17.2 6.5 16 4.5 Z" 
        fill="#285C49"
      />
      {/* Central warm copper seed catalyst pip */}
      <circle cx="16" cy="3.5" r="1.3" fill="#C38A63" />

      {/* Pathway 4: Mid-Right Upward Branch (The Readout) */}
      <path 
        d="M 17 19 C 18.5 15.5 20 12 20.5 7.5" 
        stroke="#285C49" 
        strokeWidth="1.4" 
        strokeLinecap="round"
      />
      {/* Mid-right leaf petal */}
      <path 
        d="M 20.5 7.5 C 22 5.5 20.5 4 19 5 C 19 6.8 19.8 7.2 20.5 7.5 Z" 
        fill="#8EA89D" 
        stroke="#285C49" 
        strokeWidth="1"
      />

      {/* Pathway 5: Far Right Branch & Leaf (The Folio) */}
      <path 
        d="M 17.5 20.5 C 20.5 19 23.5 16 24.5 12.5" 
        stroke="#285C49" 
        strokeWidth="1.4" 
        strokeLinecap="round"
      />
      {/* Far-right leaf petal */}
      <path 
        d="M 24.5 12.5 C 25.5 10.5 24.5 8.5 22.5 9 C 22.5 11 23.5 12 24.5 12.5 Z" 
        fill="#DDEADD" 
        stroke="#285C49" 
        strokeWidth="1"
      />

      {/* ==============================================================
          THE ORIGIN NODE [0] (Base Root Anchor)
      ============================================================== */}
      {/* Lower supporting root shelf */}
      <path 
        d="M 12 25.5 Q 16 26.5 20 25.5" 
        stroke="#285C49" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        opacity="0.8"
      />

      {/* Symmetrical Origin Ring: Index Zero "0" */}
      <ellipse 
        cx="16" 
        cy="22.5" 
        rx="3.6" 
        ry="4.2" 
        fill="#FFFFFF" 
        stroke="#285C49" 
        strokeWidth="1.6"
      />

      {/* Inner Origin Spark Seed */}
      <circle cx="16" cy="22.5" r="1.3" fill="#C38A63" />
    </svg>
  );
};

export default ZeroIndexMark;
