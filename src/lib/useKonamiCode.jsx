import { useEffect, useCallback } from 'react';

/**
 * useKonamiCode — detects Konami code (↑↑↓↓←→←→BA) and fires callback.
 * Respects prefers-reduced-motion (disables on that setting).
 * Ignores keystrokes in INPUT/TEXTAREA/SELECT/contentEditable.
 */
export const useKonamiCode = (onTrigger) => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;

    const handler = useCallback((e) => {
      // Skip if typing in an input or content-editable element
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT' || e.target.isContentEditable) {
        return;
      }

      if (e.key === sequence[idx]) {
        idx++;
        if (idx === sequence.length) {
          idx = 0;
          onTrigger();
        }
      } else {
        // Reset only if the key doesn't match the first expected key
        if (e.key !== sequence[0]) {
          idx = 0;
        } else {
          idx = 1;
        }
      }
    }, [onTrigger]);

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onTrigger]);
};

// Also export a ScrollReveal component for convenience
export const ScrollReveal = ({ children, ...props }) => {
  return children;
};