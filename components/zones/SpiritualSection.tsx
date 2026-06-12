'use client';

import React from 'react';
import ProductCard from '../ui/ProductCard';
import ZoneDivider from '../ui/ZoneDivider';
import WhatsAppButton from '../ui/WhatsAppButton';

interface SpiritualSectionProps {
  products: any[];
}

export default function SpiritualSection({ products }: SpiritualSectionProps) {
  // Filter for Jhulas & Mandirs
  const spiritualProducts = products.filter(
    (p) =>
      p.themeZone === 'spiritual' ||
      [
        'wooden-swing',
        'wooden-stand-jhula',
        'wooden-mandir',
        'wooden-deco-mandir',
        'korean-mandir',
      ].includes(p.category)
  );

  const kolamBgStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cdefs%3E%3Cpath id='petal' d='M 40,40 Q 35,22 40,10 Q 45,22 40,40 Z' fill='none' stroke='%23C9A84C' stroke-width='0.75' stroke-opacity='0.4' /%3E%3C/defs%3E%3Cuse href='%23petal' /%3E%3Cuse href='%23petal' transform='rotate(45 40 40)' /%3E%3Cuse href='%23petal' transform='rotate(90 40 40)' /%3E%3Cuse href='%23petal' transform='rotate(135 40 40)' /%3E%3Cuse href='%23petal' transform='rotate(180 40 40)' /%3E%3Cuse href='%23petal' transform='rotate(225 40 40)' /%3E%3Cuse href='%23petal' transform='rotate(270 40 40)' /%3E%3Cuse href='%23petal' transform='rotate(315 40 40)' /%3E%3Ccircle cx='40' cy='40' r='4' fill='none' stroke='%23C9A84C' stroke-dasharray='1,1' stroke-width='0.75' stroke-opacity='0.4' /%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '80px 80px',
  };

  return (
    <section className="theme-spiritual sandstone-texture bg-[#FFFFF0] py-20 border-t-2 border-b-2 border-gold-accent/40 relative overflow-hidden" style={kolamBgStyle}>
      {/* Stone Arch Frieze Entry Divider */}
      <div className="absolute top-0 left-0 right-0 h-12 text-[#C9A84C] opacity-25 pointer-events-none select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 48" preserveAspectRatio="none">
          <defs>
            <pattern id="frieze" width="40" height="48" patternUnits="userSpaceOnUse">
              <path d="M 0,48 C 0,8 40,8 40,48" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 5,48 C 5,16 35,16 35,48" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1,2" />
            </pattern>
          </defs>
          <rect width="100%" height="48" fill="url(#frieze)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-float-header">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E8871A] font-sans font-bold">
            Sacred Shrines & Swings
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-tiro font-bold text-[#6B1C1C] tracking-wide">
            Devotional Masterpieces
          </h2>
          <div className="mt-4 flex items-center justify-center">
            <div className="h-[1px] w-12 bg-gold-accent" />
            <span className="mx-3 text-gold-accent font-display text-lg">✦</span>
            <div className="h-[1px] w-12 bg-gold-accent" />
          </div>
          <p className="mt-4 text-sm font-sans text-[#6B1C1C]/80 leading-relaxed font-light">
            Each creation is an act of devotion, meticulously carved from select seasoned teak wood. Designed to bring positive energy, spiritual harmony, and heritage aesthetics to your sacred space.
          </p>
        </div>

        {/* Product Grid */}
        {spiritualProducts.length === 0 ? (
          <div className="text-center py-12 text-[#6B1C1C]/60 italic font-display">
            No devotional masterpieces uploaded yet. Visit Sanity Studio to add some.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {spiritualProducts.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={{ ...product, themeZone: 'spiritual' }} />
            ))}
          </div>
        )}

        {/* Dynamic Section Divider */}
        <ZoneDivider zone="spiritual" className="mt-16" />

        {/* Section CTA */}
        <div className="text-center mt-12">
          <p className="text-xs uppercase tracking-widest text-[#6B1C1C]/70 mb-4 font-bold">
            Looking for a custom mandir or swing size?
          </p>
          <WhatsAppButton 
            themeZone="spiritual"
            category="wooden-mandir"
          />
        </div>
      </div>
    </section>
  );
}
