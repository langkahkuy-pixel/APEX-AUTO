import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    {
      success: true,
      message: 'Sesi autentikasi berhasil diakhiri (logout)',
    },
    { status: 200 }
  );

  // Hapus cookie sesi
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
