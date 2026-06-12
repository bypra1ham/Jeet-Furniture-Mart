'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
  themeZone: 'spiritual' | 'modern' | 'artistic';
}

export default function ProductGallery({ images, name, themeZone }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-stone-100 flex items-center justify-center text-stone-400">
        No images available
      </div>
    );
  }

  const getFrameStyle = () => {
    switch (themeZone) {
      case 'spiritual':
        return 'rounded-[40%] overflow-hidden border-2 border-gold-accent bg-[#FFFFF0] p-2';
      case 'artistic':
        return 'rounded-lg overflow-hidden border border-[#D4A96A]/20 bg-[#F5EFE6]';
      case 'modern':
      default:
        return 'rounded-none overflow-hidden border border-black shadow-[4px_4px_0px_rgba(0,0,0,0.9)] bg-white';
    }
  };

  const getThumbnailStyle = (idx: number) => {
    const isActive = idx === activeIdx;
    switch (themeZone) {
      case 'spiritual':
        return `rounded-full overflow-hidden border-2 transition-all ${
          isActive ? 'border-[#E8871A] scale-105' : 'border-gold-accent/30 hover:border-[#E8871A]/70'
        }`;
      case 'artistic':
        return `rounded border transition-all ${
          isActive ? 'border-[#C4622D] scale-105' : 'border-[#D4A96A]/20 hover:border-[#C4622D]/60'
        }`;
      case 'modern':
      default:
        return `rounded-none border transition-all ${
          isActive ? 'border-black scale-105 ring-1 ring-black' : 'border-[#E0DDD8] hover:border-black'
        }`;
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image View */}
      <div className={`relative aspect-square w-full ${getFrameStyle()}`}>
        <Image
          src={images[activeIdx]}
          alt={`${name} - Image ${activeIdx + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnail Selector */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-3 pt-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-16 h-16 cursor-pointer focus:outline-none ${getThumbnailStyle(idx)}`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
