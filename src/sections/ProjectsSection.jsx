import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import FadeIn from '../components/FadeIn';

// ─── Dynamic Asset Imports ───
const graphicsImages = Object.values(
  import.meta.glob('../assets/projects/graphics/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true, import: 'default' })
);

const menuImages = Object.values(
  import.meta.glob('../assets/projects/menu/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true, import: 'default' })
);

const videoAssets = Object.values(
  import.meta.glob('../assets/projects/videography/*.{mp4,webm,MP4,WEBM}', { eager: true, import: 'default' })
);

const TABS = ['graphics', 'menu design', 'videography'];

// Helper to determine if a media item is a video
const isVideoAsset = (url) => {
  return url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('video') || url.includes('mp4') || url.includes('webm');
};

// ─── Custom Responsive Lightbox Modal (Handles Images & Videos) ───
function Lightbox({ mediaList, currentIndex, onClose, onPrev, onNext }) {
  const currentMedia = mediaList[currentIndex];
  const isVideo = isVideoAsset(currentMedia);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-10"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer z-50"
        >
          <X size={24} />
        </button>

        {/* Navigation Arrows */}
        {mediaList.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 sm:left-6 md:left-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer z-50"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 sm:right-6 md:right-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer z-50"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Media Wrapper */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="max-w-4xl max-h-[80vh] flex items-center justify-center relative"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <div className="relative max-h-[75vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
              <video
                ref={videoRef}
                src={currentMedia}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
              {/* Custom Video Controls inside Lightbox */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex gap-4 items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" className="ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={currentMedia}
              alt="Expanded showcase detail"
              className="max-w-full max-h-[75vh] rounded-xl object-contain shadow-2xl border border-white/10"
            />
          )}

          {/* Index Counter */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs sm:text-sm tracking-widest font-light uppercase">
            {currentIndex + 1} / {mediaList.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Play-on-Hover/Autoplay Portrait Video Card ───
function PortraitVideoCard({ url, onClick }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
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
    const video = videoRef.current;
    if (!video) return;

    // Enforce WebKit & Mobile browser autoplay requirements
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');

    const safePlay = () => {
      if (!video) return;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    };

    if (isMobile) {
      safePlay();
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            safePlay();
          } else {
            video.pause();
          }
        },
        { rootMargin: '200px', threshold: 0.01 }
      );
      observer.observe(video);
      return () => observer.disconnect();
    } else {
      if (isHovered) {
        safePlay();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isHovered, isMobile]);

  return (
    <div
      className="relative aspect-[9/16] w-[210px] sm:w-[260px] md:w-[300px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-xl group cursor-pointer snap-start transition-all duration-300 hover:border-red-600/50 hover:shadow-red-950/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={url}
        autoPlay={isMobile}
        preload="auto"
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:from-black/95">
        <div className="flex items-center justify-between text-white/95 w-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600/25 border border-red-500/40 text-red-500 flex items-center justify-center backdrop-blur-sm group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
              <Play size={12} fill="currentColor" className="ml-0.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold group-hover:text-red-400 transition-colors">Campaign</span>
              <span className="text-[11px] font-bold uppercase tracking-wider truncate max-w-[120px] sm:max-w-[150px]">Reel Showcase</span>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1.5 rounded-full bg-white/10 text-white border border-white/10">
            <Maximize2 size={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('graphics');

  // Carousel scroll references
  const graphicsScrollRef = useRef(null);
  const videoScrollRef = useRef(null);

  // Lightbox state
  const [lightbox, setLightbox] = useState({ isOpen: false, mediaList: [], currentIndex: 0 });

  const openLightbox = (mediaList, index) => {
    setLightbox({ isOpen: true, mediaList, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  const navigateLightbox = (direction) => {
    let nextIndex = lightbox.currentIndex + direction;
    if (nextIndex < 0) nextIndex = lightbox.mediaList.length - 1;
    if (nextIndex >= lightbox.mediaList.length) nextIndex = 0;
    setLightbox({ ...lightbox, currentIndex: nextIndex });
  };

  // Carousel navigation trigger helper
  const handleScroll = (ref, direction) => {
    if (!ref.current) return;
    const { scrollLeft, clientWidth } = ref.current;
    const scrollOffset = clientWidth * 0.75;
    ref.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollOffset : scrollLeft + scrollOffset,
      behavior: 'smooth'
    });
  };

  // ─── Graphics Subsection Carousel ───
  const renderGraphics = () => (
    <div className="w-full relative group/carousel pt-2 sm:pt-4">
      {/* Absolute Overlay Left Arrow */}
      <button
        onClick={() => handleScroll(graphicsScrollRef, 'left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/75 border border-white/10 hover:border-red-600/40 hover:bg-zinc-900/95 text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 z-20 cursor-pointer hidden sm:flex hover:scale-110 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.3)]"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Absolute Overlay Right Arrow */}
      <button
        onClick={() => handleScroll(graphicsScrollRef, 'right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/75 border border-white/10 hover:border-red-600/40 hover:bg-zinc-900/95 text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 z-20 cursor-pointer hidden sm:flex hover:scale-110 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.3)]"
      >
        <ChevronRight size={28} />
      </button>

      {/* Carousel Track container */}
      <div
        ref={graphicsScrollRef}
        className="flex flex-row overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 snap-x snap-mandatory no-scrollbar"
      >
        {graphicsImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative overflow-hidden rounded-2xl group cursor-pointer border border-white/10 shadow-lg snap-start"
            onClick={() => openLightbox(graphicsImages, i)}
          >
            <img
              src={src}
              alt={`Graphics work ${i + 1}`}
              className="h-[280px] sm:h-[360px] md:h-[450px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm bg-white/5">
                View Image
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-zinc-500 text-xs text-center mt-3 font-light tracking-wider uppercase select-none">
        ← Swipe or click side arrows to browse design works →
      </p>
    </div>
  );

  // ─── Menu Section Layout (Horizontal Grid) ───
  const renderMenus = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto pt-4 sm:pt-6">
      {menuImages.map((src, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-3xl group cursor-pointer border-2 border-white/5 shadow-2xl bg-zinc-950"
          onClick={() => openLightbox(menuImages, i)}
        >
          <img
            src={src}
            alt={`Menu template layout ${i + 1}`}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-xs uppercase tracking-widest border border-white/20 px-5 py-2.5 rounded-full backdrop-blur-sm bg-white/5">
              Zoom Menu
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // ─── Videography Subsection Carousel (Always Portrait Aspect Ratio) ───
  const renderVideography = () => {
    if (!videoAssets.length) {
      return (
        <div className="text-center py-10 text-zinc-500 uppercase tracking-widest text-xs">
          Loading Cinematic Assets...
        </div>
      );
    }

    return (
      <div className="w-full relative group/carousel pt-2 sm:pt-4">
        {/* Absolute Overlay Left Arrow */}
        <button
          onClick={() => handleScroll(videoScrollRef, 'left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/75 border border-white/10 hover:border-red-600/40 hover:bg-zinc-900/95 text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 z-20 cursor-pointer hidden sm:flex hover:scale-110 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.3)]"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Absolute Overlay Right Arrow */}
        <button
          onClick={() => handleScroll(videoScrollRef, 'right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/75 border border-white/10 hover:border-red-600/40 hover:bg-zinc-900/95 text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 z-20 cursor-pointer hidden sm:flex hover:scale-110 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.3)]"
        >
          <ChevronRight size={28} />
        </button>

        {/* Carousel Track container */}
        <div
          ref={videoScrollRef}
          className="flex flex-row overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 snap-x snap-mandatory no-scrollbar"
        >
          {videoAssets.map((url, i) => (
            <PortraitVideoCard
              key={i}
              url={url}
              onClick={() => openLightbox(videoAssets, i)}
            />
          ))}
        </div>
        <p className="text-zinc-500 text-xs text-center mt-3 font-light tracking-wider uppercase select-none">
          ← Swipe or hover to play, click to view full screen with sound →
        </p>
      </div>
    );
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-40 relative px-4 sm:px-8 md:px-12 pt-20 sm:pt-24 md:pt-32 pb-28"
      style={{ background: '#0C0C0C' }}
    >
      {/* ── Heading (Generous Bottom Spacing) ── */}
      <FadeIn delay={0} y={40}>
        <h2
          className="bg-gradient-to-b from-[#f80e0e] to-[#c00000] bg-clip-text text-transparent font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14 md:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      {/* ── Framer Motion Sliding Tab Selector (Clear Spacing Above & Below) ── */}
      <FadeIn delay={0.15} y={30}>
        <div className="flex justify-between gap-1 sm:gap-2 mb-12 sm:mb-16 md:mb-24 max-w-[92%] sm:max-w-lg md:max-w-2xl mx-auto p-1.5 bg-zinc-900/80 border border-white/10 rounded-full backdrop-blur-lg relative z-10 shadow-2xl">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 py-3 sm:py-3.5 md:py-4 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === tab ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-red-600 rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* ── Active Subsection Container (Added Top Padding for Breathing Room) ── */}
      <div className="w-full relative z-10 min-h-[40vh] pt-4 sm:pt-8 md:pt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === 'graphics' && renderGraphics()}
            {activeTab === 'menu design' && renderMenus()}
            {activeTab === 'videography' && renderVideography()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Immersive Lightbox Overlay ── */}
      {lightbox.isOpen && (
        <Lightbox
          mediaList={lightbox.mediaList}
          currentIndex={lightbox.currentIndex}
          onClose={closeLightbox}
          onPrev={() => navigateLightbox(-1)}
          onNext={() => navigateLightbox(1)}
        />
      )}
    </section>
  );
}