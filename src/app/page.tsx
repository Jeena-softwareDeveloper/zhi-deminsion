'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Wrench,
  Clock,
  Headphones,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Flame,
  Tractor,
  Layers,
  Sparkles,
  PhoneCall,
  Calculator,
  Award,
  Check,
  ChevronDown,
  MessageSquare,
  Truck,
  Building2,
  FileCheck2,
  HelpCircle,
  Star,
  Compass,
} from 'lucide-react';
import { QuoteModal } from '@/components/QuoteModal';
import { initialProducts } from '@/lib/data/initialData';

export default function HomePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Steel Products' | 'Welding & Fabrication' | 'Agricultural Equipment'>('All');

  // Interactive Steel Calculator State
  const [calcType, setCalcType] = useState<'pipe' | 'plate' | 'rebar'>('pipe');
  const [calcDiameter, setCalcDiameter] = useState(100); // mm
  const [calcThickness, setCalcThickness] = useState(4); // mm
  const [calcLength, setCalcLength] = useState(6); // meters
  const [calcQuantity, setCalcQuantity] = useState(10); // pieces

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openQuoteForProduct = (prodName: string) => {
    setSelectedProduct(prodName);
    setIsQuoteOpen(true);
  };

  // Steel Weight Calculator Logic
  // Density of steel = 7.85 g/cm3 (7850 kg/m3)
  const calculateWeight = () => {
    if (calcType === 'pipe') {
      // Pipe weight: (OD - WT) * WT * 0.02466 * length
      const wtPerMeter = (calcDiameter - calcThickness) * calcThickness * 0.02466;
      const totalWeight = Math.round(wtPerMeter * calcLength * calcQuantity);
      const estPrice = Math.round(totalWeight * 62);
      return { weight: totalWeight, price: estPrice };
    } else if (calcType === 'plate') {
      // Plate: L(m) * W(m) * T(mm) * 7.85
      const totalWeight = Math.round(calcLength * (calcDiameter / 1000) * calcThickness * 7.85 * calcQuantity);
      const estPrice = Math.round(totalWeight * 58);
      return { weight: totalWeight, price: estPrice };
    } else {
      // Rebar: (D^2 / 162) * length
      const wtPerMeter = (calcDiameter * calcDiameter) / 162;
      const totalWeight = Math.round(wtPerMeter * calcLength * calcQuantity);
      const estPrice = Math.round(totalWeight * 54);
      return { weight: totalWeight, price: estPrice };
    }
  };

  const calcResult = calculateWeight();

  const filteredProducts = activeTab === 'All'
    ? initialProducts.slice(0, 8)
    : initialProducts.filter((p) => p.category === activeTab);

  const faqs = [
    {
      q: 'Do you provide Mill Test Certificates (MTC) with steel products?',
      a: 'Yes, 100% of our steel products (pipes, plates, structural sections, and TMT bars) are supplied with original Mill Test Certificates (MTC) conforming to IS 2062, IS 1786, and ASTM standards.',
    },
    {
      q: 'What is the lead time for custom PEB shed and framework fabrication?',
      a: 'Standard structural framing and warehouse components are typically dispatched within 7 to 14 business days from 3D CAD drawing approval. Urgent expedited fabrication is available upon request.',
    },
    {
      q: 'Are your agricultural rotavators and ploughs compatible with all tractor brands?',
      a: 'Yes, our implements use universal standard 3-point linkages (Category I & II) and 540 RPM PTO splines, fully compatible with Mahindra, John Deere, Sonalika, Swaraj, Massey Ferguson, and Kubota tractors.',
    },
    {
      q: 'Can I request custom dimensional cuts for steel sheets and pipes?',
      a: 'Absolutely. We operate high-precision CNC laser and plasma cutting beds that can cut sheets up to 50mm thickness and pipe profiling machines to supply custom ready-to-weld parts.',
    },
    {
      q: 'What are the delivery logistics options for bulk commercial orders?',
      a: 'We operate dedicated heavy flatbed and hydraulic crane trucks delivering across Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, and nationwide via verified industrial logistics partners.',
    },
  ];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* 1. HERO SECTION (Page 2 & Page 1 Match with Industrial Lighting & Badges) */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-start overflow-hidden bg-[#0B1320]">
        {/* Local Steel Framework Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/steel-framework.jpg"
            alt="Steel construction framework under sunlight"
            fill
            priority
            className="object-cover object-right lg:object-center brightness-75 contrast-110"
          />
          {/* High-end cinematic dual gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1320] via-[#0B1320]/80 to-[#0B1320]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-8 text-white space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Engineering Strength. Building Possibilities.</span>
              </div>

              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-medium text-slate-300 tracking-wide">
                  Your Trusted Partner in
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                  Steel, Fabrication &{' '}
                  <span className="text-[#F97316] drop-shadow-sm">Agricultural Solutions.</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                High-quality steel products, precise fabrication services and reliable agricultural equipment – all in one place.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] flex items-center space-x-2"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-white text-sm sm:text-base font-bold rounded-xl border border-slate-700 transition-all hover:border-slate-500 shadow-md"
                >
                  Request Fast Quote
                </button>
              </div>

              {/* Key Trust Micro-Stats */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-300">500+ Tonnes Yard Stock</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="font-semibold text-slate-300">ISO 9001:2015 & BIS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-semibold text-slate-300">CNC Precision Cuts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-semibold text-slate-300">24/7 Dispatch Desk</span>
                </div>
              </div>
            </div>

            {/* Right Quick Inquiry Card */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center space-x-1.5">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Quick Estimate Desk</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    LIVE
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block font-medium">Mild Steel Pipes & Tubes</span>
                    <span className="text-white font-bold text-sm">₹ 62 / kg</span>
                    <span className="text-[10px] text-slate-400 ml-1">(IS 1239 / ASTM A53)</span>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block font-medium">Hot Rolled Plates (IS 2062)</span>
                    <span className="text-white font-bold text-sm">₹ 58 / kg</span>
                    <span className="text-[10px] text-slate-400 ml-1">(1.2mm - 50mm Grade E250)</span>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                    <span className="text-slate-400 block font-medium">Heavy Duty 6ft Rotavator</span>
                    <span className="text-white font-bold text-sm">₹ 95,000 / unit</span>
                    <span className="text-[10px] text-slate-400 ml-1">(Boron Steel Blades)</span>
                  </div>
                </div>

                <button
                  onClick={() => openQuoteForProduct('Immediate Price Inquiry')}
                  className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-md transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Request Instant Price Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 VALUE PROPOSITIONS BAR (Page 2 Exact Match) */}
      <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center space-x-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-tight">Quality Materials</h4>
              <p className="text-xs text-slate-500 mt-0.5">Durable & reliable (BIS Certified)</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center space-x-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-tight">Custom Fabrication</h4>
              <p className="text-xs text-slate-500 mt-0.5">As per your needs & CAD drawings</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center space-x-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-tight">On-Time Delivery</h4>
              <p className="text-xs text-slate-500 mt-0.5">Always committed & tracked</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center space-x-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-tight">Customer Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">24/7 Technical Assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE 3 PILLARS INTRO (Page 1 & 3 Match with Local High-Res Imagery) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Our Core Verticals
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Engineering Strength Across Every Dimension
          </h2>
          <p className="text-slate-600 text-base mt-3">
            Supplying industry-standard materials, turnkey metal fabrication, and advanced farming implements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vertical 1: Steel Products */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1">
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/steel-pipes.jpg"
                alt="Steel Products"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5 border border-slate-700">
                <Layers className="w-3.5 h-3.5 text-orange-400" />
                <span>Steel Products</span>
              </div>
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  Steel Products
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Steel rods, pipes, sheets, structural sections and more for construction, infrastructure, and heavy fabrication.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">MS / SS Pipes</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">HR Plates</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">TMT Rebars</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Beams & Channels</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  href="/products?category=Steel+Products"
                  className="text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => openQuoteForProduct('Steel Products')}
                  className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>

          {/* Vertical 2: Welding & Fabrication */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1">
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/welding-sparks.jpg"
                alt="Welding & Fabrication"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5 border border-slate-700">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Welding & Fabrication</span>
              </div>
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  Welding & Fabrication
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Custom fabrication, gates, grills, frames, metal structures and repair services tailored to exact specifications.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">PEB Sheds</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Laser Cut Gates</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">CNC Plasma</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">MIG/TIG Welds</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  href="/services"
                  className="text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => openQuoteForProduct('Welding & Fabrication')}
                  className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>

          {/* Vertical 3: Agricultural Equipment */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1">
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/agri-tractor.jpg"
                alt="Agricultural Equipment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5 border border-slate-700">
                <Tractor className="w-3.5 h-3.5 text-orange-400" />
                <span>Agricultural Equipment</span>
              </div>
            </div>
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  Agricultural Equipment
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Farming tools, implements, machinery and accessories built to maximize farm productivity and harvest yields.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Rotavators</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Reversible Ploughs</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Seed Drills</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Boom Sprayers</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  href="/agricultural-equipment"
                  className="text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => openQuoteForProduct('Agricultural Equipment')}
                  className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CATALOGUE TABBED SHOWCASE (Browse Products Directly on Landing Page) */}
      <section className="bg-slate-100 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
                Industrial Catalogue
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                Explore Products & Equipment
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
            >
              <span>View Complete 124+ Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6">
            {(['All', 'Steel Products', 'Welding & Fabrication', 'Agricultural Equipment'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#F97316] text-white shadow-md shadow-orange-500/25'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const imageSrc =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : '/images/steel-pipes.jpg';

              return (
                <div
                  key={product.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        product.stockStatus === 'In Stock'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.stockStatus || 'In Stock'}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                      {product.priceEstimate && (
                        <div className="mt-3 text-xs font-semibold text-slate-800 bg-slate-50 px-2 py-1 rounded inline-block">
                          Est: <span className="text-orange-600 font-bold">{product.priceEstimate}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="py-1.5 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => openQuoteForProduct(product.name)}
                        className="py-1.5 text-center text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-lg transition-colors cursor-pointer"
                      >
                        Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE STEEL WEIGHT & ESTIMATE CALCULATOR (Unique Feature for Contractors) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 mb-2">
              <Calculator className="w-4 h-4" />
              <span>Engineering Tool</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Instant Steel Weight & Price Estimator
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Select product dimensions to calculate theoretical weight (kg) and commercial budget estimates instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700">
                <button
                  onClick={() => setCalcType('pipe')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    calcType === 'pipe' ? 'bg-[#F97316] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Round Pipe / Tube
                </button>
                <button
                  onClick={() => setCalcType('plate')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    calcType === 'plate' ? 'bg-[#F97316] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  MS Plate / Sheet
                </button>
                <button
                  onClick={() => setCalcType('rebar')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                    calcType === 'rebar' ? 'bg-[#F97316] text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  TMT Rebar Rod
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {calcType === 'plate' ? 'Width (mm)' : 'Diameter (mm)'}
                  </label>
                  <input
                    type="number"
                    value={calcDiameter}
                    onChange={(e) => setCalcDiameter(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Thickness (mm)
                  </label>
                  <input
                    type="number"
                    value={calcThickness}
                    onChange={(e) => setCalcThickness(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Length (meters)
                  </label>
                  <input
                    type="number"
                    value={calcLength}
                    onChange={(e) => setCalcLength(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Total Quantity (Pieces)
                  </label>
                  <input
                    type="number"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 text-center space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Calculated Weight & Budget
              </span>

              <div className="py-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  {calcResult.weight.toLocaleString()}{' '}
                  <span className="text-xl text-orange-400 font-bold">kg</span>
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  ({(calcResult.weight / 1000).toFixed(2)} Metric Tonnes)
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Estimated Mill Rate:</span>
                <span className="text-emerald-400 font-bold font-mono text-base">
                  ₹{calcResult.price.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() =>
                  openQuoteForProduct(
                    `${calcType.toUpperCase()} - ${calcQuantity} pcs (${calcDiameter}x${calcThickness}mm, ${calcLength}m, Total: ${calcResult.weight} kg)`
                  )
                }
                className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl text-xs transition-colors shadow-lg cursor-pointer"
              >
                Submit Quote with This Weight
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 5-STEP METAL FABRICATION PROCESS (Page 4 Extended) */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
              Execution Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Our 5-Stage Precision Metal Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From raw structural steel to precision certified assemblies manufactured with zero defects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-orange-500 transition-colors">
              <div>
                <span className="text-3xl font-black text-orange-500 font-mono">01</span>
                <h4 className="text-base font-bold text-slate-900 mt-2">CAD Modeling</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Structural load calculation, 3D modeling, and BOM verification.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-slate-600 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>DWG / STEP Files</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-orange-500 transition-colors">
              <div>
                <span className="text-3xl font-black text-orange-500 font-mono">02</span>
                <h4 className="text-base font-bold text-slate-900 mt-2">CNC Cutting</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  High-definition CNC plasma and laser profiling up to 50mm.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-slate-600 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>&plusmn;0.2mm Tolerance</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-orange-500 transition-colors">
              <div>
                <span className="text-3xl font-black text-orange-500 font-mono">03</span>
                <h4 className="text-base font-bold text-slate-900 mt-2">Certified Welding</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  MIG, TIG and Submerged Arc welding by ASME certified welders.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-slate-600 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>ISO 3834-2 Verified</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-orange-500 transition-colors">
              <div>
                <span className="text-3xl font-black text-orange-500 font-mono">04</span>
                <h4 className="text-base font-bold text-slate-900 mt-2">NDT & Quality</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Ultrasonic testing, dye-penetrant checks and dimensional audits.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-slate-600 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% MTC Stamped</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-orange-500 transition-colors">
              <div>
                <span className="text-3xl font-black text-orange-500 font-mono">05</span>
                <h4 className="text-base font-bold text-slate-900 mt-2">Coating & Dispatch</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Hot dip galvanizing or epoxy primer and on-site flatbed transport.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-slate-600 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Transit Delay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED REVIEWS & INDUSTRIAL TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Trusted by Builders & Farmers
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "We procured over 45 metric tonnes of IS 2062 steel plates and structural columns for a 30,000 sq.ft warehouse in Sriperumbudur. ZHI DIMENSION delivered exactly as per drawing tolerances with full MTC test certificates."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs">
                RK
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-900">Ravi Kumar</h5>
                <p className="text-xs text-slate-500">Chief Project Engineer, InfraBuild Tech</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "The 6ft heavy-duty rotavator with boron blades we purchased has worked through 180 acres of tough black cotton soil without a single gear crack or blade warp. Truly engineered for Indian farm conditions."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">
                PS
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-900">Priya S</h5>
                <p className="text-xs text-slate-500">Managing Trustee, AgriFarms Cooperative, Coimbatore</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "Their CNC laser cut decorative villa gates and industrial security boundary grills exceeded our architect's expectations. The electro-powder finish is flawless and weather-resistant."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-orange-700 text-white font-bold flex items-center justify-center text-xs">
                SM
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-900">Suresh Mohan</h5>
                <p className="text-xs text-slate-500">Lead Architectural Fabricator, Apex Builds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (Accordion) */}
      <section className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest bg-orange-100/60 px-3.5 py-1.5 rounded-full">
              Questions & Answers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-orange-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL BRAND PRESENTATION BANNER (Page 9 Exact Match) */}
      <section className="relative bg-[#0B1320] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="text-3xl sm:text-4xl font-extrabold">
              <span className="text-white">ZHI </span>
              <span className="text-slate-400 font-light tracking-[0.2em] text-2xl sm:text-3xl">
                DIMENSION
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Quality Materials. Reliable Fabrication.{' '}
              <span className="text-[#F97316]">Smarter Agricultural Solutions.</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Serving industrial contractors, infrastructure builders, and modern farmers with precision-engineered metal products, standard-compliant steel, and guaranteed on-time dispatch.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl shadow-xl shadow-orange-500/25 transition-all hover:scale-105"
              >
                Contact Us Today
              </Link>
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                Instant Quote Form
              </button>
              <a
                href="https://wa.me/919876543210?text=Hello%20ZHI%20DIMENSION!%20I%20would%20like%20to%20enquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl transition-colors flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
