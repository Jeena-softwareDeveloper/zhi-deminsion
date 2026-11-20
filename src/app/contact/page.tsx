'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    productRequired: 'General Inquiry',
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
        throw new Error(data.error || 'Failed to submit contact request');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ZHI DIMENSION! I would like to enquire about your steel and equipment products.`
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Contact ZHI DIMENSION
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Reach out to our engineering sales desk for wholesale quotes, fabrication drawings, or agricultural machinery inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Information & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1320] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-slate-800">
              <h3 className="text-xl font-bold">Headquarters & Fabrication Yard</h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <span>Plot 42-A, Heavy Industrial Growth Center, Phase II, Chennai, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>+91 98765 43210 / +91 98400 67890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>sales@zhidimension.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Monday - Saturday: 8:00 AM - 7:00 PM</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-sm text-slate-600">
              <h4 className="font-bold text-slate-900 mb-2">Bulk & Institutional Orders</h4>
              <p className="text-xs leading-relaxed">
                For tenders, construction project supplies exceeding 50 metric tonnes, or dealership enquiries for agricultural rotavators and implements, contact our Director of Commercial Operations at commercial@zhidimension.com.
              </p>
            </div>
          </div>

          {/* Contact / Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">Send an Inquiry</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Fill out the form below. Inquiries are instantly synced to our customer management database.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Message Received!</h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-slate-900">{formData.customerName}</span>. Your inquiry has been registered. An executive will call you at <span className="font-semibold text-slate-900">{formData.phone}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      customerName: '',
                      phone: '',
                      email: '',
                      productRequired: 'General Inquiry',
                      quantitySize: '',
                      message: '',
                    });
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Submit Another Message
                </button>
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
                      Your Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 text-slate-900"
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
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Product / Requirement <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Steel Pipes 4-inch / Rotavator 6ft"
                      value={formData.productRequired}
                      onChange={(e) => setFormData({ ...formData, productRequired: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Quantity / Project Specifications
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50 tonnes / 2 units / Drawing attached"
                    value={formData.quantitySize}
                    onChange={(e) => setFormData({ ...formData, quantitySize: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Please include delivery destination, urgency, or specific grade requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transmitting to Sales Desk...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry</span>
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

