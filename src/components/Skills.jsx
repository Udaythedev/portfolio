import React from 'react';
import { ScrollReveal } from '../lib/useScrollReveal.jsx';
import { SchematicLabel } from '../lib/SchematicLabel';
import { skillGroups } from '../data/skills';

/**
 * RPG-style skill tag — looks like a game stat meter with a terracotta fill bar.
 */
const SkillTag = ({ name, level }) => {
  return (
    <span className="skill-rpg-bar" style={{ '--fill': `${level ?? 60}%` }}>
      {name}
    </span>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-20">
      <div className="max-w-4xl mx-auto px-6">
        <SchematicLabel fig="02" title="SKILLS" />
        <p className="text-divider">===================</p>

        <ScrollReveal className="space-y-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="border border-[rgba(74,98,116,0.3)] bg-[#e4dfd3]/90 p-4 relative pixel-corners">
              <span className="fig-label text-xs uppercase font-semibold mb-2 block" style={{ color: '#4a6274' }}>
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillTag key={item} name={item} level={group.level} />
                ))}
              </div>
              <div className="pixel-br-tr" />
              <div className="pixel-br-bl" />
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Skills;
