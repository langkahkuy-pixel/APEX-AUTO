import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedCarsSection } from '@/components/FeaturedCarsSection';
import { CatalogSection } from '@/components/CatalogSection';
import { PromoSection } from '@/components/PromoSection';
import { ContactShowroomSection } from '@/components/ContactShowroomSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      <Hero />
      <FeaturedCarsSection />
      <CatalogSection />
      <PromoSection />
      <ContactShowroomSection />
      <Footer />
    </main>
  );
}
