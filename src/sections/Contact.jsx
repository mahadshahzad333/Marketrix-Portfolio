import React from 'react';
import { motion } from 'framer-motion';

// ─── Custom Vector Icons for Maximum Resolution (No extra packages needed) ───
const InstagramIcon = () => (
  <svg
    className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-400 group-hover:text-pink-500 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-400 group-hover:text-emerald-500 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Framer Motion Animation Variants (Cohesive with Pricing & Projects)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 100 },
  },
};

export default function Contact() {
  // Replace these placeholders with your actual accounts
  const instagramURL = 'https://instagram.com/marketrixstudio';
  const whatsappURL = 'https://wa.me/+923497669246'; // e.g., 'https://wa.me/923001234567'

  return (
    <section
      id="contact"
      className="relative z-10 px-4 sm:px-8 md:px-12 py-20 sm:py-28 md:py-36 overflow-hidden bg-[#0C0C0C] flex flex-col items-center w-full"
    >
      {/* Cinematic Ambient Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* ── Heading Block ── */}
      <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24 relative z-10 flex flex-col items-center w-full">
        <h2
          className="bg-gradient-to-b from-[#f80e0e] to-[#c00000] bg-clip-text text-transparent font-black uppercase leading-[1.1] tracking-tight text-center mb-4"
          style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
        >
          Let's Talk
        </h2>
        <p className="text-zinc-500 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase max-w-xl mx-auto text-center">
          Direct channels to launch your next cinematic campaign
        </p>
      </div>

      {/* ── Contact Channel Cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 relative z-10"
      >
        {/* Instagram Card */}
        <motion.a
          href={instagramURL}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="group relative flex flex-col items-center justify-center text-center p-8 sm:p-12 md:p-16 rounded-3xl bg-zinc-950/80 border border-white/5 shadow-2xl transition-all duration-300 hover:border-pink-500/40 hover:shadow-[0_0_40px_rgba(236,72,153,0.25)] cursor-pointer"
        >
          {/* Subtle Pink Spot Glow behind Icon on Hover */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-500/0 group-hover:bg-pink-500/10 blur-2xl rounded-full transition-all duration-300 pointer-events-none" />

          <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
            <InstagramIcon />
          </div>

          <h3 className="text-white text-lg sm:text-xl font-bold uppercase tracking-wider mb-2 transition-colors duration-300 group-hover:text-pink-500">
            Instagram
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm group-hover:text-zinc-400 transition-colors duration-300 font-medium">
            Browse our creative portfolio & shoot updates
          </p>
          <span className="mt-6 text-[10px] tracking-widest font-bold text-pink-500/70 uppercase border border-pink-500/20 px-4 py-1.5 rounded-full bg-pink-500/5 group-hover:bg-pink-500/10 group-hover:text-pink-400 transition-all duration-300">
            Follow Now
          </span>
        </motion.a>

        {/* WhatsApp Card */}
        <motion.a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="group relative flex flex-col items-center justify-center text-center p-8 sm:p-12 md:p-16 rounded-3xl bg-zinc-950/80 border border-white/5 shadow-2xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] cursor-pointer"
        >
          {/* Subtle Emerald Spot Glow behind Icon on Hover */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/0 group-hover:bg-emerald-500/10 blur-2xl rounded-full transition-all duration-300 pointer-events-none" />

          <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
            <WhatsAppIcon />
          </div>

          <h3 className="text-white text-lg sm:text-xl font-bold uppercase tracking-wider mb-2 transition-colors duration-300 group-hover:text-emerald-500">
            WhatsApp
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm group-hover:text-zinc-400 transition-colors duration-300 font-medium">
            Get an instant custom quote or chat about ideas
          </p>
          <span className="mt-6 text-[10px] tracking-widest font-bold text-emerald-500/70 uppercase border border-emerald-500/20 px-4 py-1.5 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all duration-300">
            Chat Direct
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}