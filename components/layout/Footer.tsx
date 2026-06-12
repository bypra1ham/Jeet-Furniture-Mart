'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FooterEntryDivider } from '../ui/TransitionDivider';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on Studio page
  if (pathname.startsWith('/studio')) return null;

  return (
    <>
      <FooterEntryDivider />
      <footer className="bg-[#1C1C1E] text-white border-t border-gold-accent/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gold-accent/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/logo.jpeg"
                  alt="Jeet Furniture Mart Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold tracking-widest text-white leading-none">
                  JEET
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#C9A84C] font-semibold mt-1">
                  Furniture Mart
                </span>
              </div>
            </Link>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Handcrafting premium wooden swing systems, custom designer temple shrines (Mandirs), contemporary modular solutions, and detailed architectural CNC carvings since 1995.
            </p>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-4">
              Our Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/categories#spiritual" className="hover:text-white transition-colors">
                  Jhulas & Mandirs (Spiritual)
                </Link>
              </li>
              <li>
                <Link href="/categories#modern" className="hover:text-white transition-colors">
                  Modular Furniture (Modern)
                </Link>
              </li>
              <li>
                <Link href="/categories#artistic" className="hover:text-white transition-colors">
                  CNC Carvings (Artistic)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white transition-colors" target="_blank">
                  Sanity Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-4">
              Showroom
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="leading-relaxed">
                12, Furniture Block, Kirti Nagar Industrial Area, New Delhi, India - 110015
              </li>
              <li>
                <span className="font-bold text-white">Inquiries:</span> +91 98765 43210
              </li>
              <li>
                <span className="font-bold text-white">Email:</span> contact@jeetfurniture.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Jeet Furniture Mart. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/admin/analytics" className="hover:text-white transition-colors">
              Admin Analytics
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  </>
  );
}
