'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Sparkles, Code, Server, Cloud, Database as DatabaseIcon, PlayCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';
import { useGsap } from '@/components/animations/gsap-provider'; // For scrollTo

gsap.registerPlugin(ScrollTrigger);

const taglinesV2 = [
  "Innovating Digital Experiences.",
  "Building Tomorrow's Web, Today.",
  "Engineering Elegant & Performant Solutions.",
  "Full-Spectrum Development Expertise.",
  "From Concept to Cloud-Native Reality.",
];

const techStackIcons = [
  { icon: Code, title: "Python", color: "text-blue-400", hint:"Python language icon" },
  { icon: Server, title: "FastAPI", color: "text-green-400", hint:"FastAPI framework icon" },
  { icon: DatabaseIcon, title: "PostgreSQL", color: "text-purple-400", hint:"PostgreSQL database icon" },
  { icon: Cloud, title: "AWS", color: "text-orange-400", hint:"AWS cloud icon"},
  { icon: Code, title: "Next.js", color: "text-sky-400" , hint:"Nextjs framework icon"}
];

export default function HeroSectionV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const techIconsContainerRef = useRef<HTMLDivElement>(null);
  const dynamicGsap = useGsap(); // Renamed to avoid conflict with imported gsap


  useEffect(() => {
    const taglineElement = taglineRef.current;
    if (!taglineElement) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % taglinesV2.length;
      const currentTagline = taglinesV2[currentIndex];
      
      gsap.timeline()
        .to(taglineElement, { opacity: 0, y: -20, filter: 'blur(5px)', duration: 0.6, ease: 'power3.in' })
        .set(taglineElement, { textContent: currentTagline, y: 20, filter: 'blur(5px)'})
        .to(taglineElement, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' });
    }, 4200); // Slightly longer interval

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } });
      
      tl.from(nameRef.current, { opacity: 0, y: 100, skewY: 7, delay: 0.3 })
        .from(headingRef.current, { opacity: 0, y: 80, skewY: 5 }, "-=1.3")
        .from(taglineRef.current, { opacity: 0, y: 60 }, "-=1.2")
        .from(paraRef.current, { opacity: 0, y: 50, scale: 0.95 }, "-=1.1")
        .from(buttonsRef.current?.children || [], { opacity: 0, y: 50, scale: 0.9, stagger: 0.25 }, "-=1.0")
        .from(imageContainerRef.current, { opacity: 0, scale: 0.8, rotation: -15, duration: 1.8, ease: 'elastic.out(1, 0.6)' }, "-=1.1")
        .from(techIconsContainerRef.current?.children || [], { opacity: 0, y: 30, scale: 0.5, stagger: 0.15, duration: 0.8, ease: 'back.out(2)' }, "-=1.2");

      // Parallax for image
      gsap.to(imageContainerRef.current, {
        yPercent: -25, // More subtle parallax
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });
      
      // Floating animation for tech icons
      if (techIconsContainerRef.current) {
        Array.from(techIconsContainerRef.current.children).forEach((icon, index) => {
          gsap.to(icon, {
            y: Math.random() * 20 - 10, // Random float up/down
            x: Math.random() * 10 - 5, // Random float left/right
            rotation: Math.random() * 10 - 5, // Slight random rotation
            repeat: -1,
            yoyo: true,
            duration: Math.random() * 3 + 3, // Random duration
            ease: 'sine.inOut',
            delay: index * 0.2 // Stagger start times
          });
        });
      }


    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSectionV2 = document.getElementById('projects-v2');
    if (projectsSectionV2 && dynamicGsap) { // Use the renamed dynamicGsap
        dynamicGsap.to(window, {
            duration: 1.8, // Slower, smoother scroll
            scrollTo: { y: projectsSectionV2, offsetY: 80 }, // Adjusted offset
            ease: 'power4.inOut'
        });
    }
  };


  return (
    <section 
      ref={sectionRef} 
      id="home-v2" // V2 ID
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-neutral-100 p-6 md:p-12 hero-section-v2"
    >
      {/* Enhanced Background Elements - More subtle and integrated */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-700/30 rounded-full filter blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-600/40 rounded-full filter blur-[120px] animate-pulse-slower"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 pattern-dots pattern-size-10 opacity-10 dark:opacity-[0.07]" style={{
            backgroundImage: 'radial-gradient(hsl(var(--foreground)/0.2) 0.5px, transparent 0.5px)',
            backgroundSize: '15px 15px'
        }} />
      </div>

      <div className="container mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-12 md:gap-16 text-center lg:text-left">
          {/* Text Content - takes more space on large screens */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            <h1 ref={nameRef} className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 drop-shadow-lg">
              Kesari Dasaradh
            </h1>
            <h2 ref={headingRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-200 leading-tight">
              <span ref={taglineRef} className="block min-h-[4rem] md:min-h-[5rem]">{taglinesV2[0]}</span>
            </h2>
            <p ref={paraRef} className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A passionate Backend Architect crafting high-performance, scalable systems with Python, FastAPI, and cloud technologies. I blend robust engineering with a keen eye for clean architecture and seamless API design to bring innovative digital products to life.
            </p>
            
            <div ref={techIconsContainerRef} className="flex items-center justify-center lg:justify-start space-x-5 md:space-x-6 pt-4 md:pt-6">
              {techStackIcons.map(tech => (
                <tech.icon 
                  key={tech.title} 
                  className={`h-9 w-9 md:h-10 md:w-10 ${tech.color} transition-all duration-300 hover:scale-125 hover:opacity-80 drop-shadow-md`} 
                  title={tech.title}
                  data-ai-hint={tech.hint} 
                />
              ))}
            </div>

            <div ref={buttonsRef} className="flex flex-col space-y-4 sm:flex-row sm:space-x-5 sm:space-y-0 justify-center lg:justify-start pt-6 md:pt-8">
              <Button 
                asChild 
                size="lg" 
                className="group bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-105 active:scale-102 text-md font-semibold py-3.5 px-8 rounded-lg" 
                data-cursor-interactive
              >
                <Link href="#projects-v2" onClick={handleScrollToProjects}>
                  <Sparkles className="mr-2.5 h-5 w-5 transition-transform duration-300 group-hover:animate-pulse" />
                  Explore My Work
                  <ArrowRight className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="group bg-white/5 border-neutral-400/70 text-neutral-200 hover:bg-white/15 hover:border-white hover:text-white backdrop-blur-sm shadow-lg transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-105 active:scale-102 text-md font-semibold py-3.5 px-8 rounded-lg" 
                data-cursor-interactive
              >
                <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume_V2.pdf">
                  <Download className="mr-2.5 h-5 w-5 transition-transform duration-300 group-hover:rotate-[-10deg]" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div ref={imageContainerRef} className="lg:col-span-2 flex justify-center items-center mt-10 lg:mt-0">
            <div className="relative group w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] will-change-transform">
              <div className="absolute -inset-3 bg-gradient-to-br from-purple-600/70 via-pink-500/60 to-orange-600/70 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-tilt-slow"></div>
              <Image
                src="https://picsum.photos/seed/devportfolio/600/600"
                alt="Kesari Dasaradh - Modern Developer Portrait"
                width={600}
                height={600}
                className="relative rounded-full border-4 border-neutral-800/50 shadow-2xl object-cover w-full h-full transition-all duration-500 ease-out group-hover:shadow-[0_0_70px_-20px_hsla(270,80%,70%,0.6)] group-hover:scale-105"
                data-ai-hint="futuristic developer portrait neon lights abstract tech background modern vibrant professional coder cool glasses"
                priority
              />
               {/* Optional video play icon if there's a demo reel */}
               {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" onClick={() => console.log('Play video demo')}>
                 <PlayCircle className="h-20 w-20 text-white/70 hover:text-white/90 transition-colors" />
               </div> */}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero-section-v2 {
          // Custom styles if needed beyond Tailwind
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.03); }
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s infinite ease-in-out;
        }
        @keyframes tilt-slow {
          0%, 100% { transform: rotate(-2deg) scale(1.02); }
          50% { transform: rotate(2deg) scale(1); }
        }
        .animate-tilt-slow {
           animation: tilt-slow 15s infinite ease-in-out alternate;
        }
      `}</style>
    </section>
  );
}
