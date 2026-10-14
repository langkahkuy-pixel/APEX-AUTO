'use client';

import React, { useState } from 'react';
import { Car } from '@/types/car';
import { normalizeOfferPhone } from '@/lib/car-offer';
import { Send, CheckCircle2, Phone, User, AlertCircle } from 'lucide-react';

interface CarInquiryFormProps {
  car: Car;
  initialMessage?: string;
}

export function CarInquiryForm({ car, initialMessage }: CarInquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState(
    initialMessage || `Halo Apex Auto Medan, saya ingin mengetahui ketersediaan ${car.brand} ${car.model} (${car.year}), harga tunai, pilihan kredit, dan tukar tambah.`
  );
  const [errors, setErrors] = useState<{ fullName?: string; contact?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [inquiryRef, setInquiryRef] = useState<string>('');

  const validate = () => {
    const newErrors: { fullName?: string; contact?: string; message?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Nama lengkap wajib diisi, minimal 2 karakter";
    }

    const contactClean = contact.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactClean);
    if (!validEmail && !normalizeOfferPhone(contactClean)) {
      newErrors.contact = "Masukkan nomor WhatsApp Indonesia (+62/08...) atau email yang valid";
    }

    if (!message.trim() || message.trim().length < 5) {
      newErrors.message = "Pesan wajib diisi, minimal 5 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) {
      setStatus('error');
      setSubmissionError("Mohon periksa kembali data sebelum mengirim.");
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          contact: normalizeOfferPhone(contact) || contact.trim(),
          message: message.trim(),
          car_id: car.id,
          interest: `${car.brand} ${car.model} (${car.year})`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Pertanyaan gagal dikirim");
      }

      const generatedId = data.data?.id
        ? String(data.data.id).slice(0, 8).toUpperCase()
        : `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryRef(generatedId);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setSubmissionError(err instanceof Error ? err.message : "Terjadi kendala. Silakan coba lagi.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Success State */}
      {status === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 mb-2">
              Referensi: {inquiryRef}
            </span>
            <h3 className="font-semibold text-zinc-900 text-sm">Pertanyaan Terkirim</h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Terima kasih, <strong className="text-zinc-700">{fullName}</strong>. Tim penjualan kami akan menghubungi <strong className="text-zinc-700">{contact}</strong> mengenai mobil {car.brand} {car.model}.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setFullName('');
              setContact('');
              setErrors({});
              setSubmissionError(null);
            }}
            className="text-xs text-zinc-500 hover:text-zinc-700 underline font-medium pt-1"
          >
            Kirim pertanyaan lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-800">Kirim Pertanyaan</h3>
            {status === 'submitting' && (
              <span className="text-[11px] text-zinc-400 animate-pulse font-medium">Mengirim...</span>
            )}
          </div>

          {/* Error Banner */}
          {status === 'error' && submissionError && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 flex items-start gap-2.5 text-rose-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <p className="font-medium">{submissionError}</p>
              </div>
              <button
                type="button"
                onClick={() => setSubmissionError(null)}
                className="text-zinc-400 hover:text-zinc-600 text-xs font-bold px-1"
                aria-label="Tutup pesan kesalahan"
              >
                ✕
              </button>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="inquiry-fullname" className="block text-xs font-medium text-zinc-500 mb-1.5">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-fullname"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="Contoh: Budi Santoso"
                className={`w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:ring-2 transition-all ${
                  errors.fullName
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-zinc-200 focus:ring-zinc-200 focus:border-zinc-400'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="inquiry-contact" className="block text-xs font-medium text-zinc-500 mb-1.5">
              WhatsApp / Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-contact"
                type="text"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (errors.contact) setErrors({ ...errors, contact: undefined });
                }}
                placeholder="0812 0000 0000 atau nama@email.com"
                className={`w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:ring-2 transition-all ${
                  errors.contact
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-zinc-200 focus:ring-zinc-200 focus:border-zinc-400'
                }`}
              />
            </div>
            {errors.contact && (
              <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.contact}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="inquiry-message" className="block text-xs font-medium text-zinc-500 mb-1.5">
              Pesan Anda
            </label>
            <textarea
              id="inquiry-message"
              rows={3}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
              className={`w-full p-3 rounded-lg bg-white border text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:ring-2 leading-relaxed transition-all ${
                errors.message
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-zinc-200 focus:ring-zinc-200 focus:border-zinc-400'
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message}
              </p>
            )}
          </div>

          <button
            id="inquiry-submit-btn"
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{status === 'submitting' ? "Mengirim..." : "Kirim Pertanyaan"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
