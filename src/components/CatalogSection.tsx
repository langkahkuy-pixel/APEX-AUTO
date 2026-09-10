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
  bodyType: 'All',
  priceRange: 'all',
  minYear: 0,
  location: 'All Locations',
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
      const isAllBody = filters.bodyType === 'All' || filters.bodyType === 'Semua';
      if (!isAllBody && car.body_type !== filters.bodyType) {
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
      const isAllLoc = filters.location === 'All Locations' || filters.location === 'Semua Lokasi';
      if (
        !isAllLoc &&
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

  const isAllBodySelected = filters.bodyType === 'All' || filters.bodyType === 'Semua';
  const isAllLocSelected = filters.location === 'All Locations' || filters.location === 'Semua Lokasi';

  const activeFilterCount =
    (filters.search.trim() ? 1 : 0) +
    (!isAllBodySelected ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.minYear > 0 ? 1 : 0) +
    (!isAllLocSelected ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0 || filters.sortBy !== 'newest';

  const resetFilters = () => {
    setFilters(INITIAL_FILTER);
  };

  return (
    <section id="katalog" className="py-12 sm:py-16 text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Showroom Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curated Car Catalog
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Filter through verified luxury and pre-owned vehicles with transparent SGD Nett pricing.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs text-slate-500">
              Showing <span className="font-bold text-amber-600">{filteredCars.length}</span> of {MOCK_CARS.length} vehicles
            </span>
            {hasActiveFilters && (
              <button
                id="reset-filter-header-btn"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 transition-all hover:bg-rose-100"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Controls Container */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 mb-10 shadow-sm space-y-5">
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
                placeholder="Search by brand, model, color, or feature (e.g. Mercedes, Porsche, Sunroof, Hybrid)..."
                className="w-full pl-11 pr-20 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all"
              />
              {filters.search && (
                <button
                  id="clear-search-btn"
                  onClick={() => setFilters({ ...filters, search: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2.5 py-1 rounded-lg transition-colors"
                >
                  Clear
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
                className="w-full appearance-none px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-amber-500 pr-10 cursor-pointer"
              >
                <option value="newest">Sort: Recently Added</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Manufacture Year: Newest First</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Quick Popular Search Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-[11px] text-slate-400 font-medium">Popular Searches:</span>
            {['Mercedes', 'Porsche', 'BMW', 'Harrier', 'Hybrid', 'Sunroof'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilters({ ...filters, search: tag })}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                  filters.search.toLowerCase() === tag.toLowerCase()
                    ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Body Type Pills with Item Counts */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CarIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Vehicle Body Style</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BODY_TYPES.map((type) => {
                const isAll = type === 'All' || type === 'Semua';
                const isActive = isAll ? isAllBodySelected : filters.bodyType === type;
                const count = isAll
                  ? MOCK_CARS.length
                  : MOCK_CARS.filter((c) => c.body_type === type).length;
                const displayLabel = isAll ? 'All Models' : type;

                return (
                  <button
                    key={type}
                    id={`filter-body-${type.toLowerCase()}`}
                    onClick={() => setFilters({ ...filters, bodyType: type })}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>{displayLabel}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950 font-bold'
                          : 'bg-slate-200 text-slate-600'
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            {/* Price Filter */}
            <div>
              <label htmlFor="filter-price" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Price Range (SGD)
              </label>
              <div className="relative">
                <select
                  id="filter-price"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 pr-8 cursor-pointer"
                >
                  <option value="all">All Price Ranges</option>
                  <option value="under-150k">&lt; SGD $150,000</option>
                  <option value="150k-200k">SGD $150,000 - $200,000</option>
                  <option value="above-200k">&gt; SGD $200,000</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Min Year Filter */}
            <div>
              <label htmlFor="filter-year" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Minimum Manufacture Year
              </label>
              <div className="relative">
                <select
                  id="filter-year"
                  value={filters.minYear}
                  onChange={(e) => setFilters({ ...filters, minYear: Number(e.target.value) })}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 pr-8 cursor-pointer"
                >
                  <option value={0}>All Years</option>
                  <option value={2023}>2023 &amp; Newer</option>
                  <option value={2022}>2022 &amp; Newer</option>
                  <option value={2021}>2021 &amp; Newer</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="filter-location" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Showroom Hub Location
              </label>
              <div className="relative">
                <select
                  id="filter-location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 pr-8 cursor-pointer"
                >
                  {SINGAPORE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'All Locations' || loc === 'Semua Lokasi' ? 'All Showroom Hubs' : loc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips / Tags */}
          {hasActiveFilters && (
            <div id="active-filters-container" className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium">Active Filters ({activeFilterCount}):</span>
              {filters.search && (
                <span id="chip-filter-search" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 shadow-sm">
                  <span>Keyword: "{filters.search}"</span>
                  <button
                    id="remove-filter-search"
                    aria-label="Remove search keyword"
                    onClick={() => setFilters({ ...filters, search: '' })}
                    className="hover:text-rose-600 hover:bg-slate-200 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {!isAllBodySelected && (
                <span id="chip-filter-body" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 shadow-sm">
                  <span>Body: {filters.bodyType}</span>
                  <button
                    id="remove-filter-body"
                    aria-label="Remove body filter"
                    onClick={() => setFilters({ ...filters, bodyType: 'All' })}
                    className="hover:text-rose-600 hover:bg-slate-200 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.priceRange !== 'all' && (
                <span id="chip-filter-price" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 shadow-sm">
                  <span>
                    Price:{' '}
                    {filters.priceRange === 'under-150k'
                      ? '< SGD $150k'
                      : filters.priceRange === '150k-200k'
                      ? 'SGD $150k - $200k'
                      : '> SGD $200k'}
                  </span>
                  <button
                    id="remove-filter-price"
                    aria-label="Remove price filter"
                    onClick={() => setFilters({ ...filters, priceRange: 'all' })}
                    className="hover:text-rose-600 hover:bg-slate-200 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.minYear > 0 && (
                <span id="chip-filter-year" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200 shadow-sm">
                  <span>Year: {filters.minYear}+</span>
                  <button
                    id="remove-filter-year"
                    aria-label="Remove year filter"
                    onClick={() => setFilters({ ...filters, minYear: 0 })}
                    className="hover:text-rose-400 hover:bg-slate-700/80 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              {!isAllLocSelected && (
                <span id="chip-filter-location" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200 shadow-sm">
                  <span>Location: {filters.location.split(',')[0]}</span>
                  <button
                    id="remove-filter-location"
                    aria-label="Remove location filter"
                    onClick={() => setFilters({ ...filters, location: 'All Locations' })}
                    className="hover:text-rose-400 hover:bg-slate-700/80 p-0.5 rounded-full text-slate-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                id="clear-all-chips-btn"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 ml-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Cars Grid / List */}
        {filteredCars.length > 0 ? (
          <div>
            {/* Quick Sort Bar & Results Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="text-xs text-slate-500">
                {filters.search ? (
                  <span>
                    Search results for: <span className="font-semibold text-amber-600">"{filters.search}"</span>{' '}
                    ({filteredCars.length} vehicles found)
                  </span>
                ) : (
                  <span>
                    Showing <span className="font-bold text-slate-900">{filteredCars.length}</span> verified units
                  </span>
                )}
              </div>

              {/* Quick Sort Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 mr-1 text-[11px] font-medium">Quick Sort:</span>
                <button
                  id="sort-quick-newest"
                  onClick={() => setFilters({ ...filters, sortBy: 'newest' })}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filters.sortBy === 'newest'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Newest
                </button>
                <button
                  id="sort-quick-price-asc"
                  onClick={() => setFilters({ ...filters, sortBy: 'price-asc' })}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filters.sortBy === 'price-asc'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Price: Low → High
                </button>
                <button
                  id="sort-quick-price-desc"
                  onClick={() => setFilters({ ...filters, sortBy: 'price-desc' })}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filters.sortBy === 'price-desc'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Price: High → Low
                </button>
                <button
                  id="sort-quick-year-desc"
                  onClick={() => setFilters({ ...filters, sortBy: 'year-desc' })}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    filters.sortBy === 'year-desc'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Year: Newest
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
          <div className="text-center py-16 px-6 bg-white border-2 border-dashed border-slate-300 rounded-3xl max-w-3xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-sm">
              <Search className="w-6 h-6" />
            </div>

            {filters.search ? (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No Vehicles Found for "{filters.search}"
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  We could not find any vehicle matching this keyword in our active inventory.
                </p>

                {/* Helpful tips */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto mb-6 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-amber-700">Search Tips:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Double check the spelling of the brand or model (e.g. Mercedes, Porsche, BMW).</li>
                    <li>Try broader terms like <span className="font-semibold text-slate-900">SUV</span> or <span className="font-semibold text-slate-900">Sedan</span>.</li>
                    <li>Specific dream car not in stock? Our specialized sourcing team can acquire units from our dealer network.</li>
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setFilters({ ...filters, search: '' })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-all border border-slate-200"
                  >
                    <span>Clear Search Keyword</span>
                  </button>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-semibold text-xs transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                  <a
                    href={`https://wa.me/6581234567?text=${encodeURIComponent(
                      `Hello Apex Auto, I am searching for "${filters.search}". Can your team help source this vehicle?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <span>Request Sourcing for "{filters.search}"</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No Vehicles Match Current Filters
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  The selected combination of body type, price range, or year currently has no matching inventory.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore All Filters</span>
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
