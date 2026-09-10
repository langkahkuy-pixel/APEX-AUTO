'use client';

import React, { useState } from 'react';
import { MOCK_PROMOS } from '@/data/mock-promos';
import { PromoItem } from '@/types/promo';
import { PromoTermsModal } from '@/components/PromoTermsModal';
import { MessageCircle } from 'lucide-react';

function PromoCard({
  promo,
  onTerms,
}: {
  promo: PromoItem;
  onTerms: (p: PromoItem) => void;
}) {
  return (
    <div className="group flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300">
      {/* Title + Discount */}
      <div>
        <h3 className="text-base font-semibold text-zinc-900 leading-snug">
          {promo.title}
        </h3>
        {promo.discount_sgd && (
          <p className="mt-2 text-2xl font-bold text-zinc-900 tabular-nums">
            S${promo.discount_sgd.toLocaleString('en-SG')}
            <span className="text-sm font-normal text-zinc-400 ml-1.5">savings</span>
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-zinc-100">
        <a
          href={`https://wa.me/6581234567?text=${encodeURIComponent(
            `Hello Apex Auto Singapore, I would like to claim: ${promo.title}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Claim
        </a>
        <button
          onClick={() => onTerms(promo)}
          className="text-sm text-zinc-400 hover:text-zinc-700 font-medium transition-colors"
        >
          Terms
        </button>
      </div>
    </div>
  );
}

export function PromoSection() {
  const [selectedPromo, setSelectedPromo] = useState<PromoItem | null>(null);
  const topPromos = MOCK_PROMOS.slice(0, 3);

  return (
    <section id="promo" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header — minimal */}
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-10 sm:mb-14">
          Promotions
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPromos.map((promo) => (
            <PromoCard
              key={promo.id}
              promo={promo}
              onTerms={setSelectedPromo}
            />
          ))}
        </div>
      </div>

      {/* Terms Modal */}
      {selectedPromo && (
        <PromoTermsModal promo={selectedPromo} onClose={() => setSelectedPromo(null)} />
      )}
    </section>
  );
}
