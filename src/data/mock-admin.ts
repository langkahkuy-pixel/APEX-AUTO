import { MOCK_CARS } from './mock-cars';
import { MOCK_PROMOS } from './mock-promos';
import { MOCK_INQUIRIES, AdminInquiry } from './mock-inquiries';
import { Car } from '@/types/car';
import { PromoItem } from '@/types/promo';

export interface ShowroomBranch {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  zone: string;
  phone: string;
  whatsapp: string;
  operatingHours: string;
  displayUnitsCount: number;
  picName: string;
  picPhone: string;
  status: 'active' | 'maintenance';
}

export const MOCK_BRANCHES: ShowroomBranch[] = [
  {
    id: 'branch-leng-kee',
    name: "Apex Auto Medan",
    address: "Jl. Ring Road No. 88, Medan, Sumatera Utara",
    postalCode: '20122',
    zone: "Medan, Sumatera Utara",
    phone: '+62 812-0000-0000',
    whatsapp: '+6281200000000',
    operatingHours: "Senin–Sabtu 09.00–18.00 WIB · Minggu 10.00–16.00 WIB",
    displayUnitsCount: 14,
    picName: 'Budi Santoso',
    picPhone: '+6281200000000',
    status: 'active',
  },
];

export interface ShowroomOverviewStats {
  totalUnits: number;
  availableUnits: number;
  reservedUnits: number;
  soldUnits: number;
  totalValuationIDR: number;
  activePromosCount: number;
  totalInquiriesCount: number;
  pendingInquiriesCount: number;
  branchesCount: number;
}

export function getShowroomOverviewStats(): ShowroomOverviewStats {
  const totalUnits = MOCK_CARS.length;
  const availableUnits = MOCK_CARS.filter((c) => c.status === 'available').length;
  const reservedUnits = MOCK_CARS.filter((c) => c.status === 'reserved').length;
  const soldUnits = MOCK_CARS.filter((c) => c.status === 'sold').length;
  const totalValuationIDR = MOCK_CARS.reduce((acc, c) => acc + c.price, 0);
  const activePromosCount = MOCK_PROMOS.length;
  const totalInquiriesCount = MOCK_INQUIRIES.length;
  const pendingInquiriesCount = MOCK_INQUIRIES.filter((i) => i.status === 'new').length;

  return {
    totalUnits,
    availableUnits,
    reservedUnits,
    soldUnits,
    totalValuationIDR,
    activePromosCount,
    totalInquiriesCount,
    pendingInquiriesCount,
    branchesCount: MOCK_BRANCHES.length,
  };
}

export { MOCK_CARS, MOCK_PROMOS, MOCK_INQUIRIES };
