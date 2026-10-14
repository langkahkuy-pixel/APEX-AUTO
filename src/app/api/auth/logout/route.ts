import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    {
      success: true,
      message: "Sesi pemilik showroom telah berakhir.",
      loggedOutAt: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  // Bersihkan cookie sesi autentikasi
  response.cookies.set({
    name: 'apex_session_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

export async function GET(request: NextRequest) {
  // Dukung GET request untuk redirect logout langsung
  const redirectUrl = new URL('/login?logout=success', request.url);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set({
    name: 'apex_session_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
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
