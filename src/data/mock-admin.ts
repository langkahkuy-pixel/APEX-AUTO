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
    name: 'Apex Auto Flagship @ Leng Kee',
    address: '24 Leng Kee Road, Singapore',
    postalCode: '159096',
    zone: 'South / Central Prime Automotive Belt',
    phone: '+65 6789 0123',
    whatsapp: '+6581234567',
    operatingHours: 'Senin - Minggu: 09:00 - 19:00 SGT',
    displayUnitsCount: 14,
    picName: 'Marcus Tan',
    picPhone: '+6581234567',
    status: 'active',
  },
  {
    id: 'branch-ubi',
    name: 'Apex Auto Experience Centre @ Ubi',
    address: '81 Ubi Avenue 4, #01-08 UB.One',
    postalCode: '408830',
    zone: 'East Singapore Automotive Hub',
    phone: '+65 6890 1234',
    whatsapp: '+6582345678',
    operatingHours: 'Senin - Sabtu: 09:30 - 18:30 SGT',
    displayUnitsCount: 9,
    picName: 'Jessica Lee',
    picPhone: '+6582345678',
    status: 'active',
  },
  {
    id: 'branch-sin-ming',
    name: 'Apex Auto Prestige Hub @ Sin Ming',
    address: '160 Sin Ming Drive, #03-12',
    postalCode: '575722',
    zone: 'North-Central Prestige Specialist Hub',
    phone: '+65 6901 2345',
    whatsapp: '+6583456789',
    operatingHours: 'Senin - Minggu: 10:00 - 18:00 SGT',
    displayUnitsCount: 6,
    picName: 'Alvin Tan',
    picPhone: '+6583456789',
    status: 'active',
  },
];

export interface ShowroomOverviewStats {
  totalUnits: number;
  availableUnits: number;
  reservedUnits: number;
  soldUnits: number;
  totalValuationSGD: number;
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
  const totalValuationSGD = MOCK_CARS.reduce((acc, c) => acc + c.price, 0);
  const activePromosCount = MOCK_PROMOS.length;
  const totalInquiriesCount = MOCK_INQUIRIES.length;
  const pendingInquiriesCount = MOCK_INQUIRIES.filter((i) => i.status === 'new').length;

  return {
    totalUnits,
    availableUnits,
    reservedUnits,
    soldUnits,
    totalValuationSGD,
    activePromosCount,
    totalInquiriesCount,
    pendingInquiriesCount,
    branchesCount: MOCK_BRANCHES.length,
  };
}

export { MOCK_CARS, MOCK_PROMOS, MOCK_INQUIRIES };
