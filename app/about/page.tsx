import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Trophy, Settings, Hammer } from 'lucide-react';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'Our Story | Jeet Furniture Mart',
  description: 'Learn about our journey from hand-carved heritage swings to modern CNC art and modular living solutions.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-widest text-[#C9A84C] font-sans font-bold">
            Established 1995
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl sm:text-5xl font-display font-light text-[#1C1C1E] mb-12">
          The Story of <span className="font-bold text-[#C9A84C] italic">Jeet Furniture Mart</span>
        </h1>

        {/* Brand Narrative */}
        <div className="bg-white border border-[#E0DDD8] p-8 md:p-12 space-y-8 shadow-sm">
          <div className="prose prose-stone max-w-none text-stone-600 text-sm leading-relaxed font-sans space-y-6">
            <p>
              Founded by master artisans in 1995, Jeet Furniture Mart began as a small woodworking guild specializing in custom teakwood Swings (Jhulas) and traditional family prayer shrines (Mandirs). Our founding principle was simple: <strong>honor the natural grain, construct for generations, and treat design as a form of art.</strong>
            </p>
            <p>
              Over the last three decades, as residential spaces evolved, we expanded our design vocabulary. Today, we bridge two worlds. We preserve ancestral hand-carving methods in our **Spiritual Collection**, while implementing high-precision CNC routers for **Artistic Screens**, and crafting custom modular storage and luxury seating systems under our **Modern Furniture division**.
            </p>
          </div>

          {/* Thin Gold Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent w-full my-8" />

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-50 border border-gold-accent/20 rounded-full flex items-center justify-center text-gold-accent">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#6B1C1C]">Heritage Joinery</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  We use classic mortise-and-tenon joints in our solid wood swing structures. No cheap fasteners, no shortcuts.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center text-stone-700">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-sm font-extrabold uppercase text-[#0A0A0A] tracking-wider">Engineering Precision</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Our modular divisions utilize German machinery and hardware from Hettich and Blum for seamless, lifetime movement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white border border-[#E0DDD8] p-8">
          <h2 className="text-xl font-display font-medium text-[#1C1C1E] mb-2">
            Interested in visiting our workshops?
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
            We love showing patrons how their furniture is built. Send us a message on WhatsApp to schedule a session.
          </p>
          <WhatsAppButton />
        </div>
      </div>
    </div>
  );
}
