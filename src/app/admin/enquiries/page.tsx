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
} from 'lucide-react';
import { initialEnquiries } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>(initialEnquiries);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { setTitle, setActions } = useAdminHeader();

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
    setActions(
      <button
        onClick={fetchEnquiries}
        disabled={loading}
        className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
        title="Refresh Enquiries"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-500' : ''}`} />
      </button>
    );
    return () => setActions(null);
  }, [loading]);

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
      e.phone.includes(search);
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

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Pending', 'Quoted', 'In Progress', 'Contacted', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, phone, product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Product Requirement</th>
                <th className="py-3 px-4">Quantity / Size</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((enq, idx) => (
                <tr key={enq._id || idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 text-center text-xs text-slate-400 font-mono">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 text-xs">
                    {enq.customerName}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-700">
                    {enq.phone}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-800">
                    {enq.productRequired}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {enq.quantitySize || '—'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border ${getBadge(
                        enq.status
                      )}`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setSelected(enq)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="p-1 text-slate-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Enquiry - {selected.customerName}</h3>
                <p className="text-xs text-slate-400">{selected.phone}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Requirement</span>
                <p className="font-semibold text-slate-900 mt-0.5">{selected.productRequired}</p>
                {selected.quantitySize && (
                  <p className="text-xs text-slate-600 mt-1">Quantity/Dimensions: {selected.quantitySize}</p>
                )}
              </div>

              {selected.message && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Message</span>
                  <p className="text-xs text-slate-700 mt-1">"{selected.message}"</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Update Lead Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Quoted', 'In Progress', 'Contacted', 'Closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selected._id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selected.status === st
                          ? 'bg-[#F97316] text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <a
                  href={`tel:${selected.phone}`}
                  className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl text-center flex items-center justify-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selected.customerName}, regarding your inquiry for ${selected.productRequired} from ZHI DIMENSION:`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xl text-center flex items-center justify-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <Link
                  href={`/admin/quotations?customerName=${encodeURIComponent(
                    selected.customerName
                  )}&phone=${encodeURIComponent(selected.phone)}&item=${encodeURIComponent(
                    selected.productRequired
                  )}`}
                  className="flex-1 py-2.5 px-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl text-center"
                >
                  Quotation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

