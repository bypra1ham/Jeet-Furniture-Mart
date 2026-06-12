'use client';

import React from 'react';

interface WhatsAppButtonProps {
  productId?: string;
  productName?: string;
  category?: string;
  themeZone?: 'spiritual' | 'modern' | 'artistic';
  className?: string;
}

export default function WhatsAppButton({
  productId,
  productName,
  category,
  themeZone = 'modern',
  className = '',
}: WhatsAppButtonProps) {
  const isProductInquiry = !!productId && !!productName;
  const [currentUrl, setCurrentUrl] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const trackClickAndOpen = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Background tracking
    try {
      fetch('/api/track-wa-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId || 'general',
          productName: productName || 'General Inquiry',
          category: category || 'general',
        }),
      });
    } catch (err) {
      console.error('Error tracking WhatsApp click:', err);
    }
  };

  // Build the message
  const waNumber = process.env.NEXT_PUBLIC_BUSINESS_WA_NUMBER || '919876543210';
  
  let text = 'Hi, I have a general inquiry about your furniture.';
  if (isProductInquiry) {
    text = `Hi, I'm interested in ${productName}.\nHere is the product page: ${currentUrl}\nProduct ID: ${productId}`;
  }

  const encodedText = encodeURIComponent(text);
  const href = `https://wa.me/${waNumber}?text=${encodedText}`;

  // Theme-specific classes
  const getThemeStyles = () => {
    switch (themeZone) {
      case 'spiritual':
        return 'bg-brand-text hover:bg-brand-accent text-white font-display border border-brand-border rounded-lg shadow-md transition-all duration-300';
      case 'artistic':
        return 'bg-[#C4622D] hover:bg-[#6B7C4E] text-[#F5EFE6] font-display rounded-md shadow-sm transition-colors duration-300';
      case 'modern':
      default:
        return 'bg-[#0A0A0A] hover:bg-[#1C1C1E] text-white uppercase tracking-wider text-xs font-sans rounded-none font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 border border-[#0A0A0A]';
    }
  };

  const label = isProductInquiry ? 'Inquire on WhatsApp' : 'Contact Us on WhatsApp';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClickAndOpen}
      className={`inline-flex items-center justify-center px-6 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent ${getThemeStyles()} ${className}`}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.419 9.86-9.86.002-2.636-1.023-5.115-2.884-6.978C16.562 1.899 14.09 1.874 11.97 1.872c-5.439 0-9.859 4.417-9.86 9.861-.001 1.77.464 3.497 1.349 5.02L2.43 21.05l4.217-1.105.001-.001zM17.11 14.18c-.282-.141-1.67-.824-1.928-.918-.258-.094-.446-.141-.634.141-.188.281-.727.918-.891 1.109-.164.19-.328.21-.61.07-.281-.141-1.189-.438-2.264-1.396-.837-.747-1.402-1.67-1.566-1.952-.164-.282-.018-.435.122-.575.127-.127.282-.328.423-.492.141-.164.188-.282.282-.47.094-.188.047-.352-.023-.492-.07-.141-.634-1.528-.868-2.09-.228-.549-.46-.474-.634-.482-.164-.008-.352-.01-.54-.01-.188 0-.493.07-.751.352-.258.282-1.01.986-1.01 2.404.002 1.417 1.031 2.788 1.172 2.977.141.188 2.03 3.098 4.918 4.341.687.296 1.224.473 1.64.606.69.219 1.319.188 1.815.114.553-.082 1.67-.682 1.905-1.34.234-.657.234-1.22.164-1.34-.07-.12-.258-.188-.54-.328z" />
      </svg>
      {label}
    </a>
  );
}
