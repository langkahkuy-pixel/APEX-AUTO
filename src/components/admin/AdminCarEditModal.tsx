'use client';

import React, { useState, useEffect } from 'react';
import { Car, CarStatus } from '@/types/car';
import { X, Save, Car as CarIcon, DollarSign, Calendar, MapPin, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

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
        depreciation_sgd: Number(formData.depreciation_sgd) || car.depreciation_sgd,
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
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <CarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Edit Vehicle: {car.brand} {car.model}
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Vehicle ID: {car.id} • Year {car.year}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Alert */}
        {successNotice && (
          <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Vehicle details updated successfully in the showroom system!</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Price (SGD) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                SGD Nett Price *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                  min={10000}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold text-amber-400 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Status Unit */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Availability Status *
              </label>
              <select
                value={formData.status || 'available'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CarStatus })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-semibold focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="available">Available (Ready Stock)</option>
                <option value="reserved">Reserved / Booking</option>
                <option value="sold">Sold (Closed)</option>
              </select>
            </div>

            {/* COE Expiry */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                COE Expiry (LTA)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.coe_expiry || ''}
                  onChange={(e) => setFormData({ ...formData, coe_expiry: e.target.value })}
                  placeholder="e.g. 10-Year COE (till 2032)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            {/* Depreciation (SGD/year) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Annual Depreciation (SGD/year)
              </label>
              <input
                type="number"
                value={formData.depreciation_sgd || ''}
                onChange={(e) => setFormData({ ...formData, depreciation_sgd: Number(e.target.value) })}
                placeholder="24500"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Location / Hub */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Showroom Hub Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.location || 'Leng Kee Showroom (South/Central)'}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Leng Kee Showroom (South/Central)">Leng Kee Showroom (South/Central)</option>
                </select>
              </div>
            </div>

            {/* Mileage (KM) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mileage (KM)
              </label>
              <input
                type="number"
                value={formData.mileage_km || ''}
                onChange={(e) => setFormData({ ...formData, mileage_km: Number(e.target.value) })}
                placeholder="12500"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Vehicle Overview & Condition
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
