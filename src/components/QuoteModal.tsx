'use client';

import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare, Phone, User, Package, Layers, Loader2 } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export function QuoteModal({ isOpen, onClose, defaultProduct = '' }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    productRequired: defaultProduct,
    quantitySize: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Update defaultProduct if passed
  React.useEffect(() => {
    if (defaultProduct) {
      setFormData((prev) => ({ ...prev, productRequired: defaultProduct }));
    }
  }, [defaultProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      productRequired: '',
      quantitySize: '',
      message: '',
    });
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ZHI DIMENSION! I would like to request a quotation.\nName: ${formData.customerName || 'Customer'}\nProduct: ${formData.productRequired || 'Steel / Equipment'}\nQuantity/Specs: ${formData.quantitySize || 'As per requirement'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Request a Quote</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Fill in your details and we will get back to you soon.
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Enquiry Submitted!</h4>
                <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{formData.customerName}</span>. Your quote request has been recorded in our system. Our engineering sales team will call you shortly.
                </p>
              </div>

              {/* Direct WhatsApp Option */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-medium shadow-md transition-colors space-x-2"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Phone Number <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Product Requirement <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.productRequired}
                    onChange={(e) => setFormData({ ...formData, productRequired: e.target.value })}
                    placeholder="e.g. Steel Pipes, Rotavator, PEB Shed"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Quantity / Size
                </label>
                <div className="relative">
                  <Layers className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.quantitySize}
                    onChange={(e) => setFormData({ ...formData, quantitySize: e.target.value })}
                    placeholder="Enter quantity, dimensions, or tonnage"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Delivery location, special specifications, etc."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

