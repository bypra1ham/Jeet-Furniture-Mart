'use client';

import { useEffect, useRef } from 'react';

interface ViewTrackerProps {
  productId: string;
}

export default function ViewTracker({ productId }: ViewTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    // Prevent double tracking in React 18/19 strict mode in development
    if (tracked.current) return;
    tracked.current = true;

    const trackView = async () => {
      try {
        await fetch(`/api/track-view?id=${productId}`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Failed to log product page view:', error);
      }
    };

    trackView();
  }, [productId]);

  return null;
}
