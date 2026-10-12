'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Heart, Check, ChevronDown, MessageCircle } from 'lucide-react';
import type { Car } from '@/types/car';
import { useSavedCars } from '@/hooks/useSavedCars';
import { CarDetailGallery } from './CarDetailGallery';
import { MakeOfferModal } from './MakeOfferModal';
import { CarCard } from './CarCard';

const focusStyle = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400';

export function CarDetailContent({ car, relatedCars }: { car: Car; relatedCars: Car[] }) {
  const [offerOpen, setOfferOpen] = useState(false);
  const { savedIds, toggleSaved } = useSavedCars();
  const fullName = `${car.brand} ${car.model}`;
  const saved = savedIds.includes(car.id);
  const availabilityUrl = `https://wa.me/6581234567?text=${encodeURIComponent(`Hello Apex Auto, is the ${car.year} ${fullName} (Ref: ${car.id}, SGD $${car.price.toLocaleString('en-SG')}) still available? Please share availability and financing details.`)}`;
  const status = car.status === 'available' ? 'Available' : car.status === 'reserved' ? 'Reserved' : 'Sold';

  return (
    <main className="flex-1 bg-[#171717] pb-16 pt-16 text-white sm:pb-24">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-4 px-5 py-6 sm:px-8">
          <Link href="/inventory" className={`inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-white ${focusStyle}`}><ArrowLeft className="h-5 w-5" /> Back to our cars</Link>
          <span className="hidden h-6 w-px bg-white/20 sm:block" />
          <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-3 text-sm text-white/55"><Link href="/inventory" className={`hover:text-amber-400 ${focusStyle}`}>Collection</Link><span>/</span><Link href={`/inventory?brand=${encodeURIComponent(car.brand)}`} className={`hover:text-amber-400 ${focusStyle}`}>{car.brand}</Link></nav>
          <button onClick={() => toggleSaved(car.id)} aria-pressed={saved} aria-label={saved ? 'Remove vehicle from saved cars' : 'Save vehicle'} className={`ml-auto inline-flex items-center gap-2 text-sm font-semibold hover:text-amber-400 ${saved ? 'text-amber-400' : 'text-white/75'} ${focusStyle}`}>{saved ? 'Saved' : 'Save'}<Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} /></button>
        </div>
      </div>

      <section aria-label="Vehicle overview" className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <div className="grid items-stretch lg:grid-cols-2">
          <CarDetailGallery images={car.images} alt={fullName} />
          <div className="flex flex-col bg-[#252525] px-6 py-8 sm:px-9 sm:py-10">
            <div className="flex items-center justify-between gap-4"><p className="text-xl font-semibold">{car.year}</p><span className={`text-xs font-semibold ${car.status === 'available' ? 'text-emerald-400' : car.status === 'reserved' ? 'text-amber-400' : 'text-white/45'}`}>{status}</span></div>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{fullName}</h1>
            <p className="mt-3 text-sm text-white/55">{car.body_type} · {car.transmission} · {car.fuel_type}</p>
            <div className="mt-8 border-y border-white/15 py-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/45">Selling price</p>
              <div className="mt-2 flex flex-wrap items-end gap-x-5 gap-y-2"><p className="text-3xl font-bold tracking-tight text-amber-400 sm:text-4xl">S${car.price.toLocaleString('en-SG')}</p>{car.monthly_est_sgd ? <p className="pb-1 text-sm text-white/60">Inst. <strong className="font-semibold text-white">S${car.monthly_est_sgd.toLocaleString('en-SG')} /mth</strong></p> : null}</div>
              <p className="mt-3 text-xs leading-relaxed text-white/40">Price in Singapore dollars, GST included.{car.monthly_est_sgd ? ' Instalment shown is an estimate.' : ''}</p>
            </div>
            <dl className="grid grid-cols-2 border-b border-white/15">
              {car.depreciation_sgd ? <DetailMetric label="Depreciation" value={`S$${car.depreciation_sgd.toLocaleString('en-SG')} /yr`} /> : null}
              <DetailMetric label="COE expiry" value={car.coe_expiry || 'Enquire for details'} />
              <DetailMetric label="Mileage" value={`${car.mileage_km.toLocaleString('en-SG')} km`} />
              <DetailMetric label="Exterior colour" value={car.color} />
            </dl>
            <div className="mt-auto pt-8"><a href={availabilityUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-3.5 text-sm font-bold text-black hover:bg-amber-300 ${focusStyle}`}><MessageCircle className="h-5 w-5" /> Check availability <ArrowRight className="h-5 w-5" /></a></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 border-b border-white/15 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50"><p>Stock: <span className="ml-2 font-semibold text-white">{car.id.toUpperCase()}</span></p><p>Showroom: <span className="ml-2 font-semibold text-white">{car.location}</span></p></div>
          <button onClick={() => setOfferOpen(true)} aria-haspopup="dialog" className={`shrink-0 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:border-amber-400 hover:bg-amber-400 hover:text-black ${focusStyle}`}>Make Offer</button>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <section className="mt-10" aria-labelledby="dealer-notes"><h2 id="dealer-notes" className="mb-4 text-xl font-semibold">Dealer notes</h2><div className="bg-[#252525] px-6 py-5 text-sm leading-7 text-white/65"><p>{car.description}</p></div></section>
        <section className="mt-10" aria-labelledby="features-specifications">
          <h2 id="features-specifications" className="mb-7 text-2xl font-semibold tracking-tight">Features and Specifications</h2>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div><h3 className="mb-4 text-xl font-semibold">Features</h3><SpecificationGroup title="Standard" defaultOpen><ul className="grid gap-4 text-sm text-white/70">{car.features.map(feature => <li key={feature} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />{feature}</li>)}</ul>{!car.features.length && <p className="text-sm text-white/50">Contact our team for the full equipment list.</p>}</SpecificationGroup></div>
            <div><h3 className="mb-4 text-xl font-semibold">Specifications</h3><div className="space-y-3">
              <SpecificationGroup title="Car Details" defaultOpen><SpecRows rows={[["Brand", car.brand], ["Model", car.model], ["Year", String(car.year)], ["Body type", car.body_type], ["Exterior colour", car.color], ["Mileage", `${car.mileage_km.toLocaleString('en-SG')} km`], ["Status", status]]} /></SpecificationGroup>
              <SpecificationGroup title="Engine"><SpecRows rows={[["Engine capacity", car.engine_capacity_cc ? `${car.engine_capacity_cc.toLocaleString('en-SG')} cc` : 'Enquire for details'], ["Transmission", car.transmission], ["Fuel type", car.fuel_type]]} /></SpecificationGroup>
              <SpecificationGroup title="COE & Financing"><SpecRows rows={[["COE expiry", car.coe_expiry || 'Enquire for details'], ["Annual depreciation", car.depreciation_sgd ? `S$${car.depreciation_sgd.toLocaleString('en-SG')}` : 'Enquire for details'], ["Est. monthly instalment", car.monthly_est_sgd ? `S$${car.monthly_est_sgd.toLocaleString('en-SG')}` : 'Enquire for details']]} /></SpecificationGroup>
            </div></div>
          </div>
        </section>
        {relatedCars.length > 0 && <section className="mt-16 border-t border-white/15 pt-10" aria-labelledby="related-vehicles"><div className="mb-7 flex flex-wrap items-center justify-between gap-4"><h2 id="related-vehicles" className="text-2xl font-semibold tracking-tight">More related cars from our inventory</h2><Link href="/inventory" className={`inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-white ${focusStyle}`}>See Inventory <ArrowRight className="h-4 w-4" /></Link></div><div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">{relatedCars.map(item => <CarCard key={item.id} car={item} saved={savedIds.includes(item.id)} onToggleSave={toggleSaved} />)}</div></section>}
      </div>
      {offerOpen && <MakeOfferModal car={car} onClose={() => setOfferOpen(false)} />}
    </main>
  );
}

function DetailMetric({ label, value }: { label: string; value: string }) {
  return <div className="py-5 pr-4"><dt className="mb-2 text-xs text-white/45">{label}</dt><dd className="text-sm font-semibold">{value}</dd></div>;
}

function SpecificationGroup({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  return <details open={defaultOpen} className="group bg-[#252525]"><summary className={`flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden ${focusStyle}`}>{title}<ChevronDown className="h-4 w-4 text-amber-400 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><div className="border-t border-white/10 px-6 py-5">{children}</div></details>;
}

function SpecRows({ rows }: { rows: [string, string][] }) {
  return <dl className="space-y-4">{rows.map(([label, value]) => <div key={label} className="grid grid-cols-2 gap-4 text-sm"><dt className="text-white/45">{label}</dt><dd className="text-white/80">{value}</dd></div>)}</dl>;
}
