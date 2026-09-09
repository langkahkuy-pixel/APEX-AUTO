import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CatalogSection } from '@/components/CatalogSection';
import { ContactShowroomSection } from '@/components/ContactShowroomSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <Hero />
      <CatalogSection />
      <ContactShowroomSection />
      <Footer />
    </main>
  );
}
