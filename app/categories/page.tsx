import React from 'react';
import { client } from '@/sanity/lib/client';
import { allProductsQuery } from '@/sanity/lib/queries';
import { MOCK_PRODUCTS } from '@/sanity/lib/mockData';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CategoriesCatalog from '@/components/zones/CategoriesCatalog';

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

        {/* Dynamic Catalog Component */}
        <CategoriesCatalog products={products} />

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

