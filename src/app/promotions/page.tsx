import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { ServiceSection } from '@/components/ServiceSection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Service — Apex Auto | Trusted Luxury Vehicle Maintenance',
  description:
    'Expert periodic maintenance, advanced diagnostics, and luxury detailing for prestige vehicles. Certified technicians, genuine OEM parts, and service warranty at Apex Auto.',
};

export default function ServicePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="pt-16" />
      <ServiceSection />
      <Footer />
    </main>
  );
}
