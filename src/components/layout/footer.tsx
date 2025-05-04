"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter, Code } from 'lucide-react'; // Added Code
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
         // Subtle fade-in animation when footer enters viewport
         gsap.from(footerRef.current, {
            autoAlpha: 0,
            y: 50, // Slightly increased offset
            duration: 1.0, // Longer duration for smoother effect
            ease: 'power2.out', // Smoother ease
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%", // Trigger slightly earlier
                toggleActions: "play none none none",
            }
         });
     }, footerRef);

     return () => ctx.revert();
  }, []);

  return (
    // Use GSAP's autoAlpha, removed initial opacity-0
    <footer ref={footerRef} className="border-t bg-background py-8 md:py-10"> {/* Increased padding */}
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row px-4 md:px-6">
         {/* Added Logo/Name */}
         <div className="flex items-center gap-2 text-muted-foreground">
             <Code className="h-5 w-5 text-accent"/>
             <span className="text-sm font-medium">Kesari Dasaradh</span>
         </div>
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {currentYear}. Built with Next.js & Tailwind CSS. All rights reserved.
        </p>
        <div className="flex gap-6"> {/* Increased gap */}
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted-foreground transition-all duration-300 ease-in-out hover:text-accent hover:scale-125 transform hover:-translate-y-1" // Enhanced hover effect
              data-cursor-interactive
            >
              <link.icon className="h-6 w-6" /> {/* Slightly larger icon */}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
