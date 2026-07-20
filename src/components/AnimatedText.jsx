import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * AnimatedText — character-by-character scroll-driven opacity animation.
 * Each character transitions from opacity 0.2 → 1 based on scroll progress.
 */
export default function AnimatedText({ text, className = '', style = {} }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <p ref={ref} className={className} style={{ position: 'relative', ...style }}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = (i + 1) / chars.length;
        return (
          <CharSpan
            key={i}
            char={char}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </p>
  );
}

function CharSpan({ char, scrollYProgress, start, end }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* invisible placeholder to maintain layout */}
      <span style={{ visibility: 'hidden' }}>{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        style={{
          opacity,
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
}
