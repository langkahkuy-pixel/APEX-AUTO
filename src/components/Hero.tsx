'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy prevented playback, fallback poster remains visible
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-zinc-950">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        {/* Fallback Poster Image */}
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80"
          alt="Premier luxury car showroom"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source
            src="/videos/Luxury_car_commercial_video_1080p_202609091716.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft gradient for text legibility — minimal, not cinematic */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
      </div>

      {/* Content — bottom-aligned, left-justified */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white leading-[0.95]">
            Premier Luxury
            <br />
            Motors
          </h1>

          <a
            href="/inventory"
            className="inline-flex items-center gap-2 mt-10 text-sm font-medium text-white/80 hover:text-white transition-colors group"
          >
            View Inventory
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
