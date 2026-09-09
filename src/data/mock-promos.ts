import { PromoItem } from '@/types/promo';

export const MOCK_PROMOS: PromoItem[] = [
  {
    id: 'promo-coe-rebate',
    slug: 'subsidi-coe-cashback-15000',
    title: 'Subsidi Lelang COE & Cashback Hingga S$15,000',
    tagline: 'Keringanan biaya lelang & perpanjangan COE Singapura untuk deretan mobil premium terpilih.',
    badge: 'COE SPECIAL 2026',
    discount_sgd: 15000,
    description:
      'Manfaatkan promo eksklusif Apex Auto SG untuk memangkas biaya pemilikan kendaraan di Singapura. Setiap pembelian unit Mercedes-Benz, BMW, atau Porsche terpilih bulan ini berhak mendapatkan subsidi langsung COE senilai hingga S$15,000 dan paket perawatan mesin gratis.',
    benefits: [
      'Subsidi lelang / perpanjangan COE langsung hingga SGD $15,000',
      'Gratis paket servis berkala 3 tahun di workshop rekanan resmi Leng Kee',
      'Gratis pengurusan balik nama LTA transfer fee tanpa biaya administrasi tambahan',
      'Garansi komprehensif 24 bulan untuk mesin & transmisi',
    ],
    terms_conditions: [
      'Berlaku untuk unit kendaraan berlabel "COE Special" di katalog kami.',
      'Tidak dapat digabungkan dengan promo potongan diskon tunai lainnya.',
      'Berlaku selama kuota unit promo masih tersedia.',
    ],
    valid_until: '31 Oktober 2026',
    image_url:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    highlight_color: 'amber',
    cta_text: 'Klaim Subsidi COE S$15,000',
    cta_whatsapp_text:
      'Halo Apex Auto SG, saya ingin mengklaim promo Subsidi COE & Cashback hingga S$15,000 untuk unit mobil showroom.',
    is_featured: true,
  },
  {
    id: 'promo-low-interest-driveaway',
    slug: 'bunga-kredit-188-persen-financing',
    title: 'Bunga Kredit Rendah 1.88% p.a. & Skema Driveaway DP Ringan',
    tagline: 'Solusi pembiayaan bermitra dengan DBS, OCBC, dan UOB Singapura dengan proses persetujuan 24 jam.',
    badge: 'FINANCING PROMO',
    discount_sgd: 6500,
    description:
      'Miliki mobil impian Anda dengan skema pembiayaan paling bersahabat di Singapura. Dapatkan bunga spesial 1.88% flat per tahun dengan tenor fleksibel hingga 7 tahun dan fasilitas persetujuan kredit instan untuk warga lokal (Citizen/PR) maupun pemegang Employment Pass.',
    benefits: [
      'Suku bunga pembiayaan terendah mulai 1.88% p.a. flat',
      'Persetujuan kredit cepat dalam waktu 24 jam kerja',
      'Tenor pembiayaan fleksibel dari 1 hingga 7 tahun',
      'Gratis asuransi kendaraan komprehensif tahun pertama bernilai hingga SGD $2,500',
    ],
    terms_conditions: [
      'Berdasarkan persetujuan kelayakan kredit oleh institusi perbankan mitra Singapura.',
      'Berlaku untuk seluruh unit mobil pre-owned dan certified luxury.',
    ],
    valid_until: '15 November 2026',
    image_url:
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80',
    highlight_color: 'emerald',
    cta_text: 'Simulasi Cicilan Bunga 1.88%',
    cta_whatsapp_text:
      'Halo Apex Auto SG, saya tertarik dengan simulasi kredit pembiayaan mobil bunga 1.88% p.a.',
    is_featured: true,
  },
  {
    id: 'promo-tradein-bonus',
    slug: 'trade-in-ekstra-bonus-5000',
    title: 'Trade-In Bonus: Tambahan S$5,000 Di Atas Penilaian Pasar',
    tagline: 'Jual atau tukar tambah kendaraan lama Anda dengan nilai appraisal tertinggi dan bonus tunai.',
    badge: 'TRADE-IN SPECIAL',
    discount_sgd: 5000,
    description:
      'Tukar tambah mobil lama Anda di Apex Auto Singapore tanpa ribet. Tim evaluator kami memberikan estimasi nilai transparan dalam 30 menit dan menambahkan ekstra bonus SGD $5,000 yang langsung dipotongkan ke harga unit kendaraan baru Anda.',
    benefits: [
      'Bonus langsung SGD $5,000 di atas hasil inspeksi nilai pasar',
      'Inspeksi & appraisal kendaraan instan hanya 30 menit di lokasi Anda / showroom',
      'Bebas biaya administrasi pelepasan hak kepemilikan dan pelunasan sisa cicilan bank',
      'Bisa langsung bawa pulang unit pengganti di hari yang sama',
    ],
    terms_conditions: [
      'Mobil lama harus berstatus layak jalan dan teregistrasi resmi di LTA Singapura.',
      'Appraisal final ditentukan setelah inspeksi fisik menyeluruh di showroom.',
    ],
    valid_until: '31 Desember 2026',
    image_url:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    highlight_color: 'purple',
    cta_text: 'Daftar Tukar Tambah Mobil',
    cta_whatsapp_text:
      'Halo Apex Auto SG, saya ingin melakukan trade-in mobil lama saya dengan bonus ekstra S$5,000.',
    is_featured: false,
  },
  {
    id: 'promo-ev-green-rebate',
    slug: 'subsidi-ev-wallbox-charging-gratis',
    title: 'Green Mobility: Home Wallbox Gratis & Subsidi Charging 1 Tahun',
    tagline: 'Insentif mobilitas listrik ramah lingkungan untuk pembelian Tesla Model Y & Porsche Taycan.',
    badge: 'EV REBATE 2026',
    discount_sgd: 3800,
    description:
      'Beralih ke performa listrik tanpa emisi bersama deretan EV premium di Apex Auto SG. Nikmati perangkat home charger pintar 11kW terinstal gratis di rumah atau kondominium Anda plus kuota charging publik jaringan Singapura selama 1 tahun penuh.',
    benefits: [
      'Gratis instalasi Home Wallbox Charger 11kW (senilai S$2,500)',
      'Voucher charging SP Mobility / Shell Recharge 1 tahun senilai S$1,300',
      'Garansi baterai & drive unit hingga 8 tahun atau 160,000 km',
      'Konsultasi teknis kelistrikan residensi gratis oleh teknisi tersertifikasi',
    ],
    terms_conditions: [
      'Berlaku khusus pembelian unit 100% Electric Vehicle (EV).',
      'Instalasi wallbox mengikuti izin teknis manajemen properti (MCST/LTA).',
    ],
    valid_until: '25 November 2026',
    image_url:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
    highlight_color: 'sky',
    cta_text: 'Ambil Paket EV Green Mobility',
    cta_whatsapp_text:
      'Halo Apex Auto SG, saya tertarik dengan penawaran paket Green Mobility EV gratis wallbox charger.',
    is_featured: false,
  },
];
