'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react'; // Added Download icon
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      tl.from(headingRef.current, { opacity: 0, y: 50, delay: 0.3 })
        .from(paraRef.current, { opacity: 0, y: 30 }, "-=0.6") // Stagger animation
        .from(learningRef.current, { opacity: 0, y: 30 }, "-=0.6")
        .from(buttonsRef.current?.children || [], { opacity: 0, y: 30, stagger: 0.2 }, "-=0.6")
        .from(imageRef.current, { opacity: 0, scale: 0.8, duration: 1 }, "-=0.7") // Image animation slightly longer
         // Add subtle parallax effect to image on scroll
        .to(imageRef.current, {
            y: "-15%", // Move image up as user scrolls down
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1, // Smooth scrubbing effect
            }
         });

    }, sectionRef); // Scope animations to the section

    return () => ctx.revert(); // Cleanup animations
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background py-24 md:py-40 min-h-screen flex items-center">
       {/* Animated Background Blob */}
       <div className="blob" />

      <div className="container mx-auto px-4 z-10"> {/* Ensure content is above blob */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-6 text-center md:text-left">
            <h1 ref={headingRef} className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">Kesari Dasaradh</span>
              <span className="block gradient-text mt-1">Backend Developer</span>
            </h1>
            <p ref={paraRef} className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Junior Backend Developer with 1.7+ years crafting high-performance APIs using Python, FastAPI & PostgreSQL. Passionate about microservices, security, and elegant solutions.
            </p>
             <p ref={learningRef} className="text-base text-primary font-medium mx-auto md:mx-0">🌟 Currently Mastering: AWS Cloud, React, Next.js</p>
            <div ref={buttonsRef} className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center md:justify-start pt-4">
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-cursor-interactive>
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
               <Button asChild variant="outline" size="lg" className="group shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-primary/50 hover:border-accent hover:text-accent" data-cursor-interactive>
                 <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                    <Download className="mr-2 h-5 w-5 transition-transform group-hover:rotate-[-10deg]" /> Download Resume
                 </a>
               </Button>
            </div>
          </div>
          <div ref={imageRef} className="flex justify-center items-center">
            {/* Apply subtle hover effect with GSAP later if desired */}
            <div className="relative group">
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-full blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                 <Image
                    src="https://picsum.photos/400/400"
                    alt="Kesari Dasaradh profile picture"
                    width={400}
                    height={400}
                    className="relative rounded-full border-4 border-background shadow-xl"
                    data-ai-hint="professional developer portrait tech background"
                    priority // Load the hero image faster
                />
             </div>
          </div>
        </div>
      </div>
       {/* Optional: Add subtle background elements if desired */}
       {/* <div className="absolute inset-0 -z-10 opacity-10"> ... </div> */}
    </section>
  );
}

// Simple tilt animation for image border (optional)
const styles = `
@keyframes tilt {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(0.5deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-0.5deg); }
  100% { transform: rotate(0deg); }
}
.animate-tilt {
  animation: tilt 10s infinite linear;
}
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
