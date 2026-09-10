import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MOCK_CARS } from '@/data/mock-cars';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CarDetailGallery } from '@/components/CarDetailGallery';
import { CarInquiryForm } from '@/components/CarInquiryForm';
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
      title: 'Vehicle Not Found — Apex Auto',
    };
  }

  return {
    title: `${car.brand} ${car.model} (${car.year}) — SGD $${car.price.toLocaleString('en-US')} | Apex Auto`,
    description: `Comprehensive technical specifications, photo gallery, and transparent SGD Nett pricing for the ${car.brand} ${car.model} (${car.year}). Certified showroom condition with verified COE details.`,
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const car = MOCK_CARS.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  const waText = encodeURIComponent(
    `Hello Apex Auto, I am interested in the ${car.brand} ${car.model} (${car.year}) priced at SGD $${car.price.toLocaleString('en-US')} (Ref: ${car.id}). Could you provide unit availability details and arrange a test drive?`
  );
  const waUrl = `https://wa.me/6581234567?text=${waText}`;

  const statusLabel =
    car.status === 'available'
      ? 'Available'
      : car.status === 'reserved'
      ? 'Reserved'
      : 'Sold';

  const statusColor =
    car.status === 'available'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : car.status === 'reserved'
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-rose-50 text-rose-700 border-rose-200';

  const statusDot =
    car.status === 'available'
      ? 'bg-emerald-500'
      : car.status === 'reserved'
      ? 'bg-amber-500'
      : 'bg-rose-500';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 sm:pb-24">
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <Link
            href="/#katalog"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Inventory</span>
          </Link>
        </div>

        {/* Hero Section: Title + Price on top, clean and spacious */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
            {/* Left: Brand + Model + Meta */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.15em] font-bold text-zinc-400">
                  {car.brand}
                </span>
                <span className="text-zinc-300">·</span>
                <span className="text-xs text-zinc-400">{car.body_type}</span>
                <span className="text-zinc-300">·</span>
                <span className="text-xs text-zinc-400">{car.year}</span>
                {car.is_featured && (
                  <>
                    <span className="text-zinc-300">·</span>
                    <span className="text-xs font-semibold text-amber-600">
                      Featured
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.05]">
                {car.model}
              </h1>

              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {car.location}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium ${statusColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot} ${car.status === 'available' ? 'animate-pulse' : ''}`} />
                  {statusLabel}
                </span>
              </div>
            </div>

            {/* Right: Price Block */}
            <div className="lg:text-right space-y-1 shrink-0">
              <div className="text-xs text-zinc-400 font-medium uppercase tracking-wide">
                SGD Nett Price
              </div>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                ${car.price.toLocaleString('en-US')}
              </div>
              {car.depreciation_sgd && (
                <div className="text-xs text-zinc-400">
                  Est. depreciation{' '}
                  <span className="text-zinc-600 font-medium">
                    ${car.depreciation_sgd.toLocaleString('en-US')}/yr
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gallery + Sidebar Layout */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Gallery + Specs (8 cols) */}
            <div className="lg:col-span-8 space-y-14">
              {/* Photo Gallery */}
              <CarDetailGallery images={car.images} alt={`${car.brand} ${car.model}`} />

              {/* Specifications Grid — clean, scannable */}
              <section>
                <h2 className="text-lg font-semibold text-zinc-900 mb-6">
                  Specifications
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      Year
                    </div>
                    <div className="text-sm font-semibold text-zinc-800">{car.year}</div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                      <Gauge className="w-3 h-3" />
                      Mileage
                    </div>
                    <div className="text-sm font-semibold text-zinc-800">
                      {car.mileage_km.toLocaleString('en-US')} km
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                      <Fuel className="w-3 h-3" />
                      Engine
                    </div>
                    <div className="text-sm font-semibold text-zinc-800">
                      {car.engine_capacity_cc && car.engine_capacity_cc > 0
                        ? `${car.engine_capacity_cc.toLocaleString('en-US')} cc`
                        : 'Dual Motor EV'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                      <Cog className="w-3 h-3" />
                      Transmission
                    </div>
                    <div className="text-sm font-semibold text-zinc-800">{car.transmission}</div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                      <Fuel className="w-3 h-3" />
                      Fuel
                    </div>
                    <div className="text-sm font-semibold text-zinc-800">{car.fuel_type}</div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                      <BadgeDollarSign className="w-3 h-3" />
                      COE Expiry
                    </div>
                    <div className="text-sm font-semibold text-zinc-800">
                      {car.coe_expiry || '10-Year COE'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                      <Award className="w-3 h-3" />
                      Body Type
                    </div>
                    <div className="text-sm font-semibold text-zinc-800">{car.body_type}</div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                      <Award className="w-3 h-3" />
                      Exterior Color
                    </div>
                    <div className="text-sm font-semibold text-zinc-800">{car.color}</div>
                  </div>
                </div>

                {/* Pricing Inclusions — minimal inline summary */}
                <div className="mt-8 pt-6 border-t border-zinc-200">
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      COE &amp; GST (9%) included
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      LTA transfer fee waived
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      100-point inspection certified
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      12–24 month warranty
                    </span>
                  </div>
                </div>
              </section>

              {/* Description — short paragraph, not a card */}
              <section>
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                  About This Vehicle
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[65ch]">
                  {car.description}
                </p>
              </section>

              {/* Features — clean, minimal list */}
              <section>
                <h2 className="text-lg font-semibold text-zinc-900 mb-6">
                  Features &amp; Equipment
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                  {car.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-sm text-zinc-600 py-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Contact + Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Sticky wrapper for desktop */}
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Quick Contact — WhatsApp */}
                <div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat via WhatsApp</span>
                  </a>
                </div>

                {/* Inquiry Form */}
                <CarInquiryForm car={car} />

                {/* Showroom Info */}
                <div className="space-y-4 pt-4 border-t border-zinc-200">
                  <div>
                    <div className="text-xs text-zinc-400 font-medium mb-1">Showroom Hotline</div>
                    <a
                      href="tel:+6581234567"
                      className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
                    >
                      +65 8123 4567
                    </a>
                  </div>

                  <div>
                    <div className="text-xs text-zinc-400 font-medium mb-1">Unit Location</div>
                    <p className="text-sm text-zinc-600">{car.location}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Open daily for physical inspection &amp; COE financing consultation.
                    </p>
                  </div>

                  {car.monthly_est_sgd && (
                    <div>
                      <div className="text-xs text-zinc-400 font-medium mb-1">Monthly Estimate</div>
                      <div className="text-lg font-bold text-zinc-900">
                        SGD ${car.monthly_est_sgd.toLocaleString('en-US')}/mo
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        30% down payment, 2.28% p.a., max 7 years.
                      </p>
                    </div>
                  )}
                </div>

                {/* Unit ID */}
                <div className="text-xs text-zinc-300">
                  Unit ID:{' '}
                  <code className="font-mono text-zinc-400">{car.id}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
