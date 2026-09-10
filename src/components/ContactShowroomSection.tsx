'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react';

const SHOWROOMS = [
  {
    name: 'Leng Kee Flagship',
    address: '24 Leng Kee Road, Singapore 159096',
    hours: 'Mon–Sat 09:00–19:00 · Sun 10:00–18:00',
    mapUrl: 'https://maps.google.com/?q=24+Leng+Kee+Road+Singapore',
  },
  {
    name: 'Ubi Car Hub',
    address: '10 Ubi Crescent, Ubi Techpark, Singapore 408564',
    hours: 'Mon–Sat 09:30–18:30 · Sun by appointment',
    mapUrl: 'https://maps.google.com/?q=10+Ubi+Crescent+Singapore',
  },
  {
    name: 'Sin Ming Service',
    address: '20 Sin Ming Lane, Midview City, Singapore 573968',
    hours: 'Mon–Sat 08:30–18:00 · Sun closed',
    mapUrl: 'https://maps.google.com/?q=20+Sin+Ming+Lane+Singapore',
  },
];

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
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send. Check your connection.');
    }
  };

  return (
    <section id="kontak-showroom" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-10 sm:mb-14">
          Visit Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left: Showroom Locations */}
          <div className="lg:col-span-3 space-y-6">
            {SHOWROOMS.map((showroom) => (
              <div
                key={showroom.name}
                className="flex items-start justify-between gap-4 pb-6 border-b border-zinc-200 last:border-b-0 last:pb-0"
              >
                <div>
                  <h3 className="font-semibold text-zinc-900 text-sm">{showroom.name}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{showroom.address}</p>
                  <p className="text-sm text-zinc-400 mt-0.5">{showroom.hours}</p>
                </div>
                <a
                  href={showroom.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1"
                >
                  Directions
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
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
                    We'll reach out via WhatsApp shortly.
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
