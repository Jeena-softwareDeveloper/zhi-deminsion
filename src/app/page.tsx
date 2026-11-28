'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  MessageSquare,
  MessageCircle,
  Leaf,
  Home,
  Building2,
  CheckCircle2,
  Settings,
  Layers,
  Truck,
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

function getCategoryCardMeta(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('agri') || lower.includes('farm')) {
    return {
      Icon: Leaf,
      circleBg: 'bg-[#16A34A]',
      fallbackImage: '/images/cat-agriculture.jpg',
      shortTitle: ['Agriculture', 'Products'],
    };
  }
  if (lower.includes('home') || lower.includes('residen')) {
    return {
      Icon: Home,
      circleBg: 'bg-[#1D4ED8]',
      fallbackImage: '/images/cat-home.jpg',
      shortTitle: ['Home', 'Products'],
    };
  }
  if (lower.includes('indus') || lower.includes('commer')) {
    return {
      Icon: Building2,
      circleBg: 'bg-[#0B2559]',
      fallbackImage: '/images/cat-industrial.jpg',
      shortTitle: ['Industrial', 'Products'],
    };
  }
  if (lower.includes('steel')) {
    return {
      Icon: Package,
      circleBg: 'bg-[#0052CC]',
      fallbackImage: '/images/cat-industrial.jpg',
      shortTitle: ['Steel', 'Products'],
    };
  }
  if (lower.includes('weld') || lower.includes('fabric')) {
    return {
      Icon: Building2,
      circleBg: 'bg-[#0B2559]',
      fallbackImage: '/images/cat-industrial.jpg',
      shortTitle: ['Welding &', 'Fabrication'],
    };
  }
  const words = name.trim().split(/\s+/);
  const titleLines =
    words.length > 1
      ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')]
      : [name, 'Products'];
  return {
    Icon: Package,
    circleBg: 'bg-[#0052CC]',
    fallbackImage: '/images/cat-industrial.jpg',
    shortTitle: titleLines,
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
      {/* 1. SUNLIT PRODUCT SHOWCASE HERO SECTION + OVERLAPPING CATEGORY STRIP */}
      <section className="relative bg-white border-b border-slate-200/80">
        <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden bg-[#EAF3FF] border-b border-slate-200/70">
          {/* Full-Bleed Sunlit Outdoor Showcase Photo (Machinery, Table & Rack Fully Visible) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/Blue Agricultural Machine in Sunny Fields.png"
              alt="ZHI DIMENSION blue agricultural machine, stainless workbench, and heavy-duty shelving rack"
              fill
              priority
              className="object-cover object-[70%_54%] sm:object-[72%_52%] lg:object-[75%_50%]"
            />
            {/* Soft Frosted Readability Mist on Left (Keeps Natural Blue Sky & Horizon Visible) */}
            <div
              className="absolute inset-0 backdrop-blur-[1.5px]"
              style={{
                maskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 42%)',
                WebkitMaskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 42%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(244,249,255,0.82) 0%, rgba(255,255,255,0.72) 20%, rgba(255,255,255,0.42) 34%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0) 58%)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16 lg:py-20 w-full">
            <div className="max-w-lg lg:max-w-xl space-y-4 sm:space-y-5">
              {/* Eyebrow Label + Horizontal Accent Line */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#1E3A5F]">
                  Industrial &amp; Agriculture Solutions
                </span>
                <span className="h-[1px] w-12 sm:w-16 bg-blue-300" />
              </div>

              {/* Primary Display Headline */}
              <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-extrabold tracking-tight leading-[1.08] text-[#0B1E46]">
                Made for Real
                <span className="block">
                  World <span className="text-[#0052CC]">Applications</span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 font-medium leading-relaxed max-w-md">
                Thoughtfully manufactured products for agriculture, home and industrial use.
              </p>

              {/* Action Buttons: Blue Solid + White Outlined WhatsApp Quote */}
              <div className="pt-1 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-6 py-3 bg-[#0057D9] hover:bg-[#0044B8] text-white text-sm font-bold rounded-lg shadow-md shadow-blue-700/20 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Our Products</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-[#0B1E46] border border-slate-300/90 text-sm font-bold rounded-lg shadow-xs transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Get Bulk Quote</span>
                </a>
              </div>

              {/* Bottom 3 Blue-Icon Trust Highlights */}
              <div className="pt-3 flex flex-wrap items-center gap-y-3 gap-x-5 sm:gap-x-0">
                <div className="flex items-center gap-2.5 sm:pr-5 sm:mr-5 sm:border-r sm:border-slate-300/80">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-[#0052CC] shrink-0 stroke-[1.8]" />
                  <div className="text-[11px] sm:text-xs font-bold text-[#0F172A] leading-tight">
                    <div>Quality</div>
                    <div>Manufacturing</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:pr-5 sm:mr-5 sm:border-r sm:border-slate-300/80">
                  <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-[#0052CC] shrink-0 stroke-[1.8]" />
                  <div className="text-[11px] sm:text-xs font-bold text-[#0F172A] leading-tight">
                    <div>Durable &amp;</div>
                    <div>Long Lasting</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#0052CC] shrink-0 stroke-[1.8]" />
                  <div className="text-[11px] sm:text-xs font-bold text-[#0F172A] leading-tight">
                    <div>Bulk Orders</div>
                    <div>Welcome</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Category Cards Strip Positioned Cleanly Below Hero Banner */}
        <div className="relative z-20 bg-[#F8FAFC] py-8 sm:py-10 lg:py-12">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
              {categories.slice(0, 3).map((cat) => {
                const { Icon, circleBg, fallbackImage, shortTitle } = getCategoryCardMeta(cat.name);
                const categoryHref = `/products?category=${encodeURIComponent(cat.name)}`;
                const cardImg = cat.image || fallbackImage;

                return (
                  <Link
                    key={cat._id || cat.slug || cat.name}
                    href={categoryHref}
                    className="group relative h-[190px] sm:h-[220px] lg:h-[245px] rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md shadow-slate-900/5 hover:shadow-xl hover:border-[#0052CC]/40 hover:-translate-y-0.5 transition-all flex items-center justify-between p-5 sm:p-6 lg:p-7 cursor-pointer"
                  >
                    {/* Right-side Category Photo */}
                    <Image
                      src={cardImg}
                      alt={cat.name}
                      fill
                      className="object-cover object-right group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Crisp Left-to-Right Frosted White Gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.93) 45%, rgba(255,255,255,0.45) 72%, rgba(255,255,255,0.06) 100%)',
                      }}
                    />

                    {/* Top-Left Icon Badge + Title & Concise Subtitle */}
                    <div className="relative z-10 flex flex-col justify-between h-full max-w-[68%]">
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${circleBg} text-white flex items-center justify-center shadow-sm`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="space-y-1.5">
                        <h2 className="text-lg sm:text-xl lg:text-[22px] font-extrabold text-[#0B1E46] leading-tight group-hover:text-[#0052CC] transition-colors">
                          <span className="block">{shortTitle[0]}</span>
                          <span className="block">{shortTitle[1]}</span>
                        </h2>
                        {cat.description && (
                          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom-Right White Circular Arrow */}
                    <div className="relative z-10 self-end">
                      <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#0B1E46] group-hover:bg-[#0052CC] group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. APPROVED PRODUCT CATALOGUE SHOWCASE */}
      <section className="bg-white py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm font-bold rounded-xl inline-flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                  <span>Request Catalogue on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => openBulkEnquiryFor(activeTab === 'All' ? '' : activeTab)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#0052CC] hover:bg-[#003D99] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer text-center"
                >
                  Enquire for Bulk Orders
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. BULK ORDER CUSTOMER JOURNEY */}
      <section className="bg-[#F8FAFC] py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
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

      {/* 4. ABOUT ZHI DIMENSION SECTION */}
      <section className="bg-white py-10 sm:py-12 border-b border-slate-200">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
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
