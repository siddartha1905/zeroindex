import React, { useState } from 'react';

export const ViitCrest = ({ className = "w-8 h-8", withText = false, textClassName = "" }) => {
  const [imgSrc, setImgSrc] = useState('/viit-logo.png');
  const [imgFailed, setImgFailed] = useState(false);

  const handleError = () => {
    if (imgSrc === '/viit-logo.png') {
      // Try official site fallback
      setImgSrc('https://vignaniit.edu.in/images/Vignan_logo.png');
    } else {
      setImgFailed(true);
    }
  };

  return (
    <div className="inline-flex items-center gap-2.5">
      <div className={`relative flex items-center justify-center rounded-lg bg-transparent flex-shrink-0 ${className}`}>
        {!imgFailed ? (
          <img
            src={imgSrc}
            alt="Vignan’s Institute of Information Technology (A)"
            onError={handleError}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-lg bg-gradient-to-br from-[#2E6F40] to-[#1E4D2B] text-white shadow-sm p-1">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 4L7 9V19C7 27 12 34 20 37C28 34 33 27 33 19V9L20 4Z" fill="#2E6F40" stroke="#FAF8F5" strokeWidth="1.8"/>
              <path d="M14 13L20 27L26 13" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20" cy="11" r="1.5" fill="#FEF3C7" stroke="none"/>
            </svg>
          </div>
        )}
      </div>

      {withText && (
        <div className={`flex flex-col leading-tight ${textClassName}`}>
          <span className="text-xs sm:text-sm font-bold tracking-tight text-[#1E293B]">
            Vignan’s Institute of Information Technology (A)
          </span>
          <span className="text-[10px] text-[#64748B] font-mono">
            Autonomous Institution · Visakhapatnam
          </span>
        </div>
      )}
    </div>
  );
};

export default ViitCrest;
