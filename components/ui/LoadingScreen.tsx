'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Hide the loader after 1.5 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5] transition-opacity duration-700 ease-out select-none">
      <div className="relative flex flex-col items-center space-y-6">
        
        {/* Animated outer gold spinning circle */}
        <div className="absolute inset-0 w-28 h-28 rounded-full border border-gold-accent/20 border-t-gold-accent animate-spin" style={{ margin: '-16px' }} />
        
        {/* Pulsing circular logo container */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gold-accent/50 shadow-xl animate-pulse">
          <Image
            src="/assets/logo.jpeg"
            alt="Jeet Furniture Mart Logo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Brand Name Text Fades In */}
        <div className="flex flex-col items-center text-center animate-fade-in">
          <span className="font-display text-xl font-bold tracking-[0.2em] text-[#2E1912]">
            JEET
          </span>
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#C9A84C] font-semibold mt-1.5">
            Furniture Mart
          </span>
        </div>
      </div>
    </div>
  );
}
