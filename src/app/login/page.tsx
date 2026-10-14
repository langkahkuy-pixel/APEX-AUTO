'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Car,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  UserCheck,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [logoutNotice, setLogoutNotice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('logout') === 'success') {
        setLogoutNotice(true);
      }
    }
  }, []);

  // Mock accounts database
  const DEMO_OWNER = {
    email: 'admin@apexauto.id',
    password: 'password123',
    name: 'Admin Apex Medan',
    role: 'owner',
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
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsLoading(false);
        setError(data.error || "Email atau kata sandi tidak sesuai. Periksa kembali data Anda.");
        return;
      }

      if (typeof window !== 'undefined') {
        const sessionData = {
          user: data.user,
          token: data.token,
          loggedInAt: new Date().toISOString(),
          expiresAt: data.expiresAt,
        };
        localStorage.setItem('apex_auth_session', JSON.stringify(sessionData));
        document.cookie = `apex_session_token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
      }

      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } catch (err) {
      setIsLoading(false);
      setError("Koneksi bermasalah. Silakan coba lagi.");
    }
  };

  const fillDemoAccount = () => {
    setEmail(DEMO_OWNER.email);
    setPassword(DEMO_OWNER.password);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800"
        >
          <span>← Kembali ke Showroom</span>
        </Link>
      </div>

      <div className="max-w-md w-full relative z-10 my-auto py-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="font-extrabold tracking-wider text-xl text-white flex items-center gap-1.5">
                APEX AUTO <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold">ID</span>
              </div>
              <div className="text-[10px] text-slate-400 tracking-widest uppercase">
                Portal Kelola Pemilik
              </div>
            </div>
          </Link>

          <h1 className="text-2xl font-bold text-white tracking-tight">
            Masuk ke Portal Showroom
          </h1>
          <p className="text-xs text-slate-400 mt-1.5">
            Akses untuk pemilik dan staf Apex Auto
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {success ? (
            <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Berhasil Masuk!</h3>
              <p className="text-xs text-slate-300">
                Selamat datang, <strong className="text-white">{DEMO_OWNER.name}</strong>. Membuka panel Anda...
              </p>
              <div className="pt-2">
                <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Logout Success Banner */}
              {logoutNotice && (
                <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-xl p-3.5 flex items-start gap-2.5 text-emerald-300 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs">Anda telah keluar dari sesi kelola showroom.</p>
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <div className="bg-rose-500/15 border border-rose-500/40 rounded-xl p-3.5 flex items-start gap-2.5 text-rose-300 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs">{error}</p>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Akun Showroom
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="name@apexautosg.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Kata Sandi
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Memeriksa Akses...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Masuk ke Akun Showroom</span>
                  </>
                )}
              </button>

              {/* Demo Quick Login Box */}
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                      Akun Demo Showroom:
                    </span>
                    <button
                      type="button"
                      onClick={fillDemoAccount}
                      className="text-amber-400 hover:text-amber-300 text-[10px] font-bold underline cursor-pointer"
                    >
                      Isi Otomatis
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
                    <div>Email: <span className="text-slate-200">admin@apexauto.id</span></div>
                    <div>Kata Sandi: <span className="text-slate-200">password123</span></div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Security footnote */}
          <div className="pt-2 border-t border-slate-800 text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Verifikasi Akun Showroom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
