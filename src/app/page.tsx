import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HomeServicesSection } from '@/components/HomeServicesSection';
import { FeaturedCarsSection } from '@/components/FeaturedCarsSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      <Hero />
      <HomeServicesSection />
      <FeaturedCarsSection />
      <Footer />
    </main>
  );
}
