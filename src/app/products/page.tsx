'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { QuoteModal } from '@/components/QuoteModal';
import { Search, Filter, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { initialProducts } from '@/lib/data/initialData';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const categories = [
    'All',
    'Steel Products',
    'Welding & Fabrication',
    'Agricultural Equipment',
  ];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory !== 'All') {
          params.append('category', activeCategory);
        }
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        } else if (data.success && data.products && data.products.length === 0) {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error loading products from MongoDB:', err);
        // keep fallback initialProducts
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory, searchQuery]);

  const handleOpenQuote = (productName: string) => {
    setQuoteProduct(productName);
    setIsQuoteOpen(true);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header (Page 3 Match) */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Products
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Explore our wide range of steel, fabrication and agricultural products.
          </p>
        </div>

        {/* Filter Tabs & Search Controls (Page 3 Match) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/25'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>
        </div>

        {/* Products Grid (Page 3 Exact Match) */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#0066FF] mb-2" />
            <p className="text-sm">Connecting to MongoDB & fetching catalogue...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No products found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search criteria or switch category tab.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#0066FF] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const imageSrc =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={product.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Card Image */}
                  <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </div>
                    {product.stockStatus && (
                      <div
                        className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          product.stockStatus === 'In Stock'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stockStatus}
                      </div>
                    )}
                  </div>

                  {/* Card Content (Page 3 Match) */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        {product.shortDescription || product.description}
                      </p>

                      {/* Specs pills if available */}
                      {product.specifications && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                            <span
                              key={key}
                              className="inline-block bg-slate-50 border border-slate-200 text-slate-600 text-[11px] px-2 py-0.5 rounded"
                            >
                              <span className="font-semibold">{key}:</span> {String(value)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Actions (Page 3 Exact Match: View Details | Request a Quote) */}
                    <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="py-2.5 px-3 text-center text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleOpenQuote(product.name)}
                        className="py-2.5 px-3 text-center text-xs font-semibold text-white bg-[#0066FF] hover:bg-[#0052CC] rounded-xl shadow-sm transition-colors cursor-pointer"
                      >
                        Request a Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={quoteProduct}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 flex items-center justify-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#0066FF] mb-2" />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
