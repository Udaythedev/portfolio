import React, { useState, useEffect } from 'react';

const Nav = () => {
  const sections = [
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'achievements', label: 'ACHIEVE' },
    { id: 'beyond', label: 'BEYOND' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const [activeId, setActiveId] = useState('hero');
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollHeight > h.clientHeight
        ? (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
        : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );
    for (const id of ['hero', ...sections.map((s) => s.id)]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Thin scroll progress line */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <nav
        className="fixed top-0 left-0 right-0 z-30"
        style={{
          backgroundColor: 'rgba(10, 12, 16, 0.88)',
          backdropFilter: 'blur(4px)',
          borderBottom: '1px solid rgba(74, 98, 116, 0.2)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="font-display font-bold text-sm hover:text-[#c45b3e] transition-colors focus:none"
            style={{ color: '#e4dfd3', letterSpacing: '0.1em' }}
          >
            UDAY MAHATO
          </button>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-5">
            {sections.map((sec) => {
              const isActive = activeId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleNavClick(sec.id)}
                  className="font-mono text-xs uppercase tracking-widest transition-colors focus:none"
                  style={{
                    color: isActive ? '#c45b3e' : '#6b7a8d',
                    textDecoration: 'none',
                    borderBottom: isActive ? '1px solid #c45b3e' : '1px solid transparent',
                    paddingBottom: 2,
                  }}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col gap-1.5 p-1 focus:none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span
              className="block w-4 h-px transition-all duration-200"
              style={{ backgroundColor: mobileOpen ? '#c45b3e' : '#6b7a8d', width: mobileOpen ? '16px' : '14px' }}
            />
            <span
              className="block w-4 h-px transition-all duration-200"
              style={{ backgroundColor: mobileOpen ? '#c45b3e' : '#6b7a8d', opacity: mobileOpen ? 0 : 1 }}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="sm:hidden"
            style={{
              backgroundColor: 'rgba(10, 12, 16, 0.95)',
              borderTop: '1px solid rgba(74, 98, 116, 0.2)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {sections.map((sec) => {
                const isActive = activeId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleNavClick(sec.id)}
                    className="font-mono text-xs uppercase tracking-widest text-left py-1 focus:none"
                    style={{
                      color: isActive ? '#c45b3e' : '#6b7a8d',
                      borderBottom: `1px solid ${isActive ? '#c45b3e' : 'rgba(74,98,116,0.15)'}`,
                      paddingBottom: 3,
                    }}
                  >
                    {sec.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
