'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  X,
  Check,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { initialProducts } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { setTitle, setActions } = useAdminHeader();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Steel Products',
    shortDescription: '',
    description: '',
    images: '',
    stockStatus: 'In Stock',
    stockQuantity: 10,
    priceEstimate: '',
    specMaterial: '',
    specSize: '',
    specStandards: '',
  });

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
    setTitle('Products Management');
    setActions(
      <button
        onClick={handleOpenAdd}
        className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Add New Product</span>
      </button>
    );
    return () => setActions(null);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Steel Products',
      shortDescription: '',
      description: '',
      images: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      stockStatus: 'In Stock',
      stockQuantity: 20,
      priceEstimate: 'On Request',
      specMaterial: 'Mild Steel',
      specSize: 'Standard',
      specStandards: 'IS / ASTM',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: any) => {
    setEditingId(p._id || p.slug);
    setFormData({
      name: p.name,
      category: p.category,
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      images: p.images ? p.images.join(', ') : '',
      stockStatus: p.stockStatus || 'In Stock',
      stockQuantity: p.stockQuantity || 10,
      priceEstimate: p.priceEstimate || 'On Request',
      specMaterial: p.specifications?.Material || '',
      specSize: p.specifications?.['Size Range'] || p.specifications?.Size || '',
      specStandards: p.specifications?.Standards || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p._id !== id && p.slug !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.description || formData.shortDescription,
      images: formData.images
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      stockStatus: formData.stockStatus,
      stockQuantity: Number(formData.stockQuantity),
      priceEstimate: formData.priceEstimate,
      specifications: {
        Material: formData.specMaterial,
        'Size Range': formData.specSize,
        Standards: formData.specStandards,
      },
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          fetchProducts();
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          fetchProducts();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = products.filter((p) => {
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Steel Products', 'Welding & Fabrication', 'Agricultural Equipment'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Est. Price</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => {
                const img = prod.images?.[0] || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80';
                return (
                  <tr key={prod._id || prod.slug} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image src={img} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{prod.name}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{prod.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-700">
                      {prod.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          prod.stockStatus === 'In Stock'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {prod.stockStatus} ({prod.stockQuantity ?? 10})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-bold text-slate-800">
                      {prod.priceEstimate || 'On Request'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod._id || prod.slug)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900"
                  >
                    <option value="Steel Products">Steel Products</option>
                    <option value="Welding & Fabrication">Welding & Fabrication</option>
                    <option value="Agricultural Equipment">Agricultural Equipment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URLs (comma-separated)</label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stock Status</label>
                  <select
                    value={formData.stockStatus}
                    onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price Estimate</label>
                  <input
                    type="text"
                    value={formData.priceEstimate}
                    onChange={(e) => setFormData({ ...formData, priceEstimate: e.target.value })}
                    placeholder="e.g. ₹ 65 / kg"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Specifications block */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Technical Specifications
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Material</label>
                    <input
                      type="text"
                      value={formData.specMaterial}
                      onChange={(e) => setFormData({ ...formData, specMaterial: e.target.value })}
                      placeholder="Mild Steel / Stainless"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Size Range</label>
                    <input
                      type="text"
                      value={formData.specSize}
                      onChange={(e) => setFormData({ ...formData, specSize: e.target.value })}
                      placeholder={'1/2" - 12"'}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Standards</label>
                    <input
                      type="text"
                      value={formData.specStandards}
                      onChange={(e) => setFormData({ ...formData, specStandards: e.target.value })}
                      placeholder="IS / ASTM"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
