'use client';

import React from 'react';
import Link from 'next/link';
import { Car as CarIcon, Wrench, ArrowLeftRight, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: CarIcon,
    title: 'Luxury Car Sales',
    description:
      'Explore our curated collection of prestige and certified pre-owned vehicles. Every unit passes a 100-point inspection with transparent SGD Nett pricing.',
    cta: 'View Inventory',
    href: '/inventory',
  },
  {
    icon: Wrench,
    title: 'Vehicle Service',
    description:
      'Expert periodic maintenance, advanced diagnostics, and premium detailing — all performed by factory-trained technicians using genuine OEM parts.',
    cta: 'View Services',
    href: '/promotions',
  },
  {
    icon: ArrowLeftRight,
    title: 'Trade-In & Consignment',
    description:
      'Get an instant on-site valuation with an additional S$5,000 trade-in bonus. Zero admin fees, same-day driveaway, and transparent appraisal within 30 minutes.',
    cta: 'Get Valuation',
    href: '/contact',
  },
];

export function HomeServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Our Services
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Everything You Need, Under One Roof
          </h2>
          <p className="text-sm text-zinc-500 mt-3 leading-relaxed max-w-lg">
            From sourcing your dream car to securing the best financing and hassle-free trade-ins — Apex Auto delivers a complete ownership experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/60"
              >
                {/* Icon */}
                <div>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-zinc-900 hover:text-amber-600 transition-colors group/link"
                >
                  {service.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
