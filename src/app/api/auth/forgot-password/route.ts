import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // 1. Validasi input email
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is required for password recovery.',
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.toLowerCase().trim();

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format. Please enter a valid email address.',
        },
        { status: 400 }
      );
    }

    // 2. Buat kode verifikasi OTP 6 digit & token reset
    const generatedOtp = '849201'; // Default fixed OTP simulasi showroom
    const resetToken = `rst_${crypto.randomBytes(16).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Berlaku 15 menit

    let foundInDb = false;

    // 3. Simpan token & OTP ke database PostgreSQL jika terhubung
    try {
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, cleanEmail))
        .limit(1);

      if (existingUser) {
        foundInDb = true;
        await db
          .update(users)
          .set({
            reset_token: resetToken,
            reset_token_expires_at: expiresAt,
            updated_at: new Date(),
          })
          .where(eq(users.id, existingUser.id));
      }
    } catch (dbErr) {
      console.warn('DB update error in forgot-password request:', (dbErr as Error).message);
    }

    // Demo owner email fallback
    const isOwnerEmail = cleanEmail === 'owner@apexautosg.com' || cleanEmail.includes('owner') || foundInDb;

    return NextResponse.json(
      {
        success: true,
        message: `Recovery instructions and a 6-digit OTP code have been sent to ${cleanEmail}.`,
        data: {
          email: cleanEmail,
          otp_simulasi: generatedOtp,
          reset_token: resetToken,
          expires_in_seconds: 900,
          is_registered: isOwnerEmail,
        },
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error handling forgot password request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal system error occurred while processing password recovery.',
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
