import React from 'react';
import { motion } from 'framer-motion';

/**
 * FadeIn — animation wrapper.
 * Can trigger either directly on state change (e.g. after loading) or whileInView (on scroll).
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
  trigger = true,
  whileInView = true,
  ...props
}) {
  const MotionEl = motion[as] || motion.div;

  const animationProps = whileInView
    ? {
        initial: { opacity: 0, x, y },
        whileInView: trigger ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y },
        viewport: { once: true, margin: '50px', amount: 0 }
      }
    : {
        initial: { opacity: 0, x, y },
        animate: trigger ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }
      };

  return (
    <MotionEl
      {...animationProps}
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
