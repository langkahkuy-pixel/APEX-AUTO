'use client';

import { whatsappUrl } from '@/lib/locale';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactShowroomSection } from '@/components/ContactShowroomSection';
import {
  ShieldCheck,
  Award,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Eye,
  Target,
  Building2,
  MessageCircle,
  Gauge,
  Search,
  Scale,
  HeartHandshake,
  ChevronRight,
  Check,
} from 'lucide-react';

/* ───── 100-Point Inspection Data (Concise & Clear) ───── */
const INSPECTION_PHASES = [
  {
    num: '01',
    id: 'exterior',
    title: "Bodi & Rangka",
    icon: Search,
    desc: "Pemeriksaan rangka, keselarasan panel, dan ketebalan cat untuk mengetahui kondisi bodi serta indikasi perbaikan sebelumnya.",
    points: [
      "Pemeriksaan ketebalan cat",
      "Pemeriksaan keselarasan rangka dan bodi",
    ],
  },
  {
    num: '02',
    id: 'drivetrain',
    title: "Mesin & Transmisi",
    icon: Gauge,
    desc: "Diagnostik OBD, pemeriksaan mesin, kebocoran, dan kerja transmisi untuk memastikan kondisi unit sebelum serah terima.",
    points: [
      "Diagnostik sistem ECU dan OBD",
      "Pemeriksaan transmisi dan kompresi mesin",
    ],
  },
  {
    num: '03',
    id: 'cabin',
    title: "Kabin & Elektronik",
    icon: Sparkles,
    desc: "Pemeriksaan jok, layar, AC, kelistrikan, kamera, dan fitur keselamatan yang tersedia pada setiap unit.",
    points: [
      "Pemeriksaan fitur bantuan pengemudi",
      "Pemeriksaan kamera dan pendingin kabin",
    ],
  },
  {
    num: '04',
    id: 'undercarriage',
    title: "Kaki-kaki & Keselamatan",
    icon: ShieldCheck,
    desc: "Pemeriksaan suspensi, bushing, rem, bagian bawah kendaraan, serta indikasi bekas banjir dan benturan.",
    points: [
      "Pemeriksaan suspensi dan peredam",
      "Pemeriksaan cakram dan kampas rem",
    ],
  },
  {
    num: '05',
    id: 'documentation',
    title: "Dokumen & Pajak",
    icon: FileCheck2,
    desc: "Pemeriksaan kecocokan nomor rangka dan mesin dengan STNK/BPKB, status pajak kendaraan, serta catatan servis sebelum transaksi.",
    points: [
      "Pencocokan STNK, BPKB, nomor rangka dan mesin",
      "Pemeriksaan pajak dan riwayat servis",
    ],
  },
];

/* ───── Core Values Data (Concise & Clear) ───── */
const CORE_VALUES = [
  {
    icon: Scale,
    title: "Harga Rupiah yang Jelas",
    desc: "Harga tunai, komponen total DP, angsuran, asuransi, dan biaya administrasi dijelaskan sebelum pembeli menyetujui transaksi.",
    tag: "Biaya Dijelaskan di Awal",
  },
  {
    icon: FileCheck2,
    title: "Riwayat Kendaraan",
    desc: "Riwayat servis, kilometer, dan kelengkapan dokumen ditinjau agar Anda dapat mengambil keputusan dengan informasi yang jelas.",
    tag: "STNK & BPKB",
  },
  {
    icon: HeartHandshake,
    title: "Konsultasi Pembelian",
    desc: "Tim kami membantu memilih mobil sesuai kebutuhan, menghitung rencana pembayaran, dan mendampingi pengajuan kredit atau tukar tambah.",
    tag: "Mengutamakan Pembeli",
  },
  {
    icon: Award,
    title: "Pemeriksaan Menyeluruh",
    desc: "Setiap unit diperiksa sebelum ditawarkan dan hasilnya dapat dikonsultasikan bersama tim showroom.",
    tag: "Mobil Pilihan",
  },
];

/* ───── Banking Partners (Concise & Clear) ───── */
const BANK_PARTNERS = [
  {
    name: "Kredit melalui Bank",
    rate: "Simulasi sesuai profil",
    desc: "Konsultasikan kebutuhan DP dan angsuran. Dokumen pengajuan dapat mencakup KTP, KK, NPWP, serta bukti penghasilan sesuai ketentuan bank.",
  },
  {
    name: "Pembiayaan Leasing",
    rate: "Pilihan tenor bertahap",
    desc: "Pilih tenor sesuai kebutuhan. Survei, bunga, asuransi, dan persetujuan mengikuti kebijakan perusahaan pembiayaan.",
  },
  {
    name: "Pembelian Tunai",
    rate: "Negosiasi langsung",
    desc: "Sepakati harga dan rincian biaya, periksa unit serta dokumen, kemudian lakukan pembayaran dan serah terima melalui showroom.",
  },
];

export default function AboutPage() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-16" />

      {/* ── 1. Page Header / Hero Section ── */}
      <section className="py-12 sm:py-16 border-b border-zinc-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="inline-flex items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-zinc-800 font-medium">Tentang Kami</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tentang Apex Auto</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
              Showroom Mobil Premium Pilihan di Medan
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 mt-4 leading-relaxed max-w-2xl">
              Apex Auto membantu Anda menemukan mobil premium bekas dengan kondisi, dokumen, dan harga yang jelas. Tersedia pilihan tunai, kredit, serta tukar tambah.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span>Lihat Pilihan Mobil</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact-showroom"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-sm border border-zinc-200 shadow-xs transition-colors"
              >
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Kunjungi Showroom</span>
              </Link>
              <a
                href={whatsappUrl("Halo Apex Auto Medan, saya ingin bertanya tentang pilihan mobil")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Hubungi WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Key Metrics ── */}
      <section className="py-10 bg-[#FAFAFA] border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums">
                500<span className="text-amber-500">+</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Mobil Diserahkan
              </p>
              <p className="text-xs text-zinc-400 mt-1">Mobil premium pilihan</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums">
                15<span className="text-amber-500">+</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Tahun Pengalaman
              </p>
              <p className="text-xs text-zinc-400 mt-1">Melayani sejak 2010</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums flex items-center gap-1">
                4.9<span className="text-amber-500 text-2xl">★</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Penilaian Pelanggan
              </p>
              <p className="text-xs text-zinc-400 mt-1">Pengalaman pelanggan showroom</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums">
                1 <span className="text-amber-500 text-lg font-bold">Utama</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Showroom
              </p>
              <p className="text-xs text-zinc-400 mt-1">Medan, Sumatera Utara</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Corporate Philosophy & Core Values ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Prinsip Kami
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Jujur dari Awal sampai Serah Terima
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Kondisi unit, harga, dan rincian biaya dibahas dengan jelas. Anda mendapat ruang untuk memeriksa kendaraan dan mempertimbangkan pilihan.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5 text-amber-600">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-2">
                Visi Kami
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                Menjadi showroom mobil premium pilihan di Medan yang dipercaya karena transparansi kondisi kendaraan dan pelayanan yang mengutamakan pembeli.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
                {["Showroom Mobil Pilihan", "Harga Rupiah", "Mengutamakan Pembeli"].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-500" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5 text-amber-600">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-2">
                Misi Kami
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                Menyediakan mobil premium yang diperiksa menyeluruh, didukung informasi STNK/BPKB dan pajak, serta pilihan pembayaran yang sesuai kebutuhan pembeli.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
                {["Pemeriksaan 100 Titik", "Kondisi Diperiksa", "Pilihan Kredit"].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Core Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 inline-block mb-2">
                      {val.tag}
                    </span>
                    <h4 className="font-semibold text-zinc-900 text-base mb-2">
                      {val.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Certified 100-Point Inspection Protocol ── */}
      <section className="py-16 sm:py-20 bg-white border-y border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Pemeriksaan Kondisi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Pemeriksaan 100 Titik
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Pemeriksaan dilakukan dalam lima kelompok sebelum unit ditawarkan, dari kondisi bodi hingga dokumen kendaraan.
            </p>
          </div>

          {/* 5 Numbered Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
            {INSPECTION_PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isSelected = activePhaseIndex === idx;

              return (
                <div
                  key={phase.num}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-50/60 border-amber-500 shadow-sm'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xl font-bold ${isSelected ? 'text-amber-600' : 'text-zinc-400'}`}>
                        {phase.num}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-zinc-900 text-sm mb-2">
                      {phase.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                      {phase.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-zinc-100 space-y-1.5">
                    {phase.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-600">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warranty Banner (Warm Light Theme - No Black Background) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900">
                  Periksa Kondisi dan Ketentuan Garansi
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl leading-relaxed">
                  Kondisi mesin, transmisi, dan indikasi banjir atau kecelakaan diperiksa. Cakupan garansi setiap unit dijelaskan sebelum pembelian.
                </p>
              </div>
            </div>
            <a
              href={whatsappUrl("Halo Apex Auto Medan, saya ingin bertanya tentang garansi dan pemeriksaan unit")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-xs shrink-0"
            >
              <span>Tanya Garansi</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <ContactShowroomSection />

      {/* ── 6. Strategic Banking Alliances ── */}
      <section className="py-16 sm:py-20 bg-white border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Kredit
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Pilihan Cara Pembayaran
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Sesuaikan pembelian dengan kebutuhan Anda. Tim kami menjelaskan harga tunai, pengajuan kredit bank/leasing, DP, tenor, dan proses serah terima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {BANK_PARTNERS.map((bank) => (
              <div
                key={bank.name}
                className="rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-zinc-900 text-base">{bank.name}</h4>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {bank.rate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {bank.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Final Call to Action Banner (Light & Clean - No Black Background) */}
          <div className="rounded-3xl bg-gradient-to-b from-white to-zinc-50 border border-zinc-200 p-8 sm:p-12 text-center shadow-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Siap Punya Mobil Pilihan?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-2">
              Temukan Mobil untuk Perjalanan Berikutnya
            </h3>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto mb-8 leading-relaxed">
              Lihat koleksi kami atau jadwalkan kunjungan untuk memeriksa unit, berdiskusi tentang harga, dan menyusun rencana pembelian.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span>Lihat Pilihan Mobil</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#contact-showroom"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-sm border border-zinc-200 shadow-xs transition-colors"
              >
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Kunjungi Showroom</span>
              </Link>
              <a
                href={whatsappUrl("Halo Apex Auto Medan, saya ingin bertanya tentang pilihan mobil")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Hubungi WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Light Theme Footer */}
      <Footer />
    </main>
  );
}
