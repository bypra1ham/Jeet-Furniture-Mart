'use client';

import { useEffect, useRef } from 'react';

export default function GlobalViewTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per component mount, and check session storage
    // to avoid incrementing multiple times per user session if they navigate around.
    if (tracked.current) return;
    tracked.current = true;

    const hasTrackedSession = sessionStorage.getItem('global_view_tracked');
    if (!hasTrackedSession) {
      // It's a new session, track the view
      fetch('/api/track-global-view', { method: 'POST' })
        .then(() => {
          sessionStorage.setItem('global_view_tracked', 'true');
        })
        .catch(console.error);
    }
  }, []);

  return null; // Invisible component
}
