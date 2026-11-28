'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ZhiLogo } from './ZhiLogo';
import { Phone, Mail, Clock, ChevronRight, MessageSquare } from 'lucide-react';
import { BRAND_INFO, DEFAULT_NAV_CATEGORIES, fetchActiveNavCategories, getWhatsAppUrl } from '@/lib/brand';

export function Footer() {
  const [footerCategories, setFooterCategories] = useState(DEFAULT_NAV_CATEGORIES);

  useEffect(() => {
    fetchActiveNavCategories().then(setFooterCategories);
  }, []);

  return (
    <footer className="bg-[#092456] text-slate-200 pt-12 pb-24 lg:pb-10 border-t border-blue-950/70">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="space-y-3.5 sm:col-span-2 lg:col-span-1">
            <ZhiLogo variant="dark" showTagline />
            <p className="text-sm text-slate-300 leading-relaxed pt-1 max-w-sm">
              An independent product manufacturing brand developing practical, reliable solutions with dependable bulk supply.
            </p>
          </div>

          {/* Product Applications */}
          <div>
            <h4 className="text-white font-extrabold mb-4 uppercase tracking-wider text-xs">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={cat.href}
                    className="text-slate-200 hover:text-blue-300 font-medium transition-colors flex items-center space-x-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-slate-200 hover:text-blue-300 font-medium transition-colors flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
                  <span>All Products</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-extrabold mb-4 uppercase tracking-wider text-xs">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/" className="text-slate-200 hover:text-blue-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-200 hover:text-blue-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-200 hover:text-blue-300 transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-200 hover:text-blue-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire for Bulk Orders</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Sales Contact */}
          <div>
            <h4 className="text-white font-extrabold mb-4 uppercase tracking-wider text-xs">
              Sales &amp; Bulk Enquiries
            </h4>
            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <span>{BRAND_INFO.phoneDisplay} ({BRAND_INFO.location})</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <span>{BRAND_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-300 shrink-0" />
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

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300">
          <p>
            © {new Date().getFullYear()} {BRAND_INFO.name}. {BRAND_INFO.tagline}
          </p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <Link href="/about" className="hover:text-white transition-colors">
              About ZHI DIMENSION
            </Link>
            <span className="text-white/30">•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Sales
            </Link>
            <span className="text-white/30">•</span>
            <Link href="/admin" className="text-blue-300 hover:text-white font-semibold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
