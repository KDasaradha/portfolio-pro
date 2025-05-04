'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Check for touch device
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice.current || !cursorRef.current || !followerRef.current) {
      // Hide cursor on touch devices or if refs are not available
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (followerRef.current) followerRef.current.style.display = 'none';
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Initial hide until first move
    gsap.set([cursor, follower], { autoAlpha: 0 });

    const onMouseMove = (e: MouseEvent) => {
      // Show cursor on first move
      if (gsap.getProperty(cursor, 'autoAlpha') === 0) {
        gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.1 });
      }
      gsap.to(cursor, { duration: 0.1, x: e.clientX, y: e.clientY });
      gsap.to(follower, { duration: 0.6, x: e.clientX, y: e.clientY, ease: 'power2.out' });
    };

    const onMouseEnter = () => {
      gsap.to(follower, { scale: 1.5, duration: 0.3 });
      gsap.to(cursor, { scale: 0.5, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(follower, { scale: 1, duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(follower, { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(follower, { scale: 1.5, duration: 0.2 }); // Return to hover scale
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"], [data-cursor-interactive]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      // Ensure cursor is hidden on cleanup if it was never shown
      gsap.set([cursor, follower], { autoAlpha: 0 });
    };
  }, []);

  // Base styles - will be controlled by GSAP
  const baseCursorStyle = "fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block";

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(baseCursorStyle, "w-2 h-2 bg-accent")}
        style={{ transform: 'translate(-50%, -50%)' }} // Center the cursor dot
      />
      <div
        ref={followerRef}
        className={cn(baseCursorStyle, "w-8 h-8 border-2 border-accent transition-transform duration-300")}
        style={{ transform: 'translate(-50%, -50%)' }} // Center the follower
      />
    </>
  );
};

export default CustomCursor;
