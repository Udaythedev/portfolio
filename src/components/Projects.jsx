import React from 'react';
import { ScrollReveal } from '../lib/useScrollReveal.jsx';
import { SchematicLabel } from '../lib/SchematicLabel';
import { projects } from '../data/projects';

const ProjectCard = ({ project }) => {
  const { title, description, tech, links } = project;
  return (
    <div className="project-card p-5 relative pixel-corners">
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-base font-bold text-[#1a1c23] uppercase tracking-tight">{title}</h3>
        <div className="flex flex-wrap gap-1">
          {tech.map((tag) => (
            <span key={tag} className="fig-label text-[9px]" style={{ color: '#c45b3e' }}>{tag}</span>
          ))}
        </div>
        <p className="text-xs text-[#6b6b6b] leading-relaxed">{description}</p>
        <div className="flex gap-4 mt-1">
          {links.live && (
            <a href={links.live} target="_blank" rel="noopener noreferrer"
              className="mini-link text-[10px]">◆ Live</a>
          )}
          {links.repo && (
            <a href={links.repo} target="_blank" rel="noopener noreferrer"
              className="mini-link text-[10px]">◆ Repo</a>
          )}
        </div>
      </div>
      <div className="pixel-br-tr" />
      <div className="pixel-br-bl" />
    </div>
  );
};

const ProjectCluster = ({ cluster, figPrefix }) => {
  return (
    <div className="mb-12">
      <div className="flex items-baseline gap-4 mb-4 flex-wrap">
        <SchematicLabel fig={figPrefix} title={cluster.title} />
        {cluster.subtitle && (
          <span
            className="fig-label text-xs ml-auto sm:ml-0"
            style={{ color: '#c45b3e', letterSpacing: '0.1em' }}
          >
            {cluster.subtitle}
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cluster.items.map((project, i) => (
          <ScrollReveal key={`${cluster.title}-${i}`} delay={i * 0.05}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-20">
      <div className="max-w-5xl mx-auto px-6">
        <SchematicLabel fig="03" title="PROJECTS" />
        <p className="text-divider">===================</p>
        {Object.values(projects).map((cluster) => (
          <ProjectCluster key={cluster.id} cluster={cluster} figPrefix={`03.${cluster.id.split('-')[1]}`} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
