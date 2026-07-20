import React from 'react';

/**
 * LiveProjectButton — ghost/outline pill button for project cards.
 */
export default function LiveProjectButton() {
  return (
    <button
      className="px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 cursor-pointer"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      Live Project
    </button>
  );
}
