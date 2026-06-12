'use client';

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Custom cursor only works on devices with fine pointers (mouse) and is disabled on touchscreens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let hovered = false;
    let hasMoved = false;

    const updatePosition = () => {
      // Offset by half of standard size (6px) to center the dot around the exact coordinates
      cursor.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(${hovered ? 1.66 : 1})`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        cursor.style.opacity = '1';
        hasMoved = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      updatePosition();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isCTA =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA';
        
      if (isCTA) {
        hovered = true;
      } else {
        hovered = false;
      }
      updatePosition();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-[#C9A84C] rounded-full pointer-events-none z-[9999] transition-transform duration-[60ms] ease-out origin-center opacity-0 hidden lg:block"
    />
  );
}
