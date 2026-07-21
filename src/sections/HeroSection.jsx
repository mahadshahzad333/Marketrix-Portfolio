import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import CameraLogo3D from '../components/CameraLogo3D';

const NAV_LINKS = ['About', 'Services', 'Pricing', 'Projects', 'Contact'];

export default function HeroSection({ startAnimation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <section
      className="min-h-screen flex flex-col relative"
      style={{ overflowX: 'clip', background: '#0C0C0C' }}
    >
      {/* ── Responsive Navbar ── */}
      <FadeIn delay={0.1} y={-20} as="nav" trigger={startAnimation} whileInView={false} className="z-50 relative">
        <nav className="flex justify-between items-center px-5 sm:px-8 md:px-12 pt-6 md:pt-8 w-full">
          
          {/* Mobile Top Bar (Brand Logo + Hamburger Button) */}
          <div className="flex md:hidden justify-between items-center w-full">
            <a href="#" className="font-black text-xl tracking-widest uppercase bg-gradient-to-b from-[#f80e0e] to-[#c00000] bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(192,0,0,0.5)]">
              Marketrix
            </a>

            <button
              onClick={toggleMobileMenu}
              className="p-2.5 rounded-full bg-zinc-900/90 border border-white/10 text-white hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center shadow-lg"
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <div className="hidden md:flex gap-8 lg:gap-14 items-center">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-base lg:text-[1.3rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-all duration-200 hover:text-red-500 hover:scale-105"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop Right Nav Links */}
          <div className="hidden md:flex gap-8 lg:gap-14 items-center">
            {NAV_LINKS.slice(2).map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-base lg:text-[1.3rem] font-medium uppercase tracking-wider text-[#D7E2EA] transition-all duration-200 hover:text-red-500 hover:scale-105"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* ── Mobile Menu Glass Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[999] bg-[#0C0C0C]/98 backdrop-blur-2xl flex flex-col px-6 py-6"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex justify-between items-center w-full mb-12">
              <span className="font-black text-2xl tracking-widest uppercase bg-gradient-to-b from-[#f80e0e] to-[#c00000] bg-clip-text text-transparent">
                Marketrix
              </span>
              <button
                onClick={closeMobileMenu}
                className="p-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav Links List */}
            <div className="flex flex-col gap-6 my-auto items-center text-center">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
                  className="text-3xl sm:text-4xl font-extrabold uppercase tracking-widest text-[#D7E2EA] hover:text-red-500 transition-colors flex items-center gap-2 group"
                >
                  <span>{link}</span>
                  <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                </motion.a>
              ))}
            </div>

            {/* Bottom CTA inside Overlay */}
            <div className="mt-auto pt-8 flex justify-center border-t border-white/10 w-full">
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="w-full text-center py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold uppercase tracking-widest rounded-full shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Heading ── */}
      <FadeIn delay={0.3} y={40} className="overflow-hidden relative z-10" trigger={startAnimation} whileInView={false}>
        <h1
          className="font-black uppercase tracking-tight leading-[0.9] text-center w-full text-[12vw] sm:text-[14vw] md:text-[15vw] lg:text-[14vw] mt-12 sm:mt-10 md:mt-2 px-4"
          style={{ display: 'block', wordBreak: 'break-word' }}
        >
          <span className="bg-gradient-to-b from-[#f80e0e] to-[#c00000] bg-clip-text text-transparent">Hi, we&apos;re</span>
          <span className="text-red-600 block sm:inline"> marketrix</span>
        </h1>
      </FadeIn>

      {/* ── Bottom Bar ── */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto z-30">
        {/* Left paragraph */}
        <FadeIn delay={0.5} y={20} trigger={startAnimation} whileInView={false}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[140px] sm:max-w-[220px] md:max-w-[260px]"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(0.7rem, 1.4vw, 1.5rem)',
            }}
          >
            elevating brands through creative content
          </p>
        </FadeIn>

        {/* Right contact button */}
        <FadeIn delay={0.6} y={0} trigger={startAnimation} whileInView={false}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* ── Camera Logo 3D (absolutely centered) ── */}
      <FadeIn
        delay={0.8}
        y={30}
        trigger={startAnimation}
        whileInView={false}
        className="absolute left-1/2 -translate-x-1/2 z-20 top-[52%] sm:top-[50%] md:top-[48%] lg:top-[68%] -translate-y-1/2 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] xl:w-[440px]"
      >
        <CameraLogo3D size={440} />
      </FadeIn>
    </section>
  );
}

