'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

  // Continuous autoplay every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner mobil pilihan Apex Auto"
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-zinc-950 select-none"
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

              {/* Keep the car visible while giving the lower copy enough contrast. */}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/15 to-zinc-950/25" />
              <div className="absolute inset-0 bg-linear-to-r from-zinc-950/25 via-transparent to-transparent" />
            </div>
          );
        })}
      </div>

      {/* ── Hero Foreground Content (Static Text & CTAs) ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pb-16 pt-28">
        <div className="max-w-md lg:max-w-lg">
          {/* Static Heading */}
          <h1 className="tracking-[-0.035em]">
            <span className="block text-[1.875rem] font-medium leading-[1.2] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
              Mobil Berkelas
            </span>
            <span className="mt-1 block text-[2.5rem] font-semibold leading-[1.12] text-amber-300 sm:text-[3.25rem] lg:text-[3.5rem]">
              Untuk Anda
            </span>
          </h1>

          {/* Static Subtitle */}
          <p className="mt-4 max-w-[27rem] text-sm font-normal leading-7 text-zinc-200 sm:text-[0.9375rem]">
            Dari sedan elegan hingga SUV premium, temukan mobil yang paling pas untuk Anda.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/inventory"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              <span>Lihat Mobil</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tentang-kami#contact-showroom"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              <span>Kunjungi Kami</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
