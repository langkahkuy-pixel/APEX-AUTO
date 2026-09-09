import React from 'react';
import Link from 'next/link';
import { Car, MapPin, Phone, Mail, MessageCircle, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontak" className="bg-slate-950 border-t border-slate-805 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Showroom Brand & Profile */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <Car className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-white text-base tracking-wider">
                APEX AUTO <span className="text-amber-400">SG</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Showroom otomotif terpercaya di Singapura yang menyediakan unit pre-owned berkualitas, mobil mewah, dan penasihat lelang COE resmi.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Singapore Automotive Dealer Registry</span>
            </div>
          </div>

          {/* Col 2: Showroom Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Lokasi Showroom</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Leng Kee Flagship:</strong><br />
                  24 Leng Kee Road, Singapore 159096
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Ubi Car Hub:</strong><br />
                  53 Ubi Ave 1, #01-18, Singapore 408934
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Sin Ming Service:</strong><br />
                  176 Sin Ming Drive, Singapore 575721
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Operational Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Jam Operasional & Kontak</h4>
            <div className="space-y-2">
              <p>Senin – Sabtu: 09:00 – 19:00 SGT</p>
              <p>Minggu & Hari Libur: 10:00 – 18:00 SGT</p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="tel:+6567891234"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>+65 6789 1234 (Office)</span>
                </a>
                <a
                  href="https://wa.me/6581234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>+65 8123 4567 (WhatsApp Sales)</span>
                </a>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>sales@apexautosg.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#katalog" className="hover:text-amber-400 transition-colors">
                  Katalog Mobil Singapura
                </Link>
              </li>
              <li>
                <Link href="#katalog" className="hover:text-amber-400 transition-colors">
                  SUV & Sedan Mewah
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/6581234567?text=Halo%20Apex%20Auto,%20saya%20ingin%20tanya%20layanan%20trade-in%20mobil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Trade-In & Penilaian Mobil
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6581234567?text=Halo%20Apex%20Auto,%20saya%20ingin%20konsultasi%20perpanjangan%20COE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Konsultasi Pembaruan COE
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-2xl leading-relaxed">
            *Catatan: Semua harga tertera dalam Dolar Singapura (SGD) dan sudah mencakup pajak GST serta transfer kepemilikan LTA sesuai regulasi yang berlaku di Singapura. Nilai depresiasi tahunan merupakan estimasi berdasarkan masa berlaku COE dan nilai PARF rebate saat jatuh tempo.
          </p>
          <p className="shrink-0 text-center md:text-right">
            &copy; {new Date().getFullYear()} Apex Auto Singapore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
