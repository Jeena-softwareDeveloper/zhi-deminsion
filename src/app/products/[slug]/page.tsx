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
  FileText,
  Package,
} from 'lucide-react';
import { initialProducts } from '@/lib/data/initialData';
import { getProductWhatsAppUrl } from '@/lib/brand';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImgError(false);
  }, [selectedImage]);

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
          setSelectedImage(data.product.images?.[0] || '');
          setFormData((prev) => ({
            ...prev,
            productRequired: `${data.product.name} (${data.product.category})`,
          }));
        } else {
          const found = initialProducts.find((p) => p.slug === slug);
          if (found) {
            setProduct(found);
            setSelectedImage(found.images?.[0] || '');
            setFormData((prev) => ({
              ...prev,
              productRequired: `${found.name} (${found.category})`,
            }));
          }
        }
      } catch {
        const found = initialProducts.find((p) => p.slug === slug);
        if (found) {
          setProduct(found);
          setSelectedImage(found.images?.[0] || '');
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
        throw new Error(data.error || 'Failed to submit bulk enquiry');
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
        <Loader2 className="w-8 h-8 animate-spin text-[#0052CC] mb-2" />
        <p className="text-sm">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-24 text-center px-4">
        <h1 className="text-2xl font-bold text-[#0B1320]">Product Not Found</h1>
        <p className="text-slate-600 text-sm mt-2">
          The requested product could not be found in our approved catalogue.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-block px-6 py-2.5 bg-[#0052CC] text-white rounded-xl text-sm font-semibold"
        >
          Back to Our Products
        </Link>
      </div>
    );
  }

  const verifiedSpecs = product.specifications
    ? Object.entries(product.specifications).filter(([, val]) => String(val).trim() !== '')
    : [];
  const whatsappHref = getProductWhatsAppUrl(
    product.name,
    product.category,
    formData.quantitySize
  );

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-[#0B1320] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#0B1320] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0B1320] font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Column: Actual Photos, Description & Verified Specifications */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 bg-[#F8FAFC] rounded-2xl p-5 sm:p-8 border border-slate-200">
            <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              {selectedImage && !imgError ? (
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  onError={() => setImgError(true)}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Package className="w-12 h-12" />
                  <span className="text-xs font-medium">Product photograph</span>
                </div>
              )}
              <span className="absolute top-4 left-4 bg-[#0B1320]/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {product.category}
              </span>
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-[#0052CC]'
                        : 'border-slate-200 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                {product.description || product.shortDescription}
              </p>
            </div>

            {verifiedSpecs.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1320] mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0052CC]" />
                  <span>Key Specifications</span>
                </h2>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-sm bg-white">
                  {verifiedSpecs.map(([key, val]) => (
                    <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3.5">
                      <span className="font-semibold text-slate-700 sm:col-span-1">{key}</span>
                      <span className="text-slate-600 sm:col-span-2">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>Enquire on WhatsApp</span>
              </a>
              <a
                href="#bulk-enquiry-card"
                className="w-full sm:w-auto px-7 py-3 bg-[#0052CC] hover:bg-[#003D99] text-white text-sm font-bold rounded-xl transition-colors text-center"
              >
                Bulk Enquiry Form
              </a>
            </div>
          </div>

          {/* Right Column: Bulk Order Enquiry Form */}
          <div
            id="bulk-enquiry-card"
            className="lg:col-span-5 bg-[#0B1320] text-white rounded-2xl p-5 sm:p-8 border border-slate-800 lg:sticky lg:top-24"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Enquire for Bulk Orders</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-6">
              Share your bulk quantity details or connect directly on WhatsApp with our sales desk.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold">Bulk Enquiry Submitted</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.customerName}</span>. Our sales team will connect regarding <span className="text-blue-400 font-semibold">{product.name}</span>.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl text-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Continue on WhatsApp</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 text-xs bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Name <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0052CC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone or WhatsApp number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0052CC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Product <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.productRequired}
                    onChange={(e) => setFormData({ ...formData, productRequired: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0052CC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Bulk Order Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="Enter estimated bulk quantity"
                    value={formData.quantitySize}
                    onChange={(e) => setFormData({ ...formData, quantitySize: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0052CC]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-[#0052CC] hover:bg-[#003D99] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer text-sm"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
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
