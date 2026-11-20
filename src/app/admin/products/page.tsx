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
  Filter,
} from 'lucide-react';
import { initialProducts } from '@/lib/data/initialData';
import { useAdminHeader } from '@/context/AdminHeaderContext';
import { DataTable, Column } from '@/components/admin/DataTable';

const PRODUCT_IMAGE_PRESETS = [
  { label: 'Steel Pipes', url: '/images/steel-pipes.jpg' },
  { label: 'Steel Framework', url: '/images/steel-framework.jpg' },
  { label: 'Welding Sparks', url: '/images/welding-sparks.jpg' },
  { label: 'Agri Tractor', url: '/images/agri-tractor.jpg' },
  { label: 'Structure', url: '/images/hero-steel-structure.jpg' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>([
    'Steel Products',
    'Welding & Fabrication',
    'Agricultural Equipment',
  ]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { setTitle, setActions } = useAdminHeader();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Steel Products',
    shortDescription: '',
    description: '',
    images: '/images/steel-framework.jpg',
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
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategoriesList() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success && data.categories && data.categories.length > 0) {
        const catNames = data.categories.map((c: any) => c.name);
        setCategories(Array.from(new Set(['Steel Products', 'Welding & Fabrication', 'Agricultural Equipment', ...catNames])));
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategoriesList();
  }, []);

  useEffect(() => {
    setTitle('Products Management');
    setActions(
      <div className="flex items-center space-x-2">
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>
    );
    return () => setActions(null);
  }, [categories]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: categories[0] || 'Steel Products',
      shortDescription: '',
      description: '',
      images: '/images/steel-framework.jpg',
      stockStatus: 'In Stock',
      stockQuantity: 20,
      priceEstimate: '₹ 60 / kg',
      specMaterial: 'Mild Steel / IS 2062',
      specSize: 'Standard',
      specStandards: 'IS / ASTM / Custom',
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
      stockQuantity: p.stockQuantity ?? 10,
      priceEstimate: p.priceEstimate || 'On Request',
      specMaterial: p.specifications?.Material || '',
      specSize: p.specifications?.['Size Range'] || p.specifications?.Size || '',
      specStandards: p.specifications?.Standards || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p._id !== deleteId && p.slug !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const imagesArray = formData.images
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.description || formData.shortDescription,
      images: imagesArray.length > 0 ? imagesArray : ['/images/steel-framework.jpg'],
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
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    return filterCategory === 'All' || p.category === filterCategory;
  });

  // Table Columns Definition
  const columns: Column<any>[] = [
    {
      key: 'name',
      header: 'Product',
      sortable: true,
      render: (prod) => {
        const img =
          prod.images?.[0] || '/images/steel-framework.jpg';
        return (
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <Image
                src={img}
                alt={prod.name}
                fill
                className="object-cover"
                onError={(e: any) => {
                  e.target.src = '/images/steel-framework.jpg';
                }}
              />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{prod.name}</p>
              <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                {prod.shortDescription}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (prod) => (
        <span className="font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg text-xs">
          {prod.category}
        </span>
      ),
    },
    {
      key: 'stockStatus',
      header: 'Stock Status',
      sortable: true,
      render: (prod) => {
        const isLow = prod.stockStatus === 'Low Stock';
        const isOut = prod.stockStatus === 'Out of Stock';
        return (
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center space-x-1 ${
              isOut
                ? 'bg-slate-100 text-slate-700'
                : isLow
                ? 'bg-red-100 text-red-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            <span>{prod.stockStatus || 'In Stock'}</span>
            <span className="opacity-80">({prod.stockQuantity ?? 10})</span>
          </span>
        );
      },
    },
    {
      key: 'priceEstimate',
      header: 'Est. Price',
      sortable: true,
      render: (prod) => (
        <span className="font-bold text-slate-800 text-xs">
          {prod.priceEstimate || 'On Request'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      render: (prod) => (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handleOpenEdit(prod)}
            className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            title="Edit Product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(prod._id || prod.slug)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Products DataTable with Category Dropdown in Toolbar */}
      <DataTable
        columns={columns}
        data={filteredProducts}
        loading={loading}
        searchPlaceholder="Search products by name, description, specs..."
        searchFilter={(item, query) => {
          const q = query.toLowerCase();
          return (
            item.name.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            (item.shortDescription && item.shortDescription.toLowerCase().includes(q)) ||
            (item.priceEstimate && item.priceEstimate.toLowerCase().includes(q))
          );
        }}
        filterSlot={
          /* Clean Category Filter Dropdown Requested by User */
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 hover:border-slate-300 transition-colors">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Category:
            </span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-2"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        }
        actionsSlot={
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
            title="Refresh Products"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-500' : ''}`} />
          </button>
        }
        pageSize={8}
        emptyTitle="No products match your criteria"
        emptySubtitle="Try selecting another category or clearing your search."
      />

      {/* Product Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update product information, inventory stock, and technical specs.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 focus:bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 focus:bg-white text-slate-900"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Product Image
                </label>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {PRODUCT_IMAGE_PRESETS.map((p) => {
                    const isSelected = formData.images.includes(p.url);
                    return (
                      <button
                        type="button"
                        key={p.url}
                        onClick={() => setFormData({ ...formData, images: p.url })}
                        className={`relative h-14 rounded-xl overflow-hidden border-2 transition-all ${
                          isSelected
                            ? 'border-orange-500 ring-2 ring-orange-200 scale-95'
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                        title={p.label}
                      >
                        <Image src={p.url} alt={p.label} fill className="object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-orange-600/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="Or enter custom image URLs (comma-separated)"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-orange-500 text-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
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
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, stockQuantity: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Est. Price</label>
                  <input
                    type="text"
                    value={formData.priceEstimate}
                    onChange={(e) => setFormData({ ...formData, priceEstimate: e.target.value })}
                    placeholder="e.g. ₹ 65 / kg"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500 text-slate-900"
                  />
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Technical Specifications
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Material
                    </label>
                    <input
                      type="text"
                      value={formData.specMaterial}
                      onChange={(e) => setFormData({ ...formData, specMaterial: e.target.value })}
                      placeholder="Mild Steel / Stainless"
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Size Range
                    </label>
                    <input
                      type="text"
                      value={formData.specSize}
                      onChange={(e) => setFormData({ ...formData, specSize: e.target.value })}
                      placeholder={'1/2" - 12"'}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Standards
                    </label>
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
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? 'Update Product' : 'Save to MongoDB'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Delete Product?</h4>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
