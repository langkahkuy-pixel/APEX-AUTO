'use client';

import React, { useState, useRef } from 'react';
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
  Upload,
} from 'lucide-react';

interface AdminCarPhotoManagerProps {
  images: CarImage[];
  onChange: (images: CarImage[]) => void;
}

const PRESET_GALLERY_PHOTOS = [
  {
    title: "Porsche 911 Tampak Depan",
    url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: "Interior Mercedes-Benz E-Class",
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: "BMW M4 Competition Tampak Belakang",
    url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: "Audi RS6 Avant",
    url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: "Kabin Toyota Vellfire",
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: "Ferrari & Showroom Supercar",
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
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.url) {
        const newImage: CarImage = {
          id: `img-up-${Date.now()}-${images.length + 1}`,
          car_id: '',
          url: data.url,
          is_main: images.length === 0,
          sort_order: images.length,
        };
        onChange([...images, newImage]);
      } else {
        alert(data.error || "Foto gagal diunggah.");
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert("Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

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
      id: `img-preset-${encodeURIComponent(url)}`,
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


  return (
    <div className="space-y-4">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-600">
            Kelola Galeri Foto ({images.length} Foto)
          </label>
          <p className="text-[11px] text-zinc-500">
            Pilih foto utama katalog dan atur urutan galeri mobil.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-100 text-amber-700 text-xs font-semibold border border-amber-200 transition-colors w-fit cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showPresets ? "Tutup Koleksi Foto" : "Pilih dari Koleksi Foto"}</span>
        </button>
      </div>

      {/* Preset Picker Tray */}
      {showPresets && (
        <div className="p-4 rounded-2xl bg-zinc-50 border border-amber-200 space-y-3 animate-in fade-in">
          <div className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Koleksi Foto Showroom (klik untuk menambahkan):</span>
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
                      : 'border-zinc-200 hover:border-amber-500 '
                  }`}
                  title={preset.title}
                >
                  <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                  {isSelected ? (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-emerald-300 text-[10px] font-semibold gap-1">
                      <Check className="w-3 h-3" />
                      <span>Dipilih</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-semibold">
                      + Tambah
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Input custom URL and file upload */}
      <div className="flex flex-wrap gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />

        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Tempel URL foto (https://...)"
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          type="button"
          onClick={handleAddCustomUrl}
          className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 border border-zinc-200 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah URL</span>
        </button>
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 text-xs font-semibold flex items-center gap-1.5 shadow-md  transition-all cursor-pointer disabled:opacity-50"
        >
          <Upload className={`w-4 h-4 ${isUploading ? 'animate-bounce' : ''}`} />
          <span>{isUploading ? "Mengunggah..." : "Unggah Foto"}</span>
        </button>
      </div>

      {/* Grid of uploaded/managed photos */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {images.map((img, index) => (
            <div
              key={img.id || index}
              className={`relative rounded-2xl overflow-hidden aspect-video bg-zinc-50 border transition-all ${
                img.is_main
                  ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-none '
                  : 'border-zinc-200 hover:border-zinc-200'
              }`}
            >
              <img src={img.url} alt="Foto Mobil" className="w-full h-full object-cover" />

              {/* Main Badge */}
              {img.is_main ? (
                <div className="absolute top-2 left-2 bg-amber-500 text-zinc-900 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-slate-950" />
                  <span>Foto Utama</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetMain(img.id)}
                  className="absolute top-2 left-2 bg-white/80 hover:bg-amber-500 text-zinc-600 hover:text-zinc-900 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm border border-zinc-200 hover:border-amber-400 transition-all cursor-pointer"
                >
                  Jadikan Foto Utama
                </button>
              )}

              {/* Overlay controls */}
              <div className="absolute bottom-2 inset-x-2 flex items-center justify-between gap-1 bg-zinc-50/80 backdrop-blur-sm px-2 py-1 rounded-xl border border-zinc-200/80">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'left')}
                    className="p-1 rounded bg-white hover:bg-zinc-100 text-zinc-600 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Geser ke kiri"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={index === images.length - 1}
                    onClick={() => handleMove(index, 'right')}
                    className="p-1 rounded bg-white hover:bg-zinc-100 text-zinc-600 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Geser ke kanan"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewZoomUrl(img.url)}
                    className="p-1 rounded bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
                    title="Lihat foto"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(img.id)}
                    className="p-1 rounded bg-rose-50 hover:bg-rose-500 text-rose-700 hover:text-zinc-900 transition-colors cursor-pointer"
                    title="Hapus foto"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 border-2 border-dashed border-zinc-200 rounded-2xl text-center space-y-2">
          <ImageIcon className="w-8 h-8 text-zinc-500 mx-auto" />
          <div className="text-xs text-zinc-500">Belum ada foto pada galeri mobil ini.</div>
          <button
            type="button"
            onClick={() => setShowPresets(true)}
            className="text-xs text-amber-700 hover:text-amber-700 font-semibold underline cursor-pointer"
          >
            Pilih dari koleksi foto showroom →
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
          <div className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-zinc-200">
            <img src={previewZoomUrl} alt="Pratinjau Foto" className="w-full h-full object-contain" />
            <button
              type="button"
              onClick={() => setPreviewZoomUrl(null)}
              className="absolute top-4 right-4 bg-white/80 text-zinc-900 p-2 rounded-full hover:bg-zinc-100 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
