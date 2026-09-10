import { NextRequest, NextResponse } from 'next/server';
import { getSqliteInquiries, updateSqliteInquiryStatus, deleteSqliteInquiry } from '@/db/sqlite';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const inquiries = await getSqliteInquiries();
    const found = inquiries.find((i) => i.id === id);

    if (!found) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: found,
    });
  } catch (error) {
    console.error('Error in GET /api/inquiries/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve inquiry.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required.' },
        { status: 400 }
      );
    }

    const success = await updateSqliteInquiryStatus(id, status, notes);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry status updated to ${status}.`,
    });
  } catch (error) {
    console.error('Error in PATCH /api/inquiries/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry status.' },
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
    const success = await deleteSqliteInquiry(id);

    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} deleted.`,
      deleted: success,
    });
  } catch (error) {
    console.error('Error in DELETE /api/inquiries/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
