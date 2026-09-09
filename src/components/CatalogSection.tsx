'use client';

import React, { useState, useMemo } from 'react';
import { Car, FilterState } from '@/types/car';
import { MOCK_CARS, SINGAPORE_LOCATIONS, BODY_TYPES } from '@/data/mock-cars';
import { CarCard } from './CarCard';
import { CarDetailModal } from './CarDetailModal';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Car as CarIcon,
  ChevronDown,
  Check,
} from 'lucide-react';

const INITIAL_FILTER: FilterState = {
  search: '',
  bodyType: 'Semua',
  priceRange: 'all',
  minYear: 0,
  location: 'Semua Lokasi',
  sortBy: 'newest',
};

export function CatalogSection() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Filter and sort logic
  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter((car) => {
      // Search by brand, model, color, features
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesModel = car.model.toLowerCase().includes(query);
        const matchesLocation = car.location.toLowerCase().includes(query);
        const matchesFeature = car.features.some((f) => f.toLowerCase().includes(query));
        if (!matchesBrand && !matchesModel && !matchesLocation && !matchesFeature) {
          return false;
        }
      }

      // Filter by body type
      if (filters.bodyType !== 'Semua' && car.body_type !== filters.bodyType) {
        return false;
      }

      // Filter by price range
      if (filters.priceRange === 'under-150k' && car.price >= 150000) {
        return false;
      }
      if (
        filters.priceRange === '150k-200k' &&
        (car.price < 150000 || car.price > 200000)
      ) {
        return false;
      }
      if (filters.priceRange === 'above-200k' && car.price <= 200000) {
        return false;
      }

      // Filter by minimum year
      if (filters.minYear > 0 && car.year < filters.minYear) {
        return false;
      }

      // Filter by location
      if (
        filters.location !== 'Semua Lokasi' &&
        car.location !== filters.location
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'year-desc') {
        return b.year - a.year;
      }
      // default newest by created_at
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [filters]);

  const activeFilterCount =
    (filters.search.trim() ? 1 : 0) +
    (filters.bodyType !== 'Semua' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.minYear > 0 ? 1 : 0) +
    (filters.location !== 'Semua Lokasi' ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0 || filters.sortBy !== 'newest';

  const resetFilters = () => {
    setFilters(INITIAL_FILTER);
  };

  return (
    <section id="katalog" className="py-12 sm:py-16 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inventaris Showroom Singapura</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Katalog Mobil Pilihan
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Temukan mobil idaman Anda dengan filter harga, tipe bodi, tahun, dan lokasi di Singapura.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs text-slate-400">
              Menampilkan <span className="font-bold text-amber-400">{filteredCars.length}</span> dari {MOCK_CARS.length} mobil
            </span>
            {hasActiveFilters && (
              <button
                id="reset-filter-header-btn"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 transition-all hover:bg-rose-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filter {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Controls Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-10 shadow-xl shadow-slate-950/50 backdrop-blur-sm space-y-5">
          {/* Top Row: Search Input & Sort Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="search-input"
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Cari berdasarkan merek, model, warna, atau fitur (mis. Mercedes, Porsche, Sunroof, Hybrid)..."
                className="w-full pl-11 pr-20 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              {filters.search && (
                <button
                  id="clear-search-btn"
                  onClick={() => setFilters({ ...filters, search: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg transition-colors"
                >
                  Hapus
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-4 relative">
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
                }
                className="w-full appearance-none px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500 pr-10 cursor-pointer"
              >
                <option value="newest">Urutan: Terbaru Ditambahkan</option>
                <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                <option value="year-desc">Tahun: Paling Baru</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Quick Popular Search Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-[11px] text-slate-500 font-medium">Pencarian Populer:</span>
            {['Mercedes', 'Porsche', 'BMW', 'Harrier', 'Hybrid', 'Sunroof'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilters({ ...filters, search: tag })}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                  filters.search.toLowerCase() === tag.toLowerCase()
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Body Type Pills with Item Counts */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CarIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Tipe Bodi Kendaraan</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BODY_TYPES.map((type) => {
                const isActive = filters.bodyType === type;
                const count =
                  type === 'Semua'
                    ? MOCK_CARS.length
                    : MOCK_CARS.filter((c) => c.body_type === type).length;

                return (
                  <button
                    key={type}
                    id={`filter-body-${type.toLowerCase()}`}
                    onClick={() => setFilters({ ...filters, bodyType: type })}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{type}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Row Filters: Price Range, Year, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
            {/* Price Filter */}
            <div>
              <label htmlFor="filter-price" className="block text-xs font-medium text-slate-400 mb-1.5">
                Kisaran Harga (SGD)
              </label>
              <div className="relative">
                <select
                  id="filter-price"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500 pr-8 cursor-pointer"
                >
                  <option value="all">Semua Kisaran Harga</option>
                  <option value="under-150k">&lt; SGD $150,000</option>
                  <option value="150k-200k">SGD $150,000 - $200,000</option>
                  <option value="above-200k">&gt; SGD $200,000</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Min Year Filter */}
            <div>
              <label htmlFor="filter-year" className="block text-xs font-medium text-slate-400 mb-1.5">
                Minimal Tahun Pembuatan
              </label>
              <div className="relative">
                <select
                  id="filter-year"
                  value={filters.minYear}
                  onChange={(e) => setFilters({ ...filters, minYear: Number(e.target.value) })}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500 pr-8 cursor-pointer"
                >
                  <option value={0}>Semua Tahun</option>
                  <option value={2023}>2023 ke atas</option>
                  <option value={2022}>2022 ke atas</option>
                  <option value={2021}>2021 ke atas</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="filter-location" className="block text-xs font-medium text-slate-400 mb-1.5">
                Lokasi Showroom Singapura
              </label>
              <div className="relative">
                <select
                  id="filter-location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500 pr-8 cursor-pointer"
                >
                  {SINGAPORE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips / Tags */}
          {hasActiveFilters && (
            <div id="active-filters-container" className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500 font-medium">Filter Aktif ({activeFilterCount}):</span>
              {filters.search && (
                <span id="chip-filter-search" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200 shadow-sm">
                  <span>Kata Kunci: "{filters.search}"</span>
                  <button
                    id="remove-filter-search"
                    aria-label="Hapus filter pencarian"
                    onClick={() => setFilters({ ...filters, search: '' })}
                    className="hover:text-rose-400 hover:bg-slate-700/80 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.bodyType !== 'Semua' && (
                <span id="chip-filter-body" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200 shadow-sm">
                  <span>Bodi: {filters.bodyType}</span>
                  <button
                    id="remove-filter-body"
                    aria-label="Hapus filter tipe bodi"
                    onClick={() => setFilters({ ...filters, bodyType: 'Semua' })}
                    className="hover:text-rose-400 hover:bg-slate-700/80 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.priceRange !== 'all' && (
                <span id="chip-filter-price" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200 shadow-sm">
                  <span>
                    Harga:{' '}
                    {filters.priceRange === 'under-150k'
                      ? '< SGD $150k'
                      : filters.priceRange === '150k-200k'
                      ? 'SGD $150k - $200k'
                      : '> SGD $200k'}
                  </span>
                  <button
                    id="remove-filter-price"
                    aria-label="Hapus filter harga"
                    onClick={() => setFilters({ ...filters, priceRange: 'all' })}
                    className="hover:text-rose-400 hover:bg-slate-700/80 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.minYear > 0 && (
                <span id="chip-filter-year" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200 shadow-sm">
                  <span>Tahun: {filters.minYear}+</span>
                  <button
                    id="remove-filter-year"
                    aria-label="Hapus filter tahun"
                    onClick={() => setFilters({ ...filters, minYear: 0 })}
                    className="hover:text-rose-400 hover:bg-slate-700/80 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.location !== 'Semua Lokasi' && (
                <span id="chip-filter-location" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200 shadow-sm">
                  <span>Lokasi: {filters.location.split(',')[0]}</span>
                  <button
                    id="remove-filter-location"
                    aria-label="Hapus filter lokasi"
                    onClick={() => setFilters({ ...filters, location: 'Semua Lokasi' })}
                    className="hover:text-rose-400 hover:bg-slate-700/80 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                id="clear-all-chips-btn"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 ml-1 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Hapus Semua Filter</span>
              </button>
            </div>
          )}
        </div>

        {/* Cars Grid / List */}
        {filteredCars.length > 0 ? (
          <div>
            {/* Quick Sort Bar & Results Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="text-xs text-slate-400">
                {filters.search ? (
                  <span>
                    Hasil pencarian: <span className="font-semibold text-amber-400">"{filters.search}"</span>{' '}
                    ({filteredCars.length} mobil ditemukan)
                  </span>
                ) : (
                  <span>
                    Menampilkan <span className="font-semibold text-white">{filteredCars.length}</span> unit mobil
                  </span>
                )}
              </div>

              {/* Quick Sort Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-500 mr-1 text-[11px]">Urutkan Cepat:</span>
                <button
                  id="sort-quick-newest"
                  onClick={() => setFilters({ ...filters, sortBy: 'newest' })}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filters.sortBy === 'newest'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  Terbaru
                </button>
                <button
                  id="sort-quick-price-asc"
                  onClick={() => setFilters({ ...filters, sortBy: 'price-asc' })}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filters.sortBy === 'price-asc'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  Harga: Rendah → Tinggi
                </button>
                <button
                  id="sort-quick-price-desc"
                  onClick={() => setFilters({ ...filters, sortBy: 'price-desc' })}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filters.sortBy === 'price-desc'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  Harga: Tinggi → Rendah
                </button>
                <button
                  id="sort-quick-year-desc"
                  onClick={() => setFilters({ ...filters, sortBy: 'year-desc' })}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filters.sortBy === 'year-desc'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  Tahun: Paling Baru
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onSelectCar={(c) => setSelectedCar(c)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-6 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-400 shadow-lg shadow-amber-500/5">
              <Search className="w-6 h-6" />
            </div>

            {filters.search ? (
              <>
                <h3 className="text-xl font-bold text-white mb-2">
                  Tidak Ada Mobil Ditemukan untuk "{filters.search}"
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                  Kami tidak menemukan mobil dengan merek, model, atau fitur yang cocok dengan kata kunci tersebut di showroom kami.
                </p>

                {/* Helpful tips */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 text-left max-w-md mx-auto mb-6 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-amber-400">Saran Pencarian:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Periksa kembali ejaan kata kunci (contoh: Mercedes, Porsche, BMW, Toyota).</li>
                    <li>Coba gunakan kata kunci yang lebih umum seperti <span className="text-slate-200">SUV</span> atau <span className="text-slate-200">Sedan</span>.</li>
                    <li>Mobil incaran Anda belum ada di katalog? Tim sourcing kami dapat mencarikan unit lelang atau dealer mitra di Singapura.</li>
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setFilters({ ...filters, search: '' })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
                  >
                    <span>Hapus Kata Kunci "{filters.search}"</span>
                  </button>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 font-semibold text-xs transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Semua Filter</span>
                  </button>
                  <a
                    href={`https://wa.me/6581234567?text=${encodeURIComponent(
                      `Halo Apex Auto Singapore, saya sedang mencari mobil "${filters.search}" di Singapura. Apakah showroom bisa bantu mencarikan unit ini?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all"
                  >
                    <span>Minta Sales Carikan "{filters.search}"</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-2">
                  Tidak Ada Mobil yang Cocok dengan Filter
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                  Kombinasi filter tipe bodi, kisaran harga, atau tahun saat ini tidak memiliki unit yang cocok di inventaris.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Kembalikan Semua Filter</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal Detail Mobil */}
      <CarDetailModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
      />
    </section>
  );
}
