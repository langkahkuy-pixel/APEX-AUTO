import { NextRequest, NextResponse } from 'next/server';
import { getSqliteInquiries, createSqliteInquiry } from '@/db/sqlite';
import { MOCK_INQUIRIES } from '@/data/mock-inquiries';

/**
 * GET /api/inquiries: Ambil daftar seluruh inquiries / leads untuk dashboard CMS admin
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');
    const searchParam = searchParams.get('search');

    let inquiriesList;
    try {
      inquiriesList = await getSqliteInquiries();
    } catch (err) {
      console.warn('SQLite fetch inquiries fallback:', err);
      inquiriesList = MOCK_INQUIRIES;
    }

    if (statusParam && statusParam !== 'all') {
      inquiriesList = inquiriesList.filter((i) => i.status === statusParam);
    }

    if (searchParam && searchParam.trim()) {
      const term = searchParam.toLowerCase().trim();
      inquiriesList = inquiriesList.filter(
        (i) =>
          i.customerName.toLowerCase().includes(term) ||
          i.phone.toLowerCase().includes(term) ||
          i.email.toLowerCase().includes(term) ||
          i.carName.toLowerCase().includes(term) ||
          i.message.toLowerCase().includes(term)
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiriesList,
      total: inquiriesList.length,
      unreadCount: inquiriesList.filter((i) => i.status === 'new').length,
    });
  } catch (error) {
    console.error('Error in GET /api/inquiries:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memuat pertanyaan pelanggan.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/inquiries: Terima formulir pesan / leads dari pengunjung website
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      contact,
      email,
      message,
      car_id,
      car_name,
      car_price_idr,
      interest,
      trade_in_car,
      loan_type,
      preferred_contact,
      branch,
    } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Masukkan nama lengkap, minimal 2 karakter.",
        },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== 'string' || contact.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Masukkan nomor WhatsApp atau email yang valid.",
        },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: "Pesan wajib diisi, minimal 3 karakter.",
        },
        { status: 400 }
      );
    }

    const createdInquiry = await createSqliteInquiry({
      name: name.trim(),
      contact: contact.trim(),
      email: email ? email.trim() : (contact.includes('@') ? contact.trim() : ''),
      car_id: car_id || undefined,
      car_name: car_name || interest || "Pertanyaan Showroom",
      car_price_idr: car_price_idr ? Number(car_price_idr) : undefined,
      message: message.trim(),
      interest: interest || car_name || undefined,
      trade_in_car: trade_in_car || undefined,
      loan_type: loan_type || 'bank_loan',
      preferred_contact: preferred_contact || 'whatsapp',
      branch: branch || "Apex Auto Medan",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pertanyaan Anda berhasil dikirim ke tim penjualan Apex Auto.",
        data: createdInquiry,
        referenceId: createdInquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/inquiries:', error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengirim pertanyaan.",
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
