export interface AdminInquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  carId: string;
  carName: string;
  carPriceSGD: number;
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
    id: 'inq-sg-001',
    customerName: 'Kenjiro Tanaka',
    phone: '+6591234567',
    email: 'kenjiro@sgmail.com',
    carId: 'car-001',
    carName: 'Porsche 911 Carrera S (2022)',
    carPriceSGD: 488000,
    message: 'Saya berminat test drive di cabang Leng Kee akhir pekan ini. Apakah COE ready dan unit 1-owner?',
    tradeInCar: 'BMW M2 Coupe (2019)',
    loanType: 'bank_loan',
    preferredContact: 'whatsapp',
    status: 'new',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    salesAssigned: 'Marcus Tan (Senior Specialist)',
    branch: 'Apex Auto Flagship @ Leng Kee',
  },
  {
    id: 'inq-sg-002',
    customerName: 'Amanda Wijaya',
    phone: '+6582345678',
    email: 'amanda.w@bizsg.com',
    carId: 'car-002',
    carName: 'Mercedes-Benz E200 Avantgarde (2023)',
    carPriceSGD: 268000,
    message: 'Apakah ada program DP promo 0% atau subsidi bunga loan 1.88% untuk unit ini?',
    tradeInCar: 'None',
    loanType: 'in_house_finance',
    preferredContact: 'whatsapp',
    status: 'new',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    salesAssigned: 'Jessica Lee (Finance Lead)',
    branch: 'Apex Auto Experience Centre @ Ubi',
  },
  {
    id: 'inq-sg-003',
    customerName: 'David Lim',
    phone: '+6598765432',
    email: 'davidlim@techgroup.sg',
    carId: 'car-003',
    carName: 'BMW M4 Competition Coupe (2022)',
    carPriceSGD: 395000,
    message: 'Bisa minta copy logbook inspeksi STA / Vicom grade dan riwayat service PML resmi?',
    tradeInCar: 'Audi S5 Sportback (2020)',
    loanType: 'cash',
    preferredContact: 'whatsapp',
    status: 'contacted',
    createdAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    salesAssigned: 'Alvin Tan (Principal)',
    branch: 'Apex Auto Prestige Hub @ Sin Ming',
  },
  {
    id: 'inq-sg-004',
    customerName: 'Siti Rahma',
    phone: '+6587654321',
    email: 'siti.rahma@exportcar.id',
    carId: 'car-005',
    carName: 'Toyota Vellfire 2.5 ZG Hybrid (2023)',
    carPriceSGD: 245000,
    message: 'Apakah bisa dibantu ekspor dan pengurusan dokumen pengiriman de-registration LTA ke Batam/Jakarta?',
    tradeInCar: 'None',
    loanType: 'cash',
    preferredContact: 'whatsapp',
    status: 'scheduled_test_drive',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    salesAssigned: 'Budi Santoso (Regional Sales)',
    branch: 'Apex Auto Flagship @ Leng Kee',
  },
  {
    id: 'inq-sg-005',
    customerName: 'Bryan Chen',
    phone: '+6593456789',
    email: 'bchen@singnet.com.sg',
    carId: 'car-004',
    carName: 'Audi RS6 Avant Quattro (2021)',
    carPriceSGD: 428000,
    message: 'Apakah velg dan exhaust Akrapovic di unit ini sudah LTA compliant / certified?',
    tradeInCar: 'Porsche Macan GTS (2018)',
    loanType: 'bank_loan',
    preferredContact: 'whatsapp',
    status: 'contacted',
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    salesAssigned: 'Marcus Tan (Senior Specialist)',
    branch: 'Apex Auto Experience Centre @ Ubi',
  },
  {
    id: 'inq-sg-006',
    customerName: 'Evelyn Neo',
    phone: '+6584567890',
    email: 'evelyn.neo@lawsg.org',
    carId: 'car-007',
    carName: 'Lexus RX350 Luxury (2023)',
    carPriceSGD: 285000,
    message: 'Unit ready stock untuk serah terima bulan ini sebelum libur sekolah?',
    tradeInCar: 'None',
    loanType: 'cash',
    preferredContact: 'whatsapp',
    status: 'deal_closed',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    salesAssigned: 'Jessica Lee (Finance Lead)',
    branch: 'Apex Auto Prestige Hub @ Sin Ming',
  },
];
