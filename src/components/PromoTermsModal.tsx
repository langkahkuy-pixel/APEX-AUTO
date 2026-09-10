'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { PromoItem } from '@/types/promo';
import {
  X,
  FileText,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Share2,
  Copy,
  ExternalLink,
  Award,
} from 'lucide-react';

interface PromoTermsModalProps {
  promo: PromoItem | null;
  onClose: () => void;
}

export function PromoTermsModal({ promo, onClose }: PromoTermsModalProps) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!promo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [promo, onClose]);

  if (!promo) return null;

  const waUrl = `https://wa.me/6581234567?text=${encodeURIComponent(promo.cta_whatsapp_text)}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/#promo`;
      navigator.clipboard.writeText(url);
      alert('Promotion link copied to clipboard!');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-terms-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-750 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Thumbnail Banner */}
        <div className="relative h-44 sm:h-52 w-full flex-shrink-0 bg-slate-950 overflow-hidden">
          <Image
            src={promo.image_url}
            alt={promo.title}
            fill
            className="object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terms and conditions modal"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Badge Header */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                {promo.badge}
              </span>
              {promo.discount_sgd && (
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-md">
                  Savings: S${promo.discount_sgd.toLocaleString('en-US')}
                </span>
              )}
            </div>
            <span className="text-xs text-slate-300 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Valid until {promo.valid_until}</span>
            </span>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div>
            <h2 id="promo-terms-title" className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {promo.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {promo.tagline}
            </p>
          </div>

          {/* Overview Statement */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5 text-xs text-amber-400">
              <Award className="w-4 h-4" />
              <span>Official Offer Details — Apex Auto</span>
            </div>
            <p>{promo.description}</p>
          </div>

          {/* Inclusions and Benefits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Inclusions &amp; Benefits:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {promo.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terms & Conditions Detail */}
          <div className="space-y-3 border-t border-slate-800 pt-5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Terms &amp; Conditions:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300/90 pl-1">
              {promo.terms_conditions.map((term, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-amber-400 flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{term}</span>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-amber-400 flex-shrink-0 mt-0.5">
                  {promo.terms_conditions.length + 1}
                </span>
                <span className="leading-relaxed">
                  Customers must present their WhatsApp confirmation or reference voucher prior to signing the Sales Agreement at our Leng Kee, Ubi, or Sin Ming showrooms.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-amber-400 flex-shrink-0 mt-0.5">
                  {promo.terms_conditions.length + 2}
                </span>
                <span className="leading-relaxed">
                  Apex Auto reserves the right to modify promotional vehicle quotas without prior notice once monthly allocations are met.
                </span>
              </li>
            </ul>
          </div>

          {/* Step-by-Step Claim Flow */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>How to Claim This Offer:</span>
            </h4>
            <ol className="text-xs text-slate-300 space-y-1.5 pl-5 list-decimal">
              <li>Click the <strong>&ldquo;Claim via WhatsApp&rdquo;</strong> button below.</li>
              <li>Reference promo code <strong>{promo.badge}</strong> and your vehicle of interest.</li>
              <li>Our showroom consultant will confirm quota and unit availability within 10 minutes.</li>
              <li>Schedule a private viewing and test drive at your preferred showroom hub.</li>
            </ol>
          </div>
        </div>

        {/* Modal Fixed Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs border border-slate-800 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white font-medium transition-colors"
            >
              Close
            </button>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Claim via WhatsApp (+65 8123 4567)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
