import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { featuredProductsQuery } from '@/sanity/lib/queries';
import { MOCK_PRODUCTS } from '@/sanity/lib/mockData';
import HeroSection from '@/components/zones/HeroSection';
import SpiritualSection from '@/components/zones/SpiritualSection';
import ModernSection from '@/components/zones/ModernSection';
import ArtisticSection from '@/components/zones/ArtisticSection';
import { SpiritualToModernDivider, ModernToArtisticDivider } from '@/components/ui/TransitionDivider';

export const revalidate = 0; // Disable cache so products show up/disappear instantly

async function getFeaturedProducts() {
  try {
    const products = await client.fetch(featuredProductsQuery);
    if (products && products.length > 0) {
      return products;
    }
  } catch (error) {
    console.error('Error fetching featured products from Sanity:', error);
  }
  // Graceful fallback to mock data
  return MOCK_PRODUCTS.filter((p) => p.featured);
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div className="w-full">
      {/* Premium Hero Banner - Split Layout */}
      <HeroSection />

      {/* The Three Visual Zones */}
      <div id="spiritual">
        <SpiritualSection products={products} />
      </div>

      <SpiritualToModernDivider />

      <div id="modern">
        <ModernSection products={products} />
      </div>

      <ModernToArtisticDivider />

      <div id="artistic">
        <ArtisticSection products={products} />
      </div>

      {/* Testimonials Preview Section */}
      <section className="bg-white py-20 border-t border-[#E0DDD8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-widest text-[#C9A84C] font-bold">
            Customer Praise
          </span>
          <h2 className="mt-2 text-3xl font-display font-semibold text-[#1C1C1E]">
            What Our Patrons Say
          </h2>
          <p className="mt-4 text-xs text-stone-500 max-w-md mx-auto">
            From customized Korean Mandirs to large CNC installation panels, read what our clients have to say about our finishing.
          </p>
          <div className="mt-10">
            <Link
              href="/testimonials"
              className="inline-flex items-center text-xs uppercase tracking-widest font-sans font-extrabold text-[#1C1C1E] border-b border-black pb-1 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors"
            >
              Read Testimonials &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
