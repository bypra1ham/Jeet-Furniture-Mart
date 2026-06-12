'use client';

import React, { useEffect, useRef } from 'react';
import ProductCard from '../ui/ProductCard';
import ZoneDivider from '../ui/ZoneDivider';
import WhatsAppButton from '../ui/WhatsAppButton';

interface ModernSectionProps {
  products: any[];
}

export default function ModernSection({ products }: ModernSectionProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (bgRef.current) {
          bgRef.current.classList.add('reveal-wipe');
        }
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (bgRef.current) {
      observer.observe(bgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Filter for Modular Furniture
  const modernProducts = products.filter(
    (p) =>
      p.themeZone === 'modern' ||
      ['sofa', 'chair', 'bed', 'tv-unit', 'wardrobe', 'modular-others'].includes(p.category)
  );

  return (
    <section className="theme-modern py-24 border-b border-stone-900 relative overflow-hidden bg-[#0A0A0A]">
      {/* Wipe-in Grid Panning Background Container */}
      <div
        ref={bgRef}
        className="absolute inset-0 modern-bg-container modern-grid-bg bg-[#0A0A0A] z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-stone-800">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-extrabold font-sans">
              System 02 / Modular
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-sans font-black text-white tracking-tighter uppercase">
              MODULAR SYSTEMS
            </h2>
            <p className="mt-4 text-xs font-sans text-stone-500 uppercase tracking-widest leading-relaxed">
              Strictly structured layouts. Clean profiles. Crafted with premium hardwood frameworks, commercial grade high-density foams, and heavy metal joinery.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <span className="text-[11px] font-sans font-black tracking-widest text-white border border-white/20 px-4 py-2 uppercase select-none">
              Modern & Minimal
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {modernProducts.length === 0 ? (
          <div className="text-center py-12 text-stone-400 uppercase tracking-widest text-xs font-sans font-bold">
            No modular units registered.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modernProducts.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={{ ...product, themeZone: 'modern' }} />
            ))}
          </div>
        )}

        {/* Divider */}
        <ZoneDivider zone="modern" className="mt-16" />

        {/* Section CTA */}
        <div className="flex flex-col items-center mt-12 space-y-4">
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
            Custom size configurations available on request
          </span>
          <WhatsAppButton 
            themeZone="modern"
            category="sofa"
          />
        </div>
      </div>
    </section>
  );
}
