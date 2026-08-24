'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  tag: string;
}

interface Props {
  images: GalleryImage[];
}

export default function GallerySection({ images }: Props) {
  const [showGallery, setShowGallery] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [mobileSlideIdx, setMobileSlideIdx] = useState(0);

  useEffect(() => {
    if (!showGallery) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowGallery(false);
      else if (e.key === 'ArrowLeft') setActivePhotoIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
      else if (e.key === 'ArrowRight') setActivePhotoIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showGallery, images.length]);

  return (
    <>
      {/* Mobile Swipeable Photo Gallery */}
      <div className="md:hidden relative mb-6">
        {/* Swipe hint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-[fadeOut_2s_ease-in-out_1s_forwards] flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
          <svg className="w-3.5 h-3.5 animate-[bounceX_0.8s_ease-in-out_infinite_alternate]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span>Swipe photos</span>
          <svg className="w-3.5 h-3.5 animate-[bounceX_0.8s_ease-in-out_infinite_alternate-reverse]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </div>

        {/* Scrollable strip */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full rounded-2xl"
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = Math.round(el.scrollLeft / el.offsetWidth);
            setMobileSlideIdx(idx);
          }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full shrink-0 aspect-[4/3] snap-center cursor-pointer"
              onClick={() => { setActivePhotoIdx(idx); setShowGallery(true); }}
            >
              <Image src={img.src} alt={img.alt} fill sizes="100vw" priority={idx === 0} className="object-cover" />
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {img.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-2.5 px-1">
          <div className="flex items-center gap-1.5">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`block rounded-full transition-all duration-300 ${
                  mobileSlideIdx === idx ? 'w-5 h-2 bg-orange-500' : 'w-2 h-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => { setActivePhotoIdx(0); setShowGallery(true); }}
            className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1.5 active:scale-95"
          >
            <span>📷</span> {mobileSlideIdx + 1} / {images.length} · View all
          </button>
        </div>
      </div>

      {/* Desktop Bento Grid Photo Gallery */}
      <div className="hidden md:grid grid-cols-4 gap-2.5 rounded-3xl overflow-hidden mb-12 relative shadow-md h-[520px] bg-slate-200">
        {/* Main Large Left Photo */}
        <div
          className="col-span-2 relative h-full group cursor-pointer overflow-hidden"
          onClick={() => { setActivePhotoIdx(0); setShowGallery(true); }}
        >
          <Image src={images[0].src} alt={images[0].alt} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent group-hover:opacity-0 transition-opacity" />
          <div className="absolute bottom-4 left-4 bg-slate-900/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
            {images[0].title}
          </div>
        </div>

        {/* Middle 2 Grid Photos */}
        <div className="grid grid-rows-2 gap-2.5 h-full">
          <div className="relative group cursor-pointer overflow-hidden" onClick={() => { setActivePhotoIdx(1); setShowGallery(true); }}>
            <Image src={images[1].src} alt={images[1].alt} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative group cursor-pointer overflow-hidden" onClick={() => { setActivePhotoIdx(2); setShowGallery(true); }}>
            <Image src={images[2].src} alt={images[2].alt} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        {/* Right 2 Grid Photos */}
        <div className="grid grid-rows-2 gap-2.5 h-full">
          <div className="relative group cursor-pointer overflow-hidden" onClick={() => { setActivePhotoIdx(3); setShowGallery(true); }}>
            <Image src={images[3].src} alt={images[3].alt} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative group cursor-pointer overflow-hidden" onClick={() => { setActivePhotoIdx(4); setShowGallery(true); }}>
            <Image src={images[4].src} alt={images[4].alt} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        {/* View All Photos Floating Badge */}
        <button
          onClick={() => { setActivePhotoIdx(0); setShowGallery(true); }}
          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 border border-slate-200 px-4 py-2 rounded-xl text-xs font-extrabold shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 hover:text-orange-600"
        >
          <span>📷</span> Show all 5 photos
        </button>
      </div>

      {/* Lightbox Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-slate-950/98 flex flex-col">
          {/* Top Navigation Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800/60 shrink-0">
            <button
              onClick={() => setShowGallery(false)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-xs sm:text-sm active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
            <div className="text-slate-500 text-xs hidden sm:block">Esc to close · ← → to navigate</div>
            <div className="text-xs font-bold text-slate-400">
              <span className="text-orange-400">{images[activePhotoIdx]?.tag}</span>
              <span className="text-slate-600 mx-2">·</span>
              <span className="text-white font-black">{activePhotoIdx + 1}</span>
              <span className="text-slate-600"> / {images.length}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Image Stage */}
            <div className="flex-1 relative flex items-center justify-center min-h-0 px-12 sm:px-16">
              <button
                onClick={() => setActivePhotoIdx(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="relative w-full h-full max-h-[55vh] sm:max-h-[65vh]">
                <Image
                  src={images[activePhotoIdx].src}
                  alt={images[activePhotoIdx].alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 85vw"
                  className="object-contain"
                />
              </div>

              <button
                onClick={() => setActivePhotoIdx(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                aria-label="Next photo"
                className="absolute right-2 sm:right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Title */}
            <div className="text-center px-4 py-3 shrink-0">
              <p className="font-extrabold text-white text-sm sm:text-base">{images[activePhotoIdx].title}</p>
              <p className="text-slate-400 text-xs mt-0.5">{images[activePhotoIdx].alt}</p>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2 px-4 pb-4 sm:pb-6 shrink-0 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activePhotoIdx === idx ? 'border-orange-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
