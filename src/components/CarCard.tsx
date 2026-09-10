'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import { Fuel, Gauge, Cog, MapPin, Calendar, MessageCircle, Eye } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onSelectCar?: (car: Car) => void;
}

export function CarCard({ car }: CarCardProps) {
  const mainImage = car.images.find((img) => img.is_main) || car.images[0];

  // WhatsApp prefilled message
  const waText = encodeURIComponent(
    `Hello Apex Auto Singapore, I would like to inquire about the ${car.brand} ${car.model} (${car.year}) priced at SGD $${car.price.toLocaleString('en-US')} listed on your website.`
  );
  const waUrl = `https://wa.me/6581234567?text=${waText}`;

  // Status color badges
  const statusBadge = () => {
    switch (car.status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Available</span>
          </span>
        );
      case 'reserved':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            <span>Reserved</span>
          </span>
        );
      case 'sold':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-600 text-white font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
            <span>Sold</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-slate-300 transition-all duration-300 hover:shadow-md flex flex-col text-slate-900">
      {/* Image Container with Link */}
      <Link
        href={`/mobil/${car.id}`}
        className="block relative aspect-[16/10] w-full bg-slate-100 overflow-hidden cursor-pointer"
      >
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
            Photo unavailable
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          {statusBadge()}
          {car.is_featured && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-2 right-3 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200 shadow-sm">
            {car.body_type}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Model */}
          <div className="text-xs uppercase tracking-wider text-amber-600 font-bold mb-1">
            {car.brand}
          </div>
          <Link href={`/mobil/${car.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
              {car.model}
            </h3>
          </Link>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-2 my-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Year {car.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.mileage_km.toLocaleString('en-US')} km</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cog className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.fuel_type}</span>
            </div>
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 mb-4">
            <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">SGD Nett Price</div>
              <div className="text-lg font-extrabold text-slate-900">
                SGD ${car.price.toLocaleString('en-US')}
              </div>
            </div>
            {car.depreciation_sgd && (
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Est. Depr / Yr</div>
                <div className="text-xs font-bold text-emerald-600">
                  SGD ${car.depreciation_sgd.toLocaleString('en-US')}/yr
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/mobil/${car.id}`}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors border border-slate-200/80"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>View Details</span>
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

