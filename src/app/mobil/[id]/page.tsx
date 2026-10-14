import { formatRupiah } from '@/lib/locale';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MOCK_CARS } from '@/data/mock-cars';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CarDetailContent } from '@/components/CarDetailContent';
import { getSqliteCarById, getSqliteCars } from '@/db/sqlite';

interface CarDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = true;

async function fetchCar(id: string) {
  try {
    const car = await getSqliteCarById(id);
    if (car) return car;
  } catch (e) {
    console.warn('Failed to get car from sqlite:', e);
  }
  return MOCK_CARS.find((c) => c.id === id) || null;
}

export async function generateStaticParams() {
  return MOCK_CARS.map((car) => ({
    id: car.id,
  }));
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await fetchCar(id);

  if (!car) {
    return {
      title: "Mobil Tidak Ditemukan | Apex Auto",
    };
  }

  return {
    title: `${car.brand} ${car.model} (${car.year}) — ${formatRupiah(car.price)} | Apex Auto`,
    description: `Spesifikasi, galeri foto, dan harga rupiah untuk ${car.brand} ${car.model} (${car.year}). Konsultasikan kondisi unit, dokumen STNK/BPKB, pajak, dan pilihan pembayaran.`,
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const car = await fetchCar(id);
  if (!car) notFound();

  let inventory = MOCK_CARS;
  try { inventory = await getSqliteCars(); }
  catch (error) { console.warn('Failed to load related inventory:', error); }
  const relatedCars = inventory.filter(item => item.id !== car.id && item.status !== 'sold')
    .sort((a, b) => Number(b.body_type === car.body_type) - Number(a.body_type === car.body_type))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#171717] text-white">
      <Navbar />
      <CarDetailContent key={car.id} car={car} relatedCars={relatedCars} />
      <Footer theme="dark" />
    </div>
  );
}