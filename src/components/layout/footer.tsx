"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/KDasaradha', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/k_dasaradh66626', icon: Twitter },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
     const ctx = gsap.context(() => {
         // Simple fade-in animation when footer enters viewport
         gsap.from(footerRef.current, {
            autoAlpha: 0, // Use autoAlpha for opacity and visibility
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 98%", // Trigger animation when bottom of viewport hits near footer top
                toggleActions: "play none none none",
                 // markers: process.env.NODE_ENV === 'development', // Add markers for debugging
            }
         });
     }, footerRef);

     return () => ctx.revert();
  }, []);

  return (
    // Removed opacity-0, GSAP handles initial state
    <footer ref={footerRef} className="border-t bg-background py-8">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Kesari Dasaradh. All rights reserved.
        </p>
        <div className="flex gap-5">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted-foreground transition-all duration-300 hover:text-accent hover:scale-110 transform"
              data-cursor-interactive
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
