'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import ZoneDivider from '@/components/ui/ZoneDivider';

interface CategoriesCatalogProps {
  products: any[];
}

export default function CategoriesCatalog({ products }: CategoriesCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'spiritual' | 'modern' | 'artistic'>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');

  const getProductsByCategory = (cat: string) => {
    return products.filter((p: any) => p.category === cat);
  };

  const categoriesConfig = {
    spiritual: [
      { id: 'wooden-swing', name: 'Wooden Swing (Jhula)' },
      { id: 'wooden-stand-jhula', name: 'Wooden Stand Jhula' },
      { id: 'wooden-mandir', name: 'Wooden Mandir' },
      { id: 'wooden-deco-mandir', name: 'Wooden Deco Mandir' },
      { id: 'korean-mandir', name: 'Korean Mandir' },
    ],
    modern: [
      { id: 'sofa', name: 'Sofa' },
      { id: 'chair', name: 'Chair' },
      { id: 'bed', name: 'Bed' },
      { id: 'tv-unit', name: 'TV Unit' },
      { id: 'wardrobe', name: 'Wardrobe' },
      { id: 'modular-others', name: 'Modular Others' },
    ],
    artistic: [
      { id: 'cnc-2d', name: 'CNC 2D' },
      { id: 'cnc-3d', name: 'CNC 3D' },
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

  const handleMainCategoryChange = (cat: 'all' | 'spiritual' | 'modern' | 'artistic') => {
    setActiveCategory(cat);
    setActiveSubCategory('all');
  };

  const getSubCategories = () => {
    switch (activeCategory) {
      case 'spiritual':
        return [
          { id: 'all', name: 'All Spiritual' },
          ...categoriesConfig.spiritual,
        ];
      case 'modern':
        return [
          { id: 'all', name: 'All Modern' },
          ...categoriesConfig.modern,
        ];
      case 'artistic':
        return [
          { id: 'all', name: 'All Artistic' },
          ...categoriesConfig.artistic,
        ];
      default:
        return [];
    }
  };

  const getSubCategoryCount = (subId: string, parentId: string) => {
    if (subId === 'all') {
      return counts[parentId as keyof typeof counts] || 0;
    }
    return getProductsByCategory(subId).length;
  };

  const getSubTabStyles = (subId: string) => {
    const isActive = activeSubCategory === subId;
    switch (activeCategory) {
      case 'spiritual':
        return isActive
          ? 'bg-[#6B1C1C] text-white shadow-sm font-sans font-extrabold'
          : 'bg-[#FFFFF0] border border-[#C9A84C]/30 text-[#6B1C1C] hover:bg-[#6B1C1C]/5 hover:text-[#6B1C1C] font-sans font-bold';
      case 'artistic':
        return isActive
          ? 'bg-[#C4622D] text-white shadow-sm font-sans font-extrabold'
          : 'bg-[#F5EFE6] border border-[#D4A96A]/40 text-[#C4622D] hover:bg-[#C4622D]/5 hover:text-[#C4622D] font-sans font-bold';
      case 'modern':
      default:
        return isActive
          ? 'bg-[#0A0A0A] text-white shadow-sm font-sans font-extrabold'
          : 'bg-white border border-[#E0DDD8] text-stone-600 hover:bg-stone-50 hover:text-[#0A0A0A] font-sans font-bold';
    }
  };

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="flex flex-col items-center mb-16 px-4">
        
        {/* Parent Category Selector */}
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
                onClick={() => handleMainCategoryChange(tab.id as any)}
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

        {/* Secondary Sub-Category Selector */}
        {activeCategory !== 'all' && (
          <div className="flex justify-center mt-6 w-full animate-fade-in">
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl px-2">
              {getSubCategories().map((sub) => {
                const count = getSubCategoryCount(sub.id, activeCategory);
                if (count === 0 && sub.id !== 'all') return null; // Hide empty sub-categories
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubCategory(sub.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-[9px] sm:text-[10px] tracking-wider uppercase rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap select-none ${getSubTabStyles(
                      sub.id
                    )}`}
                  >
                    <span>{sub.name}</span>
                    <span className={`text-[8px] px-1 rounded-md font-sans ${
                      activeSubCategory === sub.id
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-200/60 text-stone-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
            
            {categoriesConfig.spiritual
              .filter((cat) => activeSubCategory === 'all' || activeSubCategory === cat.id)
              .map((cat) => {
                const catProducts = getProductsByCategory(cat.id);
                if (catProducts.length === 0) return null;
                return (
                  <div key={cat.id} className="mb-16 last:mb-0 animate-fade-in">
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
            {activeSubCategory === 'all' && <ZoneDivider zone="spiritual" />}
          </div>
        )}

        {/* SECTION 2: MODERN ZONE */}
        {(activeCategory === 'all' || activeCategory === 'modern') && (
          <div id="modern" className="scroll-mt-24 mb-24 theme-modern bg-white border border-[#E0DDD8] p-6 sm:p-10 animate-fade-in">
            <div className="border-b border-[#E0DDD8] pb-4 mb-8">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-sans">Zone 02 / Minimal</span>
              <h2 className="text-3xl font-sans font-black text-[#0A0A0A] mt-1 uppercase tracking-tight">Modular Furniture</h2>
            </div>

            {categoriesConfig.modern
              .filter((cat) => activeSubCategory === 'all' || activeSubCategory === cat.id)
              .map((cat) => {
                const catProducts = getProductsByCategory(cat.id);
                if (catProducts.length === 0) return null;
                return (
                  <div key={cat.id} className="mb-16 last:mb-0 animate-fade-in">
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
            {activeSubCategory === 'all' && <ZoneDivider zone="modern" />}
          </div>
        )}

        {/* SECTION 3: ARTISTIC ZONE */}
        {(activeCategory === 'all' || activeCategory === 'artistic') && (
          <div id="artistic" className="scroll-mt-24 mb-16 theme-artistic bg-[#F5EFE6] border border-[#D4A96A]/20 p-6 sm:p-10 animate-fade-in">
            <div className="border-b border-[#D4A96A]/40 pb-4 mb-8">
              <span className="text-xs uppercase tracking-widest text-[#C4622D] font-sans font-bold">Zone 03 / Portfolio</span>
              <h2 className="text-3xl font-display font-bold text-[#C4622D] mt-1">CNC Artistic Work</h2>
            </div>

            {categoriesConfig.artistic
              .filter((cat) => activeSubCategory === 'all' || activeSubCategory === cat.id)
              .map((cat) => {
                const catProducts = getProductsByCategory(cat.id);
                if (catProducts.length === 0) return null;
                return (
                  <div key={cat.id} className="mb-16 last:mb-0 animate-fade-in">
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
            {activeSubCategory === 'all' && <ZoneDivider zone="artistic" />}
          </div>
        )}
      </div>
    </>
  );
}
