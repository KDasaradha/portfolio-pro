'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Moon, Sun, Code, X as CloseIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Summary', href: '#ai-summarizer' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const headerRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // GSAP Animation for header entrance and scroll effects
  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(headerElement,
        { yPercent: -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );

      // Add/remove shadow on scroll
      ScrollTrigger.create({
        start: 'top+=30 top',
        end: 99999,
        markers: false, // Disable markers
        onToggle: self => {
          if (headerElement) { // Check if headerElement exists
            headerElement.classList.toggle('shadow-lg', self.isActive);
            headerElement.classList.toggle('shadow-sm', !self.isActive);
          }
        },
      });

      // Active link detection based on scroll position
       ScrollTrigger.create({
         trigger: "body",
         start: "top top-=-100", // Adjust start point slightly below header
         end: "bottom bottom",
         markers: false, // Disable markers
         onUpdate: (self) => {
           let currentSectionId = '';
           let closestDistance = Infinity;

           navItems.forEach(item => {
             const section = document.querySelector(item.href);
             if (section && headerElement) { // Check if section and headerElement exist
               const rect = section.getBoundingClientRect();
               // Consider section active if its top is within a range below the header
               const sectionTop = rect.top;
               const headerBottom = headerElement.offsetHeight;
               const viewportCenter = window.innerHeight / 2;

               // Check if the section is roughly centered in the viewport or near the top
               if (sectionTop < viewportCenter + 100 && rect.bottom > headerBottom + 50) {
                  const distanceToCenter = Math.abs(sectionTop + rect.height / 2 - viewportCenter);

                  // Prioritize section closest to the center or top boundary
                  if (distanceToCenter < closestDistance) {
                     closestDistance = distanceToCenter;
                     currentSectionId = item.href;
                  }
               }

             }
           });

           setActiveHash(currentSectionId || '#home'); // Default to #home if no section is active
         },
       });

    }, headerRef);

    return () => ctx.revert();
  }, []);


  // Animate indicator to active link
  useEffect(() => {
    const activeLinkIndex = navItems.findIndex(item => item.href === activeHash);
    const activeLinkElement = navLinksRef.current[activeLinkIndex];

    if (activeLinkElement && indicatorRef.current) {
      const linkRect = activeLinkElement.getBoundingClientRect();
      const navRect = activeLinkElement.parentElement?.getBoundingClientRect(); // Get nav container rect

      if (navRect) {
        gsap.to(indicatorRef.current, {
          x: linkRect.left - navRect.left + linkRect.width / 2, // Position relative to nav
          width: linkRect.width * 0.7, // Adjust width dynamically
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    } else if (indicatorRef.current) {
        // Optionally hide or move indicator if no link is active
         gsap.to(indicatorRef.current, { width: 0, duration: 0.3 });
    }
  }, [activeHash]); // Dependency on activeHash


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const targetElement = document.querySelector<HTMLElement>(href); // Ensure it's HTMLElement
      if (targetElement) {
        const offset = -(headerRef.current?.offsetHeight || 64) - 10; // Dynamic offset + extra padding
        const targetTop = targetElement.offsetTop + offset; // Calculate target position

        // Use GSAP for smooth scrolling
        gsap.to(window, {
          scrollTo: { y: targetTop, autoKill: false }, // AutoKill false might be needed if other scroll animations interfere
          duration: 1, // Duration of the scroll animation
          ease: 'power2.inOut', // Smooth easing function
        });

        setActiveHash(href); // Update active hash immediately
      }
    } else if (href.startsWith('/')) {
       window.location.href = href;
    }
    setIsMobileMenuOpen(false); // Close mobile menu regardless
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300 shadow-sm"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 mr-6 group" aria-label="Portfolio Pro Home">
           <Code className="h-7 w-7 text-accent transition-transform duration-500 ease-out group-hover:rotate-[-20deg]" />
          <span className="font-bold text-xl gradient-text transition-opacity duration-300 group-hover:opacity-85">Portfolio Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center relative">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              ref={(el) => navLinksRef.current[index] = el}
              href={item.href}
              onClick={(e) => handleLinkClick(e,item.href)}
              className={cn("relative px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-accent", // Increased padding
                activeHash === item.href ? 'text-accent' : 'text-muted-foreground',
              )}
              data-cursor-interactive
             >
              {item.name}
            </Link>
          ))}
          {/* Animated underline indicator */}
          <span
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-accent rounded-full transform -translate-x-1/2"
            style={{ width: 0 }} // Initial width set by GSAP
          />
        </nav>

        {/* Right side icons & Mobile Menu Trigger */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="transition-all duration-300 hover:scale-110 hover:rotate-[15deg] hover:text-accent" // Enhanced hover
            data-cursor-interactive
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle menu" data-cursor-interactive className="hover:text-accent transition-transform duration-300 hover:scale-110">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-6 bg-background/95 backdrop-blur-lg border-l">
                   <div className="flex items-center justify-between mb-8">
                       <Link href="/" className="flex items-center space-x-2" aria-label="Portfolio Pro Home" onClick={() => setIsMobileMenuOpen(false)}>
                         <Code className="h-6 w-6 text-accent" />
                         <span className="font-bold text-lg gradient-text">Portfolio Pro</span>
                       </Link>
                       <SheetClose asChild>
                           <Button variant="ghost" size="icon">
                               {/* Use the renamed icon here */}
                               <CloseIcon className="h-5 w-5" />
                               <span className="sr-only">Close menu</span>
                           </Button>
                       </SheetClose>
                   </div>
                  <nav className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <SheetClose key={item.name} asChild>
                        <Link
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className={cn("text-lg font-medium transition-all duration-200 hover:text-accent py-2 rounded-md px-3 -ml-3 block", // Make full width clickable
                            activeHash === item.href ? 'text-accent bg-accent/10 font-semibold' : 'text-foreground' // Highlight active link
                          )}
                          data-cursor-interactive
                         >
                           <span className="pl-3">{item.name}</span>
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
