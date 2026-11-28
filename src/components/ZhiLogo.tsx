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
    sm: 'w-9 h-9',
    md: 'w-11 h-11 lg:w-12 lg:h-12',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-[17px]',
    md: 'text-xl lg:text-[22px]',
    lg: 'text-2xl lg:text-3xl',
  };

  return (
    <Link href="/" className={`inline-flex items-center space-x-2.5 sm:space-x-3 select-none group ${className}`}>
      {/* Transparent 3D Metallic Hexagonal Emblem (No black box background) */}
      <div
        className={`relative ${imgSizes[size]} shrink-0 flex items-center justify-center`}
      >
        <Image
          src="/images/logo.png"
          alt="Zhi Dimension Logo"
          fill
          priority
          sizes="(max-width: 768px) 44px, 56px"
          className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand Text placed directly beside the Logo Emblem */}
      <div className="flex flex-col min-w-0">
        <div className={`font-black font-heading tracking-tight uppercase leading-none whitespace-nowrap ${textSizes[size]}`}>
          <span style={{ color: textColor }}>ZHI </span>
          <span className="text-[#0066FF]">DIMENSION</span>
        </div>
        <div
          className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase mt-1 whitespace-nowrap"
          style={{ color: subtitleColor }}
        >
          Steel &amp; Fabrication
        </div>
        {showTagline && (
          <span className="text-xs text-blue-400 font-medium tracking-normal mt-1">
            Engineering Strength. Building Possibilities.
          </span>
        )}
      </div>
    </Link>
  );
}
