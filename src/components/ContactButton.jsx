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
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white rounded-full bg-[linear-gradient(135deg,_#1A0000_0%,_#800000_45%,_#C00000_85%,_#E62E2E_100%)] shadow-[0px_4px_15px_rgba(192,0,0,0.3),_inset_4px_4px_12px_#990909] hover:shadow-[0px_8px_25px_rgba(220,38,38,0.55),_inset_4px_4px_12px_#C00000] outline-2 outline-white -outline-offset-3 border-none cursor-pointer transition-all duration-300 font-sans"
    >
      Contact Me
    </motion.button>
  );
}
