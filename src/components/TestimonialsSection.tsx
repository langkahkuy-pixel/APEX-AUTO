import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Saya bisa melihat kondisi mobil dan dokumennya dengan tenang sebelum memutuskan. Penjelasan timnya jelas, jadi proses pembelian terasa lebih mudah.',
    name: 'Andi Pratama',
    vehicle: 'Pembeli sedan premium',
  },
  {
    quote: 'Pilihan mobilnya sesuai kebutuhan keluarga. Tim Apex membantu membandingkan beberapa unit dan menjelaskan perhitungan kredit tanpa terburu-buru.',
    name: 'Bima Siregar',
    vehicle: 'Pembeli SUV keluarga',
  },
  {
    quote: 'Mulai dari melihat mobil sampai serah terima, komunikasi berjalan lancar. Saya juga mendapat waktu untuk memeriksa kembali unit dan dokumen.',
    name: 'Rizky Maulana',
    vehicle: 'Pembeli mobil harian',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimoni" aria-labelledby="testimoni-title" className="scroll-mt-16 bg-[#f5f3ee] py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Testimoni</p>
          <h2 id="testimoni-title" className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Cerita di balik setiap pilihan mobil</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">Dari memilih unit hingga menerima kunci, kami ingin setiap langkah terasa jelas dan nyaman.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map(item => (
            <figure key={item.name} className="flex min-h-64 flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-7">
              <div><Quote aria-hidden="true" className="h-7 w-7 text-amber-500" /><blockquote className="mt-5 text-sm leading-7 text-zinc-700 sm:text-base">“{item.quote}”</blockquote></div>
              <figcaption className="mt-7 border-t border-zinc-100 pt-5"><p className="font-semibold">{item.name}</p><p className="mt-1 text-xs text-zinc-500">{item.vehicle}</p></figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-xs text-zinc-500">Testimoni ini merupakan contoh untuk tampilan demo.</p>
      </div>
    </section>
  );
}
