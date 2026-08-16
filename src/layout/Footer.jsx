import React from 'react';
import { SchematicLabel } from '../lib/SchematicLabel';

const Footer = () => {
  const links = [
    { label: 'GitHub', href: 'https://github.com/Udaythedev' },
    { label: 'GitHub (Games)', href: 'https://github.com/gamesofuday' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/udaymahato' },
    { label: 'YouTube', href: 'https://www.youtube.com/@gloomscripts' },
  ];

  return (
    <footer id="contact" className="relative py-20">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-divider mb-8">===================</p>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <SchematicLabel fig="06" title="CONTACT" />

        <div className="mt-10 space-y-8">
          {/* Email — prominent */}
          <div>
            <p className="fig-label text-xs uppercase mb-2" style={{ color: '#4a6274' }}>Email</p>
            <a href="mailto:hello@udays.space"
              className="block text-lg sm:text-xl font-mono font-medium hover:text-[#c45b3e] transition-colors"
              style={{ color: '#e4dfd3', textDecoration: 'none', borderBottom: '2px solid #c45b3e', paddingBottom: 2 }}>
              hello@udays.space
            </a>
          </div>

          {/* Handles */}
          <div>
            <p className="fig-label text-xs uppercase mb-3" style={{ color: '#4a6274' }}>Handles</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-sm hover:text-[#c45b3e] transition-colors group"
                  style={{ color: '#9ba4b5', textDecoration: 'none', position: 'relative' }}>
                  <span className="opacity-60 group-hover:opacity-100 mr-1">&#8599;</span>
                  <span className="group-hover:text-[#c45b3e] transition-colors">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#6b7a8d] pt-2 font-mono">
            Based in Jamshedpur, IST. Open to internship conversations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
