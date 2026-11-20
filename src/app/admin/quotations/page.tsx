'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FileSpreadsheet,
  Plus,
  Printer,
  Trash2,
  CheckCircle,
  FileText,
  User,
  Phone,
  Layers,
  Sparkles,
  Loader2,
  X,
  RefreshCw,
} from 'lucide-react';
import { ZhiLogo } from '@/components/ZhiLogo';
import { initialQuotations } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';
import { DataTable, Column } from '@/components/admin/DataTable';

function AdminQuotationsContent() {
  const searchParams = useSearchParams();
  const preCustomer = searchParams.get('customerName') || '';
  const prePhone = searchParams.get('phone') || '';
  const preItem = searchParams.get('item') || searchParams.get('product') || '';

  const [quotations, setQuotations] = useState<any[]>(initialQuotations);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(Boolean(preCustomer));

  // Form State
  const [customerName, setCustomerName] = useState(preCustomer);
  const [phone, setPhone] = useState(prePhone);
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([
    {
      description: preItem || 'Steel Pipes 4" Mild Steel IS Standard',
      quantity: 100,
      unitRate: 450,
      total: 45000,
    },
  ]);
  const [previewQuote, setPreviewQuote] = useState<any>(null);

  async function fetchQuotations() {
    setLoading(true);
    try {
      const res = await fetch('/api/quotations');
      const data = await res.json();
      if (data.success && data.quotations) {
        setQuotations(data.quotations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const { setTitle, setActions } = useAdminHeader();

  useEffect(() => {
    fetchQuotations();
  }, []);

  useEffect(() => {
    setTitle('Quotations');
    setActions(
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsCreating((prev) => !prev)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? 'Close Form' : 'New Quotation'}</span>
        </button>
      </div>
    );
    return () => setActions(null);
  }, [isCreating]);

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    if (field === 'quantity' || field === 'unitRate') {
      const q = Number(updated[index].quantity) || 0;
      const r = Number(updated[index].unitRate) || 0;
      updated[index].total = q * r;
    }
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { description: 'Item Description', quantity: 1, unitRate: 1000, total: 1000 },
    ]);
  };

  const removeItem = (idx: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.total, 0);
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      customerName,
      phone,
      email,
      items,
      subtotal,
      tax,
      grandTotal,
      validUntil: new Date(Date.now() + 15 * 86400000).toISOString(),
    };

    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        fetchQuotations();
        setIsCreating(false);
        setCustomerName('');
        setPhone('');
        setEmail('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns: Column<any>[] = [
    {
      key: 'quoteNumber',
      header: 'Quote #',
      sortable: true,
      render: (q) => (
        <span className="font-mono font-bold text-xs text-orange-600">
          {q.quoteNumber}
        </span>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (q) => (
        <div>
          <p className="font-bold text-xs text-slate-900">{q.customerName}</p>
          <p className="font-mono text-[11px] text-slate-400">{q.phone}</p>
        </div>
      ),
    },
    {
      key: 'items',
      header: 'Line Items',
      align: 'center',
      render: (q) => (
        <span className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
          {q.items?.length || 1} item(s)
        </span>
      ),
    },
    {
      key: 'grandTotal',
      header: 'Total Amount',
      sortable: true,
      align: 'right',
      render: (q) => (
        <span className="font-extrabold text-xs text-slate-900">
          ₹{q.grandTotal?.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (q) => (
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          {q.status || 'Sent'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      render: (q) => (
        <button
          onClick={() => setPreviewQuote(q)}
          className="px-3 py-1.5 bg-slate-900 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-colors mx-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Sheet</span>
        </button>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col min-h-0 space-y-3.5">
      {/* Quotation Creator Form Drawer */}
      {isCreating && (
        <div className="shrink-0 max-h-[50vh] overflow-y-auto bg-white rounded-2xl border border-orange-200 p-6 shadow-md animate-in fade-in space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Generate Official Quotation</h3>
              <p className="text-xs text-slate-500">
                GST invoice compliant quotation document with automated rate calculation.
              </p>
            </div>
            <button
              onClick={() => setIsCreating(false)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateQuotation} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Customer / Enterprise Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singh / Apex Infra Ltd"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Customer Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="procurement@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Quotation Line Items
                </label>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center text-xs"
                  >
                    <div className="col-span-6">
                      <input
                        type="text"
                        placeholder="Item description & specification"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-center"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        placeholder="Rate (₹)"
                        value={item.unitRate}
                        onChange={(e) => handleItemChange(idx, 'unitRate', Number(e.target.value))}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-right"
                      />
                    </div>
                    <div className="col-span-1 text-right font-bold text-slate-800">
                      ₹{item.total.toLocaleString()}
                    </div>
                    <div className="col-span-1 text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="flex flex-col sm:flex-row items-end justify-between pt-4 border-t border-slate-100 gap-4">
              <div className="text-xs text-slate-500">
                Includes 18% standard GST rate. Valid for 15 days from issuance date.
              </div>
              <div className="w-full sm:w-64 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span className="font-bold">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-1">
                  <span>Grand Total:</span>
                  <span className="text-orange-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                Save & Issue Quotation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Quotations DataTable */}
      <DataTable
        columns={columns}
        data={quotations}
        loading={loading}
        searchPlaceholder="Search quotations by number, customer, phone..."
        searchFilter={(item, query) => {
          const q = query.toLowerCase();
          return (
            item.quoteNumber?.toLowerCase().includes(q) ||
            item.customerName?.toLowerCase().includes(q) ||
            item.phone?.includes(q)
          );
        }}
        actionsSlot={
          <button
            onClick={fetchQuotations}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
            title="Refresh Quotations"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-500' : ''}`} />
          </button>
        }
        pageSize={8}
        emptyTitle="No quotations generated yet"
        emptySubtitle="Click 'New Quotation' to create and calculate a custom pricing sheet."
      />

      {/* PRINTABLE QUOTE MODAL */}
      {previewQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-6">
              <div>
                <ZhiLogo variant="light" />
                <p className="text-xs text-slate-500 mt-2">
                  Plot 42-A, Heavy Industrial Growth Center, Phase II, Chennai, India
                </p>
                <p className="text-xs text-slate-500">sales@zhidimension.com | +91 98765 43210</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold bg-orange-100 text-orange-800 px-2 py-1 rounded">
                  {previewQuote.quoteNumber}
                </span>
                <p className="text-xs text-slate-500 mt-2">
                  Date: {new Date().toISOString().split('T')[0]}
                </p>
                <p className="text-xs text-emerald-700 font-bold">
                  Status: {previewQuote.status || 'Official'}
                </p>
              </div>
            </div>

            {/* Client Info */}
            <div className="py-4 border-b border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Quotation Issued To
              </span>
              <h4 className="text-base font-bold text-slate-900">{previewQuote.customerName}</h4>
              <p className="text-xs text-slate-600 font-mono">Contact: {previewQuote.phone}</p>
              {previewQuote.email && (
                <p className="text-xs text-slate-600">Email: {previewQuote.email}</p>
              )}
            </div>

            {/* Items Table */}
            <div className="py-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Rate</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {previewQuote.items?.map((it: any, i: number) => (
                    <tr key={i}>
                      <td className="py-2.5 font-medium text-slate-900">{it.description}</td>
                      <td className="py-2.5 text-center">{it.quantity}</td>
                      <td className="py-2.5 text-right font-mono">₹{it.unitRate?.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-bold text-slate-900 font-mono">
                        ₹{it.total?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="border-t border-slate-200 pt-4 flex justify-end">
              <div className="w-64 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{previewQuote.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span className="font-mono">₹{previewQuote.tax?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-200 pt-1">
                  <span>Total Due:</span>
                  <span className="text-orange-600 font-mono">
                    ₹{previewQuote.grandTotal?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between print:hidden">
              <button
                onClick={() => setPreviewQuote(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close Preview
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminQuotationsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading quotations...</div>}>
      <AdminQuotationsContent />
    </Suspense>
  );
}
