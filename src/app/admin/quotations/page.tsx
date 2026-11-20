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
} from 'lucide-react';
import { ZhiLogo } from '@/components/ZhiLogo';
import { initialQuotations } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';

function AdminQuotationsContent() {
  const searchParams = useSearchParams();
  const preCustomer = searchParams.get('customerName') || '';
  const prePhone = searchParams.get('phone') || '';
  const preItem = searchParams.get('item') || '';

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
      <button
        onClick={() => setIsCreating((prev) => !prev)}
        className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>{isCreating ? 'Close Form' : 'New Quotation'}</span>
      </button>
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

  const subtotal = items.reduce((sum, it) => sum + (it.total || 0), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
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
      status: 'Sent',
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
        setPreviewQuote(data.quotation);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* CREATE QUOTATION FORM */}
      {isCreating && (
        <form
          onSubmit={handleCreateQuotation}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-fadeIn"
        >
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Generate Official Quotation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Client / Company Name"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 00000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@build.com"
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

          {/* Totals Summary */}
          <div className="bg-slate-100 p-4 rounded-xl flex flex-col items-end space-y-1.5 text-xs text-slate-700">
            <div>
              <span>Subtotal: </span>
              <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString()}</span>
            </div>
            <div>
              <span>GST (18%): </span>
              <span className="font-semibold text-slate-900">₹{tax.toLocaleString()}</span>
            </div>
            <div className="text-base font-extrabold text-slate-900 pt-1 border-t border-slate-300">
              <span>Grand Total: </span>
              <span className="text-[#F97316]">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-md"
            >
              Generate & Save Quotation
            </button>
          </div>
        </form>
      )}

      {/* EXISTING QUOTATIONS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Quote Number</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Total Items</th>
                <th className="py-3 px-4">Grand Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotations.map((q) => (
                <tr key={q.quoteNumber || q._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-xs text-orange-600">
                    {q.quoteNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs text-slate-900">
                    {q.customerName}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                    {q.phone}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">
                    {q.items?.length || 1} line item(s)
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-xs text-slate-900">
                    ₹{q.grandTotal?.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {q.status || 'Sent'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => setPreviewQuote(q)}
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1 mx-auto"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print Sheet</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINTABLE QUOTE MODAL */}
      {previewQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
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
                <p className="text-xs text-slate-500 mt-2">Date: {new Date().toISOString().split('T')[0]}</p>
                <p className="text-xs text-emerald-700 font-bold">Status: {previewQuote.status || 'Official'}</p>
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
                      <td className="py-2.5 text-center text-slate-600">{it.quantity}</td>
                      <td className="py-2.5 text-right font-mono">₹{it.unitRate?.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-bold text-slate-900 font-mono">
                        ₹{it.total?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col items-end space-y-1 text-xs">
                <div>Subtotal: ₹{previewQuote.subtotal?.toLocaleString()}</div>
                <div>GST (18%): ₹{previewQuote.tax?.toLocaleString()}</div>
                <div className="text-base font-extrabold text-[#F97316]">
                  Total: ₹{previewQuote.grandTotal?.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Valid for 15 days from issuance. Standard terms and conditions apply.
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  Print / Save PDF
                </button>
                <button
                  onClick={() => setPreviewQuote(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
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

export default function AdminQuotationsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 flex items-center justify-center text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500 mr-2" />
          <span>Loading quotations...</span>
        </div>
      }
    >
      <AdminQuotationsContent />
    </Suspense>
  );
}
