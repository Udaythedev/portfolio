import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  const [devMode, setDevMode] = React.useState(false);

  useKonamiCode(() => {
    setDevMode(true);
    setTimeout(() => setDevMode(false), 3000);
  });

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ink text-muted font-body relative overflow-x-hidden">
        <div className="crt-overlay" />
        <Nav />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
        <DevModeToast show={devMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;
