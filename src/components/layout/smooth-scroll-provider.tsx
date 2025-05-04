'use client';

import React, { ReactNode } from 'react';

// Using native CSS smooth scrolling for simplicity and performance.
// Add `scroll-behavior: smooth;` to the `html` element in globals.css

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // If you wanted to use a library like Lenis, you would initialize and manage it here.
  // Example with Lenis (requires installation: npm install @studio-freight/lenis):
  /*
  import Lenis from '@studio-freight/lenis';
  import { useEffect, useRef } from 'react';

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup on unmount
    };
  }, []);
  */

  // For native smooth scrolling, this provider doesn't need to do much,
  // but it provides a place to potentially add more complex scroll logic later.
  return <>{children}</>;
}
