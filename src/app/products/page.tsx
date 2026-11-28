'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { QuoteModal } from '@/components/QuoteModal';
import { ProductCard, ProductCardData } from '@/components/ProductCard';
import { Search, Loader2, Package, MessageSquare } from 'lucide-react';
import { initialProducts } from '@/lib/data/initialData';
import { APPROVED_CATEGORIES, getWhatsAppUrl } from '@/lib/brand';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [products, setProducts] = useState<ProductCardData[]>(initialProducts);
  const [loading, setLoading] = useState(true);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Keep filter state synced when navigating via Navbar category links
  useEffect(() => {
    setActiveCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const [categories, setCategories] = useState<string[]>(['All', ...APPROVED_CATEGORIES]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories?activeOnly=true');
        const data = await res.json();
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          const names = data.categories.map((c: any) => c.name).filter(Boolean);
          setCategories(['All', ...Array.from(new Set<string>(names))]);
        }
      } catch {
        // Fallback to APPROVED_CATEGORIES
      }
    }
    loadCategories();
  }, []);

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
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error loading products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory, searchQuery]);

  const handleBulkEnquiry = (productName: string) => {
    setSelectedProduct(productName);
    setIsBulkModalOpen(true);
  };

  const activeCategoryNames = categories.filter((c) => c !== 'All');
  const categorySummary =
    activeCategoryNames.length > 1
      ? `${activeCategoryNames.slice(0, -1).join(', ')}, and ${activeCategoryNames[activeCategoryNames.length - 1]}`
      : activeCategoryNames[0] || 'manufactured';

  return (
    <div className="bg-white min-h-screen py-6 lg:py-8">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Page Header */}
        <div className="mb-4 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] tracking-tight">
            Our Products
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Practical, reliable products manufactured under the ZHI DIMENSION brand across {categorySummary} for bulk orders.
          </p>
        </div>

        {/* Category Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 pb-3.5 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0052CC] text-white'
                      : 'bg-[#F8FAFC] text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC]"
            />
          </div>
        </div>

        {/* Product Grid or Compact Horizontal Empty State */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-7 h-7 animate-spin text-[#0052CC] mb-2" />
            <p className="text-sm">Loading approved products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0052CC] flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#0B1320]">
                  {activeCategory === 'All'
                    ? 'Direct Manufacturer Bulk Catalogue'
                    : `${activeCategory} Products`}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Only verified, approved ZHI DIMENSION products and photographs are displayed here. Connect with our sales team on WhatsApp to request our latest product sheet and bulk order details.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              <a
                href={getWhatsAppUrl(
                  activeCategory === 'All'
                    ? undefined
                    : `Hello ZHI DIMENSION, I am interested in your ${activeCategory} products. Please share your bulk order details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm font-bold rounded-xl inline-flex items-center gap-2 transition-colors text-center"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>Enquire on WhatsApp</span>
              </a>
              {(activeCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer text-center"
                >
                  Show All Categories
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                onBulkEnquiry={handleBulkEnquiry}
              />
            ))}
          </div>
        )}
      </div>

      <QuoteModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 flex items-center justify-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#0052CC]" />
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
