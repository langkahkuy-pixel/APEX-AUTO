import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Footer({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';

  return (
    <footer className={`border-t transition-colors ${isDark ? 'border-zinc-800/80 bg-zinc-950 text-zinc-400' : 'border-zinc-200 bg-[#FAFAFA] text-zinc-600'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Top row: brand + nav */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <Link href="/" className={`text-sm font-bold tracking-[0.15em] uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Apex Auto
          </Link>
          <nav className="flex flex-wrap items-center gap-6">
            {[
              { href: '/inventory', label: 'Inventory' },
              { href: '/', label: 'Featured' },
              { href: '/promotions', label: 'Promotions' },
              { href: '/tentang-kami', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-zinc-700'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row: legal */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t text-xs ${isDark ? 'border-zinc-800/80 text-zinc-500' : 'border-zinc-200 text-zinc-400'}`}>
          <p>&copy; {new Date().getFullYear()} Apex Auto. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className={`w-3 h-3 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
              LTA Licensed Motor Dealer
            </span>
            <span>UEN: 202012345A</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

