import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Apex Auto | Leng Kee Flagship Showroom',
  description:
    'Discover Apex Auto, Singapore\'s luxury automobile showroom. Learn about our certified inspections, visit 24 Leng Kee Road, or send an inquiry and schedule a private test drive.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
