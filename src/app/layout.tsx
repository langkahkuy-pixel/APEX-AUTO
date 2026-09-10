import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Apex Auto — Premier Luxury & Pre-Owned Car Showroom',
  description:
    'Explore our curated luxury and certified pre-owned car collection. Transparent SGD Nett pricing, 100-point inspection certification, and verified COE details across Leng Kee, Ubi, and Sin Ming showrooms.',
  keywords: [
    'luxury car showroom',
    'certified pre-owned cars',
    'COE car dealer',
    'Leng Kee showroom',
    'Apex Auto',
    'SGD Nett pricing',
  ],
  openGraph: {
    title: 'Apex Auto — Premier Luxury & Pre-Owned Car Showroom',
    description:
      'Curated pre-owned prestige cars with transparent SGD Nett pricing and official showroom warranty.',
    type: 'website',
  },
};

import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#FAFAFA] text-zinc-900 min-h-screen flex flex-col font-sans antialiased">
        {children}
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
