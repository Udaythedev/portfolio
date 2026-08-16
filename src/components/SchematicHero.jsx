import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../lib/useScrollReveal';

const SchematicHero = () => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const accent = '#c45b3e';
  const struct = '#4a6274';

  const callouts = [
    { label: 'ML / CV', color: accent },
    { label: 'UNITY · C#', color: accent },
    { label: 'BLENDER 3D', color: accent },
    { label: 'ESP32 / IOT', color: accent },
    { label: 'HORROR SHORTS', color: accent },
  ];

  const svgW = 900, svgH = 320;
  const nameY = 148, nameL = 200, nameR = 700;

  const leaderOrigins = [
    { x: nameL,         y: nameY - 6 },
    { x: nameL + 160,   y: nameY - 16 },
    { x: nameL + 300,   y: nameY + 10 },
    { x: nameR - 160,   y: nameY - 6 },
    { x: nameR,         y: nameY + 12 },
  ];

  const leaderTargets = [
    { x: 60,  y: 55  },
    { x: 840, y: 45  },
    { x: 800, y: 250 },
    { x: 60,  y: 260 },
    { x: 450, y: 300 },
  ];

  const leaderVariants = {
    hidden: { strokeDashoffset: 1000, opacity: 0 },
    visible: (i) => ({
      strokeDashoffset: 0, opacity: 1,
      transition: { strokeDashoffset: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }, opacity: { duration: 0.25, delay: i * 0.12 } },
    }),
  };

  const labelVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.35, ease: 'easeOut', delay: i * 0.12 + 0.4 },
    }),
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center pt-16 pb-10">
      {/* Top line — thin */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(74,98,116,0.25), transparent)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 w-full">
        {/* SVG schematic — desktop */}
        <div className="hidden sm:block">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Left bracket */}
            <line x1={nameL - 20} y1={nameY - 36} x2={nameL - 20} y2={nameY + 56} stroke={struct} strokeWidth="0.8" strokeLinecap="round" />
            <line x1={nameL - 20} y1={nameY - 36} x2={nameL - 8} y2={nameY - 36} stroke={struct} strokeWidth="0.8" />
            <line x1={nameL - 20} y1={nameY + 56} x2={nameL - 8} y2={nameY + 56} stroke={struct} strokeWidth="0.8" />
            {/* Right bracket */}
            <line x1={nameR + 20} y1={nameY - 36} x2={nameR + 20} y2={nameY + 56} stroke={struct} strokeWidth="0.8" strokeLinecap="round" />
            <line x1={nameR + 20} y1={nameY - 36} x2={nameR + 8} y2={nameY - 36} stroke={struct} strokeWidth="0.8" />
            <line x1={nameR + 20} y1={nameY + 56} x2={nameR + 8} y2={nameY + 56} stroke={struct} strokeWidth="0.8" />

            {/* Leader lines */}
            {callouts.map((c, i) => {
              const ox = leaderOrigins[i].x, oy = leaderOrigins[i].y;
              const tx = leaderTargets[i].x, ty = leaderTargets[i].y;
              const midY = oy - 28;
              const d = `M ${ox} ${oy} L ${ox} ${midY} L ${tx} ${midY} L ${tx} ${ty - 10}`;
              const len = Math.abs(oy - midY) + Math.abs(ox - tx) + Math.abs(midY - (ty - 10));
              const labelW = c.label.length * 5.5 + 14;
              const lx = tx - labelW / 2;

              return (
                <g key={`leader-${i}`}>
                  {!prefersReduced ? (
                    <motion.path d={d} stroke={c.color} strokeWidth="0.8" strokeLinecap="round"
                      variants={leaderVariants} initial="hidden" animate="visible" custom={i}
                      style={{ strokeDasharray: len, strokeDashoffset: prefersReduced ? 0 : len }} />
                  ) : (
                    <path d={d} stroke={c.color} strokeWidth="0.8" strokeLinecap="round" />
                  )}
                  <line x1={tx - 5} y1={ty - 10} x2={tx + 5} y2={ty - 10} stroke={c.color} strokeWidth="0.8" />
                  <circle cx={tx} cy={ty - 10} r="1.5" fill={c.color} />
                  {!prefersReduced ? (
                    <motion.foreignObject x={lx} y={ty} width={labelW} height={20}
                      variants={labelVariants} initial="hidden" animate="visible" custom={i}>
                      <span className="fig-label" style={{ fontSize: '8px', lineHeight: 'normal', color: c.color, fontWeight: 500, textAlign: 'center', userSelect: 'none' }}>
                        {c.label}
                      </span>
                    </motion.foreignObject>
                  ) : (
                    <foreignObject x={lx} y={ty} width={labelW} height={20}>
                      <span className="fig-label" style={{ fontSize: '8px', lineHeight: 'normal', color: c.color, fontWeight: 500, textAlign: 'center', userSelect: 'none' }}>
                        {c.label}
                      </span>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* Name — clean, large */}
            <text x={svgW / 2} y={nameY + 16} textAnchor="middle" dominantBaseline="middle"
              style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontSize: '56px', fontWeight: 700, letterSpacing: '-0.01em', fill: '#e4dfd3' }}>
              UDAY KUMAR MAHATO
            </text>

            {/* Dimension line under name */}
            <line x1={nameL} y1={nameY + 56} x2={nameR} y2={nameY + 56} stroke={struct} strokeWidth="0.8" />
            <line x1={nameL} y1={nameY + 56} x2={nameL} y2={nameY + 60} stroke={struct} strokeWidth="0.8" />
            <line x1={nameR} y1={nameY + 56} x2={nameR} y2={nameY + 60} stroke={struct} strokeWidth="0.8" />
            <text x={(nameL + nameR) / 2} y={nameY + 76} textAnchor="middle" className="fig-label"
              style={{ fontSize: '9px', color: struct, userSelect: 'none' }}>
              NAME BLOCK
            </text>
          </svg>
        </div>

        {/* Mobile stacked */}
        <div className="sm:hidden text-center">
          <h1 className="font-display text-paper text-3xl font-black uppercase tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            UDAY MAHATO
          </h1>
          <div className="mt-3 flex flex-col gap-1 items-center">
            {callouts.map((c, i) => (
              <span key={i} className="fig-label text-xs uppercase" style={{ color: c.color, fontWeight: 500 }}>{c.label}</span>
            ))}
          </div>
        </div>

        {/* Subhead + CTAs */}
        <ScrollReveal className="mt-8 sm:mt-12 max-w-xl mx-auto text-center">
          <p className="fig-label text-xs uppercase mb-3" style={{ color: struct }}>
            B.Tech CSE · ML Engineering Track
          </p>
          <p className="text-paper text-base sm:text-lg leading-relaxed mb-6">
            I build across software, game engines, and AI tooling — then document the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#projects"
              className="inline-block px-5 py-2 font-mono text-xs uppercase tracking-widest
                         border border-[rgba(74,98,116,0.5)] text-[#e4dfd3] hover:border-[#c45b3e] hover:text-[#c45b3e]
                         transition-colors"
              style={{ borderRadius: 0 }}>
              View Projects
            </a>
            <a href="mailto:hello@udays.space"
              className="inline-block px-5 py-2 font-mono text-xs uppercase tracking-widest
                         border border-[rgba(74,98,116,0.5)] text-[#e4dfd3] hover:border-[#c45b3e] hover:text-[#c45b3e]
                         transition-colors"
              style={{ borderRadius: 0 }}>
              Get in Touch
            </a>
          </div>
          <p className="text-muted text-xs mt-4 font-mono">
            Jamshedpur, Jharkhand, India · Available for internships
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SchematicHero;
