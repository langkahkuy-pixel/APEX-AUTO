import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Apex Auto Singapore — Showroom Mobil Mewah & Pre-Owned Singapura',
  description:
    'Jelajahi katalog mobil pre-owned dan mewah terbaik di Singapura. Transparansi harga SGD Nett, sertifikasi inspeksi 100 titik, dan informasi COE terpercaya di Leng Kee, Ubi, dan Sin Ming.',
  keywords: [
    'Singapore car showroom',
    'used cars Singapore',
    'luxury cars Singapore',
    'COE car dealer',
    'Leng Kee cars',
    'Apex Auto SG',
  ],
  openGraph: {
    title: 'Apex Auto Singapore — Showroom Mobil Mewah & Pre-Owned Singapura',
    description:
      'Katalog mobil pre-owned pilihan dengan harga SGD Nett transparan dan garansi inspeksi resmi.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
