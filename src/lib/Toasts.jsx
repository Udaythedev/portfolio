import React, { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

/**
 * AchievementToast — toast notification triggered when Achievements section enters view.
 */
const AchievementToast = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (inView && !dismissed) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(t);
    }
  }, [inView, dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <>
      <div ref={ref} style={{ position: 'absolute', top: -1, left: 0 }} />
      <div className={`ach-toast ${show ? 'show' : ''}`}>
        <span className="toast-medal">🏆</span>
        <span>Achievement Unlocked — Scroll to see them</span>
        <button onClick={handleDismiss} className="ml-2 hover:text-[#c45b3e] focus:none" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7a8d', fontFamily: 'monospace', fontSize: '0.6rem' }}>✕</button>
      </div>
    </>
  );
};

/**
 * DevModeToast — Konami code Easter egg toast.
 */
const DevModeToast = ({ show }) => (
  <div className={`dev-toast ${show ? 'show' : ''}`}>
    ⚡ Developer Mode Activated
    <div style={{ fontSize: '0.65rem', fontFamily: '"IBM Plex Mono", monospace', color: '#4a6274', marginTop: 0.5, letterSpacing: '0.1em' }}>
      YOU FOUND THE EASTER EGG
    </div>
  </div>
);

export { AchievementToast, DevModeToast };
