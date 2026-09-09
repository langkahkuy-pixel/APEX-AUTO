'use client';

import React, { useState } from 'react';
import { CarImage } from '@/types/car';
import {
  Image as ImageIcon,
  Star,
  Trash2,
  Plus,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Eye,
} from 'lucide-react';

interface AdminCarPhotoManagerProps {
  images: CarImage[];
  onChange: (images: CarImage[]) => void;
}

const PRESET_GALLERY_PHOTOS = [
  {
    title: 'Porsche 911 Front 3/4 Studio',
    url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Mercedes-Benz E-Class Interior Luxury',
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'BMW M4 Competition Rear Angle',
    url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Audi RS6 Avant Dynamic Motion',
    url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Toyota Vellfire Executive Lounge Cockpit',
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Ferrari & Supercar Showroom Hub',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80',
  },
];

export default function AdminCarPhotoManager({
  images,
  onChange,
}: AdminCarPhotoManagerProps) {
  const [urlInput, setUrlInput] = useState('');
  const [showPresets, setShowPresets] = useState(false);
  const [previewZoomUrl, setPreviewZoomUrl] = useState<string | null>(null);

  const handleAddCustomUrl = () => {
    if (!urlInput.trim()) return;
    const newImage: CarImage = {
      id: `img-${Date.now()}-${images.length + 1}`,
      car_id: '',
      url: urlInput.trim(),
      is_main: images.length === 0,
      sort_order: images.length,
    };
    onChange([...images, newImage]);
    setUrlInput('');
  };

  const handleAddPreset = (url: string) => {
    if (images.some((img) => img.url === url)) return;
    const newImage: CarImage = {
      id: `img-preset-${Date.now()}-${images.length + 1}`,
      car_id: '',
      url,
      is_main: images.length === 0,
      sort_order: images.length,
    };
    onChange([...images, newImage]);
  };

  const handleSetMain = (imgId: string) => {
    const updated = images.map((img) => ({
      ...img,
      is_main: img.id === imgId,
    }));
    onChange(updated);
  };

  const handleDelete = (imgId: string) => {
    const remaining = images.filter((img) => img.id !== imgId);
    // If the deleted image was main, set the first one as main
    if (remaining.length > 0 && !remaining.some((img) => img.is_main)) {
      remaining[0].is_main = true;
    }
    onChange(remaining);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newArr = [...images];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    // update sort_order
    const reordered = newArr.map((img, i) => ({ ...img, sort_order: i }));
    onChange(reordered);
  };

  const mainImage = images.find((img) => img.is_main) || images[0];

  return (
    <div className="space-y-4">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300">
            Pengelola Galeri Foto ({images.length} Foto Aktif)
          </label>
          <p className="text-[11px] text-slate-400">
            Tentukan foto utama (thumbnail katalog) dan urutan pratinjau galeri unit mobil.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-400 text-xs font-bold border border-amber-500/20 transition-colors w-fit"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showPresets ? 'Tutup Pilihan Foto HD' : 'Pilih dari Bank Foto Showroom HD'}</span>
        </button>
      </div>

      {/* Preset Picker Tray */}
      {showPresets && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3 animate-in fade-in">
          <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Koleksi Foto Resolusi Tinggi Showroom (Klik untuk menambahkan):</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {PRESET_GALLERY_PHOTOS.map((preset, idx) => {
              const isSelected = images.some((img) => img.url === preset.url);
              return (
                <div
                  key={idx}
                  onClick={() => !isSelected && handleAddPreset(preset.url)}
                  className={`group relative aspect-video rounded-xl overflow-hidden border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 opacity-60 cursor-not-allowed'
                      : 'border-slate-800 hover:border-amber-500 hover:scale-105'
                  }`}
                  title={preset.title}
                >
                  <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                  {isSelected ? (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-emerald-400 text-[10px] font-bold gap-1">
                      <Check className="w-3 h-3" />
                      <span>Terpilih</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold">
                      + Tambah
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Input custom URL */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Tempel URL gambar (https://...)"
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          type="button"
          onClick={handleAddCustomUrl}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Foto</span>
        </button>
      </div>

      {/* Grid of uploaded/managed photos */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {images.map((img, index) => (
            <div
              key={img.id || index}
              className={`relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border transition-all ${
                img.is_main
                  ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <img src={img.url} alt="Car View" className="w-full h-full object-cover" />

              {/* Main Badge */}
              {img.is_main ? (
                <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-slate-950" />
                  <span>Foto Utama</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetMain(img.id)}
                  className="absolute top-2 left-2 bg-slate-900/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm border border-slate-700 hover:border-amber-400 transition-all cursor-pointer"
                >
                  Set Utama
                </button>
              )}

              {/* Overlay controls */}
              <div className="absolute bottom-2 inset-x-2 flex items-center justify-between gap-1 bg-slate-950/80 backdrop-blur-sm px-2 py-1 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'left')}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 transition-colors"
                    title="Geser ke kiri"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={index === images.length - 1}
                    onClick={() => handleMove(index, 'right')}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 transition-colors"
                    title="Geser ke kanan"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewZoomUrl(img.url)}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Pratinjau Foto"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(img.id)}
                    className="p-1 rounded bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors"
                    title="Hapus Foto"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 border-2 border-dashed border-slate-800 rounded-2xl text-center space-y-2">
          <ImageIcon className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-xs text-slate-400">Belum ada foto yang ditambahkan ke galeri unit ini.</div>
          <button
            type="button"
            onClick={() => setShowPresets(true)}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold underline"
          >
            Pilih dari bank foto showroom resolusi tinggi →
          </button>
        </div>
      )}

      {/* Zoom Modal */}
      {previewZoomUrl && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewZoomUrl(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-slate-800">
            <img src={previewZoomUrl} alt="Preview Zoom" className="w-full h-full object-contain" />
            <button
              type="button"
              onClick={() => setPreviewZoomUrl(null)}
              className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-full hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
