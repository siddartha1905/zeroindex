import React from 'react';

/**
 * ZeroIndexMark: The official ZeroIndex brand emblem.
 * Symmetrical organic-botanical crest featuring a recognizable zero at the base
 * and elegant upward botanical branches in forest green and sage.
 * Integrates the exact approved brand logo asset (/zeroindex-brand-logo.png).
 */
export const ZeroIndexMark = ({ className = "w-7 h-7", size = 28, alt = "ZeroIndex Brand Emblem" }) => {
  return (
    <img
      src="/zeroindex-brand-logo.png"
      alt={alt}
      width={size}
      height={size}
      className={`${className} object-contain select-none`}
      loading="eager"
    />
  );
};

export default ZeroIndexMark;
