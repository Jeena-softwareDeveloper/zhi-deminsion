'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, MessageSquare, MoreHorizontal } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/brand';

export function MobileBottomNav() {
  const pathname = usePathname();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1 flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
            pathname === '/' ? 'text-[#0052CC] font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${pathname === '/' ? 'stroke-[2.5]' : ''}`} />
          <span>Home</span>
        </Link>

        <Link
          href="/products"
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
            pathname.startsWith('/products')
              ? 'text-[#0052CC] font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className={`w-5 h-5 mb-0.5 ${pathname.startsWith('/products') ? 'stroke-[2.5]' : ''}`} />
          <span>Products</span>
        </Link>

        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium text-[#16A34A] hover:text-[#15803D] transition-colors"
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>Bulk Orders</span>
        </a>

        <button
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className={`flex flex-col items-center py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
            showMoreMenu ? 'text-[#0052CC]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MoreHorizontal className="w-5 h-5 mb-0.5" />
          <span>More</span>
        </button>
      </nav>

      {showMoreMenu && (
        <div className="lg:hidden fixed bottom-16 right-4 z-40 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 w-56">
          <div className="flex flex-col space-y-1">
            <Link
              href="/products?category=Agriculture"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              Agriculture
            </Link>
            <Link
              href="/products?category=Home+%26+Residential"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              Home &amp; Residential
            </Link>
            <Link
              href="/products?category=Industrial"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              Industries
            </Link>
            <Link
              href="/about"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setShowMoreMenu(false)}
              className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
