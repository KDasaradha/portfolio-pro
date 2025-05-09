"use client";

import Link from 'next/link';
import { Github, Linkedin, Twitter, Code, ArrowUpCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useVersion } from '@/context/version-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; 

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/KDasaradha', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/k_dasaradh66626', icon: Twitter },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();
  const { version } = useVersion();

  useEffect(() => {
     const ctx = gsap.context(() => {
         gsap.from(footerRef.current, {
            autoAlpha: 0,
            y: 100, 
            duration: 1.8, 
            ease: 'expo.out', 
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top bottom-=100px", 
                toggleActions: "play none none reset", 
            }
         });
     }, footerRef);

     return () => ctx.revert();
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const homeTarget = version === 'v2' ? '#home-v2' : '#home';
      const targetElement = document.querySelector(homeTarget);

      if (targetElement) {
          gsap.to(window, { duration: 2, scrollTo: { y: targetElement, autoKill: false }, ease: 'power4.inOut' }); 
      } else {
          gsap.to(window, { duration: 2, scrollTo: { y: 0, autoKill: false }, ease: 'power4.inOut' });
      }
  };

  const footerClasses = version === 'v2' 
    ? "border-t border-neutral-700/70 bg-gradient-to-b from-neutral-900/80 to-black/90 backdrop-blur-xl text-neutral-400 py-12 md:py-16 mt-24 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.2)]"
    : "border-t border-border bg-background/95 backdrop-blur-md py-10 md:py-12 mt-20 text-muted-foreground shadow-lg";
  
  const linkClasses = version === 'v2'
    ? "text-neutral-400 transition-all duration-300 ease-in-out hover:text-purple-400 hover:scale-125 transform hover:-translate-y-1 group relative"
    : "text-muted-foreground transition-all duration-300 ease-in-out hover:text-accent hover:scale-125 transform hover:-translate-y-1.5 group relative";

  const nameTextClasses = version === 'v2' 
    ? "text-base font-semibold text-neutral-200 tracking-wide"
    : "text-base font-medium";

  const copyrightTextClasses = version === 'v2'
    ? "text-xs text-neutral-500 text-center md:text-left order-last md:order-none tracking-wider"
    : "text-sm text-muted-foreground text-center md:text-left order-last md:order-none";


  return (
    <footer ref={footerRef} className={cn("opacity-0", footerClasses)}>
      <div className="container flex flex-col items-center justify-between gap-8 md:flex-row px-4 md:px-6 relative">
         <div className="flex items-center gap-3"> 
             <Code className={cn("h-6 w-6", version === 'v2' ? "text-purple-400 animate-pulse" : "text-accent")} /> 
             <span className={nameTextClasses}>Kesari Dasaradh</span>
         </div>
        <p className={copyrightTextClasses}>
          &copy; {currentYear} Kesari Dasaradh. {version === 'v2' ? "Forged with Next.js & Tailwind." : "Built with Next.js & Tailwind CSS."}
        </p>
        <div className="flex gap-6 md:gap-7"> 
          {(socialLinks || []).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className={linkClasses}
              data-cursor-interactive
            >
              <link.icon className={cn("h-6 w-6 transition-transform duration-300", version === 'v2' ? "group-hover:rotate-[12deg]" : "group-hover:rotate-[-8deg]")} />
              {version === 'v2' && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>}
            </Link>
          ))}
        </div>
         <Button
             variant="ghost"
             size="icon"
             className={cn(
                "absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-60 hover:opacity-100 transition-all duration-300 rounded-full p-2.5", 
                version === 'v2' 
                  ? "text-neutral-400 hover:text-purple-300 hover:bg-purple-500/15 hover:scale-110 active:scale-100" 
                  : "text-muted-foreground hover:text-accent hover:bg-accent/10 hover:scale-110 active:scale-100"
             )}
             onClick={scrollToTop}
             aria-label="Scroll to top"
             data-cursor-interactive
         >
             <ArrowUpCircle className="h-7 w-7" />
         </Button>
      </div>
    </footer>
  );
}
