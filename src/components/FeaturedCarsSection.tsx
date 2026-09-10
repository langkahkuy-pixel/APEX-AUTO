'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_CARS } from '@/data/mock-cars';
import { Car } from '@/types/car';
import { ArrowRight } from 'lucide-react';

function FeaturedCard({ car }: { car: Car }) {
  const mainImage = car.images?.find((img) => img.is_main)?.url || car.images?.[0]?.url;

  return (
    <Link href={`/mobil/${car.id}`} className="group block">
      {/* Image — dominant, 3:2 aspect */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-zinc-100">
        {mainImage && (
          <Image
            src={mainImage}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>

      {/* Info — minimal: brand, model, price */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-zinc-400 font-medium tracking-wide uppercase">
            {car.brand}
          </p>
          <h3 className="text-base font-semibold text-zinc-900 mt-0.5">
            {car.model}
          </h3>
        </div>
        <p className="text-base font-semibold text-zinc-900 tabular-nums whitespace-nowrap">
          S${car.price.toLocaleString('en-SG')}
        </p>
      </div>
    </Link>
  );
}

export function FeaturedCarsSection() {
  const [cars, setCars] = React.useState<Car[]>(MOCK_CARS);

  React.useEffect(() => {
    let isMounted = true;
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.data)) {
          setCars(data.data);
        }
      })
      .catch((err) => console.warn('Failed to load featured cars:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredCars = cars
    .filter((c) => c.is_featured || c.status === 'available')
    .slice(0, 4);

  return (
    <section id="unggulan" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header — minimal */}
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Featured
          </h2>
          <Link
            href="/inventory"
            className="group flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 2-column grid — photos breathe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {featuredCars.map((car) => (
            <FeaturedCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
