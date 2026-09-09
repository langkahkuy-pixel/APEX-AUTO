'use client';

import React, { useState, useEffect } from 'react';
import { PromoItem } from '@/types/promo';
import {
  X,
  Save,
  Tag,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminPromoFormModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialPromo?: PromoItem | null;
  onClose: () => void;
  onSave: (promo: PromoItem) => void;
}

const PRESET_PROMO_IMAGES = [
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
];

export default function AdminPromoFormModal({
  isOpen,
  mode,
  initialPromo,
  onClose,
  onSave,
}: AdminPromoFormModalProps) {
  const [formData, setFormData] = useState<Partial<PromoItem>>({
    title: '',
    tagline: '',
    badge: 'PROMO KHUSUS',
    discount_sgd: 10000,
    valid_until: '30 September 2026',
    description: '',
    benefits: ['Gratis Servis Rutin 3 Tahun', 'Garansi Transmisi 12 Bulan'],
    terms_conditions: ['Hanya berlaku untuk unit berstatus ready stock Singapura.'],
    cta_text: 'Klaim Promo WhatsApp',
    cta_whatsapp_text: 'Halo Apex Auto, saya ingin klaim program promo showroom.',
    image_url: PRESET_PROMO_IMAGES[0],
    highlight_color: 'amber',
    is_featured: true,
  });

  const [benefitInput, setBenefitInput] = useState('');
  const [termInput, setTermInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && initialPromo) {
      setFormData({ ...initialPromo });
    } else if (mode === 'create') {
      setFormData({
        id: `promo-sg-${Date.now().toString().slice(-4)}`,
        slug: `promo-spesial-${Date.now().toString().slice(-4)}`,
        title: 'Subsidi Bunga Loan 1.88% Singapura',
        tagline: 'Fasilitas Pembiayaan Bank DBS / OCBC Showroom',
        badge: 'BUNGA SPESIAL 1.88%',
        discount_sgd: 8000,
        valid_until: '31 Oktober 2026',
        description: 'Dapatkan suku bunga preferensial terendah di Singapura untuk unit sedan & SUV Eropa.',
        benefits: [
          'Suku bunga flat 1.88% per tahun',
          'Proses persetujuan cepat 24 jam kerja',
          'Tenor fleksibel hingga 7 tahun',
        ],
        terms_conditions: [
          'Berlaku untuk pembeli warga negara Singapura, PR, maupun pemegang Employment Pass.',
          'Uang muka (DP) minimal 30% sesuai regulasi MAS Singapura.',
        ],
        cta_text: 'Simulasi Loan WhatsApp',
        cta_whatsapp_text: 'Halo Apex Auto, saya ingin simulasi kredit bunga promo 1.88%.',
        image_url: PRESET_PROMO_IMAGES[1],
        highlight_color: 'emerald',
        is_featured: false,
      });
    }
    setSuccessNotice(false);
  }, [mode, initialPromo, isOpen]);

  if (!isOpen) return null;

  const handleAddBenefit = () => {
    if (!benefitInput.trim()) return;
    const current = formData.benefits || [];
    setFormData({ ...formData, benefits: [...current, benefitInput.trim()] });
    setBenefitInput('');
  };

  const handleRemoveBenefit = (index: number) => {
    const current = formData.benefits || [];
    setFormData({ ...formData, benefits: current.filter((_, i) => i !== index) });
  };

  const handleAddTerm = () => {
    if (!termInput.trim()) return;
    const current = formData.terms_conditions || [];
    setFormData({ ...formData, terms_conditions: [...current, termInput.trim()] });
    setTermInput('');
  };

  const handleRemoveTerm = (index: number) => {
    const current = formData.terms_conditions || [];
    setFormData({ ...formData, terms_conditions: current.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = formData.id || `promo-sg-${Date.now().toString().slice(-4)}`;
    const finalPromo: PromoItem = {
      id: generatedId,
      slug:
        formData.slug ||
        (formData.title || 'promo')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
      title: formData.title || 'Promo Showroom Baru',
      tagline: formData.tagline || 'Program Penawaran Spesial Apex Auto Singapore',
      badge: formData.badge || 'PROMO',
      discount_sgd: Number(formData.discount_sgd) || 0,
      valid_until: formData.valid_until || '30 September 2026',
      description: formData.description || 'Penawaran eksklusif showroom mobil Singapura.',
      benefits: formData.benefits && formData.benefits.length > 0 ? formData.benefits : ['Voucher Servis', 'Garansi Resmi'],
      terms_conditions:
        formData.terms_conditions && formData.terms_conditions.length > 0
          ? formData.terms_conditions
          : ['Syarat dan ketentuan showroom berlaku.'],
      cta_text: formData.cta_text || 'Konsultasi WhatsApp',
      cta_whatsapp_text: formData.cta_whatsapp_text || 'Halo Apex Auto, saya ingin menanyakan promo ini.',
      image_url: formData.image_url || PRESET_PROMO_IMAGES[0],
      highlight_color: formData.highlight_color || 'amber',
      is_featured: Boolean(formData.is_featured),
    };

    setTimeout(() => {
      onSave(finalPromo);
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
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {mode === 'create' ? 'Buat Program Promo Baru' : 'Ubah Program Promo'}
              </h2>
              <p className="text-xs text-slate-400">
                Kelola penawaran subsidi, diskon SGD, dan syarat & ketentuan pembeli
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
            <span>Program promo berhasil disimpan ke sistem showroom!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Judul Program Promo *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Subsidi COE S$10,000"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Label Badge Singkat *
              </label>
              <input
                type="text"
                value={formData.badge || ''}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Contoh: CASHBACK S$10,000"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white uppercase font-bold focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Tagline & Diskon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tagline / Sub-judul
              </label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Khusus Unit Mercedes-Benz & BMW Ready Stock"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nilai Diskon / Subsidi (SGD)
              </label>
              <input
                type="number"
                value={formData.discount_sgd || ''}
                onChange={(e) => setFormData({ ...formData, discount_sgd: Number(e.target.value) })}
                placeholder="10000"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Valid Until & Highlight Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Periode Berlaku
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.valid_until || ''}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  placeholder="30 September 2026"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tema Warna Sorotan
              </label>
              <select
                value={formData.highlight_color || 'amber'}
                onChange={(e) => setFormData({ ...formData, highlight_color: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="amber">Amber Gold (Premium)</option>
                <option value="emerald">Emerald Green (Fresh Deal)</option>
                <option value="sky">Sky Blue (Executive)</option>
                <option value="purple">Royal Purple (Prestige)</option>
              </select>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Deskripsi Lengkap Promo
            </label>
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan detail program promosi dan keunggulan untuk calon pembeli..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Benefits list */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Daftar Keuntungan / Benefit Program
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBenefit();
                  }
                }}
                placeholder="Contoh: Gratis Servis Rutin 3 Tahun"
                className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold"
              >
                Tambah
              </button>
            </div>
            <div className="space-y-1">
              {formData.benefits?.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{b}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(i)}
                    className="text-slate-500 hover:text-rose-400 font-bold px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Syarat & Ketentuan (T&C)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTerm();
                  }
                }}
                placeholder="Contoh: Berlaku selama kuota unit masih tersedia."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleAddTerm}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold"
              >
                Tambah
              </button>
            </div>
            <div className="space-y-1">
              {formData.terms_conditions?.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400"
                >
                  <span className="text-[11px] leading-tight">• {t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTerm(i)}
                    className="text-slate-500 hover:text-rose-400 font-bold px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Pesan Otomatis WhatsApp Saat Tombol Ditekan
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <textarea
                rows={2}
                value={formData.cta_whatsapp_text || ''}
                onChange={(e) => setFormData({ ...formData, cta_whatsapp_text: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
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
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Menyimpan...' : mode === 'create' ? 'Buat Program Promo' : 'Simpan Promo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
