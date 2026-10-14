'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { CarImage } from '@/types/car';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export function CarDetailGallery({ images, alt }: { images: CarImage[]; alt: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [failedImageUrls, setFailedImageUrls] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activeImage = images[selectedIndex] || images[0];
  const availableImage = activeImage && !failedImageUrls.includes(activeImage.url);
  const move = (direction: number) => setSelectedIndex(current => (current + direction + images.length) % images.length);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  return (
    <div className="flex h-full flex-col gap-3 bg-[#171717] pb-4 lg:pr-4">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#202020] lg:aspect-auto lg:min-h-80 lg:flex-1">
        <button onClick={() => setIsLightboxOpen(true)} disabled={!availableImage} aria-label={`Perbesar ${alt} photo ${selectedIndex + 1}`} className="group absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber-400">
          {availableImage ? <Image src={activeImage.url} alt={`${alt}, foto ${selectedIndex + 1}`} fill preload onError={() => setFailedImageUrls(current => [...current, activeImage.url])} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /> : <span className="text-sm text-white/40">Foto belum tersedia</span>}
          {activeImage && <span className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white"><Maximize2 className="h-4 w-4" /></span>}
        </button>
        {images.length > 1 && <><button onClick={() => move(-1)} aria-label="Foto mobil sebelumnya" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2.5 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-amber-400"><ChevronLeft className="h-5 w-5" /></button><button onClick={() => move(1)} aria-label="Foto mobil berikutnya" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2.5 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-amber-400"><ChevronRight className="h-5 w-5" /></button></>}
        {activeImage && <span className="absolute bottom-3 right-3 bg-black/60 px-3 py-1.5 text-xs text-white" aria-live="polite">{selectedIndex + 1} / {images.length}</span>}
      </div>
      {images.length > 1 && <div className="flex gap-2 overflow-x-auto p-1">{images.map((image, index) => <button key={image.id} onClick={() => setSelectedIndex(index)} aria-label={`Tampilkan foto mobil ${index + 1}`} aria-pressed={index === selectedIndex} className={`relative h-16 w-24 shrink-0 overflow-hidden transition-opacity focus-visible:outline-2 focus-visible:outline-amber-400 ${index === selectedIndex ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-[#171717]' : 'opacity-50 hover:opacity-100'}`}><Image src={image.url} alt={`${alt} thumbnail ${index + 1}`} fill sizes="96px" className="object-cover" /></button>)}</div>}
      {isLightboxOpen && <dialog ref={dialogRef} aria-label={`${alt} galeri foto`} onCancel={event => { event.preventDefault(); setIsLightboxOpen(false); }} onKeyDown={event => { if (images.length > 1 && event.key === 'ArrowLeft') move(-1); if (images.length > 1 && event.key === 'ArrowRight') move(1); }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-black/95 p-4 text-white backdrop:bg-black sm:p-8">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between gap-4"><p className="text-sm text-white/70">{alt} <span className="ml-2 whitespace-nowrap">{selectedIndex + 1} dari {images.length}</span></p><button onClick={() => setIsLightboxOpen(false)} aria-label="Tutup galeri foto" className="rounded-full bg-white/10 p-3 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-amber-400"><X className="h-5 w-5" /></button></div>
          <div className="relative min-h-0 flex-1">{activeImage && <Image src={activeImage.url} alt={`${alt}, foto diperbesar ${selectedIndex + 1}`} fill sizes="100vw" className="object-contain" />}{images.length > 1 && <><button onClick={() => move(-1)} aria-label="Foto sebelumnya" className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 hover:bg-white/25"><ChevronLeft className="h-5 w-5" /></button><button onClick={() => move(1)} aria-label="Foto berikutnya" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 hover:bg-white/25"><ChevronRight className="h-5 w-5" /></button></>}</div>
          <div className="flex justify-center gap-2 overflow-x-auto p-1">{images.map((image, index) => <button key={image.id} onClick={() => setSelectedIndex(index)} aria-label={`Pilih foto ${index + 1}`} aria-pressed={selectedIndex === index} className={`relative h-12 w-16 shrink-0 overflow-hidden ${selectedIndex === index ? 'ring-2 ring-amber-400' : 'opacity-50 hover:opacity-100'}`}><Image src={image.url} alt="" fill sizes="64px" className="object-cover" /></button>)}</div>
        </div>
      </dialog>}
    </div>
  );
}
