'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import ZoneDivider from '@/components/ui/ZoneDivider';

interface CategoriesCatalogProps {
  products: any[];
}

export default function CategoriesCatalog({ products }: CategoriesCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'spiritual' | 'modern' | 'artistic'>('all');

  const getProductsByCategory = (cat: string) => {
    return products.filter((p: any) => p.category === cat);
  };

  const categoriesConfig = {
    spiritual: [
      { id: 'wooden-swing', name: 'Wooden Swings / Jhulas' },
      { id: 'wooden-stand-jhula', name: 'Wooden Stand Jhulas' },
      { id: 'wooden-mandir', name: 'Classic Wooden Mandirs' },
      { id: 'wooden-deco-mandir', name: 'Deco Painted Mandirs' },
      { id: 'korean-mandir', name: 'Korean Acrylic Mandirs' },
    ],
    modern: [
      { id: 'sofa', name: 'Designer Sofa Sets' },
      { id: 'chair', name: 'Ergonomic & Accent Chairs' },
      { id: 'bed', name: 'Premium Beds' },
      { id: 'tv-unit', name: 'Modern TV Consoles' },
      { id: 'wardrobe', name: 'Modular Wardrobes' },
      { id: 'modular-others', name: 'Other Modular Items' },
    ],
    artistic: [
      { id: 'cnc-2d', name: '2D Fretwork & Jali Screens' },
      { id: 'cnc-3d', name: '3D Bas-Relief Carving Panels' },
    ],
  };

  const counts = {
    all: products.length,
    spiritual: products.filter((p: any) => 
      ['wooden-swing', 'wooden-stand-jhula', 'wooden-mandir', 'wooden-deco-mandir', 'korean-mandir'].includes(p.category)
    ).length,
    modern: products.filter((p: any) => 
      ['sofa', 'chair', 'bed', 'tv-unit', 'wardrobe', 'modular-others'].includes(p.category)
    ).length,
    artistic: products.filter((p: any) => 
      ['cnc-2d', 'cnc-3d'].includes(p.category)
    ).length,
  };

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="flex justify-center mb-16 px-4">
        <div className="inline-flex flex-wrap md:flex-nowrap p-1.5 bg-[#FAF8F5]/80 backdrop-blur-md border border-stone-200/60 rounded-2xl shadow-sm max-w-full overflow-x-auto gap-1 select-none">
          {[
            { id: 'all', label: 'All Catalog', count: counts.all },
            { id: 'spiritual', label: 'Jhulas & Mandirs', count: counts.spiritual },
            { id: 'modern', label: 'Modular Furniture', count: counts.modern },
            { id: 'artistic', label: 'CNC Artistic Work', count: counts.artistic }
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 text-[10px] sm:text-xs font-sans font-bold tracking-widest uppercase rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#C9A84C] text-white shadow-md shadow-[#C9A84C]/25 translate-y-[-1px]'
                    : 'bg-transparent text-[#2E1912]/75 hover:text-[#2E1912] hover:bg-stone-200/50'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-sans font-bold transition-colors duration-300 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products list sections */}
      <div className="space-y-20">
        {/* SECTION 1: SPIRITUAL ZONE */}
        {(activeCategory === 'all' || activeCategory === 'spiritual') && (
          <div id="spiritual" className="scroll-mt-24 mb-24 theme-spiritual sandstone-texture bg-[#FFFFF0] border border-gold-accent/30 p-6 sm:p-10 animate-fade-in">
            <div className="border-b border-gold-accent/30 pb-4 mb-8">
              <span className="text-xs uppercase tracking-widest text-[#E8871A] font-sans font-bold">Zone 01 / Spiritual</span>
              <h2 className="text-3xl font-display font-bold text-[#6B1C1C] mt-1">Jhulas &amp; Mandirs</h2>
            </div>
            
            {categoriesConfig.spiritual.map((cat) => {
              const catProducts = getProductsByCategory(cat.id);
              if (catProducts.length === 0) return null;
              return (
                <div key={cat.id} className="mb-16 last:mb-0">
                  <h3 className="text-xl font-display font-semibold text-[#6B1C1C] border-b border-gold-accent/20 pb-2 mb-6">
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catProducts.map((product: any) => (
                      <ProductCard key={product._id} product={{ ...product, themeZone: 'spiritual' }} />
                    ))}
                  </div>
                </div>
              );
            })}
            <ZoneDivider zone="spiritual" />
          </div>
        )}

        {/* SECTION 2: MODERN ZONE */}
        {(activeCategory === 'all' || activeCategory === 'modern') && (
          <div id="modern" className="scroll-mt-24 mb-24 theme-modern bg-white border border-[#E0DDD8] p-6 sm:p-10 animate-fade-in">
            <div className="border-b border-[#E0DDD8] pb-4 mb-8">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-sans">Zone 02 / Minimal</span>
              <h2 className="text-3xl font-sans font-black text-[#0A0A0A] mt-1 uppercase tracking-tight">Modular Furniture</h2>
            </div>

            {categoriesConfig.modern.map((cat) => {
              const catProducts = getProductsByCategory(cat.id);
              if (catProducts.length === 0) return null;
              return (
                <div key={cat.id} className="mb-16 last:mb-0">
                  <h3 className="text-sm font-sans font-extrabold uppercase text-[#0A0A0A] tracking-wider border-b border-[#E0DDD8] pb-2 mb-6">
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catProducts.map((product: any) => (
                      <ProductCard key={product._id} product={{ ...product, themeZone: 'modern' }} />
                    ))}
                  </div>
                </div>
              );
            })}
            <ZoneDivider zone="modern" />
          </div>
        )}

        {/* SECTION 3: ARTISTIC ZONE */}
        {(activeCategory === 'all' || activeCategory === 'artistic') && (
          <div id="artistic" className="scroll-mt-24 mb-16 theme-artistic bg-[#F5EFE6] border border-[#D4A96A]/20 p-6 sm:p-10 animate-fade-in">
            <div className="border-b border-[#D4A96A]/40 pb-4 mb-8">
              <span className="text-xs uppercase tracking-widest text-[#C4622D] font-sans font-bold">Zone 03 / Portfolio</span>
              <h2 className="text-3xl font-display font-bold text-[#C4622D] mt-1">CNC Artistic Work</h2>
            </div>

            {categoriesConfig.artistic.map((cat) => {
              const catProducts = getProductsByCategory(cat.id);
              if (catProducts.length === 0) return null;
              return (
                <div key={cat.id} className="mb-16 last:mb-0">
                  <h3 className="text-xl font-display font-semibold text-[#C4622D] border-b border-[#D4A96A]/20 pb-2 mb-6">
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catProducts.map((product: any) => (
                      <ProductCard key={product._id} product={{ ...product, themeZone: 'artistic' }} />
                    ))}
                  </div>
                </div>
              );
            })}
            <ZoneDivider zone="artistic" />
          </div>
        )}
      </div>
    </>
  );
}
