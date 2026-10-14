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

    if (priceRange === 'under-500m') {
      maxPrice = 499999999;
    } else if (priceRange === '500m-1b') {
      minPrice = 500000000;
      maxPrice = 1000000000;
    } else if (priceRange === 'above-1b') {
      minPrice = 1000000001;
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
        error: "Gagal memuat pencarian dan filter mobil",
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
      transmission = "Otomatis",
      fuel_type = "Bensin",
      mileage_km = 0,
      color,
      description = '',
      features = [],
      status = 'available',
      location = "Medan, Sumatera Utara",
      annual_tax_idr,
      tax_expiry = '',
      plate_number = '',
      document_status = '',
      owners,
      engine_capacity_cc,
      monthly_est_idr,
      images = [],
      is_featured = false,
    } = body;

    // Validation
    if (!brand || !model || !year || !price || !body_type || !color) {
      return NextResponse.json(
        {
          success: false,
          error: "Merek, model, tahun, harga, jenis bodi, dan warna wajib diisi.",
        },
        { status: 400 }
      );
    }

    if (!Number.isSafeInteger(Number(price)) || Number(price) <= 0) {
      return NextResponse.json({ success: false, error: 'Harga harus berupa nominal rupiah bulat yang lebih dari nol.' }, { status: 400 });
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
      annual_tax_idr: annual_tax_idr ? Number(annual_tax_idr) : undefined,
      tax_expiry,
      plate_number,
      document_status,
      owners: owners ? Number(owners) : undefined,
      engine_capacity_cc: engine_capacity_cc ? Number(engine_capacity_cc) : undefined,
      monthly_est_idr: monthly_est_idr ? Number(monthly_est_idr) : undefined,
      is_featured: Boolean(is_featured),
      images: defaultImages,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Unit "${createdCar.brand} ${createdCar.model}" berhasil ditambahkan ke katalog.`,
        data: createdCar,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/cars:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menambahkan mobil ke katalog.",
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
