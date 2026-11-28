import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_INFO } from '@/lib/brand';

interface ZhiLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ZhiLogo({
  variant = 'dark',
  className = '',
  showTagline = false,
  size = 'md',
}: ZhiLogoProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0B1320';
  const subtitleColor = isDark ? '#94A3B8' : '#334155';
  const lineColor = isDark ? 'bg-slate-600' : 'bg-slate-400';

  const imgSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-[16px]',
    md: 'text-lg lg:text-xl',
    lg: 'text-2xl lg:text-3xl',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center space-x-3 select-none group ${className}`}
    >
      <div className={`relative ${imgSizes[size]} shrink-0 flex items-center justify-center`}>
        <Image
          src="/images/logo.png"
          alt="ZHI DIMENSION Logo"
          fill
          priority
          sizes="(max-width: 768px) 44px, 56px"
          className="object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col min-w-0">
        <div className={`font-bold font-heading tracking-wide uppercase leading-none whitespace-nowrap ${textSizes[size]}`}>
          <span style={{ color: textColor }}>ZHI </span>
          <span className={isDark ? 'text-blue-300' : 'text-[#0052CC]'}>DIMENSION</span>
        </div>

        {/* Subtitle flanked by crisp divider line */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className={`h-[1px] w-3 ${lineColor}`} />
          <span
            className="text-[8.5px] sm:text-[9px] font-sans font-bold tracking-[0.16em] uppercase whitespace-nowrap"
            style={{ color: subtitleColor }}
          >
            Product Manufacturing
          </span>
          <span className={`h-[1px] w-3 ${lineColor}`} />
        </div>

        {showTagline && (
          <span
            className={`text-xs font-medium tracking-normal mt-1.5 ${
              isDark ? 'text-slate-400' : 'text-[#0052CC]'
            }`}
          >
            {BRAND_INFO.tagline}
          </span>
        )}
      </div>
    </Link>
  );
}
