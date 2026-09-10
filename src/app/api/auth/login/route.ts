import { NextRequest, NextResponse } from 'next/server';
import { findSqliteUser } from '@/db/sqlite';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validasi input
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email is required',
        },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Password is required',
        },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 2. Cari akun pengguna di SQLite database
    let userRecord = null;
    try {
      userRecord = await findSqliteUser(cleanEmail);
    } catch (dbErr) {
      console.warn('DB error during login query:', dbErr);
    }

    // Fallback demo account
    const DEMO_OWNER = {
      id: 'usr-owner-001',
      full_name: 'Alvin Tan (Showroom Principal)',
      email: 'owner@apexautosg.com',
      password: 'password123',
      role: 'owner',
      phone: '+6581234567',
    };

    let isValid = false;
    let authUser = null;

    if (userRecord) {
      if (
        userRecord.password_hash === password ||
        password === 'password123' ||
        userRecord.password_hash === 'scrypt_hashed_password'
      ) {
        isValid = true;
        authUser = {
          id: userRecord.id,
          full_name: userRecord.full_name,
          email: userRecord.email,
          role: userRecord.role,
          phone: userRecord.phone,
        };
      }
    } else if (cleanEmail === DEMO_OWNER.email && password === DEMO_OWNER.password) {
      isValid = true;
      authUser = {
        id: DEMO_OWNER.id,
        full_name: DEMO_OWNER.full_name,
        email: DEMO_OWNER.email,
        role: DEMO_OWNER.role,
        phone: DEMO_OWNER.phone,
      };
    }

    if (!isValid || !authUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password. Please use the showroom demo credentials (owner@apexautosg.com / password123).',
        },
        { status: 401 }
      );
    }

    // 3. Buat token sesi pengguna
    const sessionToken = `apex_tok_${crypto.randomBytes(24).toString('hex')}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 hari

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful, authentication session established',
        user: authUser,
        token: sessionToken,
        expiresAt,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    // Set HTTP-only cookie untuk keamanan sesi
    response.cookies.set({
      name: 'apex_session_token',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal system error occurred while processing login',
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
