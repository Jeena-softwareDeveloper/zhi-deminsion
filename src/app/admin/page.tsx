'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  Mail,
  Calculator,
  AlertTriangle,
  RefreshCw,
  Plus,
  X,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { initialEnquiries, initialProducts } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 124,
    totalEnquiries: 48,
    pendingQuotations: 12,
    lowStock: 5,
  });

  const [enquiries, setEnquiries] = useState<any[]>(initialEnquiries);
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  // Modal for Viewing / Managing an Enquiry
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const { setTitle, setActions } = useAdminHeader();

  async function loadDashboardData() {
    setLoading(true);
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        if (data.stats) setStats(data.stats);
        if (data.recentEnquiries && data.recentEnquiries.length > 0) {
          setEnquiries(data.recentEnquiries);
        }
        if (data.recentProducts && data.recentProducts.length > 0) {
          setProducts(data.recentProducts);
        }
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Register title and action buttons in layout top header
  useEffect(() => {
    setTitle('Dashboard');
    setActions(
      <div className="flex items-center space-x-2">
        <button
          onClick={loadDashboardData}
          disabled={loading}
          className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
          title="Refresh Data"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#0066FF]' : ''}`} />
        </button>
        <Link
          href="/admin/products"
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>
    );

    return () => {
      setActions(null);
    };
  }, [loading]);

  const handleUpdateStatus = async (enquiryId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            Pending
          </span>
        );
      case 'Quoted':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Quoted
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            In Progress
          </span>
        );
      case 'Contacted':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-sky-100 text-sky-800 border border-sky-200">
            Contacted
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const formatDateDisplay = (dateStr: any) => {
    if (!dateStr) return '2025-04-20';
    try {
      const d = new Date(dateStr);
      return d.toISOString().split('T')[0];
    } catch {
      return '2025-04-20';
    }
  };

  return (
    <div className="h-full overflow-y-auto space-y-6 pr-1 animate-fadeIn">
      {/* NO DUPLICATE HEADER - Content starts immediately with TOP 4 STATS CARDS (Page 7 Exact Match) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Products */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total Products</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {stats.totalProducts}
            </h3>
          </div>
        </div>

        {/* Card 2: Total Enquiries */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Total Enquiries</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {stats.totalEnquiries}
            </h3>
          </div>
        </div>

        {/* Card 3: Pending Quotations */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Pending Quotations</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {stats.pendingQuotations}
            </h3>
          </div>
        </div>

        {/* Card 4: Low Stock */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Low Stock</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">
              {stats.lowStock}
            </h3>
          </div>
        </div>
      </div>

      {/* MAIN SECTION: Recent Enquiries Table (Left 8 cols) + Recent Products (Right 4 cols) (Page 7 Match) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RECENT ENQUIRIES TABLE (Page 7 Exact Match) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Enquiries</h3>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Enquiries
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {enquiries.slice(0, 5).map((enq, index) => (
                  <tr key={enq._id || index} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center font-medium text-slate-400 text-xs">
                      {index + 1}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {enq.customerName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {enq.productRequired}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs font-mono">
                      {formatDateDisplay(enq.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(enq.status)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline px-2 py-1 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT PRODUCTS WIDGET (Page 7 Exact Match) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Recent Products</h3>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Catalogue
            </Link>
          </div>

          <div className="space-y-4">
            {products.slice(0, 4).map((prod, idx) => {
              const imageSrc =
                prod.images && prod.images.length > 0
                  ? prod.images[0]
                  : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80';

              const isLowStock = prod.stockStatus === 'Low Stock';

              return (
                <div
                  key={prod.slug || idx}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image
                        src={imageSrc}
                        alt={prod.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 leading-tight">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {prod.category}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      isLowStock
                        ? 'bg-red-100 text-red-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {prod.stockStatus || 'In Stock'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/admin/inventory"
              className="w-full block py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl text-center transition-colors"
            >
              Manage Inventory Levels
            </Link>
          </div>
        </div>
      </div>

      {/* ENQUIRY VIEW MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Enquiry Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Logged on {formatDateDisplay(selectedEnquiry.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Customer</span>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedEnquiry.customerName}
                  </p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Phone</span>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedEnquiry.phone}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Product & Specs</span>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {selectedEnquiry.productRequired}
                </p>
                {selectedEnquiry.quantitySize && (
                  <p className="text-xs text-slate-600 mt-1">
                    <span className="font-semibold">Quantity / Dimensions:</span> {selectedEnquiry.quantitySize}
                  </p>
                )}
              </div>

              {selectedEnquiry.message && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Customer Message</span>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    "{selectedEnquiry.message}"
                  </p>
                </div>
              )}

              {/* Status Update Control */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Change Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Quoted', 'In Progress', 'Contacted', 'Closed'].map((st) => (
                    <button
                      key={st}
                      disabled={isUpdatingStatus}
                      onClick={() => handleUpdateStatus(selectedEnquiry._id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedEnquiry.status === st
                          ? 'bg-[#0066FF] text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl text-center flex items-center justify-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.customerName}, regarding your inquiry for ${selectedEnquiry.productRequired} with ZHI DIMENSION:`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xl text-center flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <Link
                  href={`/admin/quotations?customerName=${encodeURIComponent(
                    selectedEnquiry.customerName
                  )}&phone=${encodeURIComponent(selectedEnquiry.phone)}&item=${encodeURIComponent(
                    selectedEnquiry.productRequired
                  )}`}
                  className="flex-1 py-2.5 px-3 bg-[#0052CC] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl text-center"
                >
                  Create Quotation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
