'use client';

import Image from 'next/image';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Sparkles, Code, Server, Cloud, Database as DatabaseIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React from 'react'; // Import React

gsap.registerPlugin(ScrollTrigger);

const taglines = [
  "Architecting Scalable & Resilient Backend Systems",
  "Optimizing for Peak Performance & Unwavering Reliability",
  "Cloud-Native Solutions & DevOps Automation Expert",
  "Mastering Python, FastAPI, and Modern Data Ecosystems",
  "Crafting Intuitive APIs & Seamless User Experiences",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const techIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!taglineRef.current) return;
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % taglines.length;
      const currentTagline = taglines[currentIndex];
      gsap.timeline()
        .to(taglineRef.current, { opacity: 0, y: -12, duration: 0.45, ease: 'power2.in' })
        .set(taglineRef.current, { textContent: currentTagline })
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' });
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });
      tl.from(headingRef.current, { opacity: 0, y: 80, delay: 0.4 })
        .from(subHeadingRef.current, { opacity: 0, y: 60 }, "-=0.85")
        .from(paraRef.current, { opacity: 0, y: 50 }, "-=0.85")
        .from(learningRef.current, { opacity: 0, y: 50 }, "-=0.85")
        .from(buttonsRef.current?.children || [], { opacity: 0, y: 50, stagger: 0.22 }, "-=0.85")
        .from(imageRef.current, { opacity: 0, scale: 0.75, duration: 1.3, ease: 'elastic.out(1, 0.7)' }, "-=0.95")
        .from(techIconsRef.current?.children || [], { opacity: 0, y: 25, scale: 0.4, stagger: 0.18, duration: 0.7, ease: 'back.out(1.7)' }, "-=0.85");

      gsap.to(imageRef.current, {
        y: "-35%", // Slightly more parallax
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2, // Smoother scrub
        }
      });

      gsap.to(techIconsRef.current, {
        y: "-20%", // Slightly more parallax for icons
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.2, // Smoother scrub
        }
      });

      if (imageContainerRef.current) {
        const imageElement = imageContainerRef.current.querySelector('img');
        const borderElement = imageContainerRef.current.querySelector('.glowing-border');
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(imageContainerRef.current, { scale: 1.05, duration: 0.5, ease: 'power2.out' }) // Slightly more scale
          .to(imageElement, { filter: 'brightness(1.15) saturate(1.2)', duration: 0.5, ease: 'power2.out' }, 0) // Enhanced filter
          .to(borderElement, { opacity: 1, scale: 1.04, duration: 0.5, ease: 'power2.out' }, 0); // More prominent border

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
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background pt-36 pb-24 md:pt-52 md:pb-32 min-h-screen flex items-center hero-section">
      <div className="blob opacity-40 dark:opacity-50 -z-10" style={{ animationDuration: '30s, 20s', filter: 'blur(140px)', background: 'linear-gradient(135deg, hsl(var(--accent)/0.2), hsl(var(--primary)/0.15))' }} />
      <div className="blob opacity-25 dark:opacity-35 -z-10" style={{ animationDuration: '40s, 28s', filter: 'blur(110px)', background: 'radial-gradient(circle, hsl(var(--primary)/0.2), transparent 75%)', top: '60%', left: '70%', width: '60vw', height: '60vw' }} />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 items-center gap-16 md:gap-20 lg:grid-cols-2">
          <div className="space-y-7 md:space-y-9 text-center md:text-left">
            <h1 ref={headingRef} className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl leading-none text-foreground drop-shadow-sm">
              Kesari Dasaradh
            </h1>
            <h2 ref={subHeadingRef} className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text h-12 md:h-14">
              <span ref={taglineRef}>{taglines[0]}</span>
            </h2>
            <p ref={paraRef} className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed">
              A dedicated Backend Architect specializing in Python, FastAPI, and cloud-native solutions. I transform complex challenges into robust, scalable, and high-performance systems with a keen eye for clean architecture and seamless API design.
            </p>
            <p ref={learningRef} className="text-md md:text-lg text-primary font-semibold mx-auto md:mx-0 flex items-center justify-center md:justify-start gap-3 opacity-95">
              <Sparkles className="h-5 w-5 text-accent animate-pulse" />
              <span>Currently Mastering: Advanced System Design, Serverless Patterns, and Distributed Tracing.</span>
            </p>
            <div ref={techIconsRef} className="flex items-center justify-center md:justify-start space-x-6 pt-5 opacity-85">
              <Code className="h-8 w-8 text-blue-500 transition-all duration-300 hover:scale-125 hover:text-blue-400" title="Python" />
              <Server className="h-8 w-8 text-teal-500 transition-all duration-300 hover:scale-125 hover:text-teal-400" title="FastAPI" />
              <DatabaseIcon className="h-8 w-8 text-indigo-500 transition-all duration-300 hover:scale-125 hover:text-indigo-400" title="SQL/PostgreSQL" />
              <Cloud className="h-8 w-8 text-orange-400 transition-all duration-300 hover:scale-125 hover:text-orange-300" title="AWS" />
              <Code className="h-8 w-8 text-sky-500 transition-all duration-300 hover:scale-125 hover:text-sky-400" title="React/Next.js" />
            </div>
            <div ref={buttonsRef} className="flex flex-col space-y-5 sm:flex-row sm:space-x-7 sm:space-y-0 justify-center md:justify-start pt-7">
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary via-accent/90 to-accent text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-350 hover:-translate-y-2 transform hover:scale-[1.05] active:scale-[1.02] text-lg font-bold py-3.5 px-10 rounded-lg" data-cursor-interactive>
                <Link href="#projects">
                  <React.Fragment> {/* Wrap in Fragment */}
                    View My Work <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-450 group-hover:translate-x-2" />
                  </React.Fragment>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-350 hover:-translate-y-2 transform hover:scale-[1.05] active:scale-[1.02] border-primary/75 hover:border-accent hover:text-accent bg-background/90 backdrop-blur-md text-lg font-bold py-3.5 px-10 rounded-lg" data-cursor-interactive>
                <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                  <React.Fragment> {/* Wrap in Fragment */}
                    <Download className="mr-3 h-5 w-5 transition-transform duration-550 group-hover:rotate-[-15deg] group-hover:scale-110" /> Download CV
                  </React.Fragment>
                </a>
              </Button>
            </div>
          </div>
          <div ref={imageRef} className="flex justify-center items-center mt-12 md:mt-0">
            <div ref={imageContainerRef} className="relative group transform transition-transform duration-500 will-change-transform">
              <div className="glowing-border absolute -inset-2.5 bg-gradient-to-r from-accent/80 via-primary/70 to-accent/80 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 animate-tilt-slow will-change-[opacity,transform]"></div>
              <Image
                src="https://picsum.photos/500/500" // Slightly larger image
                alt="Kesari Dasaradh - Professional Backend Architect Portrait"
                width={500} // Adjusted size
                height={500} // Adjusted size
                className="relative rounded-full border-4 border-background/90 shadow-2xl transition-all duration-500 ease-out will-change-filter z-10 group-hover:shadow-[0_0_60px_-15px_hsla(var(--accent),0.7)]" // Enhanced hover shadow
                data-ai-hint="professional developer software engineer portrait tech background modern clean minimal focused futuristic coder sophisticated elegant" // More descriptive hint
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
