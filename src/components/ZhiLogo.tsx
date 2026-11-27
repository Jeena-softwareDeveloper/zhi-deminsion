import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  const textColor = isDark ? '#FFFFFF' : '#0F172A';
  const subtitleColor = isDark ? '#94A3B8' : '#64748B';

  const imgSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 lg:w-11 lg:h-11',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl lg:text-2xl',
    lg: 'text-2xl lg:text-3xl',
  };

  return (
    <Link href="/" className={`inline-flex items-center space-x-3 select-none group ${className}`}>
      {/* 3D Metallic Hexagonal Logo Emblem */}
      <div
        className={`relative ${imgSizes[size]} rounded-xl overflow-hidden bg-[#0A101D] border border-blue-500/40 shadow-md shadow-blue-950/50 group-hover:border-blue-400 group-hover:shadow-blue-500/30 transition-all shrink-0 flex items-center justify-center p-0.5`}
      >
        <Image
          src="/images/logo.png"
          alt="Zhi Dimension Logo"
          fill
          priority
          sizes="(max-width: 768px) 44px, 48px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand Typography in Electric Royal Blue & Titanium */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight uppercase font-heading leading-tight ${textSizes[size]}`}>
          <span style={{ color: textColor }}>ZHI </span>
          <span className="text-[#0066FF] drop-shadow-xs">DIMENSION</span>
        </div>
        <div
          className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase font-heading -mt-0.5"
          style={{ color: subtitleColor }}
        >
          Steel &amp; Fabrication
        </div>
        {showTagline && (
          <span className="text-xs text-blue-400 font-medium tracking-normal mt-0.5">
            Engineering Strength. Building Possibilities.
          </span>
        )}
      </div>
    </Link>
  );
}

