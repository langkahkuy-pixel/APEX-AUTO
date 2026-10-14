'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Car,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const DEMO_CREDENTIALS = {
    email: 'admin@apexauto.id',
    password: 'password123',
    role: 'Pemilik Showroom',
  };

  const fillDemoAccount = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Masukkan email akun showroom.");
      return;
    }

    if (!password) {
      setError("Masukkan kata sandi Anda.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Email atau kata sandi tidak sesuai. Periksa kembali data Anda.");
        setIsLoading(false);
        return;
      }

      // Save user session in localStorage for client-side state
      if (typeof window !== 'undefined') {
        const sessionData = {
          user: data.user,
          token: data.token,
          loggedInAt: new Date().toISOString(),
          expiresAt: data.expiresAt,
        };
        localStorage.setItem('apex_auth_session', JSON.stringify(sessionData));
        // Fallback manual cookie sync in case browser blocked server cookie
        document.cookie = `apex_session_token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(redirectPath);
      }, 500);
    } catch (err) {
      console.error('Login error:', err);
      setError("Koneksi ke server bermasalah. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-[#f8f9fb] px-5 py-12 text-zinc-900">
      <div className="w-full max-w-[420px]">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-900 text-amber-400"><Car className="h-5 w-5" /></span><span className="text-sm font-extrabold tracking-wide">APEX AUTO<span className="ml-2 rounded bg-zinc-200/60 px-1.5 py-1 text-[9px] font-medium text-zinc-500">CMS</span></span></Link>
        <section className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Masuk ke ruang kerja</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-500">Kelola koleksi mobil dan pelanggan Apex Auto Medan.</p>
          <div className="mt-7 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold text-amber-900">Akun Admin Demo</p><button type="button" onClick={fillDemoAccount} className="text-xs font-semibold text-amber-800 underline underline-offset-2">Isi Akun Demo</button></div><p className="mt-2 break-words text-[11px] text-amber-800">admin@apexauto.id · password123</p></div>
          {error && <div role="alert" className="mt-5 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}
          {success && <p role="status" className="mt-5 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700">Akses disetujui. Membuka panel admin...</p>}
          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div><label htmlFor="email" className="mb-2 block text-xs font-medium text-zinc-600">Email Showroom</label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" /><input id="email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="admin@apexauto.id" autoComplete="email" required className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-3 text-sm outline-none placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100" /></div></div>
            <div><div className="mb-2 flex items-center justify-between"><label htmlFor="password" className="text-xs font-medium text-zinc-600">Kata Sandi</label><Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-900">Lupa kata sandi?</Link></div><div className="relative"><Lock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" /><input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} placeholder="Masukkan kata sandi" autoComplete="current-password" required className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-10 text-sm outline-none placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100" /><button type="button" aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-700">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
            <button type="submit" disabled={isLoading || success} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:cursor-wait disabled:opacity-50">{isLoading ? 'Memeriksa Sesi...' : success ? 'Akses Disetujui' : 'Masuk ke Panel Admin'}<ArrowRight className="h-4 w-4" /></button>
          </form>
        </section>
        <div className="mt-6 text-center"><Link href="/" className="text-xs text-zinc-500 hover:text-zinc-900">Kembali ke Situs Apex Auto</Link><p className="mt-4 text-[11px] text-zinc-400">Portal internal pemilik dan staf showroom</p></div>
      </div>
    </main>
  );
}
export default function AdminLoginPage() {
  return <Suspense fallback={<div className="grid min-h-[100dvh] place-items-center bg-white text-sm text-zinc-500">Memuat halaman masuk...</div>}><AdminLoginForm /></Suspense>;
}
