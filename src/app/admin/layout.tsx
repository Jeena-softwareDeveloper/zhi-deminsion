'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ZhiLogo } from '@/components/ZhiLogo';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ClipboardList,
  FileSpreadsheet,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { AdminHeaderProvider, useAdminHeader } from '@/context/AdminHeaderContext';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Layers },
  { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { label: 'Enquiries', href: '/admin/enquiries', icon: ClipboardList },
  { label: 'Quotations', href: '/admin/quotations', icon: FileSpreadsheet },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { title, actions } = useAdminHeader();

  // Find active nav item or use context title
  const currentNav = navItems.find((n) =>
    n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href)
  );
  const displayTitle = title || currentNav?.label || 'Dashboard';

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#F4F6F8]">
      {/* 1. FIXED SIDEBAR (Desktop) - Dark Navy Background Matching Page 7 */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#0F172A] text-slate-300 border-r border-slate-800 shrink-0 select-none">
        {/* Logo header */}
        <div className="p-6 border-b border-slate-800/80 shrink-0">
          <ZhiLogo variant="dark" />
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-[#F97316]' : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout */}
        <div className="p-4 border-t border-slate-800/80 shrink-0">
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout / Exit</span>
          </Link>
        </div>
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-[#0F172A] text-slate-300 p-6 flex flex-col z-10 h-full">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <ZhiLogo variant="dark" />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive
                        ? 'bg-slate-800 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-orange-500" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center space-x-3 pt-4 border-t border-slate-800 text-slate-400 hover:text-red-400 text-sm"
            >
              <LogOut className="w-5 h-5" />
              <span>Back to Website</span>
            </Link>
          </div>
        </div>
      )}

      {/* 2. RIGHT CONTAINER (HEADER + SCROLLABLE MAIN CONTENT) */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-hidden">
        {/* FIXED TOP HEADER (Contains Single Page Title + Actions + User Profile) */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* SINGLE ONLY TITLE in the Layout Header */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {displayTitle}
            </h1>
          </div>

          {/* Action buttons (e.g. Refresh, + Add Product) & User Menu */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Dynamic Page Action Buttons rendered directly in Layout Header */}
            {actions && <div className="flex items-center space-x-2">{actions}</div>}

            {/* Link back to public site */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>

            {/* Admin User Menu (Page 7 Match) */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border border-slate-700">
                  AD
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">Admin</span>
                  <span className="text-[10px] text-slate-500">Super Administrator</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-40 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">Logged in as</p>
                    <p className="text-xs text-slate-500 truncate">admin@zhidimension.com</p>
                  </div>
                  <Link
                    href="/admin/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    System Settings
                  </Link>
                  <Link
                    href="/"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 3. FIXED VIEWPORT CONTAINER (NO PAGE SCROLL - TABLE ROWS SCROLL INTERNALLY) */}
        <main className="flex-1 min-h-0 overflow-hidden p-4 sm:p-6 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminHeaderProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminHeaderProvider>
  );
}
