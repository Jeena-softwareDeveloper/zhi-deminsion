import React from 'react';
import Link from 'next/link';

interface ZhiLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export function ZhiLogo({ variant = 'dark', className = '', showTagline = false }: ZhiLogoProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subtitleColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <Link href="/" className={`inline-flex flex-col select-none group ${className}`}>
      <div className="flex items-center space-x-1">
        {/* Customized Logo Typemark */}
        <div className="flex items-center tracking-tight font-extrabold text-2xl lg:text-3xl uppercase font-heading">
          <span className="relative inline-block font-black mr-0.5" style={{ color: textColor }}>
            Z
            <span
              className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#F97316] rounded-full transform -skew-x-12"
              aria-hidden="true"
            />
          </span>
          <span className="font-black" style={{ color: textColor }}>
            H
          </span>
          <span className="relative inline-flex flex-col items-center justify-between ml-0.5">
            <span className="w-2 h-2 bg-[#F97316] rounded-sm mb-0.5" />
            <span
              className="w-2 h-5 rounded-xs"
              style={{ backgroundColor: textColor }}
            />
          </span>
        </div>
      </div>
      <div
        className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase -mt-1 font-heading"
        style={{ color: subtitleColor }}
      >
        DIMENSION
      </div>
      {showTagline && (
        <span className="text-xs text-orange-500 font-medium tracking-normal mt-0.5">
          Engineering Strength. Building Possibilities.
        </span>
      )}
    </Link>
  );
}

