import React, { useRef, useEffect } from 'react';

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

import post1 from '../assets/videos/marquee_01.jpg';
import post2 from '../assets/videos/marquee_02.jpg';
import post3 from '../assets/videos/marquee_03.jpg';
import post4 from '../assets/videos/marquee_04.jpg';
import post5 from '../assets/videos/marquee_05.jpg';
import post6 from '../assets/videos/marquee_06.jpg';
import post7 from '../assets/videos/marquee_07.jpg';
import post8 from '../assets/videos/marquee_08.jpg';
import post9 from '../assets/videos/marquee_09.jpg';
import post10 from '../assets/videos/marquee_10.jpg';
import post11 from '../assets/videos/marquee_11.jpg';
import post12 from '../assets/videos/marquee_12.jpg';
import post13 from '../assets/videos/marquee_13.jpg';

const MARQUEE_ITEMS = [
  { video: vid1, poster: post1 },
  { video: vid2, poster: post2 },
  { video: vid3, poster: post3 },
  { video: vid4, poster: post4 },
  { video: vid5, poster: post5 },
  { video: vid6, poster: post6 },
  { video: vid7, poster: post7 },
  { video: vid8, poster: post8 },
  { video: vid9, poster: post9 },
  { video: vid10, poster: post10 },
  { video: vid11, poster: post11 },
  { video: vid12, poster: post12 },
  { video: vid13, poster: post13 },
];

const ROW1 = MARQUEE_ITEMS.slice(0, 7);
const ROW2 = MARQUEE_ITEMS.slice(7);

// ─── WebKit & Mobile Robust Autoplay Managed Video Item ───
function MarqueeVideoItem({ item, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict WebKit & mobile browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');

    const safePlay = () => {
      if (!video) return;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Retry on metadata ready or user interaction fallback
        });
      }
    };

    // Pre-trigger play on mount
    safePlay();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          safePlay();
        } else {
          video.pause();
        }
      },
      { rootMargin: '300px', threshold: 0.01 }
    );

    observer.observe(video);

    // Mobile touch interaction fallback listener to unblock restricted video autoplay
    const handleTouch = () => {
      safePlay();
      window.removeEventListener('touchstart', handleTouch);
    };
    window.addEventListener('touchstart', handleTouch, { passive: true, once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [item]);

  return (
    <video
      ref={videoRef}
      src={item.video}
      poster={item.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    />
  );
}

export default function MarqueeSection() {
  const videoClasses =
    'rounded-3xl object-cover flex-shrink-0 w-[180px] h-[320px] sm:w-[220px] sm:h-[390px] md:w-[260px] md:h-[460px] shadow-2xl shadow-black/50 border border-white/5 bg-zinc-900';

  return (
    <section
      className="pt-24 sm:pt-32 md:pt-40 pb-20 overflow-hidden relative"
      style={{ background: '#0C0C0C' }}
    >
      <style>{`
        @keyframes marquee-scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee-scroll-left 40s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee-scroll-right 40s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Row 1 — moves LEFT seamlessly */}
      <div className="overflow-hidden w-full mt-10 mb-4 sm:mb-6">
        <div className="animate-marquee-left gap-4 sm:gap-6 flex">
          {[...ROW1, ...ROW1].map((item, i) => (
            <MarqueeVideoItem
              key={`r1-${i}`}
              item={item}
              className={videoClasses}
            />
          ))}
        </div>
      </div>

      {/* Row 2 — moves RIGHT seamlessly */}
      <div className="overflow-hidden w-full">
        <div className="animate-marquee-right gap-4 sm:gap-6 flex">
          {[...ROW2, ...ROW2].map((item, i) => (
            <MarqueeVideoItem
              key={`r2-${i}`}
              item={item}
              className={videoClasses}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

