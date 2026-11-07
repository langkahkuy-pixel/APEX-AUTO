'use client';

import { formatRupiah } from '@/lib/locale';


import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Info } from 'lucide-react';
import type { Car } from '@/types/car';
import { useState } from 'react';

export function CarCard({ car, saved = false, onToggleSave, compactMobile = false }: {
  car: Car;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
  compactMobile?: boolean;
}) {
  const image = car.id === 'car-013'
    ? { url: 'https://images.unsplash.com/photo-1748466245947-bb2e22e758ed?auto=format&fit=crop&w=1200&q=80' }
    : car.images.find(image => image.is_main) || car.images[0];
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const detailPath = `/mobil/${car.id}`;

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden bg-[#202020] text-white lg:h-[clamp(530px,44vw,610px)]">
      <Link href={detailPath} aria-label={`Lihat ${car.brand} ${car.model}`} className="relative block aspect-[16/10] overflow-hidden bg-zinc-900 focus-visible:outline-2 focus-visible:outline-amber-400 lg:h-[45%] lg:shrink-0 lg:aspect-auto lg:transition-[height] lg:duration-500 lg:group-hover:h-[35%] lg:group-focus-within:h-[35%] motion-reduce:transition-none">
        {image && failedImageUrl !== image.url ? <Image src={image.url} alt={`${car.brand} ${car.model}`} fill onError={() => setFailedImageUrl(image.url)} sizes={compactMobile ? '(max-width: 1023px) 50vw, 33vw' : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'} className="object-cover transition-transform duration-500 lg:group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none" /> : <div className="flex h-full items-center justify-center text-sm text-white/40">Foto belum tersedia</div>}
      </Link>
      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 bg-[#363636] ${compactMobile ? 'px-2.5 py-3 sm:min-h-20 sm:px-5 sm:py-4' : 'min-h-20 px-5 py-4'}`}>
        <p className={`min-w-0 font-bold tracking-tight ${compactMobile ? 'text-[clamp(0.75rem,3.4vw,0.9375rem)] sm:text-xl' : 'shrink-0 text-xl'}`}>{formatRupiah(car.price)}</p>
        {car.monthly_est_idr ? <><span className={`h-6 w-px shrink-0 bg-white/20 ${compactMobile ? 'hidden sm:block' : ''}`} /><p className={`inline-flex w-full min-w-0 flex-wrap items-center gap-1 font-medium sm:text-sm ${compactMobile ? 'text-[10px]' : 'text-xs'}`}><Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {formatRupiah(car.monthly_est_idr)} <span className="font-normal text-white/60">/bulan (estimasi)</span></p></> : <span className="ml-auto text-xs text-white/50">Harga Tunai</span>}
      </div>
      <div className={`flex flex-1 flex-col lg:justify-between ${compactMobile ? 'gap-3 px-2.5 pb-3 pt-4 sm:gap-5 sm:px-5 sm:pb-5 sm:pt-6' : 'gap-5 px-5 pb-5 pt-6'}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className={`font-extrabold leading-tight tracking-tight text-amber-400 ${compactMobile ? 'line-clamp-3 min-h-[3.25rem] text-sm sm:line-clamp-2 sm:min-h-14 sm:text-[clamp(1.3rem,1.8vw,1.65rem)]' : 'line-clamp-2 min-h-14 text-[clamp(1.3rem,1.8vw,1.65rem)]'}`}><Link href={detailPath} className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-amber-400">{car.brand} {car.model}</Link></h2>
            <p className={`mt-2 text-[11px] font-semibold ${car.status === 'available' ? 'text-emerald-400' : car.status === 'reserved' ? 'text-amber-300' : 'text-white/45'}`}>{car.status === 'available' ? "Tersedia" : car.status === 'reserved' ? "Dipesan" : "Terjual"}</p>
          </div>
          {onToggleSave && <button onClick={() => onToggleSave(car.id)} aria-pressed={saved} aria-label={`${saved ? "Hapus" : "Simpan"} ${car.brand} ${car.model}${saved ? " dari mobil tersimpan" : " ke mobil tersimpan"}`} className={`grid shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-amber-400 ${compactMobile ? 'absolute right-1.5 top-1.5 z-10 h-10 w-10 bg-black/55 sm:static sm:h-9 sm:w-9 sm:bg-transparent' : 'h-9 w-9'} ${saved ? 'text-amber-400' : 'text-white/70 hover:text-amber-400'}`}><Heart className={`${compactMobile ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-6 w-6'} ${saved ? 'fill-current' : ''}`} strokeWidth={1.7} /></button>}
        </div>
        <div className={`flex items-center font-semibold sm:justify-between sm:gap-2 sm:divide-x sm:divide-white/20 sm:text-sm ${compactMobile ? 'flex-wrap gap-x-2 gap-y-1 text-[10px]' : 'justify-between gap-2 divide-x divide-white/20 text-xs'}`}><span className={compactMobile ? 'sm:pr-2' : 'pr-2'}>{car.year}</span><span className={`whitespace-nowrap ${compactMobile ? 'sm:px-2' : 'px-2'}`}>{car.mileage_km.toLocaleString('id-ID')} km</span><span className={compactMobile ? 'sm:pl-2' : 'pl-2'}>{car.body_type}</span></div>
        <div className="mt-auto overflow-hidden transition-all duration-500 lg:max-h-0 lg:translate-y-4 lg:opacity-0 lg:group-hover:max-h-16 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:max-h-16 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 motion-reduce:transition-none">
          <Link href={detailPath} className={`flex items-center justify-center rounded-full bg-amber-400 font-semibold text-black transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${compactMobile ? 'gap-1.5 px-2 py-2.5 text-xs sm:gap-3 sm:px-5 sm:py-3 sm:text-base' : 'gap-3 px-5 py-3 text-base'}`}>Lihat Detail <span className={`grid place-items-center rounded-full bg-black text-amber-400 ${compactMobile ? 'h-5 w-5 sm:h-7 sm:w-7' : 'h-7 w-7'}`}><ArrowRight className={compactMobile ? 'h-3 w-3 sm:h-4 sm:w-4' : 'h-4 w-4'} /></span></Link>
        </div>
      </div>
    </article>
  );
}
