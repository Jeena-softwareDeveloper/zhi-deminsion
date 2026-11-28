'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Layers,
  Package,
  MessageSquare,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const FLOW_STEPS = [
  {
    step: '01',
    title: 'Discover Brand',
    desc: 'Explore ZHI DIMENSION and our manufacturing focus.',
    Icon: Compass,
  },
  {
    step: '02',
    title: 'Explore Products',
    desc: 'Browse solutions by Agriculture, Home, or Industrial use.',
    Icon: Layers,
  },
  {
    step: '03',
    title: 'Select Product',
    desc: 'Review verified product details and specifications.',
    Icon: Package,
  },
  {
    step: '04',
    title: 'Enquire via WhatsApp',
    desc: 'Message our sales desk directly with one click.',
    Icon: MessageSquare,
  },
  {
    step: '05',
    title: 'Sales Discussion',
    desc: 'Confirm quantity requirements, pricing, and dispatch schedule.',
    Icon: PhoneCall,
  },
  {
    step: '06',
    title: 'Bulk Order Confirmation',
    desc: 'Direct manufacturer fulfilment for your bulk order.',
    Icon: CheckCircle2,
  },
];

/**
 * Interactive animated 6-step bulk ordering pipeline from brand discovery to WhatsApp order confirmation.
 */
export function BulkOrderFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const progressPercent = (activeStep / (FLOW_STEPS.length - 1)) * 100;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Desktop Animated Connector Track */}
      <div className="hidden lg:block absolute top-6 left-[8%] right-[8%] h-0.5 bg-slate-200 z-0 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-[#0052CC] via-[#3B82F6] to-[#25D366] transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 relative z-10">
        {FLOW_STEPS.map((item, idx) => {
          const Icon = item.Icon;
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;
          const isWhatsAppStep = idx === 3;

          return (
            <div
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`relative rounded-xl p-4 border transition-all duration-500 flex flex-col cursor-pointer ${
                isActive
                  ? 'bg-white border-[#0052CC] shadow-lg shadow-blue-900/10 -translate-y-1'
                  : isCompleted
                  ? 'bg-white border-blue-200 shadow-2xs'
                  : 'bg-white/90 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Step Node Badge + Animated Pulse */}
              <div className="flex items-center justify-between mb-3">
                <div className="relative flex items-center gap-2">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                      isActive
                        ? isWhatsAppStep
                          ? 'bg-[#25D366] text-white'
                          : 'bg-[#0052CC] text-white'
                        : isCompleted
                        ? 'bg-[#EFF6FF] text-[#0052CC]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span
                    className={`text-[11px] font-extrabold tracking-wider transition-colors ${
                      isActive ? 'text-[#0052CC]' : 'text-[#F97316]'
                    }`}
                  >
                    STEP {item.step}
                  </span>
                </div>

                {isActive && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isWhatsAppStep ? 'bg-[#25D366]' : 'bg-[#0052CC]'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        isWhatsAppStep ? 'bg-[#25D366]' : 'bg-[#0052CC]'
                      }`}
                    />
                  </span>
                )}
              </div>

              <h3
                className={`text-sm font-bold transition-colors ${
                  isActive ? 'text-[#0052CC]' : 'text-[#0B1320]'
                }`}
              >
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {item.desc}
              </p>

              {/* Animated Connector Arrow on Desktop */}
              {idx < FLOW_STEPS.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  className={`hidden lg:block absolute -right-3 top-4 w-4 h-4 transition-all duration-500 ${
                    isActive
                      ? 'text-[#0052CC] translate-x-0.5 scale-110'
                      : isCompleted
                      ? 'text-blue-400'
                      : 'text-slate-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
