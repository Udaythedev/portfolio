import React from 'react';

/**
 * SchematicLabel — Minimalist brutalist-style section header.
 * Just "FIG. 02 — TITLE" in mono, no ornamental crosshair.
 *
 * @param {string} fig  — Figure number, e.g. "02"
 * @param {string} title — Section title
 * @param {string} [className] — optional extra classes
 */
export const SchematicLabel = ({ fig, title, className = '' }) => {
  return (
    <div
      className={`fig-label mb-6 ${className}`}
      style={{ color: '#4a6274' }}
    >
      FIG. {fig} — {title}
    </div>
  );
};
