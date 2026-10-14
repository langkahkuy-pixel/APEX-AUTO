export interface AdminInquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  carId: string;
  carName: string;
  carPriceIDR: number;
  message: string;
  tradeInCar?: string;
  loanType?: 'cash' | 'bank_loan' | 'in_house_finance';
  preferredContact: 'whatsapp' | 'call' | 'email';
  status: 'new' | 'contacted' | 'scheduled_test_drive' | 'deal_closed' | 'cancelled';
  createdAt: string;
  salesAssigned: string;
  branch: string;
}

export const MOCK_INQUIRIES: AdminInquiry[] = [
  {
    "id": "inq-sg-001",
    "customerName": "Budi Santoso",
    "phone": "+6281200000001",
    "email": "pelanggan1@example.com",
    "carId": "car-001",
    "carName": "Mercedes-Benz E-Class E200 Avantgarde (2022)",
    "carPriceIDR": 885000000,
    "message": "Saya ingin melihat unit dan memeriksa STNK/BPKB. Apakah bisa dijadwalkan kunjungan akhir pekan?",
    "tradeInCar": "BMW M2 Coupe (2019)",
    "loanType": "bank_loan",
    "preferredContact": "whatsapp",
    "status": "new",
    "createdAt": "2026-10-14T09:36:26.350Z",
    "salesAssigned": "Budi (Konsultan Penjualan)",
    "branch": "Apex Auto Medan"
  },
  {
    "id": "inq-sg-002",
    "customerName": "Dewi Anggraini",
    "phone": "+6281200000002",
    "email": "pelanggan2@example.com",
    "carId": "car-002",
    "carName": "Porsche Macan 2.0 PDK (2023)",
    "carPriceIDR": 1650000000,
    "message": "Mohon simulasi kredit dengan DP 30% dan tenor 48 bulan, termasuk rincian asuransi dan biaya administrasi.",
    "tradeInCar": "Tidak ada",
    "loanType": "in_house_finance",
    "preferredContact": "whatsapp",
    "status": "new",
    "createdAt": "2026-10-14T08:51:26.351Z",
    "salesAssigned": "Dewi (Konsultan Penjualan)",
    "branch": "Apex Auto Medan"
  },
  {
    "id": "inq-sg-003",
    "customerName": "Andi Wijaya",
    "phone": "+6281200000003",
    "email": "pelanggan3@example.com",
    "carId": "car-003",
    "carName": "BMW 3 Series 320i M Sport (2021)",
    "carPriceIDR": 685000000,
    "message": "Bisa kirim riwayat servis dan hasil pemeriksaan kondisi mesin serta kaki-kaki?",
    "tradeInCar": "Audi S5 Sportback (2020)",
    "loanType": "cash",
    "preferredContact": "whatsapp",
    "status": "contacted",
    "createdAt": "2026-10-14T06:51:26.351Z",
    "salesAssigned": "Budi (Konsultan Penjualan)",
    "branch": "Apex Auto Medan"
  },
  {
    "id": "inq-sg-004",
    "customerName": "Siti Rahma",
    "phone": "+6281200000004",
    "email": "pelanggan4@example.com",
    "carId": "car-005",
    "carName": "Tesla Model Y Long Range AWD (2023)",
    "carPriceIDR": 895000000,
    "message": "Saya berencana membeli tunai. Apakah showroom dapat membantu proses balik nama setelah transaksi?",
    "tradeInCar": "Tidak ada",
    "loanType": "cash",
    "preferredContact": "whatsapp",
    "status": "scheduled_test_drive",
    "createdAt": "2026-10-13T09:51:26.351Z",
    "salesAssigned": "Dewi (Konsultan Penjualan)",
    "branch": "Apex Auto Medan"
  },
  {
    "id": "inq-sg-005",
    "customerName": "Rizky Pratama",
    "phone": "+6281200000005",
    "email": "pelanggan5@example.com",
    "carId": "car-004",
    "carName": "Toyota Harrier 2.5 Hybrid Premium (2022)",
    "carPriceIDR": 625000000,
    "message": "Saya ingin tukar tambah mobil lama. Mohon informasi penilaian dan pelunasan sisa kredit.",
    "tradeInCar": "Porsche Macan GTS (2018)",
    "loanType": "bank_loan",
    "preferredContact": "whatsapp",
    "status": "contacted",
    "createdAt": "2026-10-12T21:51:26.351Z",
    "salesAssigned": "Budi (Konsultan Penjualan)",
    "branch": "Apex Auto Medan"
  },
  {
    "id": "inq-sg-006",
    "customerName": "Lina Siregar",
    "phone": "+6281200000006",
    "email": "pelanggan6@example.com",
    "carId": "car-007",
    "carName": "Toyota Alphard 2.5SC Executive Lounge (2021)",
    "carPriceIDR": 1150000000,
    "message": "Apakah unit siap serah terima minggu ini? Mohon konfirmasi kelengkapan dokumen dan pajak.",
    "tradeInCar": "Tidak ada",
    "loanType": "cash",
    "preferredContact": "whatsapp",
    "status": "deal_closed",
    "createdAt": "2026-10-12T09:51:26.351Z",
    "salesAssigned": "Dewi (Konsultan Penjualan)",
    "branch": "Apex Auto Medan"
  }
];
