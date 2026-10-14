import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/locale';

const BUYING_STEPS = [
  {
    number: '01',
    image: '/picture/apex-pilih-mobil.webp',
    alt: 'Ilustrasi pria memilih sedan di showroom mobil',
    title: 'Temukan mobil yang Anda suka',
    description: 'Jelajahi koleksi kami. Bandingkan spesifikasi, tahun, kilometer, dan harga untuk menemukan mobil yang sesuai kebutuhan Anda.',
  },
  {
    number: '02',
    image: '/picture/apex-lihat-unit.webp',
    alt: 'Ilustrasi pembeli pria melihat kabin mobil bersama konsultan pria',
    title: 'Kenali mobilnya lebih dekat',
    description: 'Hubungi tim kami melalui WhatsApp dan jadwalkan kunjungan ke showroom. Lihat langsung kondisi mobil serta kelengkapan STNK dan BPKB.',
  },
  {
    number: '03',
    image: '/picture/apex-pembayaran.webp',
    alt: 'Ilustrasi pembeli dan konsultan pria membahas dokumen pembelian mobil',
    title: 'Tentukan cara pembayaran',
    description: 'Diskusikan harga dan pilih pembelian tunai atau kredit. Tim kami membantu menjelaskan uang muka, tenor, cicilan, dan dokumen pengajuan.',
  },
  {
    number: '04',
    image: '/picture/apex-serah-terima-pria.webp',
    alt: 'Ilustrasi pembeli pria menerima kunci mobil dari konsultan pria',
    title: 'Terima kunci, mulai perjalanan',
    description: 'Setelah pembayaran dan dokumen selesai, jadwalkan serah terima. Periksa kembali unit bersama tim kami, lalu bawa pulang mobil pilihan Anda.',
  },
];

export function BuyingStepsSection() {
  return (
    <section id="cara-membeli" aria-labelledby="buying-steps-title" className="scroll-mt-24 bg-[#FAFAFA] py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              <span aria-hidden="true" className="h-px w-8 bg-amber-600" />
              Cara Membeli di Apex
            </p>
            <h2 id="buying-steps-title" className="max-w-xl text-3xl font-semibold leading-[1.18] tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.75rem]">
              Mobil pilihan Anda.<br />
              <span className="text-zinc-500">Selangkah lebih dekat.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-zinc-600 lg:pb-1">
            Dari menemukan yang cocok hingga kunci ada di tangan, kami mendampingi setiap langkah pembelian mobil Anda.
          </p>
        </div>

        <div>
          <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-7">
            {BUYING_STEPS.map((step, index) => (
              <li key={step.number} className="min-w-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-200">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 25vw, 290px"
                    className="object-cover"
                  />
                </div>
                <div className="mb-4 mt-5 flex items-center gap-3">
                  <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold tabular-nums ${index === 3 ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-200 bg-[#FAFAFA] text-amber-700'}`}>
                    {step.number}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-zinc-200" />
                  {index < BUYING_STEPS.length - 1 && <ArrowRight aria-hidden="true" className="h-4 w-4 text-zinc-400" />}
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-zinc-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 pt-7 sm:flex-row sm:items-center sm:gap-5 lg:mt-12">
            <Link href="/inventory" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
              Lihat Pilihan Mobil
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={whatsappUrl('Halo Apex Auto Medan, saya ingin konsultasi tentang pembelian mobil.')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold text-zinc-700 transition-colors hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Konsultasi Pembelian
              <span className="sr-only"> (buka WhatsApp di tab baru)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
