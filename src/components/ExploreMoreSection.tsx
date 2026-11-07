import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Page = 'beranda' | 'inventory' | 'detail' | 'testimoni' | 'kontak';

const destinations = {
  'pilihan-mobil': {
    href: '/#mobil-kami',
    title: 'Lihat pilihan mobil',
    description: 'Jelajahi unit yang tersedia dan bandingkan pilihan Anda.',
  },
  'tentang-kami': {
    href: '/#tentang-kami',
    title: 'Kenali Apex',
    description: 'Pelajari cara kami memeriksa mobil dan membantu pembeli.',
  },
  testimoni: {
    href: '/#testimoni',
    title: 'Baca testimoni',
    description: 'Lihat gambaran pengalaman memilih mobil bersama kami.',
  },
  kontak: {
    href: '/#kontak',
    title: 'Hubungi showroom',
    description: 'Tanyakan unit, pembayaran, atau rencanakan kunjungan.',
  },
} as const;

type Destination = keyof typeof destinations;

const relatedPages: Record<Page, Destination[]> = {
  beranda: ['pilihan-mobil', 'tentang-kami', 'testimoni'],
  inventory: ['tentang-kami', 'testimoni', 'kontak'],
  detail: ['tentang-kami', 'testimoni', 'kontak'],
  testimoni: ['tentang-kami', 'pilihan-mobil', 'kontak'],
  kontak: ['pilihan-mobil', 'tentang-kami', 'testimoni'],
};

export function ExploreMoreSection({ from, theme = 'light' }: { from: Page; theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';

  return (
    <section aria-labelledby={`explore-${from}`} className={`border-t py-16 sm:py-20 ${isDark ? 'border-white/10 bg-[#171717] text-white' : 'border-zinc-200 bg-white text-zinc-900'}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 id={`explore-${from}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">Lanjut jelajahi Apex</h2>
        <div className="mt-9 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {relatedPages[from].map((key) => {
            const item = destinations[key];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex min-w-0 flex-col border-t pt-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 ${isDark ? 'border-white/20 hover:border-amber-400' : 'border-zinc-200 hover:border-amber-500'}`}
              >
                <span className="flex items-start justify-between gap-4 text-base font-semibold">
                  {item.title}
                  <ArrowUpRight className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} aria-hidden="true" />
                </span>
                <span className={`mt-2 max-w-xs text-sm leading-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{item.description}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
