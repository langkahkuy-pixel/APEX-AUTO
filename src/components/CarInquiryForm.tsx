'use client';

import React, { useState } from 'react';
import { Car } from '@/types/car';
import { Send, CheckCircle2, Phone, User, AlertCircle } from 'lucide-react';

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
      newErrors.fullName = 'Full name is required (min 2 characters)';
    }

    const contactClean = contact.trim();
    const phoneOrEmailRegex = /^(\+?[0-9\s\-()]{7,16}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
    if (!contactClean || !phoneOrEmailRegex.test(contactClean)) {
      newErrors.contact = 'Enter a valid WhatsApp number (+65...) or email';
    }

    if (!message.trim() || message.trim().length < 5) {
      newErrors.message = 'Message is required (min 5 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) {
      setStatus('error');
      setSubmissionError('Please correct the form fields before submitting.');
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
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      const generatedId = data.data?.id
        ? String(data.data.id).slice(0, 8).toUpperCase()
        : `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryRef(generatedId);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setSubmissionError(err.message || 'Something went wrong. Please try again.');
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
              Ref: {inquiryRef}
            </span>
            <h3 className="font-semibold text-zinc-900 text-sm">Inquiry Submitted</h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Thank you, <strong className="text-zinc-700">{fullName}</strong>. Our sales team will contact <strong className="text-zinc-700">{contact}</strong> regarding the {car.brand} {car.model}.
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
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-800">Send an Inquiry</h3>
            {status === 'submitting' && (
              <span className="text-[11px] text-zinc-400 animate-pulse font-medium">Submitting...</span>
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
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">
              Full Name
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
                placeholder="e.g. John Tan"
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
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">
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
                placeholder="+65 8123 4567 or email@domain.com"
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
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">
              Your Message
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
            <span>{status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
