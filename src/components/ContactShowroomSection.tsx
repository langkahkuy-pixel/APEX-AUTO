'use client';

import React, { useState } from 'react';
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

const FLAGSHIP_SHOWROOM = {
  name: 'Leng Kee Flagship',
  tagline: 'Principal Luxury Showroom & VIP Lounge',
  address: '24 Leng Kee Road, Singapore 159096',
  hours: 'Mon–Sat 09:00–19:00 · Sun 10:00–18:00',
  phone: '+65 8123 4567',
  mapUrl: 'https://maps.google.com/?q=24+Leng+Kee+Road+Singapore',
};

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
      errs.name = 'Name is required (min 2 characters)';
    }
    const phoneOrEmail = /^(\+?[0-9\s\-()]{7,16}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
    if (!contact.trim() || !phoneOrEmail.test(contact.trim())) {
      errs.contact = 'Valid WhatsApp number or email required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!validate()) {
      setStatus('error');
      setErrorMessage('Please fill in your details correctly.');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          interest,
          message: message.trim() || `Inquiry — ${interest}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to send');
      const refCode = data.data?.id
        ? String(data.data.id).slice(0, 8).toUpperCase()
        : `APX-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceCode(refCode);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send. Check your connection.');
    }
  };

  return (
    <section id="contact-showroom" className="scroll-mt-20 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
            Principal Showroom
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Visit Our Flagship Showroom
          </h2>
          <p className="mt-2 text-sm text-zinc-500 max-w-xl">
            Experience our curated luxury automobile collection at our premier Leng Kee Road location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Flagship Showroom Details */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Main Showroom</span>
                </div>
                <span className="text-xs font-medium text-zinc-400">South / Central Prime Belt</span>
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
                      Address
                    </span>
                    <p className="text-zinc-800 font-medium mt-0.5 text-sm sm:text-base">
                      {FLAGSHIP_SHOWROOM.address}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Opposite Leng Kee Autoworld · Near Redhill MRT
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
                      Operating Hours
                    </span>
                    <p className="text-zinc-800 font-medium mt-0.5 text-sm sm:text-base">
                      {FLAGSHIP_SHOWROOM.hours}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Open Daily for Private Viewings & Test Drives
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
                    Telephone
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
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://wa.me/6581234567?text=Hello%20Apex%20Auto%20Leng%20Kee%20Flagship%2C%20I%20would%20like%20to%20schedule%20a%20private%20visit`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-zinc-200 bg-white p-6">
              <h3 className="font-semibold text-zinc-900 text-base mb-5">Send a Message</h3>

              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-zinc-900 text-lg mb-1">Sent</h4>
                  <p className="text-sm text-zinc-500 mb-2">
                    Ref: <span className="font-mono font-semibold text-zinc-700">{referenceCode}</span>
                  </p>
                  <p className="text-sm text-zinc-400">
                    We&apos;ll reach out via WhatsApp shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
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
                      placeholder="WhatsApp or Email"
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
                    <option value="Mercedes-Benz / BMW / Luxury">Mercedes-Benz / BMW / Luxury</option>
                    <option value="SUV / Family MPV">SUV / Family MPV</option>
                    <option value="EV / Performance Hybrid">EV / Performance Hybrid</option>
                    <option value="COE Bidding / Financing Advice">COE Bidding / Financing</option>
                    <option value="Vehicle Consignment / Trade-In">Consignment / Trade-In</option>
                    <option value="Schedule Private Test Drive">Schedule Test Drive</option>
                  </select>
                  <textarea
                    placeholder="Your inquiry (optional)"
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry
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
