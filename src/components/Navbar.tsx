'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ZhiLogo } from './ZhiLogo';
import {
  Menu,
  X,
  MessageSquare,
  MapPin,
  Phone,
  ArrowRight,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { BRAND_INFO, getWhatsAppUrl } from '@/lib/brand';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Products', href: '/products' },
  { label: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F4F8FF]/95 backdrop-blur-md border-b border-blue-200/80 shadow-xs">
      {/* Top Light Blue Contact & Location Utility Bar */}
      <div className="bg-[#DCEBFF] text-[#0B2249] text-[11px] sm:text-xs border-b border-blue-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-1.5 sm:gap-2 font-semibold truncate">
            <MapPin className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
            <span className="truncate">{BRAND_INFO.location}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={`tel:${BRAND_INFO.whatsappNumber}`}
              className="inline-flex items-center gap-1.5 hover:text-[#0052CC] transition-colors font-semibold whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
              <span>{BRAND_INFO.phoneDisplay}</span>
            </a>

            <span className="hidden sm:inline text-blue-300">|</span>

            <div className="hidden sm:flex items-center gap-3 text-[#1E3A5F]">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#0052CC] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#0052CC] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-[#0052CC] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main White Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <ZhiLogo variant="light" />

        {/* Desktop Nav Links + WhatsApp Bulk Order CTA */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-5 lg:gap-7">
            {NAV_ITEMS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#0052CC]'
                      : 'text-slate-700 hover:text-[#0052CC]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-[13px] font-bold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Enquire for Bulk Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-[#0B1320] rounded-lg hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#0052CC]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 bg-[#15803D] hover:bg-[#166534] text-white text-sm font-bold rounded-lg inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Enquire for Bulk Orders</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
