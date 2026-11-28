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
  Clock,
  Mail,
  ChevronDown,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { BRAND_INFO, CATEGORY_DETAILS, getWhatsAppUrl } from '@/lib/brand';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const isAbout = pathname.startsWith('/about');
  const isProducts = pathname.startsWith('/products');
  const isContact = pathname.startsWith('/contact');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Deep Navy Contact & Location Utility Bar */}
      <div className="bg-[#092456] text-slate-100 text-[11px] sm:text-xs border-b border-blue-950/60">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-1.5 sm:gap-2 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
            <span className="truncate">{BRAND_INFO.location}</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-slate-200 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>{BRAND_INFO.hours}</span>
            </div>

            <span className="hidden md:inline-block h-3.5 w-px bg-white/20" />

            <a
              href={`tel:${BRAND_INFO.whatsappNumber}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>{BRAND_INFO.phoneDisplay}</span>
            </a>

            <span className="hidden sm:inline-block h-3.5 w-px bg-white/20" />

            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>{BRAND_INFO.email}</span>
            </a>

            <span className="hidden lg:inline-block h-3.5 w-px bg-white/20" />

            <div className="hidden lg:flex items-center gap-3 text-slate-200">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main White Navigation Bar */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 h-[68px] flex items-center justify-between gap-4 lg:gap-6">
        <ZhiLogo variant="light" />

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link
            href="/"
            className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-1.5 ${
              isHome ? 'text-[#0052CC]' : 'text-slate-700 hover:text-[#0052CC]'
            }`}
          >
            Home
            {isHome && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC] rounded-full" />
            )}
          </Link>

          <Link
            href="/about"
            className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-1.5 ${
              isAbout ? 'text-[#0052CC]' : 'text-slate-700 hover:text-[#0052CC]'
            }`}
          >
            About Us
            {isAbout && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC] rounded-full" />
            )}
          </Link>

          {/* Our Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsMenuOpen(true)}
            onMouseLeave={() => setProductsMenuOpen(false)}
          >
            <Link
              href="/products"
              className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-1.5 inline-flex items-center gap-1 ${
                isProducts ? 'text-[#0052CC]' : 'text-slate-700 hover:text-[#0052CC]'
              }`}
            >
              <span>Our Products</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsMenuOpen ? 'rotate-180' : ''}`} />
              {isProducts && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC] rounded-full" />
              )}
            </Link>

            {productsMenuOpen && (
              <div className="absolute left-0 top-full pt-2 w-56 z-50 animate-fadeIn">
                <div className="bg-white rounded-xl shadow-xl border border-slate-200 py-2">
                  {CATEGORY_DETAILS.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={cat.href}
                      onClick={() => setProductsMenuOpen(false)}
                      className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#EFF6FF] hover:text-[#0052CC] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="my-1 border-t border-slate-100" />
                  <Link
                    href="/products"
                    onClick={() => setProductsMenuOpen(false)}
                    className="block px-4 py-2 text-xs font-bold text-[#0052CC] hover:bg-[#EFF6FF] transition-colors"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/products?category=Industrial"
            className="text-sm font-semibold whitespace-nowrap text-slate-700 hover:text-[#0052CC] transition-colors py-1.5"
          >
            Industries
          </Link>

          <Link
            href="/contact"
            className={`text-sm font-semibold whitespace-nowrap transition-colors relative py-1.5 ${
              isContact ? 'text-[#0052CC]' : 'text-slate-700 hover:text-[#0052CC]'
            }`}
          >
            Contact Us
            {isContact && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC] rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right Primary WhatsApp CTA */}
        <div className="hidden lg:flex items-center shrink-0">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#157B3F] hover:bg-[#116433] text-white text-[13px] font-bold rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-current shrink-0" />
            <span>Enquire for Bulk Orders</span>
          </a>
        </div>

        {/* Tablet/Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-[#0B1320] rounded-lg hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${
                isHome ? 'bg-[#EFF6FF] text-[#0052CC]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${
                isAbout ? 'bg-[#EFF6FF] text-[#0052CC]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${
                isProducts ? 'bg-[#EFF6FF] text-[#0052CC]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Our Products
            </Link>
            <Link
              href="/products?category=Industrial"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Industries
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${
                isContact ? 'bg-[#EFF6FF] text-[#0052CC]' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 bg-[#157B3F] hover:bg-[#116433] text-white text-sm font-bold rounded-lg inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Enquire for Bulk Orders</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
