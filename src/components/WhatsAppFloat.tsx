'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/brand';

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Bulk Enquiry on WhatsApp"
      title="Bulk Enquiry on WhatsApp"
      className="fixed bottom-20 md:bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg shadow-emerald-950/25 flex items-center justify-center transition-transform hover:scale-105"
    >
      <MessageSquare className="w-5 h-5 fill-current" />
    </a>
  );
}
