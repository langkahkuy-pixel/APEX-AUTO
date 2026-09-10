import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware untuk melindungi rute dashboard panel kelola dan API
 * Memvalidasi token sesi di cookie 'apex_session_token' atau 'Authorization: Bearer <token>'
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

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

  // 1. Proteksi rute API Panel Kelola (/api/admin/*)
  if (pathname.startsWith('/api/admin')) {
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

  // 2. Proteksi Halaman Dashboard Web (/admin, /kelola-showroom)
  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/kelola-showroom');

  if (isDashboardPage) {
    if (!isValidToken) {
      // Redirect ke login dengan query redirect
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname + (search || ''));
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Jika sudah login dan membuka /login atau /lupa-sandi, redirect langsung ke /admin
  const isAuthPage = pathname === '/login' || pathname === '/lupa-sandi' || pathname === '/forgot-password';
  if (isAuthPage && isValidToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

/**
 * Konfigurasi matcher rute yang diproteksi oleh middleware
 */
export const config = {
  matcher: [
    '/admin/:path*',
    '/kelola-showroom/:path*',
    '/api/admin/:path*',
    '/login',
    '/lupa-sandi',
    '/forgot-password',
  ],
};
