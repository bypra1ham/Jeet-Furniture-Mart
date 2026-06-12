import React from 'react';

export default function BackgroundDriftOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04] overflow-hidden">
      <svg className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%] animate-drift" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonal-drift-lines" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="40" x2="40" y2="0" stroke="#2E1912" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal-drift-lines)" />
      </svg>
    </div>
  );
}
