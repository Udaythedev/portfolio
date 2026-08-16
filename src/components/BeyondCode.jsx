import React from 'react';
import { ScrollReveal } from '../lib/useScrollReveal.jsx';
import { SchematicLabel } from '../lib/SchematicLabel';

const BeyondCode = () => {
  const contentItems = [
    {
      title: 'GloomScript',
      description: 'Horror YouTube Shorts channel (@gloomscripts) with a full FFmpeg + AI image-generation production pipeline, built and run end to end.',
      tech: ['FFmpeg', 'AI Image Gen', 'YouTube'],
      badge: '@gloomscripts',
    },
    {
      title: 'Viral Pop Preset',
      description: 'DaVinci Resolve color preset, sold on Gumroad.',
      tech: ['DaVinci Resolve'],
      link: { label: 'Gumroad', href: 'https://gumroad.com' },
    },
  ];

  const modelingPieces = ["Perfume Bottle", "Rubik's Cube", "Cartoon Robot", "Simple Car"];

  return (
    <section id="beyond" className="relative py-20">
      <div className="max-w-4xl mx-auto px-6">
        <SchematicLabel fig="05" title="BEYOND THE CODE" />
        <p className="text-divider">===================</p>

        <ScrollReveal className="space-y-3">
          {contentItems.map((item) => (
            <div key={item.title} className="border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3] p-5 relative pixel-corners">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-base font-bold text-[#1a1c23] uppercase tracking-tight">{item.title}</h3>
                  {item.badge && (
                    <span className="fig-label text-xs" style={{ color: '#c45b3e' }}>{item.badge}</span>
                  )}
                </div>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tech.map((t) => (
                    <span key={t} className="fig-label text-[9px]" style={{ color: '#c45b3e' }}>{t}</span>
                  ))}
                </div>
                {item.link && (
                  <a href={item.link.href} target="_blank" rel="noopener noreferrer"
                    className="mini-link text-[10px] mt-1">◆ {item.link.label}</a>
                )}
              </div>
              <div className="pixel-br-tr" />
              <div className="pixel-br-bl" />
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <div className="border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3] p-5 relative pixel-corners">
            <h4 className="fig-label text-xs uppercase mb-3" style={{ color: '#4a6274' }}>
              3D Modeling (Blender)
            </h4>
            <ul className="flex flex-wrap gap-3">
              {modelingPieces.map((piece) => (
                <li key={piece} className="fig-label text-xs" style={{ color: '#c45b3e' }}>{piece}</li>
              ))}
            </ul>
            <div className="pixel-br-tr" />
            <div className="pixel-br-bl" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BeyondCode;
