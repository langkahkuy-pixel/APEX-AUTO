import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { promos } from '@/db/schema';
import { MOCK_PROMOS } from '@/data/mock-promos';
import { eq, and, desc } from 'drizzle-orm';
import { PromoItem } from '@/types/promo';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredParam = searchParams.get('featured');
    const categoryParam = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    let promoList: PromoItem[] = [];

    try {
      const conditions = [eq(promos.is_active, true)];
      if (featuredParam === 'true') {
        conditions.push(eq(promos.is_featured, true));
      }

      const rows = await db
        .select()
        .from(promos)
        .where(and(...conditions))
        .orderBy(desc(promos.is_featured), desc(promos.created_at))
        .limit(limit);

      if (rows && rows.length > 0) {
        promoList = rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          tagline: r.tagline,
          badge: r.badge,
          discount_sgd: r.discount_sgd ? parseFloat(r.discount_sgd.toString()) : undefined,
          description: r.description,
          benefits: r.benefits ? JSON.parse(r.benefits) : [],
          terms_conditions: r.terms_conditions ? JSON.parse(r.terms_conditions) : [],
          valid_until: r.valid_until,
          image_url: r.image_url,
          highlight_color: r.highlight_color || 'amber',
          cta_text: r.cta_text,
          cta_whatsapp_text: r.cta_whatsapp_text,
          is_featured: r.is_featured,
        }));
      }
    } catch (dbErr) {
      console.warn('DB error fetching promos, falling back to mock data:', (dbErr as Error).message);
    }

    // Fallback to MOCK_PROMOS if database returned empty or was offline
    if (promoList.length === 0) {
      promoList = MOCK_PROMOS;
    }

    // Filter by category if requested
    if (categoryParam && categoryParam !== 'Semua') {
      promoList = promoList.filter((p) => {
        if (categoryParam === 'COE') return p.badge.includes('COE') || p.id.includes('coe');
        if (categoryParam === 'Financing') return p.badge.includes('FINANCING') || p.id.includes('interest');
        if (categoryParam === 'Trade-In') return p.badge.includes('TRADE-IN') || p.id.includes('tradein');
        if (categoryParam === 'EV') return p.badge.includes('EV') || p.id.includes('ev');
        return true;
      });
    }

    if (featuredParam === 'true') {
      promoList = promoList.filter((p) => p.is_featured);
    }

    return NextResponse.json(
      {
        success: true,
        count: promoList.length,
        data: promoList,
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
    console.error('Error fetching active promos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal memuat daftar promo aktif',
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
