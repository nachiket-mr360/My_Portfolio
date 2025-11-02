import { useTheme } from './hooks/useTheme';
import { useScrollProgress } from './hooks/useScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import React, { Suspense } from 'react';
const AnimatedBackground = React.lazy(() => import('./components/AnimatedBackground'));
import AnimatedSection from './components/AnimatedSection';
import ThemeToggle from './components/ThemeToggle';
import ScrollProgress from './components/ScrollProgress';
import ResumeButton from './components/ResumeButton';
import Chatbot from './components/Chatbot';
import NotFound from './components/NotFound';

function App() {
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();

  const is404 = window.location.pathname !== '/';

  if (is404) {
    return <NotFound />;
  }

  return (
  // make root relative so absolute background blobs position correctly inside
  <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <ScrollProgress progress={scrollProgress} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <ResumeButton />
      <Chatbot />

      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>
      <main className="relative z-10">
        <AnimatedSection className="bg-transparent">
          <Hero />
        </AnimatedSection>

        <AnimatedSection>
          <About />
        </AnimatedSection>

        <AnimatedSection>
          <Skills />
        </AnimatedSection>

        <AnimatedSection>
          <Projects />
        </AnimatedSection>

        <AnimatedSection>
          <Achievements />
        </AnimatedSection>

        <AnimatedSection>
          <Contact />
        </AnimatedSection>
      </main>

      <footer className="bg-gray-50 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Nachiket. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
