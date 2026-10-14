'use client';

import React from 'react';
import Link from 'next/link';
import { Car as CarIcon, Wrench, ArrowLeftRight, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: CarIcon,
    title: "Jual Beli Mobil Premium",
    description:
      "Temukan mobil premium bekas pilihan dengan pemeriksaan kondisi, riwayat servis, dan kelengkapan dokumen. Harga tunai dan opsi kredit dijelaskan sejak awal.",
    cta: "Lihat Pilihan Mobil",
    href: '/inventory',
  },
  {
    icon: Wrench,
    title: "Perawatan Kendaraan",
    description:
      "Konsultasikan servis berkala, pemeriksaan mesin, dan detailing agar mobil Anda tetap nyaman digunakan setiap hari.",
    cta: "Konsultasi Servis",
    href: '/tentang-kami#contact-showroom',
  },
  {
    icon: ArrowLeftRight,
    title: "Tukar Tambah & Titip Jual",
    description:
      "Bawa mobil lama Anda untuk penilaian kondisi dan harga. Selisih nilai bisa digunakan untuk pembelian berikutnya, atau titip jual melalui showroom kami.",
    cta: "Minta Penilaian",
    href: '/tentang-kami#contact-showroom',
  },
];

export function HomeServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
            Layanan Kami
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Dari Memilih Mobil sampai Serah Terima
          </h2>
          <p className="text-sm text-zinc-500 mt-3 leading-relaxed max-w-lg">
            Kami membantu Anda memilih unit, bernegosiasi, menyiapkan pengajuan kredit, dan memahami dokumen kendaraan sebelum serah terima.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/60"
              >
                {/* Icon */}
                <div>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-zinc-900 hover:text-amber-600 transition-colors group/link"
                >
                  {service.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
