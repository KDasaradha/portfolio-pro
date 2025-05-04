'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Moon, Sun, Code } from 'lucide-react'; // Added Code icon
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { usePathname } from 'next/navigation'; // To track active links

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Summary', href: '#ai-summarizer' }, // Link to AI section
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname(); // Use pathname if needed for complex routing, otherwise hash works

  // GSAP Animation for header entrance
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

   // Close mobile menu on link click
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Basic active link styling (can be enhanced)
  const isActive = (href: string) => {
    if (typeof window !== 'undefined') {
      return window.location.hash === href;
    }
    return false; // Default during SSR
  }


  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300" // Added transition
    >
      <div className="container flex h-16 items-center justify-between"> {/* Increased height slightly */}
        <Link href="/" className="flex items-center space-x-2 mr-6" aria-label="Portfolio Pro Home">
           <Code className="h-6 w-6 text-accent" /> {/* Added Icon */}
          <span className="font-bold text-lg gradient-text">Portfolio Pro</span> {/* Increased font size */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive(item.href) ? 'text-accent font-semibold' : 'text-muted-foreground'
              }`}
              data-cursor-interactive // Make links interactive for custom cursor
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side icons & Mobile Menu Trigger */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="transition-transform hover:scale-110"
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
                  <Button variant="ghost" size="icon" aria-label="Toggle menu" data-cursor-interactive>
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-6">
                  <nav className="flex flex-col space-y-4 pt-10">
                    {navItems.map((item) => (
                      <SheetClose key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={`text-lg font-medium transition-colors hover:text-accent ${
                            isActive(item.href) ? 'text-accent' : 'text-foreground'
                          }`}
                          onClick={handleLinkClick} // Close menu on click
                          data-cursor-interactive
                        >
                          {item.name}
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
}
