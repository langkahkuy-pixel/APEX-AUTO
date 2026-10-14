'use client';

import React, { useState } from 'react';
import { Car, CarStatus, BodyType, FuelType, Transmission } from '@/types/car';
import AdminCarPhotoManager from './AdminCarPhotoManager';
import {
  X,
  Save,
  Car as CarIcon,
  Banknote,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminCarFormModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialCar?: Car | null;
  onClose: () => void;
  onSave: (carData: Car) => void | Promise<void>;
}

const BODY_TYPES: BodyType[] = [
  'Sedan',
  'SUV',
  'Coupe',
  'Hatchback',
  "Cabriolet",
  "Wagon",
  'MPV',
  "Sport",
];
const FUEL_TYPES: FuelType[] = ["Bensin", "Hibrida", "Listrik", 'Diesel'];
const TRANSMISSIONS: Transmission[] = ["Otomatis", 'Manual'];
const LOCATIONS = [
  "Medan, Sumatera Utara",
];

const DEFAULT_PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop&q=80',
];

export default function AdminCarFormModal({
  isOpen,
  mode,
  initialCar,
  onClose,
  onSave,
}: AdminCarFormModalProps) {
  const [formData, setFormData] = useState<Partial<Car>>(() => mode === 'edit' && initialCar ? { ...initialCar } : {
    brand: 'Mercedes-Benz', model: '', year: 2023, price: 885000000,
    annual_tax_idr: 12500000, tax_expiry: '2027-08-20', engine_capacity_cc: 1991,
    body_type: 'Sedan', transmission: 'Otomatis', fuel_type: 'Bensin', mileage_km: 12000,
    color: 'Hitam Metalik', location: 'Medan, Sumatera Utara', status: 'available', is_featured: false,
    description: 'Unit terawat dengan catatan servis. Dokumen dan status pajak dapat diperiksa di showroom.',
    features: ['Pemeriksaan Kondisi', 'Garansi sesuai unit', 'Keyless GO', 'Kamera 360 derajat'],
    images: [{ id: 'img-main', car_id: '', url: DEFAULT_PRESET_IMAGES[0], is_main: true, sort_order: 0 }],
  });
  const [featureInput, setFeatureInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);
  const [saveError, setSaveError] = useState('');



  if (!isOpen) return null;

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const current = formData.features || [];
    if (!current.includes(featureInput.trim())) {
      setFormData({ ...formData, features: [...current, featureInput.trim()] });
    }
    setFeatureInput('');
  };

  const handleRemoveFeature = (feat: string) => {
    const current = formData.features || [];
    setFormData({ ...formData, features: current.filter((f) => f !== feat) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaveError('');

    const generatedId = formData.id || `car-id-${Date.now().toString().slice(-4)}`;
    const finalCar: Car = {
      id: generatedId,
      brand: formData.brand || 'Mercedes-Benz',
      model: formData.model || 'C200 AMG Line',
      year: Number(formData.year) || 2023,
      price: Number(formData.price) || 885000000,
      currency: 'IDR',
      annual_tax_idr: formData.annual_tax_idr ? Number(formData.annual_tax_idr) : undefined,
      monthly_est_idr: formData.monthly_est_idr ? Number(formData.monthly_est_idr) : undefined,
      plate_number: formData.plate_number || '',
      document_status: formData.document_status || '',
      owners: formData.owners ? Number(formData.owners) : undefined,
      tax_expiry: formData.tax_expiry || "Belum diisi",
      engine_capacity_cc: Number(formData.engine_capacity_cc) || 1991,
      body_type: formData.body_type || 'Sedan',
      transmission: formData.transmission || "Otomatis",
      fuel_type: formData.fuel_type || "Bensin",
      mileage_km: Number(formData.mileage_km) || 10000,
      color: formData.color || "Hitam",
      location: formData.location || "Medan, Sumatera Utara",
      status: (formData.status as CarStatus) || 'available',
      is_featured: Boolean(formData.is_featured),
      description: formData.description || "Mobil premium pilihan siap diperiksa di showroom.",
      features: formData.features && formData.features.length > 0 ? formData.features : ["Pemeriksaan Kondisi", "Garansi sesuai ketentuan unit"],
      images: formData.images && formData.images.length > 0 ? formData.images : [{ id: 'img-1', car_id: generatedId, url: DEFAULT_PRESET_IMAGES[0], is_main: true, sort_order: 0 }],
      created_at: formData.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      await onSave(finalCar);
      setSuccessNotice(true);
      onClose();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Data mobil gagal disimpan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="car-form-heading"
      className="fixed inset-0 z-50 bg-zinc-950/35 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
      onClick={() => { if (!isSubmitting) onClose(); }}
    >
      <div
        className="bg-white border border-zinc-200 rounded-xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 sm:flex">
              <CarIcon className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 id="car-form-heading" className="flex flex-wrap items-center gap-2 text-xl font-semibold text-zinc-900">
                <span>{mode === 'create' ? "Tambah Mobil" : "Ubah Data Mobil"}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 uppercase font-mono">
                  {formData.brand}
                </span>
              </h2>
              <p className="text-xs text-zinc-500">
                Isi spesifikasi, dokumen, status pajak, dan harga tunai dalam rupiah
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Tutup formulir mobil"
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {saveError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{saveError}</p>}
        {/* Success Alert */}
        {successNotice && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-700 text-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>
              {mode === 'create'
                ? "Mobil berhasil ditambahkan ke koleksi showroom!"
                : "Data mobil berhasil diperbarui!"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: IDENTITAS & SPESIFIKASI UTAMA */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              1. Identitas dan Model Mobil
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Merek *
                </label>
                <input
                  type="text"
                  value={formData.brand || ''}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Contoh: Porsche, Mercedes-Benz, BMW"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Model dan Varian *
                </label>
                <input
                  type="text"
                  value={formData.model || ''}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="Contoh: 911 Carrera S, M4 Competition"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Tahun Kendaraan *
                </label>
                <input
                  type="number"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  min={2000}
                  max={2030}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Jenis Bodi
                </label>
                <select
                  value={formData.body_type || 'Sedan'}
                  onChange={(e) => setFormData({ ...formData, body_type: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {BODY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Transmisi
                </label>
                <select
                  value={formData.transmission || "Otomatis"}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value as Transmission })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {TRANSMISSIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Bahan Bakar
                </label>
                <select
                  value={formData.fuel_type || "Bensin"}
                  onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value as FuelType })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {FUEL_TYPES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Kapasitas Mesin (cc)
                </label>
                <input
                  type="number"
                  value={formData.engine_capacity_cc || ''}
                  onChange={(e) => setFormData({ ...formData, engine_capacity_cc: Number(e.target.value) })}
                  placeholder="2981"
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Harga, pajak, dan dokumen kendaraan */}
          <div className="space-y-4 pt-2 border-t border-zinc-200">
            <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5" />
              2. Harga, Pajak, dan Dokumen
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Harga Tunai (Rp) *
                </label>
                <div className="relative">
                  <span className="text-zinc-400 text-xs font-mono absolute left-3.5 top-1/2 -translate-y-1/2">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    min={10000}
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-amber-700 font-semibold focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Pajak Tahunan (Rp)
                </label>
                <div className="relative">
                  <span className="text-zinc-400 text-xs font-mono absolute left-3.5 top-1/2 -translate-y-1/2">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={formData.annual_tax_idr || ''}
                    onChange={(e) => setFormData({ ...formData, annual_tax_idr: Number(e.target.value) })}
                    placeholder="12500000"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Pajak Berlaku Sampai
                </label>
                <input
                  type="text"
                  value={formData.tax_expiry || ''}
                  onChange={(e) => setFormData({ ...formData, tax_expiry: e.target.value })}
                  placeholder="Belum diisi"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block text-xs text-zinc-600">Nomor Polisi
                <input value={formData.plate_number || ''} onChange={event => setFormData({ ...formData, plate_number: event.target.value })} placeholder="BK 1234 AP" className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-zinc-900" />
              </label>
              <label className="block text-xs text-zinc-600">Kelengkapan Dokumen
                <input value={formData.document_status || ''} onChange={event => setFormData({ ...formData, document_status: event.target.value })} placeholder="STNK dan BPKB lengkap" className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-zinc-900" />
              </label>
              <label className="block text-xs text-zinc-600">Pemilik Sebelumnya
                <input type="number" min="1" value={formData.owners || ''} onChange={event => setFormData({ ...formData, owners: Number(event.target.value) })} placeholder="1" className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-zinc-900" />
              </label>
              <label className="block text-xs text-zinc-600">Estimasi Angsuran Bulanan (Rp)
                <input type="number" min="0" value={formData.monthly_est_idr || ''} onChange={event => setFormData({ ...formData, monthly_est_idr: Number(event.target.value) })} placeholder="15000000" className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-zinc-900" />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Kilometer
                </label>
                <input
                  type="number"
                  value={formData.mileage_km || ''}
                  onChange={(e) => setFormData({ ...formData, mileage_km: Number(e.target.value) })}
                  placeholder="14500"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Warna Bodi
                </label>
                <input
                  type="text"
                  value={formData.color || ''}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Putih Metalik"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Lokasi Showroom
                </label>
                <select
                  value={formData.location || LOCATIONS[0]}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                  Status Ketersediaan
                </label>
                <select
                  value={formData.status || 'available'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as CarStatus })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 font-semibold focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="available">Tersedia</option>
                  <option value="reserved">Dipesan / Booking</option>
                  <option value="sold">Terjual</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="relative flex items-center gap-2 text-xs font-semibold text-zinc-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.is_featured)}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded bg-zinc-50 border-zinc-200 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Tampilkan sebagai mobil unggulan di beranda</span>
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 3: FITUR & FOTO */}
          <div className="space-y-4 pt-2 border-t border-zinc-200">
            <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              3. Fitur dan Galeri Foto
            </h3>

            {/* Fitur Tag */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Fitur Mobil (ketik lalu tekan Enter atau Tambah)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="Contoh: Audio Burmester, STNK/BPKB lengkap, sunroof panoramik"
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-100 text-zinc-900 text-xs font-semibold cursor-pointer"
                >
                  Tambah
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {formData.features?.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-50 text-zinc-600 border border-zinc-200 text-[11px]"
                  >
                    <span>{f}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(f)}
                      className="text-zinc-400 hover:text-rose-700 font-semibold ml-1 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Galeri & Foto Utama */}
            <AdminCarPhotoManager
              images={formData.images || []}
              onChange={(newImages) => setFormData({ ...formData, images: newImages })}
            />

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Deskripsi dan Catatan Pemeriksaan
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Riwayat servis, jumlah pemilik, kondisi mobil, dokumen..."
                className="w-full p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="py-2.5 px-5 rounded-xl bg-zinc-100 hover:bg-zinc-100 text-zinc-600 text-xs font-semibold transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white font-semibold text-xs flex items-center gap-2 shadow-none  transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? "Menyimpan Mobil..."
                  : mode === 'create'
                  ? "Tambahkan Mobil"
                  : "Simpan Perubahan"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
