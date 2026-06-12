'use client';

import React from 'react';

export function SpiritualToModernDivider() {
  return (
    <div className="w-full h-[60px] bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center pointer-events-none select-none">
      <svg className="w-full h-full text-[#C9A84C]" viewBox="0 0 1000 60" preserveAspectRatio="none">
        <defs>
          <g id="bell-shape">
            {/* Hanging chain */}
            <line x1="0" y1="0" x2="0" y2="22" stroke="currentColor" strokeWidth="1.2" />
            {/* Bell dome */}
            <path d="M -8,22 C -8,22 -11,35 -11,40 C -11,44 11,44 11,40 C 11,35 8,22 8,22 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            {/* Clapper */}
            <circle cx="0" cy="43" r="1.5" fill="currentColor" />
          </g>
        </defs>
        {/* Render 11 bells horizontally */}
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 100}, 0)`}>
            <g
              className="animate-sway-bell"
              style={{
                transformOrigin: '0px 0px',
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <use href="#bell-shape" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ModernToArtisticDivider() {
  return (
    <div className="w-full h-[60px] relative overflow-hidden bg-[#1A0F0A] pointer-events-none select-none">
      {/* Sawtooth edge going from charcoal (#0A0A0A) into Artistic (#1A0F0A) */}
      <svg className="w-full h-full text-[#0A0A0A] bg-[#1A0F0A]" viewBox="0 0 1000 60" preserveAspectRatio="none">
        <path
          d="M 0,0 
             L 50,40 L 100,0 L 150,40 L 200,0 L 250,40 L 300,0 L 350,40 L 400,0 L 450,40 L 500,0 L 550,40 L 600,0 L 650,40 L 700,0 L 750,40 L 800,0 L 850,40 L 900,0 L 950,40 L 1000,0 
             L 1000,60 L 0,60 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function FooterEntryDivider() {
  return (
    <div className="w-full py-8 bg-[#FAF8F5] flex justify-center items-center relative overflow-hidden select-none pointer-events-none">
      <svg className="w-20 h-20 text-[#C9A84C] opacity-35" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        {/* Peacock feather eye motif centered */}
        {/* Stem */}
        <path d="M 50,100 C 50,85 50,70 50,55" strokeWidth="1.5" />
        {/* Outer feather outline */}
        <path d="M 50,55 C 20,35 20,5 50,15 C 80,5 80,35 50,55 Z" strokeWidth="1.5" strokeLinecap="round" />
        {/* Concentric rings */}
        <path d="M 50,45 C 32,30 32,18 50,23 C 68,18 68,30 50,45 Z" strokeWidth="1" strokeLinecap="round" />
        <circle cx="50" cy="30" r="7" strokeWidth="1.2" />
        {/* Artistic feather barbs */}
        <path d="M 32,25 Q 15,22 5,12" strokeWidth="0.75" />
        <path d="M 68,25 Q 85,22 95,12" strokeWidth="0.75" />
        <path d="M 35,38 Q 20,38 8,28" strokeWidth="0.75" />
        <path d="M 65,38 Q 80,38 92,28" strokeWidth="0.75" />
      </svg>
    </div>
  );
}
