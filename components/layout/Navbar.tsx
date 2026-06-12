'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Studio and Admin should not show global navbar
  if (pathname.startsWith('/studio') || pathname.startsWith('/admin')) return null;

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-gold-accent/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
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
                <span className="font-display text-lg font-bold tracking-widest text-[#2E1912] leading-none">
                  JEET
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#C9A84C] font-semibold mt-1">
                  Furniture Mart
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 hover:text-[#C9A84C] relative py-1 group ${
                  isActive(link.href)
                    ? 'text-[#C9A84C]'
                    : 'text-[#2E1912]'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A84C] transition-transform duration-300 origin-left ${
                  isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#2E1912] hover:text-[#C9A84C] focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-gold-accent/20 animate-fade-in">
          <div className="px-2 pt-2 pb-6 space-y-2 sm:px-3 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 text-sm uppercase tracking-widest font-sans font-bold transition-colors ${
                  isActive(link.href)
                    ? 'bg-gold-accent/10 text-[#C9A84C]'
                    : 'text-[#2E1912] hover:bg-stone-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
