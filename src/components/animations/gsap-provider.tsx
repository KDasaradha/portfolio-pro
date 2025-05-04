'use client';

import { createContext, useRef, useLayoutEffect, type ReactNode, useContext } from 'react'; // Added useContext
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create a context for GSAP
export const GsapContext = createContext<typeof gsap | null>(null); // Use typeof gsap

interface GsapProviderProps {
  children: ReactNode;
}

export function GsapProvider({ children }: GsapProviderProps) {
  const contextRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    // Create a GSAP context for cleanup
    contextRef.current = gsap.context(() => {});

    // Enable ScrollTrigger - important for scroll-based animations
    ScrollTrigger.defaults({
      // markers: process.env.NODE_ENV === 'development', // Show markers only in development
      markers: false, // Disable markers by default for production builds
      // You can set other global ScrollTrigger defaults here
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup GSAP context and ScrollTriggers
      contextRef.current?.revert();
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.killAll(); // Kill all ScrollTriggers on unmount
    };
  }, []);

  return (
    <GsapContext.Provider value={gsap}>
        {children}
    </GsapContext.Provider>
  );
}

// Optional: Custom hook to use the GSAP context
export const useGsap = () => {
  const context = useContext(GsapContext); // Use useContext from React
  if (!context) {
    throw new Error("useGsap must be used within a GsapProvider");
  }
  return context;
};
