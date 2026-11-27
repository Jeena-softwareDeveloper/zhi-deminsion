'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ClipboardList, MoreHorizontal } from 'lucide-react';
import { QuoteModal } from './QuoteModal';

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // If we are in the admin dashboard, don't show the public mobile bottom nav
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1 flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
            pathname === '/' ? 'text-[#0066FF] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${pathname === '/' ? 'stroke-[2.5]' : ''}`} />
          <span>Home</span>
        </Link>

        <Link
          href="/products"
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
            pathname.startsWith('/products')
              ? 'text-[#0066FF] font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className={`w-5 h-5 mb-0.5 ${pathname.startsWith('/products') ? 'stroke-[2.5]' : ''}`} />
          <span>Products</span>
        </Link>

        <button
          onClick={() => setIsQuoteOpen(true)}
          className="flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium text-slate-600 hover:text-[#0066FF] transition-colors"
        >
          <ClipboardList className="w-5 h-5 mb-0.5" />
          <span>Enquiry</span>
        </button>

        <button
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
            showMoreMenu ? 'text-[#0066FF]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MoreHorizontal className="w-5 h-5 mb-0.5" />
          <span>More</span>
        </button>
      </nav>

      {/* More menu popup */}
      {showMoreMenu && (
        <div className="md:hidden fixed bottom-16 right-4 z-40 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 w-56 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            <Link
              href="/services"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              Welding & Fabrication
            </Link>
            <Link
              href="/agricultural-equipment"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              Agricultural Equipment
            </Link>
            <Link
              href="/about"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              About Company
            </Link>
            <Link
              href="/contact"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              Contact Us
            </Link>
            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/admin"
                onClick={() => setShowMoreMenu(false)}
                className="px-3 py-2 text-sm text-[#0066FF] hover:bg-blue-50 rounded-lg font-bold flex items-center justify-between"
              >
                <span>Admin Dashboard</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono">
                  LOGIN
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
