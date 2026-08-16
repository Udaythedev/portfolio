import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * useScrollReveal — Framer Motion scroll-trigger hook
 * Simple fade + slide-up (200-300ms), respects prefers-reduced-motion.
 *
 * Usage:
 *   const ref = useRef(null);
 *   const { inView } = useScrollReveal(ref);
 *   ...
 *   <motion.div ref={ref} initial={...} animate={inView ? 'visible' : 'hidden'}>
 */
export const useScrollReveal = (ref, options = {}) => {
  const { once = true, amount = 0.2 } = options;
  const inView = useInView(ref, { once, amount });

  // Respect prefers-reduced-motion — if set, skip animation
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return { inView: prefersReduced ? true : inView };
};

/**
 * ScrollReveal — a pre-built motion component for scroll-triggered reveal.
 * Renders children inside a motion.div with fade-up animation.
 * Respects prefers-reduced-motion automatically.
 *
 * @param {React.ReactNode} children
 * @param {string} [className]
 * @param {object} [variants] — override Framer Motion variants (optional)
 */
export const ScrollReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const { inView } = useScrollReveal(ref);

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.25,
        ease: 'easeOut',
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
