'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Sparkles, Code, Server, Cloud, Database as DatabaseIcon } from 'lucide-react'; // Added specific tech icons
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react'; // Ensure React is imported for Fragment

gsap.registerPlugin(ScrollTrigger);

// More specific taglines
const taglines = [
  "Building Scalable Backend Architectures",
  "Optimizing Performance & Reliability",
  "Cloud-Native Solutions Expert",
  "Mastering Python & FastAPI Ecosystems",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLHeadingElement>(null); // Ref for sub-heading
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null); // Ref for dynamic tagline
  const techIconsRef = useRef<HTMLDivElement>(null); // Ref for tech icons

  // Dynamic Tagline Effect
  useEffect(() => {
    if (!taglineRef.current) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % taglines.length;
      const currentTagline = taglines[currentIndex];

      gsap.timeline()
        .to(taglineRef.current, { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in' })
        .set(taglineRef.current, { textContent: currentTagline }) // Use textContent for direct text update
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

    }, 3500); // Change tagline every 3.5 seconds

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.0 } });

      tl.from(headingRef.current, { opacity: 0, y: 70, delay: 0.5 })
        .from(subHeadingRef.current, { opacity: 0, y: 50 }, "-=0.8") // Animate sub-heading
        .from(paraRef.current, { opacity: 0, y: 40 }, "-=0.8")
        .from(learningRef.current, { opacity: 0, y: 40 }, "-=0.8")
        .from(buttonsRef.current?.children || [], { opacity: 0, y: 40, stagger: 0.2 }, "-=0.8")
        .from(imageRef.current, { opacity: 0, scale: 0.8, duration: 1.2 }, "-=0.9")
        .from(techIconsRef.current?.children || [], { opacity: 0, y: 20, scale: 0.5, stagger: 0.15, duration: 0.6 }, "-=0.8"); // Animate tech icons

      // Enhanced Parallax Effect
      gsap.to(imageRef.current, {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Tech Icons Parallax (Slightly different speed)
      gsap.to(techIconsRef.current, {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2.5,
        }
      });


      if (imageContainerRef.current) {
          const imageElement = imageContainerRef.current.querySelector('img');
          const borderElement = imageContainerRef.current.querySelector('.glowing-border');

          const hoverTl = gsap.timeline({ paused: true });
          hoverTl.to(imageContainerRef.current, { scale: 1.04, duration: 0.45, ease: 'power2.out' })
                 .to(imageElement, { filter: 'brightness(1.1) saturate(1.15)', duration: 0.45, ease: 'power2.out' }, 0)
                 .to(borderElement, { opacity: 0.9, scale: 1.03, duration: 0.45, ease: 'power2.out' }, 0);

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
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/15 to-background pt-36 pb-24 md:pt-56 md:pb-32 min-h-screen flex items-center">
       <div className="blob opacity-35 dark:opacity-45 -z-10" style={{ top: '40%', left: '60%', width: '60vw', height: '60vw', animationDuration: '35s, 25s', filter: 'blur(130px)' }} />
       {/* Second, smaller blob */}
       <div className="blob opacity-20 dark:opacity-30 -z-10" style={{ top: '65%', left: '20%', width: '35vw', height: '35vw', animationDuration: '45s, 30s', filter: 'blur(100px)', background: 'radial-gradient(circle, hsl(var(--primary)/0.15), transparent 70%)' }} />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 items-center gap-16 md:gap-24 md:grid-cols-2">
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
             {/* Name Heading */}
             <h1 ref={headingRef} className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl leading-tight text-foreground">
              Kesari Dasaradh
            </h1>
            {/* Dynamic Sub-heading / Tagline */}
            <h2 ref={subHeadingRef} className="text-2xl sm:text-3xl lg:text-4xl font-semibold gradient-text h-10"> {/* Fixed height for stability */}
                <span ref={taglineRef}>{taglines[0]}</span> {/* Initial tagline */}
            </h2>
            <p ref={paraRef} className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed">
              Specializing in Python, FastAPI, and cloud-native technologies to build robust, scalable, and high-performance backend systems. Passionate about clean architecture, efficient data solutions, and seamless API design.
            </p>
            <p ref={learningRef} className="text-md md:text-lg text-primary font-medium mx-auto md:mx-0 flex items-center justify-center md:justify-start gap-2.5 opacity-90">
              <Sparkles className="h-5 w-5 text-accent" />
              <span>Currently Exploring: Advanced System Design Patterns, Serverless Architectures, Event-Driven Systems.</span>
            </p>
             {/* Tech Icons */}
             <div ref={techIconsRef} className="flex items-center justify-center md:justify-start space-x-5 pt-4 opacity-80">
                 <Code className="h-7 w-7 text-blue-500 transition-transform hover:scale-110" title="Python" />
                 <Server className="h-7 w-7 text-teal-500 transition-transform hover:scale-110" title="FastAPI" />
                 <DatabaseIcon className="h-7 w-7 text-indigo-500 transition-transform hover:scale-110" title="SQL/PostgreSQL" />
                 <Cloud className="h-7 w-7 text-orange-400 transition-transform hover:scale-110" title="AWS" />
                 <Code className="h-7 w-7 text-sky-500 transition-transform hover:scale-110" title="React/Next.js" />
                 {/* Add more icons as needed */}
             </div>
            <div ref={buttonsRef} className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 justify-center md:justify-start pt-6">
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary via-accent/95 to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-[1.04] active:scale-[1.01] text-base font-semibold py-3 px-8" data-cursor-interactive>
                <Link href="#projects">
                  <> {/* Wrap in Fragment */}
                    Explore Projects <ArrowRight className="ml-2.5 h-5 w-5 transition-transform duration-400 group-hover:translate-x-1.5" />
                  </>
                </Link>
              </Button>
               <Button asChild variant="outline" size="lg" className="group shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-[1.04] active:scale-[1.01] border-primary/70 hover:border-accent hover:text-accent bg-background/85 backdrop-blur-sm text-base font-semibold py-3 px-8" data-cursor-interactive>
                 <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                   <> {/* Wrap in Fragment */}
                     <Download className="mr-2.5 h-5 w-5 transition-transform duration-500 group-hover:rotate-[-12deg]" /> Download Resume
                   </>
                 </a>
               </Button>
            </div>
          </div>
          <div ref={imageRef} className="flex justify-center items-center mt-12 md:mt-0">
            <div ref={imageContainerRef} className="relative group transform transition-transform duration-500 will-change-transform">
                 <div className="glowing-border absolute -inset-2 bg-gradient-to-r from-accent/70 via-primary/60 to-accent/70 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-600 animate-tilt-slow will-change-[opacity,transform]"></div>
                 <Image
                    src="https://picsum.photos/480/480" // Slightly larger image
                    alt="Kesari Dasaradh - Professional Backend Architect Portrait"
                    width={480}
                    height={480}
                    className="relative rounded-full border-4 border-background/80 shadow-2xl transition-all duration-500 ease-out will-change-filter z-10"
                    data-ai-hint="professional developer software engineer portrait tech background modern clean minimal focused futuristic coder"
                    priority
                    // unoptimized // Consider if performance is impacted by placeholder service
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
  25% { transform: rotate(0.5deg) scale(1.02); }
  50% { transform: rotate(0deg) scale(1); }
  75% { transform: rotate(-0.5deg) scale(1.02); }
}
.animate-tilt-slow {
  animation: tilt-slow 20s infinite linear; /* Slower, smoother duration */
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
