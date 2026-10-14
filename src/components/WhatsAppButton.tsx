'use client';

import {formatRupiah, whatsappUrl } from '@/lib/locale';


import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { Car } from '@/types/car';

interface WhatsAppButtonProps {
  car?: Car;
  variant?: 'floating' | 'card' | 'banner' | 'outline';
  customText?: string;
  className?: string;
}

export function WhatsAppButton({
  car,
  variant = 'card',
  customText,
  className = '',
}: WhatsAppButtonProps) {
  const pathname = usePathname();
  if (variant === 'floating' && (pathname.startsWith('/admin') || ['/login', '/forgot-password'].includes(pathname))) return null;

  // Construct automated prefilled message based on context
  let message = 'Halo Apex Auto Medan, saya ingin bertanya tentang pilihan mobil, pembelian tunai/kredit, dan tukar tambah.';

  if (car) {
    message = `Halo Apex Auto Medan, saya tertarik dengan ${car.brand} ${car.model} (${car.year}) seharga ${formatRupiah(car.price)} (kode ${car.id}). Mohon konfirmasi ketersediaan, dokumen, dan pilihan pembayarannya.`;
  } else if (customText) {
    message = customText;
  }

  const waUrl = whatsappUrl(message);

  if (variant === 'floating') {
    return (
      <a
        id="floating-whatsapp-btn"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi tim showroom melalui WhatsApp"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl shadow-emerald-950/60 transition-all hover:scale-105 group border border-emerald-400/30 ${className}`}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white/20 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">WhatsApp Penjualan</span>
      </a>
    );
  }

  if (variant === 'outline') {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold transition-all ${className}`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>{customText || "Hubungi WhatsApp"}</span>
      </a>
    );
  }

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/30 transition-all hover:scale-[1.02] ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-white/20" />
      <span>{customText || "Hubungi Penjualan melalui WhatsApp"}</span>
    </a>
  );
}
