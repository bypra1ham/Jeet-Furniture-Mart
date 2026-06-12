import React from 'react';
import { client } from '@/sanity/lib/client';
import { allProductsQuery } from '@/sanity/lib/queries';
import { MOCK_PRODUCTS } from '@/sanity/lib/mockData';
import ProductCard from '@/components/ui/ProductCard';
import ZoneDivider from '@/components/ui/ZoneDivider';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { getThemeZone } from '@/sanity/schema/product';

export const revalidate = 0; // Disable cache so products show up/disappear instantly

async function getAllProducts() {
  try {
    const products = await client.fetch(allProductsQuery);
    if (products && products.length > 0) {
      return products;
    }
  } catch (error) {
    console.error('Error fetching products for categories from Sanity:', error);
  }
  // Graceful fallback to mock data
  return MOCK_PRODUCTS;
}

export default async function CategoriesPage() {
  const products = await getAllProducts();

  // Helper to map and group products by category enum
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

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl font-display font-light text-[#1C1C1E] tracking-tight">
            Our Furniture <span className="font-bold text-[#C9A84C] italic">Catalog</span>
          </h1>
          <p className="mt-4 text-xs font-sans uppercase tracking-widest text-stone-500 leading-relaxed">
            Browse through our classic devotional shrines, custom modular furniture collections, and digital CNC artistic panels.
          </p>
        </div>

        {/* SECTION 1: SPIRITUAL ZONE */}
        <div id="spiritual" className="scroll-mt-24 mb-24 theme-spiritual sandstone-texture bg-[#FFFFF0] border border-gold-accent/30 p-6 sm:p-10">
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

        {/* SECTION 2: MODERN ZONE */}
        <div id="modern" className="scroll-mt-24 mb-24 theme-modern bg-white border border-[#E0DDD8] p-6 sm:p-10">
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

        {/* SECTION 3: ARTISTIC ZONE */}
        <div id="artistic" className="scroll-mt-24 mb-16 theme-artistic bg-[#F5EFE6] border border-[#D4A96A]/20 p-6 sm:p-10">
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

        {/* Catalog CTA */}
        <div className="text-center bg-white border border-[#E0DDD8] p-10 max-w-md mx-auto mt-16">
          <h4 className="text-sm font-sans uppercase font-bold text-[#1C1C1E] tracking-wider mb-2">
            Looking for something specific?
          </h4>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            All our items are completely customizable in terms of dimensions, material types, and finishing textures.
          </p>
          <WhatsAppButton />
        </div>

      </div>
    </div>
  );
}
