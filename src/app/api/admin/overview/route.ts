import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/auth';
import { db } from '@/db';
import { cars, inquiries, promos } from '@/db/schema';
import { MOCK_CARS } from '@/data/mock-cars';
import { MOCK_PROMOS } from '@/data/mock-promos';

export async function GET(request: NextRequest) {
  // 1. Validasi autentikasi via helper lib
  const auth = requireAdminAuth(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    let totalCars = MOCK_CARS.length;
    let availableCars = MOCK_CARS.filter((c) => c.status === 'available').length;
    let totalInquiries = 4;
    let totalPromos = MOCK_PROMOS.length;

    // Coba ambil live data dari PostgreSQL jika terhubung
    try {
      const dbCars = await db.select().from(cars);
      if (dbCars && dbCars.length > 0) {
        totalCars = dbCars.length;
        availableCars = dbCars.filter((c) => c.status === 'available').length;
      }

      const dbInquiries = await db.select().from(inquiries);
      if (dbInquiries) {
        totalInquiries = dbInquiries.length;
      }

      const dbPromos = await db.select().from(promos);
      if (dbPromos && dbPromos.length > 0) {
        totalPromos = dbPromos.filter((p) => p.is_active).length;
      }
    } catch (dbErr) {
      console.warn('DB read error in /api/admin/overview, using mock snapshot:', (dbErr as Error).message);
    }

    return NextResponse.json(
      {
        success: true,
        authenticatedUser: auth.user,
        overview: {
          totalInventory: totalCars,
          availableUnits: availableCars,
          activePromos: totalPromos,
          totalInquiriesCount: totalInquiries,
          showroomStatus: 'OPERATIONAL',
          currency: "IDR",
          lastUpdated: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching admin overview:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal mengambil data ringkasan panel kelola',
      },
      { status: 500 }
    );
  }
}
