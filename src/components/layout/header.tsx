'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Moon, Sun, Code, X as CloseIcon, Settings2 } from 'lucide-react'; // Changed Code to Settings2 for logo
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import VersionToggle from './version-toggle';
import { useVersion } from '@/context/version-context'; // Import useVersion

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
  { name: 'Intro', href: '#home-v2' }, // V2 specific home
  ...navItemsBase.map(item => ({ ...item, name: item.name === 'Summary' ? 'AI Assist' : (item.name === 'Contact' ? 'Reach Out' : item.name), href: `${item.hrefBase}-v2` }))
];


export default function Header() {
  const { theme, setTheme } = useTheme();
  const { version } = useVersion(); // Get current version
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
        { yPercent: -120, autoAlpha: 0 }, // Start further up
        { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', delay: 0.6 } // Smoother ease and longer duration
      );

      ScrollTrigger.create({
        start: 'top+=50 top', // Trigger slightly later
        end: 99999,
        toggleClass: { targets: headerElement, className: "is-scrolled" }, // Use a class for scrolled state
        onEnter: () => headerElement.classList.add('shadow-xl', 'bg-background/90', 'backdrop-blur-xl'),
        onLeaveBack: () => headerElement.classList.remove('shadow-xl', 'bg-background/90', 'backdrop-blur-xl'),
      });
      
      const sections = currentNavItems.map(item => document.querySelector(item.href)).filter(Boolean) as HTMLElement[];

      function updateActiveLink() {
        let currentSectionId = version === 'v2' ? '#home-v2' : '#home'; // Default to current version's home
        const headerHeight = headerElement?.offsetHeight ?? 80; // Default to 80 if not available
        
        for (const section of sections) {
            const sectionTop = section.getBoundingClientRect().top;
            // A section is active if its top is within a range from header bottom to mid-viewport
            // Adjusted threshold for better accuracy, especially with larger header offsets
            if (sectionTop <= headerHeight + 100 && section.getBoundingClientRect().bottom > headerHeight + 50) {
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
  }, [currentNavItems, version]); // Add version to dependencies


  useEffect(() => {
    const activeLinkIndex = currentNavItems.findIndex(item => item.href === activeHash);
    const activeLinkElement = navLinksRef.current[activeLinkIndex];

    if (activeLinkElement && indicatorRef.current && activeLinkElement.offsetParent !== null) {
      const linkRect = activeLinkElement.getBoundingClientRect();
      // Get parent NAV's bounding rect to calculate relative position accurately
      const navElement = activeLinkElement.closest('nav');
      const navRect = navElement?.getBoundingClientRect();

      if (navRect) {
        gsap.to(indicatorRef.current, {
          x: linkRect.left - navRect.left + (linkRect.width / 2), // Centered under the link
          width: linkRect.width * 0.8, // Indicator width relative to link
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
        });
      }
    } else if (indicatorRef.current) {
         gsap.to(indicatorRef.current, { width: 0, opacity: 0, duration: 0.4, ease: 'expo.out' });
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
        const headerOffset = (headerRef.current?.offsetHeight || 80) + 20; // Adjusted offset
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        gsap.to(window, {
          scrollTo: { y: offsetPosition, autoKill:true }, // autoKill can be true
          duration: 1.5, 
          ease: 'power4.inOut', // More pronounced ease
        });
        
        if (history.pushState) {
           history.pushState(null, '', href);
        } else {
           window.location.hash = href;
        }
        setActiveHash(href); 
      }
    } else if (href.startsWith('/')) {
       window.location.href = href;
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-[100] w-full border-b border-transparent bg-background/80 supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out shadow-sm" 
      // Initial state, 'is-scrolled' class will add more pronounced shadow and blur
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6 relative">
        <Link href={homeHref} className="flex items-center space-x-2.5 mr-6 group shrink-0" aria-label="Portfolio Pro Home" onClick={(e) => handleLinkClick(e, homeHref)}>
           <Settings2 className="h-7 w-7 md:h-8 md:w-8 text-accent transition-all duration-700 ease-out group-hover:rotate-[45deg] group-hover:scale-110" /> {/* Changed Icon */}
          <span className="font-black text-xl md:text-2xl gradient-text transition-opacity duration-300 group-hover:opacity-85">PortfolioPro</span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center justify-center flex-grow relative">
          {currentNavItems.map((item, index) => (
            <Link
              key={`${item.name}-${version}`} // Ensure key is unique when version changes
              ref={(el) => navLinksRef.current[index] = el}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={cn(
                "relative px-3.5 lg:px-4 py-2 text-sm font-medium transition-all duration-300 ease-out group/navlink", // Added group/navlink
                activeHash === item.href 
                  ? 'text-accent scale-105 font-semibold' 
                  : 'text-muted-foreground hover:text-accent hover:scale-105'
              )}
              data-cursor-interactive
             >
              {item.name}
              {/* Subtle underline effect for hover/active using pseudo-elements (optional) */}
              <span className={cn(
                "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-accent transition-all duration-300 ease-out",
                activeHash === item.href ? "w-3/5 opacity-100" : "w-0 opacity-0 group-hover/navlink:w-2/5 group-hover/navlink:opacity-70"
              )}></span>
            </Link>
          ))}
          {/* The moving indicator - ensure it's part of the nav for correct positioning */}
          <span
            ref={indicatorRef}
            className="absolute bottom-[5px] left-0 h-[3px] bg-gradient-to-r from-accent/80 via-accent to-primary/70 rounded-full transform -translate-x-1/2 opacity-0" // Start invisible
            style={{ width: 0 }} // Initial width
          />
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-2.5 md:space-x-3 ml-auto md:ml-6 shrink-0">
          <VersionToggle /> 
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="transition-all duration-300 ease-in-out hover:scale-125 hover:rotate-[25deg] hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-full w-9 h-9 md:w-10 md:h-10" // Enhanced hover and focus
            data-cursor-interactive
          >
            <Sun className="h-[1.1rem] w-[1.1rem] md:h-5 md:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] md:h-5 md:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle menu" data-cursor-interactive className="hover:text-accent transition-transform duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring rounded-full w-9 h-9 md:w-10 md:h-10">
                    <Menu className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-6 bg-background/90 backdrop-blur-xl border-l border-border shadow-2xl">
                   <div className="flex items-center justify-between mb-10">
                       <Link href={homeHref} className="flex items-center space-x-2" aria-label="Portfolio Pro Home" onClick={() => setIsMobileMenuOpen(false)}>
                         <Settings2 className="h-6 w-6 text-accent" />
                         <span className="font-bold text-lg gradient-text">PortfolioPro</span>
                       </Link>
                       <SheetClose asChild>
                           <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-2 focus-visible:ring-ring text-muted-foreground hover:text-accent">
                               <CloseIcon className="h-5 w-5" />
                           </Button>
                       </SheetClose>
                   </div>
                  <nav className="flex flex-col space-y-3">
                    {currentNavItems.map((item) => (
                      <SheetClose key={`${item.name}-mobile-${version}`} asChild>
                        <Link
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className={cn(
                            "text-base font-medium transition-all duration-200 ease-in-out hover:text-accent hover:bg-accent/15 py-3 rounded-lg px-4 -mx-2 block", 
                            activeHash === item.href ? 'text-accent bg-accent/20 font-semibold shadow-inner' : 'text-foreground' 
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
          /* These styles are applied when scrolled */
        }
        .gradient-text { /* Ensure this is defined if not globally */
          background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </header>
  );
};
