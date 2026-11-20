'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Boxes,
  AlertTriangle,
  CheckCircle,
  Plus,
  Minus,
  Search,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { initialProducts } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [filter, setFilter] = useState<'All' | 'Low Stock' | 'In Stock'>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const { setTitle, setActions } = useAdminHeader();

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setTitle('Inventory Monitoring');
    setActions(
      <button
        onClick={fetchProducts}
        disabled={loading}
        className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
        title="Refresh Inventory"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-500' : ''}`} />
      </button>
    );
    return () => setActions(null);
  }, [loading]);

  const adjustStock = async (id: string, delta: number) => {
    const target = products.find((p) => p._id === id || p.slug === id);
    if (!target) return;

    const newQty = Math.max(0, (target.stockQuantity || 0) + delta);
    const newStatus =
      newQty === 0 ? 'Out of Stock' : newQty <= 5 ? 'Low Stock' : 'In Stock';

    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id || p.slug === id
          ? { ...p, stockQuantity: newQty, stockStatus: newStatus }
          : p
      )
    );

    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockQuantity: newQty, stockStatus: newStatus }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = products.filter((p) => {
    const matchFilter = filter === 'All' || p.stockStatus === filter;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const lowStockCount = products.filter((p) => p.stockStatus === 'Low Stock').length;

  return (
    <div className="space-y-6">
      {/* Low Stock Warning Banner if any */}
      {lowStockCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-amber-900 text-xs">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Inventory Alert:</span> {lowStockCount} product(s) are below safety stock threshold (&le; 5 units). Reordering or yard fabrication recommended.
            </div>
          </div>
          <button
            onClick={() => setFilter('Low Stock')}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shrink-0 ml-4"
          >
            Filter Low Stock
          </button>
        </div>
      )}

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-2">
          {(['All', 'In Stock', 'Low Stock'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => {
          const img =
            prod.images?.[0] ||
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80';
          const isLow = prod.stockStatus === 'Low Stock';

          return (
            <div
              key={prod._id || prod.slug}
              className={`bg-white rounded-2xl p-5 border shadow-xs flex flex-col justify-between transition-all ${
                isLow ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <Image src={img} alt={prod.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{prod.name}</h4>
                  <p className="text-[11px] text-slate-500">{prod.category}</p>
                  <span
                    className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isLow ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {prod.stockStatus}
                  </span>
                </div>
              </div>

              {/* Adjust Stock Counter */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Units in Stock</span>
                  <span className="text-xl font-black text-slate-900">
                    {prod.stockQuantity ?? 10}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => adjustStock(prod._id || prod.slug, -1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors"
                    title="Decrease Stock"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => adjustStock(prod._id || prod.slug, 1)}
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-orange-600 text-white font-bold flex items-center justify-center transition-colors"
                    title="Increase Stock"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

