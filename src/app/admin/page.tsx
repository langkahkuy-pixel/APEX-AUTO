'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { MOCK_CARS } from '@/data/mock-cars';
import {
  Car,
  Users,
  MessageSquare,
  TrendingUp,
  LogOut,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [inquiryCount, setInquiryCount] = useState(12);

  // Stats calculation
  const totalCars = MOCK_CARS.length;
  const availableCars = MOCK_CARS.filter((c) => c.status === 'available').length;
  const totalValuationSGD = MOCK_CARS.reduce((acc, c) => acc + c.price, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Car className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
                  APEX AUTO <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">PORTAL</span>
                </div>
                <div className="text-[10px] text-slate-400">Dashboard Pemilik Showroom</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">{user?.name || 'Showroom Principal'}</span>
              <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">
                {user?.role || 'owner'}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ringkasan Bisnis & Inventaris Showroom Singapura</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat Datang di Panel Manajemen, {user?.name || 'Owner'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pantau seluruh unit mobil premium yang aktif, status lelang/sertifikasi COE, dan inquiry pertanyaan pembeli yang masuk secara real-time.
            </p>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Total Unit Inventaris</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalCars} Unit</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" /> {availableCars} unit siap jual (ready stock)
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Total Valuasi Showroom</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              S${(totalValuationSGD / 1000000).toFixed(2)} Juta
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              SGD Nett di 3 Hub Singapura
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Inquiry Calon Pembeli</span>
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{inquiryCount} Pesan</div>
            <div className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3" /> 4 inquiry baru hari ini
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-medium">Cabang Showroom Aktif</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">3 Cabang</div>
            <div className="text-[11px] text-slate-400">Leng Kee, Ubi, Sin Ming Hub</div>
          </div>
        </div>

        {/* Inventory Overview Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Inventaris Unit Showroom</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Daftar mobil yang terdaftar di katalog publik Apex Auto Singapore
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Kelola di Katalog</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Unit Mobil</th>
                  <th className="py-3 px-4 font-semibold">Tahun</th>
                  <th className="py-3 px-4 font-semibold">Harga (SGD)</th>
                  <th className="py-3 px-4 font-semibold">Masa Berlaku COE</th>
                  <th className="py-3 px-4 font-semibold">Lokasi Showroom</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {MOCK_CARS.map((car) => (
                  <tr key={car.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4 text-white font-bold">
                      <div>{car.brand} {car.model}</div>
                      <div className="text-[10px] text-slate-500 font-mono font-normal">ID: {car.id}</div>
                    </td>
                    <td className="py-3.5 px-4">{car.year}</td>
                    <td className="py-3.5 px-4 text-amber-400 font-bold">
                      S${car.price.toLocaleString('en-US')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {car.coe_expiry || '10 Tahun COE'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{car.location}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        car.status === 'available'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : car.status === 'reserved'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {car.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/mobil/${car.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium underline"
                      >
                        <span>Pratinjau</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
