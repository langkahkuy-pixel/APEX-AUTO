'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CarStatus } from '@/types/car';

interface QuickStatusChangerProps {
  carId: string;
  currentStatus: CarStatus;
  carName: string;
  onStatusChange: (carId: string, newStatus: CarStatus) => void | Promise<void>;
  size?: 'sm' | 'md';
}
const statusStyle: Record<CarStatus, string> = {
  available: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  reserved: 'border-amber-200 bg-amber-50 text-amber-800',
  sold: 'border-zinc-200 bg-zinc-100 text-zinc-500',
};
export default function QuickStatusChanger({ carId, currentStatus, carName, onStatusChange, size = 'sm' }: QuickStatusChangerProps) {
  const [updating, setUpdating] = useState(false);
  async function changeStatus(status: CarStatus) {
    setUpdating(true);
    try { await onStatusChange(carId, status); }
    finally { setUpdating(false); }
  }
  return (
    <div className="relative inline-flex">
      <select aria-label={`Status ${carName}`} value={currentStatus} disabled={updating} onChange={event => void changeStatus(event.target.value as CarStatus)}
        className={`appearance-none rounded-full border py-1.5 pl-3 pr-8 font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-wait disabled:opacity-50 ${statusStyle[currentStatus]} ${size === 'sm' ? 'text-[11px]' : 'text-xs'}`}>
        <option value="available" className="bg-white text-zinc-800">Tersedia</option>
        <option value="reserved" className="bg-white text-zinc-800">Dipesan</option>
        <option value="sold" className="bg-white text-zinc-800">Terjual</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-current opacity-60" />
    </div>
  );
}
