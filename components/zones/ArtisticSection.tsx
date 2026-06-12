'use client';

import React, { useEffect, useRef } from 'react';
import ProductCard from '../ui/ProductCard';
import ZoneDivider from '../ui/ZoneDivider';
import WhatsAppButton from '../ui/WhatsAppButton';

interface ArtisticSectionProps {
  products: any[];
}

export default function ArtisticSection({ products }: ArtisticSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const path = underlineRef.current;
      if (!section || !path) return;

      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Calculate how far the section has scrolled relative to viewport
      const totalScroll = rect.height + viewHeight;
      const currentScroll = viewHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

      // Draw the brushstroke path (total length is roughly 200)
      const pathLength = 200;
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial draw check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter for CNC works
  const artisticProducts = products.filter(
    (p) =>
      p.themeZone === 'artistic' ||
      ['cnc-2d', 'cnc-3d'].includes(p.category)
  );

  return (
    <section ref={sectionRef} className="theme-artistic bg-[#1A0F0A] py-24 relative overflow-hidden">
      {/* Rosette Motifs Background Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Rosette 1 */}
        <div className="absolute top-[12%] left-[5%] w-12 h-12 opacity-[0.07] text-[#D4A96A]">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="30" r="20" />
            <circle cx="67.3" cy="40" r="20" />
            <circle cx="67.3" cy="60" r="20" />
            <circle cx="50" cy="70" r="20" />
            <circle cx="32.7" cy="60" r="20" />
            <circle cx="32.7" cy="40" r="20" />
          </svg>
        </div>
        {/* Rosette 2 */}
        <div className="absolute top-[45%] right-[8%] w-16 h-16 opacity-[0.07] text-[#D4A96A]">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="30" r="20" />
            <circle cx="67.3" cy="40" r="20" />
            <circle cx="67.3" cy="60" r="20" />
            <circle cx="50" cy="70" r="20" />
            <circle cx="32.7" cy="60" r="20" />
            <circle cx="32.7" cy="40" r="20" />
          </svg>
        </div>
        {/* Rosette 3 */}
        <div className="absolute bottom-[18%] left-[22%] w-10 h-10 opacity-[0.07] text-[#D4A96A]">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="30" r="20" />
            <circle cx="67.3" cy="40" r="20" />
            <circle cx="67.3" cy="60" r="20" />
            <circle cx="50" cy="70" r="20" />
            <circle cx="32.7" cy="60" r="20" />
            <circle cx="32.7" cy="40" r="20" />
          </svg>
        </div>
        {/* Rosette 4 */}
        <div className="absolute top-[28%] right-[35%] w-8 h-8 opacity-[0.07] text-[#D4A96A]">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="30" r="20" />
            <circle cx="67.3" cy="40" r="20" />
            <circle cx="67.3" cy="60" r="20" />
            <circle cx="50" cy="70" r="20" />
            <circle cx="32.7" cy="60" r="20" />
            <circle cx="32.7" cy="40" r="20" />
          </svg>
        </div>
        {/* Rosette 5 */}
        <div className="absolute bottom-[8%] right-[15%] w-14 h-14 opacity-[0.07] text-[#D4A96A]">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="30" r="20" />
            <circle cx="67.3" cy="40" r="20" />
            <circle cx="67.3" cy="60" r="20" />
            <circle cx="50" cy="70" r="20" />
            <circle cx="32.7" cy="60" r="20" />
            <circle cx="32.7" cy="40" r="20" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#D4A96A] font-sans font-bold">
            Artistic Engravings
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display font-bold text-[#D4A96A]">
            CNC Design &amp; Craft
          </h2>
          
          {/* Hand drawn brushstroke underline */}
          <div className="h-4 w-64 mt-1 overflow-visible relative pointer-events-none select-none">
            <svg className="w-full h-full text-[#C4622D] opacity-75" viewBox="0 0 200 10" preserveAspectRatio="none">
              <path
                ref={underlineRef}
                d="M 5,5 Q 50,2 100,5 T 195,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <p className="mt-6 text-sm font-sans text-stone-300 leading-relaxed font-light">
            Merging ancient hand-carving templates with high-precision digital router cutting. Offering custom 2D screens, fretwork partitions, and deep 3D bas-relief architectural wall panels.
          </p>
        </div>

        {/* Product Grid - Asymmetric Layout */}
        {artisticProducts.length === 0 ? (
          <div className="text-center py-12 text-[#C4622D]/60 italic font-display">
            No precision CNC carving catalog uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
            {artisticProducts.slice(0, 3).map((product, idx) => {
              // Apply dynamic shifts to create a masonry-feel layout
              const alignmentClass = idx === 1 ? 'lg:translate-y-8' : '';
              return (
                <div key={product._id} className={alignmentClass}>
                  <ProductCard product={{ ...product, themeZone: 'artistic' }} />
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic section divider */}
        <ZoneDivider zone="artistic" className="mt-20 lg:mt-28" />

        {/* Section CTA */}
        <div className="text-center mt-12">
          <p className="text-xs font-sans uppercase tracking-widest text-[#C4622D] font-bold mb-4">
            Upload your custom DXF/Vector file for CNC cutting
          </p>
          <WhatsAppButton 
            themeZone="artistic"
            category="cnc-3d"
          />
        </div>
      </div>
    </section>
  );
}
