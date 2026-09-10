import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { ContactShowroomSection } from '@/components/ContactShowroomSection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact — Apex Auto | Leng Kee Flagship Showroom',
  description:
    'Visit Apex Auto Flagship Showroom at 24 Leng Kee Road, Singapore. Send an inquiry, schedule a private test drive, or get a trade-in valuation. WhatsApp and online form available.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="pt-16" />
      <ContactShowroomSection />
      <Footer />
    </main>
  );
}
