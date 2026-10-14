import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#171717] text-white">
      <Navbar />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-32">
        <p className="text-sm font-semibold tracking-widest text-amber-400">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Halaman Tidak Ditemukan</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
          Halaman atau mobil yang Anda cari belum tersedia. Jelajahi koleksi mobil kami atau kembali ke beranda.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/inventory" className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">Lihat Pilihan Mobil</Link>
          <Link href="/" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:border-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">Kembali ke Beranda</Link>
        </div>
      </main>
      <Footer theme="dark" />
    </div>
  );
}
