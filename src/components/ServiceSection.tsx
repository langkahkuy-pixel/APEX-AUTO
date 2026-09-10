'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  ScanLine,
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  BadgeCheck,
  Cog,
  ArrowRight,
  X,
  MessageCircle,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'periodic-maintenance',
    icon: Wrench,
    title: 'Periodic Maintenance',
    tagline: 'Keep your vehicle in peak condition',
    description:
      'Factory-scheduled routine checkups, synthetic oil changes, brake inspections, fluid top-ups, and precision engine tune-ups — performed by certified luxury-marque technicians using manufacturer-approved procedures.',
    includes: [
      'Engine oil & filter replacement (synthetic OEM-grade)',
      'Multi-point brake system inspection & pad measurement',
      'Transmission fluid, coolant & power steering fluid check',
      'Air conditioning performance test & cabin filter replacement',
      'Battery health diagnostics & terminal cleaning',
      'Tyre pressure calibration & tread depth assessment',
    ],
    highlight: 'From S$288',
    highlightLabel: 'Starting',
    bookingText: 'Hello Apex Auto, I would like to schedule a Periodic Maintenance service for my vehicle.',
  },
  {
    id: 'diagnostics-repair',
    icon: ScanLine,
    title: 'General Repair & Diagnostics',
    tagline: 'Advanced fault detection & expert repair',
    description:
      'State-of-the-art computerized diagnostics using official brand scanners (XENTRY, ISTA, PIWIS) for precise fault identification. Major component repairs handled by factory-trained specialists with genuine OEM parts.',
    includes: [
      'Full computerized diagnostic scan (engine, gearbox, ABS, airbag)',
      'Official brand scanner analysis (Mercedes XENTRY, BMW ISTA, Porsche PIWIS)',
      'Suspension, steering & drivetrain fault isolation',
      'Electrical system troubleshooting & ECU coding',
      'Engine overhaul & timing chain / belt replacement',
      'Air conditioning compressor & evaporator repair',
    ],
    highlight: 'From S$120',
    highlightLabel: 'Diagnostic scan',
    bookingText: 'Hello Apex Auto, I would like to schedule a General Repair & Diagnostics appointment for my vehicle.',
  },
  {
    id: 'detailing-protection',
    icon: Sparkles,
    title: 'Luxury Detailing & Protection',
    tagline: 'Showroom-grade finish, lasting protection',
    description:
      'Exclusive exterior and interior treatments designed for prestige vehicles. From nano ceramic coatings with 5-year durability to hand-polished paint correction and premium leather conditioning — your vehicle deserves the finest care.',
    includes: [
      'Nano ceramic coating (9H hardness, 5-year warranty)',
      'Multi-stage machine paint correction & swirl removal',
      'Premium leather deep conditioning & UV protection',
      'Engine bay steam cleaning & dressing',
      'Headlight restoration & UV protective clear coat',
      'Full interior sanitization & odour elimination treatment',
    ],
    highlight: 'From S$480',
    highlightLabel: 'Full detail',
    bookingText: 'Hello Apex Auto, I would like to book a Luxury Detailing & Protection session for my vehicle.',
  },
];

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: 'Certified Technicians',
    description: 'Factory-trained specialists with brand-specific accreditation across Mercedes-Benz, BMW, Porsche, Audi, and Toyota platforms.',
  },
  {
    icon: Cog,
    title: 'Genuine OEM Parts',
    description: 'We use only manufacturer-approved original parts and lubricants, preserving your warranty and ensuring long-term reliability.',
  },
  {
    icon: ShieldCheck,
    title: 'Service Warranty',
    description: 'Every service comes with a workmanship guarantee. Drive away with confidence knowing your vehicle is backed by our commitment.',
  },
];

function ServiceDetailModal({
  service,
  onClose,
}: {
  service: (typeof SERVICES)[0];
  onClose: () => void;
}) {
  const Icon = service.icon;
  const waUrl = `https://wa.me/6581234567?text=${encodeURIComponent(service.bookingText)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-zinc-200 rounded-2xl max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-zinc-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900">{service.title}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{service.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-700 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-5">
          <p className="text-sm text-zinc-600 leading-relaxed">
            {service.description}
          </p>

          {/* What's Included */}
          <div>
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
              What's Included
            </h4>
            <div className="space-y-2">
              {service.includes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-zinc-600"
                >
                  <BadgeCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400 font-medium">{service.highlightLabel}</p>
              <p className="text-xl font-bold text-zinc-900 mt-0.5">{service.highlight}</p>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium uppercase">
              Final price varies by vehicle
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 text-sm font-medium hover:bg-zinc-100 transition-colors"
          >
            Close
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Service
          </a>
        </div>
      </div>
    </div>
  );
}

export function ServiceSection() {
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[0] | null>(null);

  return (
    <section id="service" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Our Services
          </h2>
          <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
            Trusted luxury vehicle maintenance and after-sales support. Our factory-trained team delivers precision care for your prestige vehicle at every service touchpoint.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const waUrl = `https://wa.me/6581234567?text=${encodeURIComponent(service.bookingText)}`;

            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-7 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/60"
              >
                <div>
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-amber-600 font-medium mb-3">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Starting Price */}
                  <div className="mt-4 pt-4 border-t border-zinc-100">
                    <p className="text-xs text-zinc-400 font-medium">{service.highlightLabel}</p>
                    <p className="text-xl font-bold text-zinc-900">{service.highlight}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-6">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    Book Service
                  </a>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 font-medium transition-colors"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Benefits */}
        <div className="border-t border-zinc-200 pt-16">
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight mb-8">
            Why Service With Apex Auto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-zinc-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
