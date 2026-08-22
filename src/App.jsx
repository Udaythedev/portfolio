import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import SchematicHero from './components/SchematicHero';
import Bio from './components/Bio';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import BeyondCode from './components/BeyondCode';
import BlogList from './pages/blog/index';
import BlogPost from './pages/blog/[slug]';
import Admin from './pages/admin';
import { DevModeToast } from './lib/Toasts';
import { useKonamiCode } from './lib/useKonamiCode';

/**
 * Home — default portfolio view.
 */
const Home = () => (
  <>
    <SchematicHero />
    <Bio />
    <Skills />
    <Projects />
    <Achievements />
    <BeyondCode />
  </>
);

/**
 * App — Root component with client-side routing for blog + admin.
 */
function App() {
  const [devMode, setDevMode] = useState(false);

  const konamiCallback = useCallback(() => {
    setDevMode(true);
    setTimeout(() => setDevMode(false), 3000);
  }, []);

  useKonamiCode(konamiCallback);

  return (
    <Router>
      <div className="min-h-screen bg-ink text-muted font-body relative overflow-x-hidden">
        <div className="crt-overlay" />
        <Nav />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={(
              <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-paper font-display text-xl uppercase">404 — Not Found</p>
                <Link to="/" className="mini-link">← Back to home</Link>
              </div>
            )} />
          </Routes>
        </main>

        <Footer />
        <DevModeToast show={devMode} />
      </div>
    </Router>
  );
}

export default App;
