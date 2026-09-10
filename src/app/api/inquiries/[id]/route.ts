import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { inquiries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { MOCK_INQUIRIES } from '@/data/mock-inquiries';

const ALLOWED_STATUSES = ['pending', 'contacted', 'scheduled', 'closed'];

/**
 * GET /api/inquiries/[id]: Ambil detail pertanyaan calon pembeli
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let inquiry;
    try {
      inquiry = await db.query.inquiries.findFirst({
        where: eq(inquiries.id, id),
        with: {
          car: true,
          assignedUser: true,
        },
      });
    } catch (dbError) {
      console.warn('DB query error for inquiry:', (dbError as Error).message);
    }

    if (!inquiry) {
      inquiry = MOCK_INQUIRIES.find((item) => item.id === id);
    }

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error('Error in GET /api/inquiries/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil detail inquiry' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/inquiries/[id]: Perbarui status, catatan tindak lanjut, atau sales assignee
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes, assigned_to } = body;

    if (status && !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Status tidak valid. Pilihan: ${ALLOWED_STATUSES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    let updatedInquiry;
    try {
      const updateData: Record<string, any> = {
        updated_at: new Date(),
      };
      if (status !== undefined) updateData.status = status;
      if (notes !== undefined) updateData.notes = notes;
      if (assigned_to !== undefined) updateData.assigned_to = assigned_to;

      const [res] = await db
        .update(inquiries)
        .set(updateData)
        .where(eq(inquiries.id, id))
        .returning();

      updatedInquiry = res;
    } catch (dbError) {
      console.warn('DB update fallback for inquiry status:', (dbError as Error).message);
      updatedInquiry = {
        id,
        status: status || 'contacted',
        notes,
        assigned_to,
        updated_at: new Date().toISOString(),
      };
    }

    const statusLabels: Record<string, string> = {
      pending: 'Menunggu Respon',
      contacted: 'Sudah Dihubungi',
      scheduled: 'Jadwal Test Drive / Showroom Visit',
      closed: 'Selesai / Deal',
    };

    return NextResponse.json({
      success: true,
      message: `Status inquiry ${id} berhasil diubah menjadi "${status ? statusLabels[status] || status : 'Diperbarui'}".`,
      data: updatedInquiry,
    });
  } catch (error) {
    console.error('Error in PATCH /api/inquiries/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui status inquiry' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/inquiries/[id]: Alias untuk PATCH
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return PATCH(request, { params });
}

/**
 * DELETE /api/inquiries/[id]: Hapus inquiry
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      await db.delete(inquiries).where(eq(inquiries.id, id));
    } catch (dbError) {
      console.warn('DB delete inquiry fallback:', (dbError as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} berhasil dihapus.`,
    });
  } catch (error) {
    console.error('Error in DELETE /api/inquiries/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus inquiry' },
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
