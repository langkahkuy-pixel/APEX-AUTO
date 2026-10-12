'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Heart, ChevronDown, ArrowRight, ArrowLeftRight, X } from 'lucide-react';
import type { Car } from '@/types/car';
import { MOCK_CARS } from '@/data/mock-cars';
import { useSavedCars } from '@/hooks/useSavedCars';
import { CarCard } from './CarCard';
import { ShowroomDialog } from './ShowroomDialog';

export function CatalogSection() {
  const params = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareIds, setCompareIds] = useState(['', '', '']);
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const { savedIds, toggleSaved } = useSavedCars();
  const query = params.get('q') || '';
  const brand = params.get('brand') || 'all';
  const body = params.get('type') || 'all';
  const price = params.get('price') || 'all';
  const year = params.get('year') || 'all';
  const location = params.get('location') || 'all';
  const sort = params.get('sort') || 'price-desc';
  const showSaved = params.get('saved') === '1';

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/cars', { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('Inventory unavailable');
        const data = await response.json();
        if (!data.success || !Array.isArray(data.data)) throw new Error('Inventory unavailable');
        setCars(data.data);
        setLoadState('ready');
      })
      .catch(() => { if (!controller.signal.aborted) setLoadState('error'); });
    return () => controller.abort();
  }, []);

  function updateParam(key: string, value: string) {
    const nextParams = new URLSearchParams(window.location.search);
    if (!value || value === 'all' || (key === 'sort' && value === 'price-desc')) nextParams.delete(key);
    else nextParams.set(key, value);
    window.history.replaceState(null, '', `/inventory${nextParams.size ? `?${nextParams}` : ''}`);
  }

  function resetFilters() {
    const nextParams = new URLSearchParams(window.location.search);
    ['q', 'brand', 'type', 'price', 'year', 'location', 'sort'].forEach(key => nextParams.delete(key));
    window.history.replaceState(null, '', `/inventory${nextParams.size ? `?${nextParams}` : ''}`);
  }

  const filteredCars = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return cars.filter(car => {
      const searchable = [car.brand, car.model, car.year, car.body_type, car.fuel_type, car.transmission, car.color, car.location, ...car.features].join(' ').toLowerCase();
      const priceMatch = price === 'all'
        || (price === 'under-150k' && car.price < 150000)
        || (price === '150k-200k' && car.price >= 150000 && car.price <= 200000)
        || (price === 'above-200k' && car.price > 200000);
      return terms.every(term => searchable.includes(term))
        && (brand === 'all' || car.brand === brand)
        && (body === 'all' || car.body_type === body)
        && priceMatch && (year === 'all' || car.year >= Number(year))
        && (location === 'all' || car.location === location)
        && (!showSaved || savedIds.includes(car.id));
    }).sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'year-desc') return b.year - a.year;
      if (sort === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return b.price - a.price;
    });
  }, [cars, query, brand, body, price, year, location, sort, showSaved, savedIds]);

  const brands = [...new Set(cars.map(car => car.brand))].sort();
  const bodyTypes = [...new Set(cars.map(car => car.body_type))].sort();
  const locations = [...new Set(cars.map(car => car.location))].sort();
  const years = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);
  const activeCount = [brand, body, price, year, location].filter(value => value !== 'all').length;
  const hasFilters = activeCount > 0 || !!query || sort !== 'price-desc';

  return (
    <section id="katalog" className="flex-1 bg-[#121212] pb-16 text-white sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-12">
        <div className="relative min-h-44 overflow-hidden bg-zinc-900 sm:aspect-[16/5]">
          <Image src="/picture/Gemini_Generated_Image_91pk1h91pk1h91pk.jpg" alt="Luxury sports car at a coastal lookout" fill preload sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/65 to-black/10" />
          <div className="relative flex min-h-44 flex-col justify-center px-6 py-8 sm:h-full sm:px-10">
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-3 text-xs text-white/60 sm:text-sm">
              <Link href="/" className="hover:text-amber-400">Home</Link><span>/</span><span className="text-white">Our Cars</span>
            </nav>
            <h1 className="text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our Cars</h1>
          </div>
        </div>
      </div>

      <div className="mt-8 border-y border-white/10 bg-[#171717]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <form role="search" onSubmit={event => event.preventDefault()} className="flex items-center gap-3 border-b border-white/10 py-4">
            <Search className="h-5 w-5 shrink-0 text-amber-400" />
            <label htmlFor="inventory-search" className="sr-only">Search vehicle inventory</label>
            <input id="inventory-search" type="search" value={query} onChange={event => updateParam('q', event.target.value)} placeholder="Search by make, model, year, body style, fuel or colour..." autoComplete="off" className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/35 focus-visible:ring-1 focus-visible:ring-amber-500 sm:text-base" />
            {query && <button type="button" onClick={() => updateParam('q', '')} aria-label="Clear vehicle search" className="rounded-full p-2 text-white/60 hover:text-amber-400"><X className="h-4 w-4" /></button>}
          </form>
          <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <button onClick={() => setFiltersOpen(true)} aria-haspopup="dialog" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-amber-400 focus-visible:outline-2 focus-visible:outline-amber-400"><SlidersHorizontal className="h-4 w-4 text-amber-400" /> Open Filters {activeCount > 0 && <span className="rounded-full bg-amber-400 px-1.5 text-xs text-black">{activeCount}</span>}</button>
              <span className="hidden h-6 w-px bg-white/20 sm:block" />
              <p className="text-xs font-semibold" aria-live="polite">{showSaved ? 'Saved cars' : 'Our cars'} <span className="text-white/45">({filteredCars.length} vehicles)</span></p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <button onClick={() => setCompareOpen(true)} aria-haspopup="dialog" className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-4 py-2 text-xs font-semibold text-amber-400 transition-colors hover:bg-amber-400 hover:text-black focus-visible:outline-2 focus-visible:outline-amber-400"><ArrowLeftRight className="h-4 w-4" /> Compare cars</button>
              <button onClick={() => updateParam('saved', showSaved ? '' : '1')} aria-pressed={showSaved} className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${showSaved ? 'border-amber-400 bg-amber-400 text-black' : 'border-white/20 text-white/75 hover:border-amber-400 hover:text-amber-400'}`}><Heart className={`h-4 w-4 ${showSaved ? 'fill-current' : ''}`} /> Saved ({cars.filter(car => savedIds.includes(car.id)).length})</button>
              <label className="flex min-w-0 items-center gap-2 border-b border-white/20 pb-2 text-sm sm:min-w-44"><span className="sr-only">Sort inventory</span><select aria-label="Sort inventory" value={sort} onChange={event => updateParam('sort', event.target.value)} className="min-w-0 w-full appearance-none bg-[#171717] text-white outline-none focus-visible:ring-1 focus-visible:ring-amber-400"><option value="price-desc">Price High to Low</option><option value="price-asc">Price Low to High</option><option value="year-desc">Newest year first</option><option value="newest">Recently added</option></select><ChevronDown className="h-4 w-4 shrink-0 text-white/50" /></label>
            </div>
          </div>
        </div>
      </div>

      {filtersOpen && <ShowroomDialog title="Cars search" side onClose={() => setFiltersOpen(false)}>
        <div className="flex h-[calc(100dvh-5.5rem)] flex-col">
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            <FilterSelect label="Make" value={brand} onChange={value => updateParam('brand', value)} options={[["all", "All makes"], ...brands.map(item => [item, item] as [string, string])]} />
            <FilterSelect label="Body style" value={body} onChange={value => updateParam('type', value)} options={[["all", "All body styles"], ...bodyTypes.map(item => [item, item] as [string, string])]} />
            <FilterSelect label="Price" value={price} onChange={value => updateParam('price', value)} options={[["all", "Any price"], ["under-150k", "Below S$150,000"], ["150k-200k", "S$150,000 to S$200,000"], ["above-200k", "Above S$200,000"]]} />
            <FilterSelect label="Minimum year" value={year} onChange={value => updateParam('year', value)} options={[["all", "Any year"], ...years.map(item => [String(item), `${item} onwards`] as [string, string])]} />
            <FilterSelect label="Showroom" value={location} onChange={value => updateParam('location', value)} options={[["all", "All locations"], ...locations.map(item => [item, item] as [string, string])]} />
          </div>
          <div className="space-y-3 border-t border-white/10 px-6 py-5">
            <button onClick={() => setFiltersOpen(false)} className="flex w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-5 py-3 font-bold text-black hover:bg-amber-300">Show {filteredCars.length} {filteredCars.length === 1 ? 'match' : 'matches'} <ArrowRight className="h-5 w-5" /></button>
            <button onClick={resetFilters} disabled={!hasFilters} className="w-full rounded-full border border-white/20 px-5 py-3 text-sm font-semibold hover:border-amber-400 hover:text-amber-400 disabled:opacity-35">Reset filters</button>
          </div>
        </div>
      </ShowroomDialog>}

      {compareOpen && <ShowroomDialog title="Compare cars" wide onClose={() => setCompareOpen(false)}>
        <div className="p-6">
          <p className="mb-5 text-sm text-zinc-500">Choose up to three vehicles to compare their prices and specifications.</p>
          <div className="grid gap-4 sm:grid-cols-3">{compareIds.map((id, index) => <label key={index} className="block"><span className="mb-2 block text-xs font-semibold text-zinc-500">Vehicle {index + 1}</span><select aria-label={`Vehicle ${index + 1}`} value={id} onChange={event => setCompareIds(current => current.map((value, position) => position === index ? event.target.value : value))} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none"><option value="">Select a vehicle</option>{cars.map(car => <option key={car.id} value={car.id} disabled={compareIds.some((selected, position) => position !== index && selected === car.id)}>{car.year} {car.brand} {car.model}</option>)}</select></label>)}</div>
          {compareIds.some(Boolean) ? <VehicleComparison cars={compareIds.map(id => cars.find(car => car.id === id)).filter((car): car is Car => !!car)} /> : <p className="py-10 text-center text-sm text-zinc-400">Your comparison will appear here.</p>}
        </div>
      </ShowroomDialog>}

      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        {loadState !== 'ready' && <p role="status" className="mb-5 text-xs text-white/50">{loadState === 'loading' ? 'Updating showroom inventory...' : 'Live inventory is unavailable. Showing the showroom collection.'}</p>}
        {(query || activeCount > 0) && <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-l-2 border-amber-400 bg-[#202020] px-4 py-3"><p className="text-sm text-white/65">{query ? <>Results for <strong className="text-white">&ldquo;{query}&rdquo;</strong></> : 'Filtered collection'} <span className="ml-2 text-white/40">{filteredCars.length} found</span></p><button onClick={resetFilters} className="text-xs font-bold text-amber-400 hover:text-white">Clear filters</button></div>}
        {filteredCars.length ? <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredCars.map(car => <CarCard key={car.id} car={car} saved={savedIds.includes(car.id)} onToggleSave={toggleSaved} />)}</div>
          : <div className="border border-white/10 bg-[#181818] px-6 py-16 text-center"><Heart className="mx-auto mb-4 h-7 w-7 text-white/30" /><h2 className="text-xl font-semibold">{showSaved ? 'No saved cars match this view.' : 'No vehicles match your search.'}</h2><p className="mt-2 text-sm text-white/45">{showSaved ? 'Save a vehicle using the heart, or browse the full collection.' : 'Try another make, model or filter combination.'}</p><button onClick={() => { resetFilters(); if (showSaved) updateParam('saved', ''); }} className="mt-6 rounded-full border border-amber-400/40 px-5 py-3 text-sm font-semibold text-amber-400 hover:bg-amber-400 hover:text-black">{showSaved ? 'Browse all vehicles' : 'Reset filters'}</button></div>}
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-sm text-white/45"><p>{filteredCars.length ? `Showing 1 to ${filteredCars.length} of ${filteredCars.length} results` : 'Showing 0 results'}</p>{filteredCars.length > 0 && <p>Page 01 of 01</p>}</div>
      </div>
    </section>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: [string, string][] }) {
  const id = `inventory-filter-${label.toLowerCase().replace(/\s/g, '-')}`;
  return <div><label htmlFor={id} className="mb-3 block text-sm font-semibold">{label}</label><select id={id} value={value} onChange={event => onChange(event.target.value)} className="w-full border border-white/20 bg-[#1c1c1c] px-4 py-3 text-sm text-white outline-none focus:border-amber-400">{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></div>;
}

function VehicleComparison({ cars }: { cars: Car[] }) {
  const rows: [string, (car: Car) => string][] = [
    ['Price', car => `S$${car.price.toLocaleString('en-SG')}`],
    ['Monthly estimate', car => car.monthly_est_sgd ? `S$${car.monthly_est_sgd.toLocaleString('en-SG')}` : 'Enquire for details'],
    ['Year', car => String(car.year)],
    ['Mileage', car => `${car.mileage_km.toLocaleString('en-SG')} km`],
    ['Body style', car => car.body_type],
    ['Transmission', car => car.transmission],
    ['Fuel', car => car.fuel_type],
    ['COE expiry', car => car.coe_expiry || 'Enquire for details'],
  ];
  return <div className="mt-6 overflow-x-auto"><table className="w-full min-w-96 text-left text-sm text-zinc-900"><caption className="sr-only">Selected vehicle comparison</caption><thead><tr className="border-b border-zinc-200"><th scope="col" className="p-3 text-zinc-500">Specification</th>{cars.map(car => <th key={car.id} scope="col" className="min-w-36 p-3 font-semibold"><Link href={`/mobil/${car.id}`} className="hover:text-amber-600">{car.brand} {car.model}</Link></th>)}</tr></thead><tbody>{rows.map(([label, getValue]) => <tr key={label} className="odd:bg-zinc-50"><th scope="row" className="p-3 font-medium text-zinc-500">{label}</th>{cars.map(car => <td key={car.id} className="p-3">{getValue(car)}</td>)}</tr>)}</tbody></table></div>;
}
