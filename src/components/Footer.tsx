import React from 'react';
import Link from 'next/link';
import { ZhiLogo } from './ZhiLogo';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B1320] text-slate-300 pt-16 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <ZhiLogo variant="dark" showTagline />
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Your trusted partner in high-quality steel products, precise fabrication services, and dependable agricultural equipment – engineered with strength and integrity.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-blue-400">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>ISO 9001:2015 & BIS Certified Metal Works</span>
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider text-xs">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products?category=Steel+Products"
                  className="hover:text-blue-400 transition-colors flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Steel Products (Pipes, Plates, Beams)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-blue-400 transition-colors flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Welding & Custom Fabrication</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/agricultural-equipment"
                  className="hover:text-blue-400 transition-colors flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Agricultural Equipment (Rotavator, Plough)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Welding+%26+Fabrication"
                  className="hover:text-blue-400 transition-colors flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Gates, Grills & Architectural Works</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-400 transition-colors">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Welding & Fabrication Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About ZHI DIMENSION
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Admin Dashboard Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider text-xs">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Plot 42-A, Industrial Estate, Sector 5, Chennai / Manufacturing Hub, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+91 98765 43210 / +91 98400 67890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>sales@zhidimension.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ZHI DIMENSION. All rights reserved. Engineering Strength. Building Possibilities.</p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <Link href="/about" className="hover:text-slate-400">Quality Policy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-400">Customer Support</Link>
            <span>•</span>
            <Link href="/admin" className="text-blue-500 hover:text-blue-400 font-medium">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
