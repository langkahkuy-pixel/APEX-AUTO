'use client';

import React, { useState } from 'react';
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
    title: 'Exterior & Frame',
    icon: Search,
    desc: 'Laser chassis scan, panel alignment, and digital paint depth gauge check for 100% accident-free integrity.',
    points: [
      'Digital paint depth gauge check',
      'Laser chassis & unibody alignment scan',
    ],
  },
  {
    num: '02',
    id: 'drivetrain',
    title: 'Engine & Gearbox',
    icon: Gauge,
    desc: 'Full OBD-II ECU computerized diagnosis, cylinder compression testing, and transmission calibration.',
    points: [
      'Full-system OBD-II ECU diagnostic scan',
      'Transmission calibration & compression test',
    ],
  },
  {
    num: '03',
    id: 'cabin',
    title: 'Cabin & Electronics',
    icon: Sparkles,
    desc: 'Complete audit of interior upholstery, digital displays, climate control, and radar ADAS safety systems.',
    points: [
      'Radar cruise & lane assist calibration',
      '360° camera array & climate control test',
    ],
  },
  {
    num: '04',
    id: 'undercarriage',
    title: 'Undercarriage & Safety',
    icon: ShieldCheck,
    desc: 'Hydraulic lift inspection of air suspension, control arm bushings, brake rotors, and certified flood-free check.',
    points: [
      'Air suspension & damper inspection',
      'Brake rotor thickness & pad life check',
    ],
  },
  {
    num: '05',
    id: 'documentation',
    title: 'Legal & Documentation',
    icon: FileCheck2,
    desc: 'Official LTA ownership verification, remaining COE tenure check, and authentic agent service logbooks.',
    points: [
      'Official LTA title & ownership check',
      'Official Apex Auto Certificate issuance',
    ],
  },
];

/* ───── Core Values Data (Concise & Clear) ───── */
const CORE_VALUES = [
  {
    icon: Scale,
    title: 'Transparent SGD Nett',
    desc: 'All prices quoted in clear SGD Nett with GST included, clear COE depreciation, and zero surprise fees.',
    tag: 'Zero Surcharges',
  },
  {
    icon: FileCheck2,
    title: 'Verified History',
    desc: 'Fully authenticated with official LTA title records, verified mileage, and authorized agent service logs.',
    tag: 'LTA Verified',
  },
  {
    icon: HeartHandshake,
    title: 'Consultative Advisory',
    desc: 'Dedicated non-commissioned luxury specialists focused on finding the right model and optimal financing.',
    tag: 'Client-Centric',
  },
  {
    icon: Award,
    title: 'Certified Standards',
    desc: 'Only motorcars passing our exhaustive 100-point inspection qualify for our showroom floor.',
    tag: 'Top Selection',
  },
];

/* ───── Banking Partners (Concise & Clear) ───── */
const BANK_PARTNERS = [
  {
    name: 'DBS Bank',
    rate: 'From 1.88% p.a.',
    desc: 'Preferential rates with rapid 24-hour in-principle financing approval.',
  },
  {
    name: 'OCBC Bank',
    rate: 'Up to 7-Year Tenure',
    desc: 'Tailored balloon schemes with flexible financing terms for prestige marques.',
  },
  {
    name: 'UOB Bank',
    rate: 'Green Financing',
    desc: 'Special interest incentives for electric and hybrid luxury vehicles.',
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
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
            <span className="text-zinc-800 font-medium">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>About Apex Auto</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
              Singapore&apos;s Premier Luxury Automobile Showroom
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 mt-4 leading-relaxed max-w-2xl">
              Leng Kee Road&apos;s trusted luxury dealership since 2010. Clear SGD Nett pricing, certified 100-point inspections, and zero hidden fees.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-sm border border-zinc-200 shadow-xs transition-colors"
              >
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Visit Showroom</span>
              </Link>
              <a
                href="https://wa.me/6581234567?text=Hello%20Apex%20Auto%2C%20I%20would%20like%20to%20inquire%20about%20your%20vehicles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
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
                Cars Delivered
              </p>
              <p className="text-xs text-zinc-400 mt-1">Certified luxury vehicles</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums">
                15<span className="text-amber-500">+</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Years Experience
              </p>
              <p className="text-xs text-zinc-400 mt-1">Trusted since 2010</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums flex items-center gap-1">
                4.9<span className="text-amber-500 text-2xl">★</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Client Rating
              </p>
              <p className="text-xs text-zinc-400 mt-1">350+ verified reviews</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums">
                1 <span className="text-amber-500 text-lg font-bold">Flagship</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Showroom Hub
              </p>
              <p className="text-xs text-zinc-400 mt-1">24 Leng Kee Road</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Corporate Philosophy & Core Values ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Our Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Integrity First, Complete Transparency
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              No hidden markups, no sales pressure. Just certified luxury cars and straightforward pricing.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5 text-amber-600">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-2">
                Our Vision
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                To be Singapore&apos;s most trusted luxury dealership through radical pricing clarity and client-first care.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
                {['Accredited Dealer', 'SGD Nett Pricing', 'Client-First'].map((pill) => (
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
                Our Mission
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                To deliver certified prestige vehicles backed by strict 100-point inspections, clear COE depreciation, and preferred bank financing.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
                {['100-Point Inspected', 'Grade-A Standard', 'Preferred Bank Rates'].map((pill) => (
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
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              100-Point Certified Inspection
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Every vehicle undergoes rigorous 5-stage certification by experienced technicians before entering our showroom.
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
                  12 to 24 Months Warranty &amp; Accident-Free Guarantee
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl leading-relaxed">
                  Comprehensive coverage for engine and gearbox. Guaranteed 100% accident-free and flood-free.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/6581234567?text=Hello%20Apex%20Auto,%20I%20would%20like%20details%20on%20warranty%20and%20inspection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-xs shrink-0"
            >
              <span>Inquire on Warranty</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. Flagship Showroom ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Flagship Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Visit Our Flagship Showroom
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Experience our curated luxury automobile collection at 24 Leng Kee Road.
            </p>
          </div>

          <div className="max-w-2xl">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Main Showroom</span>
                </div>
                <span className="text-xs font-medium text-zinc-400">Leng Kee Prime Belt</span>
              </div>

              <h3 className="font-bold text-zinc-900 text-xl sm:text-2xl">
                Apex Auto Leng Kee Flagship
              </h3>
              <p className="text-xs text-amber-600 font-medium mt-1 mb-6">
                Principal luxury showroom &amp; VIP consultation lounge
              </p>

              <div className="space-y-4 text-sm text-zinc-600 border-t border-zinc-100 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Address</span>
                    <p className="text-zinc-800 font-medium mt-0.5">24 Leng Kee Road, Singapore 159096</p>
                    <p className="text-xs text-zinc-400">Opposite Leng Kee Autoworld · Near Redhill MRT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Operating Hours</span>
                    <p className="text-zinc-800 font-medium mt-0.5">Mon–Sat: 09:00–19:00 • Sun: 10:00–18:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-zinc-400 shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Telephone</span>
                    <a href="tel:+6581234567" className="text-zinc-800 font-medium hover:text-amber-600 transition-colors">
                      +65 8123 4567
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap items-center gap-3">
                <a
                  href="https://maps.google.com/?q=24+Leng+Kee+Road+Singapore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs border border-zinc-200 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href="https://wa.me/6581234567?text=Hello%20Apex%20Auto%20Leng%20Kee%20Flagship%2C%20I%20would%20like%20to%20schedule%20a%20private%20visit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Strategic Banking Alliances ── */}
      <section className="py-16 sm:py-20 bg-white border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Financing
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Bank Financing Partners
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Direct partnerships with Singapore&apos;s leading banks for competitive interest rates and 24-hour approval.
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
              <span>Ready to Drive?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-2">
              Find Your Next Prestige Automobile
            </h3>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto mb-8 leading-relaxed">
              Explore our verified showroom inventory or reserve a private VIP consultation with our automotive specialists.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span>Explore Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-sm border border-zinc-200 shadow-xs transition-colors"
              >
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Visit Showroom</span>
              </Link>
              <a
                href="https://wa.me/6581234567?text=Hello%20Apex%20Auto%2C%20I%20would%20like%20to%20inquire%20about%20your%20vehicles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
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
