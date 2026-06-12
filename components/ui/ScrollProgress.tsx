'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const bar = barRef.current;
      if (!bar) return;
      
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call to map position if user refreshed mid-scroll

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[1px] bg-[#C9A84C] z-[100] origin-left pointer-events-none transition-transform duration-[75ms] ease-out"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
