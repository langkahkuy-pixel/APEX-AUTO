'use client';

import React, { useState } from 'react';
import { Car } from '@/types/car';
import { MessageCircle, Send, CheckCircle2, Phone, Mail, User, AlertCircle } from 'lucide-react';

interface CarInquiryFormProps {
  car: Car;
}

export function CarInquiryForm({ car }: CarInquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState(
    `Halo Apex Auto, saya ingin menanyakan ketersediaan unit ${car.brand} ${car.model} (${car.year}) dan opsi simulasi kredit / trade-in.`
  );
  const [errors, setErrors] = useState<{ fullName?: string; contact?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [inquiryRef, setInquiryRef] = useState<string>('');

  const validate = () => {
    const newErrors: { fullName?: string; contact?: string; message?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Nama lengkap wajib diisi (minimal 2 karakter)';
    }

    const contactClean = contact.trim();
    const phoneOrEmailRegex = /^(\+?[0-9\s\-()]{7,16}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
    if (!contactClean || !phoneOrEmailRegex.test(contactClean)) {
      newErrors.contact = 'Nomor WhatsApp (+65...) atau format email tidak valid';
    }

    if (!message.trim() || message.trim().length < 5) {
      newErrors.message = 'Pesan pertanyaan wajib diisi (minimal 5 karakter)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) {
      setStatus('error');
      setSubmissionError('Mohon perbaiki data formulir yang belum sesuai sebelum mengirim.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          contact: contact.trim(),
          message: message.trim(),
          car_id: car.id,
          interest: `${car.brand} ${car.model} (${car.year})`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal mengirim formulir');
      }

      const generatedId = data.data?.id
        ? String(data.data.id).slice(0, 8).toUpperCase()
        : `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryRef(generatedId);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setSubmissionError(err.message || 'Terjadi gangguan saat mengirim formulir. Silakan coba kembali.');
    }
  };

  const waText = encodeURIComponent(
    `Halo Apex Auto Singapore, saya tertarik dengan mobil ${car.brand} ${car.model} (${car.year}) seharga SGD $${car.price.toLocaleString('en-US')} (Ref: ${car.id}). Bisakah informasi ketersediaan unit dan jadwal test drive?`
  );
  const waUrl = `https://wa.me/6581234567?text=${waText}`;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* WhatsApp Fast Channel */}
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
          Respon Instan Showroom
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
        >
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span>Chat Sales via WhatsApp</span>
        </a>
      </div>

      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink mx-3 text-xs text-slate-500 font-medium">atau kirim formulir</span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>

      {/* Form Submission Notifications */}
      {status === 'success' ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3.5 animate-in fade-in">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-950">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
              Ref: {inquiryRef}
            </span>
            <h3 className="font-bold text-white text-base">Pertanyaan Berhasil Dikirim!</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Terima kasih, <strong className="text-white">{fullName}</strong>. Tim sales kami di Singapura akan segera menghubungi kontak <strong className="text-white">{contact}</strong> mengenai {car.brand} {car.model}.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setFullName('');
              setContact('');
              setErrors({});
              setSubmissionError(null);
            }}
            className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold pt-2"
          >
            Kirim Pertanyaan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Formulir Kontak Showroom</h3>
            {status === 'submitting' && (
              <span className="text-[11px] text-amber-400 animate-pulse font-medium">Mengirimkan data...</span>
            )}
          </div>

          {/* Error Banner Notification */}
          {status === 'error' && submissionError && (
            <div className="bg-rose-500/15 border border-rose-500/40 rounded-xl p-3.5 flex items-start gap-3 text-rose-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <p className="font-semibold text-rose-200">Gagal Mengirim Formulir</p>
                <p className="text-[11px] text-rose-300/90 mt-0.5">{submissionError}</p>
              </div>
              <button
                type="button"
                onClick={() => setSubmissionError(null)}
                className="text-slate-400 hover:text-white text-xs font-bold px-1"
                aria-label="Tutup notifikasi error"
              >
                ✕
              </button>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Nama Lengkap *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-fullname"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="Contoh: Budi Santoso"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.fullName
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-800 focus:border-amber-500'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Nomor WhatsApp / Email *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-contact"
                type="text"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (errors.contact) setErrors({ ...errors, contact: undefined });
                }}
                placeholder="+65 8123 4567 atau email@domain.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.contact
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-800 focus:border-amber-500'
                }`}
              />
            </div>
            {errors.contact && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.contact}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Pesan atau Pertanyaan Anda *
            </label>
            <textarea
              id="inquiry-message"
              rows={3}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
              className={`w-full p-3 rounded-xl bg-slate-950 border text-xs text-white placeholder-slate-500 focus:outline-none leading-relaxed transition-colors ${
                errors.message
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-amber-500'
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message}
              </p>
            )}
          </div>

          <button
            id="inquiry-submit-btn"
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{status === 'submitting' ? 'Mengirimkan...' : 'Kirim Pertanyaan ke Sales'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
