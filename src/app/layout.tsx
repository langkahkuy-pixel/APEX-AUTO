import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Apex Auto Medan | Showroom Mobil Premium Bekas",
  description:
    "Temukan mobil premium bekas pilihan di Apex Auto Medan. Harga rupiah, pemeriksaan kondisi, STNK/BPKB, tunai, kredit bank/leasing, dan tukar tambah.",
  keywords: [
    "showroom mobil premium Medan",
    "mobil bekas pilihan",
    "jual beli mobil bekas",
    "showroom mobil Medan",
    'Apex Auto',
    "harga mobil rupiah",
  ],
  openGraph: {
    locale: 'id_ID',
    title: "Apex Auto Medan | Showroom Mobil Premium Bekas",
    description:
      "Mobil premium bekas pilihan dengan harga rupiah yang jelas, kelengkapan dokumen, serta pilihan tunai, kredit, dan tukar tambah.",
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
    <html lang="id" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#FAFAFA] text-zinc-900 min-h-screen flex flex-col font-sans antialiased">
        {children}
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
