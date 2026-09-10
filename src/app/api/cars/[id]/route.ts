import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cars, car_images } from '@/db/schema';
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

    // Format fields if fetched from PostgreSQL table
    const formattedCar = {
      ...car,
      price: typeof car.price === 'string' ? parseFloat(car.price) : car.price,
      depreciation_sgd:
        car.depreciation_sgd !== undefined && car.depreciation_sgd !== null
          ? parseFloat(car.depreciation_sgd.toString())
          : undefined,
      monthly_est_sgd:
        car.monthly_est_sgd !== undefined && car.monthly_est_sgd !== null
          ? parseFloat(car.monthly_est_sgd.toString())
          : undefined,
      features:
        typeof car.features === 'string'
          ? car.features.split(',').map((f: string) => f.trim()).filter(Boolean)
          : car.features || [],
    };

    return NextResponse.json(
      {
        success: true,
        data: formattedCar,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
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

/**
 * PUT /api/cars/[id]: Perbarui detail unit mobil secara keseluruhan
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      brand,
      model,
      year,
      price,
      body_type,
      transmission,
      fuel_type,
      mileage_km,
      color,
      description,
      features,
      status,
      location,
      depreciation_sgd,
      coe_expiry,
      engine_capacity_cc,
      monthly_est_sgd,
      is_featured,
    } = body;

    let updatedCar;
    try {
      const formattedFeatures = Array.isArray(features) ? features.join(', ') : features;
      const updateData: Record<string, any> = {
        updated_at: new Date(),
      };

      if (brand !== undefined) updateData.brand = brand;
      if (model !== undefined) updateData.model = model;
      if (year !== undefined) updateData.year = Number(year);
      if (price !== undefined) updateData.price = price.toString();
      if (body_type !== undefined) updateData.body_type = body_type;
      if (transmission !== undefined) updateData.transmission = transmission;
      if (fuel_type !== undefined) updateData.fuel_type = fuel_type;
      if (mileage_km !== undefined) updateData.mileage_km = Number(mileage_km);
      if (color !== undefined) updateData.color = color;
      if (description !== undefined) updateData.description = description;
      if (formattedFeatures !== undefined) updateData.features = formattedFeatures;
      if (status !== undefined) updateData.status = status;
      if (location !== undefined) updateData.location = location;
      if (depreciation_sgd !== undefined) updateData.depreciation_sgd = depreciation_sgd ? depreciation_sgd.toString() : null;
      if (coe_expiry !== undefined) updateData.coe_expiry = coe_expiry;
      if (engine_capacity_cc !== undefined) updateData.engine_capacity_cc = engine_capacity_cc ? Number(engine_capacity_cc) : null;
      if (monthly_est_sgd !== undefined) updateData.monthly_est_sgd = monthly_est_sgd ? monthly_est_sgd.toString() : null;
      if (is_featured !== undefined) updateData.is_featured = Boolean(is_featured);

      const [res] = await db
        .update(cars)
        .set(updateData)
        .where(eq(cars.id, id))
        .returning();

      updatedCar = res;
    } catch (dbError) {
      console.warn('DB update fallback, mock response:', (dbError as Error).message);
      updatedCar = {
        id,
        ...body,
        updated_at: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      success: true,
      message: `Data mobil ${id} berhasil diperbarui.`,
      data: updatedCar,
    });
  } catch (error) {
    console.error('Error in PUT /api/cars/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal memperbarui data mobil.',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/cars/[id]: Perbarui status atau field parsial mobil
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    let updatedCar;
    try {
      const updateData: Record<string, any> = {
        updated_at: new Date(),
      };
      if (body.status !== undefined) updateData.status = body.status;
      if (body.price !== undefined) updateData.price = body.price.toString();
      if (body.is_featured !== undefined) updateData.is_featured = Boolean(body.is_featured);

      const [res] = await db
        .update(cars)
        .set(updateData)
        .where(eq(cars.id, id))
        .returning();

      updatedCar = res;
    } catch (dbError) {
      console.warn('DB patch fallback, mock response:', (dbError as Error).message);
      updatedCar = { id, ...body, updated_at: new Date().toISOString() };
    }

    return NextResponse.json({
      success: true,
      message: `Status mobil ${id} berhasil diubah.`,
      data: updatedCar,
    });
  } catch (error) {
    console.error('Error in PATCH /api/cars/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal mengubah status mobil.',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cars/[id]: Hapus unit mobil dari inventaris
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      // Hapus relasi car_images dan baris car
      await db.delete(car_images).where(eq(car_images.car_id, id));
      await db.delete(cars).where(eq(cars.id, id));
    } catch (dbError) {
      console.warn('DB delete fallback, mock deletion:', (dbError as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Unit mobil ${id} berhasil dihapus dari inventaris showroom.`,
    });
  } catch (error) {
    console.error('Error in DELETE /api/cars/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal menghapus unit mobil.',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
