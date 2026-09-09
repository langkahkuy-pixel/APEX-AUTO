'use client';

import React, { useState } from 'react';
import { CarStatus } from '@/types/car';
import { CheckCircle2, Clock, Check, ChevronDown, Sparkles } from 'lucide-react';

interface QuickStatusChangerProps {
  carId: string;
  currentStatus: CarStatus;
  carName: string;
  onStatusChange: (carId: string, newStatus: CarStatus) => void;
  size?: 'sm' | 'md';
}

const STATUS_OPTIONS: {
  value: CarStatus;
  label: string;
  shortLabel: string;
  description: string;
  badgeClass: string;
  activeBorder: string;
}[] = [
  {
    value: 'available',
    label: 'Tersedia (Ready Stock)',
    shortLabel: 'Tersedia',
    description: 'Unit siap dipamerkan di hub showroom, test drive & transaksi langsung.',
    badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    activeBorder: 'border-emerald-500',
  },
  {
    value: 'reserved',
    label: 'Dipesan (Reserved / Booking DP)',
    shortLabel: 'Dipesan',
    description: 'Unit telah menerima booking fee / DP dari calon pembeli.',
    badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    activeBorder: 'border-amber-500',
  },
  {
    value: 'sold',
    label: 'Terjual (Sold Out / Serah Terima)',
    shortLabel: 'Terjual',
    description: 'Unit telah lunas dan diserahterimakan (COE ditransfer).',
    badgeClass: 'bg-slate-800 text-slate-400 border-slate-700',
    activeBorder: 'border-slate-600',
  },
];

export default function QuickStatusChanger({
  carId,
  currentStatus,
  carName,
  onStatusChange,
  size = 'sm',
}: QuickStatusChangerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const currentOption =
    STATUS_OPTIONS.find((opt) => opt.value === currentStatus) || STATUS_OPTIONS[0];

  const handleSelect = (newStatus: CarStatus) => {
    if (newStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    setIsUpdating(true);
    setTimeout(() => {
      onStatusChange(carId, newStatus);
      setIsUpdating(false);
      setIsOpen(false);
    }, 250);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className={`inline-flex items-center gap-1.5 rounded-xl font-bold uppercase tracking-wider border transition-all cursor-pointer ${
          currentOption.badgeClass
        } ${
          size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-xs'
        } ${isUpdating ? 'opacity-50 animate-pulse' : 'hover:scale-105 shadow-sm'}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            currentStatus === 'available'
              ? 'bg-emerald-400 animate-pulse'
              : currentStatus === 'reserved'
              ? 'bg-amber-400'
              : 'bg-slate-400'
          }`}
        />
        <span>{isUpdating ? 'Mengubah...' : currentOption.shortLabel}</span>
        <ChevronDown className={`w-3 h-3 opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 z-40 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-2 space-y-1.5 animate-in fade-in zoom-in-95">
            <div className="px-2 py-1 border-b border-slate-800 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Ubah Cepat Status Unit
            </div>

            {STATUS_OPTIONS.map((opt) => {
              const isSelected = opt.value === currentStatus;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left p-2 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border border-slate-700'
                      : 'hover:bg-slate-800/60'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'border border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {opt.label.split(' ')[0]}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase font-bold ${opt.badgeClass}`}
                      >
                        {opt.value}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
