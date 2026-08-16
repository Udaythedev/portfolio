import React from 'react';

/**
 * SpecSheetCard — Minimalist blueprint-style card.
 * Paper background, blueprint border, no radius, no shadow.
 */
export const SpecSheetCard = ({ children, className = '' }) => {
  return (
    <div className={`spec-card ${className}`}>
      {children}
    </div>
  );
};

/**
 * DimensionDivider — Brutalist "=====" style divider
 * Lightweight, blueprint-tinted, centered.
 */
export const DimensionDivider = ({ className = '' }) => {
  return (
    <div className={`divider ${className}`}>
      ===================
    </div>
  );
};
