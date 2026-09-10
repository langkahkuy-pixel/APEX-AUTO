import { PromoItem } from '@/types/promo';

export const MOCK_PROMOS: PromoItem[] = [
  {
    id: 'promo-coe-rebate',
    slug: 'coe-bidding-subsidy-cashback-15000',
    title: 'COE Bidding Subsidy & Cash Rebate Up to S$15,000',
    tagline: 'Subsidized COE bidding and renewal incentives on selected marquee luxury vehicles.',
    badge: 'COE SPECIAL 2026',
    discount_sgd: 15000,
    description:
      'Take advantage of this exclusive Apex Auto incentive to lower your total cost of vehicle ownership. Purchase any eligible Mercedes-Benz, BMW, or Porsche this month to receive a direct COE rebate of up to S$15,000 and complimentary scheduled maintenance.',
    benefits: [
      'Direct COE bidding / renewal subsidy up to SGD $15,000',
      'Complimentary 3-year scheduled servicing package at Leng Kee authorized workshop',
      'Full waiver of LTA ownership transfer fee with zero administrative charges',
      'Comprehensive 24-month warranty coverage on engine & drivetrain',
    ],
    terms_conditions: [
      'Applicable to inventory vehicles designated with the "COE Special" tag.',
      'Cannot be combined with other ongoing cash discount promotions.',
      'Subject to monthly promotional vehicle quota availability.',
    ],
    valid_until: '31 October 2026',
    image_url:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    highlight_color: 'amber',
    cta_text: 'Claim S$15,000 COE Subsidy',
    cta_whatsapp_text:
      'Hello Apex Auto, I would like to claim the COE Subsidy & Rebate of up to S$15,000 for showroom inventory.',
    is_featured: true,
  },
  {
    id: 'promo-low-interest-driveaway',
    slug: 'low-interest-financing-driveaway',
    title: '1.88% p.a. Preferential Interest Rate & Low Driveaway Down Payment',
    tagline: 'Seamless financing solutions partnered with DBS, OCBC, and UOB with 24-hour approval.',
    badge: 'FINANCING PROMO',
    discount_sgd: 6500,
    description:
      'Drive away your dream vehicle with competitive financing terms. Enjoy a promotional 1.88% flat annual rate with flexible loan tenures up to 7 years and instant credit approval facilities for Citizens, Permanent Residents, and Employment Pass holders.',
    benefits: [
      'Competitive financing interest rate starting from 1.88% p.a. flat',
      'Rapid credit assessment and approval within 24 business hours',
      'Flexible financing tenure options from 1 to 7 years',
      'Complimentary first-year comprehensive motor insurance valued up to SGD $2,500',
    ],
    terms_conditions: [
      'Subject to credit evaluation and approval by partner banking institutions.',
      'Applicable across all certified luxury and pre-owned showroom inventory.',
    ],
    valid_until: '15 November 2026',
    image_url:
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=80',
    highlight_color: 'emerald',
    cta_text: 'Calculate 1.88% Loan Simulation',
    cta_whatsapp_text:
      'Hello Apex Auto, I am interested in a loan financing simulation at 1.88% p.a.',
    is_featured: true,
  },
  {
    id: 'promo-tradein-bonus',
    slug: 'trade-in-bonus-5000',
    title: 'Trade-In Privilege: Additional S$5,000 Over Market Valuation',
    tagline: 'Consign or trade in your existing vehicle with highest market appraisal and instant bonus.',
    badge: 'TRADE-IN SPECIAL',
    discount_sgd: 5000,
    description:
      'Upgrade your drive seamlessly at Apex Auto. Our valuation specialists provide transparent appraisals within 30 minutes, backed by an immediate SGD $5,000 trade-in bonus applied directly toward your new vehicle purchase.',
    benefits: [
      'Immediate SGD $5,000 bonus above certified market valuation',
      '30-minute rapid vehicle inspection and appraisal on-site or at our showroom',
      'Zero administrative fees for ownership transfer and existing bank loan settlement',
      'Same-day driveaway option for replacement vehicle',
    ],
    terms_conditions: [
      'Existing vehicle must be roadworthy and officially registered with LTA.',
      'Final appraisal determined upon comprehensive on-site physical inspection.',
    ],
    valid_until: '31 December 2026',
    image_url:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    highlight_color: 'purple',
    cta_text: 'Register Vehicle Trade-In',
    cta_whatsapp_text:
      'Hello Apex Auto, I would like to trade in my current vehicle with the additional S$5,000 bonus.',
    is_featured: false,
  },
  {
    id: 'promo-ev-green-rebate',
    slug: 'ev-green-mobility-rebate',
    title: 'Green Mobility: Complimentary Home Wallbox & 1-Year Charging Credits',
    tagline: 'Eco-friendly EV adoption incentive for Tesla Model Y and premium electrified models.',
    badge: 'EV REBATE 2026',
    discount_sgd: 3800,
    description:
      'Embrace zero-emission performance with the curated electric collection at Apex Auto. Receive a complimentary 11kW smart home wallbox charger installed at your residence, plus one full year of public charging network credits.',
    benefits: [
      'Complimentary 11kW Smart Home Wallbox Charger with installation (worth S$2,500)',
      '1-Year SP Mobility / Shell Recharge charging voucher valued at S$1,300',
      'Factory battery & drive unit warranty up to 8 years or 160,000 km',
      'Complimentary residential electrical assessment by certified EV engineers',
    ],
    terms_conditions: [
      'Applicable exclusively to 100% Electric Vehicles (EVs).',
      'Wallbox installation subject to property management (MCST/LTA) approval.',
    ],
    valid_until: '25 November 2026',
    image_url:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
    highlight_color: 'sky',
    cta_text: 'Claim EV Green Mobility Package',
    cta_whatsapp_text:
      'Hello Apex Auto, I would like to inquire about the Green Mobility EV package with complimentary home charger.',
    is_featured: false,
  },
];
