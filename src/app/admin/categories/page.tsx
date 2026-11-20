'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Layers, Plus, Edit2, Trash2 } from 'lucide-react';
import { initialCategories } from '@/lib/data/initialData';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>(initialCategories);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.slug || idx}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="relative h-44 w-full bg-slate-900">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold">{cat.itemCount || 30}+ Items in Catalogue</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

