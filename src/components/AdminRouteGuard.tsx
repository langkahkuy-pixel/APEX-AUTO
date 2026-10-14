'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Lock, KeyRound } from 'lucide-react';
import Link from 'next/link';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect unauthenticated user to /admin/login
      const timer = setTimeout(() => {
        router.push('/admin/login?from=/admin');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-zinc-900">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-zinc-500 font-medium tracking-wide">
          Memeriksa akses portal showroom...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-zinc-900">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center mx-auto shadow-none">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Akses Terbatas</h2>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
              Portal showroom hanya untuk pemilik dan staf yang berwenang. Mengarahkan ke halaman masuk...
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/admin/login?from=/admin"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold text-xs flex items-center justify-center gap-2 shadow-none  transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>Masuk ke Portal Admin</span>
            </Link>
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-900 underline pt-1"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AdminRouteGuard;
