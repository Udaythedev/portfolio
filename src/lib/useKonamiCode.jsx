import React, { useEffect } from 'react';

/**
 * useKonamiCode — detects Konami code (↑↑↓↓←→←→BA) and fires callback.
 * Respects prefers-reduced-motion (disables on that setting).
 */
export const useKonamiCode = (onTrigger) => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;

    const handler = (e) => {
      if (e.key === sequence[idx]) {
        idx++;
        if (idx === sequence.length) {
          idx = 0;
          onTrigger();
        }
      } else {
        idx = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onTrigger]);
};
