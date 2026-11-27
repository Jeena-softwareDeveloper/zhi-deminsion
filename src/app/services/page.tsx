'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initialServices } from '@/lib/data/initialData';
import { QuoteModal } from '@/components/QuoteModal';
import { Flame, ShieldCheck, CheckCircle2, ArrowRight, Wrench, PhoneCall } from 'lucide-react';

export default function ServicesPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenQuote = (title: string) => {
    setSelectedService(`Fabrication: ${title}`);
    setIsQuoteOpen(true);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header (Page 4 Match) */}
        <div className="max-w-3xl mb-12">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Turnkey Metal Engineering
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Our Services
          </h1>
          <p className="text-slate-600 text-base mt-2">
            We provide professional welding, fabrication and custom metal solutions.
          </p>
        </div>

        {/* Services Grid (Page 4 Exact 7 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialServices.map((service, idx) => (
            <div
              key={service.id}
              className={`bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ${
                idx === 3 ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Service Image */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded">
                  Service #{idx + 1}
                </span>
              </div>

              {/* Service Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {service.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Bullet features */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
                    {service.features.slice(0, 3).map((feat, fidx) => (
                      <div key={fidx} className="flex items-center space-x-1.5 text-slate-600 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenQuote(service.title)}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-[#0066FF] text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-1.5 group-hover:shadow-md"
                  >
                    <span>Request Service Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Engineering Callout Banner */}
        <div className="mt-16 bg-[#0B1320] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="max-w-xl space-y-3">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
              Have Custom Drawings or Blueprints?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Need Custom Steel Fabrication for Your Project?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our engineering team reviews DWG / CAD drawings, structural specifications, and bill of materials (BOM) to deliver accurate quotations within 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => handleOpenQuote('Custom CAD / Drawing Fabrication')}
              className="px-6 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-xl shadow-lg transition-colors text-sm text-center"
            >
              Submit Project Specs
            </button>
            <a
              href="tel:+919876543210"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>Talk to Engineer</span>
            </a>
          </div>
        </div>
      </div>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={selectedService}
      />
    </div>
  );
}

