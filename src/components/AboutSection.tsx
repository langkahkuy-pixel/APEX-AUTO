import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileCheck2, SearchCheck, WalletCards } from 'lucide-react';

const strengths = [
  { icon: SearchCheck, title: 'Kondisi ditinjau', text: 'Unit dapat dilihat dan diperiksa langsung sebelum Anda mengambil keputusan.' },
  { icon: FileCheck2, title: 'Dokumen jelas', text: 'Kelengkapan STNK, BPKB, dan informasi kendaraan dapat dibahas bersama tim showroom.' },
  { icon: WalletCards, title: 'Pilihan pembayaran', text: 'Konsultasikan harga, pembelian tunai, uang muka, dan simulasi kredit sesuai kebutuhan.' },
];

export function AboutSection() {
  return (
    <section id="tentang-kami" aria-labelledby="about-title" className="scroll-mt-16 bg-white py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="relative min-h-80 overflow-hidden rounded-2xl bg-zinc-200 sm:min-h-[530px]">
          <Image src="/picture/apex-pilih-mobil.webp" alt="Mobil pilihan di showroom Apex Auto" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Tentang Kami</p>
          <h2 id="about-title" className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Lebih yakin memilih mobil bersama Apex</h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">Apex Auto adalah showroom mobil bekas premium di Medan. Kami membantu Anda mengenal kondisi, dokumen, dan pilihan pembayaran setiap mobil secara jelas sebelum membeli.</p>
          <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
            {strengths.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 py-5"><Icon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-amber-600" /><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p></div></div>
            ))}
          </div>
          <Link href="/#kontak" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700">Hubungi Tim Kami <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
