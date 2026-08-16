import React from 'react';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import SchematicHero from './components/SchematicHero';
import Bio from './components/Bio';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import BeyondCode from './components/BeyondCode';
import { DevModeToast } from './lib/Toasts';
import { useKonamiCode } from './lib/useKonamiCode';

/**
 * App — Root component for the portfolio single-page site.
 */
function App() {
  const [devMode, setDevMode] = React.useState(false);

  useKonamiCode(() => {
    setDevMode(true);
    setTimeout(() => setDevMode(false), 3000);
  });

  return (
    <div className="min-h-screen bg-ink text-muted font-body relative overflow-x-hidden">
      <div className="crt-overlay" />
      <Nav />

      <main className="relative z-10">
        <SchematicHero />
        <Bio />
        <Skills />
        <Projects />
        <Achievements />
        <BeyondCode />
      </main>

      <Footer />
      <DevModeToast show={devMode} />
    </div>
  );
}

export default App;
