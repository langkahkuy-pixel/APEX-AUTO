'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export function ContactShowroomSection() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [interest, setInterest] = useState('Mercedes-Benz / BMW / Luxury');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceCode, setReferenceCode] = useState('');

  const validate = () => {
    const errs: { name?: string; contact?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Nama lengkap wajib diisi (minimal 2 karakter)';
    }
    const cleanContact = contact.trim();
    const phoneOrEmail = /^(\+?[0-9\s\-()]{7,16}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
    if (!cleanContact || !phoneOrEmail.test(cleanContact)) {
      errs.contact = 'Nomor telepon/WhatsApp Singapura atau email tidak valid';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      setStatus('error');
      setErrorMessage('Mohon lengkapi dan periksa kembali format data yang Anda masukkan.');
      return;
    }

    setStatus('submitting');
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (name.toLowerCase().includes('simulate-error')) {
            reject(new Error('Koneksi sistem showroom sedang sibuk. Silakan coba sesaat lagi atau hubungi via WhatsApp langsung.'));
          } else {
            resolve(true);
          }
        }, 700);
      });

      setReferenceCode(`APX-${Math.floor(100000 + Math.random() * 900000)}`);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Gagal mengirim formulir pertanyaan. Silakan periksa koneksi Anda.');
    }
  };

  return (
    <section id="kontak-showroom" className="py-16 sm:py-20 bg-slate-900/60 border-t border-slate-800 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 mb-3 font-semibold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Layanan Konsultasi & Hubungi Penjual</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Konsultasikan Mobil Impian Anda dengan Tim Showroom Kami
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Punya pertanyaan mengenai stok unit, simulasi kredit bunga rendah, atau konsultasi lelang COE Singapura? Tim konsultan kami siap melayani Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Showroom Locations & Quick WhatsApp Channel (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* WhatsApp Direct Card */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Kirim Pesan via WhatsApp</h3>
                  <p className="text-xs text-slate-400">Respon cepat dalam 5 - 10 menit waktu kerja Singapura</p>
                </div>
              </div>

              <a
                href="https://wa.me/6581234567?text=Halo%20Apex%20Auto%20Singapore,%20saya%20ingin%20konsultasi%20mengenai%20katalog%20mobil%20dan%20layanan%20showroom"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Mulai Chat WhatsApp (+65 8123 4567)</span>
              </a>
            </div>

            {/* 3 Showroom Locations */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Jaringan Showroom Resmi di Singapura</span>
              </h4>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Leng Kee Flagship Showroom
                  </div>
                  <div className="text-slate-400 pl-5">24 Leng Kee Road, Singapore 159096</div>
                  <div className="text-[11px] text-slate-500 pl-5 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Senin – Sabtu: 09:00 – 19:00 | Minggu: 10:00 – 18:00
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Ubi Car Hub
                  </div>
                  <div className="text-slate-400 pl-5">53 Ubi Ave 1, #01-18, Singapore 408934</div>
                  <div className="text-[11px] text-slate-500 pl-5 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Senin – Sabtu: 09:00 – 18:30
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Sin Ming Service & Delivery Hub
                  </div>
                  <div className="text-slate-400 pl-5">176 Sin Ming Drive, Singapore 575721</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-950">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
                    ID Tiket: {referenceCode}
                  </span>
                  <h3 className="text-xl font-bold text-white">Pertanyaan Berhasil Terkirim ke Showroom!</h3>
                </div>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Terima kasih <strong className="text-white">{name}</strong>. Tim konsultan penjualan kami akan menghubungi kontak <strong className="text-white">{contact}</strong> dalam waktu singkat untuk memberikan informasi detail unit <span className="text-amber-400">{interest}</span> dan opsi penawaran terbaik.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setName('');
                      setContact('');
                      setMessage('');
                      setErrors({});
                      setErrorMessage(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Kirim Pertanyaan Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Formulir Kontak Pembeli</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Isi informasi Anda di bawah ini dan konsultan kami akan menghubungi Anda.
                    </p>
                  </div>
                  {status === 'submitting' && (
                    <span className="text-xs text-amber-400 font-semibold animate-pulse">Mengirimkan...</span>
                  )}
                </div>

                {/* Error Banner Notification */}
                {status === 'error' && errorMessage && (
                  <div className="bg-rose-500/15 border border-rose-500/40 rounded-2xl p-4 flex items-start gap-3 text-rose-300 animate-in fade-in">
                    <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs">
                      <p className="font-bold text-rose-200">Gagal Mengirimkan Formulir</p>
                      <p className="text-rose-300/90 mt-0.5 leading-relaxed">{errorMessage}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5"
                      aria-label="Tutup notifikasi error"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="Nama lengkap Anda"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nomor Kontak / WhatsApp *
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        if (errors.contact) setErrors({ ...errors, contact: undefined });
                      }}
                      placeholder="+65 8123 4567 atau email"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.contact
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.contact && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.contact}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Minat Kendaraan / Layanan
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Mercedes-Benz / BMW / Luxury">Sedan / Mobil Mewah (Mercedes, BMW, Audi)</option>
                    <option value="Porsche / Sports">Sports & Performance (Porsche, Coupe)</option>
                    <option value="Toyota Harrier / Hybrid">SUV & Keluarga (Toyota Harrier, Alphard)</option>
                    <option value="Tesla / Electric">Mobil Listrik / EV (Tesla Model Y)</option>
                    <option value="Konsultasi COE">Konsultasi Lelang / Pembaruan COE</option>
                    <option value="Trade-In Mobil">Penilaian & Trade-In Kendaraan Lama</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Pesan atau Pertanyaan Anda
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pertanyaan Anda mengenai ketersediaan unit, jadwal inspeksi showroom, atau simulasi cicilan pembiayaan..."
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/30 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Mengirimkan Pertanyaan...' : 'Kirim Formulir Pertanyaan'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
