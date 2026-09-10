'use client';

import React, { useState, useEffect } from 'react';
import { Car, CarStatus, BodyType, FuelType, Transmission, CarImage } from '@/types/car';
import AdminCarPhotoManager from './AdminCarPhotoManager';
import {
  X,
  Save,
  Plus,
  Trash2,
  Car as CarIcon,
  DollarSign,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface AdminCarFormModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialCar?: Car | null;
  onClose: () => void;
  onSave: (carData: Car) => void;
}

const BODY_TYPES: BodyType[] = [
  'Sedan',
  'SUV',
  'Coupe',
  'Hatchback',
  'Convertible',
  'Station Wagon',
  'MPV',
  'Sports',
];
const FUEL_TYPES: FuelType[] = ['Petrol', 'Hybrid', 'Electric', 'Diesel'];
const TRANSMISSIONS: Transmission[] = ['Automatic', 'Manual'];
const LOCATIONS = [
  'Leng Kee Showroom (South/Central)',
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
  const [formData, setFormData] = useState<Partial<Car>>({
    brand: 'Porsche',
    model: '',
    year: new Date().getFullYear() - 1,
    price: 250000,
    depreciation_sgd: 22000,
    coe_expiry: '10-Year COE (till 2033)',
    engine_capacity_cc: 2981,
    body_type: 'Coupe',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    mileage_km: 15000,
    color: 'Carrara White Metallic',
    location: 'Leng Kee Showroom (South/Central)',
    status: 'available',
    is_featured: false,
    description: 'Official showroom unit in pristine condition with 160-point STA Grade A certification.',
    features: ['160-Point STA Certified', '12 Months Apex Warranty', 'Sunroof', 'Adaptive Cruise Control'],
    images: [
      {
        id: 'img-main',
        car_id: '',
        url: DEFAULT_PRESET_IMAGES[0],
        is_main: true,
        sort_order: 0,
      },
    ],
  });

  const [featureInput, setFeatureInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && initialCar) {
      setFormData({ ...initialCar });
    } else if (mode === 'create') {
      setFormData({
        id: `car-sg-${Date.now().toString().slice(-4)}`,
        brand: 'Mercedes-Benz',
        model: '',
        year: 2023,
        price: 268000,
        depreciation_sgd: 23500,
        coe_expiry: '10-Year COE (till 2033)',
        engine_capacity_cc: 1991,
        body_type: 'Sedan',
        transmission: 'Automatic',
        fuel_type: 'Hybrid',
        mileage_km: 12000,
        color: 'Obsidian Black Metallic',
        location: 'Leng Kee Showroom (South/Central)',
        status: 'available',
        is_featured: true,
        description: 'Pristine 1-owner unit with comprehensive agent service records (PML / C&C).',
        features: ['160-Point STA Certified', '12 Months Apex Warranty', 'Keyless GO', '360 Camera'],
        images: [
          {
            id: `img-${Date.now()}-1`,
            car_id: '',
            url: DEFAULT_PRESET_IMAGES[0],
            is_main: true,
            sort_order: 0,
          },
        ],
      });
    }
    setSuccessNotice(false);
  }, [mode, initialCar, isOpen]);

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

  const handleAddImage = () => {
    if (!imageUrlInput.trim()) return;
    const current = formData.images || [];
    const newImg = {
      id: `img-${Date.now()}-${current.length}`,
      car_id: formData.id || '',
      url: imageUrlInput.trim(),
      is_main: current.length === 0,
      sort_order: current.length,
    };
    setFormData({ ...formData, images: [...current, newImg] });
    setImageUrlInput('');
  };

  const handleRemoveImage = (imgId: string) => {
    const current = formData.images || [];
    setFormData({ ...formData, images: current.filter((img) => img.id !== imgId) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = formData.id || `car-sg-${Date.now().toString().slice(-4)}`;
    const finalCar: Car = {
      id: generatedId,
      brand: formData.brand || 'Mercedes-Benz',
      model: formData.model || 'C200 AMG Line',
      year: Number(formData.year) || 2023,
      price: Number(formData.price) || 250000,
      depreciation_sgd: Number(formData.depreciation_sgd) || 22000,
      coe_expiry: formData.coe_expiry || '10-Year COE',
      engine_capacity_cc: Number(formData.engine_capacity_cc) || 1991,
      body_type: formData.body_type || 'Sedan',
      transmission: formData.transmission || 'Automatic',
      fuel_type: formData.fuel_type || 'Petrol',
      mileage_km: Number(formData.mileage_km) || 10000,
      color: formData.color || 'Obsidian Black',
      location: formData.location || 'Leng Kee Showroom (South/Central)',
      status: (formData.status as CarStatus) || 'available',
      is_featured: Boolean(formData.is_featured),
      description: formData.description || 'Premium luxury vehicle ready for immediate handover.',
      features: formData.features && formData.features.length > 0 ? formData.features : ['160-Point STA Certified', '12 Months Apex Care Warranty'],
      images: formData.images && formData.images.length > 0 ? formData.images : [{ id: 'img-1', car_id: generatedId, url: DEFAULT_PRESET_IMAGES[0], is_main: true, sort_order: 0 }],
      created_at: formData.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setTimeout(() => {
      onSave(finalCar);
      setIsSubmitting(false);
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
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <CarIcon className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{mode === 'create' ? 'Add New Vehicle' : 'Edit Vehicle Details'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase font-mono">
                  {formData.brand}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Configure technical specifications, COE certification, and SGD Nett pricing
              </p>
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
            <span>
              {mode === 'create'
                ? 'New vehicle successfully added to showroom inventory!'
                : 'Vehicle details successfully updated!'}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: IDENTITAS & SPESIFIKASI UTAMA */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              1. Vehicle Identity & Model
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Make / Brand *
                </label>
                <input
                  type="text"
                  value={formData.brand || ''}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Porsche, Mercedes-Benz, BMW"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Model & Variant *
                </label>
                <input
                  type="text"
                  value={formData.model || ''}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="e.g. 911 Carrera S, M4 Competition"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Registration / Manufacture Year *
                </label>
                <input
                  type="number"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  min={2000}
                  max={2030}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Body Type
                </label>
                <select
                  value={formData.body_type || 'Sedan'}
                  onChange={(e) => setFormData({ ...formData, body_type: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {BODY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Transmission
                </label>
                <select
                  value={formData.transmission || 'Automatic'}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value as Transmission })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {TRANSMISSIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Fuel Type
                </label>
                <select
                  value={formData.fuel_type || 'Petrol'}
                  onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value as FuelType })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {FUEL_TYPES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Engine Capacity (cc)
                </label>
                <input
                  type="number"
                  value={formData.engine_capacity_cc || ''}
                  onChange={(e) => setFormData({ ...formData, engine_capacity_cc: Number(e.target.value) })}
                  placeholder="2981"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: HARGA & REGULASI (COE & DEPRESIASI) */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              2. SGD Pricing & COE Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  SGD Nett Price *
                </label>
                <div className="relative">
                  <span className="text-slate-500 text-xs font-mono absolute left-3.5 top-1/2 -translate-y-1/2">
                    S$
                  </span>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    min={10000}
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Estimated Depreciation (SGD/Year)
                </label>
                <div className="relative">
                  <span className="text-slate-500 text-xs font-mono absolute left-3.5 top-1/2 -translate-y-1/2">
                    S$
                  </span>
                  <input
                    type="number"
                    value={formData.depreciation_sgd || ''}
                    onChange={(e) => setFormData({ ...formData, depreciation_sgd: Number(e.target.value) })}
                    placeholder="24000"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  COE Expiry (LTA)
                </label>
                <input
                  type="text"
                  value={formData.coe_expiry || ''}
                  onChange={(e) => setFormData({ ...formData, coe_expiry: e.target.value })}
                  placeholder="10-Year COE (till 2033)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mileage (KM)
                </label>
                <input
                  type="number"
                  value={formData.mileage_km || ''}
                  onChange={(e) => setFormData({ ...formData, mileage_km: Number(e.target.value) })}
                  placeholder="14500"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Exterior Colour
                </label>
                <input
                  type="text"
                  value={formData.color || ''}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Carrara White Metallic"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Showroom Hub Location
                </label>
                <select
                  value={formData.location || LOCATIONS[0]}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
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
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Availability Status
                </label>
                <select
                  value={formData.status || 'available'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as CarStatus })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="available">Available (Ready Stock)</option>
                  <option value="reserved">Reserved / Booking</option>
                  <option value="sold">Sold (Closed)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="relative flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.is_featured)}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
                  />
                  <span>Feature as Spotlight Vehicle on Homepage</span>
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 3: FITUR & FOTO */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              3. Key Features & Image Gallery
            </h3>

            {/* Fitur Tag */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Features & Accreditations (Type and press Enter or Add)
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
                  placeholder="e.g. Burmester 3D Surround, LTA Certified, Panoramic Sunroof"
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {formData.features?.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800 text-[11px]"
                  >
                    <span>{f}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(f)}
                      className="text-slate-500 hover:text-rose-400 font-bold ml-1 cursor-pointer"
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
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Description & Showroom Inspection Notes
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service history, single owner verification, inspection status..."
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? 'Saving Vehicle...'
                  : mode === 'create'
                  ? 'Add Vehicle to Showroom'
                  : 'Save Changes'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
