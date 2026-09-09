import React from 'react';
import { ShieldCheck, Award, FileCheck2, Sparkles, ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-850">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-slate-900/0 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 mb-5 font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Showroom Mobil Premium Singapura</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Koleksi Mobil Mewah & Pre-Owned <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Terbaik di Singapura</span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Jelajahi inventaris kendaraan berkelas lengkap dengan transparansi harga <strong>SGD ($) Nett</strong>, riwayat COE, estimasi depresiasi tahunan, dan sertifikasi inspeksi 100 titik.
          </p>

          {/* Quick CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#katalog"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              <span>Jelajahi Katalog Mobil</span>
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            </a>
            <a
              href="https://wa.me/6581234567?text=Halo%20Apex%20Auto,%20saya%20ingin%20konsultasi%20stok%20mobil%20dan%20skema%20kredit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-850 border border-slate-700 text-slate-200 font-medium px-5 py-3 rounded-xl transition-colors"
            >
              Konsultasi COE & Kredit
            </a>
          </div>
        </div>

        {/* 4 Trust Value Pillars */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4.5 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-semibold text-slate-100 text-sm">Inspeksi 100 Titik</div>
            <div className="text-xs text-slate-400 mt-1 leading-normal">Bebas kecelakaan berat & banjir, tersertifikasi teknisi ahli Singapura.</div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4.5 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="font-semibold text-slate-100 text-sm">Transparansi COE & Harga</div>
            <div className="text-xs text-slate-400 mt-1 leading-normal">Semua harga tercantum dalam SGD transparan tanpa biaya tersembunyi.</div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4.5 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div className="font-semibold text-slate-100 text-sm">Garansi Showroom</div>
            <div className="text-xs text-slate-400 mt-1 leading-normal">Perlindungan mesin & transmisi 12-24 bulan untuk setiap unit pre-owned.</div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-4.5 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-semibold text-slate-100 text-sm">Bunga Kredit Rendah</div>
            <div className="text-xs text-slate-400 mt-1 leading-normal">Bekerjasama dengan bank terkemuka di Singapura (DBS, OCBC, UOB).</div>
          </div>
        </div>
      </div>
    </section>
  );
}
