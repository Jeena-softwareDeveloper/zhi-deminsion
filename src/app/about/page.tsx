import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Target, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Engineering Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            About ZHI DIMENSION
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Engineering Strength. Building Possibilities. Leading manufacturer, stockist, and distributor of steel products, precision custom fabrication, and heavy agricultural equipment.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900">
            <Image
              src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80"
              alt="Zhi Dimension manufacturing facility"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Over Two Decades of Structural Integrity & Agricultural Advancement
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded on the pillars of uncompromising quality and industrial reliability, ZHI DIMENSION provides end-to-end metal solutions: from raw certified steel piping and structural sections, to precision CNC welding, industrial warehouses, and tractor-drawn agricultural machinery.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl">
                <span className="text-3xl font-extrabold text-blue-600">500+</span>
                <p className="text-xs text-slate-600 mt-1">Industrial Projects Delivered</p>
              </div>
              <div className="border border-slate-100 bg-slate-50 p-4 rounded-xl">
                <span className="text-3xl font-extrabold text-blue-600">100%</span>
                <p className="text-xs text-slate-600 mt-1">BIS & ISO Quality Adherence</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To empower industrial fabricators, commercial builders, and agriculturalists with resilient, durable, and standard-compliant steel infrastructure and farm equipment.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Quality Assurance</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every steel pipe, truss, rotavator blade, and welded assembly undergoes stringent mechanical testing, ultrasonic weld inspection, and dimensional verification.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">On-Time Execution</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Equipped with computerized inventory control, large yard storage, and dedicated logistics to ensure your construction and harvest schedules never stall.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

