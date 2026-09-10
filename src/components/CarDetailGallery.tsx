'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CarImage } from '@/types/car';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarDetailGalleryProps {
  images: CarImage[];
  alt: string;
}

export function CarDetailGallery({ images, alt }: CarDetailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = images[selectedIndex] || images[0];

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 cursor-zoom-in"
      >
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={`${alt} - Photo ${selectedIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
            Photo unavailable
          </div>
        )}

        {/* Minimal counter */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 transition-all ${
                idx === selectedIndex
                  ? 'ring-2 ring-zinc-900 ring-offset-2 ring-offset-[#FAFAFA]'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={img.url}
                alt={`${alt} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="text-sm text-white/60">
              {alt} — <span className="text-white/90">{selectedIndex + 1} of {images.length}</span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              {activeImage && (
                <Image
                  src={activeImage.url}
                  alt={`${alt} enlarged`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              )}
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2 z-10">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-14 h-10 rounded-lg overflow-hidden transition-all ${
                  idx === selectedIndex ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-80'
                }`}
              >
                <Image src={img.url} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
