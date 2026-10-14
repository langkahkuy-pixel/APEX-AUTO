import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BuyingStepsSection } from '@/components/BuyingStepsSection';
import { FeaturedCarsSection } from '@/components/FeaturedCarsSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      <Hero />
      <BuyingStepsSection />
      <FeaturedCarsSection />
      <Footer />
    </main>
  );
}
