import { NextRequest, NextResponse } from 'next/server';
import { getSqliteCarById, updateSqliteCar, deleteSqliteCar } from '@/db/sqlite';
import { MOCK_CARS } from '@/data/mock-cars';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let car = await getSqliteCarById(id);

    if (!car) {
      car = MOCK_CARS.find((c) => c.id === id) || null;
    }

    if (!car) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vehicle not found in showroom inventory.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: car,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching car detail:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve vehicle details.',
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

    const updatedCar = await updateSqliteCar(id, body);
    if (!updatedCar) {
      return NextResponse.json(
        {
          success: false,
          error: `Vehicle with id ${id} not found to update.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Vehicle details for "${updatedCar.brand} ${updatedCar.model}" successfully updated.`,
      data: updatedCar,
    });
  } catch (error) {
    console.error('Error in PUT /api/cars/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update vehicle record.',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/cars/[id]: Perbarui status unit mobil (available / reserved / sold) atau harga
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedCar = await updateSqliteCar(id, body);
    if (!updatedCar) {
      return NextResponse.json(
        {
          success: false,
          error: `Vehicle with id ${id} not found.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Vehicle status for "${updatedCar.brand} ${updatedCar.model}" updated to ${(updatedCar.status).toUpperCase()}.`,
      data: updatedCar,
    });
  } catch (error) {
    console.error('Error in PATCH /api/cars/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update vehicle status.',
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
    const success = await deleteSqliteCar(id);

    return NextResponse.json({
      success: true,
      message: `Unit mobil ${id} berhasil dihapus dari inventaris showroom.`,
      deleted: success,
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
