import React, { useRef, useCallback } from 'react';

/**
 * Magnet – magnetic hover effect.
 * Cursor must be within `padding` px of the element edge to activate.
 */
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}) {
  const ref = useRef(null);
  const active = useRef(false);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const inZoneX = Math.abs(dx) < rect.width / 2 + padding;
    const inZoneY = Math.abs(dy) < rect.height / 2 + padding;

    if (inZoneX && inZoneY) {
      if (!active.current) {
        active.current = true;
        el.style.transition = activeTransition;
      }
      el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      el.style.willChange = 'transform';
    } else if (active.current) {
      active.current = false;
      el.style.transition = inactiveTransition;
      el.style.transform = 'translate3d(0, 0, 0)';
    }
  }, [padding, strength, activeTransition, inactiveTransition]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    active.current = false;
    el.style.transition = inactiveTransition;
    el.style.transform = 'translate3d(0, 0, 0)';
  }, [inactiveTransition]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
