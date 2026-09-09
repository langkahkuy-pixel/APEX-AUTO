'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Car } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top micro-bar for Singapore Dealership Details */}
      <div className="hidden md:block bg-slate-900/80 border-b border-slate-800/80 text-xs text-slate-400 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              24 Leng Kee Road, Singapore 159096
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Senin - Sabtu: 09:00 - 19:00 | Minggu: 10:00 - 18:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Inspeksi LTA & COE Bergaransi
            </span>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/6581234567?text=Halo%20Apex%20Auto%20Singapore,%20saya%20tertarik%20dengan%20koleksi%20mobil%20showroom"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              WhatsApp: +65 8123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Car className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-lg sm:text-xl text-white flex items-center gap-1.5">
              APEX AUTO <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold tracking-normal">SG</span>
            </div>
            <div className="text-[10px] sm:text-xs text-slate-400 tracking-widest uppercase">
              Singapore Prestige Motors
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#katalog" className="text-amber-400 hover:text-amber-300 transition-colors">
            Katalog Mobil
          </Link>
          <Link href="#promo" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <span>Promo Spesial</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </Link>
          <Link href="#kontak-showroom" className="hover:text-white transition-colors">
            Hubungi Showroom
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span>Login Pemilik</span>
          </Link>
          <a
            href="https://wa.me/6581234567?text=Halo%20Apex%20Auto%20Singapore,%20saya%20ingin%20konsultasi%20pembelian%20mobil%20atau%20COE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-full shadow-md shadow-emerald-900/30 transition-all hover:shadow-emerald-700/40 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Chat Sales (SG)</span>
          </a>
        </div>
      </div>
    </header>
  );
}
