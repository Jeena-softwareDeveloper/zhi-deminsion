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
  const { title, badge, controls, actions } = useAdminHeader();

  // Find active nav item or use context title
  const currentNav = navItems.find((n) =>
    n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href)
  );
  const displayTitle = title === null ? '' : title || currentNav?.label || 'Dashboard';

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#F1F5F9]">
      {/* 1. FIXED SIDEBAR (Desktop) - Slim Light-Blue Theme with Single Curved Corner */}
      <aside className="hidden lg:flex flex-col w-56 h-screen bg-gradient-to-b from-[#EFF6FF] to-[#DFECFF] text-slate-700 border-r border-blue-200/90 rounded-br-[28px] overflow-hidden shadow-sm shrink-0 select-none">
        {/* Logo header */}
        <div className="px-4 py-4 border-b border-blue-200/80 shrink-0">
          <ZhiLogo variant="light" size="sm" />
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
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
                className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#0052CC] text-white font-bold shadow-sm'
                    : 'text-slate-700 hover:text-[#0052CC] hover:bg-white/80'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-[#0052CC]'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout */}
        <div className="p-3.5 border-t border-blue-200/80 shrink-0">
          <Link
            href="/"
            className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-white/80 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout / Exit</span>
          </Link>
        </div>
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 bg-gradient-to-b from-[#EFF6FF] to-[#DFECFF] text-slate-700 border-r border-blue-200/90 rounded-br-[28px] p-5 flex flex-col z-10 h-full overflow-hidden">
            <div className="flex items-center justify-between pb-5 border-b border-blue-200/80">
              <ZhiLogo variant="light" size="sm" />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-[#0B1320] hover:bg-white/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-5 space-y-1 overflow-y-auto">
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
                    className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-[#0052CC] text-white font-bold shadow-sm'
                        : 'text-slate-700 hover:text-[#0052CC] hover:bg-white/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0052CC]'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center space-x-2.5 pt-4 border-t border-blue-200/80 text-slate-600 hover:text-red-600 text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Back to Website</span>
            </Link>
          </div>
        </div>
      )}

      {/* 2. RIGHT CONTAINER (HEADER + SCROLLABLE MAIN CONTENT) */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-hidden">
        {/* FIXED TOP HEADER (Contains Title, Badge/Alert, Controls & Actions with rounded-lg buttons) */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 z-30 gap-3">
          {/* Left: Mobile Menu + Single Title + Badge/Alert */}
          <div className={`${displayTitle || badge ? 'flex' : 'flex lg:hidden'} items-center space-x-3 shrink-0`}>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            {(displayTitle || badge) && (
              <div className="flex items-center space-x-2.5">
                {displayTitle && (
                  <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                    {displayTitle}
                  </h1>
                )}
                {badge && <div className="shrink-0">{badge}</div>}
              </div>
            )}
          </div>

          {/* Center: Search & Filter Controls (Injected directly into Layout Header) */}
          {controls && (
            <div className="hidden md:flex items-center space-x-2.5 flex-1 max-w-2xl justify-center [&_button]:!rounded-lg [&_a]:!rounded-lg [&_input]:!rounded-lg [&_select]:!rounded-lg [&_.rounded-xl]:!rounded-lg">
              {controls}
            </div>
          )}

          {/* Right: Actions, Live Site, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {actions && (
              <div className="flex items-center space-x-2 [&_button]:!rounded-lg [&_a]:!rounded-lg [&_input]:!rounded-lg [&_select]:!rounded-lg [&_.rounded-xl]:!rounded-lg">
                {actions}
              </div>
            )}

            {/* Link back to public site */}
            <Link
              href="/"
              target="_blank"
              className="hidden 2xl:flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#0052CC] bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>

            {/* Admin User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0052CC] text-white font-bold text-xs flex items-center justify-center">
                  AD
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">Admin</span>
                  <span className="text-[10px] text-slate-500">Super Administrator</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-40 animate-fadeIn">
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

        {/* Mobile controls bar (if controls exist, displayed under header on small screens) */}
        {controls && (
          <div className="md:hidden shrink-0 bg-white border-b border-slate-200 px-4 py-2 flex items-center overflow-x-auto gap-2 [&_button]:!rounded-lg [&_a]:!rounded-lg [&_input]:!rounded-lg [&_select]:!rounded-lg [&_.rounded-xl]:!rounded-lg">
            {controls}
          </div>
        )}

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
