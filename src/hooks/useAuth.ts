'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  loggedInAt: string;
}

export function useAuth() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('apex_auth_session');
      if (stored) {
        const parsed = JSON.parse(stored) as AuthSession;
        setSession(parsed);
      } else {
        setSession(null);
      }
    } catch (e) {
      console.warn('Failed to parse auth session:', e);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout API notification error:', e);
    }
    localStorage.removeItem('apex_auth_session');
    setSession(null);
    router.push('/login?logout=success');
  };

  return {
    user: session?.user || null,
    session,
    isAuthenticated: Boolean(session),
    isLoading,
    logout,
  };
}
