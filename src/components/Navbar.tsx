'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/tentang-kami', label: 'About Us' },
  { href: '/promotions', label: 'Service' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-zinc-200 text-zinc-900'
          : 'bg-transparent border-b border-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand — wordmark only */}
          <Link href="/" className="text-base font-bold tracking-[0.15em] uppercase">
            Apex Auto
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors ${
                    isActive
                      ? scrolled
                        ? 'text-zinc-900 font-semibold'
                        : 'text-white font-semibold'
                      : scrolled
                        ? 'text-zinc-500 hover:text-zinc-900'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="block h-0.5 mt-0.5 rounded-full bg-amber-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-zinc-700 hover:bg-zinc-100' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 pb-4 space-y-1 bg-white border-t border-zinc-100">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-amber-600 bg-amber-50/50 rounded-lg'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {link.label}
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-300'}`} />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
