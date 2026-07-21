import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import PricingSection from './sections/PricingSection';
import Contact from './sections/Contact';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Add a small delay for a smoother visual transition
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timeout to guarantee entry if some resources are slow
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C]"
          >
            <motion.div
              animate={{ 
                scale: [0.92, 1.08, 0.92],
                opacity: [0.6, 1, 0.6] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.8, 
                ease: 'easeInOut' 
              }}
              className="flex flex-col items-center gap-4"
            >
              {/* Pulsing red logo text with deep drop shadow glow */}
              <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-widest bg-gradient-to-b from-[#f80e0e] to-[#c00000] bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(192,0,0,0.65)]">
                Marketrix
              </h1>
              <p className="text-zinc-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-light">
                Creating Impact...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ background: '#0C0C0C', overflowX: 'clip' }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <PricingSection />
        <Contact />
      </div>
    </>
  );
}
