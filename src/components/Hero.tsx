'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface SlideImage {
  id: number;
  image: string;
  alt: string;
}

const SLIDES: SlideImage[] = [
  {
    id: 1,
    image: '/picture/Gemini_Generated_Image_91pk1h91pk1h91pk.jpg',
    alt: "Mobil sport premium di tepi pantai saat senja",
  },
  {
    id: 2,
    image: '/picture/Gemini_Generated_Image_jo6xjhjo6xjhjo6x.jpg',
    alt: "Pemandangan dari kabin mobil di jalan pesisir",
  },
  {
    id: 3,
    image: '/picture/Gemini_Generated_Image_yj6i3dyj6i3dyj6i (1).jpg',
    alt: "Mobil cabriolet oranye di jalan pesisir saat senja",
  },
];

const AUTOPLAY_INTERVAL_MS = 4000;

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Continuous autoplay every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner mobil pilihan Apex Auto"
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-zinc-950 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Background Slides (Image Carousel Layer) ── */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Image with subtle Ken Burns zoom effect when active */}
              <div
                className={`relative w-full h-full transform transition-transform duration-[5000ms] ease-out ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                  quality={90}
                />
              </div>

              {/* Multi-tier gradient overlay for readability & luxury depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-zinc-950/60" />
              <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-black/20 to-black/60" />
            </div>
          );
        })}
      </div>

      {/* ── Slide Navigation Arrows (Desktop & Tablet) ── */}
      <div className="absolute inset-y-0 left-0 right-0 z-20 pointer-events-none flex items-center justify-between px-4 sm:px-8">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Slide sebelumnya"
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Slide berikutnya"
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* ── Hero Foreground Content (Static Text & CTAs) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 pt-28">
        <div className="max-w-3xl">
          {/* Badge / Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-amber-400 mb-5 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Showroom Medan</span>
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span className="text-white/80 font-normal hidden sm:inline">
              Kualitas Terjamin
            </span>
          </div>

          {/* Static Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.05]">
            Mobil Premium{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Pilihan Anda
            </span>
          </h1>

          {/* Static Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-zinc-300 mt-5 leading-relaxed max-w-2xl font-light">
            Mobil pilihan. Harga jelas dalam rupiah. Siap tunai, kredit, dan tukar tambah.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Lihat Mobil</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tentang-kami#contact-showroom"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all duration-200"
            >
              <span>Kunjungi Kami</span>
            </Link>
          </div>
        </div>

        {/* ── Slide Indicators ── */}
        <div className="mt-12 sm:mt-16 pt-6 flex items-center">
          {/* Interactive Indicator Dots */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Buka slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'w-10 sm:w-12 bg-amber-500 shadow-md shadow-amber-500/40'
                      : 'w-2.5 sm:w-3 bg-white/30 hover:bg-white/60'
                  }`}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
