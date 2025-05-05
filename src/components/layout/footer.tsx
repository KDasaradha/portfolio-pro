"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter, Code, ArrowUp } from 'lucide-react'; // Added ArrowUp
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
         // Subtle fade-in animation
         gsap.from(footerRef.current, {
            autoAlpha: 0,
            y: 60, // Increased offset
            duration: 1.2, // Smoother duration
            ease: 'power3.out',
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top bottom-=50px", // Trigger when footer is 50px from bottom
                toggleActions: "play none none none",
            }
         });
     }, footerRef);

     return () => ctx.revert();
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      gsap.to(window, { duration: 1.5, scrollTo: { y: 0, autoKill: false }, ease: 'power3.inOut' });
  };

  return (
    <footer ref={footerRef} className="border-t bg-background/95 py-10 md:py-12 mt-20"> {/* Increased padding & margin */}
      <div className="container flex flex-col items-center justify-between gap-8 md:flex-row px-4 md:px-6 relative"> {/* Increased gap */}
         {/* Logo/Name */}
         <div className="flex items-center gap-2.5 text-muted-foreground">
             <Code className="h-5 w-5 text-accent"/>
             <span className="text-base font-medium">Kesari Dasaradh</span>
         </div>
        {/* Copyright - Centered on mobile, left on desktop */}
        <p className="text-sm text-muted-foreground text-center md:text-left order-last md:order-none">
          &copy; {currentYear} Kesari Dasaradh. Built with Next.js & Tailwind CSS.
        </p>
        {/* Social Links */}
        <div className="flex gap-5"> {/* Adjusted gap */}
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted-foreground transition-all duration-300 ease-in-out hover:text-accent hover:scale-125 transform hover:-translate-y-1.5 group" // Enhanced hover effect
              data-cursor-interactive
            >
              <link.icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-[-5deg]" /> {/* Subtle rotate on hover */}
            </Link>
          ))}
        </div>
         {/* Scroll to Top Button (optional, appears on scroll down) */}
         {/* <Button
             variant="outline"
             size="icon"
             className="absolute bottom-8 right-8 hidden md:flex opacity-0 transition-opacity duration-300 border-primary/50 hover:border-accent hover:bg-accent/10 group" // Style as needed
             onClick={scrollToTop}
             aria-label="Scroll to top"
             data-cursor-interactive
             ref={scrollToTopButtonRef} // Ref for GSAP animation
         >
             <ArrowUp className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
         </Button> */}
      </div>
    </footer>
  );
}

// Add GSAP logic for scroll-to-top button visibility if implementing
/*
  const scrollToTopButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
      // ... existing footer animation ...

      // Scroll to top button visibility
      const showButton = () => gsap.to(scrollToTopButtonRef.current, { autoAlpha: 1, duration: 0.3 });
      const hideButton = () => gsap.to(scrollToTopButtonRef.current, { autoAlpha: 0, duration: 0.3 });

      ScrollTrigger.create({
          start: "top top-=-200", // Show after scrolling down 200px
          end: 99999,
          onEnter: showButton,
          onLeaveBack: hideButton,
      });

  }, []);
*/
