import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CatalogSection } from '@/components/CatalogSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <Hero />
      <CatalogSection />
      <Footer />
    </main>
  );
}
