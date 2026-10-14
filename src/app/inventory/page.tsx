import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { CatalogSection } from '@/components/CatalogSection';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Pilihan Mobil | Apex Auto Medan",
  description:
    "Temukan mobil premium bekas pilihan Apex Auto Medan. Bandingkan harga rupiah, tahun, kilometer, dan spesifikasi. Tersedia pembelian tunai, kredit, dan tukar tambah.",
};

export default function InventoryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#121212] text-white">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="pt-16" />
      <Suspense fallback={<div role="status" className="mx-auto w-full max-w-7xl flex-1 px-6 py-16 text-white/50">Memuat pilihan mobil...</div>}>
        <CatalogSection />
      </Suspense>
      <Footer theme="dark" />
    </main>
  );
}
