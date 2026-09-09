import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { promos } from '@/db/schema';
import { MOCK_PROMOS } from '@/data/mock-promos';
import { eq, or } from 'drizzle-orm';
import { PromoItem } from '@/types/promo';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let promo: PromoItem | null = null;

    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

      const queryCondition = isUUID
        ? or(eq(promos.id, id), eq(promos.slug, id))
        : eq(promos.slug, id);

      const [row] = await db
        .select()
        .from(promos)
        .where(queryCondition)
        .limit(1);

      if (row) {
        promo = {
          id: row.id,
          slug: row.slug,
          title: row.title,
          tagline: row.tagline,
          badge: row.badge,
          discount_sgd: row.discount_sgd ? parseFloat(row.discount_sgd.toString()) : undefined,
          description: row.description,
          benefits: row.benefits ? JSON.parse(row.benefits) : [],
          terms_conditions: row.terms_conditions ? JSON.parse(row.terms_conditions) : [],
          valid_until: row.valid_until,
          image_url: row.image_url,
          highlight_color: row.highlight_color || 'amber',
          cta_text: row.cta_text,
          cta_whatsapp_text: row.cta_whatsapp_text,
          is_featured: row.is_featured,
        };
      }
    } catch (dbErr) {
      console.warn('DB error fetching promo detail, searching mock data:', (dbErr as Error).message);
    }

    if (!promo) {
      const mockFound = MOCK_PROMOS.find(
        (p) => p.id === id || p.slug === id
      );
      if (mockFound) {
        promo = mockFound;
      }
    }

    if (!promo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Program promo tidak ditemukan',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: promo,
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
    console.error('Error fetching promo detail:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal mengambil detail syarat promo',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
