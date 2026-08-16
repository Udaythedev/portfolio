import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll progress
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

  // Desktop nav links
  const sectionLinks = [
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'achievements', label: 'ACHIEVE' },
    { id: 'beyond', label: 'BEYOND' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const navigateToSection = (id) => {
    navigate('/');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
    setMobileOpen(false);
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
          <NavLink
            to="/"
            className="font-display font-bold text-sm hover:text-[#c45b3e] transition-colors focus:none"
            style={{ color: '#e4dfd3', letterSpacing: '0.1em', textDecoration: 'none' }}
          >
            UDAY MAHATO
          </NavLink>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-5">
            {sectionLinks.map((sec) => (
              <button
                key={sec.id}
                onClick={() => navigateToSection(sec.id)}
                className="font-mono text-xs uppercase tracking-widest transition-colors focus:none"
                style={{
                  color: '#6b7a8d',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  paddingBottom: 2,
                }}
              >
                {sec.label}
              </button>
            ))}
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-widest transition-colors focus:none ${isActive ? 'text-[#c45b3e]' : 'text-[#6b7a8d]'}`
              }
              style={{
                textDecoration: 'none',
                borderBottom: '1px solid transparent',
                paddingBottom: 2,
              }}
            >
              WRITES
            </NavLink>
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
              {sectionLinks.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => navigateToSection(sec.id)}
                  className="font-mono text-xs uppercase tracking-widest text-left py-1 focus:none"
                  style={{ color: '#6b7a8d', borderBottom: '1px solid rgba(74,98,116,0.15)', paddingBottom: 3 }}
                >
                  {sec.label}
                </button>
              ))}
              <NavLink
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `font-mono text-xs uppercase tracking-widest text-left py-1 focus:none ${isActive ? 'text-[#c45b3e]' : 'text-[#6b7a8d]'}`
                }
                style={{ borderBottom: '1px solid rgba(74,98,116,0.15)', paddingBottom: 3, textDecoration: 'none' }}
              >
                WRITES
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
