import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const ABOUT_TEXT =
  "Marketrix Studio is a creative marketing agency dedicated to helping businesses establish a powerful digital presence through premium visual storytelling and strategic content marketing.From cinematic food photography to viral short-form videos, our team focuses on creating content that captures attention, increases engagement, and strengthens brand identity across all major social media platforms.We believe every business deserves premium-quality marketing without premium pricing. That's why our packages are designed for startups, growing businesses, and established brands alike.";
  
const MOON_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png';
const P59_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png';
const LEGO_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png';
const GROUP_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
      style={{ background: '#0C0C0C' }}
    >
      {/* ── Decorative corner 3D objects ── */}

      {/* Top-left: Moon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="hidden md:block absolute top-[4%] left-[4%] w-[150px] lg:w-[210px] pointer-events-none select-none"
      >
        <img src={MOON_URL} alt="Moon 3D icon" className="w-full h-auto" />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="hidden md:block absolute bottom-[8%] left-[10%] w-[120px] lg:w-[180px] pointer-events-none select-none"
      >
        <img src={P59_URL} alt="3D object" className="w-full h-auto" />
      </FadeIn>

      {/* Top-right: Lego */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="hidden md:block absolute top-[4%] right-[4%] w-[150px] lg:w-[210px] pointer-events-none select-none"
      >
        <img src={LEGO_URL} alt="Lego 3D icon" className="w-full h-auto" />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="hidden md:block absolute bottom-[8%] right-[10%] w-[150px] lg:w-[220px] pointer-events-none select-none"
      >
        <img src={GROUP_URL} alt="3D group" className="w-full h-auto" />
      </FadeIn>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-10 sm:gap-14 md:gap-16">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="bg-gradient-to-b from-[#f80e0e] to-[#c00000] bg-clip-text text-transparent font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About us
          </h2>
        </FadeIn>

        {/* Animated paragraph + button */}
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed max-w-[560px] text-center"
            style={{
              color: '#ead7d7ff',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            }}
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
