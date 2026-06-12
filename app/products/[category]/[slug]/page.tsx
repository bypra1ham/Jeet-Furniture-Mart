import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/sanity/lib/client';
import { productBySlugQuery, productSlugsQuery } from '@/sanity/lib/queries';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ZoneDivider from '@/components/ui/ZoneDivider';
import { getThemeZone } from '@/sanity/schema/product';
import { MOCK_PRODUCTS } from '@/sanity/lib/mockData';
import ProductGallery from './ProductGallery';
import ViewTracker from './ViewTracker';
import { ChevronLeft } from 'lucide-react';

export const revalidate = 0; // Disable cache so products show up/disappear instantly

// Fetch all possible products for build-time static generation
export async function generateStaticParams() {
  try {
    const products = await client.fetch(productSlugsQuery);
    return products.map((p: any) => ({
      category: p.category,
      slug: p.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Simple non-external block content parser to minimize bundle size
function PortableText({ value }: { value: any }) {
  if (!value || !Array.isArray(value)) return null;
  return (
    <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
      {value.map((block: any, idx: number) => {
        if (block._type !== 'block' || !block.children) return null;
        const text = block.children.map((c: any) => c.text).join('');
        return <p key={idx}>{text}</p>;
      })}
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  // Fetch product from Sanity
  let product = null;
  try {
    product = await client.fetch(productBySlugQuery, {
      category,
      slug,
    });
  } catch (error) {
    console.error('Error fetching product from Sanity:', error);
  }

  // Fallback to mock data if not found in Sanity
  if (!product) {
    product = MOCK_PRODUCTS.find(
      (p) => p.category === category && p.slug.current === slug
    ) || null;
  }

  if (!product) {
    notFound();
  }

  const zone = getThemeZone(product.category);

  // Styling based on zone
  const getZoneStyles = () => {
    switch (zone) {
      case 'spiritual':
        return {
          wrapper: 'theme-spiritual sandstone-texture bg-[#FFFFF0] border-y border-gold-accent/40',
          title: 'font-display font-bold text-[#6B1C1C] text-3xl sm:text-4xl',
          label: 'text-[#E8871A] font-semibold tracking-widest uppercase font-sans text-xs',
          specsCard: 'bg-[#FFFFF0] border border-gold-accent p-6 shadow-sm',
          backBtn: 'text-[#6B1C1C] hover:text-[#E8871A] font-display font-bold',
        };
      case 'artistic':
        return {
          wrapper: 'theme-artistic bg-[#F5EFE6] border-y border-[#D4A96A]/20',
          title: 'font-display font-bold text-[#C4622D] text-3xl sm:text-4xl',
          label: 'text-[#6B7C4E] font-medium tracking-wider uppercase font-sans text-xs',
          specsCard: 'bg-[#F5EFE6] border border-[#D4A96A]/30 p-6',
          backBtn: 'text-[#C4622D] hover:text-[#6B7C4E] font-sans font-medium',
        };
      case 'modern':
      default:
        return {
          wrapper: 'theme-modern bg-white border-y border-[#E0DDD8]',
          title: 'font-sans font-black text-[#0A0A0A] text-2xl sm:text-3xl uppercase tracking-tight',
          label: 'text-stone-400 font-extrabold tracking-[0.2em] uppercase font-sans text-[10px]',
          specsCard: 'bg-[#FAF8F5] border border-[#E0DDD8] p-6 rounded-none',
          backBtn: 'text-[#0A0A0A] hover:underline font-sans font-black uppercase text-xs tracking-wider',
        };
    }
  };

  const styles = getZoneStyles();

  // Helper to format category title
  const formatCategory = (cat: string) => {
    return cat
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const imagesUrl = product.images.map((img: any) => {
    if (typeof img === 'string') return img;
    try {
      return urlFor(img).width(800).height(800).url();
    } catch (e) {
      return '/placeholder.jpg';
    }
  });

  return (
    <div className={`min-h-screen py-10 ${styles.wrapper}`}>
      {/* Background Page-View Tracking Script */}
      <ViewTracker productId={product._id} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/categories" className={`inline-flex items-center space-x-2 text-xs ${styles.backBtn}`}>
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </Link>
        </div>

        {/* Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Image Gallery */}
          <div className="w-full">
            <ProductGallery images={imagesUrl} name={product.name} themeZone={zone} />
          </div>

          {/* Right Column: Information panel */}
          <div className="flex flex-col space-y-6">
            <div>
              <span className={styles.label}>{formatCategory(product.category)}</span>
              <h1 className={`mt-2 ${styles.title}`}>{product.name}</h1>
            </div>

            {/* Spec Card */}
            <div className={styles.specsCard}>
              <h2 className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-4">
                Specifications
              </h2>
              <dl className="grid grid-cols-1 gap-y-4 text-xs font-sans">
                {product.dimensions && (
                  <div className="flex justify-between border-b border-[#E0DDD8]/50 pb-2">
                    <dt className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">Dimensions</dt>
                    <dd className="text-[#1C1C1E] font-medium">{product.dimensions}</dd>
                  </div>
                )}
                {product.material && (
                  <div className="flex justify-between border-b border-[#E0DDD8]/50 pb-2">
                    <dt className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">Primary Material</dt>
                    <dd className="text-[#1C1C1E] font-medium">{product.material}</dd>
                  </div>
                )}
                <div className="flex justify-between border-b border-[#E0DDD8]/50 pb-2">
                  <dt className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">Customization</dt>
                  <dd className="text-green-700 font-bold uppercase tracking-wider text-[10px]">Available (100%)</dd>
                </div>
                <div className="flex justify-between pb-2">
                  <dt className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">Shipping</dt>
                  <dd className="text-[#1C1C1E] font-medium">Pan-India & International Shipping</dd>
                </div>
              </dl>
            </div>

            {/* Description */}
            <div className="border-t border-[#E0DDD8] pt-6">
              <h3 className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-4">
                Product Description
              </h3>
              <PortableText value={product.description} />
            </div>

            {/* WhatsApp CTA Action Box */}
            <div className="border-t border-[#E0DDD8] pt-8">
              <div className="bg-white/40 border border-[#E0DDD8]/60 p-6 text-center space-y-4">
                <p className="text-xs text-stone-500 font-sans leading-relaxed">
                  Interested in purchasing or customizing this piece? Inquire directly on WhatsApp to connect with our design team. We will verify size requirements, color options, and provide a shipping quotation.
                </p>
                <WhatsAppButton
                  productId={product._id}
                  productName={product.name}
                  category={product.category}
                  themeZone={zone}
                  className="w-full"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <ZoneDivider zone={zone} className="mt-20" />
      </div>
    </div>
  );
}
