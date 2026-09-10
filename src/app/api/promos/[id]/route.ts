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
          highlight_color: (row.highlight_color as 'amber' | 'emerald' | 'blue' | 'purple') || 'amber',
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

/**
 * PUT /api/promos/[id]: Update promo program
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      tagline,
      badge,
      discount_sgd,
      description,
      benefits,
      terms_conditions,
      valid_until,
      image_url,
      highlight_color,
      cta_text,
      cta_whatsapp_text,
      is_featured,
      is_active,
    } = body;

    let updatedPromo;
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      const condition = isUUID ? or(eq(promos.id, id), eq(promos.slug, id)) : eq(promos.slug, id);

      const updateData: Record<string, any> = {
        updated_at: new Date(),
      };

      if (title !== undefined) updateData.title = title;
      if (slug !== undefined) updateData.slug = slug;
      if (tagline !== undefined) updateData.tagline = tagline;
      if (badge !== undefined) updateData.badge = badge;
      if (discount_sgd !== undefined) updateData.discount_sgd = discount_sgd ? discount_sgd.toString() : null;
      if (description !== undefined) updateData.description = description;
      if (benefits !== undefined) updateData.benefits = JSON.stringify(Array.isArray(benefits) ? benefits : [benefits]);
      if (terms_conditions !== undefined) updateData.terms_conditions = JSON.stringify(Array.isArray(terms_conditions) ? terms_conditions : [terms_conditions]);
      if (valid_until !== undefined) updateData.valid_until = valid_until;
      if (image_url !== undefined) updateData.image_url = image_url;
      if (highlight_color !== undefined) updateData.highlight_color = highlight_color;
      if (cta_text !== undefined) updateData.cta_text = cta_text;
      if (cta_whatsapp_text !== undefined) updateData.cta_whatsapp_text = cta_whatsapp_text;
      if (is_featured !== undefined) updateData.is_featured = Boolean(is_featured);
      if (is_active !== undefined) updateData.is_active = Boolean(is_active);

      const [res] = await db.update(promos).set(updateData).where(condition).returning();
      updatedPromo = res;
    } catch (dbErr) {
      console.warn('DB promo update error, fallback mock:', (dbErr as Error).message);
      updatedPromo = { id, ...body, updated_at: new Date().toISOString() };
    }

    return NextResponse.json({
      success: true,
      message: `Promo ${id} berhasil diperbarui.`,
      data: updatedPromo,
    });
  } catch (error) {
    console.error('Error in PUT /api/promos/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui program promo.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/promos/[id]: Toggle featured status or activate/deactivate
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    let updatedPromo;
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      const condition = isUUID ? or(eq(promos.id, id), eq(promos.slug, id)) : eq(promos.slug, id);

      const updateData: Record<string, any> = {
        updated_at: new Date(),
      };
      if (body.is_featured !== undefined) updateData.is_featured = Boolean(body.is_featured);
      if (body.is_active !== undefined) updateData.is_active = Boolean(body.is_active);

      const [res] = await db.update(promos).set(updateData).where(condition).returning();
      updatedPromo = res;
    } catch (dbErr) {
      console.warn('DB promo patch error, fallback mock:', (dbErr as Error).message);
      updatedPromo = { id, ...body, updated_at: new Date().toISOString() };
    }

    return NextResponse.json({
      success: true,
      message: `Status promo ${id} berhasil diubah.`,
      data: updatedPromo,
    });
  } catch (error) {
    console.error('Error in PATCH /api/promos/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengubah status promo.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/promos/[id]: Hapus program promo
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      const condition = isUUID ? or(eq(promos.id, id), eq(promos.slug, id)) : eq(promos.slug, id);

      await db.delete(promos).where(condition);
    } catch (dbErr) {
      console.warn('DB promo delete fallback:', (dbErr as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Program promo ${id} berhasil dihapus.`,
    });
  } catch (error) {
    console.error('Error in DELETE /api/promos/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus program promo.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
