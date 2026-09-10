import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { PromoSection } from '@/components/PromoSection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Promotions — Apex Auto | Exclusive Deals & COE Specials',
  description:
    'Discover exclusive Apex Auto promotions including COE bidding subsidies, preferential financing rates, trade-in bonuses, and EV green mobility rebates.',
};

export default function PromotionsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="pt-16" />
      <PromoSection />
      <Footer />
    </main>
  );
}
