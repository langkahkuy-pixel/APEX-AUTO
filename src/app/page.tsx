import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { CatalogSection } from '@/components/CatalogSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactShowroomSection } from '@/components/ContactShowroomSection';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      <Hero />
      <Suspense fallback={<div role="status" className="bg-[#121212] px-6 py-16 text-white/60">Memuat pilihan mobil...</div>}>
        <CatalogSection />
      </Suspense>
      <TestimonialsSection />
      <AboutSection />
      <ContactShowroomSection />
      <Footer />
    </main>
  );
}
