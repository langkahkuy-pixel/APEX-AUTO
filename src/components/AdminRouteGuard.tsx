'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Lock, ShieldAlert, KeyRound } from 'lucide-react';
import Link from 'next/link';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect unauthenticated user to login
      const timer = setTimeout(() => {
        router.push('/login?from=/admin');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-slate-400 font-medium tracking-wide">
          Memeriksa izin akses portal pemilik showroom...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Akses Terproteksi</h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Halaman panel kelola showroom ini hanya dapat diakses oleh Pemilik & Staff resmi. Anda akan dialihkan ke formulir login.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/login?from=/admin"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>Masuk Sekarang</span>
            </Link>
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white underline pt-1"
            >
              Kembali ke Beranda Showroom
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
