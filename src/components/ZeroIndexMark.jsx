import React from 'react';

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
      {/* Refined tile container */}
      <rect 
        x="1" 
        y="1" 
        width="30" 
        height="30" 
        rx="7" 
        fill="#FFFFFF" 
        stroke="#DDE2DA" 
        strokeWidth="1.2"
      />
      
      {/* 5 Knowledge Tree Pathway Stems radiating from [0] */}
      {/* Pathway 01: Top-Left (The Workbench) */}
      <path 
        d="M 12 11 L 8 7" 
        stroke="#285C49" 
        strokeWidth="1.3" 
        strokeLinecap="round" 
        opacity="0.75"
      />
      <circle cx="7.5" cy="6.5" r="1.2" fill="#285C49" />

      {/* Pathway 02: Mid-Left (The Atlas) */}
      <path 
        d="M 14 9 L 12 5" 
        stroke="#285C49" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        opacity="0.7"
      />
      <circle cx="11.5" cy="4.5" r="1.1" fill="#496D91" />

      {/* Pathway 03: Center Trunk (The Bridge) */}
      <path 
        d="M 16 9 L 16 3.5" 
        stroke="#285C49" 
        strokeWidth="1.4" 
        strokeLinecap="round" 
        opacity="0.85"
      />
      <circle cx="16" cy="3.5" r="1.2" fill="#C38A63" />

      {/* Pathway 04: Mid-Right (The Readout) */}
      <path 
        d="M 18 9 L 20 5" 
        stroke="#285C49" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        opacity="0.7"
      />
      <circle cx="20.5" cy="4.5" r="1.1" fill="#765C90" />

      {/* Pathway 05: Top-Right (The Folio) */}
      <path 
        d="M 20 11 L 24 7" 
        stroke="#285C49" 
        strokeWidth="1.3" 
        strokeLinecap="round" 
        opacity="0.75"
      />
      <circle cx="24.5" cy="6.5" r="1.2" fill="#935F5D" />

      {/* Central Origin Node: Minimalist geometric zero [0] */}
      <rect 
        x="11.5" 
        y="10.5" 
        width="9" 
        height="13" 
        rx="4.5" 
        fill="#FFFFFF" 
        stroke="#285C49" 
        strokeWidth="1.8"
      />

      {/* Fine inner root anchor dot */}
      <circle cx="16" cy="17" r="1.2" fill="#285C49" opacity="0.8" />
    </svg>
  );
};

export default ZeroIndexMark;
