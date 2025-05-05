'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Sparkles } from 'lucide-react'; // Added Sparkles
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } }); // Slightly adjusted duration

      tl.from(headingRef.current, { opacity: 0, y: 60, delay: 0.4 }) // Increased offset and delay
        .from(paraRef.current, { opacity: 0, y: 40 }, "-=0.7") // Adjusted offset
        .from(learningRef.current, { opacity: 0, y: 40 }, "-=0.7") // Adjusted offset
        .from(buttonsRef.current?.children || [], { opacity: 0, y: 40, stagger: 0.25 }, "-=0.7") // Adjusted offset and stagger
        .from(imageRef.current, { opacity: 0, scale: 0.85, duration: 1.1 }, "-=0.8"); // Adjusted scale and duration

      // Subtle parallax effect
      gsap.to(imageRef.current, {
        y: "-25%", // Slightly increased parallax
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8, // Smoother scrubbing
        }
      });

      // Enhanced Image hover effect
      if (imageContainerRef.current) {
          const imageElement = imageContainerRef.current.querySelector('img');
          const borderElement = imageContainerRef.current.querySelector('.glowing-border'); // Target the border div

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(imageContainerRef.current, { scale: 1.03, duration: 0.4, ease: 'power2.out' })
                 .to(imageElement, { filter: 'brightness(1.05) saturate(1.1)', duration: 0.4, ease: 'power2.out' }, 0) // Enhance image slightly
                 .to(borderElement, { opacity: 0.85, scale: 1.02, duration: 0.4, ease: 'power2.out' }, 0); // Enhance border glow

          const handleMouseEnter = () => hoverTl.play();
          const handleMouseLeave = () => hoverTl.reverse();

          imageContainerRef.current.addEventListener('mouseenter', handleMouseEnter);
          imageContainerRef.current.addEventListener('mouseleave', handleMouseLeave);

          return () => {
              imageContainerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
              imageContainerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
              hoverTl.kill();
          };
      }

    }, sectionRef);

    return () => {
        ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background py-32 md:py-56 min-h-screen flex items-center">
       {/* Refined Animated Background Blob */}
       <div className="blob opacity-30 dark:opacity-40 -z-10" style={{ top: '45%', left: '55%', width: '55vw', height: '55vw', animationDuration: '30s, 22s', filter: 'blur(120px)' }} />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2"> {/* Increased gap */}
          <div className="space-y-8 text-center md:text-left"> {/* Increased spacing */}
            <h1 ref={headingRef} className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl leading-tight">
              <span className="block">Kesari Dasaradh</span>
              <span className="block gradient-text mt-2 md:mt-3">Backend Architect</span> {/* More impactful title */}
            </h1>
            <p ref={paraRef} className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed">
              Crafting scalable, secure, and high-performance backend systems using Python, FastAPI, and cloud-native technologies. Passionate about building resilient microservices and optimizing data workflows.
            </p>
            <p ref={learningRef} className="text-md md:text-lg text-primary font-semibold mx-auto md:mx-0 flex items-center justify-center md:justify-start gap-2"> {/* Flex alignment for icon */}
              <Sparkles className="h-5 w-5 text-accent opacity-80" /> {/* Added icon */}
              <span>Exploring: Advanced System Design, Serverless Patterns, Event-Driven Architectures.</span>
            </p>
            <div ref={buttonsRef} className="flex flex-col space-y-4 sm:flex-row sm:space-x-5 sm:space-y-0 justify-center md:justify-start pt-6"> {/* Increased padding & spacing */}
              {/* Enhanced Button Styles */}
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary via-accent/90 to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-[1.03] active:scale-[1.01] text-base" data-cursor-interactive>
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-400 group-hover:translate-x-1.5" />
                </Link>
              </Button>
               <Button asChild variant="outline" size="lg" className="group shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-[1.03] active:scale-[1.01] border-primary/60 hover:border-accent hover:text-accent bg-background/80 backdrop-blur-sm text-base" data-cursor-interactive>
                 <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                    <Download className="mr-2 h-5 w-5 transition-transform duration-500 group-hover:rotate-[-15deg]" /> Resume
                 </a>
               </Button>
            </div>
          </div>
          <div ref={imageRef} className="flex justify-center items-center mt-10 md:mt-0">
            <div ref={imageContainerRef} className="relative group transform transition-transform duration-400 will-change-transform">
                 {/* Enhanced glowing border effect - now a separate div for better control */}
                 <div className="glowing-border absolute -inset-1.5 bg-gradient-to-r from-accent/80 via-primary/70 to-accent/80 rounded-full blur-xl opacity-65 group-hover:opacity-80 transition-opacity duration-500 animate-tilt-slow will-change-[opacity,transform]"></div>
                 <Image
                    src="https://picsum.photos/450/450" // Slightly larger image
                    alt="Kesari Dasaradh - Backend Architect Profile Photo" // More specific alt text
                    width={450}
                    height={450}
                    className="relative rounded-full border-4 border-background shadow-2xl transition-all duration-400 ease-out will-change-filter" // Added will-change
                    data-ai-hint="professional developer software engineer portrait tech background modern clean minimal focused"
                    priority // Load the hero image faster
                    unoptimized // Consider if using external placeholder service
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add CSS directly in the component file for simplicity or move to globals.css
const styles = `
@keyframes tilt-slow {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(0.4deg) scale(1.01); }
  50% { transform: rotate(0deg) scale(1); }
  75% { transform: rotate(-0.4deg) scale(1.01); }
}
.animate-tilt-slow {
  animation: tilt-slow 18s infinite linear; /* Slower, smoother duration */
}
`;

if (typeof window !== 'undefined') {
  let styleSheet = document.getElementById('hero-styles');
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    styleSheet.id = 'hero-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }
}
