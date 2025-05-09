'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useGsap } from '@/components/animations/gsap-provider'; // Assuming useGsap hook is available

export default function HeroSectionV2() {
  const gsap = useGsap();

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about-v2');
    if (nextSection && gsap) {
      gsap.to(window, { duration: 1.5, scrollTo: { y: nextSection, offsetY: 70 }, ease: 'power3.inOut' });
    }
  };

  return (
    <section id="home-v2" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-neutral-100 p-8 relative overflow-hidden">
      {/* Animated background elements (example) */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-500 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>
      
      <div className="text-center z-10 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter"
            style={{ textShadow: '0 0 15px rgba(128, 90, 213, 0.7), 0 0 25px rgba(59, 130, 246, 0.5)' }}>
          Portfolio Reimagined
        </h1>
        <p className="text-xl md:text-2xl text-neutral-300 mb-10 max-w-2xl mx-auto">
          Exploring modern UI/UX with cutting-edge animations and interactive design. This is Version 2.
        </p>
        <Button 
          size="lg" 
          variant="outline" 
          className="bg-transparent border-2 border-neutral-400 text-neutral-200 hover:bg-white/10 hover:border-white hover:text-white transition-all duration-300 transform hover:scale-105 group text-lg px-8 py-3 rounded-lg"
          onClick={scrollToNextSection}
          data-cursor-interactive
        >
          Discover More 
          <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
        </Button>
      </div>
    </section>
  );
}
