'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QuoteModal } from '@/components/QuoteModal';
import { initialProducts } from '@/lib/data/initialData';
import { Tractor, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AgriculturalEquipmentPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const agriProducts = initialProducts.filter(
    (p) => p.category === 'Agricultural Equipment'
  );

  const handleOpenQuote = (name: string) => {
    setQuoteProduct(name);
    setIsQuoteOpen(true);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* HERO BANNER (Page 5 Exact Match) */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-start overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/agri-tractor.jpg"
            alt="Agricultural farm tractor"
            fill
            priority
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-xl text-white space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Tractor className="w-3.5 h-3.5" />
              <span>Heavy Duty Farm Implements</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Farming Tools & Agricultural Equipment
            </h1>
            <p className="text-base sm:text-lg text-slate-200">
              Better tools for better harvests.
            </p>
            <div className="pt-2">
              <a
                href="#featured-agri"
                className="inline-block px-7 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl shadow-lg transition-all"
              >
                View Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED AGRICULTURAL PRODUCTS SECTION (Page 5 Match) */}
      <section id="featured-agri" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Agricultural Products
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Field-proven agricultural implements engineered for Indian soil conditions.
            </p>
          </div>
          <Link
            href="/products?category=Agricultural+Equipment"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid (Page 5 Exact: Rotavator, Plough, Seed Drill, Sprayer) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agriProducts.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    product.stockStatus === 'In Stock'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.stockStatus}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  <div className="mt-3 text-xs font-semibold text-slate-800 bg-slate-50 px-2 py-1 rounded inline-block">
                    Price: <span className="text-orange-600 font-bold">{product.priceEstimate}</span>
                  </div>
                </div>

                {/* Actions (View Details | Request a Quote) */}
                <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="py-2 text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleOpenQuote(product.name)}
                    className="py-2 text-center text-xs font-semibold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-lg transition-colors cursor-pointer"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agricultural Machinery Features */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Boron Steel Blades</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Superior wear-life tested against abrasive black cotton and red soils, minimizing downtime.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Universal PTO & Linkage</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Compatible with all standard tractor brands including Mahindra, John Deere, Sonalika, Swaraj, and Massey Ferguson.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Tractor className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Subsidies & Documentation</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Eligible for central and state agricultural implement subsidy programs with full invoice documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={quoteProduct}
      />
    </div>
  );
}

