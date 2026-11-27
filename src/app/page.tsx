'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  MessageSquare,
  Sprout,
  Home,
  Factory,
  CheckCircle2,
  Package,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';
import { QuoteModal } from '@/components/QuoteModal';
import { ProductCard, ProductCardData } from '@/components/ProductCard';
import { BulkOrderFlow } from '@/components/BulkOrderFlow';
import { getWhatsAppUrl } from '@/lib/brand';
import { initialCategories, initialProducts } from '@/lib/data/initialData';

interface CategoryItem {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  status?: string;
}

function getCategoryStyle(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('agri') || lower.includes('farm')) {
    return {
      Icon: Sprout,
      iconWrap: 'bg-emerald-50 text-emerald-600',
      cornerAccent: 'bg-[#22C55E]',
    };
  }
  if (lower.includes('home') || lower.includes('residen')) {
    return {
      Icon: Home,
      iconWrap: 'bg-blue-50 text-[#0052CC]',
      cornerAccent: 'bg-[#3B82F6]',
    };
  }
  if (lower.includes('indus') || lower.includes('commer')) {
    return {
      Icon: Factory,
      iconWrap: 'bg-orange-50 text-[#F97316]',
      cornerAccent: 'bg-[#F97316]',
    };
  }
  return {
    Icon: Package,
    iconWrap: 'bg-[#EFF6FF] text-[#0052CC]',
    cornerAccent: 'bg-[#0052CC]',
  };
}

export default function HomePage() {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [activeTab, setActiveTab] = useState<string>('All');
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [products, setProducts] = useState<ProductCardData[]>(initialProducts);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function loadHomepageData() {
      setLoadingProducts(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories?activeOnly=true', { cache: 'no-store' }),
          fetch('/api/products?limit=12', { cache: 'no-store' }),
        ]);

        const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);

        if (catData.success && Array.isArray(catData.categories) && catData.categories.length > 0) {
          setCategories(catData.categories);
        }
        if (prodData.success && Array.isArray(prodData.products)) {
          setProducts(prodData.products);
        }
      } catch {
        // Keep initialCategories / initialProducts fallback if DB is offline
      } finally {
        setLoadingProducts(false);
      }
    }
    loadHomepageData();
  }, []);

  const openBulkEnquiryFor = (productName: string) => {
    setSelectedProduct(productName);
    setIsBulkModalOpen(true);
  };

  const filteredProducts =
    activeTab === 'All'
      ? products.slice(0, 6)
      : products.filter((p) => p.category === activeTab).slice(0, 6);

  return (
    <div className="flex flex-col bg-white text-slate-900">
      {/* 1. WORKSHOP HERO SECTION */}
      <section className="relative min-h-[460px] lg:min-h-[500px] xl:min-h-[540px] flex items-center overflow-hidden bg-[#061834]">
        {/* Full-Bleed Workshop Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-workshop.jpg"
            alt="ZHI DIMENSION Product Manufacturing Workshop"
            fill
            priority
            className="object-cover object-[75%_65%] lg:object-[center_62%]"
          />
          {/* Deep navy-to-royal-blue left readability overlay fading smoothly into workshop scene */}
          <div className="absolute inset-0 bg-[#061834]/70 sm:bg-[#061834]/45 lg:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041736] via-[#072654]/92 via-42% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041736]/80 via-transparent to-[#041736]/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-11 lg:py-12 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-5 text-white">
            {/* Primary Headline with Golden Brush Swoop */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-extrabold tracking-tight leading-[1.12] text-white">
              From Our Workshop,
              <br />
              <span className="sm:whitespace-nowrap">
                To{' '}
                <span className="relative inline-block text-[#38BDF8]">
                  Real-World Solutions.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 320 18"
                    fill="none"
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#FACC15]"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 13 C 95 4, 215 3, 314 9"
                      stroke="currentColor"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-[17px] text-slate-200 leading-relaxed max-w-lg pt-1">
              We design and manufacture practical products for agriculture, home and industrial applications.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/products"
                className="px-5 py-3 bg-[#0057E7] hover:bg-[#0044B8] text-white text-sm font-bold rounded-lg shadow-md transition-colors inline-flex items-center gap-2.5"
              >
                <Package className="w-4 h-4" />
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#0D2E27]/90 hover:bg-[#113D33] text-white text-sm font-bold rounded-lg border border-[#22C55E]/70 transition-colors inline-flex items-center gap-2.5 backdrop-blur-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {/* Bottom 3 Application Quick-Links */}
            <div className="pt-3 flex flex-wrap items-center gap-y-3">
              <Link
                href="/products?category=Agriculture"
                className="group flex items-center gap-2.5 pr-5 sm:mr-5 sm:border-r sm:border-white/20"
              >
                <Sprout className="w-6 h-6 text-[#4ADE80] shrink-0 stroke-[1.75]" />
                <div className="text-xs font-semibold text-slate-100 group-hover:text-white leading-snug">
                  <div>Agriculture</div>
                  <div>Applications</div>
                </div>
              </Link>

              <Link
                href="/products?category=Home+%26+Residential"
                className="group flex items-center gap-2.5 pr-5 sm:mr-5 sm:border-r sm:border-white/20"
              >
                <Home className="w-6 h-6 text-[#38BDF8] shrink-0 stroke-[1.75]" />
                <div className="text-xs font-semibold text-slate-100 group-hover:text-white leading-snug">
                  <div>Home &amp;</div>
                  <div>Residential Use</div>
                </div>
              </Link>

              <Link
                href="/products?category=Industrial"
                className="group flex items-center gap-2.5"
              >
                <Factory className="w-6 h-6 text-[#FBBF24] shrink-0 stroke-[1.75]" />
                <div className="text-xs font-semibold text-slate-100 group-hover:text-white leading-snug">
                  <div>Industrial</div>
                  <div>Applications</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT APPLICATION CATEGORIES (Synced with Admin Categories) */}
      <section className="relative bg-gradient-to-b from-[#F3F8FF] via-white to-[#F8FAFC] py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Header with Golden Brush Swoop */}
          <div className="text-center max-w-5xl mx-auto mb-7 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1320] tracking-tight leading-tight sm:whitespace-nowrap">
              Products for{' '}
              <span className="relative inline-block text-[#0052CC]">
                Real-World Needs
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 18"
                  fill="none"
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#FACC15]"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 13 C 95 4, 215 3, 314 9"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto">
              Every ZHI DIMENSION product is organized around the environments where reliability matters most.
            </p>
          </div>

          {/* Dynamic Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const { Icon, iconWrap, cornerAccent } = getCategoryStyle(cat.name);
              const categoryHref = `/products?category=${encodeURIComponent(cat.name)}`;
              const cardImg = cat.image || '/images/logo.png';

              return (
                <Link
                  key={cat._id || cat.slug || cat.name}
                  href={categoryHref}
                  className="group bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0052CC]/50 hover:-translate-y-0.5 transition-all flex flex-col cursor-pointer"
                >
                  {/* Category Photo with Subtle Bottom-Right Curved Accent */}
                  <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={cardImg}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-3 -right-3 w-14 h-10 rounded-tl-full ${cornerAccent} opacity-95`}
                    />
                  </div>

                  {/* Icon Badge + Category Name */}
                  <div className="flex items-center gap-3 mt-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconWrap}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0B1320] group-hover:text-[#0052CC] transition-colors">
                      {cat.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0052CC] group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. APPROVED PRODUCT CATALOGUE SHOWCASE */}
      <section className="bg-white py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320]">
              ZHI DIMENSION Product Range
            </h2>
            <Link
              href="/products"
              className="text-sm font-bold text-[#0052CC] hover:text-[#003D99] inline-flex items-center gap-1.5"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Dynamic Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-5">
            {['All', ...categories.map((c) => c.name)].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0052CC] text-white'
                    : 'bg-[#F8FAFC] text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loadingProducts ? (
            <div className="py-8 text-center text-sm text-slate-500">
              Loading approved ZHI DIMENSION products...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  onBulkEnquiry={openBulkEnquiryFor}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              <div className="flex items-start gap-4 max-w-2xl">
                <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0052CC] flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1320]">
                    Direct Manufacturer Bulk Catalogue
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Approved {activeTab === 'All' ? 'ZHI DIMENSION' : activeTab} product listings and photographs are managed directly by our product team. Connect on WhatsApp for our latest verified catalogue and bulk order details.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm font-bold rounded-xl inline-flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Request Catalogue on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => openBulkEnquiryFor(activeTab === 'All' ? '' : activeTab)}
                  className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#003D99] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Enquire for Bulk Orders
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. BULK ORDER CUSTOMER JOURNEY */}
      <section className="bg-[#F8FAFC] py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320]">
              How Bulk Orders Work
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              From product discovery to confirmed bulk dispatch via direct WhatsApp communication.
            </p>
          </div>

          <BulkOrderFlow />
        </div>
      </section>

      {/* 5. ABOUT ZHI DIMENSION SECTION */}
      <section className="bg-white py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] leading-tight">
                Practical Products. Powerful Solutions.
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  ZHI DIMENSION is focused on developing and manufacturing practical products that bring value to everyday life and industrial operations.
                </p>
                <p>
                  With a commitment to product quality, engineering and continuous improvement, we aim to create reliable solutions for agriculture, residential and commercial applications.
                </p>
                <p className="font-semibold text-[#0B1320]">
                  Our focus is simple: manufacture useful products, maintain quality and deliver value to our customers.
                </p>
              </div>
              <div className="pt-1">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0052CC] hover:text-[#003D99]"
                >
                  <span>Read More About ZHI DIMENSION</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-[#0052CC] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B1320]">Designed to Perform. Built to Last.</h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Every product is developed under the ZHI DIMENSION brand with practical engineering and quality control.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#0052CC] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B1320]">Direct Bulk Supply</h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Streamlined bulk order fulfilment directly from ZHI DIMENSION to businesses, distributors, and buyers.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-start gap-3.5">
                <PhoneCall className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0B1320]">Direct Customer Relationships</h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Fast, responsive sales discussions on WhatsApp without complicated checkout flows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
