import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cars } from '@/db/schema';
import { MOCK_CARS } from '@/data/mock-cars';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let car;
    try {
      car = await db.query.cars.findFirst({
        where: eq(cars.id, id),
        with: {
          images: {
            orderBy: (images, { asc }) => [asc(images.sort_order)],
          },
          creator: {
            columns: {
              id: true,
              full_name: true,
              phone: true,
              role: true,
            },
          },
        },
      });
    } catch (dbError) {
      console.warn('DB query error, checking mock data:', (dbError as Error).message);
    }

    if (!car) {
      car = MOCK_CARS.find((c) => c.id === id);
    }

    if (!car) {
      return NextResponse.json(
        {
          success: false,
          error: 'Mobil tidak ditemukan',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error('Error fetching car detail:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal mengambil detail mobil',
      },
      { status: 500 }
    );
  }
}
