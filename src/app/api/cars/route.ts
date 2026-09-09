import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cars } from '@/db/schema';
import { MOCK_CARS } from '@/data/mock-cars';
import { desc, asc, ilike, eq, gte, lte, and, or } from 'drizzle-orm';

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
    const sort = searchParams.get('sort') || 'newest';

    // Translate shorthand price range if provided
    if (priceRange === 'under-150k') {
      maxPrice = 149999.99;
    } else if (priceRange === '150k-200k') {
      minPrice = 150000;
      maxPrice = 200000;
    } else if (priceRange === 'above-200k') {
      minPrice = 200000.01;
    }

    // Try fetching from PostgreSQL database with Drizzle ORM
    let resultCars;
    try {
      const conditions = [];

      // 1. Pencarian kata kunci (brand, model, color, features, location)
      if (search.trim()) {
        const term = `%${search.trim()}%`;
        conditions.push(
          or(
            ilike(cars.brand, term),
            ilike(cars.model, term),
            ilike(cars.color, term),
            ilike(cars.features, term),
            ilike(cars.location, term)
          )
        );
      }

      // 2. Filter tipe bodi (Sedan, SUV, Coupe, MPV, Hatchback)
      if (bodyType && bodyType !== 'Semua') {
        conditions.push(eq(cars.body_type, bodyType));
      }

      // 3. Filter rentang harga SGD
      if (minPrice !== null && !isNaN(minPrice)) {
        conditions.push(gte(cars.price, minPrice.toString()));
      }
      if (maxPrice !== null && !isNaN(maxPrice)) {
        conditions.push(lte(cars.price, maxPrice.toString()));
      }

      // 4. Filter minimal tahun pembuatan
      if (minYear !== null && !isNaN(minYear) && minYear > 0) {
        conditions.push(gte(cars.year, minYear));
      }

      // 5. Filter lokasi showroom di Singapura
      if (location && location !== 'Semua Lokasi') {
        conditions.push(eq(cars.location, location));
      }

      // 6. Urutan (Sort): harga (rendah/tinggi), tahun, terbaru
      let orderByClause = desc(cars.created_at);
      if (sort === 'price-asc') {
        orderByClause = asc(cars.price);
      } else if (sort === 'price-desc') {
        orderByClause = desc(cars.price);
      } else if (sort === 'year-desc') {
        orderByClause = desc(cars.year);
      }

      resultCars = await db.query.cars.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        orderBy: [orderByClause],
        with: {
          images: {
            orderBy: (images, { asc }) => [asc(images.sort_order)],
          },
        },
      });

      // Fallback jika database belum berisi baris data
      if (!resultCars || resultCars.length === 0) {
        resultCars = filterAndSortMockCars({
          search,
          bodyType,
          minPrice,
          maxPrice,
          minYear,
          location,
          sort,
        });
      }
    } catch (dbError) {
      console.warn('PostgreSQL query fallback to mock data:', (dbError as Error).message);
      resultCars = filterAndSortMockCars({
        search,
        bodyType,
        minPrice,
        maxPrice,
        minYear,
        location,
        sort,
      });
    }

    return NextResponse.json({
      success: true,
      data: resultCars,
      total: resultCars.length,
      filters: {
        search,
        body_type: bodyType,
        price_range: priceRange,
        min_price: minPrice,
        max_price: maxPrice,
        min_year: minYear,
        location,
        sort,
      },
    });
  } catch (error) {
    console.error('Error in GET /api/cars:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal memproses pencarian dan filter katalog mobil',
      },
      { status: 500 }
    );
  }
}

interface FilterOptions {
  search: string;
  bodyType: string;
  minPrice: number | null;
  maxPrice: number | null;
  minYear: number | null;
  location: string;
  sort: string;
}

function filterAndSortMockCars(opts: FilterOptions) {
  return MOCK_CARS.filter((car) => {
    if (opts.search.trim()) {
      const q = opts.search.toLowerCase().trim();
      const match =
        car.brand.toLowerCase().includes(q) ||
        car.model.toLowerCase().includes(q) ||
        car.color.toLowerCase().includes(q) ||
        car.location.toLowerCase().includes(q) ||
        car.features.some((f) => f.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (opts.bodyType && opts.bodyType !== 'Semua' && car.body_type !== opts.bodyType) {
      return false;
    }

    if (opts.minPrice !== null && car.price < opts.minPrice) {
      return false;
    }

    if (opts.maxPrice !== null && car.price > opts.maxPrice) {
      return false;
    }

    if (opts.minYear !== null && opts.minYear > 0 && car.year < opts.minYear) {
      return false;
    }

    if (opts.location && opts.location !== 'Semua Lokasi' && car.location !== opts.location) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (opts.sort === 'price-asc') return a.price - b.price;
    if (opts.sort === 'price-desc') return b.price - a.price;
    if (opts.sort === 'year-desc') return b.year - a.year;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}
