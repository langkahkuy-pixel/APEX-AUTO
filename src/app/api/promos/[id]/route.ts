import { NextRequest, NextResponse } from 'next/server';
import { getSqlitePromos, updateSqlitePromo, deleteSqlitePromo } from '@/db/sqlite';
import { MOCK_PROMOS } from '@/data/mock-promos';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const promos = await getSqlitePromos();
    const promo = promos.find((p) => p.id === id || p.slug === id) || MOCK_PROMOS.find((p) => p.id === id || p.slug === id);

    if (!promo) {
      return NextResponse.json(
        {
          success: false,
          error: "Promo tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: promo,
    });
  } catch (error) {
    console.error('Error in GET /api/promos/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memuat detail promo.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateSqlitePromo(id, body);
    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: `Promo dengan kode ${id} tidak ditemukan.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Promo "${updated.title}" berhasil diperbarui.`,
      data: updated,
    });
  } catch (error) {
    console.error('Error in PUT /api/promos/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memperbarui promo.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteSqlitePromo(id);

    return NextResponse.json({
      success: true,
      message: `Promo ${id} berhasil dihapus.`,
      deleted: success,
    });
  } catch (error) {
    console.error('Error in DELETE /api/promos/[id]:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menghapus promo.",
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
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
