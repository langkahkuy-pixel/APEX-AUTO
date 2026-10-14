'use client';

import React, { useState, useEffect } from 'react';
import { Car, CarStatus } from '@/types/car';
import { X, Save, Car as CarIcon, Banknote, Calendar, MapPin, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

interface AdminCarEditModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCar: Car) => void;
}

export default function AdminCarEditModal({
  car,
  isOpen,
  onClose,
  onSave,
}: AdminCarEditModalProps) {
  const [formData, setFormData] = useState<Partial<Car>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  useEffect(() => {
    if (car) {
      setFormData({
        ...car,
      });
      setSuccessNotice(false);
    }
  }, [car]);

  if (!isOpen || !car) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onSave({
        ...car,
        ...formData,
        price: Number(formData.price) || car.price,
        annual_tax_idr: Number(formData.annual_tax_idr) || car.annual_tax_idr,
        mileage_km: Number(formData.mileage_km) || car.mileage_km,
        year: Number(formData.year) || car.year,
        status: (formData.status as CarStatus) || car.status,
      } as Car);
      setIsSaving(false);
      setSuccessNotice(true);
      setTimeout(() => {
        onClose();
      }, 700);
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-zinc-200 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <CarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Ubah Mobil: {car.brand} {car.model}
              </h2>
              <div className="text-xs text-zinc-500 font-mono">
                Kode Mobil: {car.id} • Tahun {car.year}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Alert */}
        {successNotice && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-700 text-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Data mobil berhasil diperbarui!</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Harga tunai dalam rupiah */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Harga Tunai (Rp) *
              </label>
              <div className="relative">
                <Banknote className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                  min={10000}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 font-semibold text-amber-700 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Status Unit */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Status Ketersediaan *
              </label>
              <select
                value={formData.status || 'available'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CarStatus })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="available">Tersedia</option>
                <option value="reserved">Dipesan</option>
                <option value="sold">Terjual</option>
              </select>
            </div>

            {/* Jatuh tempo pajak kendaraan */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Pajak Berlaku Sampai
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.tax_expiry || ''}
                  onChange={(e) => setFormData({ ...formData, tax_expiry: e.target.value })}
                  placeholder="Contoh: 31 Agustus 2027"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Pajak tahunan dalam rupiah */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Pajak Tahunan (Rp)
              </label>
              <input
                type="number"
                value={formData.annual_tax_idr || ''}
                onChange={(e) => setFormData({ ...formData, annual_tax_idr: Number(e.target.value) })}
                placeholder="12500000"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Location / Hub */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Lokasi Showroom
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.location || "Medan, Sumatera Utara"}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Medan, Sumatera Utara">Medan, Sumatera Utara</option>
                </select>
              </div>
            </div>

            {/* Mileage (KM) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Kilometer
              </label>
              <input
                type="number"
                value={formData.mileage_km || ''}
                onChange={(e) => setFormData({ ...formData, mileage_km: Number(e.target.value) })}
                placeholder="12500"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
              Deskripsi & Kondisi Mobil
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-100 text-zinc-600 text-xs font-semibold transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 text-xs font-semibold flex items-center gap-2 shadow-none  transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
