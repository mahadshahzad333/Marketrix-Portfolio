import React, { useRef, useEffect, useState } from 'react';

import vid1 from '../assets/videos/marquee_01.mp4';
import vid2 from '../assets/videos/marquee_02.mp4';
import vid3 from '../assets/videos/marquee_03.mp4';
import vid4 from '../assets/videos/marquee_04.mp4';
import vid5 from '../assets/videos/marquee_05.mp4';
import vid6 from '../assets/videos/marquee_06.mp4';
import vid7 from '../assets/videos/marquee_07.mp4';
import vid8 from '../assets/videos/marquee_08.mp4';
import vid9 from '../assets/videos/marquee_09.mp4';
import vid10 from '../assets/videos/marquee_10.mp4';
import vid11 from '../assets/videos/marquee_11.mp4';
import vid12 from '../assets/videos/marquee_12.mp4';
import vid13 from '../assets/videos/marquee_13.mp4';

const VIDEO_URLS = [vid1, vid2, vid3, vid4, vid5, vid6, vid7, vid8, vid9, vid10, vid11, vid12, vid13];

const ROW1 = VIDEO_URLS.slice(0, 7);
const ROW2 = VIDEO_URLS.slice(7);

const DOUBLE = (arr) => [...arr, ...arr];

export default function MarqueeSection() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let animId;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      animId = requestAnimationFrame(() => {
        const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        const rawOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        if (row1Ref.current) {
          row1Ref.current.style.transform = `translate3d(${rawOffset - 200}px, 0, 0)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.transform = `translate3d(${-(rawOffset - 200)}px, 0, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const row1Vids = isMobile ? ROW1 : DOUBLE(ROW1);
  const row2Vids = isMobile ? ROW2 : DOUBLE(ROW2);

  const videoClasses =
    'rounded-3xl object-cover flex-shrink-0 w-[180px] h-[320px] sm:w-[220px] sm:h-[390px] md:w-[260px] md:h-[460px] shadow-2xl shadow-black/50 border border-white/5';

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-20 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      {/* Row 1 — moves RIGHT */}
      <div
        ref={row1Ref}
        style={{
          willChange: 'transform',
          transition: 'none',
        }}
        className="flex gap-4 sm:gap-6 mb-4 sm:mb-6 mt-10"
      >
        {row1Vids.map((url, i) => (
          <video
            key={i}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={videoClasses}
          >
            <source src={url} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Row 2 — moves LEFT */}
      <div
        ref={row2Ref}
        style={{
          willChange: 'transform',
          transition: 'none',
        }}
        className="flex gap-4 sm:gap-6"
      >
        {row2Vids.map((url, i) => (
          <video
            key={i}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={videoClasses}
          >
            <source src={url} type="video/mp4" />
          </video>
        ))}
      </div>
    </section>
  );
}
