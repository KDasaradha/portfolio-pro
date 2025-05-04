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
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%", // Trigger animation when 95% of footer top is visible
                toggleActions: "play none none none",
            }
         });
     }, footerRef);

     return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t bg-background py-8 opacity-0"> {/* Start with opacity 0 for GSAP */}
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
