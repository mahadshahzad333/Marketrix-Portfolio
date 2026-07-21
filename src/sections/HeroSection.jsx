import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import CameraLogo3D from '../components/CameraLogo3D';

const NAV_LINKS = ['About', 'Price', 'Projects', 'Contact'];

export default function HeroSection() {
  return (
    <section
      className="min-h-screen flex flex-col relative"
      style={{ overflowX: 'clip', background: '#0C0C0C' }}
    >
      {/* ── Navbar ── */}
      <FadeIn delay={0} y={-20} as="nav">
        <nav className="flex justify-between items-center px-4 sm:px-6 md:px-10 pt-6 md:pt-8">
          {/* Left nav links */}
          <div className="flex gap-4 sm:gap-6 md:gap-10 lg:gap-14">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs sm:text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
                style={{ color: '#D7E2EA' }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right nav links */}
          <div className="flex gap-4 sm:gap-6 md:gap-10 lg:gap-14">
            {NAV_LINKS.slice(2).map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs sm:text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
                style={{ color: '#D7E2EA' }}
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* ── Hero Heading ── */}
      <FadeIn delay={0.15} y={40} className="overflow-hidden relative z-10">
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
        <FadeIn delay={0.35} y={20}>
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
        <FadeIn delay={0.5} y={0}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* ── Camera Logo 3D (absolutely centered) ── */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-20 top-[52%] sm:top-[50%] md:top-[48%] lg:top-[68%] -translate-y-1/2 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] xl:w-[440px]"
      >
        <CameraLogo3D size={440} />
      </FadeIn>
    </section>
  );
}
