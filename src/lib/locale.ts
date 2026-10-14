/** Identitas dan kontak contoh untuk demo Apex Auto Indonesia. */
export const SHOWROOM = {
  name: 'Apex Auto Medan',
  address: 'Jl. Ring Road No. 88, Medan, Sumatera Utara',
  postalCode: '20122',
  phone: '+62 812-0000-0000',
  whatsapp: '6281200000000',
  hours: 'Senin–Sabtu 09.00–18.00 WIB · Minggu 10.00–16.00 WIB',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Ring+Road+Medan+Sumatera+Utara',
} as const;

export function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
  }).format(value).replace(/\u00a0/g, ' ');
}

export function formatNumber(value: number) {
  return value.toLocaleString('id-ID');
}

export function formatDate(value?: string) {
  if (!value) return 'Konfirmasi ke showroom';
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00+07:00` : value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${SHOWROOM.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function localizeVehicleValue(value: string) {
  const labels: Record<string, string> = {
    Automatic: 'Otomatis', Manual: 'Manual', Petrol: 'Bensin', Diesel: 'Diesel',
    Hybrid: 'Hibrida', Electric: 'Listrik', Sports: 'Sport', Convertible: 'Cabriolet',
    'Station Wagon': 'Wagon', All: 'Semua', 'All Locations': 'Semua lokasi',
    'Obsidian Black Metallic': 'Hitam Metalik', 'Carrara White Metallic': 'Putih Metalik',
    'Portimao Blue Metallic': 'Biru Metalik', 'Precious Black Pearl': 'Hitam Mutiara',
    'Solid Black': 'Hitam', 'Daytona Grey Pearl': 'Abu-abu Mutiara',
    'Luxury White Pearl': 'Putih Mutiara', 'Ignite Red Metallic': 'Merah Metalik',
    'Guards Red': 'Merah', 'Mineral White Metallic': 'Putih Metalik',
    'Navarra Blue Metallic': 'Biru Metalik', 'Crystal White Pearl': 'Putih Mutiara',
    'Kings Red Metallic': 'Merah Metalik', 'Mountain Grey Metallic': 'Abu-abu Metalik',
    'Glacier White Metallic': 'Putih Metalik', 'Obsidian Black': 'Hitam', Black: 'Hitam',
    bank_loan: 'Kredit bank/leasing', in_house_finance: 'Kredit leasing', cash: 'Tunai',
  };
  return labels[value] || value;
}

export function localizeStatus(value: string) {
  const labels: Record<string, string> = { available: 'Tersedia', reserved: 'Dipesan', sold: 'Terjual', new: 'Baru', contacted: 'Sudah dihubungi', scheduled_test_drive: 'Kunjungan dijadwalkan', deal_closed: 'Transaksi selesai', cancelled: 'Dibatalkan' };
  return labels[value] || value;
}
