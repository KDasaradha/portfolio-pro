'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Moon, Sun, Code, X as CloseIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { usePathname } from 'next/navigation'; // No longer directly used for active hash
import { cn } from '@/lib/utils';
import VersionToggle from './version-toggle'; // Import the new toggle

gsap.registerPlugin(ScrollTrigger);

const navItemsV1 = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Summary', href: '#ai-summarizer' },
  { name: 'Contact', href: '#contact' },
];

// Placeholder for V2 nav items if they differ significantly.
// For now, V2 might reuse V1 links or have a different navigation scheme.
const navItemsV2 = [
  { name: 'Intro', href: '#home-v2' },
  { name: 'Story', href: '#about-v2' },
  { name: 'Work', href: '#projects-v2' },
  { name: 'Tech', href: '#skills-v2' },
  { name: 'AI Assist', href: '#ai-summarizer-v2' },
  { name: 'Reach Out', href: '#contact-v2' },
];


export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  
  // Determine current navItems based on version (could be from context if needed)
  // For now, assuming V1 navigation structure is primarily used and V2 sections
  // might match these IDs or have their own. This part can be refined with VersionContext.
  // We'll use navItemsV1 as default for indicator logic for now.
  const currentNavItems = navItemsV1; 


  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerElement,
        { yPercent: -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );

      ScrollTrigger.create({
        start: 'top+=30 top',
        end: 99999,
        onToggle: self => {
          if (headerElement) {
            headerElement.classList.toggle('shadow-xl', self.isActive); // More pronounced shadow
            headerElement.classList.toggle('shadow-md', !self.isActive); // Default shadow
          }
        },
      });
      
      // Active link detection (simplified for robustness)
      const sections = currentNavItems.map(item => document.querySelector(item.href)).filter(Boolean);

      function updateActiveLink() {
        let current = '#home'; // Default to home
        const headerHeight = headerElement?.offsetHeight ?? 70; // Approx header height
        
        sections.forEach(section => {
          if (section) {
            const sectionTop = section.getBoundingClientRect().top;
            // Section is active if its top is within a range from header bottom to mid-viewport
            if (sectionTop <= headerHeight + 50 && section.getBoundingClientRect().bottom > headerHeight + 50) {
              current = `#${section.id}`;
            }
          }
        });
        setActiveHash(current);
      }

      window.addEventListener('scroll', updateActiveLink);
      updateActiveLink(); // Initial check

      return () => window.removeEventListener('scroll', updateActiveLink);

    }, headerRef);

    return () => ctx.revert();
  }, [currentNavItems]);


  useEffect(() => {
    const activeLinkIndex = currentNavItems.findIndex(item => item.href === activeHash);
    const activeLinkElement = navLinksRef.current[activeLinkIndex];

    if (activeLinkElement && indicatorRef.current && activeLinkElement.offsetParent !== null) { // Check offsetParent
      const linkRect = activeLinkElement.getBoundingClientRect();
      const navRect = activeLinkElement.parentElement?.getBoundingClientRect(); 

      if (navRect) {
        gsap.to(indicatorRef.current, {
          x: linkRect.left - navRect.left + linkRect.width / 2,
          width: linkRect.width * 0.75, // Slightly wider indicator
          duration: 0.45, // Smoother duration
          ease: 'expo.out', // More dynamic ease
        });
      }
    } else if (indicatorRef.current) {
         gsap.to(indicatorRef.current, { width: 0, duration: 0.35, ease: 'expo.out' });
    }
  }, [activeHash, currentNavItems]);


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu

    if (href.startsWith('#')) {
      const targetElement = document.querySelector<HTMLElement>(href);
      if (targetElement) {
        const headerOffset = (headerRef.current?.offsetHeight || 70) + 20; // Adjusted offset
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        gsap.to(window, {
          scrollTo: { y: offsetPosition, autoKill: false },
          duration: 1.3, 
          ease: 'power3.inOut',
        });
        
        // Manually update URL hash without causing a jump, if history API is available
        if (history.pushState) {
           history.pushState(null, '', href);
        } else {
           window.location.hash = href;
        }
        setActiveHash(href); // Set active hash on click
      }
    } else if (href.startsWith('/')) {
       // For external or non-hash links, navigate normally
       window.location.href = href;
    }
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 transition-shadow duration-300 shadow-md" // Enhanced blur and shadow
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2.5 mr-auto group shrink-0" aria-label="Portfolio Pro Home" onClick={(e) => handleLinkClick(e, '#home')}>
           <Code className="h-7 w-7 md:h-8 md:w-8 text-accent transition-all duration-700 ease-out group-hover:rotate-[-25deg] group-hover:scale-110" />
          <span className="font-black text-xl md:text-2xl gradient-text transition-opacity duration-300 group-hover:opacity-80">PortfolioPro</span>
        </Link>

        <nav className="hidden md:flex items-center relative mx-auto"> {/* Centered navigation */}
          {currentNavItems.map((item, index) => (
            <Link
              key={item.name}
              ref={(el) => navLinksRef.current[index] = el}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={cn("relative px-3.5 lg:px-5 py-2 text-sm font-medium transition-all duration-300 ease-out hover:text-accent", // Enhanced hover
                activeHash === item.href ? 'text-accent scale-105' : 'text-muted-foreground hover:scale-105', // Scale active/hovered link
              )}
              data-cursor-interactive
             >
              {item.name}
            </Link>
          ))}
          <span
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-accent/70 via-accent to-primary/60 rounded-full transform -translate-x-1/2" // Gradient indicator
            style={{ width: 0 }}
          />
        </nav>

        <div className="flex items-center space-x-3 md:space-x-4 ml-auto shrink-0"> {/* Theme and Version Toggle on the right */}
          <VersionToggle /> 
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="transition-all duration-300 ease-in-out hover:scale-125 hover:rotate-[20deg] hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1" // Enhanced hover and focus
            data-cursor-interactive
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle menu" data-cursor-interactive className="hover:text-accent transition-transform duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-6 bg-background/95 backdrop-blur-lg border-l shadow-2xl">
                   <div className="flex items-center justify-between mb-8">
                       <Link href="/" className="flex items-center space-x-2" aria-label="Portfolio Pro Home" onClick={() => setIsMobileMenuOpen(false)}>
                         <Code className="h-6 w-6 text-accent" />
                         <span className="font-bold text-lg gradient-text">PortfolioPro</span>
                       </Link>
                       <SheetClose asChild>
                           <Button variant="ghost" size="icon" className="rounded-full focus-visible:ring-2 focus-visible:ring-ring">
                               <CloseIcon className="h-5 w-5" />
                               <span className="sr-only">Close menu</span>
                           </Button>
                       </SheetClose>
                   </div>
                  <nav className="flex flex-col space-y-2.5">
                    {currentNavItems.map((item) => (
                      <SheetClose key={item.name} asChild>
                        <Link
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className={cn("text-base font-medium transition-all duration-200 ease-in-out hover:text-accent hover:bg-accent/10 py-2.5 rounded-md px-3 -mx-3 block", 
                            activeHash === item.href ? 'text-accent bg-accent/15 font-semibold' : 'text-foreground' 
                          )}
                          data-cursor-interactive
                         >
                           <span className="pl-2">{item.name}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
