import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Layers,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  Sprout,
  Home,
  Factory,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { BRAND_INFO, getWhatsAppUrl } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About ZHI DIMENSION | Independent Product Manufacturing & Bulk Supply in India',
  description:
    'Learn about ZHI DIMENSION, an independent product manufacturing brand in Erode, Tamil Nadu, India. We design and manufacture practical products for agriculture, home & residential, and industrial bulk orders.',
  keywords: [
    'ZHI DIMENSION',
    'about ZHI DIMENSION',
    'independent product manufacturing brand India',
    'product manufacturing company Erode Tamil Nadu',
    'agriculture product manufacturer India',
    'home and residential utility products manufacturer',
    'industrial product manufacturing India',
    'bulk product supplier India',
    'direct manufacturer bulk orders',
  ],
  openGraph: {
    title: 'About ZHI DIMENSION | Built with Purpose. Made for Progress.',
    description:
      'Discover how ZHI DIMENSION designs, develops and manufactures practical products for agriculture, residential and industrial applications through direct bulk supply.',
    type: 'website',
  },
};

const APPLICATION_SECTORS = [
  {
    title: 'Agriculture Products Manufacturing',
    href: '/products?category=Agriculture',
    Icon: Sprout,
    iconStyle: 'bg-emerald-50 text-emerald-600',
    description:
      'Practical agricultural products developed for farmers, agribusinesses, and everyday field productivity—engineered to simplify demanding farm operations and improve daily efficiency.',
  },
  {
    title: 'Home & Residential Products',
    href: '/products?category=Home+%26+Residential',
    Icon: Home,
    iconStyle: 'bg-blue-50 text-[#0052CC]',
    description:
      'Durable, thoughtful household and residential utility products built for everyday organization, practical convenience, and long-term domestic reliability.',
  },
  {
    title: 'Industrial & Commercial Solutions',
    href: '/products?category=Industrial',
    Icon: Factory,
    iconStyle: 'bg-orange-50 text-[#F97316]',
    description:
      'Dependable commercial and industrial-grade products designed to streamline workshop workflows, workplace organization, and demanding operational environments.',
  },
];

const MANUFACTURING_PILLARS = [
  {
    step: '01',
    title: 'Practical Product Engineering',
    desc: 'Every product starts with real-world utility—solving everyday operational bottlenecks with functional, straightforward designs that work reliably out of the box.',
  },
  {
    step: '02',
    title: 'In-House Brand Development',
    desc: 'ZHI DIMENSION designs, develops and manufactures its own branded product line rather than acting as a trading intermediary, keeping complete accountability over product performance.',
  },
  {
    step: '03',
    title: 'Consistent Build Quality',
    desc: 'Each production run focuses on durable materials, repeatable tolerances, and practical finishing so bulk buyers receive dependable consistency across every unit.',
  },
  {
    step: '04',
    title: 'Direct Bulk Fulfilment',
    desc: 'From distributors and dealers to institutional and commercial buyers, we manage bulk orders directly via WhatsApp for transparent communication and reliable dispatch.',
  },
];

const ABOUT_FAQS = [
  {
    q: 'What does ZHI DIMENSION manufacture?',
    a: 'ZHI DIMENSION is an independent product manufacturing company developing and manufacturing practical, reliable products across three core sectors: Agriculture, Home & Residential, and Industrial applications.',
  },
  {
    q: 'Does ZHI DIMENSION supply directly for bulk orders?',
    a: 'Yes. Our business model is built around our own manufactured products and direct bulk sales. Dealers, distributors, commercial buyers, and institutions can enquire directly with our sales desk for bulk order details.',
  },
  {
    q: 'How can buyers place a bulk order enquiry with ZHI DIMENSION?',
    a: 'Customers can explore our product categories online and connect directly with our sales team via WhatsApp or our Contact page to discuss order quantities, product specifications, and bulk dispatch timelines.',
  },
  {
    q: 'Where is ZHI DIMENSION located?',
    a: 'ZHI DIMENSION operates from Erode, Tamil Nadu, India, supporting bulk product enquiries and commercial buyers across the region and nationwide.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9 lg:space-y-10">
        {/* 1. SEO Hero / Brand Positioning Header */}
        <section className="max-w-4xl space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1320] tracking-tight leading-tight">
            {BRAND_INFO.name} – An Independent Product Manufacturing Brand.
          </h1>

          <p className="text-lg sm:text-xl font-bold text-[#0052CC]">
            {BRAND_INFO.tagline}
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Based in {BRAND_INFO.location}, ZHI DIMENSION is an independent product manufacturing and engineering brand dedicated to creating practical, dependable products for agriculture, residential living, and industrial workplaces—supplied directly to customers and businesses through bulk orders.
          </p>
        </section>

        {/* 2. Core Story & Operating Model */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-3.5 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320]">
              Practical Products. Powerful Solutions.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              ZHI DIMENSION is focused on developing and manufacturing practical products that bring value to everyday life and industrial operations.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              With a commitment to product quality, engineering and continuous improvement, we aim to create reliable solutions for agriculture, residential and commercial applications.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Rather than operating as a general trading reseller, we invest in our own product lines—refining utility, build durability, and day-to-day usability so partners and end-users experience consistent performance across every bulk shipment.
            </p>
            <p className="text-[#0B1320] font-bold text-sm sm:text-base leading-relaxed pt-1 border-t border-slate-200">
              Our focus is simple: manufacture useful products, maintain quality and deliver value to our customers.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#0B1320] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              <h2 className="text-xl sm:text-2xl font-bold">
                Engineering Products. Empowering Progress.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every product carrying the ZHI DIMENSION mark is engineered in-house for practical durability and sold directly through streamlined bulk order enquiries.
              </p>

              <ul className="space-y-2.5 text-sm text-slate-200 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Own ZHI DIMENSION product manufacturing &amp; brand accountability</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Purpose-built solutions for agriculture, homes, and industries</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <span>Direct WhatsApp sales coordination for fast bulk order responses</span>
                </li>
              </ul>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2 text-sm"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Enquire for Bulk Orders on WhatsApp</span>
            </a>
          </div>
        </section>

        {/* 3. Industries & Product Applications (SEO Category Breakdown) */}
        <section className="space-y-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320]">
              Purpose-Built Products Across Three Core Sectors
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Innovation that makes everyday work easier—organized around real agricultural, residential, and industrial environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APPLICATION_SECTORS.map((sector) => {
              const Icon = sector.Icon;
              return (
                <Link
                  key={sector.title}
                  href={sector.href}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#0052CC]/50 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${sector.iconStyle}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1320] group-hover:text-[#0052CC] transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      {sector.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC]">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4. Manufacturing & Quality Approach */}
        <section className="bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320]">
              How ZHI DIMENSION Delivers Reliable Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MANUFACTURING_PILLARS.map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-5 border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-[#F97316] tracking-wider">
                  PILLAR {item.step}
                </span>
                <h3 className="text-base font-bold text-[#0B1320]">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 3 Core Brand Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="w-10 h-10 bg-[#EFF6FF] text-[#0052CC] rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1320]">
              Innovation That Makes Everyday Work Easier
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Thoughtful product design focused on practical utility, operator comfort, and dependable real-world output.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="w-10 h-10 bg-[#EFF6FF] text-[#0052CC] rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1320]">
              Consistent Quality &amp; Continuous Improvement
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every product line undergoes continuous engineering refinement to maintain reliability and long service life.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="w-10 h-10 bg-[#FFF7ED] text-[#F97316] rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1320]">
              Bulk Product Supply &amp; Direct Support
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Direct manufacturer-to-buyer bulk sales with responsive WhatsApp enquiry support for dealers and businesses.
            </p>
          </div>
        </section>

        {/* 6. SEO Frequently Asked Questions */}
        <section className="space-y-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320]">
              Common Questions About ZHI DIMENSION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ABOUT_FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 space-y-2"
              >
                <h3 className="text-base font-bold text-[#0B1320]">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Bottom Conversion Banner */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-[#EFF6FF] border border-blue-200 rounded-2xl p-7">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-11 h-11 rounded-xl bg-[#0052CC] text-white flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0B1320]">
                Partner with ZHI DIMENSION for Bulk Product Orders
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore our Agriculture, Home &amp; Residential, and Industrial ranges or message our sales desk directly on WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/products"
              className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#003D99] text-white text-sm font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Our Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#0B1320] border border-slate-300 text-sm font-bold rounded-xl transition-colors"
            >
              Contact Sales Team
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
