import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * AnimatedText — word-by-word scroll-driven opacity animation.
 * Optimized to reduce motion scroll listener overhead while delivering
 * a smooth visual reveal.
 */
export default function AnimatedText({ text, className = '', style = {} }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={{ position: 'relative', ...style }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <WordSpan
            key={i}
            word={word}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </p>
  );
}

function WordSpan({ word, scrollYProgress, start, end }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block', marginRight: '0.25em' }}>
      <span style={{ visibility: 'hidden' }}>{word}</span>
      <motion.span
        style={{
          opacity,
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        {word}
      </motion.span>
    </span>
  );
}

