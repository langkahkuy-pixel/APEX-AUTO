import { NextRequest, NextResponse } from 'next/server';
import { getSqliteCars, createSqliteCar } from '@/db/sqlite';
import { MOCK_CARS } from '@/data/mock-cars';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const bodyType = searchParams.get('body_type') || '';
    const priceRange = searchParams.get('price_range') || '';
    let minPrice = searchParams.get('min_price') ? Number(searchParams.get('min_price')) : null;
    let maxPrice = searchParams.get('max_price') ? Number(searchParams.get('max_price')) : null;
    const minYear = searchParams.get('min_year') ? Number(searchParams.get('min_year')) : null;
    const location = searchParams.get('location') || '';
    const status = searchParams.get('status') || '';
    const sort = searchParams.get('sort') || 'newest';

    if (priceRange === 'under-150k') {
      maxPrice = 149999.99;
    } else if (priceRange === '150k-200k') {
      minPrice = 150000;
      maxPrice = 200000;
    } else if (priceRange === 'above-200k') {
      minPrice = 200000.01;
    }

    let carsList;
    try {
      carsList = await getSqliteCars({
        search,
        bodyType,
        priceRange,
        minPrice,
        maxPrice,
        minYear,
        location,
        status,
        sort,
      });
    } catch (dbErr) {
      console.warn('SQLite fetch warning, fallback to mock data:', dbErr);
      carsList = MOCK_CARS;
    }

    return NextResponse.json({
      success: true,
      data: carsList,
      total: carsList.length,
      filters: {
        search,
        body_type: bodyType,
        price_range: priceRange,
        min_price: minPrice,
        max_price: maxPrice,
        min_year: minYear,
        location,
        status,
        sort,
      },
    });
  } catch (error) {
    console.error('Error in GET /api/cars:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process vehicle catalog search and filters',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cars: Tambah unit mobil baru ke inventaris
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      brand,
      model,
      year,
      price,
      body_type,
      transmission = 'Automatic',
      fuel_type = 'Petrol',
      mileage_km = 0,
      color,
      description = '',
      features = [],
      status = 'available',
      location = 'Leng Kee Showroom, Singapore',
      depreciation_sgd,
      coe_expiry = '10-Year COE',
      engine_capacity_cc,
      monthly_est_sgd,
      images = [],
      is_featured = false,
    } = body;

    // Validation
    if (!brand || !model || !year || !price || !body_type || !color) {
      return NextResponse.json(
        {
          success: false,
          error: 'Required fields missing: brand, model, year, price, body_type, and color are required.',
        },
        { status: 400 }
      );
    }

    const defaultImages =
      images && images.length > 0
        ? images
        : [
            {
              id: `img-${Date.now()}-1`,
              url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80',
              is_main: true,
              sort_order: 0,
            },
          ];

    const createdCar = await createSqliteCar({
      brand: brand.trim(),
      model: model.trim(),
      year: Number(year),
      price: Number(price),
      body_type,
      transmission,
      fuel_type,
      mileage_km: Number(mileage_km) || 0,
      color: color.trim(),
      description: description ? description.trim() : '',
      features: Array.isArray(features) ? features : [features].filter(Boolean),
      status,
      location,
      depreciation_sgd: depreciation_sgd ? Number(depreciation_sgd) : undefined,
      coe_expiry,
      engine_capacity_cc: engine_capacity_cc ? Number(engine_capacity_cc) : undefined,
      monthly_est_sgd: monthly_est_sgd ? Number(monthly_est_sgd) : undefined,
      is_featured: Boolean(is_featured),
      images: defaultImages,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Unit "${createdCar.brand} ${createdCar.model}" successfully added to showroom inventory.`,
        data: createdCar,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/cars:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create new vehicle record in inventory.',
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
