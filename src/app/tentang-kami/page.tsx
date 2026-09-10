'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Building2,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  CheckCircle2,
  BadgeCheck,
  Gauge,
  Search,
  Scale,
  HeartHandshake,
  ChevronRight,
  Landmark,
  Compass,
  Check,
  ExternalLink,
  Car,
  Wrench,
  Percent,
} from 'lucide-react';

/* ───── Animated Counter Component ───── */
function AnimatedStat({
  value,
  suffix,
  label,
  sublabel,
  delay = 0,
}: {
  value: string;
  suffix?: string;
  label: string;
  sublabel?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md transition-all duration-700 hover:border-amber-500/30 hover:bg-zinc-900/80 group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums flex items-baseline justify-center gap-0.5">
        <span>{value}</span>
        {suffix && <span className="text-amber-400 text-2xl font-bold">{suffix}</span>}
      </div>
      <div className="text-xs sm:text-sm font-bold text-zinc-200 mt-2 tracking-wide uppercase">
        {label}
      </div>
      {sublabel && (
        <div className="text-[11px] text-zinc-500 mt-1 font-medium">
          {sublabel}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all duration-500" />
    </div>
  );
}

/* ───── 100-Point Inspection Data ───── */
const INSPECTION_PHASES = [
  {
    num: '01',
    id: 'exterior',
    title: 'Exterior & Frame Integrity',
    short: 'Exterior & Frame',
    icon: Search,
    desc: 'Precision paint depth measurement, structural chassis alignment verification, acoustic glass inspection, and computerized check for prior collision repairs.',
    points: [
      'Digital paint gauge depth testing on all panels',
      'Structural unibody & chassis seam laser scan',
      'OEM windshield & acoustic glass validation',
      'Active aerodynamic & panoramic sunroof seal check',
    ],
  },
  {
    num: '02',
    id: 'drivetrain',
    title: 'Engine & Computer Diagnostics',
    short: 'Engine & Diagnostics',
    icon: Gauge,
    desc: 'Complete computerized OBD-II multi-system analysis, cylinder compression pressure testing, turbocharger boost tolerance, and transmission shift calibration.',
    points: [
      'Full-system ECU OBD-II diagnostic fault scan',
      'Engine compression & timing chain analysis',
      'Dual-clutch & automatic gearbox calibration',
      'Exhaust emission compliance & catalytic test',
    ],
  },
  {
    num: '03',
    id: 'cabin',
    title: 'Cabin & Advanced Electronics',
    short: 'Cabin & Electronics',
    icon: Sparkles,
    desc: 'Thorough inspection of bespoke leather trim, digital instrument clusters, multi-zone climate systems, radar-guided ADAS, and 360-degree camera arrays.',
    points: [
      'Radar cruise control & ADAS lane assist test',
      '360° camera array & parking sensor validation',
      'Multi-zone climate & compressor cycle audit',
      'Premium audio & infotainment interface check',
    ],
  },
  {
    num: '04',
    id: 'undercarriage',
    title: 'Undercarriage & Safety Systems',
    short: 'Undercarriage & Safety',
    icon: ShieldCheck,
    desc: 'Hydraulic lift inspection of adaptive air suspension, active dampers, control arm bushings, multi-piston braking rotors, and flood-free underbody verification.',
    points: [
      'Adaptive air suspension & damper integrity check',
      'Brake disc rotor thickness & pad life inspection',
      'Chassis subframe & steering rack bushing review',
      'Water ingress & flood-free undercarriage signoff',
    ],
  },
  {
    num: '05',
    id: 'documentation',
    title: 'Documentation & Handover Protocol',
    short: 'Legal & Certification',
    icon: FileCheck2,
    desc: 'Comprehensive title verification with LTA, guaranteed COE tenure validation, authentic agent service records, and issuance of the Apex Auto Quality Certificate.',
    points: [
      'Official LTA ownership & title verification',
      'COE expiry tenure & residual value calculation',
      'Agent service logbook & mileage authenticity check',
      'Apex Auto Official 100-Point Certificate issuance',
    ],
  },
];

/* ───── Showroom Network Data ───── */
const SHOWROOMS = [
  {
    name: 'Leng Kee Flagship Showroom',
    tag: 'Flagship Gallery',
    role: 'Principal luxury vehicle gallery & private VIP handover lounge',
    address: '24 Leng Kee Road, Singapore 159096',
    hours: 'Mon–Sat: 09:00–19:00 • Sun: 10:00–18:00',
    phone: '+65 8123 4567',
    mapUrl: 'https://maps.google.com/?q=24+Leng+Kee+Road+Singapore',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    highlight: 'Central Luxury Automotive District',
  },
  {
    name: 'Ubi Techpark Showroom',
    tag: 'Certified Pre-Owned',
    role: 'Curated prestige pre-owned inventory & on-site trade-in appraisal',
    address: '10 Ubi Crescent, Ubi Techpark, Singapore 408564',
    hours: 'Mon–Sat: 09:30–18:30 • Sun: By Appointment',
    phone: '+65 8234 5678',
    mapUrl: 'https://maps.google.com/?q=10+Ubi+Crescent+Singapore',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    highlight: 'Eastern Commercial Automotive Hub',
  },
  {
    name: 'Sin Ming Service & Delivery Hub',
    tag: 'Technical & Handover Hub',
    role: 'Pre-delivery inspection, scheduled servicing & warranty handover',
    address: '20 Sin Ming Lane, Midview City, Singapore 573968',
    hours: 'Mon–Sat: 08:30–18:00 • Sun: Closed',
    phone: '+65 8345 6789',
    mapUrl: 'https://maps.google.com/?q=20+Sin+Ming+Lane+Singapore',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    highlight: 'Dedicated Technical & Aftercare Centre',
  },
];


/* ───── Core Values Data ───── */
const CORE_VALUES = [
  {
    icon: Scale,
    title: 'Transparent SGD Nett Pricing',
    desc: 'Every vehicle is quoted in clear SGD Nett with zero surprise administrative fees, full GST inclusion, and clear residual COE calculations.',
    tag: 'Zero Surcharges',
    color: 'amber',
  },
  {
    icon: FileCheck2,
    title: 'Verified Vehicle Provenance',
    desc: 'Each unit is authenticated through official LTA title records, verified mileage logs, and documented authorised agent maintenance histories.',
    tag: 'Accredited History',
    color: 'emerald',
  },
  {
    icon: HeartHandshake,
    title: 'Consultative Advisory',
    desc: 'Non-commissioned luxury automotive specialists evaluate your driving patterns and annual mileage to advise the optimal model and financing fit.',
    tag: 'Client-First',
    color: 'blue',
  },
  {
    icon: Award,
    title: 'Master Quality Benchmarks',
    desc: 'Only motorcars passing our rigorous 100-point mechanical, structural, and cosmetic inspection qualify for presentation in our showrooms.',
    tag: 'Top 5% Selection',
    color: 'purple',
  },
];

/* ───── Banking Partners ───── */
const BANK_PARTNERS = [
  {
    name: 'DBS Bank',
    rate: 'From 1.88% p.a.',
    desc: 'Preferential auto financing with flexible tenure and rapid 24-hour in-principle approval.',
  },
  {
    name: 'OCBC Bank',
    rate: 'Up to 7-Year Tenure',
    desc: 'Customised structured financing with competitive balloon schemes tailored for luxury marques.',
  },
  {
    name: 'UOB Bank',
    rate: 'Green Financing',
    desc: 'Special interest incentives for electric and hybrid luxury vehicles with seamless digital processing.',
  },
];

export default function AboutPage() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  return (
    <main className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: IMMERSIVE LUXURY HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-28 pb-20">
        {/* Background Visual Asset with Cinematic Dark Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80"
            alt="Apex Auto Luxury Showroom Gallery"
            fill
            priority
            className="object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
            sizes="100vw"
          />
          {/* Radial & directional gradient scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center sm:text-left">
          <div className="max-w-3xl mx-auto sm:mx-0">
            {/* Breadcrumb Navigation */}
            <nav className="inline-flex items-center gap-2 text-xs text-zinc-400 mb-6 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-zinc-200 font-medium">About Apex Auto</span>
            </nav>

            {/* Sub-badge */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold tracking-wide">
                <BadgeCheck className="w-3.5 h-3.5" />
                Licensed Motor Dealer &bull; UEN: 202012345A
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Pioneering the Benchmark for{' '}
              <span className="text-gradient-gold">Luxury Automotive</span>{' '}
              Showrooms Since 2010
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
              Apex Auto is Singapore&apos;s trusted gateway for verified prestige motorcars, underpinned by transparent SGD Nett pricing, uncompromising 100-point inspections, and consultative advisory.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center justify-center sm:justify-start gap-3.5">
              <Link
                href="/#katalog"
                className="group inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                <span>Explore Inventory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/6581234567?text=Hello%20Apex%20Auto,%20I%20would%20like%20to%20consult%20with%20a%20luxury%20automotive%20advisor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white font-semibold px-6 py-3.5 rounded-2xl backdrop-blur-md transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Contact Advisors</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: KEY METRICS (STATISTIK UTAMA)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          <AnimatedStat
            value="500"
            suffix="+"
            label="Vehicles Delivered"
            sublabel="Verified prestige & pre-owned sales"
            delay={0}
          />
          <AnimatedStat
            value="15"
            suffix="+"
            label="Years Heritage"
            sublabel="Serving motorists since 2010"
            delay={100}
          />
          <AnimatedStat
            value="4.9"
            suffix="★"
            label="Google Client Rating"
            sublabel="350+ independent reviews"
            delay={200}
          />
          <AnimatedStat
            value="3"
            suffix=" Hubs"
            label="Strategic Locations"
            sublabel="Leng Kee, Ubi, and Sin Ming"
            delay={300}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: VISI, MISI & CORE VALUES (VISUAL LAYOUT)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Corporate Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Guided by Integrity, Driven by Passion
            </h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              We eliminate traditional dealership friction through radical price transparency, authenticated vehicle provenance, and enduring automotive stewardship.
            </p>
          </div>

          {/* Dual Highlight Cards: Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Vision Card */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-105 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  To be Singapore&apos;s definitive luxury automotive authority, where acquiring a prestigious motorcar is celebrated as a seamless, dignified experience characterized by honest advisory, complete pricing clarity, and genuine client care.
                </p>
              </div>

              {/* Scannable Highlights */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
                {['Accredited Dealership', 'Zero-Surprise Pricing', 'Lifelong Relationship'].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-xs text-zinc-300 font-medium"
                  >
                    <Check className="w-3 h-3 text-amber-400" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Our Mission
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  To curate exceptional luxury motorcars backed by unbending 100-point inspection standards, complete COE depreciation transparency, and competitive bank financing partnerships that safeguard our clients&apos; investments.
                </p>
              </div>

              {/* Scannable Highlights */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
                {['100-Point Inspection', 'STA Grade-A Protocol', 'Preferred Bank Rates'].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-xs text-zinc-300 font-medium"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values (4 Interactive Visual Cards Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                        {val.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base mb-2">
                      {val.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: 100-POINT INSPECTION (INTERACTIVE TIMELINE & STEPS)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-zinc-900/30 border-y border-zinc-800/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Inspection Standard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Certified 100-Point Inspection Protocol
            </h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Every vehicle in our collection undergoes an exhaustive 5-stage certification by certified master technicians before entering the showroom.
            </p>
          </div>

          {/* Interactive Step Switcher Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {INSPECTION_PHASES.map((phase, idx) => {
              const isActive = activePhaseIndex === idx;
              return (
                <button
                  key={phase.num}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/20'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className={`text-[11px] font-black ${isActive ? 'text-zinc-950' : 'text-amber-400'}`}>
                    {phase.num}
                  </span>
                  <span>{phase.short}</span>
                </button>
              );
            })}
          </div>

          {/* 5 Numbered Cards Grid (Interactive Focus) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
            {INSPECTION_PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isSelected = activePhaseIndex === idx;

              return (
                <div
                  key={phase.num}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-900 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                      : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
                  }`}
                >
                  <div>
                    {/* Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-2xl font-black ${isSelected ? 'text-amber-400' : 'text-zinc-600'}`}>
                        {phase.num}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-amber-500/15 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    <h4 className="font-bold text-white text-sm mb-2 leading-snug">
                      {phase.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {phase.desc}
                    </p>
                  </div>

                  {/* Checklist Points */}
                  <div className="pt-3 border-t border-zinc-800/60 space-y-1.5">
                    {phase.points.slice(0, 2).map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-400">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warranty & Accident-Free Guarantee Banner */}
          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900/60 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  12 to 24 Months Showroom Warranty &amp; Accident-Free Guarantee
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                  Every certified unit includes comprehensive warranty coverage for engine, transmission, and major drivetrain components. We guarantee 100% accident-free and flood-free provenance.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/6581234567?text=Hello%20Apex%20Auto,%20I%20would%20like%20details%20on%20the%20100-point%20inspection%20and%20warranty%20coverage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs px-5 py-3 rounded-xl transition-all shrink-0"
            >
              <span>Inquire on Warranty</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: SHOWROOM NETWORK & STRATEGIC HUBS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>3 Strategic Hubs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Showroom Network &amp; Service Centers
            </h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Strategically situated across Singapore&apos;s prime automotive belts to deliver sales, trade-in valuations, and aftercare.
            </p>
          </div>

          {/* 3 Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SHOWROOMS.map((hub) => (
              <div
                key={hub.name}
                className="rounded-3xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 group shadow-xl"
              >
                {/* Hub Photography */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={hub.image}
                    alt={hub.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${hub.accentColor}`}>
                      {hub.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-medium text-zinc-300 bg-zinc-950/70 px-2.5 py-1 rounded-lg backdrop-blur-md">
                      {hub.highlight}
                    </span>
                  </div>
                </div>

                {/* Hub Information */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1.5">
                      {hub.name}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium mb-4 leading-relaxed">
                      {hub.role}
                    </p>

                    <div className="space-y-2.5 text-xs text-zinc-400">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{hub.address}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{hub.hours}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                        <a
                          href={`tel:${hub.phone.replace(/[^0-9+]/g, '')}`}
                          className="hover:text-amber-400 transition-colors"
                        >
                          {hub.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 mt-6 pt-5 border-t border-zinc-800/80">
                    <a
                      href={`https://wa.me/${hub.phone.replace(/[^0-9]/g, '')}?text=Hello%20Apex%20Auto%20${encodeURIComponent(hub.name)},%20I%20would%20like%20to%20schedule%20a%20showroom%20visit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 font-semibold text-xs transition-all text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={hub.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 text-zinc-200 font-semibold text-xs transition-all text-center"
                    >
                      <Navigation className="w-3.5 h-3.5 text-blue-400" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: FINANCING PARTNERS & FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-zinc-900/30 border-t border-zinc-800/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Financing Partners Header */}
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
              <Landmark className="w-3.5 h-3.5" />
              <span>Strategic Banking Alliances</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Preferential Financing &amp; Fast Approval
            </h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Apex Auto collaborates directly with Singapore&apos;s leading banking institutions to secure bespoke interest rates and expedited 24-hour financing approvals.
            </p>
          </div>

          {/* Bank Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {BANK_PARTNERS.map((bank) => (
              <div
                key={bank.name}
                className="p-7 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white text-base">{bank.name}</h4>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {bank.rate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {bank.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Final Conversion Banner */}
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800/90 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Begin Your Prestige Ownership Journey
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Explore our verified showroom inventory or reserve a private VIP consultation with our non-commissioned automotive advisors.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/#katalog"
                className="group inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 text-sm"
              >
                <span>Explore Current Inventory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/6581234567?text=Hello%20Apex%20Auto,%20I%20would%20like%20to%20schedule%20a%20private%20VIP%20showroom%20viewing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-semibold px-6 py-3.5 rounded-2xl transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Schedule Private VIP Viewing</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Theme Footer */}
      <Footer theme="dark" />
    </main>
  );
}

