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

/* ───── Core Values Data ───── */
const CORE_VALUES = [
  {
    icon: Scale,
    title: 'Transparent SGD Nett Pricing',
    desc: 'Every vehicle is quoted in clear SGD Nett with zero surprise administrative fees, full GST inclusion, and clear residual COE calculations.',
    tag: 'Zero Surcharges',
  },
  {
    icon: FileCheck2,
    title: 'Verified Vehicle Provenance',
    desc: 'Each unit is authenticated through official LTA title records, verified mileage logs, and documented authorised agent maintenance histories.',
    tag: 'Accredited History',
  },
  {
    icon: HeartHandshake,
    title: 'Consultative Advisory',
    desc: 'Non-commissioned luxury automotive specialists evaluate your driving patterns and annual mileage to advise the optimal model and financing fit.',
    tag: 'Client-First',
  },
  {
    icon: Award,
    title: 'Master Quality Benchmarks',
    desc: 'Only motorcars passing our rigorous 100-point mechanical, structural, and cosmetic inspection qualify for presentation in our showrooms.',
    tag: 'Top 5% Selection',
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
              Since 2010, Apex Auto has redefined the luxury automotive experience along Leng Kee Road with transparent SGD Nett pricing, certified 100-point inspections, and dedicated consultative client advisory.
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm transition-colors"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Visit Showroom</span>
              </Link>
              <a
                href="https://wa.me/6581234567?text=Hello%20Apex%20Auto%2C%20I%20would%20like%20to%20inquire%20about%20your%20vehicles%20and%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Concierge</span>
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
                Vehicles Delivered
              </p>
              <p className="text-xs text-zinc-400 mt-1">Verified prestige &amp; pre-owned</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums">
                15<span className="text-amber-500">+</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Years Heritage
              </p>
              <p className="text-xs text-zinc-400 mt-1">Serving motorists since 2010</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums flex items-center gap-1">
                4.9<span className="text-amber-500 text-2xl">★</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Client Rating
              </p>
              <p className="text-xs text-zinc-400 mt-1">350+ independent reviews</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tabular-nums">
                1 <span className="text-amber-500 text-lg font-bold">Flagship</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mt-2">
                Showroom Hub
              </p>
              <p className="text-xs text-zinc-400 mt-1">24 Leng Kee Road, Singapore</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Corporate Philosophy & Core Values ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
              Corporate Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Guided by Integrity, Driven by Passion
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              We eliminate traditional dealership friction through radical price transparency, authenticated vehicle provenance, and enduring automotive stewardship.
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
                To be Singapore&apos;s definitive luxury automotive authority, where acquiring a prestigious motorcar is celebrated as a seamless, dignified experience characterized by honest advisory, complete pricing clarity, and genuine client care.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
                {['Accredited Dealership', 'Zero-Surprise Pricing', 'Lifelong Relationship'].map((pill) => (
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
                To curate exceptional luxury motorcars backed by unbending 100-point inspection standards, complete COE depreciation transparency, and competitive bank financing partnerships that safeguard our clients&apos; investments.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
                {['100-Point Inspection', 'STA Grade-A Protocol', 'Preferred Bank Rates'].map((pill) => (
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
              Inspection Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Certified 100-Point Inspection Protocol
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Every vehicle in our collection undergoes an exhaustive 5-stage certification by certified master technicians before entering the showroom.
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
                    {phase.points.slice(0, 2).map((pt, pIdx) => (
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

          {/* Warranty Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
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
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shrink-0"
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
              Principal Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Visit Our Flagship Showroom
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Experience our curated luxury automobile collection at our premier Leng Kee Road location.
            </p>
          </div>

          <div className="max-w-2xl">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Main Showroom</span>
                </div>
                <span className="text-xs font-medium text-zinc-400">South / Central Prime Belt</span>
              </div>

              <h3 className="font-bold text-zinc-900 text-xl sm:text-2xl">
                Apex Auto Leng Kee Flagship
              </h3>
              <p className="text-xs text-amber-600 font-medium mt-1 mb-6">
                Principal luxury vehicle gallery &amp; private VIP handover lounge
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors"
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
              Financing Partnerships
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Preferential Financing &amp; Fast Approval
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              Apex Auto collaborates directly with Singapore&apos;s leading banking institutions to secure bespoke interest rates and expedited 24-hour financing approvals.
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

          {/* Final Call to Action Banner */}
          <div className="rounded-3xl bg-zinc-900 text-white p-8 sm:p-12 text-center shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Begin Your Prestige Ownership Journey
            </h3>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Explore our verified showroom inventory or reserve a private VIP consultation with our non-commissioned automotive advisors.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span>Explore Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-all"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Contact Showroom</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Light Theme Footer */}
      <Footer />
    </main>
  );
}
