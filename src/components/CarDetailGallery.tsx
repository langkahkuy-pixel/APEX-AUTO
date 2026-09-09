'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CarImage } from '@/types/car';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

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
      {/* Main Image View with Zoom Trigger */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl cursor-zoom-in"
      >
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={`${alt} - Foto ${selectedIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            Foto tidak tersedia
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
          <span className="text-xs font-semibold text-white bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 backdrop-blur-sm">
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            Klik untuk Memperbesar Foto
          </span>
          <span className="text-xs text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                idx === selectedIndex
                  ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/20'
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={`${alt} thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div className="text-sm font-semibold text-slate-300">
              {alt} — <span className="text-amber-400">Foto {selectedIndex + 1} dari {images.length}</span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Center */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              {activeImage && (
                <Image
                  src={activeImage.url}
                  alt={`${alt} diperbesar`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              )}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 sm:left-6 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-amber-500 hover:text-slate-950 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 sm:right-6 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-amber-500 hover:text-slate-950 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
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
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === selectedIndex ? 'border-amber-400 scale-110' : 'border-slate-800 opacity-50 hover:opacity-90'
                }`}
              >
                <Image src={img.url} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
