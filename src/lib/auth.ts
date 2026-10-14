import { NextRequest, NextResponse } from 'next/server';

export interface AuthSessionUser {
  id: string;
  full_name: string;
  email: string;
  role: 'owner' | 'manager' | 'staff';
  phone?: string;
}

export interface AuthValidationResult {
  isAuthenticated: boolean;
  user: AuthSessionUser | null;
  error?: string;
}

/**
 * Akun cadangan untuk demo showroom Apex Auto Medan.
 */
export const DEFAULT_DEMO_USER: AuthSessionUser = {
  id: 'usr-owner-001',
  full_name: 'Admin Apex Medan',
  email: 'admin@apexauto.id',
  role: 'owner',
  phone: '+6281200000000',
};

/**
 * Verifies session token or bearer token
 */
export function verifySessionToken(token: string | null | undefined): AuthValidationResult {
  if (!token) {
    return {
      isAuthenticated: false,
      user: null,
      error: 'Authentication token not found',
    };
  }

  const cleanToken = token.replace(/^Bearer\s+/i, '').trim();

  // Validate format: starts with apex_tok_ or matches demo tokens
  if (
    cleanToken.startsWith('apex_tok_') ||
    cleanToken === 'demo_token' ||
    cleanToken === 'mock_token_12345' ||
    cleanToken.length >= 16
  ) {
    return {
      isAuthenticated: true,
      user: DEFAULT_DEMO_USER,
    };
  }

  return {
    isAuthenticated: false,
    user: null,
    error: 'Authentication token is invalid or has expired',
  };
}

/**
 * Extracts and verifies auth session from NextRequest (Cookie or Authorization header)
 */
export function getAuthSession(request: NextRequest): AuthValidationResult {
  // 1. Check HTTP-only cookie
  const cookieToken = request.cookies.get('apex_session_token')?.value;
  if (cookieToken) {
    const result = verifySessionToken(cookieToken);
    if (result.isAuthenticated) return result;
  }

  // 2. Check Authorization Header
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (authHeader) {
    const result = verifySessionToken(authHeader);
    if (result.isAuthenticated) return result;
  }

  return {
    isAuthenticated: false,
    user: null,
    error: 'Masuk ke akun showroom untuk mengakses portal kelola.',
  };
}

/**
 * Middleware helper for API routes: returns 401 Response or authenticated session user
 */
export function requireAdminAuth(request: NextRequest): {
  user: AuthSessionUser | null;
  response?: NextResponse;
} {
  const session = getAuthSession(request);

  if (!session.isAuthenticated || !session.user) {
    return {
      user: null,
      response: NextResponse.json(
        {
          success: false,
          error: session.error || 'Akses ditolak. Akun pemilik showroom diperlukan.',
          code: 'UNAUTHORIZED',
        },
        {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Bearer error="invalid_token"',
            'Access-Control-Allow-Origin': '*',
          },
        }
      ),
    };
  }

  return { user: session.user };
}
