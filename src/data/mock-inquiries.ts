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
    message: 'I would like to schedule a private viewing and test drive at your Leng Kee showroom this weekend. Is the COE verified and 1-owner status confirmed?',
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
    message: 'Are there any promotional down payment schemes or 1.88% preferential loan rates available for this unit?',
    tradeInCar: 'None',
    loanType: 'in_house_finance',
    preferredContact: 'whatsapp',
    status: 'new',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    salesAssigned: 'Jessica Lee (Finance Lead)',
    branch: 'Apex Auto Flagship @ Leng Kee',
  },
  {
    id: 'inq-sg-003',
    customerName: 'David Lim',
    phone: '+6598765432',
    email: 'davidlim@techgroup.sg',
    carId: 'car-003',
    carName: 'BMW M4 Competition Coupe (2022)',
    carPriceSGD: 395000,
    message: 'Could you share the STA 100-point inspection logbook and official agent service history?',
    tradeInCar: 'Audi S5 Sportback (2020)',
    loanType: 'cash',
    preferredContact: 'whatsapp',
    status: 'contacted',
    createdAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    salesAssigned: 'Alvin Tan (Principal)',
    branch: 'Apex Auto Flagship @ Leng Kee',
  },
  {
    id: 'inq-sg-004',
    customerName: 'Siti Rahma',
    phone: '+6587654321',
    email: 'siti.rahma@exportcar.id',
    carId: 'car-005',
    carName: 'Toyota Vellfire 2.5 ZG Hybrid (2023)',
    carPriceSGD: 245000,
    message: 'Can your team assist with regional de-registration and LTA export documentation?',
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
    message: 'Are the wheels and exhaust system on this vehicle fully LTA compliant and certified?',
    tradeInCar: 'Porsche Macan GTS (2018)',
    loanType: 'bank_loan',
    preferredContact: 'whatsapp',
    status: 'contacted',
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    salesAssigned: 'Marcus Tan (Senior Specialist)',
    branch: 'Apex Auto Flagship @ Leng Kee',
  },
  {
    id: 'inq-sg-006',
    customerName: 'Evelyn Neo',
    phone: '+6584567890',
    email: 'evelyn.neo@lawsg.org',
    carId: 'car-007',
    carName: 'Lexus RX350 Luxury (2023)',
    carPriceSGD: 285000,
    message: 'Is this vehicle ready for immediate handover this week before the holidays?',
    tradeInCar: 'None',
    loanType: 'cash',
    preferredContact: 'whatsapp',
    status: 'deal_closed',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    salesAssigned: 'Jessica Lee (Finance Lead)',
    branch: 'Apex Auto Flagship @ Leng Kee',
  },
];
