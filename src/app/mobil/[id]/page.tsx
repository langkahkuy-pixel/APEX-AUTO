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
      title: 'Vehicle Not Found — Apex Auto',
    };
  }

  return {
    title: `${car.brand} ${car.model} (${car.year}) — SGD $${car.price.toLocaleString('en-US')} | Apex Auto`,
    description: `Comprehensive technical specifications, photo gallery, and transparent SGD Nett pricing for the ${car.brand} ${car.model} (${car.year}). Certified showroom condition with verified COE details.`,
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