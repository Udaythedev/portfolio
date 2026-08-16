import React from 'react';
import { ScrollReveal } from '../lib/useScrollReveal.jsx';
import { SchematicLabel } from '../lib/SchematicLabel';
import { SpecSheetCard } from '../lib/SpecSheetCard';

const Bio = () => {
  const quickFacts = [
    { label: 'EDUCATION', value: 'B.Tech CSE, Srinath University (2024–2028)' },
    { label: 'FOCUS', value: 'Computer Vision · Generative AI' },
    { label: 'LEADERSHIP', value: 'Founder, SYNTAX (coding club)' },
    { label: 'LANGUAGES', value: 'Hindi, English, Bengali' },
  ];

  return (
    <section id="about" className="relative py-20">
      <div className="max-w-4xl mx-auto px-6">
        <SchematicLabel fig="01" title="ABOUT" />
        <p className="text-divider">===================</p>

        <ScrollReveal>
          <p className="text-paper text-base sm:text-lg leading-relaxed mb-12 max-w-2xl">
            Computer Science student at Srinath University, currently in my fifth semester
            and building towards machine learning engineering — computer vision and generative
            AI specifically. Outside coursework I ship small software tools, build games in
            Unity, model in Blender, and run a content pipeline for a horror-shorts channel
            end to end. I like finishing things and shipping them somewhere real rather than
            letting them sit as drafts.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickFacts.map((fact) => (
            <ScrollReveal key={fact.label}>
              <div className="spec-card p-4 relative pixel-corners">
                <span className="fig-label text-xs block mb-1">{fact.label}</span>
                <span className="text-sm text-[#1a1c23] font-medium">{fact.value}</span>
                <div className="pixel-br-tr" />
                <div className="pixel-br-bl" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bio;
