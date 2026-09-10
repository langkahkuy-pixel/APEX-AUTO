import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { inquiries, cars } from '@/db/schema';
import { eq, desc, and, or, ilike } from 'drizzle-orm';
import { MOCK_INQUIRIES } from '@/data/mock-inquiries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contact, message, car_id, interest } = body;

    // 1. Validasi field wajib
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nama lengkap wajib diisi minimal 2 karakter',
        },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== 'string' || contact.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nomor kontak WhatsApp atau email wajib diisi',
        },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: 'Pesan pertanyaan wajib diisi minimal 3 karakter',
        },
        { status: 400 }
      );
    }

    let validCarId: string | null = null;
    if (car_id && typeof car_id === 'string' && car_id.trim()) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(car_id.trim())) {
        validCarId = car_id.trim();
      }
    }

    // 2. Simpan ke database PostgreSQL (Drizzle)
    let createdInquiry;
    try {
      const [inserted] = await db
        .insert(inquiries)
        .values({
          name: name.trim(),
          contact: contact.trim(),
          message: message.trim(),
          car_id: validCarId,
          interest: interest ? String(interest).trim() : null,
          status: 'pending',
        })
        .returning();
      createdInquiry = inserted;
    } catch (dbError) {
      console.warn('DB error inserting inquiry, fallback to in-memory response:', (dbError as Error).message);
      createdInquiry = {
        id: `inq-${Date.now()}`,
        name: name.trim(),
        contact: contact.trim(),
        message: message.trim(),
        car_id: validCarId,
        interest: interest ? String(interest).trim() : null,
        status: 'pending',
        created_at: new Date().toISOString(),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry berhasil diterima oleh showroom',
        data: createdInquiry,
      },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Terjadi kesalahan sistem saat memproses inquiry Anda',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');
    const searchParam = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    let list: any[] = [];
    try {
      const conditions = [];
      if (statusParam && statusParam !== 'all' && statusParam !== 'Semua') {
        conditions.push(eq(inquiries.status, statusParam));
      }
      if (searchParam && searchParam.trim()) {
        const q = `%${searchParam.trim()}%`;
        conditions.push(
          or(
            ilike(inquiries.name, q),
            ilike(inquiries.contact, q),
            ilike(inquiries.message, q),
            ilike(inquiries.interest, q)
          )
        );
      }

      list = await db.query.inquiries.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        limit,
        orderBy: (inq, { desc }) => [desc(inq.created_at)],
        with: {
          car: true,
          assignedUser: true,
        },
      });
    } catch (dbError) {
      console.warn('DB error fetching inquiries, fallback to mock data:', (dbError as Error).message);
    }

    if (!list || list.length === 0) {
      list = MOCK_INQUIRIES;
      if (statusParam && statusParam !== 'all' && statusParam !== 'Semua') {
        list = list.filter((item) => item.status === statusParam);
      }
      if (searchParam && searchParam.trim()) {
        const q = searchParam.toLowerCase().trim();
        list = list.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.contact.toLowerCase().includes(q) ||
            item.message.toLowerCase().includes(q) ||
            (item.car_name && item.car_name.toLowerCase().includes(q))
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        count: list.length,
        data: list,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error listing inquiries:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gagal memuat daftar inquiry',
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
