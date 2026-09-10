import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { CatalogSection } from '@/components/CatalogSection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Inventory — Apex Auto | Browse Our Full Vehicle Collection',
  description:
    'Browse the complete Apex Auto showroom inventory. Filter luxury and certified pre-owned vehicles by brand, body type, price, year, and location with transparent SGD Nett pricing.',
};

export default function InventoryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="pt-16" />
      <CatalogSection />
      <Footer />
    </main>
  );
}
