import React from 'react';
import { motion } from 'framer-motion';

/**
 * FadeIn — whileInView entrance animation wrapper.
 * Accepts delay, duration, x, y offset and renders any HTML element type.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
  style = {},
  ...props
}) {
  const MotionEl = motion[as] || motion.div;

  return (
    <MotionEl
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionEl>
  );
}
