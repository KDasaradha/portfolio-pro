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
      markers: false, // Disable markers permanently
      // You can set other global ScrollTrigger defaults here
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Refresh ScrollTrigger after initial hydration and layout shifts might occur
    const timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
        console.log("ScrollTrigger refreshed after timeout");
    }, 100); // Adjust delay as needed

    return () => {
      // Cleanup GSAP context and ScrollTriggers
      clearTimeout(timeoutId); // Clear the timeout
      contextRef.current?.revert();
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.killAll(); // Kill all ScrollTriggers on unmount
    };
  }, []);

    // Define a utility function to normalize scrollTo parameters
    const normalizeScrollTo = (options: gsap.ScrollToTarget | gsap.ScrollToVars | number | string) => {
        if (typeof options === 'number' || typeof options === 'string') {
            // If it's a number or string, treat it as a simple 'y' value or selector
            return {
                y: options,
                autoKill: true, // Default behavior
                ease: 'power1.inOut', // Default ease
                duration: 1, // Default duration
                overwrite: true
            };
        } else if (typeof options === 'object') {
            // If it's an object, extend it with default options
            return {
                autoKill: true, // Ensure this is set
                ease: 'power1.inOut', // Ensure this is set
                duration: 1, // Ensure this is set
                overwrite: true,
                ...options
            };
        } else {
            // Handle invalid cases or ignore if needed
            console.error("Invalid scrollTo options:", options);
            return {}; // Return a default empty object or throw an error
        }
    };
    gsap.normalizeScrollTo = normalizeScrollTo;
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
