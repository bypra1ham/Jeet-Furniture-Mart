'use client';

import React from 'react';

interface ZoneDividerProps {
  zone: 'spiritual' | 'modern' | 'artistic';
  className?: string;
}

export default function ZoneDivider({ zone, className = '' }: ZoneDividerProps) {
  switch (zone) {
    case 'spiritual':
      // Classical ornamental temple arches divider
      return (
        <div className={`w-full flex items-center justify-center my-8 ${className}`}>
          <div className="flex items-center w-full max-w-lg justify-between opacity-80">
            <div className="h-[1px] bg-gold-accent flex-grow" />
            <svg
              className="w-16 h-8 text-gold-accent mx-4 flex-shrink-0"
              viewBox="0 0 100 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Central ornamental arch */}
              <path d="M10 40 C 20 20, 30 10, 50 10 C 70 10, 80 20, 90 40" />
              <path d="M25 40 C 35 25, 45 18, 50 18 C 55 18, 65 25, 75 40" strokeDasharray="2,2" />
              <circle cx="50" cy="8" r="2" fill="currentColor" />
            </svg>
            <div className="h-[1px] bg-gold-accent flex-grow" />
          </div>
        </div>
      );

    case 'artistic':
      // Organic/brushstroke wavy separator
      return (
        <div className={`w-full flex items-center justify-center my-8 ${className}`}>
          <svg
            className="w-full max-w-md h-6 text-[#C4622D] opacity-60"
            viewBox="0 0 400 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {/* Organic wavy brushstroke path */}
            <path d="M10 12 C 70 2, 130 22, 200 12 C 270 2, 330 22, 390 12" />
            <path d="M30 15 C 80 8, 140 24, 200 15 C 260 6, 320 22, 370 15" strokeWidth="1" strokeDasharray="3,3" />
          </svg>
        </div>
      );

    case 'modern':
    default:
      // Clean, geometric minimal divider
      return (
        <div className={`w-full flex items-center justify-center my-8 ${className}`}>
          <div className="flex items-center w-full max-w-xs justify-between">
            <div className="h-[1px] bg-[#E0DDD8] flex-grow" />
            <div className="w-2.5 h-2.5 bg-[#0A0A0A] mx-3 rotate-45 border border-[#E0DDD8] flex-shrink-0" />
            <div className="h-[1px] bg-[#E0DDD8] flex-grow" />
          </div>
        </div>
      );
  }
}
