'use client';

import { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { formatRupiah, formatDate, localizeStatus, SHOWROOM } from '@/lib/locale';
import AdminCarFormModal from '@/components/admin/AdminCarFormModal';
import AdminInquiryList from '@/components/admin/AdminInquiryList';
import QuickStatusChanger from '@/components/admin/QuickStatusChanger';
import type { AdminInquiry } from '@/data/mock-inquiries';
import type { Car, CarStatus } from '@/types/car';
import { ArrowRight, ArrowUpRight, Building2, Car as CarIcon, Check, CheckCircle2, ChevronRight, Clock, ExternalLink, LayoutDashboard, Loader2, LogOut, MapPin, MessageSquare, Pencil, Phone, Plus, RotateCw, Search, Trash2, X, type LucideIcon } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
  { id: 'inventory', label: 'Koleksi Mobil', icon: CarIcon },
  { id: 'inquiries', label: 'Pertanyaan Pelanggan', icon: MessageSquare },
  { id: 'branches', label: 'Lokasi Showroom', icon: Building2 },
] as const;
type AdminTab = typeof TABS[number]['id'];
const button = 'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500';
const primaryButton = 'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500';
const input = 'min-h-10 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100';

function AdminDashboardContent() {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedTab = searchParams.get('tab');
  const activeTab: AdminTab = TABS.find(tab => tab.id === requestedTab)?.id || 'overview';
  const [cars, setCars] = useState<Car[]>([]);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CarStatus | 'all'>('all');
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (requestedTab && !TABS.some(tab => tab.id === requestedTab)) {
      router.replace('/admin?tab=overview', { scroll: false });
    }
  }, [requestedTab, router]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const results = await Promise.allSettled([readList<Car>('/api/cars'), readList<AdminInquiry>('/api/inquiries')]);
      if (!mounted) return;
      if (results[0].status === 'fulfilled') setCars(results[0].value);
      if (results[1].status === 'fulfilled') setInquiries(results[1].value);
      if (results.some(result => result.status === 'rejected')) setLoadError('Sebagian data belum dapat dimuat. Silakan muat ulang.');
      setLoadingCars(false);
      setLoadingInquiries(false);
    }
    void load();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 5000);
    return () => clearTimeout(timer);
  }, [notice]);

  async function refreshCars() {
    setLoadingCars(true);
    try { setCars(await readList<Car>('/api/cars')); setLoadError(''); }
    catch { setLoadError('Koleksi mobil belum dapat dimuat. Silakan coba lagi.'); }
    finally { setLoadingCars(false); }
  }
  async function refreshInquiries() {
    setLoadingInquiries(true);
    try { setInquiries(await readList<AdminInquiry>('/api/inquiries')); setLoadError(''); }
    catch { setLoadError('Pertanyaan pelanggan belum dapat dimuat. Silakan coba lagi.'); }
    finally { setLoadingInquiries(false); }
  }
  function navigate(tab: AdminTab) { router.push(`/admin?tab=${tab}`, { scroll: false }); }
  function addCar() { setEditingCar(null); setFormOpen(true); }
  function editCar(car: Car) { setEditingCar(car); setFormOpen(true); }

  async function saveCar(car: Car) {
    const response = await fetch(editingCar ? `/api/cars/${car.id}` : '/api/cars', {
      method: editingCar ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(car),
    });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.error || 'Data mobil gagal disimpan.');
    setCars(previous => editingCar ? previous.map(item => item.id === car.id ? data.data : item) : [data.data, ...previous]);
    setFormOpen(false);
    setNotice(editingCar ? 'Perubahan mobil berhasil disimpan.' : 'Mobil baru berhasil ditambahkan ke katalog.');
  }
  async function changeCarStatus(id: string, status: CarStatus) {
    try {
      const response = await fetch(`/api/cars/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Status mobil gagal diperbarui.');
      setCars(previous => previous.map(car => car.id === id ? { ...car, status } : car));
      setNotice(`Status mobil diperbarui menjadi ${localizeStatus(status).toLowerCase()}.`);
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Koneksi bermasalah. Silakan coba lagi.'); }
  }
  async function deleteCar() {
    if (!carToDelete) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/cars/${carToDelete.id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Mobil gagal dihapus.');
      setCars(previous => previous.filter(car => car.id !== carToDelete.id));
      setCarToDelete(null);
      setNotice('Mobil berhasil dihapus dari katalog.');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Koneksi bermasalah. Silakan coba lagi.'); }
    finally { setDeleting(false); }
  }
  async function changeInquiryStatus(id: string, status: AdminInquiry['status']) {
    try {
      const response = await fetch(`/api/inquiries/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Status pertanyaan gagal diperbarui.');
      setInquiries(previous => previous.map(item => item.id === id ? { ...item, status } : item));
      setNotice('Status pertanyaan berhasil diperbarui.');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Koneksi bermasalah. Silakan coba lagi.'); }
  }

  const available = cars.filter(car => car.status === 'available').length;
  const reserved = cars.filter(car => car.status === 'reserved').length;
  const sold = cars.filter(car => car.status === 'sold').length;
  const newInquiries = inquiries.filter(inquiry => inquiry.status === 'new').length;
  const valuation = cars.reduce((sum, car) => sum + car.price, 0);
  const filteredCars = cars.filter(car => {
    const search = query.trim().toLowerCase();
    return `${car.brand} ${car.model} ${car.location} ${car.plate_number || ''}`.toLowerCase().includes(search)
      && (statusFilter === 'all' || car.status === statusFilter);
  });
  const recentInquiries = [...inquiries].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 4);
  const currentLabel = TABS.find(tab => tab.id === activeTab)!.label;

  function navigation(mobile = false) {
    return <nav aria-label={mobile ? 'Navigasi CMS mobile' : 'Navigasi CMS'} className={mobile ? 'flex gap-1 overflow-x-auto px-4 py-3' : 'space-y-1.5'}>
      {TABS.map(({ id, label, icon: Icon }) => <Link key={id} href={`/admin?tab=${id}`} aria-current={activeTab === id ? 'page' : undefined}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-amber-500 ${mobile ? 'shrink-0 whitespace-nowrap' : ''} ${activeTab === id ? 'bg-amber-50 text-amber-900' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}`}>
        <Icon className={`h-[18px] w-[18px] shrink-0 ${activeTab === id ? 'text-amber-600' : ''}`} />{label}
        {id === 'inventory' && <span className={`ml-auto rounded-md px-1.5 py-0.5 text-[11px] tabular-nums ${activeTab === id ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-500'}`}>{cars.length}</span>}
        {id === 'inquiries' && newInquiries > 0 && <span className="ml-auto rounded-md bg-amber-100 px-1.5 py-0.5 text-[11px] text-amber-800">{newInquiries}</span>}
      </Link>)}
    </nav>;
  }

  return (
    <div className="min-h-[100dvh] bg-[#f8f9fb] text-zinc-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-zinc-200 bg-white lg:flex">
        <Link href="/admin" className="flex items-center gap-3 px-6 py-7">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-900 text-amber-400"><CarIcon className="h-5 w-5" /></span>
          <span><span className="block text-sm font-extrabold tracking-wide">APEX AUTO</span><span className="mt-0.5 block text-xs text-zinc-400">Manajemen showroom</span></span>
        </Link>
        <div className="px-4 pt-5"><p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">Ruang kerja</p>{navigation()}</div>
        <div className="mt-auto border-t border-zinc-100 px-5 py-5">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-500 hover:text-zinc-900"><ExternalLink className="h-4 w-4" />Lihat Situs<ArrowUpRight className="ml-auto h-4 w-4" /></Link>
          <button onClick={() => setShowLogout(true)} className="mt-2 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-zinc-500 hover:bg-zinc-50 hover:text-red-600"><LogOut className="h-4 w-4" />Keluar</button>
          <div className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zinc-100 text-xs font-semibold">{(user?.name || 'Admin').slice(0, 2).toUpperCase()}</span><div className="min-w-0"><p className="truncate text-xs font-semibold">{user?.name || 'Admin Apex Medan'}</p><p className="mt-1 text-[11px] text-zinc-400">{user?.role === 'owner' ? 'Pemilik showroom' : 'Staf penjualan'}</p></div></div>
        </div>
      </aside>
      <div className="min-w-0 lg:ml-64">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
          <div className="flex h-[76px] items-center justify-between gap-3 px-5 sm:px-8 xl:px-10">
            <div className="flex items-center gap-2 text-xs text-zinc-400 sm:text-sm"><span className="hidden sm:inline">Ruang kerja</span><ChevronRight className="hidden h-3.5 w-3.5 sm:block" /><span className="font-medium text-zinc-700">{currentLabel}</span></div>
            <div className="flex items-center gap-3"><span className="hidden items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500 sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Showroom Medan</span><Link href="/" target="_blank" rel="noopener noreferrer" className={`${button} lg:hidden`} aria-label="Lihat Situs"><ExternalLink className="h-4 w-4" /></Link><button onClick={() => setShowLogout(true)} className="rounded-lg p-2 text-zinc-500 lg:hidden" aria-label="Keluar"><LogOut className="h-4 w-4" /></button><span className="hidden rounded-md bg-zinc-100 px-2 py-1 text-[10px] font-semibold tracking-wider text-zinc-500 sm:inline">CMS</span></div>
          </div>
          <div className="border-t border-zinc-100 lg:hidden">{navigation(true)}</div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-7 px-5 py-8 sm:px-8 xl:px-10 xl:py-10">
          {loadError && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}<button onClick={() => { void refreshCars(); void refreshInquiries(); }} className="font-semibold underline">Muat ulang</button></div>}
          {activeTab === 'overview' && <>
            <PageHeading eyebrow="Aktivitas showroom" title="Ringkasan Showroom" description={`Selamat datang, ${user?.name || 'Admin'}. Pantau koleksi mobil dan tindak lanjut pelanggan Anda.`} action={<button onClick={addCar} className={primaryButton}><Plus className="h-4 w-4" />Tambah Mobil</button>} />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Metric label="Total mobil" value={loadingCars ? '—' : cars.length} detail="Unit dalam koleksi showroom" icon={CarIcon} />
              <Metric label="Mobil tersedia" value={loadingCars ? '—' : available} detail="Siap dilihat calon pembeli" icon={CheckCircle2} />
              <Metric label="Dipesan / terjual" value={loadingCars ? '—' : `${reserved} / ${sold}`} detail="Proses pembelian dan serah terima" icon={Check} />
              <Metric label="Pertanyaan baru" value={loadingInquiries ? '—' : newInquiries} detail={`${inquiries.length} total pertanyaan pelanggan`} icon={MessageSquare} />
            </div>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white"><div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-6 py-5"><h2 className="text-base font-semibold">Pertanyaan Terbaru</h2><button onClick={() => navigate('inquiries')} className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900">Lihat semua<ArrowRight className="h-3.5 w-3.5" /></button></div>
                {loadingInquiries ? <EmptyState loading title="Memuat pertanyaan pelanggan..." /> : recentInquiries.length ? <div className="divide-y divide-zinc-100">{recentInquiries.map(inquiry => <button key={inquiry.id} onClick={() => navigate('inquiries')} className="flex w-full items-start gap-4 px-6 py-5 text-left hover:bg-zinc-50"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-500">{inquiry.customerName.slice(0, 1)}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap justify-between gap-2"><h3 className="text-sm font-semibold">{inquiry.customerName}</h3><span className="text-[11px] text-zinc-400">{formatDate(inquiry.createdAt)}</span></div><p className="mt-1 truncate text-xs text-zinc-500">{inquiry.carName}</p><p className="mt-2 line-clamp-1 text-xs text-zinc-400">{inquiry.message}</p></div><ChevronRight className="mt-2 h-4 w-4 shrink-0 text-zinc-400" /></button>)}</div> : <EmptyState title="Belum ada pertanyaan pelanggan" description="Pertanyaan yang masuk akan muncul di sini." />}
              </section>
              <section className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6"><p className="text-xs font-medium text-zinc-500">Total nilai koleksi</p><p className="mt-4 break-words text-2xl font-semibold tracking-tight tabular-nums xl:text-3xl">{loadingCars ? '—' : formatRupiah(valuation)}</p><p className="mt-2 text-xs leading-6 text-zinc-400">Akumulasi harga tunai seluruh unit di katalog.</p><div className="mt-7 space-y-4 border-t border-zinc-100 pt-5"><SummaryLine label="Tersedia" value={`${available} unit`} /><SummaryLine label="Dipesan" value={`${reserved} unit`} /><SummaryLine label="Terjual" value={`${sold} unit`} /></div><button onClick={() => navigate('inventory')} className={`${button} mt-7 w-full`}>Kelola Koleksi Mobil<ArrowRight className="h-4 w-4" /></button></section>
            </div>
          </>}

          {activeTab === 'inventory' && <>
            <PageHeading eyebrow="Inventaris" title="Kelola Koleksi Mobil" description="Semua unit, detail kendaraan, dan status penjualan dalam satu tempat." action={<button onClick={addCar} className={primaryButton}><Plus className="h-4 w-4" />Tambah Mobil</button>} />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500"><span><strong className="font-semibold text-zinc-900">{cars.length}</strong> total unit</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{available} tersedia</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />{reserved} dipesan</span><span>{sold} terjual</span></div>
            <section className="rounded-xl border border-zinc-200 bg-white">
              <div className="flex flex-wrap items-center gap-3 border-b border-zinc-200 p-4 sm:p-5"><div className="relative min-w-0 flex-1 basis-56"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" /><input aria-label="Cari mobil" placeholder="Cari merek, model, atau nomor polisi..." value={query} onChange={event => setQuery(event.target.value)} className={`${input} w-full pl-9`} /></div><select aria-label="Filter status mobil" value={statusFilter} onChange={event => setStatusFilter(event.target.value as CarStatus | 'all')} className={`${input} flex-1 sm:flex-none`}><option value="all">Semua Status</option><option value="available">Tersedia</option><option value="reserved">Dipesan</option><option value="sold">Terjual</option></select><button onClick={refreshCars} disabled={loadingCars} aria-label="Muat ulang koleksi mobil" className={`${button} px-3`}><RotateCw className={`h-4 w-4 ${loadingCars ? 'animate-spin' : ''}`} /></button></div>
              <div className="overflow-x-auto rounded-b-xl">
                <table className="w-full min-w-[940px] text-left text-sm"><thead className="bg-zinc-50 text-[11px] font-medium uppercase tracking-wider text-zinc-400"><tr><th className="px-5 py-4 font-medium">Mobil</th><th className="px-4 py-4 font-medium">Spesifikasi</th><th className="px-4 py-4 font-medium">Harga tunai</th><th className="px-4 py-4 font-medium">Status unit</th><th className="px-5 py-4 text-right font-medium">Tindakan</th></tr></thead><tbody className="divide-y divide-zinc-100">
                  {loadingCars ? <tr><td colSpan={5}><EmptyState loading title="Memuat koleksi mobil..." /></td></tr> : filteredCars.map(car => <tr key={car.id} className="group hover:bg-zinc-50/70"><td className="px-5 py-5"><div className="flex max-w-[400px] items-center gap-4"><CarThumbnail car={car} /><div className="min-w-0"><p className="text-sm font-semibold leading-5">{car.brand} {car.model}</p><p className="mt-1.5 text-xs text-zinc-400">{car.plate_number || 'Nomor polisi belum diisi'} · {car.color}</p></div></div></td><td className="px-4 py-5"><p className="text-xs font-medium">{car.year} · {car.body_type}</p><p className="mt-1.5 text-xs text-zinc-400">{car.mileage_km.toLocaleString('id-ID')} km · {car.fuel_type}</p></td><td className="whitespace-nowrap px-4 py-5"><p className="text-sm font-semibold tabular-nums">{formatRupiah(car.price)}</p><p className="mt-1.5 text-[11px] text-zinc-400">{car.annual_tax_idr ? `Pajak ${formatRupiah(car.annual_tax_idr)} /tahun` : 'Pajak belum diisi'}</p></td><td className="px-4 py-5"><QuickStatusChanger carId={car.id} currentStatus={car.status} carName={`${car.brand} ${car.model}`} onStatusChange={changeCarStatus} /></td><td className="px-5 py-5"><div className="flex justify-end gap-1"><button onClick={() => editCar(car)} aria-label={`Ubah ${car.brand} ${car.model}`} title="Ubah data mobil" className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"><Pencil className="h-4 w-4" /></button><Link href={`/mobil/${car.id}`} target="_blank" rel="noopener noreferrer" aria-label={`Lihat ${car.brand} ${car.model}`} title="Lihat halaman detail mobil" className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"><ArrowUpRight className="h-4 w-4" /></Link><button onClick={() => setCarToDelete(car)} aria-label={`Hapus ${car.brand} ${car.model}`} title="Hapus mobil" className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></td></tr>)}
                  {!loadingCars && !filteredCars.length && <tr><td colSpan={5}><EmptyState title={query || statusFilter !== 'all' ? 'Tidak ada mobil yang sesuai' : 'Koleksi mobil masih kosong'} description={query || statusFilter !== 'all' ? 'Coba kata pencarian atau status yang berbeda.' : 'Tambahkan unit pertama ke katalog showroom.'} /></td></tr>}
                </tbody></table>
              </div>
              <div className="border-t border-zinc-100 px-5 py-4 text-xs text-zinc-400">Menampilkan {filteredCars.length} dari {cars.length} mobil</div>
            </section>
          </>}

          {activeTab === 'inquiries' && <>
            <PageHeading eyebrow="Pelanggan" title="Pertanyaan Pelanggan" description="Kelola pesan masuk dan tindak lanjut calon pembeli." action={<button onClick={refreshInquiries} disabled={loadingInquiries} className={button}><RotateCw className={`h-4 w-4 ${loadingInquiries ? 'animate-spin' : ''}`} />Muat Ulang</button>} />
            {loadingInquiries ? <div className="rounded-xl border border-zinc-200 bg-white"><EmptyState loading title="Memuat pertanyaan pelanggan..." /></div> : <AdminInquiryList inquiries={inquiries} onStatusChange={changeInquiryStatus} />}
          </>}

          {activeTab === 'branches' && <>
            <PageHeading eyebrow="Showroom" title="Lokasi dan Layanan" description="Informasi showroom dan kontak pelanggan Apex Auto di Medan." />
            <section className="max-w-3xl overflow-hidden rounded-xl border border-zinc-200 bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-6 py-6"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-700"><Building2 className="h-5 w-5" /></span><div><h2 className="text-base font-semibold">{SHOWROOM.name}</h2><p className="mt-1 text-xs text-zinc-400">Showroom utama</p></div></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">{cars.length} unit dalam koleksi</span></div><div className="space-y-6 px-6 py-7"><InfoLine icon={MapPin} label="Alamat" value={SHOWROOM.address} /><InfoLine icon={Clock} label="Jam operasional" value={SHOWROOM.hours} /><InfoLine icon={Phone} label="Telepon / WhatsApp" value={SHOWROOM.phone} /><a href={SHOWROOM.mapUrl} target="_blank" rel="noopener noreferrer" className={button}>Buka Peta<ArrowUpRight className="h-4 w-4" /></a></div></section>
          </>}
          <p className="pt-2 text-[11px] text-zinc-400">Apex Auto Medan<span className="mx-2 text-zinc-300">/</span>Manajemen showroom</p>
        </main>
      </div>

      {notice && <div role="status" className="fixed bottom-5 left-5 right-5 z-[70] flex items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-800 shadow-lg sm:left-auto sm:max-w-md"><p>{notice}</p><button onClick={() => setNotice('')} aria-label="Tutup pemberitahuan" className="text-zinc-400 hover:text-zinc-800"><X className="h-4 w-4" /></button></div>}
      {formOpen && <AdminCarFormModal key={editingCar?.id || 'new'} isOpen mode={editingCar ? 'edit' : 'create'} initialCar={editingCar} onClose={() => setFormOpen(false)} onSave={saveCar} />}
      {carToDelete && <ConfirmDialog title="Hapus Mobil dari Katalog?" description={`${carToDelete.brand} ${carToDelete.model} beserta galeri fotonya akan dihapus. Anda yakin ingin melanjutkan?`} confirmLabel="Hapus Mobil" destructive busy={deleting} onClose={() => setCarToDelete(null)} onConfirm={deleteCar} />}
      {showLogout && <ConfirmDialog title="Keluar dari Portal?" description="Sesi Anda akan berakhir. Anda dapat masuk kembali kapan saja." confirmLabel="Ya, Keluar" onClose={() => setShowLogout(false)} onConfirm={() => { setShowLogout(false); logout(); }} />}
    </div>
  );
}

async function readList<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || !data.success || !Array.isArray(data.data)) throw new Error('Data tidak dapat dimuat.');
  return data.data;
}
function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">{eyebrow}</p><h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">{title}</h1><p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p></div>{action}</div>;
}
function Metric({ label, value, detail, icon: Icon }: { label: string; value: string | number; detail: string; icon: LucideIcon }) {
  return <div className="rounded-xl border border-zinc-200 bg-white p-5"><div className="flex items-center justify-between gap-2"><p className="text-xs text-zinc-500">{label}</p><Icon className="h-[18px] w-[18px] text-zinc-400" /></div><p className="mt-5 text-3xl font-semibold tracking-tight tabular-nums">{value}</p><p className="mt-2 text-[11px] leading-5 text-zinc-400">{detail}</p></div>;
}
function SummaryLine({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between text-sm"><span className="text-zinc-500">{label}</span><span className="font-medium tabular-nums">{value}</span></div>; }
function InfoLine({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) { return <div className="flex gap-4"><Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-zinc-400" /><div><p className="text-xs text-zinc-400">{label}</p><p className="mt-1.5 text-sm leading-6 text-zinc-700">{value}</p></div></div>; }
function EmptyState({ title, description, loading }: { title: string; description?: string; loading?: boolean }) { return <div className="flex min-h-48 flex-col items-center justify-center gap-3 px-6 py-10 text-center">{loading ? <Loader2 className="h-6 w-6 animate-spin text-zinc-400" /> : <CarIcon className="h-7 w-7 text-zinc-300" />}<p className="text-sm font-medium text-zinc-600">{title}</p>{description && <p className="text-xs text-zinc-400">{description}</p>}</div>; }
function CarThumbnail({ car }: { car: Car }) {
  const [failedSource, setFailedSource] = useState('');
  const [loadedSource, setLoadedSource] = useState('');
  const photo = car.images.find(image => image.is_main) || car.images[0];
  return <div className="relative grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50">{(!photo || loadedSource !== photo.url) && <CarIcon className="h-6 w-6 text-zinc-300" />}{photo && failedSource !== photo.url && <Image unoptimized src={photo.url} alt={`${car.brand} ${car.model}`} fill sizes="80px" className={`object-cover ${loadedSource === photo.url ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setLoadedSource(photo.url)} onError={() => setFailedSource(photo.url)} />}</div>;
}
function ConfirmDialog({ title, description, confirmLabel, onClose, onConfirm, busy = false, destructive = false }: { title: string; description: string; confirmLabel: string; onClose: () => void; onConfirm: () => void; busy?: boolean; destructive?: boolean }) {
  const dialogId = destructive ? 'delete-car-heading' : 'logout-heading';
  return <div role="dialog" aria-modal="true" aria-labelledby={dialogId} className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/35 p-5 backdrop-blur-sm" onClick={() => { if (!busy) onClose(); }} onKeyDown={event => { if (event.key === 'Escape' && !busy) onClose(); }}><div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-7 shadow-xl" onClick={event => event.stopPropagation()}><h2 id={dialogId} className="text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-zinc-500">{description}</p><div className="mt-7 flex justify-end gap-3"><button autoFocus disabled={busy} onClick={onClose} className={button}>Batal</button><button disabled={busy} onClick={onConfirm} className={destructive ? `${primaryButton} bg-red-600 hover:bg-red-700` : primaryButton}>{busy ? 'Menghapus...' : confirmLabel}</button></div></div></div>;
}
export default function AdminDashboardPage() {
  return <Suspense fallback={<div className="grid min-h-[100dvh] place-items-center bg-white text-sm text-zinc-500">Memuat ruang kerja showroom...</div>}><AdminDashboardContent /></Suspense>;
}
