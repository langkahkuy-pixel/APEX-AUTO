'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AdminRouteGuard from '@/components/AdminRouteGuard';
import AdminCarFormModal from '@/components/admin/AdminCarFormModal';
import AdminPromoFormModal from '@/components/admin/AdminPromoFormModal';
import AdminInquiryList from '@/components/admin/AdminInquiryList';
import QuickStatusChanger from '@/components/admin/QuickStatusChanger';
import { MOCK_CARS } from '@/data/mock-cars';
import { MOCK_PROMOS } from '@/data/mock-promos';
import { MOCK_INQUIRIES, AdminInquiry } from '@/data/mock-inquiries';
import { Car as CarType, CarStatus } from '@/types/car';
import { PromoItem } from '@/types/promo';
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
  Tag,
  MapPin,
  Phone,
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  Send,
  AlertCircle,
  FileText,
  BadgeCheck,
  Pencil,
  Check,
  Trash2,
} from 'lucide-react';

type AdminTab = 'overview' | 'inventory' | 'promos' | 'inquiries' | 'branches';

interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  carName: string;
  message: string;
  timeAgo: string;
  status: 'new' | 'contacted' | 'scheduled';
}

const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq-001',
    name: 'Kenjiro Tanaka',
    phone: '+65 9123 4567',
    email: 'kenjiro@sgmail.com',
    carName: 'Porsche 911 Carrera S (2022)',
    message: 'Saya berminat test drive di cabang Leng Kee akhir pekan ini. Apakah COE ready?',
    timeAgo: '15 menit lalu',
    status: 'new',
  },
  {
    id: 'inq-002',
    name: 'Amanda Wijaya',
    phone: '+65 8234 5678',
    email: 'amanda.w@bizsg.com',
    carName: 'Mercedes-Benz E200 Avantgarde (2023)',
    message: 'Apakah ada program DP promo 0% atau subsidi bunga loan untuk unit ini?',
    timeAgo: '1 jam lalu',
    status: 'new',
  },
  {
    id: 'inq-003',
    name: 'David Lim',
    phone: '+65 9876 5432',
    email: 'davidlim@techgroup.sg',
    carName: 'BMW M4 Competition Coupe (2022)',
    message: 'Bisa minta copy logbook inspeksi STA / Vicom grade?',
    timeAgo: '3 jam lalu',
    status: 'contacted',
  },
  {
    id: 'inq-004',
    name: 'Siti Rahma',
    phone: '+65 8765 4321',
    email: 'siti.rahma@exportcar.id',
    carName: 'Toyota Vellfire 2.5 ZG Hybrid (2023)',
    message: 'Apakah bisa dibantu ekspor dan pengurusan dokumen pengiriman ke Batam/Jakarta?',
    timeAgo: '1 hari lalu',
    status: 'scheduled',
  },
];

const SHOWROOM_BRANCHES = [
  {
    id: 'branch-1',
    name: 'Apex Auto Flagship @ Leng Kee',
    address: '24 Leng Kee Road, Singapore 159096',
    zone: 'South / Central Prime Hub',
    phone: '+65 6789 0123',
    whatsapp: '+65 8123 4567',
    hours: 'Senin - Minggu: 09:00 - 19:00 SGT',
    unitsCount: 14,
    status: 'Operasional Penuh',
  },
  {
    id: 'branch-2',
    name: 'Apex Auto Experience Centre @ Ubi',
    address: '81 Ubi Avenue 4, #01-08 UB.One, Singapore 408830',
    zone: 'East Automotive Hub',
    phone: '+65 6890 1234',
    whatsapp: '+65 8234 5678',
    hours: 'Senin - Sabtu: 09:30 - 18:30 SGT',
    unitsCount: 9,
    status: 'Operasional Penuh',
  },
  {
    id: 'branch-3',
    name: 'Apex Auto Prestige Hub @ Sin Ming',
    address: '160 Sin Ming Drive, #03-12, Singapore 575722',
    zone: 'North-Central Prestige Hub',
    phone: '+65 6901 2345',
    whatsapp: '+65 8345 6789',
    hours: 'Senin - Minggu: 10:00 - 18:00 SGT',
    unitsCount: 6,
    status: 'Operasional Penuh',
  },
];

function AdminDashboardContent() {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Navigation tab state
  const initialTab = (searchParams.get('tab') as AdminTab) || 'overview';
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Cars inventory state
  const [carsList, setCarsList] = useState<CarType[]>(MOCK_CARS);
  const [selectedCarForEdit, setSelectedCarForEdit] = useState<CarType | null>(null);
  const [formModalMode, setFormModalMode] = useState<'create' | 'edit'>('create');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Search and filters for inventory tab
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');

  // Inquiries state
  const [inquiriesList, setInquiriesList] = useState<AdminInquiry[]>(MOCK_INQUIRIES);

  // Update tab in URL query params
  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // Stats calculation
  const totalCars = carsList.length;
  const availableCars = carsList.filter((c) => c.status === 'available').length;
  const totalValuationSGD = carsList.reduce((acc, c) => acc + c.price, 0);
  const newInquiriesCount = inquiriesList.filter((i) => i.status === 'new').length;

  // Filtered inventory
  const filteredCars = carsList.filter((car) => {
    const matchSearch =
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || car.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleOpenCreateCar = () => {
    setSelectedCarForEdit(null);
    setFormModalMode('create');
    setIsFormModalOpen(true);
  };

  const handleOpenEditCar = (car: CarType) => {
    setSelectedCarForEdit(car);
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleSaveCar = (savedCar: CarType) => {
    if (formModalMode === 'create') {
      setCarsList((prev) => [savedCar, ...prev]);
      setToastNotice(`Unit baru "${savedCar.brand} ${savedCar.model}" berhasil ditambahkan ke inventaris.`);
    } else {
      setCarsList((prev) =>
        prev.map((c) => (c.id === savedCar.id ? savedCar : c))
      );
      setToastNotice(`Data unit "${savedCar.brand} ${savedCar.model}" berhasil diperbarui.`);
    }
    setTimeout(() => setToastNotice(null), 4000);
  };

  const handleQuickStatusChange = (carId: string, newStatus: CarStatus) => {
    setCarsList((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, status: newStatus } : c))
    );
    setToastNotice(`Status unit berhasil diubah menjadi ${newStatus.toUpperCase()}`);
    setTimeout(() => setToastNotice(null), 3000);
  };

  // Promos management state
  const [promosList, setPromosList] = useState<PromoItem[]>(MOCK_PROMOS);
  const [selectedPromoForEdit, setSelectedPromoForEdit] = useState<PromoItem | null>(null);
  const [promoModalMode, setPromoModalMode] = useState<'create' | 'edit'>('create');
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  const handleOpenCreatePromo = () => {
    setSelectedPromoForEdit(null);
    setPromoModalMode('create');
    setIsPromoModalOpen(true);
  };

  const handleOpenEditPromo = (promo: PromoItem) => {
    setSelectedPromoForEdit(promo);
    setPromoModalMode('edit');
    setIsPromoModalOpen(true);
  };

  const handleSavePromo = (savedPromo: PromoItem) => {
    if (promoModalMode === 'create') {
      setPromosList((prev) => [savedPromo, ...prev]);
      setToastNotice(`Program promo "${savedPromo.title}" berhasil ditambahkan.`);
    } else {
      setPromosList((prev) =>
        prev.map((p) => (p.id === savedPromo.id ? savedPromo : p))
      );
      setToastNotice(`Program promo "${savedPromo.title}" berhasil diperbarui.`);
    }
    setTimeout(() => setToastNotice(null), 4000);
  };

  const handleDeletePromo = (promoId: string) => {
    setPromosList((prev) => prev.filter((p) => p.id !== promoId));
    setToastNotice('Program promo berhasil dihapus dari sistem.');
    setTimeout(() => setToastNotice(null), 3000);
  };

  const handleInquiryStatusChange = (id: string, newStatus: AdminInquiry['status']) => {
    setInquiriesList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setToastNotice(`Status inquiry berhasil diperbarui menjadi ${newStatus.toUpperCase()}`);
    setTimeout(() => setToastNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* 1. TOP HEADER BRAND & USER STATUS */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Car className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
                  APEX AUTO{' '}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold">
                    MANAGEMENT
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Portal Kelola Showroom Singapura</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">{user?.name || 'Alvin Tan (Owner)'}</span>
              <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                {user?.role || 'owner'}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 transition-colors"
            >
              <span>Lihat Showroom</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </Link>

            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-semibold border border-rose-500/30 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION BAR KELOLA SHOWROOM */}
      <nav className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-2 sticky top-[57px] z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => handleTabChange('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Ringkasan Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('inventory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Kelola Mobil & COE</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'inventory' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {totalCars}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('promos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'promos'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Promo & Diskon</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'promos' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {MOCK_PROMOS.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pesan & Inquiry</span>
            {newInquiriesCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'inquiries'
                    ? 'bg-rose-950 text-rose-300'
                    : 'bg-rose-500 text-white animate-pulse'
                }`}
              >
                {newInquiriesCount} baru
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('branches')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'branches'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Cabang Showroom</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'branches' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              3 Hub
            </span>
          </button>
        </div>
      </nav>

      {/* 3. MAIN TAB CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="max-w-2xl space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ikhtisar Bisnis & Operasional Showroom</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Panel Kelola Showroom Apex Auto SG
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Selamat datang, <strong className="text-white">{user?.name || 'Owner'}</strong>. Seluruh data unit Singapura, masa berlaku COE, status lelang, dan inquiry calon pembeli disinkronkan secara aman.
                </p>
              </div>
            </div>

            {/* 4 Metric Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium">Total Unit Inventaris</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalCars} Unit</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> {availableCars} unit siap inspeksi & serah terima
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 hover:border-amber-500/40 transition-colors">
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

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium">Inquiry Calon Pembeli</span>
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{inquiriesList.length} Pesan</div>
                <div className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" /> {newInquiriesCount} pesan perlu dihubungi
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium">Cabang Showroom Aktif</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">3 Hub</div>
                <div className="text-[11px] text-slate-400">Leng Kee, Ubi, Sin Ming</div>
              </div>
            </div>

            {/* Quick Actions & Recent Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Inquiry Masuk Terbaru
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleTabChange('inquiries')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    Lihat Semua ({inquiriesList.length}) →
                  </button>
                </div>
                <div className="space-y-3">
                  {inquiriesList.slice(0, 3).map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{inq.customerName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                              inq.status === 'new'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-amber-400/90 font-medium">{inq.carName}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{inq.message}</p>
                      </div>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(inq.customerName)},%20kami%20dari%20Apex%20Auto%20Singapore%20menindaklanjuti%20inquiry%20unit%20${encodeURIComponent(inq.carName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleInquiryStatusChange(inq.id, 'contacted')}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors whitespace-nowrap"
                      >
                        <Send className="w-3 h-3" />
                        <span>Balas WhatsApp</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showroom Status Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Status Keamanan & Sistem
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Seluruh koneksi database dan sinkronisasi katalog berjalan stabil.
                  </p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Database PostgreSQL:</span>
                    <span className="text-emerald-400 font-bold">Terhubung & Siap</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Sertifikasi Inspeksi STA:</span>
                    <span className="text-white font-medium">100% Lolos Grade A</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Masa Garansi Transmisi:</span>
                    <span className="text-amber-400 font-medium">12 Bulan Apex Care</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Mata Uang Transaksi:</span>
                    <span className="text-white font-mono font-bold">Singapore Dollar (SGD)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTabChange('inventory')}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
                >
                  <Car className="w-4 h-4" />
                  <span>Kelola Inventaris Mobil</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INVENTORY */}
        {/* ========================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">Inventaris Unit Showroom Singapura</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola {totalCars} unit mobil aktif, sertifikasi COE, dan penyesuaian harga.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari merk, model, lokasi..."
                    className="pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors w-56 sm:w-64"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="all">Semua Status</option>
                  <option value="available">Tersedia (Ready)</option>
                  <option value="reserved">Dipesan (Reserved)</option>
                  <option value="sold">Terjual (Sold)</option>
                </select>

                <button
                  type="button"
                  onClick={handleOpenCreateCar}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Unit Mobil</span>
                </button>
              </div>
            </div>

            {/* Toast notice banner */}
            {toastNotice && (
              <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 text-emerald-400 text-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold">{toastNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setToastNotice(null)}
                  className="text-emerald-400/80 hover:text-emerald-300 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Inventory Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Unit Mobil</th>
                      <th className="py-3.5 px-4 font-semibold">Tahun / CC</th>
                      <th className="py-3.5 px-4 font-semibold">Harga (SGD)</th>
                      <th className="py-3.5 px-4 font-semibold">Masa Berlaku COE</th>
                      <th className="py-3.5 px-4 font-semibold">Hub Lokasi</th>
                      <th className="py-3.5 px-4 font-semibold">Status Ketersediaan</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Aksi Kelola</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-medium">
                    {filteredCars.length > 0 ? (
                      filteredCars.map((car) => (
                        <tr key={car.id} className="hover:bg-slate-850/50 transition-colors">
                          <td className="py-3.5 px-4 text-white font-bold">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-8 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                                <img
                                  src={car.images[0]?.url || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=300'}
                                  alt={car.model}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div>
                                  {car.brand} {car.model}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono font-normal">
                                  ID: {car.id} • {car.body_type}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-white font-semibold">{car.year}</div>
                            <div className="text-[10px] text-slate-400">
                              {car.engine_capacity_cc ? `${car.engine_capacity_cc} cc` : car.fuel_type}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-amber-400 font-bold">
                            <div>S${car.price.toLocaleString('en-US')}</div>
                            {car.depreciation_sgd && (
                              <div className="text-[10px] text-slate-400 font-normal">
                                Depr: S${car.depreciation_sgd.toLocaleString('en-US')}/thn
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            <div className="inline-flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                              <BadgeCheck className="w-3 h-3 text-amber-400" />
                              <span>{car.coe_expiry || '10 Tahun COE'}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">{car.location}</td>
                          <td className="py-3.5 px-4">
                            <QuickStatusChanger
                              carId={car.id}
                              currentStatus={car.status}
                              carName={`${car.brand} ${car.model}`}
                              onStatusChange={handleQuickStatusChange}
                            />
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditCar(car)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition-colors cursor-pointer"
                                title="Edit data unit mobil"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href={`/mobil/${car.id}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                              >
                                <span>Detail</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500 text-xs">
                          Tidak ada unit mobil yang sesuai dengan kata kunci pencarian.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PROMOS */}
        {/* ========================================================= */}
        {activeTab === 'promos' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">Program Promo & Voucher Showroom</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Kelola banner promosi aktif yang tampil di beranda dan syarat & ketentuan pembeli.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenCreatePromo}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Promo Baru</span>
                </button>
                <Link
                  href="/#promo-section"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat di Beranda</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promosList.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase font-mono">
                        {promo.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        s/d {promo.valid_until}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{promo.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{promo.description}</p>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Benefit Termasuk:
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {promo.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Status: Aktif
                      </span>
                      {promo.discount_sgd && promo.discount_sgd > 0 && (
                        <span className="text-amber-400 font-bold font-mono">
                          Hemat S${promo.discount_sgd.toLocaleString('en-US')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditPromo(promo)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-400 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Ubah</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePromo(promo.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1 border border-rose-500/30 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: INQUIRIES */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="animate-in fade-in">
            <AdminInquiryList
              inquiries={inquiriesList}
              onStatusChange={handleInquiryStatusChange}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: BRANCHES & SHOWROOM INFO */}
        {/* ========================================================= */}
        {activeTab === 'branches' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Hub Showroom Singapura & PIC Sales</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Daftar cabang operasional resmi Apex Auto Singapore untuk inspeksi dan serah terima kendaraan.
                </p>
              </div>
              <div className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Semua Cabang Aktif</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SHOWROOM_BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-semibold">
                        {branch.zone}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{branch.name}</h3>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 pt-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span>{branch.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Unit Terpajang:</span>
                      <span className="text-white font-bold">{branch.unitsCount} Mobil</span>
                    </div>
                    <a
                      href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20PIC%20Sales%20${encodeURIComponent(branch.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Hubungi PIC Cabang</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Car Create & Edit Form Modal Dialog */}
      <AdminCarFormModal
        isOpen={isFormModalOpen}
        mode={formModalMode}
        initialCar={selectedCarForEdit}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveCar}
      />

      {/* Promo Create & Edit Form Modal Dialog */}
      <AdminPromoFormModal
        isOpen={isPromoModalOpen}
        mode={promoModalMode}
        initialPromo={selectedPromoForEdit}
        onClose={() => setIsPromoModalOpen(false)}
        onSave={handleSavePromo}
      />

      {/* Confirmation Modal for Logout */}
      {showLogoutConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-white">Keluar dari Portal?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sesi autentikasi Anda saat ini akan diakhiri dan Anda akan dikembalikan ke halaman login.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/30 transition-all cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminRouteGuard>
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-xs">
            Memuat Panel Manajemen Showroom...
          </div>
        }
      >
        <AdminDashboardContent />
      </Suspense>
    </AdminRouteGuard>
  );
}
