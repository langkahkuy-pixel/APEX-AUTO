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
          highlight_color: (r.highlight_color as 'amber' | 'emerald' | 'blue' | 'purple') || 'amber',
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

/**
 * POST /api/promos: Buat program promo showroom baru
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      tagline,
      badge,
      discount_sgd,
      description,
      benefits = [],
      terms_conditions = [],
      valid_until,
      image_url,
      highlight_color = 'amber',
      cta_text = 'Klaim Penawaran Ini',
      cta_whatsapp_text = 'Halo Apex Auto, saya ingin klaim promo ini',
      is_featured = false,
      is_active = true,
    } = body;

    if (!title || !badge || !description || !valid_until || !image_url) {
      return NextResponse.json(
        {
          success: false,
          error: 'Field wajib belum lengkap: title, badge, description, valid_until, image_url harus diisi.',
        },
        { status: 400 }
      );
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    let createdPromo;
    try {
      const [inserted] = await db
        .insert(promos)
        .values({
          slug: generatedSlug,
          title,
          tagline: tagline || title,
          badge,
          discount_sgd: discount_sgd ? discount_sgd.toString() : null,
          description,
          benefits: JSON.stringify(Array.isArray(benefits) ? benefits : [benefits]),
          terms_conditions: JSON.stringify(Array.isArray(terms_conditions) ? terms_conditions : [terms_conditions]),
          valid_until,
          image_url,
          highlight_color,
          cta_text,
          cta_whatsapp_text,
          is_featured: Boolean(is_featured),
          is_active: Boolean(is_active),
        })
        .returning();

      createdPromo = inserted;
    } catch (dbErr) {
      console.warn('DB promo insert error, fallback mock:', (dbErr as Error).message);
      createdPromo = {
        id: `prm-${Date.now()}`,
        slug: generatedSlug,
        title,
        tagline: tagline || title,
        badge,
        discount_sgd: discount_sgd ? Number(discount_sgd) : undefined,
        description,
        benefits: Array.isArray(benefits) ? benefits : [benefits],
        terms_conditions: Array.isArray(terms_conditions) ? terms_conditions : [terms_conditions],
        valid_until,
        image_url,
        highlight_color,
        cta_text,
        cta_whatsapp_text,
        is_featured: Boolean(is_featured),
        is_active: Boolean(is_active),
        created_at: new Date().toISOString(),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Program promo berhasil dibuat.',
        data: createdPromo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/promos:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal membuat program promo baru.' },
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
