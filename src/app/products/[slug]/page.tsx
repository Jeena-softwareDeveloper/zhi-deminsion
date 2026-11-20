'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight,
  MessageSquare,
  CheckCircle,
  Loader2,
  ShieldCheck,
  FileText,
  Phone,
  User,
  Layers,
} from 'lucide-react';
import { initialProducts } from '@/lib/data/initialData';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    productRequired: '',
    quantitySize: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images[0] || '');
          setFormData((prev) => ({
            ...prev,
            productRequired: `${data.product.name} (${data.product.category})`,
          }));
        } else {
          // Fallback to initialProducts
          const found = initialProducts.find((p) => p.slug === slug);
          if (found) {
            setProduct(found);
            setSelectedImage(found.images[0]);
            setFormData((prev) => ({
              ...prev,
              productRequired: `${found.name} (${found.category})`,
            }));
          }
        }
      } catch (err) {
        const found = initialProducts.find((p) => p.slug === slug);
        if (found) {
          setProduct(found);
          setSelectedImage(found.images[0]);
          setFormData((prev) => ({
            ...prev,
            productRequired: `${found.name} (${found.category})`,
          }));
        }
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

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
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-2" />
        <p className="text-sm">Loading product details from MongoDB...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-slate-500 mt-2">The requested product could not be located.</p>
        <Link
          href="/products"
          className="mt-4 inline-block px-6 py-2.5 bg-[#F97316] text-white rounded-xl text-sm font-semibold"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello ZHI DIMENSION! I am interested in *${product.name}*.\nPlease share current pricing, technical catalogue, and availability for: ${formData.quantitySize || 'Standard requirements'}.`
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation (Page 6 Exact Match) */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-slate-900 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{product.name}</span>
        </nav>

        {/* Main Grid: Left presentation + Right Request a Quote form (Page 6 Exact Match) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Gallery, Title, Description, Specifications, Buttons (col-span-7) */}
          <div className="lg:col-span-7 space-y-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            {/* Main Product Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src={selectedImage || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                {product.category}
              </span>
            </div>

            {/* Thumbnail Strip (Page 6) */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-[#F97316] ring-2 ring-orange-500/20'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Description (Page 6) */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                {product.shortDescription || product.description}
              </p>
            </div>

            {/* Specifications Table (Page 6 Exact Match) */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-orange-500" />
                <span>Specifications</span>
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-sm">
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3 bg-white hover:bg-slate-50 transition-colors">
                      <span className="font-semibold text-slate-700 sm:col-span-1">{key}</span>
                      <span className="text-slate-600 sm:col-span-2">: {String(val)}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3 bg-white">
                      <span className="font-semibold text-slate-700">Material</span>
                      <span className="text-slate-600 sm:col-span-2">: Mild Steel / Stainless Steel</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3 bg-slate-50">
                      <span className="font-semibold text-slate-700">Size Range</span>
                      <span className="text-slate-600 sm:col-span-2">{': 1/2" - 12"'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3 bg-white">
                      <span className="font-semibold text-slate-700">Length</span>
                      <span className="text-slate-600 sm:col-span-2">: 6m / 12m</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3 bg-slate-50">
                      <span className="font-semibold text-slate-700">Standards</span>
                      <span className="text-slate-600 sm:col-span-2">: IS / ASTM / Custom</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Direct Action Buttons: Request a Quote (Orange) + WhatsApp (Green) (Page 6 Exact Match) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#quote-form-card"
                className="flex-1 sm:flex-none px-7 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-bold rounded-xl shadow-md transition-colors text-center"
              >
                Request a Quote
              </a>
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-7 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: "Request a Quote" Card (Page 6 Exact Match) (col-span-5) */}
          <div
            id="quote-form-card"
            className="lg:col-span-5 bg-[#1E293B] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 sticky top-24"
          >
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Request a Quote</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-6">
              Fill in your details and we will get back to you soon.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold">Enquiry Received!</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.customerName}</span>. Your enquiry for <span className="text-orange-400 font-semibold">{product.name}</span> has been logged into our MongoDB system. An estimate will be shared shortly.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        customerName: '',
                        phone: '',
                        email: '',
                        productRequired: product.name,
                        quantitySize: '',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-medium text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 text-xs bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl">
                    {formError}
                  </div>
                )}

                {/* Name * */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Name <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Phone Number * */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Phone Number <span className="text-orange-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Product Requirement * */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Product Requirement <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what you need"
                    value={formData.productRequired}
                    onChange={(e) => setFormData({ ...formData, productRequired: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Quantity / Size */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Quantity / Size
                  </label>
                  <input
                    type="text"
                    placeholder="Enter quantity or size"
                    value={formData.quantitySize}
                    onChange={(e) => setFormData({ ...formData, quantitySize: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Submit button (Page 6 Exact Match) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer text-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
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
    </div>
  );
}
