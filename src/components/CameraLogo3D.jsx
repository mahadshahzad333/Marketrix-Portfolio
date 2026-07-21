import React, { useRef, useEffect, useState, useCallback } from 'react';
import logoSrc from '../assets/images/camera3d.png';

let cachedProcessedSrc = null;

/* ─────────────────────────────────────────────
   CameraLogo3D
   • Automatically strips out solid black backgrounds on load (cached)
   • Mouse-tracking parallax tilt on Desktop (card 3-D feel)
   • Non-interactive on Mobile (pulse animation only)
   • Viewport-aware RAF animation loops (stops when scrolled out)
   • Ambient glow pulse bloom animation
───────────────────────────────────────────── */
export default function CameraLogo3D({ size = 520 }) {
  const containerRef = useRef(null);
  const canvasRef   = useRef(null);
  const rafRef      = useRef(null);
  const mouseRef    = useRef({ x: 0, y: 0 });
  const tiltRef     = useRef({ rx: 0, ry: 0 });
  
  const [hovered, setHovered] = useState(false);
  const [lensAngle, setLensAngle] = useState(0);
  const [shutterOpen, setShutterOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Start with cached or original src
  const [processedSrc, setProcessedSrc] = useState(cachedProcessedSrc || logoSrc);

  /* ── Mobile viewport detection ── */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ── Viewport visibility tracking ── */
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* ── Programmatically strip the black background (with module caching) ── */
  useEffect(() => {
    if (cachedProcessedSrc) {
      setProcessedSrc(cachedProcessedSrc);
      return;
    }

    const img = new Image();
    img.src = logoSrc;
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const w = canvas.width;
      const h = canvas.height;

      const queue = [];
      const visited = new Uint8Array(w * h);
      const threshold = 35; 

      const getIndex = (x, y) => (y * w + x) * 4;

      const isBackgroundBlack = (x, y) => {
        const idx = getIndex(x, y);
        return (
          data[idx] < threshold && 
          data[idx + 1] < threshold && 
          data[idx + 2] < threshold
        );
      };

      const addSeed = (x, y) => {
        if (x >= 0 && x < w && y >= 0 && y < h) {
          const pos = y * w + x;
          if (!visited[pos] && isBackgroundBlack(x, y)) {
            visited[pos] = 1;
            queue.push(pos);
          }
        }
      };

      for (let x = 0; x < w; x++) {
        addSeed(x, 0);
        addSeed(x, h - 1);
      }
      for (let y = 0; y < h; y++) {
        addSeed(0, y);
        addSeed(w - 1, y);
      }

      let head = 0;
      while (head < queue.length) {
        const pos = queue[head++];
        const y = Math.floor(pos / w);
        const x = pos % w;

        const idx = pos * 4;
        data[idx + 3] = 0;

        const neighbors = [
          { nx: x + 1, ny: y },
          { nx: x - 1, ny: y },
          { nx: x,     ny: y + 1 },
          { nx: x,     ny: y - 1 }
        ];

        for (const { nx, ny } of neighbors) {
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const npos = ny * w + nx;
            if (!visited[npos] && isBackgroundBlack(nx, ny)) {
              visited[npos] = 1;
              queue.push(npos);
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const url = canvas.toDataURL('image/png');
      cachedProcessedSrc = url;
      setProcessedSrc(url);
    };
  }, []);

  /* ── Mouse parallax (Desktop only) ── */
  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    mouseRef.current = {
      x: (e.clientX - cx) / (rect.width  / 2),
      y: (e.clientY - cy) / (rect.height / 2),
    };
  }, [isMobile]);

  /* ── Viewport-aware smooth tilt interpolation loop ── */
  useEffect(() => {
    if (!isVisible || isMobile) {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--rx', '0deg');
        containerRef.current.style.setProperty('--ry', '0deg');
      }
      return;
    }

    const MAX_TILT = 24;
    const animate = () => {
      const target = mouseRef.current;
      tiltRef.current.rx += ((-target.y * MAX_TILT) - tiltRef.current.rx) * 0.08;
      tiltRef.current.ry += (( target.x * MAX_TILT) - tiltRef.current.ry) * 0.08;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--rx', `${tiltRef.current.rx}deg`);
        containerRef.current.style.setProperty('--ry', `${tiltRef.current.ry}deg`);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, isVisible, isMobile]);

  /* ── Lens ring spin on hover (Desktop only) ── */
  useEffect(() => {
    let interval;
    if (hovered && isVisible && !isMobile) {
      interval = setInterval(() => setLensAngle(a => a + 1.5), 16);
    }
    return () => clearInterval(interval);
  }, [hovered, isVisible, isMobile]);

  /* ── Shutter click (Desktop only) ── */
  const handleClick = () => {
    if (isMobile) return;
    setShutterOpen(true);
    setTimeout(() => setShutterOpen(false), 130);
  };

  /* ── Viewport-aware Canvas lens shimmer ── */
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let shimmerRaf;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width  / 2;
      const cy = canvas.height / 2;
      const r  = canvas.width  * 0.38;

      /* outer glow */
      const glow = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r * 1.15);
      glow.addColorStop(0,   'rgba(122, 22, 5, 0)');
      glow.addColorStop(0.7, 'rgba(211, 33, 33, 0.16)');
      glow.addColorStop(1,   'rgba(189, 51, 51, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* rotating specular arc */
      const arc1Angle = (frame * 0.015) % (Math.PI * 2);
      const arc1 = ctx.createLinearGradient(
        cx + Math.cos(arc1Angle) * r * 0.6, cy + Math.sin(arc1Angle) * r * 0.6,
        cx + Math.cos(arc1Angle + Math.PI) * r * 0.6, cy + Math.sin(arc1Angle + Math.PI) * r * 0.6,
      );
      arc1.addColorStop(0,    'rgba(255,255,255,0.0)');
      arc1.addColorStop(0.45, 'rgba(210,230,255,0.22)');
      arc1.addColorStop(0.5,  'rgba(255,255,255,0.45)');
      arc1.addColorStop(0.55, 'rgba(210,230,255,0.22)');
      arc1.addColorStop(1,    'rgba(255,255,255,0.0)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = arc1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      /* inner lens tint */
      const inner = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 0, cx, cy, r);
      inner.addColorStop(0,   'rgba(255,200,200,0.28)');
      inner.addColorStop(0.4, 'rgba(240,120,120,0.15)');
      inner.addColorStop(0.8, 'rgba(200,60,60,0.12)');
      inner.addColorStop(1,   'rgba(160,10,10,0.25)');
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = inner;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      /* pulsing specular dot */
      const pulse = 0.7 + 0.3 * Math.sin(frame * 0.08);
      ctx.save();
      ctx.globalAlpha = pulse;
      const starGrad = ctx.createRadialGradient(
        cx - r * 0.28, cy - r * 0.28, 0,
        cx - r * 0.28, cy - r * 0.28, r * 0.06,
      );
      starGrad.addColorStop(0, 'rgba(255,255,255,1)');
      starGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = starGrad;
      ctx.beginPath();
      ctx.arc(cx - r * 0.28, cy - r * 0.28, r * 0.06, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      shimmerRaf = requestAnimationFrame(draw);
    };
    shimmerRaf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(shimmerRaf);
  }, [isVisible]);

  const s = size;

  return (
    <>
      <style>{`
        @keyframes cam3d-float {
          0%,100% { transform: rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(0px); }
          50%      { transform: rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(-22px); }
        }
        @keyframes cam3d-pulse {
          0%,100% { opacity: 0.75; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.08); }
        }
        @keyframes cam3d-spark-float {
          0%   { opacity: 0; transform: translate(0,0) scale(0.5); }
          20%  { opacity: 1; }
          80%  { opacity: 0.9; }
          100% { opacity: 0; transform: translate(var(--sx,0),var(--sy,0)) scale(0); }
        }
        @keyframes cam3d-flash-anim {
          0%   { opacity: 1; transform: scale(0.6); }
          100% { opacity: 0; transform: scale(1.5); }
        }
        .cam3d-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transform: rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(0px);
          animation: cam3d-float 4.2s ease-in-out infinite;
          will-change: transform;
        }
        .cam3d-img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
          z-index: 1;
          display: block;
          filter: brightness(1.12) contrast(1.08) saturate(1.3);
          transition: filter 0.4s ease;
        }
        .cam3d-root:hover .cam3d-img {
          filter: brightness(1.22) contrast(1.12) saturate(1.45);
        }
        .cam3d-canvas {
          position: absolute;
          top: 17%;
          left: 25%;
          width: 50%;
          height: 50%;
          z-index: 2;
          pointer-events: none;
          border-radius: 50%;
          mix-blend-mode: screen;
          opacity: 0.92;
        }
        .cam3d-ring {
          position: absolute;
          border-radius: 50%;
          border: 2.5px solid transparent;
          pointer-events: none;
          z-index: 3;
          transition: opacity 0.35s;
        }
        .cam3d-glow-ring {
          position: absolute;
          inset: -15%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at 50% 55%,
            rgba(239,68,68,0.45) 0%,
            rgba(185,28,28,0.25) 40%,
            transparent 75%
          );
          filter: blur(20px);
          animation: cam3d-pulse 3.5s ease-in-out infinite;
          pointer-events: none;
        }
        .cam3d-spark {
          position: absolute;
          width: 4.5px; height: 4.5px;
          border-radius: 50%;
          background: rgba(254,202,202,0.95);
          animation: cam3d-spark-float linear infinite;
          box-shadow: 0 0 8px 3px rgba(239,68,68,0.75);
        }
        .cam3d-flash {
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(254,202,202,0.4) 60%, transparent 100%);
          z-index: 10;
          pointer-events: none;
          animation: cam3d-flash-anim 0.13s ease-out forwards;
        }
        .cam3d-hint {
          position: absolute;
          bottom: -32px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(248,113,113,0.8);
          white-space: nowrap;
          pointer-events: none;
          transition: opacity 0.4s;
        }
      `}</style>

      <div
        className="cam3d-root"
        ref={containerRef}
        style={{
          '--rx': '0deg',
          '--ry': '0deg',
          position: 'relative',
          width: '100%',
          maxWidth: s,
          aspectRatio: '1 / 1',
          perspective: '1000px',
          cursor: isMobile ? 'default' : 'pointer',
          userSelect: 'none',
          pointerEvents: isMobile ? 'none' : 'auto',
        }}
        onMouseEnter={() => { if (!isMobile) setHovered(true); }}
        onMouseLeave={() => { if (!isMobile) { setHovered(false); mouseRef.current = { x: 0, y: 0 }; } }}
        onClick={handleClick}
        role="img"
        aria-label="3D Camera Logo"
      >
        <div className="cam3d-glow-ring" />

        <div className="cam3d-card">
          <img
            src={processedSrc}
            alt="Camera Logo"
            className="cam3d-img"
            draggable={false}
          />

          <canvas ref={canvasRef} className="cam3d-canvas" width={260} height={260} />

          <div
            className="cam3d-ring"
            style={{
              top: '19%', left: '27%', width: '46%', height: '46%',
              borderTopColor:  'rgba(180,215,255,0.65)',
              borderLeftColor: 'rgba(180,215,255,0.25)',
              transform: `rotate(${lensAngle}deg)`,
              opacity: hovered && !isMobile ? 1 : 0.35,
            }}
          />
          <div
            className="cam3d-ring"
            style={{
              top: '25%', left: '33%', width: '34%', height: '34%',
              borderBottomColor: 'rgba(241, 115, 106, 0.6)',
              borderRightColor:  'rgba(230,245,255,0.25)',
              transform: `rotate(${-lensAngle * 1.5}deg)`,
              opacity: hovered && !isMobile ? 1 : 0.22,
            }}
          />

          {!isMobile && SPARKS.map((sp, i) => (
            <div
              key={i}
              className="cam3d-spark"
              style={{
                left: sp.x, top: sp.y,
                animationDuration: `${sp.dur}s`,
                animationDelay:    `${sp.delay}s`,
                '--sx': sp.sx, '--sy': sp.sy,
                opacity: 0,
              }}
            />
          ))}

          {shutterOpen && !isMobile && <div className="cam3d-flash" key={Date.now()} />}
        </div>

        {!isMobile && (
          <div className="cam3d-hint" style={{ opacity: hovered ? 1 : 0 }}>
            click to shoot ✦
          </div>
        )}
      </div>
    </>
  );
}

const SPARKS = [
  { x: '30%', y: '14%', sx: '-22px', sy: '-34px', dur: 2.8, delay: 0.0 },
  { x: '70%', y: '10%', sx:  '18px', sy: '-40px', dur: 3.2, delay: 0.6 },
  { x: '86%', y: '42%', sx:  '28px', sy: '-18px', dur: 2.5, delay: 1.1 },
  { x: '76%', y: '80%', sx:  '20px', sy:  '26px', dur: 3.6, delay: 0.3 },
  { x: '20%', y: '76%', sx: '-26px', sy:  '24px', dur: 2.9, delay: 0.9 },
  { x: '10%', y: '46%', sx: '-30px', sy:  '-10px', dur: 3.1, delay: 1.5 },
  { x: '50%', y:  '4%', sx:   '6px', sy: '-38px', dur: 2.6, delay: 0.4 },
  { x: '93%', y: '66%', sx:  '26px', sy:  '20px', dur: 3.4, delay: 1.8 },
];