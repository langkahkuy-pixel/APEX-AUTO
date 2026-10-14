import type { PromoItem } from '@/types/promo';

// Program contoh untuk demo; syarat dikonfirmasi oleh showroom.
export const MOCK_PROMOS: PromoItem[] = [
  {
    "title": "Potongan Harga hingga Rp25 Juta",
    "tagline": "Penawaran khusus untuk mobil pilihan showroom Medan.",
    "badge": "PROMO MOBIL PILIHAN",
    "discount_idr": 25000000,
    "description": "Dapatkan potongan harga untuk unit yang memenuhi syarat. Tim showroom akan mengonfirmasi harga akhir, kondisi, dokumen, dan rincian biaya sebelum kesepakatan.",
    "benefits": [
      "Potongan harga sesuai unit pilihan",
      "Pemeriksaan kondisi kendaraan",
      "Konsultasi dokumen STNK dan BPKB"
    ],
    "terms_conditions": [
      "Berlaku pada unit bertanda promo.",
      "Nilai potongan mengikuti unit dan stok yang tersedia.",
      "Konfirmasi harga akhir dengan tim showroom sebelum transaksi."
    ],
    "id": "promo-coe-rebate",
    "slug": "promo-mobil-pilihan",
    "valid_until": "31 Desember 2026",
    "image_url": "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    "highlight_color": "amber",
    "cta_text": "Tanya Promo via WhatsApp",
    "cta_whatsapp_text": "Halo Apex Auto Medan, saya ingin informasi tentang Potongan Harga hingga Rp25 Juta.",
    "is_featured": true
  },
  {
    "title": "Konsultasi Kredit dengan DP dan Tenor Pilihan",
    "tagline": "Susun rencana pembelian melalui bank atau leasing sesuai kebutuhan Anda.",
    "badge": "PILIHAN KREDIT",
    "discount_idr": 0,
    "description": "Diskusikan uang muka, tenor, dan angsuran untuk mobil yang Anda minati. Pengajuan mengikuti survei serta persetujuan bank atau perusahaan pembiayaan.",
    "benefits": [
      "Konsultasi DP dan estimasi angsuran",
      "Penjelasan dokumen pengajuan kredit",
      "Rincian asuransi dan biaya administrasi sebelum akad"
    ],
    "terms_conditions": [
      "Pengajuan memerlukan dokumen sesuai ketentuan pembiayaan.",
      "Persetujuan, bunga, DP, dan tenor mengikuti hasil penilaian bank/leasing."
    ],
    "id": "promo-low-interest-driveaway",
    "slug": "kredit-mobil",
    "valid_until": "31 Desember 2026",
    "image_url": "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80",
    "highlight_color": "emerald",
    "cta_text": "Tanya Promo via WhatsApp",
    "cta_whatsapp_text": "Halo Apex Auto Medan, saya ingin informasi tentang Konsultasi Kredit dengan DP dan Tenor Pilihan.",
    "is_featured": true
  },
  {
    "title": "Bonus Tukar Tambah hingga Rp10 Juta",
    "tagline": "Nilai mobil lama Anda dapat digunakan untuk pembelian berikutnya.",
    "badge": "TUKAR TAMBAH",
    "discount_idr": 10000000,
    "description": "Bawa mobil lama untuk diperiksa dan dinilai di showroom. Nilai bersih setelah sisa kredit dapat menjadi bagian dari pembayaran mobil pilihan Anda.",
    "benefits": [
      "Penilaian kondisi dan harga mobil lama",
      "Konsultasi sisa kredit dan dokumen",
      "Bonus sesuai unit dan ketentuan promo"
    ],
    "terms_conditions": [
      "STNK dan BPKB atau dokumen pembiayaan wajib dapat diverifikasi.",
      "Nilai akhir ditetapkan setelah pemeriksaan unit."
    ],
    "id": "promo-tradein-bonus",
    "slug": "bonus-tukar-tambah",
    "valid_until": "31 Desember 2026",
    "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "highlight_color": "purple",
    "cta_text": "Tanya Promo via WhatsApp",
    "cta_whatsapp_text": "Halo Apex Auto Medan, saya ingin informasi tentang Bonus Tukar Tambah hingga Rp10 Juta.",
    "is_featured": false
  },
  {
    "title": "Paket Perawatan Mobil Listrik",
    "tagline": "Kenali kendaraan listrik dan kebutuhan pengisian daya untuk penggunaan harian.",
    "badge": "MOBIL LISTRIK",
    "discount_idr": 5000000,
    "description": "Konsultasikan kondisi baterai, riwayat servis, garansi pabrikan, dan pilihan pemasangan pengisi daya rumah pada unit yang memenuhi syarat.",
    "benefits": [
      "Konsultasi baterai dan garansi unit",
      "Informasi kebutuhan pengisian daya",
      "Manfaat perawatan sesuai unit promo"
    ],
    "terms_conditions": [
      "Berlaku untuk kendaraan listrik pilihan.",
      "Pemasangan pengisi daya mengikuti pemeriksaan instalasi dan persetujuan pemilik tempat."
    ],
    "id": "promo-ev-green-rebate",
    "slug": "perawatan-mobil-listrik",
    "valid_until": "31 Desember 2026",
    "image_url": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    "highlight_color": "sky",
    "cta_text": "Tanya Promo via WhatsApp",
    "cta_whatsapp_text": "Halo Apex Auto Medan, saya ingin informasi tentang Paket Perawatan Mobil Listrik.",
    "is_featured": false
  }
];
