import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { CatalogSection } from '@/components/CatalogSection';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Inventory — Apex Auto | Browse Our Full Vehicle Collection',
  description:
    'Browse the complete Apex Auto showroom inventory. Filter luxury and certified pre-owned vehicles by brand, body type, price, year, and location with transparent SGD Nett pricing.',
};

export default function InventoryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#121212] text-white">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="pt-16" />
      <Suspense fallback={<div role="status" className="mx-auto w-full max-w-7xl flex-1 px-6 py-16 text-white/50">Loading inventory...</div>}>
        <CatalogSection />
      </Suspense>
      <Footer theme="dark" />
    </main>
  );
}
