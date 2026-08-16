import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SchematicLabel } from '../lib/SchematicLabel';
import { achievements } from '../data/achievements';
import { AchievementToast } from '../lib/Toasts';

/**
 * Achievements — vertical timeline with amber diamond markers + toast on reveal.
 */
const Achievements = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="achievements" className="relative py-20">
      {/* Invisible trigger element for toast */}
      <div ref={ref} style={{ position: 'absolute', top: 0, left: 0, width: 1 }} />
      <AchievementToast />

      <div className="max-w-4xl mx-auto px-6">
        <SchematicLabel fig="04" title="ACHIEVEMENTS" />
        <p className="text-divider">===================</p>

        <motion.ul
          className="ach-timeline"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {achievements.map((ach, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 pb-3"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <span className="mt-0.5 text-base flex-shrink-0">{ach.medal}</span>
              <span className="text-sm text-[#e4dfd3] leading-relaxed pt-0.5">{ach.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Achievements;
