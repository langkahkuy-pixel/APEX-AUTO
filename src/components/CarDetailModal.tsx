'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Car } from '@/types/car';
import {
  X,
  Fuel,
  Gauge,
  Cog,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  FileText,
  BadgeDollarSign,
} from 'lucide-react';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
}

export function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!car) return null;

  const currentImage = car.images[activeImageIndex] || car.images[0];

  const waText = encodeURIComponent(
    `Halo Apex Auto Singapore, saya tertarik dengan mobil ${car.brand} ${car.model} (${car.year}) seharga SGD $${car.price.toLocaleString('en-US')}. Bisakah jadwalkan test drive atau info detail simulasi kredit?`
  );
  const waUrl = `https://wa.me/6581234567?text=${waText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 text-white max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-10 backdrop-blur-sm">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              {car.brand}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              {car.model} ({car.year})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              {currentImage && (
                <Image
                  src={currentImage.url}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {car.status === 'available' ? 'Tersedia' : car.status === 'reserved' ? 'Dipesan' : 'Terjual'}
                </span>
                {car.is_featured && (
                  <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Unggulan
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Selector */}
            {car.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {car.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      idx === activeImageIndex
                        ? 'border-amber-500 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Financial Summary */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-slate-400 font-medium">Harga Jual Nett (SGD)</div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                SGD ${car.price.toLocaleString('en-US')}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Termasuk COE & GST
              </div>
            </div>

            {car.depreciation_sgd && (
              <div>
                <div className="text-xs text-slate-400 font-medium">Estimasi Depresiasi</div>
                <div className="text-xl font-bold text-amber-400 mt-1">
                  SGD ${car.depreciation_sgd.toLocaleString('en-US')} / thn
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Perkiraan biaya tahunan</div>
              </div>
            )}

            {car.monthly_est_sgd && (
              <div>
                <div className="text-xs text-slate-400 font-medium">Est. Angsuran Bulanan</div>
                <div className="text-xl font-bold text-slate-200 mt-1">
                  SGD ${car.monthly_est_sgd.toLocaleString('en-US')} / bln
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Skema DP 30% tenor 7 thn</div>
              </div>
            )}
          </div>

          {/* Specification Matrix */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              Spesifikasi Lengkap Kendaraan
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> Tahun Pembuatan
                </div>
                <div className="text-sm font-semibold text-white">{car.year}</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                  <Gauge className="w-3.5 h-3.5 text-amber-500" /> Jarak Tempuh
                </div>
                <div className="text-sm font-semibold text-white">{car.mileage_km.toLocaleString('en-US')} km</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                  <Cog className="w-3.5 h-3.5 text-amber-500" /> Transmisi
                </div>
                <div className="text-sm font-semibold text-white">{car.transmission}</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                  <Fuel className="w-3.5 h-3.5 text-amber-500" /> Bahan Bakar
                </div>
                <div className="text-sm font-semibold text-white">{car.fuel_type}</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                  <BadgeDollarSign className="w-3.5 h-3.5 text-amber-500" /> Masa Berlaku COE
                </div>
                <div className="text-sm font-semibold text-white">{car.coe_expiry || 'Hingga 10 Tahun'}</div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Lokasi Showroom
                </div>
                <div className="text-sm font-semibold text-white truncate">{car.location}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">Deskripsi & Riwayat Mobil</h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              {car.description}
            </p>
          </div>

          {/* Features Highlights */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Kelengkapan & Fitur Unggulan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {car.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-slate-950/50 px-3 py-2 rounded-lg border border-slate-800/80 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-10 backdrop-blur-sm">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Tertarik dengan unit ini? Tim konsultan kami siap melayani penjadwalan test drive dan hitungan kredit.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/3 sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition-colors"
            >
              Tutup
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-2/3 sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/40 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Sales via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
