import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MOCK_CARS } from '@/data/mock-cars';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CarDetailGallery } from '@/components/CarDetailGallery';
import {
  Calendar,
  Gauge,
  Cog,
  Fuel,
  MapPin,
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldCheck,
  ChevronLeft,
  Share2,
  FileCheck,
  BadgeDollarSign,
  Award,
} from 'lucide-react';

interface CarDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return MOCK_CARS.map((car) => ({
    id: car.id,
  }));
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = MOCK_CARS.find((c) => c.id === id);

  if (!car) {
    return {
      title: 'Mobil Tidak Ditemukan — Apex Auto Singapore',
    };
  }

  return {
    title: `${car.brand} ${car.model} (${car.year}) — SGD $${car.price.toLocaleString('en-US')} | Apex Auto SG`,
    description: `Spesifikasi lengkap, foto galeri, dan harga SGD Nett untuk ${car.brand} ${car.model} (${car.year}). Kondisi showroom terawat dengan sertifikasi inspeksi LTA resmi.`,
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const car = MOCK_CARS.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  const waText = encodeURIComponent(
    `Halo Apex Auto Singapore, saya tertarik dengan mobil ${car.brand} ${car.model} (${car.year}) seharga SGD $${car.price.toLocaleString('en-US')} (Ref: ${car.id}). Bisakah informasi ketersediaan unit dan jadwal test drive?`
  );
  const waUrl = `https://wa.me/6581234567?text=${waText}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-slate-400">
            <Link
              href="/#katalog"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali ke Katalog Mobil</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">ID Unit:</span>
              <code className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
                {car.id}
              </code>
            </div>
          </div>

          {/* Title and Top Highlights */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-850">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                  {car.brand}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {car.body_type} • Tahun {car.year}
                </span>
                {car.is_featured && (
                  <span className="bg-amber-500 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                    Unggulan
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {car.model}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{car.location}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> LTA Approved & Inspected
                </span>
              </div>
            </div>

            {/* Price & Status Block */}
            <div className="flex flex-col sm:flex-row lg:flex-col sm:items-end gap-2 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl lg:min-w-[280px]">
              <div className="text-xs text-slate-400">Harga Jual Nett (SGD)</div>
              <div className="text-3xl font-black text-white">
                SGD ${car.price.toLocaleString('en-US')}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Termasuk COE, GST & Transfer LTA
              </div>
              {car.depreciation_sgd && (
                <div className="text-xs text-amber-300 font-semibold mt-1">
                  Est. Depresiasi: SGD ${car.depreciation_sgd.toLocaleString('en-US')}/tahun
                </div>
              )}
            </div>
          </div>

          {/* 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Gallery & Details (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Photo Gallery Component */}
              <CarDetailGallery images={car.images} alt={`${car.brand} ${car.model}`} />

              {/* Quick Specs Matrix */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg">
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  Spesifikasi Kendaraan
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      Tahun Pembuatan
                    </div>
                    <div className="text-sm font-bold text-white">{car.year}</div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Gauge className="w-3.5 h-3.5 text-amber-500" />
                      Jarak Tempuh
                    </div>
                    <div className="text-sm font-bold text-white">
                      {car.mileage_km.toLocaleString('en-US')} km
                    </div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Cog className="w-3.5 h-3.5 text-amber-500" />
                      Transmisi
                    </div>
                    <div className="text-sm font-bold text-white">{car.transmission}</div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Fuel className="w-3.5 h-3.5 text-amber-500" />
                      Bahan Bakar
                    </div>
                    <div className="text-sm font-bold text-white">{car.fuel_type}</div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <BadgeDollarSign className="w-3.5 h-3.5 text-amber-500" />
                      COE Expiry
                    </div>
                    <div className="text-sm font-bold text-white">
                      {car.coe_expiry || '10 Tahun'}
                    </div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Warna Eksterior
                    </div>
                    <div className="text-sm font-bold text-white truncate">{car.color}</div>
                  </div>
                </div>
              </div>

              {/* Story / Description */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg">
                <h2 className="text-base font-bold text-white mb-3">
                  Deskripsi & Riwayat Kendaraan
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-5 rounded-2xl border border-slate-800/70">
                  {car.description}
                </p>
              </div>

              {/* Features & Amenities */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg">
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Fitur & Kelengkapan Pabrikan
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 bg-slate-950/60 px-4 py-3 rounded-xl border border-slate-800/70 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Contact & Showroom Card (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* WhatsApp & Fast Contact Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24 space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                    Status Ketersediaan
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-white capitalize">
                      {car.status === 'available'
                        ? 'Tersedia di Showroom'
                        : car.status === 'reserved'
                        ? 'Dalam Proses Reservasi'
                        : 'Sudah Terjual'}
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp Action */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Hubungi Sales via WhatsApp</span>
                </a>

                <div className="text-center">
                  <span className="text-xs text-slate-500">atau hubungi telepon showroom</span>
                  <a
                    href="tel:+6581234567"
                    className="flex items-center justify-center gap-2 mt-2 py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>+65 8123 4567 (Hotline)</span>
                  </a>
                </div>

                {/* Showroom Location Summary */}
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-xs space-y-2">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lokasi Unit Ini:</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{car.location}</p>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-850">
                    Buka setiap hari untuk inspeksi fisik & konsultasi pembiayaan COE.
                  </div>
                </div>

                {/* Financial Simulation Snippet */}
                {car.monthly_est_sgd && (
                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-xs">
                    <div className="text-slate-400 mb-1">Simulasi Angsuran Bulanan</div>
                    <div className="text-lg font-extrabold text-white">
                      SGD ${car.monthly_est_sgd.toLocaleString('en-US')} / bulan
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Asumsi DP 30%, bunga 2.28% p.a., tenor maksimal 7 tahun.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
