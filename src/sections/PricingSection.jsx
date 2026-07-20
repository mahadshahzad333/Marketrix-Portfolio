import React from 'react';
import { motion } from 'framer-motion';

const PACKAGES = [
  {
    name: 'Starter Growth',
    price: 'Rs.4,000',
    period: '/week',
    features: [
      '4 Graphic Posts / Week',
      '2 Cinematic Reels / Week',
      '1-2 Bonus Reels Every Month',
      'Weekly Performance Report',
      'Organic Growth Strategy',
    ],
    popular: false,
  },
  {
    name: 'Growth Pro',
    price: 'Rs.5,500', // Pricing updated to 5500
    period: '/week',
    features: [
      '6 Graphic Posts / Week',
      '3 Cinematic Reels / Week',
      '1 TikTok Ad Included',
      'Weekly Analytics Report',
      'Priority Support',
    ],
    popular: true,
  },
  {
    name: 'Elite Performance',
    price: 'Rs.7,500',
    period: '/week',
    features: [
      '8 Graphic Posts / Week',
      '5 Premium Reels / Week',
      '2 TikTok Ads Included',
      'Premium Content Planning',
      'Highest Priority Support',
    ],
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 100 },
  },
};

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 px-4 sm:px-8 md:px-12 py-24 sm:py-32 md:py-44 overflow-hidden bg-[#0C0C0C] flex flex-col items-center w-full"
    >
      {/* Background Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ── Heading ── */}
      <div className="max-w-4xl mx-auto text-center mb-20 sm:mb-32 relative z-10 flex flex-col items-center w-full">
        <h2
          className="hero-heading font-black uppercase leading-[1.1] tracking-tight text-center mb-6"
          style={{ fontSize: 'clamp(3rem, 10vw, 130px)' }}
        >
          Our Packages
        </h2>
        {/* <p className="text-zinc-500 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase max-w-xl mx-auto text-center pb-4">
          Choose the speed of your brand growth with our structured plans
        </p> */}
      </div>

      {/* ── Cards Grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative z-10 items-stretch"
      >
        {PACKAGES.map((pkg) => {
          const handleChoose = () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          };

          return (
            <motion.div
              key={pkg.name}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`relative flex flex-col justify-between rounded-3xl pt-20 pb-8 px-8 sm:pt-24 sm:pb-10 sm:px-10 backdrop-blur-md border transition-all duration-300 min-h-[580px] ${
                pkg.popular
                  ? 'bg-[#150404]/90 border-red-600 shadow-[0_0_35px_rgba(220,38,38,0.2)] hover:shadow-[0_0_50px_rgba(220,38,38,0.35)]'
                  : 'bg-zinc-900/60 border-white/10 shadow-2xl hover:border-red-600/30'
              }`}
            >
              {pkg.popular && (
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black text-[11px] tracking-widest uppercase px-5 py-2 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.6)] whitespace-nowrap z-20 border border-white/20"
                >
                  🔥 Best Value
                </motion.div>
              )}

              {/* Centered Content Group */}
              <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
                <p className="text-red-500 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">
                  {pkg.name}
                </p>
                
                <div className="flex items-baseline justify-center mb-10">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                    {pkg.price}
                  </span>
                  <span className="text-zinc-500 text-xs font-semibold tracking-wider uppercase ml-2">
                    {pkg.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-5 sm:gap-6 md:gap-7 mb-6 items-center w-full">
                  {pkg.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-center text-zinc-300 py-1.5"
                    >
                      <svg
                        className="w-4 h-4 text-red-500 mr-3 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[12px] sm:text-xs md:text-sm font-medium tracking-wide">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Redesigned Button using pure Tailwind and conditional gradients */}
              <button
                onClick={handleChoose}
                className={`w-full py-3.5 sm:py-4 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer shrink-0 mt-8 ${
                  pkg.popular
                    ? 'text-white bg-gradient-to-br from-[#c00000] to-[#800000] border border-transparent hover:shadow-[0_8px_24px_rgba(192,0,0,0.45)]'
                    : 'text-zinc-300 border border-white/10 hover:border-red-600 hover:bg-red-600/10 hover:text-white bg-transparent'
                }`}
              >
                Choose Package
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}