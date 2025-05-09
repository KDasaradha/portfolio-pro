"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter, Code, ArrowUpCircle } from 'lucide-react'; // Changed ArrowUp to ArrowUpCircle
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useVersion } from '@/context/version-context'; // Import useVersion
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/KDasaradha', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/k_dasaradh66626', icon: Twitter },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();
  const { version } = useVersion(); // Get current version

  useEffect(() => {
     const ctx = gsap.context(() => {
         gsap.from(footerRef.current, {
            autoAlpha: 0,
            y: 80, // Slightly more offset
            duration: 1.5, // Smoother duration
            ease: 'power3.out',
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top bottom-=80px", // Trigger when footer is 80px from bottom
                toggleActions: "play none none reset", // Reset allows re-animation
            }
         });
     }, footerRef);

     return () => ctx.revert();
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // Determine target based on version for home section
      const homeTarget = version === 'v2' ? '#home-v2' : '#home';
      const targetElement = document.querySelector(homeTarget);

      if (targetElement) {
          gsap.to(window, { duration: 1.8, scrollTo: { y: targetElement, autoKill: false }, ease: 'power4.inOut' });
      } else {
          gsap.to(window, { duration: 1.8, scrollTo: { y: 0, autoKill: false }, ease: 'power4.inOut' });
      }
  };

  const footerClasses = version === 'v2' 
    ? "border-t border-neutral-700/70 bg-neutral-900/70 backdrop-blur-lg text-neutral-400 py-12 md:py-16 mt-24"
    : "border-t border-border bg-background/95 py-10 md:py-12 mt-20 text-muted-foreground";
  
  const linkClasses = version === 'v2'
    ? "text-neutral-400 transition-all duration-300 ease-in-out hover:text-purple-400 hover:scale-125 transform hover:-translate-y-1 group"
    : "text-muted-foreground transition-all duration-300 ease-in-out hover:text-accent hover:scale-125 transform hover:-translate-y-1.5 group";

  const nameTextClasses = version === 'v2' 
    ? "text-base font-medium text-neutral-300"
    : "text-base font-medium";

  const copyrightTextClasses = version === 'v2'
    ? "text-sm text-neutral-500 text-center md:text-left order-last md:order-none"
    : "text-sm text-muted-foreground text-center md:text-left order-last md:order-none";


  return (
    <footer ref={footerRef} className={cn("opacity-0", footerClasses)}> {/* Start with opacity-0 for GSAP */}
      <div className="container flex flex-col items-center justify-between gap-8 md:flex-row px-4 md:px-6 relative">
         <div className="flex items-center gap-2.5">
             <Code className={cn("h-5 w-5", version === 'v2' ? "text-purple-400" : "text-accent")}/>
             <span className={nameTextClasses}>Kesari Dasaradh</span>
         </div>
        <p className={copyrightTextClasses}>
          &copy; {currentYear} Kesari Dasaradh. {version === 'v2' ? "Crafted with Next.js & Tailwind." : "Built with Next.js & Tailwind CSS."}
        </p>
        <div className="flex gap-5 md:gap-6"> {/* Slightly increased gap for V2 */}
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className={linkClasses}
              data-cursor-interactive
            >
              <link.icon className={cn("h-6 w-6 transition-transform duration-300", version === 'v2' ? "group-hover:rotate-[10deg]" : "group-hover:rotate-[-5deg]")} />
            </Link>
          ))}
        </div>
         <Button
             variant="ghost"
             size="icon"
             className={cn(
                "absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-70 hover:opacity-100 transition-opacity duration-300 rounded-full p-2",
                version === 'v2' 
                  ? "text-neutral-400 hover:text-purple-300 hover:bg-purple-500/10" 
                  : "text-muted-foreground hover:text-accent hover:bg-accent/10"
             )}
             onClick={scrollToTop}
             aria-label="Scroll to top"
             data-cursor-interactive
         >
             <ArrowUpCircle className="h-7 w-7" /> {/* Larger icon */}
         </Button>
      </div>
    </footer>
  );
}
