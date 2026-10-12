'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Info } from 'lucide-react';
import type { Car } from '@/types/car';
import { useState } from 'react';

export function CarCard({ car, saved = false, onToggleSave }: {
  car: Car;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
}) {
  const image = car.images.find(image => image.is_main) || car.images[0];
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const detailPath = `/mobil/${car.id}`;

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden bg-[#202020] text-white lg:h-[clamp(480px,40vw,560px)]">
      <Link href={detailPath} aria-label={`View ${car.brand} ${car.model}`} className="relative block aspect-[16/10] overflow-hidden bg-zinc-900 focus-visible:outline-2 focus-visible:outline-amber-400 lg:h-[52%] lg:shrink-0 lg:aspect-auto lg:transition-[height] lg:duration-500 lg:group-hover:h-[42%] lg:group-focus-within:h-[42%] motion-reduce:transition-none">
        {image && failedImageUrl !== image.url ? <Image src={image.url} alt={`${car.brand} ${car.model}`} fill onError={() => setFailedImageUrl(image.url)} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 lg:group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none" /> : <div className="flex h-full items-center justify-center text-sm text-white/40">Photo unavailable</div>}
      </Link>
      <div className="flex min-h-16 items-center gap-3 bg-[#363636] px-5 py-4">
        <p className="shrink-0 text-xl font-bold tracking-tight">S${car.price.toLocaleString('en-SG')}</p>
        {car.monthly_est_sgd ? <><span className="h-6 w-px shrink-0 bg-white/20" /><p className="inline-flex min-w-0 flex-wrap items-center gap-1 text-xs font-medium sm:text-sm"><Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> S${car.monthly_est_sgd.toLocaleString('en-SG')} <span className="font-normal text-white/60">/mo (est.)</span></p></> : <span className="ml-auto text-xs text-white/50">SGD Nett</span>}
      </div>
      <div className="flex flex-1 flex-col gap-5 px-5 pb-5 pt-6 lg:justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="line-clamp-2 min-h-14 text-[clamp(1.3rem,1.8vw,1.65rem)] font-extrabold leading-tight tracking-tight text-amber-400"><Link href={detailPath} className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-amber-400">{car.brand} {car.model}</Link></h2>
            <p className={`mt-2 text-[11px] font-semibold ${car.status === 'available' ? 'text-emerald-400' : car.status === 'reserved' ? 'text-amber-300' : 'text-white/45'}`}>{car.status === 'available' ? 'Available' : car.status === 'reserved' ? 'Reserved' : 'Sold'}</p>
          </div>
          {onToggleSave && <button onClick={() => onToggleSave(car.id)} aria-pressed={saved} aria-label={`${saved ? 'Remove' : 'Save'} ${car.brand} ${car.model}${saved ? ' from saved cars' : ' to saved cars'}`} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 ${saved ? 'bg-amber-400/10 text-amber-400' : 'text-white/50 hover:text-amber-400'}`}><Heart className={`h-6 w-6 ${saved ? 'fill-current' : ''}`} strokeWidth={1.7} /></button>}
        </div>
        <div className="flex items-center justify-between gap-2 divide-x divide-white/20 text-xs font-semibold sm:text-sm"><span className="pr-2">{car.year}</span><span className="whitespace-nowrap px-2">{car.mileage_km.toLocaleString('en-SG')} km</span><span className="pl-2">{car.body_type}</span></div>
        <div className="overflow-hidden transition-all duration-500 lg:max-h-0 lg:translate-y-4 lg:opacity-0 lg:group-hover:max-h-16 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:max-h-16 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 motion-reduce:transition-none">
          <Link href={detailPath} className="flex items-center justify-center gap-3 rounded-full bg-amber-400 px-5 py-3 text-base font-semibold text-black transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">View Details <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-amber-400"><ArrowRight className="h-4 w-4" /></span></Link>
        </div>
      </div>
    </article>
  );
}
