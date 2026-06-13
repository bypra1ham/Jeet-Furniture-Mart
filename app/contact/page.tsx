import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata = {
  title: 'Contact Us | Jeet Furniture Mart',
  description: 'Get in touch with Jeet Furniture Mart. Find showroom coordinates in Bardoli, Surat, Gujarat and contact details.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#C9A84C] font-sans font-bold">
            Get in touch
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-light text-[#1C1C1E]">
            Contact <span className="font-bold text-[#C9A84C] italic">Jeet Furniture Mart</span>
          </h1>
          <div className="mt-4 w-12 h-[1px] bg-gold-accent mx-auto" />
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Showroom Details */}
          <div className="bg-white border border-[#E0DDD8] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="w-5 h-5 text-gold-accent" />
                <h2 className="text-lg font-display font-bold text-[#1C1C1E] uppercase tracking-wider">
                  Showroom Location
                </h2>
              </div>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">
                At. NADIDA, & PO. Barasadi,<br />
                Ta. Bardoli, Dist. Surat,<br />
                Gujarat India – 394901
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E0DDD8] text-xs text-stone-400">
              Conveniently located in Bardoli, Surat, Gujarat.
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white border border-[#E0DDD8] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-5 h-5 text-gold-accent" />
                <h2 className="text-lg font-display font-bold text-[#1C1C1E] uppercase tracking-wider">
                  Business Hours
                </h2>
              </div>
              <ul className="text-xs text-stone-500 font-sans space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span className="font-semibold text-[#1C1C1E]">11:00 AM - 06:00 PM</span>
                </li>
                <li className="flex justify-between text-red-700 font-medium">
                  <span>Sunday:</span>
                  <span className="uppercase tracking-widest text-[10px]">Closed (Holiday)</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E0DDD8] text-xs text-stone-400">
              For custom design consultations, please schedule an appointment.
            </div>
          </div>
        </div>

        {/* Quick Contact Form/Action */}
        <div className="bg-[#1C1C1E] text-white border border-gold-accent/40 p-8 md:p-12 text-center shadow-lg">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9A84C] font-semibold">
            Instant Inquiry
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-display text-white">
            Connect Directly with our Designers
          </h2>
          <p className="mt-4 text-xs text-stone-400 max-w-lg mx-auto leading-relaxed mb-8">
            Click the button below to initiate a chat with us on WhatsApp. You can share your design inspirations, dimension requirements, or get price estimations.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 text-xs text-stone-300">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#C9A84C]" />
              <span>+91 78628 00530</span>
            </div>
          </div>

          <div className="mt-10">
            <WhatsAppButton className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
