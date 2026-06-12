'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';

export interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
    category: string;
    themeZone?: 'spiritual' | 'modern' | 'artistic';
    images: any[];
    dimensions?: string;
    material?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, slug, category, themeZone = 'modern', images, dimensions, material } = product;
  const productUrl = `/products/${category}/${slug.current}`;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (themeZone !== 'artistic') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }
    return () => observer.disconnect();
  }, [themeZone]);
  
  let mainImage = '/placeholder.jpg';
  if (images && images[0]) {
    if (typeof images[0] === 'string') {
      mainImage = images[0];
    } else {
      try {
        mainImage = urlFor(images[0]).width(600).height(600).url();
      } catch (err) {
        console.error('Error generating image URL:', err);
      }
    }
  }

  // Format category display name
  const formatCategory = (cat: string) => {
    return cat
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  switch (themeZone) {
    case 'spiritual':
      // Zone 1: Spiritual / Jhulas & Mandirs - Warm Cream & Gold
      return (
        <div className="theme-spiritual sandstone-texture group relative bg-[#FFF9EF] border-t-[3px] border-t-gold-accent border-x border-b border-[#E0DDD8]/40 hover:border-gold-accent transition-all duration-500 flex flex-col p-4 shadow-sm hover:shadow-xl overflow-hidden">
          
          {/* Woodcarving Corner Ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 opacity-30 text-[#C9A84C] pointer-events-none z-10">
            <svg viewBox="0 0 20 20" className="w-full h-full">
              <path d="M 20,2 L 2,2 L 2,20" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-2 right-2 w-4 h-4 opacity-30 text-[#C9A84C] pointer-events-none z-10">
            <svg viewBox="0 0 20 20" className="w-full h-full">
              <path d="M 0,2 L 18,2 L 18,20" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="2" r="2" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-2 left-2 w-4 h-4 opacity-30 text-[#C9A84C] pointer-events-none z-10">
            <svg viewBox="0 0 20 20" className="w-full h-full">
              <path d="M 20,18 L 2,18 L 2,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="2" cy="18" r="2" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-2 right-2 w-4 h-4 opacity-30 text-[#C9A84C] pointer-events-none z-10">
            <svg viewBox="0 0 20 20" className="w-full h-full">
              <path d="M 0,18 L 18,18 L 18,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="18" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Rounded Arch Top Header Image */}
          <Link href={productUrl} className="block relative aspect-square w-full overflow-hidden rounded-t-[40%] border-t border-x border-gold-accent/40 bg-[#FAF8F5] z-10">
            <Image
              src={mainImage}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
          
          {/* Details */}
          <div className="pt-6 pb-2 text-center flex-grow flex flex-col justify-between z-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E8871A] font-sans font-semibold">
                {formatCategory(category)}
              </span>
              <h3 className="mt-2 text-xl font-tiro font-bold text-[#6B1C1C] hover:text-[#E8871A] transition-colors line-clamp-1">
                <Link href={productUrl}>{name}</Link>
              </h3>
              {material && (
                <p className="text-xs italic mt-1 text-[#6B1C1C]/70">
                  {material}
                </p>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gold-accent/30">
              <Link
                href={productUrl}
                className="inline-block text-xs font-display uppercase tracking-wider text-[#6B1C1C] hover:text-[#E8871A] font-semibold transition-colors"
              >
                View Handcraft Details &rarr;
              </Link>
            </div>
          </div>
        </div>
      );

    case 'artistic':
      // Zone 3: Artistic & CNC Portfolio - Earthy Cream & Terracotta
      return (
        <div ref={cardRef} className="theme-artistic group bg-[#FDF0E8] hover:bg-[#F9E6DA] transition-all duration-300 flex flex-col p-3 border border-[#D4A96A]/20 hover:shadow-md relative overflow-hidden">
          
          {/* Animated Hand-Drawn Sketch Border Reveal */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <svg className="w-full h-full">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="#C4622D"
                strokeWidth="1.5"
                pathLength="100"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: isInView ? 0 : 100,
                  transition: 'stroke-dashoffset 2s ease-in-out',
                }}
              />
            </svg>
          </div>

          {/* Portfolio-like showcase image */}
          <Link href={productUrl} className="block relative aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5] z-10">
            <Image
              src={mainImage}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-102"
            />
            {/* Absolute overlay tag */}
            <div className="absolute top-2 left-2 bg-[#C4622D] text-[#FDF0E8] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 z-20">
              Craft Piece
            </div>
          </Link>

          {/* Minimal Text Details */}
          <div className="pt-4 pb-1 flex flex-col justify-between flex-grow z-10">
            <div>
              <h3 className="text-lg font-display text-[#C4622D] group-hover:text-[#6B7C4E] transition-colors line-clamp-1">
                <Link href={productUrl}>{name}</Link>
              </h3>
              <p className="text-xs text-[#6B7C4E] font-medium mt-0.5">
                {formatCategory(category)}
              </p>
            </div>
            <Link
              href={productUrl}
              className="mt-3 text-xs text-[#C4622D] hover:underline font-medium transition-colors"
            >
              Explore Craft &rarr;
            </Link>
          </div>
        </div>
      );

    case 'modern':
    default:
      // Zone 2: Modular Furniture - Modern Dark & Minimalist (#111113 bg)
      return (
        <div className="theme-modern group bg-[#111113] border border-stone-800 rounded-none transition-all duration-300 flex flex-col p-0 relative overflow-hidden hover:border-transparent">
          
          {/* Animated Gold Perimeter Border Trace */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <svg className="w-full h-full">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
                pathLength="100"
                className="modern-card-border-trace"
              />
            </svg>
          </div>

          {/* Geometric crop image with hard border and shadow */}
          <div className="p-4 bg-[#1a1a1e] z-10">
            <Link href={productUrl} className="block relative aspect-video w-full overflow-hidden bg-[#111113] border border-stone-800 shadow-sm group-hover:shadow-[4px_4px_0px_rgba(255,255,255,0.9)] transition-all duration-300">
              <Image
                src={mainImage}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-300"
              />
            </Link>
          </div>

          {/* Details & Specifications */}
          <div className="p-5 border-t border-stone-800 flex-grow flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between text-[10px] tracking-wider uppercase font-sans text-stone-400 font-bold">
                <span>{formatCategory(category)}</span>
                {material && <span className="max-w-[120px] truncate text-stone-500">{material}</span>}
              </div>
              <h3 className="mt-2 text-base font-sans font-extrabold text-white tracking-tight hover:text-stone-300 hover:underline line-clamp-1">
                <Link href={productUrl}>{name}</Link>
              </h3>
            </div>

            {/* Specifications Box */}
            <div className="mt-4 pt-3 border-t border-stone-800/60 text-[11px] font-sans text-stone-300 space-y-1">
              {dimensions && (
                <div className="flex justify-between">
                  <span className="text-stone-500 uppercase tracking-wider font-semibold text-[9px]">Dimensions:</span>
                  <span className="font-medium">{dimensions}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase tracking-wider font-semibold text-[9px]">Customizable:</span>
                <span className="font-semibold text-green-500 uppercase tracking-wider text-[9px]">Yes</span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={productUrl}
                className="block text-center text-xs font-sans uppercase font-black tracking-widest text-white bg-transparent border border-white py-2 hover:bg-white hover:text-[#111113] transition-all relative z-30"
              >
                View Specs
              </Link>
            </div>
          </div>
        </div>
      );
  }
}
