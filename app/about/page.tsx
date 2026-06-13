import React from 'react';
import { Sparkles, Trophy, Settings, Hammer, Globe, Heart } from 'lucide-react';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'Our Story | Jeet Furniture Mart',
  description: 'Celebrating 35+ years since 1989, serving patrons across all 50 states of USA, India, and 20+ countries with premium custom woodwork, Korean Mandirs, and CNC design.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumbs / Est. */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A84C] font-sans font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Happily Serving Since 1989
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl sm:text-5xl font-display font-light text-[#1C1C1E] mb-12">
          The Legacy of <span className="font-bold text-[#C9A84C] italic">Jeet Furniture Mart</span>
        </h1>

        {/* Milestone Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { value: '35+', label: 'Years of Legacy', desc: 'Crafting fine furniture since 1989' },
            { value: '20+', label: 'Countries Reached', desc: 'USA, UK, Australia, France, NZ & more' },
            { value: '50/50', label: 'US States Served', desc: 'Bespoke delivery to all 50 US states' },
            { value: 'Pan-India', label: 'Presence', desc: 'Reaching homes in nearly every state' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-[#E0DDD8] p-5 rounded-xl text-center shadow-xs hover:border-[#C9A84C] transition-all duration-300 group">
              <div className="text-2xl sm:text-3xl font-display font-bold text-[#C9A84C] group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-[9px] uppercase tracking-wider font-sans font-bold text-[#2E1912] mt-2">
                {stat.label}
              </div>
              <div className="text-[9px] text-stone-500 mt-1 leading-relaxed">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Brand Narrative */}
        <div className="bg-white border border-[#E0DDD8] p-8 md:p-12 space-y-10 shadow-xs rounded-xl">
          <div className="prose prose-stone max-w-none text-stone-600 text-sm leading-relaxed font-sans space-y-6">
            <p>
              Since <strong>1989</strong>, Jeet Furniture Mart has stood as a hallmark of bespoke luxury and woodwork. Completing <strong>35 years of craft excellence</strong>, we have grown from a dedicated local workshop specializing in handcrafted solid wood Swings (Jhulas) and family Mandirs into a global design studio turning customer imaginations into physical reality.
            </p>
            <p>
              Over the decades, we have acquired an incredibly diverse and loyal customer base. Today, our custom creations travel to <strong>nearly every state in India</strong> and across <strong>20+ countries worldwide</strong>. We reached a monumental milestone by delivering bespoke furniture and shrines to <strong>all 50 states of the USA</strong>, as well as Australia, New Zealand, England, and France. 
            </p>
            <p>
              Every milestone is a testament to our unwavering loyalty to our patrons. We believe that furniture is not just functional; it is a legacy piece that holds character, warmth, and devotion.
            </p>
          </div>

          {/* Thin Gold Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent w-full my-8" />

          {/* Pillars Section */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-[#2E1912] tracking-wide text-center">
              Our Core Design &amp; Craft Pillars
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              {/* Pillar 1: Material */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-50 border border-gold-accent/20 rounded-full flex items-center justify-center text-gold-accent">
                  <Hammer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#6B1C1C]">Pure Timbers Only</h3>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                    We use only premium, authentic hardwoods selected for longevity and grain character. From seasoned <strong>Sagwan (Teakwood)</strong> to sacred <strong>Sevan Wood</strong>, every structure is constructed according to our customer’s exact choice with traditional joinery.
                  </p>
                </div>
              </div>

              {/* Pillar 2: CNC */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center text-stone-700">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase font-extrabold tracking-wider text-[#0A0A0A]">Precision CNC Carving</h3>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                    By merging ancient artisan carving skills with state-of-the-art <strong>digital CNC engraving technology</strong>, we achieve pristine, high-accuracy 2D jali screens and intricate 3D bas-relief panels that add digital precision to natural wood.
                  </p>
                </div>
              </div>

              {/* Pillar 3: New Materials */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-50 border border-orange-200 rounded-full flex items-center justify-center text-[#E8871A]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#6B1C1C]">Korean Mandirs &amp; Idols</h3>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                    Expanding our spiritual lineup, we have stepped into high-grade <strong>Korean Acrylic Mandirs</strong> and <strong>Marble Idols</strong>. Offering backlighting, seamless structures, and pristine stonework, this modern range has received overwhelming response worldwide.
                  </p>
                </div>
              </div>

              {/* Pillar 4: Customer Loyalty */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center text-rose-600">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase font-extrabold tracking-wider text-[#0A0A0A]">Globally Shipped Imagination</h3>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                    We turn your unique ideas, sketches, and dimensional layouts into physical masterworks. From initial layout design to secure international packing, your imagination is brought to life and delivered safely.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white border border-[#E0DDD8] p-8 rounded-xl shadow-xs">
          <h2 className="text-xl font-display font-medium text-[#1C1C1E] mb-2">
            Interested in visiting our workshops?
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
            We love showing patrons how their furniture is built. Send us a message on WhatsApp to discuss your custom project or schedule a workshop walkthrough.
          </p>
          <WhatsAppButton />
        </div>
      </div>
    </div>
  );
}
