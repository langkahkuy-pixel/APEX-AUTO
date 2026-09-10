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
  RotateCw,
} from 'lucide-react';

type AdminTab = 'overview' | 'inventory' | 'promos' | 'inquiries' | 'branches';

const SHOWROOM_BRANCHES = [
  {
    id: 'branch-1',
    name: 'Apex Auto Flagship @ Leng Kee',
    address: '24 Leng Kee Road, Singapore 159096',
    zone: 'South / Central Prime Hub',
    phone: '+65 6789 0123',
    whatsapp: '+65 8123 4567',
    hours: 'Mon - Sun: 09:00 - 19:00 SGT',
    unitsCount: 14,
    status: 'Fully Operational',
  },
  {
    id: 'branch-2',
    name: 'Apex Auto Experience Centre @ Ubi',
    address: '81 Ubi Avenue 4, #01-08 UB.One, Singapore 408830',
    zone: 'East Automotive Hub',
    phone: '+65 6890 1234',
    whatsapp: '+65 8234 5678',
    hours: 'Mon - Sat: 09:30 - 18:30 SGT',
    unitsCount: 9,
    status: 'Fully Operational',
  },
  {
    id: 'branch-3',
    name: 'Apex Auto Prestige Hub @ Sin Ming',
    address: '160 Sin Ming Drive, #03-12, Singapore 575722',
    zone: 'North-Central Prestige Hub',
    phone: '+65 6901 2345',
    whatsapp: '+65 8345 6789',
    hours: 'Mon - Sun: 10:00 - 18:00 SGT',
    unitsCount: 6,
    status: 'Fully Operational',
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
  const [isLoadingCars, setIsLoadingCars] = useState(true);
  const [selectedCarForEdit, setSelectedCarForEdit] = useState<CarType | null>(null);
  const [carToDelete, setCarToDelete] = useState<CarType | null>(null);
  const [isDeletingCar, setIsDeletingCar] = useState(false);
  const [formModalMode, setFormModalMode] = useState<'create' | 'edit'>('create');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Search and filters for inventory tab
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');

  // Promos management state
  const [promosList, setPromosList] = useState<PromoItem[]>(MOCK_PROMOS);
  const [isLoadingPromos, setIsLoadingPromos] = useState(true);
  const [selectedPromoForEdit, setSelectedPromoForEdit] = useState<PromoItem | null>(null);
  const [promoModalMode, setPromoModalMode] = useState<'create' | 'edit'>('create');
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Inquiries state
  const [inquiriesList, setInquiriesList] = useState<AdminInquiry[]>(MOCK_INQUIRIES);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);

  // Fetch functions connecting to SQLite backend API
  const fetchCars = async () => {
    try {
      setIsLoadingCars(true);
      const res = await fetch('/api/cars');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setCarsList(data.data);
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
    } finally {
      setIsLoadingCars(false);
    }
  };

  const fetchPromos = async () => {
    try {
      setIsLoadingPromos(true);
      const res = await fetch('/api/promos');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPromosList(data.data);
      }
    } catch (err) {
      console.error('Error fetching promos:', err);
    } finally {
      setIsLoadingPromos(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      setIsLoadingInquiries(true);
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setInquiriesList(data.data);
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchPromos();
    fetchInquiries();
  }, []);

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
  const reservedCars = carsList.filter((c) => c.status === 'reserved').length;
  const soldCars = carsList.filter((c) => c.status === 'sold').length;
  const totalValuationSGD = carsList.reduce((acc, c) => acc + (c.price || 0), 0);
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

  const handleSaveCar = async (savedCar: CarType) => {
    try {
      if (formModalMode === 'create') {
        const res = await fetch('/api/cars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedCar),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setCarsList((prev) => [data.data, ...prev]);
          setToastNotice(`New vehicle "${savedCar.brand} ${savedCar.model}" added to inventory.`);
        } else {
          setToastNotice(data.error || 'Failed to add vehicle.');
        }
      } else {
        const res = await fetch(`/api/cars/${savedCar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedCar),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setCarsList((prev) =>
            prev.map((c) => (c.id === savedCar.id ? data.data : c))
          );
          setToastNotice(`Vehicle details for "${savedCar.brand} ${savedCar.model}" updated.`);
        } else {
          setToastNotice(data.error || 'Failed to update vehicle.');
        }
      }
      setIsFormModalOpen(false);
      setTimeout(() => setToastNotice(null), 4000);
    } catch (e) {
      console.error('Failed to save car:', e);
      setToastNotice('Network or server error while saving vehicle.');
    }
  };

  const handleQuickStatusChange = async (carId: string, newStatus: CarStatus) => {
    // Optimistic UI update
    setCarsList((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, status: newStatus } : c))
    );
    try {
      await fetch(`/api/cars/${carId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setToastNotice(`Vehicle status updated to ${newStatus.toUpperCase()}`);
    } catch (e) {
      console.error('Error updating status:', e);
    }
    setTimeout(() => setToastNotice(null), 3000);
  };

  const confirmDeleteCar = async () => {
    if (!carToDelete) return;
    setIsDeletingCar(true);
    try {
      const res = await fetch(`/api/cars/${carToDelete.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCarsList((prev) => prev.filter((c) => c.id !== carToDelete.id));
        setToastNotice(`Vehicle "${carToDelete.brand} ${carToDelete.model}" removed from inventory.`);
      } else {
        setToastNotice(data.error || 'Failed to remove vehicle.');
      }
      setCarToDelete(null);
      setTimeout(() => setToastNotice(null), 4000);
    } catch (e) {
      console.error('Error deleting car:', e);
      setToastNotice('Network error while removing vehicle.');
    } finally {
      setIsDeletingCar(false);
    }
  };

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

  const handleSavePromo = async (savedPromo: PromoItem) => {
    try {
      if (promoModalMode === 'create') {
        const res = await fetch('/api/promos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedPromo),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setPromosList((prev) => [data.data, ...prev]);
          setToastNotice(`Promotional campaign "${savedPromo.title}" added.`);
        }
      } else {
        const res = await fetch(`/api/promos/${savedPromo.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savedPromo),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setPromosList((prev) =>
            prev.map((p) => (p.id === savedPromo.id ? data.data : p))
          );
          setToastNotice(`Promotional campaign "${savedPromo.title}" updated.`);
        }
      }
      setIsPromoModalOpen(false);
      setTimeout(() => setToastNotice(null), 4000);
    } catch (e) {
      console.error('Error saving promo:', e);
    }
  };

  const handleDeletePromo = async (promoId: string) => {
    try {
      await fetch(`/api/promos/${promoId}`, { method: 'DELETE' });
      setPromosList((prev) => prev.filter((p) => p.id !== promoId));
      setToastNotice('Promotional campaign removed from the system.');
      setTimeout(() => setToastNotice(null), 3000);
    } catch (e) {
      console.error('Error deleting promo:', e);
    }
  };

  const handleInquiryStatusChange = async (id: string, newStatus: AdminInquiry['status']) => {
    setInquiriesList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setToastNotice(`Inquiry status updated to ${newStatus.toUpperCase()}`);
    } catch (e) {
      console.error('Error updating inquiry status:', e);
    }
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
                    CMS
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Showroom Management System</div>
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
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </Link>

            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-semibold border border-rose-500/30 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
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
            <span>Dashboard Overview</span>
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
            <span>Inventory ({totalCars})</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'inventory' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {availableCars} Available
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
            <span>Promotions</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'promos' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {promosList.length}
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
            <span>Inquiries / Leads</span>
            {newInquiriesCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'inquiries'
                    ? 'bg-rose-950 text-rose-300'
                    : 'bg-rose-500 text-white animate-pulse'
                }`}
              >
                {newInquiriesCount} new
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
            <span>Showroom Hubs</span>
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
                  <span>Business & Operations Overview</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Apex Auto Showroom Command Centre
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Welcome back, <strong className="text-white">{user?.name || 'Owner'}</strong>. Showroom inventory, COE records, promotion campaigns, and visitor inquiries are synchronized live via SQLite.
                </p>
              </div>
            </div>

            {/* 4 Metric Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium">Total Inventory</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{totalCars}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">{availableCars} Available</span>
                  <span>•</span>
                  <span>{reservedCars + soldCars} Reserved/Sold</span>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium">Available Units</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-400">{availableCars}</div>
                <div className="text-[11px] text-slate-400">
                  Ready for client test drives & viewings
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium">Reserved / Sold Units</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">
                  {reservedCars} <span className="text-sm font-normal text-slate-400">res. / {soldCars} sold</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Pending COE transfers and deliveries
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-2 hover:border-rose-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium">Visitor Inquiries / Leads</span>
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{inquiriesList.length}</div>
                <div className="text-[11px] text-slate-400">
                  <span className="text-rose-400 font-bold">{newInquiriesCount} new messages</span> requiring sales followup
                </div>
              </div>
            </div>

            {/* Overview Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Recent Leads & Inquiries
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleTabChange('inquiries')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    View All ({inquiriesList.length}) →
                  </button>
                </div>
                <div className="space-y-3">
                  {inquiriesList.slice(0, 4).map((inq) => (
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
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.customerName)},%20this%20is%20Apex%20Auto%20following%20up%20on%20your%20inquiry%20regarding%20the%20${encodeURIComponent(inq.carName)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleInquiryStatusChange(inq.id, 'contacted')}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Reply WhatsApp</span>
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
                    Database & Real-Time Sync
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Embedded SQLite engine is active. Any vehicle, promo, or status change writes directly to disk and updates the live site instantly.
                  </p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Database Engine:</span>
                    <span className="text-emerald-400 font-bold">SQLite (Monolithic Local)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Total Portfolio Value:</span>
                    <span className="text-white font-mono font-bold">S${totalValuationSGD.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Active Promotions:</span>
                    <span className="text-amber-400 font-medium">{promosList.length} Campaign Banners</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Showroom Locations:</span>
                    <span className="text-white font-medium">3 Hubs (Leng Kee, Ubi, Sin Ming)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTabChange('inventory')}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Car className="w-4 h-4" />
                  <span>Open Car Inventory</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INVENTORY (CRUD) */}
        {/* ========================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">Car Inventory Management</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Create, update, filter, or remove vehicles from the public showroom catalog.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search brand, model, hub..."
                    className="pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors w-52 sm:w-60"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="available">Available ({availableCars})</option>
                  <option value="reserved">Reserved ({reservedCars})</option>
                  <option value="sold">Sold ({soldCars})</option>
                </select>

                <button
                  type="button"
                  onClick={fetchCars}
                  title="Reload inventory from database"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  <RotateCw className={`w-4 h-4 ${isLoadingCars ? 'animate-spin' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleOpenCreateCar}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Car</span>
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
                      <th className="py-3.5 px-4 font-semibold">Vehicle</th>
                      <th className="py-3.5 px-4 font-semibold">Body & Fuel</th>
                      <th className="py-3.5 px-4 font-semibold">Year & Mileage</th>
                      <th className="py-3.5 px-4 font-semibold">Price (SGD Nett)</th>
                      <th className="py-3.5 px-4 font-semibold">Location</th>
                      <th className="py-3.5 px-4 font-semibold">Unit Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-medium">
                    {filteredCars.length > 0 ? (
                      filteredCars.map((car) => (
                        <tr key={car.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 text-white font-bold">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
                                <img
                                  src={car.images?.[0]?.url || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=300'}
                                  alt={`${car.brand} ${car.model}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="text-white text-sm">
                                  {car.brand} {car.model}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono font-normal">
                                  {car.transmission} • {car.color}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-white font-semibold">{car.body_type}</div>
                            <div className="text-[10px] text-slate-400">{car.fuel_type}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-white font-semibold">{car.year}</div>
                            <div className="text-[10px] text-slate-400">
                              {car.mileage_km.toLocaleString('en-US')} km
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-amber-400 font-bold">
                            <div>S${car.price.toLocaleString('en-US')}</div>
                            {car.depreciation_sgd && (
                              <div className="text-[10px] text-slate-400 font-normal">
                                Depr: S${car.depreciation_sgd.toLocaleString('en-US')}/yr
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            <span className="line-clamp-1">{car.location}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <QuickStatusChanger
                              carId={car.id}
                              currentStatus={car.status}
                              carName={`${car.brand} ${car.model}`}
                              onStatusChange={handleQuickStatusChange}
                            />
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditCar(car)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition-colors cursor-pointer"
                                title="Edit vehicle details"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href={`/mobil/${car.id}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                                title="View public detail page"
                              >
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => setCarToDelete(car)}
                                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30 transition-colors cursor-pointer"
                                title="Delete vehicle"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-500 text-xs">
                          {isLoadingCars
                            ? 'Loading vehicle catalog from database...'
                            : 'No vehicles found matching your criteria.'}
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
        {/* TAB 3: PROMOTIONS (CRUD) */}
        {/* ========================================================= */}
        {activeTab === 'promos' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">Homepage Promotional Banners</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage promotional incentives, savings nominals, and terms & conditions displayed dynamically on the homepage.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenCreatePromo}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Promo Banner</span>
                </button>
                <Link
                  href="/#promo"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview on Homepage</span>
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
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {promo.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{promo.valid_until}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">{promo.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{promo.description}</p>
                    </div>

                    {promo.discount_sgd && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Savings Nominal</span>
                        <span className="text-lg font-black text-amber-400 font-mono">
                          S${promo.discount_sgd.toLocaleString('en-US')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditPromo(promo)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit Promo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePromo(promo.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: INQUIRIES / LEADS */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div>
                <h2 className="text-xl font-bold text-white">Visitor Inquiries & Sales Leads</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Incoming leads submitted via the public contact forms and vehicle inquiry buttons.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchInquiries}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoadingInquiries ? 'animate-spin' : ''}`} />
                <span>Refresh Leads</span>
              </button>
            </div>

            <AdminInquiryList
              inquiries={inquiriesList}
              onStatusChange={handleInquiryStatusChange}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: BRANCHES */}
        {/* ========================================================= */}
        {activeTab === 'branches' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-white">Showroom Hubs & Service Centres</h2>
              <p className="text-xs text-slate-400 mt-1">
                Apex Auto Singapore physical customer experience locations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SHOWROOM_BRANCHES.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{branch.name}</h3>
                      <span className="text-[10px] text-amber-400 font-mono">{branch.zone}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400">
                    <p>{branch.address}</p>
                    <p className="font-mono">{branch.hours}</p>
                    <p className="text-white font-medium">{branch.phone}</p>
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

      {/* Confirmation Modal for Deleting Car */}
      {carToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setCarToDelete(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-white">Remove Vehicle from Inventory?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to delete <strong className="text-white">{carToDelete.brand} {carToDelete.model}</strong>? This action will remove the car and its image gallery from the database and public catalog.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={isDeletingCar}
                onClick={() => setCarToDelete(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingCar}
                onClick={confirmDeleteCar}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-900/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isDeletingCar ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Vehicle</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
              <h3 className="text-lg font-bold text-white">Sign out of Portal?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your current session will end and you will be returned to the login portal.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/30 transition-all cursor-pointer"
              >
                Yes, Sign Out
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
            Loading Showroom Management Portal...
          </div>
        }
      >
        <AdminDashboardContent />
      </Suspense>
    </AdminRouteGuard>
  );
}
