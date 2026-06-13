'use client';

import React, { useState, useEffect } from 'react';

export default function FloatingWhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show tooltip after 3 seconds for engagement, then hide after 10 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted) return null;

  const waNumber = process.env.NEXT_PUBLIC_BUSINESS_WA_NUMBER || '917862800530';
  const text = 'Hi, I have a general inquiry about your furniture.';
  const href = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-center select-none pointer-events-auto">
      {/* Tooltip */}
      <div
        className={`bg-white text-[#2E1912] border border-stone-200/80 px-4 py-2 rounded-xl text-[11px] font-sans font-bold shadow-md mr-3 transition-all duration-500 ease-out transform whitespace-nowrap ${
          showTooltip
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <span className="text-[#C9A84C]">Chat with us</span> on WhatsApp!
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-stone-200/80 rotate-[315deg]" />
      </div>

      {/* Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/35 hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-none md:cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none -z-10" />
        
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.419 9.86-9.86.002-2.636-1.023-5.115-2.884-6.978C16.562 1.899 14.09 1.874 11.97 1.872c-5.439 0-9.859 4.417-9.86 9.861-.001 1.77.464 3.497 1.349 5.02L2.43 21.05l4.217-1.105.001-.001zM17.11 14.18c-.282-.141-1.67-.824-1.928-.918-.258-.094-.446-.141-.634.141-.188.281-.727.918-.891 1.109-.164.19-.328.21-.61.07-.281-.141-1.189-.438-2.264-1.396-.837-.747-1.402-1.67-1.566-1.952-.164-.282-.018-.435.122-.575.127-.127.282-.328.423-.492.141-.164.188-.282.282-.47.094-.188.047-.352-.023-.492-.07-.141-.634-1.528-.868-2.09-.228-.549-.46-.474-.634-.482-.164-.008-.352-.01-.54-.01-.188 0-.493.07-.751.352-.258.282-1.01.986-1.01 2.404.002 1.417 1.031 2.788 1.172 2.977.141.188 2.03 3.098 4.918 4.341.687.296 1.224.473 1.64.606.69.219 1.319.188 1.815.114.553-.082 1.67-.682 1.905-1.34.234-.657.234-1.22.164-1.34-.07-.12-.258-.188-.54-.328z" />
        </svg>
      </a>
    </div>
  );
}
