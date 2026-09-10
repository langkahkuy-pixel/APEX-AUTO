'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Sparkles,
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
    email: 'owner@apexautosg.com',
    password: 'password123',
    role: 'Showroom Principal / Owner',
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
      setError('Please enter your showroom account email.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
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
        setError(data.error || 'Invalid credentials. Please verify your email and password.');
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
      setError('Network or server connection issue. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/20 blur-[140px] rounded-full" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Logo */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-950 font-bold text-base shadow-lg shadow-amber-500/20">
              A
            </div>
            <span className="font-semibold text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Apex Auto
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full ml-1">
              CMS
            </span>
          </Link>
        </div>

        <h1 className="mt-8 text-center text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Showroom Management Portal
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Sign in to manage vehicle inventory, promotions, and inquiries
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          {/* Demo Account Quick-Fill Card */}
          <div className="mb-6 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-start justify-between gap-3">
            <div className="text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Principal Credentials</span>
              </div>
              <p className="text-zinc-400 mt-1 font-mono text-[11px]">
                owner@apexautosg.com • password123
              </p>
            </div>
            <button
              type="button"
              onClick={fillDemoAccount}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors whitespace-nowrap"
            >
              Fill Credentials
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/40 bg-red-500/10 flex items-start gap-3 text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center gap-3 text-emerald-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Authentication approved. Entering CMS dashboard...</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"
              >
                Showroom Email
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@apexautosg.com"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-950/80 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-10 py-2.5 text-sm bg-zinc-950/80 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authenticated</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In to CMS Portal</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors inline-flex items-center gap-1"
            >
              ← Back to Apex Auto public website
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-zinc-400">
          <p>Protected by Apex Auto Enterprise Session Authentication</p>
          <p className="mt-1">Singapore Showroom Operating System • Confidential & Monolithic</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
