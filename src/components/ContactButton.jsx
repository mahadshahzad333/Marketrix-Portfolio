import React from 'react';
import { motion } from 'framer-motion';

/**
 * ContactButton — gradient pill button with purple/magenta glow.
 */
export default function ContactButton() {
  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0px 8px 25px rgba(220, 38, 38, 0.55), inset 4px 4px 12px #C00000',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{
        background: 'linear-gradient(135deg, #1A0000 0%, #800000 45%, #C00000 85%, #E62E2E 100%)',
        boxShadow: '0px 4px 15px rgba(192, 0, 0, 0.3), inset 4px 4px 12px #990909',
        outline: '2px solid white',
        outlineOffset: '-3px',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "'Kanit', sans-serif",
      }}
      className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-all duration-300"
    >
      Contact Me
    </motion.button>
  );
}
