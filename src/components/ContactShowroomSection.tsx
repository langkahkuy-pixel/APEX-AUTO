'use client';

import { whatsappUrl, SHOWROOM } from '@/lib/locale';

import React, { useState } from 'react';
import { normalizeOfferPhone } from '@/lib/car-offer';
import {
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MapPin,
  Clock,
  Phone,
  Sparkles,
} from 'lucide-react';

const FLAGSHIP_SHOWROOM = { ...SHOWROOM, tagline: 'Showroom Mobil Premium & Ruang Konsultasi' };

export function ContactShowroomSection() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [interest, setInterest] = useState("Mercedes-Benz / BMW / Mobil Premium");
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceCode, setReferenceCode] = useState('');

  const validate = () => {
    const errs: { name?: string; contact?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Nama wajib diisi, minimal 2 karakter";
    }
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
    if (!validEmail && !normalizeOfferPhone(contact)) {
      errs.contact = "Masukkan nomor WhatsApp atau email yang valid";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!validate()) {
      setStatus('error');
      setErrorMessage("Mohon isi data Anda dengan benar.");
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: normalizeOfferPhone(contact) || contact.trim(),
          interest,
          message: message.trim() || `Pertanyaan tentang ${interest}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Pesan gagal dikirim");
      const refCode = data.data?.id
        ? String(data.data.id).slice(0, 8).toUpperCase()
        : `APX-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceCode(refCode);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : "Pesan gagal dikirim. Periksa koneksi Anda.");
    }
  };

  return (
    <section id="contact-showroom" className="scroll-mt-20 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
            Showroom Utama
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Kunjungi Showroom Kami di Medan
          </h2>
          <p className="mt-2 text-sm text-zinc-500 max-w-xl">
            Lihat langsung mobil pilihan dan konsultasikan pembelian tunai, kredit, atau tukar tambah bersama tim kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Flagship Showroom Details */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Showroom Utama</span>
                </div>
                <span className="text-xs font-medium text-zinc-400">Medan, Sumatera Utara</span>
              </div>

              <h3 className="font-bold text-zinc-900 text-xl sm:text-2xl">
                {FLAGSHIP_SHOWROOM.name}
              </h3>
              <p className="text-xs text-amber-600 font-medium mt-1 mb-6">
                {FLAGSHIP_SHOWROOM.tagline}
              </p>

              <div className="space-y-5 pt-4 border-t border-zinc-100 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-zinc-700" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                      Alamat
                    </span>
                    <p className="text-zinc-800 font-medium mt-0.5 text-sm sm:text-base">
                      {FLAGSHIP_SHOWROOM.address}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Kunjungan dan konsultasi dapat dijadwalkan melalui WhatsApp
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-zinc-700" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                      Jam Operasional
                    </span>
                    <p className="text-zinc-800 font-medium mt-0.5 text-sm sm:text-base">
                      {FLAGSHIP_SHOWROOM.hours}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Terbuka untuk kunjungan dan pemeriksaan unit
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 mt-5 text-sm">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-zinc-700" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                    Telepon
                  </span>
                  <a
                    href={`tel:${FLAGSHIP_SHOWROOM.phone.replace(/\s/g, '')}`}
                    className="text-zinc-800 font-medium mt-0.5 inline-block hover:text-amber-600 transition-colors"
                  >
                    {FLAGSHIP_SHOWROOM.phone}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap items-center gap-3">
                <a
                  href={FLAGSHIP_SHOWROOM.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Buka Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={whatsappUrl("Halo Apex Auto Medan, saya ingin menjadwalkan kunjungan ke showroom")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Hubungi WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-zinc-200 bg-white p-6">
              <h3 className="font-semibold text-zinc-900 text-base mb-5">Kirim Pesan</h3>

              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-zinc-900 text-lg mb-1">Pesan Terkirim</h4>
                  <p className="text-sm text-zinc-500 mb-2">
                    Referensi: <span className="font-mono font-semibold text-zinc-700">{referenceCode}</span>
                  </p>
                  <p className="text-sm text-zinc-400">
                    Tim kami akan menghubungi Anda melalui kontak yang diberikan.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg bg-zinc-50 border text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 transition-colors ${
                        errors.name
                          ? 'border-red-300 focus:ring-red-300'
                          : 'border-zinc-200 focus:ring-zinc-400 focus:border-zinc-400'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="WhatsApp atau Email"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg bg-zinc-50 border text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 transition-colors ${
                        errors.contact
                          ? 'border-red-300 focus:ring-red-300'
                          : 'border-zinc-200 focus:ring-zinc-400 focus:border-zinc-400'
                      }`}
                    />
                    {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
                  </div>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 transition-colors appearance-none"
                  >
                    <option value="Mercedes-Benz / BMW / Mobil Premium">Mercedes-Benz / BMW / Mobil Premium</option>
                    <option value="SUV / MPV Keluarga">SUV / MPV Keluarga</option>
                    <option value="Mobil Listrik / Hibrida">Mobil Listrik / Hibrida</option>
                    <option value="Konsultasi Kredit / Dokumen">Konsultasi Kredit / Dokumen</option>
                    <option value="Titip Jual / Tukar Tambah">Titip Jual / Tukar Tambah</option>
                    <option value="Jadwalkan Kunjungan">Jadwalkan Kunjungan</option>
                  </select>
                  <textarea
                    placeholder="Pertanyaan Anda (opsional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 transition-colors resize-none"
                  />

                  {errorMessage && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 text-white disabled:text-zinc-500 font-medium text-sm px-6 py-3 rounded-lg transition-colors"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-zinc-400/40 border-t-white rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Kirim Pertanyaan
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
