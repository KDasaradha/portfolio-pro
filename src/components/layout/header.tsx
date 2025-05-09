// src/components/layout/header.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Moon, Sun, Settings2 as LogoIcon, X as CloseIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import VersionToggle from './version-toggle';
import { useVersion } from '@/context/version-context';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

const navItemsBase = [
  { name: 'About', hrefBase: '#about' },
  { name: 'Projects', hrefBase: '#projects' },
  { name: 'Skills', hrefBase: '#skills' },
  { name: 'Summary', hrefBase: '#ai-summarizer' },
  { name: 'Contact', hrefBase: '#contact' },
];

const navItemsV1 = [
  { name: 'Home', href: '#home' },
  ...navItemsBase.map(item => ({ ...item, href: item.hrefBase }))
];

const navItemsV2 = [
  { name: 'Intro', href: '#home-v2' },
  ...navItemsBase.map(item => ({ ...item, name: item.name === 'Summary' ? 'AI Assist' : (item.name === 'Contact' ? 'Reach Out' : item.name), href: `${item.hrefBase}-v2` }))
];


export default function Header() {
  const { theme, setTheme } = useTheme();
  const { version } = useVersion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  
  const currentNavItems = version === 'v2' ? navItemsV2 : navItemsV1;
  const homeHref = version === 'v2' ? '#home-v2' : '#home';

  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerElement,
        { yPercent: -110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
      );

      ScrollTrigger.create({
        start: 'top top-=60px', 
        end: 99999,
        onUpdate: (self) => {
            const isScrolled = self.scroll() > 50;
            if (isScrolled) {
                 headerElement.classList.add('is-scrolled', 'shadow-xl', 'bg-background/90', 'dark:bg-neutral-900/90', 'backdrop-blur-xl', 'border-border/30', 'dark:border-neutral-700/50');
                 headerElement.classList.remove('border-transparent', 'bg-transparent');
            } else {
                 headerElement.classList.remove('is-scrolled', 'shadow-xl', 'bg-background/90', 'dark:bg-neutral-900/90', 'backdrop-blur-xl', 'border-border/30', 'dark:border-neutral-700/50');
                 headerElement.classList.add('border-transparent', 'bg-transparent');
            }
        },
      });
      
      const sections = currentNavItems.map(item => document.querySelector(item.href)).filter(Boolean) as HTMLElement[];

      function updateActiveLink() {
        let currentSectionId = version === 'v2' ? '#home-v2' : '#home';
        const headerHeight = headerElement?.offsetHeight ?? 70;
        const threshold = window.innerHeight * 0.4; 

        for (const section of sections) {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < threshold && section.getBoundingClientRect().bottom > headerHeight) {
              currentSectionId = `#${section.id}`;
              break; 
            }
        }
        setActiveHash(currentSectionId);
      }

      window.addEventListener('scroll', updateActiveLink, { passive: true });
      updateActiveLink(); 

      return () => window.removeEventListener('scroll', updateActiveLink);

    }, headerRef);

    return () => ctx.revert();
  }, [currentNavItems, version]);


  useEffect(() => {
    const activeLinkIndex = currentNavItems.findIndex(item => item.href === activeHash);
    const activeLinkElement = navLinksRef.current[activeLinkIndex];
    const indicator = indicatorRef.current;

    if (activeLinkElement && indicator && activeLinkElement.offsetParent !== null) {
      const navElement = activeLinkElement.closest('nav');
      if (navElement) {
        const linkRect = activeLinkElement.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();
        
        gsap.to(indicator, {
          x: linkRect.left - navRect.left + (linkRect.width / 2), 
          width: linkRect.width * 0.7, 
          opacity: 1,
          duration: 0.45,
          ease: 'expo.out',
        });
      }
    } else if (indicator) {
         gsap.to(indicator, { width: 0, opacity: 0, duration: 0.35, ease: 'expo.out' });
    }
  }, [activeHash, currentNavItems]);


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); 

    if (href.startsWith('#')) {
      const targetElement = document.querySelector<HTMLElement>(href);
      if (targetElement) {
        const headerOffset = (headerRef.current?.offsetHeight || 70) + (version === 'v2' ? 30 : 20);
        
        gsap.to(window, {
          scrollTo: { y: targetElement, offsetY: headerOffset, autoKill:true },
          duration: 1.6, 
          ease: 'power3.inOut',
        });
        
        if (history.pushState) {
           history.pushState(null, null, href);
        } else {
           window.location.hash = href;
        }
        setActiveHash(href); 
      }
    } else if (href.startsWith('/')) {
       window.location.href = href;
    }
  };
  
  const headerBaseClasses = "fixed top-0 left-0 z-[100] w-full transition-all duration-300 ease-in-out";
  const headerInitialClasses = "border-b border-transparent bg-transparent";

  return (
    <header
      ref={headerRef}
      className={cn(headerBaseClasses, headerInitialClasses)}
    >
      <div className="container mx-auto flex h-16 md:h-[72px] items-center justify-between px-4 sm:px-6 relative">
        <Link href={homeHref} className="flex items-center gap-2.5 group shrink-0" aria-label="Portfolio Pro Home" onClick={(e) => handleLinkClick(e, homeHref)}>
           <LogoIcon className={cn(
               "h-7 w-7 md:h-8 md:w-8 transition-all duration-700 ease-out group-hover:rotate-[50deg] group-hover:scale-110",
               version === 'v2' ? "text-purple-400" : "text-accent"
            )} />
          <span className={cn(
              "font-black text-xl md:text-2xl tracking-tight transition-opacity duration-300 group-hover:opacity-90",
              version === 'v2' ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400" : "gradient-text"
            )}
          >
            PortfolioPro
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-grow relative mx-4">
          {currentNavItems.map((item, index) => (
            <Link
              key={`${item.name}-${version}`}
              ref={(el) => navLinksRef.current[index] = el}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={cn(
                "relative px-3.5 lg:px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out group/navlink rounded-md",
                activeHash === item.href 
                  ? (version === 'v2' ? 'text-purple-300 scale-105 font-semibold' : 'text-accent scale-105 font-semibold')
                  : (version === 'v2' ? 'text-neutral-400 hover:text-purple-300 hover:bg-neutral-700/50' : 'text-muted-foreground hover:text-accent hover:bg-accent/10'),
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
              data-cursor-interactive
             >
              {item.name}
            </Link>
          ))}
          <span
            ref={indicatorRef}
            className={cn(
                "absolute bottom-[6px] left-0 h-[2.5px] rounded-full transform -translate-x-1/2 opacity-0",
                version === 'v2' ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-accent to-primary/80"
            )}
            style={{ width: 0 }} 
          />
        </nav>

        {/* Right side controls & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <VersionToggle /> 
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={cn(
                "transition-all duration-300 ease-in-out hover:scale-125 hover:rotate-[22deg] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-full w-9 h-9 md:w-10 md:h-10",
                version === 'v2' ? "text-neutral-400 hover:text-purple-300" : "hover:text-accent"
            )}
            data-cursor-interactive
          >
            <Sun className="h-[1.1rem] w-[1.1rem] md:h-5 md:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] md:h-5 md:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle menu" data-cursor-interactive 
                    className={cn(
                        "transition-transform duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring rounded-full w-9 h-9",
                         version === 'v2' ? "text-neutral-400 hover:text-purple-300" : "hover:text-accent"
                    )}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent 
                    side="right" 
                    className={cn(
                        "w-[280px] p-6 border-l shadow-2xl",
                        version === 'v2' ? "bg-neutral-800/95 border-neutral-700 text-neutral-200 backdrop-blur-lg" : "bg-background/90 border-border backdrop-blur-lg"
                    )}
                >
                   <div className="flex items-center justify-between mb-10">
                       <Link href={homeHref} className="flex items-center gap-2" aria-label="Portfolio Pro Home" onClick={() => setIsMobileMenuOpen(false)}>
                         <LogoIcon className={cn("h-6 w-6", version === 'v2' ? "text-purple-400" : "text-accent")} />
                         <span className={cn("font-bold text-lg", version === 'v2' ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400" : "gradient-text")}>PortfolioPro</span>
                       </Link>
                       <SheetClose asChild>
                           <Button variant="ghost" size="icon" className={cn("rounded-full focus-visible:ring-2 focus-visible:ring-ring", version === 'v2' ? "text-neutral-400 hover:text-purple-300" : "text-muted-foreground hover:text-accent")}>
                               <CloseIcon className="h-5 w-5" />
                           </Button>
                       </SheetClose>
                   </div>
                  <nav className="flex flex-col space-y-2.5">
                    {currentNavItems.map((item) => (
                      <SheetClose key={`${item.name}-mobile-${version}`} asChild>
                        <Link
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className={cn(
                            "text-base font-medium transition-all duration-200 ease-in-out py-3 rounded-lg px-3.5 -mx-2 block", 
                            activeHash === item.href 
                                ? (version === 'v2' ? 'bg-purple-500/20 text-purple-300 font-semibold shadow-inner' : 'bg-accent/20 text-accent font-semibold shadow-inner')
                                : (version === 'v2' ? 'text-neutral-300 hover:text-purple-300 hover:bg-neutral-700/60' : 'text-foreground hover:text-accent hover:bg-accent/15')
                          )}
                          data-cursor-interactive
                         >
                           <span className="pl-1">{item.name}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <style jsx>{`
        .is-scrolled {
          /* Example: border-bottom-color: hsl(var(--border)); */
        }
        .gradient-text { /* For V1 */
          background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .dark .gradient-text {
           background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)));
        }
      `}</style>
    </header>
  );
}
