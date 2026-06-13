'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import WhatsAppButton from '../ui/WhatsAppButton';

export default function HeroSection() {
  const strip1Ref = useRef<HTMLAnchorElement>(null);
  const strip2Ref = useRef<HTMLAnchorElement>(null);
  const strip3Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Parallax only on large screen split layout
      if (window.innerWidth < 1024) {
        if (strip1Ref.current) strip1Ref.current.style.transform = '';
        if (strip2Ref.current) strip2Ref.current.style.transform = '';
        if (strip3Ref.current) strip3Ref.current.style.transform = '';
        return;
      }

      const y = window.scrollY;
      
      // Strip 1: 0.95x speed (moves slower than page scrolling, translate downwards slightly)
      if (strip1Ref.current) {
        strip1Ref.current.style.transform = `translate3d(0, ${y * -0.05}px, 0)`;
      }
      // Strip 2: 1.0x speed (standard scroll, translate stays 0)
      if (strip2Ref.current) {
        strip2Ref.current.style.transform = `translate3d(0, 0px, 0)`;
      }
      // Strip 3: 1.05x speed (moves faster than page scrolling, translate upwards slightly)
      if (strip3Ref.current) {
        strip3Ref.current.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headlineText = "Handcrafted Heritage.";

  return (
    <section id="hero" className="relative bg-[#FAF8F5] border-b border-gold-accent/20 overflow-hidden z-10">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Panel: 55% Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-20 bg-[#FAF8F5] relative overflow-hidden z-10">
          
          {/* Madhubani-style Lotus Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
            <svg className="w-[480px] h-[480px] text-gold-accent opacity-[0.06]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="50" cy="50" r="4" />
              {/* Concentric petal rings */}
              <path d="M 50,46 C 47,38 43,34 50,22 C 57,34 53,38 50,46 Z" />
              <path d="M 50,54 C 47,62 43,66 50,78 C 57,66 53,62 50,54 Z" />
              <path d="M 46,50 C 38,47 34,43 22,50 C 34,57 38,53 46,50 Z" />
              <path d="M 54,50 C 62,47 66,43 78,50 C 66,57 62,53 54,50 Z" />
              {/* Diagonals */}
              <path d="M 47,47 C 40,40 36,36 30,30 C 36,36 40,40 47,47 Z" />
              <path d="M 53,53 C 60,60 64,64 70,70 C 64,64 60,60 53,53 Z" />
              <path d="M 47,53 C 40,60 36,64 30,70 C 36,64 40,60 47,53 Z" />
              <path d="M 53,47 C 60,40 64,36 70,30 C 64,36 60,40 53,47 Z" />
              {/* Outer Layer */}
              <path d="M 50,46 C 45,30 35,26 50,12 C 65,26 55,30 50,46 Z" />
              <path d="M 50,54 C 45,70 35,74 50,88 C 65,74 55,70 50,54 Z" />
              <circle cx="50" cy="50" r="16" strokeDasharray="1,2" />
              <circle cx="50" cy="50" r="28" strokeDasharray="2,3" />
              <path d="M 30,80 Q 50,70 70,80 Q 50,90 30,80 Z" />
            </svg>
          </div>

          {/* Decorative gold line */}
          <div className="absolute top-0 left-6 lg:left-20 w-[1px] h-20 bg-gradient-to-b from-gold-accent to-transparent" />
          
          <div className="max-w-xl space-y-6 pt-8 relative z-10">
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-gold-accent/10 border border-gold-accent/30 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#2E1912]">
                Fine Furniture Masterpieces
              </span>
            </div>

            {/* Core Heading with Staggered Character Reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-[#2E1912] tracking-tight leading-[1.1] select-none">
              {headlineText.split("").map((char, index) => (
                <span
                  key={index}
                  className="reveal-char"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              <br />
              <span 
                className="font-medium text-[#C9A84C] italic reveal-char" 
                style={{ animationDelay: `${headlineText.length * 30}ms` }}
              >
                Modern Precision.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-stone-500 leading-relaxed">
              Jeet Furniture Mart unites three design disciplines under a single shell. Explore our tailored prayer mandir spaces, minimalist modular furniture lines, and custom CNC carving pieces.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#2E1912] bg-[#2E1912] text-white hover:bg-white hover:text-[#2E1912] text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 w-full sm:w-auto"
              >
                Browse Catalog
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <WhatsAppButton className="w-full sm:w-auto" />
            </div>
          </div>
        </div>

        {/* Right Panel: 45% Divided into Three Themed Strips */}
        <div className="w-full lg:w-[45%] flex flex-col border-t lg:border-t-0 lg:border-l border-gold-accent/20 relative z-20 bg-[#FAF8F5]">
          
          {/* Strip 1: Spiritual Zone (#6B1C1C) */}
          <a 
            ref={strip1Ref}
            href="#spiritual"
            className="relative flex-grow flex items-center justify-between py-12 px-8 sm:px-12 bg-[#6B1C1C] text-white overflow-hidden group transition-transform duration-500 ease-out hover:brightness-110"
          >
            {/* Faint SVG Decorative Arch (Animated Pulse) */}
            <svg className="absolute inset-0 w-full h-full text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-105" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 10,100 C 10,15 90,15 90,100" stroke="currentColor" strokeWidth="0.75" fill="none" className="animate-pulse-arch" />
              <path d="M 25,100 C 25,35 75,35 75,100" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1,2" className="animate-pulse-arch" style={{ animationDelay: '0.5s' }} />
            </svg>
            
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#C9A84C]">
                Zone 01
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-light tracking-wide">
                Spiritual Zone
              </h3>
            </div>
            <div className="relative z-10 text-white/55 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
              <ArrowRight className="w-6 h-6" />
            </div>
          </a>

          {/* Strip 2: Modern Zone (#111113) */}
          <a 
            ref={strip2Ref}
            href="#modern"
            className="relative flex-grow flex items-center justify-between py-12 px-8 sm:px-12 bg-[#111113] text-white overflow-hidden group transition-transform duration-500 ease-out hover:brightness-125"
          >
            {/* Faint SVG Decorative Grid Squares */}
            <svg className="absolute inset-0 w-full h-full text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-105" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <line x1="40" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="0.5" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-stone-400">
                Zone 02
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight uppercase">
                Modern Zone
              </h3>
            </div>
            <div className="relative z-10 text-white/55 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
              <ArrowRight className="w-6 h-6" />
            </div>
          </a>

          {/* Strip 3: Artistic Zone (#C4622D) */}
          <a 
            ref={strip3Ref}
            href="#artistic"
            className="relative flex-grow flex items-center justify-between py-12 px-8 sm:px-12 bg-[#C4622D] text-white overflow-hidden group transition-transform duration-500 ease-out hover:brightness-110"
          >
            {/* Concentric Circles SVG (Clockwise Rotations at different speeds) */}
            <svg className="absolute inset-0 w-full h-full text-white/5 pointer-events-none transition-transform duration-700 group-hover:scale-105" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4,4" className="circle-innermost" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="8,8" className="circle-mid-inner" />
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="12,12" className="circle-mid-outer" />
              <circle cx="50" cy="50" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="16,16" className="circle-outermost" />
            </svg>

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#D4A96A]">
                Zone 03
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-light tracking-wide">
                Artistic Zone
              </h3>
            </div>
            <div className="relative z-10 text-white/55 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
              <ArrowRight className="w-6 h-6" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
