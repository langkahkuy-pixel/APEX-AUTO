import React from 'react';
import Link from 'next/link';
import { ShieldCheck, LogIn } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/apexautosg',
    ariaLabel: 'Apex Auto on Facebook',
    hoverClasses:
      'hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 hover:shadow-[0_4px_12px_rgba(24,119,242,0.2)]',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/apexautosg',
    ariaLabel: 'Apex Auto on Instagram',
    hoverClasses:
      'hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:bg-[#E4405F]/10 hover:shadow-[0_4px_12px_rgba(228,64,95,0.2)]',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/6581234567?text=Hello%20Apex%20Auto%2C%20I%20would%20like%20to%20inquire%20about%20your%20vehicles%20and%20services.',
    ariaLabel: 'Chat with Apex Auto on WhatsApp',
    hoverClasses:
      'hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:shadow-[0_4px_12px_rgba(37,211,102,0.2)]',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 1.892.524 3.662 1.434 5.176L2 22l4.981-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.99 14.195c-.21.588-1.043 1.09-1.463 1.134-.396.042-.907.062-2.94-.78-2.443-1.01-4.01-3.5-4.133-3.662-.12-.164-.99-1.317-.99-2.513 0-1.196.63-1.782.855-2.025.225-.243.49-.304.654-.304.163 0 .327.002.47.009.15.008.352-.057.55.421.21.503.714 1.745.776 1.872.062.128.103.277.02.44-.082.164-.124.266-.247.41-.122.143-.257.32-.367.43-.122.123-.25.257-.107.503.143.245.637 1.05 1.368 1.701.94.838 1.734 1.097 1.98 1.22.245.123.388.103.53-.062.144-.164.614-.716.778-.962.163-.245.327-.205.552-.123.225.082 1.433.676 1.679.799.245.123.409.184.47.287.062.102.062.593-.147 1.181z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export function Footer({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t transition-colors ${
        isDark
          ? 'border-zinc-800/80 bg-zinc-950 text-zinc-400'
          : 'border-zinc-200 bg-[#FAFAFA] text-zinc-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Top row: brand + tagline & nav */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <Link
              href="/"
              className={`text-sm font-bold tracking-[0.15em] uppercase ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              Apex Auto
            </Link>
            <p className={`text-xs mt-1 max-w-sm ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Singapore&apos;s premier destination for curated luxury, sports, and exotic automobiles.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {[
              { href: '/inventory', label: 'Inventory' },
              { href: '/', label: 'Featured' },
              { href: '/promotions', label: 'Service' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              id="footer-login-btn"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-700/80 hover:border-amber-500/50 shadow-sm'
                  : 'bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 border-zinc-200 hover:border-amber-500/50 shadow-2xs'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-amber-500" />
              <span>Login</span>
            </Link>
          </nav>
        </div>

        {/* Bottom row: legal & social links */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t text-xs ${
            isDark ? 'border-zinc-800/80 text-zinc-500' : 'border-zinc-200 text-zinc-400'
          }`}
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Apex Auto. All rights reserved.</p>
            <span className="hidden sm:inline opacity-30">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
              LTA Licensed Motor Dealer
            </span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span>UEN: 202012345A</span>
            <span className="hidden sm:inline opacity-30">•</span>
            <Link
              href="/login"
              className={`hover:underline transition-colors ${
                isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              Staff Portal
            </Link>
          </div>

          {/* Social media icons */}
          <div className="flex items-center gap-2.5">
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider ${
                isDark ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              Follow Us
            </span>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  title={item.name}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    isDark
                      ? 'bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-white'
                      : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 shadow-2xs'
                  } ${item.hoverClasses}`}
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

