import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tentang Kami | Apex Auto Medan",
  description:
    "Kenali Apex Auto, showroom mobil premium bekas di Medan. Pelajari pemeriksaan unit, pilihan tunai/kredit dan tukar tambah, lalu jadwalkan kunjungan ke showroom.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
