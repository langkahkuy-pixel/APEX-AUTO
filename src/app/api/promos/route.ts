import { NextRequest, NextResponse } from 'next/server';
import { getSqlitePromos, createSqlitePromo } from '@/db/sqlite';
import { MOCK_PROMOS } from '@/data/mock-promos';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredParam = searchParams.get('featured');

    let promoList;
    try {
      promoList = await getSqlitePromos();
    } catch (err) {
      console.warn('SQLite error fetching promos, fallback to mock data:', err);
      promoList = MOCK_PROMOS;
    }

    if (featuredParam === 'true') {
      promoList = promoList.filter((p) => p.is_featured);
    }

    return NextResponse.json({
      success: true,
      data: promoList,
      total: promoList.length,
    });
  } catch (error) {
    console.error('Error in GET /api/promos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve promotional campaigns.',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/promos: Tambah program promosi baru
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      tagline = '',
      badge = 'SPECIAL PROMOTION',
      discount_sgd,
      description = '',
      benefits = [],
      terms_conditions = [],
      valid_until = 'Ongoing',
      image_url,
      highlight_color = 'amber',
      cta_text = 'Claim via WhatsApp',
      cta_whatsapp_text,
      is_featured = false,
    } = body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Promotion title is required.',
        },
        { status: 400 }
      );
    }

    const createdPromo = await createSqlitePromo({
      title: title.trim(),
      tagline: tagline.trim(),
      badge: badge.trim(),
      discount_sgd: discount_sgd ? Number(discount_sgd) : undefined,
      description: description.trim(),
      benefits: Array.isArray(benefits) ? benefits : [benefits].filter(Boolean),
      terms_conditions: Array.isArray(terms_conditions) ? terms_conditions : [terms_conditions].filter(Boolean),
      valid_until,
      image_url:
        image_url ||
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      highlight_color,
      cta_text,
      cta_whatsapp_text:
        cta_whatsapp_text ||
        `Hello Apex Auto, I would like to inquire about the ${title} promotion.`,
      is_featured: Boolean(is_featured),
    });

    return NextResponse.json(
      {
        success: true,
        message: `Promotion "${createdPromo.title}" successfully created.`,
        data: createdPromo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/promos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create promotion.',
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
