'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';

export interface CarouselImage {
  src: string;
  alt: string;
  tag: string;
}

interface Props {
  images: CarouselImage[];
}

// Per-card personality — tilt, height, and warm-tinted glow shadow
const ROW1 = [
  { tilt: -5,  h: 'clamp(190px,50vw,280px)', shadow: '0 20px 55px -5px rgba(251,146,60,0.18), 0 12px 28px rgba(0,0,0,0.50)' },
  { tilt: 3,   h: 'clamp(220px,58vw,320px)', shadow: '0 28px 70px -5px rgba(251,146,60,0.22), 0 16px 36px rgba(0,0,0,0.55)' },
  { tilt: -2,  h: 'clamp(185px,48vw,265px)', shadow: '0 18px 50px -5px rgba(251,146,60,0.15), 0 10px 24px rgba(0,0,0,0.48)' },
  { tilt: 6,   h: 'clamp(210px,54vw,305px)', shadow: '0 24px 62px -5px rgba(251,146,60,0.20), 0 14px 32px rgba(0,0,0,0.52)' },
  { tilt: -4,  h: 'clamp(200px,52vw,290px)', shadow: '0 22px 58px -5px rgba(251,146,60,0.17), 0 12px 28px rgba(0,0,0,0.50)' },
];

const ROW2 = [
  { tilt: 4,   h: 'clamp(200px,52vw,295px)', shadow: '0 22px 58px -5px rgba(56,189,248,0.14), 0 12px 28px rgba(0,0,0,0.50)' },
  { tilt: -3,  h: 'clamp(185px,48vw,268px)', shadow: '0 18px 50px -5px rgba(56,189,248,0.12), 0 10px 24px rgba(0,0,0,0.48)' },
  { tilt: 5,   h: 'clamp(215px,56vw,310px)', shadow: '0 26px 66px -5px rgba(56,189,248,0.18), 0 14px 34px rgba(0,0,0,0.54)' },
  { tilt: -6,  h: 'clamp(195px,50vw,282px)', shadow: '0 20px 54px -5px rgba(56,189,248,0.14), 0 12px 28px rgba(0,0,0,0.50)' },
  { tilt: 3,   h: 'clamp(205px,52vw,298px)', shadow: '0 24px 62px -5px rgba(56,189,248,0.16), 0 14px 32px rgba(0,0,0,0.52)' },
];

export default function PhotoCarousel({ images }: Props) {
  const [paused,   setPaused]   = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const row1    = [...images, ...images];
  const shifted = [...images.slice(2), ...images.slice(0, 2)];
  const row2    = [...shifted, ...shifted];

  const prev = useCallback(() =>
    setLightbox(l => l === null ? null : (l - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setLightbox(l => l === null ? null : (l + 1) % images.length), [images.length]);

  // Touch-swipe handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 48) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     setLightbox(null);
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [lightbox, prev, next]);

  return (
    <>
      {/* ══════════════════════════════════════════════════
          PREMIUM DARK SECTION
      ══════════════════════════════════════════════════ */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-0 rounded-3xl overflow-hidden"
           style={{ background: 'linear-gradient(145deg,#0c1119 0%,#0f172a 50%,#0c1119 100%)' }}>

        {/* Ambient glow blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
             style={{ background: 'radial-gradient(circle,rgba(251,146,60,0.12) 0%,transparent 70%)' }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
             style={{ background: 'radial-gradient(circle,rgba(56,189,248,0.10) 0%,transparent 70%)' }} />

        {/* Section header */}
        <div className="relative z-10 px-6 sm:px-10 pt-10 pb-2 text-center">
          <span className="inline-block text-[11px] font-extrabold tracking-[0.2em] uppercase
                           text-orange-400 bg-orange-400/10 border border-orange-400/20
                           px-4 py-1.5 rounded-full mb-4">
            A Glimpse Inside
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Life at Zen Homestay
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            Tap any photo to explore · Hover to pause
          </p>
        </div>

        {/* ── Carousel container ── */}
        <div
          className="relative overflow-hidden pb-10 pt-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Edge fades — dark colour */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10"
               style={{ background: 'linear-gradient(to right,#0c1119,transparent)' }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10"
               style={{ background: 'linear-gradient(to left,#0c1119,transparent)' }} />

          <div className="space-y-6">
            {/* Row 1 — scrolls RIGHT */}
            <div
              className="flex gap-4 sm:gap-5 w-max items-end"
              style={{ animation: 'pc-right 22s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}
            >
              {row1.map((img, i) => (
                <Card key={i} img={img} p={ROW1[i % ROW1.length]}
                      onOpen={() => setLightbox(images.indexOf(img))} />
              ))}
            </div>

            {/* Row 2 — scrolls LEFT */}
            <div
              className="flex gap-4 sm:gap-5 w-max items-end"
              style={{ animation: 'pc-left 28s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}
            >
              {row2.map((img, i) => (
                <Card key={i} img={img} p={ROW2[i % ROW2.length]}
                      onOpen={() => setLightbox(images.indexOf(img))} />
              ))}
            </div>
          </div>

          <style>{`
            @keyframes pc-right { from{transform:translateX(-50%)} to{transform:translateX(0)} }
            @keyframes pc-left  { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
          `}</style>
        </div>

        {/* Bottom CTA row */}
        <div className="relative z-10 flex items-center justify-center gap-3 pb-8">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Images className="w-3.5 h-3.5" />
            {images.length} photos · Click to view full size
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          LIGHTBOX — responsive, touch-swipeable, accessible
      ══════════════════════════════════════════════════ */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${images[lightbox].alt}`}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{ background: 'rgba(2,6,12,0.95)', backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* ── Top bar ── */}
          <div className="flex items-center justify-between px-4 sm:px-8 pt-safe-top pt-4 pb-3 shrink-0
                          bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-sm leading-tight">Zen Homestay</span>
              <span className="text-white/45 text-[11px] font-medium tracking-wide">Punnamada Lake · Alleppey, Kerala</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-xs font-bold tabular-nums">
                {lightbox + 1} <span className="text-white/25">/</span> {images.length}
              </span>
              <button
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                           transition-all active:scale-90 touch-manipulation"
                style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.16)' }}
                onClick={() => setLightbox(null)}
                aria-label="Close photo viewer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* ── Main image stage — fills remaining height ── */}
          <div
            className="flex-1 flex items-center justify-center px-14 sm:px-20 min-h-0"
            onClick={() => setLightbox(null)}
          >
            {/* Image wrapper — uses contain so any aspect ratio is shown fully */}
            <div
              className="relative w-full max-w-3xl rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl"
              style={{ height: 'min(65vh, 580px)' }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                fill
                priority
                sizes="(max-width: 480px) 95vw, (max-width: 768px) 88vw, (max-width: 1200px) 70vw, 900px"
                style={{ objectFit: 'contain' }}
              />
              {/* Subtle bottom gradient + tag */}
              <div className="absolute bottom-0 left-0 right-0 h-20
                              bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <span className="text-white text-[10px] sm:text-[11px] font-extrabold tracking-widest
                                 uppercase whitespace-nowrap px-4 py-1.5 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.18)' }}>
                  {images[lightbox].tag}
                </span>
              </div>
            </div>

            {/* Prev — positioned over the stage */}
            <button
              className="absolute left-2 sm:left-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full
                         flex items-center justify-center transition-all active:scale-90 touch-manipulation"
              style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.14)' }}
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next */}
            <button
              className="absolute right-2 sm:right-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full
                         flex items-center justify-center transition-all active:scale-90 touch-manipulation"
              style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.14)' }}
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* ── Alt text shown below image (SEO + accessibility) ── */}
          <p className="text-center text-white/35 text-xs px-6 pt-2 shrink-0 truncate">
            {images[lightbox].alt}
          </p>

          {/* ── Thumbnail strip — horizontally scrollable on mobile ── */}
          <div className="shrink-0 pb-safe-bottom pb-5 pt-3">
            <div
              className="flex gap-2.5 overflow-x-auto px-4 justify-start sm:justify-center
                         [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none' }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="relative shrink-0 rounded-xl overflow-hidden transition-all touch-manipulation"
                  style={{
                    width:  '3.5rem',
                    height: '2.75rem',
                    border: lightbox === i ? '2px solid #fb923c' : '2px solid rgba(255,255,255,0.14)',
                    opacity: lightbox === i ? 1 : 0.45,
                    transform: lightbox === i ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={img.alt}
                  aria-pressed={lightbox === i}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="64px" style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Swipe hint — mobile only, fades after 2s */}
          <p className="sm:hidden text-center text-white/25 text-[10px] pb-4 shrink-0">
            ← Swipe to navigate →
          </p>
        </div>
      )}
    </>
  );
}

/* ─── Card component ─────────────────────────────────────────────────────── */

interface P { tilt: number; h: string; shadow: string; }

function Card({ img, p, onOpen }: { img: CarouselImage; p: P; onOpen: () => void }) {
  const base = `rotate(${p.tilt}deg)`;

  return (
    <div
      role="button" tabIndex={0} aria-label={`View ${img.alt}`}
      className="relative shrink-0 overflow-hidden group/card cursor-pointer outline-none"
      style={{
        width: 'clamp(128px, 29vw, 188px)',
        height: p.h,
        borderRadius: '28px',
        transform: base,
        boxShadow: `${p.shadow}, inset 0 0 0 1px rgba(255,255,255,0.08)`,
        transition: 'transform 0.42s cubic-bezier(.22,1,.36,1), box-shadow 0.42s ease',
      }}
      onClick={onOpen}
      onKeyDown={e => e.key === 'Enter' && onOpen()}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'rotate(0deg) translateY(-12px) scale(1.07)';
        el.style.boxShadow = '0 44px 90px -8px rgba(251,146,60,0.30), 0 20px 40px rgba(0,0,0,0.60), inset 0 0 0 1.5px rgba(255,255,255,0.18)';
        el.style.zIndex = '20';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = base;
        el.style.boxShadow = `${p.shadow}, inset 0 0 0 1px rgba(255,255,255,0.08)`;
        el.style.zIndex = '';
      }}
    >
      {/* Photo */}
      <Image
        src={img.src} alt={img.alt} fill
        quality={90}
        sizes="(max-width: 640px) 55vw, (max-width: 1024px) 30vw, 400px"
        className="object-cover pointer-events-none transition-transform duration-700 group-hover/card:scale-110"
        draggable={false}
      />

      {/* Rich gradient overlay */}
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.80) 0%,rgba(0,0,0,0.10) 45%,rgba(0,0,0,0) 100%)' }} />
      {/* Top micro-gloss */}
      <div className="absolute inset-0"
           style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.06) 0%,transparent 40%)' }} />

      {/* Zoom hint */}
      <div className="absolute inset-0 flex items-center justify-center
                      opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        <div className="w-11 h-11 rounded-full flex items-center justify-center"
             style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Tag label */}
      <span className="absolute bottom-3.5 left-3 right-3 text-white text-[9px] sm:text-[10px]
                       font-extrabold tracking-[0.12em] uppercase text-center truncate block
                       px-2.5 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.18)' }}>
        {img.tag}
      </span>
    </div>
  );
}
