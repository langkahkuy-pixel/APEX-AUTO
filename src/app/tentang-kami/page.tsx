'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  ShieldCheck,
  Award,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Eye,
  Target,
  Heart,
  Building2,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  TrendingDown,
  Banknote,
  CheckCircle2,
  Star,
  Users,
  Car,
  BadgeCheck,
  Wrench,
  Search,
  Gem,
  Scale,
  Handshake,
  ChevronRight,
  Globe,
  Landmark,
  CircleDollarSign,
  ThumbsUp,
  CalendarCheck,
  HeartHandshake,
  Gauge,
} from 'lucide-react';

/* ───── Animated Counter with IntersectionObserver ───── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: string;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${visible ? 'animate-count-up' : 'opacity-0 scale-50'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">
        {value}
        {suffix && <span className="text-amber-400 text-xl ml-0.5">{suffix}</span>}
      </div>
      <div className="text-[11px] text-slate-400 mt-1.5 font-medium tracking-wide uppercase leading-tight">
        {label}
      </div>
    </div>
  );
}

/* ───── Section Wrapper with fade-up on scroll ───── */
function RevealSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ───── Inspection Steps Data ───── */
const INSPECTION_STEPS = [
  {
    num: '01',
    title: 'Pemeriksaan Eksterior & Bodi',
    desc: 'Inspeksi menyeluruh panel bodi, pengecatan, kaca, lampu, dan periksa riwayat tabrakan atau perbaikan bodi dengan alat pengukur ketebalan cat profesional.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Mesin & Drivetrain',
    desc: 'Diagnosa komputer OBD-II lengkap, uji kompresi silinder, periksa kebocoran oli dan cairan, serta tes performa transmisi otomatis/manual.',
    icon: Gauge,
  },
  {
    num: '03',
    title: 'Interior & Elektronik',
    desc: 'Inspeksi kondisi jok, dashboard, sistem infotainment, AC, sensor parkir, kamera 360°, dan seluruh fungsi elektronik kabin.',
    icon: Sparkles,
  },
  {
    num: '04',
    title: 'Undercarriage & Safety',
    desc: 'Pemeriksaan kaki-kaki, rem, suspensi, ban, riwayat banjir, serta verifikasi kelengkapan fitur keselamatan aktif dan pasif.',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'Dokumentasi & Sertifikasi',
    desc: 'Verifikasi riwayat kepemilikan LTA, status COE, catatan servis resmi dealer, dan penerbitan Sertifikat Inspeksi Apex Auto.',
    icon: FileCheck2,
  },
];

/* ───── Showroom Locations ───── */
const SHOWROOMS = [
  {
    name: 'Leng Kee Flagship Showroom',
    role: 'Pusat pameran dan penjualan kendaraan mewah utama',
    address: '24 Leng Kee Road, Singapore 159096',
    hours: 'Mon–Sat: 09:00–19:00 • Sun: 10:00–18:00',
    phone: '+65 8123 4567',
    mapUrl: 'https://maps.google.com/?q=24+Leng+Kee+Road+Singapore',
    tag: 'Flagship',
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1562519776-b232435d8bfc?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ubi Car Hub',
    role: 'Pusat inventaris kendaraan pre-owned pilihan',
    address: '10 Ubi Crescent, Ubi Techpark, Singapore 408564',
    hours: 'Mon–Sat: 09:30–18:30 • Sun: By Appointment',
    phone: '+65 8234 5678',
    mapUrl: 'https://maps.google.com/?q=10+Ubi+Crescent+Singapore',
    tag: 'Pre-Owned',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Sin Ming Service & Delivery Hub',
    role: 'Pusat servis berkala dan serah terima kendaraan',
    address: '20 Sin Ming Lane, Midview City, Singapore 573968',
    hours: 'Mon–Sat: 08:30–18:00 • Sun: Closed',
    phone: '+65 8345 6789',
    mapUrl: 'https://maps.google.com/?q=20+Sin+Ming+Lane+Singapore',
    tag: 'Service',
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
  },
];

/* ───── Banking Partners ───── */
const BANK_PARTNERS = [
  { name: 'DBS Bank', desc: 'Car Financing mulai 1.88% p.a.' },
  { name: 'OCBC Bank', desc: 'Flexi-Loan hingga 7 tahun tenor' },
  { name: 'UOB Bank', desc: 'Green Vehicle Financing EV/Hybrid' },
];

export default function AboutPage() {
  const tagColors: Record<string, string> = {
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO & COMPANY INTRODUCTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-slate-950">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80"
            alt="About Apex Auto Singapore"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        <div className="absolute inset-0 noise pointer-events-none z-[2]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="animate-fade-up flex items-center gap-2 text-[11px] text-slate-500 mb-6">
              <Link href="/" className="hover:text-amber-400 transition-colors">Beranda</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-300">Tentang Kami</span>
            </nav>

            {/* Badge */}
            <div className="animate-fade-up delay-100 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] text-amber-400/90 font-medium tracking-wide">
                <BadgeCheck className="w-3.5 h-3.5" />
                Singapore Automotive Dealer Registry &bull; UEN: 202012345A
              </div>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-200 text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-black tracking-tight text-white leading-[1.12]">
              Sejak 2010, Menjadi{' '}
              <span className="text-gradient-gold">Standar Baru</span>{' '}
              Showroom Otomotif Singapura
            </h1>

            {/* Description */}
            <p className="animate-fade-up delay-300 mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl">
              Apex Auto Singapore adalah showroom mobil mewah dan pre-owned terdaftar resmi yang berkomitmen pada{' '}
              <strong className="text-white font-semibold">transparansi harga SGD Nett</strong>,{' '}
              <strong className="text-white font-semibold">inspeksi 100 titik bersertifikasi</strong>, dan pelayanan premium sejak lebih dari satu dekade.
            </p>

            {/* CTA */}
            <div className="animate-fade-up delay-400 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/#katalog"
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                Jelajahi Katalog
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/6581234567?text=Halo%20Apex%20Auto,%20saya%20ingin%20informasi%20tentang%20showroom"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 glass hover:bg-slate-800/80 text-slate-200 font-semibold px-5 py-3 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: STATS BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 -mt-12 mb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-gold rounded-2xl px-6 py-7 sm:px-10 sm:py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              <AnimatedStat value="500+" label="Unit Terjual Sejak 2020" delay={0} />
              <AnimatedStat value="15" suffix=" th" label="Tahun Pengalaman" delay={100} />
              <AnimatedStat value="4.9" suffix="★" label="Rating Google Reviews" delay={200} />
              <AnimatedStat value="3" label="Lokasi di Singapura" delay={300} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: VISI, MISI & CORE VALUES
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection>
            {/* Section Header */}
            <div className="text-center mb-14 sm:mb-18">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] text-amber-400 font-medium tracking-wide mb-4">
                <Target className="w-3.5 h-3.5" />
                Filosofi Perusahaan
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Visi, Misi &amp;{' '}
                <span className="text-gradient-gold">Core Values</span>
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                Setiap keputusan bisnis kami dibangun di atas tiga pilar utama yang menjadikan Apex Auto Singapore sebagai pilihan utama konsumen otomotif di kawasan Asia Tenggara.
              </p>
            </div>
          </RevealSection>

          {/* Vision & Mission */}
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
              {/* Vision */}
              <div className="glass-gold rounded-2xl p-7 sm:p-8 group hover:border-amber-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Visi Kami</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Menjadi <strong className="text-white">showroom otomotif paling terpercaya</strong> di Singapura — di mana setiap pembeli memperoleh kendaraan impian dengan harga yang transparan, kualitas yang terjamin, dan pengalaman membeli yang melampaui ekspektasi.
                </p>
              </div>

              {/* Mission */}
              <div className="glass rounded-2xl p-7 sm:p-8 group hover:border-slate-700/60 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Misi Kami</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Menyediakan kendaraan mewah dan pre-owned berkualitas tinggi dengan{' '}
                  <strong className="text-white">standar inspeksi 100 titik</strong>, transparansi penuh atas estimasi depresiasi tahunan dan riwayat COE, serta kemitraan pembiayaan yang menguntungkan bersama bank-bank utama Singapura.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* Core Values Grid */}
          <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Scale,
                  title: 'Transparansi Harga Nett',
                  desc: 'Seluruh harga tercantum dalam SGD Nett — tanpa biaya tersembunyi. Sudah mencakup COE residual dan GST 9% sesuai regulasi IRAS Singapura.',
                  color: 'amber',
                },
                {
                  icon: FileCheck2,
                  title: 'Integritas Riwayat Kendaraan',
                  desc: 'Setiap unit disertai laporan riwayat kepemilikan LTA yang terverifikasi, estimasi depresiasi tahunan, dan catatan servis resmi dealer.',
                  color: 'emerald',
                },
                {
                  icon: HeartHandshake,
                  title: 'Pelayanan Premium',
                  desc: 'Tim sales konsultatif yang tidak memaksa — kami mendengarkan kebutuhan Anda dan memberikan rekomendasi berdasarkan anggaran serta gaya hidup.',
                  color: 'blue',
                },
                {
                  icon: Gem,
                  title: 'Standar Kualitas Unggul',
                  desc: 'Hanya unit yang lolos inspeksi 100 titik oleh teknisi bersertifikat yang layak dipasarkan di showroom Apex Auto Singapore.',
                  color: 'purple',
                },
              ].map((value) => {
                const iconBg: Record<string, string> = {
                  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
                  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
                };
                return (
                  <div
                    key={value.title}
                    className="glass rounded-2xl p-5 sm:p-6 hover:border-slate-700/60 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${iconBg[value.color]} border flex items-center justify-center mb-3`}>
                      <value.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1.5">{value.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: STANDAR KUALITAS & INSPEKSI 100 TITIK
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 divider-gold" />
        <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] text-emerald-400 font-medium tracking-wide mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Pre-Owned Certification
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Inspeksi{' '}
                <span className="text-gradient-gold">100 Titik</span>{' '}
                Bersertifikasi
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                Setiap unit kendaraan yang memasuki inventaris Apex Auto wajib melewati proses sertifikasi ketat oleh teknisi ahli Singapura berpengalaman — menjamin kualitas yang tidak pernah dikompromikan.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {INSPECTION_STEPS.map((step, i) => (
              <RevealSection key={step.num}>
                <div className="glass rounded-2xl p-5 sm:p-6 hover:border-emerald-500/20 transition-all duration-300 group h-full">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black text-gradient-gold opacity-60">{step.num}</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <step.icon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2 leading-snug">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Guarantee Bar */}
          <RevealSection className="mt-8">
            <div className="glass-gold rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-base mb-1">Garansi Showroom 12–24 Bulan</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Setiap unit pre-owned yang lolos sertifikasi dilindungi oleh{' '}
                  <strong className="text-white">garansi mesin dan transmisi selama 12 hingga 24 bulan</strong>{' '}
                  — menjamin ketenangan pikiran Anda setelah pembelian. Kami jamin bahwa setiap unit{' '}
                  <strong className="text-emerald-400">bebas dari kecelakaan berat dan bebas banjir</strong>.
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: JARINGAN SHOWROOM & HUB LAYANAN
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 divider-gold" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[400px] bg-blue-500/3 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] text-blue-400 font-medium tracking-wide mb-4">
                <Building2 className="w-3.5 h-3.5" />
                3 Lokasi Strategis
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Jaringan Showroom &amp;{' '}
                <span className="text-gradient-gold">Hub Layanan</span>
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                Berlokasi strategis di tiga titik utama Singapura, setiap hub kami dirancang untuk memberikan pengalaman otomotif premium yang komprehensif.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {SHOWROOMS.map((showroom, i) => (
              <RevealSection key={showroom.name}>
                <div className="glass rounded-2xl overflow-hidden hover:border-slate-700/60 transition-all duration-500 group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={showroom.image}
                      alt={showroom.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${tagColors[showroom.color]}`}>
                        {showroom.tag}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-white text-base mb-1">{showroom.name}</h3>
                    <p className="text-xs text-amber-400/80 font-medium mb-3">{showroom.role}</p>

                    <div className="space-y-2 flex-1">
                      <p className="flex items-start gap-2 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        {showroom.address}
                      </p>
                      <p className="flex items-start gap-2 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        {showroom.hours}
                      </p>
                      <p className="flex items-start gap-2 text-xs text-slate-400">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        {showroom.phone}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-800/50">
                      <a
                        href={`https://wa.me/${showroom.phone.replace(/[^0-9]/g, '')}?text=Halo%20Apex%20Auto%20${encodeURIComponent(showroom.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-semibold text-[11px] px-3 py-2 rounded-lg transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                      <a
                        href={showroom.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 font-semibold text-[11px] px-3 py-2 rounded-lg transition-all"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Directions
                      </a>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: KEMITRAAN PEMBIAYAAN & KEPERCAYAAN PELANGGAN
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 divider-gold" />
        <div className="absolute bottom-20 right-[15%] w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] text-purple-400 font-medium tracking-wide mb-4">
                <Landmark className="w-3.5 h-3.5" />
                Kemitraan Strategis
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Pembiayaan &amp;{' '}
                <span className="text-gradient-gold">Kepercayaan</span>
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                Apex Auto Singapore bermitra resmi dengan institusi perbankan terkemuka untuk menawarkan fasilitas kredit kendaraan dengan bunga kompetitif dan proses persetujuan yang cepat.
              </p>
            </div>
          </RevealSection>

          {/* Bank Partners */}
          <RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {BANK_PARTNERS.map((bank, i) => (
                <div
                  key={bank.name}
                  className="glass rounded-2xl p-6 text-center hover:border-purple-500/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center mx-auto mb-4 group-hover:border-amber-500/20 transition-colors">
                    <Landmark className="w-6 h-6 text-amber-400/70" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{bank.name}</h4>
                  <p className="text-xs text-slate-400">{bank.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Trust Signals */}
          <RevealSection>
            <div className="glass-gold rounded-2xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-white mb-1">Mengapa Pelanggan Mempercayai Kami</h3>
                <p className="text-xs text-slate-400">Divalidasi oleh ratusan pembeli sejak 2010</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {[
                  { icon: ThumbsUp, value: '98%', label: 'Tingkat Kepuasan', color: 'text-emerald-400' },
                  { icon: CalendarCheck, value: '48 Jam', label: 'Rata-Rata Serah Terima', color: 'text-blue-400' },
                  { icon: CircleDollarSign, value: '1.88%', label: 'Bunga Kredit Terendah', color: 'text-amber-400' },
                  { icon: Users, value: '12', label: 'Konsultan Berpengalaman', color: 'text-purple-400' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2 opacity-80`} />
                    <div className="text-xl sm:text-2xl font-black text-white">{item.value}</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-wider leading-tight">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Final CTA */}
          <RevealSection className="mt-12 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Siap menemukan kendaraan impian Anda?
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
              Jelajahi katalog kami atau hubungi tim konsultan untuk penjadwalan test drive dan konsultasi gratis.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#katalog"
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                Jelajahi Katalog Mobil
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/6581234567?text=Halo%20Apex%20Auto,%20saya%20ingin%20jadwalkan%20kunjungan%20showroom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/20 text-emerald-400 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Jadwalkan Kunjungan
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
