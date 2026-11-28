'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, Package, ArrowRight } from 'lucide-react';
import { getProductWhatsAppUrl } from '@/lib/brand';

export interface ProductCardData {
  name: string;
  slug: string;
  category: string;
  shortDescription?: string;
  description?: string;
  images?: string[];
  specifications?: Record<string, string>;
}

interface ProductCardProps {
  product: ProductCardData;
  onBulkEnquiry: (productName: string) => void;
}

/**
 * Standard ZHI DIMENSION product card showing verified info, Bulk Enquiry CTA, and WhatsApp integration.
 */
export function ProductCard({ product, onBulkEnquiry }: ProductCardProps) {
  const imageSrc = product.images && product.images.length > 0 ? product.images[0] : '';
  const specs = product.specifications ? Object.entries(product.specifications).slice(0, 3) : [];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#0052CC]/40 hover:shadow-lg transition-all flex flex-col">
      {/* Actual Product Photograph */}
      <Link href={`/products/${product.slug}`} className="relative h-56 w-full bg-slate-100 overflow-hidden block">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
            <Package className="w-10 h-10" />
            <span className="text-xs font-medium">Product photograph</span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-[#0B1320]/90 text-white px-3 py-1 rounded-full text-[11px] font-semibold">
          {product.category}
        </span>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5">
        <div>
          <Link href={`/products/${product.slug}`} className="block group">
            <h3 className="text-lg font-bold text-[#0B1320] group-hover:text-[#0052CC] transition-colors">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
            {product.shortDescription || product.description}
          </p>

          {specs.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
              {specs.map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-xs gap-2">
                  <span className="font-semibold text-slate-700">{key}</span>
                  <span className="text-slate-600 text-right">{String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bulk Enquiry & WhatsApp Actions (No cart or prices) */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <a
            href={getProductWhatsAppUrl(product.name, product.category)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Enquire on WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onBulkEnquiry(product.name)}
              className="py-2 px-3 bg-[#0052CC] hover:bg-[#003D99] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Bulk Enquiry
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
