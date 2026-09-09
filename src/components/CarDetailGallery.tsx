'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CarImage } from '@/types/car';

interface CarDetailGalleryProps {
  images: CarImage[];
  alt: string;
}

export function CarDetailGallery({ images, alt }: CarDetailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-3">
      {/* Main Image View */}
      <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={`${alt} - Foto ${selectedIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            Foto tidak tersedia
          </div>
        )}
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
    </div>
  );
}
