'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MOCK_PROMOS } from '@/data/mock-promos';
import { PromoItem } from '@/types/promo';
import {
  Tag,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  FileText,
  Info,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export function PromoSection() {
  const [selectedPromo, setSelectedPromo] = useState<PromoItem | null>(null);

  return (
    <section id="promo" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Program Penawaran Spesial Singapura</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Promo Eksklusif & Subsidi Showroom
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Hemat biaya kepemilikan mobil mewah dengan paket subsidi lelang COE, suku bunga kredit istimewa, dan paket insentif kendaraan teregulasi resmi Singapura.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 w-fit">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Kuota terbatas per bulan pembiayaan</span>
          </div>
        </div>

        {/* Spot Promo Unggulan Utama (Featured Spotlight) */}
        {(() => {
          const featured = MOCK_PROMOS.find((p) => p.is_featured) || MOCK_PROMOS[0];
          const waUrl = `https://wa.me/6581234567?text=${encodeURIComponent(featured.cta_whatsapp_text)}`;

          return (
            <div className="mb-14 relative rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border-2 border-amber-500/40 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-amber-500/10 overflow-hidden">
              {/* Glow badge corner */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left image highlight (5 cols) */}
                <div className="lg:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-xl border border-slate-800 group">
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>PROMO UNGGULAN</span>
                    </span>
                    {featured.discount_sgd && (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-white shadow-lg">
                        HEMAT S${featured.discount_sgd.toLocaleString('en-US')}
                      </span>
                    )}
                  </div>

                  {/* Expiry Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                    <span className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Berlaku hingga: {featured.valid_until}</span>
                    </span>
                  </div>
                </div>

                {/* Right Info & Actions (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>Spotlight Penawaran Terpanas Showroom</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      {featured.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {featured.description}
                    </p>
                  </div>

                  {/* Benefit highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {featured.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{featured.cta_text}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedPromo(featured)}
                      className="inline-flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
                    >
                      <Info className="w-4 h-4" />
                      <span>Detail & Syarat Ketentuan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Section Sub-header for other promos */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400" />
            <span>Koleksi Paket Promo & Insentif Lainnya</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">4 Program Aktif</span>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_PROMOS.map((promo) => {
            const waText = encodeURIComponent(promo.cta_whatsapp_text);
            const waUrl = `https://wa.me/6581234567?text=${waText}`;

            return (
              <div
                key={promo.id}
                className="group bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Promo Image & Banner Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={promo.image_url}
                      alt={promo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500 text-slate-950 shadow-md">
                        {promo.badge}
                      </span>
                      {promo.discount_sgd && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-emerald-500/90 backdrop-blur-sm text-white shadow-md">
                          Hemat S${promo.discount_sgd.toLocaleString('en-US')}
                        </span>
                      )}
                    </div>

                    {/* Expiry Pill */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                      <span className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Berlaku hingga: {promo.valid_until}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                        {promo.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {promo.tagline}
                      </p>
                    </div>

                    {/* Benefit Checklist */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Keuntungan Utama Promo:
                      </div>
                      <ul className="space-y-1.5">
                        {promo.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 sm:p-7 pt-0 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{promo.cta_text}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedPromo(promo)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Syarat & Ketentuan</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terms & Details Modal */}
      {selectedPromo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPromo(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {selectedPromo.badge}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">{selectedPromo.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Periode promo: {selectedPromo.valid_until}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPromo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
              {selectedPromo.description}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Ketentuan & Persyaratan Klaim:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400 pl-2">
                {selectedPromo.terms_conditions.map((term, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedPromo(null)}
                className="text-xs text-slate-400 hover:text-white font-medium px-4 py-2"
              >
                Tutup
              </button>
              <a
                href={`https://wa.me/6581234567?text=${encodeURIComponent(selectedPromo.cta_whatsapp_text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Klaim ke Sales WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
