import React, { useRef, useEffect, useState } from 'react';

import vid1 from '../assets/videos/lv_0_20260615131844~2.mp4';
import vid2 from '../assets/videos/lv_0_20260615144322~2.mp4';
import vid3 from '../assets/videos/lv_0_20260623222042~2.mp4';
import vid4 from '../assets/videos/lv_0_20260623222042~3.mp4';
import vid5 from '../assets/videos/lv_0_20260713145953~2.mp4';
import vid6 from '../assets/videos/lv_0_20260713145953~3.mp4';
import vid7 from '../assets/videos/lv_0_20260715201211~3.mp4';
import vid8 from '../assets/videos/lv_0_20260717210324~2.mp4';
import vid9 from '../assets/videos/lv_0_20260713145953~4.mp4';
import vid10 from '../assets/videos/lv_0_20260615144322~3.mp4';
import vid11 from '../assets/videos/lv_0_20260622174902~2.mp4';
import vid12 from '../assets/videos/lv_0_20260621153131~2.mp4';
import vid13 from '../assets/videos/lv_0_20260621150457~2.mp4';

const VIDEO_URLS = [vid1, vid2, vid3, vid4, vid5, vid6, vid7, vid8, vid9, vid10, vid11, vid12, vid13];

const ROW1 = VIDEO_URLS.slice(0, 7);
const ROW2 = VIDEO_URLS.slice(7);

// Double each row for seamless infinite visual
const DOUBLE = (arr) => [...arr, ...arr];

export default function MarqueeSection() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(200);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const rawOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(rawOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialise
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Vids = DOUBLE(ROW1);
  const row2Vids = DOUBLE(ROW2);

  // Clean UI styling for portrait videos
  const videoClasses = "rounded-3xl object-cover flex-shrink-0 w-[180px] h-[320px] sm:w-[220px] sm:h-[390px] md:w-[260px] md:h-[460px] shadow-2xl shadow-black/50 border border-white/5 ";

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-20 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      {/* Row 1 — moves RIGHT */}
      <div
        style={{
          transform: `translateX(${offset - 200}px)`,
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
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
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
