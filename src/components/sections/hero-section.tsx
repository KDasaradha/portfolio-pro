'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null); // Ref for image container

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      tl.from(headingRef.current, { opacity: 0, y: 50, delay: 0.3 })
        .from(paraRef.current, { opacity: 0, y: 30 }, "-=0.6")
        .from(learningRef.current, { opacity: 0, y: 30 }, "-=0.6")
        .from(buttonsRef.current?.children || [], { opacity: 0, y: 30, stagger: 0.2 }, "-=0.6")
        .from(imageRef.current, { opacity: 0, scale: 0.8, duration: 1 }, "-=0.7");

      // Add subtle parallax effect to image on scroll
      gsap.to(imageRef.current, {
        y: "-20%", // Increased parallax effect
        ease: "none", // Linear movement for parallax
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5, // Smoother scrubbing
        }
      });

      // Image hover effect
      if (imageContainerRef.current) {
        gsap.fromTo(imageContainerRef.current,
          { scale: 1, filter: 'brightness(1)' },
          {
            scale: 1.03, // Slight scale up
            filter: 'brightness(1.05)', // Subtle brightness increase
            duration: 0.4,
            paused: true, // Start paused
            ease: 'power2.out'
          }
        );

        imageContainerRef.current.addEventListener('mouseenter', () => gsap.getTweensOf(imageContainerRef.current)[0]?.play());
        imageContainerRef.current.addEventListener('mouseleave', () => gsap.getTweensOf(imageContainerRef.current)[0]?.reverse());
      }

    }, sectionRef); // Scope animations to the section

    return () => {
        // Cleanup GSAP context and event listeners
        if (imageContainerRef.current) {
            imageContainerRef.current.removeEventListener('mouseenter', () => gsap.getTweensOf(imageContainerRef.current)[0]?.play());
            imageContainerRef.current.removeEventListener('mouseleave', () => gsap.getTweensOf(imageContainerRef.current)[0]?.reverse());
        }
        ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background py-28 md:py-48 min-h-screen flex items-center">
       {/* Animated Background Blob */}
       <div className="blob" />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2"> {/* Increased gap */}
          <div className="space-y-7 text-center md:text-left"> {/* Increased spacing */}
            <h1 ref={headingRef} className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl leading-tight"> {/* Increased size and adjusted leading */}
              <span className="block">Kesari Dasaradh</span>
              <span className="block gradient-text mt-2">Backend Developer</span>
            </h1>
            <p ref={paraRef} className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed"> {/* Adjusted size and leading */}
              Architecting robust & scalable backend solutions with Python, FastAPI & PostgreSQL. Driving innovation through clean code and a passion for microservices and cloud technologies.
            </p>
            <p ref={learningRef} className="text-md md:text-lg text-primary font-semibold mx-auto md:mx-0"> {/* Adjusted size */}
              🚀 Currently Expanding Expertise In: AWS Serverless, Advanced React/Next.js, System Design Patterns.
            </p>
            <div ref={buttonsRef} className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center md:justify-start pt-5"> {/* Increased padding */}
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-105" data-cursor-interactive>
                <Link href="#projects">
                  Explore Projects <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </Button>
               <Button asChild variant="outline" size="lg" className="group shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-105 border-primary/60 hover:border-accent hover:text-accent bg-background/70 backdrop-blur-sm" data-cursor-interactive>
                 <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                    <Download className="mr-2 h-5 w-5 transition-transform group-hover:rotate-[-12deg] duration-400" /> Download Resume
                 </a>
               </Button>
            </div>
          </div>
          <div ref={imageRef} className="flex justify-center items-center mt-8 md:mt-0">
            {/* Apply subtle hover effect with GSAP */}
            <div ref={imageContainerRef} className="relative group transform transition-transform duration-400">
                 {/* Enhanced glowing border effect */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur-lg opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-300 animate-tilt-slow"></div>
                 <Image
                    src="https://picsum.photos/400/400"
                    alt="Kesari Dasaradh - Backend Developer Profile" // More descriptive alt text
                    width={400}
                    height={400}
                    className="relative rounded-full border-4 border-background shadow-2xl" // Increased shadow
                    data-ai-hint="professional developer portrait tech background modern clean"
                    priority // Load the hero image faster
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Slower tilt animation
const styles = `
@keyframes tilt-slow {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(0.3deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-0.3deg); }
}
.animate-tilt-slow {
  animation: tilt-slow 15s infinite linear; /* Slower duration */
}
`;

// Inject styles only on the client-side after mount
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
