'use client';

import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { BRAND_INFO, getWhatsAppUrl } from '@/lib/brand';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    productRequired: '',
    quantitySize: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] tracking-tight">
            Contact {BRAND_INFO.name} Sales Team
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Connect directly with our sales team via WhatsApp or submit your bulk order enquiry below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Contact Information & Primary WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#0B1320] text-white p-5 sm:p-7 rounded-2xl space-y-5 border border-slate-800">
              <h2 className="text-lg sm:text-xl font-bold">{BRAND_INFO.name} — {BRAND_INFO.location}</h2>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#0052CC] shrink-0" />
                  <span>{BRAND_INFO.phoneDisplay}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#0052CC] shrink-0" />
                  <span>{BRAND_INFO.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#0052CC] shrink-0" />
                  <span>{BRAND_INFO.hours}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-xs text-slate-400">
                  For fastest response on bulk orders, message us directly on WhatsApp.
                </p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Enquire for Bulk Orders on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 text-sm text-slate-600 space-y-2">
              <h3 className="font-bold text-[#0B1320]">Bulk Orders &amp; Partnerships</h3>
              <p className="text-xs leading-relaxed">
                ZHI DIMENSION manufactures its own products for agriculture, residential, and industrial applications and partners with bulk buyers and distributors.
              </p>
            </div>
          </div>

          {/* Bulk Enquiry Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl p-5 sm:p-8 border border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1320]">Send a Bulk Order Enquiry</h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Share your product requirement and estimated bulk quantity and our sales team will reach out.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1320]">Bulk Enquiry Received</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-[#0B1320]">{formData.customerName}</span>. Our sales team will contact you at <span className="font-semibold text-[#0B1320]">{formData.phone}</span> shortly.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Continue on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        customerName: '',
                        phone: '',
                        email: '',
                        productRequired: '',
                        quantitySize: '',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name <span className="text-[#0052CC]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0052CC] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp Number <span className="text-[#0052CC]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0052CC] text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0052CC] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Product Name / Category <span className="text-[#0052CC]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Agriculture / Home & Residential / Industrial"
                      value={formData.productRequired}
                      onChange={(e) => setFormData({ ...formData, productRequired: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0052CC] text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bulk Order Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="Enter estimated quantity"
                    value={formData.quantitySize}
                    onChange={(e) => setFormData({ ...formData, quantitySize: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0052CC] text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share delivery location or bulk order questions"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0052CC] text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0052CC] hover:bg-[#003D99] text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <span>Submit Bulk Enquiry</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
