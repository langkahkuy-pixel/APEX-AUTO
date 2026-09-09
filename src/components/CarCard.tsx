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
    `Halo Apex Auto Singapore, saya ingin menanyakan mobil ${car.brand} ${car.model} (${car.year}) seharga SGD $${car.price.toLocaleString('en-US')} yang tercantum di website showroom.`
  );
  const waUrl = `https://wa.me/6581234567?text=${waText}`;

  // Status color badges
  const statusBadge = () => {
    switch (car.status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-500/90 text-white font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Tersedia</span>
          </span>
        );
      case 'reserved':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm border border-amber-300/40">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
            <span>Dipesan</span>
          </span>
        );
      case 'sold':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-600/90 text-white font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm border border-rose-400/30">
            <span>Terjual</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col">
      {/* Image Container with Link */}
      <Link
        href={`/mobil/${car.id}`}
        className="block relative aspect-[16/10] w-full bg-slate-950 overflow-hidden cursor-pointer"
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
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            Foto tidak tersedia
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          {statusBadge()}
          {car.is_featured && (
            <span className="bg-amber-500/90 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              Unggulan
            </span>
          )}
        </div>

        <div className="absolute bottom-2 right-3 z-10">
          <span className="bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-slate-700">
            {car.body_type}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Model */}
          <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
            {car.brand}
          </div>
          <Link href={`/mobil/${car.id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {car.model}
            </h3>
          </Link>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-2 my-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Tahun {car.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-500" />
              <span>{car.mileage_km.toLocaleString('en-US')} km</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cog className="w-3.5 h-3.5 text-slate-500" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-slate-500" />
              <span>{car.fuel_type}</span>
            </div>
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5 mb-4">
            <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Harga Mobil (SGD)</div>
              <div className="text-lg font-extrabold text-white">
                SGD ${car.price.toLocaleString('en-US')}
              </div>
            </div>
            {car.depreciation_sgd && (
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Est. Depresiasi</div>
                <div className="text-xs font-semibold text-amber-400">
                  SGD ${car.depreciation_sgd.toLocaleString('en-US')}/thn
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/mobil/${car.id}`}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>Detail Mobil</span>
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Tanya Sales</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

