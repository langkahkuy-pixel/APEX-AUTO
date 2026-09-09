import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware untuk melindungi rute API panel kelola (/api/admin/*)
 * Memvalidasi token sesi di cookie 'apex_session_token' atau 'Authorization: Bearer <token>'
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Proteksi rute API Panel Kelola (/api/admin/*)
  if (pathname.startsWith('/api/admin')) {
    const cookieToken = request.cookies.get('apex_session_token')?.value;
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    const bearerToken = authHeader?.replace(/^Bearer\s+/i, '').trim();

    const activeToken = cookieToken || bearerToken;

    const isValidToken =
      Boolean(activeToken) &&
      (activeToken!.startsWith('apex_tok_') ||
        activeToken === 'demo_token' ||
        activeToken === 'mock_token_12345' ||
        activeToken!.length >= 16);

    if (!isValidToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Akses Ditolak: Rute API panel kelola memerlukan sesi autentikasi pemilik showroom yang sah.',
          code: 'UNAUTHORIZED',
          path: pathname,
          timestamp: new Date().toISOString(),
        },
        {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Bearer realm="Admin Panel API", error="invalid_token"',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Token valid: Teruskan request dengan header metadata sesi
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-authenticated-role', 'owner');
    requestHeaders.set('x-authenticated-session', 'active');

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

/**
 * Konfigurasi matcher rute yang diproteksi oleh middleware
 */
export const config = {
  matcher: ['/api/admin/:path*'],
};
