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
  PackageCheck,
  Edit2,
  X,
  Loader2,
  TrendingDown,
} from 'lucide-react';
import { initialProducts } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';
import { DataTable, Column } from '@/components/admin/DataTable';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [filter, setFilter] = useState<'All' | 'Low Stock' | 'In Stock' | 'Out of Stock'>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal States for Stock CRUD
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [restockProduct, setRestockProduct] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State for Edit Stock Modal
  const [stockFormData, setStockFormData] = useState({
    stockQuantity: 10,
    stockStatus: 'In Stock',
    safetyThreshold: 5,
    location: 'Main Yard - Bay A',
    notes: '',
  });

  // Restock amount
  const [restockAmount, setRestockAmount] = useState<number>(20);

  const { setTitle, setBadge, setControls, setActions } = useAdminHeader();

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

  const lowStockCount = products.filter(
    (p) => p.stockStatus === 'Low Stock' || (p.stockQuantity ?? 10) <= 5
  ).length;

  const totalUnits = products.reduce((acc, p) => acc + (p.stockQuantity ?? 10), 0);

  // SYNC HEADER CONTROLS (No Page Title, Stock Status Dropdown, Search, Refresh)
  useEffect(() => {
    setTitle(null);

    // 1. Move Low Stock Alert into Layout Header as a Badge / Button
    if (lowStockCount > 0) {
      setBadge(
        <button
          onClick={() => setFilter((prev) => (prev === 'Low Stock' ? 'All' : 'Low Stock'))}
          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
            filter === 'Low Stock'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
          }`}
          title="Toggle Low Stock Filter"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{lowStockCount} Low Stock</span>
        </button>
      );
    } else {
      setBadge(null);
    }

    // 2. Stock Status Dropdown & Search Bar directly in Layout Header Controls
    setControls(
      <div className="flex items-center space-x-2.5 w-full">
        {/* Stock Status Dropdown in Header */}
        <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as 'All' | 'Low Stock' | 'In Stock' | 'Out of Stock')
            }
            aria-label="Filter by stock status"
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
          >
            <option value="All">All Stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Search Input in Header */}
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
      </div>
    );

    // 3. Refresh Action in Layout Header (Table View is Fixed)
    setActions(
      <div className="flex items-center space-x-2">
        <button
          onClick={fetchProducts}
          disabled={loading}
          className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
          title="Refresh Inventory"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#0066FF]' : ''}`} />
        </button>
      </div>
    );

    return () => {
      setTitle('');
      setBadge(null);
      setControls(null);
      setActions(null);
    };
  }, [loading, filter, search, lowStockCount]);

  // Adjust stock by delta (+1 or -1)
  const adjustStock = async (id: string, delta: number) => {
    const target = products.find((p) => p._id === id || p.slug === id);
    if (!target) return;

    const newQty = Math.max(0, (target.stockQuantity || 0) + delta);
    const newStatus =
      newQty === 0 ? 'Out of Stock' : newQty <= 5 ? 'Low Stock' : 'In Stock';

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
      console.error('Failed to update stock:', err);
    }
  };

  const handleOpenEditStock = (prod: any) => {
    setEditProduct(prod);
    setStockFormData({
      stockQuantity: prod.stockQuantity ?? 10,
      stockStatus: prod.stockStatus || 'In Stock',
      safetyThreshold: 5,
      location: prod.specifications?.Location || 'Warehouse 1 / Yard Bay A',
      notes: prod.specifications?.StockNotes || '',
    });
  };

  const handleSaveStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    setSaving(true);

    const id = editProduct._id || editProduct.slug;
    const qty = Number(stockFormData.stockQuantity);
    const status =
      qty === 0
        ? 'Out of Stock'
        : stockFormData.stockStatus === 'Out of Stock'
        ? 'Out of Stock'
        : qty <= stockFormData.safetyThreshold
        ? 'Low Stock'
        : stockFormData.stockStatus;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stockQuantity: qty,
          stockStatus: status,
          specifications: {
            ...editProduct.specifications,
            Location: stockFormData.location,
            StockNotes: stockFormData.notes,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id || p.slug === id ? data.product : p))
        );
        setEditProduct(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleExecuteRestock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restockProduct) return;
    setSaving(true);

    const id = restockProduct._id || restockProduct.slug;
    const newQty = (restockProduct.stockQuantity || 0) + Number(restockAmount);
    const newStatus = newQty > 5 ? 'In Stock' : 'Low Stock';

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stockQuantity: newQty,
          stockStatus: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id || p.slug === id ? data.product : p))
        );
        setRestockProduct(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchFilter =
      filter === 'All'
        ? true
        : filter === 'Out of Stock'
        ? p.stockStatus === 'Out of Stock' || (p.stockQuantity ?? 10) === 0
        : p.stockStatus === filter;

    const matchSearch =
      !search ||
      (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  // Columns for DataTable
  const columns: Column<any>[] = [
    {
      key: 'product',
      header: 'Product',
      sortable: true,
      render: (prod) => {
        const img = prod.images?.[0] || '/images/logo.png';
        return (
          <div className="flex items-center space-x-3">
            <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <Image
                src={img}
                alt={prod.name}
                fill
                className="object-cover"
                onError={(e: any) => {
                  e.target.src = '/images/logo.png';
                }}
              />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xs sm:text-sm">{prod.name}</p>
              <p className="text-[11px] text-slate-400">{prod.category}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'stockStatus',
      header: 'Status',
      align: 'center',
      sortable: true,
      render: (prod) => {
        const isLow = prod.stockStatus === 'Low Stock' || (prod.stockQuantity ?? 10) <= 5;
        const isOut = prod.stockStatus === 'Out of Stock' || (prod.stockQuantity ?? 10) === 0;

        return (
          <span
            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${
              isOut
                ? 'bg-slate-100 text-slate-700'
                : isLow
                ? 'bg-amber-100 text-amber-900'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
          </span>
        );
      },
    },
    {
      key: 'stockQuantity',
      header: 'Available Units',
      align: 'center',
      sortable: true,
      render: (prod) => {
        const qty = prod.stockQuantity ?? 10;
        return (
          <div className="inline-flex items-center space-x-2">
            <span className="font-black text-slate-900 text-sm">{qty}</span>
            <span className="text-[10px] text-slate-400 font-semibold">units</span>
          </div>
        );
      },
    },
    {
      key: 'adjust',
      header: 'Quick Adjust',
      align: 'center',
      render: (prod) => {
        const id = prod._id || prod.slug;
        return (
          <div className="flex items-center justify-center space-x-1.5">
            <button
              onClick={() => adjustStock(id, -1)}
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
              title="Decrease by 1"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => adjustStock(id, 1)}
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-[#0066FF] text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
              title="Increase by 1"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (prod) => {
        return (
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => {
                setRestockProduct(prod);
                setRestockAmount(25);
              }}
              className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
              title="Batch Restock"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Restock</span>
            </button>
            <button
              onClick={() => handleOpenEditStock(prod)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Edit Stock Details"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="h-full flex flex-col min-h-0 space-y-3.5">
      {/* Metrics Summary Strip */}
      <div className="shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Boxes className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Catalog Items</p>
            <p className="text-base font-black text-slate-900 leading-tight">{products.length}</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Units in Stock</p>
            <p className="text-base font-black text-slate-900 leading-tight">{totalUnits}</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Low Stock Alerts</p>
            <p className="text-base font-black text-amber-600 leading-tight">{lowStockCount}</p>
          </div>
        </div>
      </div>

      {/* Fixed Table View */}
      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        hideToolbar={true}
        pageSize={8}
        emptyTitle="No inventory matches found"
        emptySubtitle="Try selecting another stock status or clearing your search."
      />

      {/* Edit Stock Details Modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-lg w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Edit Stock Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">{editProduct.name}</p>
              </div>
              <button
                onClick={() => setEditProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStock} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Units in Stock *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stockFormData.stockQuantity}
                    onChange={(e) =>
                      setStockFormData({
                        ...stockFormData,
                        stockQuantity: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Stock Status
                  </label>
                  <select
                    value={stockFormData.stockStatus}
                    onChange={(e) =>
                      setStockFormData({ ...stockFormData, stockStatus: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600 font-semibold text-slate-900"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Storage Yard / Warehouse Location
                </label>
                <input
                  type="text"
                  value={stockFormData.location}
                  onChange={(e) =>
                    setStockFormData({ ...stockFormData, location: e.target.value })
                  }
                  placeholder="e.g. Yard Bay B, Shelf 4"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Safety Reorder Threshold (units)
                </label>
                <input
                  type="number"
                  min="1"
                  value={stockFormData.safetyThreshold}
                  onChange={(e) =>
                    setStockFormData({
                      ...stockFormData,
                      safetyThreshold: Number(e.target.value),
                    })
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Triggers low stock alert when quantity drops below this amount.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Inventory Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Restock Modal */}
      {restockProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-lg w-full max-w-sm shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#0052CC] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Restock Units</h3>
                <p className="text-xs text-blue-100 mt-0.5">{restockProduct.name}</p>
              </div>
              <button
                onClick={() => setRestockProduct(null)}
                className="p-1 rounded-lg text-blue-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteRestock} className="p-6 space-y-4">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Current Stock:</span>
                <span className="text-2xl font-black text-slate-900">
                  {restockProduct.stockQuantity ?? 10}{' '}
                  <span className="text-xs font-normal text-slate-400">units</span>
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Quantity to Add
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setRestockAmount(amt)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        restockAmount === amt
                          ? 'bg-[#0066FF] text-white border-blue-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      +{amt}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    required
                    value={restockAmount}
                    onChange={(e) => setRestockAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-blue-600"
                    placeholder="Custom amount..."
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">
                    units
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 text-xs">
                New total stock after restock:{' '}
                <span className="font-bold">
                  {(restockProduct.stockQuantity ?? 10) + Number(restockAmount)} units
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setRestockProduct(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirm Restock</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
