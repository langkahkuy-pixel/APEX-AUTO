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
    title: 'Exterior & Bodywork Inspection',
    desc: 'Comprehensive panel inspection, paint thickness measurement, glass, lighting, and detailed structural check for prior collision or repair history.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Engine & Drivetrain Diagnostics',
    desc: 'Complete OBD-II computerized system diagnostic, cylinder compression test, fluid leak inspection, and transmission shift calibration analysis.',
    icon: Gauge,
  },
  {
    num: '03',
    title: 'Cabin & Electronics',
    desc: 'Condition review of premium upholstery, dashboard electronics, infotainment display, climate control, parking sensors, and 360° camera array.',
    icon: Sparkles,
  },
  {
    num: '04',
    title: 'Undercarriage & Safety Systems',
    desc: 'Underbody evaluation of suspension arms, bushings, braking assemblies, tyre condition, flood check, and active safety sensor calibration.',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'Documentation & Certification',
    desc: 'Verification of LTA ownership records, COE validity and tenure, dealer service logs, and issuance of the official Apex Auto Certificate of Inspection.',
    icon: FileCheck2,
  },
];

/* ───── Showroom Locations ───── */
const SHOWROOMS = [
  {
    name: 'Leng Kee Flagship Showroom',
    role: 'Principal luxury vehicle gallery & private delivery suite',
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
    role: 'Curated certified pre-owned showroom inventory',
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
    role: 'Scheduled maintenance, technical inspection & handover centre',
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
  { name: 'DBS Bank', desc: 'Auto Financing starting from 1.88% p.a.' },
  { name: 'OCBC Bank', desc: 'Flexi-Loan schemes up to 7-year tenure' },
  { name: 'UOB Bank', desc: 'Green Vehicle Financing for EV & Hybrid' },
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
            alt="About Apex Auto"
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
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-300">About Us</span>
            </nav>

            {/* Badge */}
            <div className="animate-fade-up delay-100 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] text-amber-400/90 font-medium tracking-wide">
                <BadgeCheck className="w-3.5 h-3.5" />
                Licensed Motor Dealer &bull; UEN: 202012345A
              </div>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-200 text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-black tracking-tight text-white leading-[1.12]">
              Since 2010, Setting the{' '}
              <span className="text-gradient-gold">Benchmark</span>{' '}
              for Luxury Automotive Showrooms
            </h1>

            {/* Description */}
            <p className="animate-fade-up delay-300 mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl">
              Apex Auto is a premier licensed luxury and certified pre-owned showroom committed to{' '}
              <strong className="text-white font-semibold">transparent SGD Nett pricing</strong>,{' '}
              <strong className="text-white font-semibold">certified 100-point inspections</strong>, and distinguished automotive advisory for over a decade.
            </p>

            {/* CTA */}
            <div className="animate-fade-up delay-400 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/#katalog"
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                Explore Inventory
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/6581234567?text=Hello%20Apex%20Auto,%20I%20would%20like%20more%20information%20about%20your%20showroom"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 glass hover:bg-slate-800/80 text-slate-200 font-semibold px-5 py-3 rounded-xl transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Contact Advisors
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
              <AnimatedStat value="500+" label="Vehicles Delivered Since 2020" delay={0} />
              <AnimatedStat value="15" suffix=" yrs" label="Showroom Heritage" delay={100} />
              <AnimatedStat value="4.9" suffix="★" label="Google Reviews Rating" delay={200} />
              <AnimatedStat value="3" label="Showroom Hubs" delay={300} />
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
                Corporate Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Vision, Mission &amp;{' '}
                <span className="text-gradient-gold">Core Values</span>
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                Every business decision is grounded in our fundamental commitments that position Apex Auto as a premier destination for discerning motorists.
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
                <h3 className="text-lg font-bold text-white mb-2">Our Vision</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To be the <strong className="text-white">most trusted luxury automotive showroom</strong> — where every client acquires their ideal prestige vehicle through honest transparency, verified provenance, and unparalleled hospitality.
                </p>
              </div>

              {/* Mission */}
              <div className="glass rounded-2xl p-7 sm:p-8 group hover:border-slate-700/60 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Our Mission</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Curate exceptional luxury and pre-owned motorcars with{' '}
                  <strong className="text-white">stringent 100-point inspection standards</strong>, full transparency over annual depreciation and COE tenure, and competitive financing in partnership with premier banks.
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
                  title: 'Transparent SGD Nett Pricing',
                  desc: 'All vehicles quoted in SGD Nett — no hidden administrative surcharges. Comprehensive of residual COE and prevailing GST in full compliance with IRAS regulations.',
                  color: 'amber',
                },
                {
                  icon: FileCheck2,
                  title: 'Verified Vehicle Provenance',
                  desc: 'Every vehicle is accompanied by official LTA ownership verification, annual depreciation calculations, and authenticated agent service logs.',
                  color: 'emerald',
                },
                {
                  icon: HeartHandshake,
                  title: 'Consultative Advisory',
                  desc: 'Non-commissioned advisory approach — our specialists listen to your driving profile and recommend optimal models matched to your lifestyle and budget.',
                  color: 'blue',
                },
                {
                  icon: Gem,
                  title: 'Uncompromised Standards',
                  desc: 'Only motorcars passing our rigorous 100-point mechanical, structural, and cosmetic inspection qualify for presentation in our showrooms.',
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
                Certified{' '}
                <span className="text-gradient-gold">100-Point</span>{' '}
                Inspection
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                Every vehicle entering the Apex Auto inventory undergoes an exhaustive certification process conducted by seasoned master technicians — ensuring uncompromised safety and performance.
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
                <h4 className="font-bold text-white text-base mb-1">12–24 Month Showroom Warranty</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every certified pre-owned vehicle is safeguarded with{' '}
                  <strong className="text-white">12 to 24 months of warranty coverage for engine and transmission</strong>{' '}
                  — guaranteeing total peace of mind post-delivery. We certify that every unit is{' '}
                  <strong className="text-emerald-400">guaranteed accident-free and flood-free</strong>.
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
                3 Strategic Hubs
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Showroom Network &amp;{' '}
                <span className="text-gradient-gold">Service Hubs</span>
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                Conveniently located across major automotive belts, our facilities are equipped to deliver comprehensive sales and aftercare experiences.
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
                        href={`https://wa.me/${showroom.phone.replace(/[^0-9]/g, '')}?text=Hello%20Apex%20Auto%20${encodeURIComponent(showroom.name)}`}
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
                Strategic Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                Financing &amp;{' '}
                <span className="text-gradient-gold">Client Trust</span>
              </h2>
              <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                Apex Auto partners with prominent banking institutions to offer customized vehicle financing with preferential interest rates and expedited 24-hour loan approval.
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
                <h3 className="text-lg font-bold text-white mb-1">Why Discerning Clients Choose Apex Auto</h3>
                <p className="text-xs text-slate-400">Validated by hundreds of prestige motorcar owners since 2010</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {[
                  { icon: ThumbsUp, value: '98%', label: 'Client Satisfaction', color: 'text-emerald-400' },
                  { icon: CalendarCheck, value: '48 Hrs', label: 'Average Handover Time', color: 'text-blue-400' },
                  { icon: CircleDollarSign, value: '1.88%', label: 'Lowest Financing Rate', color: 'text-amber-400' },
                  { icon: Users, value: '12', label: 'Senior Advisors', color: 'text-purple-400' },
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
              Ready to Discover Your Next Motorcar?
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
              Explore our current showroom inventory or speak directly with an advisor for viewing appointments and trade-in valuations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#katalog"
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                Explore Inventory
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/6581234567?text=Hello%20Apex%20Auto,%20I%20would%20like%20to%20schedule%20a%20showroom%20visit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/20 text-emerald-400 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Schedule Private Viewing
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
