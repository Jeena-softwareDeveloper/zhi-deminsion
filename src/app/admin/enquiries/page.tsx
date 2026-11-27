'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  Search,
  Filter,
  Phone,
  MessageSquare,
  FileSpreadsheet,
  Trash2,
  X,
  CheckCircle,
  RefreshCw,
  Mail,
  Calendar,
  Clock,
} from 'lucide-react';
import { initialEnquiries } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';
import { DataTable, Column } from '@/components/admin/DataTable';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>(initialEnquiries);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { setTitle, setControls, setActions } = useAdminHeader();

  async function fetchEnquiries() {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.success && data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    setTitle('Customer Enquiries');

    setControls(
      <div className="flex items-center space-x-2 w-full">
        {/* Status Pills */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          {['All', 'Pending', 'Quoted', 'In Progress', 'Contacted', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 min-w-[150px] max-w-xs">
          <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
      </div>
    );

    setActions(
      <button
        onClick={fetchEnquiries}
        disabled={loading}
        className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
        title="Refresh Enquiries"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#0066FF]' : ''}`} />
      </button>
    );

    return () => {
      setControls(null);
      setActions(null);
    };
  }, [loading, statusFilter, search]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
        if (selected && selected._id === id) {
          setSelected({ ...selected, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      if (selected && selected._id === id) setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchSearch =
      !search ||
      e.customerName.toLowerCase().includes(search.toLowerCase()) ||
      e.productRequired.toLowerCase().includes(search.toLowerCase()) ||
      (e.phone && e.phone.includes(search)) ||
      (e.email && e.email.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const getBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Quoted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (enq) => (
        <div>
          <p className="font-bold text-slate-900 text-xs sm:text-sm">{enq.customerName}</p>
          <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
            <span className="font-mono">{enq.phone}</span>
            {enq.email && <span>&bull; {enq.email}</span>}
          </div>
        </div>
      ),
    },
    {
      key: 'productRequired',
      header: 'Requirement',
      sortable: true,
      render: (enq) => (
        <div>
          <span className="font-semibold text-slate-800 text-xs block">{enq.productRequired}</span>
          <span className="text-[11px] text-slate-400">Qty: {enq.quantitySize || 'N/A'}</span>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Received',
      sortable: true,
      render: (enq) => (
        <span className="text-slate-500 text-[11px]">
          {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'Recent'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      sortable: true,
      render: (enq) => (
        <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${getBadge(enq.status)}`}>
          {enq.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (enq) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => setSelected(enq)}
            className="text-xs font-bold text-blue-600 hover:text-orange-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => handleDelete(enq._id)}
            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Enquiry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col min-h-0">
      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        hideToolbar={true}
        pageSize={8}
        emptyTitle="No enquiries found"
        emptySubtitle="Customer enquiries submitted through the website will appear here."
      />

      {/* Enquiry Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Enquiry Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">Submitted via Website Enquiry Form</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-base font-bold text-slate-900">{selected.customerName}</h4>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selected.phone}</span>
                    </span>
                    {selected.email && (
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selected.email}</span>
                      </span>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getBadge(selected.status)}`}>
                  {selected.status}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                  Product Required
                </span>
                <p className="text-sm font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {selected.productRequired}
                </p>
              </div>

              {selected.quantitySize && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Quantity / Dimensions
                  </span>
                  <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono">
                    {selected.quantitySize}
                  </p>
                </div>
              )}

              {selected.message && (
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Customer Message
                  </span>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {selected.message}
                  </p>
                </div>
              )}

              {/* Status Update Dropdown */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Update Lifecycle Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Contacted', 'Quoted', 'In Progress', 'Closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selected._id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selected.status === st
                          ? 'bg-[#0066FF] text-white shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/admin/quotations?enquiryId=${selected._id}&customerName=${encodeURIComponent(
                    selected.customerName
                  )}&phone=${encodeURIComponent(selected.phone)}&email=${encodeURIComponent(
                    selected.email || ''
                  )}&product=${encodeURIComponent(selected.productRequired)}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-[#0066FF] text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Generate Quotation</span>
                </Link>

                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
