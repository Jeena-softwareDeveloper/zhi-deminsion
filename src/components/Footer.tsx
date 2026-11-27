import React from 'react';
import Link from 'next/link';
import { ZhiLogo } from './ZhiLogo';
import { Phone, Mail, Clock, ChevronRight, MessageSquare } from 'lucide-react';
import { BRAND_INFO, CATEGORY_DETAILS, getWhatsAppUrl } from '@/lib/brand';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#EFF6FF] to-[#DFECFF] text-slate-700 pt-12 pb-24 md:pb-10 border-t border-blue-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="space-y-3.5">
            <ZhiLogo variant="light" showTagline />
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              An independent product manufacturing brand developing practical, reliable solutions for agriculture, residential and industrial applications through bulk orders.
            </p>
          </div>

          {/* Product Applications */}
          <div>
            <h4 className="text-[#0B1320] font-extrabold mb-4 uppercase tracking-wider text-xs">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORY_DETAILS.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={cat.href}
                    className="text-slate-700 hover:text-[#0052CC] font-medium transition-colors flex items-center space-x-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#0052CC]" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-slate-700 hover:text-[#0052CC] font-medium transition-colors flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>All Products</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[#0B1320] font-extrabold mb-4 uppercase tracking-wider text-xs">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/" className="text-slate-700 hover:text-[#0052CC] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-700 hover:text-[#0052CC] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-700 hover:text-[#0052CC] transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-700 hover:text-[#0052CC] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#15803D] hover:text-[#166534] font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire for Bulk Orders</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Sales Contact */}
          <div>
            <h4 className="text-[#0B1320] font-extrabold mb-4 uppercase tracking-wider text-xs">
              Sales &amp; Bulk Enquiries
            </h4>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                <span>{BRAND_INFO.phoneDisplay} ({BRAND_INFO.location})</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#0052CC] shrink-0" />
                <span>{BRAND_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#0052CC] shrink-0" />
                <span>{BRAND_INFO.hours}</span>
              </div>
              <div className="pt-1">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-200/90 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} {BRAND_INFO.name}. {BRAND_INFO.tagline}
          </p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <Link href="/about" className="hover:text-[#0052CC] transition-colors">
              About ZHI DIMENSION
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#0052CC] transition-colors">
              Contact Sales
            </Link>
            <span>•</span>
            <Link href="/admin" className="text-[#0052CC] hover:text-[#003D99] font-semibold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
